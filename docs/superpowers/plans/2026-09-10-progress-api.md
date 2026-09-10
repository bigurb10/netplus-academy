# Progress API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `https://api.fieldreadyacademy.com`, a small authenticated blob store that holds one course-progress JSON document per (user, course) with optimistic concurrency, so the already-merged client merge engine has something to sync against.

**Architecture:** A synchronous FastAPI service on the existing Hetzner box, behind Caddy on loopback port 8001, backed by its own Postgres database. One table, one jsonb column. The server never interprets the blob beyond rejecting an unrecognised `v` and an oversized body. Every write carries an HTTP precondition; a failed precondition returns 412 and the client re-pulls, re-merges and retries. Bearer tokens are WorkOS AuthKit JWTs, verified against the issuer's JWKS and bound to this service's own audience.

**Tech Stack:** Python 3.12+ (3.14.4 on the box), FastAPI, uvicorn, psycopg 3 (sync pool), PyJWT with cryptography, pydantic-settings, Postgres 18, pytest. Tests run against a dedicated `fra_test` database on the Hetzner box, reached through an SSH tunnel.

## Global Constraints

- Source lives in `api/` inside the `netplus-academy` repo. It is a separate *service*, not a separate repo: the blob shape is defined by `engine/app.js`, and the two must move together.
- The service is **fully synchronous**. Endpoints are `def`, not `async def`; FastAPI runs them in its threadpool. Do not introduce asyncpg, async endpoints, or an event loop.
- The server accepts state documents with `v == 3` only. Any other `v` is a 422. There is no migration path in this release; see the Risks section of the design doc.
- Audience is `https://api.fieldreadyacademy.com` exactly. It must never be the MCP audience: same tenant, same signing key, and audience is the only thing separating a course token from a connector token.
- Loopback only: `--host 127.0.0.1 --port 8001`. ufw opens 22, 80 and 443 and nothing else. Caddy is the only route in.
- **Two things already occupy ports on this box and neither may be disturbed:** ServiceForge's uvicorn on **8000**, and ServiceForge's Postgres -- a `pgvector/pgvector:pg16` **Docker container** -- on **127.0.0.1:5432**. Never bind either.
- **This service's database is the system Postgres 18 cluster on port 5433**, not 5432. Debian's installer picked 5433 because the ServiceForge container already held 5432. Getting this wrong does not fail loudly: connecting to 5432 reaches the pgvector container, which has no `fra` role, and reports `password authentication failed for user "fra"` -- which reads like a credentials problem and is not one.
- Keeping the two on separate servers is deliberate, not accidental: the design doc requires that either product be restartable without taking the other down.
- Every response that carries a version also carries `ETag: "<version>"` (strong, quoted). CORS must expose `ETag` or the browser client cannot read it.
- Env var prefix is `PROGRESS_`. Config file is `api/.env`, never committed; `api/.env.example` is.
- Course ids are validated by the pattern `^[a-z0-9-]{1,32}$`, not an allow-list, so adding a course pack never requires an API redeploy.
- ASCII only in source and docs in this repo.
- The design doc is `docs/superpowers/specs/2026-09-09-course-progress-sync-design.md`. Read it before starting.

### One deliberate deviation from the design doc

The design doc's API table says `If-Match: *` creates. That is backwards from HTTP: `If-Match: *`
means "the resource must already exist", and the header meaning "only if it does not exist" is
`If-None-Match: *`. The client needs the latter -- on first sign-in it holds no version, and a
blind overwrite would discard a row another device wrote in the meantime.

This plan implements `If-None-Match: *` as the create precondition and **also** accepts
`If-Match: *` as an alias for it, so the design doc's wording still works. Task 4 amends the
design doc's table to match.

---

## Task 0: Prerequisites

### Already done on 2026-09-10 -- do not repeat

- [x] **Postgres 18 installed** on the Hetzner box, enabled at boot, cluster `18/main` on **port 5433**, `listen_addresses = localhost`. `pg_hba.conf` is the Debian default: `peer` on the local socket, `scram-sha-256` on 127.0.0.1.
- [x] **Role and databases created:** role `fra` (LOGIN), owning `fra_progress` (production) and `fra_test` (the test database this plan's suite truncates between tests). Both verified reachable as `fra` on 5433.
- [x] **Password** is 32 alphanumeric characters at `/root/.fra-db-password` on the box, `chmod 600`. It is not in git, not in this plan, and not in any transcript. Read it with `ssh hetzner "cat /root/.fra-db-password"` when you need it; never pass it as a shell argument.

Two things about that last point, learned the hard way and worth not relearning: `$$` in a shell string is the process id, not SQL dollar-quoting, and `sudo -u postgres psql -f /root/...` cannot read a root-owned file -- redirect it on stdin as `-f - < file` instead.

### Still outstanding (Blake, not the implementer)

Dashboard and registrar actions. Nothing in Tasks 1-4 needs them; Task 5 (deploy) does.

- [ ] **DNS:** add an A record at Namecheap, host `api`, value `87.99.151.69`. Optionally an AAAA to `2a01:4ff:f0:5d44::1`. Namecheap's default parking CNAME and URL Redirect records must not shadow it -- that is what broke apex certificate issuance on 2026-09-09.
- [ ] **WorkOS Staging** (`environment_01M23KW7A0P55G2FC6WAPFD4TF`), three settings, all verified empty on 2026-09-10 via the WorkOS MCP server. The mutations that would write them were blocked by the local auto-mode classifier, so do them in the dashboard or re-run them with the permission granted:
  - OAuth resource indicator `https://api.fieldreadyacademy.com`, `isDefault: false`, **alongside** the existing `https://mcp.fieldreadyacademy.com/mcp` (`isDefault: true`). Dashboard path: Connect -> Configuration -> MCP resource indicators -> Edit MCP resources. Keeping MCP as the default means the course client must pass `resource=https://api.fieldreadyacademy.com` explicitly on its token request; that belongs to plan 3, not this plan.
  - Redirect URIs: `https://fieldreadyacademy.com/callback` (default) and `http://localhost:8000/callback` (dev).
  - Web origins (CORS allow-list, currently empty): `https://fieldreadyacademy.com` and `http://localhost:8000`.

Equivalent MCP calls, if run with permission:

```
mutate setAuthkitOauthResources  environment_id=environment_01M23KW7A0P55G2FC6WAPFD4TF
  resources=[{"id":"authkit_oauth_resource_01M23Q7QTWN7V1FAJY8SR89TSN","uri":"https://mcp.fieldreadyacademy.com/mcp","isDefault":true},
             {"uri":"https://api.fieldreadyacademy.com","isDefault":false}]

mutate setRedirectUris  environment_id=environment_01M23KW7A0P55G2FC6WAPFD4TF
  redirectUris=[{"uri":"https://fieldreadyacademy.com/callback","isDefault":true},
                {"uri":"http://localhost:8000/callback","isDefault":false}]

mutate updateCorsConfig  environment_id=environment_01M23KW7A0P55G2FC6WAPFD4TF
  origins=["https://fieldreadyacademy.com","http://localhost:8000"]
```

---

## File Structure

Everything is new. Nothing under `engine/`, `courses/` or `tests/` is touched by this plan; the client half is plan 3.

| File | Responsibility |
|---|---|
| `api/pyproject.toml` | Dependencies and pytest config. |
| `api/tunnel.md` | The one SSH command that puts `fra_test` on localhost for the test run. |
| `api/.env.example` | Every `PROGRESS_` var with a safe default and a comment. |
| `api/README.md` | Run locally, run tests, deploy, rotate config. |
| `api/app/__init__.py` | Empty package marker. |
| `api/app/config.py` | `Settings` from env, plus the parsed origins list. |
| `api/app/db.py` | Connection pool construction and the schema DDL. |
| `api/app/store.py` | All SQL. Get / create / update / delete / list, and the one precondition failure. Knows nothing about HTTP. |
| `api/app/auth.py` | JWT claim verification and the `current_user` FastAPI dependency. Knows nothing about SQL. |
| `api/app/main.py` | App assembly: CORS, routes, exception mapping, health. |
| `api/tests/conftest.py` | DB fixture, RSA key fixture, client fixture. |
| `api/tests/test_db.py` | Schema shape. |
| `api/tests/test_store.py` | Store semantics against real Postgres. |
| `api/tests/test_auth.py` | Claim verification against locally minted tokens. |
| `api/tests/test_routes.py` | HTTP contract: status codes, headers, CORS. |
| `api/deploy/fieldready-api.service` | systemd unit, mirrors `serviceforge.service`. |
| `api/deploy/Caddyfile.snippet` | The block to paste into `/etc/caddy/Caddyfile`. |

The store/auth split is the important one: `store.py` is the only file with SQL in it and `auth.py` is the only file that knows what a JWT is, so each is testable alone and neither imports the other.

---

## Task 1: Scaffold, Postgres, and schema

**Files:**
- Create: `api/pyproject.toml`, `api/tunnel.md`, `api/.env.example`, `api/app/__init__.py`, `api/app/config.py`, `api/app/db.py`
- Test: `api/tests/conftest.py`, `api/tests/test_db.py`

**Interfaces:**
- Consumes: nothing.
- Produces: `Settings` (attributes `db_url: str`, `auth_issuer: str`, `auth_audience: str`, `jwks_url: str`, `allowed_origins_raw: str`, `max_blob_bytes: int`; property `allowed_origins -> list[str]`); `get_settings() -> Settings`; `make_pool(db_url: str) -> ConnectionPool`; `apply_schema(pool: ConnectionPool) -> None`; `SCHEMA: str`.

- [ ] **Step 1: Create the project files**

`api/pyproject.toml`:

```toml
[project]
name = "fieldready-progress-api"
version = "1.0.0"
description = "Course progress blob store for FieldReady Academy"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
    "psycopg[binary,pool]>=3.2",
    "pyjwt[crypto]>=2.9",
    "pydantic-settings>=2.5",
]

[project.optional-dependencies]
dev = ["pytest>=8.3", "httpx>=0.27"]

[tool.setuptools.packages.find]
include = ["app*"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-q"
```

`api/tunnel.md`:

````markdown
# Reaching the test database

Tests run against the real `fra_test` database on the Hetzner box. Postgres there listens
on localhost only and ufw opens nothing but 22, 80 and 443, so the way in is an SSH tunnel.

Open it in a terminal you leave running:

```bash
ssh -N -L 55432:127.0.0.1:5433 hetzner
```

`5433` is the system Postgres cluster. **Not 5432** -- that is ServiceForge's
`pgvector/pgvector:pg16` Docker container, which has no `fra` role and answers a wrong-port
mistake with `password authentication failed for user "fra"`.

Then, once per machine, put the password into `api/.env`:

```bash
echo "PROGRESS_DB_URL=postgresql://fra:$(ssh hetzner 'cat /root/.fra-db-password')@localhost:55432/fra_test" >> api/.env
```

`api/.env` is gitignored. The password exists in exactly two places: `/root/.fra-db-password`
on the box and your local `.env`.
````

`api/.env.example`:

```
# Copy to .env. Never commit .env.
# Local testing goes through the SSH tunnel in tunnel.md; the password comes
# from /root/.fra-db-password on the box.
PROGRESS_DB_URL=postgresql://fra:PASSWORD@localhost:55432/fra_test

# An empty issuer means no token can verify and every request is a 401.
# Staging AuthKit domain, per the project-auth-authkit notes:
PROGRESS_AUTH_ISSUER=https://prepared-song-48-staging.authkit.app
PROGRESS_AUTH_AUDIENCE=https://api.fieldreadyacademy.com
# Leave empty: the issuer's OIDC metadata is discovered at first use.
PROGRESS_JWKS_URL=
PROGRESS_ALLOWED_ORIGINS_RAW=https://fieldreadyacademy.com,http://localhost:8000
PROGRESS_MAX_BLOB_BYTES=2000000
```

`api/app/__init__.py`: empty file.

`api/app/config.py`:

```python
"""Settings, read from PROGRESS_* environment variables or api/.env."""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_prefix="PROGRESS_", extra="ignore"
    )

    # No usable default: the password lives on the box. See tunnel.md.
    db_url: str = ""
    # An empty issuer means no token can ever verify. There is no open mode:
    # unlike ServiceForge, every row here belongs to one identified learner.
    auth_issuer: str = ""
    auth_audience: str = "https://api.fieldreadyacademy.com"
    jwks_url: str = ""
    # Comma-separated. Kept as a string because pydantic-settings parses a bare
    # list[str] as JSON, which turns a plain comma list into a startup crash.
    allowed_origins_raw: str = "https://fieldreadyacademy.com,http://localhost:8000"
    max_blob_bytes: int = 2_000_000

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins_raw.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
```

`api/app/db.py`:

```python
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
```

- [ ] **Step 2: Write the failing test**

`api/tests/conftest.py`:

```python
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
```

`api/tests/test_db.py`:

```python
def test_schema_creates_progress_table(pool):
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT column_name, data_type FROM information_schema.columns "
            "WHERE table_name = 'progress' ORDER BY column_name"
        ).fetchall()
    assert [r[0] for r in rows] == [
        "course_id",
        "state",
        "updated_at",
        "user_id",
        "version",
    ]
    assert dict(rows)["state"] == "jsonb"


def test_primary_key_is_user_and_course(pool):
    with pool.connection() as conn:
        cols = conn.execute(
            "SELECT a.attname FROM pg_index i "
            "JOIN pg_attribute a ON a.attrelid = i.indrelid "
            "AND a.attnum = ANY(i.indkey) "
            "WHERE i.indrelid = 'progress'::regclass AND i.indisprimary "
            "ORDER BY a.attname"
        ).fetchall()
    assert [c[0] for c in cols] == ["course_id", "user_id"]
```

- [ ] **Step 3: Run it to make sure it fails**

In a terminal you leave open:

```bash
ssh -N -L 55432:127.0.0.1:5433 hetzner
```

Then:

```bash
cd api
cp .env.example .env
echo "PROGRESS_DB_URL=postgresql://fra:$(ssh hetzner 'cat /root/.fra-db-password')@localhost:55432/fra_test" >> .env
python -m venv .venv
.venv/Scripts/python -m pip install -e ".[dev]"
.venv/Scripts/python -m pytest tests/test_db.py -v
```

Expected before `app/db.py` exists: `ModuleNotFoundError: No module named 'app.db'`. The `echo` line appends a second `PROGRESS_DB_URL`; pydantic-settings takes the last one, so delete the placeholder line from `.env` to keep it readable. On the Hetzner box the interpreter path is `.venv/bin/python`, not `.venv/Scripts/python`; every command below follows the same rule.

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `.venv/Scripts/python -m pytest tests/test_db.py -v`
Expected: 2 passed.

- [ ] **Step 5: Commit**

Add `api/.env` to `.gitignore` first -- it holds the database password:

```bash
grep -q '^api/\.env$' .gitignore || echo 'api/.env' >> .gitignore
git add .gitignore api/pyproject.toml api/tunnel.md api/.env.example api/app api/tests
git status --short   # confirm api/.env is NOT listed
git commit -m "feat(api): scaffold progress service with settings, pool, and schema"
```

---

## Task 2: Store layer

**Files:**
- Create: `api/app/store.py`
- Test: `api/tests/test_store.py`

**Interfaces:**
- Consumes: `make_pool`, `apply_schema` from Task 1.
- Produces:
  - `class Stale(Exception)` -- the caller's precondition did not hold.
  - `@dataclass(frozen=True) class Record: state: dict; version: int; updated_at: datetime`
  - `@dataclass(frozen=True) class Summary: course_id: str; version: int; updated_at: datetime`
  - `get(pool, user_id: str, course_id: str) -> Record | None`
  - `create(pool, user_id: str, course_id: str, state: dict) -> Record` -- raises `Stale` if a row already exists.
  - `update(pool, user_id: str, course_id: str, state: dict, expected: int) -> Record` -- raises `Stale` if absent or at a different version.
  - `delete(pool, user_id: str, course_id: str) -> bool`
  - `list_for_user(pool, user_id: str) -> list[Summary]`

The precondition lives in the SQL `WHERE` clause, never in a read-then-write pair, so two racing writers cannot both believe they won.

- [ ] **Step 1: Write the failing test**

`api/tests/test_store.py`:

```python
import pytest

from app import store

STATE = {"v": 3, "course": "netplus", "lessons": {"u1l1": {"status": "done"}}}


def test_get_missing_returns_none(pool):
    assert store.get(pool, "user_a", "netplus") is None


def test_create_then_get_round_trips(pool):
    made = store.create(pool, "user_a", "netplus", STATE)
    assert made.version == 1
    got = store.get(pool, "user_a", "netplus")
    assert got.state == STATE
    assert got.version == 1


def test_create_twice_is_stale(pool):
    store.create(pool, "user_a", "netplus", STATE)
    with pytest.raises(store.Stale):
        store.create(pool, "user_a", "netplus", STATE)


def test_update_increments_version(pool):
    store.create(pool, "user_a", "netplus", STATE)
    newer = dict(STATE, passStreak=2)
    made = store.update(pool, "user_a", "netplus", newer, expected=1)
    assert made.version == 2
    assert store.get(pool, "user_a", "netplus").state["passStreak"] == 2


def test_update_with_wrong_version_is_stale_and_changes_nothing(pool):
    store.create(pool, "user_a", "netplus", STATE)
    with pytest.raises(store.Stale):
        store.update(pool, "user_a", "netplus", {"v": 3, "wiped": True}, expected=99)
    assert store.get(pool, "user_a", "netplus").state == STATE


def test_update_missing_row_is_stale(pool):
    with pytest.raises(store.Stale):
        store.update(pool, "user_a", "netplus", STATE, expected=1)


def test_rows_are_isolated_by_user_and_course(pool):
    store.create(pool, "user_a", "netplus", STATE)
    store.create(pool, "user_b", "netplus", {"v": 3, "who": "b"})
    store.create(pool, "user_a", "cbet", {"v": 3, "who": "a-cbet"})
    assert store.get(pool, "user_a", "netplus").state == STATE
    assert store.get(pool, "user_b", "netplus").state["who"] == "b"
    assert store.get(pool, "user_a", "cbet").state["who"] == "a-cbet"


def test_delete_reports_whether_a_row_went(pool):
    store.create(pool, "user_a", "netplus", STATE)
    assert store.delete(pool, "user_a", "netplus") is True
    assert store.delete(pool, "user_a", "netplus") is False
    assert store.get(pool, "user_a", "netplus") is None


def test_list_for_user_is_sorted_and_scoped(pool):
    store.create(pool, "user_a", "netplus", STATE)
    store.create(pool, "user_a", "cbet", STATE)
    store.create(pool, "user_b", "secplus", STATE)
    got = store.list_for_user(pool, "user_a")
    assert [s.course_id for s in got] == ["cbet", "netplus"]
    assert all(s.version == 1 for s in got)
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `.venv/Scripts/python -m pytest tests/test_store.py -v`
Expected: collection error, `ImportError: cannot import name 'store' from 'app'`.

- [ ] **Step 3: Write the implementation**

`api/app/store.py`:

```python
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
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `.venv/Scripts/python -m pytest tests/test_store.py -v`
Expected: 9 passed.

- [ ] **Step 5: Commit**

```bash
git add api/app/store.py api/tests/test_store.py
git commit -m "feat(api): versioned progress store with SQL-level preconditions"
```

---

## Task 3: Bearer token verification

**Files:**
- Create: `api/app/auth.py`
- Test: `api/tests/test_auth.py`
- Modify: `api/tests/conftest.py` (add the RSA key and token-minting fixtures)

**Interfaces:**
- Consumes: `get_settings` from Task 1.
- Produces:
  - `class AuthError(Exception)` -- carries a `reason: str`.
  - `verify_claims(token: str, key, *, issuer: str, audience: str, leeway: int = 30) -> str` -- returns the `sub` claim, raises `AuthError`. `key` is anything PyJWT accepts as a public key.
  - `class JwksVerifier` with `__init__(self, *, issuer: str, audience: str, jwks_url: str | None = None, leeway: int = 30)` and `verify(self, token: str) -> str`.
  - `current_user(request: Request) -> str` -- the FastAPI dependency Task 4 depends on. Reads `Authorization: Bearer <token>`, returns the user id, raises `HTTPException(401)` with a `WWW-Authenticate` header on failure.

The split matters: `verify_claims` is pure, so the tests mint their own RSA key and never touch the network, and the JWKS fetch is isolated in `JwksVerifier` where one manual end-to-end check at deploy time covers it.

- [ ] **Step 1: Write the failing test**

Append to `api/tests/conftest.py`:

```python
import time

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa


@pytest.fixture(scope="session")
def rsa_key():
    return rsa.generate_private_key(public_exponent=65537, key_size=2048)


@pytest.fixture(scope="session")
def mint(rsa_key):
    """Mint a signed JWT. Every claim is overridable so tests can break one."""

    def _mint(**overrides):
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
        return jwt.encode(claims, rsa_key, algorithm="RS256")

    return _mint
```

`api/tests/test_auth.py`:

```python
import time

import pytest

from app.auth import AuthError, verify_claims

ISSUER = "https://issuer.example"
AUDIENCE = "https://api.fieldreadyacademy.com"


def check(token, key, **kw):
    opts = {"issuer": ISSUER, "audience": AUDIENCE}
    opts.update(kw)
    return verify_claims(token, key.public_key(), **opts)


def test_valid_token_yields_the_subject(mint, rsa_key):
    assert check(mint(), rsa_key) == "user_01TEST"


def test_wrong_audience_is_rejected(mint, rsa_key):
    token = mint(aud="https://mcp.fieldreadyacademy.com/mcp")
    with pytest.raises(AuthError):
        check(token, rsa_key)


def test_wrong_issuer_is_rejected(mint, rsa_key):
    with pytest.raises(AuthError):
        check(mint(iss="https://evil.example"), rsa_key)


def test_expired_token_is_rejected(mint, rsa_key):
    now = int(time.time())
    with pytest.raises(AuthError):
        check(mint(iat=now - 7200, exp=now - 3600), rsa_key)


def test_token_without_a_subject_is_rejected(mint, rsa_key):
    with pytest.raises(AuthError):
        check(mint(sub=None), rsa_key)


def test_trailing_slash_on_the_issuer_is_tolerated(mint, rsa_key):
    assert check(mint(iss=ISSUER + "/"), rsa_key) == "user_01TEST"


def test_a_token_signed_by_another_key_is_rejected(mint, rsa_key):
    from cryptography.hazmat.primitives.asymmetric import rsa as _rsa

    other = _rsa.generate_private_key(public_exponent=65537, key_size=2048)
    with pytest.raises(AuthError):
        check(mint(), other)


def test_garbage_is_rejected_without_raising_something_else(rsa_key):
    with pytest.raises(AuthError):
        check("not-a-jwt", rsa_key)
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `.venv/Scripts/python -m pytest tests/test_auth.py -v`
Expected: collection error, `ModuleNotFoundError: No module named 'app.auth'`.

- [ ] **Step 3: Write the implementation**

`api/app/auth.py`:

```python
"""Bearer-token verification.

This service is an OAuth 2.1 resource server: it validates tokens and never
issues them. The audience check is the load-bearing part -- the MCP connector
and this API share a WorkOS tenant and therefore a signing key, so `aud` is
the only thing that stops a connector token from opening a learner's row.

Mirrors ServiceForge's api/app/auth.py, with the JWKS fetch split away from
the claim check so the claim rules are testable without a network.
"""

from __future__ import annotations

import threading
from typing import Any

import jwt
from fastapi import HTTPException, Request
from jwt import PyJWKClient

from .config import get_settings

ALGORITHMS = ["RS256", "RS384", "RS512", "ES256", "ES384", "PS256", "PS384"]
_DISCOVERY_PATHS = (
    "/.well-known/openid-configuration",
    "/.well-known/oauth-authorization-server",
)


class AuthError(Exception):
    def __init__(self, reason: str) -> None:
        super().__init__(reason)
        self.reason = reason


def verify_claims(
    token: str, key: Any, *, issuer: str, audience: str, leeway: int = 30
) -> str:
    """Return the `sub` of a valid token, or raise AuthError."""
    issuer = issuer.rstrip("/")
    try:
        claims: dict[str, Any] = jwt.decode(
            token,
            key,
            algorithms=ALGORITHMS,
            audience=audience,
            # Issuers differ on the trailing slash; accept both spellings.
            issuer=[issuer, issuer + "/"],
            leeway=leeway,
            options={"require": ["exp", "iss", "sub", "aud"]},
        )
    except jwt.PyJWTError as exc:
        raise AuthError(str(exc)) from exc
    sub = claims.get("sub")
    if not isinstance(sub, str) or not sub:
        raise AuthError("token has no usable sub claim")
    return sub


def discover_jwks_url(issuer: str) -> str:
    """`jwks_uri` from the issuer's OIDC or OAuth metadata (RFC 8414)."""
    import urllib.request
    import json

    base = issuer.rstrip("/")
    for path in _DISCOVERY_PATHS:
        try:
            with urllib.request.urlopen(base + path, timeout=10) as resp:
                doc = json.load(resp)
        except Exception:  # noqa: BLE001 - try the next well-known path
            continue
        if doc.get("jwks_uri"):
            return str(doc["jwks_uri"])
    raise AuthError(f"no jwks_uri in metadata for issuer {issuer}")


class JwksVerifier:
    """Verifies tokens against the issuer's published keys.

    The PyJWKClient is built on first use, not at import, so the service
    starts even when the issuer is briefly unreachable.
    """

    def __init__(
        self,
        *,
        issuer: str,
        audience: str,
        jwks_url: str | None = None,
        leeway: int = 30,
    ) -> None:
        self.issuer = issuer.rstrip("/")
        self.audience = audience
        self.leeway = leeway
        self._jwks_url = jwks_url or None
        self._jwks: PyJWKClient | None = None
        self._lock = threading.Lock()

    def _client(self) -> PyJWKClient:
        if self._jwks is None:
            with self._lock:
                if self._jwks is None:
                    url = self._jwks_url or discover_jwks_url(self.issuer)
                    self._jwks = PyJWKClient(url, cache_keys=True, lifespan=3600)
        return self._jwks

    def verify(self, token: str) -> str:
        try:
            signing_key = self._client().get_signing_key_from_jwt(token)
        except AuthError:
            raise
        except Exception as exc:  # noqa: BLE001 - network or malformed header
            raise AuthError(f"cannot resolve a signing key: {exc}") from exc
        return verify_claims(
            token,
            signing_key.key,
            issuer=self.issuer,
            audience=self.audience,
            leeway=self.leeway,
        )


_verifier: JwksVerifier | None = None
_verifier_lock = threading.Lock()


def get_verifier() -> JwksVerifier:
    global _verifier
    if _verifier is None:
        with _verifier_lock:
            if _verifier is None:
                s = get_settings()
                _verifier = JwksVerifier(
                    issuer=s.auth_issuer,
                    audience=s.auth_audience,
                    jwks_url=s.jwks_url or None,
                )
    return _verifier


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=401,
        detail=detail,
        headers={"WWW-Authenticate": 'Bearer realm="fieldready-progress"'},
    )


def current_user(request: Request) -> str:
    """FastAPI dependency: the signed-in learner's WorkOS `sub`."""
    if not get_settings().auth_issuer:
        raise _unauthorized("this service is not configured with an issuer")
    header = request.headers.get("authorization", "")
    scheme, _, token = header.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        raise _unauthorized("expected an Authorization: Bearer header")
    try:
        return get_verifier().verify(token.strip())
    except AuthError as exc:
        raise _unauthorized(exc.reason) from exc
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `.venv/Scripts/python -m pytest tests/test_auth.py -v`
Expected: 8 passed.

- [ ] **Step 5: Commit**

```bash
git add api/app/auth.py api/tests/test_auth.py api/tests/conftest.py
git commit -m "feat(api): verify AuthKit bearer tokens against issuer and audience"
```

---

## Task 4: HTTP routes

**Files:**
- Create: `api/app/main.py`
- Test: `api/tests/test_routes.py`
- Modify: `api/tests/conftest.py` (add the `client` fixture), `docs/superpowers/specs/2026-09-09-course-progress-sync-design.md` (correct the `If-Match: *` row)

**Interfaces:**
- Consumes: `store` from Task 2, `current_user` from Task 3, `get_settings` / `make_pool` / `apply_schema` from Task 1.
- Produces: `app: FastAPI`, and `get_pool(request: Request) -> ConnectionPool` for the tests to override.

The contract:

| Route | Behaviour |
|---|---|
| `GET /healthz` | No auth. `{"ok": true}` after a `SELECT 1`. 503 if the database is unreachable. |
| `GET /v1/progress` | `[{course_id, version, updated_at}]` for the caller, sorted by course id. |
| `GET /v1/progress/{course_id}` | `{state, version}` plus `ETag: "<version>"`. `If-None-Match` that matches -> 304 with no body. 404 when absent. |
| `PUT /v1/progress/{course_id}` | Needs a precondition. `If-Match: "<version>"` updates; `If-None-Match: *` (or `If-Match: *`) creates. 428 when neither is present, 412 when it does not hold. Returns `{version}` and the new `ETag` -- **not** the state. |
| `DELETE /v1/progress/{course_id}` | 204 whether or not a row was there. |

**Why PUT does not echo the state back** (decided 2026-09-10): the client just sent that state, so
returning it is pure waste -- up to 2 MB per write. It also closes a fidelity gap: `store.create`
and `store.update` build their `Record` from the dict the caller passed in, not from a re-read, and
Postgres's jsonb does not preserve object key order or numeric literal formatting. By never
exposing `state` on a write path, the question of whether that echo matches what was stored
stops existing. `GET` returns the stored value and remains the only source of truth for state.

- [ ] **Step 1: Write the failing test**

Append to `api/tests/conftest.py`:

```python
from fastapi.testclient import TestClient


@pytest.fixture
def client(pool):
    from app import main

    main.app.dependency_overrides[main.get_pool] = lambda: pool
    main.app.dependency_overrides[main.current_user] = lambda: "user_01TEST"
    with TestClient(main.app) as c:
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
```

`api/tests/test_routes.py`:

```python
STATE = {"v": 3, "course": "netplus", "lessons": {"u1l1": {"status": "done"}}}


def test_healthz_is_open(client):
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json() == {"ok": True}


def test_get_missing_is_404(client):
    assert client.get("/v1/progress/netplus").status_code == 404


def test_create_requires_a_precondition(client):
    r = client.put("/v1/progress/netplus", json={"state": STATE})
    assert r.status_code == 428


def test_create_with_if_none_match_star(client):
    r = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    assert r.status_code == 200
    assert r.json()["version"] == 1
    assert r.headers["etag"] == '"1"'


def test_if_match_star_is_accepted_as_a_create_alias(client):
    r = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-Match": "*"}
    )
    assert r.status_code == 200
    assert r.json()["version"] == 1


def test_create_over_an_existing_row_is_412(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    r = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    assert r.status_code == 412


def test_get_returns_state_and_etag(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    r = client.get("/v1/progress/netplus")
    assert r.status_code == 200
    assert r.json()["state"] == STATE
    assert r.headers["etag"] == '"1"'


def test_if_none_match_on_get_is_304(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    r = client.get("/v1/progress/netplus", headers={"If-None-Match": '"1"'})
    assert r.status_code == 304
    assert not r.content


def test_update_with_the_current_etag(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    newer = dict(STATE, passStreak=3)
    r = client.put(
        "/v1/progress/netplus", json={"state": newer}, headers={"If-Match": '"1"'}
    )
    assert r.status_code == 200
    assert r.json()["version"] == 2
    assert r.headers["etag"] == '"2"'


def test_put_does_not_echo_the_state_back(client):
    r = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    assert r.json() == {"version": 1}
    r2 = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-Match": '"1"'}
    )
    assert r2.json() == {"version": 2}


def test_update_with_a_stale_etag_is_412_and_changes_nothing(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    r = client.put(
        "/v1/progress/netplus",
        json={"state": {"v": 3, "wiped": True}},
        headers={"If-Match": '"99"'},
    )
    assert r.status_code == 412
    assert client.get("/v1/progress/netplus").json()["state"] == STATE


def test_unknown_state_version_is_422(client):
    r = client.put(
        "/v1/progress/netplus",
        json={"state": {"v": 4}},
        headers={"If-None-Match": "*"},
    )
    assert r.status_code == 422


def test_oversized_blob_is_413(client):
    fat = {"v": 3, "junk": "x" * 3_000_000}
    r = client.put(
        "/v1/progress/netplus", json={"state": fat}, headers={"If-None-Match": "*"}
    )
    assert r.status_code == 413


def test_bad_course_id_is_422(client):
    r = client.get("/v1/progress/NOT..a..course")
    assert r.status_code == 422


def test_list_is_scoped_to_the_caller(client_as):
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    a.put("/v1/progress/cbet", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    b.put("/v1/progress/secplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    got = b.get("/v1/progress").json()
    assert [row["course_id"] for row in got] == ["secplus"]


def test_delete_is_idempotent(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    assert client.delete("/v1/progress/netplus").status_code == 204
    assert client.delete("/v1/progress/netplus").status_code == 204
    assert client.get("/v1/progress/netplus").status_code == 404


def test_cors_preflight_allows_the_course_origin_and_exposes_etag(client):
    r = client.options(
        "/v1/progress/netplus",
        headers={
            "Origin": "https://fieldreadyacademy.com",
            "Access-Control-Request-Method": "PUT",
            "Access-Control-Request-Headers": "authorization,content-type,if-match",
        },
    )
    assert r.status_code == 200
    assert r.headers["access-control-allow-origin"] == "https://fieldreadyacademy.com"
    allowed = r.headers["access-control-allow-headers"].lower()
    assert "if-match" in allowed and "authorization" in allowed


def test_cors_response_exposes_the_etag_header(client):
    client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"}
    )
    r = client.get(
        "/v1/progress/netplus", headers={"Origin": "https://fieldreadyacademy.com"}
    )
    assert "etag" in r.headers["access-control-expose-headers"].lower()


def test_an_unlisted_origin_is_not_allowed(client):
    r = client.get(
        "/v1/progress", headers={"Origin": "https://evil.example"}
    )
    assert "access-control-allow-origin" not in r.headers
```

`test_cors_response_exposes_the_etag_header` is the one that silently breaks the whole feature if it is missing: without `Access-Control-Expose-Headers`, the browser receives the `ETag` but JavaScript cannot read it, so the client can never send `If-Match` and every write after the first fails.

- [ ] **Step 2: Run it to make sure it fails**

Run: `.venv/Scripts/python -m pytest tests/test_routes.py -v`
Expected: collection error, `ModuleNotFoundError: No module named 'app.main'`.

- [ ] **Step 3: Write the implementation**

`api/app/main.py`:

```python
"""FastAPI app: CORS, routes, and the mapping from store errors to status codes.

The server treats `state` as opaque apart from two checks it must make to
protect itself: the document version it understands, and a size ceiling.
Everything else about the blob is the client engine's business.
"""

from __future__ import annotations

import json
import logging
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Path, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

from . import store
from .auth import current_user
from .config import get_settings
from .db import apply_schema, make_pool

log = logging.getLogger(__name__)

COURSE_ID = r"^[a-z0-9-]{1,32}$"
STATE_VERSION = 3


class PutBody(BaseModel):
    state: dict


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    pool = make_pool(settings.db_url)
    apply_schema(pool)
    app.state.pool = pool
    try:
        yield
    finally:
        pool.close()


app = FastAPI(title="FieldReady progress", version="1.0.0", lifespan=lifespan)

_settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=_settings.allowed_origins,
    allow_methods=["GET", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "If-Match", "If-None-Match"],
    # Without this the browser gets the ETag but JavaScript cannot read it,
    # so the client could never send If-Match on its second write.
    expose_headers=["ETag"],
    # Bearer tokens, not cookies. Credentials stay off so the origin list is
    # enforced strictly.
    allow_credentials=False,
)


def get_pool(request: Request) -> ConnectionPool:
    return request.app.state.pool


def _etag(version: int) -> str:
    return f'"{version}"'


def _parse_if_match(raw: str | None) -> int | None:
    """The numeric version in an If-Match header, or None for `*`.

    Accepts `"12"` and the weak form `W/"12"`. Anything else is a 400: a
    malformed precondition must never be read as "no precondition".
    """
    if raw is None:
        return None
    raw = raw.strip()
    if raw == "*":
        return None
    if raw.startswith("W/"):
        raw = raw[2:].strip()
    try:
        return int(raw.strip('"'))
    except ValueError:
        raise HTTPException(status_code=400, detail="malformed If-Match header")


def _check_state(state: dict) -> None:
    if state.get("v") != STATE_VERSION:
        raise HTTPException(
            status_code=422,
            detail=f"unsupported state version {state.get('v')!r}; expected {STATE_VERSION}",
        )
    size = len(json.dumps(state).encode("utf-8"))
    limit = get_settings().max_blob_bytes
    if size > limit:
        raise HTTPException(
            status_code=413, detail=f"state is {size} bytes; the limit is {limit}"
        )


@app.get("/healthz")
def healthz(pool: ConnectionPool = Depends(get_pool)) -> dict:
    try:
        with pool.connection() as conn:
            conn.execute("SELECT 1")
    except Exception as exc:  # noqa: BLE001 - reported as a 503, not a 500
        # /healthz is unauthenticated, so the cause is logged rather than
        # returned: str(exc) from psycopg carries host and port detail.
        log.exception("healthz database check failed: %s", exc)
        raise HTTPException(status_code=503, detail="database unreachable")
    return {"ok": True}


@app.get("/v1/progress")
def list_progress(
    user_id: str = Depends(current_user),
    pool: ConnectionPool = Depends(get_pool),
) -> list[dict]:
    return [
        {
            "course_id": s.course_id,
            "version": s.version,
            "updated_at": s.updated_at.isoformat(),
        }
        for s in store.list_for_user(pool, user_id)
    ]


@app.get("/v1/progress/{course_id}")
def get_progress(
    response: Response,
    request: Request,
    course_id: str = Path(pattern=COURSE_ID),
    user_id: str = Depends(current_user),
    pool: ConnectionPool = Depends(get_pool),
):
    record = store.get(pool, user_id, course_id)
    if record is None:
        raise HTTPException(status_code=404, detail="no progress stored")
    tag = _etag(record.version)
    if request.headers.get("if-none-match", "").strip() == tag:
        return Response(status_code=304, headers={"ETag": tag})
    response.headers["ETag"] = tag
    return {"state": record.state, "version": record.version}


@app.put("/v1/progress/{course_id}")
def put_progress(
    body: PutBody,
    response: Response,
    request: Request,
    course_id: str = Path(pattern=COURSE_ID),
    user_id: str = Depends(current_user),
    pool: ConnectionPool = Depends(get_pool),
):
    _check_state(body.state)

    if_match = request.headers.get("if-match")
    if_none_match = request.headers.get("if-none-match")

    # `If-None-Match: *` is the correct HTTP spelling of "only if absent".
    # `If-Match: *` is accepted as an alias because the design doc named it.
    creating = (if_none_match or "").strip() == "*" or (if_match or "").strip() == "*"

    if not creating and if_match is None:
        raise HTTPException(
            status_code=428,
            detail="send If-Match with the current ETag, or If-None-Match: * to create",
        )

    try:
        if creating:
            record = store.create(pool, user_id, course_id, body.state)
        else:
            expected = _parse_if_match(if_match)
            record = store.update(pool, user_id, course_id, body.state, expected)
    except store.Stale as exc:
        raise HTTPException(status_code=412, detail=str(exc)) from exc

    response.headers["ETag"] = _etag(record.version)
    # Deliberately no `state`: the client just sent it, and `record.state` is
    # the dict it passed in rather than a re-read of what jsonb stored. GET is
    # the only place state comes back.
    return {"version": record.version}


@app.delete("/v1/progress/{course_id}", status_code=204)
def delete_progress(
    course_id: str = Path(pattern=COURSE_ID),
    user_id: str = Depends(current_user),
    pool: ConnectionPool = Depends(get_pool),
) -> Response:
    store.delete(pool, user_id, course_id)
    return Response(status_code=204)
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `.venv/Scripts/python -m pytest tests/test_routes.py -v`
Expected: 19 passed.

Then the whole suite:

Run: `.venv/Scripts/python -m pytest -v`
Expected: 38 passed.

- [ ] **Step 5: Correct the design doc**

In `docs/superpowers/specs/2026-09-09-course-progress-sync-design.md`, in the API table, replace:

```
| `PUT /v1/progress/{course_id}` | Requires `If-Match: "<version>"`. 412 when stale. `If-Match: *` creates. Returns the new version. |
```

with:

```
| `PUT /v1/progress/{course_id}` | Requires a precondition: `If-Match: "<version>"` updates, `If-None-Match: *` creates (`If-Match: *` is accepted as an alias). 428 when neither is sent, 412 when the precondition fails. Returns `{version}` and the new `ETag`; the state is not echoed back. |
```

Add this note under that table, so the reason survives:

```
The write paths deliberately do not return the state. The client already holds what it sent,
echoing a blob of up to 2 MB back is waste, and the value the server could cheaply echo is the
request's own dict rather than a re-read of what jsonb stored (jsonb preserves neither object key
order nor numeric literal formatting). `GET` is the only source of truth for state.
```

- [ ] **Step 6: Commit**

```bash
git add api/app/main.py api/tests/test_routes.py api/tests/conftest.py docs/superpowers/specs/2026-09-09-course-progress-sync-design.md
git commit -m "feat(api): progress routes with ETag preconditions and CORS"
```

---

## Task 5: Deploy to the Hetzner box

**Files:**
- Create: `api/deploy/fieldready-api.service`, `api/deploy/Caddyfile.snippet`, `api/README.md`
- Modify: on the server, `/etc/caddy/Caddyfile`

Prerequisite: Task 0 is done and `api.fieldreadyacademy.com` resolves to `87.99.151.69`. Caddy cannot issue a certificate before it does.

- [ ] **Step 1: Write the deployment files**

`api/deploy/fieldready-api.service`:

```ini
[Unit]
Description=FieldReady Academy course progress API
After=network-online.target postgresql.service
Wants=network-online.target
Requires=postgresql.service

[Service]
Type=exec
WorkingDirectory=/opt/fieldready-api
EnvironmentFile=/opt/fieldready-api/.env
# Bound to loopback: Caddy is the only way in, ufw never opens 8001.
# 8000 belongs to ServiceForge.
ExecStart=/opt/fieldready-api/.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=3
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/opt/fieldready-api
ProtectKernelTunables=yes
ProtectControlGroups=yes
RestrictSUIDSGID=yes

[Install]
WantedBy=multi-user.target
```

`api/deploy/Caddyfile.snippet`:

```
# Course progress API. Loopback only; this is the only route in. Blobs are up
# to 2 MB, so the request body ceiling is set above that with room to spare.
api.fieldreadyacademy.com {
	encode zstd gzip
	request_body {
		max_size 4MB
	}
	reverse_proxy localhost:8001
}
```

- [ ] **Step 2: Confirm the database is there**

Postgres, the `fra` role and both databases were created on 2026-09-10 (see Task 0). Confirm rather than recreate:

```bash
ssh hetzner "pg_lsclusters"
ssh hetzner 'PGPASSWORD=$(cat /root/.fra-db-password) psql -h 127.0.0.1 -p 5433 -U fra -d fra_progress -tAc "select current_database()"'
```

Expected: cluster `18 main 5433 online`, then `fra_progress`. Postgres listens on localhost only and ufw opens nothing but 22, 80 and 443, so the database is unreachable from off the box.

- [ ] **Step 3: Copy the service and build its venv**

```bash
ssh hetzner "mkdir -p /opt/fieldready-api"
scp -r api/app api/pyproject.toml hetzner:/opt/fieldready-api/
ssh hetzner "cd /opt/fieldready-api && python3 -m venv .venv && .venv/bin/pip install -e ."
```

Expected: pip finishes with `Successfully installed ...`. Every dependency has a cp314 wheel; if any tries to build from source, stop and report it rather than installing build tools.

- [ ] **Step 4: Write the server .env**

Write it on the box, reading the password from the file so it never becomes a shell argument or appears in a transcript. Pipe the script over stdin rather than nesting quotes -- nested quoting through `ssh` is what produced a leaked password and a failed `ALTER ROLE` on 2026-09-10:

```bash
cat > /tmp/write-env.sh <<'SCRIPT'
#!/bin/sh
set -e
PW=$(cat /root/.fra-db-password)
mkdir -p /opt/fieldready-api
umask 077
cat > /opt/fieldready-api/.env <<ENV
PROGRESS_DB_URL=postgresql://fra:$PW@127.0.0.1:5433/fra_progress
PROGRESS_AUTH_ISSUER=https://prepared-song-48-staging.authkit.app
PROGRESS_AUTH_AUDIENCE=https://api.fieldreadyacademy.com
PROGRESS_JWKS_URL=
PROGRESS_ALLOWED_ORIGINS_RAW=https://fieldreadyacademy.com,http://localhost:8000
PROGRESS_MAX_BLOB_BYTES=2000000
ENV
chmod 600 /opt/fieldready-api/.env
echo "wrote $(wc -l < /opt/fieldready-api/.env) lines"
SCRIPT
ssh hetzner "bash -s" < /tmp/write-env.sh
```

Expected: `wrote 6 lines`. Note the inner heredoc delimiter `ENV` is unquoted so `$PW` expands, while the outer `SCRIPT` is quoted so nothing expands locally. Port **5433**, not 5432.

- [ ] **Step 5: Install and start the unit**

```bash
scp api/deploy/fieldready-api.service hetzner:/etc/systemd/system/
ssh hetzner "systemctl daemon-reload && systemctl enable --now fieldready-api && systemctl is-active fieldready-api"
```

Expected: `active`. If not: `ssh hetzner "journalctl -u fieldready-api -n 50 --no-pager"`.

Verify on the box before touching Caddy:

```bash
ssh hetzner "curl -s localhost:8001/healthz"
```

Expected: `{"ok":true}`.

- [ ] **Step 6: Add the Caddy block**

Append the snippet, then validate **before** reloading -- a bad Caddyfile takes the whole course site down with it:

```bash
ssh hetzner "cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak"
scp api/deploy/Caddyfile.snippet hetzner:/tmp/api.caddy
ssh hetzner "cat /tmp/api.caddy >> /etc/caddy/Caddyfile && caddy validate --config /etc/caddy/Caddyfile"
```

Expected: `Valid configuration`. If it is not, restore with `cp /etc/caddy/Caddyfile.bak /etc/caddy/Caddyfile` and stop.

```bash
ssh hetzner "systemctl reload caddy && systemctl is-active caddy"
```

Expected: `active`.

- [ ] **Step 7: Verify from outside**

```bash
curl -s https://api.fieldreadyacademy.com/healthz
curl -s -o /dev/null -w '%{http_code}\n' https://api.fieldreadyacademy.com/v1/progress
curl -s -o /dev/null -w '%{http_code}\n' https://fieldreadyacademy.com/netplus/
```

Expected: `{"ok":true}`, then `401` (no token -- the auth path is live), then `200` (the course site is untouched). A certificate error means DNS has not propagated or Caddy fell back to the Let's Encrypt staging issuer after failed challenges; check `journalctl -u caddy -n 50 --no-pager`.

- [ ] **Step 8: Write the README**

`api/README.md`:

````markdown
# FieldReady progress API

A versioned blob store for course progress. One row per (learner, course), holding the
exact JSON the course engine's `exportable()` produces.

**What it deliberately is not:** it does not merge, and it does not interpret the blob
beyond checking `v == 3` and a size ceiling. Merge runs on the client, in
`engine/merge.js`, because the merge rules are a function of the state shape and that
shape is defined in `engine/app.js`. Adding a state field must never require an API
redeploy.

Design: `docs/superpowers/specs/2026-09-09-course-progress-sync-design.md`.

## Routes

| Route | Behaviour |
|---|---|
| `GET /healthz` | Open. `{"ok": true}`, or 503 if Postgres is unreachable. |
| `GET /v1/progress` | The caller's courses: `[{course_id, version, updated_at}]`. |
| `GET /v1/progress/{course_id}` | `{state, version}` plus `ETag: "<version>"`. `If-None-Match` -> 304. 404 when absent. |
| `PUT /v1/progress/{course_id}` | `If-Match: "<version>"` updates; `If-None-Match: *` creates. 428 with no precondition, 412 when it fails. |
| `DELETE /v1/progress/{course_id}` | 204, whether or not a row was there. |

412 is the entire concurrency mechanism. On 412 the client re-GETs, re-merges and
retries, bounded at three attempts. Merge is associative and idempotent, so retrying is
always safe.

## Local development

```bash
ssh -N -L 55432:127.0.0.1:5433 hetzner   # leave running; see tunnel.md
cd api
python -m venv .venv
.venv/Scripts/python -m pip install -e ".[dev]"   # .venv/bin/python on Linux
cp .env.example .env                     # then set PROGRESS_DB_URL, see tunnel.md
.venv/Scripts/python -m pytest
.venv/Scripts/python -m uvicorn app.main:app --reload --port 8001
```

Tests run against the real `fra_test` database on the box, through the tunnel. They
`TRUNCATE` between cases, and `conftest.py` refuses to run at all against
`fra_progress`.

## Ports on the box, and the trap in them

| Port | Owner |
|---|---|
| 8000 | ServiceForge uvicorn |
| 8001 | this API |
| 5432 | ServiceForge's Postgres -- a `pgvector/pgvector:pg16` **Docker container** |
| 5433 | the system Postgres 18 cluster, which is **ours** |

Connecting to 5432 by mistake does not fail in a way that tells you what is wrong: the
container has no `fra` role, so it answers `password authentication failed for user
"fra"`, which reads like a bad password. If you see that error, check the port first.

The two databases stay separate on purpose -- the design doc requires either product to
be restartable without taking the other down.

## Deployment

Runs on the Hetzner box (87.99.151.69) as `fieldready-api.service`, uvicorn bound to
**127.0.0.1:8001**, reached only through Caddy at `api.fieldreadyacademy.com`. ufw opens
22, 80 and 443 only, so Postgres and the API are unreachable from outside the box.

```bash
scp -r app pyproject.toml hetzner:/opt/fieldready-api/
ssh hetzner "cd /opt/fieldready-api && .venv/bin/pip install -e . && systemctl restart fieldready-api"
ssh hetzner "curl -s localhost:8001/healthz"
```

Config is `/opt/fieldready-api/.env` on the box, `chmod 600`, not in git. The database
password appears there and nowhere else. After editing it, `systemctl restart
fieldready-api`.

Never edit `/etc/caddy/Caddyfile` without running `caddy validate --config
/etc/caddy/Caddyfile` before `systemctl reload caddy` -- a bad config takes the course
site down with it.

## Auth

Tokens are WorkOS AuthKit JWTs, verified against the issuer's JWKS. The audience must
be `https://api.fieldreadyacademy.com`. The MCP connector shares this tenant and
therefore this signing key, so **audience is the only thing separating a course token
from a connector token** -- do not loosen that check.

The service currently points at the Staging environment. Production is a separate
cutover: its own issuer, its own resource indicator, redirect URIs, web origins, and a
Google OAuth app of Blake's before anyone can sign in at all.
````

- [ ] **Step 9: Commit**

```bash
git add api/deploy api/README.md
git commit -m "feat(api): systemd unit, Caddy block, and deployment notes"
```

---

## Done when

- `npm test` still passes (this plan touches no JavaScript).
- `cd api && .venv/Scripts/python -m pytest` is green: 46 tests (the plan specified 38; Task 3 added 2 auth tests and Task 4 added 6 route tests, all closing verified discrimination gaps).
- `curl https://api.fieldreadyacademy.com/healthz` returns `{"ok":true}` from a machine that is not the server.
- An unauthenticated `GET /v1/progress` returns 401.
- `https://fieldreadyacademy.com/netplus/` still serves the course.

Plan 3 (auth UI and sync wiring) then has a server to talk to, and must resolve the `touchedAt`
"last opened versus last changed" flaw rather than papering over it -- `settings` is still pure
last-write-wins on that field, so a second device merely being opened would wipe `timer:false`
and any saved test setup.
