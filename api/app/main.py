"""FastAPI app: CORS, routes, and the mapping from store errors to status codes.

The server treats `state` as opaque apart from two checks it must make to
protect itself: the document version it understands, and a size ceiling.
Everything else about the blob is the client engine's business.
"""

from __future__ import annotations

import json
import logging
from contextlib import asynccontextmanager

import psycopg
from fastapi import Depends, FastAPI, HTTPException, Path, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from psycopg_pool import ConnectionPool, PoolTimeout
from pydantic import BaseModel

from . import store
from .auth import current_user
from .config import get_settings
from .db import apply_schema, make_pool

log = logging.getLogger(__name__)

COURSE_ID = r"^[a-z0-9-]{1,32}$"
STATE_VERSION = 3

# Retry-After values for the 503s below. Pool contention tends to clear in
# well under a second once the burst passes; a dead connection takes longer
# to notice and reconnect from (see db.py's `check=`), so it gets a longer
# suggested wait.
POOL_TIMEOUT_RETRY_AFTER = 2
DB_OPERATIONAL_RETRY_AFTER = 10


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


app = FastAPI(
    title="FieldReady progress",
    version="1.0.0",
    lifespan=lifespan,
    # No public docs: an anonymous caller gets no route surface or schema.
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

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


def _parse_if_match(raw: str) -> int:
    """The numeric version in an If-Match header.

    Accepts `"12"` and the weak form `W/"12"`. Anything else is a 400: a
    malformed precondition must never be read as "no precondition".

    `put_progress` only reaches this after routing `None` and `*` to the
    create path, so neither is a valid input here -- receiving one is a bug
    in the caller, not a malformed header from the client, and is treated
    as a contract violation rather than folded into the 400 response.
    """
    if raw is None or raw.strip() == "*":
        raise AssertionError(
            "_parse_if_match must not be called with None or '*'; "
            "put_progress routes both to the create path first"
        )
    raw = raw.strip()
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


@app.exception_handler(PoolTimeout)
async def handle_pool_timeout(request: Request, exc: PoolTimeout) -> JSONResponse:
    # The threadpool (40 slots) can outrun max_size=8 under a burst. That is
    # contention, not an outage -- log it and ask the client to back off
    # briefly rather than surfacing psycopg_pool's internals as a 500.
    log.exception("Connection pool exhausted")
    return JSONResponse(
        status_code=503,
        content={"detail": "service is busy; try again shortly"},
        headers={"Retry-After": str(POOL_TIMEOUT_RETRY_AFTER)},
    )


@app.exception_handler(psycopg.OperationalError)
async def handle_operational_error(
    request: Request, exc: psycopg.OperationalError
) -> JSONResponse:
    # Covers a dead connection handed out after Postgres restarts, and any
    # other failure to reach the database. Same treatment as /healthz: log
    # the cause (which can carry host/port detail), return a generic detail.
    log.exception("Database operation failed")
    return JSONResponse(
        status_code=503,
        content={"detail": "database unreachable"},
        headers={"Retry-After": str(DB_OPERATIONAL_RETRY_AFTER)},
    )


@app.exception_handler(psycopg.DataError)
async def handle_data_error(request: Request, exc: psycopg.DataError) -> JSONResponse:
    # jsonb rejects some strings valid JSON permits -- notably a literal NUL (U+0000) inside
    # a string. Without this, that state fails to store as a 500 and (given
    # the sync client's retry-from-dirty-flag design) never syncs, silently,
    # forever. 422 tells the client this write will never succeed as sent.
    log.exception("Database rejected the request as malformed data")
    return JSONResponse(
        status_code=422,
        content={"detail": "state could not be stored: contains data postgres cannot accept"},
    )


@app.get("/healthz")
def healthz(pool: ConnectionPool = Depends(get_pool)) -> dict:
    try:
        with pool.connection() as conn:
            conn.execute("SELECT 1")
    except Exception as exc:  # noqa: BLE001 - reported as a 503, not a 500
        log.exception("Database connection failed in healthz check")
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


# get_progress and put_progress deliberately carry no return-type
# annotation. FastAPI only builds a `response_model` -- and so only
# re-validates and re-serializes the return value -- when a route is
# annotated. These two routes carry the blob itself (up to
# max_blob_bytes, 2 MB); annotating them would silently double the cost
# of every read (and write) by making FastAPI walk and rebuild that dict
# a second time after the handler already built the response. healthz and
# list_progress are annotated because their payloads are tiny, not because
# annotating is generally free here -- keep these two bare when tidying
# types elsewhere in this file.
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
