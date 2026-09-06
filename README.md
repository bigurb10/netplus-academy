# NetPlus Academy

A self-paced CompTIA Network+ (N10-009) course in a single web page: a printable memorization sheet, a 10-question starter test that builds a personalized tutorial from 49 lessons, a 50-question test that builds a retraining tutorial from your misses, and practice tests that continue until you score 85% or better three times in a row. All content and questions are original.

## Run it

- Live site: https://bigurb10.github.io/netplus-academy/ (GitHub Pages, served from the root of the `main` branch of https://github.com/bigurb10/netplus-academy). Every push to `main` redeploys within a minute or two; no build step is needed because `index.html` loads the source files directly. On a phone, open the link and use "Add to Home Screen".
- Open `dist/netplus-academy.html` in any browser. Nothing else is required. Progress is saved in that browser's local storage.
- Or open `index.html` from this folder during development; it loads the same files unbundled.
- To host it, upload `dist/netplus-academy.html` (rename to `index.html`) to any static host: GitHub Pages, Netlify, Cloudflare Pages, or a plain web server.

## How the course works

0. **Cheat sheet.** The first thing a new user sees is the memorization sheet: every port, mask, standard, table, and order of steps the exam expects from memory. Print it or save it as a PDF, then continue to the starter test. It stays one tap away in the Cheat sheet tab.
1. **Starter test.** 10 questions, two from each exam domain, each with a confidence rating from 1 (guess) to 5 (certain). Wrong answers and lucky guesses are explained at the end.
2. **Your tutorial.** Built from the starter test. A lesson tied to a question you missed or guessed is always included and opens with your answer versus the correct one. A domain where you missed one question adds that domain's core lessons. A domain where you missed both adds every lesson in it. Lessons run in course order and each ends with a four-question checkpoint. Pass 3 of 4; a right answer marked Guess or Unsure does not count. Every lesson has a "Need a deeper explanation?" button that opens a slower walkthrough with analogies, diagrams, and worked examples.
3. **The 50-question test.** Weighted like the real exam (12 Concepts, 10 Implementation, 9 Operations, 7 Security, 12 Troubleshooting). Every miss and guess is explained at the end.
4. **Retraining tutorial.** Built from the 50-question test, worst first: wrong-and-confident topics before guessed topics. Each lesson opens with the exact question you missed.
5. **Practice tests** until three consecutive tests score 85% or better. Each one produces a new retraining tutorial if there is anything to retrain. Then book the exam.

Scoring behind the scenes: wrong and confident counts 4 points, wrong and unsure 3, right but unsure 2, right at medium confidence 1, right and confident 0. Points drive tutorial selection, ordering, and the optional Drills page, where a topic is done after three consecutive confident correct answers.

## Cheat sheet

- Lives in `data/cheatsheet.js` as sections of tables, lists, and notes. Edit it there and rebuild.
- Opens automatically on a brand-new browser, from the Cheat sheet tab, from the welcome page, and by direct link: `https://bigurb10.github.io/netplus-academy/#cheatsheet`. Adding `#cheatsheet-print` opens it and immediately shows the print dialog.
- The Print button uses the browser's print dialog; choose "Save as PDF" to keep a copy. The print stylesheet hides the navigation, forces light colors, and packs tables tightly (about 14 letter pages).
- To regenerate `dist/netplus-cheatsheet.pdf` without a browser window, run headless Chrome from this folder:

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf="dist\netplus-cheatsheet.pdf" "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/dist/netplus-academy.html#cheatsheet"
```

## Feedback

- Every question has a flag button (during tests, checkpoints, drills, and on results pages). Every lesson has a feedback button at the top and bottom. The Feedback tab takes feedback about a unit, a lesson, the site, or the course overall.
- Feedback is saved in the browser and travels with the progress code on the Progress page. The Feedback tab lists everything saved, and "Copy report" produces a Markdown report with the exact question text, options, and marked answer, ready to paste into a message or into a Claude Code session to fix the course.
- Optional delivery: set `FEEDBACK_ENDPOINT` in `app.js` to a URL that accepts POSTed JSON (Formspree, a Cloudflare Worker, your own API) and each item is also sent there, or set `FEEDBACK_EMAIL` to show an Email button. Both are empty by default so nothing leaves the browser.

## Files

- `index.html`, `styles.css`, `app.js`: the application.
- `data/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `1. ` numbered step, `> ` exam tip, ``` fenced block for diagrams and tables, `{{code}}`, `**bold**`.
- `data/deep-*.js`: the deeper explanation for every lesson, keyed by lesson id, same markup. Opened by the "Need a deeper explanation?" button under a lesson and in drill refreshers.
- `data/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `data/generators.js`: generators that produce fresh subnetting, mask, port, OSI-layer, route-selection, and PoE questions at run time.
- `data/cheatsheet.js`: the memorization sheet.
- `build.py`: bundles everything into `dist/`. Run `python build.py` after editing any source file. It also reports lessons with too few questions.

## Testing

Open `index.html` from disk with `#selftest` on the end of the URL (it only runs from a `file:` URL). It drives the whole flow without clicks and prints `OK` plus a log at the bottom of the page, or `FAIL` with a stack trace. It covers the starter test, tutorial building, a passed checkpoint, a checkpoint where unsure answers must not count, the 50-question test, retraining, feedback saving, and every view.

## Adding questions

Append objects to the matching `questions-*.js` file, keep the `t` field equal to an existing lesson id, and rebuild. Aim for at least five questions per lesson so checkpoints and exams stay fresh.
