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
  // Rewritten on the harness() pattern with an EMPTY script (review finding 4): the
  // original test's throwing fetch stub proved nothing, because sync.js's required
  // .catch() swallows that throw -- pull()/pushNow() would still resolve false even
  // if a bug called the API while signed out. An empty script plus asserting
  // h.calls.length === 0 actually catches that.
  {
    const h = harness([]);
    h.w.localStorage.clear();   // drop the fra.auth.v1 token harness() wrote; this test is signed-out
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const pulled = await h.w.FRASync.pull();
    const pushed = await h.w.FRASync.pushNow();
    check('signed-out pull is a no-op', pulled === false, pulled);
    check('signed-out push is a no-op', pushed === false, pushed);
    check('anonymous study must never call the API', h.calls.length === 0, h.calls.length);
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

  // ===== Review round 1: six findings =====

  // ----- (finding 1) a 404 pull must not leave book.hash stale, or a deleted server
  // row can never be recreated by an unchanged client -----
  {
    const h = harness([
      res(200, { version: 1 }, '"1"'),  // an earlier push establishes book.version/hash
      res(404),                          // then a pull finds the row gone
      res(200, { version: 1 }, '"1"')    // the SAME local state must be able to recreate it
    ]);
    let local = state({ passStreak: 4 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();                // establishes book.version = "1", book.hash = hashOf(local)
    const pulled = await h.w.FRASync.pull();     // 404: the server row was deleted meanwhile
    check('a 404 pull is not itself a change', pulled === false, pulled);
    const ok = await h.w.FRASync.pushNow();      // SAME local state as the first push
    check('an unchanged client can recreate a deleted server row', ok === true, ok);
    check('exactly one PUT followed the 404 pull', h.calls.length === 3, h.calls.length);
    check('the recreate write is create-only, not skipped as unchanged',
      h.calls[2].headers['If-None-Match'] === '*', h.calls[2].headers['If-None-Match']);
  }

  // ----- (finding 2a) two synchronous pushNow() calls must not both PUT -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const p1 = h.w.FRASync.pushNow();
    const p2 = h.w.FRASync.pushNow();   // called synchronously, before p1's token() lookup resolves
    const [r1, r2] = await Promise.all([p1, p2]);
    check('the first synchronous call wins and succeeds', r1 === true, r1);
    check('the second synchronous call resolves false rather than racing to a second PUT',
      r2 === false, r2);
    check('two synchronous pushNow() calls against one scripted response produce exactly one PUT',
      h.calls.length === 1, h.calls.length);
  }

  // ----- (finding 2b) reset() fences a write already in flight -----
  {
    const h = harness([]);   // fetch is overridden below with a deferred (manually-resolved) stub
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    let resolveFetch;
    h.w.fetch = function (url, opts) {
      opts = opts || {};
      h.calls.push({
        url: String(url), method: opts.method || 'GET', headers: opts.headers || {},
        body: opts.body ? JSON.parse(opts.body) : null
      });
      return new Promise(function (resolve) { resolveFetch = resolve; });
    };
    const p = h.w.FRASync.pushNow();     // starts a write; the PUT is now pending
    await new Promise(function (r) { setTimeout(r, 0); });   // let the pending PUT actually fire
    check('the write reached fetch before reset() fired', h.calls.length === 1, h.calls.length);
    h.w.FRASync.reset();                 // e.g. sign-out while the write is still in flight
    resolveFetch(res(200, { version: 1 }, '"1"'));   // the deferred response arrives after reset
    const ok = await p;
    check('a write fenced by reset() resolves false', ok === false, ok);
    check('reset() cleared the bookkeeping key despite the late response',
      h.w.localStorage.getItem('fra.netplus.sync.v1') === null,
      h.w.localStorage.getItem('fra.netplus.sync.v1'));
    check('isDirty is false after the deferred response resolves',
      h.w.FRASync.isDirty() === false, h.w.FRASync.isDirty());
  }

  // ----- (review round 2) reset() also fences a pull() already in flight -----
  {
    const h = harness([]);   // fetch is overridden below with a deferred (manually-resolved) stub
    // A lesson the merge would adopt if it ran, and a passStreak that differs from
    // local's whether or not the raw field carries over (mergeState always recomputes
    // passStreak from the exam log) -- either way, a real adopt() changes `local`.
    const remote = state({ passStreak: 5, lessons: { u1l1: { status: 'done', best: 90, attempts: 1, passedAt: 5 } } });
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    let resolveFetch;
    h.w.fetch = function (url, opts) {
      opts = opts || {};
      h.calls.push({
        url: String(url), method: opts.method || 'GET', headers: opts.headers || {},
        body: opts.body ? JSON.parse(opts.body) : null
      });
      return new Promise(function (resolve) { resolveFetch = resolve; });
    };
    const p = h.w.FRASync.pull();    // starts a read; the GET is now pending
    await new Promise(function (r) { setTimeout(r, 0); });   // let the pending GET actually fire
    check('the read reached fetch before reset() fired', h.calls.length === 1, h.calls.length);
    h.w.FRASync.reset();             // e.g. sign-out while the read is still in flight
    resolveFetch(res(200, { state: remote, version: 7 }, '"7"'));   // the deferred response arrives after reset
    const ok = await p;
    check('a read fenced by reset() resolves false', ok === false, ok);
    check('local was never adopted after reset() fenced the read',
      local.passStreak === 1 && !local.lessons.u1l1, JSON.stringify(local));
    check('reset() cleared the bookkeeping key despite the late pull response',
      h.w.localStorage.getItem('fra.netplus.sync.v1') === null,
      h.w.localStorage.getItem('fra.netplus.sync.v1'));
  }

  // ----- (finding 3) a merge that only reorders feedback must not force a push -----
  {
    const itemA = { id: 'A', text: 'a', sent: true };
    const itemB = { id: 'B', text: 'b', sent: true };
    const itemC = { id: 'C', text: 'c', sent: true };
    const remote = state({ feedback: [itemA, itemB, itemC] });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    let local = state({ feedback: [itemB, itemA] });   // same items as remote, different order
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pull();
    const ok = await h.w.FRASync.pushNow();
    check('a feedback-reorder-only merge does not report a push', ok === false, ok);
    check('no PUT followed a feedback-reorder-only merge', h.calls.length === 1, h.calls.length);
  }

  // ----- (finding 5) maybePull only pulls when the last pull was over 60s ago -----
  {
    const h = harness([res(404), res(404)]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pull();   // seeds book.lastPullAt = Date.now()
    const ok1 = await h.w.FRASync.maybePull();
    check('maybePull with a recent lastPullAt resolves false', ok1 === false, ok1);
    check('maybePull with a recent lastPullAt makes no request', h.calls.length === 1, h.calls.length);

    // Stub Date.now on the window rather than sleeping, as tests/engine.js does.
    const t0 = h.w.Date.now();
    h.w.Date.now = () => t0 + 61000;
    await h.w.FRASync.maybePull();
    check('maybePull performs the GET once lastPullAt is over 60s stale',
      h.calls.length === 2, h.calls.length);
    check('the stale-lastPullAt call was a GET', h.calls[1].method === 'GET', h.calls[1].method);
  }

  // ===== Final review C2: the local blob belongs to exactly one account =====
  // Nothing recorded whose progress fra.<courseId>.state.v3 was, so signing in as a
  // second learner on the same browser merged the first one into the new account. The
  // sync book now records the owner, and pull() checks it before merging.
  const SYNC_KEY = 'fra.netplus.sync.v1';
  const STATE_KEY = 'fra.netplus.state.v3';
  const lesson = (best, at) => ({ status: 'done', best: best, attempts: 1, passedAt: at });
  // Tolerant of a missing key, so an implementation that drops the book entirely fails the
  // owner check by name rather than crashing the suite on JSON.parse(null).
  const bookOf = h => JSON.parse(h.w.localStorage.getItem(SYNC_KEY) || '{}');
  // The extra opts sync.js needs on the ownership paths, wired the way engine/app.js
  // wires them: stash copies the blob aside, fresh supplies an empty state.
  function ownerOpts(h, get, set) {
    const o = {
      courseId: 'netplus',
      getState: get,
      // Records the second argument as well: `false` means "this is a different account's
      // state, do not carry the previous learner's view and open exam over".
      adopt: (s, keepDeviceLocal) => { o.adoptedWith = keepDeviceLocal; set(s); },
      // Mirrors engine/app.js: the stash is tagged with the account it belongs to, and
      // takeStashes hands back (and removes) only the stashes tagged for that account.
      stash: (ownerSub) => {
        const raw = h.w.localStorage.getItem(STATE_KEY);
        if (raw != null) h.w.localStorage.setItem(STATE_KEY + '.stash',
          JSON.stringify({ sub: ownerSub || null, at: 1, state: JSON.parse(raw) }));
      },
      takeStashes: (sub) => {
        const raw = h.w.localStorage.getItem(STATE_KEY + '.stash');
        if (raw == null) return [];
        const rec = JSON.parse(raw);
        if (!rec.sub || rec.sub !== sub) return [];
        h.w.localStorage.removeItem(STATE_KEY + '.stash');
        return [rec.state];
      },
      fresh: () => state()
    };
    return o;
  }

  // ----- (C2a) no recorded owner: anonymous progress is claimed by the first account -----
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    let local = state({ lessons: { u2l1: lesson(80, 6) } });
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.FRASync.init(o);
    await h.w.FRASync.pull();
    check('an unowned local blob is merged into the account claiming it -- the first-sign-in flow',
      !!(local.lessons.u1l1 && local.lessons.u2l1), JSON.stringify(Object.keys(local.lessons)));
    check('the merge path leaves the device-local view and exam alone', o.adoptedWith === undefined, o.adoptedWith);
    check('the pull records which account now owns the local progress',
      JSON.parse(h.w.localStorage.getItem(SYNC_KEY)).sub === 'u1', h.w.localStorage.getItem(SYNC_KEY));
  }

  // ----- (C2b) same owner: an ordinary sync still merges both sides -----
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: null, sub: 'u1', lastPullAt: 0 }));
    let local = state({ lessons: { u2l1: lesson(80, 6) } });
    h.w.FRASync.init(ownerOpts(h, () => local, s => { local = s; }));
    await h.w.FRASync.pull();
    check('the account that owns the local blob still merges both sides',
      !!(local.lessons.u1l1 && local.lessons.u2l1), JSON.stringify(Object.keys(local.lessons)));
  }

  // ----- (C2c) different owner, server has a row: adopt it, never merge -----
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'someone-else', lastPullAt: 0 }));
    let local = state({ lessons: { u2l1: lesson(80, 6) } });
    const before = JSON.stringify(local);
    h.w.localStorage.setItem(STATE_KEY, before);
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.FRASync.init(o);
    const changed = await h.w.FRASync.pull();
    check('a different account adopts the server state rather than merging', changed === true, changed);
    check('an identity switch tells the app not to carry the previous exam and view over',
      o.adoptedWith === false, o.adoptedWith);
    check('the previous learner progress is NOT handed to the new account',
      !local.lessons.u2l1, JSON.stringify(Object.keys(local.lessons)));
    check('the new account still gets its own stored progress',
      !!local.lessons.u1l1, JSON.stringify(Object.keys(local.lessons)));
    const stashed = JSON.parse(h.w.localStorage.getItem(STATE_KEY + '.stash') || 'null');
    check('the previous learner blob was stashed, not destroyed',
      !!stashed && JSON.stringify(stashed.state) === before, JSON.stringify(stashed && stashed.state));
    check('and the stash is tagged with the PREVIOUS owner, so they can get it back',
      !!stashed && stashed.sub === 'someone-else', stashed && stashed.sub);
    check('the sync book now names the new owner',
      JSON.parse(h.w.localStorage.getItem(SYNC_KEY)).sub === 'u1', h.w.localStorage.getItem(SYNC_KEY));
    check('nothing is pushed on the new account behalf until they act', h.calls.length === 1, h.calls.length);
    check('the adopt-wholesale path leaves no write owed', h.w.FRASync.isDirty() === false, h.w.FRASync.isDirty());
  }

  // ----- (C2d) different owner, server has nothing: start fresh, still stash -----
  {
    const h = harness([res(404)]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'someone-else', lastPullAt: 0 }));
    let local = state({ passStreak: 4, lessons: { u2l1: lesson(80, 6) } });
    const before = JSON.stringify(local);
    h.w.localStorage.setItem(STATE_KEY, before);
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.FRASync.init(o);
    await h.w.FRASync.pull();
    check('an identity switch on the 404 path also asks for no device-local carry-over',
      o.adoptedWith === false, o.adoptedWith);
    check('a different account with nothing stored starts from a fresh state',
      local.passStreak === 0 && !local.lessons.u2l1, JSON.stringify([local.passStreak, Object.keys(local.lessons)]));
    const stashed404 = JSON.parse(h.w.localStorage.getItem(STATE_KEY + '.stash') || 'null');
    check('the previous learner blob was stashed on the 404 path too',
      !!stashed404 && JSON.stringify(stashed404.state) === before && stashed404.sub === 'someone-else',
      JSON.stringify(stashed404 && { sub: stashed404.sub, lessons: Object.keys(stashed404.state.lessons) }));
    check('nothing is uploaded on the 404 different-owner path', h.calls.length === 1, h.calls.length);
  }

  // ----- (C2e) a 401 pull clears the book, not just the token -----
  {
    const h = harness([res(401)]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'u1', lastPullAt: 0 }));
    let local = state();
    let repainted = 0;
    const o = ownerOpts(h, () => local, s => { local = s; });
    o.onSignedOut = () => { repainted++; };
    h.w.FRASync.init(o);
    await h.w.FRASync.pull();
    check('a 401 pull ends the session', h.w.FRAAuth.isSignedIn() === false, h.w.FRAAuth.isSignedIn());
    const bk = bookOf(h);
    check('a 401 pull clears the server-session bookkeeping, so no later account inherits its version',
      !bk.version && !bk.hash && !bk.lastPullAt, JSON.stringify(bk));
    check('a 401 pull keeps the owner of the local blob', bk.sub === 'u1', JSON.stringify(bk));
    check('a 401 pull asks the app to repaint the signed-out topbar', repainted === 1, repainted);
  }

  // ----- (C2f) a 401 on a PUT ends the session exactly as a 401 on a GET does -----
  {
    const h = harness([res(401)]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'u1', lastPullAt: 99 }));
    let local = state({ passStreak: 1 });
    let repainted = 0;
    const o = ownerOpts(h, () => local, s => { local = s; });
    o.onSignedOut = () => { repainted++; };
    h.w.FRASync.init(o);
    await h.w.FRASync.pushNow();
    check('a 401 PUT ends the session', h.w.FRAAuth.isSignedIn() === false, h.w.FRAAuth.isSignedIn());
    const bk2 = bookOf(h);
    check('a 401 PUT clears the server-session bookkeeping too',
      !bk2.version && !bk2.hash && !bk2.lastPullAt, JSON.stringify(bk2));
    check('a 401 PUT keeps the owner of the local blob', bk2.sub === 'u1', JSON.stringify(bk2));
    check('a 401 PUT asks the app to repaint the signed-out topbar', repainted === 1, repainted);
  }

  // ----- (C2g) the owner survives sign-out: A signs out, B signs in on the same browser -----
  // The sign-out button runs FRASync.reset(). If that dropped the owner along with the
  // version, the very scenario C2 exists to stop -- a second learner inheriting the first
  // one's progress -- would still happen on the course they signed out from.
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'learner-A', lastPullAt: 55 }));
    let local = state({ lessons: { u2l1: lesson(80, 6) } });
    const before = JSON.stringify(local);
    h.w.localStorage.setItem(STATE_KEY, before);
    h.w.FRASync.init(ownerOpts(h, () => local, s => { local = s; }));
    h.w.FRASync.reset();                       // exactly what the sign-out button does
    const bk3 = bookOf(h);
    check('sign-out clears the server-session bookkeeping',
      !bk3.version && !bk3.hash && !bk3.lastPullAt, JSON.stringify(bk3));
    check('sign-out does not hand the local blob to the next account', bk3.sub === 'learner-A', JSON.stringify(bk3));
    await h.w.FRASync.pull();                  // a DIFFERENT account (the harness token is u1)
    check('the account signing in after a sign-out does not inherit the previous progress',
      !local.lessons.u2l1, JSON.stringify(Object.keys(local.lessons)));
    check('it gets its own server state instead', !!local.lessons.u1l1, JSON.stringify(Object.keys(local.lessons)));
    const stashedX = JSON.parse(h.w.localStorage.getItem(STATE_KEY + '.stash') || 'null');
    check('and the previous learner blob was stashed across the sign-out',
      !!stashedX && JSON.stringify(stashedX.state) === before && stashedX.sub === 'learner-A',
      JSON.stringify(stashedX && { sub: stashedX.sub, lessons: Object.keys(stashedX.state.lessons) }));
  }

  // ----- stashed progress comes back, merged, when its owner signs in again -----
  // The design says collisions between two copies of ONE learner's work merge automatically.
  // A stash is exactly that: this account's own progress, set aside when someone else used
  // the browser. On the owner's next pull it is merged in, removed, and pushed.
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    const delays = [];
    h.w.setTimeout = function (fn, d) { delays.push(d); return delays.length; };
    h.w.clearTimeout = function () {};
    let local = state({ lessons: { u2l1: lesson(80, 6) } });
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'u1', lastPullAt: 0 }));
    // What u1 left behind here earlier, when a different account took over this browser.
    h.w.localStorage.setItem(STATE_KEY + '.stash',
      JSON.stringify({ sub: 'u1', at: 1, state: state({ lessons: { u9l9: lesson(70, 3) } }) }));
    h.w.FRASync.init(o);
    const changed = await h.w.FRASync.pull();
    check('the owner returning gets their stashed lesson merged back in',
      !!(local.lessons.u1l1 && local.lessons.u2l1 && local.lessons.u9l9), JSON.stringify(Object.keys(local.lessons)));
    check('pull reports the change', changed === true, changed);
    check('the restored stash is removed', h.w.localStorage.getItem(STATE_KEY + '.stash') === null,
      h.w.localStorage.getItem(STATE_KEY + '.stash'));
    check('a push is armed to carry the restored progress to the server', delays.length >= 1 && h.w.FRASync.isDirty() === true,
      JSON.stringify({ delays, dirty: h.w.FRASync.isDirty() }));
    h.w.FRASync.reset();
  }

  // ----- a stash tagged for a DIFFERENT account is never handed to this one -----
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    h.w.setTimeout = function () { return 1; };
    h.w.clearTimeout = function () {};
    let local = state();
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'u1', lastPullAt: 0 }));
    const theirs = JSON.stringify({ sub: 'someone-else', at: 1, state: state({ lessons: { u9l9: lesson(70, 3) } }) });
    h.w.localStorage.setItem(STATE_KEY + '.stash', theirs);
    h.w.FRASync.init(o);
    await h.w.FRASync.pull();
    check('another account\'s stash is not merged into this one', !local.lessons.u9l9, JSON.stringify(Object.keys(local.lessons)));
    check('and it is left in place for its owner', h.w.localStorage.getItem(STATE_KEY + '.stash') === theirs,
      h.w.localStorage.getItem(STATE_KEY + '.stash'));
    h.w.FRASync.reset();
  }

  // ----- (C2h) ...but the SAME learner signing back in still merges -----
  {
    const remote = state({ lessons: { u1l1: lesson(90, 5) } });
    const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
    h.w.localStorage.setItem(SYNC_KEY, JSON.stringify({ version: 6, hash: 'stale', sub: 'u1', lastPullAt: 55 }));
    let local = state();
    h.w.FRASync.init(ownerOpts(h, () => local, s => { local = s; }));
    h.w.FRASync.reset();
    // Studying on while signed out is the ordinary anonymous path; the blob is still theirs.
    local = state({ lessons: { u2l1: lesson(80, 6) } });
    await h.w.FRASync.pull();
    check('the same learner signing back in still merges what they did while signed out',
      !!(local.lessons.u1l1 && local.lessons.u2l1), JSON.stringify(Object.keys(local.lessons)));
    check('nothing was stashed on the same-owner path',
      h.w.localStorage.getItem(STATE_KEY + '.stash') === null, h.w.localStorage.getItem(STATE_KEY + '.stash'));
  }

  // ----- (C2i) the owner rule is a WRITE rule too, not only a read rule -----
  // Reproduced by the re-review: u1 pushes, u2 signs in, u2's boot pull 5xxs so the book
  // still names u1, and the next push uploads u1's blob -- then 412s, re-GETs u2's row and
  // merges u1's progress into it. The guard sits in doPush, before anything is sent.
  {
    const h = harness([
      res(200, { version: 1 }, '"1"'),                                   // u1's own push
      res(503),                                                          // u2's boot pull fails
      // Nothing below may ever be reached. Scripted so that removing the guard reproduces
      // the reviewer's exact PUT, GET, PUT sequence rather than dying on an empty script.
      res(412),
      res(200, { state: state({ passStreak: 9 }), version: 4 }, '"4"'),
      res(200, { version: 5 }, '"5"')
    ]);
    let local = state({ ratings: { u1l1: { r: 9, ts: 5 } } });
    const o = ownerOpts(h, () => local, s => { local = s; });
    h.w.FRASync.init(o);
    await h.w.FRASync.pushNow();
    check('setup: u1 own push recorded u1 as the owner', bookOf(h).sub === 'u1', JSON.stringify(bookOf(h)));
    // A different account signs in on the same browser.
    h.w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u2'
    }));
    await h.w.FRASync.pull();                               // 503: identity still unresolved
    local = Object.assign({}, local, { passStreak: 3 });     // u2 studies
    const ok = await h.w.FRASync.pushNow();
    check('a push by an account that does not own the local blob is refused', ok === false, ok);
    check('no PUT followed the refused push', h.calls.length === 2,
      JSON.stringify(h.calls.map(c => c.method)));
    check('the refused push did not relabel the book onto the new account',
      bookOf(h).sub === 'u1', JSON.stringify(bookOf(h)));
    check('nothing of the new account was adopted by a retry loop that never ran',
      o.adoptedWith === undefined && local.passStreak === 3, JSON.stringify([o.adoptedWith, local.passStreak]));
  }

  // ===== Final review I5 / I6 / I8 =====

  // ----- (I5) `view` is device-local: a navigation must not burn a server version -----
  {
    const h = harness([res(200, { version: 1 }, '"1"')]);
    let local = state({ passStreak: 1, view: { name: 'home' }, touchedAt: 100 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();
    check('the PUT body carries no view', h.calls[0].body.state.view === undefined,
      JSON.stringify(h.calls[0].body.state.view));
    // Exactly what save() does on a navigation: a new view and a new touchedAt, nothing else.
    local = Object.assign({}, local, { view: { name: 'lesson', arg: 'u3l2' }, touchedAt: 999999 });
    const ok = await h.w.FRASync.pushNow();
    check('a navigation alone does not report a push', ok === false, ok);
    check('a navigation alone sends no second PUT', h.calls.length === 1, h.calls.length);
  }

  // ----- (I6a) two synchronous pull() calls coalesce into one GET -----
  {
    const h = harness([res(404)]);
    let local = state();
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const p1 = h.w.FRASync.pull();
    const p2 = h.w.FRASync.pull();   // synchronous: maybePull's throttle cannot see the first yet
    const [r1, r2] = await Promise.all([p1, p2]);
    check('two synchronous pull() calls make exactly one GET', h.calls.length === 1, h.calls.length);
    check('both pull() callers get the same answer', r1 === r2, [r1, r2].join(' / '));
    h.w.FRASync.reset();   // cancel the debounce the 404 branch arms (see I8 below)
  }

  // ----- (I6b) a pull issued mid-retry-loop waits for the push to finish -----
  {
    const h = harness([
      res(412),                                        // our write was stale
      res(200, { state: state(), version: 9 }, '"9"'),  // the loop re-reads
      res(200, { version: 10 }, '"10"'),                // and retries
      res(404)                                          // only then does the pull run
    ]);
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const pushing = h.w.FRASync.pushNow();
    const pulling = h.w.FRASync.pull();   // synchronous, while the push is still queued
    await Promise.all([pushing, pulling]);
    check('a pull issued during a 412 retry loop runs after the push completes',
      h.calls.map(c => c.method).join(',') === 'PUT,GET,PUT,GET', h.calls.map(c => c.method).join(','));
    h.w.FRASync.reset();
  }

  // ----- (I8) a first sign-in creates the row without waiting for another trigger -----
  {
    const h = harness([res(404), res(200, { version: 1 }, '"1"')]);
    // Capture the debounce rather than sleeping through it: schedulePush() reads
    // root.setTimeout at call time, so replacing it on the window is enough.
    let fire = null;
    h.w.setTimeout = function (fn) { fire = fn; return 1; };
    h.w.clearTimeout = function () {};
    let local = state({ passStreak: 2 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pull();
    check('a 404 pull arms the create push itself', typeof fire === 'function', typeof fire);
    if (typeof fire === 'function') fire();
    await new Promise(r => setTimeout(r, 5));
    check('the first sign-in uploads without waiting for an unrelated trigger',
      h.calls.length === 2 && h.calls[1].method === 'PUT', JSON.stringify(h.calls.map(c => c.method)));
    check('and that upload is a create, not a blind overwrite',
      !!h.calls[1] && h.calls[1].headers['If-None-Match'] === '*',
      h.calls[1] && h.calls[1].headers['If-None-Match']);
  }

  // ----- a malformed stored version never leaves the client as a bad If-Match -----
  // An older build (or a cache-mangled ETag) can leave a non-integer version in the sync
  // book. The server parses If-Match as an integer, so sending `If-Match: ""` is a 400
  // that strands every write after the first. The client must instead treat an unclean
  // version as unknown, create (If-None-Match: *), take the 412 that a create-on-existing
  // returns, re-GET a clean ETag, and retry as a proper update.
  {
    const h = harness([res(412), res(200, { state: state(), version: 5 }, '"5"'), res(200, { version: 6 }, '"6"')]);
    h.w.localStorage.setItem('fra.netplus.sync.v1',
      JSON.stringify({ version: '', hash: 'stale', sub: 'u1', lastPullAt: 0 }));  // '' = the poison value
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    const ok = await h.w.FRASync.pushNow();
    check('a stale empty version never becomes an If-Match; the first write is a create',
      h.calls[0].method === 'PUT' && h.calls[0].headers['If-None-Match'] === '*'
      && h.calls[0].headers['If-Match'] === undefined,
      JSON.stringify(h.calls[0].headers));
    check('the 412 is followed by a re-GET', h.calls[1] && h.calls[1].method === 'GET', h.calls[1] && h.calls[1].method);
    check('the retry carries the clean ETag from the re-GET as If-Match',
      h.calls[2] && h.calls[2].headers['If-Match'] === '"5"', h.calls[2] && h.calls[2].headers['If-Match']);
    check('the write ultimately succeeds', ok === true, ok);
  }

  // ----- a 412 storm does not re-arm itself: the retry's adopt cannot schedule a push,
  //       and an exhausted push backs off with jitter instead of the fixed 5s debounce -----
  // This is the live "412 constantly" livelock: two devices in lockstep, each PUT
  // invalidating the other's version. The retry's opts.adopt() -> save() -> schedulePush()
  // used to re-arm a 5s push behind the retry, so it fired forever every 5s.
  {
    const remote = state({ passStreak: 9 });
    const h = harness([res(412), res(200, { state: remote, version: 9 }, '"9"'),
                       res(412), res(200, { state: remote, version: 9 }, '"9"'),
                       res(412)]);                       // MAX_ATTEMPTS=3 PUTs, never a 200
    const delays = [];
    h.w.setTimeout = function (fn, d) { delays.push(d); return delays.length; };
    h.w.clearTimeout = function () {};
    let local = state({ passStreak: 1 });
    // adopt mirrors app.js: it calls save() which calls schedulePush() -- the re-arm source.
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local,
      adopt: s => { local = s; h.w.FRASync.schedulePush(); } });
    const ok = await h.w.FRASync.pushNow();
    check('a 412 storm gives up rather than looping to a 200', ok === false, ok);
    check('the retry\'s adopts armed no timer; exactly one follow-up is scheduled', delays.length === 1,
      JSON.stringify(delays));
    check('the follow-up is a jittered backoff, not the fixed 5s debounce',
      delays[0] !== 5000 && delays[0] >= 1 && delays[0] <= 2000, delays[0]);
    check('still dirty so the backoff retry is owed', h.w.FRASync.isDirty() === true, h.w.FRASync.isDirty());
    h.w.FRASync.reset();
  }

  // ----- backoff grows on repeated conflict and resets after a clean write -----
  {
    const remote = state({ passStreak: 9 });
    const conflict = () => [res(412), res(200, { state: remote, version: 9 }, '"9"'),
                            res(412), res(200, { state: remote, version: 9 }, '"9"'), res(412)];
    const h = harness(conflict().concat(conflict()));
    h.w.Math.random = () => 0.999;   // pin the jitter to ~ceiling, in the window's own Math
    const delays = [];
    h.w.setTimeout = function (fn, d) { delays.push(d); return delays.length; };
    h.w.clearTimeout = function () {};
    let local = state({ passStreak: 1 });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local,
      adopt: s => { local = s; h.w.FRASync.schedulePush(); } });
    await h.w.FRASync.pushNow();          // backoffN -> 1, ceil 2000
    await h.w.FRASync.pushNow();          // backoffN -> 2, ceil 4000
    check('backoff doubles on a second consecutive conflict',
      delays.length === 2 && delays[0] > 1900 && delays[0] <= 2000 && delays[1] > 3900 && delays[1] <= 4000,
      JSON.stringify(delays));
    // A clean create now succeeds and must reset the backoff to zero.
    const h2 = harness([res(200, { version: 1 }, '"1"')]);
    const d2 = [];
    h2.w.setTimeout = function (fn, d) { d2.push(d); return d2.length; };
    h2.w.clearTimeout = function () {};
    let l2 = state({ passStreak: 5 });
    h2.w.FRASync.init({ courseId: 'netplus', getState: () => l2, adopt: s => { l2 = s; } });
    const wrote = await h2.w.FRASync.pushNow();
    check('a clean write succeeds', wrote === true, wrote);
    check('a settled write arms no follow-up timer', d2.length === 0, JSON.stringify(d2));
    h.w.FRASync.reset(); h2.w.FRASync.reset();
  }

  // ----- after a conflict recovery, an unchanged push converges (no re-PUT) -----
  // The 412 recovery must prime book.hash on the server's state, or the next push always
  // re-PUTs even when the merges already made local identical to the server -- churn, not
  // convergence. local starts empty, so merge(local, remote) == remote and nothing is owed.
  {
    const remote = state({ lessons: { u1l1: { status: 'done', best: 90, attempts: 1, passedAt: 5 } } });
    const h = harness([res(412), res(200, { state: remote, version: 9 }, '"9"'),
                       res(412), res(200, { state: remote, version: 9 }, '"9"'),
                       res(412)]);                       // exhaust; local becomes == remote via the merges
    h.w.setTimeout = function () { return 1; };          // swallow the backoff arm
    h.w.clearTimeout = function () {};
    let local = state({ lessons: {} });
    h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
    await h.w.FRASync.pushNow();                          // conflict-exhausts; primes book.hash = hashOf(remote)
    const before = h.calls.length;
    const ok2 = await h.w.FRASync.pushNow();              // nothing changed and local == server now
    check('a conflict recovery primes the hash so an unchanged retry converges (no PUT)',
      h.calls.length === before && ok2 === false, `calls +${h.calls.length - before}, ok=${ok2}`);
    check('and it is no longer dirty', h.w.FRASync.isDirty() === false, h.w.FRASync.isDirty());
    h.w.FRASync.reset();
  }

  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All sync tests passed.');
  // Explicit on the success path too: booting the real engine arms a real 5s FRASync
  // schedulePush() timer (Task 5's save() change) that Node's natural exit would otherwise
  // wait out.
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
