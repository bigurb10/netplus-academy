# Account Page and Catalog Sign-in Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/account/` page that shows a signed-in learner's progress on every course, a sign-in control on the catalog, and a course topbar whose account label links to that page and never shows the email.

**Architecture:** A pure `engine/summary.js` mirrors the app's stage rules. A hand-written `account/index.html` (like `callback/index.html`) reads the progress API and renders one card per course; `build.py` inlines auth, summary, styles, and a course table into `dist/account.html`. The catalog gets a header control and `build.py` inlines auth into `dist/index.html`.

**Tech Stack:** Plain browser JavaScript (no bundler), jsdom tests run with `node tests/<name>.js`, Python `build.py`, FastAPI progress API at `https://api.fieldreadyacademy.com` (no changes).

Spec: `docs/superpowers/specs/2026-09-23-account-page-and-catalog-sign-in-design.md`.

## Global Constraints

- The email appears in exactly one place: the account page's muted "Signed in as" line. Never in the course topbar, never in the catalog header.
- The account page is read-only over the account's server copy. No writes, no merge, no local progress.
- Every page stays self-contained after `python build.py` (no `<script src>` to `engine/` in `dist/`).
- Loading order: `auth.js` before any page script; `summary.js` before the account script. Course shells are untouched (`tests/loaders.js` must stay green with its current list).
- `npm test` must stay green; new suites are added to the `test` script in `package.json`.
- Catalog order everywhere: `netplus, secplus, cbet, aplus1, aplus2`.
- Deploy targets: `/index.html` (from `dist/index.html`), `/catalog.css`, `/account/index.html` (from `dist/account.html`), `/callback/index.html`, `/<id>/index.html`. Stage under `/tmp/fra-deploy/` on the box for one copy command.

---

### Task 1: `engine/summary.js`

**Files:**
- Create: `engine/summary.js`
- Test: `tests/summary.js`
- Modify: `package.json` (add `node tests/summary.js` to the test script)

**Interfaces:**
- Produces: `FRASummary.summarize(state, meta) -> { started, stage, stageLabel, lessonsPassed, lessonsTotal, bestPct, streak, streakNeeded, official: {date, pct} | null, lastStudied: ms | null }` with `meta = { lessons, passPct, streakNeeded, examQuestions }`; also `FRASummary.stageLabel(stage, meta)`. CommonJS export identical to the window global.

- [ ] **Step 1: Write the failing test** `tests/summary.js`

```js
// engine/summary.js: the account page's read-only view of one course's progress blob.
// It mirrors stage() and planDone() in engine/app.js. Run: node tests/summary.js
'use strict';
const { summarize } = require('../engine/summary.js');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const META = { lessons: 49, passPct: 85, streakNeeded: 3, examQuestions: 50 };
const exam = (kind, pct) => ({ id: 'x' + kind + pct, date: 1000, kind, score: pct, total: 100, pct });
const state = extra => Object.assign({ v: 3, lessons: {}, exams: [], passStreak: 0, official: null, plan: null, touchedAt: 0 }, extra || {});
const stageOf = extra => summarize(state(extra), META).stage;

check('empty state: starter, not started', (() => { const s = summarize(state(), META); return s.stage === 'starter' && s.started === false && s.lessonsPassed === 0 && s.lessonsTotal === 49; })());
check('starter taken, plan from the starter with lessons left: tutorial',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] } }) === 'tutorial');
check('a plan lesson passed AFTER the plan was made counts as done',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] }, lessons: { u1l1: { status: 'passed', passedAt: 11 } } }) === 'fulltest');
check('a plan lesson passed BEFORE the plan was made does not count',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] }, lessons: { u1l1: { status: 'passed', passedAt: 9 } } }) === 'tutorial');
check('a plan from a test: retrain',
  stageOf({ exams: [exam('starter', 40), exam('full', 60)], plan: { source: 'test', createdAt: 10, lessons: [{ id: 'u1l1' }] } }) === 'retrain');
check('starter done, no plan, no full test yet: fulltest', stageOf({ exams: [exam('starter', 90)] }) === 'fulltest');
check('a practice test taken, streak short: practice', stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passStreak: 1 }) === 'practice');
check('streak reached, no official pass: official', stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passStreak: 3 }) === 'official');
check('streak reached and official passed: ready',
  stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passStreak: 3, official: { examIdx: 1, date: 5000, pct: 91 } }) === 'ready');
check('the fulltest label carries the course test size', summarize(state({ exams: [exam('starter', 90)] }), META).stageLabel === '50-question test');
check('the ready label', summarize(state({ exams: [exam('starter', 90)], passStreak: 3, official: { date: 1 } }), META).stageLabel === 'Ready');
{
  const s = summarize(state({ lessons: { a: { status: 'passed' }, b: { status: 'read' }, c: { status: 'passed' }, d: { status: 'new' } } }), META);
  check('lessons passed counts only passed', s.lessonsPassed === 2, s.lessonsPassed);
  check('a read lesson means started', s.started === true);
}
check('best score is the max over full and practice only',
  summarize(state({ exams: [exam('starter', 99), exam('full', 70), exam('practice', 84), exam('custom', 100)] }), META).bestPct === 84);
check('no full or practice test: best score is null', summarize(state({ exams: [exam('starter', 99), exam('custom', 100)] }), META).bestPct === null);
check('streak and streakNeeded come through', (() => { const s = summarize(state({ passStreak: 2 }), META); return s.streak === 2 && s.streakNeeded === 3; })());
check('official carries date and pct', (() => { const s = summarize(state({ official: { examIdx: 3, date: 777, pct: 92 } }), META); return !!s.official && s.official.date === 777 && s.official.pct === 92; })());
check('lastStudied is touchedAt, null when unset', summarize(state({ touchedAt: 123 }), META).lastStudied === 123 && summarize(state(), META).lastStudied === null);
check('a null state does not throw', (() => { try { const s = summarize(null, META); return s.stage === 'starter' && s.lessonsPassed === 0; } catch (e) { return false; } })());
check('garbage fields do not throw', (() => { try { const s = summarize({ lessons: 'x', exams: 'y', plan: 5, passStreak: 'z', official: 'w' }, {}); return s.stage === 'starter' && s.streakNeeded === 3 && s.lessonsTotal === 0; } catch (e) { return false; } })());
check('a null entry in exams or plan.lessons is skipped', (() => { try { return stageOf({ exams: [null, exam('starter', 1)], plan: { source: 'starter', createdAt: 1, lessons: [null, { id: 'q' }] } }) === 'tutorial'; } catch (e) { return false; } })());

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All summary tests passed.');
```

- [ ] **Step 2: Run it** `node tests/summary.js` -> fails with `Cannot find module '../engine/summary.js'`.

- [ ] **Step 3: Write `engine/summary.js`**

```js
'use strict';
// A read-only summary of one course's progress blob, for the account page. Mirrors the
// stage rules in engine/app.js -- stage() and planDone() -- without the app's DOM or its
// course globals, so one page can describe every course on an account. Pure: no window,
// no storage, and it never throws on a malformed state (missing fields read as empty).
// Loaded as a plain script (sets window.FRASummary) and as a CommonJS module for tests,
// the same way engine/merge.js is.
(function (root, factory) {
  const api = factory();
  root.FRASummary = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  // The app's STAGE_LABEL, with the test size filled from meta.examQuestions.
  function stageLabel(stage, meta) {
    const n = Number(meta && meta.examQuestions) || 50;
    return {
      starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: n + '-question test',
      retrain: 'Retraining', practice: 'Practice tests', official: 'Official-format test', ready: 'Ready'
    }[stage] || stage;
  }

  const obj = v => (v && typeof v === 'object') ? v : null;

  // meta: { lessons, passPct, streakNeeded, examQuestions } from the course manifest and
  // curriculum (build.py's course table). Returns { started, stage, stageLabel,
  // lessonsPassed, lessonsTotal, bestPct, streak, streakNeeded, official, lastStudied }.
  function summarize(state, meta) {
    const s = obj(state) || {};
    const m = obj(meta) || {};
    const lessons = obj(s.lessons) || {};
    const exams = Array.isArray(s.exams) ? s.exams.filter(obj) : [];
    const plan = obj(s.plan) && Array.isArray(s.plan.lessons) ? s.plan : null;
    const streakNeeded = Number(m.streakNeeded) > 0 ? Number(m.streakNeeded) : 3;
    const streak = Number(s.passStreak) > 0 ? Number(s.passStreak) : 0;
    const official = obj(s.official);
    // Same rule as planDone() in app.js: a plan lesson counts only when it was passed after
    // the plan was made, so an old pass cannot satisfy a new retraining plan.
    const planDone = id => { const ls = obj(lessons[id]); return !!(ls && ls.status === 'passed' && plan && Number(ls.passedAt) >= Number(plan.createdAt)); };
    const planLeft = plan ? plan.lessons.filter(e => obj(e) && !planDone(e.id)).length : 0;
    const has = kind => exams.some(e => e.kind === kind);
    let stage;
    if (!has('starter')) stage = 'starter';
    else if (plan && planLeft) stage = plan.source === 'starter' ? 'tutorial' : 'retrain';
    else if (streak >= streakNeeded) stage = official ? 'ready' : 'official';
    else if (!has('full') && !has('practice')) stage = 'fulltest';
    else stage = 'practice';
    const ids = Object.keys(lessons);
    const lessonsPassed = ids.filter(id => obj(lessons[id]) && lessons[id].status === 'passed').length;
    let bestPct = null;
    exams.forEach(e => {
      if ((e.kind === 'full' || e.kind === 'practice') && typeof e.pct === 'number' && (bestPct === null || e.pct > bestPct)) bestPct = e.pct;
    });
    const started = exams.length > 0 || ids.some(id => obj(lessons[id]) && lessons[id].status && lessons[id].status !== 'new');
    return {
      started, stage, stageLabel: stageLabel(stage, m),
      lessonsPassed, lessonsTotal: Number(m.lessons) > 0 ? Number(m.lessons) : 0,
      bestPct, streak, streakNeeded,
      official: official ? { date: Number(official.date) || null, pct: typeof official.pct === 'number' ? official.pct : null } : null,
      lastStudied: Number(s.touchedAt) > 0 ? Number(s.touchedAt) : null
    };
  }

  return { summarize, stageLabel };
}));
```

- [ ] **Step 4: Run it** `node tests/summary.js` -> `All summary tests passed.`
- [ ] **Step 5: Register** in `package.json`: append ` && node tests/summary.js` to the `test` script. Run `npm test` -> green.
- [ ] **Step 6: Commit** `git add engine/summary.js tests/summary.js package.json && git commit -m "feat(summary): pure per-course progress summary for the account page"`

---

### Task 2: catalog.css additions (shared by Tasks 3 and 4)

**Files:**
- Modify: `catalog.css` (append)

- [ ] **Step 1: Append to `catalog.css`**

```css
/* Account control (catalog header and account page) */
.brand-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
a.brand { color: inherit; text-decoration: none; }
.acct-slot { display: flex; align-items: center; gap: 10px; min-height: 32px; }
.acct-slot .who { font-family: "Archivo", system-ui, sans-serif; font-weight: 600; font-size: 0.9rem; color: var(--ink); text-decoration: none; max-width: 14rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.acct-slot .who:hover { color: var(--accent); }
.btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--accent); background: var(--accent); color: #fff; font-family: "Archivo", system-ui, sans-serif; font-weight: 600; font-size: 0.92rem; line-height: 1.2; text-decoration: none; cursor: pointer; }
.btn:hover { filter: brightness(1.08); }
.btn.ghost { background: transparent; color: var(--ink-2); border-color: var(--line); }
.btn.ghost:hover { color: var(--ink); border-color: var(--ink-2); filter: none; }
.btn.small { padding: 6px 10px; font-size: 0.85rem; }
/* Account page */
.hero.slim { padding: 22px 0 26px; }
.hero.slim h1 { font-size: 1.7rem; margin: 16px 0 6px; }
.card .exam { color: var(--muted); font-size: 0.9rem; margin: 0; flex: 0 0 auto; }
.bar { height: 6px; border-radius: 999px; background: var(--line); overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--good); border-radius: 999px; }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; margin: 4px 0 6px; }
.fact dt { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); }
.fact dd { margin: 0; font-family: "Archivo", system-ui, sans-serif; font-weight: 600; font-size: 0.95rem; }
```

- [ ] **Step 2: Commit** `git add catalog.css && git commit -m "style(catalog): account control, buttons, and progress card rules"`

---

### Task 3: `account/index.html`

**Files:**
- Create: `account/index.html`
- Test: `tests/account.js`
- Modify: `package.json` (add `node tests/account.js`)

**Interfaces:**
- Consumes: `FRAAuth` (`isSignedIn`, `user` -> `{sub,email,name}`, `accessToken` -> Promise<string|null>, `beginSignIn(returnTo)`, `signOut`, `CONFIG.apiBase`), `FRASummary.summarize`, `window.FRA_COURSES` (array of `{id, name, exam, lessons, passPct, streakNeeded, examQuestions}`), API `GET /v1/progress` -> `[{course_id, version, updated_at}]`, `GET /v1/progress/<id>` -> `{state, version}`.
- Produces: `window.FRA_ACCOUNT = { load, ready }` (test hook; `ready` is the initial load's promise).

- [ ] **Step 1: Write the failing test** `tests/account.js`

```js
// The /account/ page: the account's progress on every course, read-only over the server
// copy. Run: node tests/account.js
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const html = fs.readFileSync(path.join(ROOT, 'account', 'index.html'), 'utf8');
const inline = (html.match(/<script>([\s\S]*?)<\/script>/g) || []).map(s => s.replace(/^<script>|<\/script>$/g, '')).find(s => s.indexOf('FRA account page') !== -1);
if (!inline) throw new Error('could not find the account page script in account/index.html');

const COURSES = [
  { id: 'netplus', name: 'NetPlus Academy', exam: 'CompTIA Network+ N10-009', lessons: 49, passPct: 85, streakNeeded: 3, examQuestions: 50 },
  { id: 'secplus', name: 'SecPlus Academy', exam: 'CompTIA Security+ SY0-701', lessons: 54, passPct: 90, streakNeeded: 3, examQuestions: 50 },
  { id: 'cbet', name: 'CBET Academy', exam: 'AAMI CBET', lessons: 60, passPct: 85, streakNeeded: 3, examQuestions: 50 }
];
const res = (status, body) => ({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });
const exam = (kind, pct) => ({ id: 'x' + kind + pct, date: 1000, kind, score: pct, total: 100, pct });
const HOUR = 3600000;

function run(opts) {
  opts = opts || {};
  const vc = new VirtualConsole(); vc.on('jsdomError', e => console.error('JSDOM ERR', e.message));
  const dom = new JSDOM(html, { url: 'https://fieldreadyacademy.com/account/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'summary.js'), 'utf8'));
  w.FRA_COURSES = COURSES;
  if (opts.token !== false) {
    w.localStorage.setItem('fra.auth.v1', JSON.stringify(Object.assign(
      { access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com', name: null }, opts.token || {})));
  }
  const calls = [];
  const script = (opts.fetch || []).slice();   // [[urlSuffix, response], ...] consumed in order per suffix
  w.fetch = (url, o) => {
    calls.push({ url: String(url), headers: (o && o.headers) || {} });
    const i = script.findIndex(x => String(url).endsWith(x[0]));
    if (i < 0) return Promise.reject(new Error('unexpected fetch ' + url));
    return Promise.resolve(script.splice(i, 1)[0][1]);
  };
  w.FRA_NAVIGATE = () => {};   // beginSignIn's navigation seam; the PKCE transient is what we assert on
  w.eval(inline);
  w.$ = s => w.document.querySelector(s); w.$$ = s => [...w.document.querySelectorAll(s)];
  w.text = () => w.document.body.textContent;
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  return { w, calls };
}
const settle = () => new Promise(r => setTimeout(r, 30));

(async () => {
  // 1) Signed out.
  {
    const { w, calls } = run({ token: false });
    await w.FRA_ACCOUNT.ready;
    check('signed out: heading is neutral', w.$('#heading').textContent === 'Your progress', w.$('#heading').textContent);
    check('signed out: a Sign in button, no cards, no fetch', !!w.$('[data-act="sign-in"]') && w.$$('.card').length === 0 && calls.length === 0);
    w.click(w.$('[data-act="sign-in"]'));
    await settle();
    const pkce = JSON.parse(w.sessionStorage.getItem('fra.auth.pkce') || 'null');
    check('Sign in returns the learner to /account/ afterwards', !!pkce && pkce.returnTo === '/account/', pkce && pkce.returnTo);
  }

  // 2) Signed in with a name: two rows, one unreadable, one course not started.
  {
    const netplus = { v: 3, lessons: { a: { status: 'passed' }, b: { status: 'passed' }, c: { status: 'read' }, d: { status: 'passed' }, e: { status: 'passed' }, f: { status: 'passed' } },
      exams: [exam('starter', 40), exam('practice', 80)], passStreak: 2, official: null, plan: null, touchedAt: Date.now() - 3 * HOUR };
    const { w, calls } = run({
      token: { name: 'Pat Learner' },
      fetch: [
        ['/v1/progress', res(200, [{ course_id: 'netplus', version: 4, updated_at: new Date(Date.now() - 2 * HOUR).toISOString() }, { course_id: 'cbet', version: 1, updated_at: new Date().toISOString() }])],
        ['/v1/progress/netplus', res(200, { state: netplus, version: 4 })],
        ['/v1/progress/cbet', res(500, {})]
      ]
    });
    await w.FRA_ACCOUNT.ready;
    check('signed in: heading is the name', w.$('#heading').textContent === 'Pat Learner', w.$('#heading').textContent);
    check('signed in: the email is shown once, as the muted detail line', w.$('#detail').textContent === 'Signed in as pat@example.com' && w.text().split('pat@example.com').length === 2, w.$('#detail').textContent);
    check('signed in: a Sign out button, no Sign in', !!w.$('[data-act="sign-out"]') && !w.$('[data-act="sign-in"]'));
    check('every request carries the bearer token', calls.length === 3 && calls.every(c => c.headers.Authorization === 'Bearer tok'), calls.map(c => c.url).join(' '));
    const cards = w.$$('.card');
    check('one card per course in catalog order', cards.length === 3 && /NetPlus/.test(cards[0].textContent) && /SecPlus/.test(cards[1].textContent) && /CBET/.test(cards[2].textContent), cards.map(c => c.querySelector('h3').textContent).join(','));
    const np = cards[0].textContent;
    check('netplus: stage label', /Practice tests/.test(np), np);
    check('netplus: lessons passed of total', /5 of 49/.test(np));
    check('netplus: best practice score', /80%/.test(np));
    check('netplus: streak of needed', /2 of 3/.test(np));
    check('netplus: official not yet', /Not yet/.test(np));
    check('netplus: last studied is relative', /3 hours ago/.test(np));
    check('netplus: last synced is relative', /2 hours ago/.test(np));
    check('netplus: Continue link', !!cards[0].querySelector('a.go[href="/netplus/"]') && /Continue/.test(cards[0].querySelector('a.go').textContent));
    check('secplus: not started with a Start link', /Not started/.test(cards[1].textContent) && !!cards[1].querySelector('a.go[href="/secplus/"]'));
    check('cbet: an unreadable row does not break the page', /Couldn.t read this course/.test(cards[2].textContent));
    // Sign out from here.
    w.click(w.$('[data-act="sign-out"]'));
    check('sign out drops the token and shows the signed-out view', w.localStorage.getItem('fra.auth.v1') === null && !!w.$('[data-act="sign-in"]') && w.$$('.card').length === 0);
  }

  // 3) A token without a name keeps the neutral heading.
  {
    const { w } = run({ fetch: [['/v1/progress', res(200, [])]] });
    await w.FRA_ACCOUNT.ready;
    check('no name on the token: heading stays "Your progress"', w.$('#heading').textContent === 'Your progress', w.$('#heading').textContent);
    check('no rows: every course is not started', w.$$('.card').length === 3 && w.$$('.card').every(c => /Not started/.test(c.textContent)));
  }

  // 4) 401 on the list ends the session.
  {
    const { w } = run({ fetch: [['/v1/progress', res(401, {})]] });
    await w.FRA_ACCOUNT.ready;
    check('401: token dropped, signed-out view with the session note',
      w.localStorage.getItem('fra.auth.v1') === null && !!w.$('[data-act="sign-in"]') && /session ended/i.test(w.$('#detail').textContent), w.$('#detail').textContent);
  }

  // 5) 500 on the list shows Retry; Retry loads.
  {
    const { w } = run({ fetch: [['/v1/progress', res(500, {})], ['/v1/progress', res(200, [])]] });
    await w.FRA_ACCOUNT.ready;
    check('500: an error card with Retry', /Couldn.t load your progress/.test(w.text()) && !!w.$('[data-act="retry"]'));
    w.click(w.$('[data-act="retry"]'));
    await settle();
    check('Retry reloads and renders the courses', w.$$('.card').length === 3 && !w.$('[data-act="retry"]'));
  }

  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All account tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Run it** `node tests/account.js` -> fails: `ENOENT account/index.html`.

- [ ] **Step 3: Write `account/index.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your progress - FieldReady Academy</title>
<meta name="robots" content="noindex">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="../catalog.css">
</head>
<body>
<header class="hero slim">
  <div class="wrap">
    <div class="brand-row">
      <a class="brand" href="/"><span class="mark">FR</span> FieldReady Academy</a>
      <div class="acct-slot" id="acct"></div>
    </div>
    <h1 id="heading">Your progress</h1>
    <p id="detail" class="muted"></p>
  </div>
</header>
<main class="wrap">
  <div class="cards" id="courses"></div>
</main>
<script src="../engine/auth.js"></script>
<script src="../engine/summary.js"></script>
<script>
(function () {
  // FRA account page: read-only over the account's synced copy. It never writes, never
  // merges, and never reads this device's local progress -- the course pages push within
  // seconds of a change, so a stale number here is a sync problem to fix at the source.
  var A = window.FRAAuth, SUM = window.FRASummary;
  // Injected by build.py (window.FRA_COURSES): id, name, exam, lessons, passPct,
  // streakNeeded, examQuestions, in catalog order.
  var COURSES = Array.isArray(window.FRA_COURSES) ? window.FRA_COURSES : [];
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var api = function (p) { return A.CONFIG.apiBase + p; };
  function dateOf(ms) { try { return new Date(ms).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return ''; } }
  function ago(ms) {
    var d = Date.now() - ms;
    if (!(d >= 0)) return 'just now';
    var m = Math.floor(d / 60000), h = Math.floor(m / 60), days = Math.floor(h / 24);
    if (m < 1) return 'just now';
    if (m < 60) return m + (m === 1 ? ' minute ago' : ' minutes ago');
    if (h < 24) return h + (h === 1 ? ' hour ago' : ' hours ago');
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    return dateOf(ms);
  }
  function Unauthorized() { this.status = 401; }

  function signedOut(note) {
    $('heading').textContent = 'Your progress';
    $('detail').textContent = note || 'Sign in to see your progress on every course.';
    $('acct').innerHTML = '<button class="btn small" data-act="sign-in">Sign in</button>';
    $('courses').innerHTML = '';
  }
  function header(u) {
    $('heading').textContent = u.name || 'Your progress';
    // The one place the email is shown: this page exists to answer "which account is this".
    $('detail').textContent = u.email ? 'Signed in as ' + u.email : '';
    $('acct').innerHTML = '<button class="btn ghost small" data-act="sign-out">Sign out</button>';
  }
  function fact(k, v) { return '<div class="fact"><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>'; }
  function card(it) {
    var c = it.course, href = '/' + encodeURIComponent(c.id) + '/';
    var head = '<h3><a href="' + href + '">' + esc(c.name) + '</a></h3><p class="exam">' + esc(c.exam) + '</p>';
    if (!it.row) return '<div class="card"><div class="pill soon">Not started</div>' + head + '<a class="go" href="' + href + '">Start the course</a></div>';
    if (it.err || !it.state) return '<div class="card"><div class="pill soon">Progress unavailable</div>' + head + '<p class="muted">Couldn\'t read this course\'s progress.</p><a class="go" href="' + href + '">Open the course</a></div>';
    var s = SUM.summarize(it.state, c);
    var pct = s.lessonsTotal ? Math.round(100 * Math.min(s.lessonsPassed, s.lessonsTotal) / s.lessonsTotal) : 0;
    var synced = it.row.updated_at ? Date.parse(it.row.updated_at) : NaN;
    return '<div class="card">'
      + '<div class="pill' + (s.stage === 'ready' ? '' : ' soon') + '">' + esc(s.stageLabel) + '</div>'
      + head
      + '<div class="bar" title="' + pct + '% of lessons passed"><span style="width:' + pct + '%"></span></div>'
      + '<dl class="facts">'
      + fact('Lessons passed', s.lessonsPassed + ' of ' + s.lessonsTotal)
      + fact('Best practice score', s.bestPct == null ? 'No test yet' : s.bestPct + '%')
      + fact('Pass streak', s.streak + ' of ' + s.streakNeeded)
      + fact('Official-format test', s.official && s.official.date ? 'Passed ' + dateOf(s.official.date) : 'Not yet')
      + fact('Last studied', s.lastStudied ? ago(s.lastStudied) : 'Not yet')
      + fact('Last synced', synced === synced ? ago(synced) : 'Unknown')
      + '</dl><a class="go" href="' + href + '">Continue</a></div>';
  }
  function get(tok, p) {
    return fetch(api(p), { headers: { Authorization: 'Bearer ' + tok } }).then(function (r) {
      if (r.status === 401) throw new Unauthorized();
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }
  function load() {
    var u = A.isSignedIn() ? A.user() : null;
    if (!u) { signedOut(); return Promise.resolve(); }
    header(u);
    $('courses').innerHTML = '<p class="muted">Loading your progress...</p>';
    return A.accessToken().then(function (tok) {
      if (!tok) throw new Unauthorized();
      return get(tok, '/v1/progress').then(function (rows) {
        var byId = {};
        (Array.isArray(rows) ? rows : []).forEach(function (r) { if (r && r.course_id) byId[r.course_id] = r; });
        return Promise.all(COURSES.map(function (c) {
          var row = byId[c.id];
          if (!row) return { course: c, row: null };
          return get(tok, '/v1/progress/' + encodeURIComponent(c.id)).then(
            function (b) { return { course: c, row: row, state: b && b.state }; },
            function (e) { if (e instanceof Unauthorized) throw e; return { course: c, row: row, err: true }; });
        }));
      });
    }).then(function (items) {
      $('courses').innerHTML = items.map(card).join('');
    }, function (e) {
      if (e instanceof Unauthorized) { A.signOut(); signedOut('Your session ended. Sign in again to see your progress.'); return; }
      $('courses').innerHTML = '<div class="card"><p>Couldn\'t load your progress.</p><div><button class="btn small" data-act="retry">Retry</button></div></div>';
    });
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest('[data-act]') : null;
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'sign-in') A.beginSignIn('/account/');
    else if (act === 'sign-out') { A.signOut(); signedOut(); }
    else if (act === 'retry') load();
  });
  window.FRA_ACCOUNT = { load: load };
  window.FRA_ACCOUNT.ready = load();
})();
</script>
</body>
</html>
```

- [ ] **Step 4: Run it** `node tests/account.js` -> `All account tests passed.`
- [ ] **Step 5: Register** `node tests/account.js` in `package.json`; `npm test` green.
- [ ] **Step 6: Commit** `git add account/index.html tests/account.js package.json && git commit -m "feat(account): /account/ shows progress on every course"`

---

### Task 4: catalog header control

**Files:**
- Modify: `index.html` (hero brand row; script before `</body>`)
- Test: `tests/catalog.js`
- Modify: `package.json` (add `node tests/catalog.js`)

- [ ] **Step 1: Write the failing test** `tests/catalog.js`

```js
// The catalog's account control: sign in from the front page, and a way to /account/.
// Run: node tests/catalog.js
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const inline = (html.match(/<script>([\s\S]*?)<\/script>/g) || []).map(s => s.replace(/^<script>|<\/script>$/g, '')).find(s => s.indexOf('FRA catalog account control') !== -1);
if (!inline) throw new Error('could not find the catalog account script in index.html');
check('the catalog loads engine/auth.js before its account script', html.indexOf('<script src="engine/auth.js"></script>') !== -1 && html.indexOf('<script src="engine/auth.js"></script>') < html.indexOf('FRA catalog account control'));

function run(token) {
  const vc = new VirtualConsole(); vc.on('jsdomError', e => console.error('JSDOM ERR', e.message));
  const dom = new JSDOM(html, { url: 'https://fieldreadyacademy.com/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  if (token) w.localStorage.setItem('fra.auth.v1', JSON.stringify(Object.assign({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com' }, token)));
  w.fetch = () => Promise.reject(new Error('the catalog control must not touch the network'));
  w.FRA_NAVIGATE = () => {};
  w.eval(inline);
  w.$ = s => w.document.querySelector(s);
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  return w;
}

(async () => {
  {
    const w = run(null);
    const btn = w.$('#acct [data-act="sign-in"]');
    check('signed out: a Sign in button in the header', !!btn && btn.textContent.trim() === 'Sign in', btn && btn.textContent);
    w.click(btn);
    await new Promise(r => setTimeout(r, 30));
    const pkce = JSON.parse(w.sessionStorage.getItem('fra.auth.pkce') || 'null');
    check('Sign in returns the learner to the catalog afterwards', !!pkce && pkce.returnTo === '/', pkce && pkce.returnTo);
  }
  {
    const w = run({ name: 'Pat Learner' });
    const who = w.$('#acct a.who');
    check('signed in: the name links to /account/', !!who && who.textContent === 'Pat Learner' && who.getAttribute('href') === '/account/', who && who.outerHTML);
    check('signed in: the email is nowhere on the page', w.document.body.textContent.indexOf('pat@example.com') === -1);
    check('signed in: a Sign out button, no Sign in', !!w.$('#acct [data-act="sign-out"]') && !w.$('#acct [data-act="sign-in"]'));
    w.click(w.$('#acct [data-act="sign-out"]'));
    check('sign out drops the token and shows Sign in again', w.localStorage.getItem('fra.auth.v1') === null && !!w.$('#acct [data-act="sign-in"]'));
  }
  {
    const w = run({ name: null });
    const who = w.$('#acct a.who');
    check('signed in without a name: "My progress" links to /account/', !!who && who.textContent === 'My progress' && who.getAttribute('href') === '/account/', who && who.outerHTML);
  }
  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All catalog tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Run it** `node tests/catalog.js` -> throws `could not find the catalog account script`.

- [ ] **Step 3: Edit `index.html`.** Replace the brand line in the hero:

```html
      <div class="brand-row">
        <div class="brand"><span class="mark">FR</span> FieldReady Academy</div>
        <div class="acct-slot" id="acct"></div>
      </div>
```

and add before `</body>`:

```html
  <script src="engine/auth.js"></script>
  <script>
  (function () {
    // FRA catalog account control: sign in from the front page, and a way to your progress.
    // The name, never the email, is what identifies the account here.
    var A = window.FRAAuth, slot = document.getElementById('acct');
    if (!A || !slot) return;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
    function paint() {
      var u = A.isSignedIn() ? A.user() : null;
      slot.innerHTML = u
        ? '<a class="who" href="/account/">' + esc(u.name || 'My progress') + '</a><button class="btn ghost small" data-act="sign-out">Sign out</button>'
        : '<button class="btn small" data-act="sign-in">Sign in</button>';
    }
    slot.addEventListener('click', function (ev) {
      var b = ev.target && ev.target.closest ? ev.target.closest('[data-act]') : null;
      if (!b) return;
      if (b.getAttribute('data-act') === 'sign-in') A.beginSignIn('/');
      else if (b.getAttribute('data-act') === 'sign-out') { A.signOut(); paint(); }
    });
    paint();
  })();
  </script>
```

- [ ] **Step 4: Run it** `node tests/catalog.js` -> `All catalog tests passed.`
- [ ] **Step 5: Register** in `package.json`; `npm test` green (`tests/site.js` must still pass: it reads the course packs, not the catalog).
- [ ] **Step 6: Commit** `git add index.html tests/catalog.js package.json && git commit -m "feat(catalog): sign-in control in the header, name links to /account/"`

---

### Task 5: course topbar label links to the account page

**Files:**
- Modify: `engine/app.js` (`acctHtml`, line ~446)
- Modify: `engine/styles.css` (line 71, `.acct .who`)
- Modify: `tests/engine.js` (cases 2 and 2b)

- [ ] **Step 1: Update the tests.** In case 2 assert `who.tagName === 'A' && who.getAttribute('href') === '/account/'` in addition to the text; same in case 2b.
- [ ] **Step 2: Run** `node tests/engine.js` -> the two topbar checks fail (span, no href).
- [ ] **Step 3: Edit `engine/app.js`** `acctHtml`: replace `<span class="who">${esc(u.name || 'Signed in')}</span>` with `<a class="who" href="/account/" title="Your progress on every course">${esc(u.name || 'Signed in')}</a>`.
- [ ] **Step 4: Edit `engine/styles.css`** line 71: `.acct .who { font-size:.85rem; color:var(--ink-2); text-decoration:none; max-width:14rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } .acct .who:hover { color:var(--ink); text-decoration:underline; }`
- [ ] **Step 5: Run** `npm test` -> green.
- [ ] **Step 6: Commit** `git add engine/app.js engine/styles.css tests/engine.js && git commit -m "feat(topbar): the account label links to /account/"`

---

### Task 6: `build.py` builds the catalog and the account page

**Files:**
- Modify: `build.py` (`manifest()`, new `course_meta()`, `build_catalog()`, `build_account()`, `__main__`)

- [ ] **Step 1: Add after `manifest()`**

```python
CATALOG_ORDER = ["netplus", "secplus", "cbet", "aplus1", "aplus2"]


def course_meta(course_id):
    """The account page's row for one course: what summary.js needs, plus display names."""
    course_dir = os.path.join(COURSES, course_id)
    src = read(os.path.join(course_dir, "course.js"))
    m = manifest(course_dir)
    exam = re.search(r'exam:\s*\{[^}]*?title:\s*"([^"]+)"[^}]*?code:\s*"([^"]+)"[^}]*?questions:\s*(\d+)', src)
    test = re.search(r'test:\s*\{[^}]*?questions:\s*(\d+)[^}]*?passPct:\s*(\d+)[^}]*?streakNeeded:\s*(\d+)', src)
    if not exam or not test:
        raise SystemExit(f"{course_id}/course.js: could not read exam/test fields for the account page")
    scripts = "\n".join(read(p) for p in course_files(course_dir))
    lessons = re.findall(r'id: "(u\d+l\d+)", title: "', scripts)
    return {
        "id": m["id"], "name": m["name"],
        "exam": f"{exam.group(1)} {exam.group(2)}",
        "lessons": len(lessons), "examQuestions": int(test.group(1)),
        "passPct": int(test.group(2)), "streakNeeded": int(test.group(3)),
    }


def inline_engine(html, rel_src, engine_file):
    tag = f'<script src="{rel_src}"></script>'
    assert tag in html, f"expected {tag!r} in the page"
    js = read(os.path.join(ENGINE, engine_file)).replace("</script", "<\\/script")
    return html.replace(tag, "<script>\n" + js + "\n</script>")


def build_catalog():
    """dist/index.html - the catalog with engine/auth.js inlined for the header control."""
    html = inline_engine(read(os.path.join(ROOT, "index.html")), "engine/auth.js", "auth.js")
    assert "engine/auth.js" not in html
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "index.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/index.html {len(html)} bytes")


def build_account():
    """dist/account.html - the progress-on-every-course page, fully self-contained."""
    import json
    html = read(os.path.join(ROOT, "account", "index.html"))
    html = html.replace('<link rel="stylesheet" href="../catalog.css">',
                        "<style>\n" + read(os.path.join(ROOT, "catalog.css")) + "\n</style>")
    html = inline_engine(html, "../engine/auth.js", "auth.js")
    ids = [c for c in CATALOG_ORDER if os.path.exists(os.path.join(COURSES, c, "course.js"))]
    table = json.dumps([course_meta(c) for c in ids], ensure_ascii=True).replace("</", "<\\/")
    html = inline_engine(html, "../engine/summary.js", "summary.js").replace(
        "<script>\n(function () {\n  // FRA account page",
        "<script>window.FRA_COURSES = " + table + ";</script>\n<script>\n(function () {\n  // FRA account page")
    assert "window.FRA_COURSES = [" in html and "<style>" in html and "engine/" not in html, \
        "account/index.html no longer matches the strings build_account() inlines"
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "account.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/account.html {len(html)} bytes ({len(ids)} courses)")
```

and in `__main__`, after `build_callback()`: `build_catalog()` and `build_account()`.

- [ ] **Step 2: Run** `python build.py` -> prints the two new lines; `dist/account.html` contains `window.FRA_COURSES = [` with 5 entries and lesson counts 49, 54, 60, 41, 41; neither `dist/index.html` nor `dist/account.html` contains `src="` pointing at `engine/`.
- [ ] **Step 3: Smoke the built account page under jsdom**: eval nothing; just load `dist/account.html` with `runScripts: 'dangerously'`? No: keep to a grep check (the inline scripts are the same text the unit tests ran).
- [ ] **Step 4: Commit** `git add build.py dist/ && git commit -m "build: dist/index.html and dist/account.html, self-contained"`

---

### Task 7: deploy staging and verification

- [ ] **Step 1:** `npm test` green; `python build.py` clean.
- [ ] **Step 2:** scp to `hetzner:/tmp/fra-deploy/`: `dist/index.html` as `catalog.html`, `catalog.css`, `dist/account.html`, `dist/callback.html`, the five bundles.
- [ ] **Step 3:** Blake runs one copy command (see the recap message) that installs each file, creates `/var/www/fieldready/account/`, and chowns to `caddy:caddy`.
- [ ] **Step 4:** Verify live: `curl -s https://fieldreadyacademy.com/account/ | grep -c FRA_COURSES` -> 1; `curl -s https://fieldreadyacademy.com/ | grep -c "FRA catalog account control"` -> 1; the API log shows `PUT ... 200` after both devices reload.
