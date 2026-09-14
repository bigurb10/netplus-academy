// Pull / merge / push retry logic (engine/sync.js). Run: node tests/sync.js
'use strict';
const path = require('path');
const { boot, ROOT } = require('./lib.js');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const dir = path.join(ROOT, 'courses', 'netplus');

function harness(script) {
  const w = boot({ courseDir: dir });
  w.localStorage.clear();
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1'
  }));
  const calls = [];
  w.fetch = function (url, opts) {
    opts = opts || {};
    calls.push({
      url: String(url), method: opts.method || 'GET', headers: opts.headers || {},
      body: opts.body ? JSON.parse(opts.body) : null
    });
    const next = script.shift();
    if (!next) throw new Error('unexpected extra fetch: ' + url);
    return Promise.resolve(next);
  };
  return { w: w, calls: calls };
}

const res = (status, body, etag) => ({
  ok: status >= 200 && status < 300,
  status: status,
  headers: { get: k => (k.toLowerCase() === 'etag' ? (etag || null) : null) },
  json: () => Promise.resolve(body === undefined ? {} : body)
});

function state(extra) {
  return Object.assign({
    v: 3, course: 'netplus', lessons: {}, qstats: {}, topics: {},
    exams: [], passStreak: 0, official: null, plan: null, path: null, active: null,
    settings: { timer: true }, settingsAt: 0, feedback: [], ratings: {}, seen: {},
    touchedAt: 0, created: 1
  }, extra || {});
}

(async () => {
  // ----- a 404 on first pull leaves local progress alone and is not an error -----
  {
    const h = harness([res(404)]);
    let local = state({ passStreak: 2 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const changed = await h.w.FRASync.pull();
    check('a 404 pull reports no change', changed === false, changed);
    check('a 404 first pull must not wipe local progress', local.passStreak === 2, local.passStreak);
  }

  // ----- pull merges server state into local -----
  {
    const remote = state({ lessons: { u1l1: { status: 'done', best: 90, attempts: 1, passedAt: 5 } } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    let local = state({ lessons: { u2l1: { status: 'done', best: 80, attempts: 1, passedAt: 6 } } });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const changed = await h.w.FRASync.pull();
    check('pull reports a change when the merge adds something', changed === true, changed);
    check('both devices\' lessons survived the merge', !!(local.lessons.u1l1 && local.lessons.u2l1),
      JSON.stringify(local.lessons));
  }

  // ----- push sends Content-Type: application/json or the server rejects it -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    const put = h.calls[0];
    check('the push is a PUT', put.method === 'PUT', put.method);
    const ct = put.headers['Content-Type'] || put.headers['content-type'];
    check('FastAPI runs strict_content_type; without this header every write is a 422',
      ct === 'application/json', ct);
  }

  // ----- the first push uses If-None-Match: * rather than a blind write -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    const hdr = h.calls[0].headers;
    check('a first write must be create-only, or it silently overwrites another device',
      (hdr['If-None-Match'] || hdr['if-none-match']) === '*', hdr['If-None-Match']);
  }

  // ----- a 412 re-GETs, merges, and retries with the fresh version -----
  {
    const remote = state({ passStreak: 3 });
    const h = harness([
      res(412),                                        // our write was stale
      res(200, { state: remote, version: 9 }, '"9"'),  // re-read
      res(200, { version: 10 }, '"10"')                // retry accepted
    ]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const ok = await h.w.FRASync.pushNow();
    check('the retry eventually succeeds', ok === true, ok);
    check('exactly one re-read and one retry', h.calls.length === 3, h.calls.length);
    check('the retry carried the version from the re-read',
      h.calls[2].headers['If-Match'] === '"9"', h.calls[2].headers['If-Match']);
  }

  // ----- a 412 then a 404 switches from If-Match to create -----
  // Starts from an already-established version (a first push that succeeds), not from
  // book.version's initial null -- otherwise "switch to If-None-Match on a 404" is
  // indistinguishable from "book.version just happened to already be null", and a
  // broken implementation that never resets book.version on a 404 passes by accident.
  {
    const h = harness([
      res(200, { version: 5 }, '"5"'), // an earlier push established a real version
      res(412),                        // stale
      res(404),                        // ...because the row was deleted meanwhile
      res(200, { version: 1 }, '"1"')  // so create it
    ]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();                          // establishes book.version = "5"
    local = Object.assign({}, local, { passStreak: 2 });  // a real change, so the next push proceeds
    const ok = await h.w.FRASync.pushNow();
    check('the create-after-delete retry succeeds', ok === true, ok);
    check('the retry that hit 412 carried the established version',
      h.calls[1].headers['If-Match'] === '"5"', h.calls[1].headers['If-Match']);
    check('after a 404 the loop must switch from If-Match to create',
      h.calls[3].headers['If-None-Match'] === '*', h.calls[3].headers['If-None-Match']);
  }

  // ----- the retry loop is bounded at three attempts -----
  {
    const h = harness([
      res(412), res(200, { state: state(), version: 2 }, '"2"'),
      res(412), res(200, { state: state(), version: 3 }, '"3"'),
      res(412), res(200, { state: state(), version: 4 }, '"4"')
    ]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const ok = await h.w.FRASync.pushNow();
    check('gave up rather than looping forever', ok === false, ok);
    check('stayed dirty so a later trigger retries', h.w.FRASync.isDirty() === true, h.w.FRASync.isDirty());
    // Not in the brief, added because the two checks above pass identically whether the
    // loop is genuinely bounded at 3 attempts or unbounded-but-happens-to-run-out-of-
    // script (an unbounded loop hits the harness's "unexpected extra fetch" throw, which
    // pushNow's own catch(offline) swallows into the same {ok:false, dirty:true} result).
    // Bounded-at-3 makes exactly 5 calls (PUT,GET,PUT,GET,PUT) and never touches the
    // script's 6th entry; that count is the only thing that actually distinguishes the
    // two implementations.
    check('exactly five calls -- PUT, GET, PUT, GET, PUT -- then give up',
      h.calls.length === 5, h.calls.length);
  }

  // ----- a 413 is permanent and is not retried -----
  {
    const h = harness([res(413)]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const ok = await h.w.FRASync.pushNow();
    check('a 413 push does not report success', ok === false, ok);
    check('a too-large blob must not be retried; it can never fit', h.calls.length === 1, h.calls.length);
  }

  // ----- a 503 does not sign the learner out -----
  {
    const h = harness([res(503)]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    check('a JWKS or database outage returns 503; signing out on it would log everyone out',
      h.w.FRAAuth.isSignedIn() === true, h.w.FRAAuth.isSignedIn());
    check('stays dirty for a later retry', h.w.FRASync.isDirty() === true, h.w.FRASync.isDirty());
  }

  // ----- a 401 signs out -----
  {
    const h = harness([res(401)]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    check('a genuinely dead token ends the session', h.w.FRAAuth.isSignedIn() === false, h.w.FRAAuth.isSignedIn());
  }

  // ----- an unchanged state is not pushed again -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    await h.w.FRASync.pushNow();   // nothing changed in between
    check('every PUT burns a version; re-pushing an identical state makes two devices 412 each other',
      h.calls.length === 1, h.calls.length);
  }

  // ----- a network failure is swallowed and stays dirty -----
  {
    const w = boot({ courseDir: dir });
    w.localStorage.clear();
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1'
    }));
    w.fetch = () => Promise.reject(new Error('offline'));
    let local = state({ passStreak: 1 });
    w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const ok = await w.FRASync.pushNow();          // must not throw
    check('a network failure resolves false, never throws', ok === false, ok);
    check('stays dirty so a later trigger retries', w.FRASync.isDirty() === true, w.FRASync.isDirty());
  }

  // ----- signed-out sync is a no-op and touches no network -----
  {
    const w = boot({ courseDir: dir });
    w.localStorage.clear();
    w.fetch = () => { throw new Error('anonymous study must never call the API'); };
    let local = state();
    w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    check('signed-out pull is a no-op', await w.FRASync.pull() === false);
    check('signed-out push is a no-op', await w.FRASync.pushNow() === false);
  }

  // ===== Controller's three defect resolutions on top of the brief =====

  // ----- (1) touchedAt alone must not force a second push -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1, touchedAt: 100 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    // Simulate save() stamping touchedAt on a mere navigation -- nothing else changed.
    local = Object.assign({}, local, { touchedAt: 999999 });
    const ok = await h.w.FRASync.pushNow();
    check('a touchedAt-only difference does not report a push', ok === false, ok);
    check('a touchedAt-only difference sends no second PUT', h.calls.length === 1, h.calls.length);
    check('pushNow cleared dirty rather than leaving it forced', h.w.FRASync.isDirty() === false, h.w.FRASync.isDirty());
  }

  // ----- (2) a dirty flag alone (schedulePush) does not force a write of an unchanged state -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();               // establishes book.hash for this exact state
    h.w.FRASync.schedulePush();                // marks dirty, as every save() does
    const ok = await h.w.FRASync.pushNow();     // state has not actually changed since the write above
    check('dirty alone does not force a write of an unchanged state', ok === false, ok);
    check('no second PUT was sent', h.calls.length === 1, h.calls.length);
    check('pushNow cleared the stale dirty flag; dirty means a write is owed, and none is',
      h.w.FRASync.isDirty() === false, h.w.FRASync.isDirty());
    h.w.FRASync.reset();                        // cancel schedulePush's pending 5s debounce timer
  }

  // ----- (3) a pull whose merge added nothing beyond what the server has does not push it back -----
  {
    const remote = state({ lessons: { u1l1: { status: 'done', best: 90, attempts: 1, passedAt: 5 } } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    let local = state();   // strictly less than remote; the merge only adopts remote's lesson
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const changed = await h.w.FRASync.pull();
    check('pull adopted the servers lesson locally', changed === true, changed);
    const ok = await h.w.FRASync.pushNow();
    check('a pull that only adopted what the server already sent must not push it straight back',
      ok === false, ok);
    check('no PUT followed the pull', h.calls.length === 1, h.calls.length);
  }

  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All sync tests passed.');
})().catch(e => { console.error(e); process.exit(1); });
