// Every built page carries the GA4 snippet exactly once when analytics.json names an ID,
// and none of them mention Google when it is empty. Guards "changed the ID, forgot to rebuild":
// npm test runs against the tracked dist/ output, so a stale build fails here.
// Run: node tests/analytics.js
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const id = (JSON.parse(fs.readFileSync(path.join(ROOT, 'analytics.json'), 'utf8')).ga4MeasurementId || '').trim();
check('analytics.json: the ID is empty or a GA4 Measurement ID', id === '' || /^G-[A-Z0-9]{4,}$/.test(id), id);

const walk = (dir, out = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; };
const dist = path.join(ROOT, 'dist');
// Every page with a <head>: the catalog, account, callback and ServiceForge pages, the eight
// course bundles, and every static lessons / lesson / cheat-sheet page. The body-only
// -artifact bundles have no head and carry no snippet.
const pages = ['index.html', 'account.html', 'callback.html', 'serviceforge.html', 'serviceforge-leaderboard.html', 'bmet.html', 'netplus.html', 'secplus.html', 'cbet.html', 'cres.html', 'chtm.html', 'aplus1.html', 'aplus2.html']
  .map(f => path.join(dist, f)).concat(fs.existsSync(path.join(dist, 'site')) ? walk(path.join(dist, 'site')) : []);
const missing = pages.filter(p => !fs.existsSync(p)).map(p => path.relative(ROOT, p));
check('the built pages exist (npm run build, npm run build:site)', !missing.length, missing.join(','));

const bad = [];
for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  const hits = (html.match(/googletagmanager\.com\/gtag\/js\?id=/g) || []).length;
  const ok = id
    ? hits === 1 && html.includes(`gtag/js?id=${id}"`) && html.includes(`gtag('config','${id}')`) && html.indexOf('googletagmanager') < html.indexOf('</head>')
    : hits === 0 && !html.includes('googletagmanager');
  if (!ok) bad.push(path.relative(ROOT, p) + ':' + hits);
}
check(id ? `every built page carries the ${id} snippet once, inside <head> (${pages.length} pages)` : `no built page carries a tracking snippet while the ID is empty (${pages.length} pages)`, !bad.length, bad.slice(0, 8).join(' '));

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All analytics tests passed.');
