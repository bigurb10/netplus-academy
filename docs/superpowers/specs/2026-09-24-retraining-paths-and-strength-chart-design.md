# Retraining paths (drills, lesson, extended) and the strength chart

Date: 2026-09-24. Blake approved the scoring, the bands, the chart grain, and the plan-based
representation in conversation, then asked for the rest to be built without further review.
Sections 2 and 3 below record the decisions made under that instruction.

## Why

Drills were an optional side activity: a refresher, then questions until three correct in a
row. They were never offered as a way to retrain after a test. Retraining after every test was
one fixed shape, the full lesson plus its checkpoint, whether the learner had missed a topic
once by accident or repeatedly. Blake wants the end of every full, practice, custom, and
official-format test to offer three depths of retraining per missed topic, suggest one from
the learner's recent history, let the learner override it per topic or wholesale, never trap
them (the next test is always one click away), and show where they are strongest and weakest,
both at the end of the test and on the account page.

## 1. Data and scoring (approved)

### New state fields

- `S.lessons[id]` gains `lastScore` (0 to `checkpointN`) and `lastAt` (ms), written at the end
  of every checkpoint, pass or fail. `merge.js mergeLesson` carries the pair from the side
  with the newer `lastAt` (the two fields travel together; a max of each would pair a score
  with the wrong time).
- `S.topics[id]` gains `drilledAt` (ms), stamped when a drill on that topic reaches three
  correct in a row. Topics already merge whole-record by `last`, so it carries.
- A plan built from a test (`plan.source === 'test'`) keeps its entries in `plan.lessons`.
  Each entry gains `mode` (`drill` | `lesson` | `deep`), `suggested` (the mode the rule
  picked), `score`, and `why = { here, before, cpWrong }`. The plan stores `preset`, the
  preset the learner last chose (`suggested` for a new plan); the chip shown pressed is that
  preset while every entry's mode still matches it, otherwise Custom. Plans from the starter
  test are untouched. Entries saved before this change have no `mode` and are read as
  `lesson`; a plan without `preset` reads as `suggested`.

### The retraining window and score

For the test just scored (`rec`, index `idx`):

- `prev` = the most recent test before `idx` whose kind is not `starter` (full, practice,
  custom, and official-format tests all count).
- For each topic missed on `rec`:
  - `here` = wrong answers on `rec` whose question belongs to the topic (weight 1.0)
  - `before` = wrong answers on `prev` for the topic, 0 without a `prev` (weight 0.5)
  - `cpWrong` = `checkpointN - lastScore` for the topic's most recent checkpoint, counted only
    when `lastAt` is after `prev.date` (after 0 with no `prev`) and before `rec.date`
    (weight 0.5)
  - `score = here + 0.5 * before + 0.5 * cpWrong`
- Bands: `score <= 1` suggests `drill`; `1 < score < 2.5` suggests `lesson`; `score >= 2.5`
  suggests `deep`.
- Entries exist only for topics missed on `rec` (the existing rule: points at or above 2,
  which on a no-sureness test means any wrong answer). History raises the depth; it never adds
  a topic. Ordered by `score` descending, then the domain's exam weight, then course order.
- The starter test is never `rec`, never `prev`, and never a source of misses.
- The score is computed once, when the test is scored (or when the learner adopts a custom
  test's plan, see below) and stored on the entry. The results page renders what was stored.

### Which tests build a plan

Unchanged: a full or practice test (including the official-format test) replaces the plan; a
custom test builds one only when no retraining plan is in progress. New: on a custom test's
results page while another test's plan is still in progress, a card names that plan (its test
date, lessons left) with two buttons, "Continue it" and "Build a path from this test instead".
The second sets `S.plan = planFromTest(rec, idx)` and shows the path picker.

## 2. The results page and the path picker

Order of the non-starter results page, top to bottom:

1. Eyebrow, headline, and the next-test button (unchanged).
2. Score hero (unchanged).
3. **Where you stand** card, replacing the per-test "By domain" card: one bar per exam domain,
   ranked strongest to weakest by the recency-weighted accuracy (section 4), labelled with the
   domain's short name and exam weight, the bar the weighted accuracy, the value its percent,
   and a muted "this test c/t" tag from `rec.byDomain`. Domains with no data sort last and show
   a dim bar. Under the bars, **Weakest topics**: up to five, each with the title, the domain,
   a why line ("missed here", "missed on your last test", "checkpoint 2 of 4"), and a Lesson
   button.
4. **Retraining** card (replaces the "Retraining tutorial" card) when the plan is from this
   test:
   - Heading: "N topics to retrain, about M minutes" where M is the estimate for the current
     modes.
   - Preset chips (`aria-pressed` on the derived preset): Suggested, All drills, All lessons,
     All extended, and a Custom chip that is only ever shown pressed (it is not a button).
   - One row per entry: title, domain pill, the why line, and three mode chips (Drill,
     Lesson, Extended) with the current mode pressed. Changing a chip changes that entry only.
   - Buttons: primary "Start retraining" (opens the first unfinished entry by its mode) and
     ghost "See the full plan" (Tutorial tab).
   - A muted line stating the rule in plain words: one miss with no history suggests drills;
     a repeat miss suggests the lesson; missed on both tests or a failed checkpoint too
     suggests the extended lesson.
   When the plan is from another test (custom test case), the in-progress card from section 1.
   On an older full or practice test whose plan a later test replaced, a small card says so
   and offers "Rebuild retraining from this test instead" (`retrain-adopt`), so a revisited
   results page never claims "No misses". When there is nothing to retrain, the existing
   "No misses" banner.
5. Wrong answers explained (unchanged).
6. The bottom row with the next-test button (unchanged).

Estimated minutes per entry: drill 5; lesson `(minutes || 6) + 3`; extended lesson the lesson
estimate plus the deeper explanation's words divided by 200, rounded up.

New actions: `retrain-preset` (arg: preset), `retrain-mode` (arg: `lessonId:mode`),
`retrain-start`, `retrain-open` (arg: lessonId), `retrain-adopt` (arg: examIdx),
`retrain-switch` (arg: lessonId, flips a drill entry to `lesson`).

## 3. Running a path

`openEntry(entry)`:

- `lesson`: close any open deeper explanation and go to the lesson, as today.
- `deep`: go to the lesson with the deeper explanation expanded. The lesson head shows an
  "Extended" pill and one line: read the deeper explanation, then take the checkpoint. On a
  reload, the lesson view re-expands it once for an unfinished `deep` entry (a `deepAuto`
  guard, so Hide still works).
- `drill`: start a single-topic drill session flagged `fromPlan`. The session is the existing
  drill flow (refresher, then questions). Its end screen, instead of "Next session": "Topic
  done" with a button to the next unfinished entry (or, when none is left, the next test), or
  "Still shaky" when ten drills passed without three in a row, with "Drill it again" and
  "Switch this topic to the lesson" (`retrain-switch`). "End session" returns to the Tutorial
  tab.

Completion, one rule for every entry regardless of mode (the mode only decides what opens):
an entry is done when its checkpoint passed after `plan.createdAt` OR its topic was drilled to
three in a row after `plan.createdAt` (`topics[id].drilledAt >= plan.createdAt`). `planDone(id)`
in app.js and the mirror in `summary.js` both apply it. `stage()` is unchanged: `retrain`
while any entry is unfinished.

Tutorial tab, test-sourced plan: each row shows a mode pill (Drill, Lesson, Extended) beside
the reason pill and opens by mode. The header card names the preset and has a "Change your
path" button back to that test's results page. Home's next step for the `retrain` stage reads
"Drill: title", "Continue retraining: title", or "Extended lesson: title" and opens by mode.
The Drills tab and its ad-hoc sessions are unchanged.

The next test is never blocked: the results page keeps its top and bottom next-test buttons,
the Tests hub keeps "You can still take a test early", and starting any test with an
unfinished plan needs no confirmation (unchanged).

## 4. The strength chart (approved grain: domains ranked, plus the five weakest topics)

A new pure module `engine/strength.js` (window global `FRAStrength`, CommonJS for tests, the
same shape as `summary.js`):

```
FRAStrength.compute(state, meta, examIdx?) -> {
  hasData, latestIdx, previousIdx,
  domains: [{ id, short, name, pct, acc, wc, wa, thisTest: { c, t } | null }],  // ranked
  weakest: [{ id, title, domain, score, here, before, cpWrong }]               // up to 5
}
meta = { domains: [{ id, short, name, pct }], lessons: [{ id, title, domain }], checkpointN }
```

- Window: `latest` = the test at `examIdx`, or the most recent non-starter test; `previous`
  = the most recent non-starter test before it. Weights: every answer on `latest` 1.0, on
  `previous` 0.5, and each lesson's most recent checkpoint 0.5 per question when `lastAt` is
  after `previous.date` (after 0 with no previous). No upper bound on checkpoints: the chart
  is the learner's standing now, so retraining done after the latest test counts. (The plan's
  stored `why` is a snapshot taken when the test was scored; the two can differ by design.)
- With no non-starter test at all, the chart runs on checkpoints alone; with nothing at all,
  `hasData` is false and the card says the first test will fill it in. The starter test never
  contributes.
- `acc` = `round(100 * wc / wa)`, null when `wa` is 0. Ranked by `acc` descending, nulls last,
  ties by exam weight. `thisTest` is `latest.byDomain[id]` when `examIdx` was given.
- `weakest`: per lesson, `score = here + 0.5 * before + 0.5 * cpWrong` over the same window
  (all misses count, not only the latest test's), the top five with `score > 0`, ties by exam
  weight then course order.

The engine passes its own domains and lessons. The account page needs the same meta, so
`build.py course_meta()` adds `domains` (id, short, name, pct) and `lessons` as
`[{ id, title, domain }]` (parsed from the curriculum files; the existing lesson count comes
from the same match), and `build_account()` inlines `engine/strength.js`. Each course card on
`/account/` gets the ranked bars (small) and a "Weakest:" line with up to three topic links to
`/<id>/#lesson/<lessonId>`, or nothing when `hasData` is false. `catalog.css` gets the small
bar styles.

Home and Progress keep their all-time accuracy bars for now.

## 5. Loaders and tests

`engine/strength.js` is loaded before `app.js` in all seven loaders (build.py, tests/lib.js,
the five course shells) and by `account/index.html` (plus its inline in `build_account()`).
`tests/loaders.js` audits it like the other engine files.

- `tests/strength.js` (new, in `npm test`): window selection, weights, starter exclusion,
  custom tests counting, checkpoints since the previous test, ranking with nulls last, the
  weakest list's cap and order, `examIdx` and `thisTest`, malformed state never throws.
- `tests/retrain.js` (new, in `npm test`, jsdom on the Net+ pack): suggested modes from
  constructed history (1 miss = drill, a repeat miss = lesson, both tests plus a failed
  checkpoint = extended); presets rewrite every mode and the derived preset reads Custom after
  a single chip change; the drill entry opens the drill view and three correct in a row marks
  it done; the deep entry opens with the explanation expanded; the custom-test in-progress card
  and adopt; the next-test button at the top and bottom with retraining unfinished; a legacy
  plan entry without `mode` opens as a lesson; the strength card renders ranked bars and the
  weakest list; Home's next step names the drill.
- `tests/merge.js`: `mergeLesson` carries `lastScore`/`lastAt` from the newer side.
- `tests/summary.js`: a drilled entry counts as done; an undrilled drill entry does not.
- `tests/account.js`: the chart renders on a card with exams and checkpoints; absent without.
- The in-app self-test drives one test with misses through a preset change and a drill entry.

## Out of scope

Freemium gating, Home and Progress chart changes, the SEO pages, and any change to how the
starter test builds the initial tutorial.
