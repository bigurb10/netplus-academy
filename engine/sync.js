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

  let opts = null;
  // `sub` records WHICH account the local progress blob belongs to. Nothing else does:
  // signOut() deliberately keeps fra.<courseId>.state.v3, so without this a second
  // learner signing in on the same browser would have the first one's progress merged
  // into their account by the ordinary pull path.
  let book = { version: null, hash: null, sub: null, lastPullAt: 0 };
  let dirty = false;
  let timer = null;
  let inFlight = false;
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
  function stashLocal() { if (opts && opts.stash) { try { opts.stash(); } catch (e) {} } }
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
    if (timer) { root.clearTimeout(timer); timer = null; }
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

  // Change detection ignores touchedAt. save() (engine/app.js) stamps touchedAt on
  // every navigation, not only on a real change, so on its own it must never justify
  // a write. touchedAt still travels in the PUT body unchanged and merge still uses
  // it; anything it protects (e.g. `path`) is itself part of the payload, so a real
  // change still changes the hash and touchedAt rides along.
  function hashOf(body) {
    return hash(stableStringify(Object.assign({}, body, {
      touchedAt: 0,
      feedback: canonicalFeedback(body.feedback)
    })));
  }

  // `active` is an in-progress exam; it is deliberately not synced, matching exportable().
  function payload() {
    const s = JSON.parse(JSON.stringify(opts.getState()));
    s.active = null;
    return s;
  }

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
    if (tag) return String(tag).replace(/^W\//, '').replace(/"/g, '');
    if (body && body.version != null) return String(body.version);
    return null;
  }

  function get(tok) {
    return root.fetch(url(), { method: 'GET', headers: headers(tok) });
  }

  function pull() {
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
            if (blank) opts.adopt(blank);
            cancelPush();
            status('idle');
            return true;
          }
          // book.hash must be cleared too, not just book.version: otherwise a later
          // pushNow() of the SAME local state sees hashOf(payload) === book.hash (the
          // last-pushed hash, still sitting there from before the row was deleted),
          // skips the write entirely, and clears dirty -- so a deleted server row can
          // never be recreated by a client whose local state has not itself changed.
          book.version = null; book.hash = null; book.sub = sub; book.lastPullAt = Date.now(); saveBook();
          status('idle');
          return false;
        }
        if (r.status === 401) {
          // reset() as well as signOut(): a book left behind here still carries the dead
          // session's version, which the next account to sign in would inherit and write
          // blind If-Match requests against. onSignedOut() repaints the topbar, which
          // otherwise keeps offering an account that is no longer signed in.
          root.FRAAuth.signOut(); reset(); status('error'); signedOut(); return false;
        }
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
            opts.adopt(body.state);
            cancelPush();
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
          status('idle');
          return before !== after;
        });
      });
    }).catch(function () { status('offline'); return false; });
  }

  function maybePull() {
    if (Date.now() - (book.lastPullAt || 0) < PULL_MIN_INTERVAL_MS) return Promise.resolve(false);
    return pull();
  }

  function attemptPut(tok, body, attempt, gen) {
    const pre = book.version == null
      ? { 'If-None-Match': '*' }
      : { 'If-Match': '"' + book.version + '"' };
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
          book.version = readVersion(r, j);
          book.hash = hashOf(body);
          book.sub = currentSub();
          saveBook();
          dirty = false;
          status('idle');
          return true;
        });
      }
      if (r.status === 401) { root.FRAAuth.signOut(); status('error'); return false; }
      if (r.status === 413) {
        // Permanent. The blob is over the server's ceiling and retrying cannot help.
        status('error');
        return false;
      }
      if (r.status === 412) {
        if (attempt >= MAX_ATTEMPTS) { status('error'); return false; }
        return get(tok).then(function (r2) {
          if (gen !== generation) return false;
          if (r2.status === 404) {           // deleted between our write and our re-read
            book.version = null; saveBook();
            return attemptPut(tok, payload(), attempt + 1, gen);
          }
          if (!r2.ok) { status('error'); return false; }
          return r2.json().then(function (b2) {
            if (gen !== generation) return false;
            opts.adopt(root.FRAMerge.mergeState(opts.getState(), b2.state, mergeOpts()));
            book.version = readVersion(r2, b2);
            saveBook();
            return attemptPut(tok, payload(), attempt + 1, gen);
          });
        });
      }
      status('error');                        // 5xx and anything else: try later
      return false;
    });
  }

  function pushNow() {
    if (!opts || inFlight) return Promise.resolve(false);
    // Set synchronously, before the first await: token() resolves via a microtask, and
    // two pushNow() calls made back to back (no await between them) both run this
    // synchronous prelude before either's .then callback fires. Setting inFlight here
    // -- not inside the .then -- is what makes the second call's entry check above see
    // it and bail out, rather than both racing through to a PUT.
    inFlight = true;
    const gen = generation;
    return token().then(function (tok) {
      // reset() may have fired while token() was pending; don't touch book/dirty for a
      // generation that no longer exists.
      if (gen !== generation) return false;
      if (!tok) return false;
      const body = payload();
      const h = hashOf(body);
      // Every PUT burns a version. A state that has not actually changed (aside from
      // touchedAt, which save() stamps on every navigation) must not be re-pushed
      // just because something upstream set dirty -- dirty means "a write may be
      // owed"; hash equality proves it is not.
      if (h === book.hash) { dirty = false; return false; }
      // From here local differs from the server. Stay dirty until a write is
      // actually accepted, so a failure at any point below is retried by a later
      // trigger rather than being silently forgotten.
      dirty = true;
      status('syncing');
      return attemptPut(tok, body, 1, gen);
    }).catch(function () { status('offline'); return false; })
      .then(function (ok) { inFlight = false; return ok; });
  }

  function schedulePush() {
    dirty = true;
    if (timer) root.clearTimeout(timer);
    timer = root.setTimeout(function () { timer = null; pushNow(); }, PUSH_DEBOUNCE_MS);
  }

  function reset() {
    generation++;   // fence off any pushNow() already in flight; see its comments above
    book = { version: null, hash: null, sub: null, lastPullAt: 0 };
    dirty = false;
    if (timer) { root.clearTimeout(timer); timer = null; }
    try { root.localStorage.removeItem(bookKey()); } catch (e) { /* ignore */ }
  }

  root.FRASync = {
    init: function (o) { opts = o; loadBook(); },
    pull: pull,
    maybePull: maybePull,
    pushNow: pushNow,
    schedulePush: schedulePush,
    isDirty: function () { return dirty; },
    reset: reset
  };
})(typeof window !== 'undefined' ? window : globalThis);
