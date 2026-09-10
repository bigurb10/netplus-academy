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


def test_token_with_no_expiry_claim_is_rejected(mint, rsa_key):
    # Mutation testing: dropping "exp" from options={"require": [...]} lets a
    # token with no exp claim through forever, since PyJWT's verify_exp only
    # checks exp when the claim is present. No other test here mints a token
    # that omits exp outright, so this is the only thing that catches that.
    with pytest.raises(AuthError):
        check(mint(exp=None), rsa_key)


def test_token_without_a_subject_is_rejected(mint, rsa_key):
    with pytest.raises(AuthError):
        check(mint(sub=None), rsa_key)


def test_token_with_an_empty_subject_is_rejected(mint, rsa_key):
    # Mutation testing: options={"require": [...]} only checks that "sub" is
    # present, not that it is a usable value. A present-but-empty sub passes
    # the require check and needs the isinstance/truthiness guard in
    # verify_claims to be caught -- this is the only test that exercises it.
    with pytest.raises(AuthError):
        check(mint(sub=""), rsa_key)


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
