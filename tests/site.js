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
  const lp = site.landingPage(m, R, 'https://example.test', []);
  check(`${m.c.id}: landing without siblings has no related-courses section`, !lp.includes('<section class="related">'));
  const sib = { c: { id: 'other', name: 'Other Academy', exam: { title: 'Other Exam' } }, urls: { landing: '/other/', practice: '/other/practice-test/' } };
  const lp2 = site.landingPage(m, R, 'https://example.test', [], [sib]);
  check(`${m.c.id}: landing lists a sibling course with its exam and practice test`, lp2.includes('<section class="related"><h2>More ') && lp2.includes('<a href="/other/">Other Academy</a> <span class="muted">Other Exam</span>') && lp2.includes('href="/other/practice-test/"'));
  check(`${m.c.id}: landing carries the manifest seo title, h1, and phrases`, !m.seo || (lp.includes(`<title>${esc(m.seo.title)}</title>`) && lp.includes(`<h1>${esc(m.seo.h1)}</h1>`) && (m.seo.phrases || []).every(p => lp.toLowerCase().includes(p.toLowerCase()))));
  w.close();
}

// ----- 2. Generator output on the mini fixture -----
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-'));
const mini = path.join(ROOT, 'tests', 'fixtures', 'mini');
const res = site.buildAll({ courseDirs: [mini], allCourseDirs: [mini], out, origin: 'https://example.test/', guidesDir: path.join(ROOT, 'tests', 'fixtures', 'guides'), serviceforge: false });
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
check('landing forwards hash routes to the app, keeping index.html and the query string, before anything else in head', landing.indexOf("location.replace(location.pathname.replace(/(index\\.html)?\\/?$/,'/')+'app/'+location.search+location.hash)") > 0 && landing.indexOf('location.replace') < landing.indexOf('<link rel="stylesheet"'));
check('landing links the app, the practice test, the lessons index and the cheat sheet', landing.includes('href="/mini/app/"') && landing.includes('href="/mini/practice-test/"') && landing.includes('href="/mini/lessons/"') && landing.includes('href="/mini/cheatsheet/"'));
check('landing lists every free lesson', m.freeLessons.every(l => landing.includes(`href="${m.urls.lesson(l)}"`)));
check('landing links its related guide in a Guides section, and the nav carries a Guides link', landing.includes('href="/guides/sample-guide/"') && landing.includes('href="/guides/"'));
const lld = [...landing.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('landing JSON-LD: Course, FAQPage, BreadcrumbList', lld.map(x => x['@type']).join(',') === 'Course,FAQPage,BreadcrumbList', lld.map(x => x['@type']).join(','));
check('landing has an exam facts table with the vendor, format, and every domain weight', landing.includes('id="exam-facts"') && landing.includes('<th scope="row">Vendor</th>') && landing.includes('<th scope="row">Format</th>') && m.c.domains.every(d => landing.includes(`<th scope="row">${esc(d.name)}</th><td>${d.pct}%</td>`)));
const cfStart = landing.indexOf('id="course-facts"');
const courseFactsHtml = cfStart < 0 ? '' : landing.slice(cfStart, landing.indexOf('</table>', cfStart));
check('landing has a course facts table with lessons, questions, and cost', cfStart > 0 && courseFactsHtml.includes('<th scope="row">Lessons</th>') && courseFactsHtml.includes('<th scope="row">Questions</th>') && courseFactsHtml.includes('<th scope="row">Cost</th><td>Free</td>'));
const faqLd = lld.find(x => x['@type'] === 'FAQPage');
const onExam = faqLd.mainEntity.find(e => /^What is on the/.test(e.name));
check('landing FAQ asks what is on the exam and its answer lists every domain with its weight', !!onExam && m.c.domains.every(d => onExam.acceptedAnswer.text.includes(`${d.name} (${d.pct}%)`)), onExam && onExam.acceptedAnswer.text);
check('landing FAQ falls back to exam facts when the manifest has none', faqLd.mainEntity.length >= 3);
check('landing has no fee row and no cost question when the manifest sets no exam.fee', !m.c.exam.fee && !landing.includes('<th scope="row">Fee</th>') && !faqLd.mainEntity.some(e => /exam cost|How much does/.test(e.name)));
const FEE = site.loadPack(mini);
FEE.course = Object.assign({}, FEE.course, { exam: Object.assign({}, FEE.course.exam, { fee: '2026: $1 member' }) });
const feeLanding = site.landingPage(site.model(FEE), R, 'https://example.test', []);
const feeFaq = JSON.parse([...feeLanding.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => x[1]).find(s => JSON.parse(s)['@type'] === 'FAQPage'));
check('landing shows a Fee row and a cost question when the manifest sets exam.fee', feeLanding.includes('<th scope="row">Fee</th><td>2026: $1 member</td>') && feeFaq.mainEntity.some(e => /cost/i.test(e.name) && e.acceptedAnswer.text.includes('2026: $1 member')));
const OWN = site.loadPack(mini);
OWN.course = Object.assign({}, OWN.course, { seo: Object.assign({}, OWN.course.seo || {}, { faq: [{ q: 'Own question?', a: 'Own answer.' }] }) });
const ownLanding = site.landingPage(site.model(OWN), R, 'https://example.test', []);
check('a manifest with its own seo.faq keeps it and still gets the exam entry', ownLanding.includes('Own question?') && ownLanding.includes('What is on the'));
const COSTQ = site.loadPack(mini);
COSTQ.course = Object.assign({}, COSTQ.course, { exam: Object.assign({}, COSTQ.course.exam, { fee: '$1' }), seo: Object.assign({}, COSTQ.course.seo || {}, { faq: [{ q: 'How much does the exam cost?', a: 'A little.' }] }) });
const costqFaq = JSON.parse([...site.landingPage(site.model(COSTQ), R, 'https://example.test', []).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => x[1]).find(s => JSON.parse(s)['@type'] === 'FAQPage'));
check('a manifest that already asks a cost question does not get a second one', costqFaq.mainEntity.filter(e => /cost/i.test(e.name)).length === 1 && costqFaq.mainEntity.length === 2);
check('landing carries og:image and is indexable', landing.includes('property="og:image" content="https://example.test/og-image.png"') && !landing.includes('name="robots"'));

const cu = site.courseUrls(m);
check('courseUrls lists the landing, practice, lessons index, cheat sheet, the PBQ page, the flashcards page and every free lesson, landing first', cu.length === 6 + m.freeLessons.length && cu[0] === m.urls.landing && cu.includes(m.urls.practice) && cu.includes(m.urls.course) && cu.includes(m.urls.cheat) && cu.includes(m.urls.pbq) && cu.includes(m.urls.flashcards) && m.freeLessons.every(l => cu.includes(m.urls.lesson(l))), cu.length);

check('apportion: twenty across 40/30/30 is 8/6/6', JSON.stringify(site.apportionN(20, { 1: 40, 2: 30, 3: 30 })) === JSON.stringify({ 1: 8, 2: 6, 3: 6 }));
check('apportion: remainders go to the largest fractions, ties to the larger weight', JSON.stringify(site.apportionN(10, { 1: 50, 2: 25, 3: 25 })) === JSON.stringify({ 1: 5, 2: 3, 3: 2 }) || JSON.stringify(site.apportionN(10, { 1: 50, 2: 25, 3: 25 })) === JSON.stringify({ 1: 5, 2: 2, 3: 3 }));
const picked = site.pickPractice(m, 20);
check('practice picks twenty bank questions, none from the untested domain, none duplicated', picked.length === 20 && new Set(picked.map(q => q.id)).size === 20 && picked.every(q => (m.domains[q.lesson.domain] || {}).pct > 0), picked.length);
check('practice is deterministic', JSON.stringify(site.pickPractice(m, 20).map(q => q.id)) === JSON.stringify(picked.map(q => q.id)));
check('practice-test page written', exists('mini/practice-test/index.html'));
const pt = read('mini/practice-test/index.html');
check('practice page h1 and title lead with the exam name', pt.includes('<h1>Mini Exam MC-1 Practice Test: 20 Free Questions with Answers</h1>') && pt.includes('<title>Mini Exam MC-1 Practice Test: 20 Free Questions with Answers | FieldReady Academy</title>'));
check('practice page has twenty items with four options and a details answer each', (pt.match(/<li class="q">/g) || []).length === 20 && (pt.match(/<details>/g) || []).length === 20 && (pt.match(/<li class="opt">/g) || []).length === 80);
check('every shown answer letter matches the bank', picked.every(q => pt.includes(`<strong>Answer: ${'ABCD'[q.c]}.</strong>`)));
const qld = [...pt.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('practice JSON-LD: a Quiz about the exam, with twenty practice-problem Questions whose suggestedAnswer is the three distractors, then a BreadcrumbList',
  qld[0]['@type'] === 'Quiz' && qld[0].about && qld[0].about['@type'] === 'Thing' && qld[0].about.name === 'Mini Exam MC-1' &&
  qld[0].hasPart.length === 20 &&
  qld[0].hasPart.every(p => p['@type'] === 'Question' && p.learningResourceType === 'Practice problem' && Array.isArray(p.suggestedAnswer) && p.suggestedAnswer.length === 3 && p.acceptedAnswer && p.acceptedAnswer.text && !p.suggestedAnswer.some(a => a.text === p.acceptedAnswer.text)) &&
  qld[1]['@type'] === 'BreadcrumbList');
check('practice page links the app and the landing page', pt.includes('href="/mini/app/"') && pt.includes('href="/mini/"'));

check('pbq page written for a course with PBQs', exists('mini/pbq/index.html'));
const pb = read('mini/pbq/index.html');
check('pbq page h1 and title lead with the exam name and PBQ Practice', pb.includes('<h1>Mini Exam MC-1 PBQ Practice</h1>') && pb.includes('<title>Mini Exam MC-1 PBQ Practice | Mini Course</title>'));
check('pbq page renders the seo PBQ with scenario, log, every task, the expected answer, and the why', (pb.match(/<section class="pbq">/g) || []).length === 1 && pb.includes('<pre class="pbq-log">') && (pb.match(/<li class="pbq-task">/g) || []).length === 6 && pb.includes('Expected: 1. Identify the problem; 2. Establish a theory; 3. Test the theory; 4. Establish a plan') && pb.includes('notconnect is the only line'));
check('pbq page inlines the scenario svg inside the pbq-fig figure', pb.includes('<div class="pbq-fig"><svg') && pb.includes('</svg></div>'));
const pbqLesson = m.lessons.find(l => l.id === m.pbqs['mini-net'].lesson);
check('pbq page links the lesson behind the PBQ', pb.includes('From the lesson') && pb.includes(`href="${m.urls.lesson(pbqLesson)}"`));
const pbqAlso = m.lessons.find(l => l.id === m.pbqs['mini-net'].also);
check('pbq page links the see-also lesson after the lesson', pb.includes('See also <a href="') && pb.includes(`${m.free.has(pbqAlso.id) ? m.urls.lesson(pbqAlso) : m.urls.inApp(pbqAlso)}">${pbqAlso.title}</a>`));
check('pbq page carries the phrases, the FAQ, and the app link', pb.includes('Mini Exam PBQs') && pb.includes('MC-1 performance-based questions') && pb.includes('How many PBQs') && pb.includes('href="/mini/app/#pbq"'));
const pld = [...pb.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('pbq JSON-LD: a Quiz with one Question per task, an FAQPage, and a BreadcrumbList', pld[0]['@type'] === 'Quiz' && pld[0].hasPart.length === 6 && pld[1]['@type'] === 'FAQPage' && pld[2]['@type'] === 'BreadcrumbList', pld.map(x => x['@type']).join(','));
check('pbq FAQ drops the unpublished points-weighting claim, in the visible copy and the FAQPage JSON-LD', !/points/i.test(pb) && !/worth more/i.test(pb) && pld[1].mainEntity.every(q => !/points/i.test(q.acceptedAnswer.text) && !/worth more/i.test(q.acceptedAnswer.text)));
check('landing page has the PBQ section and link', read('mini/index.html').includes('Performance-based questions') && read('mini/index.html').includes('href="/mini/pbq/"'));
check('practice page links the PBQ page', pt.includes('href="/mini/pbq/"'));
check('sitemap lists the pbq page', read('sitemap.xml').includes('/mini/pbq/</loc>'));
check('courseUrls omits pbq for a course without PBQs', !site.courseUrls(Object.assign({}, m, { pbqs: {} })).includes('/mini/pbq/'));

check('flashcards page written at the course URL', exists('mini/flashcards/index.html'));
const fc = read('mini/flashcards/index.html');
const acrCount = Object.keys(FRA.acronyms || {}).length;
check('flashcards: every acronym is a card in the acronyms deck', acrCount === 0 ? !fc.includes('data-deck="acronyms"') : fc.includes('<section class="deck" data-deck="acronyms">') && Object.keys(FRA.acronyms).every(k => fc.includes(`<dt>${esc(k)}</dt>`)));
const twoCol = m.cheatsheet.sections.flatMap(s => s.blocks.filter(b => b.type === 'table' && b.cols.length === 2).flatMap(b => b.rows.filter(r => String(r[0]).length <= 80)));
const wideRows = m.cheatsheet.sections.flatMap(s => s.blocks.filter(b => b.type === 'table' && b.cols.length > 2).flatMap(b => b.rows));
check('flashcards: every two-column cheat sheet row is a card', twoCol.length > 0 && twoCol.every(r => fc.includes(`<dt>${esc(String(r[0]))}</dt>`)));
check('flashcards: rows of wider tables are not cards', wideRows.every(r => !fc.includes(`<dt>${esc(String(r[0]))}</dt>`)));
check('flashcards: the title carries the card count and the viewer is inlined', fc.includes(`Flashcards: ${acrCount + twoCol.length} cards`) && fc.includes("var KEY='fra.mini.flashcards'"));
const fld = [...fc.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('flashcards JSON-LD: a LearningResource, an FAQPage, and a BreadcrumbList (no DefinedTermSet without acronyms)', fld.map(x => x['@type']).join(',') === (acrCount ? 'LearningResource,DefinedTermSet,FAQPage,BreadcrumbList' : 'LearningResource,FAQPage,BreadcrumbList'), fld.map(x => x['@type']).join(','));
check('nav and sitemap carry the flashcards URL', fc.includes('href="/mini/flashcards/" aria-current="page"') && read('sitemap.xml').includes('/mini/flashcards/</loc>') && landing.includes('href="/mini/flashcards/"'));
check('flashcards: the viewer is hidden until its script runs, so the page reads without JavaScript', fc.includes('<div class="card fc-viewer" id="fc-viewer" hidden>') && (fc.match(/<div class="fc"><dt>/g) || []).length === acrCount + twoCol.length);
{
  // catalog.css gives .card display:flex, which beats the hidden attribute, so the viewer needs its own
  // [hidden] rule. Both stylesheets inlined, no scripts: the viewer computes to display none; without the
  // site.css rule it would compute to flex (the control shows the check can fail).
  const { JSDOM } = require('jsdom');
  const catalogCss = fs.readFileSync(path.join(ROOT, 'catalog.css'), 'utf8'); const siteCss = fs.readFileSync(path.join(ROOT, 'site', 'site.css'), 'utf8');
  const displayOf = css => { const w = new JSDOM(fc.replace('</head>', `<style>${catalogCss}\n${css}</style></head>`)).window; const v = w.document.getElementById('fc-viewer'); const out = v.hidden && w.getComputedStyle(v).display; w.close(); return out; };
  const noJs = displayOf(siteCss); const control = displayOf(siteCss.replace(/\.fc-viewer\[hidden\][^}]*\}/, ''));
  check('flashcards: without JavaScript the viewer computes to display none under catalog.css and site.css', /\.fc-viewer\[hidden\] \{ display: none; \}/.test(siteCss) && noJs === 'none' && control === 'flex', `${noJs}/${control}`);
}
check('flashcards: the lede carries "<exam> flashcards" and the title and description the code', fc.includes('Mini Exam flashcards from the course') && fc.includes('<title>Mini Exam MC-1 Flashcards:') && fc.includes('Free Mini Exam MC-1 flashcards:'));
check('flashcards: the description and the FAQ count the decks with their names as written', fc.includes(`${m.flashcards.total}: ${m.flashcards.decks.map(d => `${d.cards.length} ${d.name}`).join(', ')}.`) && fc.includes('1 Section One'));
check('flashcards: every storage access is inside a try',!/localStorage/.test(fc.replace(/try\{[^}]*localStorage[^}]*\}/g, '')));
check('flashcards page is plain ASCII with no undefined or [object leaks', /^[\x00-\x7f]*$/.test(fc) && !/undefined|\[object /.test(fc));
check('landing has a Flashcards section linking the page with the count', landing.includes('<section id="flashcards">') && landing.includes(`href="/mini/flashcards/"`) && landing.includes(`${m.flashcards.total} cards`));
check('practice and PBQ pages link the flashcards', read('mini/practice-test/index.html').includes('href="/mini/flashcards/"') && pb.includes('href="/mini/flashcards/"'));
{
  // The mini fixture has no glossary and one small table, so the deck rules run on a widened copy:
  // an acronym deck, a three-column table, and a first cell over 80 characters.
  const ACR = site.loadPack(mini);
  // SSH: a full ending in a period and a tip with an ellipsis; STP: a second meaning; ms: a lowercase key.
  ACR.acronyms = { SSH: { full: 'Secure Shell.', tip: 'Encrypted remote login...' }, 'A&B': { full: 'Ampersand test' }, STP: { full: 'Spanning Tree Protocol', tip: 'Stops switching loops.', alt: { full: 'Shielded twisted pair', tip: 'Cable with a grounded shield.' } }, ms: { full: 'Milliseconds' } };
  ACR.cheatsheet = { title: 'S', intro: 'I', sections: [
    { id: 'pairs', title: 'Pairs', blocks: [{ type: 'table', cols: ['Term', 'Meaning'], rows: [['Short', 'ok'], ['x'.repeat(81), 'too long'], ['x'.repeat(80), 'just fits']] }, { type: 'table', cols: ['A', 'B', 'C'], rows: [['WideOnly', 'b', 'c']] }] },
    { id: 'wide', title: 'Wide', blocks: [{ type: 'table', cols: ['A', 'B', 'C'], rows: [['AlsoWide', 'b', 'c']] }, { type: 'note', text: 'n' }] }
  ] };
  const am = site.model(ACR); const fd = site.flashcardDecks(am);
  const backOf = k => (fd.decks[0].cards.find(x => x.front === k) || {}).back;
  check('flashcardDecks: acronyms first, sorted without regard to case, back is full then tip', fd.decks[0].slug === 'acronyms' && fd.decks[0].cards.map(x => x.front).join(',') === 'A&B,ms,SSH,STP' && backOf('A&B') === 'Ampersand test' && backOf('ms') === 'Milliseconds', fd.decks[0].cards.map(x => x.front).join(','));
  check('flashcardDecks: a full ending in a period joins its tip with one period and an ellipsis in a tip survives', backOf('SSH') === 'Secure Shell. Encrypted remote login...', backOf('SSH'));
  check('flashcardDecks: a key with a second meaning carries both on its back', backOf('STP') === 'Spanning Tree Protocol. Stops switching loops. Also: Shielded twisted pair. Cable with a grounded shield.', backOf('STP'));
  check('flashcardDecks: a two-column table is a deck named for its section, the 81-character row is skipped, the 80-character row kept', fd.decks.length === 2 && fd.decks[1].slug === 'pairs' && fd.decks[1].name === 'Pairs' && fd.decks[1].cards.map(x => x.back).join(',') === 'ok,just fits', JSON.stringify(fd.decks.map(d => d.slug)));
  check('flashcardDecks: wider tables are never cards and a section with only wide tables is no deck', !fd.decks.some(d => d.cards.some(x => /Wide/.test(x.front))) && !fd.decks.some(d => d.slug === 'wide') && fd.total === 6 && am.flashcards.total === 6);
  const afc = site.flashcardsPage(am, makeRenderer(ACR.acronyms), 'https://example.test');
  check('flashcards page with acronyms: the acronyms deck escapes its keys and the JSON-LD has a DefinedTermSet', afc.includes('<section class="deck" data-deck="acronyms">') && afc.includes('<dt>A&amp;B</dt>') && afc.includes('"LearningResource"') && afc.includes('"DefinedTermSet"') && afc.includes('Flashcards: 6 cards'));
  const termSet = [...afc.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1])).find(x => x['@type'] === 'DefinedTermSet');
  const stpTerm = termSet && termSet.hasDefinedTerm.find(t => t.termCode === 'STP');
  check('flashcards page: both meanings of a two-meaning key are on its card and in its DefinedTerm', afc.includes('<dt>STP</dt><dd>Spanning Tree Protocol. Stops switching loops. Also: Shielded twisted pair. Cable with a grounded shield.</dd>') && !!stpTerm && /Also: Shielded twisted pair/.test(stpTerm.description));
  check('flashcards page: the FAQ counts each deck under its own name', afc.includes('6: 4 Acronyms, 2 Pairs.'));
  {
    // The inline viewer, run in jsdom: it shows, flips, and stores "Got it" under fra.<id>.flashcards.
    const { JSDOM } = require('jsdom');
    const KEY = 'fra.mini.flashcards';
    const open = (preset, storage) => new JSDOM(afc, { runScripts: 'dangerously', url: 'https://example.test/mini/flashcards/', beforeParse(w) {
      if (storage === 'throws') Object.defineProperty(w, 'localStorage', { get() { throw new Error('blocked'); } });
      else if (preset !== undefined) w.localStorage.setItem(KEY, preset);
    } });
    const dom = open();
    const d = dom.window.document; const $ = id => d.getElementById(id); const text = id => $(id).textContent;
    const stored = () => JSON.parse(dom.window.localStorage.getItem(KEY) || '{}');
    const shown = !$('fc-viewer').hidden && text('fc-front') === 'A&B' && $('fc-back').hidden;
    $('fc-card').click(); const flipped = $('fc-front').hidden && !$('fc-back').hidden && text('fc-back') === 'Ampersand test';
    $('fc-know').click(); const s1 = stored();
    check('flashcards viewer: shows the first card, flips it, and remembers Got it by content in fra.mini.flashcards', shown && flipped && s1.acronyms && s1.acronyms['A&B = Ampersand test'] === 1 && Object.keys(s1.acronyms).length === 1 && text('fc-front') === 'ms' && text('fc-count') === '1 of 3 left, 1 known', text('fc-count') + ' ' + JSON.stringify(s1));
    $('fc-prev').click(); const prevWrap = text('fc-front') === 'STP' && text('fc-count') === '3 of 3 left, 1 known';
    $('fc-next').click(); const nextWrap = text('fc-front') === 'ms' && text('fc-count') === '1 of 3 left, 1 known';
    check('flashcards viewer: Previous before the first card wraps to the last, Next past the last wraps to the first', prevWrap && nextWrap, text('fc-front') + ' ' + text('fc-count'));
    $('fc-next').click(); $('fc-card').click(); $('fc-deck').value = 'pairs'; $('fc-deck').dispatchEvent(new dom.window.Event('change'));
    check('flashcards viewer: changing the deck starts it at its first card, unflipped', text('fc-front') === 'Short' && !$('fc-front').hidden && $('fc-back').hidden && text('fc-count') === '1 of 2 left, 0 known', text('fc-front') + ' ' + text('fc-count'));
    $('fc-know').click(); $('fc-know').click();
    const emptyMsg = /Every card in this deck is marked known/.test(text('fc-front')) && text('fc-count') === '2 of 2 known' && Object.keys(stored().pairs || {}).length === 2;
    $('fc-next').click(); $('fc-card').click(); const inert = /Every card in this deck/.test(text('fc-front')) && $('fc-back').hidden;
    check('flashcards viewer: marking every card leaves the empty-deck message, and Next and a click do nothing', emptyMsg && inert, text('fc-count'));
    $('fc-reset').click();
    check('flashcards viewer: Reset brings the marked cards back and clears only that deck from storage', text('fc-front') === 'Short' && text('fc-count') === '1 of 2 left, 0 known' && !('pairs' in stored()) && stored().acronyms['A&B = Ampersand test'] === 1, text('fc-count') + ' ' + JSON.stringify(stored()));
    // Space flips from the page body (and is consumed there), but not from a link or another button.
    const space = el => { const e = new dom.window.KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }); el.dispatchEvent(e); return e.defaultPrevented; };
    const link = d.querySelector('nav a, a');
    const onBody = space(d.body) && $('fc-front').hidden && !$('fc-back').hidden;
    const onLink = !space(link) && $('fc-front').hidden; const onButton = !space($('fc-next')) && $('fc-front').hidden;
    check('flashcards viewer: Space flips from the body, and leaves links and other buttons alone', onBody && onLink && onButton, `${onBody}/${onLink}/${onButton}`);
    dom.window.close();
    // Marks follow the card's content, so an old position key marks nothing; corrupt values count as empty.
    const countWith = preset => { const w = open(preset).window; const out = w.document.getElementById('fc-count').textContent; w.close(); return out; };
    check('flashcards viewer: a stored content key marks its card; a position key marks nothing', countWith('{"acronyms":{"SSH = Secure Shell. Encrypted remote login...":1}}') === '1 of 3 left, 1 known' && countWith('{"acronyms":{"0":1}}') === '1 of 4 left, 0 known');
    const corrupt = ['5', '[1]', 'null', '{"acronyms":"abc"}', '{"acronyms":[1]}', 'not json'].map(p => {
      const w = open(p).window; const g = w.document; const before = g.getElementById('fc-count').textContent; g.getElementById('fc-know').click();
      const after = JSON.parse(w.localStorage.getItem(KEY)); const ok = before === '1 of 4 left, 0 known' && after.acronyms && after.acronyms['A&B = Ampersand test'] === 1; w.close(); return ok ? '' : p;
    }).filter(Boolean);
    check('flashcards viewer: corrupt stored values count as empty and Got it still works', corrupt.length === 0, corrupt.join(' | '));
    const blocked = open(undefined, 'throws').window; const bg = blocked.document; bg.getElementById('fc-know').click();
    check('flashcards viewer: with storage blocked it still shows and marks cards in memory', !bg.getElementById('fc-viewer').hidden && bg.getElementById('fc-count').textContent === '1 of 3 left, 1 known', bg.getElementById('fc-count').textContent);
    blocked.close();
  }
  const none = site.model(Object.assign({}, ACR, { acronyms: {}, cheatsheet: { title: 'S', intro: 'I', sections: [{ id: 'w', title: 'W', blocks: [{ type: 'table', cols: ['A', 'B', 'C'], rows: [['1', '2', '3']] }] }] } }));
  {
    // Two tables in one section sharing a first cell: every card from those tables gets the table's second
    // column header; where the tables share that header too, the first column header. Fronts end up unique.
    const DUP = site.loadPack(mini); DUP.acronyms = {};
    DUP.cheatsheet = { title: 'S', intro: 'I', sections: [
      { id: 'settings', title: 'Settings', blocks: [{ type: 'table', cols: ['Applet', 'Purpose'], rows: [['System', 'Name and domain'], ['Mouse', 'Pointer speed']] }, { type: 'table', cols: ['Category', 'Where'], rows: [['System', 'Display and sound']] }, { type: 'table', cols: ['Other', 'Notes'], rows: [['Keyboard', 'Layouts']] }] },
      { id: 'modes', title: 'Modes', blocks: [{ type: 'table', cols: ['Electrosurgery fact', 'Value'], rows: [['Modes', 'Cut and coag']] }, { type: 'table', cols: ['Ventilator fact', 'Value'], rows: [['Modes', 'Volume and pressure']] }] }
    ] };
    const dd = site.flashcardDecks(site.model(DUP)); const fronts = i => dd.decks[i].cards.map(x => x.front).join('|');
    check('flashcardDecks: a shared first cell across two tables gets each table\'s second column header, the other tables untouched', fronts(0) === 'System (Purpose)|Mouse (Purpose)|System (Where)|Keyboard', fronts(0));
    check('flashcardDecks: when the two tables share the second header too, the first column header tells them apart', fronts(1) === 'Modes (Electrosurgery fact)|Modes (Ventilator fact)', fronts(1));
    check('flashcardDecks: every front in a deck is unique', dd.decks.every(k => new Set(k.cards.map(x => x.front)).size === k.cards.length));
  }
  check('a course with no cards gets no flashcards URL and no nav link',none.flashcards.total === 0 && !site.courseUrls(none).includes(none.urls.flashcards) && !site.landingPage(none, R, 'https://example.test', []).includes('/flashcards/'));
}

check('site.css, robots.txt and sitemap.xml written at the root', exists('site.css') && exists('robots.txt') && exists('sitemap.xml'));

const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
const expected = ['https://example.test/', 'https://example.test/mini/', 'https://example.test/mini/practice-test/', 'https://example.test/mini/lessons/', 'https://example.test/mini/cheatsheet/', 'https://example.test/mini/pbq/', 'https://example.test/mini/flashcards/', 'https://example.test/guides/', 'https://example.test/guides/sample-guide/'].concat(m.freeLessons.map(l => 'https://example.test' + m.urls.lesson(l)));
check('sitemap lists home, the app, the landing page, the cheat sheet, the PBQ page and every free lesson, once each', locs.length === expected.length && expected.every(u => locs.includes(u)) && new Set(locs).size === locs.length, locs.join(' '));
check('robots.txt allows crawling and names the sitemap', /Allow: \/\n/.test(read('robots.txt')) && read('robots.txt').includes('Sitemap: https://example.test/sitemap.xml'));
check('sitemap entries carry a lastmod date', /<url><loc>[^<]+<\/loc><lastmod>\d{4}-\d{2}-\d{2}<\/lastmod><\/url>/.test(sm) && (sm.match(/<lastmod>/g) || []).length === locs.length);
{
  // A partial build with no allCourseDirs still names every repo course in the shared files.
  const o = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-partial-'));
  site.buildAll({ courseDirs: [mini], out: o, origin: 'https://example.test/', guidesDir: path.join(ROOT, 'tests', 'fixtures', 'guides'), serviceforge: false });
  const psm = fs.readFileSync(path.join(o, 'sitemap.xml'), 'utf8'); const p404 = fs.readFileSync(path.join(o, '404.html'), 'utf8');
  const allIds = site.courseDirs().map(d => path.basename(d));
  check('a partial build without allCourseDirs keeps every repo course in the sitemap and the 404 page, plus the rendered course', allIds.every(id => psm.includes(`<loc>https://example.test/${id}/</loc>`) && p404.includes(`href="/${id}/"`)) && psm.includes('<loc>https://example.test/mini/</loc>') && !fs.existsSync(path.join(o, allIds[0], 'index.html')), allIds.join(','));
  fs.rmSync(o, { recursive: true, force: true });
}
check('the social image and the 404 page are written at the root', exists('og-image.png') && exists('404.html') && read('404.html').includes('<meta name="robots" content="noindex">') && read('404.html').includes('href="/bmet/"') === false);

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
  const build = (analytics) => { const o = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-site-ga-')); dirs.push(o); site.buildAll({ courseDirs: [mini], allCourseDirs: [mini], out: o, origin: 'https://example.test/', analytics, serviceforge: false }); return fs.readFileSync(path.join(o, 'mini', 'lessons', 'index.html'), 'utf8'); };
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
