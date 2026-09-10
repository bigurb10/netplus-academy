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

As of 2026-09-10, the Caddy block and the `api.fieldreadyacademy.com` DNS record are
not yet in place, so the service is reachable only on loopback (`localhost:8001` on the
box itself), not from the internet.

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
