# BMET Academy: biomed basic training with labs and virtual instruments

Date: 2026-10-12. Asked by Blake: recreate the cbet.edu BMET certificate idea for
FieldReady Academy as a career-entry course, add catalog categories, and plan the
CRES and CHTM packs. Decided in conversation: a separate course (not an extension of
CBET Academy), the AAMI/ACI CABT exam as its capstone, kit labs plus five virtual
instruments in the first release.

## 1. Decisions

| Question | Decision | Why |
|---|---|---|
| New course or expand CBET Academy | New course, id `bmet`, name **BMET Academy**, badge BM | Different audience (no background versus booking the exam), different pricing later; content is rewritten at entry level, not shared |
| Exam target | **CABT** (Certified Associate in Biomedical Technology, ACI): 100 questions, 120 minutes, remote proctored year-round, no experience required, valid 5 years | A real AAMI credential beats any certificate we could issue; the engine already does exam prep, so engine work shrinks to labs and a certificate |
| Labs | Kit labs on a $60-$100 home kit, every kit lab also runnable on the virtual DMM, plus five browser instruments | The hands-on part is what makes it basic training rather than another exam course |
| Instruments | Safety analyzer, DMM, patient simulator with monitor, infusion flow check, defibrillator analyzer | The three a BMET uses most plus two that are mostly arithmetic and drill the Reasoning domain |
| CLES | Not planned | ACI retired the CLES exam after 2018; the 2026 handbook has no CLES section |
| CBET pack | Five one-sentence touch-ups, no new lesson | The pack already matches the 2026 outline; five terms appear only once |

## 2. The course

### Manifest

    id: "bmet", name: "BMET Academy", short: "BM", brand: "FieldReady Academy"
    exam: { vendor: "AAMI / ACI", title: "Certified Associate in Biomedical Technology",
            code: "CABT", questions: 100, minutes: 120, passPct: 70 }
    test: { questions: 50, minutes: 60, passPct: 80, passesNeeded: 3, passWindow: 5,
            starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 }
    domains:
      1 Anatomy and Physiology            pct 10  quota 5
      2 Medical Devices and Test Equipment pct 23  quota 12
      3 Safety in Healthcare              pct 16  quota 8
      4 Electricity and Electronics       pct 14  quota 7
      5 Reasoning and Problem Solving     pct 24  quota 12
      6 Healthcare IT                     pct 13  quota 6
      7 Your Career                       pct 0   quota 0      (untested, see 5.1)
    freeCourse: true, free: { lessons: 10 }, certificate: true
    catalogUrl: "../", feedbackEndpoint: the shared API

ACI publishes no CABT cut score (criterion-referenced, modified Angoff), so the
official-format test uses 70% like the CBET pack; `realExamNote` says so. The
official-format test draws 100 questions with quotas 10, 23, 16, 14, 24, 13.
`examDay` covers remote proctoring: a laptop with a movable webcam, an enclosed room
with nothing on the desk, the on-screen four-function calculator, the 60-day retake
wait, and the six-month window after purchase.

### Flow

Unchanged from the other courses: cheat sheet, starter test (2 per tested domain, 12
questions), tutorial, 50-question test, retraining, practice tests until 3 of the last 5
score 80% or better, then the official-format test at 70%, then "Ready". Labs sit inside
lessons and do not change the stage logic. The certificate (5.3) is a separate gate.

### Units and lessons (53 lessons, 13 labs)

Domain 7 lessons (units 1 and 8) are never tested. Every other lesson has 5 to 6
questions, a deep dive, and a checkpoint, as in every pack.

**Unit 1. Welcome to Healthcare Technology Management** (domain 7)
- u1l1 What a BMET does: the department, a typical day, the ladder from BMET I to manager
- u1l2 The CABT exam and how this course works: format, fees, remote proctoring, the stages
- u1l3 Your lab kit and your first measurements [lab `kit-setup`]

**Unit 2. Anatomy, Physiology, and Medical Terminology** (domain 1, 10%)
- u2l1 Body organization, directions, and medical word parts
- u2l2 The heart and circulation, and the numbers a monitor shows
- u2l3 The lungs and breathing: oxygen, carbon dioxide, ventilation basics
- u2l4 The nervous system and the brain
- u2l5 Kidneys, blood, skin, and the digestive and endocrine systems
- u2l6 Vital signs and which device measures each

**Unit 3. Electricity and Electronics** (domain 4, 14%)
- u3l1 Charge, current, voltage, and resistance
- u3l2 Ohm's law and power [lab `dmm-ohms`]
- u3l3 Series and parallel circuits [lab `series-parallel`]
- u3l4 Power supply, switch, load: reading a simple circuit and its schematic symbols
- u3l5 Opens, shorts, fuses, and circuit breakers [lab `open-short`]
- u3l6 DC versus AC, transformers, and wall power
- u3l7 Capacitors, inductors, diodes, LEDs, and transistors at recognition level
- u3l8 Batteries, chargers, and battery care
- u3l9 Wiring, color codes, ground, and ESD [lab `continuity-diode`]

**Unit 4. Math and Reasoning for Technicians** (domain 5, 24%)
- u4l1 Metric prefixes and unit conversions: mL, mmHg, cmH2O, PSI, C and F, microamps
- u4l2 Reading scales, meters, and graduated cylinders; tolerance and percent error [lab `reading-scales`]
- u4l3 Reading waveforms: ECG paper, period, amplitude, rate
- u4l4 Graphs, tables, and trend data
- u4l5 Flowcharts and process of elimination
- u4l6 Reading a service manual: specifications, PM procedures, parts lists, error codes
- u4l7 Work orders and documentation: writing down what you did

**Unit 5. Safety in Healthcare** (domain 3, 16%)
- u5l1 Electrical safety: macroshock, microshock, and why leakage matters
- u5l2 The electrical safety test: ground resistance and leakage [lab `safety-pass`]
- u5l3 Reading the limits: NFPA 99, IEC 60601-1, and a failing device [lab `safety-fail`]
- u5l4 Lockout tagout, safety data sheets, and hazard communication
- u5l5 Medical gas color codes, signage, and symbols
- u5l6 Infection control, universal precautions, and PPE
- u5l7 Device-specific hazards: imaging, defibrillators, lasers, MRI, lab equipment, fire

**Unit 6. Medical Devices and Test Equipment** (domain 2, 23%)
- u6l1 Diagnostic devices: otoscope, ophthalmoscope, thermometers, scales, bladder scanners, EKG carts, microscopes, centrifuges
- u6l2 Patient monitoring: ECG, NIBP, SpO2, EtCO2, temperature, telemetry
- u6l3 Verifying a monitor with a patient simulator [lab `monitor-pm`]
- u6l4 Infusion devices: large-volume, syringe, PCA, and feeding pumps
- u6l5 Checking an infusion pump's flow rate [lab `infusion-check`]
- u6l6 Defibrillators, AEDs, and the defibrillator analyzer [lab `defib-check`]
- u6l7 Suction, patient warming and cooling, SCDs, and physical therapy equipment
- u6l8 Hand tools and the biomed toolbox: torque wrenches, Allen keys, stopwatches, graduated cylinders, tachometers
- u6l9 Incoming inspection and scheduled maintenance, start to finish [lab `incoming-inspection`]
- u6l10 Minor troubleshooting: the first checks before you call for help

**Unit 7. Healthcare IT** (domain 6, 13%)
- u7l1 Inside a computer: CPU, RAM, hard drive and SSD, GPU, power supply, printers
- u7l2 Connectors and cables: USB types, video outputs, network cables
- u7l3 Networks: LAN, WAN, Wi-Fi, Bluetooth, RFID, VLAN, VPN, the data closet and server rack [lab `ping-walkthrough`]
- u7l4 Apps and smartphones on the job: CMMS, barcode scanning, manuals
- u7l5 HIPAA, the EMR, and device integration
- u7l6 Network security basics: firewalls, phishing, patches, passwords

**Unit 8. Getting Hired** (domain 7)
- u8l1 Where the jobs are: hospitals, ISOs, OEM field service, military, and how each hires
- u8l2 Your resume and your lab portfolio
- u8l3 Interviews and the hands-on test
- u8l4 Your first 90 days
- u8l5 The certification ladder: CABT, then CBET, then CRES or CHTM

### Labs

| Lab | Lesson | Instrument | What the learner does |
|---|---|---|---|
| kit-setup | u1l3 | dmm (kit toggle) | Identify the kit parts, measure a 9 V battery and one resistor |
| dmm-ohms | u3l2 | dmm | Measure V and I in a one-resistor circuit, compute R, compare with the color code |
| series-parallel | u3l3 | dmm | Voltages across series resistors, current in parallel branches, check Kirchhoff |
| open-short | u3l5 | dmm | Find the open fuse and the shorted resistor in a drawn circuit |
| continuity-diode | u3l9 | dmm | Continuity of a switch and a cable, diode and LED forward drop, wire color identification |
| reading-scales | u4l2 | figures | Read an analog meter, a graduated cylinder, and a strip; compute tolerance and percent error |
| safety-pass | u5l2 | safety | Ground resistance, chassis leakage under normal, reverse, and open-ground; verdict pass |
| safety-fail | u5l3 | safety | Same tests on a device with one failing reading; find it, name the limit, verdict fail |
| monitor-pm | u6l3 | monitor | Set simulator rate, rhythm, SpO2, NIBP; record monitor values; compute error; verdict |
| infusion-check | u6l5 | infusion | Set a rate, run a timed collection, read the cylinder, compute rate and percent error; verdict |
| defib-check | u6l6 | defib | Discharge at four energies into the analyzer, record delivered joules; verdict |
| incoming-inspection | u6l9 | safety + choices | Visual checks, a safety test, a function check, the paperwork, in order |
| ping-walkthrough | u7l3 | choices | Read a shown ping and ipconfig output: which device answered, loss, what to try next |

The kit list, printed in u1l3 and on the course Home until the kit lab is done: digital
multimeter, breadboard, jumper wires, resistor assortment, a few capacitors, 9 V battery
and clip, LEDs, a slide switch, a fuse holder with a 1 A fuse. No affiliate links. A
learner without a kit runs every kit lab on the virtual DMM; the task ranges accept both.

## 3. Lab data model

A new pack file `courses/bmet/labs-1.js` (more files if needed) fills `FRA.labs`:

    FRA.labs["safety-pass"] = {
      id: "safety-pass", lesson: "u5l2", title: "Safety test on a good infusion pump",
      instrument: "safety",            // dmm | safety | monitor | infusion | defib | figures | choices
      intro: "...",                    // same mini-markup as lesson bodies
      kit: ["..."],                    // optional, kit labs only
      manual: "...",                   // optional excerpt the learner must apply (limits, tolerances)
      scenario: { ... },               // instrument-specific truth, see section 4
      tasks: [
        { id: "gnd", kind: "reading", prompt: "Ground wire resistance", unit: "ohm", expect: [0.08, 0.16] },
        { id: "verdict", kind: "verdict", prompt: "Does this device pass?", expect: "pass" },
        { id: "which", kind: "choice", prompt: "...", options: ["...", "..."], expect: 1 },
        ...
      ],
      why: { gnd: "...", verdict: "..." }   // explanation shown on a wrong answer
    };

A lesson references its lab with `lab: "safety-pass"`. Rules the self-test enforces:
every lab's lesson exists and points back at it; every instrument name is known; every
`reading` task's range contains the scenario's true value after jitter; every `choice`
expect is a valid index; every task has a `why`.

Rendering: the lab card sits between the lesson body and the checkpoint. It shows the
intro, the kit list, the manual excerpt, the instrument panel, and the task sheet. Each
task has an input (number with unit, pass/fail buttons, or choices) and a Check button.
Wrong answers show the `why` and allow retry without penalty. When every task is
correct the lab is done, the card collapses to a green summary, and the Home page lab
count updates. Learners can reopen and redo a lab at any time.

State (see 5.2): `S.labs[id] = { done: true|false, at: ms, values: { taskId: value } }`.

## 4. Instruments

One engine file, `engine/instruments.js`, exports `window.FRAInstruments` with:

    render(el, lab, state, api)   // draws the panel into el; api.record(taskId, value) fills a task
    compute[name](scenario, controls) -> readout   // pure, tested without a DOM
    figure(spec) -> svg string    // meter, cylinder, strip, used by instruments and the figures lab

Readouts are deterministic: a seeded PRNG from the lab id adds one least-significant-digit
of jitter so repeat measurements look real but tests can assert exact values. The engine
never hardcodes a safety limit or a tolerance; every limit comes from the lab's `manual`
and `scenario`, and the content is checked against the CBET pack and the reference books.

**4.1 DMM** (`dmm`). Controls: a function dial (V DC, V AC, ohms, A DC, continuity and
diode), auto range, a circuit power switch, red and black probes placed by clicking two
labeled test points on a drawn circuit, and a "I'm using my own kit" toggle that hides the
readout and lets the learner type readings. Scenario: an SVG circuit drawing from a small
part list (battery, resistors with color bands, fuse, switch, LED, a current-break point)
and precomputed tables `v`, `r`, `i`, `cont` keyed by point pair, with an `openFuse` or
`short` flag for the fault labs. Rules: ohms and continuity with power on show
"INVALID: circuit powered" and record nothing; amps anywhere but the break point show
OL; swapped probes show a negative sign; continuity beeps below the scenario's threshold.

**4.2 Safety analyzer** (`safety`). Controls: test select (ground wire resistance,
chassis leakage, patient lead leakage), polarity normal or reverse, ground open or
closed, a Test button, and a limits card rendered from the lab's `manual`. Scenario:
`ground` in ohms, `chassis` and `lead` tables keyed by condition in microamps, the
applied-part type (B, BF, CF) and device class. Rules: ground open plus reverse polarity
is the worst case and the readout shows it; the verdict truth is computed by the engine
from scenario values against the manual's limits.

**4.3 Patient simulator and monitor** (`monitor`). Controls on the simulator side: ECG
rate (30 to 300), rhythm (normal sinus, asystole, ventricular fibrillation), SpO2 (70 to
100), NIBP systolic and diastolic. The monitor side shows a strip figure and numerics
once the learner applies the simulator settings, and an alarm banner for asystole and
fibrillation. Scenario: per
parameter offsets the monitor adds (`hrErr`, `spo2Err`, `sysErr`, `diaErr`) and a
tolerance block from the manual. Rules: the verdict truth is in-tolerance for every
parameter the lab asks about.

**4.4 Infusion flow check** (`infusion`). Controls: rate in mL per hour, volume to be
infused, Start, and a fast-forward to the collection time. A cylinder figure fills as the
timer runs. Scenario: `rateErr` as a fraction, cylinder size and graduation. Rules: true
delivered volume = set rate times time times (1 + rateErr); the learner reads the
cylinder to the nearest graduation, computes the delivered rate and percent error, and
the verdict truth compares the error with the manual's tolerance.

**4.5 Defibrillator analyzer** (`defib`). Controls: energy select from the lab's list
(for example 2, 50, 200, 360 J), Charge, Discharge, and a delivered-energy readout with
charge time. Scenario: per-setting `deliveredErr` fractions. Rules: verdict truth per
setting against the manual's tolerance (an absolute floor at low energies and a
percentage above it, both from the manual).

**4.6 Figures** (`figures`, `choices`). No controls. A `figures` lab shows SVG figures
from `figure()` specs (analog meter with a needle, graduated cylinder with a meniscus,
ECG strip with a grid) and asks readings. A `choices` lab shows preformatted text (ping
output, an inspection checklist) and asks choice and verdict tasks.

## 5. Engine changes

**5.1 Untested domains.** A domain with `quota: 0` is untested. `TESTED_IDS` replaces
`DOMAIN_IDS` in the starter sampler, `buildExam`, the custom test setup weights, domain
accuracy bars, readiness, and strength ranking. Untested lessons also stay out of the
readiness meter, the weak-topics list, and the strength chart's weakest list; they keep
checkpoints and count toward lessons passed and the certificate. `STARTER_N` is `TESTED_IDS.length *
starterPerDomain`. Lessons in an untested domain still appear in the rail and the "whole
course" path, have checkpoints, count toward lessons passed, and are required for the
certificate. The lesson header shows "Not on the exam" for them. The self-test fails if
an untested domain has `pct` other than 0 or if a tested domain has `quota` 0.

**5.2 State, merge, account.** The default state gains `labs: {}`. `engine/merge.js`
merges `labs` by the newer `at` per id (same shape of rule as `ratings`). `load()` adds
`labs` to old blobs. The account summary (`engine/summary.js`, `build_account()` in
`build.py`) carries `labs: n` per course and the account page shows "Labs x of n" for
courses with labs.

**5.3 Certificate.** Shown only when the manifest has `certificate: true`. A Progress
page card and a `#certificate` view. Gate: every lesson passed, every lab done, and the
official-format test passed (`S.official`). Before the gate it lists what is left. The
certificate page is print-styled: course name, "Certificate of completion", the learner's
name, the date, lessons and labs counts, and the FieldReady mark. The name comes from
`FRAAuth` when signed in, else a text field saved to `S.settings.certName`. No
verification registry in this release.

**5.4 Catalog categories.** `index.html` becomes four sections, each a heading and one
sentence:

- Start here: biomed basic training (BMET Academy)
- AAMI certifications (CBET Academy; CRES and CHTM later)
- CompTIA certifications (NetPlus, SecPlus, APlus Core 1, APlus Core 2)
- Tools for technicians (ServiceForge)

`catalog.css` styles the section header. `build.py` `CATALOG_ORDER` becomes
`["bmet", "cbet", "netplus", "secplus", "aplus1", "aplus2"]`, which also orders the
account page. `tests/catalog.js` asserts each card sits under its heading.

**5.5 Loaders.** `engine/instruments.js` is registered in `build.py`, `tests/lib.js`,
and all six shells (`bmet/index.html` is new); `tests/loaders.js` adds `bmet` to
`SHELLS` and `instruments.js` to the engine list. `app.js` reads
`window.FRAInstruments` at render time, not at boot, so a missing file renders "This
lab is unavailable" inside the lab card instead of a blank page.

**5.6 Static SEO pages.** `site/build-site.js` discovers the course automatically. A
lesson with a lab renders a one-line note, "This lesson includes an interactive lab in
the course," where the lab card would be; the parity test treats that note as the lab's
rendering. The lessons index marks lab lessons.

**5.7 Course page.** `bmet/index.html` shell, a catalog card, and `dist/bmet.html` from
`python build.py bmet`. The cheat sheet PDF prints through headless Chrome as for the
other packs.

## 6. Content sources and verification

Reference folder `E:\CERT GUIDES\BMET\` holds copies of `Electronics For Dummies,
2010.pdf` and `ACI-Certification-Handbook-090926.pdf` from Downloads. The Mometrix CBET
guide stays in `E:\CERT GUIDES\CBET\`. The term-check method from the other packs runs
three ways:

1. Units 3 and 4 against Electronics For Dummies (chapters 1 to 8, 10, 12, 13).
2. Units 2, 5, 6, and 7 against the Mometrix CBET guide.
3. Every unit against the CABT content outline: each named example in the outline must
   appear in at least one lesson (bladder scanner, torque wrench, channel locks, RFID,
   VLAN, GPU, ESD, LOTO, SDS, and the rest).

Safety numbers (perception, let-go, fibrillation, microshock thresholds; ground
resistance; chassis leakage limits with their standard and edition; pulse oximetry
wavelengths) are copied from the CBET pack verbatim and checked by the same list. The
AAMI "Core Competencies for the HTM Entry-level Technician" PDF joins check 3 if bought.

Generators (`courses/bmet/generators.js`): unit conversions, Ohm's law and
series/parallel, tolerance and percent error, meter and strip reading, infusion rate
error, delivered-energy error, leakage pass/fail against a stated limit. `acronyms.js`
with the coverage test. A 12-page cheat sheet organised by the six tested domains. (Shipped at 15 pages, the shortest sheet in the catalog; see the plan's Status.)

CBET touch-up. Four outline terms appear only on the cheat sheet, not in any lesson or
deep dive, so each gets one sentence in the lesson body and its deep dive: HHS
cybersecurity performance goals in u9l5 (Protected Health Information and Medical
Device Cybersecurity), power cord color coding in u3l1 (Electrical Safety), in-service
training in u7l5 (Communication, User Training, and Closing the Loop), Unix in u9l6
(Computer Hardware and Software Troubleshooting). Laboratory rockers already have a
section in u5l4 and need nothing.

## 7. Tests

Existing `npm test` runs on the new pack: selftest, gating, acronyms coverage, loaders,
site parity, catalog, summary, merge, gen-smoke, balance-keys. New or extended:

- `tests/instruments.js`: each `compute[name]` against fixed scenarios (DMM invalid-ohms
  rule, probe polarity, safety worst case, monitor offsets, infusion volume, defib
  per-setting energies, figure SVG contains the needle angle and liquid height), and
  jsdom rendering: controls change the readout, Record fills the task, Check marks the
  lab done and saves state.
- `tests/engine.js` additions: untested domain excluded from starter, quotas, bars, and
  strength; included in rail, lessons passed, and the certificate gate; the certificate
  view locked before the gate and printable after.
- `tests/merge.js`: `labs` merged by newer `at`.
- `tests/catalog.js`: four sections, every card under the right one.
- `tests/site.js`: the lab note on a static lesson page.
- `tests/fixtures/mini`: one lab on one lesson and one untested domain, so the engine
  work is testable before the pack exists.

## 8. Delivery order

1. This spec, committed.
2. Plan A, engine: 5.1 untested domains, section 3 and 4 labs and instruments, 5.2
   state and account, 5.3 certificate, 5.4 catalog, 5.5 loaders, 5.6 static pages, with
   the mini fixture and tests. Mergeable on its own; no visible change on live courses
   except the catalog sections.
3. Plan B, content: cheat sheet, curriculum, labs, questions, deep dives, generators,
   acronyms, verification checks, the CBET touch-up, build, PDF.
4. A roadmap note for CRES and CHTM (`docs/superpowers/plans/2026-10-12-cres-chtm-roadmap.md`):
   domains and weights from the handbook, draft unit outlines, what the CBET pack lends
   them, the reference books to buy.
5. Staging through `scripts/stage.sh`. Push and deploy only when Blake asks.

## 9. Assumptions and out of scope

- CABT official-format pass bar 70% is an assumption; ACI publishes no cut score.
- No affiliate links, no kit sales, no certificate verification registry, no live
  instruction. Each can be added later without changing the data model.
- Virtual instruments model one device each; they are teaching models, not emulations
  of any brand. Lab text says so.
- Pricing stays free for now (`freeCourse: true`), matching the other courses.
- CLES is not built. CRES and CHTM wait for seed materials; the roadmap note is the only
  deliverable for them in this cycle.

## Appendix: reference sources (researched 2026-10-12)

Cheapest useful set, all legitimate sources: BMET Academy needs only what is on disk
plus the optional AAMI entry-level competencies PDF (about $30) and one device text
(Christe 1st ed. used about $18, or Chan 3rd ed. 2023 $49.95 from the publisher).
CRES: Papp 5th, Callaway 7th, Bushong 11th used, about $60 together. CHTM: Wang and
Frize as Springer eBooks ($20 to $25 each), Dyro 1st ed. used about $25; the Stiefel
manual is unobtainable and AAMI's HTM Manual 8th ed. replaced it. Free and official:
NFPA 99 read-only at nfpa.org, 21 CFR at ecfr.gov, OSHA 1910, CMS Appendix A, the ACI
outlines. Carr and Brown is out of print (used about $40); the AAMI Practicum is $369
and AAMI-only. 2026 exam fees, member and non-member: CABT $210 and $270, CBET and CRES
$410 and $460, CHTM $490 and $565.
