// The /account/ page: the account's progress on every course, read-only over the server
// copy. Run: node tests/account.js
'use strict';
const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const { webcrypto } = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');

const fails = [];
const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };

const html = fs.readFileSync(path.join(ROOT, 'account', 'index.html'), 'utf8');
// The page's own inline logic, extracted rather than auto-executed (runScripts:
// 'outside-only' keeps every <script> inert, including the relative-src engine loads).
// The marker comment is what proves the right block was captured.
const inline = (html.match(/<script>([\s\S]*?)<\/script>/g) || []).map(s => s.replace(/^<script>|<\/script>$/g, '')).find(s => s.indexOf('FRA account page') !== -1);
if (!inline) throw new Error('could not find the account page script in account/index.html');

const COURSES = [
  { id: 'netplus', name: 'NetPlus Academy', exam: 'CompTIA Network+ N10-009', lessons: 49, passPct: 80, passesNeeded: 3, passWindow: 5, examQuestions: 50, checkpointN: 4, labs: 2,
    domains: [{ id: 1, name: 'Networking Concepts', short: 'Concepts', pct: 23 }, { id: 2, name: 'Network Implementation', short: 'Implementation', pct: 20 }],
    lessonList: [{ id: 'u1l1', title: 'Networks and Their Types', domain: 1 }, { id: 'u1l2', title: 'The OSI Model', domain: 1 }, { id: 'u2l1', title: 'Cables', domain: 2 }] },
  { id: 'secplus', name: 'SecPlus Academy', exam: 'CompTIA Security+ SY0-701', lessons: 54, passPct: 80, passesNeeded: 3, passWindow: 5, examQuestions: 50 },
  { id: 'cbet', name: 'CBET Academy', exam: 'AAMI CBET', lessons: 60, passPct: 80, passesNeeded: 3, passWindow: 5, examQuestions: 50 }
];
const res = (status, body) => ({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });
const exam = (kind, pct) => ({ id: 'x' + kind + pct, date: 1000, kind, score: pct, total: 100, pct });
const HOUR = 3600000;

function run(opts) {
  opts = opts || {};
  const vc = new VirtualConsole(); vc.on('jsdomError', e => console.error('JSDOM ERR', e.message));
  const dom = new JSDOM(html, { url: 'https://fieldreadyacademy.com/account/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  // jsdom has no crypto.subtle or TextEncoder; beginSignIn's PKCE needs both (as tests/auth.js does).
  if (!w.crypto || !w.crypto.subtle) Object.defineProperty(w, 'crypto', { value: webcrypto, configurable: true, writable: true });
  if (!w.TextEncoder) w.TextEncoder = TextEncoder;
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'summary.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(ROOT, 'engine', 'strength.js'), 'utf8'));
  w.FRA_COURSES = COURSES;
  if (opts.token !== false) {
    w.localStorage.setItem('fra.auth.v1', JSON.stringify(Object.assign(
      { access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 600000, sub: 'u1', email: 'pat@example.com', name: null }, opts.token || {})));
  }
  const calls = [];
  const script = (opts.fetch || []).slice();   // [[urlSuffix, response], ...] consumed in order per suffix
  w.fetch = (url, o) => {
    calls.push({ url: String(url), headers: (o && o.headers) || {} });
    const i = script.findIndex(x => String(url).endsWith(x[0]));
    if (i < 0) return Promise.reject(new Error('unexpected fetch ' + url));
    return Promise.resolve(script.splice(i, 1)[0][1]);
  };
  w.FRA_NAVIGATE = () => {};   // beginSignIn's navigation seam; the PKCE transient is what we assert on
  w.eval(inline);
  w.$ = s => w.document.querySelector(s); w.$$ = s => [...w.document.querySelectorAll(s)];
  w.text = () => w.document.body.textContent;
  w.click = el => { if (!el) throw new Error('click target not found'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  return { w, calls };
}
const settle = () => new Promise(r => setTimeout(r, 30));

(async () => {
  // 1) Signed out.
  {
    const { w, calls } = run({ token: false });
    await w.FRA_ACCOUNT.ready;
    check('signed out: heading is neutral', w.$('#heading').textContent === 'Your progress', w.$('#heading').textContent);
    check('signed out: a Sign in button, no cards, no fetch', !!w.$('[data-act="sign-in"]') && w.$$('.card').length === 0 && calls.length === 0);
    w.click(w.$('[data-act="sign-in"]'));
    await settle();
    const pkce = JSON.parse(w.sessionStorage.getItem('fra.auth.pkce') || 'null');
    check('Sign in returns the learner to /account/ afterwards', !!pkce && pkce.returnTo === '/account/', pkce && pkce.returnTo);
  }

  // 2) Signed in with a name: two rows, one unreadable, one course not started.
  {
    const netplus = { v: 3, lessons: { a: { status: 'passed' }, b: { status: 'passed' }, c: { status: 'read' }, d: { status: 'passed' }, e: { status: 'passed' }, f: { status: 'passed' } },
      exams: [exam('starter', 40), exam('practice', 80)], passes: 2, official: null, plan: null, labs: { x: { done: true, at: 1 } }, touchedAt: Date.now() - 3 * HOUR };
    const { w, calls } = run({
      token: { name: 'Pat Learner' },
      fetch: [
        ['/v1/progress', res(200, [{ course_id: 'netplus', version: 4, updated_at: new Date(Date.now() - 2 * HOUR).toISOString() }, { course_id: 'cbet', version: 1, updated_at: new Date().toISOString() }])],
        ['/v1/progress/netplus', res(200, { state: netplus, version: 4 })],
        ['/v1/progress/cbet', res(500, {})]
      ]
    });
    await w.FRA_ACCOUNT.ready;
    check('signed in: heading is the name', w.$('#heading').textContent === 'Pat Learner', w.$('#heading').textContent);
    check('signed in: the email is shown once, as the muted detail line', w.$('#detail').textContent === 'Signed in as pat@example.com' && w.text().split('pat@example.com').length === 2, w.$('#detail').textContent);
    check('signed in: a Sign out button, no Sign in', !!w.$('[data-act="sign-out"]') && !w.$('[data-act="sign-in"]'));
    check('every request carries the bearer token', calls.length === 3 && calls.every(c => c.headers.Authorization === 'Bearer tok'), calls.map(c => c.url).join(' '));
    const cards = w.$$('.card');
    check('one card per course in catalog order', cards.length === 3 && /NetPlus/.test(cards[0].textContent) && /SecPlus/.test(cards[1].textContent) && /CBET/.test(cards[2].textContent), cards.map(c => c.querySelector('h3').textContent).join(','));
    const np = cards[0].textContent;
    check('netplus: stage label', /Practice tests/.test(np), np);
    check('netplus: lessons passed of total', /5 of 49/.test(np));
    check('netplus: best practice score', /80%/.test(np));
    check('netplus: passes of needed in the window', /2 of 3 in last 5/.test(np));
    check('netplus: official not yet', /Not yet/.test(np));
    check('netplus: last studied is relative', /3 hours ago/.test(np));
    check('netplus: last synced is relative', /2 hours ago/.test(np));
    check('netplus: labs done when the course has labs', /Labs done/.test(np) && /1 of 2/.test(np), np);
    check('netplus: Continue link reaches the app', !!cards[0].querySelector('a.go[href="/netplus/app/"]') && /Continue/.test(cards[0].querySelector('a.go').textContent));
    check('secplus: not started with a Start link into the app', /Not started/.test(cards[1].textContent) && !!cards[1].querySelector('a.go[href="/secplus/app/"]'));
    check('cbet: an unreadable row does not break the page', /Couldn.t read this course/.test(cards[2].textContent));
    check('a course without labs shows no labs fact', !/Labs done/.test(cards[1].textContent) && !/Labs done/.test(cards[2].textContent));
    w.click(w.$('[data-act="sign-out"]'));
    check('sign out drops the token and shows the signed-out view', w.localStorage.getItem('fra.auth.v1') === null && !!w.$('[data-act="sign-in"]') && w.$$('.card').length === 0);
  }

  // 3) A token without a name keeps the neutral heading.
  {
    const { w } = run({ fetch: [['/v1/progress', res(200, [])]] });
    await w.FRA_ACCOUNT.ready;
    check('no name on the token: heading stays "Your progress"', w.$('#heading').textContent === 'Your progress', w.$('#heading').textContent);
    check('no rows: every course is not started', w.$$('.card').length === 3 && w.$$('.card').every(c => /Not started/.test(c.textContent)));
  }

  // 4) 401 on the list ends the session.
  {
    const { w } = run({ fetch: [['/v1/progress', res(401, {})]] });
    await w.FRA_ACCOUNT.ready;
    check('401: token dropped, signed-out view with the session note',
      w.localStorage.getItem('fra.auth.v1') === null && !!w.$('[data-act="sign-in"]') && /session ended/i.test(w.$('#detail').textContent), w.$('#detail').textContent);
  }

  // 5) 500 on the list shows Retry; Retry loads.
  {
    const { w } = run({ fetch: [['/v1/progress', res(500, {})], ['/v1/progress', res(200, [])]] });
    await w.FRA_ACCOUNT.ready;
    check('500: an error card with Retry', /Couldn.t load your progress/.test(w.text()) && !!w.$('[data-act="retry"]'));
    w.click(w.$('[data-act="retry"]'));
    await settle();
    check('Retry reloads and renders the courses', w.$$('.card').length === 3 && !w.$('[data-act="retry"]'));
  }

  // 6) The strongest/weakest chart per course: ranked domain bars and the weakest topics as links.
  {
    const rec = Object.assign(exam('practice', 60), { review: [{ q: 'u1l2-1', correct: false }, { q: 'u1l1-1', correct: true }, { q: 'u2l1-1', correct: true }] });
    const netplus = { v: 3, lessons: { u1l2: { status: 'read', best: 1, attempts: 1, passedAt: 0, lastScore: 1, lastAt: 5000 } }, topics: {}, exams: [exam('starter', 40), rec], passes: 0, official: null, plan: null, touchedAt: Date.now() };
    const { w } = run({ fetch: [
      ['/v1/progress', res(200, [{ course_id: 'netplus', version: 2, updated_at: new Date().toISOString() }])],
      ['/v1/progress/netplus', res(200, { state: netplus, version: 2 })]
    ] });
    await w.FRA_ACCOUNT.ready;
    const card = w.$$('.card')[0];
    const bars = card.querySelectorAll('.sbars .sbar');
    check('the chart has one bar per domain', bars.length === 2, bars.length);
    check('bars run strongest to weakest', bars.length === 2 && /Implementation/.test(bars[0].textContent) && /100%/.test(bars[0].textContent) && /Concepts/.test(bars[1].textContent), [...bars].map(b => b.textContent).join(' | '));
    check('the weakest line links the topic into the app', !!card.querySelector('.weakest a[href="/netplus/app/#lesson/u1l2"]') && /OSI Model/.test(card.querySelector('.weakest').textContent), card.querySelector('.weakest') && card.querySelector('.weakest').textContent);
    check('courses without data show no chart', w.$$('.card').slice(1).every(c => !c.querySelector('.sbars') && !c.querySelector('.weakest')));
  }

  if (fails.length) { console.error(`\n${fails.length} FAILED: ${fails.join(', ')}`); process.exit(1); }
  console.log('All account tests passed.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
