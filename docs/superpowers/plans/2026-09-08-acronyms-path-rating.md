# Plan: acronym links, path choice, ratings, confidence-free standard test

Spec: `docs/superpowers/specs/2026-09-08-acronyms-path-rating-design.md`.

## Tasks

1. Engine: acronym wrapping in `inline()`, tooltip, modal, cheat sheet Acronyms section, styles. Engine works with no glossary loaded.
2. Engine: path choice on starter results (`S.path`, `applyScope`, tutorial page switch button, welcome and home copy).
3. Engine: lesson ratings (`S.ratings`, chips on the lesson page and in the lesson feedback modal, report and export).
4. Engine: `noConf` standard test (question card, submit rules, scoring with effective confidence, results and history display).
5. Self-test additions for 1 to 4; `tests/acronyms.js` coverage test wired into `npm test`.
6. Glossaries: scan every pack for acronym tokens (scratchpad `acr_scan.js`), write a master dictionary with per-pack overrides where a token means something else in that course (AV, HR, IV, DAC, IPS, ST, SC, US, OR, PM, MAP, CAP, CD, DC, VA, AD, RA, CA, CI, SA, PT, PR), emit `courses/<id>/acronyms.js` with only that pack's keys plus its ignore list, and iterate until the coverage test passes.
7. `<id>/index.html` script tags, README, `python build.py`, cheat sheet PDFs via headless Chrome, page counts.
8. Commit locally. No push.

## Notes

- Bash cannot carry non-ASCII characters; glossary text is plain ASCII.
- Every test (`npm test`, packcheck for each pack, gen-smoke) must pass before the commit.

## Done 2026-09-08

- Engine: acronym links, tooltip, modal, cheat sheet Acronyms section, path choice, ratings, confidence-free standard test. Self-test covers each; `npm test` also runs `tests/acronyms.js`.
- Glossaries: netplus 316, secplus 206, cbet 288, aplus1 272, aplus2 194 acronyms. Built from a master dictionary in the session scratchpad (`acr_master_*.js`, `acr_overrides.js`, `acr_emit.js`); the emitted `courses/<id>/acronyms.js` files are the source of truth from here on. Per-course meanings: AV, HR, IV, OR, ST, RA, DAC, CF, PID, NTP (CBET); DAC, MAC, RA, SAN, AV, ECC (Security+); IPS, VA, CF (A+ Core 1); AD, DC, PID, KVM (A+ Core 2); CD, RA, VA (Network+).
- Cheat sheet PDFs reprinted: netplus 21 pages (was 14), secplus 16 (12), cbet 24 (18), aplus1 18 (13), aplus2 17 (13); the Acronyms table is the last section.
- Pre-existing finding, not changed: `node tests/packcheck.js courses/netplus` reports answer-key skew 57/242/62/6 across A to D (66% of Network+ keys are B). `tests/balance-keys.js` on each `courses/netplus/questions-N.js` would fix it; left for Blake to decide.
