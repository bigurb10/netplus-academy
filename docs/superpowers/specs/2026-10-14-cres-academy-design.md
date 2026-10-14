# CRES Academy: design

Date 2026-10-14. Blake approved the decisions, the outline, and the content and delivery
sections in conversation on 2026-10-14 ("Start on CRES"; "Yes to this"; "Part 2 looks good").
Source of exam facts: the ACI Certification Candidate Handbook 2026 as distilled in
`docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md` (section 2). This spec supersedes
that note's draft outline.

## 1. Decisions

- **A pure exam-prep pack**, the CBET shape: cheat sheet first, starter test, adaptive
  tutorial, 50-question practice tests, three of the last five at 80 percent, then one
  official-format test at the exam's score, recorded permanently. No labs (Blake,
  2026-10-14, "No labs"), no certificate, no untested domain.
- **References on disk:** the OCR'd Mometrix CRES guide (`E:\CERT GUIDES\CRES\CRES-study-guide-OCR.txt`),
  the Bushong *Workbook and Laboratory Manual* (`E:\CERT GUIDES\CRES\Stewart C. Bushong.pdf`,
  432 pages, 360 with a text layer, 333-entry table of contents), the ACI handbook
  (`E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf`), and the CBET-era books under
  `E:\CERT GUIDES\CBET\`. Blake chose "guide + handbook + CBET books, buy Bushong"; the
  workbook is what arrived. Ultrasound, MRI, and nuclear medicine are not in any of these
  beyond the guide's mentions, so Unit 7 is checked against the guide and the CBET imaging
  lesson's sources only and is written at recognition depth, which matches the outline.
- **Lessons follow the exam weights** (Blake: "Rebalance to the exam weights, 60 lessons"):
  Anatomy 4, Safety and Regulation 9, Electricity 6, Function 19, Problem Solving 10,
  Healthcare IT 12. Question quotas follow the weights too.
- **Pass bar 70 percent** on the official-format test, stated as an assumption in
  `realExamNote` exactly as CBET does, because ACI publishes no cut score for CRES.
- **Eligibility is said plainly.** The 40-percent-radiology clause (at least 40 percent of
  work experience in the radiology specialty over the last two years, 25 percent over five)
  goes in the landing-page FAQ and in the exam-day notes, because it is what stops a general
  CBET from sitting the exam.
- **Free at launch** (`freeCourse: true`, 15 free lessons), like every other course.
- **Original content only**, no reference to any book, guide, or source anywhere in the
  pack, plain words, plain ASCII in every pack file, feedback buttons on every lesson.

## 2. The course

### Manifest (`courses/cres/course.js`)

| Field | Value |
|---|---|
| `id`, `name`, `short` | `cres`, `CRES Academy`, `CR` |
| `exam` | vendor `AAMI / ACI`, title `Certified Radiology Equipment Specialist`, code `CRES`, 165 questions, 180 minutes, `passPct: 70` |
| `description` | Self-paced Certified Radiology Equipment Specialist (CRES) exam prep with adaptive training and practice exams. |
| `seo.title` | CRES Study Guide and Practice Tests \| CRES Academy |
| `seo.h1` | CRES Study Guide and Practice Tests |
| `seo.phrases` | CRES study guide, CRES practice tests, CRES exam questions, CRES cheat sheet |
| `seo.faq` | How many questions (165 in 3 hours, closed book, on-screen calculator; ACI sets the cut score, our official-format test uses 70 percent); when offered (May 1 to 15 and November 1 to 15, computer-based at Kryterion centers); who is eligible (the three pathways plus the radiology-experience clause, and candidate status); cost (2026: $410 member, $460 non-member; retake $355 / $405; 2027: $425 / $480); how many practice tests (three of the last five at 80 percent, then one full-length test at the real format); is it free (yes while the site launches) |
| `domains` | 1 Anatomy and Physiology, short `A&P`, pct 7, quota 4; 2 Public Safety in the Healthcare Facility, `Safety`, 8, 4; 3 Fundamentals of Electricity and Electronics, `Electronics`, 10, 5; 4 Healthcare Technology and Function, `Function`, 25, 12; 5 Healthcare Technology Problem Solving, `Problem Solving`, 25, 13; 6 Healthcare Information Technology, `Healthcare IT`, 25, 12 |
| `test` | 50 questions, 55 minutes, `passPct: 80`, `passesNeeded: 3`, `passWindow: 5`, `starterPerDomain: 2`, `checkpointN: 4`, `checkpointPass: 3` |
| `starterPool`, `core` | per domain, listed in section 2 below under each unit |
| `freeCourse`, `free.lessons` | `true`, 15 |
| `realExamNote` | ACI reports CRES results as pass or fail and publishes no cut score; this course's official-format test uses 70 percent, the same bar as CBET. |
| `examDay` | 165 questions in 3 hours with a calculator; unscored trial items; read for FIRST, MOST, BEST; the eligibility clause in one line; know the numbers cold (inverse square law, mAs arithmetic, heat units, dose limits, leakage limits); two forms of ID, arrive early |
| `generatedNote` | the generator list in section 4 |
| `feedbackEndpoint` | `https://api.fieldreadyacademy.com/v1/feedback` |
| `legacyStoreKeys` | `[]` |

The domain quotas sum to 50 and round the published weights the same way the other packs do.

### Flow

Unchanged engine flow. Checkpoints pass on 3 of 4, drills on three in a row, sureness only
on the starter test, retraining by drill, lesson, or extended lesson, results page with
Your answer / Correct answer / Why / Review the lesson.

### Units and lessons (10 units, 60 lessons)

Lesson ids are `u<unit>l<n>`. Every lesson has a deep dive. `starterPool` lists the unit's
lessons in the order given; `core` lessons are marked with a star.

**Unit 1: Anatomy, Positioning, and Medical Language** (domain 1, 4 lessons)
1. Body organization, planes, habitus, and positional terminology *
2. Chest, abdomen, and pelvis on the image: heart, lungs, liver, GI and urinary tracts *
3. Skeleton, spine, skull, and joints, with the brain, nervous, and endocrine systems
4. Positioning by exam: projections, topographical landmarks, and reading the requisition

**Unit 2: Radiation, Magnetic, and Facility Safety** (domain 2, 5 lessons)
1. Electrical and mechanical safety in the imaging suite, patient transfer and moving *
2. How radiation harms: ionization, dose quantities and units, occupational and public limits *
3. Time, distance, shielding, the inverse square law, and ALARA in practice *
4. Protective apparel, barriers, and shields, and how they are tested
5. The MRI environment and electromagnetic interference: zones, projectiles, quench, RF heating

**Unit 3: Regulation, Accreditation, and the CMMS** (domain 2, 4 lessons)
1. Who regulates imaging: FDA and 21 CFR 1020, state radiation control, and CMS *
2. Mammography under MQSA and ACR accreditation
3. The Joint Commission, OSHA, ANSI/AAMI standards, and the radiation safety committee
4. The CMMS: service history, recalls, and compliance and performance reports *

**Unit 4: Electricity, Electronics, and Imaging Power** (domain 3, 6 lessons)
1. Voltage, current, resistance, and power: Ohm's law, series and parallel *
2. Components in a circuit: passive, active, rectifiers, and reading the schematic *
3. Electromagnetism, induction, transformers, and the electromagnetic spectrum
4. Facility power: 3-phase, 480 VAC, panels, and the imaging room's dedicated feed *
5. UPS, line conditioning, and internal system power distribution
6. Battery-powered systems: ultrasound carts and portable x-ray

**Unit 5: X-ray Production, Tubes, and Generators** (domain 4, 6 lessons)
1. X-ray production: cathode, anode, focal spot, bremsstrahlung and characteristic radiation *
2. The tube: housing, rotating anode, line-focus principle, dual focus, heat units, cooling, failure *
3. Generators: kVp, mA, time, mAs, rectification and waveform, high-voltage transformers, timers *
4. Automatic exposure control, technique charts, and the exposure factors
5. Collimation, filtration, grids, and air gap: controlling the beam and scatter *
6. Tables, Bucky, tube stands, and the mechanical system

**Unit 6: Image Receptors, Fluoroscopy, Mammography, and CT** (domain 4, 6 lessons)
1. From film-screen to CR to DR: receptor types, screens, and processors
2. Digital detector electronics, calibration, defective pixel maps, and image processing *
3. Fluoroscopy: image intensifiers, flat panels, dose rate control, and digital subtraction *
4. Mobile C-arms, the interventional suite, and angiography
5. Mammography systems: tube, compression, AEC, and tomosynthesis *
6. CT at recognition depth: gantry, slip ring, detector array, tube cooling, reconstruction

**Unit 7: Ultrasound, Nuclear Medicine, and MRI** (domain 4, 4 lessons)
1. Ultrasound physics and probes: frequency, attenuation, resolution, probe types and failure modes *
2. Ultrasound systems: beamformer, modes, Doppler, probe testing and high-level disinfection
3. Gamma cameras, nuclear medicine, PET, and hybrid systems at recognition depth
4. MRI at recognition depth: magnet, gradients, RF coils, cryogens, and what the technician services

**Unit 8: PM, QC, and Test Equipment** (domain 4, 3 lessons)
1. What an imaging PM requires, and QC by modality *
2. Measuring the beam: kVp meters, dosimeters, ion chambers, dose area product, HVL, timer checks *
3. The safety analyzer and voltmeter in the imaging suite, and documenting PM and QC for the surveyor

**Unit 9: Troubleshooting Imaging Systems** (domain 5, 10 lessons)
1. The method: symptom, history, isolate, verify; device error versus use error *
2. Prioritizing imaging repairs by risk, downtime, and regulatory exposure *
3. Using the resources: schematics, service manuals, diagnostic software, and error logs *
4. Power and generator faults: no exposure, interlocks, high-voltage failures, tube arcing *
5. Tube and image quality faults: heat, focal-spot blur, artifacts, grid errors, motion
6. Mechanical faults: tables, stands, locks, collimator, and detector positioning
7. Digital receptor and fluoroscopy faults: dead pixels, calibration, intensifier and panel failures
8. Mammography and ultrasound faults: compression, AEC, probe failures, Doppler, disinfection damage
9. Portable and C-arm faults: batteries, chargers, brakes, and cables
10. Communicating with radiology staff and the manufacturer: training, escalation, the service report *

**Unit 10: Imaging Informatics and Networks** (domain 6, 12 lessons)
1. Networking fundamentals for the imaging network: IP, subnets, switches, VLANs *
2. Wired and wireless hardware: cabling, NICs, access points, cable tracers
3. Computer hardware and software for imaging systems: workstations, storage, backups, virtualization
4. PACS: the archive, workstations, and the image lifecycle *
5. DICOM: objects, services, modality worklist, and DICOM echo *
6. RIS, HL7, the EMR, and the order-to-report path
7. Application interdependence: worklist, MPPS, dose reporting, and what breaks downstream
8. Imaging network security: HIPAA, access control, patching, encryption, device cybersecurity *
9. Compliance evidence: risk assessment, MDS2, vendor remote access, what a survey wants
10. Troubleshooting the imaging network: PING, traceroute, cable tracers, switch ports, DNS *
11. Troubleshooting PACS and DICOM: association failures, missing worklist, images not arriving
12. Monitors, display calibration, and workstation troubleshooting

Core per domain: domain 1 `u1l1 u1l2`; domain 2 `u2l1 u2l2 u2l3 u3l1 u3l4`; domain 3
`u4l1 u4l2 u4l4`; domain 4 `u5l1 u5l2 u5l3 u5l5 u6l2 u6l3 u6l5 u7l1 u8l1 u8l2`; domain 5
`u9l1 u9l2 u9l3 u9l4 u9l10`; domain 6 `u10l1 u10l4 u10l5 u10l8 u10l10`.

### Objective coverage

Every lettered objective of the handbook outline is served: A&P A by u1l2 and u1l3, B by
u1l2 and u1l3, C by u1l4, D by u1l1 and u1l4; Safety A by u2l1, B by u2l5, C by u2l2 to
u2l4, D by u3l1 to u3l3, E by u3l4; Electricity A by u4l1, B by u4l2 and u4l3, C by u4l4,
D by u4l6, E by u4l5; Function A by units 5 to 7, B by u5l3, u5l6, u6l3, u7l2, C by u8l1,
D by u1l1 and u1l4, E by u8l2 and u8l3; Problem Solving A by u9l2, B by u9l3, C by u9l4 to
u9l9, D by u9l1, E by u9l10; Healthcare IT A by u10l8 and u10l9, B by u10l3 to u10l6,
C by u10l2, u10l10, u10l11, D by u10l7. The coverage check in section 3 proves it by term.

## 3. Content sources and verification

Content is written from the handbook outline and the writer's own knowledge, never from
the guide's or the workbook's wording. The term check runs three ways, extending
`scripts/termcheck.py` with a CRES pack path and a text-file reader beside its PDF readers:

1. **The Mometrix CRES guide** (`CRES-study-guide-OCR.txt`): its section headings (the
   ALL-CAPS lines) and the bold key terms (the "Term:" definition lines) must each appear
   in some lesson, deep dive, or cheat-sheet text, stemmed and with UK spellings normalized.
2. **The Bushong workbook** (`Stewart C. Bushong.pdf`): its table of contents (chapters 1 to
   40, the math tutor, the 25 experiments) and the worksheet terms for chapters that the
   outline covers: 1 to 12 (physics, the beam), 16 to 20 (beam restriction, grid, exposure,
   image quality, technique), 22 to 32 (mammography, fluoroscopy, interventional, computers,
   digital radiography and fluoroscopy, CT, QC, artifacts), 38 to 40 (health physics,
   designing for protection, protection procedures). Chapters 13 to 15 (film, processing,
   screens) and 33 to 37 (radiobiology) are checked at heading level only, because the exam
   treats film as history and radiobiology as dose limits.
3. **The handbook outline**: every lettered objective's named examples must appear in at
   least one lesson: heart, lungs, liver, brain; gastrointestinal, circulatory,
   musculoskeletal, endocrine; MRI magnetic environment; electromagnetic interference; TJC,
   CMS, OSHA, FDA/BRH, MQSA, ACR, ANSI/AAMI; CMMS, recalls; 3-phase, 480 VAC; ultrasound,
   portable x-ray batteries; UPS, line conditioning; x-ray tubes, generators, digital
   detectors, ultrasound probes, gamma cameras; preventive and corrective maintenance;
   positional terminology; digital voltmeter, electrical safety analyzer, dosimeter; risk
   prioritization; schematic diagrams, manuals, diagnostic software, test equipment;
   radiological, fluoroscopy, mammography, diagnostic ultrasound; device error versus use
   error; communicating with clinicians and manufacturers; system and network security;
   PACS, DICOM, Worklist; cable tracers, PING, DICOM echo; application interrelatedness.

Safety numbers (shock thresholds, ground resistance, chassis leakage limits with their
standard and edition) are copied from the CBET pack verbatim and checked by the same list.
Radiation numbers (occupational and public dose limits, the inverse square law, HVL,
fluoroscopy dose-rate limits, MQSA intervals) are checked against the guide and the
workbook; any number that appears in neither is left out of the pack rather than guessed.

Reuse from CBET: units 1, 2, 4, and 10 start from the CBET lessons the roadmap names
(`u1l1` to `u1l5`, `u3l1`, `u3l2`, `u3l4` to `u3l7`, `u2l1` to `u2l5`, `u9l1` to `u9l7`),
rewritten for imaging rather than copied; units 5 to 9 are new writing, seeded by CBET
`u5l5` (the imaging recognition lesson) and `u4l6` (test equipment).

## 4. Questions, generators, cheat sheet, glossary

- **Questions** (`questions-*.js`): at least five per lesson, 300 total, answer keys
  balanced across A to D, every question tied to a lesson, each with an explanation that
  names the reason, not the letter. Problem-solving items read as a symptom and ask for the
  FIRST or MOST likely step.
- **Generators** (`generators.js`): five transfer from CBET as they stand: Ohm's law and
  series/parallel, RC time constants, leakage limits and shock thresholds, unit conversions,
  same-subnet-or-gateway. New for CRES: the inverse square law (intensity at a new distance),
  mAs arithmetic (mA times time, and the 15 percent kVp rule), tube heat units (kVp times
  mA times s times the waveform factor) against a stated anode capacity, half-value layer
  (how many layers to reach a fraction), and a dose-rate item (time to a limit at a stated
  rate). `generatedNote` names them all.
- **Cheat sheet** (`cheatsheet.js`): 12 pages organized by the six domains: positional and
  projection terms; dose units and limits; the inverse square law, HVL, and ALARA;
  regulators and what each one asks for; Ohm's law, 3-phase, UPS; tube, generator, and
  technique relationships; receptor and fluoroscopy facts; PM and QC intervals; the
  troubleshooting method and fault tables; PACS, DICOM, HL7, and the network tools. Printed
  to `dist/cres-cheatsheet.pdf` by the README's headless Chrome command.
- **Glossary** (`acronyms.js`): every acronym used in the pack, with the coverage test
  (`node tests/acronyms.js courses/cres`) green.

## 5. Site and catalog

- `cres/index.html` shell with the same engine loader list as `cbet/index.html` plus the
  pack files (`tests/loaders.js` audits it).
- Catalog card under AAMI certifications after CBET: pill Free, title `CRES Academy`,
  one sentence naming the ACI Certified Radiology Equipment Specialist, 60 lessons, the
  cheat sheet, adaptive tutorials, practice tests; links to the lessons, practice test, and
  cheat sheet pages. The ItemList JSON-LD gains the entry.
- `build.py`, `scripts/stage.sh`, `site/build-site.js`, `tests/` course lists, the account
  page, and the README's live-courses sentence all add `cres`.
- The static generator produces the landing page at `/cres/` (title, H1, and intro from the
  SEO block, the eligibility clause in the FAQ), `/cres/practice-test/` with twenty explained
  bank questions, `/cres/lessons/` with the fifteen free lessons, `/cres/cheatsheet/`, and the
  app at `/cres/app/`; the sitemap picks them up.

## 6. Tests

Existing `npm test` runs on the new pack: selftest (every lesson has a deep dive and five or
more questions), gating, acronym coverage, loaders, site parity, catalog (the card and its
section), summary, merge, gen-smoke, balance-keys, analytics. Extended: `tests/catalog.js`
expects `cres/` under `aami` after `cbet/`; `tests/site.js` and the loaders test take the
new course id from the shared lists. New: the term check and the outline coverage check
run from `scripts/termcheck.py` with the CRES constants and are recorded in the plan's
Status with their counts before the pack is called done.

## 7. Delivery order

1. This spec, committed.
2. One content plan (there is no engine work), executed by subagent-driven development on
   branch `cres-academy` off `main`, cheat sheet first, then units in order, deep dives,
   questions, generators, glossary, the course page and catalog card, the term and coverage
   checks, build and PDF, static pages, stage.
3. Staging through `scripts/stage.sh`; Blake pushes and deploys.

## 8. Assumptions and out of scope

- The 70 percent pass bar is an assumption; ACI publishes no cut score.
- Unit 7 (ultrasound, nuclear medicine, MRI) is recognition depth, checked against the guide
  and the CBET imaging lesson's sources; if the Bushong textbook is added later it joins
  check 2 without any other change.
- No labs, no certificate, no untested domain, no CHTM, no aesthetic pass, no
  competitor-style pages; each is its own project later.
- Pricing stays free (`freeCourse: true`).
- The Mometrix guide and the AAMI-licensed materials are personal-use references; nothing
  from them is reproduced in the pack.

## Appendix: reference sources on disk (2026-10-14)

| File | What it is | Used for |
|---|---|---|
| `E:\CERT GUIDES\CRES\CRES-study-guide-OCR.txt` | Mometrix CRES guide, pages 19 to 85, OCR'd from screenshots (method in `E:\CERT GUIDES\CRES\ocr\`) | check 1 |
| `E:\CERT GUIDES\CRES\Stewart C. Bushong.pdf` | Bushong, Workbook and Laboratory Manual for Radiologic Science for Technologists, 432 pages | check 2 |
| `E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf` | ACI handbook 2026, CRES outline on pages 16 to 19 | check 3, exam facts |
| `E:\CERT GUIDES\CBET\` | the CBET pack's references | safety numbers, units 1, 2, 4, 10, Unit 7 |
| `E:\CERT GUIDES\CHTM\AAMI CHTM Study Guide (Lynch, 2016).pdf` | AAMI CHTM study guide, 58 pages | CHTM later, not CRES |
