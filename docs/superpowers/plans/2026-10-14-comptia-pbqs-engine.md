# CompTIA PBQs Plan A: engine, state, test integration, and the static PBQ page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the engine performance-based questions: a `FRAPbq` module that grades and renders five interactive task kinds, a PBQs tab per course, PBQs that open the official-format test and score as questions, cross-device state, the account page count, a crawlable `/<id>/pbq/` page per course, and the tests and mini fixture that prove all of it before any course ships content.

**Architecture:** A pack ships `courses/<id>/pbqs.js` filling `FRA.pbqs`; nothing changes for a pack without it. `engine/pbq.js` owns grading, normalization, answer text, and the task renderers (drag, tap, keyboard) behind a `data-pbq` event namespace so `engine/app.js`'s `data-act` click delegation never sees them. `app.js` owns the views, the state (`S.pbqs`), the official-format test assembly and scoring; PBQ task results travel through the existing review-item shape as inline pseudo-questions so retraining, the strength chart, and the results page need no new branches beyond one renderer. `site/build-site.js` renders the three `seo: true` PBQs per course as static HTML.

**Tech Stack:** Vanilla JS (IIFE modules, no build step), jsdom tests (`npm test`), Python `build.py` bundler, the static generator `site/build-site.js`.

Spec: `docs/superpowers/specs/2026-10-14-comptia-pbqs-design.md`.

## Global Constraints

- Task kinds and their answer shapes (verbatim from the spec): `order` (answer = array of item indexes in the chosen sequence; `expect` = the correct index sequence), `match` (answer = array indexed by left item holding the chosen right-slot index or `null`; `expect` = the same shape), `multiselect` (answer = array of chosen option indexes; `expect` = the correct indexes), `form` (answer = `{ fieldId: string }`; each field has `expect` = accepted strings and `normalize` of `ip`, `cidr`, `text`, or `number`), `command` (answer = string; `expect` = accepted strings, optional `alt`, optional `flagOrder: false`), `choice` (answer = option index; `expect` = index). Indexes in `expect` refer to the arrays as written in the pack; the renderer shuffles for display and maps back.
- Grading (verbatim): `grade(task, answer)` returns `{ score, correct, detail }`, score in 0 to 1: order = items in the right position / items; match = correct pairings / left items; multiselect = max(0, correct picks minus wrong picks) / expected picks; form = fields matched / fields; command and choice = 1 or 0. `correct` is `score === 1`. Command normalization: lowercase, collapse spaces, strip a trailing period; with `flagOrder: false` the flags (tokens after the first) compare as a sorted set.
- State: `S.pbqs[id] = { best, done, at, tasks: { taskId: score } }`, written on Check; merged across devices by newer `at`; `engine/sync.js` `hashOf` strips an empty `pbqs`. `fresh()` gains `pbqs: {}`.
- The official-format test (a `standard` setup with minutes) opens with `course.test.pbqInTest` PBQs (default 0) drawn by domain weight; their tasks replace multiple-choice questions one for one from the same domain's quota; each task counts as one question; practice, starter, and custom tests never include PBQs; the pass rule is unchanged.
- Every drag interaction also works by tap-to-select then tap-to-place and by keyboard (arrow keys and Enter), and the three produce the same answer.
- Adding `engine/pbq.js` touches every loader registration: `build.py` (`build()` bundle order, after `instruments.js` and before `app.js`), `tests/lib.js` `boot()`, `tests/loaders.js` `BEFORE_APP`, every `<id>/index.html` shell that exists on `main` when this plan runs (at least `bmet`, `netplus`, `secplus`, `cbet`, `aplus1`, `aplus2`, plus `cres` and `chtm` once merged), and `package.json`'s test chain for `tests/pbq.js`. The account page does not load it (`engine/summary.js` carries the count).
- The static page per course exists only when the pack has `FRA.pbqs` entries; its title is `<Exam name> <code> PBQ Practice | <Course name>`, its H1 the same without the course name, and it renders exactly the `seo: true` PBQs (three per shipped course; the mini fixture has one).
- Plain ASCII in every file written; no em dashes, no curly quotes. Write files with the Write tool, never a heredoc. Commit after every task; never push. Work on branch `pbq-engine` off `main` (after the CRES and CHTM merges).

## Conventions

- `app.js` is one IIFE; helpers like `esc`, `inline`, `letters`, `save`, `render`, `go`, `toast`, `fat`, `slim`, `recordAnswer`, `lstat`, `tstat`, `L`, `DOMAINS`, `TESTED_IDS` are in scope inside it. `engine/pbq.js` receives what it needs through a `helpers` argument (`{ esc, inline }`) and never reaches into `app.js`.
- Click handling: `app.js` delegates `[data-act]` clicks at `app.js:1454`. PBQ task controls use `data-pbq` attributes and a listener `FRAPbq` installs on the PBQ container, so a task button never carries `data-act`. The PBQ view's own buttons (Check, Retry, Back, the test's Submit) carry `data-act` as usual.
- Tests use `tests/lib.js` `boot({ courseDir, hash })`, the `act(w, a, arg)` helper pattern from `tests/engine.js:10`, `state(w)` reading `localStorage`, and `w.click(el)`.
- Line numbers below are from `main` at `4cb9850` for `engine/app.js` (1,5xx lines); re-locate by the quoted anchor text if the file moved.

## File structure

Create:
- `engine/pbq.js` (Task 1 grading, Task 4 rendering).
- `tests/pbq.js` (Task 1, grown in Task 4).
- `tests/fixtures/mini/pbqs.js` (Task 4).
- The `/<id>/pbq/` page generator function inside `site/build-site.js` (Task 6).

Modify:
- `build.py`, `tests/lib.js`, `tests/loaders.js`, `package.json`, every `<id>/index.html` (Task 2).
- `engine/app.js` (Task 3 state; Task 4 views; Task 5 tests), `engine/merge.js`, `engine/sync.js`, `engine/summary.js`, `account/index.html`, `build.py` `course_meta` (Task 3), `engine/styles.css` (Task 4).
- `tests/merge.js`, `tests/sync.js`, `tests/summary.js`, `tests/account.js` (Task 3), `tests/engine.js` (Tasks 4 and 5), `tests/selftest.js`, `tests/site.js`, `site/build-site.js`, `tests/fixtures/mini/course.js` (Task 6).
- `README.md` (Task 7).

---

### Task 1: `engine/pbq.js` grading core

**Files:**
- Create: `engine/pbq.js`
- Create: `tests/pbq.js`
- Modify: `package.json` (the test chain)

**Interfaces:**
- Produces: `window.FRAPbq = { KINDS, normalize, normalizeCommand, grade, answerText, expectedText, render, collect, emptyAnswer }` (`render` and `collect` are stubs here and are filled in Task 4). `grade(task, answer)` returns `{ score, correct, detail }`.

- [ ] **Step 1: Write the failing tests `tests/pbq.js`**

```js
// PBQ grading, normalization, and answer text (engine/pbq.js). Run: node tests/pbq.js
const fs = require('fs'); const path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const w = new JSDOM('<!doctype html><html><body><div id="host"></div></body></html>', { runScripts: 'outside-only', url: 'http://localhost/' }).window;
w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'pbq.js'), 'utf8'));
const P = w.FRAPbq;
const g = (task, answer) => P.grade(task, answer);

// ----- order -----
const order = { id: 'o', kind: 'order', prompt: 'Order the steps', items: ['Identify', 'Theory', 'Test', 'Plan'], expect: [0, 1, 2, 3] };
check('order: full credit in the right sequence', g(order, [0, 1, 2, 3]).score === 1 && g(order, [0, 1, 2, 3]).correct === true);
check('order: partial credit by items in the right position', g(order, [0, 2, 1, 3]).score === 0.5 && g(order, [0, 2, 1, 3]).correct === false);
check('order: an incomplete answer scores what is placed', g(order, [0, 1]).score === 0.5);
check('order: an empty answer scores zero', g(order, null).score === 0 && g(order, []).score === 0);

// ----- match -----
const match = { id: 'm', kind: 'match', prompt: 'Match', left: ['Switch', 'Router'], right: ['Layer 2', 'Layer 3', 'Layer 7'], expect: [0, 1] };
check('match: every pairing right is full credit', g(match, [0, 1]).score === 1);
check('match: one of two right is half', g(match, [0, 2]).score === 0.5);
check('match: unplaced items count as wrong', g(match, [0, null]).score === 0.5 && g(match, null).score === 0);

// ----- multiselect -----
const multi = { id: 's', kind: 'multiselect', prompt: 'Pick the bad lines', options: ['a', 'b', 'c', 'd', 'e'], expect: [1, 3] };
check('multiselect: exactly the expected picks is full credit', g(multi, [3, 1]).score === 1);
check('multiselect: one right of two is half', g(multi, [1]).score === 0.5);
check('multiselect: a wrong pick cancels a right one', g(multi, [1, 3, 0]).score === 0.5);
check('multiselect: floors at zero', g(multi, [0, 2, 4]).score === 0 && g(multi, [0, 2, 4]).correct === false);

// ----- form -----
const form = { id: 'f', kind: 'form', prompt: 'Configure', fields: [
  { id: 'ip', label: 'IP address', expect: ['192.168.10.1'], normalize: 'ip' },
  { id: 'mask', label: 'Subnet mask', expect: ['255.255.255.192', '/26'], normalize: 'cidr' },
  { id: 'vlan', label: 'VLAN', expect: ['10'], normalize: 'number' },
  { id: 'ssid', label: 'SSID', expect: ['Clinic-5G'], normalize: 'text' }
] };
check('form: every field right is full credit', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10', ssid: 'clinic-5g' }).score === 1);
check('form: ip normalization strips spaces and leading zeros', g(form, { ip: ' 192.168.010.001 ', mask: '255.255.255.192', vlan: '10', ssid: 'Clinic-5G' }).score === 1);
check('form: cidr accepts the dotted mask or the prefix', g(form, { ip: '192.168.10.1', mask: '255.255.255.192', vlan: '10', ssid: 'Clinic-5G' }).score === 1 && g(form, { ip: '192.168.10.1', mask: ' /26', vlan: '10', ssid: 'Clinic-5G' }).score === 1);
check('form: number normalization accepts 10.0 and 010', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '010', ssid: 'Clinic-5G' }).score === 1 && g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10.0', ssid: 'Clinic-5G' }).score === 1);
check('form: text normalization is case and space insensitive', g(form, { ip: '192.168.10.1', mask: '/26', vlan: '10', ssid: '  CLINIC-5G ' }).score === 1);
check('form: three of four fields is 0.75', g(form, { ip: '192.168.10.2', mask: '/26', vlan: '10', ssid: 'Clinic-5G' }).score === 0.75);
check('form: a missing field is wrong, not an error', g(form, { ip: '192.168.10.1' }).score === 0.25 && g(form, null).score === 0);

// ----- command -----
const cmd = { id: 'c', kind: 'command', prompt: 'Show the full IP configuration', expect: ['ipconfig /all'], alt: ['ipconfig -all'], flagOrder: false };
check('command: exact form is right', g(cmd, 'ipconfig /all').correct === true);
check('command: case, extra spaces, and a trailing period are ignored', g(cmd, '  IPCONFIG   /ALL. ').correct === true);
check('command: an alternate spelling is right', g(cmd, 'ipconfig -all').correct === true);
check('command: the wrong command is zero', g(cmd, 'ifconfig /all').score === 0 && g(cmd, '').score === 0 && g(cmd, null).score === 0);
const cmd2 = { id: 'c2', kind: 'command', prompt: 'Scan', expect: ['nmap -sV -p 443 10.0.0.5'], flagOrder: false };
check('command: flags in any order compare equal when flagOrder is false', g(cmd2, 'nmap -p 443 -sV 10.0.0.5').correct === true);
const cmd3 = { id: 'c3', kind: 'command', prompt: 'Copy', expect: ['copy a.txt b.txt'] };
check('command: token order matters when flagOrder is not false', g(cmd3, 'copy b.txt a.txt').correct === false);

// ----- choice -----
const choice = { id: 'p', kind: 'choice', prompt: 'Pick', options: ['x', 'y', 'z', 'w'], expect: 2 };
check('choice: the expected index is right, anything else zero', g(choice, 2).score === 1 && g(choice, 1).score === 0 && g(choice, null).score === 0);

// ----- answer and expected text (for the results page and the static page) -----
check('expectedText: order lists the sequence', P.expectedText(order) === 'Identify, Theory, Test, Plan');
check('expectedText: match lists the pairs', P.expectedText(match) === 'Switch: Layer 2; Router: Layer 3');
check('expectedText: multiselect lists the picks', P.expectedText(multi) === 'b, d');
check('expectedText: form lists field and first accepted value', P.expectedText(form) === 'IP address: 192.168.10.1; Subnet mask: 255.255.255.192; VLAN: 10; SSID: Clinic-5G');
check('expectedText: command gives the first accepted form', P.expectedText(cmd) === 'ipconfig /all');
check('expectedText: choice gives the option', P.expectedText(choice) === 'z');
check('answerText: order in the chosen sequence', P.answerText(order, [1, 0, 2, 3]) === 'Theory, Identify, Test, Plan');
check('answerText: match shows placed and unplaced', P.answerText(match, [2, null]) === 'Switch: Layer 7; Router: (not placed)');
check('answerText: form shows what was typed, blank for empty', P.answerText(form, { ip: '1.2.3.4' }) === 'IP address: 1.2.3.4; Subnet mask: (blank); VLAN: (blank); SSID: (blank)');
check('answerText: nothing answered reads as such', P.answerText(cmd, null) === '(no answer)');
check('emptyAnswer: the per-kind empty shape', JSON.stringify(P.emptyAnswer(order)) === '[]' && JSON.stringify(P.emptyAnswer(match)) === '[null,null]' && JSON.stringify(P.emptyAnswer(form)) === '{}' && P.emptyAnswer(cmd) === '' && P.emptyAnswer(choice) === null);
check('KINDS lists the six kinds', JSON.stringify(P.KINDS) === JSON.stringify(['order', 'match', 'multiselect', 'form', 'command', 'choice']));

if (fails.length) { console.log(`\n${fails.length} FAILED`); process.exit(1); }
console.log('\nAll PBQ tests passed.');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node tests/pbq.js`
Expected: throws at `w.eval` (no such file) or every check FAILs because `FRAPbq` is undefined.

- [ ] **Step 3: Write `engine/pbq.js`** (exact content; `render` and `collect` are placeholders until Task 4 replaces them)

```js
// FieldReady Academy performance-based questions (PBQs): grading, normalization, answer text, and the
// task renderers for the six task kinds. Loaded before engine/app.js, which owns the views, the
// state, and the test integration. Nothing here reads FRA.course or S; app.js passes what the
// renderers need. Task controls use data-pbq attributes, never data-act, so app.js's click
// delegation ignores them.
window.FRAPbq = (function () {
  const KINDS = ['order', 'match', 'multiselect', 'form', 'command', 'choice'];
  const str = x => x == null ? '' : String(x);
  const squash = s => str(s).trim().replace(/\s+/g, ' ');
  // Field normalizers. Each returns a canonical string; two values match when their canonical strings match.
  const normalize = {
    text: s => squash(s).toLowerCase(),
    number: s => { const n = Number(squash(s)); return Number.isFinite(n) ? String(n) : squash(s).toLowerCase(); },
    ip: s => { const t = squash(s); const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t); return m ? m.slice(1).map(o => String(Number(o))).join('.') : t.toLowerCase(); },
    // A dotted mask and its prefix length are the same answer: both canonicalize to the prefix.
    cidr: s => {
      const t = squash(s).replace(/^\//, '');
      if (/^\d{1,2}$/.test(t)) return '/' + Number(t);
      const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t);
      if (!m) return t.toLowerCase();
      const bits = m.slice(1).map(o => Number(o).toString(2).padStart(8, '0')).join('');
      return /^1*0*$/.test(bits) ? '/' + (bits.indexOf('0') < 0 ? 32 : bits.indexOf('0')) : t;
    }
  };
  function normalizeCommand(s, flagOrder) {
    const t = squash(s).toLowerCase().replace(/\.$/, '');
    if (!t) return '';
    if (flagOrder === false) { const parts = t.split(' '); return parts[0] + (parts.length > 1 ? ' ' + parts.slice(1).sort().join(' ') : ''); }
    return t;
  }
  const fieldNorm = f => normalize[f.normalize] || normalize.text;
  const fieldOk = (f, v) => (f.expect || []).some(e => fieldNorm(f)(e) === fieldNorm(f)(v));
  const commandOk = (t, v) => [].concat(t.expect || [], t.alt || []).some(e => normalizeCommand(e, t.flagOrder) === normalizeCommand(v, t.flagOrder));

  function grade(task, answer) {
    let score = 0; let detail = null;
    switch (task.kind) {
      case 'order': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'match': {
        const a = Array.isArray(answer) ? answer : []; const e = task.expect || [];
        const hits = e.map((x, i) => a[i] != null && a[i] === x); score = e.length ? hits.filter(Boolean).length / e.length : 0; detail = hits; break;
      }
      case 'multiselect': {
        const a = Array.isArray(answer) ? Array.from(new Set(answer)) : []; const e = new Set(task.expect || []);
        const right = a.filter(i => e.has(i)).length; const wrong = a.length - right;
        score = e.size ? Math.max(0, right - wrong) / e.size : 0; detail = { right, wrong }; break;
      }
      case 'form': {
        const a = answer && typeof answer === 'object' ? answer : {}; const fs = task.fields || [];
        const hits = fs.map(f => fieldOk(f, a[f.id])); score = fs.length ? hits.filter(Boolean).length / fs.length : 0; detail = hits; break;
      }
      case 'command': score = commandOk(task, answer) ? 1 : 0; break;
      case 'choice': score = answer != null && Number(answer) === Number(task.expect) ? 1 : 0; break;
      default: score = 0;
    }
    score = Math.round(score * 1000) / 1000;
    return { score, correct: score === 1, detail };
  }

  function emptyAnswer(task) {
    switch (task.kind) {
      case 'order': return [];
      case 'match': return (task.left || []).map(() => null);
      case 'multiselect': return [];
      case 'form': return {};
      case 'command': return '';
      default: return null;
    }
  }
  const NONE = '(no answer)';
  function expectedText(task) {
    switch (task.kind) {
      case 'order': return (task.expect || []).map(i => task.items[i]).join(', ');
      case 'match': return (task.left || []).map((l, i) => `${l}: ${task.right[task.expect[i]]}`).join('; ');
      case 'multiselect': return (task.expect || []).slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ');
      case 'form': return (task.fields || []).map(f => `${f.label}: ${(f.expect || [])[0] || ''}`).join('; ');
      case 'command': return (task.expect || [])[0] || '';
      case 'choice': return str((task.options || [])[task.expect]);
      default: return '';
    }
  }
  function answerText(task, answer) {
    if (answer == null) return NONE;
    switch (task.kind) {
      case 'order': return Array.isArray(answer) && answer.length ? answer.map(i => task.items[i]).join(', ') : NONE;
      case 'match': return (task.left || []).map((l, i) => `${l}: ${answer[i] != null ? task.right[answer[i]] : '(not placed)'}`).join('; ');
      case 'multiselect': return Array.isArray(answer) && answer.length ? answer.slice().sort((a, b) => a - b).map(i => task.options[i]).join(', ') : NONE;
      case 'form': return (task.fields || []).map(f => `${f.label}: ${squash(answer[f.id]) || '(blank)'}`).join('; ');
      case 'command': return squash(answer) || NONE;
      case 'choice': return answer != null && task.options && task.options[answer] != null ? task.options[answer] : NONE;
      default: return NONE;
    }
  }

  // Filled in by Task 4.
  function render() { throw new Error('FRAPbq.render is not implemented yet'); }
  function collect() { throw new Error('FRAPbq.collect is not implemented yet'); }

  return { KINDS, normalize, normalizeCommand, grade, emptyAnswer, expectedText, answerText, render, collect };
})();
```

- [ ] **Step 4: Run the tests**

Run: `node tests/pbq.js`
Expected: every check PASS, `All PBQ tests passed.`

- [ ] **Step 5: Add the test to the chain and commit**

In `package.json` line 7, insert `node tests/pbq.js && ` immediately after `node tests/instruments.js && `.

```bash
node tests/pbq.js && git add engine/pbq.js tests/pbq.js package.json
git commit -m "feat(pbq): grading core for the six PBQ task kinds with normalization and answer text"
```

---

### Task 2: Register `engine/pbq.js` everywhere the engine is loaded

**Files:**
- Modify: `build.py` (the `build()` bundle, `build.py:178-184`), `tests/lib.js` (`boot()`, line 27 region), `tests/loaders.js` (line 17 `BEFORE_APP`), every `<id>/index.html` shell on `main`.

**Interfaces:**
- Produces: `window.FRAPbq` available before `engine/app.js` runs in every bundle, every shell, and every jsdom boot.

- [ ] **Step 1: Make the loaders test demand the file first**

`tests/loaders.js` line 17: `const BEFORE_APP = ['merge.js', 'strength.js', 'auth.js', 'sync.js', 'instruments.js', 'pbq.js'];`

Run: `node tests/loaders.js 2>&1 | grep -c FAIL`
Expected: a nonzero count (every shell, `build.py`, and `tests/lib.js` lack the registration).

- [ ] **Step 2: Register it**

`build.py` inside `build()`: after the line `+ read(os.path.join(ENGINE, "instruments.js")) + "\n"` add `+ read(os.path.join(ENGINE, "pbq.js")) + "\n"` (before `+ read(os.path.join(ENGINE, "app.js"))`).

`tests/lib.js` inside `boot()`: after the `instruments.js` eval line add `w.eval(fs.readFileSync(path.join(o.engineDir, 'pbq.js'), 'utf8'));`.

Every shell (`bmet/index.html`, `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`, and `cres/index.html` and `chtm/index.html` if present): insert `<script src="../engine/pbq.js"></script>` immediately after the `<script src="../engine/instruments.js"></script>` line.

- [ ] **Step 3: Verify**

```bash
node tests/loaders.js 2>&1 | tail -3
node tests/engine.js 2>&1 | tail -2
python build.py netplus && grep -c "window.FRAPbq" dist/netplus.html
```
Expected: loaders pass with every shell listed; engine tests pass; the bundle contains `window.FRAPbq` once.

- [ ] **Step 4: Commit**

```bash
git add build.py tests/lib.js tests/loaders.js */index.html dist/netplus.html
git commit -m "feat(pbq): register engine/pbq.js in the bundler, the shells, the jsdom boot, and the loaders audit"
```

---

### Task 3: State, merge, sync hash, summary, and the account count

**Files:**
- Modify: `engine/app.js` (`fresh()` at line 147; a `pbqStat` accessor beside `labStat` at line 206), `engine/merge.js` (`mergeMaps` line 95-106 and `mergeState` line 170), `engine/sync.js` (`hashOf` line 221), `engine/summary.js` (`summarize` lines 40 and 70), `build.py` (`course_meta` lines 59 and 69), `account/index.html` (line 98)
- Modify tests: `tests/merge.js`, `tests/sync.js`, `tests/summary.js`, `tests/account.js`

**Interfaces:**
- Produces: `S.pbqs` in fresh state; `pbqStat(id)` returning `{ best: 0, done: false, at: 0, tasks: {} }`; merge of `pbqs` by newer `at`; `hashOf` ignoring an empty `pbqs`; `summarize()` returning `pbqsDone` and `pbqsTotal`; `course_meta()` returning `"pbqs": <count>`; the account card showing "PBQs done" when `c.pbqs > 0`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/merge.js` (follow the file's existing `check` helper and the way it builds two states):

```js
// ----- pbqs merge by newer at -----
{
  const a = { v: 3, course: 'mini', exams: [], pbqs: { p1: { best: 0.5, done: false, at: 10, tasks: { t: 0.5 } }, p2: { best: 1, done: true, at: 50, tasks: { t: 1 } } } };
  const b = { v: 3, course: 'mini', exams: [], pbqs: { p1: { best: 1, done: true, at: 20, tasks: { t: 1 } }, p3: { best: 0, done: false, at: 5, tasks: {} } } };
  const m = w.FRAMerge.mergeState(a, b, { passPct: 80, passesNeeded: 3, passWindow: 5, officialPct: 70 });
  check('pbqs: the newer entry wins whole', m.pbqs.p1.at === 20 && m.pbqs.p1.done === true && m.pbqs.p1.best === 1);
  check('pbqs: entries on one side pass through', m.pbqs.p2.at === 50 && m.pbqs.p3.at === 5);
  const m2 = w.FRAMerge.mergeState({ v: 3, course: 'mini', exams: [] }, { v: 3, course: 'mini', exams: [] }, { passPct: 80, passesNeeded: 3, passWindow: 5, officialPct: 70 });
  check('pbqs: always present after a merge, empty when neither side had it', m2.pbqs && typeof m2.pbqs === 'object' && Object.keys(m2.pbqs).length === 0);
}
```

Append to `tests/sync.js` (beside its `hashOf` checks):

```js
check('hashOf: an empty pbqs map hashes like no pbqs at all', w.FRASync.hashOf({ v: 3, course: 'mini', exams: [], pbqs: {} }) === w.FRASync.hashOf({ v: 3, course: 'mini', exams: [] }));
check('hashOf: a non-empty pbqs map changes the hash', w.FRASync.hashOf({ v: 3, course: 'mini', exams: [], pbqs: { p1: { best: 1, done: true, at: 1, tasks: {} } } }) !== w.FRASync.hashOf({ v: 3, course: 'mini', exams: [] }));
```

Append to `tests/summary.js`:

```js
{
  const s = SUM.summarize({ pbqs: { a: { done: true, at: 1 }, b: { done: false, at: 2 }, c: 'junk' } }, { pbqs: 10 });
  check('summarize: pbqsDone counts done entries only, pbqsTotal comes from meta', s.pbqsDone === 1 && s.pbqsTotal === 10);
  const s0 = SUM.summarize({}, {});
  check('summarize: no pbqs reads as zero of zero', s0.pbqsDone === 0 && s0.pbqsTotal === 0);
}
```

Append to `tests/account.js` (it renders cards from a fake `FRA_COURSES` table and fake rows; follow its existing pattern for `Labs done`):

```js
check('account card shows PBQs done when the course has PBQs', renderCard({ id: 'x', name: 'X', exam: 'X', lessons: 10, labs: 0, pbqs: 10, examQuestions: 50, passPct: 80, passesNeeded: 3, passWindow: 5, checkpointN: 4, domains: [], lessonList: [] }, { pbqs: { a: { done: true, at: 1 } } }).includes('PBQs done'));
check('account card hides PBQs done when the course has none', !renderCard({ id: 'x', name: 'X', exam: 'X', lessons: 10, labs: 0, pbqs: 0, examQuestions: 50, passPct: 80, passesNeeded: 3, passWindow: 5, checkpointN: 4, domains: [], lessonList: [] }, {}).includes('PBQs done'));
```
If `tests/account.js` has no `renderCard` helper, add one that boots `account/index.html` in jsdom the way the file already does for its other checks and returns the card's HTML for one course and one state.

Run: `node tests/merge.js 2>&1 | grep FAIL; node tests/sync.js 2>&1 | grep FAIL; node tests/summary.js 2>&1 | grep FAIL; node tests/account.js 2>&1 | grep FAIL`
Expected: the new checks FAIL.

- [ ] **Step 2: Implement**

`engine/app.js` `fresh()` (line 147): add `pbqs: {},` after `labs: {},`. After `const labsDoneCount = ...` (line 208) add:

```js
  // PBQ progress: best score and done flag per PBQ, task scores from the last Check.
  const PBQS = FRA.pbqs || {}; const pbqIds = Object.keys(PBQS);
  const pbqStat = id => S.pbqs[id] || (S.pbqs[id] = { best: 0, done: false, at: 0, tasks: {} });
  const pbqDone = id => !!(S.pbqs[id] && S.pbqs[id].done);
  const pbqsDoneCount = () => pbqIds.filter(pbqDone).length;
```
and in `load()` (line 162-172), where older blobs are migrated, add `if (!S.pbqs || typeof S.pbqs !== 'object') S.pbqs = {};` beside the equivalent `labs` guard (add one for labs too if none exists).

`engine/merge.js` `mergeMaps` (line 105): after the `labs:` line add `pbqs: mergeBy(a.pbqs, b.pbqs, (x, y) => laterOf(x, y, 'at'))` (with a comma on the `labs` line). `mergeState` (line 170): change `labs: maps.labs,` to `labs: maps.labs, pbqs: maps.pbqs,`.

`engine/sync.js` `hashOf` (after line 221): add `if (c.pbqs && typeof c.pbqs === 'object' && !Object.keys(c.pbqs).length) delete c.pbqs;` with a one-line comment "Same class again: pbqs is an additive map."

`engine/summary.js` `summarize`: after the `labsDone` line (40) add `const pbqs = obj(s.pbqs) || {}; const pbqsDone = Object.keys(pbqs).filter(id => obj(pbqs[id]) && pbqs[id].done === true).length;` and in the returned object (line 70) add `pbqsDone, pbqsTotal: Number(m.pbqs) > 0 ? Number(m.pbqs) : 0,` after the `labsDone` pair. Update the comment at lines 26-27 to list the new fields.

`build.py` `course_meta()`: after the `labs = ...` line (59) add `pbqs = len(re.findall(r'FRA\.pbqs\["([a-z0-9-]+)"\]\s*=\s*\{', scripts))` and in the returned dict add `"pbqs": pbqs,` after `"labs": len(labs),`.

`account/index.html` line 98: after the `Labs done` fact add `+ (c.pbqs > 0 ? fact('PBQs done', s.pbqsDone + ' of ' + s.pbqsTotal) : '')`.

- [ ] **Step 3: Run the four tests and the suite**

```bash
node tests/merge.js 2>&1 | tail -2 && node tests/sync.js 2>&1 | tail -2 && node tests/summary.js 2>&1 | tail -2 && node tests/account.js 2>&1 | tail -2 && npm test 2>&1 | tail -3
```
Expected: all pass; `python build.py` later rebuilds `dist/account.html` with the new fact.

- [ ] **Step 4: Commit**

```bash
git add engine/app.js engine/merge.js engine/sync.js engine/summary.js build.py account/index.html tests/merge.js tests/sync.js tests/summary.js tests/account.js
git commit -m "feat(pbq): pbqs state merged by newer at, ignored by the sync hash when empty, counted by summary and the account page"
```

---

### Task 4: The PBQs tab and the interactive task renderers

**Files:**
- Modify: `engine/pbq.js` (replace the `render` and `collect` stubs), `engine/app.js` (routes, nav, views, acts, Home stat), `engine/styles.css`
- Create: `tests/fixtures/mini/pbqs.js`
- Modify: `tests/fixtures/mini/course.js`, `tests/pbq.js` (rendering checks), `tests/engine.js` (view checks)

**Interfaces:**
- Consumes: `pbqStat`, `pbqDone`, `PBQS`, `pbqIds` from Task 3; `FRAPbq.grade`, `emptyAnswer`, `answerText`, `expectedText` from Task 1.
- Produces: `FRAPbq.render(container, pbq, ui, helpers)` and `FRAPbq.collect(container, pbq, ui)`; routes `#pbq` and `#pbq/<id>`; acts `pbq-check`, `pbq-retry`; the nav tab "PBQs" when `pbqIds.length`; the Home stat "PBQs done".

**UI state.** `ui = { order: { taskId: [displayIndex...] }, answers: { taskId: answer }, sel: { taskId: value }, checked: false }`, kept per PBQ in `pbqUiMap` inside `app.js` like `instUiMap` (line 811), so re-renders keep the shuffle and the in-progress answers. Answers are in pack indexes (mapped back from the display order), so `grade` never sees display indexes.

- [ ] **Step 1: Write the mini fixture `tests/fixtures/mini/pbqs.js`** (exact content)

```js
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};
// One PBQ with every task kind, on the free lesson u1l2, marked for the static page, so the view,
// the state, the merge, the test integration, and the static page are all testable without a pack.
FRA.pbqs["mini-net"] = {
  id: "mini-net", title: "Bring the new printer online", domain: 1, lesson: "u1l2", seo: true,
  scenario: { text: "A new network printer must join VLAN 10 on the 192.168.10.0/26 segment. The switch port shows no link.", log: "Port Gi1/0/7: notconnect\nVLAN 10: active\nPort Gi1/0/7 speed auto duplex auto" },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the troubleshooting steps in order.", items: ["Identify the problem", "Establish a theory", "Test the theory", "Establish a plan"], expect: [0, 1, 2, 3] },
    { id: "pairs", kind: "match", prompt: "Match each device to its layer.", left: ["Switch", "Router"], right: ["Layer 2", "Layer 3", "Layer 7"], expect: [0, 1] },
    { id: "lines", kind: "multiselect", prompt: "Pick every line that shows a problem.", options: ["Port Gi1/0/7: notconnect", "VLAN 10: active", "speed auto duplex auto"], expect: [0] },
    { id: "cfg", kind: "form", prompt: "Give the printer a valid address.", fields: [{ id: "ip", label: "IP address", expect: ["192.168.10.10"], normalize: "ip" }, { id: "mask", label: "Subnet mask", expect: ["255.255.255.192", "/26"], normalize: "cidr" }] },
    { id: "cmd", kind: "command", prompt: "Type the command that shows the full IP configuration on the Windows workstation.", expect: ["ipconfig /all"], alt: ["ipconfig -all"], flagOrder: false },
    { id: "cable", kind: "choice", prompt: "The port shows no link. What do you check first?", options: ["The patch cable and the port light", "The DNS server", "The printer's toner"], expect: 0 }
  ],
  why: {
    steps: "Identify, theorize, test, then plan: the method always starts with the symptom.",
    pairs: "A switch forwards frames at layer 2; a router forwards packets at layer 3.",
    lines: "notconnect is the only line that reports a fault; the others are normal settings.",
    cfg: "Any host address inside 192.168.10.0/26 works; the mask is 255.255.255.192, which is /26.",
    cmd: "ipconfig /all shows the adapter's address, mask, gateway, and DNS servers.",
    cable: "No link is a physical-layer symptom: check the cable and the port light before anything above it."
  }
};
```

In `tests/fixtures/mini/course.js` add `pbqInTest: 1` inside `test: {...}` and `seo: { pbqPhrases: ["Mini Exam PBQs", "MC-1 performance-based questions"] }` as a new top-level field.

- [ ] **Step 2: Write the failing rendering tests** (append to `tests/pbq.js` before the final summary lines; they use a second jsdom window with the mini fixture)

```js
// ----- rendering: drag, tap, and keyboard give the same answer; collect maps display order back to pack indexes -----
{
  const w2 = new JSDOM('<!doctype html><html><body><div id="host"></div></body></html>', { runScripts: 'outside-only', url: 'http://localhost/' }).window;
  w2.eval(fs.readFileSync(path.join(ROOT, 'engine', 'pbq.js'), 'utf8'));
  w2.eval(fs.readFileSync(path.join(ROOT, 'tests', 'fixtures', 'mini', 'pbqs.js'), 'utf8'));
  const P2 = w2.FRAPbq; const pbq = w2.FRA.pbqs['mini-net']; const host = w2.document.getElementById('host');
  const helpers = { esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])), inline: s => String(s) };
  const ui = { order: {}, answers: {}, sel: {}, checked: false };
  P2.render(host, pbq, ui, helpers);
  check('render: one task card per task', host.querySelectorAll('.pbq-task').length === 6);
  check('render: no task control carries data-act', host.querySelectorAll('.pbq-task [data-act]').length === 0);
  const click = el => el.dispatchEvent(new w2.MouseEvent('click', { bubbles: true }));
  // order by tap: tap an item, tap another, they swap
  const orderCard = host.querySelector('.pbq-task[data-task="steps"]');
  const items = () => [...orderCard.querySelectorAll('[data-pbq="order-item"]')];
  const firstText = items()[0].textContent.trim(), secondText = items()[1].textContent.trim();
  click(items()[0]); check('order: tapping an item selects it', items()[0].getAttribute('aria-pressed') === 'true');
  click(items()[1]); check('order: tapping a second item swaps the two', items()[0].textContent.trim() === secondText && items()[1].textContent.trim() === firstText);
  // order by keyboard: focus an item and press ArrowUp
  items()[1].focus(); items()[1].dispatchEvent(new w2.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
  check('order: ArrowUp moves the focused item up', items()[0].textContent.trim() === firstText);
  // order by drag: dragstart on item 3, drop on item 0
  const dt = { data: {}, setData(k, v) { this.data[k] = v; }, getData(k) { return this.data[k]; }, effectAllowed: '', dropEffect: '' };
  const ds = new w2.Event('dragstart', { bubbles: true }); ds.dataTransfer = dt; items()[3].dispatchEvent(ds);
  const dp = new w2.Event('drop', { bubbles: true }); dp.dataTransfer = dt; items()[0].dispatchEvent(dp);
  check('order: dropping item 4 on item 1 moves it there', items()[0].textContent.trim() === 'Establish a plan');
  // match by tap: tap a left chip, tap a right slot
  const matchCard = host.querySelector('.pbq-task[data-task="pairs"]');
  click(matchCard.querySelector('[data-pbq="match-item"]')); click(matchCard.querySelectorAll('[data-pbq="match-slot"]')[1]);
  check('match: a tapped chip lands in the tapped slot', matchCard.querySelectorAll('[data-pbq="match-slot"]')[1].querySelector('.pbq-chip') !== null);
  // multiselect, form, command, choice
  const msCard = host.querySelector('.pbq-task[data-task="lines"]'); click(msCard.querySelectorAll('[data-pbq="ms-opt"]')[0]);
  const formCard = host.querySelector('.pbq-task[data-task="cfg"]'); formCard.querySelector('input[data-field="ip"]').value = '192.168.10.10'; formCard.querySelector('input[data-field="mask"]').value = '/26';
  host.querySelector('.pbq-task[data-task="cmd"] input').value = 'IPCONFIG /ALL';
  const chCard = host.querySelector('.pbq-task[data-task="cable"]'); click(chCard.querySelectorAll('[data-pbq="choice"]')[0]);
  const answers = P2.collect(host, pbq, ui);
  check('collect: order answer is in pack indexes and reflects the moves', Array.isArray(answers.steps) && answers.steps.length === 4 && answers.steps[0] === 3);
  check('collect: match answer maps the chip to the chosen slot in pack indexes', Array.isArray(answers.pairs) && answers.pairs.length === 2 && answers.pairs.filter(x => x != null).length === 1);
  check('collect: multiselect, form, command, and choice answers are read back', answers.lines.length === 1 && answers.cfg.ip === '192.168.10.10' && answers.cfg.mask === '/26' && answers.cmd === 'IPCONFIG /ALL' && answers.cable != null);
  const graded = pbq.tasks.map(t => P2.grade(t, answers[t.id]));
  check('collect then grade: the multiselect, form, command, and choice picks above are right', graded[2].correct && graded[3].correct && graded[4].correct && graded[5].correct);
  // re-render with checked: true shows every why and locks the controls
  ui.answers = answers; ui.checked = true; P2.render(host, pbq, ui, helpers);
  check('render after Check: a why per task and no enabled inputs', host.querySelectorAll('.pbq-why').length === 6 && [...host.querySelectorAll('input, button[data-pbq]')].every(el => el.disabled));
  // display order is stable across renders
  const before = [...host.querySelectorAll('.pbq-task[data-task="steps"] [data-pbq="order-item"]')].map(e => e.textContent.trim()).join('|');
  P2.render(host, pbq, ui, helpers);
  check('render: the display order survives a re-render', [...host.querySelectorAll('.pbq-task[data-task="steps"] [data-pbq="order-item"]')].map(e => e.textContent.trim()).join('|') === before);
}
```

Run: `node tests/pbq.js 2>&1 | grep -c FAIL`
Expected: the rendering checks FAIL (render throws).

- [ ] **Step 3: Implement `render` and `collect` in `engine/pbq.js`** (replace the two stubs with this; keep everything above them)

```js
  // ---------- rendering ----------
  // ui = { order: { taskId: [packIndex in display position] }, answers: { taskId: answer }, sel: { taskId: value }, checked }.
  // Display order is chosen once per task (shuffled) and kept in ui.order so re-renders are stable;
  // answers are always in pack indexes. Controls carry data-pbq, never data-act.
  const shuffled = n => { const a = Array.from({ length: n }, (_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function orderFor(ui, task, n, key) {
    ui.order = ui.order || {}; const k = key || task.id;
    if (!ui.order[k] || ui.order[k].length !== n) ui.order[k] = shuffled(n);
    return ui.order[k];
  }
  function render(container, pbq, ui, helpers) {
    const esc = helpers.esc, inline = helpers.inline || helpers.esc;
    ui.answers = ui.answers || {}; ui.sel = ui.sel || {};
    const dis = ui.checked ? ' disabled' : '';
    const html = pbq.tasks.map((t, i) => {
      const a = ui.answers[t.id] != null ? ui.answers[t.id] : emptyAnswer(t);
      const res = ui.checked ? grade(t, a) : null;
      let body = '';
      if (t.kind === 'order') {
        // Display order: the learner's current sequence if any, else the shuffle.
        const seq = Array.isArray(a) && a.length === t.items.length ? a : orderFor(ui, t, t.items.length);
        body = `<ol class="pbq-order">${seq.map((pi, pos) => `<li><button type="button" class="pbq-chip" data-pbq="order-item" data-index="${pi}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === pi ? 'true' : 'false'}"${dis}><span class="pbq-pos">${pos + 1}</span>${inline(t.items[pi])}</button></li>`).join('')}</ol><p class="muted pbq-hint">Drag, or tap one item then another to swap them, or use the arrow keys.</p>`;
      } else if (t.kind === 'match') {
        const lo = orderFor(ui, t, t.left.length, t.id + ':l'), ro = orderFor(ui, t, t.right.length, t.id + ':r');
        const placed = li => Array.isArray(a) ? a[li] : null;
        const bank = lo.filter(li => placed(li) == null).map(li => `<button type="button" class="pbq-chip" data-pbq="match-item" data-index="${li}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === li ? 'true' : 'false'}"${dis}>${inline(t.left[li])}</button>`).join('');
        const slots = ro.map(ri => { const li = Array.isArray(a) ? a.indexOf(ri) : -1; return `<div class="pbq-slot" data-pbq="match-slot" data-index="${ri}" tabindex="${ui.checked ? -1 : 0}"><span class="pbq-slot-label">${inline(t.right[ri])}</span>${li >= 0 ? `<button type="button" class="pbq-chip" data-pbq="match-item" data-index="${li}" draggable="${ui.checked ? 'false' : 'true'}" aria-pressed="${ui.sel[t.id] === li ? 'true' : 'false'}"${dis}>${inline(t.left[li])}</button>` : '<span class="pbq-empty">drop here</span>'}</div>`; }).join('');
        body = `<div class="pbq-bank">${bank || '<span class="muted">All placed.</span>'}</div><div class="pbq-slots">${slots}</div><p class="muted pbq-hint">Drag an item onto its match, or tap the item then tap the match. Tap a placed item to return it.</p>`;
      } else if (t.kind === 'multiselect') {
        const oo = orderFor(ui, t, t.options.length); const chosen = new Set(Array.isArray(a) ? a : []);
        body = `<div class="options">${oo.map(oi => `<button type="button" class="option" data-pbq="ms-opt" data-index="${oi}" aria-pressed="${chosen.has(oi) ? 'true' : 'false'}"${dis}><span class="key">${chosen.has(oi) ? 'x' : ''}</span><span>${inline(t.options[oi])}</span></button>`).join('')}</div><p class="muted pbq-hint">Pick every line that applies.</p>`;
      } else if (t.kind === 'form') {
        body = `<div class="pbq-form">${t.fields.map(f => `<label class="field"><span>${esc(f.label)}</span><input type="text" data-pbq="field" data-field="${esc(f.id)}" value="${esc(a && a[f.id] != null ? a[f.id] : '')}" autocomplete="off" spellcheck="false"${dis}></label>`).join('')}</div>`;
      } else if (t.kind === 'command') {
        body = `<div class="pbq-cmd"><span class="pbq-prompt">&gt;</span><input type="text" data-pbq="command" value="${esc(a || '')}" autocomplete="off" spellcheck="false" placeholder="type the command"${dis}></div>`;
      } else {
        const oo = orderFor(ui, t, t.options.length);
        body = `<div class="options">${oo.map((oi, k) => `<button type="button" class="option" data-pbq="choice" data-index="${oi}" aria-pressed="${a === oi ? 'true' : 'false'}"${dis}><span class="key">${'ABCDEFGH'[k] || k + 1}</span><span>${inline(t.options[oi])}</span></button>`).join('')}</div>`;
      }
      const verdict = res ? `<div class="feedback ${res.correct ? 'good' : 'bad'}"><div class="verdict">${res.correct ? 'Correct' : res.score > 0 ? `Partly right (${Math.round(res.score * 100)}%)` : 'Not right'}</div>${res.correct ? '' : `<div><strong>Expected:</strong> ${esc(expectedText(t))}</div>`}<div class="pbq-why">${inline((pbq.why || {})[t.id] || '')}</div></div>` : '';
      return `<div class="pbq-task ${res ? (res.correct ? 'ok' : 'miss') : ''}" data-task="${esc(t.id)}" data-kind="${t.kind}"><div class="q-stem"><span class="muted tnum">${i + 1}.</span> ${inline(t.prompt)}</div>${body}${verdict}</div>`;
    }).join('');
    container.innerHTML = html;
    if (!container.__pbqWired) { wire(container); container.__pbqWired = true; }
    container.__pbq = { pbq, ui };
  }
  // The one listener set per container: clicks, drags, and keys on data-pbq controls.
  function wire(container) {
    const ctx = () => container.__pbq || {};
    const taskOf = el => { const card = el.closest('.pbq-task'); const { pbq } = ctx(); return card && pbq ? pbq.tasks.find(t => t.id === card.dataset.task) : null; };
    const rerender = () => { const { pbq, ui } = ctx(); render(container, pbq, ui, container.__helpers); };
    const seqOf = (ui, t) => { const a = ui.answers[t.id]; return Array.isArray(a) && a.length === t.items.length ? a.slice() : orderFor(ui, t, t.items.length).slice(); };
    const moveOrder = (ui, t, from, to) => { const seq = seqOf(ui, t); const [x] = seq.splice(from, 1); seq.splice(to, 0, x); ui.answers[t.id] = seq; ui.order[t.id] = seq.slice(); };
    const swapOrder = (ui, t, i, j) => { const seq = seqOf(ui, t); [seq[i], seq[j]] = [seq[j], seq[i]]; ui.answers[t.id] = seq; ui.order[t.id] = seq.slice(); };
    const place = (ui, t, li, ri) => { const a = Array.isArray(ui.answers[t.id]) ? ui.answers[t.id].slice() : emptyAnswer(t); const prev = a.indexOf(ri); if (prev >= 0) a[prev] = null; a[li] = ri; ui.answers[t.id] = a; };
    const unplace = (ui, t, li) => { const a = Array.isArray(ui.answers[t.id]) ? ui.answers[t.id].slice() : emptyAnswer(t); a[li] = null; ui.answers[t.id] = a; };
    container.addEventListener('click', e => {
      const el = e.target.closest('[data-pbq]'); if (!el || el.disabled) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; const kind = el.dataset.pbq; const idx = Number(el.dataset.index);
      if (kind === 'order-item') {
        const seq = seqOf(ui, t); const pos = seq.indexOf(idx);
        if (ui.sel[t.id] == null) { ui.sel[t.id] = idx; } else if (ui.sel[t.id] === idx) { delete ui.sel[t.id]; } else { swapOrder(ui, t, seq.indexOf(ui.sel[t.id]), pos); delete ui.sel[t.id]; }
        rerender(); return;
      }
      if (kind === 'match-item') {
        const a = ui.answers[t.id]; const placed = Array.isArray(a) && a[idx] != null;
        if (placed) { unplace(ui, t, idx); delete ui.sel[t.id]; } else if (ui.sel[t.id] === idx) { delete ui.sel[t.id]; } else { ui.sel[t.id] = idx; }
        rerender(); return;
      }
      if (kind === 'match-slot') { if (ui.sel[t.id] != null) { place(ui, t, ui.sel[t.id], idx); delete ui.sel[t.id]; rerender(); } return; }
      if (kind === 'ms-opt') { const a = new Set(Array.isArray(ui.answers[t.id]) ? ui.answers[t.id] : []); if (a.has(idx)) a.delete(idx); else a.add(idx); ui.answers[t.id] = Array.from(a); rerender(); return; }
      if (kind === 'choice') { ui.answers[t.id] = idx; rerender(); return; }
    });
    container.addEventListener('keydown', e => {
      const el = e.target.closest('[data-pbq]'); if (!el || el.disabled) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; const kind = el.dataset.pbq; const idx = Number(el.dataset.index);
      if (kind === 'order-item' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        const seq = seqOf(ui, t); const pos = seq.indexOf(idx); const to = e.key === 'ArrowUp' ? pos - 1 : pos + 1;
        if (to < 0 || to >= seq.length) return; e.preventDefault(); moveOrder(ui, t, pos, to); rerender();
        const again = container.querySelector(`.pbq-task[data-task="${t.id}"] [data-pbq="order-item"][data-index="${idx}"]`); if (again) again.focus(); return;
      }
      if (kind === 'match-slot' && (e.key === 'Enter' || e.key === ' ')) { if (ui.sel[t.id] != null) { e.preventDefault(); place(ui, t, ui.sel[t.id], idx); delete ui.sel[t.id]; rerender(); } }
    });
    container.addEventListener('dragstart', e => {
      const el = e.target.closest('[data-pbq="order-item"], [data-pbq="match-item"]'); if (!el) return; const { ui } = ctx(); if (!ui || ui.checked) return;
      const t = taskOf(el); if (!t) return; container.__drag = { task: t.id, kind: el.dataset.pbq, index: Number(el.dataset.index) };
      if (e.dataTransfer) { try { e.dataTransfer.setData('text/plain', el.dataset.index); e.dataTransfer.effectAllowed = 'move'; } catch (err) { /* jsdom */ } }
    });
    container.addEventListener('dragover', e => { if (container.__drag) e.preventDefault(); });
    container.addEventListener('drop', e => {
      const d = container.__drag; if (!d) return; const { ui } = ctx(); container.__drag = null; if (!ui || ui.checked) return;
      const target = e.target.closest('[data-pbq="order-item"], [data-pbq="match-slot"], [data-pbq="match-bank"]'); if (!target) return;
      const t = taskOf(target); if (!t || t.id !== d.task) return; e.preventDefault();
      if (d.kind === 'order-item' && target.dataset.pbq === 'order-item') { const seq = seqOf(ui, t); moveOrder(ui, t, seq.indexOf(d.index), seq.indexOf(Number(target.dataset.index))); rerender(); return; }
      if (d.kind === 'match-item' && target.dataset.pbq === 'match-slot') { place(ui, t, d.index, Number(target.dataset.index)); rerender(); return; }
      if (d.kind === 'match-item' && target.dataset.pbq === 'match-bank') { unplace(ui, t, d.index); rerender(); }
    });
  }
  // Read every task's answer out of the DOM and ui (typed fields come from the DOM; the rest from ui.answers).
  function collect(container, pbq, ui) {
    const out = {};
    pbq.tasks.forEach(t => {
      const card = container.querySelector(`.pbq-task[data-task="${t.id}"]`);
      if (t.kind === 'form') { const a = {}; if (card) card.querySelectorAll('input[data-field]').forEach(inp => { a[inp.dataset.field] = inp.value; }); out[t.id] = a; }
      else if (t.kind === 'command') { const inp = card && card.querySelector('input[data-pbq="command"]'); out[t.id] = inp ? inp.value : ''; }
      else if (t.kind === 'order') { const a = ui.answers[t.id]; out[t.id] = Array.isArray(a) && a.length === t.items.length ? a.slice() : orderFor(ui, t, t.items.length).slice(); }
      else out[t.id] = ui.answers[t.id] != null ? ui.answers[t.id] : emptyAnswer(t);
    });
    return out;
  }
```

Then change the `render` function's first lines so it remembers helpers for re-renders: at the top of `render`, add `container.__helpers = helpers;`. Add `data-pbq="match-bank"` to the `.pbq-bank` div (`<div class="pbq-bank" data-pbq="match-bank">`) so a chip can be dragged back out of a slot. Update the module's return line to the real functions (it already names `render` and `collect`).

Note for the order kind: an order task's initial display is the shuffle until the learner moves something; `collect` returns that shuffle as the answer when untouched, which grades as whatever positions happen to be right, exactly as the real exam scores an untouched drag list.

- [ ] **Step 4: Run the PBQ tests**

Run: `node tests/pbq.js 2>&1 | grep -c FAIL` then `node tests/pbq.js 2>&1 | tail -2`
Expected: 0 failures, `All PBQ tests passed.`

- [ ] **Step 5: Write the failing view tests** (append to `tests/engine.js` before the final summary; the mini fixture is at `tests/fixtures/mini`)

```js
  // ----- PBQs tab and view -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const wn = boot({ courseDir: dir });
    check('no PBQs tab on a course without PBQs', !wn.$('[data-act="nav"][data-arg="pbq"]'));
    const wp = boot({ courseDir: mini, hash: '#pbq' }); const MK = 'fra.mini.state.v3'; const stateM = () => JSON.parse(wp.localStorage.getItem(MK));
    check('a course with PBQs shows the PBQs tab', !!wp.$('[data-act="nav"][data-arg="pbq"]'));
    check('#pbq lists the PBQ with its domain and title', /Bring the new printer online/.test(wp.text()) && /Alpha/.test(wp.text()));
    act(wp, 'pbq-open', 'mini-net');
    check('opening a PBQ shows the scenario, the log, and six task cards', /VLAN 10 on the 192.168.10.0\/26/.test(wp.text()) && !!wp.$('pre.pbq-log') && wp.$$('.pbq-task').length === 6 && wp.location.hash === '#pbq/mini-net');
    // Answer the typed and tapped kinds right, leave order and match alone, then Check.
    wp.$('.pbq-task[data-task="cfg"] input[data-field="ip"]').value = '192.168.10.10'; wp.$('.pbq-task[data-task="cfg"] input[data-field="mask"]').value = '/26';
    wp.$('.pbq-task[data-task="cmd"] input').value = 'ipconfig /all';
    wp.click(wp.$('.pbq-task[data-task="lines"] [data-pbq="ms-opt"][data-index="0"]'));
    wp.click(wp.$('.pbq-task[data-task="cable"] [data-pbq="choice"][data-index="0"]'));
    act(wp, 'pbq-check', 'mini-net');
    const ps = stateM().pbqs['mini-net'];
    check('Check writes the PBQ state with per-task scores and a timestamp', ps && ps.at > 0 && ps.tasks.cfg === 1 && ps.tasks.cmd === 1 && ps.tasks.lines === 1 && ps.tasks.cable === 1 && typeof ps.tasks.steps === 'number');
    check('Check shows a why for every task and the expected answer for a miss', wp.$$('.pbq-why').length === 6);
    check('best score is the fraction of tasks fully right', Math.abs(ps.best - (Object.values(ps.tasks).filter(s => s === 1).length / 6)) < 0.001);
    act(wp, 'pbq-retry', 'mini-net');
    check('Retry clears the answers but keeps the best score', !wp.$('.pbq-why') && stateM().pbqs['mini-net'].best === ps.best && wp.$('.pbq-task[data-task="cmd"] input').value === '');
    act(wp, 'go', 'home');
    check('Home shows PBQs done', /PBQs done/.test(wp.text()));
  }
```

Run: `node tests/engine.js 2>&1 | grep FAIL | head`
Expected: the new checks FAIL.

- [ ] **Step 6: Implement the views in `engine/app.js`**

(a) Routing: in `HASH_VIEWS` (line 506) add `'pbq'`. In `paint()`'s switch (lines 530-544) add `case 'pbq': main = viewPbq(v.arg); break;`. In `WELCOME_EXEMPT` (line 492) add `'pbq'` so the tab works before the starter test.

(b) Nav: in both nav templates (lines 554 and 565) add `${pbqIds.length ? navBtn('pbq', 'PBQs') : ''}` immediately after `${navBtn('train', 'Drills')}`.

(c) Views, placed after `mountInstrument()` (line 845):

```js
  // ---------- PBQs (FRA.pbqs; spec 2026-10-14-comptia-pbqs-design) ----------
  // Display order and in-progress answers live here per PBQ so re-renders keep them; the saved
  // state (S.pbqs) holds only scores and the done flag.
  let pbqUiMap = {}; const pbqUi = id => pbqUiMap[id] || (pbqUiMap[id] = { order: {}, answers: {}, sel: {}, checked: false });
  const PBQ_HELPERS = { esc, inline };
  function pbqScore(pbq, answers) { const scores = {}; pbq.tasks.forEach(t => { scores[t.id] = FRAPbq.grade(t, answers[t.id]).score; }); const right = pbq.tasks.filter(t => scores[t.id] === 1).length; return { scores, frac: pbq.tasks.length ? right / pbq.tasks.length : 0 }; }
  function viewPbq(arg) {
    if (!pbqIds.length) return viewHome();
    if (arg && PBQS[arg]) return viewPbqOne(PBQS[arg]);
    const rows = pbqIds.map(id => { const p = PBQS[id]; const st = S.pbqs[id]; return `<button class="option pbq-row" data-act="pbq-open" data-arg="${esc(id)}"><span class="key">${st && st.done ? 'ok' : (p.tasks || []).length}</span><span><strong>${esc(p.title)}</strong><br><span class="ink2">${esc(DOMAINS[p.domain] ? DOMAINS[p.domain].short : '')} · ${plural((p.tasks || []).length, 'task')}${st && st.at ? ` · best ${Math.round((st.best || 0) * 100)}%` : ''}</span></span></button>`; }).join('');
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">PBQs</div><h1>Performance-based questions</h1><p class="ink2" style="margin-top:6px">The real exam opens with a handful of these: drag items into order, match terms, pick lines in a log, fill a configuration, type a command. Each one here grades every task and explains it. ${(T.pbqInTest || 0) ? `Your official-format test opens with ${T.pbqInTest} of them.` : ''}</p></div>
      <div class="card stack"><div class="row spread"><h3>${plural(pbqIds.length, 'PBQ')}</h3><span class="muted" style="font-size:.9rem">${pbqsDoneCount()} done</span></div><div class="options">${rows}</div></div>
    </div>`;
  }
  function viewPbqOne(p) {
    const ui = pbqUi(p.id); const st = S.pbqs[p.id];
    const sc = p.scenario || {};
    const scenario = `<div class="card lift stack pbq-scenario"><div class="eyebrow">${esc(DOMAINS[p.domain] ? DOMAINS[p.domain].short : 'Scenario')}</div><h2>${esc(p.title)}</h2><div class="lesson-body">${renderBody(sc.text || '')}</div>${sc.svg ? `<div class="pbq-fig">${sc.svg}</div>` : ''}${sc.log ? `<pre class="pbq-log">${esc(sc.log)}</pre>` : ''}</div>`;
    const summary = ui.checked ? (() => { const { frac } = pbqScore(p, ui.answers); return `<div class="feedback ${frac === 1 ? 'good' : 'bad'}"><div class="verdict">${frac === 1 ? 'Every task right.' : `${Math.round(frac * 100)}% of tasks fully right.`}</div><div class="muted">Best so far: ${Math.round(((st && st.best) || 0) * 100)}%. Read each why, then retry or open the lesson.</div></div>` : ''; })() : '';
    const btns = ui.checked
      ? `<button class="btn primary" data-act="pbq-retry" data-arg="${esc(p.id)}">Retry</button><button class="btn ghost" data-act="lesson" data-arg="${esc(p.lesson)}">Review the lesson</button><button class="btn ghost" data-act="go" data-arg="pbq">All PBQs</button>`
      : `<button class="btn primary" data-act="pbq-check" data-arg="${esc(p.id)}">Check my answers</button><button class="btn ghost" data-act="go" data-arg="pbq">All PBQs</button>`;
    return `<div class="content stack" style="gap:18px">${scenario}<div class="card stack pbq-tasks" id="pbq" data-pbq-id="${esc(p.id)}"></div>${summary}<div class="row" style="gap:8px;flex-wrap:wrap">${btns}</div></div>`;
  }
  // Mount the task renderers into #pbq after each paint, like mountInstrument.
  function mountPbq() {
    const el = $('#pbq'); if (!el) return; const p = PBQS[el.dataset.pbqId]; if (!p || !window.FRAPbq) return;
    try { FRAPbq.render(el, p, pbqUi(p.id), PBQ_HELPERS); } catch (err) { console.warn('PBQ failed to render', err); el.innerHTML = '<p class="muted">This PBQ is unavailable.</p>'; }
  }
  function checkPbq(p) {
    const ui = pbqUi(p.id); const el = $('#pbq'); if (!el) return;
    ui.answers = FRAPbq.collect(el, p, ui); ui.checked = true;
    const { scores, frac } = pbqScore(p, ui.answers); const ps = pbqStat(p.id);
    ps.tasks = scores; ps.best = Math.max(ps.best || 0, frac); ps.at = Date.now();
    const wasDone = ps.done; ps.done = ps.done || frac === 1;
    // Each task feeds the topic record like a question, so weak-topic lists and drills see PBQ misses.
    p.tasks.forEach(t => { recordAnswer(pbqPseudoQ(p, t), scores[t.id] === 1 ? 0 : -1, scores[t.id] === 1 ? 4 : 3); });
    save(); if (!wasDone && ps.done) { if (window.FRASync) FRASync.pushNow(); toast('PBQ done'); }
  }
  // A PBQ task as an inline question record: results pages, retraining, and the strength chart read
  // review items through fat(), so a task travels as a generated-style question tied to the PBQ's lesson.
  function pbqPseudoQ(p, t) { return { gen: true, pbq: p.id, task: t.id, id: `pbq:${p.id}:${t.id}`, t: p.lesson, q: t.prompt, a: [FRAPbq.expectedText(t)], c: 0, e: (p.why || {})[t.id] || '' }; }
```

In `paint()` after `mountInstrument();` (line 568) add `mountPbq();`.

(d) Acts, in the click switch after the `lab-redo` case (line 1485):

```js
      case 'pbq-open': { if (!PBQS[arg]) return; return go('pbq', arg); }
      case 'pbq-check': { const p = PBQS[arg]; if (!p) return; checkPbq(p); render(); return; }
      case 'pbq-retry': { if (!PBQS[arg]) return; pbqUiMap[arg] = { order: {}, answers: {}, sel: {}, checked: false }; render(); return; }
```

(e) Home stat: in `viewHome()` after the `Labs done` stat line (651) add `${pbqIds.length ? `<div class="stat"><div class="eyebrow">PBQs done</div><div class="big">${pbqsDoneCount()}<small> / ${pbqIds.length}</small></div></div>` : ''}`.

(f) Pack validation at boot, after the `LABS` checks (line 80): every `FRA.pbqs` entry must have `id` equal to its key, a `lesson` that exists in `L`, a `domain` in `DOMAIN_IDS`, three to six tasks whose `kind` is in `FRAPbq.KINDS` and whose ids are unique, and a `why` string per task; throw `new Error(...)` naming the PBQ and the fault, the same style as the lab checks.

(g) `navBtn` (line 579): treat `pbq` like other views (no change needed; `S.view.name === 'pbq'` matches).

- [ ] **Step 7: Styles** (append to `engine/styles.css` after the instrument block, line 403)

```css
/* PBQs (engine/pbq.js renderers, engine/app.js viewPbq) */
.pbq-tasks { gap: 16px; }
.pbq-task { border-top: 1px solid var(--line); padding-top: 12px; display: grid; gap: 10px; }
.pbq-task.ok .q-stem { color: var(--good); }
.pbq-log { background: #0e1a14; color: #d8ffe6; padding: 12px 14px; border-radius: 8px; overflow-x: auto; margin: 0; font-size: 0.9rem; }
.pbq-fig svg { display: block; max-width: 100%; height: auto; }
.pbq-order { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.pbq-chip { display: inline-flex; align-items: center; gap: 10px; text-align: left; background: var(--surface); border: 1.5px solid var(--line); border-radius: 10px; padding: 10px 12px; font: inherit; color: var(--ink); cursor: grab; touch-action: manipulation; }
.pbq-chip[aria-pressed="true"] { border-color: var(--accent); background: var(--accent-soft); }
.pbq-chip:disabled { cursor: default; opacity: 0.9; }
.pbq-pos { flex: none; width: 24px; height: 24px; border-radius: 6px; display: grid; place-items: center; font-family: var(--font-display); font-weight: 700; font-size: 0.78rem; background: var(--surface-2); }
.pbq-bank { display: flex; flex-wrap: wrap; gap: 8px; min-height: 44px; padding: 8px; border: 1.5px dashed var(--line); border-radius: 10px; }
.pbq-slots { display: grid; gap: 8px; margin-top: 8px; }
.pbq-slot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px; border: 1.5px solid var(--line); border-radius: 10px; min-height: 48px; }
.pbq-slot:focus { outline: 2px solid var(--accent); outline-offset: 2px; }
.pbq-slot-label { font-weight: 600; }
.pbq-empty { color: var(--muted); font-size: 0.85rem; }
.pbq-form { display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.pbq-form input, .pbq-cmd input { width: 100%; padding: 9px 10px; border: 1.5px solid var(--line); border-radius: 8px; font: inherit; background: var(--surface); color: var(--ink); }
.pbq-cmd { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); }
.pbq-cmd input { font-family: var(--font-mono); }
.pbq-prompt { color: var(--muted); }
.pbq-hint { font-size: 0.85rem; margin: 0; }
.pbq-why { margin-top: 4px; }
@media (max-width: 600px) { .pbq-form { grid-template-columns: 1fr; } }
```

- [ ] **Step 8: Run the tests**

```bash
node tests/pbq.js 2>&1 | tail -1 && node tests/engine.js 2>&1 | tail -2 && node tests/loaders.js 2>&1 | tail -1 && npm test 2>&1 | tail -3
```
Expected: all pass. (`tests/selftest.js` may need the mini fixture's `pbqs.js` listed if it enumerates fixture files explicitly; `tests/lib.js` `courseFiles` loads every `.js` in the folder, so the fixture loads without changes.)

- [ ] **Step 9: Commit**

```bash
git add engine/pbq.js engine/app.js engine/styles.css tests/pbq.js tests/engine.js tests/fixtures/mini/pbqs.js tests/fixtures/mini/course.js
git commit -m "feat(pbq): PBQs tab and view with drag, tap, and keyboard task renderers, Check and Retry, state and Home count; mini fixture PBQ"
```

---

### Task 5: PBQs in the official-format test

**Files:**
- Modify: `engine/app.js` (`startExam` 930-938, `buildExam` 265-279, `viewExam`, `submitAnswer`/`testAnswer`, `finishExam` 939-969, `viewResults` `reviewItem` 1058, `pickText`), `tests/engine.js`

**Interfaces:**
- Consumes: `FRAPbq.collect`, `grade`, `answerText`, `expectedText`; `pbqPseudoQ`, `pbqUi`, `PBQS` from Task 4.
- Produces: an official-format session whose first `T.pbqInTest` items are `{ pbq: id }`; answers `{ pbq: id, answers: {taskId: answer} }`; review items per task as pseudo-questions; `e.total` counting tasks as questions.

- [ ] **Step 1: Write the failing tests** (append to `tests/engine.js`)

```js
  // ----- PBQs open the official-format test -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini'); const MK = 'fra.mini.state.v3';
    const wo = boot({ courseDir: mini }); const stateM = () => JSON.parse(wo.localStorage.getItem(MK));
    finishStarterIn(wo);
    act(wo, 'start-exam', 'practice');
    check('a practice test carries no PBQ', !stateM().active.items.some(x => x && x.pbq));
    act(wo, 'abandon-exam-silently');
    act(wo, 'start-standard');
    const a = stateM().active;
    check('the official-format test opens with pbqInTest PBQs', a.items.length > 0 && a.items[0].pbq === 'mini-net' && a.items.filter(x => x && x.pbq).length === 1);
    check('PBQ tasks replace questions one for one: the item count plus task count minus one equals the exam count', (a.items.length - 1) + 6 === 10, a.items.length);
    check('the exam view renders the PBQ tasks first', wo.$$('.pbq-task').length === 6 && /Submit this PBQ|Continue/.test(wo.text()));
    // answer two tasks right, four wrong-or-blank, submit the PBQ
    wo.$('.pbq-task[data-task="cmd"] input').value = 'ipconfig /all';
    wo.click(wo.$('.pbq-task[data-task="cable"] [data-pbq="choice"][data-index="0"]'));
    act(wo, 'submit');
    check('submitting the PBQ records the task answers and moves on', stateM().active.i === 1 && stateM().active.answers[0] && stateM().active.answers[0].pbq === 'mini-net' && stateM().active.answers[0].answers.cmd === 'ipconfig /all');
    // answer the remaining multiple-choice questions correctly
    const QQ = {}; wo.FRA.questions.forEach(q => { QQ[q.id] = q; });
    while (stateM().active) { const s = stateM().active; const it = s.items[s.i]; if (!it) break; const q = typeof it === 'string' ? QQ[it] : it; wo.click(wo.$(`[data-act="opt"][data-arg="${q.c}"]`)); act(wo, 'submit'); }
    const e = stateM().exams[stateM().exams.length - 1];
    check('the record counts PBQ tasks as questions', e.total === 10 && e.score >= 2 && e.review.length === 10);
    check('PBQ task review items carry the task as an inline question tied to the PBQ lesson', e.review.slice(0, 6).every(r => r.q && r.q.pbq === 'mini-net' && r.q.t === 'u1l2'));
    check('the results page explains missed tasks with Expected and Why', /Your answer/.test(wo.text()) && /Correct answer/.test(wo.text()) && /Why:/.test(wo.text()) && /notconnect is the only line/.test(wo.text()));
    check('missed PBQ tasks feed retraining for the PBQ lesson', !stateM().plan || stateM().plan.lessons.some(l => l.id === 'u1l2') || e.score === 10);
  }
```
Add beside `finishStarter` a `finishStarterIn(w)` that does the same for the given window (`finishStarter` closes over the Net+ `state`; write the mini one to read `fra.mini.state.v3`). Add an `abandon-exam-silently` branch in the test's `act` usage by calling `wo.confirm = () => true; act(wo, 'abandon-exam');` instead of a new act (replace that line with those two statements).

Run: `node tests/engine.js 2>&1 | grep FAIL | head`
Expected: the new checks FAIL.

- [ ] **Step 2: Implement**

(a) `startExam(kind, setup)`: after `items = buildExam(quotas)` for the non-starter branch, when `setup && setup.mode === 'standard' && T.pbqInTest > 0 && pbqIds.length`, choose PBQs and replace questions:

```js
    let pbqItems = [];
    if (setup && setup.mode === 'standard' && (T.pbqInTest || 0) > 0 && pbqIds.length) {
      pbqItems = pickPbqs(T.pbqInTest); const cut = {}; pbqItems.forEach(id => { const p = PBQS[id]; cut[p.domain] = (cut[p.domain] || 0) + p.tasks.length; });
      const q2 = Object.assign({}, quotas || {}); TESTED_IDS.forEach(d => { const base = quotas ? (quotas[d] || 0) : DOMAINS[d].quota; q2[d] = Math.max(0, base - (cut[d] || 0)); });
      items = buildExam(q2);
    }
```
and build the session with `items: pbqItems.map(id => ({ pbq: id })).concat(items.map(slim))`. Add, near `buildStarter`:

```js
  // PBQs for an official-format test: by domain weight, avoiding the ones the last official attempt used when enough exist.
  function pickPbqs(n) {
    const last = S.exams.slice().reverse().find(e => e.setup && e.setup.mode === 'standard'); const used = new Set(((last && last.pbqs) || []));
    const pool = shuffle(pbqIds.filter(id => !used.has(id)).concat(shuffle(pbqIds.filter(id => used.has(id)))));
    const weights = pctWeights(); const byD = {}; pool.forEach(id => { (byD[PBQS[id].domain] = byD[PBQS[id].domain] || []).push(id); });
    const want = apportion(Math.min(n, pbqIds.length), weights); const out = [];
    TESTED_IDS.forEach(d => { (byD[d] || []).slice(0, want[d] || 0).forEach(id => out.push(id)); });
    let k = 0; while (out.length < Math.min(n, pbqIds.length) && k < pool.length) { if (!out.includes(pool[k])) out.push(pool[k]); k++; }
    return out.slice(0, n);
  }
```

(b) `fat` (line 326) must leave PBQ markers alone: `const fat = x => typeof x === 'string' ? Q[x] : x;` already returns the object; add `const isPbqItem = x => !!(x && typeof x === 'object' && x.pbq);`.

(c) `viewExam()`: when `isPbqItem(ex.items[ex.i])`, render the PBQ page instead of `questionCard`: the exam head as today with "PBQ 1 of 1" in place of the question counter, then the scenario card from `viewPbqOne`'s scenario markup (factor that markup into `pbqScenarioHtml(p)` and use it in both places), the `<div class="card stack pbq-tasks" id="pbq" data-pbq-id="...">` mount, and controls: Previous when `nav.prev`, and `Submit this PBQ` (`data-act="submit"`) when the item is new, or `Continue` (`data-act="next"`) when reviewing a submitted one. The PBQ ui for the test is `pbqUi('test:' + id)` with the stored answers restored into `ui.answers` when reviewing. `mountPbq()` already mounts `#pbq` after paint.

(d) `submitAnswer(sess, skipped)`: at the top, `if (isTest(sess.kind) && isPbqItem(sess.items[sess.i])) { const p = PBQS[sess.items[sess.i].pbq]; const el = $('#pbq'); const ui = pbqUi('test:' + p.id); const answers = el ? FRAPbq.collect(el, p, ui) : (ui.answers || {}); if (sess.i < sess.answers.length) return testNext(sess); sess.answers[sess.i] = { pbq: p.id, answers }; sess.i++; sess.sel = null; sess.conf = null; sess.submitted = false; sess.draft = null; save(); render(); return; }`. Check `testUnrated(sess)` and `testLeave(sess)`/`testShow(sess, i)` (the review-navigation helpers near line 940) tolerate a PBQ item: `testUnrated` must return false for a PBQ item; `testShow` must restore `pbqUi('test:' + id).answers` from `sess.answers[i].answers` when it lands on a submitted PBQ.

(e) `finishExam()`: in the `items.forEach((q, k) => ...)` loop, branch first:

```js
      if (isPbqItem(q)) {
        const p = PBQS[q.pbq]; const a = ex.answers[k] || { pbq: q.pbq, answers: {} };
        p.tasks.forEach(t => {
          const g = FRAPbq.grade(t, a.answers[t.id]); const pq = pbqPseudoQ(p, t); const conf = g.correct ? 4 : 3;
          const res = recordAnswer(pq, g.correct ? 0 : -1, conf);
          const d = p.domain; byDomain[d].t++; if (res.correct) { byDomain[d].c++; score++; }
          review.push({ q: pq, choice: g.correct ? 0 : -1, pick: FRAPbq.answerText(t, a.answers[t.id]), conf, correct: res.correct, pbq: p.id, task: t.id, score: g.score });
        });
        return;
      }
```
Compute `total` as `review.length` instead of `items.length`, and add `pbqs: items.filter(isPbqItem).map(x => x.pbq)` to `rec`. Record the PBQ's best score too: `const ps = pbqStat(p.id); const frac = ...; ps.best = Math.max(ps.best, frac); ps.at = Date.now(); ps.tasks = scores;` (done is not set from a test).

(f) Results: in `reviewItem` (line 1058), when `q.pbq`, render the stem as `PBQ task: ${inline(q.q)}`, `Your answer: ${esc(r.pick)}`, `Correct answer: ${esc(q.a[0])}`, `Why: ${inline(q.e)}`, and the lesson link as today (the `Lesson:` line uses `q.t`, which is the PBQ's lesson). `pickText` is bypassed for PBQ items.

(g) `testLabel(e)` (line 1104 region) is unchanged; the history row's `e.score/e.total` now includes tasks.

- [ ] **Step 3: Run the tests**

```bash
node tests/engine.js 2>&1 | tail -2 && node tests/retrain.js 2>&1 | tail -1 && node tests/strength.js 2>&1 | tail -1 && node tests/merge.js 2>&1 | tail -1 && npm test 2>&1 | tail -3
```
Expected: all pass. If `tests/strength.js` or `tests/retrain.js` choke on a review item whose `q` is an object with `pbq`, the `lessonOf` helper in `engine/strength.js:62` already resolves inline objects by `q.t`; fix only if a check fails, and say what in the report.

- [ ] **Step 4: Commit**

```bash
git add engine/app.js tests/engine.js
git commit -m "feat(pbq): the official-format test opens with PBQs whose tasks replace questions one for one and score as questions; results explain missed tasks"
```

---

### Task 6: The static PBQ page, the landing section, the practice-test link, the sitemap, and the self-test

**Files:**
- Modify: `site/build-site.js` (`model()` 98-117, `landingPage()` 343-408, `practicePage()` 437-470, `courseUrls()` 584-586, `buildAll()`), `tests/site.js`, `tests/selftest.js`

**Interfaces:**
- Consumes: `FRA.pbqs` in a pack, `c.seo.pbqPhrases`, `FRAPbq.expectedText` (the generator loads `engine/pbq.js` into its jsdom for the answer text).
- Produces: `/<id>/pbq/index.html` for every course with PBQs; `m.urls.pbq`; the landing section; the practice page link; sitemap entries.

- [ ] **Step 1: Write the failing site tests** (append to `tests/site.js` after the practice-test checks at line 91; `m` is the mini model, `read`/`exists` the file helpers)

```js
check('pbq page written for a course with PBQs', exists('mini/pbq/index.html'));
const pb = read('mini/pbq/index.html');
check('pbq page h1 and title lead with the exam name and PBQ Practice', pb.includes('<h1>Mini Exam MC-1 PBQ Practice</h1>') && pb.includes('<title>Mini Exam MC-1 PBQ Practice | Mini Course</title>'));
check('pbq page renders the seo PBQ with scenario, log, every task, the expected answer, and the why', (pb.match(/<section class="pbq">/g) || []).length === 1 && pb.includes('<pre class="pbq-log">') && (pb.match(/<li class="pbq-task">/g) || []).length === 6 && pb.includes('Expected: Identify the problem, Establish a theory, Test the theory, Establish a plan') && pb.includes('notconnect is the only line'));
check('pbq page carries the phrases, the FAQ, and the app link', pb.includes('Mini Exam PBQs') && pb.includes('MC-1 performance-based questions') && pb.includes('How many PBQs') && pb.includes('href="/mini/app/#pbq"'));
const pld = [...pb.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('pbq JSON-LD: a Quiz with one Question per task, an FAQPage, and a BreadcrumbList', pld[0]['@type'] === 'Quiz' && pld[0].hasPart.length === 6 && pld[1]['@type'] === 'FAQPage' && pld[2]['@type'] === 'BreadcrumbList');
check('landing page has the PBQ section and link', read('mini/index.html').includes('Performance-based questions') && read('mini/index.html').includes('href="/mini/pbq/"'));
check('practice page links the PBQ page', pt.includes('href="/mini/pbq/"'));
check('sitemap lists the pbq page', read('sitemap.xml').includes('/mini/pbq/</loc>'));
```
And a negative: the site test boots a second fixture without PBQs if one exists; otherwise assert through the model: `check('courseUrls omits pbq for a course without PBQs', !site.courseUrls(Object.assign({}, m, { pbqs: {} })).includes('/mini/pbq/'))` (export `courseUrls` from the module if it is not already).

Append to `tests/selftest.js` where it validates each pack (find where it loads the pack into jsdom and reports `labs`): for `FRA.pbqs`, assert every entry has `id` equal to its key, a known `lesson`, a tested `domain`, 3 to 6 tasks with unique ids and known kinds, a `why` per task, and that the count of `seo: true` entries is exactly 3 when the pack has 3 or more PBQs (exactly 1 for the mini fixture, which has 1); print `pbqs N validated` in the pack's summary line.

Run: `node tests/site.js 2>&1 | grep -c FAIL`
Expected: nonzero.

- [ ] **Step 2: Implement in `site/build-site.js`**

(a) `model()`: in the jsdom boot that reads the pack, also load `engine/pbq.js` so `FRA.pbqs` and `FRAPbq` are available (the generator already evaluates the pack's files; add `w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'pbq.js'), 'utf8'))` before the pack files if the pack folder contains `pbqs.js`). Add `pbqs: FRA.pbqs || {}, pbqText: w.FRAPbq || null` to the returned object and `pbq: \`/${c.id}/pbq/\`` to `urls`.

(b) New function after `practicePage`:

```js
function pbqPage(m, R, origin) {
  const c = m.c; const ids = Object.keys(m.pbqs).filter(id => m.pbqs[id].seo); const P = m.pbqText;
  const phrases = (m.seo && Array.isArray(m.seo.pbqPhrases) && m.seo.pbqPhrases.length) ? m.seo.pbqPhrases : [`${examName(c) || c.name} PBQs`, `${(c.exam && c.exam.code) || c.name} performance-based questions`];
  const h1 = `${examName(c) || c.name} PBQ Practice`;
  const description = shorten(`Free ${examName(c) || c.name} performance-based questions with every task answered and explained: ${phrases.join(', ')}. Practice all ${Object.keys(m.pbqs).length} in the course.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'PBQ practice', href: m.urls.pbq }];
  const taskHtml = (p, t) => `<li class="pbq-task"><p class="stem">${R.inline(t.prompt)}</p>${t.kind === 'order' ? `<p class="muted">Items: ${t.items.map(x => R.inline(x)).join('; ')}</p>` : t.kind === 'match' ? `<p class="muted">Items: ${t.left.map(x => R.inline(x)).join('; ')}. Slots: ${t.right.map(x => R.inline(x)).join('; ')}</p>` : (t.kind === 'multiselect' || t.kind === 'choice') ? `<ol class="opts">${t.options.map(o => `<li class="opt">${R.inline(o)}</li>`).join('')}</ol>` : t.kind === 'form' ? `<p class="muted">Fields: ${t.fields.map(f => esc(f.label)).join('; ')}</p>` : ''}<p><strong>Expected: ${esc(P.expectedText(t))}</strong></p><p>${R.inline((p.why || {})[t.id] || '')}</p></li>`;
  const sections = ids.map(id => { const p = m.pbqs[id]; const sc = p.scenario || {}; return `<section class="pbq"><h2>${esc(p.title)}</h2><div class="scenario">${R.inline(sc.text || '')}</div>${sc.svg ? `<div class="pbq-fig">${sc.svg}</div>` : ''}${sc.log ? `<pre class="pbq-log">${esc(sc.log)}</pre>` : ''}<ol class="pbq-tasks">${p.tasks.map(t => taskHtml(p, t)).join('')}</ol></section>`; }).join('');
  const faq = [
    { q: `How many PBQs are on the ${examName(c) || c.name} exam?`, a: 'CompTIA does not publish the count. Expect a handful at the start of the exam, each worth more than one multiple-choice question in time and often in points.' },
    { q: 'Can you skip a PBQ and come back to it?', a: 'Yes. Flag it, answer the multiple-choice questions, and return with the time you have left.' },
    { q: 'Are PBQs weighted more than other questions?', a: 'CompTIA does not disclose its weighting. Treat each task inside a PBQ as a question you can get right or wrong.' },
    { q: `How does ${c.name} practice PBQs?`, a: `The course has ${Object.keys(m.pbqs).length} interactive PBQs: drag items into order, match terms, pick lines in a log, fill a configuration, type a command. Every task is graded and explained, and the official-format test opens with ${(c.test && c.test.pbqInTest) || 'a few'} of them.` }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson quiz-page">
  <div class="eyebrow">${esc(examName(c) || c.name)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">Performance-based questions ask you to do the task, not pick the letter. The real exam opens with a handful. Here are ${ids.length} of the course's ${Object.keys(m.pbqs).length}, with every task answered and explained: ${phrases.map(p => esc(p)).join(', ')}.</p>
  ${sections}
  <section><h2>Questions people ask</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
</article>
<aside class="card cta stack">
  <div class="eyebrow">That was ${ids.length} of ${Object.keys(m.pbqs).length}</div>
  <h2>Practice all ${Object.keys(m.pbqs).length} PBQs in the course</h2>
  <p class="ink2">Interactive, graded task by task, with the why for each. Free while we launch.</p>
  <p><a class="btn primary" href="${m.urls.app}#pbq">Practice all ${Object.keys(m.pbqs).length} PBQs</a> <a class="btn" href="${m.urls.practice}">Try the practice test</a> <a class="btn" href="${m.urls.landing}">About the course</a></p>
</aside>`;
  return shell({
    origin, path: m.urls.pbq, type: 'article',
    title: `${h1} | ${c.name}`, ogTitle: h1, description,
    nav: nav(m, m.urls.pbq),
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'Quiz', name: h1, description, url: origin + m.urls.pbq, inLanguage: 'en', isAccessibleForFree: true, about: { '@type': 'Thing', name: examName(c) || c.name }, educationalLevel: 'Intermediate', provider: org(),
        hasPart: ids.flatMap(id => m.pbqs[id].tasks.map(t => ({ '@type': 'Question', name: R.plain(t.prompt), eduQuestionType: 'Performance-based', learningResourceType: 'Practice problem', text: R.plain(t.prompt), acceptedAnswer: { '@type': 'Answer', text: P.expectedText(t) } }))) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}
```

(c) `landingPage()`: after the labs section add `${Object.keys(m.pbqs || {}).length ? `<section><h2>Performance-based questions</h2><p class="ink2">${Object.keys(m.pbqs).length} interactive PBQs: ${esc(((m.seo && m.seo.pbqPhrases) || []).join(', ') || 'drag, match, select, configure, and type')}. Every task graded and explained, and the official-format test opens with ${(c.test && c.test.pbqInTest) || 'a few'} of them.</p><p><a class="btn" href="${m.urls.pbq}">Try ${Object.keys(m.pbqs).filter(id => m.pbqs[id].seo).length} PBQs here</a></p></section>` : ''}`. In the hero's button row add `${Object.keys(m.pbqs || {}).length ? ` <a class="btn lg" href="${m.urls.pbq}">Practice PBQs</a>` : ''}`.

(d) `practicePage()`: in the aside's button row add `${Object.keys(m.pbqs || {}).length ? ` <a class="btn" href="${m.urls.pbq}">Practice PBQs</a>` : ''}`.

(e) `courseUrls(m)`: `return [m.urls.landing, m.urls.practice, m.urls.course, m.urls.cheat].concat(Object.keys(m.pbqs || {}).length ? [m.urls.pbq] : []).concat(m.freeLessons.map(l => m.urls.lesson(l)));`. In `buildAll()`, where `practicePage` is written for each course, write `pbqPage` to `<out>/<id>/pbq/index.html` when the model has PBQs. Export `pbqPage` and `courseUrls` alongside the existing exports.

(f) `site.css` (the static site's stylesheet, wherever `.quiz-page` is styled): add `.pbq .scenario { margin: 8px 0 12px; } .pbq-log { background: #0e1a14; color: #d8ffe6; padding: 12px 14px; border-radius: 8px; overflow-x: auto; font-size: 0.9rem; } .pbq-tasks { padding-left: 20px; display: grid; gap: 14px; } .pbq-task .stem { font-weight: 600; }`.

- [ ] **Step 3: Implement the self-test checks** in `tests/selftest.js` per Step 1.

- [ ] **Step 4: Run**

```bash
node tests/site.js 2>&1 | tail -2 && node tests/selftest.js 2>&1 | grep -i "pbq\|FAIL" | head && npm test 2>&1 | tail -3 && node site/build-site.js && git status --short dist | head
```
Expected: all pass; `dist/site/sitemap.xml` unchanged for the live courses (none has PBQs yet); no `dist/site/<id>/pbq/` written for live courses.

- [ ] **Step 5: Commit**

```bash
git add site/build-site.js site/site.css tests/site.js tests/selftest.js
git commit -m "feat(pbq): static /<id>/pbq/ page with the seo PBQs, the landing section, the practice link, sitemap entries, and self-test validation of FRA.pbqs"
```
(If `site.css` lives elsewhere, add that path instead; `tests/site.js` names it.)

---

### Task 7: Close out

**Files:**
- Modify: `README.md`, this plan's Status section

- [ ] **Step 1: README**

In the README's course-authoring notes, add a short "PBQs" paragraph: a pack may ship `courses/<id>/pbqs.js` filling `FRA.pbqs` (the shape from the spec in one sentence, the six kinds, `seo: true` on exactly three, `test.pbqInTest` and `seo.pbqPhrases` in the manifest), the PBQs tab appears when any exist, the official-format test opens with `pbqInTest` of them, and the static page `/<id>/pbq/` is generated. In the "After a deploy that adds pages" section add the four PBQ pages to the request-indexing list.

- [ ] **Step 2: Full suite, build, local stage**

```bash
npm test 2>&1 | tail -3 && python build.py && node site/build-site.js && bash scripts/stage.sh --local 2>&1 | tail -2
```
Expected: suite green; bundles rebuilt (they now carry `FRAPbq`, no visible change); stage assembles with no `pbq/` folders yet.

- [ ] **Step 3: Record and commit**

Add a `## Status` section to this plan: the task commits, the test counts, and the note that no live course changes until Plan B ships `pbqs.js`.

```bash
git add README.md docs/superpowers/plans/2026-10-14-comptia-pbqs-engine.md dist
git commit -m "docs: PBQ authoring notes and Plan A status; rebuilt bundles carry the PBQ module"
```

---

## Self-review against the spec (done while writing)

- Spec 1 decisions: five kinds plus choice (Task 1), tab (Task 4), official-format test with `pbqInTest` (Task 5), static page and links (Task 6), phone-first tap and keyboard (Task 4 renderers and tests), ASCII.
- Spec 2 data model and grading: Task 1 implements the shapes and rules verbatim and tests each; `seo: true` exactly three per shipped course is enforced by the self-test (Task 6) with the mini fixture at one.
- Spec 2 tab, state, account: Tasks 3 and 4 (`S.pbqs` with `best, done, at, tasks`, merge by `at`, hash strip, summary and account count, Home stat).
- Spec 2 test integration: Task 5 (first items, one-for-one replacement by domain, task as question, results, strength and retraining through the pseudo-question path, no PBQs in practice, starter, or custom tests).
- Spec 2 engine changes: `engine/pbq.js` and its registrations (Tasks 1 and 2), `app.js`, `merge.js`, `sync.js`, `summary.js`, `strength.js` needs no change because review items resolve by `q.t` (verified in the map at `engine/strength.js:62`), `styles.css`.
- Spec 3 SEO: Task 6 (title, H1, phrases from `seo.pbqPhrases`, the seo PBQs rendered static, FAQ and Quiz data, app link, landing section, practice link, sitemap). The catalog card links are deferred to Plan B so the catalog never links a page that does not exist yet; recorded here as a deviation from spec 6 item 2.
- Spec 5 tests: `tests/pbq.js` (grading, rendering, three input methods), `tests/engine.js` (tab, view, test integration), `tests/merge.js`, `tests/sync.js`, `tests/summary.js`, `tests/account.js`, `tests/selftest.js`, `tests/site.js`, `tests/loaders.js`, the mini fixture.
- Spec 6 delivery: branch `pbq-engine` off `main` after the CRES and CHTM merges; mergeable with no visible change.
- Type consistency: `FRAPbq.render(container, pbq, ui, helpers)` and `collect(container, pbq, ui)` are named the same in Tasks 1, 4, 5, and 6; the review item shape `{ q: pseudoQ, choice, pick, conf, correct, pbq, task, score }` is the same in Task 5's implementation and tests; `S.pbqs[id]` fields match Task 3's accessor, Task 4's `checkPbq`, and `engine/summary.js`.

## Status

(filled in by Task 7)
