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
# Write the gz, then report (not enforce -- site/build-serviceforge.js is the enforcement point) how
# many exported strings read as a value-shaped credential, with patterns equivalent to the generator's
# CRED list: service/access/unlock/engineer/tech codes and passwords, PINs, usernames, and logins.
python - "$TMP" <<'PYEOF'
import json, sys, gzip, re

CRED = [
    re.compile(r'\b(password|passcode|pass ?code|pass ?word|service code|access code|unlock code|engineer(?:ing)? code|tech(?:nician)? code|service pin|pin|username|user ?name|user id|login)\b[^.;\n]{0,24}?[:=]\s*["\']?[A-Za-z0-9*#_.-]{2,}', re.I),
    re.compile(r'\b(?:service|access|unlock|engineer(?:ing)?|tech(?:nician)?|maintenance|setup|config(?:uration)?|supervisor|biomed|factory|default)\s+(?:code|password|passcode|pin)\b[^0-9\n]{0,16}\d{3,}', re.I),
    re.compile(r'\b(?:code|password|passcode|pin)\s+(?:is|was|=|:)\s*["\']?[A-Za-z0-9*#_.-]{3,}', re.I),
]

def flagged(t):
    return bool(t) and any(p.search(t) for p in CRED)

def scan(d):
    n = 0
    for m in (d.get('models') or []):
        for s in (m.get('symptoms') or []):
            texts = [s.get('title'), s.get('description')]
            for c in (s.get('causes') or []):
                texts.append(c.get('title'))
            fs = s.get('first_step')
            if fs:
                texts += [fs.get('check_text'), fs.get('test_point'), fs.get('expected'), fs.get('tools'), fs.get('tolerance')]
            n += sum(1 for t in texts if flagged(t))
        for e in (m.get('error_codes') or []):
            n += sum(1 for t in [e.get('meaning'), e.get('trigger_condition')] if flagged(t))
    return n

d = json.load(open(sys.argv[1], encoding='utf-8'))
with gzip.open('site/data/serviceforge.json.gz', 'wt', encoding='utf-8') as f:
    f.write(json.dumps(d, ensure_ascii=False))
print('wrote site/data/serviceforge.json.gz:', d['stats'])
print('credential-shaped strings in export:', scan(d))
PYEOF
