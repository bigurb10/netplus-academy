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
const res = site.buildAll({ courseDirs: [mini], out, origin: 'https://example.test/' });
const FRA = site.loadPack(mini); const m = site.model(FRA); const R = makeRenderer(FRA.acronyms);
const read = p => fs.readFileSync(path.join(out, p), 'utf8');
const exists = p => fs.existsSync(path.join(out, p));

check('mini: the free lessons are the first free.lessons in course order', m.freeLessons.map(l => l.id).join(',') === m.lessons.slice(0, FRA.course.free.lessons).map(l => l.id).join(','), m.freeLessons.map(l => l.id).join(','));
check('course landing page written', exists('mini/lessons/index.html'));
check('cheat sheet page written', exists('mini/cheatsheet/index.html'));
const nonFree = m.lessons.filter(l => !m.free.has(l.id));
check('one page per free lesson', m.freeLessons.every(l => exists(`mini/lessons/${site.slug(l)}/index.html`)));
check('no page for any lesson beyond the free set', nonFree.length > 0 && !nonFree.some(l => exists(`mini/lessons/${site.slug(l)}/index.html`)), nonFree.length);
check('the course app index is never written by the generator', !exists('mini/index.html'));
check('site.css, robots.txt and sitemap.xml written at the root', exists('site.css') && exists('robots.txt') && exists('sitemap.xml'));

const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
const expected = ['https://example.test/', 'https://example.test/mini/', 'https://example.test/mini/lessons/', 'https://example.test/mini/cheatsheet/'].concat(m.freeLessons.map(l => 'https://example.test' + m.urls.lesson(l)));
check('sitemap lists home, the app, the landing page, the cheat sheet and every free lesson, once each', locs.length === expected.length && expected.every(u => locs.includes(u)) && new Set(locs).size === locs.length, locs.join(' '));
check('robots.txt allows crawling and names the sitemap', /Allow: \/\n/.test(read('robots.txt')) && read('robots.txt').includes('Sitemap: https://example.test/sitemap.xml'));

const l0 = m.freeLessons[0]; const p0 = read(`mini/lessons/${site.slug(l0)}/index.html`);
check('lesson title tag: lesson | exam | brand', p0.includes(`<title>${esc(l0.title)} | Mini Exam MC-1 | FieldReady Academy</title>`));
check('lesson canonical URL', p0.includes(`<link rel="canonical" href="https://example.test${m.urls.lesson(l0)}">`));
check('lesson body is on the page', p0.includes(R.renderBody(l0.body)));
check('deep explanation is on the page when the pack has one', !m.deep[l0.id] || p0.includes(R.renderBody(m.deep[l0.id])));
check('lesson links into the app at its own lesson', p0.includes(`href="/mini/#lesson/${l0.id}"`));
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
const cheat = read('mini/cheatsheet/index.html');
check('cheat sheet page has every section and the PDF link', m.cheatsheet.sections.every(s => cheat.includes(`id="cs-${s.id}"`)) && cheat.includes('href="/mini/cheatsheet.pdf"'));
const all = [course, cheat].concat(m.freeLessons.map(l => read(`mini/lessons/${site.slug(l)}/index.html`)));
check('no undefined or [object leaks into any page', !all.some(h => /undefined|\[object /.test(h)));
check('every page carries og:title, og:url and a canonical', all.every(h => /property="og:title"/.test(h) && /property="og:url"/.test(h) && /rel="canonical"/.test(h)));

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
check('JSON-LD escapes < so a title cannot close the script tag', !/<script type="application\/ld\+json">[^]*?<script>/.test(fp) && fp.includes('\\u003cscript>'));
check('a description with quotes is attribute-safe', fp.includes('content="One &amp; two &lt;b&gt;."'));

fs.rmSync(out, { recursive: true, force: true }); fs.rmSync(out2, { recursive: true, force: true });
console.log(fails.length ? `\n${fails.length} FAILED` : '\nALL PASS');
process.exit(fails.length ? 1 : 0);
