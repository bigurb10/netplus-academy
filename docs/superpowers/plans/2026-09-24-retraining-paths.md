# Retraining Paths and Strength Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** After every non-starter test, offer each missed topic three retraining depths (drill, lesson, extended lesson), suggest one from the last two tests plus recent checkpoints, let the learner override per topic or wholesale, keep the next test one click away, and show a ranked strongest-to-weakest chart on the results page and the account page.

**Architecture:** The retraining plan (`S.plan`, source `test`) keeps one entry per missed topic and gains a `mode` per entry plus the stored score and its breakdown. A new pure module `engine/strength.js` computes the recency-weighted picture (domains ranked, five weakest topics) for both the engine and the account page. `app.js` gets the path picker on the results page, mode-aware opening and completion, and a plan-flagged drill session. `summary.js` mirrors the completion rule; `merge.js` carries the two new checkpoint fields.

**Tech Stack:** Plain browser JavaScript (no bundler), jsdom tests run with `node tests/<name>.js`, Python `build.py`. No API changes.

Spec: `docs/superpowers/specs/2026-09-24-retraining-paths-and-strength-chart-design.md`.

## Global Constraints

- Scoring weights 1.0 (this test), 0.5 (previous non-starter test), 0.5 (each wrong answer on the topic's most recent checkpoint since the previous test). Bands: `<= 1` drill, `< 2.5` lesson, `>= 2.5` deep.
- The starter test never counts as this test, the previous test, or a source of misses.
- An entry is done when its checkpoint passed after `plan.createdAt` OR `topics[id].drilledAt >= plan.createdAt`, whatever its mode. `summary.js` must agree.
- Entries without `mode` (saved before this change) read as `lesson`.
- The next-test button stays at the top and bottom of every non-starter results page.
- Adding `engine/strength.js` touches SEVEN loaders (build.py, tests/lib.js, five `<id>/index.html` shells) plus `account/index.html` and `build_account()`.
- User-facing words: "Drill", "Lesson", "Extended lesson". Never "rebuild".
- `npm test` stays green; new suites go into the `test` script in `package.json`.
- Commit after each task on branch `retrain-paths`. Do not push.

---

### Task 1: `engine/strength.js` and its loaders

**Files:**
- Create: `engine/strength.js`
- Create: `tests/strength.js`
- Modify: `build.py` (bundle list in `build()`, and `build_account()` inline), `tests/lib.js`, `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`, `account/index.html`, `tests/loaders.js` (`BEFORE_APP`), `package.json`

**Interfaces:**
- Produces: `FRAStrength.compute(state, meta, examIdx?) -> { hasData, latestIdx, previousIdx, domains, weakest }` as in the spec, section 4. `FRAStrength.VERSION === 1`. Also `FRAStrength.windowOf(exams, examIdx?) -> { latestIdx, previousIdx }` (exported for the engine's plan scoring so both use one definition of "previous test").

- [ ] **Step 1: Write the failing test** `tests/strength.js`

```js
// engine/strength.js: the recency-weighted strongest/weakest picture. Run: node tests/strength.js
'use strict';
const ST = require('../engine/strength.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const META = {
  checkpointN: 4,
  domains: [{ id: 1, short: 'A', name: 'Alpha', pct: 60 }, { id: 2, short: 'B', name: 'Beta', pct: 40 }],
  lessons: [{ id: 'a1', title: 'A one', domain: 1 }, { id: 'a2', title: 'A two', domain: 1 }, { id: 'b1', title: 'B one', domain: 2 }]
};
// review items name the lesson through a fat question object {t}; the engine stores ids for bank
// questions, so meta.questions maps id -> lesson when given.
const rv = (t, correct) => ({ q: { t }, correct });
const exam = (kind, date, review, byDomain) => ({ id: kind + date, kind, date, pct: 50, review, byDomain: byDomain || null });

check('module loads and reports its version', ST.VERSION === 1);
check('empty state has no data and never throws', (() => { const r = ST.compute({}, META); return r.hasData === false && r.domains.length === 2 && r.weakest.length === 0; })());
check('the starter test alone contributes nothing', ST.compute({ exams: [exam('starter', 1, [rv('a1', false)])] }, META).hasData === false);
{
  const r = ST.compute({ exams: [exam('starter', 1, [rv('a1', false)]), exam('full', 2, [rv('a1', true), rv('a2', false), rv('b1', true)])] }, META);
  check('latest test alone: A 50%, B 100%, ranked B first', r.domains[0].id === 2 && r.domains[0].acc === 100 && r.domains[1].acc === 50, JSON.stringify(r.domains.map(d => [d.id, d.acc])));
  check('weakest lists the missed topic with score 1', r.weakest.length === 1 && r.weakest[0].id === 'a2' && r.weakest[0].score === 1 && r.weakest[0].here === 1);
}
{
  const s = { exams: [exam('practice', 1, [rv('a1', false), rv('b1', true)]), exam('practice', 2, [rv('a1', false), rv('b1', false)])] };
  const r = ST.compute(s, META);
  check('previous test weighs half: A = (0 + 0.5*0)/(1 + 0.5) = 0%, B = (0 + 0.5*1)/(1.5) = 33%', r.domains.find(d => d.id === 1).acc === 0 && r.domains.find(d => d.id === 2).acc === 33, JSON.stringify(r.domains.map(d => [d.id, d.acc])));
  check('a topic missed on both tests scores 1.5', r.weakest[0].id === 'a1' && r.weakest[0].score === 1.5 && r.weakest[0].before === 1);
}
{
  const s = { exams: [exam('practice', 10, [rv('a1', false)]), exam('practice', 20, [rv('a1', false)])], lessons: { a1: { lastScore: 2, lastAt: 15 }, a2: { lastScore: 4, lastAt: 5 } } };
  const r = ST.compute(s, META);
  check('a checkpoint after the previous test counts, one before it does not', r.weakest[0].cpWrong === 1 && r.weakest[0].score === 2.5 && r.domains.find(d => d.id === 1).wa === 1 + 0.5 + 0.5 * 4);
}
check('custom tests are tests', ST.compute({ exams: [exam('custom', 1, [rv('b1', false)])] }, META).weakest[0].id === 'b1');
{
  const r = ST.compute({ exams: [exam('practice', 1, [rv('a1', true)])] }, META);
  check('a domain with no data sorts last with acc null', r.domains[1].id === 2 && r.domains[1].acc === null);
}
{
  const s = { lessons: { a1: { lastScore: 1, lastAt: 5 } } };
  const r = ST.compute(s, META);
  check('checkpoints alone give data when no test exists', r.hasData && r.domains[0].id === 2 && r.domains[1].acc === 25 && r.weakest[0].cpWrong === 3);
}
{
  const exams = [exam('practice', 1, [rv('a1', false)], { 1: { c: 0, t: 1 }, 2: { c: 0, t: 0 } }), exam('practice', 2, [rv('a1', true)], { 1: { c: 1, t: 1 }, 2: { c: 0, t: 0 } })];
  const r = ST.compute({ exams }, META, 0);
  check('examIdx picks that test as latest with thisTest from byDomain', r.latestIdx === 0 && r.previousIdx === -1 && r.domains.find(d => d.id === 1).thisTest.c === 0);
  check('windowOf finds the previous non-starter test', ST.windowOf([exam('starter', 0, []), exams[0], exams[1]]).previousIdx === 1);
}
{
  const many = ['a1', 'a2', 'b1', 'a1', 'a2', 'b1'].map(t => rv(t, false));
  const s = { exams: [exam('practice', 1, many)], lessons: { x9: { lastScore: 0, lastAt: 2 } } };
  const r = ST.compute(s, META);
  check('weakest is capped at five and ignores unknown lessons', r.weakest.length <= 5 && r.weakest.every(w => META.lessons.some(l => l.id === w.id)));
}
check('a question stored by id resolves through meta.questions', ST.compute({ exams: [exam('practice', 1, [{ q: 'q7', correct: false }])] }, Object.assign({ questions: { q7: 'b1' } }, META)).weakest[0].id === 'b1');

if (fails.length) { console.error(`strength: ${fails.length} failed`); process.exit(1); }
console.log('strength: all OK'); process.exit(0);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node tests/strength.js`
Expected: `Cannot find module '../engine/strength.js'`

- [ ] **Step 3: Write `engine/strength.js`**

```js
'use strict';
// The recency-weighted picture of where a learner stands: exam domains ranked strongest to
// weakest and the five weakest topics. Shared by the course engine (results page) and the
// account page, so it is pure: no window, no storage, never throws on a malformed state.
// Window: the latest non-starter test (weight 1), the one before it (0.5), and each lesson's
// most recent checkpoint when taken after that previous test (0.5 per question). The starter
// test never counts. Loaded as a plain script (window.FRAStrength) and as CommonJS for tests.
(function (root, factory) {
  const api = factory();
  root.FRAStrength = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;
  const obj = v => (v && typeof v === 'object') ? v : null;
  const num = v => (typeof v === 'number' && isFinite(v)) ? v : 0;

  // The two tests that define the window. examIdx pins "latest"; otherwise it is the most recent
  // non-starter test. previousIdx is the most recent non-starter test before latest, or -1.
  function windowOf(exams, examIdx) {
    const ex = Array.isArray(exams) ? exams : [];
    const isTest = e => obj(e) && e.kind !== 'starter';
    let latestIdx = -1;
    if (typeof examIdx === 'number' && isTest(ex[examIdx])) latestIdx = examIdx;
    else for (let i = ex.length - 1; i >= 0; i--) if (isTest(ex[i])) { latestIdx = i; break; }
    let previousIdx = -1;
    for (let i = latestIdx - 1; i >= 0; i--) if (isTest(ex[i])) { previousIdx = i; break; }
    return { latestIdx, previousIdx };
  }

  function compute(state, meta, examIdx) {
    const s = obj(state) || {}; const m = obj(meta) || {};
    const domains = Array.isArray(m.domains) ? m.domains.filter(obj) : [];
    const lessons = Array.isArray(m.lessons) ? m.lessons.filter(obj) : [];
    const qmap = obj(m.questions) || {};
    const N = num(m.checkpointN) || 4;
    const byLesson = {}; lessons.forEach((l, i) => { byLesson[l.id] = { l, i }; });
    const pctOf = {}; domains.forEach(d => { pctOf[String(d.id)] = num(d.pct); });
    const exams = Array.isArray(s.exams) ? s.exams : [];
    const { latestIdx, previousIdx } = windowOf(exams, examIdx);
    const latest = latestIdx >= 0 ? exams[latestIdx] : null, previous = previousIdx >= 0 ? exams[previousIdx] : null;
    const since = previous ? num(previous.date) : 0;
    // Per lesson: weighted correct/attempts and the miss tally by source.
    const T = {}; lessons.forEach(l => { T[l.id] = { wc: 0, wa: 0, here: 0, before: 0, cpWrong: 0 }; });
    const lessonOf = q => { if (!q) return null; if (typeof q === 'string') return qmap[q] || null; const o = obj(q); return o && o.t != null ? o.t : null; };
    const tally = (rec, w, key) => {
      const review = obj(rec) && Array.isArray(rec.review) ? rec.review : [];
      review.forEach(r => { const t = lessonOf(obj(r) && r.q); const x = t != null && T[t]; if (!x) return; x.wa += w; if (r.correct) x.wc += w; else x[key] += 1; });
    };
    if (latest) tally(latest, 1, 'here');
    if (previous) tally(previous, 0.5, 'before');
    const ls = obj(s.lessons) || {};
    lessons.forEach(l => { const st = obj(ls[l.id]); if (!st || !(num(st.lastAt) > since)) return; const score = Math.max(0, Math.min(N, num(st.lastScore))); T[l.id].wa += 0.5 * N; T[l.id].wc += 0.5 * score; T[l.id].cpWrong += N - score; });
    const D = {}; domains.forEach(d => { D[String(d.id)] = { wc: 0, wa: 0 }; });
    lessons.forEach(l => { const d = D[String(l.domain)]; if (!d) return; d.wc += T[l.id].wc; d.wa += T[l.id].wa; });
    const thisBy = latest && typeof examIdx === 'number' && obj(latest.byDomain) ? latest.byDomain : null;
    const out = domains.map(d => { const k = String(d.id); const x = D[k]; const acc = x.wa > 0 ? Math.round(100 * x.wc / x.wa) : null; const tb = thisBy && obj(thisBy[k]);
      return { id: d.id, short: d.short, name: d.name, pct: num(d.pct), acc, wc: x.wc, wa: x.wa, thisTest: tb ? { c: num(tb.c), t: num(tb.t) } : null }; });
    out.sort((a, b) => (b.acc == null) - (a.acc == null) || (b.acc || 0) - (a.acc || 0) || b.pct - a.pct);
    const weakest = lessons.map(l => { const x = T[l.id]; return { id: l.id, title: l.title, domain: l.domain, score: x.here + 0.5 * x.before + 0.5 * x.cpWrong, here: x.here, before: x.before, cpWrong: x.cpWrong }; })
      .filter(w => w.score > 0).sort((a, b) => b.score - a.score || (pctOf[String(b.domain)] || 0) - (pctOf[String(a.domain)] || 0) || byLesson[a.id].i - byLesson[b.id].i).slice(0, 5);
    const hasData = out.some(d => d.wa > 0);
    return { hasData, latestIdx, previousIdx, domains: out, weakest };
  }

  return { VERSION, compute, windowOf };
}));
```

- [ ] **Step 4: Run the test**: `node tests/strength.js` -> `strength: all OK`.

- [ ] **Step 5: Register the loader everywhere.** `build.py build()`: add `+ read(os.path.join(ENGINE, "strength.js")) + "\n"` after `merge.js`. `tests/lib.js`: `w.eval(... 'strength.js' ...)` right after `merge.js`. Five shells: `<script src="../engine/strength.js"></script>` after `merge.js`. `account/index.html`: `<script src="../engine/strength.js"></script>` after `summary.js`; `build_account()`: `html = inline_engine(html, "../engine/strength.js", "strength.js")`. `tests/loaders.js`: `BEFORE_APP = ['merge.js', 'strength.js', 'auth.js', 'sync.js']`. `package.json`: add `node tests/strength.js` after `tests/merge.js`.

- [ ] **Step 6: Run** `node tests/loaders.js && node tests/strength.js && node tests/selftest.js` -> all OK. Commit: `feat(engine): strength.js, the recency-weighted strongest/weakest picture`.

---

### Task 2: `merge.js` carries the checkpoint fields; `summary.js` learns the completion rule

**Files:**
- Modify: `engine/merge.js` (`mergeLesson`), `engine/summary.js` (`planDone`), `tests/merge.js`, `tests/summary.js`

**Interfaces:**
- `mergeLesson(x, y)` returns `{ status, best, attempts, passedAt, lastScore, lastAt }` where the last two come together from the side with the larger `lastAt` (both absent -> omitted).
- `summarize()`'s `planDone(id)`: `(ls.status === 'passed' && ls.passedAt >= plan.createdAt) || (topics[id].drilledAt >= plan.createdAt)`.

- [ ] **Step 1: Failing tests.** `tests/merge.js`, after the existing lesson checks:

```js
m = M.mergeMaps(st({ lessons: { a: { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: 100 } } }),
                st({ lessons: { a: { status: 'read', best: 3, attempts: 2, passedAt: 0, lastScore: 3, lastAt: 200 } } }));
check('lastScore/lastAt come together from the newer checkpoint', m.lessons.a.lastScore === 3 && m.lessons.a.lastAt === 200);
m = M.mergeMaps(st({ lessons: { a: { status: 'read', best: 1, attempts: 1, passedAt: 0, lastScore: 1, lastAt: 300 } } }),
                st({ lessons: { a: { status: 'read', best: 3, attempts: 2, passedAt: 0, lastScore: 3, lastAt: 200 } } }));
check('the newer checkpoint wins even with the lower score', m.lessons.a.lastScore === 1 && m.lessons.a.lastAt === 300);
m = M.mergeMaps(st({ lessons: { a: { status: 'read', best: 1, attempts: 1, passedAt: 0 } } }), st({ lessons: { a: { status: 'read', best: 1, attempts: 1, passedAt: 0, lastScore: 4, lastAt: 9 } } }));
check('a side without checkpoint fields yields to the side with them', m.lessons.a.lastScore === 4 && m.lessons.a.lastAt === 9);
```
`tests/summary.js`:
```js
check('a drilled topic completes its plan entry',
  stageOf({ exams: [exam('starter', 40), exam('full', 60)], plan: { source: 'test', createdAt: 10, lessons: [{ id: 'u1l1', mode: 'drill' }] }, topics: { u1l1: { drilledAt: 11 } } }) === 'practice');
check('a drill before the plan was made does not count',
  stageOf({ exams: [exam('starter', 40), exam('full', 60)], plan: { source: 'test', createdAt: 10, lessons: [{ id: 'u1l1', mode: 'drill' }] }, topics: { u1l1: { drilledAt: 9 } } }) === 'retrain');
check('a drill completes a lesson-mode entry too (the mode only decides what opens)',
  stageOf({ exams: [exam('starter', 40), exam('full', 60)], plan: { source: 'test', createdAt: 10, lessons: [{ id: 'u1l1', mode: 'lesson' }] }, topics: { u1l1: { drilledAt: 12 } } }) === 'practice');
```

- [ ] **Step 2: Run** both suites; the new checks FAIL.

- [ ] **Step 3: Implement.** `merge.js`:
```js
const mergeLesson = (x, y) => {
  const out = { status: ..., best: ..., attempts: ..., passedAt: ... };   // as today
  const cp = (y.lastAt || 0) > (x.lastAt || 0) ? y : (x.lastAt != null ? x : (y.lastAt != null ? y : null));
  if (cp && cp.lastAt != null) { out.lastScore = cp.lastScore; out.lastAt = cp.lastAt; }
  return out;
};
```
`summary.js`: read `const topics = obj(s.topics) || {};` and change `planDone`.

- [ ] **Step 4: Run** `node tests/merge.js && node tests/summary.js` -> all OK. Commit: `feat(merge,summary): checkpoint fields travel together; a drilled topic completes its entry`.

---

### Task 3: Scoring and modes in `app.js`

**Files:**
- Modify: `engine/app.js`: `lstat`/`tstat` defaults, `advance()` checkpoint branch, `advance()` train branch (`drilledAt`), `planFromTest`, `planDone`, `planMinutes`, new helpers.
- Create: `tests/retrain.js` (part 1); add `node tests/retrain.js` to `package.json`.

**Interfaces (produced, used by Tasks 4 and 5):**
- `const MODE_LABEL = { drill: 'Drill', lesson: 'Lesson', deep: 'Extended lesson' };`
- `const modeOf = e => (e && e.mode) || 'lesson';`
- `function retrainWhy(topic, rec, prev) -> { here, before, cpWrong, score }`
- `const suggestMode = score => score <= 1 ? 'drill' : score < 2.5 ? 'lesson' : 'deep';`
- `planFromTest(rec, examIdx)` entries: `{ id, reasons, mode, suggested, score, why }`.
- `function presetOf(plan) -> 'suggested' | 'drill' | 'lesson' | 'deep' | 'custom'`
- `function entryMinutes(e) -> number`; `planMinutes(list)` sums it.
- `planDone(id)` applies the union rule.
- `strengthMeta()` -> the meta object for `FRAStrength.compute` built from `course.domains`, `lessons`, `Q` (question id -> lesson), `CHECKPOINT_N`.

- [ ] **Step 1: Failing test** `tests/retrain.js` part 1 (boot netplus; helpers `seedState`, `finishWith(w, misses)` that starts a practice test through `start-exam` and answers every question right except the ones whose lesson is in `misses`, using `state(w).active.items` and the bank; each check reads `state(w).plan`).

Checks: (a) one miss, no history -> entry `mode === 'drill'`, `score === 1`, `why.here === 1`; (b) with a previous practice test that missed the same topic -> `mode === 'lesson'`, `score === 1.5`; (c) plus a failed checkpoint on that topic (`lessons[t] = { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: <between the two tests> }`) -> `mode === 'deep'`, `score === 2.5`, `why.cpWrong === 2`; (d) the starter's misses never count: a starter that missed topic t followed by a practice test that misses t -> `score === 1`; (e) a checkpoint end writes `lastScore`/`lastAt`; (f) a plan drill entry is done once `topics[t].drilledAt >= plan.createdAt` (set it and read `planRemaining` through the Tutorial page's "to go" count); (g) `planMinutes`: a deep entry estimates more than a lesson entry which estimates more than a drill entry (read from the results heading after preset changes in Task 4, so here only assert the plan carries `score`s ordered descending).

- [ ] **Step 2: Run** `node tests/retrain.js` -> FAILs (no `mode` on entries).

- [ ] **Step 3: Implement** in `app.js`:
  - `lstat` default gains `lastScore: 0, lastAt: 0`; `tstat` default gains `drilledAt: 0`.
  - `advance()` checkpoint branch: at the end of a checkpoint, `ls.lastScore = score; ls.lastAt = Date.now();`.
  - `advance()` train branch: when `sess.streak >= 3`, also `ts.drilledAt = Date.now();`.
  - `retrainWhy`, `suggestMode`, `MODE_LABEL`, `modeOf`, `presetOf`, `entryMinutes`; `planMinutes = list => list.reduce((a, e) => a + entryMinutes(e), 0)`; `entryMinutes`: drill 5, lesson `(L.minutes||6)+3`, deep that plus `Math.ceil(words(FRA.deep[id])/200)`.
  - `planFromTest`: `const prevIdx = FRAStrength.windowOf(S.exams, examIdx).previousIdx; const prev = prevIdx >= 0 ? S.exams[prevIdx] : null;` then for each entry `const why = retrainWhy(e.id, rec, prev); e.score = why.score; e.why = { here, before, cpWrong }; e.suggested = suggestMode(why.score); e.mode = e.suggested;` sort by score desc, domain pct desc, index asc.
  - `planDone = id => { const ls = S.lessons[id]; const t = S.topics[id]; const c = S.plan && S.plan.createdAt; return !!(S.plan && ((ls && ls.status === 'passed' && ls.passedAt >= c) || (t && t.drilledAt >= c))); }`.
  - `strengthMeta()`.

- [ ] **Step 4: Run** `node tests/retrain.js && node tests/selftest.js && node tests/engine.js` -> OK. Commit: `feat(engine): retraining score, suggested mode, and the union completion rule`.

---

### Task 4: The results page: strength card and path picker

**Files:**
- Modify: `engine/app.js` (`viewResults`, new `strengthCard(idx)`, new `retrainCard(idx, e)`, click handler cases `retrain-preset`, `retrain-mode`, `retrain-adopt`), `engine/styles.css` (`.modes`, `.preset-row`, `.retrain-row`, `.tag`), `tests/retrain.js` part 2.

**Interfaces:** actions `retrain-preset` arg in `suggested|drill|lesson|deep`; `retrain-mode` arg `<lessonId>:<mode>`; `retrain-adopt` arg examIdx.

- [ ] **Step 1: Failing tests** (part 2): after a practice test with two misses: the results page has `.strength .bar-row` count equal to the domain count, ranked (first bar's value >= last's), a `.weakest .topic-item` for each missed topic; `.retrain-card` shows one `.retrain-row` per entry with three `.chip.mode` each and the suggested one `aria-pressed="true"`; clicking `retrain-preset` `deep` sets every `state(w).plan.lessons[i].mode === 'deep'` and the Suggested chip is no longer pressed; clicking a single `retrain-mode` `t:drill` then reads the Custom chip pressed; clicking `retrain-preset` `suggested` restores `mode === suggested` for all; the header row and the bottom row both contain `[data-act="start-exam"]`; a custom test taken while the plan has lessons left shows `[data-act="retrain-adopt"]` and clicking it makes `state(w).plan.examIdx` the custom test's index.

- [ ] **Step 2: Run** -> FAIL (no `.retrain-card`).

- [ ] **Step 3: Implement.** `strengthCard(idx)`: `const r = FRAStrength.compute(S, strengthMeta(), idx);` bars via the existing `.bars`/`.bar-row` markup with `<span class="tag muted">this test c/t</span>`; weakest list uses `.topic-list` rows with a why line built by `whyText(w)` (`"missed here"`, `"missed on your last test"`, `"checkpoint k of N"` joined by " · ") and a Lesson button. `retrainCard`: preset chips `data-act="retrain-preset"`, rows with `data-act="retrain-mode" data-arg="${id}:${mode}"` chips, `retrain-start`, and the explainer line. Wire `viewResults` to use both and to render the in-progress card for the custom case. Handlers: `retrain-preset` sets `e.mode = arg === 'suggested' ? e.suggested || 'lesson' : arg` for every entry, `save(); render();`; `retrain-mode` sets one; `retrain-adopt` builds `planFromTest(S.exams[i], i)` and adopts it if it has lessons.

- [ ] **Step 4: Run** `node tests/retrain.js` -> OK. Commit: `feat(results): where-you-stand chart and the retraining path picker`.

---

### Task 5: Running a path

**Files:**
- Modify: `engine/app.js` (`openEntry`, `nextAction`, `viewTutorial`, `viewLesson` head + `deepAuto`, `startTrain(topics, opts)`, `viewTrain` end screen and End session, `abandon-train`, click cases `retrain-open`, `retrain-start`, `retrain-switch`, `lesson` case resetting `deepAuto`), `runSelfTest`, `tests/retrain.js` part 3.

- [ ] **Step 1: Failing tests** (part 3): with a plan whose first entry is `drill`: `retrain-start` lands on the Drills view (`.eyebrow` text "Refresher"), `state(w).active.fromPlan === true`; clicking `train-drills` then answering three correct in a row (select `opt` = correct index, `submit`, `next`) sets `topics[t].drilledAt > 0` and the end screen contains "Topic done" and a `[data-act="retrain-open"]` for the next entry (or a next-test button when none); with a `deep` entry, `retrain-open` renders `#deep` (expanded) and a pill "Extended"; Home with a drill entry first: the next-step label starts with "Drill:"; the Tutorial tab shows a `.pill` reading "Drill" on that row and a `[data-act="go"][data-arg="results:<idx>"]` "Change your path" button; a legacy entry (`delete mode`) opens the lesson without `#deep`; a capped drill (ten answers, none three in a row) shows "Still shaky" with `[data-act="retrain-switch"]`, and clicking it makes the entry's mode `lesson`.

- [ ] **Step 2: Run** -> FAIL.

- [ ] **Step 3: Implement** per spec section 3. `startTrain(topics, opts)`: `S.active.fromPlan = !!(opts && opts.plan)`. In `viewTrain` end screen branch: if `tr.fromPlan`, render the plan variant. `abandon-train`: `go(S.active && S.active.fromPlan ? 'tutorial' : 'train')` (read the flag before clearing). `viewLesson`: `if (entry && modeOf(entry) === 'deep' && !planDone(id) && deepAuto !== id) { deepAuto = id; deepOpen = id; }` and the Extended pill/line in the head. `nextAction` retrain branch: label by mode, `act: 'retrain-open', arg: id`. Self-test: after the full test, `S.plan.lessons[0].mode = 'drill'`, click `retrain-open`, assert `S.active.kind === 'train' && S.active.fromPlan`, then `S.active = null`.

- [ ] **Step 4: Run** `npm test` -> OK. Commit: `feat(engine): open, run, and finish retraining entries by mode`.

---

### Task 6: The account page chart

**Files:**
- Modify: `build.py` (`course_meta`: `domains`, `lessons` as `[{id,title,domain}]`), `account/index.html` (card: chart + weakest links), `catalog.css` (`.sbars`), `tests/account.js`.

- [ ] **Step 1: Failing test** `tests/account.js`: a course row whose state has a practice exam with a miss on `u1l2` and `lessons.u1l2 = { lastScore: 1, lastAt: ... }` renders `.sbars .sbar` rows equal to the course's domain count and a `.weakest a[href="/netplus/#lesson/u1l2"]`; a state with only a starter renders no `.sbars`. `COURSES` fixture rows gain `domains` and `lessons` (three lessons across two domains are enough).

- [ ] **Step 2: Run** -> FAIL.

- [ ] **Step 3: Implement.** `course_meta`: parse domains with `re.findall(r'\{ id: (\d+), name: "([^"]+)", short: "([^"]+)", pct: (\d+)', src)` and lessons with `re.findall(r'id: "(u\d+l\d+)", title: "((?:[^"\\]|\\.)*)", domain: (\d+)', scripts)`; `lessons` count = `len(lessons)`. `account/index.html card()`: `var ST = window.FRAStrength; var r = ST.compute(it.state, { domains: c.domains, lessons: c.lessons, checkpointN: 4 });` and when `r.hasData` append `<div class="sbars">` rows (`<div class="sbar"><span>short</span><i style="width:acc%"></i><b>acc%</b></div>`) and `<p class="weakest muted">Weakest: <a href="/id/#lesson/lid">title</a>, ...</p>` (top three). `catalog.css`: `.sbars { display:grid; gap:4px; margin:4px 0 } .sbar { display:grid; grid-template-columns: 96px 1fr 40px; align-items:center; gap:8px; font-size:.85rem } .sbar i { display:block; height:6px; background:var(--accent); border-radius:999px } .sbar b { text-align:right; font-variant-numeric: tabular-nums }`.

- [ ] **Step 4: Run** `node tests/account.js && python build.py` -> OK; `dist/account.html` contains `FRAStrength` and `"domains":`. Commit: `feat(account): strongest/weakest chart per course`.

---

### Task 7: Build, audit, stage the deploy

- [ ] `npm test` green; `python build.py`; `grep -c 'src="../engine/' dist/*.html` -> 0 for every file; open `dist/netplus.html#selftest` under jsdom via `node tests/selftest.js` (already in npm test).
- [ ] Merge `retrain-paths` into `main` (no push). Stage `dist/index.html`, `catalog.css`, `dist/account.html`, five bundles to `hetzner:/tmp/fra-deploy/` and hand Blake the one copy command.
