# Paywall brief: what to decide and what gets built

Date 2026-10-15. For Blake. Nothing here is built; this is the set of decisions that unblock the
build and my recommendation for each. Standing rulings from 2026-09-06: launch free, then
per-course premium; the cheat sheet, the starter test, and the first ten lessons stay free;
perhaps one whole course stays free as a hook; suggested prices $39 per course and $89 per year
for everything. The engine's gating was built with those rules and is switched off.

## What exists already

- **Sign-in** through WorkOS AuthKit, one tenant for the course site and the MCP server. Every
  learner who syncs progress has a WorkOS user id.
- **Progress API** on the Hetzner box (FastAPI, Postgres on 5433) with per-user rows, the
  feedback endpoint, and the weekly report. It is the natural home for entitlements.
- **Gating in the engine:** each manifest has `free: { lessons: N }` and `upgradeUrl`; the
  engine computes the free set and can lock the rest. `freeCourse: true` keeps a course fully
  open. Today every course is `freeCourse: true` or has no paywall shown.
- **Public pages** (landing, lessons index, free lessons, cheat sheet, practice test, PBQs,
  flashcards) are static and stay free whatever the app does.

## Decisions for Blake

1. **Payment provider.** Recommendation: **Stripe Checkout with Stripe Tax and the Customer
   Portal.** One hosted checkout page, no card data on our box, tax handled, the portal gives
   learners self-service receipts and cancellation. The alternative, a merchant of record such
   as Lemon Squeezy or Paddle, takes roughly 5% plus fees but removes sales-tax filing
   entirely; worth it only if sales come from many states and countries early. Start with
   Stripe; switching later is a webhook change.
2. **Prices.** Recommendation: **$39 per course, lifetime access to that course; $89 per year
   for every course, current and future.** The yearly plan is the one to push on the catalog
   because it funds the next courses. No monthly plan at launch: a cert study cycle is 6 to 12
   weeks and monthly plans invite churn right after the exam.
3. **The free hook.** Recommendation: **BMET Academy stays fully free.** It is the career-entry
   course, it is where a new technician meets the brand, and it feeds the three paid AAMI
   courses. A+ Core 1 is the other candidate because it has the most search traffic, but it
   also has the most direct competition and would be the easiest sale to lose.
4. **What stays free in a paid course.** Keep the standing rule: cheat sheet, starter test, the
   first ten lessons (CHTM and CRES already show fifteen on the public pages; the public free
   lessons stay as they are), the public PBQ and flashcard pages. Paid: the rest of the
   lessons, practice and official-format tests, retraining, labs, the PBQs tab, progress sync.
5. **Refunds.** Recommendation: 14 days, no questions, through the Stripe portal; an exam-fail
   guarantee is not offered until there is pass data to price it.
6. **Launch date.** Recommendation: switch gating on course by course, starting with the
   course that has the most signed-in learners in the progress table, two weeks after the
   flashcards and exam-facts pages are indexed, so the free funnel is in place first.

## The build, once decided (one plan, about two days of subagent work)

1. **Entitlements table** on the progress API: `user_id`, `scope` (`course:<id>` or `all`),
   `source` (`stripe`, `manual`), `expires_at` (null for lifetime), `stripe_customer`,
   `stripe_subscription`. `GET /v1/entitlements` for the signed-in user. A manual grant command
   for refunds, gifts, and testers.
2. **Checkout:** `POST /v1/checkout` creates a Stripe Checkout session for a price id, with the
   WorkOS user id in the metadata, success and cancel URLs back to the course. Stripe webhook
   (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`,
   `charge.refunded`) writes or expires entitlements. Signature verified; idempotent on the
   event id.
3. **Engine:** after sign-in, fetch entitlements with the progress sync; `freeCourse: false`
   and `upgradeUrl` set per manifest; the locked views show one paywall card (price, what you
   get, Buy this course, Get everything) and the checkout button posts to the API. Signed-out
   learners see the same card with "Sign in to buy". The gating code paths already exist and
   have tests; the work is wiring and copy.
4. **Catalog and landing pages:** a price line on each card and landing hero ("Free to start.
   $39 for the full course, or $89 a year for all of them."), the FAQ entries, and the footer's
   "free while we launch" line retired.
5. **Account page:** what the learner owns, renewal date, and a Manage billing link to the
   Stripe portal.
6. **Tests:** API tests for the webhook (signed, replayed, refunded), engine tests for locked
   and unlocked states on the mini fixture, a site test that the price copy matches the
   manifest.

## What I need from Blake to start

- The Stripe account (or a yes to creating one) and the two price ids, or the go-ahead to set
  them to $39 and $89.
- The free hook decision (BMET recommended).
- A yes on the refund window.
