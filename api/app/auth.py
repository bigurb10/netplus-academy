"""Bearer-token verification.

This service is an OAuth 2.1 resource server: it validates tokens and never
issues them. The audience check is the load-bearing part -- the MCP connector
and this API share a WorkOS tenant and therefore a signing key, so `aud` is
the only thing that stops a connector token from opening a learner's row.

Mirrors ServiceForge's api/app/auth.py, with the JWKS fetch split away from
the claim check so the claim rules are testable without a network.

Two failure modes are deliberately kept apart. `AuthError` means the token
itself is bad -- forged, expired, wrong audience, malformed header -- and
maps to 401: "this token is dead, sign out". `AuthUnavailable` means *we*
could not reach the issuer or its keys -- WorkOS is down, egress is broken,
the JWKS endpoint timed out -- and maps to 503: "try again shortly". A
correct OAuth client treats 401 as permanent and signs the user out, so an
infrastructure blip must never be reported as 401.
"""

from __future__ import annotations

import threading
import time
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

# PyJWKClient's default is 30s. A route running this synchronously occupies
# one of AnyIO's threadpool slots for the whole wait, so a handful of slow
# or hanging JWKS requests can exhaust the pool. 5s is generous for a JSON
# fetch to a healthy issuer and caps the damage from an unhealthy one.
JWKS_HTTP_TIMEOUT = 5

# How long a `kid` that just failed is skipped rather than re-fetched. This
# is the main defense against an unknown `kid` forcing a real network fetch
# on every request: PyJWKClient's `cache_keys=True` only caches successful
# lookups (`lru_cache` never caches exceptions), so without this, a random
# `kid` bypasses the cache and hits the network every single time.
_NEGATIVE_CACHE_TTL = 60.0
_NEGATIVE_CACHE_MAX = 256

# How long a failed discovery is remembered before being retried. Without
# this, every request during an issuer outage re-runs discovery (two
# well-known paths at 10s each) serialized behind the client's lock.
_DISCOVERY_BACKOFF = 30.0


class AuthError(Exception):
    """The token itself is invalid. Maps to 401."""

    def __init__(self, reason: str) -> None:
        super().__init__(reason)
        self.reason = reason


class AuthUnavailable(Exception):
    """We could not verify -- the issuer or its keys were unreachable.

    Maps to 503, never 401: the caller's token may well be good, we just
    could not check it.
    """

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
    """`jwks_uri` from the issuer's OIDC or OAuth metadata (RFC 8414).

    Every way this can fail -- unreachable host, timeout, a non-JSON
    response, metadata with no `jwks_uri` -- is an infrastructure problem,
    not evidence about any particular token, so it raises AuthUnavailable
    rather than AuthError.
    """
    import urllib.request
    import json

    base = issuer.rstrip("/")
    errors: list[str] = []
    for path in _DISCOVERY_PATHS:
        try:
            with urllib.request.urlopen(base + path, timeout=10) as resp:
                doc = json.load(resp)
        except Exception as exc:  # noqa: BLE001 - try the next well-known path
            errors.append(f"{path}: {exc}")
            continue
        if doc.get("jwks_uri"):
            return str(doc["jwks_uri"])
        errors.append(f"{path}: no jwks_uri in metadata")
    raise AuthUnavailable(
        f"cannot discover jwks_uri for issuer {issuer} ({'; '.join(errors)})"
    )


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

        # Discovery failure backoff. Read/written without a lock: a stale
        # read just costs one extra discovery attempt across threads, never
        # a correctness problem, and a float assignment is atomic under the
        # GIL.
        self._discovery_failed_at: float | None = None

        # Negative cache: kid -> (failure time, was it infra?, message).
        self._kid_failures: dict[str, tuple[float, bool, str]] = {}
        self._kid_failures_lock = threading.Lock()

    def _discover_url(self) -> str:
        """`self._jwks_url`, or a cached/fresh discovery result.

        Deliberately does not run under `self._lock`: two threads racing
        here just perform discovery twice, rather than one thread blocking
        behind the other for up to 20s while the issuer is down.
        """
        if self._jwks_url:
            return self._jwks_url
        now = time.monotonic()
        failed_at = self._discovery_failed_at
        if failed_at is not None and now - failed_at < _DISCOVERY_BACKOFF:
            raise AuthUnavailable(
                f"issuer metadata for {self.issuer} was unreachable "
                f"{now - failed_at:.0f}s ago; not retrying yet"
            )
        try:
            url = discover_jwks_url(self.issuer)
        except AuthUnavailable:
            self._discovery_failed_at = now
            raise
        self._discovery_failed_at = None
        return url

    def _client(self) -> PyJWKClient:
        if self._jwks is not None:
            return self._jwks
        url = self._discover_url()
        with self._lock:
            if self._jwks is None:
                self._jwks = PyJWKClient(
                    url,
                    cache_keys=True,
                    lifespan=3600,
                    timeout=JWKS_HTTP_TIMEOUT,
                )
        return self._jwks

    def _cached_kid_failure(self, kid: str) -> tuple[bool, str] | None:
        with self._kid_failures_lock:
            entry = self._kid_failures.get(kid)
            if entry is None:
                return None
            failed_at, unavailable, message = entry
            if time.monotonic() - failed_at >= _NEGATIVE_CACHE_TTL:
                del self._kid_failures[kid]
                return None
            return unavailable, message

    def _record_kid_failure(self, kid: str, *, unavailable: bool, message: str) -> None:
        with self._kid_failures_lock:
            if kid not in self._kid_failures and len(self._kid_failures) >= _NEGATIVE_CACHE_MAX:
                # Bounded so an attacker sending endless random kids cannot
                # grow this dict without limit. Evict the oldest entry.
                oldest = min(self._kid_failures, key=lambda k: self._kid_failures[k][0])
                del self._kid_failures[oldest]
            self._kid_failures[kid] = (time.monotonic(), unavailable, message)

    def verify(self, token: str) -> str:
        # `kid` comes straight from the token header, which is unverified
        # (unsigned-header) input -- so it is validated for shape before
        # ever being used as a cache key or looked up anywhere.
        try:
            header = jwt.get_unverified_header(token)
        except jwt.PyJWTError as exc:
            raise AuthError(f"malformed token header: {exc}") from exc
        kid = header.get("kid")
        if not isinstance(kid, str) or not kid:
            raise AuthError("token header has no usable kid")

        cached = self._cached_kid_failure(kid)
        if cached is not None:
            unavailable, message = cached
            if unavailable:
                raise AuthUnavailable(message)
            raise AuthError(message)

        try:
            signing_key = self._client().get_signing_key(kid)
        except AuthUnavailable as exc:
            self._record_kid_failure(kid, unavailable=True, message=exc.reason)
            raise
        except jwt.PyJWKClientConnectionError as exc:
            message = f"cannot reach the JWKS endpoint: {exc}"
            self._record_kid_failure(kid, unavailable=True, message=message)
            raise AuthUnavailable(message) from exc
        except (OSError, TimeoutError) as exc:
            # Defense in depth: PyJWKClient wraps the network errors it
            # knows about in PyJWKClientConnectionError, but not every OS
            # or socket failure is guaranteed to come back through that.
            message = f"cannot resolve a signing key: {exc}"
            self._record_kid_failure(kid, unavailable=True, message=message)
            raise AuthUnavailable(message) from exc
        except Exception as exc:  # noqa: BLE001 - kid genuinely not found, bad key data, etc.
            message = f"cannot resolve a signing key: {exc}"
            self._record_kid_failure(kid, unavailable=False, message=message)
            raise AuthError(message) from exc

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


# How long a client should wait before retrying a 503 from this module.
# Matches the discovery backoff: retrying sooner than that would just hit
# the cached-failure path again.
AUTH_RETRY_AFTER_SECONDS = 30


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=401,
        detail=detail,
        headers={"WWW-Authenticate": 'Bearer realm="fieldready-progress"'},
    )


def _unavailable(detail: str) -> HTTPException:
    return HTTPException(
        status_code=503,
        detail=detail,
        headers={"Retry-After": str(AUTH_RETRY_AFTER_SECONDS)},
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
    except AuthUnavailable as exc:
        raise _unavailable(exc.reason) from exc
    except AuthError as exc:
        raise _unauthorized(exc.reason) from exc
