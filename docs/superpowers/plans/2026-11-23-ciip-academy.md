# CIIP Academy: the content pack

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/ciip/`, the CIIP Academy pack for the ABII Certified Imaging Informatics Professional exam: cheat sheet, 65 lessons in 10 units with deep dives, 325 questions, 5 generators, an acronym glossary, the course page, a new "Imaging informatics" catalog section, related-course links on the landing page, the reference term checks, the first build, and the deploy.

**Architecture:** A course pack is plain data: `courses/ciip/*.js` files that fill `FRA.course`, `FRA.units`, `FRA.deep`, `FRA.questions`, `FRA.generators`, `FRA.acronyms`, `FRA.cheatsheet`. The engine renders them, the self-test validates them, `build.py` bundles them, and `site/build-site.js` writes the landing, practice-test, lesson, cheat-sheet, and flashcard pages. The only code change is in `site/build-site.js`: a course may name related courses from other certifying bodies (`seo.related`), and the landing page lists them under "Related courses".

**Tech Stack:** Vanilla JS packs loaded as `<script>` tags, Node 20 + jsdom tests (`npm test`), `python build.py` bundler, PyMuPDF (`fitz`) for the reference checks, headless Chrome for the cheat sheet PDF, `scripts/stage.sh` and `scripts/go-live.sh` for the deploy.

Spec: `docs/superpowers/specs/2026-11-23-ciip-academy-design.md`.

## Global Constraints

- Course id `ciip`, name **CIIP Academy**, badge `CI`, brand FieldReady Academy. Exam: vendor `ABII`, title `Certified Imaging Informatics Professional`, code `CIIP`, 170 questions, 170 minutes, `passPct: 75`, fee `$500; retake $250`. Practice tests: 50 questions, 55 minutes, pass 80, 3 of the last 5. Free course, 15 free lessons, no labs, no certificate.
- Domains (outline order A to J as ids 1 to 10) with pct and quota: 1 Procurement 4/2; 2 Project Management 5/3; 3 Operations 12/6; 4 Communications 5/3; 5 Training and Education 4/2; 6 Image Management 18/9; 7 Information Technology 12/6; 8 Systems Management 16/8; 9 Clinical Engineering 10/5; 10 Medical Imaging Informatics 14/6. Percent sums to 100, quotas to 50.
- ABII facts (verified 2026-11-23 against `E:\CERT GUIDES\CIIP\Certification-Guide.txt` and `Seven-Point-Qualification-System.txt`): 170 questions over 10 domains; 130 scored, 40 unscored pilot items; 170 minutes (2 hours 50 minutes) plus 20 minutes for the tutorial, non-disclosure agreement, and survey; mostly single-best-answer multiple choice with some select-multiple, exhibit or video, and hot-area items; every question must be answered before the next appears, flag for review allowed; on-screen calculator; any day at a Pearson VUE center or online with a remote proctor, no testing windows; three attempts within 12 months; preliminary score on screen; scaled score 1 to 99, 75 passes, and ABII states the scaled score is not a percentage; fee $500, retake $250, re-application after a late cancel $250, Pearson VUE reschedule $10. Eligibility: at least 7 points; experience 1 to 5 (one point per 12 months as a credentialed imaging professional, a healthcare IT or informatics professional, or a military RT); academic education 0 to 5 by highest degree (1 for 30 semester credits up to 5 for a master's or doctorate) plus 1 for an imaging informatics degree; continuing education 1 to 4 (one point per 10 hours of imaging informatics CE within 18 months of applying). Renewal: 24 CE credits every two years, annual renewal fee, ten-year requirements. Any other exam fact must be looked up in those two text files, never guessed.
- The reader runs imaging systems: the PACS administrator or imaging IT analyst, often a radiologic technologist or an IT generalist changing lanes. Every lesson teaches a configuration, a calculation, a document, or a decision that person owns; every question is an informatics scenario asking for the FIRST step, the MOST likely cause, or the BEST configuration, document, or recommendation.
- Clinical depth (Blake's rule for the biomed banks applies here): anatomy, planes, positions, and what each modality does are in; diagnosis, rhythm or image reads, drug or contrast dosing, and treatment doses are out.
- Blake's content rules: original content, no reference to any book, guide, or source anywhere in the pack; cheat sheet first; plain words; every lesson has exactly 5 questions, a deep dive, and a checkpoint; feedback buttons come from the engine. Nothing from the SIIM textbook is reproduced; it is a reference the term check reads and the writer consults for depth and numbers.
- Numbers: every number in the pack comes from the ABII text files, the SIIM textbook's text dump (`E:\CERT GUIDES\CIIP\Practical-Imaging-Informatics-2e.txt`), a public standard the lesson names in plain words (a registered port, a DICOM part number), or arithmetic the lesson itself shows. To look a number up, search the text dump from a scratchpad Python script (`open(path, encoding="utf-8")`); the Bash tool cannot grep non-ASCII text reliably. A number not found in those sources is left out. Retention periods and legal thresholds that vary by state or country are described as varying.
- The longest-option rule: in every question the correct answer must not be the longest option more often than the bank allows; each `questions-N.js` file keeps its key-longest share between 19 and 26 percent. Write distractors as long and as specific as the key.
- Plain ASCII in every pack file and in this plan: `x` for multiply, `percent` or `%`, no em dashes, no curly quotes, no degree signs, no trademark symbols (write CPT, RadLex, Citrix, VMware plainly). Write content files with the Write tool, never a shell heredoc (heredocs halve backslashes).
- Lesson objects keep the line format exactly, because `build.py` reads them with regexes: the first line of every lesson is `id: "uNlM", title: "...", domain: N, obj: "...", minutes: N,`, then `body:` as a template literal, then `hook:`.
- The acronym test forbids a glossary entry from naming another course: in `courses/ciip/acronyms.js` entry text never write the literal tokens `CBET`, `CRES`, `CHTM`, `CABT`, `BMET Academy`, `Network+`, `Net+`, `Security+`, `Sec+`, or `A+`. Lesson and FAQ text may name the courses.
- Work on branch `ciip-academy` off `main` in the main checkout (`E:\CERT GUIDES\COMPTIA NET+\NetPlus Academy`). Commit after every task. Tasks 1 to 5 touch only `courses/ciip/`. Subagents run one at a time (Blake's usage cap: never more than two or three at once).
- Deploy (Task 8 only, after the merge): `bash scripts/stage.sh`, then `bash scripts/go-live.sh`, then scp the cheat sheet PDF to `/var/www/fieldready/ciip/cheatsheet.pdf`, then `git push`. Blake authorized deploys and pushes on 2026-11-23.

## Conventions every content task follows

Read these before writing any pack file. They are the contract the tests enforce.

**Mini-markup (lesson `body`, `hook`, deep dives):** `## ` heading, `- ` bullet, `1. ` step, `> ` tip line, ``` fenced block (tables; inside a JS template literal the fence is written `\`\`\``), `{{text}}` inline code, `**text**` bold. `tests/packcheck.js` requires every body to have at least 180 words, a `## ` heading, a `> ` tip line, and balanced fences; every deep dive at least 300 words with balanced fences. Every body ends with a `> Exam tip:` line.

**Curriculum file shape** (`courses/ciip/curriculum-N.js`):

```js
// CIIP Academy curriculum, units 1 to 3. Original teaching content for the ABII CIIP exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Imaging Informatics Foundations", domain: 10,
  blurb: "The order-to-report workflow and the standards every imaging system speaks: DICOM, HL7, the coding systems, and IHE.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "The Imaging Workflow From Order to Report, and Who Owns Each Step", domain: 10, obj: "J1", minutes: 10,
      body: `...`,
      hook: "..."
    }
  ]
});
```

Unit `domain` is the domain its lessons belong to. `obj` is the outline item the lesson serves, written as the domain letter and item number: `A1` to `A7`, `B1` to `B4`, `C1` to `C6`, `D1` to `D4`, `E1` to `E2`, `F1` to `F6`, `G1` to `G6`, `H1` to `H6`, `I1` to `I5`, `J1` to `J6`. Where a lesson serves several items, use the first.

**Deep file shape** (`courses/ciip/deep-N.js`): `window.FRA = window.FRA || {}; FRA.deep = FRA.deep || {}; Object.assign(FRA.deep, { u1l1: \`...\`, u1l2: \`...\` })` with one key per lesson in that file's units. Fenced tables are the house style for "what to memorize" blocks; worked examples (a storage estimate, a transfer time, an HL7 segment, a DICOM association) are the house style for this pack.

**Questions file shape** (`courses/ciip/questions-N.js`): `window.FRA = window.FRA || {}; FRA.questions = FRA.questions || []; FRA.questions.push({id:"u1l1-1",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."}, ...)`. Ids `<lesson>-<n>`, n 1 to 5. Stems are informatics scenarios, at least 20 characters; four distinct options; explanations at least 40 characters that teach the rule, not just the answer. No two stems share their first 70 characters. After writing a file run `node tests/balance-keys.js courses/ciip/questions-N.js` so correct answers spread across A to D, then check the key-longest share with:

```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync(process.argv[1],'utf8'));const q=w.FRA.questions;const n=q.filter(x=>{const L=x.a.map(s=>s.length);return L[x.c]===Math.max(...L)&&L.filter(l=>l===L[x.c]).length===1;}).length;console.log(n+'/'+q.length,(100*n/q.length).toFixed(1)+'% key-longest');" courses/ciip/questions-N.js
```
Expected: a share between 19.0% and 26.0%. Above 26, lengthen distractors (never shorten keys into vagueness) and re-run `balance-keys`.

**Acronyms** (`courses/ciip/acronyms.js`): `FRA.acronyms = { "KEY": { full, tip, more } }` plus `FRA.acronymIgnore = [...]` for uppercase words that are not acronyms (`MOST`, `FIRST`, `BEST`, `LEAST`, `NOT`, `OK`, `ON`, `OFF`, `II`, `III`, `IV`). `node tests/acronyms.js courses/ciip` must pass after every content task.

**Pack tools:** `node tests/packcheck.js courses/ciip`, `node tests/balance-keys.js <file>`, `node tests/acronyms.js courses/ciip`, `node tests/gen-smoke.js courses/ciip 500`. The full `npm test` only picks the pack up once `courses/ciip/course.js` exists (Task 6).

**What a lesson reads like.** Open with the situation the informatics professional is in (a study is missing from PACS, a radiologist complains about a hanging protocol, a new CT doubles storage growth, a vendor quotes a migration, the network team plans an outage), teach the concept in plain words, show the configuration, the message, or the worked number in a fenced table, name who else is involved, and close with what the exam asks.

**Reuse.** `courses/cres/curriculum-3.js` unit 10 (PACS, DICOM, HL7, troubleshooting), the NetPlus and SecPlus packs (networking, identity, security), and the CHTM pack's procurement, project, and training lessons are starting points to read for structure. Never copy a body; write for the informatics reader.

## File structure

Create:
- `courses/ciip/cheatsheet.js`, `courses/ciip/acronyms.js` (Task 1; acronyms grows in every later task).
- `courses/ciip/curriculum-1.js`, `deep-1.js`, `questions-1.js` (Task 2: units 1 to 3, 25 lessons, 125 questions).
- `courses/ciip/curriculum-2.js`, `deep-2.js`, `questions-2.js` (Task 3: units 4 and 5, 18 lessons, 90 questions).
- `courses/ciip/curriculum-3.js`, `deep-3.js`, `questions-3.js` (Task 4: units 6 to 10, 22 lessons, 110 questions).
- `courses/ciip/generators.js` (Task 5).
- `courses/ciip/course.js`, `ciip/index.html` (Task 6).
- `scripts/termcheck_ciip.py` (Task 7).

Modify:
- `site/build-site.js`, `tests/site.js` (Task 6: related courses from other vendors).
- `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md` (Task 6).
- This plan's Status section (Tasks 7 and 8).

---

### Task 0: Branch

- [ ] **Step 1: Create the branch from a clean main**

```bash
cd "/e/CERT GUIDES/COMPTIA NET+/NetPlus Academy"
git status --short
git checkout -b ciip-academy main
```
Expected: `git status --short` prints nothing before the checkout (if it prints files, stop and report); then `Switched to a new branch 'ciip-academy'`.

---

### Task 1: Cheat sheet and the first acronym glossary

Blake's rule: the cheat sheet comes before any lesson. Target 15 to 20 printed pages (roughly 480 to 600 lines of source).

**Files:**
- Create: `courses/ciip/cheatsheet.js`
- Create: `courses/ciip/acronyms.js`

**Interfaces:**
- Produces: `FRA.cheatsheet = { title, intro, sections: [{ id, title, blocks: [{ type: "table", cols, rows } | { type: "list", title, cols: 2, items } | { type: "note", text }] }] }` and `FRA.acronyms` + `FRA.acronymIgnore`. Later tasks add glossary keys; they never rename these section ids.

- [ ] **Step 1: Write `courses/ciip/cheatsheet.js`**

Header and shape (copy exactly, then fill the sections):

```js
// CIIP Academy memorization sheet for the ABII CIIP exam. Standards, configurations, formulas, storage and network
// terms, resilience and security rules, and the operations, procurement, and project vocabulary an imaging informatics
// professional must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CIIP Memorization Sheet",
  intro: "Print this and keep it beside you. The CIIP exam rewards recall of the DICOM and HL7 essentials, the IHE profiles and coding systems, the data-integrity checks that keep the right images with the right patient, the storage, network, and capacity arithmetic, the resilience and security rules, and the documents that run an imaging operation. Every name and number on this sheet is fair game.",
  sections: [ ... ]
};
```

Sections, in this order, with the rows each must contain (add more rows freely; never fewer; every number from the sources the Global Constraints allow):

1. `exam` "The exam itself": a facts table (certifying body ABII; 170 questions, 130 scored and 40 unscored; 170 minutes plus 20 for tutorial, agreement, and survey; question types; answer each before moving on, flag for review; calculator; Pearson VUE center or online proctor, any day; three attempts in 12 months; scaled score 1 to 99, 75 passes, not a percentage; $500 test, $250 retake); the ten domains with their scored counts (5, 7, 16, 7, 5, 23, 16, 20, 13, 18 of 130); an eligibility table (the seven-point system: experience, academic education, continuing education, minimums and maximums); a `note`: "This course's official-format test uses 75 percent. ABII's 75 is a scaled score, not a percentage, so treat 75 percent as a target, not a prediction."
2. `standards` "DICOM, HL7, IHE, and the codes": DICOM table (information model patient, study, series, instance; the UID levels; SOP class and SOP instance; service class user and provider; the core services C-ECHO, C-STORE, C-FIND, C-MOVE, C-GET, modality worklist, MPPS, storage commitment; the association and the presentation context; transfer syntaxes implicit and explicit VR little endian, JPEG lossless, JPEG 2000, and what negotiation does; the conformance statement; DICOMweb QIDO-RS, WADO-RS, STOW-RS); the configuration triplet table (AE title, IP address or host, port; the registered DICOM ports 104 and 11112); HL7 v2 table (message structure, segments MSH, PID, PV1, ORC, OBR, OBX; message types ADT, ORM or OMI, ORU, SIU, MDM, and what each carries in imaging; the ACK; the interface engine); FHIR table (resources, REST, ImagingStudy, DiagnosticReport, ServiceRequest, Patient); IHE profiles table (SWF and SWF.b, PIR, CPI, KIN, PDI, XDS-I.b, IID, REM, ATNA, CT, and what each fixes); coding systems table (ICD for diagnoses, CPT for procedures and billing, SNOMED CT for clinical terms, LOINC for observations and orders, RadLex and the RadLex Playbook for imaging terms and procedure codes).
3. `modalities` "Modalities, ancillary services, and display QC": a modality table (radiography, fluoroscopy, mammography and tomosynthesis, CT, MRI, ultrasound, nuclear medicine and PET, cardiology, radiation therapy, IR, visible light: what it produces, typical object size range from the textbook, the DICOM objects it sends, its workflow quirk); ancillary services list (oncology and tumor tracking, surgical planning and 3D printing, stereotactic, intraoperative, point of care ultrasound, wound and medical photography, digital pathology and whole-slide images); display QC table (GSDF in DICOM part 14 and what it equalizes, AAPM TG18 test patterns and what each checks, acceptance versus routine tests, who performs them, the numeric tolerances only as the textbook states them); clinical awareness list (electrical hazards, ionizing radiation and radiopharmaceuticals, MRI zones and the magnetic field, infection and biohazards, the sterile field).
4. `imagemgmt` "Image management": reading room table (ergonomics, ambient light, room layout, noise and temperature, monitor positioning); workflow table (hanging and display protocols, read-ready, postprocessing and 3D, key images and annotations, priors and relevant-prior rules); compression table (lossless versus lossy, typical lossless ratios, irreversible compression and who decides, what must never be lossy-compressed under local policy); data integrity table (technologist QC: image count, demographics, laterality; order reconciliation; storage commitment; modality worklist; merge, split, and move corrections; the unverified or broken study queue); report status table (preliminary, final, addended, corrected; structured versus narrative); research table (de-identification, the identifiers that must go, burned-in annotations, pseudonymization, teaching files); exchange table (CD import and reconciliation, PDI, cloud image exchange, XDS-I.b, export rules); archive retention list (varies by state, minors, mammography, policy owner, deletion and legal hold); enterprise imaging list (visible light, cardiology, encounter-based imaging).
5. `it` "Storage, networks, hardware, identity, data": storage table (DAS, NAS, SAN, SSD, object storage; protocols iSCSI, Fibre Channel, SATA, SMB and CIFS, NFS, S3; block versus file versus object); archive table (online, nearline, offline, tiering, IOPS, replication, mirroring, RAID levels 0, 1, 5, 6, 10 with usable capacity rules, snapshots, cloud, VNA and what makes it vendor neutral); network table (OSI layers with an example at each; TCP versus UDP; hubs, switches, routers, gateways, trunks; CAT5e, CAT6, fiber; LAN, WAN, VLAN, VPN; DNS, ARP, NAT, DHCP; firewall, TLS; common ports DICOM, HL7 MLLP, HTTP 80, HTTPS 443, SSH 22, RDP 3389, LDAP 389, LDAPS 636); bits versus bytes and the transfer-time formula; hardware table (CPU, GPU, RAM, drives, NIC, buses PCI, USB, SCSI; server and workstation roles); software table (OS, runtimes .NET and Java, browsers, RDP and VNC, virtual machines, VDI, mobile devices); identity table (Active Directory, LDAP and LDAPS, group policy, SSO with Kerberos, SAML, OAuth 2.0, two-factor authentication, RBAC); data table (SQL SELECT, WHERE, JOIN, GROUP BY; primary and foreign keys; normalization; indexes; CSV, XML, JSON, RTF, PDF).
6. `systems` "Systems management": formulas table (study size = images x rows x columns x bytes per pixel; annual storage = exams per year x average study size; compressed size = original / ratio; transfer time = size in bits / link speed in bits per second; downtime per year = (1 minus availability) x 525,600 minutes; the availability ladder 99%, 99.9%, 99.99%, 99.999% with minutes per year computed on the sheet); licensing table (subscription, perpetual, enterprise, concurrent, named user, per study); testing table (strategy, environment, test data, testers, unit, functional, integration, workflow, regression, user acceptance, stress and scalability, security; test cases, scripts, suites, results); resilience table (redundant components, high availability, clustering, load balancing, failover and failback, replication synchronous and asynchronous, RPO and RTO, business continuity versus disaster recovery, downtime procedures, the read-only and downtime viewer); monitoring table (incident reporting, dashboards, alerts, SNMP, log aggregation, protocol analysis, DICOM simulators and validators); RCA steps list (problem definition, data collection, causal factors, root causes, solution and implementation, status report); migration table (scope, strategies push and pull, big-bang and phased, prefetch, physical transfer, data cleanup and standardization, proprietary data and conversion, validation and reconciliation counts, cost, user impact, progress reports); security and privacy table (HIPAA privacy and security rules, HITECH and breach notification, GDPR, PIPEDA, the ACR-AAPM-SIIM practice parameter, NIST; physical, system, network, endpoint, application, encryption at rest and in transit, audit trails).
7. `operations` "Operations": QI table (the philosophy, PDSA, Six Sigma DMAIC, Lean and waste, SBAR, fishbone, Pareto, run and control charts); policies list (downtime, incident, backup and recovery, privacy and security, access and roles, account review); compliance table (HIPAA, HITECH, MQSA and mammography records, radiation dose tracking); change control list (request, impact, approval board, schedule, back-out plan, communication, post-change review); KPIs table (uptime, capacity used and remaining, exceptions and broken studies, unread exams, lost studies, report turnaround, interface queue depth); visualization table (pivot table, bar chart, line chart, scatter plot, dashboard: when to use each); vendor documents table (SOW, SMA, SLA with response and resolution times and uptime guarantees, renewal, end of life and end of service life).
8. `projects` "Procurement and project management": procurement table (justification with TCO and ROI, goals, scope, preliminary budget, procurement policy, governance, the plan; needs assessment; RFI, RFP, RFQ; scripted demonstrations; reference calls and site visits; scoring matrix; selection; contract development and negotiation; ROI and payback formulas); project table (goals, scope, scope change control, risks internal and external, risk register, dependencies; WBS, resources, effort estimates, milestones, critical path; Gantt chart, time-and-task tracking; status report on budget, schedule, resources, quality; go-live, retrospective, lessons learned).
9. `people` "Communications and training": roles table (CMIO, CIO, department chair, section chief, attending, resident, fellow, technologist, PACS administrator, informaticist); settings and specialties list; terminology table (directional terms, planes axial, coronal, sagittal, body positions, projections AP, PA, lateral, oblique; laterality); change communication table (who, what, when, why, how, by role; notification channels; timing); strategic planning list (aligning with the organization's plan, feedback tools, surveys); training table (needs assessment triggers, audience, objectives, delivery in person, virtual, written, video, e-learning, super-users, assessment by quiz, observation, survey, task analysis).

- [ ] **Step 2: Load the sheet in jsdom and check its shape**

Run:
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/ciip/cheatsheet.js','utf8'));const cs=w.FRA.cheatsheet;const ids=cs.sections.map(s=>s.id);console.log(ids.join(','));let rows=0,bad=0;cs.sections.forEach(s=>s.blocks.forEach(b=>{if(b.type==='table'){b.rows.forEach(r=>{rows++;if(r.length!==b.cols.length)bad++;});}else if(b.type==='list'){rows+=b.items.length;}else if(b.type!=='note'){bad++;}}));console.log('rows',rows,'bad',bad);"
```
Expected: `exam,standards,modalities,imagemgmt,it,systems,operations,projects,people` and `bad 0` with `rows` above 260.

- [ ] **Step 3: Write `courses/ciip/acronyms.js` covering the sheet**

Header:

```js
// CIIP Academy acronym glossary. Every acronym used in the lessons, deep dives, cheat sheet, and questions.
// Rendered by the engine as hover links and as the cheat sheet's Acronyms section. Keys match whole words,
// case-sensitive, plurals allowed. Original wording. Fields: full, tip (one sentence), more (longer; blank line = paragraph).
window.FRA = window.FRA || {};
FRA.acronyms = {
  "ABII": { full: "American Board of Imaging Informatics", tip: "The board that sets and awards the imaging informatics professional credential.", more: "ABII writes the test content outline, sets eligibility with its seven-point system, and reports results as a scaled score where 75 passes." },
  "CIIP": { full: "Certified Imaging Informatics Professional", tip: "The ABII credential for people who run imaging systems: 170 questions in 2 hours 50 minutes.", more: "Earned by points for experience, education, and continuing education, then the exam. Kept with 24 continuing education credits every two years." },
  "PACS": { full: "Picture Archiving and Communication System", tip: "The system that receives, stores, and displays medical images.", more: "Modalities send studies to PACS over DICOM; radiologists read from its workstations; its archive keeps the images for the retention period." },
  ...
};
FRA.acronymIgnore = ["BEST", "FIRST", "LEAST", "MOST", "NOT", "OK", "ON", "OFF", "II", "III", "IV"];
```

Run `node tests/acronyms.js courses/ciip`; add a key for every `missing:` line it prints until it passes. Expected keys at this point include at least: ABII, CIIP, PACS, RIS, EMR, EHR, VNA, DICOM, HL7, FHIR, IHE, UID, SOP, SCU, SCP, AE, MWL, MPPS, ADT, ORM, ORU, ACK, MLLP, QIDO, WADO, STOW, SWF, PIR, XDS, PDI, ICD, CPT, SNOMED, LOINC, CT, MRI, PET, US, IR, GSDF, AAPM, TG18, NAS, SAN, SSD, DAS, RAID, IOPS, iSCSI, SMB, CIFS, NFS, OSI, TCP, UDP, IP, LAN, WAN, VLAN, VPN, DNS, ARP, NAT, DHCP, TLS, CPU, GPU, RAM, NIC, PCI, USB, SCSI, OS, RDP, VNC, VM, VDI, LDAP, LDAPS, SSO, SAML, RBAC, SQL, CSV, XML, JSON, RTF, PDF, HA, DR, BC, RPO, RTO, SNMP, RCA, HIPAA, HITECH, GDPR, PIPEDA, NIST, MQSA, KPI, SOW, SMA, SLA, EOSL, TCO, ROI, RFP, WBS, CMIO, SBAR, ACR, SIIM. (Lowercase-led keys such as `iSCSI` are allowed if the test accepts them; if it does not, write the term without a glossary key.)

- [ ] **Step 4: Verify and commit**

Run: `node tests/acronyms.js courses/ciip 2>&1 | tail -2`
Expected: the pass line for `ciip` with no `missing:` or `unused` lines.

```bash
git add courses/ciip/cheatsheet.js courses/ciip/acronyms.js
git commit -m "feat(ciip): memorization sheet for the CIIP and the first acronym glossary"
```

---

### Task 2: Units 1 to 3 (25 lessons, 125 questions)

**Files:**
- Create: `courses/ciip/curriculum-1.js`, `courses/ciip/deep-1.js`, `courses/ciip/questions-1.js`
- Modify: `courses/ciip/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `standards`, `modalities`, and `imagemgmt` sections (every number and name agrees).
- Produces: units `u1` (domain 10), `u2` (domain 9), `u3` (domain 6). Task 6's manifest lists these lesson ids in `starterPool` and `core`; do not rename them.

- [ ] **Step 1: Run the pack checker on the folder to see the baseline**

Run: `node tests/packcheck.js courses/ciip`
Expected: `ciip: 0 units, 0 lessons ... cheatsheet yes` then `packcheck: OK`.

- [ ] **Step 2: Write `courses/ciip/curriculum-1.js`**

Each "covers" list is the minimum the body must teach; the outline's own example terms are written in plain text so the Task 7 check finds them. Every body opens with the informatics professional's situation and ends with a `> Exam tip:` line.

**Unit u1 "Imaging Informatics Foundations"** (domain 10; blurb: the order-to-report workflow and the standards every imaging system speaks; assumes nothing)
- u1l1 `The Imaging Workflow From Order to Report, and Who Owns Each Step` (J1, 10). Covers: order entry in the EMR, scheduling, registration and ADT, the modality worklist, acquisition, technologist QC, PACS storage, the reading worklist, reporting, results distribution, billing; which system owns each step (EMR, RIS, PACS, reporting, the interface engine); defining, implementing, and evaluating a workflow solution; workflow as the unit the exam thinks in.
- u1l2 `DICOM: the Information Model, Objects, Services, and the Conformance Statement` (J3, 11). Covers: patient, study, series, instance; UIDs at each level and why they must be unique; SOP classes and instances; service class user and provider; the association and presentation contexts; the core services (C-ECHO, C-STORE, C-FIND, C-MOVE, C-GET); the DICOM header and tags written as (group,element); DICOMweb in plain words; reading a conformance statement before a purchase.
- u1l3 `HL7 v2 and FHIR: Orders, Results, ADT, and the Messages Imaging Runs On` (J3, 11). Covers: an HL7 v2 message as segments and fields (MSH, PID, PV1, ORC, OBR, OBX); the message types imaging uses (ADT for patient events and merges, ORM or OMI for orders, ORU for results, SIU for scheduling, MDM for documents); acknowledgments; MLLP; the interface engine and its queue; FHIR resources and REST in plain words (Patient, ServiceRequest, ImagingStudy, DiagnosticReport); how HL7 and DICOM meet (the accession number, the patient ID and issuer).
- u1l4 `The Coding Systems: ICD, CPT, SNOMED CT, LOINC, and RadLex` (J3, 9). Covers: what each code set is for (ICD diagnoses, CPT procedures and billing, SNOMED CT clinical terms, LOINC observations and orderables, RadLex and its Playbook for imaging terms and procedure codes); where each appears in imaging (order, report, charge, study description); why procedure code mapping matters for hanging protocols, analytics, and exchange; code maintenance as an operations duty.
- u1l5 `IHE Integration Profiles and How to Require Them in a Purchase` (J5, 10). Covers: what IHE is (profiles built on existing standards, actors and transactions, the Connectathon, integration statements); the radiology profiles that matter most (Scheduled Workflow, Patient Information Reconciliation, Consistent Presentation of Images, Key Image Note, Portable Data for Imaging, Cross-Enterprise Document Sharing for Imaging, Invoke Image Display, Radiation Exposure Monitoring, Audit Trail and Node Authentication, Consistent Time); writing profile requirements into an RFP; reading a vendor's IHE integration statement.
- u1l6 `Systems Integration: EMR and Portals, RIS, PACS, the Enterprise Viewer, Reporting, APIs and Web Services, Scanned Documents` (J2, 10). Covers: what each system does and how they connect (HL7 interfaces, DICOM, context launch and URL integration, APIs and web services); the patient portal and image sharing; the enterprise or universal viewer; reporting systems and speech recognition; scanned documents and requisitions; enterprise image devices (dermatology, wound care, surgical video); interface ownership and testing.
- u1l7 `CAD, Postprocessing, Decision Support, Dose and Contrast Management, and Modality Structured Reports` (J2, 10). Covers: computer-aided detection for breast, lung, and prostate and how its results travel (DICOM SR, secondary capture); postprocessing software and servers; clinical decision support at order entry and at protocoling, and case comparison during interpretation; radiation dose management (dose SR, the dose registry concept) and contrast dose management; modality structured reports for ultrasound and DXA flowing into the report; artificial intelligence integration at recognition level.
- u1l8 `Critical Results, Discordant Findings, Peer Review, Clinical Analytics, the Professional Bodies, and Imaging Strategy` (J2, 10). Covers: critical and urgent results communication and closed-loop documentation; discordant findings notification (preliminary versus final); peer review workflow; clinical analytics from RIS and PACS data; the roles of ACR, AAPM, SIIM, and The Joint Commission; aligning the image management strategy with the organization's strategic plan.

**Unit u2 "Clinical Engineering"** (domain 9; blurb: what each modality produces, how a modality is connected to PACS, how displays are kept accurate, and how to stay safe around imaging equipment; assumes unit 1)
- u2l1 `Modality Workflow and Data: Radiography, Fluoroscopy, Tomography, Breast Imaging, CT, MRI, Ultrasound` (I1, 11). Covers: for each modality what it produces (images per study, matrix, bit depth, typical study size as the textbook gives it), its DICOM objects, its workflow quirks (CR versus DR, mammography's hanging and prior rules and MQSA records, tomosynthesis object sizes, CT thin and thick slices, MRI series counts, ultrasound cine and structured reports); what each change means for storage and display.
- u2l2 `Nuclear Medicine, Cardiology, Radiation Therapy, IR, Visible Light, and the Ancillary Services` (I1, 10). Covers: nuclear medicine and PET (fusion with CT, small matrices, many frames); cardiology (echo, cath, ECG waveforms, the cardiology PACS); radiation therapy objects at recognition level (RT plan, structure set, dose); IR (fluoroscopy runs, dose); visible light (endoscopy, photography); ancillary services (oncology tumor tracking, surgical planning and orthopedic templating, 3D printing, stereotactic and intraoperative imaging, point of care ultrasound and medical image capture, wound care, digital pathology and whole-slide image size).
- u2l3 `Configuring a Modality: AE Title, Port, Modality Worklist, Performed Procedure Step, Storage Commitment` (I3, 11). Covers: the AE title, IP address, and port triplet on both ends; the worklist query and the fields it fills (patient name, ID, accession, requested procedure); MPPS in-progress and completed messages and what PACS or RIS does with them; storage commitment and why the modality should not delete until it is confirmed; C-ECHO as the first test; a step-by-step configuration checklist for a new modality.
- u2l4 `DICOM Services, Objects, Transfer Syntaxes, Validation, Tools, and Other Integration` (I3, 10). Covers: the services and objects a modality and PACS negotiate; transfer syntaxes (implicit and explicit VR little endian, JPEG lossless, JPEG 2000, and what happens when no syntax matches); validation of objects against the standard; DICOM tools (echo, send, query, dump, simulators, validators, network capture) at recognition level; other integration types (secondary capture, encapsulated PDF, non-DICOM converters).
- u2l5 `Display Quality Control: the Grayscale Standard Display Function, AAPM TG18, and QA Programs` (I4, 10). Covers: why diagnostic displays must be calibrated (perceptual linearization); the GSDF in DICOM part 14; AAPM TG18 test patterns and the tests they support (luminance, uniformity, resolution, noise, geometric checks) with tolerances only as the textbook states them; acceptance testing versus routine QC; automated calibration software and remote monitoring; the QA program and its records; who signs off (the physicist, the PACS team).
- u2l6 `Clinical Awareness: Electrical Hazards, Radiation and Radiopharmaceuticals, Magnetic Fields, Infection, the Sterile Field` (I5, 9). Covers: what an informatics professional working near equipment must respect: electrical safety near patients, ionizing radiation and time, distance, shielding, radiopharmaceutical areas; MRI safety zones and the projectile hazard; infection control and cleaning devices you bring into patient areas; sterile field behavior in the operating room; who to ask before entering.

**Unit u3 "Image Management"** (domain 6; blurb: the reading room, the workflow that gets images in front of a radiologist, the checks that keep data correct, and how images are exchanged and kept; assumes units 1 and 2)
- u3l1 `The Reading Room: Ergonomics, Lighting and Environment, Room Layout` (F1, 10). Covers: ergonomics (chair, desk height, monitor distance and height, input device placement, repetitive strain); ambient light and its effect on perceived contrast; noise, temperature, and HVAC; room layout for single and shared reading, consult space, and traffic; physical considerations for power and network.
- u3l2 `The Human-Computer Interface: Displays, Input Devices, and EMR/RIS/PACS/Reporting Integration` (F2, 10). Covers: diagnostic versus clinical review displays (size, matrix, luminance, color versus grayscale); input devices (mouse, speech microphone, programmable keypads); integrating EMR, RIS, PACS, and reporting on one desktop (context synchronization, single sign-on, reading worklists); what radiologists complain about and how to measure it.
- u3l3 `Image Workflow: Hanging and Display Protocols, Read-Ready, Postprocessing, Key Images and Annotation` (F3, 11). Covers: hanging and display protocols and what drives them (procedure codes, series descriptions, priors); read-ready meaning the study is complete, correct, and prefetched; relevant-prior rules; postprocessing workflow (3D, MPR, advanced visualization servers); key image selection and annotation and how they are stored (presentation states, KIN); image acquisition and display terminology (window and level, slice thickness, matrix).
- u3l4 `Image Compression: Lossless, Lossy, Ratios, and Where Each Belongs` (F3, 9). Covers: lossless versus lossy (irreversible) compression; typical lossless ratios as the textbook gives them; who approves lossy use and for what (archives, mobile viewing, teleradiology previews); the compression transfer syntaxes; computing compressed size and storage saved; the generator's compression questions come from this lesson.
- u3l5 `Technologist QC and Exam Data Integrity: Image Counts, Order Reconciliation, Storage Commitment, the Worklist` (F3, 11). Covers: technologist QC steps (confirm the image count in PACS, demographics, laterality and markers, sending complete); data integrity checks (worklist use instead of typing, order reconciliation, storage commitment, accession matching); the exception queue (unmatched, broken, duplicate studies); merge, split, and move corrections and who may do them; audit trails of corrections; the patient safety reason behind every check.
- u3l6 `Reports and Results: Preliminary, Final, Addended; Structured Versus Narrative` (F3, 9). Covers: report statuses (preliminary, final, addended, corrected) and how each flows by HL7 to the EMR; who sees which status; structured versus narrative reporting and templates; speech recognition and its error types; results communication and the audit trail.
- u3l7 `Teaching Files, Research, Clinical Trials, and De-identification` (F3, 10). Covers: teaching file workflow; research and clinical trial image flows; de-identification (the identifiers that must go, DICOM header fields, private tags, burned-in annotations in pixel data, pseudonymization and keys); IRB at recognition level; verifying de-identification before export.
- u3l8 `Workflow Optimization and Remote Interpretation: Telehealth and Teleradiology` (F3, 10). Covers: measuring and optimizing workflow (turnaround times, worklist balancing, bottleneck analysis); remote interpretation models (home reading, teleradiology groups, night coverage); bandwidth, latency, and display requirements for remote reading; credentialing and licensing at recognition level; security for remote access.
- u3l9 `Image Exchange: Policies, Import and Reconciliation, Export, Portable Media, Cloud, Standards, Cross-Enterprise Sharing` (F4, 11). Covers: exchange policies (who may import and export, consent, retention of outside studies); CD and DVD import (PDI, reconciliation to a local order and MRN, storing as outside studies); export to portable media and cloud-based exchange; standards of file exchange (DICOM media, DICOMweb); cross-enterprise image exchange (XDS-I.b, health information exchanges, image sharing networks); data integrity during exchange.
- u3l10 `Archiving: Retention and Deletion Policies` (F5, 9). Covers: retention rules that vary by state and by patient age, mammography's longer requirements as the textbook states them, legal holds; who owns the retention policy; deletion and lifecycle management in the archive and VNA; documenting deletion; the cost argument for deleting what may legally be deleted.
- u3l11 `Enterprise Imaging: Visible Light, Radiology, Cardiology` (F6, 10). Covers: enterprise imaging as one strategy for all images; visible light imaging (pathology, dermatology, wound care, endoscopy) and its capture workflows (orders-based versus encounter-based); radiology and cardiology as the established departments; governance, metadata, and the VNA's role; the enterprise viewer.

- [ ] **Step 3: Write `courses/ciip/deep-1.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u1l2 a DICOM tag table and an association walk-through; u1l3 an annotated ORM and ORU message with fields explained; u1l5 a profile-to-problem table; u2l1 a study size table worked for three modalities; u2l3 a modality configuration checklist with a failed C-ECHO diagnosis; u3l4 a compression ratio worked example; u3l5 an exception queue walk-through (a wrong-patient study and its correction).

- [ ] **Step 4: Write `courses/ciip/questions-1.js`** (5 per lesson, 125 total)

Informatics scenarios. Configuration questions give the symptom and ask for the MOST likely cause or the FIRST check; workflow questions ask for the BEST design or policy. Then run `node tests/balance-keys.js courses/ciip/questions-1.js` and the key-longest check from the Conventions.

- [ ] **Step 5: Validate and commit**

```bash
node tests/packcheck.js courses/ciip && node tests/acronyms.js courses/ciip 2>&1 | tail -2
git add courses/ciip/curriculum-1.js courses/ciip/deep-1.js courses/ciip/questions-1.js courses/ciip/acronyms.js
git commit -m "feat(ciip): units 1 to 3: imaging informatics foundations, clinical engineering, image management"
```
Expected before the commit: `packcheck: OK` with 3 units, 25 lessons, 125 questions, and a key-longest share between 19 and 26 percent.

---

### Task 3: Units 4 and 5 (18 lessons, 90 questions)

**Files:**
- Create: `courses/ciip/curriculum-2.js`, `courses/ciip/deep-2.js`, `courses/ciip/questions-2.js`
- Modify: `courses/ciip/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `it` and `systems` sections.
- Produces: units `u4` (domain 7) and `u5` (domain 8). Task 6's manifest lists these ids; do not rename them.

- [ ] **Step 1: Write `courses/ciip/curriculum-2.js`**

**Unit u4 "Information Technology"** (domain 7; blurb: the storage, network, hardware, software, identity, and data foundations under every imaging system; assumes unit 1)
- u4l1 `Storage Types and Protocols: NAS, SAN, SSD, iSCSI, Fibre Channel, SATA, S3, SMB and CIFS, NFS` (G1, 11). Covers: DAS, NAS, SAN, and object storage; SSD versus spinning disk; block, file, and object access; the protocols (iSCSI, Fibre Channel, SATA at the drive, S3 for object, SMB and CIFS, NFS for file shares) and which imaging tier tends to use which; choosing storage for a database, an image cache, and a long-term archive.
- u4l2 `Archive Strategy: Online, Nearline, IOPS, Replication, Mirroring, Storage Metrics, Cloud, the Vendor Neutral Archive` (G1, 11). Covers: online, nearline, and offline tiers and tiering rules; data throughput and IOPS; virtualization, replication, mirroring, snapshots, and RAID levels with usable capacity; storage metrics (capacity, consumption, growth rate, months remaining); cloud storage models and egress cost; the VNA (what makes it vendor neutral, tag morphing, lifecycle management, multiple PACS feeding one archive).
- u4l3 `Network Fundamentals: the OSI Model, TCP/IP, Ethernet, Wireless, Bluetooth, Hubs, Switches, Routers, Cabling` (G2, 10). Covers: the OSI layers with an imaging example at each; TCP/IP and TCP versus UDP; ethernet, wireless, and Bluetooth; hubs, switches, routers, gateways, trunks; CAT5e, CAT6, and fiber and their typical uses; where a DICOM transfer can fail at each layer.
- u4l4 `Network Configuration: Addressing, VLAN, VPN, DNS, ARP, NAT, Firewalls, TLS, Ports, Transmission Protocols, Load Balancing, Metrics` (G2, 11). Covers: IP addressing, subnet masks and gateways at recognition level, virtual IP; LAN, WAN, VLAN, VPN; DNS, ARP, NAT, DHCP; firewalls and the ports imaging uses (DICOM 104 and 11112, HL7 over MLLP on a site-chosen port, HTTP 80, HTTPS 443, SSH 22, RDP 3389, LDAP 389, LDAPS 636); TLS; transmission protocols (DICOM, FTP, HTTP, SSH); load balancing, fault tolerance, and redundancy; network metrics (capacity, bandwidth, latency, performance, cost) and the transfer-time arithmetic; the generator's transfer-time questions come from this lesson.
- u4l5 `Hardware: CPU, GPU, Memory, Drives, NIC, Buses, Removable Media, Servers` (G3, 9). Covers: what each component does for an imaging workstation and server (GPU for 3D and display, RAM for large studies, NIC speed); motherboard connectivity (PCI, USB, SCSI, and older AGP at recognition level); removable media hardware (CD, DVD, USB drives); server hardware (rack, redundancy, power supplies); sizing a reading workstation.
- u4l6 `Software: Operating Systems, Runtimes, Browsers, Remote Tools, Virtual Machines, VDI, Mobile Devices` (G3, 10). Covers: operating systems and their support lifecycles; runtimes (.NET, Java) and why a vendor pins a version; browser-based viewers; remote system management tools (RDP, VNC) and their security; virtual machine platforms (Citrix, VMware) and VDI for clinical viewing; mobile devices and their limits for diagnostic reading.
- u4l7 `Identity and Access: Active Directory, LDAP, Group Policy, SSO, Two-Factor Authentication, RBAC` (G3, 10). Covers: Active Directory and LDAP and LDAPS; group policy; single sign-on with Kerberos, SAML, and OAuth 2.0 in plain words; two-factor authentication; role-based access control and least privilege; provisioning and deprovisioning accounts; break-the-glass access and audit.
- u4l8 `Data: SQL, Database Design, CSV, XML, JSON, RTF, PDF, and System Lifecycle Planning` (G4, 10). Covers: SQL concepts (SELECT, WHERE, JOIN, GROUP BY, COUNT) with an imaging query example; database design (primary and foreign keys, normalization, indexes, table joining, performance, maintenance); data interchange formats (CSV, XML, JSON); human-readable document formats (RTF, PDF); system lifecycle management planning (technology lifecycle, adoption, end of support).

**Unit u5 "Systems Management"** (domain 8; blurb: sizing, testing, protecting, monitoring, migrating, and securing imaging systems; assumes unit 4)
- u5l1 `Capacity Planning: Study Size and Annual Storage From Exam Counts` (H1, 11). Covers: study size = images x rows x columns x bytes per pixel, with worked CT, MR, CR, and mammography examples; exam counts by modality or procedure over a year; annual storage = exams x average size; growth and compression; the generator's storage questions come from this lesson.
- u5l2 `Scalability, Cloud Deployment, New Modalities, and Software Licensing Models` (H1, 10). Covers: scalability of database, storage, server, and network; cloud-based system deployment models (hosted, hybrid, SaaS); the impact of new modality types (256-slice CT, breast tomosynthesis) on storage and network; software licensing models (subscription, enterprise, concurrent, named user, perpetual, per study) and choosing among them.
- u5l3 `Test Planning: Strategy, Environment, Test Data, Testers, Test Types` (H2, 10). Covers: developing a test strategy; building a test environment that mirrors production; compiling test data (test patients, never real PHI without approval); identifying testers; the testing types (unit, functional, integration, workflow, regression, user acceptance, scalability and stress, security).
- u5l4 `Test Cases and Suites: Writing, Executing, Documenting, Maintaining` (H2, 9). Covers: developing test cases and scripts with expected results; grouping them into suites; executing testing and logging defects; documenting test results and sign-off; maintaining test cases and suites after every upgrade.
- u5l5 `Resilience: Redundant Components, High Availability, Failover and Failback, Replication` (H3, 10). Covers: system failure and risk analysis; redundant components; high availability and clustering; failover and failback (manual and automatic) and testing them; synchronous and asynchronous data replication; availability percentages and downtime minutes; the generator's availability questions come from this lesson.
- u5l6 `Disaster Recovery and Business Continuity: Data Protection, Downtime Policy, Recovery Objectives` (H3, 11). Covers: disaster recovery versus business continuity; data protection (backups, offsite copies, immutable copies against ransomware); recovery point and recovery time objectives; system downtime policies and downtime procedures (downtime viewers, modality local storage, paper workflows, reconciliation afterward); DR testing.
- u5l7 `Monitoring and Incidents: Reporting, Dashboards, Alerts, SNMP, Troubleshooting Tools` (H4, 10). Covers: incident reporting procedures; automated system monitoring and dashboards; alerts and thresholds; SNMP; troubleshooting and problem diagnosis (network protocol analysis, DICOM simulation, system log aggregation and analysis); a step-by-step for a study that never arrived.
- u5l8 `Root Cause Analysis and Status Reports to Management` (H4, 9). Covers: root cause analysis steps (problem definition, data collection, possible causal factors, root causes, solution recommendations and implementation); incident versus problem management; status reports to management (what, impact, cause, fix, prevention).
- u5l9 `Data Migration: Scope, Strategy, Transfer, Integrity, Correction, Proprietary Data, Cost, User Impact, Progress` (H5, 11). Covers: defining the scope of data to migrate; migration strategies (phased, big bang, prefetch-driven, archive-to-archive); physical data transfer considerations (bandwidth, throughput, windows); data standardization and integrity (tag morphing, reconciling counts); record quality identification, evaluation, and correction; system-proprietary data (presentation states, annotations, custom migration methods, conversion to a standard representation); cost and performance models; user impact; progress monitoring and reporting.
- u5l10 `Security and Privacy: HIPAA, GDPR, PIPEDA, the ACR-AAPM-SIIM Practice Parameter, NIST, Layered Security, Encryption` (H6, 11). Covers: jurisdictional laws and guidance (HIPAA in the U.S., GDPR in the EU, PIPEDA in Canada, the ACR-AAPM-SIIM practice parameter for electronic medical information privacy and security, NIST frameworks); security strategies (physical, system, network, endpoint devices, application, data encryption at rest and in transit); privacy (minimum necessary, access audits, breach response); the security risk assessment.

- [ ] **Step 2: Write `courses/ciip/deep-2.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u4l2 a RAID usable-capacity table and a storage-months-remaining calculation; u4l4 a transfer-time worked example with bits and bytes; u4l7 an RBAC role matrix for a radiology department; u4l8 a SQL query counting unread exams by modality; u5l1 a full annual storage estimate; u5l5 the availability ladder with minutes per year; u5l9 a migration plan with reconciliation counts.

- [ ] **Step 3: Write `courses/ciip/questions-2.js`** (5 per lesson, 90 total)

Informatics scenarios. Arithmetic questions use clean numbers with the arithmetic in the explanation. Then run `node tests/balance-keys.js courses/ciip/questions-2.js` and the key-longest check.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/ciip && node tests/acronyms.js courses/ciip 2>&1 | tail -2
git add courses/ciip/curriculum-2.js courses/ciip/deep-2.js courses/ciip/questions-2.js courses/ciip/acronyms.js
git commit -m "feat(ciip): units 4 and 5: information technology, systems management"
```
Expected before the commit: `packcheck: OK` with 5 units, 43 lessons, 215 questions.

---

### Task 4: Units 6 to 10 (22 lessons, 110 questions)

**Files:**
- Create: `courses/ciip/curriculum-3.js`, `courses/ciip/deep-3.js`, `courses/ciip/questions-3.js`
- Modify: `courses/ciip/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `operations`, `projects`, and `people` sections.
- Produces: units `u6` (domain 3), `u7` (domain 1), `u8` (domain 2), `u9` (domain 4), `u10` (domain 5). Task 6's manifest lists these ids; do not rename them.

- [ ] **Step 1: Write `courses/ciip/curriculum-3.js`**

**Unit u6 "Operations"** (domain 3; blurb: running an imaging informatics operation day to day: quality, policy, compliance, budget, change, metrics, and vendors; assumes units 4 and 5)
- u6l1 `Quality Improvement: Its Philosophy, Six Sigma, Lean` (C1, 10). Covers: the philosophical basis of QI (systems thinking, measure first, continuous improvement, PDSA); Six Sigma and DMAIC; Lean and the wastes, value stream mapping; applying each to an imaging problem (report turnaround, exception queue backlog).
- u6l2 `Problem Identification Tools: SBAR, Fishbone Charts, and Their Companions` (C1, 9). Covers: SBAR for clear communication of a problem; the fishbone chart and its categories; Pareto charts, run charts, five whys; choosing a tool for the problem.
- u6l3 `Policies and Procedures: Downtime, Incidents, Backup and Recovery, Privacy and Security, User Access and Roles` (C2, 10). Covers: system management policies (downtime, incidents, back-up and recovery, privacy and security); user management (account requests, roles, periodic access review, termination); writing, approving, and reviewing a policy; procedures that staff actually follow.
- u6l4 `Compliance: HIPAA, HITECH, MQSA, Radiation Dose Tracking` (C2, 10). Covers: HIPAA privacy and security rules as they touch imaging; the HITECH Act (breach notification, enforcement, meaningful use at recognition level); MQSA and the mammography records and reporting it requires; radiation dose tracking requirements and the informatics side of dose monitoring; documenting compliance.
- u6l5 `Operational Budgeting and Systems Change Control` (C3, 9). Covers: the operational budget for imaging informatics (support contracts, licenses, storage growth, staff, training); capital versus operating at recognition level; systems change control (request, impact assessment, approval board, scheduling, back-out plan, communication, post-change review).
- u6l6 `KPIs and Operational Reporting: Uptime, Capacity, Exceptions, Unread Exams, Lost Studies` (C5, 10). Covers: key performance indicators (uptime, capacity, exceptions, unread exams, lost studies, report turnaround, interface backlog); data mining methods and statistical analysis at recognition level; building an operational report and choosing its audience.
- u6l7 `Data Analytics and Visualization: Pivot Tables, Bar Charts, Scatter Plots, Dashboards` (C5, 9). Covers: information presentation; pivot tables; bar charts, line charts, scatter plots; dashboards; choosing the right visualization for the question; common misleading charts.
- u6l8 `Vendor Management: SOW, Support and Maintenance Agreements, SLAs, Renewal, End of Service Life` (C6, 10). Covers: statement of work; support and maintenance agreement; service level agreement (response and resolution times, uptime guarantees, penalties); contract renewal and using performance data at renewal; end of service life and end of life notices and planning replacement.

**Unit u7 "Procurement"** (domain 1; blurb: justifying, specifying, evaluating, and contracting for an imaging system; assumes unit 6)
- u7l1 `Defining the Project: Justification With TCO and ROI, Goals, Scope, Budget, Policies, Governance, the Plan` (A1, 10). Covers: project definition; justification with total cost of ownership and return on investment and payback; procurement goals; scope of solution; preliminary budget; procurement policies; the evaluation and selection process; governance definition; the project plan with milestones and dates; the generator's ROI questions come from this lesson.
- u7l2 `Needs Assessment, Vendor Identification, and the RFP` (A2, 10). Covers: needs assessment methods (interviews, observation, surveys, workflow analysis) with documentation, analysis, prioritization, and validation; vendor identification and qualification; RFI versus RFP versus RFQ; finalizing and distributing the procurement request; writing requirements vendors can answer.
- u7l3 `Evaluating Solutions, Demonstrations, Reference Checks and Site Visits, Selection, and the Contract` (A5, 10). Covers: information collection and analysis; scripted system demonstrations; evaluation collection and scoring matrices; client reference checks and site visits; vendor selection; contract development and negotiation (acceptance criteria, uptime, support, data ownership and exit, pricing).

**Unit u8 "Project Management"** (domain 2; blurb: running an imaging project from scope to lessons learned; assumes unit 7)
- u8l1 `Goals, Scope, Scope Change Control, Risks, and Dependencies` (B1, 10). Covers: identifying goals and scope; scope change control; identifying risks internal and external to the project; quantifying risks and defining mitigation strategies; the risk register; identifying dependencies.
- u8l2 `The Project Plan: WBS, Resources, Effort Estimates, Milestones` (B2, 10). Covers: the work breakdown structure; resource identification and effort estimates; milestones and dependencies; the critical path at recognition level.
- u8l3 `Running the Project: Gantt Charts, Time-and-Task Tracking, Status Reporting` (B3, 9). Covers: documentation of readiness, planning, initiating, executing, monitoring, and closing processes; Gantt charts; time-and-task tracking; status reporting on budget, cost, schedule, resources, and quality.
- u8l4 `Go-Live, the Retrospective, and Lessons Learned` (B4, 9). Covers: go-live readiness and the go/no-go decision; support during go-live; project completion and assessment; the project retrospective; post go-live lessons learned and how to keep them.

**Unit u9 "Communications"** (domain 4; blurb: who works in healthcare, the words they use, and how to tell them about change; assumes nothing)
- u9l1 `Healthcare Roles, Settings, and Specialties` (D1, 9). Covers: healthcare roles (CMIO, CIO, department chair, section chief, attending, resident, fellow, technologist, nurse, administrator); healthcare settings (ambulatory, academic, private practice, pediatrics, research); medical specialties that use imaging (radiology, pediatrics, orthopedics, neurology, oncology, cardiology).
- u9l2 `Medical Terminology for Informatics: Anatomy, Positions, Planes, Modality Terms` (D2, 10). Covers: anatomy, physiology, and pathology vocabulary at recognition level; directional terms; common imaging positions; imaging planes (axial, coronal, sagittal); projections; modality-specific terminology; how these terms appear in DICOM headers (laterality, body part examined, patient position).
- u9l3 `Announcing Downtime, Upgrades, and Workflow Changes: Who, What, When, Why, How, by User Role` (D3, 9). Covers: change management communications (who, what, when, why, how); notifications for downtime, upgrades, and changes in workflow; plans and techniques based on user roles (radiologists, technologists, clinicians, IT); timing and channels.
- u9l4 `Strategic Planning and Feedback: Alignment, Reporting Tools, Surveys` (D4, 9). Covers: aligning department goals with the organizational strategic plan; feedback mechanisms (reporting tools, measurement methods such as surveys); presenting to leadership.

**Unit u10 "Training and Education"** (domain 5; blurb: deciding what training a change needs, delivering it, and proving it worked; assumes unit 9)
- u10l1 `Training Needs: the Trigger, the Audience, Objectives, Measurement Methods` (E1, 9). Covers: training needs (new system, workflow change, system upgrade); audience size, location, and role; instructional objectives; choosing a delivery method; measurement methods (surveys, task analysis).
- u10l2 `Training Programs: Settings, Presentation Formats, Delivery` (E2, 9). Covers: settings (in-person, virtual); presentation (written, graph, video, e-learning, quick reference cards); super-users and train-the-trainer; scheduling training around clinical work.
- u10l3 `Assessing Training` (E2, 9). Covers: training assessment (quizzes, observation, authentic assessment on real tasks, surveys, help-desk call trends after go-live); acting on the results; documenting who was trained.

- [ ] **Step 2: Write `courses/ciip/deep-3.js`**

One deep dive per lesson above, each at least 300 words with a fenced table: u6l1 a DMAIC worked on report turnaround; u6l6 a monthly KPI report; u6l8 an SLA term checklist; u7l1 a TCO and ROI worked example; u7l3 a vendor scoring matrix; u8l2 a WBS for a PACS upgrade; u9l3 a downtime notice written for three audiences.

- [ ] **Step 3: Write `courses/ciip/questions-3.js`** (5 per lesson, 110 total)

Informatics scenarios. Then run `node tests/balance-keys.js courses/ciip/questions-3.js` and the key-longest check.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/ciip && node tests/acronyms.js courses/ciip 2>&1 | tail -2
git add courses/ciip/curriculum-3.js courses/ciip/deep-3.js courses/ciip/questions-3.js courses/ciip/acronyms.js
git commit -m "feat(ciip): units 6 to 10: operations, procurement, project management, communications, training"
```
Expected before the commit: `packcheck: OK` with 10 units, 65 lessons, 325 questions.

---

### Task 5: Generators

**Files:**
- Create: `courses/ciip/generators.js`

**Interfaces:**
- Produces: `FRA.generators = { u5l1, u3l4, u4l4, u5l5, u7l1 }` and `FRA.generate(lessonId)`. Each generator returns `{ id, t, q, a[4], c, e, gen: true }`.

- [ ] **Step 1: Write `courses/ciip/generators.js`** (exact content)

```js
// CIIP Academy dynamic question generators. Each returns a fresh, computed question so study size and annual storage,
// compression, transfer time, availability, and ROI and payback never repeat exactly. Formulas agree with the lessons
// and the cheat sheet. Sizes use 1 MB = 1,000,000 bytes and 1 GB = 1,000 MB, the convention the lessons state.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const comma = x => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const money = x => "$" + comma(x);
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u5l1 study size and annual storage ----------
  const STUDIES = [
    { name: "a CT study", images: [200, 400, 600, 1000], m: 512, bytes: 2 },
    { name: "an MR study", images: [150, 300, 500], m: 256, bytes: 2 },
    { name: "a digital radiography study", images: [2, 3, 4], m: 2048, bytes: 2 },
    { name: "an ultrasound study", images: [20, 40, 60], m: 640, bytes: 1 }
  ];
  function storage() {
    const s = pick(STUDIES); const n = pick(s.images); const mb = n * s.m * s.m * s.bytes / 1e6;
    if (R(2) === 0) return build("u5l1", `${s.name.replace(/^./, c => c.toUpperCase())} has ${n} images, each ${s.m} x ${s.m} pixels at ${s.bytes} byte${s.bytes > 1 ? "s" : ""} per pixel. About how large is it, uncompressed?`, `${num(mb, 1)} MB`,
      wrong(`${num(mb, 1)} MB`, [`${num(mb / s.bytes, 1)} MB`, `${num(mb * 8, 1)} MB`, `${num(n * s.m * s.bytes / 1e6, 1)} MB`, `${num(mb * 2, 1)} MB`]),
      `Study size = images x rows x columns x bytes per pixel = ${n} x ${s.m} x ${s.m} x ${s.bytes} = ${comma(mb * 1e6)} bytes, about ${num(mb, 1)} MB. Forgetting the bytes per pixel, or counting bits, are the usual slips.`, "sto");
    const avg = pick([20, 50, 100, 150, 250]); const exams = pick([20000, 40000, 60000, 100000, 150000]); const tb = exams * avg / 1e6;
    return build("u5l1", `A department performs ${comma(exams)} exams a year with an average study size of ${avg} MB. How much new storage does a year of studies need, uncompressed?`, `${num(tb, 2)} TB`,
      wrong(`${num(tb, 2)} TB`, [`${num(tb * 1000, 0)} TB`, `${num(tb / 1000, 3)} TB`, `${num(tb / 12, 2)} TB`, `${num(tb * 2, 2)} TB`]),
      `Annual storage = exams x average size = ${comma(exams)} x ${avg} MB = ${comma(exams * avg)} MB = ${num(tb, 2)} TB (1 TB = 1,000,000 MB). Plan for growth and any second copy on top of this.`, "sto");
  }

  // ---------- u3l4 compression ----------
  function compression() {
    const orig = pick([60, 120, 250, 400, 800]); const ratio = pick([2, 2.5, 3, 4, 10, 15]);
    if (R(2) === 0) return build("u3l4", `A ${orig} MB study is stored with ${ratio}:1 compression. How much space does it take?`, `${num(orig / ratio, 1)} MB`,
      wrong(`${num(orig / ratio, 1)} MB`, [`${num(orig * ratio, 1)} MB`, `${num(orig - ratio, 1)} MB`, `${num(orig / ratio / 2, 1)} MB`, `${num(orig * (1 - 1 / ratio), 1)} MB`]),
      `Compressed size = original / ratio = ${orig} / ${ratio} = ${num(orig / ratio, 1)} MB. A ratio of ${ratio}:1 means the stored copy is 1/${ratio} of the original.`, "cmp");
    const stored = orig / ratio;
    return build("u3l4", `A study is ${orig} MB before compression and ${num(stored, 1)} MB after. What compression ratio was achieved?`, `${num(ratio, 1)}:1`,
      wrong(`${num(ratio, 1)}:1`, [`1:${num(ratio, 1)}`, `${num(ratio * 2, 1)}:1`, `${num(100 / ratio, 0)}:1`, `${num(ratio / 2, 1)}:1`]),
      `Ratio = original / compressed = ${orig} / ${num(stored, 1)} = ${num(ratio, 1)}:1. Lossless compression of medical images typically lands in the low single digits; higher ratios usually mean lossy.`, "cmp");
  }

  // ---------- u4l4 transfer time ----------
  function transfer() {
    const mb = pick([50, 100, 250, 500, 1000, 2000]); const mbps = pick([10, 50, 100, 1000]); const sec = mb * 8 / mbps;
    return build("u4l4", `About how long does it take to send a ${comma(mb)} MB study over a ${comma(mbps)} Mbps link at full speed, ignoring overhead?`, `${num(sec, 1)} seconds`,
      wrong(`${num(sec, 1)} seconds`, [`${num(mb / mbps, 1)} seconds`, `${num(sec * 8, 1)} seconds`, `${num(sec / 60, 1)} seconds`, `${num(mb / mbps / 8, 2)} seconds`]),
      `Transfer time = size in bits / speed in bits per second. ${comma(mb)} MB x 8 = ${comma(mb * 8)} megabits; / ${comma(mbps)} Mbps = ${num(sec, 1)} seconds. Links are rated in bits, files in bytes; multiply by 8 first. Real transfers are slower because of protocol overhead and latency.`, "xfr");
  }

  // ---------- u5l5 availability ----------
  const AV = [{ p: "99", f: 0.99 }, { p: "99.5", f: 0.995 }, { p: "99.9", f: 0.999 }, { p: "99.95", f: 0.9995 }, { p: "99.99", f: 0.9999 }];
  function availability() {
    const a = pick(AV);
    if (R(2) === 0) { const min = (1 - a.f) * 525600;
      return build("u5l5", `A PACS service level agreement guarantees ${a.p}% availability. How much downtime does that allow in a year?`, `about ${comma(min)} minutes (${num(min / 60, 1)} hours)`,
        wrong(`about ${comma(min)} minutes (${num(min / 60, 1)} hours)`, [`about ${comma(min / 12)} minutes (${num(min / 720, 1)} hours)`, `about ${comma(min * 10)} minutes (${num(min / 6, 1)} hours)`, `about ${comma(a.f * 525600)} minutes (${num(a.f * 8760, 1)} hours)`, `about ${comma(min / 10)} minutes (${num(min / 600, 1)} hours)`]),
        `Allowed downtime = (1 minus availability) x minutes in a year = (1 minus ${a.f}) x 525,600 = about ${comma(min)} minutes. Each extra 9 cuts the allowance tenfold.`, "av"); }
    const down = pick([60, 120, 240, 480, 720]); const pct = (1 - down / 43200) * 100;
    return build("u5l5", `In a 30-day month the archive was down for ${down} minutes. What availability did it achieve?`, `${num(pct, 2)}%`,
      wrong(`${num(pct, 2)}%`, [`${num(100 - down / 525600 * 100, 3)}%`, `${num(100 - down / 1440 * 100, 2)}%`, `${num(100 - down / 432, 2)}%`, `${num(pct - 1, 2)}%`]),
      `A 30-day month has 30 x 1,440 = 43,200 minutes. Availability = (43,200 minus ${down}) / 43,200 x 100 = ${num(pct, 2)}%.`, "av");
  }

  // ---------- u7l1 ROI and payback ----------
  function roi() {
    const cost = pick([50000, 80000, 120000, 200000, 300000]); const saving = pick([20000, 30000, 40000, 60000, 80000]); const years = pick([3, 4, 5]);
    if (R(2) === 0) { const gain = saving * years; const r = (gain - cost) / cost * 100;
      return build("u7l1", `A speech-recognition and reporting upgrade costs ${money(cost)} and saves ${money(saving)} a year in transcription. What is the return on investment over ${years} years?`, `${num(r, 0)}%`,
        wrong(`${num(r, 0)}%`, [`${num(gain / cost * 100, 0)}%`, `${num(saving / cost * 100, 0)}%`, `${num((gain - cost) / gain * 100, 0)}%`, `${num(r / years, 0)}%`]),
        `ROI = (gain minus cost) / cost x 100. Gain = ${money(saving)} x ${years} = ${money(gain)}; (${money(gain)} minus ${money(cost)}) / ${money(cost)} x 100 = ${num(r, 0)}%.`, "roi"); }
    const pb = cost / saving;
    return build("u7l1", `A cloud archive migration costs ${money(cost)} up front and saves ${money(saving)} a year in on-site storage support. What is the payback period?`, `${num(pb, 1)} years`,
      wrong(`${num(pb, 1)} years`, [`${num(saving / cost, 2)} years`, `${num(pb * 12, 0)} years`, `${num(pb / 2, 1)} years`, `${num(pb + 1, 1)} years`]),
      `Payback period = cost / annual savings = ${money(cost)} / ${money(saving)} = ${num(pb, 1)} years. ROI tells you how much; payback tells you how soon.`, "roi");
  }

  FRA.generators = { u5l1: storage, u3l4: compression, u4l4: transfer, u5l5: availability, u7l1: roi };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
```

- [ ] **Step 2: Smoke-test**

Run: `node tests/gen-smoke.js courses/ciip 500`
Expected: five generators, 0 problems. If a problem names a generator, a distractor list produced a duplicate for some combination; add one more candidate to that list rather than relaxing the test.

- [ ] **Step 3: Check the units the lessons teach**

The lessons u5l1, u3l4, u4l4, and u5l5 must state the same conventions the generators use (1 MB = 1,000,000 bytes, 1 TB = 1,000,000 MB, multiply bytes by 8 for bits, 525,600 minutes a year, 43,200 minutes in a 30-day month). Search those lessons and deep dives; fix any lesson that uses a different convention.

- [ ] **Step 4: Commit**

```bash
git add courses/ciip/generators.js courses/ciip/curriculum-*.js courses/ciip/deep-*.js
git commit -m "feat(ciip): generators for study size and annual storage, compression, transfer time, availability, and ROI and payback"
```

---

### Task 6: Related courses, manifest, course page, catalog section, lists, and the first full build

**Files:**
- Modify: `site/build-site.js` (siblings and the related heading), `tests/site.js`
- Create: `courses/ciip/course.js`, `ciip/index.html`
- Modify: `index.html` (new catalog section, JSON-LD, descriptions), `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md`

**Interfaces:**
- Consumes: every pack file from Tasks 1 to 5.
- Produces: `seo.related` (array of course ids) as an optional manifest field honored by the site generator; `dist/ciip.html`, `dist/ciip-cheatsheet.pdf`, `dist/site/ciip/`, the catalog section `informatics`, the account page row, the sitemap entries.

- [ ] **Step 1: Write the failing site tests**

In `tests/site.js`, replace the two sibling checks (currently lines 44 and 45, the `const sib = ...` line and the check after it) with:

```js
  const sib = { c: { id: 'other', name: 'Other Academy', exam: { title: 'Other Exam', vendor: (m.c.exam && m.c.exam.vendor) || 'X' } }, urls: { landing: '/other/', practice: '/other/practice-test/' } };
  const lp2 = site.landingPage(m, R, 'https://example.test', [], [sib]);
  check(`${m.c.id}: landing lists a same-vendor sibling under More <vendor> courses`, lp2.includes('<section class="related"><h2>More ') && lp2.includes('<a href="/other/">Other Academy</a> <span class="muted">Other Exam</span>') && lp2.includes('href="/other/practice-test/"'));
  const rel = { c: { id: 'far', name: 'Far Academy', exam: { title: 'Far Exam', vendor: 'Some Other Body' } }, urls: { landing: '/far/', practice: '/far/practice-test/' } };
  const lp3 = site.landingPage(m, R, 'https://example.test', [], [rel]);
  check(`${m.c.id}: landing lists an other-vendor course under Related courses`, lp3.includes('<section class="related"><h2>Related courses</h2>') && lp3.includes('<a href="/far/">Far Academy</a>'));
```

(`siblingsOf` itself is checked against the real build in Step 8, because the site test's full build runs only the mini fixture.)

Run: `node tests/site.js 2>&1 | grep -E "FAIL|Related"`
Expected: the "other-vendor course under Related courses" check FAILS for every course (the heading still reads `More ...`).

- [ ] **Step 2: Implement related courses in `site/build-site.js`**

Replace the `siblingsOf` line (search `const siblingsOf`) with:

```js
  // A course's siblings are the other courses from the same certifying body, in catalog (directory) order, followed by
  // any course its manifest names in seo.related (courses from other bodies that a learner would take next).
  const siblingsOf = m => {
    const same = models.filter(o => o.c.id !== m.c.id && (o.c.exam && o.c.exam.vendor) === (m.c.exam && m.c.exam.vendor));
    const rel = ((m.c.seo && m.c.seo.related) || []).map(id => models.find(o => o.c.id === id)).filter(o => o && o.c.id !== m.c.id && !same.includes(o));
    return same.concat(rel);
  };
```

In `landingPage`, replace the related-section template (search `<section class="related"><h2>More `) so the heading depends on the vendors:

```js
${(siblings || []).length ? `<section class="related"><h2>${siblings.every(s => (s.c.exam && s.c.exam.vendor) === ex.vendor) ? `More ${esc(ex.vendor || '')} courses` : 'Related courses'}</h2><ul>${siblings.map(s => `<li><a href="${s.urls.landing}">${esc(s.c.name)}</a> <span class="muted">${esc((s.c.exam && s.c.exam.title) || '')}</span> &middot; <a href="${s.urls.practice}">practice test</a></li>`).join('')}</ul></section>` : ''}
```

Run: `node tests/site.js 2>&1 | tail -3`
Expected: all site checks pass.

- [ ] **Step 3: Write `courses/ciip/course.js`** (exact content)

```js
// CIIP Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "ciip",
  name: "CIIP Academy",
  short: "CI",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "ABII", title: "Certified Imaging Informatics Professional", code: "CIIP", questions: 170, minutes: 170, passPct: 75, fee: "$500; retake $250" },
  description: "Self-paced Certified Imaging Informatics Professional (CIIP) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CIIP Study Guide and Practice Tests | CIIP Academy",
    h1: "CIIP Study Guide and Practice Tests",
    intro: "CIIP Academy is a free study guide and practice-test course for the ABII Certified Imaging Informatics Professional exam. Sixty-five lessons follow the exam's ten domains from the seat of the person who runs PACS and imaging IT, a printable CIIP cheat sheet collects the DICOM, HL7, storage, network, and capacity facts worth memorizing, and every practice test is built from the exam's domain weights.",
    phrases: ["CIIP study guide", "CIIP practice test", "CIIP exam questions", "imaging informatics certification", "PACS administrator certification"],
    related: ["cres", "netplus", "secplus"],
    faq: [
      { q: "How many questions are on the CIIP exam?", a: "170 questions in 2 hours 50 minutes. 130 are scored and 40 are unscored pilot questions you cannot tell apart. Another 20 minutes cover the tutorial, the non-disclosure agreement, and a survey. Most questions are single best answer; some ask for several answers, show an exhibit or video, or ask you to click a hot area. You must answer each question before the next appears, and you can flag questions to review." },
      { q: "How is the CIIP scored?", a: "ABII reports a scaled score from 1 to 99, and 75 passes. The scaled score is not the percentage of questions you got right. This course's official-format test asks for 75 percent." },
      { q: "When and where can I take the CIIP?", a: "Any day, at a Pearson VUE test center or online with a remote proctor. There are no testing windows. You get three attempts within 12 months of being found eligible." },
      { q: "Who is eligible for the CIIP?", a: "ABII uses a seven-point system. You need at least 7 points: 1 to 5 for experience (one point per 12 months as a credentialed imaging professional, a healthcare IT or informatics professional, or a military radiologic technologist), 0 to 5 for your highest degree plus 1 for an imaging informatics degree, and 1 to 4 for imaging informatics continuing education (one point per 10 hours earned in the 18 months before you apply). Radiologic and biomed technologists moving into imaging IT often start with our CRES Academy course." },
      { q: "How much does the CIIP cost?", a: "The exam is $500 and a retake is $250. Certification is kept with 24 continuing education credits every two years and an annual renewal." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length 170-question test in the real exam's format at 75%." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Procurement", short: "Procurement", pct: 4, quota: 2 },
    { id: 2, name: "Project Management", short: "Projects", pct: 5, quota: 3 },
    { id: 3, name: "Operations", short: "Operations", pct: 12, quota: 6 },
    { id: 4, name: "Communications", short: "Communications", pct: 5, quota: 3 },
    { id: 5, name: "Training and Education", short: "Training", pct: 4, quota: 2 },
    { id: 6, name: "Image Management", short: "Image Mgmt", pct: 18, quota: 9 },
    { id: 7, name: "Information Technology", short: "IT", pct: 12, quota: 6 },
    { id: 8, name: "Systems Management", short: "Systems", pct: 16, quota: 8 },
    { id: 9, name: "Clinical Engineering", short: "Clinical Eng", pct: 10, quota: 5 },
    { id: 10, name: "Medical Imaging Informatics", short: "Informatics", pct: 14, quota: 6 }
  ],
  // Practice tests pass at 80%; the official-format test uses 75% to match ABII's scaled passing score of 75.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u7l1", "u7l2", "u7l3"],
    2: ["u8l1", "u8l2", "u8l3", "u8l4"],
    3: ["u6l1", "u6l3", "u6l6", "u6l8", "u6l2", "u6l4", "u6l5", "u6l7"],
    4: ["u9l1", "u9l2", "u9l3", "u9l4"],
    5: ["u10l1", "u10l2", "u10l3"],
    6: ["u3l1", "u3l3", "u3l5", "u3l9", "u3l2", "u3l4", "u3l6", "u3l7", "u3l8", "u3l10", "u3l11"],
    7: ["u4l1", "u4l2", "u4l4", "u4l7", "u4l3", "u4l5", "u4l6", "u4l8"],
    8: ["u5l1", "u5l3", "u5l5", "u5l6", "u5l9", "u5l10", "u5l2", "u5l4", "u5l7", "u5l8"],
    9: ["u2l1", "u2l3", "u2l5", "u2l2", "u2l4", "u2l6"],
    10: ["u1l1", "u1l2", "u1l3", "u1l5", "u1l4", "u1l6", "u1l7", "u1l8"]
  },
  core: {
    1: ["u7l1", "u7l2"],
    2: ["u8l1", "u8l2"],
    3: ["u6l1", "u6l3", "u6l6", "u6l8"],
    4: ["u9l1", "u9l2"],
    5: ["u10l1", "u10l2"],
    6: ["u3l1", "u3l3", "u3l5", "u3l9"],
    7: ["u4l1", "u4l2", "u4l4", "u4l7"],
    8: ["u5l1", "u5l3", "u5l5", "u5l6", "u5l9", "u5l10"],
    9: ["u2l1", "u2l3", "u2l5"],
    10: ["u1l1", "u1l2", "u1l3", "u1l5"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ABII reports a scaled score from 1 to 99 and 75 passes; the scale is not a percentage of questions correct. This course's official-format test asks for 75%.",
  examDay: [
    "170 questions in 2 hours 50 minutes, about a minute each, with an on-screen calculator. Another 20 minutes cover the tutorial, the agreement, and a survey.",
    "40 of the questions are unscored pilot items and you cannot tell which. A question from nowhere may be one of them; answer it and move on.",
    "You must answer each question before the next appears. Flag the doubtful ones and come back; never leave one blank.",
    "Read for the qualifier: FIRST, MOST likely, BEST. The informatics answer usually protects patient identity and data integrity first, then restores service, then documents.",
    "Know the arithmetic cold: study size, annual storage, compression ratio, transfer time in bits, and downtime from an availability percentage.",
    "Pearson VUE center or online proctor, any day. Bring the ID the confirmation names and arrive early."
  ],
  generatedNote: "Study size and annual storage, compression ratios, transfer times, availability and downtime, and ROI and payback are generated fresh every time.",
  legacyStoreKeys: []
};
```

- [ ] **Step 4: Create `ciip/index.html`**

Copy `chtm/index.html` to `ciip/index.html`, then replace every `chtm` with `ciip` and the title and description with:

```html
  <title>CIIP Academy</title>
```
```html
  <meta name="description" content="Self-paced Certified Imaging Informatics Professional (CIIP) exam prep with adaptive training and practice exams.">
```

Run: `grep -c "ciip" ciip/index.html; grep -c "chtm" ciip/index.html`
Expected: 13 or more, then 0. The engine script list (merge, strength, auth, sync, instruments, pbq, app) stays exactly as in the CHTM shell.

- [ ] **Step 5: Update the test lists (they fail until the wiring lands)**

`tests/loaders.js`: add `'ciip'` after `'chtm'` in `SHELLS`.

`tests/acronyms.js`: add `ciip: /\bCIIP\b|\bCIIP Academy\b/` to `COURSE_NAMES`. Then run `node tests/acronyms.js` with no argument; if an existing pack's glossary entry text names CIIP, reword that entry to say "the imaging informatics professional credential".

`tests/analytics.js`: add `'ciip.html'` after `'chtm.html'` in `pages`.

`tests/catalog.js`:
- the section-order check becomes `heads.join('|') === 'Start here: Biomed basic training|AAMI certifications|Imaging informatics|CompTIA certifications|Tools for technicians'` with the label `'the catalog has five category sections in order'`;
- add after the AAMI check: `check('CIIP sits under Imaging informatics', under('informatics').join(',') === 'ciip/', under('informatics').join(','));`
- the card count in the practice-test check becomes `cards.length === 9`.

Run: `node tests/catalog.js 2>&1 | grep FAIL`
Expected: the section-order, CIIP, and nine-card checks FAIL.

- [ ] **Step 6: Catalog section, JSON-LD, descriptions**

In `index.html`, after the closing `</section>` of `<section class="cat" id="aami">` and before the CompTIA section, insert:

```html
    <section class="cat" id="informatics">
      <h2>Imaging informatics</h2>
      <p class="cat-lede">For the people who run PACS, the archive, and the interfaces that move images and reports through a hospital.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="ciip/">CIIP Academy</a></h3>
          <p>ABII Certified Imaging Informatics Professional, for PACS administrators and imaging IT analysts. 65 lessons on DICOM, HL7, image management, storage and networks, capacity, downtime and migration, security, operations, and projects, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="ciip/">Start the course</a>
          <span class="links"><a href="ciip/lessons/">Read free lessons</a> &middot; <a href="ciip/practice-test/">Practice test</a> &middot; <a href="ciip/cheatsheet/">Cheat sheet</a></span>
        </div>
      </div>
    </section>
```

Match the indentation and wrapper markup of the neighbouring sections exactly (open `index.html` and copy the AAMI section's structure if it differs from the above).

In the JSON-LD `ItemList`, insert after the CHTM item and renumber the items that follow:

```json
      {"@type":"ListItem","position":5,"name":"CIIP Academy: ABII Certified Imaging Informatics Professional","url":"https://fieldreadyacademy.com/ciip/"},
```

In the `description` meta and the `og:description` meta, add the ABII CIIP after the AAMI credentials in the same sentence style (read the current text; for example `the AAMI CBET, CRES, and CHTM,` becomes `the AAMI CBET, CRES, and CHTM, the ABII CIIP,`).

- [ ] **Step 7: Build list, stage list, README**

`build.py`: `CATALOG_ORDER = ["bmet", "cbet", "cres", "chtm", "ciip", "netplus", "secplus", "aplus1", "aplus2"]`

`scripts/stage.sh`: add `ciip` after `chtm` in the course loop (`for id in bmet netplus secplus cbet cres chtm ciip aplus1 aplus2; do`), and change the comment "the eight course bundles" to "the nine course bundles".

`README.md`: add **CIIP Academy** (ABII Certified Imaging Informatics Professional, 65 lessons) after the CHTM entry in the live-courses list.

- [ ] **Step 8: Run everything**

```bash
npm test 2>&1 | tail -5
python build.py
node site/build-site.js
```
Then check the related links and that the AAMI pages kept their vendor heading:
```bash
grep -o '<h2>Related courses</h2>' dist/site/ciip/index.html; for p in cres netplus secplus; do grep -c "href=\"/$p/\"" dist/site/ciip/index.html; done
grep -o '<h2>More AAMI / ACI courses</h2>' dist/site/chtm/index.html
```
Expected: the Related courses heading once, three counts of 1 or more, and the CHTM page still reading "More AAMI / ACI courses".

Expected from the suites: every suite passes (selftest includes `ciip`; loaders audits nine shells; catalog sees five sections and nine cards). `dist/ciip.html`, `dist/site/ciip/index.html` (landing with the exam-facts table, the ten domains, the FAQ, and the Related courses section linking `/cres/`, `/netplus/`, `/secplus/`), `dist/site/ciip/practice-test/index.html`, `dist/site/ciip/lessons/index.html` with fifteen lesson pages, `dist/site/ciip/cheatsheet/index.html`, and `dist/site/ciip/flashcards/index.html` exist; `dist/site/sitemap.xml` gained the ciip URLs.

- [ ] **Step 9: Cheat sheet PDF and page count**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/dist/ciip-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/ciip/index.html#cheatsheet"
python -c "import fitz; print(len(fitz.open('dist/ciip-cheatsheet.pdf')), 'pages')"
```
Expected: 15 to 20 pages (record the count in Status; up to 22 is acceptable).

- [ ] **Step 10: Commit**

```bash
git status --short | head -30
git add site/build-site.js tests/site.js courses/ciip/course.js ciip/index.html index.html tests/catalog.js tests/loaders.js tests/acronyms.js tests/analytics.js build.py scripts/stage.sh README.md dist
git commit -m "feat(ciip): manifest and course page; Imaging informatics catalog section; related courses across vendors; build, stage, loaders, analytics, and acronym lists; first build, static pages, and cheat sheet PDF"
```
(`dist/site/serviceforge/` is git-ignored; every other changed `dist` file is tracked and belongs in this commit. If `git status` shows a changed file outside this list that is not under `dist/`, stop and report it.)

---

### Task 7: Reference and outline coverage checks

Blake's rule: no pack is done until it is term-checked against the reference material on disk, while staying original. Two checks plus the hand check of exam facts (spec section 3). Results are recorded in this plan's Status section.

**Files:**
- Create: `scripts/termcheck_ciip.py`
- Modify: whichever `courses/ciip/*.js` files have gaps; this plan's Status section

**Interfaces:**
- Consumes: `E:\CERT GUIDES\CIIP\Practical-Imaging-Informatics-2e.pdf`, the pack.
- Produces: printed check reports.

- [ ] **Step 1: Write `scripts/termcheck_ciip.py`** with the Write tool (exact content)

```python
# Coverage checker for the CIIP pack: independent checks that the pack's text covers the terms the reference
# sources say it should, while the pack stays original.
#   CHECK 1a - the SIIM textbook's chapter and section titles (table of contents, levels 2 and 3).
#   CHECK 1b - the SIIM textbook's glossary terms (bold run at the start of each glossary entry).
#   CHECK 2  - every named example in the ABII CIIP Test Content Outline (must be zero misses).
# Usage: python scripts/termcheck_ciip.py (run from the repo root).
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path(__file__).resolve().parent.parent / "courses" / "ciip"
BOOK_PDF = "E:/CERT GUIDES/CIIP/Practical-Imaging-Informatics-2e.pdf"

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"analys", "analyz"),
      (r"organis", "organiz"), (r"standardis", "standardiz"), (r"utilis", "utiliz"),
      (r"prioritis", "prioritiz"), (r"\bprogramme", "program"), (r"anonymis", "anonymiz")]

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
    return (" " + t + " ") in NTEXT if len(t) >= 2 else True

STOP = set("and the of in for a an to with as vs on or by at from how what is its their this that are be".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()

# ---------------------------------------------------------------- CHECK 2
OUTLINE = """total cost of ownership; return on investment; procurement; scope; budget; governance; milestones; needs assessment;
RFP; demonstrations; reference checks; vendor selection; contract negotiation;
scope change control; risks; mitigation; dependencies; work breakdown structure; effort estimates; Gantt; status reporting;
retrospective; lessons learned;
quality improvement; Six Sigma; Lean; SBAR; fishbone; downtime; incidents; backup; recovery; privacy; security; access; roles;
HIPAA; MQSA; HITECH; radiation dose tracking; operational budget; change control; data mining; statistical analysis;
KPI; uptime; capacity; exceptions; unread exams; lost studies; pivot table; bar chart; scatter plot;
statement of work; support and maintenance agreement; service level agreement; contract renewal; end of service life;
CMIO; department chair; section chief; resident; ambulatory; academic; private practice; pediatrics; research;
radiology; orthopedics; neurology; oncology; anatomy; physiology; pathology; imaging positions; imaging planes;
ICD; CPT; SNOMED; RadLex; LOINC; change management; notifications; upgrades; strategic plan; surveys;
training need; audience; instructional objectives; task analysis; in-person; virtual; video; training assessment;
ergonomics; room layout; input devices; display devices; postprocessing; compression; display protocols; read-ready;
key image; annotation; teaching files; clinical trials; de-identification; technologist; image count; preliminary; final;
addended; structured; narrative; storage commitment; order reconciliation; modality worklist; workflow optimization;
telehealth; teleradiology; import; reconciliation; export; portable media; cloud; cross enterprise; retention; deletion;
visible light; dermatology; wound care; endoscopy; cardiology;
NAS; SAN; SSD; iSCSI; fiber channel; SATA; S3; CIFS; SMB; NFS; online; nearline; IOPS; virtualization; replication;
mirroring; vendor neutral archive; ethernet; wireless; Bluetooth; OSI; TCP/IP; DICOM; FTP; HTTP; SSH; load balancing;
fault tolerance; redundancy; hubs; switches; routers; gateways; trunks; CAT 6; fiber; IP address; virtual IP; LAN; WAN;
VLAN; VPN; DNS; ARP; NAT; firewall; TLS; ports; bandwidth; latency; GPU; CPU; RAM; hard drive; network interface card;
PCI; USB; SCSI; AGP; CD; DVD; operating system; .NET; Java; browser; RDP; VNC; Active Directory; LDAP; LDAPS;
group policy; single sign on; Kerberos; SAML; OAuth; two-factor authentication; role based access control;
server; Citrix; VMware; virtual desktop infrastructure; mobile devices; SQL; normalization; keys; join; CSV; XML; JSON;
RTF; PDF; lifecycle;
exam counts; scalability; database; storage; tomosynthesis; 256 slice; subscription; enterprise; concurrent; named user;
test strategy; test environment; test data; functional; integration; user acceptance; stress; test cases; suites;
failover; failback; high availability; business continuity; disaster recovery; data replication; incident reporting;
dashboard; alerts; SNMP; protocol analysis; DICOM simulation; log aggregation; root cause; problem definition;
data collection; causal factor; status reports; migration; physical data transfer; data integrity; proprietary;
cost; user impact; progress monitoring; GDPR; PIPEDA; ACR-AAPM-SIIM; NIST; physical; network; endpoint; application;
encryption;
radiography; fluoroscopy; tomography; breast imaging; magnetic resonance imaging; computed tomography; ultrasound;
nuclear medicine; molecular imaging; radiation therapy; interventional radiology; tumor tracking; surgical planning;
3D printing; stereotactic; intraoperative; point of care; medical image capture; digital pathology; AE title; port;
performed procedure step; DICOM services; DICOM objects; validation; transfer syntax; DICOM tools;
grayscale standard display function; part 14; TG18; quality assurance; electrical hazards; ionizing radiation;
radiopharmaceuticals; magnetic fields; infection; biohazards; sterile field;
EMR; web portals; RIS; PACS; enterprise image viewer; CAD; breast; lung; prostate; reporting systems; contrast;
structured reporting; DXA; decision support; order entry; exam protocols; case comparisons; critical results;
discordant findings; peer review; clinical analytics; API; web services; scanned documents; surgical video;
HL7; FHIR; SNOMED CT; ACR; AAPM; SIIM; The Joint Commission; IHE; integration profiles"""
terms2 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss2 = [t for t in terms2 if not has(t)]
print("CHECK 2 CIIP outline terms %d, misses %d:" % (len(terms2), len(miss2)))
print("  " + (", ".join(miss2) if miss2 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1a
book = fitz.open(BOOK_PDF)
DROP = re.compile(r"(introduction|conclusion|summary|references|further reading|self-assessment|questions|answer key|index|glossary|contents|contributors|preface|^part |^chapter \d+$|who should read|organization of this book)", re.I)
titles = set()
gloss_start = gloss_end = None
for level, title, page in book.get_toc():
    t = re.sub(r"\s+", " ", title.replace("\u00a0", " ")).strip()
    if t.lower() == "glossary":
        gloss_start = page
    elif gloss_start and gloss_end is None and page > gloss_start:
        gloss_end = page
    t = re.sub(r"^(chapter \d+:\s*|\d+(\.\d+)*\s+)", "", t, flags=re.I)
    if level in (2, 3) and 3 < len(t) <= 90 and not DROP.search(t):
        titles.add(t)
report("CHECK 1a textbook chapter and section titles", titles)

# ---------------------------------------------------------------- CHECK 1b
terms = set()
if gloss_start:
    last = (gloss_end or len(book)) - 1
    for i in range(gloss_start - 1, last):
        for b in book[i].get_text("dict")["blocks"]:
            if b.get("type"):
                continue
            for l in b["lines"]:
                spans = l["spans"]
                if not spans or "Bold" not in spans[0]["font"]:
                    continue
                run = "".join(s["text"] for s in spans if "Bold" in s["font"]).strip()
                run = re.sub(r"\s+", " ", run.replace("\u00a0", " ")).strip(" .:\u2014\u2013-")
                if 2 < len(run) <= 60 and re.match(r"^[A-Za-z0-9]", run):
                    terms.add(run)
    report("CHECK 1b textbook glossary terms (PDF pages %d to %d)" % (gloss_start, last), terms)
else:
    print("CHECK 1b: no Glossary entry in the textbook's table of contents (record this in Status)")
```

- [ ] **Step 2: Run it and read the reports**

Run: `python scripts/termcheck_ciip.py > "$TMPDIR/ciip-termcheck.txt"; head -c 4000 "$TMPDIR/ciip-termcheck.txt"` (use the session scratchpad if `$TMPDIR` is unset).
Expected: CHECK 2 prints the outline count and its misses; CHECK 1a and 1b print entry counts and the entries with an absent content word. If CHECK 1b finds fewer than 100 glossary terms, the bold detection missed the layout: open two glossary pages with `page.get_text("dict")`, print the first span's font of each line, and fix the filter before going on.

- [ ] **Step 3: Close CHECK 2 completely**

For every CHECK 2 miss, add the term to the lesson its outline item maps to (the bracketed references in the spec's unit list), in the learner's words, with a sentence that teaches it. Re-run until CHECK 2 prints `misses 0`.

- [ ] **Step 4: Triage CHECK 1a and 1b**

For each textbook title or glossary term reported absent: if the outline covers its subject (it maps to an outline item), teach it in the lesson for that item; if it is outside the outline (book history, a chapter's case study, a vendor-specific product, research methods beyond recognition level), leave it out and list it in Status under "out of scope" with a one-word reason. Re-run and record the final counts.

- [ ] **Step 5: Hand-check the exam facts**

Compare every number in `courses/ciip/course.js` (exam block, FAQ, `realExamNote`, `examDay`) and in the cheat sheet's `exam` section against `E:\CERT GUIDES\CIIP\Certification-Guide.txt` and `Seven-Point-Qualification-System.txt`. Record each checked fact as a line in Status (fact, value, source line number).

- [ ] **Step 6: Re-run the pack tools and commit**

```bash
node tests/packcheck.js courses/ciip && node tests/acronyms.js courses/ciip 2>&1 | tail -2 && npm test 2>&1 | tail -3
git add scripts/termcheck_ciip.py courses/ciip docs/superpowers/plans/2026-11-23-ciip-academy.md
git commit -m "test(ciip): textbook and outline coverage checks; gaps closed; exam facts verified"
```

---

### Task 8: Review, merge, deploy, push

- [ ] **Step 1: Whole-branch review**

Dispatch one reviewer subagent over `git diff main...ciip-academy` with the spec and this plan. It checks: every spec requirement has a delivered artifact; numbers agree across cheat sheet, lessons, deep dives, generators, glossary, and manifest; ten spot-checked numbers match the ABII text files or the textbook text dump; no source is named in any pack file; the clinical-depth rule holds. Fix what it finds and commit.

- [ ] **Step 2: Rebuild and test on the branch**

```bash
npm test 2>&1 | tail -3
python build.py && node site/build-site.js
git status --short dist | head
```
Expected: all suites pass. Commit any rebuilt `dist` files with `git add dist && git commit -m "build: rebuild after the CIIP review fixes"`.

- [ ] **Step 3: Merge to main**

```bash
git checkout main
git merge --no-ff ciip-academy -m "Merge branch 'ciip-academy': CIIP Academy content pack"
npm test 2>&1 | tail -3
```
Expected: the merge completes without conflicts and every suite passes on main.

- [ ] **Step 4: Stage and go live**

```bash
bash scripts/stage.sh
bash scripts/go-live.sh
scp dist/ciip-cheatsheet.pdf hetzner:/tmp/ciip-cheatsheet.pdf
```
Then put the PDF in place with the same ownership the site uses. The auto-mode classifier blocks a raw `ssh ... cp` into `/var/www`; if it blocks this step, tell Blake the one command to run instead of retrying:
`! ssh hetzner "cp /tmp/ciip-cheatsheet.pdf /var/www/fieldready/ciip/cheatsheet.pdf && chown caddy:caddy /var/www/fieldready/ciip/cheatsheet.pdf"`

- [ ] **Step 5: Verify live**

```bash
for p in / /ciip/ /ciip/app/ /ciip/lessons/ /ciip/practice-test/ /ciip/cheatsheet/ /ciip/flashcards/ /ciip/cheatsheet.pdf; do printf "%s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://fieldreadyacademy.com$p"; done
curl -s https://fieldreadyacademy.com/ | grep -c 'href="ciip/"'
curl -s https://fieldreadyacademy.com/ciip/ | grep -c "Related courses"
```
Expected: 200 for every path (the PDF may be 404 until Blake runs the PDF command); both counts at least 1.

- [ ] **Step 6: Push and record**

```bash
git push
```
Record in Status: the merge commit, the deploy backup file name that `go-live.sh` printed, the live checks, and that Search Console resubmission of `/sitemap.xml` is Blake's.

---

## Self-review against the spec (done while writing)

- Spec 1 decisions: pure exam-prep shape (Tasks 1 to 6), reader and clinical depth (Global Constraints), 65 lessons in 10 units in learning order (Tasks 2 to 4), official-format test 170 / 170 / 75 (Task 6 manifest), references (Global Constraints, Task 7), eligibility (Task 6 FAQ, Task 1 sheet), catalog section and related courses (Task 6), free at launch, original content and longest-option rule (Global Constraints).
- Spec 2 manifest table: every field in Task 6 Step 3; domains pct and quota match the spec (Systems Management 16).
- Spec 3 verification: Task 7 checks 1a, 1b, 2, and the hand check of exam facts.
- Spec 4: 325 questions at 5 per lesson (Tasks 2 to 4), five generators (Task 5), 15 to 20 page sheet (Tasks 1 and 6), glossary (every content task).
- Spec 5: shell, catalog section, lists, static pages including flashcards (Task 6).
- Spec 6 tests: Task 6 test edits and the new site checks; Task 7 records counts.
- Spec 7 delivery: branch, subagents one at a time, merge, stage, go-live, push (Tasks 0 and 8).
- Type consistency: generator keys `u5l1 u3l4 u4l4 u5l5 u7l1` match the lessons that name them; unit ids and domains match the manifest's `starterPool` and `core`; cheat sheet section ids are used by Tasks 2 to 4 exactly as Task 1 defines them.

## Status

(Filled in during execution.)
