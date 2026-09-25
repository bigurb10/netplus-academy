// Retraining paths: the score and suggested mode per missed topic, the path picker on the
// results page, opening and finishing entries by mode, and the where-you-stand chart.
// Runs on the Net+ pack under jsdom. Run: node tests/retrain.js
'use strict';
const path = require('path');
const { boot, ROOT } = require('./lib');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const dir = path.join(ROOT, 'courses', 'netplus');
const KEY = 'fra.netplus.state.v3';
const state = w => JSON.parse(w.localStorage.getItem(KEY));
const act = (w, a, arg) => { const b = w.document.createElement('button'); b.dataset.act = a; if (arg != null) b.dataset.arg = arg; w.$('#app').appendChild(b); w.click(b); };
const NOW = Date.now();

// Pack facts, read once. Domain 3's lessons each get exactly one question on every 50-question
// test (quota 9 over 9 lessons), so a miss there is deterministic.
const pack = boot({ courseDir: dir });
const Q = {}; pack.FRA.questions.forEach(q => { Q[q.id] = q; });
const fat = x => typeof x === 'string' ? Q[x] : x;
const lessonsIn = d => { const out = []; pack.FRA.units.forEach(u => u.lessons.forEach(l => { if (l.domain === d) out.push(l); })); return out; };
const D3 = lessonsIn(3);
const T1 = D3[0].id, T2 = D3[1].id;
const DOMAIN_IDS = pack.FRA.course.domains.map(d => d.id);
check(`fixture: domain 3 has a quota equal to its lesson count`, pack.FRA.course.domains.find(d => d.id === 3).quota === D3.length, `${D3.length}`);

// A stored exam record built from real bank questions: `wrong` lessons get one wrong answer each,
// `right` lessons one right answer each.
function mkExam(kind, date, wrong, right) {
  const review = []; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });
  const one = (t, ok) => { const q = pack.FRA.questions.find(x => x.t === t); const choice = ok ? q.c : (q.c + 1) % q.a.length; const lesson = D3.find(l => l.id === t) || findLesson(t);
    review.push({ q: q.id, choice, pick: q.a[choice], conf: ok ? 4 : 3, correct: ok }); byDomain[lesson.domain].t++; if (ok) byDomain[lesson.domain].c++; };
  wrong.forEach(t => one(t, false)); right.forEach(t => one(t, true));
  const score = review.filter(r => r.correct).length;
  return { id: 'x' + date, date, kind, score, total: review.length, pct: Math.round(100 * score / review.length), byDomain, review, seconds: 60, minutes: kind === 'starter' ? 0 : 50, setup: null, noConf: kind !== 'starter' };
}
function findLesson(id) { let out = null; pack.FRA.units.forEach(u => u.lessons.forEach(l => { if (l.id === id) out = l; })); return out; }
const starterRec = () => { const rec = mkExam('starter', NOW - 100000, [], DOMAIN_IDS.map(d => lessonsIn(d)[0].id)); rec.noConf = false; rec.review.forEach(r => { r.conf = 5; }); return rec; };
const seeded = extra => Object.assign({ v: 3, course: 'netplus', view: { name: 'home' }, lessons: {}, qstats: {}, topics: {}, exams: [starterRec()], passes: 0, official: null, plan: null, path: { examIdx: 0, scope: 'tailored' }, pathAt: 1, active: null, settings: { timer: false }, feedback: [], ratings: {}, seen: { cheat: true }, settingsAt: 0, touchedAt: 0, created: 1 }, extra || {});
const bootWith = s => boot({ courseDir: dir, beforeApp: x => { x.localStorage.setItem(KEY, JSON.stringify(s)); } });

// Take a live test, missing every question whose lesson is in `miss`. Ends on the results page.
function takeTest(w, kind, miss) {
  act(w, 'start-exam', kind);
  const items = state(w).active.items;
  items.forEach(it => { const q = fat(it); const k = miss.includes(q.t) ? (q.c + 1) % q.a.length : q.c; w.click(w.$(`[data-act="opt"][data-arg="${k}"]`)); w.click(w.$('[data-act="submit"]')); });
  return state(w);
}
const entry = (s, id) => s.plan && s.plan.lessons.find(e => e.id === id);

// ----- Part 1: the score and the suggested mode -----
{
  const w = bootWith(seeded()); const s = takeTest(w, 'full', [T1]);
  const e = entry(s, T1);
  check('one miss with no history: drill, score 1', !!e && e.mode === 'drill' && e.suggested === 'drill' && e.score === 1 && e.why.here === 1 && e.why.before === 0 && e.why.cpWrong === 0, JSON.stringify(e));
  check('the plan is from this test and only holds missed topics', s.plan.source === 'test' && s.plan.examIdx === s.exams.length - 1 && s.plan.lessons.length === 1, s.plan.lessons.length);
}
{
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])] }));
  const s = takeTest(w, 'practice', [T1]);
  const e = entry(s, T1);
  check('missed here and on the previous test: lesson, score 1.5', !!e && e.mode === 'lesson' && e.score === 1.5 && e.why.before === 1, JSON.stringify(e));
}
{
  const lessons = {}; lessons[T1] = { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: NOW - 20000 };
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])], lessons }));
  const s = takeTest(w, 'practice', [T1]);
  const e = entry(s, T1);
  check('plus a failed checkpoint since the previous test: extended, score 2.5', !!e && e.mode === 'deep' && e.score === 2.5 && e.why.cpWrong === 2, JSON.stringify(e));
}
{
  const lessons = {}; lessons[T1] = { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: NOW - 80000 };
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])], lessons }));
  const s = takeTest(w, 'practice', [T1]);
  check('a checkpoint before the previous test does not count', entry(s, T1).score === 1.5, JSON.stringify(entry(s, T1)));
}
{
  const st = starterRec(); st.review[0] = mkExam('starter', 1, [T1], []).review[0]; st.review[0].conf = 5;
  const w = bootWith(seeded({ exams: [st] }));
  const s = takeTest(w, 'full', [T1]);
  check('the starter test never counts as the previous test', entry(s, T1).score === 1 && entry(s, T1).why.before === 0, JSON.stringify(entry(s, T1)));
}
{
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T2], [T1])] }));
  const s = takeTest(w, 'practice', [T1, T2]);
  check('entries are ordered by score, worst first', s.plan.lessons[0].id === T2 && s.plan.lessons[1].id === T1 && s.plan.lessons[0].score > s.plan.lessons[1].score, s.plan.lessons.map(e => `${e.id}:${e.score}`).join(' '));
  check('a new plan starts on the suggested preset', s.plan.preset === 'suggested');
}
{
  const w = bootWith(seeded()); act(w, 'lesson', T1); act(w, 'start-checkpoint', T1);
  const items = state(w).active.items;
  items.forEach((it, i) => { const q = fat(it); w.click(w.$(`[data-act="opt"][data-arg="${i < 2 ? (q.c + 1) % q.a.length : q.c}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); });
  const ls = state(w).lessons[T1];
  check('a checkpoint end records lastScore and lastAt', ls && ls.lastScore === 2 && ls.lastAt > NOW - 1000, JSON.stringify(ls));
}
{
  const w = bootWith(seeded()); const s = takeTest(w, 'full', [T1]);
  s.topics[T1] = Object.assign(s.topics[T1] || { hist: [], attempts: 0, correct: 0, streak: 0, last: 0 }, { drilledAt: s.plan.createdAt + 1 });
  const w2 = bootWith(s); act(w2, 'go', 'tutorial');
  check('a topic drilled after the plan was made completes its entry', /Tutorial complete/.test(w2.text()), w2.$('h1') && w2.$('h1').textContent);
  s.topics[T1].drilledAt = s.plan.createdAt - 1;
  const w3 = bootWith(s); act(w3, 'go', 'tutorial');
  check('a drill from before the plan does not', /1 lesson to go/.test(w3.text()), w3.$('h1') && w3.$('h1').textContent);
}

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All retrain tests passed.');
