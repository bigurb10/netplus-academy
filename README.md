# FieldReady Academy

Self-paced certification courses in a single web page each: a printable memorization sheet, a short starter test that builds a personalized tutorial, a full-length test that builds a retraining tutorial from your misses, and practice tests until you score above the bar three times in a row. All content and questions are original.

Courses live in `courses/<id>/` and share one engine in `engine/`. Live courses: **NetPlus Academy** (CompTIA Network+ N10-009, 49 lessons), **SecPlus Academy** (CompTIA Security+ SY0-701, 54 lessons), **CBET Academy** (AAMI Certified Biomedical Equipment Technician, 60 lessons), **APlus Academy Core 1** (CompTIA A+ 220-1201, 41 lessons), and **APlus Academy Core 2** (CompTIA A+ 220-1202, 41 lessons).

## Run it

- Live: https://bigurb10.github.io/netplus-academy/ is the catalog; https://bigurb10.github.io/netplus-academy/netplus/ is the Network+ course https://bigurb10.github.io/netplus-academy/secplus/ is the Security+ course, and https://bigurb10.github.io/netplus-academy/cbet/ is the CBET course. Every push to `main` redeploys within a minute or two; no build step is needed because each course page loads the source files directly. On a phone, open the course link and use "Add to Home Screen".
- Locally: open `netplus/index.html` (or `dist/netplus.html`, a single self-contained file) in any browser. Progress is saved in that browser's local storage.
- To host elsewhere, upload the repo as-is, or upload `dist/<course>.html` renamed to `index.html` to any static host. For the custom domain, add a `CNAME` file containing `fieldreadyacademy.com` and point the domain's DNS at GitHub Pages.

## Layout

- `engine/app.js`, `engine/styles.css`: the course engine. It reads `FRA.course` and the pack data; it contains nothing course-specific.
- `courses/<id>/course.js`: the course manifest: id, name, badge, exam, domains with weights and full-test quotas, test sizes and pass bar, starter pools and core lessons, access settings, exam-day tips.
- `courses/<id>/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `1. ` numbered step, `> ` exam tip, ``` fenced block for diagrams and tables, `{{code}}`, `**bold**`.
- `courses/<id>/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `courses/<id>/generators.js`: optional generators that produce computed questions at run time.
- `courses/<id>/cheatsheet.js`: the memorization sheet. `courses/<id>/deep-*.js`: the deeper explanation for every lesson, keyed by lesson id.
- `<id>/index.html`: the page that loads the engine plus that pack. `index.html`: the catalog. `catalog.css`: its styles.
- `build.py`: bundles each course into `dist/<id>.html` and `dist/<id>-artifact.html`. Run `python build.py` (all) or `python build.py netplus`.
- `tests/`: jsdom harness. `npm install` once, then `npm test` runs the engine's built-in self-test for every course and the gating test. `node tests/packcheck.js courses/<id>` validates a pack's lessons, deep dives, and questions (including answer-key balance); `node tests/balance-keys.js courses/<id>/questions-N.js` spreads correct answers evenly across A to D; `node tests/gen-smoke.js courses/<id>` calls every generator thousands of times and fails on duplicate or filler options. `tests/patches/` holds the scripts that made the engine refactor, kept for reference.

## How a course works

0. **Cheat sheet.** Shown first to new users, printable, always one tap away in the Cheat sheet tab. Direct link: `<course>/#cheatsheet` (`#cheatsheet-print` opens the print dialog). `dist/<id>-cheatsheet.pdf` is each course's sheet printed from headless Chrome.
1. **Starter test.** A few questions from each exam domain (`test.starterPerDomain`), each with a confidence rating from 1 (guess) to 5 (certain).
2. **Your tutorial.** A lesson tied to a question you missed or guessed is always included. A domain where you missed some questions adds its core lessons; a domain where you missed them all adds every lesson in it. Each lesson ends with a checkpoint (pass `checkpointPass` of `checkpointN`; a right answer marked Guess or Unsure does not count) and has a "Need a deeper explanation?" walkthrough.
3. **The full-length test.** `test.questions` items, weighted by each domain's `quota`.
4. **Retraining tutorial.** Built from the misses, worst first.
5. **Practice tests** until `streakNeeded` in a row at `passPct` or better.

Scoring behind the scenes: wrong and confident counts 4 points, wrong and unsure 3, right but unsure 2, right at medium confidence 1, right and confident 0. Points drive tutorial selection, ordering, and the optional Drills page.

## Access and pricing

Each manifest declares `freeCourse` and `free.lessons`. With `freeCourse: true` (the launch setting) everything is open. With it false, the cheat sheet, the starter test, and the first `free.lessons` lessons stay open and everything else shows an unlock card; `upgradeUrl` is where that card sends people, and a page that sets `window.FRA_ENTITLED = true` before loading the engine (after login and purchase) unlocks the course.

## Feedback

Every question has a flag button and every lesson has feedback buttons; the Feedback tab collects overall feedback and exports a Markdown report. Feedback stays in the browser unless the manifest sets `feedbackEndpoint` (a URL that accepts POSTed JSON) or `feedbackEmail`.

## Adding a course

1. Copy `courses/netplus/course.js` to `courses/<id>/course.js` and fill in every field. Domain ids are what lessons reference.
2. Write `cheatsheet.js`, then `curriculum-*.js`, then `questions-*.js` (five or more per lesson), then `deep-*.js` (one entry per lesson; the self-test fails if any lesson lacks one), then `generators.js` if anything is computable.
3. Create `<id>/index.html` from `netplus/index.html` with the new script list, and add a card to `index.html`.
4. Run `npm test` and `python build.py <id>`.

## Testing

`npm test` runs `tests/selftest.js` (the engine's `#selftest` flow under jsdom for every course plus the `tests/fixtures/mini` three-domain course) and `tests/gating.js`. You can also open any `<id>/index.html` from disk with `#selftest` on the URL to see the same log in a browser.
