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
  const examId = rec => rec && rec.id ? rec.id : 'x-' + [rec.date, rec.kind, rec.total, rec.pct].join('-');

  return { VERSION, isOfficialRecord, recomputeStreak, examId };
}));
