#!/usr/bin/env bash
# Put the files scripts/stage.sh uploaded to hetzner:/tmp/fra-deploy/ live.
# Backs up the whole web root to /root/fra-backup-<stamp>.tgz first.
#
#   bash scripts/go-live.sh
set -euo pipefail

ssh hetzner 'set -e
test -d /tmp/fra-deploy || { echo "nothing staged at /tmp/fra-deploy (run scripts/stage.sh)"; exit 1; }
b=/root/fra-backup-$(date +%Y%m%d-%H%M).tgz
tar czf "$b" -C /var/www fieldready
cp -a /tmp/fra-deploy/. /var/www/fieldready/
chown -R caddy:caddy /var/www/fieldready
echo "deployed (backup $b)"'
