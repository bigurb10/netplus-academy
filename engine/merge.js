// Pure merge helpers for cross-device course progress. No DOM, no network, no engine state.
// Loaded as a plain script in the browser (sets window.FRAMerge) and required directly by tests.
(function (root, factory) {
  const api = factory();
  root.FRAMerge = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;

  // A standard-format, timed test is the "official" one. Both fields are persisted on the
  // exam record, so this predicate works on stored history as well as a live exam.
  const isOfficialRecord = rec => !!(rec && rec.setup && rec.setup.mode === 'standard' && rec.minutes > 0);

  // Replay of the fold in app.js finishExam. passStreak and official are never merged across
  // devices - taking the larger of two streaks would invent one nobody earned - so they are
  // always recomputed from the merged, date-ordered exam log.
  function recomputeStreak(exams, opts) {
    // e.pct >= undefined is false for every record, so a malformed opts would silently replay to
    // passStreak: 0 - the exact number this function exists to never invent - with no error.
    if (!opts || typeof opts.passPct !== 'number' || typeof opts.streakNeeded !== 'number') {
      throw new Error('recomputeStreak requires opts.passPct and opts.streakNeeded as numbers');
    }
    const passPct = opts.passPct, streakNeeded = opts.streakNeeded;
    let passStreak = 0, official = null;
    for (let i = 0; i < exams.length; i++) {
      const e = exams[i];
      if (!e || e.kind === 'starter' || e.kind === 'custom') continue;
      const prevStreak = passStreak;
      const passed = e.pct >= passPct;
      passStreak = passed ? prevStreak + 1 : 0;
      if (!passed) official = null;
      else if (isOfficialRecord(e) && prevStreak >= streakNeeded) official = { examIdx: i, date: e.date, pct: e.pct };
    }
    return { passStreak, official };
  }

  // Identity for union-merging exam logs. New records carry an explicit id; anything saved
  // before sync existed does not, so derive one from fields that never change after submit.
  const examId = rec => rec && rec.id ? rec.id : rec ? 'x-' + [rec.date, rec.kind, rec.total, rec.pct].join('-') : '';

  const STATUS_RANK = { new: 0, read: 1, passed: 2 };
  const rank = s => STATUS_RANK[s] || 0;
  const max = (x, y) => (x || 0) > (y || 0) ? (x || 0) : (y || 0);
  const keys = (a, b) => Object.keys(Object.assign({}, a || {}, b || {}));

  // Merge one keyed map with a per-entry rule. Entries present on one side only pass through.
  function mergeBy(a, b, rule) {
    const out = {};
    keys(a, b).forEach(k => {
      const x = (a || {})[k], y = (b || {})[k];
      out[k] = x && y ? rule(x, y) : (x || y);
    });
    return out;
  }

  const mergeLesson = (x, y) => ({
    status: rank(x.status) >= rank(y.status) ? x.status : y.status,
    best: max(x.best, y.best),
    attempts: max(x.attempts, y.attempts),
    passedAt: max(x.passedAt, y.passedAt)
  });

  const mergeQstat = (x, y) => ({
    seen: max(x.seen, y.seen), correct: max(x.correct, y.correct),
    wrong: max(x.wrong, y.wrong), last: max(x.last, y.last)
  });

  // Whole-record, because combining hist/streak/correct field-by-field can produce a record
  // that never existed - a streak of 3 attached to a history whose last entry is a miss.
  const laterOf = (x, y, field) => (y[field] || 0) > (x[field] || 0) ? y : x;

  function mergeMaps(a, b) {
    return {
      lessons: mergeBy(a.lessons, b.lessons, mergeLesson),
      topics: mergeBy(a.topics, b.topics, (x, y) => laterOf(x, y, 'last')),
      qstats: mergeBy(a.qstats, b.qstats, mergeQstat),
      seen: Object.assign({}, a.seen || {}, b.seen || {}),
      ratings: mergeBy(a.ratings, b.ratings, (x, y) => laterOf(x, y, 'ts'))
    };
  }

  // plan and path each carry an examIdx pointed at the exam array they were built against. The
  // merged exam log is re-sorted (see mergeState), so an index inherited verbatim can end up
  // pointing at a different record than the one it was built from. Remap it to the same
  // underlying record - matched by identity via examId, not position - so a merge can't
  // silently rebuild the learner's tutorial from the wrong test. Always returns a new object (or
  // null), never the input object itself - but the copy is shallow (Object.assign), so a nested
  // value such as plan.lessons is still the same array reference as the caller's; only the top
  // level (and examIdx) is safe to mutate without touching the source state.
  function remapExamIdx(ref, fromExams, toExams) {
    if (ref == null) return null;
    if (typeof ref.examIdx !== 'number') return Object.assign({}, ref);
    const src = (fromExams || [])[ref.examIdx];
    if (!src) return null;
    const id = examId(src);
    const idx = (toExams || []).findIndex(e => examId(e) === id);
    if (idx < 0) return null;
    return Object.assign({}, ref, { examIdx: idx });
  }

  // Union two arrays of records by a key function, keeping the entry that reports more progress.
  function unionBy(a, b, keyOf, prefer) {
    const out = {}; const order = [];
    (a || []).concat(b || []).forEach(item => {
      if (!item) return;
      const k = keyOf(item);
      if (!(k in out)) { out[k] = item; order.push(k); }
      else if (prefer) out[k] = prefer(out[k], item);
    });
    return order.map(k => out[k]);
  }

  // Merge two complete state blobs. Commutative and idempotent: the result depends on the
  // contents, never on which side is passed first - except an exact tie on touchedAt (for path
  // and settings) or createdAt (for plan) with the two sides' path/settings/plan actually
  // differing, where the pick falls back to argument order. Accepted: real clocks essentially
  // never tie, and the fallback still always resolves to one side's real value, never a mix.
  function mergeState(a, b, opts) {
    const maps = mergeMaps(a, b);
    const exams = unionBy(a.exams, b.exams, examId, (x, y) => (y.pct || 0) > (x.pct || 0) ? y : x)
      .slice().sort((x, y) => (x.date || 0) - (y.date || 0) || examId(x).localeCompare(examId(y)));
    const feedback = unionBy(a.feedback, b.feedback, f => f.id, (x, y) => x.sent ? x : y);
    const newer = (b.touchedAt || 0) > (a.touchedAt || 0) ? b : a;
    const planSide = (b.plan && (!a.plan || (b.plan.createdAt || 0) > (a.plan.createdAt || 0))) ? b : a;
    // A device that has only been opened has path: null from fresh() with no choice of its own.
    // Prefer the more-recently-touched side only when it actually made a choice, so opening the
    // app on a second device can never null out a real path chosen elsewhere - mirrors the
    // null-guard planSide already applies above.
    const pathSide = newer.path ? newer : (a.path ? a : b);
    const streak = recomputeStreak(exams, opts);
    // Both sides missing `created` must not yield Infinity, which JSON.stringify turns into null.
    const born = Math.min(a.created || Infinity, b.created || Infinity);

    return {
      v: 3,
      course: a.course || b.course || null,
      lessons: maps.lessons, topics: maps.topics, qstats: maps.qstats,
      seen: maps.seen, ratings: maps.ratings,
      exams: exams,
      feedback: feedback,
      passStreak: streak.passStreak,
      official: streak.official,
      plan: remapExamIdx(planSide.plan, planSide.exams, exams),
      path: remapExamIdx(pathSide.path, pathSide.exams, exams),
      settings: newer.settings || a.settings || b.settings || {},
      touchedAt: max(a.touchedAt, b.touchedAt),
      created: isFinite(born) ? born : 0
    };
  }

  return { VERSION, isOfficialRecord, recomputeStreak, examId, mergeMaps, remapExamIdx, mergeState };
}));
