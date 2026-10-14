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
# Write the gz.
python - "$TMP" <<'PYEOF'
import json, sys, gzip
d = json.load(open(sys.argv[1], encoding='utf-8'))
with gzip.open('site/data/serviceforge.json.gz', 'wt', encoding='utf-8') as f:
    f.write(json.dumps(d, ensure_ascii=False))
print('wrote site/data/serviceforge.json.gz:', d['stats'])
PYEOF
# Then report (not enforce -- site/build-serviceforge.js is the enforcement point) what the generator's
# credential screen will do with this export: how many first steps it drops whole and how many printed
# strings it redacts a span out of. Run through the generator's own classifier so the count cannot drift
# away from what is published; read the two numbers against the last export before shipping.
node -e 'const fs=require("fs"),zlib=require("zlib");const sf=require("./site/build-serviceforge");const d=JSON.parse(zlib.gunzipSync(fs.readFileSync("site/data/serviceforge.json.gz")).toString("utf8"));const F=["check_text","test_point","expected","tools","tolerance"];const hk=m=>(m.symptoms||[]).filter(s=>(s.causes||[]).length).length>=2;let drop=0,red=0;(d.models||[]).filter(hk).forEach(m=>{const sorted=m.symptoms.slice().sort((a,b)=>(b.cause_count||0)-(a.cause_count||0)||String(a.title).localeCompare(String(b.title)));sorted.slice(0,60).forEach(s=>{if(s.first_step&&F.some(k=>sf.hasCredential(s.first_step[k])))drop++;[s.title,s.description].concat((s.causes||[]).map(c=>c.title)).forEach(t=>{if(sf.hasCredential(t))red++;});});sorted.slice(60).forEach(s=>{if(sf.hasCredential(s.title))red++;});(m.error_codes||[]).forEach(e=>{if(sf.hasCredential(e.meaning))red++;if(sf.hasCredential(e.trigger_condition))red++;});});console.log("credential screen on this export: first steps dropped whole:",drop,"| printed strings with a redacted span:",red);'
