# NetPlus Academy

A self-paced CompTIA Network+ (N10-009) course in a single web page: a 10-question starter test builds a personalized tutorial from 49 lessons, a 50-question test builds a retraining tutorial from your misses, and practice tests continue until you score 85% or better three times in a row. All content and questions are original.

## Run it

- Live site: https://bigurb10.github.io/netplus-academy/ (GitHub Pages, served from the root of the `main` branch of https://github.com/bigurb10/netplus-academy). Every push to `main` redeploys within a minute or two; no build step is needed because `index.html` loads the source files directly. On a phone, open the link and use "Add to Home Screen".
- Open `dist/netplus-academy.html` in any browser. Nothing else is required. Progress is saved in that browser's local storage.
- Or open `index.html` from this folder during development; it loads the same files unbundled.
- To host it, upload `dist/netplus-academy.html` (rename to `index.html`) to any static host: GitHub Pages, Netlify, Cloudflare Pages, or a plain web server.

## How the course works

1. **Starter test.** 10 questions, two from each exam domain, each with a confidence rating from 1 (guess) to 5 (certain). Wrong answers and lucky guesses are explained at the end.
2. **Your tutorial.** Built from the starter test. A lesson tied to a question you missed or guessed is always included and opens with your answer versus the correct one. A domain where you missed one question adds that domain's core lessons. A domain where you missed both adds every lesson in it. Lessons run in course order and each ends with a four-question checkpoint (pass 3 of 4).
3. **The 50-question test.** Weighted like the real exam (12 Concepts, 10 Implementation, 9 Operations, 7 Security, 12 Troubleshooting). Every miss and guess is explained at the end.
4. **Retraining tutorial.** Built from the 50-question test, worst first: wrong-and-confident topics before guessed topics. Each lesson opens with the exact question you missed.
5. **Practice tests** until three consecutive tests score 85% or better. Each one produces a new retraining tutorial if there is anything to retrain. Then book the exam.

Scoring behind the scenes: wrong and confident counts 4 points, wrong and unsure 3, right but unsure 2, right at medium confidence 1, right and confident 0. Points drive tutorial selection, ordering, and the optional Drills page, where a topic is done after three consecutive confident correct answers.

## Files

- `index.html`, `styles.css`, `app.js`: the application.
- `data/curriculum-*.js`: units and lessons. Lesson bodies use a tiny markup: `## ` heading, `- ` bullet, `> ` exam tip, `{{code}}`, `**bold**`.
- `data/questions-*.js`: the question bank. Each question has an id, lesson id `t`, stem `q`, four options `a`, correct index `c`, and explanation `e`.
- `data/generators.js`: generators that produce fresh subnetting, mask, port, OSI-layer, route-selection, and PoE questions at run time.
- `build.py`: bundles everything into `dist/`. Run `python build.py` after editing any source file. It also reports lessons with too few questions.

## Adding questions

Append objects to the matching `questions-*.js` file, keep the `t` field equal to an existing lesson id, and rebuild. Aim for at least five questions per lesson so checkpoints and exams stay fresh.
