'use strict';
// Pull / merge / push of one course's progress blob against the progress API.
// Loaded as a plain script beside auth.js and merge.js; sets window.FRASync.
//
// This file knows the API's routes and nothing about tokens (it asks FRAAuth) and
// nothing about merge rules (it calls FRAMerge). It never throws into a caller and
// never blocks the UI: every failure is swallowed, the dirty flag persists, and the
// next trigger retries.
(function (root) {
  const MAX_ATTEMPTS = 3;
  const PUSH_DEBOUNCE_MS = 5000;
  const PULL_MIN_INTERVAL_MS = 60000;
  // After a push that conflicts (412 exhausted) or hits a transient failure, the next
  // attempt backs off exponentially with full jitter instead of re-firing on the fixed
  // 5s debounce. Two devices signed in to one account push in lockstep otherwise, each
  // PUT invalidating the other's version, and never converge -- a 412 storm. Jitter
  // desynchronises them so one lands a write while the other waits, and once their state
  // is equal both skip on the hash check.
  const PUSH_BACKOFF_BASE_MS = 2000;
  const PUSH_BACKOFF_MAX_MS = 60000;
  const MAX_BACKOFF_N = 6;             // 2s,4s,8s,16s,32s,60s(capped)

  let opts = null;
  // `sub` records WHICH account the local progress blob belongs to. Nothing else does:
  // signOut() deliberately keeps fra.<courseId>.state.v3, so without this a second
  // learner signing in on the same browser would have the first one's progress merged
  // into their account by the ordinary pull path.
  let book = { version: null, hash: null, sub: null, lastPullAt: 0 };
  let dirty = false;
  let timer = null;
  // A push is executing (from doPush entry to its finalizer). While it is, schedulePush()
  // must NOT arm a competing timer -- the running push's finalizer decides the single next
  // step. This is what stops the 412 retry's own adopt()->save()->schedulePush() from
  // re-arming a 5s push behind the retry and looping forever.
  let pushing = false;
  // Consecutive failed push rounds, driving the backoff delay. Reset on any settled push.
  let backoffN = 0;
  // How the last push ended, read by pushNow's finalizer to choose the next step:
  // 'wrote' | 'nothing' | 'conflict' | 'transient' | 'permanent' | 'blocked' | 'ended'.
  let pushOutcome = null;
  // pull and pushNow run one at a time, through a single promise chain. Interleaved,
  // a pull wrote book.hash/book.version in the middle of the 412 retry loop's own
  // bookkeeping (self-healing via a later 412, but a wasted round trip and a bug that
  // reads as unreproducible), and the debounce timer's push was swallowed outright
  // whenever a write happened to be in flight -- the old inFlight flag bailed out and
  // nothing re-armed the debounce. Queueing instead of bailing loses no trigger, and
  // makes the "already running" early return unnecessary: a push that follows one that
  // just succeeded finds hashOf(payload()) === book.hash and writes nothing.
  let chain = Promise.resolve();
  function serial(fn) { chain = chain.then(fn, fn); return chain; }
  // A pull already queued satisfies whoever asks for another one. maybePull()'s throttle
  // reads book.lastPullAt, which is written only at the very end, so without this two
  // focus events in the same tick each ran a full GET, merge, adopt and render.
  let pendingPull = null;
  // Bumped by reset(). A pushNow() call captures it at entry; every handler downstream
  // that would mutate book/dirty checks it still matches before touching anything, so a
  // write that was already in flight when reset() fired cannot write stale state back.
  let generation = 0;

  const bookKey = () => 'fra.' + opts.courseId + '.sync.v1';
  const url = () => root.FRAAuth.CONFIG.apiBase + '/v1/progress/' + encodeURIComponent(opts.courseId);

  function loadBook() {
    try {
      const raw = root.localStorage.getItem(bookKey());
      if (raw) book = Object.assign(book, JSON.parse(raw));
    } catch (e) { /* ignore */ }
  }
  function saveBook() {
    try { root.localStorage.setItem(bookKey(), JSON.stringify(book)); } catch (e) { /* ignore */ }
  }

  function status(s) { if (opts && opts.onStatus) { try { opts.onStatus(s); } catch (e) {} } }
  // Copies the local blob aside on an identity switch, tagged with the account it belongs
  // to (book.sub is still the previous owner at every call site), so that owner gets it
  // back -- merged, per the design's "collisions merge automatically" -- when they next
  // sign in on this browser. Called before book.sub is overwritten.
  function stashLocal() { if (opts && opts.stash) { try { opts.stash(book.sub || null); } catch (e) {} } }
  // Returns and removes every stash tagged for `sub`; merged into this account's state by
  // restoreStashes(). Legacy untagged stashes are never attributed to anyone.
  function takeStashes(sub) {
    if (!opts || !opts.takeStashes || !sub) return [];
    try { return opts.takeStashes(sub) || []; } catch (e) { return []; }
  }
  // After a pull has settled which account owns the local blob, fold in any progress this
  // same account left behind on this browser when a different account took over. Merging
  // is exactly what the design prescribes for two copies of one learner's work; the push it
  // arms is what carries the restored progress to their server row.
  function restoreStashes(sub) {
    const found = takeStashes(sub);
    if (!found.length) return false;
    let s = opts.getState();
    for (let i = 0; i < found.length; i++) {
      if (found[i] && typeof found[i] === 'object') s = root.FRAMerge.mergeState(s, found[i], mergeOpts());
    }
    opts.adopt(s);
    schedulePush();
    return true;
  }
  function signedOut() { if (opts && opts.onSignedOut) { try { opts.onSignedOut(); } catch (e) {} } }

  // The account signed in right now, per the stored token. Display-level only, like
  // everything else FRAAuth.user() feeds -- the server is what actually decides whose
  // row a request touches.
  function currentSub() {
    const u = root.FRAAuth && root.FRAAuth.user ? root.FRAAuth.user() : null;
    return (u && u.sub) || null;
  }
  // No recorded sub is anonymous progress being claimed by a first account -- the
  // design's first-sign-in flow, which merges. An unrecognisable current sub (a token
  // with no `sub` claim) also merges, rather than discarding a learner's work on the
  // strength of a missing claim.
  function localBelongsTo(sub) { return !book.sub || !sub || book.sub === sub; }

  // Undo a debounce that opts.adopt()'s own save() just armed. Used on the paths where
  // this client has deliberately decided it owes the server nothing.
  function cancelPush() {
    dirty = false;
    backoffN = 0;
    if (timer) { root.clearTimeout(timer); timer = null; }
  }

  // Arm the single push timer, replacing any pending one.
  function arm(delay) {
    if (timer) root.clearTimeout(timer);
    timer = root.setTimeout(function () { timer = null; pushNow(); }, delay);
  }

  // A 401 from ANY request means the token is genuinely dead (a 5xx is the try-later
  // case). Every discovery of it ends the session the same way: drop the token, clear the
  // server-session bookkeeping -- reset() keeps the owner of the local blob -- and ask the
  // app to repaint, which otherwise keeps offering an account that is no longer signed in.
  function sessionEnded() {
    root.FRAAuth.signOut();
    reset();
    status('error');
    signedOut();
  }

  // recomputeStreak (via mergeState) requires passPct/streakNeeded as numbers or it
  // throws -- see engine/merge.js. Both live on the course manifest, already loaded
  // by the time any of these functions actually run.
  function mergeOpts() {
    const t = (root.FRA && root.FRA.course && root.FRA.course.test) || {};
    return { passPct: t.passPct, streakNeeded: t.streakNeeded };
  }

  // FNV-1a over a string. Cheap change detection; storing a second copy of a 200 KB
  // blob to compare against would double the course's storage footprint.
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h.toString(36) + ':' + str.length;
  }

  // A key-sorted serialization, not plain JSON.stringify. mergeState (engine/merge.js)
  // rebuilds its return value with its own field order and recomputes passStreak/
  // official from the exam log rather than trusting either input's copy verbatim, so
  // an order-sensitive stringify can call a semantically no-op merge "changed" purely
  // because of property order. Only used for the internal change-detection hash below
  // -- the actual PUT body is still plain JSON.stringify(payload), untouched.
  function stableStringify(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(stableStringify).join(',') + ']';
    const keys = Object.keys(v).sort();
    return '{' + keys.map(function (k) { return JSON.stringify(k) + ':' + stableStringify(v[k]); }).join(',') + '}';
  }

  // mergeState (engine/merge.js) unions `feedback` in first-occurrence order over
  // a.concat(b) and never re-sorts it afterwards -- unlike `exams`, which it does
  // re-sort -- so a no-op merge (nothing local added beyond what the server already
  // has) can still reorder `feedback` relative to the server's own copy and defeat
  // change detection with a spurious hash difference. Sorting it by its own canonical
  // serialization before hashing means order alone never counts as a change. `exams`
  // is already deterministically ordered by mergeState's own .sort(); feedback is the
  // only other array in the state shape merge leaves order-sensitive.
  function canonicalFeedback(list) {
    if (!Array.isArray(list)) return list;
    return list.slice().sort(function (x, y) {
      const sx = stableStringify(x), sy = stableStringify(y);
      return sx < sy ? -1 : sx > sy ? 1 : 0;
    });
  }

  // ONE canonical view of a state, behind both the PUT body and the change-detection
  // hash, so the two can never disagree about what a change is. `view` and `active` are
  // device-local -- the design says neither is ever synced and mergeState returns
  // neither -- yet `view` used to ride in the payload, so every navigation changed the
  // body and burned a server version. Stripping it here also makes pull()'s
  // `book.hash = hashOf(body.state)` compare like with like against a row an older
  // client wrote with `view` still in it.
  function canonical(s) {
    const c = JSON.parse(JSON.stringify(s || {}));
    delete c.view;
    c.active = null;
    return c;
  }

  // Change detection additionally ignores touchedAt. save() (engine/app.js) stamps
  // touchedAt on every navigation, not only on a real change, so on its own it must
  // never justify a write. touchedAt still travels in the PUT body unchanged and merge
  // still uses it; anything it protects (e.g. `path`) is itself part of the payload, so
  // a real change still changes the hash and touchedAt rides along.
  function hashOf(body) {
    const c = canonical(body);
    c.touchedAt = 0;
    c.feedback = canonicalFeedback(c.feedback);
    // Additive stamp fields must hash the same whether absent (a server blob written before
    // the field existed) or at their zero default (fresh() and every merge emit it). Without
    // this, adding pathAt made every pull's merge differ from the stored blob by one key and
    // burned a spurious PUT per pull until each row had been rewritten.
    if (!c.pathAt) delete c.pathAt;
    if (!c.settingsAt) delete c.settingsAt;   // same class: rows written before settingsAt existed
    return hash(stableStringify(c));
  }

  function payload() { return canonical(opts.getState()); }

  function token() {
    if (!root.FRAAuth || !root.FRAAuth.isSignedIn()) return Promise.resolve(null);
    return root.FRAAuth.accessToken();
  }

  function headers(tok, extra) {
    const h = Object.assign({ Authorization: 'Bearer ' + tok }, extra || {});
    return h;
  }

  function readVersion(resp, body) {
    const tag = resp.headers && resp.headers.get ? resp.headers.get('ETag') : null;
    const raw = tag ? String(tag).replace(/^W\//, '').replace(/"/g, '')
      : (body && body.version != null ? String(body.version) : null);
    // A version only ever becomes an If-Match precondition, which the server parses as a
    // bare integer -- a stray quote from a cache-revalidated response, an empty ETag, or a
    // value left by an older build all parse as a 400 that strands every write after the
    // first. Keep only a clean integer; null means "unknown", which routes the next write
    // to create (and a 412 there re-GETs a good ETag and retries as an update).
    return /^\d+$/.test(raw || '') ? raw : null;
  }

  function get(tok) {
    return root.fetch(url(), { method: 'GET', headers: headers(tok) });
  }

  function doPull() {
    if (!opts) return Promise.resolve(false);
    // Same fencing as pushNow(): captured before the first await, checked before any
    // book/dirty mutation or opts.adopt() call, so a reset() (e.g. sign-out) fired
    // while this pull is in flight cannot have its cleared state silently overwritten
    // by a response that resolves afterward.
    const gen = generation;
    return token().then(function (tok) {
      if (gen !== generation) return false;
      if (!tok) return false;
      status('syncing');
      return get(tok).then(function (r) {
        if (gen !== generation) return false;
        const sub = currentSub();
        if (r.status === 404) {                 // normal: this learner has stored nothing yet
          if (!localBelongsTo(sub)) {
            // A DIFFERENT account on a browser that still holds the previous learner's
            // progress, with nothing stored for the new one. Merging here would hand one
            // learner's history to another, so the old blob is copied aside untouched and
            // this account starts from a fresh state. Nothing is uploaded until the new
            // learner actually studies and save() arms a push of their own work.
            stashLocal();
            const blank = opts.fresh ? opts.fresh() : null;
            book = { version: null, hash: null, sub: sub, lastPullAt: Date.now() };
            saveBook();
            // `false`: the previous learner's open exam and current view must not follow
            // their progress into someone else's account.
            if (blank) opts.adopt(blank, false);
            cancelPush();
            // This account may itself have been stashed here earlier; fold it back in.
            restoreStashes(sub);
            status('idle');
            return true;
          }
          // book.hash must be cleared too, not just book.version: otherwise a later
          // pushNow() of the SAME local state sees hashOf(payload) === book.hash (the
          // last-pushed hash, still sitting there from before the row was deleted),
          // skips the write entirely, and clears dirty -- so a deleted server row can
          // never be recreated by a client whose local state has not itself changed.
          book.version = null; book.hash = null; book.sub = sub; book.lastPullAt = Date.now(); saveBook();
          // The design's first-sign-in flow ends in "PUT the result", and this 404 IS
          // that flow's first half. Setting dirty alone left the create waiting for an
          // unrelated trigger. schedulePush() rather than pushNow(): it re-uses the same
          // 5s debounce every save() arms, so a sign-in landing in the middle of a burst
          // of saves still costs one write, and it cannot deadlock -- a pushNow() awaited
          // from inside this pull would be queued behind the pull on the serial chain.
          schedulePush();
          restoreStashes(sub);
          status('idle');
          return false;
        }
        if (r.status === 401) { sessionEnded(); return false; }
        if (!r.ok) { status('error'); return false; }   // 5xx: try again later
        return r.json().then(function (body) {
          if (gen !== generation) return false;
          if (!localBelongsTo(sub)) {
            // As above, but this account does have stored progress: adopt it wholesale
            // instead of merging the previous learner's blob into it. Their work is
            // stashed, not destroyed, and this pull owes the server nothing.
            stashLocal();
            book = { version: readVersion(r, body), hash: hashOf(body.state), sub: sub, lastPullAt: Date.now() };
            saveBook();
            opts.adopt(body.state, false);   // as above: no device-local carry-over
            cancelPush();
            restoreStashes(sub);
            status('idle');
            return true;
          }
          const merged = root.FRAMerge.mergeState(opts.getState(), body.state, mergeOpts());
          const before = JSON.stringify(payload());
          // Prime the change-detector on what the server actually has, BEFORE
          // adopting the merge: a merge that adds nothing local then compares equal
          // afterwards, so the schedulePush() that a later adopt -> save() triggers
          // becomes a no-op instead of burning a version on a state the server
          // already has.
          book.hash = hashOf(body.state);
          opts.adopt(merged);
          const afterObj = payload();
          const after = JSON.stringify(afterObj);
          book.version = readVersion(r, body);
          book.sub = sub;
          book.lastPullAt = Date.now();
          saveBook();
          // If the merge produced something the server does not have, we owe it a push.
          if (hashOf(afterObj) !== book.hash) dirty = true;
          const restored = restoreStashes(sub);
          status('idle');
          return before !== after || restored;
        });
      });
    }).catch(function () { status('offline'); return false; });
  }

  function maybePull() {
    if (Date.now() - (book.lastPullAt || 0) < PULL_MIN_INTERVAL_MS) return Promise.resolve(false);
    return pull();
  }

  function attemptPut(tok, body, attempt, gen) {
    // Guard the stored version too, not just readVersion's output: a malformed value
    // persisted by an older build is read straight from localStorage by loadBook(). A
    // non-integer version is treated as "unknown" -> create; if the row exists the server
    // answers 412 and the retry path below re-GETs a clean ETag and writes as an update.
    const v = /^\d+$/.test(String(book.version)) ? String(book.version) : null;
    const pre = v == null
      ? { 'If-None-Match': '*' }
      : { 'If-Match': '"' + v + '"' };
    return root.fetch(url(), {
      method: 'PUT',
      // strict_content_type is on server-side; without this header every write 422s.
      headers: headers(tok, Object.assign({ 'Content-Type': 'application/json' }, pre)),
      body: JSON.stringify({ state: body })
    }).then(function (r) {
      // reset() may have fired while this write was in flight. A stale response must
      // never write book/dirty back over state a later init/reset already replaced.
      if (gen !== generation) return false;
      if (r.ok) {
        return r.json().then(function (j) {
          if (gen !== generation) return false;
          pushOutcome = 'wrote';
          book.version = readVersion(r, j);
          book.hash = hashOf(body);
          // Only ever claim ownership for an account allowed to write this blob. Relabel
          // it unconditionally and a write that slipped past the guard above would also
          // erase the evidence, so no later pull would ever stash.
          if (localBelongsTo(currentSub())) book.sub = currentSub();
          saveBook();
          dirty = false;
          status('idle');
          return true;
        });
      }
      if (r.status === 401) { pushOutcome = 'ended'; sessionEnded(); return false; }
      if (r.status === 413) {
        // Permanent. The blob is over the server's ceiling and retrying cannot help.
        pushOutcome = 'permanent';
        status('error');
        return false;
      }
      if (r.status === 412) {
        if (attempt >= MAX_ATTEMPTS) { pushOutcome = 'conflict'; status('error'); return false; }
        return get(tok).then(function (r2) {
          if (gen !== generation) { pushOutcome = 'ended'; return false; }
          if (r2.status === 404) {           // deleted between our write and our re-read
            book.version = null; book.hash = null; saveBook();
            return attemptPut(tok, payload(), attempt + 1, gen);
          }
          if (!r2.ok) { pushOutcome = 'transient'; status('error'); return false; }
          return r2.json().then(function (b2) {
            if (gen !== generation) { pushOutcome = 'ended'; return false; }
            // Prime the change-detector on the server's state BEFORE adopting the merge,
            // exactly as doPull does. Without this book.hash stays stale after a conflict
            // recovery, so the next push (after backoff) never sees hashOf(payload) ===
            // book.hash and re-PUTs even when the merge already made local == server --
            // the difference between converging and churning one version per recovery.
            book.hash = hashOf(b2.state);
            opts.adopt(root.FRAMerge.mergeState(opts.getState(), b2.state, mergeOpts()));
            book.version = readVersion(r2, b2);
            saveBook();
            return attemptPut(tok, payload(), attempt + 1, gen);
          });
        });
      }
      pushOutcome = 'transient';               // 5xx and anything else: try later
      status('error');
      return false;
    });
  }

  function doPush() {
    if (!opts) return Promise.resolve(false);
    const gen = generation;
    return token().then(function (tok) {
      // reset() may have fired while token() was pending; don't touch book/dirty for a
      // generation that no longer exists.
      if (gen !== generation) { pushOutcome = 'ended'; return false; }
      if (!tok) { pushOutcome = 'blocked'; return false; }
      // The owner rule is a WRITE rule before it is a read rule. A pull that never got to
      // run -- offline, or a 5xx -- leaves a book still naming the previous learner while
      // a different account is signed in; pushing then uploads their blob, and worse, the
      // 412 retry loop re-GETs the new account's row and merges the old learner's progress
      // into it. Refusing to write until a pull has resolved the identity is what stops
      // that: the pull stashes and adopts, and this account's own work is pushed after.
      if (!localBelongsTo(currentSub())) { pushOutcome = 'blocked'; return false; }
      const body = payload();
      const h = hashOf(body);
      // Every PUT burns a version. A state that has not actually changed (aside from
      // touchedAt, which save() stamps on every navigation) must not be re-pushed
      // just because something upstream set dirty -- dirty means "a write may be
      // owed"; hash equality proves it is not.
      if (h === book.hash) { dirty = false; pushOutcome = 'nothing'; return false; }
      // From here local differs from the server. Stay dirty until a write is
      // actually accepted, so a failure at any point below is retried by a later
      // trigger rather than being silently forgotten.
      dirty = true;
      status('syncing');
      return attemptPut(tok, body, 1, gen);
    }).catch(function () { pushOutcome = 'transient'; status('offline'); return false; });
  }

  // The two public entry points. Everything above runs inside the serial chain.
  function pull() {
    if (!opts) return Promise.resolve(false);
    if (pendingPull) return pendingPull;
    pendingPull = serial(doPull).then(function (v) { pendingPull = null; return v; },
      function () { pendingPull = null; return false; });
    return pendingPull;
  }

  function pushNow() {
    if (!opts) return Promise.resolve(false);
    return serial(function () {
      pushOutcome = null;
      pushing = true;                          // suppress schedulePush's timer during the push
      return Promise.resolve().then(doPush).then(finishPush, function () {
        pushing = false; return false;
      });
    });
  }

  // Runs once per push, after doPush settles, to choose the SINGLE next step -- this is
  // the only place a follow-up push is scheduled, so the 412 retry's own adopt()->save()
  // can no longer re-arm a competing 5s loop.
  function finishPush(ok) {
    pushing = false;
    if (pushOutcome === 'wrote') {
      backoffN = 0;
      // A genuine change that landed mid-push (save() set dirty while pushing) still owes
      // a write; hash equality proves whether it does. Not a conflict, so normal debounce.
      // Guarded: this must honor the module's never-throw-into-a-caller contract even if
      // opts.getState() misbehaves.
      let owed = false;
      try { owed = !!opts && hashOf(payload()) !== book.hash; } catch (e) { owed = false; }
      if (owed) arm(PUSH_DEBOUNCE_MS);
    } else if (pushOutcome === 'conflict' || pushOutcome === 'transient') {
      // Back off with full jitter so lockstep writers spread out and converge.
      backoffN = Math.min(backoffN + 1, MAX_BACKOFF_N);
      const ceil = Math.min(PUSH_BACKOFF_BASE_MS * Math.pow(2, backoffN - 1), PUSH_BACKOFF_MAX_MS);
      arm(Math.floor(Math.random() * ceil) + 1);
    } else {
      // 'nothing' (settled), 'blocked' (signed out / not the owner -- a pull resolves it),
      // 'permanent' (413), 'ended' (session gone). None benefit from an auto-retry; wait
      // for a real trigger (a save, a focus pull) rather than spinning.
      backoffN = 0;
    }
    return ok;
  }

  function schedulePush() {
    dirty = true;
    // A push is running: it will schedule what comes next from its own outcome. Arming a
    // timer here is exactly the accidental re-arm that produced the 412 storm.
    if (pushing) return;
    arm(PUSH_DEBOUNCE_MS);
  }

  // Ends the server session. The book holds two different kinds of state: version, hash
  // and lastPullAt describe a session that has now ended and go; `sub` records WHOSE
  // progress the local blob is, and a blob does not change hands because its owner signed
  // out -- so the owner survives, and the key is kept to carry it. That is what lets a
  // second learner signing in afterwards be recognised as a different account instead of
  // silently inheriting the first one's work.
  function reset() {
    generation++;   // fence off any pull/push already in flight; see their comments above
    const owner = book.sub || null;
    book = { version: null, hash: null, sub: owner, lastPullAt: 0 };
    dirty = false;
    backoffN = 0;
    pushing = false;
    if (timer) { root.clearTimeout(timer); timer = null; }
    // A fetch that never settles would otherwise wedge the chain for the life of the
    // page, exactly as the old inFlight flag could. Whatever is still in flight is
    // already fenced by the generation bump above, so a fresh chain cannot let it write
    // stale state back.
    chain = Promise.resolve();
    pendingPull = null;
    if (owner) saveBook();
    else try { root.localStorage.removeItem(bookKey()); } catch (e) { /* ignore */ }
  }

  // The local blob was replaced wholesale from outside -- an export code the learner
  // pasted into the import box. Whose progress that is cannot be known, so the owner
  // record goes and the next pull treats it as unowned progress being claimed by whoever
  // is signed in, which is exactly what importing a code asks for.
  function forgetOwner() {
    if (!opts) return;
    book.sub = null;
    saveBook();
  }

  root.FRASync = {
    init: function (o) { opts = o; loadBook(); },
    pull: pull,
    maybePull: maybePull,
    pushNow: pushNow,
    schedulePush: schedulePush,
    forgetOwner: forgetOwner,
    isDirty: function () { return dirty; },
    reset: reset
  };
})(typeof window !== 'undefined' ? window : globalThis);
