def test_schema_creates_progress_table(pool):
    with pool.connection() as conn:
        rows = conn.execute(
            "SELECT column_name, data_type, is_nullable FROM information_schema.columns "
            "WHERE table_name = 'progress' ORDER BY column_name"
        ).fetchall()
    assert [r[0] for r in rows] == [
        "course_id",
        "state",
        "updated_at",
        "user_id",
        "version",
    ]
    rows_dict = {r[0]: r for r in rows}
    assert rows_dict["state"][1] == "jsonb"
    assert rows_dict["version"][1] == "bigint"
    # user_id, course_id, state, version are NOT NULL
    for col in ["user_id", "course_id", "state", "version"]:
        assert rows_dict[col][2] == "NO", f"{col} should be NOT NULL"


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


def test_pool_checks_connection_health_before_handing_it_out(pool):
    # Without check=, a Postgres restart under a live pool hands out a dead
    # connection and the next request 500s (an unattended-upgrade restart
    # of postgresql@18-main.service does not propagate through the unit's
    # Requires=postgresql.service). With it, that request costs a
    # reconnect instead.
    from psycopg_pool import ConnectionPool

    assert pool._check is ConnectionPool.check_connection
