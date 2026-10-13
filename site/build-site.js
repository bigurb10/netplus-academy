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
  return {
    c, units, lessons, free, domains,
    freeLessons: lessons.filter(l => free.has(l.id)),
    deep: FRA.deep || {},
    cheatsheet: FRA.cheatsheet || null,
    acronyms: FRA.acronyms || {},
    questions: FRA.questions || [], seo: c.seo || null,
    urls: {
      landing: `/${c.id}/`,
      app: `/${c.id}/app/`,
      practice: `/${c.id}/practice-test/`,
      course: `/${c.id}/lessons/`,
      cheat: `/${c.id}/cheatsheet/`,
      pdf: `/${c.id}/cheatsheet.pdf`,
      lesson: l => `/${c.id}/lessons/${slug(l)}/`,
      inApp: l => `/${c.id}/app/#lesson/${l.id}`
    }
  };
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
  return item(m.urls.landing, 'Overview') + item(m.urls.course, 'Lessons') + item(m.urls.practice, 'Practice test') + item(m.urls.cheat, 'Cheat sheet') + item('/guides/', 'Guides') + item(m.urls.app, 'Start the course', 'btn primary small');
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

function defaultFaq(m) {
  const c = m.c; const ex = c.exam || {}; const t = c.test || {};
  const out = [];
  if (ex.questions && ex.minutes) out.push({ q: `How many questions are on the ${examName(c)} exam?`, a: `${ex.questions} questions in ${ex.minutes} minutes.${c.realExamNote ? ' ' + c.realExamNote : ''}` });
  if (t.passesNeeded && t.passWindow && t.passPct) out.push({ q: 'How does the course decide I am ready?', a: `${t.passesNeeded} of your last ${t.passWindow} practice tests at ${t.passPct}% or better, then one full-length test in the real exam's format at its passing score.` });
  out.push({ q: 'Is the course free?', a: 'Yes. Every lesson, the cheat sheet, and unlimited practice tests are free while the site launches.' });
  out.push({ q: 'Can I read the lessons without signing in?', a: `The first ${m.freeLessons.length} lessons and the cheat sheet are open on this site; the full course runs in the app.` });
  return out;
}

function landingPage(m, R, origin, guides) {
  const c = m.c; const ex = c.exam || {}; const seo = m.seo || {};
  const relatedGuides = (guides || []).filter(g => ((g.related && g.related.courses) || []).includes(c.id));
  const h1 = seo.h1 || `${c.name}: ${examName(c) || c.name} study guide and practice tests`;
  const title = seo.title || `${h1} | ${BRAND}`;
  const intro = seo.intro || c.description;
  const faq = Array.isArray(seo.faq) && seo.faq.length ? seo.faq : defaultFaq(m);
  const description = shorten(intro, DESC_MAX);
  const totalMin = m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const labs = m.lessons.filter(l => l.lab);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: c.name, href: m.urls.landing }];
  const facts = [
    ['Exam', ex.title ? (ex.vendor && !ex.title.startsWith(ex.vendor) ? `${ex.vendor} ${ex.title}` : ex.title) : c.name],
    ex.code ? ['Code', ex.code] : null,
    ex.questions ? ['Questions', `${ex.questions}`] : null,
    ex.minutes ? ['Time', `${ex.minutes} minutes`] : null,
    c.realExamNote ? ['Passing', c.realExamNote] : null,
    ['Course', `${m.lessons.length} lessons across ${m.units.length} units${labs.length ? `, ${labs.length} labs` : ''}${totalMin ? `, about ${Math.round(totalMin / 60 * 10) / 10} hours of reading` : ''}`],
    ['Cost', 'Free']
  ].filter(Boolean);
  const body = `${crumbs(crumbList)}
<div class="course-hero">
  <div class="eyebrow">${esc(BRAND)}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">${esc(intro)}</p>
  <p class="row"><a class="btn primary lg" href="${m.urls.app}">Start the free course</a> <a class="btn lg" href="${m.urls.practice}">Try a practice test</a> <a class="btn lg" href="${m.urls.cheat}">Read the cheat sheet</a></p>
</div>
<section>
  <h2>The exam at a glance</h2>
  <div class="table-wrap"><table class="plain facts"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>
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
${relatedGuides.length ? `<section><h2>Guides</h2><ul class="guide-list">${relatedGuides.map(g => `<li><a href="/guides/${esc(g.slug)}/">${esc(g.title)}</a><br><span class="ink2">${esc(g.description || '')}</span></li>`).join('')}</ul></section>` : ''}
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
  <p><a class="btn primary" href="${m.urls.app}">Start the free course</a> <a class="btn" href="${m.urls.landing}">About the course</a> <a class="btn" href="${m.urls.cheat}">Read the cheat sheet</a></p>
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
  pages.push({ url: m.urls.landing, title: m.c.name, file: writePage(opts.out, m.urls.landing, landingPage(m, R, origin, opts.guides)) });
  pages.push({ url: m.urls.practice, title: 'Practice test', file: writePage(opts.out, m.urls.practice, practicePage(m, R, origin)) });
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
  return [m.urls.landing, m.urls.practice, m.urls.course, m.urls.cheat].concat(m.freeLessons.map(l => m.urls.lesson(l)));
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
  const results = dirs.map(dir => buildCourse(packFor(dir), { out, origin, analytics: opts.analytics, guides }));
  const guideUrls = [];
  if (guides.length) {
    writePage(out, '/guides/', guidesIndex(guides, origin)); guideUrls.push('/guides/');
    for (const g of guides) { writePage(out, `/guides/${g.slug}/`, guidePage(g, models, origin)); guideUrls.push(`/guides/${g.slug}/`); }
  }
  const urls = ['/'].concat(...models.map(courseUrls)).concat(guideUrls);
  fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap(origin, urls), 'utf8');
  fs.writeFileSync(path.join(out, 'robots.txt'), robots(origin), 'utf8');
  fs.writeFileSync(path.join(out, '404.html'), notFoundPage(models, origin), 'utf8');
  fs.copyFileSync(path.join(__dirname, 'site.css'), path.join(out, 'site.css'));
  fs.copyFileSync(path.join(__dirname, 'og-image.png'), path.join(out, 'og-image.png'));
  return { out, urls, courses: results };
}

if (require.main === module) {
  const wanted = process.argv.slice(2);
  const dirs = wanted.length ? wanted.map(id => path.join(ROOT, 'courses', id)) : undefined;
  const res = buildAll({ courseDirs: dirs, allCourseDirs: courseDirs() });
  for (const r of res.courses) console.log(`[${r.course}] ${r.pages.length - 1} pages written`);
  console.log(`sitemap: ${res.urls.length} URLs; output ${path.relative(ROOT, res.out)}/`);
}

module.exports = { loadPack, courseDirs, model, slug, slugify, firstParagraph, shorten, apportionN, pickPractice, buildCourse, buildAll, courseUrls, sitemap, robots, notFoundPage, gaSnippet, loadGuides, guidePage, guidesIndex, landingPage, ORIGIN, BRAND };
