"""Email the feedback report for a recent window. Sends nothing when there is none.

Run on the box (weekly, by fieldready-feedback-report.timer):

    /opt/fieldready-api/.venv/bin/python mail_feedback_report.py [--days N] [--test]

Same hard rule as report_feedback.py: no feedback in the window means no email at
all, exit 0. Silence means "nothing came in". `--test` ignores that rule and sends
a short message regardless, to prove the SMTP path works once credentials are set.

Delivery goes through an authenticated SMTP relay (STARTTLS on 587). Hetzner blocks
outbound port 25 and Gmail refuses unauthenticated mail from a fresh IP outright,
so there is no direct-delivery option. Settings are PROGRESS_SMTP_* and
PROGRESS_REPORT_* in .env (see app/config.py). Unconfigured means exit 2 and a
one-line reason on stderr, which the systemd journal keeps.
"""

from __future__ import annotations

import argparse
import smtplib
import sys
from collections.abc import Callable
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

from app.config import Settings, get_settings
from app.db import make_pool
from app.store import FeedbackRow, feedback_since
from report_feedback import _redact, build_report

REQUIRED = ("report_to", "report_from", "smtp_host", "smtp_user", "smtp_password")


def missing_settings(settings: Settings) -> list[str]:
    """The env var names still empty, in .env spelling, so the error is actionable."""
    return [f"PROGRESS_{name.upper()}" for name in REQUIRED if not getattr(settings, name)]


def _plural(n: int, word: str) -> str:
    return f"{n} {word}{'' if n == 1 else 's'}"


def compose(rows: list[FeedbackRow], days: int, settings: Settings) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = (
        f"FieldReady feedback: {_plural(len(rows), 'item')} in the last {_plural(days, 'day')}"
    )
    msg["From"] = settings.report_from
    msg["To"] = settings.report_to
    msg.set_content(build_report(rows, days))
    return msg


def compose_test(settings: Settings, now: datetime | None = None) -> EmailMessage:
    now = now or datetime.now(timezone.utc)
    msg = EmailMessage()
    msg["Subject"] = "FieldReady feedback report: delivery test"
    msg["From"] = settings.report_from
    msg["To"] = settings.report_to
    msg.set_content(
        "This is a test of the weekly feedback report pipeline.\n"
        f"Sent {now.strftime('%Y-%m-%d %H:%M UTC')} from the FieldReady box.\n"
        "Real reports arrive only in weeks that had feedback.\n"
    )
    return msg


def send(msg: EmailMessage, settings: Settings, smtp_factory=smtplib.SMTP) -> None:
    with smtp_factory(settings.smtp_host, settings.smtp_port, timeout=30) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(settings.smtp_user, settings.smtp_password)
        smtp.send_message(msg)


def fetch_rows(settings: Settings, days: int) -> list[FeedbackRow]:
    pool = make_pool(settings.db_url)
    try:
        return feedback_since(pool, datetime.now(timezone.utc) - timedelta(days=days))
    finally:
        pool.close()


def run(
    days: int,
    test: bool,
    settings: Settings,
    fetch: Callable[[Settings, int], list[FeedbackRow]] = fetch_rows,
    send_fn: Callable[[EmailMessage, Settings], None] = send,
) -> int:
    missing = missing_settings(settings)
    if missing:
        sys.stderr.write(
            "mail_feedback_report.py: not configured; set "
            + ", ".join(missing)
            + " in /opt/fieldready-api/.env\n"
        )
        return 2
    if test:
        send_fn(compose_test(settings), settings)
        return 0
    rows = fetch(settings, days)
    if not rows:
        return 0
    send_fn(compose(rows, days, settings), settings)
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Email the feedback received in the last N days; sends nothing if there is none."
    )
    parser.add_argument("--days", type=int, default=7, help="how many days back to look (default 7)")
    parser.add_argument(
        "--test",
        action="store_true",
        help="send a short test message even when there is no feedback, to prove delivery works",
    )
    args = parser.parse_args(argv)
    return run(args.days, args.test, get_settings())


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001 - keep a raw traceback (and any
        # connection string or SMTP credential in it) off stderr.
        sys.stderr.write(_redact(f"mail_feedback_report.py failed: {type(exc).__name__}: {exc}\n"))
        sys.exit(1)
