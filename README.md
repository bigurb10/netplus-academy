# FieldReady Academy

Self-paced certification courses in a single web page each: a printable memorization sheet, a short starter test that builds a personalized tutorial, a full-length test that builds a retraining tutorial from your misses, and practice tests until you score above the bar three times in a row. All content and questions are original.

Courses live in `courses/<id>/` and share one engine in `engine/`. Live courses: **BMET Academy** (AAMI/ACI CABT, 53 lessons and 13 labs), **NetPlus Academy** (CompTIA Network+ N10-009, 49 lessons), **SecPlus Academy** (CompTIA Security+ SY0-701, 54 lessons), **CBET Academy** (AAMI Certified Biomedical Equipment Technician, 60 lessons), **CRES Academy** (AAMI Certified Radiology Equipment Specialist, 60 lessons), **CHTM Academy** (AAMI Certified Healthcare Technology Manager, 60 lessons), **APlus Academy Core 1** (CompTIA A+ 220-1201, 41 lessons), and **APlus Academy Core 2** (CompTIA A+ 220-1202, 41 lessons). The four CompTIA courses also carry ten PBQs each.

## Run it

- Live: https://fieldreadyacademy.com on the Hetzner box (Caddy, static files under `/var/www/fieldready`). The catalog is `dist/index.html`; each course's landing page is `/<id>/index.html` from the static site in `dist/site/`, and the course app itself (`dist/<id>.html`) is served at `/<id>/app/index.html`; plus `/account/`, `/callback/`, `/serviceforge/`, `/serviceforge/leaderboard/` (the live contributor leaderboard, filled in the browser from `mcp.fieldreadyacademy.com/leaderboard`), and the rest of the static site (practice tests, lessons, cheat sheets, guides, the sitemap, the 404 page, and the shared social image; see URL layout, below). To deploy: `bash scripts/stage.sh` builds everything, mirrors the web root to `hetzner:/tmp/fra-deploy/`, and prints the one command that backs up and copies it live. Google Analytics: put the GA4 Measurement ID in `analytics.json`, rebuild, deploy; `tests/analytics.js` fails if the built pages and the ID disagree. The old GitHub Pages copies (bigurb10.github.io/netplus-academy, secplus-academy, cbet-academy) are stale test deployments.
- Locally: open `netplus/index.html` (or `dist/netplus.html`, a single self-contained file) in any browser. Progress is saved in that browser's local storage.
- To host elsewhere, upload the repo as-is, or upload `dist/<course>.html` renamed to `index.html` to any static host. For the custom domain, add a `CNAME` file containing `fieldreadyacademy.com` and point the domain's DNS at GitHub Pages.

## Layout

- `engine/app.js`, `engine/styles.css`, `engine/instruments.js`: the course engine. It reads `FRA.course` and the pack data; it contains nothing course-specific.
- `courses/<id>/course.js`: the course manifest: id, name, badge, exam, domains with weights and full-test quotas, test sizes and pass bar, starter pools and core lessons, access settings, exam-day tips.
- `courses/<id>/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `1. ` numbered step, `> ` exam tip, ``` fenced block for diagrams and tables, `{{code}}`, `**bold**`.
- `courses/<id>/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `courses/<id>/generators.js`: optional generators that produce computed questions at run time.
- `courses/<id>/cheatsheet.js`: the memorization sheet. `courses/<id>/deep-*.js`: the deeper explanation for every lesson, keyed by lesson id.
- `courses/<id>/acronyms.js`: the acronym glossary (`FRA.acronyms`, keyed by acronym, each with `full`, `tip`, and `more`) plus `FRA.acronymIgnore`, the uppercase words in the course text that are not acronyms. The engine turns every glossary key in lessons, deep dives, hooks, and the cheat sheet into a hover link (the expansion and tip on hover, the longer explanation on click) and appends an Acronyms section to the cheat sheet. Matching is whole-word and case-sensitive, plurals allowed, longest key first, never inside `{{code}}` or fenced blocks and never in question text. `node tests/acronyms.js` reports any acronym in the text that the glossary lacks.
- `<id>/index.html`: the page that loads the engine plus that pack. `index.html`: the catalog. `catalog.css`: its styles.
- `build.py`: bundles each course into `dist/<id>.html` and `dist/<id>-artifact.html`. Run `python build.py` (all) or `python build.py netplus`.
- `tests/`: jsdom harness. `npm install` once, then `npm test` runs the engine's built-in self-test for every course, the gating test, and the acronym coverage test. `node tests/packcheck.js courses/<id>` validates a pack's lessons, deep dives, and questions (including answer-key balance); `node tests/balance-keys.js courses/<id>/questions-N.js` spreads correct answers evenly across A to D; `node tests/gen-smoke.js courses/<id>` calls every generator thousands of times and fails on duplicate or filler options; `node tests/labcheck.js courses/<id>` validates a pack's labs without course.js. `tests/patches/` holds the scripts that made the engine refactor, kept for reference.

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

1. Copy `courses/netplus/course.js` to `courses/<id>/course.js` and fill in every field. Domain ids are what lessons reference. Optional: `certificate: true` adds the certificate of completion.
2. Write `cheatsheet.js`, then `curriculum-*.js`, then `questions-*.js` (five or more per lesson), then `deep-*.js` (one entry per lesson; the self-test fails if any lesson lacks one), then `generators.js` if anything is computable, and `labs-*.js` if any lesson has a hands-on lab (`lab: "<id>"` on the lesson; the self-test validates every lab through `FRAInstruments.validate`).
3. Write `acronyms.js`: run `node tests/acronyms.js courses/<id>` and add an entry for every token it reports (copy shared ones from another pack's `acronyms.js`, checking that the meaning fits this course), or put non-acronym uppercase words on the ignore list, until it passes.
4. Create `<id>/index.html` from `netplus/index.html` with the new script list, keeping both `../engine/merge.js` and `../engine/app.js` (in that order, `merge.js` first) after the course scripts, and add a card to `index.html` under the course's category section (for example the AAMI section for an AAMI credential).
5. Run `npm test` and `python build.py <id>`.

## Labs, virtual instruments, untested domains, and the certificate

- **Labs.** A lesson with `lab: "<id>"` renders the lab in `FRA.labs[<id>]` (a `labs-*.js` file in the pack) between its Remember hook and its deeper explanation: intro, kit list, service-manual excerpt, an instrument panel, and a task sheet of readings, verdicts, and choices. Progress is `S.labs[id] = { done, at, values, ok }`, merged by the newer `at`, synced with the rest of the state. Home shows "Labs done". The self-test validates every lab against its instrument (`FRAInstruments.validate`): reading ranges must contain the computed reading, verdicts must match what the scenario's own limits imply. The manifest's `kit` field lists the lab kit shown on Home, and `kitLab` names the lab whose completion hides that kit card.
- **PBQs.** A CompTIA pack may ship `courses/<id>/pbqs.js` filling `FRA.pbqs[id] = { id, title, domain, lesson, seo, scenario: { text, svg, log }, tasks, why }`: three to six tasks of the kinds `order`, `match`, `multiselect`, `form`, `command`, and `choice`, a `why` per task id, `expect` indexes written against the pack's own arrays (the engine shuffles for display and maps back; a `multiselect` over log or configuration lines carries `shuffle: false`), and `seo: true` on exactly three PBQs. `engine/pbq.js` grades and renders them (drag, tap-to-place, and keyboard give the same answer). The PBQs tab appears when any entry exists; `test.pbqInTest` in the manifest opens the official-format test with that many PBQs, each task scored as one question in place of a multiple-choice question from the same domain (practice, starter, and custom tests never carry them); `seo.pbqPhrases` feeds the crawlable `/<id>/pbq/` page, which renders the three `seo` PBQs with answers and the landing page's section. The pack self-test validates kinds, expects, lesson ids, whys, and the seo count. The four CompTIA packs (Net+, Sec+, A+ Core 1, A+ Core 2) ship ten PBQs each.
- **Instruments** live in `engine/instruments.js`: `dmm`, `safety`, `monitor`, `infusion`, `defib`, plus `figures` (meter, cylinder, ECG strip) and `choices` (preformatted text). Readings are deterministic per lab id. The engine carries no limit or tolerance of its own; every number is in the lab's `scenario`. The app reads the module at render time, so a pack without labs never depends on it.
- **Untested domains.** A domain with `quota: 0` and `pct: 0` is course content outside the exam: in the rail and the course, with checkpoints, counted in lessons passed, never on the starter test, tests, bars, or the strength chart. Lessons in it show "Not on the exam".
- **Certificate.** A manifest with `certificate: true` adds a Progress card and `#certificate`: unlocked when every lesson is passed, every lab is done, and the official-format test is passed; printable, with the account's name or a typed one.
- **Catalog sections.** `index.html` groups courses under Start here: Biomed basic training, AAMI certifications, CompTIA certifications, and Tools for technicians; `tests/catalog.js` checks each card's section.

## URL layout

`site/build-site.js` writes the public, crawlable side of every course (`node site/build-site.js` for all of them, `node site/build-site.js netplus` for one). Per course `<id>`: `/<id>/` is the **landing page**: exam facts, the first free lessons, an FAQ, and a small script that forwards any `#hash` route (`#lesson/n1-...`, `#cheatsheet`) straight into the app, so a shared `/<id>/` link with a hash still opens where it should. `/<id>/app/` is the **course app** itself, built by `build.py`, marked `noindex` (it is the same page regardless of sign-in state and has nothing of its own for search engines to rank). `/<id>/practice-test/` is twenty free bank questions with answers, weighted like the exam. `/<id>/lessons/` lists every lesson, free ones linked, the rest named only; `/<id>/lessons/<id>-<slug>/` is one page per free lesson. `/<id>/cheatsheet/` is the memorization sheet as HTML, with a link to the PDF. Each course also has `/<id>/flashcards/`, built from its glossary and two-column cheat-sheet tables, with an in-page viewer that remembers known cards in the browser. `/404.html` is a noindex page listing the catalog, the guides, and every course's landing page. `/og-image.png` is the one social-card image every page's `og:image` and `twitter:image` point at. `/sitemap.xml` lists every URL above except the app, each with a `<lastmod>` date; `/robots.txt` allows everything but `/callback`.

## Guides

Guides are standalone articles not tied to a lesson or a course: exam-prep explainers, "how to become" pieces, lab walkthroughs. `site/guides/<slug>.js` is a browser script, loaded the same way a course pack is, that pushes one entry onto `FRA.guides`: `slug`, `title`, `body` (the same lesson markup a course uses), `updated`, and optionally `faq` and `related: { courses: ['netplus', ...], lessons: ['netplus:n1-...', ...] }`. `site/build-site.js` writes `/guides/` (an index of every guide) and `/guides/<slug>/` for each one, with Article and (when it has a `faq`) FAQPage JSON-LD, and links whatever courses and lessons `related` names.

## After a deploy that adds pages (Search Console)

The first deploy after the `seo-course-site` branch goes live replaces `/<id>/index.html` (until now the course app) with the landing page, and adds `/<id>/app/index.html` (the app, moved there, `noindex`) for all six courses at once; most deploys after that add only a handful of pages (a new guide, a new course). Either way: resubmit `/sitemap.xml` in Search Console so it re-crawls the new list, then use URL inspection and Request indexing on the pages Google is least likely to find on its own first: the six course landing pages, the six practice-test pages, `/guides/`, and the four PBQ pages `/netplus/pbq/`, `/secplus/pbq/`, `/aplus1/pbq/`, and `/aplus2/pbq/` (a course without a `pbqs.js` builds no PBQ page and no sitemap entry for it). Add the site to Bing Webmaster Tools by importing from Search Console (it reads the same verified property, no second verification). Give it about four weeks, then read the Performance report by query to see what people actually searched to land on each page.

Optional: if the host returns its own 404 instead of serving `dist/site/404.html`, add to the Caddy site block:

```
handle_errors {
  rewrite * /404.html
  file_server
}
```

## Testing

`npm test` runs every suite under `tests/` (the list is the `test` script in `package.json`), from `tests/selftest.js` (the engine's `#selftest` flow under jsdom for every course plus the `tests/fixtures/mini` fixture) through `tests/gating.js`, `tests/acronyms.js` (every glossary entry complete, every acronym in the text covered, no stale ignore entries), `tests/instruments.js`, `tests/engine.js`, `tests/sync.js` and the rest. The mini fixture is a four-domain course: three tested domains, one untested, eight lessons, and one lab. You can also open any `<id>/index.html` from disk with `#selftest` on the URL to see the same log in a browser.
