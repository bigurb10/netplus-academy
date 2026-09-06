/* FieldReady Academy course engine. Reads FRA.course (a course pack manifest) and the pack's data.
   Flow: 10-question starter test (with confidence) -> personalized tutorial -> 50-question test ->
   retraining tutorial built from the misses -> practice tests until three in a row at 85% or better.
   Every test ends with an explanation of each wrong answer and each lucky guess. */
(function () {
  'use strict';

  // ---------- course manifest ----------
  const course = FRA.course;
  if (!course || !Array.isArray(course.domains) || !course.test) throw new Error('FRA.course manifest missing or incomplete');
  const DOMAINS = {}; course.domains.forEach(d => { DOMAINS[d.id] = d; });
  const DOMAIN_IDS = course.domains.map(d => d.id);
  const T = course.test;
  const PASS_PCT = T.passPct, STREAK_NEEDED = T.streakNeeded, EXAM_N = T.questions, EXAM_MINUTES = T.minutes;
  const STARTER_N = DOMAIN_IDS.length * T.starterPerDomain, CHECKPOINT_N = T.checkpointN, CHECKPOINT_PASS = T.checkpointPass;
  const REBUILD_PTS = 3 * T.starterPerDomain; // every starter question in the domain wrong
  const ALL_WORD = T.starterPerDomain === 2 ? 'both' : 'all';
  const CONF = [[1, 'Guess'], [2, 'Unsure'], [3, 'Fairly sure'], [4, 'Sure'], [5, 'Certain']];
  const STORE_KEY = `fra.${course.id}.state.v3`;
  // Feedback delivery. Feedback is always saved in the browser and exportable from the Feedback tab.
  // Optionally set feedbackEndpoint (a URL that accepts POSTed JSON) and/or feedbackEmail in the course manifest.
  const FEEDBACK_ENDPOINT = course.feedbackEndpoint || '';
  const FEEDBACK_EMAIL = course.feedbackEmail || '';
  const FB_CATS = {
    question: ['Answer key is wrong', 'Question is unclear or ambiguous', 'Explanation is wrong or unclear', 'Too easy or off-topic', 'Typo', 'Other'],
    lesson: ['Content is inaccurate', 'Unclear or confusing', 'Missing something the exam covers', 'Too long or too short', 'Typo', 'Other'],
    overall: ['Content accuracy', 'Difficulty', 'Website bug', 'Design or usability', 'Idea or request', 'Other']
  };
  const WHERE_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test', checkpoint: 'Lesson checkpoint', train: 'Drills', 'starter-results': 'Starter test results', 'full-results': `${EXAM_N}-question test results`, 'practice-results': 'Practice test results', callout: 'Lesson callout' };
  const STARTER_POOL = course.starterPool || {};
  const CORE = course.core || {};

  // ---------- data index ----------
  const units = (FRA.units || []).slice().sort((a, b) => a.n - b.n);
  const lessons = []; const L = {};
  units.forEach(u => u.lessons.forEach(l => { l.unit = u; l.index = lessons.length; lessons.push(l); L[l.id] = l; }));
  const bank = FRA.questions || []; const Q = {}; bank.forEach(q => { Q[q.id] = q; });
  const byLesson = {}; bank.forEach(q => { (byLesson[q.t] = byLesson[q.t] || []).push(q); });
  const lessonsByDomain = {}; DOMAIN_IDS.forEach(d => { lessonsByDomain[d] = []; });
  lessons.forEach(l => { if (!lessonsByDomain[l.domain]) throw new Error(`lesson ${l.id} uses unknown domain ${l.domain}`); lessonsByDomain[l.domain].push(l); });
  const gens = FRA.generators || {};
  document.title = course.name;

  // ---------- utilities ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (c, t) => t ? Math.round(100 * c / t) : 0;
  const fmtDate = ts => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const letters = ['A', 'B', 'C', 'D'];
  const inline = s => esc(s).replace(/\{\{(.+?)\}\}/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  function renderBody(md) {
    const lines = md.split('\n'); let html = ''; let list = []; let olist = []; let pre = null;
    const flush = () => {
      if (list.length) { html += '<ul>' + list.map(li => `<li>${inline(li)}</li>`).join('') + '</ul>'; list = []; }
      if (olist.length) { html += '<ol>' + olist.map(li => `<li>${inline(li)}</li>`).join('') + '</ol>'; olist = []; }
    };
    for (const raw of lines) {
      if (pre !== null) { if (raw.trim().startsWith('```')) { html += `<pre>${esc(pre.join('\n'))}</pre>`; pre = null; } else pre.push(raw); continue; }
      const line = raw.trim();
      if (line.startsWith('```')) { flush(); pre = []; continue; }
      if (!line) { flush(); continue; }
      if (line.startsWith('## ')) { flush(); html += `<h3>${inline(line.slice(3))}</h3>`; }
      else if (line.startsWith('- ')) { if (olist.length) flush(); list.push(line.slice(2)); }
      else if (/^\d+\. /.test(line)) { if (list.length) flush(); olist.push(line.replace(/^\d+\. /, '')); }
      else if (line.startsWith('> ')) { flush(); html += `<div class="tip">${inline(line.slice(2))}</div>`; }
      else { flush(); html += `<p>${inline(line)}</p>`; }
    }
    if (pre !== null) html += `<pre>${esc(pre.join('\n'))}</pre>`;
    flush(); return html;
  }

  // ---------- state ----------
  function fresh() {
    return { v: 3, course: course.id, view: { name: 'cheatsheet', arg: 'intro' }, lessons: {}, qstats: {}, topics: {}, exams: [], passStreak: 0, plan: null, active: null, settings: { timer: true }, feedback: [], seen: {}, created: Date.now() };
  }
  let S = load();
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) { const s = JSON.parse(raw); if (s && s.v === 3) return Object.assign(fresh(), s); }
      for (const key of (course.legacyStoreKeys || [])) {
        const old = localStorage.getItem(key);
        if (old) { const s = JSON.parse(old); if (s && s.v === 2) return Object.assign(fresh(), s, { v: 3, course: course.id }); }
      }
    } catch (e) { /* storage unavailable */ }
    return fresh();
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  const lstat = id => S.lessons[id] || (S.lessons[id] = { status: 'new', best: 0, attempts: 0, passedAt: 0 });
  const tstat = id => S.topics[id] || (S.topics[id] = { hist: [], attempts: 0, correct: 0, streak: 0, last: 0 });
  const qstat = id => S.qstats[id] || (S.qstats[id] = { seen: 0, correct: 0, wrong: 0, last: 0 });
  // Checkpoint credit: right answers marked Guess or Unsure do not count toward passing the lesson.
  const cpScore = s => s.answers.filter(a => a.correct && a.conf >= 3).length;

  // Priority points. Wrong and confident is the most dangerous state; right but unsure is probably a guess.
  function points(correct, conf) {
    if (!correct) return conf >= 4 ? 4 : 3;
    if (conf <= 2) return 2;
    if (conf === 3) return 1;
    return 0;
  }
  const kindOf = (correct, conf) => !correct ? (conf >= 4 ? 'wrong-confident' : 'wrong') : (conf <= 2 ? 'guess' : conf === 3 ? 'shaky' : 'solid');
  const KIND_LABEL = { 'wrong-confident': 'Wrong and confident', wrong: 'Wrong', guess: 'Right, but a guess', shaky: 'Right, fairly sure', solid: 'Right and confident' };
  function topicPriority(id) { const t = S.topics[id]; if (!t) return 0; return t.hist.reduce((a, b) => a + b, 0); }
  function topicMastered(id) { const t = S.topics[id]; if (!t) return false; return t.streak >= 3 || (t.attempts >= 3 && topicPriority(id) === 0); }

  function recordAnswer(q, choice, conf) {
    const correct = choice === q.c;
    const p = points(correct, conf);
    if (!q.gen) { const qs = qstat(q.id); qs.seen++; qs[correct ? 'correct' : 'wrong']++; qs.last = Date.now(); }
    const t = tstat(q.t); t.attempts++; if (correct) t.correct++; t.hist.push(p); if (t.hist.length > 8) t.hist.shift();
    t.streak = (correct && conf >= 4) ? t.streak + 1 : 0; t.last = Date.now();
    return { correct, p };
  }

  // ---------- question selection ----------
  function leastSeen(pool, used) {
    const cands = pool.filter(q => !used.has(q.id));
    if (!cands.length) return null;
    const scored = shuffle(cands).map(q => ({ q, s: (S.qstats[q.id] || { seen: 0, last: 0 }) }));
    scored.sort((a, b) => a.s.seen - b.s.seen || a.s.last - b.s.last);
    return scored[0].q;
  }
  function pickForLesson(lessonId, n, used, genShare) {
    const out = []; const pool = byLesson[lessonId] || [];
    used = used || new Set();
    for (let i = 0; i < n * 3 && out.length < n; i++) {
      let q = null;
      if (gens[lessonId] && Math.random() < (genShare == null ? 0.35 : genShare)) q = FRA.generate(lessonId);
      else q = leastSeen(pool, used);
      if (!q && gens[lessonId]) q = FRA.generate(lessonId);
      if (!q) break;
      used.add(q.id); out.push(q);
    }
    return out;
  }
  function buildExam() {
    const items = []; const used = new Set();
    for (const d of DOMAIN_IDS) {
      const quota = DOMAINS[d].quota; const ls = shuffle(lessonsByDomain[d]); let i = 0, guard = 0; const target = items.length + quota;
      while (items.length < target && guard < 400) {
        const l = ls[i % ls.length]; i++; guard++;
        let q = null;
        if (gens[l.id] && Math.random() < 0.3) q = FRA.generate(l.id);
        else q = leastSeen(byLesson[l.id] || [], used);
        if (!q) continue;
        used.add(q.id); items.push(q);
      }
    }
    return shuffle(items);
  }
  function buildStarter() {
    const items = []; const used = new Set();
    for (const d of DOMAIN_IDS) {
      const picks = shuffle(STARTER_POOL[d] || lessonsByDomain[d].map(l => l.id)).slice(0, T.starterPerDomain);
      for (const lid of picks) {
        let q = (gens[lid] && Math.random() < 0.5) ? FRA.generate(lid) : leastSeen(byLesson[lid] || [], used);
        if (!q) q = leastSeen(byLesson[lid] || [], new Set());
        if (q) { used.add(q.id); items.push(q); }
      }
    }
    return shuffle(items);
  }
  const slim = q => q.gen ? q : q.id; // generated questions stored inline, bank questions by id
  const fat = x => typeof x === 'string' ? Q[x] : x;

  // ---------- plan (personalized tutorial) ----------
  function planFromStarter(rec, examIdx) {
    const entries = {}; const domPts = {}; const domCount = {}; DOMAIN_IDS.forEach(d => { domPts[d] = 0; domCount[d] = 0; });
    const add = (id, reason) => { if (!L[id]) return; (entries[id] = entries[id] || { id, reasons: [] }).reasons.push(reason); };
    rec.review.forEach(r => {
      const q = fat(r.q); if (!q) return; const d = L[q.t].domain; const p = points(r.correct, r.conf); domPts[d] += p; domCount[d]++;
      const k = kindOf(r.correct, r.conf);
      if (p >= 2) add(q.t, { kind: k, q: r.q, choice: r.choice, conf: r.conf, source: 'starter' });
    });
    const depth = {};
    for (const d of DOMAIN_IDS) {
      if (domPts[d] >= REBUILD_PTS) { depth[d] = 'rebuild'; lessonsByDomain[d].forEach(l => add(l.id, { kind: 'domain', level: 'rebuild', d, pts: domPts[d] })); }
      else if (domPts[d] >= 3) { depth[d] = 'core'; CORE[d].forEach(id => add(id, { kind: 'domain', level: 'core', d, pts: domPts[d] })); }
      else depth[d] = domPts[d] > 0 ? 'light' : 'solid';
    }
    const list = Object.values(entries).sort((a, b) => L[a.id].index - L[b.id].index);
    return { source: 'starter', examIdx, createdAt: Date.now(), lessons: list, domPts, depth };
  }
  function planFromTest(rec, examIdx) {
    const entries = {}; const pts = {};
    rec.review.forEach(r => {
      const q = fat(r.q); if (!q) return; const p = points(r.correct, r.conf); pts[q.t] = (pts[q.t] || 0) + p;
      if (p >= 2) { (entries[q.t] = entries[q.t] || { id: q.t, reasons: [] }).reasons.push({ kind: kindOf(r.correct, r.conf), q: r.q, choice: r.choice, conf: r.conf, source: 'test' }); }
    });
    const list = Object.values(entries).filter(e => (pts[e.id] || 0) >= 2)
      .sort((a, b) => (pts[b.id] - pts[a.id]) || (DOMAINS[L[b.id].domain].pct - DOMAINS[L[a.id].domain].pct) || (L[a.id].index - L[b.id].index));
    return { source: 'test', examIdx, createdAt: Date.now(), lessons: list, pts };
  }
  const planEntry = id => S.plan ? S.plan.lessons.find(e => e.id === id) : null;
  const planDone = id => { const ls = S.lessons[id]; return !!(ls && ls.status === 'passed' && S.plan && ls.passedAt >= S.plan.createdAt); };
  const planRemaining = () => S.plan ? S.plan.lessons.filter(e => !planDone(e.id)) : [];
  const planMinutes = list => list.reduce((a, e) => a + (L[e.id].minutes || 6) + 3, 0);

  // ---------- stage ----------
  function stage() {
    if (!S.exams.some(e => e.kind === 'starter')) return 'starter';
    if (S.plan && planRemaining().length) return S.plan.source === 'starter' ? 'tutorial' : 'retrain';
    if (S.passStreak >= STREAK_NEEDED) return 'ready';
    if (!S.exams.some(e => e.kind === 'full' || e.kind === 'practice')) return 'fulltest';
    return 'practice';
  }
  const STAGE_LABEL = { starter: 'Starter test', tutorial: 'Initial tutorial', fulltest: `${EXAM_N}-question test`, retrain: 'Retraining', practice: 'Practice tests', ready: 'Ready' };

  function lastExam(kind) { for (let i = S.exams.length - 1; i >= 0; i--) if (!kind || S.exams[i].kind === kind) return S.exams[i]; return null; }
  function weakTopics() {
    return lessons.map(l => ({ l, p: topicPriority(l.id) })).filter(x => x.p > 0 && !topicMastered(x.l.id))
      .sort((a, b) => b.p - a.p || DOMAINS[b.l.domain].pct - DOMAINS[a.l.domain].pct).map(x => x.l.id);
  }
  function readiness() {
    const ex = S.exams.filter(e => e.kind === 'practice' || e.kind === 'full').slice(-3);
    const examPart = ex.length ? ex.reduce((a, e) => a + e.pct, 0) / ex.length : 0;
    const touched = lessons.filter(l => (S.topics[l.id] || { attempts: 0 }).attempts > 0);
    const mastered = lessons.filter(l => topicMastered(l.id)).length;
    const masteryPart = touched.length ? 100 * mastered / lessons.length : 0;
    const streakPart = 100 * Math.min(S.passStreak, STREAK_NEEDED) / STREAK_NEEDED;
    if (!ex.length && !touched.length) return 0;
    return Math.round(0.5 * examPart + 0.3 * masteryPart + 0.2 * streakPart);
  }
  function domainAccuracy(d) {
    let c = 0, t = 0;
    for (const l of lessonsByDomain[d]) { const ts = S.topics[l.id]; if (ts) { c += ts.correct; t += ts.attempts; } }
    return { c, t };
  }
  function nextAction() {
    if (S.active) return { label: S.active.kind === 'train' ? 'Resume drills' : S.active.kind === 'checkpoint' ? 'Resume the lesson checkpoint' : 'Resume your test', act: 'resume', arg: '' };
    const st = stage();
    if (st === 'starter') return { label: 'Take the 10-question starter test', act: 'start-exam', arg: 'starter', sub: 'Two questions from each exam domain, with a confidence rating on each. It builds your tutorial.' };
    if (st === 'tutorial' || st === 'retrain') { const rem = planRemaining(); const l = L[rem[0].id]; return { label: `${st === 'tutorial' ? 'Continue your tutorial' : 'Continue retraining'}: ${l.title}`, act: 'lesson', arg: l.id, sub: `${plural(rem.length, 'lesson')} left, about ${planMinutes(rem)} minutes.` }; }
    if (st === 'fulltest') return { label: `Take the ${EXAM_N}-question test`, act: 'start-exam', arg: 'full', sub: 'Weighted like the real exam. Your misses become the retraining tutorial.' };
    if (st === 'ready') return { label: 'See your readiness report', act: 'go', arg: 'ready' };
    return { label: 'Take a practice test', act: 'start-exam', arg: 'practice', sub: `Pass streak ${S.passStreak} of ${STREAK_NEEDED}. Score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row to be cleared.` };
  }

  // ---------- rendering ----------
  const app = $('#app');
  let railOpen = false; let timerHandle = null; let toastHandle = null;
  let deepOpen = null; // lesson id whose deeper explanation is expanded
  let fb = null; let fbReg = []; // open feedback form, and the questions rendered this pass (for flag buttons)
  const WELCOME_EXEMPT = ['course', 'lesson', 'progress', 'cheatsheet', 'feedback'];

  function toast(msg) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.textContent = msg; clearTimeout(toastHandle); toastHandle = setTimeout(() => t.remove(), 2200); }
  function go(name, arg) { S.view = { name, arg }; save(); render(); window.scrollTo(0, 0); }

  function render() {
    const v = S.view || { name: 'home' };
    fbReg = [];
    if (stage() === 'starter' && !S.active && !WELCOME_EXEMPT.includes(v.name)) { app.innerHTML = viewWelcome() + fbModal(); return; }
    let main = '';
    switch (v.name) {
      case 'home': main = viewHome(); break;
      case 'tutorial': main = viewTutorial(); break;
      case 'course': main = viewCourse(); break;
      case 'lesson': main = viewLesson(v.arg); break;
      case 'exam': main = viewExam(); break;
      case 'results': main = viewResults(v.arg); break;
      case 'train': main = viewTrain(); break;
      case 'progress': main = viewProgress(); break;
      case 'ready': main = viewReady(); break;
      case 'cheatsheet': main = viewCheatsheet(); break;
      case 'feedback': main = viewFeedback(); break;
      default: main = viewHome();
    }
    const r = readiness();
    app.innerHTML = `
      <div class="shell">
        <header class="topbar">
          <button class="rail-toggle" data-act="toggle-rail" aria-label="Toggle lesson outline">Units</button>
          <button class="brand" data-act="go" data-arg="home"><span class="mark">${esc(course.short)}</span> ${esc(course.name)}</button>
          <nav class="nav">
            ${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Cheat sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}${course.catalogUrl ? `<a href="${esc(course.catalogUrl)}" title="${esc(course.brand)}">All courses</a>` : ''}
          </nav>
          <div class="readiness" title="Readiness estimate: recent test scores, mastered topics, and pass streak">
            <span class="eyebrow">Readiness</span>
            <div class="meter ${r >= PASS_PCT ? 'good' : ''}"><i style="width:${r}%"></i></div>
            <span class="tnum" style="font-family:var(--font-display);font-weight:700">${r}%</span>
          </div>
        </header>
        <aside class="rail ${railOpen ? 'open' : ''}">${viewRail()}</aside>
        <main class="main">${main}</main>
        <nav class="mobile-nav">
          ${navBtn('home', 'Home')}${navBtn('tutorial', 'Tutorial')}${navBtn('exam', 'Tests')}${navBtn('train', 'Drills')}${navBtn('cheatsheet', 'Sheet')}${navBtn('progress', 'Progress')}${navBtn('feedback', 'Feedback')}
        </nav>
      </div>${fbModal()}`;
    if (v.name === 'exam' && S.active && S.active.kind !== 'train') startTimer(); else stopTimer();
  }
  function navBtn(name, label) {
    const cur = (S.view.name === name) || (name === 'tutorial' && (S.view.name === 'lesson' || S.view.name === 'course')) || (name === 'exam' && S.view.name === 'results');
    return `<button data-act="nav" data-arg="${name}" ${cur ? 'aria-current="page"' : ''}>${label}</button>`;
  }

  function viewRail() {
    const curLesson = S.view.name === 'lesson' ? S.view.arg : null;
    const rem = new Set(planRemaining().map(e => e.id));
    return `<div class="eyebrow" style="padding:0 8px 10px">Lesson outline</div>` + units.map(u => {
      const passed = u.lessons.filter(l => lstat(l.id).status === 'passed').length;
      const inPlan = u.lessons.filter(l => rem.has(l.id)).length;
      const open = u.lessons.some(l => l.id === curLesson) || (S.view.name === 'course' && S.view.arg === u.id);
      return `<div class="unit">
        <button class="unit-head" data-act="course" data-arg="${u.id}">
          <span class="unit-num">${String(u.n).padStart(2, '0')}</span>
          <span class="unit-title">${esc(u.title)}</span>
          <span class="unit-meta">${inPlan ? `<span class="pill accent" style="padding:1px 7px">${inPlan} to do</span>` : `${passed}/${u.lessons.length}`}</span>
        </button>
        ${open ? `<ul class="lesson-list">${u.lessons.map(l => `<li><button class="lesson-link" data-act="lesson" data-arg="${l.id}" ${l.id === curLesson ? 'aria-current="page"' : ''}><span class="led ${ledClass(l.id)}"></span><span style="flex:1">${esc(l.title)}</span>${rem.has(l.id) ? '<span class="inplan" title="In your tutorial"></span>' : ''}</button></li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('');
  }
  function ledClass(lessonId) { const s = lstat(lessonId).status; if (s === 'passed') return 'green'; if (s === 'read' || (S.topics[lessonId] && S.topics[lessonId].attempts)) return 'amber'; return 'off'; }

  function viewWelcome() {
    return `<main class="main"><div class="content stack" style="gap:22px;padding-top:24px">
      <div class="stack" style="gap:10px">
        <div class="eyebrow">${esc(course.brand)} · ${esc(course.name)}</div>
        <h1>${STARTER_N} questions, then a course built for you.</h1>
        <p class="ink2" style="font-size:1.1rem">The starter test asks ${T.starterPerDomain} questions from each of the ${DOMAIN_IDS.length} exam domains. Every answer also asks how confident you were. A wrong answer you were sure about, and a right answer you guessed, both count against you, because both cost points on exam day.</p>
      </div>
      <div class="card stack" style="gap:10px"><div class="row spread"><div><div class="eyebrow">Before you start</div><h3>The memorization sheet</h3><p class="ink2">Every port number, mask, standard, and step order the exam expects cold. Print it and keep it beside you while you study.</p></div><div class="row"><button class="btn" data-act="go" data-arg="cheatsheet">Open</button><button class="btn" data-act="print-cheat">Print</button></div></div></div>
      <div class="card lift stack" style="gap:14px">
        <h3>How the path works</h3>
        <ol style="margin:0;padding-left:22px;line-height:1.7">
          <li><strong>Starter test.</strong> ${STARTER_N} questions with confidence ratings. Wrong answers are explained at the end.</li>
          <li><strong>Your tutorial.</strong> Lessons chosen from your results. Miss a topic and its lesson opens with your answer versus the right one. Miss a whole domain and you get that domain from the ground up.</li>
          <li><strong>The ${EXAM_N}-question test.</strong> Weighted like the real exam, explained at the end.</li>
          <li><strong>Retraining.</strong> A second tutorial built only from what you missed or guessed, worst first.</li>
          <li><strong>Practice tests</strong> until you score ${PASS_PCT}% or better ${STREAK_NEEDED} times in a row. Then book the exam.</li>
        </ol>
        <div class="row"><button class="btn primary lg" data-act="start-exam" data-arg="starter">Start the ${STARTER_N}-question test</button><button class="btn ghost" data-act="go" data-arg="course">Browse the lessons first</button></div>
      </div>
      <p class="muted">Progress is saved in this browser. The Progress page has a code you can paste into another device. <button class="btn small ghost" data-act="go" data-arg="feedback">Send feedback</button></p>
    </div></main>`;
  }

  function viewHome() {
    const na = nextAction();
    const last = lastExam();
    const lastMeta = last ? { wrong: last.review.filter(r => !r.correct).length, guess: last.review.filter(r => r.correct && r.conf <= 2).length, attempt: S.exams.filter(e => e.kind === last.kind).length } : null;
    const st = stage();
    const passedCount = lessons.filter(l => lstat(l.id).status === 'passed').length;
    const mastered = lessons.filter(l => topicMastered(l.id)).length;
    const rem = planRemaining();
    const weak = weakTopics();
    return `<div class="wide stack" style="gap:20px">
      <div><div class="eyebrow">Stage: ${STAGE_LABEL[st]}</div><h1>${st === 'ready' ? 'You are ready to schedule the exam.' : greeting()}</h1></div>
      <div class="card lift stack" style="gap:12px">
        <div class="eyebrow">Next step</div>
        <div class="row spread">
          <div><h2>${esc(na.label)}</h2>${na.sub ? `<p class="ink2">${esc(na.sub)}</p>` : ''}</div>
          <button class="btn primary lg" data-act="${na.act}" data-arg="${na.arg || ''}">Go</button>
        </div>
      </div>
      ${stageStrip(st)}
      ${S.seen.cheat ? '' : cheatCallout()}
      <div class="stats">
        <div class="stat"><div class="eyebrow">Tutorial</div><div class="big">${S.plan ? (S.plan.lessons.length - rem.length) + '<small> / ' + S.plan.lessons.length + ' lessons</small>' : '<small>not built yet</small>'}</div></div>
        <div class="stat"><div class="eyebrow">Lessons passed</div><div class="big">${passedCount}<small> / ${lessons.length}</small></div></div>
        <div class="stat"><div class="eyebrow">Last test</div><div class="big">${last ? `${last.pct}<small>% · ${last.score} of ${last.total}</small>` : '<small>none yet</small>'}</div>${last ? `<div class="muted" style="font-size:.85rem">${TEST_LABEL[last.kind]}${lastMeta.attempt > 1 ? ` (attempt ${lastMeta.attempt})` : ''} · ${lastMeta.wrong} wrong · ${lastMeta.guess} guessed</div>` : ''}</div>
        <div class="stat"><div class="eyebrow">Pass streak</div><div class="big">${S.passStreak}<small> / ${STREAK_NEEDED} at ${PASS_PCT}%+</small></div></div>
      </div>
      <div class="card stack">
        <div class="row spread"><h3>Accuracy by exam domain</h3><span class="muted" style="font-size:.9rem">${mastered} of ${lessons.length} topics mastered</span></div>
        ${domainBars()}
      </div>
      ${weak.length && !rem.length ? `<div class="card stack"><div class="row spread"><h3>Weak topics for extra drills</h3><button class="btn small" data-act="start-train">Start drills</button></div><div class="topic-list">${weak.slice(0, 5).map(id => topicRow(id)).join('')}</div></div>` : ''}
    </div>`;
  }
  function stageStrip(st) {
    const steps = ['starter', 'tutorial', 'fulltest', 'retrain', 'practice', 'ready'];
    const idx = steps.indexOf(st);
    return `<div class="stage-strip">${steps.map((s, i) => `<div class="stage ${i < idx ? 'done' : ''} ${i === idx ? 'cur' : ''}"><span class="led ${i < idx ? 'green' : i === idx ? 'amber' : 'off'}"></span><span>${STAGE_LABEL[s]}</span></div>`).join('')}</div>`;
  }
  function greeting() {
    if (!S.exams.length) return 'Let’s find out where you stand.';
    const r = readiness();
    if (r >= 70) return 'Almost there. Keep the streak going.';
    if (r >= 40) return 'Good progress. Time to close the gaps.';
    return 'Keep going. Every lesson counts.';
  }
  function topicRow(id) {
    const l = L[id]; const p = topicPriority(id); const t = S.topics[id] || { attempts: 0, correct: 0 };
    return `<div class="topic-item"><div><div class="t-title">${esc(l.title)}</div><div class="t-sub">Unit ${l.unit.n} · ${DOMAINS[l.domain].short} · ${t.correct}/${t.attempts} correct</div></div>
      <div class="row"><span class="pill ${p >= 6 ? 'bad' : p >= 3 ? 'warn' : ''}">${p} pts</span><button class="btn small ghost" data-act="lesson" data-arg="${id}">Lesson</button></div></div>`;
  }
  function domainBars() {
    return `<div class="bars">${DOMAIN_IDS.map(d => { const a = domainAccuracy(d); const v = a.t ? pct(a.c, a.t) : 0;
      return `<div class="bar-row"><span class="label">${DOMAINS[d].short} <span class="muted">${DOMAINS[d].pct}%</span></span><div class="track"><i class="${a.t ? '' : 'dim'}" style="width:${a.t ? v : 100}%"></i></div><span class="value">${a.t ? v + '%' : '—'}</span></div>`; }).join('')}</div>`;
  }

  // ---------- tutorial (plan) ----------
  function reasonLabel(r) {
    if (r.kind === 'domain') return r.level === 'rebuild' ? `${DOMAINS[r.d].short}: ${ALL_WORD} starter questions missed` : `${DOMAINS[r.d].short}: gap on the starter test`;
    const src = r.source === 'starter' ? 'starter test' : 'last test';
    return `${KIND_LABEL[r.kind]} on the ${src}`;
  }
  function lessonWhy(r) { const d = DOMAINS[r.d].short; return r.level === 'rebuild' ? `In your tutorial because you missed ${ALL_WORD} ${d} questions on the starter test.` : `In your tutorial because the starter test showed a gap in ${d}.`; }
  function reasonPill(e) {
    const kinds = e.reasons.map(r => r.kind);
    if (kinds.includes('wrong-confident')) return '<span class="pill bad">Wrong, confident</span>';
    if (kinds.includes('wrong')) return '<span class="pill bad">Wrong</span>';
    if (kinds.includes('guess')) return '<span class="pill warn">Guessed</span>';
    const d = e.reasons.find(r => r.kind === 'domain');
    if (d) return `<span class="pill">${d.level === 'rebuild' ? 'Whole domain' : 'Core lesson'}</span>`;
    return '<span class="pill">Review</span>';
  }
  function viewTutorial() {
    if (!S.plan) {
      return `<div class="content stack" style="gap:18px"><div><div class="eyebrow">Tutorial</div><h1>No tutorial yet</h1><p class="ink2" style="margin-top:6px">${stage() === 'starter' ? 'Take the starter test and your tutorial will be built from the results.' : 'Your last test had no misses or guesses, so there is nothing to retrain. Take a practice test to find new gaps.'}</p></div>
        <div class="row"><button class="btn primary" data-act="start-exam" data-arg="${stage() === 'starter' ? 'starter' : 'practice'}">${stage() === 'starter' ? 'Starter test' : 'Practice test'}</button><button class="btn" data-act="go" data-arg="course">Browse all lessons</button></div></div>`;
    }
    const rem = planRemaining(); const done = S.plan.lessons.length - rem.length;
    const src = S.exams[S.plan.examIdx];
    const byUnit = {}; S.plan.lessons.forEach(e => { const u = L[e.id].unit; (byUnit[u.id] = byUnit[u.id] || { u, list: [] }).list.push(e); });
    const groups = Object.values(byUnit).sort((a, b) => S.plan.source === 'starter' ? a.u.n - b.u.n : Math.min(...a.list.map(e => S.plan.lessons.indexOf(e))) - Math.min(...b.list.map(e => S.plan.lessons.indexOf(e))));
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">${S.plan.source === 'starter' ? 'Your tutorial' : 'Retraining tutorial'} · built from your ${S.plan.source === 'starter' ? 'starter test' : 'test'} on ${src ? fmtDate(src.date) : ''}</div>
        <h1>${rem.length ? `${plural(rem.length, 'lesson')} to go, about ${planMinutes(rem)} minutes` : 'Tutorial complete'}</h1>
        <div class="row" style="margin-top:10px"><div class="meter ${rem.length ? '' : 'good'}"><i style="width:${pct(done, S.plan.lessons.length)}%"></i></div><span class="tnum muted">${done}/${S.plan.lessons.length}</span></div></div>
      ${S.plan.source === 'starter' ? `<div class="card soft stack" style="gap:8px"><div class="eyebrow">How your starter test shaped this</div><div class="row" style="gap:8px">${DOMAIN_IDS.map(d => `<span class="pill ${S.plan.depth[d] === 'rebuild' ? 'bad' : S.plan.depth[d] === 'core' ? 'warn' : S.plan.depth[d] === 'light' ? '' : 'good'}">${DOMAINS[d].short}: ${S.plan.depth[d] === 'rebuild' ? 'all lessons' : S.plan.depth[d] === 'core' ? 'core lessons' : S.plan.depth[d] === 'light' ? 'light review' : 'solid'}</span>`).join('')}</div><p class="ink2" style="font-size:.95rem">Lessons run in course order so each one builds on the last. Lessons tied to a question you missed or guessed open with your answer and the correct one.</p></div>` : `<div class="card soft"><p class="ink2" style="font-size:.95rem">Ordered worst first: topics where you were wrong and confident come before topics you guessed. Each lesson opens with the exact question you missed.</p></div>`}
      ${rem.length ? `<div class="row"><button class="btn primary lg" data-act="lesson" data-arg="${rem[0].id}">${done ? 'Continue' : 'Start'}: ${esc(L[rem[0].id].title)}</button></div>` : `<div class="ready-banner"><strong>All ${S.plan.lessons.length} lessons passed.</strong> ${stage() === 'fulltest' ? `Next: the ${EXAM_N}-question test.` : stage() === 'ready' ? 'You are cleared to book the exam.' : 'Next: a practice test.'} <button class="btn primary small" data-act="start-exam" data-arg="${stage() === 'fulltest' ? 'full' : 'practice'}" style="margin-left:8px">Start it</button></div>`}
      ${groups.map(g => `<div class="card stack" style="gap:8px"><div class="row spread"><h3><span class="muted" style="font-family:var(--font-mono);font-size:.85rem;margin-right:8px">${String(g.u.n).padStart(2, '0')}</span>${esc(g.u.title)}</h3></div>
        ${g.list.map(e => `<button class="option" data-act="lesson" data-arg="${e.id}" style="align-items:center"><span class="led lg ${planDone(e.id) ? 'green' : ledClass(e.id)}"></span><span style="flex:1"><strong>${esc(L[e.id].title)}</strong><br><span class="muted" style="font-size:.88rem">${esc(reasonLabel(e.reasons[0]))}${e.reasons.length > 1 ? ` · +${e.reasons.length - 1} more` : ''}</span></span>${planDone(e.id) ? '<span class="pill good">DONE</span>' : reasonPill(e)}</button>`).join('')}</div>`).join('')}
      <div class="row"><button class="btn ghost" data-act="go" data-arg="course">Browse all ${lessons.length} lessons</button></div>
    </div>`;
  }

  function viewCourse() {
    const uid = S.view.arg;
    const u = uid ? units.find(x => x.id === uid) : null;
    if (u) {
      return `<div class="content stack" style="gap:18px">
        <div><div class="eyebrow">Unit ${u.n}</div><h1>${esc(u.title)}</h1><p class="ink2" style="margin-top:6px">${esc(u.blurb)}</p></div>
        <div class="stack" style="gap:8px">${u.lessons.map((l, i) => `<button class="option" data-act="lesson" data-arg="${l.id}" style="align-items:center"><span class="led lg ${ledClass(l.id)}"></span><span style="flex:1"><strong>${i + 1}. ${esc(l.title)}</strong><br><span class="muted" style="font-size:.9rem">Objective ${l.obj} · ${l.minutes} min read${lstat(l.id).best ? ` · best checkpoint ${lstat(l.id).best}/${CHECKPOINT_N}` : ''}</span></span>${planEntry(l.id) && !planDone(l.id) ? '<span class="pill accent">in tutorial</span>' : ''}</button>`).join('')}</div>
        <div class="row"><button class="btn ghost" data-act="go" data-arg="course">All units</button></div>
      </div>`;
    }
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">All lessons</div><h1>${plural(units.length, 'unit')}, ${plural(lessons.length, 'lesson')}</h1><p class="ink2" style="margin-top:6px">Your tutorial picks from these. Any lesson can be opened at any time; each ends with a four-question checkpoint.</p></div>
      <div class="stack" style="gap:8px">${units.map(u => { const passed = u.lessons.filter(l => lstat(l.id).status === 'passed').length;
        return `<button class="option" data-act="course" data-arg="${u.id}" style="align-items:center"><span class="key">${u.n}</span><span style="flex:1"><strong>${esc(u.title)}</strong><br><span class="muted" style="font-size:.9rem">${esc(u.blurb)}</span></span><span class="tnum muted">${passed}/${u.lessons.length}</span></button>`; }).join('')}</div>
    </div>`;
  }

  // Lesson view with personalization callouts and checkpoint quiz.
  function viewLesson(id) {
    const l = L[id]; if (!l) return viewCourse();
    const ls = lstat(id); if (ls.status === 'new') { ls.status = 'read'; save(); }
    const entry = planEntry(id); const rem = planRemaining(); const posInPlan = entry ? rem.findIndex(e => e.id === id) : -1;
    const nextInPlan = entry ? rem.find(e => e.id !== id) : null;
    const idx = lessons.indexOf(l); const nextLesson = lessons[idx + 1]; const prevLesson = lessons[idx - 1];
    const cp = S.active && S.active.kind === 'checkpoint' && S.active.lesson === id ? S.active : null;
    const callouts = entry ? entry.reasons.filter(r => r.q).map(r => { const q = fat(r.q); if (!q) return ''; const wrong = r.kind === 'wrong' || r.kind === 'wrong-confident';
      return `<div class="callout ${wrong ? 'bad' : 'warn'}"><div class="eyebrow">${wrong ? 'You missed this' : 'You guessed this right'} on the ${r.source === 'starter' ? 'starter test' : 'last test'} · confidence ${r.conf}/5</div>
        <div class="stem">${esc(q.q)}</div>
        <div class="ans">${wrong ? `<span style="color:var(--bad)">You answered ${r.choice >= 0 ? letters[r.choice] + '. ' + esc(q.a[r.choice]) : 'nothing (skipped)'}.</span> ` : ''}<span style="color:var(--good)">Correct: ${letters[q.c]}. ${esc(q.a[q.c])}</span></div>
        <div class="ans ink2">${esc(q.e)}</div></div>`; }).join('') : '';
    const domainReason = entry ? entry.reasons.find(r => r.kind === 'domain') : null;
    let quiz;
    if (!cp) {
      quiz = `<div class="card lift stack"><div class="row spread"><div><div class="eyebrow">Checkpoint</div><h3>${CHECKPOINT_N} questions on this lesson</h3><p class="ink2">Pass ${CHECKPOINT_PASS} of ${CHECKPOINT_N} to complete it. An answer counts only if you were at least fairly sure.${ls.best ? ` Your best so far: ${ls.best}/${CHECKPOINT_N}.` : ''}</p></div><button class="btn primary" data-act="start-checkpoint" data-arg="${id}">Start checkpoint</button></div></div>`;
    } else if (cp.i >= cp.items.length) {
      const score = cpScore(cp); const unsure = cp.answers.filter(a => a.correct && a.conf <= 2).length; const passed = score >= CHECKPOINT_PASS;
      const st = stage();
      let nextBtn = '';
      if (passed) {
        if (nextInPlan) nextBtn = `<button class="btn primary" data-act="finish-checkpoint" data-arg="${nextInPlan.id}">Next in tutorial: ${esc(L[nextInPlan.id].title)}</button>`;
        else if (S.plan && !planRemaining().length) nextBtn = `<button class="btn primary" data-act="finish-checkpoint" data-arg="__test">Tutorial complete. Take the ${EXAM_N}-question ${st === 'fulltest' ? 'test' : 'practice test'}</button>`;
        else if (nextLesson) nextBtn = `<button class="btn primary" data-act="finish-checkpoint" data-arg="${nextLesson.id}">Next lesson: ${esc(nextLesson.title)}</button>`;
      }
      quiz = `<div class="card lift stack"><div class="row spread"><div><div class="eyebrow">Checkpoint result</div><h3>${score} of ${CHECKPOINT_N} ${passed ? 'correct and sure. Lesson complete.' : 'correct and sure. Review and try again.'}</h3>${unsure ? `<p class="ink2">${plural(unsure, 'answer')} right but marked Guess or Unsure did not count.</p>` : ''}</div><span class="pill ${passed ? 'good' : 'warn'}">${passed ? 'PASSED' : 'RETRY'}</span></div>
        <div class="row">${nextBtn}${!passed ? `<button class="btn primary" data-act="start-checkpoint" data-arg="${id}">Try a fresh checkpoint</button>` : ''}<button class="btn ghost" data-act="finish-checkpoint" data-arg="__stay">Stay here</button></div></div>`;
    } else {
      quiz = `<div class="card lift">${questionCard(cp, { showNumber: true, immediate: true })}</div>`;
    }
    return `<div class="content stack" style="gap:20px">
      <div class="lesson-head">
        <div class="row" style="gap:8px"><span class="pill accent">Unit ${l.unit.n}</span><span class="pill">${DOMAINS[l.domain].short}</span><span class="pill">Objective ${l.obj}</span><span class="muted" style="font-size:.9rem">${l.minutes} min read</span>${entry && posInPlan >= 0 ? `<span class="muted" style="font-size:.9rem">· tutorial lesson ${S.plan.lessons.length - rem.length + posInPlan + 1} of ${S.plan.lessons.length}</span>` : ''}<span style="flex:1"></span><button class="btn small ghost fb-btn" data-act="fb-open" data-kind="lesson" data-arg="${id}" title="Send feedback on this lesson">&#9873; Feedback</button></div>
        <h1>${esc(l.title)}</h1>
        ${domainReason && !callouts ? `<p class="ink2">${esc(lessonWhy(domainReason))}</p>` : ''}
      </div>
      ${callouts}
      <article class="lesson-body">${renderBody(l.body)}</article>
      <div class="hook"><span class="eyebrow">Remember</span><div>${inline(l.hook)}</div></div>
      ${deepSection(id)}
      ${quiz}
      <div class="row" style="justify-content:flex-end"><button class="btn small ghost fb-btn" data-act="fb-open" data-kind="lesson" data-arg="${id}">&#9873; Something wrong or unclear in this lesson? Send feedback</button></div>
      <div class="row spread">
        ${prevLesson ? `<button class="btn ghost" data-act="lesson" data-arg="${prevLesson.id}">← ${esc(prevLesson.title)}</button>` : '<span></span>'}
        ${nextLesson ? `<button class="btn ghost" data-act="lesson" data-arg="${nextLesson.id}">${esc(nextLesson.title)} →</button>` : ''}
      </div>
    </div>`;
  }

  // Shared question card. sess: { items, i, answers, sel, conf, submitted }
  function questionCard(sess, opts) {
    const q = fat(sess.items[sess.i]); const n = sess.items.length;
    const submitted = !!sess.submitted; const sel = sess.sel; const conf = sess.conf;
    const l = L[q.t];
    const optionsHtml = q.a.map((opt, k) => {
      let cls = 'option'; const pressed = sel === k ? 'true' : 'false';
      if (submitted && opts.immediate) { if (k === q.c) cls += ' correct'; else if (k === sel) cls += ' wrong'; }
      return `<button class="${cls}" data-act="opt" data-arg="${k}" aria-pressed="${pressed}" ${submitted ? 'disabled' : ''}><span class="key">${letters[k]}</span><span>${esc(opt)}</span></button>`;
    }).join('');
    const confHtml = `<div class="confidence"><span class="eyebrow">How sure are you?</span>${CONF.map(([v, name]) => `<button class="chip" data-act="conf" data-arg="${v}" aria-pressed="${conf === v ? 'true' : 'false'}" ${submitted ? 'disabled' : ''}><span class="k">${v}</span>${name}</button>`).join('')}</div>`;
    let feedback = '';
    if (submitted && opts.immediate) {
      const correct = sel === q.c;
      feedback = `<div class="feedback ${correct ? 'good' : 'bad'}"><div class="verdict">${correct ? (conf <= 2 ? 'Correct, but you were not sure, so it does not count. Read why.' : 'Correct') : `Incorrect. The answer is ${letters[q.c]}.`}</div><div>${esc(q.e)}</div>${l ? `<div class="muted" style="font-size:.9rem">Topic: ${esc(l.title)} (Unit ${l.unit.n})</div>` : ''}</div>`;
    }
    const canSubmit = sel != null && conf != null;
    const controls = submitted
      ? `<div class="row spread"><span class="kbd-hint"><kbd>Enter</kbd> continue</span><button class="btn primary" data-act="next">Continue</button></div>`
      : `<div class="row spread"><span class="kbd-hint"><kbd>A</kbd>–<kbd>D</kbd> answer, <kbd>1</kbd>–<kbd>5</kbd> confidence, <kbd>Enter</kbd> submit</span><div class="row">${opts.allowSkip ? `<button class="btn ghost" data-act="skip">Skip</button>` : ''}<button class="btn primary" data-act="submit" ${canSubmit ? '' : 'disabled'}>Submit</button></div></div>`;
    return `<div class="quiz">
      <div class="q-head"><span class="eyebrow">${opts.title || 'Question'} ${opts.showNumber ? `${sess.i + 1} of ${n}` : ''}</span><span class="row" style="gap:6px">${opts.right || ''}${fbBtn(q, sess.kind)}</span></div>
      <div class="q-stem">${esc(q.q)}</div>
      <div class="options">${optionsHtml}</div>
      ${confHtml}
      ${feedback}
      ${controls}
    </div>`;
  }

  // ---------- tests ----------
  const isTest = k => k === 'starter' || k === 'full' || k === 'practice';
  const TEST_LABEL = { starter: 'Starter test', full: `${EXAM_N}-question test`, practice: 'Practice test' };
  function viewExam() {
    const ex = S.active && isTest(S.active.kind) ? S.active : null;
    if (!ex) return viewTestsHub();
    if (ex.i >= ex.items.length) return finishExam();
    const answered = ex.answers.filter(Boolean).length; const q = fat(ex.items[ex.i]);
    return `<div class="content">
      <div class="exam-head"><span class="pill accent">${TEST_LABEL[ex.kind]}</span><span class="tnum">Question ${ex.i + 1} of ${ex.items.length}</span><div class="meter"><i style="width:${100 * ex.i / ex.items.length}%"></i></div>${S.settings.timer && ex.kind !== 'starter' ? `<span class="timer" id="timer">--:--</span>` : ''}<button class="btn ghost small" data-act="abandon-exam">Quit</button></div>
      <div class="card lift">${questionCard(ex, { immediate: false, allowSkip: true, title: DOMAINS[L[q.t].domain].short })}</div>
      <p class="muted" style="margin-top:12px;font-size:.9rem">No feedback until the end. Every wrong answer and every guess is explained on the results page. ${answered} answered so far.</p>
    </div>`;
  }
  function viewTestsHub() {
    const exams = S.exams.slice().reverse(); const st = stage();
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">Tests</div><h1>Starter, full, and practice tests</h1><p class="ink2" style="margin-top:6px">The starter test is ${STARTER_N} questions, ${T.starterPerDomain} per domain. Full and practice tests are ${EXAM_N} questions weighted like the real exam: ${DOMAIN_IDS.map(d => `${DOMAINS[d].quota} ${DOMAINS[d].short}`).join(', ')}. Unseen questions are chosen first.${course.generatedNote ? ' ' + esc(course.generatedNote) : ''}</p></div>
      <div class="card lift stack"><div class="row spread"><div><h3>${st === 'ready' ? 'Cleared to book the exam' : `Pass streak: ${S.passStreak} of ${STREAK_NEEDED}`}</h3><p class="ink2">${st === 'starter' ? 'Start with the starter test; it builds your tutorial.' : st === 'tutorial' || st === 'retrain' ? `Finish your ${st === 'tutorial' ? 'tutorial' : 'retraining'} first, then the next test unlocks here. You can still take a test early.` : `Score ${PASS_PCT}% or better on ${STREAK_NEEDED} tests in a row and you are cleared to book the real thing.`}</p></div>
        <div class="row">${st === 'starter' ? `<button class="btn primary" data-act="start-exam" data-arg="starter">Starter test</button>` : `<button class="btn" data-act="start-exam" data-arg="starter">Retake starter</button>`}${st !== 'starter' ? `<button class="btn ${st === 'fulltest' || st === 'practice' ? 'primary' : ''}" data-act="start-exam" data-arg="${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'practice' : 'full'}">${S.exams.some(e => e.kind === 'full' || e.kind === 'practice') ? 'Practice test' : `${EXAM_N}-question test`}</button>` : ''}</div></div>
        <label class="row" style="font-size:.92rem;gap:8px"><input type="checkbox" data-act="toggle-timer" ${S.settings.timer ? 'checked' : ''}> Use the ${EXAM_MINUTES}-minute timer on ${EXAM_N}-question tests</label></div>
      ${exams.length ? `<div class="card"><h3 style="margin-bottom:10px">History</h3><div class="table-wrap"><table class="plain"><thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Calibration</th><th></th></tr></thead><tbody>
        ${exams.map((e, k) => { const cm = e.review.filter(r => !r.correct && r.conf >= 4).length, g = e.review.filter(r => r.correct && r.conf <= 2).length;
          return `<tr><td>${fmtDate(e.date)}</td><td>${TEST_LABEL[e.kind]}</td><td class="tnum">${e.score}/${e.total} (${e.pct}%) ${e.kind !== 'starter' ? `<span class="pill ${e.pct >= PASS_PCT ? 'good' : 'bad'}">${e.pct >= PASS_PCT ? 'PASS' : 'BELOW ' + PASS_PCT + '%'}</span>` : ''}</td><td class="muted" style="font-size:.9rem">${cm} confident miss${cm === 1 ? '' : 'es'}, ${g} guess${g === 1 ? '' : 'es'}</td><td><button class="btn small ghost" data-act="go" data-arg="results:${S.exams.length - 1 - k}">Review</button></td></tr>`; }).join('')}
      </tbody></table></div></div>` : ''}
    </div>`;
  }
  function startExam(kind) {
    const items = kind === 'starter' ? buildStarter() : buildExam();
    S.active = { kind, items: items.map(slim), i: 0, answers: [], sel: null, conf: null, submitted: false, startedAt: Date.now() };
    go('exam');
  }
  function finishExam() {
    const ex = S.active; const items = ex.items.map(fat);
    let score = 0; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });
    const review = [];
    items.forEach((q, k) => {
      const a = ex.answers[k] || { choice: -1, conf: 1, skipped: true };
      const res = recordAnswer(q, a.choice, a.conf);
      const d = L[q.t].domain; byDomain[d].t++; if (res.correct) { byDomain[d].c++; score++; }
      review.push({ q: slim(q), choice: a.choice, conf: a.conf, correct: res.correct });
    });
    const total = items.length; const p = pct(score, total);
    const rec = { date: Date.now(), kind: ex.kind, score, total, pct: p, byDomain, review, seconds: Math.round((Date.now() - ex.startedAt) / 1000) };
    S.exams.push(rec); const examIdx = S.exams.length - 1;
    if (ex.kind === 'starter') { S.plan = planFromStarter(rec, examIdx); if (!S.plan.lessons.length) S.plan = null; }
    else {
      S.passStreak = p >= PASS_PCT ? S.passStreak + 1 : 0;
      const plan = planFromTest(rec, examIdx); S.plan = plan.lessons.length ? plan : null;
    }
    S.active = null;
    S.view = { name: 'results', arg: String(examIdx) }; save();
    return viewResults(String(examIdx));
  }
  function viewResults(arg) {
    const idx = parseInt(String(arg).replace('results:', ''), 10); const e = S.exams[idx];
    if (!e) return viewTestsHub();
    const isStarter = e.kind === 'starter';
    const passed = e.pct >= PASS_PCT; const ringColor = isStarter ? 'var(--accent)' : passed ? 'var(--good)' : e.pct >= 70 ? 'var(--warn)' : 'var(--bad)';
    const misses = e.review.filter(r => !r.correct); const guesses = e.review.filter(r => r.correct && r.conf <= 2);
    const confident = misses.filter(r => r.conf >= 4).length;
    const mins = Math.max(1, Math.round(e.seconds / 60));
    const planIsFromThis = S.plan && S.plan.examIdx === idx; const rem = planIsFromThis ? planRemaining() : [];
    let headline, planCard;
    if (isStarter) {
      headline = e.pct >= 90 && !guesses.length ? 'Strong start.' : e.pct >= 60 ? 'A solid base with clear gaps.' : 'Starting from the ground up, which is fine.';
      planCard = planIsFromThis ? `<div class="card lift stack"><div class="row spread"><div><div class="eyebrow">Your tutorial</div><h3>${plural(S.plan.lessons.length, 'lesson')}, about ${planMinutes(S.plan.lessons)} minutes</h3></div><button class="btn primary" data-act="lesson" data-arg="${rem.length ? rem[0].id : S.plan.lessons[0].id}">Start the tutorial</button></div>
        <div class="row" style="gap:8px">${DOMAIN_IDS.map(d => `<span class="pill ${S.plan.depth[d] === 'rebuild' ? 'bad' : S.plan.depth[d] === 'core' ? 'warn' : S.plan.depth[d] === 'light' ? '' : 'good'}">${DOMAINS[d].short}: ${S.plan.depth[d] === 'rebuild' ? 'all lessons' : S.plan.depth[d] === 'core' ? 'core lessons' : S.plan.depth[d] === 'light' ? 'light review' : 'solid'}</span>`).join('')}</div>
        <p class="ink2" style="font-size:.95rem">Missed ${ALL_WORD} questions in a domain: you get every lesson in that domain. Missed one, or guessed: you get that domain's core lessons plus the exact topic. Confident and correct on ${ALL_WORD}: nothing from that domain.</p>
        <button class="btn ghost small" data-act="go" data-arg="tutorial" style="align-self:flex-start">See the full plan</button></div>`
        : `<div class="ready-banner"><strong>Every answer right and confident.</strong> There is nothing to teach yet, so the ${EXAM_N}-question test is next. <button class="btn primary small" data-act="start-exam" data-arg="full" style="margin-left:8px">Start it</button></div>`;
    } else {
      headline = passed ? 'Passing score.' : e.pct >= 70 ? 'Close. Not there yet.' : 'Below the line. Now you know what to retrain.';
      planCard = planIsFromThis ? `<div class="card lift stack"><div class="row spread"><div><div class="eyebrow">Retraining tutorial</div><h3>${plural(S.plan.lessons.length, 'lesson')}, about ${planMinutes(S.plan.lessons)} minutes</h3><p class="ink2">Worst first. Each lesson opens with the question you missed.</p></div><button class="btn primary" data-act="lesson" data-arg="${rem.length ? rem[0].id : S.plan.lessons[0].id}">Start retraining</button></div>
        <div class="topic-list">${S.plan.lessons.slice(0, 8).map(en => `<div class="topic-item"><div><div class="t-title">${esc(L[en.id].title)}</div><div class="t-sub">${en.reasons.map(r => KIND_LABEL[r.kind]).join(', ')}</div></div>${reasonPill(en)}</div>`).join('')}${S.plan.lessons.length > 8 ? `<button class="btn ghost small" data-act="go" data-arg="tutorial">and ${S.plan.lessons.length - 8} more</button>` : ''}</div></div>`
        : `<div class="ready-banner"><strong>No misses and no guesses.</strong> ${S.passStreak >= STREAK_NEEDED ? 'You are cleared to book the exam.' : 'Nothing to retrain. Take another practice test to extend your streak.'} ${S.passStreak < STREAK_NEEDED ? `<button class="btn primary small" data-act="start-exam" data-arg="practice" style="margin-left:8px">Practice test</button>` : ''}</div>`;
    }
    const reviewItem = (r, wrong) => { const q = fat(r.q); if (!q) return ''; return `<div class="review-item"><div class="row" style="gap:6px;margin-bottom:4px"><span class="pill ${wrong ? (r.conf >= 4 ? 'bad' : 'warn') : 'warn'}">${KIND_LABEL[kindOf(r.correct, r.conf)]}</span><span class="pill">${DOMAINS[L[q.t].domain].short}</span></div><div class="stem">${esc(q.q)}</div><div class="ans">${wrong ? `<span style="color:var(--bad)">You: ${r.choice >= 0 ? letters[r.choice] + '. ' + esc(q.a[r.choice]) : 'skipped'}</span> · ` : ''}<span style="color:var(--good)">Correct: ${letters[q.c]}. ${esc(q.a[q.c])}</span></div><div class="ans ink2">${esc(q.e)}</div><div class="ans muted row" style="gap:6px">${esc(L[q.t].title)} · <button class="btn small ghost" data-act="lesson" data-arg="${q.t}">Open lesson</button>${fbBtn(q, e.kind + '-results')}</div></div>`; };
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">${TEST_LABEL[e.kind]} · ${fmtDate(e.date)} · ${mins} min</div><h1>${headline}</h1></div>
      <div class="card lift"><div class="score-hero"><div class="score-ring" style="--pct:${e.pct};--ring-color:${ringColor}"><div>${e.pct}%</div></div>
        <div class="stack" style="gap:8px"><div><strong>${e.score} of ${e.total} correct</strong> (${e.score - guesses.length} sure, ${guesses.length} guessed), ${misses.length} wrong. ${isStarter ? 'The starter test measures where to begin, not whether you would pass.' : `${esc(course.realExamNote)} This course holds you to ${PASS_PCT}% so the real thing has margin.`}</div>
        <div class="row" style="gap:8px"><span class="pill ${confident ? 'bad' : 'good'}">${confident} confident miss${confident === 1 ? '' : 'es'}</span><span class="pill ${guesses.length ? 'warn' : 'good'}">${guesses.length} guess${guesses.length === 1 ? '' : 'es'}</span>${!isStarter ? `<span class="pill ${S.passStreak ? 'good' : ''}">streak ${S.passStreak}/${STREAK_NEEDED}</span>` : ''}</div>
        <div class="muted" style="font-size:.9rem">A confident miss is wrong at confidence 4 or 5. A guess is right at confidence 1 or 2. Both go into your tutorial.</div></div></div></div>
      <div class="card stack"><h3>By domain</h3><div class="bars">${DOMAIN_IDS.map(d => `<div class="bar-row"><span class="label">${DOMAINS[d].short}</span><div class="track"><i style="width:${pct(e.byDomain[d].c, e.byDomain[d].t)}%"></i></div><span class="value">${e.byDomain[d].c}/${e.byDomain[d].t}</span></div>`).join('')}</div></div>
      ${planCard}
      ${misses.length ? `<div class="card"><h3 style="margin-bottom:6px">Wrong answers explained (${misses.length})</h3>${misses.map(r => reviewItem(r, true)).join('')}</div>` : ''}
      ${guesses.length ? `<div class="card"><h3 style="margin-bottom:6px">Right, but you were not sure (${guesses.length})</h3><p class="muted" style="font-size:.9rem;margin-bottom:6px">These count as gaps. Read why the answer is right so it stops being a guess.</p>${guesses.map(r => reviewItem(r, false)).join('')}</div>` : ''}
      <div class="row"><button class="btn ghost" data-act="go" data-arg="home">Home</button><button class="btn ghost" data-act="go" data-arg="exam">All tests</button></div>
    </div>`;
  }

  // ---------- drills (optional extra practice on weak topics) ----------
  function viewTrain() {
    const tr = S.active && S.active.kind === 'train' ? S.active : null;
    if (!tr) {
      const weak = weakTopics();
      return `<div class="content stack" style="gap:18px">
        <div><div class="eyebrow">Drills</div><h1>Extra practice on weak topics</h1><p class="ink2" style="margin-top:6px">Drills are optional and run alongside your tutorial. A session covers up to three of your weakest topics: a quick refresher, then questions with instant feedback. Miss one and it comes back reworded a few questions later. A topic is done after three confident correct answers in a row.</p></div>
        ${weak.length ? `<div class="card lift stack"><div class="row spread"><div><h3>${plural(weak.length, 'topic')} need work</h3><p class="ink2">About 15 minutes per session.</p></div><button class="btn primary" data-act="start-train">Start session</button></div><div class="topic-list">${weak.map(t => topicRow(t)).join('')}</div></div>`
          : `<div class="card lift stack"><h3>No weak topics on record</h3><p class="ink2">${S.exams.length ? 'Everything you have been tested on is mastered.' : 'Take the starter test first and the weak-topic list will build itself.'}</p><div class="row"><button class="btn" data-act="pick-train">Drill a topic anyway</button></div></div>`}
      </div>`;
    }
    if (tr.phase === 'pick') {
      return `<div class="content stack" style="gap:18px"><div><div class="eyebrow">Drills</div><h1>Pick a topic to drill</h1></div>
        <div class="stack" style="gap:6px">${lessons.map(l => `<button class="option" data-act="train-topic" data-arg="${l.id}" style="align-items:center"><span class="led ${ledClass(l.id)}"></span><span style="flex:1">${esc(l.title)} <span class="muted">· Unit ${l.unit.n}</span></span><span class="pill">${topicPriority(l.id)} pts</span></button>`).join('')}</div>
        <button class="btn ghost" data-act="abandon-train">Cancel</button></div>`;
    }
    if (tr.ti >= tr.topics.length) {
      const done = tr.log; const c = done.filter(x => x.correct).length; const still = weakTopics();
      S.active = null; save();
      return `<div class="content stack" style="gap:18px"><div><div class="eyebrow">Drill session complete</div><h1>${c} of ${done.length} correct</h1></div>
        <div class="card lift stack"><h3>Topics covered</h3><div class="topic-list">${tr.topics.map(t => `<div class="topic-item"><div><div class="t-title">${esc(L[t].title)}</div><div class="t-sub">${topicMastered(t) ? 'Mastered' : `${topicPriority(t)} priority points remaining`}</div></div><span class="pill ${topicMastered(t) ? 'good' : 'warn'}">${topicMastered(t) ? 'DONE' : 'KEEP GOING'}</span></div>`).join('')}</div></div>
        <div class="row">${still.length ? `<button class="btn primary" data-act="start-train">Next session (${still.length} left)</button>` : ''}<button class="btn ghost" data-act="go" data-arg="home">Home</button></div></div>`;
    }
    const topic = tr.topics[tr.ti]; const l = L[topic];
    const header = `<div class="row spread"><div class="row" style="gap:8px"><span class="pill accent">Topic ${tr.ti + 1} of ${tr.topics.length}</span><span class="pill">${DOMAINS[l.domain].short}</span><span class="pill ${tr.streak >= 2 ? 'good' : ''}">streak ${tr.streak}/3</span></div><button class="btn ghost small" data-act="abandon-train">End session</button></div>`;
    if (tr.phase === 'lesson') {
      return `<div class="content stack" style="gap:18px">${header}
        <div class="row spread"><div><div class="eyebrow">Refresher</div><h1>${esc(l.title)}</h1></div><button class="btn small ghost fb-btn" data-act="fb-open" data-kind="lesson" data-arg="${topic}">&#9873; Feedback</button></div>
        <div class="hook"><span class="eyebrow">Remember</span><div>${inline(l.hook)}</div></div>
        <details class="lesson-fold" ${topicPriority(topic) >= 6 ? 'open' : ''}><summary>Read the full lesson</summary><article class="lesson-body">${renderBody(l.body)}</article></details>
        ${deepSection(topic)}
        <div class="row"><button class="btn primary lg" data-act="train-drills">Start drills</button></div></div>`;
    }
    if (tr.i >= tr.items.length) { extendQueue(tr); if (tr.i >= tr.items.length) { tr.ti++; tr.phase = 'lesson'; tr.i = 0; tr.items = []; tr.answers = []; tr.streak = 0; tr.drills = 0; save(); return viewTrain(); } }
    return `<div class="content stack" style="gap:18px">${header}
      <div class="card lift">${questionCard(tr, { immediate: true, title: esc(l.title) })}</div>
      <p class="muted" style="font-size:.9rem">Drill ${tr.drills + 1}. Three correct in a row at confidence 4 or 5 completes this topic.</p></div>`;
  }
  function startTrain(topics) {
    const list = topics && topics.length ? topics : weakTopics().slice(0, 3);
    if (!list.length) { S.active = { kind: 'train', phase: 'pick' }; go('train'); return; }
    S.active = { kind: 'train', topics: list, ti: 0, phase: 'lesson', items: [], i: 0, answers: [], sel: null, conf: null, submitted: false, streak: 0, drills: 0, log: [], used: [] };
    go('train');
  }
  function extendQueue(tr) {
    const topic = tr.topics[tr.ti]; const used = new Set(tr.used || []);
    const fresh = pickForLesson(topic, 4, used, 0.4);
    if (!fresh.length) { const misses = tr.answers.filter(a => !a.correct).map(a => a.q); misses.forEach(q => tr.items.push(slim(fat(q)))); return; }
    fresh.forEach(q => { tr.items.push(slim(q)); tr.used.push(q.id); });
  }

  // ---------- progress ----------
  function viewProgress() {
    const mastered = lessons.filter(l => topicMastered(l.id)).length;
    return `<div class="wide stack" style="gap:18px">
      <div><div class="eyebrow">Progress</div><h1>${mastered} of ${lessons.length} topics mastered</h1></div>
      <div class="card stack"><h3>Accuracy by domain</h3>${domainBars()}</div>
      <div class="card"><h3 style="margin-bottom:10px">Every topic</h3><div class="table-wrap"><table class="plain"><thead><tr><th>Unit</th><th>Lesson</th><th>Checkpoint</th><th>Answered</th><th>Priority</th><th>Status</th></tr></thead><tbody>
        ${lessons.map(l => { const ls = lstat(l.id); const t = S.topics[l.id] || { attempts: 0, correct: 0 }; const p = topicPriority(l.id); const m = topicMastered(l.id);
          return `<tr><td class="tnum muted">${l.unit.n}</td><td><button class="btn small ghost" data-act="lesson" data-arg="${l.id}" style="padding-left:0">${esc(l.title)}</button></td><td>${ls.status === 'passed' ? `<span class="pill good">passed ${ls.best}/${CHECKPOINT_N}</span>` : ls.status === 'read' ? '<span class="pill">read</span>' : '<span class="muted">—</span>'}</td><td class="tnum">${t.correct}/${t.attempts}</td><td class="tnum">${p}</td><td><span class="led ${m ? 'green' : t.attempts ? 'amber' : 'off'}" style="display:inline-block;vertical-align:middle"></span> ${m ? 'mastered' : t.attempts ? 'in progress' : 'not started'}</td></tr>`; }).join('')}
      </tbody></table></div></div>
      <div class="card stack"><h3>Move your progress to another device</h3><p class="ink2">Copy this code, paste it into the same box on your other device, and press Load. Progress and saved feedback live only in this browser otherwise.</p>
        <textarea class="io" id="io" spellcheck="false">${esc(JSON.stringify(exportable()))}</textarea>
        <div class="row"><button class="btn" data-act="copy">Copy</button><button class="btn" data-act="import">Load from box</button><span style="flex:1"></span><button class="btn danger small" data-act="reset">Reset everything</button></div></div>
    </div>`;
  }
  function exportable() { const c = JSON.parse(JSON.stringify(S)); c.active = null; return c; }

  function viewReady() {
    const last3 = S.exams.filter(e => e.kind === 'practice' || e.kind === 'full').slice(-3);
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">Readiness report</div><h1>${S.passStreak >= STREAK_NEEDED ? 'Book the exam.' : 'Not yet.'}</h1></div>
      ${S.passStreak >= STREAK_NEEDED ? `<div class="ready-banner stack"><strong>You scored ${PASS_PCT}% or better on ${S.passStreak} tests in a row${last3.length ? ` (${last3.map(e => e.pct + '%').join(', ')})` : ''}.</strong><p>${esc(course.realExamNote)} You have margin. Schedule it for the next week or two while the material is fresh, and do one drill session a day until then.</p></div>` : `<div class="card"><p>You need ${STREAK_NEEDED - S.passStreak} more test${STREAK_NEEDED - S.passStreak === 1 ? '' : 's'} at ${PASS_PCT}% or better in a row.</p></div>`}
      <div class="card stack"><h3>Exam day</h3><ul style="margin:0;padding-left:20px;line-height:1.7">
        ${(course.examDay || []).map(t => `<li>${inline(t)}</li>`).join('')}
      </ul></div>
      <div class="row"><button class="btn" data-act="start-exam" data-arg="practice">One more practice test</button><button class="btn ghost" data-act="go" data-arg="home">Home</button></div>
    </div>`;
  }


  // ---------- deeper explanations ----------
  function deepSection(id) {
    const l = L[id]; const deep = FRA.deep && FRA.deep[id]; if (!l || !deep) return '';
    if (deepOpen !== id) return `<div class="row deep-cta"><button class="btn" data-act="deep-toggle" data-arg="${id}">Need a deeper explanation?</button><span class="muted" style="font-size:.9rem">A slower walkthrough of this lesson with worked examples.</span></div>`;
    return `<section class="card deep stack" id="deep"><div class="row spread"><div><div class="eyebrow">Deeper explanation</div><h3>${esc(l.title)}, explained slowly</h3></div><button class="btn small ghost" data-act="deep-toggle" data-arg="${id}">Hide</button></div>
      <article class="lesson-body deep-body">${renderBody(deep)}</article>
      <div class="row spread"><button class="btn small ghost fb-btn" data-act="fb-open" data-kind="lesson" data-arg="${id}">&#9873; Feedback on this explanation</button><button class="btn small ghost" data-act="deep-toggle" data-arg="${id}">Hide</button></div></section>`;
  }

  // ---------- cheat sheet ----------
  function csBlock(b) {
    if (b.type === 'table') return `${b.title ? `<h3>${inline(b.title)}</h3>` : ''}<div class="table-wrap"><table class="cs-table"><thead><tr>${b.cols.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b.type === 'list') return `<div class="cs-list ${b.cols === 2 ? 'two' : ''}">${b.title ? `<h3>${inline(b.title)}</h3>` : ''}<ul>${b.items.map(i => `<li>${inline(i)}</li>`).join('')}</ul></div>`;
    if (b.type === 'note') return `<div class="tip">${inline(b.text)}</div>`;
    return '';
  }
  function viewCheatsheet() {
    const cs = FRA.cheatsheet; if (!cs) return '<div class="content"><p>No cheat sheet loaded.</p></div>';
    const intro = S.view.arg === 'intro';
    if (!S.seen.cheat) { S.seen.cheat = true; save(); }
    const printBtn = `<button class="btn primary" data-act="print-cheat">Print or save as PDF</button>`;
    return `<div class="wide cs stack" style="gap:16px">
      <div class="no-print row spread" style="align-items:flex-start">
        <div><div class="eyebrow">Cheat sheet</div><h1>${esc(cs.title)}</h1><p class="ink2" style="margin-top:6px;max-width:720px">${esc(cs.intro)}</p></div>
        <div class="row">${printBtn}</div>
      </div>
      ${intro ? `<div class="callout accent no-print"><strong>Start here.</strong><div class="ans">This sheet is everything the exam expects you to recall from memory. Print it now, or save it as a PDF, and keep it beside you through the course. When you are ready, the ten-question starter test builds your tutorial.</div><div class="row" style="margin-top:6px"><button class="btn primary" data-act="cheat-continue">Continue to the starter test</button><button class="btn ghost" data-act="go" data-arg="home">Skip for now</button></div></div>` : ''}
      <nav class="cs-toc no-print" aria-label="Sections">${cs.sections.map((s, i) => `<a href="#cs-${s.id}">${i + 1}. ${esc(s.title)}</a>`).join('')}</nav>
      <div class="print-only cs-print-head"><h1>${esc(cs.title)}</h1><p>${esc(cs.intro)}</p></div>
      ${cs.sections.map((s, i) => `<section class="cs-section" id="cs-${s.id}"><h2><span class="cs-num">${String(i + 1).padStart(2, '0')}</span>${esc(s.title)}</h2>${s.blocks.map(csBlock).join('')}</section>`).join('')}
      <div class="row no-print">${printBtn}${intro ? `<button class="btn" data-act="cheat-continue">Continue to the starter test</button>` : `<button class="btn ghost" data-act="go" data-arg="home">Home</button>`}</div>
    </div>`;
  }
  function cheatCallout() {
    return `<div class="callout accent"><div class="row spread"><div><div class="eyebrow">New</div><strong>The memorization sheet</strong><div class="ans ink2">Every port, mask, standard, and step order the exam expects cold. Print it and keep it beside you.</div></div><div class="row"><button class="btn small" data-act="go" data-arg="cheatsheet">Open</button><button class="btn small" data-act="print-cheat">Print</button><button class="btn small ghost" data-act="cheat-dismiss">Dismiss</button></div></div></div>`;
  }

  // ---------- feedback ----------
  function fbBtn(q, where) { const i = fbReg.push({ q, where }) - 1; return `<button class="btn small ghost fb-btn" data-act="fb-open" data-kind="question" data-arg="${i}" title="Report a problem with this question">&#9873; Flag</button>`; }
  function fbModal() {
    if (!fb) return '';
    const cats = FB_CATS[fb.kind === 'question' ? 'question' : fb.kind === 'lesson' ? 'lesson' : 'overall'];
    return `<div class="modal-back" data-act="fb-cancel"><div class="modal stack" role="dialog" aria-modal="true" aria-labelledby="fb-title">
      <div><div class="eyebrow">Feedback</div><h3 id="fb-title">${esc(fb.title)}</h3>${fb.sub ? `<p class="muted" style="font-size:.9rem;margin-top:4px">${esc(fb.sub)}</p>` : ''}</div>
      <label class="field">What is the issue?<select id="fb-cat">${cats.map(c => `<option>${esc(c)}</option>`).join('')}</select></label>
      <label class="field">Details<textarea id="fb-text" rows="4" placeholder="What is wrong, and what should it say instead?"></textarea></label>
      <div class="row spread"><span class="muted" style="font-size:.85rem">Saved in this browser. Export it from the Feedback tab.</span><div class="row"><button class="btn ghost" data-act="fb-cancel">Cancel</button><button class="btn primary" data-act="fb-save">Save feedback</button></div></div>
    </div></div>`;
  }
  function saveFeedback(item) {
    const f = Object.assign({ id: 'fb-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ts: Date.now(), sent: false }, item);
    S.feedback = S.feedback || []; S.feedback.push(f); save();
    if (FEEDBACK_ENDPOINT && typeof fetch === 'function') {
      try { fetch(FEEDBACK_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ course: course.id }, f)) }).then(r => { if (r.ok) { f.sent = true; save(); } }).catch(() => { /* offline; stays local */ }); } catch (e) { /* ignore */ }
    }
    return f;
  }
  const FB_KIND = { question: 'Question', lesson: 'Lesson', unit: 'Unit', site: 'Website', page: 'Page', overall: 'Overall' };
  function fbContext(f) {
    const r = f.ref || {}; const l = r.lesson ? L[r.lesson] : null; const u = r.unit ? units.find(x => x.id === r.unit) : null;
    if (f.kind === 'question') return `${l ? l.title : 'Question'}${r.where ? ' · ' + (WHERE_LABEL[r.where] || r.where) : ''}`;
    if (l) return `${l.title} (Unit ${l.unit.n})`;
    if (u) return `Unit ${u.n}: ${u.title}`;
    if (f.kind === 'page') return `Page: ${r.view || ''}${r.arg ? ' ' + r.arg : ''}`;
    return f.kind === 'site' ? 'The website' : 'The course overall';
  }
  function feedbackReport() {
    const items = S.feedback || [];
    const lines = [`# ${course.name} feedback (${plural(items.length, 'item')}, exported ${new Date().toISOString().slice(0, 10)})`, ''];
    items.forEach((f, i) => {
      const r = f.ref || {}; const l = r.lesson ? L[r.lesson] : null;
      lines.push(`## ${i + 1}. ${FB_KIND[f.kind] || f.kind} · ${f.cat || 'Uncategorized'} · ${new Date(f.ts).toISOString().slice(0, 10)}`);
      lines.push(`- About: ${fbContext(f)}`);
      if (l) lines.push(`- Lesson id: ${l.id}`);
      if (r.stem) { lines.push(`- Question${r.qid ? ' ' + r.qid : ' (generated at run time)'}: ${r.stem}`); (r.options || []).forEach((o, k) => lines.push(`  - ${letters[k]}. ${o}${k === r.correct ? ' (marked correct)' : ''}`)); }
      lines.push(`- Feedback: ${f.text}`, '');
    });
    return lines.join('\n');
  }
  function copyText(txt, msg) {
    const done = () => toast(msg || 'Copied');
    try { navigator.clipboard.writeText(txt).then(done, () => fallback()); } catch (err) { fallback(); }
    function fallback() { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Could not copy'); } ta.remove(); }
  }
  function viewFeedback() {
    const items = (S.feedback || []).slice().reverse();
    const mailto = FEEDBACK_EMAIL ? `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(course.name + ' feedback')}&body=${encodeURIComponent(feedbackReport().slice(0, 1800))}` : '';
    return `<div class="content stack" style="gap:18px">
      <div><div class="eyebrow">Feedback</div><h1>Help refine this course</h1><p class="ink2" style="margin-top:6px">Flag any question from its &#9873; button, any lesson from its feedback button, or write anything here about a unit, a lesson, the site, or the course overall.</p></div>
      <div class="card lift stack">
        <h3>Send feedback</h3>
        <label class="field">About<select id="fb-area"><option value="overall">The course overall</option><option value="site">The website: bugs, design, usability</option><optgroup label="Units">${units.map(u => `<option value="unit:${u.id}">Unit ${u.n}: ${esc(u.title)}</option>`).join('')}</optgroup><optgroup label="Lessons">${lessons.map(l => `<option value="lesson:${l.id}">${esc(l.title)}</option>`).join('')}</optgroup></select></label>
        <label class="field">Type<select id="fb-cat">${FB_CATS.overall.map(c => `<option>${esc(c)}</option>`).join('')}</select></label>
        <label class="field">Your feedback<textarea id="fb-text" rows="5" placeholder="What should change, and why?"></textarea></label>
        <div class="row"><button class="btn primary" data-act="fb-save-page">Save feedback</button></div>
      </div>
      <div class="card stack">
        <div class="row spread"><h3>Saved feedback (${items.length})</h3><div class="row"><button class="btn small" data-act="fb-copy" ${items.length ? '' : 'disabled'}>Copy report</button><button class="btn small" data-act="fb-download" ${items.length ? '' : 'disabled'}>Download JSON</button>${mailto ? `<a class="btn small" href="${mailto}">Email</a>` : ''}${items.length ? `<button class="btn small danger" data-act="fb-clear">Clear all</button>` : ''}</div></div>
        ${items.length ? items.map(f => `<div class="review-item"><div class="row" style="gap:6px;margin-bottom:4px"><span class="pill accent">${FB_KIND[f.kind] || f.kind}</span><span class="pill">${esc(f.cat || '')}</span><span class="muted" style="font-size:.85rem">${fmtDate(f.ts)}${f.sent ? ' · sent' : ''}</span><span style="flex:1"></span><button class="btn small ghost" data-act="fb-delete" data-arg="${f.id}">Delete</button></div><div class="stem">${esc(fbContext(f))}</div>${f.ref && f.ref.stem ? `<div class="ans muted">${esc(f.ref.stem)}</div>` : ''}<div class="ans">${esc(f.text)}</div></div>`).join('') : '<p class="muted">Nothing saved yet.</p>'}
        <p class="muted" style="font-size:.85rem">Feedback stays in this browser and travels with the progress code on the Progress page. Copy the report and paste it into a message to the course author.</p>
      </div>
    </div>`;
  }

  // ---------- timer ----------
  function startTimer() {
    stopTimer(); if (!S.settings.timer) return;
    const tick = () => {
      const ex = S.active; if (!ex || !isTest(ex.kind) || ex.kind === 'starter') { stopTimer(); return; }
      const remain = EXAM_MINUTES * 60 - Math.floor((Date.now() - ex.startedAt) / 1000);
      const el = $('#timer'); if (el) { const m = Math.max(0, Math.floor(remain / 60)), s = Math.max(0, remain % 60); el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; el.classList.toggle('low', remain < 300); }
      if (remain <= 0) { stopTimer(); ex.i = ex.items.length; save(); toast('Time is up. Scoring your test.'); render(); }
    };
    tick(); timerHandle = setInterval(tick, 1000);
  }
  function stopTimer() { if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }

  // ---------- actions ----------
  function sessionForView() {
    const a = S.active; if (!a) return null;
    if (a.kind === 'checkpoint' && S.view.name === 'lesson' && S.view.arg === a.lesson) return a;
    if (isTest(a.kind) && S.view.name === 'exam') return a;
    if (a.kind === 'train' && S.view.name === 'train' && a.phase === 'drill') return a;
    return null;
  }
  function submitAnswer(sess, skipped) {
    const q = fat(sess.items[sess.i]);
    const choice = skipped ? -1 : sess.sel; const conf = skipped ? 1 : sess.conf;
    if (isTest(sess.kind)) {
      sess.answers[sess.i] = { choice, conf, skipped: !!skipped };
      sess.i++; sess.sel = null; sess.conf = null; sess.submitted = false; save(); render(); return;
    }
    const res = recordAnswer(q, choice, conf);
    sess.answers[sess.i] = { choice, conf, correct: res.correct, q: slim(q) };
    sess.submitted = true;
    if (sess.kind === 'train') {
      sess.drills++; sess.log.push({ t: q.t, correct: res.correct });
      sess.streak = (res.correct && conf >= 4) ? sess.streak + 1 : 0;
      if (!res.correct) {
        const again = pickForLesson(q.t, 1, new Set(sess.used || []), gens[q.t] ? 0.6 : 0)[0];
        if (again) { sess.items.splice(Math.min(sess.items.length, sess.i + 3), 0, slim(again)); sess.used.push(again.id); }
      }
    }
    save(); render();
  }
  function advance(sess) {
    if (sess.kind === 'checkpoint') {
      sess.i++; sess.sel = null; sess.conf = null; sess.submitted = false;
      if (sess.i >= sess.items.length) { const score = cpScore(sess); const ls = lstat(sess.lesson); ls.attempts++; ls.best = Math.max(ls.best, score); if (score >= CHECKPOINT_PASS) { ls.status = 'passed'; ls.passedAt = Date.now(); } }
      save(); render(); return;
    }
    if (sess.kind === 'train') {
      sess.i++; sess.sel = null; sess.conf = null; sess.submitted = false;
      const doneTopic = sess.streak >= 3 || sess.drills >= 10;
      if (doneTopic) { const t = sess.topics[sess.ti]; if (sess.streak >= 3) { const ts = tstat(t); ts.streak = Math.max(ts.streak, 3); ts.hist = []; } sess.ti++; sess.phase = 'lesson'; sess.i = 0; sess.items = []; sess.answers = []; sess.streak = 0; sess.drills = 0; }
      else if (sess.i >= sess.items.length) extendQueue(sess);
      save(); render();
    }
  }

  app.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    if (btn.tagName === 'INPUT') return;
    const act = btn.dataset.act; const arg = btn.dataset.arg;
    switch (act) {
      case 'toggle-rail': railOpen = !railOpen; $('.rail').classList.toggle('open', railOpen); return;
      case 'go': { if (arg && arg.startsWith('results:')) return go('results', arg); return go(arg || 'home'); }
      case 'nav': railOpen = false; return go(arg);
      case 'course': railOpen = false; return go('course', arg);
      case 'lesson': railOpen = false; if (deepOpen !== arg) deepOpen = null; if (S.active && S.active.kind === 'checkpoint' && S.active.lesson !== arg) S.active = null; return go('lesson', arg);
      case 'start-checkpoint': { const items = pickForLesson(arg, CHECKPOINT_N, new Set(), 0.3); if (!items.length) { toast('No questions for this lesson yet.'); return; } S.active = { kind: 'checkpoint', lesson: arg, items: items.map(slim), i: 0, answers: [], sel: null, conf: null, submitted: false }; save(); render(); return; }
      case 'finish-checkpoint': { S.active = null; save(); if (arg === '__stay') return render(); if (arg === '__test') return startExam(S.exams.some(x => x.kind === 'full' || x.kind === 'practice') ? 'practice' : 'full'); return go('lesson', arg); }
      case 'opt': { const s = sessionForView(); if (!s || s.submitted) return; s.sel = parseInt(arg, 10); save(); render(); return; }
      case 'conf': { const s = sessionForView(); if (!s || s.submitted) return; s.conf = parseInt(arg, 10); save(); render(); return; }
      case 'submit': { const s = sessionForView(); if (!s || s.submitted || s.sel == null || s.conf == null) return; submitAnswer(s, false); return; }
      case 'skip': { const s = sessionForView(); if (!s || s.submitted) return; submitAnswer(s, true); return; }
      case 'next': { const s = sessionForView(); if (!s || !s.submitted) return; advance(s); return; }
      case 'start-exam': {
        if (S.active && S.active.kind !== 'checkpoint' && !confirm('You have an unfinished session. Start a new test and discard it?')) return;
        if (arg === 'starter' && S.plan && planRemaining().length && !confirm('Retaking the starter test will rebuild your tutorial from the new results. Continue?')) return;
        startExam(arg === 'starter' ? 'starter' : arg === 'full' ? 'full' : 'practice'); return;
      }
      case 'abandon-exam': { if (!confirm('Quit this test? Your answers so far will be discarded.')) return; S.active = null; save(); return go('exam'); }
      case 'resume': { const a = S.active; if (!a) return go('home'); if (a.kind === 'train') return go('train'); if (a.kind === 'checkpoint') return go('lesson', a.lesson); return go('exam'); }
      case 'start-train': { if (S.active && S.active.kind !== 'checkpoint' && S.active.kind !== 'train' && !confirm('You have an unfinished test. Discard it and drill instead?')) return; startTrain(); return; }
      case 'pick-train': { S.active = { kind: 'train', phase: 'pick' }; return go('train'); }
      case 'train-topic': { startTrain([arg]); return; }
      case 'train-drills': { const tr = S.active; if (!tr) return; tr.phase = 'drill'; tr.items = []; tr.i = 0; tr.answers = []; tr.used = tr.used || []; extendQueue(tr); save(); render(); return; }
      case 'abandon-train': { S.active = null; save(); return go('train'); }
      case 'deep-toggle': { deepOpen = deepOpen === arg ? null : arg; render(); if (deepOpen) { const el = $('#deep'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start', behavior: 'smooth' }); } return; }
      case 'print-cheat': { if (S.view.name !== 'cheatsheet') go('cheatsheet'); setTimeout(() => window.print(), 120); return; }
      case 'cheat-continue': { S.seen.cheat = true; save(); startExam('starter'); return; }
      case 'cheat-dismiss': { S.seen.cheat = true; save(); render(); return; }
      case 'fb-open': {
        const kind = btn.dataset.kind;
        if (kind === 'question') { const r = fbReg[parseInt(arg, 10)]; if (!r) return; const q = r.q; const l = L[q.t];
          fb = { kind, ref: { qid: q.gen ? null : q.id, gen: !!q.gen, lesson: q.t, stem: q.q, options: q.a, correct: q.c, where: r.where, view: S.view.name }, title: 'Flag this question', sub: `${l ? l.title : ''} · ${WHERE_LABEL[r.where] || r.where}` }; }
        else if (kind === 'lesson') { const l = L[arg]; if (!l) return; fb = { kind, ref: { lesson: l.id, view: S.view.name }, title: 'Feedback on this lesson', sub: `${l.title} · Unit ${l.unit.n}` }; }
        else fb = { kind: 'page', ref: { view: S.view.name, arg: S.view.arg }, title: 'Feedback on this page', sub: '' };
        render(); const ta = $('#fb-text'); if (ta) ta.focus(); return; }
      case 'fb-cancel': { if (btn.classList.contains('modal-back') && e.target !== btn) return; fb = null; render(); return; }
      case 'fb-save': { if (!fb) return; const text = (($('#fb-text') || {}).value || '').trim(); const cat = ($('#fb-cat') || {}).value || ''; if (!text) { toast('Write a sentence or two first.'); return; } saveFeedback({ kind: fb.kind, ref: fb.ref, cat, text }); fb = null; render(); toast('Feedback saved'); return; }
      case 'fb-save-page': { const text = (($('#fb-text') || {}).value || '').trim(); const cat = ($('#fb-cat') || {}).value || ''; const area = ($('#fb-area') || {}).value || 'overall'; if (!text) { toast('Write a sentence or two first.'); return; }
        const kind = area.startsWith('lesson:') ? 'lesson' : area.startsWith('unit:') ? 'unit' : area; const ref = area.startsWith('lesson:') ? { lesson: area.slice(7) } : area.startsWith('unit:') ? { unit: area.slice(5) } : {};
        saveFeedback({ kind, ref, cat, text }); render(); toast('Feedback saved'); return; }
      case 'fb-delete': { S.feedback = (S.feedback || []).filter(f => f.id !== arg); save(); render(); return; }
      case 'fb-clear': { if (!confirm('Delete all saved feedback in this browser?')) return; S.feedback = []; save(); render(); return; }
      case 'fb-copy': { copyText(feedbackReport(), 'Report copied'); return; }
      case 'fb-download': { try { const blob = new Blob([JSON.stringify(S.feedback || [], null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${course.id}-feedback.json`; document.body.appendChild(a); a.click(); a.remove(); } catch (err) { toast('Download blocked; use Copy report.'); } return; }
      case 'copy': { const ta = $('#io'); ta.select(); try { navigator.clipboard.writeText(ta.value).then(() => toast('Copied')); } catch (err) { document.execCommand('copy'); toast('Copied'); } return; }
      case 'import': { try { const obj = JSON.parse($('#io').value); if (!obj || (obj.v !== 2 && obj.v !== 3)) throw new Error('bad'); S = Object.assign(fresh(), obj, { v: 3, course: course.id }); S.active = null; S.view = { name: 'home' }; save(); toast('Progress loaded'); render(); } catch (err) { toast('That code could not be read.'); } return; }
      case 'reset': { if (!confirm('Erase all progress in this browser? Saved feedback is kept.')) return; const keep = S.feedback || []; S = fresh(); S.feedback = keep; save(); render(); return; }
    }
  });
  app.addEventListener('change', e => { const el = e.target.closest('[data-act="toggle-timer"]'); if (el) { S.settings.timer = el.checked; save(); } });
  document.addEventListener('keydown', e => {
    if (fb) { if (e.key === 'Escape') { fb = null; render(); } return; }
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    const s = sessionForView(); if (!s) return;
    const k = e.key.toUpperCase();
    if (!s.submitted && letters.includes(k)) { s.sel = letters.indexOf(k); save(); render(); e.preventDefault(); return; }
    if (!s.submitted && /^[1-5]$/.test(k)) { s.conf = parseInt(k, 10); save(); render(); e.preventDefault(); return; }
    if (e.key === 'Enter') { e.preventDefault(); if (s.submitted) advance(s); else if (s.sel != null && s.conf != null) submitAnswer(s, false); }
  });
  document.addEventListener('click', e => { if (railOpen && !e.target.closest('.rail') && !e.target.closest('.rail-toggle')) { railOpen = false; const r = $('.rail'); if (r) r.classList.remove('open'); } });

  // Developer self-test: only when opened as a local file with #selftest. Drives the whole flow without clicks.
  function runSelfTest() {
    const log = []; S = fresh();
    startExam('starter'); let ex = S.active;
    ex.items.forEach((it, k) => { const q = fat(it); const wrong = (q.c + 1) % 4; ex.answers[k] = k < Math.round(STARTER_N * 0.6) ? { choice: wrong, conf: 5 } : k < Math.round(STARTER_N * 0.8) ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 5 }; });
    ex.i = ex.items.length; render();
    if (!S.exams[0] || S.exams[0].kind !== 'starter') throw new Error('starter not recorded');
    log.push(`starter ${S.exams[0].pct}% plan=${S.plan ? S.plan.lessons.length : 0} depth=${JSON.stringify(S.plan && S.plan.depth)} stage=${stage()}`);
    const first = S.plan.lessons[0].id; go('lesson', first);
    const items = pickForLesson(first, CHECKPOINT_N, new Set(), 0.3);
    S.active = { kind: 'checkpoint', lesson: first, items: items.map(slim), i: 0, answers: [], sel: null, conf: null, submitted: false };
    for (let k = 0; k < CHECKPOINT_N; k++) { const s = S.active; s.sel = fat(s.items[s.i]).c; s.conf = 5; submitAnswer(s, false); advance(s); }
    log.push(`lesson ${first} status=${lstat(first).status} planDone=${planDone(first)} remaining=${planRemaining().length}`);
    S.active = null; startExam('full'); ex = S.active;
    ex.items.forEach((it, k) => { const q = fat(it); ex.answers[k] = k % 10 === 0 ? { choice: (q.c + 1) % 4, conf: 2 } : k % 7 === 0 ? { choice: q.c, conf: 1 } : { choice: q.c, conf: 4 }; });
    ex.i = ex.items.length; render();
    log.push(`full ${S.exams[1].pct}% streak=${S.passStreak} retrain=${S.plan ? S.plan.lessons.length + ' ' + S.plan.source : 'none'} stage=${stage()}`);
    saveFeedback({ kind: 'question', ref: { qid: lessons[0].id + '-1', lesson: lessons[0].id, stem: 'self-test stem', options: ['a', 'b', 'c', 'd'], correct: 0, where: 'checkpoint' }, cat: 'Typo', text: 'self-test feedback' });
    log.push(`feedback items=${S.feedback.length} report=${feedbackReport().length} chars`);
    if (S.plan && S.plan.lessons[1]) { const second = S.plan.lessons[1].id; go('lesson', second);
      const items2 = pickForLesson(second, CHECKPOINT_N, new Set(), 0.3);
      S.active = { kind: 'checkpoint', lesson: second, items: items2.map(slim), i: 0, answers: [], sel: null, conf: null, submitted: false };
      for (let k = 0; k < CHECKPOINT_N; k++) { const s = S.active; s.sel = fat(s.items[s.i]).c; s.conf = 1; submitAnswer(s, false); advance(s); }
      log.push(`unsure checkpoint ${second} status=${lstat(second).status} best=${lstat(second).best} (expected read, 0)`);
      if (lstat(second).status === 'passed') throw new Error('unsure answers counted toward a checkpoint pass'); }
    const missingDeep = lessons.filter(l => !(FRA.deep && FRA.deep[l.id])).map(l => l.id);
    if (missingDeep.length) throw new Error('lessons without a deeper explanation: ' + missingDeep.join(', '));
    const deepId = lessons.find(l => FRA.deep && FRA.deep[l.id]).id; go('lesson', deepId); deepOpen = deepId; render();
    const deepPre = document.querySelectorAll('#deep pre').length, deepOl = document.querySelectorAll('#deep ol').length;
    log.push(`deep ${deepId} rendered pre=${deepPre} ol=${deepOl}`);
    if (!deepPre) throw new Error('deep explanation did not render fenced blocks'); deepOpen = null;
    for (const v of ['tutorial', 'home', 'progress', 'train', 'exam', 'ready', 'course', 'cheatsheet', 'feedback']) go(v);
    go('results', 'results:1'); go('results', 'results:0'); go('lesson', S.plan.lessons[0].id);
    const callouts = document.querySelectorAll('.callout').length;
    log.push(`lesson view callouts=${callouts}`);
    try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
    document.body.insertAdjacentHTML('beforeend', `<pre id="selftest">OK\n${log.join('\n')}</pre>`);
  }
  if (location.hash === '#selftest' && location.protocol === 'file:') {
    try { runSelfTest(); } catch (err) { document.body.insertAdjacentHTML('beforeend', `<pre id="selftest">FAIL ${esc(err.stack || err)}</pre>`); }
  } else {
    if (location.hash === '#cheatsheet' || location.hash === '#cheatsheet-print') S.view = { name: 'cheatsheet' };
    else if (location.hash === '#feedback') S.view = { name: 'feedback' };
    render();
    if (location.hash === '#cheatsheet-print') setTimeout(() => window.print(), 400);
  }
})();
