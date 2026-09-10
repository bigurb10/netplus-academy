"""Every SQL statement in the service.

The optimistic-concurrency precondition lives in the WHERE clause: an UPDATE
that matches no row means the caller's version was stale, and an INSERT ...
ON CONFLICT DO NOTHING that returns no row means someone else created the row
first. Neither reads before writing, so two racing writers cannot both win.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime

from psycopg.types.json import Jsonb
from psycopg_pool import ConnectionPool


class Stale(Exception):
    """The caller's precondition did not hold. The caller must re-read."""


@dataclass(frozen=True)
class Record:
    state: dict
    version: int
    updated_at: datetime


@dataclass(frozen=True)
class Summary:
    course_id: str
    version: int
    updated_at: datetime


@dataclass(frozen=True)
class FeedbackRow:
    id: int
    course_id: str
    payload: dict
    received_at: datetime


def get(pool: ConnectionPool, user_id: str, course_id: str) -> Record | None:
    with pool.connection() as conn:
        row = conn.execute(
            "SELECT state, version, updated_at FROM progress "
            "WHERE user_id = %s AND course_id = %s",
            (user_id, course_id),
        ).fetchone()
    if row is None:
        return None
    return Record(state=row[0], version=row[1], updated_at=row[2])


def create(pool: ConnectionPool, user_id: str, course_id: str, state: dict) -> Record:
    with pool.connection() as conn:
        row = conn.execute(
            "INSERT INTO progress (user_id, course_id, state, version) "
            "VALUES (%s, %s, %s, 1) "
            "ON CONFLICT (user_id, course_id) DO NOTHING "
            "RETURNING version, updated_at",
            (user_id, course_id, Jsonb(state)),
        ).fetchone()
    if row is None:
        raise Stale("a row already exists for this user and course")
    return Record(state=state, version=row[0], updated_at=row[1])


def update(
    pool: ConnectionPool, user_id: str, course_id: str, state: dict, expected: int
) -> Record:
    with pool.connection() as conn:
        row = conn.execute(
            "UPDATE progress SET state = %s, version = version + 1, "
            "updated_at = now() "
            "WHERE user_id = %s AND course_id = %s AND version = %s "
            "RETURNING version, updated_at",
            (Jsonb(state), user_id, course_id, expected),
        ).fetchone()
    if row is None:
        raise Stale("no row at the expected version")
    return Record(state=state, version=row[0], updated_at=row[1])


def delete(pool: ConnectionPool, user_id: str, course_id: str) -> bool:
    with pool.connection() as conn:
        cur = conn.execute(
            "DELETE FROM progress WHERE user_id = %s AND course_id = %s",
            (user_id, course_id),
        )
        return cur.rowcount > 0


def list_for_user(pool: ConnectionPool, user_id: str) -> list[Summary]:
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT course_id, version, updated_at FROM progress "
            "WHERE user_id = %s ORDER BY course_id",
            (user_id,),
        ).fetchall()
    return [Summary(course_id=r[0], version=r[1], updated_at=r[2]) for r in rows]


def add_feedback(pool: ConnectionPool, course_id: str, payload: dict) -> int:
    # id is bigserial, server-generated -- see db.py. The client's own "id"
    # field (a browser-minted string) travels inside payload and is never
    # trusted as a key.
    with pool.connection() as conn:
        row = conn.execute(
            "INSERT INTO feedback (course_id, payload) VALUES (%s, %s) "
            "RETURNING id",
            (course_id, Jsonb(payload)),
        ).fetchone()
    return row[0]


def feedback_since(pool: ConnectionPool, since: datetime) -> list[FeedbackRow]:
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT id, course_id, payload, received_at FROM feedback "
            "WHERE received_at >= %s ORDER BY received_at DESC",
            (since,),
        ).fetchall()
    return [
        FeedbackRow(id=r[0], course_id=r[1], payload=r[2], received_at=r[3])
        for r in rows
    ]
