# Question bank supplement: 195 questions for the thin A+ and CBET domains

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five original questions to every lesson in the five thin domains (A+ Core 1 Mobile Devices and Troubleshooting, A+ Core 2 Troubleshooting, CBET Problem Solving and Healthcare IT) so each domain's bank is at least twice its official-test quota.

**Architecture:** Pure content. One new questions file per course in the existing shape (`FRA.questions.push({...})`), loaded alphabetically after the existing files by the engine bundle, the static site, and the tests. No engine, manifest, or page changes.

**Tech Stack:** Vanilla JS data files; `node tests/balance-keys.js <file>`, `node tests/packcheck.js courses/<id>`, `npm test`, `python build.py`.

Spec: `docs/superpowers/specs/2026-10-15-growth-round-design.md`, section 1.

## Global Constraints

- **The lesson is the only reference.** Before writing a lesson's questions, read its `body` in `courses/<id>/curriculum-*.js` and its deep dive in `courses/<id>/deep-*.js`. A question may test only a fact, number, step, name, or rule that text teaches. A number in a question must appear in the lesson or the cheat sheet exactly (CBET safety numbers above all).
- **Original content, plain ASCII, no source references.** No book, author, vendor course, or website named or paraphrased. No real company or person; generic settings only (a clinic, a branch office, a user, a technician).
- **Question shape, verbatim from the existing files:** `{id:"u1l1-6",t:"u1l1",q:"...",a:["...","...","...","..."],c:2,e:"..."}`. Four options, all different, no "All of the above" or "None of the above". `e` is two or three sentences (at least 60 characters) that state why the key is right and why the strongest distractor is wrong. `q` is at least 20 characters. Ids continue the lesson's numbering: `-6` through `-10` (every target lesson has exactly `-1` to `-5` today).
- **No stem may open with the same 70 characters as any other stem in the course**, new or old (`tests/packcheck.js` rejects it). Vary openings: a scenario ("A user reports..."), a direct question ("Which..."), a result ("After replacing..."), a comparison.
- **Exam style:** at least two of each lesson's five are scenario questions that ask for the MOST likely cause, the FIRST or NEXT step, or the BEST choice, in CompTIA's capitalized form for the A+ packs and plain words for CBET. The other three may be direct recall. Distractors are plausible things a weak candidate would pick, not jokes.
- **Answer keys:** write the key wherever it falls, then run `node tests/balance-keys.js courses/<id>/<file>` once, which rewrites the file so keys spread across A to D. Do not hand-balance.
- **Validation after every file:** `node tests/packcheck.js courses/<id>` prints `packcheck: OK`; `npm test` passes. Commit after every task. Never push.
- Branch `bank-supplement` off `main`.

## Conventions

**File header** (`courses/aplus1/questions-4.js`; adjust the course name, units, and lesson list):

```js
// APlus Academy Core 1 question bank supplement: five more questions for each lesson in Mobile Devices
// (unit 1) and Hardware and Network Troubleshooting (units 8 and 9). All questions are original.
// Fields: id, t (lesson id), q (stem), a (four options), c (index of correct option), e (explanation).
window.FRA = window.FRA || {};
FRA.questions = FRA.questions || [];
FRA.questions.push(
// u1l1
{id:"u1l1-6",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."},
...
// u1l2
...
);
```

Inside the `push(...)` every object ends with a comma except the last. A `// <lessonId>` comment line precedes each lesson's five.

**Reading a lesson:** `grep -n 'id: "u1l1"' courses/aplus1/curriculum-*.js` gives the file and line; the body runs to the closing backtick before `hook:`. The deep dive is the `u1l1:` key in `courses/aplus1/deep-*.js`.

**Existing stems to avoid:** `grep -o '"u1l1-[0-9]*",t:"u1l1",q:"[^"]*"' courses/aplus1/questions-*.js` prints every existing stem for a lesson.

**Count check** (run at the end of each task; the numbers are the task's expected totals):

```bash
node -e "
const fs=require('fs'),path=require('path');global.window=global;global.FRA={};const d='courses/aplus1';
for(const f of fs.readdirSync(d).filter(f=>f.endsWith('.js')).sort()){try{eval(fs.readFileSync(path.join(d,f),'utf8'));}catch(e){}}
const per={};FRA.questions.forEach(q=>{per[q.t]=(per[q.t]||0)+1;});console.log(FRA.questions.length, JSON.stringify(per));"
```

## File structure

- Create `courses/aplus1/questions-4.js`: 65 questions (u1l1 to u1l4; u8l1 to u8l6; u9l1 to u9l3).
- Create `courses/aplus2/questions-4.js`: 30 questions (u6l1 to u6l6).
- Create `courses/cbet/questions-5.js`: 100 questions (u7l1 to u7l6; u8l1 to u8l6; u9l1 to u9l8).
- Modify `docs/superpowers/plans/2026-10-15-question-supplement.md` Status section (Task 4).

---

### Task 1: A+ Core 1 supplement, Mobile Devices and Troubleshooting (65 questions)

**Files:**
- Create: `courses/aplus1/questions-4.js`

**Lessons and what each covers** (titles from the pack; read the bodies before writing):

| Lesson | Title |
|---|---|
| u1l1 | Laptop Hardware: Replacing Batteries, Keyboards, RAM, Storage, Wireless Cards, Cameras, and Biometrics |
| u1l2 | Mobile Connections and Accessories: USB-C, Lightning, NFC, Bluetooth, Tethering, Docks, and Styluses |
| u1l3 | Mobile Network Connectivity: Cellular, SIM and eSIM, Wi-Fi, Hotspots, Bluetooth Pairing, and Location |
| u1l4 | MDM, BYOD, and Synchronization: Device Configurations, Policy Enforcement, Corporate Apps, Sync, and Data Caps |
| u8l1 | The Troubleshooting Method and the Technician's Toolkit |
| u8l2 | Motherboard, RAM, CPU, and Power Symptoms |
| u8l3 | Drive and RAID Symptoms |
| u8l4 | Video, Projector, and Display Symptoms |
| u8l5 | Mobile Device Symptoms |
| u8l6 | Worked Hardware Cases: From Symptom to Fix, Five Complete Walkthroughs |
| u9l1 | Network Symptoms: Wireless, Speed, Limited Connectivity, Latency and Jitter, Port Flapping, Interference, and Authentication |
| u9l2 | Printer Output Problems: Lines, Faded, Speckling, Ghosting, Garbled, Fusing, Color, and Orientation (has a generator; the five static questions are still written) |
| u9l3 | Printer Feed, Queue, Connectivity, and Finishing Problems |

- [ ] **Step 1: Read the thirteen lesson bodies and deep dives**, and print the existing stems for each lesson with the grep in Conventions.
- [ ] **Step 2: Write `courses/aplus1/questions-4.js`** with the header above and five questions per lesson in lesson order, ids `-6` to `-10`.
- [ ] **Step 3: Balance the keys.** Run: `node tests/balance-keys.js courses/aplus1/questions-4.js`. Expected: a line reporting the new position counts, roughly 16/16/16/17.
- [ ] **Step 4: Pack check.** Run: `node tests/packcheck.js courses/aplus1`. Expected: the summary line reports `270 questions` and then `packcheck: OK`. Fix any "same opening as", "explanation too short", or "duplicate options" line it prints and rerun.
- [ ] **Step 5: Count check** with the Conventions script for `courses/aplus1`. Expected: `270` and every target lesson at 10.
- [ ] **Step 6: Full suite.** Run: `npm test`. Expected: every test PASS, no FAIL.
- [ ] **Step 7: Commit.**

```bash
git add courses/aplus1/questions-4.js
git commit -m "content(aplus1): 65 more questions for Mobile Devices and Troubleshooting (ten per lesson)"
```

### Task 2: A+ Core 2 supplement, Software Troubleshooting (30 questions)

**Files:**
- Create: `courses/aplus2/questions-4.js`

**Lessons:**

| Lesson | Title |
|---|---|
| u6l1 | Windows Symptoms: From Blue Screens to Time Drift (has a generator; the five static questions are still written) |
| u6l2 | The Windows Repair Toolbox: Safe Mode, WinRE, sfc, DISM, chkdsk, Restore, Reset, Profiles |
| u6l3 | PC Security Symptoms and Browser Symptoms |
| u6l4 | Mobile OS and Application Issues |
| u6l5 | Mobile Security Concerns and Symptoms |
| u6l6 | Worked Software Cases: Five Complete Walkthroughs |

Header comment: `// APlus Academy Core 2 question bank supplement: five more questions for each lesson in Software Troubleshooting (unit 6). All questions are original.`

- [ ] **Step 1: Read the six lesson bodies and deep dives**, and print the existing stems.
- [ ] **Step 2: Write `courses/aplus2/questions-4.js`**, five per lesson, ids `-6` to `-10`. Command questions use the exact syntax the lesson teaches (`sfc /scannow`, `DISM /Online /Cleanup-Image /RestoreHealth`, `chkdsk /r`).
- [ ] **Step 3: Balance the keys.** Run: `node tests/balance-keys.js courses/aplus2/questions-4.js`.
- [ ] **Step 4: Pack check.** Run: `node tests/packcheck.js courses/aplus2`. Expected: `235 questions` and `packcheck: OK`.
- [ ] **Step 5: Count check** for `courses/aplus2`. Expected: `235`, u6l1 to u6l6 at 10 each.
- [ ] **Step 6: Full suite.** Run: `npm test`. Expected: all PASS.
- [ ] **Step 7: Commit.**

```bash
git add courses/aplus2/questions-4.js
git commit -m "content(aplus2): 30 more questions for Software Troubleshooting (ten per lesson)"
```

### Task 3: CBET supplement, Problem Solving and Healthcare IT (100 questions)

**Files:**
- Create: `courses/cbet/questions-5.js`

**Lessons:**

| Lesson | Title |
|---|---|
| u7l1 | The Troubleshooting Method and Device Versus Use Error |
| u7l2 | Power Supply, Battery, and Module Faults |
| u7l3 | Signal, Cable, Connector, and Sensor Faults |
| u7l4 | Prioritizing Repairs and Deciding Repair, Replace, or Escalate |
| u7l5 | Communication, User Training, and Closing the Loop |
| u7l6 | Power Supply Faults, Criticality, Root Cause Analysis, and Local Versus Network Problems |
| u8l1 | Monitoring Faults: Localized Versus System-Wide |
| u8l2 | Diagnostic and Infusion Device Faults |
| u8l3 | Therapeutic, Perioperative, and Life-Support Faults |
| u8l4 | Laboratory Device Faults and Environmental Problems |
| u8l5 | Preventive Maintenance, Performance Verification, and Documentation |
| u8l6 | Fault Tables: Monitoring, Laboratory, Diagnostic, Infusion, Therapeutic, and Operating Room Equipment |
| u9l1 | Networking Fundamentals: Addresses, Cables, and the Devices Between (has a generator; the five static questions are still written) |
| u9l2 | Wireless, Access Point Controllers, KVMs, Virtual Servers, and the Cloud |
| u9l3 | Network Troubleshooting Tools and Method |
| u9l4 | Device Integration: EMR, Middleware, HL7, and DICOM |
| u9l5 | Protected Health Information and Medical Device Cybersecurity |
| u9l6 | Computer Hardware and Software Troubleshooting |
| u9l7 | Healthcare IT Law and Standards: HITECH, HIPAA Titles, DMCA, FDA Data Systems, IEC 80001, and MDS2 |
| u9l8 | Network Concepts and Tools: OSI Layers, Topologies, Binary Subnet Masks, Hubs Versus Switches, PPP, Cable Testers, TDRs, Ping and ICMP, Fiber Inspection, and the Clinical Information Systems |

Header comment: `// CBET Academy question bank supplement: five more questions for each lesson in Problem Solving (units 7 and 8) and Healthcare IT (unit 9). All questions are original.`

CBET wording: plain sentences, no capitalized MOST/FIRST (write "most likely", "first"). Any leakage current, voltage, pressure, flow, or time limit in a question must be the value the lesson or `courses/cbet/cheatsheet.js` states; if the lesson gives no number, the question asks no number.

- [ ] **Step 1: Read the twenty lesson bodies and deep dives**, and print the existing stems (`courses/cbet/questions-*.js`, four files).
- [ ] **Step 2: Write `courses/cbet/questions-5.js`**, five per lesson in the order of the table, ids `-6` to `-10`.
- [ ] **Step 3: Balance the keys.** Run: `node tests/balance-keys.js courses/cbet/questions-5.js`.
- [ ] **Step 4: Pack check.** Run: `node tests/packcheck.js courses/cbet`. Expected: `400 questions` and `packcheck: OK`.
- [ ] **Step 5: Count check** for `courses/cbet`. Expected: `400`, every target lesson at 10.
- [ ] **Step 6: Full suite.** Run: `npm test`. Expected: all PASS.
- [ ] **Step 7: Commit.**

```bash
git add courses/cbet/questions-5.js
git commit -m "content(cbet): 100 more questions for Problem Solving and Healthcare IT (ten per lesson)"
```

### Task 4: Rebuild the bundles and record the status

**Files:**
- Modify: `dist/aplus1.html`, `dist/aplus2.html`, `dist/cbet.html` and their `-artifact` twins (generated), `dist/site/**` (generated), `README.md` (the question counts, if it states them), this plan's Status section.

- [ ] **Step 1: Rebuild.** Run: `python build.py` then `node site/build-site.js`. Expected: `[aplus1] questions: 270 across 41 lessons`, `[aplus2] questions: 235 across 41 lessons`, `[cbet] questions: 400 across 60 lessons`; the site build ends with `sitemap: 1063 URLs`.
- [ ] **Step 2: README.** Run `grep -n "205\|300 questions\|questions" README.md | head`; where the README states a per-course question count for aplus1, aplus2, or cbet, update it to 270, 235, and 400.
- [ ] **Step 3: Full suite.** Run: `npm test`. Expected: all PASS.
- [ ] **Step 4: Status.** Append to this file:

```markdown
## Status

Done <date>: aplus1 270 questions (Mobile 40, Troubleshooting 90), aplus2 235 (Troubleshooting 60), cbet 400 (Problem Solving 120, Healthcare IT 80). Bundles and site rebuilt; npm test green.
```

- [ ] **Step 5: Commit.**

```bash
git add -A
git commit -m "build: rebuilt bundles and site for the question supplement; plan status"
```
