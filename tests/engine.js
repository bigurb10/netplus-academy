// Engine behaviors: browser history moves within the course, answer records survive option reordering, and
// acronyms with two meanings resolve by context. Run: node tests/engine.js
const path = require('path');
const { boot, ROOT } = require('./lib');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const dir = path.join(ROOT, 'courses', 'netplus');
const KEY = 'fra.netplus.state.v3';
const LET = ['A', 'B', 'C', 'D'];
const state = w => JSON.parse(w.localStorage.getItem(KEY));
const act = (w, a, arg) => { const b = w.document.createElement('button'); b.dataset.act = a; if (arg != null) b.dataset.arg = arg; w.$('#app').appendChild(b); w.click(b); };
const tick = () => new Promise(r => setTimeout(r, 40));
const heading = w => (w.$('.lesson-head h1') || {}).textContent || '';
const lessonsOf = w => { const out = {}; w.FRA.units.forEach(u => u.lessons.forEach(l => { out[l.id] = l; })); return out; };

(async () => {
  // ----- Browser history -----
  let w = boot({ courseDir: dir }); let L = lessonsOf(w);
  const h0 = w.history.length;
  act(w, 'go', 'course'); act(w, 'course', 'u3');
  act(w, 'lesson', 'u3l1'); act(w, 'lesson', 'u3l2');
  check('hash names the current view', w.location.hash === '#lesson/u3l2', w.location.hash);
  check('each view change adds one history entry', w.history.length === h0 + 4, w.history.length - h0);
  act(w, 'lesson', 'u3l2');
  check('re-rendering the same view adds no entry', w.history.length === h0 + 4, w.history.length - h0);
  w.history.back(); await tick();
  check('Back returns to the previous lesson', heading(w) === L.u3l1.title && w.location.hash === '#lesson/u3l1', heading(w));
  w.history.back(); await tick();
  check('Back again returns to the unit page', !w.$('.lesson-head') && /Unit 3/.test(w.text()) && w.location.hash === '#course/u3', w.location.hash);
  w.history.forward(); await tick();
  check('Forward reopens the lesson', heading(w) === L.u3l1.title, heading(w));
  w = boot({ courseDir: dir, hash: '#lesson/u3l2' }); L = lessonsOf(w);
  check('a lesson hash opens that lesson on load', heading(w) === L.u3l2.title, heading(w));
  w = boot({ courseDir: dir, hash: '#cheatsheet' });
  check('the cheat sheet hash still opens the cheat sheet', !!w.$('.cs-toc'));
  w = boot({ courseDir: dir, hash: '#nonsense' });
  check('an unknown hash is ignored', !!w.$('#app').textContent && w.location.hash !== '#nonsense', w.location.hash);

  // ----- Answer records outlive an option reorder -----
  w = boot({ courseDir: dir }); L = lessonsOf(w);
  w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
  const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
  const items = state(w).active.items.map(fat);
  items.forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${(q.c + 1) % q.a.length}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
  const rec = state(w).exams[0];
  check('records keep the chosen option text', rec.review.length === items.length && rec.review.every(r => r.pick === fat(r.q).a[r.choice]), rec.review.filter(r => r.pick == null).length + ' without pick');
  // A later build rebalances the answer keys: rotate the first bank question's options by one place.
  const r0 = rec.review.find(r => typeof r.q === 'string'); const q0 = fat(r0.q); const n = q0.a.length;
  const wrongText = q0.a[r0.choice]; const newIdx = (r0.choice + 1) % n;
  q0.a.unshift(q0.a.pop()); q0.c = (q0.c + 1) % n;
  act(w, 'go', 'home'); act(w, 'go', 'results:0');
  let item = w.$$('.review-item').find(el => el.textContent.includes(q0.q));
  check('results show the answer by its text after a reorder', !!item && item.textContent.includes(`You: ${LET[newIdx]}. ${wrongText}`) && item.textContent.includes(`Correct: ${LET[q0.c]}. ${q0.a[q0.c]}`), item && item.querySelector('.ans').textContent);
  act(w, 'path', 'tailored:0');
  act(w, 'lesson', q0.t);
  let callout = w.$$('.callout').find(el => el.textContent.includes(q0.q));
  check('lesson callout shows the answer by its text after a reorder', !!callout && callout.textContent.includes(`You answered ${LET[newIdx]}. ${wrongText}`) && callout.textContent.includes(`Correct: ${LET[q0.c]}. ${q0.a[q0.c]}`), callout && callout.textContent.slice(0, 160));
  // Records saved before this change carry only the index. When that index now lands on the correct answer of a
  // question marked wrong, the page must not claim the learner picked the right answer.
  const legacy = state(w); const orig = boot({ courseDir: dir }); const oq = orig.FRA.questions.find(q => q.id === q0.id);
  legacy.exams[0].review.forEach(r => { delete r.pick; if (r.q === q0.id) r.choice = oq.c; });
  legacy.plan.lessons.forEach(e => e.reasons.forEach(r => { delete r.pick; if (r.q === q0.id) r.choice = oq.c; }));
  const w2 = boot({ courseDir: dir, beforeApp: x => { x.localStorage.setItem(KEY, JSON.stringify(legacy)); } });
  act(w2, 'go', 'results:0');
  item = w2.$$('.review-item').find(el => el.textContent.includes(q0.q));
  check("legacy record never shows the correct answer as the learner's wrong pick", !!item && !item.textContent.includes(`You: ${LET[oq.c]}. ${oq.a[oq.c]}`) && /different option/.test(item.textContent), item && item.querySelector('.ans').textContent);
  act(w2, 'lesson', q0.t);
  callout = w2.$$('.callout').find(el => el.textContent.includes(q0.q));
  check('legacy callout says a different option was chosen', !!callout && !callout.textContent.includes(`You answered ${LET[oq.c]}. ${oq.a[oq.c]}`) && /different option/.test(callout.textContent), callout && callout.textContent.slice(0, 160));
  // Untouched legacy records still show the letter and text.
  const other = legacy.exams[0].review.find(r => typeof r.q === 'string' && r.q !== q0.id); const oq2 = orig.FRA.questions.find(q => q.id === other.q);
  act(w2, 'go', 'results:0'); item = w2.$$('.review-item').find(el => el.textContent.includes(oq2.q));
  check('legacy record with a consistent index shows letter and text', !!item && item.textContent.includes(`You: ${LET[other.choice]}. ${oq2.a[other.choice]}`), item && item.querySelector('.ans').textContent);

  // ----- Acronyms with two meanings -----
  w = boot({ courseDir: dir }); L = lessonsOf(w);
  const cabling = Object.values(L).find(l => /\*\*STP\*\* \(shielded\)/.test(l.body)); const tree = Object.values(L).find(l => /root bridge/.test(l.body));
  check('fixture lessons found', !!cabling && !!tree);
  act(w, 'lesson', cabling.id);
  const hover = el => { el.dispatchEvent(new w.MouseEvent('mouseover', { bubbles: true })); return w.$('#acr-tip').textContent; };
  const el1 = w.$('.acr[data-arg="STP"][data-sense="1"]');
  check('STP in the cabling lesson takes the shielded sense', !!el1);
  check('tooltip gives the shielded meaning', !!el1 && /Shielded twisted pair/.test(hover(el1)) && !/Spanning Tree/.test(hover(el1)));
  if (el1) w.click(el1);
  check('modal opens on the shielded sense', /Shielded twisted pair/.test((w.$('.acr-modal') || {}).textContent || ''));
  act(w, 'acr-close');
  act(w, 'lesson', tree.id);
  const el0 = w.$('.acr[data-arg="STP"][data-sense="0"]');
  check('STP in the switching lesson keeps the spanning tree sense', !!el0 && /Spanning Tree Protocol/.test(hover(el0)) && !/Shielded/.test(hover(el0)));
  check('no shielded sense in the switching lesson', !w.$('.acr[data-arg="STP"][data-sense="1"]'));
  act(w, 'go', 'cheatsheet');
  const rows = w.$$('.acr-table tbody tr').filter(tr => tr.querySelector('.acr-key').textContent === 'STP');
  check('cheat sheet lists both STP meanings', rows.length === 2 && /Spanning Tree Protocol/.test(rows[0].textContent) && /Shielded twisted pair/.test(rows[1].textContent), rows.length);

  if (fails.length) { console.error(`engine: ${fails.length} failed`); process.exit(1); }
  console.log('engine: all OK');
})().catch(e => { console.error(e); process.exit(1); });
