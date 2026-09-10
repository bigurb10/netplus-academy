import pytest

from app import store

STATE = {"v": 3, "course": "netplus", "lessons": {"u1l1": {"status": "done"}}}


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
