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
  function bootSignedInAs(email, script) {
    const calls = [];
    const w = boot({
      courseDir: dir,
      beforeAppJs: x => {
        x.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email }));
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

  // 2) Signed in: the topbar shows the account, the sync dot, and sign-out -- never sign-in.
  {
    const { w: w14 } = bootSignedInAs('learner@example.com', [res(404)]);
    await tick(); // let the boot-time pull() settle
    gotoExempt(w14, 'cheatsheet');
    const who = w14.$('.topbar .acct .who');
    check('signed-in topbar shows the account email', !!who && who.textContent === 'learner@example.com', who && who.textContent);
    check('signed-in topbar has a sync dot', !!w14.$('.topbar #syncdot'));
    check('signed-in topbar shows sign-out', !!w14.$('.topbar [data-act="sign-out"]'));
    check('signed-in topbar has no sign-in button', !w14.$('.topbar [data-act="sign-in"]'));
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
    io.value = JSON.stringify({ v: 3, course: 'netplus', passStreak: 2 });
    w21.$('#app').appendChild(io);
    act(w21, 'import');
    check('importing a progress code loaded it', state(w21).passStreak === 2, state(w21).passStreak);
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

  if (fails.length) { console.error(`engine: ${fails.length} failed`); process.exit(1); }
  console.log('engine: all OK');
  // Explicit on the success path too: engine/app.js's save() now schedules a debounced
  // FRASync push on every call (Task 5), which arms a real 5s setTimeout on every window
  // this file booted. Node's natural exit would otherwise wait out the last of those
  // instead of exiting as soon as the checks are done.
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
