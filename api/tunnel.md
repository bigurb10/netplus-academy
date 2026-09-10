# Reaching the test database

Tests run against the real `fra_test` database on the Hetzner box. Postgres there listens
on localhost only and ufw opens nothing but 22, 80 and 443, so the way in is an SSH tunnel.

Open it in a terminal you leave running:

```bash
ssh -N -L 55432:127.0.0.1:5433 hetzner
```

`5433` is the system Postgres cluster. **Not 5432** -- that is ServiceForge's
`pgvector/pgvector:pg16` Docker container, which has no `fra` role and answers a wrong-port
mistake with `password authentication failed for user "fra"`.

Then, once per machine, put the password into `api/.env`:

```bash
echo "PROGRESS_DB_URL=postgresql://fra:$(ssh hetzner 'cat /root/.fra-db-password')@localhost:55432/fra_test" >> api/.env
```

`api/.env` is gitignored. The password exists in exactly two places: `/root/.fra-db-password`
on the box and your local `.env`.
