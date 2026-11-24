# INST1 Academy: design

Date 2026-11-24. Blake chose the target (BICSI Installer 1, "Okay what do you need for bicsi1"),
the reference edition ("BUILD WITH THE 6TH"), about 52 lessons and task labs (both "Recommended"
options), and approved the design in conversation on 2026-11-24 ("YOU CAN CONTINUE YES"). Exam facts
come only from the BICSI INST1 Certificate Handbook on disk (appendix). The pack follows the CIIP
pack's shape (`docs/superpowers/specs/2026-11-23-ciip-academy-design.md`) plus BMET-style labs
(`docs/superpowers/specs/2026-10-12-bmet-academy-design.md`, section 3), except where this spec says
otherwise.

## 1. Decisions

- **Exam prep with task labs.** Cheat sheet first, starter test, adaptive tutorial, 50-question
  practice tests, three of the last five at 80 percent, then one official-format test at the
  course bar, recorded permanently. Ten labs rehearse the hands-on exam's kind of work. No
  certificate.
- **The reader is a new cabling installer**: an apprentice, a helper, an electrician or IT tech
  moving into low-voltage work. Every lesson teaches a task, a rule, or a decision that person owns
  on a commercial job, and the questions are jobsite scenarios (a conduit that will not take one
  more cable, a jack that fails wiremap, a penetration that needs firestop, a riser pull from the
  top floor).
- **52 lessons in 9 units, one unit per exam area**, sized by exam weight with a floor of 2.
  Units run in learning order (planning and codes first, the small areas last); domain ids keep
  the handbook's outline order as 1 to 9.
- **Official-format test mirrors the written exam:** 75 questions in 120 minutes, pass at 75
  percent. BICSI sets the cut score by the Angoff method and does not publish it; `realExamNote`
  says so and explains that 75 percent is our bar.
- **The hands-on exam is said plainly:** six tasks, 20 minutes each, pass/fail per task, given on
  the last day of BICSI's IN101 class, and it must be passed before the written exam. The labs
  prepare the knowledge behind those tasks; the FAQ says real practice with real tools is still
  needed.
- **Reference edition:** the manual on disk is the ITSIMM 6th edition (2010); the exam is built from
  the 8th. The 6th is used for term coverage only. Every number in the pack is written from current
  practice (current TIA-568, TIA-569, TIA-606, TIA-607 families and the current NEC), and revision
  letters and NEC years are not named where the revision matters ("the current TIA-568 standard",
  "the NEC"). Each edition-sensitive number goes on the plan's re-check list (section 3).
- **Independence is said plainly.** BICSI warns candidates about unauthorized prep material. The
  course is original, never reproduces BICSI exam content, uses no BICSI logo, and its landing page
  and FAQ say it is independent and not affiliated with or endorsed by BICSI.
- **Catalog:** a new section "BICSI certifications" after CompTIA certifications. Related courses:
  Network+ and A+ Core 1.
- **Free at launch** (`freeCourse: true`, 15 free lessons), like every other course.
- **Original content only**, no reference to any book or source anywhere in the pack, plain words,
  plain ASCII in every pack file, feedback buttons on every lesson, the longest-option rule in every
  question, and the CIIP build lessons (`project-ciip-candidate`): all three option-length targets
  given to writers up front, numeric questions as four bare values, keys re-checked by content
  after any option rewrite, coverage insertions that teach, a 20,000-draw edge sweep per generator.

## 2. The course

### Manifest (`courses/inst1/course.js`)

| Field | Value |
|---|---|
| `id`, `name`, `short` | `inst1`, `INST1 Academy`, `I1` |
| `exam` | vendor `BICSI`, title `Installer 1`, code `INST1`, 75 questions, 120 minutes, `passPct: 75` |
| `description` | Self-paced BICSI Installer 1 (INST1) exam prep with cabling labs, adaptive training, and practice exams. |
| `seo.title` | BICSI Installer 1 Study Guide and Practice Tests \| INST1 Academy |
| `seo.h1` | BICSI Installer 1 (INST1) Study Guide and Practice Tests |
| `seo.phrases` | BICSI Installer 1 study guide, INST1 practice test, BICSI installer exam questions, structured cabling certification, low voltage cabling certification |
| `seo.related` | `netplus`, `aplus1` |
| `seo.faq` | How many questions (written: 75 multiple choice in 2 hours at a Pearson center, knowledge and application questions; calculator and whiteboard provided; no scheduled breaks); the hands-on exam (six tasks, 20 minutes each, pass/fail per task, one same-day retry on a single failed task, must be passed before the written exam); how it is scored (cut score set by expert panel, not published; our official-format test uses 75 percent); who is eligible (no experience required; BICSI recommends its IN101 class and 50 hours of manual study; physical requirements: color vision, fine motor skill, standing, ladders, lifting 50 pounds); cost ($335 member, $400 nonmember, covering the first hands-on and written attempts; retest $135 or $200; 30-day wait between attempts, 90 days after a third failure; one-year eligibility from the first hands-on attempt); does it renew (no, INST1 is nonrenewable; the next steps are Installer 2 Copper and Installer 2 Optical Fiber); is this course from BICSI (no, it is independent); do I need tools (no, every lab runs on screen; the optional kit costs about $50); is it free (yes while the site launches) |
| `domains` | 1 Field Planning, Implementation, and Design, short `Planning`, pct 13, quota 6; 2 Pathways and Spaces, `Pathways`, 31, 16; 3 Pulling Copper and Fiber Cable, `Pulling`, 21, 11; 4 Terminating Copper and Fiber Cable, `Termination`, 15, 8; 5 Testing, `Testing`, 6, 3; 6 Troubleshooting, `Troubleshooting`, 6, 3; 7 Retrofits, `Retrofits`, 3, 1; 8 Integration and Convergence, `Integration`, 3, 1; 9 Codes and Standards, `Codes`, 2, 1 |
| `test` | 50 questions, 55 minutes, `passPct: 80`, `passesNeeded: 3`, `passWindow: 5`, `starterPerDomain: 2`, `checkpointN: 4`, `checkpointPass: 3` |
| `starterPool`, `core` | per domain, listed under each unit below |
| `freeCourse`, `free.lessons` | `true`, 15 |
| `kit`, `kitLab` | the kit list below, `label-run` |
| `realExamNote` | BICSI sets the written exam's passing score by expert panel and does not publish it. This course's official-format test asks for 75 percent. |
| `examDay` | hands-on first: six tasks, 20 minutes each, work to the standard and keep the work area clean; written later at a Pearson center: 75 questions in 2 hours, no breaks scheduled, calculator and whiteboard provided; read for FIRST, MOST, BEST; the installer's answer is the one that is safe, to code, and to the standard; two forms of ID, the name matching the BICSI profile |
| `generatedNote` | the generator list in section 4 |
| `feedbackEndpoint` | `https://api.fieldreadyacademy.com/v1/feedback` |
| `legacyStoreKeys` | `[]` |

Quotas come from 50 x pct: 6.5, 15.5, 10.5, 7.5, 3, 3, 1.5, 1.5, 1. The floors sum to 47; the
three remaining questions go to the three largest areas with a half remainder (Pathways,
Pulling, Termination), so the quotas sum to 50.

### Units and lessons (9 units, 52 lessons)

Lesson ids are `u<unit>l<n>`. Every lesson has a deep dive. `starterPool` lists the unit's lessons
in the order given; `core` lessons are marked with a star. Handbook task references are in
brackets (area number, then task order within it). Labs are named in square brackets after the
reference.

**Unit 1: Field Planning** (domain 1, 7 lessons)
1. The installer's job, the ICT trades, and professional conduct on a site * [1]
2. Jobsite safety: the site safety plan, hazards, PPE, ladders and lifts, lockout, working near power * [1.5]
3. Copper cable: twisted pair categories, UTP and shielded, conductor size, multipair, coax types * [1.1]
4. Optical fiber: multimode and singlemode, core sizes, buffer and jacket types, color codes, identification * [1.2]
5. Reading blueprints: symbols, scales, legends, floor plans, riser diagrams, details [1.3]
6. Tools, materials, and the job inventory: the materials list, staging, checking deliveries [1.4]
7. Labeling and administration: identifiers for spaces, cables, panels, ports, and pathways; label placement; records * [1.6] [lab `label-run`]

**Unit 2: Codes and Standards** (domain 9, 2 lessons)
1. Who writes the rules: codes versus standards, the authority having jurisdiction, the cabling standard families, listing and labeling * [9.1]
2. Cable listings and fire ratings: plenum, riser, general purpose, limited use, the substitution hierarchy, where each may go * [9.1]

**Unit 3: Pathways and Spaces** (domain 2, 15 lessons)
1. The structured cabling system: horizontal, backbone, work area, entrance, topologies, distance limits * [2]
2. Telecommunications spaces: telecom room, equipment room, entrance facility, telecom enclosure; size, environment, power, lighting * [2.1]
3. Racks and cabinets: anchoring, spacing, clearances, cable management, power strips [2.1]
4. Bonding and grounding: the primary and secondary busbars, the backbone bonding conductor, bonding conductors, what gets bonded * [2.2]
5. Making the bond: lugs, compression connectors, conductor routing, labels, continuity checks [2.2]
6. Cable support systems: choosing among conduit, tray, ladder rack, mesh, and hooks; EMI and separation from power * [2.3, 2.11, 2.12]
7. The outlet at the wall: boxes, rings, mounting heights, accessibility rules, box fill [2.4]
8. Cut-in rings and old work: locating studs and obstructions, cutting, securing the ring [2.5] [lab `cut-in-ring`]
9. Floor outlets, poke-throughs, and access floors: fire-rated poke-throughs, under-floor support [2.6, 2.10, 2.14]
10. Utility columns, modular furniture, ceilings, and special locations: hazardous, wet, and exterior outlets [2.7, 2.8]
11. Sleeves, cores, and slots: sizing, placement, spare capacity, sealing [2.9]
12. Trays and ladder rack: assembly, support spacing, bonding, fill, transitions * [2.11]
13. J-hooks, bridle rings, and other noncontinuous supports: spacing, sag, load limits, independent support [2.12]
14. Conduit, raceway, and innerduct: conduit fill, pull boxes, bends between pull points, surface raceway, innerduct and ENT for fiber * [2.13, 2.15] [lab `conduit-fill`]
15. Firestopping and smoke barriers: rated assemblies, listed systems, mechanical and nonmechanical methods, inspection * [2.16] [lab `firestop-pick`]

**Unit 4: Pulling Cable** (domain 3, 10 lessons)
1. Pull planning and setup: reels and spools, reel stands, sheaves, the pull schedule, communication * [3.1]
2. Pull string and rope: fish tape, rods, vacuum and blown line, attaching the string [3.2]
3. The limits on every pull: pulling tension, bend radius during and after the pull, crush, twist, lubricant * [3.1] [lab `bend-tension`]
4. Horizontal cable in conduit: grips, pulling eyes, feeding, the pull-box rule * [3.3]
5. Horizontal cable in open ceilings: hooks and rings, bundling, keeping clear of lights and sprinklers, plenum rules [3.4]
6. Backbone riser from the top down: hoisting, brakes, securing, support at each floor * [3.5]
7. Backbone riser from the bottom up: winches, swivels, tension monitoring, support [3.6]
8. Horizontal backbone between rooms and buildings [3.7]
9. Pulling optical fiber: strength members, tension limits, figure-eight storage, innerduct [3.1, 3.2]
10. Slack, service loops, and dressing the pull into the room [3.3, 3.5]

**Unit 5: Termination** (domain 4, 8 lessons)
1. Pretermination: sheath removal, conductor handling, untwist limits, keeping the pair geometry * [4.1]
2. Connecting hardware: jacks, patch panels, 110 and 66 blocks, choosing by category and use * [4.2] [lab `punch-110`]
3. Four-pair termination: T568A and T568B, jacks and panels, plugs * [4.4] [lab `jack-t568b`]
4. Multipair termination: the 25-pair color code, binder groups, 66 and 110 blocks * [4.3] [lab `pair-colors`]
5. Coaxial termination: cable types, F and BNC connectors, compression fittings, strip dimensions [4.5] [lab `coax-f`]
6. Optical fiber connectors: types, polish, mechanical and fusion methods, pigtails, panels * [4.6]
7. Inspecting and cleaning fiber end faces [4.6]
8. Shielded cabling: drain wires, shield continuity, bonding at the panel [4.2, 4.4]

**Unit 6: Testing** (domain 5, 3 lessons)
1. Permanent link and channel: what each includes and when each is tested * [5.1]
2. Test parameters: wiremap, length, insertion loss, NEXT, return loss, and the pass margin * [5.1]
3. Running the tester: reference and calibration, autotest, saving and reporting results, fiber loss basics [5.1]

**Unit 7: Troubleshooting** (domain 6, 3 lessons)
1. Wiremap faults: opens, shorts, reversed, crossed, and split pairs * [6.1] [lab `wiremap-fault`]
2. Transmission failures: NEXT, return loss, insertion loss, length, and their usual causes * [6.1]
3. A troubleshooting method: isolate, test, fix, retest, document [6.1]

**Unit 8: Retrofits** (domain 7, 2 lessons)
1. Working in occupied buildings: surveys, permits, ceiling tiles, dust, tenants, cutovers * [7.1]
2. Abandoned cable: identifying it, the code removal rule, safe removal, records * [7.1]

**Unit 9: Integration and Convergence** (domain 8, 2 lessons)
1. Cabling for other building systems: paging, sound masking, clocks, nurse call, building automation, life safety, elevators * [8.1]
2. Power over the cable: PoE classes, bundle heating, wireless access points, distributed antenna systems [8.1]

Core per domain: 1 `u1l1 u1l2 u1l3 u1l4 u1l7`; 2 `u3l1 u3l2 u3l4 u3l6 u3l12 u3l14 u3l15`;
3 `u4l1 u4l3 u4l4 u4l6`; 4 `u5l1 u5l2 u5l3 u5l4 u5l6`; 5 `u6l1 u6l2`; 6 `u7l1 u7l2`; 7 `u8l1
u8l2`; 8 `u9l1 u9l2`; 9 `u2l1 u2l2`.

Every task in the handbook's content outline appears in a bracket above; the outline coverage
check in section 3 proves it by term.

### Labs (10)

Labs use the BMET lab data model (`FRA.labs`, `lab:` on the lesson, tasks of kind `reading`,
`choice`, `verdict`, a `why` per task). Each lists the tools and the steps, the common failures,
and the standard the work is judged against, and each can be done entirely on screen.

| Lab | Lesson | Instrument | What the learner does |
|---|---|---|---|
| label-run | u1l7 | choices | Read a floor plan and a labeling scheme; pick the identifiers for a room, a panel, a port, and both ends of a cable |
| cut-in-ring | u3l8 | choices | Order the steps for an old-work outlet; pick the height and the obstruction check |
| conduit-fill | u3l14 | figures | Read conduit and cable diameters; compute fill and the number of cables at the fill limit |
| firestop-pick | u3l15 | choices | Match penetrations (metal sleeve, plastic pipe, cable bundle, blank opening) to a listed method; inspect a finished seal |
| bend-tension | u4l3 | choices | Compute the minimum bend radius and the maximum pulling tension for a cable; call a planned pull pass or fail |
| jack-t568b | u5l3 | choices | Pin-by-pin T568B order on a jack and a plug; the untwist limit; the drawing of a correct and a faulty termination |
| punch-110 | u5l2 | choices | Seat order and color order on a 110 block; the right blade side; the cut |
| pair-colors | u5l4 | choices | Name the pair numbers for tip and ring colors in a 25-pair binder and the reverse |
| coax-f | u5l5 | choices | Strip dimensions, the compression sequence, a good and a bad finished connector |
| wiremap-fault | u7l1 | choices | Read four tester wiremap screens; name the fault and the fix |

**Engine change (the only one):** the `choices` panel renders an optional `scenario.svg` (a
pack-drawn jack face, 110 block, wiremap screen, conduit section, or floor plan) above its text,
and the self-test checks that any `svg` given is an `<svg>` string. The `figures` panel is used
as is.

**Kit** (optional, shown on the course Home until `label-run` is done, no affiliate links): punch
down tool with a 110 blade, Cat 6 keystone jacks, a few feet of Cat 6 cable, a cable jacket
stripper, RJ-45 plugs and a crimper, a continuity or wiremap tester, a label maker or pen. About
$50.

## 3. Content sources and verification

Content is written from the handbook outline and the writer's own knowledge, never from the
manual's wording. The term check runs in a sibling of the earlier checkers
(`scripts/termcheck_inst1.py`, reading the text dumps beside the PDFs):

1. **ITSIMM 6th edition**: its chapter titles and level-2 headings (the PDF's table of contents)
   and its glossary terms (PDF pages 934 onward) must each appear, stemmed, in some lesson, deep
   dive, or cheat-sheet text, or be logged as out of scope with a reason. Chapters on data centers,
   health care facilities, project management, air-blown fiber, OTDR detail, and fusion splicing
   are wider than INST1; misses there are reviewed, not all fixed.
2. **The handbook outline**: every task of every area appears in at least one lesson, and these
   terms must appear: TR, ER, EF, TE, bonding, busbar, cut-in ring, cavity box, poke-through,
   sleeve, core, slot, cable tray, ladder rack, J-hook, raceway, access floor, innerduct, ENT,
   firestop, smoke barrier, pull string, backbone, riser, top down, bottom up, IDC, multipair,
   four-pair, coaxial, fiber termination, pretermination, connecting hardware, wiremap,
   troubleshooting, abandoned cable, paging, sound masking, clock, nurse call, BAS, life safety,
   elevator, blueprint, labeling, site safety plan, inventory.
3. **Exam facts**: every number in the manifest, FAQ, `examDay`, and the cheat sheet's exam page
   is checked against the handbook by hand.
4. **The edition re-check list**: the plan's Status section lists every number in the pack that a
   standard or code revision could change (fill limits, bend radius multiples, pulling tension,
   untwist limits, distance limits, support spacing, PoE wattages, category frequencies, bonding
   conductor sizes, mounting heights), each with the value used and where it appears. If Blake
   later supplies the 8th edition, that list is the whole re-check.

Numbers in lessons come from current published practice or from arithmetic the lesson shows.
Local code differences (mounting heights, permits) are described as set by the authority having
jurisdiction, not given one number.

Reuse: the Network+ pack's cabling lessons and the A+ Core 1 pack's cable and tool lessons are
starting points for units 1, 5, 6, and 7, rewritten for the installer; the BMET labs file is the
pattern for the labs. Pathways, pulling, firestopping, bonding, and retrofits are new writing.

## 4. Questions, generators, cheat sheet, glossary

- **Questions** (`questions-*.js`): five per lesson, 260 total, keys balanced across A to D,
  key-longest share 19 to 26 percent, top two at most 55 percent, shortest at least 20 percent,
  every question tied to a lesson with an explanation that names the reason. Stems are jobsite
  scenarios asking for the FIRST step, the MOST likely cause, or the BEST method or material.
- **Generators** (`generators.js`): five, all arithmetic with one defensible answer:
  1. conduit fill (cable count at the fill limit, or the fill percent for a given count),
  2. bend radius (minimum radius from cable diameter and cable type, installed or under tension),
  3. pulling tension (the limit for a number of cables or a cable type),
  4. cable quantity (total length from a run list with slack, and the boxes or reels to order),
  5. 25-pair color code (pair number from tip and ring colors, or the colors from the number).
  `generatedNote` names them all. They reuse the `build()` and distractor helpers of the CIIP
  generators, and each passes a 20,000-draw edge sweep.
- **Cheat sheet** (`cheatsheet.js`): about 15 to 20 printed pages: the exam and the hands-on tasks;
  the cabling system and its distance limits; spaces; bonding; support spacing, fill, and
  separation; firestopping; cable listings; pulling limits; T568A and T568B; the 25-pair code;
  fiber types and colors; coax; test parameters and wiremap faults; labeling; safety. Printed to
  `dist/inst1-cheatsheet.pdf`.
- **Glossary** (`acronyms.js`): every acronym used in the pack, with the coverage test green.

## 5. Site and catalog

- `inst1/index.html` shell with the same engine loader list as `bmet/index.html` (instruments
  included) plus the pack files.
- Catalog: a new section "BICSI certifications" after CompTIA certifications, lede one sentence
  on the people who install building cabling, one card: pill Free, title `INST1 Academy`, one
  sentence naming the BICSI Installer 1, 52 lessons, the labs, the cheat sheet, adaptive
  tutorials, practice tests; links to the lessons, practice test, and cheat sheet pages. The
  ItemList JSON-LD gains the entry.
- `build.py`, `scripts/stage.sh`, `site/build-site.js`, `tests/` course lists, the account page,
  and the README's live-courses sentence all add `inst1`.
- The static generator produces the landing page at `/inst1/` (title, H1, intro, exam-facts table
  with the nine area weights and the BICSI fees, the FAQ with the independence statement), the
  related courses block (Network+, A+ Core 1), `/inst1/practice-test/`, `/inst1/lessons/` with the
  fifteen free lessons, `/inst1/cheatsheet/`, `/inst1/flashcards/`, and the app at `/inst1/app/`;
  the sitemap picks them up.

## 6. Tests

Existing `npm test` runs on the new pack: selftest (including labs), gating, acronym coverage,
loaders, site parity, catalog, summary, merge, gen-smoke, balance-keys, analytics. Extended:
`tests/catalog.js` expects the new section; the loaders and analytics lists take the new id; the
instruments test covers the `choices` panel's `svg`. New: the term check and the outline coverage
check run from `scripts/termcheck_inst1.py` and are recorded in the plan's Status with their
counts before the pack is called done.

## 7. Delivery order

1. This spec, committed.
2. One plan (the small engine change plus content), the CIIP task shape, executed by
   subagent-driven development on branch `inst1-academy` off `main`, cheat sheet first. Blake's
   subagent cap applies (`feedback-no-agent-fanout`): tasks run one or two at a time.
3. Merge, then `bash scripts/stage.sh` and `bash scripts/go-live.sh`, verify on the live site,
   push.

## 8. Assumptions and out of scope

- The 75 percent bar is our choice; BICSI publishes no cut score.
- The 2010 manual predates the 8th edition the exam uses; current practice governs every number,
  and the re-check list records them.
- The labs prepare the knowledge behind the hands-on tasks; they do not replace practice with real
  tools, and the course says so.
- No certificate, no new virtual instrument, no paywall change; each is its own project later.
- The ITSIMM is a personal-use reference; nothing from it is reproduced in the pack.

## Appendix: reference sources on disk (2026-11-24)

| File | What it is | Used for |
|---|---|---|
| `E:\CERT GUIDES\BICSI-INST1\BICSI-INST1_Handbook.pdf` (+ `.txt`) | BICSI Installer 1 Certificate Handbook, 2026 | exam facts, fees, the outline and weights, check 2 and 3 |
| `E:\CERT GUIDES\BICSI-INST1\ITSIMM-6.pdf` (+ `.txt`) | BICSI ITSIMM, 6th edition, 2010, 1,044 pages | check 1, content depth |
