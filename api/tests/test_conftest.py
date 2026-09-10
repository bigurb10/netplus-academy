"""Tests for conftest.py's own fixtures (finding 5).

`PROGRESS_TEST_DB_URL` is advertised (in `pool`'s failure message and in
`.env.example`) as a way to point the suite at a different database than
`api/.env`. That only ever worked for the `pool` fixture. The `client`
fixture used to build its TestClient with `with TestClient(app) as c:`,
which runs FastAPI's real `lifespan` -- and `lifespan` calls
`make_pool(get_settings().db_url)`, reading `.env`'s value directly rather
than whatever `pool` was built from. With only `PROGRESS_TEST_DB_URL` set
(no `.env`), `db_url` is `""`, and `make_pool("")` falls back to libpq
defaults (port 5432, an unrelated service) and blocks for its connect
timeout -- once per route test.

Proven here by patching lifespan's `make_pool` to fail loudly if it is
ever called, then confirming an ordinary request through the
fixture-provided `client` still succeeds -- which is only possible if
`client` never enters the real lifespan.
"""

import pytest


@pytest.fixture
def _fail_if_lifespans_make_pool_runs(monkeypatch):
    """Poison app.main.make_pool so any call to it fails the test loudly.

    Must be requested *before* `client` in a test's parameter list: pytest
    fully sets up same-scope fixtures in that order (recursing into each
    fixture's own dependencies first), so the patch is in place before
    `client`'s own setup -- including any `with TestClient(app) as c:` --
    runs.
    """
    from app import main

    def boom(_db_url):
        raise AssertionError(
            "lifespan's make_pool ran -- the client fixture must build its "
            "own pool rather than trigger the app's real lifespan/db_url"
        )

    monkeypatch.setattr(main, "make_pool", boom)


def test_client_fixture_does_not_run_the_apps_real_lifespan(
    _fail_if_lifespans_make_pool_runs, client
):
    r = client.get("/healthz")
    assert r.status_code == 200


def test_client_as_fixture_does_not_run_the_apps_real_lifespan(
    _fail_if_lifespans_make_pool_runs, client_as
):
    r = client_as("user_a").get("/healthz")
    assert r.status_code == 200


def test_client_anon_fixture_does_not_run_the_apps_real_lifespan(
    _fail_if_lifespans_make_pool_runs, client_anon
):
    # /healthz needs no auth, so client_anon (which overrides get_pool but
    # not current_user) still gets a plain 200 here.
    r = client_anon.get("/healthz")
    assert r.status_code == 200
