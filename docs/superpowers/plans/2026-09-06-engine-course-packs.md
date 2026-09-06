# Engine and Course Packs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split NetPlus Academy into a course-agnostic engine plus a `courses/netplus` pack, so Security+, CBET, and A+ packs can be added with no engine edits, with free/paid gating built in but switched off and a FieldReady Academy catalog page at the root.

**Architecture:** `engine/app.js` reads everything course-specific from `FRA.course` (declared by `courses/<id>/course.js`) instead of constants; domain loops iterate `course.domains`; storage is keyed per course with a one-time migration from the old Net+ key. Each course gets a folder page (`netplus/index.html`) that loads the engine plus its pack; `build.py` emits one standalone file per course; the root `index.html` becomes the catalog. A jsdom harness in `tests/` runs the app's built-in self-test against every pack and a tiny fixture course with three domains.

**Tech Stack:** Vanilla JS (IIFE, no bundler), Python 3 build script, Node 22 + jsdom 24 for tests. No new runtime dependencies.

## Global Constraints

- Brand: **FieldReady Academy** (domain fieldreadyacademy.com). The Network+ course keeps its name **NetPlus Academy** and badge **N+**.
- All course content stays original; no source references. This plan moves content, it does not edit it.
- Existing Net+ users must keep their progress: old key `npa.state.v2` migrates to `fra.netplus.state.v3` automatically.
- Gating rules (per course): cheat sheet, starter test, and the first 10 lessons free; all other lessons, the full test, retraining, practice tests, and drills paid. Launch is fully free, so `freeCourse: true` in the Net+ pack.
- Engine namespace is `FRA` (was `NPA`). Data files begin with `window.FRA = window.FRA || {};`.
- Every task ends with the self-test passing for `netplus` and the `mini` fixture, and a commit.
- The repo is `E:\CERT GUIDES\COMPTIA NET+\NetPlus Academy` (GitHub Pages serves the repo root). Do not push; Blake pushes.

---

### Task 1: Repo test harness

**Files:**
- Create: `package.json`
- Create: `tests/lib.js`
- Create: `tests/selftest.js`
- Modify: `.gitignore` (create it; ignore `node_modules/`)

**Interfaces:**
- Produces: `tests/lib.js` exporting `boot({ courseDir, engineDir, hash, url, beforeApp })` which returns a jsdom `window` with the app loaded, and `courseFiles(courseDir)` returning the sorted list of pack files. Later tasks use `boot` in their harnesses.
- Produces: `npm test` running `node tests/selftest.js` for every course folder.

- [ ] **Step 1: Write `package.json` and `.gitignore`**

```json
{
  "name": "fieldready-academy",
  "version": "1.0.0",
  "private": true,
  "description": "FieldReady Academy course engine and course packs",
  "scripts": {
    "test": "node tests/selftest.js && node tests/gating.js",
    "build": "python build.py"
  },
  "devDependencies": {
    "jsdom": "^24.1.3"
  }
}
```

`.gitignore`:

```
node_modules/
```

- [ ] **Step 2: Write `tests/lib.js`**

```js
// Shared jsdom boot for FieldReady Academy tests. Loads a course pack folder plus the engine into a window.
const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function courseFiles(courseDir) {
  // course.js first so FRA.course exists before anything reads it; the rest alphabetical (order does not matter for data).
  const all = fs.readdirSync(courseDir).filter(f => f.endsWith('.js')).sort();
  return [...all.filter(f => f === 'course.js'), ...all.filter(f => f !== 'course.js')].map(f => path.join(courseDir, f));
}

function boot(opts) {
  const o = Object.assign({ engineDir: path.join(ROOT, 'engine'), hash: '', url: 'http://localhost/', beforeApp: null }, opts);
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => { if (!/not implemented|localStorage|SecurityError/.test(String(e))) console.error('JSDOM ERR', e.message); });
  const dom = new JSDOM('<!doctype html><html><head><title>x</title></head><body><div id="app"></div></body></html>',
    { url: o.url + o.hash, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.confirm = () => true; w.scrollTo = () => {}; w.print = () => { w.printed = (w.printed || 0) + 1; };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  for (const f of courseFiles(o.courseDir)) w.eval(fs.readFileSync(f, 'utf8'));
  if (o.beforeApp) o.beforeApp(w);
  w.eval(fs.readFileSync(path.join(o.engineDir, 'app.js'), 'utf8'));
  w.$ = s => w.document.querySelector(s);
  w.$$ = s => [...w.document.querySelectorAll(s)];
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  w.text = () => w.document.body.textContent;
  return w;
}

function courseDirs() {
  const dir = path.join(ROOT, 'courses');
  return fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, 'course.js'))).map(d => path.join(dir, d));
}

module.exports = { boot, courseFiles, courseDirs, ROOT };
```

- [ ] **Step 3: Write `tests/selftest.js`**

```js
// Runs the engine's built-in #selftest (file: URL) against every course pack and the mini fixture.
const path = require('path'); const fs = require('fs');
const { boot, courseDirs, ROOT } = require('./lib');
const dirs = [...courseDirs(), path.join(ROOT, 'tests', 'fixtures', 'mini')].filter(d => fs.existsSync(d));
let failed = 0;
for (const dir of dirs) {
  const w = boot({ courseDir: dir, url: 'file:///x/index.html', hash: '#selftest' });
  const out = w.document.querySelector('#selftest');
  const txt = out ? out.textContent : 'NO SELFTEST OUTPUT';
  const ok = /^OK/.test(txt);
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${path.basename(dir)}\n${txt.split('\n').map(l => '   ' + l).join('\n')}`);
  if (!ok) failed++;
}
if (failed) { console.error(`${failed} course(s) failed`); process.exit(1); }
console.log('selftest: all courses OK');
```

- [ ] **Step 4: Install jsdom and run the harness to verify it fails (no `courses/` folder yet)**

Run: `cd "E:\CERT GUIDES\COMPTIA NET+\NetPlus Academy" && npm install --no-audit --no-fund && node tests/selftest.js`
Expected: an error that `courses` does not exist (ENOENT). That proves the harness looks in the new layout; Task 2 creates it.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore tests/lib.js tests/selftest.js
git commit -m "Add jsdom test harness that runs the built-in self-test per course pack"
```

---

### Task 2: Move files into `engine/` and `courses/netplus/`, rename the namespace

**Files:**
- Move: `app.js` → `engine/app.js`; `styles.css` → `engine/styles.css`
- Move: `data/curriculum-*.js`, `data/questions-*.js`, `data/generators.js`, `data/cheatsheet.js`, `data/deep-*.js` → `courses/netplus/`
- Create: `courses/netplus/course.js`
- Create: `netplus/index.html`
- Modify: `index.html` (temporarily loads the app from the new paths; Task 5 turns it into the catalog)
- Modify: `build.py` (paths only; per-course output comes in Task 5)

**Interfaces:**
- Produces: `FRA.course` (the object below). Task 3 reads every field. Field names are final.
- Produces: data namespace `FRA.units`, `FRA.questions`, `FRA.generators`, `FRA.generate`, `FRA.cheatsheet`, `FRA.deep`.

- [ ] **Step 1: Move files with git so history follows**

```bash
cd "E:\CERT GUIDES\COMPTIA NET+\NetPlus Academy"
mkdir engine courses\netplus netplus
git mv app.js engine/app.js
git mv styles.css engine/styles.css
git mv data/curriculum-1.js courses/netplus/curriculum-1.js
git mv data/curriculum-2.js courses/netplus/curriculum-2.js
git mv data/curriculum-3.js courses/netplus/curriculum-3.js
git mv data/questions-1.js courses/netplus/questions-1.js
git mv data/questions-2.js courses/netplus/questions-2.js
git mv data/questions-3.js courses/netplus/questions-3.js
git mv data/questions-4.js courses/netplus/questions-4.js
git mv data/questions-5.js courses/netplus/questions-5.js
git mv data/questions-6.js courses/netplus/questions-6.js
git mv data/questions-7.js courses/netplus/questions-7.js
git mv data/generators.js courses/netplus/generators.js
git mv data/cheatsheet.js courses/netplus/cheatsheet.js
git mv data/deep-1.js courses/netplus/deep-1.js
git mv data/deep-2.js courses/netplus/deep-2.js
git mv data/deep-3.js courses/netplus/deep-3.js
```

- [ ] **Step 2: Rename the namespace `NPA` to `FRA` in every moved file**

Run this Python from the repo root:

```python
import io, glob, re
files = glob.glob("courses/netplus/*.js") + ["engine/app.js"]
for p in files:
    s = io.open(p, encoding="utf-8").read()
    s2 = re.sub(r"\bNPA\b", "FRA", s)          # identifiers only; leaves 'npa.state.v2' alone
    io.open(p, "w", encoding="utf-8", newline="\n").write(s2)
    print(p, s.count("NPA"), "->", s2.count("NPA"))
```

Expected: every file ends at 0 remaining `NPA` except `engine/app.js`, which keeps exactly one: the lowercase storage key `'npa.state.v2'` is untouched (the regex is case sensitive), so its count is 0 too. If any file still shows a nonzero count, inspect it.

- [ ] **Step 3: Create `courses/netplus/course.js`**

```js
// NetPlus Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "netplus",
  name: "NetPlus Academy",
  short: "N+",
  brand: "FieldReady Academy",
  catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA Network+", code: "N10-009" },
  description: "Self-paced CompTIA Network+ N10-009 course with adaptive training and practice exams.",
  // Domains in exam order. id is what lessons reference in their `domain` field. quota is the count on the full test.
  domains: [
    { id: 1, name: "Networking Concepts", short: "Concepts", pct: 23, quota: 12 },
    { id: 2, name: "Network Implementation", short: "Implementation", pct: 20, quota: 10 },
    { id: 3, name: "Network Operations", short: "Operations", pct: 19, quota: 9 },
    { id: 4, name: "Network Security", short: "Security", pct: 14, quota: 7 },
    { id: 5, name: "Network Troubleshooting", short: "Troubleshooting", pct: 24, quota: 12 }
  ],
  test: { questions: 50, minutes: 50, passPct: 85, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  // Lessons the starter test samples from, per domain (starterPerDomain different lessons each time).
  starterPool: {
    1: ["u2l1", "u2l2", "u4l3", "u5l2", "u3l3", "u7l4", "u4l5", "u1l3"],
    2: ["u6l2", "u6l3", "u7l2", "u6l6", "u7l3", "u6l4", "u6l5"],
    3: ["u5l3", "u5l4", "u8l3", "u8l5", "u8l6", "u8l2"],
    4: ["u8l7", "u8l8", "u8l9"],
    5: ["u9l1", "u9l3", "u9l5", "u9l2", "u9l4"]
  },
  // Core lessons added when a domain shows a gap on the starter test.
  core: {
    1: ["u2l1", "u2l2", "u3l1", "u3l3", "u4l2", "u4l3", "u5l1", "u5l2", "u7l4"],
    2: ["u6l2", "u6l3", "u6l5", "u6l6", "u7l2", "u7l3"],
    3: ["u5l3", "u5l4", "u8l3", "u8l5", "u8l6"],
    4: ["u8l7", "u8l8", "u8l9"],
    5: ["u9l1", "u9l3", "u9l5"]
  },
  // Access. freeCourse true means everything is open (launch mode). free.lessons is the count of free lessons in course order.
  freeCourse: true,
  free: { lessons: 10 },
  upgradeUrl: "",
  realExamNote: "The real exam passes at 720 of 900, about 72%.",
  examDay: [
    "Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.",
    "Read for the qualifier: MOST likely, BEST, FIRST, NEXT. The methodology questions are about order.",
    "Subnet with block sizes on the scratch board. 256 minus the mask octet, then count.",
    "Eliminate two options, then decide. Never leave a question blank.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Subnetting, ports, OSI, route-selection, and PoE items are generated fresh every time.",
  legacyStoreKeys: ["npa.state.v2"]
};
```

- [ ] **Step 4: Create `netplus/index.html` and repoint the root page**

`netplus/index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NetPlus Academy</title>
  <meta name="description" content="Self-paced CompTIA Network+ N10-009 course with adaptive training and practice exams.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../engine/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="../courses/netplus/course.js"></script>
  <script src="../courses/netplus/curriculum-1.js"></script>
  <script src="../courses/netplus/curriculum-2.js"></script>
  <script src="../courses/netplus/curriculum-3.js"></script>
  <script src="../courses/netplus/questions-1.js"></script>
  <script src="../courses/netplus/questions-2.js"></script>
  <script src="../courses/netplus/questions-3.js"></script>
  <script src="../courses/netplus/questions-4.js"></script>
  <script src="../courses/netplus/questions-5.js"></script>
  <script src="../courses/netplus/questions-6.js"></script>
  <script src="../courses/netplus/questions-7.js"></script>
  <script src="../courses/netplus/cheatsheet.js"></script>
  <script src="../courses/netplus/deep-1.js"></script>
  <script src="../courses/netplus/deep-2.js"></script>
  <script src="../courses/netplus/deep-3.js"></script>
  <script src="../courses/netplus/generators.js"></script>
  <script src="../engine/app.js"></script>
</body>
</html>
```

Root `index.html` for now: the same file with every `../` removed from the paths (`engine/styles.css`, `courses/netplus/...`, `engine/app.js`). Task 5 replaces it with the catalog.

- [ ] **Step 5: Point `build.py` at the new paths (single course still)**

Replace the top of `build.py` down to the `read` helper with:

```python
"""Bundle FieldReady Academy courses into single-file builds.

dist/<course>.html           - complete standalone page per course (open locally or host anywhere)
dist/<course>-artifact.html  - body-only fragment for publishing as a Claude artifact
"""
import os, re, json, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.join(ROOT, "engine")
COURSES = os.path.join(ROOT, "courses")
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">'

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def course_files(course_dir):
    names = sorted(n for n in os.listdir(course_dir) if n.endswith(".js"))
    return [os.path.join(course_dir, n) for n in ["course.js"] + [n for n in names if n != "course.js"]]
```

and replace `css = read("styles.css")` with `css = read(os.path.join(ENGINE, "styles.css"))`, and the `scripts = ...` line with:

```python
course_id = "netplus"
scripts = "\n".join(read(p) for p in course_files(os.path.join(COURSES, course_id))) + "\n" + read(os.path.join(ENGINE, "app.js"))
```

Leave the output filenames as they are for this task (`netplus-academy.html`, `artifact.html`); Task 5 renames them.

- [ ] **Step 6: Run the self-test harness and the build**

Run: `node tests/selftest.js`
Expected: `[PASS] netplus` followed by the OK log, then `selftest: all courses OK` (the mini fixture does not exist yet, so only netplus runs).

Run: `python build.py`
Expected: `questions: 367 across 49 lessons; lessons defined: 49` and the two dist files written.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Split into engine/ and courses/netplus/, rename data namespace to FRA, add course manifest"
```

---

### Task 3: Engine reads the course manifest

**Files:**
- Modify: `engine/app.js` (constants block, data index block, storage, text, brand, self-test)
- Modify: `engine/styles.css` (nav link style)
- Create: `tests/fixtures/mini/course.js`, `tests/fixtures/mini/curriculum.js`, `tests/fixtures/mini/questions.js`, `tests/fixtures/mini/cheatsheet.js`, `tests/fixtures/mini/deep.js`

**Interfaces:**
- Consumes: `FRA.course` from Task 2.
- Produces: engine constants derived from the manifest: `DOMAINS` (map by id), `DOMAIN_IDS` (ordered array), `T` (the `test` object), `PASS_PCT`, `STREAK_NEEDED`, `EXAM_N`, `EXAM_MINUTES`, `STARTER_N`, `CHECKPOINT_N`, `CHECKPOINT_PASS`, `REBUILD_PTS`, `ALL_WORD`, `STORE_KEY`. Task 4 adds gating on top of these names.

- [ ] **Step 1: Write the mini fixture course (three domains, two units, six lessons)**

`tests/fixtures/mini/course.js`:

```js
window.FRA = window.FRA || {};
FRA.course = {
  id: "mini", name: "Mini Course", short: "MC", brand: "FieldReady Academy", catalogUrl: "../",
  exam: { vendor: "Test", title: "Mini Exam", code: "MC-1" }, description: "Fixture course for engine tests.",
  domains: [
    { id: 1, name: "Alpha", short: "Alpha", pct: 40, quota: 4 },
    { id: 2, name: "Beta", short: "Beta", pct: 30, quota: 3 },
    { id: 3, name: "Gamma", short: "Gamma", pct: 30, quota: 3 }
  ],
  test: { questions: 10, minutes: 10, passPct: 80, streakNeeded: 2, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: { 1: ["u1l1", "u1l2"], 2: ["u1l3", "u2l1"], 3: ["u2l2", "u2l3"] },
  core: { 1: ["u1l1"], 2: ["u1l3"], 3: ["u2l2"] },
  freeCourse: true, free: { lessons: 3 }, upgradeUrl: "",
  realExamNote: "The real exam passes at 70%.",
  examDay: ["Sleep.", "Read every option."],
  generatedNote: "",
  legacyStoreKeys: []
};
```

`tests/fixtures/mini/curriculum.js` (six lessons, two per domain, each with a body and hook):

```js
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];
const mkLesson = (id, title, domain) => ({ id, title, domain, obj: "1.1", minutes: 3, body: `Lesson ${title}.\n\n## Heading\n- point one\n- point two\n\n> Tip for ${title}.`, hook: `Remember ${title}.` });
FRA.units.push({ id: "u1", n: 1, title: "Unit One", domain: 1, blurb: "First unit.", assumes: "Nothing.", lessons: [mkLesson("u1l1", "A One", 1), mkLesson("u1l2", "A Two", 1), mkLesson("u1l3", "B One", 2)] });
FRA.units.push({ id: "u2", n: 2, title: "Unit Two", domain: 2, blurb: "Second unit.", assumes: "Unit one.", lessons: [mkLesson("u2l1", "B Two", 2), mkLesson("u2l2", "C One", 3), mkLesson("u2l3", "C Two", 3)] });
```

`tests/fixtures/mini/questions.js` (five questions per lesson, generated):

```js
window.FRA = window.FRA || {};
FRA.questions = FRA.questions || [];
for (const t of ["u1l1", "u1l2", "u1l3", "u2l1", "u2l2", "u2l3"]) {
  for (let i = 1; i <= 5; i++) {
    FRA.questions.push({ id: `${t}-${i}`, t, q: `Question ${i} for lesson ${t}: which option is correct?`, a: ["Wrong one", "Right answer", "Wrong two", "Wrong three"], c: 1, e: `Right answer is correct for ${t} question ${i} because the fixture says so.` });
  }
}
```

`tests/fixtures/mini/cheatsheet.js`:

```js
window.FRA = window.FRA || {};
FRA.cheatsheet = { title: "Mini Sheet", intro: "Fixture sheet.", sections: [{ id: "one", title: "Section One", blocks: [{ type: "table", cols: ["A", "B"], rows: [["1", "2"]] }, { type: "list", items: ["item"] }, { type: "note", text: "note" }] }] };
```

`tests/fixtures/mini/deep.js`:

```js
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
for (const id of ["u1l1", "u1l2", "u1l3", "u2l1", "u2l2", "u2l3"]) FRA.deep[id] = `## Deeper\nA longer explanation for ${id}.\n\n\`\`\`\ndiagram\n\`\`\`\n\n1. step one\n2. step two`;
```

- [ ] **Step 2: Run the harness to verify the fixture fails against the current engine**

Run: `node tests/selftest.js`
Expected: `[FAIL] mini` because the engine still assumes five domains (`lessonsByDomain[l.domain]` is fine but `DOMAINS[4]` and the `[1, 2, 3, 4, 5]` loops produce undefined reads, and the starter builds ten questions from lessons that do not exist). The exact error will be a `TypeError` inside the self-test.

- [ ] **Step 3: Apply the engine patch**

Save as `tests/patches/task3.py` and run it from the repo root (`python tests/patches/task3.py`). It fails loudly if any anchor is missing.

```python
"""Task 3: engine reads FRA.course instead of hard-coded Net+ constants."""
import io, re, sys
P = "engine/app.js"
src = io.open(P, encoding="utf-8").read()

def rep(old, new, count=1):
    global src
    n = src.count(old)
    if n != count:
        print(f"FAIL expected {count} found {n}:\n{old[:150]}"); sys.exit(1)
    src = src.replace(old, new)

def span(start, end, new):
    """Replace everything from the start marker (inclusive) to the end marker (exclusive)."""
    global src
    a = src.index(start); b = src.index(end, a)
    src = src[:a] + new + src[b:]

rep("/* NetPlus Academy application.", "/* FieldReady Academy course engine. Reads FRA.course (a course pack manifest) and the pack's data.")

span("  // ---------- constants ----------\n", "  // ---------- data index ----------\n", """  // ---------- course manifest ----------
  const course = FRA.course;
  if (!course || !Array.isArray(course.domains) || !course.test) throw new Error('FRA.course manifest missing or incomplete');
  const DOMAINS = {}; course.domains.forEach(d => { DOMAINS[d.id] = d; });
  const DOMAIN_IDS = course.domains.map(d => d.id);
  const T = course.test;
  const PASS_PCT = T.passPct, STREAK_NEEDED = T.streakNeeded, EXAM_N = T.questions, EXAM_MINUTES = T.minutes;
  const STARTER_N = DOMAIN_IDS.length * T.starterPerDomain, CHECKPOINT_N = T.checkpointN, CHECKPOINT_PASS = T.checkpointPass;
  const REBUILD_PTS = 3 * T.starterPerDomain; // every starter question in the domain wrong
  const ALL_WORD = T.starterPerDomain === 2 ? 'both' : 'all';
  const CONF = [[1, 'Guess'], [2, 'Unsure'], [3, 'Fairly sure'], [4, 'Sure'], [5, 'Certain']];
  const STORE_KEY = `fra.${course.id}.state.v3`;
  // Feedback delivery. Feedback is always saved in the browser and exportable from the Feedback tab.
  // Optionally set an endpoint that accepts POSTed JSON (Formspree, a Cloudflare Worker, your own API)
  // and/or an email address for the Email button. Both are empty by default.
  const FEEDBACK_ENDPOINT = course.feedbackEndpoint || '';
  const FEEDBACK_EMAIL = course.feedbackEmail || '';
  const FB_CATS = {
    question: ['Answer key is wrong', 'Question is unclear or ambiguous', 'Explanation is wrong or unclear', 'Too easy or off-topic', 'Typo', 'Other'],
    lesson: ['Content is inaccurate', 'Unclear or confusing', 'Missing something the exam covers', 'Too long or too short', 'Typo', 'Other'],
    overall: ['Content accuracy', 'Difficulty', 'Website bug', 'Design or usability', 'Idea or request', 'Other']
  };
  const WHERE_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test', checkpoint: 'Lesson checkpoint', train: 'Drills', 'starter-results': 'Starter test results', 'full-results': `${EXAM_N}-question test results`, 'practice-results': 'Practice test results', callout: 'Lesson callout' };
  const STARTER_POOL = course.starterPool || {};
  const CORE = course.core || {};

""")

span("  // ---------- data index ----------\n", "  // ---------- utilities ----------\n", """  // ---------- data index ----------
  const units = (FRA.units || []).slice().sort((a, b) => a.n - b.n);
  const lessons = []; const L = {};
  units.forEach(u => u.lessons.forEach(l => { l.unit = u; l.index = lessons.length; lessons.push(l); L[l.id] = l; }));
  const bank = FRA.questions || []; const Q = {}; bank.forEach(q => { Q[q.id] = q; });
  const byLesson = {}; bank.forEach(q => { (byLesson[q.t] = byLesson[q.t] || []).push(q); });
  const lessonsByDomain = {}; DOMAIN_IDS.forEach(d => { lessonsByDomain[d] = []; });
  lessons.forEach(l => { if (!lessonsByDomain[l.domain]) throw new Error(`lesson ${l.id} uses unknown domain ${l.domain}`); lessonsByDomain[l.domain].push(l); });
  const gens = FRA.generators || {};
  document.title = course.name;

""")

# Storage: v3 per course, migrate legacy keys
rep("return { v: 2, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, plan: null, active: null, settings: { timer: true }, feedback: [], seen: {}, created: Date.now() };",
    "return { v: 3, course: course.id, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, plan: null, active: null, settings: { timer: true }, feedback: [], seen: {}, created: Date.now() };")
rep("""  function load() {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = JSON.parse(raw); if (s && s.v === 2) return Object.assign(fresh(), s); } } catch (e) { /* storage unavailable */ }
    return fresh();
  }""",
"""  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) { const s = JSON.parse(raw); if (s && s.v === 3) return Object.assign(fresh(), s); }
      for (const key of (course.legacyStoreKeys || [])) {
        const old = localStorage.getItem(key);
        if (old) { const s = JSON.parse(old); if (s && s.v === 2) { const m = Object.assign(fresh(), s, { v: 3, course: course.id }); return m; } }
      }
    } catch (e) { /* storage unavailable */ }
    return fresh();
  }""")
rep("case 'import': { try { const obj = JSON.parse($('#io').value); if (!obj || obj.v !== 2) throw new Error('bad'); S = Object.assign(fresh(), obj); S.active = null;",
    "case 'import': { try { const obj = JSON.parse($('#io').value); if (!obj || (obj.v !== 2 && obj.v !== 3)) throw new Error('bad'); S = Object.assign(fresh(), obj, { v: 3, course: course.id }); S.active = null;")

# Domain loops and literals
rep("[1, 2, 3, 4, 5]", "DOMAIN_IDS", count=8)
rep("const entries = {}; const domPts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; const domCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };",
    "const entries = {}; const domPts = {}; const domCount = {}; DOMAIN_IDS.forEach(d => { domPts[d] = 0; domCount[d] = 0; });")
rep("if (domPts[d] >= 6) { depth[d] = 'rebuild';", "if (domPts[d] >= REBUILD_PTS) { depth[d] = 'rebuild';")
rep("const picks = shuffle(STARTER_POOL[d]).slice(0, 2);", "const picks = shuffle(STARTER_POOL[d] || lessonsByDomain[d].map(l => l.id)).slice(0, T.starterPerDomain);")
rep("let score = 0; const byDomain = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 }, 5: { c: 0, t: 0 } };",
    "let score = 0; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });")

# Wording that assumed two starter questions, five domains, nine units, fifty questions
rep("if (r.kind === 'domain') return r.level === 'rebuild' ? `${DOMAINS[r.d].short}: both starter questions missed` : `${DOMAINS[r.d].short}: gap on the starter test`;",
    "if (r.kind === 'domain') return r.level === 'rebuild' ? `${DOMAINS[r.d].short}: ${ALL_WORD} starter questions missed` : `${DOMAINS[r.d].short}: gap on the starter test`;")
rep("function lessonWhy(r) { const d = DOMAINS[r.d].short; return r.level === 'rebuild' ? `In your tutorial because you missed both ${d} questions on the starter test.`",
    "function lessonWhy(r) { const d = DOMAINS[r.d].short; return r.level === 'rebuild' ? `In your tutorial because you missed ${ALL_WORD} ${d} questions on the starter test.`")
rep("<p class=\\"ink2\\" style=\\"font-size:.95rem\\">Missed both questions in a domain: you get every lesson in that domain. Missed one, or guessed: you get that domain's core lessons plus the exact topic. Confident and correct on both: nothing from that domain.</p>",
    "<p class=\\"ink2\\" style=\\"font-size:.95rem\\">Missed ${ALL_WORD} questions in a domain: you get every lesson in that domain. Missed one, or guessed: you get that domain's core lessons plus the exact topic. Confident and correct on ${ALL_WORD}: nothing from that domain.</p>")
rep("<div class=\\"eyebrow\\">NetPlus Academy</div>\\n        <h1>Ten questions, then a course built for you.</h1>\\n        <p class=\\"ink2\\" style=\\"font-size:1.1rem\\">The starter test asks two questions from each of the five exam domains.",
    "<div class=\\"eyebrow\\">${esc(course.brand)} · ${esc(course.name)}</div>\\n        <h1>${STARTER_N} questions, then a course built for you.</h1>\\n        <p class=\\"ink2\\" style=\\"font-size:1.1rem\\">The starter test asks ${T.starterPerDomain} questions from each of the ${DOMAIN_IDS.length} exam domains.")
rep("<h1>Nine units, ${lessons.length} lessons</h1>", "<h1>${plural(units.length, 'unit')}, ${plural(lessons.length, 'lesson')}</h1>")
rep("const STAGE_LABEL = { starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: '50-question test', retrain: 'Retraining', practice: 'Practice tests', ready: 'Ready' };",
    "const STAGE_LABEL = { starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: `${EXAM_N}-question test`, retrain: 'Retraining', practice: 'Practice tests', ready: 'Ready' };")
rep("const TEST_LABEL = { starter: 'Starter test', full: '50-question test', practice: 'Practice test' };",
    "const TEST_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test' };")
rep("The starter test is ${STARTER_N} questions, two per domain.", "The starter test is ${STARTER_N} questions, ${T.starterPerDomain} per domain.")
rep("Unseen questions are chosen first, and subnetting, ports, OSI, and route-selection items are generated fresh every time.</p>",
    "Unseen questions are chosen first.${course.generatedNote ? ' ' + esc(course.generatedNote) : ''}</p>")
rep("`The real exam passes at 720 of 900, about 72%. This course holds you to ${PASS_PCT}% so the real thing has margin.`",
    "`${esc(course.realExamNote)} This course holds you to ${PASS_PCT}% so the real thing has margin.`")
rep("<p>The real exam passes at about 72%, so you have margin. Schedule it for the next week or two while the material is fresh, and do one drill session a day until then.</p>",
    "<p>${esc(course.realExamNote)} You have margin. Schedule it for the next week or two while the material is fresh, and do one drill session a day until then.</p>")
rep("""        <li>Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.</li>
        <li>Read for the qualifier: MOST likely, BEST, FIRST, NEXT. The methodology questions are about order.</li>
        <li>Subnet with block sizes on the scratch board. 256 minus the mask octet, then count.</li>
        <li>Eliminate two options, then decide. Never leave a question blank.</li>
        <li>Two forms of ID, arrive early, sleep the night before.</li>
""", "        ${(course.examDay || []).map(t => `<li>${inline(t)}</li>`).join('')}\n")

# Brand and catalog link
rep("<button class=\\"brand\\" data-act=\\"go\\" data-arg=\\"home\\"><span class=\\"mark\\">N+</span> NetPlus Academy</button>",
    "<button class=\\"brand\\" data-act=\\"go\\" data-arg=\\"home\\"><span class=\\"mark\\">${esc(course.short)}</span> ${esc(course.name)}</button>")
rep("${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Cheat sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}\\n          </nav>",
    "${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Cheat sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}${course.catalogUrl ? `<a href=\\"${esc(course.catalogUrl)}\\" title=\\"${esc(course.brand)}\\">All courses</a>` : ''}\\n          </nav>")

# Feedback naming
rep("body: JSON.stringify(Object.assign({ course: 'netplus-academy' }, f))", "body: JSON.stringify(Object.assign({ course: course.id }, f))")
rep("const lines = [`# NetPlus Academy feedback (", "const lines = [`# ${course.name} feedback (")
rep("a.download = 'netplus-academy-feedback.json';", "a.download = `${course.id}-feedback.json`;")
rep("subject=${encodeURIComponent('NetPlus Academy feedback')}", "subject=${encodeURIComponent(course.name + ' feedback')}")

# Self-test: no lesson ids, proportions from STARTER_N
rep("ex.answers[k] = k < 6 ? { choice: wrong, conf: 5 } : k < 8 ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 5 }; });",
    "ex.answers[k] = k < Math.round(STARTER_N * 0.6) ? { choice: wrong, conf: 5 } : k < Math.round(STARTER_N * 0.8) ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 5 }; });")
rep("saveFeedback({ kind: 'question', ref: { qid: 'u1l1-1', lesson: 'u1l1', stem: 'self-test stem',",
    "saveFeedback({ kind: 'question', ref: { qid: lessons[0].id + '-1', lesson: lessons[0].id, stem: 'self-test stem',")
rep("go('lesson', 'u4l1'); deepOpen = 'u4l1'; render();", "const deepId = lessons.find(l => FRA.deep && FRA.deep[l.id]).id; go('lesson', deepId); deepOpen = deepId; render();")
rep("log.push(`deep u4l1 rendered pre=${deepPre} ol=${deepOl}`);", "log.push(`deep ${deepId} rendered pre=${deepPre} ol=${deepOl}`);")

io.open(P, "w", encoding="utf-8", newline="\\n").write(src)
print("task3 patch applied")
```

Then add the nav link style to `engine/styles.css` right after the `.nav button[aria-current="page"]` rule:

```css
.nav a { display: inline-flex; align-items: center; padding: 8px 12px; border-radius: 8px; font-family: var(--font-display); font-weight: 500; font-size: 0.92rem; color: var(--muted); text-decoration: none; }
.nav a:hover { background: var(--surface-2); color: var(--ink); }
```

- [ ] **Step 4: Run the harness and the build**

Run: `node --check engine/app.js && node tests/selftest.js`
Expected: `[PASS] netplus` and `[PASS] mini`, then `selftest: all courses OK`. The mini log should show `starter` with a plan and `stage=tutorial`, and the deep line naming `u1l1`.

Run: `python build.py`
Expected: same counts as before, files written.

- [ ] **Step 5: Verify the Net+ migration by hand in the harness**

Run this one-off from the repo root:

```bash
node -e "
const { boot } = require('./tests/lib');
const w = boot({ courseDir: 'courses/netplus', beforeApp: w => w.localStorage.setItem('npa.state.v2', JSON.stringify({ v: 2, view: { name: 'home' }, lessons: { u1l1: { status: 'passed', best: 4, attempts: 1, passedAt: 1 } }, qstats: {}, topics: {}, exams: [{ date: 1, kind: 'starter', score: 7, total: 10, pct: 70, byDomain: {}, review: [], seconds: 60 }], passStreak: 0, plan: null, active: null, settings: { timer: true } })) });
const s = JSON.parse(w.localStorage.getItem('fra.netplus.state.v3') || 'null');
console.log('migrated:', !!s, 'v=', s && s.v, 'course=', s && s.course, 'lesson passed kept:', s && s.lessons.u1l1.status, 'exam kept:', s && s.exams.length, 'title:', w.document.title);
"
```

Expected: `migrated: true v= 3 course= netplus lesson passed kept: passed exam kept: 1 title: NetPlus Academy`. (The migrated state is saved under the new key on the first `save()`, which the render of the home page triggers through `go`/`viewLesson`; if `migrated` prints false, click Home in the harness before reading, or check that `load()` returned the merged object by printing `w.document.body.textContent.includes('70%')`.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Engine reads the course manifest: domains, test sizes, brand, wording, per-course storage with migration"
```

---

### Task 4: Access gating, built but off

**Files:**
- Modify: `engine/app.js`
- Modify: `engine/styles.css`
- Create: `tests/gating.js`

**Interfaces:**
- Consumes: `course.freeCourse`, `course.free.lessons` (number or array of ids), `course.upgradeUrl`, and `window.FRA_ENTITLED` (a boolean the future site sets after login and purchase).
- Produces: `entitled()`, `lessonLocked(id)`, `testsLocked(kind)`, `paywall(what)`; the `upgrade` click action.

- [ ] **Step 1: Write the failing gating test**

`tests/gating.js`:

```js
// Gating: with freeCourse off, only the free set is open; with it on, nothing is locked.
const path = require('path');
const { boot, ROOT } = require('./lib');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const dir = path.join(ROOT, 'courses', 'netplus');

// Locked course
let w = boot({ courseDir: dir, beforeApp: w => { w.FRA.course.freeCourse = false; } });
w.click(w.$('[data-act="go"][data-arg="home"]'));            // skip the cheat sheet intro to the welcome page
w.click(w.$('[data-act="go"][data-arg="course"]'));           // course list
w.click(w.$('[data-act="course"][data-arg="u3"]'));
w.click(w.$('[data-act="lesson"][data-arg="u3l4"]'));         // 10th lesson in course order
check('10th lesson opens when locked', /Copper|Wireless Media/.test(w.text()) && !!w.$('[data-act="start-checkpoint"]'));
w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));         // 11th lesson
check('11th lesson shows the paywall', !!w.$('.paywall') && !w.$('[data-act="start-checkpoint"]') && /first 10 lessons are free/.test(w.text()));
check('rail marks locked lessons', w.$$('.rail .lock').length === 39, w.$$('.rail .lock').length);
w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
check('starter test still runs when locked', !!w.$('[data-act="opt"]'));
w.click(w.$('[data-act="abandon-exam"]'));
check('tests hub shows unlock instead of the full test', !!w.$('[data-act="upgrade"]') && !w.$('[data-act="start-exam"][data-arg="full"]') && !w.$('[data-act="start-exam"][data-arg="practice"]'));
w.click(w.$('.nav [data-act="nav"][data-arg="train"]'));
check('drills page shows the paywall when locked', !!w.$('.paywall'));
w.click(w.$('[data-act="upgrade"]'));
check('upgrade without a URL shows a toast', /not for sale yet/.test(w.text()));

// Open course (launch mode)
w = boot({ courseDir: dir });
w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="go"][data-arg="course"]')); w.click(w.$('[data-act="course"][data-arg="u4"]')); w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));
check('freeCourse opens every lesson', !w.$('.paywall') && !!w.$('[data-act="start-checkpoint"]'));
check('no lock marks when free', w.$$('.rail .lock').length === 0);

// Entitled user on a locked course
w = boot({ courseDir: dir, beforeApp: w => { w.FRA.course.freeCourse = false; w.FRA_ENTITLED = true; } });
w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="go"][data-arg="course"]')); w.click(w.$('[data-act="course"][data-arg="u4"]')); w.click(w.$('[data-act="lesson"][data-arg="u4l1"]'));
check('FRA_ENTITLED unlocks everything', !w.$('.paywall') && !!w.$('[data-act="start-checkpoint"]'));

console.log(fails.length ? `\n${fails.length} FAILED: ${fails.join('; ')}` : '\nALL PASSED');
process.exit(fails.length ? 1 : 0);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node tests/gating.js`
Expected: `FAIL  11th lesson shows the paywall` and the other locked-mode checks fail (no `.paywall`, no `upgrade`), while the freeCourse checks pass.

- [ ] **Step 3: Apply the gating patch**

Save as `tests/patches/task4.py` and run `python tests/patches/task4.py`.

```python
"""Task 4: access gating built into the engine, off by default."""
import io, sys
P = "engine/app.js"
src = io.open(P, encoding="utf-8").read()
def rep(old, new, count=1):
    global src
    n = src.count(old)
    if n != count: print(f"FAIL expected {count} found {n}:\n{old[:150]}"); sys.exit(1)
    src = src.replace(old, new)

# Access helpers right after the data index
rep("  const gens = FRA.generators || {};\n  document.title = course.name;\n",
"""  const gens = FRA.generators || {};
  document.title = course.name;

  // ---------- access ----------
  // Free set: the cheat sheet, the starter test, and the lessons below. Everything else needs entitlement.
  const FREE_SET = new Set();
  (function () { const f = course.free || {}; if (Array.isArray(f.lessons)) f.lessons.forEach(id => FREE_SET.add(id)); else if (typeof f.lessons === 'number') lessons.slice(0, f.lessons).forEach(l => FREE_SET.add(l.id)); })();
  const entitled = () => !!course.freeCourse || window.FRA_ENTITLED === true;
  const lessonLocked = id => !entitled() && !FREE_SET.has(id);
  const testsLocked = kind => !entitled() && kind !== 'starter';
  function paywall(what) {
    const btn = course.upgradeUrl ? `<a class="btn primary" href="${esc(course.upgradeUrl)}">Unlock the full course</a>` : `<button class="btn primary" data-act="upgrade">Unlock the full course</button>`;
    return `<div class="card lift stack paywall"><div class="eyebrow">Full course</div><h3>${esc(what)} is part of the full ${esc(course.name)} course.</h3><p class="ink2">The cheat sheet, the starter test, and the first ${FREE_SET.size} lessons are free. The full course adds every lesson, the ${EXAM_N}-question test, retraining, practice tests, and drills.</p><div class="row">${btn}<button class="btn ghost" data-act="go" data-arg="course">See the free lessons</button></div></div>`;
  }
""")

# Lesson view: locked lessons show the head and a paywall
rep("    const l = L[id]; if (!l) return viewCourse();\n    const ls = lstat(id); if (ls.status === 'new') { ls.status = 'read'; save(); }",
"""    const l = L[id]; if (!l) return viewCourse();
    if (lessonLocked(id)) return `<div class="content stack" style="gap:20px"><div class="lesson-head"><div class="row" style="gap:8px"><span class="pill accent">Unit ${l.unit.n}</span><span class="pill">${DOMAINS[l.domain].short}</span><span class="pill">Objective ${l.obj}</span></div><h1>${esc(l.title)}</h1></div>${paywall('This lesson')}</div>`;
    const ls = lstat(id); if (ls.status === 'new') { ls.status = 'read'; save(); }""")

# Rail and course list lock marks
rep("<span style=\"flex:1\">${esc(l.title)}</span>${rem.has(l.id) ? '<span class=\"inplan\" title=\"In your tutorial\"></span>' : ''}</button></li>",
    "<span style=\"flex:1\">${esc(l.title)}</span>${lessonLocked(l.id) ? '<span class=\"lock\" title=\"Full course\">&#9679;</span>' : rem.has(l.id) ? '<span class=\"inplan\" title=\"In your tutorial\"></span>' : ''}</button></li>")
rep("${planEntry(l.id) && !planDone(l.id) ? '<span class=\"pill accent\">in tutorial</span>' : ''}</button>`).join('')}</div>",
    "${lessonLocked(l.id) ? '<span class=\"pill\">Full course</span>' : planEntry(l.id) && !planDone(l.id) ? '<span class=\"pill accent\">in tutorial</span>' : ''}</button>`).join('')}</div>")

# Tests hub: unlock button instead of full/practice when locked; start-exam guard; next action
rep("${st !== 'starter' ? `<button class=\"btn ${st === 'fulltest' || st === 'practice' ? 'primary' : ''}\" data-act=\"start-exam\" data-arg=\"${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'practice' : 'full'}\">${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'Practice test' : `${EXAM_N}-question test`}</button>` : ''}</div></div>",
    "${st !== 'starter' ? (testsLocked('full') ? `<button class=\"btn primary\" data-act=\"upgrade\">Unlock the ${EXAM_N}-question test</button>` : `<button class=\"btn ${st === 'fulltest' || st === 'practice' ? 'primary' : ''}\" data-act=\"start-exam\" data-arg=\"${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'practice' : 'full'}\">${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'Practice test' : `${EXAM_N}-question test`}</button>`) : ''}</div></div>")
rep("        startExam(arg === 'starter' ? 'starter' : arg === 'full' ? 'full' : 'practice'); return;",
    "        if (testsLocked(arg === 'starter' ? 'starter' : 'full')) { toast('The full course is needed for this test.'); return go('exam'); }\n        startExam(arg === 'starter' ? 'starter' : arg === 'full' ? 'full' : 'practice'); return;")
rep("    if (st === 'fulltest') return { label: 'Take the 50-question test', act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };".replace("50-question", "${EXAM_N}-question").replace("'Take the ${EXAM_N}-question test'", "`Take the ${EXAM_N}-question test`") if False else "    if (st === 'fulltest') return { label: 'Take the 50-question test', act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };",
    "    if (st === 'fulltest') return testsLocked('full') ? { label: `Unlock the full course to take the ${EXAM_N}-question test`, act: 'upgrade', arg: '' } : { label: `Take the ${EXAM_N}-question test`, act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };")
rep("    return { label: 'Take a practice test', act: 'start-exam', arg: 'practice', sub: `Pass streak ${S.passStreak} of ${STREAK_NEEDED}. Score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row to be cleared.` };",
    "    if (testsLocked('practice')) return { label: 'Unlock the full course for practice tests', act: 'upgrade', arg: '' };\n    return { label: 'Take a practice test', act: 'start-exam', arg: 'practice', sub: `Pass streak ${S.passStreak} of ${STREAK_NEEDED}. Score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row to be cleared.` };")

# Drills locked entirely
rep("    const tr = S.active && S.active.kind === 'train' ? S.active : null;\n    if (!tr) {\n      const weak = weakTopics();",
    "    const tr = S.active && S.active.kind === 'train' ? S.active : null;\n    if (!entitled()) return `<div class=\"content stack\" style=\"gap:18px\"><div><div class=\"eyebrow\">Drills</div><h1>Extra practice on weak topics</h1></div>${paywall('Drilling')}</div>`;\n    if (!tr) {\n      const weak = weakTopics();")

# Upgrade action
rep("      case 'deep-toggle': {", "      case 'upgrade': { if (course.upgradeUrl) { location.href = course.upgradeUrl; return; } toast('The full course is not for sale yet. Everything is free for now.'); return; }\n      case 'deep-toggle': {")

io.open(P, "w", encoding="utf-8", newline="\n").write(src)
print("task4 patch applied")
```

Note on the `nextAction` replacement above: the `old` string is the plain line `    if (st === 'fulltest') return { label: 'Take the 50-question test', act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };` exactly as it exists after Task 3 (Task 3 does not touch that line). The odd-looking conditional expression in the script resolves to that same string; simplify it to the literal if you prefer.

Then add to `engine/styles.css` after the `.lesson-link .inplan` rule:

```css
.lesson-link .lock { color: var(--muted); font-size: 0.55rem; flex: none; }
.paywall { border-left: 4px solid var(--warn); }
```

- [ ] **Step 4: Run the gating test and the self-test**

Run: `node --check engine/app.js && node tests/gating.js && node tests/selftest.js`
Expected: gating prints `ALL PASSED` (ten checks); selftest passes for both courses.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add free-set gating with paywall cards, switched off by freeCourse"
```

---

### Task 5: Per-course builds and the catalog page

**Files:**
- Modify: `build.py`
- Modify: `index.html` (becomes the catalog)
- Create: `catalog.css`
- Delete: `dist/netplus-academy.html`, `dist/artifact.html` (replaced by `dist/netplus.html`, `dist/netplus-artifact.html`)

**Interfaces:**
- Produces: `python build.py` (all courses) or `python build.py netplus` writes `dist/<id>.html` and `dist/<id>-artifact.html` for each course folder that has a `course.js`.

- [ ] **Step 1: Rewrite `build.py`**

```python
"""Bundle FieldReady Academy courses into single-file builds.

python build.py            builds every course under courses/
python build.py netplus    builds one course

dist/<course>.html           - complete standalone page (open locally or host anywhere)
dist/<course>-artifact.html  - body-only fragment for publishing as a Claude artifact
"""
import os, re, sys, json

ROOT = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.join(ROOT, "engine")
COURSES = os.path.join(ROOT, "courses")
DIST = os.path.join(ROOT, "dist")
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">'

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def course_files(course_dir):
    names = sorted(n for n in os.listdir(course_dir) if n.endswith(".js"))
    return [os.path.join(course_dir, n) for n in ["course.js"] + [n for n in names if n != "course.js"]]

def manifest(course_dir):
    """Pull id, name, and description out of course.js without a JS engine."""
    src = read(os.path.join(course_dir, "course.js"))
    get = lambda key: (re.search(rf'^\s*{key}:\s*"((?:[^"\\]|\\.)*)"', src, re.M) or [None, ""])[1]
    return {"id": get("id"), "name": get("name"), "description": get("description")}

def build(course_id):
    course_dir = os.path.join(COURSES, course_id)
    m = manifest(course_dir)
    css = read(os.path.join(ENGINE, "styles.css"))
    scripts = "\n".join(read(p) for p in course_files(course_dir)) + "\n" + read(os.path.join(ENGINE, "app.js"))
    scripts = scripts.replace("</script", "<\\/script")
    body = f"""<title>{m['name']}</title>
{FONTS}
<style>
{css}
</style>
<div id="app"></div>
<script>
{scripts}
</script>
"""
    standalone = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{m['description']}">
<title>{m['name']}</title>
{FONTS}
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
<script>
{scripts}
</script>
</body>
</html>
"""
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, f"{course_id}.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(standalone)
    with open(os.path.join(DIST, f"{course_id}-artifact.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(body)
    ids = re.findall(r'\{id:"(u\d+l\d+)-\d+",t:"(u\d+l\d+)"', scripts)
    counts = {}
    for _, t in ids:
        counts[t] = counts.get(t, 0) + 1
    lessons = re.findall(r'id: "(u\d+l\d+)", title: "([^"]+)"', scripts)
    print(f"[{course_id}] questions: {len(ids)} across {len(counts)} lessons; lessons defined: {len(lessons)}")
    missing = [l for l, _ in lessons if l not in counts]
    low = [(l, counts.get(l, 0)) for l, _ in lessons if 0 < counts.get(l, 0) < 5]
    if missing: print("  lessons with NO questions:", missing)
    if low: print("  lessons with fewer than 5 questions:", low)
    print(f"  wrote dist/{course_id}.html {len(standalone)} bytes; dist/{course_id}-artifact.html {len(body)} bytes")

if __name__ == "__main__":
    wanted = sys.argv[1:] or sorted(d for d in os.listdir(COURSES) if os.path.exists(os.path.join(COURSES, d, "course.js")))
    for cid in wanted:
        build(cid)
```

- [ ] **Step 2: Replace the root `index.html` with the catalog**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FieldReady Academy</title>
  <meta name="description" content="Free, self-paced certification courses that test you first and teach you what you missed. CompTIA Network+ now; Security+, CBET, and A+ next.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&display=swap">
  <link rel="stylesheet" href="catalog.css">
</head>
<body>
  <header class="hero">
    <div class="wrap">
      <div class="brand"><span class="mark">FR</span> FieldReady Academy</div>
      <h1>Test first. Then learn exactly what you missed.</h1>
      <p>Each course starts with a printable memorization sheet and a short starter test, builds a tutorial from your gaps, and keeps testing you until you pass three practice exams in a row. Everything is free while we launch.</p>
    </div>
  </header>
  <main class="wrap">
    <h2>Courses</h2>
    <div class="cards">
      <a class="card" href="netplus/">
        <div class="pill">Free</div>
        <h3>NetPlus Academy</h3>
        <p>CompTIA Network+ N10-009. 49 lessons, a 14-page cheat sheet, adaptive tutorials, and unlimited practice tests.</p>
        <span class="go">Start the course</span>
      </a>
      <div class="card soon">
        <div class="pill">Coming next</div>
        <h3>Security+ (SY0-701)</h3>
        <p>Same format, built for the current Security+ objectives.</p>
      </div>
      <div class="card soon">
        <div class="pill">Coming next</div>
        <h3>CBET</h3>
        <p>Certified Biomedical Equipment Technician exam prep.</p>
      </div>
      <div class="card soon">
        <div class="pill">Coming next</div>
        <h3>A+ Core 1 and Core 2</h3>
        <p>CompTIA A+ 220-1201 and 220-1202, one course per exam.</p>
      </div>
    </div>
    <h2>How every course works</h2>
    <ol class="steps">
      <li><strong>Cheat sheet.</strong> Everything the exam expects you to recall cold, printable.</li>
      <li><strong>Starter test.</strong> A few questions per exam domain, with a confidence rating on each.</li>
      <li><strong>Your tutorial.</strong> Lessons chosen from what you missed or guessed, each with a checkpoint and a deeper explanation.</li>
      <li><strong>Full-length test.</strong> Weighted like the real exam, every miss explained.</li>
      <li><strong>Retraining and practice tests</strong> until you pass three in a row. Then book the exam.</li>
    </ol>
  </main>
  <footer class="wrap muted">FieldReady Academy. All course content is original. Progress is saved in your browser.</footer>
</body>
</html>
```

`catalog.css`:

```css
:root { --bg: #F3F5F8; --surface: #fff; --ink: #14212E; --ink-2: #4A5A6B; --muted: #7C8A99; --line: #D5DCE4; --accent: #C25E1F; --accent-soft: #F8E7DC; --good: #1E8E5A; --good-soft: #E1F3EA; color-scheme: light; }
@media (prefers-color-scheme: dark) { :root { --bg: #0F161E; --surface: #17212B; --ink: #E6ECF2; --ink-2: #A7B4C2; --muted: #7E8C9B; --line: #2C3947; --accent: #E08744; --accent-soft: #3A2418; --good: #3DBB7F; --good-soft: #16332A; color-scheme: dark; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: "Source Sans 3", "Segoe UI", system-ui, sans-serif; font-size: 17px; line-height: 1.55; }
h1, h2, h3 { font-family: "Archivo", "Segoe UI", system-ui, sans-serif; font-weight: 600; line-height: 1.2; margin: 0; }
.wrap { max-width: 960px; margin: 0 auto; padding: 0 20px; }
.hero { background: var(--surface); border-bottom: 1px solid var(--line); padding: 36px 0 40px; }
.hero h1 { font-size: 2.1rem; margin: 18px 0 12px; max-width: 720px; }
.hero p { color: var(--ink-2); font-size: 1.1rem; max-width: 720px; margin: 0; }
.brand { display: flex; align-items: center; gap: 10px; font-family: "Archivo", system-ui, sans-serif; font-weight: 700; font-size: 1.05rem; }
.mark { width: 28px; height: 28px; border-radius: 7px; background: var(--ink); color: var(--bg); display: grid; place-items: center; font-size: 0.8rem; }
main h2 { font-size: 1.3rem; margin: 32px 0 14px; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.card { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; color: inherit; text-decoration: none; }
a.card:hover { border-color: var(--accent); }
.card.soon { opacity: 0.75; }
.card p { color: var(--ink-2); margin: 0; font-size: 0.98rem; flex: 1; }
.pill { align-self: flex-start; padding: 3px 10px; border-radius: 999px; font-family: "Archivo", system-ui, sans-serif; font-size: 0.75rem; font-weight: 600; background: var(--good-soft); color: var(--good); }
.soon .pill { background: var(--accent-soft); color: var(--accent); }
.go { font-family: "Archivo", system-ui, sans-serif; font-weight: 600; color: var(--accent); }
.steps { padding-left: 22px; line-height: 1.7; color: var(--ink-2); }
footer { padding: 40px 20px 60px; font-size: 0.9rem; }
.muted { color: var(--muted); }
```

- [ ] **Step 3: Build and check the outputs**

Run: `git rm -q dist/netplus-academy.html dist/artifact.html && python build.py && ls dist`
Expected: `[netplus] questions: 367 across 49 lessons; lessons defined: 49`, then `dist` lists `netplus.html`, `netplus-artifact.html`, and `netplus-cheatsheet.pdf`.

Run: `node -e "const {JSDOM}=require('jsdom');const d=new JSDOM(require('fs').readFileSync('index.html','utf8'));console.log(d.window.document.title, [...d.window.document.querySelectorAll('a.card')].map(a=>a.getAttribute('href')))"`
Expected: `FieldReady Academy [ 'netplus/' ]`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Per-course builds and the FieldReady Academy catalog page"
```

---

### Task 6: Documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite `README.md`**

```markdown
# FieldReady Academy

Self-paced certification courses in a single web page each: a printable memorization sheet, a short starter test that builds a personalized tutorial, a full-length test that builds a retraining tutorial from your misses, and practice tests until you score above the bar three times in a row. All content and questions are original.

Courses live in `courses/<id>/` and share one engine in `engine/`. The first course is **NetPlus Academy** (CompTIA Network+ N10-009). Security+, CBET, and A+ Core 1 and Core 2 are next.

## Run it

- Live: https://bigurb10.github.io/netplus-academy/ is the catalog; https://bigurb10.github.io/netplus-academy/netplus/ is the Network+ course. Every push to `main` redeploys within a minute or two; no build step is needed because each course page loads the source files directly. On a phone, open the course link and use "Add to Home Screen".
- Locally: open `netplus/index.html` (or `dist/netplus.html`, a single self-contained file) in any browser. Progress is saved in that browser's local storage.
- To host elsewhere, upload the repo as-is, or upload `dist/<course>.html` renamed to `index.html` to any static host.

## Layout

- `engine/app.js`, `engine/styles.css`: the course engine. It reads `FRA.course` and the pack data; it contains nothing course-specific.
- `courses/<id>/course.js`: the course manifest: id, name, badge, exam, domains with weights and full-test quotas, test sizes and pass bar, starter pools and core lessons, access settings, exam-day tips.
- `courses/<id>/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `1. ` numbered step, `> ` exam tip, ``` fenced block for diagrams and tables, `{{code}}`, `**bold**`.
- `courses/<id>/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `courses/<id>/generators.js`: optional generators that produce computed questions at run time.
- `courses/<id>/cheatsheet.js`: the memorization sheet. `courses/<id>/deep-*.js`: the deeper explanation for every lesson, keyed by lesson id.
- `<id>/index.html`: the page that loads the engine plus that pack. `index.html`: the catalog. `catalog.css`: its styles.
- `build.py`: bundles each course into `dist/<id>.html` and `dist/<id>-artifact.html`. Run `python build.py` (all) or `python build.py netplus`.
- `tests/`: jsdom harness. `npm install` once, then `npm test` runs the engine's built-in self-test for every course and the gating test.

## How a course works

0. **Cheat sheet.** Shown first to new users, printable, always one tap away in the Cheat sheet tab. Direct link: `<course>/#cheatsheet` (`#cheatsheet-print` opens the print dialog).
1. **Starter test.** A few questions from each exam domain (`test.starterPerDomain`), each with a confidence rating from 1 (guess) to 5 (certain).
2. **Your tutorial.** A lesson tied to a question you missed or guessed is always included. A domain where you missed some questions adds its core lessons; a domain where you missed them all adds every lesson in it. Each lesson ends with a checkpoint (pass `checkpointPass` of `checkpointN`; a right answer marked Guess or Unsure does not count) and has a "Need a deeper explanation?" walkthrough.
3. **The full-length test.** `test.questions` items, weighted by each domain's `quota`.
4. **Retraining tutorial.** Built from the misses, worst first.
5. **Practice tests** until `streakNeeded` in a row at `passPct` or better.

Scoring behind the scenes: wrong and confident counts 4 points, wrong and unsure 3, right but unsure 2, right at medium confidence 1, right and confident 0. Points drive tutorial selection, ordering, and the optional Drills page.

## Access and pricing

Each manifest declares `freeCourse` and `free.lessons`. With `freeCourse: true` (the launch setting) everything is open. With it false, the cheat sheet, the starter test, and the first `free.lessons` lessons stay open and everything else shows an unlock card; `upgradeUrl` is where that card sends people, and a page that sets `window.FRA_ENTITLED = true` before loading the engine (after login and purchase) unlocks the course.

## Feedback

Every question has a flag button and every lesson has feedback buttons; the Feedback tab collects overall feedback and exports a Markdown report. Feedback stays in the browser unless the manifest sets `feedbackEndpoint` (a URL that accepts POSTed JSON) or `feedbackEmail`.

## Adding a course

1. Copy `courses/netplus/course.js` to `courses/<id>/course.js` and fill in every field. Domain ids are what lessons reference.
2. Write `cheatsheet.js`, then `curriculum-*.js`, then `questions-*.js` (five or more per lesson), then `deep-*.js` (one entry per lesson; the self-test fails if any lesson lacks one), then `generators.js` if anything is computable.
3. Create `<id>/index.html` from `netplus/index.html` with the new script list, and add a card to `index.html`.
4. Run `npm test` and `python build.py <id>`.

## Testing

`npm test` runs `tests/selftest.js` (the engine's `#selftest` flow under jsdom for every course plus the `tests/fixtures/mini` three-domain course) and `tests/gating.js`. You can also open any `<id>/index.html` from disk with `#selftest` on the URL to see the same log in a browser.
```

- [ ] **Step 2: Run everything one last time**

Run: `npm test && python build.py`
Expected: both test scripts pass; build prints the Net+ counts.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Document the engine and course-pack layout"
```

---

## Self-review notes

- Spec coverage: engine/pack split (Tasks 2, 3), manifest fields including `free`, `freeCourse`, `mode` is deferred (no `skills` mode yet; the manifest can gain it later without engine changes now), storage migration (Task 3), gating (Task 4), per-course build and catalog (Task 5), docs (Task 6), acceptance test with a second pack of a different domain count (the mini fixture, Task 3). The public Next.js site, Supabase, and Stripe are later phases and intentionally absent.
- Types: `course.domains[].id` is the same value lessons use in `domain`; `DOMAIN_IDS` preserves manifest order; `T` is `course.test` everywhere; `FREE_SET`, `entitled`, `lessonLocked`, `testsLocked`, `paywall` are defined in Task 4 and used only there.
- The Task 4 gating test hard-codes `39` locked lessons (49 minus 10) and lesson ids `u3l4` and `u4l1`; those are facts of the Net+ pack, not of the engine.
