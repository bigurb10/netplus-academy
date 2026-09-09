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

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('\nAll merge tests passed.');
