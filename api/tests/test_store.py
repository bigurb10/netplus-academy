import time
from datetime import datetime, timedelta, timezone

import pytest

from app import store

STATE = {"v": 3, "course": "netplus", "lessons": {"u1l1": {"status": "done"}}}
EPOCH = datetime(1970, 1, 1, tzinfo=timezone.utc)


def test_get_missing_returns_none(pool):
    assert store.get(pool, "user_a", "netplus") is None


def test_create_then_get_round_trips(pool):
    made = store.create(pool, "user_a", "netplus", STATE)
    assert made.version == 1
    got = store.get(pool, "user_a", "netplus")
    assert got.state == STATE
    assert got.version == 1


def test_create_twice_is_stale(pool):
    store.create(pool, "user_a", "netplus", STATE)
    with pytest.raises(store.Stale):
        store.create(pool, "user_a", "netplus", STATE)


def test_update_increments_version(pool):
    store.create(pool, "user_a", "netplus", STATE)
    newer = dict(STATE, passStreak=2)
    made = store.update(pool, "user_a", "netplus", newer, expected=1)
    assert made.version == 2
    assert store.get(pool, "user_a", "netplus").state["passStreak"] == 2


def test_update_with_wrong_version_is_stale_and_changes_nothing(pool):
    store.create(pool, "user_a", "netplus", STATE)
    with pytest.raises(store.Stale):
        store.update(pool, "user_a", "netplus", {"v": 3, "wiped": True}, expected=99)
    assert store.get(pool, "user_a", "netplus").state == STATE


def test_update_missing_row_is_stale(pool):
    with pytest.raises(store.Stale):
        store.update(pool, "user_a", "netplus", STATE, expected=1)


def test_rows_are_isolated_by_user_and_course(pool):
    store.create(pool, "user_a", "netplus", STATE)
    store.create(pool, "user_b", "netplus", {"v": 3, "who": "b"})
    store.create(pool, "user_a", "cbet", {"v": 3, "who": "a-cbet"})
    assert store.get(pool, "user_a", "netplus").state == STATE
    assert store.get(pool, "user_b", "netplus").state["who"] == "b"
    assert store.get(pool, "user_a", "cbet").state["who"] == "a-cbet"


def test_delete_reports_whether_a_row_went(pool):
    store.create(pool, "user_a", "netplus", STATE)
    assert store.delete(pool, "user_a", "netplus") is True
    assert store.delete(pool, "user_a", "netplus") is False
    assert store.get(pool, "user_a", "netplus") is None


def test_list_for_user_is_sorted_and_scoped(pool):
    store.create(pool, "user_a", "netplus", STATE)
    store.create(pool, "user_a", "cbet", STATE)
    store.create(pool, "user_b", "secplus", STATE)
    got = store.list_for_user(pool, "user_a")
    assert [s.course_id for s in got] == ["cbet", "netplus"]
    assert all(s.version == 1 for s in got)


def test_add_feedback_returns_a_new_id_and_round_trips_through_feedback_since(pool):
    payload = {"course": "netplus", "id": "fb-abc", "kind": "overall", "text": "great course"}
    new_id = store.add_feedback(pool, "netplus", payload)
    assert isinstance(new_id, int)
    rows = store.feedback_since(pool, EPOCH)
    assert len(rows) == 1
    row = rows[0]
    assert row.id == new_id
    assert row.course_id == "netplus"
    assert row.payload == payload


def test_add_feedback_id_is_server_generated_not_the_clients(pool):
    # The client's own "id" field (a browser-minted string) must never be
    # trusted as the primary key -- it travels inside payload only. Two
    # submissions that both claim the same client-side id must still get
    # distinct, server-assigned primary keys and both survive.
    payload = {"course": "netplus", "id": "fb-duplicate-client-id"}
    first_id = store.add_feedback(pool, "netplus", payload)
    second_id = store.add_feedback(pool, "netplus", payload)
    assert first_id != second_id
    rows = store.feedback_since(pool, EPOCH)
    assert {r.id for r in rows} == {first_id, second_id}
    assert len(rows) == 2


def test_feedback_since_respects_the_cutoff_and_orders_newest_first(pool):
    first_id = store.add_feedback(pool, "netplus", {"course": "netplus", "n": 1})
    first_received = store.feedback_since(pool, EPOCH)[0].received_at
    time.sleep(0.05)
    cutoff = first_received + timedelta(milliseconds=1)
    second_id = store.add_feedback(pool, "netplus", {"course": "netplus", "n": 2})
    time.sleep(0.05)
    third_id = store.add_feedback(pool, "netplus", {"course": "netplus", "n": 3})

    rows = store.feedback_since(pool, cutoff)
    assert [r.id for r in rows] == [third_id, second_id]
    assert first_id not in [r.id for r in rows]

    # The cutoff is inclusive (received_at >= since): asking with the exact
    # timestamp of a row must still return that row, not exclude it.
    second_received = next(r.received_at for r in rows if r.id == second_id)
    boundary_rows = store.feedback_since(pool, second_received)
    assert second_id in [r.id for r in boundary_rows]

    all_rows = store.feedback_since(pool, EPOCH)
    assert [r.id for r in all_rows] == [third_id, second_id, first_id]
