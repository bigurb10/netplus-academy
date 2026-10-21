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
  // ----- Rewards: the free year and the leaderboard page (Blake, 2026-10-21) -----
  {
    const sfHtml = fs.readFileSync(path.join(ROOT, 'serviceforge', 'index.html'), 'utf8');
    const d = new JSDOM(sfHtml, { url: 'https://fieldreadyacademy.com/serviceforge/' }).window.document;
    const rewards = d.querySelector('main #rewards');
    check('the ServiceForge page has a rewards section linking the leaderboard', !!rewards && /free year/.test(rewards.textContent) && !!rewards.querySelector('a[href="/serviceforge/leaderboard/"]'));
    check('the rewards copy states the threshold, the opt-in, and the prize rule', /Twenty in any 365 days/.test(rewards.textContent) && /Opt in/.test(rewards.textContent) && /opted-in technicians only/.test(rewards.textContent));
    const faqs = [...d.querySelectorAll('#faq h3')].map(h => h.textContent.trim());
    const ld = [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)).find(x => x['@type'] === 'FAQPage');
    check('the FAQ names the reward and the JSON-LD mirrors every visible question', faqs.includes('Is there a reward for contributing?') && JSON.stringify(ld.mainEntity.map(q => q.name)) === JSON.stringify(faqs), JSON.stringify(faqs));
    const lbHtml = fs.readFileSync(path.join(ROOT, 'serviceforge', 'leaderboard', 'index.html'), 'utf8');
    const lb = new JSDOM(lbHtml, { url: 'https://fieldreadyacademy.com/serviceforge/leaderboard/' }).window.document;
    const lbBrand = lb.querySelector('header .brand');
    check('the leaderboard page logo is a link to the main page', !!lbBrand && lbBrand.getAttribute('href') === '/');
    check('the leaderboard page has the table, the back link, and fetches the public route', !!lb.querySelector('#leaders tbody') && !!lb.querySelector('main a.back[href="../"]') && lbHtml.includes("fetch('https://mcp.fieldreadyacademy.com/leaderboard'"));
    check('the leaderboard page states the three rules', /20 logs in a year/.test(lb.body.textContent) && /opt-in/.test(lb.body.textContent) && /cash prize/.test(lb.body.textContent));
    check('the built leaderboard page exists', fs.existsSync(path.join(ROOT, 'dist', 'serviceforge-leaderboard.html')));
  }
  // ----- Privacy, terms, support (ChatGPT plugin listing requirements, 2026-10-21) -----
  {
    for (const name of ['privacy', 'terms', 'support']) {
      const html = fs.readFileSync(path.join(ROOT, name, 'index.html'), 'utf8');
      const d = new JSDOM(html, { url: `https://fieldreadyacademy.com/${name}/` }).window.document;
      const brand = d.querySelector('header .brand');
      check(`${name}: logo links home, footer links the other two pages, Discord in the header`, !!brand && brand.getAttribute('href') === '/' && !!d.querySelector('footer a[href="/privacy/"]') && !!d.querySelector('footer a[href="/terms/"]') && !!d.querySelector('footer a[href="/support/"]') && !!d.querySelector('header a.discord'));
      check(`${name}: built page exists`, fs.existsSync(path.join(ROOT, 'dist', `${name}.html`)));
    }
    const priv = fs.readFileSync(path.join(ROOT, 'privacy', 'index.html'), 'utf8');
    check('the privacy policy names the processors and the patient-information rule', /WorkOS/.test(priv) && /Hetzner/.test(priv) && /Google Analytics/.test(priv) && /patient/i.test(priv));
    const terms = fs.readFileSync(path.join(ROOT, 'terms', 'index.html'), 'utf8');
    check('the terms state the rewards rules as the connector enforces them', /Twenty qualifying contributions/.test(terms) && /365-day/.test(terms) && /opt-in/.test(terms) && /Catalog additions do not count/.test(terms));
  }
  // ----- The Discord link in every header (Blake, 2026-10-21) -----
  {
    const discord = d => { const a = d.querySelector('header a.discord'); return !!a && a.getAttribute('href') === 'https://discord.gg/8mvaA7q9Er' && a.getAttribute('target') === '_blank' && /noopener/.test(a.getAttribute('rel') || '') && !!a.querySelector('svg') && !!a.getAttribute('aria-label'); };
    check('the catalog header links the Discord', discord(run(null).document));
    const sfDoc = new JSDOM(fs.readFileSync(path.join(ROOT, 'serviceforge', 'index.html'), 'utf8')).window.document;
    check('the ServiceForge page header links the Discord', discord(sfDoc));
    const acctDoc = new JSDOM(fs.readFileSync(path.join(ROOT, 'account', 'index.html'), 'utf8')).window.document;
    check('the account page header links the Discord', discord(acctDoc));
    const lbDoc = new JSDOM(fs.readFileSync(path.join(ROOT, 'serviceforge', 'leaderboard', 'index.html'), 'utf8')).window.document;
    check('the leaderboard page header links the Discord', discord(lbDoc));
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
    check('CBET, CRES, and CHTM sit under AAMI certifications', under('aami').join(',') === 'cbet/,cres/,chtm/', under('aami').join(','));
    check('the four CompTIA courses sit under CompTIA certifications', under('comptia').join(',') === 'netplus/,secplus/,aplus1/,aplus2/', under('comptia').join(','));
    check('ServiceForge sits under Tools for technicians', under('tools').join(',') === 'serviceforge/', under('tools').join(','));
    const cards = [...d.querySelectorAll('main .card')].filter(c => c.querySelector('h3 a') && !/serviceforge\//.test(c.querySelector('h3 a').getAttribute('href')));
    check('every course card links its practice test', cards.length === 8 && cards.every(c => { const id = c.querySelector('h3 a').getAttribute('href'); return !!c.querySelector(`.links a[href="${id}practice-test/"]`); }), cards.map(c => c.querySelector('h3 a').getAttribute('href')).join(','));
    check('every category has a one-line lede', [...d.querySelectorAll('main section.cat')].every(s => s.querySelector('p.cat-lede') && s.querySelector('p.cat-lede').textContent.trim().length > 20));
    check('How every course works is still on the page', /How every course works/.test(d.querySelector('main').textContent));
    check('the catalog header links the guides', !!d.querySelector('header .top-links a[href="/guides/"]'));
    const pbqCards = ['netplus/', 'secplus/', 'aplus1/', 'aplus2/'];
    check('every CompTIA card links its PBQ page', pbqCards.every(id => !!d.querySelector(`.card .links a[href="${id}pbq/"]`)), pbqCards.filter(id => !d.querySelector(`.card .links a[href="${id}pbq/"]`)).join(','));
    const comptia = new Set(under('comptia'));
    check('no non-CompTIA card links a PBQ page', cards.filter(c => !comptia.has(c.querySelector('h3 a').getAttribute('href'))).every(c => !c.querySelector('.links a[href$="pbq/"]')));
  }
  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All catalog tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
