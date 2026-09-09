# FieldReady Academy

Self-paced certification courses in a single web page each: a printable memorization sheet, a short starter test that builds a personalized tutorial, a full-length test that builds a retraining tutorial from your misses, and practice tests until you score above the bar three times in a row. All content and questions are original.

Courses live in `courses/<id>/` and share one engine in `engine/`. Live courses: **NetPlus Academy** (CompTIA Network+ N10-009, 49 lessons), **SecPlus Academy** (CompTIA Security+ SY0-701, 54 lessons), **CBET Academy** (AAMI Certified Biomedical Equipment Technician, 60 lessons), **APlus Academy Core 1** (CompTIA A+ 220-1201, 41 lessons), and **APlus Academy Core 2** (CompTIA A+ 220-1202, 41 lessons).

## Run it

- Live (testing layout as of 2026-09-08): https://bigurb10.github.io/netplus-academy/ serves only the Network+ course, from the `gh-pages` branch of this repo, which holds the single-file build `dist/netplus.html` renamed to `index.html` plus the cheat sheet PDF. https://bigurb10.github.io/secplus-academy/ (Security+) and https://bigurb10.github.io/cbet-academy/ (CBET) are served the same way from the separate `secplus-academy` and `cbet-academy` repos (main branch root). `main` here holds the code and is not what GitHub Pages deploys. To update a live page: `python build.py <id>`, copy `dist/<id>.html` to that branch or repo as `index.html` (and the cheat sheet PDF), commit, push. The catalog and the A+ courses are not published yet. On a phone, open the course link and use "Add to Home Screen".
- Locally: open `netplus/index.html` (or `dist/netplus.html`, a single self-contained file) in any browser. Progress is saved in that browser's local storage.
- To host elsewhere, upload the repo as-is, or upload `dist/<course>.html` renamed to `index.html` to any static host. For the custom domain, add a `CNAME` file containing `fieldreadyacademy.com` and point the domain's DNS at GitHub Pages.

## Layout

- `engine/app.js`, `engine/styles.css`: the course engine. It reads `FRA.course` and the pack data; it contains nothing course-specific.
- `courses/<id>/course.js`: the course manifest: id, name, badge, exam, domains with weights and full-test quotas, test sizes and pass bar, starter pools and core lessons, access settings, exam-day tips.
- `courses/<id>/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `1. ` numbered step, `> ` exam tip, ``` fenced block for diagrams and tables, `{{code}}`, `**bold**`.
- `courses/<id>/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `courses/<id>/generators.js`: optional generators that produce computed questions at run time.
- `courses/<id>/cheatsheet.js`: the memorization sheet. `courses/<id>/deep-*.js`: the deeper explanation for every lesson, keyed by lesson id.
- `courses/<id>/acronyms.js`: the acronym glossary (`FRA.acronyms`, keyed by acronym, each with `full`, `tip`, and `more`) plus `FRA.acronymIgnore`, the uppercase words in the course text that are not acronyms. The engine turns every glossary key in lessons, deep dives, hooks, and the cheat sheet into a hover link (the expansion and tip on hover, the longer explanation on click) and appends an Acronyms section to the cheat sheet. Matching is whole-word and case-sensitive, plurals allowed, longest key first, never inside `{{code}}` or fenced blocks and never in question text. `node tests/acronyms.js` reports any acronym in the text that the glossary lacks.
- `<id>/index.html`: the page that loads the engine plus that pack. `index.html`: the catalog. `catalog.css`: its styles.
- `build.py`: bundles each course into `dist/<id>.html` and `dist/<id>-artifact.html`. Run `python build.py` (all) or `python build.py netplus`.
- `tests/`: jsdom harness. `npm install` once, then `npm test` runs the engine's built-in self-test for every course, the gating test, and the acronym coverage test. `node tests/packcheck.js courses/<id>` validates a pack's lessons, deep dives, and questions (including answer-key balance); `node tests/balance-keys.js courses/<id>/questions-N.js` spreads correct answers evenly across A to D; `node tests/gen-smoke.js courses/<id>` calls every generator thousands of times and fails on duplicate or filler options. `tests/patches/` holds the scripts that made the engine refactor, kept for reference.

## How a course works

0. **Cheat sheet.** Shown first to new users, printable, always one tap away in the Cheat sheet tab. Direct link: `<course>/#cheatsheet` (`#cheatsheet-print` opens the print dialog). `dist/<id>-cheatsheet.pdf` is each course's sheet printed from headless Chrome.
1. **Starter test.** A few questions from each exam domain (`test.starterPerDomain`), each with a confidence rating from 1 (guess) to 5 (certain).
2. **Your path.** The starter results page asks the learner to choose, whatever the score: the **tailored tutorial** or **the whole course**. Tailored: a lesson tied to a question you missed or guessed is always included, a domain where you missed some questions adds its core lessons, and a domain where you missed them all adds every lesson in it. Whole course: every lesson in order, with the same personalization callouts on lessons tied to a missed or guessed question. The Tutorial tab has a switch button, and lessons already passed stay passed. Each lesson ends with a checkpoint (pass `checkpointPass` of `checkpointN`; a right answer marked Guess or Unsure does not count), has a "Need a deeper explanation?" walkthrough, and can be rated 1 to 10.
3. **The full-length test.** `test.questions` items, weighted by each domain's `quota`.
4. **Retraining tutorial.** Built from the misses, worst first.
5. **Practice tests** until `streakNeeded` in a row at `passPct` or better.
6. **The official-format test.** The real exam's question count and time limit from `exam`, always timed, at `passPct`. Standard-format tests (this one and the "Start standard test" button in the Tests hub) ask no confidence question, like the real exam; every wrong answer is still explained at the end and feeds retraining.

Scoring behind the scenes: wrong and confident counts 4 points, wrong and unsure 3, right but unsure 2, right at medium confidence 1, right and confident 0. Points drive tutorial selection, ordering, and the optional Drills page. On a standard-format test a right answer is recorded as sure and a wrong one as plain wrong.

## Access and pricing

Each manifest declares `freeCourse` and `free.lessons`. With `freeCourse: true` (the launch setting) everything is open. With it false, the cheat sheet, the starter test, and the first `free.lessons` lessons stay open and everything else shows an unlock card; `upgradeUrl` is where that card sends people, and a page that sets `window.FRA_ENTITLED = true` before loading the engine (after login and purchase) unlocks the course.

## Feedback

Every question has a flag button and every lesson has feedback buttons and a 1-to-10 rating row (1 confusing, 10 great); clicking a rating saves it at once and opens the lesson feedback form for an optional comment, and the same chips appear in that form. The Feedback tab lists lesson ratings, collects overall feedback, and exports a Markdown report (with a ratings section) or JSON (`{ course, feedback, ratings }`). Feedback stays in the browser unless the manifest sets `feedbackEndpoint` (a URL that accepts POSTed JSON) or `feedbackEmail`.

## Adding a course

1. Copy `courses/netplus/course.js` to `courses/<id>/course.js` and fill in every field. Domain ids are what lessons reference.
2. Write `cheatsheet.js`, then `curriculum-*.js`, then `questions-*.js` (five or more per lesson), then `deep-*.js` (one entry per lesson; the self-test fails if any lesson lacks one), then `generators.js` if anything is computable.
3. Write `acronyms.js`: run `node tests/acronyms.js courses/<id>` and add an entry for every token it reports (copy shared ones from another pack's `acronyms.js`, checking that the meaning fits this course), or put non-acronym uppercase words on the ignore list, until it passes.
4. Create `<id>/index.html` from `netplus/index.html` with the new script list, and add a card to `index.html`.
5. Run `npm test` and `python build.py <id>`.

## Testing

`npm test` runs `tests/selftest.js` (the engine's `#selftest` flow under jsdom for every course plus the `tests/fixtures/mini` three-domain course), `tests/gating.js`, and `tests/acronyms.js` (every glossary entry complete, every acronym in the text covered, no stale ignore entries). You can also open any `<id>/index.html` from disk with `#selftest` on the URL to see the same log in a browser.
