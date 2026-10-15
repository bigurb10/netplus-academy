# CompTIA performance-based questions (PBQs): design

Date 2026-10-14. Blake asked for practice PBQs for each CompTIA course and approved the decisions
and both design sections in conversation on 2026-10-14 ("each CompTIA course needs practice PBQs
made"; "Make sure the PBQs make it into the SEO"; "Yes"; "Yes"). Applies to NetPlus Academy
(N10-009), SecPlus Academy (SY0-701), APlus Academy Core 1 (220-1201), and APlus Academy Core 2
(220-1202). The AAMI courses keep their labs and get no PBQs.

## 1. Decisions

- **Exam-shaped interactive tasks**, not scenario walkthroughs: five new task kinds (order, match,
  multiselect, form, command) beside the lab framework's existing choice kind, graded per task
  with a "why" and a lesson link for each.
- **A PBQs tab per course** with about ten PBQs, **and two or three PBQs open each
  official-format test** the way the real exam does, their tasks scored as questions. Practice
  tests, the starter test, and custom tests stay multiple choice.
- **Built after the CRES and CHTM merges.** Spec now; Plan A (engine and static page) and Plan B
  (content) follow, each on its own branch, subagent-driven.
- **SEO:** a crawlable `/<id>/pbq/` page per CompTIA course with three full PBQs rendered as HTML,
  structured data, and the exam-code PBQ phrases, linked from the landing page, the practice-test
  page, and the catalog card; the sitemap picks it up.
- **Phone first:** every drag kind also works by tap-to-select then tap-to-place, and by keyboard.
- Original content, plain words, plain ASCII in every file written, no reference to any source.

## 2. The feature

### Data model

A pack ships `courses/<id>/pbqs.js`:

```js
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};
FRA.pbqs["net-subnet-plan"] = {
  id: "net-subnet-plan", title: "Subnet the new floor", domain: 1, lesson: "u2l3", seo: true,
  scenario: { text: "...", svg: "<svg ...>...</svg>", log: "..." },   // svg and log optional
  tasks: [
    { id: "mask", kind: "form", prompt: "...", fields: [{ id: "mask", label: "Subnet mask", expect: ["255.255.255.192", "/26"], normalize: "ip" }] },
    { id: "steps", kind: "order", prompt: "...", items: ["...", "...", "...", "..."], expect: [2, 0, 3, 1] },
    { id: "pairs", kind: "match", prompt: "...", left: ["...", "..."], right: ["...", "...", "..."], expect: [1, 0] },
    { id: "lines", kind: "multiselect", prompt: "...", options: ["...", "...", "...", "..."], expect: [1, 3] },
    { id: "cmd", kind: "command", prompt: "...", expect: ["ipconfig /all"], alt: ["ipconfig -all"], flagOrder: false },
    { id: "pick", kind: "choice", prompt: "...", options: ["...", "...", "...", "..."], expect: 0 }
  ],
  why: { mask: "...", steps: "...", pairs: "...", lines: "...", cmd: "...", pick: "..." }
};
```

Rules: `domain` is the course domain id; `lesson` is an existing lesson id; `seo: true` on exactly
three PBQs per course; three to six tasks; every task id has a `why`; `expect` indexes refer to
the arrays as written (the engine shuffles items, right-hand slots, and options at render time and
maps back). `match` may have more right-hand slots than left items (distractors). `form` fields
carry `expect` (accepted values) and a `normalize` of `ip`, `cidr`, `text`, or `number`.
`command` carries `expect` and optional `alt`; grading lowercases, collapses spaces, strips a
trailing period, and, when `flagOrder` is false, treats flags in any order as equal. A `multiselect` task may carry `shuffle: false` to keep its options in pack order (log,
configuration, or command-output lines whose order carries meaning); every other task shuffles
for display (added 2026-10-14 after the Task 4 review).

### Grading

`FRAPbq.grade(task, answer)` returns `{ score, correct, detail }` with `score` in 0 to 1:
order = items in the right position / items; match = correct pairings / left items; multiselect =
max(0, correct picks minus wrong picks) / expected picks; form = fields matched / fields; command
= 1 or 0; choice = 1 or 0. `correct` is `score === 1`. In the PBQs tab the task shows its score
as "3 of 4 right" and the why; in a test a task counts as one question, right only when `correct`.

### The PBQs tab

Shown only when `FRA.pbqs` has entries. Route `#pbq` lists the PBQs with domain, title, done
mark, and best score; `#pbq/<id>` opens one: scenario on top (text, the SVG, the log in a
monospace block), tasks below, one Check button that grades every task and reveals each why with
its lesson link, Retry keeps the scenario and clears answers. Drag-and-drop on pointer devices;
tap an item then tap a slot on touch; arrow keys and Enter on keyboards; the three give the same
result. State: `S.pbqs[id] = { best, done, at, tasks: { taskId: score } }`, written on Check,
merged across devices by newer `at` (the additive-field pattern: `engine/sync.js` `hashOf` strips
an empty `pbqs`). Check writes `S.pbqs` only and records no lesson attempts, the same as a lab's Check;
task results move readiness through the official-format test (added 2026-10-14). The account page shows "PBQs done" per course beside "Labs done".

### In the official-format test

When the course has PBQs, the official-format test opens with `test.pbqInTest` PBQs (2 for the
A+ courses, 3 for Network+ and Security+) drawn by domain weight, avoiding ones used in the
learner's last official attempt when possible. Their tasks replace multiple-choice questions
one for one from the same domain's quota, so the test keeps the exam's question count and time.
The results page lists missed PBQ tasks with their why and lesson link beside the missed
questions; task results feed the strength chart and retraining as question results in the PBQ's
domain. The pass rule is unchanged. Practice tests, the starter test, and custom tests never
include PBQs.

### Engine changes

- New `engine/pbq.js` (`FRAPbq`): grading, normalization, the task renderers with drag, tap, and
  keyboard handling, the PBQ view. Adding a file under `engine/` touches the loader registrations
  (`build.py`, `tests/lib.js`, every `<id>/index.html` shell, `account/index.html` and
  `build_account()`, `tests/loaders.js`); the plan lists each.
- `engine/app.js`: the PBQs tab and routes, Check and Retry, state writes, the official-format
  test assembly and results additions, lesson links from whys.
- `engine/merge.js`: `pbqs` merged by newer `at`. `engine/sync.js`: `hashOf` strips an empty
  `pbqs`. `engine/summary.js`: PBQs done per course. `engine/strength.js`: PBQ task results
  counted in their domain.
- `engine/styles.css`: the PBQ layout (scenario panel, task cards, drag targets, selected state,
  log block) in the existing palette, phone width first.

## 3. SEO pages

`site/build-site.js` gains a `/<id>/pbq/` page for every course whose pack ships `pbqs.js`:

- Title `<Exam name> <code> PBQ Practice | <Course name>` (for example "CompTIA Network+ N10-009
  PBQ Practice | NetPlus Academy"), H1 the same without the course name, canonical, the shared
  social image.
- Intro: what performance-based questions are, that the real exam opens with a handful, how this
  course practices them, and the course's phrases ("Network+ PBQs", "N10-009 performance-based
  questions", and the equivalents per course from the manifest's `seo.pbqPhrases`).
- The three `seo: true` PBQs rendered in full as static HTML: scenario (SVG inline, log block),
  each task with its answer shown and its why, no JavaScript needed to read them.
- FAQ (how many PBQs the exam has: a handful at the start, CompTIA does not publish the count;
  can you skip and return: yes; are they weighted more: CompTIA does not disclose weights; how to
  practice them here) with FAQ structured data, and Quiz structured data for the three PBQs.
- A button "Practice all ten PBQs" into `/<id>/app/#pbq`, and the standard noindex rule for the
  app.
- The landing page gets a "Performance-based questions" section with the phrases and a link to
  the page; the practice-test page links to it; the catalog card's links gain "PBQ practice";
  the sitemap lists the four pages with lastmod. `tests/site.js` parity covers the new page.

## 4. Content: forty PBQs

Ten per course, each with domain, lesson, three to six tasks, a why per task, and exactly three
marked `seo: true` (the broadest and least spoilable). Plan B assigns lesson ids from each pack's
curriculum.

**NetPlus Academy (N10-009):** subnet the new floor (form); cables and connectors to ports and
distances (match); the troubleshooting methodology in order (order); configure a wireless access
point (form); the faulty lines in a switch config (multiselect); assign IPs on a network diagram
(form over SVG); OSI layers to devices and protocols (match); firewall rules for a stated policy
(order); diagnose from ipconfig and ping output (multiselect plus command); DHCP and DNS for a
new segment (form).

**SecPlus Academy (SY0-701):** find the attack in a log (multiselect); incident response steps in
order (order); attack types to descriptions (match); a firewall ACL for a policy (order plus
form); wireless security for a site (form); harden a server from a checklist (multiselect); PKI
components to roles (match); an access control matrix (form); verify a hash and scan a host
(command); classify risks in a register (match).

**APlus Academy Core 1 (220-1201):** cables and connectors (match); RAM and storage for a build
(form); printer troubleshooting steps (order); a mobile device for email and security (form);
cloud models to scenarios (match); a display problem from symptoms (multiselect); BIOS and UEFI
options (form); laptop components on a diagram (match over SVG); network commands for a
connectivity complaint (command); virtualization requirements (multiselect).

**APlus Academy Core 2 (220-1202):** Windows command-line tasks (command); NTFS and share
permissions for a request (form); the malware removal steps (order); an OS installation (order);
workstation security settings (multiselect); script types and extensions to uses (match); a
backup scheme (form); the troubleshooting steps for a slow PC (order); Linux commands for a file
task (command); safety and ESD practices to situations (match).

Manifest additions per course: `test.pbqInTest` (2 or 3) and `seo.pbqPhrases` (the exam-code
PBQ phrases for the page and the landing section).

## 5. Tests

- `tests/pbq.js` (new): every kind's grading against fixed answers (order partial credit, match
  pairings with distractor slots, multiselect floor at zero, form normalization and alternates
  for ip, cidr, text, number, command normalization with and without flag order), the shuffle
  map-back, and jsdom rendering: drag result equals tap result equals keyboard result; Check
  reveals every why; Retry clears; state written with `at`.
- `tests/engine.js` additions: the official-format test opens with `pbqInTest` PBQs, replaces
  that many questions from the right domains, keeps the exam count and time, counts task results
  as questions, lists missed tasks on the results page; practice and custom tests carry none.
- `tests/merge.js`: `pbqs` merged by newer `at`. `tests/sync.js`: `hashOf` ignores an empty
  `pbqs`. `tests/summary.js` and `tests/account.js`: the PBQs done count.
- `tests/fixtures/mini`: one PBQ with every kind, so the engine work is testable before any pack
  ships content.
- `tests/selftest.js`: every PBQ's kinds known, expects well-formed, lesson ids exist, why per
  task, exactly three `seo: true` per course.
- `tests/site.js`: the four PBQ pages exist with the three rendered PBQs, the FAQ and Quiz data,
  the app link, and the sitemap entries; the landing section and the practice-test link.
- `tests/loaders.js`: the new engine file registered everywhere.

## 6. Delivery order

1. This spec, committed.
2. **Plan A, engine and static page:** `engine/pbq.js`, the app wiring, state and sync and
   account, the static `/<id>/pbq/` page and links, the catalog card links, the mini fixture, the
   tests. Mergeable on its own; no visible change on live courses until a pack ships `pbqs.js`.
3. **Plan B, content:** forty PBQs across the four packs with lesson ids and the SEO picks, each
   PBQ reviewed against the exam objectives, the manifest additions, build, stage.
4. Both after the CRES and CHTM merges, each on its own branch, subagent-driven. Staging through
   `scripts/stage.sh`; Blake pushes and deploys; Search Console gets the four pages requested
   for indexing.

## 7. Assumptions and out of scope

- CompTIA does not publish PBQ counts or weights; the course says "a handful at the start" and
  treats each task as one question.
- No terminal or GUI emulation, no timed PBQs on their own, no PBQs in practice or custom tests,
  no PBQs for the AAMI courses, no AI-generated PBQs.
- The three SEO PBQs per course are public by design; the other seven stay in the app.
