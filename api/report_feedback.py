"""Print feedback received in a recent window, grouped by course then by kind.

Run on the box:

    /opt/fieldready-api/.venv/bin/python report_feedback.py [--days N]

`--days` defaults to 7. This is meant to become a weekly cron job, so the one
hard rule is: when there is no feedback in the window, it prints nothing at
all and exits 0. Silence means "no feedback" -- it must never print an empty
header or a "0 items" line.

Reuses get_settings() and make_pool() rather than opening its own connection,
so it always points at the same database the service itself uses.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from app.config import get_settings
from app.db import make_pool
from app.store import FeedbackRow, feedback_since

# Mirrors engine/app.js's FB_KIND map so a report reads the same language a
# learner saw in the feedback form. Falls back to a title-cased raw kind (or
# "Unlabeled") for anything that map doesn't cover.
KIND_LABELS = {
    "question": "Question",
    "lesson": "Lesson",
    "unit": "Unit",
    "site": "Website",
    "page": "Page",
    "overall": "Overall",
}


def _redact(text: str) -> str:
    """Strip anything shaped like a Postgres connection string's password.

    Defense in depth: nothing here should ever put PROGRESS_DB_URL into an
    exception message, but if some future change makes psycopg do that, this
    keeps the password out of the printed traceback.
    """
    return re.sub(r"//([^:/\s]+):[^@\s]*@", r"//\1:***@", text)


def _kind_label(kind: object) -> str:
    if not isinstance(kind, str) or not kind:
        return "Unlabeled"
    return KIND_LABELS.get(kind, kind.replace("-", " ").title())


def _format_item(row: FeedbackRow) -> list[str]:
    payload = row.payload if isinstance(row.payload, dict) else {}
    ref = payload.get("ref") if isinstance(payload.get("ref"), dict) else {}

    where = []
    if ref.get("lesson"):
        where.append(f"lesson {ref['lesson']}")
    if ref.get("unit"):
        where.append(f"unit {ref['unit']}")
    if not where and ref.get("view"):
        where.append(f"view {ref['view']}")

    header = f"  [{row.id}] {row.received_at.strftime('%Y-%m-%d %H:%M UTC')}"
    if where:
        header += " - " + ", ".join(where)
    if payload.get("cat"):
        header += f" - {payload['cat']}"
    if payload.get("rating") is not None:
        header += f" - rating {payload['rating']}/10"

    lines = [header]
    text = payload.get("text")
    if text:
        for line in str(text).splitlines() or [""]:
            lines.append(f"      {line}")
    return lines


def build_report(rows: list[FeedbackRow], days: int) -> str:
    by_course: dict[str, list[FeedbackRow]] = defaultdict(list)
    for row in rows:
        by_course[row.course_id].append(row)

    now = datetime.now(timezone.utc)
    day_word = "day" if days == 1 else "days"
    out = [
        f"FieldReady Academy feedback report - last {days} {day_word}",
        f"Generated {now.strftime('%Y-%m-%d %H:%M UTC')}. "
        f"{len(rows)} item(s) across {len(by_course)} course(s).",
        "",
    ]
    for course_id in sorted(by_course):
        course_rows = by_course[course_id]
        out.append(f"== {course_id} ({len(course_rows)}) ==")
        by_kind: dict[object, list[FeedbackRow]] = defaultdict(list)
        for row in course_rows:
            payload = row.payload if isinstance(row.payload, dict) else {}
            by_kind[payload.get("kind")].append(row)
        for kind in sorted(by_kind, key=_kind_label):
            kind_rows = by_kind[kind]
            out.append(f"-- {_kind_label(kind)} ({len(kind_rows)}) --")
            for row in kind_rows:
                out.extend(_format_item(row))
        out.append("")
    return "\n".join(out).rstrip("\n") + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Print feedback received in the last N days; prints nothing if there is none."
    )
    parser.add_argument(
        "--days", type=int, default=7, help="how many days back to look (default 7)"
    )
    args = parser.parse_args()

    settings = get_settings()
    pool = make_pool(settings.db_url)
    try:
        since = datetime.now(timezone.utc) - timedelta(days=args.days)
        rows = feedback_since(pool, since)
    finally:
        pool.close()

    if not rows:
        return 0

    sys.stdout.write(build_report(rows, args.days))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001 - keep a raw traceback from ever
        # reaching stderr unredacted; see _redact's docstring.
        sys.stderr.write(_redact(f"report_feedback.py failed: {exc}\n"))
        sys.exit(1)
