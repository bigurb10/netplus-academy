# Account page and catalog sign-in

Date: 2026-09-23. Approved by Blake the same day (full summary per course; the account page may show the email, nothing else may).

## Why

Blake asked for three things on 2026-09-23: the course topbar must stop showing the sign-in email as the learner's name; the catalog at `/` needs a sign-in link; and clicking your profile must open a page with your progress on every course on your account.

## What ships

1. **`engine/summary.js`** (new, pure, no DOM, loaded as a plain script that sets `window.FRASummary`, CommonJS-exported like `merge.js`). One function:

   `summarize(state, meta) -> { started, stage, stageLabel, lessonsPassed, lessonsTotal, bestPct, streak, streakNeeded, official, lastStudied }`

   - `meta = { lessons, passPct, streakNeeded, examQuestions }` comes from the course manifest and curriculum at build time.
   - `stage` mirrors `stage()` in `engine/app.js` rule for rule: no starter exam -> `starter`; a plan with lessons still to pass -> `tutorial` when the plan came from the starter, else `retrain`; streak reached -> `ready` when `official` is set, else `official`; no full/practice exam yet -> `fulltest`; otherwise `practice`. A plan lesson counts as done only when its status is `passed` and `passedAt >= plan.createdAt`, exactly as `planDone` in app.js.
   - `stageLabel` uses the app's labels, with the test size from `meta.examQuestions`.
   - `lessonsPassed` counts lessons whose status is `passed`; `lessonsTotal` is `meta.lessons`.
   - `bestPct` is the highest `pct` over exams of kind `full` or `practice`, else null.
   - `streak` and `official` are read from the state (`passStreak`, `official`), which merge and finishExam both recompute.
   - `lastStudied` is `touchedAt` (the app stamps it on every navigation), else null.
   - `started` is true when the state has any exam or any lesson not `new`.
   - Never throws on a malformed state: missing fields read as empty.

2. **`account/index.html`**, hand-written like `callback/index.html`, deployed at `/account/`. Loads `../catalog.css`, `../engine/auth.js`, `../engine/summary.js`, and its own inline script. `build.py build_account()` inlines all three and injects `window.FRA_COURSES` (id, name, exam title and code, lessons, passPct, streakNeeded, examQuestions, in catalog order) so the deployed page is one file.

   - Signed out: heading, one line ("Sign in to see your progress on every course."), a Sign in button that calls `FRAAuth.beginSignIn('/account/')`.
   - Signed in: heading is the name when the token has one, otherwise "Your progress"; a muted "Signed in as <email>" line (the only place the email appears); a Sign out button (calls `FRAAuth.signOut()` and re-renders).
   - Data: `GET /v1/progress` (list), then `GET /v1/progress/<id>` for every listed course that is also in `FRA_COURSES`. Requests carry `Authorization: Bearer` from `FRAAuth.accessToken()` and `Cache-Control: no-store` is respected by not caching anything client-side.
   - Rendering: one card per course in `FRA_COURSES` order. With a row: stage label, "N of M lessons passed", best practice score or "no test yet", "streak S of 3", official-format test passed date or "not yet", last studied (relative, from `touchedAt`), last synced (from the row's `updated_at`), a Continue button to `/<id>/`. Without a row: "Not started" and a Start link.
   - Errors: 401 on any request -> `FRAAuth.signOut()` and the signed-out view with "Your session ended, sign in again." Any other failure -> "Couldn't load your progress." and a Retry button. A course whose row fails to parse renders as "Couldn't read this course's progress" without breaking the others.
   - No sync, no merge, no writes: the page is read-only on the account's server copy. Local (unsynced) progress on this device is not consulted; the course pages push within seconds of a change, and a stale number here is a sync problem to fix at the source.

3. **Catalog header** (`index.html` at the root): a right-aligned account control inside the hero's brand row. Signed out: a "Sign in" button that calls `beginSignIn('/')`. Signed in: the name (or "My progress") as a link to `/account/`, and a Sign out button. `build.py build_catalog()` inlines `engine/auth.js` into `dist/index.html`; the source page keeps a `<script src="engine/auth.js">` tag so it also works unbundled. The static SEO pages and everything else on the catalog are untouched.

4. **Course topbar** (`engine/app.js` `acctHtml`): the `.who` label becomes `<a class="who" href="/account/">` with the name or "Signed in". The email is never rendered there (shipped earlier today). Sign out is unchanged.

5. **Styles**: `.acct .who` link colour and underline on hover in `engine/styles.css`; account page and catalog header rules live in `catalog.css` (both pages already load it).

## Testing

- `tests/summary.js`: every stage, the plan-done rule, best score over the right kinds only, a malformed state, and the started flag.
- `tests/account.js`: boots `account/index.html` under jsdom with a mocked `fetch` and a stored token: signed-out view; signed-in view with two rows (numbers rendered, courses without rows show Start, email shown once, no email elsewhere); a 401 on the list signs out; a 500 shows Retry; a row with a bad body does not break the other cards.
- `tests/catalog.js`: boots the root `index.html`: signed-out shows Sign in; signed-in shows the name link to `/account/` and Sign out; a token without a name shows "My progress".
- `tests/engine.js`: the topbar `.who` is a link to `/account/`.
- All registered in `package.json`'s test script; `npm test` stays green.

## Deploy

`python build.py` writes `dist/index.html`, `dist/account.html`, the five bundles, and `dist/callback.html`. Targets: `/index.html`, `/account/index.html`, `/<id>/index.html`. Because the auto-mode classifier is refusing overwrites of live files today, everything is staged under `/tmp/fra-deploy/` on the box and Blake runs one copy command.

## Out of scope

Per-domain breakdowns, editing anything from the account page, deleting an account, showing unsynced local progress, and any paywall or entitlement display.
