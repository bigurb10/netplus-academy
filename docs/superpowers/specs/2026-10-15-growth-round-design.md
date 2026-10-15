# Growth round: bigger A+ and CBET banks, exam facts and flashcards, paywall decision

Date 2026-10-15. Blake, away from his desk, asked for everything on the open list to be done
("Do it all") after the PBQ work and its follow-ups went live. The list was: more A+ and CBET
questions, the exam-facts block and flashcards borrowed from the competitor benchmark, and the
paywall brainstorm. Nobody was available to answer design questions, so the decisions below are
mine, taken from memory of Blake's earlier rulings; each one names the ruling it rests on.

This spec decomposes into three sub-projects. The first two are built now, each on its own plan
and branch. The third is a decision brief for Blake, not a build.

## 1. Question bank supplement (plan: `2026-10-15-question-supplement.md`)

**Problem.** Measured on 2026-09-25: by the official-format test after a starter and three
practice tests, 35% of CBET and 37% to 48% of A+ questions have been seen before. The thin
domains are A+ Core 1 Mobile Devices (20 questions for a quota of 12) and Hardware and Network
Troubleshooting (45 for 25), A+ Core 2 Software Troubleshooting (30 for 21), and CBET Problem
Solving (60 for 50) and Healthcare IT (40 for 28).

**Rule.** Every domain's bank should be at least twice its official-test quota. Five new
questions per lesson in the thin domains gets every one of them there:

| Course | Domain | Lessons | Bank now | Quota | Bank after |
|---|---|---|---|---|---|
| aplus1 | Mobile Devices (d1) | u1l1 to u1l4 | 20 | 12 | 40 |
| aplus1 | Troubleshooting (d5) | u8l1 to u8l6, u9l1 to u9l3 | 45 | 25 | 90 |
| aplus2 | Troubleshooting (d3) | u6l1 to u6l6 | 30 | 21 | 60 |
| cbet | Problem Solving (d5) | u7l1 to u7l6, u8l1 to u8l6 | 60 | 50 | 120 |
| cbet | Healthcare IT (d6) | u9l1 to u9l8 | 40 | 28 | 80 |

195 new questions: 65 for A+ Core 1, 30 for A+ Core 2, 100 for CBET. Other domains already sit
at 1.9 or better and are left alone.

**Form.** One new file per course (`questions-4.js` for aplus1 and aplus2, `questions-5.js` for
cbet), the same shape as the existing files, ids continuing each lesson's numbering (`u1l1-6` to
`u1l1-10`). The lesson and its deep dive are the only reference for facts: a question may test
only what the lesson teaches (the course content rule and the CBET safety-number caution).
Original wording, plain ASCII, no "all of the above", no stem that opens with the same 70
characters as any existing stem (the pack check rejects it). Answer keys balanced with
`tests/balance-keys.js`. The public practice page draws the `-1` question of each lesson, so no
static page changes.

## 2. Exam facts and flashcards (plan: `2026-10-15-exam-facts-flashcards.md`)

Borrowed from the competitor benchmark (memory `reference-competitor-open-exam-prep`, Blake:
"a potential competitor to look at mostly"): an exam-facts block and flashcards. Price
comparisons against other prep vendors are not built; their prices cannot be verified from here
and would go stale.

### 2.1 Exam facts on the landing page

The landing page already has "The exam at a glance" (code, questions, time, passing, course
size, cost). It becomes two tables:

- **The exam:** vendor and title, code, questions, time, passing (the manifest's
  `realExamNote` or `passPct`), format ("Multiple choice plus performance-based questions" when
  the pack ships PBQs, otherwise "Multiple choice"), fee (a new optional manifest string
  `exam.fee`, shown only when set), and the domains with their weights, one row each.
- **This course:** lessons and units, labs, questions, PBQs, flashcards, hours of reading, and
  cost ("Free").

`exam.fee` is set for the four ACI courses from the figures the packs already publish in their
cheat sheets (CABT $220 member / $270 non-member; CBET and CRES $410 / $460; CHTM $490 / $565;
all 2026). CompTIA voucher prices changed in 2025 and resellers disagree, so the CompTIA
manifests carry no fee and show no fee row; the FAQ gains "How much does the exam cost?" only
when a fee is set, and every landing FAQ gains "What is on the exam?" listing the domains.

### 2.2 Flashcards

A crawlable `/<id>/flashcards/` page per course, built by the static generator from data the
pack already has, with an in-page viewer that needs no account:

- **Decks.** One "Acronyms" deck from the glossary (front: the acronym; back: what it stands
  for and the one-sentence tip) and one deck per cheat-sheet section that has at least one
  two-column table (front: the first column; back: the second), named after the section. A row
  whose first column is longer than 80 characters is skipped. Three-column and wider tables are
  not cards.
- **Markup.** Every card is in the HTML as a `<dl>` entry inside its deck section, so the page
  is complete without JavaScript and search engines see every term. The viewer script reads the
  cards from that DOM.
- **Viewer.** Deck picker, one card at a time, click or tap or Space to flip, Previous and
  Next (arrow keys), Shuffle, "Got it" and "Again". Cards marked "Got it" drop out of the deck
  for that browser; progress is in `localStorage` under `fra.<id>.flashcards` and a Reset
  button clears it. No sync to the account; the flashcards are a study aid, not a scored
  activity.
- **Links.** Site nav gains "Flashcards" after "Cheat sheet"; the landing page gets a
  Flashcards section with the card count; the practice-test and PBQ pages' closing card link
  it; the app's Cheat sheet view gets a "Flashcards" button pointing at the page; the sitemap
  carries the URL. Title "<Exam> Flashcards: <n> cards", phrases "<exam> flashcards" and
  "<code> flashcards". JSON-LD: a `LearningResource` of type Flashcards plus a
  `DefinedTermSet` for the acronym deck.
- **Tests.** `tests/site.js` checks the mini fixture: the page exists, every acronym and every
  two-column row is a card, three-column rows are not, the nav and sitemap carry the URL, and
  the landing shows the count. The app test checks the Cheat sheet view's button.

## 3. Paywall (brief: `2026-10-15-paywall-brief.md`)

Blake's standing decisions (2026-09-06): launch free, then per-course premium with the cheat
sheet, starter test, and first ten lessons free, maybe one whole course free as a hook. Gating
exists in the engine and is off. What is still his to decide: the payment provider, the prices,
the free hook course, and the launch date. The brief recommends one answer for each and lays out
the build (entitlements on the progress API, a Stripe Checkout and webhook, the gating switch,
the public pages unchanged) so the build can start the day he says go. Nothing is coded now.

## 4. Order and deployment

Plan 1 and Plan 2 run on separate branches off main (`bank-supplement`, `exam-facts-flashcards`),
subagent-driven, each merged after its final review with `npm test` green. Then push, stage,
go-live, and the live checks, as on 2026-10-15 (Blake: "make sure all work gets pushed to the
website"). Search Console: resubmit the sitemap and request indexing on the eight new
`/<id>/flashcards/` URLs.
