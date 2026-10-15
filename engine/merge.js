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

  // The pass rule, as one fold over the date-ordered exam log. It is the only place the rule
  // lives: app.js finishExam, load(), and mergeState all call it, so `passes` and `official`
  // are never merged across devices (taking the larger of two counts would invent passes nobody
  // earned) and never trusted from a stored blob.
  //
  // The rule (Blake, 2026-09-23): the last `passWindow` tests -- 50-question and official-format
  // alike; starter and custom never count -- form a rolling window, and `passes` is how many of
  // them scored passPct or better. Once `passes >= passesNeeded` the learner is qualified; an
  // official-format test (isOfficialRecord) scored at officialPct or better while already
  // qualified sets `official`, permanently. A fail never resets anything; the window slides.
  function recomputeQualification(exams, opts) {
    // e.pct >= undefined is false for every record, so a malformed opts would silently replay to
    // passes: 0 - the exact number this function exists to never invent - with no error.
    // Number.isFinite, not typeof: typeof NaN is 'number', and a NaN passPct makes every
    // comparison false, reproducing the exact silent zeroing this guard exists to stop.
    const need = ['passPct', 'passesNeeded', 'passWindow', 'officialPct'];
    if (!opts || need.some(k => !Number.isFinite(opts[k]))) {
      throw new Error('recomputeQualification requires opts.' + need.join(', opts.') + ' as numbers');
    }
    const recent = [];   // pass/fail of the last passWindow counted tests, oldest first
    let official = null;
    for (let i = 0; i < exams.length; i++) {
      const e = exams[i];
      if (!e || e.kind === 'starter' || e.kind === 'custom') continue;
      // Qualification is judged on the tests BEFORE this one: the official test is the gate,
      // not a way to open it.
      const qualified = recent.filter(Boolean).length >= opts.passesNeeded;
      if (!official && qualified && isOfficialRecord(e) && e.pct >= opts.officialPct) {
        official = { examIdx: i, date: e.date, pct: e.pct };
      }
      recent.push(e.pct >= opts.passPct);
      if (recent.length > opts.passWindow) recent.shift();
    }
    return { passes: recent.filter(Boolean).length, official };
  }

  // Identity for union-merging exam logs. New records carry an explicit id; anything saved
  // before sync existed does not, so derive one from fields that never change after submit.
  const examId = rec => rec && rec.id ? rec.id : rec ? 'x-' + [rec.date, rec.kind, rec.total, rec.pct].join('-') : '';

  const STATUS_RANK = { new: 0, read: 1, passed: 2 };
  const rank = s => STATUS_RANK[s] || 0;
  const max = (x, y) => (x || 0) > (y || 0) ? (x || 0) : (y || 0);
  // The earliest positive of two timestamps (the certificate's earned date), 0 when neither is set.
  const earliest = (x, y) => (x || 0) && (y || 0) ? Math.min(x, y) : (x || y || 0);
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

  const mergeLesson = (x, y) => {
    const out = {
      status: rank(x.status) >= rank(y.status) ? x.status : y.status,
      best: max(x.best, y.best),
      attempts: max(x.attempts, y.attempts),
      passedAt: max(x.passedAt, y.passedAt)
    };
    // The most recent checkpoint's score and time travel together, from the side with the
    // newer checkpoint: a max of each field would pair a score with a different checkpoint's
    // time. A side that never recorded one (a blob from before the field existed) yields.
    const cp = y.lastAt != null && (x.lastAt == null || (y.lastAt || 0) > (x.lastAt || 0)) ? y : (x.lastAt != null ? x : null);
    if (cp) { out.lastScore = cp.lastScore; out.lastAt = cp.lastAt; }
    return out;
  };

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
      ratings: mergeBy(a.ratings, b.ratings, (x, y) => laterOf(x, y, 'ts')),
      // Lab progress: the newer entry per lab wins whole, so a Redo on one device (done: false,
      // newer at) is not undone by an older done: true from the other.
      labs: mergeBy(a.labs, b.labs, (x, y) => laterOf(x, y, 'at')),
      // PBQ progress, the same rule for the same reason: the newer entry per PBQ wins whole, so a
      // Retry on one device (a lower best, newer at) is not undone by an older done: true.
      pbqs: mergeBy(a.pbqs, b.pbqs, (x, y) => laterOf(x, y, 'at'))
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
  // contents, never on which side is passed first - except an exact tie on pathAt (for path),
  // settingsAt (for settings), or createdAt then changedAt (for plan) with the two sides' path/settings/plan
  // actually differing, where the pick falls back to argument order. Accepted: real clocks
  // essentially never tie, and the fallback still always resolves to one side's real value, never
  // a mix.
  function mergeState(a, b, opts) {
    const maps = mergeMaps(a, b);
    const exams = unionBy(a.exams, b.exams, examId, (x, y) => (y.pct || 0) > (x.pct || 0) ? y : x)
      .slice().sort((x, y) => (x.date || 0) - (y.date || 0) || examId(x).localeCompare(examId(y)));
    const feedback = unionBy(a.feedback, b.feedback, f => f.id, (x, y) => x.sent ? x : y);
    // A retraining plan is edited in place (a topic's mode, the preset), so two devices can hold
    // twins with the same createdAt; changedAt, stamped on every edit, breaks that tie. A newer
    // plan (a later createdAt) wins outright whatever the edits on the older one.
    const newerPlan = (x, y) => (x.createdAt || 0) > (y.createdAt || 0) || ((x.createdAt || 0) === (y.createdAt || 0) && (x.changedAt || 0) > (y.changedAt || 0));
    const planSide = (b.plan && (!a.plan || newerPlan(b.plan, a.plan))) ? b : a;
    // path rides on pathAt, NOT touchedAt -- the same fix settings got. touchedAt is stamped
    // by save() on every navigation, so it means "last opened"; resolving path on it let a
    // device that was merely opened later win over the device where the path was actually
    // chosen. pathAt is stamped only where path genuinely changes (choosePath, and a new
    // starter test resetting it). The null guard stays: a side with no path never beats a
    // side that made a choice, whatever its stamp.
    const pathSide = pickPathSide(a, b);
    const q = recomputeQualification(exams, opts);
    // Both sides missing `created` must not yield Infinity, which JSON.stringify turns into null.
    const born = Math.min(a.created || Infinity, b.created || Infinity);

    return {
      v: 3,
      course: a.course || b.course || null,
      lessons: maps.lessons, topics: maps.topics, qstats: maps.qstats,
      seen: maps.seen, ratings: maps.ratings, labs: maps.labs, pbqs: maps.pbqs,
      exams: exams,
      feedback: feedback,
      passes: q.passes,
      official: q.official,
      plan: remapExamIdx(planSide.plan, planSide.exams, exams),
      path: remapExamIdx(pathSide.path, pathSide.exams, exams),
      pathAt: max(a.pathAt, b.pathAt),
      // settings rides on settingsAt, NOT touchedAt. touchedAt is stamped by save() on
      // every navigation, so it means "last opened"; using it here let a second device
      // that was merely opened wipe a timer or test-setup choice made on the first.
      settings: pickSettings(a, b),
      settingsAt: max(a.settingsAt, b.settingsAt),
      touchedAt: max(a.touchedAt, b.touchedAt),
      certAt: earliest(a.certAt, b.certAt),
      created: isFinite(born) ? born : 0
    };
  }

  // Later real change wins. On an EXACT tie with both sides carrying different settings
  // the side passed first wins, so this case is order-dependent -- the same documented
  // exception `path` and `plan` already carry, not an oversight. Two devices changing a
  // setting in the same millisecond is vanishingly rare and either choice is defensible;
  // what matters is that a mere open never beats a real change, which settingsAt ensures.
  // Later real path change wins. A null path is two different things: "never chose" (no
  // stamp -- fresh() on a device that was merely opened) must never beat a real choice,
  // but "chose, then a new starter test RESET it" carries a fresh pathAt and is itself the
  // later change, so it must win over a stale choice -- otherwise a reload or focus-pull
  // racing the debounced push silently reverts the learner's own reset. An exact pathAt
  // tie with the two sides differing falls back to the side passed first, the same
  // documented order-dependence settings and plan carry.
  function pickPathSide(a, b) {
    const at = a.pathAt || 0, bt = b.pathAt || 0;
    if (!a.path && !at) return b;
    if (!b.path && !bt) return a;
    return bt > at ? b : a;
  }

  function pickSettings(a, b) {
    const at = a.settingsAt || 0, bt = b.settingsAt || 0;
    if (bt > at) return b.settings || a.settings || {};
    if (at > bt) return a.settings || b.settings || {};
    return a.settings || b.settings || {};
  }

  return { VERSION, isOfficialRecord, recomputeQualification, examId, mergeMaps, remapExamIdx, mergeState };
}));
