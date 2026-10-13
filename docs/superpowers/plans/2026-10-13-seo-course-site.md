# Course Site SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every course URL a crawlable landing page that carries its target phrases, add a crawlable twenty-question practice-test page per course, raise free lessons to fifteen, add a guides section, and finish the indexing hygiene (noindex on app pages, lastmod sitemap, social image, 404), per `docs/superpowers/specs/2026-10-13-seo-course-site-design.md`.

**Architecture:** All public pages are static HTML written by `site/build-site.js` from the packs (plus a new `site/guides/` folder); the course app bundle moves from `/<id>/index.html` to `/<id>/app/index.html` and gets `noindex`. `build.py` keeps bundling; `scripts/stage.sh` places the bundle under `app/`. Six manifests gain a `seo` block, `catalogUrl: "/"`, and `free: { lessons: 15 }`. `tests/site.js` grows with the new pages; `tests/catalog.js` checks the new card links.

**Tech Stack:** Node 20 + jsdom (`npm test`), the existing generator and `site/markup.js` renderer, Python `build.py`, headless Chrome for the social image, Caddy static hosting (no config change needed; one optional `handle_errors` block for the 404 page).

## Global Constraints

- URLs (spec section 2): landing `/<id>/`; app `/<id>/app/` (noindex, canonical `/<id>/`); practice test `/<id>/practice-test/`; lessons index `/<id>/lessons/` (unchanged); lesson pages `/<id>/lessons/<lessonId>-<slug>/` (unchanged slugs); cheat sheet `/<id>/cheatsheet/` and `/<id>/cheatsheet.pdf` (unchanged); guides `/guides/` and `/guides/<slug>/`; `404.html` and `og-image.png` at the web root.
- Hash forwarding on every landing page, first thing in `<head>`:
  `<script>if(location.hash&&/^#[a-z]/.test(location.hash))location.replace(location.pathname.replace(/\/?$/,'/')+'app/'+location.hash)</script>`
- Manifests: `catalogUrl: "/"`, `free: { lessons: 15 }`, and the `seo` block per course exactly as Task 1 lists it. Titles and H1s carry the target phrases verbatim: "CBET Study Guide and Practice Tests"; "BMET Training Course for the AAMI CABT (Biomed Training Course)"; "Network+ N10-009 Practice Tests and Study Guide"; "Security+ SY0-701 Practice Questions and Study Guide"; "A+ Core 1 220-1201 Practice Test and Study Guide"; "A+ Core 2 220-1202 Practice Test and Study Guide".
- Exam facts used in FAQs and guides (do not invent others): CBET 165 questions, 3 hours, offered May and November at test centers, $410 member / $460 non-member (2026), recertified every 3 years; full status after an associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of work alone; candidate status at the degree, the program, or two years alone, with five years to upgrade. CABT 100 questions, 2 hours, closed book, live remote proctoring year-round, $220 member / $270 non-member (2026), retake $190 / $240 after a 60-day wait, six months to test after purchase, valid 5 years non-renewable, high school junior or above, results pass or fail at once. CompTIA: Network+ N10-009 up to 90 questions in 90 minutes, passing 720 of 900; Security+ SY0-701 up to 90 in 90, 750 of 900; A+ 220-1201 up to 90 in 90, 675 of 900; A+ 220-1202 up to 90 in 90, 700 of 900. For CompTIA prices write "see CompTIA's current voucher price" rather than a number.
- Content rules for guides: original writing, no book, website, or source named (the ACI handbook and CompTIA are the issuing bodies and may be named as such), plain ASCII, lesson mini-markup (`## `, `- `, `1. `, `> `, fenced blocks, `**bold**`), one `> ` tip line is optional for guides.
- Practice-test selection: twenty questions apportioned across tested domains (`pct > 0`) by largest remainder with ties to the larger `pct`, then per domain the `-1` question of successive lessons in rail order, then `-2`, and so on until the quota is met; generated items never appear (the generator reads the bank only).
- Plain ASCII in every file written. Write files with the Write/Edit tools, never shell heredocs.
- Commit after every task; never push (Blake pushes). Branch `seo-course-site` off `main`.
- Deploy is `bash scripts/stage.sh` then Blake's go-live command; the stage script must place the bundle at `<id>/app/index.html` and the landing page at `<id>/index.html`.

## File structure

Modify:
- `courses/{bmet,cbet,netplus,secplus,aplus1,aplus2}/course.js` (Task 1): `seo`, `catalogUrl`, `free.lessons`.
- `site/build-site.js` (Tasks 2, 3, 5, 6): `model()` gains `questions` and `seo`; `urls.app`/`inApp` move; new `landingPage`, `pickPractice`, `practicePage`, `guidePage`, `guidesIndex`, `notFoundPage`; `shell()` gains `og:image`, `twitter:image`, an optional `head` prelude, and a `noindex` flag; `sitemap()` gains `lastmod`; `buildAll()` writes guides, the 404 page, and copies `og-image.png`.
- `tests/site.js` (Tasks 2, 3, 5, 6): new checks; the "app index never written" check flips.
- `build.py` (Task 4): bundle head gets `noindex`, canonical `/<id>/`, `og:url` `/<id>/`, `og:image`.
- `account/index.html`, `callback/index.html` (Task 4): `noindex`.
- `scripts/stage.sh` (Task 4): bundle to `<id>/app/index.html`.
- `index.html`, `tests/catalog.js` (Task 4): practice-test link per card; Guides link (Task 5).
- `README.md` (Task 7): URL layout, guides, the Search Console checklist.

Create:
- `site/guides/*.js` (Tasks 5 and 6): eight guides.
- `site/og-card.html`, `site/og-image.png` (Task 6).
- `tests/fixtures/guides/sample-guide.js` (Task 5).

---

### Task 1: Manifests: `seo` blocks, `catalogUrl`, fifteen free lessons

**Files:**
- Modify: `courses/bmet/course.js`, `courses/cbet/course.js`, `courses/netplus/course.js`, `courses/secplus/course.js`, `courses/aplus1/course.js`, `courses/aplus2/course.js`

**Interfaces:**
- Produces: `FRA.course.seo = { title, h1, intro, phrases: [], faq: [{ q, a }] }`, `FRA.course.catalogUrl === "/"`, `FRA.course.free.lessons === 15`. Tasks 2 and 3 read `seo`; the generator falls back to defaults when `seo` is absent (the mini fixture has none).

- [ ] **Step 1: Confirm the current values**

Run: `grep -n 'catalogUrl\|free:' courses/*/course.js`
Expected: six `catalogUrl: "../"` lines and six `free: { lessons: 10 }` lines.

- [ ] **Step 2: Edit the six manifests**

In each `course.js`: change `catalogUrl: "../"` to `catalogUrl: "/"`; change `free: { lessons: 10 }` to `free: { lessons: 15 }`; add the `seo` block directly after the `description` line. The six blocks:

```js
  // bmet
  seo: {
    title: "BMET Training Course for the AAMI CABT | BMET Academy",
    h1: "BMET Training Course for the AAMI CABT (Biomed Training Course)",
    intro: "BMET Academy is a free biomed training course for people starting out in healthcare technology management. Fifty-three lessons and thirteen hands-on labs on virtual instruments double as a CABT study guide, and the practice tests lead up to the AAMI/ACI Certified Associate in Biomedical Technology exam.",
    phrases: ["BMET training course", "biomed training course", "CABT study guide", "CABT practice tests"],
    faq: [
      { q: "What is the CABT?", a: "The Certified Associate in Biomedical Technology is the entry-level AAMI/ACI credential for biomedical equipment technicians: 100 questions in 2 hours, closed book, taken by live remote proctoring any time of year, valid five years." },
      { q: "Who can take the CABT exam?", a: "Anyone who is at least a high school junior. No work experience is required, which is what makes it the first credential for a new technician." },
      { q: "How much does the CABT cost?", a: "In 2026 the exam is $220 for AAMI members and $270 for non-members; a retake is $190 or $240 after a 60-day wait. The fee is non-refundable and the exam must be taken within six months of purchase." },
      { q: "Do I need a lab kit?", a: "No. Every kit lab also runs on the virtual multimeter in the browser. A kit of a multimeter, breadboard, resistors, a 9 V battery, LEDs, a switch, and a fuse holder costs about $60 to $100 if you want the hands-on version." },
      { q: "Is BMET Academy free?", a: "Yes. Every lesson, lab, practice test, and the printable memorization sheet are free while the site launches." },
      { q: "What comes after the CABT?", a: "The CBET, the working technician's credential, after two years of full-time work with an associate degree or a military biomed program, or four years of work alone; then the CRES for imaging or the CHTM for managers." }
    ]
  },
```

```js
  // cbet
  seo: {
    title: "CBET Study Guide and Practice Tests | CBET Academy",
    h1: "CBET Study Guide and Practice Tests",
    intro: "CBET Academy is a free CBET study guide and practice-test course for the AAMI/ACI Certified Biomedical Equipment Technician exam: sixty lessons organised by the exam's six domains, a printable memorization sheet, adaptive tutorials built from your misses, and unlimited CBET practice tests.",
    phrases: ["CBET study guide", "CBET practice tests", "CBET exam questions", "CBET cheat sheet"],
    faq: [
      { q: "How many questions are on the CBET exam?", a: "165 multiple-choice questions in 3 hours, closed book, with a simple on-screen calculator. About 116 correct, roughly 70%, passes; ACI sets the exact cut score with a criterion-referenced method." },
      { q: "When is the CBET offered?", a: "Twice a year, in May and November, at computer-based test centers. Applications open about three months before each window." },
      { q: "Who is eligible for the CBET?", a: "Full certification needs an associate degree in electronics, technology, or science plus two years of full-time BMET work, or a US military biomed program plus two years, or four years of full-time work alone. With the degree, the program, or two years of work alone you can sit as a candidate and have five years to upgrade." },
      { q: "How much does the CBET cost?", a: "In 2026 the exam is $410 for AAMI members and $460 for non-members. Certification is renewed every three years with continuing education." },
      { q: "How many practice tests should I take?", a: "This course asks for three of your last five fifty-question practice tests at 80% or better, then one full-length test in the real exam's format at the real passing score. Most learners get there in six to ten tests." },
      { q: "Is the course free?", a: "Yes. The lessons, the cheat sheet, and unlimited practice tests are free while the site launches." }
    ]
  },
```

```js
  // netplus
  seo: {
    title: "CompTIA Network+ N10-009 Practice Tests and Study Guide | NetPlus Academy",
    h1: "Network+ N10-009 Practice Tests and Study Guide",
    intro: "NetPlus Academy is a free Network+ N10-009 practice test and study guide course: forty-nine lessons mapped to the exam objectives, a printable memorization sheet of ports, protocols, and subnetting, tutorials built from what you miss, and unlimited practice tests in the exam's format.",
    phrases: ["Network+ N10-009 practice test", "Network+ study guide", "N10-009 practice questions"],
    faq: [
      { q: "How many questions are on the Network+ N10-009 exam?", a: "Up to 90 questions in 90 minutes, a mix of multiple choice and performance-based items. The passing score is 720 on a scale of 100 to 900." },
      { q: "What does the exam cover?", a: "Networking concepts, network implementation, network operations, network security, and network troubleshooting, in CompTIA's published weights. The course's practice tests use the same weights." },
      { q: "How much does Network+ cost?", a: "See CompTIA's current voucher price; the course itself is free." },
      { q: "How does this course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 720 of 900." },
      { q: "Can I read the lessons without signing up?", a: "The first fifteen lessons and the cheat sheet are open on this site; the full course, with checkpoints and practice tests, is free inside the app." }
    ]
  },
```

```js
  // secplus
  seo: {
    title: "CompTIA Security+ SY0-701 Practice Questions and Study Guide | SecPlus Academy",
    h1: "Security+ SY0-701 Practice Questions and Study Guide",
    intro: "SecPlus Academy is a free Security+ SY0-701 practice question and study guide course: fifty-four lessons across the five exam domains, a printable memorization sheet of controls, attacks, and protocols, tutorials built from your misses, and unlimited practice tests.",
    phrases: ["Security+ SY0-701 practice questions", "Security+ study guide", "SY0-701 practice test"],
    faq: [
      { q: "How many questions are on the Security+ SY0-701 exam?", a: "Up to 90 questions in 90 minutes, multiple choice and performance-based. The passing score is 750 on a scale of 100 to 900." },
      { q: "What are the SY0-701 domains?", a: "General security concepts, threats, vulnerabilities and mitigations, security architecture, security operations, and security program management and oversight." },
      { q: "How much does Security+ cost?", a: "See CompTIA's current voucher price; the course is free." },
      { q: "How does the course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 750 of 900." },
      { q: "Is Security+ harder than Network+?", a: "Most candidates find it broader rather than harder: more terminology, fewer calculations. The cheat sheet carries every term the objectives name." }
    ]
  },
```

```js
  // aplus1
  seo: {
    title: "CompTIA A+ Core 1 220-1201 Practice Test and Study Guide | APlus Academy Core 1",
    h1: "A+ Core 1 220-1201 Practice Test and Study Guide",
    intro: "APlus Academy Core 1 is a free A+ Core 1 220-1201 practice test and study guide course: forty-one lessons on mobile devices, networking, hardware, virtualization, cloud, and troubleshooting, a printable memorization sheet, tutorials built from your misses, and unlimited practice tests.",
    phrases: ["A+ Core 1 220-1201 practice test", "A+ 220-1201 study guide", "CompTIA A+ practice questions"],
    faq: [
      { q: "How many questions are on the A+ Core 1 exam?", a: "Up to 90 questions in 90 minutes, multiple choice and performance-based. The passing score is 675 on a scale of 100 to 900." },
      { q: "Do I need both A+ exams?", a: "Yes. The A+ certification needs Core 1 (220-1201) and Core 2 (220-1202); this course covers Core 1 and its sister course covers Core 2." },
      { q: "How much does A+ cost?", a: "See CompTIA's current voucher price for each exam; the course is free." },
      { q: "How does the course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 675 of 900." }
    ]
  },
```

```js
  // aplus2
  seo: {
    title: "CompTIA A+ Core 2 220-1202 Practice Test and Study Guide | APlus Academy Core 2",
    h1: "A+ Core 2 220-1202 Practice Test and Study Guide",
    intro: "APlus Academy Core 2 is a free A+ Core 2 220-1202 practice test and study guide course: forty-one lessons on operating systems, security, software troubleshooting, and operational procedures, a printable memorization sheet, tutorials built from your misses, and unlimited practice tests.",
    phrases: ["A+ Core 2 220-1202 practice test", "A+ 220-1202 study guide", "CompTIA A+ Core 2 practice questions"],
    faq: [
      { q: "How many questions are on the A+ Core 2 exam?", a: "Up to 90 questions in 90 minutes, multiple choice and performance-based. The passing score is 700 on a scale of 100 to 900." },
      { q: "What does Core 2 cover?", a: "Operating systems, security, software troubleshooting, and operational procedures, including scripting, remote access, and backups." },
      { q: "How much does A+ cost?", a: "See CompTIA's current voucher price for each exam; the course is free." },
      { q: "How does the course decide I am ready?", a: "Three of your last five fifty-question practice tests at 80% or better, then one ninety-question test at the real passing score of 700 of 900." }
    ]
  },
```

- [ ] **Step 3: Verify and run the suite**

Run: `grep -c 'seo: {' courses/*/course.js` then `npm test 2>&1 | tail -3`
Expected: each manifest reports 1; the suite is green (the static-site parity test now covers fifteen free lessons per course; `tests/site.js` reads `free.lessons` from the manifest). If `build.py`'s manifest regex rejects a `seo` block, move the block to the end of the manifest (after `legacyStoreKeys`) and re-run.

- [ ] **Step 4: Rebuild bundles and the site, commit**

```bash
python build.py && node site/build-site.js
git add courses/*/course.js dist/*.html dist/account.html dist/site
git commit -m "feat(seo): manifests carry seo blocks, catalogUrl at the root, fifteen free lessons"
```
(If `dist/site` shows only line-ending churn on untouched pages, stage the course bundles and the changed site pages by name instead.)

---

### Task 2: The landing page and the app move in the generator

**Files:**
- Modify: `site/build-site.js` (`model`, `shell`, `nav`, `coursePage` link text, new `landingPage`, `buildCourse`)
- Modify: `tests/site.js`

**Interfaces:**
- Consumes: `FRA.course.seo` (optional), `FRA.questions`.
- Produces: `m.urls.app === '/<id>/app/'`, `m.urls.landing === '/<id>/'`, `m.urls.practice === '/<id>/practice-test/'`, `m.urls.inApp(l) === '/<id>/app/#lesson/<id>'`; `shell(p)` accepts `p.head` (string prepended inside `<head>`), `p.noindex` (boolean), and always emits `og:image`/`twitter:image`; `landingPage(m, R, origin)`; `buildCourse` writes `/<id>/index.html` and lists `/<id>/` in the sitemap (the app URL is no longer listed).

- [ ] **Step 1: Write the failing tests**

In `tests/site.js`, section 2 (the mini fixture), replace the line
`check('the course app index is never written by the generator', !exists('mini/index.html'));`
with:

```js
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
```

Update the sitemap expectation in the same section: the `expected` list keeps `'https://example.test/mini/'` (now the landing page) and gains nothing else in this task; the lesson CTA check `check('lesson links into the app at its own lesson', p0.includes(`href="/mini/#lesson/${l0.id}"`))` becomes `p0.includes(`href="/mini/app/#lesson/${l0.id}"`)`.

- [ ] **Step 2: Run to see them fail**

Run: `node tests/site.js 2>&1 | grep -c FAIL`
Expected: at least 6 FAIL lines (landing page missing, old app link).

- [ ] **Step 3: Implement**

In `site/build-site.js`:

(a) `model()`: add `questions: FRA.questions || [], seo: c.seo || null,` to the returned object and change `urls` to:

```js
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
```

(b) `shell(p)`: after the `<meta charset>` line insert `${p.head || ''}`; after the canonical line insert `${p.noindex ? '<meta name="robots" content="noindex">' : ''}`; replace the twitter line with:
```js
<meta property="og:image" content="${esc(p.origin)}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(p.origin)}/og-image.png">
```

(c) `nav(m, current)`: `return item(m.urls.landing, 'Overview') + item(m.urls.course, 'Lessons') + item(m.urls.practice, 'Practice test') + item(m.urls.cheat, 'Cheat sheet') + item(m.urls.app, 'Start the course', 'btn primary small');`

(d) Add, after `coursePage`:

```js
const FORWARDER = `<script>if(location.hash&&/^#[a-z]/.test(location.hash))location.replace(location.pathname.replace(/\\/?$/,'/')+'app/'+location.hash)</script>`;

function defaultFaq(m) {
  const c = m.c; const ex = c.exam || {}; const t = c.test || {};
  const out = [];
  if (ex.questions && ex.minutes) out.push({ q: `How many questions are on the ${examName(c)} exam?`, a: `${ex.questions} questions in ${ex.minutes} minutes.${c.realExamNote ? ' ' + c.realExamNote : ''}` });
  if (t.passesNeeded && t.passWindow && t.passPct) out.push({ q: 'How does the course decide I am ready?', a: `${t.passesNeeded} of your last ${t.passWindow} practice tests at ${t.passPct}% or better, then one full-length test in the real exam's format at its passing score.` });
  out.push({ q: 'Is the course free?', a: 'Yes. Every lesson, the cheat sheet, and unlimited practice tests are free while the site launches.' });
  out.push({ q: 'Can I read the lessons without signing in?', a: `The first ${m.freeLessons.length} lessons and the cheat sheet are open on this site; the full course runs in the app.` });
  return out;
}

function landingPage(m, R, origin) {
  const c = m.c; const ex = c.exam || {}; const seo = m.seo || {};
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
${labs.length ? `<section><h2>Hands-on labs on virtual instruments</h2><p class="ink2">${labs.length} lessons carry a lab: a virtual multimeter on drawn circuits, an electrical safety analyzer, a patient simulator with a monitor, an infusion flow check, and a defibrillator analyzer. Every lab also runs on a $60 to $100 home kit.</p><ul class="lesson-body">${labs.map(l => `<li>${esc(l.title)}</li>`).join('')}</ul><p><a href="/guides/virtual-electrical-safety-analyzer-lab/">How the virtual safety analyzer lab works</a></p></section>` : ''}
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
```

(e) `buildCourse`: replace `pages.push({ url: m.urls.app, title: m.c.name, file: null });` with `pages.push({ url: m.urls.landing, title: m.c.name, file: writePage(opts.out, m.urls.landing, landingPage(m, R, origin)) });`. The lessons-index page's `crumbList` and the lesson pages' breadcrumbs keep `m.urls.course`; the `ctaCard` and lesson pages already use `m.urls.app`/`m.urls.inApp`, which now point under `app/`.

(f) In `coursePage` change the hero's H1 to `<h1>Every lesson in ${esc(c.name)}</h1>` and its title to `` `${c.name} lessons | ${BRAND}` `` so the lessons index and the landing page no longer compete for the same phrase; keep everything else.

- [ ] **Step 4: Run to see them pass**

Run: `node tests/site.js 2>&1 | tail -2` then `npm test 2>&1 | tail -2`
Expected: `ALL PASS` and the suite green (the lessons-index title check in `tests/site.js`, if any, is updated to the new title text).

- [ ] **Step 5: Commit**

```bash
git add site/build-site.js tests/site.js
git commit -m "feat(seo): landing page at the course URL with hash forwarding, Course and FAQ data; the app moves to /<id>/app/"
```

---

### Task 3: The practice-test page

**Files:**
- Modify: `site/build-site.js` (new `apportionN`, `pickPractice`, `practicePage`; `buildCourse` writes it)
- Modify: `tests/site.js`

**Interfaces:**
- Consumes: `m.questions`, `m.lessons`, `m.c.domains`, `m.seo`.
- Produces: `pickPractice(m, n) -> [{ ...question, lesson }]`, `practicePage(m, R, origin)`, the page at `m.urls.practice`, exported `apportionN` and `pickPractice` for the tests.

- [ ] **Step 1: Write the failing tests**

Append to `tests/site.js` section 2, after the landing checks:

```js
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
```

And add `'https://example.test/mini/practice-test/'` to the sitemap `expected` list.

- [ ] **Step 2: Run to see them fail**

Run: `node tests/site.js 2>&1 | grep -c FAIL`
Expected: 8 or more FAIL lines (`site.apportionN is not a function` first).

- [ ] **Step 3: Implement**

Add to `site/build-site.js` after `landingPage`:

```js
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
  const h1 = `${c.name} Practice Test: ${items.length} Free ${c.exam && c.exam.code ? c.exam.code + ' ' : ''}Questions with Answers`;
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
        about: examName(c) || c.name, educationalLevel: 'Beginner', provider: org(),
        hasPart: items.map(q => ({ '@type': 'Question', name: R.plain(q.q), eduQuestionType: 'Multiple choice', text: R.plain(q.q), suggestedAnswer: q.a.map(o => ({ '@type': 'Answer', text: R.plain(o) })), acceptedAnswer: { '@type': 'Answer', text: R.plain(q.a[q.c]) } }))
      },
      breadcrumbLd(origin, crumbList)
    ],
    body
  });
}
```

In `buildCourse` add, after the landing page push: `pages.push({ url: m.urls.practice, title: 'Practice test', file: writePage(opts.out, m.urls.practice, practicePage(m, R, origin)) });`. Export `apportionN` and `pickPractice` in `module.exports`. Add to `site/site.css`:

```css
.quiz { padding-left: 0; list-style: none; counter-reset: q; }
.quiz .q { counter-increment: q; margin: 0 0 22px; padding: 16px 18px; border: 1px solid var(--line, #e3e3e3); border-radius: 10px; }
.quiz .stem::before { content: counter(q) ". "; font-weight: 600; }
.quiz .opts { margin: 8px 0 10px 18px; }
.quiz details summary { cursor: pointer; font-weight: 600; }
.quiz details p { margin: 8px 0 0; }
```

- [ ] **Step 4: Run to see them pass**

Run: `node tests/site.js 2>&1 | tail -2` then `npm test 2>&1 | tail -2`
Expected: `ALL PASS`; suite green.

- [ ] **Step 5: Commit**

```bash
git add site/build-site.js site/site.css tests/site.js
git commit -m "feat(seo): crawlable practice-test page per course with twenty explained bank questions and Quiz data"
```

---

### Task 4: Bundle head, account and callback noindex, stage layout, catalog links

**Files:**
- Modify: `build.py` (lines 182 to 200, the `standalone` head), `account/index.html`, `callback/index.html`, `scripts/stage.sh`, `index.html` (cards), `tests/catalog.js`

**Interfaces:**
- Produces: `dist/<id>.html` head has `<meta name="robots" content="noindex">`, canonical and `og:url` `https://fieldreadyacademy.com/<id>/`, `og:image`; `account`/`callback` built pages carry `noindex`; `scripts/stage.sh` places the bundle at `$STAGE/<id>/app/index.html`; every catalog card's links line gains `Practice test`.

- [ ] **Step 1: Write the failing test**

In `tests/catalog.js`, inside the catalog-categories block after the ServiceForge check, add:

```js
    const cards = [...d.querySelectorAll('main .card')].filter(c => c.querySelector('h3 a') && !/serviceforge\//.test(c.querySelector('h3 a').getAttribute('href')));
    check('every course card links its practice test', cards.length === 6 && cards.every(c => { const id = c.querySelector('h3 a').getAttribute('href'); return !!c.querySelector(`.links a[href="${id}practice-test/"]`); }), cards.map(c => c.querySelector('h3 a').getAttribute('href')).join(','));
```

Run: `node tests/catalog.js 2>&1 | grep FAIL`
Expected: the new check fails.

- [ ] **Step 2: Catalog cards**

In `index.html`, in each of the six course cards change the links line to:
`<span class="links"><a href="<id>/lessons/">Read free lessons</a> &middot; <a href="<id>/practice-test/">Practice test</a> &middot; <a href="<id>/cheatsheet/">Cheat sheet</a></span>`
(six cards: bmet, cbet, netplus, secplus, aplus1, aplus2). Run `node tests/catalog.js 2>&1 | tail -1`: all pass.

- [ ] **Step 3: Bundle head in `build.py`**

Replace, inside the `standalone` f-string:
```
<link rel="canonical" href="https://fieldreadyacademy.com/{course_id}/">
```
with
```
<link rel="canonical" href="https://fieldreadyacademy.com/{course_id}/">
<meta name="robots" content="noindex">
<meta property="og:image" content="https://fieldreadyacademy.com/og-image.png">
```
(`og:url` already points at `/{course_id}/`, which is now the landing page: correct.)

- [ ] **Step 4: Account and callback**

In `account/index.html` and `callback/index.html` add `<meta name="robots" content="noindex">` right after the viewport meta. `build.py` inlines these sources, so the built pages inherit it. Run `python build.py 2>&1 | tail -3` and `grep -c 'name="robots"' dist/account.html dist/callback.html dist/bmet.html` -> 1 each.

- [ ] **Step 5: Stage layout**

In `scripts/stage.sh` change the course loop to:

```bash
for id in bmet netplus secplus cbet aplus1 aplus2; do
  mkdir -p "$STAGE/$id/app"
  cp "dist/$id.html" "$STAGE/$id/app/index.html"
  test -f "$STAGE/$id/index.html" || { echo "missing landing page for $id (run node site/build-site.js)"; exit 1; }
done
```
and update the header comment: "the six course bundles as `<id>/app/index.html`, each course's landing page at `<id>/index.html` from the static site". Run `bash scripts/stage.sh --local 2>&1 | tail -2` and `ls dist/stage/bmet dist/stage/bmet/app`: the landing `index.html` and `app/index.html` both exist.

- [ ] **Step 6: Suite, build, commit**

Run: `npm test 2>&1 | tail -2` (green), `python build.py`, `node site/build-site.js`.

```bash
git add build.py account/index.html callback/index.html scripts/stage.sh index.html tests/catalog.js dist/*.html dist/site
git commit -m "feat(seo): app bundles are noindex under /<id>/app/, account and callback noindex, catalog cards link the practice tests, stage places the app under app/"
```
(Stage `dist/site` changes by name if line-ending churn appears on untouched pages.)

---

### Task 5: Guides: loader, pages, index, one real guide, catalog link

**Files:**
- Create: `tests/fixtures/guides/sample-guide.js`, `site/guides/virtual-electrical-safety-analyzer-lab.js`
- Modify: `site/build-site.js` (`loadGuides`, `guidePage`, `guidesIndex`, `buildAll`), `tests/site.js`, `index.html` (Guides link), `catalog.css`, `tests/catalog.js`

**Interfaces:**
- Produces: `FRA.guides.push({ slug, title, description, updated, related: { courses: [], lessons: [] }, faq: [], body })` as the guide file shape; `loadGuides(dir) -> guides[]`; `guidePage(g, courses, origin)`; `guidesIndex(guides, origin)`; `buildAll(opts)` accepts `opts.guidesDir` (default `site/guides`) and writes `/guides/` and `/guides/<slug>/`, listing them in the sitemap; the catalog header gains `<nav class="top-links"><a href="/guides/">Guides</a></nav>`.

- [ ] **Step 1: Write the fixture and the failing tests**

Create `tests/fixtures/guides/sample-guide.js`:

```js
window.FRA = window.FRA || {};
FRA.guides = FRA.guides || [];
FRA.guides.push({
  slug: "sample-guide", title: "A Sample Guide & More", description: "A fixture guide for the generator tests.", updated: "2026-10-13",
  related: { courses: ["mini"], lessons: ["mini:u1l1"] },
  faq: [{ q: "Is this a test?", a: "Yes, a fixture." }],
  body: `This guide exists so the generator can be tested.

## A heading
- A bullet with **bold** and {{code}}.

> A tip line.`
});
```

Append to `tests/site.js` section 2 (the `buildAll` call there gains `guidesDir: path.join(ROOT, 'tests', 'fixtures', 'guides')`):

```js
check('guides index written', exists('guides/index.html') && read('guides/index.html').includes('href="/guides/sample-guide/"'));
check('guide page written with its title escaped', exists('guides/sample-guide/index.html') && read('guides/sample-guide/index.html').includes('<h1>A Sample Guide &amp; More</h1>'));
const gp = read('guides/sample-guide/index.html');
check('guide renders the mini-markup body', gp.includes('<h2>A heading</h2>') && gp.includes('<strong>bold</strong>') && gp.includes('<code>code</code>'));
check('guide links its related course landing page and lesson', gp.includes('href="/mini/"') && gp.includes(`href="${m.urls.lesson(m.lessons[0])}"`));
const gld = [...gp.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('guide JSON-LD: Article, FAQPage, BreadcrumbList', gld.map(x => x['@type']).join(',') === 'Article,FAQPage,BreadcrumbList' && gld[0].dateModified === '2026-10-13');
```
and add `'https://example.test/guides/'` and `'https://example.test/guides/sample-guide/'` to the sitemap `expected` list. In `tests/catalog.js` add `check('the catalog header links the guides', !!d.querySelector('header .top-links a[href="/guides/"]'));` in the categories block.

Run: `node tests/site.js 2>&1 | grep -c FAIL` -> 5 or more; `node tests/catalog.js 2>&1 | grep -c FAIL` -> 1.

- [ ] **Step 2: Implement the loader and pages**

In `site/build-site.js`:

```js
function loadGuides(dir) {
  if (!dir || !fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  const guides = (ctx.FRA && ctx.FRA.guides) || [];
  guides.forEach(g => { if (!/^[a-z0-9-]+$/.test(g.slug || '')) throw new Error(`guide slug invalid: ${g.slug}`); if (!g.title || !g.body || !g.updated) throw new Error(`guide ${g.slug} needs title, body, updated`); });
  return guides;
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
```

In `buildAll`, after the course loop:

```js
  const models = dirs.map(dir => model(loadPack(dir)));
  const guides = loadGuides(opts.guidesDir === undefined ? path.join(__dirname, 'guides') : opts.guidesDir);
  const guideUrls = [];
  if (guides.length) {
    writePage(out, '/guides/', guidesIndex(guides, origin)); guideUrls.push('/guides/');
    for (const g of guides) { writePage(out, `/guides/${g.slug}/`, guidePage(g, models, origin)); guideUrls.push(`/guides/${g.slug}/`); }
  }
```
and include `guideUrls` in `urls` before the sitemap is written (`const urls = ['/'].concat(...results.map(r => r.pages.map(p => p.url))).concat(guideUrls);`). Add `const vm = require('vm');` at the top if not present (the loader already uses a vm sandbox; reuse its context creation pattern). Export `loadGuides`, `guidePage`, `guidesIndex`.

Catalog: in `index.html` inside `.brand-row`, after the brand link, add `<nav class="top-links"><a href="/guides/">Guides</a></nav>` and in `catalog.css` add `.top-links { display: flex; gap: 14px; margin-left: auto; margin-right: 12px; font-weight: 600; } .top-links a { color: inherit; text-decoration: none; } .top-links a:hover { color: var(--accent); }`.

- [ ] **Step 3: Write the first real guide**

Create `site/guides/virtual-electrical-safety-analyzer-lab.js` with `slug: "virtual-electrical-safety-analyzer-lab"`, `title: "How the Virtual Electrical Safety Analyzer Lab Works"`, `updated: "2026-10-13"`, `related: { courses: ["bmet", "cbet"], lessons: ["bmet:u5l2", "bmet:u5l3", "bmet:u6l9"] }`, a description, four FAQ pairs, and a body of at least 600 words in the mini-markup covering: what an electrical safety analyzer measures (ground wire resistance, chassis leakage, patient lead leakage) and the conditions it tests (normal, reversed polarity, open ground, open neutral); the limits with their standards (NFPA 99 ground 0.5 ohm and chassis leakage 500 microamps in current editions, older 300 or 100; IEC 60601-1 touch current 100/500 microamps, patient leakage B and BF 100/500, CF 10/50); why reversed polarity with an open ground is the worst case; how the browser lab works (select the test, polarity, and ground condition, press Test, record the reading, the engine computes the verdict from the lab's own limits card, nothing is hard-coded); what a passing and a failing record look like; and that it is a teaching model, not an emulation of any brand. No source named, plain ASCII.

- [ ] **Step 4: Run the tests and the build**

Run: `node tests/site.js 2>&1 | tail -2`, `node tests/catalog.js 2>&1 | tail -1`, `npm test 2>&1 | tail -2`, `node site/build-site.js | tail -2`
Expected: all pass; the sitemap count rises by the guides index plus one guide (and by one practice-test page per course from Task 3).

- [ ] **Step 5: Commit**

```bash
git add site/build-site.js site/guides tests/fixtures/guides tests/site.js tests/catalog.js index.html catalog.css dist/site
git commit -m "feat(seo): guides section with Article and FAQ data, the safety-analyzer lab guide, Guides link in the catalog header"
```

---

### Task 6: The other seven guides

**Files:**
- Create: `site/guides/how-to-become-a-bmet.js`, `cbet-vs-cabt.js`, `cbet-exam-cost-and-dates-2026.js`, `cabt-exam-what-to-expect.js`, `network-plus-n10-009-exam-guide.js`, `security-plus-sy0-701-exam-guide.js`, `a-plus-220-1201-1202-exam-guide.js`

**Interfaces:**
- Consumes: the guide file shape from Task 5; the exam facts in Global Constraints.
- Produces: seven guides, each 600 to 1,000 words, `updated: "2026-10-13"`, three to five FAQ pairs, `related` courses and two or three lessons each (lesson ids from the packs' curriculum files; prefer free lessons, which are the first fifteen in rail order).

- [ ] **Step 1: Write the seven guides** (content task; follow the content rules in Global Constraints)

1. `how-to-become-a-bmet`: "How to Become a BMET (Biomedical Equipment Technician)": what the job is, the three ways in (associate degree programs, the military program, starting as an entry-level technician), the CABT as the first credential and why it needs no experience, what hiring managers look for, the first-year ladder, the CBET at two or four years. Related: bmet (u1l1, u8l1, u8l5).
2. `cbet-vs-cabt`: "CBET vs CABT: Which Exam Should You Take First?": who each is for, eligibility side by side (a fenced table), format and cost side by side, the five-year CABT validity and the five-year candidate upgrade window for the CBET, a decision rule (no experience: CABT now; two years or the degree: sit the CBET as a candidate). Related: bmet (u1l2, u8l5), cbet.
3. `cbet-exam-cost-and-dates-2026`: "CBET Exam Cost, Dates, and Retake Rules in 2026": the May and November windows, the application lead time, $410 / $460, candidate versus full status, the retake wait, recertification every three years, what to budget beyond the fee (membership optional, references). Related: cbet (its first lesson about the exam if one exists, else the cheat sheet via the course link).
4. `cabt-exam-what-to-expect`: "The CABT Exam: What to Expect on Test Day": 100 questions in 2 hours, the six domains with their weights, remote proctoring rules (enclosed room, clear desk, movable webcam, on-screen four-function calculator, warnings and termination), results at once, the 60-day retake wait, how to prepare in the last week. Related: bmet (u1l2, u4l1, u5l1).
5. `network-plus-n10-009-exam-guide`: "CompTIA Network+ N10-009 Exam Guide": format (up to 90 questions, 90 minutes, 720 of 900), the five domains, performance-based items, what to memorize cold (ports, subnetting, cable standards), how the course's practice tests map to the exam. Related: netplus (two free lessons).
6. `security-plus-sy0-701-exam-guide`: "CompTIA Security+ SY0-701 Exam Guide": format (up to 90, 90 minutes, 750 of 900), the five domains, what changed in 701 (plain words, no source), how to study terminology-heavy material. Related: secplus (two free lessons).
7. `a-plus-220-1201-1202-exam-guide`: "CompTIA A+ 220-1201 and 220-1202 Exam Guide": two exams, format of each (up to 90, 90 minutes; 675 and 700 of 900), the domains of each, order to take them, how the two courses split the work. Related: aplus1 and aplus2 (one free lesson each).

- [ ] **Step 2: Build and check**

Run: `node site/build-site.js | tail -2` (sitemap grows by seven), `node tests/site.js 2>&1 | tail -1`, and a plain-ASCII scan `LC_ALL=C grep -c '[^ -~]' site/guides/*.js` (all 0). Read each generated page once for a stray `undefined` (`grep -l "undefined" dist/site/guides/*/index.html` prints nothing).

- [ ] **Step 3: Commit**

```bash
git add site/guides dist/site
git commit -m "feat(seo): seven guides: becoming a BMET, CBET vs CABT, CBET cost and dates, the CABT exam, and the three CompTIA exam guides"
```

---

### Task 7: Sitemap dates, social image, 404 page, README

**Files:**
- Create: `site/og-card.html`, `site/og-image.png`
- Modify: `site/build-site.js` (`sitemap`, `notFoundPage`, `buildAll` copies the image and writes `404.html`), `tests/site.js`, `index.html` (og:image), `README.md`

**Interfaces:**
- Produces: `sitemap(origin, urls, lastmod)` emitting `<lastmod>` per URL; `dist/site/og-image.png`; `dist/site/404.html`; README sections "URL layout", "Guides", and "After a deploy that adds pages (Search Console)".

- [ ] **Step 1: Failing tests**

Append to `tests/site.js` section 2:

```js
check('sitemap entries carry a lastmod date', /<url><loc>[^<]+<\/loc><lastmod>\d{4}-\d{2}-\d{2}<\/lastmod><\/url>/.test(sm) && (sm.match(/<lastmod>/g) || []).length === locs.length);
check('the social image and the 404 page are written at the root', exists('og-image.png') && exists('404.html') && read('404.html').includes('<meta name="robots" content="noindex">') && read('404.html').includes('href="/bmet/"') === false);
```
(The 404 page links the catalog and the courses the build knows; with the mini fixture it links `/mini/`, so the last clause only asserts it does not hard-code bmet.) Run: `node tests/site.js 2>&1 | grep -c FAIL` -> 2.

- [ ] **Step 2: Implement**

`sitemap`:
```js
function sitemap(origin, urls, lastmod) {
  const day = lastmod || new Date().toISOString().slice(0, 10);
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(u => `  <url><loc>${esc(origin + u)}</loc><lastmod>${day}</lastmod></url>`).join('\n') + '\n</urlset>\n';
}
```
`notFoundPage(models, origin)`: a `shell()` page with `noindex: true`, path `/404.html`, title `Page not found | ${BRAND}`, body: an H1 "That page is not here", a sentence, and a list of links to `/`, `/guides/`, and each course's landing page from `models`. In `buildAll`: `fs.writeFileSync(path.join(out, '404.html'), notFoundPage(models, origin), 'utf8');` and `fs.copyFileSync(path.join(__dirname, 'og-image.png'), path.join(out, 'og-image.png'));`.

Social image: create `site/og-card.html` (1200 x 630, the brand colors from `catalog.css`, the FR mark, "FieldReady Academy", "Free certification courses that test you first", the six course names small) and render it once:
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --screenshot="E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/site/og-image.png" --window-size=1200,630 "file:///E:/CERT%20GUIDES/COMPTIA%20NET+/NetPlus%20Academy/site/og-card.html"
```
Commit the PNG (under 300 KB). Add `<meta property="og:image" content="https://fieldreadyacademy.com/og-image.png">` and `<meta name="twitter:card" content="summary_large_image">` to `index.html`'s head (replacing the `summary` card).

README: a "URL layout" section (landing at `/<id>/`, app at `/<id>/app/` with noindex, practice test, lessons, cheat sheet, guides, the forwarder), a "Guides" paragraph (file shape and where they live), and "After a deploy that adds pages": resubmit `/sitemap.xml` in Search Console; URL inspection and Request indexing on the six landing pages, the six practice-test pages, and `/guides/`; add the site to Bing Webmaster Tools by importing from Search Console; read the Performance report by query after four weeks. Also note the optional Caddy `handle_errors { rewrite * /404.html; file_server }` block for the 404 page.

- [ ] **Step 3: Run, build, commit**

Run: `npm test 2>&1 | tail -2` (green), `python build.py`, `node site/build-site.js`, `bash scripts/stage.sh --local 2>&1 | tail -2` (the stage holds `<id>/index.html`, `<id>/app/index.html`, `<id>/practice-test/index.html`, `guides/`, `og-image.png`, `404.html`).

```bash
git add site/build-site.js site/og-card.html site/og-image.png tests/site.js index.html README.md dist/site dist/index.html
git commit -m "feat(seo): sitemap lastmod, shared social image, 404 page, README URL layout and Search Console checklist"
```

---

### Task 8: Full verification and the deploy note

**Files:**
- Modify: this plan's Status section

- [ ] **Step 1: Verify the staged tree end to end**

Run from the repo root:
```bash
bash scripts/stage.sh --local 2>&1 | tail -2
for id in bmet cbet netplus secplus aplus1 aplus2; do for p in index.html app/index.html practice-test/index.html lessons/index.html cheatsheet/index.html; do test -f "dist/stage/$id/$p" || echo "MISSING $id/$p"; done; done
grep -c "<loc>" dist/stage/sitemap.xml
grep -l 'name="robots" content="noindex"' dist/stage/*/app/index.html dist/stage/account/index.html dist/stage/callback/index.html | wc -l
grep -L 'property="og:image"' dist/stage/*/index.html dist/stage/*/*/index.html dist/stage/guides/*/index.html | head
```
Expected: no MISSING lines; the sitemap count is 1 (home) + 6 x (landing + practice + lessons index + cheat sheet + 15 lessons) + 1 guides index + 8 guides = 124; 8 noindex pages; no page lacks the image tag.

- [ ] **Step 2: Open two pages from the stage in a browser-less check**

Run: `node -e "const {JSDOM}=require('jsdom');const fs=require('fs');for(const f of ['dist/stage/cbet/index.html','dist/stage/bmet/practice-test/index.html']){const d=new JSDOM(fs.readFileSync(f,'utf8')).window.document;console.log(f, '|', d.title, '|', d.querySelector('h1').textContent, '|', d.querySelectorAll('details').length,'details')}"`
Expected: the CBET landing title "CBET Study Guide and Practice Tests | CBET Academy" and H1; the BMET practice page with 20 details.

- [ ] **Step 3: Record and stop**

Append a `## Status` section to this plan: page counts, the sitemap total, the test tail, and the deploy note: "Deploy with `bash scripts/stage.sh` then the go-live command; the first deploy after this plan replaces each `/<id>/index.html` with the landing page and adds `/<id>/app/index.html`; then the Search Console checklist in README." Do not push, do not deploy; Blake does both.

```bash
git add docs/superpowers/plans/2026-10-13-seo-course-site.md
git commit -m "docs(plan): course site SEO status"
```

---

## Self-review against the spec

- Spec 1 decisions and URL plan: Tasks 2, 3, 4, 5 (every URL in the table has a writer; the app URL leaves the sitemap).
- Section 3 landing page: Task 2 (manifest `seo` from Task 1, forwarder, Course + FAQ + Breadcrumb, labs section for BMET, three buttons).
- Section 4 practice test: Task 3 (apportionment rule, `-1` then `-2` order, details markup, Quiz data).
- Section 5 free lessons: Task 1.
- Section 6 guides: Tasks 5 and 6 (eight guides, Article/FAQ/Breadcrumb, related links, catalog Guides link).
- Section 7 hygiene: Tasks 4 and 7 (noindex on app/account/callback, canonical, lastmod, og image, 404, no robots Disallow for app).
- Section 8 mechanics: Tasks 1 (catalogUrl), 2 (urls), 4 (build.py, stage.sh, tests).
- Sections 9 and 10: README checklist in Task 7; backlinks are Blake's.
- Simplification recorded: `lastmod` is the build date for every URL (the spec allowed a per-lesson git date; the build date is what Search Console needs to notice a change).

## Status

(Filled in by the executing tasks.)
