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
