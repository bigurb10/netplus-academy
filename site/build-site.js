#!/usr/bin/env node
'use strict';
// Public SEO pages, generated from the course packs into dist/site/:
//
//   /<id>/                         the landing page (Course + FAQPage JSON-LD); forwards
//                                   #hash routes to the app before anything else loads
//   /<id>/app/                     the course app bundle (noindex; built by build.py, not here)
//   /<id>/practice-test/           twenty free bank questions with answers (Quiz JSON-LD)
//   /<id>/lessons/                 the full lessons index (Course JSON-LD)
//   /<id>/lessons/<id>-<slug>/     one page per FREE lesson (Article + BreadcrumbList)
//   /<id>/cheatsheet/              the memorization sheet as HTML
//   /guides/  /guides/<slug>/      standalone articles not tied to one lesson
//   /404.html                      noindex, links the catalog, the guides, and every course
//   /og-image.png                  the shared social-card image (1200x630)
//   /sitemap.xml  /robots.txt  /site.css
//
// Every URL above (except /<id>/app/, built by build.py) carries a <lastmod> in sitemap.xml.
// Design: docs/superpowers/specs/2026-09-15-public-seo-pages-design.md
//
//   node site/build-site.js            every course under courses/
//   node site/build-site.js netplus    one course (the root files are still written)

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { esc, makeRenderer } = require('./markup');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://fieldreadyacademy.com';
const BRAND = 'FieldReady Academy';
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">';
const ICONS = '<link rel="icon" href="/favicon.ico" sizes="32x32">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">';
// Google Analytics 4: analytics.json is the one place the Measurement ID lives (build.py reads
// the same file). Empty means no snippet on any page.
const ANALYTICS = path.join(ROOT, 'analytics.json');
function gaId() { return (JSON.parse(fs.readFileSync(ANALYTICS, 'utf8')).ga4MeasurementId || '').trim(); }
function gaSnippet(id) {
  if (!id) return '';
  if (!/^G-[A-Z0-9]{4,}$/.test(id)) throw new Error(`analytics.json: ga4MeasurementId must look like G-XXXXXXXXXX, got ${JSON.stringify(id)}`);
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>\n`;
}
let analyticsSnippet = ''; // set by buildCourse for the pages it writes; shell() reads it
const DESC_MAX = 155;

// ---------- loading a pack ----------
function courseFiles(dir) {
  // course.js first so FRA.course exists; the rest alphabetical, the order tests/lib.js uses.
  const all = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  return [...all.filter(f => f === 'course.js'), ...all.filter(f => f !== 'course.js')].map(f => path.join(dir, f));
}

function loadPack(dir) {
  // Pack files are browser scripts that start with `window.FRA = window.FRA || {}` and
  // then use the bare global FRA. A context whose `window` is itself makes both work.
  const ctx = { console };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const f of courseFiles(dir)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
  if (!ctx.FRA || !ctx.FRA.course) throw new Error(`${dir}: no FRA.course after loading the pack`);
  return ctx.FRA;
}

// engine/pbq.js is a browser script that defines window.FRAPbq. The generator needs its
// expectedText() to print each PBQ task's answer in words on the static page, so it is evaluated
// the same way a pack is: once, in its own context, and only for a pack that ships PBQs.
let pbqLib = null;
function pbqText() {
  if (!pbqLib) {
    const file = path.join(ROOT, 'engine', 'pbq.js');
    const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx;
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
    if (!ctx.FRAPbq) throw new Error('engine/pbq.js left no FRAPbq on the window');
    pbqLib = ctx.FRAPbq;
  }
  return pbqLib;
}

function courseDirs() {
  const dir = path.join(ROOT, 'courses');
  return fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, 'course.js'))).map(d => path.join(dir, d));
}

// Guides are standalone articles (exam guides, "how to become", lab explainers) that are not
// tied to one lesson. Same browser-script-via-vm loading as a course pack: each file pushes
// onto FRA.guides.
function loadGuides(dir) {
  if (!dir || !fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  const guides = (ctx.FRA && ctx.FRA.guides) || [];
  guides.forEach(g => { if (!/^[a-z0-9-]+$/.test(g.slug || '')) throw new Error(`guide slug invalid: ${g.slug}`); if (!g.title || !g.body || !g.updated) throw new Error(`guide ${g.slug} needs title, body, updated`); });
  return guides;
}

// ---------- the page model ----------
const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// The id leads so the URL stays stable if a title is edited.
const slug = l => `${l.id}-${slugify(l.title)}`;

// Flashcards come from data the pack already has: the acronym glossary (front: the key, back: what it
// stands for and the tip) and every two-column cheat-sheet table (front: first column, back: second).
// Wider tables are not cards, and a first cell over 80 characters is a sentence, not a prompt.
// A key with a second meaning (`alt`) carries both on its back. When two tables in one section would
// give two cards the same front, every card from those tables gets its table's second column header
// in parentheses ("System (Purpose)"), or its first column header where the two tables share the
// second, so each front in a deck is unique and still reads naturally. "Got it" marks are keyed by
// front and back together, so a duplicate row inside one table still marks only itself.
//
// clashingTables: the indexes of the tables (lists of cards) that share a front with another table.
function clashingTables(tables) {
  const seen = {};
  tables.forEach((cards, ti) => new Set(cards.map(x => x.front)).forEach(f => { (seen[f] = seen[f] || []).push(ti); }));
  const out = new Set();
  Object.keys(seen).forEach(f => { if (seen[f].length > 1) seen[f].forEach(ti => out.add(ti)); });
  return out;
}
function flashcardDecks(m) {
  const decks = [];
  const meaning = a => [String((a && a.full) || '').replace(/\.$/, ''), a && a.tip].filter(Boolean).join('. ');
  const stop = s => (!s || /[.!?]$/.test(s)) ? s : s + '.';
  const acrBack = a => a.alt ? [stop(meaning(a)), 'Also: ' + meaning(a.alt)].filter(Boolean).join(' ') : meaning(a);
  const byKey = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b);
  const acr = Object.keys(m.acronyms || {}).sort(byKey).map(k => ({ front: k, back: acrBack(m.acronyms[k]) }));
  if (acr.length) decks.push({ slug: 'acronyms', name: 'Acronyms', cards: acr });
  ((m.cheatsheet && m.cheatsheet.sections) || []).forEach(s => {
    const tables = (s.blocks || []).filter(b => b.type === 'table' && Array.isArray(b.cols) && b.cols.length === 2)
      .map(b => ({ cols: b.cols.map(String), cards: (b.rows || []).filter(r => String(r[0]).length <= 80).map(r => ({ front: String(r[0]), back: String(r[1]) })) }));
    const label = (t, col) => t.cards.map(x => ({ front: `${x.front} (${t.cols[col]})`, back: x.back }));
    // The second column header first; where the clashing tables share that header too, the first.
    const first = clashingTables(tables.map(t => t.cards));
    let byTable = tables.map((t, ti) => first.has(ti) ? label(t, 1) : t.cards);
    const still = clashingTables(byTable);
    if (still.size) byTable = byTable.map((cards, ti) => still.has(ti) ? label(tables[ti], 0) : cards);
    const cards = byTable.flat();
    if (cards.length) decks.push({ slug: s.id, name: s.title, cards });
  });
  return { decks, total: decks.reduce((n, d) => n + d.cards.length, 0) };
}

function model(FRA) {
  const c = FRA.course;
  const units = (FRA.units || []).slice().sort((a, b) => a.n - b.n);
  const lessons = [];
  units.forEach(u => u.lessons.forEach(l => lessons.push(Object.assign({}, l, { unit: u, index: lessons.length }))));
  // The same rule engine/app.js uses for FREE_SET: an explicit id list, or the first N.
  const free = new Set();
  const f = c.free || {};
  if (Array.isArray(f.lessons)) f.lessons.forEach(id => free.add(id));
  else if (typeof f.lessons === 'number') lessons.slice(0, f.lessons).forEach(l => free.add(l.id));
  const domains = {};
  (c.domains || []).forEach(d => { domains[d.id] = d; });
  const m = {
    c, units, lessons, free, domains,
    freeLessons: lessons.filter(l => free.has(l.id)),
    deep: FRA.deep || {},
    cheatsheet: FRA.cheatsheet || null,
    acronyms: FRA.acronyms || {},
    questions: FRA.questions || [], seo: c.seo || null,
    // A pack without pbqs.js has no PBQ page, no landing section, and no sitemap entry for one.
    pbqs: FRA.pbqs || {},
    pbqText: Object.keys(FRA.pbqs || {}).length ? pbqText() : null,
    urls: {
      landing: `/${c.id}/`,
      app: `/${c.id}/app/`,
      practice: `/${c.id}/practice-test/`,
      course: `/${c.id}/lessons/`,
      cheat: `/${c.id}/cheatsheet/`,
      pbq: `/${c.id}/pbq/`,
      flashcards: `/${c.id}/flashcards/`,
      pdf: `/${c.id}/cheatsheet.pdf`,
      lesson: l => `/${c.id}/lessons/${slug(l)}/`,
      inApp: l => `/${c.id}/app/#lesson/${l.id}`
    }
  };
  m.flashcards = flashcardDecks(m);
  return m;
}

const examName = c => [c.exam && c.exam.title, c.exam && c.exam.code].filter(Boolean).join(' ');

// First real paragraph of a lesson body: not a heading, bullet, step, tip or fence.
function firstParagraph(body) {
  let fenced = false;
  for (const raw of String(body || '').split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) { fenced = !fenced; continue; }
    if (fenced || !line) continue;
    if (/^(## |- |> |\d+\. )/.test(line)) continue;
    return line;
  }
  return '';
}

function shorten(text, max) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 3);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 40)).trim() + '...';
}

// ---------- html ----------
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const org = () => ({ '@type': 'Organization', name: BRAND, url: ORIGIN + '/' });

function shell(p) {
  const url = p.origin + p.path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${p.head || ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${esc(url)}">
${p.noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="${p.type || 'article'}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(p.origin)}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(p.origin)}/og-image.png">
${ICONS}
${FONTS}
<link rel="stylesheet" href="/catalog.css">
<link rel="stylesheet" href="/site.css">
${(p.jsonld || []).map(ld).join('\n')}
${analyticsSnippet}</head>
<body>
<header class="site-head">
  <div class="wrap row spread">
    <a class="brand" href="/"><span class="mark">FR</span> ${BRAND}</a>
    <nav class="site-nav" aria-label="Course">${p.nav || ''}</nav>
  </div>
</header>
<main class="wrap">
${p.body}
</main>
<footer class="wrap muted">${BRAND}. All course content is original. Everything is free while we launch.</footer>
</body>
</html>
`;
}

function nav(m, current) {
  const item = (href, label, cls) => `<a href="${href}"${cls ? ` class="${cls}"` : ''}${current === href ? ' aria-current="page"' : ''}>${label}</a>`;
  return item(m.urls.landing, 'Overview') + item(m.urls.course, 'Lessons') + item(m.urls.practice, 'Practice test') + item(m.urls.cheat, 'Cheat sheet') + (m.flashcards && m.flashcards.total ? item(m.urls.flashcards, 'Flashcards') : '') + item('/guides/', 'Guides') + item(m.urls.app, 'Start the course', 'btn primary small');
}

function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map((it, i) => i === items.length - 1 ? `<span>${esc(it.name)}</span>` : `<a href="${it.href}">${esc(it.name)}</a>`).join('<span class="sep">/</span>')}</nav>`;
}

function breadcrumbLd(origin, items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: origin + it.href }))
  };
}

function ctaCard(m, l) {
  const cp = m.c.test && m.c.test.checkpointN;
  return `<aside class="card cta stack">
  <div class="eyebrow">Keep going</div>
  <h2>Check what you learned</h2>
  <p class="ink2">${cp ? `This lesson's ${cp}-question checkpoint, ` : 'This lesson\'s checkpoint, '}the starter test, every other lesson, and unlimited practice tests are free in the course. Progress saves in your browser, and to your account if you sign in.</p>
  <p><a class="btn primary" href="${l ? m.urls.inApp(l) : m.urls.app}">${l ? 'Open this lesson in the course' : 'Start the free course'}</a> <a class="btn" href="${m.urls.cheat}">Read the cheat sheet</a></p>
</aside>`;
}

function lessonPage(m, l, R, origin) {
  const u = l.unit; const d = m.domains[l.domain] || {};
  const idx = m.freeLessons.indexOf(l);
  const prev = m.freeLessons[idx - 1]; const next = m.freeLessons[idx + 1];
  const description = shorten(R.plain(firstParagraph(l.body)) || R.plain(l.hook), DESC_MAX);
  const deep = m.deep[l.id];
  const crumbList = [
    { name: 'Courses', href: '/' },
    { name: m.c.name, href: m.urls.landing },
    { name: 'Lessons', href: m.urls.course },
    { name: l.title, href: m.urls.lesson(l) }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <div class="row pills">${u ? `<span class="pill accent">Unit ${u.n}</span>` : ''}${d.short ? `<span class="pill">${esc(d.short)}</span>` : ''}${l.obj ? `<span class="pill">Objective ${esc(l.obj)}</span>` : ''}${l.minutes ? `<span class="muted">${l.minutes} min read</span>` : ''}</div>
  <h1>${esc(l.title)}</h1>
  <p class="ink2 lede">${u ? `Unit ${u.n}: ${esc(u.title)}. ` : ''}Lesson ${l.index + 1} of ${m.lessons.length} in ${esc(m.c.name)}.</p>
  <div class="lesson-body">${R.renderBody(l.body)}</div>
  ${l.hook ? `<div class="hook"><span class="eyebrow">Remember</span><div>${R.inline(l.hook)}</div></div>` : ''}
  ${l.lab ? '<p class="lab-note">This lesson includes an interactive lab in the course.</p>' : ''}
  ${deep ? `<section class="deep"><div class="eyebrow">Deeper explanation</div><h2>${esc(l.title)}, explained slowly</h2><div class="lesson-body deep-body">${R.renderBody(deep)}</div></section>` : ''}
</article>
${ctaCard(m, l)}
<nav class="pager" aria-label="Lessons">
  ${prev ? `<a href="${m.urls.lesson(prev)}" rel="prev">&larr; ${esc(prev.title)}</a>` : '<span></span>'}
  <a href="${m.urls.course}">All lessons</a>
  ${next ? `<a href="${m.urls.lesson(next)}" rel="next">${esc(next.title)} &rarr;</a>` : '<span></span>'}
</nav>`;
  const url = m.urls.lesson(l);
  return shell({
    origin, path: url, type: 'article',
    title: `${l.title} | ${examName(m.c) || m.c.name} | ${BRAND}`,
    ogTitle: l.title,
    description,
    nav: nav(m, m.urls.course),
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: l.title, description, url: origin + url, mainEntityOfPage: origin + url,
        articleSection: u ? `Unit ${u.n}: ${u.title}` : undefined, inLanguage: 'en', isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: m.c.name, url: origin + m.urls.course },
        author: org(), publisher: org()
      },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

const HOW = (c) => {
  const t = c.test || {}; const ex = c.exam || {};
  return [
    '<strong>Cheat sheet.</strong> Everything the exam expects you to recall cold, printable.',
    '<strong>Starter test.</strong> A few questions per exam domain, with a confidence rating on each.',
    '<strong>Your tutorial.</strong> Lessons chosen from what you missed or guessed, each with a checkpoint and a deeper explanation.',
    `<strong>Practice tests and retraining.</strong> ${t.questions ? `${t.questions} questions, ` : ''}weighted like the real exam. Every miss is explained and feeds back into your lessons.`,
    `<strong>${t.passesNeeded && t.passWindow ? `${t.passesNeeded} of your last ${t.passWindow}` : 'Enough of your recent tests'}${t.passPct ? ` at ${t.passPct}%` : ''}.</strong> That unlocks one full-length test on the real exam's clock${ex.questions && ex.minutes ? `: ${ex.questions} questions in ${ex.minutes} minutes` : ''}${ex.passPct ? `, at its real passing score of ${ex.passPct}%` : ''}. Pass it once and you are ready to book.`
  ];
};

function coursePage(m, R, origin) {
  const c = m.c; const ex = c.exam || {};
  const totalMin = m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const description = shorten(`${c.description} ${m.lessons.length} lessons, a printable cheat sheet, adaptive tutorials, and unlimited practice tests. Free.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'Lessons', href: m.urls.course }];
  const lessonCount = {}; m.lessons.forEach(l => { lessonCount[l.domain] = (lessonCount[l.domain] || 0) + 1; });
  const facts = [
    // Titles usually already carry the vendor ("CompTIA Network+"); prefix only when not.
    ['Exam', ex.title ? (ex.vendor && !ex.title.startsWith(ex.vendor) ? `${ex.vendor} ${ex.title}` : ex.title) : c.name],
    ex.code ? ['Code', ex.code] : null,
    ex.questions ? ['Questions', `Up to ${ex.questions}`] : null,
    ex.minutes ? ['Time', `${ex.minutes} minutes`] : null,
    c.realExamNote ? ['Passing', c.realExamNote] : null,
    ['Lessons', `${m.lessons.length} lessons across ${m.units.length} units${totalMin ? `, about ${Math.round(totalMin / 60 * 10) / 10} hours of reading` : ''}`]
  ].filter(Boolean);
  const body = `${crumbs(crumbList)}
<div class="course-hero">
  <div class="eyebrow">${esc(examName(c) || 'Course')}</div>
  <h1>Every lesson in ${esc(c.name)}</h1>
  <p class="lede ink2">${esc(c.description)}</p>
  <p class="row"><a class="btn primary lg" href="${m.urls.app}">Start the free course</a> <a class="btn lg" href="${m.urls.cheat}">Read the cheat sheet</a></p>
</div>
<section>
  <h2>The exam</h2>
  <div class="table-wrap"><table class="plain facts"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>
  ${(c.domains || []).length ? `<h3>Exam domains</h3><div class="table-wrap"><table class="plain"><thead><tr><th>Domain</th><th>Weight</th><th>Lessons</th></tr></thead><tbody>${c.domains.map(d => `<tr><td>${esc(d.name)}</td><td>${d.pct != null ? d.pct + '%' : ''}</td><td>${lessonCount[d.id] || 0}</td></tr>`).join('')}</tbody></table></div>` : ''}
</section>
<section>
  <h2>How the course works</h2>
  <ol class="steps">${HOW(c).map(s => `<li>${s}</li>`).join('')}</ol>
</section>
<section id="lessons">
  <h2>Every lesson</h2>
  <p class="ink2">The first ${m.freeLessons.length} lessons are open to read here. Every lesson, with its checkpoint, is free inside the course.</p>
  ${m.units.map(u => `<h3>Unit ${u.n}: ${esc(u.title)}</h3>${u.blurb ? `<p class="ink2 unit-blurb">${esc(u.blurb)}</p>` : ''}<ol class="lesson-list" start="${m.lessons.findIndex(l => l.unit === u) + 1}">${u.lessons.map(ul => { const l = m.lessons.find(x => x.id === ul.id); return m.free.has(l.id) ? `<li><a href="${m.urls.lesson(l)}">${esc(l.title)}</a>${l.minutes ? ` <span class="muted">${l.minutes} min</span>` : ''}${l.lab ? ' <span class="muted">lab</span>' : ''}</li>` : `<li><span>${esc(l.title)}</span> <span class="muted">in the course</span>${l.lab ? ' <span class="muted">lab</span>' : ''}</li>`; }).join('')}</ol>`).join('')}
</section>
${(c.examDay || []).length ? `<section><h2>On exam day</h2><ul class="lesson-body">${c.examDay.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>` : ''}
${ctaCard(m, null)}`;
  return shell({
    origin, path: m.urls.course, type: 'website',
    title: `${c.name} lessons | ${BRAND}`,
    ogTitle: `${c.name}: a free ${ex.title || c.name} course`,
    description,
    nav: nav(m, m.urls.course),
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Course',
        name: c.name, description: c.description, url: origin + m.urls.course,
        about: examName(c) || undefined, inLanguage: 'en', isAccessibleForFree: true,
        provider: org(),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', category: 'Free' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: totalMin ? `PT${totalMin}M` : undefined }
      },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

const FORWARDER = `<script>if(location.hash&&/^#[a-z]/.test(location.hash))location.replace(location.pathname.replace(/(index\\.html)?\\/?$/,'/')+'app/'+location.search+location.hash)</script>`;

function examFaq(m) {
  const c = m.c; const ex = c.exam || {};
  const out = [];
  out.push({ q: `What is on the ${examName(c) || c.name} exam?`, a: `${(c.domains || []).map(d => `${d.name} (${d.pct}%)`).join(', ')}. The course's units follow the same domains, and the practice tests draw on the same domain weights.` });
  if (ex.fee) out.push({ q: `How much does the ${examName(c) || c.name} exam cost?`, a: `${ex.fee}. The fee goes to the certifying body; this course is free.` });
  return out;
}

function defaultFaq(m) {
  const c = m.c; const ex = c.exam || {}; const t = c.test || {};
  const out = [];
  if (ex.questions && ex.minutes) out.push({ q: `How many questions are on the ${examName(c)} exam?`, a: `${ex.questions} questions in ${ex.minutes} minutes.${c.realExamNote ? ' ' + c.realExamNote : ''}` });
  if (t.passesNeeded && t.passWindow && t.passPct) out.push({ q: 'How does the course decide I am ready?', a: `${t.passesNeeded} of your last ${t.passWindow} practice tests at ${t.passPct}% or better, then one full-length test in the real exam's format at its passing score.` });
  out.push(...examFaq(m));
  out.push({ q: 'Is the course free?', a: 'Yes. Every lesson, the cheat sheet, and unlimited practice tests are free while the site launches.' });
  out.push({ q: 'Can I read the lessons without signing in?', a: `The first ${m.freeLessons.length} lessons and the cheat sheet are open on this site; the full course runs in the app.` });
  return out;
}

function landingPage(m, R, origin, guides, siblings) {
  const c = m.c; const ex = c.exam || {}; const seo = m.seo || {};
  const relatedGuides = (guides || []).filter(g => ((g.related && g.related.courses) || []).includes(c.id));
  const h1 = seo.h1 || `${c.name}: ${examName(c) || c.name} study guide and practice tests`;
  const title = seo.title || `${h1} | ${BRAND}`;
  const intro = seo.intro || c.description;
  const baseFaq = Array.isArray(seo.faq) && seo.faq.length ? seo.faq : defaultFaq(m);
  const faq = baseFaq.concat(examFaq(m).filter(e => !baseFaq.some(b => b.q === e.q || (/cost/i.test(e.q) && /cost/i.test(b.q)))));
  const description = shorten(intro, DESC_MAX);
  const totalMin = m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const labs = m.lessons.filter(l => l.lab);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }];
  const hasPbq = Object.keys(m.pbqs || {}).length > 0;
  const examFacts = [
    ex.vendor ? ['Vendor', ex.vendor] : null,
    ['Exam', ex.title || c.name],
    ex.code ? ['Code', ex.code] : null,
    ex.questions ? ['Questions', `${ex.questions}`] : null,
    ex.minutes ? ['Time', `${ex.minutes} minutes`] : null,
    ['Format', hasPbq ? 'Multiple choice plus performance-based questions' : 'Multiple choice'],
    c.realExamNote ? ['Passing', c.realExamNote] : (ex.passPct ? ['Passing', `${ex.passPct}%`] : null),
    ex.fee ? ['Fee', ex.fee] : null
  ].filter(Boolean).concat((c.domains || []).map(d => [d.name, `${d.pct}%`]));
  const courseFacts = [
    ['Lessons', `${m.lessons.length} across ${m.units.length} units${totalMin ? `, about ${Math.round(totalMin / 60 * 10) / 10} hours of reading` : ''}`],
    labs.length ? ['Labs', `${labs.length}`] : null,
    ['Questions', `${m.questions.length}, every one explained`],
    hasPbq ? ['PBQs', `${Object.keys(m.pbqs).length}`] : null,
    m.flashcards && m.flashcards.total ? ['Flashcards', `${m.flashcards.total}`] : null,
    ['Cost', 'Free']
  ].filter(Boolean);
  const factsTable = (id, rows) => `<div class="table-wrap"><table class="plain facts" id="${id}"><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>`;
  const body = `${crumbs(crumbList)}
<div class="course-hero">
  <div class="eyebrow">${esc(BRAND)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">${esc(intro)}</p>
  <p class="row"><a class="btn primary lg" href="${m.urls.app}">Start the free course</a> <a class="btn lg" href="${m.urls.practice}">Try a practice test</a>${Object.keys(m.pbqs || {}).length ? ` <a class="btn lg" href="${m.urls.pbq}">Practice PBQs</a>` : ''} <a class="btn lg" href="${m.urls.cheat}">Read the cheat sheet</a></p>
</div>
<section>
  <h2>The exam at a glance</h2>
  ${factsTable('exam-facts', examFacts)}
  <h2>This course</h2>
  ${factsTable('course-facts', courseFacts)}
</section>
<section>
  <h2>How the course works</h2>
  <ol class="steps">${HOW(c).map(s => `<li>${s}</li>`).join('')}</ol>
</section>
<section id="free-lessons">
  <h2>Read the first ${m.freeLessons.length} lessons here</h2>
  <ol class="lesson-list">${m.freeLessons.map(l => `<li><a href="${m.urls.lesson(l)}">${esc(l.title)}</a> <span class="muted">${l.minutes} min</span></li>`).join('')}</ol>
  <p><a href="${m.urls.course}">Every lesson, by unit</a></p>
</section>
${labs.length ? `<section><h2>Hands-on labs on virtual instruments</h2><p class="ink2">${labs.length} lessons carry a lab: a virtual multimeter on drawn circuits, an electrical safety analyzer, a patient simulator with a monitor, an infusion flow check, and a defibrillator analyzer. The kit labs also run on a $60 to $100 home kit; the instrument labs need nothing but a browser.</p><ul class="lesson-body">${labs.map(l => `<li>${esc(l.title)}</li>`).join('')}</ul><p><a href="/guides/virtual-electrical-safety-analyzer-lab/">How the virtual safety analyzer lab works</a></p></section>` : ''}
${Object.keys(m.pbqs || {}).length ? `<section><h2>Performance-based questions</h2><p class="ink2">${Object.keys(m.pbqs).length} interactive PBQs: ${esc(((m.seo && m.seo.pbqPhrases) || []).join(', ') || 'drag, match, select, configure, and type')}. Every task graded and explained, and the official-format test opens with ${(c.test && c.test.pbqInTest) || 'a few'} of them.</p><p><a class="btn" href="${m.urls.pbq}">Try ${Object.keys(m.pbqs).filter(id => m.pbqs[id].seo === true).length} PBQs here</a></p></section>` : ''}
${relatedGuides.length ? `<section><h2>Guides</h2><ul class="guide-list">${relatedGuides.map(g => `<li><a href="/guides/${esc(g.slug)}/">${esc(g.title)}</a><br><span class="ink2">${esc(g.description || '')}</span></li>`).join('')}</ul></section>` : ''}
${(siblings || []).length ? `<section class="related"><h2>More ${esc(ex.vendor || '')} courses</h2><ul>${siblings.map(s => `<li><a href="${s.urls.landing}">${esc(s.c.name)}</a> <span class="muted">${esc((s.c.exam && s.c.exam.title) || '')}</span> &middot; <a href="${s.urls.practice}">practice test</a></li>`).join('')}</ul></section>` : ''}
<section>
  <h2>Questions people ask</h2>
  ${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
</section>
${ctaCard(m, null)}`;
  return shell({
    origin, path: m.urls.landing, type: 'website', head: FORWARDER,
    title, ogTitle: h1, description,
    nav: nav(m, m.urls.landing),
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Course',
        name: c.name, description: intro, url: origin + m.urls.landing,
        about: examName(c) || undefined, inLanguage: 'en', isAccessibleForFree: true,
        provider: org(),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', category: 'Free' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: totalMin ? `PT${totalMin}M` : undefined }
      },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

// Largest-remainder apportionment of n items across weights {id: pct}; ties go to the larger weight.
function apportionN(n, weights) {
  const ids = Object.keys(weights).filter(d => Number(weights[d]) > 0);
  const total = ids.reduce((a, d) => a + Number(weights[d]), 0);
  const q = {}; let assigned = 0; const rem = [];
  ids.forEach(d => { const raw = n * Number(weights[d]) / total; q[d] = Math.floor(raw); assigned += q[d]; rem.push({ d, r: raw - q[d] }); });
  rem.sort((a, b) => b.r - a.r || Number(weights[b.d]) - Number(weights[a.d]) || (a.d < b.d ? -1 : 1));
  for (let i = 0; assigned < n && i < rem.length; i++) { q[rem[i].d]++; assigned++; }
  return q;
}

// Twenty bank questions for the public practice page: the domain quota from the exam weights, then
// per domain the -1 question of each lesson in rail order, then -2, and so on. Generated items never appear.
function pickPractice(m, n) {
  const weights = {}; (m.c.domains || []).forEach(d => { if (Number(d.pct) > 0) weights[d.id] = d.pct; });
  const quota = apportionN(n || 20, weights);
  const byId = {}; (m.questions || []).forEach(q => { byId[q.id] = q; });
  const out = [];
  Object.keys(quota).forEach(d => {
    const lessons = m.lessons.filter(l => String(l.domain) === String(d)); let k = 0;
    for (let i = 1; k < quota[d] && i <= 10; i++) {
      for (const l of lessons) { if (k >= quota[d]) break; const q = byId[`${l.id}-${i}`]; if (q) { out.push(Object.assign({}, q, { lesson: l })); k++; } }
    }
  });
  return out;
}

function practicePage(m, R, origin) {
  const c = m.c; const items = pickPractice(m, 20); const letters = 'ABCD';
  const h1 = `${examName(c) || c.name} Practice Test: ${items.length} Free Questions with Answers`;
  const description = shorten(`${items.length} free ${examName(c) || c.name} practice questions with answers and explanations, drawn from the ${m.questions.length}-question bank behind ${c.name}. Try them, then start the free course.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'Practice test', href: m.urls.practice }];
  const body = `${crumbs(crumbList)}
<article class="lesson quiz-page">
  <div class="eyebrow">${esc(examName(c) || c.name)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">Twenty questions in the exam's domain weights, each with its answer and the reason. The full course has ${m.questions.length} explained questions plus generated math items, scored tests in the real exam's format, and lessons built from what you miss.</p>
  <ol class="quiz">${items.map(q => `<li class="q"><p class="stem">${R.inline(q.q)}</p><ol class="opts" type="A">${q.a.map(o => `<li class="opt">${R.inline(o)}</li>`).join('')}</ol><details><summary>Show the answer</summary><p><strong>Answer: ${letters[q.c]}.</strong> ${R.inline(q.e)}</p><p class="muted">From the lesson <a href="${m.free.has(q.lesson.id) ? m.urls.lesson(q.lesson) : m.urls.inApp(q.lesson)}">${esc(q.lesson.title)}</a>.</p></details></li>`).join('')}</ol>
</article>
<aside class="card cta stack">
  <div class="eyebrow">That was ${items.length} of ${m.questions.length}</div>
  <h2>Every question in the course is explained like this</h2>
  <p class="ink2">Start with the short starter test and the course builds your tutorial from what you miss. Free while we launch.</p>
  <p><a class="btn primary" href="${m.urls.app}">Start the free course</a>${Object.keys(m.pbqs || {}).length ? ` <a class="btn" href="${m.urls.pbq}">Practice PBQs</a>` : ''} <a class="btn" href="${m.urls.landing}">About the course</a> <a class="btn" href="${m.urls.cheat}">Read the cheat sheet</a></p>
</aside>`;
  return shell({
    origin, path: m.urls.practice, type: 'article',
    title: `${h1} | ${BRAND}`, ogTitle: h1, description,
    nav: nav(m, m.urls.practice),
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Quiz',
        name: h1, description, url: origin + m.urls.practice, inLanguage: 'en', isAccessibleForFree: true,
        about: { '@type': 'Thing', name: examName(c) || c.name }, educationalLevel: 'Beginner', provider: org(),
        hasPart: items.map(q => ({ '@type': 'Question', name: R.plain(q.q), eduQuestionType: 'Multiple choice', learningResourceType: 'Practice problem', text: R.plain(q.q), suggestedAnswer: q.a.filter((o, i) => i !== q.c).map(o => ({ '@type': 'Answer', text: R.plain(o) })), acceptedAnswer: { '@type': 'Answer', text: R.plain(q.a[q.c]) } }))
      },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

// The PBQ page: the pack's seo-marked performance-based questions, readable with no JavaScript.
// Every task shows its prompt, its items or options in pack order, the expected answer in words,
// and the why. The interactive versions live in the app, behind the page's buttons.
function pbqPage(m, R, origin) {
  // seo === true, the same test the pack self-test counts with, so the page and the self-test never
  // disagree about which PBQs are public.
  const c = m.c; const ids = Object.keys(m.pbqs).filter(id => m.pbqs[id].seo === true); const P = m.pbqText;
  const phrases = (m.seo && Array.isArray(m.seo.pbqPhrases) && m.seo.pbqPhrases.length) ? m.seo.pbqPhrases : [`${examName(c) || c.name} PBQs`, `${(c.exam && c.exam.code) || c.name} performance-based questions`];
  const h1 = `${examName(c) || c.name} PBQ Practice`;
  const description = shorten(`Free ${examName(c) || c.name} performance-based questions with every task answered and explained: ${phrases.join(', ')}. Practice all ${Object.keys(m.pbqs).length} in the course.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'PBQ practice', href: m.urls.pbq }];
  const taskHtml = (p, t) => `<li class="pbq-task"><p class="stem">${R.inline(t.prompt)}</p>${t.kind === 'order' ? `<p class="muted">Items: ${t.items.map(x => R.inline(x)).join('; ')}</p>` : t.kind === 'match' ? `<p class="muted">Items: ${t.left.map(x => R.inline(x)).join('; ')}. Slots: ${t.right.map(x => R.inline(x)).join('; ')}</p>` : (t.kind === 'multiselect' || t.kind === 'choice') ? `<ol class="opts">${t.options.map(o => `<li class="opt">${R.inline(o)}</li>`).join('')}</ol>` : t.kind === 'form' ? `<p class="muted">Fields: ${t.fields.map(f => esc(f.label)).join('; ')}</p>` : ''}<p><strong>Expected: ${esc(P.expectedText(t))}</strong></p><p>${R.inline((p.why || {})[t.id] || '')}</p></li>`;
  // The lesson a PBQ belongs to, linked on this site when it is free and in the app when it is not,
  // the same rule the practice-test page uses for a question's lesson.
  const lessonHref = l => m.free.has(l.id) ? m.urls.lesson(l) : m.urls.inApp(l);
  const lessonLink = p => { const l = m.lessons.find(x => x.id === p.lesson); const a = p.also ? m.lessons.find(x => x.id === p.also) : null; return l ? `<p class="muted">From the lesson <a href="${lessonHref(l)}">${esc(l.title)}</a>.${a ? ` See also <a href="${lessonHref(a)}">${esc(a.title)}</a>.` : ''}</p>` : ''; };
  const sections = ids.map(id => { const p = m.pbqs[id]; const sc = p.scenario || {}; return `<section class="pbq"><h2>${esc(p.title)}</h2><div class="scenario">${R.inline(sc.text || '')}</div>${sc.svg ? `<div class="pbq-fig">${sc.svg}</div>` : ''}${sc.log ? `<pre class="pbq-log">${esc(sc.log)}</pre>` : ''}<ol class="pbq-tasks">${p.tasks.map(t => taskHtml(p, t)).join('')}</ol>${lessonLink(p)}</section>`; }).join('');
  const faq = [
    { q: `How many PBQs are on the ${examName(c) || c.name} exam?`, a: 'CompTIA does not publish the count. Expect a handful at the start of the exam, each taking longer than a multiple-choice question.' },
    { q: 'Can you skip a PBQ and come back to it?', a: 'Yes. Flag it, answer the multiple-choice questions, and return with the time you have left.' },
    { q: 'Are PBQs weighted more than other questions?', a: 'CompTIA does not disclose its weighting. Treat each task inside a PBQ as a question you can get right or wrong.' },
    { q: `How does ${c.name} practice PBQs?`, a: `The course has ${Object.keys(m.pbqs).length} interactive PBQs: drag items into order, match terms, pick lines in a log, fill a configuration, type a command. Every task is graded and explained, and the official-format test opens with ${(c.test && c.test.pbqInTest) || 'a few'} of them.` }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson quiz-page">
  <div class="eyebrow">${esc(examName(c) || c.name)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">Performance-based questions ask you to do the task, not pick the letter. The real exam opens with a handful. Here are ${ids.length} of the course's ${Object.keys(m.pbqs).length}, with every task answered and explained: ${phrases.map(p => esc(p)).join(', ')}.</p>
  ${sections}
  <section><h2>Questions people ask</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
</article>
<aside class="card cta stack">
  <div class="eyebrow">That was ${ids.length} of ${Object.keys(m.pbqs).length}</div>
  <h2>Practice all ${Object.keys(m.pbqs).length} PBQs in the course</h2>
  <p class="ink2">Interactive, graded task by task, with the why for each. Free while we launch.</p>
  <p><a class="btn primary" href="${m.urls.app}#pbq">Practice all ${Object.keys(m.pbqs).length} PBQs</a> <a class="btn" href="${m.urls.practice}">Try the practice test</a> <a class="btn" href="${m.urls.landing}">About the course</a></p>
</aside>`;
  return shell({
    origin, path: m.urls.pbq, type: 'article',
    title: `${h1} | ${c.name}`, ogTitle: h1, description,
    nav: nav(m, m.urls.pbq),
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'Quiz', name: h1, description, url: origin + m.urls.pbq, inLanguage: 'en', isAccessibleForFree: true, about: { '@type': 'Thing', name: examName(c) || c.name }, educationalLevel: 'Intermediate', provider: org(),
        hasPart: ids.flatMap(id => m.pbqs[id].tasks.map(t => ({ '@type': 'Question', name: R.plain(t.prompt), eduQuestionType: 'Performance-based', learningResourceType: 'Practice problem', text: R.plain(t.prompt), acceptedAnswer: { '@type': 'Answer', text: P.expectedText(t) } }))) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

// The flashcards page: every deck rendered as a definition list (complete without JavaScript),
// with an inline viewer that flips one card at a time and remembers "Got it" in localStorage.
function flashcardsPage(m, R, origin) {
  const c = m.c; const decks = m.flashcards.decks; const total = m.flashcards.total;
  const h1 = `${examName(c) || c.name} Flashcards: ${total} cards`;
  const exam = (c.exam && c.exam.title) || examName(c) || c.name;
  const counts = decks.map(d => `${d.cards.length} ${d.name}`).join(', ');
  const description = shorten(`Free ${examName(c) || c.name} flashcards: ${counts}. Flip, shuffle, and mark the ones you know.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'Flashcards', href: m.urls.flashcards }];
  const deckHtml = decks.map(d => `<section class="deck" data-deck="${esc(d.slug)}"><h2>${esc(d.name)} <span class="muted">${d.cards.length}</span></h2><dl>${d.cards.map(x => `<div class="fc"><dt>${esc(x.front)}</dt><dd>${esc(x.back)}</dd></div>`).join('')}</dl></section>`).join('');
  const faq = [
    { q: `How many ${examName(c) || c.name} flashcards are there?`, a: `${total}: ${counts}. They come from the course's cheat sheet and glossary, so what you drill is what the lessons teach.` },
    { q: 'Do I need an account?', a: 'No. The cards you mark as known are remembered in this browser only. Sign in to the course for progress that follows you between devices.' }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson flashcards">
  <div class="eyebrow">${esc(examName(c) || c.name)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">${total} free ${esc(exam)} flashcards from the course's cheat sheet and glossary. Tap a card to flip it. Mark the ones you know and they drop out of the deck; the rest keep coming back.</p>
  <div class="card fc-viewer" id="fc-viewer" hidden>
    <div class="row spread" style="flex-wrap:wrap;gap:8px"><label class="muted">Deck <select id="fc-deck">${decks.map(d => `<option value="${esc(d.slug)}">${esc(d.name)} (${d.cards.length})</option>`).join('')}</select></label><span class="muted" id="fc-count"></span></div>
    <button class="fc-card" id="fc-card" type="button" aria-live="polite"><span class="fc-face" id="fc-front"></span><span class="fc-face fc-back" id="fc-back" hidden></span></button>
    <div class="row" style="flex-wrap:wrap;gap:8px"><button class="btn" type="button" id="fc-prev">Previous</button><button class="btn" type="button" id="fc-next">Next</button><button class="btn" type="button" id="fc-shuffle">Shuffle</button><button class="btn primary" type="button" id="fc-know">Got it</button><button class="btn" type="button" id="fc-again">Again</button><button class="btn ghost" type="button" id="fc-reset">Reset this deck</button></div>
    <p class="muted" style="font-size:.9rem">Space flips, arrow keys move. Known cards are remembered in this browser.</p>
  </div>
  ${deckHtml}
  <section><h2>Questions people ask</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
</article>
<aside class="card cta stack">
  <div class="eyebrow">Flashcards are the recall half</div>
  <h2>The course teaches the other half</h2>
  <p class="ink2">${m.lessons.length} lessons, ${m.questions.length} explained questions, and a tutorial built from what you miss. Free while we launch.</p>
  <p><a class="btn primary" href="${m.urls.app}">Start the free course</a> <a class="btn" href="${m.urls.cheat}">Read the cheat sheet</a> <a class="btn" href="${m.urls.practice}">Try the practice test</a></p>
</aside>
<script>
(function(){
  var KEY='fra.${c.id}.flashcards';
  var decks={};document.querySelectorAll('section.deck').forEach(function(s){decks[s.dataset.deck]=Array.prototype.map.call(s.querySelectorAll('.fc'),function(x){return {f:x.querySelector('dt').textContent,b:x.querySelector('dd').textContent};});});
  function isMap(x){return !!x&&typeof x==='object'&&!Array.isArray(x);}
  var known={};try{known=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){known={};}
  if(!isMap(known)||!Object.keys(known).every(function(d){return isMap(known[d]);}))known={};
  function store(){try{localStorage.setItem(KEY,JSON.stringify(known));}catch(e){}}
  function id(c){return c.f+' = '+c.b;}
  var v=document.getElementById('fc-viewer'),sel=document.getElementById('fc-deck'),card=document.getElementById('fc-card'),front=document.getElementById('fc-front'),back=document.getElementById('fc-back'),count=document.getElementById('fc-count');
  if(!v||!sel||!Object.keys(decks).length)return;
  var deck=sel.value,order=[],i=0,flipped=false;
  function pool(){var k=known[deck]||{};return decks[deck].map(function(c,n){return n;}).filter(function(n){return !k[id(decks[deck][n])];});}
  function load(){order=pool();i=0;flipped=false;show();}
  function show(){var all=decks[deck].length;if(!order.length){front.textContent='Every card in this deck is marked known. Reset to start over.';back.hidden=true;front.hidden=false;count.textContent=all+' of '+all+' known';return;}
    if(i>=order.length)i=0;if(i<0)i=order.length-1;var c=decks[deck][order[i]];front.textContent=c.f;back.textContent=c.b;front.hidden=flipped;back.hidden=!flipped;count.textContent=(i+1)+' of '+order.length+' left, '+(all-order.length)+' known';}
  function flip(){if(!order.length)return;flipped=!flipped;show();}
  function move(d){if(!order.length)return;i+=d;flipped=false;show();}
  sel.addEventListener('change',function(){deck=sel.value;load();});
  card.addEventListener('click',flip);
  document.getElementById('fc-prev').addEventListener('click',function(){move(-1);});
  document.getElementById('fc-next').addEventListener('click',function(){move(1);});
  document.getElementById('fc-shuffle').addEventListener('click',function(){for(var a=order.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t=order[a];order[a]=order[b];order[b]=t;}i=0;flipped=false;show();});
  document.getElementById('fc-know').addEventListener('click',function(){if(!order.length)return;known[deck]=known[deck]||{};known[deck][id(decks[deck][order[i]])]=1;store();order.splice(i,1);flipped=false;show();});
  document.getElementById('fc-again').addEventListener('click',function(){move(1);});
  document.getElementById('fc-reset').addEventListener('click',function(){delete known[deck];store();load();});
  // Space on the card button flips through its own click; otherwise only from the page body, while the viewer is on screen.
  document.addEventListener('keydown',function(e){var t=e.target.tagName;if(t==='SELECT'||t==='INPUT'||t==='TEXTAREA'||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key===' '){if(e.target!==v&&e.target!==document.body&&e.target!==document.documentElement)return;var r=v.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;e.preventDefault();flip();}else if(e.key==='ArrowRight'){move(1);}else if(e.key==='ArrowLeft'){move(-1);}});
  v.hidden=false;load();
})();
</script>`;
  return shell({
    origin, path: m.urls.flashcards, type: 'article',
    title: `${h1} | ${c.name}`, ogTitle: h1, description,
    nav: nav(m, m.urls.flashcards),
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'LearningResource', name: h1, description, url: origin + m.urls.flashcards, inLanguage: 'en', isAccessibleForFree: true, learningResourceType: 'Flashcards', about: { '@type': 'Thing', name: examName(c) || c.name }, provider: org() },
      ...(decks.some(d => d.slug === 'acronyms') ? [{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: `${examName(c) || c.name} acronyms`, hasDefinedTerm: decks.find(d => d.slug === 'acronyms').cards.map(x => ({ '@type': 'DefinedTerm', termCode: x.front, name: x.front, description: x.back })) }] : []),
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

function cheatPage(m, R, origin) {
  const cs = m.cheatsheet; const c = m.c;
  const keys = R.keys.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b));
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }, { name: 'Cheat sheet', href: m.urls.cheat }];
  const n = cs.sections.length;
  const body = `${crumbs(crumbList)}
<div class="cs">
  <div class="eyebrow">Cheat sheet</div>
  <h1>${esc(cs.title)}</h1>
  <p class="ink2 lede">${esc(cs.intro)}</p>
  <p class="row"><a class="btn primary" href="${m.urls.pdf}">Download the PDF</a> <a class="btn" href="${m.urls.app}">Start the free course</a></p>
  <nav class="cs-toc" aria-label="Sections">${cs.sections.map((s, i) => `<a href="#cs-${esc(s.id)}">${i + 1}. ${esc(s.title)}</a>`).join('')}${keys.length ? `<a href="#cs-acronyms">${n + 1}. Acronyms</a>` : ''}</nav>
  ${cs.sections.map((s, i) => `<section class="cs-section" id="cs-${esc(s.id)}"><h2><span class="cs-num">${String(i + 1).padStart(2, '0')}</span>${esc(s.title)}</h2>${s.blocks.map(R.csBlock).join('')}</section>`).join('\n')}
  ${keys.length ? `<section class="cs-section" id="cs-acronyms"><h2><span class="cs-num">${String(n + 1).padStart(2, '0')}</span>Acronyms</h2><p class="ink2">Every acronym used in this course, ${keys.length} in all.</p><div class="table-wrap"><table class="cs-table"><thead><tr><th>Acronym</th><th>Stands for</th><th>Meaning</th></tr></thead><tbody>${keys.map(k => [R.acronyms[k]].concat(R.acronyms[k].alt ? [R.acronyms[k].alt] : []).map(a => `<tr><td>${esc(k)}</td><td>${esc(a.full)}</td><td>${esc(a.tip || '')}</td></tr>`).join('')).join('')}</tbody></table></div></section>` : ''}
</div>
${ctaCard(m, null)}`;
  const description = shorten(cs.intro, DESC_MAX);
  return shell({
    origin, path: m.urls.cheat, type: 'article',
    title: `${cs.title} | ${BRAND}`,
    ogTitle: cs.title,
    description,
    nav: nav(m, m.urls.cheat),
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: cs.title, description, url: origin + m.urls.cheat, mainEntityOfPage: origin + m.urls.cheat,
        inLanguage: 'en', isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: c.name, url: origin + m.urls.course },
        author: org(), publisher: org()
      },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}

function guidePage(g, courses, origin) {
  const R = makeRenderer({});
  const description = shorten(g.description || R.plain(firstParagraph(g.body)), DESC_MAX);
  const url = `/guides/${g.slug}/`;
  const crumbList = [{ name: 'Courses', href: '/' }, { name: 'Guides', href: '/guides/' }, { name: g.title, href: url }];
  const rel = g.related || {}; const byId = {}; courses.forEach(m => { byId[m.c.id] = m; });
  const courseLinks = (rel.courses || []).map(id => byId[id]).filter(Boolean).map(m => `<li><a href="${m.urls.landing}">${esc(m.c.name)}</a> <span class="muted">course</span> &middot; <a href="${m.urls.practice}">practice test</a></li>`);
  const lessonLinks = (rel.lessons || []).map(ref => { const [id, lid] = ref.split(':'); const m = byId[id]; const l = m && m.lessons.find(x => x.id === lid); return m && l ? `<li><a href="${m.free.has(l.id) ? m.urls.lesson(l) : m.urls.inApp(l)}">${esc(l.title)}</a> <span class="muted">${esc(m.c.name)}</span></li>` : ''; }).filter(Boolean);
  const faq = Array.isArray(g.faq) ? g.faq : [];
  const body = `${crumbs(crumbList)}
<article class="lesson guide">
  <div class="eyebrow">Guide &middot; updated ${esc(g.updated)}</div>
  <h1>${esc(g.title)}</h1>
  <div class="lesson-body">${R.renderBody(g.body)}</div>
  ${faq.length ? `<section class="faq"><h2>Questions people ask</h2>${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>` : ''}
  ${courseLinks.length || lessonLinks.length ? `<section class="related"><h2>Related</h2><ul>${courseLinks.join('')}${lessonLinks.join('')}</ul></section>` : ''}
</article>`;
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description, url: origin + url, mainEntityOfPage: origin + url, dateModified: g.updated, inLanguage: 'en', isAccessibleForFree: true, author: org(), publisher: org() }
  ];
  if (faq.length) jsonld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  jsonld.push(breadcrumbLd(origin, crumbList));
  return shell({ origin, path: url, type: 'article', title: `${g.title} | ${BRAND}`, ogTitle: g.title, description, nav: `<a href="/guides/" aria-current="page">Guides</a><a href="/" class="btn primary small">All courses</a>`, jsonld, body });
}

function guidesIndex(guides, origin) {
  const crumbList = [{ name: 'Courses', href: '/' }, { name: 'Guides', href: '/guides/' }];
  const body = `${crumbs(crumbList)}
<div class="course-hero"><div class="eyebrow">${esc(BRAND)}</div><h1>Guides for biomed and IT certification candidates</h1><p class="lede ink2">Plain answers about the exams, the jobs, and the tools, written by the people who built the courses.</p></div>
<ul class="lesson-body guide-list">${guides.map(g => `<li><a href="/guides/${esc(g.slug)}/">${esc(g.title)}</a><br><span class="ink2">${esc(g.description || '')}</span></li>`).join('')}</ul>`;
  return shell({ origin, path: '/guides/', type: 'website', title: `Guides | ${BRAND}`, ogTitle: 'Guides', description: 'Plain answers about the CBET, the CABT, the CompTIA exams, biomed jobs, and the virtual labs.', nav: `<a href="/" class="btn primary small">All courses</a>`, jsonld: [breadcrumbLd(origin, crumbList)], body });
}

function notFoundPage(models, origin) {
  const body = `<h1>That page is not here</h1>
<p class="lede ink2">The link is out of date, or the page moved. Here is where everything lives now.</p>
<ul class="lesson-body">
  <li><a href="/">All courses</a></li>
  <li><a href="/guides/">Guides</a></li>
  ${models.map(m => `<li><a href="${m.urls.landing}">${esc(m.c.name)}</a></li>`).join('\n  ')}
</ul>`;
  return shell({
    origin, path: '/404.html', type: 'website', noindex: true,
    title: `Page not found | ${BRAND}`,
    description: 'That page is not here. Browse every free certification course at FieldReady Academy.',
    body
  });
}

// ---------- writing ----------
function writePage(out, urlPath, html) {
  const dir = path.join(out, ...urlPath.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  return path.join(dir, 'index.html');
}

function buildCourse(FRA, opts) {
  analyticsSnippet = gaSnippet(opts.analytics !== undefined ? opts.analytics : gaId());
  const origin = (opts.origin || ORIGIN).replace(/\/$/, '');
  const m = model(FRA);
  const R = makeRenderer(m.acronyms);
  const pages = [];
  pages.push({ url: m.urls.landing, title: m.c.name, file: writePage(opts.out, m.urls.landing, landingPage(m, R, origin, opts.guides, opts.siblings)) });
  pages.push({ url: m.urls.practice, title: 'Practice test', file: writePage(opts.out, m.urls.practice, practicePage(m, R, origin)) });
  if (Object.keys(m.pbqs).length) pages.push({ url: m.urls.pbq, title: 'PBQ practice', file: writePage(opts.out, m.urls.pbq, pbqPage(m, R, origin)) });
  if (m.flashcards.total) pages.push({ url: m.urls.flashcards, title: 'Flashcards', file: writePage(opts.out, m.urls.flashcards, flashcardsPage(m, R, origin)) });
  pages.push({ url: m.urls.course, title: `${examName(m.c)} free course`, file: writePage(opts.out, m.urls.course, coursePage(m, R, origin)) });
  if (m.cheatsheet) pages.push({ url: m.urls.cheat, title: m.cheatsheet.title, file: writePage(opts.out, m.urls.cheat, cheatPage(m, R, origin)) });
  for (const l of m.freeLessons) pages.push({ url: m.urls.lesson(l), title: l.title, file: writePage(opts.out, m.urls.lesson(l), lessonPage(m, l, R, origin)) });
  return { course: m.c.id, pages };
}

// Every URL that belongs to a course model, rendered or not: the landing page, the practice
// test, the lessons index, the cheat sheet, and every free lesson. A partial build (one
// course's pages re-rendered after an edit) still needs every course's URLs in the sitemap,
// so this is computed from a model alone rather than from the pages a build actually wrote.
function courseUrls(m) {
  return [m.urls.landing, m.urls.practice, m.urls.course, m.urls.cheat].concat(Object.keys(m.pbqs || {}).length ? [m.urls.pbq] : []).concat(m.flashcards && m.flashcards.total > 0 ? [m.urls.flashcards] : []).concat(m.freeLessons.map(l => m.urls.lesson(l)));
}

function sitemap(origin, urls, lastmod) {
  const day = lastmod || new Date().toISOString().slice(0, 10);
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(u => `  <url><loc>${esc(origin + u)}</loc><lastmod>${day}</lastmod></url>`).join('\n') + '\n</urlset>\n';
}

function robots(origin) {
  return `User-agent: *\nAllow: /\nDisallow: /callback\n\nSitemap: ${origin}/sitemap.xml\n`;
}

function buildAll(opts) {
  const origin = (opts.origin || ORIGIN).replace(/\/$/, '');
  const out = opts.out || path.join(ROOT, 'dist', 'site');
  const dirs = opts.courseDirs || courseDirs();
  // allCourseDirs covers the whole site even on a partial build (only `dirs` get pages
  // re-rendered): shared files -- the sitemap's course URLs, the 404 page's course list,
  // and guides' related-course links -- must still name every course, not just the ones
  // this run re-rendered, or they would be truncated to the partial set.
  // Default: every course in the repo, plus any rendered dir outside it (test fixtures).
  const allDirs = Array.from(new Set((opts.allCourseDirs || courseDirs()).concat(dirs)));
  fs.mkdirSync(out, { recursive: true });
  // Load each pack at most once even though dirs and allDirs overlap.
  const packs = {};
  const packFor = dir => packs[dir] || (packs[dir] = loadPack(dir));
  const models = allDirs.map(dir => model(packFor(dir)));
  const guides = loadGuides(opts.guidesDir === undefined ? path.join(__dirname, 'guides') : opts.guidesDir);
  // A course's siblings are the other courses from the same certifying body, in catalog (directory) order.
  const siblingsOf = m => models.filter(o => o.c.id !== m.c.id && (o.c.exam && o.c.exam.vendor) === (m.c.exam && m.c.exam.vendor));
  const results = dirs.map(dir => { const m = model(packFor(dir)); return buildCourse(packFor(dir), { out, origin, analytics: opts.analytics, guides, siblings: siblingsOf(m) }); });
  const guideUrls = [];
  if (guides.length) {
    writePage(out, '/guides/', guidesIndex(guides, origin)); guideUrls.push('/guides/');
    for (const g of guides) { writePage(out, `/guides/${g.slug}/`, guidePage(g, models, origin)); guideUrls.push(`/guides/${g.slug}/`); }
  }
  const sfData = path.join(__dirname, 'data', 'serviceforge.json.gz');
  const sfEnabled = opts.serviceforge !== false;
  // /serviceforge/ is the hand-written product page (dist/serviceforge.html, built by build.py and
  // placed by scripts/stage.sh) that every generated model page's connect button points at; it belongs
  // in the sitemap whenever the feature is on, independent of whether the generated model/class tree
  // exists yet.
  const sfModelUrls = (sfEnabled && fs.existsSync(sfData)) ? require('./build-serviceforge').buildServiceForge({ dataFile: sfData, out, origin }).urls : [];
  const sfUrls = sfEnabled ? ['/serviceforge/'].concat(sfModelUrls) : [];
  const urls = ['/'].concat(...models.map(courseUrls)).concat(guideUrls).concat(sfUrls);
  fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap(origin, urls), 'utf8');
  fs.writeFileSync(path.join(out, 'robots.txt'), robots(origin), 'utf8');
  fs.writeFileSync(path.join(out, '404.html'), notFoundPage(models, origin), 'utf8');
  fs.copyFileSync(path.join(__dirname, 'site.css'), path.join(out, 'site.css'));
  fs.copyFileSync(path.join(__dirname, 'og-image.png'), path.join(out, 'og-image.png'));
  return { out, urls, courses: results };
}

// module.exports runs before the require.main block below: buildAll() lazily requires
// ./build-serviceforge, which requires ./build-site back (circular) -- if exports were not
// set yet when `node site/build-site.js` is run directly, that circular require would see
// an empty exports object and crash on shell/crumbs/slugify being undefined.
module.exports = { loadPack, courseDirs, model, slug, slugify, firstParagraph, shorten, apportionN, pickPractice, buildCourse, buildAll, courseUrls, sitemap, robots, notFoundPage, gaSnippet, loadGuides, guidePage, guidesIndex, landingPage, pbqPage, flashcardDecks, flashcardsPage, ORIGIN, BRAND, shell, crumbs, breadcrumbLd, org, DESC_MAX };

if (require.main === module) {
  const wanted = process.argv.slice(2);
  const dirs = wanted.length ? wanted.map(id => path.join(ROOT, 'courses', id)) : undefined;
  const res = buildAll({ courseDirs: dirs, allCourseDirs: courseDirs() });
  for (const r of res.courses) console.log(`[${r.course}] ${r.pages.length - 1} pages written`);
  console.log(`sitemap: ${res.urls.length} URLs; output ${path.relative(ROOT, res.out)}/`);
}
