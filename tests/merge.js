// Unit tests for engine/merge.js. Pure functions only - no jsdom, no DOM, no network.
const M = require('../engine/merge.js');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

check('module loads under node', typeof M === 'object' && M !== null);
check('module reports its version', M.VERSION === 1, M.VERSION);

// ---------- recomputeStreak ----------
const std = { mode: 'standard', n: 90, minutes: 90 };
const exam = (o) => Object.assign({ date: 1, kind: 'practice', pct: 80, total: 50, minutes: 0, setup: null }, o);
const OPTS = { passPct: 80, streakNeeded: 3 };

check('empty log gives a zero streak',
  JSON.stringify(M.recomputeStreak([], OPTS)) === JSON.stringify({ passStreak: 0, official: null }));

check('three passes make a streak of three',
  M.recomputeStreak([exam({date:1}), exam({date:2}), exam({date:3})], OPTS).passStreak === 3);

check('a failure resets the streak to zero',
  M.recomputeStreak([exam({date:1}), exam({date:2}), exam({date:3, pct:60})], OPTS).passStreak === 0);

check('starter tests never move the streak',
  M.recomputeStreak([exam({date:1, kind:'starter', pct:30}), exam({date:2})], OPTS).passStreak === 1);

check('custom tests never move the streak',
  M.recomputeStreak([exam({date:1}), exam({date:2, kind:'custom', pct:10}), exam({date:3})], OPTS).passStreak === 2);

const officialLog = [exam({date:1}), exam({date:2}), exam({date:3}), exam({date:4, minutes:90, setup:std, pct:85})];
check('an official pass after a complete streak is recorded',
  M.recomputeStreak(officialLog, OPTS).official !== null);
check('the official record points at the right index',
  M.recomputeStreak(officialLog, OPTS).official.examIdx === 3,
  JSON.stringify(M.recomputeStreak(officialLog, OPTS).official));

check('an official pass before the streak is complete does not count',
  M.recomputeStreak([exam({date:1}), exam({date:2, minutes:90, setup:std, pct:85})], OPTS).official === null);

check('a later failure revokes the official pass',
  M.recomputeStreak(officialLog.concat([exam({date:5, pct:50})]), OPTS).official === null);

check('examIdx counts skipped records',
  M.recomputeStreak([exam({date:1, kind:'starter', pct:20}), exam({date:2}), exam({date:3}), exam({date:4}),
                     exam({date:5, minutes:90, setup:std, pct:85})], OPTS).official.examIdx === 4);

check('official award requires prior complete streak, not the current exam itself',
  M.recomputeStreak([exam({date:1}), exam({date:2}), exam({date:3, minutes:90, setup:std, pct:85})], OPTS).official === null);

// ---------- examId ----------
check('an explicit id is preserved', M.examId(exam({ id: 'x1' })) === 'x1');
check('a synthesized id is deterministic',
  M.examId(exam({ date: 7, pct: 82 })) === M.examId(exam({ date: 7, pct: 82 })));
check('records differing by date get different ids',
  M.examId(exam({ date: 7 })) !== M.examId(exam({ date: 8 })));
check('records differing by kind get different ids',
  M.examId(exam({ date: 7, kind: 'practice' })) !== M.examId(exam({ date: 7, kind: 'starter' })));
check('records differing by total get different ids',
  M.examId(exam({ date: 7, total: 50 })) !== M.examId(exam({ date: 7, total: 60 })));
check('records differing by pct get different ids',
  M.examId(exam({ date: 7, pct: 82 })) !== M.examId(exam({ date: 7, pct: 83 })));
check('a synthesized id is a string', typeof M.examId(exam({})) === 'string');
check('null record returns empty string', M.examId(null) === '');
check('undefined record returns empty string', M.examId(undefined) === '');

// ---------- mergeMaps ----------
const st = (o) => Object.assign({ lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {} }, o);

let m = M.mergeMaps(
  st({ lessons: { a: { status: 'read', best: 40, attempts: 2, passedAt: 0 } } }),
  st({ lessons: { a: { status: 'passed', best: 90, attempts: 1, passedAt: 500 } } }));
check('lesson status takes the higher rank', m.lessons.a.status === 'passed', m.lessons.a.status);
check('lesson best takes the max', m.lessons.a.best === 90, m.lessons.a.best);
check('lesson attempts take the max, not the sum', m.lessons.a.attempts === 2, m.lessons.a.attempts);
check('lesson passedAt takes the max', m.lessons.a.passedAt === 500);

m = M.mergeMaps(st({ lessons: { a: { status: 'passed', best: 90, attempts: 1, passedAt: 5 } } }),
                st({ lessons: { b: { status: 'read', best: 10, attempts: 1, passedAt: 0 } } }));
check('disjoint lessons union', !!m.lessons.a && !!m.lessons.b);

m = M.mergeMaps(st({ lessons: { a: { status: 'passed', best: 90, attempts: 1, passedAt: 5 } } }),
                st({ lessons: { a: { status: 'read', best: 10, attempts: 1, passedAt: 0 } } }));
check('lesson status-rank test reversed: x has higher rank (passed), y lower (read)', m.lessons.a.status === 'passed', m.lessons.a.status);

m = M.mergeMaps(st({ qstats: { q1: { seen: 5, correct: 3, wrong: 2, last: 10 } } }),
                st({ qstats: { q1: { seen: 2, correct: 2, wrong: 0, last: 99 } } }));
check('qstats take the max of each counter',
  m.qstats.q1.seen === 5 && m.qstats.q1.correct === 3 && m.qstats.q1.wrong === 2 && m.qstats.q1.last === 99,
  JSON.stringify(m.qstats.q1));

m = M.mergeMaps(st({ topics: { t1: { hist: [1,1], attempts: 2, correct: 0, streak: 0, last: 10 } } }),
                st({ topics: { t1: { hist: [0,0,0], attempts: 3, correct: 3, streak: 3, last: 50 } } }));
check('topics take the whole more recent record', m.topics.t1.streak === 3 && m.topics.t1.hist.length === 3,
  JSON.stringify(m.topics.t1));

m = M.mergeMaps(st({ topics: { t1: { hist: [1,1,1], attempts: 5, correct: 5, streak: 5, last: 10 } } }),
                st({ topics: { t1: { hist: [0], attempts: 1, correct: 0, streak: 0, last: 50 } } }));
check('topics whole-record merge: newer record with lower streak wins', m.topics.t1.streak === 0 && m.topics.t1.attempts === 1,
  JSON.stringify(m.topics.t1));

m = M.mergeMaps(st({ ratings: { a: { r: 4, ts: 10 } } }), st({ ratings: { a: { r: 9, ts: 99 } } }));
check('ratings take the entry with the later ts', m.ratings.a.r === 9, m.ratings.a.r);

m = M.mergeMaps(st({ ratings: { a: { r: 9, ts: 10 } } }), st({ ratings: { a: { r: 2, ts: 99 } } }));
check('ratings recency-based: later ts with lower r wins', m.ratings.a.r === 2 && m.ratings.a.ts === 99,
  JSON.stringify(m.ratings.a));

m = M.mergeMaps(st({ seen: { a: true } }), st({ seen: { b: true } }));
check('seen unions', m.seen.a === true && m.seen.b === true);

// ---------- mergeState ----------
const full = (o) => Object.assign({
  v: 3, course: 'netplus', lessons: {}, topics: {}, qstats: {}, seen: {}, ratings: {},
  exams: [], feedback: [], passStreak: 0, official: null, plan: null, path: null,
  settings: { timer: true }, touchedAt: 0, created: 1
}, o);

let r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                     full({ exams: [exam({ id: 'e2', date: 2 })] }), OPTS);
check('exams union by id', r.exams.length === 2, r.exams.length);
check('exams sort by date', r.exams[0].id === 'e1' && r.exams[1].id === 'e2');

r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                 full({ exams: [exam({ id: 'e1', date: 1 })] }), OPTS);
check('the same exam on both sides appears once', r.exams.length === 1, r.exams.length);

// The case the whole design exists for: A has a three-pass streak, B has a later failure.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2}), exam({id:'a3',date:3})], passStreak: 3 }),
  full({ exams: [exam({id:'b1',date:4,pct:50})], passStreak: 0 }), OPTS);
check('a later failure on the other device resets the merged streak', r.passStreak === 0, r.passStreak);

// An official pass must not survive a later failure recorded elsewhere.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2}), exam({id:'a3',date:3}),
                 exam({id:'a4',date:4,minutes:90,setup:std,pct:85})],
         passStreak: 4, official: { examIdx: 3, date: 4, pct: 85 } }),
  full({ exams: [exam({id:'b1',date:5,pct:40})] }), OPTS);
check('a later failure revokes a merged official pass', r.official === null, JSON.stringify(r.official));

// examIdx must be resolved against the merged array, not inherited.
r = M.mergeState(
  full({ exams: [exam({id:'a1',date:2}), exam({id:'a2',date:3}), exam({id:'a3',date:4}),
                 exam({id:'a4',date:5,minutes:90,setup:std,pct:85})],
         official: { examIdx: 3, date: 5, pct: 85 } }),
  full({ exams: [exam({id:'b1',date:1,kind:'starter',pct:20})] }), OPTS);
check('official.examIdx is recomputed against the merged array', r.official.examIdx === 4,
  JSON.stringify(r.official));
check('the exam it points at is the official one', r.exams[r.official.examIdx].id === 'a4');

r = M.mergeState(full({ path: 'fast', touchedAt: 10 }), full({ path: 'thorough', touchedAt: 99 }), OPTS);
check('path comes from the more recently touched side', r.path === 'thorough', r.path);

r = M.mergeState(full({ feedback: [{ id: 'f1', ts: 1, sent: false }] }),
                 full({ feedback: [{ id: 'f1', ts: 1, sent: true }, { id: 'f2', ts: 2 }] }), OPTS);
check('feedback unions by id', r.feedback.length === 2, r.feedback.length);
check('a sent feedback flag survives the merge', r.feedback.filter(f => f.id === 'f1')[0].sent === true);

r = M.mergeState(full({ view: { name: 'exam' }, active: { kind: 'practice' } }), full({}), OPTS);
check('view is never synced', r.view === undefined, JSON.stringify(r.view));
check('active is never synced', r.active === undefined, JSON.stringify(r.active));

const one = full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2})], lessons: { a: { status:'passed', best:90, attempts:1, passedAt:5 } } });
check('merge is idempotent', JSON.stringify(M.mergeState(one, one, OPTS)) === JSON.stringify(M.mergeState(M.mergeState(one, one, OPTS), one, OPTS)));

const A = full({ exams: [exam({id:'a1',date:1})], lessons: { a: { status:'passed', best:90, attempts:2, passedAt:5 } } });
const B = full({ exams: [exam({id:'b1',date:2})], lessons: { a: { status:'read', best:40, attempts:1, passedAt:0 } } });
check('merge is commutative',
  JSON.stringify(M.mergeState(A, B, OPTS)) === JSON.stringify(M.mergeState(B, A, OPTS)));

// A genuine duplicate exam id (not an identical record) must keep the higher pct regardless of
// which side reports it first - "always keep the first-seen entry" would pass the earlier
// identical-duplicate test but fail here.
r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1, pct: 60 })] }),
                 full({ exams: [exam({ id: 'e1', date: 1, pct: 90 })] }), OPTS);
check('a duplicate exam id keeps the higher pct', r.exams.length === 1 && r.exams[0].pct === 90, r.exams[0].pct);

r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1, pct: 90 })] }),
                 full({ exams: [exam({ id: 'e1', date: 1, pct: 60 })] }), OPTS);
check('the higher pct wins no matter which side reports it first', r.exams[0].pct === 90, r.exams[0].pct);

// The brief's feedback test only exercises sent:true arriving second. A naive "later item always
// wins" rule would also pass that, so check the flag survives with the order swapped too.
r = M.mergeState(full({ feedback: [{ id: 'f1', ts: 1, sent: true }] }),
                 full({ feedback: [{ id: 'f1', ts: 1, sent: false }] }), OPTS);
check('a sent feedback flag survives no matter which side reports it first', r.feedback[0].sent === true,
  JSON.stringify(r.feedback[0]));

// The brief's path test only exercises the more-recently-touched side being `b`. Swap it to `a`
// so an "always take b's path" bug (which would also pass the brief's own case) gets caught.
r = M.mergeState(full({ path: 'thorough', touchedAt: 99 }), full({ path: 'fast', touchedAt: 10 }), OPTS);
check('path still comes from the more recently touched side when that side is passed first',
  r.path === 'thorough', r.path);

// `created` uses Infinity as a sentinel for "missing" so a real 0 never wins the Math.min by
// accident; isFinite() must convert that sentinel back to 0 rather than leaking Infinity (which
// JSON.stringify turns into null) when both sides are missing it.
r = M.mergeState(full({ created: 500 }), full({ created: 200 }), OPTS);
check('created takes the earlier of two real timestamps', r.created === 200, r.created);

r = M.mergeState(full({ created: 500 }), full({ created: undefined }), OPTS);
check('created keeps the real value when the other side is missing it', r.created === 500, r.created);

r = M.mergeState(full({ created: undefined }), full({ created: undefined }), OPTS);
check('created falls back to 0, not Infinity or null, when neither side has one', r.created === 0, r.created);

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('\nAll merge tests passed.');
