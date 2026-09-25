// Retraining paths: the score and suggested mode per missed topic, the path picker on the
// results page, opening and finishing entries by mode, and the where-you-stand chart.
// Runs on the Net+ pack under jsdom. Run: node tests/retrain.js
'use strict';
const path = require('path');
const { boot, ROOT } = require('./lib');
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const dir = path.join(ROOT, 'courses', 'netplus');
const KEY = 'fra.netplus.state.v3';
const state = w => JSON.parse(w.localStorage.getItem(KEY));
const act = (w, a, arg) => { const b = w.document.createElement('button'); b.dataset.act = a; if (arg != null) b.dataset.arg = arg; w.$('#app').appendChild(b); w.click(b); };
const NOW = Date.now();

// Pack facts, read once. Domain 3's lessons each get exactly one question on every 50-question
// test (quota 9 over 9 lessons), so a miss there is deterministic.
const pack = boot({ courseDir: dir });
const Q = {}; pack.FRA.questions.forEach(q => { Q[q.id] = q; });
const fat = x => typeof x === 'string' ? Q[x] : x;
const lessonsIn = d => { const out = []; pack.FRA.units.forEach(u => u.lessons.forEach(l => { if (l.domain === d) out.push(l); })); return out; };
const D3 = lessonsIn(3);
const T1 = D3[0].id, T2 = D3[1].id;
const DOMAIN_IDS = pack.FRA.course.domains.map(d => d.id);
check(`fixture: domain 3 has a quota equal to its lesson count`, pack.FRA.course.domains.find(d => d.id === 3).quota === D3.length, `${D3.length}`);

// A stored exam record built from real bank questions: `wrong` lessons get one wrong answer each,
// `right` lessons one right answer each.
function mkExam(kind, date, wrong, right) {
  const review = []; const byDomain = {}; DOMAIN_IDS.forEach(d => { byDomain[d] = { c: 0, t: 0 }; });
  const one = (t, ok) => { const q = pack.FRA.questions.find(x => x.t === t); const choice = ok ? q.c : (q.c + 1) % q.a.length; const lesson = D3.find(l => l.id === t) || findLesson(t);
    review.push({ q: q.id, choice, pick: q.a[choice], conf: ok ? 4 : 3, correct: ok }); byDomain[lesson.domain].t++; if (ok) byDomain[lesson.domain].c++; };
  wrong.forEach(t => one(t, false)); right.forEach(t => one(t, true));
  const score = review.filter(r => r.correct).length;
  return { id: 'x' + date, date, kind, score, total: review.length, pct: Math.round(100 * score / review.length), byDomain, review, seconds: 60, minutes: kind === 'starter' ? 0 : 50, setup: null, noConf: kind !== 'starter' };
}
function findLesson(id) { let out = null; pack.FRA.units.forEach(u => u.lessons.forEach(l => { if (l.id === id) out = l; })); return out; }
const starterRec = () => { const rec = mkExam('starter', NOW - 100000, [], DOMAIN_IDS.map(d => lessonsIn(d)[0].id)); rec.noConf = false; rec.review.forEach(r => { r.conf = 5; }); return rec; };
const seeded = extra => Object.assign({ v: 3, course: 'netplus', view: { name: 'home' }, lessons: {}, qstats: {}, topics: {}, exams: [starterRec()], passes: 0, official: null, plan: null, path: { examIdx: 0, scope: 'tailored' }, pathAt: 1, active: null, settings: { timer: false }, feedback: [], ratings: {}, seen: { cheat: true }, settingsAt: 0, touchedAt: 0, created: 1 }, extra || {});
const bootWith = s => boot({ courseDir: dir, beforeApp: x => { x.localStorage.setItem(KEY, JSON.stringify(s)); } });

// Take a live test, missing every question whose lesson is in `miss`. Ends on the results page.
function takeTest(w, kind, miss) {
  act(w, 'start-exam', kind);
  const items = state(w).active.items;
  items.forEach(it => { const q = fat(it); const k = miss.includes(q.t) ? (q.c + 1) % q.a.length : q.c; w.click(w.$(`[data-act="opt"][data-arg="${k}"]`)); w.click(w.$('[data-act="submit"]')); });
  return state(w);
}
const entry = (s, id) => s.plan && s.plan.lessons.find(e => e.id === id);

// ----- Part 1: the score and the suggested mode -----
{
  const w = bootWith(seeded()); const s = takeTest(w, 'full', [T1]);
  const e = entry(s, T1);
  check('one miss with no history: drill, score 1', !!e && e.mode === 'drill' && e.suggested === 'drill' && e.score === 1 && e.why.here === 1 && e.why.before === 0 && e.why.cpWrong === 0, JSON.stringify(e));
  check('the plan is from this test and only holds missed topics', s.plan.source === 'test' && s.plan.examIdx === s.exams.length - 1 && s.plan.lessons.length === 1, s.plan.lessons.length);
}
{
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])] }));
  const s = takeTest(w, 'practice', [T1]);
  const e = entry(s, T1);
  check('missed here and on the previous test: lesson, score 1.5', !!e && e.mode === 'lesson' && e.score === 1.5 && e.why.before === 1, JSON.stringify(e));
}
{
  const lessons = {}; lessons[T1] = { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: NOW - 20000 };
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])], lessons }));
  const s = takeTest(w, 'practice', [T1]);
  const e = entry(s, T1);
  check('plus a failed checkpoint since the previous test: extended, score 2.5', !!e && e.mode === 'deep' && e.score === 2.5 && e.why.cpWrong === 2, JSON.stringify(e));
}
{
  const lessons = {}; lessons[T1] = { status: 'read', best: 2, attempts: 1, passedAt: 0, lastScore: 2, lastAt: NOW - 80000 };
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T1], [T2])], lessons }));
  const s = takeTest(w, 'practice', [T1]);
  check('a checkpoint before the previous test does not count', entry(s, T1).score === 1.5, JSON.stringify(entry(s, T1)));
}
{
  const st = starterRec(); st.review[0] = mkExam('starter', 1, [T1], []).review[0]; st.review[0].conf = 5;
  const w = bootWith(seeded({ exams: [st] }));
  const s = takeTest(w, 'full', [T1]);
  check('the starter test never counts as the previous test', entry(s, T1).score === 1 && entry(s, T1).why.before === 0, JSON.stringify(entry(s, T1)));
}
{
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T2], [T1])] }));
  const s = takeTest(w, 'practice', [T1, T2]);
  check('entries are ordered by score, worst first', s.plan.lessons[0].id === T2 && s.plan.lessons[1].id === T1 && s.plan.lessons[0].score > s.plan.lessons[1].score, s.plan.lessons.map(e => `${e.id}:${e.score}`).join(' '));
  check('a new plan starts on the suggested preset', s.plan.preset === 'suggested');
}
{
  const w = bootWith(seeded()); act(w, 'lesson', T1); act(w, 'start-checkpoint', T1);
  const items = state(w).active.items;
  items.forEach((it, i) => { const q = fat(it); w.click(w.$(`[data-act="opt"][data-arg="${i < 2 ? (q.c + 1) % q.a.length : q.c}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); });
  const ls = state(w).lessons[T1];
  check('a checkpoint end records lastScore and lastAt', ls && ls.lastScore === 2 && ls.lastAt > NOW - 1000, JSON.stringify(ls));
}
{
  const w = bootWith(seeded()); const s = takeTest(w, 'full', [T1]);
  s.topics[T1] = Object.assign(s.topics[T1] || { hist: [], attempts: 0, correct: 0, streak: 0, last: 0 }, { drilledAt: s.plan.createdAt + 1 });
  const w2 = bootWith(s); act(w2, 'go', 'tutorial');
  check('a topic drilled after the plan was made completes its entry', /Tutorial complete/.test(w2.text()), w2.$('h1') && w2.$('h1').textContent);
  s.topics[T1].drilledAt = s.plan.createdAt - 1;
  const w3 = bootWith(s); act(w3, 'go', 'tutorial');
  check('a drill from before the plan does not', /1 lesson to go/.test(w3.text()), w3.$('h1') && w3.$('h1').textContent);
}

// ----- Part 2: the results page -----
const minutesOf = w => parseInt((w.$('.retrain-card h3').textContent.match(/about (\d+) minute/) || [])[1], 10);
{
  const w = bootWith(seeded({ exams: [starterRec(), mkExam('practice', NOW - 50000, [T2], [T1])] }));
  const s = takeTest(w, 'practice', [T1, T2]); const idx = s.exams.length - 1;
  check('the where-you-stand card ranks every domain', w.$$('.strength .bar-row').length === DOMAIN_IDS.length, w.$$('.strength .bar-row').length);
  const vals = w.$$('.strength .bar-row .value').map(el => parseInt(el.textContent, 10)).filter(n => !isNaN(n));
  check('bars run strongest to weakest', vals.length > 0 && vals.every((v, i) => i === 0 || vals[i - 1] >= v), vals.join(','));
  check('each bar tags this test', w.$$('.strength .bar-row .tag').length === DOMAIN_IDS.length);
  check('the weakest list names the missed topics', [T1, T2].every(t => w.$$('.weakest .topic-item').some(el => el.textContent.includes(findLesson(t).title))), w.$$('.weakest .topic-item').map(el => el.querySelector('.t-title').textContent).join(' | '));
  check('the old per-test domain card is gone', !w.$$('h3').some(h => h.textContent === 'By domain'));
  check('one retraining row per entry with three mode chips each', w.$$('.retrain-row').length === 2 && w.$$('.retrain-row').every(r => r.querySelectorAll('.chip.mode').length === 3), w.$$('.retrain-row').length);
  check('the suggested mode is pressed on each row', w.$$('.retrain-row').every(r => { const c = r.querySelector('.chip.mode[aria-pressed="true"]'); return c && c.dataset.arg === `${r.dataset.id}:${entry(state(w), r.dataset.id).suggested}`; }));
  check('the Suggested preset chip is pressed', !!w.$('.preset-row .chip[data-arg="suggested"][aria-pressed="true"]'));
  check('the next test button is at the top and the bottom', w.$$('[data-act="start-exam"][data-arg="practice"]').length >= 2, w.$$('[data-act="start-exam"]').length);
  act(w, 'retrain-preset', 'deep');
  check('All extended sets every mode to deep and presses its chip', state(w).plan.lessons.every(e => e.mode === 'deep') && state(w).plan.preset === 'deep' && !!w.$('.preset-row .chip[data-arg="deep"][aria-pressed="true"]') && !w.$('.preset-row .chip[data-arg="suggested"][aria-pressed="true"]'));
  const deepMin = minutesOf(w);
  act(w, 'retrain-preset', 'drill'); const drillMin = minutesOf(w);
  check('the estimate follows the modes', deepMin > drillMin, `${deepMin} vs ${drillMin}`);
  act(w, 'retrain-mode', `${T1}:lesson`);
  check('one manual change makes the preset Custom', entry(state(w), T1).mode === 'lesson' && entry(state(w), T2).mode === 'drill' && !!w.$('.preset-row [data-arg="custom"][aria-pressed="true"]') && !w.$('.preset-row .chip[data-arg="drill"][aria-pressed="true"]'));
  act(w, 'retrain-preset', 'suggested');
  check('Suggested restores every suggested mode', state(w).plan.lessons.every(e => e.mode === e.suggested) && !!w.$('.preset-row .chip[data-arg="suggested"][aria-pressed="true"]'));
  act(w, 'go', 'exam'); act(w, 'go', 'results:' + idx);
  check('the picker is still there when the results page is revisited', !!w.$('.retrain-card') && w.$$('.retrain-row').length === 2);
}
{
  const w = bootWith(seeded()); const s1 = takeTest(w, 'full', [T1]); const fullIdx = s1.exams.length - 1;
  act(w, 'go', 'exam'); w.$('#su-n').value = '10'; act(w, 'start-custom');
  const all = []; pack.FRA.units.forEach(u => u.lessons.forEach(l => all.push(l.id)));
  const items = state(w).active.items; items.forEach(it => { const q = fat(it); w.click(w.$(`[data-act="opt"][data-arg="${(q.c + 1) % q.a.length}"]`)); w.click(w.$('[data-act="submit"]')); });
  const s2 = state(w); const customIdx = s2.exams.length - 1;
  check('a custom test during retraining keeps the plan and offers a path from it', s2.exams[customIdx].kind === 'custom' && s2.plan.examIdx === fullIdx && !!w.$('[data-act="retrain-adopt"]') && !w.$('.retrain-card'));
  act(w, 'retrain-adopt', String(customIdx));
  check('adopting builds the plan from the custom test', state(w).plan.examIdx === customIdx && !!w.$('.retrain-card') && w.$$('.retrain-row').length > 0);
}

// ----- Part 3: running a path -----
// Answer the current drill or checkpoint question and continue.
const answer = (w, ok) => { const a = state(w).active; const q = fat(a.items[a.i]); w.click(w.$(`[data-act="opt"][data-arg="${ok ? q.c : (q.c + 1) % q.a.length}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); };
{
  const w = bootWith(seeded()); const s = takeTest(w, 'full', [T1, T2]);
  check('fixture: both entries suggest drills', s.plan.lessons.every(e => e.mode === 'drill'), s.plan.lessons.map(e => e.mode).join(','));
  const first = s.plan.lessons[0].id, second = s.plan.lessons[1].id;
  act(w, 'retrain-start');
  const a = state(w).active;
  check('Start retraining opens the first entry as a drill flagged from the plan', !!a && a.kind === 'train' && a.fromPlan === true && a.topics.length === 1 && a.topics[0] === first && /Refresher/.test(w.text()), JSON.stringify(a && [a.kind, a.fromPlan, a.topics]));
  act(w, 'train-drills');
  answer(w, true); answer(w, true); answer(w, true);
  check('three in a row stamps drilledAt and ends the session', state(w).topics[first].drilledAt > 0 && state(w).active === null, JSON.stringify(state(w).topics[first]));
  check('the end screen says the topic is done and offers the next entry', /Topic done/.test(w.text()) && !!w.$(`[data-act="retrain-open"][data-arg="${second}"]`), w.$('h1') && w.$('h1').textContent);
  act(w, 'go', 'tutorial');
  check('the Tutorial tab shows one to go, a Drill pill, and a Change your path button', /1 lesson to go/.test(w.text()) && w.$$('.pill').some(p => p.textContent === 'Drill') && !!w.$(`[data-act="go"][data-arg="results:${s.exams.length - 1}"]`), w.$('h1') && w.$('h1').textContent);
  check('the remaining row opens by mode', !!w.$(`.option[data-act="retrain-open"][data-arg="${second}"]`));
  act(w, 'go', 'home');
  check('Home names the drill as the next step', /^Drill: /.test(w.$('.card.lift h2').textContent) && !!w.$(`[data-act="retrain-open"][data-arg="${second}"]`), w.$('.card.lift h2').textContent);
  act(w, 'retrain-open', second); act(w, 'abandon-train');
  check('End session on a plan drill returns to the Tutorial tab', w.location.hash === '#tutorial' && state(w).active === null, w.location.hash);
}
{
  const w = bootWith(seeded()); takeTest(w, 'full', [T1]);
  act(w, 'retrain-mode', `${T1}:deep`); act(w, 'retrain-open', T1);
  check('an extended entry opens the lesson with the deeper explanation expanded and an Extended pill', w.location.hash === `#lesson/${T1}` && !!w.$('#deep') && w.$$('.pill').some(p => p.textContent === 'Extended'), `${w.location.hash} deep=${!!w.$('#deep')}`);
  act(w, 'deep-toggle', T1);
  check('Hide still works on an extended entry', !w.$('#deep'));
  act(w, 'go', 'home'); act(w, 'retrain-open', T1);
  check('reopening the extended entry expands it again', !!w.$('#deep'));
  const legacy = state(w); legacy.plan.lessons.forEach(e => { delete e.mode; delete e.suggested; delete e.score; delete e.why; }); delete legacy.plan.preset;
  const w2 = bootWith(legacy); act(w2, 'go', 'results:' + (legacy.exams.length - 1));
  check('a legacy plan renders the picker with Lesson pressed and Suggested pressed', w2.$$('.retrain-row').length === 1 && !!w2.$(`.chip.mode[data-arg="${T1}:lesson"][aria-pressed="true"]`) && !!w2.$('.preset-row .chip[data-arg="suggested"][aria-pressed="true"]'));
  act(w2, 'retrain-open', T1);
  check('a legacy entry opens the lesson without the deeper explanation', w2.location.hash === `#lesson/${T1}` && !w2.$('#deep'), w2.location.hash);
}
{
  const w = bootWith(seeded()); takeTest(w, 'full', [T1]);
  act(w, 'retrain-start'); act(w, 'train-drills');
  for (let i = 0; i < 10; i++) answer(w, i % 3 !== 2);
  check('ten drills without three in a row end the topic unfinished', state(w).active === null && !(state(w).topics[T1].drilledAt > 0) && /Still shaky/.test(w.text()) && !!w.$(`[data-act="retrain-switch"][data-arg="${T1}"]`), w.$('h1') && w.$('h1').textContent);
  act(w, 'retrain-switch', T1);
  check('switching moves the entry to the lesson and opens it', entry(state(w), T1).mode === 'lesson' && w.location.hash === `#lesson/${T1}`, w.location.hash);
  // The checkpoint's Next button follows the next entry's mode.
  act(w, 'start-checkpoint', T1); for (let i = 0; i < 4; i++) answer(w, true);
  check('passing the checkpoint completes the entry', /Tutorial complete|Retraining complete/.test(w.text()) && !!w.$('[data-act="finish-checkpoint"][data-arg="__test"]'), w.text().slice(0, 0));
}

if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
console.log('All retrain tests passed.');
