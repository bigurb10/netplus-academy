# Analytics, home links, and ServiceForge links: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GA4 on every page from one ID file, the FieldReady logo linking home everywhere, ServiceForge linked from the main page and the course topbar, and a staging script so deploys are one command.

**Architecture:** `analytics.json` is the single source of the Measurement ID; `build.py` and `site/build-site.js` each render Google's standard snippet before `</head>`. The ServiceForge page joins the repo as `serviceforge/index.html` with its own builder. Header links are plain markup changes in the catalog, the ServiceForge page, and the engine's topbar template. `scripts/stage.sh` builds and mirrors the web root to `hetzner:/tmp/fra-deploy/`; nothing touches `/var/www` until Blake runs the printed command.

**Tech Stack:** Python 3 (build.py), Node + jsdom (site generator and tests), bash (staging), Caddy 2.11 on the server.

Spec: `docs/superpowers/specs/2026-10-11-analytics-and-site-links-design.md`.

## Global Constraints

- The Measurement ID must match `^G-[A-Z0-9]{4,}$` or be empty; a malformed ID fails the build.
- The snippet is emitted exactly once per page, immediately before `</head>`, and never when the ID is empty.
- Body-only artifact bundles (`dist/<id>-artifact.html`) carry no snippet.
- The email is never shown in any header (standing rule). No header gains the email.
- `npm test` must stay green; `tests/loaders.js` audits build.py's loader list, which this plan does not change.
- Live files on the server are never written by the agent; staging goes to `/tmp/fra-deploy/`.

---

### Task 1: analytics.json, build.py injection, the ServiceForge page in the repo

**Files:**
- Create: `analytics.json`
- Create: `serviceforge/index.html` (from `scratchpad/serviceforge-live.html`, the byte copy of the live file)
- Modify: `build.py` (imports, new helpers after `inline_engine`, each builder, `__main__`)
- Modify: `package.json` (test chain)
- Test: `tests/analytics.js`

**Interfaces:**
- Produces: `ga_id() -> str`, `ga_snippet(mid=None) -> str`, `with_analytics(html) -> str`, `build_serviceforge()` in build.py; `dist/serviceforge.html`.

- [ ] **Step 1: Write the failing test** `tests/analytics.js`:

```js
// Every built page carries the GA4 snippet exactly once when analytics.json names an ID,
// and none mention Google when it is empty. Guards "changed the ID, forgot to rebuild".
// Run: node tests/analytics.js
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const id = (JSON.parse(fs.readFileSync(path.join(ROOT, 'analytics.json'), 'utf8')).ga4MeasurementId || '').trim();
check('analytics.json: the ID is empty or a GA4 Measurement ID', id === '' || /^G-[A-Z0-9]{4,}$/.test(id), id);
const walk = (dir, out = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; };
const dist = path.join(ROOT, 'dist');
const pages = ['index.html', 'account.html', 'callback.html', 'serviceforge.html', 'netplus.html', 'secplus.html', 'cbet.html', 'aplus1.html', 'aplus2.html'].map(f => path.join(dist, f)).concat(walk(path.join(dist, 'site')));
check('the built pages exist (npm run build, npm run build:site)', pages.every(p => fs.existsSync(p)), pages.filter(p => !fs.existsSync(p)).map(p => path.relative(ROOT, p)).join(','));
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
console.log(fails.length ? `\n${fails.length} FAILED` : '\nall passed');
process.exit(fails.length ? 1 : 0);
```

- [ ] **Step 2: Run it**: `node tests/analytics.js`. Expected: FAIL, `analytics.json` missing (ENOENT).

- [ ] **Step 3: Create `analytics.json`**: `{ "ga4MeasurementId": "" }`. Copy the live page: `cp <scratchpad>/serviceforge-live.html serviceforge/index.html`, then change its brand `<div class="brand">` to `<a class="brand" href="/">` with `</a>`, and add the three favicon `<link>` lines after the viewport meta (same as the catalog).

- [ ] **Step 4: build.py**. Add `json` to the imports and, after `inline_engine`:

```python
ANALYTICS = os.path.join(ROOT, "analytics.json")


def ga_id():
    """The GA4 Measurement ID from analytics.json, or '' for no tracking."""
    with open(ANALYTICS, encoding="utf-8") as f:
        mid = (json.load(f).get("ga4MeasurementId") or "").strip()
    assert mid == "" or re.fullmatch(r"G-[A-Z0-9]{4,}", mid), f"analytics.json: ga4MeasurementId must look like G-XXXXXXXXXX, got {mid!r}"
    return mid


def ga_snippet(mid=None):
    """Google's gtag snippet for the ID, or '' when there is none."""
    mid = ga_id() if mid is None else mid
    if not mid:
        return ""
    return ('<script async src="https://www.googletagmanager.com/gtag/js?id=' + mid + '"></script>\n'
            '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}'
            "gtag('js',new Date());gtag('config','" + mid + "');</script>\n")


def with_analytics(html):
    """Insert the analytics snippet before the page's one </head>."""
    assert html.count("</head>") == 1, "expected exactly one </head>"
    return html.replace("</head>", ga_snippet() + "</head>")


def build_serviceforge():
    """dist/serviceforge.html - the ServiceForge connector page, with analytics."""
    html = with_analytics(read(os.path.join(ROOT, "serviceforge", "index.html")))
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "serviceforge.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print(f"  wrote dist/serviceforge.html {len(html)} bytes")
```

Then: `build_catalog`: `html = with_analytics(inline_engine(...))`. `build_account`: `html = with_analytics(html)` right before the `os.makedirs`. `build`: add `{ga_snippet()}` on its own line before `</head>` in `standalone`. `build_callback`: `html = with_analytics(html)` before `os.makedirs`. `__main__`: call `build_serviceforge()` after `build_callback()`.

- [ ] **Step 5: Build and test**: `python build.py && node tests/analytics.js`. Expected: 3 PASS (ID empty, pages exist except `dist/site` is unchanged, no snippet anywhere). Then set the ID to `G-TEST1234` temporarily, `python build.py`, run again: the site pages fail (not yet injected, Task 2), the nine dist pages pass. Restore `""` and rebuild.

- [ ] **Step 6: package.json**: insert `node tests/analytics.js && ` before `node tests/site.js` in the test script.

- [ ] **Step 7: Commit** `feat(build): GA4 snippet from analytics.json on every built page; ServiceForge page joins the repo`.

---

### Task 2: the static site carries the snippet

**Files:**
- Modify: `site/build-site.js` (constants, `shell()`, `buildCourse`, `buildAll`)
- Test: `tests/site.js` (new section 3)

**Interfaces:**
- Consumes: `analytics.json`.
- Produces: `buildAll({ analytics })` / `buildCourse(FRA, { analytics })` override; `gaSnippet(id)`.

- [ ] **Step 1: Failing test**, appended after section 2 of `tests/site.js` (before the final summary):

```js
// ----- 3. Analytics snippet -----
{
  const build = (analytics) => { const o = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-ga-')); site.buildAll({ courseDirs: [mini], out: o, origin: 'https://example.test/', analytics }); return fs.readFileSync(path.join(o, 'mini', 'lessons', 'index.html'), 'utf8'); };
  const withId = build('G-TEST1234');
  const n = (withId.match(/googletagmanager\.com\/gtag\/js\?id=G-TEST1234/g) || []).length;
  check('with an ID, a static page carries the gtag snippet once, inside <head>', n === 1 && withId.indexOf('gtag/js?id=G-TEST1234') < withId.indexOf('</head>') && withId.includes("gtag('config','G-TEST1234')"), n);
  check('with an empty ID, a static page never mentions googletagmanager', !build('').includes('googletagmanager'));
  let threw = null; try { build('UA-12345-1'); } catch (e) { threw = e.message; }
  check('a malformed ID fails the static build', !!threw && /G-XXXXXXXXXX/.test(threw), threw);
}
```

- [ ] **Step 2: Run**: `node tests/site.js`. Expected: the three new checks FAIL (no snippet, no throw).

- [ ] **Step 3: Implement** in `site/build-site.js`, after `ICONS`:

```js
const ANALYTICS = path.join(ROOT, 'analytics.json');
function gaId() { return (JSON.parse(fs.readFileSync(ANALYTICS, 'utf8')).ga4MeasurementId || '').trim(); }
function gaSnippet(id) {
  if (!id) return '';
  if (!/^G-[A-Z0-9]{4,}$/.test(id)) throw new Error(`analytics.json: ga4MeasurementId must look like G-XXXXXXXXXX, got ${JSON.stringify(id)}`);
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>\n`;
}
let analyticsSnippet = ''; // set by buildCourse for the pages it writes; shell() reads it
```

In `shell()`, add `${analyticsSnippet}` on its own line after the JSON-LD line and before `</head>`. In `buildCourse`, first line: `analyticsSnippet = gaSnippet(opts.analytics !== undefined ? opts.analytics : gaId());`. In `buildAll`, pass `analytics: opts.analytics` into the `buildCourse` opts. Export `gaSnippet`.

- [ ] **Step 4: Run**: `node tests/site.js` all PASS. `npm run build:site && node tests/analytics.js` PASS.

- [ ] **Step 5: Commit** `feat(site): static pages carry the GA4 snippet`.

---

### Task 3: catalog logo link and ServiceForge card; ServiceForge page checks

**Files:**
- Modify: `index.html` (brand, new section)
- Test: `tests/catalog.js`

- [ ] **Step 1: Failing tests**, before the summary lines of `tests/catalog.js`:

```js
// ----- The logo goes home; the main page links to ServiceForge (Blake, 2026-10-11) -----
{
  const w = run(null);
  const brand = w.$('header .brand');
  check('the logo is a link to the main page', !!brand && brand.tagName === 'A' && brand.getAttribute('href') === '/', brand && brand.outerHTML);
  const sf = [...w.document.querySelectorAll('main a')].filter(a => /serviceforge\/$/.test(a.getAttribute('href') || ''));
  check('the main page links to ServiceForge', sf.length >= 1 && sf.some(a => a.textContent.trim() === 'ServiceForge'), sf.length);
}
{
  const sfHtml = fs.readFileSync(path.join(ROOT, 'serviceforge', 'index.html'), 'utf8');
  const d = new JSDOM(sfHtml, { url: 'https://fieldreadyacademy.com/serviceforge/' }).window.document;
  const brand = d.querySelector('header .brand');
  check('the ServiceForge page logo is a link to the main page', !!brand && brand.tagName === 'A' && brand.getAttribute('href') === '/', brand && brand.outerHTML);
  check('the ServiceForge page keeps its All courses link', !!d.querySelector('main a.back[href="../"]'));
}
```

- [ ] **Step 2: Run**: `node tests/catalog.js`. Expected: the first two FAIL (brand is a div; no ServiceForge link); the ServiceForge page checks PASS from Task 1.

- [ ] **Step 3: index.html**. Brand: `<a class="brand" href="/"><span class="mark">FR</span> FieldReady Academy</a>`. After the closing `</div>` of `.cards` and before `<h2>How every course works</h2>`:

```html
    <h2>Tools for technicians</h2>
    <div class="cards">
      <div class="card">
        <div class="pill">Free</div>
        <h3><a href="serviceforge/">ServiceForge</a></h3>
        <p>A troubleshooting knowledge base for biomed and HTM technicians. Connect it to Claude, ChatGPT or Copilot and ask about faults, error codes, part numbers, PM intervals and service access codes in your own words.</p>
        <a class="go" href="serviceforge/">Open ServiceForge</a>
      </div>
    </div>
```

- [ ] **Step 4: Run**: `node tests/catalog.js` all PASS. `python build.py` (the catalog is served from `dist/index.html`).

- [ ] **Step 5: Commit** `feat(catalog): logo links home; ServiceForge card`.

---

### Task 4: course topbar: FR mark home, ServiceForge next to All courses

**Files:**
- Modify: `engine/app.js` (topbar template, ~line 498-503)
- Modify: `engine/styles.css` (after `.brand .mark`)
- Test: `tests/engine.js` (Task 6 section, after block 1)

- [ ] **Step 1: Failing test**, inserted after the "1) Signed out" block in `tests/engine.js`:

```js
  // 1b) The site mark goes home and the nav links to ServiceForge (Blake, 2026-10-11).
  {
    const w = boot({ courseDir: dir }); gotoExempt(w, 'cheatsheet');
    const site = w.$('.topbar a.brand.site');
    check('the topbar has the FieldReady mark linking to the catalog', !!site && site.getAttribute('href') === '../' && site.textContent.trim() === 'FR', site && site.outerHTML);
    const links = [...w.document.querySelectorAll('.topbar .nav a')].map(a => [a.textContent.trim(), a.getAttribute('href')]);
    check('the nav ends with All courses then ServiceForge', JSON.stringify(links.slice(-2)) === JSON.stringify([['All courses', '../'], ['ServiceForge', '../serviceforge/']]), JSON.stringify(links));
    check('the course brand still goes to course Home', !!w.$('.topbar button.brand[data-act="go"][data-arg="home"]'));
    w.close();
  }
```

- [ ] **Step 2: Run**: `node tests/engine.js`. Expected: the first two new checks FAIL.

- [ ] **Step 3: app.js** topbar. Before the course brand button:

```js
          ${course.catalogUrl ? `<a class="brand site" href="${esc(course.catalogUrl)}" title="${esc(course.brand)}: all courses"><span class="mark">FR</span></a>` : ''}
```

Replace the All courses anchor with:

```js
${course.catalogUrl ? `<a href="${esc(course.catalogUrl)}" title="${esc(course.brand)}">All courses</a><a href="${esc(course.catalogUrl)}serviceforge/" title="ServiceForge: the troubleshooting knowledge base for biomed technicians">ServiceForge</a>` : ''}
```

styles.css after `.brand .mark { ... }`:

```css
.brand.site { gap: 0; flex: none; }
.brand.site:hover .mark, .brand.site:focus-visible .mark { background: var(--accent); }
```

- [ ] **Step 4: Run**: `node tests/engine.js` all PASS; `npm test` green. `python build.py`.

- [ ] **Step 5: Screenshots** (headless Chrome, desktop 1280 and the 412-wide iframe trick) of `dist/netplus.html#cheatsheet` and `dist/index.html`: the mark sits left of the course brand, nothing overflows at phone width. Fix spacing if it does.

- [ ] **Step 6: Commit** `feat(engine): FieldReady mark links to the catalog; ServiceForge in the topbar nav`.

---

### Task 5: staging script, Caddy access-log script, README

**Files:**
- Create: `scripts/stage.sh`
- Create: `scripts/caddy-access-log.sh`
- Modify: `README.md` (the deploy bullet), `.gitignore` (`dist/stage/`)

- [ ] **Step 1: `scripts/stage.sh`** (see the spec, section 7). Verify with `bash scripts/stage.sh --local` that `dist/stage/` holds: `index.html`, `catalog.css`, `site.css`, `robots.txt`, `sitemap.xml`, the three favicons, `account/`, `callback/`, `serviceforge/`, and five `<id>/` dirs each with `index.html`, `lessons/`, `cheatsheet/`. Diff `dist/stage/netplus/index.html` against `dist/netplus.html`: identical.

- [ ] **Step 2: `scripts/caddy-access-log.sh`**: backup the Caddyfile, insert a `log { output file /var/log/caddy/access.log { roll_size 50mb roll_keep 5 } format json }` block as the first line inside `(site) {`, `caddy validate`, reload on success, restore on failure, `apt-get install goaccess`. Idempotent (skips when already configured). Written with the Write tool (it has `\t` escapes).

- [ ] **Step 3: README** deploy bullet rewritten for the Hetzner flow: `bash scripts/stage.sh` then the printed command.

- [ ] **Step 4: Run** `bash scripts/stage.sh` for real (uploads to `/tmp/fra-deploy/`), `scp scripts/caddy-access-log.sh hetzner:/tmp/fra-caddy-log.sh`, and `ssh hetzner "find /tmp/fra-deploy -type f | wc -l; grep -c googletagmanager /tmp/fra-deploy/index.html"` to confirm (expect 0 while the ID is empty).

- [ ] **Step 5: Commit** `chore: staging script, Caddy access-log script, README deploy notes`.
