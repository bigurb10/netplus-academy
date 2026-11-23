# CIIP Academy: design

Date 2026-11-23. Blake chose 65 lessons and approved the design in conversation on 2026-11-23
("Go ahead. Should be similar to past course structure"; "65 lessons (Recommended)"; "CIIP design
is approved"). Exam facts come only from the ABII documents on disk (appendix). The pack follows
the CHTM pack's shape (`docs/superpowers/specs/2026-10-14-chtm-academy-design.md`) except where this
spec says otherwise.

## 1. Decisions

- **A pure exam-prep pack**, the CRES and CHTM shape: cheat sheet first, starter test, adaptive
  tutorial, 50-question practice tests, three of the last five at 80 percent, then one
  official-format test at the exam's score, recorded permanently. No labs, no certificate, no
  untested domain.
- **The reader runs imaging systems.** The imaging informatics professional is the PACS
  administrator or imaging IT analyst, often a radiologic technologist or an IT generalist changing
  lanes. Every lesson teaches a configuration, a calculation, a document, or a decision that person
  owns, and the questions are informatics scenarios (an interface error, a study that never arrived,
  a migration, an outage, a vendor contract, a privacy incident). Clinical content stays at the
  level in `feedback-biomed-clinical-depth`: anatomy, planes, positions, and modality basics yes;
  diagnosis, dosing, and treatment no.
- **65 lessons in 10 units, one unit per domain**, sized by exam weight with a floor of 3:
  Procurement 3, Project Management 4, Operations 8, Communications 4, Training and Education 3,
  Image Management 11, Information Technology 8, Systems Management 10, Clinical Engineering 6,
  Medical Imaging Informatics 8. Units run in learning order (standards first, soft domains last),
  not outline order; domain ids keep outline order A to J as 1 to 10.
- **Official-format test mirrors the real exam:** 170 questions in 170 minutes, pass at 75 percent.
  ABII reports a scaled score from 1 to 99 where 75 passes and says the scale is not a percentage;
  `realExamNote` says so in plain words and explains that 75 percent is our bar.
- **References on disk:** the SIIM textbook *Practical Imaging Informatics*, 2nd edition (Springer
  2021; PDF plus a full text dump), the ABII Certification Guide (revised March 2025), the Test
  Content Outline (implemented March 2024), and the Seven-Point Qualification System (revised May
  2024). The outline governs scope and wording where the book differs.
- **Eligibility is said plainly:** the seven-point system (experience 1 to 5 points, academic
  education 0 to 5 plus 1 for an imaging informatics degree, continuing education 1 to 4; at least
  7 total) appears in the FAQ.
- **Catalog:** a new section "Imaging informatics" between AAMI certifications and CompTIA
  certifications. The landing page links to CRES (its healthcare IT unit is the nearest sibling) and
  to the CompTIA Network+ and Security+ courses for the IT domains.
- **Free at launch** (`freeCourse: true`, 15 free lessons), like every other course.
- **Original content only**, no reference to any book, guide, or source anywhere in the pack,
  plain words, plain ASCII in every pack file, feedback buttons on every lesson, the longest-option
  rule in every question (`project-growth-round-2026-10-15`).

## 2. The course

### Manifest (`courses/ciip/course.js`)

| Field | Value |
|---|---|
| `id`, `name`, `short` | `ciip`, `CIIP Academy`, `CI` |
| `exam` | vendor `ABII`, title `Certified Imaging Informatics Professional`, code `CIIP`, 170 questions, 170 minutes, `passPct: 75` |
| `description` | Self-paced Certified Imaging Informatics Professional (CIIP) exam prep with adaptive training and practice exams. |
| `seo.title` | CIIP Study Guide and Practice Tests \| CIIP Academy |
| `seo.h1` | CIIP Study Guide and Practice Tests |
| `seo.phrases` | CIIP study guide, CIIP practice test, CIIP exam questions, imaging informatics certification, PACS administrator certification |
| `seo.faq` | How many questions (170 in 2 hours 50 minutes, of which 130 are scored and 40 are unscored pilot items, plus 20 minutes for the tutorial, agreement, and survey; on-screen calculator; every question must be answered before the next, flag for review allowed); how it is scored (scaled 1 to 99, 75 passes, not a percentage; our official-format test uses 75 percent); when and where (any day at a Pearson VUE center or online with a remote proctor, no testing windows); who is eligible (the seven-point system in plain words); cost ($500 test, $250 retake, three attempts within 12 months); how many practice tests (three of the last five at 80 percent, then one full-length test at the real format); is it free (yes while the site launches); the CRES course is linked from the eligibility answer |
| `domains` | 1 Procurement, short `Procurement`, pct 4, quota 2; 2 Project Management, `Projects`, 5, 3; 3 Operations, `Operations`, 12, 6; 4 Communications, `Communications`, 5, 3; 5 Training and Education, `Training`, 4, 2; 6 Image Management, `Image Mgmt`, 18, 9; 7 Information Technology, `IT`, 12, 6; 8 Systems Management, `Systems`, 16, 8; 9 Clinical Engineering, `Clinical Eng`, 10, 5; 10 Medical Imaging Informatics, `Informatics`, 14, 6 |
| `test` | 50 questions, 55 minutes, `passPct: 80`, `passesNeeded: 3`, `passWindow: 5`, `starterPerDomain: 2`, `checkpointN: 4`, `checkpointPass: 3` |
| `starterPool`, `core` | per domain, listed under each unit below |
| `freeCourse`, `free.lessons` | `true`, 15 |
| `realExamNote` | ABII reports a scaled score from 1 to 99 and 75 passes; the scale is not a percentage of questions correct. This course's official-format test asks for 75 percent. |
| `examDay` | 170 questions in 2 hours 50 minutes with a calculator; 40 are unscored and you cannot tell which; answer every question before moving on, flag the doubtful ones; read for FIRST, MOST, BEST; the informatics answer is the one that protects data integrity and patient identity first; Pearson VUE center or online proctor; two forms of ID |
| `generatedNote` | the generator list in section 4 |
| `feedbackEndpoint` | `https://api.fieldreadyacademy.com/v1/feedback` |
| `legacyStoreKeys` | `[]` |

Domain percentages are the outline's scored counts over 130 (5, 7, 16, 7, 5, 23, 16, 20, 13, 18),
rounded to the nearest whole number, which sums to 99; Systems Management (15.4) takes the
missing point as the largest of the rounded-down shares, so they sum to 100. Quotas sum to 50 and
follow the counts; Medical Imaging Informatics rounds down to 6 so Image Management and Systems
Management keep their larger shares.

### Flow

Unchanged engine flow. Checkpoints pass on 3 of 4, drills on three in a row, sureness only on the
starter test, retraining by drill, lesson, or extended lesson, results page with Your answer /
Correct answer / Why / Review the lesson.

### Units and lessons (10 units, 65 lessons)

Lesson ids are `u<unit>l<n>`. Every lesson has a deep dive. `starterPool` lists the unit's lessons
in the order given; `core` lessons are marked with a star. Outline references are in brackets.

**Unit 1: Imaging Informatics Foundations** (domain 10, 8 lessons)
1. The imaging workflow from order to report, and who owns each step * [J1]
2. DICOM: the information model, objects, services, and the conformance statement * [J3a]
3. HL7 v2 and FHIR: orders, results, ADT, and the messages imaging runs on * [J3b]
4. The coding systems: ICD, CPT, SNOMED CT, LOINC, and RadLex [J3c, D2e]
5. IHE integration profiles and how to require them in a purchase * [J5]
6. Systems integration: EMR and portals, RIS, PACS, the enterprise viewer, reporting, APIs and web services, scanned documents [J2a-d, f, p, q, r]
7. CAD, postprocessing, decision support, radiation and contrast dose management, and modality structured reports [J2e, g-k]
8. Critical results, discordant findings, peer review, clinical analytics, the professional bodies (ACR, AAPM, SIIM, The Joint Commission), and aligning imaging strategy with the organization [J2l-o, J4, J6]

**Unit 2: Clinical Engineering** (domain 9, 6 lessons)
1. Modality workflow and data: radiography, fluoroscopy, tomography, breast imaging, CT, MRI, ultrasound * [I1a-e]
2. Nuclear medicine, cardiology, radiation therapy, IR, visible light, and the ancillary services: oncology, surgical planning and 3D printing, stereotactic and intraoperative imaging, point of care, digital pathology [I1f-j, I2]
3. Configuring a modality: AE title, port, modality worklist, performed procedure step, storage commitment * [I3a]
4. DICOM services, objects, transfer syntaxes, validation, tools, and other integration [I3b-g]
5. Display quality control: the grayscale standard display function (DICOM part 14), AAPM TG18, QA programs * [I4]
6. Clinical awareness: electrical hazards, ionizing radiation and radiopharmaceuticals, magnetic fields, infection, the sterile field [I5]

**Unit 3: Image Management** (domain 6, 11 lessons)
1. The reading room: ergonomics, lighting and environment, room layout * [F1]
2. The human-computer interface: display devices, input devices, EMR/RIS/PACS/reporting integration [F2]
3. Image workflow: hanging and display protocols, read-ready, postprocessing, key images and annotation * [F3a, c, d, g]
4. Image compression: lossless, lossy, ratios, and where each belongs [F3b]
5. Technologist QC and exam data integrity: image counts, order reconciliation, storage commitment, the worklist * [F3h, j]
6. Reports and results: preliminary, final, addended; structured versus narrative [F3i]
7. Teaching files, research, clinical trials, and de-identification [F3e, f]
8. Workflow optimization and remote interpretation: telehealth and teleradiology [F3k, l]
9. Image exchange: policies, import and reconciliation, export, portable media, cloud, standards, cross-enterprise sharing * [F4]
10. Archiving: retention and deletion policies [F5]
11. Enterprise imaging: visible light, radiology, cardiology [F6]

**Unit 4: Information Technology** (domain 7, 8 lessons)
1. Storage types and protocols: NAS, SAN, SSD, iSCSI, Fibre Channel, SATA, S3, SMB and CIFS, NFS * [G1a, b]
2. Archive strategy: online, nearline, IOPS, virtualization, replication, mirroring, storage metrics, cloud, the vendor neutral archive * [G1c, d]
3. Network fundamentals: the OSI model, TCP/IP, ethernet, wireless, Bluetooth, hubs, switches, routers, cabling [G2a, d]
4. Network configuration: IP addressing, virtual IP, LAN, WAN, VLAN, VPN, DNS, ARP, NAT, firewalls, TLS, ports; DICOM, FTP, HTTP, SSH; load balancing; network metrics * [G2b, c, e, f]
5. Hardware: CPU, GPU, memory, drives, NIC, buses, removable media, servers [G3a, c]
6. Software: operating systems, runtimes, browsers, remote tools (RDP, VNC), virtual machines, VDI, mobile devices [G3b1-4, d-f]
7. Identity and access: Active Directory, LDAP and LDAPS, group policy, SSO (Kerberos, SAML, OAuth 2.0), two-factor authentication, role-based access control * [G3b5, 6]
8. Data: SQL concepts, database design (keys, normalization, joins, performance), CSV, XML, JSON, RTF, PDF, and system lifecycle planning [G4-6]

**Unit 5: Systems Management** (domain 8, 10 lessons)
1. Capacity planning: study size and annual storage from exam counts * [H1a, b]
2. Scalability (database, storage, server, network), cloud deployment, new modalities, and software licensing models [H1c-f]
3. Test planning: strategy, environment, test data, testers, and the test types * [H2a-e]
4. Test cases and suites: writing, executing, documenting, maintaining [H2f-i]
5. Resilience: redundant components, high availability, failover and failback, replication * [H3a3, b]
6. Disaster recovery and business continuity: data protection, downtime policy, recovery objectives * [H3a1, a2, b3, b4]
7. Monitoring and incidents: incident reporting, dashboards, alerts, SNMP, troubleshooting (protocol analysis, DICOM simulation, log aggregation) [H4a, b]
8. Root cause analysis and status reports to management [H4c, d]
9. Data migration: scope, strategy, physical transfer, standardization and integrity, record correction, proprietary data, cost, user impact, progress reporting * [H5]
10. Security and privacy: HIPAA, GDPR, PIPEDA, the ACR-AAPM-SIIM practice parameter, NIST; physical, system, network, endpoint, application security; encryption * [H6]

**Unit 6: Operations** (domain 3, 8 lessons)
1. Quality improvement: its philosophy, Six Sigma, Lean * [C1a, b]
2. Problem identification tools: SBAR, fishbone charts, and their companions [C1c]
3. Policies and procedures: downtime, incidents, backup and recovery, privacy and security, user access and roles * [C2a, b]
4. Compliance: HIPAA, HITECH, MQSA, radiation dose tracking [C2c]
5. Operational budgeting and systems change control [C3, C4]
6. KPIs and operational reporting: uptime, capacity, exceptions, unread exams, lost studies * [C5a]
7. Data analytics and visualization: data mining, statistics, pivot tables, bar charts, scatter plots [C5b]
8. Vendor management: SOW, support and maintenance agreement, SLA, renewal, end of service life * [C6]

**Unit 7: Procurement** (domain 1, 3 lessons)
1. Defining the project: justification with TCO and ROI, goals, scope, preliminary budget, policies, governance, the plan * [A1]
2. Needs assessment, vendor identification, and the RFP * [A2-4]
3. Evaluating solutions, demonstrations, reference checks and site visits, selection, and the contract [A5-7]

**Unit 8: Project Management** (domain 2, 4 lessons)
1. Goals, scope, scope change control, risks, and dependencies * [B1]
2. The project plan: WBS, resources, effort estimates, milestones * [B2]
3. Running the project: Gantt charts, time-and-task tracking, status reporting [B3]
4. Go-live, the retrospective, and lessons learned [B4]

**Unit 9: Communications** (domain 4, 4 lessons)
1. Healthcare roles, settings, and specialties * [D1]
2. Medical terminology for informatics: anatomy, positions, planes, modality terms * [D2a-d]
3. Announcing downtime, upgrades, and workflow changes: who, what, when, why, how, by user role [D3]
4. Strategic planning and feedback: alignment, reporting tools, surveys [D4]

**Unit 10: Training and Education** (domain 5, 3 lessons)
1. Training needs: the trigger, the audience, objectives, measurement methods * [E1]
2. Training programs: settings, presentation formats, delivery * [E2a]
3. Assessing training [E2b]

Core per domain: 1 `u7l1 u7l2`; 2 `u8l1 u8l2`; 3 `u6l1 u6l3 u6l6 u6l8`; 4 `u9l1 u9l2`; 5
`u10l1 u10l2`; 6 `u3l1 u3l3 u3l5 u3l9`; 7 `u4l1 u4l2 u4l4 u4l7`; 8 `u5l1 u5l3 u5l5 u5l6 u5l9
u5l10`; 9 `u2l1 u2l3 u2l5`; 10 `u1l1 u1l2 u1l3 u1l5`.

### Objective coverage

The bracketed outline references above cover every numbered and lettered item of the Test Content
Outline, A1 through J6. The outline coverage check in section 3 proves it by term.

## 3. Content sources and verification

Content is written from the outline and the writer's own knowledge, never from the book's wording.
The term check runs in a sibling of the earlier checkers (`scripts/termcheck_ciip.py`, reading the
text dumps beside the PDFs):

1. **The SIIM textbook**: its chapter titles and section headings (the PDF's table of contents to
   level 2) and its glossary (PDF page 634 onward) must each appear, stemmed, in some lesson, deep
   dive, or cheat-sheet text, or be logged as out of scope with a reason (the book is broader than
   the exam; misses are reviewed, not all fixed).
2. **The outline**: every named example of every outline item must appear in at least one lesson
   (all of them, no exceptions): TCO, ROI, RFP, WBS, Gantt, Six Sigma, Lean, SBAR, fishbone, HIPAA,
   MQSA, HITECH, KPI, pivot table, SOW, SMA, SLA, EOSL, CMIO, ICD, CPT, SNOMED, RadLex, LOINC,
   ergonomics, de-identification, storage commitment, order reconciliation, modality worklist,
   teleradiology, NAS, SAN, SSD, iSCSI, fiber channel, SATA, S3, CIFS, SMB, NFS, IOPS, VNA, OSI,
   TCP/IP, DICOM, FTP, HTTP, SSH, VLAN, VPN, DNS, ARP, NAT, TLS, GPU, CPU, RAM, NIC, PCI, USB,
   SCSI, RDP, VNC, Active Directory, LDAP, LDAPS, group policy, Kerberos, SAML, OAuth, two-factor,
   RBAC, Citrix, VMware, VDI, SQL, normalization, CSV, XML, JSON, RTF, PDF, tomosynthesis,
   subscription, concurrent, named user, user acceptance, high availability, failover, failback,
   SNMP, root cause, migration, GDPR, PIPEDA, NIST, encryption, mammography, MRI, CT, ultrasound,
   nuclear medicine, radiation therapy, interventional radiology, 3D printing, point of care,
   digital pathology, AE title, performed procedure step, transfer syntax, GSDF, TG18, sterile,
   RIS, PACS, CAD, structured reporting, DXA, peer review, API, web services, FHIR, HL7, ACR, AAPM,
   SIIM, The Joint Commission, IHE.
3. **Exam facts**: every number in the manifest, FAQ, `examDay`, and cheat sheet's exam page is
   checked against the Certification Guide and the qualification document by hand.

Numbers in lessons come from the ABII documents, from public standards the lesson names in plain
words (DICOM part 14, TG18 is named by the outline itself), or from arithmetic the lesson shows
(a storage estimate, a transfer time). Retention periods and legal thresholds that vary by state
or country are described as varying, not given a number.

Reuse: the CRES pack's unit 10 (PACS, DICOM, HL7, troubleshooting) and the NetPlus and SecPlus
packs are starting points for units 1, 2, 4, and 5, rewritten for the informatics reader; the
CHTM pack's procurement, project, and training lessons are starting points for units 7, 8, and 10.
Image management, systems management testing and migration, and operations analytics are new
writing.

## 4. Questions, generators, cheat sheet, glossary

- **Questions** (`questions-*.js`): five per lesson, 325 total, answer keys balanced across A to D,
  key-longest share inside the 19 to 26 percent band the other banks hold, every question tied to
  a lesson, each with an explanation that names the reason. Stems are informatics scenarios asking
  for the FIRST step, the MOST likely cause, or the BEST configuration, document, or recommendation.
- **Generators** (`generators.js`): five, all arithmetic with one defensible answer:
  1. study size and annual storage (images x matrix x bytes per pixel, then x exams per year),
  2. compression (compressed size from a ratio, or the ratio from two sizes),
  3. transfer time (study size over link bandwidth, bits versus bytes),
  4. availability (an uptime percentage to minutes of downtime per year or month),
  5. ROI and payback period for an imaging purchase.
  `generatedNote` names them all. They reuse the `build()` and distractor helpers of the CHTM and
  CRES generators.
- **Cheat sheet** (`cheatsheet.js`): about 15 to 20 printed pages: the exam and eligibility; DICOM
  and HL7 essentials (services, the modality configuration triplet, message types); IHE profiles;
  the coding systems; image management rules (compression, report status, data integrity checks,
  de-identification); storage and network tables; the capacity, transfer, and availability
  formulas; HA, DR, and testing terms; security and privacy laws; operations and vendor documents;
  procurement and project terms. Printed to `dist/ciip-cheatsheet.pdf`.
- **Glossary** (`acronyms.js`): every acronym used in the pack, with the coverage test green.

## 5. Site and catalog

- `ciip/index.html` shell with the same engine loader list as `chtm/index.html` plus the pack files.
- Catalog: a new section "Imaging informatics" between AAMI certifications and CompTIA
  certifications, lede one sentence on the people who run PACS and imaging IT, one card: pill
  Free, title `CIIP Academy`, one sentence naming the ABII Certified Imaging Informatics
  Professional, 65 lessons, the cheat sheet, adaptive tutorials, practice tests; links to the
  lessons, practice test, and cheat sheet pages. The ItemList JSON-LD gains the entry.
- `build.py`, `scripts/stage.sh`, `site/build-site.js`, `tests/` course lists, the account page,
  and the README's live-courses sentence all add `ciip`.
- The static generator produces the landing page at `/ciip/` (title, H1, intro, exam-facts table
  with the ten domain weights and the ABII fees, the FAQ with the seven-point system), the related
  courses block (CRES, Network+, Security+; `siblingsOf` finds no same-vendor course, so the links
  are named in the manifest's SEO block), `/ciip/practice-test/` with twenty explained bank
  questions, `/ciip/lessons/` with the fifteen free lessons, `/ciip/cheatsheet/`,
  `/ciip/flashcards/`, and the app at `/ciip/app/`; the sitemap picks them up.

## 6. Tests

Existing `npm test` runs on the new pack: selftest, gating, acronym coverage, loaders, site parity,
catalog, summary, merge, gen-smoke, balance-keys, analytics. Extended: `tests/catalog.js` expects
the new section and `ciip/` in it; the loaders and analytics lists take the new id. New: the term
check and the outline coverage check run from `scripts/termcheck_ciip.py` and are recorded in the
plan's Status with their counts before the pack is called done.

## 7. Delivery order

1. This spec, committed.
2. One content plan (no engine work beyond the catalog section and related-course links), the
   same task shape as the CHTM plan, executed by subagent-driven development on branch
   `ciip-academy` off `main`, cheat sheet first. Blake's subagent cap applies
   (`feedback-no-agent-fanout`): tasks run one or two at a time, never a fan-out.
3. Merge, then `bash scripts/stage.sh` and `bash scripts/go-live.sh`, verify on the live site, push.

## 8. Assumptions and out of scope

- The 75 percent bar is our reading of a scaled 75; ABII publishes no raw cut score.
- The 2021 book predates the 2024 outline; the outline governs wording and scope.
- No labs, no certificate, no paywall change, no aesthetic pass; each is its own project later.
- The SIIM textbook is a personal-use reference; nothing from it is reproduced in the pack.

## Appendix: reference sources on disk (2026-11-23)

| File | What it is | Used for |
|---|---|---|
| `E:\CERT GUIDES\CIIP\Practical-Imaging-Informatics-2e.pdf` (+ `.txt`) | SIIM, *Practical Imaging Informatics*, 2nd ed., Springer 2021, 664 pages | check 1, content depth |
| `E:\CERT GUIDES\CIIP\Test-Content-Outline-2024.pdf` (+ `.txt`) | ABII Test Content Outline, approved August 2022, implemented March 2024 | scope, weights, check 2 |
| `E:\CERT GUIDES\CIIP\Certification-Guide.pdf` (+ `.txt`) | ABII Certification Guide, revised March 2025 | exam facts, fees, scoring |
| `E:\CERT GUIDES\CIIP\Seven-Point-Qualification-System.pdf` (+ `.txt`) | ABII eligibility points, revised May 2024 | FAQ eligibility |
