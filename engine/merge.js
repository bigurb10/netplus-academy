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

  return { VERSION, isOfficialRecord, recomputeStreak, examId, mergeMaps };
}));
