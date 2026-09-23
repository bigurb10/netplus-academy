// engine/summary.js: the account page's read-only view of one course's progress blob.
// It mirrors stage() and planDone() in engine/app.js. Run: node tests/summary.js
'use strict';
const { summarize } = require('../engine/summary.js');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const META = { lessons: 49, passPct: 80, passesNeeded: 3, passWindow: 5, examQuestions: 50 };
const exam = (kind, pct) => ({ id: 'x' + kind + pct, date: 1000, kind, score: pct, total: 100, pct });
const state = extra => Object.assign({ v: 3, lessons: {}, exams: [], passes: 0, official: null, plan: null, touchedAt: 0 }, extra || {});
const stageOf = extra => summarize(state(extra), META).stage;

check('empty state: starter, not started', (() => { const s = summarize(state(), META); return s.stage === 'starter' && s.started === false && s.lessonsPassed === 0 && s.lessonsTotal === 49; })());
check('starter taken, plan from the starter with lessons left: tutorial',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] } }) === 'tutorial');
check('a plan lesson passed AFTER the plan was made counts as done',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] }, lessons: { u1l1: { status: 'passed', passedAt: 11 } } }) === 'fulltest');
check('a plan lesson passed BEFORE the plan was made does not count',
  stageOf({ exams: [exam('starter', 40)], plan: { source: 'starter', createdAt: 10, lessons: [{ id: 'u1l1' }] }, lessons: { u1l1: { status: 'passed', passedAt: 9 } } }) === 'tutorial');
check('a plan from a test: retrain',
  stageOf({ exams: [exam('starter', 40), exam('full', 60)], plan: { source: 'test', createdAt: 10, lessons: [{ id: 'u1l1' }] } }) === 'retrain');
check('starter done, no plan, no full test yet: fulltest', stageOf({ exams: [exam('starter', 90)] }) === 'fulltest');
check('a practice test taken, passes short: practice', stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passes: 1 }) === 'practice');
check('passes reached, no official pass: official', stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passes: 3 }) === 'official');
check('passes reached and official passed: ready',
  stageOf({ exams: [exam('starter', 90), exam('practice', 90)], passes: 3, official: { examIdx: 1, date: 5000, pct: 91 } }) === 'ready');
check('an official pass is permanent: ready even after the window slid below the bar',
  stageOf({ exams: [exam('starter', 90), exam('practice', 40)], passes: 1, official: { examIdx: 1, date: 5000, pct: 91 } }) === 'ready');
check('the fulltest label carries the course test size', summarize(state({ exams: [exam('starter', 90)] }), META).stageLabel === '50-question test');
check('the ready label', summarize(state({ exams: [exam('starter', 90)], passes: 3, official: { date: 1 } }), META).stageLabel === 'Ready');
{
  const s = summarize(state({ lessons: { a: { status: 'passed' }, b: { status: 'read' }, c: { status: 'passed' }, d: { status: 'new' } } }), META);
  check('lessons passed counts only passed', s.lessonsPassed === 2, s.lessonsPassed);
  check('a read lesson means started', s.started === true);
}
check('best score is the max over full and practice only',
  summarize(state({ exams: [exam('starter', 99), exam('full', 70), exam('practice', 84), exam('custom', 100)] }), META).bestPct === 84);
check('no full or practice test: best score is null', summarize(state({ exams: [exam('starter', 99), exam('custom', 100)] }), META).bestPct === null);
check('passes, passesNeeded and passWindow come through', (() => { const s = summarize(state({ passes: 2 }), META); return s.passes === 2 && s.passesNeeded === 3 && s.passWindow === 5; })());
check('official carries date and pct', (() => { const s = summarize(state({ official: { examIdx: 3, date: 777, pct: 92 } }), META); return !!s.official && s.official.date === 777 && s.official.pct === 92; })());
check('lastStudied is touchedAt, null when unset', summarize(state({ touchedAt: 123 }), META).lastStudied === 123 && summarize(state(), META).lastStudied === null);
check('a null state does not throw', (() => { try { const s = summarize(null, META); return s.stage === 'starter' && s.lessonsPassed === 0; } catch (e) { return false; } })());
check('garbage fields do not throw', (() => { try { const s = summarize({ lessons: 'x', exams: 'y', plan: 5, passes: 'z', official: 'w' }, {}); return s.stage === 'starter' && s.passesNeeded === 3 && s.passWindow === 5 && s.lessonsTotal === 0; } catch (e) { return false; } })());
check('a null entry in exams or plan.lessons is skipped', (() => { try { return stageOf({ exams: [null, exam('starter', 1)], plan: { source: 'starter', createdAt: 1, lessons: [null, { id: 'q' }] } }) === 'tutorial'; } catch (e) { return false; } })());

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All summary tests passed.');
