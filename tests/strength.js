// engine/strength.js: the recency-weighted strongest/weakest picture shared by the results
// page and the account page. Pure functions only. Run: node tests/strength.js
'use strict';
const ST = require('../engine/strength.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const META = {
  checkpointN: 4,
  domains: [{ id: 1, short: 'A', name: 'Alpha', pct: 60 }, { id: 2, short: 'B', name: 'Beta', pct: 40 }],
  lessons: [{ id: 'a1', title: 'A one', domain: 1 }, { id: 'a2', title: 'A two', domain: 1 }, { id: 'b1', title: 'B one', domain: 2 }]
};
// A review item names its lesson through the question: generated questions are stored fat ({t}),
// bank questions by id, which meta.questions maps to a lesson.
const rv = (t, correct) => ({ q: { t }, correct });
const exam = (kind, date, review, byDomain) => ({ id: kind + date, kind, date, pct: 50, review, byDomain: byDomain || null });
const accs = r => JSON.stringify(r.domains.map(d => [d.id, d.acc]));

check('module loads and reports its version', ST.VERSION === 1, ST.VERSION);
check('empty state has no data and never throws', (() => { const r = ST.compute({}, META); return r.hasData === false && r.domains.length === 2 && r.weakest.length === 0; })());
check('garbage state never throws', (() => { const r = ST.compute({ exams: [null, 7, { kind: 'practice', review: [null, { q: null }, { q: { t: 'zz' }, correct: false }] }], lessons: { a1: 'x' } }, META); return r.hasData === false; })());
check('the starter test alone contributes nothing', ST.compute({ exams: [exam('starter', 1, [rv('a1', false)])] }, META).hasData === false);
{
  const r = ST.compute({ exams: [exam('starter', 1, [rv('a1', false)]), exam('full', 2, [rv('a1', true), rv('a2', false), rv('b1', true)])] }, META);
  check('latest test alone: A 50%, B 100%, ranked B first', r.domains[0].id === 2 && r.domains[0].acc === 100 && r.domains[1].acc === 50, accs(r));
  check('weakest lists the missed topic with score 1', r.weakest.length === 1 && r.weakest[0].id === 'a2' && r.weakest[0].score === 1 && r.weakest[0].here === 1, JSON.stringify(r.weakest));
  check('latestIdx and previousIdx skip the starter', r.latestIdx === 1 && r.previousIdx === -1, `${r.latestIdx}/${r.previousIdx}`);
}
{
  const s = { exams: [exam('practice', 1, [rv('a1', false), rv('b1', true)]), exam('practice', 2, [rv('a1', false), rv('b1', false)])] };
  const r = ST.compute(s, META);
  check('previous test weighs half: A 0%, B 33%', r.domains.find(d => d.id === 1).acc === 0 && r.domains.find(d => d.id === 2).acc === 33, accs(r));
  check('a topic missed on both tests scores 1.5', r.weakest[0].id === 'a1' && r.weakest[0].score === 1.5 && r.weakest[0].before === 1, JSON.stringify(r.weakest[0]));
}
{
  const s = { exams: [exam('practice', 10, [rv('a1', false)]), exam('practice', 20, [rv('a1', false)])], lessons: { a1: { lastScore: 2, lastAt: 15 }, a2: { lastScore: 4, lastAt: 5 } } };
  const r = ST.compute(s, META);
  const a = r.domains.find(d => d.id === 1);
  check('a checkpoint after the previous test counts, one before it does not', r.weakest[0].cpWrong === 2 && r.weakest[0].score === 2.5 && a.wa === 1 + 0.5 + 0.5 * 4, `${JSON.stringify(r.weakest[0])} wa=${a.wa}`);
}
{
  const s = { exams: [exam('practice', 10, [rv('a1', true)])], lessons: { a1: { lastScore: 3, lastAt: 20 } } };
  const r = ST.compute(s, META);
  check('a checkpoint taken after the latest test counts too (standing now)', r.weakest.length === 1 && r.weakest[0].cpWrong === 1 && r.weakest[0].score === 0.5, JSON.stringify(r.weakest));
}
check('custom tests are tests', ST.compute({ exams: [exam('custom', 1, [rv('b1', false)])] }, META).weakest[0].id === 'b1');
{
  const r = ST.compute({ exams: [exam('practice', 1, [rv('a1', true)])] }, META);
  check('a domain with no data sorts last with acc null', r.domains[1].id === 2 && r.domains[1].acc === null, accs(r));
}
{
  const r = ST.compute({ lessons: { a1: { lastScore: 1, lastAt: 5 } } }, META);
  check('checkpoints alone give data when no test exists', r.hasData && r.domains[0].id === 1 && r.domains[0].acc === 25 && r.domains[1].acc === null && r.weakest[0].cpWrong === 3, accs(r));
}
{
  const exams = [exam('practice', 1, [rv('a1', false)], { 1: { c: 0, t: 1 }, 2: { c: 0, t: 0 } }), exam('practice', 2, [rv('a1', true)], { 1: { c: 1, t: 1 }, 2: { c: 0, t: 0 } })];
  const r = ST.compute({ exams }, META, 0);
  check('examIdx picks that test as latest with thisTest from byDomain', r.latestIdx === 0 && r.previousIdx === -1 && r.domains.find(d => d.id === 1).thisTest.c === 0 && r.domains.find(d => d.id === 1).thisTest.t === 1, JSON.stringify(r.domains));
  check('without examIdx there is no thisTest', ST.compute({ exams }, META).domains[0].thisTest === null);
  check('windowOf finds the previous non-starter test', (() => { const w = ST.windowOf([exam('starter', 0, []), exams[0], exams[1]]); return w.latestIdx === 2 && w.previousIdx === 1; })());
  check('windowOf with a starter examIdx falls back to the latest test', ST.windowOf([exam('starter', 0, []), exams[0]], 0).latestIdx === 1);
}
{
  const many = ['a1', 'a2', 'b1', 'a1', 'a2', 'b1', 'a1'].map(t => rv(t, false));
  const r = ST.compute({ exams: [exam('practice', 1, many)], lessons: { x9: { lastScore: 0, lastAt: 2 } } }, META);
  check('weakest is capped at five, ordered by score, and ignores unknown lessons', r.weakest.length === 3 && r.weakest[0].id === 'a1' && r.weakest[0].score === 3 && r.weakest.every(w => META.lessons.some(l => l.id === w.id)), JSON.stringify(r.weakest.map(w => [w.id, w.score])));
}
{
  const r = ST.compute({ exams: [exam('practice', 1, [rv('a1', false), rv('b1', false)])] }, META);
  check('ties in the weakest list break by the domain exam weight', r.weakest[0].id === 'a1' && r.weakest[1].id === 'b1', JSON.stringify(r.weakest.map(w => w.id)));
}
check('a question stored by id resolves through meta.questions', ST.compute({ exams: [exam('practice', 1, [{ q: 'q7', correct: false }])] }, Object.assign({ questions: { q7: 'b1' } }, META)).weakest[0].id === 'b1');
check('without meta.questions, a bank id resolves by its <lesson>-<n> spelling', ST.compute({ exams: [exam('practice', 1, [{ q: 'b1-3', correct: false }, { q: 'zz-1', correct: false }])] }, META).weakest.map(w => w.id).join() === 'b1');
check('a lastScore above checkpointN is clamped', ST.compute({ lessons: { a1: { lastScore: 9, lastAt: 5 } } }, META).weakest.length === 0);
// A lesson in an untested domain (quota 0) is course content outside the exam: both callers list
// the tested domains only, so it is never ranked, however badly its checkpoint went.
{
  const untested = Object.assign({}, META, { lessons: META.lessons.concat([{ id: 'x1', title: 'X one', domain: 9 }]) });
  const r = ST.compute({ lessons: { x1: { lastScore: 0, lastAt: 5 } } }, untested);
  check('a lesson whose domain is absent from meta.domains never appears in weakest', r.weakest.length === 0, JSON.stringify(r.weakest));
}

if (fails.length) { console.error(`strength: ${fails.length} failed`); process.exit(1); }
console.log('strength: all OK'); process.exit(0);
