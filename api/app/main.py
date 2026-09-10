"""FastAPI app: CORS, routes, and the mapping from store errors to status codes.

The server treats `state` as opaque apart from two checks it must make to
protect itself: the document version it understands, and a size ceiling.
Everything else about the blob is the client engine's business.
"""

from __future__ import annotations

import json
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Path, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

from . import store
from .auth import current_user
from .config import get_settings
from .db import apply_schema, make_pool

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
        raise HTTPException(status_code=503, detail=f"database unreachable: {exc}")
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
