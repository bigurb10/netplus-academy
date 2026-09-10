"""Connection pool and schema. The only DDL in the service."""

from __future__ import annotations

from psycopg_pool import ConnectionPool

SCHEMA = """
CREATE TABLE IF NOT EXISTS progress (
  user_id    text        NOT NULL,
  course_id  text        NOT NULL,
  state      jsonb       NOT NULL,
  version    bigint      NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, course_id)
);
"""


def make_pool(db_url: str) -> ConnectionPool:
    # min_size 1 keeps a warm connection. The service is low-traffic and the
    # box is small, so the ceiling stays far under postgres's default 100.
    return ConnectionPool(db_url, min_size=1, max_size=8, open=True)


def apply_schema(pool: ConnectionPool) -> None:
    with pool.connection() as conn:
        conn.execute(SCHEMA)
