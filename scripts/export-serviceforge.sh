#!/usr/bin/env bash
# Export the ServiceForge knowledge base (public fields only) to site/data/serviceforge.json.gz.
# Runs the SQL inside the database container on the Hetzner box over ssh (alias "hetzner") and
# streams the one-line JSON result to a temp file (never through a shell variable: the document
# is tens of megabytes of UTF-8 and a Windows console codec would corrupt it).
#   bash scripts/export-serviceforge.sh            write site/data/serviceforge.json.gz
#   bash scripts/export-serviceforge.sh --check    print the export date and the stats line only
set -euo pipefail
cd "$(dirname "$0")/.."
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
ssh hetzner "docker exec -i app-db-1 psql -U serviceforge -d serviceforge -At -v ON_ERROR_STOP=1" < scripts/export_serviceforge_kb.sql > "$TMP"
mkdir -p site/data
if [ "${1:-}" = "--check" ]; then
  python -c "import json,sys; d=json.load(open(sys.argv[1],encoding='utf-8')); print(d['exported'], d['stats'])" "$TMP"
  exit 0
fi
python -c "import json,sys,gzip; d=json.load(open(sys.argv[1],encoding='utf-8')); gzip.open('site/data/serviceforge.json.gz','wt',encoding='utf-8').write(json.dumps(d, ensure_ascii=False)); print('wrote site/data/serviceforge.json.gz:', d['stats'])" "$TMP"
