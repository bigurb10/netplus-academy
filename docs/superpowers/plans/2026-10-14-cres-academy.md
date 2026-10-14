# CRES Academy: the content pack

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/cres/`, the CRES Academy pack for the AAMI/ACI Certified Radiology Equipment Specialist exam: cheat sheet, 60 lessons in 10 units with deep dives, 300+ questions, 9 generators, an acronym glossary, the course page, the catalog card, the reference term checks, the first build, and a local stage.

**Architecture:** A course pack is plain data: `courses/cres/*.js` files that fill `FRA.course`, `FRA.units`, `FRA.deep`, `FRA.questions`, `FRA.generators`, `FRA.acronyms`, `FRA.cheatsheet`. The engine renders them, the self-test validates them, `build.py` bundles them, and `site/build-site.js` writes the landing, practice-test, lesson, and cheat-sheet pages. No engine change is needed (spec: no labs, no certificate, no untested domain).

**Tech Stack:** Vanilla JS packs loaded as `<script>` tags, Node 20 + jsdom tests (`npm test`), `python build.py` bundler (PyMuPDF available for the PDF checks), headless Chrome for the cheat sheet PDF, `scripts/stage.sh` for staging.

Spec: `docs/superpowers/specs/2026-10-14-cres-academy-design.md`.

## Global Constraints

- Course id `cres`, name **CRES Academy**, badge `CR`, brand FieldReady Academy. Exam: vendor `AAMI / ACI`, title `Certified Radiology Equipment Specialist`, code `CRES`, 165 questions, 180 minutes, `passPct: 70`. Practice tests: 50 questions, 55 minutes, pass 80, 3 of the last 5. Domains and quotas: 1 Anatomy and Physiology 7% quota 4; 2 Public Safety in the Healthcare Facility 8% quota 4; 3 Fundamentals of Electricity and Electronics 10% quota 5; 4 Healthcare Technology and Function 25% quota 12; 5 Healthcare Technology Problem Solving 25% quota 13; 6 Healthcare Information Technology 25% quota 12. Free course, 15 free lessons, no labs, no certificate.
- 2026 handbook facts (from the roadmap note, verified against `E:\CERT GUIDES\BMET\ACI-Certification-Handbook-090926.pdf` pages 16 to 19, 31, 33, 37, 43): offered twice a year in the windows **May 1 to 15** and **November 1 to 15**, computer-based at Kryterion test centers (travel up to 100 miles may be needed); 165 multiple-choice questions in 3 hours, closed book, on-screen calculator and notepad only; criterion-referenced cut score by the modified Angoff method, no published cut score; results pass or fail at once and by email within 24 hours, with a scaled score and an analysis of performance for those who do not pass; fee **$410 member / $460 non-member**, retake **$355 / $405** (2027: $425 / $480, retake $370 / $425); retake after 60 days, at most three attempts in two years, then a one-year wait. Eligibility, full certification: ONE of (1) an associate degree or higher in an electronics, technology, or science program plus two years of full-time BMET work, (2) a US military biomedical equipment technology program plus two years, (3) four years of full-time BMET work; AND at least **40 percent of work experience in the radiology specialty over the last two years, with 25 percent over the last five years**. Candidate status with the degree, the military program, or two years of work alone. Say the 40 percent clause plainly in the landing FAQ, the exam-day notes, and the cheat sheet.
- Blake's content rules: original content, no reference to any book, guide, or source anywhere in the pack; cheat sheet first; plain words; every lesson has 5 or more questions, a deep dive, and a checkpoint; feedback buttons come from the engine. Nothing from the Mometrix guide or the Bushong workbook is reproduced; they are references the term check reads.
- Numbers: every number in the pack must appear in the Mometrix guide (`E:\CERT GUIDES\CRES\CRES-study-guide-OCR.txt`), the Bushong textbook (`E:\CERT GUIDES\CRES\Bushong - Radiologic Science for Technologists 10e.pdf`, 677 pages with a text layer), the Bushong workbook (`E:\CERT GUIDES\CRES\Bushong - Workbook and Laboratory Manual.pdf`), the ACI handbook, or the CBET pack's safety list; a number in none of them is left out, not guessed. Healthcare IT facts (ports, cable categories and distances, DICOM services, HL7 message types, network tools) may instead come from the CBET pack's informatics lessons or the NetPlus pack, which the spec names as the references for that domain (ruling 2026-10-14 after the Task 1 review). Electronics fundamentals shared with the CBET pack (Ohm's law and circuit math, RC time constants, component behaviour, the shock and leakage table) may likewise come from the CBET pack's electricity lessons, which were checked against that pack's electronics reference; where a brief names a number that no reference carries (the inch-based SIDs, the thyroid shield thickness, 208 VAC), the lesson teaches the sourced value and the brief's number is dropped (rulings 2026-10-14 after the Task 2 review). When the guide and the textbook disagree on a physics number, the pack uses the textbook's value and says "about". To look a number up, search the textbook with PyMuPDF (`fitz`) from a scratchpad script; never paste its text into the pack. Unit 7 (ultrasound, nuclear medicine, MRI) is recognition depth: what each system is, its main parts, what the technician services, no numeric limits beyond what the guide states.
- Safety numbers are copied from the CBET pack verbatim and must agree across lesson, deep dive, cheat sheet, and generator: perception 1 mA; 5 mA accepted maximum harmless; let-go 10 to 20 mA; 50 mA pain, possible fainting, respiratory arrest; 100 to 300 mA ventricular fibrillation likely; 6 A and above sustained contraction and burns; microshock 10 microamps delivered directly to the heart; ground (chassis to plug ground pin) resistance 0.5 ohm maximum (NFPA 99); chassis (touch) leakage 500 microamps in current NFPA 99 editions (older editions 300 or 100); IEC 60601-1 touch current 100 microamps normal / 500 single fault; patient leakage type B and BF 100 / 500 microamps, type CF 10 / 50; earth leakage 5 mA / 10 mA; GFCI trip 4 to 6 mA; patient care vicinity 6 ft (1.8 m) and 7.5 ft (2.3 m). State every limit with its standard (NFPA 99 or IEC 60601-1).
- Plain ASCII in every pack file and in this plan: write `deg` for degrees, `x` for multiply, `plus or minus`, `C` and `F` for temperatures, `ohm`, `microamps`, no em dashes, no curly quotes. Write content files with the Write tool, never a shell heredoc (heredocs halve backslashes).
- Lesson objects keep the CBET line format exactly, because `build.py` reads them with regexes: the first line of every lesson is `id: "uNlM", title: "...", domain: N, obj: "...", minutes: N,`, then `body:` as a template literal, then `hook:`.
- The acronym test forbids a glossary entry from naming another course: in `courses/cres/acronyms.js` entry text never write the literal tokens `CBET`, `CABT`, `BMET Academy`, `Network+`, `Net+`, `Security+`, `Sec+`, or `A+`; write the credential's full name instead. The keys `CBET` and `CABT` themselves are allowed (and needed for the eligibility ladder).
- Commit after every task; never push (Blake pushes). Work on branch `cres-academy` off `main`.

## Conventions every content task follows

Read these before writing any pack file. They are the contract the tests enforce.

**Mini-markup (lesson `body`, `hook`, deep dives):** `## ` heading, `- ` bullet, `1. ` step, `> ` tip line, ``` fenced block (tables and diagrams; inside a JS template literal the fence is written `\`\`\``), `{{text}}` inline code, `**text**` bold. `tests/packcheck.js` requires every body to have at least 180 words, a `## ` heading, a `> ` tip line, and balanced fences; every deep dive at least 300 words with balanced fences. Every body ends with a `> Exam tip:` line.

**Curriculum file shape** (`courses/cres/curriculum-N.js`):

```js
// CRES Academy curriculum, units 1 to 4. Original teaching content for the AAMI/ACI CRES exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Anatomy, Positioning, and Medical Language", domain: 1,
  blurb: "The organs and systems an imaging technician must recognize, the planes and positions radiographers speak in, and the words on a requisition.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "Body Organization, Planes, Habitus, and Positional Terminology", domain: 1, obj: "A&P-D", minutes: 9,
      body: `...`,
      hook: "..."
    }
  ]
});
```

Unit `domain` is the domain its lessons belong to. `obj` is the outline letter the lesson serves, written `A&P-A` to `A&P-D`, `SAF-A` to `SAF-E`, `E&E-A` to `E&E-E`, `FUN-A` to `FUN-E`, `PS-A` to `PS-E`, `HIT-A` to `HIT-D`.

**Deep file shape** (`courses/cres/deep-N.js`): `Object.assign(FRA.deep, { u1l1: \`...\`, u1l2: \`...\` })` with one key per lesson in that file's units, preceded by `window.FRA = window.FRA || {}; FRA.deep = FRA.deep || {};`. Fenced tables are the house style for "what to memorize" blocks.

**Questions file shape** (`courses/cres/questions-N.js`): `window.FRA = window.FRA || {}; FRA.questions = FRA.questions || []; FRA.questions.push({id:"u1l1-1",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."}, ...)`. Ids `<lesson>-<n>`. Stems are scenarios an imaging technician meets, at least 20 characters; four distinct options; explanations at least 40 characters that teach the rule, not just the answer. No two stems share their first 70 characters. Problem-solving stems read as a symptom and ask for the FIRST or MOST likely step. After writing a file run `node tests/balance-keys.js courses/cres/questions-N.js` so correct answers spread across A to D.

**Acronyms** (`courses/cres/acronyms.js`): `FRA.acronyms = { "KEY": { full, tip, more } }` plus `FRA.acronymIgnore = [...]` for uppercase words that are not acronyms (`MOST`, `FIRST`, `BEST`, `LEAST`, `NOT`, `OK`, `OL`, `ON`, `OFF`, `II`, `III`, `IV`, `RAO`, `LAO`, `RPO`, `LPO` are acronyms and get keys). `node tests/acronyms.js courses/cres` must pass after every content task: every acronym-looking token in lessons, hooks, deep dives, cheat sheet, exam-day tips, and questions is a key or ignored, and no key is unused.

**Generators** (`courses/cres/generators.js`): the shape in Task 5. `node tests/gen-smoke.js courses/cres 500` must report 0 problems (four unique options, a real correct index, no `(1)` filler).

**Pack tools:** `node tests/packcheck.js courses/cres` (structure, counts, deep coverage, key skew), `node tests/balance-keys.js <file>`, `node tests/acronyms.js courses/cres`, `node tests/gen-smoke.js courses/cres 500`. The full `npm test` only picks the pack up once `courses/cres/course.js` exists (Task 6).

**What a lesson reads like.** Open with why the topic matters on the bench, teach the mechanism in plain words, give the numbers in a fenced table, and close with what the exam asks. A technician, not a radiographer, is the reader: positioning is taught as what the equipment must do, physics as what the generator and tube must do, and every fault as symptom, cause, check, fix.

## File structure

Create:
- `courses/cres/cheatsheet.js`, `courses/cres/acronyms.js` (Task 1; acronyms grows in every later task).
- `courses/cres/curriculum-1.js`, `deep-1.js`, `questions-1.js` (Task 2: units 1 to 4, 19 lessons).
- `courses/cres/curriculum-2.js`, `deep-2.js`, `questions-2.js` (Task 3: units 5 to 8, 19 lessons).
- `courses/cres/curriculum-3.js`, `deep-3.js`, `questions-3.js` (Task 4: units 9 and 10, 22 lessons).
- `courses/cres/generators.js` (Task 5).
- `courses/cres/course.js`, `cres/index.html` (Task 6).
- `scripts/termcheck_cres.py` (Task 7).

Modify:
- `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md` (Task 6).
- This plan's Status section (Tasks 7 and 8).

---

### Task 1: Cheat sheet and the first acronym glossary

Blake's rule: the cheat sheet comes before any lesson. Target about 12 printed pages (roughly 380 to 420 lines of source).

**Files:**
- Create: `courses/cres/cheatsheet.js`
- Create: `courses/cres/acronyms.js`

**Interfaces:**
- Produces: `FRA.cheatsheet = { title, intro, sections: [{ id, title, blocks: [{ type: "table", cols, rows } | { type: "list", title, cols: 2, items } | { type: "note", text }] }] }` and `FRA.acronyms` + `FRA.acronymIgnore`. Later tasks add glossary keys; they never rename these section ids.

- [ ] **Step 1: Write `courses/cres/cheatsheet.js`**

Header and shape (copy exactly, then fill the sections):

```js
// CRES Academy memorization sheet for the AAMI/ACI CRES exam. Numbers, limits, formulas, device facts,
// standards, and orders of steps an imaging technician must recall cold. Original content. Safety limits name their standard.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CRES Memorization Sheet",
  intro: "Print this and keep it beside you. The CRES exam rewards recall of dose limits, the inverse square law, tube and generator relationships, QC tolerances, regulators and what each asks for, and the network tools of the imaging department. Every number on this sheet is fair game.",
  sections: [ ... ]
};
```

Sections, in this order, with the rows each must contain (add more rows freely; never fewer; every number checked against the guide, the workbook, the handbook, or the CBET safety list, and dropped if in none):

1. `exam` "The exam itself": table of facts (certifying body ACI; 165 multiple-choice questions; 3 hours, closed book, on-screen calculator and notepad; six domains with the percentages 7 / 8 / 10 / 25 / 25 / 25 named in full; windows May 1 to 15 and November 1 to 15 at Kryterion centers; results pass or fail at once and by email within 24 hours, scaled score only for those who do not pass; no published cut score, this course uses 70%; fee $410 member / $460 non-member, retake $355 / $405; 60-day retake wait, three attempts in two years); an eligibility table (the three pathways; the 40 percent radiology clause over two years and 25 percent over five, in those words; candidate status); a `note` block: "This course's official-format test uses 70%, the same bar as our CBET course; ACI publishes no cut score."
2. `positioning` "Anatomy, positioning, and terminology": directions table (anterior, posterior, superior, inferior, medial, lateral, proximal, distal, supine, prone, erect, recumbent, lateral decubitus, dorsal decubitus, ventral decubitus, each with one plain-words meaning); projections table (AP, PA, lateral, oblique RAO / LAO / RPO / LPO, axial, tangential, decubitus); planes table (sagittal, midsagittal, coronal, transverse or axial); topographic lines table (orbitomeatal, infraorbitomeatal, glabellomeatal, acanthiomeatal: from where to where); thoracic landmarks table (T1 about 2 inches above the sternal notch; T2 to T3 the sternal notch; T4 to T5 the sternal angle; T6 to T7 the lower scapula; T10 the xiphoid tip); body habitus table (hypersthenic about 5%, sthenic about 50%, hyposthenic about 35%, asthenic about 10%, with the organ placement note for each); systems table (circulatory, respiratory, gastrointestinal, urinary, musculoskeletal, nervous, endocrine, lymphatic: key organs, what imaging shows, one common pathology); word parts list (prefixes, roots, suffixes used on requisitions).
3. `radiation` "Radiation: quantities, limits, and protection": quantities table (exposure in roentgen and C/kg; air kerma in gray; absorbed dose in gray and rad, 1 Gy = 100 rad; equivalent dose in sievert and rem, 1 Sv = 100 rem; effective dose in sievert; the prefixes milli and micro); dose limits table (occupational effective dose 50 mSv per year; cumulative 10 mSv x age in years; lens of the eye 150 mSv per year; skin, hands, and feet 500 mSv per year; public 1 mSv per year for frequent exposure, 5 mSv infrequent; embryo or fetus 0.5 mSv per month once declared; trainees under 18 1 mSv per year; natural background about 3 mSv per year); the cardinal rules table (time, distance, shielding; inverse square law I1 / I2 = (d2 / d1) squared with a worked example; ALARA); protective apparel table (apron lead equivalent 0.25 mm minimum and 0.5 mm standard, thyroid shield 0.5 mm, gloves 0.25 mm; checked yearly by fluoroscopy or radiograph, replaced on cracks); fluoroscopy limits table (tabletop exposure rate not above 10 R/min (88 mGy/min) with automatic brightness control, 5 R/min (44 mGy/min) without, high-level control up to 20 R/min (176 mGy/min); the 5-minute cumulative timer with an audible signal; minimum source-to-skin distance 38 cm for stationary and 30 cm for mobile fluoroscopes); MRI table (zones I to IV, the 5-gauss line, projectiles, quench, RF heating and burns, implants, cryogens, EMI from imaging equipment); a `note` on pregnancy and pediatric practice (declare, shield, collimate, lowest technique, gonadal shields when they do not cover the region of interest).
4. `regulation` "Regulators, standards, and what each asks for": table (FDA and its Center for Devices and Radiological Health, the former Bureau of Radiological Health: 21 CFR 1020 performance standards for radiation-emitting products; state radiation control programs: registration, inspections, operator rules; CMS: conditions of participation and surveys; The Joint Commission: environment of care, equipment inventory, PM completion, inspection history; MQSA under the FDA: annual physicist survey, annual inspection, accreditation by ACR, QC schedule; ACR: accreditation and phantom standards; OSHA: worker safety, hazard communication, PPE; ANSI/AAMI: equipment management standards; NCRP: dose limits and shielding reports; NEMA: equipment standards); the 21 CFR 1020 numbers table (tube housing leakage not above 100 mR/h (0.88 mGy/h) at 1 m; automatic exposure control backup timer 6 s or 600 mAs; light field to x-ray field within 2% of SID; fluoroscopy limits as in section 3; minimum half-value layers by kVp as the workbook states them); the CMMS table (what a work order records, PM due lists, service history, recall tracking, compliance and performance reports, the equipment inventory the surveyor asks for).
5. `electricity` "Electricity, electronics, and imaging power": Ohm's law table (V = I x R, I = V / R, R = V / I, P = V x I, P = I squared x R, P = V squared / R); prefixes table (kilo, milli, micro; kV, mA, ms); components table (resistor, capacitor, inductor, transformer, diode, rectifier, transistor, SCR, fuse, breaker, relay, contactor, interlock); facility power table (single-phase 120 / 240 V; three-phase 208 / 480 VAC; the dedicated imaging feed and its disconnect; line voltage compensation; the autotransformer; the step-up transformer ratio about 1:500 to 1:1000; the filament step-down transformer); rectification and ripple table (half-wave, full-wave, three-phase six-pulse about 13% ripple, twelve-pulse about 4%, high-frequency under 1%; single-phase 100%); power protection table (UPS online, line-interactive, standby; line conditioners; isolation; surge protection; what a brownout does to a generator); battery systems table (ultrasound carts and portable x-ray: lead-acid or lithium-ion packs, charge before use, capacity fade, what a low pack does to exposure); shock table (the CBET numbers verbatim with their standard).
6. `tubes` "X-ray production, tubes, and generators": tube parts table (cathode: tungsten filament with thorium, focusing cup; anode: tungsten-rhenium target on molybdenum and graphite, atomic number 74, melting point about 3,400 C; rotor and stator, about 3,400 rpm standard and about 10,000 rpm high-speed; anode angle about 7 to 17 deg; line-focus principle; anode heel effect; focal spots small about 0.3 to 0.6 mm and large about 1.0 to 1.2 mm; glass or metal envelope; oil; housing); production table (about 1% of electron energy becomes x-rays, 99% heat; bremsstrahlung most of the beam; characteristic radiation from K-shell transitions, tungsten K-shell binding about 69.5 keV); the factors table (kVp sets quality and quantity, quantity rises about with kVp squared; mA and time set quantity, linear; mAs = mA x s and reciprocity; the 15 percent rule: raise kVp 15 percent and halve the mAs for the same receptor exposure; filtration hardens the beam, total at least 2.5 mm Al above 70 kVp; distance by the inverse square law); heat units table (HU = kVp x mA x s; one heat unit is about 1.4 J; tube rating charts, anode and housing cooling curves); tube failure table (filament evaporation, anode cracking from a cold anode, pitting, arcing, bearing wear; warm-up procedure; never exceed the rating chart); generator controls table (kVp, mA, time, mAs, AEC ionization chambers and backup timer, line compensation, rotor ready, exposure switch and interlocks); image quality table (density, contrast, recorded detail, distortion: what raises and lowers each); beam control table (collimator with positive beam limitation, grids by ratio and frequency, Bucky factor, air gap, compensating filters).
7. `receptors` "Receptors, fluoroscopy, mammography, CT, ultrasound, nuclear medicine, MRI": receptor table (film-screen and intensifying screens as history; computed radiography: photostimulable phosphor plate, laser reader, erase; direct radiography: indirect cesium iodide on amorphous silicon, direct amorphous selenium; detective quantum efficiency; exposure index and deviation index; calibration: offset, gain, defective pixel map); fluoroscopy table (image intensifier: input phosphor, photocathode, electrostatic lenses, output phosphor, brightness gain = minification gain x flux gain; automatic brightness control; magnification modes raise dose; flat-panel fluoroscopy; digital subtraction; last-image hold; pulsed fluoroscopy lowers dose; C-arm and the interventional suite); mammography table (molybdenum, rhodium, or tungsten targets and filters; about 25 to 35 kVp; small focal spots; compression about 25 to 45 lb (111 to 200 N); AEC; digital breast tomosynthesis; the MQSA QC schedule: processor or detector daily, phantom weekly, visual checklist monthly, compression semiannual, physicist annually; ACR phantom scoring: fibers, speck groups, masses); CT table (gantry, slip ring, rotating tube and detector array, helical or spiral scanning, pitch, Hounsfield units with water 0, air about minus 1,000, dense bone about plus 1,000; tube cooling; reconstruction; recognition depth); ultrasound table (about 2 to 15 MHz; piezoelectric elements; frequency versus depth and resolution; attenuation; probe types linear, curved, phased array, transesophageal; Doppler; high-level disinfection; element dropout; recognition depth); nuclear medicine table (gamma camera: collimator, sodium iodide crystal, photomultiplier tubes; technetium-99m 140 keV and about 6-hour half-life; PET annihilation photons 511 keV; hybrid SPECT/CT and PET/CT; dose calibrator; recognition depth); MRI table (superconducting magnet 1.5 or 3 T, gradients, RF coils, liquid helium cryogen, quench, zones, what the technician services: chillers, cold head, coils, table, peripherals; recognition depth).
8. `pm` "PM, QC, and test equipment": PM essentials table (mechanical: locks, detents, cables, collision, table and tube stand; electrical: grounding and leakage with the CBET numbers; interlocks; radiation output; software and error logs; documentation); radiography QC table (kVp accuracy, timer accuracy, mA linearity, reproducibility, collimation and beam alignment, half-value layer, focal spot, SID indicator: each with the tolerance the workbook's QC chapter states, in its words); fluoroscopy QC table (exposure rate at the tabletop, timer, SSD, image quality with a resolution and contrast phantom); mammography QC table (the MQSA schedule as in section 7); ultrasound QC table (phantom, probe inspection, display); test equipment table (non-invasive kVp meter; dosimeter, ionization chamber, solid-state detector; dose area product meter; timer and mAs meter; half-value layer filters; phantoms; digital voltmeter; electrical safety analyzer with the CBET limits; dose calibrator for nuclear medicine); documentation table (what the surveyor asks for: inventory, PM completion, QC logs, physicist reports, recalls, training).
9. `troubleshooting` "Troubleshooting imaging systems": the method list (symptom, history, isolate, verify; device error versus use error; repair, replace, escalate); priority table (patient safety first, then clinical downtime, then compliance, then convenience); fault tables for radiographic rooms (no exposure: interlocks, door, rotor, ready, exposure switch, generator fault; low or high output: kVp, mA, filtration, tube aging, AEC; artifacts: grid lines and cutoff, defective pixels, dust on a CR plate, ghosting, moire; mechanical: locks, detents, collision, collimator), fluoroscopy (dim or noisy image: ABC, intensifier aging, camera, flat panel; dose rate too high), mammography (compression paddle, AEC detector, filter wheel, phantom failures), ultrasound (element dropout, cable, disinfection damage, Doppler noise, display), portables and C-arms (battery, charger, brakes, cables, collimator); a `note` on the service report and talking to radiology staff and the manufacturer.
10. `it` "Imaging informatics": network table (IP address, subnet mask, default gateway, DHCP, DNS, switch versus router, VLAN, wired versus wireless; cable categories and connectors); tools table (PING, traceroute, ipconfig or ifconfig, cable tracer and tester, port light, DICOM echo); DICOM table (association, AE title, host, port 104 or 11112, SOP class, C-ECHO, C-STORE, C-FIND, C-MOVE, modality worklist, MPPS, storage commitment, GSDF display calibration); systems table (PACS archive and workstations, VNA, RIS, HL7 messages ADT, ORM, ORU, the order-to-report path, the EMR, the broker or interface engine); security table (HIPAA, HITECH, MDS2 form, IEC 80001, least privilege, patching, segmentation, encryption, vendor remote access through VPN, backups and restore tests); a `note` on application interdependence (a worklist that stops feeds every modality; a down archive fails every reading station).

- [ ] **Step 2: Load the sheet in jsdom and check its shape**

Run:
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/cres/cheatsheet.js','utf8'));const cs=w.FRA.cheatsheet;const ids=cs.sections.map(s=>s.id);console.log(ids.join(','));let rows=0,bad=0;cs.sections.forEach(s=>s.blocks.forEach(b=>{if(b.type==='table'){b.rows.forEach(r=>{rows++;if(r.length!==b.cols.length)bad++;});}else if(b.type==='list'){rows+=b.items.length;}else if(b.type!=='note'){bad++;}}));console.log('rows',rows,'bad',bad);"
```
Expected: `exam,positioning,radiation,regulation,electricity,tubes,receptors,pm,troubleshooting,it` and `bad 0` with `rows` above 200.

- [ ] **Step 3: Write `courses/cres/acronyms.js` covering the sheet**

Header:

```js
// CRES Academy acronym glossary. Every acronym used in the lessons, deep dives, cheat sheet, and questions.
// Rendered by the engine as hover links and as the cheat sheet's Acronyms section. Keys match whole words,
// case-sensitive, plurals allowed. Original wording. Fields: full, tip (one sentence), more (longer; blank line = paragraph).
window.FRA = window.FRA || {};
FRA.acronyms = {
  "AAMI": { full: "Association for the Advancement of Medical Instrumentation", tip: "The standards body for medical equipment and the sponsor of the technician credentials.", more: "AAMI publishes the equipment-management standards hospitals follow and the US adoption of IEC 60601. Its credentials institute, ACI, runs the radiology equipment specialist exam this course prepares you for." },
  "ACI": { full: "AAMI Credentials Institute", tip: "The body inside AAMI that writes and administers the certification exams.", more: "ACI sets each exam's content outline, eligibility, fees, and retake rules, and reports results as pass or fail." },
  "CRES": { full: "Certified Radiology Equipment Specialist", tip: "The ACI credential for technicians who service imaging equipment: 165 questions, 3 hours, offered in May and November.", more: "Full certification needs the technician pathway plus at least 40 percent of work experience in radiology over the last two years and 25 percent over five. Recertified every three years with continuing education." },
  ...
};
FRA.acronymIgnore = ["BEST", "FIRST", "LEAST", "MOST", "NOT", "OK", "OL", "ON", "OFF", "II", "III", "IV"];
```

Run `node tests/acronyms.js courses/cres`; add a key for every `missing:` line it prints (it shows the token and its context) until it passes. Expected keys at this point include at least: AAMI, ACI, CRES, CBET, CABT, CHTM, HTM, BMET, CMMS, PM, QC, DMM, DVM, LED, ESD, AC, DC, RMS, GFCI, NFPA, IEC, OSHA, PPE, ALARA, MRI, CT, PET, SPECT, RF, AP, PA, RAO, LAO, RPO, LPO, SID, SSD, OID, AEC, ABC, kVp, mA, mAs, HU, HVL, CR, DR, DQE, EI, DI, TFT, CsI, DSA, DBT, MQSA, ACR, FDA, CDRH, BRH, CFR, CMS, TJC, ANSI, NCRP, NEMA, CRCPD, UPS, SCR, VAC, VDC, HLD, PACS, VNA, RIS, EMR, EHR, HL7, DICOM, SOP, AE, MWL, MPPS, GSDF, IP, DHCP, DNS, VLAN, LAN, WAN, VPN, PING, ICMP, NIC, HIPAA, HITECH, MDS2, PHI, UPS, NaI, PMT, Tc, SPECT, TEE, HU (heat units and Hounsfield units: one key, the `more` text explains both uses).

- [ ] **Step 4: Verify and commit**

Run: `node tests/acronyms.js courses/cres 2>&1 | tail -2`
Expected: the pass line for `cres` with no `missing:` or `unused` lines.

```bash
git add courses/cres/cheatsheet.js courses/cres/acronyms.js
git commit -m "feat(cres): memorization sheet for the CRES and the first acronym glossary"
```

---

### Task 2: Units 1 to 4 (19 lessons, 95 questions)

**Files:**
- Create: `courses/cres/curriculum-1.js`, `courses/cres/deep-1.js`, `courses/cres/questions-1.js`
- Modify: `courses/cres/acronyms.js` (new keys the lessons introduce)

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's numbers (every number in a lesson agrees with the sheet).
- Produces: units `u1` (domain 1), `u2` (domain 2), `u3` (domain 2), `u4` (domain 3). Task 6's manifest lists these lesson ids in `starterPool` and `core`; do not rename them.

Reuse: the CBET pack's `u1l1` to `u1l5` (anatomy), `u3l1`, `u3l2`, `u3l4` to `u3l7` (safety and regulation), and `u2l1` to `u2l7` (electricity) cover the same ground at technician depth; read them for structure and the safety numbers, then write imaging-first lessons. Never copy a CBET body.

- [ ] **Step 1: Run the pack checker on the empty folder to see the baseline**

Run: `node tests/packcheck.js courses/cres`
Expected: `cres: 0 units, 0 lessons ... cheatsheet yes` then `packcheck: OK` (nothing to check yet).

- [ ] **Step 2: Write `courses/cres/curriculum-1.js`**

Each "covers" list is the minimum the body must teach, in the learner's words; the outline's own example terms are written in plain text so the Task 7 check finds them. Every body ends with a `> Exam tip:` line.

**Unit u1 "Anatomy, Positioning, and Medical Language"** (domain 1; blurb: the organs and systems the image shows, the planes and positions radiographers speak in, and the words on a requisition; assumes nothing)
- u1l1 `Body Organization, Planes, Habitus, and Positional Terminology` (A&P-D, 9). Covers: cells, tissues, organs, systems; the planes (sagittal, midsagittal, coronal, transverse or axial); directions (anterior, posterior, superior, inferior, medial, lateral, proximal, distal, supine, prone, erect, recumbent); the decubitus positions (lateral, dorsal, ventral); body habitus (hypersthenic, sthenic, hyposthenic, asthenic with the percentages and what each does to organ placement); why the technician needs these words (the radiographer's complaint names a position, the service manual names a plane).
- u1l2 `Chest, Abdomen, and Pelvis on the Image: Heart, Lungs, Liver, GI and Urinary Tracts` (A&P-A, 10). Covers: the heart as the pump and what a chest image shows (silhouette, size); the lungs, airway, diaphragm, pleura, and why inspiration matters for a chest film; the liver and gallbladder, the gastrointestinal tract from mouth to anus with the organs named, the urinary system (kidneys, ureters, bladder, urethra); contrast studies by system (barium, iodinated contrast, what reacts); the common pathologies each system's images are ordered for, at recognition level; which technique differences these systems demand (chest high kVp, abdomen grid, pelvis shielding).
- u1l3 `Skeleton, Spine, Skull, and Joints, with the Brain, Nervous, and Endocrine Systems` (A&P-B, 10). Covers: axial and appendicular skeleton, the five bone types, the vertebral column by region and count (7 cervical, 12 thoracic, 5 lumbar, 5 sacral fused, coccyx), the skull bones, joints by structure (fibrous, cartilaginous, synovial) and function; the brain, spinal cord, and nerves and why CT and MRI image them; the endocrine glands at recognition level; musculoskeletal pathologies imaging is ordered for; how bone density and thickness drive technique.
- u1l4 `Positioning by Exam: Projections, Topographical Landmarks, and Reading the Requisition` (A&P-C, 10). Covers: projections (AP, PA, lateral, oblique RAO / LAO / RPO / LPO, axial, tangential, decubitus); source-to-image distance (40 inches standard, 72 inches chest) and object-to-image distance; central ray, collimation to the part, markers (left and right); the topographic lines (orbitomeatal, infraorbitomeatal, glabellomeatal, acanthiomeatal) and the thoracic landmarks T1 to T10; what a requisition carries (patient identifiers, exam, side, history, pregnancy status) and the identifying markers every image must carry (name, identifier, date of birth, date, anatomic markers, orientation, time interval, inspiration or expiration, sequence); the relationship between anatomy, technique, and positioning across modalities (why the same part needs a different setup on CT, ultrasound, and radiography); positional terminology as the equipment sees it (table angle, tube angle, detector height).

**Unit u2 "Radiation, Magnetic, and Facility Safety"** (domain 2; blurb: how imaging hurts people and equipment, and the rules and numbers that keep dose low; assumes unit 1's terminology)
- u2l1 `Electrical and Mechanical Safety in the Imaging Suite, Patient Transfer and Moving` (SAF-A, 10). Covers: the shock table and the leakage limits with their standards (CBET numbers verbatim); grounding, GFCI, hospital-grade receptacles, no extension cords for patient care equipment; high voltage inside generators and tubes: capacitors that hold charge, lockout and tagout before opening a cabinet, discharge procedures; mechanical hazards: tube stands and overhead cranes, table drives, tilt, collision, pinch points, counterweights, brakes and locks, ceiling-mounted equipment inspections; patient transfer and moving (body mechanics, slide boards, lifts, log roll, never leave an unlocked table), restraints and consent at recognition level; protecting visitors and staff during a procedure.
- u2l2 `How Radiation Harms: Ionization, Dose Quantities and Units, Occupational and Public Limits` (SAF-C, 11). Covers: ionization, somatic versus genetic damage, direct and indirect effects, dose rate matters; the quantities and units table (exposure, air kerma, absorbed dose, equivalent dose, effective dose; gray and rad, sievert and rem, the 100-to-1 conversions, milli and micro); natural background about 3 mSv per year and the main artificial source is medical imaging; the dose limits table (occupational 50 mSv per year, cumulative 10 mSv x age, lens 150 mSv, skin and extremities 500 mSv, public 1 mSv frequent and 5 mSv infrequent, embryo or fetus 0.5 mSv per month, trainees under 18 1 mSv); personnel monitoring (badges, where worn, quarterly reports, who reviews them); the generator's numbers (unit conversion and time-to-limit questions come from this lesson).
- u2l3 `Time, Distance, Shielding, the Inverse Square Law, and ALARA in Practice` (SAF-C, 10). Covers: the three cardinal rules; the inverse square law with the formula and two worked examples (double the distance, one quarter the rate); ALARA as a program (policies, procedures, physical actions); fluoroscopy practice (pulsed mode, last-image hold, the 5-minute timer, collimation, magnification raises dose, where to stand, the drape and the shield); pediatric and pregnancy practice (declare, shield, collimate, lowest technique, repeat avoidance); repeat analysis as a dose program; the generator's inverse-square questions come from this lesson.
- u2l4 `Protective Apparel, Barriers, and Shields, and How They Are Tested` (SAF-C, 9). Covers: lead equivalents (aprons 0.25 mm minimum and 0.5 mm standard, thyroid shields 0.5 mm, gloves 0.25 mm, eyewear), proper storage (hang, never fold), annual inspection by fluoroscopy or radiograph and the replacement rule; primary and secondary barriers, control booth, lead glass, mobile shields; room design at recognition level (use factor, occupancy factor, workload, the physicist's shielding report); gonadal shields (shadow, flat contact, shaped) and when they are used; collimation as the first shield.
- u2l5 `The MRI Environment and Electromagnetic Interference: Zones, Projectiles, Quench, RF Heating` (SAF-B, 10). Covers: the static field is always on; zones I to IV and the 5-gauss line; projectile hazards (oxygen cylinders, floor buffers, tools, stretchers) and MR-safe, MR-conditional, MR-unsafe labels; ferromagnetic screening of patients and staff, implants and devices; quench: what it is, the vent, oxygen displacement, when to press the button; RF heating and burns (loops, cables, tattoos), acoustic noise, gradient effects, cryogen safety; electromagnetic interference from imaging equipment on nearby devices and from devices on imaging (what the technician checks when an image shows interference).

**Unit u3 "Regulation, Accreditation, and the CMMS"** (domain 2; blurb: who regulates imaging, what each one asks for, and how the CMMS proves it; assumes unit 2)
- u3l1 `Who Regulates Imaging: FDA and 21 CFR 1020, State Radiation Control, and CMS` (SAF-D, 10). Covers: the FDA's Center for Devices and Radiological Health (the former Bureau of Radiological Health) and the performance standards in 21 CFR 1020 (what they cover: tube housing leakage, collimation, AEC backup, fluoroscopy limits, timers, minimum filtration); state radiation control programs (registration of machines, inspections, operator credentials, the suggested state regulations); CMS conditions of participation and the survey; medical device reporting of incidents; the federal performance standards apply to the manufacturer and to anyone who modifies a system (why a technician's repair must keep the system within them).
- u3l2 `Mammography under MQSA and ACR Accreditation` (SAF-D, 10). Covers: the Mammography Quality Standards Act and the FDA program: certification, annual inspection, accreditation by an approved body (ACR), personnel requirements, the medical physicist's annual survey, the QC schedule (processor or detector daily, phantom weekly, visual checklist monthly, compression force and other semiannual tests, annual physicist tests), the ACR phantom and its scoring, records retention, what a technician's PM must leave in compliance (compression force, AEC, phantom image after any receptor work); ACR accreditation for other modalities at recognition level.
- u3l3 `The Joint Commission, OSHA, ANSI/AAMI Standards, and the Radiation Safety Committee` (SAF-D, 10). Covers: The Joint Commission's environment of care and equipment management standards (inventory, PM strategy, completion rates, inspection history, imaging-specific requirements such as the annual physicist survey and dose documentation); OSHA (worker safety, hazard communication, PPE, bloodborne pathogens, lockout and tagout); ANSI/AAMI standards for equipment management programs; NCRP reports as the source of limits and shielding guidance; NEMA standards for equipment; the radiation safety committee and radiation safety officer; what documentation a survey asks for and how a technician prepares it.
- u3l4 `The CMMS: Service History, Recalls, and Compliance and Performance Reports` (SAF-E, 9). Covers: what the computerized maintenance management system holds (inventory, work orders, PM schedules, parts, costs, labor, service history by device); navigating it (open, document, close a work order; attach reports; record test results); tracking recalls and alerts (FDA recalls, manufacturer field notices, how a device is located and the action documented); generating compliance reports (PM completion, overdue, inspection history) and performance reports (mean time between failures, cost of service, downtime); why complete records are the technician's defense in an incident.

**Unit u4 "Electricity, Electronics, and Imaging Power"** (domain 3; blurb: the circuit theory, components, and facility power an imaging generator depends on; assumes nothing beyond unit 1)
- u4l1 `Voltage, Current, Resistance, and Power: Ohm's Law, Series and Parallel` (E&E-A, 10). Covers: charge, current in amps, voltage in volts, resistance in ohms, the water analogy; Ohm's law and the power formulas; series and parallel rules; prefixes (kV, mA, ms, kohm, microamps); measuring volts across, amps in series, ohms unpowered; worked examples at generator scale (filament current, tube current, kilovolts); the generator's Ohm's law questions come from this lesson.
- u4l2 `Components in a Circuit: Passive, Active, Rectifiers, and Reading the Schematic` (E&E-B, 10). Covers: resistors, capacitors (store charge, RC time constant, discharge before touching), inductors, transformers at component level; diodes and rectifiers (half-wave, full-wave, bridge), transistors as switches and amplifiers, SCRs and the exposure contactor, relays and interlocks, fuses and breakers; the symbols; reading an imaging schematic: power path, control path, interlock chain, test points; the RC time constant questions come from this lesson.
- u4l3 `Electromagnetism, Induction, Transformers, and the Electromagnetic Spectrum` (E&E-B, 10). Covers: magnetism and electromagnetism, induction (Faraday), mutual induction and the transformer law (turns ratio sets voltage, current inversely), autotransformer, step-up and step-down, transformer losses and oil; the electromagnetic spectrum (radio, microwave, infrared, visible, ultraviolet, x-ray, gamma), frequency, wavelength, photon energy, and why x-rays ionize; the induction motor that spins the anode.
- u4l4 `Facility Power: 3-Phase, 480 VAC, Panels, and the Imaging Room's Dedicated Feed` (E&E-C, 10). Covers: single-phase and three-phase supply, 120 / 208 / 240 / 480 VAC, wye and delta at recognition level, why imaging rooms get a dedicated three-phase feed with its own disconnect and breaker, line impedance and voltage drop during an exposure, line voltage compensation, the generator's input requirements (kVA rating, phase, voltage), grounding and bonding, the room's emergency power off; what a brownout or a shared feed does to kVp and mA.
- u4l5 `UPS, Line Conditioning, and Internal System Power Distribution` (E&E-E, 10). Covers: UPS types (online double-conversion, line-interactive, standby) and what each protects (console and computers, not usually the generator); line conditioners, isolation transformers, surge protection; inside the system: the main power distribution unit, low-voltage supplies for the console and detector, the high-voltage section (step-up transformer, rectifiers, high-voltage cables and their terminations), interlocks and the emergency off chain; how a failed supply shows up (console dead, detector offline, no rotor); safe practice around stored energy.
- u4l6 `Battery-Powered Systems: Ultrasound Carts and Portable X-ray` (E&E-D, 9). Covers: why portables carry batteries (exposure from a battery or capacitor bank when the ward outlet cannot deliver), lead-acid and lithium-ion packs, charging practice and charge indicators, capacity fade and replacement intervals, what a weak pack does (low output, aborted exposures, slow drive), the charger and its faults, ultrasound carts (battery for transport, cart power supplies, docking), battery safety (venting, swelling, disposal, transport), PM items for battery systems.

- [ ] **Step 3: Write `courses/cres/deep-1.js`**

One deep dive per lesson above, each at least 300 words, each with at least one fenced "what to memorize" table, written for a reader with no imaging background: for example u2l2 walks the quantities and units with the conversions and a worked badge report; u3l1 lists the 21 CFR 1020 items a repair must leave within standard; u4l4 walks an exposure from the panel to the tube.

- [ ] **Step 4: Write `courses/cres/questions-1.js`** (5 per lesson, 95 total)

Scenario stems an imaging technician meets. Unit 2 numeric questions use clean numbers with the arithmetic in the explanation. Unit 3 questions ask which regulator or standard applies and what the documentation must show. Then run `node tests/balance-keys.js courses/cres/questions-1.js`.

- [ ] **Step 5: Validate**

```bash
node tests/packcheck.js courses/cres && node tests/acronyms.js courses/cres 2>&1 | tail -2
```
Expected: `packcheck: OK` with 4 units, 19 lessons, 95 questions, every lesson with a deep dive; the acronym check passes (add keys for every `missing:` token first).

- [ ] **Step 6: Commit**

```bash
git add courses/cres/curriculum-1.js courses/cres/deep-1.js courses/cres/questions-1.js courses/cres/acronyms.js
git commit -m "feat(cres): units 1 to 4: anatomy and positioning, radiation and facility safety, regulation and the CMMS, electricity and imaging power"
```

---

### Task 3: Units 5 to 8 (19 lessons, 95 questions)

**Files:**
- Create: `courses/cres/curriculum-2.js`, `courses/cres/deep-2.js`, `courses/cres/questions-2.js`
- Modify: `courses/cres/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `tubes`, `receptors`, and `pm` sections (every number agrees).
- Produces: units `u5`, `u6`, `u7`, `u8` (all domain 4). Task 6's manifest lists these ids; do not rename them.

Reuse: the CBET pack's `u5l5` (imaging recognition) and `u4l6` (test equipment) are the seeds; everything else is new writing.

- [ ] **Step 1: Write `courses/cres/curriculum-2.js`**

**Unit u5 "X-ray Production, Tubes, and Generators"** (domain 4; blurb: how the tube makes x-rays, what the generator controls, and how technique shapes the beam; assumes unit 4)
- u5l1 `X-ray Production: Cathode, Anode, Focal Spot, Bremsstrahlung and Characteristic Radiation` (FUN-A, 10). Covers: thermionic emission from the tungsten filament, the focusing cup, the space charge, tube current; electrons strike the target: about 1% x-rays and 99% heat; bremsstrahlung (most of the beam) and characteristic radiation (K-shell, tungsten about 69.5 keV); the emission spectrum and what kVp, mA, filtration, and target material do to it; the focal spot, line-focus principle, effective versus actual focal spot, the anode heel effect and how it is used.
- u5l2 `The Tube: Housing, Rotating Anode, Line-Focus Principle, Dual Focus, Heat Units, Cooling, Failure` (FUN-A, 11). Covers: the envelope (glass or metal), the oil and housing, the rotor and stator (induction motor, about 3,400 rpm and about 10,000 rpm high-speed), the anode disc (tungsten-rhenium on molybdenum and graphite, anode angle), dual filaments and dual focal spots; heat units (HU = kVp x mA x s; one heat unit is about 1.4 J; the textbook on disk gives no separate factors for three-phase or high-frequency generators, so the pack states none), tube rating charts, anode and housing cooling curves, warm-up procedure; failure modes (filament evaporation and tungsten plating, anode pitting and cracking from cold loading, arcing, bearing wear and rotor noise, oil leaks, housing leakage above 100 mR/h at 1 m); the generator's heat unit questions come from this lesson.
- u5l3 `Generators: kVp, mA, Time, mAs, Rectification and Waveform, High-Voltage Transformers, Timers` (FUN-B, 11). Covers: the generator's job; the autotransformer and kVp selection, the step-up transformer and the high-voltage cables, the filament circuit and mA stations, exposure timers (electronic, mAs timers, AEC) and timer accuracy; rectification from half-wave to high-frequency and the ripple values; the prep and expose sequence (rotor, filament boost, interlocks, contactor), what each waveform does to output and heat; mAs, reciprocity, the 15 percent rule; the generator's mAs and 15 percent questions come from this lesson.
- u5l4 `Automatic Exposure Control, Technique Charts, and the Exposure Factors` (FUN-B, 10). Covers: AEC with ionization chambers (or phototimers in older systems), chamber selection, density settings, minimum response time, the backup timer (6 s or 600 mAs), what AEC cannot fix (positioning over the wrong chamber, collimation); technique charts (fixed kVp and variable kVp), measuring part thickness; the four factors of image quality (density or brightness, contrast, recorded detail, distortion) and what kVp, mAs, distance, focal spot, filtration, grid, and motion do to each; exposure index and deviation index on digital systems.
- u5l5 `Collimation, Filtration, Grids, and Air Gap: Controlling the Beam and Scatter` (FUN-A, 10). Covers: collimators and positive beam limitation, the light field to x-ray field 2% rule, cones and cylinders; inherent and added filtration, total filtration at least 2.5 mm Al above 70 kVp, half-value layer as the measure of beam quality and the generator's HVL questions; compensating filters; scatter: what raises it (kVp, field size, part thickness) and what removes it (collimation, grids by ratio and frequency, Bucky factor, grid cutoff and its causes, moving versus stationary grids, air gap technique).
- u5l6 `Tables, Bucky, Tube Stands, and the Mechanical System` (FUN-B, 9). Covers: the radiographic table (float, elevate, tilt, Bucky tray, grid, AEC chambers), the wall stand, ceiling-suspended and floor-mounted tube stands, detents and locks, tube angulation and SID indicators, collimator mounting, cable management, counterweights and the hazards of a broken cable, collision sensors, mechanical PM items (locks, brakes, cables, bearings, alignment, SID accuracy), how mechanical faults show up in images (alignment, grid cutoff, motion).

**Unit u6 "Image Receptors, Fluoroscopy, Mammography, and CT"** (domain 4; blurb: how the image is captured and processed, and the systems built around it; assumes unit 5)
- u6l1 `From Film-Screen to CR to DR: Receptor Types, Screens, and Processors` (FUN-A, 10). Covers: film-screen as history (intensifying screens, cassettes, automatic processors, sensitometry, why it still appears on exams); computed radiography (photostimulable phosphor plate, laser reader, erase, cassette-based workflow, plate artifacts from dust and cracks); direct radiography (indirect with cesium iodide on amorphous silicon thin-film transistors, direct with amorphous selenium), wired and wireless detectors; detective quantum efficiency and why DR lowers dose; receptor care (drops, temperature, batteries on wireless panels).
- u6l2 `Digital Detector Electronics, Calibration, Defective Pixel Maps, and Image Processing` (FUN-A, 10). Covers: the detector readout (TFT array, scan lines, data lines, analog-to-digital conversion), offset and gain calibration, flat-field correction, the defective pixel map and when to recalibrate, detector temperature and warm-up, image processing (windowing, look-up tables, edge enhancement, exposure index), how calibration faults show up (lines, rings, blotches, ghosting), the service tools (calibration software, test exposures, uniformity phantoms).
- u6l3 `Fluoroscopy: Image Intensifiers, Flat Panels, Dose Rate Control, and Digital Subtraction` (FUN-B, 11). Covers: the image intensifier (input phosphor and photocathode, electrostatic focusing lenses, accelerating anode, output phosphor, brightness gain as minification gain x flux gain, magnification modes and dose), the camera chain (TV or CCD, optics, automatic brightness control), flat-panel fluoroscopy, digital fluoroscopy and digital subtraction angiography, last-image hold, pulsed fluoroscopy and frame rate, the tabletop exposure rate limits and the 5-minute timer, under-table versus over-table tubes and operator dose, the control booth and the monitor cart.
- u6l4 `Mobile C-arms, the Interventional Suite, and Angiography` (FUN-B, 10). Covers: C-arm construction (the C, the tube and intensifier or panel, the monitor cart, cables, brakes, orbital and lateral motion), mini C-arms, sterile field practice, the interventional and cardiac catheterization suite (floor or ceiling gantry, biplane, injectors, hemodynamic monitoring), the angiography procedure at recognition level (access, catheter, contrast, imaging, closure), contrast media and reactions at recognition level, dose management in interventional work (reference air kerma, dose area product, skin dose tracking).
- u6l5 `Mammography Systems: Tube, Compression, AEC, and Tomosynthesis` (FUN-A, 10). Covers: the mammography tube (molybdenum, rhodium, or tungsten target, filters, small focal spots, low kVp about 25 to 35), compression (why, force about 25 to 45 lb, paddle checks, release), AEC under the breast, the grid and the receptor, full-field digital mammography and digital breast tomosynthesis, stereotactic biopsy at recognition level, the QC program under MQSA from the technician's side (what to re-verify after a repair), common service items (compression force calibration, paddle damage, filter wheel, detector calibration).
- u6l6 `CT at Recognition Depth: Gantry, Slip Ring, Detector Array, Tube Cooling, Reconstruction` (FUN-A, 10). Covers: what CT is and how it differs from radiography; the gantry, slip ring, high-output tube and its cooling, the detector array and data acquisition system, generations at recognition level, helical scanning and pitch, the table, the operator console and reconstruction (Hounsfield units: water 0, air about minus 1,000, dense bone about plus 1,000; window width and level), contrast injectors, what a technician services (table, gantry covers, cooling, filters, power, calibration phantoms, tube replacement with the vendor), CT dose terms at recognition level (CTDI, DLP).

**Unit u7 "Ultrasound, Nuclear Medicine, and MRI"** (domain 4; blurb: the non-x-ray modalities at the depth the exam names them; assumes unit 6)
- u7l1 `Ultrasound Physics and Probes: Frequency, Attenuation, Resolution, Probe Types and Failure Modes` (FUN-A, 10). Covers: sound above hearing, about 2 to 15 MHz in diagnostic use; piezoelectric elements, the pulse-echo principle, acoustic impedance and reflection, attenuation with depth and frequency, the trade between penetration and resolution; probe types (linear, curved, phased array, endocavity, transesophageal) and what each images; probe construction (elements, matching layer, backing, lens, cable, connector) and failure modes (element dropout, lens delamination, cable breaks, fluid ingress, damage from improper disinfection); probe testing and inspection.
- u7l2 `Ultrasound Systems: Beamformer, Modes, Doppler, Probe Testing and High-Level Disinfection` (FUN-B, 10). Covers: the system (beamformer, transmit and receive, signal processing, display, probe ports, cart power and battery), imaging modes (B-mode, M-mode, color and spectral Doppler, 3D at recognition level), controls (gain, time-gain compensation, depth, focus, frequency), image artifacts at recognition level, probe cleaning and high-level disinfection (why, how, what damages a probe, the sheath rule for endocavity probes), QC with a phantom, common faults (dropout, noise, display, port, trackball and keyboard, battery).
- u7l3 `Gamma Cameras, Nuclear Medicine, PET, and Hybrid Systems at Recognition Depth` (FUN-A, 9). Covers: radiopharmaceuticals and the gamma camera (collimator, sodium iodide crystal, photomultiplier tubes, position logic, computer), technetium-99m at 140 keV with about a 6-hour half-life, SPECT, PET (positron annihilation, 511 keV photons, coincidence detection, fluorine-18), hybrid SPECT/CT and PET/CT, the dose calibrator and survey meter, radiation safety in the hot lab, what a technician services (collimator changers, table, detector heads, cooling, QC with flood and bar phantoms) versus what the physicist and vendor own.
- u7l4 `MRI at Recognition Depth: Magnet, Gradients, RF Coils, Cryogens, and What the Technician Services` (FUN-A, 9). Covers: the superconducting magnet (1.5 or 3 T), cryogens (liquid helium, the cold head and compressor, the chiller), gradient coils and their amplifiers, RF transmit and receive coils, the shielded room, the table and patient monitoring, image formation in one paragraph (protons, RF pulses, relaxation), the zones and safety rules from unit 2 restated, what a technician services (chillers, cold-head maintenance with the vendor, coil inspection and cable checks, table, peripherals, helium level monitoring, power conditioning) and what needs the manufacturer.

**Unit u8 "PM, QC, and Test Equipment"** (domain 4; blurb: what an imaging PM must do, the QC tests by modality, and the instruments that measure the beam; assumes units 5 and 6)
- u8l1 `What an Imaging PM Requires, and QC by Modality` (FUN-C, 11). Covers: the PM procedure from the manufacturer's manual and the regulations (mechanical, electrical safety with the CBET limits, interlocks, radiation output, image quality, software and error logs, cleaning, documentation); frequency by modality and by regulator; QC by modality: radiography (kVp accuracy, timer accuracy, mA linearity, reproducibility, collimation and alignment, HVL, focal spot, SID indicator, with the tolerances as the workbook states them), fluoroscopy (exposure rate, timer, SSD, resolution and contrast), mammography (the MQSA schedule), ultrasound (phantom, probe inspection, display), CT (the physicist's survey at recognition level); the difference between the technician's QC and the physicist's annual survey.
- u8l2 `Measuring the Beam: kVp Meters, Dosimeters, Ion Chambers, Dose Area Product, HVL, Timer Checks` (FUN-E, 10). Covers: the non-invasive kVp meter and how it is placed, dosimeters (ionization chamber, solid-state detector, electrometer), what each reads (exposure, air kerma, dose rate), the dose area product meter on the collimator, the timer and mAs meter, measuring half-value layer with aluminum filters, measuring reproducibility and linearity, phantoms and test tools (resolution, contrast, alignment, uniformity), calibration of the instruments themselves, units of measure and conversions on the readouts, recording the results.
- u8l3 `The Safety Analyzer and Voltmeter in the Imaging Suite, and Documenting PM and QC for the Surveyor` (FUN-E, 10). Covers: the electrical safety analyzer (ground resistance, chassis leakage, with the CBET limits and their standards, the test sequence, what differs on three-phase and hard-wired imaging equipment, when leakage tests do not apply and what replaces them), the digital voltmeter in the generator (line voltage, supply rails, test points, high-voltage divider only with the right equipment), the documentation a survey wants (inventory, PM completion, QC logs, physicist reports, recalls, training records, calibration certificates for test equipment), how records live in the CMMS, the generator's leakage questions come from this lesson.

- [ ] **Step 2: Write `courses/cres/deep-2.js`**

One deep dive per lesson above, each at least 300 words with a fenced table: u5l2 carries the heat unit worked examples and the rating chart walk; u5l3 the waveform and ripple table; u6l3 the intensifier chain with brightness gain arithmetic; u8l1 the QC tolerance table by modality in the workbook's words.

- [ ] **Step 3: Write `courses/cres/questions-2.js`** (5 per lesson, 95 total)

Numeric items (heat units, mAs, HVL, brightness gain) use clean numbers with the arithmetic in the explanation. Then run `node tests/balance-keys.js courses/cres/questions-2.js`.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/cres && node tests/acronyms.js courses/cres 2>&1 | tail -2
git add courses/cres/curriculum-2.js courses/cres/deep-2.js courses/cres/questions-2.js courses/cres/acronyms.js
git commit -m "feat(cres): units 5 to 8: x-ray production and generators, receptors and fluoroscopy, mammography and CT, ultrasound and nuclear medicine and MRI, PM and QC and test equipment"
```
Expected before the commit: `packcheck: OK` with 8 units, 38 lessons, 190 questions.

---

### Task 4: Units 9 and 10 (22 lessons, 110 questions)

**Files:**
- Create: `courses/cres/curriculum-3.js`, `courses/cres/deep-3.js`, `courses/cres/questions-3.js`
- Modify: `courses/cres/acronyms.js`

**Interfaces:**
- Consumes: the Conventions section; the cheat sheet's `troubleshooting` and `it` sections.
- Produces: units `u9` (domain 5) and `u10` (domain 6). Task 6's manifest lists these ids; do not rename them.

Reuse: the CBET pack's `u7l1` to `u7l6`, `u8l5` (troubleshooting method, prioritizing, communication, PM) and `u9l1` to `u9l8` (networking, device integration, cybersecurity, tools) carry the method and the network fundamentals; rewrite them for imaging rooms and the imaging network.

- [ ] **Step 1: Write `courses/cres/curriculum-3.js`**

**Unit u9 "Troubleshooting Imaging Systems"** (domain 5; blurb: the method, the priorities, the resources, and the faults of every imaging system the exam names; assumes units 5 to 8)
- u9l1 `The Method: Symptom, History, Isolate, Verify; Device Error Versus Use Error` (PS-D, 10). Covers: the four-step method; gather the symptom in the operator's words and reproduce it; history from the CMMS and error logs; isolate by halves (power, control, high-voltage, mechanical, detector, network); verify with a test exposure and a phantom; device error versus use error (wrong technique, wrong chamber, wrong receptor, protocol choice) and what each calls for (repair versus applications training); the rule of the simplest cause first; when to stop and call the manufacturer.
- u9l2 `Prioritizing Imaging Repairs by Risk, Downtime, and Regulatory Exposure` (PS-A, 9). Covers: risk to the patient (dose, missed diagnosis, mechanical injury), clinical downtime (the only CT in the house versus a third radiographic room), regulatory exposure (a system out of standard must come out of service), the triage order, communicating the queue to radiology, loaner and backup plans, documenting a system taken out of service and its return.
- u9l3 `Using the Resources: Schematics, Service Manuals, Diagnostic Software, and Error Logs` (PS-B, 10). Covers: reading the service manual (theory of operation, adjustment procedures, error code tables, parts lists), schematics and block diagrams (power path, control path, interlock chain, test points and expected values), diagnostic and service software (service mode, error logs, calibration tools, detector tests), test equipment choice by symptom, manufacturer technical support and field notices, keeping the documentation current.
- u9l4 `Power and Generator Faults: No Exposure, Interlocks, High-Voltage Failures, Tube Arcing` (PS-C, 11). Covers: no exposure (door interlock, rotor not ready, exposure switch, filament open, contactor, generator fault codes), low or inconsistent output (line voltage, kVp calibration, mA calibration, timer, AEC), high-voltage faults (cable terminations, transformer oil, arcing in the tank, tube arcing and its signatures, gas in the tube), rotor faults (noise, slow spin-up, stator), the safe sequence for working in the high-voltage section, verification after repair (kVp, mAs, reproducibility).
- u9l5 `Tube and Image Quality Faults: Heat, Focal-Spot Blur, Artifacts, Grid Errors, Motion` (PS-C, 10). Covers: overheated anode symptoms and the rating chart, focal spot growth and blur, tube aging (lower output, filament evaporation, plating), image artifacts and their causes (grid lines and cutoff from alignment or wrong focal distance, moire, defective pixels, dust on plates, ghosting, detector calibration), geometric factors (SID, OID, alignment, distortion), motion and timer problems, telling a tube problem from a generator or receptor problem with one test.
- u9l6 `Mechanical Faults: Tables, Stands, Locks, Collimator, and Detector Positioning` (PS-C, 9). Covers: table drive and float faults, tilt and elevation failures, lock and brake failures and the hazards they create, detents and alignment, cable and counterweight inspection, collision sensors, collimator blades and light field alignment, SID indicator accuracy, detector tray and wall stand positioning, lubrication and wear, what to take out of service immediately.
- u9l7 `Digital Receptor and Fluoroscopy Faults: Dead Pixels, Calibration, Intensifier and Panel Failures` (PS-C, 10). Covers: receptor faults (dead rows and columns, uniformity, ghosting, temperature, wireless panel battery and link, cassette and plate faults), when a recalibration fixes it and when it does not, intensifier faults (dim image, burn, vacuum loss, lens, camera, ABC hunting), flat-panel fluoroscopy faults, dose rate too high, the monitor chain, verification with phantoms after any receptor work.
- u9l8 `Mammography and Ultrasound Faults: Compression, AEC, Probe Failures, Doppler, Disinfection Damage` (PS-C, 10). Covers: mammography (compression force out of tolerance, paddle cracks, release failure, AEC detector faults, filter wheel, phantom failures and what MQSA requires before the system returns to use), ultrasound (element dropout patterns, noise, probe connector and cable, damage from immersion or wrong disinfectant, Doppler faults, display and port problems, cart power and battery), verifying each with the right phantom.
- u9l9 `Portable and C-arm Faults: Batteries, Chargers, Brakes, and Cables` (PS-C, 9). Covers: battery pack faults and tests, charger faults, drive and brake faults and their hazards, cable and connector wear from transport, collimator and tube arm locks, C-arm orbital and lateral motion faults, monitor cart faults, image faults specific to portables (motion, grid, SID), cleaning and inspection after use in isolation rooms.
- u9l10 `Communicating with Radiology Staff and the Manufacturer: Training, Escalation, the Service Report` (PS-E, 9). Covers: speaking to clinicians in their words (what the image showed, when the room is back), explaining a use error without blame and arranging applications training, escalation to the manufacturer (what to have ready: model, serial, software version, error codes, what was tried), writing the service report (symptom, cause, action, parts, verification, dose or QC results), communicating with other departments (IT, facilities, infection prevention), project communication (installs, upgrades, acceptance testing).

**Unit u10 "Imaging Informatics and Networks"** (domain 6; blurb: the imaging network from the wall jack to the archive, and how to secure and troubleshoot it; assumes nothing beyond unit 1)
- u10l1 `Networking Fundamentals for the Imaging Network: IP, Subnets, Switches, VLANs` (HIT-B, 10). Covers: IP addresses, subnet masks, default gateways, DHCP versus static (why modalities are static), DNS, switches versus routers, VLANs and why imaging gets its own, bandwidth and what a CT study needs, the imaging network diagram, the generator's subnet questions come from this lesson.
- u10l2 `Wired and Wireless Hardware: Cabling, NICs, Access Points, Cable Tracers` (HIT-C, 9). Covers: twisted pair categories and connectors, fiber, patch panels and the data closet, network interface cards and link lights, wireless access points, controllers, and the detector's wireless link, cable tracers and testers, labeling, what a bad cable looks like on a modality (dropped images, slow sends).
- u10l3 `Computer Hardware and Software for Imaging Systems: Workstations, Storage, Backups, Virtualization` (HIT-B, 10). Covers: the modality console and acquisition workstation (CPU, memory, storage, graphics), reading workstations and their displays, operating systems and service accounts, software versions and patches, storage (RAID, local cache, archive tiers), backups and restore tests, virtual servers and the cloud at recognition level, hardware troubleshooting basics (boot, disk, memory, display, peripherals).
- u10l4 `PACS: The Archive, Workstations, and the Image Lifecycle` (HIT-B, 10). Covers: what PACS is (archive, database, workstations, web viewers), the vendor neutral archive, the image lifecycle (acquire, send, store, route, read, report, retain, purge), prefetching and routing rules, hanging protocols at recognition level, storage commitment, disaster recovery, who owns what between the biomed shop, radiology IT, and the vendor.
- u10l5 `DICOM: Objects, Services, Modality Worklist, and DICOM Echo` (HIT-B, 11). Covers: DICOM as the imaging standard (information objects, service classes), the association (AE title, host, port, SOP classes), C-ECHO as the DICOM echo test, C-STORE, C-FIND and C-MOVE, the modality worklist (how patient and order data reach the modality), modality performed procedure step, storage commitment, the conformance statement and how to read it, the DICOM header and what a mismatch does downstream.
- u10l6 `RIS, HL7, the EMR, and the Order-to-Report Path` (HIT-B, 10). Covers: the radiology information system (scheduling, orders, worklist, results), HL7 messages (ADT, ORM, ORU) and the interface engine or broker, the electronic medical record, the path from order to worklist to acquisition to PACS to report to the EMR, where identifiers can break (merges, name changes, accession numbers), dose reporting and the dose registry at recognition level.
- u10l7 `Application Interdependence: Worklist, MPPS, Dose Reporting, and What Breaks Downstream` (HIT-D, 9). Covers: why one failed interface stops many systems (worklist down, archive down, DNS down, certificate expired), the interrelatedness of applications and how to map it, change control and testing before an upgrade, downtime procedures (manual entry, paper, reconciliation), monitoring and alerting.
- u10l8 `Imaging Network Security: HIPAA, Access Control, Patching, Encryption, Device Cybersecurity` (HIT-A, 10). Covers: protected health information and HIPAA, HITECH, the security rule in plain words (administrative, physical, technical safeguards), least privilege and service accounts, patching modalities and the vendor's role, encryption in transit and at rest, antivirus and whitelisting on imaging systems, network segmentation, medical device cybersecurity (vulnerabilities, legacy operating systems, the manufacturer's disclosures), incident response basics.
- u10l9 `Compliance Evidence: Risk Assessment, MDS2, Vendor Remote Access, What a Survey Wants` (HIT-A, 9). Covers: the security risk assessment and the device inventory, the MDS2 form and what it tells you, IEC 80001 at recognition level, vendor remote access (VPN, session approval, logging), business associate agreements, audit logs, what a surveyor or auditor asks the biomed shop for, documenting actions in the CMMS.
- u10l10 `Troubleshooting the Imaging Network: PING, Traceroute, Cable Tracers, Switch Ports, DNS` (HIT-C, 10). Covers: the layered method (cable, link, IP, name, application), PING and what each reply means, traceroute, ipconfig or ifconfig and the ARP table at recognition level, link lights and switch port checks, cable tracers and testers, DNS and name resolution failures, firewall and VLAN mistakes, wireless detector link problems, when the problem is IT's and how to hand it over with evidence.
- u10l11 `Troubleshooting PACS and DICOM: Association Failures, Missing Worklist, Images Not Arriving` (HIT-C, 10). Covers: association rejected (AE title, port, host, SOP class, conformance), DICOM echo as the first test, images sent but not arriving (routing, storage commitment, queue), worklist empty (RIS, broker, query keys, dates), wrong patient on the study (identifiers, accession, merges), slow sends (bandwidth, compression), reading the modality's and the archive's logs together.
- u10l12 `Monitors, Display Calibration, and Workstation Troubleshooting` (HIT-C, 9). Covers: diagnostic versus clinical displays, luminance and the grayscale standard display function, calibration tools and schedules, ambient light, display faults (dim, uneven, dead pixels, flicker), graphics cards and cables, workstation performance problems, user profile and permission problems, when a display is out of tolerance and the reading must move.

- [ ] **Step 2: Write `courses/cres/deep-3.js`**

One deep dive per lesson above, each at least 300 words with a fenced table: u9l4 carries a no-exposure fault tree; u9l5 an artifact table (appearance, cause, check, fix); u10l5 a DICOM service table; u10l11 a PACS fault table.

- [ ] **Step 3: Write `courses/cres/questions-3.js`** (5 per lesson, 110 total)

Problem-solving stems are symptoms ("the room makes no exposure and the console shows..."), asking for the FIRST check or the MOST likely cause. Then run `node tests/balance-keys.js courses/cres/questions-3.js`.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/cres && node tests/acronyms.js courses/cres 2>&1 | tail -2
git add courses/cres/curriculum-3.js courses/cres/deep-3.js courses/cres/questions-3.js courses/cres/acronyms.js
git commit -m "feat(cres): units 9 and 10: troubleshooting imaging systems and imaging informatics"
```
Expected before the commit: `packcheck: OK` with 10 units, 60 lessons, 300 questions.

---

### Task 5: Generators

**Files:**
- Create: `courses/cres/generators.js`

**Interfaces:**
- Produces: `FRA.generators = { u2l2, u2l3, u4l1, u4l2, u5l2, u5l3, u5l5, u8l3, u10l1 }` and `FRA.generate(lessonId)`. Each generator returns `{ id, t, q, a[4], c, e, gen: true }`.

- [ ] **Step 1: Write `courses/cres/generators.js`**

Header, helpers, and the five new generators are exact content. The four transferred generators are copied from `courses/cbet/generators.js`: the functions `ohms` (lines 24 to 60), `rc` (61 to 75), `safety` (76 to 122), and `subnet` (237 to 258), byte for byte except that every `build("u2l1", ...)` becomes `build("u4l1", ...)`, `build("u2l3", ...)` becomes `build("u4l2", ...)`, `build("u3l2", ...)` becomes `build("u8l3", ...)`, and `build("u9l1", ...)` becomes `build("u10l1", ...)`.

```js
// CRES Academy dynamic question generators. Each returns a fresh, computed question so radiation units,
// the inverse square law, Ohm's law, RC time constants, heat units, mAs and the 15 percent rule, half-value
// layers, leakage limits, and subnet questions never repeat exactly. Numbers agree with the lessons and the cheat sheet.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u2l2 radiation units and time to a limit ----------
  function dose() {
    const kind = R(3);
    if (kind === 0) {
      const pairs = [["rad", "mGy", 10], ["rem", "mSv", 10], ["Gy", "rad", 100], ["Sv", "rem", 100], ["mSv", "microsieverts", 1000], ["mGy", "micrograys", 1000]];
      const [from, to, f] = pick(pairs); const v = pick([0.5, 1, 2, 5, 10, 25, 50, 100]); const ans = v * f;
      return build("u2l2", `A report gives ${num(v)} ${from}. What is that in ${to}?`, `${num(ans)} ${to}`,
        wrong(`${num(ans)} ${to}`, [`${num(v / f, 4)} ${to}`, `${num(ans * 10)} ${to}`, `${num(ans / 10)} ${to}`, `${num(v)} ${to}`]),
        `1 ${from} = ${f} ${to}, so ${num(v)} x ${f} = ${num(ans)} ${to}. Gray and sievert are the SI units; rad and rem are the older units, 100 to one.`, "dose");
    }
    if (kind === 1) {
      const rate = pick([0.5, 1, 2, 4, 5, 10]); const limit = pick([10, 20, 50, 100]); const h = limit / rate;
      return build("u2l2", `A survey meter reads ${num(rate)} mR/h where a worker must stand. How long can the worker stay before reaching ${limit} mR?`, `${num(h, 1)} hours`,
        wrong(`${num(h, 1)} hours`, [`${num(rate * limit, 0)} hours`, `${num(rate / limit, 3)} hours`, `${num(h * 2, 1)} hours`, `${num(h / 2, 1)} hours`]),
        `Time = allowed exposure / rate = ${limit} / ${num(rate)} = ${num(h, 1)} hours. Exposure accumulates at the rate the meter shows, so halving the time halves the dose.`, "dose");
    }
    const sofar = pick([2, 5, 8, 10, 12, 15, 20, 25, 30]); const left = 50 - sofar;
    return build("u2l2", `A technologist's badge reports show ${sofar} mSv so far this year. Against the occupational effective dose limit, how much remains?`, `${left} mSv`,
      wrong(`${left} mSv`, [`${50 + sofar} mSv`, `${num(sofar / 2)} mSv`, `${150 - sofar} mSv`, `${num(50 - sofar / 2)} mSv`]),
      `The annual occupational effective dose limit is 50 mSv. 50 minus ${sofar} leaves ${left} mSv. The lens limit is 150 mSv and the skin limit 500 mSv, which are different questions.`, "dose");
  }

  // ---------- u2l3 inverse square law ----------
  function inverse() {
    const kind = R(2);
    const d1 = pick([1, 2, 3, 4]); const d2 = pick([1, 2, 3, 4, 6, 8].filter(d => d !== d1)); const I1 = pick([4, 8, 16, 32, 64, 100, 200, 400]);
    const I2 = I1 * (d1 * d1) / (d2 * d2);
    if (kind === 0) return build("u2l3", `At ${d1} m from the source the exposure rate is ${I1} mR/h. What is the rate at ${d2} m?`, `${num(I2, 2)} mR/h`,
      wrong(`${num(I2, 2)} mR/h`, [`${num(I1 * d1 / d2, 2)} mR/h`, `${num(I1 * d2 * d2 / (d1 * d1), 2)} mR/h`, `${num(I1 * d1 * d1 / d2, 2)} mR/h`, `${num(I1 / 2, 2)} mR/h`]),
      `Inverse square law: I2 = I1 x (d1 / d2) squared = ${I1} x (${d1} / ${d2}) squared = ${num(I2, 2)} mR/h. Doubling the distance cuts the rate to one quarter.`, "isl");
    const k = pick([2, 3, 4]); const dk = d1 * k; const frac = k * k;
    return build("u2l3", `The exposure rate at ${d1} m is ${I1} mR/h. At what distance does it fall to 1/${frac} of that?`, `${dk} m`,
      wrong(`${dk} m`, [`${d1 * frac} m`, `${num(d1 * Math.sqrt(k), 2)} m`, `${d1 + k} m`, `${num(d1 * k / 2, 1)} m`]),
      `Rate falls with the square of distance: ${k} times the distance gives 1/${frac} of the rate, so ${d1} x ${k} = ${dk} m.`, "isl");
  }

  // ---------- u5l2 heat units (HU = kVp x mA x s; one heat unit is about 1.4 J) ----------
  function heat() {
    const kind = R(3);
    const kVp = pick([60, 70, 80, 90, 100, 120]); const mA = pick([100, 200, 300, 400, 500]); const s = pick([0.05, 0.1, 0.2, 0.5, 1]);
    const HU = kVp * mA * s;
    if (kind === 0) return build("u5l2", `One exposure is made at ${kVp} kVp, ${mA} mA, ${num(s)} s. How many heat units does the anode receive?`, `${num(HU, 0)} HU`,
      wrong(`${num(HU, 0)} HU`, [`${num(HU * 2, 0)} HU`, `${num(kVp * mA, 0)} HU`, `${num(HU / 2, 0)} HU`, `${num(kVp + mA + s, 0)} HU`, `${num(HU * 1.4, 0)} HU`]),
      `HU = kVp x mA x s = ${kVp} x ${mA} x ${num(s)} = ${num(HU, 0)} HU. Kilovolts, milliamperes, and seconds multiply; nothing is added.`, "hu");
    if (kind === 1) {
      const n = pick([5, 10, 20, 40]); const cap = pick([100000, 200000, 300000, 400000]); const total = HU * n; const ok = total <= cap;
      const correct = `${num(total, 0)} HU, ${ok ? "within" : "over"} the ${num(cap, 0)} HU rating`;
      return build("u5l2", `A series of ${n} exposures is made in quick succession at ${kVp} kVp, ${mA} mA, ${num(s)} s. The anode is rated ${num(cap, 0)} HU. What is the total, and is it within the rating?`, correct,
        [`${num(total, 0)} HU, ${ok ? "over" : "within"} the ${num(cap, 0)} HU rating`, `${num(HU, 0)} HU, within the ${num(cap, 0)} HU rating`, `${num(total * 1.4, 0)} HU, ${total * 1.4 <= cap ? "within" : "over"} the ${num(cap, 0)} HU rating`],
        `One exposure is ${kVp} x ${mA} x ${num(s)} = ${num(HU, 0)} HU; ${n} of them is ${num(total, 0)} HU, which is ${ok ? "under" : "above"} the ${num(cap, 0)} HU anode rating. Always check the series against the rating chart, not just one exposure.`, "hu");
    }
    const J = HU * 1.4;
    return build("u5l2", `An exposure deposits ${num(HU, 0)} heat units in the anode. About how much energy is that in joules?`, `about ${num(J, 0)} J`,
      wrong(`about ${num(J, 0)} J`, [`about ${num(HU, 0)} J`, `about ${num(HU / 1.4, 0)} J`, `about ${num(J * 10, 0)} J`, `about ${num(J / 10, 0)} J`]),
      `One heat unit is about 1.4 joules, so ${num(HU, 0)} HU x 1.4 = about ${num(J, 0)} J. The anode must shed that energy before the next series.`, "hu");
  }

  // ---------- u5l3 mAs and the 15 percent rule ----------
  function technique() {
    const kind = R(3);
    if (kind === 0) {
      const mA = pick([100, 200, 300, 400, 500, 600]); const s = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5]); const mAs = mA * s;
      return build("u5l3", `The generator is set to ${mA} mA and ${num(s)} s. What is the mAs?`, `${num(mAs, 2)} mAs`,
        wrong(`${num(mAs, 2)} mAs`, [`${num(mA / s, 0)} mAs`, `${num(mA + s, 2)} mAs`, `${num(mAs * 2, 2)} mAs`, `${num(mAs / 2, 2)} mAs`]),
        `mAs = mA x s = ${mA} x ${num(s)} = ${num(mAs, 2)} mAs. Tube current times exposure time is the quantity of x-rays.`, "mas");
    }
    if (kind === 1) {
      const mAs = pick([5, 10, 20, 25, 40, 50, 100]); const mA2 = pick([100, 200, 400, 500]); const s2 = mAs / mA2;
      return build("u5l3", `A technique chart calls for ${mAs} mAs. The large focal spot only allows ${mA2} mA. What exposure time keeps the same mAs?`, `${num(s2, 3)} s`,
        wrong(`${num(s2, 3)} s`, [`${num(mA2 / mAs, 3)} s`, `${num(mAs * mA2 / 1000, 3)} s`, `${num(s2 * 2, 3)} s`, `${num(s2 / 2, 3)} s`]),
        `Time = mAs / mA = ${mAs} / ${mA2} = ${num(s2, 3)} s. Reciprocity: the same mAs from any mA and time pair gives the same receptor exposure.`, "mas");
    }
    const kVp = pick([60, 70, 80, 90, 100]); const mAs = pick([4, 8, 10, 16, 20, 40]); const up = R(2) === 0;
    const kVp2 = Math.round(up ? kVp * 1.15 : kVp * 0.85); const mAs2 = up ? mAs / 2 : mAs * 2;
    return build("u5l3", `An image was made at ${kVp} kVp and ${mAs} mAs. The radiologist wants the same receptor exposure with ${up ? "15 percent more" : "15 percent less"} kVp. What technique?`, `${kVp2} kVp and ${num(mAs2)} mAs`,
      [`${kVp2} kVp and ${mAs} mAs`, `${kVp2} kVp and ${num(up ? mAs * 2 : mAs / 2)} mAs`, `${Math.round(up ? kVp * 0.85 : kVp * 1.15)} kVp and ${num(mAs2)} mAs`],
      `The 15 percent rule: ${up ? "raising" : "lowering"} kVp by 15 percent ${up ? "doubles" : "halves"} receptor exposure, so ${up ? "halve" : "double"} the mAs. ${kVp} x ${up ? "1.15" : "0.85"} is about ${kVp2} kVp, and ${mAs} ${up ? "/ 2" : "x 2"} = ${num(mAs2)} mAs.`, "mas");
  }

  // ---------- u5l5 half-value layer ----------
  function hvl() {
    const kind = R(2);
    if (kind === 0) {
      const n = pick([1, 2, 3, 4, 5]); const I0 = pick([100, 200, 400, 800, 1000]); const rem = I0 / Math.pow(2, n);
      return build("u5l5", `An unfiltered beam measures ${I0} mR. After ${n} half-value layer${n > 1 ? "s" : ""} of added filtration, what remains?`, `${num(rem, 2)} mR`,
        wrong(`${num(rem, 2)} mR`, [`${num(I0 / (2 * n), 2)} mR`, `${num(I0 / Math.pow(2, n + 1), 2)} mR`, `${num(I0 - I0 * n / 10, 2)} mR`, `${num(I0 / n, 2)} mR`]),
        `Each half-value layer halves the intensity: ${I0} / 2^${n} = ${num(rem, 2)} mR. HVL measures beam quality; a harder beam needs a thicker layer to halve it.`, "hvl");
    }
    const h = pick([2, 2.5, 3, 4]); const n = pick([1, 2, 3, 4]); const t = h * n; const pct = 100 / Math.pow(2, n);
    return build("u5l5", `A beam's half-value layer is ${num(h)} mm Al. What fraction of the beam passes through ${num(t)} mm Al?`, `${num(pct, 2)}%`,
      wrong(`${num(pct, 2)}%`, [`${num(100 / n, 2)}%`, `${num(100 - pct, 2)}%`, `${num(100 / Math.pow(2, n + 1), 2)}%`, `${num(100 / (2 * n), 2)}%`]),
      `${num(t)} mm is ${n} half-value layer${n > 1 ? "s" : ""} (${num(t)} / ${num(h)}), so the beam is halved ${n} time${n > 1 ? "s" : ""}: 100 / 2^${n} = ${num(pct, 2)}%.`, "hvl");
  }

  // ---------- u4l1 Ohm's law, power, series and parallel: copy of the CBET `ohms` with build("u4l1", ...) ----------
  // ---------- u4l2 RC time constants: copy of the CBET `rc` with build("u4l2", ...) ----------
  // ---------- u8l3 leakage limits, ground resistance, shock thresholds: copy of the CBET `safety` with build("u8l3", ...) ----------
  // ---------- u10l1 same subnet or through the gateway: copy of the CBET `subnet` with build("u10l1", ...) ----------

  FRA.generators = { u2l2: dose, u2l3: inverse, u4l1: ohms, u4l2: rc, u5l2: heat, u5l3: technique, u5l5: hvl, u8l3: safety, u10l1: subnet };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
```

Paste the four CBET functions where the four comment lines sit (the comment lines stay as section headers above each function).

- [ ] **Step 2: Smoke-test**

Run: `node tests/gen-smoke.js courses/cres 500`
Expected: nine generators, 0 problems (four unique options, a real correct index, no `(1)` filler). If a problem names the heat or technique generator, the distractor list produced a duplicate for some combination; add one more candidate to that `wrong` or distractor list rather than relaxing the test.

- [ ] **Step 3: Commit**

```bash
git add courses/cres/generators.js
git commit -m "feat(cres): generators for radiation units, the inverse square law, heat units, mAs and the 15 percent rule, half-value layers, plus Ohm's law, RC, leakage, and subnet transfers"
```

---

### Task 6: Manifest, course page, catalog, build list, loaders, analytics, and the first full build

**Files:**
- Create: `courses/cres/course.js`, `cres/index.html`
- Modify: `index.html` (catalog card, JSON-LD, descriptions), `tests/catalog.js` (lines 83 and 87), `tests/loaders.js` (line 14), `tests/acronyms.js` (line 9), `tests/analytics.js` (line 18), `build.py` (line 45), `scripts/stage.sh` (line 29), `README.md` (line 5)

**Interfaces:**
- Consumes: every pack file from Tasks 1 to 5.
- Produces: `dist/cres.html`, `dist/cres-cheatsheet.pdf`, `dist/site/cres/` (landing page, practice test, lessons, cheat sheet), the catalog card at `cres/`, the account page row, the sitemap entries.

- [ ] **Step 1: Write `courses/cres/course.js`** (exact content)

```js
// CRES Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "cres",
  name: "CRES Academy",
  short: "CR",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "AAMI / ACI", title: "Certified Radiology Equipment Specialist", code: "CRES", questions: 165, minutes: 180, passPct: 70 },
  description: "Self-paced Certified Radiology Equipment Specialist (CRES) exam prep with adaptive training and practice exams.",
  seo: {
    title: "CRES Study Guide and Practice Tests | CRES Academy",
    h1: "CRES Study Guide and Practice Tests",
    intro: "CRES Academy is a free study guide and practice-test course for the AAMI/ACI Certified Radiology Equipment Specialist exam. Sixty lessons follow the exam's six domains, a printable CRES cheat sheet collects the dose limits, formulas, QC tolerances, and network tools worth memorizing, and every practice test is built from the exam's domain weights.",
    phrases: ["CRES study guide", "CRES practice tests", "CRES exam questions", "CRES cheat sheet"],
    faq: [
      { q: "How many questions are on the CRES exam?", a: "165 multiple-choice questions in 3 hours, closed book, with an on-screen calculator and notepad. ACI sets the cut score with a criterion-referenced method and does not publish it; this course's official-format test uses 70%." },
      { q: "When is the CRES offered?", a: "Twice a year, May 1 to 15 and November 1 to 15, at computer-based test centers. Applications open about three months before each window." },
      { q: "Who is eligible for the CRES?", a: "Full certification needs an associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of full-time work alone, and at least 40 percent of that work in radiology over the last two years with 25 percent over the last five. Candidate status is open with the degree, the military program, or two years of work alone." },
      { q: "How much does the CRES cost?", a: "In 2026 the exam is $410 for AAMI members and $460 for non-members; a retake is $355 or $405. Certification is renewed every three years with continuing education." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length test in the real exam's format at the real passing score." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Anatomy and Physiology", short: "A&P", pct: 7, quota: 4 },
    { id: 2, name: "Public Safety in the Healthcare Facility", short: "Safety", pct: 8, quota: 4 },
    { id: 3, name: "Fundamentals of Electricity and Electronics", short: "Electronics", pct: 10, quota: 5 },
    { id: 4, name: "Healthcare Technology and Function", short: "Function", pct: 25, quota: 12 },
    { id: 5, name: "Healthcare Technology Problem Solving", short: "Problem Solving", pct: 25, quota: 13 },
    { id: 6, name: "Healthcare Information Technology", short: "Healthcare IT", pct: 25, quota: 12 }
  ],
  // Practice tests pass at 80%; the official-format test uses 70% because ACI publishes no CRES cut score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4"],
    2: ["u2l1", "u2l2", "u2l3", "u3l1", "u3l4", "u2l4", "u2l5", "u3l2", "u3l3"],
    3: ["u4l1", "u4l2", "u4l4", "u4l3", "u4l5", "u4l6"],
    4: ["u5l1", "u5l2", "u5l3", "u5l5", "u6l2", "u6l3", "u6l5", "u7l1", "u8l1", "u8l2", "u5l4", "u5l6", "u6l1", "u6l4", "u6l6", "u7l2", "u7l3", "u7l4", "u8l3"],
    5: ["u9l1", "u9l2", "u9l3", "u9l4", "u9l10", "u9l5", "u9l6", "u9l7", "u9l8", "u9l9"],
    6: ["u10l1", "u10l4", "u10l5", "u10l8", "u10l10", "u10l2", "u10l3", "u10l6", "u10l7", "u10l9", "u10l11", "u10l12"]
  },
  core: {
    1: ["u1l1", "u1l2"],
    2: ["u2l1", "u2l2", "u2l3", "u3l1", "u3l4"],
    3: ["u4l1", "u4l2", "u4l4"],
    4: ["u5l1", "u5l2", "u5l3", "u5l5", "u6l2", "u6l3", "u6l5", "u7l1", "u8l1", "u8l2"],
    5: ["u9l1", "u9l2", "u9l3", "u9l4", "u9l10"],
    6: ["u10l1", "u10l4", "u10l5", "u10l8", "u10l10"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "ACI reports CRES results as pass or fail and publishes no cut score. This course's official-format test uses 70%, the same bar as our CBET course.",
  examDay: [
    "165 questions in 3 hours, closed book, with an on-screen calculator and notepad. That is over a minute per question; do not rush the math items.",
    "Some questions are unscored trial items. A question that seems to be from nowhere may be one of them; answer it and move on.",
    "Read for the qualifier: FIRST, MOST likely, BEST. In problem-solving items the first step is usually the patient, then the simplest cause, then the accessory.",
    "Know the numbers cold: dose limits, the inverse square law, mAs and the 15 percent rule, heat units, fluoroscopy limits, the leakage limits and their standards.",
    "Eligibility is checked when you apply: the technician pathway plus at least 40 percent of your work in radiology over the last two years. Apply early; the windows are May 1 to 15 and November 1 to 15.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Radiation unit conversions and time-to-limit, inverse square law, Ohm's law and circuit math, RC time constants, heat units, mAs and the 15 percent rule, half-value layers, leakage limits and shock thresholds, and subnet questions are generated fresh every time.",
  legacyStoreKeys: []
};
```

- [ ] **Step 2: Create `cres/index.html`** (exact content)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CRES Academy</title>
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="description" content="Self-paced Certified Radiology Equipment Specialist (CRES) exam prep with adaptive training and practice exams.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../engine/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="../courses/cres/course.js"></script>
  <script src="../courses/cres/curriculum-1.js"></script>
  <script src="../courses/cres/curriculum-2.js"></script>
  <script src="../courses/cres/curriculum-3.js"></script>
  <script src="../courses/cres/questions-1.js"></script>
  <script src="../courses/cres/questions-2.js"></script>
  <script src="../courses/cres/questions-3.js"></script>
  <script src="../courses/cres/acronyms.js"></script>
  <script src="../courses/cres/cheatsheet.js"></script>
  <script src="../courses/cres/deep-1.js"></script>
  <script src="../courses/cres/deep-2.js"></script>
  <script src="../courses/cres/deep-3.js"></script>
  <script src="../courses/cres/generators.js"></script>
  <script src="../engine/merge.js"></script>
  <script src="../engine/strength.js"></script>
  <script src="../engine/auth.js"></script>
  <script src="../engine/sync.js"></script>
  <script src="../engine/instruments.js"></script>
  <script src="../engine/app.js"></script>
</body>
</html>
```

Before writing it, compare the `<script src="../engine/...">` list with `cbet/index.html`; if the CBET shell loads an engine file this list lacks, add it in the same position. `tests/loaders.js` audits the list.

- [ ] **Step 3: Update the test expectations first (they fail until the wiring lands)**

`tests/loaders.js` line 14: `const SHELLS = ['bmet', 'netplus', 'secplus', 'cbet', 'cres', 'aplus1', 'aplus2'];`

`tests/acronyms.js` line 9: add `cres: /\bCRES\b|\bCRES Academy\b/` to `COURSE_NAMES` (keep the others). Then run `node tests/acronyms.js` with no argument; if an existing pack's glossary entry text now names CRES (the credential ladder entries in `courses/bmet/acronyms.js` or `courses/cbet/acronyms.js` are the likely places), reword that entry to say "the radiology equipment specialist credential" instead, the same rule those packs already follow for the other courses.

`tests/analytics.js` line 18: add `'cres.html'` after `'cbet.html'`.

`tests/catalog.js` line 83: `check('CBET and CRES sit under AAMI certifications', under('aami').join(',') === 'cbet/,cres/', under('aami').join(','));` and line 87: `cards.length === 7`.

Run: `node tests/catalog.js 2>&1 | grep FAIL`
Expected: the AAMI check and the seven-card check FAIL.

- [ ] **Step 4: Catalog card, JSON-LD, descriptions**

In `index.html`, inside `<section class="cat" id="aami">`, after the CBET card's closing `</div>` (line 75) and before the `</div>` that closes `.cards`, insert:

```html
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="cres/">CRES Academy</a></h3>
          <p>AAMI Certified Radiology Equipment Specialist. 60 lessons on imaging systems, radiation safety, QC, troubleshooting, and the imaging network, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="cres/">Start the course</a>
          <span class="links"><a href="cres/lessons/">Read free lessons</a> &middot; <a href="cres/practice-test/">Practice test</a> &middot; <a href="cres/cheatsheet/">Cheat sheet</a></span>
        </div>
```

In the JSON-LD `ItemList` (lines 27 to 33) insert after the CBET item and renumber the items that follow (NetPlus 4, SecPlus 5, APlus Core 1 6, APlus Core 2 7):

```json
      {"@type":"ListItem","position":3,"name":"CRES Academy: AAMI Certified Radiology Equipment Specialist","url":"https://fieldreadyacademy.com/cres/"},
```

In the `description` meta (line 10) and the `og:description` meta (line 15) change `the AAMI CBET,` to `the AAMI CBET and CRES,`.

- [ ] **Step 5: Build list, stage list, README**

`build.py` line 45: `CATALOG_ORDER = ["bmet", "cbet", "cres", "netplus", "secplus", "aplus1", "aplus2"]`

`scripts/stage.sh` line 29: `for id in bmet netplus secplus cbet cres aplus1 aplus2; do`, and the comment "the six course bundles" to "the seven course bundles".

`README.md` line 5: add **CRES Academy** (AAMI Certified Radiology Equipment Specialist, 60 lessons) after the CBET entry in the live-courses list.

- [ ] **Step 6: Run everything**

```bash
npm test 2>&1 | tail -5
python build.py
node site/build-site.js
```
Expected: every suite passes (selftest now includes `cres`; loaders audits seven shells; catalog sees two AAMI cards; summary and account include the cres row). `dist/cres.html`, `dist/site/cres/index.html` (the landing page with the eligibility FAQ), `dist/site/cres/practice-test/index.html`, `dist/site/cres/lessons/index.html` with fifteen lesson pages, and `dist/site/cres/cheatsheet/index.html` exist; `dist/site/sitemap.xml` gained the cres URLs. If selftest reports a lesson without a deep dive or fewer than five questions, fix the pack file, not the test.

- [ ] **Step 7: Cheat sheet PDF and page count**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/dist/cres-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/cres/index.html#cheatsheet"
python -c "import fitz; print(len(fitz.open('dist/cres-cheatsheet.pdf')), 'pages')"
```
Expected: about 12 pages (record the count in the Status section; up to 15 is acceptable, more means the sheet has grown past the spec).

- [ ] **Step 8: Commit**

```bash
git status --short dist | head
git add courses/cres/course.js cres/index.html index.html tests/catalog.js tests/loaders.js tests/acronyms.js tests/analytics.js build.py scripts/stage.sh README.md dist/cres.html dist/cres-cheatsheet.pdf dist/index.html dist/account.html dist/site
git commit -m "feat(cres): manifest and course page; catalog card; build, stage, loaders, analytics, and acronym lists; first build, static pages, and cheat sheet PDF"
```
(`dist/site/serviceforge/` is git-ignored and will not be added; every other changed `dist` file is tracked and belongs in this commit. Add any other `dist/*.html` the status shows as modified.)

---

### Task 7: Reference and outline coverage checks

Blake's rule: no pack is done until it is term-checked against the reference material on disk, while staying original. Three checks (spec section 3). The script lives in the repo beside the BMET checker; results are recorded in this plan's Status section.

**Files:**
- Create: `scripts/termcheck_cres.py`
- Modify: whichever `courses/cres/*.js` files have gaps; this plan's Status section

**Interfaces:**
- Consumes: `E:\CERT GUIDES\CRES\CRES-study-guide-OCR.txt`, `E:\CERT GUIDES\CRES\Bushong - Radiologic Science for Technologists 10e.pdf`, `E:\CERT GUIDES\CRES\Bushong - Workbook and Laboratory Manual.pdf`, the pack.
- Produces: three printed check reports.

- [ ] **Step 1: Write `scripts/termcheck_cres.py`** with the Write tool (exact content; it is a sibling of `scripts/termcheck.py`, not an edit of it, because that script runs its BMET checks at import time)

```python
# Coverage checker for the CRES pack: three independent checks that the pack's text covers the terms
# the reference sources say it should, while the pack stays original.
#   CHECK 1 - the Mometrix CRES guide (OCR text): section headings and the bold "Term:" definitions.
#   CHECK 2a - the Bushong textbook (10th edition): table-of-contents entries for the chapters the exam outline covers.
#   CHECK 2b - the Bushong workbook: the same, with its worksheet titles.
#   CHECK 3 - every named example in the AAMI/ACI CRES content outline.
# Usage: python scripts/termcheck_cres.py (run from the repo root).
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path("E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/courses/cres")
GUIDE_TXT = "E:/CERT GUIDES/CRES/CRES-study-guide-OCR.txt"
TEXTBOOK_PDF = "E:/CERT GUIDES/CRES/Bushong - Radiologic Science for Technologists 10e.pdf"
WORKBOOK_PDF = "E:/CERT GUIDES/CRES/Bushong - Workbook and Laboratory Manual.pdf"

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"\blitre", "liter"),
      (r"analys", "analyz"), (r"maximis", "maximiz"), (r"minimis", "minimiz"),
      (r"organis", "organiz"), (r"standardis", "standardiz"), (r"polaris", "polariz"),
      (r"magnetis", "magnetiz"), (r"recognis", "recogniz"), (r"utilis", "utiliz"),
      (r"\bionis", "ioniz"), (r"visualis", "visualiz"), (r"aluminium", "aluminum"),
      (r"\bearthing\b", "grounding"), (r"\bsulphur", "sulfur"), (r"\bx ray", "x-ray")]

def stem(w):
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w[-3:] in ("ses", "xes", "zes") or len(w) > 5 and w[-4:] in ("ches", "shes"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w

def norm(s):
    s = s.lower().replace("\u2019", "'")
    for a, b in UK:
        s = re.sub(a, b, s)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return " ".join(stem(w) for w in s.split())

NTEXT = " " + norm(raw) + " "

def has(term):
    t = norm(term)
    return (" " + t + " ") in NTEXT if len(t) >= 3 else True

STOP = set("and the of in for a an to with as vs on or by at from".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

# ---------------------------------------------------------------- CHECK 3
# Every named example in the CRES content outline (2026 handbook, pages 18 and 19).
OUTLINE = """heart; lungs; liver; brain; gastrointestinal; circulatory; musculoskeletal; endocrine;
anatomy; technique; positioning; medical terminology;
electrical safety; mechanical safety; magnetic; MRI; electromagnetic interference; radiation;
TJC; Joint Commission; CMS; OSHA; FDA; BRH; MQSA; ACR; ANSI; AAMI; CMMS; recall; compliance report; performance report;
voltage; resistance; current; power; electronic components; circuit; 3-phase; 480 VAC; power distribution;
battery; ultrasound; portable x-ray; UPS; line conditioning; internal system distribution;
x-ray tube; generator; digital detector; ultrasound probe; gamma camera; subsystem;
preventive maintenance; corrective maintenance; positional terminology;
digital voltmeter; electrical safety analyzer; dosimeter;
risk; schematic; manual; diagnostic software; test equipment;
radiological; fluoroscopy; mammography; diagnostic ultrasound; device error; use error; user training; applications;
clinicians; manufacturer; system security; network security; regulatory compliance;
hardware configuration; software configuration; networking; communications; health information system;
PACS; DICOM; worklist; computer hardware; wired; wireless; cable tracer; PING; DICOM echo; interrelated"""
terms3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss3 = [t for t in terms3 if not has(t)]
print("CHECK 3 CRES outline terms %d, misses %d:" % (len(terms3), len(miss3)))
print("  " + (", ".join(miss3) if miss3 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1
# The Mometrix CRES guide: ALL-CAPS section headings and "Term: definition" lines.
guide = pathlib.Path(GUIDE_TXT).read_text(encoding="utf-8")
DROP1 = re.compile(r"(review video|mometrix|important terms|practice|answer|secret key|test taking|anxiety)", re.I)
heads, keyterms = set(), set()
for line in guide.splitlines():
    s = line.strip()
    if re.match(r"^==== page", s):
        continue
    if re.match(r"^[A-Z][A-Z0-9 ,&/()'-]{3,60}$", s) and 2 <= len(s.split()) <= 8 and not DROP1.search(s):
        heads.add(s.title())
    m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{2,50}):\s+[A-Za-z]", s)
    if m and not DROP1.search(m.group(1)) and len(m.group(1).split()) <= 5:
        keyterms.add(m.group(1).strip())
miss1a = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(heads) if (g := words_missing(t))]
print("CHECK 1a CRES guide section headings %d, headings with an absent content word %d:" % (len(heads), len(miss1a)))
print("\n".join("  " + t for t in miss1a))
print()
miss1b = sorted(t for t in keyterms if not has(t))
print("CHECK 1b CRES guide defined terms %d, misses %d:" % (len(keyterms), len(miss1b)))
print("\n".join("  " + t for t in miss1b))
print()

# ---------------------------------------------------------------- CHECK 2
# Bushong: table-of-contents entries for the chapters in scope. Chapters in FULL contribute their title
# and every section under them; chapters in HEADING_ONLY contribute the title alone. Level 2 entries are
# chapters ("1 Title" in the textbook, "1. Title" in the workbook); deeper levels are their sections.
DROP2 = re.compile(r"(answer key|front cover|back cover|inside front cover|preface|contents|copyright|reviewers|dedication|acknowledg|^\d+\s*-\s*\d+$|^[A-Z]$|summary|challenge questions|review questions|objectives|outline|^-\s*\d+$|crossword)", re.I)
def toc_terms(doc, FULL, HEADING_ONLY):
    terms, chapter = set(), None
    for level, title, page in doc.get_toc():
        t = re.sub(r"\s+", " ", title).strip()
        m = re.match(r"^(\d+)[.:]?\s+(.+)$", t)
        if m and level <= 2:
            chapter = int(m.group(1))
            if chapter in FULL or chapter in HEADING_ONLY:
                terms.add(m.group(2).strip())
            continue
        if level <= 2:
            chapter = None
            continue
        if chapter in FULL and not DROP2.search(t):
            terms.add(re.sub(r"^Experiment \d+\s*-\s*", "", t).strip())
    return terms
def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries in scope %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()
# Textbook, 10th edition numbering: 1-11 physics through scatter, 14-18 computers through viewing, 21-28 digital
# artifacts and QC through CT, 35-38 health physics through occupational dose; 12-13 and 19-20 screen-film and
# 29-34 radiobiology at heading level, because the exam treats film as history and radiobiology as dose limits.
report("CHECK 2a Bushong textbook TOC", toc_terms(fitz.open(TEXTBOOK_PDF),
       set(list(range(1, 12)) + list(range(14, 19)) + list(range(21, 29)) + list(range(35, 39))),
       set([12, 13, 19, 20] + list(range(29, 35)))))
# Workbook numbering: 1-12, 16-20, 22-32, 38-40 in full; 13-15 and 33-37 at heading level.
report("CHECK 2b Bushong workbook TOC", toc_terms(fitz.open(WORKBOOK_PDF),
       set(list(range(1, 13)) + list(range(16, 21)) + list(range(22, 33)) + list(range(38, 41))),
       set(list(range(13, 16)) + list(range(33, 38)))))
```

- [ ] **Step 2: Run it and classify**

Run: `python scripts/termcheck_cres.py > "<scratchpad>/cres_check.txt"; head -8 "<scratchpad>/cres_check.txt"`

If check 1 reports fewer than 60 headings or fewer than 40 defined terms, print 40 lines of the guide around a page marker and adjust the two regexes to the OCR's layout; if check 2a reports fewer than 300 entries or 2b fewer than 150, print the first 60 `get_toc()` rows of that document and adjust the chapter regex; the goal is a term list, not a perfect parser.

Rules:
- Check 3 (outline) must end with `none`. Every miss is a gap: add the exam's exact phrase to the lesson that owns the topic (and its deep dive if the topic is new there).
- Check 1 (guide): a miss is a gap when it names an imaging system, part, quantity, unit, limit, regulator, procedure, positioning term, or fault an imaging technician meets (for example anode heel effect, grid cutoff, sensitometry, decubitus, contrast media reaction); it is out of scope when it names radiographer practice the technician does not perform (patient history taking, chart notations, venipuncture, malpractice law, scheduling) or test-taking advice. Film-era processing terms are in scope at recognition level in u6l1.
- Check 2 (textbook and workbook): the CRES outline is the arbiter. A miss is a gap when it names physics, a tube or generator part, a receptor, a QC test, an artifact, a protection principle, or a dose quantity; it is out of scope when it names radiobiology detail (cell survival curves, LD50), film darkroom detail beyond recognition, a laboratory experiment's procedure, or the textbook's historical and biographical sections.

Rerun after each fix round until check 3 is clean and checks 1 and 2 show only classified out-of-scope entries.

- [ ] **Step 3: Re-validate the pack and the suite**

```bash
node tests/packcheck.js courses/cres && node tests/acronyms.js courses/cres && node tests/gen-smoke.js courses/cres 500 && npm test 2>&1 | tail -3
python build.py cres
node site/build-site.js
```

- [ ] **Step 4: Record and commit**

Add a `## Status` section at the end of this plan: the three checks' term counts, the gaps fixed (lesson id and phrase), and the out-of-scope lists.

```bash
git add scripts/termcheck_cres.py courses/cres docs/superpowers/plans/2026-10-14-cres-academy.md dist/cres.html dist/site
git commit -m "feat(cres): coverage fixes from the outline, guide, and workbook term checks; the CRES term checker; plan status"
```

---

### Task 8: Stage locally and close out

**Files:**
- Modify: this plan's Status section

- [ ] **Step 1: Stage without uploading**

Run: `bash scripts/stage.sh --local`
Expected: `staged N files in dist/stage` with `dist/stage/cres/index.html` (the landing page), `dist/stage/cres/app/index.html` (the app), `dist/stage/cres/practice-test/index.html`, `dist/stage/cres/lessons/index.html`, fifteen free-lesson pages under `dist/stage/cres/lessons/`, and `dist/stage/cres/cheatsheet/index.html`. Check: `ls dist/stage/cres dist/stage/cres/lessons | head -24` and `grep -c "40 percent" dist/stage/cres/index.html` (at least 1: the eligibility clause is on the landing page).

- [ ] **Step 2: Self-test and the free-lesson count**

Run: `node tests/selftest.js 2>&1 | grep -A3 "^cres\|cres:" | head -12` and `node tests/site.js 2>&1 | grep -i "cres\|FAIL" | head`
Expected: the cres block ends `OK` with 60 lessons and 300 or more questions; the site test passes with the cres pages present.

- [ ] **Step 3: Record**

Update this plan's Status section (counts, PDF pages, check results, the staged file count) and commit:

```bash
git add docs/superpowers/plans/2026-10-14-cres-academy.md
git commit -m "docs(plan): CRES Academy status after the local stage"
```

The merge to `main`, the branch deletion, and the hand-off (Blake pushes, runs `bash scripts/stage.sh`, and the printed go-live command; then Search Console: resubmit the sitemap and request indexing on `/cres/` and `/cres/practice-test/`) are the controller's steps after the final review, not this task's.

---

## Self-review against the spec (done while writing)

- Spec 1 decisions: no labs, no certificate, no untested domain (the manifest has six domains, `certificate` absent, no `labs-*.js`); pass 70 as an assumption in `realExamNote` and the sheet; eligibility clause in the FAQ, exam-day notes, and the `exam` section; free with 15 lessons; original content; ASCII.
- Spec 2 manifest, units, lessons, core: Task 6's `course.js` carries every value from the spec table; Tasks 2 to 4 carry all 60 lessons with the spec's titles; `core` and `starterPool` match the spec's starred lessons (30 core).
- Spec 2 objective coverage: every outline letter is named by at least one lesson's `obj` (A&P-A u1l2, A&P-B u1l3, A&P-C u1l4, A&P-D u1l1; SAF-A u2l1, SAF-B u2l5, SAF-C u2l2 to u2l4, SAF-D u3l1 to u3l3, SAF-E u3l4; E&E-A u4l1, E&E-B u4l2 and u4l3, E&E-C u4l4, E&E-D u4l6, E&E-E u4l5; FUN-A u5l1, u5l2, u5l5, u6l1, u6l2, u6l5, u6l6, u7l1, u7l3, u7l4; FUN-B u5l3, u5l4, u5l6, u6l3, u6l4, u7l2; FUN-C u8l1; FUN-D u1l1 and u1l4 by content; FUN-E u8l2 and u8l3; PS-A u9l2, PS-B u9l3, PS-C u9l4 to u9l9, PS-D u9l1, PS-E u9l10; HIT-A u10l8 and u10l9, HIT-B u10l1, u10l3 to u10l6, HIT-C u10l2, u10l10 to u10l12, HIT-D u10l7). FUN-D (positional terminology) has no lesson with that `obj` because it lives in unit 1's lessons by the spec's design; Task 7's check 3 proves the terms are present.
- Spec 3 sources and verification: Task 7 with the three checks; the number rule in Global Constraints; CBET safety numbers verbatim.
- Spec 4 questions, generators, cheat sheet, glossary: Tasks 2 to 4 (300 questions), Task 5 (nine generators: the spec's "unit conversions" transfer became the radiation-units generator `dose`, because the CBET conversions are pressure and temperature, which the CRES outline never names; the dose-rate item is `dose` kind 1), Task 1 (ten sections, 12 pages), acronyms in every task.
- Spec 5 site and catalog: Task 6 (shell, card after CBET, ItemList, descriptions, build and stage lists, README; the static generator discovers the course from `courses/cres/course.js` and its `seo` block).
- Spec 6 tests: Task 6 step 3 (catalog, loaders, acronyms, analytics); Task 7 for the term checks; Task 8 for the site test.
- Spec 7 delivery: branch `cres-academy`, cheat sheet first (Task 1), stage last (Task 8).
- No placeholders: every code step carries its content; the four transferred generator functions are named with their source line ranges and the one edit each needs.

## Status

(filled in by Tasks 7 and 8)
