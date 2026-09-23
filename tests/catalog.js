// The catalog's account control: sign in from the front page, and a way to /account/.
// Run: node tests/catalog.js
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const { webcrypto } = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const inline = (html.match(/<script>([\s\S]*?)<\/script>/g) || []).map(s => s.replace(/^<script>|<\/script>$/g, '')).find(s => s.indexOf('FRA catalog account control') !== -1);
if (!inline) throw new Error('could not find the catalog account script in index.html');
check('the catalog loads engine/auth.js before its account script',
  html.indexOf('<script src="engine/auth.js"></script>') !== -1 && html.indexOf('<script src="engine/auth.js"></script>') < html.indexOf('FRA catalog account control'));

function run(token) {
  const vc = new VirtualConsole(); vc.on('jsdomError', e => console.error('JSDOM ERR', e.message));
  const dom = new JSDOM(html, { url: 'https://fieldreadyacademy.com/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  // jsdom has no crypto.subtle or TextEncoder; beginSignIn's PKCE needs both (as tests/auth.js does).
  if (!w.crypto || !w.crypto.subtle) Object.defineProperty(w, 'crypto', { value: webcrypto, configurable: true, writable: true });
  if (!w.TextEncoder) w.TextEncoder = TextEncoder;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  if (token) w.localStorage.setItem('fra.auth.v1', JSON.stringify(Object.assign({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com' }, token)));
  w.fetch = () => Promise.reject(new Error('the catalog control must not touch the network'));
  w.FRA_NAVIGATE = () => {};
  w.eval(inline);
  w.$ = s => w.document.querySelector(s);
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  return w;
}

(async () => {
  {
    const w = run(null);
    const btn = w.$('#acct [data-act="sign-in"]');
    check('signed out: a Sign in button in the header', !!btn && btn.textContent.trim() === 'Sign in', btn && btn.textContent);
    w.click(btn);
    await new Promise(r => setTimeout(r, 30));
    const pkce = JSON.parse(w.sessionStorage.getItem('fra.auth.pkce') || 'null');
    check('Sign in returns the learner to the catalog afterwards', !!pkce && pkce.returnTo === '/', pkce && pkce.returnTo);
  }
  {
    const w = run({ name: 'Pat Learner' });
    const who = w.$('#acct a.who');
    check('signed in: the name links to /account/', !!who && who.textContent === 'Pat Learner' && who.getAttribute('href') === '/account/', who && who.outerHTML);
    check('signed in: the email is nowhere on the page', w.document.body.textContent.indexOf('pat@example.com') === -1);
    check('signed in: a Sign out button, no Sign in', !!w.$('#acct [data-act="sign-out"]') && !w.$('#acct [data-act="sign-in"]'));
    w.click(w.$('#acct [data-act="sign-out"]'));
    check('sign out drops the token and shows Sign in again', w.localStorage.getItem('fra.auth.v1') === null && !!w.$('#acct [data-act="sign-in"]'));
  }
  {
    const w = run({ name: null });
    const who = w.$('#acct a.who');
    check('signed in without a name: "My progress" links to /account/', !!who && who.textContent === 'My progress' && who.getAttribute('href') === '/account/', who && who.outerHTML);
  }
  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All catalog tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
