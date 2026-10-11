#!/usr/bin/env bash
# Turn on Caddy's access log for fieldreadyacademy.com and install goaccess to read it.
# Server-side traffic that needs no JavaScript and counts ad-blocked visitors too.
#
# Run ON THE SERVER as root:   bash /tmp/fra-caddy-log.sh
# Then view:                   goaccess /var/log/caddy/access.log --log-format=CADDY
#        or an HTML report:    goaccess /var/log/caddy/access.log --log-format=CADDY -o /root/traffic.html
#
# Idempotent: skips the Caddyfile edit when the log block is already there. Backs up the
# Caddyfile, validates the new one, and restores the backup if validation fails.
set -euo pipefail
CF=/etc/caddy/Caddyfile

if grep -q 'output file /var/log/caddy/access.log' "$CF"; then
  echo "access log already configured in $CF"
else
  BAK="$CF.bak-$(date +%Y%m%d-%H%M)"
  cp "$CF" "$BAK"
  echo "backup: $BAK"
  # Insert the log block as the first lines inside the (site) snippet, which both the
  # apex and the bare-IP site import.
  python3 - "$CF" <<'PY'
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
head = "(site) {\n"
assert s.count(head) == 1, "expected exactly one (site) snippet in the Caddyfile"
block = (head
         + "\tlog {\n"
         + "\t\toutput file /var/log/caddy/access.log {\n"
         + "\t\t\troll_size 50mb\n"
         + "\t\t\troll_keep 5\n"
         + "\t\t}\n"
         + "\t\tformat json\n"
         + "\t}\n")
open(p, "w", encoding="utf-8").write(s.replace(head, block, 1))
PY
  if OUT=$(caddy validate --config "$CF" --adapter caddyfile 2>&1); then
    systemctl reload caddy
    echo "access log on: /var/log/caddy/access.log"
  else
    cp "$BAK" "$CF"
    echo "caddy validate FAILED; Caddyfile restored from $BAK" >&2
    echo "$OUT" >&2
    exit 1
  fi
fi

if ! command -v goaccess >/dev/null 2>&1; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq goaccess
fi
echo "goaccess $(goaccess --version 2>/dev/null | head -1)"
echo "view live:  goaccess /var/log/caddy/access.log --log-format=CADDY"
echo "requests so far: $(wc -l < /var/log/caddy/access.log 2>/dev/null || echo 0)"
