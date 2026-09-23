# Pass Rule, Sureness, and Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace "three in a row at 85%" with "three of the last five at 80%, then one official-format pass at the exam's own threshold"; ask sureness only on the starter test; give every wrong answer a your-answer / correct-answer / why review with an optional lesson link and a next-test button.

**Architecture:** One pure fold in `engine/merge.js` computes `passes` and `official` from the exam log and is called by `finishExam`, `mergeState`, and `load()`. `engine/app.js` reads the rule from the manifest (`test.passPct/passesNeeded/passWindow`, `exam.passPct`). Copy is generated from those constants everywhere it appears.

**Tech Stack:** plain browser JS, jsdom tests (`node tests/<name>.js`), `python build.py`, `npm run build:site`.

Spec: `docs/superpowers/specs/2026-09-23-pass-rule-sureness-review-design.md`.

## Global Constraints

- Manifest fields: `test.passPct = 80`, `test.passesNeeded = 3`, `test.passWindow = 5`, `exam.passPct` = 80 / 83 / 75 / 78 / 70 for netplus / secplus / aplus1 / aplus2 / cbet. Fixture `tests/fixtures/mini`: `test.passPct 80, passesNeeded 2, passWindow 3`, `exam.passPct 70`.
- `FRAMerge.recomputeQualification(exams, { passPct, passesNeeded, passWindow, officialPct }) -> { passes, official }`; throws unless all four are finite numbers.
- State field `passes` (never `passStreak`); `official` permanent.
- No confidence chips anywhere but the starter test; recorded conf defaults to 4 (right) / 3 (wrong) when absent.
- `npm test` green after every task. Commit after every task.

---

### Task 1: the fold (`engine/merge.js`, `tests/merge.js`)
- [ ] Rewrite the `recomputeStreak` section of `tests/merge.js` for `recomputeQualification`: empty log -> `{passes:0, official:null}`; three passes -> 3; window of five keeps the last five only (six passes then two fails -> 3); starter and custom ignored; official counted only when qualified before it and `pct >= officialPct`; a later fail never revokes it; the opts guard throws for each missing/NaN field. Update the two `mergeState` streak cases (`passes`, permanent official).
- [ ] Run `node tests/merge.js` -> fails on the missing function.
- [ ] Implement `recomputeQualification` in `merge.js`; `mergeState` emits `passes`; export it (keep no alias).
- [ ] Green; commit `feat(merge): 3-of-5 qualification fold, permanent official pass`.

### Task 2: manifests, sync, summary, build, site, catalog copy
- [ ] Five `courses/<id>/course.js` + the mini fixture: new `test` fields, `exam.passPct`, `realExamNote` rewritten.
- [ ] `engine/sync.js` `mergeOpts()` passes the four fields.
- [ ] `engine/summary.js`: meta `passesNeeded`/`passWindow`, state `passes`, stage order per spec, output `passes, passesNeeded, passWindow`. `tests/summary.js` updated. `account/index.html` fact "Passes: N of 3 in last 5". `build.py` `course_meta` reads the new fields.
- [ ] `site/build-site.js` HOW step 5; `index.html` hero paragraph and step 5.
- [ ] `npm test` green (engine tests still on the old app -- expected to break in Task 3 only); commit.

### Task 3: the app (`engine/app.js`, `tests/engine.js`)
- [ ] Constants: `PASS_PCT, PASSES_NEEDED, PASS_WINDOW, OFFICIAL_PCT`. `fresh()` -> `passes: 0`. `load()` recomputes `passes`/`official` via the fold and deletes `passStreak`.
- [ ] `stage()`, `readiness()`, `nextAction()`, welcome list, home stat, tests hub heading/paragraph/history pill, results (`passed`, pills, banners, copy, next-test buttons, `reviewItem`), readiness report, `finishExam` fold call, header comment.
- [ ] Sureness: `startExam` `noConf: kind !== 'starter'`; checkpoint and drill sessions `noConf: true`; `cpScore`; checkpoint copy; drill copy; `submitAnswer` default conf; `questionCard` verdict guard.
- [ ] Self-test (`runSelfTest`) rewritten for the new rule and no-conf checkpoints.
- [ ] `tests/engine.js`: drop `conf` clicks in checkpoint drivers; `passes` in the import case; add: checkpoint shows no chips and passes on 3 of 4; practice test shows no chips; results page has the next-test button and the Your answer / Correct answer / Why lines.
- [ ] `npm test` green; commit.

### Task 4: build, stage, deploy
- [ ] `python build.py`; `npm run build:site`; smoke the built account page; stage everything; Blake's copy command; verify live; commit `dist/`.
