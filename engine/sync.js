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
  let book = { version: null, hash: null, lastPullAt: 0 };
  let dirty = false;
  let timer = null;
  let inFlight = false;

  const bookKey = () => 'fra.' + opts.courseId + '.sync.v1';
  const url = () => FRAAuth.CONFIG.apiBase + '/v1/progress/' + encodeURIComponent(opts.courseId);

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

  // Change detection ignores touchedAt. save() (engine/app.js) stamps touchedAt on
  // every navigation, not only on a real change, so on its own it must never justify
  // a write. touchedAt still travels in the PUT body unchanged and merge still uses
  // it; anything it protects (e.g. `path`) is itself part of the payload, so a real
  // change still changes the hash and touchedAt rides along.
  function hashOf(body) {
    return hash(stableStringify(Object.assign({}, body, { touchedAt: 0 })));
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
    return token().then(function (tok) {
      if (!tok) return false;
      status('syncing');
      return get(tok).then(function (r) {
        if (r.status === 404) {                 // normal: this learner has stored nothing yet
          book.version = null; book.lastPullAt = Date.now(); saveBook();
          dirty = true;                         // we have something worth uploading
          status('idle');
          return false;
        }
        if (r.status === 401) { root.FRAAuth.signOut(); status('error'); return false; }
        if (!r.ok) { status('error'); return false; }   // 5xx: try again later
        return r.json().then(function (body) {
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

  function attemptPut(tok, body, attempt) {
    const pre = book.version == null
      ? { 'If-None-Match': '*' }
      : { 'If-Match': '"' + book.version + '"' };
    return root.fetch(url(), {
      method: 'PUT',
      // strict_content_type is on server-side; without this header every write 422s.
      headers: headers(tok, Object.assign({ 'Content-Type': 'application/json' }, pre)),
      body: JSON.stringify({ state: body })
    }).then(function (r) {
      if (r.ok) {
        return r.json().then(function (j) {
          book.version = readVersion(r, j);
          book.hash = hashOf(body);
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
          if (r2.status === 404) {           // deleted between our write and our re-read
            book.version = null; saveBook();
            return attemptPut(tok, payload(), attempt + 1);
          }
          if (!r2.ok) { status('error'); return false; }
          return r2.json().then(function (b2) {
            opts.adopt(root.FRAMerge.mergeState(opts.getState(), b2.state, mergeOpts()));
            book.version = readVersion(r2, b2);
            saveBook();
            return attemptPut(tok, payload(), attempt + 1);
          });
        });
      }
      status('error');                        // 5xx and anything else: try later
      return false;
    });
  }

  function pushNow() {
    if (!opts || inFlight) return Promise.resolve(false);
    return token().then(function (tok) {
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
      inFlight = true;
      status('syncing');
      return attemptPut(tok, body, 1);
    }).catch(function () { status('offline'); return false; })
      .then(function (ok) { inFlight = false; return ok; });
  }

  function schedulePush() {
    dirty = true;
    if (timer) root.clearTimeout(timer);
    timer = root.setTimeout(function () { timer = null; pushNow(); }, PUSH_DEBOUNCE_MS);
  }

  function reset() {
    book = { version: null, hash: null, lastPullAt: 0 };
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
