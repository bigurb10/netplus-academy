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

  // meta: { lessons, labs, pbqs, passPct, passesNeeded, passWindow, examQuestions } from the course
  // manifest and curriculum (build.py's course table). Returns { started, stage, stageLabel,
  // lessonsPassed, lessonsTotal, labsDone, labsTotal, pbqsDone, pbqsTotal, bestPct, passes,
  // passesNeeded, passWindow, official, lastStudied }.
  function summarize(state, meta) {
    const s = obj(state) || {};
    const m = obj(meta) || {};
    const lessons = obj(s.lessons) || {};
    const exams = Array.isArray(s.exams) ? s.exams.filter(obj) : [];
    const plan = obj(s.plan) && Array.isArray(s.plan.lessons) ? s.plan : null;
    const passesNeeded = Number(m.passesNeeded) > 0 ? Number(m.passesNeeded) : 3;
    const passWindow = Number(m.passWindow) > 0 ? Number(m.passWindow) : 5;
    const passes = Number(s.passes) > 0 ? Number(s.passes) : 0;
    const official = obj(s.official);
    const topics = obj(s.topics) || {};
    const labs = obj(s.labs) || {};
    const labsDone = Object.keys(labs).filter(id => obj(labs[id]) && labs[id].done === true).length;
    const pbqs = obj(s.pbqs) || {};
    const pbqsDone = Object.keys(pbqs).filter(id => obj(pbqs[id]) && pbqs[id].done === true).length;
    // Same rule as planDone() in app.js: a plan entry counts when its checkpoint was passed after
    // the plan was made, OR its topic was drilled to three in a row after the plan was made,
    // whatever the entry's mode (the mode only decides what opens). An old pass or drill cannot
    // satisfy a new retraining plan.
    const planDone = id => {
      if (!plan) return false;
      const at = Number(plan.createdAt);
      const ls = obj(lessons[id]); const t = obj(topics[id]);
      return !!((ls && ls.status === 'passed' && Number(ls.passedAt) >= at) || (t && Number(t.drilledAt) > 0 && Number(t.drilledAt) >= at));
    };
    const planLeft = plan ? plan.lessons.filter(e => obj(e) && !planDone(e.id)).length : 0;
    const has = kind => exams.some(e => e.kind === kind);
    let stage;
    if (!has('starter')) stage = 'starter';
    else if (plan && planLeft) stage = plan.source === 'starter' ? 'tutorial' : 'retrain';
    else if (official) stage = 'ready';                       // permanent once earned
    else if (passes >= passesNeeded) stage = 'official';
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
      labsDone, labsTotal: Number(m.labs) > 0 ? Number(m.labs) : 0,
      pbqsDone, pbqsTotal: Number(m.pbqs) > 0 ? Number(m.pbqs) : 0,
      bestPct, passes, passesNeeded, passWindow,
      official: official ? { date: Number(official.date) || null, pct: typeof official.pct === 'number' ? official.pct : null } : null,
      lastStudied: Number(s.touchedAt) > 0 ? Number(s.touchedAt) : null
    };
  }

  return { summarize, stageLabel };
}));
