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
