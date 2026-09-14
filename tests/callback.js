// The /callback page (Task 6, resolution 4): a plain visit must not report a failure,
// only a genuine ?code=/?state=/?error= exchange goes through the real completeSignIn
// path. Run: node tests/callback.js
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const PAGE_URL = 'https://fieldreadyacademy.com/callback/';
const html = fs.readFileSync(path.join(ROOT, 'callback', 'index.html'), 'utf8');
// The page's own inline logic, extracted rather than auto-executed. runScripts:'outside-only'
// (the same choice tests/lib.js makes for the engine) keeps every <script> tag inert,
// including `<script src="../engine/auth.js">`, whose relative URL would otherwise need a
// real network fetch this test cannot and should not make. The bare `<script>` (no `src`)
// is the inline block; the one with `src="..."` never matches this pattern.
const inlineScript = (/<script>([\s\S]*?)<\/script>/.exec(html) || [])[1];
if (!inlineScript) throw new Error('could not extract the inline script from callback/index.html');
// The first-<script> regex above is a heuristic. If the page ever grows another inline
// block ahead of this one, the extraction would silently capture the wrong text and every
// test below would assert against something that is not the callback logic. FRA_REDIRECT,
// the page's own redirect hook, is the marker that it captured the right block.
check('the extracted inline script really is the callback page logic',
  inlineScript.indexOf('FRA_REDIRECT') !== -1);

function bootCallback(search) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => console.error('JSDOM ERR', e.message));
  const dom = new JSDOM(html, { url: PAGE_URL + (search || ''), runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  return w;
}

// Runs the page for one (search, signed-in) case. window.FRA_REDIRECT is the page's own
// overridable redirect hook (matching FRA_AUTH_CONFIG/FRA_ENTITLED elsewhere in this
// codebase) -- set before the inline script runs, exactly like the fetch stub below, so
// it captures the target instead of the page actually navigating. Returns the window,
// the captured redirect target (if any), and whether the network was touched.
// `opts.pkce` seeds the one-time transient completeSignIn() reads back, and `opts.token`
// scripts the token endpoint's 200 -- together they are what makes the success path
// testable without a network.
function run(search, seedSignedIn, opts) {
  opts = opts || {};
  const w = bootCallback(search);
  if (seedSignedIn) {
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'a@b.c'
    }));
  }
  if (opts.pkce) w.sessionStorage.setItem('fra.auth.pkce', JSON.stringify(opts.pkce));
  let redirectedTo = null;
  w.FRA_REDIRECT = to => { redirectedTo = to; };
  let fetchCalled = false;
  w.fetch = (...args) => {
    fetchCalled = true;
    if (opts.token) return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(opts.token) });
    return Promise.reject(new Error('must not touch the network: ' + JSON.stringify(args)));
  };
  w.eval(inlineScript);
  return { w, redirectedTo: () => redirectedTo, fetchCalled: () => fetchCalled };
}

(async () => {
  // 1) No query, signed out: "Nothing to finish here", the actions link shown, no fetch.
  {
    const { w, fetchCalled, redirectedTo } = run('');
    check('no query + signed out: heading is "Nothing to finish here"',
      w.document.getElementById('msg').textContent === 'Nothing to finish here', w.document.getElementById('msg').textContent);
    check('no query + signed out: the actions link is visible', w.document.getElementById('actions').hidden === false);
    check('no query + signed out: the detail line is neutral, not the error style',
      !/err/.test(w.document.getElementById('detail').className), w.document.getElementById('detail').className);
    check('no query + signed out: never touches the network', fetchCalled() === false);
    check('no query + signed out: no redirect is requested', redirectedTo() === null, redirectedTo());
  }

  // 2) No query, signed in: "You're signed in" and a redirect to / was requested.
  {
    const { w, redirectedTo, fetchCalled } = run('', true);
    check("no query + signed in: heading is \"You're signed in\"",
      w.document.getElementById('msg').textContent === "You're signed in", w.document.getElementById('msg').textContent);
    check('no query + signed in: a redirect to / was requested', redirectedTo() === '/', redirectedTo());
    check('no query + signed in: never touches the network', fetchCalled() === false);
  }

  // 3) ?error=access_denied: the existing failure path is unchanged.
  {
    const { w } = run('?error=access_denied');
    await new Promise(r => setTimeout(r, 20)); // completeSignIn's rejection settles on a microtask
    check('?error=access_denied: heading is the existing failure heading',
      w.document.getElementById('msg').textContent === 'That sign-in did not complete', w.document.getElementById('msg').textContent);
    check('?error=access_denied: the detail names the error', /access_denied/.test(w.document.getElementById('detail').textContent), w.document.getElementById('detail').textContent);
    check('?error=access_denied: the actions link is visible', w.document.getElementById('actions').hidden === false);
  }

  // 4) The success path: the code is exchanged and the learner is returned where they
  // came from. returnTo travelled through sessionStorage from before the redirect, so the
  // page treats it as hostile input -- these three cases are the only coverage the
  // open-redirect guard has.
  {
    const TOKEN = { access_token: 'tok', refresh_token: 'r', expires_in: 3600 };
    const cases = [
      ['/cbet/', '/cbet/', 'an app-relative returnTo is honoured'],
      ['//evil.example.com', '/', 'a protocol-relative returnTo goes to / instead'],
      ['https://evil.example.com/x', '/', 'an absolute returnTo goes to / instead']
    ];
    for (const [returnTo, expected, label] of cases) {
      const { w, redirectedTo, fetchCalled } = run('?code=the-code&state=st-1', false, {
        pkce: { verifier: 'v-1', state: 'st-1', returnTo: returnTo },
        token: TOKEN
      });
      await new Promise(r => setTimeout(r, 20)); // the exchange settles on a microtask
      check(`?code=...: ${label}`, redirectedTo() === expected, `${returnTo} -> ${redirectedTo()}`);
      check(`?code=... (${returnTo}): the code was actually exchanged`, fetchCalled() === true, fetchCalled());
      check(`?code=... (${returnTo}): the one-time PKCE transient was cleared`,
        w.sessionStorage.getItem('fra.auth.pkce') === null, w.sessionStorage.getItem('fra.auth.pkce'));
      check(`?code=... (${returnTo}): the learner ends up signed in`,
        w.FRAAuth.isSignedIn() === true, w.FRAAuth.isSignedIn());
    }
  }

  if (fails.length) { console.error(`callback: ${fails.length} failed`); process.exit(1); }
  console.log('callback: all OK');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
