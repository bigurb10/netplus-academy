# CHTM Academy: design

Date 2026-10-14. Blake approved the decisions, the outline, and the content and delivery
sections in conversation on 2026-10-14 ("can we start the CHTM course as well?"; "Outline looks
good"; "Yes"). Source of exam facts: the ACI Certification Candidate Handbook 2026 as distilled in
`docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md` (section 3). This spec supersedes that
note's draft outline.

## 1. Decisions

- **A pure exam-prep pack**, the CBET and CRES shape: cheat sheet first, starter test, adaptive
  tutorial, 50-question practice tests, three of the last five at 80 percent, then one
  official-format test at the exam's score, recorded permanently. No labs, no certificate, no
  untested domain.
- **The reader is a manager.** The healthcare technology manager plans and directs other HTM
  staff, so every lesson teaches a decision, a document, or a number a manager produces, and the
  questions are management scenarios (a budget report, an incident, a contract renewal, a survey
  finding, a staffing decision), never bench repairs. This is the first FieldReady pack whose
  reader does not fix anything.
- **References on disk:** the AAMI *CHTM Study Guide* (Lynch, 2016; `E:\CERT GUIDES\CHTM\AAMI CHTM
  Study Guide (Lynch, 2016).pdf`, 58 pages with a text layer, the exam sponsor's own guide), the
  ACI handbook (`E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf`, CHTM on pages 20 to
  24), the CBET-era books under `E:\CERT GUIDES\CBET\`, and two public documents downloaded on
  2026-10-14 in place of Wang's *Medical Equipment Maintenance: Management and Oversight*, which
  Blake could not obtain: the CMS survey-and-certification memo S&C 14-07 on equipment maintenance
  (`E:\CERT GUIDES\CHTM\CMS S&C 14-07 Equipment Maintenance memo.pdf`) and the medical device
  reporting regulation (`E:\CERT GUIDES\CHTM\21 CFR Part 803 Medical Device Reporting.pdf`).
  Blake chose "AAMI guide + handbook + CBET books, add Wang"; the substitution keeps the operations
  rules and reporting duties Wang would have supplied. Where the 2016 guide and the 2026 outline
  differ in wording, the outline governs.
- **Lessons follow the exam weights** (Blake: "Grow to 60 lessons"): Financial 12, Risk 10,
  Operations 24, Education 7, Human Resources 7. Question quotas follow the weights too.
- **Pass bar 70 percent** on the official-format test, stated as an assumption in `realExamNote`,
  because ACI publishes no cut score for CHTM.
- **Eligibility is said plainly.** Pathway 1 (a current CCE, CBET, CRES, or CLES plus at least
  three years as an HTM supervisor or manager in the last five) is the one our learners use, and
  the landing page links back to the CBET and CRES courses, because CHTM is their upsell. All five
  pathways appear in the FAQ.
- **Free at launch** (`freeCourse: true`, 15 free lessons), like every other course.
- **Original content only**, no reference to any book, guide, or source anywhere in the pack,
  plain words, plain ASCII in every pack file, feedback buttons on every lesson.

## 2. The course

### Manifest (`courses/chtm/course.js`)

| Field | Value |
|---|---|
| `id`, `name`, `short` | `chtm`, `CHTM Academy`, `CH` |
| `exam` | vendor `AAMI / ACI`, title `Certified Healthcare Technology Manager`, code `CHTM`, 100 questions, 120 minutes, `passPct: 70` |
| `description` | Self-paced Certified Healthcare Technology Manager (CHTM) exam prep with adaptive training and practice exams. |
| `seo.title` | CHTM Study Guide and Practice Tests \| CHTM Academy |
| `seo.h1` | CHTM Study Guide and Practice Tests |
| `seo.phrases` | CHTM study guide, CHTM practice tests, CHTM exam questions, healthcare technology manager certification |
| `seo.faq` | How many questions (100 in 2 hours, closed book, on-screen calculator; ACI sets the cut score and does not publish it; our official-format test uses 70 percent); when offered (May 1 to 15 and November 1 to 15, computer-based at Kryterion centers); who is eligible (the five pathways in plain words, pathway 1 first); cost (2026: $490 member, $565 non-member; retake $440 / $515; 2027: $510 / $590, retake $460 / $540); how many practice tests (three of the last five at 80 percent, then one full-length test at the real format); is it free (yes while the site launches); the CBET and CRES courses are linked from the eligibility answer |
| `domains` | 1 Financial Management, short `Financial`, pct 20, quota 10; 2 Risk Management, `Risk`, 16, 8; 3 Operations Management, `Operations`, 40, 20; 4 Education and Training, `Education`, 11, 6; 5 Human Resources, `HR`, 13, 6 |
| `test` | 50 questions, 55 minutes, `passPct: 80`, `passesNeeded: 3`, `passWindow: 5`, `starterPerDomain: 2`, `checkpointN: 4`, `checkpointPass: 3` |
| `starterPool`, `core` | per domain, listed in section 2 below under each unit |
| `freeCourse`, `free.lessons` | `true`, 15 |
| `realExamNote` | ACI reports CHTM results as pass or fail and publishes no cut score; this course's official-format test uses 70 percent, the same bar as our CBET and CRES courses. |
| `examDay` | 100 questions in 2 hours with a calculator; unscored trial items; read for FIRST, MOST, BEST; the manager's answer is the one that measures, documents, and escalates through the right committee; eligibility pathway 1 in one line; apply early for the May or November window; two forms of ID, arrive early |
| `generatedNote` | the generator list in section 4 |
| `feedbackEndpoint` | `https://api.fieldreadyacademy.com/v1/feedback` |
| `legacyStoreKeys` | `[]` |

The domain quotas sum to 50; Education and Human Resources both round to 6, which flattens the
11 and 13 split the same way the other packs round.

### Flow

Unchanged engine flow. Checkpoints pass on 3 of 4, drills on three in a row, sureness only on
the starter test, retraining by drill, lesson, or extended lesson, results page with Your answer /
Correct answer / Why / Review the lesson.

### Units and lessons (8 units, 60 lessons)

Lesson ids are `u<unit>l<n>`. Every lesson has a deep dive. `starterPool` lists the unit's
lessons in the order given; `core` lessons are marked with a star.

**Unit 1: Financial Management** (domain 1, 6 lessons)
1. How hospital money is organized: operating and capital budgets, cost centers, the fiscal year *
2. The HTM general ledger: supplies, payroll, parts, consumables, contracts, training
3. Budget reports and variance: reading the monthly report and explaining the gap *
4. Financial statements: balance sheet, income statement, depreciation, GAAP, accounts payable and receivable
5. Business justification and return on investment: ROI, payback period, total cost of ownership *
6. Analyzing past, present, and expected operations: trends, forecasts, development opportunities

**Unit 2: Procurement, Contracts, and the Asset Lifecycle** (domain 1, 6 lessons)
1. Life expectancy and capital replacement planning *
2. Service contracts: cost, compliance, terms and conditions *
3. Contract types and coverage levels; the in-house versus vendor decision
4. Sourcing parts, service, training, and test equipment
5. Fair market value: purchase, lease, and asset recovery on disposal
6. Advising management: the recommendation and the paper trail

**Unit 3: Risk, Recalls, and Data Security** (domain 2, 10 lessons)
1. Identifying and evaluating risk: patient safety, operations, financial, emergency preparedness, regulatory *
2. Risk scoring and the maintenance strategy it drives
3. Recommending controls: processes, procedures, and policies that mitigate risk
4. Root cause analysis and incident investigation *
5. FMEA: severity, occurrence, detection, and the risk priority number *
6. Reports that explain risk: the Safe Medical Devices Act of 1990, medical device reporting, sentinel event alerts
7. Recalls, hazards, and safety advisories *
8. Data integrity and security for PACS, the EMR, and networked devices
9. Cybersecurity oversight: patching, hardening, segmentation, WMTS, operating system life expectancy
10. Emergency preparedness and continuity for HTM: downtime, utility failure, disaster plans

**Unit 4: Service Operations and the CMMS** (domain 3, 9 lessons)
1. Work order flow from request to closure, and customer satisfaction *
2. CMMS documentation regardless of ownership: inventory, parts, history, recalls, end of life *
3. PM scheduling, completion rates, and the compliance report *
4. Performance data and KPIs: productivity, staffing, competency, cost reduction *
5. The cost of service ratio and benchmarking
6. Staffing and scheduling requirements
7. Resources: PPE, tools, test equipment, supplies, technical information
8. Electronic data management of computerized assets: backups, security, patching, updates
9. Alternative equipment maintenance programs and how to document them

**Unit 5: Policy, Regulators, and Accreditation** (domain 3, 6 lessons)
1. The medical equipment management plan *
2. SOPs and the environment of care manual
3. Goals, objectives, and reporting to committees: EOC, patient safety, risk, performance improvement, radiation safety, infection control
4. CMS, deemed status, and the organizations that accredit on its behalf *
5. FDA, FCC, NRC, and HIPAA obligations of the HTM department
6. Surveys: preparing, hosting, and answering findings

**Unit 6: Projects, Capital Planning, and Stakeholders** (domain 3, 9 lessons)
1. Capital planning: evaluating healthcare technology requests *
2. Project feasibility: space, site preparation, power, network
3. Sustainability and service strategy: parts, training, manuals, life expectancy, MAUDE reports *
4. Standardization: the argument and its limits
5. Coordinating service providers across the lifecycle: acquisition, contracting, installation, training, sustainment
6. Project management: plans, schedules, stakeholders, and the sustainment plan *
7. Construction planning, utility interruption, change management, and downtime procedures
8. Meetings, rounding, huddles, and communicating with department leaders and vendors
9. Collaboration with IT, nursing, informatics, facilities, and senior leadership; device interoperability

**Unit 7: Education and Training** (domain 4, 7 lessons)
1. Analyzing training needs: cost, ROI, competency, operations, inventory *
2. Measuring training effectiveness: failure rates, total time to repair, competencies, user satisfaction *
3. Technical training: model-specific, manufacturer-provided, negotiated into the purchase
4. Regulatory, safety, and soft-skills training
5. Orientation and initial training: mentor, SOPs, shop and facility
6. Operator training against failure trending and use error, and for new equipment, applications, and staff *
7. Manuals and media, and collaboration with non-clinical departments

**Unit 8: Human Resources and Labor Law** (domain 5, 7 lessons)
1. Job descriptions, selection, retention, and termination *
2. Performance evaluations: compensation, organizational values, engagement *
3. Development plans, competency assessment, certification, and recommendations to human resources
4. Goals, coaching, mentoring, recognition, and conflict
5. Facilitating change; hearings and investigations
6. Staffing levels, the cost of a biomed, incentives, and pay equity
7. Labor law and a safe workplace: ADA, EEOC, FMLA, NLRA, OSHA, and PPE *

Core per domain: domain 1 `u1l1 u1l3 u1l5 u2l1 u2l2`; domain 2 `u3l1 u3l4 u3l5 u3l7`; domain 3
`u4l1 u4l2 u4l3 u4l4 u5l1 u5l4 u6l1 u6l3 u6l6`; domain 4 `u7l1 u7l2 u7l6`; domain 5
`u8l1 u8l2 u8l7`.

### Objective coverage

Every lettered objective of the handbook outline is served: Financial A by u1l5 and u1l6, B by
u1l1 to u1l4, C by u2l1 to u2l6; Risk A by u3l1 and u3l10, B by u3l3, C by u3l2, u3l4, u3l5, D by
u3l6, E by u3l8, F by u3l9, G by u3l7; Operations A by u4l1, B by u4l2 and u4l9, C by u6l5, D by
u4l4 and u4l5, E by u5l1 to u5l3 and u4l6, F by u5l4 to u5l6, G by u4l7, H by u6l1 to u6l4, I by
u6l6, J and K by u6l8, L by u6l7 and u6l9, M by u4l8; Education A by u7l1, B by u7l2, C by u7l3 to
u7l5, D and E by u7l6, F and G by u7l7; HR A by u8l1, B by u8l2 and u8l3, C by u8l4 to u8l6, D and
E by u8l7. The coverage check in section 3 proves it by term.

## 3. Content sources and verification

Content is written from the handbook outline and the writer's own knowledge, never from the
guide's wording. The term check runs three ways, in a sibling of the CRES checker
(`scripts/termcheck_chtm.py`) with a PDF reader for the guide:

1. **The AAMI CHTM guide**: its table of contents (pages 3 and 4) and the bold headings on
   pages 5 to 52 (budgeting, capital and operating budgets, return on investment, payback period,
   distributed and consolidated budgeting, depreciation, budget variance, balance sheet, income
   statement, equipment disposal, replacement, repair parts, balancing risk and cost, FMEA, root
   cause analysis, HIPAA, corporate compliance, incident investigations, recalls, medical device
   reporting, the medical equipment management plan, inventory, and the operations, education, and
   human resources headings through pay equity and legal aspects of employment) must each appear
   in some lesson, deep dive, or cheat-sheet text, stemmed.
2. **The supplementary public documents** beside the guide: the CMS memo's headings (the
   alternative equipment maintenance rules and their evidence) and the section titles of 21 CFR
   Part 803 (user facility reporting duties, deadlines, records), plus any PDF added later.
3. **The handbook outline**: every lettered objective's named examples must appear in at least one
   lesson: business justification, return on investment, general ledger, supplies, payroll, parts,
   consumables, contracts, training, financial statements, business activity reports, forecasts,
   life expectancy, capital planning, GAAP, accounts payable, accounts receivable, vendor service
   contracts, terms and conditions, sourcing, fair market value, patient safety, emergency
   preparedness, root cause analysis, incident investigation, Failure Modes and Effects Analysis,
   Safe Medical Devices Act, sentinel event alerts, PACS, EMR, networked devices, cybersecurity,
   physical security, patching, system hardening, Wireless Medical Telemetry Service, network
   segmentation, recalls, hazards, safety advisories, work orders, project management, customer
   satisfaction, CMMS, asset inventory, service history, end of life, installation, sustainment,
   lifecycle management, KPIs, staffing, competencies, cost reduction, MEMP, SOPs, EOC manual,
   committees, CMS, FDA, FCC, HIPAA, NRC, deemed status, PPE, tools, test equipment, technical
   information, site preparation, power, network, service manuals, MAUDE, standardization,
   operating system life expectancy, antivirus, construction planning, rounding, huddles,
   interoperability, change management, downtime procedures, backups, training needs, failure
   rates, total time to repair, user satisfaction, soft skills, orientation, mentor, use error,
   infection prevention, facilities management, materials management, training manuals, job
   descriptions, retention, termination, compensation, engagement, performance development plans,
   coaching, mentoring, recognition, conflict, hearings, investigations, ADA, EEOC, FMLA, NLRA,
   OSHA.

Numbers in the pack come from the guide, the handbook, or arithmetic the lesson itself shows
(a worked budget, an ROI); regulatory thresholds (device reporting deadlines, retention periods)
come from the guide or are left out rather than guessed. The CBET safety list is not needed
beyond naming OSHA and PPE.

Reuse from CBET: risk and operations lessons start from the CBET pack's `u7l4`, `u7l5`, `u7l6`,
`u8l5`, `u3l5`, `u3l7`, `u9l1`, `u9l2`, `u9l5`, and `u9l7`, rewritten from the manager's seat;
financial, education, and human resources lessons are all new writing (44 percent of the pack).

## 4. Questions, generators, cheat sheet, glossary

- **Questions** (`questions-*.js`): at least five per lesson, six on the 24 Operations lessons,
  about 320 total, answer keys balanced across A to D, every question tied to a lesson, each with
  an explanation that names the reason. Stems are management scenarios that ask for the FIRST step,
  the BEST recommendation, or the MOST appropriate report, committee, or document.
- **Generators** (`generators.js`): five, all arithmetic with a defensible answer: budget variance
  (amount and percent against budget), ROI and payback period, straight-line depreciation and book
  value, the cost of service ratio (annual service cost against acquisition cost), and the FMEA
  risk priority number (severity x occurrence x detection and the ranking of two failure modes).
  `generatedNote` names them all. They reuse the `build()` and distractor helpers of the CRES and
  CBET generators.
- **Cheat sheet** (`cheatsheet.js`): 12 pages organized as the exam and eligibility; the financial
  formulas and statement lines; the risk tools (FMEA, RCA, device reporting, recalls) and the laws
  that drive them; the operations metrics (completion rate, cost of service ratio, KPIs), the
  medical equipment management plan contents, and the regulator table; the training measures and
  the human resources rules and labor laws. Printed to `dist/chtm-cheatsheet.pdf`.
- **Glossary** (`acronyms.js`): every acronym used in the pack, with the coverage test green.

## 5. Site and catalog

- `chtm/index.html` shell with the same engine loader list as `cbet/index.html` plus the pack
  files.
- Catalog card under AAMI certifications after CRES: pill Free, title `CHTM Academy`, one sentence
  naming the ACI Certified Healthcare Technology Manager and the manager audience, 60 lessons, the
  cheat sheet, adaptive tutorials, practice tests; links to the lessons, practice test, and cheat
  sheet pages. The ItemList JSON-LD gains the entry.
- `build.py`, `scripts/stage.sh`, `site/build-site.js`, `tests/` course lists, the account page,
  and the README's live-courses sentence all add `chtm`.
- The static generator produces the landing page at `/chtm/` (title, H1, and intro from the SEO
  block, the five pathways in the FAQ with links to `/cbet/` and `/cres/`), `/chtm/practice-test/`
  with twenty explained bank questions, `/chtm/lessons/` with the fifteen free lessons,
  `/chtm/cheatsheet/`, and the app at `/chtm/app/`; the sitemap picks them up.

## 6. Tests

Existing `npm test` runs on the new pack: selftest, gating, acronym coverage, loaders, site
parity, catalog, summary, merge, gen-smoke, balance-keys, analytics. Extended: `tests/catalog.js`
expects `chtm/` under `aami` after `cres/`; the loaders and analytics lists take the new id.
New: the term check and the outline coverage check run from `scripts/termcheck_chtm.py` and are
recorded in the plan's Status with their counts before the pack is called done.

## 7. Delivery order

1. This spec, committed.
2. One content plan (no engine work), the same eight-task shape as the CRES plan, executed by
   subagent-driven development on branch `chtm-academy` off `main`, cheat sheet first.
3. Sequencing against CRES: the CHTM content tasks (cheat sheet, units, generators) can run while
   CRES is in flight because they touch only `courses/chtm/`; the wiring task (manifest, shell,
   catalog, build and test lists) runs after the CRES branch has merged, rebased onto that `main`,
   so the shared catalog, build, stage, and test lists change in one order.
4. Staging through `scripts/stage.sh`; Blake pushes and deploys.

## 8. Assumptions and out of scope

- The 70 percent pass bar is an assumption; ACI publishes no cut score.
- The 2016 guide predates the 2026 outline; the outline governs wording and scope.
- Wang could not be obtained; the CMS memo and 21 CFR Part 803 stand in for it in check 2.
- No labs, no certificate, no untested domain, no aesthetic pass, no competitor-style pages, no
  CCE or CISS course; each is its own project later.
- Pricing stays free (`freeCourse: true`).
- The AAMI guide is a licensed personal-use reference; nothing from it is reproduced in the pack.

## Appendix: reference sources on disk (2026-10-14)

| File | What it is | Used for |
|---|---|---|
| `E:\CERT GUIDES\CHTM\AAMI CHTM Study Guide (Lynch, 2016).pdf` | AAMI's official CHTM study guide, 58 pages, text layer | check 1, numbers |
| `E:\CERT GUIDES\CHTM\CMS S&C 14-07 Equipment Maintenance memo.pdf` | CMS survey-and-certification memo on hospital equipment maintenance and alternative equipment maintenance programs (public) | check 2, operations rules |
| `E:\CERT GUIDES\CHTM\21 CFR Part 803 Medical Device Reporting.pdf` | the medical device reporting regulation, user facility duties and deadlines (public) | check 2, reporting numbers |
| `E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf` | ACI handbook 2026, CHTM on pages 20 to 24, fees page 33 | check 3, exam facts |
| `E:\CERT GUIDES\CBET\` | the CBET pack's references | risk and operations lessons |
