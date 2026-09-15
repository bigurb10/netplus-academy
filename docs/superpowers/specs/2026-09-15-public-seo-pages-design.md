# Public SEO pages

Date: 2026-09-15. Implements section 3 ("the public site") of the 2026-09-06 platform
design for the part that matters at launch: crawlable static HTML for search traffic.

## Goal

Real HTML pages a crawler can read, generated from the course packs: a landing page per
course, the cheat sheet as a public page, and every free lesson as its own indexable page,
with titles, meta descriptions, Open Graph tags, a sitemap, and Course structured data.
Blake asked for this on 2026-09-15 ("and the SEO").

## Decision: a static generator on the existing host, not Next.js on Vercel

The platform design recommended Next.js on Vercel. This implementation deviates, and the
deviation is the one thing Blake should veto if he disagrees.

Why: the site is already static files served by Caddy at fieldreadyacademy.com. The packs
are the data, the engine's lesson renderer is forty lines, and every page here is pure
static HTML. A framework plus a second host would split the domain (progress-sync CORS
allow-list, the auth redirect URI, web origins are all keyed to fieldreadyacademy.com),
add a build toolchain and a Vercel project, and gain nothing for these pages. If the site
later needs dynamic pages, Next.js is still available for that.

## URLs

Additive. The course app stays exactly where it is at `/<id>/`, and every URL below is new.

| URL | Page |
|---|---|
| `/` | Home. Hand-maintained `index.html`; gains Open Graph tags, JSON-LD (Organization, WebSite, ItemList of the five course pages), and a link per course to its lessons and cheat sheet. |
| `/<id>/lessons/` | The course landing page: description, exam facts (code, questions, minutes), domains with their exam weights, how the course works, and every unit and lesson listed in order. Free lessons link to their pages; the rest are titles. Course JSON-LD (the canonical Course entity). Call to action into the app. |
| `/<id>/lessons/<lessonId>-<slug>/` | One page per free lesson: unit, domain and objective pills, title, the lesson body, the "Remember" hook, the deeper explanation in full, previous and next links among the free lessons, call to action into the app. Article and BreadcrumbList JSON-LD. |
| `/<id>/cheatsheet/` | The memorization sheet as HTML: every section, every table, the acronyms table. Links to the PDF at `/<id>/cheatsheet.pdf` and to the app. |
| `/sitemap.xml`, `/robots.txt` | Every public page; robots allows everything and names the sitemap. |
| `/site.css` | Styles for the public pages. |

`/<id>/` (the app bundle) gains a canonical link and Open Graph tags through `build.py`.
It carries no Course JSON-LD so the Course entity lives on exactly one URL.

**Free lessons** are the first `course.free.lessons` lessons in course order (10 per
course today), the same set `engine/app.js` unlocks when a course is gated. Everything is
free in the app right now, but the public sample follows the freemium line in the business
model so nothing has to be unpublished when gating turns on. Questions, generators, and
deeper explanations of non-free lessons are never published.

## Components

- `site/markup.js`: the lesson mini-markup renderer (`## `, `- `, `1. `, `> `, fenced
  blocks, `{{code}}`, `**bold**`) and the cheat sheet block renderer, mirroring
  `engine/app.js` rule for rule. One deliberate difference: acronyms become
  `<abbr title="full: tip">` instead of the app's click spans, because a static page
  has no modal to open.
- `site/build-site.js`: loads each pack in a Node `vm` sandbox in the same order
  `tests/lib.js` uses, builds the page model (free lessons, slugs, titles, descriptions,
  JSON-LD), renders through `site/markup.js`, and writes `dist/site/`. No new
  dependencies. `npm run build:site`.
- `site/site.css`: the catalog's tokens (linked from `/catalog.css`) plus the lesson-body
  and cheat-sheet rules copied from `engine/styles.css`.
- `build.py`: canonical link and Open Graph tags in each bundle head.
- `index.html`: Open Graph, JSON-LD, and the two extra links per course card.

Titles: `<Lesson title> | <exam title> <exam code> | FieldReady Academy`. Descriptions: the
lesson's first paragraph cut at a word boundary under 160 characters, falling back to the
hook. Slugs: the lesson id, a hyphen, then the title lower-cased with runs of non-alphanumerics
collapsed to hyphens, so URLs stay stable if a title is edited (the id leads).

## Testing

`tests/site.js`, part of `npm test`:

1. Parity: boot the real engine through `tests/lib.js` for every course, open every free
   lesson, and assert the generator's lesson-body HTML equals the engine's after acronym
   markup is normalised on both sides. The generator cannot drift from the app silently.
2. Generator output on `tests/fixtures/mini`: the expected files exist, no lesson beyond
   `free.lessons` is written, titles and canonical URLs are right, every JSON-LD block
   parses, the sitemap lists every page and nothing else, and text is HTML-escaped.

## Deploy

`python build.py` (bundles) and `npm run build:site`, then copy `dist/site/` over
`/var/www/fieldready/` and chown to `caddy:caddy`. The generator writes only under
`/<id>/lessons/`, `/<id>/cheatsheet/` and the root files, so it can never overwrite a
course bundle's `index.html`. The home page is copied separately, as before.

## Out of scope

FAQ structured data (Google limits FAQ rich results to government and health sites since
2023), per-unit pages, publishing non-free lessons, moving the app off `/<id>/`, and any
change to the engine.
