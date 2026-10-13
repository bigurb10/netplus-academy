# BMET Academy Plan B: the content pack

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/bmet/`, the BMET Academy pack for the AAMI/ACI CABT exam: cheat sheet, 53 lessons in 8 units with deep dives, 265+ questions, 13 labs on the virtual instruments, 8 generators, an acronym glossary, the course page, the catalog's "Start here" section, the reference term checks, the four CBET touch-ups, and the CRES/CHTM roadmap note. Spec: `docs/superpowers/specs/2026-10-12-bmet-academy-design.md` (sections 2, 3, 4, 6, 8). Plan A (the engine) is merged at `a57e17a`.

**Architecture:** A course pack is plain data: `courses/bmet/*.js` files that fill `FRA.course`, `FRA.units`, `FRA.deep`, `FRA.questions`, `FRA.labs`, `FRA.generators`, `FRA.acronyms`, `FRA.cheatsheet`. The engine (`engine/app.js`, `engine/instruments.js`) renders them and the self-test validates them. Two small engine additions come first: a scenario-shape validator so a mis-shaped lab fails the self-test instead of rendering a confident wrong verdict, and the Home kit card the spec asks for. Everything else is content plus wiring (shell, catalog, build list, loaders test).

**Tech Stack:** Vanilla JS packs loaded as `<script>` tags, Node 20 + jsdom tests (`npm test`), `python build.py` bundler (PyMuPDF available for the PDF checks), headless Chrome for the cheat sheet PDF, `scripts/stage.sh` for staging.

## Global Constraints

- Course id `bmet`, name **BMET Academy**, badge `BM`, brand FieldReady Academy. Exam: vendor `AAMI / ACI`, title `Certified Associate in Biomedical Technology`, code `CABT`, 100 questions, 120 minutes, `passPct: 70`. Practice tests: 50 questions, 60 minutes, pass 80, 3 of the last 5. Domains and quotas exactly as in the manifest in Task 8 (quotas sum to 50; the official-format test apportions 10/23/16/14/24/13).
- 2026 handbook facts (verified in `E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf`): CABT fee **$220 member / $270 non-member**, retake **$190 / $240**, fees non-refundable, the exam must be taken within **six months** of purchase, a retake waits **60 days**, live remote proctoring year-round (Kryterion), eligibility high school junior or above, results pass/fail immediately and by email within 24 hours, valid **5 years, non-renewable**. Say "$220" not "$210" (an earlier note was wrong).
- Copy fixed by the spec and Plan A, verbatim: catalog headings `Start here: biomed basic training`, `AAMI certifications`, `CompTIA certifications`, `Tools for technicians`; lesson pill `Not on the exam`; Home stat `Labs done`; static-page note `This lesson includes an interactive lab in the course.`
- Blake's content rules: original content, no reference to any book or source anywhere in the pack; cheat sheet first; plain words (no internal jargon in user-facing text); every tested lesson has 5 or more questions, a deep dive, and a checkpoint; untested lessons (units 1 and 8, domain 7) also carry 5 questions each because checkpoints draw from the bank (`checkpointN: 4`).
- Safety numbers are copied from the CBET pack verbatim and must agree across lesson, deep dive, cheat sheet, lab manual, and generator: perception 1 mA; 5 mA accepted maximum harmless; let-go 10 to 20 mA; 50 mA pain, possible fainting, respiratory arrest; 100 to 300 mA ventricular fibrillation likely; 6 A and above sustained contraction and burns; microshock 10 microamps delivered directly to the heart; ground (chassis to plug ground pin) resistance 0.5 ohm maximum (NFPA 99); chassis (touch) leakage 500 microamps in current NFPA 99 editions (older editions 300 or 100); IEC 60601-1 touch current 100 microamps normal / 500 single fault; patient leakage type B and BF 100 / 500 microamps, type CF 10 / 50; earth leakage 5 mA / 10 mA; GFCI trip 4 to 6 mA; patient care vicinity 6 ft (1.8 m) and 7.5 ft (2.3 m); pulse oximetry red about 650 to 660 nm, infrared about 805 to 940 nm; full E cylinder about 2,000 to 2,200 psi, about 660 liters; wall outlets about 50 psi. State every limit with its standard (NFPA 99 or IEC 60601-1).
- Plain ASCII in every pack file and in this plan: write `ohm` and `microamps` (or `uA` on an instrument readout), `x` for multiply, `C` and `F` for temperatures, no em dashes, no degree signs. The Bash tool cannot pass non-ASCII; write content files with the Write tool, never a heredoc (heredocs also halve backslashes).
- Lesson objects keep the CBET line format exactly, because `build.py` reads them with regexes: the first line of every lesson is `id: "uNlM", title: "...", domain: N, obj: "...", minutes: N,` (add `lab: "<id>",` after `minutes` on that same line for lab lessons), then `body:` as a template literal, then `hook:`.
- Lab point names (DMM test points) use letters, digits, and `+` only, never `-` (the engine joins pairs with `-`). Battery terminals are `P` and `N`.
- The acronym test forbids a glossary entry from naming another course: in `courses/bmet/acronyms.js` entry text never write the literal tokens `CBET`, `Network+`, `Net+`, `Security+`, `Sec+`, or `A+`; write the credential's full name instead. The key `CBET` itself is allowed (and needed).
- Commit after every task; never push (Blake pushes). Work on branch `bmet-content` off `main`.

## Conventions every content task follows

Read these before writing any pack file. They are the contract the tests enforce.

**Mini-markup (lesson `body`, `hook`, deep dives, lab `intro` and `manual`):** `## ` heading, `- ` bullet, `1. ` step, `> ` tip line, ``` fenced block (tables and diagrams; inside a JS template literal the fence is written `\`\`\``), `{{text}}` inline code, `**text**` bold. `tests/packcheck.js` requires every body to have at least 180 words, a `## ` heading, a `> ` tip line, and balanced fences; every deep dive at least 300 words with balanced fences.

**Curriculum file shape** (`courses/bmet/curriculum-N.js`):

```js
// BMET Academy curriculum, units 1 to 3. Original teaching content for the AAMI/ACI CABT exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Welcome to Healthcare Technology Management", domain: 7,
  blurb: "What a biomed does, how the CABT exam works, and the kit you will use for the labs.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "What a BMET Does", domain: 7, obj: "Career", minutes: 8,
      body: `...`,
      hook: "..."
    }
  ]
});
```

Unit `domain` is the domain its lessons belong to. `obj` is the outline letter the lesson serves, written `A&P-A`, `MD-B`, `SAF-C`, `E&E-D`, `RPS-A`, `HIT-E`, or `Career` for units 1 and 8.

**Deep file shape** (`courses/bmet/deep-N.js`): `Object.assign(FRA.deep, { u1l1: \`...\`, u1l2: \`...\` })` with one key per lesson in that file's units. Fenced tables are the house style for "what to memorize" blocks.

**Questions file shape** (`courses/bmet/questions-N.js`): `FRA.questions.push({id:"u1l1-1",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."}, ...)`. Ids `<lesson>-<n>`. Stems are scenarios a new technician meets, at least 20 characters; four distinct options; explanations at least 40 characters that teach the rule, not just the answer. No two stems share their first 70 characters. After writing a file run `node tests/balance-keys.js courses/bmet/questions-N.js` so correct answers spread across A to D.

**Labs file shape** (`courses/bmet/labs-N.js`): exactly the objects given in Tasks 4 to 6. Every lab has `id`, `lesson`, `title`, `instrument`, `intro`, optional `kit` (kit labs only) and `manual`, `scenario`, `tasks`, `why` with one entry per task. Task kinds: `reading` (`unit`, `expect: [min, max]`, optional `measure`), `verdict` (`expect: "pass" | "fail"`), `choice` (`options`, `expect: index`). Validate with `node tests/labcheck.js courses/bmet` (Task 1 adds it).

**Acronyms** (`courses/bmet/acronyms.js`): `FRA.acronyms = { "KEY": { full, tip, more } }` plus `FRA.acronymIgnore = [...]` for uppercase words that are not acronyms (`MOST`, `FIRST`, `OL`, `ON`, `OFF`, `II`, `III`). `node tests/acronyms.js courses/bmet` must pass after every content task: every acronym-looking token in lessons, hooks, deep dives, cheat sheet, exam-day tips, and questions is a key or ignored, and no key is unused.

**Generators** (`courses/bmet/generators.js`): the shape in Task 7. `node tests/gen-smoke.js courses/bmet 500` must report 0 problems (four unique options, a real correct index, no `(1)` filler).

**Pack tools:** `node tests/packcheck.js courses/bmet` (structure, counts, deep coverage, key skew), `node tests/balance-keys.js <file>`, `node tests/labcheck.js courses/bmet`, `node tests/acronyms.js courses/bmet`, `node tests/gen-smoke.js courses/bmet 500`. The full `npm test` only picks the pack up once `courses/bmet/course.js` exists (Task 8).

## File structure

Create:
- `tests/labcheck.js` (Task 1): validates a pack's labs without `course.js`.
- `courses/bmet/cheatsheet.js`, `courses/bmet/acronyms.js` (Task 3; acronyms grows in every later task).
- `courses/bmet/curriculum-1.js`, `deep-1.js`, `questions-1.js`, `labs-1.js` (Task 4: units 1 to 3).
- `courses/bmet/curriculum-2.js`, `deep-2.js`, `questions-2.js`, `labs-2.js` (Task 5: units 4 and 5).
- `courses/bmet/curriculum-3.js`, `deep-3.js`, `questions-3.js`, `labs-3.js` (Task 6: units 6 to 8).
- `courses/bmet/generators.js` (Task 7).
- `courses/bmet/course.js`, `bmet/index.html` (Task 8).
- `docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md` (Task 11).

Modify:
- `engine/instruments.js` and `tests/instruments.js` (Task 1: shape validator, meter tick labels).
- `engine/app.js` and `tests/engine.js` (Task 2: Home kit card).
- `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `build.py`, `scripts/stage.sh`, `README.md` (Task 8).
- `courses/cbet/curriculum-1.js`, `curriculum-3.js`, `deep-1.js`, `deep-3.js` (Task 10).

---

### Task 1: Scenario-shape validator, meter tick labels, and the labcheck tool

**Files:**
- Modify: `engine/instruments.js` (validate() at lines 145 to 174; figure() meter tick label at line 198)
- Modify: `tests/instruments.js` (append before the final `if (fails.length)` block)
- Create: `tests/labcheck.js`

**Interfaces:**
- Consumes: `FRAInstruments.validate(lab) -> string[]`, `FRAInstruments.measure`, `FRAInstruments.truth.verdict` (unchanged signatures).
- Produces: `validate` now also reports `lab id must match /^[a-z0-9-]+$/`, `lab has no lesson`, `lab has no title`, and one sentence per scenario-shape problem (listed in Step 3). `node tests/labcheck.js courses/<id>` exits 1 with `  - <lab>: <problem>` lines or prints `labcheck: OK`. Tasks 4 to 6 run it after every labs file.

- [ ] **Step 1: Write the failing tests**

Append to `tests/instruments.js` just above `if (fails.length) { console.error(...` :

```js
// ---------- validate: scenario shape per instrument, and the lab header (Plan B, Task 1) ----------
const shapeProblems = (instrument, scenario) => I.validate(lab(instrument, scenario, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { a: 'w' } }));
check('shape: a lab without id, lesson, or title is reported', (() => { const p = I.validate({ instrument: 'choices', scenario: { text: 't' }, tasks: [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], why: { a: 'w' } }); return p.some(x => /lab id/.test(x)) && p.some(x => /lesson/.test(x)) && p.some(x => /title/.test(x)); })());
check('shape: a safety table missing a condition key is reported', shapeProblems('safety', Object.assign({}, SAFE, { chassis: { normal: 45, reverse: 60 } })).some(p => /chassis/.test(p) && /normal-open/.test(p)));
check('shape: a safety scenario without limits is reported', shapeProblems('safety', Object.assign({}, SAFE, { limits: null })).some(p => /limits/.test(p)));
check('shape: a safety reading with no matching limit is reported', shapeProblems('safety', Object.assign({}, SAFE, { limits: { ground: 0.5 } })).some(p => /limits\.chassis/.test(p)));
check('shape: a monitor scenario with a partial tolerance is reported', shapeProblems('monitor', Object.assign({}, MON, { tolerance: { hr: 2 } })).some(p => /tolerance/.test(p)));
check('shape: a monitor scenario missing an offset is reported', shapeProblems('monitor', { hrErr: 1, tolerance: { hr: 2, spo2: 2, nibp: 3 } }).some(p => /spo2Err/.test(p)));
check('shape: an infusion scenario without a numeric tolerance is reported', shapeProblems('infusion', Object.assign({}, INF, { tolerance: '5' })).some(p => /tolerance/.test(p)));
check('shape: an infusion scenario without rateErr is reported', shapeProblems('infusion', { cylinderMl: 100, graduation: 1, tolerance: 5 }).some(p => /rateErr/.test(p)));
check('shape: a defib scenario with no energies is reported', shapeProblems('defib', Object.assign({}, DEF, { energies: [] })).some(p => /energies/.test(p)));
check('shape: a defib scenario without a tolerance is reported', shapeProblems('defib', Object.assign({}, DEF, { tolerance: {} })).some(p => /tolerance/.test(p)));
check('shape: a dmm scenario needs an svg and points', shapeProblems('dmm', { vdc: { 'A-B': 9 } }).some(p => /svg/.test(p)) && shapeProblems('dmm', { svg: '<svg viewBox="0 0 10 10"></svg>', vdc: { 'A-B': 9 } }).some(p => /points/.test(p)));
check('shape: a dmm table pair must name drawn points', shapeProblems('dmm', { svg: '<svg viewBox="0 0 10 10"></svg>', points: { A: [1, 1] }, vdc: { 'A-B': 9 } }).some(p => /not drawn: B/.test(p)));
check('shape: a dmm point name with a dash is reported', shapeProblems('dmm', { svg: '<svg viewBox="0 0 10 10"></svg>', points: { 'B-': [1, 1] }, vdc: {} }).some(p => /point name/.test(p)));
check('shape: a dmm scenario with no readings table is reported', shapeProblems('dmm', { svg: '<svg viewBox="0 0 10 10"></svg>', points: { A: [1, 1] } }).some(p => /readings table/.test(p)));
check('shape: figures need a non-empty figures array of known kinds', shapeProblems('figures', { figures: [] }).some(p => /figures/.test(p)) && shapeProblems('figures', { figures: [{ kind: 'gauge', value: 1 }] }).some(p => /kind/.test(p)));
check('shape: a strip figure needs a value equal to its rate', shapeProblems('figures', { figures: [{ kind: 'strip', rate: 100, seconds: 6 }] }).some(p => /value/.test(p)) && shapeProblems('figures', { figures: [{ kind: 'strip', rate: 100, value: 80, seconds: 6 }] }).some(p => /value/.test(p)) && shapeProblems('figures', { figures: [{ kind: 'strip', rate: 100, value: 100, seconds: 6 }] }).length === 0);
check('shape: choices need text', shapeProblems('choices', {}).some(p => /text/.test(p)));
check('shape: the sound fixtures report nothing', ['safety', 'monitor', 'infusion', 'defib'].every(n => shapeProblems(n, { safety: SAFE, monitor: MON, infusion: INF, defib: DEF }[n]).length === 0) && shapeProblems('dmm', Object.assign({ svg: '<svg viewBox="0 0 200 100"></svg>', points: { A: [1, 1], B: [2, 2], C: [3, 3], P: [4, 4], N: [5, 5], X: [6, 6], Y: [7, 7], D: [8, 8], E: [9, 9] } }, DMM)).length === 0);
check('figure: meter tick labels carry no float noise', (() => { const s = I.figure({ kind: 'meter', min: 0, max: 0.3, value: 0.1, unit: 'A' }); return !/\d\.\d{7,}/.test(s) && />0\.15</.test(s) && />0\.3</.test(s); })());
```

(Tick labels print at i = 0, 5, and 10, so a 0 to 0.3 meter labels 0, 0.15, and 0.3; the raw arithmetic for 0.15 is `0.3 * 5 / 10`, which prints as `0.15000000000000002` before the fix.)

- [ ] **Step 2: Run the suite to see the new checks fail**

Run: `node tests/instruments.js 2>&1 | grep -c FAIL`
Expected: `15` or more FAIL lines (every `shape:` check except "sound fixtures" fails because validate reports nothing yet; "lab without id" fails; the meter check passes or fails depending on float formatting, either is fine here).

- [ ] **Step 3: Implement the shape validator and the header checks**

In `engine/instruments.js`, insert this block immediately before `// ---------- validate: every way a lab record can be wrong, as plain sentences ----------`:

```js
  // ---------- shape: what each instrument needs in its scenario, as plain sentences ----------
  // The truth functions above return null on an incomplete scenario, which lets an authored verdict
  // pass validate unchecked. These checks make the gaps loud (Plan A final review, items 3 and
  // "deferred to Plan B").
  const isNum = v => typeof v === 'number' && isFinite(v);
  const COND = ['normal', 'reverse', 'normal-open', 'reverse-open'];
  const DMM_TABLES = ['vdc', 'vac', 'ohm', 'adc', 'cont', 'diode'];
  const FIG_KINDS = ['meter', 'cylinder', 'strip'];
  function shape(lab) {
    const out = []; const p = s => out.push(s); const sc = obj(lab.scenario);
    switch (lab.instrument) {
      case 'safety': {
        if (!isNum(sc.ground)) p('safety scenario needs a numeric ground resistance');
        ['chassis', 'lead'].forEach(k => { if (sc[k] == null) return; const t = obj(sc[k]); COND.forEach(c => { if (!isNum(t[c])) p(`safety ${k} table is missing the ${c} condition`); }); });
        if (!sc.limits || typeof sc.limits !== 'object') { p('safety scenario needs limits { ground, chassis, lead }'); break; }
        ['ground', 'chassis', 'lead'].forEach(k => { if (sc[k] != null && !isNum(sc.limits[k])) p(`safety scenario has a ${k} reading but no limits.${k}`); });
        break;
      }
      case 'monitor': {
        ['hrErr', 'spo2Err', 'sysErr', 'diaErr'].forEach(k => { if (!isNum(sc[k])) p(`monitor scenario needs a numeric ${k}`); });
        const t = sc.tolerance; if (!t || typeof t !== 'object' || !isNum(t.hr) || !isNum(t.spo2) || !isNum(t.nibp)) p('monitor scenario needs tolerance { hr, spo2, nibp } as numbers');
        break;
      }
      case 'infusion':
        if (!isNum(sc.rateErr)) p('infusion scenario needs a numeric rateErr (a fraction)');
        if (!isNum(sc.tolerance)) p('infusion scenario needs a numeric tolerance in percent');
        if (sc.cylinderMl != null && !(sc.cylinderMl > 0)) p('infusion cylinderMl must be positive');
        if (sc.graduation != null && !(sc.graduation > 0)) p('infusion graduation must be positive');
        break;
      case 'defib': {
        if (!Array.isArray(sc.energies) || !sc.energies.length || !sc.energies.every(isNum)) p('defib scenario needs a non-empty numeric energies list');
        const t = obj(sc.tolerance); if (!isNum(t.pct) && !isNum(t.floor)) p('defib scenario needs tolerance { pct, floor } with at least one number');
        if (sc.deliveredErr != null && typeof sc.deliveredErr !== 'object') p('defib deliveredErr must map an energy to a fraction');
        break;
      }
      case 'dmm': {
        if (typeof sc.svg !== 'string' || !/<svg\b/i.test(sc.svg)) p('dmm scenario needs an svg drawing');
        const pts = sc.points && typeof sc.points === 'object' ? sc.points : null;
        if (!pts || !Object.keys(pts).length) p('dmm scenario needs points: { name: [x, y] }');
        else Object.keys(pts).forEach(k => {
          if (!/^[A-Za-z0-9+]+$/.test(k)) p(`dmm point name "${k}" may use letters, digits, and + only`);
          const xy = pts[k]; if (!Array.isArray(xy) || xy.length !== 2 || !isNum(xy[0]) || !isNum(xy[1])) p(`dmm point ${k} needs [x, y]`);
        });
        const tables = DMM_TABLES.filter(t => sc[t] && typeof sc[t] === 'object');
        if (!tables.length) p('dmm scenario has no readings table (vdc, vac, ohm, adc, cont, or diode)');
        if (pts) tables.forEach(t => Object.keys(sc[t]).forEach(k => {
          const ends = k.split('-');
          if (ends.length !== 2) p(`dmm ${t} key "${k}" must be "pointA-pointB"`);
          else ends.forEach(e => { if (!Object.prototype.hasOwnProperty.call(pts, e)) p(`dmm ${t} pair "${k}" names a point that is not drawn: ${e}`); });
        }));
        break;
      }
      case 'figures': {
        const figs = sc.figures;
        if (!Array.isArray(figs) || !figs.length) { p('figures scenario needs a non-empty figures array'); break; }
        figs.forEach((f, i) => {
          if (!f || FIG_KINDS.indexOf(f.kind) < 0) p(`figure ${i + 1}: kind must be meter, cylinder, or strip`);
          else if (f.kind === 'strip' && (f.value == null || num(f.value) !== num(f.rate))) p(`figure ${i + 1}: a strip needs value equal to its rate so a task can measure it`);
        });
        break;
      }
      case 'choices':
        if (typeof sc.text !== 'string' || !sc.text.trim()) p('choices scenario needs text');
        break;
    }
    return out;
  }
```

Then change the head of `validate` so it reads:

```js
  function validate(lab) {
    const out = []; const p = s => out.push(s);
    if (!lab || typeof lab !== 'object') return ['lab is not an object'];
    if (!lab.id || !/^[a-z0-9-]+$/.test(lab.id)) p('lab id must match /^[a-z0-9-]+$/');
    if (!lab.lesson) p('lab has no lesson');
    if (!lab.title) p('lab has no title');
    if (NAMES.indexOf(lab.instrument) < 0) p(`unknown instrument "${lab.instrument}"`);
    if (!lab.scenario || typeof lab.scenario !== 'object') p('scenario is missing'); else shape(lab).forEach(p);
    if (!Array.isArray(lab.tasks) || !lab.tasks.length) { p('no tasks'); return out; }
```

(the rest of `validate` is unchanged).

Fix the meter tick label on line 198: replace `${min + (max - min) * i / 10}` with `${Number((min + (max - min) * i / 10).toPrecision(6))}`.

- [ ] **Step 4: Run the suite**

Run: `node tests/instruments.js 2>&1 | tail -3`
Expected: `All instrument tests passed.` Also run `node tests/selftest.js 2>&1 | tail -2` (the mini fixture lab has id, lesson, title, and text, so it still validates) and `node tests/engine.js 2>&1 | tail -2`: both pass.

- [ ] **Step 5: Create the labcheck tool**

Create `tests/labcheck.js`:

```js
// Validates every lab in a course pack without course.js: loads curriculum-*.js and labs-*.js in jsdom,
// runs FRAInstruments.validate on each lab, and checks the lesson <-> lab links both ways.
// Usage: node tests/labcheck.js courses/bmet
'use strict';
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const I = require('../engine/instruments.js');
const dir = path.resolve(process.argv[2] || 'courses/bmet');
const files = fs.readdirSync(dir).filter(f => /^(curriculum|labs)(-[^.]+)?\.js$/.test(f)).sort();
const w = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' }).window;
for (const f of files) w.eval(fs.readFileSync(path.join(dir, f), 'utf8'));
const FRA = w.FRA || {}; const labs = FRA.labs || {}; const problems = [];
const lessons = {}; (FRA.units || []).forEach(u => (u.lessons || []).forEach(l => { lessons[l.id] = l; }));
for (const id of Object.keys(labs)) {
  const lab = labs[id];
  if (lab.id !== id) problems.push(`${id}: id field is "${lab.id}"`);
  const l = lessons[lab.lesson];
  if (!l) problems.push(`${id}: lesson ${lab.lesson} does not exist`);
  else if (l.lab !== id) problems.push(`${id}: lesson ${lab.lesson} points at lab "${l.lab}"`);
  I.validate(lab).forEach(p => problems.push(`${id}: ${p}`));
}
Object.keys(lessons).forEach(k => { const l = lessons[k]; if (l.lab && !labs[l.lab]) problems.push(`${k}: lab "${l.lab}" is not defined`); });
const withLab = Object.values(lessons).filter(l => l.lab).length;
console.log(`${path.basename(dir)}: ${Object.keys(labs).length} labs on ${withLab} lessons; instruments ${[...new Set(Object.values(labs).map(l => l.instrument))].join(', ') || 'none'}`);
if (problems.length) { console.log(problems.map(p => '  - ' + p).join('\n')); process.exit(1); }
console.log('labcheck: OK');
```

- [ ] **Step 6: Run labcheck on the mini fixture**

Run: `node tests/labcheck.js tests/fixtures/mini`
Expected:
```
mini: 1 labs on 1 lessons; instruments choices
labcheck: OK
```

- [ ] **Step 7: Commit**

```bash
git checkout -b bmet-content
git add engine/instruments.js tests/instruments.js tests/labcheck.js
git commit -m "feat(engine): instruments validate the scenario shape per instrument and the lab header; labcheck tool; meter tick labels without float noise"
```

---

### Task 2: Home kit card (manifest `kit` and `kitLab`)

Spec section 2: "The kit list, printed in u1l3 and on the course Home until the kit lab is done." Plan A did not build the Home half.

**Files:**
- Modify: `engine/app.js` (viewHome at line 627; add `kitCard()` next to `cheatCallout()` at line 1288)
- Modify: `tests/engine.js` (append a block before the final failure summary)

**Interfaces:**
- Consumes: `course.kit: string[]` and `course.kitLab: "<lab id>"` from the manifest (Task 8 sets them); `labDone(id)`, `LABS`, `L`, `inline()`, `esc()` already in app.js.
- Produces: a `.kit-card` section on Home while the kit lab is not done; nothing when the manifest has no `kit`.

- [ ] **Step 1: Write the failing test**

Append to `tests/engine.js` before the final `if (fails.length)` summary (keep the file's existing helpers `boot`, `act`, `check`, `ROOT`, `path`):

```js
  // ----- Home kit card: shown until the kit lab is done (BMET spec section 2; Plan B Task 2) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const withKit = x => { x.FRA.course.kit = ['Digital multimeter', 'Breadboard and jumpers']; x.FRA.course.kitLab = 'mini-ping'; };
    let w = boot({ courseDir: mini, beforeApp: withKit });
    act(w, 'go', 'home');
    const card = w.$('.kit-card');
    check('home shows the kit card with every item and a link to the kit lab', !!card && /Digital multimeter/.test(card.textContent) && /Breadboard and jumpers/.test(card.textContent) && !!card.querySelector('[data-act="lesson"][data-arg="u1l2"]'), card && card.textContent.slice(0, 120));
    // Finish the fixture lab: one choice, one reading, one verdict (the same actions the lab card's buttons send).
    act(w, 'lesson', 'u1l2');
    act(w, 'lab-answer', 'who:0');
    w.$('#lab-loss').value = '50'; act(w, 'lab-check', 'loss');
    act(w, 'lab-answer', 'ok:fail');
    check('the fixture lab is done', /LAB DONE/.test(w.$('#lab').textContent));
    act(w, 'go', 'home');
    check('home hides the kit card once the kit lab is done', !w.$('.kit-card'));
    w = boot({ courseDir: mini });
    act(w, 'go', 'home');
    check('a manifest without a kit shows no kit card', !w.$('.kit-card'));
    w.close();
  }
```

- [ ] **Step 2: Run the engine suite to see it fail**

Run: `node tests/engine.js 2>&1 | grep -E "kit card|fixture lab is done"`
Expected: `FAIL  home shows the kit card ...` (the other two may pass vacuously; that is fine).

- [ ] **Step 3: Implement the card**

In `engine/app.js`, directly after the `cheatCallout()` function (line 1288 region), add:

```js
  // The lab kit, listed on Home until the kit lab (course.kitLab) is done. Spec section 2.
  function kitCard() {
    const kit = Array.isArray(course.kit) ? course.kit : [];
    if (!kit.length || (course.kitLab && labDone(course.kitLab))) return '';
    const lab = course.kitLab ? LABS[course.kitLab] : null; const l = lab ? L[lab.lesson] : null;
    return `<div class="card stack kit-card" style="gap:8px"><div class="row spread"><h3>Your lab kit</h3>${l ? `<button class="btn small" data-act="lesson" data-arg="${esc(l.id)}">Open the kit lab</button>` : ''}</div>
      <p class="ink2">About $60 to $100 of parts. No kit yet? Every kit lab also runs on the virtual meter.</p>
      <div class="lab-kit"><ul>${kit.map(k => `<li>${inline(k)}</li>`).join('')}</ul></div></div>`;
  }
```

In `viewHome()`, change the line `${S.seen.cheat ? '' : cheatCallout()}` to:

```js
      ${S.seen.cheat ? '' : cheatCallout()}
      ${kitCard()}
```

- [ ] **Step 4: Run the engine suite and the whole test script**

Run: `node tests/engine.js 2>&1 | tail -2` then `npm test 2>&1 | tail -3`
Expected: `All engine tests passed.`; every suite green. If `the fixture lab is done` fails, read the `lab-answer` and `lab-check` handlers at `engine/app.js` lines 1470 to 1480 and the earlier lab test in `tests/engine.js` (around line 790) and send the same actions they do.

- [ ] **Step 5: Commit**

```bash
git add engine/app.js tests/engine.js
git commit -m "feat(engine): Home lists the lab kit until the kit lab is done (manifest kit and kitLab)"
```

---

### Task 3: Cheat sheet and the first acronym glossary

Blake's rule: the cheat sheet comes before any lesson. Target about 12 printed pages (CBET's 545-line sheet prints to 18; aim for roughly 380 to 420 lines).

**Files:**
- Create: `courses/bmet/cheatsheet.js`
- Create: `courses/bmet/acronyms.js`

**Interfaces:**
- Produces: `FRA.cheatsheet = { title, intro, sections: [{ id, title, blocks: [{ type: "table", cols, rows } | { type: "list", title, cols: 2, items } | { type: "note", text }] }] }` and `FRA.acronyms` + `FRA.acronymIgnore`. Later tasks add glossary keys; they never rename these section ids.

- [ ] **Step 1: Write `courses/bmet/cheatsheet.js`**

Header and shape (copy exactly, then fill the sections):

```js
// BMET Academy memorization sheet for the AAMI/ACI CABT exam. Numbers, normal ranges, limits, formulas,
// device facts, and orders of steps a new technician must recall cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "BMET Memorization Sheet",
  intro: "Print this and keep it beside you through the course and the labs. The CABT asks for the basics a first-year technician uses every day: normal values, safety limits, Ohm's law, unit conversions, what each device does, and which tool does which job. Every number on this sheet is fair game.",
  sections: [ ... ]
};
```

Sections, in this order, with the rows each must contain (add more rows freely; never fewer):

1. `exam` "The exam itself": table of facts (certifying body ACI; 100 multiple-choice questions; 2 hours, closed book; live remote proctoring year-round through Kryterion; on-screen four-function calculator; six domains with the percentages 10 / 23 / 16 / 14 / 24 / 13 named in full; results pass or fail, immediately and by email within 24 hours; no published cut score, this course uses 70%; fee $220 member / $270 non-member, retake $190 / $240; six months to test after purchase; 60-day retake wait; valid 5 years, non-renewable; eligibility high school junior or above). One `note` block: Reasoning and Devices are 47% of the exam; every device question asks what it does, what it measures or delivers, and which tool checks it.
2. `anatomy` "Anatomy, physiology, and terminology": the vital-signs table (heart rate 60 to 100; respiratory rate 12 to 20; blood pressure about 120/80, MAP = diastolic + (systolic minus diastolic) / 3; SpO2 95 to 100%; EtCO2 35 to 45 mmHg; temperature 37 C = 98.6 F, fever above about 38 C; tidal volume about 500 mL; each with the device that measures it); a systems table (circulatory, respiratory, nervous, digestive, urinary, endocrine, musculoskeletal, integumentary: key organs, what it does, what the technician's devices do with it); a two-column list of directional terms and word parts (anterior/posterior, superior/inferior, medial/lateral, proximal/distal, supine/prone; brady-, tachy-, hyper-, hypo-, a-/an-, dys-; cardio, pulmo/pneumo, nephro/reno, neuro, gastro, derm, hemo; -itis, -ectomy, -oscopy, -graphy, -gram, -emia); a heart table (four chambers, valves, SA node, P wave, QRS, T wave, systole/diastole); a blood row (red cells carry oxygen in hemoglobin, white cells fight infection, platelets clot, plasma carries the rest).
3. `electricity` "Electricity and electronics": Ohm's law table (V = I x R, I = V / R, R = V / I, P = V x I, P = I squared x R, P = V squared / R, with units); prefixes table (kilo 1,000; milli 1/1,000; micro 1/1,000,000; 1 A = 1,000 mA = 1,000,000 microamps; 1 kohm = 1,000 ohm; 1 Mohm = 1,000,000 ohm); resistor color code table (black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9; third band multiplier; gold 5%, silver 10%; worked example brown-black-red-gold = 1,000 ohm 5%); series versus parallel table (series: same current, voltages add, resistances add, one open stops everything; parallel: same voltage, currents add, total resistance below the smallest branch, product over sum for two); DC versus AC table (DC steady one direction, batteries, red +, black -; AC reverses, US 120 V 60 Hz, elsewhere 230 V 50 Hz; 120 V RMS peaks about 170 V; transformers work only on AC, turns ratio sets voltage; rectifier turns AC to DC inside a power supply); components list (capacitor stores charge, farads, can hold a charge after power off; inductor/coil, henries; diode one-way, 0.6 to 0.7 V drop; LED 1.8 to 3.3 V, needs a series resistor, long leg is the anode; transistor switch or amplifier; fuse one-time, breaker resettable, replace a fuse with the same rating and find the cause; switch; transformer); schematic symbols list in words (battery long line positive, resistor zigzag or box, lamp, switch, fuse, ground, chassis, capacitor two plates, diode arrow and bar); wire color table (US building: black or red hot, white neutral, green or bare ground; IEC cord: brown live, blue neutral, green-yellow ground; DC: red +, black -); AWG note (lower number = thicker wire); battery chemistry table (alkaline 1.5 V per cell, NiMH 1.2 V, lithium coin 3 V, lithium-ion 3.6 to 3.7 V, lead-acid 2 V per cell; capacity in Ah or mAh; series adds voltage, parallel adds capacity); ESD list (static you feel is about 3,000 V, 100 V can damage a chip, wrist strap, mat, bags, humidity); opens and shorts row (open = infinite resistance, no current, full source voltage across the open; short = near zero resistance, large current, heat, blown fuse).
4. `reasoning` "Math, measurement, and reasoning": conversions table (1 L = 1,000 mL; 1 kg = 1,000 g = 2.2 lb; 1 inch = 2.54 cm; 1 mmHg = 1.36 cmH2O; 1 psi = 51.7 mmHg; atmosphere 14.7 psi = 760 mmHg; 1 kPa = 7.5 mmHg; F = C x 9/5 + 32; C = (F minus 32) x 5/9; 37 C = 98.6 F; 0 C = 32 F; 100 C = 212 F; mL/h to mL/min divide by 60); percent error and tolerance table (percent error = (measured minus expected) / expected x 100, keep the sign; tolerance band = expected x percent; pass when the absolute error is inside the band; worked example 37 mL against 40 mL = -7.5%, fails a 5% band); ECG paper table (25 mm/s; small box 1 mm = 0.04 s; large box 5 mm = 0.2 s; 1 mV = 10 mm; rate = 300 / large boxes between R waves; rate = 1,500 / small boxes; six-second strip x 10); reading scales list (read at eye level to avoid parallax; read the bottom of the meniscus; read to the nearest graduation and estimate one more digit; accuracy is closeness to truth, precision is repeatability); graphs and tables list (read the axis label and unit first; a trend rising across PMs predicts failure; look up the row then the column); flowchart and elimination list (diamond = decision, rectangle = step, oval = start or end; simplest cause first; one change at a time; swap a suspected accessory with a known-good one; patient, then user, then accessory, then device); service manual list (sections: safety, specifications, theory of operation, setup, PM procedure and interval, calibration, troubleshooting and error codes, parts list, schematics; IFU is for the user, service manual is for you); work order list (asset ID, problem reported, what you found, what you did, parts, time, test results and pass/fail, your name and date).
5. `safety` "Safety in healthcare": the shock current table (verbatim numbers from Global Constraints); the IEC 60601-1 limits table (verbatim); the NFPA 99 and facility table (ground 0.5 ohm; chassis leakage 500 microamps current editions, older 300 or 100; patient care vicinity 6 ft and 7.5 ft; GFCI trip 4 to 6 mA; hospital-grade receptacle green dot; no extension cords or cheater adapters for patient care equipment; relocatable power taps only where allowed, never daisy-chained); classes and applied-part types list (Class I protective earth; Class II double insulation square-in-square; internally powered; type B stick figure, BF figure in a box, CF heart in a box; defibrillation-proof paddles symbol; macroshock through the skin in milliamps, microshock to the heart in microamps); safety analyzer sequence row (visual and cord check, ground resistance, chassis leakage normal / reversed polarity / open ground / open neutral, patient lead leakage; test at incoming inspection, after repair, and on the PM schedule); LOTO steps list (notify, shut down, isolate the energy source, lock and tag, release stored energy, verify zero energy; only the person who placed a lock removes it); HazCom and SDS list (GHS pictograms; SDS has 16 sections; sections 2 hazards, 4 first aid, 5 fire, 7 handling and storage, 8 exposure controls and PPE); medical gas table (oxygen green; medical air yellow; nitrous oxide blue; nitrogen black; carbon dioxide gray; vacuum white; full E cylinder about 2,000 to 2,200 psi and about 660 liters; wall outlets about 50 psi; pin index and DISS fittings are gas-specific, no adapters, no oil on oxygen fittings; cylinders secured upright; zone valves shut off an area); signage and symbols list (radiation trefoil; laser class and wavelength; biohazard; MRI zones I to IV, the magnet is always on, no ferrous tools; oxygen in use; consult instructions symbol; warning triangle); infection control list (hand hygiene first and last; standard precautions treat all blood and body fluids as infectious; PPE on: gown, mask, eye protection, gloves; off: gloves, eye protection, gown, mask; N95 for airborne; sharps in the sharps container; Spaulding: critical sterilize, semi-critical high-level disinfect, non-critical low-level disinfect; clean a device before it comes to the bench); device hazards list (X-ray: ALARA, time, distance, shielding, dosimeter; defibrillator: stored charge, clear the patient, disarm; electrosurgery burns and the return electrode; centrifuge rotor and lid lock; lasers: eyewear; fire: RACE and PASS, class A B C K); mechanical row (beds, lifts, pinch points, lifting technique).
6. `devices` "Medical devices and test equipment": diagnostic devices table (otoscope, ophthalmoscope, thermometer types, scales, bladder scanner, EKG cart, microscope, centrifuge: what it does, a key check); monitoring table (ECG, NIBP, SpO2, EtCO2, temperature, telemetry: what it measures, normal value, how it is verified, the common false alarm); therapeutic table (large-volume infusion pump, syringe pump, PCA pump, feeding pump, suction, defibrillator and AED, patient warming and cooling, SCD, physical therapy equipment: what it delivers, settings, the PM check); defibrillator energy row (biphasic adult 120 to 200 J, monophasic 360 J, pediatric 2 to 4 J/kg, analyzer load 50 ohm, charge time, sync); infusion row (rate in mL/h, VTBI, KVO, flow check by 30-minute collection, typical accuracy plus or minus 5%, occlusion and air-in-line alarms, free-flow protection); hand tools table (graduated cylinder, stopwatch, Allen keys metric and SAE, torque wrench in-lb or N-m, channel locks, needle-nose pliers, diagonal cutters, wire stripper, vice grips, Torx and security bits, nut drivers: the job each is for and the misuse to avoid); test equipment table (multimeter: volts across, amps in series, ohms unpowered; electrical safety analyzer: ground resistance and leakage; patient simulator: ECG, SpO2, NIBP signals, draws no current; defibrillator analyzer: delivered energy and charge time; infusion analyzer or cylinder and stopwatch; tachometer: RPM; scale and calibration weights); incoming inspection steps list (packing slip against the order, physical inspection, accessories and manuals, asset tag and CMMS entry, electrical safety test, function test per manual, configuration, user training, release); PM steps list (visual, clean, safety test, function and calibration checks, consumables such as batteries and filters, label, document); first troubleshooting checks list (power and battery, outlet, fuse or breaker, cables and connectors, swap the accessory, user versus device, error code lookup, restart, escalate and document).
7. `it` "Healthcare IT": computer parts table (CPU, RAM volatile, HDD spinning, SSD no moving parts, GPU, power supply, motherboard, BIOS/UEFI, operating system, drivers, local USB printer versus network IP printer); connectors table (USB-A, USB-B, USB-C, micro-USB; HDMI, DisplayPort, VGA, DVI; RJ45 on Cat5e or Cat6, fiber; RS-232 serial DB9 on many devices); network terms table (LAN, WAN, switch, router, default gateway, IP address, subnet mask, DHCP, DNS, Wi-Fi 2.4 and 5 GHz with WPA2/WPA3, Bluetooth, RFID and RTLS for asset tracking, VLAN, VPN, data closet IDF/MDF, server rack, patch panel, WMTS telemetry band); commands row (ipconfig shows the address, mask, and gateway; ping tests reach and loss; same first three octets with a /24 mask means the same subnet); HIPAA list (PHI; minimum necessary; privacy rule and security rule; breach; EMR; device integration sends device data to the chart; wipe PHI before a device leaves; no patient details in photos or texts; vendors sign a business associate agreement); security habits list (lock the screen; passphrases and multi-factor authentication; recognize and report phishing; patches only on the vendor's validated schedule for devices; no unknown USB drives; firewalls and medical device VLANs; least privilege; report incidents at once).
8. `career` "Your career": CABT to CBET to CRES or CHTM ladder table (what each is for, when you qualify: CBET full status after an associate degree (electronics, technology, or science) plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of work alone; candidate status opens at the degree, the military program, or two years of work alone, with five years to upgrade; CRES for imaging, CHTM for managers; CBET and CRES 165 questions in 3 hours twice a year; CBET recertifies every 3 years; CABT does not renew); where the jobs are row (hospital in-house HTM, independent service organizations, manufacturer field service, military, clinics and dialysis); first-90-days list (shadow, learn the CMMS, document everything, ask before you guess, safety habits every time).

- [ ] **Step 2: Load the sheet in jsdom and check its shape**

Run:
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/bmet/cheatsheet.js','utf8'));const cs=w.FRA.cheatsheet;const ids=cs.sections.map(s=>s.id);console.log(ids.join(','));let rows=0,bad=0;cs.sections.forEach(s=>s.blocks.forEach(b=>{if(b.type==='table'){b.rows.forEach(r=>{rows++;if(r.length!==b.cols.length)bad++;});}else if(b.type==='list'){rows+=b.items.length;}else if(b.type!=='note'){bad++;}}));console.log('rows',rows,'bad',bad)"
```
Expected: `exam,anatomy,electricity,reasoning,safety,devices,it,career` and `bad 0` with `rows` above 180.

- [ ] **Step 3: Write `courses/bmet/acronyms.js` covering the sheet**

Header:

```js
// BMET Academy acronym glossary. Every acronym used in the lessons, deep dives, labs, cheat sheet, and questions.
// Rendered by the engine as hover links and as the cheat sheet's Acronyms section. Keys match whole words,
// case-sensitive, plurals allowed. Original wording. Fields: full, tip (one sentence), more (longer; blank line = paragraph).
window.FRA = window.FRA || {};
FRA.acronyms = {
  "AAMI": { full: "Association for the Advancement of Medical Instrumentation", tip: "The standards body for medical equipment and the sponsor of the technician credentials.", more: "AAMI publishes the equipment-management standards hospitals follow and the US adoption of IEC 60601. Its credentials institute, ACI, runs the entry-level associate exam this course prepares you for and the exams that follow it." },
  "ACI": { full: "AAMI Credentials Institute", tip: "The body inside AAMI that writes and administers the certification exams.", more: "ACI sets each exam's content outline, eligibility, fees, and retake rules, and reports results as pass or fail." },
  "CABT": { full: "Certified Associate in Biomedical Technology", tip: "The entry-level ACI credential: 100 questions, 2 hours, remote proctored, no experience required.", more: "Valid five years and not renewable; by then the holder qualifies to sit for the technician-level exam. This course's official-format test mirrors its length and timing." },
  "CBET": { full: "Certified Biomedical Equipment Technician", tip: "The ACI credential for working technicians, usually after two years on the job.", more: "165 questions in three hours, offered in May and November at test centers, recertified every three years. The next rung after the associate credential." },
  ...
};
FRA.acronymIgnore = ["BEST", "FIRST", "LEAST", "MOST", "NOT", "OK", "OL", "ON", "OFF", "II", "III", "IV"];
```

Run `node tests/acronyms.js courses/bmet`; add a key for every `missing:` line it prints (it shows the token and its context) until it passes. Expected keys at this point include at least: AAMI, ACI, CABT, CBET, CRES, CHTM, HTM, BMET, CMMS, PM, DMM, LED, ESD, AWG, DC, AC, RMS, GFCI, NFPA, IEC, LOTO, SDS, GHS, PPE, OSHA, ALARA, MRI, CT, SpO2 (write it as `SpO2` in text; the scanner treats it as acronym-looking, so make it a key), EtCO2, NIBP, ECG, EKG, MAP, CO2, O2, PCA, SCD, AED, VTBI, KVO, RPM, CPU, RAM, HDD, SSD, GPU, BIOS, UEFI, USB, HDMI, VGA, DVI, RJ45, LAN, WAN, IP, DHCP, DNS, WPA2, WPA3, RFID, RTLS, VLAN, VPN, IDF, MDF, WMTS, HIPAA, PHI, EMR, MFA, IFU, ISO, OEM, DoD, STAR, RACE, PASS, DISS, TENS, CPM, PISS.

- [ ] **Step 4: Verify and commit**

Run: `node tests/acronyms.js courses/bmet 2>&1 | tail -2`
Expected: the pass line for `bmet` with no `missing:` or `unused` lines.

```bash
git add courses/bmet/cheatsheet.js courses/bmet/acronyms.js
git commit -m "feat(bmet): memorization sheet for the CABT and the first acronym glossary"
```

---

### Task 4: Units 1 to 3 (18 lessons, 90 questions, five kit labs)

**Files:**
- Create: `courses/bmet/curriculum-1.js`, `courses/bmet/deep-1.js`, `courses/bmet/questions-1.js`, `courses/bmet/labs-1.js`
- Modify: `courses/bmet/acronyms.js` (new keys the lessons introduce)

**Interfaces:**
- Consumes: the Conventions section; `FRAInstruments.validate` through `tests/labcheck.js`.
- Produces: units `u1` (domain 7), `u2` (domain 1), `u3` (domain 4); labs `kit-setup`, `dmm-ohms`, `series-parallel`, `open-short`, `continuity-diode` referenced by `lab:` on u1l3, u3l2, u3l3, u3l5, u3l9. Task 8's manifest lists these lesson ids in `starterPool` and `core`; do not rename them.

- [ ] **Step 1: Run the pack checker on the empty folder to see the baseline**

Run: `node tests/packcheck.js courses/bmet`
Expected: `bmet: 0 units, 0 lessons ... cheatsheet yes` then `packcheck: OK` (nothing to check yet). The checks become meaningful once lessons exist.

- [ ] **Step 2: Write `courses/bmet/curriculum-1.js`**

Units and lessons. Each "covers" list is the minimum the body must teach, in the learner's words; the outline's own example terms are in bold-free plain text so the Task 9 check finds them. Every body ends with a `> Exam tip:` line (units 1 and 8 use `> Tip:`).

**Unit u1 "Welcome to Healthcare Technology Management"** (domain 7; blurb: what a biomed does, how the exam works, and the kit; assumes nothing)
- u1l1 `What a BMET Does` (obj Career, 8 min). Covers: HTM department, the names biomed / BMET / clinical engineering; a typical day: scheduled maintenance (PM), repairs, incoming inspections on new equipment, rounds, supporting senior technicians, minor troubleshooting (the four CABT scope duties, in those words); work orders and the CMMS; who you work with (nurses, IT, facilities, vendors, infection prevention); the ladder BMET I, II, III, specialist, supervisor, manager; where biomeds work (hospital in-house, independent service organization, manufacturer field service, military).
- u1l2 `The CABT Exam and How This Course Works` (obj Career, 9 min). Covers: 100 questions, 2 hours, closed book, six domains with their percentages, live remote proctoring year-round, high school junior minimum, fee $220 member / $270 non-member, retake $190 / $240 after a 60-day wait, six months to test after purchase, pass or fail results at once, valid five years and non-renewable; this course's stages (cheat sheet, starter test, tutorial, 50-question test, retraining, practice tests until 3 of the last 5 reach 80%, the official-format test at 70%, Ready); the certificate of completion needs every lesson, every lab, and the official-format pass.
- u1l3 `Your Lab Kit and Your First Measurements` (obj Career, 10 min, `lab: "kit-setup"`). Covers: the kit list (digital multimeter, breadboard, jumper wires, resistor assortment, a few capacitors, 9 V battery and clip, LEDs, a slide switch, a fuse holder with a 1 A fuse) and what each is for; meter basics: the dial, COM and V/ohm jacks versus the amps jack, auto range, OL, polarity sign; the two rules (never measure ohms on a powered circuit; never put the meter on amps across a source); the virtual meter does what the kit does; how a lab card works (readings, Record, Check, retry, redo).

**Unit u2 "Anatomy, Physiology, and Medical Terminology"** (domain 1; assumes nothing)
- u2l1 `Body Organization, Directions, and Word Parts` (A&P-A, 9). Covers: cells, tissues, organs, systems; the systems named (circulatory, respiratory, nervous, digestive, urinary, endocrine, musculoskeletal, skin); how systems interact (lungs load oxygen, heart delivers it, brain sets the pace); directions (anterior, posterior, superior, inferior, medial, lateral, proximal, distal, supine, prone); prefixes, roots, suffixes as in the sheet.
- u2l2 `The Heart, Circulation, and the Numbers a Monitor Shows` (A&P-B, 10). Covers: four chambers, valves, right side to the lungs and left to the body; SA node and the P wave, QRS, T wave; systole, diastole, 120/80, MAP; heart rate 60 to 100, bradycardia, tachycardia; arteries, veins, capillaries; blood: red cells and hemoglobin, white cells, platelets, plasma; what ECG, NIBP, and pulse oximetry read from this system.
- u2l3 `The Lungs and Breathing` (A&P-A, 9). Covers: airway, trachea, bronchi, alveoli, diaphragm; oxygen in, carbon dioxide out; ventilation versus oxygenation; respiratory rate 12 to 20; SpO2 95 to 100%; EtCO2 35 to 45 mmHg; tidal volume about 500 mL; devices: ventilator, oxygen concentrator, suction, capnograph, pulse oximeter, nebulizer, spirometer.
- u2l4 `The Nervous System and the Brain` (A&P-B, 8). Covers: central and peripheral nervous system; cerebrum, cerebellum, brainstem (breathing and heart rate), spinal cord, nerves, reflexes; nerves and muscles respond to electric current, which is why shock hurts and why 60 Hz is dangerous; devices: EEG, nerve stimulators, TENS, evoked-potential monitors at recognition level.
- u2l5 `Kidneys, Blood, Skin, Digestion, and Hormones` (A&P-B, 9). Covers: kidneys filter blood and make urine, dialysis; blood volume and types; skin layers (epidermis, dermis, subcutaneous), the skin as barrier, temperature control, and electrical resistance (dry versus wet), electrodes, burns, pressure injury; the digestive tract (feeding pumps, suction, endoscopes); endocrine glands and hormones, insulin and glucose (glucometers, insulin pumps); body temperature 37 C.
- u2l6 `Vital Signs and the Device That Measures Each` (A&P-A, 8). Covers: heart rate, respiratory rate, blood pressure, SpO2, temperature, EtCO2, pain scale; normal adult ranges; the device for each; sensor placement; common measurement errors (wrong cuff size, motion, cold fingers, loose electrodes, mouth breathing on a capnography cannula).

**Unit u3 "Electricity and Electronics"** (domain 4; assumes unit 1's meter basics)
- u3l1 `Charge, Current, Voltage, and Resistance` (E&E-D, 9). Covers: electrons, conductors and insulators (copper and silver; rubber, glass, plastic, dry skin); current in amps, voltage in volts, resistance in ohms, the water analogy; symbols V, I, R and units with prefixes (mA, microamps, kohm, Mohm); how each is measured (volts across, amps in series, ohms unpowered); ground as the zero reference and the safety path.
- u3l2 `Ohm's Law and Power` (E&E-A, 10, `lab: "dmm-ohms"`). Covers: V = I x R and its two rearrangements, the triangle; P = V x I, I squared R, V squared over R; watts and resistor power ratings (quarter watt); why Ohm's law explains shock: body resistance about 1,000 ohm wet to 100,000 ohm dry, so 120 V can push 120 mA through wet skin but about 1 mA through dry skin; a worked circuit; the lab.
- u3l3 `Series and Parallel Circuits` (E&E-E, 10, `lab: "series-parallel"`). Covers: series (one path, same current, voltages add, resistances add, one open stops everything); parallel (same voltage, currents add, total resistance below the smallest branch, product over sum); the voltage divider; why hospital outlets and devices are in parallel; a string of lights as the series example; the lab.
- u3l4 `Power Supply, Switch, Load: Reading a Simple Circuit` (E&E-E, 9). Covers: the three parts of every circuit (source, switch, load) and the control path; schematic symbols (battery, cell, resistor, lamp, switch, fuse, circuit breaker, capacitor, inductor, transformer, diode, LED, ground, chassis); wires that cross versus wires that join; following a device's power path: plug, fuse, switch, power supply, load; reading a block diagram.
- u3l5 `Opens, Shorts, Fuses, and Circuit Breakers` (E&E-F, 10, `lab: "open-short"`). Covers: open circuit (infinite resistance, no current, full source voltage across the open); short circuit (near zero resistance, large current, heat, fire); how to find each with a meter; fuses (ratings, fast and slow, replace with the same rating, find the cause first), circuit breakers, GFCI trips at 4 to 6 mA; the lab.
- u3l6 `DC Versus AC, Transformers, and Wall Power` (E&E-C, 9). Covers: DC from batteries and power supplies; AC reverses direction, 120 V 60 Hz in the US, 230 V 50 Hz elsewhere; RMS versus peak (about 170 V); period and frequency; why AC: transformers step voltage up and down by turns ratio and work only on AC; the rectifier and filter inside a power supply; the outlet's hot, neutral, and ground slots; hospital-grade plugs with the green dot; isolation transformers at recognition level.
- u3l7 `Capacitors, Inductors, Diodes, LEDs, and Transistors` (E&E-B, 9). Covers (recognition level): capacitor stores charge, farads and microfarads, can stay charged after power is off (defibrillator capacitor, discharge before touching); inductor or coil, henries, relays and motors; diode as a one-way valve with a 0.6 to 0.7 V drop; LED 1.8 to 3.3 V, polarity, needs a series resistor, long leg is the anode; transistor as a switch or amplifier; integrated circuits; each symbol.
- u3l8 `Batteries, Chargers, and Battery Care` (E&E-B, 9). Covers: cell voltages by chemistry (alkaline 1.5, NiMH 1.2, lithium coin 3, lithium-ion 3.6 to 3.7, lead-acid 2 per cell); capacity in Ah and mAh; cells in series add voltage, in parallel add capacity; charging and chargers; swelling, heat, and when to replace; storage; battery PM on defibrillators, pumps, and monitors; disposal; UPS at recognition level.
- u3l9 `Wiring, Color Codes, Ground, and ESD` (E&E-D, 10, `lab: "continuity-diode"`). Covers: US building wiring colors (black or red hot, white neutral, green or bare ground), IEC cord colors (brown live, blue neutral, green-yellow ground), DC wiring (red +, black -); AWG (lower number is thicker), stranded versus solid; what ground does; continuity testing and the diode test; electrostatic discharge: the static you feel is about 3,000 V, 100 V can damage a chip, wrist strap, mat, anti-static bags, humidity; the lab.

- [ ] **Step 3: Write `courses/bmet/deep-1.js`**

One deep dive per lesson above, each at least 300 words, each with at least one fenced "what to memorize" table, written for a reader with no background. The three unit-1 entries explain the department, the exam process, and the meter in more depth (for example u1l3 walks the dial function by function and explains OL, auto range, the amps jack fuse, and lead care).

- [ ] **Step 4: Write `courses/bmet/questions-1.js`** (5 per lesson, 90 total)

Scenario stems a new technician meets. Unit 1 questions are about the department, the exam rules (fees, retake wait, proctoring rules, validity), and meter rules. Unit 3 numeric questions use clean numbers with the arithmetic in the explanation. Then run `node tests/balance-keys.js courses/bmet/questions-1.js`.

- [ ] **Step 5: Write `courses/bmet/labs-1.js`** (exact content)

```js
// BMET Academy labs, units 1 and 3: the kit labs on the virtual multimeter. Original content.
// Every number the instrument shows comes from the scenario tables below; the engine adds one
// digit of jitter so repeat readings look real. Point names use letters, digits, and + only.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
(function () {
  // A small schematic drawer. Coordinates are user units in a 420 x 220 viewBox and the same
  // numbers go into `points`, so the engine's hotspots land on the drawn test points.
  const C = { brown: '#8b4513', black: '#111', red: '#d12', orange: '#f80', yellow: '#fd0', green: '#080', blue: '#03c', violet: '#80c', gray: '#888', white: '#eee', gold: '#c90' };
  const wire = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2"/>`;
  const text = (x, y, t, size) => `<text x="${x}" y="${y}" font-size="${size || 11}" text-anchor="middle" fill="currentColor">${t}</text>`;
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="currentColor"/>`;
  // Horizontal parts are centred on (x, y) and span x-20 to x+20.
  const resistor = (x, y, name, bands) => wire(x - 20, y, x - 14, y) + `<rect x="${x - 14}" y="${y - 7}" width="28" height="14" fill="#fff" stroke="currentColor" stroke-width="2"/>` + bands.map((b, i) => `<rect x="${x - 11 + i * 6}" y="${y - 7}" width="3" height="14" fill="${C[b]}"/>`).join('') + wire(x + 14, y, x + 20, y) + text(x, y - 11, name);
  const fuse = (x, y, name) => wire(x - 20, y, x + 20, y) + `<rect x="${x - 12}" y="${y - 5}" width="24" height="10" rx="5" fill="#fff" stroke="currentColor" stroke-width="2"/>` + text(x, y - 10, name);
  const sw = (x, y, name, closed) => wire(x - 20, y, x - 8, y) + dot(x - 8, y) + dot(x + 8, y) + (closed ? wire(x - 8, y, x + 8, y) : wire(x - 8, y, x + 6, y - 10)) + wire(x + 8, y, x + 20, y) + text(x, y - 14, name);
  const diode = (x, y, name) => wire(x - 20, y, x - 6, y) + `<polygon points="${x - 6},${y - 7} ${x - 6},${y + 7} ${x + 6},${y}" fill="currentColor"/>` + wire(x + 6, y - 7, x + 6, y + 7) + wire(x + 6, y, x + 20, y) + text(x, y - 11, name);
  const led = (x, y, name) => diode(x, y, name) + wire(x - 2, y - 9, x + 4, y - 15) + wire(x + 2, y - 9, x + 8, y - 15);
  const brk = (x, y, name) => wire(x - 20, y, x - 8, y) + dot(x - 8, y) + dot(x + 8, y) + wire(x + 8, y, x + 20, y) + text(x, y - 10, name);
  // A vertical battery centred on (x, y): the long plate is positive and sits on top.
  const battery = (x, y, name) => wire(x, y - 20, x, y - 6) + `<line x1="${x - 12}" y1="${y - 6}" x2="${x + 12}" y2="${y - 6}" stroke="currentColor" stroke-width="3"/><line x1="${x - 6}" y1="${y + 1}" x2="${x + 6}" y2="${y + 1}" stroke="currentColor" stroke-width="2"/><line x1="${x - 12}" y1="${y + 8}" x2="${x + 12}" y2="${y + 8}" stroke="currentColor" stroke-width="3"/><line x1="${x - 6}" y1="${y + 15}" x2="${x + 6}" y2="${y + 15}" stroke="currentColor" stroke-width="2"/>` + wire(x, y + 15, x, y + 20) + text(x - 20, y - 2, '+') + text(x + 26, y + 4, name);
  const svg = parts => `<svg viewBox="0 0 420 220" role="img" aria-label="circuit drawing" style="display:block;width:100%;height:auto">${parts.join('')}</svg>`;
  const KIT = ["9 V battery and clip", "Breadboard and jumper wires", "Resistor assortment"];

  FRA.labs["kit-setup"] = {
    id: "kit-setup", lesson: "u1l3", title: "Your first two measurements", instrument: "dmm",
    intro: `Lay out the kit and find each part on the list. Then take two measurements: the 9 V battery's voltage and one resistor's resistance.

- The **circuit power** switch on the panel stands for "battery connected". Voltage is measured with it on. Resistance is measured on a part that is **not** connected to anything, so switch it off first; a powered circuit gives an invalid ohms reading and can damage a real meter.
- Click the red probe's point first, then the black probe's. Red on the battery's + terminal (P) and black on the - terminal (N) reads positive; swapped probes read negative.
- Using your own kit? Tick the box and type what your meter shows. The task ranges accept real-world readings.`,
    kit: ["Digital multimeter with test leads", "Solderless breadboard and jumper wires", "Resistor assortment (at least 100, 220, 470, 1k, 2.2k, and 10k ohm)", "A few capacitors", "9 V battery and battery clip", "LEDs (red and green)", "A slide switch", "A fuse holder with a 1 A fuse"],
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), text(70, 160, 'battery'), resistor(260, 110, 'R1 1000 ohm', ['brown', 'black', 'red', 'gold']), dot(240, 110), dot(280, 110), text(260, 160, 'loose resistor, not connected to anything')]),
      points: { P: [70, 88], N: [70, 132], R1a: [240, 110], R1b: [280, 110] },
      vdc: { 'P-N': 9.32 }, ohm: { 'R1a-R1b': 988 } },
    tasks: [
      { id: "batt", kind: "reading", prompt: "Battery voltage: V DC, power on, red on P, black on N", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "P", b: "N" } },
      { id: "sign", kind: "choice", prompt: "Swap the probes (red on N, black on P). What does the meter show?", options: ["The same voltage with a minus sign", "Zero", "OL", "Twice the voltage"], expect: 0 },
      { id: "r1", kind: "reading", prompt: "Resistance of R1: Ohms, power OFF, probes on R1a and R1b", unit: "ohm", expect: [900, 1100], measure: { fn: "ohm", a: "R1a", b: "R1b", power: false } },
      { id: "bands", kind: "choice", prompt: "R1 is banded brown, black, red, gold. What does the code say?", options: ["1,000 ohm, 5% tolerance", "100 ohm, 10% tolerance", "10,000 ohm, 5% tolerance", "1,200 ohm, 1% tolerance"], expect: 0 }
    ],
    why: {
      batt: "A fresh 9 V battery reads about 9.3 to 9.6 V and a used one drifts toward 8.4 V; anything in that range is right. A reading of 0 means the circuit power is off; OL means a probe is not on a terminal.",
      sign: "A digital meter reports the red probe's polarity relative to the black one. Red on the negative terminal gives the same number with a minus sign; nothing is damaged.",
      r1: "A 1,000 ohm resistor with a gold band may read anywhere from 950 to 1,050 ohm, and most read within a percent or two. If the panel says INVALID, switch the circuit power off first.",
      bands: "The first two bands are digits (brown 1, black 0) and the third is the multiplier (red is x100): 10 x 100 = 1,000 ohm. Gold is 5% tolerance, silver 10%."
    }
  };

  FRA.labs["dmm-ohms"] = {
    id: "dmm-ohms", lesson: "u3l2", title: "Ohm's law on the bench", instrument: "dmm",
    intro: `One battery, one resistor, one loop. Measure the voltage across R1 and the current through the loop, then compute the resistance and the power without measuring them.

- Voltage: V DC, power on, red on R1a, black on R1b. The meter sits **across** the part.
- Current: A DC, power on, red on Xa, black on Xb. The meter sits **in** the loop at the break point so the current flows through it. On A DC anywhere else it reads OL.
- Then R = V / I and P = V x I. Check R against the color bands.`,
    kit: KIT.concat(["470 ohm resistor (yellow, violet, brown); leave one jumper out to make the break point X"]),
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), wire(70, 88, 70, 50), wire(70, 50, 170, 50), resistor(190, 50, 'R1 470 ohm', ['yellow', 'violet', 'brown', 'gold']), dot(170, 50), dot(210, 50), wire(210, 50, 290, 50), brk(310, 50, 'break X'), wire(330, 50, 380, 50), wire(380, 50, 380, 170), wire(380, 170, 70, 170), wire(70, 170, 70, 132)]),
      points: { P: [70, 88], N: [70, 132], R1a: [170, 50], R1b: [210, 50], Xa: [302, 50], Xb: [318, 50] },
      vdc: { 'P-N': 9.06, 'R1a-R1b': 9.06 }, adc: { 'Xa-Xb': 0.0193 }, ohm: { 'R1a-R1b': 471 } },
    tasks: [
      { id: "v", kind: "reading", prompt: "Voltage across R1 (V DC, power on)", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "R1a", b: "R1b" } },
      { id: "i", kind: "reading", prompt: "Current at the break point (A DC, power on, red on Xa, black on Xb)", unit: "A", expect: [0.017, 0.021], measure: { fn: "adc", a: "Xa", b: "Xb" } },
      { id: "r", kind: "reading", prompt: "Compute R = V / I in ohms (do not measure it)", unit: "ohm", expect: [420, 530] },
      { id: "p", kind: "reading", prompt: "Compute the power in R1, P = V x I, in watts", unit: "W", expect: [0.14, 0.21] },
      { id: "ol", kind: "choice", prompt: "On A DC with the probes across R1 (R1a to R1b) the meter shows OL. Why?", options: ["Current must flow through the meter; across a part there is no path through it", "The battery is dead", "R1 is open", "The meter needs the ohms range"], expect: 0 }
    ],
    why: {
      v: "With one resistor in the loop nearly the whole battery voltage appears across it: about 9.1 V here, anywhere from 8.4 to 9.7 V with a real battery.",
      i: "I = V / R = 9.06 / 470 = 0.0193 A, which is 19.3 mA. The meter reads in amps, so 0.019 is right; 19 would be milliamps.",
      r: "R = 9.06 V / 0.0193 A = 469 ohm, matching the yellow-violet-brown code (47 x 10 = 470) within tolerance. Anything from 420 to 530 counts.",
      p: "P = 9.06 x 0.0193 = 0.175 W, under the resistor's quarter-watt rating. A quarter-watt part asked for more than 0.25 W gets hot and fails.",
      ol: "An ammeter has almost no resistance and must sit in series, at the break, so the loop current passes through it. Across a part it has no complete path and reads OL. Across a battery on the amps range it would short the battery and blow the meter's fuse."
    }
  };

  FRA.labs["series-parallel"] = {
    id: "series-parallel", lesson: "u3l3", title: "Series voltages and parallel currents", instrument: "dmm",
    intro: `Two circuits share the drawing. The top one is **series**: 9 V through R1 (220 ohm) and R2 (470 ohm) in one loop with a break point SX. The bottom one is **parallel**: 9 V across R3 (220 ohm) and R4 (470 ohm) side by side, with a break point in each branch (X3, X4) and one in the feed (XT).

- Series: measure the voltage across each resistor and add them.
- Parallel: measure the current in each branch and in the feed, and add the branches.
- Everything on V DC and A DC is measured with the power on.`,
    kit: KIT.concat(["Two 220 ohm and two 470 ohm resistors; leave jumpers out for the break points"]),
    scenario: { power: true,
      svg: svg([
        battery(50, 60, '9 V'), dot(50, 38), dot(50, 82), wire(50, 38, 50, 20), wire(50, 20, 120, 20), resistor(140, 20, 'R1 220', ['red', 'red', 'brown', 'gold']), dot(120, 20), dot(160, 20), wire(160, 20, 200, 20), resistor(220, 20, 'R2 470', ['yellow', 'violet', 'brown', 'gold']), dot(200, 20), dot(240, 20), wire(240, 20, 300, 20), brk(320, 20, 'SX'), wire(340, 20, 400, 20), wire(400, 20, 400, 100), wire(400, 100, 50, 100), wire(50, 100, 50, 82), text(230, 95, 'series circuit', 10),
        battery(50, 165, '9 V'), dot(50, 143), dot(50, 187), wire(50, 143, 50, 125), wire(50, 125, 70, 125), brk(90, 125, 'XT'), wire(110, 125, 110, 205), wire(110, 205, 50, 205), wire(50, 205, 50, 187),
        wire(110, 140, 140, 140), brk(160, 140, 'X3'), wire(180, 140, 200, 140), resistor(220, 140, 'R3 220', ['red', 'red', 'brown', 'gold']), wire(240, 140, 360, 140),
        wire(110, 190, 140, 190), brk(160, 190, 'X4'), wire(180, 190, 200, 190), resistor(220, 190, 'R4 470', ['yellow', 'violet', 'brown', 'gold']), wire(240, 190, 360, 190), wire(360, 140, 360, 190), text(300, 212, 'parallel circuit', 10)
      ]),
      points: { P1: [50, 38], N1: [50, 82], S1a: [120, 20], S1b: [160, 20], S2a: [200, 20], S2b: [240, 20], SXa: [312, 20], SXb: [328, 20], P2: [50, 143], N2: [50, 187], XTa: [82, 125], XTb: [98, 125], X3a: [152, 140], X3b: [168, 140], X4a: [152, 190], X4b: [168, 190] },
      vdc: { 'P1-N1': 9.0, 'S1a-S1b': 2.87, 'S2a-S2b': 6.13, 'S1a-S2b': 9.0, 'P2-N2': 9.0 },
      adc: { 'SXa-SXb': 0.013, 'X3a-X3b': 0.041, 'X4a-X4b': 0.019, 'XTa-XTb': 0.06 },
      ohm: { 'S1a-S1b': 221, 'S2a-S2b': 468, 'S1a-S2b': 689 } },
    tasks: [
      { id: "v1", kind: "reading", prompt: "Series: voltage across R1 (S1a to S1b)", unit: "V", expect: [2.6, 3.1], measure: { fn: "vdc", a: "S1a", b: "S1b" } },
      { id: "v2", kind: "reading", prompt: "Series: voltage across R2 (S2a to S2b)", unit: "V", expect: [5.9, 6.4], measure: { fn: "vdc", a: "S2a", b: "S2b" } },
      { id: "sum", kind: "choice", prompt: "Add the two series voltages. What do they equal?", options: ["The battery voltage, about 9 V", "Zero", "Half the battery voltage", "Twice the battery voltage"], expect: 0 },
      { id: "i3", kind: "reading", prompt: "Parallel: current in the R3 branch (X3a to X3b)", unit: "A", expect: [0.039, 0.043], measure: { fn: "adc", a: "X3a", b: "X3b" } },
      { id: "i4", kind: "reading", prompt: "Parallel: current in the R4 branch (X4a to X4b)", unit: "A", expect: [0.016, 0.022], measure: { fn: "adc", a: "X4a", b: "X4b" } },
      { id: "it", kind: "reading", prompt: "Parallel: total current in the feed (XTa to XTb)", unit: "A", expect: [0.057, 0.064], measure: { fn: "adc", a: "XTa", b: "XTb" } },
      { id: "kcl", kind: "choice", prompt: "Compare the two branch currents with the feed current.", options: ["The branch currents add up to the feed current", "Each branch carries the full feed current", "The feed current is the smaller branch current", "The branches carry no current until the feed break is closed"], expect: 0 }
    ],
    why: {
      v1: "Series current is 9 V / (220 + 470) ohm = 0.013 A. Across 220 ohm that is 0.013 x 220 = 2.87 V. The smaller resistor takes the smaller share.",
      v2: "The same 0.013 A through 470 ohm drops 0.013 x 470 = 6.13 V. The bigger resistor takes the bigger share.",
      sum: "2.87 + 6.13 = 9.0 V. In a series loop the voltage drops always add up to the source; nothing is lost or gained.",
      i3: "Each parallel branch sees the full 9 V. I = 9 / 220 = 0.041 A (41 mA).",
      i4: "I = 9 / 470 = 0.019 A (19 mA). The bigger resistor passes the smaller current.",
      it: "The feed carries both branches: 0.041 + 0.019 = 0.060 A. The total resistance is 9 / 0.06 = 150 ohm, less than either branch.",
      kcl: "Current splits at a junction and rejoins after it; what goes in equals what comes out. 41 mA + 19 mA = 60 mA in the feed."
    }
  };

  FRA.labs["open-short"] = {
    id: "open-short", lesson: "u3l5", title: "Find the open and the short", instrument: "dmm",
    intro: `A simple loop: battery, fuse F1, switch S1 (closed), R1, and R2. The device is dead. One part is **open** and one is **shorted** (a solder bridge across it).

- An open part has the whole source voltage across it when power is on, and reads OL on ohms when power is off.
- A shorted part reads near 0 ohm and beeps on continuity when power is off, and has no voltage across it when power is on.
- Measure before you decide. Then say what you would do first.`,
    kit: KIT.concat(["Two 1k resistors, the slide switch, the fuse holder with the fuse pulled out to stand in for a blown one, and a short jumper across R2 as the bridge"]),
    scenario: { power: true,
      svg: svg([battery(70, 110, '9 V'), dot(70, 88), dot(70, 132), wire(70, 88, 70, 50), wire(70, 50, 80, 50), fuse(100, 50, 'F1'), dot(80, 50), dot(120, 50), wire(120, 50, 170, 50), sw(190, 50, 'S1 closed', true), wire(210, 50, 250, 50), resistor(270, 50, 'R1 1k', ['brown', 'black', 'red', 'gold']), dot(250, 50), dot(290, 50), wire(290, 50, 380, 50), wire(380, 50, 380, 170), wire(380, 170, 290, 170), resistor(270, 170, 'R2 1k', ['brown', 'black', 'red', 'gold']), dot(290, 170), dot(250, 170), `<line x1="256" y1="180" x2="284" y2="180" stroke="#d12" stroke-width="3"/>`, text(270, 195, 'solder bridge', 10), wire(250, 170, 70, 170), wire(70, 170, 70, 132)]),
      points: { P: [70, 88], N: [70, 132], F1a: [80, 50], F1b: [120, 50], R1a: [250, 50], R1b: [290, 50], R2a: [290, 170], R2b: [250, 170] },
      vdc: { 'P-N': 9.0, 'F1a-F1b': 9.0, 'R1a-R1b': 0, 'R2a-R2b': 0 },
      ohm: { 'R1a-R1b': 998, 'R2a-R2b': 0.3 },
      cont: { 'R2a-R2b': true } },
    tasks: [
      { id: "vf", kind: "reading", prompt: "Voltage across the fuse, F1a to F1b (V DC, power on)", unit: "V", expect: [8.4, 9.7], measure: { fn: "vdc", a: "F1a", b: "F1b" } },
      { id: "vr1", kind: "reading", prompt: "Voltage across R1, R1a to R1b (V DC, power on)", unit: "V", expect: [-0.1, 0.1], measure: { fn: "vdc", a: "R1a", b: "R1b" } },
      { id: "open", kind: "choice", prompt: "Which part is open?", options: ["F1, the fuse", "R1", "R2", "S1, the switch"], expect: 0 },
      { id: "rf", kind: "choice", prompt: "Power off, Ohms across F1a and F1b. What does an open fuse read?", options: ["OL", "0 ohm", "9 V", "1,000 ohm"], expect: 0 },
      { id: "short", kind: "choice", prompt: "Switch to Continuity with the power off and test each part. Which one is shorted?", options: ["R2: the bridge across it beeps and reads near 0 ohm", "R1", "F1", "S1"], expect: 0 },
      { id: "fix", kind: "choice", prompt: "What do you do first?", options: ["Remove the bridge across R2, then replace the fuse with the same rating, then power up", "Replace the fuse and power up to see if it holds", "Replace R1", "Bypass the fuse with a jumper to test the circuit"], expect: 0 }
    ],
    why: {
      vf: "No current flows through an open loop, so no voltage drops across R1 or R2; the entire 9 V appears across the gap, which is the fuse. Full source voltage across a part means that part is open.",
      vr1: "With the fuse open no current flows, and a resistor with no current through it has no voltage across it: 0 V.",
      open: "The fuse has the full source voltage across it and reads OL on ohms. The fuse opened because the shorted R2 let too much current flow.",
      rf: "An open fuse is a gap: infinite resistance, shown as OL. A good fuse reads near 0 ohm.",
      short: "The bridge is a path of almost no resistance around R2, so continuity beeps and ohms read about 0.3 ohm. A good 1k resistor reads about 1,000 ohm and does not beep.",
      fix: "A fuse opens for a reason. Clear the short first, replace the fuse with one of the same rating, then power up. Replacing the fuse first blows the new one; bypassing a fuse removes the protection."
    }
  };

  FRA.labs["continuity-diode"] = {
    id: "continuity-diode", lesson: "u3l9", title: "Continuity, cables, diodes, and wire colors", instrument: "dmm",
    intro: `Nothing here is powered, so the circuit power starts off and stays off. Test two switches, two cables, a diode, and an LED.

- Continuity beeps and reads near 0 ohm on a closed switch or a good cable, and OL on an open switch or a broken wire.
- The diode test pushes a small current and shows the forward voltage drop with the red probe on the anode (the arrow side) and black on the cathode (the bar). Swapped, it reads OL.
- The last task is about building wire colors, which you will see on every power cord and outlet.`,
    kit: KIT.concat(["The slide switch, two jumper wires (ask someone to nick one inside its insulation, or just test both), a diode if you have one, and a red LED"]),
    scenario: { power: false,
      svg: svg([sw(120, 50, 'S1', true), dot(100, 50), dot(140, 50), sw(300, 50, 'S2', false), dot(280, 50), dot(320, 50), wire(100, 110, 320, 110), dot(100, 110), dot(320, 110), text(210, 103, 'cable 1', 10), wire(100, 150, 320, 150), dot(100, 150), dot(320, 150), text(210, 143, 'cable 2', 10), diode(140, 200, 'D1'), dot(120, 200), dot(160, 200), text(120, 216, 'anode', 9), text(160, 216, 'cathode', 9), led(300, 200, 'L1 red LED'), dot(280, 200), dot(320, 200), text(280, 216, 'anode', 9), text(320, 216, 'cathode', 9)]),
      points: { S1a: [100, 50], S1b: [140, 50], S2a: [280, 50], S2b: [320, 50], C1: [100, 110], C2: [320, 110], C3: [100, 150], C4: [320, 150], D1a: [120, 200], D1k: [160, 200], L1a: [280, 200], L1k: [320, 200] },
      cont: { 'S1a-S1b': true, 'C1-C2': true },
      ohm: { 'S1a-S1b': 0.2, 'C1-C2': 0.4 },
      diode: { 'D1a-D1k': 0.66, 'L1a-L1k': 1.92 } },
    tasks: [
      { id: "sw", kind: "choice", prompt: "Continuity across S1a-S1b and across S2a-S2b. Which switch is closed?", options: ["S1: it beeps; S2 reads OL", "S2: it beeps; S1 reads OL", "Both beep", "Neither beeps"], expect: 0 },
      { id: "cable", kind: "choice", prompt: "Continuity end to end on cable 1 (C1-C2) and cable 2 (C3-C4). Which cable is broken inside its jacket?", options: ["Cable 2: C3 to C4 reads OL", "Cable 1: C1 to C2 reads OL", "Both are broken", "Neither; both beep"], expect: 0 },
      { id: "vd", kind: "reading", prompt: "Diode test on D1, red on the anode D1a, black on the cathode D1k", unit: "V", expect: [0.55, 0.75], measure: { fn: "diode", a: "D1a", b: "D1k", power: false } },
      { id: "vled", kind: "reading", prompt: "Diode test on the red LED, red on L1a, black on L1k (it may glow faintly)", unit: "V", expect: [1.7, 2.1], measure: { fn: "diode", a: "L1a", b: "L1k", power: false } },
      { id: "rev", kind: "choice", prompt: "Swap the probes on D1 (red on the cathode). What does the diode test show?", options: ["OL: a good diode blocks in reverse", "The same 0.66 V", "A negative voltage", "0 V"], expect: 0 },
      { id: "colors", kind: "choice", prompt: "On a US power cord or outlet, which conductor is green or bare?", options: ["Ground", "Hot", "Neutral", "A second hot"], expect: 0 }
    ],
    why: {
      sw: "A closed switch is a continuous path: the meter beeps and reads a fraction of an ohm. An open switch is a gap and reads OL.",
      cable: "A cable with a break inside its insulation looks fine and reads OL end to end. Cable 1 beeps; cable 2 does not. Flexing a cable while testing finds intermittent breaks.",
      vd: "A silicon diode conducts forward at about 0.6 to 0.7 V; the meter shows that drop. If you read OL both ways the diode is open; near 0 both ways, it is shorted.",
      vled: "An LED is a diode with a higher forward drop: about 1.8 to 2.0 V for red, up to about 3.3 V for blue and white. That is why an LED needs a series resistor on a 9 V supply.",
      rev: "In reverse a good diode blocks, so the meter's small test current cannot flow and it reads OL. A diode that conducts both ways is shorted.",
      colors: "US building wiring: black (or red) is hot, white is neutral, green or bare copper is ground. IEC cords: brown live, blue neutral, green-yellow ground."
    }
  };
})();
```

- [ ] **Step 6: Validate the pack files**

Run, in this order:
```bash
node tests/packcheck.js courses/bmet
node tests/labcheck.js courses/bmet
node tests/acronyms.js courses/bmet
```
Expected: `bmet: 3 units, 18 lessons (per domain {"7":3,"1":6,"4":9}), 18 deep dives, 90 questions, cheatsheet yes, generators 0` and `packcheck: OK`; `bmet: 5 labs on 5 lessons; instruments dmm` and `labcheck: OK`; the acronym pass line. Fix every reported problem (word counts, missing tips, unbalanced fences, key skew, lab ranges, missing acronyms) before committing. If labcheck reports a reading range, the scenario number is the truth; widen `expect` only if the task's wording allows it, otherwise fix the number.

- [ ] **Step 7: Commit**

```bash
git add courses/bmet/curriculum-1.js courses/bmet/deep-1.js courses/bmet/questions-1.js courses/bmet/labs-1.js courses/bmet/acronyms.js
git commit -m "feat(bmet): units 1 to 3: welcome, anatomy and physiology, electricity and electronics, with the five kit labs"
```

---

### Task 5: Units 4 and 5 (14 lessons, 70 questions, three labs)

**Files:**
- Create: `courses/bmet/curriculum-2.js`, `courses/bmet/deep-2.js`, `courses/bmet/questions-2.js`, `courses/bmet/labs-2.js`
- Modify: `courses/bmet/acronyms.js`

**Interfaces:**
- Consumes: Conventions; `tests/labcheck.js`.
- Produces: units `u4` (domain 5) and `u5` (domain 3); labs `reading-scales` (u4l2), `safety-pass` (u5l2), `safety-fail` (u5l3).

- [ ] **Step 1: Write `courses/bmet/curriculum-2.js`**

**Unit u4 "Math and Reasoning for Technicians"** (domain 5; assumes unit 3)
- u4l1 `Metric Prefixes and Unit Conversions` (RPS-A, 10). Covers: kilo, centi, milli, micro, nano and moving the decimal; mL and L; g and kg and lb (2.2); mm, cm, m, inch (2.54 cm); microamps, mA, A; mmHg, cmH2O (1 mmHg = 1.36 cmH2O), kPa (7.5 mmHg), psi (51.7 mmHg; 14.7 psi atmosphere); C and F both ways with 37 = 98.6; mL/h to mL/min; the habit of writing the unit on every number.
- u4l2 `Reading Scales, Meters, and Cylinders; Tolerance and Percent Error` (RPS-A, 10, `lab: "reading-scales"`). Covers: analog scales and the needle, parallax, the meniscus, reading to the nearest graduation and estimating one more digit, significant figures in plain words; percent error = (measured minus expected) / expected x 100 with the sign; tolerance as a percent of the expected value; the pass/fail decision; accuracy versus precision; visual measurement of a cylinder, a gauge, a ruler.
- u4l3 `Reading Waveforms: ECG Paper, Period, Amplitude, and Rate` (RPS-A, 9). Covers: 25 mm/s, small box 0.04 s, large box 0.2 s, 1 mV = 10 mm; the 300, 1,500, and six-second methods; period and frequency (f = 1 / T); amplitude and baseline; what a sine wave, a square wave, and an arterial pressure wave look like; artifact versus signal (60 Hz, motion, loose electrode); why counting beats on a six-second strip works for irregular rhythms.
- u4l4 `Graphs, Tables, and Trend Data` (RPS-B, 8). Covers: axes, labels, units, scale; reading a value off a line graph; bar charts; reading a two-way table (row then column); spec tables and lookup tables (color code, fuse ratings); trends over time (a leakage reading creeping up across PMs, a battery run time falling); percent change; spotting the outlier.
- u4l5 `Flowcharts and the Process of Elimination` (RPS-C, 9). Covers: flowchart symbols (oval start and end, rectangle step, diamond decision, arrows); following a troubleshooting tree; halving the problem; swap with a known-good accessory; simplest and cheapest cause first; one change at a time; the order patient, user, accessory, device; writing down what you ruled out; when to stop and escalate.
- u4l6 `Reading a Service Manual` (RPS-C, 9). Covers: the sections (safety warnings, specifications, theory of operation, setup and configuration, PM procedure and interval, calibration, troubleshooting and error codes, parts list with part numbers, schematics and block diagrams); specifications and tolerances; finding the fuse rating, the battery part number, the PM checklist; model, serial, and revision; the IFU (for the user) versus the service manual (for you); where manuals live (CMMS, manufacturer site, the department library).
- u4l7 `Work Orders and Documentation` (RPS-C, 8). Covers: the CMMS; a work order's fields (asset ID, location, problem reported, what you found, what you did, parts, time, test results and pass/fail, name and date); plain-sentence documentation; PM due dates and completion rates; the incoming inspection record; the asset tag; why documentation matters (surveys, recalls, patterns, legal); "if it is not written down it did not happen".

**Unit u5 "Safety in Healthcare"** (domain 3; assumes unit 3)
- u5l1 `Electrical Safety: Macroshock, Microshock, and Why Leakage Matters` (SAF-B, 10). Covers: the shock current table verbatim; skin resistance dry versus wet; macroshock through the skin in milliamps versus microshock to the heart in microamps (10 microamps); why patients are vulnerable (catheters, pacing wires, wet skin, no ability to let go); leakage current and where it comes from (capacitance in cords and transformers, insulation); the ground path as the way out; the patient care vicinity (6 ft, 7.5 ft); environmental and chemical hazards named as the other two hazard classes.
- u5l2 `The Electrical Safety Test: Ground Resistance and Leakage` (SAF-B, 10, `lab: "safety-pass"`). Covers: what the electrical safety analyzer does; ground wire resistance 0.5 ohm maximum (NFPA 99); chassis leakage 500 microamps (NFPA 99 current editions, older 300 or 100); the test conditions (normal, reversed polarity, open ground, open neutral) and why open ground with reversed polarity is the worst case; the sequence; when to test (incoming inspection, after repair, on the PM schedule); recording a passing result; the lab.
- u5l3 `Reading the Limits: NFPA 99, IEC 60601-1, and a Failing Device` (SAF-D, 10, `lab: "safety-fail"`). Covers: the IEC 60601-1 table verbatim (touch, patient leakage B/BF and CF, earth leakage, normal and single fault); Class I, Class II, internally powered; applied part types B, BF, CF and their symbols; defibrillation-proof; which limit applies to which device; what to do on a fail (stop, tag out of service, document, repair, retest); leakage trends; the lab.
- u5l4 `Lockout Tagout, Safety Data Sheets, and Hazard Communication` (SAF-A, 9). Covers: LOTO steps (notify, shut down, isolate, lock and tag, release stored energy, verify zero energy), who removes a lock, stored energy in capacitors, springs, pressure, batteries; HazCom and GHS labels and pictograms; the SDS and its 16 sections (which sections you read first: hazards, first aid, fire, handling, PPE); chemicals in a shop (solvents, cleaners, battery acid, compressed gas); eyewash and ventilation.
- u5l5 `Medical Gas Color Codes, Signage, and Symbols` (SAF-A, 9). Covers: US gas colors (oxygen green, medical air yellow, nitrous oxide blue, nitrogen black, carbon dioxide gray, vacuum white); cylinder sizes E and H, full E about 2,000 to 2,200 psi and about 660 liters, wall outlets about 50 psi; regulators, pin index safety system and DISS fittings, no adapters, no oil on oxygen fittings; securing and storing cylinders; zone valves; signage (oxygen in use, no smoking, radiation, laser, biohazard, MRI zones); device symbols (type B, BF, CF, Class II, consult the instructions, warning triangle, defibrillation-proof).
- u5l6 `Infection Control, Standard Precautions, and PPE` (SAF-C, 9). Covers: hand hygiene; standard (universal) precautions; PPE and the order on and off; gloves, gowns, surgical masks, N95 respirators, eye protection; sharps; cleaning, disinfecting, sterilizing and the Spaulding categories; clean a device before it comes to the bench; isolation signs (contact, droplet, airborne); bloodborne pathogens; the hepatitis B vaccine; what to do after an exposure.
- u5l7 `Device-Specific Hazards: Imaging, Defibrillators, Lasers, MRI, Lab Equipment, and Fire` (SAF-D, 10). Covers: X-ray and radiation (ALARA, time, distance, shielding, dosimeter); MRI (the magnet is always on, projectiles, zones I to IV, non-ferrous tools, quench); ultrasound; defibrillators (stored charge, clear, pads versus paddles, disarm); electrosurgery (burns, return electrode); lasers (classes, eyewear); lab equipment (centrifuge rotor and lid lock, chemicals, biohazard, autoclave steam); fire (RACE, PASS, classes A, B, C, K); mechanical hazards (beds, lifts, pinch points); PPE for each.

- [ ] **Step 2: Write `courses/bmet/deep-2.js`** (one entry per lesson, at least 300 words each, fenced memorize tables)

- [ ] **Step 3: Write `courses/bmet/questions-2.js`** (5 per lesson, 70 total), then `node tests/balance-keys.js courses/bmet/questions-2.js`

Unit 4 questions are worked problems with clean numbers: conversions, percent error, ECG rate, reading a described gauge, choosing the next flowchart step, finding a value in a described table. Unit 5 questions use the verbatim limits and name the standard in the explanation.

- [ ] **Step 4: Write `courses/bmet/labs-2.js`** (exact content)

```js
// BMET Academy labs, units 4 and 5: reading figures, and the electrical safety analyzer. Original content.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};

FRA.labs["reading-scales"] = {
  id: "reading-scales", lesson: "u4l2", title: "Read the meter, the cylinder, and the strip", instrument: "figures",
  intro: `Three figures, no controls. Read each one the way you would on the bench, then do the arithmetic.

- Figure 1 is an analog voltmeter on its 0 to 10 V range. The face prints 0, 5, and 10 and the small ticks are 1 V apart; read where the needle points and estimate the tenths between ticks.
- Figure 2 is a 100 mL graduated cylinder marked every 10 mL. Read the bottom of the liquid level and estimate to the nearest milliliter between marks.
- Figure 3 is six seconds of ECG at 25 mm/s. Count the QRS complexes and multiply by ten.`,
  manual: `## Flow check acceptance
Expected volume in the 30-minute collection: 40 mL. Acceptable: within plus or minus 5% of expected.`,
  scenario: { figures: [
    { kind: "meter", min: 0, max: 10, value: 6.4, unit: "V", caption: "Figure 1. Analog voltmeter, 0 to 10 V range." },
    { kind: "cylinder", ml: 100, value: 37, caption: "Figure 2. 100 mL graduated cylinder after a 30-minute collection." },
    { kind: "strip", rate: 100, value: 100, seconds: 6, caption: "Figure 3. Six seconds of ECG at 25 mm/s." }
  ] },
  tasks: [
    { id: "meter", kind: "reading", prompt: "Figure 1: the voltmeter reads", unit: "V", expect: [6.2, 6.6], measure: { figure: 0 } },
    { id: "cyl", kind: "reading", prompt: "Figure 2: the cylinder holds", unit: "mL", expect: [36, 38], measure: { figure: 1 } },
    { id: "rate", kind: "reading", prompt: "Figure 3: heart rate from the six-second strip", unit: "bpm", expect: [95, 105], measure: { figure: 2 } },
    { id: "pct", kind: "reading", prompt: "Percent error of the collected volume against the expected 40 mL (keep the sign)", unit: "%", expect: [-7.6, -7.4] },
    { id: "v", kind: "verdict", prompt: "Against the manual's plus or minus 5%, does the flow check pass?", expect: "fail" }
  ],
  why: {
    meter: "The needle sits just past the 6 V tick, about four tenths of the way to 7: 6.4 V. Read straight on to avoid parallax.",
    cyl: "The bottom of the meniscus sits a little under the 40 mark, about three tenths of a division below it: 37 mL.",
    rate: "Ten complexes in six seconds; 10 x 10 = 100 bpm. Six-second strip times ten gives beats per minute.",
    pct: "(37 - 40) / 40 x 100 = -7.5%. The minus sign says the pump delivered less than expected.",
    v: "Plus or minus 5% of 40 mL is 38 to 42 mL. 37 mL is outside that band, so the check fails and the pump needs service."
  }
};

FRA.labs["safety-pass"] = {
  id: "safety-pass", lesson: "u5l2", title: "Safety test on a good infusion pump", instrument: "safety",
  intro: `A large-volume infusion pump, Class I (three-prong cord), no conductive patient connection, back from a repair. Run the electrical safety test and decide whether it goes back to the floor.

- Select the test, the mains polarity, and the ground conductor condition, then press **Test**.
- Ground wire resistance is measured once. Chassis leakage is measured in every condition: normal, reversed polarity, open ground, and reversed polarity with open ground.
- Compare every reading with the limits card. The device passes only if every reading is under its limit.`,
  manual: `## Electrical safety limits (NFPA 99, cord-connected patient-care equipment)
- Ground wire resistance, chassis to plug ground pin: 0.5 ohm maximum
- Chassis (touch) leakage: 500 microamps maximum in every test condition
- Sequence: visual inspection and cord check, ground resistance, chassis leakage in each condition, document`,
  scenario: { standard: "NFPA 99", ground: 0.11, chassis: { normal: 42, reverse: 58, "normal-open": 170, "reverse-open": 205 }, limits: { ground: 0.5, chassis: 500 } },
  tasks: [
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.08, 0.14], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chn", kind: "reading", prompt: "Chassis leakage, normal polarity, ground intact", unit: "uA", expect: [40, 44], measure: { test: "chassis", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [203, 207], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "worst", kind: "choice", prompt: "Which condition gave the highest leakage?", options: ["Reversed polarity with the ground open", "Normal polarity with the ground intact", "Normal polarity with the ground open", "Reversed polarity with the ground intact"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the pump pass?", expect: "pass" },
    { id: "src", kind: "choice", prompt: "Where does the 500 microamp chassis limit on the card come from?", options: ["NFPA 99, for cord-connected patient-care equipment", "The pump's user manual", "OSHA", "The battery manufacturer"], expect: 0 }
  ],
  why: {
    gnd: "The ground path reads about 0.11 ohm, well under the 0.5 ohm NFPA 99 limit. A reading near or over 0.5 ohm points to a worn cord, plug, or strain relief.",
    chn: "About 42 microamps in the normal condition: the leakage that flows all the time, carried away by the ground wire.",
    chw: "With the ground lifted and the polarity reversed the chassis leakage rises to about 205 microamps. That is the worst case, and it is still under 500.",
    worst: "Opening the ground removes the path that carries leakage away, and reversing polarity puts the hot conductor where the filters leak most. Together they give the highest reading.",
    v: "Every reading is under its limit: 0.11 ohm against 0.5, and the worst chassis leakage 205 microamps against 500. Pass, document it, return it to service.",
    src: "NFPA 99 sets the facility limits a hospital tests to: 0.5 ohm ground resistance and 500 microamps chassis leakage for cord-connected patient-care equipment in current editions (older editions used 300 or 100)."
  }
};

FRA.labs["safety-fail"] = {
  id: "safety-fail", lesson: "u5l3", title: "Find the failing reading and name its limit", instrument: "safety",
  intro: `A vital-signs monitor, Class I, with a type BF applied part (the SpO2 sensor). Run the full test: ground resistance, chassis leakage in every condition, and patient lead leakage in every condition. One reading fails. Find it, say which limit it broke, and decide what happens to the monitor.`,
  manual: `## Electrical safety limits (NFPA 99 and IEC 60601-1)
- Ground wire resistance: 0.5 ohm maximum (NFPA 99)
- Chassis (touch) leakage: 500 microamps maximum in every condition (NFPA 99)
- Patient applied-part leakage, type BF: 100 microamps maximum (IEC 60601-1, normal condition); type CF applied parts allow only 10 microamps
- A device that fails any reading is tagged out of service until repaired and retested`,
  scenario: { standard: "NFPA 99 / IEC 60601-1", ground: 0.14, chassis: { normal: 95, reverse: 140, "normal-open": 480, "reverse-open": 640 }, lead: { normal: 12, reverse: 15, "normal-open": 48, "reverse-open": 61 }, limits: { ground: 0.5, chassis: 500, lead: 100 } },
  tasks: [
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.11, 0.17], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [638, 642], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "ldw", kind: "reading", prompt: "Patient lead leakage, reversed polarity, ground open", unit: "uA", expect: [59, 63], measure: { test: "lead", polarity: "reverse", ground: "open" } },
    { id: "which", kind: "choice", prompt: "Which reading fails?", options: ["Chassis leakage with reversed polarity and open ground: 640 against a 500 microamp limit", "Ground resistance", "Patient lead leakage", "None of them"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the monitor pass?", expect: "fail" },
    { id: "next", kind: "choice", prompt: "What happens now?", options: ["Tag it out of service, document the readings, send it for repair, retest before it returns", "Return it: the normal-condition readings all pass", "Retest until a reading under 500 appears", "Replace the SpO2 sensor and return it"], expect: 0 },
    { id: "cf", kind: "choice", prompt: "If the applied part were type CF (direct cardiac), which lead leakage limit would apply?", options: ["10 microamps", "100 microamps", "500 microamps", "5 mA"], expect: 0 }
  ],
  why: {
    gnd: "About 0.14 ohm, under the 0.5 ohm limit. The ground path is fine; the problem is elsewhere.",
    chw: "About 640 microamps in the worst case. That is above the 500 microamp NFPA 99 chassis limit. The other chassis conditions pass, which is why the test runs every condition.",
    ldw: "About 61 microamps from the applied part in the worst case, under the 100 microamp limit for a type BF part.",
    which: "Only the chassis leakage under reversed polarity with an open ground exceeds its limit. A single failing condition fails the device.",
    v: "One reading over its limit is a fail. The patient would only be at risk in that fault condition, but the test exists to catch exactly that.",
    next: "A failing device never goes back to a patient. Tag it, write down every reading, repair (often a filter capacitor or cord), and retest to prove the fix.",
    cf: "A type CF applied part can connect to the heart, where 10 microamps can cause fibrillation, so IEC 60601-1 allows only 10 microamps in the normal condition (50 under a single fault)."
  }
};
```

- [ ] **Step 5: Validate and commit**

```bash
node tests/packcheck.js courses/bmet
node tests/labcheck.js courses/bmet
node tests/acronyms.js courses/bmet
```
Expected: 5 units, 32 lessons (per domain `{"7":3,"1":6,"4":9,"5":7,"3":7}`), 32 deep dives, 160 questions, packcheck OK; 8 labs on 8 lessons, instruments `dmm, figures, safety`, labcheck OK; acronyms pass.

```bash
git add courses/bmet/curriculum-2.js courses/bmet/deep-2.js courses/bmet/questions-2.js courses/bmet/labs-2.js courses/bmet/acronyms.js
git commit -m "feat(bmet): units 4 and 5: math and reasoning, safety in healthcare, with the figures lab and two safety-analyzer labs"
```

---

### Task 6: Units 6 to 8 (21 lessons, 105 questions, five labs)

**Files:**
- Create: `courses/bmet/curriculum-3.js`, `courses/bmet/deep-3.js`, `courses/bmet/questions-3.js`, `courses/bmet/labs-3.js`
- Modify: `courses/bmet/acronyms.js`

**Interfaces:**
- Consumes: Conventions; `tests/labcheck.js`.
- Produces: units `u6` (domain 2), `u7` (domain 6), `u8` (domain 7); labs `monitor-pm` (u6l3), `infusion-check` (u6l5), `defib-check` (u6l6), `incoming-inspection` (u6l9), `ping-walkthrough` (u7l3).

- [ ] **Step 1: Write `courses/bmet/curriculum-3.js`**

**Unit u6 "Medical Devices and Test Equipment"** (domain 2; assumes units 2 and 5)
- u6l1 `Diagnostic Devices` (MD-A, 10). Covers: otoscope (ear canal, specula, lamp, battery handle), ophthalmoscope (eye, lens dial), thermometers (oral, rectal, tympanic, temporal, probe covers, thermistor), scales (floor, chair, bed, infant, calibration weights, zero), bladder scanner (ultrasound volume, gel, aim), EKG cart (12 leads, electrodes, paper, filters, the 25 mm/s paper), microscope (objectives, stage, light), centrifuge (balance opposite tubes, rotor, lid lock, tachometer speed check), spot-check vital signs monitors; for each: what it does and one PM check.
- u6l2 `Patient Monitoring` (MD-B, 10). Covers: ECG (leads, electrodes, lead II, skin prep, rate alarms), non-invasive blood pressure (oscillometric, cuff size, cycle interval, hose), pulse oximetry (red and infrared light, probe sites, perfusion, motion, nail polish), EtCO2 (sidestream, mainstream, 35 to 45 mmHg, water trap), temperature probes, telemetry (transmitter, batteries, antennas, central station, WMTS), invasive pressure at recognition level, alarm limits and alarm fatigue.
- u6l3 `Verifying a Monitor With a Patient Simulator` (MD-E, 9, `lab: "monitor-pm"`). Covers: what a patient simulator generates (ECG rhythms and rates, SpO2 through a finger simulator, NIBP through a pressure simulator, temperature, respiration); why a simulator draws no current and is not a safety test; the PM: visual, cables and connectors, electrical safety, apply the simulator, compare each numeric with the manual's tolerance, alarm checks with asystole and ventricular fibrillation, document; the lab.
- u6l4 `Infusion Devices` (MD-C, 10). Covers: large-volume pumps (peristaltic mechanism, administration sets, free-flow protection, air-in-line and occlusion alarms, drug library, rate in mL/h, VTBI, KVO), syringe pumps (small volumes, syringe sizes, driver), PCA pumps (patient button, lockout interval, key or code), enteral feeding pumps (ENFit connectors so feeds cannot connect to IV lines), gravity and drop factor at recognition level, battery, cleaning.
- u6l5 `Checking an Infusion Pump's Flow Rate` (MD-E, 9, `lab: "infusion-check"`). Covers: the volumetric check (graduated cylinder, stopwatch, 30-minute collection, rate = volume / minutes x 60, percent error, typical acceptance plus or minus 5%); the gravimetric check (scale, 1 g of water = 1 mL); occlusion alarm test, air-in-line test, battery run time, free-flow clamp check; document; the lab.
- u6l6 `Defibrillators, AEDs, and the Defibrillator Analyzer` (MD-C, 10, `lab: "defib-check"`). Covers: what defibrillation does (ventricular fibrillation, pulseless ventricular tachycardia), manual versus AED, monophasic versus biphasic waveforms, energies (biphasic adult 120 to 200 J, monophasic 360 J, pediatric 2 to 4 J/kg), synchronized cardioversion, external pacing, pads versus paddles, the analyzer (50 ohm load, delivered energy, charge time, sync delay), daily user checks, battery and pad expiry, the stored-charge hazard; the lab.
- u6l7 `Suction, Warming and Cooling, SCDs, and Physical Therapy Equipment` (MD-C, 9). Covers: suction (wall regulator, portable suction pump, canister, filter, gauge in mmHg, test by clamping the tubing), patient warming and cooling (forced-air warmers, fluid warmers, warming and cooling blankets, infant warmers and incubators at recognition level), sequential compression devices (sleeves, cycle, tubing), physical therapy equipment (TENS, therapeutic ultrasound, CPM machines, treadmills, hot and cold packs); for each: what it delivers and a basic check.
- u6l8 `Hand Tools and the Biomed Toolbox` (MD-D, 9). Covers: screwdrivers (Phillips, flat, Torx, security bits), Allen wrenches (metric and SAE), torque wrench (why torque matters, in-lb and N-m), channel locks, needle-nose pliers, diagonal cutters, wire stripper, vice grips, nut drivers, crimpers, soldering basics, stopwatch, graduated cylinder, tachometer (RPM), calibration weights and scale, flashlight, label maker; tool care; calibration stickers on test equipment; misuse to avoid (pliers on nuts, the wrong screwdriver, a torque wrench as a breaker bar).
- u6l9 `Incoming Inspection and Scheduled Maintenance, Start to Finish` (MD-E, 10, `lab: "incoming-inspection"`). Covers: incoming inspection in order (packing slip against the purchase order, physical inspection, accessories and manuals, asset tag and CMMS entry, electrical safety test, function test per the manual, configuration such as alarm limits and network, user training, release); scheduled maintenance (interval, checklist, consumables such as filters and batteries, calibration, label, document); what "PM due" means and why completion rates are tracked; the lab.
- u6l10 `Minor Troubleshooting: The First Checks` (MD-E, 9). Covers: power (plugged in, switched on, battery), outlet (test with another device), fuse or breaker, cables and connectors, swap the accessory, user error versus device fault (ask what happened), look up the error code, restart, check the simple thing first, know your scope and when to stop, communicate with the user, document everything; the multimeter, safety analyzer, and simulator as the first-line test equipment.

**Unit u7 "Healthcare IT"** (domain 6; assumes nothing beyond unit 1)
- u7l1 `Inside a Computer` (HIT-B, 9). Covers: CPU, RAM (volatile), storage (hard drive with spinning platters, solid-state drive), GPU, power supply, motherboard, ports, BIOS/UEFI, the operating system, drivers; local printers (USB) versus network printers (IP address, print queue); laptops, desktops, tablets; the computer inside a medical device (embedded, do not update without the vendor).
- u7l2 `Connectors and Cables` (HIT-C, 9). Covers: USB-A, USB-B, USB-C, micro-USB, mini-USB and USB speeds; video outputs HDMI, DisplayPort, VGA, DVI; network cables RJ45 on Cat5e and Cat6, fiber; serial RS-232 on a DB9 (common on devices); power connectors; audio; identifying a connector by shape; cable care and strain relief; adapters.
- u7l3 `Networks: LAN, WAN, Wi-Fi, and the Data Closet` (HIT-D, 10, `lab: "ping-walkthrough"`). Covers: LAN versus WAN, switch, router, default gateway, IP address, subnet mask (same first three octets with 255.255.255.0 means the same subnet), DHCP versus static, DNS; Wi-Fi (SSID, 2.4 and 5 GHz, WPA2 and WPA3), Bluetooth, RFID (asset tags, RTLS); VLAN (medical devices on their own VLAN), VPN (vendor remote access); the data closet (IDF, MDF), server rack, patch panel; ping and ipconfig; telemetry on WMTS; the lab.
- u7l4 `Apps and Smartphones on the Job` (HIT-A, 8). Covers: the CMMS mobile app, barcode and QR scanning of asset tags, PDF manuals and manufacturer libraries, the camera for documentation (never a patient or a screen with patient data), email and messaging etiquette, calendar for PM schedules, authenticator apps, phone hygiene in clinical areas, app permissions and updates, personal versus work devices.
- u7l5 `HIPAA, the EMR, and Device Integration` (HIT-E, 9). Covers: protected health information, minimum necessary, the privacy rule and the security rule, breach reporting; the electronic medical record; device integration (device data to the chart through an interface or middleware, HL7 at recognition level, barcode patient identification, admit-discharge-transfer feeds); PHI stored on devices (monitors, pumps, ultrasound) and wiping before return or disposal; screen privacy; photographs; business associate agreements for vendors at recognition level.
- u7l6 `Network Security Basics` (HIT-F, 9). Covers: firewalls (and the medical device VLAN behind one), phishing (spot it, do not click, report it), patches (vendor-validated for devices, prompt for workstations), passwords and passphrases, multi-factor authentication, locking the screen, USB hygiene, antivirus, least privilege, ransomware at recognition level, reporting an incident at once.

**Unit u8 "Getting Hired"** (domain 7; assumes the course)
- u8l1 `Where the Jobs Are and How Each Hires` (Career, 8). Covers: hospital in-house HTM departments, independent service organizations, manufacturer field service, military (the Department of Defense BMET program), clinics, dialysis and imaging centers; titles (BMET I, field service technician, equipment technician); how each hires (postings, referrals, apprenticeships, veteran programs, associate degree programs, the AAMI career center); what a first job pays attention to (safety habits, documentation, attitude).
- u8l2 `Your Resume and Your Lab Portfolio` (Career, 8). Covers: one page; a skills section in the employer's words (electrical safety testing, multimeter, PM procedures, CMMS, incoming inspection); the lab portfolio (your lab records from this course, kit photos, the certificate of completion, the CABT); matching keywords from the posting; references; a clean online presence.
- u8l3 `Interviews and the Hands-On Test` (Career, 8). Covers: common questions and the STAR format for behavioral answers; the practical (safety test a device, find a fault in a pump, read a schematic, identify tools); what the interviewer watches for (method, safety, asking before guessing, communication); questions to ask them; follow-up.
- u8l4 `Your First 90 Days` (Career, 8). Covers: shadowing; learning the CMMS and the PM backlog; documenting everything; asking before guessing; safety habits every time; building relationships with nursing and IT; owning mistakes and reporting them; training logs and competencies; the probation review.
- u8l5 `The Certification Ladder` (Career, 8). Covers: CABT now; CBET full status after an associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of work alone (candidate status opens at the degree, the military program, or two years of work, with five years to upgrade), 165 questions in three hours, offered in May and November at test centers, recertified every three years; CRES for imaging; CHTM for managers; AAMI membership and continuing education; what to study next; the CABT does not renew, so plan the CBET inside five years.

- [ ] **Step 2: Write `courses/bmet/deep-3.js`** (one entry per lesson, at least 300 words each, fenced memorize tables; the device entries carry a "what it does / settings / first check / common false alarm" table)

- [ ] **Step 3: Write `courses/bmet/questions-3.js`** (5 per lesson, 105 total), then `node tests/balance-keys.js courses/bmet/questions-3.js`

Unit 6 questions name a device and ask what it does, what it measures or delivers, which tool checks it, or the first troubleshooting step. Unit 7 questions name a connector, a network term, or a security situation. Unit 8 questions are about hiring, the practical interview, documentation habits, and the ladder (eligibility, timing, validity).

- [ ] **Step 4: Write `courses/bmet/labs-3.js`** (exact content)

```js
// BMET Academy labs, units 6 and 7: simulator and monitor, infusion flow check, defibrillator analyzer,
// incoming inspection on the safety analyzer, and a ping walkthrough. Original content.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};

FRA.labs["monitor-pm"] = {
  id: "monitor-pm", lesson: "u6l3", title: "Verify a bedside monitor with a patient simulator", instrument: "monitor",
  intro: `The simulator stands in for the patient. Set it, apply, and read what the monitor shows. A monitor passes when every number it displays is within the manual's tolerance of what the simulator sent.

- Set the simulator to 60 bpm, normal sinus rhythm, SpO2 97%, NIBP 120/80, then press **Apply**.
- Record each monitor value with the Record button (or type it), then compute the heart rate error.
- Finish with the alarm check: switch the rhythm to asystole and apply.`,
  manual: `## Performance verification tolerances
- Heart rate: within plus or minus 2 bpm of the simulator rate
- SpO2: within plus or minus 2% of the simulator setting
- NIBP: within plus or minus 3 mmHg, systolic and diastolic
- Alarms: asystole and ventricular fibrillation must each raise a visible alarm`,
  scenario: { hrErr: 1, spo2Err: -1, sysErr: 2, diaErr: -1, tolerance: { hr: 2, spo2: 2, nibp: 3 } },
  tasks: [
    { id: "hr", kind: "reading", prompt: "Monitor heart rate with the simulator at 60 bpm", unit: "bpm", expect: [60, 62], measure: { param: "hr", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "spo2", kind: "reading", prompt: "Monitor SpO2 with the simulator at 97%", unit: "%", expect: [95, 97], measure: { param: "spo2", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "sys", kind: "reading", prompt: "Monitor systolic with the simulator at 120", unit: "mmHg", expect: [121, 123], measure: { param: "sys", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "dia", kind: "reading", prompt: "Monitor diastolic with the simulator at 80", unit: "mmHg", expect: [78, 80], measure: { param: "dia", set: { hr: 60, rhythm: "nsr", spo2: 97, sys: 120, dia: 80 } } },
    { id: "err", kind: "reading", prompt: "Heart rate error: monitor minus simulator, in bpm", unit: "bpm", expect: [0.5, 1.5] },
    { id: "v", kind: "verdict", prompt: "Against the manual's tolerances, does the monitor pass?", expect: "pass" },
    { id: "asys", kind: "choice", prompt: "Switch the rhythm to asystole and apply. What should the monitor do?", options: ["Show a heart rate of 0 and raise an ASYSTOLE alarm", "Keep showing 60 until the next reading", "Show the SpO2 as the heart rate", "Switch itself off"], expect: 0 }
  ],
  why: {
    hr: "The simulator sends 60 bpm; this monitor reads 61. One beat high is inside the plus or minus 2 bpm tolerance.",
    spo2: "Set 97, shown 96. One percent low is inside plus or minus 2%.",
    sys: "Set 120, shown 122. Two mmHg high is inside plus or minus 3 mmHg.",
    dia: "Set 80, shown 79. One mmHg low is inside plus or minus 3 mmHg.",
    err: "61 minus 60 = 1 bpm. Error is always the device's reading minus the known input.",
    v: "Every parameter is inside its tolerance (1 bpm, 1%, 2 mmHg, 1 mmHg), so the monitor passes performance verification. Record the simulator settings and the monitor readings side by side.",
    asys: "Asystole is a flat line: the monitor must read 0 and alarm. The alarm check is part of every monitor PM because a monitor that measures well but never alarms is dangerous."
  }
};

FRA.labs["infusion-check"] = {
  id: "infusion-check", lesson: "u6l5", title: "Flow rate check with a graduated cylinder", instrument: "infusion",
  intro: `Set the pump, run it into the cylinder for a timed collection, read the volume, and compute what the pump really delivered.

- Set the rate to **120 mL/h** and the VTBI to 100 mL, press **Start**, then fast-forward to **30 minutes** (three presses of +10 min).
- Read the cylinder to the nearest milliliter and record it.
- Delivered rate = volume / 30 minutes x 60. Percent error = (delivered minus set) / set x 100.`,
  manual: `## Flow rate accuracy
- Plus or minus 5% of the set rate, from 1 to 999 mL/h, verified by a timed volumetric collection of at least 30 minutes
- Read the cylinder at eye level, bottom of the meniscus, to the nearest graduation`,
  scenario: { rateErr: 0.03, cylinderMl: 100, graduation: 1, tolerance: 5 },
  tasks: [
    { id: "vol", kind: "reading", prompt: "Volume in the cylinder after 30 minutes at 120 mL/h", unit: "mL", expect: [61, 63], measure: { what: "volume", rate: 120, minutes: 30 } },
    { id: "rate", kind: "reading", prompt: "Delivered rate = volume / 30 x 60", unit: "mL/h", expect: [122, 126], measure: { what: "rate", rate: 120, minutes: 30 } },
    { id: "pct", kind: "reading", prompt: "Percent error against the set 120 mL/h", unit: "%", expect: [1.5, 5.0], measure: { what: "error", rate: 120, minutes: 30 } },
    { id: "v", kind: "verdict", prompt: "Against the manual's plus or minus 5%, does the pump pass?", expect: "pass" },
    { id: "half", kind: "choice", prompt: "Why collect for 30 minutes rather than 5?", options: ["A longer collection averages out the pump's stroke-to-stroke variation and makes a 1 mL reading error small", "The pump needs 30 minutes to warm up", "Shorter collections are not allowed by HIPAA", "The cylinder only reads correctly when nearly full"], expect: 0 }
  ],
  why: {
    vol: "At 120 mL/h for 30 minutes the pump should deliver 60 mL. This pump runs about 3% fast, so the cylinder shows about 62 mL.",
    rate: "62 mL / 30 min x 60 = 124 mL/h. Always convert the collection back to the pump's units before comparing.",
    pct: "(124 minus 120) / 120 x 100 = 3.3%. Positive means the pump over-delivers.",
    v: "3.3% is inside plus or minus 5%, so the flow check passes. Document the set rate, the time, the volume, and the computed error.",
    half: "A 1 mL misreading on a 10 mL collection is 10%; on a 60 mL collection it is under 2%. Longer collections also average the small pulses of a peristaltic mechanism."
  }
};

FRA.labs["defib-check"] = {
  id: "defib-check", lesson: "u6l6", title: "Delivered energy on the defibrillator analyzer", instrument: "defib",
  intro: `Discharge the defibrillator into the analyzer at each energy on the list and record what the analyzer measured. The analyzer presents a 50 ohm load, the standard stand-in for a patient's chest.

- Select an energy, press **Charge**, then **Discharge into the analyzer**. Record the delivered energy for 2, 50, 200, and 360 J.
- The manual's allowance is a percentage or a fixed number of joules, whichever is larger, so low energies get the fixed allowance.
- Never discharge a real defibrillator into the air, onto a bench, or with anyone touching the paddles.`,
  manual: `## Delivered energy accuracy (into a 50 ohm load)
- Plus or minus 15% of the selected energy, or plus or minus 3 J, whichever is greater, at every setting from 2 J to 360 J
- Charge time to 360 J from a full battery: 10 seconds or less`,
  scenario: { energies: [2, 50, 200, 360], deliveredErr: { "2": 0.1, "50": -0.04, "200": 0.03, "360": -0.05 }, tolerance: { pct: 15, floor: 3 } },
  tasks: [
    { id: "e2", kind: "reading", prompt: "Delivered energy at the 2 J setting", unit: "J", expect: [1.9, 2.5], measure: { energy: 2 } },
    { id: "e50", kind: "reading", prompt: "Delivered energy at the 50 J setting", unit: "J", expect: [47, 49], measure: { energy: 50 } },
    { id: "e200", kind: "reading", prompt: "Delivered energy at the 200 J setting", unit: "J", expect: [205, 207], measure: { energy: 200 } },
    { id: "e360", kind: "reading", prompt: "Delivered energy at the 360 J setting", unit: "J", expect: [341, 343], measure: { energy: 360 } },
    { id: "pct360", kind: "reading", prompt: "Percent error at 360 J (keep the sign)", unit: "%", expect: [-5.5, -4.5] },
    { id: "v", kind: "verdict", prompt: "Against the manual, does the defibrillator pass at every setting?", expect: "pass" },
    { id: "floor", kind: "choice", prompt: "At 2 J the analyzer read 2.2 J, which is 10% high. Pass or fail, and why?", options: ["Pass: 0.2 J is inside the 3 J allowance that applies at low energies", "Fail: 10% is close to the 15% limit", "Fail: any error at 2 J is dangerous", "Pass: the analyzer rounds to the nearest joule"], expect: 0 }
  ],
  why: {
    e2: "Set 2 J, delivered about 2.2 J. At this setting the 3 J fixed allowance governs, so anything from 0 to 5 J passes.",
    e50: "Set 50 J, delivered about 48 J. The allowance is the larger of 15% (7.5 J) and 3 J, so 42.5 to 57.5 J passes.",
    e200: "Set 200 J, delivered about 206 J. The allowance is 30 J (15%), so 170 to 230 J passes.",
    e360: "Set 360 J, delivered about 342 J. The allowance is 54 J (15%), so 306 to 414 J passes.",
    pct360: "(342 minus 360) / 360 x 100 = -5.0%. Negative means the delivered energy is low.",
    v: "Every setting is inside its allowance, so the defibrillator passes the energy check. Record each setting and delivered value; a drift over successive PMs predicts a failing capacitor.",
    floor: "Percent limits become meaningless at tiny energies (15% of 2 J is 0.3 J), so the manual gives a fixed floor. 0.2 J off is well inside 3 J."
  }
};

FRA.labs["incoming-inspection"] = {
  id: "incoming-inspection", lesson: "u6l9", title: "Incoming inspection on a new suction unit", instrument: "safety",
  intro: `A new portable suction unit has arrived. Walk the incoming inspection in order: paperwork and visual inspection, the electrical safety test on the analyzer, the function check, and the record.

- The analyzer below is for the safety test step: ground resistance and chassis leakage in every condition. This unit has no conductive patient connection, so there is no lead leakage test.
- The other steps are questions about what comes next and why.`,
  manual: `## Electrical safety limits (NFPA 99, cord-connected patient-care equipment)
- Ground wire resistance: 0.5 ohm maximum
- Chassis (touch) leakage: 500 microamps maximum in every condition
## Function check (from the unit's service manual)
- With the tubing clamped, the vacuum gauge must reach the set level within 5 seconds and hold; maximum vacuum at least 500 mmHg`,
  scenario: { standard: "NFPA 99", ground: 0.09, chassis: { normal: 30, reverse: 44, "normal-open": 120, "reverse-open": 150 }, limits: { ground: 0.5, chassis: 500 } },
  tasks: [
    { id: "first", kind: "choice", prompt: "The box is open. What is the first step?", options: ["Check the packing slip against the purchase order, then inspect the unit, accessories, and manuals for damage and completeness", "Plug it in and run the safety test", "Put it on a cart for the floor", "Enter a PM schedule"], expect: 0 },
    { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.06, 0.12], measure: { test: "ground", polarity: "normal", ground: "closed" } },
    { id: "chw", kind: "reading", prompt: "Chassis leakage, reversed polarity, ground open", unit: "uA", expect: [148, 152], measure: { test: "chassis", polarity: "reverse", ground: "open" } },
    { id: "fn", kind: "choice", prompt: "Which function check is right for a suction unit?", options: ["Clamp the tubing: the gauge must reach the setting within 5 seconds and hold it", "Run it dry for an hour and listen", "Measure the motor current", "Fill the canister with water and time how fast it empties"], expect: 0 },
    { id: "v", kind: "verdict", prompt: "Does the unit pass incoming inspection?", expect: "pass" },
    { id: "paper", kind: "choice", prompt: "Last step before the unit goes to the floor?", options: ["Asset tag on the unit, CMMS entry with model, serial, location, PM interval, and today's test results, then user training if the model is new to the floor", "Email the vendor", "Put the manual in the box and store it", "Nothing; the safety test is the record"], expect: 0 }
  ],
  why: {
    first: "Incoming inspection starts with paperwork and eyes: is this what was ordered, is anything missing or damaged in shipping. Powering a damaged unit can hide or worsen the problem.",
    gnd: "About 0.09 ohm, well under 0.5 ohm. New cords usually read very low; a high reading on a new unit means shipping damage or a bad plug.",
    chw: "About 150 microamps in the worst case, under the 500 microamp limit. Record every condition, not just the worst.",
    fn: "A suction unit's job is vacuum. Clamp the line so no air enters, set the regulator, and the gauge must reach and hold the setting. Compare the maximum with the manual's specification.",
    v: "Paperwork complete, no damage, every safety reading under its limit, and the function check meets the specification: the unit passes.",
    paper: "The record is what makes the unit findable and schedulable: an asset tag, a CMMS entry with the test results, and a PM interval. Training the users is part of release when the model is new to them."
  }
};

FRA.labs["ping-walkthrough"] = {
  id: "ping-walkthrough", lesson: "u7l3", title: "Read a ping and an ipconfig", instrument: "choices",
  intro: `A central station cannot see a telemetry server. You open a command prompt on the station and run two commands. Read the output and answer.`,
  scenario: { text: "C:\\>ipconfig\n\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . : 10.20.4.57\n   Subnet Mask . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . : 10.20.4.1\n\nC:\\>ping 10.20.4.1\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nReply from 10.20.4.1: bytes=32 time<1ms TTL=255\nPackets: Sent = 4, Received = 4, Lost = 0 (0% loss)\n\nC:\\>ping 10.20.9.20\nReply from 10.20.9.20: bytes=32 time=2ms TTL=126\nRequest timed out.\nReply from 10.20.9.20: bytes=32 time=3ms TTL=126\nReply from 10.20.9.20: bytes=32 time=2ms TTL=126\nPackets: Sent = 4, Received = 3, Lost = 1 (25% loss)" },
  tasks: [
    { id: "ip", kind: "choice", prompt: "What is this station's own IP address?", options: ["10.20.4.57", "10.20.4.1", "255.255.255.0", "10.20.9.20"], expect: 0 },
    { id: "gw", kind: "choice", prompt: "Which device answered the first ping?", options: ["The default gateway, the router at 10.20.4.1", "The telemetry server", "The DNS server", "The station itself"], expect: 0 },
    { id: "subnet", kind: "choice", prompt: "Is the server at 10.20.9.20 on the station's subnet?", options: ["No: with a 255.255.255.0 mask only 10.20.4.x is local, so traffic to it goes through the gateway", "Yes: both start with 10.20", "Yes: both ping", "No: servers are never on a subnet"], expect: 0 },
    { id: "loss", kind: "reading", prompt: "Packet loss to the server, in percent", unit: "%", expect: [25, 25] },
    { id: "next", kind: "choice", prompt: "No loss to the gateway, 25% loss to the server. Best next step?", options: ["Report it to IT with this output: the fault is beyond the gateway, not in this room or this station", "Replace the station's network cable", "Reboot the station", "Change the station's subnet mask"], expect: 0 }
  ],
  why: {
    ip: "ipconfig lists the station's own settings. The IPv4 Address line is the station; Default Gateway is the router it uses to leave the subnet.",
    gw: "You pinged 10.20.4.1, which ipconfig names as the default gateway: the router on this subnet. Four replies with no loss means the station, its cable, and the local switch path are fine.",
    subnet: "A 255.255.255.0 mask makes the first three numbers the network. 10.20.4 and 10.20.9 differ, so the server is on another subnet (likely another VLAN) and every packet to it crosses the gateway.",
    loss: "Sent 4, received 3, lost 1: 1 / 4 = 25%, exactly what the summary line says.",
    next: "Everything local works (0% loss to the gateway). The loss appears only on the path beyond the router, which is IT's network. Hand them the evidence; swapping cables here would change nothing."
  }
};
```

- [ ] **Step 5: Validate and commit**

```bash
node tests/packcheck.js courses/bmet
node tests/labcheck.js courses/bmet
node tests/acronyms.js courses/bmet
```
Expected: 8 units, 53 lessons (per domain `{"7":8,"1":6,"4":9,"5":7,"3":7,"2":10,"6":6}`), 53 deep dives, 265 questions, packcheck OK; 13 labs on 13 lessons, instruments `dmm, figures, safety, monitor, infusion, defib, choices`, labcheck OK; acronyms pass.

```bash
git add courses/bmet/curriculum-3.js courses/bmet/deep-3.js courses/bmet/questions-3.js courses/bmet/labs-3.js courses/bmet/acronyms.js
git commit -m "feat(bmet): units 6 to 8: devices and test equipment, healthcare IT, getting hired, with the monitor, infusion, defib, inspection, and ping labs"
```

---

### Task 7: Generators

**Files:**
- Create: `courses/bmet/generators.js`

**Interfaces:**
- Produces: `FRA.generators = { u3l2, u3l3, u4l1, u4l2, u4l3, u5l2, u6l5, u6l6 }` and `FRA.generate(lessonId)`. Each generator returns `{ id, t, q, a[4], c, e, gen: true }`.

- [ ] **Step 1: Run the smoke test on the folder to see it has nothing to test**

Run: `node tests/gen-smoke.js courses/bmet 50`
Expected: it reports no generators (or fails to find `generators.js`); either way, the next step creates them.

- [ ] **Step 2: Write `courses/bmet/generators.js`** (exact content)

```js
// BMET Academy dynamic question generators. Each returns a fresh, computed question so Ohm's law, circuit math,
// unit conversions, tolerance and percent error, ECG paper math, leakage pass/fail, infusion rate checks, and
// delivered-energy checks never repeat exactly. Numbers agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u3l2 Ohm's law and power ----------
  function ohms() {
    const kind = R(4);
    if (kind === 0) {
      const V = pick([3, 5, 6, 9, 12, 24]); const Rr = pick([10, 20, 47, 100, 220, 470, 1000]); const I = V / Rr;
      return build("u3l2", `A ${V} V battery is connected across a ${Rr} ohm resistor. What current flows?`, `${num(I * 1000, 1)} mA`,
        wrong(`${num(I * 1000, 1)} mA`, [`${num(V * Rr)} mA`, `${num(Rr / V, 1)} mA`, `${num(I * 2000, 1)} mA`, `${num(I * 500, 1)} mA`, `${num(I, 3)} mA`]),
        `I = V / R = ${V} / ${Rr} = ${num(I, 4)} A, which is ${num(I * 1000, 1)} mA. Multiplying instead of dividing, or dividing the other way round, gives the usual wrong answers.`, "ohm");
    }
    if (kind === 1) {
      const I = pick([0.01, 0.02, 0.05, 0.1, 0.25, 0.5]); const Rr = pick([10, 22, 47, 100, 220, 470]); const V = I * Rr;
      return build("u3l2", `${num(I * 1000)} mA flows through a ${Rr} ohm resistor. What voltage is across it?`, `${num(V)} V`,
        wrong(`${num(V)} V`, [`${num(Rr / I)} V`, `${num(V * 1000)} V`, `${num(V * 2)} V`, `${num(V / 2)} V`, `${num(I + Rr)} V`]),
        `V = I x R = ${num(I, 3)} A x ${Rr} ohm = ${num(V)} V. Convert milliamps to amps first: ${num(I * 1000)} mA is ${num(I, 3)} A.`, "ohm");
    }
    if (kind === 2) {
      const V = pick([5, 9, 12, 24, 120]); const I = pick([0.1, 0.25, 0.5, 1, 2]); const P = V * I;
      return build("u3l2", `A device runs on ${V} V and draws ${num(I)} A. How much power does it use?`, `${num(P)} W`,
        wrong(`${num(P)} W`, [`${num(V / I)} W`, `${num(V + I)} W`, `${num(P * 2)} W`, `${num(P / 2)} W`, `${num(P * 10)} W`]),
        `P = V x I = ${V} x ${num(I)} = ${num(P)} W. Power is volts times amps; dividing them gives resistance, not power.`, "ohm");
    }
    const V = pick([6, 9, 12]); const I = pick([0.006, 0.009, 0.012, 0.02, 0.03, 0.05]); const Rr = V / I;
    return build("u3l2", `You measure ${V} V across a resistor and ${num(I * 1000)} mA through it. What is its resistance?`, `${num(Rr, 0)} ohm`,
      wrong(`${num(Rr, 0)} ohm`, [`${num(V * I, 3)} ohm`, `${num(Rr / 1000, 3)} ohm`, `${num(Rr * 2, 0)} ohm`, `${num(Rr / 2, 0)} ohm`, `${num(V / (I * 1000), 3)} ohm`]),
      `R = V / I = ${V} / ${num(I, 3)} = ${num(Rr, 0)} ohm. Forgetting to turn ${num(I * 1000)} mA into ${num(I, 3)} A is the usual slip.`, "ohm");
  }

  // ---------- u3l3 series and parallel ----------
  const PAR = [[100, 100, 50], [220, 220, 110], [100, 300, 75], [200, 300, 120], [470, 470, 235], [1000, 1000, 500], [600, 300, 200], [120, 60, 40]];
  function circuits() {
    const kind = R(4);
    if (kind === 0) {
      const R1 = pick([100, 220, 330, 470]); const R2 = pick([100, 220, 470, 1000].filter(r => r !== R1)); const Rt = R1 + R2;
      return build("u3l3", `A ${R1} ohm resistor and a ${R2} ohm resistor are in series. What is the total resistance?`, `${Rt} ohm`,
        wrong(`${Rt} ohm`, [`${num((R1 * R2) / Rt, 1)} ohm`, `${Math.max(R1, R2)} ohm`, `${num((R1 + R2) / 2, 1)} ohm`, `${R1 * R2} ohm`, `${Math.abs(R1 - R2)} ohm`]),
        `Series resistances add: ${R1} + ${R2} = ${Rt} ohm. The same current flows through both, so each adds its own opposition.`, "cir");
    }
    if (kind === 1) {
      const V = pick([6, 9, 12, 24]); const R1 = pick([100, 220, 470]); const R2 = pick([100, 220, 330, 470, 1000].filter(r => r !== R1)); const V1 = V * R1 / (R1 + R2);
      return build("u3l3", `A ${V} V supply feeds a ${R1} ohm and a ${R2} ohm resistor in series. What voltage is across the ${R1} ohm resistor?`, `${num(V1)} V`,
        wrong(`${num(V1)} V`, [`${num(V - V1)} V`, `${num(V)} V`, `${num(V / 2)} V`, `${num(V1 * 2)} V`, `${num(V1 / 2)} V`]),
        `Series current I = ${V} / ${R1 + R2} = ${num(V / (R1 + R2), 4)} A; across ${R1} ohm that is ${num(V1)} V. The other ${num(V - V1)} V is across the ${R2} ohm resistor, and the two add back to ${V} V.`, "cir");
    }
    if (kind === 2) {
      const [R1, R2, Rp] = pick(PAR);
      return build("u3l3", `Two resistors, ${R1} ohm and ${R2} ohm, are in parallel. What is the total resistance?`, `${Rp} ohm`,
        wrong(`${Rp} ohm`, [`${R1 + R2} ohm`, `${Math.max(R1, R2)} ohm`, `${num((R1 + R2) / 2, 1)} ohm`, `${Rp * 2} ohm`, `${num(Rp / 2, 1)} ohm`]),
        `Parallel total = (R1 x R2) / (R1 + R2) = (${R1} x ${R2}) / (${R1 + R2}) = ${Rp} ohm, always less than the smaller branch because a second path lets more current flow.`, "cir");
    }
    const V = pick([6, 9, 12]); const R1 = pick([100, 200, 300, 600]); const R2 = pick([100, 150, 300, 400].filter(r => r !== R1)); const I1 = V / R1 * 1000; const I2 = V / R2 * 1000; const It = I1 + I2;
    return build("u3l3", `A ${V} V supply feeds ${R1} ohm and ${R2} ohm in parallel. What total current does the supply deliver?`, `${num(It, 1)} mA`,
      wrong(`${num(It, 1)} mA`, [`${num(I1, 1)} mA`, `${num(I2, 1)} mA`, `${num(V / (R1 + R2) * 1000, 1)} mA`, `${num(It / 2, 1)} mA`, `${num(It * 2, 1)} mA`]),
      `Each branch sees the full ${V} V: ${num(I1, 1)} mA through ${R1} ohm and ${num(I2, 1)} mA through ${R2} ohm. Branch currents add: ${num(It, 1)} mA.`, "cir");
  }

  // ---------- u4l1 unit conversions ----------
  function units() {
    const kind = R(5);
    if (kind === 0) { const mL = pick([250, 500, 750, 1000, 1500, 2000, 3000]); return build("u4l1", `A bag holds ${mL} mL. How many liters is that?`, `${num(mL / 1000, 2)} L`, wrong(`${num(mL / 1000, 2)} L`, [`${mL * 1000} L`, `${num(mL / 100, 2)} L`, `${num(mL / 10, 1)} L`, `${mL} L`]), `1 L = 1,000 mL, so ${mL} mL / 1,000 = ${num(mL / 1000, 2)} L. Move the decimal three places to the left.`, "unit"); }
    if (kind === 1) { const mA = pick([0.1, 0.3, 0.5, 2, 5, 10, 25]); return build("u4l1", `A leakage reading is ${num(mA, 1)} mA. Express it in microamps.`, `${num(mA * 1000, 0)} microamps`, wrong(`${num(mA * 1000, 0)} microamps`, [`${num(mA / 1000, 4)} microamps`, `${num(mA * 100, 0)} microamps`, `${num(mA * 10, 0)} microamps`, `${num(mA, 1)} microamps`]), `1 mA = 1,000 microamps, so ${num(mA, 1)} mA = ${num(mA * 1000, 0)} microamps. Milli is a thousandth; micro is a millionth.`, "unit"); }
    if (kind === 2) { const c = pick([0, 4, 20, 25, 36, 37, 38, 40, 100]); const f = c * 9 / 5 + 32; return build("u4l1", `A probe reads ${c} C. What is that in Fahrenheit?`, `${num(f, 1)} F`, wrong(`${num(f, 1)} F`, [`${num(c * 9 / 5, 1)} F`, `${num(c + 32, 1)} F`, `${num((c - 32) * 5 / 9, 1)} F`, `${num(c * 2 + 30, 1)} F`]), `F = C x 9/5 + 32 = ${c} x 1.8 + 32 = ${num(f, 1)} F. Body temperature, 37 C, is 98.6 F.`, "unit"); }
    if (kind === 3) { const f = pick([32, 50, 68, 77, 95, 98.6, 100.4, 104, 212]); const c = (f - 32) * 5 / 9; return build("u4l1", `A thermostat shows ${f} F. What is that in Celsius?`, `${num(c, 1)} C`, wrong(`${num(c, 1)} C`, [`${num(f * 5 / 9, 1)} C`, `${num(f - 32, 1)} C`, `${num(f * 9 / 5 + 32, 1)} C`, `${num((f - 30) / 2, 1)} C`]), `C = (F minus 32) x 5/9 = (${f} minus 32) x 0.556 = ${num(c, 1)} C. Subtract 32 first, then scale.`, "unit"); }
    const cm = pick([5, 10, 15, 20, 27, 34]); const mmHg = cm / 1.36; return build("u4l1", `A ventilator pressure of ${cm} cmH2O is about how many mmHg?`, `${num(mmHg, 1)} mmHg`, wrong(`${num(mmHg, 1)} mmHg`, [`${num(cm * 1.36, 1)} mmHg`, `${num(cm, 1)} mmHg`, `${num(cm * 10, 1)} mmHg`, `${num(cm / 10, 2)} mmHg`]), `1 mmHg = 1.36 cmH2O, so divide: ${cm} / 1.36 = ${num(mmHg, 1)} mmHg. Mercury is 13.6 times denser than water.`, "unit");
  }

  // ---------- u4l2 tolerance and percent error ----------
  function tolerance() {
    const kind = R(3);
    if (kind === 0) {
      const exp = pick([40, 50, 60, 80, 100, 120, 200]); const err = pick([-8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8]); const meas = num(exp * (1 + err / 100), 1); const pe = (Number(meas) - exp) / exp * 100;
      return build("u4l2", `A pump set to deliver ${exp} mL delivered ${meas} mL. What is the percent error?`, `${num(pe, 1)}%`,
        wrong(`${num(pe, 1)}%`, [`${num(-pe, 1)}%`, `${num(Number(meas) - exp, 1)}%`, `${num(pe * 10, 1)}%`, `${num(pe / 10, 2)}%`, `${num(Math.abs(pe) + 1, 1)}%`]),
        `Percent error = (measured minus expected) / expected x 100 = (${meas} minus ${exp}) / ${exp} x 100 = ${num(pe, 1)}%. Keep the sign: negative means the pump under-delivered.`, "tol");
    }
    if (kind === 1) {
      const exp = pick([50, 100, 120, 150, 200]); const tol = pick([2, 5, 10]); const err = pick([-12, -9, -7, -6, -4, -3, -1, 1, 3, 4, 6, 7, 9, 12]); const meas = num(exp * (1 + err / 100), 1); const ok = Math.abs(err) <= tol;
      const yes = `Pass: the error is ${num(Math.abs(err), 1)}%, inside plus or minus ${tol}%`; const no = `Fail: the error is ${num(Math.abs(err), 1)}%, outside plus or minus ${tol}%`;
      return build("u4l2", `The manual allows plus or minus ${tol}%. Expected ${exp}, measured ${meas}. Pass or fail?`, ok ? yes : no,
        [ok ? no : yes, `Pass: any reading within ${tol} units passes`, `Fail: the reading is not exactly ${exp}`],
        `Error = (${meas} minus ${exp}) / ${exp} x 100 = ${num(err, 1)}%. The limit is plus or minus ${tol}%, so this ${ok ? 'passes' : 'fails'}. Tolerance is a percentage of the expected value, not a fixed number of units.`, "tol");
    }
    const nominal = pick([100, 220, 470, 1000, 2200, 4700]); const tol = pick([5, 10]); const lo = nominal * (1 - tol / 100); const hi = nominal * (1 + tol / 100);
    return build("u4l2", `A ${nominal} ohm resistor has a ${tol}% tolerance band. What range of resistance is acceptable?`, `${num(lo, 0)} to ${num(hi, 0)} ohm`,
      [`${num(nominal - tol, 0)} to ${num(nominal + tol, 0)} ohm`, `${num(nominal * (1 - tol / 10), 0)} to ${num(nominal * (1 + tol / 10), 0)} ohm`, `${num(lo, 0)} to ${nominal} ohm`],
      `${tol}% of ${nominal} is ${num(nominal * tol / 100, 0)} ohm, so the resistor may read anywhere from ${num(lo, 0)} to ${num(hi, 0)} ohm and still be within its specification.`, "tol");
  }

  // ---------- u4l3 ECG paper math ----------
  function strip() {
    const kind = R(3);
    if (kind === 0) { const big = pick([2, 3, 4, 5, 6]); const hr = 300 / big; return build("u4l3", `On ECG paper at 25 mm/s, consecutive R waves are ${big} large boxes apart. What is the heart rate?`, `${num(hr, 0)} bpm`, wrong(`${num(hr, 0)} bpm`, [`${num(1500 / big, 0)} bpm`, `${num(60 / big, 0)} bpm`, `${num(big * 10, 0)} bpm`, `${num(hr * 2, 0)} bpm`, `${num(hr / 2, 0)} bpm`]), `One large box is 0.2 s, so rate = 300 / large boxes = 300 / ${big} = ${num(hr, 0)} bpm.`, "ecg"); }
    if (kind === 1) { const small = pick([10, 12, 15, 20, 25, 30]); const hr = 1500 / small; return build("u4l3", `At 25 mm/s the R-to-R interval measures ${small} small boxes. What is the rate?`, `${num(hr, 0)} bpm`, wrong(`${num(hr, 0)} bpm`, [`${num(300 / small, 0)} bpm`, `${num(small * 10, 0)} bpm`, `${num(hr * 2, 0)} bpm`, `${num(hr / 2, 0)} bpm`, `${num(small * 4, 0)} bpm`]), `One small box is 0.04 s, so rate = 1,500 / small boxes = 1,500 / ${small} = ${num(hr, 0)} bpm.`, "ecg"); }
    const beats = pick([4, 5, 6, 7, 8, 9, 10, 12]); return build("u4l3", `A six-second strip shows ${beats} QRS complexes. What is the approximate heart rate?`, `${beats * 10} bpm`, wrong(`${beats * 10} bpm`, [`${beats * 6} bpm`, `${beats} bpm`, `${beats * 60} bpm`, `${beats * 5} bpm`]), `A six-second strip times ten gives beats per minute: ${beats} x 10 = ${beats * 10} bpm. The method works for irregular rhythms too.`, "ecg");
  }

  // ---------- u5l2 leakage and shock thresholds ----------
  function leakage() {
    const kind = R(3);
    if (kind === 0) {
      const limit = pick([100, 300, 500]); const v = pick([20, 45, 80, 120, 260, 340, 480, 520, 610, 750]); const ok = v <= limit;
      const yes = `Pass: ${v} is at or below the ${limit} microamp limit`; const no = `Fail: ${v} exceeds the ${limit} microamp limit`;
      return build("u5l2", `Your facility's chassis leakage limit is ${limit} microamps. A device reads ${v} microamps with the ground open and polarity reversed. Pass or fail?`, ok ? yes : no,
        [ok ? no : yes, `Pass: open-ground readings never count`, `Fail: any leakage over 10 microamps fails`],
        `Compare the worst-case reading with the limit the facility cites: ${v} against ${limit} microamps. ${ok ? 'It passes.' : 'It fails, and the device is tagged out of service.'} Open ground with reversed polarity is a fault condition the test deliberately creates.`, "leak");
    }
    if (kind === 1) {
      const r = pick([0.05, 0.12, 0.2, 0.35, 0.48, 0.5, 0.55, 0.7, 1.2]); const ok = r <= 0.5;
      const yes = `Pass: ${num(r, 2)} ohm is at or below 0.5 ohm`; const no = `Fail: ${num(r, 2)} ohm is above 0.5 ohm`;
      return build("u5l2", `The ground wire resistance from the chassis to the plug's ground pin measures ${num(r, 2)} ohm. Against the 0.5 ohm NFPA 99 limit, what is the result?`, ok ? yes : no,
        [ok ? no : yes, `Pass: ground resistance has no limit`, `Fail: only 0 ohm passes`],
        `Patient-care equipment must keep the ground path at 0.5 ohm or less so fault and leakage current flow to ground instead of through a person. ${num(r, 2)} ohm ${ok ? 'passes' : 'fails; look for a damaged cord, plug, or strain relief'}.`, "leak");
    }
    const table = { '0.5': 'below the threshold of perception', '1': 'the threshold of perception, a tingle', '5': 'the accepted maximum harmless current', '15': 'the let-go range, where muscles lock and the person cannot release', '50': 'pain, possible fainting, and respiratory arrest', '100': 'likely ventricular fibrillation' };
    const key = pick(Object.keys(table));
    return build("u5l2", `About ${key} mA of 60 Hz current flows hand to hand through a person. What effect is expected?`, table[key],
      shuffle(Object.keys(table).filter(k => k !== key).map(k => table[k])).slice(0, 3),
      `At 60 Hz: 1 mA is perception, 5 mA the accepted harmless maximum, 10 to 20 mA the let-go threshold, 50 mA pain and respiratory arrest, 100 to 300 mA ventricular fibrillation. ${key} mA is ${table[key]}.`, "leak");
  }

  // ---------- u6l5 infusion flow checks ----------
  function infusion() {
    const kind = R(3);
    if (kind === 0) {
      const rate = pick([50, 75, 100, 120, 125, 150, 200]); const min = pick([15, 20, 30, 60]); const err = pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 7]); const vol = num(rate * min / 60 * (1 + err / 100), 1); const got = Number(vol) / min * 60;
      return build("u6l5", `A pump set to ${rate} mL/h ran for ${min} minutes into a graduated cylinder, which shows ${vol} mL. What rate did the pump actually deliver?`, `${num(got, 1)} mL/h`,
        wrong(`${num(got, 1)} mL/h`, [`${num(Number(vol) / min, 2)} mL/h`, `${num(Number(vol) * min / 60, 1)} mL/h`, `${num(rate, 1)} mL/h`, `${num(got * 2, 1)} mL/h`, `${num(Number(vol), 1)} mL/h`]),
        `Rate = volume / time. ${vol} mL in ${min} min is ${num(Number(vol) / min, 3)} mL/min, times 60 is ${num(got, 1)} mL/h.`, "inf");
    }
    if (kind === 1) {
      const rate = pick([50, 100, 120, 150, 200]); const err = pick([-8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8]); const vol = num(rate * 30 / 60 * (1 + err / 100), 1); const got = Number(vol) / 30 * 60; const pe = (got - rate) / rate * 100; const ok = Math.abs(pe) <= 5;
      return build("u6l5", `Set rate ${rate} mL/h, 30-minute collection, ${vol} mL in the cylinder. The manual allows plus or minus 5%. Result?`, `${ok ? 'Pass' : 'Fail'}: ${num(pe, 1)}% error`,
        [`${ok ? 'Fail' : 'Pass'}: ${num(pe, 1)}% error`, `${ok ? 'Fail' : 'Pass'}: ${num(-pe, 1)}% error`, `Pass: the pump ran for the full 30 minutes`],
        `Delivered rate = ${vol} / 30 x 60 = ${num(got, 1)} mL/h. Error = (${num(got, 1)} minus ${rate}) / ${rate} x 100 = ${num(pe, 1)}%. The limit is plus or minus 5%, so it ${ok ? 'passes' : 'fails'}.`, "inf");
    }
    const rate = pick([25, 50, 75, 100, 125, 150, 250]); const vol = pick([250, 500, 1000]); const h = vol / rate;
    return build("u6l5", `A ${vol} mL bag is infusing at ${rate} mL/h. How long will it take to empty?`, `${num(h, 2)} hours`,
      wrong(`${num(h, 2)} hours`, [`${num(vol * rate / 1000, 2)} hours`, `${num(rate / vol, 3)} hours`, `${num(h * 60, 0)} hours`, `${num(h / 2, 2)} hours`, `${num(h * 2, 2)} hours`]),
      `Time = volume / rate = ${vol} / ${rate} = ${num(h, 2)} hours (${num(h * 60, 0)} minutes).`, "inf");
  }

  // ---------- u6l6 delivered energy ----------
  function defib() {
    const kind = R(2);
    const set = pick([2, 5, 10, 20, 50, 100, 150, 200, 300, 360]); const err = pick([-20, -16, -12, -10, -8, -5, -3, 3, 5, 8, 10, 12, 16, 20]);
    const got = num(set * (1 + err / 100), 1); const diff = Number(got) - set; const allowed = Math.max(3, set * 0.15); const ok = Math.abs(diff) <= allowed + 1e-9;
    if (kind === 0) return build("u6l6", `A defibrillator set to ${set} J delivered ${got} J into the analyzer. What is the percent error?`, `${num(diff / set * 100, 1)}%`,
      wrong(`${num(diff / set * 100, 1)}%`, [`${num(-diff / set * 100, 1)}%`, `${num(diff, 1)}%`, `${num(diff / set * 10, 2)}%`, `${num(Math.abs(diff) / set * 100 + 2, 1)}%`]),
      `Error = (delivered minus set) / set x 100 = (${got} minus ${set}) / ${set} x 100 = ${num(diff / set * 100, 1)}%.`, "def");
    return build("u6l6", `The manual allows plus or minus 15% or 3 J, whichever is larger. Set ${set} J, delivered ${got} J. Result?`, `${ok ? 'Pass' : 'Fail'}: ${num(Math.abs(diff), 1)} J off against an allowance of ${num(allowed, 1)} J`,
      [`${ok ? 'Fail' : 'Pass'}: ${num(Math.abs(diff), 1)} J off against an allowance of ${num(allowed, 1)} J`, `${ok ? 'Fail' : 'Pass'}: ${num(Math.abs(err), 1)}% is ${ok ? 'too much' : 'acceptable'}`, `Pass: the analyzer reading is close enough at any energy`],
      `At ${set} J the allowance is the larger of 15% (${num(set * 0.15, 1)} J) and 3 J, so ${num(allowed, 1)} J. The delivered energy is ${num(Math.abs(diff), 1)} J off, which ${ok ? 'passes' : 'fails'}.`, "def");
  }

  FRA.generators = { u3l2: ohms, u3l3: circuits, u4l1: units, u4l2: tolerance, u4l3: strip, u5l2: leakage, u6l5: infusion, u6l6: defib };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
```

- [ ] **Step 3: Smoke test**

Run: `node tests/gen-smoke.js courses/bmet 500`
Expected: 8 generators, 0 problems. If a `(1)` filler appears, the candidate list for that branch collapsed to fewer than three distinct values; add another distinct candidate rather than loosening the check.

Also: `node tests/acronyms.js courses/bmet` (generator text is not scanned, but confirm nothing regressed) and `node tests/packcheck.js courses/bmet` (now reports `generators 8`).

- [ ] **Step 4: Commit**

```bash
git add courses/bmet/generators.js
git commit -m "feat(bmet): eight generators: Ohm's law, circuits, conversions, tolerance, ECG paper, leakage, infusion, delivered energy"
```

---

### Task 8: Manifest, course page, catalog, build list, loaders, and the first full build

**Files:**
- Create: `courses/bmet/course.js`, `bmet/index.html`
- Modify: `index.html` (catalog: new section, JSON-LD, og:description), `tests/catalog.js` (lines 78 to 84), `tests/loaders.js` (line 14), `tests/acronyms.js` (line 9), `build.py` (line 45), `scripts/stage.sh` (the course loop), `README.md` (line 5)

**Interfaces:**
- Consumes: every pack file from Tasks 3 to 7; `course.kit` and `course.kitLab` from Task 2.
- Produces: `dist/bmet.html`, `dist/bmet-cheatsheet.pdf`, `dist/site/bmet/`, the catalog card at `bmet/`, the account page row.

- [ ] **Step 1: Write `courses/bmet/course.js`** (exact content)

```js
// BMET Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "bmet",
  name: "BMET Academy",
  short: "BM",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "AAMI / ACI", title: "Certified Associate in Biomedical Technology", code: "CABT", questions: 100, minutes: 120, passPct: 70 },
  description: "Biomed basic training for the AAMI/ACI CABT: 53 lessons, 13 hands-on labs on virtual instruments, a printable memorization sheet, adaptive tutorials, and practice exams.",
  domains: [
    { id: 1, name: "Anatomy and Physiology", short: "A&P", pct: 10, quota: 5 },
    { id: 2, name: "Medical Devices and Test Equipment", short: "Devices", pct: 23, quota: 12 },
    { id: 3, name: "Safety in Healthcare", short: "Safety", pct: 16, quota: 8 },
    { id: 4, name: "Electricity and Electronics", short: "Electricity", pct: 14, quota: 7 },
    { id: 5, name: "Reasoning and Problem Solving", short: "Reasoning", pct: 24, quota: 12 },
    { id: 6, name: "Healthcare IT", short: "Healthcare IT", pct: 13, quota: 6 },
    { id: 7, name: "Your Career", short: "Career", pct: 0, quota: 0 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CABT cut score.
  test: { questions: 50, minutes: 60, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u2l2", "u2l6", "u2l3", "u2l1", "u2l4", "u2l5"],
    2: ["u6l2", "u6l4", "u6l6", "u6l9", "u6l1", "u6l8", "u6l10", "u6l3", "u6l5", "u6l7"],
    3: ["u5l1", "u5l2", "u5l5", "u5l3", "u5l6", "u5l4", "u5l7"],
    4: ["u3l1", "u3l2", "u3l5", "u3l3", "u3l6", "u3l9", "u3l4", "u3l7", "u3l8"],
    5: ["u4l1", "u4l2", "u4l5", "u4l6", "u4l3", "u4l4", "u4l7"],
    6: ["u7l3", "u7l5", "u7l6", "u7l1", "u7l2", "u7l4"]
  },
  core: {
    1: ["u2l2", "u2l6"],
    2: ["u6l2", "u6l4", "u6l6", "u6l9"],
    3: ["u5l1", "u5l2", "u5l5"],
    4: ["u3l1", "u3l2", "u3l5"],
    5: ["u4l1", "u4l2", "u4l6"],
    6: ["u7l3", "u7l5"]
  },
  freeCourse: true,
  free: { lessons: 10 },
  certificate: true,
  kit: ["Digital multimeter with test leads", "Solderless breadboard and jumper wires", "Resistor assortment (at least 100, 220, 470, 1k, 2.2k, and 10k ohm)", "A few capacitors", "9 V battery and battery clip", "LEDs (red and green)", "A slide switch", "A fuse holder with a 1 A fuse"],
  kitLab: "kit-setup",
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CABT results only as pass or fail and publishes no passing score. This course's official-format test uses 70%, the same bar as our CBET course.",
  examDay: [
    "100 multiple-choice questions in 2 hours, closed book, taken from home or an office through live remote proctoring. That is over a minute a question; read every option before you answer.",
    "You need a laptop or desktop with a movable webcam for check-in, a steady connection, and administrator rights to install the secure browser. A personal computer is strongly recommended over a work one.",
    "Test in an enclosed, quiet, well-lit room with nobody else present, pets included. The desk must be clear: no paper, pens, phones, or second screens. A four-function calculator is on the screen.",
    "Stay in view of the camera the whole time. Leaving the room, talking, reading aloud, headphones, or looking away repeatedly draws a warning, then termination.",
    "Results come back as pass or fail right away and by email within 24 hours. The fee is non-refundable, you must test within six months of purchase, and a retake waits 60 days.",
    "The credential is valid for five years and cannot be renewed; by then you qualify to sit for the CBET."
  ],
  generatedNote: "Ohm's law, series and parallel circuits, unit conversions, tolerance and percent error, ECG paper math, leakage pass/fail, infusion rate checks, and delivered-energy checks are generated fresh every time.",
  legacyStoreKeys: []
};
```

- [ ] **Step 2: Create `bmet/index.html`** (exact content)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BMET Academy</title>
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="description" content="Biomed basic training for the AAMI/ACI CABT: 53 lessons, 13 hands-on labs on virtual instruments, a printable memorization sheet, adaptive tutorials, and practice exams.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../engine/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="../courses/bmet/course.js"></script>
  <script src="../courses/bmet/curriculum-1.js"></script>
  <script src="../courses/bmet/curriculum-2.js"></script>
  <script src="../courses/bmet/curriculum-3.js"></script>
  <script src="../courses/bmet/questions-1.js"></script>
  <script src="../courses/bmet/questions-2.js"></script>
  <script src="../courses/bmet/questions-3.js"></script>
  <script src="../courses/bmet/acronyms.js"></script>
  <script src="../courses/bmet/cheatsheet.js"></script>
  <script src="../courses/bmet/deep-1.js"></script>
  <script src="../courses/bmet/deep-2.js"></script>
  <script src="../courses/bmet/deep-3.js"></script>
  <script src="../courses/bmet/labs-1.js"></script>
  <script src="../courses/bmet/labs-2.js"></script>
  <script src="../courses/bmet/labs-3.js"></script>
  <script src="../courses/bmet/generators.js"></script>
  <script src="../engine/merge.js"></script>
  <script src="../engine/strength.js"></script>
  <script src="../engine/auth.js"></script>
  <script src="../engine/sync.js"></script>
  <script src="../engine/instruments.js"></script>
  <script src="../engine/app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Update the test expectations first (they fail until the wiring lands)**

`tests/loaders.js` line 14: `const SHELLS = ['bmet', 'netplus', 'secplus', 'cbet', 'aplus1', 'aplus2'];`

`tests/acronyms.js` line 9: add `bmet: /\bCABT\b|\bBMET Academy\b/` to `COURSE_NAMES` (keep the others).

`tests/catalog.js` lines 79 to 82: replace the heading check and the AAMI check with:

```js
    check('the catalog has four category sections in order', heads.join('|') === 'Start here: biomed basic training|AAMI certifications|CompTIA certifications|Tools for technicians', heads.join('|'));
    const under = id => [...d.querySelectorAll(`#${id} .card h3 a`)].map(a => a.getAttribute('href'));
    check('BMET sits under Start here', under('start').join(',') === 'bmet/', under('start').join(','));
    check('CBET sits under AAMI certifications', under('aami').join(',') === 'cbet/', under('aami').join(','));
```

Run: `node tests/catalog.js 2>&1 | grep FAIL` and `node tests/loaders.js 2>&1 | tail -2`
Expected: the four-section and Start-here checks FAIL; loaders reports `bmet/index.html` loads fine (the shell exists now) but `build.py` still lists five courses only if it audits CATALOG_ORDER (it audits engine registrations; expect pass).

- [ ] **Step 4: Catalog section, JSON-LD, description**

In `index.html`, immediately after `<main class="wrap">` (line 46) insert:

```html
    <section class="cat" id="start">
      <h2>Start here: biomed basic training</h2>
      <p class="cat-lede">New to healthcare technology? This course teaches the trade from zero, with hands-on labs, and ends at the AAMI/ACI entry-level credential.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="bmet/">BMET Academy</a></h3>
          <p>Biomed basic training for the AAMI/ACI Certified Associate in Biomedical Technology (CABT). 53 lessons, 13 hands-on labs with virtual instruments, a printable memorization sheet, adaptive tutorials, unlimited practice tests, and a certificate of completion.</p>
          <a class="go" href="bmet/">Start the course</a>
          <span class="links"><a href="bmet/lessons/">Read free lessons</a> &middot; <a href="bmet/cheatsheet/">Cheat sheet</a></span>
        </div>
      </div>
    </section>
```

In the JSON-LD `ItemList` (lines 25 to 30) insert a first item and renumber the rest 2 to 6:

```json
      {"@type":"ListItem","position":1,"name":"BMET Academy: biomed basic training for the AAMI CABT","url":"https://fieldreadyacademy.com/bmet/lessons/"},
```

In the `og:description` meta (line 15) change the ending to `... CompTIA Network+, Security+, A+ Core 1 and Core 2, the AAMI CBET, and biomed basic training for the AAMI CABT.`

- [ ] **Step 5: Build list, stage list, README**

`build.py` line 45: `CATALOG_ORDER = ["bmet", "cbet", "netplus", "secplus", "aplus1", "aplus2"]`

`scripts/stage.sh`: change `for id in netplus secplus cbet aplus1 aplus2; do` to `for id in bmet netplus secplus cbet aplus1 aplus2; do`, and the comment "the five course bundles" to "the six course bundles".

`README.md` line 5: add **BMET Academy** (AAMI/ACI CABT, 53 lessons and 13 labs) at the front of the live-courses list.

- [ ] **Step 6: Run everything**

```bash
npm test 2>&1 | tail -5
python build.py
node site/build-site.js
```
Expected: every suite passes (selftest now includes `bmet` and logs `labs 13 validated; kit-setup completes and clears`; loaders audits six shells; catalog sees four sections; summary and account include the bmet row with `labs: 13`). `dist/bmet.html` and `dist/site/bmet/lessons/index.html` exist. If selftest reports `lab problems:`, fix the lab, not the engine. If it reports a lesson without a deeper explanation, the deep file is missing a key.

- [ ] **Step 7: Cheat sheet PDF and page count**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/dist/bmet-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/bmet/index.html#cheatsheet"
python -c "import fitz; print(len(fitz.open('dist/bmet-cheatsheet.pdf')), 'pages')"
```
Expected: 11 to 13 pages. Over 14: trim list items; under 10: the sheet is thin, add the missing rows from Task 3's list.

- [ ] **Step 8: Commit**

```bash
git add courses/bmet/course.js bmet/index.html index.html tests/catalog.js tests/loaders.js tests/acronyms.js build.py scripts/stage.sh README.md dist/bmet.html dist/bmet-cheatsheet.pdf
git commit -m "feat(bmet): manifest and course page; catalog Start here section; build, stage, loaders, and acronym lists; first build and cheat sheet PDF"
```
(Add `dist/index.html`, `dist/account.html`, and the other `dist/*.html` files only if the repo tracks them; check with `git status --short dist | head`.)

---

### Task 9: Reference and outline coverage checks

Blake's rule: no pack is done until it is term-checked against the reference material on disk, while staying original. Three checks (spec section 6). Scripts live in the session scratchpad, results are recorded in this plan's Status section.

**Files:**
- Create (scratchpad): `bmet_check.py`
- Modify: whichever `courses/bmet/*.js` files have gaps; this plan's Status section

- [ ] **Step 1: Write the checker**

Write `bmet_check.py` in the scratchpad directory with the Write tool (forward slashes in paths):

```python
import re, pathlib, fitz
PACK = pathlib.Path("E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/courses/bmet")
text = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js")).lower()
norm = lambda s: re.sub(r"[^a-z0-9 ]+", " ", s.lower()).strip()
def has(term):
    t = norm(term)
    return t in norm(text) if len(t) >= 3 else True
# Check 3: every named example in the CABT content outline (2026 handbook, pages 9 and 10).
OUTLINE = """respiratory; nervous; circulatory; heart; lungs; kidneys; brain; skin; blood;
otoscope; ophthalmoscope; thermometer; scale; centrifuge; bladder scanner; EKG cart; microscope;
non-invasive blood pressure; pulse oximetry; telemetry; EtCO2; ECG;
infusion pump; suction pump; syringe pump; PCA pump; physical therapy equipment; defibrillator; patient warming; cooling;
graduated cylinder; stopwatch; Allen wrench; torque wrench; channel locks; needle-nose pliers; diagonal cutters; wire stripper; vice grips;
multimeter; electrical safety analyzer; patient simulator; tachometer;
lock out tag out; LOTO; safety data sheet; SDS; color coding; signage; environmental; electrical; microshock; macroshock; chemical;
universal precautions; infection control; imaging; defibrillators; lab equipment; PPE;
Ohm's law; fuse; circuit breaker; capacitor; battery; transformer; direct current; alternating current;
electrostatic discharge; ESD; wiring; color-code; ground; voltage; current; resistance; LED; power supply; switch; load; open circuit; short circuit;
unit conversion; metric; visual measurement; waveform; tolerance; graph; table; flowchart; process of elimination; service manual;
smartphone; application; RAM; hard drive; solid-state drive; CPU; GPU; power supply; printer; local; network;
video output; USB; network cable; LAN; WAN; Bluetooth; RFID; Radio Frequency Identification; data closet; server rack; VPN; VLAN;
HIPAA; device integration; electronic medical record; EMR; firewall; phishing; patch; password"""
miss3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip() and not has(t)]
print("CHECK 3 outline misses:", miss3 or "none")
# Check 1: Electronics For Dummies index entries whose pages fall in chapters 1-8, 10, 12, 13.
efd = fitz.open("E:/CERT GUIDES/BMET/Electronics For Dummies, 2010.pdf")
RANGES = [(9, 188), (213, 232), (255, 304)]  # printed page numbers of the chapters in scope
idx_text = "\n".join(efd[i].get_text() for i in range(len(efd) - 24, len(efd)))
terms1 = set()
for line in idx_text.splitlines():
    m = re.match(r"^([A-Za-z][A-Za-z0-9 ,'()/-]{2,40}?),?\s+(\d{1,3})(?:[^\d]|$)", line.strip())
    if not m: continue
    term, page = m.group(1).strip(" ,"), int(m.group(2))
    if any(a <= page <= b for a, b in RANGES) and " " not in term.strip() or len(term.split()) <= 3:
        terms1.add(term.split("(")[0].strip())
miss1 = sorted(t for t in terms1 if not has(t))
print(f"CHECK 1 EFD index terms {len(terms1)}, misses {len(miss1)}:"); print("\n".join("  " + t for t in miss1))
# Check 2: Mometrix guide table-of-contents entries (first 6 pages) for the units this course shares with CBET.
mom = fitz.open("E:/CERT GUIDES/CBET/CBET Exam Secrets Study Guide (Mometrix).pdf")
toc = "\n".join(mom[i].get_text() for i in range(0, 6))
terms2 = set()
for line in toc.splitlines():
    m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{3,60}?)\s*\.{2,}\s*\d+", line.strip()) or re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{3,60}?)\s+(\d{1,3})$", line.strip())
    if m: terms2.add(m.group(1).strip())
miss2 = sorted(t for t in terms2 if not has(t))
print(f"CHECK 2 Mometrix TOC entries {len(terms2)}, misses {len(miss2)}:"); print("\n".join("  " + t for t in miss2))
```

If the index or TOC regexes catch nothing (0 terms), print the first 60 lines of `idx_text` or `toc` and adjust the pattern to the page's layout; the goal is a term list, not a perfect parser.

- [ ] **Step 2: Run it and classify**

Run: `python "<scratchpad>/bmet_check.py" > "<scratchpad>/bmet_check.txt"; head -5 "<scratchpad>/bmet_check.txt"`

Rules:
- Check 3 (outline) must end with `none`. Every miss is a gap: add the exam's exact phrase to the lesson that owns the topic (and its deep dive if the topic is new there).
- Check 1 (electronics book): a miss is a gap when it names a part, quantity, unit, tool, safety rule, or circuit idea a first-year technician meets (for example resistor color code, breadboard, potentiometer, continuity, polarity, short circuit, heat sink); it is out of scope when it names a hobby project, an integrated circuit beyond recognition, a specific chip, or a construction technique (etching boards, 555 timer projects). Fix gaps with a sentence in the owning lesson or deep dive; list the out-of-scope misses in the Status section.
- Check 2 (CBET study guide): the CABT outline is the arbiter. A miss is a gap when it names a device, safety concept, body system, or IT term that the outline names or that unit 2, 5, 6, or 7 claims to teach; CBET-depth topics (heart-lung machine, spectrophotometer, imaging physics, HL7 message types) are out of scope and get listed.

Rerun after each fix round until check 3 is clean and checks 1 and 2 show only classified out-of-scope entries.

- [ ] **Step 3: Re-validate the pack and the suite**

```bash
node tests/packcheck.js courses/bmet && node tests/labcheck.js courses/bmet && node tests/acronyms.js courses/bmet && node tests/gen-smoke.js courses/bmet 500 && npm test 2>&1 | tail -3
python build.py bmet
```

- [ ] **Step 4: Record and commit**

Add a `## Status` section at the end of this plan: the three checks' term counts, the gaps fixed (lesson id and phrase), and the out-of-scope lists.

```bash
git add courses/bmet docs/superpowers/plans/2026-10-13-bmet-content-pack.md dist/bmet.html
git commit -m "feat(bmet): coverage fixes from the outline, electronics, and CBET-guide term checks; plan status"
```

---

### Task 10: CBET touch-ups (four outline terms)

Spec section 6: four terms live only on the CBET cheat sheet; each gets one sentence in its lesson body and its deep dive. No new lesson, no new question.

**Files:**
- Modify: `courses/cbet/curriculum-1.js` (u3l1 body, the "Cord and plug inspection" paragraph at line 361), `courses/cbet/deep-1.js` (u3l1 deep dive, the "Cords, plugs, and outlets" paragraph at line 725)
- Modify: `courses/cbet/curriculum-3.js` (u7l5 "Training users" paragraph at line 158; u9l5 defenses list ending at line 602; u9l6 operating systems bullet at line 627), `courses/cbet/deep-3.js` (u7l5 fenced table at lines 262 to 269; u9l5 fenced table at lines 1005 to 1016; u9l6 fenced table at lines 1064 to 1072)

Line numbers are as of `a57e17a`; confirm each anchor by its text before editing.

- [ ] **Step 1: Baseline**

Run: `node tests/packcheck.js courses/cbet && node tests/acronyms.js courses/cbet 2>&1 | tail -1`
Expected: both pass. Also confirm the four terms are absent from lessons: `grep -c -i "cord color\|in-service\|performance goals\|Unix" courses/cbet/curriculum-*.js courses/cbet/deep-*.js` prints 0 for every file.

- [ ] **Step 2: Power cord color coding (u3l1)**

Lesson: append to the paragraph that begins `Check for cracked insulation, bent or missing ground pins` the sentence:
` Know the **power cord color coding** when you open a plug or an inlet: US cords run black (or red) for hot, white for neutral, and green or bare for ground; IEC cords use brown for live, blue for neutral, and green-yellow for ground.`

Deep dive: append to the paragraph that begins `Inspect every cord at every PM` the sentence:
` Power cord color coding is part of the inspection whenever a plug has been replaced: US cords black (hot), white (neutral), green (ground); IEC cords brown, blue, green-yellow. A cord rewired with hot and neutral swapped passes a continuity check and fails the reversed-polarity leakage test, which is one reason the analyzer runs that condition.`

- [ ] **Step 3: In-service training (u7l5)**

Lesson: append to the paragraph that begins `The best fix for a recurring complaint is a five-minute demonstration` the sentence:
` The scheduled version is **in-service training**: formal instruction for a unit's staff on a device's use, care, cleaning, and alarm response, with attendance recorded.`

Deep dive: inside the fenced table under `## Training that works`, after the `partnered` row, add the row:
`in-service    the scheduled, formal version for a whole unit: use, care, cleaning, alarms; attendance recorded`

- [ ] **Step 4: HHS cybersecurity performance goals (u9l5)**

Lesson: after the bullet that begins `- **Alerts and recalls** for cybersecurity vulnerabilities` add:
`- **Performance goals**: the **HHS cybersecurity performance goals** list the essential practices a hospital is expected to have (multi-factor authentication, patching, tested backups, network segmentation, staff training) and a set of enhanced ones; frameworks such as HITRUST organize the same controls for certification.`

Deep dive: inside the fenced table under `## Defenses and the biomed's share`, after the `alerts` row, add the row:
`performance goals    HHS performance goals: essential practices (MFA, patching, backups, segmentation, training) and enhanced ones`

- [ ] **Step 5: Unix (u9l6)**

Lesson: change the bullet `- **Windows**, **Linux**, and embedded real-time systems on devices.` to `- **Windows**, **Linux**, **Unix**, and embedded real-time systems on devices.` (keep the rest of the bullet).

Deep dive: inside the fenced table under `## Operating system essentials`, after the `registry (Windows)` row, add the row:
`Unix and Linux             the command-line family on servers, imaging consoles, and controllers; same ideas, different tools`

- [ ] **Step 6: Verify, rebuild, commit**

```bash
node tests/packcheck.js courses/cbet && node tests/acronyms.js courses/cbet 2>&1 | tail -1 && npm test 2>&1 | tail -2
python build.py cbet
```
Expected: all pass (HHS and HITRUST are already glossary keys because the cheat sheet uses them; if acronyms reports `missing: HHS`, add the key `"HHS": { full: "Department of Health and Human Services", tip: "The federal department that oversees HIPAA enforcement and publishes the hospital cybersecurity performance goals.", more: "..." }`). The static site's CBET lesson pages regenerate from the pack on the next `node site/build-site.js`.

```bash
git add courses/cbet dist/cbet.html
git commit -m "fix(cbet): name power cord color coding, in-service training, the HHS cybersecurity performance goals, and Unix in their lessons and deep dives"
```

---

### Task 11: CRES and CHTM roadmap note

**Files:**
- Create: `docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md`

No code. Write the note from the 2026 handbook (text extracted to the scratchpad as `aci.txt`; CRES outline on handbook pages 18 and 19, CHTM pages 22 to 24, references pages 40 to 44) with these sections:

1. Purpose and status: planning only; no seed materials bought; both wait until BMET ships and the first CBET feedback arrives.
2. CRES: scope (imaging technicians), eligibility (full status: associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomedical program plus two years, or four years of work alone, and in every pathway at least 40 percent of the work experience in radiology over the last two years and 25 percent over the last five; candidate status at the degree, the program, or two years of work, with five years to upgrade), modality (May and November at Kryterion test centers, 165 questions, 3 hours, on-screen calculator and notepad), fee $410 member / $460 non-member, the six domains with weights (A&P 7, Public Safety 8, Electricity 10, Function 25, Problem Solving 25, Healthcare IT 25) and every lettered objective in plain words, a draft unit outline (about 10 units, 55 to 60 lessons: anatomy and positioning; radiation and MRI safety and regulation (TJC, CMS, OSHA, FDA, MQSA, ACR); facility power, 3-phase, 480 VAC, UPS and line conditioning, battery-powered portables; x-ray tubes and generators, digital detectors, fluoroscopy, mammography, CT at recognition level, ultrasound probes and systems, gamma cameras; PM and QC per regulation; test equipment including dosimeters; troubleshooting by modality; PACS, DICOM, worklist, DICOM echo, cable tracers, PING; communication), what the CBET pack lends it (A&P unit, electrical safety, networking and HIPAA lessons, the problem-solving method lessons, the imaging recognition lesson u5l5), the generators that transfer, and the references to buy (Papp 5th, Callaway 7th, Bushong 11th, used, about $60 together; free NFPA 99 read-only, 21 CFR 1020, MQSA).
3. CHTM: scope (managers), the five eligibility pathways summarized, modality (May and November at test centers), fee $490 / $565, the five domains with weights (Financial 20, Risk 16, Operations 40, Education 11, HR 13) and their lettered objectives in plain words, a draft unit outline (about 8 units, 45 to 50 lessons: budgets and ledgers, ROI and business cases, capital planning and life expectancy, contracts and sourcing; risk models (RCA, FMEA), SMDA and sentinel events, recalls, cybersecurity oversight (WMTS, segmentation, patching); work orders and the CMMS, KPIs and COSR, policies (MEMP, SOPs, EOC), regulators and deemed status (CMS, FDA, FCC, HIPAA, NRC), capital projects and construction, meetings and stakeholders, interoperability and downtime; training needs and effectiveness, operator training, manuals; job descriptions, evaluations, coaching, labor law (ADA, EEOC, FMLA, NLRA)), what the CBET pack lends it (the management, documentation, and regulatory lessons in units 7 and 8; HIPAA and cybersecurity in unit 9), generators (budget math, ROI, COSR, FMEA scoring), and the references to buy (Wang and Frize Springer eBooks about $20 to $25 each, Dyro 1st ed. used about $25, Taktak; the AAMI Practicum is $369 and AAMI-only; the Stiefel manual is unobtainable and the AAMI HTM Manual 8th ed. replaced it; Carr and Brown out of print, about $40 used).
4. Shared engine needs: none beyond what BMET added; both would use `certificate: false`, standard exam-prep flow, and the CBET pass bar assumption of 70% (ACI publishes a scaled score for CBET and CRES, pass/fail only).
5. Order of work when they start: CRES first (closer to CBET, reuses more), CHTM second; each follows the pack workflow (cheat sheet first, term check against the books, staging).

- [ ] **Step 1: Write the note**, then `git add docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md && git commit -m "docs(plan): CRES and CHTM roadmap from the 2026 ACI handbook"`.

---

### Task 12: Stage locally and close out

**Files:**
- Modify: this plan's Status section; the memory file `project-bmet-academy.md` (outside the repo)

- [ ] **Step 1: Stage without uploading**

Run: `bash scripts/stage.sh --local`
Expected: `staged N files in dist/stage` with `dist/stage/bmet/index.html`, `dist/stage/bmet/lessons/index.html`, `dist/stage/bmet/cheatsheet/index.html`, and ten free-lesson pages under `dist/stage/bmet/lessons/`. Check: `ls dist/stage/bmet dist/stage/bmet/lessons | head -20`.

- [ ] **Step 2: Open the course page from disk and run the self-test**

Run: `node tests/selftest.js 2>&1 | grep -A3 "^bmet\|bmet:" | head -20`
Expected: the bmet block ends `OK` with `labs 13 validated; kit-setup completes and clears`.

- [ ] **Step 3: Merge to main**

```bash
git checkout main && git merge --no-ff bmet-content -m "Merge bmet-content: BMET Academy content pack (Plan B)" && npm test 2>&1 | tail -2
```
Do not push. Blake pushes and runs the stage upload and the go-live command himself.

- [ ] **Step 4: Record**

Update this plan's Status section (counts, PDF pages, check results, merge commit) and the memory file (Plan B built and merged, not pushed; the $220 fee correction; what remains: push, stage upload, go-live, Plan A carried minors still open: `lab-use` typeof check, build.py domain-filter test, strip data-beats note for authors is now enforced by the shape validator).

---

## Self-review against the spec (done while writing)

- Spec 2 manifest, flow, units, lessons, labs table, kit list: Tasks 4 to 6 and 8 (53 lessons, 13 labs, kit on Home via Task 2).
- Spec 3 lab data model and the self-test rules: the engine already enforces them; Task 1 adds the shape rules the final review deferred.
- Spec 4 instruments: content only; every scenario's verdict truth was checked by hand against `truth.verdict` (safety-pass 205 of 500 pass; safety-fail 640 of 500 fail; monitor 1/1/2/1 inside 2/2/3 pass; infusion 3% inside 5 pass; defib 0.2/2/6/18 J inside 3/7.5/30/54 pass) and every measured reading range contains the computed value plus one digit of jitter.
- Spec 6 sources and verification: Task 9 (three checks), the CBET touch-up in Task 10, generators in Task 7, acronyms in every task, a 12-page sheet in Task 3.
- Spec 8 delivery order items 3, 4, 5: Tasks 3 to 10, Task 11, Task 12.
- Still deferred from Plan A (not in this plan): the `lab-use` `typeof ins.current` guard and a test for `build.py`'s `pct > 0` domain filter (no Python test harness exists).

## Status

### Task 9: reference and outline coverage checks (2026-10-13)

Checker: `bmet_check.py` in the session scratchpad (PyMuPDF). It normalizes the whole pack (`courses/bmet/*.js`) to lowercase words, repairs the PDFs' split `fi`/`fl` ligatures, maps the British spellings in the electronics book to American, and stems plurals on both sides, then looks for each reference term as a whole phrase.

**Term counts and final result**

| Check | Source | Terms | Misses |
| --- | --- | --- | --- |
| 3 | CABT content outline (2026 handbook, pages 9 and 10), every named example | 123 | **0** |
| 1 | Electronics book index, top-level entries whose page numbers fall in chapters 1 to 8, 10, 12, 13 (printed pages 9-186, 213-232, 255-304) | 332 in scope (457 indexed) | 182, all classified below |
| 2a | CBET study guide table of contents, the sections this course shares | 37 headings | 0 topics; 7 headings miss only a grammatical word (`differentiating`, `foundation`, `prioritization`, `usage`, `resolving`, `pcs`) |
| 2b | Same guide, the bold key terms inside those sections (printed pages 15-85) | 438 | 271, all classified below |

Check 1's index parser keeps only top-level entries (two-level index, identified by the column's left margin) and truncates cross-references at the comma. Check 2 was split because the guide's table of contents is only 37 broad headings: 2b harvests the bold key terms from the shared sections, which is the level the classification rules describe.

**Gaps fixed** (one or two sentences in the owning lesson; no deep dive needed a new term, and no new safety number was introduced)

| Lesson | Phrases added |
| --- | --- |
| u2l1 | `lymphatic system` and `immune system` added to the organ-system list, with `skeletal system`, `muscular system`, and `integumentary system` named inside it; `homeostasis` in "Systems do not work alone" |
| u2l2 | `cardiac cycle`, named as `atrial contraction`, then `ventricular contraction`, then refill |
| u2l4 | `neuron` and `sensory receptors` |
| u2l5 | `nephrons` and `urea` (kidneys), `bile` (liver), `sweat glands` and `thermoregulation` and `vitamin D` (skin) |
| u2l6 | `photodiode` as the detector facing the two LEDs in the SpO2 probe |
| u3l1 | `protons` and `electrically neutral`, `electric current`, `coulomb`; `fixed resistors`, `resistor tolerance`, `variable resistors`, `potentiometer`, `rheostat` |
| u3l3 | `combination circuit`, `equivalent resistance`, `parallel resistors` |
| u3l4 | `toggle switch`, `rocker switch`, `pushbutton switch`, `single-pole switch`, `double-pole switch`, `single-throw switch`, `double-throw switch`; `DC motor` named in the load list (task 9 review) |
| u3l6 | `electromagnetic induction`, `step-up transformer`, `bridge rectifier`, `full-wave rectification`, `regulated power supply`, `AC adapter` / `AC-to-DC adapter` / `wall transformer` (match the label, not the plug) |
| u3l7 | `passive components` and `active components` (new short section); `polarized capacitor` and `working voltage`; `forward bias` and `reverse bias`; `microcontroller`; `piezoelectric buzzer` and `piezoelectric effect`; `thermistor` with `negative temperature coefficient` and `positive temperature coefficient`; `thermocouple`; `millihenry`, named beside henries for the inductor (task 9 review) |
| u3l8 | `non-rechargeable battery` / `alkaline battery` against `rechargeable battery` |
| u3l9 | `terminal block`, `ribbon cable`, `printed circuit board`, `surface mount`; `earth ground`, `chassis ground`, `signal ground` as the `common ground`; `static electricity` |
| u4l2 | `visual measurement` (the outline's own phrase for reading a scale, dial, cylinder, or ruler) |
| u4l3 | `peak voltage` and `peak-to-peak voltage`, worked on the wall-power numbers already in the pack (120 V effective, about 170 V peak, about 340 V peak to peak). No new sheet row: the cheat sheet's RMS row already carries 120 V and 170 V, and peak to peak is that doubled |
| u5l3 | `The Joint Commission` and the other accrediting bodies survey the records, so an undocumented test counts for nothing |
| u5l4 | `lock out tag out (LOTO)`, the outline's spelling, beside the pack's "lockout tagout" |
| u5l5 | `color coding` for the gases, named as the first of the three controls |
| u6l1 | `tympanic thermometer` as an `infrared temperature sensor`; new `Audiometer` entry (tones through headphones, quiet room, calibration record) |
| u6l2 | `sphygmomanometer` as the manual cuff, bulb, and gauge kept as the backup |
| u6l7 | `aspirator` as the other name for a suction pump |
| u7l2 | `video output` (section renamed and introduced); `cable tester` and `cable tracer` |
| u7l3 | `Ethernet hub` against the switch that replaced it; the IDF is also called the `telecommunications room` |

**Check 1, classified out of scope** (182): digital logic and chip-level design - AND/OR/NOT/NAND/NOR/XOR/XNOR gates, universal gates, truth tables, logic circuits, logic probe, clocking logic chips, digital/linear/mixed-signal ICs, binary and base 2 / base 10 / decimal systems, flip-flop, astable / monostable / bistable multivibrator, one-shot, LM386, LM741, op amps, differential and inverting amplifiers, pinouts, datasheets and application notes for ICs, clocking marks, pin headers. Transistor families and semiconductor physics - BJTs, FETs, JFETs, MOSFETs, CMOS, Darlington pair and transistors, NPN and PNP transistors, power and signal transistors, Zener diodes, dopants and doping, n-type and p-type, acceptor and donor dopants. AC analysis beyond the outline - capacitive and inductive reactance, complex impedance, RC/RL/RLC circuits and time constants, high-pass / low-pass / band-pass / band-reject filters, cut-off and resonant frequency, resonant and tuning circuits, AC and capacitive coupling, coupling and smoothing capacitors, self and mutual inductance, flux lines, back voltage, voltage rise, instantaneous current, peak inverse voltage, pulse width modulation, transformer action, electromagnetic force, floating ground (grounding theory beyond the outline's earth/chassis/signal ground). Component variants and catalog parts - fixed / variable / shielded inductors, variable capacitors, trim / dial / slide / reset pots, high-precision and standard-precision resistors, maximum power ratings, dielectrics, crystals, XTAL, ceramic resonators, bimetallic strips, leaf and touch switches, SPST and SPDT abbreviations, SMT and surface mount technology as abbreviations, light-dependent resistors, photoresistors, phototransistors, photovoltaic cells, solar cells and panels, condenser / crystal / dynamic / fibre-optic microphones, infrared and motion detectors, position sensors, input and output transducers, nickel-cadmium and zinc-carbon chemistries, high-load applications. Hobby construction and bench instruments - artwork, layout diagrams, workshop, electronic metronome, flashing lights, bench and dual-trace oscilloscope, analog multimeter and analog component symbols, megohms. Legacy consumer gear - CRT, cathode ray tube, television set, tuner, light bulb and incandescent lamp symbol, power station, IEE Wiring Regulations (a British code; the pack uses the American colors and NFPA). Parser artifacts, not terms - FINANCE, "or call +44", reference ID, DeGunther, Faraday, Franklin, Hill, Horowitz, Kirby, The Art of Electronics, markings or codes, electrical circuits, electronic components, electronic systems, active circuit, passive circuit, amperes or amps, gauge of wires, calibrating, charging and discharging capacitors, current steering, rectifying property of diodes, real electron flow, electrically neutral atoms, electromagnetism, electrochemical reaction, forward-bias and reverse-bias diodes, polarised capacitors, working voltage for capacitors, value markings on capacitors, IR LEDs, infrared light-emitting diodes, infrared temperature sensors, lithium batteries, light-sensitive devices, PTC (already taught under another name) - each one a wording or word-form difference from text the pack already carries (wire gauge, calibration, a charged capacitor, forward bias, a polarized capacitor, the working voltage, red and infrared LEDs, the lithium coin cell, electrically neutral, induction, positive temperature coefficient).

**Check 2b, classified out of scope** (271): CBET-depth devices - hemodialysis machines, intra-aortic balloon pumps, external pacemakers, fetal monitors and tocograph, bilirubin lights, hypo/hyperthermia machines (the pack teaches patient warming and cooling, the outline's words), sterilization units, surgical lasers, electrosurgical generator, automatic tourniquets, uroflow meter, respiratory monitors, positive end expiratory pressure, invasive blood pressure measurement and transducers, Einthoven's triangle, faults for electrocardiogram, faults for electroencephalogram (CBET-guide device depth beyond the outline). Laboratory and imaging depth - spectrophotometer, blood gas analyzers, microtome, cryostat, water bath, computerized tomography, positron emission tomography, radiographic imaging, ultrasound imaging and therapy devices, radiation protective equipment. CBET test-equipment depth - ventilator analyzer, electrosurgery unit analyzer, physiological simulators, fiber-optic cable testers, digital voltmeter. Circuit analysis beyond the outline - Kirchhoff's current and voltage laws, mesh and nodal analysis, current and voltage division, complex impedance, electrical filters, operational amplifiers. Network and IT depth - open systems interconnection and its physical / data link / network layers, network subnetting, bus / star / hybrid topologies, point-to-point protocol, laboratory and radiological information systems. Regulatory and program depth - HITECH, IEC 80001, Safe Medical Devices Act, Digital Millennium Copyright Act, HIPAA Titles I to V, College of American Pathologists, DNV Global, clean agents, permissible exposure limit, threshold limit values, toxicity levels, carcinogenicity, chemical protective clothing, root cause analysis, criticality, value of device function, equipment redundancy, power conditioning, core measures, maintenance checklists, diagnosis and resolution phases, troubleshooting technology systems (CBET/HTM program depth). Anatomy beyond the outline's organ list - the whole male and female reproductive vocabulary, skeletal detail (axial and appendicular skeleton, girdles, sternum, rib cage, vertebral column, ossicles, hyoid, ligaments), muscle histology (cardiac, smooth, striated muscle, muscle fibers), autonomic nervous system detail (sympathetic nerves, parasympathetic nerves), brain subdivisions and lobes (forebrain, midbrain, hindbrain, thalamus, hypothalamus, pons, medulla oblongata, tectum, tegmentum, cerebral cortex, frontal / parietal / occipital / temporal lobes), renal microanatomy (glomerulus, Bowman's capsule, convoluted tubule, renal cortex / medulla / pelvis, renal vein, glomerular filtrate, peritubular capillaries), digestive segments (duodenum, jejunum, ileum, chyme, sphincters, hepatic vessels, sinusoids, mastication), endocrine detail (parathyroid, pineal, thymus, adrenal cortex and medulla, pancreas islets, named hormones, steroid and protein hormones), blood chemistry (acidosis, alkalosis, hydrogen ions, amino acids, cholesterol, glycogen, leukocytes, blood plasma proteins, red bone marrow), lymph detail (lymph capillaries, vessels, tissue, Peyer's patches, tonsils), respiratory and vessel detail (larynx, epiglottis, cilia, pleural membrane, intercostal muscles, chemoreceptors, arterioles, capillary beds, coronary arteries, superior and inferior vena cava). Wording differences, already covered - electrical shock hazards (taught under macroshock and microshock), label requirements for chemicals (taught in u5l4's GHS labels), plug-connected, portable, nonmedical electronics (covered in the u5l1 deep dive), brain stem (the pack writes brainstem), blood-borne pathogens (bloodborne), uninterruptable power supplies (uninterruptible), respiratory droplets (droplet precautions), CDC's standard precautions and basic infection control measures (standard precautions and infection control), types of arrhythmia (arrhythmia), measuring noninvasive blood pressure (NIBP), ping networking utility (ping, with its own lab), Ethernet hubs vs. switches and passive vs. active devices (both now in the pack), electric power / electric voltage / electrical resistance / characteristics of transformers / inductors and capacitors / performance characteristics of batteries / foundations of electronics (section headings whose content unit 3 teaches), pituitary gland / thyroid gland (named without the word gland), urinary bladder (bladder), renal system (the pack writes urinary system, the outline's word), blood clotting (platelets that clot), sebaceous glands and sebum (skin detail), and the guide's own table-of-contents echoes (Understanding ... Equipment, Pathogen Control and Safety, Hazardous Materials Safety, Health Care Standards, Physiology and Healthcare Technology, Relationships of Computer Applications, Fundamentals of Network Configuration). Parser artifacts - analysis, presentation, tail, lobes, lobules, nodal, inion, nasion, elongate, excitability, purification, redundancy, blood cells white blood, distal convoluted, stimulating hormone, renal arteries, neuroendocrine control center, immune factors, visceral tissue, endocrine and exocrine tissue, chemical synapse, follicle, embryo, semen, sperm, spermatogenesis.

**Validation after the fixes:** `packcheck` OK (8 units, 53 lessons, 53 deep dives, 265 questions, 8 generators), `labcheck` OK (13 labs), `acronyms` OK (104 acronyms, no new acronym introduced), `gen-smoke` 4000 calls 0 problems, `npm test` all passed, `python build.py bmet` rebuilt `dist/bmet.html`.
