#!/usr/bin/env node
'use strict';
// Public SEO pages, generated from the course packs into dist/site/:
//
//   /<id>/lessons/                 the course landing page (Course JSON-LD)
//   /<id>/lessons/<id>-<slug>/     one page per FREE lesson (Article + BreadcrumbList)
//   /<id>/cheatsheet/              the memorization sheet as HTML
//   /sitemap.xml  /robots.txt  /site.css
//
// The course app itself stays at /<id>/ and is never written here. Design:
// docs/superpowers/specs/2026-09-15-public-seo-pages-design.md
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
    urls: {
      app: `/${c.id}/`,
      course: `/${c.id}/lessons/`,
      cheat: `/${c.id}/cheatsheet/`,
      pdf: `/${c.id}/cheatsheet.pdf`,
      lesson: l => `/${c.id}/lessons/${slug(l)}/`,
      inApp: l => `/${c.id}/#lesson/${l.id}`
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
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${p.type || 'article'}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary">
${ICONS}
${FONTS}
<link rel="stylesheet" href="/catalog.css">
<link rel="stylesheet" href="/site.css">
${(p.jsonld || []).map(ld).join('\n')}
</head>
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
  return item(m.urls.course, 'Lessons') + item(m.urls.cheat, 'Cheat sheet') + item(m.urls.app, 'Start the course', 'btn primary small');
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
    { name: examName(m.c) || m.c.name, href: m.urls.course },
    { name: l.title, href: m.urls.lesson(l) }
  ];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <div class="row pills">${u ? `<span class="pill accent">Unit ${u.n}</span>` : ''}${d.short ? `<span class="pill">${esc(d.short)}</span>` : ''}${l.obj ? `<span class="pill">Objective ${esc(l.obj)}</span>` : ''}${l.minutes ? `<span class="muted">${l.minutes} min read</span>` : ''}</div>
  <h1>${esc(l.title)}</h1>
  <p class="ink2 lede">${u ? `Unit ${u.n}: ${esc(u.title)}. ` : ''}Lesson ${l.index + 1} of ${m.lessons.length} in ${esc(m.c.name)}.</p>
  <div class="lesson-body">${R.renderBody(l.body)}</div>
  ${l.hook ? `<div class="hook"><span class="eyebrow">Remember</span><div>${R.inline(l.hook)}</div></div>` : ''}
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
    `<strong>${t.streakNeeded ? `${t.streakNeeded} passes in a row` : 'Passes in a row'}${t.passPct ? ` at ${t.passPct}%` : ''}.</strong> That unlocks one full-length test on the real exam's clock${ex.questions && ex.minutes ? `: ${ex.questions} questions in ${ex.minutes} minutes` : ''}. Pass it and you are ready to book.`
  ];
};

function coursePage(m, R, origin) {
  const c = m.c; const ex = c.exam || {};
  const totalMin = m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const description = shorten(`${c.description} ${m.lessons.length} lessons, a printable cheat sheet, adaptive tutorials, and unlimited practice tests. Free.`, DESC_MAX);
  const crumbList = [{ name: 'Courses', href: '/' }, { name: examName(c) || c.name, href: m.urls.course }];
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
  <h1>${esc(c.name)}: a free ${esc(ex.title || c.name)} course</h1>
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
  ${m.units.map(u => `<h3>Unit ${u.n}: ${esc(u.title)}</h3>${u.blurb ? `<p class="ink2 unit-blurb">${esc(u.blurb)}</p>` : ''}<ol class="lesson-list" start="${m.lessons.findIndex(l => l.unit === u) + 1}">${u.lessons.map(ul => { const l = m.lessons.find(x => x.id === ul.id); return m.free.has(l.id) ? `<li><a href="${m.urls.lesson(l)}">${esc(l.title)}</a>${l.minutes ? ` <span class="muted">${l.minutes} min</span>` : ''}</li>` : `<li><span>${esc(l.title)}</span> <span class="muted">in the course</span></li>`; }).join('')}</ol>`).join('')}
</section>
${(c.examDay || []).length ? `<section><h2>On exam day</h2><ul class="lesson-body">${c.examDay.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>` : ''}
${ctaCard(m, null)}`;
  return shell({
    origin, path: m.urls.course, type: 'website',
    title: `${examName(c) || c.name} free course | ${BRAND}`,
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

function cheatPage(m, R, origin) {
  const cs = m.cheatsheet; const c = m.c;
  const keys = R.keys.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b));
  const crumbList = [{ name: 'Courses', href: '/' }, { name: examName(c) || c.name, href: m.urls.course }, { name: 'Cheat sheet', href: m.urls.cheat }];
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

// ---------- writing ----------
function writePage(out, urlPath, html) {
  const dir = path.join(out, ...urlPath.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  return path.join(dir, 'index.html');
}

function buildCourse(FRA, opts) {
  const origin = (opts.origin || ORIGIN).replace(/\/$/, '');
  const m = model(FRA);
  const R = makeRenderer(m.acronyms);
  const pages = [];
  pages.push({ url: m.urls.app, title: m.c.name, file: null });
  pages.push({ url: m.urls.course, title: `${examName(m.c)} free course`, file: writePage(opts.out, m.urls.course, coursePage(m, R, origin)) });
  if (m.cheatsheet) pages.push({ url: m.urls.cheat, title: m.cheatsheet.title, file: writePage(opts.out, m.urls.cheat, cheatPage(m, R, origin)) });
  for (const l of m.freeLessons) pages.push({ url: m.urls.lesson(l), title: l.title, file: writePage(opts.out, m.urls.lesson(l), lessonPage(m, l, R, origin)) });
  return { course: m.c.id, pages };
}

function sitemap(origin, urls) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(u => `  <url><loc>${esc(origin + u)}</loc></url>`).join('\n') + '\n</urlset>\n';
}

function robots(origin) {
  return `User-agent: *\nAllow: /\nDisallow: /callback\nDisallow: /fp-test/\n\nSitemap: ${origin}/sitemap.xml\n`;
}

function buildAll(opts) {
  const origin = (opts.origin || ORIGIN).replace(/\/$/, '');
  const out = opts.out || path.join(ROOT, 'dist', 'site');
  const dirs = opts.courseDirs || courseDirs();
  fs.mkdirSync(out, { recursive: true });
  const results = dirs.map(dir => buildCourse(loadPack(dir), { out, origin }));
  const urls = ['/'].concat(...results.map(r => r.pages.map(p => p.url)));
  fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap(origin, urls), 'utf8');
  fs.writeFileSync(path.join(out, 'robots.txt'), robots(origin), 'utf8');
  fs.copyFileSync(path.join(__dirname, 'site.css'), path.join(out, 'site.css'));
  return { out, urls, courses: results };
}

if (require.main === module) {
  const wanted = process.argv.slice(2);
  const dirs = wanted.length ? wanted.map(id => path.join(ROOT, 'courses', id)) : undefined;
  const res = buildAll({ courseDirs: dirs });
  for (const r of res.courses) console.log(`[${r.course}] ${r.pages.length - 1} pages written`);
  console.log(`sitemap: ${res.urls.length} URLs; output ${path.relative(ROOT, res.out)}/`);
}

module.exports = { loadPack, courseDirs, model, slug, slugify, firstParagraph, shorten, buildCourse, buildAll, sitemap, robots, ORIGIN, BRAND };
