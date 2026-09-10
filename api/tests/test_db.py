def test_schema_creates_progress_table(pool):
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT column_name, data_type FROM information_schema.columns "
            "WHERE table_name = 'progress' ORDER BY column_name"
        ).fetchall()
    assert [r[0] for r in rows] == [
        "course_id",
        "state",
        "updated_at",
        "user_id",
        "version",
    ]
    assert dict(rows)["state"] == "jsonb"


def test_primary_key_is_user_and_course(pool):
    with pool.connection() as conn:
        cols = conn.execute(
            "SELECT a.attname FROM pg_index i "
            "JOIN pg_attribute a ON a.attrelid = i.indrelid "
            "AND a.attnum = ANY(i.indkey) "
            "WHERE i.indrelid = 'progress'::regclass AND i.indisprimary "
            "ORDER BY a.attname"
        ).fetchall()
    assert [c[0] for c in cols] == ["course_id", "user_id"]
