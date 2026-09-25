'use strict';
// The recency-weighted picture of where a learner stands: exam domains ranked strongest to
// weakest, and the five weakest topics. Shared by the course engine (the results page) and
// the account page, so it is pure: no window, no storage, and it never throws on a malformed
// state (missing or odd fields read as empty).
//
// The window: the latest non-starter test (every answer weighs 1), the non-starter test before
// it (0.5), and each lesson's most recent checkpoint when it was taken after that previous test
// (0.5 per question). There is no upper bound on checkpoints: the chart is the learner's standing
// now, so retraining done after the latest test counts. The starter test never contributes.
//
// Loaded as a plain script (sets window.FRAStrength) and as a CommonJS module for tests, the
// same way engine/merge.js and engine/summary.js are.
(function (root, factory) {
  const api = factory();
  root.FRAStrength = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;
  const obj = v => (v && typeof v === 'object') ? v : null;
  const num = v => (typeof v === 'number' && isFinite(v)) ? v : 0;
  const isTest = e => !!obj(e) && e.kind !== 'starter';

  // The two tests that define the window. examIdx pins "latest" when it names a non-starter
  // test; otherwise latest is the most recent non-starter test. previousIdx is the most recent
  // non-starter test before latest. Either is -1 when there is none.
  function windowOf(exams, examIdx) {
    const ex = Array.isArray(exams) ? exams : [];
    let latestIdx = -1;
    if (typeof examIdx === 'number' && isTest(ex[examIdx])) latestIdx = examIdx;
    else for (let i = ex.length - 1; i >= 0; i--) if (isTest(ex[i])) { latestIdx = i; break; }
    let previousIdx = -1;
    for (let i = latestIdx - 1; i >= 0; i--) if (isTest(ex[i])) { previousIdx = i; break; }
    return { latestIdx, previousIdx };
  }

  // meta: { domains: [{ id, short, name, pct }], lessons: [{ id, title, domain }], checkpointN,
  //         questions?: { questionId: lessonId } }  (questions resolves review items stored by id)
  // Returns { hasData, latestIdx, previousIdx,
  //           domains: [{ id, short, name, pct, acc, wc, wa, thisTest: { c, t } | null }] ranked
  //             strongest first (no data last),
  //           weakest: [{ id, title, domain, score, here, before, cpWrong }] up to five, worst first }
  function compute(state, meta, examIdx) {
    const s = obj(state) || {}; const m = obj(meta) || {};
    const domains = Array.isArray(m.domains) ? m.domains.filter(obj) : [];
    const lessons = Array.isArray(m.lessons) ? m.lessons.filter(obj) : [];
    const qmap = obj(m.questions) || {};
    const N = num(m.checkpointN) > 0 ? num(m.checkpointN) : 4;
    const order = {}; lessons.forEach((l, i) => { order[l.id] = i; });
    const pctOf = {}; domains.forEach(d => { pctOf[String(d.id)] = num(d.pct); });
    const exams = Array.isArray(s.exams) ? s.exams : [];
    const w = windowOf(exams, examIdx);
    const latest = w.latestIdx >= 0 ? exams[w.latestIdx] : null;
    const previous = w.previousIdx >= 0 ? exams[w.previousIdx] : null;
    const since = previous ? num(previous.date) : 0;

    // Per lesson: weighted correct and attempts, and the miss tally by source.
    const T = {}; lessons.forEach(l => { T[l.id] = { wc: 0, wa: 0, here: 0, before: 0, cpWrong: 0 }; });
    const lessonOf = q => { if (typeof q === 'string') return qmap[q] || null; const o = obj(q); return o && o.t != null ? o.t : null; };
    const tally = (rec, weight, key) => {
      const review = obj(rec) && Array.isArray(rec.review) ? rec.review : [];
      review.forEach(r => {
        const item = obj(r); if (!item) return;
        const t = lessonOf(item.q); const x = t != null && T[t]; if (!x) return;
        x.wa += weight; if (item.correct) x.wc += weight; else x[key] += 1;
      });
    };
    if (latest) tally(latest, 1, 'here');
    if (previous) tally(previous, 0.5, 'before');
    const ls = obj(s.lessons) || {};
    lessons.forEach(l => {
      const st = obj(ls[l.id]); if (!st || !(num(st.lastAt) > since)) return;
      const score = Math.max(0, Math.min(N, num(st.lastScore)));
      T[l.id].wa += 0.5 * N; T[l.id].wc += 0.5 * score; T[l.id].cpWrong += N - score;
    });

    const D = {}; domains.forEach(d => { D[String(d.id)] = { wc: 0, wa: 0 }; });
    lessons.forEach(l => { const d = D[String(l.domain)]; if (!d) return; d.wc += T[l.id].wc; d.wa += T[l.id].wa; });
    const thisBy = latest && typeof examIdx === 'number' && obj(latest.byDomain) ? latest.byDomain : null;
    const out = domains.map(d => {
      const k = String(d.id); const x = D[k]; const acc = x.wa > 0 ? Math.round(100 * x.wc / x.wa) : null;
      const tb = thisBy && obj(thisBy[k]);
      return { id: d.id, short: d.short, name: d.name, pct: num(d.pct), acc, wc: x.wc, wa: x.wa, thisTest: tb ? { c: num(tb.c), t: num(tb.t) } : null };
    });
    out.sort((a, b) => (b.acc == null ? 0 : 1) - (a.acc == null ? 0 : 1) || (b.acc || 0) - (a.acc || 0) || b.pct - a.pct);

    const weakest = lessons.map(l => { const x = T[l.id]; return { id: l.id, title: l.title, domain: l.domain, score: x.here + 0.5 * x.before + 0.5 * x.cpWrong, here: x.here, before: x.before, cpWrong: x.cpWrong }; })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score || (pctOf[String(b.domain)] || 0) - (pctOf[String(a.domain)] || 0) || order[a.id] - order[b.id])
      .slice(0, 5);

    return { hasData: out.some(d => d.wa > 0), latestIdx: w.latestIdx, previousIdx: w.previousIdx, domains: out, weakest };
  }

  return { VERSION, compute, windowOf };
}));
