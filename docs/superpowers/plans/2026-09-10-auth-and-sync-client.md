# Browser Auth and Progress Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a learner sign in, and have their course progress follow them between devices -- pulling, merging and pushing against the progress API without ever blocking or changing anonymous study.

**Architecture:** Two new engine files loaded as plain scripts beside `merge.js`. `engine/auth.js` owns OAuth 2.1 authorization-code + PKCE against WorkOS AuthKit and token storage; `engine/sync.js` owns pull/merge/push against `https://api.fieldreadyacademy.com` and knows nothing about JWTs. A new static `/callback` page completes the exchange for all five courses, which share one origin. `localStorage` stays the primary synchronous store, so nothing in the UI ever waits on the network.

**Tech Stack:** Vanilla ES5-compatible browser JavaScript (no build step, no framework, no dependencies), `crypto.subtle` for PKCE, `fetch`, jsdom + plain `node tests/*.js` assertions.

## Global Constraints

- **Adding a file under `engine/` touches SEVEN loaders, not two.** Verified 2026-09-10: `build.py`, `tests/lib.js`, and all five of `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`. On the merge-engine branch the five shells were missed and every unbundled page threw `ReferenceError` and rendered blank, while `npm test` and the deployed bundles both stayed green -- so the usual checks will NOT catch this. Both `engine/auth.js` and `engine/sync.js` must be registered in all seven, and load **before** `engine/app.js`.
- Anonymous study must behave exactly as it does today. Signing in is offered as "save your progress"; nothing is gated, `freeCourse` and `window.FRA_ENTITLED` are untouched.
- **Collisions merge automatically, always.** Never prompt, never discard. First sign-in runs the same code path as every routine sync.
- Merge runs on the client, in `engine/merge.js`. Do not add merge logic to `sync.js` and do not send merge rules to the server.
- Namespace is `FRA`. New globals are `window.FRAAuth` and `window.FRASync`, following the `window.FRAMerge` pattern in `engine/merge.js`.
- State version stays `v: 3`. `settingsAt` is additive and a missing value reads as `0`, so `load()`'s `s.v === 3` check needs no migration.
- ASCII only in source.
- Every network failure is swallowed. A dirty flag persists and the next trigger retries, mirroring how `saveFeedback()` already degrades.
- The API is `https://api.fieldreadyacademy.com`. Its full contract, and the eleven things this client must not assume, are in `.superpowers/sdd/progress.md` under "CARRY FORWARD into plan 3". Read that section before Task 4.
- Design doc: `docs/superpowers/specs/2026-09-09-course-progress-sync-design.md`.

### The real test harness -- the plan's test code uses a shorthand you must translate

The test snippets below are written for clarity, not copy-paste. **`tests/lib.js` actually exports
`{ boot, courseFiles, courseDirs, ROOT }`, and `boot` takes an OPTIONS OBJECT, not a course id.**
Task 1's implementer hit this; do not rediscover it. The real shape, from `tests/engine.js`:

```js
const path = require('path');
const { boot, ROOT } = require('./lib');
const dir = path.join(ROOT, 'courses', 'netplus');
const w = boot({ courseDir: dir });          // NOT boot('netplus')

// The repo's assertion style: print every check, collect failures, exit non-zero at the end.
const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

// Driving a UI action, also from tests/engine.js:
const act = (w, a, arg) => { const b = w.document.createElement('button'); b.dataset.act = a; if (arg != null) b.dataset.arg = arg; w.$('#app').appendChild(b); w.click(b); };
```

Also: `FRAMerge.mergeState` takes a third `opts` argument and throws without it -- see how
`tests/merge.js` calls it before writing new merge tests.

Translate the snippets in this plan into that style, preserving every value, name and assertion
they specify. Where a snippet uses `assert.strictEqual(x, y)`, use `check('name', x === y, x)`.
End each new suite with the repo's exit convention: `process.exit(fails.length ? 1 : 0)`.

### Non-negotiable API facts (each of these silently breaks the feature)

1. **Always set `Content-Type: application/json` explicitly.** FastAPI runs with `strict_content_type=True`; a bare `fetch(url, {method:'PUT', body: JSON.stringify(s)})` sends `text/plain` and is rejected 422 every time.
2. **A 412 response carries no `ETag`.** Every conflict costs a full GET -> merge -> PUT.
3. **A 412 can be followed by a 404 on the re-GET** if the row was deleted in between, so the retry loop must be able to switch from `If-Match: "<n>"` to `If-None-Match: *` mid-loop.
4. **404 on first pull, and `[]` from the list route, are the normal path, not errors.**
5. **PUT returns `{"version": N}` only** -- it does not echo the state back. `GET` is the only source of truth for stored state.
6. **Pass `resource=https://api.fieldreadyacademy.com`** on the authorization request. The MCP resource indicator is the tenant default, so a token minted without `resource` carries the MCP audience and this API will correctly 401 it.
7. **401 means the token is bad. 5xx means try later.** A JWKS or database outage returns 503, not 401. Never sign the learner out on a 5xx.
8. **CORS failures are invisible server-side for GETs** -- the request lands and returns 200, and the browser simply withholds the body from JavaScript. If sync appears to do nothing, check the browser console before the server log.
9. **The blob ceiling is 2,000,000 bytes**, measured on the server's own re-serialization. Over that is 413, and 413 is permanent -- retrying will never help.

---

## Task 0: Prerequisites and current state

- [x] The progress API is live at `https://api.fieldreadyacademy.com` with a production certificate. `/healthz` returns `{"ok":true}`; every `/v1/` route returns 401 without a token.
- [x] WorkOS **Staging** is fully configured: both resource indicators (`https://mcp.fieldreadyacademy.com/mcp` is Default, `https://api.fieldreadyacademy.com` is the one this client must request), redirect URIs `https://fieldreadyacademy.com/callback` and `http://localhost:8000/callback`, web origins `https://fieldreadyacademy.com` and `http://localhost:8000`, and External Sign-in URI deliberately empty.
- [x] The box reaches the issuer's OIDC metadata and its JWKS returns 200.
- [ ] **Not yet true, and Task 3 exists to make it true: no real AuthKit token has ever been validated by the API.** Everything downstream assumes it works. Prove it before building on it.

Values this plan uses, verified 2026-09-10:

| | |
|---|---|
| Issuer | `https://prepared-song-48-staging.authkit.app` |
| Client ID | `client_01M23KW7MPKGQ3FGVAW836VKBQ` |
| API base | `https://api.fieldreadyacademy.com` |
| Audience / `resource` | `https://api.fieldreadyacademy.com` |
| Redirect URI | `https://fieldreadyacademy.com/callback` |

Production has a different issuer and client id and is deliberately unconfigured; the cutover is out of scope for this plan.

---

## File Structure

| File | Responsibility |
|---|---|
| `engine/auth.js` | **New.** PKCE, the authorize URL, the code exchange, refresh, token storage under `fra.auth.v1`, sign-out. Knows nothing about course state or the progress API's routes. |
| `engine/sync.js` | **New.** Pull, merge, push, the bounded 412 retry, the dirty flag, and the trigger scheduling. Knows nothing about JWTs -- it asks `FRAAuth` for a bearer token. |
| `callback/index.html` | **New.** The shared static callback page. Completes the exchange and returns the learner where they were. |
| `engine/merge.js` | **Modified.** `settings` merges on `settingsAt` instead of `touchedAt`. |
| `engine/app.js` | **Modified.** Stamps `settingsAt`, exposes the sync hooks, and renders the sign-in affordance. |
| `build.py` | **Modified.** Registers the two new engine files, and emits `dist/callback.html`. |
| `tests/lib.js` | **Modified.** Registers the two new engine files for the jsdom boot. |
| `<id>/index.html` x5 | **Modified.** Registers the two new engine files before `app.js`. |
| `tests/auth.js` | **New.** PKCE correctness, token storage, expiry, the state check. |
| `tests/sync.js` | **New.** Pull/push flows, the 412 retry, the 404-mid-loop case, failure swallowing. |

The auth/sync split is the important one: `auth.js` is the only file that knows what a token is, `sync.js` is the only one that knows the API's routes, and neither imports the other -- `sync.js` receives a token-getter.

---

## Task 1: Fix the `settingsAt` signal

This task is independent of auth and sync and fixes a live bug. Do it first.

**Files:**
- Modify: `engine/app.js` (the `fresh()` initialiser, `save()`, and the three settings write-sites), `engine/merge.js` (the `settings` line)
- Test: `tests/merge.js`

**Interfaces:**
- Produces: a top-level state field `settingsAt: number`, and `markSettingsChanged()` in `engine/app.js`.

### The bug

`engine/app.js:120` is `function save() { S.touchedAt = Date.now(); ... }`, and `go()` calls `save()` on every navigation. So `touchedAt` records **"last opened"**. But `engine/merge.js:125` picks the winning side with `const newer = (b.touchedAt || 0) > (a.touchedAt || 0) ? b : a;` and line 147 then takes `settings: newer.settings || ...` -- reading it as **"last changed"**.

Consequence: opening a course on a second device, changing nothing, wipes `timer:false` and any saved custom test setup from the first device.

`path` was already null-guarded on the merge-engine branch. `settings` was not. **Do not add another null guard** -- the fix is a real "last changed" signal.

### The fix

A dedicated `settingsAt`, stamped **only** where settings genuinely change. The name is deliberately field-specific rather than a generic `changedAt`, so it cannot drift into meaning "last changed something, somewhere" and recreate this exact ambiguity.

There are exactly three real settings write-sites in `engine/app.js`, confirmed 2026-09-10:

| Line | What changes |
|---|---|
| ~227 | `S.settings.testSetup = s;` -- custom test setup saved |
| ~1109 | `S.settings.testSetup = null;` -- setup reset |
| ~1146 | `S.settings.timer = el.checked;` -- timer toggle |

Two further writes at ~1249 and ~1250 are inside `runSelfTest` and are harness-only. **Do not stamp those** -- doing so would make the self-test mutate a field that is meant to record user intent. Leave them exactly as they are.

- [ ] **Step 1: Write the failing test**

Add to `tests/merge.js`:

```js
// A second device that is merely OPENED must not clobber settings changed on the first.
// touchedAt is stamped by save(), which go() calls on every navigation, so it means
// "last opened". Only settingsAt means "last changed".
(function settingsFollowSettingsAtNotTouchedAt() {
  const a = base();                      // device A: the learner turned the timer off
  a.settings = { timer: false, testSetup: { n: 20, minutes: 15, weights: {} } };
  a.settingsAt = 1000;
  a.touchedAt = 1000;

  const b = base();                      // device B: opened later, settings never touched
  b.settings = { timer: true };
  b.settingsAt = 0;
  b.touchedAt = 9999;

  const m = FRAMerge.mergeState(a, b);
  assert(m.settings.timer === false, 'timer:false survived a later mere-open on another device');
  assert(m.settings.testSetup && m.settings.testSetup.n === 20, 'saved test setup survived');
  assert(m.settingsAt === 1000, 'settingsAt carries the real change time');

  // and commutative
  const m2 = FRAMerge.mergeState(b, a);
  assert(m2.settings.timer === false, 'commutative: timer:false survived either order');
})();

// A genuine later change on the other device DOES win.
(function laterRealSettingsChangeWins() {
  const a = base();
  a.settings = { timer: false };
  a.settingsAt = 1000;
  a.touchedAt = 9999;                    // A was opened most recently...

  const b = base();
  b.settings = { timer: true };
  b.settingsAt = 5000;                   // ...but B is where the setting was actually changed
  b.touchedAt = 1000;

  const m = FRAMerge.mergeState(a, b);
  assert(m.settings.timer === true, 'the genuinely later settings change won');
  assert(m.settingsAt === 5000, 'settingsAt took the later stamp');
})();
```

`base()` is the existing fixture helper in `tests/merge.js`. If its returned object does not already carry `settingsAt`, add `settingsAt: 0` to it.

- [ ] **Step 2: Run it to make sure it fails**

Run: `node tests/merge.js`
Expected: FAIL on `timer:false survived a later mere-open on another device` -- today `newer` is chosen by `touchedAt`, so device B (9999) wins and `timer` comes back `true`.

- [ ] **Step 3: Change the merge rule**

In `engine/merge.js`, the `settings` field must stop riding on `newer`. Replace the `settings:` line in the returned object (currently `settings: newer.settings || a.settings || b.settings || {},`) with a dedicated pick, and add `settingsAt` to the output:

```js
    // settings rides on settingsAt, NOT touchedAt. touchedAt is stamped by save() on
    // every navigation, so it means "last opened"; using it here let a second device
    // that was merely opened wipe a timer or test-setup choice made on the first.
    settings: pickSettings(a, b),
    settingsAt: max(a.settingsAt, b.settingsAt),
```

and define, beside the other helpers in that file:

```js
  // Later real change wins. On an exact tie prefer whichever side actually has
  // settings, then `a`, so the result does not depend on argument order.
  function pickSettings(a, b) {
    const at = a.settingsAt || 0, bt = b.settingsAt || 0;
    if (bt > at) return b.settings || a.settings || {};
    if (at > bt) return a.settings || b.settings || {};
    return a.settings || b.settings || {};
  }
```

- [ ] **Step 4: Run the tests**

Run: `node tests/merge.js`
Expected: PASS, and every pre-existing merge check still passes.

- [ ] **Step 5: Stamp it in the engine**

In `engine/app.js`:

Add `settingsAt: 0` to the object returned by `fresh()` (the same object literal that ends `..., touchedAt: 0, created: Date.now() }`).

Add this helper immediately after `save()`:

```js
  // Stamp "settings were genuinely changed", as distinct from touchedAt, which save()
  // sets on every call and therefore means "last opened". merge.js merges settings on
  // this. Call it ONLY from real user-driven settings changes.
  function markSettingsChanged() { S.settingsAt = Date.now(); }
```

Then at each of the three real write-sites, call it before `save()`:

```js
// custom test setup saved (~line 227)
const s = { n: clampN(nEl.value), minutes: clampMin(mEl.value), weights }; S.settings.testSetup = s; markSettingsChanged(); save(); return currentSetup();

// setup reset (~line 1109)
case 'setup-reset': { S.settings.testSetup = null; markSettingsChanged(); save(); render(); return; }

// timer toggle (~line 1146)
app.addEventListener('change', e => { const el = e.target.closest('[data-act="toggle-timer"]'); if (el) { S.settings.timer = el.checked; markSettingsChanged(); save(); } });
```

Leave the two `S.settings.timer` writes inside `runSelfTest` (~1249, ~1250) unchanged.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: all suites pass, including the self-test for every pack.

- [ ] **Step 7: Commit**

```bash
git add engine/app.js engine/merge.js tests/merge.js
git commit -m "fix(engine): merge settings on a real changed-at signal

touchedAt is stamped by save(), which go() calls on every navigation, so it
records 'last opened'. Merging settings on it let a second device that was
merely opened wipe timer:false and any saved test setup from the first.
settingsAt is stamped only at the three genuine settings write-sites."
```

---

## Task 2: `engine/auth.js` -- PKCE and token storage

**Files:**
- Create: `engine/auth.js`
- Test: `tests/auth.js`
- Modify: `package.json` (add `node tests/auth.js` to the `test` script)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces `window.FRAAuth`:
  - `CONFIG` -- `{issuer, clientId, apiBase, resource, redirectPath, scope}`, overridable by setting `window.FRA_AUTH_CONFIG` before the script loads.
  - `isSignedIn() -> boolean` -- a stored token exists and its refresh path is usable.
  - `user() -> {sub, email} | null`
  - `beginSignIn(returnTo: string) -> Promise<void>` -- builds the PKCE challenge, stores the transient, sets `location.href`.
  - `authorizeUrl(verifier: string, state: string) -> Promise<string>` -- exported for tests.
  - `completeSignIn(search: string) -> Promise<{returnTo: string}>` -- called by the callback page with `location.search`.
  - `accessToken() -> Promise<string|null>` -- refreshes when within 60s of expiry; returns `null` when signed out or the refresh fails.
  - `signOut() -> void` -- clears the token; does NOT clear course progress.

### Design notes the implementer must not improvise around

- **`resource=https://api.fieldreadyacademy.com` goes on the authorize request AND on both token requests.** The tenant's default resource indicator is the MCP server; a token minted without `resource` carries the MCP audience and the progress API will 401 it. This is the single most likely cause of "signed in but nothing syncs".
- **This is a public client. There is no client secret.** Never add one; anything shipped to a browser is not a secret.
- Tokens live in `localStorage` under `fra.auth.v1` so a session survives a tab close. The refresh token is therefore exposed to any XSS on the origin. That is an accepted trade for a static site that renders no user-generated HTML -- do not "fix" it by moving to memory-only, which would sign the learner out on every page load and defeat the feature.
- The PKCE verifier, the CSRF `state`, and `returnTo` live in `sessionStorage` under `fra.auth.pkce` and are deleted the moment the exchange completes or fails.
- `user()` decodes the access token payload **without verifying it**, for display only. Never make an access decision on it -- the server verifies. Say so in a comment.

- [ ] **Step 1: Write the failing test**

Create `tests/auth.js`:

```js
'use strict';
const assert = require('assert');
const { boot } = require('./lib.js');

// jsdom has no crypto.subtle; PKCE needs a real one.
const { webcrypto } = require('node:crypto');

function freshWindow() {
  const w = boot('netplus');           // same jsdom boot the other suites use
  if (!w.crypto || !w.crypto.subtle) w.crypto = webcrypto;
  w.localStorage.clear();
  w.sessionStorage.clear();
  return w;
}

(async function pkceChallengeIsCorrect() {
  const w = freshWindow();
  const A = w.FRAAuth;
  const url = new URL(await A.authorizeUrl('verifier-abc', 'state-xyz'));
  assert.strictEqual(url.origin + url.pathname,
    'https://prepared-song-48-staging.authkit.app/oauth2/authorize');
  const q = url.searchParams;
  assert.strictEqual(q.get('response_type'), 'code');
  assert.strictEqual(q.get('code_challenge_method'), 'S256');
  assert.strictEqual(q.get('state'), 'state-xyz');
  assert.strictEqual(q.get('client_id'), 'client_01M23KW7MPKGQ3FGVAW836VKBQ');
  assert.strictEqual(q.get('redirect_uri'), 'https://fieldreadyacademy.com/callback');

  // The audience binding. Without this the token opens the MCP server, not this API.
  assert.strictEqual(q.get('resource'), 'https://api.fieldreadyacademy.com');
  assert.ok(/\boffline_access\b/.test(q.get('scope')), 'asks for a refresh token');

  // S256 of 'verifier-abc', computed independently.
  const expected = webcrypto.subtle.digest('SHA-256', new TextEncoder().encode('verifier-abc'))
    .then(d => Buffer.from(d).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
  assert.strictEqual(q.get('code_challenge'), await expected,
    'code_challenge is base64url(SHA-256(verifier)), not the verifier itself');
})();

(function signedOutByDefault() {
  const w = freshWindow();
  assert.strictEqual(w.FRAAuth.isSignedIn(), false);
  assert.strictEqual(w.FRAAuth.user(), null);
})();

(async function accessTokenIsNullWhenSignedOut() {
  const w = freshWindow();
  assert.strictEqual(await w.FRAAuth.accessToken(), null);
})();

(async function storedUnexpiredTokenIsReturnedWithoutNetwork() {
  const w = freshWindow();
  w.fetch = () => { throw new Error('must not touch the network for a live token'); };
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok-live', refresh_token: 'r', expires_at: Date.now() + 600000,
    sub: 'user_01ABC', email: 'a@b.c'
  }));
  assert.strictEqual(await w.FRAAuth.accessToken(), 'tok-live');
  assert.strictEqual(w.FRAAuth.isSignedIn(), true);
  assert.strictEqual(w.FRAAuth.user().sub, 'user_01ABC');
})();

(async function expiredTokenIsRefreshedAndTheRefreshCarriesResource() {
  const w = freshWindow();
  let sent = null;
  w.fetch = (url, opts) => {
    sent = { url, body: String(opts.body) };
    return Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ access_token: 'tok-new', refresh_token: 'r2', expires_in: 3600 })
    });
  };
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok-old', refresh_token: 'r1', expires_at: Date.now() - 1000, sub: 's'
  }));
  assert.strictEqual(await w.FRAAuth.accessToken(), 'tok-new');
  assert.ok(/grant_type=refresh_token/.test(sent.body), 'used the refresh grant');
  assert.ok(sent.body.indexOf(encodeURIComponent('https://api.fieldreadyacademy.com')) !== -1,
    'refresh re-requests the API audience; without it the new token opens the wrong resource');
  const stored = JSON.parse(w.localStorage.getItem('fra.auth.v1'));
  assert.strictEqual(stored.refresh_token, 'r2', 'rotated refresh token was stored');
})();

(async function aFailedRefreshSignsOutRatherThanLoopingForever() {
  const w = freshWindow();
  w.fetch = () => Promise.resolve({ ok: false, status: 400, json: () => Promise.resolve({}) });
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok-old', refresh_token: 'bad', expires_at: Date.now() - 1000, sub: 's'
  }));
  assert.strictEqual(await w.FRAAuth.accessToken(), null);
  assert.strictEqual(w.localStorage.getItem('fra.auth.v1'), null, 'cleared the dead token');
})();

(async function callbackRejectsAMismatchedState() {
  const w = freshWindow();
  w.sessionStorage.setItem('fra.auth.pkce', JSON.stringify({
    verifier: 'v', state: 'expected', returnTo: '/netplus/'
  }));
  w.fetch = () => { throw new Error('must not exchange a code with a bad state'); };
  await assert.rejects(() => w.FRAAuth.completeSignIn('?code=abc&state=ATTACKER'),
    /state/i, 'CSRF state mismatch is rejected before the code is exchanged');
})();

(async function callbackExchangesTheCodeAndReturnsWhereWeCameFrom() {
  const w = freshWindow();
  w.sessionStorage.setItem('fra.auth.pkce', JSON.stringify({
    verifier: 'v-1', state: 'st-1', returnTo: '/cbet/'
  }));
  let body = null;
  w.fetch = (url, opts) => {
    body = String(opts.body);
    return Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ access_token: 'tok', refresh_token: 'r', expires_in: 3600 })
    });
  };
  const out = await w.FRAAuth.completeSignIn('?code=the-code&state=st-1');
  assert.strictEqual(out.returnTo, '/cbet/');
  assert.ok(/code_verifier=v-1/.test(body), 'sent the PKCE verifier');
  assert.ok(/grant_type=authorization_code/.test(body));
  assert.strictEqual(w.sessionStorage.getItem('fra.auth.pkce'), null,
    'the one-time PKCE transient was cleared');
  assert.strictEqual(w.FRAAuth.isSignedIn(), true);
})();

(function signOutClearsTheTokenButNotCourseProgress() {
  const w = freshWindow();
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 't', sub: 's' }));
  w.localStorage.setItem('fra.netplus.state.v3', '{"v":3}');
  w.FRAAuth.signOut();
  assert.strictEqual(w.localStorage.getItem('fra.auth.v1'), null);
  assert.strictEqual(w.localStorage.getItem('fra.netplus.state.v3'), '{"v":3}',
    'signing out must never destroy local progress');
})();

console.log('All auth tests passed.');
```

If `tests/lib.js` does not already export a `boot(courseId)` that returns the jsdom window, read it and use whatever equivalent it provides, adapting these tests to that shape rather than changing `lib.js`'s existing contract.

- [ ] **Step 2: Run it to make sure it fails**

Run: `node tests/auth.js`
Expected: FAIL -- `TypeError: Cannot read properties of undefined (reading 'authorizeUrl')`, because `engine/auth.js` does not exist and is not loaded.

- [ ] **Step 3: Write `engine/auth.js`**

```js
'use strict';
// OAuth 2.1 authorization-code + PKCE against WorkOS AuthKit, for a public browser
// client. Loaded as a plain script beside merge.js; sets window.FRAAuth.
//
// This file is the ONLY place that knows what a token is. engine/sync.js asks it for
// a bearer token and knows nothing else about auth.
(function (root) {
  const DEFAULTS = {
    issuer: 'https://prepared-song-48-staging.authkit.app',
    clientId: 'client_01M23KW7MPKGQ3FGVAW836VKBQ',
    apiBase: 'https://api.fieldreadyacademy.com',
    // RFC 8707 resource indicator. The tenant's DEFAULT indicator is the MCP server,
    // so a token minted without this opens the connector, not this API, and every
    // sync call 401s. Do not remove it from any request below.
    resource: 'https://api.fieldreadyacademy.com',
    redirectPath: '/callback',
    scope: 'openid profile email offline_access'
  };
  const CONFIG = Object.assign({}, DEFAULTS, root.FRA_AUTH_CONFIG || {});

  const TOKEN_KEY = 'fra.auth.v1';
  const PKCE_KEY = 'fra.auth.pkce';
  const SKEW_MS = 60000;               // refresh a minute early rather than racing expiry

  const redirectUri = () => new URL(CONFIG.redirectPath, root.location.origin).href;

  function readJson(store, key) {
    try { const raw = store.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function writeJson(store, key, val) {
    try { store.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }
  function drop(store, key) { try { store.removeItem(key); } catch (e) { /* ignore */ } }

  const tokens = () => readJson(root.localStorage, TOKEN_KEY);

  function randomString(n) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const bytes = new Uint8Array(n);
    root.crypto.getRandomValues(bytes);
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += chars[bytes[i] % chars.length];
    return s;
  }

  function b64url(buf) {
    const b = new Uint8Array(buf);
    let s = '';
    for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return root.btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function challengeFor(verifier) {
    const data = new root.TextEncoder().encode(verifier);
    return root.crypto.subtle.digest('SHA-256', data).then(b64url);
  }

  function authorizeUrl(verifier, state) {
    return challengeFor(verifier).then(function (challenge) {
      const q = new URLSearchParams({
        response_type: 'code',
        client_id: CONFIG.clientId,
        redirect_uri: redirectUri(),
        scope: CONFIG.scope,
        state: state,
        code_challenge: challenge,
        code_challenge_method: 'S256',
        resource: CONFIG.resource
      });
      return CONFIG.issuer.replace(/\/$/, '') + '/oauth2/authorize?' + q.toString();
    });
  }

  function beginSignIn(returnTo) {
    const verifier = randomString(64);
    const state = randomString(32);
    writeJson(root.sessionStorage, PKCE_KEY, {
      verifier: verifier, state: state,
      returnTo: returnTo || root.location.pathname + root.location.hash
    });
    return authorizeUrl(verifier, state).then(function (url) { root.location.href = url; });
  }

  function tokenRequest(params) {
    params.set('client_id', CONFIG.clientId);
    params.set('resource', CONFIG.resource);
    return root.fetch(CONFIG.issuer.replace(/\/$/, '') + '/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
  }

  // Display only. The payload is NOT verified here -- the server verifies every token.
  // Never make an access decision on anything this returns.
  function claims(accessToken) {
    try {
      const part = String(accessToken).split('.')[1];
      const pad = part.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(root.atob(pad + '==='.slice((pad.length + 3) % 4)));
    } catch (e) { return {}; }
  }

  function store(data) {
    const c = claims(data.access_token);
    const rec = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || (tokens() || {}).refresh_token || null,
      expires_at: Date.now() + (Number(data.expires_in) || 3600) * 1000,
      sub: c.sub || null,
      email: c.email || null
    };
    writeJson(root.localStorage, TOKEN_KEY, rec);
    return rec;
  }

  function completeSignIn(search) {
    const pending = readJson(root.sessionStorage, PKCE_KEY);
    const q = new URLSearchParams(search || '');
    if (q.get('error')) {
      drop(root.sessionStorage, PKCE_KEY);
      return Promise.reject(new Error('sign-in failed: ' + q.get('error')));
    }
    if (!pending) return Promise.reject(new Error('no sign-in is in progress'));
    if (!q.get('state') || q.get('state') !== pending.state) {
      drop(root.sessionStorage, PKCE_KEY);
      return Promise.reject(new Error('state mismatch; sign-in was not started here'));
    }
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: q.get('code') || '',
      redirect_uri: redirectUri(),
      code_verifier: pending.verifier
    });
    return tokenRequest(params).then(function (r) {
      if (!r.ok) throw new Error('token exchange failed: ' + r.status);
      return r.json();
    }).then(function (data) {
      store(data);
      drop(root.sessionStorage, PKCE_KEY);
      return { returnTo: pending.returnTo || '/' };
    }, function (err) {
      drop(root.sessionStorage, PKCE_KEY);
      throw err;
    });
  }

  function refresh() {
    const t = tokens();
    if (!t || !t.refresh_token) { signOut(); return Promise.resolve(null); }
    return tokenRequest(new URLSearchParams({
      grant_type: 'refresh_token', refresh_token: t.refresh_token
    })).then(function (r) {
      if (!r.ok) throw new Error('refresh rejected: ' + r.status);
      return r.json();
    }).then(function (data) {
      return store(data).access_token;
    }, function () {
      // The refresh token is dead. Clearing it is what stops an infinite retry loop.
      signOut();
      return null;
    });
  }

  function accessToken() {
    const t = tokens();
    if (!t || !t.access_token) return Promise.resolve(null);
    if (Date.now() < (t.expires_at || 0) - SKEW_MS) return Promise.resolve(t.access_token);
    return refresh();
  }

  function signOut() {
    // Deliberately does not touch fra.<courseId>.state.v3 -- signing out must never
    // destroy the learner's local progress.
    drop(root.localStorage, TOKEN_KEY);
    drop(root.sessionStorage, PKCE_KEY);
  }

  function user() {
    const t = tokens();
    return t && t.sub ? { sub: t.sub, email: t.email || null } : null;
  }

  root.FRAAuth = {
    CONFIG: CONFIG,
    isSignedIn: function () { return !!(tokens() || {}).access_token; },
    user: user,
    beginSignIn: beginSignIn,
    authorizeUrl: authorizeUrl,
    completeSignIn: completeSignIn,
    accessToken: accessToken,
    signOut: signOut
  };
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Register the new file in all seven loaders**

This is the step that was missed on the previous branch and produced blank pages while every test stayed green. In each of `netplus/index.html`, `secplus/index.html`, `cbet/index.html`, `aplus1/index.html`, `aplus2/index.html`, add the script tag immediately after the `engine/merge.js` line and **before** `engine/app.js`:

```html
<script src="../engine/auth.js"></script>
```

Match each shell's existing relative-path style exactly -- copy the `merge.js` line and change the filename.

In `build.py`, line 43 currently reads:

```python
    scripts = "\n".join(read(p) for p in course_files(course_dir)) + "\n" + read(os.path.join(ENGINE, "merge.js")) + "\n" + read(os.path.join(ENGINE, "app.js"))
```

Replace it with:

```python
    scripts = ("\n".join(read(p) for p in course_files(course_dir)) + "\n"
               + read(os.path.join(ENGINE, "merge.js")) + "\n"
               + read(os.path.join(ENGINE, "auth.js")) + "\n"
               + read(os.path.join(ENGINE, "app.js")))
```

(Task 4 adds `sync.js` to this same list, between `auth.js` and `app.js`.)

In `tests/lib.js`, add `engine/auth.js` to the scripts the jsdom boot evaluates, again after `merge.js` and before `app.js`.

- [ ] **Step 5: Add the suite to `npm test`**

In `package.json`, extend the `test` script so it reads:

```json
"test": "node tests/selftest.js && node tests/gating.js && node tests/acronyms.js && node tests/engine.js && node tests/merge.js && node tests/auth.js"
```

- [ ] **Step 6: Run the tests**

Run: `node tests/auth.js`
Expected: `All auth tests passed.`

Run: `npm test`
Expected: every suite passes.

- [ ] **Step 7: Prove the loaders really are wired**

A bundle can pass while the unbundled shells are broken. Verify the shells directly by replaying each one's own `<script src>` list under jsdom and checking `FRAAuth` exists and the body still renders:

```bash
node -e "
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
for (const id of ['netplus','secplus','cbet','aplus1','aplus2']) {
  const html=fs.readFileSync(id+'/index.html','utf8');
  const srcs=[...html.matchAll(/<script src=\"([^\"]+)\"/g)].map(m=>m[1]);
  const dom=new JSDOM('<!doctype html><html><body><div id=app></div></body></html>',
    {url:'http://localhost/'+id+'/',runScripts:'outside-only'});
  const {webcrypto}=require('node:crypto'); dom.window.crypto=webcrypto;
  for (const s of srcs) dom.window.eval(fs.readFileSync(path.join(id,s),'utf8'));
  if(!dom.window.FRAAuth) throw new Error(id+': FRAAuth missing -- loader not registered');
  if(!dom.window.document.body.innerHTML.trim()) throw new Error(id+': body did not render');
  console.log(id,'ok');
}
"
```

Expected: `netplus ok` through `aplus2 ok`. If any throws, that shell's script list is wrong -- fix it before committing.

- [ ] **Step 8: Commit**

```bash
git add engine/auth.js tests/auth.js package.json build.py tests/lib.js netplus/index.html secplus/index.html cbet/index.html aplus1/index.html aplus2/index.html
git commit -m "feat(engine): PKCE sign-in and token storage

Public-client authorization-code + PKCE against AuthKit, tokens under
fra.auth.v1. Every request carries resource=https://api.fieldreadyacademy.com
so the token is audience-bound to the progress API rather than the tenant's
default MCP resource. Registered in all seven engine loaders."
```

---

## Task 3: The `/callback` page, and proving a real token works

**This task exists to close the one seam nothing has ever exercised.** Until a genuine AuthKit token is accepted by the live API, every later task is built on an assumption. Do not skip the manual verification in Step 4 -- it is the point of the task.

**Files:**
- Create: `callback/index.html`
- Modify: `build.py` (emit `dist/callback.html`)

**Interfaces:**
- Consumes: `FRAAuth.completeSignIn(search)` from Task 2.
- Produces: a deployable `/callback` page.

- [ ] **Step 1: Write the callback page**

Create `callback/index.html`. It must work for all five courses, which share one origin, and must show something honest if the exchange fails rather than a blank screen.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Signing you in - FieldReady Academy</title>
<link rel="stylesheet" href="../catalog.css">
<style>
  .cb { max-width: 32rem; margin: 12vh auto; padding: 0 1rem; text-align: center; }
  .cb .err { text-align: left; }
</style>
</head>
<body>
<main class="cb">
  <h1 id="msg">Signing you in...</h1>
  <p id="detail" class="muted"></p>
  <p id="actions" hidden><a class="btn" href="/">Back to the courses</a></p>
</main>
<script src="../engine/auth.js"></script>
<script>
(function () {
  var msg = document.getElementById('msg');
  var detail = document.getElementById('detail');
  var actions = document.getElementById('actions');
  function fail(text) {
    msg.textContent = 'That sign-in did not complete';
    detail.textContent = text;
    detail.className = 'muted err';
    actions.hidden = false;
  }
  try {
    window.FRAAuth.completeSignIn(window.location.search).then(function (out) {
      // Same-origin, app-relative only: never send the learner to an absolute URL
      // that arrived from outside, or this page becomes an open redirect.
      var to = out.returnTo || '/';
      if (!/^\/[^/]/.test(to)) to = '/';
      window.location.replace(to);
    }, function (err) {
      fail(String(err && err.message ? err.message : err));
    });
  } catch (e) {
    fail(String(e && e.message ? e.message : e));
  }
})();
</script>
</body>
</html>
```

Note the `returnTo` guard: `completeSignIn` reads `returnTo` from this origin's own `sessionStorage`, but the check costs one line and turns a future mistake into a harmless redirect to `/` instead of an open redirect.

- [ ] **Step 2: Teach `build.py` to emit it**

Add this beside `build()` in `build.py`, reusing the existing `read`, `ROOT` and `ENGINE` helpers:

```python
def build_callback():
    """dist/callback.html - the shared PKCE completion page, fully self-contained."""
    html = read(os.path.join(ROOT, "callback", "index.html"))
    html = html.replace(
        '<link rel="stylesheet" href="../catalog.css">',
        "<style>\n" + read(os.path.join(ROOT, "catalog.css")) + "\n</style>")
    html = html.replace(
        '<script src="../engine/auth.js"></script>',
        "<script>\n" + read(os.path.join(ENGINE, "auth.js")) + "\n</script>")
    out = os.path.join(ROOT, "dist", "callback.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/callback.html {len(html)} bytes")
```

Call it from the same entry point that calls `build(course_id)`, so a normal `python build.py <id>` refreshes the callback too. If either `replace` finds no match the page would ship with a dead relative link, so assert both actually replaced:

```python
    assert "<style>" in html and "engine/auth.js" not in html, \
        "callback/index.html no longer matches the strings build_callback() inlines"
```

Put that assert before the write.

- [ ] **Step 3: Deploy the page**

```bash
python build.py netplus          # confirm the build still works end to end
ssh hetzner "mkdir -p /var/www/fieldready/callback"
scp dist/callback.html hetzner:/var/www/fieldready/callback/index.html
ssh hetzner "chown -R caddy:caddy /var/www/fieldready/callback"
curl -s -o /dev/null -w '%{http_code}\n' https://fieldreadyacademy.com/callback
```

Expected: `200`.

Do not touch `/var/www/fieldready/index.html` or `/var/www/fieldready/serviceforge/` -- both were hand-edited and are not in git.

- [ ] **Step 4: Get a real token and prove the API accepts it**

This is a manual browser step and it is the whole point of this task.

1. Open `https://fieldreadyacademy.com/netplus/` in a browser, open the devtools console, and run:

```js
FRAAuth.beginSignIn('/netplus/')
```

2. Complete sign-in with AuthKit. You land back on the course.
3. In the console, confirm the token is audience-bound to the API and not to the MCP server:

```js
FRAAuth.accessToken().then(t => {
  const c = JSON.parse(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/') + '=='));
  console.log('aud:', c.aud, 'iss:', c.iss, 'sub:', c.sub);
});
```

Expected `aud` is `https://api.fieldreadyacademy.com`. **If it is `https://mcp.fieldreadyacademy.com/mcp`, the `resource` parameter is not reaching the authorize request -- stop and fix Task 2 before going further.**

4. Call the live API with it:

```js
FRAAuth.accessToken()
  .then(t => fetch('https://api.fieldreadyacademy.com/v1/progress', {
    headers: { Authorization: 'Bearer ' + t }
  }))
  .then(r => r.json().then(j => console.log(r.status, j)));
```

Expected: `200 []` -- an empty list, because this learner has stored nothing yet. A 404 is also acceptable on the per-course route; `[]` is what the list route returns.

**If this returns 401**, work through in order: is `aud` right (step 3); is the issuer in the box's `/opt/fieldready-api/.env` the same host as the token's `iss`; does `ssh hetzner "journalctl -u fieldready-api -n 30 --no-pager"` show the rejection reason. Do not proceed to Task 4 until this returns 200 -- everything after this assumes it.

5. Record the result in the report, including the observed `aud` and `iss`.

- [ ] **Step 5: Commit**

```bash
git add callback/index.html build.py
git commit -m "feat(web): shared /callback page for PKCE completion

One callback serves all five courses; they share an origin. Verified end to
end against live AuthKit: a real token is audience-bound to the progress API
and the API accepts it."
```

---

## Task 4: `engine/sync.js` -- pull, merge, push, retry

**Files:**
- Create: `engine/sync.js`
- Test: `tests/sync.js`
- Modify: `package.json`, `build.py`, `tests/lib.js`, and the five `<id>/index.html` shells (register `engine/sync.js` after `auth.js`, before `app.js`)

**Interfaces:**
- Consumes: `FRAAuth.accessToken()`, `FRAAuth.signOut()`, `FRAAuth.CONFIG.apiBase` from Task 2; `FRAMerge.mergeState(a, b)` from the merged engine.
- Produces `window.FRASync`:
  - `init(opts)` -- `opts` is `{courseId, getState, adopt, onStatus}`. `getState()` returns the live state object; `adopt(state)` replaces it and persists; `onStatus(status)` is called with `'idle' | 'syncing' | 'error' | 'offline'`.
  - `pull() -> Promise<boolean>` -- true if local state changed.
  - `pushNow() -> Promise<boolean>` -- true if the server accepted a write.
  - `schedulePush()` -- debounced 5s; safe to call on every `save()`.
  - `maybePull()` -- pulls only if the last pull was over 60s ago.
  - `isDirty() -> boolean`
  - `reset()` -- clears sync bookkeeping for this course (used on sign-out).

### Rules that must not be improvised around

- **Never block the UI and never throw into a caller.** Every failure is swallowed; the dirty flag persists and the next trigger retries. This mirrors `saveFeedback()`.
- **Merge is `FRAMerge.mergeState`.** Do not reimplement any merge rule here.
- **The retry loop is bounded at three attempts.** Merge is associative and idempotent, so a retry after a lost response is safe: the retry 412s, we re-GET our own write, and merging it changes nothing.
- **A 412 can be followed by a 404** -- the row was deleted between the write and the re-read. The loop must then switch from `If-Match` to `If-None-Match: *`.
- **413 is permanent.** The blob exceeds 2,000,000 bytes. Retrying never helps: stop, set `status = 'error'`, and leave it for the pruning work the design doc anticipates.
- **401 after a refresh attempt means the session is genuinely dead** -- sign out. **5xx and network errors mean try later** -- never sign out on those.
- Bookkeeping lives in `localStorage` under `fra.<courseId>.sync.v1` as `{version, hash, lastPullAt}`. Store a cheap hash of the last pushed state, never a second copy of it -- the blob can be 200 KB and copying it doubles the course's storage footprint.

- [ ] **Step 1: Write the failing test**

Create `tests/sync.js`. These tests drive the real module against a scripted `fetch`, so they exercise the actual retry logic rather than a mock of it.

```js
'use strict';
const assert = require('assert');
const { boot } = require('./lib.js');

function harness(script) {
  const w = boot('netplus');
  w.localStorage.clear();
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1'
  }));
  const calls = [];
  w.fetch = function (url, opts) {
    opts = opts || {};
    calls.push({ url: String(url), method: opts.method || 'GET', headers: opts.headers || {},
                 body: opts.body ? JSON.parse(opts.body) : null });
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
  return Object.assign({ v: 3, course: 'netplus', lessons: {}, qstats: {}, topics: {},
    exams: [], passStreak: 0, official: null, plan: null, path: null, active: null,
    settings: { timer: true }, settingsAt: 0, feedback: [], ratings: {}, seen: {},
    touchedAt: 0, created: 1 }, extra || {});
}

(async function pullOn404LeavesLocalAloneAndIsNotAnError() {
  const h = harness([res(404)]);
  let local = state({ passStreak: 2 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const changed = await h.w.FRASync.pull();
  assert.strictEqual(changed, false);
  assert.strictEqual(local.passStreak, 2, 'a 404 first pull must not wipe local progress');
})();

(async function pullMergesServerStateIntoLocal() {
  const remote = state({ lessons: { u1l1: { status: 'done', best: 90, attempts: 1, passedAt: 5 } } });
  const h = harness([res(200, { state: remote, version: 7 }, '"7"')]);
  let local = state({ lessons: { u2l1: { status: 'done', best: 80, attempts: 1, passedAt: 6 } } });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const changed = await h.w.FRASync.pull();
  assert.strictEqual(changed, true);
  assert.ok(local.lessons.u1l1 && local.lessons.u2l1, 'both devices\' lessons survived the merge');
})();

(async function pushSendsContentTypeJsonOrTheServerRejectsIt() {
  const h = harness([res(200, { version: 1 }, '"1"')]);
  let local = state({ passStreak: 1 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  await h.w.FRASync.pushNow();
  const put = h.calls[0];
  assert.strictEqual(put.method, 'PUT');
  const ct = put.headers['Content-Type'] || put.headers['content-type'];
  assert.strictEqual(ct, 'application/json',
    'FastAPI runs strict_content_type; without this header every write is a 422');
})();

(async function firstPushUsesIfNoneMatchStarNotABlindWrite() {
  const h = harness([res(200, { version: 1 }, '"1"')]);
  let local = state();
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  await h.w.FRASync.pushNow();
  const hdr = h.calls[0].headers;
  assert.strictEqual(hdr['If-None-Match'] || hdr['if-none-match'], '*',
    'a first write must be create-only, or it silently overwrites another device');
})();

(async function a412ReGetsMergesAndRetriesWithTheFreshVersion() {
  const remote = state({ passStreak: 3 });
  const h = harness([
    res(412),                                        // our write was stale
    res(200, { state: remote, version: 9 }, '"9"'),  // re-read
    res(200, { version: 10 }, '"10"')                // retry accepted
  ]);
  let local = state({ passStreak: 1 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const ok = await h.w.FRASync.pushNow();
  assert.strictEqual(ok, true);
  assert.strictEqual(h.calls.length, 3, 'exactly one re-read and one retry');
  assert.strictEqual(h.calls[2].headers['If-Match'], '"9"',
    'the retry carried the version from the re-read');
})();

(async function a412ThenA404SwitchesToCreate() {
  const h = harness([
    res(412),                       // stale
    res(404),                       // ...because the row was deleted meanwhile
    res(200, { version: 1 }, '"1"') // so create it
  ]);
  let local = state({ passStreak: 1 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const ok = await h.w.FRASync.pushNow();
  assert.strictEqual(ok, true);
  assert.strictEqual(h.calls[2].headers['If-None-Match'], '*',
    'after a 404 the loop must switch from If-Match to create');
})();

(async function theRetryLoopIsBoundedAtThree() {
  const h = harness([
    res(412), res(200, { state: state(), version: 2 }, '"2"'),
    res(412), res(200, { state: state(), version: 3 }, '"3"'),
    res(412), res(200, { state: state(), version: 4 }, '"4"')
  ]);
  let local = state({ passStreak: 1 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const ok = await h.w.FRASync.pushNow();
  assert.strictEqual(ok, false, 'gave up rather than looping forever');
  assert.strictEqual(h.w.FRASync.isDirty(), true, 'stayed dirty so a later trigger retries');
})();

(async function a413IsPermanentAndIsNotRetried() {
  const h = harness([res(413)]);
  let local = state();
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const ok = await h.w.FRASync.pushNow();
  assert.strictEqual(ok, false);
  assert.strictEqual(h.calls.length, 1, 'a too-large blob must not be retried; it can never fit');
})();

(async function a503DoesNotSignTheLearnerOut() {
  const h = harness([res(503)]);
  let local = state();
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  await h.w.FRASync.pushNow();
  assert.ok(h.w.FRAAuth.isSignedIn(),
    'a JWKS or database outage returns 503; signing out on it would log everyone out');
  assert.strictEqual(h.w.FRASync.isDirty(), true);
})();

(async function a401SignsOut() {
  const h = harness([res(401)]);
  let local = state();
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  await h.w.FRASync.pushNow();
  assert.strictEqual(h.w.FRAAuth.isSignedIn(), false, 'a genuinely dead token ends the session');
})();

(async function anUnchangedStateIsNotPushedAgain() {
  const h = harness([res(200, { version: 1 }, '"1"')]);
  let local = state({ passStreak: 1 });
  h.w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  await h.w.FRASync.pushNow();
  await h.w.FRASync.pushNow();   // nothing changed in between
  assert.strictEqual(h.calls.length, 1,
    'every PUT burns a version; re-pushing an identical state makes two devices 412 each other');
})();

(async function networkFailureIsSwallowedAndStaysDirty() {
  const w = boot('netplus');
  w.localStorage.clear();
  w.localStorage.setItem('fra.auth.v1', JSON.stringify({
    access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1'
  }));
  w.fetch = () => Promise.reject(new Error('offline'));
  let local = state({ passStreak: 1 });
  w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  const ok = await w.FRASync.pushNow();          // must not throw
  assert.strictEqual(ok, false);
  assert.strictEqual(w.FRASync.isDirty(), true);
})();

(async function signedOutSyncIsANoOpAndTouchesNoNetwork() {
  const w = boot('netplus');
  w.localStorage.clear();
  w.fetch = () => { throw new Error('anonymous study must never call the API'); };
  let local = state();
  w.FRASync.init({ courseId: 'netplus', getState: () => local, adopt: s => { local = s; } });
  assert.strictEqual(await w.FRASync.pull(), false);
  assert.strictEqual(await w.FRASync.pushNow(), false);
})();

console.log('All sync tests passed.');
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node tests/sync.js`
Expected: FAIL -- `TypeError: Cannot read properties of undefined (reading 'init')`.

- [ ] **Step 3: Write `engine/sync.js`**

```js
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

  // FNV-1a. Cheap change detection; storing a second copy of a 200 KB blob to compare
  // against would double the course's storage footprint.
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h.toString(36) + ':' + str.length;
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
          const merged = root.FRAMerge.mergeState(opts.getState(), body.state);
          const before = JSON.stringify(payload());
          opts.adopt(merged);
          const after = JSON.stringify(payload());
          book.version = readVersion(r, body);
          book.lastPullAt = Date.now();
          saveBook();
          // If the merge produced something the server does not have, we owe it a push.
          if (hash(after) !== book.hash) dirty = true;
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
          book.hash = hash(JSON.stringify(body));
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
            opts.adopt(root.FRAMerge.mergeState(opts.getState(), b2.state));
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
      const h = hash(JSON.stringify(body));
      // Every PUT burns a version. Re-pushing an identical state makes two devices
      // 412 each other for no reason.
      if (!dirty && h === book.hash) return false;
      // From here we know local differs from the server. Stay dirty until a write is
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
```

- [ ] **Step 4: Register it in all seven loaders**

Exactly as in Task 2, add `engine/sync.js` **after** `auth.js` and **before** `app.js` in: the five `<id>/index.html` shells, `build.py`, and `tests/lib.js`.

- [ ] **Step 5: Add the suite to `npm test`**

Extend the `test` script with ` && node tests/sync.js`.

- [ ] **Step 6: Run the tests**

Run: `node tests/sync.js`
Expected: `All sync tests passed.`

Run: `npm test`
Expected: every suite passes.

- [ ] **Step 7: Re-run the seven-loader check from Task 2 Step 7**, asserting `FRASync` as well as `FRAAuth`.

Expected: `netplus ok` through `aplus2 ok`.

- [ ] **Step 8: Commit**

```bash
git add engine/sync.js tests/sync.js package.json build.py tests/lib.js netplus/index.html secplus/index.html cbet/index.html aplus1/index.html aplus2/index.html
git commit -m "feat(engine): pull, merge and push course progress

Client-side merge via FRAMerge, ETag preconditions, a 412 retry bounded at
three attempts that can switch to create when the row was deleted, and a
dirty flag that survives failures. Never throws into the UI."
```

---

## Task 5: Wire sync into the engine

**Files:**
- Modify: `engine/app.js`

**Interfaces:**
- Consumes: `FRASync.init/pull/maybePull/pushNow/schedulePush` from Task 4; `FRAAuth.isSignedIn()` from Task 2.

Triggers, from the design doc's Sync layer section:

| When | Call |
|---|---|
| Page load, signed in | `FRASync.pull()` |
| Window focus | `FRASync.maybePull()` (no-ops inside 60s) |
| Any `save()` | `FRASync.schedulePush()` (debounced 5s) |
| Exam submit, lesson pass, official pass | `FRASync.pushNow()` |
| `visibilitychange` -> hidden | `FRASync.pushNow()` |

- [ ] **Step 1: Initialise sync at boot**

Near where the engine finishes building `S` and before the first `render()`, add:

```js
  // Sync is optional and additive: everything below is a no-op while signed out, so
  // anonymous study takes exactly the path it always has.
  if (root.FRASync && root.FRAAuth) {
    FRASync.init({
      courseId: course.id,
      getState: function () { return S; },
      adopt: function (next) { S = next; save(); render(); },
      onStatus: function (s) { syncStatus = s; paintSyncBadge(); }
    });
    if (FRAAuth.isSignedIn()) FRASync.pull();
    root.addEventListener('focus', function () { FRASync.maybePull(); });
    root.document.addEventListener('visibilitychange', function () {
      if (root.document.visibilityState === 'hidden') FRASync.pushNow();
    });
  }
```

Declare `let syncStatus = 'idle';` beside the other module-level state. `paintSyncBadge` is defined in Task 6; for this task define it as an empty function and let Task 6 fill it in.

- [ ] **Step 2: Push on every save**

Change `save()` so it schedules a push. Keep the `touchedAt` stamp and the try/catch exactly as they are:

```js
  function save() {
    S.touchedAt = Date.now();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
    if (root.FRASync) FRASync.schedulePush();
  }
```

Because `schedulePush` is debounced at 5s and `pushNow` skips an unchanged state, the fact that `go()` calls `save()` on every navigation does not produce a write per click.

- [ ] **Step 3: Push immediately at the moments worth not losing**

An exam result is the most expensive thing a learner can lose, so it must not wait out the 5-second debounce. Two call sites, located 2026-09-10:

**`engine/app.js:707`, `finishExam()`** -- this is where `S.passStreak` and `S.official` are assigned (line ~730). At the end of the function, after its existing `save()`, add:

```js
    if (root.FRASync) FRASync.pushNow();
```

That one site covers the exam submit, the streak update and the official pass together, because all three are written by `finishExam`.

**`engine/app.js:1057`, the checkpoint completion branch** -- the line that ends `if (score >= CHECKPOINT_PASS) { ls.status = 'passed'; ls.passedAt = Date.now(); }`. After the `save()` that follows that block, add the same guarded `FRASync.pushNow();`.

Do not add a push anywhere else. Every other state change is already covered by `save()`'s debounced `schedulePush()`.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: every suite passes. The existing self-tests run with no `FRASync` defined in some paths, which is why every call site is guarded -- if a test fails with `FRASync is not defined`, add the guard rather than defining a stub in the test.

- [ ] **Step 5: Commit**

```bash
git add engine/app.js
git commit -m "feat(engine): sync triggers on load, focus, save and exam submit"
```

---

## Task 6: The sign-in affordance

**Files:**
- Modify: `engine/app.js`, `engine/styles.css`

The offer is "save your progress", not "sign in to continue". Nothing is gated. A cold visitor from a search result must still be able to start a course immediately -- that is what protects the SEO and freemium plan.

- [ ] **Step 1: Add the control to the topbar**

In the `<header class="topbar">` block (around line 384), after the brand button, add:

```js
${root.FRAAuth ? (FRAAuth.isSignedIn()
  ? `<div class="acct"><span class="who" title="${esc((FRAAuth.user() || {}).email || '')}">${esc((FRAAuth.user() || {}).email || 'Signed in')}</span><span class="syncdot" id="syncdot" title="Progress sync"></span><button class="btn ghost small" data-act="sign-out">Sign out</button></div>`
  : `<button class="btn small" data-act="sign-in">Save my progress</button>`) : ''}
```

- [ ] **Step 2: Handle the two actions**

In the click handler beside the other `data-act` cases:

```js
      case 'sign-in': { FRAAuth.beginSignIn(location.pathname + location.hash); return; }
      case 'sign-out': {
        // Sign-out clears the token, never the local blob. The learner keeps studying
        // exactly as an anonymous visitor would, with everything they have done so far.
        FRAAuth.signOut(); FRASync.reset(); render(); return;
      }
```

- [ ] **Step 3: Paint the status dot**

Replace the empty `paintSyncBadge` from Task 5:

```js
  function paintSyncBadge() {
    const el = $('#syncdot');
    if (!el) return;
    const label = { idle: 'Progress saved', syncing: 'Saving...', error: 'Not saved yet', offline: 'Offline' };
    el.className = 'syncdot ' + syncStatus;
    el.title = label[syncStatus] || '';
  }
```

Add to `engine/styles.css`:

```css
.acct { display:flex; align-items:center; gap:8px; margin-left:auto; }
.acct .who { font-size:.85rem; opacity:.8; max-width:14rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.syncdot { width:8px; height:8px; border-radius:50%; background:var(--ok,#3a9); display:inline-block; }
.syncdot.syncing { background:var(--accent,#4a9eff); }
.syncdot.error, .syncdot.offline { background:var(--warn,#d84); }
```

- [ ] **Step 4: Offer it once, where it is earned**

On the starter-test results page, beneath the existing path choice, add a one-line offer when signed out. Do not add a modal, do not interrupt, and do not repeat it elsewhere:

```js
${!FRAAuth.isSignedIn() ? `<p class="muted">Studying on more than one device? <button class="btn ghost small" data-act="sign-in">Save my progress</button></p>` : ''}
```

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: every suite passes.

- [ ] **Step 6: Commit**

```bash
git add engine/app.js engine/styles.css
git commit -m "feat(engine): offer to save progress, and show sync status"
```

---

## Task 7: Build, deploy and verify on two real devices

**Files:** none changed unless verification finds a defect.

- [ ] **Step 1: Build and deploy all five courses plus the callback**

```bash
for id in netplus secplus cbet aplus1 aplus2; do python build.py $id; done
python build.py netplus   # if build.py emits dist/callback.html only with a course, adjust
for id in netplus secplus cbet aplus1 aplus2; do
  scp dist/$id.html hetzner:/var/www/fieldready/$id/index.html
done
scp dist/callback.html hetzner:/var/www/fieldready/callback/index.html
ssh hetzner "chown -R caddy:caddy /var/www/fieldready"
```

**Do not touch `/var/www/fieldready/index.html` or `/var/www/fieldready/serviceforge/`** -- both were hand-edited on 2026-09-10 and are not in git. Overwriting the catalog would delete its Tools section.

- [ ] **Step 2: Confirm the bundles carry the new code**

```bash
curl -s https://fieldreadyacademy.com/netplus/ | grep -c 'FRASync'
curl -s https://fieldreadyacademy.com/netplus/ | grep -c 'api.fieldreadyacademy.com'
```

Expected: both at least 1.

- [ ] **Step 3: The two-device test -- the one that actually proves the feature**

This is manual and cannot be replaced by a unit test.

1. **Device A** (your desktop browser): open `https://fieldreadyacademy.com/netplus/`, sign in, take the starter test, complete one lesson, and turn the countdown timer **off** in the exam options.
2. Wait ten seconds, then confirm in the console that a write landed: `FRASync.isDirty()` should be `false`.
3. **Device B** (a phone, or a private window -- it must be a separate browser profile, not another tab): open the same URL and sign in as the same learner.
4. **Expect:** the starter test result, the completed lesson, and `timer: false` are all present on device B without doing anything.
5. On device B, complete a *different* lesson. Wait ten seconds.
6. Return to device A, switch away and back to trigger the focus pull, and confirm device B's lesson appears.
7. **The regression this whole plan exists to prevent:** on device B, merely open the course again and change nothing. Return to device A. `timer` must still be `false` and any saved custom test setup must still be there. If either reverted, `settingsAt` is not being stamped or not being merged -- go back to Task 1.

- [ ] **Step 4: Confirm anonymous study is untouched**

In a fresh private window, without signing in: open a course, take the starter test, complete a lesson, and confirm everything works exactly as before and the browser makes **no** requests to `api.fieldreadyacademy.com` (check the Network tab). Anonymous study calling the API at all would be a defect.

- [ ] **Step 5: Confirm sign-out keeps local progress**

Signed in on device A, click Sign out. The course must still show all progress; only the account control changes. Then sign back in and confirm nothing was lost or duplicated.

- [ ] **Step 6: Record the results**

Write what you observed for Steps 3-5 into the task report, including anything that needed a second attempt.

---

## Done when

- `npm test` is green, including the new `tests/auth.js` and `tests/sync.js`.
- The seven-loader replay check passes for all five shells with both `FRAAuth` and `FRASync` present.
- A real AuthKit token, minted in a browser, is accepted by the live API (Task 3 Step 4).
- Two separate browser profiles converge on the same progress without prompting.
- Opening a course on a second device and changing nothing does not revert a settings choice made on the first.
- An anonymous learner makes zero requests to the API.

## Deliberately out of scope

- Production AuthKit. Staging only until the whole flow works end to end.
- Entitlement and paywall wiring. Everything stays free; `freeCourse` and `FRA_ENTITLED` are untouched.
- Cross-course "continue where you left off".
- Real-time or multi-tab sync.
- Pruning `qstats` and `exams`. The design doc anticipates a learner eventually approaching the 2 MB ceiling; the 413 path is handled but the pruning is a later plan.
