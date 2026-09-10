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

  // ----- settingsAt stamps only at the three real user-driven settings write-sites -----
  // Date.now() can return the same millisecond twice in a fast test run; stub the window's clock
  // so every stamp in a block is a distinct, strictly increasing value instead of leaning on a
  // real-clock tick that could collide.
  const stubClock = (ww, start) => { let t = start; ww.Date.now = () => (t += 1); };
  // The exam view's setup card (#su-n, #su-min, .su-w, toggle-timer) only renders once stage()
  // has moved past 'starter' - before that, paint() shows the welcome screen instead (WELCOME_EXEMPT
  // does not include 'exam'). Finish the starter test first, exactly like the round-trip block in
  // tests/merge.js, so the real setup card is on screen for these tests to drive.
  function finishStarter(w) {
    w.click(w.$('[data-act="go"][data-arg="home"]'));
    w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const QQ = {}; w.FRA.questions.forEach(q => { QQ[q.id] = q; });
    const fatten = x => typeof x === 'string' ? QQ[x] : x;
    state(w).active.items.map(fatten).forEach(q => {
      w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`));
      w.click(w.$('[data-act="conf"][data-arg="5"]'));
      w.click(w.$('[data-act="submit"]'));
    });
  }

  // 1) Saving the custom test setup (readSetupFromForm, via the "Start custom test" button).
  {
    const w3 = boot({ courseDir: dir });
    finishStarter(w3);
    act(w3, 'go', 'exam'); // renders the setup card: #su-n, #su-min, .su-w must exist for readSetupFromForm to read them
    if (!w3.$('#su-n') || !w3.$('#su-min')) throw new Error('setup card did not render');
    stubClock(w3, 1000);
    const before = state(w3).settingsAt;
    act(w3, 'start-custom');
    const after = state(w3).settingsAt;
    check('saving the custom test setup advances settingsAt', after > before, `${before} -> ${after}`);
    // start-custom begins a real, timed exam session, which starts a real setInterval countdown
    // (engine/app.js's startTimer). Abandon it so that interval is cleared and this window does
    // not keep the test process alive after the script finishes.
    act(w3, 'abandon-exam');
  }

  // 2) Resetting the setup to exam defaults.
  {
    const w4 = boot({ courseDir: dir });
    finishStarter(w4);
    act(w4, 'go', 'exam');
    if (!w4.$('[data-act="setup-reset"]')) throw new Error('setup card did not render');
    stubClock(w4, 1000);
    const before = state(w4).settingsAt;
    act(w4, 'setup-reset');
    const after = state(w4).settingsAt;
    check('resetting the test setup advances settingsAt', after > before, `${before} -> ${after}`);
  }

  // 3) Toggling the timer checkbox: a real change event on the input, not a button click.
  {
    const w5 = boot({ courseDir: dir });
    finishStarter(w5);
    act(w5, 'go', 'exam');
    const cb = w5.$('input[data-act="toggle-timer"]');
    if (!cb) throw new Error('timer checkbox did not render');
    stubClock(w5, 1000);
    const before = state(w5).settingsAt;
    cb.checked = !cb.checked;
    cb.dispatchEvent(new w5.Event('change', { bubbles: true }));
    const after = state(w5).settingsAt;
    check('toggling the timer checkbox advances settingsAt', after > before, `${before} -> ${after}`);
  }

  // 4) The negative case, which is the whole point of having a separate field: merely navigating
  // calls save() (touchedAt advances on every call) but must never call markSettingsChanged().
  {
    const w6 = boot({ courseDir: dir });
    stubClock(w6, 1000);
    act(w6, 'go', 'home'); // establish a saved baseline under the stubbed clock
    const s0 = state(w6);
    const touchedBefore = s0.touchedAt, settingsBefore = s0.settingsAt;
    act(w6, 'go', 'course');
    const s1 = state(w6);
    check('navigating alone advances touchedAt', s1.touchedAt > touchedBefore, `${touchedBefore} -> ${s1.touchedAt}`);
    check('navigating alone does not advance settingsAt', s1.settingsAt === settingsBefore, `${settingsBefore} -> ${s1.settingsAt}`);
  }

  if (fails.length) { console.error(`engine: ${fails.length} failed`); process.exit(1); }
  console.log('engine: all OK');
})().catch(e => { console.error(e); process.exit(1); });
