from __future__ import annotations

import os

import pytest

from app.db import apply_schema, make_pool

from app.config import get_settings

DB_URL = os.environ.get("PROGRESS_TEST_DB_URL") or get_settings().db_url


def _redact(url: str) -> str:
    """A connection string safe to put in a failure message."""
    import re

    return re.sub(r"//([^:]+):[^@]*@", r"//\1:***@", url)


@pytest.fixture(scope="session")
def pool():
    if not DB_URL:
        pytest.fail(
            "no database configured. Set PROGRESS_DB_URL in api/.env "
            "(see api/tunnel.md) or PROGRESS_TEST_DB_URL in the environment."
        )
    if "/fra_progress" in DB_URL:
        pytest.fail(
            "refusing to run the suite against fra_progress: the tests TRUNCATE "
            "between cases. Point PROGRESS_TEST_DB_URL at fra_test."
        )
    try:
        p = make_pool(DB_URL)
        p.wait(timeout=10)
    except Exception as exc:  # noqa: BLE001 - surfaced to the developer verbatim
        pytest.fail(
            f"cannot reach the test database at {_redact(DB_URL)}: {exc}\n"
            "Is the tunnel up? ssh -N -L 55432:127.0.0.1:5433 hetzner\n"
            "Port 5433 is the system cluster; 5432 is ServiceForge's container."
        )
    apply_schema(p)
    yield p
    p.close()


@pytest.fixture(autouse=True)
def clean(pool):
    with pool.connection() as conn:
        conn.execute("TRUNCATE progress")
    yield
