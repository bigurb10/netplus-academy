# CHTM Academy: the content pack

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/chtm/`, the CHTM Academy pack for the AAMI/ACI Certified Healthcare Technology Manager exam: cheat sheet, 60 lessons in 8 units with deep dives, 320+ questions, 5 generators, an acronym glossary, the course page, the catalog card, the reference term checks, the first build, and a local stage.

**Architecture:** A course pack is plain data: `courses/chtm/*.js` files that fill `FRA.course`, `FRA.units`, `FRA.deep`, `FRA.questions`, `FRA.generators`, `FRA.acronyms`, `FRA.cheatsheet`. The engine renders them, the self-test validates them, `build.py` bundles them, and `site/build-site.js` writes the landing, practice-test, lesson, and cheat-sheet pages. No engine change is needed (spec: no labs, no certificate, no untested domain).

**Tech Stack:** Vanilla JS packs loaded as `<script>` tags, Node 20 + jsdom tests (`npm test`), `python build.py` bundler (PyMuPDF available for the PDF checks), headless Chrome for the cheat sheet PDF, `scripts/stage.sh` for staging.

Spec: `docs/superpowers/specs/2026-10-14-chtm-academy-design.md`.

## Global Constraints

- Course id `chtm`, name **CHTM Academy**, badge `CH`, brand FieldReady Academy. Exam: vendor `AAMI / ACI`, title `Certified Healthcare Technology Manager`, code `CHTM`, 100 questions, 120 minutes, `passPct: 70`. Practice tests: 50 questions, 55 minutes, pass 80, 3 of the last 5. Domains and quotas: 1 Financial Management 20% quota 10; 2 Risk Management 16% quota 8; 3 Operations Management 40% quota 20; 4 Education and Training 11% quota 6; 5 Human Resources 13% quota 6. Free course, 15 free lessons, no labs, no certificate.
- 2026 handbook facts (from the roadmap note, verified against `E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf` pages 20 to 24, 31, 33): offered twice a year in the windows **May 1 to 15** and **November 1 to 15**, computer-based at Kryterion test centers; 100 multiple-choice questions in 2 hours, closed book, on-screen calculator and notepad only; criterion-referenced cut score by the modified Angoff method, no published cut score; results pass or fail; fee **$490 member / $565 non-member**, retake **$440 / $515** (2027: $510 / $590, retake $460 / $540); retake after 60 days, at most three attempts in two years, then a one-year wait. Eligibility, ONE of five pathways: (1) a current CCE, CBET, CRES, or CLES plus at least three years of work as an HTM supervisor or manager in the last five; (2) the Department of Defense BMET training program plus three years of military or civilian HTM supervisor or manager experience in the last five; (3) an associate degree in biomedical technology, a related healthcare discipline, information technology, or business plus three years as an HTM supervisor or manager in the last five; (4) a bachelor's degree or higher in biomedical technology, engineering, a related healthcare discipline, information technology, or business plus two years as an HTM manager in the last five; (5) seven years in the HTM field with three years of management experience in the last five. A pathway without the supervisor or manager title needs confirmation of management duties by self-attestation or third-party attestation. Pathway 1 is said first everywhere, with links to the CBET and CRES courses on the landing page.
- The reader is a manager. Every lesson teaches a decision, a document, or a number a manager produces; every question is a management scenario that asks for the FIRST step, the BEST recommendation, or the MOST appropriate report, committee, or document. No bench repair content beyond what a manager must recognize.
- Blake's content rules: original content, no reference to any book, guide, or source anywhere in the pack; cheat sheet first; plain words; every lesson has 5 or more questions (6 on the 24 Operations lessons), a deep dive, and a checkpoint; feedback buttons come from the engine. Nothing from the AAMI guide is reproduced; it is a reference the term check reads.
- Numbers: every number in the pack comes from the AAMI guide (`E:\CERT GUIDES\CHTM\AAMI CHTM Study Guide (Lynch, 2016).pdf`), the ACI handbook, the two public documents beside the guide (`E:\CERT GUIDES\CHTM\CMS S&C 14-07 Equipment Maintenance memo.pdf`, the CMS survey-and-certification memo on equipment maintenance and alternative equipment maintenance programs, and `E:\CERT GUIDES\CHTM\21 CFR Part 803 Medical Device Reporting.pdf`, the medical device reporting regulation with its deadlines), or arithmetic the lesson itself shows (a worked budget, an ROI). Wang's book could not be obtained; those two documents stand in for it. Regulatory thresholds (device reporting deadlines, retention periods, survey intervals) come from the guide or the handbook or are left out, not guessed. Where the 2016 guide and the 2026 outline differ in wording, the outline governs. To look a number up, search the guide with PyMuPDF (`fitz`) from a scratchpad script; never paste its text into the pack.
- Plain ASCII in every pack file and in this plan: `x` for multiply, `plus or minus`, `percent` or `%`, no em dashes, no curly quotes, no degree signs. Write content files with the Write tool, never a shell heredoc (heredocs halve backslashes).
- Lesson objects keep the CBET line format exactly, because `build.py` reads them with regexes: the first line of every lesson is `id: "uNlM", title: "...", domain: N, obj: "...", minutes: N,`, then `body:` as a template literal, then `hook:`.
- The acronym test forbids a glossary entry from naming another course: in `courses/chtm/acronyms.js` entry text never write the literal tokens `CBET`, `CRES`, `CABT`, `BMET Academy`, `Network+`, `Net+`, `Security+`, `Sec+`, or `A+`; write the credential's full name instead. The keys `CBET`, `CRES`, `CABT`, `CCE`, and `CLES` themselves are allowed (and needed for the eligibility pathways). Lesson and FAQ text may name the courses.
- Commit after every task; never push (Blake pushes). Work on branch `chtm-academy` off `main`. Tasks 1 to 5 touch only `courses/chtm/`; Task 6 (wiring) runs only after the CRES branch has merged to `main` and this branch has been rebased onto it, so the shared catalog, build, stage, and test lists change in one order.

## Conventions every content task follows

Read these before writing any pack file. They are the contract the tests enforce.

**Mini-markup (lesson `body`, `hook`, deep dives):** `## ` heading, `- ` bullet, `1. ` step, `> ` tip line, ``` fenced block (tables; inside a JS template literal the fence is written `\`\`\``), `{{text}}` inline code, `**text**` bold. `tests/packcheck.js` requires every body to have at least 180 words, a `## ` heading, a `> ` tip line, and balanced fences; every deep dive at least 300 words with balanced fences. Every body ends with a `> Exam tip:` line.

**Curriculum file shape** (`courses/chtm/curriculum-N.js`):

```js
// CHTM Academy curriculum, units 1 to 3. Original teaching content for the AAMI/ACI CHTM exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Financial Management", domain: 1,
  blurb: "How hospital money is organized, how the HTM budget is built and defended, and how a manager reads the statements.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "How Hospital Money Is Organized: Operating and Capital Budgets, Cost Centers, the Fiscal Year", domain: 1, obj: "FIN-B", minutes: 9,
      body: `...`,
      hook: "..."
    }
  ]
});
```

Unit `domain` is the domain its lessons belong to. `obj` is the outline letter the lesson serves, written `FIN-A` to `FIN-C`, `RSK-A` to `RSK-G`, `OPS-A` to `OPS-M`, `EDU-A` to `EDU-G`, `HR-A` to `HR-E`.

**Deep file shape** (`courses/chtm/deep-N.js`): `window.FRA = window.FRA || {}; FRA.deep = FRA.deep || {}; Object.assign(FRA.deep, { u1l1: \`...\`, u1l2: \`...\` })` with one key per lesson in that file's units. Fenced tables are the house style for "what to memorize" blocks; worked examples (a budget line, an ROI, an RPN) are the house style for this pack.

**Questions file shape** (`courses/chtm/questions-N.js`): `window.FRA = window.FRA || {}; FRA.questions = FRA.questions || []; FRA.questions.push({id:"u1l1-1",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."}, ...)`. Ids `<lesson>-<n>`. Stems are management scenarios, at least 20 characters; four distinct options; explanations at least 40 characters that teach the rule, not just the answer. No two stems share their first 70 characters. After writing a file run `node tests/balance-keys.js courses/chtm/questions-N.js` so correct answers spread across A to D.

**Acronyms** (`courses/chtm/acronyms.js`): `FRA.acronyms = { "KEY": { full, tip, more } }` plus `FRA.acronymIgnore = [...]` for uppercase words that are not acronyms (`MOST`, `FIRST`, `BEST`, `LEAST`, `NOT`, `OK`, `ON`, `OFF`, `II`, `III`, `IV`). `node tests/acronyms.js courses/chtm` must pass after every content task.

**Generators** (`courses/chtm/generators.js`): the shape in Task 5. `node tests/gen-smoke.js courses/chtm 500` must report 0 problems.

**Pack tools:** `node tests/packcheck.js courses/chtm`, `node tests/balance-keys.js <file>`, `node tests/acronyms.js courses/chtm`, `node tests/gen-smoke.js courses/chtm 500`. The full `npm test` only picks the pack up once `courses/chtm/course.js` exists (Task 6).

**What a lesson reads like.** Open with the situation a manager is in (a report lands, a surveyor asks, a vendor quotes, a technician resigns), teach the concept in plain words, show the worked number or the document's contents in a fenced table, name the committee or regulator it goes to, and close with what the exam asks.

## File structure

Create:
- `courses/chtm/cheatsheet.js`, `courses/chtm/acronyms.js` (Task 1; acronyms grows in every later task).
- `courses/chtm/curriculum-1.js`, `deep-1.js`, `questions-1.js` (Task 2: units 1 to 3, 22 lessons).
- `courses/chtm/curriculum-2.js`, `deep-2.js`, `questions-2.js` (Task 3: units 4 to 6, 24 lessons).
- `courses/chtm/curriculum-3.js`, `deep-3.js`, `questions-3.js` (Task 4: units 7 and 8, 14 lessons).
- `courses/chtm/generators.js` (Task 5).
- `courses/chtm/course.js`, `chtm/index.html` (Task 6).
- `scripts/termcheck_chtm.py` (Task 7).

Modify:
- `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md` (Task 6, after the rebase onto the post-CRES `main`).
- This plan's Status section (Tasks 7 and 8).

---

### Task 1: Cheat sheet and the first acronym glossary

Blake's rule: the cheat sheet comes before any lesson. Target about 12 printed pages (roughly 380 to 420 lines of source).

**Files:**
- Create: `courses/chtm/cheatsheet.js`
- Create: `courses/chtm/acronyms.js`

**Interfaces:**
- Produces: `FRA.cheatsheet = { title, intro, sections: [{ id, title, blocks: [{ type: "table", cols, rows } | { type: "list", title, cols: 2, items } | { type: "note", text }] }] }` and `FRA.acronyms` + `FRA.acronymIgnore`. Later tasks add glossary keys; they never rename these section ids.

- [ ] **Step 1: Write `courses/chtm/cheatsheet.js`**

Header and shape (copy exactly, then fill the sections):

```js
// CHTM Academy memorization sheet for the AAMI/ACI CHTM exam. Formulas, statement lines, risk tools, operations
// metrics, regulators, training measures, and labor laws a healthcare technology manager must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CHTM Memorization Sheet",
  intro: "Print this and keep it beside you. The CHTM exam rewards recall of the financial formulas, the risk tools and the laws behind them, the operations metrics a department reports, who regulates what, how training is justified and measured, and the labor laws a manager must not break. Every number and name on this sheet is fair game.",
  sections: [ ... ]
};
```

Sections, in this order, with the rows each must contain (add more rows freely; never fewer; every number from the guide, the handbook, or arithmetic shown on the sheet):

1. `exam` "The exam itself": table of facts (certifying body ACI; 100 multiple-choice questions; 2 hours, closed book, on-screen calculator and notepad; five domains with the percentages 20 / 16 / 40 / 11 / 13 named in full; windows May 1 to 15 and November 1 to 15 at Kryterion centers; results pass or fail; no published cut score, this course uses 70%; fee $490 member / $565 non-member, retake $440 / $515; 60-day retake wait, three attempts in two years); an eligibility table (the five pathways in the Global Constraints' words, pathway 1 first; the attestation rule); a `note`: "This course's official-format test uses 70%, the same bar as our CBET and CRES courses; ACI publishes no cut score."
2. `financial` "Financial management": budgets table (operating versus capital, what each pays for, who approves, the fiscal year, cost centers, distributed versus consolidated budgeting); the general ledger table (supplies, payroll, parts, consumables, contracts, training: what posts where); formulas table (budget variance = actual minus budget, variance percent = variance / budget x 100, favorable when an expense comes in under budget; ROI percent = (gain minus cost) / cost x 100; payback period = cost / annual savings; total cost of ownership = purchase plus service plus parts plus training plus disposal over the life; straight-line depreciation = (cost minus salvage) / useful life per year, book value = cost minus accumulated depreciation; cost of service ratio = annual service cost / acquisition cost x 100); statements table (balance sheet: assets, liabilities, equity; income statement: revenue, expenses, net; cash flow; GAAP; accounts payable versus accounts receivable; accrual versus cash basis); a `note` on business justification (the problem, options, costs, benefits, risks, recommendation, in that order).
3. `procurement` "Procurement, contracts, and the lifecycle": life expectancy table (how it is set: manufacturer guidance, the AHA useful-life schedule, failure trends, parts availability, end of support; what triggers replacement); contract types table (full service, parts only, time and materials, shared risk, first look, preventive only, software support; what each covers, who holds risk); evaluation table (cost, compliance, terms and conditions: response time, uptime guarantee, parts, loaners, training, exclusions, termination, renewal, indemnity); the in-house versus vendor decision list (volume, skills, training cost, test equipment, parts access, risk, response time); fair market value and disposal table (purchase, lease, trade-in, resale, donation, environmental disposal, data wiping before disposal, documentation).
4. `risk` "Risk management": risk categories table (patient safety, operations, financial, emergency preparedness, regulatory: an example of each); risk scoring table (maintenance strategy from risk: equipment function, physical risk, maintenance requirement, incident history; high risk gets PM, low risk may go to run-to-failure under an alternative equipment maintenance program); tools table (root cause analysis: define, gather, the five whys, fishbone, corrective action, verify; FMEA: severity x occurrence x detection = risk priority number, rank and act on the highest; incident investigation: secure the device and accessories, preserve settings, interview, document, report); laws and reports table (Safe Medical Devices Act of 1990: user facilities report deaths to FDA and the manufacturer and serious injuries to the manufacturer, within the deadline the guide states; MAUDE as the public database; sentinel event alerts; recalls by class I, II, III; hazard and safety advisories, ECRI and manufacturer notices; the recall workflow: locate, quarantine or correct, document, close); data security table (PACS, EMR, networked devices; integrity, backups, access control, encryption; cybersecurity: patching, hardening, segmentation, antivirus, MDS2, operating system life expectancy; the Wireless Medical Telemetry Service bands and why the FCC matters); emergency preparedness list (downtime procedures, utility failure, generator and UPS inventory, disaster plans, critical equipment lists).
5. `operations` "Service operations and metrics": work order table (request, triage, assignment, repair, verification, closure, customer feedback; what a complete record holds); CMMS table (asset inventory, parts, work orders, service history, recalls, end of life, regardless of who owns the equipment); PM table (scheduling, completion rate = completed / due x 100, the compliance report, what a surveyor asks for, documenting missed PMs); KPI table (completion rate, repeat repairs, mean time to repair, total time to repair, customer satisfaction, cost of service ratio, labor hours per device, overtime, backlog, uptime); staffing table (devices per technician, hours per device, workload by risk, scheduling, on-call); resources list (PPE, tools, test equipment and its calibration, supplies, technical information, training); data management list (backups, restore tests, security, patching, updates); alternative equipment maintenance table (what CMS allows, what may not be included, the evidence required, the documentation).
6. `policy` "Policy, regulators, and accreditation": the medical equipment management plan table (its required contents: scope, inventory criteria, risk and maintenance strategies, PM and inspection, incident response, recalls, emergency procedures, training, performance monitoring, annual evaluation); SOPs and the EOC manual list; committees table (EOC, patient safety, risk management, performance improvement, radiation safety, infection control: what HTM reports to each); regulators table (CMS and the conditions of participation, deemed status; The Joint Commission, DNV, and the other accrediting organizations; FDA and medical device reporting; FCC and the Wireless Medical Telemetry Service; NRC and radioactive materials; OSHA; HIPAA; state agencies); surveys list (prepare the evidence, host the surveyor, answer findings with a corrective action plan and dates).
7. `projects` "Projects, capital planning, and stakeholders": capital request table (the request, clinical need, feasibility, space, site preparation, power, network, total cost of ownership, service strategy, standardization, cybersecurity, the recommendation); sustainability list (parts, training, service manuals, life expectancy, MAUDE history, operating system life expectancy); project management table (charter, plan, schedule, budget, stakeholders, risks, communication, acceptance testing, sustainment plan, close-out); lifecycle table (acquisition, contracting, installation, training, sustainment, disposal: HTM's job at each stage); construction and utility list (planning meetings, utility interruption notices, change management, downtime procedures); communication list (scheduled meetings, rounding, daily huddles, escalation paths, the stakeholders: IT, nursing, informatics, facilities, vendors, technicians, senior leadership).
8. `education` "Education and training": needs analysis table (cost, ROI, operations, technical requirements, competency, customer requirements, resources, asset inventory); effectiveness table (cost, failure rates, total time to repair, staff competencies and skill set, user satisfaction); training types table (technical and model-specific, manufacturer-provided and negotiated into the purchase, safety, soft skills, regulatory and code compliance, internal policy, orientation with a mentor and SOPs); operator training list (failure trending, use error, new equipment, new clinical applications, new staff, database management); materials list (service manuals, operations manuals, training media, where they live and who keeps them current); partners list (infection prevention, facilities management, materials management, IT).
9. `hr` "Human resources and labor law": the employee lifecycle table (job description, selection, orientation, evaluation, development plan, retention, termination); evaluation table (compensation, organizational values, engagement, goals, coaching, mentoring, recognition, conflict, documentation of improvement opportunities, performance improvement plans, recommendations to human resources); staffing and pay table (staffing levels, the cost of a biomed as loaded salary, incentives, pay equity, certification as a differentiator); labor law table (ADA: reasonable accommodation; EEOC: discrimination and harassment; FMLA: protected leave; NLRA: concerted activity and unions; OSHA: a safe workplace and PPE; hearings and investigations: HR present, document, consistent); a `note` on facilitating change (explain why, involve, train, measure, recognize).

- [ ] **Step 2: Load the sheet in jsdom and check its shape**

Run:
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/chtm/cheatsheet.js','utf8'));const cs=w.FRA.cheatsheet;const ids=cs.sections.map(s=>s.id);console.log(ids.join(','));let rows=0,bad=0;cs.sections.forEach(s=>s.blocks.forEach(b=>{if(b.type==='table'){b.rows.forEach(r=>{rows++;if(r.length!==b.cols.length)bad++;});}else if(b.type==='list'){rows+=b.items.length;}else if(b.type!=='note'){bad++;}}));console.log('rows',rows,'bad',bad);"
```
Expected: `exam,financial,procurement,risk,operations,policy,projects,education,hr` and `bad 0` with `rows` above 180.

- [ ] **Step 3: Write `courses/chtm/acronyms.js` covering the sheet**

Header:

```js
// CHTM Academy acronym glossary. Every acronym used in the lessons, deep dives, cheat sheet, and questions.
// Rendered by the engine as hover links and as the cheat sheet's Acronyms section. Keys match whole words,
// case-sensitive, plurals allowed. Original wording. Fields: full, tip (one sentence), more (longer; blank line = paragraph).
window.FRA = window.FRA || {};
FRA.acronyms = {
  "AAMI": { full: "Association for the Advancement of Medical Instrumentation", tip: "The standards body for medical equipment and the sponsor of the HTM credentials.", more: "AAMI publishes the equipment-management standards hospitals follow. Its credentials institute, ACI, runs the healthcare technology manager exam this course prepares you for." },
  "ACI": { full: "AAMI Credentials Institute", tip: "The body inside AAMI that writes and administers the certification exams.", more: "ACI sets each exam's content outline, eligibility, fees, and retake rules, and reports results as pass or fail." },
  "CHTM": { full: "Certified Healthcare Technology Manager", tip: "The ACI credential for HTM supervisors and managers: 100 questions, 2 hours, offered in May and November.", more: "Five eligibility pathways; the common one is a current technician credential plus three years as an HTM supervisor or manager in the last five. Recertified every three years with continuing education." },
  ...
};
FRA.acronymIgnore = ["BEST", "FIRST", "LEAST", "MOST", "NOT", "OK", "ON", "OFF", "II", "III", "IV"];
```

Run `node tests/acronyms.js courses/chtm`; add a key for every `missing:` line it prints until it passes. Expected keys at this point include at least: AAMI, ACI, CHTM, CBET, CRES, CCE, CLES, CABT, HTM, BMET, CMMS, PM, KPI, ROI, TCO, GAAP, AP, AR, FMEA, RPN, RCA, SMDA, FDA, MDR, MAUDE, ECRI, PACS, EMR, EHR, HIPAA, HITECH, MDS2, WMTS, FCC, NRC, CMS, CoP, TJC, DNV, EOC, MEMP, SOP, AEM, PPE, OSHA, ADA, EEOC, FMLA, NLRA, IT, UPS, MTTR, AHA, DoD.

- [ ] **Step 4: Verify and commit**

Run: `node tests/acronyms.js courses/chtm 2>&1 | tail -2`
Expected: the pass line for `chtm` with no `missing:` or `unused` lines.

```bash
git add courses/chtm/cheatsheet.js courses/chtm/acronyms.js
git commit -m "feat(chtm): memorization sheet for the CHTM and the first acronym glossary"
```

---

### Task 2: Units 1 to 3 (22 lessons, 110 questions)

**Files:**
- Create: `courses/chtm/curriculum-1.js`, `courses/chtm/deep-1.js`, `courses/chtm/questions-1.js`
- Modify: `courses/chtm/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `financial`, `procurement`, and `risk` sections (every number and formula agrees).
- Produces: units `u1` (domain 1), `u2` (domain 1), `u3` (domain 2). Task 6's manifest lists these lesson ids in `starterPool` and `core`; do not rename them.

Reuse: the CBET pack's `u7l4` (prioritizing repairs), `u7l6` (root cause analysis), `u8l5` (PM, documentation, recalls), `u9l5` and `u9l7` (cybersecurity and HIT law) carry the risk material at technician depth; read them for structure, then write from the manager's seat. Financial lessons are all new writing. Never copy a CBET body.

- [ ] **Step 1: Run the pack checker on the empty folder to see the baseline**

Run: `node tests/packcheck.js courses/chtm`
Expected: `chtm: 0 units, 0 lessons ... cheatsheet yes` then `packcheck: OK`.

- [ ] **Step 2: Write `courses/chtm/curriculum-1.js`**

Each "covers" list is the minimum the body must teach, in the learner's words; the outline's own example terms are written in plain text so the Task 7 check finds them. Every body opens with a manager's situation and ends with a `> Exam tip:` line.

**Unit u1 "Financial Management"** (domain 1; blurb: how hospital money is organized, how the HTM budget is built and defended, and how a manager reads the statements; assumes nothing)
- u1l1 `How Hospital Money Is Organized: Operating and Capital Budgets, Cost Centers, the Fiscal Year` (FIN-B, 9). Covers: operating budget (the year's expenses and any revenue) versus capital budget (equipment and projects above the capitalization threshold, depreciated over years); cost centers and the HTM department as one; the fiscal year and budget cycle (request, review, approval, monthly reports); who approves what; where HTM money comes from (department budget, service contracts the department manages, chargebacks); distributed versus consolidated budgeting and what each does to the manager's control.
- u1l2 `The HTM General Ledger: Supplies, Payroll, Parts, Consumables, Contracts, Training` (FIN-B, 9). Covers: the general ledger as the account structure; the accounts an HTM department manages (supplies, payroll and benefits, parts, consumables, service contracts, training and travel, test equipment calibration, software); coding a purchase to the right account; encumbrances and accruals in plain words; why miscoded parts hide the true cost of a device; reading the department's ledger detail.
- u1l3 `Budget Reports and Variance: Reading the Monthly Report and Explaining the Gap` (FIN-B, 10). Covers: the monthly budget report (budget, actual, variance, percent, year to date); variance = actual minus budget, percent against budget, favorable versus unfavorable for expenses and for revenue; timing variances versus real variances; seasonality and one-time events; writing the variance explanation leadership expects (what, why, what you will do); forecasting the year-end from the trend; the generator's variance questions come from this lesson.
- u1l4 `Financial Statements: Balance Sheet, Income Statement, Depreciation, GAAP, Accounts Payable and Receivable` (FIN-B, 10). Covers: the balance sheet (assets, liabilities, equity) and where equipment sits on it; the income statement (revenue, expenses, net); cash flow in one paragraph; depreciation (straight-line as the common method, useful life, salvage, book value, why a fully depreciated device still runs); generally accepted accounting principles and why the department follows them; accounts payable (what the hospital owes vendors) and accounts receivable (what is owed to it) from the HTM side (approving invoices, chargebacks to departments, contract billing); business activity reports.
- u1l5 `Business Justification and Return on Investment: ROI, Payback Period, Total Cost of Ownership` (FIN-A, 10). Covers: the business justification document (problem, options, costs, benefits, risks, recommendation); return on investment = (gain minus cost) / cost x 100 and a worked example (an in-house program replacing a contract); payback period = cost / annual savings; total cost of ownership over the life (purchase, service, parts, training, software, disposal); soft benefits (uptime, safety, satisfaction) and how to state them; the generator's ROI and payback questions come from this lesson.
- u1l6 `Analyzing Past, Present, and Expected Operations: Trends, Forecasts, Development Opportunities` (FIN-A, 9). Covers: using service history, costs, and workload to find development opportunities (contracts to insource, devices to standardize, training that pays back) and areas needing improvement (repeat repairs, overdue PMs, overtime); trend analysis and simple forecasting; benchmarking against similar departments; presenting the analysis to leadership with the numbers that matter to them.

**Unit u2 "Procurement, Contracts, and the Asset Lifecycle"** (domain 1; blurb: how a manager plans replacement, evaluates contracts, sources parts and service, and advises on value; assumes unit 1)
- u2l1 `Life Expectancy and Capital Replacement Planning` (FIN-C, 10). Covers: how useful life is set (manufacturer guidance, industry useful-life schedules, failure trends, parts and support availability, end of support dates, technology change); the replacement planning list (age, condition, cost of service, downtime, clinical need, regulatory drivers); the multi-year capital replacement plan and how HTM feeds it; scoring and prioritizing requests; the paper trail.
- u2l2 `Service Contracts: Cost, Compliance, Terms and Conditions` (FIN-C, 10). Covers: what a service contract covers and what it excludes; the terms that matter (response time, uptime guarantee, parts, loaners, PM included, software updates, training, remote access, termination, renewal, price escalation, indemnity, insurance); measuring vendor compliance against the terms; cost per device per year and the cost of service ratio; negotiating at renewal with the department's own data; documenting contract performance in the CMMS.
- u2l3 `Contract Types and Coverage Levels; the In-House Versus Vendor Decision` (FIN-C, 10). Covers: contract types (full service, parts only, time and materials, shared risk, first look, preventive only, software support, multi-vendor service, insurance-style programs); the decision factors for in-house service (volume, skills, training cost, test equipment, parts access, response time, risk, regulatory); hybrid models; how to present the decision to leadership with ROI.
- u2l4 `Sourcing Parts, Service, Training, and Test Equipment` (FIN-C, 9). Covers: sourcing options (manufacturer, third-party, refurbished, exchange, brokers) and their risks (quality, warranty, counterfeit, regulatory); parts inventory management (stock levels, consignment, turns); sourcing service and training; test equipment procurement and calibration contracts; purchasing policy compliance (quotes, approvals, purchase orders, receiving).
- u2l5 `Fair Market Value: Purchase, Lease, and Asset Recovery on Disposal` (FIN-C, 9). Covers: fair market value and how it is established; purchase versus lease (operating and capital leases in plain words, rental); trade-in, resale, donation, and recycling; the disposal process (approval, data wiping, decontamination, documentation, inventory removal); environmental and regulatory rules on disposal at recognition level.
- u2l6 `Advising Management: the Recommendation and the Paper Trail` (FIN-C, 9). Covers: the role of HTM in procurement (consult early, evaluate, recommend, do not decide alone); the evaluation record (clinical input, technical review, cybersecurity review, service strategy, total cost of ownership, references); conflicts of interest and vendor relations; writing a recommendation leadership can act on; what the file must hold for a later audit.

**Unit u3 "Risk, Recalls, and Data Security"** (domain 2; blurb: how a manager finds, scores, controls, reports, and recovers from risk; assumes unit 1)
- u3l1 `Identifying and Evaluating Risk: Patient Safety, Operations, Financial, Emergency Preparedness, Regulatory` (RSK-A, 10). Covers: the five risk categories with an HTM example of each; risk as likelihood and consequence; sources of risk information (incident reports, service history, recalls, surveys, staff rounds, near misses); the risk register; who owns which risks; escalation.
- u3l2 `Risk Scoring and the Maintenance Strategy It Drives` (RSK-C, 10). Covers: risk-based inclusion and maintenance strategies (equipment function, physical risk of failure, maintenance requirement, incident history); scoring models and their thresholds; what high, medium, and low risk get (PM intervals, inspection only, run to failure); documenting the rationale; reviewing scores when history changes.
- u3l3 `Recommending Controls: Processes, Procedures, and Policies That Mitigate Risk` (RSK-B, 9). Covers: the hierarchy of controls applied to healthcare technology (eliminate, substitute, engineer, administer, protect); writing a procedure or policy that controls a risk; training and competency as controls; measuring whether a control works; presenting the recommendation to the committee that owns it.
- u3l4 `Root Cause Analysis and Incident Investigation` (RSK-C, 11). Covers: securing the scene (the device, accessories, disposables, settings, logs), preserving evidence, interviewing without blame; root cause analysis methods (the five whys, fishbone categories, timeline), distinguishing root cause from contributing factors, corrective and preventive action, verification; the investigation report; when the manufacturer and the FDA are involved; device error versus use error from the manager's seat.
- u3l5 `FMEA: Severity, Occurrence, Detection, and the Risk Priority Number` (RSK-C, 10). Covers: failure modes and effects analysis step by step; scoring severity, occurrence, and detection on a scale; risk priority number = severity x occurrence x detection; ranking and acting on the highest; re-scoring after action; where FMEA fits (new equipment, new process, after an incident); the generator's RPN questions come from this lesson.
- u3l6 `Reports That Explain Risk: the Safe Medical Devices Act of 1990, Medical Device Reporting, Sentinel Event Alerts` (RSK-D, 10). Covers: the Safe Medical Devices Act of 1990 and user facility reporting (deaths to the FDA and the manufacturer, serious injuries to the manufacturer, the deadlines and the annual report as the guide states them); medical device reporting forms and the MAUDE database; sentinel events and the alerts that follow; writing a report that states findings, explains the risk position, and recommends changes; who receives it.
- u3l7 `Recalls, Hazards, and Safety Advisories` (RSK-G, 10). Covers: recall classes I, II, III; sources (FDA, manufacturer notices, ECRI alerts, distributors); the recall workflow (receive, identify affected devices in the CMMS, locate, quarantine or correct, document, verify, close); hazard and safety advisories that are not recalls; communicating with clinical departments; reporting recall status to the committee; tracking open recalls.
- u3l8 `Data Integrity and Security for PACS, the EMR, and Networked Devices` (RSK-E, 10). Covers: what data HTM is responsible for (device configurations, logs, calibration data, patient data on devices); integrity (backups, restore tests, version control, audit logs); security (access control, encryption, physical security of servers and devices); PACS, the EMR, and networked devices as the examples; HIPAA from the manager's seat; business associate agreements with vendors.
- u3l9 `Cybersecurity Oversight: Patching, Hardening, Segmentation, WMTS, Operating System Life Expectancy` (RSK-F, 10). Covers: the manager's cybersecurity oversight (inventory of networked devices, MDS2 forms, risk assessment, patch policy with the vendor's role, system hardening, network segmentation, antivirus, physical security, vendor remote access control); operating system life expectancy and legacy devices; the Wireless Medical Telemetry Service and spectrum coordination; working with IT and the security officer; incident response basics.
- u3l10 `Emergency Preparedness and Continuity for HTM: Downtime, Utility Failure, Disaster Plans` (RSK-A, 9). Covers: HTM's role in the emergency operations plan; critical equipment lists; utility failure (power, medical gas, water, HVAC, network) and the equipment that depends on each; UPS and generator inventories; downtime procedures and recovery; surge capacity; drills and after-action reviews; business continuity for the CMMS itself.

- [ ] **Step 3: Write `courses/chtm/deep-1.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u1l3 a full variance report; u1l4 a small balance sheet and income statement; u1l5 an ROI and payback worked twice; u2l2 a contract term checklist; u3l5 an FMEA worksheet with three failure modes scored and ranked; u3l6 the reporting table (who reports what to whom, and when, as the guide states).

- [ ] **Step 4: Write `courses/chtm/questions-1.js`** (5 per lesson, 110 total)

Management scenarios. Financial questions use clean numbers with the arithmetic in the explanation. Risk questions ask for the FIRST step, the right tool, or the right report. Then run `node tests/balance-keys.js courses/chtm/questions-1.js`.

- [ ] **Step 5: Validate and commit**

```bash
node tests/packcheck.js courses/chtm && node tests/acronyms.js courses/chtm 2>&1 | tail -2
git add courses/chtm/curriculum-1.js courses/chtm/deep-1.js courses/chtm/questions-1.js courses/chtm/acronyms.js
git commit -m "feat(chtm): units 1 to 3: financial management, procurement and the asset lifecycle, risk and recalls and data security"
```
Expected before the commit: `packcheck: OK` with 3 units, 22 lessons, 110 questions.

---

### Task 3: Units 4 to 6 (24 lessons, 144 questions)

**Files:**
- Create: `courses/chtm/curriculum-2.js`, `courses/chtm/deep-2.js`, `courses/chtm/questions-2.js`
- Modify: `courses/chtm/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `operations`, `policy`, and `projects` sections.
- Produces: units `u4`, `u5`, `u6` (all domain 3), six questions per lesson. Task 6's manifest lists these ids; do not rename them.

Reuse: the CBET pack's `u3l5` (CMS, accreditation, AAMI EQ standards, the CMMS), `u3l7` (the accrediting bodies), `u7l5` (communication), `u8l5` (PM and documentation), `u9l1` and `u9l2` (network vocabulary) carry the vocabulary; rewrite from the manager's seat.

- [ ] **Step 1: Write `courses/chtm/curriculum-2.js`**

**Unit u4 "Service Operations and the CMMS"** (domain 3; blurb: how the work gets done, recorded, measured, staffed, and resourced; assumes units 1 and 3)
- u4l1 `Work Order Flow From Request to Closure, and Customer Satisfaction` (OPS-A, 10). Covers: the work order lifecycle (request, triage by risk and urgency, assignment, repair, verification, parts and labor recorded, closure, customer notification); service level targets by priority; customer satisfaction (surveys, rounding, complaint handling, closing the loop); what a complete record looks like and why it matters in an incident or a survey.
- u4l2 `CMMS Documentation Regardless of Ownership: Inventory, Parts, History, Recalls, End of Life` (OPS-B, 10). Covers: the CMMS as the system of record; inventory fields (identifier, model, serial, location, owner, risk score, PM schedule, warranty, contract, end of life); parts and cost records; service history; recall tracking; documenting equipment the department does not own (leased, vendor-serviced, physician-owned, rental, loaner) because the facility is still responsible; data quality audits.
- u4l3 `PM Scheduling, Completion Rates, and the Compliance Report` (OPS-B, 10). Covers: building the PM schedule from the maintenance strategy; completion rate = completed / due x 100 and what counts as completed, deferred, or could not locate; the monthly compliance report and who reads it; chasing could-not-locate devices; what a surveyor asks for (high-risk and life-support completion, documentation of missed PMs); corrective action when rates fall.
- u4l4 `Performance Data and KPIs: Productivity, Staffing, Competency, Cost Reduction` (OPS-D, 10). Covers: choosing KPIs (completion rate, repeat repairs, mean and total time to repair, backlog, uptime, customer satisfaction, cost of service ratio, labor hours per device, overtime, training hours); productivity measures and their traps; competency tracking; cost reduction programs and how to prove savings; dashboards and the monthly report.
- u4l5 `The Cost of Service Ratio and Benchmarking` (OPS-D, 9). Covers: cost of service ratio = annual service cost / acquisition cost x 100, what goes into service cost (labor, parts, contracts, overhead), reading the ratio by device type and by program; benchmarking sources and their limits; using the ratio to decide contracts, replacement, and staffing; the generator's cost of service questions come from this lesson.
- u4l6 `Staffing and Scheduling Requirements` (OPS-E, 9). Covers: workload from the inventory (devices, risk, PM hours, repair history), hours per device and devices per technician as planning numbers, skill mix (technicians, specialists, imaging, IT), scheduling (shifts, on-call, coverage for leave), the staffing justification to leadership, the cost of a biomed as loaded salary.
- u4l7 `Resources: PPE, Tools, Test Equipment, Supplies, Technical Information` (OPS-G, 9). Covers: ensuring resources are available to do the work (PPE and its program, tools and tool control, test equipment inventory and calibration schedule, supplies and consumables, technical information such as service manuals and vendor portals, training); budgeting for them; what a missing resource does to compliance and safety.
- u4l8 `Electronic Data Management of Computerized Assets: Backups, Security, Patching, Updates` (OPS-M, 9). Covers: the manager's responsibility for computerized assets (device software, servers the department runs, the CMMS itself); backups and restore tests; security (accounts, passwords, access control); patching and update policy with vendor coordination; change control; documenting software versions in the CMMS.
- u4l9 `Alternative Equipment Maintenance Programs and How to Document Them` (OPS-B, 10). Covers: what an alternative equipment maintenance program is (deviating from manufacturer recommendations where risk allows), what regulators permit and exclude (imaging, radiologic, laser, and devices the manufacturer or law requires at a set interval), the evidence required (history, risk assessment, qualified personnel), documenting the program in the medical equipment management plan, reviewing it annually, what a surveyor asks.

**Unit u5 "Policy, Regulators, and Accreditation"** (domain 3; blurb: the plan, the procedures, the committees, and the regulators that judge the program; assumes unit 4)
- u5l1 `The Medical Equipment Management Plan` (OPS-E, 10). Covers: the plan's required contents (scope and objectives, inventory inclusion criteria, risk and maintenance strategies, inspection and PM, incident and recall response, emergency procedures, training, performance monitoring, annual evaluation); writing and maintaining it; the annual evaluation and the committee that approves it; how the plan ties to the environment of care program.
- u5l2 `SOPs and the Environment of Care Manual` (OPS-E, 9). Covers: standard operating procedures (format, approval, review cycle, training against them), the environment of care manual and HTM's chapters, document control, how procedures prove compliance in a survey, what a missing or outdated procedure costs.
- u5l3 `Goals, Objectives, and Reporting to Committees: EOC, Patient Safety, Risk, Performance Improvement, Radiation Safety, Infection Control` (OPS-E, 10). Covers: setting measurable goals and objectives for the department, the metrics behind them, the reporting calendar, what each committee wants from HTM (environment of care: equipment management plan performance; patient safety: incidents; risk management: FMEA and investigations; performance improvement: KPI trends; radiation safety: imaging PM and dose programs; infection control: cleaning and disinfection, water systems, endoscope reprocessing equipment), presenting to a committee.
- u5l4 `CMS, Deemed Status, and the Organizations That Accredit on Its Behalf` (OPS-F, 10). Covers: CMS conditions of participation and why they matter (reimbursement), deemed status and the accrediting organizations that hold it (The Joint Commission, DNV, HFAP and the others at recognition level), the equipment-related standards they survey, state survey agencies, what HTM must show, the alternative equipment maintenance rules as CMS states them.
- u5l5 `FDA, FCC, NRC, and HIPAA Obligations of the HTM Department` (OPS-F, 10). Covers: FDA (device classification at recognition level, medical device reporting, recalls, the quality system for refurbishers); FCC (the Wireless Medical Telemetry Service, spectrum coordination, interference complaints); NRC and agreement states (radioactive materials, who holds the license, HTM's role with nuclear medicine and brachytherapy equipment); HIPAA (the privacy and security rules as they touch devices, business associate agreements, breach response); state and local requirements.
- u5l6 `Surveys: Preparing, Hosting, and Answering Findings` (OPS-F, 9). Covers: the survey cycle and unannounced surveys; the evidence binder or dashboard (inventory, completion rates, high-risk and life-support records, incident and recall files, the management plan and its evaluation, training records, test equipment calibration); tracer methodology and how a surveyor follows a device; hosting (who speaks, how to answer, what not to say); findings, the corrective action plan, evidence of completion, and timelines.

**Unit u6 "Projects, Capital Planning, and Stakeholders"** (domain 3; blurb: how a manager evaluates technology requests, runs projects, and works with everyone else; assumes unit 5)
- u6l1 `Capital Planning: Evaluating Healthcare Technology Requests` (OPS-H, 10). Covers: the capital request process and HTM's evaluation (clinical need, alternatives, total cost of ownership, service strategy, standardization, cybersecurity, regulatory, staffing and training impact); scoring and ranking requests; the capital committee; communicating the recommendation; the evaluation record.
- u6l2 `Project Feasibility: Space, Site Preparation, Power, Network` (OPS-H, 9). Covers: assessing feasibility and requirements (space and weight, site preparation, shielding, HVAC and cooling, power including dedicated circuits and UPS, water and gas, network drops and bandwidth, IT security review, delivery path); the site survey; who signs off; what a missed requirement costs.
- u6l3 `Sustainability and Service Strategy: Parts, Training, Manuals, Life Expectancy, MAUDE Reports` (OPS-H, 10). Covers: evaluating sustainability before purchase (parts availability and pricing, technician training, service manuals and software keys, life expectancy and end of support, the device's MAUDE and recall history, vendor stability); choosing the service strategy (in-house, contract, hybrid) at purchase; writing it into the contract.
- u6l4 `Standardization: the Argument and Its Limits` (OPS-H, 9). Covers: why standardize (training, parts, safety, user familiarity, contract leverage), how to advocate for it (data, clinical input, the committee), its limits (clinical specialty needs, vendor lock-in, obsolescence), standardization of accessories and consumables, the formulary idea applied to devices.
- u6l5 `Coordinating Service Providers Across the Lifecycle: Acquisition, Contracting, Installation, Training, Sustainment` (OPS-C, 10). Covers: HTM's coordination role at each lifecycle stage (acquisition review, contracting terms, installation and acceptance testing, incoming inspection, training delivery, sustainment under contract or in-house, end of life); managing internal and external providers to the same documentation standard; vendor performance reviews; escalation.
- u6l6 `Project Management: Plans, Schedules, Stakeholders, and the Sustainment Plan` (OPS-I, 10). Covers: creating and reviewing project plans (scope, schedule, budget, roles, risks, communication), coordinating activities across departments, engaging stakeholders, acceptance testing and go-live, the sustainment plan (service, training, parts, software, cybersecurity, documentation), close-out and lessons learned; project management vocabulary at recognition level (milestones, critical path, change requests).
- u6l7 `Construction Planning, Utility Interruption, Change Management, and Downtime Procedures` (OPS-L, 9). Covers: HTM in construction planning meetings (equipment moves, infection control risk assessment, interim life safety measures at recognition level); utility interruption planning (notification, affected equipment, backup power, testing after restoration); change management for system changes; downtime procedures for the CMMS, the EMR, and networked devices.
- u6l8 `Meetings, Rounding, Huddles, and Communicating with Department Leaders and Vendors` (OPS-J, 9). Covers: leading department and team meetings (agenda, decisions, actions, minutes), daily huddles, rounding on clinical units, scheduled meetings with department leaders, vendor communication (issues, escalation, performance), communication that encourages cooperation, identifies issues early, and resolves problems; documenting commitments.
- u6l9 `Collaboration with IT, Nursing, Informatics, Facilities, and Senior Leadership; Device Interoperability` (OPS-L, 10). Covers: consulting with users, management, vendors, and technicians to assess technology needs; collaboration with IT (network, security, integration), nursing (use, training, workflow), informatics (EMR integration, data), facilities (utilities, construction), materials management (purchasing, supplies), senior leadership (strategy, capital); maintaining device and system interoperability (interfaces, standards, testing after changes, who owns the interface).

- [ ] **Step 2: Write `courses/chtm/deep-2.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u4l3 a completion-rate calculation and compliance report; u4l5 the cost of service ratio for three devices; u4l6 a staffing calculation from hours per device; u5l1 the plan's table of contents; u5l6 a survey evidence checklist; u6l1 a scored capital request.

- [ ] **Step 3: Write `courses/chtm/questions-2.js`** (6 per lesson, 144 total)

Management scenarios asking for the FIRST step, the BEST recommendation, or the MOST appropriate report, committee, document, or regulator. Then run `node tests/balance-keys.js courses/chtm/questions-2.js`.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/chtm && node tests/acronyms.js courses/chtm 2>&1 | tail -2
git add courses/chtm/curriculum-2.js courses/chtm/deep-2.js courses/chtm/questions-2.js courses/chtm/acronyms.js
git commit -m "feat(chtm): units 4 to 6: service operations and the CMMS, policy and regulators and accreditation, projects and capital planning and stakeholders"
```
Expected before the commit: `packcheck: OK` with 6 units, 46 lessons, 254 questions.

---

### Task 4: Units 7 and 8 (14 lessons, 70 questions)

**Files:**
- Create: `courses/chtm/curriculum-3.js`, `courses/chtm/deep-3.js`, `courses/chtm/questions-3.js`
- Modify: `courses/chtm/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `education` and `hr` sections.
- Produces: units `u7` (domain 4) and `u8` (domain 5). Task 6's manifest lists these ids; do not rename them.

Reuse: none; all new writing. The CBET pack's `u7l5` (user training) is the only neighbour and is technician depth.

- [ ] **Step 1: Write `courses/chtm/curriculum-3.js`**

**Unit u7 "Education and Training"** (domain 4; blurb: how a manager decides what training is worth, buys it, delivers it, and proves it worked; assumes unit 4)
- u7l1 `Analyzing Training Needs: Cost, ROI, Competency, Operations, Inventory` (EDU-A, 10). Covers: the training needs analysis (asset inventory and what is coming, competency gaps, failure and repeat-repair data, customer requirements, regulatory requirements, operations impact), cost versus return on investment of a course (travel, tuition, time away, contract savings it enables), prioritizing, the training plan and budget.
- u7l2 `Measuring Training Effectiveness: Failure Rates, Total Time to Repair, Competencies, User Satisfaction` (EDU-B, 9). Covers: measures before and after training (failure rates, repeat repairs, total time to repair, first-time fix, contract calls avoided, competency assessments, user satisfaction), cost per trained technician, documenting the result, deciding whether to repeat or change a program.
- u7l3 `Technical Training: Model-Specific, Manufacturer-Provided, Negotiated Into the Purchase` (EDU-C, 9). Covers: model-specific technical training and what it unlocks (service keys, parts, documentation), negotiating training, manuals, and software access into the purchase contract, third-party schools, cross-training and succession, tracking who is trained on what in the CMMS.
- u7l4 `Regulatory, Safety, and Soft-Skills Training` (EDU-C, 9). Covers: required training (safety, infection control, hazard communication, electrical safety, radiation safety where applicable, HIPAA, cybersecurity awareness, code and regulatory compliance, internal department and facility policy), soft skills (communication, customer service, conflict, writing), annual refreshers, documentation for the surveyor.
- u7l5 `Orientation and Initial Training: Mentor, SOPs, Shop and Facility` (EDU-C, 9). Covers: the orientation plan for a new technician (facility orientation, department orientation, shop and tool control, the CMMS, SOPs, safety, assigned mentor, initial competency checklist, milestones at 30, 60, and 90 days), the probationary review, documenting initial competency.
- u7l6 `Operator Training Against Failure Trending and Use Error, and for New Equipment, Applications, and Staff` (EDU-D, 10). Covers: reading failure trends to find use error (no fault found, damaged accessories, repeated calls), facilitating operator training with clinical educators and vendors, the in-service for new equipment and new clinical applications, training for new staff and for database or configuration changes, measuring whether the calls stop, documenting attendance.
- u7l7 `Manuals and Media, and Collaboration with Non-Clinical Departments` (EDU-G, 9). Covers: assuring the availability of service manuals, operations manuals, training media, and other educational material (where they live, versions, access, vendor portals, what the contract must say), and collaboration with infection prevention (cleaning and disinfection of equipment, reprocessing devices), facilities management (utilities, construction), materials management (purchasing, consumables), and IT (networked devices, security).

**Unit u8 "Human Resources and Labor Law"** (domain 5; blurb: hiring, evaluating, developing, paying, and protecting the people who do the work; assumes nothing)
- u8l1 `Job Descriptions, Selection, Retention, and Termination` (HR-A, 10). Covers: writing a job description (duties, qualifications, physical requirements, reporting line, grade), the selection process with human resources (posting, screening, structured interviews, skills assessment, references, offers), retention (pay, development, recognition, workload, culture), termination done correctly (documentation, progressive discipline, human resources involvement, consistency, the exit).
- u8l2 `Performance Evaluations: Compensation, Organizational Values, Engagement` (HR-B, 10). Covers: the evaluation cycle, evaluating performance against goals and competencies to determine compensation, evaluating observance of organizational values and engagement, avoiding bias, writing the evaluation, the conversation, documentation.
- u8l3 `Development Plans, Competency Assessment, Certification, and Recommendations to Human Resources` (HR-B, 9). Covers: performance development plans (goals, training, timelines, review), competency assessment (initial and ongoing, by device and by skill), certification as a development goal and differentiator, making recommendations to human resources (promotion, pay, discipline, accommodation) with the evidence they need.
- u8l4 `Goals, Coaching, Mentoring, Recognition, and Conflict` (HR-C, 10). Covers: setting employee goals that are measurable, coaching conversations, mentoring programs, delivering recognition that works, managing employee conflict (listen, facts, policy, resolution, documentation), documenting improvement opportunities, periodic evaluations communicated in writing.
- u8l5 `Facilitating Change; Hearings and Investigations` (HR-C, 9). Covers: facilitating change in a department (explain why, involve staff, train, measure, recognize), resistance and how to meet it; taking part in personnel-related hearings and investigations on behalf of the organization (role, preparation, documentation, confidentiality, consistency, human resources and legal involvement).
- u8l6 `Staffing Levels, the Cost of a Biomed, Incentives, and Pay Equity` (HR-C, 9). Covers: determining staffing levels from workload and coverage, the cost of a biomed (salary, benefits, training, tools, overhead) in a justification, incentives that achieve desired results (and those that backfire), pay equity across similar roles and against the market, how to raise a pay issue with human resources.
- u8l7 `Labor Law and a Safe Workplace: ADA, EEOC, FMLA, NLRA, OSHA, and PPE` (HR-D, 10). Covers: the Americans with Disabilities Act (reasonable accommodation, essential functions), the Equal Employment Opportunity Commission (discrimination, harassment, retaliation), the Family and Medical Leave Act (protected leave, job restoration), the National Labor Relations Act (concerted activity, unions, what a manager may not do), OSHA (a safe workplace, recordkeeping, training, PPE utilization), state and local labor law, when to call human resources.

- [ ] **Step 2: Write `courses/chtm/deep-3.js`**

One deep dive per lesson above, each at least 300 words with a fenced table: u7l1 a training needs worksheet with ROI; u7l5 the 30, 60, 90 day orientation plan; u8l1 a job description outline; u8l7 the labor law table (law, what it protects, what the manager must do, what the manager must not do).

- [ ] **Step 3: Write `courses/chtm/questions-3.js`** (5 per lesson, 70 total)

Management scenarios. Labor law questions ask what the manager must do FIRST or which law applies. Then run `node tests/balance-keys.js courses/chtm/questions-3.js`.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/chtm && node tests/acronyms.js courses/chtm 2>&1 | tail -2
git add courses/chtm/curriculum-3.js courses/chtm/deep-3.js courses/chtm/questions-3.js courses/chtm/acronyms.js
git commit -m "feat(chtm): units 7 and 8: education and training, human resources and labor law"
```
Expected before the commit: `packcheck: OK` with 8 units, 60 lessons, 324 questions.

---

### Task 5: Generators

**Files:**
- Create: `courses/chtm/generators.js`

**Interfaces:**
- Produces: `FRA.generators = { u1l3, u1l5, u1l4, u4l5, u3l5 }` and `FRA.generate(lessonId)`. Each generator returns `{ id, t, q, a[4], c, e, gen: true }`.

- [ ] **Step 1: Write `courses/chtm/generators.js`** (exact content)

```js
// CHTM Academy dynamic question generators. Each returns a fresh, computed question so budget variance, return on
// investment and payback, straight-line depreciation, the cost of service ratio, and FMEA risk priority numbers never
// repeat exactly. Formulas agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const money = x => "$" + Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u1l3 budget variance ----------
  const LINES = ["parts", "service contracts", "supplies", "training", "consumables", "overtime"];
  function variance() {
    const kind = R(2);
    const line = pick(LINES); const budget = pick([20000, 25000, 40000, 50000, 60000, 80000, 120000]);
    const pct = pick([-15, -12, -10, -8, -5, 5, 8, 10, 12, 15, 20]); const actual = budget * (1 + pct / 100); const v = actual - budget;
    const fav = v < 0;
    if (kind === 0) return build("u1l3", `The ${line} line was budgeted at ${money(budget)} and the year-to-date actual is ${money(actual)}. What is the variance, and is it favorable?`,
      `${money(Math.abs(v))} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`,
      [`${money(Math.abs(v))} ${fav ? "over budget, unfavorable" : "under budget, favorable"}`, `${money(Math.abs(v) * 2)} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`, `${money(budget)} ${fav ? "under budget, favorable" : "over budget, unfavorable"}`],
      `Variance = actual minus budget = ${money(actual)} minus ${money(budget)} = ${fav ? "minus " : ""}${money(Math.abs(v))}. An expense line that comes in under budget is favorable; over budget is unfavorable.`, "var");
    return build("u1l3", `The ${line} line was budgeted at ${money(budget)}; actual spending is ${money(actual)}. What is the variance as a percent of budget?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, [`${num(-pct, 1)}%`, `${num(v / actual * 100, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`]),
      `Variance percent = (actual minus budget) / budget x 100 = (${money(actual)} minus ${money(budget)}) / ${money(budget)} x 100 = ${num(pct, 1)}%. Divide by the budget, not the actual.`, "var");
  }

  // ---------- u1l5 return on investment and payback ----------
  function roi() {
    const kind = R(2);
    const cost = pick([15000, 20000, 30000, 40000, 50000, 75000, 100000]); const saving = pick([5000, 8000, 10000, 12000, 15000, 20000, 25000]); const years = pick([3, 4, 5]);
    if (kind === 0) {
      const gain = saving * years; const r = (gain - cost) / cost * 100;
      return build("u1l5", `Bringing a device line in house costs ${money(cost)} in training and test equipment and saves ${money(saving)} a year in contract fees. What is the return on investment over ${years} years?`, `${num(r, 0)}%`,
        wrong(`${num(r, 0)}%`, [`${num(gain / cost * 100, 0)}%`, `${num(saving / cost * 100, 0)}%`, `${num((gain - cost) / gain * 100, 0)}%`, `${num(r / years, 0)}%`]),
        `ROI = (gain minus cost) / cost x 100. Gain over ${years} years = ${money(saving)} x ${years} = ${money(gain)}; (${money(gain)} minus ${money(cost)}) / ${money(cost)} x 100 = ${num(r, 0)}%.`, "roi");
    }
    const pb = cost / saving;
    return build("u1l5", `A program costs ${money(cost)} up front and saves ${money(saving)} a year. What is the payback period?`, `${num(pb, 1)} years`,
      wrong(`${num(pb, 1)} years`, [`${num(saving / cost, 2)} years`, `${num(pb * 12, 0)} years`, `${num(pb / 2, 1)} years`, `${num(pb + 1, 1)} years`]),
      `Payback period = cost / annual savings = ${money(cost)} / ${money(saving)} = ${num(pb, 1)} years. ROI tells you how much; payback tells you how soon.`, "roi");
  }

  // ---------- u1l4 straight-line depreciation ----------
  function depreciation() {
    const kind = R(2);
    const cost = pick([24000, 36000, 48000, 60000, 90000, 120000, 150000]); const salvage = pick([0, 2000, 4000, 6000, 10000]); const life = pick([5, 6, 7, 8, 10]); const annual = (cost - salvage) / life;
    if (kind === 0) return build("u1l4", `A device cost ${money(cost)}, has a ${life}-year useful life, and a salvage value of ${money(salvage)}. What is the annual straight-line depreciation?`, `${money(annual)} per year`,
      wrong(`${money(annual)} per year`, [`${money(cost / life)} per year`, `${money((cost + salvage) / life)} per year`, `${money(annual * 2)} per year`, `${money(cost - salvage)} per year`]),
      `Straight-line depreciation = (cost minus salvage) / useful life = (${money(cost)} minus ${money(salvage)}) / ${life} = ${money(annual)} per year.`, "dep");
    const n = pick([1, 2, 3, 4].filter(y => y < life)); const book = cost - annual * n;
    return build("u1l4", `A device cost ${money(cost)} with a ${life}-year life and ${money(salvage)} salvage, depreciated straight-line. What is its book value after ${n} year${n > 1 ? "s" : ""}?`, money(book),
      wrong(money(book), [money(cost - cost / life * n), money(annual * n), money(cost - annual), money(salvage)]),
      `Annual depreciation = (${money(cost)} minus ${money(salvage)}) / ${life} = ${money(annual)}. Book value = cost minus accumulated depreciation = ${money(cost)} minus ${money(annual * n)} = ${money(book)}.`, "dep");
  }

  // ---------- u4l5 cost of service ratio ----------
  const DEVICES = ["an anesthesia machine", "a CT scanner", "a patient monitor fleet", "an infusion pump fleet", "a ventilator", "an ultrasound system", "a sterilizer"];
  function csr() {
    const kind = R(2);
    const acq = pick([40000, 80000, 120000, 250000, 500000, 1200000]); const pct = pick([3, 4, 5, 6, 8, 10, 12, 15]); const svc = acq * pct / 100;
    if (kind === 0) return build("u4l5", `${pick(DEVICES).replace(/^./, c => c.toUpperCase())} was acquired for ${money(acq)} and costs ${money(svc)} a year in labor, parts, and contracts. What is its cost of service ratio?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, [`${num(acq / svc, 1)}%`, `${num(pct * 10, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`]),
      `Cost of service ratio = annual service cost / acquisition cost x 100 = ${money(svc)} / ${money(acq)} x 100 = ${num(pct, 1)}%.`, "csr");
    const acq2 = pick([60000, 100000, 300000, 800000].filter(a => a !== acq)); const pct2 = pick([3, 4, 5, 6, 8, 10, 12, 15].filter(p => p !== pct)); const svc2 = acq2 * pct2 / 100;
    const higher = pct > pct2 ? "A" : "B";
    return build("u4l5", `Device A: acquired for ${money(acq)}, ${money(svc)} a year to service. Device B: acquired for ${money(acq2)}, ${money(svc2)} a year to service. Which has the higher cost of service ratio?`, `Device ${higher}, at ${num(Math.max(pct, pct2), 1)}% against ${num(Math.min(pct, pct2), 1)}%`,
      [`Device ${higher === "A" ? "B" : "A"}, at ${num(Math.min(pct, pct2), 1)}% against ${num(Math.max(pct, pct2), 1)}%`, `Device ${svc > svc2 ? "A" : "B"}, because it costs more per year in dollars`, `They are equal, because the ratio ignores acquisition cost`],
      `Ratio A = ${money(svc)} / ${money(acq)} = ${num(pct, 1)}%; ratio B = ${money(svc2)} / ${money(acq2)} = ${num(pct2, 1)}%. The ratio compares service cost to what the device cost, so the bigger dollar figure is not always the worse ratio.`, "csr");
  }

  // ---------- u3l5 FMEA risk priority number ----------
  const MODES = ["battery fails during transport", "alarm volume set too low", "infusion rate entered in the wrong units", "pump door seal leaks", "network drop loses the worklist", "cable insulation cracks"];
  function fmea() {
    const kind = R(2);
    const s = pick([3, 5, 6, 7, 8, 9, 10]); const o = pick([2, 3, 4, 5, 6, 7]); const d = pick([2, 3, 4, 5, 6, 8]); const rpn = s * o * d;
    if (kind === 0) return build("u3l5", `In an FMEA, the failure mode "${pick(MODES)}" scores severity ${s}, occurrence ${o}, and detection ${d}. What is its risk priority number?`, String(rpn),
      wrong(String(rpn), [String(s + o + d), String(s * o), String(s * d), String(rpn * 2), String(o * d)]),
      `Risk priority number = severity x occurrence x detection = ${s} x ${o} x ${d} = ${rpn}. The three scores multiply; they are not added.`, "fmea");
    const s2 = pick([3, 5, 6, 7, 8, 9, 10]); const o2 = pick([2, 3, 4, 5, 6, 7]); const d2 = pick([2, 3, 4, 5, 6, 8]); let rpn2 = s2 * o2 * d2;
    if (rpn2 === rpn) rpn2 = rpn + 1;
    const first = rpn > rpn2 ? "the first" : "the second";
    const m1 = pick(MODES); let m2 = pick(MODES); if (m2 === m1) m2 = MODES[(MODES.indexOf(m1) + 1) % MODES.length];
    return build("u3l5", `Two failure modes: "${m1}" scores ${s} / ${o} / ${d} and "${m2}" scores ${s2} / ${o2} / ${d2} (severity / occurrence / detection). Which gets attention first?`, `${first.replace(/^./, c => c.toUpperCase())}, with a risk priority number of ${Math.max(rpn, rpn2)}`,
      [`${(rpn > rpn2 ? "The second" : "The first")}, with a risk priority number of ${Math.min(rpn, rpn2)}`, `${s >= s2 ? "The first" : "The second"}, because severity alone decides the order`, `Neither, because both must be fixed before any scoring`],
      `RPN = severity x occurrence x detection: ${s} x ${o} x ${d} = ${rpn} and ${s2} x ${o2} x ${d2} = ${rpn2 === s2 * o2 * d2 ? rpn2 : rpn2}. The higher number is addressed first; severity alone does not decide, though a very high severity is often reviewed regardless.`, "fmea");
  }

  FRA.generators = { u1l3: variance, u1l5: roi, u1l4: depreciation, u4l5: csr, u3l5: fmea };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
```

- [ ] **Step 2: Smoke-test**

Run: `node tests/gen-smoke.js courses/chtm 500`
Expected: five generators, 0 problems. If a problem names a generator, a distractor list produced a duplicate for some combination; add one more candidate to that list rather than relaxing the test.

- [ ] **Step 3: Commit**

```bash
git add courses/chtm/generators.js
git commit -m "feat(chtm): generators for budget variance, ROI and payback, straight-line depreciation, the cost of service ratio, and FMEA risk priority numbers"
```

---

### Task 6: Manifest, course page, catalog, build list, loaders, analytics, and the first full build

**Before this task:** the controller merges the CRES branch into `main` and rebases `chtm-academy` onto it (`git rebase main` on this branch). The edits below assume the CRES wiring is present (a `cres/` card in the catalog, `cres` in every list). If the rebase shows the CRES wiring is absent, stop and report BLOCKED.

**Files:**
- Create: `courses/chtm/course.js`, `chtm/index.html`
- Modify: `index.html` (catalog card, JSON-LD, descriptions), `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md`

**Interfaces:**
- Consumes: every pack file from Tasks 1 to 5.
- Produces: `dist/chtm.html`, `dist/chtm-cheatsheet.pdf`, `dist/site/chtm/`, the catalog card at `chtm/`, the account page row, the sitemap entries.

- [ ] **Step 1: Write `courses/chtm/course.js`** (exact content)

```js
// CHTM Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "chtm",
  name: "CHTM Academy",
  short: "CH",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "AAMI / ACI", title: "Certified Healthcare Technology Manager", code: "CHTM", questions: 100, minutes: 120, passPct: 70 },
  description: "Self-paced Certified Healthcare Technology Manager (CHTM) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CHTM Study Guide and Practice Tests | CHTM Academy",
    h1: "CHTM Study Guide and Practice Tests",
    intro: "CHTM Academy is a free study guide and practice-test course for the AAMI/ACI Certified Healthcare Technology Manager exam. Sixty lessons follow the exam's five domains from the manager's seat, a printable CHTM cheat sheet collects the financial formulas, risk tools, operations metrics, regulators, and labor laws worth memorizing, and every practice test is built from the exam's domain weights.",
    phrases: ["CHTM study guide", "CHTM practice tests", "CHTM exam questions", "healthcare technology manager certification"],
    faq: [
      { q: "How many questions are on the CHTM exam?", a: "100 multiple-choice questions in 2 hours, closed book, with an on-screen calculator and notepad. ACI sets the cut score with a criterion-referenced method and does not publish it; this course's official-format test uses 70%." },
      { q: "When is the CHTM offered?", a: "Twice a year, May 1 to 15 and November 1 to 15, at computer-based test centers. Applications open about three months before each window." },
      { q: "Who is eligible for the CHTM?", a: "One of five pathways. The common one is a current CCE, CBET, CRES, or CLES plus at least three years as an HTM supervisor or manager in the last five; our CBET Academy and CRES Academy courses prepare for two of those credentials. The others are the Department of Defense BMET program plus three years of supervision, an associate degree in biomedical technology, a related healthcare discipline, IT, or business plus three years, a bachelor's degree or higher in those fields plus two years as a manager, or seven years in HTM with three in management. Pathways without the supervisor or manager title need an attestation of management duties." },
      { q: "How much does the CHTM cost?", a: "In 2026 the exam is $490 for AAMI members and $565 for non-members; a retake is $440 or $515. Certification is renewed every three years with continuing education." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length test in the real exam's format at the real passing score." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Financial Management", short: "Financial", pct: 20, quota: 10 },
    { id: 2, name: "Risk Management", short: "Risk", pct: 16, quota: 8 },
    { id: 3, name: "Operations Management", short: "Operations", pct: 40, quota: 20 },
    { id: 4, name: "Education and Training", short: "Education", pct: 11, quota: 6 },
    { id: 5, name: "Human Resources", short: "HR", pct: 13, quota: 6 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CHTM cut score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l3", "u1l5", "u2l1", "u2l2", "u1l2", "u1l4", "u1l6", "u2l3", "u2l4", "u2l5", "u2l6"],
    2: ["u3l1", "u3l4", "u3l5", "u3l7", "u3l2", "u3l3", "u3l6", "u3l8", "u3l9", "u3l10"],
    3: ["u4l1", "u4l2", "u4l3", "u4l4", "u5l1", "u5l4", "u6l1", "u6l3", "u6l6", "u4l5", "u4l6", "u4l7", "u4l8", "u4l9", "u5l2", "u5l3", "u5l5", "u5l6", "u6l2", "u6l4", "u6l5", "u6l7", "u6l8", "u6l9"],
    4: ["u7l1", "u7l2", "u7l6", "u7l3", "u7l4", "u7l5", "u7l7"],
    5: ["u8l1", "u8l2", "u8l7", "u8l3", "u8l4", "u8l5", "u8l6"]
  },
  core: {
    1: ["u1l1", "u1l3", "u1l5", "u2l1", "u2l2"],
    2: ["u3l1", "u3l4", "u3l5", "u3l7"],
    3: ["u4l1", "u4l2", "u4l3", "u4l4", "u5l1", "u5l4", "u6l1", "u6l3", "u6l6"],
    4: ["u7l1", "u7l2", "u7l6"],
    5: ["u8l1", "u8l2", "u8l7"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CHTM results as pass or fail and publishes no cut score. This course's official-format test uses 70%, the same bar as our CBET and CRES courses.",
  examDay: [
    "100 questions in 2 hours, closed book, with an on-screen calculator and notepad. That is over a minute per question; the arithmetic items are few and worth doing carefully.",
    "Some questions are unscored trial items. A question that seems to be from nowhere may be one of them; answer it and move on.",
    "Read for the qualifier: FIRST, MOST appropriate, BEST. The manager's answer is usually the one that measures, documents, and escalates through the right committee, not the one that fixes the device.",
    "Know the formulas and the names cold: variance, ROI and payback, depreciation, the cost of service ratio, the risk priority number, the Safe Medical Devices Act, the committees, the regulators, and the labor laws.",
    "Eligibility is checked when you apply: a current technician credential plus three years as an HTM supervisor or manager in the last five is the common pathway. Apply early; the windows are May 1 to 15 and November 1 to 15.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Budget variance, return on investment and payback period, straight-line depreciation, the cost of service ratio, and FMEA risk priority numbers are generated fresh every time.",
  legacyStoreKeys: []
};
```

- [ ] **Step 2: Create `chtm/index.html`** (exact content, after comparing the engine list with `cres/index.html` and adding any engine file that shell loads which this list lacks)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CHTM Academy</title>
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="description" content="Self-paced Certified Healthcare Technology Manager (CHTM) exam prep with adaptive training and practice exams.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../engine/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="../courses/chtm/course.js"></script>
  <script src="../courses/chtm/curriculum-1.js"></script>
  <script src="../courses/chtm/curriculum-2.js"></script>
  <script src="../courses/chtm/curriculum-3.js"></script>
  <script src="../courses/chtm/questions-1.js"></script>
  <script src="../courses/chtm/questions-2.js"></script>
  <script src="../courses/chtm/questions-3.js"></script>
  <script src="../courses/chtm/acronyms.js"></script>
  <script src="../courses/chtm/cheatsheet.js"></script>
  <script src="../courses/chtm/deep-1.js"></script>
  <script src="../courses/chtm/deep-2.js"></script>
  <script src="../courses/chtm/deep-3.js"></script>
  <script src="../courses/chtm/generators.js"></script>
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

`tests/loaders.js`: add `'chtm'` after `'cres'` in `SHELLS`.

`tests/acronyms.js`: add `chtm: /\bCHTM\b|\bCHTM Academy\b/` to `COURSE_NAMES`. Then run `node tests/acronyms.js` with no argument; if an existing pack's glossary entry text names CHTM (the credential ladder entries in the BMET, CBET, or CRES glossaries are the likely places), reword that entry to say "the healthcare technology manager credential" instead, the same rule those packs already follow for the other courses.

`tests/analytics.js`: add `'chtm.html'` after `'cres.html'` in `pages`.

`tests/catalog.js`: the AAMI check becomes `under('aami').join(',') === 'cbet/,cres/,chtm/'` (and its label "CBET, CRES, and CHTM sit under AAMI certifications"); the card count becomes `cards.length === 8`.

Run: `node tests/catalog.js 2>&1 | grep FAIL`
Expected: the AAMI check and the eight-card check FAIL.

- [ ] **Step 4: Catalog card, JSON-LD, descriptions**

In `index.html`, inside `<section class="cat" id="aami">`, after the CRES card's closing `</div>` and before the `</div>` that closes `.cards`, insert:

```html
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="chtm/">CHTM Academy</a></h3>
          <p>AAMI Certified Healthcare Technology Manager, for the supervisor or manager who runs the shop. 60 lessons on budgets, contracts, risk, operations, regulators, projects, training, and people, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="chtm/">Start the course</a>
          <span class="links"><a href="chtm/lessons/">Read free lessons</a> &middot; <a href="chtm/practice-test/">Practice test</a> &middot; <a href="chtm/cheatsheet/">Cheat sheet</a></span>
        </div>
```

In the JSON-LD `ItemList` insert after the CRES item and renumber the items that follow:

```json
      {"@type":"ListItem","position":4,"name":"CHTM Academy: AAMI Certified Healthcare Technology Manager","url":"https://fieldreadyacademy.com/chtm/"},
```

In the `description` meta and the `og:description` meta change `the AAMI CBET and CRES,` to `the AAMI CBET, CRES, and CHTM,`.

- [ ] **Step 5: Build list, stage list, README**

`build.py`: `CATALOG_ORDER = ["bmet", "cbet", "cres", "chtm", "netplus", "secplus", "aplus1", "aplus2"]`

`scripts/stage.sh`: add `chtm` after `cres` in the course loop, and the comment "the seven course bundles" to "the eight course bundles".

`README.md` line 5: add **CHTM Academy** (AAMI Certified Healthcare Technology Manager, 60 lessons) after the CRES entry in the live-courses list.

- [ ] **Step 6: Run everything**

```bash
npm test 2>&1 | tail -5
python build.py
node site/build-site.js
```
Expected: every suite passes (selftest now includes `chtm`; loaders audits eight shells; catalog sees three AAMI cards; summary and account include the chtm row). `dist/chtm.html`, `dist/site/chtm/index.html` (the landing page with the five pathways and the links to `/cbet/` and `/cres/`), `dist/site/chtm/practice-test/index.html`, `dist/site/chtm/lessons/index.html` with fifteen lesson pages, and `dist/site/chtm/cheatsheet/index.html` exist; `dist/site/sitemap.xml` gained the chtm URLs.

- [ ] **Step 7: Cheat sheet PDF and page count**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/dist/chtm-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/chtm/index.html#cheatsheet"
python -c "import fitz; print(len(fitz.open('dist/chtm-cheatsheet.pdf')), 'pages')"
```
Expected: about 12 pages (record the count in the Status section; up to 15 is acceptable).

- [ ] **Step 8: Commit**

```bash
git status --short dist | head
git add courses/chtm/course.js chtm/index.html index.html tests/catalog.js tests/loaders.js tests/acronyms.js tests/analytics.js build.py scripts/stage.sh README.md dist/chtm.html dist/chtm-cheatsheet.pdf dist/index.html dist/account.html dist/site
git commit -m "feat(chtm): manifest and course page; catalog card; build, stage, loaders, analytics, and acronym lists; first build, static pages, and cheat sheet PDF"
```
(`dist/site/serviceforge/` is git-ignored; every other changed `dist` file is tracked and belongs in this commit.)

---

### Task 7: Reference and outline coverage checks

Blake's rule: no pack is done until it is term-checked against the reference material on disk, while staying original. Three checks (spec section 3). Results are recorded in this plan's Status section.

**Files:**
- Create: `scripts/termcheck_chtm.py`
- Modify: whichever `courses/chtm/*.js` files have gaps; this plan's Status section

**Interfaces:**
- Consumes: `E:\CERT GUIDES\CHTM\AAMI CHTM Study Guide (Lynch, 2016).pdf`, every other PDF under `E:\CERT GUIDES\CHTM\` (today the CMS equipment maintenance memo and 21 CFR Part 803), the pack.
- Produces: three printed check reports.

- [ ] **Step 1: Write `scripts/termcheck_chtm.py`** with the Write tool (exact content; a sibling of `scripts/termcheck_cres.py`)

```python
# Coverage checker for the CHTM pack: three independent checks that the pack's text covers the terms
# the reference sources say it should, while the pack stays original.
#   CHECK 1 - the AAMI CHTM study guide: table-of-contents entries (pages 3 and 4) and bold headings (pages 5 to 52).
#   CHECK 2 - the supplementary public documents beside the guide (the CMS equipment maintenance memo,
#             21 CFR Part 803, and any other PDF added later): bookmarks, section titles, and bold headings.
#   CHECK 3 - every named example in the AAMI/ACI CHTM content outline.
# Usage: python scripts/termcheck_chtm.py (run from the repo root).
import re, glob, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path("E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/courses/chtm")
GUIDE_PDF = "E:/CERT GUIDES/CHTM/AAMI CHTM Study Guide (Lynch, 2016).pdf"
SUPP_PDFS = sorted(p for p in glob.glob("E:/CERT GUIDES/CHTM/*.pdf") if "CHTM Study Guide" not in p)

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"analys", "analyz"),
      (r"maximis", "maximiz"), (r"minimis", "minimiz"), (r"organis", "organiz"),
      (r"standardis", "standardiz"), (r"recognis", "recogniz"), (r"utilis", "utiliz"),
      (r"prioritis", "prioritiz"), (r"\bprogramme", "program")]

def stem(w):
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w[-3:] in ("ses", "xes", "zes") or len(w) > 5 and w[-4:] in ("ches", "shes"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w

def norm(s):
    s = s.lower().replace("\u2019", "'").replace("\u00a0", " ")
    for a, b in UK:
        s = re.sub(a, b, s)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return " ".join(stem(w) for w in s.split())

NTEXT = " " + norm(raw) + " "

def has(term):
    t = norm(term)
    return (" " + t + " ") in NTEXT if len(t) >= 3 else True

STOP = set("and the of in for a an to with as vs on or by at from how what is".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()

# ---------------------------------------------------------------- CHECK 3
# Every named example in the CHTM content outline (2026 handbook, pages 22 to 24).
OUTLINE = """business justification; return on investment; general ledger; supplies; payroll; parts; consumables; contracts; training;
financial statements; business activity reports; forecasts; life expectancy; capital planning; GAAP; accounts payable;
accounts receivable; service contracts; terms and conditions; sourcing; fair market value;
patient safety; emergency preparedness; root cause analysis; incident investigation; Failure Modes and Effects Analysis;
Safe Medical Devices Act; sentinel event; PACS; EMR; networked devices; cybersecurity; physical security; patching;
system hardening; Wireless Medical Telemetry Service; network segmentation; recalls; hazards; safety advisories;
work orders; project management; customer satisfaction; CMMS; asset inventory; service history; end of life; installation;
sustainment; lifecycle management; KPIs; staffing; competencies; cost reduction; MEMP; SOPs; EOC manual; committees;
CMS; FDA; FCC; HIPAA; NRC; deemed status; PPE; tools; test equipment; technical information; site preparation; power; network;
service manuals; MAUDE; standardization; operating system life expectancy; antivirus; construction planning; rounding;
huddles; interoperability; change management; downtime procedures; backups;
training needs; failure rates; total time to repair; user satisfaction; soft skills; orientation; mentor; use error;
infection prevention; facilities management; materials management; training manuals; operations manuals;
job descriptions; retention; termination; compensation; engagement; performance development plans; coaching; mentoring;
recognition; conflict; hearings; investigations; ADA; EEOC; FMLA; NLRA; OSHA"""
terms3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss3 = [t for t in terms3 if not has(t)]
print("CHECK 3 CHTM outline terms %d, misses %d:" % (len(terms3), len(miss3)))
print("  " + (", ".join(miss3) if miss3 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1
# The AAMI guide: table-of-contents entries on pages 3 and 4, then the bold headings on pages 5 to 52.
g = fitz.open(GUIDE_PDF)
DROP1 = re.compile(r"(introduction|table of contents|appendices|additional resources|about the author|acknowledg|index|^[A-C]$|^page$)", re.I)
toc = set()
for i in (2, 3):
    for line in g[i].get_text().splitlines():
        m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{3,70}?)\s*[. ]{3,}\s*\d+\s*$", line.strip())
        if m and not DROP1.search(m.group(1)):
            toc.add(m.group(1).strip(" ."))
report("CHECK 1a AAMI guide TOC", toc)
heads = set()
for i in range(4, min(52, len(g))):
    for b in g[i].get_text("dict")["blocks"]:
        if b.get("type"):
            continue
        for l in b["lines"]:
            run = "".join(s["text"] for s in l["spans"] if "Bold" in s["font"] and s["size"] >= 10.5).strip()
            run = re.sub(r"\s+", " ", run).strip(" .:\u201c\u201d\"")
            if 3 < len(run) <= 70 and re.match(r"^[A-Za-z]", run) and not DROP1.search(run) and len(run.split()) <= 8:
                heads.add(run)
report("CHECK 1b AAMI guide bold headings (pages 5 to 52)", heads)

# ---------------------------------------------------------------- CHECK 2
# Supplementary public documents beside the guide: their bookmarks when they have them, otherwise their
# CFR section titles ("Sec. 803.xx Title") and bold headings. One report per file.
DROP2 = re.compile(r"(preface|acknowledg|references|index|about the author|bibliograph|front matter|copyright|^page \d|memorandum summary|^subject$|^from$|^to$|^ref:|^date:|^authority|^source)", re.I)
for path in SUPP_PDFS:
    d = fitz.open(path)
    terms = set()
    for level, title, page in d.get_toc():
        t = re.sub(r"\s+", " ", title).strip()
        t = re.sub(r"^\d+(\.\d+)*\s+", "", t)
        if 3 < len(t) <= 80 and not DROP2.search(t):
            terms.add(t)
    if not terms:
        for i in range(len(d)):
            for line in d[i].get_text().splitlines():
                m = re.match(r"^(?:\u00a7|Sec\.)\s*803\.\d+\s+(.{4,80}?)\.?\s*$", line.strip())
                if m:
                    terms.add(m.group(1))
            for b in d[i].get_text("dict")["blocks"]:
                if b.get("type"):
                    continue
                for l in b["lines"]:
                    run = "".join(s["text"] for s in l["spans"] if "Bold" in s["font"] and s["size"] >= 10).strip()
                    run = re.sub(r"\s+", " ", run).strip(" .:")
                    if 3 < len(run) <= 80 and re.match(r"^[A-Za-z]", run) and not DROP2.search(run) and len(run.split()) <= 10:
                        terms.add(run)
    report("CHECK 2 %s" % pathlib.Path(path).name, terms)
if not SUPP_PDFS:
    print("CHECK 2: no supplementary PDF under E:/CERT GUIDES/CHTM/ (record this in Status)")
```

- [ ] **Step 2: Run it and classify**

Run: `python scripts/termcheck_chtm.py > "<scratchpad>/chtm_check.txt"; head -8 "<scratchpad>/chtm_check.txt"`

If check 1a reports fewer than 40 entries, print pages 3 and 4 of the guide and adjust the regex to the dot-leader layout; if 1b reports fewer than 60 headings, print the span fonts of page 6 and adjust the font test; if check 2 reports fewer than 15 entries for the CFR file or fewer than 10 for the CMS memo, print that file's first page text and span fonts and adjust the section or heading test; the goal is a term list, not a perfect parser.

Rules:
- Check 3 (outline) must end with `none`. Every miss is a gap: add the exam's exact phrase to the lesson that owns the topic (and its deep dive if the topic is new there).
- Check 1 (guide): a miss is a gap when it names a financial concept, risk tool, report, regulator, operations practice, training practice, or human resources practice a manager meets (for example payback period, distributed budgeting, corporate compliance, model-specific technical training, competency assessment, pay equity); it is out of scope when it names the guide's own study advice, a worked example's proper nouns, or a resource list.
- Check 2 (the CMS memo and 21 CFR 803): the CHTM outline is the arbiter. A miss is a gap when it names a maintenance strategy rule (what an alternative equipment maintenance program may include, what evidence it needs, which equipment is excluded), a reporting duty, a deadline, or a record a user facility must keep; it is out of scope when it names a manufacturer-only or importer-only duty, a form's field name, or a definition the lessons cover in plain words.

Rerun after each fix round until check 3 is clean and checks 1 and 2 show only classified out-of-scope entries.

- [ ] **Step 3: Re-validate the pack and the suite**

```bash
node tests/packcheck.js courses/chtm && node tests/acronyms.js courses/chtm && node tests/gen-smoke.js courses/chtm 500 && npm test 2>&1 | tail -3
python build.py chtm
node site/build-site.js
```

- [ ] **Step 4: Record and commit**

Add a `## Status` section at the end of this plan: the checks' term counts, the gaps fixed (lesson id and phrase), the out-of-scope lists, and which supplementary documents were on disk.

```bash
git add scripts/termcheck_chtm.py courses/chtm docs/superpowers/plans/2026-10-14-chtm-academy.md dist/chtm.html dist/site
git commit -m "feat(chtm): coverage fixes from the outline, guide, and Wang term checks; the CHTM term checker; plan status"
```

---

### Task 8: Stage locally and close out

**Files:**
- Modify: this plan's Status section

- [ ] **Step 1: Stage without uploading**

Run: `bash scripts/stage.sh --local`
Expected: `staged N files in dist/stage` with `dist/stage/chtm/index.html` (the landing page), `dist/stage/chtm/app/index.html`, `dist/stage/chtm/practice-test/index.html`, `dist/stage/chtm/lessons/index.html`, fifteen free-lesson pages under `dist/stage/chtm/lessons/`, and `dist/stage/chtm/cheatsheet/index.html`. Check: `ls dist/stage/chtm dist/stage/chtm/lessons | head -24` and `grep -c "/cres/" dist/stage/chtm/index.html` (at least 1: the eligibility answer links the CRES course).

- [ ] **Step 2: Self-test and the site test**

Run: `node tests/selftest.js 2>&1 | grep -A3 "^chtm\|chtm:" | head -12` and `node tests/site.js 2>&1 | grep -i "chtm\|FAIL" | head`
Expected: the chtm block ends `OK` with 60 lessons and 320 or more questions; the site test passes with the chtm pages present.

- [ ] **Step 3: Record**

Update this plan's Status section (counts, PDF pages, check results, the staged file count) and commit:

```bash
git add docs/superpowers/plans/2026-10-14-chtm-academy.md
git commit -m "docs(plan): CHTM Academy status after the local stage"
```

The merge to `main`, the branch deletion, and the hand-off (Blake pushes, runs `bash scripts/stage.sh`, and the printed go-live command; then Search Console: resubmit the sitemap and request indexing on `/chtm/` and `/chtm/practice-test/`) are the controller's steps after the final review, not this task's.

---

## Self-review against the spec (done while writing)

- Spec 1 decisions: manager framing in the Global Constraints and every lesson brief; no labs, no certificate, no untested domain (five domains, `certificate` absent); pass 70 as an assumption; the five pathways with pathway 1 first and the CBET and CRES links in the FAQ; free with 15 lessons; original content; ASCII.
- Spec 2 manifest, units, lessons, core: Task 6's `course.js` carries every value from the spec table; Tasks 2 to 4 carry all 60 lessons with the spec's titles; `core` and `starterPool` match the spec's starred lessons (24 core).
- Spec 2 objective coverage: every outline letter is named by at least one lesson's `obj` or content (FIN-A u1l5, u1l6; FIN-B u1l1 to u1l4; FIN-C u2l1 to u2l6; RSK-A u3l1, u3l10; RSK-B u3l3; RSK-C u3l2, u3l4, u3l5; RSK-D u3l6; RSK-E u3l8; RSK-F u3l9; RSK-G u3l7; OPS-A u4l1; OPS-B u4l2, u4l3, u4l9; OPS-C u6l5; OPS-D u4l4, u4l5; OPS-E u4l6, u5l1 to u5l3; OPS-F u5l4 to u5l6; OPS-G u4l7; OPS-H u6l1 to u6l4; OPS-I u6l6; OPS-J u6l8; OPS-K by u6l8's content; OPS-L u6l7, u6l9; OPS-M u4l8; EDU-A u7l1; EDU-B u7l2; EDU-C u7l3 to u7l5; EDU-D u7l6; EDU-E by u7l6's content; EDU-F and EDU-G u7l7; HR-A u8l1; HR-B u8l2, u8l3; HR-C u8l4 to u8l6; HR-D u8l7; HR-E by u8l7's content). Task 7's check 3 proves the terms are present.
- Spec 3 sources and verification: Task 7 with the three checks; Wang could not be obtained (Blake, 2026-10-14), so check 2 reads the two public documents downloaded in its place (the CMS equipment maintenance memo and 21 CFR Part 803), which cover the operations rules and reporting duties Wang would have; the number rule in Global Constraints.
- Spec 4 questions (324: six on the 24 Operations lessons, five elsewhere), five generators keyed to u1l3, u1l5, u1l4, u4l5, u3l5, the nine-section sheet, acronyms in every task.
- Spec 5 site and catalog: Task 6 (shell, card after CRES, ItemList, descriptions, build and stage lists, README; the static generator discovers the course from `courses/chtm/course.js`).
- Spec 6 tests: Task 6 step 3 (catalog, loaders, acronyms, analytics); Task 7 for the term checks; Task 8 for the site test.
- Spec 7 delivery and sequencing: branch `chtm-academy` off `main`; Tasks 1 to 5 touch only `courses/chtm/`; Task 6 waits for the CRES merge and a rebase.
- No placeholders: every code step carries its content.

## Status

(filled in by Tasks 7 and 8)
