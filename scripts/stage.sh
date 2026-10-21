#!/usr/bin/env bash
# Build everything and stage a mirror of the web root on the server at /tmp/fra-deploy/.
# Nothing under /var/www changes until Blake runs the command this script prints.
#
#   bash scripts/stage.sh            build, assemble dist/stage/, upload to hetzner:/tmp/fra-deploy/
#   bash scripts/stage.sh --local    build and assemble only
#
# Staged: the catalog (dist/index.html), catalog.css, the favicons, account/, callback/,
# serviceforge/, serviceforge/leaderboard/, privacy/, terms/, support/, the eight course bundles as <id>/app/index.html, each course's landing page
# at <id>/index.html from the static site, and the rest of the static site (site.css,
# robots.txt, sitemap.xml, every <id>/lessons/ and <id>/cheatsheet/ page).
# Cheat sheet PDFs are not staged; they change only when a pack's cheat sheet does.
set -euo pipefail
cd "$(dirname "$0")/.."

python build.py
node site/build-site.js

STAGE=dist/stage
rm -rf "$STAGE"
mkdir -p "$STAGE"
cp -a dist/site/. "$STAGE/"
cp dist/index.html "$STAGE/index.html"
cp catalog.css favicon.ico favicon.svg apple-touch-icon.png "$STAGE/"
for p in account callback serviceforge privacy terms support; do
  mkdir -p "$STAGE/$p"
  cp "dist/$p.html" "$STAGE/$p/index.html"
done
mkdir -p "$STAGE/serviceforge/leaderboard"
cp dist/serviceforge-leaderboard.html "$STAGE/serviceforge/leaderboard/index.html"
for id in bmet netplus secplus cbet cres chtm aplus1 aplus2; do
  mkdir -p "$STAGE/$id/app"
  cp "dist/$id.html" "$STAGE/$id/app/index.html"
  test -f "$STAGE/$id/index.html" || { echo "missing landing page for $id (run node site/build-site.js)"; exit 1; }
done
echo "staged $(find "$STAGE" -type f | wc -l | tr -d ' ') files in $STAGE"

if [ "${1:-}" = "--local" ]; then exit 0; fi

ssh hetzner "rm -rf /tmp/fra-deploy && mkdir -p /tmp/fra-deploy"
scp -rq "$STAGE"/* hetzner:/tmp/fra-deploy/
echo "uploaded to hetzner:/tmp/fra-deploy/ ($(ssh hetzner 'find /tmp/fra-deploy -type f | wc -l') files there)"
echo
echo "To go live (backs up the web root first), run:"
echo '! ssh hetzner "tar czf /root/fra-backup-$(date +%Y%m%d-%H%M).tgz -C /var/www fieldready && cp -a /tmp/fra-deploy/. /var/www/fieldready/ && chown -R caddy:caddy /var/www/fieldready && echo deployed"'
