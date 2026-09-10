from __future__ import annotations

import os
import time

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from fastapi.testclient import TestClient

from app.config import get_settings
from app.db import apply_schema, make_pool

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
    # Drop these tables before applying schema so the DDL assertion tests
    # the real CREATE statements each run, not just IF NOT EXISTS on a
    # diverged schema.
    with p.connection() as conn:
        conn.execute("DROP TABLE IF EXISTS progress")
        conn.execute("DROP TABLE IF EXISTS feedback")
    apply_schema(p)
    yield p
    p.close()


@pytest.fixture(autouse=True)
def clean(pool):
    with pool.connection() as conn:
        conn.execute("TRUNCATE progress")
        conn.execute("TRUNCATE feedback RESTART IDENTITY")
    yield


@pytest.fixture(scope="session")
def rsa_key():
    return rsa.generate_private_key(public_exponent=65537, key_size=2048)


@pytest.fixture(scope="session")
def mint(rsa_key):
    """Mint a signed JWT. Every claim is overridable so tests can break one.

    `headers` sets JOSE header fields (e.g. `kid`) rather than claims -- it
    is passed straight through to `jwt.encode`.
    """

    def _mint(headers=None, **overrides):
        now = int(time.time())
        claims = {
            "iss": "https://issuer.example",
            "aud": "https://api.fieldreadyacademy.com",
            "sub": "user_01TEST",
            "iat": now,
            "exp": now + 3600,
        }
        claims.update(overrides)
        claims = {k: v for k, v in claims.items() if v is not None}
        return jwt.encode(claims, rsa_key, algorithm="RS256", headers=headers)

    return _mint


# `client` and `client_as` deliberately construct TestClient without `with`.
# `with TestClient(app) as c:` runs the app's real `lifespan`, which calls
# `make_pool(get_settings().db_url)` -- the .env value, not necessarily the
# `pool` fixture's database. With only PROGRESS_TEST_DB_URL set (no .env),
# db_url is "", so make_pool("") falls back to libpq defaults (port 5432,
# an unrelated service) and blocks for its full connect timeout before
# failing, once per test. Since get_pool is overridden below, the app's own
# app.state.pool (which only lifespan would set) is never read, so skipping
# lifespan changes nothing tests can observe.
@pytest.fixture
def client(pool):
    from app import main

    main.app.dependency_overrides[main.get_pool] = lambda: pool
    main.app.dependency_overrides[main.current_user] = lambda: "user_01TEST"
    c = TestClient(main.app)
    yield c
    main.app.dependency_overrides.clear()


@pytest.fixture
def client_as(pool):
    """A client signed in as a chosen user, for isolation tests."""

    def _as(user_id):
        from app import main

        main.app.dependency_overrides[main.get_pool] = lambda: pool
        main.app.dependency_overrides[main.current_user] = lambda: user_id
        return TestClient(main.app)

    yield _as
    from app import main

    main.app.dependency_overrides.clear()


@pytest.fixture
def client_anon(pool):
    """A client with a real pool but the *real* `current_user` dependency.

    `client` and `client_as` both override `current_user`, so no test built
    on them can tell a real `Depends(current_user)` from a deleted one --
    every route would behave identically either way. This fixture leaves
    `current_user` un-overridden (and explicitly drops any leftover
    override from another fixture on this same, session-wide `app`
    instance) so tests can assert what happens with no bearer token at all.
    """
    from app import main

    main.app.dependency_overrides[main.get_pool] = lambda: pool
    main.app.dependency_overrides.pop(main.current_user, None)
    c = TestClient(main.app)
    yield c
    main.app.dependency_overrides.clear()
