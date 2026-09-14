// The /callback page (Task 6, resolution 4): a plain visit must not report a failure,
// only a genuine ?code=/?state=/?error= exchange goes through the real completeSignIn
// path. Run: node tests/callback.js
'use strict';
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

// jsdom makes Location's members unforgeable (own, non-configurable, non-writable
// properties on every instance -- matching real browsers), so `location.replace` cannot
// be stubbed via assignment or Object.defineProperty on the window or the location
// object itself; a plain call just logs a "Not implemented: navigation" jsdomError and
// does nothing. jsdom's own navigate() (one layer below Location, in living/window/
// navigation.js) is what location.replace() calls through to, so this patches that
// instead, to capture the resolved target URL precisely. It must happen before 'jsdom'
// itself is required: jsdom/lib/.../Location-impl.js does `const { navigate } =
// require("./navigation")`, which destructures and freezes its own local reference to
// whatever navigate() is at that moment -- patching navMod.navigate afterwards would
// leave that already-bound reference untouched.
const navMod = require(path.join(ROOT, 'node_modules', 'jsdom', 'lib', 'jsdom', 'living', 'window', 'navigation.js'));
const whatwgURL = require(path.join(ROOT, 'node_modules', 'whatwg-url'));
let onNavigate = null; // set per run(), read after
navMod.navigate = function (window, newURL) { if (onNavigate) onNavigate(whatwgURL.serializeURL(newURL)); };

const { JSDOM, VirtualConsole } = require('jsdom');

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

function bootCallback(search) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => { if (!/not implemented/i.test(String(e && e.message))) console.error('JSDOM ERR', e.message); });
  const dom = new JSDOM(html, { url: PAGE_URL + (search || ''), runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  return w;
}

// Runs the page for one (search, signed-in) case. Returns the window, the resolved
// navigation target (if any), and whether the network was touched.
function run(search, seedSignedIn) {
  const w = bootCallback(search);
  if (seedSignedIn) {
    w.localStorage.setItem('fra.auth.v1', JSON.stringify({
      access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'a@b.c'
    }));
  }
  let navigatedTo = null;
  onNavigate = url => { navigatedTo = url; };
  let fetchCalled = false;
  w.fetch = (...args) => { fetchCalled = true; return Promise.reject(new Error('must not touch the network: ' + JSON.stringify(args))); };
  w.eval(inlineScript);
  onNavigate = null;
  return { w, navigatedTo: () => navigatedTo, fetchCalled: () => fetchCalled };
}

(async () => {
  // 1) No query, signed out: "Nothing to finish here", the actions link shown, no fetch.
  {
    const { w, fetchCalled, navigatedTo } = run('');
    check('no query + signed out: heading is "Nothing to finish here"',
      w.document.getElementById('msg').textContent === 'Nothing to finish here', w.document.getElementById('msg').textContent);
    check('no query + signed out: the actions link is visible', w.document.getElementById('actions').hidden === false);
    check('no query + signed out: the detail line is neutral, not the error style',
      !/err/.test(w.document.getElementById('detail').className), w.document.getElementById('detail').className);
    check('no query + signed out: never touches the network', fetchCalled() === false);
    check('no query + signed out: no redirect is requested', navigatedTo() === null, navigatedTo());
  }

  // 2) No query, signed in: "You're signed in" and a redirect to / was requested.
  {
    const { w, navigatedTo, fetchCalled } = run('', true);
    check("no query + signed in: heading is \"You're signed in\"",
      w.document.getElementById('msg').textContent === "You're signed in", w.document.getElementById('msg').textContent);
    check('no query + signed in: a redirect to / was requested',
      navigatedTo() === 'https://fieldreadyacademy.com/', navigatedTo());
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

  if (fails.length) { console.error(`callback: ${fails.length} failed`); process.exit(1); }
  console.log('callback: all OK');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
