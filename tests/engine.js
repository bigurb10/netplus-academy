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
  check('results show the answer by its text after a reorder', !!item && item.textContent.includes(`Your answer: ${LET[newIdx]}. ${wrongText}`) && item.textContent.includes(`Correct answer: ${LET[q0.c]}. ${q0.a[q0.c]}`), item && item.querySelector('.ans').textContent);
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
  check("legacy record never shows the correct answer as the learner's wrong pick", !!item && !item.textContent.includes(`Your answer: ${LET[oq.c]}. ${oq.a[oq.c]}`) && /different option/.test(item.textContent), item && item.querySelector('.ans').textContent);
  act(w2, 'lesson', q0.t);
  callout = w2.$$('.callout').find(el => el.textContent.includes(q0.q));
  check('legacy callout says a different option was chosen', !!callout && !callout.textContent.includes(`You answered ${LET[oq.c]}. ${oq.a[oq.c]}`) && /different option/.test(callout.textContent), callout && callout.textContent.slice(0, 160));
  // Untouched legacy records still show the letter and text.
  const other = legacy.exams[0].review.find(r => typeof r.q === 'string' && r.q !== q0.id); const oq2 = orig.FRA.questions.find(q => q.id === other.q);
  act(w2, 'go', 'results:0'); item = w2.$$('.review-item').find(el => el.textContent.includes(oq2.q));
  check('legacy record with a consistent index shows letter and text', !!item && item.textContent.includes(`Your answer: ${LET[other.choice]}. ${oq2.a[other.choice]}`), item && item.querySelector('.ans').textContent);

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
  // The same gate for a window booted on another course pack: finishStarter reads the Net+ state
  // key through state(w), so a mini-fixture window needs its own key.
  function finishStarterIn(w) {
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    w.click(w.$('[data-act="go"][data-arg="home"]'));
    w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const QQ = {}; w.FRA.questions.forEach(q => { QQ[q.id] = q; });
    const fatten = x => typeof x === 'string' ? QQ[x] : x;
    st().active.items.map(fatten).forEach(q => {
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

  // ----- pathAt stamps only where the path genuinely changes -----
  // Same distinction as settingsAt: choosing a path and finishing a starter test (which resets
  // the path) stamp it; merely navigating never does.
  {
    const w7 = boot({ courseDir: dir });
    stubClock(w7, 1000);
    const p0 = state(w7).pathAt || 0;
    finishStarter(w7);                                   // finishExam resets path -> stamps
    const p1 = state(w7).pathAt;
    check('finishing a starter test advances pathAt', p1 > p0, `${p0} -> ${p1}`);
    act(w7, 'path', 'tailored:0');                       // choosePath -> stamps
    const p2 = state(w7).pathAt;
    check('choosing a path advances pathAt', p2 > p1, `${p1} -> ${p2}`);
    const touchedBefore = state(w7).touchedAt;
    act(w7, 'go', 'course');
    const s3 = state(w7);
    check('navigating alone still advances touchedAt', s3.touchedAt > touchedBefore, `${touchedBefore} -> ${s3.touchedAt}`);
    check('navigating alone does not advance pathAt', s3.pathAt === p2, `${p2} -> ${s3.pathAt}`);
  }

  // ----- Sync triggers (Task 5): pull/push wiring between engine/app.js and window.FRASync -----
  const res = (status, body, etag) => ({
    ok: status >= 200 && status < 300,
    status: status,
    headers: { get: k => (k.toLowerCase() === 'etag' ? (etag || null) : null) },
    json: () => Promise.resolve(body === undefined ? {} : body)
  });
  // Boots signed in with window.fetch scripted from `script` (a queue of res() responses),
  // wired up via beforeAppJs so the token and the fetch stub are both in place before app.js's
  // boot IIFE makes its own FRASync.init()/pull() calls. Returns the window and the calls fetch
  // actually recorded.
  function bootSignedIn(script) {
    const calls = [];
    const w = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1' }));
        x.fetch = (url, opts) => {
          opts = opts || {};
          calls.push({ url: String(url), method: opts.method || 'GET', headers: opts.headers || {}, body: opts.body ? JSON.parse(opts.body) : null });
          const next = script.shift();
          if (!next) return Promise.reject(new Error('unexpected extra fetch: ' + url));
          return Promise.resolve(next);
        };
      }
    });
    return { w, calls };
  }
  // Drives one lesson's checkpoint quiz to a pass, entirely through DOM clicks like finishStarter.
  function finishCheckpoint(w, lessonId) {
    act(w, 'lesson', lessonId);
    act(w, 'start-checkpoint', lessonId);
    if (!state(w).active || state(w).active.kind !== 'checkpoint') throw new Error('checkpoint did not start for ' + lessonId);
    const QQ = {}; w.FRA.questions.forEach(q => { QQ[q.id] = q; });
    const fatten = x => typeof x === 'string' ? QQ[x] : x;
    let a = state(w).active;
    while (a && a.kind === 'checkpoint' && a.i < a.items.length) {
      const q = fatten(a.items[a.i]);
      act(w, 'opt', q.c); act(w, 'conf', 5); act(w, 'submit'); act(w, 'next');
      a = state(w).active;
    }
    // advance()'s checkpoint branch leaves the finished session in S.active rather than
    // clearing it (unlike finishExam()); dismiss it the way the UI's "Stay here" button
    // does, or a later finishStarter() sees an unfinished session and shows Resume instead
    // of Start the starter test.
    act(w, 'finish-checkpoint', '__stay');
  }

  // 1) Signed out: boot, navigate, save, and complete a lesson checkpoint must never touch the
  // network. This is the plan's "Done when" line and the most important test in this file. Two
  // signals: FRASync.pull() itself must never be called (catches a boot that calls it
  // unconditionally, which would otherwise be invisible -- sync.js's own token() guard already
  // no-ops a signed-out pull before it can reach fetch), and fetch must never be called at all.
  {
    const calls = [];
    let pullCalls = 0;
    const w7 = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.fetch = (...args) => { calls.push(args); return Promise.reject(new Error('signed-out study must never call fetch')); };
        const realPull = x.FRASync.pull;
        x.FRASync.pull = function () { pullCalls++; return realPull.apply(this, arguments); };
      }
    });
    act(w7, 'go', 'course');
    act(w7, 'go', 'home');
    finishCheckpoint(w7, w7.FRA.units[0].lessons[0].id);
    finishStarter(w7);
    check('signed-out boot never calls FRASync.pull()', pullCalls === 0, pullCalls);
    check('signed-out study makes zero fetch calls end to end', calls.length === 0, calls.length);
  }

  // 2) Signed in: boot performs exactly one GET to the course's progress route.
  {
    const { w: w8, calls } = bootSignedIn([res(404)]);
    await tick(); // let the boot-time pull() promise chain resolve
    check('signed-in boot performs exactly one GET', calls.length === 1 && calls[0].method === 'GET', JSON.stringify(calls.map(c => c.method)));
    check("the GET targets this course's progress route", !!calls[0] && /\/v1\/progress\/netplus$/.test(calls[0].url), calls[0] && calls[0].url);
  }

  // 3) Signed in: finishExam pushes immediately, without waiting for the 5s debounce.
  {
    const { w: w9, calls } = bootSignedIn([res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET before the exam starts
    check('setup: signed-in boot pulled once', calls.length === 1, calls.length);
    finishStarter(w9); // drives the starter exam through finishExam(); starter has minutes=0, so
    // startTimer's own tick() stops immediately and this leaves no setInterval running.
    await tick(); // let pushNow's token()+fetch promise chain settle -- no timer is advanced
    check('finishExam pushes immediately without waiting for the 5s debounce',
      calls.length === 2 && calls[1].method === 'PUT', JSON.stringify(calls.map(c => c.method)));
  }

  // 4) Signed in: a plain save() (e.g. a navigation) schedules a push but does not PUT immediately.
  {
    const { w: w10, calls } = bootSignedIn([res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET
    await w10.FRASync.pushNow(); // establishes a clean baseline (dirty === false) via a real PUT,
    // so the dirty check below reflects the navigation's save(), not the boot pull's own dirty flag.
    check('setup: sync is clean before the navigation under test', w10.FRASync.isDirty() === false, w10.FRASync.isDirty());
    check('setup consumed exactly two calls (GET, PUT)', calls.length === 2, calls.length);
    act(w10, 'go', 'course'); // a plain save() via go(), no exam or checkpoint involved
    await tick();
    check('a plain save() does not PUT immediately', calls.length === 2, calls.length);
    check('a plain save() leaves the sync client dirty for the 5s debounce', w10.FRASync.isDirty() === true, w10.FRASync.isDirty());
  }

  // 5) Signed in: visibilitychange to hidden triggers an immediate pushNow().
  {
    const { w: w11, calls } = bootSignedIn([res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET
    Object.defineProperty(w11.document, 'visibilityState', { value: 'hidden', configurable: true });
    w11.document.dispatchEvent(new w11.Event('visibilitychange'));
    await tick();
    check('visibilitychange to hidden triggers an immediate push',
      calls.length === 2 && calls[1].method === 'PUT', JSON.stringify(calls.map(c => c.method)));
  }

  // 6) Signed in: the checkpoint's immediate pushNow() fires only on the advance that
  // completes the checkpoint with a pass -- not on every "next" click within it.
  {
    const { w: w12, calls } = bootSignedIn([res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET
    const lessonId = w12.FRA.units[0].lessons[0].id;
    act(w12, 'lesson', lessonId);
    act(w12, 'start-checkpoint', lessonId);
    const QQ = {}; w12.FRA.questions.forEach(q => { QQ[q.id] = q; });
    const fatten = x => typeof x === 'string' ? QQ[x] : x;
    let a = state(w12).active;
    if (!a || a.kind !== 'checkpoint') throw new Error('checkpoint did not start for ' + lessonId);
    const n = a.items.length;
    // Answer every question but the last correctly and confidently (same pick-the-key
    // pattern finishCheckpoint/finishStarter use), so the eventual score is guaranteed to
    // clear CHECKPOINT_PASS on the final advance.
    for (let k = 0; k < n - 1; k++) {
      const q = fatten(a.items[a.i]);
      act(w12, 'opt', q.c); act(w12, 'conf', 5); act(w12, 'submit'); act(w12, 'next');
      a = state(w12).active;
    }
    await tick();
    check('no PUT before the checkpoint completes', calls.length === 1, calls.length);
    const qLast = fatten(a.items[a.i]);
    act(w12, 'opt', qLast.c); act(w12, 'conf', 5); act(w12, 'submit'); act(w12, 'next'); // the completing, passing advance
    await tick(); // no timer is advanced -- this is the immediate pushNow(), not the 5s debounce
    check('exactly one PUT fires immediately when the checkpoint completes with a pass',
      calls.length === 2 && calls[1].method === 'PUT', JSON.stringify(calls.map(c => c.method)));
  }

  // ----- Task 6: the sign-in affordance -----
  // A fresh boot with no starter test taken sits in stage() === 'starter', which gates the
  // topbar behind the welcome screen for any view not in WELCOME_EXEMPT (app.js's paint()).
  // 'cheatsheet' is exempt, so navigating there is the lightest way to get the topbar on
  // screen without having to run a whole exam first.
  const gotoExempt = (w, name) => act(w, 'go', name);
  // Same shape as bootSignedIn above, but with an email on the stored token -- Task 5's
  // helper omits it, and the topbar's .who needs one to assert against.
  function bootSignedInAs(email, script, name) {
    const calls = [];
    const w = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email, name: name || null }));
        x.fetch = (url, opts) => {
          opts = opts || {};
          calls.push({ url: String(url), method: opts.method || 'GET', headers: opts.headers || {}, body: opts.body ? JSON.parse(opts.body) : null });
          const next = script.shift();
          if (!next) return Promise.reject(new Error('unexpected extra fetch: ' + url));
          return Promise.resolve(next);
        };
      }
    });
    return { w, calls };
  }

  // 1) Signed out: the topbar offers to sign in, and shows no account.
  {
    const w13 = boot({ courseDir: dir });
    gotoExempt(w13, 'cheatsheet');
    const btn = w13.$('.topbar [data-act="sign-in"]');
    check('signed-out topbar shows the sign-in button', !!btn && btn.textContent.trim() === 'Save my progress', btn && btn.textContent);
    check('signed-out topbar has no .acct', !w13.$('.topbar .acct'));
  }

  // 1b) The FieldReady mark goes home and the nav links to ServiceForge (Blake, 2026-10-11).
  // The mark matters most on phones, where .nav (and with it "All courses") is hidden.
  {
    const w = boot({ courseDir: dir }); gotoExempt(w, 'cheatsheet');
    const site = w.$('.topbar a.brand.site');
    check('the topbar has the FieldReady mark linking to the catalog', !!site && site.getAttribute('href') === '/' && site.textContent.trim() === 'FR', site && site.outerHTML);
    const links = [...w.document.querySelectorAll('.topbar .nav a')].map(a => [a.textContent.trim(), a.getAttribute('href')]);
    check('the nav ends with All courses then ServiceForge', JSON.stringify(links.slice(-2)) === JSON.stringify([['All courses', '/'], ['ServiceForge', '/serviceforge/']]), JSON.stringify(links));
    check('the course brand still goes to course Home', !!w.$('.topbar button.brand[data-act="go"][data-arg="home"]'));
  }

  // 2) Signed in: the topbar shows the account, the sync dot, and sign-out -- never sign-in.
  {
    const { w: w14 } = bootSignedInAs('learner@example.com', [res(404)]);
    await tick(); // let the boot-time pull() settle
    gotoExempt(w14, 'cheatsheet');
    const who = w14.$('.topbar .acct .who');
    // The email is never shown in the topbar (Blake, 2026-09-23): it is on screen in every
    // lesson and screenshot. An account with no name gets a neutral label instead.
    check('signed-in topbar never shows the account email',
      !!who && who.textContent === 'Signed in' && !w14.$('.topbar').outerHTML.includes('learner@example.com'),
      who && who.textContent);
    check('the account label links to the account page',
      !!who && who.tagName === 'A' && who.getAttribute('href') === '/account/', who && who.outerHTML);
    check('signed-in topbar has a sync dot', !!w14.$('.topbar #syncdot'));
    check('signed-in topbar shows sign-out', !!w14.$('.topbar [data-act="sign-out"]'));
    check('signed-in topbar has no sign-in button', !w14.$('.topbar [data-act="sign-in"]'));
  }

  // 2b) Signed in with a name on the token: the topbar shows the name, still not the email.
  {
    const { w: w14b } = bootSignedInAs('learner@example.com', [res(404)], 'Pat Learner');
    await tick();
    gotoExempt(w14b, 'cheatsheet');
    const who = w14b.$('.topbar .acct .who');
    check('signed-in topbar shows the account name when the token has one',
      !!who && who.textContent === 'Pat Learner' && !w14b.$('.topbar').outerHTML.includes('learner@example.com'),
      who && who.textContent);
    check('the named label links to the account page too', !!who && who.getAttribute('href') === '/account/', who && who.outerHTML);
  }

  // 3) Clicking sign-out clears the token and the sync book, leaves course progress
  // untouched, and re-renders the sign-in button. Mutation target: dropping the
  // `if (window.FRASync) FRASync.reset()` guard's call from the sign-out case.
  {
    const { w: w15 } = bootSignedInAs('learner2@example.com', [res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET
    await w15.FRASync.pushNow(); // establishes fra.netplus.sync.v1 so there is something to clear
    check('setup: the sync book exists before sign-out', w15.localStorage.getItem('fra.netplus.sync.v1') !== null);
    gotoExempt(w15, 'cheatsheet');
    const stateBefore = w15.localStorage.getItem('fra.netplus.state.v3');
    w15.click(w15.$('.topbar [data-act="sign-out"]'));
    const stateAfter = w15.localStorage.getItem('fra.netplus.state.v3');
    check('sign-out clears the auth token', w15.localStorage.getItem('fra.auth.v1') === null, w15.localStorage.getItem('fra.auth.v1'));
    check('sign-out leaves course progress untouched', stateAfter === stateBefore, stateAfter === stateBefore ? 'unchanged' : 'CHANGED');
    const bk15 = JSON.parse(w15.localStorage.getItem('fra.netplus.sync.v1') || '{}');
    check('sign-out clears the server-session bookkeeping (FRASync.reset() ran)',
      !bk15.version && !bk15.hash && !bk15.lastPullAt, JSON.stringify(bk15));
    check('sign-out keeps the owner, so the next account is not handed this progress',
      bk15.sub === 'u1', JSON.stringify(bk15));
    check('sign-out re-renders the sign-in button', !!w15.$('.topbar [data-act="sign-in"]'));
  }

  // 4) Clicking sign-in calls FRAAuth.beginSignIn with the current path and hash.
  {
    const w16 = boot({ courseDir: dir });
    act(w16, 'course', 'u3'); // an exempt, distinctive view/hash so a hardcoded mutation cannot accidentally match
    let calledWith = 'unset';
    w16.FRAAuth.beginSignIn = arg => { calledWith = arg; return Promise.resolve(); }; // the real one navigates away
    w16.click(w16.$('.topbar [data-act="sign-in"]'));
    const expected = w16.location.pathname + w16.location.hash;
    check('sign-in calls FRAAuth.beginSignIn with location.pathname + location.hash',
      calledWith === expected && expected.includes('#course/u3'), `${calledWith} vs ${expected}`);
  }

  // 5) The status dot is correct right after every render(), not only after the next
  // onStatus -- resolution 2. Capture FRASync.init's onStatus the same way Task 5's tests
  // wrapped FRASync.pull, drive it directly, then force a re-render (paint() recreates
  // #syncdot from scratch) and check the dot survives it before any further onStatus call.
  {
    let capturedOnStatus = null;
    const w17 = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'dot@example.com' }));
        x.fetch = () => Promise.resolve(res(404)); // boot pull
        const realInit = x.FRASync.init;
        x.FRASync.init = function (o) { capturedOnStatus = o.onStatus; return realInit.call(this, o); };
      }
    });
    await tick(); // let the boot-time pull() settle
    gotoExempt(w17, 'cheatsheet');
    if (typeof capturedOnStatus !== 'function') throw new Error('FRASync.init was never called with onStatus');
    capturedOnStatus('syncing');
    let dot = w17.$('#syncdot');
    check('onStatus(syncing) paints the dot class', !!dot && dot.className === 'syncdot syncing', dot && dot.className);
    check('onStatus(syncing) paints the dot title', !!dot && dot.title === 'Saving...', dot && dot.title);
    gotoExempt(w17, 'progress'); // a fresh render(): paint() rebuilds the topbar and #syncdot from scratch
    dot = w17.$('#syncdot');
    check('the dot is still correct immediately after a render, with no further onStatus call',
      !!dot && dot.className === 'syncdot syncing' && dot.title === 'Saving...', dot && [dot.className, dot.title].join(' / '));
    capturedOnStatus('idle');
    dot = w17.$('#syncdot');
    check('onStatus(idle) paints the dot class', !!dot && dot.className === 'syncdot idle', dot && dot.className);
    check('onStatus(idle) paints the dot title', !!dot && dot.title === 'Progress saved', dot && dot.title);
  }

  // 6) The starter-results offer: shown once, signed out, beneath the path choice; never
  // shown signed in.
  {
    const w18 = boot({ courseDir: dir });
    finishStarter(w18); // lands on the starter results view with the path choice showing
    const offer18 = w18.$$('p.muted').find(p => /Studying on more than one device\?/.test(p.textContent));
    check('signed-out starter results offer to save progress', !!offer18, w18.text().includes('Studying on more than one device?'));
    check('the offer carries a sign-in button', !!offer18 && !!offer18.querySelector('[data-act="sign-in"]'));

    const { w: w19 } = bootSignedInAs('starter@example.com', [res(404), res(200, { version: 1 }, '"1"')]);
    await tick(); // consumes the boot GET
    finishStarter(w19);
    await tick(); // let finishExam's immediate pushNow() settle
    const offer19 = w19.$$('p.muted').find(p => /Studying on more than one device\?/.test(p.textContent));
    check('signed-in starter results do not repeat the save-progress offer', !offer19, !!offer19);
  }

  // ----- Amendment: importing a progress code clears the recorded owner -----
  // The import action is the one place that replaces the whole blob from outside, with
  // data whose provenance the engine cannot know. Leaving the previous owner on it would
  // make the next pull treat a pasted code as a different account's progress and stash it
  // instead of merging it into the account that pasted it.
  {
    const { w: w21 } = bootSignedIn([res(404)]);
    await tick(); // the boot pull records the owner in the sync book
    const bk21 = JSON.parse(w21.localStorage.getItem('fra.netplus.sync.v1'));
    check('setup: the boot pull recorded the owner', bk21 && bk21.sub === 'u1', JSON.stringify(bk21));
    const io = w21.document.createElement('textarea');
    io.id = 'io';
    io.value = JSON.stringify({ v: 3, course: 'netplus', exams: [], passes: 2 });
    w21.$('#app').appendChild(io);
    act(w21, 'import');
    check('importing a progress code loaded it', state(w21).created != null && !state(w21).exams.length, JSON.stringify(state(w21).exams));
    const bk21b = JSON.parse(w21.localStorage.getItem('fra.netplus.sync.v1'));
    check('importing a progress code forgets whose progress the blob was',
      bk21b && bk21b.sub === null, JSON.stringify(bk21b));
  }

  // ----- Final review C1: a pull must never delete the device-local view and active -----
  // Every other signed-in test in this file scripts the boot pull as a 404, which never
  // reaches adopt(); a 200 is what actually exercises it. mergeState() returns no
  // view/active by design (both are device-local), so without the carry-over in app.js's
  // adopt() a learner who is mid-checkpoint when a pull lands loses the session and is
  // bounced back to Home, and save() persists the loss.
  {
    let resolveGet = null;
    const w20 = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'c1@example.com' }));
        // Deferred rather than scripted: the boot pull's GET stays pending until the
        // checkpoint below is live, so the response lands on a genuinely mid-exam learner.
        x.fetch = () => new Promise(r => { resolveGet = r; });
      }
    });
    const localLesson = w20.FRA.units[0].lessons[0].id;
    const remoteLesson = w20.FRA.units[1].lessons[0].id;
    act(w20, 'lesson', localLesson);
    act(w20, 'start-checkpoint', localLesson);
    check('setup: a checkpoint is live before the pull response lands',
      !!(state(w20).active && state(w20).active.kind === 'checkpoint'), JSON.stringify(state(w20).active));
    await tick();
    if (typeof resolveGet !== 'function') throw new Error('the boot pull never reached fetch');
    // A plausible server row: the same course blob from another device, carrying one
    // lesson this one has never seen, with no view and no active (what payload() sends).
    const remote = Object.assign(JSON.parse(w20.localStorage.getItem(KEY)), {
      lessons: { [remoteLesson]: { status: 'passed', best: 90, attempts: 1, passedAt: 5 } },
      active: null, touchedAt: 1
    });
    delete remote.view;
    resolveGet(res(200, { state: remote, version: 7 }, '"7"'));
    await tick();
    const s20 = state(w20);
    check('a successful pull leaves the learner on the view they were on',
      !!(s20.view && s20.view.name === 'lesson' && s20.view.arg === localLesson), JSON.stringify(s20.view));
    check('a successful pull does not abandon the exam in progress',
      !!(s20.active && s20.active.kind === 'checkpoint' && s20.active.lesson === localLesson),
      JSON.stringify(s20.active && { kind: s20.active.kind, lesson: s20.active.lesson }));
    // Asserted on the VALUE, not on the key: render() writes a lazy stub into S.lessons
    // for every lesson it paints, so the key alone is present with or without a merge.
    const gotRemote = (s20.lessons || {})[remoteLesson] || {};
    check('the pull still merged the remote lesson in',
      gotRemote.status === 'passed' && gotRemote.best === 90, JSON.stringify(gotRemote));
  }

  // ----- Amendment 2: an identity switch must NOT carry the previous exam or view over -----
  // The mirror image of the C1 case above. Same live checkpoint, same 200 pull -- but the
  // sync book names a different account, so this is the stash-and-adopt path, and the
  // previous learner's open exam (their picks, their confidence) and their current view
  // must not follow their progress into someone else's account.
  {
    let resolveGet = null;
    const w22 = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'switch@example.com' }));
        // The progress sitting in this browser belongs to somebody else.
        x.localStorage.setItem('fra.netplus.sync.v1', JSON.stringify({ version: 6, hash: 'stale', sub: 'previous-learner', lastPullAt: 0 }));
        x.fetch = () => new Promise(r => { resolveGet = r; });
      }
    });
    const lessonId22 = w22.FRA.units[0].lessons[0].id;
    act(w22, 'lesson', lessonId22);
    act(w22, 'start-checkpoint', lessonId22);
    const QQ22 = {}; w22.FRA.questions.forEach(q => { QQ22[q.id] = q; });
    const live = state(w22).active;
    const q22 = typeof live.items[0] === 'string' ? QQ22[live.items[0]] : live.items[0];
    act(w22, 'opt', q22.c); act(w22, 'conf', 5);   // a real answer in progress
    check('setup: the previous learner is mid-checkpoint with an answer picked',
      !!(state(w22).active && state(w22).active.sel != null), JSON.stringify(state(w22).active && state(w22).active.sel));
    await tick();
    if (typeof resolveGet !== 'function') throw new Error('the boot pull never reached fetch');
    // The new account's own stored row: a complete v3 blob with a marker of its own.
    const mine = Object.assign(JSON.parse(w22.localStorage.getItem(KEY)), {
      active: null, ratings: { theirs: { r: 7, ts: 1 } }, touchedAt: 1
    });
    delete mine.view;
    resolveGet(res(200, { state: mine, version: 7 }, '"7"'));
    await tick();
    const s22 = state(w22);
    check('an identity switch does not hand the new account the previous exam',
      s22.active === null, JSON.stringify(s22.active));
    check('an identity switch lands the new account on home',
      !!(s22.view && s22.view.name === 'home'), JSON.stringify(s22.view));
    check('the new account got its own stored state', !!(s22.ratings && s22.ratings.theirs), JSON.stringify(s22.ratings));
    let stashed = null;
    for (let i = 0; i < w22.localStorage.length; i++) {
      const k = w22.localStorage.key(i);
      if (k && k.indexOf('fra.netplus.state.v3.stash') === 0) stashed = k;
    }
    check('the previous learner progress was stashed under its own slot, not a shared one',
      stashed !== null && stashed !== 'fra.netplus.state.v3.stash', stashed);
  }

  // ----- the real stash hooks: tagged with the owner, handed back only to them, pruned -----
  {
    let hooks = null;
    const w23 = boot({
      courseDir: dir,
      beforeAppJs: x => {
        const realInit = x.FRASync.init;
        x.FRASync.init = function (o) { hooks = o; return realInit.call(this, o); };
      }
    });
    if (!hooks || typeof hooks.stash !== 'function' || typeof hooks.takeStashes !== 'function') {
      throw new Error('FRASync.init was not given stash/takeStashes');
    }
    stubClock(w23, 5000);                       // distinct ms per stash key
    act(w23, 'go', 'home');                     // ensure the blob is saved under STORE_KEY
    const blobBefore = w23.localStorage.getItem('fra.netplus.state.v3');
    const stashKeys = () => { const k = []; for (let i = 0; i < w23.localStorage.length; i++) { const n = w23.localStorage.key(i); if (n && n.indexOf('fra.netplus.state.v3.stash.') === 0) k.push(n); } return k.sort(); };
    hooks.stash('u1');
    const k1 = stashKeys();
    const rec = k1.length ? JSON.parse(w23.localStorage.getItem(k1[0])) : null;
    check('stash() writes a record tagged with the owner and carrying the blob',
      !!rec && rec.sub === 'u1' && JSON.stringify(rec.state) === blobBefore, JSON.stringify(rec && { sub: rec.sub, v: rec.state && rec.state.v }));
    check('takeStashes() for another account returns nothing and leaves it', hooks.takeStashes('u2').length === 0 && stashKeys().length === 1,
      JSON.stringify(stashKeys()));
    const got = hooks.takeStashes('u1');
    check('takeStashes() for the owner returns the state and removes it', got.length === 1 && got[0].v === 3 && stashKeys().length === 0,
      JSON.stringify({ n: got.length, left: stashKeys() }));
    for (let i = 0; i < 8; i++) hooks.stash('u' + i);
    check('stashes are pruned to the newest 5 per course', stashKeys().length === 5, JSON.stringify(stashKeys()));
    const newest = stashKeys().map(k => parseInt(k.slice('fra.netplus.state.v3.stash.'.length), 10));
    check('and it is the OLDEST that were dropped', Math.min.apply(null, newest) > 5003, JSON.stringify(newest));
  }

  // ----- The pass rule and sureness (2026-09-23): only the starter asks; tests and checkpoints do not -----
  {
    const w30 = boot({ courseDir: dir });
    act(w30, 'go', 'home'); act(w30, 'start-exam', 'starter');
    check('the starter test asks for sureness', !state(w30).active.noConf && !!w30.$('.confidence'));
    const fat30 = x => typeof x === 'string' ? w30.FRA.questions.find(q => q.id === x) : x;
    state(w30).active.items.map(fat30).forEach(q => { act(w30, 'opt', q.c); act(w30, 'conf', 5); act(w30, 'submit'); });
    act(w30, 'start-exam', 'full');
    const ex30 = state(w30).active;
    check('the 50-question test asks no sureness', !!ex30 && ex30.kind === 'full' && ex30.noConf === true && !w30.$('.confidence'), JSON.stringify(ex30 && { kind: ex30.kind, noConf: ex30.noConf }));
    ex30.items.map(fat30).forEach((q, k) => { act(w30, 'opt', k === 0 ? (q.c + 1) % q.a.length : q.c); act(w30, 'submit'); });
    const rec30 = state(w30).exams[state(w30).exams.length - 1];
    check('the test recorded without sureness', !!rec30 && rec30.kind === 'full' && rec30.noConf === true && rec30.review[0].correct === false, JSON.stringify(rec30 && { kind: rec30.kind, noConf: rec30.noConf }));
    check('the results page offers the next test at the top and the bottom', w30.$$('[data-act="start-exam"][data-arg="practice"]').length === 2, w30.$$('[data-act="start-exam"]').length);
    const ri = w30.$('.review-item');
    check('a wrong answer shows Your answer, Correct answer, and Why', !!ri && /Your answer:/.test(ri.textContent) && /Correct answer:/.test(ri.textContent) && /Why:/.test(ri.textContent), ri && ri.textContent.slice(0, 160));
    check('the review offers the lesson as an option', !!ri && !!ri.querySelector('[data-act="lesson"]') && /Review the lesson/.test(ri.textContent));
    check('no guess language on a test without sureness', !/guess/i.test(w30.text()));
    check('the results pill counts passes in the window, not a streak', /of your last 5 passed/.test(w30.text()) && !/streak/i.test(w30.text()));
    // Checkpoint: no chips, passes on 3 of 4 correct.
    const byT = {}; w30.FRA.questions.forEach(q => { (byT[q.t] = byT[q.t] || []).push(q); });
    const cpId = Object.keys(byT).find(t => byT[t].length >= 4);
    act(w30, 'lesson', cpId); act(w30, 'start-checkpoint', cpId);
    const cp = state(w30).active;
    check('the checkpoint asks no sureness', !!cp && cp.kind === 'checkpoint' && cp.noConf === true && !w30.$('.confidence'));
    check('the checkpoint copy no longer mentions being sure', !/at least fairly sure/.test(w30.text()));
    cp.items.map(fat30).forEach((q, k) => { act(w30, 'opt', k === 0 ? (q.c + 1) % q.a.length : q.c); act(w30, 'submit'); act(w30, 'next'); });
    const ls30 = state(w30).lessons[cpId];
    check('three of four correct passes the checkpoint with no sureness asked', !!ls30 && ls30.status === 'passed' && ls30.best === 3, JSON.stringify(ls30));
    check('the checkpoint result says correct, not correct and sure', /3 of 4 correct/.test(w30.text()) && !/correct and sure/.test(w30.text()));
  }

  // ----- An old blob with passStreak migrates on load: passes and official come from the log -----
  {
    const w31 = boot({ courseDir: dir, beforeAppJs: x => {
      const passed = pct => ({ id: 'p' + pct + Math.random(), date: Date.now(), kind: 'practice', score: pct, total: 100, pct, byDomain: {}, review: [], seconds: 1, minutes: 0, setup: null, noConf: true });
      x.localStorage.setItem('fra.netplus.state.v3', JSON.stringify({ v: 3, course: 'netplus', lessons: {}, qstats: {}, topics: {}, feedback: [], ratings: {}, seen: {},
        exams: [{ id: 's', date: 1, kind: 'starter', score: 5, total: 10, pct: 50, byDomain: {}, review: [], seconds: 1, minutes: 0, setup: null }, passed(90), passed(40), passed(85), passed(88)],
        passStreak: 2, official: null, plan: null, path: null, settings: { timer: true }, settingsAt: 0, touchedAt: 0, created: 1 }));
    } });
    const s31 = state(w31);
    check('load drops passStreak and recomputes passes from the exam log', s31.passStreak === undefined && s31.passes === 3, JSON.stringify({ passStreak: s31.passStreak, passes: s31.passes }));
    act(w31, 'go', 'exam');
    check('the tests hub reports passes in the window and offers the official-format test', /Final step: the official-format test/.test(w31.text()) && !!w31.$('[data-act="start-standard"]'));
  }

  // ----- Tests have a Previous button (2026-09-25): step back, change an answer, fill a skip, then finish -----
  // Answers are only scored when the test ends, so a learner can move back through answered
  // questions and change them, like the real exam. The frontier is answers.length: questions
  // before it are open for review (Previous / Next), the one at it is new (Submit / Skip).
  {
    const w32 = boot({ courseDir: dir });
    act(w32, 'go', 'home'); act(w32, 'start-exam', 'starter');
    const fat32 = x => typeof x === 'string' ? w32.FRA.questions.find(q => q.id === x) : x;
    state(w32).active.items.map(fat32).forEach(q => { act(w32, 'opt', q.c); act(w32, 'conf', 5); act(w32, 'submit'); });
    act(w32, 'start-exam', 'full');
    const items32 = state(w32).active.items.map(fat32); const n32 = items32.length;
    check('the first question of a test has no Previous button', !w32.$('[data-act="test-prev"]'));
    act(w32, 'opt', 0); act(w32, 'submit');   // question 1 answered A
    act(w32, 'skip');                          // question 2 skipped
    act(w32, 'opt', 2);                        // question 3: C picked, not submitted
    check('from the second question on, Previous is offered', !!w32.$('[data-act="test-prev"]'));
    act(w32, 'test-prev');
    let ex32 = state(w32).active;
    check('Previous returns to the skipped question with nothing selected', ex32.i === 1 && ex32.sel == null && !w32.$('.option[aria-pressed="true"]'), JSON.stringify({ i: ex32.i, sel: ex32.sel }));
    check('a reviewed question offers Next instead of Submit and Skip', !!w32.$('[data-act="test-next"]') && !w32.$('[data-act="submit"]') && !w32.$('[data-act="skip"]'));
    w32.document.dispatchEvent(new w32.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    ex32 = state(w32).active;
    check('the left arrow key also steps back, showing the first answer selected', ex32.i === 0 && ex32.sel === 0 && w32.$('.option[data-arg="0"]').getAttribute('aria-pressed') === 'true', JSON.stringify({ i: ex32.i, sel: ex32.sel }));
    act(w32, 'opt', 1); act(w32, 'test-next');  // change question 1 to B
    act(w32, 'opt', 3);                          // fill the skipped question 2 with D
    w32.document.dispatchEvent(new w32.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    ex32 = state(w32).active;
    check('Next and Enter save the changed and the filled answers', ex32.i === 2 && ex32.answers[0].choice === 1 && ex32.answers[1].choice === 3 && ex32.answers[1].skipped === false, JSON.stringify(ex32.answers.slice(0, 2)));
    check('returning to the new question restores its unsubmitted pick', ex32.sel === 2 && !!w32.$('[data-act="submit"]') && !!w32.$('[data-act="skip"]'), JSON.stringify({ i: ex32.i, sel: ex32.sel }));
    check('the progress meter counts answered questions, not the one on screen', w32.$('.exam-head .meter > i').style.width === (100 * 2 / n32) + '%', w32.$('.exam-head .meter > i').style.width);
    for (let k = 2; k < n32 - 1; k++) { act(w32, 'opt', items32[k].c); act(w32, 'submit'); }
    const last32 = w32.$('[data-act="submit"]');
    check('the last question offers Finish test instead of Submit', !!last32 && /Finish test/.test(last32.textContent) && !!w32.$('[data-act="test-prev"]'), last32 && last32.textContent);
    act(w32, 'opt', items32[n32 - 1].c); act(w32, 'submit');
    const rec32 = state(w32).exams[state(w32).exams.length - 1];
    check('the record keeps the changed first answer and the filled second', !!rec32 && rec32.kind === 'full' && rec32.review[0].choice === 1 && rec32.review[1].choice === 3 && !state(w32).active, JSON.stringify(rec32 && [rec32.review[0].choice, rec32.review[1].choice]));
    // The starter still asks sureness: a filled-in skip needs a rating before Next or Previous will move.
    const w33 = boot({ courseDir: dir });
    act(w33, 'go', 'home'); act(w33, 'start-exam', 'starter');
    act(w33, 'opt', 0); act(w33, 'conf', 5); act(w33, 'submit'); act(w33, 'skip');
    act(w33, 'test-prev'); act(w33, 'opt', 1);
    check('on the starter, Next waits for a sureness rating on a filled-in skip', w33.$('[data-act="test-next"]').disabled && w33.$('[data-act="test-prev"]').disabled);
    act(w33, 'test-next');
    check('and the handler refuses until it is rated', state(w33).active.i === 1);
    act(w33, 'conf', 3); act(w33, 'test-next');
    const a33 = state(w33).active.answers[1];
    check('rated, Next saves the answer with its sureness', state(w33).active.i === 2 && a33.choice === 1 && a33.conf === 3 && a33.skipped === false, JSON.stringify(a33));
  }

  // ----- Untested domains (mini fixture: domain 4 has quota 0, unit 3 is its content) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini }); const L = lessonsOf(w);
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    w.click(w.$('[data-act="go"][data-arg="home"]'));
    check('mini: the welcome page counts only tested domains', /each of the 3 exam domains/.test(w.text()));
    w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
    const items = st().active.items.map(fat);
    check('mini: the starter test is 2 per tested domain, none from the untested one', items.length === 6 && items.every(q => L[q.t].domain !== 4), items.map(q => q.t).join(','));
    items.forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'go', 'home');
    check('mini: domain bars show only tested domains', w.$$('.bars .bar-row').length === 3 && !/Extra/.test(w.$('.bars').textContent), w.$$('.bars .bar-row').length);
    act(w, 'go', 'exam');
    check('mini: the test setup lists only tested domains', w.$$('.su-w').length === 3 && !w.$('.su-w[data-d="4"]'), w.$$('.su-w').length);
    act(w, 'lesson', 'u3l1');
    check('mini: an untested lesson says so', w.$$('.lesson-head .pill').some(p => p.textContent === 'Not on the exam'));
    act(w, 'lesson', 'u1l1');
    check('mini: a tested lesson does not', !w.$$('.lesson-head .pill').some(p => p.textContent === 'Not on the exam'));
    act(w, 'lesson', 'u3l1');
    w.click(w.$('[data-act="start-checkpoint"]'));
    for (let k = 0; k < 4; k++) { const s = st().active; const q = fat(s.items[s.i]); w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); }
    check('mini: an untested lesson passes its checkpoint', st().lessons.u3l1.status === 'passed');
    act(w, 'go', 'home');
    check('mini: lessons passed counts the untested lesson out of all 8', /1\s*\/ 8/.test(w.$$('.stat').map(e => e.textContent).join(' ')), w.$$('.stat').map(e => e.textContent).join(' | '));
    // A fresh checkpoint on the same untested lesson, every answer wrong: it earns priority points
    // like any other lesson, but it is not an exam topic, so it must never be offered for drills.
    act(w, 'lesson', 'u3l1'); act(w, 'start-checkpoint', 'u3l1');
    for (let k = 0; k < 4; k++) { const s = st().active; const q = fat(s.items[s.i]); w.click(w.$(`[data-act="opt"][data-arg="${(q.c + 1) % 4}"]`)); w.click(w.$('[data-act="submit"]')); w.click(w.$('[data-act="next"]')); }
    act(w, 'go', 'home');
    check('an untested lesson never appears in weak topics', !/D One/.test((w.$$('.topic-list').map(e => e.textContent).join(' '))), w.$$('.topic-list').map(e => e.textContent).join(' | '));
    w.close();
  }

  // ----- Labs (mini fixture: u1l2 carries the "mini-ping" lab on the choices instrument) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini }); const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    // Home shows the welcome page until the starter test is taken, so take it first (all right).
    w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
    st().active.items.map(fat).forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'lesson', 'u1l2');
    const card = w.$('#lab');
    check('lab card renders on its lesson, after the hook and before the deeper explanation', !!card && !!w.$('.hook') && (w.$('.hook').compareDocumentPosition(card) & w.Node.DOCUMENT_POSITION_FOLLOWING) !== 0 && (card.compareDocumentPosition(w.$('.deep-cta')) & w.Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
    check('lab card shows the title, the intro, three tasks, and the task count', /Read a ping/.test(card.textContent) && /Read the output below/.test(card.textContent) && w.$$('.lab-task').length === 3 && /0 of 3 tasks/.test(card.textContent), card.textContent.slice(0, 120));
    check('the choices panel shows the scenario text', !!w.$('#instrument pre') && /10\.0\.0\.1/.test(w.$('#instrument pre').textContent));
    check('rail marks the lab lesson', !!w.$('.rail .lab-pill'));
    act(w, 'lesson', 'u1l1');
    check('a lesson without a lab has no lab card', !w.$('#lab'));
    act(w, 'lesson', 'u1l2');
    w.click(w.$('[data-act="lab-answer"][data-arg="who:1"]'));
    check('a wrong choice shows the why and stays open', !!w.$('.lab-task[data-task="who"] .feedback.bad') && /names 10\.0\.0\.1/.test(w.$('.lab-task[data-task="who"]').textContent) && st().labs['mini-ping'].ok.who === false);
    w.click(w.$('[data-act="lab-answer"][data-arg="who:0"]'));
    check('a right choice is marked correct', !!w.$('.lab-task[data-task="who"] .feedback.good') && st().labs['mini-ping'].ok.who === true && w.$('[data-act="lab-answer"][data-arg="who:0"]').disabled);
    w.$('#lab-loss').value = '40'; w.click(w.$('[data-act="lab-check"][data-arg="loss"]'));
    check('a reading outside the range is wrong, with its why', !!w.$('.lab-task[data-task="loss"] .feedback.bad') && /50%/.test(w.$('.lab-task[data-task="loss"]').textContent));
    w.$('#lab-loss').value = '50'; w.click(w.$('[data-act="lab-check"][data-arg="loss"]'));
    check('a reading inside the range is right and stored as a number', !!w.$('.lab-task[data-task="loss"] .feedback.good') && st().labs['mini-ping'].values.loss === 50);
    check('the task count updates', /2 of 3 tasks/.test(w.$('#lab').textContent));
    w.click(w.$('[data-act="lab-answer"][data-arg="ok:pass"]'));
    check('a wrong verdict is wrong', !!w.$('.lab-task[data-task="ok"] .feedback.bad'));
    w.click(w.$('[data-act="lab-answer"][data-arg="ok:fail"]'));
    const lab = st().labs['mini-ping'];
    check('the last right answer marks the lab done with a timestamp', lab.done === true && lab.at > 0 && /LAB DONE/.test(w.$('#lab').textContent));
    check('a done lab folds its tasks behind a summary', !!w.$('#lab.done details.lab-fold') && !w.$('#lab details.lab-fold').open);
    check('a Redo button appears once done', !!w.$('[data-act="lab-redo"]'));
    act(w, 'go', 'home');
    check('home shows Labs done 1 of 1', /Labs done/.test(w.text()) && /1\s*\/ 1/.test(w.$$('.stat').map(e => e.textContent).join(' ')), w.$$('.stat').map(e => e.textContent).join(' | '));
    act(w, 'lesson', 'u1l2'); w.click(w.$('[data-act="lab-redo"]'));
    check('Redo clears the lab', st().labs['mini-ping'].done === false && /0 of 3 tasks/.test(w.$('#lab').textContent));
    w.close();
  }
  // ----- A missing instruments module degrades to a note, never a blank page -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini, beforeAppJs: x => { delete x.FRAInstruments; } });
    act(w, 'lesson', 'u1l2');
    check('without the module the lab card says the lab is unavailable', !!w.$('#lab') && /This lab is unavailable/.test(w.$('#instrument').textContent) && w.$$('.lab-task').length === 3);
    w.close();
  }

  // ----- Record the reading: a measured task copies the panel's value into its input -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const w = boot({ courseDir: mini, beforeApp: x => {
      // Swap the fixture lab for a safety-analyzer lab on the same lesson, in this window only.
      x.FRA.labs['mini-ping'] = { id: 'mini-ping', lesson: 'u1l2', title: 'Safety check', instrument: 'safety', intro: 'Test the device.',
        scenario: { standard: 'NFPA 99', ground: 0.12, chassis: { normal: 45, reverse: 60, 'normal-open': 180, 'reverse-open': 210 }, lead: { normal: 8, reverse: 9, 'normal-open': 40, 'reverse-open': 45 }, limits: { ground: 0.5, chassis: 500, lead: 100 } },
        tasks: [{ id: 'gnd', kind: 'reading', prompt: 'Ground wire resistance', unit: 'ohm', expect: [0.08, 0.16], measure: { test: 'ground', polarity: 'normal', ground: 'closed' } }, { id: 'v', kind: 'verdict', prompt: 'Pass?', expect: 'pass' }],
        why: { gnd: 'Read the ground test.', v: 'Everything is under its limit.' } };
    } });
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    act(w, 'lesson', 'u1l2');
    check('a measured reading task offers Record the reading', !!w.$('[data-act="lab-use"][data-arg="gnd"]'));
    w.click(w.$('[data-act="lab-use"][data-arg="gnd"]'));
    check('Record before a measurement leaves the input empty', w.$('#lab-gnd').value === '');
    w.$('#instrument [data-ins="test"]').dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    w.click(w.$('[data-act="lab-use"][data-arg="gnd"]'));
    const typed = Number(w.$('#lab-gnd').value);
    check('Record copies the analyzer reading into the input', typed >= 0.11 && typed <= 0.13, w.$('#lab-gnd').value);
    w.click(w.$('[data-act="lab-check"][data-arg="gnd"]'));
    check('the recorded reading checks as correct', st().labs['mini-ping'].ok.gnd === true);
    check('the panel keeps its reading across the re-render', /ohm/.test(w.$('#instrument [data-readout]').textContent));
    w.close();
  }

  // ----- Certificate of completion (manifest certificate: true) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const cert = x => { x.FRA.course.certificate = true; };
    let w = boot({ courseDir: mini, beforeApp: cert });
    act(w, 'go', 'progress');
    check('progress offers the certificate card when the manifest enables it', /Certificate of completion/.test(w.text()) && !!w.$('[data-act="go"][data-arg="certificate"]'));
    act(w, 'go', 'certificate');
    check('before the gate the certificate page lists what is left', /Not yet/.test(w.text()) && /8 lessons left/.test(w.text()) && /1 lab left/.test(w.text()) && /official-format test/i.test(w.text()), w.text().slice(0, 300));
    check('the hash names the certificate view', w.location.hash === '#certificate', w.location.hash);
    w.close();
    w = boot({ courseDir: mini });
    act(w, 'go', 'progress');
    check('without the flag there is no certificate card', !/Certificate of completion/.test(w.text()));
    w.close();
    w = boot({ courseDir: mini, hash: '#certificate' });
    check('the certificate hash on a course without one lands on Progress', w.location.hash === '#progress' && /Progress/.test(w.text()), w.location.hash);
    w.close();
    // Everything done, seeded straight into storage. Signed out, so the name is typed.
    const passed = {}; ['u1l1', 'u1l2', 'u1l3', 'u2l1', 'u2l2', 'u2l3', 'u3l1', 'u3l2'].forEach(id => { passed[id] = { status: 'passed', best: 4, attempts: 1, passedAt: 5, lastScore: 4, lastAt: 5 }; });
    const rec = (id, kind, date, extra) => Object.assign({ id, date, kind, score: 9, total: 10, pct: 90, byDomain: {}, review: [], seconds: 60, minutes: 0, setup: null, noConf: true }, extra || {});
    const seeded = { v: 3, course: 'mini', view: { name: 'home' }, lessons: passed, qstats: {}, topics: {}, exams: [rec('s', 'starter', 1, { total: 6, score: 6, pct: 100, noConf: false }), rec('p1', 'practice', 2), rec('p2', 'practice', 3), rec('o', 'practice', 4, { minutes: 10, setup: { mode: 'standard', n: 10, minutes: 10 } })], passes: 0, official: null, plan: null, path: null, pathAt: 0, active: null, settings: { timer: true }, feedback: [], ratings: {}, seen: { cheat: true }, labs: { 'mini-ping': { done: true, at: 5, values: {}, ok: {} } }, settingsAt: 0, touchedAt: 1, created: 1 };
    const seed = x => { cert(x); x.localStorage.setItem('fra.mini.state.v3', JSON.stringify(seeded)); };
    w = boot({ courseDir: mini, hash: '#certificate', beforeApp: seed });
    const st = () => JSON.parse(w.localStorage.getItem('fra.mini.state.v3'));
    check('the seeded state replays to an official pass', !!st().official);
    check('with everything done the certificate is earned and asks for a name', /Earned/.test(w.text()) && !!w.$('#cert-name') && w.$('[data-act="print-cert"]').disabled);
    const body = w.$('.certificate').textContent;
    check('the certificate names the course, every lesson, every lab, and the official score', /Mini Course/.test(body) && /all 8 lessons/.test(body) && /all 1 lab\b/.test(body) && /90%/.test(body), body);
    check('the earned date is recorded', st().certAt > 0);
    w.$('#cert-name').value = 'Pat Learner'; act(w, 'cert-name');
    check('saving the name puts it on the certificate and enables Print', /Pat Learner/.test(w.$('.cert-name').textContent) && !w.$('[data-act="print-cert"]').disabled && st().settings.certName === 'Pat Learner' && st().settingsAt > 0);
    const nameAt = st().settingsAt;
    await new Promise(r => setTimeout(r, 5));                            // past the millisecond the first save stamped
    w.$('#cert-name').value = 'Pat Learner'; act(w, 'cert-name');
    check('saving an unchanged name does not restamp settings', st().settingsAt === nameAt, `${nameAt} -> ${st().settingsAt}`);
    act(w, 'print-cert'); await new Promise(r => setTimeout(r, 200));   // print-cert prints after a 120 ms settle
    check('Print calls window.print', w.printed === 1, w.printed);
    act(w, 'go', 'home');
    check('home offers the certificate once earned', !!w.$('[data-act="go"][data-arg="certificate"]'));
    // Earned is earned: redoing the lab clears that lab, but the certificate already issued stands.
    const certAt = st().certAt;
    act(w, 'lesson', 'u1l2'); w.click(w.$('[data-act="lab-redo"]'));
    act(w, 'go', 'certificate');
    check('redoing a lab does not revoke an earned certificate', /Earned/.test(w.text()) && st().certAt === certAt, `${certAt} -> ${st().certAt}`);
    w.close();
    // Signed in: the account name is used and no name field is shown.
    w = boot({ courseDir: mini, hash: '#certificate', beforeApp: x => { seed(x); x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com', name: 'Sam Tech' })); }, beforeAppJs: x => { x.fetch = () => Promise.reject(new Error('offline')); } });
    check('signed in, the account name is on the certificate and there is no name field', /Sam Tech/.test(w.$('.cert-name').textContent) && !w.$('#cert-name'));
    w.close();
  }

  // ----- Home kit card: shown until the kit lab is done (BMET spec section 2; Plan B Task 2) -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const withKit = x => { x.FRA.course.kit = ['Digital multimeter', 'Breadboard and jumpers']; x.FRA.course.kitLab = 'mini-ping'; };
    let w = boot({ courseDir: mini, beforeApp: withKit });
    const MK = 'fra.mini.state.v3'; const st = () => JSON.parse(w.localStorage.getItem(MK));
    // Home shows the welcome page until the starter test is taken, so take it first (all right).
    w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q = {}; w.FRA.questions.forEach(q => { Q[q.id] = q; }); const fat = x => typeof x === 'string' ? Q[x] : x;
    st().active.items.map(fat).forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'go', 'home');
    const card = w.$('.kit-card');
    check('home shows the kit card with every item and a link to the kit lab', !!card && /Digital multimeter/.test(card.textContent) && /Breadboard and jumpers/.test(card.textContent) && !!card.querySelector('[data-act="lesson"][data-arg="u1l2"]'), card && card.textContent.slice(0, 120));
    // Finish the fixture lab: one choice, one reading, one verdict (the same actions the lab card's buttons send).
    act(w, 'lesson', 'u1l2');
    act(w, 'lab-answer', 'who:0');
    w.$('#lab-loss').value = '50'; act(w, 'lab-check', 'loss');
    act(w, 'lab-answer', 'ok:fail');
    check('the fixture lab is done', /LAB DONE/.test(w.$('#lab').textContent));
    act(w, 'go', 'home');
    check('home hides the kit card once the kit lab is done', !w.$('.kit-card'));
    w = boot({ courseDir: mini });
    const MK2 = 'fra.mini.state.v3'; const st2 = () => JSON.parse(w.localStorage.getItem(MK2));
    // Home shows the welcome page until the starter test is taken, so take it first (all right).
    w.click(w.$('[data-act="go"][data-arg="home"]')); w.click(w.$('[data-act="start-exam"][data-arg="starter"]'));
    const Q2 = {}; w.FRA.questions.forEach(q => { Q2[q.id] = q; }); const fat2 = x => typeof x === 'string' ? Q2[x] : x;
    st2().active.items.map(fat2).forEach(q => { w.click(w.$(`[data-act="opt"][data-arg="${q.c}"]`)); w.click(w.$('[data-act="conf"][data-arg="5"]')); w.click(w.$('[data-act="submit"]')); });
    act(w, 'go', 'home');
    check('the no-kit window is on Home', !!w.$('.stats'));
    check('a manifest without a kit shows no kit card', !w.$('.kit-card'));
    w.close();
  }

  // ----- PBQs tab and view -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
    const wn = boot({ courseDir: path.join(ROOT, 'courses', 'cbet') }); // a pack that never ships PBQs
    check('no PBQs tab on a course without PBQs', !wn.$('[data-act="nav"][data-arg="pbq"]'));
    const wp = boot({ courseDir: mini, hash: '#pbq' }); const MK = 'fra.mini.state.v3'; const stateM = () => JSON.parse(wp.localStorage.getItem(MK));
    check('a course with PBQs shows the PBQs tab', !!wp.$('[data-act="nav"][data-arg="pbq"]'));
    check('#pbq lists the PBQ with its domain and title', /Bring the new printer online/.test(wp.text()) && /Alpha/.test(wp.text()));
    act(wp, 'pbq-open', 'mini-net');
    check('opening a PBQ shows the scenario, the log, and six task cards', /VLAN 10 on the 192.168.10.0\/26/.test(wp.text()) && !!wp.$('pre.pbq-log') && wp.$$('.pbq-task').length === 6 && wp.location.hash === '#pbq/mini-net');
    // Answer the typed and tapped kinds right, leave order and match alone, then Check.
    wp.$('.pbq-task[data-task="cfg"] input[data-field="ip"]').value = '192.168.10.10'; wp.$('.pbq-task[data-task="cfg"] input[data-field="mask"]').value = '/26';
    wp.$('.pbq-task[data-task="cmd"] input').value = 'ipconfig /all';
    wp.click(wp.$('.pbq-task[data-task="lines"] [data-pbq="ms-opt"][data-index="0"]'));
    wp.click(wp.$('.pbq-task[data-task="cable"] [data-pbq="choice"][data-index="0"]'));
    const attemptsBefore = (stateM().topics.u1l2 || { attempts: 0 }).attempts;
    act(wp, 'pbq-check', 'mini-net');
    const ps = stateM().pbqs['mini-net'];
    check('Check writes the PBQ state with per-task scores and a timestamp', ps && ps.at > 0 && ps.tasks.cfg === 1 && ps.tasks.cmd === 1 && ps.tasks.lines === 1 && ps.tasks.cable === 1 && typeof ps.tasks.steps === 'number');
    check('Check writes state only: no lesson attempt is recorded for the PBQ\'s topic', stateM().topics.u1l2 === undefined || stateM().topics.u1l2.attempts === attemptsBefore);
    check('Check writes state only: pbqs[id].at is still a real timestamp', typeof ps.at === 'number' && ps.at > 0);
    check('Check shows a why for every task and the expected answer for a miss', wp.$$('.pbq-why').length === 6);
    check('best score is the fraction of tasks fully right', Math.abs(ps.best - (Object.values(ps.tasks).filter(s => s === 1).length / 6)) < 0.001);
    act(wp, 'pbq-retry', 'mini-net');
    check('Retry clears the answers but keeps the best score', !wp.$('.pbq-why') && stateM().pbqs['mini-net'].best === ps.best && wp.$('.pbq-task[data-task="cmd"] input').value === '');
    // Home shows the welcome page until the starter test is taken (PBQs are exempt from that gate, Home is not), so take it first.
    wp.click(wp.$('[data-act="go"][data-arg="home"]')); wp.click(wp.$('[data-act="start-exam"][data-arg="starter"]'));
    const QP = {}; wp.FRA.questions.forEach(q => { QP[q.id] = q; }); const fatP = x => typeof x === 'string' ? QP[x] : x;
    stateM().active.items.map(fatP).forEach(q => { wp.click(wp.$(`[data-act="opt"][data-arg="${q.c}"]`)); wp.click(wp.$('[data-act="conf"][data-arg="5"]')); wp.click(wp.$('[data-act="submit"]')); });
    act(wp, 'go', 'home');
    check('Home shows PBQs done', /PBQs done/.test(wp.text()));
  }

  // ----- PBQs open the official-format test -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini'); const MK = 'fra.mini.state.v3';
    const wo = boot({ courseDir: mini }); const stateM = () => JSON.parse(wo.localStorage.getItem(MK));
    finishStarterIn(wo);
    act(wo, 'start-exam', 'practice');
    check('a practice test carries no PBQ', !stateM().active.items.some(x => x && x.pbq));
    wo.confirm = () => true; act(wo, 'abandon-exam');
    act(wo, 'start-standard');
    const a = stateM().active;
    check('the official-format test opens with pbqInTest PBQs', a.items.length > 0 && a.items[0].pbq === 'mini-net' && a.items.filter(x => x && x.pbq).length === 1);
    check('PBQ tasks replace questions one for one: the item count plus task count minus one equals the exam count', (a.items.length - 1) + 6 === 10, a.items.length);
    check('the exam view renders the PBQ tasks first', wo.$$('.pbq-task').length === 6 && /Submit this PBQ|Continue/.test(wo.text()));
    check('the PBQ page counts questions, not items, in its submitted-so-far line', /0 of 10 submitted so far/.test(wo.text()));
    // The scoring note must survive the phone: .kbd-hint is display:none below 700px, so the only
    // sentence saying a task counts as a question has to live outside it.
    const scoreNote = /each one scored as a question/;
    check('the PBQ test item says each task is scored as a question', scoreNote.test(wo.text()));
    check('the per-task scoring note is not inside a .kbd-hint, which phones hide', !scoreNote.test(wo.$$('.kbd-hint').map(el => el.textContent).join(' ')), wo.$$('.kbd-hint').map(el => el.textContent).join(' | '));
    // answer two tasks right, four wrong-or-blank, submit the PBQ
    wo.$('.pbq-task[data-task="cmd"] input').value = 'ipconfig /all';
    wo.click(wo.$('.pbq-task[data-task="cable"] [data-pbq="choice"][data-index="0"]'));
    act(wo, 'submit');
    check('submitting the PBQ records the task answers and moves on', stateM().active.i === 1 && stateM().active.answers[0] && stateM().active.answers[0].pbq === 'mini-net' && stateM().active.answers[0].answers.cmd === 'ipconfig /all');
    // Six tasks done out of ten questions: the counter and the meter count questions, not items.
    check('the in-test counter counts questions: six tasks done reads question 7 of 10', /Question 7 of 10/.test(wo.text()));
    check('the in-test meter counts questions: six of ten is 60%', wo.$('.exam-head .meter i').style.width === '60%', wo.$('.exam-head .meter i').style.width);
    check('the in-test footer counts questions answered', /6 answered so far/.test(wo.text()));
    // answer the remaining multiple-choice questions correctly
    const QQ = {}; wo.FRA.questions.forEach(q => { QQ[q.id] = q; });
    while (stateM().active) { const s = stateM().active; const it = s.items[s.i]; if (!it) break; const q = typeof it === 'string' ? QQ[it] : it; wo.click(wo.$(`[data-act="opt"][data-arg="${q.c}"]`)); act(wo, 'submit'); }
    const e = stateM().exams[stateM().exams.length - 1];
    check('the record counts PBQ tasks as questions', e.total === 10 && e.score >= 2 && e.review.length === 10);
    check('PBQ task review items carry the task as an inline question tied to the PBQ lesson', e.review.slice(0, 6).every(r => r.q && r.q.pbq === 'mini-net' && r.q.t === 'u1l2'));
    check('the results page explains missed tasks with Expected and Why', /Your answer/.test(wo.text()) && /Correct answer/.test(wo.text()) && /Why:/.test(wo.text()) && /notconnect is the only line/.test(wo.text()));
    check('missed PBQ tasks feed retraining for the PBQ lesson', !stateM().plan || stateM().plan.lessons.some(l => l.id === 'u1l2') || e.score === 10);
    // A second official-format test in the same page session is a new attempt: the last attempt's
    // answers are not the learner's answers to this one, so every task opens empty.
    act(wo, 'start-standard');
    check('a second official-format test opens with nothing typed in the PBQ', wo.$('.pbq-task[data-task="cmd"] input').value === '' && wo.$('.pbq-task[data-task="cfg"] input[data-field="ip"]').value === '', wo.$('.pbq-task[data-task="cmd"] input').value);
    check('a second official-format test opens with nothing selected in the PBQ', wo.$$('.pbq-task [aria-pressed="true"]').length === 0, wo.$$('.pbq-task [aria-pressed="true"]').length);
    act(wo, 'submit');
    const a2 = stateM().active.answers[0].answers;
    check('a second official-format test banks the empty answer shape for every task', JSON.stringify(a2.steps) === '[]' && JSON.stringify(a2.pairs) === '[null,null]' && JSON.stringify(a2.lines) === '[]' && a2.cmd === '' && a2.cfg.ip === '' && a2.cfg.mask === '' && a2.cable == null, JSON.stringify(a2));
  }

  // ----- the PBQ draw spreads across the pool and avoids the last attempt -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini'); const MK = 'fra.mini.state.v3';
    // Three small PBQs, one per domain, on a four-question exam, so twelve official-format tests run
    // quickly. pbqInTest is 1, so every test draws one of the three and two are always unused.
    const threePbqs = w => {
      w.FRA.pbqs = {};
      [1, 2, 3].forEach(d => {
        const tasks = ['a', 'b', 'c'].map(k => ({ id: k, kind: 'choice', prompt: 'Pick one', options: ['right', 'wrong'], expect: 0 }));
        w.FRA.pbqs['p' + d] = { id: 'p' + d, title: 'PBQ ' + d, domain: d, lesson: 'u1l2', scenario: { text: 'Scenario ' + d }, tasks, why: { a: 'Because.', b: 'Because.', c: 'Because.' } };
      });
      w.FRA.course.test.questions = 4;
    };
    const wd = boot({ courseDir: mini, beforeApp: threePbqs }); const stateD = () => JSON.parse(wd.localStorage.getItem(MK));
    finishStarterIn(wd);
    const drawn = [];
    for (let k = 0; k < 12; k++) {
      act(wd, 'start-standard');
      drawn.push(stateD().active.items.filter(x => x && x.pbq).map(x => x.pbq).join(','));
      act(wd, 'submit'); // the PBQ, left unanswered
      while (stateD().active) { wd.click(wd.$('[data-act="opt"][data-arg="0"]')); act(wd, 'submit'); }
    }
    check('twelve official-format tests do not all draw the same PBQ', new Set(drawn).size > 1, drawn.join(' '));
    check('no official-format test redraws the PBQ the last one used while an unused one exists', drawn.every((id, i) => i === 0 || id !== drawn[i - 1]), drawn.join(' '));
  }

  // ----- the draw is clamped to the exam's question count -----
  {
    const mini = path.join(ROOT, 'tests', 'fixtures', 'mini'); const MK = 'fra.mini.state.v3';
    // Two six-task PBQs with pbqInTest 2 would be twelve tasks on a ten-question exam.
    const twoBigPbqs = w => {
      const src = w.FRA.pbqs['mini-net'];
      w.FRA.pbqs = { 'big-a': Object.assign({}, src, { id: 'big-a', domain: 1 }), 'big-b': Object.assign({}, src, { id: 'big-b', domain: 2 }) };
      w.FRA.course.test.pbqInTest = 2;
    };
    const wc = boot({ courseDir: mini, beforeApp: twoBigPbqs }); const stateC = () => JSON.parse(wc.localStorage.getItem(MK));
    finishStarterIn(wc);
    act(wc, 'start-standard');
    const ic = stateC().active.items;
    const qs = ic.reduce((a, x) => a + (x && x.pbq ? wc.FRA.pbqs[x.pbq].tasks.length : 1), 0);
    check('a PBQ whose tasks would not fit the exam count is dropped from the draw', qs === 10, qs + ' questions from ' + ic.length + ' items');
    check('the clamped draw keeps the exam question count in the session setup', stateC().active.setup.count === 10 && ic.filter(x => x && x.pbq).length === 1, stateC().active.setup.count);
  }

  if (fails.length) { console.error(`engine: ${fails.length} failed`); process.exit(1); }
  console.log('engine: all OK');
  // Explicit on the success path too: engine/app.js's save() now schedules a debounced
  // FRASync push on every call (Task 5), which arms a real 5s setTimeout on every window
  // this file booted. Node's natural exit would otherwise wait out the last of those
  // instead of exiting as soon as the checks are done.
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
