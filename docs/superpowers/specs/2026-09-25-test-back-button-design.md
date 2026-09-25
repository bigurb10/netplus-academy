# Tests: a Previous button (2026-09-25)

## Why

Tests had no way back. Every question was submit-and-advance, so a learner who skipped a
question, or second-guessed one, could not return to it. The real CompTIA and CBET exams let
you move back and forth and change answers until you end the exam, and the course tests
should rehearse that.

## Behaviour

Applies to every test kind: starter, 50-question, practice, custom, and official-format.
Checkpoints and drills are unchanged; they give instant feedback, so there is nothing to go
back to.

- **Frontier.** A test scores nothing until it ends, so answers stay editable. The frontier is
  `answers.length`: questions before it are answered or skipped and open for review; the one
  at it is new.
- **Previous** appears on every question after the first. It shows the earlier question with
  the learner's answer selected (nothing selected for a skip). The learner can change it.
- **On a reviewed question** the controls are Previous and **Next** instead of Skip and
  Submit. The selection on screen is the answer: leaving the question by Previous or Next
  saves it. Leaving it with nothing selected keeps it skipped.
- **On the new question** (the frontier) the controls are Previous, Skip, and Submit, as
  before. Pressing Previous keeps the unsubmitted pick as a draft, restored when the learner
  comes forward again.
- **Starter test.** A pick on a previously skipped question needs its sureness rating before
  Previous or Next will move. Both buttons are disabled until it is rated.
- **Last question.** Submit reads **Finish test** because it ends the test. The learner can
  still press Previous first.
- **Keyboard.** Left arrow is Previous, right arrow is Next, Enter is Next on a reviewed
  question and Submit on the new one. A to D and 1 to 5 work as before.
- **Progress meter** shows answered questions, not the question on screen, so it never runs
  backwards.

## State

No new state shape. `S.active` gains an optional `draft` (`{ sel, conf }`) that exists only
while the learner is behind the frontier. `answers[k]` keeps its `{ choice, conf, skipped }`
shape; review overwrites it in place, so `finishExam`, the results page, the merge engine,
and progress sync are untouched.

## Code

`engine/app.js`: `testLeave`, `testShow`, `testPrev`, `testNext`, `testUnrated` beside
`submitAnswer`; `questionCard` takes `opts.nav` from `viewExam`; click actions `test-prev`
and `test-next`; arrow keys and Enter in the key handler. `engine/styles.css` hides the
keyboard hint under 700 px so Previous and Next share a row on phones.

## Tests

`tests/engine.js`, block "Tests have a Previous button": step back over a skip, change an
answer, fill the skip, draft restore, meter, Finish test label, the record after finishing,
and the starter's sureness hold.
