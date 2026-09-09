# Progress Merge Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and test the pure client-side merge that reconciles two devices' course progress, including the replay that recomputes `passStreak` and `official` rather than merging them.

**Architecture:** A new `engine/merge.js` holds every pure function — no DOM, no network, no `S`. It exports to `window.FRAMerge` in the browser and via `module.exports` under node, so `tests/merge.js` can unit-test it directly without jsdom. `engine/app.js` stops computing the streak inline and calls the shared function instead, so the live path and the replay path cannot drift.

**Tech Stack:** Plain ES5-compatible JavaScript (matching `engine/app.js`), node for tests, no new dependencies.

## Global Constraints

- **No new npm dependencies.** `package.json` currently has only `jsdom` as a devDependency; keep it that way.
- **`engine/merge.js` must contain no DOM access and no reference to `S`.** It is pure functions over plain objects only.
- **Match the existing code style in `engine/app.js`:** 2-space indent, `const`/`let`, arrow functions for one-liners, terse single-line functions where natural. Do not reformat lines you are not otherwise changing.
- **State version stays `v: 3`.** `touchedAt` is additive; a missing value reads as `0`. Do not change the `s.v === 3` check in `load()`.
- **Any new engine file must be registered in two places** or it will not ship and will not be tested: `build.py:43` (bundling) and `tests/lib.js:23` (jsdom boot). Both currently load only `engine/app.js`.
- **`npm test` must pass at the end of every task.**

## Reference: current state shape

```js
{
  v: 3, course: 'netplus',
  view: {name, arg},                                  // device-local, never synced
  lessons: { [id]: {status, best, attempts, passedAt} },
  topics:  { [id]: {hist: [], attempts, correct, streak, last} },
  qstats:  { [id]: {seen, correct, wrong, last} },
  exams:   [ {date, kind, score, total, pct, byDomain, review, seconds, minutes, setup, noConf} ],
  passStreak: 0,
  official: null | {examIdx, date, pct},
  plan: null | {lessons: [], createdAt, source, depth},
  path: null,
  active: null,                                       // device-local, never synced
  settings: {timer: true},
  feedback: [ {id, ts, sent, ...} ],
  ratings: { [lessonId]: {r, ts} },
  seen: {},
  created: 0
}
```

---

### Task 1: Create the merge module and wire it into the build and tests

**Files:**
- Create: `engine/merge.js`
- Create: `tests/merge.js`
- Modify: `build.py:43`
- Modify: `tests/lib.js:23`
- Modify: `package.json:7`

**Interfaces:**
- Consumes: nothing.
- Produces: global `FRAMerge` in the browser; `require('../engine/merge.js')` in node. Every later task adds functions to this same object.

- [ ] **Step 1: Write the failing test**

Create `tests/merge.js`:

```js
// Unit tests for engine/merge.js. Pure functions only - no jsdom, no DOM, no network.
const M = require('../engine/merge.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

check('module loads under node', typeof M === 'object' && M !== null);
check('module reports its version', M.VERSION === 1, M.VERSION);

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('\nAll merge tests passed.');
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node tests/merge.js`
Expected: FAIL — `Cannot find module '../engine/merge.js'`

- [ ] **Step 3: Create the module**

Create `engine/merge.js`:

```js
// Pure merge helpers for cross-device course progress. No DOM, no network, no engine state.
// Loaded as a plain script in the browser (sets window.FRAMerge) and required directly by tests.
(function (root, factory) {
  const api = factory();
  root.FRAMerge = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;

  return { VERSION };
}));
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node tests/merge.js`
Expected: both checks PASS, exit 0.

- [ ] **Step 5: Register the file in the bundler**

In `build.py`, line 43 currently reads:

```python
    scripts = "\n".join(read(p) for p in course_files(course_dir)) + "\n" + read(os.path.join(ENGINE, "app.js"))
```

Replace with:

```python
    scripts = "\n".join(read(p) for p in course_files(course_dir)) + "\n" + read(os.path.join(ENGINE, "merge.js")) + "\n" + read(os.path.join(ENGINE, "app.js"))
```

`merge.js` must come before `app.js`, because `app.js` reads `FRAMerge` at call time.

- [ ] **Step 6: Register the file in the jsdom boot**

In `tests/lib.js`, line 23 currently reads:

```js
  w.eval(fs.readFileSync(path.join(o.engineDir, 'app.js'), 'utf8'));
```

Replace with:

```js
  w.eval(fs.readFileSync(path.join(o.engineDir, 'merge.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(o.engineDir, 'app.js'), 'utf8'));
```

- [ ] **Step 7: Add the test to the suite**

In `package.json`, change the `test` script to append `&& node tests/merge.js`:

```json
    "test": "node tests/selftest.js && node tests/gating.js && node tests/acronyms.js && node tests/engine.js && node tests/merge.js",
```

- [ ] **Step 8: Verify the whole suite and the build still work**

Run: `npm test`
Expected: every existing suite passes, then "All merge tests passed."

Run: `python build.py netplus`
Expected: writes `dist/netplus.html` with no error.

- [ ] **Step 9: Commit**

```bash
git add engine/merge.js tests/merge.js build.py tests/lib.js package.json
git commit -m "Add engine/merge.js module scaffold with build and test wiring"
```

---

### Task 2: recomputeStreak — replay the exam log

**Files:**
- Modify: `engine/merge.js`
- Modify: `tests/merge.js`

**Interfaces:**
- Consumes: `FRAMerge` from Task 1.
- Produces:
  - `isOfficialRecord(rec) -> boolean`
  - `recomputeStreak(exams, opts) -> {passStreak, official}` where `opts` is `{passPct, streakNeeded}` and `official` is `null` or `{examIdx, date, pct}`.

This is the exact fold currently inline at `engine/app.js:727-731`. `starter` and `custom` records are skipped — they never move the streak. `examIdx` is the index into the array **as passed in**, counting skipped records, matching how `finishExam` numbers them.

- [ ] **Step 1: Write the failing tests**

Append to `tests/merge.js`, before the `if (fails.length)` block:

```js
// ---------- recomputeStreak ----------
const std = { mode: 'standard', n: 90, minutes: 90 };
const exam = (o) => Object.assign({ date: 1, kind: 'practice', pct: 80, total: 50, minutes: 0, setup: null }, o);
const OPTS = { passPct: 80, streakNeeded: 3 };

check('empty log gives a zero streak',
  JSON.stringify(M.recomputeStreak([], OPTS)) === JSON.stringify({ passStreak: 0, official: null }));

check('three passes make a streak of three',
  M.recomputeStreak([exam({date:1}), exam({date:2}), exam({date:3})], OPTS).passStreak === 3);

check('a failure resets the streak to zero',
  M.recomputeStreak([exam({date:1}), exam({date:2}), exam({date:3, pct:60})], OPTS).passStreak === 0);

check('starter tests never move the streak',
  M.recomputeStreak([exam({date:1, kind:'starter', pct:30}), exam({date:2})], OPTS).passStreak === 1);

check('custom tests never move the streak',
  M.recomputeStreak([exam({date:1}), exam({date:2, kind:'custom', pct:10}), exam({date:3})], OPTS).passStreak === 2);

const officialLog = [exam({date:1}), exam({date:2}), exam({date:3}), exam({date:4, minutes:90, setup:std, pct:85})];
check('an official pass after a complete streak is recorded',
  M.recomputeStreak(officialLog, OPTS).official !== null);
check('the official record points at the right index',
  M.recomputeStreak(officialLog, OPTS).official.examIdx === 3,
  JSON.stringify(M.recomputeStreak(officialLog, OPTS).official));

check('an official pass before the streak is complete does not count',
  M.recomputeStreak([exam({date:1}), exam({date:2, minutes:90, setup:std, pct:85})], OPTS).official === null);

check('a later failure revokes the official pass',
  M.recomputeStreak(officialLog.concat([exam({date:5, pct:50})]), OPTS).official === null);

check('examIdx counts skipped records',
  M.recomputeStreak([exam({date:1, kind:'starter', pct:20}), exam({date:2}), exam({date:3}), exam({date:4}),
                     exam({date:5, minutes:90, setup:std, pct:85})], OPTS).official.examIdx === 4);
```

- [ ] **Step 2: Run to verify it fails**

Run: `node tests/merge.js`
Expected: FAIL — `M.recomputeStreak is not a function`

- [ ] **Step 3: Implement**

In `engine/merge.js`, inside the factory, above the `return`:

```js
  // A standard-format, timed test is the "official" one. Both fields are persisted on the
  // exam record, so this predicate works on stored history as well as a live exam.
  const isOfficialRecord = rec => !!(rec && rec.setup && rec.setup.mode === 'standard' && rec.minutes > 0);

  // Replay of the fold in app.js finishExam. passStreak and official are never merged across
  // devices - taking the larger of two streaks would invent one nobody earned - so they are
  // always recomputed from the merged, date-ordered exam log.
  function recomputeStreak(exams, opts) {
    const passPct = opts.passPct, streakNeeded = opts.streakNeeded;
    let passStreak = 0, official = null;
    for (let i = 0; i < exams.length; i++) {
      const e = exams[i];
      if (!e || e.kind === 'starter' || e.kind === 'custom') continue;
      const prevStreak = passStreak;
      const passed = e.pct >= passPct;
      passStreak = passed ? prevStreak + 1 : 0;
      if (!passed) official = null;
      else if (isOfficialRecord(e) && prevStreak >= streakNeeded) official = { examIdx: i, date: e.date, pct: e.pct };
    }
    return { passStreak, official };
  }
```

Change the return to:

```js
  return { VERSION, isOfficialRecord, recomputeStreak };
```

- [ ] **Step 4: Run to verify it passes**

Run: `node tests/merge.js`
Expected: all checks PASS.

- [ ] **Step 5: Commit**

```bash
git add engine/merge.js tests/merge.js
git commit -m "Add recomputeStreak replay of the exam log"
```

---

### Task 3: Make app.js use the shared fold

**Files:**
- Modify: `engine/app.js:661` (delete local `isOfficial`), `engine/app.js:726-732` (call the shared function)

**Interfaces:**
- Consumes: `FRAMerge.recomputeStreak`, `FRAMerge.isOfficialRecord` from Task 2.
- Produces: nothing new. This is a behaviour-preserving refactor whose safety net is the existing suite.

The point is that one implementation serves both the live path and the replay, so they cannot drift.

- [ ] **Step 1: Confirm the suite is green before touching anything**

Run: `npm test`
Expected: all suites pass. If not, stop — do not refactor onto a red suite.

- [ ] **Step 2: Replace the local isOfficial with the shared one**

`engine/app.js:661` currently reads:

```js
  const isOfficial = ex => !!(ex && ex.setup && ex.setup.mode === 'standard' && ex.minutes > 0);
```

Replace with:

```js
  const isOfficial = FRAMerge.isOfficialRecord;
```

`isOfficial` is called on the live `S.active` in several places and on stored records elsewhere; both carry `setup` and `minutes`, so the shared predicate covers every caller.

- [ ] **Step 3: Replace the inline fold**

In `finishExam`, `engine/app.js:726-732` currently reads:

```js
    } else {
      const prevStreak = S.passStreak; const passed = p >= PASS_PCT;
      S.passStreak = passed ? prevStreak + 1 : 0;
      // The official pass counts only once the streak was already complete; any failed test sends the learner back through the streak.
      if (!passed) S.official = null;
      else if (isOfficial(ex) && prevStreak >= STREAK_NEEDED) S.official = { examIdx, date: rec.date, pct: p };
      const plan = planFromTest(rec, examIdx); S.plan = plan.lessons.length ? plan : null;
    }
```

Replace with:

```js
    } else {
      // Recomputed from the whole log rather than incremented, so this path and the merge
      // replay in engine/merge.js can never disagree about the streak.
      const r = FRAMerge.recomputeStreak(S.exams, { passPct: PASS_PCT, streakNeeded: STREAK_NEEDED });
      S.passStreak = r.passStreak; S.official = r.official;
      const plan = planFromTest(rec, examIdx); S.plan = plan.lessons.length ? plan : null;
    }
```

`rec` is already pushed onto `S.exams` at line 721, so the replay sees the exam that was just submitted.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: every suite still passes, unchanged. `tests/selftest.js` already drives a full streak to the official stage (it asserts `stage()` becomes `official` after `STREAK_NEEDED` passes, and that a custom test leaves the streak alone), so a green run is real evidence the refactor preserved behaviour.

If `selftest.js` fails, the likely cause is that the replay now also reconsiders history the incremental version never revisited — read the failure before changing anything.

- [ ] **Step 5: Commit**

```bash
git add engine/app.js
git commit -m "Compute the pass streak by replay so live and merge paths share one fold"
```

---

### Task 4: Stable exam ids

**Files:**
- Modify: `engine/merge.js`
- Modify: `engine/app.js:721`
- Modify: `tests/merge.js`

**Interfaces:**
- Consumes: `FRAMerge` from Task 1.
- Produces: `examId(rec) -> string`. Returns `rec.id` when present, otherwise a deterministic id synthesized from `date`, `kind`, `total`, and `pct`.

Union-by-id needs identity. Records already in learners' localStorage have no `id`, so the synthesized form must be stable for the same record on any device.

- [ ] **Step 1: Write the failing tests**

Append to `tests/merge.js`, before the `if (fails.length)` block:

```js
// ---------- examId ----------
check('an explicit id is preserved', M.examId(exam({ id: 'x1' })) === 'x1');
check('a synthesized id is deterministic',
  M.examId(exam({ date: 7, pct: 82 })) === M.examId(exam({ date: 7, pct: 82 })));
check('records differing by date get different ids',
  M.examId(exam({ date: 7 })) !== M.examId(exam({ date: 8 })));
check('records differing by pct get different ids',
  M.examId(exam({ date: 7, pct: 82 })) !== M.examId(exam({ date: 7, pct: 83 })));
check('a synthesized id is a string', typeof M.examId(exam({})) === 'string');
```

- [ ] **Step 2: Run to verify it fails**

Run: `node tests/merge.js`
Expected: FAIL — `M.examId is not a function`

- [ ] **Step 3: Implement**

In `engine/merge.js`, above the `return`:

```js
  // Identity for union-merging exam logs. New records carry an explicit id; anything saved
  // before sync existed does not, so derive one from fields that never change after submit.
  const examId = rec => rec && rec.id ? rec.id : 'x-' + [rec.date, rec.kind, rec.total, rec.pct].join('-');
```

Add `examId` to the returned object:

```js
  return { VERSION, isOfficialRecord, recomputeStreak, examId };
```

- [ ] **Step 4: Give new records an explicit id**

In `engine/app.js`, line 721 currently reads:

```js
    S.exams.push(rec); const examIdx = S.exams.length - 1;
```

Change the `rec` construction on line 720 to include an id. Line 720 currently ends:

```js
    const rec = { date: Date.now(), kind: ex.kind, score, total, pct: p, byDomain, review, seconds: Math.round((Date.now() - ex.startedAt) / 1000), minutes: ex.minutes, setup: ex.setup || null, noConf: !!ex.noConf };
```

Replace with:

```js
    const rec = { id: 'x-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), date: Date.now(), kind: ex.kind, score, total, pct: p, byDomain, review, seconds: Math.round((Date.now() - ex.startedAt) / 1000), minutes: ex.minutes, setup: ex.setup || null, noConf: !!ex.noConf };
```

This matches the id format `saveFeedback` already uses at `engine/app.js:955`.

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: all suites pass. Exam records gaining a field is additive; nothing reads `rec` by key enumeration.

- [ ] **Step 6: Commit**

```bash
git add engine/merge.js engine/app.js tests/merge.js
git commit -m "Give exam records stable ids for union merging"
```

---

### Task 5: Merge the keyed maps

**Files:**
- Modify: `engine/merge.js`
- Modify: `tests/merge.js`

**Interfaces:**
- Consumes: `FRAMerge` from Task 1.
- Produces: `mergeMaps(a, b) -> {lessons, topics, qstats, seen, ratings}` — a partial merge covering only the keyed-map fields. Task 6 composes it into the full `mergeState`.

Counters take `max`, not sum: both devices' counters already include any shared history, so summing double-counts. These values feed only `topicPriority()` and `topicMastered()`, so undercounting simply resurfaces a topic more often — the safe direction.

- [ ] **Step 1: Write the failing tests**

Append to `tests/merge.js`:

```js
// ---------- mergeMaps ----------
const st = (o) => Object.assign({ lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {} }, o);

let m = M.mergeMaps(
  st({ lessons: { a: { status: 'read', best: 40, attempts: 2, passedAt: 0 } } }),
  st({ lessons: { a: { status: 'passed', best: 90, attempts: 1, passedAt: 500 } } }));
check('lesson status takes the higher rank', m.lessons.a.status === 'passed', m.lessons.a.status);
check('lesson best takes the max', m.lessons.a.best === 90, m.lessons.a.best);
check('lesson attempts take the max, not the sum', m.lessons.a.attempts === 2, m.lessons.a.attempts);
check('lesson passedAt takes the max', m.lessons.a.passedAt === 500);

m = M.mergeMaps(st({ lessons: { a: { status: 'passed', best: 90, attempts: 1, passedAt: 5 } } }),
                st({ lessons: { b: { status: 'read', best: 10, attempts: 1, passedAt: 0 } } }));
check('disjoint lessons union', !!m.lessons.a && !!m.lessons.b);

m = M.mergeMaps(st({ qstats: { q1: { seen: 5, correct: 3, wrong: 2, last: 10 } } }),
                st({ qstats: { q1: { seen: 2, correct: 2, wrong: 0, last: 99 } } }));
check('qstats take the max of each counter',
  m.qstats.q1.seen === 5 && m.qstats.q1.correct === 3 && m.qstats.q1.wrong === 2 && m.qstats.q1.last === 99,
  JSON.stringify(m.qstats.q1));

m = M.mergeMaps(st({ topics: { t1: { hist: [1,1], attempts: 2, correct: 0, streak: 0, last: 10 } } }),
                st({ topics: { t1: { hist: [0,0,0], attempts: 3, correct: 3, streak: 3, last: 50 } } }));
check('topics take the whole more recent record', m.topics.t1.streak === 3 && m.topics.t1.hist.length === 3,
  JSON.stringify(m.topics.t1));

m = M.mergeMaps(st({ ratings: { a: { r: 4, ts: 10 } } }), st({ ratings: { a: { r: 9, ts: 99 } } }));
check('ratings take the entry with the later ts', m.ratings.a.r === 9, m.ratings.a.r);

m = M.mergeMaps(st({ seen: { a: true } }), st({ seen: { b: true } }));
check('seen unions', m.seen.a === true && m.seen.b === true);
```

- [ ] **Step 2: Run to verify it fails**

Run: `node tests/merge.js`
Expected: FAIL — `M.mergeMaps is not a function`

- [ ] **Step 3: Implement**

In `engine/merge.js`, above the `return`:

```js
  const STATUS_RANK = { new: 0, read: 1, passed: 2 };
  const rank = s => STATUS_RANK[s] || 0;
  const max = (x, y) => (x || 0) > (y || 0) ? (x || 0) : (y || 0);
  const keys = (a, b) => Object.keys(Object.assign({}, a || {}, b || {}));

  // Merge one keyed map with a per-entry rule. Entries present on one side only pass through.
  function mergeBy(a, b, rule) {
    const out = {};
    keys(a, b).forEach(k => {
      const x = (a || {})[k], y = (b || {})[k];
      out[k] = x && y ? rule(x, y) : (x || y);
    });
    return out;
  }

  const mergeLesson = (x, y) => ({
    status: rank(x.status) >= rank(y.status) ? x.status : y.status,
    best: max(x.best, y.best),
    attempts: max(x.attempts, y.attempts),
    passedAt: max(x.passedAt, y.passedAt)
  });

  const mergeQstat = (x, y) => ({
    seen: max(x.seen, y.seen), correct: max(x.correct, y.correct),
    wrong: max(x.wrong, y.wrong), last: max(x.last, y.last)
  });

  // Whole-record, because combining hist/streak/correct field-by-field can produce a record
  // that never existed - a streak of 3 attached to a history whose last entry is a miss.
  const laterOf = (x, y, field) => (y[field] || 0) > (x[field] || 0) ? y : x;

  function mergeMaps(a, b) {
    return {
      lessons: mergeBy(a.lessons, b.lessons, mergeLesson),
      topics: mergeBy(a.topics, b.topics, (x, y) => laterOf(x, y, 'last')),
      qstats: mergeBy(a.qstats, b.qstats, mergeQstat),
      seen: Object.assign({}, a.seen || {}, b.seen || {}),
      ratings: mergeBy(a.ratings, b.ratings, (x, y) => laterOf(x, y, 'ts'))
    };
  }
```

Add `mergeMaps` to the returned object:

```js
  return { VERSION, isOfficialRecord, recomputeStreak, examId, mergeMaps };
```

- [ ] **Step 4: Run to verify it passes**

Run: `node tests/merge.js`
Expected: all checks PASS.

- [ ] **Step 5: Commit**

```bash
git add engine/merge.js tests/merge.js
git commit -m "Add keyed-map merge rules for lessons, topics, qstats, ratings and seen"
```

---

### Task 6: mergeState — the whole blob

**Files:**
- Modify: `engine/merge.js`
- Modify: `engine/app.js` (`fresh()` at ~line 106, `save()` at line 120)
- Modify: `tests/merge.js`

**Interfaces:**
- Consumes: `mergeMaps`, `examId`, `recomputeStreak` from Tasks 2, 4, 5.
- Produces: `mergeState(a, b, opts) -> state`, where `opts` is `{passPct, streakNeeded}`. Result carries `v: 3`, never carries `view` or `active`, and has `passStreak`/`official` derived by replay.

`touchedAt` is added here because merge is its only consumer: it is the tiebreaker for `path` and `settings`, which are single-valued and carry no timestamp of their own.

- [ ] **Step 1: Write the failing tests**

Append to `tests/merge.js`:

```js
// ---------- mergeState ----------
const full = (o) => Object.assign({
  v: 3, course: 'netplus', lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {},
  exams: [], feedback: [], passStreak: 0, official: null, plan: null, path: null,
  settings: { timer: true }, touchedAt: 0, created: 1
}, o);

let r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                     full({ exams: [exam({ id: 'e2', date: 2 })] }), OPTS);
check('exams union by id', r.exams.length === 2, r.exams.length);
check('exams sort by date', r.exams[0].id === 'e1' && r.exams[1].id === 'e2');

r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                 full({ exams: [exam({ id: 'e1', date: 1 })] }), OPTS);
check('the same exam on both sides appears once', r.exams.length === 1, r.exams.length);

// The case the whole design exists for: A has a three-pass streak, B has a later failure.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2}), exam({id:'a3',date:3})], passStreak: 3 }),
  full({ exams: [exam({id:'b1',date:4,pct:50})], passStreak: 0 }), OPTS);
check('a later failure on the other device resets the merged streak', r.passStreak === 0, r.passStreak);

// An official pass must not survive a later failure recorded elsewhere.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2}), exam({id:'a3',date:3}),
                 exam({id:'a4',date:4,minutes:90,setup:std,pct:85})],
         passStreak: 4, official: { examIdx: 3, date: 4, pct: 85 } }),
  full({ exams: [exam({id:'b1',date:5,pct:40})] }), OPTS);
check('a later failure revokes a merged official pass', r.official === null, JSON.stringify(r.official));

// examIdx must be resolved against the merged array, not inherited.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:2}), exam({id:'a2',date:3}), exam({id:'a3',date:4}),
                 exam({id:'a4',date:5,minutes:90,setup:std,pct:85})],
         official: { examIdx: 3, date: 5, pct: 85 } }),
  full({ exams: [exam({id:'b1',date:1,kind:'starter',pct:20})] }), OPTS);
check('official.examIdx is recomputed against the merged array', r.official.examIdx === 4,
  JSON.stringify(r.official));
check('the exam it points at is the official one', r.exams[r.official.examIdx].id === 'a4');

r = M.mergeState(full({ path: 'fast', touchedAt: 10 }), full({ path: 'thorough', touchedAt: 99 }), OPTS);
check('path comes from the more recently touched side', r.path === 'thorough', r.path);

r = M.mergeState(full({ feedback: [{ id: 'f1', ts: 1, sent: false }] }),
                 full({ feedback: [{ id: 'f1', ts: 1, sent: true }, { id: 'f2', ts: 2 }] }), OPTS);
check('feedback unions by id', r.feedback.length === 2, r.feedback.length);
check('a sent feedback flag survives the merge', r.feedback.filter(f => f.id === 'f1')[0].sent === true);

r = M.mergeState(full({ view: { name: 'exam' }, active: { kind: 'practice' } }), full({}), OPTS);
check('view is never synced', r.view === undefined, JSON.stringify(r.view));
check('active is never synced', r.active === undefined, JSON.stringify(r.active));

const one = full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2})], lessons: { a: { status:'passed', best:90, attempts:1, passedAt:5 } } });
check('merge is idempotent', JSON.stringify(M.mergeState(one, one, OPTS)) === JSON.stringify(M.mergeState(M.mergeState(one, one, OPTS), one, OPTS)));

const A = full({ exams: [exam({id:'a1',date:1})], lessons: { a: { status:'passed', best:90, attempts:2, passedAt:5 } } });
const B = full({ exams: [exam({id:'b1',date:2})], lessons: { a: { status:'read', best:40, attempts:1, passedAt:0 } } });
check('merge is commutative',
  JSON.stringify(M.mergeState(A, B, OPTS)) === JSON.stringify(M.mergeState(B, A, OPTS)));
```

- [ ] **Step 2: Run to verify it fails**

Run: `node tests/merge.js`
Expected: FAIL — `M.mergeState is not a function`

- [ ] **Step 3: Implement**

In `engine/merge.js`, above the `return`:

```js
  // Union two arrays of records by a key function, keeping the entry that reports more progress.
  function unionBy(a, b, keyOf, prefer) {
    const out = {}; const order = [];
    (a || []).concat(b || []).forEach(item => {
      const k = keyOf(item);
      if (!(k in out)) { out[k] = item; order.push(k); }
      else if (prefer) out[k] = prefer(out[k], item);
    });
    return order.map(k => out[k]);
  }

  // Merge two complete state blobs. Commutative and idempotent: the result depends on the
  // contents, never on which side is passed first.
  function mergeState(a, b, opts) {
    const maps = mergeMaps(a, b);
    const exams = unionBy(a.exams, b.exams, examId, (x, y) => (y.pct || 0) > (x.pct || 0) ? y : x)
      .slice().sort((x, y) => (x.date || 0) - (y.date || 0) || examId(x).localeCompare(examId(y)));
    const feedback = unionBy(a.feedback, b.feedback, f => f.id, (x, y) => x.sent ? x : y);
    const newer = (b.touchedAt || 0) > (a.touchedAt || 0) ? b : a;
    const streak = recomputeStreak(exams, opts);
    // Both sides missing `created` must not yield Infinity, which JSON.stringify turns into null.
    const born = Math.min(a.created || Infinity, b.created || Infinity);

    return {
      v: 3,
      course: a.course || b.course,
      lessons: maps.lessons, topics: maps.topics, qstats: maps.qstats,
      seen: maps.seen, ratings: maps.ratings,
      exams: exams,
      feedback: feedback,
      passStreak: streak.passStreak,
      official: streak.official,
      plan: (b.plan && (!a.plan || (b.plan.createdAt || 0) > (a.plan.createdAt || 0))) ? b.plan : a.plan,
      path: newer.path,
      settings: newer.settings || a.settings || b.settings,
      touchedAt: max(a.touchedAt, b.touchedAt),
      created: isFinite(born) ? born : 0
    };
  }
```

Add `mergeState` to the returned object:

```js
  return { VERSION, isOfficialRecord, recomputeStreak, examId, mergeMaps, mergeState };
```

- [ ] **Step 4: Run to verify it passes**

Run: `node tests/merge.js`
Expected: all checks PASS.

- [ ] **Step 5: Add touchedAt to the engine state**

In `engine/app.js`, `fresh()` currently returns an object ending `..., seen: {}, created: Date.now() };`. Add `touchedAt: 0` before `created`:

```js
    return { v: 3, course: course.id, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, official: null, plan: null, path: null, active: null, settings: { timer: true }, feedback: [], ratings: {}, seen: {}, touchedAt: 0, created: Date.now() };
```

`engine/app.js:120` currently reads:

```js
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
```

Replace with:

```js
  function save() { S.touchedAt = Date.now(); try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
```

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: every suite passes. `touchedAt` is additive and `load()` still checks only `s.v === 3`, so existing saved states keep loading.

- [ ] **Step 7: Commit**

```bash
git add engine/merge.js engine/app.js tests/merge.js
git commit -m "Add mergeState with replayed streak and device-local field exclusion"
```

---

### Task 7: Round-trip test against the real engine

**Files:**
- Modify: `tests/merge.js`

**Interfaces:**
- Consumes: everything above, plus `boot` from `tests/lib.js`.
- Produces: nothing. This is the proof that merge output is a state the engine actually accepts.

Every test so far uses synthetic blobs. This one takes a state the real engine produced, merges it, and feeds it back through the engine's own import path to confirm the result loads and renders.

- [ ] **Step 1: Write the failing test**

Append to `tests/merge.js`, before the `if (fails.length)` block:

```js
// ---------- round trip through the real engine ----------
const path = require('path');
const { boot, ROOT } = require('./lib');
const dir = path.join(ROOT, 'courses', 'netplus');
const readState = w => JSON.parse(w.localStorage.getItem('fra.netplus.state.v3'));

let w = boot({ courseDir: dir });
w.click(w.$('[data-act="go"][data-arg="home"]'));
w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
const QI = {}; w.FRA.questions.forEach(q => { QI[q.id] = q; });
const fatten = x => typeof x === 'string' ? QI[x] : x;
readState(w).active.items.map(fatten).forEach(q => {
  w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`));
  w.click(w.$('[data-act="conf"][data-arg="5"]'));
  w.click(w.$('[data-act="submit"]'));
});
const real = readState(w);
check('the engine produced a state with a starter exam', real.exams.length === 1, real.exams.length);
check('the engine stamped touchedAt', real.touchedAt > 0, real.touchedAt);
check('the engine gave the exam an id', typeof real.exams[0].id === 'string', real.exams[0].id);

const T = w.FRA.course.test;
const selfMerged = M.mergeState(real, real, { passPct: T.passPct, streakNeeded: T.streakNeeded });
check('merging a real state with itself keeps one exam', selfMerged.exams.length === 1, selfMerged.exams.length);
check('merging a real state with itself preserves lesson count',
  Object.keys(selfMerged.lessons).length === Object.keys(real.lessons).length);

// Feed the merged state back through the engine's own import path.
let w2 = boot({ courseDir: dir });
w2.click(w2.$('[data-act="go"][data-arg="home"]'));
w2.click(w2.$('.nav [data-act="nav"][data-arg="feedback"]'));
const box = w2.$('#io');
check('the import box is present', !!box);
if (box) {
  box.value = JSON.stringify(selfMerged);
  w2.click(w2.$('[data-act="import"]'));
  const after = readState(w2);
  check('the engine imported the merged state', after.exams.length === 1, after.exams.length);
  check('the imported state renders without throwing', typeof w2.text() === 'string' && w2.text().length > 0);
}
```

- [ ] **Step 2: Run it**

Run: `node tests/merge.js`
Expected: FAIL on at least `the engine stamped touchedAt` or the import checks if any earlier task was skipped. If every earlier task landed, this may pass first time — that is a valid outcome for a round-trip test. Confirm it fails for the right reason by temporarily changing `selfMerged.exams.length === 1` to `=== 2`, re-running to see it FAIL, then changing it back.

- [ ] **Step 3: Fix whatever it surfaces**

Two failures are plausible and both are real bugs, not test problems:

- The import path at `engine/app.js:1143` rejects anything whose `v` is not 2 or 3. `mergeState` sets `v: 3`, so this should pass; if it does not, check that `mergeState` is not dropping `v`.
- `import` runs `Object.assign(fresh(), obj, ...)`, so any field `mergeState` omits falls back to the `fresh()` default. `view` and `active` are deliberately omitted and `fresh()` supplies them — that is the intended interaction, not a bug.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 5: Commit**

```bash
git add tests/merge.js
git commit -m "Add round-trip test merging real engine state through the import path"
```

---

## Done when

- `npm test` passes with `tests/merge.js` included.
- `python build.py netplus` produces a bundle containing `merge.js` — verify with
  `grep -c FRAMerge dist/netplus.html`, expecting a non-zero count.
- `engine/app.js` contains no inline streak arithmetic; the only implementation is
  `recomputeStreak` in `engine/merge.js`.
- The two adversarial cases pass: a later failure on another device resets a merged streak,
  and revokes a merged official pass.

## Not in this plan

Auth, network, the API service, and the sync layer. This plan ships a tested pure merge and
nothing that calls it — `mergeState` has no production caller until the sync plan lands. That is
deliberate: the merge is the part with real correctness risk, and it is fully testable alone.
