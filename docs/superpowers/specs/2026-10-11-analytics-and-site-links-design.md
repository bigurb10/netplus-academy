# Analytics, home links, and ServiceForge links

Date: 2026-10-11. Asked by Blake: install Google Analytics, a way to see current traffic,
the FieldReady Academy logo links home on every page (named: the catalog and
/serviceforge/), a ServiceForge link on the main page, and a ServiceForge link next to
"All courses" in the course topbar.

## 1. Google Analytics 4

**One source for the ID.** `analytics.json` at the repo root:

    { "ga4MeasurementId": "" }

A GA4 Measurement ID (`G-XXXXXXXXXX`) is public in every page's source, so it is committed.
An empty string means no snippet is emitted anywhere, so local builds and tests carry no
tracking until the real ID is pasted in.

**Injection.** Each builder emits the standard gtag snippet immediately before `</head>`:

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-..."></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());gtag('config','G-...');</script>

- `build.py` (`ga_snippet()`): every course bundle, `dist/index.html` (catalog),
  `dist/account.html`, `dist/callback.html`, and the new `dist/serviceforge.html`.
- `site/build-site.js` (`gaSnippet(id)` in `shell()`): every static lessons, lesson, and
  cheat-sheet page. `buildAll({ analytics })` overrides the file so tests can assert both
  states without touching `analytics.json`.

**Course app page views.** `engine/app.js` already calls `history.pushState` with a hash
per view (`#lesson/u3l2`, `#exam`, ...). GA4 Enhanced measurement ("Page changes based on
browser history events", on by default) turns each into a `page_view` whose
`page_location` carries the hash, so lessons, tests, and results are visible in reports
with no engine change. Known inflation: the first render replaces `/<id>/` with
`/<id>/#home`, which GA4 may count as a second page view on course entry. Accepted.

**Tests.** `tests/analytics.js` reads `analytics.json` and checks every tracked built
page in `dist/` and every `dist/site/**/index.html`: the snippet is present exactly once
and before `</head>` when the ID is set, and absent when it is empty. This catches
"changed the ID, forgot to rebuild". `tests/site.js` builds the mini fixture with
`analytics: 'G-TEST'` and with `''` and asserts each.

## 2. The logo goes home on every page

| Page | Today | Change |
|---|---|---|
| Catalog `/` | `div.brand` | `a.brand href="/"` (catalog.css already styles `a.brand`) |
| `/serviceforge/` | `div.brand`, server-only file | brought into the repo as `serviceforge/index.html`; `a.brand href="/"` |
| Course app topbar | course mark + course name, goes to course Home | a new `a.brand.site` with the `FR` mark before it, href `course.catalogUrl` (`../`), title "FieldReady Academy: all courses". The course brand keeps its job. |
| Static lesson/cheat-sheet pages | already `a.brand href="/"` | none |
| `/account/` | already `a.brand href="/"` | none |
| `/callback/` | no header (transient) | none |

The topbar mark stays visible on phones, where `.nav` (and with it "All courses") is
hidden, so it is also the first way home on mobile. Hover turns the mark accent-coloured.

## 3. ServiceForge on the main page

A new section after the course cards, before "How every course works":

    <h2>Tools for technicians</h2>
    one .card: pill "Free", h3 link "ServiceForge" -> serviceforge/, one-paragraph
    description, "Open ServiceForge" go link.

The courses ItemList JSON-LD stays courses-only.

## 4. ServiceForge in the course topbar

After "All courses" in `engine/app.js`:

    <a href="${catalogUrl}serviceforge/" title="...">ServiceForge</a>

Derived from `catalogUrl` so the engine stays course-agnostic and the path moves with the
catalog. Rendered only when `catalogUrl` is set (all five manifests set it).

## 5. Seeing traffic

Nothing records traffic today: no analytics, and Caddy has no access log configured
(`/var/log/caddy/` is empty; the journal holds only TLS and proxy warnings).

- After the GA4 install: Reports > Realtime shows the last 30 minutes; Reports > Engagement
  > Pages and screens shows page views by URL (hash included for the course app).
- Server-side, optional: a `log` directive in the Caddyfile's `(site)` snippet writing JSON
  to `/var/log/caddy/access.log`, read with `goaccess --log-format=CADDY`. Counts every
  request, ad blockers included, no JavaScript needed. Delivered as a separate one-shot
  script Blake runs (backup, edit, `caddy validate`, reload; restore on failure).

## 6. ServiceForge page into the repo

`/var/www/fieldready/serviceforge/index.html` had no local source. It becomes
`serviceforge/index.html` here (byte-for-byte the live file, plus the brand link), built by
`build_serviceforge()` into `dist/serviceforge.html` with the analytics snippet. It keeps
its `../catalog.css` link.

## 7. Staging script

`scripts/stage.sh`: builds bundles and the static site, assembles `dist/stage/` as a
web-root mirror (catalog, catalog.css, favicons, account, callback, serviceforge, five
course bundles, site.css, robots.txt, sitemap.xml, every `<id>/lessons/` and
`<id>/cheatsheet/` page), copies it to `hetzner:/tmp/fra-deploy/`, and prints the one
deploy command Blake runs (tar backup, `cp -a`, `chown`). Cheat sheet PDFs are unchanged
and not staged. Nothing touches `/var/www` without Blake.

## Out of scope

Event tracking (sign-ins, test completions), a cookie banner (GA4 with default settings
and no ads features; revisit if EU traffic matters), ServiceForge in the static pages'
site-nav, the mobile bottom nav.
