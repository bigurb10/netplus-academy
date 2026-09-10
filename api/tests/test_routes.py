import contextlib

import psycopg
import psycopg_pool
import pytest

STATE = {"v": 3, "course": "netplus", "lessons": {"u1l1": {"status": "done"}}}


@contextlib.contextmanager
def _pool_override(fake_pool):
    """Temporarily override get_pool, restoring exactly what was there.

    Not `dependency_overrides.clear()`: on the `client` fixture, that also
    wipes its `current_user` override, not just the `get_pool` one being
    set here. Nothing later in these tests needs auth, so that landmine
    never actually goes off -- but save-and-restore is the version that
    can't leak into the next assertion in the same test, or the next test,
    however this fixture's usage evolves.
    """
    from app import main

    original = main.app.dependency_overrides.get(main.get_pool)
    main.app.dependency_overrides[main.get_pool] = lambda: fake_pool
    try:
        yield
    finally:
        if original is not None:
            main.app.dependency_overrides[main.get_pool] = original
        else:
            main.app.dependency_overrides.pop(main.get_pool, None)


def test_healthz_is_open(client):
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json() == {"ok": True}


def test_healthz_does_not_leak_exception_text(client):
    class BrokenPool:
        def connection(self):
            raise Exception("host=secret-internal-host port=5433")

    with _pool_override(BrokenPool()):
        r = client.get("/healthz")
    assert r.status_code == 503
    assert r.json()["detail"] == "database unreachable"
    assert "secret-internal-host" not in r.text

    # _pool_override restores get_pool rather than clearing every override,
    # so the client fixture's own current_user override must still be in
    # place here. A plain dependency_overrides.clear() in _pool_override's
    # teardown would wipe that too, and this request would 401 instead.
    r2 = client.get("/v1/progress")
    assert r2.status_code == 200


def test_pool_exhaustion_is_503_with_retry_after_not_500(client):
    # Simulates a burst that outruns max_size=8: pool.connection() raises
    # PoolTimeout rather than handing back a connection.
    class ExhaustedPool:
        def connection(self):
            raise psycopg_pool.PoolTimeout(
                "couldn't get a connection within 30.00 sec"
            )

    with _pool_override(ExhaustedPool()):
        r = client.get("/v1/progress")
    assert r.status_code == 503
    assert r.headers["retry-after"]
    assert r.json()["detail"] != ""


def test_dead_connection_after_a_postgres_restart_is_503_not_500(client):
    # Simulates a connection handed out just after Postgres restarted:
    # psycopg raises OperationalError, not something jsonb/state-shaped.
    class DownPool:
        def connection(self):
            raise psycopg.OperationalError(
                "connection to server at secret-internal-host, port 5433 failed"
            )

    with _pool_override(DownPool()):
        r = client.get("/v1/progress")
    assert r.status_code == 503
    assert r.headers["retry-after"]
    assert r.json()["detail"] == "database unreachable"
    assert "secret-internal-host" not in r.text


def test_nul_byte_in_state_is_422_not_500(client):
    # Real round trip against the real database (no mocking): jsonb accepts
    # any valid JSON except a literal NUL inside a string, which
    # json.dumps happily produces from a Python string containing "\x00".
    # Without the DataError handler this is an unhandled psycopg error and
    # a 500 -- and, per the plan-3 sync client's retry-from-dirty-flag
    # design, a blob that would then fail to sync forever, silently.
    r = client.put(
        "/v1/progress/netplus",
        json={"state": {"v": 3, "note": "bad\x00null"}},
        headers={"If-None-Match": "*"},
    )
    assert r.status_code == 422
    assert r.json()["detail"] != ""


def test_data_error_detail_does_not_leak_the_offending_content(client):
    # The mocked twin of the real test above: pins that the handler's
    # detail is the static string in main.py, not str(exc) (which for a
    # real UntranslatableCharacter includes a CONTEXT line quoting the
    # rejected JSON back -- exactly the free-text content this is meant to
    # avoid echoing to the client that sent it).
    class RejectingPool:
        def connection(self):
            raise psycopg.errors.UntranslatableCharacter(
                "unsupported Unicode escape sequence\n"
                'DETAIL:  \\u0000 cannot be converted to text.\n'
                'CONTEXT:  JSON data, line 1: {"v": 3, "secret_feedback": '
                '"very private free-text content"'
            )

    with _pool_override(RejectingPool()):
        r = client.put(
            "/v1/progress/netplus",
            json={"state": {"v": 3, "note": "whatever"}},
            headers={"If-None-Match": "*"},
        )
    assert r.status_code == 422
    assert "very private free-text content" not in r.text


def test_api_docs_are_disabled(client):
    for path in ("/docs", "/redoc", "/openapi.json"):
        assert client.get(path).status_code == 404, path


def test_parse_if_match_raises_on_a_star_rather_than_returning_none(client):
    # Mutation testing / contract test: put_progress only ever calls
    # _parse_if_match after routing None and "*" to the create path, so
    # neither is valid input here. Pins that the dead "*" -> None branch
    # was replaced with a raise (a contract violation), not left silently
    # swallowed -- which would make the return type `int | None` a lie
    # again and could re-open a path where "*" is read as "no
    # precondition" instead of surfacing the caller's own bug.
    from app.main import _parse_if_match

    with pytest.raises(AssertionError):
        _parse_if_match("*")


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


def test_if_none_match_with_a_specific_value_is_not_a_create_alias(client):
    # Mutation testing: only `If-None-Match: *` means "create if absent". A
    # concrete value (e.g. from a client that mistakenly echoes back an ETag
    # in If-None-Match rather than If-Match) must not be treated as a create
    # alias just because the header is present -- it must still land on the
    # 428 "no recognized precondition" path, not silently create or update.
    r = client.put(
        "/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": '"1"'}
    )
    assert r.status_code == 428


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


def test_malformed_if_match_is_400(client):
    # Mutation testing: if _parse_if_match swallowed a ValueError and
    # returned None instead of raising, a garbled If-Match header would be
    # read as "no precondition" and drift toward either an unintended create
    # or a permanent, wrongly-labelled 412 -- never surfacing the client's
    # mistake. No other test here sends an If-Match value that is neither a
    # bare integer version nor "*", so this is the only test that catches it.
    r = client.put(
        "/v1/progress/netplus",
        json={"state": STATE},
        headers={"If-Match": '"not-a-version"'},
    )
    assert r.status_code == 400


def test_list_is_scoped_to_the_caller(client_as):
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    a.put("/v1/progress/cbet", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    b.put("/v1/progress/secplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    got = b.get("/v1/progress").json()
    assert [row["course_id"] for row in got] == ["secplus"]


def test_get_is_scoped_to_the_caller(client_as):
    # Mutation testing: the brief's only isolation test exercises the list
    # route. Nothing else here creates a row as one user and then reads that
    # same course_id as a different user, so a route that dropped its
    # user_id filter on a single-course GET would go uncaught. This closes
    # that gap: user_b must not be able to read user_a's row for a course_id
    # user_b never wrote.
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    assert b.get("/v1/progress/netplus").status_code == 404


def test_create_is_scoped_to_the_caller(client_as):
    # Mutation testing: two different users creating the same course_id must
    # not collide (the primary key is (user_id, course_id)) and must not see
    # each other's state on the following GET. Closes the same gap as above
    # for the create path and for GET's scoping after a create.
    #
    # `client_as` returns clients that share one FastAPI app instance and
    # its dependency_overrides, so "current user" is whichever override was
    # set most recently -- not fixed per client returned. Re-call client_as
    # to switch back to a given user before making requests as them again.
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    other = dict(STATE, course="different")
    r = b.put(
        "/v1/progress/netplus", json={"state": other}, headers={"If-None-Match": "*"}
    )
    assert r.status_code == 200
    assert r.json()["version"] == 1
    assert b.get("/v1/progress/netplus").json()["state"] == other
    a = client_as("user_a")
    assert a.get("/v1/progress/netplus").json()["state"] == STATE


def test_update_is_scoped_to_the_caller(client_as):
    # Mutation testing: user_b has no row for a course_id only user_a has
    # written, so no If-Match value user_b sends can ever be current for
    # user_b -- an update that ignored user_id would instead match user_a's
    # row and silently overwrite it. Closes that gap for the update path.
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    r = b.put(
        "/v1/progress/netplus", json={"state": {"v": 3, "wiped": True}},
        headers={"If-Match": '"1"'},
    )
    assert r.status_code == 412
    a = client_as("user_a")
    assert a.get("/v1/progress/netplus").json()["state"] == STATE


def test_delete_is_scoped_to_the_caller(client_as):
    # Mutation testing: user_b deleting a course_id only user_a has written
    # must not remove user_a's row -- a delete that ignored user_id would
    # delete the wrong owner's data instead of just being a no-op for user_b.
    a = client_as("user_a")
    a.put("/v1/progress/netplus", json={"state": STATE}, headers={"If-None-Match": "*"})
    b = client_as("user_b")
    assert b.delete("/v1/progress/netplus").status_code == 204
    a = client_as("user_a")
    assert a.get("/v1/progress/netplus").status_code == 200


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
