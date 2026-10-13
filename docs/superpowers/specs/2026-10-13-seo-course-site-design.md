# Course site SEO: landing pages, practice-test pages, guides, and indexing

Date: 2026-10-13. Asked by Blake: rank for "CBET", "CBET Study Guide", "CABT", "CABT Study
Guide", "Biomed Training Course", "BMET Training Course", "CBET Practice Tests", "CABT
Practice Tests", and "any other keywords you can get to rank high". Decided in conversation
(2026-10-13): raise free lessons to fifteen per course; move the app to `/<id>/app/` so the
course URL can be a real landing page; expose about twenty bank questions per course on a
crawlable practice-test page; do all five of the recommended items. A companion spec covers
ServiceForge (`2026-10-13-serviceforge-seo-design.md`).

## 1. Decisions

| Question | Decision | Why |
|---|---|---|
| Where the landing page lives | At the course URL `/<id>/`; the app moves to `/<id>/app/` | Google reads nothing in the app bundle; the course URL is the one people link to |
| Old deep links `/<id>/#lesson/u3l2` | The landing page forwards any hash route to `/<id>/app/#...` with a tiny inline script | No broken bookmarks; progress is in origin-scoped localStorage, unaffected by the path |
| Practice-test page | Twenty real bank questions with answers in the HTML behind a show-answer control | "Practice tests" searches want a test on the page, not a sign-in wall |
| Free lessons | `free: { lessons: 15 }` in every manifest | Free-lesson pages are the long-tail surface; fifteen is still a minority of every pack |
| Informational guides | A small set of static articles at `/guides/<slug>/`, written in the lesson mini-markup | Catches career-entry and exam-logistics queries the course pages cannot |
| Generator | Extend `site/build-site.js`; no new framework | The static generator, parity tests, Caddy host, and sync origin already exist |
| Head terms ("CBET", "CABT", bare CompTIA names) | Targeted only through the pages above; no tricks | They belong to AAMI, ACI, and CompTIA; long-tail wins first, head terms follow backlinks |

## 2. URL plan (per course `<id>` in bmet, cbet, netplus, secplus, aplus1, aplus2)

| URL | Page | Indexable | Source |
|---|---|---|---|
| `/<id>/` | Landing page (new) | yes | generator |
| `/<id>/app/` | The course app (moved) | no (`noindex`, canonical to `/<id>/`) | `dist/<id>.html` |
| `/<id>/practice-test/` | Practice-test page (new) | yes | generator |
| `/<id>/lessons/` | Lessons index (exists; stays) | yes | generator |
| `/<id>/lessons/<lessonId>-<slug>/` | Free lesson pages (exist; 15 now) | yes | generator |
| `/<id>/cheatsheet/`, `/<id>/cheatsheet.pdf` | Cheat sheet (exist) | yes | generator, build |
| `/guides/`, `/guides/<slug>/` | Guides index and articles (new) | yes | generator |
| `/`, `/account/`, `/callback/`, `/serviceforge/` | Unchanged (`/account/` and `/callback/` gain `noindex`) | catalog yes | existing |

Lesson slugs do not change (indexed URLs stay valid). The sitemap lists every indexable page with
a `lastmod` date (the build date for generated pages; the pack file's last git commit date for
lesson pages when available).

## 3. The landing page `/<id>/`

Built by a new `landingPage(m, R, origin)` in `site/build-site.js` from the pack and a small
per-course SEO block in the manifest:

    seo: {
      title: "CBET Study Guide and Practice Tests | CBET Academy",
      h1: "CBET Study Guide and Practice Tests",
      intro: "...",                       // two sentences carrying the phrases naturally
      phrases: ["CBET study guide", "CBET practice tests", "CBET exam questions"],
      faq: [{ q: "How many questions are on the CBET exam?", a: "..." }, ...]   // 5 to 7 pairs
    }

Content, in order: eyebrow (brand), H1, intro, the three buttons (Start the free course ->
`/<id>/app/`, Try a practice test -> `/<id>/practice-test/`, Read the cheat sheet), an exam facts
table (vendor, code, questions, minutes, passing rule, cost from the manifest and `examDay`),
"How the course works" (the existing HOW block), the free lessons list (fifteen links), the
units (titles only, as the lessons index does), for BMET a "Labs on virtual instruments"
section naming the five instruments with a link to the guide about the safety analyzer,
the FAQ, and the footer. Title tag and H1 carry the exact phrases; the intro uses each phrase
once in a sentence that reads naturally. The six manifests get their `seo` block; BMET's H1 is
"BMET Training Course for the AAMI CABT (Biomed Training Course)", the CompTIA courses use the
exam code plus "practice test" and "study guide".

Hash forwarding: the landing page's `<head>` carries, before any stylesheet,
`<script>if(location.hash&&/^#[a-z]/.test(location.hash))location.replace(location.pathname.replace(/\/?$/,'/')+'app/'+location.hash)</script>`
so `/<id>/#lesson/u3l2` lands on `/<id>/app/#lesson/u3l2`. The app's own `viewFromHash` is
unchanged.

Structured data on the landing page: `Course` (name, description, provider Organization,
`hasCourseInstance` with `courseMode: "online"`, `courseWorkload`, free `offers`),
`FAQPage` from the `seo.faq` pairs, and `BreadcrumbList`. Open Graph and Twitter card tags as
on the lesson pages, plus the shared image (section 7).

## 4. The practice-test page `/<id>/practice-test/`

Twenty questions drawn deterministically from the bank: apportion twenty across the tested
domains by `pct` (largest remainder, the engine's `apportion` rule), then within each domain
take the first question (`-1`) of the first N lessons of that domain in rail order. Generated
items and untested domains are excluded. Each item renders as the stem, the four options with
letters, and a `<details><summary>Show the answer</summary>` block with the correct letter and
the explanation, so the answer text is in the HTML for crawlers and hidden for readers until
clicked. No sureness, no scoring; a closing card says "That was 20 of N. Every question in the
course is explained like this." with the Start button to `/<id>/app/`.

Title: "<Course> Practice Test: 20 Free <Exam code> Questions with Answers". Structured data:
`Quiz` with `hasPart` Question / `acceptedAnswer` items, and `BreadcrumbList`. The page links
to the landing page, the lessons index, and the cheat sheet.

## 5. Free lessons

`free: { lessons: 15 }` in all six manifests. The engine already reads this (freemium gating is
off; `freeCourse: true`), the generator already writes one page per free lesson, and the parity
test already covers every free lesson. The lessons index marks the fifteen as "Read here".

## 6. Guides `/guides/<slug>/`

Source files `site/guides/<slug>.js` in the pack convention (`window.FRA.guides` entries so
the same jsdom loader and `site/markup.js` renderer apply), each with `title`, `description`,
`slug`, `body` in the lesson mini-markup, `related` (course ids and lesson ids to link),
`faq` (optional), and `updated` (ISO date). Eight guides in the first release:

1. `how-to-become-a-bmet`: the job, the paths in, the CABT as the first credential, the ladder.
2. `cbet-vs-cabt`: who each exam is for, eligibility, cost, format, which to take first.
3. `cbet-exam-cost-and-dates-2026`: fees, windows, retake rules, recertification, from the handbook.
4. `cabt-exam-what-to-expect`: format, remote proctoring rules, the six domains, how to prepare.
5. `virtual-electrical-safety-analyzer-lab`: what the safety analyzer measures, the limits, how the
   browser lab works, with a link to the BMET landing page (the unique-asset page).
6. `network-plus-n10-009-exam-guide`, 7. `security-plus-sy0-701-exam-guide`,
8. `a-plus-220-1201-1202-exam-guide`: format, domains, passing score, how the course maps to it.

Each guide page: H1, byline date, body, "Related" links to the course landing page, its
practice test, and two or three free lessons; `Article` and `BreadcrumbList` structured data,
`FAQPage` when `faq` is present. `/guides/` lists them. The catalog's top bar gains a "Guides"
link; each landing page links to its guides. Guides are original writing with no source named,
same content rules as the packs; handbook facts come from the conventions already recorded
(fees, windows, eligibility).

## 7. Site-wide hygiene

- `noindex` on `/<id>/app/`, `/account/`, `/callback/` (`build.py` injects
  `<meta name="robots" content="noindex">` into the bundle head and sets the bundle's canonical
  and `og:url` to `/<id>/` with the page's `description` from the manifest).
- Canonical on every generated page (exists); `lastmod` in the sitemap (new); the sitemap gains
  the landing, practice-test, and guide URLs.
- One shared social image `/og-image.png` (1200 x 630, the FR mark, "FieldReady Academy",
  "Free certification courses that test you first"), rendered once by headless Chrome from
  `site/og-card.html` and committed; every page's `og:image` and `twitter:image` point at it.
- `404.html` at the web root with the catalog's shell and links to the six courses; Caddy needs
  one `handle_errors` block to serve it, listed in the deploy notes for Blake (optional).
- Internal links: landing -> practice test, lessons, cheat sheet, guides; lesson pages ->
  landing (the breadcrumb and the CTA); guides -> landing and practice test; catalog -> Guides.
- `robots.txt` unchanged except `Disallow: /*/app/` is NOT added (the pages carry `noindex`;
  blocking the crawl would hide the tag).

## 8. The app move, mechanically

- `build.py`: the bundle's canonical and `og:url` become `/<id>/`; a `robots noindex` meta is
  added; nothing else in the bundle changes.
- Manifests: `catalogUrl: "/"` (today `"../"`, which from `/<id>/app/` would resolve to the
  landing page).
- `scripts/stage.sh`: copies `dist/<id>.html` to `$STAGE/<id>/app/index.html` and the generated
  landing page (already at `dist/site/<id>/index.html` after `cp -a dist/site/.`) stays at
  `$STAGE/<id>/index.html`. The generator must therefore write `/<id>/index.html`; today it
  deliberately never does (the bundle lived there). `site/build-site.js` `urls.app` becomes
  `/<id>/app/` and `urls.inApp(l)` becomes `/<id>/app/#lesson/<id>`.
- Deploy note: on the first deploy after this change, `/<id>/index.html` on the server is
  replaced by the landing page and `/<id>/app/index.html` appears; a learner mid-session on the
  old URL gets the landing page, whose forwarder sends their hash to the app. No Caddy change.
- Auth: `FRAAuth.beginSignIn` stores `location.pathname + location.hash` as the return path,
  so sign-in from `/<id>/app/` returns there. The callback path is absolute. Sync keys are
  origin-scoped. No change.
- The dev shells `<id>/index.html` (unbundled, relative `../engine/` paths) stay where they are;
  they are for local work and tests, never deployed.
- `tests/loaders.js`, `tests/catalog.js` (card links point at `/<id>/`, which is now the landing
  page, so the catalog test adds a check that `/<id>/practice-test/` is linked from each card's
  links line), `tests/site.js` (new checks: every course has a landing page with the manifest's
  H1, a practice-test page with twenty `<details>` answers whose correct letters match the bank,
  the forwarder script, `noindex` on the bundle; every guide renders; the sitemap lists every
  page with `lastmod`), `tests/analytics.js` (new pages carry the snippet; it walks `dist/site`
  so no list change).

## 9. Search Console checklist (Blake, after deploy)

1. Resubmit `/sitemap.xml`.
2. URL inspection and "Request indexing" on the six landing pages, the six practice-test pages,
   and `/guides/`.
3. Add the property to Bing Webmaster Tools (import from Search Console) so Bing and DuckDuckGo
   pick the sitemap up.
4. After four weeks, read the Performance report by query and page; the plan's success check is
   impressions for the target phrases, then clicks.

## 10. Backlinks (Blake, not code)

The page to share is the safety-analyzer guide (section 6, item 5) with the BMET landing page:
the BMET subreddit, the AAMI community forum, TechNation and 24x7 forums, LinkedIn, and a
short YouTube walkthrough of the virtual instruments. One honest post per venue, no spam.

## 11. Tests and success criteria

`npm test` stays green; `tests/site.js` grows by the checks in section 8; the generator's
output count becomes, per course, 1 landing + 1 practice test + 1 lessons index + 15 lessons
+ 1 cheat sheet, plus the guides and their index. Success in Search Console: the landing and
practice-test pages indexed within a month of deploy; impressions for the exam-code phrases
within two months; the bare "CBET" and "CABT" terms are a six-month goal.

## 12. Out of scope

Paid search, email capture on the landing pages, A/B testing, programmatic pages for the
CompTIA objectives, and anything that changes the course flow. ServiceForge pages are the
companion spec.

## Appendix: keyword map

- Named by Blake: CBET, CBET Study Guide, CABT, CABT Study Guide, Biomed Training Course,
  BMET Training Course, CBET Practice Tests, CABT Practice Tests.
- Exam-code long tail: N10-009 practice test, SY0-701 practice questions, 220-1201 practice
  test, 220-1202 study guide, CBET exam questions, CBET cheat sheet, CABT exam, CABT practice
  questions.
- Career entry: how to become a BMET, biomedical equipment technician training, BMET
  certification, biomed certification online, entry level biomed course.
- Unique assets: virtual electrical safety analyzer, online patient simulator, biomed labs
  online, free CBET practice test.
- Lesson long tail: each free lesson's title phrase.
