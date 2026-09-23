# Pass rule 3-of-5, sureness on the starter only, and the wrong-answer review

Date: 2026-09-23. Approved by Blake the same day (rolling window; CompTIA thresholds; the bank's
explanation as-is; sureness on the starter test only).

## What changes

### 1. The pass rule

Old: three passes in a row at the course bar (85%, Sec+ 90%), then one official-format pass at the
same bar; any fail reset both.

New, per course manifest `test`: `passPct: 80`, `passesNeeded: 3`, `passWindow: 5` (`streakNeeded`
is gone). Per manifest `exam.passPct`, the official-format threshold, the vendor's passing score
divided by 900: Network+ 80, Security+ 83, A+ Core 1 75, A+ Core 2 78. CBET 70 (AAMI publishes no
percent; 116 of 165 is the figure already in the pack's `realExamNote`; Blake can change it).

- Every 50-question test (`full`/`practice`) and every official-format test enters a rolling
  window of the last `passWindow` results; `starter` and `custom` never do. `passes` is the count
  of results at or above `passPct` in that window.
- `passes >= passesNeeded` means qualified: the official-format test is the next step.
- An official-format test (`FRAMerge.isOfficialRecord`) taken while already qualified and scored at
  or above `exam.passPct` sets `official` permanently. Nothing revokes it.
- A fail only slides the window. Dropping below `passesNeeded` sends the learner back to practice.
- `FRAMerge.recomputeQualification(exams, { passPct, passesNeeded, passWindow, officialPct })`
  replaces `recomputeStreak` and returns `{ passes, official }`. It is the single fold; `finishExam`,
  `mergeState`, and `load()` all use it, so `passes`/`official` are never merged or trusted from a
  stored blob. `load()` recomputes from the exam log, which migrates old blobs (`passStreak` is
  dropped; an official pass earned under the old rule survives because any three passes at the
  old bar satisfy the new window and the old bar exceeds every new official threshold).
- State field `passes` replaces `passStreak` (`fresh()`, `mergeState`, `summary.js`, tests).
- `stage()`: starter -> plan remaining -> `official` ? `ready` -> `passes >= passesNeeded` ?
  `official` -> no full/practice yet ? `fulltest` -> `practice`. `summary.js` mirrors it.
- Readiness score: the streak part becomes `passes / passesNeeded`.
- The history table and results page judge an official-format record against `exam.passPct` and
  every other test against `passPct`.

### 2. Sureness

Only the starter test asks. `startExam` sets `noConf` for every kind but `starter`; checkpoints and
drills start with `noConf: true`. Where no rating exists, a right answer is recorded as 4 (sure)
and a wrong one as 3, exactly as `finishExam` already does, so `points`/`kindOf`/topic streaks keep
working: a test's retraining plan is built from misses only; the starter still uses guesses.
Checkpoint credit is `answers.filter(a => a.correct)`; copy says "Pass 3 of 4". Drills finish on
three correct in a row. `questionCard`'s "not sure, so it does not count" verdict only appears when
the session has ratings.

### 3. Results page

- A "next test" button in the header row and the bottom row of every non-starter result: stage
  `official` -> "Take the official-format test" (`start-standard`); `ready` -> "One more practice
  test"; a custom test -> "Set up another test" (tests hub); otherwise "Next practice test"
  (`start-exam`, `nextFlowKind()`). Locked courses get the upgrade button instead.
- Each wrong answer: pill (Wrong, or the starter's confidence label), domain, the question, "Your
  answer:" in red (or "skipped"), "Correct answer:" in green with its letter, "Why:" with the
  bank's explanation, and "Lesson: <title>" with a "Review the lesson" button. Optional; nothing
  forces the learner into the lesson.

### 4. Copy

The rule is restated wherever it is described: catalog hero and how-it-works step 5, the course
landing pages (`site/build-site.js` HOW step 5), the app header comment, welcome list, home stats,
`nextAction` subtitles, tests hub heading and paragraph, results banners and pills, the readiness
report. Every mention of "in a row", "streak", and the old bar goes. `realExamNote` on each
manifest states the vendor score and the course's official threshold consistently.

## Testing

`tests/merge.js` (the fold: window slides, official permanent, requires qualification, custom and
starter excluded, opts guard), `tests/engine.js` (checkpoints pass without ratings; no confidence
chips outside the starter; import uses `passes`), `tests/summary.js`, `tests/sync.js` fixtures, the
in-app self-test (`#selftest`, run by `tests/selftest.js` for every pack), `tests/site.js`. `npm
test` green.

## Deploy

Five bundles, five landing pages (`npm run build:site`, `dist/site/<id>/lessons/index.html`), the
catalog (`dist/index.html`), the account page. Staged for one copy command. Committed.
