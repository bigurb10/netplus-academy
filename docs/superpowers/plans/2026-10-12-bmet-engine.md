# BMET Academy, Plan A: engine (untested domains, labs and instruments, certificate, catalog categories)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the FieldReady Academy engine everything the BMET Academy pack needs before any content exists: untested domains, lab lessons with five virtual instruments, lab progress in state and sync, a certificate of completion, catalog categories, and the loader registrations, all proven on the mini fixture.

**Architecture:** One new engine file, `engine/instruments.js` (UMD like `engine/merge.js`: a window global for the browser, `module.exports` for node tests), holds the pure instrument math, SVG figures, lab validation, and the instrument panels. `engine/app.js` gains a lab card inside the lesson view, a `labs` map in state, "tested" versus "untested" domains, and a certificate view; it reads `window.FRAInstruments` at render time only. `engine/merge.js` and `engine/summary.js` learn the new state fields. The catalog is regrouped into sections. The mini fixture (`tests/fixtures/mini`) gains an untested domain and one lab so every engine change is testable without the BMET pack.

**Tech Stack:** Plain browser JavaScript (no build step for the engine), Python `build.py` bundler, jsdom tests run by `node tests/<name>.js` and `npm test`, Windows with Git Bash.

Spec: `docs/superpowers/specs/2026-10-12-bmet-academy-design.md` (sections 3, 4, 5, 7).

## Global Constraints

- Namespace `FRA`. Course packs are plain scripts that set `window.FRA.*`. Engine modules that tests import directly use the UMD wrapper from `engine/merge.js`.
- **Adding a file under `engine/` touches EIGHT registrations:** `build.py` (bundle list), `tests/lib.js` (jsdom boot), the five course shells `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`, and `tests/loaders.js` (the audit list). Task 2 does all eight.
- `engine/app.js` must never hard-require `window.FRAInstruments` at boot. It reads it when a lab card renders; a missing module shows "This lab is unavailable." inside the lab card.
- The engine hardcodes no safety limit, tolerance, or reading. Every number comes from a lab's `scenario`.
- Copy that the spec fixes verbatim: lesson pill `Not on the exam`; Home stat eyebrow `Labs done`; static page note `This lesson includes an interactive lab in the course.`; catalog headings `AAMI certifications`, `CompTIA certifications`, `Tools for technicians` (the `Start here: biomed basic training` section arrives with the pack in Plan B).
- Tested domain: `quota > 0` and `pct > 0`. Untested: both 0. Anything else throws at boot.
- `npm test` must pass at the end of every task. Run the single suite named in the task first, then `npm test`.
- Windows note: Bash heredocs halve backslashes. Write or edit files with the Write and Edit tools (or the editor), never `cat <<EOF` for anything containing a backslash or a template literal.
- Commit after every task. Commit messages end with:

```
Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub
```

- Never push. Blake pushes.

## File structure

| File | Responsibility | Task |
|---|---|---|
| `engine/app.js` | tested/untested domains; lab card, lab state, lab actions; certificate view; self-test additions | 1, 3, 5 |
| `engine/instruments.js` (new) | `NAMES`, `jitter`, `figure`, `compute.*`, `truth`, `measure`, `validate`, `current`, `render` with panels | 2, 4 |
| `engine/merge.js` | merge `labs` by newer `at`; `certAt` earliest | 3, 5 |
| `engine/summary.js` | `labsDone`, `labsTotal` for the account page | 6 |
| `engine/styles.css` | lab, instrument, and certificate styles | 3, 4, 5 |
| `tests/fixtures/mini/*` | untested domain 4 with unit 3; lab `mini-ping` on `u1l2`; `labs.js` | 1, 3 |
| `tests/instruments.js` (new) | pure tests for `engine/instruments.js`, then jsdom panel tests | 2, 4 |
| `tests/engine.js` | untested domains, lab card, certificate | 1, 3, 5 |
| `tests/merge.js`, `tests/summary.js`, `tests/account.js`, `tests/catalog.js`, `tests/site.js`, `tests/loaders.js` | one block each | 2, 3, 5, 6, 7, 8 |
| `build.py` | bundle `instruments.js`; `labs` and tested domains in `course_meta` | 2, 6 |
| `tests/lib.js`, five shells, `tests/loaders.js` | load `instruments.js` | 2 |
| `account/index.html` | "Labs done" fact | 6 |
| `index.html`, `catalog.css` | three catalog sections | 7 |
| `site/build-site.js`, `site/site.css` | lab note on static lesson pages, lab mark on the lessons index | 8 |
| `README.md` | labs, instruments, untested domains, certificate, catalog sections | 8 |

---

### Task 1: Untested domains

A domain with `quota: 0` and `pct: 0` is course content that never reaches a test. Its lessons keep checkpoints and count toward lessons passed.

**Files:**
- Modify: `tests/fixtures/mini/course.js`, `tests/fixtures/mini/curriculum.js`, `tests/fixtures/mini/questions.js`, `tests/fixtures/mini/deep.js`
- Modify: `engine/app.js` (lines 19 to 26, 50, and every `DOMAIN_IDS` use listed below)
- Test: `tests/engine.js`

**Interfaces:**
- Produces: in `app.js`, `TESTED_IDS` (array of tested domain ids, course order) and `UNTESTED` (a `Set` of untested ids). `STARTER_N` counts tested domains only. Later tasks use `UNTESTED` for the lesson pill and the certificate text.

- [ ] **Step 1: Extend the mini fixture with an untested domain**

In `tests/fixtures/mini/course.js`, change the `domains` array to:

```js
  domains: [
    { id: 1, name: "Alpha", short: "Alpha", pct: 40, quota: 4 },
    { id: 2, name: "Beta", short: "Beta", pct: 30, quota: 3 },
    { id: 3, name: "Gamma", short: "Gamma", pct: 30, quota: 3 },
    { id: 4, name: "Extra", short: "Extra", pct: 0, quota: 0 }
  ],
```

Replace the whole of `tests/fixtures/mini/curriculum.js` with:

```js
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];
const mkLesson = (id, title, domain, extra) => Object.assign({ id, title, domain, obj: "1.1", minutes: 3, body: `Lesson ${title}.\n\n## Heading\n- point one\n- point two\n\n> Tip for ${title}.`, hook: `Remember ${title}.` }, extra || {});
FRA.units.push({ id: "u1", n: 1, title: "Unit One", domain: 1, blurb: "First unit.", assumes: "Nothing.", lessons: [mkLesson("u1l1", "A One", 1), mkLesson("u1l2", "A Two", 1), mkLesson("u1l3", "B One", 2)] });
FRA.units.push({ id: "u2", n: 2, title: "Unit Two", domain: 2, blurb: "Second unit.", assumes: "Unit one.", lessons: [mkLesson("u2l1", "B Two", 2), mkLesson("u2l2", "C One", 3), mkLesson("u2l3", "C Two", 3)] });
// Domain 4 is untested (quota 0): its lessons never reach a test but keep their checkpoints.
FRA.units.push({ id: "u3", n: 3, title: "Unit Three", domain: 4, blurb: "Untested unit.", assumes: "Nothing.", lessons: [mkLesson("u3l1", "D One", 4), mkLesson("u3l2", "D Two", 4)] });
```

In `tests/fixtures/mini/questions.js`, change the lesson list to include the two new lessons:

```js
for (const t of ["u1l1", "u1l2", "u1l3", "u2l1", "u2l2", "u2l3", "u3l1", "u3l2"]) {
```

In `tests/fixtures/mini/deep.js`, change the id list the same way:

```js
for (const id of ["u1l1", "u1l2", "u1l3", "u2l1", "u2l2", "u2l3", "u3l1", "u3l2"]) FRA.deep[id] = `## Deeper\nA longer explanation for ${id}.\n\n\`\`\`\ndiagram\n\`\`\`\n\n1. step one\n2. step two`;
```

- [ ] **Step 2: Write the failing test**

In `tests/engine.js`, insert this block immediately before the line `  if (fails.length) { console.error(\`engine: ${fails.length} failed\`); process.exit(1); }`:

```js
  // ----- Untested domains (mini fixture: domain 4 has quota 0, unit 3 is its content) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini }); const L = lessonsOf(w);
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    w.click(w.$('[data-act="go"][data-arg="home"]'));
    check('mini: the welcome page counts only tested domains', /each of the 3 exam domains/.test(w.text()));
    w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
    const items = st().active.items.map(fat);
    check('mini: the starter test is 2 per tested domain, none from the untested one', items.length === 6 && items.every(q => L[q.t].domain !== 4), items.map(q => q.t).join(','));
    items.forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'go', 'home');
    check('mini: domain bars show only tested domains', w.$$('.bars .bar-row').length === 3 && !/Extra/.test(w.$('.bars').textContent), w.$$('.bars .bar-row').length);
    act(w, 'go', 'exam');
    check('mini: the test setup lists only tested domains', w.$$('.su-w').length === 3 && !w.$('.su-w[data-d="4"]'), w.$$('.su-w').length);
    act(w, 'lesson', 'u3l1');
    check('mini: an untested lesson says so', w.$$('.lesson-head .pill').some(p => p.textContent === 'Not on the exam'));
    act(w, 'lesson', 'u1l1');
    check('mini: a tested lesson does not', !w.$$('.lesson-head .pill').some(p => p.textContent === 'Not on the exam'));
    act(w, 'lesson', 'u3l1');
    w.click(w.$('[data-act="start-checkpoint"]'));
    for (let k = 0; k < 4; k++) { const s = st().active; const q = fat(s.items[s.i]); w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); }
    check('mini: an untested lesson passes its checkpoint', st().lessons.u3l1.status === 'passed');
    act(w, 'go', 'home');
    check('mini: lessons passed counts the untested lesson out of all 8', /1\s*\/ 8/.test(w.$$('.stat').map(e => e.textContent).join(' ')), w.$$('.stat').map(e => e.textContent).join(' | '));
    w.close();
  }
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node tests/engine.js`
Expected: the boot throws or the new checks print `FAIL` (`each of the 4 exam domains`, starter of 8 items, four bars, four weight inputs, no `Not on the exam` pill).

- [ ] **Step 4: Rename the sampling, weighting, and chart uses to `TESTED_IDS`**

Run from the repo root:

```bash
sed -i 's/DOMAIN_IDS/TESTED_IDS/g' engine/app.js
```

Then make these three edits so the full list keeps its three legitimate uses and the two lists are defined:

1. The definition line now reads `  const TESTED_IDS = course.domains.map(d => d.id);`. Replace that one line with:

```js
  const DOMAIN_IDS = course.domains.map(d => d.id);
  // Tested domains carry a test quota. A domain with quota 0 (and pct 0) is untested: its lessons
  // are course content with checkpoints, but never appear on the starter test, tests, the domain
  // bars, the test setup, or the strength chart (units like "Welcome" and "Getting hired").
  const TESTED_IDS = DOMAIN_IDS.filter(d => DOMAINS[d].quota > 0);
  const UNTESTED = new Set(DOMAIN_IDS.filter(d => !(DOMAINS[d].quota > 0)));
  course.domains.forEach(d => { if ((d.quota > 0) !== (d.pct > 0)) throw new Error(`domain ${d.id} must have pct and quota both above zero (tested) or both zero (untested)`); });
  if (!TESTED_IDS.length) throw new Error('FRA.course needs at least one tested domain');
```

2. The data index line `  const lessonsByDomain = {}; TESTED_IDS.forEach(d => { lessonsByDomain[d] = []; });` goes back to `DOMAIN_IDS` (every lesson, tested or not, needs its domain bucket):

```js
  const lessonsByDomain = {}; DOMAIN_IDS.forEach(d => { lessonsByDomain[d] = []; });
```

3. In `finishExam`, the line `    let score = 0; const byDomain = {}; TESTED_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });` goes back to `DOMAIN_IDS` (a record keeps a bucket for every domain):

```js
    let score = 0; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });
```

Verify: `grep -c "DOMAIN_IDS" engine/app.js` prints `5` (the definition, the two filtered lists, `lessonsByDomain`, `byDomain`) and `grep -c "TESTED_IDS" engine/app.js` prints `25`.

- [ ] **Step 5: Keep the strength chart to tested domains and label untested lessons**

In `engine/app.js`, the `STRENGTH_META` line currently starts `  const STRENGTH_META = { domains: course.domains.map(d => ({ id: d.id, short: d.short, name: d.name, pct: d.pct })),`. Change `course.domains.map(` to `course.domains.filter(d => d.quota > 0).map(` so the line begins:

```js
  const STRENGTH_META = { domains: course.domains.filter(d => d.quota > 0).map(d => ({ id: d.id, short: d.short, name: d.name, pct: d.pct })),
```

In `viewLesson`, both places that render the domain pill `<span class="pill">${DOMAINS[l.domain].short}</span>` (the locked-lesson return near the top of the function, and the main return's `lesson-head`) get the untested pill right after it. Replace each occurrence of:

```js
<span class="pill">${DOMAINS[l.domain].short}</span>
```

with:

```js
<span class="pill">${DOMAINS[l.domain].short}</span>${UNTESTED.has(l.domain) ? '<span class="pill">Not on the exam</span>' : ''}
```

(Two occurrences in `viewLesson`. `grep -c "Not on the exam" engine/app.js` prints `2`.)

- [ ] **Step 6: Guard the self-test**

In `runSelfTest`, right after the line `    if (!S.exams[0] || S.exams[0].kind !== 'starter') throw new Error('starter not recorded');` add:

```js
    if (S.exams[0].total !== STARTER_N || S.exams[0].review.some(r => UNTESTED.has(L[fat(r.q).t].domain))) throw new Error('starter test drew from an untested domain or the wrong count');
```

and right after `    log.push(\`full ${S.exams[1].pct}% passes=${S.passes} ...\`);` add:

```js
    if (S.exams[1].review.some(r => UNTESTED.has(L[fat(r.q).t].domain))) throw new Error('a test drew from an untested domain');
```

- [ ] **Step 7: Run the tests**

Run: `node tests/engine.js && node tests/selftest.js && node tests/site.js`
Expected: every `mini:` check prints `PASS`; selftest prints `[PASS] mini` with `starter` showing 6 questions; site parity still passes (the free set is still the first three lessons).

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 8: Commit**

```bash
git add engine/app.js tests/engine.js tests/fixtures/mini
git commit -m "feat(engine): untested domains (quota 0) stay out of tests, bars, and setup; mini fixture gains one

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---
### Task 2: `engine/instruments.js` core (math, figures, validation) and its eight loader registrations

The pure half of the instruments module: deterministic readings, SVG figures, lab validation, the value a task should record, and the two trivial panels (`figures`, `choices`). The five interactive panels come in Task 4.

**Files:**
- Create: `engine/instruments.js`
- Create: `tests/instruments.js`
- Modify: `build.py` (the `scripts` concatenation in `build()`), `tests/lib.js` (the engine evals), `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html` (one script tag each), `tests/loaders.js` (`BEFORE_APP`), `package.json` (test script)

**Interfaces:**
- Produces `window.FRAInstruments` / `module.exports` with:
  - `VERSION` (1), `NAMES` (`['dmm','safety','monitor','infusion','defib','figures','choices']`)
  - `jitter(seed, key) -> number in [-1, 1]`, deterministic
  - `figure(spec) -> svg string` for `{ kind: 'meter'|'cylinder'|'strip', ... }`
  - `compute.dmm(scenario, { fn, a, b, power }, seed?) -> { fn, value, unit, text, invalid, lsd }`
  - `compute.safety(scenario, { test, polarity, ground }, seed?) -> { test, value, unit, text, lsd, limit }`
  - `compute.monitor(scenario, { hr, rhythm, spo2, sys, dia }) -> { hr, spo2, sys, dia, alarm }`
  - `compute.infusion(scenario, { rate, minutes }) -> { volume, exact, trueRate, rateFromVolume, errPct }`
  - `compute.defib(scenario, { energy }) -> { energy, delivered, chargeSeconds }`
  - `truth.verdict(lab) -> 'pass' | 'fail' | null`
  - `measure(lab, task) -> { value, lsd } | null` (what a reading task's `measure` resolves to)
  - `validate(lab) -> string[]` (empty when the lab is sound)
  - `current(lab, ui, task) -> number | null` (the instrument's displayed value for a task)
  - `render(el, lab, ui, api)` (this task: `figures` and `choices` only; Task 4 adds the rest)
- Lab record shape (spec section 3): `{ id, lesson, title, instrument, intro, kit?, manual?, scenario, tasks: [{ id, kind: 'reading'|'verdict'|'choice', prompt, unit?, expect, measure?, options? }], why: { taskId: string } }`. Task ids match `/^[a-z0-9-]+$/`.
- Scenario shapes, one per instrument (the content author writes these; `validate` checks them):
  - `dmm`: `{ svg, points: { A: [x, y] }, power?: bool, vdc: { 'A-B': 9 }, vac: {}, ohm: { 'B-C': 1000 }, adc: { 'X-Y': 0.009 }, cont: { 'A-B': true }, diode: { 'D-E': 0.65 } }` (keys are `red-black` point pairs; a reversed pair reads negative for volts and amps, OL for a diode)
  - `safety`: `{ standard, ground, chassis: { normal, reverse, 'normal-open', 'reverse-open' }, lead: { same keys }, limits: { ground, chassis, lead } }` (ohms and microamps)
  - `monitor`: `{ hrErr, spo2Err, sysErr, diaErr, tolerance: { hr, spo2, nibp } }`
  - `infusion`: `{ rateErr, cylinderMl, graduation, tolerance }` (`rateErr` a fraction, `tolerance` a percent)
  - `defib`: `{ energies: [..], deliveredErr: { '200': 0.02 }, tolerance: { pct, floor } }`
  - `figures`: `{ figures: [ figure specs with a `caption` ] }`
  - `choices`: `{ text }`
- Task `measure` shapes: dmm `{ fn, a, b, power? }`; safety `{ test, polarity, ground }`; monitor `{ param: 'hr'|'spo2'|'sys'|'dia', set: { hr, rhythm, spo2, sys, dia } }`; infusion `{ what: 'volume'|'rate'|'error', rate, minutes }`; defib `{ energy }`; figures `{ figure: index }`.

- [ ] **Step 1: Write the failing tests**

Create `tests/instruments.js`:

```js
// engine/instruments.js: deterministic instrument math, SVG figures, lab validation. Pure half
// (no DOM) first; the panel block at the end boots jsdom. Run: node tests/instruments.js
'use strict';
const I = require('../engine/instruments.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const near = (a, b, eps) => typeof a === 'number' && Math.abs(a - b) <= eps;

check('module loads with its version and the seven instrument names', I.VERSION === 1 && Array.isArray(I.NAMES) && I.NAMES.join(',') === 'dmm,safety,monitor,infusion,defib,figures,choices');

// ---------- jitter ----------
check('jitter is deterministic for the same seed and key', I.jitter('lab-a', 'k') === I.jitter('lab-a', 'k'));
check('jitter stays within [-1, 1]', ['a', 'b', 'c', 'd', 'e'].every(k => { const j = I.jitter('seed', k); return j >= -1 && j <= 1; }));
check('jitter differs across keys', new Set(['a', 'b', 'c', 'd', 'e'].map(k => I.jitter('seed', k))).size > 1);

// ---------- dmm ----------
const DMM = { vdc: { 'A-B': 9, 'B-C': 4.5 }, vac: { 'P-N': 120 }, ohm: { 'B-C': 1000 }, adc: { 'X-Y': 0.009 }, cont: { 'A-B': true }, diode: { 'D-E': 0.65 } };
let r = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true });
check('dmm: DC volts across a known pair', near(r.value, 9, 0.011) && r.unit === 'V' && /V$/.test(r.text) && !r.invalid && r.lsd === 0.01, JSON.stringify(r));
check('dmm: swapped probes read negative', I.compute.dmm(DMM, { fn: 'vdc', a: 'B', b: 'A', power: true }).value < 0);
check('dmm: volts with the circuit off read zero', I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: false }).value === 0);
check('dmm: an unknown pair reads OL', I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'Q', power: true }).text === 'OL');
check('dmm: AC volts', near(I.compute.dmm(DMM, { fn: 'vac', a: 'P', b: 'N', power: true }).value, 120, 0.11));
r = I.compute.dmm(DMM, { fn: 'ohm', a: 'B', b: 'C', power: true });
check('dmm: ohms on a powered circuit is invalid', r.invalid === true && r.value === null && /INVALID/.test(r.text), r.text);
r = I.compute.dmm(DMM, { fn: 'ohm', a: 'B', b: 'C', power: false });
check('dmm: ohms with power off', near(r.value, 1000, 1.01) && r.unit === 'ohm' && r.lsd === 1, JSON.stringify(r));
check('dmm: ohms either way round', near(I.compute.dmm(DMM, { fn: 'ohm', a: 'C', b: 'B', power: false }).value, 1000, 1.01));
check('dmm: amps only at the break point', near(I.compute.dmm(DMM, { fn: 'adc', a: 'X', b: 'Y', power: true }).value, 0.009, 0.0011) && I.compute.dmm(DMM, { fn: 'adc', a: 'A', b: 'B', power: true }).text === 'OL');
check('dmm: continuity beeps where the table says so and OL elsewhere', I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'B', power: false }).text === 'Continuity' && I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'C', power: false }).text === 'OL');
check('dmm: continuity on a powered circuit is invalid', I.compute.dmm(DMM, { fn: 'cont', a: 'A', b: 'B', power: true }).invalid === true);
check('dmm: diode forward drop one way, OL the other', near(I.compute.dmm(DMM, { fn: 'diode', a: 'D', b: 'E', power: false }).value, 0.65, 0.011) && I.compute.dmm(DMM, { fn: 'diode', a: 'E', b: 'D', power: false }).text === 'OL');
check('dmm: a seed jitters by at most one least-significant digit', (() => { const a = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true }, 'lab-1'); const b = I.compute.dmm(DMM, { fn: 'vdc', a: 'A', b: 'B', power: true }, 'lab-1'); return a.value === b.value && near(a.value, 9, 0.011); })());

// ---------- safety ----------
const SAFE = { standard: 'NFPA 99', ground: 0.12, chassis: { normal: 45, reverse: 60, 'normal-open': 180, 'reverse-open': 210 }, lead: { normal: 8, reverse: 9, 'normal-open': 40, 'reverse-open': 45 }, limits: { ground: 0.5, chassis: 500, lead: 100 } };
r = I.compute.safety(SAFE, { test: 'ground', polarity: 'normal', ground: 'closed' });
check('safety: ground wire resistance in ohms', near(r.value, 0.12, 0.011) && r.unit === 'ohm' && r.limit === 0.5, JSON.stringify(r));
r = I.compute.safety(SAFE, { test: 'chassis', polarity: 'reverse', ground: 'open' });
check('safety: chassis leakage, reverse polarity, open ground, in microamps', near(r.value, 210, 1.01) && r.unit === 'uA' && r.limit === 500, JSON.stringify(r));
check('safety: lead leakage normal', near(I.compute.safety(SAFE, { test: 'lead', polarity: 'normal', ground: 'closed' }).value, 8, 1.01));

// ---------- monitor ----------
const MON = { hrErr: 1, spo2Err: -1, sysErr: 2, diaErr: -1, tolerance: { hr: 2, spo2: 2, nibp: 3 } };
r = I.compute.monitor(MON, { hr: 80, rhythm: 'nsr', spo2: 98, sys: 120, dia: 80 });
check('monitor: numerics are the simulator plus the scenario offsets', r.hr === 81 && r.spo2 === 97 && r.sys === 122 && r.dia === 79 && r.alarm === null, JSON.stringify(r));
check('monitor: asystole reads zero with an alarm', (() => { const m = I.compute.monitor(MON, { hr: 80, rhythm: 'asystole', spo2: 98, sys: 120, dia: 80 }); return m.hr === 0 && m.alarm === 'ASYSTOLE'; })());
check('monitor: fibrillation has no rate and an alarm', (() => { const m = I.compute.monitor(MON, { hr: 80, rhythm: 'vfib', spo2: 98, sys: 120, dia: 80 }); return m.hr === null && m.alarm === 'VFIB'; })());

// ---------- infusion ----------
const INF = { rateErr: 0.03, cylinderMl: 100, graduation: 1, tolerance: 5 };
r = I.compute.infusion(INF, { rate: 100, minutes: 30 });
check('infusion: delivered volume follows the true rate and reads to the graduation', near(r.exact, 51.5, 0.001) && r.volume === 52 && r.trueRate === 103 && near(r.rateFromVolume, 104, 0.001) && near(r.errPct, 4, 0.001), JSON.stringify(r));
check('infusion: the cylinder caps the volume', I.compute.infusion(INF, { rate: 600, minutes: 60 }).volume === 100);
check('infusion: zero minutes is empty', I.compute.infusion(INF, { rate: 100, minutes: 0 }).volume === 0);

// ---------- defib ----------
const DEF = { energies: [2, 50, 200, 360], deliveredErr: { '200': 0.02, '2': 0.1 }, tolerance: { pct: 15, floor: 4 } };
r = I.compute.defib(DEF, { energy: 200 });
check('defib: delivered energy applies the per-setting error', r.energy === 200 && r.delivered === 204 && r.chargeSeconds > 0, JSON.stringify(r));
check('defib: a setting without an error delivers exactly', I.compute.defib(DEF, { energy: 50 }).delivered === 50);
check('defib: low energy rounds to a tenth', I.compute.defib(DEF, { energy: 2 }).delivered === 2.2);

// ---------- truth.verdict ----------
const lab = (instrument, scenario, tasks, extra) => Object.assign({ id: 'l1', lesson: 'u1l1', title: 'T', instrument, intro: 'i', scenario, tasks, why: {} }, extra || {});
check('verdict: a safe device passes', I.truth.verdict(lab('safety', SAFE, [])) === 'pass');
check('verdict: one leakage over its limit fails', I.truth.verdict(lab('safety', Object.assign({}, SAFE, { chassis: Object.assign({}, SAFE.chassis, { 'reverse-open': 600 }) }), [])) === 'fail');
check('verdict: ground resistance over its limit fails', I.truth.verdict(lab('safety', Object.assign({}, SAFE, { ground: 0.8 }), [])) === 'fail');
check('verdict: a monitor within tolerance passes', I.truth.verdict(lab('monitor', MON, [])) === 'pass');
check('verdict: a monitor off by more than tolerance fails', I.truth.verdict(lab('monitor', Object.assign({}, MON, { hrErr: 3 }), [])) === 'fail');
check('verdict: infusion within tolerance passes, beyond fails', I.truth.verdict(lab('infusion', INF, [])) === 'pass' && I.truth.verdict(lab('infusion', Object.assign({}, INF, { rateErr: 0.06 }), [])) === 'fail');
check('verdict: defib within tolerance passes', I.truth.verdict(lab('defib', DEF, [])) === 'pass');
check('verdict: defib outside the floor at low energy fails', I.truth.verdict(lab('defib', Object.assign({}, DEF, { deliveredErr: { '2': 3 } }), [])) === 'fail');
check('verdict: dmm, figures and choices have no computed verdict', I.truth.verdict(lab('dmm', DMM, [])) === null && I.truth.verdict(lab('choices', { text: 'x' }, [])) === null);

// ---------- measure ----------
check('measure: a dmm task resolves through compute', (() => { const m = I.measure(lab('dmm', DMM, []), { id: 'v', kind: 'reading', measure: { fn: 'vdc', a: 'A', b: 'B' } }); return m && near(m.value, 9, 0.011) && m.lsd === 0.01; })());
check('measure: a monitor task picks its parameter', (() => { const m = I.measure(lab('monitor', MON, []), { id: 'h', kind: 'reading', measure: { param: 'hr', set: { hr: 80, rhythm: 'nsr', spo2: 98, sys: 120, dia: 80 } } }); return m && m.value === 81 && m.lsd === 0; })());
check('measure: infusion volume, rate and error', (() => { const L = lab('infusion', INF, []); const v = I.measure(L, { measure: { what: 'volume', rate: 100, minutes: 30 } }); const rt = I.measure(L, { measure: { what: 'rate', rate: 100, minutes: 30 } }); const e = I.measure(L, { measure: { what: 'error', rate: 100, minutes: 30 } }); return v.value === 52 && near(rt.value, 104, 0.001) && near(e.value, 4, 0.001); })());
check('measure: a defib task', I.measure(lab('defib', DEF, []), { measure: { energy: 200 } }).value === 204);
check('measure: a figure task reads the figure value', I.measure(lab('figures', { figures: [{ kind: 'meter', min: 0, max: 10, value: 6.4, unit: 'V' }] }, []), { measure: { figure: 0 } }).value === 6.4);
check('measure: a task without measure is null', I.measure(lab('dmm', DMM, []), { id: 'x', kind: 'reading' }) === null);

// ---------- validate ----------
const good = lab('safety', SAFE, [
  { id: 'gnd', kind: 'reading', prompt: 'Ground', unit: 'ohm', expect: [0.08, 0.16], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } },
  { id: 'ch', kind: 'reading', prompt: 'Chassis worst case', unit: 'uA', expect: [200, 220], measure: { test: 'chassis', polarity: 'reverse', ground: 'open' } },
  { id: 'v', kind: 'verdict', prompt: 'Pass?', expect: 'pass' },
  { id: 'which', kind: 'choice', prompt: 'Which limit applies?', options: ['500 uA', '100 uA'], expect: 0 }
], { why: { gnd: 'w', ch: 'w', v: 'w', which: 'w' } });
check('validate: a sound lab has no problems', I.validate(good).length === 0, I.validate(good).join('; '));
check('validate: a reading range that cannot contain the truth is reported by task id', I.validate(lab('safety', SAFE, [{ id: 'gnd', kind: 'reading', prompt: 'G', unit: 'ohm', expect: [0.2, 0.3], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }], { why: { gnd: 'w' } })).some(p => /gnd/.test(p)));
check('validate: a range must leave room for jitter', I.validate(lab('safety', SAFE, [{ id: 'gnd', kind: 'reading', prompt: 'G', unit: 'ohm', expect: [0.12, 0.12], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }], { why: { gnd: 'w' } })).some(p => /gnd/.test(p)));
check('validate: a verdict that contradicts the scenario is reported', I.validate(lab('safety', SAFE, [{ id: 'v', kind: 'verdict', prompt: 'P', expect: 'fail' }], { why: { v: 'w' } })).some(p => /v\b/.test(p) && /verdict/.test(p)));
check('validate: an unknown instrument is reported', I.validate(lab('oscilloscope', {}, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { a: 'w' } })).some(p => /instrument/.test(p)));
check('validate: a task id with a colon is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a:b', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { 'a:b': 'w' } })).some(p => /id/.test(p)));
check('validate: a missing why is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: {} })).some(p => /why/.test(p)));
check('validate: a choice expect outside its options is reported', I.validate(lab('choices', { text: 't' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 2 }], { why: { a: 'w' } })).some(p => /expect/.test(p)));
check('validate: no tasks is reported', I.validate(lab('choices', { text: 't' }, [])).some(p => /tasks/.test(p)));

// ---------- figures ----------
let svg = I.figure({ kind: 'meter', min: 0, max: 10, value: 5, unit: 'V' });
check('figure: a meter carries its value and a mid-scale needle at 90 degrees', /data-kind="meter"/.test(svg) && /data-value="5"/.test(svg) && /data-angle="90.0"/.test(svg) && /<line/.test(svg), svg.slice(0, 120));
svg = I.figure({ kind: 'cylinder', ml: 100, value: 50, graduation: 1 });
check('figure: a cylinder half full reports level 50', /data-kind="cylinder"/.test(svg) && /data-level="50.0"/.test(svg));
svg = I.figure({ kind: 'strip', rate: 60, seconds: 6 });
check('figure: a 6-second strip at 60 bpm draws 6 beats', /data-kind="strip"/.test(svg) && /data-beats="6"/.test(svg) && /data-rate="60"/.test(svg), svg.match(/data-beats="\d+"/));
check('figure: 120 bpm draws 12 beats', /data-beats="12"/.test(I.figure({ kind: 'strip', rate: 120, seconds: 6 })));
check('figure: a flat strip draws no beats', /data-beats="0"/.test(I.figure({ kind: 'strip', rate: 0, seconds: 6, flat: true })));
check('figure: an unknown kind renders nothing', I.figure({ kind: 'nope' }) === '');

// ---------- current ----------
check('current: dmm and safety copy the readout value, never an invalid one', I.current(lab('dmm', DMM, []), { readout: { value: 9, invalid: false } }, {}) === 9 && I.current(lab('dmm', DMM, []), { readout: { value: null, invalid: true } }, {}) === null);
check('current: monitor picks the task parameter', I.current(lab('monitor', MON, []), { readout: { hr: 81, spo2: 97 } }, { measure: { param: 'spo2' } }) === 97);
check('current: infusion gives the volume only', I.current(lab('infusion', INF, []), { readout: { volume: 52 } }, { measure: { what: 'volume' } }) === 52 && I.current(lab('infusion', INF, []), { readout: { volume: 52 } }, { measure: { what: 'rate' } }) === null);
check('current: defib gives delivered energy', I.current(lab('defib', DEF, []), { readout: { delivered: 204 } }, {}) === 204);
check('current: no readout yet is null', I.current(lab('dmm', DMM, []), {}, {}) === null);

// ---------- panels that need no controls (jsdom) ----------
{
  const { JSDOM } = require('jsdom');
  const w = new JSDOM('<!doctype html><div id="x"></div>').window; const el = w.document.getElementById('x');
  I.render(el, lab('choices', { text: 'Reply from 10.0.0.1 <ok>' }, []), {}, {});
  check('render: choices shows its text escaped in a pre', !!el.querySelector('pre.ins-text') && el.querySelector('pre').textContent === 'Reply from 10.0.0.1 <ok>');
  I.render(el, lab('figures', { figures: [{ kind: 'meter', min: 0, max: 10, value: 3, unit: 'V', caption: 'Meter one' }, { kind: 'cylinder', ml: 100, value: 20 }] }, []), {}, {});
  check('render: figures draws every figure with its caption', el.querySelectorAll('svg.fig').length === 2 && /Meter one/.test(el.textContent));
  I.render(el, lab('nope', {}, []), {}, {});
  check('render: an unknown instrument says so instead of throwing', /Unknown instrument/.test(el.textContent));
}

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All instrument tests passed.');
process.exit(0);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tests/instruments.js`
Expected: `Error: Cannot find module '../engine/instruments.js'`.

- [ ] **Step 3: Write `engine/instruments.js` (core half)**

Create `engine/instruments.js`:

```js
'use strict';
// Virtual instruments for lab lessons (spec: docs/superpowers/specs/2026-10-12-bmet-academy-design.md,
// sections 3 and 4). Pure math and SVG up front, then the panels. No safety limit, tolerance, or
// reading lives here: every number comes from the lab's scenario. Loaded as a plain script (sets
// window.FRAInstruments) and as a CommonJS module for tests, the same way engine/merge.js is.
// engine/app.js reads window.FRAInstruments only when a lab card renders, never at boot.
(function (root, factory) {
  const api = factory();
  root.FRAInstruments = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;
  const NAMES = ['dmm', 'safety', 'monitor', 'infusion', 'defib', 'figures', 'choices'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = v => (typeof v === 'number' && isFinite(v)) ? v : Number(v) || 0;
  const obj = v => (v && typeof v === 'object') ? v : {};

  // ---------- deterministic jitter ----------
  // FNV-1a over seed|key, mapped to [-1, 1]. The same lab reads the same on every visit, and a
  // test can assert exact values, while two different readings on one panel still differ.
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function jitter(seed, key) { return ((hash(String(seed) + '|' + String(key)) % 2001) / 1000) - 1; }
  const decimals = lsd => lsd >= 1 ? 0 : Math.max(0, Math.round(-Math.log10(lsd)));
  const fix = (v, lsd) => Number(v.toFixed(decimals(lsd)));
  // A reading is the true value plus at most one least-significant digit of jitter when a seed is given.
  const reading = (value, lsd, seed, key) => fix(value + (seed == null ? 0 : jitter(seed, key) * lsd), lsd);
  const lsdFor = v => { const a = Math.abs(v); return a < 10 ? 0.01 : a < 1000 ? 0.1 : 1; };

  // ---------- compute ----------
  const compute = {};
  const pair = (a, b) => a + '-' + b;
  function lookup(table, a, b) {
    const t = obj(table);
    if (t[pair(a, b)] != null) return { v: t[pair(a, b)], sign: 1 };
    if (t[pair(b, a)] != null) return { v: t[pair(b, a)], sign: -1 };
    return null;
  }
  const OL = (fn, unit) => ({ fn, value: null, unit, text: 'OL', invalid: false, lsd: 0 });
  const INVALID = (fn, unit) => ({ fn, value: null, unit, text: 'INVALID: circuit powered', invalid: true, lsd: 0 });
  // c: { fn: vdc|vac|ohm|adc|cont|diode, a: red point, b: black point, power: bool }
  compute.dmm = function (scenario, c, seed) {
    const sc = obj(scenario); const fn = c.fn || 'vdc'; const power = c.power !== false; const key = fn + ':' + c.a + ':' + c.b;
    const signed = (table, unit, lsd) => {
      if (!power) return { fn, value: 0, unit, text: (0).toFixed(decimals(lsd)) + ' ' + unit, invalid: false, lsd };
      const hit = lookup(table, c.a, c.b); if (!hit) return OL(fn, unit);
      const l = lsd || lsdFor(hit.v); const value = reading(hit.sign * hit.v, l, seed, key);
      return { fn, value, unit, text: value.toFixed(decimals(l)) + ' ' + unit, invalid: false, lsd: l };
    };
    if (fn === 'vdc') return signed(sc.vdc, 'V', 0.01);
    if (fn === 'vac') return signed(sc.vac, 'V', 0.1);
    if (fn === 'adc') return signed(sc.adc, 'A', 0.001);
    if (power) return INVALID(fn, fn === 'ohm' ? 'ohm' : 'V');
    if (fn === 'ohm') { const hit = lookup(sc.ohm, c.a, c.b); if (!hit) return OL(fn, 'ohm'); const l = lsdFor(hit.v); const value = reading(hit.v, l, seed, key); return { fn, value, unit: 'ohm', text: value.toFixed(decimals(l)) + ' ohm', invalid: false, lsd: l }; }
    if (fn === 'cont') { const hit = lookup(sc.cont, c.a, c.b); return hit && hit.v ? { fn, value: 1, unit: '', text: 'Continuity', invalid: false, lsd: 0 } : OL(fn, ''); }
    if (fn === 'diode') { const t = obj(sc.diode); const v = t[pair(c.a, c.b)]; if (v == null) return OL(fn, 'V'); const value = reading(v, 0.01, seed, key); return { fn, value, unit: 'V', text: value.toFixed(2) + ' V', invalid: false, lsd: 0.01 }; }
    return OL(fn, '');
  };
  const condKey = c => (c.polarity === 'reverse' ? 'reverse' : 'normal') + (c.ground === 'open' ? '-open' : '');
  // c: { test: ground|chassis|lead, polarity: normal|reverse, ground: closed|open }
  compute.safety = function (scenario, c, seed) {
    const sc = obj(scenario); const limits = obj(sc.limits); const test = c.test || 'ground';
    if (test === 'ground') { const value = reading(num(sc.ground), 0.01, seed, 'ground'); return { test, value, unit: 'ohm', text: value.toFixed(2) + ' ohm', lsd: 0.01, limit: limits.ground }; }
    const table = obj(sc[test]); const k = condKey(c); const value = reading(num(table[k]), 1, seed, test + ':' + k);
    return { test, value, unit: 'uA', text: value + ' uA', lsd: 1, limit: limits[test] };
  };
  // c: { hr, rhythm: nsr|asystole|vfib, spo2, sys, dia }
  compute.monitor = function (scenario, c) {
    const sc = obj(scenario); const rhythm = c.rhythm || 'nsr';
    return {
      hr: rhythm === 'asystole' ? 0 : rhythm === 'vfib' ? null : Math.round(num(c.hr) + num(sc.hrErr)),
      spo2: Math.round(num(c.spo2) + num(sc.spo2Err)),
      sys: Math.round(num(c.sys) + num(sc.sysErr)),
      dia: Math.round(num(c.dia) + num(sc.diaErr)),
      alarm: rhythm === 'asystole' ? 'ASYSTOLE' : rhythm === 'vfib' ? 'VFIB' : null
    };
  };
  // c: { rate: mL/h set on the pump, minutes: collection time }
  compute.infusion = function (scenario, c) {
    const sc = obj(scenario); const cap = num(sc.cylinderMl) || 100; const g = num(sc.graduation) || 1;
    const trueRate = fix(num(c.rate) * (1 + num(sc.rateErr)), 0.001);
    const exact = Math.min(cap, trueRate * num(c.minutes) / 60);
    const volume = fix(Math.round(exact / g) * g, g);
    const rateFromVolume = num(c.minutes) > 0 ? volume / num(c.minutes) * 60 : 0;
    const errPct = num(c.rate) > 0 && num(c.minutes) > 0 ? (rateFromVolume - num(c.rate)) / num(c.rate) * 100 : 0;
    return { volume, exact, trueRate, rateFromVolume, errPct };
  };
  // c: { energy: joules selected }
  compute.defib = function (scenario, c) {
    const sc = obj(scenario); const e = num(c.energy); const err = num(obj(sc.deliveredErr)[String(e)]);
    return { energy: e, delivered: fix(e * (1 + err), 0.1), chargeSeconds: fix(1 + e / 120, 0.1) };
  };

  // ---------- truth: the verdict a scenario implies, from its own limits ----------
  const truth = {};
  truth.verdict = function (lab) {
    const sc = obj(lab && lab.scenario);
    switch (lab && lab.instrument) {
      case 'safety': {
        const lim = obj(sc.limits); const over = (table, limit) => limit != null && Object.keys(obj(table)).some(k => num(table[k]) > num(limit));
        if (lim.ground != null && num(sc.ground) > num(lim.ground)) return 'fail';
        return over(sc.chassis, lim.chassis) || over(sc.lead, lim.lead) ? 'fail' : 'pass';
      }
      case 'monitor': {
        const t = obj(sc.tolerance);
        return Math.abs(num(sc.hrErr)) <= num(t.hr) && Math.abs(num(sc.spo2Err)) <= num(t.spo2) && Math.abs(num(sc.sysErr)) <= num(t.nibp) && Math.abs(num(sc.diaErr)) <= num(t.nibp) ? 'pass' : 'fail';
      }
      case 'infusion': return Math.abs(num(sc.rateErr) * 100) <= num(sc.tolerance) ? 'pass' : 'fail';
      case 'defib': {
        const t = obj(sc.tolerance);
        return (sc.energies || []).every(e => { const d = compute.defib(sc, { energy: e }).delivered; return Math.abs(d - num(e)) <= Math.max(num(t.floor), num(t.pct) / 100 * num(e)); }) ? 'pass' : 'fail';
      }
      default: return null;
    }
  };

  // ---------- measure: what a reading task's `measure` resolves to ----------
  function measure(lab, task) {
    const m = task && task.measure; if (!lab || !m) return null;
    const sc = lab.scenario;
    switch (lab.instrument) {
      case 'dmm': { const r = compute.dmm(sc, Object.assign({ power: m.power !== false }, m), lab.id); return r.value == null ? { value: null, lsd: 0, text: r.text } : { value: r.value, lsd: r.lsd }; }
      case 'safety': { const r = compute.safety(sc, m, lab.id); return { value: r.value, lsd: r.lsd }; }
      case 'monitor': { const r = compute.monitor(sc, obj(m.set)); const v = r[m.param]; return { value: v == null ? null : v, lsd: 0 }; }
      case 'infusion': { const r = compute.infusion(sc, m); return { value: m.what === 'rate' ? r.rateFromVolume : m.what === 'error' ? r.errPct : r.volume, lsd: 0 }; }
      case 'defib': return { value: compute.defib(sc, m).delivered, lsd: 0 };
      case 'figures': { const f = (obj(sc).figures || [])[num(m.figure)]; return f ? { value: num(f.value), lsd: 0 } : null; }
      default: return null;
    }
  }

  // ---------- validate: every way a lab record can be wrong, as plain sentences ----------
  function validate(lab) {
    const out = []; const p = s => out.push(s);
    if (!lab || typeof lab !== 'object') return ['lab is not an object'];
    if (NAMES.indexOf(lab.instrument) < 0) p(`unknown instrument "${lab.instrument}"`);
    if (!lab.scenario || typeof lab.scenario !== 'object') p('scenario is missing');
    if (!Array.isArray(lab.tasks) || !lab.tasks.length) { p('no tasks'); return out; }
    const why = obj(lab.why); const seen = {};
    lab.tasks.forEach((t, i) => {
      const id = t && t.id; const tag = `task ${id || '#' + (i + 1)}`;
      if (!id || !/^[a-z0-9-]+$/.test(id)) p(`${tag}: id must match /^[a-z0-9-]+$/`);
      if (seen[id]) p(`${tag}: duplicate id`); seen[id] = true;
      if (!t.prompt) p(`${tag}: no prompt`);
      if (!why[id]) p(`${tag}: no why`);
      if (t.kind === 'reading') {
        if (!Array.isArray(t.expect) || t.expect.length !== 2 || !isFinite(t.expect[0]) || !isFinite(t.expect[1]) || t.expect[0] > t.expect[1]) p(`${tag}: expect must be [min, max]`);
        else if (t.measure && NAMES.indexOf(lab.instrument) >= 0) {
          const m = measure(lab, t);
          if (!m || m.value == null) p(`${tag}: measure gives no reading (${m && m.text ? m.text : 'unknown point or parameter'})`);
          else if (!(t.expect[0] <= m.value - m.lsd && t.expect[1] >= m.value + m.lsd)) p(`${tag}: expect [${t.expect[0]}, ${t.expect[1]}] does not contain the reading ${m.value} with jitter ${m.lsd}`);
        }
      } else if (t.kind === 'verdict') {
        if (t.expect !== 'pass' && t.expect !== 'fail') p(`${tag}: verdict expect must be "pass" or "fail"`);
        else { const v = truth.verdict(lab); if (v && v !== t.expect) p(`${tag}: verdict expect "${t.expect}" but the scenario's limits say "${v}"`); }
      } else if (t.kind === 'choice') {
        if (!Array.isArray(t.options) || t.options.length < 2) p(`${tag}: choice needs at least two options`);
        else if (!Number.isInteger(t.expect) || t.expect < 0 || t.expect >= t.options.length) p(`${tag}: expect must index an option`);
      } else p(`${tag}: kind must be reading, verdict, or choice`);
    });
    return out;
  }

  // ---------- current: the panel's displayed value for a task (the Record button) ----------
  function current(lab, ui, task) {
    const r = ui && ui.readout; const m = obj(task && task.measure); if (!r) return null;
    switch (lab && lab.instrument) {
      case 'dmm': case 'safety': return r.invalid || r.value == null ? null : r.value;
      case 'monitor': return m.param && r[m.param] != null ? r[m.param] : null;
      case 'infusion': return m.what === 'volume' && r.volume != null ? r.volume : null;
      case 'defib': return r.delivered == null ? null : r.delivered;
      default: return null;
    }
  }

  // ---------- figures: SVG a reading can be taken from ----------
  function figure(f) {
    f = obj(f);
    if (f.kind === 'meter') {
      const min = num(f.min), max = num(f.max) || 1, v = num(f.value); const frac = Math.max(0, Math.min(1, (v - min) / (max - min)));
      const ang = 180 - 180 * frac; const cx = 110, cy = 110, r = 90; const rad = ang * Math.PI / 180;
      const nx = cx + r * Math.cos(rad), ny = cy - r * Math.sin(rad); let ticks = '';
      for (let i = 0; i <= 10; i++) {
        const a = (180 - 18 * i) * Math.PI / 180; const inner = i % 5 ? r - 6 : r - 10;
        ticks += `<line x1="${(cx + inner * Math.cos(a)).toFixed(1)}" y1="${(cy - inner * Math.sin(a)).toFixed(1)}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy - r * Math.sin(a)).toFixed(1)}" stroke="currentColor" stroke-width="${i % 5 ? 1 : 2}"/>`;
        if (i % 5 === 0) ticks += `<text x="${(cx + (r - 22) * Math.cos(a)).toFixed(1)}" y="${(cy - (r - 22) * Math.sin(a) + 4).toFixed(1)}" font-size="10" text-anchor="middle" fill="currentColor">${min + (max - min) * i / 10}</text>`;
      }
      return `<svg class="fig meter" viewBox="0 0 220 125" width="220" height="125" role="img" aria-label="${esc(f.label || 'analog meter')}" data-kind="meter" data-value="${v}" data-angle="${ang.toFixed(1)}"><path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="currentColor" stroke-width="2"/>${ticks}<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#C8322B" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/><text x="${cx}" y="${cy + 13}" font-size="11" text-anchor="middle" fill="currentColor">${esc(f.unit || '')}</text></svg>`;
    }
    if (f.kind === 'cylinder') {
      const ml = num(f.ml) || 100; const v = Math.max(0, Math.min(ml, num(f.value))); const level = 100 * v / ml;
      const top = 20, bottom = 200, w = 70, x = 30; const h = bottom - top; const liquidTop = bottom - h * v / ml; let ticks = '';
      for (let i = 0; i <= 10; i++) { const y = bottom - h * i / 10; ticks += `<line x1="${x}" y1="${y}" x2="${x + 14}" y2="${y}" stroke="currentColor" stroke-width="1.5"/><text x="${x + 18}" y="${y + 4}" font-size="9" fill="currentColor">${ml * i / 10}</text>`; }
      return `<svg class="fig cylinder" viewBox="0 0 130 220" width="130" height="220" role="img" aria-label="${esc(f.label || 'graduated cylinder')}" data-kind="cylinder" data-value="${v}" data-level="${level.toFixed(1)}"><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="2" rx="3"/><rect x="${x + 2}" y="${liquidTop.toFixed(1)}" width="${w - 4}" height="${(bottom - liquidTop).toFixed(1)}" fill="#7fb3ff" opacity="0.7"/>${ticks}</svg>`;
    }
    if (f.kind === 'strip') {
      const rate = num(f.rate), seconds = num(f.seconds) || 6; const px = 100; const W = seconds * px, H = 120, base = 80; let grid = '';
      for (let xg = 0; xg <= W; xg += 4) grid += `<line x1="${xg}" y1="0" x2="${xg}" y2="${H}" stroke="#f0a0a0" stroke-width="${xg % 20 ? 0.3 : 0.8}"/>`;
      for (let yg = 0; yg <= H; yg += 4) grid += `<line x1="0" y1="${yg}" x2="${W}" y2="${yg}" stroke="#f0a0a0" stroke-width="${yg % 20 ? 0.3 : 0.8}"/>`;
      let d = `M0 ${base}`; let beats = 0;
      if (f.flat || rate <= 0 && !f.chaotic) d += ` L${W} ${base}`;
      else if (f.chaotic) { for (let xg = 0; xg <= W; xg += 3) d += ` L${xg} ${(base + 25 * Math.sin(xg / 7) * Math.cos(xg / 11) + 10 * Math.sin(xg / 3)).toFixed(1)}`; }
      else {
        const period = 60 / rate * px;
        for (let x0 = 20; x0 < W; x0 += period) { beats++; d += ` L${(x0 - 14).toFixed(1)} ${base} Q${(x0 - 10).toFixed(1)} ${base - 6} ${(x0 - 6).toFixed(1)} ${base} L${(x0 - 2).toFixed(1)} ${base + 4} L${x0.toFixed(1)} ${base - 50} L${(x0 + 2).toFixed(1)} ${base + 8} L${(x0 + 4).toFixed(1)} ${base} L${(x0 + 10).toFixed(1)} ${base} Q${(x0 + 16).toFixed(1)} ${base - 12} ${(x0 + 22).toFixed(1)} ${base}`; }
        d += ` L${W} ${base}`;
      }
      return `<svg class="fig strip" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(f.label || 'ECG strip')}" data-kind="strip" data-rate="${rate}" data-beats="${beats}" data-seconds="${seconds}">${grid}<path d="${d}" fill="none" stroke="#14212E" stroke-width="1.5"/></svg>`;
    }
    return '';
  }

  // ---------- panels ----------
  // render(el, lab, ui, api): draws the instrument into el and wires its controls. ui is a plain
  // object the app keeps per lab for the page's lifetime, so control positions survive the app's
  // re-renders; ui.readout is the last measurement shown, which the task sheet copies through
  // current(). Buttons use data-ins (never data-act, which belongs to the app). api.toast is optional.
  const PANEL = {}; const HANDLE = {};
  PANEL.figures = lab => `<div class="ins figures">${(obj(lab.scenario).figures || []).map((f, i) => `<figure class="ins-fig"><div class="ins-fig-n">Figure ${i + 1}</div>${figure(f)}${f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  HANDLE.figures = () => false;
  PANEL.choices = lab => `<pre class="ins-text">${esc(obj(lab.scenario).text || '')}</pre>`;
  HANDLE.choices = () => false;

  function render(el, lab, ui, api) {
    const draw = lab && PANEL[lab.instrument];
    if (!draw) { el.innerHTML = '<p class="muted">Unknown instrument.</p>'; return; }
    ui = ui || {}; api = api || {};
    const paint = () => { el.innerHTML = draw(lab, ui); };
    el.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('[data-ins]'); if (!b || !el.contains(b)) return;
      const h = HANDLE[lab.instrument]; if (h && h(lab, ui, b.dataset.ins, b.dataset.arg, api)) paint();
    });
    el.addEventListener('change', e => {
      const f = e.target.closest && e.target.closest('[data-field]'); if (!f || !el.contains(f)) return;
      ui[f.dataset.field] = f.type === 'checkbox' ? f.checked : f.type === 'number' ? Number(f.value) : f.value;
      const h = HANDLE[lab.instrument]; if (h && h(lab, ui, 'field', f.dataset.field, api)) paint();
    });
    paint();
  }

  return { VERSION, NAMES, jitter, figure, compute, truth, measure, validate, current, render, PANEL, HANDLE };
}));
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node tests/instruments.js`
Expected: every line `PASS`, then `All instrument tests passed.`

- [ ] **Step 5: Register the file in all eight loaders**

`build.py`, in `build()`, the `scripts` concatenation: after the line `               + read(os.path.join(ENGINE, "sync.js")) + "\n"` add:

```python
               + read(os.path.join(ENGINE, "instruments.js")) + "\n"
```

`tests/lib.js`, after `  w.eval(fs.readFileSync(path.join(o.engineDir, 'sync.js'), 'utf8'));` add:

```js
  w.eval(fs.readFileSync(path.join(o.engineDir, 'instruments.js'), 'utf8'));
```

In each of `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`, after the line `  <script src="../engine/sync.js"></script>` add:

```html
  <script src="../engine/instruments.js"></script>
```

`tests/loaders.js`: change `const BEFORE_APP = ['merge.js', 'strength.js', 'auth.js', 'sync.js'];` to:

```js
const BEFORE_APP = ['merge.js', 'strength.js', 'auth.js', 'sync.js', 'instruments.js'];
```

`package.json`: in the `test` script, insert `node tests/instruments.js && ` immediately before `node tests/engine.js && `.

- [ ] **Step 6: Run the loader audit and the whole suite**

Run: `node tests/loaders.js`
Expected: `PASS` for `loads engine/instruments.js` and `... before engine/app.js` on all seven loaders, then `loaders: all OK`.

Run: `npm test`
Expected: all suites pass.

Run: `python build.py cbet && grep -c "FRAInstruments" dist/cbet.html`
Expected: the bundle builds and the count is at least `1`.

- [ ] **Step 7: Commit**

```bash
git add engine/instruments.js tests/instruments.js build.py tests/lib.js tests/loaders.js package.json netplus/index.html secplus/index.html cbet/index.html aplus1/index.html aplus2/index.html
git commit -m "feat(engine): instruments module: deterministic readings, figures, lab validation; registered in all loaders

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---
### Task 3: Lab lessons in the app: the lab card, lab state, merge, and the mini lab

A lesson with `lab: "<id>"` renders the lab card between its Remember hook and its deeper explanation. The card checks tasks, stores progress in `S.labs`, and marks the lab done. The checkpoint still decides whether the lesson is passed.

**Files:**
- Create: `tests/fixtures/mini/labs.js`
- Modify: `tests/fixtures/mini/curriculum.js` (one lesson gets a lab)
- Modify: `engine/app.js` (data index, state, lesson view, home, rail, course page, actions, keydown, self-test)
- Modify: `engine/merge.js` (`mergeMaps`, `mergeState`)
- Modify: `engine/styles.css`
- Test: `tests/engine.js`, `tests/merge.js`

**Interfaces:**
- Consumes: `window.FRAInstruments.validate / current / render` from Task 2 (read at render time only).
- Produces in `app.js`: `LABS` (the `FRA.labs` map), `labIds` (lab ids in lesson order), `labStat(id)`, `labDone(id)`, `labsDoneCount()`, `checkLab(lab, task, value)`, `labCard(lesson)`, `mountInstrument()`; actions `lab-use`, `lab-check`, `lab-answer`, `lab-redo`. State: `S.labs[id] = { done, at, values: { taskId: value }, ok: { taskId: bool } }`.
- Produces in `merge.js`: `mergeMaps(...).labs`, `mergeState(...).labs`.

- [ ] **Step 1: Add a lab to the mini fixture**

Create `tests/fixtures/mini/labs.js`:

```js
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
// One lab on a FREE lesson (u1l2), on the instrument that needs no controls, so the lab card,
// its state, the merge, and the static-page note are all testable without the BMET pack.
FRA.labs["mini-ping"] = {
  id: "mini-ping", lesson: "u1l2", title: "Read a ping", instrument: "choices",
  intro: "Read the output below, then answer the tasks.",
  scenario: { text: "Reply from 10.0.0.1: bytes=32 time=1ms TTL=64\nRequest timed out.\nPackets: Sent = 2, Received = 1, Lost = 1 (50% loss)" },
  tasks: [
    { id: "who", kind: "choice", prompt: "Which address replied?", options: ["10.0.0.1", "10.0.0.2"], expect: 0 },
    { id: "loss", kind: "reading", prompt: "Packet loss, in percent", unit: "%", expect: [50, 50] },
    { id: "ok", kind: "verdict", prompt: "Is this link healthy?", expect: "fail" }
  ],
  why: { who: "The reply line names 10.0.0.1.", loss: "Lost = 1 of 2 sent is 50%.", ok: "Half the packets are lost; that is a fault, not a healthy link." }
};
```

In `tests/fixtures/mini/curriculum.js`, change `mkLesson("u1l2", "A Two", 1)` to `mkLesson("u1l2", "A Two", 1, { lab: "mini-ping" })`.

- [ ] **Step 2: Write the failing tests**

In `tests/merge.js`, right after the block that ends with `check('ratings recency-based: later ts with lower r wins', ...)` (the line `  JSON.stringify(m.ratings.a));`), add:

```js
m = M.mergeMaps(st({ labs: { 'l1': { done: true, at: 10, values: { a: 1 }, ok: { a: true } } } }), st({ labs: { 'l1': { done: false, at: 99, values: {}, ok: {} }, 'l2': { done: true, at: 5, values: {}, ok: {} } } }));
check('labs take the entry with the later at, and pass through one-sided entries', m.labs.l1.done === false && m.labs.l1.at === 99 && m.labs.l2.done === true, JSON.stringify(m.labs));
m = M.mergeMaps(st({}), st({}));
check('labs merge to an empty map when neither side has any', JSON.stringify(m.labs) === '{}');
```

Then, immediately before the final `if (fails.length) { console.error(...` line of `tests/merge.js`, add:

```js
{
  const A = { v: 3, course: 'mini', lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {}, exams: [], feedback: [], labs: { x: { done: true, at: 7, values: {}, ok: {} } }, settings: {}, settingsAt: 0, touchedAt: 1, created: 1 };
  const B = { v: 3, course: 'mini', lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {}, exams: [], feedback: [], settings: {}, settingsAt: 0, touchedAt: 2, created: 1 };
  const out = M.mergeState(A, B, OPTS);
  check('mergeState carries labs through', out.labs && out.labs.x && out.labs.x.done === true, JSON.stringify(out.labs));
  const out2 = M.mergeState(B, A, OPTS);
  check('mergeState labs is order-independent', JSON.stringify(out2.labs) === JSON.stringify(out.labs));
}
```

In `tests/engine.js`, insert this block immediately before the `  if (fails.length) { console.error(\`engine: ...` line (after the untested-domains block from Task 1):

```js
  // ----- Labs (mini fixture: u1l2 carries the "mini-ping" lab on the choices instrument) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini }); const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    // Home shows the welcome page until the starter test is taken, so take it first (all right).
    w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
    st().active.items.map(fat).forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'lesson', 'u1l2');
    const card = w.$('#lab');
    check('lab card renders on its lesson, after the hook and before the deeper explanation', !!card && !!w.$('.hook') && (w.$('.hook').compareDocumentPosition(card) & w.Node.DOCUMENT_POSITION_FOLLOWING) !== 0 && (card.compareDocumentPosition(w.$('.deep-cta')) & w.Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
    check('lab card shows the title, the intro, three tasks, and the task count', /Read a ping/.test(card.textContent) && /Read the output below/.test(card.textContent) && w.$$('.lab-task').length === 3 && /0 of 3 tasks/.test(card.textContent), card.textContent.slice(0, 120));
    check('the choices panel shows the scenario text', !!w.$('#instrument pre') && /10\.0\.0\.1/.test(w.$('#instrument pre').textContent));
    check('rail marks the lab lesson', !!w.$('.rail .lab-pill'));
    act(w, 'lesson', 'u1l1');
    check('a lesson without a lab has no lab card', !w.$('#lab'));
    act(w, 'lesson', 'u1l2');
    w.click(w.$('[data-act="lab-answer"][data-arg="who:1"]'));
    check('a wrong choice shows the why and stays open', !!w.$('.lab-task[data-task="who"] .feedback.bad') && /names 10\.0\.0\.1/.test(w.$('.lab-task[data-task="who"]').textContent) && st().labs['mini-ping'].ok.who === false);
    w.click(w.$('[data-act="lab-answer"][data-arg="who:0"]'));
    check('a right choice is marked correct', !!w.$('.lab-task[data-task="who"] .feedback.good') && st().labs['mini-ping'].ok.who === true && w.$('[data-act="lab-answer"][data-arg="who:0"]').disabled);
    w.$('#lab-loss').value = '40'; w.click(w.$('[data-act="lab-check"][data-arg="loss"]'));
    check('a reading outside the range is wrong, with its why', !!w.$('.lab-task[data-task="loss"] .feedback.bad') && /50%/.test(w.$('.lab-task[data-task="loss"]').textContent));
    w.$('#lab-loss').value = '50'; w.click(w.$('[data-act="lab-check"][data-arg="loss"]'));
    check('a reading inside the range is right and stored as a number', !!w.$('.lab-task[data-task="loss"] .feedback.good') && st().labs['mini-ping'].values.loss === 50);
    check('the task count updates', /2 of 3 tasks/.test(w.$('#lab').textContent));
    w.click(w.$('[data-act="lab-answer"][data-arg="ok:pass"]'));
    check('a wrong verdict is wrong', !!w.$('.lab-task[data-task="ok"] .feedback.bad'));
    w.click(w.$('[data-act="lab-answer"][data-arg="ok:fail"]'));
    const lab = st().labs['mini-ping'];
    check('the last right answer marks the lab done with a timestamp', lab.done === true && lab.at > 0 && /LAB DONE/.test(w.$('#lab').textContent));
    check('a Redo button appears once done', !!w.$('[data-act="lab-redo"]'));
    act(w, 'go', 'home');
    check('home shows Labs done 1 of 1', /Labs done/.test(w.text()) && /1\s*\/ 1/.test(w.$$('.stat').map(e => e.textContent).join(' ')), w.$$('.stat').map(e => e.textContent).join(' | '));
    act(w, 'lesson', 'u1l2'); w.click(w.$('[data-act="lab-redo"]'));
    check('Redo clears the lab', st().labs['mini-ping'].done === false && /0 of 3 tasks/.test(w.$('#lab').textContent));
    w.close();
  }
  // ----- A missing instruments module degrades to a note, never a blank page -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini, beforeAppJs: x => { delete x.FRAInstruments; } });
    act(w, 'lesson', 'u1l2');
    check('without the module the lab card says the lab is unavailable', !!w.$('#lab') && /This lab is unavailable/.test(w.$('#instrument').textContent) && w.$$('.lab-task').length === 3);
    w.close();
  }
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node tests/merge.js; node tests/engine.js`
Expected: merge prints `FAIL` for the labs checks (`m.labs` undefined); engine prints `FAIL` for `lab card renders ...` (no `#lab`).

- [ ] **Step 4: Merge `labs`**

In `engine/merge.js`, `mergeMaps` returns five maps. Add `labs` so it reads:

```js
  function mergeMaps(a, b) {
    return {
      lessons: mergeBy(a.lessons, b.lessons, mergeLesson),
      topics: mergeBy(a.topics, b.topics, (x, y) => laterOf(x, y, 'last')),
      qstats: mergeBy(a.qstats, b.qstats, mergeQstat),
      seen: Object.assign({}, a.seen || {}, b.seen || {}),
      ratings: mergeBy(a.ratings, b.ratings, (x, y) => laterOf(x, y, 'ts')),
      // Lab progress: the newer entry per lab wins whole, so a Redo on one device (done: false,
      // newer at) is not undone by an older done: true from the other.
      labs: mergeBy(a.labs, b.labs, (x, y) => laterOf(x, y, 'at'))
    };
  }
```

In `mergeState`'s returned object, change the line `      seen: maps.seen, ratings: maps.ratings,` to:

```js
      seen: maps.seen, ratings: maps.ratings, labs: maps.labs,
```

- [ ] **Step 5: Data index and state in `engine/app.js`**

After the line `  const gens = FRA.generators || {};` add:

```js
  // Labs (FRA.labs; spec section 3). A lesson names its lab with `lab: "<id>"` and the lab points
  // back with `lesson`. Instruments are drawn by engine/instruments.js, read at render time only,
  // so a missing file degrades to a note inside the lab card instead of a blank page.
  const LABS = FRA.labs || {};
  const labIds = lessons.filter(l => l.lab).map(l => l.lab);
  lessons.forEach(l => {
    if (!l.lab) return;
    if (!LABS[l.lab]) throw new Error(`lesson ${l.id} names unknown lab ${l.lab}`);
    if (LABS[l.lab].lesson !== l.id) throw new Error(`lab ${l.lab} belongs to ${LABS[l.lab].lesson}, not ${l.id}`);
  });
  Object.keys(LABS).forEach(id => {
    const lab = LABS[id];
    if (lab.id !== id) throw new Error(`lab ${id} carries id ${lab.id}`);
    if (!L[lab.lesson] || L[lab.lesson].lab !== id) throw new Error(`lab ${id} is not referenced by its lesson ${lab.lesson}`);
    if (!Array.isArray(lab.tasks) || !lab.tasks.length) throw new Error(`lab ${id} has no tasks`);
  });
```

In `fresh()`, change `ratings: {}, seen: {},` to `ratings: {}, seen: {}, labs: {},`.

After the line that defines `qstat` (`  const qstat = id => S.qstats[id] || ...`) add:

```js
  // Lab progress: values typed or recorded per task, which are right so far, and done once all are.
  const labStat = id => S.labs[id] || (S.labs[id] = { done: false, at: 0, values: {}, ok: {} });
  const labDone = id => !!(S.labs[id] && S.labs[id].done);
  const labsDoneCount = () => labIds.filter(labDone).length;
  const labOfView = () => { const l = S.view.name === 'lesson' ? L[S.view.arg] : null; return l && l.lab ? LABS[l.lab] : null; };
  function checkLab(lab, t, value) {
    let ok;
    if (t.kind === 'reading') { const n = Number(value); ok = Number.isFinite(n) && n >= t.expect[0] && n <= t.expect[1]; if (Number.isFinite(n)) value = n; }
    else if (t.kind === 'verdict') ok = value === t.expect;
    else ok = Number(value) === Number(t.expect);
    const ls = labStat(lab.id); ls.values[t.id] = value; ls.ok[t.id] = ok; ls.at = Date.now();
    if (!ls.done && lab.tasks.every(x => ls.ok[x.id] === true)) { ls.done = true; save(); if (window.FRASync) FRASync.pushNow(); toast('Lab done'); }
    else save();
    return ok;
  }
```

- [ ] **Step 6: The lab card, Home stat, rail mark, and unit page note**

In `viewLesson`, change the line:

```js
      <div class="hook"><span class="eyebrow">Remember</span><div>${inline(l.hook)}</div></div>
      ${deepSection(id)}
```

to:

```js
      <div class="hook"><span class="eyebrow">Remember</span><div>${inline(l.hook)}</div></div>
      ${l.lab ? labCard(l) : ''}
      ${deepSection(id)}
```

After the `ratingRow` function (the line `  function ratingRow(id) { ... }` and its closing), add:

```js
  // The lab card: intro, kit, manual excerpt, the instrument panel (mounted after paint), and
  // the task sheet. Done when every task is right; a Redo clears it.
  let instUiMap = {}; const instUi = id => instUiMap[id] || (instUiMap[id] = {});
  function labCard(l) {
    const lab = LABS[l.lab]; const ls = labStat(lab.id); const n = lab.tasks.length;
    const okN = lab.tasks.filter(t => ls.ok[t.id] === true).length; const done = !!ls.done;
    const kit = Array.isArray(lab.kit) && lab.kit.length ? `<div class="lab-kit"><div class="eyebrow">Kit</div><ul>${lab.kit.map(k => `<li>${inline(k)}</li>`).join('')}</ul></div>` : '';
    const manual = lab.manual ? `<div class="callout accent lab-manual"><div class="eyebrow">From the service manual</div><div class="lesson-body">${renderBody(lab.manual)}</div></div>` : '';
    return `<section class="card lift stack lab ${done ? 'done' : ''}" id="lab">
      <div class="row spread"><div><div class="eyebrow">Lab · ${kit ? 'your kit or the virtual instrument' : 'virtual instrument'}</div><h3>${esc(lab.title)}</h3></div>${done ? '<span class="pill good">LAB DONE</span>' : `<span class="pill">${okN} of ${n} tasks</span>`}</div>
      <div class="lesson-body">${renderBody(lab.intro || '')}</div>
      ${kit}${manual}
      <div class="instrument" id="instrument" data-lab="${esc(lab.id)}"></div>
      <div class="lab-tasks stack">${lab.tasks.map((t, i) => labTask(lab, t, i, ls)).join('')}</div>
      ${done ? `<div class="row"><button class="btn ghost small" data-act="lab-redo" data-arg="${esc(lab.id)}">Redo this lab</button></div>` : ''}
    </section>`;
  }
  function labTask(lab, t, i, ls) {
    const ok = ls.ok[t.id]; const v = ls.values[t.id]; const why = lab.why && lab.why[t.id];
    const dis = ok === true ? 'disabled' : '';
    const result = ok === true ? `<div class="feedback good"><div class="verdict">Correct</div></div>` : ok === false ? `<div class="feedback bad"><div class="verdict">Not right yet.</div><div>${esc(why || '')}</div></div>` : '';
    let input;
    if (t.kind === 'reading') input = `<div class="row" style="gap:8px;flex-wrap:wrap"><input type="number" step="any" class="lab-in" id="lab-${esc(t.id)}" data-task="${esc(t.id)}" value="${v != null ? esc(v) : ''}" ${dis}><span class="muted">${esc(t.unit || '')}</span>${t.measure ? `<button class="btn small ghost" data-act="lab-use" data-arg="${esc(t.id)}" ${dis}>Record the reading</button>` : ''}<button class="btn small primary" data-act="lab-check" data-arg="${esc(t.id)}" ${dis}>Check</button></div>`;
    else if (t.kind === 'verdict') input = `<div class="row" style="gap:8px">${['pass', 'fail'].map(o => `<button class="chip" data-act="lab-answer" data-arg="${esc(t.id)}:${o}" aria-pressed="${v === o}" ${dis}>${o === 'pass' ? 'Pass' : 'Fail'}</button>`).join('')}</div>`;
    else input = `<div class="options">${(t.options || []).map((o, k) => `<button class="option" data-act="lab-answer" data-arg="${esc(t.id)}:${k}" aria-pressed="${v === k}" ${dis}><span class="key">${letters[k] || k + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    return `<div class="lab-task ${ok === true ? 'ok' : ''}" data-task="${esc(t.id)}"><div class="q-stem"><span class="muted tnum">${i + 1}.</span> ${inline(t.prompt)}</div>${input}${result}</div>`;
  }
  // Mount the instrument panel into the lab card after each paint. The module is optional.
  function mountInstrument() {
    const el = $('#instrument'); if (!el) return;
    const lab = LABS[el.dataset.lab]; const ins = window.FRAInstruments;
    if (!lab || !ins || typeof ins.render !== 'function') { el.innerHTML = '<p class="muted">This lab is unavailable: the instrument module did not load. The tasks below still work with your own kit.</p>'; return; }
    try { ins.render(el, lab, instUi(lab.id), { toast }); } catch (err) { el.innerHTML = '<p class="muted">This lab is unavailable.</p>'; }
  }
```

In `paint()`, after the statement that assigns `app.innerHTML = \`...\`` (it ends with `</div>${fbModal()}${acrModal()}\`;`) and before `    if (v.name === 'exam' && S.active ...`, add:

```js
    mountInstrument();
```

In `viewHome`, after the `Lessons passed` stat line (`        <div class="stat"><div class="eyebrow">Lessons passed</div>...`), add:

```js
        ${labIds.length ? `<div class="stat"><div class="eyebrow">Labs done</div><div class="big">${labsDoneCount()}<small> / ${labIds.length}</small></div></div>` : ''}
```

In `viewRail`, inside the lesson link, change `<span style="flex:1">${esc(l.title)}</span>` to:

```js
<span style="flex:1">${esc(l.title)}${l.lab ? `<span class="pill lab-pill ${labDone(l.lab) ? 'good' : ''}" title="${labDone(l.lab) ? 'Lab done' : 'Has a lab'}">lab</span>` : ''}</span>
```

In `viewCourse` (the unit page), change `${l.minutes} min read${lstat(l.id).best ? ...` so the muted line notes a lab: replace `Objective ${l.obj} · ${l.minutes} min read` with `Objective ${l.obj} · ${l.minutes} min read${l.lab ? ' · lab' : ''}`.

- [ ] **Step 7: Actions and the Enter key**

In the `app.addEventListener('click', ...)` switch, before `      case 'sign-in': {`, add:

```js
      case 'lab-use': { const lab = labOfView(); const t = lab && lab.tasks.find(x => x.id === arg); const ins = window.FRAInstruments; if (!t || !ins) return;
        const v = ins.current(lab, instUi(lab.id), t); if (v == null) { toast('Take the reading on the instrument first.'); return; }
        const el = $(`#lab-${t.id}`); if (el) el.value = String(v); return; }
      case 'lab-check': { const lab = labOfView(); const t = lab && lab.tasks.find(x => x.id === arg); if (!t) return;
        const el = $(`#lab-${t.id}`); const raw = el ? String(el.value).trim() : ''; if (!raw) { toast('Type the reading first.'); return; }
        checkLab(lab, t, raw); render(); return; }
      case 'lab-answer': { const i = String(arg).indexOf(':'); const tid = String(arg).slice(0, i), val = String(arg).slice(i + 1); const lab = labOfView(); const t = lab && lab.tasks.find(x => x.id === tid); if (!t) return;
        checkLab(lab, t, t.kind === 'verdict' ? val : parseInt(val, 10)); render(); return; }
      case 'lab-redo': { const lab = LABS[arg]; if (!lab) return; S.labs[lab.id] = { done: false, at: Date.now(), values: {}, ok: {} }; save(); render(); return; }
```

In the `document.addEventListener('keydown', ...)` handler, before the line `    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;`, add:

```js
    if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('lab-in')) { e.preventDefault(); const b = $(`[data-act="lab-check"][data-arg="${e.target.dataset.task}"]`); if (b && !b.disabled) b.click(); return; }
```

- [ ] **Step 8: Styles**

Append to `engine/styles.css`:

```css
/* Labs (engine/app.js labCard) and virtual instruments (engine/instruments.js) */
.lab .lab-kit ul { margin: 0; padding-left: 20px; }
.lab-task { border-top: 1px solid var(--line); padding-top: 12px; }
.lab-task.ok { opacity: 0.85; }
.lab-task .lab-in { width: 150px; padding: 8px 10px; border: 1.5px solid var(--line); border-radius: 8px; font: inherit; background: var(--surface); color: var(--ink); }
.lab-pill { margin-left: 6px; padding: 1px 7px; }
.ins { display: grid; gap: 14px; }
.ins-two { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.ins-panel { background: var(--surface-2); border-radius: var(--radius); padding: 14px 16px; display: grid; gap: 10px; align-content: start; }
.ins-screen { background: #0e1a14; color: #d8ffe6; }
.ins-screen .eyebrow, .ins-screen .muted { color: #8fd9a8; }
.ins-readout { font-family: var(--font-mono); font-size: 1.4rem; font-weight: 500; letter-spacing: 0.02em; background: #0e1a14; color: #d8ffe6; border-radius: 8px; padding: 10px 14px; min-height: 48px; }
.ins-readout.bad { color: #ff9b8f; }
.ins-dial { display: flex; gap: 6px; flex-wrap: wrap; }
.ins-drawing { position: relative; display: inline-block; max-width: 100%; }
.ins-drawing svg { display: block; max-width: 100%; height: auto; }
.tp { position: absolute; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--ink); background: var(--surface); color: var(--ink); font: 600 0.7rem var(--font-display); cursor: pointer; padding: 0; }
.tp.red { background: #C8322B; color: #fff; border-color: #C8322B; }
.tp.black { background: #14212E; color: #fff; border-color: #14212E; }
.ins-alarm { background: #C8322B; color: #fff; font-weight: 700; padding: 6px 10px; border-radius: 6px; letter-spacing: 0.08em; }
.ins-numerics { display: flex; gap: 18px; flex-wrap: wrap; }
.ins-numerics b { font-family: var(--font-display); font-size: 1.8rem; display: block; }
.ins-limits td, .ins-limits th { padding: 4px 8px; }
.ins-fig { margin: 0; }
.ins-fig-n { font-size: 0.8rem; color: var(--muted); }
.ins-text { background: #0e1a14; color: #d8ffe6; padding: 12px 14px; border-radius: 8px; overflow-x: auto; margin: 0; }
.fig.strip { max-width: 100%; height: auto; background: #fff7f7; border-radius: 6px; }
```

- [ ] **Step 9: Self-test coverage for every pack's labs**

In `runSelfTest`, before the comment `    // The final gate: enough passes among the last few tests qualify the learner, ...`, add:

```js
    // Labs: every lab validates against its instrument (ranges contain the truth, verdicts match
    // the scenario's limits), the card renders, and finishing every task marks the lab done.
    if (labIds.length) {
      const ins = window.FRAInstruments; if (!ins) throw new Error('this pack has labs but engine/instruments.js is not loaded');
      const problems = labIds.reduce((all, id) => all.concat(ins.validate(LABS[id]).map(p => id + ': ' + p)), []);
      if (problems.length) throw new Error('lab problems: ' + problems.join('; '));
      const lab = LABS[labIds[0]]; go('lesson', lab.lesson); if (!$('#lab') || !$('#instrument')) throw new Error('lab card did not render');
      lab.tasks.forEach(t => checkLab(lab, t, t.kind === 'reading' ? (t.expect[0] + t.expect[1]) / 2 : t.expect));
      if (!labDone(lab.id) || labsDoneCount() < 1) throw new Error('completing every task did not mark the lab done');
      S.labs[lab.id] = { done: false, at: Date.now(), values: {}, ok: {} };
      log.push(`labs ${labIds.length} validated; ${lab.id} completes and clears`);
    } else log.push('labs: none in this pack');
```

- [ ] **Step 10: Run the tests**

Run: `node tests/merge.js && node tests/engine.js && node tests/selftest.js && node tests/site.js`
Expected: every new check `PASS`; selftest shows `labs 1 validated; mini-ping completes and clears` for mini and `labs: none in this pack` for the five packs; site parity still passes.

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 11: Commit**

```bash
git add engine/app.js engine/merge.js engine/styles.css tests/engine.js tests/merge.js tests/fixtures/mini
git commit -m "feat(engine): lab lessons: the lab card, task checks, lab state merged by newer at, mini lab fixture

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---
### Task 4: The five instrument panels

Interactive panels for `dmm`, `safety`, `monitor`, `infusion`, and `defib`, drawn by `render` from Task 2, each keeping its controls in `ui` and its last measurement in `ui.readout` so the task sheet's "Record the reading" button can copy it.

**Files:**
- Modify: `engine/instruments.js` (the panels block, before `function render`)
- Test: `tests/instruments.js` (a jsdom block per panel), `tests/engine.js` (Record the reading end to end)

**Interfaces:**
- Consumes: `compute.*`, `figure`, `PANEL`, `HANDLE`, `render` from Task 2.
- Produces: `PANEL.dmm/safety/monitor/infusion/defib` and matching `HANDLE.*`. `ui` fields per panel: dmm `{ fn, power, a, b, next, kit, readout }`; safety `{ test, polarity, ground, readout }`; monitor `{ hr, rhythm, spo2, sys, dia, readout }`; infusion `{ rate, vtbi, elapsed, running, readout }`; defib `{ energy, charged, readout }`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/instruments.js`, immediately before `if (fails.length) { console.error(...`:

```js
// ---------- the five interactive panels (jsdom) ----------
{
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!doctype html><div id="x"></div>'); const w = dom.window;
  // `box` is the panel's container; fresh() swaps in a new one so each panel starts clean, and the
  // helpers read `box` at call time so they always address the current container.
  let box = w.document.getElementById('x');
  const click = sel => { const b = box.querySelector(sel); if (!b) throw new Error('no element ' + sel); b.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
  const set = (sel, value) => { const f = box.querySelector(sel); if (!f) throw new Error('no field ' + sel); if (f.type === 'checkbox') f.checked = value; else f.value = value; f.dispatchEvent(new w.Event('change', { bubbles: true })); };
  const fresh = () => { const n = w.document.createElement('div'); box.replaceWith(n); box = n; return n; };
  // dmm
  fresh(); let ui = {};
  const dmmLab = lab('dmm', Object.assign({ svg: '<svg width="200" height="100"></svg>', points: { A: [10, 10], B: [50, 10], C: [90, 10] } }, DMM), []);
  I.render(box, dmmLab, ui, {});
  check('dmm: draws the circuit, a hotspot per test point, the dial, power, and the kit toggle', box.querySelectorAll('.tp').length === 3 && box.querySelectorAll('[data-ins="fn"]').length === 6 && !!box.querySelector('[data-ins="power"]') && !!box.querySelector('[data-field="kit"]') && box.querySelector('[data-readout]').textContent === '--');
  click('[data-ins="tp"][data-arg="A"]'); click('[data-ins="tp"][data-arg="B"]');
  check('dmm: two clicks place red then black and read DC volts', ui.a === 'A' && ui.b === 'B' && ui.readout && near(ui.readout.value, 9, 0.011) && /V$/.test(box.querySelector('[data-readout]').textContent), JSON.stringify(ui.readout));
  click('[data-ins="fn"][data-arg="ohm"]');
  check('dmm: ohms with power on shows INVALID in the bad style', ui.readout.invalid === true && box.querySelector('[data-readout]').classList.contains('bad'));
  click('[data-ins="power"]');
  check('dmm: power off clears the invalid reading (A-B has no resistance entry, so OL)', ui.power === false && ui.readout.text === 'OL');
  set('[data-field="kit"]', true);
  check('dmm: the kit toggle hides the readout', ui.kit === true && ui.readout === null && /own meter/.test(box.querySelector('[data-readout]').textContent));
  // safety
  fresh(); ui = {};
  I.render(box, lab('safety', SAFE, []), ui, {});
  check('safety: three selects, a Test button, and the limits card', box.querySelectorAll('select[data-field]').length === 3 && !!box.querySelector('[data-ins="test"]') && /500 uA/.test(box.textContent) && /0\.5 ohm/.test(box.textContent));
  set('[data-field="test"]', 'chassis'); set('[data-field="polarity"]', 'reverse'); set('[data-field="ground"]', 'open');
  click('[data-ins="test"]');
  check('safety: Test reads the worst case', ui.readout && near(ui.readout.value, 210, 1.01) && /uA/.test(box.querySelector('[data-readout]').textContent), JSON.stringify(ui.readout));
  set('[data-field="test"]', 'ground');
  check('safety: changing a control clears the readout until Test is pressed again', ui.readout === null && box.querySelector('[data-readout]').textContent === '--');
  // monitor
  fresh(); ui = {};
  I.render(box, lab('monitor', MON, []), ui, {});
  check('monitor: simulator controls and an empty screen before Apply', box.querySelectorAll('input[data-field]').length === 4 && !!box.querySelector('select[data-field="rhythm"]') && !box.querySelector('.fig.strip'));
  set('[data-field="hr"]', '60'); set('[data-field="spo2"]', '95'); click('[data-ins="apply"]');
  check('monitor: Apply shows the numerics with the scenario offsets and a strip at the shown rate', ui.readout && ui.readout.hr === 61 && ui.readout.spo2 === 94 && /61/.test(box.querySelector('.ins-numerics').textContent) && box.querySelector('.fig.strip').getAttribute('data-rate') === '61');
  set('[data-field="rhythm"]', 'asystole'); click('[data-ins="apply"]');
  check('monitor: asystole shows the alarm and a flat strip', /ASYSTOLE/.test(box.querySelector('.ins-alarm').textContent) && box.querySelector('.fig.strip').getAttribute('data-beats') === '0');
  // infusion
  fresh(); ui = {};
  I.render(box, lab('infusion', INF, []), ui, {});
  check('infusion: rate and VTBI fields, a Start button, an empty cylinder', !!box.querySelector('[data-field="rate"]') && !!box.querySelector('[data-ins="start"]') && box.querySelector('.fig.cylinder').getAttribute('data-value') === '0');
  set('[data-field="rate"]', '100'); click('[data-ins="start"]'); click('[data-ins="ff"][data-arg="10"]'); click('[data-ins="ff"][data-arg="10"]'); click('[data-ins="ff"][data-arg="10"]');
  check('infusion: thirty minutes at 100 mL/h fills the cylinder to the true delivery, read to the graduation', ui.elapsed === 30 && ui.readout && ui.readout.volume === 52 && box.querySelector('.fig.cylinder').getAttribute('data-value') === '52' && /30 min/.test(box.textContent), JSON.stringify(ui.readout));
  click('[data-ins="stop"]');
  check('infusion: Stop keeps the volume and offers Start again', ui.running === false && !!box.querySelector('[data-ins="start"]') && ui.readout.volume === 52);
  // defib
  fresh(); ui = {};
  I.render(box, lab('defib', DEF, []), ui, {});
  check('defib: one chip per energy, Charge enabled, Discharge disabled', box.querySelectorAll('[data-ins="energy"]').length === 4 && !box.querySelector('[data-ins="charge"]').disabled && box.querySelector('[data-ins="discharge"]').disabled);
  click('[data-ins="energy"][data-arg="200"]'); click('[data-ins="charge"]');
  check('defib: Charge arms the selected energy', ui.energy === 200 && ui.charged === true && /CHARGED 200 J/.test(box.textContent));
  click('[data-ins="discharge"]');
  check('defib: Discharge reads the delivered energy on the analyzer and disarms', ui.readout && ui.readout.delivered === 204 && /204 J delivered/.test(box.textContent) && ui.charged === false);
}
```

In `tests/engine.js`, inside the Labs block from Task 3 and right after the check `'the choices panel shows the scenario text'`, nothing changes; instead add a new block before the `  if (fails.length) ...` line:

```js
  // ----- Record the reading: a measured task copies the panel's value into its input -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini, beforeApp: x => {
      // Swap the fixture lab for a safety-analyzer lab on the same lesson, in this window only.
      x.FRA.labs['mini-ping'] = { id: 'mini-ping', lesson: 'u1l2', title: 'Safety check', instrument: 'safety', intro: 'Test the device.',
        scenario: { standard: 'NFPA 99', ground: 0.12, chassis: { normal: 45, reverse: 60, 'normal-open': 180, 'reverse-open': 210 }, lead: { normal: 8, reverse: 9, 'normal-open': 40, 'reverse-open': 45 }, limits: { ground: 0.5, chassis: 500, lead: 100 } },
        tasks: [{ id: 'gnd', kind: 'reading', prompt: 'Ground wire resistance', unit: 'ohm', expect: [0.08, 0.16], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }, { id: 'v', kind: 'verdict', prompt: 'Pass?', expect: 'pass' }],
        why: { gnd: 'Read the ground test.', v: 'Everything is under its limit.' } };
    } });
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    act(w, 'lesson', 'u1l2');
    check('a measured reading task offers Record the reading', !!w.$('[data-act="lab-use"][data-arg="gnd"]'));
    w.click(w.$('[data-act="lab-use"][data-arg="gnd"]'));
    check('Record before a measurement leaves the input empty', w.$('#lab-gnd').value === '');
    w.$('#instrument [data-ins="test"]').dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    w.click(w.$('[data-act="lab-use"][data-arg="gnd"]'));
    const typed = Number(w.$('#lab-gnd').value);
    check('Record copies the analyzer reading into the input', typed >= 0.11 && typed <= 0.13, w.$('#lab-gnd').value);
    w.click(w.$('[data-act="lab-check"][data-arg="gnd"]'));
    check('the recorded reading checks as correct', st().labs['mini-ping'].ok.gnd === true);
    check('the panel keeps its reading across the re-render', /ohm/.test(w.$('#instrument [data-readout]').textContent));
    w.close();
  }
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node tests/instruments.js; node tests/engine.js`
Expected: `dmm: draws the circuit ...` fails (`Unknown instrument.`), and the engine's `Record the reading` block fails because the safety panel does not exist.

- [ ] **Step 3: Write the panels**

In `engine/instruments.js`, replace the two lines `  PANEL.choices = lab => ...;` and `  HANDLE.choices = () => false;` with those same two lines followed by:

```js
  const sel = (ui, field, opts) => `<select data-field="${field}">${opts.map(([v, l]) => `<option value="${v}" ${ui[field] === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const numField = (ui, field, label, min, max, dis) => `<label class="field">${label}<input type="number" data-field="${field}" min="${min}" max="${max}" value="${ui[field]}" ${dis ? 'disabled' : ''}></label>`;

  // ---- dmm: a function dial, a circuit power switch, two probes placed on drawn test points ----
  const DMM_FNS = [['vdc', 'V DC'], ['vac', 'V AC'], ['ohm', 'Ohms'], ['adc', 'A DC'], ['cont', 'Continuity'], ['diode', 'Diode']];
  function dmmInit(lab, ui) { if (!ui.fn) { ui.fn = 'vdc'; ui.power = obj(lab.scenario).power !== false; ui.a = null; ui.b = null; ui.next = 'a'; ui.kit = false; ui.readout = null; } }
  PANEL.dmm = (lab, ui) => {
    dmmInit(lab, ui); const sc = obj(lab.scenario); const pts = obj(sc.points); const r = ui.readout;
    const hot = Object.keys(pts).map(p => `<button type="button" class="tp ${ui.a === p ? 'red' : ui.b === p ? 'black' : ''}" data-ins="tp" data-arg="${esc(p)}" style="left:${num(pts[p][0])}px;top:${num(pts[p][1])}px" title="Test point ${esc(p)}">${esc(p)}</button>`).join('');
    return `<div class="ins dmm">
      <div class="ins-drawing">${sc.svg || ''}${hot}</div>
      <div class="ins-panel">
        <div class="ins-readout ${r && r.invalid ? 'bad' : ''}" data-readout>${ui.kit ? 'Your own meter: type what it reads' : r ? esc(r.text) : '--'}</div>
        <div class="ins-dial">${DMM_FNS.map(([k, l]) => `<button type="button" class="chip" data-ins="fn" data-arg="${k}" aria-pressed="${ui.fn === k}">${l}</button>`).join('')}</div>
        <div class="row" style="gap:10px;flex-wrap:wrap"><button type="button" class="btn small ${ui.power ? 'primary' : ''}" data-ins="power">Circuit power: ${ui.power ? 'ON' : 'OFF'}</button><span class="muted">Red probe: <b>${esc(ui.a || '-')}</b> · Black probe: <b>${esc(ui.b || '-')}</b> · click a test point: first red, then black</span></div>
        <label class="row" style="gap:8px"><input type="checkbox" data-field="kit" ${ui.kit ? 'checked' : ''}> I'm using my own kit and typing my readings</label>
      </div></div>`;
  };
  HANDLE.dmm = (lab, ui, act, arg) => {
    dmmInit(lab, ui);
    if (act === 'fn') ui.fn = arg;
    else if (act === 'power') ui.power = !ui.power;
    else if (act === 'tp') { if (ui.next === 'a') { ui.a = arg; ui.next = 'b'; } else { ui.b = arg; ui.next = 'a'; } }
    ui.readout = ui.kit || !ui.a || !ui.b ? null : compute.dmm(lab.scenario, { fn: ui.fn, a: ui.a, b: ui.b, power: ui.power }, lab.id);
    return true;
  };

  // ---- safety analyzer: test, polarity, ground condition, Test, and the limits card ----
  function safetyInit(ui) { if (!ui.test) { ui.test = 'ground'; ui.polarity = 'normal'; ui.ground = 'closed'; ui.readout = null; } }
  PANEL.safety = (lab, ui) => {
    safetyInit(ui); const sc = obj(lab.scenario); const lim = obj(sc.limits); const r = ui.readout;
    const names = { ground: 'Ground wire resistance', chassis: 'Chassis (enclosure) leakage', lead: 'Patient lead leakage' };
    return `<div class="ins safety"><div class="ins-panel">
      <div class="ins-readout" data-readout>${r ? esc(r.text) : '--'}</div>
      <div class="setup-grid"><label class="field">Test ${sel(ui, 'test', [['ground', names.ground], ['chassis', names.chassis], ['lead', names.lead]])}</label><label class="field">Mains polarity ${sel(ui, 'polarity', [['normal', 'Normal'], ['reverse', 'Reverse']])}</label><label class="field">Ground conductor ${sel(ui, 'ground', [['closed', 'Intact'], ['open', 'Open (lifted)']])}</label></div>
      <div class="row"><button type="button" class="btn primary small" data-ins="test">Test</button></div>
      <table class="plain ins-limits"><thead><tr><th>Limit${sc.standard ? ` (${esc(sc.standard)})` : ''}</th><th>Value</th></tr></thead><tbody>${['ground', 'chassis', 'lead'].filter(k => lim[k] != null).map(k => `<tr><td>${names[k]}</td><td>${esc(lim[k])} ${k === 'ground' ? 'ohm' : 'uA'}</td></tr>`).join('')}</tbody></table>
    </div></div>`;
  };
  HANDLE.safety = (lab, ui, act) => { safetyInit(ui); if (act === 'test') ui.readout = compute.safety(lab.scenario, { test: ui.test, polarity: ui.polarity, ground: ui.ground }, lab.id); else if (act === 'field') ui.readout = null; return true; };

  // ---- patient simulator and monitor ----
  function monInit(ui) { if (ui.hr == null) { ui.hr = 80; ui.rhythm = 'nsr'; ui.spo2 = 98; ui.sys = 120; ui.dia = 80; ui.readout = null; } }
  PANEL.monitor = (lab, ui) => {
    monInit(ui); const r = ui.readout;
    const screen = r ? `${r.alarm ? `<div class="ins-alarm">${esc(r.alarm)}</div>` : ''}<div class="ins-numerics"><div><span class="eyebrow">HR</span><b>${r.hr == null ? '---' : r.hr}</b></div><div><span class="eyebrow">SpO2</span><b>${r.spo2}</b></div><div><span class="eyebrow">NIBP</span><b>${r.sys}/${r.dia}</b></div></div>${figure({ kind: 'strip', rate: r.hr || 0, seconds: 6, flat: r.alarm === 'ASYSTOLE', chaotic: r.alarm === 'VFIB' })}` : '<p class="muted">Apply the simulator settings to see the monitor.</p>';
    return `<div class="ins monitor"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Patient simulator</div><div class="setup-grid">${numField(ui, 'hr', 'ECG rate (bpm)', 30, 300)}<label class="field">Rhythm ${sel(ui, 'rhythm', [['nsr', 'Normal sinus'], ['asystole', 'Asystole'], ['vfib', 'Ventricular fibrillation']])}</label>${numField(ui, 'spo2', 'SpO2 (%)', 70, 100)}${numField(ui, 'sys', 'NIBP systolic (mmHg)', 60, 250)}${numField(ui, 'dia', 'NIBP diastolic (mmHg)', 30, 150)}</div><div class="row"><button type="button" class="btn primary small" data-ins="apply">Apply to simulator</button></div></div>
      <div class="ins-panel ins-screen"><div class="eyebrow">Monitor</div>${screen}</div>
    </div></div>`;
  };
  HANDLE.monitor = (lab, ui, act) => { monInit(ui); if (act === 'apply') { ui.readout = compute.monitor(lab.scenario, { hr: ui.hr, rhythm: ui.rhythm, spo2: ui.spo2, sys: ui.sys, dia: ui.dia }); return true; } return false; };

  // ---- infusion pump flow check: set a rate, run, fast-forward, read the cylinder ----
  function infInit(ui) { if (ui.rate == null) { ui.rate = 100; ui.vtbi = 100; ui.elapsed = 0; ui.running = false; ui.readout = null; } }
  PANEL.infusion = (lab, ui) => {
    infInit(ui); const sc = obj(lab.scenario); const r = compute.infusion(sc, { rate: ui.rate, minutes: ui.elapsed }); ui.readout = ui.elapsed > 0 ? r : null;
    return `<div class="ins infusion"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Pump</div><div class="setup-grid">${numField(ui, 'rate', 'Rate (mL/h)', 1, 999, ui.running)}${numField(ui, 'vtbi', 'VTBI (mL)', 1, 9999, ui.running)}</div>
        <div class="ins-readout" data-readout>${ui.running ? 'RUNNING' : 'STOPPED'} · ${ui.elapsed} min elapsed</div>
        <div class="row" style="gap:8px;flex-wrap:wrap">${ui.running ? `<button type="button" class="btn small" data-ins="ff" data-arg="1">+1 min</button><button type="button" class="btn small" data-ins="ff" data-arg="10">+10 min</button><button type="button" class="btn small ghost" data-ins="stop">Stop</button>` : `<button type="button" class="btn primary small" data-ins="start">Start (empties the cylinder)</button>`}</div></div>
      <div class="ins-panel"><div class="eyebrow">Collection</div>${figure({ kind: 'cylinder', ml: num(sc.cylinderMl) || 100, value: r.volume })}<p class="muted">Read the meniscus to the nearest ${num(sc.graduation) || 1} mL.</p></div>
    </div></div>`;
  };
  HANDLE.infusion = (lab, ui, act, arg) => {
    infInit(ui);
    if (act === 'start') { ui.running = true; ui.elapsed = 0; return true; }
    if (act === 'stop') { ui.running = false; return true; }
    if (act === 'ff') { if (!ui.running) return false; ui.elapsed += num(arg); const maxMin = ui.rate > 0 ? ui.vtbi / ui.rate * 60 : 0; if (ui.elapsed >= maxMin) { ui.elapsed = Math.round(maxMin); ui.running = false; } return true; }
    return false;
  };

  // ---- defibrillator into the analyzer ----
  function defInit(lab, ui) { if (ui.energy == null) { ui.energy = num((obj(lab.scenario).energies || [200])[0]); ui.charged = false; ui.readout = null; } }
  PANEL.defib = (lab, ui) => {
    defInit(lab, ui); const sc = obj(lab.scenario); const r = ui.readout;
    return `<div class="ins defib"><div class="ins-two">
      <div class="ins-panel"><div class="eyebrow">Defibrillator</div><div class="row" style="gap:6px;flex-wrap:wrap">${(sc.energies || []).map(e => `<button type="button" class="chip" data-ins="energy" data-arg="${num(e)}" aria-pressed="${ui.energy === num(e)}">${num(e)} J</button>`).join('')}</div>
        <div class="ins-readout" data-readout>${ui.charged ? `CHARGED ${ui.energy} J` : `Selected ${ui.energy} J`}</div>
        <div class="row" style="gap:8px"><button type="button" class="btn small" data-ins="charge" ${ui.charged ? 'disabled' : ''}>Charge</button><button type="button" class="btn primary small" data-ins="discharge" ${ui.charged ? '' : 'disabled'}>Discharge into the analyzer</button></div></div>
      <div class="ins-panel ins-screen"><div class="eyebrow">Defibrillator analyzer</div><div class="ins-readout" data-readout>${r ? `${r.delivered} J delivered` : '--'}</div><p class="muted">${r ? `Set ${r.energy} J, charge time ${r.chargeSeconds} s.` : 'Charge, then discharge into the analyzer.'}</p></div>
    </div></div>`;
  };
  HANDLE.defib = (lab, ui, act, arg) => {
    defInit(lab, ui);
    if (act === 'energy') { ui.energy = num(arg); ui.charged = false; return true; }
    if (act === 'charge') { ui.charged = true; return true; }
    if (act === 'discharge') { if (!ui.charged) return false; ui.readout = compute.defib(lab.scenario, { energy: ui.energy }); ui.charged = false; return true; }
    return false;
  };
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node tests/instruments.js && node tests/engine.js`
Expected: every panel check `PASS`; the engine's `Record the reading` block passes.

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 5: Look at it in a browser**

Run: `python build.py cbet` and open `dist/cbet.html` to confirm nothing changed for a pack without labs. Then open `tests/fixtures/mini` through the engine: create a throwaway shell by copying `cbet/index.html` to a scratch file with the `courses/cbet/*.js` script tags replaced by the six mini fixture files (`course.js`, `curriculum.js`, `labs.js`, `questions.js`, `cheatsheet.js`, `deep.js`), open it with `file://`, skip the cheat sheet, browse to Unit One, lesson A Two, and confirm the lab card with the choices panel renders and the task sheet checks answers. Delete the scratch shell afterwards; it is not committed.

- [ ] **Step 6: Commit**

```bash
git add engine/instruments.js tests/instruments.js tests/engine.js
git commit -m "feat(engine): DMM, safety analyzer, simulator and monitor, infusion flow check, and defib analyzer panels

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---
### Task 5: Certificate of completion

A course whose manifest says `certificate: true` gets a Progress card and a printable `#certificate` view, unlocked when every lesson is passed, every lab is done, and the official-format test is passed.

**Files:**
- Modify: `engine/app.js` (constants, `fresh`, `HASH_VIEWS`, `WELCOME_EXEMPT`, `paint`, `nextAction`, `viewProgress`, new `certGate`/`certName`/`viewCertificate`, actions)
- Modify: `engine/merge.js` (`certAt`)
- Modify: `engine/styles.css`
- Test: `tests/engine.js`, `tests/merge.js`

**Interfaces:**
- Consumes: `labIds`, `labDone` (Task 3), `S.official` (existing), `FRAAuth.user()` (existing).
- Produces: `CERT` (bool), `certGate() -> { ok, lessonsLeft, labsLeft, officialLeft }`, `certName()`, `viewCertificate()`, actions `cert-name` and `print-cert`, state `S.certAt` (ms, first time the gate was seen met), `S.settings.certName`.

- [ ] **Step 1: Write the failing tests**

In `tests/merge.js`, before the final `if (fails.length)` line, add:

```js
{
  const base = { v: 3, course: 'mini', lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {}, exams: [], feedback: [], settings: {}, settingsAt: 0, touchedAt: 1, created: 1 };
  const a = Object.assign({}, base, { certAt: 500 }), b = Object.assign({}, base, { certAt: 900 }), none = Object.assign({}, base);
  check('certAt merges to the earliest positive value', M.mergeState(a, b, OPTS).certAt === 500 && M.mergeState(b, a, OPTS).certAt === 500);
  check('certAt passes through when only one side has it', M.mergeState(a, none, OPTS).certAt === 500 && M.mergeState(none, a, OPTS).certAt === 500);
  check('certAt is 0 when neither side has it', M.mergeState(none, none, OPTS).certAt === 0);
}
```

In `tests/engine.js`, before the `  if (fails.length) ...` line, add:

```js
  // ----- Certificate of completion (manifest certificate: true) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const cert = x => { x.FRA.course.certificate = true; };
    let w = boot({ courseDir: mini, beforeApp: cert });
    act(w, 'go', 'progress');
    check('progress offers the certificate card when the manifest enables it', /Certificate of completion/.test(w.text()) && !!w.$('[data-act="go"][data-arg="certificate"]'));
    act(w, 'go', 'certificate');
    check('before the gate the certificate page lists what is left', /Not yet/.test(w.text()) && /8 lessons left/.test(w.text()) && /1 lab left/.test(w.text()) && /official-format test/i.test(w.text()), w.text().slice(0, 300));
    check('the hash names the certificate view', w.location.hash === '#certificate', w.location.hash);
    w.close();
    w = boot({ courseDir: mini });
    act(w, 'go', 'progress');
    check('without the flag there is no certificate card', !/Certificate of completion/.test(w.text()));
    w.close();
    // Everything done, seeded straight into storage. Signed out, so the name is typed.
    const passed = {}; ['u1l1', 'u1l2', 'u1l3', 'u2l1', 'u2l2', 'u2l3', 'u3l1', 'u3l2'].forEach(id => { passed[id] = { status: 'passed', best: 4, attempts: 1, passedAt: 5, lastScore: 4, lastAt: 5 }; });
    const rec = (id, kind, date, extra) => Object.assign({ id, date, kind, score: 9, total: 10, pct: 90, byDomain: {}, review: [], seconds: 60, minutes: 0, setup: null, noConf: true }, extra || {});
    const seeded = { v: 3, course: 'mini', view: { name: 'home' }, lessons: passed, qstats: {}, topics: {}, exams: [rec('s', 'starter', 1, { total: 6, score: 6, pct: 100, noConf: false }), rec('p1', 'practice', 2), rec('p2', 'practice', 3), rec('o', 'practice', 4, { minutes: 10, setup: { mode: 'standard', n: 10, minutes: 10 } })], passes: 0, official: null, plan: null, path: null, pathAt: 0, active: null, settings: { timer: true }, feedback: [], ratings: {}, seen: { cheat: true }, labs: { 'mini-ping': { done: true, at: 5, values: {}, ok: {} } }, settingsAt: 0, touchedAt: 1, created: 1 };
    const seed = x => { cert(x); x.localStorage.setItem('fra.mini.state.v3', JSON.stringify(seeded)); };
    w = boot({ courseDir: mini, hash: '#certificate', beforeApp: seed });
    const st = () => JSON.parse(w.localStorage.getItem('fra.mini.state.v3'));
    check('the seeded state replays to an official pass', !!st().official);
    check('with everything done the certificate is earned and asks for a name', /Earned/.test(w.text()) && !!w.$('#cert-name') && w.$('[data-act="print-cert"]').disabled);
    const body = w.$('.certificate').textContent;
    check('the certificate names the course, every lesson, every lab, and the official score', /Mini Course/.test(body) && /all 8 lessons/.test(body) && /all 1 lab\b/.test(body) && /90%/.test(body), body);
    check('the earned date is recorded', st().certAt > 0);
    w.$('#cert-name').value = 'Pat Learner'; act(w, 'cert-name');
    check('saving the name puts it on the certificate and enables Print', /Pat Learner/.test(w.$('.cert-name').textContent) && !w.$('[data-act="print-cert"]').disabled && st().settings.certName === 'Pat Learner' && st().settingsAt > 0);
    act(w, 'print-cert'); await new Promise(r => setTimeout(r, 200));   // print-cert prints after a 120 ms settle
    check('Print calls window.print', w.printed === 1, w.printed);
    act(w, 'go', 'home');
    check('home offers the certificate once earned', !!w.$('[data-act="go"][data-arg="certificate"]'));
    w.close();
    // Signed in: the account name is used and no name field is shown.
    w = boot({ courseDir: mini, hash: '#certificate', beforeApp: x => { seed(x); x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com', name: 'Sam Tech' })); }, beforeAppJs: x => { x.fetch = () => Promise.reject(new Error('offline')); } });
    check('signed in, the account name is on the certificate and there is no name field', /Sam Tech/.test(w.$('.cert-name').textContent) && !w.$('#cert-name'));
    w.close();
  }
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node tests/merge.js; node tests/engine.js`
Expected: `certAt` checks fail (undefined); the certificate block fails at `progress offers the certificate card`.

- [ ] **Step 3: Merge `certAt`**

In `engine/merge.js`, after the line `  const max = (x, y) => (x || 0) > (y || 0) ? (x || 0) : (y || 0);` add:

```js
  // The earliest positive of two timestamps (the certificate's earned date), 0 when neither is set.
  const earliest = (x, y) => (x || 0) && (y || 0) ? Math.min(x, y) : (x || y || 0);
```

In `mergeState`'s returned object, after the line `      touchedAt: max(a.touchedAt, b.touchedAt),` add:

```js
      certAt: earliest(a.certAt, b.certAt),
```

- [ ] **Step 4: The certificate in `engine/app.js`**

After the line `  const CORE = course.core || {};` add:

```js
  // A course that issues a certificate of completion (manifest certificate: true). The gate: every
  // lesson passed, every lab done, the official-format test passed.
  const CERT = !!course.certificate;
```

In `fresh()`, change `labs: {},` to `labs: {}, certAt: 0,`.

Change `  const HASH_VIEWS = ['home', 'tutorial', 'course', 'lesson', 'exam', 'results', 'train', 'progress', 'ready', 'cheatsheet', 'feedback'];` to:

```js
  const HASH_VIEWS = ['home', 'tutorial', 'course', 'lesson', 'exam', 'results', 'train', 'progress', 'ready', 'cheatsheet', 'feedback', 'certificate'];
```

Change `  const WELCOME_EXEMPT = ['course', 'lesson', 'progress', 'cheatsheet', 'feedback'];` to:

```js
  const WELCOME_EXEMPT = ['course', 'lesson', 'progress', 'cheatsheet', 'feedback', 'certificate'];
```

In `paint()`'s `switch (v.name)`, after `      case 'feedback': main = viewFeedback(); break;` add:

```js
      case 'certificate': main = viewCertificate(); break;
```

In `nextAction()`, before the line `    if (st === 'ready') return { label: 'See your readiness report', act: 'go', arg: 'ready' };` add:

```js
    if (st === 'ready' && CERT && certGate().ok) return { label: 'Print your certificate of completion', act: 'go', arg: 'certificate', sub: 'Every lesson passed, every lab done, and the official-format test passed.' };
```

In `viewProgress`, after the line `      <div><div class="eyebrow">Progress</div><h1>${mastered} of ${lessons.length} topics mastered</h1></div>` add:

```js
      ${CERT ? (g => `<div class="card stack"><div class="row spread"><div><h3>Certificate of completion</h3><p class="ink2">${g.ok ? 'Earned. Open it to add your name and print it.' : 'Unlocks when every lesson is passed, every lab is done, and the official-format test is passed.'}</p></div><button class="btn ${g.ok ? 'primary' : ''}" data-act="go" data-arg="certificate">${g.ok ? 'Open' : 'What is left'}</button></div></div>`)(certGate()) : ''}
```

After the `viewReady` function, add:

```js
  // ---------- certificate of completion ----------
  function certGate() {
    const lessonsLeft = lessons.filter(l => lstat(l.id).status !== 'passed').length;
    const labsLeft = labIds.filter(id => !labDone(id)).length;
    const officialLeft = S.official ? 0 : 1;
    return { ok: !lessonsLeft && !labsLeft && !officialLeft, lessonsLeft, labsLeft, officialLeft };
  }
  // The signed-in account's name when it has one, else the name typed on the certificate page.
  function certName() {
    const u = window.FRAAuth && FRAAuth.isSignedIn() ? FRAAuth.user() : null;
    return (u && u.name) || (S.settings.certName || '');
  }
  function viewCertificate() {
    if (!CERT) return viewProgress();
    const g = certGate();
    if (!g.ok) {
      return `<div class="content stack" style="gap:18px">
        <div><div class="eyebrow">Certificate of completion</div><h1>Not yet.</h1></div>
        <div class="card stack"><p>The certificate unlocks when every lesson is passed, every lab is done, and the official-format test is passed.</p>
          <ul style="margin:0;padding-left:20px;line-height:1.7">
            <li>${g.lessonsLeft ? `${plural(g.lessonsLeft, 'lesson')} left to pass` : 'Every lesson passed'}</li>
            ${labIds.length ? `<li>${g.labsLeft ? `${plural(g.labsLeft, 'lab')} left to finish` : 'Every lab done'}</li>` : ''}
            <li>${g.officialLeft ? 'The official-format test, not yet passed' : 'Official-format test passed'}</li>
          </ul>
          <div class="row"><button class="btn" data-act="go" data-arg="course">All lessons</button><button class="btn ghost" data-act="go" data-arg="progress">Progress</button></div></div>
      </div>`;
    }
    if (!S.certAt) { S.certAt = Date.now(); save(); }
    const name = certName(); const u = window.FRAAuth && FRAAuth.isSignedIn() ? FRAAuth.user() : null;
    const exam = course.exam || {};
    return `<div class="content stack" style="gap:18px">
      <div class="no-print row spread" style="align-items:flex-start"><div><div class="eyebrow">Certificate of completion</div><h1>Earned.</h1></div><div class="row"><button class="btn primary" data-act="print-cert" ${name ? '' : 'disabled'}>Print or save as PDF</button></div></div>
      ${u && u.name ? '' : `<div class="card no-print row" style="gap:10px;flex-wrap:wrap;align-items:flex-end"><label class="field" style="flex:1;min-width:220px">Your name, as it should appear<input type="text" id="cert-name" value="${esc(S.settings.certName || '')}" maxlength="80"></label><button class="btn" data-act="cert-name">Save name</button></div>`}
      <div class="certificate card">
        <div class="cert-brand"><span class="mark">FR</span> ${esc(course.brand)}</div>
        <div class="cert-title">Certificate of completion</div>
        <div class="cert-name">${name ? esc(name) : '<span class="muted">Your name</span>'}</div>
        <div class="cert-body">has completed <strong>${esc(course.name)}</strong>${exam.title ? `, preparation for the ${esc([exam.vendor, exam.title].filter(Boolean).join(' '))}${exam.code ? ` (${esc(exam.code)})` : ''}` : ''}: all ${lessons.length} lessons with their checkpoints${labIds.length ? `, all ${plural(labIds.length, 'lab')}` : ''}, and the official-format test at ${S.official.pct}%.</div>
        <div class="cert-date">${fmtDate(S.certAt)}</div>
      </div>
    </div>`;
  }
```

In the click switch, before `      case 'sign-in': {`, add:

```js
      case 'cert-name': { const el = $('#cert-name'); const v = el ? String(el.value).trim().slice(0, 80) : ''; S.settings.certName = v; markSettingsChanged(); save(); render(); if (v) toast('Name saved'); return; }
      case 'print-cert': { if (S.view.name !== 'certificate') go('certificate'); setTimeout(() => window.print(), 120); return; }
```

- [ ] **Step 5: Styles**

Append to `engine/styles.css`:

```css
/* Certificate of completion (engine/app.js viewCertificate) */
.certificate { text-align: center; padding: 48px 36px; border: 6px double var(--ink); display: grid; gap: 14px; }
.cert-brand { display: flex; justify-content: center; align-items: center; gap: 8px; font-family: var(--font-display); font-weight: 700; }
.cert-brand .mark { width: 28px; height: 28px; border-radius: 7px; background: var(--ink); color: var(--bg); display: grid; place-items: center; font-size: 0.8rem; }
.cert-title { font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
.cert-name { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; }
.cert-body { max-width: 560px; margin: 0 auto; font-size: 1.05rem; }
.cert-date { color: var(--muted); }
@media print { .certificate { border-color: #000; page-break-inside: avoid; } }
```

- [ ] **Step 6: Run the tests**

Run: `node tests/merge.js && node tests/engine.js && node tests/selftest.js`
Expected: every certificate check `PASS` (the print check waits 200 ms for the 120 ms settle in `print-cert`); the five packs' self-tests are unchanged because none sets `certificate`.

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 7: Commit**

```bash
git add engine/app.js engine/merge.js engine/styles.css tests/engine.js tests/merge.js
git commit -m "feat(engine): certificate of completion behind lessons, labs, and the official-format test

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---

### Task 6: Labs on the account page

**Files:**
- Modify: `build.py` (`course_meta`), `engine/summary.js` (`summarize`), `account/index.html` (`card`)
- Test: `tests/summary.js`, `tests/account.js`

**Interfaces:**
- Produces: `course_meta(...)["labs"]` (count of distinct lab ids in the pack) and tested-only `domains`; `summarize(...)` gains `labsDone`, `labsTotal`; the account card shows `Labs done x of n` when the course has labs.

- [ ] **Step 1: Write the failing tests**

In `tests/summary.js`, before the final `if (fails.length)` line, add:

```js
check('labs done counts done entries and takes the total from meta', (() => { const s = summarize(state({ labs: { a: { done: true, at: 1 }, b: { done: false, at: 2 }, c: 'x' } }), Object.assign({}, META, { labs: 3 })); return s.labsDone === 1 && s.labsTotal === 3; })());
check('no labs in meta or state: both zero', (() => { const s = summarize(state(), META); return s.labsDone === 0 && s.labsTotal === 0; })());
```

In `tests/account.js`, in the `COURSES` fixture, add `labs: 2` to the netplus entry (after `checkpointN: 4,`). In scenario 2, add `labs: { x: { done: true, at: 1 } }` to the `netplus` state object (after `plan: null,`). After the check `'netplus: last synced is relative'` add:

```js
    check('netplus: labs done when the course has labs', /Labs done/.test(np) && /1 of 2/.test(np), np);
```

and after `check('cbet: an unreadable row does not break the page', ...)` add:

```js
    check('a course without labs shows no labs fact', !/Labs done/.test(cards[1].textContent) && !/Labs done/.test(cards[2].textContent));
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node tests/summary.js; node tests/account.js`
Expected: the labs checks print `FAIL`.

- [ ] **Step 3: Implement**

`engine/summary.js`, inside `summarize` after the line `    const topics = obj(s.topics) || {};` add:

```js
    const labs = obj(s.labs) || {};
    const labsDone = Object.keys(labs).filter(id => obj(labs[id]) && labs[id].done === true).length;
```

and in the returned object, after `      lessonsPassed, lessonsTotal: Number(m.lessons) > 0 ? Number(m.lessons) : 0,` add:

```js
      labsDone, labsTotal: Number(m.labs) > 0 ? Number(m.labs) : 0,
```

Update the comment above `summarize` so the `meta` line reads `{ lessons, labs, passPct, passesNeeded, passWindow, examQuestions }` and the returns line includes `labsDone, labsTotal`.

`account/index.html`, in `card()`, after the line `      + fact('Lessons passed', s.lessonsPassed + ' of ' + s.lessonsTotal)` add:

```js
      + (c.labs > 0 ? fact('Labs done', s.labsDone + ' of ' + s.labsTotal) : '')
```

and extend the comment `// Injected by build.py (window.FRA_COURSES): id, name, exam, lessons, passPct,` to mention `labs`.

`build.py`, in `course_meta`: after the `lessons = re.findall(...)` line add:

```python
    labs = sorted(set(re.findall(r'\blab: "([a-z0-9-]+)"', scripts)))
```

change the `domains = re.findall(...)` result to keep tested domains only, by replacing the `"domains": [...]` entry in the returned dict with:

```python
        "domains": [{"id": int(i), "name": n.replace('\\"', '"'), "short": s.replace('\\"', '"'), "pct": int(p)} for i, n, s, p in domains if int(p) > 0],
```

and add to the returned dict, after `"lessons": len(lessons),`:

```python
        "labs": len(labs),
```

- [ ] **Step 4: Run the tests**

Run: `node tests/summary.js && node tests/account.js && python build.py && npm test`
Expected: all pass; `build.py` prints `wrote dist/account.html ... (5 courses)`.

- [ ] **Step 5: Commit**

```bash
git add build.py engine/summary.js account/index.html tests/summary.js tests/account.js
git commit -m "feat(account): labs done per course; account domains are the tested ones

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---

### Task 7: Catalog categories

The catalog becomes three sections now; the "Start here" section arrives with the BMET pack in Plan B.

**Files:**
- Modify: `index.html`, `catalog.css`, `build.py` (`CATALOG_ORDER`)
- Test: `tests/catalog.js`

- [ ] **Step 1: Write the failing test**

In `tests/catalog.js`, before the final `if (fails.length)` line, add:

```js
  // ----- Catalog categories (Blake, 2026-10-12) -----
  {
    const w = run(null); const d = w.document;
    const heads = [...d.querySelectorAll('main section.cat > h2')].map(h => h.textContent.trim());
    check('the catalog has three category sections in order', heads.join('|') === 'AAMI certifications|CompTIA certifications|Tools for technicians', heads.join('|'));
    const under = id => [...d.querySelectorAll(`#${id} .card h3 a`)].map(a => a.getAttribute('href'));
    check('CBET sits under AAMI certifications', under('aami').join(',') === 'cbet/', under('aami').join(','));
    check('the four CompTIA courses sit under CompTIA certifications', under('comptia').join(',') === 'netplus/,secplus/,aplus1/,aplus2/', under('comptia').join(','));
    check('ServiceForge sits under Tools for technicians', under('tools').join(',') === 'serviceforge/', under('tools').join(','));
    check('every category has a one-line lede', [...d.querySelectorAll('main section.cat')].every(s => s.querySelector('p.cat-lede') && s.querySelector('p.cat-lede').textContent.trim().length > 20));
    check('How every course works is still on the page', /How every course works/.test(d.querySelector('main').textContent));
  }
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tests/catalog.js`
Expected: `the catalog has three category sections in order` prints `FAIL` with an empty list.

- [ ] **Step 3: Regroup the catalog**

In `index.html`, replace everything from `    <h2>Courses</h2>` through the closing `</div>` of the ServiceForge `cards` block (the line just before `    <h2>How every course works</h2>`) with:

```html
    <section class="cat" id="aami">
      <h2>AAMI certifications</h2>
      <p class="cat-lede">The credentials the Association for the Advancement of Medical Instrumentation issues to biomedical equipment technicians.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="cbet/">CBET Academy</a></h3>
          <p>AAMI Certified Biomedical Equipment Technician. 60 lessons, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="cbet/">Start the course</a>
          <span class="links"><a href="cbet/lessons/">Read free lessons</a> &middot; <a href="cbet/cheatsheet/">Cheat sheet</a></span>
        </div>
      </div>
    </section>
    <section class="cat" id="comptia">
      <h2>CompTIA certifications</h2>
      <p class="cat-lede">The IT fundamentals every technician gets asked for: networking, security, and hardware and software support.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="netplus/">NetPlus Academy</a></h3>
          <p>CompTIA Network+ N10-009. 49 lessons, a 14-page cheat sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="netplus/">Start the course</a>
          <span class="links"><a href="netplus/lessons/">Read free lessons</a> &middot; <a href="netplus/cheatsheet/">Cheat sheet</a></span>
        </div>
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="secplus/">SecPlus Academy</a></h3>
          <p>CompTIA Security+ SY0-701. 54 lessons, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="secplus/">Start the course</a>
          <span class="links"><a href="secplus/lessons/">Read free lessons</a> &middot; <a href="secplus/cheatsheet/">Cheat sheet</a></span>
        </div>
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="aplus1/">APlus Academy Core 1</a></h3>
          <p>CompTIA A+ Core 1 220-1201. 41 lessons, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="aplus1/">Start the course</a>
          <span class="links"><a href="aplus1/lessons/">Read free lessons</a> &middot; <a href="aplus1/cheatsheet/">Cheat sheet</a></span>
        </div>
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="aplus2/">APlus Academy Core 2</a></h3>
          <p>CompTIA A+ Core 2 220-1202. 41 lessons, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="aplus2/">Start the course</a>
          <span class="links"><a href="aplus2/lessons/">Read free lessons</a> &middot; <a href="aplus2/cheatsheet/">Cheat sheet</a></span>
        </div>
      </div>
    </section>
    <section class="cat" id="tools">
      <h2>Tools for technicians</h2>
      <p class="cat-lede">Working tools for the job itself, free to connect to the AI assistant you already use.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="serviceforge/">ServiceForge</a></h3>
          <p>A troubleshooting knowledge base for biomed and HTM technicians. Connect it to Claude, ChatGPT or Copilot and ask about faults, error codes, part numbers and PM intervals in your own words.</p>
          <a class="go" href="serviceforge/">Open ServiceForge</a>
        </div>
      </div>
    </section>
```

In the JSON-LD `ItemList` in the same file, reorder so CBET is position 1, then NetPlus 2, SecPlus 3, APlus Core 1 4, APlus Core 2 5 (the names and URLs stay as they are).

Append to `catalog.css`:

```css
/* Catalog categories */
section.cat + section.cat { margin-top: 8px; }
.cat-lede { color: var(--ink-2); margin: -4px 0 14px; max-width: 720px; }
```

In `build.py`, change `CATALOG_ORDER = ["netplus", "secplus", "cbet", "aplus1", "aplus2"]` to:

```python
CATALOG_ORDER = ["cbet", "netplus", "secplus", "aplus1", "aplus2"]
```

- [ ] **Step 4: Run the tests**

Run: `node tests/catalog.js && node tests/account.js && python build.py && npm test`
Expected: all pass. Open `dist/index.html` in a browser: three headed sections, each with its lede, the ServiceForge card last, "How every course works" below.

- [ ] **Step 5: Commit**

```bash
git add index.html catalog.css build.py tests/catalog.js
git commit -m "feat(catalog): AAMI, CompTIA, and Tools sections with a lede each; account order follows

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---

### Task 8: Static lesson pages, README, and the full verification

**Files:**
- Modify: `site/build-site.js` (`lessonPage`, `coursePage`), `site/site.css`
- Modify: `README.md`
- Test: `tests/site.js`

- [ ] **Step 1: Write the failing tests**

In `tests/site.js`, right after the line `check('course page lists non-free lessons as titles without links', ...);`, add:

```js
const labLesson = m.freeLessons.find(l => l.lab); const plainLesson = m.freeLessons.find(l => !l.lab);
check('mini: the fixture has a free lab lesson and a free plain lesson', !!labLesson && !!plainLesson);
const pLab = read(`mini/lessons/${site.slug(labLesson)}/index.html`); const pPlain = read(`mini/lessons/${site.slug(plainLesson)}/index.html`);
check('a lab lesson page carries the lab note after the hook', pLab.includes('<p class="lab-note">This lesson includes an interactive lab in the course.</p>') && pLab.indexOf('class="hook"') < pLab.indexOf('class="lab-note"'));
check('a lesson without a lab has no note', !pPlain.includes('lab-note'));
check('the lessons index marks the lab lesson', course.includes(`${esc(labLesson.title)}</a> <span class="muted">${labLesson.minutes} min</span> <span class="muted">lab</span>`), course.slice(course.indexOf(esc(labLesson.title)), course.indexOf(esc(labLesson.title)) + 120));
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tests/site.js`
Expected: `a lab lesson page carries the lab note` and `the lessons index marks the lab lesson` print `FAIL`; parity checks still pass.

- [ ] **Step 3: Implement**

In `site/build-site.js`, `lessonPage`: after the line

```js
  ${l.hook ? `<div class="hook"><span class="eyebrow">Remember</span><div>${R.inline(l.hook)}</div></div>` : ''}
```

add:

```js
  ${l.lab ? '<p class="lab-note">This lesson includes an interactive lab in the course.</p>' : ''}
```

In `coursePage`, the lessons list maps each lesson to an `<li>`. Change the free-lesson branch

```js
`<li><a href="${m.urls.lesson(l)}">${esc(l.title)}</a>${l.minutes ? ` <span class="muted">${l.minutes} min</span>` : ''}</li>`
```

to

```js
`<li><a href="${m.urls.lesson(l)}">${esc(l.title)}</a>${l.minutes ? ` <span class="muted">${l.minutes} min</span>` : ''}${l.lab ? ' <span class="muted">lab</span>' : ''}</li>`
```

and the non-free branch

```js
`<li><span>${esc(l.title)}</span> <span class="muted">in the course</span></li>`
```

to

```js
`<li><span>${esc(l.title)}</span> <span class="muted">in the course</span>${l.lab ? ' <span class="muted">lab</span>' : ''}</li>`
```

Append to `site/site.css`:

```css
.lab-note { background: var(--accent-soft); color: var(--ink); border-radius: 8px; padding: 10px 14px; margin: 0 0 16px; font-weight: 600; }
```

- [ ] **Step 4: README**

In `README.md`, insert this section immediately before the `## Testing` heading:

```markdown
## Labs, virtual instruments, untested domains, and the certificate

- **Labs.** A lesson with `lab: "<id>"` renders the lab in `FRA.labs[<id>]` (a `labs-*.js` file in the pack) between its Remember hook and its deeper explanation: intro, kit list, service-manual excerpt, an instrument panel, and a task sheet of readings, verdicts, and choices. Progress is `S.labs[id] = { done, at, values, ok }`, merged by the newer `at`, synced with the rest of the state. Home shows "Labs done". The self-test validates every lab against its instrument (`FRAInstruments.validate`): reading ranges must contain the computed reading, verdicts must match what the scenario's own limits imply.
- **Instruments** live in `engine/instruments.js`: `dmm`, `safety`, `monitor`, `infusion`, `defib`, plus `figures` (meter, cylinder, ECG strip) and `choices` (preformatted text). Readings are deterministic per lab id. The engine carries no limit or tolerance of its own; every number is in the lab's `scenario`. The app reads the module at render time, so a pack without labs never depends on it.
- **Untested domains.** A domain with `quota: 0` and `pct: 0` is course content outside the exam: in the rail and the course, with checkpoints, counted in lessons passed, never on the starter test, tests, bars, or the strength chart. Lessons in it show "Not on the exam".
- **Certificate.** A manifest with `certificate: true` adds a Progress card and `#certificate`: unlocked when every lesson is passed, every lab is done, and the official-format test is passed; printable, with the account's name or a typed one.
- **Catalog sections.** `index.html` groups courses under AAMI certifications, CompTIA certifications, and Tools for technicians; `tests/catalog.js` checks each card's section.
```

Also update the "Adding a file under engine/" note if the README has one to say eight registrations (build.py, tests/lib.js, five shells, tests/loaders.js).

- [ ] **Step 5: Full verification**

Run, in order:

```bash
node tests/site.js
npm test
python build.py
node site/build-site.js
node tests/loaders.js
```

Expected: every suite passes; `build.py` writes five course bundles plus callback, serviceforge, index, and account; `build-site.js` writes pages for every course; loaders print `all OK`.

Open `dist/cbet.html` and `dist/index.html` in a browser and click through Home, a lesson, Tests, Progress, and the catalog sections. Nothing visible changes on the five live courses except the catalog's section headings.

- [ ] **Step 6: Commit**

```bash
git add site/build-site.js site/site.css tests/site.js README.md
git commit -m "feat(site): lab note on static lesson pages; README for labs, instruments, untested domains, certificate

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvUK2uSwCNiqwFiavjF4ub"
```

---

## Done when

- `npm test` is green with the new suites (`tests/instruments.js`, the new blocks in engine, merge, summary, account, catalog, site).
- The mini fixture exercises an untested domain, a lab on a free lesson, and the certificate.
- The five live courses look the same except for the catalog sections.
- Plan B (the BMET content pack) can start: it needs only `courses/bmet/`, `bmet/index.html`, the catalog's "Start here" section, `CATALOG_ORDER`, the loaders test's `SHELLS`, and the JSON-LD list.
