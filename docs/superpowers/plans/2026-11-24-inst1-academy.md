# INST1 Academy: the content pack

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/inst1/`, the INST1 Academy pack for the BICSI Installer 1 written exam: cheat sheet, 52 lessons in 9 units with deep dives, 260 questions, 10 task labs, 5 generators, an acronym glossary, the course page, a new "BICSI certifications" catalog section, the reference term checks with an edition re-check list, the first build, and the deploy.

**Architecture:** A course pack is plain data: `courses/inst1/*.js` files that fill `FRA.course`, `FRA.units`, `FRA.deep`, `FRA.questions`, `FRA.labs`, `FRA.generators`, `FRA.acronyms`, `FRA.cheatsheet`. The engine renders them, the self-test and `tests/labcheck.js` validate them, `build.py` bundles them, and `site/build-site.js` writes the static pages. The only code change: the `choices` lab panel in `engine/instruments.js` draws an optional pack-supplied `scenario.svg` above its text.

**Tech Stack:** Vanilla JS packs loaded as `<script>` tags, Node 20 + jsdom tests (`npm test`), `python build.py`, PyMuPDF (`fitz`) for the reference checks, headless Chrome for the cheat sheet PDF, `scripts/stage.sh` and `scripts/go-live.sh` for the deploy.

Spec: `docs/superpowers/specs/2026-11-24-inst1-academy-design.md`.

## Global Constraints

- Course id `inst1`, name **INST1 Academy**, badge `I1`, brand FieldReady Academy. Exam: vendor `BICSI`, title `Installer 1`, code `INST1`, 75 questions, 120 minutes, `passPct: 75`, fee `$335 member, $400 nonmember; retest $135 or $200`. Practice tests: 50 questions, 55 minutes, pass 80, 3 of the last 5. Free course, 15 free lessons, 10 labs, no certificate.
- Domains (handbook outline order as ids 1 to 9) with pct and quota: 1 Field Planning, Implementation, and Design 13/6; 2 Pathways and Spaces 31/16; 3 Pulling Copper and Fiber Cable 21/11; 4 Terminating Copper and Fiber Cable 15/8; 5 Testing 6/3; 6 Troubleshooting 6/3; 7 Retrofits 3/1; 8 Integration and Convergence 3/1; 9 Codes and Standards 2/1. Percent sums to 100, quotas to 50.
- BICSI facts (verified 2026-11-24 against `E:\CERT GUIDES\BICSI-INST1\BICSI-INST1_Handbook.txt`): INST1 is a nonrenewable certificate; two parts, hands-on then written, both must be passed; hands-on is six tasks to industry standards, 20 minutes per task, pass/fail after each task, given on the last day of the IN101 class (generally Friday afternoon), one same-day retest of a single failed task at no cost, failing the same task twice or two tasks means retaking the hands-on on another date; the written exam can only be taken after passing the hands-on; written: 75 multiple-choice questions, knowledge and application, 2 hours, computer-based at Pearson; calculators and a whiteboard provided; no scheduled breaks; passing score set by standard setting (Angoff method), not published; failing candidates get a score report by topic area, not a score; no experience required; recommended: IN101 training, 50 hours of study of the ITSIMM, safety and PPE training; physical requirements: distinguish colors, manual dexterity, stand for long periods, climb ladders, lift and carry up to 50 pounds; application at least seven days before the hands-on date; fee $335 member or $400 nonmember (covers the first hands-on and written attempts); retest $135 member or $200 nonmember; virtual walk-in hands-on exam $135; one-year eligibility from the first hands-on attempt; 30-day wait between unsuccessful attempts, 90 days after a third; ID: government photo ID with signature plus a secondary ID, name matching the BICSI profile; next steps Installer 2 Copper (INSTC) and Installer 2 Optical Fiber (INSTF). Any other exam fact must be looked up in that text file, never guessed.
- The reader is a new cabling installer: an apprentice, a helper, an electrician or IT tech moving into low-voltage work. Every lesson teaches a task, a rule, or a decision that person owns on a commercial job; every question is a jobsite scenario asking for the FIRST step, the MOST likely cause, or the BEST method or material.
- Independence: the pack never claims BICSI affiliation, never uses a BICSI logo, and never reproduces BICSI exam content. The FAQ says the course is independent and not affiliated with or endorsed by BICSI.
- Blake's content rules: original content, no reference to any book, manual, guide, or source anywhere in the pack (never write "ITSIMM" in a pack file); cheat sheet first; plain words; every lesson has exactly 5 questions, a deep dive, and a checkpoint; feedback buttons come from the engine.
- Reference edition: the manual on disk is the ITSIMM 6th edition (2010); the exam uses the 8th. Write from current practice. Use these values everywhere they apply (the edition re-check list in Status records each one): horizontal permanent link 90 m (295 ft), channel 100 m (328 ft), patch and equipment cords 10 m (33 ft) total; untwist at most 13 mm (0.5 in) for Category 5e and above; pulling tension at most 110 N (25 lbf) per 4-pair cable; bend radius 4 x OD for 4-pair UTP, 10 x OD for multipair copper, optical fiber 10 x OD with no load and 20 x OD under pulling tension unless the manufacturer states otherwise; conduit fill 53 percent for one cable, 31 percent for two, 40 percent for three or more; no more than two 90-degree bends and no more than 30 m (100 ft) between pull points; conduit bend radius 6 x the inside diameter for conduit 2 in (53 mm) and smaller, 10 x above; noncontinuous supports (J-hooks) no more than 1.5 m (5 ft) apart; at least two outlets per work area; the bonding names primary bonding busbar (PBB, formerly TMGB) and secondary bonding busbar (SBB, formerly TGB), telecommunications bonding backbone (TBB), bonding conductor for telecommunications (BCT); PoE type 1 15.4 W, type 2 30 W, type 3 60 W, type 4 90 W at the source. Any other number must be found in the ITSIMM 6 text dump (`E:\CERT GUIDES\BICSI-INST1\ITSIMM-6.txt`, searched from a scratchpad Python script with `open(path, encoding="utf-8")`) and added to the re-check list in Status, or left out. Name standards without revision letters or code years where the revision matters ("the TIA-568 standard", "the NEC"). Mounting heights and permit rules are described as set by the authority having jurisdiction (AHJ).
- The longest-option rule, all three targets, per `questions-N.js` file: the key is strictly the longest option in 19 to 26 percent of questions; the key is one of the two longest in at most 55 percent; the key is the shortest in at least 20 percent. Write distractors as long and as specific as the key. Numeric questions use four bare values of one form; wrong-value reasoning goes in the explanation, never in an option.
- After any option rewrite or rebalance, re-check every key by content (the `c` index must still point at the right answer).
- Plain ASCII in every pack file and in this plan: `x` for multiply, `percent` or `%`, `in` and `ft` for inches and feet, no em dashes, no curly quotes, no degree signs (write `90-degree`), no trademark symbols. Write content files with the Write tool, never a shell heredoc (heredocs halve backslashes).
- Lesson objects keep the line format exactly, because `build.py` reads them with regexes: the first line of every lesson is `id: "uNlM", title: "...", domain: N, obj: "...", minutes: N,` (with `lab: "<id>",` appended to that same line when the lesson has a lab), then `body:` as a template literal, then `hook:`.
- The acronym test forbids a glossary entry from naming another course: in `courses/inst1/acronyms.js` entry text never write `CBET`, `CRES`, `CHTM`, `CABT`, `CIIP`, `BMET Academy`, `Network+`, `Net+`, `Security+`, `Sec+`, or `A+`.
- Work on branch `inst1-academy` off `main` in the main checkout (`E:\CERT GUIDES\COMPTIA NET+\NetPlus Academy`). Commit after every task. Tasks 2 to 7 touch only `courses/inst1/`. Subagents run one at a time (Blake's usage cap).
- Deploy (Task 10 only, after the merge): `bash scripts/stage.sh`, then `bash scripts/go-live.sh`, then the cheat sheet PDF, then `git push`. Blake authorized deploys and pushes on 2026-11-23.

## Conventions every content task follows

Read these before writing any pack file. They are the contract the tests enforce.

**Mini-markup (lesson `body`, `hook`, deep dives, lab `intro`):** `## ` heading, `- ` bullet, `1. ` step, `> ` tip line, ``` fenced block (tables; inside a JS template literal the fence is written `\`\`\``), `{{text}}` inline code, `**text**` bold. `tests/packcheck.js` requires every body to have at least 180 words, a `## ` heading, a `> ` tip line, and balanced fences; every deep dive at least 300 words with balanced fences. Every body ends with a `> Exam tip:` line.

**Curriculum file shape** (`courses/inst1/curriculum-N.js`):

```js
// INST1 Academy curriculum, units 1 to 3. Original teaching content for the BICSI Installer 1 exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Field Planning", domain: 1,
  blurb: "Safety, the cables you will handle, reading the drawings, staging the job, and labeling it so the next tech can follow it.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "The Installer's Job, the ICT Trades, and Professional Conduct", domain: 1, obj: "1", minutes: 9,
      body: `...`,
      hook: "..."
    }
  ]
});
```

`obj` is the handbook area and task the lesson serves, written `"<area>.<task>"` by the task's order within its area (area 2's sixteen tasks are `2.1` to `2.16`), or just the area number for an overview lesson. A lesson with a lab carries `lab: "<lab id>"` on its first line after `minutes`.

**Deep file shape** (`courses/inst1/deep-N.js`): `window.FRA = window.FRA || {}; FRA.deep = FRA.deep || {}; Object.assign(FRA.deep, { u1l1: \`...\`, ... })`, one key per lesson in that file's units. Fenced tables for "what to memorize"; worked examples (a fill calculation, a pull plan, a label set, a wiremap) are the house style.

**Questions file shape** (`courses/inst1/questions-N.js`): `window.FRA = window.FRA || {}; FRA.questions = FRA.questions || []; FRA.questions.push({id:"u1l1-1",t:"u1l1",q:"...",a:["...","...","...","..."],c:0,e:"..."}, ...)`. Ids `<lesson>-<n>`, n 1 to 5. Stems are jobsite scenarios, at least 20 characters; four distinct options; explanations at least 40 characters that teach the rule. No two stems share their first 70 characters. After writing a file run `node tests/balance-keys.js courses/inst1/questions-N.js`, then the three-target length check:

```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync(process.argv[1],'utf8'));const q=w.FRA.questions;let lo=0,top2=0,sh=0;q.forEach(x=>{const L=x.a.map(s=>s.length);const k=L[x.c];const s=[...L].sort((a,b)=>b-a);if(k===s[0]&&L.filter(l=>l===k).length===1)lo++;if(k>=s[1])top2++;if(k===s[3])sh++;});const p=n=>(100*n/q.length).toFixed(1)+'%';console.log(q.length+' questions; key strictly longest '+p(lo)+' (19-26); key in top two '+p(top2)+' (<=55); key shortest '+p(sh)+' (>=20)');" courses/inst1/questions-N.js
```
Expected: all three inside their bands. Fix by lengthening distractors, never by shortening keys into vagueness, then re-run `balance-keys` and re-check every key by content.

**Acronyms** (`courses/inst1/acronyms.js`): `FRA.acronyms = { "KEY": { full, tip, more } }` plus `FRA.acronymIgnore = [...]` for uppercase words that are not acronyms. `node tests/acronyms.js courses/inst1` must pass after every content task.

**Pack tools:** `node tests/packcheck.js courses/inst1`, `node tests/balance-keys.js <file>`, `node tests/acronyms.js courses/inst1`, `node tests/labcheck.js courses/inst1`, `node tests/gen-smoke.js courses/inst1 20000`. The full `npm test` only picks the pack up once `courses/inst1/course.js` exists (Task 8).

**What a lesson reads like.** Open with the installer's situation (the foreman hands you a floor plan, the conduit is already full, the inspector is coming Friday, a jack fails the tester), teach the rule in plain words with the reason behind it, show the numbers or the steps in a fenced table, say who else is involved (foreman, electrician, inspector, the AHJ, the designer), and close with what the exam asks.

**Reuse.** `courses/netplus` (cabling, connectors, testing) and `courses/aplus1` (cables, tools) are starting points to read for structure; `courses/bmet/labs-*.js` is the pattern for labs. Never copy a body; write for the installer.

## File structure

Create:
- `courses/inst1/cheatsheet.js`, `courses/inst1/acronyms.js` (Task 2; acronyms grows in every later content task).
- `courses/inst1/curriculum-1.js`, `deep-1.js`, `questions-1.js` (Task 3: units 1 to 3, 24 lessons, 120 questions).
- `courses/inst1/curriculum-2.js`, `deep-2.js`, `questions-2.js` (Task 4: units 4 and 5, 18 lessons, 90 questions).
- `courses/inst1/curriculum-3.js`, `deep-3.js`, `questions-3.js` (Task 5: units 6 to 9, 10 lessons, 50 questions).
- `courses/inst1/labs-1.js` (Task 6: ten labs).
- `courses/inst1/generators.js` (Task 7).
- `courses/inst1/course.js`, `inst1/index.html` (Task 8).
- `scripts/termcheck_inst1.py` (Task 9).

Modify:
- `engine/instruments.js`, `tests/instruments.js` (Task 1).
- `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md` (Task 8).
- This plan's Status section (Tasks 9 and 10).

---

### Task 0: Branch

- [ ] **Step 1: Create the branch from a clean main**

```bash
cd "/e/CERT GUIDES/COMPTIA NET+/NetPlus Academy"
git status --short
git checkout -b inst1-academy main
```
Expected: `git status --short` prints nothing before the checkout (if it prints files, stop and report); then `Switched to a new branch 'inst1-academy'`.

---

### Task 1: The choices panel draws a pack-supplied SVG

**Files:**
- Modify: `engine/instruments.js` (the `choices` case in the scenario checks, about line 207; `PANEL.choices`, about line 304)
- Test: `tests/instruments.js`

**Interfaces:**
- Produces: a `choices` lab scenario may carry `svg: "<svg ...>...</svg>"`; the panel renders it in `<div class="ins-drawing">` above the `<pre class="ins-text">`. A non-string `svg`, or a string without `<svg`, is a validation problem `choices svg must be an <svg> drawing`. Task 6's labs rely on this.

- [ ] **Step 1: Write the failing tests**

In `tests/instruments.js`, after the line that checks `render: choices shows its text escaped in a pre` (about line 134), add:

```js
  el.innerHTML = '';
  I.render(el, lab('choices', { text: 'Read the jack', svg: '<svg viewBox="0 0 10 10"><rect id="pin1" width="1" height="1"/></svg>' }, []), {}, {});
  check('render: choices draws its svg above the text', !!el.querySelector('.ins-drawing svg #pin1') && el.querySelector('.ins-drawing').compareDocumentPosition(el.querySelector('pre.ins-text')) === 4);
```

After the validation checks (after the line `check('validate: an id that is also an Object.prototype key is handled', ...`, about line 109), add:

```js
check('validate: a choices svg that is not an svg drawing is reported', I.validate(lab('choices', { text: 't', svg: '<div>no</div>' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { a: 'w' } })).some(p => /svg/.test(p)));
check('validate: a choices svg that is a drawing is accepted', !I.validate(lab('choices', { text: 't', svg: '<svg viewBox="0 0 1 1"></svg>' }, [{ id: 'a', kind: 'choice', prompt: 'p', options: ['x', 'y'], expect: 0 }], { why: { a: 'w' } })).some(p => /svg/.test(p)));
```

(`lab(...)` and `el` are the helpers the file already uses for its other choices checks; read the surrounding lines to confirm their names before inserting.)

- [ ] **Step 2: Run the tests to see them fail**

Run: `node tests/instruments.js 2>&1 | grep -E "FAIL|svg"`
Expected: `FAIL  render: choices draws its svg above the text` and `FAIL  validate: a choices svg that is not an svg drawing is reported`; the "is accepted" check passes already.

- [ ] **Step 3: Implement**

In `engine/instruments.js`, replace the `choices` case in the scenario checks:

```js
      case 'choices':
        if (typeof sc.text !== 'string' || !sc.text.trim()) p('choices scenario needs text');
        if (sc.svg != null && (typeof sc.svg !== 'string' || !/<svg\b/i.test(sc.svg))) p('choices svg must be an <svg> drawing');
        break;
```

Replace `PANEL.choices`:

```js
  // A choices lab may show a pack-drawn picture (a jack face, a punch block, a tester screen) above its text. The svg is
  // pack content, trusted like the dmm circuit drawings; the text is escaped.
  PANEL.choices = lab => { const sc = obj(lab.scenario); return `${typeof sc.svg === 'string' ? `<div class="ins-drawing">${sc.svg}</div>` : ''}<pre class="ins-text">${esc(sc.text || '')}</pre>`; };
```

- [ ] **Step 4: Run the tests to see them pass**

Run: `node tests/instruments.js 2>&1 | tail -2` and `node tests/labcheck.js courses/bmet`
Expected: every instruments check passes; `labcheck: OK` for bmet (its `ping-walkthrough` choices lab has no svg and is unaffected).

- [ ] **Step 5: Commit**

```bash
git add engine/instruments.js tests/instruments.js
git commit -m "feat(engine): choices labs can show a pack-drawn svg above their text"
```

---

### Task 2: Cheat sheet and the first acronym glossary

Blake's rule: the cheat sheet comes before any lesson. Target 15 to 20 printed pages (roughly 450 to 600 lines of source).

**Files:**
- Create: `courses/inst1/cheatsheet.js`, `courses/inst1/acronyms.js`

**Interfaces:**
- Produces: `FRA.cheatsheet = { title, intro, sections: [{ id, title, blocks: [{ type: "table", cols, rows } | { type: "list", title, cols: 2, items } | { type: "note", text }] }] }` and `FRA.acronyms` + `FRA.acronymIgnore`. Later tasks never rename these section ids.

- [ ] **Step 1: Write `courses/inst1/cheatsheet.js`**

```js
// INST1 Academy memorization sheet for the BICSI Installer 1 exam. The cabling system, spaces, bonding, pathways,
// firestopping, cable listings, pulling limits, termination color codes, testing, labeling, and safety an entry-level
// installer must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "INST1 Memorization Sheet",
  intro: "Print this and keep it in your tool bag. The Installer 1 written exam rewards recall of the cabling system's parts and distances, the rules for spaces, pathways, bonding, and firestop, the limits on every pull, the color codes, and what a tester is telling you. Every name and number on this sheet is fair game.",
  sections: [ ... ]
};
```

Sections, in this order, with the rows each must contain (add more freely; never fewer; every number from the Global Constraints values or the ITSIMM 6 dump, and each new number goes on the re-check list):

1. `exam` "The exam itself": a facts table (two parts, hands-on first; six hands-on tasks, 20 minutes each, pass/fail per task, one same-day retest; written 75 questions, 2 hours, Pearson, knowledge and application, calculator and whiteboard provided, no scheduled breaks; cut score set by expert panel, not published; fee $335 member, $400 nonmember; retest $135 or $200; 30-day wait, 90 days after a third failure; one-year eligibility; nonrenewable; next steps INSTC and INSTF); the nine areas with weights; a `note`: "This course's official-format test uses 75 percent. BICSI does not publish its passing score, so treat 75 percent as a target, not a prediction."
2. `system` "The cabling system": subsystems table (work area, horizontal cabling, telecom room or enclosure, backbone, equipment room, entrance facility, and what each holds); topology (hierarchical star, one cross-connect level in horizontal, at most two in backbone); distances table (permanent link 90 m, channel 100 m, cords 10 m total; multimode and singlemode backbone distances only as the ITSIMM 6 dump gives them); the work area (two outlets minimum, one per 10 square meters or 100 square feet as a planning figure).
3. `media` "Copper, fiber, and coax": twisted-pair table (Category 5e, 6, 6A with their rated frequency 100, 250, 500 MHz; UTP, F/UTP, S/FTP; 23 and 24 AWG; solid versus stranded); multipair (25-pair binders); fiber table (multimode OM1 to OM5 with core 62.5 or 50 micron and jacket colors as the dump gives them, singlemode OS1 and OS2 core about 9 micron, yellow jacket; tight buffer versus loose tube; 250 and 900 micron coatings); fiber color code table (the 12 colors in order: blue, orange, green, brown, slate, white, red, black, yellow, violet, rose, aqua); coax table (RG-6, RG-59, RG-11 and their uses; 75 ohm video, 50 ohm radio).
4. `codes` "Codes, listings, and standards": codes versus standards; the AHJ; the cable listing table (CMP plenum, CMR riser, CMG and CM general, CMX limited; OFNP, OFNR, OFN, OFCP, OFCR; CATVP, CATVR, CATV; where each may go) and the substitution hierarchy (a higher rating may replace a lower one); the standards families table (TIA-568 cabling, TIA-569 pathways and spaces, TIA-606 administration, TIA-607 bonding, TIA-758 outside plant at recognition level; ISO/IEC 11801 internationally; NFPA 70 the NEC; NFPA 72 fire alarm at recognition level); listing marks (NRTL such as UL).
5. `spaces` "Telecom spaces and bonding": spaces table (TR, ER, EF, TE: what each serves, one TR per floor at least, the 90 m reach rule, environment, lighting, power, door, no water pipes or unrelated equipment, plywood backboard fire-rated or painted with fire-retardant paint as the dump gives it); racks table (anchoring, clearances front and rear as the dump gives them, vertical and horizontal managers); bonding table (PBB formerly TMGB, SBB formerly TGB, TBB, BCT, rack bonding conductor, the bonding conductor sizes only as the dump gives them, green or green-with-yellow jacket, compression lugs two-hole, clean the surface, no daisy-chaining racks); a `note` on the old and new names.
6. `pathways` "Pathways": conduit table (fill 53/31/40 percent; two 90-degree bends and 30 m between pull points; pull box rules; bend radius 6 x and 10 x ID; reaming and bushings; pull string left in); EMT trade sizes and inside diameters (1/2 0.622 in, 3/4 0.824, 1 1.049, 1-1/4 1.380, 1-1/2 1.610, 2 2.067); fill formula (fill percent = number of cables x cable OD squared / conduit ID squared x 100); tray and ladder rack table (support spacing and fill depth only as the dump gives them, bonding of sections); J-hook table (1.5 m maximum spacing, sag, no attachment to ceiling grid wires or other trades' supports, independent support); separation from power and EMI sources (as the dump gives them, flagged); outlets table (box sizes, rings and cut-in rings, poke-throughs are fire-rated assemblies, floor boxes, furniture feeds, mounting height set by the AHJ); sleeves, cores, and slots (spare capacity, firestop every one).
7. `firestop` "Firestopping": what a firestop system is (a listed system tested for that penetration in that wall or floor); F rating and T rating; the listing number format at recognition level; mechanical versus nonmechanical (caulk, putty, pillows, collars, wraps, devices); rules (restore the rating, match the listed system exactly, label it, inspect it, reseal after any change); smoke barriers.
8. `pulling` "Pulling cable": setup table (reel stands, sheaves, pull string or rope, grips and eyes, communication, the pull schedule); limits table (110 N or 25 lbf per 4-pair cable; bend radius 4 x, 10 x, fiber 10 x and 20 x; no kinks, no crush, no exceeding the fill; lubricant only if listed for the cable); riser table (top-down with brakes and support at each floor; bottom-up with a winch, swivel, and tension monitoring); slack table (service loop and slack lengths only as the dump gives them); fiber handling (pull on the strength member, figure-eight to avoid twist, innerduct).
9. `termination` "Termination": pretermination steps; T568A and T568B pin tables (A: 1 white-green, 2 green, 3 white-orange, 4 blue, 5 white-blue, 6 orange, 7 white-brown, 8 brown; B: 1 white-orange, 2 orange, 3 white-green, 4 blue, 5 white-blue, 6 green, 7 white-brown, 8 brown); the one-standard-per-job rule; untwist 13 mm; the 25-pair code table (tip white, red, black, yellow, violet; ring blue, orange, green, brown, slate; pair n tip = group (n minus 1) / 5, ring = (n minus 1) mod 5); 110 and 66 blocks; coax (F and BNC, compression, center conductor length as the dump gives it); fiber connectors (LC, SC, ST, MPO; UPC blue, APC green; inspect before you connect; cleaning).
10. `testing` "Testing and troubleshooting": permanent link versus channel; parameters table (wiremap, length, insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew; what each measures in plain words); wiremap faults table (open, short, reversed pair, crossed pair, split pair, and the usual cause and fix of each); tester table (set the reference, choose the right limit and cable type, autotest, save with the label as the name, PASS, FAIL, and the marginal asterisk); fiber loss basics (light source and power meter, OTDR at recognition level).
11. `job` "Safety, labeling, retrofits, and other systems": safety table (site safety plan, PPE, ladders, lifts, lockout and tagout, confined spaces, silica dust, asbestos stop-work rule, laser safety with fiber, first aid); labeling table (identifiers for spaces, cables, panels, ports, pathways, and bonding conductors; both ends; within a set distance of the end as the dump gives it; machine printed; the records); retrofits list (survey, protect the occupied space, ceiling tiles, abandoned cable removal under the NEC unless tagged for future use, cutover steps); other systems list (paging, sound masking, clocks, nurse call, building automation, life safety and fire alarm, elevators, access control, video surveillance, wireless access points, DAS); PoE table (types 1 to 4 with watts; bundle heating).

- [ ] **Step 2: Load the sheet in jsdom and check its shape**

Run:
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/inst1/cheatsheet.js','utf8'));const cs=w.FRA.cheatsheet;const ids=cs.sections.map(s=>s.id);console.log(ids.join(','));let rows=0,bad=0;cs.sections.forEach(s=>s.blocks.forEach(b=>{if(b.type==='table'){b.rows.forEach(r=>{rows++;if(r.length!==b.cols.length)bad++;});}else if(b.type==='list'){rows+=b.items.length;}else if(b.type!=='note'){bad++;}}));console.log('rows',rows,'bad',bad);"
```
Expected: `exam,system,media,codes,spaces,pathways,firestop,pulling,termination,testing,job` and `bad 0` with `rows` above 240.

- [ ] **Step 3: Write `courses/inst1/acronyms.js` covering the sheet**

```js
// INST1 Academy acronym glossary. Every acronym used in the lessons, deep dives, labs, cheat sheet, and questions.
// Rendered by the engine as hover links and as the cheat sheet's Acronyms section. Keys match whole words,
// case-sensitive, plurals allowed. Original wording. Fields: full, tip (one sentence), more (longer; blank line = paragraph).
window.FRA = window.FRA || {};
FRA.acronyms = {
  "BICSI": { full: "Building Industry Consulting Service International", tip: "The association that runs the Installer 1, Installer 2, Technician, and RCDD credentials.", more: "Today the organization goes by the letters alone. Its Installer 1 certificate is the entry point to its installation pathway." },
  "INST1": { full: "Installer 1", tip: "BICSI's entry-level installation certificate: a six-task hands-on exam, then a 75-question written exam.", more: "Nonrenewable. Holders move on to Installer 2 Copper or Installer 2 Optical Fiber." },
  "TR": { full: "Telecommunications Room", tip: "The room on each floor where horizontal cabling ends on patch panels.", more: "At least one per floor, close enough that no horizontal run passes 90 m." },
  ...
};
FRA.acronymIgnore = ["BEST", "FIRST", "LEAST", "MOST", "NOT", "OK", "ON", "OFF", "PASS", "FAIL", "II", "III", "IV"];
```

Run `node tests/acronyms.js courses/inst1`; add a key for every `missing:` line until it passes. Expected keys at this point include at least: BICSI, INST1, INSTC, INSTF, RCDD, ICT, ITS, SCS, TR, ER, EF, TE, WA, MC, HC, IC, TIA, ISO, IEC, NEC, NFPA, AHJ, NRTL, UL, OSHA, PPE, UTP, FTP, STP, AWG, OD, ID, EMT, ENT, PVC, EMI, RFI, PBB, SBB, TMGB, TGB, TBB, BCT, CMP, CMR, CMG, CM, CMX, OFNP, OFNR, OFN, OFCP, OFCR, CATV, CATVP, CATVR, IDC, LC, SC, ST, MPO, UPC, APC, OM1, OM2, OM3, OM4, OM5, OS1, OS2, NEXT, PSNEXT, FEXT, RL, IL, OTDR, OLTS, PoE, PSE, PD, AP, DAS, BAS, MHz, LED.

- [ ] **Step 4: Verify and commit**

Run: `node tests/acronyms.js courses/inst1 2>&1 | tail -2`
Expected: the pass line for `inst1` with no `missing:` or `unused` lines.

```bash
git add courses/inst1/cheatsheet.js courses/inst1/acronyms.js
git commit -m "feat(inst1): memorization sheet for the Installer 1 and the first acronym glossary"
```

---

### Task 3: Units 1 to 3 (24 lessons, 120 questions)

**Files:**
- Create: `courses/inst1/curriculum-1.js`, `courses/inst1/deep-1.js`, `courses/inst1/questions-1.js`
- Modify: `courses/inst1/acronyms.js`

**Interfaces:**
- Consumes: the Conventions; the cheat sheet's `system`, `media`, `codes`, `spaces`, `pathways`, `firestop`, and `job` sections (every number and name agrees).
- Produces: units `u1` (domain 1), `u2` (domain 9), `u3` (domain 2). Lessons `u1l7`, `u3l8`, `u3l14`, `u3l15` carry `lab: "label-run"`, `"cut-in-ring"`, `"conduit-fill"`, `"firestop-pick"`; Task 6 defines those labs. Task 8's manifest lists these ids; do not rename them.

- [ ] **Step 1: Baseline**

Run: `node tests/packcheck.js courses/inst1`
Expected: `inst1: 0 units, 0 lessons ... cheatsheet yes` then `packcheck: OK`.

- [ ] **Step 2: Write `courses/inst1/curriculum-1.js`**

Each "covers" list is the minimum the body teaches; the handbook's own task words appear in plain text so Task 9 finds them. Until Task 6 lands, `labcheck` reports the four lab ids as undefined; that is expected and Task 6 closes it.

**Unit u1 "Field Planning"** (domain 1; blurb: safety, the cables you will handle, the drawings, staging the job, and labeling it; assumes nothing)
- u1l1 `The Installer's Job, the ICT Trades, and Professional Conduct` (obj "1", 9). Covers: what an ICT cabling installer does on a commercial job; the trades around you (electricians, fire alarm, HVAC, general contractor) and who to ask; the foreman, the designer, the inspector; professional conduct (neat and workmanlike work, clean up daily, respect the occupied space, never cover another trade's work); the installation pathway from Installer 1 to Installer 2 and Technician.
- u1l2 `Jobsite Safety: the Safety Plan, Hazards, PPE, Ladders and Lifts, Lockout` (obj "1.5", 11). Covers: verify and comply with the site safety plan; the job hazard review; PPE (hard hat, eye protection, gloves, hearing, high-visibility vest, safety-toe boots, respirators for dust); ladders (the 4-to-1 rule, three points of contact, extend above the landing as the dump gives it, never the top step); lifts and fall protection at recognition level; lockout and tagout and why installers never work energized power; asbestos stop-work rule; silica dust from coring; fiber shards and laser light; first aid and reporting.
- u1l3 `Copper Cable: Categories, UTP and Shielded, Conductor Size, Multipair, Coax` (obj "1.1", 10). Covers: identify and distinguish properties and types of copper cable; twisted pair and why the twists matter; Category 5e, 6, 6A and their frequency ratings; UTP versus F/UTP and S/FTP; 23 and 24 AWG solid for horizontal, stranded for cords; multipair backbone cable and 25-pair binders; reading the jacket print (category, listing, AWG, footage marks); coax types and uses.
- u1l4 `Optical Fiber: Multimode and Singlemode, Buffers, Jackets, and the Color Code` (obj "1.2", 10). Covers: identify and distinguish properties and types of fiber; core, cladding, coating; multimode OM1 to OM5 and singlemode OS1 and OS2; typical jacket colors; tight buffer versus loose tube; indoor, outdoor, and indoor-outdoor cable; armored and interlocking armor (bonded); the 12-color fiber code and buffer-tube numbering.
- u1l5 `Reading Blueprints: Symbols, Scales, Legends, Floor Plans, Riser Diagrams` (obj "1.3", 10). Covers: interpret blueprints; the title block, revision, legend, and general notes; architectural, engineering, and metric scales; telecom symbols for outlets and their counts, pathways, TRs; floor plans, reflected ceiling plans, riser diagrams, details, and schedules; finding the outlet IDs; when the drawing and the field disagree (stop and ask, document the change).
- u1l6 `Tools, Materials, and the Job Inventory` (obj "1.4", 9). Covers: inventory job supplies and materials; the materials list against the drawings; checking deliveries (part numbers, category, listing, quantity, damage); staging in the space; installer hand tools (strippers, punch-down tool, crimper, fish tape, ladder, label maker, cable tester) and their care; tracking reel footage.
- u1l7 `Labeling and Administration: Identifiers, Placement, and Records` (obj "1.6", 11, lab "label-run"). Covers: perform labeling according to a labeling scheme; why administration matters; identifiers for spaces, panels, ports, cables, pathways, and bonding conductors in one consistent scheme (a TR identifier, a panel and port identifier, a cable identifier that names both ends); both ends labeled; label placement and machine-printed durable labels; the four administration classes at recognition level; records and as-built drawings.

**Unit u2 "Codes and Standards"** (domain 9; blurb: who writes the rules and the fire ratings that decide which cable may go where; assumes unit 1)
- u2l1 `Who Writes the Rules: Codes, Standards, the AHJ, and Listing` (obj "9.1", 10). Covers: adhere to local, state, and federal fire and building codes and standards; a code is law once adopted, a standard is a consensus document a contract makes binding; the AHJ and the inspector; the NEC, the building and fire codes, OSHA; the TIA standard families and ISO/IEC 11801 in plain words; listing and labeling by an NRTL; local codes may be stricter.
- u2l2 `Cable Listings and Fire Ratings: Plenum, Riser, General Purpose, Limited` (obj "9.1", 10). Covers: plenum spaces and why they matter; CMP, CMR, CMG or CM, CMX and the optical and CATV equivalents; the substitution hierarchy; where each may be installed; reading the listing on the jacket; what an inspector checks.

**Unit u3 "Pathways and Spaces"** (domain 2; blurb: the rooms, the bonding, the outlets, the supports, the conduit, and the firestop that every cable depends on; assumes units 1 and 2)
- u3l1 `The Structured Cabling System: Subsystems, Topology, Distances` (obj "2", 10). Covers: horizontal cabling, backbone, work area, telecom room, equipment room, entrance facility; the hierarchical star; cross-connects and interconnects; the 90 m, 100 m, and 10 m limits; consolidation points at recognition level.
- u3l2 `Telecommunications Spaces: TR, ER, EF, and TE` (obj "2.1", 11). Covers: build telecommunication spaces; what each space serves; location rules (one TR per floor at least, the reach rule); environment (HVAC, lighting, power outlets on dedicated circuits as the dump gives it, door, floor loading); what must not be in the room; the plywood backboard; telecom enclosures for small zones.
- u3l3 `Racks and Cabinets: Anchoring, Clearances, Cable Management` (obj "2.1", 9). Covers: two-post and four-post racks, cabinets, wall mounts; anchoring to the floor and bracing; front and rear clearances; vertical and horizontal cable managers; rack units; power strips; bonding the rack.
- u3l4 `Bonding and Grounding: PBB, SBB, TBB, BCT, and What Gets Bonded` (obj "2.2", 11). Covers: install bonding infrastructure; why telecom bonding exists (equalize potential, a path for fault and surge current); grounding versus bonding; the BCT from the electrical service to the PBB; the TBB linking SBBs on each floor; the old names TMGB and TGB; what gets bonded (racks, cable tray, shields, armored cable, the entrance protector); never use the water pipe as the telecom ground path on its own.
- u3l5 `Making the Bond: Lugs, Connectors, Routing, Labels, Checks` (obj "2.2", 9). Covers: compression lugs, two-hole lugs on busbars, cleaning and antioxidant; routing bonding conductors with no sharp bends and the shortest path; no daisy-chaining rack to rack; labeling bonding conductors; a visual and continuity check; who verifies resistance (the electrician or the testing tech).
- u3l6 `Cable Support Systems: Choosing a Pathway, EMI, and Separation` (obj "2.3", 10). Covers: install cable support systems; conduit, cable tray, ladder rack, wire mesh basket, J-hooks and rings, raceway, and when each fits; continuous versus noncontinuous support; EMI sources (motors, transformers, fluorescent fixtures, power cables) and separation in plain words; never use ceiling grid wires, sprinkler pipes, or other trades' supports.
- u3l7 `The Outlet at the Wall: Boxes, Rings, Heights, Box Fill` (obj "2.4", 9). Covers: prepare telecommunication outlet at wall; single-gang and double-gang boxes, deep boxes for Category 6A bend radius; mud rings and low-voltage brackets; mounting height set by the AHJ and accessibility rules; conduit stub-ups to the ceiling; faceplates and blanks.
- u3l8 `Cut-In Rings and Old Work: Finding Studs, Cutting, Securing` (obj "2.5", 9, lab "cut-in-ring"). Covers: install cut-in rings (cavity box); locate studs and obstructions (stud finder, look above the ceiling, check for power in the cavity); mark level, cut, drop the string, set the ring; fire-rated walls need a listed box; clean up dust.
- u3l9 `Floor Outlets, Poke-Throughs, and Access Floors` (obj "2.6", 10). Covers: prepare telecommunication outlet at floor; install poke throughs (a fire-rated device that keeps the floor's rating); floor boxes and in-slab conduit; install cable support systems under the floor (access floor pedestals, cable trays under the floor, separation, keeping airflow clear).
- u3l10 `Utility Columns, Modular Furniture, Ceilings, and Special Locations` (obj "2.7", 9). Covers: prepare telecommunication outlet at utility column and/or modular furniture; furniture raceway feeds and the bend-radius trap; prepare telecommunication outlet at other locations (ceilings for wireless access points and cameras, hazardous locations with listed fittings, wet and exterior locations with weatherproof boxes and drip loops).
- u3l11 `Sleeves, Cores, and Slots` (obj "2.9", 9). Covers: install sleeves, cores, and slots; sizing and spare capacity; coring safety (scan the slab first, water, silica dust); placing sleeves through walls and floors; bushings; every one firestopped after cabling.
- u3l12 `Trays and Ladder Rack: Assembly, Support, Bonding, Fill` (obj "2.11", 10). Covers: install cable trays, ladder racks, and continuous cable support systems; tray types (ladder, solid bottom, wire mesh, center spine); assembly and splice plates; support spacing as the dump gives it; bonding each section; fill depth; transitions and drop-outs that protect bend radius; ladder rack in the TR.
- u3l13 `J-Hooks, Rings, and Other Noncontinuous Supports` (obj "2.12", 9). Covers: install noncontinuous cable supports; J-hooks and bridle rings; maximum 1.5 m spacing; varying the spacing slightly to avoid repeating patterns; sag; load capacity per hook; independent support rods; keeping clear of lights and sprinkler heads.
- u3l14 `Conduit, Raceway, and Innerduct: Fill, Pull Points, Bends` (obj "2.13", 11, lab "conduit-fill"). Covers: install raceways; conduit fill 53, 31, and 40 percent and the fill formula worked once; two 90-degree bends and 30 m between pull points; pull boxes (sized and placed for straight-through pulls); bend radius of conduit; reaming and bushings; surface raceway and its fittings; install inner duct for fiber (ENT) and its listing.
- u3l15 `Firestopping and Smoke Barriers: Listed Systems, Methods, Inspection` (obj "2.16", 11, lab "firestop-pick"). Covers: install firestop and/or smoke barrier system; fire-rated assemblies and why every penetration breaks the rating; listed firestop systems matched to the wall or floor, the penetrant, and the opening; F and T ratings; mechanical (devices, sleeves with built-in firestop, pillows) and nonmechanical (sealant, putty, wraps, collars) methods; install exactly as the listing says; label, inspect, and reseal after any added cable.

- [ ] **Step 3: Write `courses/inst1/deep-1.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u1l5 a blueprint legend decoded and an outlet count from a sample floor; u1l7 a full label set for one cable from TR to outlet; u2l2 a listing table with three where-may-it-go cases; u3l1 a distance budget for a channel; u3l4 a bonding layout for a three-floor building; u3l12 a tray fill example; u3l14 a conduit fill worked twice (count at the limit, and the fill percent for a given count) using 1 in EMT (ID 1.049 in) and 0.25 in cable; u3l15 a penetration-to-method table.

- [ ] **Step 4: Write `courses/inst1/questions-1.js`** (5 per lesson, 120 total)

Jobsite scenarios. Then `node tests/balance-keys.js courses/inst1/questions-1.js` and the three-target length check.

- [ ] **Step 5: Validate and commit**

```bash
node tests/packcheck.js courses/inst1 && node tests/acronyms.js courses/inst1 2>&1 | tail -2
git add courses/inst1/curriculum-1.js courses/inst1/deep-1.js courses/inst1/questions-1.js courses/inst1/acronyms.js
git commit -m "feat(inst1): units 1 to 3: field planning, codes and standards, pathways and spaces"
```
Expected before the commit: `packcheck: OK` with 3 units, 24 lessons, 120 questions, and all three length targets inside their bands.

---

### Task 4: Units 4 and 5 (18 lessons, 90 questions)

**Files:**
- Create: `courses/inst1/curriculum-2.js`, `courses/inst1/deep-2.js`, `courses/inst1/questions-2.js`
- Modify: `courses/inst1/acronyms.js`

**Interfaces:**
- Consumes: the Conventions; the cheat sheet's `pulling`, `media`, and `termination` sections.
- Produces: units `u4` (domain 3) and `u5` (domain 4). Lessons `u4l3`, `u5l2`, `u5l3`, `u5l4`, `u5l5` carry `lab: "bend-tension"`, `"punch-110"`, `"jack-t568b"`, `"pair-colors"`, `"coax-f"`. Generators in Task 7 hang on `u3l14`, `u4l3`, `u4l1`, and `u5l4`; those lessons must state the conventions Task 7 lists.

- [ ] **Step 1: Write `courses/inst1/curriculum-2.js`**

**Unit u4 "Pulling Cable"** (domain 3; blurb: setting up a pull, the limits no pull may break, and pulling horizontal, backbone, and fiber without damage; assumes unit 3)
- u4l1 `Pull Planning and Setup: Reels, Sheaves, the Pull Schedule` (obj "3.1", 10). Covers: perform cable pulling setup; the pull schedule (each cable's ID, from, to, length, and pathway); reel stands and spool trees; setting up at the feed end; sheaves and rollers at corners; manpower and radios; protecting the cable at the pathway entry; measuring and recording footage; estimating cable from a run list (runs per box, whole runs only, slack at both ends), which the cable-quantity generator uses.
- u4l2 `Pull String and Rope: Fish Tape, Rods, Blown Line` (obj "3.2", 9). Covers: install pull string or rope in conduit; fish tapes (steel, fiberglass, never near energized power), glow rods and push rods, vacuum or blown line with a piston or mouse; measuring tape-style pull line; tying off at both ends; always leave a new pull string in after the pull.
- u4l3 `The Limits on Every Pull: Tension, Bend Radius, Crush, Twist` (obj "3.1", 11, lab "bend-tension"). Covers: 110 N or 25 lbf per 4-pair cable and why it is per cable; bend radius under tension and after installation (4 x UTP, 10 x multipair, fiber 10 x and 20 x); crush from over-tight ties (hook-and-loop ties, never cinch); twist and kinks; lubricant listed for the cable; tension meters and breakaway swivels.
- u4l4 `Horizontal Cable in Conduit: Grips, Feeding, Pull Boxes` (obj "3.3", 10). Covers: pull horizontal telecommunication outlet cable (conduit); making up the cable bundle and the basket grip or tape-and-loop end; feeding without kinks; pull boxes as feed points, never as bend points; pulling to the outlet and to the TR; leaving slack; recording.
- u4l5 `Horizontal Cable in Open Ceilings: Hooks, Bundles, Plenum Rules` (obj "3.4", 10). Covers: pull horizontal telecommunication outlet cable in open ceiling; laying in J-hooks rather than dragging; bundle sizes per hook; keeping clear of lights, ballasts, sprinklers, and access panels; plenum-rated cable in air-handling spaces; securing the drop to the outlet.
- u4l6 `Backbone Riser From the Top Down: Hoisting, Brakes, Support` (obj "3.5", 10). Covers: pull backbone-riser from top down; why top-down lets gravity help; reel at the top with a brake; controlling descent; securing and supporting the cable at each floor (split-mesh grips, clamps); sleeve protection; communication between floors.
- u4l7 `Backbone Riser From the Bottom Up: Winches, Swivels, Tension` (obj "3.6", 10). Covers: pull backbone-riser from bottom up; when bottom-up is required; winch or capstan at the top; pulling eye or grip and a swivel; monitoring tension against the manufacturer's limit; supporting at each floor before releasing tension.
- u4l8 `Horizontal Backbone Between Rooms and Buildings` (obj "3.7", 9). Covers: pull backbone-horizontal backbone; between TRs on one floor and between buildings through the entrance facility; outdoor-rated cable and the transition to indoor cable within the distance the NEC allows (described in plain words); innerduct; pull boxes and manholes at recognition level.
- u4l9 `Pulling Optical Fiber: Strength Members, Tension, Figure-Eight` (obj "3.1", 10). Covers: pull on the strength members (aramid yarn) never the fibers; the manufacturer's tension rating; fiber bend radius; figure-eight storage to avoid twist on long pulls; pulling in innerduct; protecting the ends (pulling eyes, pre-terminated cable sleeves).
- u4l10 `Slack, Service Loops, and Dressing the Pull Into the Room` (obj "3.3", 9). Covers: slack at the TR and at the outlet (as the dump gives the lengths); service loops in the ceiling and on the ladder rack; dressing cable neatly into racks; leaving the area clean; protecting cable ends until termination.

**Unit u5 "Termination"** (domain 4; blurb: preparing cable, choosing hardware, and terminating four-pair, multipair, coax, and fiber to the standard; assumes unit 4)
- u5l1 `Pretermination: Sheath Removal, Pair Handling, Untwist Limits` (obj "4.1", 10). Covers: perform pre-termination functions; dress and route to the termination point; cut to length with the slack plan; remove the jacket without nicking conductors; rip cord; keep pairs twisted to within 13 mm; do not strip insulation for IDC; shielded cable drain and foil handling (pointing to u5l8).
- u5l2 `Connecting Hardware: Jacks, Panels, 110 and 66 Blocks` (obj "4.2", 10, lab "punch-110"). Covers: install correct connecting hardware for copper and fiber terminations; matching the category of every component; keystone jacks, patch panels, 110 blocks, 66 blocks, and where each belongs; fiber panels, adapters, and cassettes; 110 punch-down order and seating with the 110 blade, cutting side out.
- u5l3 `Four-Pair Termination: T568A and T568B on Jacks, Panels, and Plugs` (obj "4.4", 11, lab "jack-t568b"). Covers: perform copper IDC termination (four-pair); the T568A and T568B pin tables; one scheme per job; the color-coded jack label; seating each conductor; cap and tool; plugs and crimping for field cords at recognition level; straight-through and crossover as consequences.
- u5l4 `Multipair Termination: the 25-Pair Code, Binders, 66 and 110 Blocks` (obj "4.3", 11, lab "pair-colors"). Covers: perform copper IDC termination (multi-pair); the 25-pair code (tip white, red, black, yellow, violet; ring blue, orange, green, brown, slate), pair number from colors and back, which the pair-number generator uses; binder groups of 25 with their binder colors; terminating in order on 66 and 110 blocks; bridging clips at recognition level.
- u5l5 `Coaxial Termination: F and BNC, Compression Fittings, Strip Dimensions` (obj "4.5", 10, lab "coax-f"). Covers: perform coaxial termination; RG-6, RG-59, RG-11 and their uses; the strip tool and the strip dimensions as the dump gives them; folding the braid; compression connectors versus crimp and twist-on (and why twist-on fails); center conductor length; inspecting the finished connector.
- u5l6 `Optical Fiber Connectors and Termination Methods` (obj "4.6", 10). Covers: perform fiber termination; LC, SC, ST, MPO; UPC and APC end faces and the color convention; field-polished, mechanical (prepolished splice-on), and fusion-spliced pigtails at recognition level; fiber panels and polarity in plain words; safety with fiber shards (disposal container, no food).
- u5l7 `Inspecting and Cleaning Fiber End Faces` (obj "4.6", 9). Covers: inspect before you connect; inspection scopes and the laser-safety rule; dry cleaning and wet-to-dry cleaning; one-click cleaners; dust caps; contamination as the most common fiber fault.
- u5l8 `Shielded Cabling: Drain Wires, Shield Continuity, Bonding at the Panel` (obj "4.2", 9). Covers: F/UTP and S/FTP construction; shielded jacks and panels; terminating the drain wire and foil; shield continuity end to end; bonding the panel and rack; a broken shield as an antenna.

- [ ] **Step 2: Write `courses/inst1/deep-2.js`**

One deep dive per lesson above, each at least 300 words with a fenced table and a worked example: u4l1 a pull schedule for six cables and a box count; u4l3 bend radius and tension worked for a 0.25 in UTP, a 1.0 in multipair, and a 0.5 in fiber cable, and a pull of 12 cables; u4l6 a top-down riser plan; u5l3 both pin tables side by side; u5l4 the full 25-pair table; u5l5 a good and a bad connector compared.

- [ ] **Step 3: Write `courses/inst1/questions-2.js`** (5 per lesson, 90 total)

Jobsite scenarios. Arithmetic questions use clean numbers with the arithmetic in the explanation. Then `balance-keys` and the three-target length check.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/inst1 && node tests/acronyms.js courses/inst1 2>&1 | tail -2
git add courses/inst1/curriculum-2.js courses/inst1/deep-2.js courses/inst1/questions-2.js courses/inst1/acronyms.js
git commit -m "feat(inst1): units 4 and 5: pulling cable and termination"
```
Expected before the commit: `packcheck: OK` with 5 units, 42 lessons, 210 questions.

---

### Task 5: Units 6 to 9 (10 lessons, 50 questions)

**Files:**
- Create: `courses/inst1/curriculum-3.js`, `courses/inst1/deep-3.js`, `courses/inst1/questions-3.js`
- Modify: `courses/inst1/acronyms.js`

**Interfaces:**
- Consumes: the Conventions; the cheat sheet's `testing` and `job` sections.
- Produces: units `u6` (domain 5), `u7` (domain 6), `u8` (domain 7), `u9` (domain 8). Lesson `u7l1` carries `lab: "wiremap-fault"`.

- [ ] **Step 1: Write `courses/inst1/curriculum-3.js`**

**Unit u6 "Testing"** (domain 5; blurb: what is tested, what each number means, and how to run the tester; assumes unit 5)
- u6l1 `Permanent Link and Channel: What Each Includes and When to Test It` (obj "5.1", 10). Covers: perform copper cable testing; the permanent link (panel to outlet, 90 m) and the channel (with cords, 100 m); which adapters each test uses; testing the installed link before cords exist; certification versus verification versus qualification testers in plain words.
- u6l2 `Test Parameters: Wiremap, Length, Insertion Loss, NEXT, Return Loss, Margin` (obj "5.1", 11). Covers: wiremap; length and NVP; insertion loss; NEXT and PSNEXT; ACR-F; return loss; propagation delay and delay skew; what pass margin means; the worst case reported.
- u6l3 `Running the Tester: Reference, Limits, Autotest, Saving Results` (obj "5.1", 10). Covers: charge and set the reference; calibration date; choose the right limit (category, permanent link or channel) and cable type; autotest; save with the cable label as the name; the marginal pass; exporting results for the closeout package; fiber loss testing basics (light source and power meter, OTDR at recognition level).

**Unit u7 "Troubleshooting"** (domain 6; blurb: reading a failing test and fixing the cause; assumes unit 6)
- u7l1 `Wiremap Faults: Opens, Shorts, Reversed, Crossed, Split Pairs` (obj "6.1", 11, lab "wiremap-fault"). Covers: perform copper cable troubleshooting; each fault, what the tester screen shows, its usual cause (a missed or poorly seated conductor, a nicked jacket, A on one end and B on the other, a split pair from wrong pairing), and the fix (reterminate, retest).
- u7l2 `Transmission Failures: NEXT, Return Loss, Insertion Loss, Length` (obj "6.1", 10). Covers: NEXT failures from too much untwist or a low-category component; return loss from kinks, tight ties, or mixed impedance; insertion loss from length or temperature; length over 90 m; using the tester's distance-to-fault display (HDTDR and HDTDX in plain words) to find which end.
- u7l3 `A Troubleshooting Method: Isolate, Test, Fix, Retest, Document` (obj "6.1", 9). Covers: gather symptoms; check the simple things first (cord, port, label); isolate link versus cords; test one variable at a time; fix and retest; document the fix and update records.

**Unit u8 "Retrofits"** (domain 7; blurb: working in buildings where people work, and taking out what is no longer used; assumes unit 3)
- u8l1 `Working in Occupied Buildings: Surveys, Permits, Ceilings, Cutovers` (obj "7.1", 10). Covers: the pre-work survey (existing pathways, asbestos reports, live circuits); permits and work hours; protecting occupants (dust control, ceiling tiles removed and replaced carefully, drop cloths); infection-control rules in hospitals at recognition level; identifying active circuits before touching anything; cutover planning (new cabling ready and tested, the change window, back-out plan, labeling).
- u8l2 `Abandoned Cable: Identifying It, the Removal Rule, Safe Removal` (obj "7.1", 9). Covers: remove abandoned cable; what the NEC calls abandoned (not terminated at both ends and not tagged for future use); the requirement to remove accessible portions; confirming it is dead (tone and probe, tester, records); cutting and pulling out safely; updating records.

**Unit u9 "Integration and Convergence"** (domain 8; blurb: the other systems that ride on, or beside, structured cabling; assumes unit 3)
- u9l1 `Cabling for Other Building Systems` (obj "8.1", 10). Covers: provide SCS to support installation of other systems (e.g., paging, sound masking, clock, nurse call, BAS, life safety, elevator); what each system needs (cable type, special listings such as fire alarm cable, separation of life-safety circuits, who terminates); coordinating with each trade; labeling and records for shared pathways.
- u9l2 `Power Over the Cable: PoE Types, Bundle Heating, Wireless, DAS` (obj "8.1", 10). Covers: PoE types 1 to 4 with watts; why large bundles heat and what installers do (smaller bundles, higher-category cable, separation); wireless access point outlets in ceilings; DAS cabling at recognition level; security cameras and access control on PoE.

- [ ] **Step 2: Write `courses/inst1/deep-3.js`**

One deep dive per lesson, each at least 300 words with a fenced table and a worked example: u6l2 a sample test report read line by line; u7l1 four fault screens described with cause and fix; u8l2 an abandoned-cable decision table; u9l2 the PoE type table and a bundle-size example.

- [ ] **Step 3: Write `courses/inst1/questions-3.js`** (5 per lesson, 50 total)

Then `balance-keys` and the three-target length check.

- [ ] **Step 4: Validate and commit**

```bash
node tests/packcheck.js courses/inst1 && node tests/acronyms.js courses/inst1 2>&1 | tail -2
git add courses/inst1/curriculum-3.js courses/inst1/deep-3.js courses/inst1/questions-3.js courses/inst1/acronyms.js
git commit -m "feat(inst1): units 6 to 9: testing, troubleshooting, retrofits, integration"
```
Expected before the commit: `packcheck: OK` with 9 units, 52 lessons, 260 questions.

---

### Task 6: Labs

**Files:**
- Create: `courses/inst1/labs-1.js`
- Modify: `courses/inst1/acronyms.js` (any new acronyms)

**Interfaces:**
- Consumes: Task 1's `choices` `svg` support; the lessons' `lab:` ids from Tasks 3 to 5.
- Produces: `FRA.labs` with ten ids: `label-run`, `cut-in-ring`, `conduit-fill`, `firestop-pick`, `bend-tension`, `punch-110`, `jack-t568b`, `pair-colors`, `coax-f`, `wiremap-fault`. Task 8's manifest names `kitLab: "label-run"`.

- [ ] **Step 1: Read the pattern**

Read `courses/bmet/labs-3.js` from `FRA.labs["ping-walkthrough"]` to its end: that is the `choices` lab shape (`scenario.text`, tasks of kind `choice`, `reading` with `unit` and `expect: [lo, hi]` and no `measure`, and `verdict` with `expect: "pass"` or `"fail"`, a `why` per task).

- [ ] **Step 2: Write `courses/inst1/labs-1.js`**

Header and the shared drawing helpers:

```js
// INST1 Academy labs: ten task labs on the choices panel, each with a drawing. Original content.
// Every lab can be done on screen; the optional kit (course.kit) lets a learner do the same work by hand.
// Drawings are inline SVG in a 420 x 220 viewBox and use currentColor so they read in light and dark themes,
// except where the lab is about color (jacks, 25-pair, wiremap), which use the fixed palette C.
window.FRA = window.FRA || {};
FRA.labs = FRA.labs || {};
(function () {
  const C = { blue: '#1f5fd1', orange: '#f08a00', green: '#1a9a3a', brown: '#7a4a1e', slate: '#7d8a96', white: '#f4f4f4', red: '#d12', black: '#111', yellow: '#f2d000', violet: '#7d3cc8' };
  const svg = (parts, label) => `<svg viewBox="0 0 420 220" role="img" aria-label="${label}" style="display:block;width:100%;height:auto">${parts.join('')}</svg>`;
  const text = (x, y, t, size, anchor) => `<text x="${x}" y="${y}" font-size="${size || 11}" text-anchor="${anchor || 'middle'}" fill="currentColor">${t}</text>`;
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill || 'none'}" stroke="currentColor" stroke-width="1.5"/>`;
  // A striped conductor: solid color, or white with a color stripe when stripe is given.
  const wire = (x, y, color, stripe) => `<rect x="${x}" y="${y}" width="16" height="44" fill="${stripe ? C.white : C[color]}" stroke="currentColor" stroke-width="1"/>` + (stripe ? `<rect x="${x + 5}" y="${y}" width="6" height="44" fill="${C[stripe]}"/>` : '');
  ...
})();
```

The ten labs. Every lab has `id`, `lesson`, `title`, `instrument: "choices"`, `intro` (mini-markup: what the hands-on version looks like, the tools, the steps, the common failures, and the standard the work is judged against), `scenario: { text, svg }`, 3 to 6 `tasks`, and a `why` for every task. The kit list is on the course, not the labs (labs omit `kit`).

| Lab | Lesson | Scenario text and drawing | Tasks (kind: what the right answer is) |
|---|---|---|---|
| `label-run` | u1l7 | A labeling scheme card (TR identifier = floor + letter, e.g. `2A`; panel = letter, port = two digits; cable identifier = `<TR>-<panel><port>`) and a floor-plan drawing of TR 2A with panel B and an outlet marked for port 07 | choice: the TR's identifier (`2A`); choice: the cable identifier (`2A-B07`); choice: where the label goes (both ends, on the cable near the termination, and on the faceplate and the panel port); choice: the label type (machine printed, durable); choice: what goes in the records (the identifier, both ends, the test result) |
| `cut-in-ring` | u3l8 | A wall elevation with a stud at 16 in centers, an electrical box 20 in to the left, and the outlet mark between studs | choice: the first step (check the cavity: find studs, look for power and obstructions); choice: the right step order out of four orders (locate, mark level, cut, drop string, set ring); choice: the height (as the drawings or AHJ state, matching existing outlets); verdict: a fire-rated wall with a standard ring is `fail` (needs a listed box or putty pad per the listing) |
| `conduit-fill` | u3l14 | A cross-section of 1 in EMT (ID 1.049 in) with 0.25 in Category 6 cables | reading: fill percent of 5 cables, unit `%`, expect `[28.0, 29.0]` (5 x 0.0625 / 1.1004 x 100 = 28.4); reading: cables at the 40 percent limit, unit `cables`, expect `[7, 7]` (0.4 x 1.1004 / 0.0625 = 7.04); choice: the fill rule for three or more cables (40%); verdict: 9 cables is `fail` |
| `firestop-pick` | u3l15 | Four penetrations drawn in a rated wall: a steel sleeve with cables, a bare cable bundle through a cored hole, a plastic pipe, an empty sleeve with spare capacity | choice per penetration: the method that matches a listed system (a firestop device or sleeve listed for cable; sealant per the listed system with the right annular space; an intumescent collar or wrap listed for plastic pipe; a removable plug or pillow listed for re-entry); choice: what to do after adding a cable later (reseal per the same listing and inspect) |
| `bend-tension` | u4l3 | A pull plan: 12 Category 6 cables 0.25 in OD to be pulled through a sweep, and a 25-pair backbone 0.5 in OD | reading: minimum installed bend radius for the UTP, unit `in`, expect `[1.0, 1.0]`; reading: for the multipair, unit `in`, expect `[5.0, 5.0]`; reading: maximum pulling tension for the 12-cable bundle, unit `lbf`, expect `[300, 300]`; verdict: a winch set to 400 lbf is `fail` |
| `punch-110` | u5l2 | A drawing of a 110 block row with four pair positions and a four-pair cable fanned out | choice: the pair order across the row (blue, orange, green, brown); choice: tip before ring in each pair (white-color conductor first); choice: the tool and blade (punch-down tool with a 110 blade, cutting edge toward the waste end); choice: untwist allowed (13 mm or 0.5 in at most) |
| `jack-t568b` | u5l3 | A jack face with eight numbered slots and four drawn terminations, one of which has pins 3 and 6 swapped with 1 and 2 | choice: the T568B color on pin 1 (white-orange); choice: pin 2 (orange); choice: pin 3 (white-green); choice: pin 6 (green); choice: which drawn jack is wrong and why (pairs 2 and 3 swapped: that end is T568A, the link tests as crossed pairs) |
| `pair-colors` | u5l4 | The 25-pair code drawn as a 5 x 5 grid of tip and ring swatches with no numbers | choice: pair 1 colors (white-blue); choice: pair 7 (red-orange); choice: pair 14 (black-brown); choice: pair 25 (violet-slate); choice: the pair number for yellow-green (18) |
| `coax-f` | u5l5 | Three finished F connectors drawn: one good compression fitting, one with braid strands touching the center conductor, one with the center conductor cut flush | choice: the strip tool and the dimensions as the lesson states them; choice: the step order (strip, fold braid back, insert connector, compress); verdict for each drawn connector (`pass`, `fail`, `fail`) with the reason in `why` |
| `wiremap-fault` | u7l1 | Four tester wiremap screens drawn as two columns of pins 1 to 8 joined by lines: an open on pin 7, pins 1-2 reversed, pairs 1-2 and 3-6 crossed, and a split pair (pins 3 and 2 swapped with 6 and 1 pairing) | choice per screen: the fault name; choice: the fix for the crossed screen (reterminate one end so both ends use the same scheme); choice: the fault a basic continuity tester cannot see (split pair) |

Note for `pair-colors`: compute every pair from the rule, never from memory. Tip group g = floor((n - 1) / 5) over white, red, black, yellow, violet; ring r = (n - 1) mod 5 over blue, orange, green, brown, slate. Pair 7 is red-orange; pair 14 is black-brown; pair 18 is yellow-green; pair 25 is violet-slate.

- [ ] **Step 3: Validate**

Run: `node tests/labcheck.js courses/inst1`
Expected: `inst1: 10 labs on 10 lessons; instruments choices` then `labcheck: OK`.

Open `inst1`'s labs in a browser only after Task 8 builds the shell; here, check each drawing parses: 
```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('<!doctype html><body></body>',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/inst1/labs-1.js','utf8'));for(const [id,l] of Object.entries(w.FRA.labs)){const d=w.document.createElement('div');d.innerHTML=l.scenario.svg;const s=d.querySelector('svg');console.log(id,s?'svg ok':'NO SVG',s?s.querySelectorAll('*').length:0);}"
```
Expected: ten lines, each `svg ok` with more than 5 elements.

- [ ] **Step 4: Commit**

```bash
git add courses/inst1/labs-1.js courses/inst1/acronyms.js
git commit -m "feat(inst1): ten task labs with drawings: labeling, cut-in ring, conduit fill, firestop, bend and tension, 110 block, T568B jack, 25-pair code, F connector, wiremap faults"
```

---

### Task 7: Generators

**Files:**
- Create: `courses/inst1/generators.js`

**Interfaces:**
- Produces: `FRA.generators = { u3l14, u4l3, u4l1, u5l4 }` (five question families in four lesson keys: `u4l3` alternates bend radius and pulling tension) and `FRA.generate(lessonId)`. Each returns `{ id, t, q, a[4], c, e, gen: true }`.

- [ ] **Step 1: Write `courses/inst1/generators.js`** (exact content)

```js
// INST1 Academy dynamic question generators. Each returns a fresh, computed question so conduit fill, bend radius,
// pulling tension, cable quantity, and the 25-pair color code never repeat exactly. Rules agree with the lessons and
// the cheat sheet: fill 53/31/40 percent for 1/2/3+ cables; bend radius 4 x OD for 4-pair UTP, 10 x for multipair,
// fiber 10 x unloaded and 20 x under tension; 25 lbf (110 N) per 4-pair cable; whole runs per box.
window.FRA = window.FRA || {};
(function () {
  const R = n => Math.floor(Math.random() * n);
  const pick = arr => arr[R(arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = p => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const num = (x, d = 2) => String(Number(x.toFixed(d)));
  const comma = x => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- u3l14 conduit fill ----------
  const EMT = [{ size: "3/4 in", id: 0.824 }, { size: "1 in", id: 1.049 }, { size: "1-1/4 in", id: 1.380 }, { size: "1-1/2 in", id: 1.610 }, { size: "2 in", id: 2.067 }];
  const CABLES = [{ name: "Category 5e", od: 0.21 }, { name: "Category 6", od: 0.25 }, { name: "Category 6A", od: 0.30 }];
  function fill() {
    const p = pick(EMT); const cab = pick(CABLES); const ratio = (p.id * p.id) / (cab.od * cab.od);
    const at40 = Math.floor(0.40 * ratio);
    if (R(2) === 0 && at40 >= 3) {
      const cands = [Math.floor(0.53 * ratio), Math.floor(0.31 * ratio), Math.floor(ratio), at40 + 1, at40 - 1, Math.floor(0.40 * p.id / cab.od), Math.round(0.40 * ratio) + 2].map(String);
      return build("u3l14", `How many ${cab.name} cables (${cab.od} in OD) may go in ${p.size} EMT (inside diameter ${p.id} in) at the 40 percent fill limit?`, String(at40),
        wrong(String(at40), cands),
        `Cables at the limit = 0.40 x (conduit ID squared) / (cable OD squared) = 0.40 x ${num(p.id * p.id, 3)} / ${num(cab.od * cab.od, 4)} = ${num(0.40 * ratio, 2)}, rounded down to ${at40}. Round down: a partial cable over the limit is over the limit. Using diameters instead of their squares, or the 53 percent one-cable figure, are the usual slips.`, "fill");
    }
    const n = Math.max(3, Math.min(at40 + 3, pick([3, 4, 5, 6, 8, 10])));
    const pct = n / ratio * 100;
    const cands = [`${num(n * cab.od / p.id * 100, 1)}%`, `${num(pct * 4 / Math.PI, 1)}%`, `${num(pct / 2, 1)}%`, `${num(pct * 2, 1)}%`, `${num(pct + 10, 1)}%`];
    return build("u3l14", `${n} ${cab.name} cables (${cab.od} in OD) are in ${p.size} EMT (inside diameter ${p.id} in). What is the conduit fill?`, `${num(pct, 1)}%`,
      wrong(`${num(pct, 1)}%`, cands),
      `Fill = number of cables x (cable OD squared) / (conduit ID squared) x 100 = ${n} x ${num(cab.od * cab.od, 4)} / ${num(p.id * p.id, 3)} x 100 = ${num(pct, 1)}%. With three or more cables the limit is 40 percent, so this conduit is ${pct <= 40 ? "within" : "over"} the limit.`, "fill");
  }

  // ---------- u4l3 bend radius and pulling tension ----------
  const BEND = [
    { name: "a 4-pair UTP cable", ods: [0.21, 0.25, 0.30], k: 4, why: "4 x OD for 4-pair UTP" },
    { name: "a multipair copper backbone cable", ods: [0.5, 0.75, 1.0, 1.25], k: 10, why: "10 x OD for multipair copper" },
    { name: "an indoor optical fiber cable during the pull", ods: [0.25, 0.4, 0.5, 0.6], k: 20, why: "20 x OD for fiber under pulling tension" },
    { name: "an installed indoor optical fiber cable with no load", ods: [0.25, 0.4, 0.5, 0.6], k: 10, why: "10 x OD for fiber with no load" }
  ];
  function bend() {
    const b = pick(BEND); const od = pick(b.ods); const r = b.k * od;
    const cands = [4, 8, 10, 20, 6].filter(k => k !== b.k).map(k => `${num(k * od, 2)} in`).concat([`${num(r / 2, 2)} in`, `${num(r * 2, 2)} in`]);
    return build("u4l3", `What is the minimum bend radius for ${b.name} with an outside diameter of ${od} in?`, `${num(r, 2)} in`,
      wrong(`${num(r, 2)} in`, cands),
      `Minimum bend radius = ${b.why} = ${b.k} x ${od} in = ${num(r, 2)} in. A manufacturer's figure, if larger, wins.`, "bend");
  }
  function tension() {
    const n = pick([2, 4, 6, 8, 12, 24]); const lbf = n * 25; const newton = n * 110;
    if (R(2) === 0) {
      const cands = [25, lbf / 2, lbf * 2, n * 110, lbf + 25].map(v => `${comma(v)} lbf`);
      return build("u4l3", `A bundle of ${n} 4-pair cables is pulled together. What is the most pulling tension the bundle may take?`, `${comma(lbf)} lbf`,
        wrong(`${comma(lbf)} lbf`, cands),
        `The limit is 25 lbf (110 N) per 4-pair cable: ${n} x 25 = ${comma(lbf)} lbf. Applying one cable's limit to the whole bundle, or mixing up newtons and pounds-force, are the usual slips.`, "ten");
    }
    const cands = [110, newton / 2, newton * 2, n * 25, newton + 110].map(v => `${comma(v)} N`);
    return build("u4l3", `A bundle of ${n} 4-pair cables is pulled together. What is the most pulling tension the bundle may take, in newtons?`, `${comma(newton)} N`,
      wrong(`${comma(newton)} N`, cands),
      `The limit is 110 N (25 lbf) per 4-pair cable: ${n} x 110 = ${comma(newton)} N.`, "ten");
  }
  const u4l3 = () => (R(2) === 0 ? bend() : tension());

  // ---------- u4l1 cable quantity ----------
  function quantity() {
    const runs = pick([12, 18, 24, 36, 48, 60]); const avg = pick([80, 110, 140, 170, 210, 250]); const slackTr = 10; const slackOut = 1;
    const per = avg + slackTr + slackOut; const perBox = Math.floor(1000 / per); const boxes = Math.ceil(runs / perBox);
    const naive = Math.ceil(runs * per / 1000); const noSlack = Math.ceil(runs / Math.floor(1000 / avg));
    const cands = [naive, noSlack, boxes + 1, boxes - 1, Math.ceil(runs * avg / 1000), boxes + 2].filter(v => v > 0).map(String);
    return build("u4l1", `${runs} outlets average ${avg} ft from the telecom room. You leave 10 ft of slack in the room and 1 ft at each outlet, and cable comes in 1,000 ft boxes. Runs cannot be spliced. How many boxes do you need?`, String(boxes),
      wrong(String(boxes), cands),
      `Each run needs ${avg} + 10 + 1 = ${per} ft. One box holds ${perBox} whole runs (1,000 / ${per}, rounded down; the leftover is too short to use). ${runs} runs / ${perBox} per box = ${num(runs / perBox, 2)}, rounded up to ${boxes} boxes. Dividing total footage by 1,000 ignores the short leftover at the end of each box.`, "qty");
  }

  // ---------- u5l4 25-pair color code ----------
  const TIP = ["white", "red", "black", "yellow", "violet"]; const RING = ["blue", "orange", "green", "brown", "slate"];
  const colors = n => `${TIP[Math.floor((n - 1) / 5)]}-${RING[(n - 1) % 5]}`;
  function pairs() {
    const n = 1 + R(25);
    if (R(2) === 0) {
      const g = Math.floor((n - 1) / 5); const r = (n - 1) % 5;
      const cands = [`${TIP[(g + 1) % 5]}-${RING[r]}`, `${TIP[g]}-${RING[(r + 1) % 5]}`, `${TIP[r]}-${RING[g]}`, `${TIP[(g + 4) % 5]}-${RING[r]}`, `${TIP[g]}-${RING[(r + 4) % 5]}`];
      return build("u5l4", `In a 25-pair cable, what are the colors of pair ${n} (tip first, then ring)?`, colors(n),
        wrong(colors(n), cands),
        `Tip colors run white, red, black, yellow, violet, five pairs each; ring colors run blue, orange, green, brown, slate within each group. Pair ${n} is in tip group ${g + 1} (${TIP[g]}) at ring position ${r + 1} (${RING[r]}): ${colors(n)}.`, "pr");
    }
    const g = Math.floor((n - 1) / 5); const r = (n - 1) % 5;
    const cands = [r * 5 + g + 1, n + 5 > 25 ? n - 5 : n + 5, n + 1 > 25 ? n - 1 : n + 1, n - 5 < 1 ? n + 10 : n - 5, (n + 12) % 25 + 1].filter(v => v >= 1 && v <= 25).map(String);
    return build("u5l4", `A pair in a 25-pair cable is ${colors(n)} (tip ${TIP[g]}, ring ${RING[r]}). What is its pair number?`, String(n),
      wrong(String(n), cands),
      `Pair number = 5 x (tip group minus 1) + ring position. ${TIP[g]} is tip group ${g + 1} and ${RING[r]} is ring position ${r + 1}: 5 x ${g} + ${r + 1} = ${n}.`, "pr");
  }

  FRA.generators = { u3l14: fill, u4l3: u4l3, u4l1: quantity, u5l4: pairs };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
```

- [ ] **Step 2: Edge sweep**

Run: `node tests/gen-smoke.js courses/inst1 20000`
Expected: four generators, 0 problems. If a problem names a generator, a distractor list produced a duplicate or a `(1)` filler for some combination; add candidates to that list rather than relaxing the test. Then check value sanity in one pass:

```bash
node -e "const {JSDOM}=require('jsdom');const fs=require('fs');const w=new JSDOM('',{runScripts:'outside-only'}).window;w.eval(fs.readFileSync('courses/inst1/generators.js','utf8'));const bad=[];for(const k of Object.keys(w.FRA.generators))for(let i=0;i<20000;i++){const q=w.FRA.generate(k);const ans=q.a[q.c];if(/^(-|0(\D|$)|NaN)/.test(ans)||/NaN|Infinity|undefined/.test(q.q+q.e+q.a.join()))bad.push(k+': '+ans+' | '+q.q.slice(0,60));}console.log(bad.length?bad.slice(0,10).join('\n'):'sweep clean');"
```
Expected: `sweep clean` (no zero, negative, NaN, or undefined answers).

- [ ] **Step 3: Check the lessons state the same conventions**

u3l14, u4l1, u4l3, and u5l4 and their deep dives must state the same rules the generator header lists (fill by squares of diameters, round the cable count down; whole runs per box; 25 lbf or 110 N per cable; the bend multipliers; the tip and ring order). Search and fix any lesson that differs.

- [ ] **Step 4: Commit**

```bash
git add courses/inst1/generators.js courses/inst1/curriculum-*.js courses/inst1/deep-*.js
git commit -m "feat(inst1): generators for conduit fill, bend radius, pulling tension, cable quantity, and the 25-pair code"
```

---

### Task 8: Manifest, course page, catalog section, lists, and the first full build

**Files:**
- Create: `courses/inst1/course.js`, `inst1/index.html`
- Modify: `index.html`, `tests/catalog.js`, `tests/loaders.js`, `tests/acronyms.js`, `tests/analytics.js`, `build.py`, `scripts/stage.sh`, `README.md`

**Interfaces:**
- Consumes: every pack file from Tasks 2 to 7.
- Produces: `dist/inst1.html`, `dist/inst1-cheatsheet.pdf`, `dist/site/inst1/`, the catalog section `bicsi`, the sitemap entries. `site/build-site.js` needs no change: `seo.related` already lists cross-vendor courses under "Related courses".

- [ ] **Step 1: Update the test lists first (they fail until the wiring lands)**

`tests/loaders.js`: `const SHELLS = ['bmet', 'netplus', 'secplus', 'cbet', 'cres', 'chtm', 'ciip', 'aplus1', 'aplus2', 'inst1'];`

`tests/acronyms.js`: add `inst1: /\bINST1\b|\bINST1 Academy\b/` to `COURSE_NAMES`. Then run `node tests/acronyms.js` with no argument; if another pack's glossary names INST1, reword that entry.

`tests/analytics.js`: add `'inst1.html'` after `'aplus2.html'` in `pages`.

`tests/catalog.js`:
- the section-order check becomes `heads.join('|') === 'Start here: Biomed basic training|AAMI certifications|Imaging informatics|CompTIA certifications|BICSI certifications|Tools for technicians'` with the label `'the catalog has six category sections in order'`;
- add after the CompTIA check: `check('INST1 sits under BICSI certifications', under('bicsi').join(',') === 'inst1/', under('bicsi').join(','));`
- the card count becomes `cards.length === 10`.

Run: `node tests/catalog.js 2>&1 | grep FAIL; node tests/loaders.js 2>&1 | grep -c FAIL`
Expected: the section-order, INST1, and ten-card checks FAIL; loaders fails on the missing shell.

- [ ] **Step 2: Write `courses/inst1/course.js`** (exact content)

```js
// INST1 Academy course pack manifest. Everything the FieldReady Academy engine needs to know about this course.
window.FRA = window.FRA || {};
FRA.course = {
  id: "inst1",
  name: "INST1 Academy",
  short: "I1",
  brand: "FieldReady Academy",
  catalogUrl: "/",
  exam: { vendor: "BICSI", title: "Installer 1", code: "INST1", questions: 75, minutes: 120, passPct: 75, fee: "$335 member, $400 nonmember; retest $135 or $200" },
  description: "Self-paced BICSI Installer 1 (INST1) exam prep with cabling labs, adaptive training, and practice exams.",
  seo: {
    title: "BICSI Installer 1 Study Guide and Practice Tests | INST1 Academy",
    h1: "BICSI Installer 1 (INST1) Study Guide and Practice Tests",
    intro: "INST1 Academy is a free study guide and practice-test course for the BICSI Installer 1 written exam. Fifty-two lessons follow the exam's nine areas from the installer's side of the job: pathways and spaces, bonding, firestop, pulling, termination, testing, and troubleshooting. Ten task labs rehearse the work behind the hands-on exam, a printable INST1 cheat sheet collects the distances, fill rules, pulling limits, and color codes worth memorizing, and every practice test is built from the exam's area weights. Use it as your BICSI Installer 1 study guide and take an INST1 practice test as often as you like, free while the site launches.",
    phrases: ["BICSI Installer 1 study guide", "INST1 practice test", "BICSI installer exam questions", "structured cabling certification", "low voltage cabling certification"],
    related: ["netplus", "aplus1"],
    faq: [
      { q: "How many questions are on the BICSI Installer 1 exam?", a: "The written exam has 75 multiple-choice questions in 2 hours, on a computer at a Pearson test center. Questions test both knowledge and how you apply it. A calculator and a whiteboard are provided, and there are no scheduled breaks." },
      { q: "What is the Installer 1 hands-on exam?", a: "Six tasks done to industry standards, 20 minutes each, graded pass or fail after each task. It is given on the last day of BICSI's Installer 1 class. Fail one task and you may retry it the same day at no cost; fail the same task twice, or two tasks, and you retake the hands-on on another date. You must pass the hands-on before you can take the written exam. This course's labs prepare the knowledge behind those tasks; nothing replaces practice with real tools." },
      { q: "How is the Installer 1 written exam scored?", a: "BICSI sets the passing score through a standard-setting panel of experts and does not publish it. If you fail, you get a report of your performance by topic area, not a score. This course's official-format test asks for 75 percent." },
      { q: "Who can take the Installer 1?", a: "No installation experience is required. BICSI recommends its Installer 1 training class, 50 hours of independent study of its installation methods manual, and safety and PPE training. Candidates must be able to tell colors apart, do fine hand work, stand for long periods, climb ladders, and lift and carry up to 50 pounds." },
      { q: "How much does the Installer 1 cost?", a: "The application fee is $335 for BICSI members and $400 for nonmembers, and it covers your first hands-on and first written attempt. A retest is $135 for members and $200 for nonmembers. You have one year from your first hands-on attempt, with a 30-day wait between unsuccessful attempts and 90 days after a third." },
      { q: "Does the Installer 1 renew?", a: "No. Installer 1 is a nonrenewable certificate. The next steps are Installer 2 Copper and Installer 2 Optical Fiber." },
      { q: "Is this course from BICSI?", a: "No. INST1 Academy is an independent course and is not affiliated with or endorsed by BICSI. Its lessons and questions are original and never reproduce exam content." },
      { q: "Do I need tools for the labs?", a: "No. Every lab runs on screen. If you want to do the work by hand, a punch-down tool with a 110 blade, a few Category 6 jacks, some scrap cable, a jacket stripper, plugs and a crimper, a continuity tester, and a label maker cost about $50." },
      { q: "Is the course free?", a: "Yes. The lessons, the labs, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
  domains: [
    { id: 1, name: "Field Planning, Implementation, and Design", short: "Planning", pct: 13, quota: 6 },
    { id: 2, name: "Pathways and Spaces", short: "Pathways", pct: 31, quota: 16 },
    { id: 3, name: "Pulling Copper and Fiber Cable", short: "Pulling", pct: 21, quota: 11 },
    { id: 4, name: "Terminating Copper and Fiber Cable", short: "Termination", pct: 15, quota: 8 },
    { id: 5, name: "Testing", short: "Testing", pct: 6, quota: 3 },
    { id: 6, name: "Troubleshooting", short: "Troubleshooting", pct: 6, quota: 3 },
    { id: 7, name: "Retrofits", short: "Retrofits", pct: 3, quota: 1 },
    { id: 8, name: "Integration and Convergence", short: "Integration", pct: 3, quota: 1 },
    { id: 9, name: "Codes and Standards", short: "Codes", pct: 2, quota: 1 }
  ],
  // Practice tests pass at 80%; the official-format test uses 75% because BICSI publishes no passing score.
  test: { questions: 50, minutes: 55, passPct: 80, passesNeeded: 3, passWindow: 5, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4", "u1l7", "u1l5", "u1l6"],
    2: ["u3l1", "u3l2", "u3l4", "u3l6", "u3l12", "u3l14", "u3l15", "u3l3", "u3l5", "u3l7", "u3l8", "u3l9", "u3l10", "u3l11", "u3l13"],
    3: ["u4l1", "u4l3", "u4l4", "u4l6", "u4l2", "u4l5", "u4l7", "u4l8", "u4l9", "u4l10"],
    4: ["u5l1", "u5l2", "u5l3", "u5l4", "u5l6", "u5l5", "u5l7", "u5l8"],
    5: ["u6l1", "u6l2", "u6l3"],
    6: ["u7l1", "u7l2", "u7l3"],
    7: ["u8l1", "u8l2"],
    8: ["u9l1", "u9l2"],
    9: ["u2l1", "u2l2"]
  },
  core: {
    1: ["u1l1", "u1l2", "u1l3", "u1l4", "u1l7"],
    2: ["u3l1", "u3l2", "u3l4", "u3l6", "u3l12", "u3l14", "u3l15"],
    3: ["u4l1", "u4l3", "u4l4", "u4l6"],
    4: ["u5l1", "u5l2", "u5l3", "u5l4", "u5l6"],
    5: ["u6l1", "u6l2"],
    6: ["u7l1", "u7l2"],
    7: ["u8l1", "u8l2"],
    8: ["u9l1", "u9l2"],
    9: ["u2l1", "u2l2"]
  },
  freeCourse: true,
  free: { lessons: 15 },
  upgradeUrl: "",
  kit: ["Punch-down tool with a 110 blade", "Category 6 keystone jacks (four or more)", "A few feet of Category 6 cable", "Cable jacket stripper", "RJ-45 plugs and a crimper", "Continuity or wiremap tester", "Label maker or a fine marker and labels"],
  kitLab: "label-run",
  feedbackEndpoint: "https://api.fieldreadyacademy.com/v1/feedback",
  realExamNote: "BICSI sets the written exam's passing score by expert panel and does not publish it. This course's official-format test asks for 75%.",
  examDay: [
    "Hands-on first: six tasks, 20 minutes each, graded pass or fail as you finish each one. Work to the standard, not just until it works, and leave the work area clean.",
    "The written exam comes after you pass the hands-on: 75 questions in 2 hours at a Pearson center, about a minute and a half each. A calculator and whiteboard are provided; there are no scheduled breaks.",
    "Read for the qualifier: FIRST, MOST likely, BEST. The installer's answer is the one that is safe, to code, and to the standard, in that order.",
    "Know the numbers cold: 90 m and 100 m, 13 mm untwist, 25 lbf per cable, the bend radius multipliers, 40 percent fill, two bends between pull points, and the color codes.",
    "Bring a government photo ID with signature and a second ID; the name must match your BICSI profile exactly."
  ],
  generatedNote: "Conduit fill, bend radius, pulling tension, cable quantity from a run list, and the 25-pair color code are generated fresh every time.",
  legacyStoreKeys: []
};
```

- [ ] **Step 3: Create `inst1/index.html`**

Copy `bmet/index.html` to `inst1/index.html`. Replace every `bmet` with `inst1`; replace the three `labs-1.js`, `labs-2.js`, `labs-3.js` script lines with one `<script src="../courses/inst1/labs-1.js"></script>`; replace the title and description with:

```html
  <title>INST1 Academy</title>
```
```html
  <meta name="description" content="Self-paced BICSI Installer 1 (INST1) exam prep with cabling labs, adaptive training, and practice exams.">
```

Run: `grep -c "inst1" inst1/index.html; grep -c "bmet" inst1/index.html; grep -c "labs-" inst1/index.html`
Expected: 13 or more, then 0, then 1. The engine script list (merge, strength, auth, sync, instruments, pbq, app) stays exactly as in the BMET shell. Check any other BMET-specific text in the copied shell (a hard-coded course name or description) and replace it.

- [ ] **Step 4: Catalog section, JSON-LD, descriptions**

In `index.html`, after the closing `</section>` of `<section class="cat" id="comptia">` and before the tools section, insert (match the neighbouring sections' markup exactly):

```html
    <section class="cat" id="bicsi">
      <h2>BICSI certifications</h2>
      <p class="cat-lede">For the people who install the cabling inside commercial buildings: pathways, pulls, terminations, and tests.</p>
      <div class="cards">
        <div class="card">
          <div class="pill">Free</div>
          <h3><a href="inst1/">INST1 Academy</a></h3>
          <p>BICSI Installer 1, the entry-level cabling installer certificate. 52 lessons on pathways and spaces, bonding, firestop, pulling, termination, testing, and troubleshooting, 10 task labs, a printable memorization sheet, adaptive tutorials, and unlimited practice tests.</p>
          <a class="go" href="inst1/">Start the course</a>
          <span class="links"><a href="inst1/lessons/">Read free lessons</a> &middot; <a href="inst1/practice-test/">Practice test</a> &middot; <a href="inst1/cheatsheet/">Cheat sheet</a></span>
        </div>
      </div>
    </section>
```

In the JSON-LD `ItemList`, add after the last course item (A+ Core 2) and renumber anything after it:

```json
      {"@type":"ListItem","position":10,"name":"INST1 Academy: BICSI Installer 1","url":"https://fieldreadyacademy.com/inst1/"},
```

(Read the current list first; use the next free position number.) In the `description` and `og:description` metas, add `the BICSI Installer 1` in the same sentence style as the other credentials.

- [ ] **Step 5: Build list, stage list, README**

`build.py`: `CATALOG_ORDER = ["bmet", "cbet", "cres", "chtm", "ciip", "netplus", "secplus", "aplus1", "aplus2", "inst1"]`

`scripts/stage.sh`: `for id in bmet netplus secplus cbet cres chtm ciip aplus1 aplus2 inst1; do`, and the comment "the nine course bundles" becomes "the ten course bundles".

`README.md`: add **INST1 Academy** (BICSI Installer 1, 52 lessons, 10 labs) at the end of the live-courses list.

- [ ] **Step 6: Run everything**

```bash
npm test 2>&1 | tail -5
python build.py
node site/build-site.js
grep -o '<h2>Related courses</h2>' dist/site/inst1/index.html; for p in netplus aplus1; do grep -c "href=\"/$p/\"" dist/site/inst1/index.html; done
grep -c "not affiliated" dist/site/inst1/index.html
```
Expected: every suite passes (selftest and labcheck include `inst1`; loaders audits ten shells; catalog sees six sections and ten cards); the Related courses heading once; two counts of 1 or more; the independence sentence at least once. `dist/inst1.html`, `dist/site/inst1/index.html`, `practice-test/`, `lessons/` with fifteen lesson pages, `cheatsheet/`, `flashcards/` exist; the sitemap gained the inst1 URLs.

- [ ] **Step 7: Look at the labs**

Open `inst1/index.html` in headless Chrome at the lab lessons (or in a browser) and screenshot `u5l3` and `u7l1` in light and dark themes; confirm the drawings read in both. Fix any drawing that uses a fixed dark color for a line or text that should be `currentColor`.

- [ ] **Step 8: Cheat sheet PDF and page count**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/dist/inst1-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/inst1/index.html#cheatsheet"
python -c "import fitz; print(len(fitz.open('dist/inst1-cheatsheet.pdf')), 'pages')"
```
Expected: 15 to 20 pages (up to 22 acceptable; record in Status).

- [ ] **Step 9: Commit**

```bash
git status --short | head -30
git add courses/inst1/course.js inst1/index.html index.html tests/catalog.js tests/loaders.js tests/acronyms.js tests/analytics.js build.py scripts/stage.sh README.md dist
git commit -m "feat(inst1): manifest and course page; BICSI certifications catalog section; build, stage, loaders, analytics, and acronym lists; first build, static pages, and cheat sheet PDF"
```
(If `git status` shows a changed file outside this list that is not under `dist/`, stop and report it.)

---

### Task 9: Reference and outline coverage checks, the edition re-check list

**Files:**
- Create: `scripts/termcheck_inst1.py`
- Modify: whichever `courses/inst1/*.js` files have gaps; this plan's Status section

- [ ] **Step 1: Write `scripts/termcheck_inst1.py`** with the Write tool

Copy `scripts/termcheck_ciip.py` to `scripts/termcheck_inst1.py` and change only these parts:

```python
# Coverage checker for the INST1 pack: independent checks that the pack's text covers the terms the reference
# sources say it should, while the pack stays original.
#   CHECK 1a - the ITSIMM 6th edition's chapter and section titles (table of contents, level 2).
#   CHECK 1b - the ITSIMM 6th edition's glossary terms (bold run at the start of each entry, Terms pages only).
#   CHECK 2  - every task and named example in the BICSI Installer 1 handbook outline (must be zero misses).
# Usage: python scripts/termcheck_inst1.py (run from the repo root).
```

```python
PACK = pathlib.Path(__file__).resolve().parent.parent / "courses" / "inst1"
BOOK_PDF = "E:/CERT GUIDES/BICSI-INST1/ITSIMM-6.pdf"
```

CHECK 2's `OUTLINE` string:

```python
OUTLINE = """copper cable; fiber; blueprints; inventory; supplies; materials; site safety plan; labeling; labeling scheme;
telecommunications room; equipment room; entrance facility; telecommunications enclosure; bonding; bonding infrastructure;
cable support systems; telecommunication outlet; wall; cut-in ring; cavity box; floor; utility column; modular furniture;
ceiling; hazardous; exterior; sleeves; cores; slots; poke through; cable tray; ladder rack; continuous cable support;
noncontinuous; J-hook; raceway; under the floor; access floor; innerduct; ENT; firestop; smoke barrier;
cable pulling setup; pull string; rope; conduit; open ceiling; backbone; riser; top down; bottom up; horizontal backbone;
pre-termination; connecting hardware; IDC; multipair; four-pair; coaxial termination; fiber termination;
copper cable testing; troubleshooting; abandoned cable; paging; sound masking; clock; nurse call; BAS; life safety;
elevator; fire code; building code; standards"""
```

In CHECK 1a keep `level == 2` only (the ITSIMM's level 1 is chapter titles, level 2 is sections) and extend `DROP` with `table of contents|figures|tables|examples|acknowledgments|bibliography|appendix:`. In CHECK 1b restrict the glossary pages to the "Terms" entry (start at the TOC entry titled `Terms`, stop at `Abbreviations, Acronyms, and Units of Measure`):

```python
for level, title, page in book.get_toc():
    t = re.sub(r"\s+", " ", title.replace("\u00a0", " ")).strip()
    if t.lower() == "terms":
        gloss_start = page
    elif gloss_start and gloss_end is None and page > gloss_start:
        gloss_end = page
```

- [ ] **Step 2: Run it and read the reports**

Run: `python scripts/termcheck_inst1.py > "$TMPDIR/inst1-termcheck.txt"; head -c 4000 "$TMPDIR/inst1-termcheck.txt"` (use the session scratchpad if `$TMPDIR` is unset).
Expected: CHECK 2 prints its count and misses; CHECK 1a and 1b print counts and absent entries. If CHECK 1b finds fewer than 150 terms, the bold detection missed the layout: print the first span's font of each line on two glossary pages and fix the filter.

- [ ] **Step 3: Close CHECK 2 completely**

For every miss, add the term to the lesson its task maps to (the `obj` values), in the learner's words, with a sentence that teaches it. Re-run until `misses 0`.

- [ ] **Step 4: Triage CHECK 1a and 1b**

For each absent title or term: if the handbook outline covers its subject, teach it in the lesson for that task (insertions must teach, and any new acronym gets a glossary key); if it is outside the Installer 1 outline (data center design, health care facility systems beyond nurse call, project management beyond reading drawings and scope, air-blown fiber, OTDR trace analysis, fusion splicer operation, outside plant, wireless design), leave it out and list it in Status under "out of scope" with a one-word reason. Record the final counts.

- [ ] **Step 5: Hand-check the exam facts**

Compare every number in `courses/inst1/course.js` (exam block, FAQ, `realExamNote`, `examDay`) and the cheat sheet's `exam` section against `E:\CERT GUIDES\BICSI-INST1\BICSI-INST1_Handbook.txt`. Record each checked fact in Status (fact, value, line number).

- [ ] **Step 6: Build the edition re-check list**

Search every pack file for numbers with units (`m`, `ft`, `in`, `mm`, `lbf`, `N`, `W`, `MHz`, `%`, `AWG`, `x OD`) and list each distinct rule in Status under "Edition re-check list": the value used, the files and lesson ids where it appears, and whether it came from the Global Constraints list or the ITSIMM 6 dump (with the dump line number). Every number that a standard or code revision could change must be on the list.

- [ ] **Step 7: Re-run the pack tools and commit**

```bash
node tests/packcheck.js courses/inst1 && node tests/acronyms.js courses/inst1 2>&1 | tail -2 && node tests/labcheck.js courses/inst1 && npm test 2>&1 | tail -3
git add scripts/termcheck_inst1.py courses/inst1 docs/superpowers/plans/2026-11-24-inst1-academy.md
git commit -m "test(inst1): manual and outline coverage checks; gaps closed; exam facts verified; edition re-check list"
```

---

### Task 10: Review, merge, deploy, push

- [ ] **Step 1: Whole-branch review**

Dispatch one reviewer subagent over `git diff main...inst1-academy` with the spec and this plan. It checks: every spec requirement has a delivered artifact; numbers agree across the cheat sheet, lessons, deep dives, labs, generators, glossary, and manifest; ten spot-checked numbers match the handbook text or the Global Constraints values; every lab answer is correct (the T568B pins, the 25-pair colors, the fill and bend arithmetic); no source is named in any pack file and the word ITSIMM appears nowhere in `courses/inst1/`; the independence statement is present. Fix what it finds, re-check keys by content after any option change, and commit.

- [ ] **Step 2: Rebuild and test on the branch**

```bash
npm test 2>&1 | tail -3
python build.py && node site/build-site.js
git status --short dist | head
```
Commit any rebuilt `dist` files: `git add dist && git commit -m "build: rebuild after the INST1 review fixes"`.

- [ ] **Step 3: Merge to main**

```bash
git checkout main
git merge --no-ff inst1-academy -m "Merge branch 'inst1-academy': INST1 Academy content pack"
npm test 2>&1 | tail -3
```

- [ ] **Step 4: Stage and go live**

```bash
bash scripts/stage.sh
bash scripts/go-live.sh
scp dist/inst1-cheatsheet.pdf hetzner:/tmp/inst1-cheatsheet.pdf
```
If the auto-mode classifier blocks the copy into `/var/www`, give Blake the one command instead of retrying:
`! ssh hetzner "cp /tmp/inst1-cheatsheet.pdf /var/www/fieldready/inst1/cheatsheet.pdf && chown caddy:caddy /var/www/fieldready/inst1/cheatsheet.pdf"`

- [ ] **Step 5: Verify live**

```bash
for p in / /inst1/ /inst1/app/ /inst1/lessons/ /inst1/practice-test/ /inst1/cheatsheet/ /inst1/flashcards/ /inst1/cheatsheet.pdf; do printf "%s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://fieldreadyacademy.com$p"; done
curl -s https://fieldreadyacademy.com/ | grep -c 'href="inst1/"'
```
Expected: 200 for every path (the PDF may be 404 until Blake runs the copy command); the count at least 1.

- [ ] **Step 6: Push and record**

```bash
git push
```
Record in Status: the merge commit, the backup file name `go-live.sh` printed, the live checks, and that Search Console resubmission of `/sitemap.xml` is Blake's.

---

## Self-review against the spec (done while writing)

- Spec 1 decisions: exam prep with labs (Tasks 2 to 8), reader (Global Constraints), 52 lessons in 9 units in learning order (Tasks 3 to 5: 7 + 2 + 15, 10 + 8, 3 + 3 + 2 + 2), official-format test 75 / 120 / 75 (Task 8), hands-on said plainly (Task 8 FAQ and `examDay`), reference edition and the re-check list (Global Constraints, Task 9 Step 6), independence (Global Constraints, Task 8 FAQ, Task 10 review), catalog section and related courses (Task 8), free at launch, original content and the CIIP build lessons (Global Constraints, Tasks 3 to 7).
- Spec 2 manifest: every field in Task 8 Step 2; quotas 6/16/11/8/3/3/1/1/1 sum to 50; core and starter pools match the spec's starred lessons.
- Spec 2 labs: ten labs on the lessons the spec names (Task 6). Deviation, recorded here: the spec put `conduit-fill` on the `figures` panel, but `figures` draws only meters, cylinders, and strips, so all ten labs use `choices` with a drawing and `reading` tasks without `measure`.
- Spec 2 engine change: Task 1.
- Spec 3 verification: Task 9 checks 1a, 1b, 2, exam facts, and the re-check list.
- Spec 4: 260 questions (Tasks 3 to 5), five generator families in four lesson keys (Task 7: fill, bend, tension, quantity, pairs), sheet (Tasks 2 and 8), glossary (every content task).
- Spec 5 and 6: shell, catalog, lists, static pages, tests (Task 8).
- Spec 7 delivery: Tasks 0 and 10.
- Type consistency: lab ids in Tasks 3 to 5 match Task 6 and `kitLab`; generator keys `u3l14 u4l3 u4l1 u5l4` match lessons that teach their rules; cheat sheet section ids are used as Task 2 defines them.

## Status
