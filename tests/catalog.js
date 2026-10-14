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
  // ----- The logo goes home; the main page links to ServiceForge (Blake, 2026-10-11) -----
  {
    const w = run(null);
    const brand = w.$('header .brand');
    check('the logo is a link to the main page', !!brand && brand.tagName === 'A' && brand.getAttribute('href') === '/', brand && brand.outerHTML);
    const sf = [...w.document.querySelectorAll('main a')].filter(a => /serviceforge\/$/.test(a.getAttribute('href') || ''));
    check('the main page links to ServiceForge', sf.length >= 1 && sf.some(a => a.textContent.trim() === 'ServiceForge'), sf.length);
  }
  // ----- The ServiceForge page (serviceforge/index.html, built to dist/serviceforge.html) -----
  {
    const sfHtml = fs.readFileSync(path.join(ROOT, 'serviceforge', 'index.html'), 'utf8');
    const d = new JSDOM(sfHtml, { url: 'https://fieldreadyacademy.com/serviceforge/' }).window.document;
    const brand = d.querySelector('header .brand');
    check('the ServiceForge page logo is a link to the main page', !!brand && brand.tagName === 'A' && brand.getAttribute('href') === '/', brand && brand.outerHTML);
    check('the ServiceForge page keeps its All courses link', !!d.querySelector('main a.back[href="../"]'));
  }
  // ----- Catalog categories (Blake, 2026-10-12) -----
  {
    const w = run(null); const d = w.document;
    const heads = [...d.querySelectorAll('main section.cat > h2')].map(h => h.textContent.trim());
    check('the catalog has four category sections in order', heads.join('|') === 'Start here: Biomed basic training|AAMI certifications|CompTIA certifications|Tools for technicians', heads.join('|'));
    const under = id => [...d.querySelectorAll(`#${id} .card h3 a`)].map(a => a.getAttribute('href'));
    check('BMET sits under Start here', under('start').join(',') === 'bmet/', under('start').join(','));
    // Blake, 2026-10-14: the exam name sits in parentheses to the right of the title so the card says what it trains for.
    check('the BMET card title names the CABT', d.querySelector('#start .card h3 a').textContent.trim() === 'BMET Academy (CABT)', d.querySelector('#start .card h3 a').textContent.trim());
    check('CBET and CRES sit under AAMI certifications', under('aami').join(',') === 'cbet/,cres/', under('aami').join(','));
    check('the four CompTIA courses sit under CompTIA certifications', under('comptia').join(',') === 'netplus/,secplus/,aplus1/,aplus2/', under('comptia').join(','));
    check('ServiceForge sits under Tools for technicians', under('tools').join(',') === 'serviceforge/', under('tools').join(','));
    const cards = [...d.querySelectorAll('main .card')].filter(c => c.querySelector('h3 a') && !/serviceforge\//.test(c.querySelector('h3 a').getAttribute('href')));
    check('every course card links its practice test', cards.length === 7 && cards.every(c => { const id = c.querySelector('h3 a').getAttribute('href'); return !!c.querySelector(`.links a[href="${id}practice-test/"]`); }), cards.map(c => c.querySelector('h3 a').getAttribute('href')).join(','));
    check('every category has a one-line lede', [...d.querySelectorAll('main section.cat')].every(s => s.querySelector('p.cat-lede') && s.querySelector('p.cat-lede').textContent.trim().length > 20));
    check('How every course works is still on the page', /How every course works/.test(d.querySelector('main').textContent));
    check('the catalog header links the guides', !!d.querySelector('header .top-links a[href="/guides/"]'));
  }
  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All catalog tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
