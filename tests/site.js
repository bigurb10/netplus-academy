// Public SEO pages: the static renderer must match the engine for every public lesson and
// cheat sheet section, and the generator must write exactly the pages the design names.
// Run: node tests/site.js
const fs = require('fs'); const os = require('os'); const path = require('path');
const { boot, courseDirs, ROOT } = require('./lib');
const { makeRenderer, stripAcronyms, esc } = require('../site/markup');
const site = require('../site/build-site');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const act = (w, a, arg) => { const b = w.document.createElement('button'); b.dataset.act = a; if (arg != null) b.dataset.arg = arg; w.$('#app').appendChild(b); w.click(b); };

// ----- 1. Parity with the engine, every course, every free lesson -----
for (const dir of courseDirs()) {
  const FRA = site.loadPack(dir); const m = site.model(FRA); const R = makeRenderer(FRA.acronyms);
  const w = boot({ courseDir: dir });
  // Both sides go through the same DOM serializer so entity spelling cannot cause a false diff.
  const canon = html => { const d = w.document.createElement('div'); d.innerHTML = html; return stripAcronyms(d.innerHTML); };
  let bodies = 0, deeps = 0; const bad = [];
  for (const l of m.freeLessons) {
    act(w, 'lesson', l.id);
    const eng = w.$('article.lesson-body');
    if (!eng || canon(eng.innerHTML) !== canon(R.renderBody(l.body))) bad.push(l.id); else bodies++;
    if (m.deep[l.id]) {
      act(w, 'deep-toggle', l.id);
      const d = w.$('.deep-body');
      if (!d || canon(d.innerHTML) !== canon(R.renderBody(m.deep[l.id]))) bad.push(l.id + ':deep'); else deeps++;
    }
  }
  check(`${m.c.id}: static lesson HTML matches the engine (${bodies} bodies, ${deeps} deep explanations)`, !bad.length && bodies === m.freeLessons.length, bad.join(','));

  act(w, 'go', 'cheatsheet');
  const badCs = [];
  for (const s of m.cheatsheet.sections) {
    const el = w.$(`#cs-${s.id}`);
    const engHtml = el ? el.innerHTML.replace(/^<h2>[\s\S]*?<\/h2>/, '') : null;
    if (engHtml === null || canon(engHtml) !== canon(s.blocks.map(R.csBlock).join(''))) badCs.push(s.id);
  }
  check(`${m.c.id}: static cheat sheet sections match the engine (${m.cheatsheet.sections.length})`, !badCs.length, badCs.join(','));
  const hasAcr = Object.keys(FRA.acronyms || {}).length > 0;
  const sample = m.freeLessons.map(l => R.renderBody(l.body)).join('');
  check(`${m.c.id}: acronyms render as <abbr title> on the static side`, !hasAcr || /<abbr title="[^"]+">/.test(sample));
  w.close();
}

// ----- 2. Generator output on the mini fixture -----
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-'));
const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
const res = site.buildAll({ courseDirs: [mini], out, origin: 'https://example.test/', guidesDir: path.join(ROOT, 'tests', 'fixtures', 'guides') });
const FRA = site.loadPack(mini); const m = site.model(FRA); const R = makeRenderer(FRA.acronyms);
const read = p => fs.readFileSync(path.join(out, p), 'utf8');
const exists = p => fs.existsSync(path.join(out, p));

check('mini: the free lessons are the first free.lessons in course order', m.freeLessons.map(l => l.id).join(',') === m.lessons.slice(0, FRA.course.free.lessons).map(l => l.id).join(','), m.freeLessons.map(l => l.id).join(','));
check('course landing page written', exists('mini/lessons/index.html'));
check('cheat sheet page written', exists('mini/cheatsheet/index.html'));
const nonFree = m.lessons.filter(l => !m.free.has(l.id));
check('one page per free lesson', m.freeLessons.every(l => exists(`mini/lessons/${site.slug(l)}/index.html`)));
check('no page for any lesson beyond the free set', nonFree.length > 0 && !nonFree.some(l => exists(`mini/lessons/${site.slug(l)}/index.html`)), nonFree.length);
check('the landing page is written at the course URL', exists('mini/index.html'));
const landing = read('mini/index.html');
check('landing H1 falls back to "<name>: <exam> study guide and practice tests" without a seo block', landing.includes('<h1>Mini Course: Mini Exam MC-1 study guide and practice tests</h1>'), (landing.match(/<h1>[^<]*<\/h1>/) || [])[0]);
check('landing forwards hash routes to the app before anything else in head', landing.indexOf("location.replace(location.pathname.replace(/\\/?$/,'/')+'app/'+location.hash)") > 0 && landing.indexOf('location.replace') < landing.indexOf('<link rel="stylesheet"'));
check('landing links the app, the practice test, the lessons index and the cheat sheet', landing.includes('href="/mini/app/"') && landing.includes('href="/mini/practice-test/"') && landing.includes('href="/mini/lessons/"') && landing.includes('href="/mini/cheatsheet/"'));
check('landing lists every free lesson', m.freeLessons.every(l => landing.includes(`href="${m.urls.lesson(l)}"`)));
const lld = [...landing.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('landing JSON-LD: Course, FAQPage, BreadcrumbList', lld.map(x => x['@type']).join(',') === 'Course,FAQPage,BreadcrumbList', lld.map(x => x['@type']).join(','));
check('landing FAQ falls back to exam facts when the manifest has none', lld[1].mainEntity.length >= 3);
check('landing carries og:image and is indexable', landing.includes('property="og:image" content="https://example.test/og-image.png"') && !landing.includes('name="robots"'));

check('apportion: twenty across 40/30/30 is 8/6/6', JSON.stringify(site.apportionN(20, { 1: 40, 2: 30, 3: 30 })) === JSON.stringify({ 1: 8, 2: 6, 3: 6 }));
check('apportion: remainders go to the largest fractions, ties to the larger weight', JSON.stringify(site.apportionN(10, { 1: 50, 2: 25, 3: 25 })) === JSON.stringify({ 1: 5, 2: 3, 3: 2 }) || JSON.stringify(site.apportionN(10, { 1: 50, 2: 25, 3: 25 })) === JSON.stringify({ 1: 5, 2: 2, 3: 3 }));
const picked = site.pickPractice(m, 20);
check('practice picks twenty bank questions, none from the untested domain, none duplicated', picked.length === 20 && new Set(picked.map(q => q.id)).size === 20 && picked.every(q => (m.domains[q.lesson.domain] || {}).pct > 0), picked.length);
check('practice is deterministic', JSON.stringify(site.pickPractice(m, 20).map(q => q.id)) === JSON.stringify(picked.map(q => q.id)));
check('practice-test page written', exists('mini/practice-test/index.html'));
const pt = read('mini/practice-test/index.html');
check('practice page has twenty items with four options and a details answer each', (pt.match(/<li class="q">/g) || []).length === 20 && (pt.match(/<details>/g) || []).length === 20 && (pt.match(/<li class="opt">/g) || []).length === 80);
check('every shown answer letter matches the bank', picked.every(q => pt.includes(`<strong>Answer: ${'ABCD'[q.c]}.</strong>`)));
const qld = [...pt.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('practice JSON-LD: a Quiz with twenty Questions, then a BreadcrumbList', qld[0]['@type'] === 'Quiz' && qld[0].hasPart.length === 20 && qld[0].hasPart.every(p => p['@type'] === 'Question' && p.acceptedAnswer && p.acceptedAnswer.text) && qld[1]['@type'] === 'BreadcrumbList');
check('practice page links the app and the landing page', pt.includes('href="/mini/app/"') && pt.includes('href="/mini/"'));

check('site.css, robots.txt and sitemap.xml written at the root', exists('site.css') && exists('robots.txt') && exists('sitemap.xml'));

const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
const expected = ['https://example.test/', 'https://example.test/mini/', 'https://example.test/mini/practice-test/', 'https://example.test/mini/lessons/', 'https://example.test/mini/cheatsheet/', 'https://example.test/guides/', 'https://example.test/guides/sample-guide/'].concat(m.freeLessons.map(l => 'https://example.test' + m.urls.lesson(l)));
check('sitemap lists home, the app, the landing page, the cheat sheet and every free lesson, once each', locs.length === expected.length && expected.every(u => locs.includes(u)) && new Set(locs).size === locs.length, locs.join(' '));
check('robots.txt allows crawling and names the sitemap', /Allow: \/\n/.test(read('robots.txt')) && read('robots.txt').includes('Sitemap: https://example.test/sitemap.xml'));

const l0 = m.freeLessons[0]; const p0 = read(`mini/lessons/${site.slug(l0)}/index.html`);
check('lesson title tag: lesson | exam | brand', p0.includes(`<title>${esc(l0.title)} | Mini Exam MC-1 | FieldReady Academy</title>`));
check('lesson canonical URL', p0.includes(`<link rel="canonical" href="https://example.test${m.urls.lesson(l0)}">`));
check('lesson body is on the page', p0.includes(R.renderBody(l0.body)));
check('deep explanation is on the page when the pack has one', !m.deep[l0.id] || p0.includes(R.renderBody(m.deep[l0.id])));
check('lesson links into the app at its own lesson', p0.includes(`href="/mini/app/#lesson/${l0.id}"`));
const lds = [...p0.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('lesson JSON-LD parses: an Article and a BreadcrumbList', lds.length === 2 && lds[0]['@type'] === 'Article' && lds[1]['@type'] === 'BreadcrumbList' && lds[0].headline === l0.title, lds.map(x => x['@type']).join(','));
check('lesson description is under 160 characters and not empty', (p0.match(/<meta name="description" content="([^"]*)">/) || [])[1].length > 0 && (p0.match(/<meta name="description" content="([^"]*)">/) || [])[1].length < 160);
const last = m.freeLessons[m.freeLessons.length - 1]; const pLast = read(`mini/lessons/${site.slug(last)}/index.html`);
check('the last free lesson has no next link to a non-free lesson', !nonFree.some(l => pLast.includes(m.urls.lesson(l))));

const course = read('mini/lessons/index.html');
const cld = [...course.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('course page JSON-LD is a Course with a provider', cld[0] && cld[0]['@type'] === 'Course' && cld[0].provider && cld[0].provider.name === 'FieldReady Academy');
check('course page links every free lesson and names every unit', m.freeLessons.every(l => course.includes(`href="${m.urls.lesson(l)}"`)) && m.units.every(u => course.includes(esc(u.title))));
check('course page lists non-free lessons as titles without links', nonFree.every(l => course.includes(esc(l.title)) && !course.includes(`href="${m.urls.lesson(l)}"`)));
const labLesson = m.freeLessons.find(l => l.lab); const plainLesson = m.freeLessons.find(l => !l.lab);
check('mini: the fixture has a free lab lesson and a free plain lesson', !!labLesson && !!plainLesson);
const pLab = read(`mini/lessons/${site.slug(labLesson)}/index.html`); const pPlain = read(`mini/lessons/${site.slug(plainLesson)}/index.html`);
check('a lab lesson page carries the lab note after the hook', pLab.includes('<p class="lab-note">This lesson includes an interactive lab in the course.</p>') && pLab.indexOf('class="hook"') < pLab.indexOf('class="lab-note"'));
check('a lesson without a lab has no note', !pPlain.includes('lab-note'));
check('the lessons index marks the lab lesson', course.includes(`${esc(labLesson.title)}</a> <span class="muted">${labLesson.minutes} min</span> <span class="muted">lab</span>`), course.slice(course.indexOf(esc(labLesson.title)), course.indexOf(esc(labLesson.title)) + 120));
const cheat = read('mini/cheatsheet/index.html');
check('cheat sheet page has every section and the PDF link', m.cheatsheet.sections.every(s => cheat.includes(`id="cs-${s.id}"`)) && cheat.includes('href="/mini/cheatsheet.pdf"'));
const all = [course, cheat].concat(m.freeLessons.map(l => read(`mini/lessons/${site.slug(l)}/index.html`)));
check('no undefined or [object leaks into any page', !all.some(h => /undefined|\[object /.test(h)));
check('every page carries og:title, og:url and a canonical', all.every(h => /property="og:title"/.test(h) && /property="og:url"/.test(h) && /rel="canonical"/.test(h)));

check('guides index written', exists('guides/index.html') && read('guides/index.html').includes('href="/guides/sample-guide/"'));
check('guide page written with its title escaped', exists('guides/sample-guide/index.html') && read('guides/sample-guide/index.html').includes('<h1>A Sample Guide &amp; More</h1>'));
const gp = read('guides/sample-guide/index.html');
check('guide renders the mini-markup body', gp.includes('<h3>A heading</h3>') && gp.includes('<strong>bold</strong>') && gp.includes('<code>code</code>'));
check('guide links its related course landing page and lesson', gp.includes('href="/mini/"') && gp.includes(`href="${m.urls.lesson(m.lessons[0])}"`));
const gld = [...gp.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('guide JSON-LD: Article, FAQPage, BreadcrumbList', gld.map(x => x['@type']).join(',') === 'Article,FAQPage,BreadcrumbList' && gld[0].dateModified === '2026-10-13');

// ----- 3. Escaping and slugs -----
const fake = {
  course: { id: 'fake', name: 'Fake & Co', exam: { title: 'Fake <Exam>', code: 'F-1' }, description: 'Desc & "quotes".', domains: [{ id: 1, name: 'D', short: 'D', pct: 100 }], free: { lessons: 1 }, test: {} },
  units: [{ id: 'u1', n: 1, title: 'A & B', lessons: [
    { id: 'u1l1', title: 'Tom & Jerry <script>', domain: 1, obj: '1.1', minutes: 3, body: 'One & two <b>.', hook: 'H & h' },
    { id: 'u1l2', title: 'Hidden', domain: 1, obj: '1.2', minutes: 3, body: 'x', hook: 'y' }
  ] }],
  cheatsheet: { title: 'Sheet & Co', intro: 'I', sections: [{ id: 's1', title: 'S', blocks: [{ type: 'note', text: 'N & n' }] }] },
  deep: {}
};
const out2 = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-'));
site.buildCourse(fake, { out: out2, origin: 'https://example.test' });
const fp = fs.readFileSync(path.join(out2, 'fake', 'lessons', 'u1l1-tom-jerry-script', 'index.html'), 'utf8');
check('slug is the id plus the hyphenated title', site.slug(fake.units[0].lessons[0]) === 'u1l1-tom-jerry-script');
check('title and body text are HTML-escaped', fp.includes('<title>Tom &amp; Jerry &lt;script&gt; |') && fp.includes('<p>One &amp; two &lt;b&gt;.</p>') && !fp.includes('<script>'.replace('<', '<') + 'alert'));
const ldBlocks = [...fp.matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)].map(x => x[1]);
check('JSON-LD escapes < so a title cannot close the script tag', ldBlocks.length > 0 && ldBlocks.every(b => !/<script/i.test(b)) && fp.includes('\\u003cscript>'), ldBlocks.length);
check('a description with quotes is attribute-safe', fp.includes('content="One &amp; two &lt;b&gt;."'));

// ----- 3. Analytics snippet -----
{
  const dirs = [];
  const build = (analytics) => { const o = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-ga-')); dirs.push(o); site.buildAll({ courseDirs: [mini], out: o, origin: 'https://example.test/', analytics }); return fs.readFileSync(path.join(o, 'mini', 'lessons', 'index.html'), 'utf8'); };
  const withId = build('G-TEST1234');
  const n = (withId.match(/googletagmanager\.com\/gtag\/js\?id=G-TEST1234/g) || []).length;
  check('with an ID, a static page carries the gtag snippet once, inside <head>', n === 1 && withId.indexOf('gtag/js?id=G-TEST1234') < withId.indexOf('</head>') && withId.includes("gtag('config','G-TEST1234')"), n);
  check('with an empty ID, a static page never mentions googletagmanager', !build('').includes('googletagmanager'));
  let threw = null; try { build('UA-12345-1'); } catch (e) { threw = e.message; }
  check('a malformed ID fails the static build', !!threw && /G-XXXXXXXXXX/.test(threw), threw);
  for (const d of dirs) fs.rmSync(d, { recursive: true, force: true });
}

fs.rmSync(out, { recursive: true, force: true }); fs.rmSync(out2, { recursive: true, force: true });
console.log(fails.length ? `\n${fails.length} FAILED` : '\nALL PASS');
process.exit(fails.length ? 1 : 0);
