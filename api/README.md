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

**Live at `https://api.fieldreadyacademy.com` since 2026-09-10.** The DNS A record and the
Caddy block are both in place, with a production Let's Encrypt certificate. `/healthz`
returns `{"ok":true}` from the internet and every `/v1/progress` route returns 401 without
a token; `/v1/feedback` accepts anonymous POSTs.

**Redeploying is not automatic.** The service runs from a copy under `/opt/fieldready-api`,
so a change under `api/app/` does nothing until it is copied up. This bit once already: the
box ran pre-review code for hours, detectable only because `/docs` answered 200 when the
current code disables it. The code tree is read-only to the service and it runs as the
non-root `fieldready` user, so the chown and the precompile below are not optional.

Runs on the Hetzner box (87.99.151.69) as `fieldready-api.service`, uvicorn bound to
**127.0.0.1:8001**, reached only through Caddy at `api.fieldreadyacademy.com`. ufw opens
22, 80 and 443 only, so Postgres and the API are unreachable from outside the box.

The service runs as an unprivileged system user, `fieldready` (no login shell, no
home), not root. A redeploy that copies fresh files in must `chown` them back to
`fieldready:fieldready`, or the service will fail to start (or fail `/healthz`, since it
can no longer read `.env`) under the new files' root ownership:

```bash
scp -r app pyproject.toml hetzner:/opt/fieldready-api/
ssh hetzner "chown -R fieldready:fieldready /opt/fieldready-api"
ssh hetzner "cd /opt/fieldready-api && .venv/bin/pip install -e . && systemctl restart fieldready-api"
ssh hetzner "curl -s localhost:8001/healthz"
```

Config is `/opt/fieldready-api/.env` on the box, `chmod 600`, owned
`fieldready:fieldready`, not in git. The database password appears there and nowhere
else. After editing it, `systemctl restart fieldready-api`.

### Resource limits

The unit sets `MemoryMax=512M` / `MemoryHigh=384M` and uvicorn is started with
`--limit-concurrency 64`. FastAPI buffers and JSON-parses request bodies before any
dependency (including auth) runs, so an anonymous, unauthenticated caller can already
make the box do real parsing work; without a memory ceiling an OOM here is an OOM on
the box, and the kernel is free to kill ServiceForge (port 8000), Postgres, or Caddy --
which serves the live course site -- instead of this service. With the ceiling in
place, this service is the one that gets killed and restarted (`Restart=always`), not
its neighbors.

The Caddy `request_body { max_size }` in `deploy/Caddyfile.snippet` (once that block is
live) is set to **2500KB**, just above the app's `PROGRESS_MAX_BLOB_BYTES` of
2,000,000 bytes (`api/app/config.py` / `.env`). These two numbers exist to track each
other -- the edge ceiling should sit just above the app ceiling, not far above it -- so
change them together, never one without the other.

`StartLimitIntervalSec=600` / `StartLimitBurst=5` are set explicitly in `[Unit]`: a
failed start caused by, say, an empty `PROGRESS_DB_URL` can take ~30s to time out its
Postgres pool, which outlasts systemd's default rate-limit window. Without an explicit
window, a persistently failing service would retry forever instead of eventually
stopping.

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
