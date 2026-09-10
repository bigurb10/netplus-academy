// Unit tests for engine/merge.js. Pure functions only - no jsdom, no DOM, no network - except
// the round-trip block at the end of this file, which boots the real engine in jsdom to produce
// genuine state to merge.
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

// A malformed opts must throw, not silently replay to passStreak: 0 - e.pct >= undefined is
// false for every record, so a missing passPct would otherwise erase a real streak with no error.
const throws = fn => { try { fn(); return false; } catch (e) { return true; } };
check('recomputeStreak throws when opts is missing entirely',
  throws(() => M.recomputeStreak([exam({date:1})], undefined)));
check('recomputeStreak throws when passPct is missing',
  throws(() => M.recomputeStreak([exam({date:1})], { streakNeeded: 3 })));
check('recomputeStreak throws when streakNeeded is missing',
  throws(() => M.recomputeStreak([exam({date:1})], { passPct: 80 })));
// typeof NaN is 'number', so a typeof guard would let NaN through - and a NaN passPct makes
// every comparison false, reproducing the exact silent zeroing the guard exists to stop.
check('recomputeStreak throws when passPct is NaN',
  throws(() => M.recomputeStreak([exam({date:1})], { passPct: NaN, streakNeeded: 3 })));
check('recomputeStreak throws when streakNeeded is NaN',
  throws(() => M.recomputeStreak([exam({date:1})], { passPct: 80, streakNeeded: NaN })));
check('recomputeStreak does not throw when both opts fields are present',
  !throws(() => M.recomputeStreak([exam({date:1})], OPTS)));
check('mergeState propagates the same guard through to its opts argument',
  throws(() => M.mergeState({ exams: [] }, { exams: [] }, {})));

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
  settings: { timer: true }, settingsAt: 0, touchedAt: 0, created: 1
}, o);

let r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                     full({ exams: [exam({ id: 'e2', date: 2 })] }), OPTS);
check('exams union by id', r.exams.length === 2, r.exams.length);
check('exams sort by date', r.exams[0].id === 'e1' && r.exams[1].id === 'e2');

r = M.mergeState(full({ exams: [exam({ id: 'e1', date: 1 })] }),
                 full({ exams: [exam({ id: 'e1', date: 1 })] }), OPTS);
check('the same exam on both sides appears once', r.exams.length === 1, r.exams.length);

// Two distinct exams sharing a date, on opposite sides, so the sort's date comparison alone is 0
// and the examId tie-break is the only thing giving the order a defined, examId-based result
// rather than depending on Array.prototype.sort's stability plus the concat order of a/b.
r = M.mergeState(full({ exams: [exam({ id: 'z-exam', date: 5 })] }),
                 full({ exams: [exam({ id: 'a-exam', date: 5 })] }), OPTS);
check('exams sharing a date break the tie by examId, ascending',
  r.exams[0].id === 'a-exam' && r.exams[1].id === 'z-exam',
  JSON.stringify(r.exams.map(e => e.id)));

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
check('passStreak is replayed, not inherited from either input', r.passStreak === 4, r.passStreak);

// ---------- plan/path examIdx remap ----------
// plan.examIdx and path.examIdx carry the same hazard official.examIdx does above: the merged
// exam log is re-sorted, so an index inherited verbatim can end up pointing at a different
// record. Exercise a case where the other device's exams sort *before* the referenced exam, so
// the correct index differs from the inherited one.
const planTargetExam = exam({ id: 'plan-target', date: 5 });
r = M.mergeState(
  full({ exams: [planTargetExam], plan: { examIdx: 0, createdAt: 100, lessons: [] } }),
  full({ exams: [exam({ id: 'plan-earlier', date: 1 })] }), OPTS);
check('plan.examIdx is remapped after the merged exams resort', r.plan.examIdx === 1, JSON.stringify(r.plan));
check('the plan still points at the exam it was originally built from',
  r.exams[r.plan.examIdx].id === 'plan-target', JSON.stringify(r.exams[r.plan.examIdx]));

const pathTargetExam = exam({ id: 'path-target', date: 5 });
r = M.mergeState(
  full({ exams: [exam({ id: 'path-earlier', date: 1 })], touchedAt: 10 }),
  full({ exams: [pathTargetExam], path: { examIdx: 0, scope: 'tailored' }, touchedAt: 50 }), OPTS);
check('path.examIdx is remapped after the merged exams resort', r.path.examIdx === 1, JSON.stringify(r.path));
check('the path still points at the exam it was originally built from',
  r.exams[r.path.examIdx].id === 'path-target', JSON.stringify(r.exams[r.path.examIdx]));

r = M.mergeState(full({ plan: null, path: null }), full({ plan: null, path: null }), OPTS);
check('a null plan and a null path pass through without throwing',
  r.plan === null && r.path === null, JSON.stringify({ plan: r.plan, path: r.path }));

const planRefA = { examIdx: 0, createdAt: 5, lessons: [] };
const stateWithPlanA = full({ exams: [exam({ id: 'plan-ref', date: 1 })], plan: planRefA });
const stateWithPlanB = full({ exams: [] });
r = M.mergeState(stateWithPlanA, stateWithPlanB, OPTS);
check('the merged plan is not the same object reference as either input',
  r.plan !== stateWithPlanA.plan && r.plan !== stateWithPlanB.plan, JSON.stringify(r.plan));

// The path tests below use the real { examIdx, scope } shape - previously modeled as a bare
// string, which is what let the un-remapped examIdx bug through undetected.
const tailoredExam = exam({ id: 'path-tailored', date: 1 });
const fullExam = exam({ id: 'path-full', date: 2 });
r = M.mergeState(
  full({ path: { examIdx: 0, scope: 'tailored' }, exams: [tailoredExam], touchedAt: 10 }),
  full({ path: { examIdx: 0, scope: 'full' }, exams: [fullExam], touchedAt: 99 }), OPTS);
check('path comes from the more recently touched side', r.path.scope === 'full', JSON.stringify(r.path));

// A device that has been merely opened has touchedAt = Date.now() and path: null from fresh(),
// with no path choice of its own. Taking path from `newer` with no fallback lets that null win
// and erases a real path choice made on the other, less-recently-touched device - the starter
// results page would re-prompt "Choose your path" for a decision already made.
const laptopPathExam = exam({ id: 'laptop-exam', date: 5 });
const phonePathExam = exam({ id: 'phone-exam', date: 1 });
r = M.mergeState(
  full({ exams: [laptopPathExam], path: { examIdx: 0, scope: 'full' }, touchedAt: 1000 }),
  full({ exams: [phonePathExam], path: null, touchedAt: 2000 }), OPTS);
check('a real path choice survives when the more-recently-touched side never chose one',
  r.path !== null && r.path.scope === 'full', JSON.stringify(r.path));
check('the surviving path still resolves to the exam it was originally built from',
  !!r.path && r.exams[r.path.examIdx].id === 'laptop-exam',
  r.path && JSON.stringify(r.exams[r.path.examIdx]));

r = M.mergeState(full({ feedback: [{ id: 'f1', ts: 1, sent: false }] }),
                 full({ feedback: [{ id: 'f1', ts: 1, sent: true }, { id: 'f2', ts: 2 }] }), OPTS);
check('feedback unions by id', r.feedback.length === 2, r.feedback.length);
check('a sent feedback flag survives the merge', r.feedback.filter(f => f.id === 'f1')[0].sent === true);

r = M.mergeState(full({ view: { name: 'exam' }, active: { kind: 'practice' } }), full({}), OPTS);
check('view is never synced', r.view === undefined, JSON.stringify(r.view));
check('active is never synced', r.active === undefined, JSON.stringify(r.active));

const one = full({ exams: [exam({id:'a1',date:1}), exam({id:'a2',date:2})], lessons: { a: { status:'passed', best:90, attempts:1, passedAt:5 } } });
check('merge is idempotent', JSON.stringify(M.mergeState(one, one, OPTS)) === JSON.stringify(M.mergeState(M.mergeState(one, one, OPTS), one, OPTS)));

// topics/qstats/ratings are populated on both sides so a "return the other side" or "return one
// side's raw field" bug (which only the argument order to mergeBy would expose) shows up as an
// asymmetry between mergeState(A, B) and mergeState(B, A). The recency-bearing field (last for
// topics, ts for ratings) favours A on one key and B on another so neither side wins outright,
// and qstats' single record has different counters winning from different sides (A has the
// bigger seen and wrong, B has the bigger correct and last). Both sides use the same key sets in
// the same insertion order (t1/t2, q1, r1/r2) - mergeBy's key list comes from
// Object.assign({}, a, b), so disjoint keys would reorder between call directions and fail this
// JSON.stringify comparison even when the merged content is identical.
const A = full({
  exams: [exam({id:'a1',date:1})], lessons: { a: { status:'passed', best:90, attempts:2, passedAt:5 } },
  topics: {
    t1: { hist:[1], attempts:1, correct:1, streak:1, last:100 },
    t2: { hist:[0], attempts:1, correct:0, streak:0, last:20 }
  },
  qstats: { q1: { seen:5, correct:1, wrong:4, last:1 } },
  ratings: { r1: { r:5, ts:100 }, r2: { r:3, ts:20 } }
});
const B = full({
  exams: [exam({id:'b1',date:2})], lessons: { a: { status:'read', best:40, attempts:1, passedAt:0 } },
  topics: {
    t1: { hist:[0], attempts:2, correct:0, streak:0, last:10 },
    t2: { hist:[1,1], attempts:3, correct:3, streak:3, last:200 }
  },
  qstats: { q1: { seen:2, correct:6, wrong:1, last:9 } },
  ratings: { r1: { r:2, ts:10 }, r2: { r:8, ts:200 } }
});
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
r = M.mergeState(
  full({ path: { examIdx: 0, scope: 'full' }, exams: [fullExam], touchedAt: 99 }),
  full({ path: { examIdx: 0, scope: 'tailored' }, exams: [tailoredExam], touchedAt: 10 }), OPTS);
check('path still comes from the more recently touched side when that side is passed first',
  r.path.scope === 'full', JSON.stringify(r.path));

// `created` uses Infinity as a sentinel for "missing" so a real 0 never wins the Math.min by
// accident; isFinite() must convert that sentinel back to 0 rather than leaking Infinity (which
// JSON.stringify turns into null) when both sides are missing it.
r = M.mergeState(full({ created: 500 }), full({ created: 200 }), OPTS);
check('created takes the earlier of two real timestamps', r.created === 200, r.created);

r = M.mergeState(full({ created: 500 }), full({ created: undefined }), OPTS);
check('created keeps the real value when the other side is missing it', r.created === 500, r.created);

r = M.mergeState(full({ created: undefined }), full({ created: undefined }), OPTS);
check('created falls back to 0, not Infinity or null, when neither side has one', r.created === 0, r.created);

// settings/course must never come back as undefined: harmless through JSON, but the sync layer
// assigns the merged object straight into live state, where `settings: undefined` overwrites the
// default and the next `S.settings.timer` read throws.
r = M.mergeState(full({ settings: undefined, course: undefined }), full({ settings: undefined, course: undefined }), OPTS);
check('settings falls back to {} when neither side has one', JSON.stringify(r.settings) === '{}', JSON.stringify(r.settings));
check('course falls back to null when neither side has one', r.course === null, r.course);

// plan must remap against its own source side (planSide), not the more-recently-touched side
// (newer), even when they differ. The bug would be invisible if every fixture had planSide === newer.
// This test ensures planSide and newer are different sides with different exam arrays.
const planExamA = exam({ id: 'plan-diverge-a', date: 9 });
const pathExamB = exam({ id: 'plan-diverge-b', date: 1 });
r = M.mergeState(
  full({ exams: [planExamA], plan: { examIdx: 0, createdAt: 100, lessons: [] }, touchedAt: 10 }),
  full({ exams: [pathExamB], touchedAt: 99 }), OPTS);
check('plan remaps against its own source side, not the newer one',
  r.exams[r.plan.examIdx].id === 'plan-diverge-a', JSON.stringify(r.plan));

// ---------- settings ride on settingsAt, not touchedAt ----------
// A second device that is merely OPENED must not clobber settings changed on the first.
// touchedAt is stamped by save(), which go() calls on every navigation, so it means
// "last opened". Only settingsAt means "last changed".
{
  const a = full();                      // device A: the learner turned the timer off
  a.settings = { timer: false, testSetup: { n: 20, minutes: 15, weights: {} } };
  a.settingsAt = 1000;
  a.touchedAt = 1000;

  const b = full();                      // device B: opened later, settings never touched
  b.settings = { timer: true };
  b.settingsAt = 0;
  b.touchedAt = 9999;

  const m1 = M.mergeState(a, b, OPTS);
  check('timer:false survived a later mere-open on another device', m1.settings.timer === false, m1.settings.timer);
  check('saved test setup survived', !!(m1.settings.testSetup && m1.settings.testSetup.n === 20),
    JSON.stringify(m1.settings.testSetup));
  check('settingsAt carries the real change time', m1.settingsAt === 1000, m1.settingsAt);

  // and commutative
  const m1b = M.mergeState(b, a, OPTS);
  check('commutative: timer:false survived either order', m1b.settings.timer === false, m1b.settings.timer);
}

// A genuine later change on the other device DOES win.
{
  const a = full();
  a.settings = { timer: false };
  a.settingsAt = 1000;
  a.touchedAt = 9999;                    // A was opened most recently...

  const b = full();
  b.settings = { timer: true };
  b.settingsAt = 5000;                   // ...but B is where the setting was actually changed
  b.touchedAt = 1000;

  const m2 = M.mergeState(a, b, OPTS);
  check('the genuinely later settings change won', m2.settings.timer === true, m2.settings.timer);
  check('settingsAt took the later stamp', m2.settingsAt === 5000, m2.settingsAt);
}

// pickSettings' tie branch: an exact settingsAt tie with settings differing on each side.
// pickSettings' own comment says the tie "prefer[s] whichever side actually has settings, then
// a" - i.e. whichever side is passed first wins. `if (bt > at)` is what keeps a genuine tie out
// of the "b wins" branch and into that shared fallback; mutating it to `bt >= at` pulls a tie into
// the "b wins" branch instead, flipping the winner.
//
// This is checked in both call orders rather than by asserting mergeState(a, b) === mergeState(b,
// a): mergeState's own doc comment names an exact settingsAt tie with differing settings as the
// one documented exception to commutativity ("the pick falls back to argument order"), so the two
// orders are expected to disagree with each other on which settings object comes out - what must
// agree, in both orders, is the rule itself: the side passed first wins.
{
  const tieA = full();
  tieA.settings = { timer: false, tag: 'A' };
  tieA.settingsAt = 4000;

  const tieB = full();
  tieB.settings = { timer: true, tag: 'B' };
  tieB.settingsAt = 4000;

  const m3 = M.mergeState(tieA, tieB, OPTS);
  check('an exact settingsAt tie prefers the side passed first as a',
    m3.settings.tag === 'A', JSON.stringify(m3.settings));

  const m3b = M.mergeState(tieB, tieA, OPTS);
  check('the tie-break rule holds with the sides swapped too: the new first side wins',
    m3b.settings.tag === 'B', JSON.stringify(m3b.settings));
}

// ---------- round trip through the real engine ----------
// Every check above runs against synthetic fixtures. This one takes a state the real engine
// produced, merges it, and feeds the result back through the engine's own import path, so it is
// the only test that connects mergeState to real engine output.
const path = require('path');
const { boot, ROOT } = require('./lib');
const dir = path.join(ROOT, 'courses', 'netplus');
const readState = w => JSON.parse(w.localStorage.getItem('fra.netplus.state.v3'));

let w = boot({ courseDir: dir });
w.click(w.$('[data-act="go"][data-arg="home"]'));            // cheat sheet intro -> welcome page
w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
const QI = {}; w.FRA.questions.forEach(q => { QI[q.id] = q; });
const fatten = x => typeof x === 'string' ? QI[x] : x;
readState(w).active.items.map(fatten).forEach(q => {
  w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`));
  w.click(w.$('[data-act="conf"][data-arg="5"]'));
  w.click(w.$('[data-act="submit"]'));
});
const real = readState(w);
check('the engine produced a state with a starter exam', real.exams.length === 1, real.exams.length);
check('the engine stamped touchedAt', real.touchedAt > 0, real.touchedAt);
check('the engine gave the exam an id', typeof real.exams[0].id === 'string' && real.exams[0].id.length > 0, real.exams[0].id);
// Every question was answered with its correct choice, so the score is a known, non-trivial
// value (not 0, not accidentally equal to some default) that later checks can track through the
// merge and back out the other side of the import path.
check('the starter exam was answered correctly, giving a known score to track through the merge',
  real.exams[0].pct === 100, real.exams[0].pct);

const T = w.FRA.course.test;
const selfMerged = M.mergeState(real, real, { passPct: T.passPct, streakNeeded: T.streakNeeded });
check('merging a real state with itself keeps one exam', selfMerged.exams.length === 1, selfMerged.exams.length);
check('the merged exam is still the engine\'s own record, not a synthesized duplicate',
  JSON.stringify(selfMerged.exams[0]) === JSON.stringify(real.exams[0]),
  JSON.stringify(selfMerged.exams[0]));
// lessons stays {} for a starter-only run (the starter test never touches S.lessons), so a count
// check there would pass even if mergeMaps dropped every entry - it has nothing to drop. qstats
// and topics are the maps the starter flow actually populates (recordAnswer updates both for
// every question), so a merge bug that drops, sums, or otherwise mangles a keyed map shows up
// here instead.
check('merging a real state with itself preserves qstats exactly',
  JSON.stringify(selfMerged.qstats) === JSON.stringify(real.qstats),
  JSON.stringify({ merged: selfMerged.qstats, real: real.qstats }));
check('merging a real state with itself preserves topics exactly',
  JSON.stringify(selfMerged.topics) === JSON.stringify(real.topics),
  JSON.stringify({ merged: selfMerged.topics, real: real.topics }));

// Feed the merged state back through the engine's own import path. The import box lives on the
// Progress page (viewProgress), not the Feedback page - #io is the "move your progress to
// another device" textarea. Go straight there from the boot render: the initial view is the
// cheat-sheet intro, which (like 'progress') is exempt from the pre-starter welcome-page
// redirect, so the normal shell with its .nav bar is already on screen - unlike 'home', which
// before a starter test renders the standalone welcome screen with no nav at all.
let w2 = boot({ courseDir: dir });
w2.click(w2.$('.nav [data-act="nav"][data-arg="progress"]'));
const box = w2.$('#io');
check('the import box is present', !!box);
if (box) {
  box.value = JSON.stringify(selfMerged);
  w2.click(w2.$('[data-act="import"]'));
  const after = readState(w2);
  check('the engine imported the merged state', after.exams.length === 1, after.exams.length);
  check('the imported exam is the same record that went into the merge',
    JSON.stringify(after.exams[0]) === JSON.stringify(selfMerged.exams[0]),
    after.exams[0] && JSON.stringify(after.exams[0]));
  // A generic "did it throw" check would also pass if import silently failed and left the old
  // fresh() state on screen (fresh() renders fine too). Assert the home page actually shows this
  // exam's score/total, so the check fails if the import path renders anything other than the
  // state that was just merged in.
  check('the imported state renders the merged exam\'s score on the home page',
    !!after.exams[0] && w2.text().includes(`${after.exams[0].score} of ${after.exams[0].total}`),
    w2.text().slice(0, 200));
}

// ---------- round trip through the real engine: two genuinely different states ----------
// The block above only ever merges `real` with itself. A `mergeState = (a, b) => a` stub would
// satisfy every check up there too: unionBy degenerates to identity when a === b, and the import
// checks only prove the import path can round-trip whatever it is handed - not that mergeState
// computed it. Boot a second window against the same course and drive its own starter test with
// a deliberately different answer pattern, so this run's exam id, score, and qstats content
// genuinely diverge from `real`'s, then merge the two real states.
let w3 = boot({ courseDir: dir });
w3.click(w3.$('[data-act="go"][data-arg="home"]'));
w3.click(w3.$('[data-act="start-exam"][data-arg="starter"]'));
const items3 = readState(w3).active.items.map(fatten);
const wrongCut = Math.round(items3.length * 0.6);
items3.forEach((q, k) => {
  const choice = k < wrongCut ? (q.c + 1) % 4 : q.c;   // first 60% wrong, like the engine's own dev self-test
  w3.click(w3.$(`[data-act="opt"][data-arg="${choice}"]`));
  w3.click(w3.$('[data-act="conf"][data-arg="5"]'));
  w3.click(w3.$('[data-act="submit"]'));
});
const real2 = readState(w3);
check('the second window produced its own starter exam', real2.exams.length === 1, real2.exams.length);
check('the two real runs have different exam ids',
  real2.exams[0].id !== real.exams[0].id, JSON.stringify([real.exams[0].id, real2.exams[0].id]));
check('the second run scored differently from the all-correct first run, so the two real states genuinely diverge',
  real2.exams[0].pct !== real.exams[0].pct, JSON.stringify([real.exams[0].pct, real2.exams[0].pct]));

const twoMerged = M.mergeState(real, real2, { passPct: T.passPct, streakNeeded: T.streakNeeded });
// This is the assertion a `return a` stub cannot satisfy: it would hand back real's own
// one-exam log and real2's record would simply be gone.
check('merging two genuinely different real states keeps both exam records',
  twoMerged.exams.length === 2, twoMerged.exams.length);
check('both original exam ids survive the merge',
  twoMerged.exams.some(e => e.id === real.exams[0].id) && twoMerged.exams.some(e => e.id === real2.exams[0].id),
  JSON.stringify(twoMerged.exams.map(e => e.id)));

// qstats: assert the merge produced the union of the keys the two runs actually populated -
// computed from what each run really drew, not assumed, so the check holds whatever the starter
// test's random question selection happened to pick this run. A `return a` stub yields exactly
// real's own key count, which is smaller than this union whenever real2 saw any question real
// did not (near-certain across two independent draws from a five-domain, multi-lesson pool).
const qKeysA = Object.keys(real.qstats), qKeysB = Object.keys(real2.qstats);
const expectedQstatKeys = Array.from(new Set(qKeysA.concat(qKeysB)));
check('merging two real states unions their qstats keys',
  Object.keys(twoMerged.qstats).length === expectedQstatKeys.length,
  JSON.stringify({ merged: Object.keys(twoMerged.qstats).length, expected: expectedQstatKeys.length }));
const sharedQ = qKeysA.find(k => qKeysB.includes(k));
if (sharedQ) {
  check(`the question both runs shared (${sharedQ}) keeps the max of each run's counters`,
    twoMerged.qstats[sharedQ].seen === Math.max(real.qstats[sharedQ].seen, real2.qstats[sharedQ].seen) &&
    twoMerged.qstats[sharedQ].correct === Math.max(real.qstats[sharedQ].correct, real2.qstats[sharedQ].correct) &&
    twoMerged.qstats[sharedQ].wrong === Math.max(real.qstats[sharedQ].wrong, real2.qstats[sharedQ].wrong),
    JSON.stringify({ merged: twoMerged.qstats[sharedQ], a: real.qstats[sharedQ], b: real2.qstats[sharedQ] }));
} else {
  // The two runs happened not to draw a common question this time; fall back to the other form
  // the brief allows - every key the second run alone contributed still made it into the merge.
  check('every qstats key unique to the second run made it into the merge',
    qKeysB.every(k => k in twoMerged.qstats), JSON.stringify(expectedQstatKeys));
}

// Feed the two-state merge through the same import path exercised above for the self-merge.
let w4 = boot({ courseDir: dir });
w4.click(w4.$('.nav [data-act="nav"][data-arg="progress"]'));
const box2 = w4.$('#io');
check('the import box is present for the two-state merge', !!box2);
if (box2) {
  box2.value = JSON.stringify(twoMerged);
  w4.click(w4.$('[data-act="import"]'));
  const after2 = readState(w4);
  check('the engine imported the two-state merge keeping both exams', after2.exams.length === 2, after2.exams.length);
  check('the imported exams are the same two records that went into the merge',
    JSON.stringify(after2.exams) === JSON.stringify(twoMerged.exams),
    JSON.stringify(after2.exams.map(e => e.id)));
  // As above, assert the home page actually renders one of the two merged exams' score/total
  // (whichever sorts last), rather than just checking that import did not throw.
  const scoreTexts = [real, real2].map(e => `${e.exams[0].score} of ${e.exams[0].total}`);
  check('the imported two-exam state renders one of the merged exams\' score on the home page',
    scoreTexts.some(t => w4.text().includes(t)), w4.text().slice(0, 200));
}

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('\nAll merge tests passed.');
