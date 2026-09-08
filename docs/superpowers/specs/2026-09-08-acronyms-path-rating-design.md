# Acronym links, path choice, lesson ratings, and a confidence-free standard test

Date: 2026-09-08. Requested by Blake for every course, present and future.

## Requests

1. Every acronym in a tutorial (lesson, deeper explanation, hook) or in the cheat sheet is a hover link. Hovering shows a short tooltip explanation; clicking opens a deeper explanation.
2. The cheat sheet gets an Acronyms section that explains every acronym used in the course.
3. Right after the starter test, the learner chooses between the tailored tutorial built from their results and the whole course, regardless of score.
4. Every lesson can be rated 1 to 10 (10 great, 1 confusing), built into the existing feedback button.
5. The standard test (the real exam's format) drops the "How sure are you?" step. Wrong answers are still explained at the end.

## Decisions and assumptions

- "All courses" means every lesson of the current course in course order. Each course pack is one course.
- Confidence is removed only from standard-format tests: the "Start standard test" button in the Tests hub and the official-format final gate. The starter test, the 50-question test, practice tests, custom tests, lesson checkpoints, and drills keep it, because the engine uses confidence to catch lucky guesses and build the tutorial. The session flag `noConf` makes extending this a one-line change.
- Acronym links wrap every occurrence in lesson bodies, deeper explanations, hooks, unit blurbs, exam-day tips, and cheat sheet titles, cells, list items, and notes. They never appear inside `{{code}}` spans, fenced diagrams, question stems, options, explanations, or personalization callouts, so no test question carries a hint.
- Matching is case-sensitive and whole-word; plurals (`VLANs`, `ACLs`) match too. Longer keys win (`LDAPS` before `LDAP`, `CSMA/CD` before `CSMA`).
- A rating is saved the moment a chip is clicked. A comment is optional. The latest rating per lesson is kept in progress state; every rating also becomes a feedback item so it travels in the feedback report and JSON export.

## Data

### `courses/<id>/acronyms.js`

```js
window.FRA = window.FRA || {};
FRA.acronyms = {
  LAN: { full: "Local area network", tip: "One site's network: a building or campus.", more: "Two to four sentences for the click-through view." },
  ...
};
// Uppercase words in the content that are not acronyms (emphasis, registry keys, model numbers).
FRA.acronymIgnore = ["MOST", "BEST", "FIRST", "NEXT", ...];
```

Every real pack has one. The mini test fixture does not, and the engine must work without it.

### Progress state (`fra.<id>.state.v3`)

- `S.ratings[lessonId] = { r: 1..10, ts }`.
- `S.path = { examIdx, scope: 'tailored' | 'full' }` records the choice made on a starter test's results page. Retaking the starter test clears it so the choice is asked again.
- `S.plan.scope = 'tailored' | 'full'` on a plan built from the starter test. Plan entries for lessons added by the whole-course choice carry `reasons: [{ kind: 'all' }]`; lessons tied to a missed or guessed question keep their existing reasons so callouts still show.
- Exam records gain `noConf: true` when the test ran without confidence. Their review entries store an effective confidence (4 for right, 3 for wrong) so the scoring, streak, and retraining code needs no special cases; only the display hides confidence language.
- Feedback items gain an optional `rating` (1 to 10) on lesson feedback.

## Engine

### Acronym links (`inline()`)

`inline()` already escapes text, then turns `{{code}}` into `<code>` and `**bold**` into `<strong>`. It now also splits the result around `<code>...</code>` and, in the text parts, replaces each glossary key with:

```html
<span class="acr" data-act="acr" data-arg="KEY" role="button" tabindex="0">KEY</span>
```

The regex is built once from the glossary keys, longest first, with a non-alphanumeric boundary on both sides and an optional `s` or `es` plural. Fenced blocks use `esc()` and stay untouched.

### Tooltip and modal

- One shared tooltip element `#acr-tip` is positioned under the hovered or focused `.acr` (mouseover, focusin), clamped to the viewport, and hidden on mouseout, focusout, scroll, click, and every render. It shows the expansion in bold and the tip.
- Clicking (or Enter/Space on) an acronym sets `acrOpen = KEY` and renders a modal: eyebrow "Acronym", the key, the expansion, the tip, the deeper text (through `inline()`, so acronyms inside it are links too), and buttons "All acronyms" (opens the cheat sheet's Acronyms section) and "Close". Escape closes it. The feedback modal and the acronym modal never show together.

### Cheat sheet Acronyms section

`viewCheatsheet()` appends a final section `#cs-acronyms` titled "Acronyms" when the glossary is non-empty: an intro line, then a table with columns Acronym, Stands for, Meaning, sorted case-insensitively. The acronym cell is a button that opens the modal. The section is in the table of contents and prints with the sheet. Cheat sheet PDFs are regenerated.

### Path choice after the starter test

On a starter test's results page, before the tutorial card, a "Choose your path" card shows two options until `S.path` records a choice for that test:

- Tailored tutorial: N lessons, about M minutes, built from these results (or "nothing to teach yet, straight to the test" when the starter was perfect).
- The whole course: all X lessons in order, about Y minutes. Lessons tied to a missed or guessed question still open with the learner's answer and the correct one.

`data-act="path"` with `tailored` or `full` sets `S.path`, rebuilds the plan from the starter record with `applyScope`, and re-renders. The tutorial page shows which path is active and a "Switch to ..." button; switching keeps every lesson already passed because `createdAt` is preserved. The welcome page's "How the path works" mentions the choice. The home page's next-step label reads "Continue the course" for the whole-course path.

### Ratings

- The lesson page ends with a "Rate this lesson" row of ten chips (1 confusing to 10 great) showing the current rating. Clicking a chip saves `S.ratings[id]`, opens the lesson feedback modal with that rating selected and a note that the rating is saved, and focuses the comment box.
- The lesson feedback modal (header button, end-of-lesson button, deeper-explanation button, drills refresher button) always shows the same ten chips. Clicking one inside the modal updates the pressed state in place and saves the rating without re-rendering, so typed text survives.
- Save accepts an empty comment when a rating is present. The feedback item stores `rating`. The Feedback tab lists ratings as pills, shows a "Lesson ratings" card, and the report gets a "Lesson ratings" section; the JSON download becomes `{ course, feedback, ratings }`.

### Standard test without confidence

- `startExam()` sets `noConf: true` when `setup.mode === 'standard'`.
- `questionCard()` omits the confidence row for a `noConf` session, adjusts the keyboard hint, and enables Submit as soon as an option is selected. Keys 1 to 5 are ignored. Skipping records no confidence.
- `finishExam()` computes correctness first and records with effective confidence 4 (right) or 3 (wrong) for `noConf` sessions; the record gets `noConf: true`.
- Results for a `noConf` record hide the sure/guessed split, the calibration pills and explainer, and the guesses card; the wrong-answers card stays. History shows "no confidence ratings" in the Calibration column. The home "last test" line omits the guess count. Retraining reasons built from such a record carry `conf: null`, and the lesson callout omits "confidence n/5".

## Tests

- `tests/acronyms.js` (new, part of `npm test`): for every real pack, every glossary entry has non-empty `full`, `tip`, and `more`; every acronym-looking token in lesson titles, bodies, hooks, unit blurbs, deep dives, and the cheat sheet is a glossary key or on the ignore list; no ignore entry is also a key; no ignore entry is unused.
- Engine self-test additions: acronym links render in a lesson and open the modal; the cheat sheet has the Acronyms section with one row per key; the path choice renders on starter results and "full" makes the plan cover every lesson, then switching back restores the tailored list; rating a lesson stores it and saves a feedback item with an empty comment; a standard test renders no confidence chips, submits on option alone, and its results show wrong answers explained with no guess language.
- Existing gating test unchanged (the starter test keeps confidence).

## Build and docs

- Each `<id>/index.html` loads `courses/<id>/acronyms.js`. `build.py` picks it up automatically.
- README documents `acronyms.js`, the path choice, ratings, and the confidence-free standard test.
- Cheat sheet PDFs rebuilt for all five packs; page counts recorded in the plan.
