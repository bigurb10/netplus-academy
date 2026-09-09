# Course progress sync — design

**Date:** 2026-09-09
**Status:** approved, not yet planned
**Depends on:** WorkOS AuthKit tenant (Staging configured 2026-09-09)

## Problem

Course progress lives in one localStorage blob per course, `fra.<courseId>.state.v3`. It is
trapped in the browser that made it. A learner who studies on a laptop and then opens the
course on a phone starts from nothing, and clearing site data destroys everything.

Sign-in alone does not fix this. AuthKit supplies identity; it stores nothing. This design
adds the storage and the reconciliation.

## Decisions

| Question | Decision |
|---|---|
| When must a learner sign in? | Never, to study. Anonymous works exactly as today; signing in is offered as "save your progress". |
| Two sources of progress collide? | Merge automatically, always. Never ask, never discard. |
| Where does the API live? | New small service at `api.fieldreadyacademy.com`, separate from ServiceForge. |
| Where does merge run? | On the client, in the engine. The server is a dumb versioned blob store. |

The anonymous-first choice protects the SEO and freemium plan: a cold visitor from a search
result can start a course immediately, and the account is offered once they have something
worth keeping.

Merge runs on the client because the merge rules are a function of the state shape, and that
shape is defined in `engine/app.js`. Keeping both in one file means adding a state field never
requires an API redeploy.

The API is separate from ServiceForge because course progress and the ServiceForge knowledge
base are unrelated products that happen to share a box. Either must be restartable without
taking the other down.

## Server

Own database on the box's existing Postgres. One table:

```sql
CREATE TABLE progress (
  user_id    text        NOT NULL,   -- AuthKit `sub` claim
  course_id  text        NOT NULL,   -- 'netplus', 'secplus', 'cbet', 'aplus1', 'aplus2'
  state      jsonb       NOT NULL,   -- the engine's exportable() blob
  version    bigint      NOT NULL,   -- incremented every write; serves as the ETag
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, course_id)
);
```

The server never interprets `state` beyond rejecting an unrecognised `v`. Expected blob size is
50–200 KB, dominated by `qstats` (one entry per question seen) and `exams`.

### API

Base URL `https://api.fieldreadyacademy.com`. Bearer token in `Authorization`, validated against
the AuthKit JWKS by issuer and audience — the same approach as ServiceForge's
`api/app/auth.py`, but with this service's own audience.

| Route | Behaviour |
|---|---|
| `GET /v1/progress/{course_id}` | `{state, version}` with `ETag: "<version>"`. Honours `If-None-Match` → 304. 404 when absent. |
| `PUT /v1/progress/{course_id}` | Requires `If-Match: "<version>"`. 412 when stale. `If-Match: *` creates. Returns the new version. |
| `DELETE /v1/progress/{course_id}` | Deletes the row. Supports account data deletion. |
| `GET /v1/progress` | `[{course_id, version, updated_at}]` for the signed-in user. |

412 is the entire concurrency mechanism. The client re-GETs, re-merges, and retries, bounded at
three attempts. Merge is associative and idempotent, so retrying is always safe.

### WorkOS configuration this requires

Currently unset in the Staging environment:

- **Resource indicator** `https://api.fieldreadyacademy.com`, in addition to the MCP one.
  Without it, a token minted for the course API is not audience-bound and would also open the
  MCP endpoint — same tenant, same signing key, nothing distinguishing them.
- **Redirect URI** `https://fieldreadyacademy.com/callback` (plus a localhost equivalent for dev).
- **Web origin** `https://fieldreadyacademy.com` — AuthKit's CORS allow-list is empty today.

## Client

### Auth

All five courses are served from one origin, so a single shared callback at `/callback`
completes the PKCE exchange and returns the learner where they were. Signing in on `/netplus/`
signs them in for `/cbet/` as well. Tokens are stored under `fra.auth.v1`.

### Sync layer

`save()` is unchanged. localStorage remains the primary, synchronous store, so offline study
behaves exactly as it does now and no UI path ever blocks on the network.

- **Pull** on page load when signed in, and on window focus when the last pull is over 60s old.
- **Push** debounced 5s after any `save()`, and immediately on exam submit, lesson pass, and
  official pass. Also on `visibilitychange` → hidden.
- **Failures are swallowed.** A dirty flag persists and the next trigger retries. This mirrors
  how `saveFeedback()` already degrades when the feedback endpoint is unreachable.

Pushing immediately on exam submit is deliberate: an exam result is the most expensive thing a
learner can lose.

## Merge

`mergeState(a, b)` is a pure function in the engine, unit-testable under jsdom.

```
lessons[id]   status ranked new < read < passed, take higher
              best  → max
              attempts → max (see note)
              passedAt → max
topics[id]    take the whole record with the greater `last`
qstats[id]    max each of seen / correct / wrong / last
exams[]       union by id, then sort by date
seen          union
ratings[id]   per key, take the entry with the greater `ts`
feedback      union by id, preserving any `sent: true`
plan          take the whole plan with the greater `createdAt`, then remap its examIdx (a side
              with no plan never wins: any non-null plan beats a null one regardless of
              `createdAt` - the same null-guard `path` uses below)
path          take from the side with the greater `touchedAt` *that has a non-null path*, then
              remap its examIdx (a side that has only been opened has `path: null` and never
              wins over a real choice made on the other side, regardless of `touchedAt`)
settings      take from the side with the greater `touchedAt`
view, active  never synced; always device-local
passStreak    discarded and recomputed
official      discarded and recomputed
```

Every rule above resolves against a timestamp carried *inside* the blob, never the server's
`updated_at` column — the client merging a local blob against a fetched one has no server
timestamp for its own side.

Most fields already carry what they need: `ratings[id]` is `{r, ts}`, `feedback` items are
`{id, ts, sent, ...}`, `topics[id]` has `last`, and `plan` has `createdAt`. Two do not.

**New field: `touchedAt`.** Add a top-level `touchedAt` to the state, set to `Date.now()` on
every `save()`. It is the tiebreaker for `path` and `settings`, which are single-valued and carry
no timestamp of their own. Adding it is also what lets a future field default to "most recently
written side" without inventing another timestamp.

### Counters use max, not sum

Summing double-counts whenever both devices began from a shared pull, because each side's
counter already includes the common history. Max under-counts instead.

Under-counting is the safe direction here. `attempts`, `correct`, and `wrong` feed only
`topicPriority()` and `topicMastered()` — prioritisation heuristics, never gating — so an
undercount makes the engine resurface a topic slightly more often. Exact counts would require
moving counters into the event log, which is not worth the work for a heuristic input.

### topics[id] merges whole-record

Merging `hist`, `streak`, `correct`, and `attempts` field-by-field can produce a record that
never existed — for instance a `streak` of 3 attached to a `hist` whose most recent entry is a
miss, which would wrongly satisfy `topicMastered()`. Taking the more recent record intact keeps
it internally consistent, at the cost of discarding the other device's recent drilling on that
topic.

### passStreak and official are derived, never merged

These two are the readiness signal that gates "cleared to book the exam", and they are the only
fields where a wrong merge produces a confident lie. They are therefore not synced at all.

The existing submit handler already computes them as a pure fold over the exam sequence:

```js
S.exams.push(rec);
const prevStreak = S.passStreak; const passed = p >= PASS_PCT;
S.passStreak = passed ? prevStreak + 1 : 0;
if (!passed) S.official = null;
else if (isOfficial(ex) && prevStreak >= STREAK_NEEDED) S.official = { examIdx, date: rec.date, pct: p };
```

Merging replays exactly this over the merged, date-ordered exam list, starting from zero.
`max(streakA, streakB)` would fabricate a streak nobody earned; a replay cannot.

**Required refactor.** Extract this fold from the submit path into
`recomputeStreak(exams, course)` and call it from both submit and merge, so the two cannot
drift. It skips `kind === 'custom'`; the existing self-test already asserts custom tests leave
the streak untouched.

This also fixes a latent bug: `official.examIdx` is an array index into `exams`. Any merge that
reorders or extends that array silently repoints it at a different record. Recomputing after the
merge resolves the index against the merged array.

### plan and path carry the same kind of index

`official` is not the only field holding a position in `exams`. Both of these do too, and an
earlier draft of this design wrongly treated them as opaque values:

- `engine/app.js:280` — `S.path = { examIdx: idx, scope }`, an object, not a string
- `engine/app.js:258` and `:268` — a plan is `{ source, examIdx, createdAt, lessons, ... }`
- `engine/app.js:532` — `const src = S.exams[S.plan.examIdx];` rebuilds the tutorial from that record

Copying either verbatim across a merge that re-sorts `exams` points the learner's tutorial at a
different test. Unlike `official`, these cannot simply be recomputed — they encode a choice the
learner made, not a derived fact.

So they are **remapped** instead: look up the record the old index referenced in its own source
state, then find that record's position in the merged array by `examId`. Each is remapped against
the exam array it came from, which is not necessarily the same side — `plan` is chosen by
`createdAt` and `path` by `touchedAt`.

If the referenced record cannot be found in the merged array, the field becomes `null`. An
orphaned plan is better than one silently pointing at the wrong test.

### Exam ids

`exams[]` entries need stable identity for union to work. New records get a random `id`.
Records already in learners' localStorage have none, so on first merge synthesize one
deterministically from `date + kind + total + pct`. Pre-sync history exists on only one device,
so the id needs to be stable, not globally unique.

## First sign-in

The claim flow is the sync flow — there is no special case:

1. Learner chooses "Save my progress"; AuthKit completes.
2. Client pulls server state for the course (404 → treat as empty).
3. `mergeState(local, server)`.
4. PUT the result.
5. Adopt it locally and re-render.

This is the main reason merge-always was chosen over prompting: the highest-stakes moment in the
feature runs the code path that is exercised on every ordinary sync.

## Testing

New `tests/merge.js`, added to `npm test` alongside the existing selftest, gating, and acronyms
suites. The cases that matter:

- Disjoint progress on two devices unions correctly.
- Conflicting lesson status takes the higher rank.
- **Streak reset:** A passes three tests, B fails one at a later timestamp → merged
  `passStreak` is 0.
- **Official revoked:** A holds an official pass, B has a later failure → merged `official`
  is null.
- `merge(a, a)` deep-equals `a`.
- Merge-then-replay equals playing the same exams sequentially on one device.
- `official.examIdx` resolves to the correct record after a merge that reorders `exams`.

## Out of scope

- Cross-course "continue where you left off" dashboard.
- Real-time or multi-tab sync.
- Server-side merge.
- Entitlement and paywall wiring. Everything stays free; `freeCourse` and `FRA_ENTITLED` are
  untouched.
- Production AuthKit configuration. Staging only until the flow works end to end.

## Risks

**A stale cached bundle merges with old rules.** Courses ship as self-contained files that
browsers cache. A learner running an older bundle could write a blob merged under superseded
rules.

The state version stays at `v: 3` for this release. `touchedAt` is additive and a missing value
reads as 0, so existing blobs load unchanged and `load()`'s `s.v === 3` check needs no migration.
The guard exists for the future: if merge semantics ever change incompatibly, bump to `v: 4`,
add a migration alongside the existing v2 → v3 path in `load()`, and have the server reject
writes carrying a `v` it does not recognise. Until then the server accepts `v: 3` only.

Note that no deployed bundle has sync code today, so there is no pre-existing client that can
write a badly merged blob. The first risk of divergence arrives with the *second* sync release.

**Blob growth.** `qstats` grows with questions seen and `exams` grows without bound. At current
course sizes this is well within jsonb's comfort, but a learner with hundreds of practice tests
will accumulate. Revisit if a row passes ~1 MB; the fix is pruning old non-official exam records,
which the replay tolerates as long as ordering is preserved.
