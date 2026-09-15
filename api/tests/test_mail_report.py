"""mail_feedback_report.py: composition, the no-feedback rule, and the SMTP handshake.

Pure unit tests. The conftest's autouse `clean` fixture needs the tunnelled test
database; it is overridden below with a no-op because nothing here touches a
database -- the row fetch is injected.
"""

from __future__ import annotations

from datetime import datetime, timezone

import pytest

import mail_feedback_report as mfr
from app.config import Settings
from app.store import FeedbackRow


@pytest.fixture(autouse=True)
def clean():
    yield


def settings(**over) -> Settings:
    base = dict(
        db_url="postgresql://fra:x@localhost:1/fra_test",
        report_to="owner@example.com",
        report_from="owner@example.com",
        smtp_host="smtp.example.com",
        smtp_port=587,
        smtp_user="owner@example.com",
        smtp_password="app-password",
    )
    base.update(over)
    return Settings(_env_file=None, **base)


def row(i: int, course: str = "netplus", text: str = "The port table is wrong") -> FeedbackRow:
    return FeedbackRow(
        id=i,
        course_id=course,
        payload={"kind": "lesson", "text": text, "ref": {"lesson": "u1l1"}},
        received_at=datetime(2026, 9, 14, 12, 0, tzinfo=timezone.utc),
    )


class Recorder:
    def __init__(self):
        self.sent = []

    def __call__(self, msg, settings):
        self.sent.append(msg)


def test_no_feedback_sends_nothing():
    sent = Recorder()
    rc = mfr.run(7, False, settings(), fetch=lambda s, d: [], send_fn=sent)
    assert rc == 0
    assert sent.sent == []


def test_feedback_is_emailed_with_the_report_as_the_body():
    sent = Recorder()
    rc = mfr.run(7, False, settings(), fetch=lambda s, d: [row(1)], send_fn=sent)
    assert rc == 0
    assert len(sent.sent) == 1
    msg = sent.sent[0]
    assert msg["Subject"] == "FieldReady feedback: 1 item in the last 7 days"
    assert msg["To"] == "owner@example.com"
    assert msg["From"] == "owner@example.com"
    body = msg.get_content()
    assert "== netplus (1) ==" in body
    assert "The port table is wrong" in body


def test_subject_pluralises():
    msg = mfr.compose([row(1), row(2, "secplus")], 1, settings())
    assert msg["Subject"] == "FieldReady feedback: 2 items in the last 1 day"


def test_fetch_gets_the_requested_window():
    seen = {}

    def fetch(s, days):
        seen["days"] = days
        return []

    mfr.run(30, False, settings(), fetch=fetch, send_fn=Recorder())
    assert seen["days"] == 30


def test_unconfigured_exits_2_and_sends_nothing(capsys):
    sent = Recorder()
    rc = mfr.run(7, False, settings(smtp_password="", report_to=""), fetch=lambda s, d: [row(1)], send_fn=sent)
    assert rc == 2
    assert sent.sent == []
    err = capsys.readouterr().err
    assert "PROGRESS_SMTP_PASSWORD" in err
    assert "PROGRESS_REPORT_TO" in err


def test_test_flag_sends_even_with_no_feedback():
    sent = Recorder()
    calls = []

    def fetch(s, d):
        calls.append(d)
        return []

    rc = mfr.run(7, True, settings(), fetch=fetch, send_fn=sent)
    assert rc == 0
    assert calls == [], "a delivery test must not need the database"
    assert len(sent.sent) == 1
    assert sent.sent[0]["Subject"] == "FieldReady feedback report: delivery test"


def test_send_does_starttls_then_login_then_send():
    log = []

    class FakeSMTP:
        def __init__(self, host, port, timeout=None):
            log.append(("connect", host, port))

        def __enter__(self):
            return self

        def __exit__(self, *exc):
            log.append(("quit",))
            return False

        def ehlo(self):
            log.append(("ehlo",))

        def starttls(self):
            log.append(("starttls",))

        def login(self, user, password):
            log.append(("login", user, password))

        def send_message(self, msg):
            log.append(("send", msg["Subject"]))

    msg = mfr.compose([row(1)], 7, settings())
    mfr.send(msg, settings(), smtp_factory=FakeSMTP)
    assert log == [
        ("connect", "smtp.example.com", 587),
        ("ehlo",),
        ("starttls",),
        ("ehlo",),
        ("login", "owner@example.com", "app-password"),
        ("send", "FieldReady feedback: 1 item in the last 7 days"),
        ("quit",),
    ]


def test_missing_settings_lists_env_names_in_dotenv_spelling():
    assert mfr.missing_settings(settings(smtp_host="", smtp_user="")) == [
        "PROGRESS_SMTP_HOST",
        "PROGRESS_SMTP_USER",
    ]
    assert mfr.missing_settings(settings()) == []
