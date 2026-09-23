'use strict';
// A read-only summary of one course's progress blob, for the account page. Mirrors the
// stage rules in engine/app.js -- stage() and planDone() -- without the app's DOM or its
// course globals, so one page can describe every course on an account. Pure: no window,
// no storage, and it never throws on a malformed state (missing fields read as empty).
// Loaded as a plain script (sets window.FRASummary) and as a CommonJS module for tests,
// the same way engine/merge.js is.
(function (root, factory) {
  const api = factory();
  root.FRASummary = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  // The app's STAGE_LABEL, with the test size filled from meta.examQuestions.
  function stageLabel(stage, meta) {
    const n = Number(meta && meta.examQuestions) || 50;
    return {
      starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: n + '-question test',
      retrain: 'Retraining', practice: 'Practice tests', official: 'Official-format test', ready: 'Ready'
    }[stage] || stage;
  }

  const obj = v => (v && typeof v === 'object') ? v : null;

  // meta: { lessons, passPct, streakNeeded, examQuestions } from the course manifest and
  // curriculum (build.py's course table). Returns { started, stage, stageLabel,
  // lessonsPassed, lessonsTotal, bestPct, streak, streakNeeded, official, lastStudied }.
  function summarize(state, meta) {
    const s = obj(state) || {};
    const m = obj(meta) || {};
    const lessons = obj(s.lessons) || {};
    const exams = Array.isArray(s.exams) ? s.exams.filter(obj) : [];
    const plan = obj(s.plan) && Array.isArray(s.plan.lessons) ? s.plan : null;
    const streakNeeded = Number(m.streakNeeded) > 0 ? Number(m.streakNeeded) : 3;
    const streak = Number(s.passStreak) > 0 ? Number(s.passStreak) : 0;
    const official = obj(s.official);
    // Same rule as planDone() in app.js: a plan lesson counts only when it was passed after
    // the plan was made, so an old pass cannot satisfy a new retraining plan.
    const planDone = id => { const ls = obj(lessons[id]); return !!(ls && ls.status === 'passed' && plan && Number(ls.passedAt) >= Number(plan.createdAt)); };
    const planLeft = plan ? plan.lessons.filter(e => obj(e) && !planDone(e.id)).length : 0;
    const has = kind => exams.some(e => e.kind === kind);
    let stage;
    if (!has('starter')) stage = 'starter';
    else if (plan && planLeft) stage = plan.source === 'starter' ? 'tutorial' : 'retrain';
    else if (streak >= streakNeeded) stage = official ? 'ready' : 'official';
    else if (!has('full') && !has('practice')) stage = 'fulltest';
    else stage = 'practice';
    const ids = Object.keys(lessons);
    const lessonsPassed = ids.filter(id => obj(lessons[id]) && lessons[id].status === 'passed').length;
    let bestPct = null;
    exams.forEach(e => {
      if ((e.kind === 'full' || e.kind === 'practice') && typeof e.pct === 'number' && (bestPct === null || e.pct > bestPct)) bestPct = e.pct;
    });
    const started = exams.length > 0 || ids.some(id => obj(lessons[id]) && lessons[id].status && lessons[id].status !== 'new');
    return {
      started, stage, stageLabel: stageLabel(stage, m),
      lessonsPassed, lessonsTotal: Number(m.lessons) > 0 ? Number(m.lessons) : 0,
      bestPct, streak, streakNeeded,
      official: official ? { date: Number(official.date) || null, pct: typeof official.pct === 'number' ? official.pct : null } : null,
      lastStudied: Number(s.touchedAt) > 0 ? Number(s.touchedAt) : null
    };
  }

  return { summarize, stageLabel };
}));
