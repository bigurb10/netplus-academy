"""Tests for auth as it is actually wired, not just the pure claim rules.

Every route test elsewhere in this suite goes through `client` or
`client_as`, both of which override `main.current_user` -- so none of them
can tell a real `Depends(current_user)` from a deleted one. `test_auth.py`
only ever calls the pure `verify_claims` function directly, so it never
touches `current_user`, `JwksVerifier.verify`, `_client`,
`get_verifier`, or `discover_jwks_url` either.

Everything here runs offline: the JWKS "server" is a local http.server on
an ephemeral loopback port, shut down in a fixture teardown so it cannot
leak a thread between tests. Nothing here contacts WorkOS or the internet.
"""

from __future__ import annotations

import http.server
import json
import socket
import threading

import pytest
from fastapi import HTTPException
from jwt.algorithms import RSAAlgorithm
from starlette.requests import Request as StarletteRequest

from app import auth as auth_module
from app.auth import AuthUnavailable, JwksVerifier, current_user, discover_jwks_url

ISSUER = "https://issuer.example"
AUDIENCE = "https://api.fieldreadyacademy.com"


def _closed_port() -> int:
    """A localhost port nothing is listening on.

    Binding to port 0 asks the OS for a free ephemeral port; closing the
    socket immediately frees it again without anything else claiming it in
    the meantime, so a connection there fails fast (refused), not slow
    (timed out) -- both loopback-only, never touching the network.
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def _make_request(headers: dict[str, str] | None = None) -> StarletteRequest:
    raw_headers = [
        (k.lower().encode("ascii"), v.encode("ascii")) for k, v in (headers or {}).items()
    ]
    scope = {
        "type": "http",
        "method": "GET",
        "path": "/v1/progress",
        "headers": raw_headers,
    }
    return StarletteRequest(scope)


class FakeSettings:
    def __init__(self, *, auth_issuer: str) -> None:
        self.auth_issuer = auth_issuer
        self.auth_audience = AUDIENCE
        self.jwks_url = ""


# ---------------------------------------------------------------------------
# Route-level: the real current_user dependency, no bearer token.
# ---------------------------------------------------------------------------


def test_list_progress_requires_auth(client_anon):
    r = client_anon.get("/v1/progress")
    assert r.status_code == 401


def test_get_progress_requires_auth(client_anon):
    r = client_anon.get("/v1/progress/netplus")
    assert r.status_code == 401


def test_put_progress_requires_auth(client_anon):
    r = client_anon.put(
        "/v1/progress/netplus",
        json={"state": {"v": 3}},
        headers={"If-None-Match": "*"},
    )
    assert r.status_code == 401


def test_delete_progress_requires_auth(client_anon):
    r = client_anon.delete("/v1/progress/netplus")
    assert r.status_code == 401


def test_401_response_carries_www_authenticate(client_anon):
    r = client_anon.get("/v1/progress")
    assert r.status_code == 401
    assert "www-authenticate" in {k.lower() for k in r.headers}
    assert "Bearer" in r.headers["www-authenticate"]


# ---------------------------------------------------------------------------
# current_user directly: the pieces client_anon can't isolate on its own.
# ---------------------------------------------------------------------------


def test_current_user_with_no_issuer_configured_is_401(monkeypatch):
    monkeypatch.setattr(auth_module, "get_settings", lambda: FakeSettings(auth_issuer=""))
    with pytest.raises(HTTPException) as exc_info:
        current_user(_make_request())
    assert exc_info.value.status_code == 401


def test_current_user_with_no_authorization_header_is_401(monkeypatch):
    monkeypatch.setattr(
        auth_module, "get_settings", lambda: FakeSettings(auth_issuer=ISSUER)
    )
    with pytest.raises(HTTPException) as exc_info:
        current_user(_make_request())
    assert exc_info.value.status_code == 401


def test_current_user_with_a_non_bearer_scheme_is_401(monkeypatch):
    monkeypatch.setattr(
        auth_module, "get_settings", lambda: FakeSettings(auth_issuer=ISSUER)
    )
    request = _make_request({"Authorization": "Basic xxx"})
    with pytest.raises(HTTPException) as exc_info:
        current_user(request)
    assert exc_info.value.status_code == 401


def test_current_user_with_an_empty_bearer_token_is_401(monkeypatch):
    monkeypatch.setattr(
        auth_module, "get_settings", lambda: FakeSettings(auth_issuer=ISSUER)
    )
    request = _make_request({"Authorization": "Bearer "})
    with pytest.raises(HTTPException) as exc_info:
        current_user(request)
    assert exc_info.value.status_code == 401


# ---------------------------------------------------------------------------
# JwksVerifier end to end: a real JWKS fetch, over loopback HTTP only.
# ---------------------------------------------------------------------------


@pytest.fixture
def jwks_server(rsa_key):
    """Serve the rsa_key fixture's public key as a JWKS, on localhost."""
    kid = "test-key-1"
    jwk = RSAAlgorithm.to_jwk(rsa_key.public_key(), as_dict=True)
    jwk.update(kid=kid, use="sig", alg="RS256")
    body = json.dumps({"keys": [jwk]}).encode("utf-8")

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self) -> None:  # noqa: N802 - http.server's naming
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *args: object) -> None:  # silence test output
            pass

    server = http.server.HTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}/jwks.json", kid
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def test_jwks_verifier_end_to_end_against_a_local_jwks_server(jwks_server, mint):
    url, kid = jwks_server
    verifier = JwksVerifier(issuer=ISSUER, audience=AUDIENCE, jwks_url=url)
    token = mint(headers={"kid": kid})
    assert verifier.verify(token) == "user_01TEST"


def test_jwks_verifier_raises_auth_unavailable_when_the_endpoint_is_down(mint):
    # This is finding 1's test as well as finding 2's: the *same*
    # unreachable-JWKS condition must come back as the infrastructure
    # exception (503-mapped), never as AuthError (401-mapped) -- an outage
    # must not look like "this token is dead, sign out".
    closed = _closed_port()
    verifier = JwksVerifier(
        issuer=ISSUER, audience=AUDIENCE, jwks_url=f"http://127.0.0.1:{closed}/jwks.json"
    )
    token = mint(headers={"kid": "whatever"})
    with pytest.raises(AuthUnavailable):
        verifier.verify(token)


def test_discover_jwks_url_raises_auth_unavailable_when_the_issuer_is_down():
    closed = _closed_port()
    with pytest.raises(AuthUnavailable):
        discover_jwks_url(f"http://127.0.0.1:{closed}")


# ---------------------------------------------------------------------------
# Finding 2: an unknown kid must not force a fresh JWKS fetch every time.
# ---------------------------------------------------------------------------


@pytest.fixture
def counting_jwks_server(rsa_key):
    """Like jwks_server, but records how many GET requests it received.

    The JWKS it serves does *not* include a matching key for the "unknown"
    kid the tests below use, so every fetch that reaches this server is a
    real, failed lookup -- exactly the case finding 2 describes.
    """
    known_kid = "known-key"
    jwk = RSAAlgorithm.to_jwk(rsa_key.public_key(), as_dict=True)
    jwk.update(kid=known_kid, use="sig", alg="RS256")
    body = json.dumps({"keys": [jwk]}).encode("utf-8")
    hits: list[int] = []

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self) -> None:  # noqa: N802
            hits.append(1)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *args: object) -> None:
            pass

    server = http.server.HTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}/jwks.json", hits
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def test_unknown_kid_negative_cache_skips_repeat_fetches(counting_jwks_server, mint):
    url, hits = counting_jwks_server
    verifier = JwksVerifier(issuer=ISSUER, audience=AUDIENCE, jwks_url=url)
    token = mint(headers={"kid": "totally-unrecognized-kid"})

    with pytest.raises(auth_module.AuthError):
        verifier.verify(token)
    hits_after_first_call = len(hits)
    assert hits_after_first_call >= 1

    # Same kid, well within the 60s negative-cache TTL: PyJWKClient's own
    # cache_keys=True cannot help here (lru_cache never caches exceptions),
    # so without JwksVerifier's own negative cache this would perform
    # another real fetch -- exactly the DoS finding 2 describes.
    with pytest.raises(auth_module.AuthError):
        verifier.verify(token)
    assert len(hits) == hits_after_first_call

    # A *different* kid is not covered by that cache entry and must still
    # be looked up for real.
    other_token = mint(headers={"kid": "a-different-unrecognized-kid"})
    with pytest.raises(auth_module.AuthError):
        verifier.verify(other_token)
    assert len(hits) > hits_after_first_call


def test_jwks_client_uses_a_short_timeout_not_pyjwts_30s_default(jwks_server, mint):
    # PyJWKClient's default timeout is 30s; a route running this
    # synchronously ties up one of AnyIO's 40 threadpool slots for the
    # whole wait, so a handful of slow/hanging fetches can exhaust it.
    url, kid = jwks_server
    verifier = JwksVerifier(issuer=ISSUER, audience=AUDIENCE, jwks_url=url)
    verifier.verify(mint(headers={"kid": kid}))  # builds the PyJWKClient
    assert verifier._jwks.timeout == auth_module.JWKS_HTTP_TIMEOUT
    assert verifier._jwks.timeout < 30


def test_failed_discovery_is_cached_and_not_retried_immediately(monkeypatch):
    # _client() holding its lock across discover_jwks_url (which tries two
    # well-known paths at 10s each) used to serialize every request behind
    # up to 20s while the issuer was down. This proves the replacement:
    # a failed discovery is remembered, not retried on the very next call.
    calls: list[str] = []

    def fake_discover(issuer: str) -> str:
        calls.append(issuer)
        raise AuthUnavailable("issuer metadata unreachable")

    monkeypatch.setattr(auth_module, "discover_jwks_url", fake_discover)
    verifier = JwksVerifier(issuer=ISSUER, audience=AUDIENCE)  # no jwks_url -> discovery

    with pytest.raises(AuthUnavailable):
        verifier._client()
    assert len(calls) == 1

    with pytest.raises(AuthUnavailable):
        verifier._client()
    # Still inside the backoff window: no second discovery attempt.
    assert len(calls) == 1
