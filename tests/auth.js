// PKCE sign-in and token storage (engine/auth.js). Run: node tests/auth.js
'use strict';
const path = require('path');
const { boot, ROOT } = require('./lib.js');

// jsdom has no crypto.subtle; PKCE needs a real one.
const { webcrypto } = require('node:crypto');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const dir = path.join(ROOT, 'courses', 'netplus');

function freshWindow() {
  // lib.js's boot() defaults to http://localhost/, but redirect_uri is built from
  // root.location.origin, and the brief's expected value is the real production origin
  // -- boot at that origin so the assertion below is meaningful rather than accidental.
  const w = boot({ courseDir: dir, url: 'https://fieldreadyacademy.com/' });
  // jsdom's window.crypto is a readonly WebIDL accessor (getter only, silently ignores a
  // plain assignment even in strict mode), so a real override needs defineProperty.
  if (!w.crypto || !w.crypto.subtle) {
    Object.defineProperty(w, 'crypto', { value: webcrypto, configurable: true, writable: true });
  }
  // jsdom's window also does not expose TextEncoder (Node's global scope has it, the
  // simulated browser window does not); engine/auth.js expects the browser global.
  if (!w.TextEncoder) w.TextEncoder = TextEncoder;
  w.localStorage.clear();
  w.sessionStorage.clear();
  return w;
}

(async () => {
  // ----- authorizeUrl builds a correct PKCE challenge -----
  {
    const w = freshWindow();
    const A = w.FRAAuth;
    const url = new URL(await A.authorizeUrl('verifier-abc', 'state-xyz'));
    check('authorize endpoint is the AuthKit tenant', url.origin + url.pathname ===
      'https://prepared-song-48-staging.authkit.app/oauth2/authorize', url.origin + url.pathname);
    const q = url.searchParams;
    check('response_type is code', q.get('response_type') === 'code', q.get('response_type'));
    check('code_challenge_method is S256', q.get('code_challenge_method') === 'S256', q.get('code_challenge_method'));
    check('state is passed through', q.get('state') === 'state-xyz', q.get('state'));
    check('client_id is the public client id', q.get('client_id') === 'client_01M2G92EW9F8X16GPQCV5598ZS', q.get('client_id'));
    check('redirect_uri points at the callback page', q.get('redirect_uri') === 'https://fieldreadyacademy.com/callback', q.get('redirect_uri'));

    // The audience binding. Without this the token opens the MCP server, not this API.
    check('resource is the progress API', q.get('resource') === 'https://api.fieldreadyacademy.com', q.get('resource'));
    check('scope asks for a refresh token', /\boffline_access\b/.test(q.get('scope')), q.get('scope'));

    // S256 of 'verifier-abc', computed independently.
    const expected = await webcrypto.subtle.digest('SHA-256', new TextEncoder().encode('verifier-abc'))
      .then(d => Buffer.from(d).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
    check('code_challenge is base64url(SHA-256(verifier)), not the verifier itself',
      q.get('code_challenge') === expected, q.get('code_challenge'));
  }

  // ----- signed out by default -----
  {
    const w = freshWindow();
    check('isSignedIn is false with no stored token', w.FRAAuth.isSignedIn() === false, w.FRAAuth.isSignedIn());
    check('user() is null with no stored token', w.FRAAuth.user() === null, w.FRAAuth.user());
  }

  // ----- accessToken is null when signed out -----
  {
    const w = freshWindow();
    const t = await w.FRAAuth.accessToken();
    check('accessToken() is null when signed out', t === null, t);
  }

  // ----- a stored, unexpired token is returned without touching the network -----
  {
    const w = freshWindow();
    w.fetch = () => { throw new Error('must not touch the network for a live token'); };
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok-live', refresh_token: 'r', expires_at: Date.now() + 600000,
      sub: 'user_01ABC', email: 'a@b.c'
    }));
    const t = await w.FRAAuth.accessToken();
    check('a live token is returned as-is, no network', t === 'tok-live', t);
    check('isSignedIn is true', w.FRAAuth.isSignedIn() === true, w.FRAAuth.isSignedIn());
    check('user().sub reads the stored token', w.FRAAuth.user().sub === 'user_01ABC', w.FRAAuth.user().sub);
  }

  // ----- an expired token is refreshed, and the refresh carries resource -----
  {
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
    const t = await w.FRAAuth.accessToken();
    check('accessToken() returns the freshly refreshed token', t === 'tok-new', t);
    check('used the refresh grant', /grant_type=refresh_token/.test(sent.body), sent.body);
    check('refresh re-requests the API audience; without it the new token opens the wrong resource',
      sent.body.indexOf(encodeURIComponent('https://api.fieldreadyacademy.com')) !== -1, sent.body);
    const stored = JSON.parse(w.localStorage.getItem('fra.auth.v1'));
    check('rotated refresh token was stored', stored.refresh_token === 'r2', stored.refresh_token);
  }

  // ----- a failed refresh signs out rather than looping forever -----
  {
    const w = freshWindow();
    w.fetch = () => Promise.resolve({ ok: false, status: 400, json: () => Promise.resolve({}) });
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok-old', refresh_token: 'bad', expires_at: Date.now() - 1000, sub: 's'
    }));
    const t = await w.FRAAuth.accessToken();
    check('accessToken() is null after a failed refresh', t === null, t);
    check('cleared the dead token', w.localStorage.getItem('fra.auth.v1') === null, w.localStorage.getItem('fra.auth.v1'));
  }

  // ----- a 5xx refresh must NOT sign the learner out (plan API fact 7) -----
  // A JWKS or database outage answers 503. Treating any non-2xx as a dead grant, which is
  // what the original catch-all rejection handler did, logs every signed-in learner out of
  // a working account for the duration of an issuer blip.
  {
    const w = freshWindow();
    const stored = JSON.stringify({ access_token: 'tok-old', refresh_token: 'r1', expires_at: Date.now() - 1000, sub: 's' });
    w.localStorage.setItem('fra.auth.v1', stored);
    w.fetch = () => Promise.resolve({ ok: false, status: 503, json: () => Promise.resolve({}) });
    const t = await w.FRAAuth.accessToken();
    check('a 503 refresh resolves null rather than a stale token', t === null, t);
    check('a 503 refresh leaves the stored tokens alone for the next trigger',
      w.localStorage.getItem('fra.auth.v1') === stored, w.localStorage.getItem('fra.auth.v1'));
    check('a 503 refresh leaves the learner signed in', w.FRAAuth.isSignedIn() === true, w.FRAAuth.isSignedIn());
  }

  // ----- an offline refresh keeps the tokens too -----
  {
    const w = freshWindow();
    const stored = JSON.stringify({ access_token: 'tok-old', refresh_token: 'r1', expires_at: Date.now() - 1000, sub: 's' });
    w.localStorage.setItem('fra.auth.v1', stored);
    w.fetch = () => Promise.reject(new Error('offline'));
    const t = await w.FRAAuth.accessToken();
    check('a rejected refresh resolves null, never throws', t === null, t);
    check('going offline must not sign the learner out',
      w.localStorage.getItem('fra.auth.v1') === stored, w.localStorage.getItem('fra.auth.v1'));
  }

  // ----- two concurrent accessToken() calls share ONE refresh -----
  // Refresh tokens rotate, so a second concurrent refresh presents one the first already
  // consumed: it comes back 400 and (correctly, per the test above) ends the session.
  {
    const w = freshWindow();
    let calls = 0;
    w.fetch = () => {
      calls++;
      return Promise.resolve({
        ok: true, status: 200,
        json: () => Promise.resolve({ access_token: 'tok-fresh', refresh_token: 'r2', expires_in: 3600 })
      });
    };
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok-old', refresh_token: 'r1', expires_at: Date.now() - 1000, sub: 's'
    }));
    const a = w.FRAAuth.accessToken();
    const b = w.FRAAuth.accessToken();   // synchronous, before the first refresh settles
    const [ta, tb] = await Promise.all([a, b]);
    check('two concurrent accessToken() calls make exactly one token request', calls === 1, calls);
    check('both concurrent callers resolve the freshly refreshed token',
      ta === 'tok-fresh' && tb === 'tok-fresh', [ta, tb].join(' / '));
    check('a deduped refresh still leaves the learner signed in', w.FRAAuth.isSignedIn() === true, w.FRAAuth.isSignedIn());
  }

  // ----- callback rejects a mismatched state -----
  {
    const w = freshWindow();
    w.sessionStorage.setItem('fra.auth.pkce', JSON.stringify({
      verifier: 'v', state: 'expected', returnTo: '/netplus/'
    }));
    let fetchCalled = false;
    w.fetch = () => { fetchCalled = true; return Promise.reject(new Error('must not exchange a code with a bad state')); };
    let rejected = false, msg = '';
    try { await w.FRAAuth.completeSignIn('?code=abc&state=ATTACKER'); }
    catch (e) { rejected = true; msg = String((e && e.message) || e); }
    // The message-pattern check alone is not enough to discriminate: the fetch stub's own
    // guard message also contains the word "state", so a rejection that comes from an
    // unguarded fetch call would match /state/i too. fetchCalled is the real invariant --
    // the code must reject before ever touching the network.
    check('CSRF state mismatch is rejected before the code is exchanged',
      rejected && !fetchCalled && /state/i.test(msg), `rejected=${rejected} fetchCalled=${fetchCalled} msg=${msg}`);
  }

  // ----- callback exchanges the code and returns where we came from -----
  {
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
    check('completeSignIn returns the returnTo we came from', out.returnTo === '/cbet/', out.returnTo);
    check('sent the PKCE verifier', /code_verifier=v-1/.test(body), body);
    check('used the authorization_code grant', /grant_type=authorization_code/.test(body), body);
    check('the one-time PKCE transient was cleared', w.sessionStorage.getItem('fra.auth.pkce') === null,
      w.sessionStorage.getItem('fra.auth.pkce'));
    check('isSignedIn is true after a successful exchange', w.FRAAuth.isSignedIn() === true, w.FRAAuth.isSignedIn());
  }

  // ----- signOut clears the token but not course progress -----
  {
    const w = freshWindow();
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({ access_token: 't', sub: 's' }));
    w.localStorage.setItem('fra.netplus.state.v3', '{"v":3}');
    w.FRAAuth.signOut();
    check('signOut cleared the stored token', w.localStorage.getItem('fra.auth.v1') === null,
      w.localStorage.getItem('fra.auth.v1'));
    check('signing out must never destroy local progress',
      w.localStorage.getItem('fra.netplus.state.v3') === '{"v":3}', w.localStorage.getItem('fra.netplus.state.v3'));
  }

  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All auth tests passed.');
  // Explicit on the success path too: booting the real engine arms a real 5s FRASync
  // schedulePush() timer (Task 5's save() change) that Node's natural exit would otherwise
  // wait out.
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
