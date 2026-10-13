# ServiceForge SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the ServiceForge product page around its head terms and generate one crawlable page per device model with knowledge (plus a models index and device-class pages) from a knowledge-base export, showing every symptom and cause with the first check and keeping the rest behind the connect button, per `docs/superpowers/specs/2026-10-13-serviceforge-seo-design.md`.

**Architecture:** A SQL export run on the server against ServiceForge's Postgres produces `site/data/serviceforge.json.gz` (committed to this repo, about 6 MB; refreshed when the knowledge base grows). A new generator `site/build-serviceforge.js` reads that file and writes `dist/site/serviceforge/models/`, `.../classes/<class>/`, and `.../models/<manufacturer>/<model>/`; `site/build-site.js` calls it when the file exists and adds the URLs to the sitemap. The hand-written product page `serviceforge/index.html` stays the product page (built by `build.py` as today) and is rewritten around the head terms. A fixture JSON drives `tests/serviceforge.js`.

**Tech Stack:** Node 20 + jsdom tests, the existing `site/markup.js` renderer and `shell()`, PostgreSQL 16 in ServiceForge's Docker container `app-db-1` on the Hetzner box (reachable only over ssh), `python build.py`, `scripts/stage.sh`.

## Global Constraints

- Exposure (Blake, 2026-10-13, "middle path"): a model page shows every symptom's title, description, and safety class; the FULL ranked cause list (rank, title, likelihood); the FIRST diagnostic step in full (check text, test point, expected value with unit and tolerance, tools); and a line "N more checks with pass and fail actions, M corrective actions, and part numbers are in ServiceForge" with the connect button. Error codes show code, meaning, trigger condition, severity; likely causes and actions are behind the connect button. Community fixes appear only as a count.
- Never exported or published: the `kb_passwords` table (service access codes), `kb_parts`, corrective-action `procedure`/`parts`/`post_checks`, diagnostic steps after the first, `pass_action`/`fail_action`, citations and document titles, community fix text, any person's name, `org_id`.
- A model has knowledge when it has at least two canonical symptoms (`canonical_id IS NULL`) each with at least one cause. Only those models get pages; no stubs (deviation from the spec's noindex-stub idea, recorded here: there are no existing model URLs to preserve yet).
- URLs: `/serviceforge/` (product page, hand-written, unchanged path), `/serviceforge/models/` (index), `/serviceforge/classes/<class-slug>/`, `/serviceforge/models/<manufacturer-slug>/<model-slug>/`. Slugs via the generator's `slugify`; a manufacturer and model pair that collides after slugging gets `-2`, `-3` suffixes in export order.
- Page titles: product "ServiceForge: Medical Equipment Troubleshooting Knowledge Base for Biomeds"; model "<Manufacturer> <Model> Troubleshooting and Error Codes | ServiceForge"; class "<Class> Troubleshooting: Models and Common Symptoms | ServiceForge"; index "Medical Equipment Models with Troubleshooting Records | ServiceForge".
- Every page carries the knowledge-base label verbatim: "ServiceForge knowledge base record. Field-unverified unless technicians confirmed it." and the line "A teaching summary of the record, not a service manual."
- Plain ASCII in files written; the export JSON may carry UTF-8 text from the database, which the generator escapes as HTML; the generator must not choke on non-ASCII.
- Connect CTA: a button "Connect ServiceForge to your AI" linking to `/serviceforge/#connect` with `data-sf="connect"` so GA4 can count clicks (`gtag('event','sf_connect_click',{page_path: location.pathname})` on click, inline, only when the analytics snippet is present).
- Scale (measured 2026-10-13 against the live database with the Task 1 query): 796 models with knowledge, 48,891 symptoms, 70,288 causes, 108,985 steps, 36,254 error codes. Consequences: the export is stored gzipped as `site/data/serviceforge.json.gz` (the generator reads it with `zlib.gunzipSync`; the runner writes it with Python's gzip module); `dist/site/serviceforge/` is in `.gitignore` and is generated at build and stage time, never committed; a model page renders at most 60 symptoms in full (ordered by cause count then title) and lists the remaining titles under "More symptoms" with the connect button; the sitemap gains roughly 800 model URLs plus class pages, which is under the 50,000-URL limit for one sitemap file. Measured after the full export (5.9 MB gzipped): median 25 symptoms per model, 168 models above the 60 cap (the largest has 1,152), 11,548 of 48,891 symptoms have no diagnostic step (the page shows their causes and omits the First check block).
- Commit after every task; never push. Branch `serviceforge-seo` off `main` (after the course-site SEO plan merges, or in parallel on its own branch if that plan is still running; the two touch different files except `site/build-site.js`'s `buildAll`, where this plan adds four lines).

## File structure

Create:
- `scripts/export_serviceforge_kb.sql` (Task 1): the export query.
- `scripts/export-serviceforge.sh` (Task 1): runs the query over ssh, streams to a temp file, and writes `site/data/serviceforge.json.gz`.
- `site/data/serviceforge.json.gz` (Task 4): the committed export, gzipped.
- `tests/fixtures/serviceforge/sample.json` (Task 2): two models, one with knowledge, one thin.
- `site/build-serviceforge.js` (Task 2): the generator.
- `tests/serviceforge.js` (Task 2): the suite, added to `package.json`'s test script.

Modify:
- `site/build-site.js` (Task 2): `buildAll` calls the ServiceForge generator and adds its URLs.
- `serviceforge/index.html` (Task 3): title, meta, H1, head terms, connect anchor, models link, numbers from the export.
- `tests/analytics.js` (Task 2): unchanged (it walks `dist/site`).
- `scripts/stage.sh` (Task 4): nothing to change (`dist/site/.` is copied whole); verify only.

---

### Task 1: The export query and script

**Files:**
- Create: `scripts/export_serviceforge_kb.sql`, `scripts/export-serviceforge.sh` (both already written by the controller on 2026-10-13 and validated with `--check` against the live database; this task commits them and switches the runner to gzip output)

**Interfaces:**
- Produces: `site/data/serviceforge.json.gz` (gzip of the JSON document) with the shape in the spec's section 4: `{ exported, stats, models: [{ id, manufacturer, name, family, category_key, community_fix_count, symptoms: [{ id, title, description, safety_class, cause_count, step_count, action_count, causes: [{ rank, title, likelihood }], first_step: { check_text, test_point, expected, value_unit, tolerance, tools } | null }], error_codes: [{ code, meaning, trigger_condition, severity }] }] }`.

- [ ] **Step 1: Write the query**

`scripts/export_serviceforge_kb.sql` (PostgreSQL 16; runs with `psql -At -f` so it prints one JSON document):

```sql
-- ServiceForge knowledge-base export for the public model pages (middle path).
-- Selects nothing from kb_passwords, kb_parts, kb_corrective_actions.procedure/parts, steps after the first,
-- citations, or community text. Run: see scripts/export-serviceforge.sh
WITH canon AS (
  SELECT s.id, s.model_id, s.title, s.description, s.safety_class
  FROM kb_symptoms s
  WHERE s.canonical_id IS NULL AND s.model_id IS NOT NULL AND s.scope = 'model'
),
cause_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_causes WHERE canonical_id IS NULL GROUP BY symptom_id
),
step_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_diagnostic_steps GROUP BY symptom_id
),
action_counts AS (
  SELECT symptom_id, count(*) AS n FROM kb_corrective_actions GROUP BY symptom_id
),
first_steps AS (
  SELECT DISTINCT ON (symptom_id) symptom_id, check_text, test_point, expected, value_unit, tolerance, tools
  FROM kb_diagnostic_steps ORDER BY symptom_id, seq ASC
),
knowledge AS (
  SELECT c.model_id, count(*) AS symptoms
  FROM canon c JOIN cause_counts cc ON cc.symptom_id = c.id
  GROUP BY c.model_id HAVING count(*) >= 2
),
community AS (
  SELECT model_id, count(*) AS n FROM community_fixes GROUP BY model_id
),
sym_json AS (
  SELECT c.model_id,
    json_agg(json_build_object(
      'id', c.id, 'title', c.title, 'description', c.description, 'safety_class', c.safety_class,
      'cause_count', coalesce(cc.n, 0), 'step_count', coalesce(sc.n, 0), 'action_count', coalesce(ac.n, 0),
      'causes', (SELECT coalesce(json_agg(json_build_object('rank', k.rank, 'title', k.title, 'likelihood', k.likelihood) ORDER BY k.rank NULLS LAST, k.title), '[]'::json)
                 FROM kb_causes k WHERE k.symptom_id = c.id AND k.canonical_id IS NULL),
      'first_step', CASE WHEN fs.symptom_id IS NULL THEN NULL ELSE json_build_object(
        'check_text', fs.check_text, 'test_point', fs.test_point, 'expected', fs.expected,
        'value_unit', fs.value_unit, 'tolerance', fs.tolerance, 'tools', fs.tools) END
    ) ORDER BY c.title) AS symptoms
  FROM canon c
  JOIN cause_counts cc ON cc.symptom_id = c.id
  LEFT JOIN step_counts sc ON sc.symptom_id = c.id
  LEFT JOIN action_counts ac ON ac.symptom_id = c.id
  LEFT JOIN first_steps fs ON fs.symptom_id = c.id
  GROUP BY c.model_id
),
code_json AS (
  SELECT e.model_id, json_agg(json_build_object('code', e.code, 'meaning', e.meaning, 'trigger_condition', e.trigger_condition, 'severity', e.severity) ORDER BY e.code_norm) AS error_codes
  FROM kb_error_codes e WHERE e.canonical_id IS NULL AND e.model_id IS NOT NULL
  GROUP BY e.model_id
)
SELECT json_build_object(
  'exported', to_char(now(), 'YYYY-MM-DD'),
  'stats', json_build_object(
    'models_with_knowledge', (SELECT count(*) FROM knowledge),
    'symptoms', (SELECT count(*) FROM canon c WHERE c.model_id IN (SELECT model_id FROM knowledge)),
    'causes', (SELECT count(*) FROM kb_causes k JOIN canon c ON c.id = k.symptom_id WHERE k.canonical_id IS NULL AND c.model_id IN (SELECT model_id FROM knowledge)),
    'steps', (SELECT count(*) FROM kb_diagnostic_steps d JOIN canon c ON c.id = d.symptom_id WHERE c.model_id IN (SELECT model_id FROM knowledge)),
    'error_codes', (SELECT count(*) FROM kb_error_codes e WHERE e.canonical_id IS NULL AND e.model_id IN (SELECT model_id FROM knowledge))
  ),
  'models', coalesce((
    SELECT json_agg(json_build_object(
      'id', m.id, 'manufacturer', mf.name, 'name', m.name, 'family', m.family, 'category_key', m.category_key,
      'community_fix_count', coalesce(cm.n, 0),
      'symptoms', sj.symptoms,
      'error_codes', coalesce(cj.error_codes, '[]'::json)
    ) ORDER BY mf.name, m.name)
    FROM knowledge kn
    JOIN models m ON m.id = kn.model_id
    JOIN manufacturers mf ON mf.id = m.manufacturer_id
    JOIN sym_json sj ON sj.model_id = m.id
    LEFT JOIN code_json cj ON cj.model_id = m.id
    LEFT JOIN community cm ON cm.model_id = m.id
  ), '[]'::json)
);
```

- [ ] **Step 2: Write the runner**

`scripts/export-serviceforge.sh`:

```bash
#!/usr/bin/env bash
# Export the ServiceForge knowledge base (public fields only) to site/data/serviceforge.json.gz.
# Runs the SQL inside the database container on the Hetzner box over ssh (alias "hetzner") and
# streams the one-line JSON result to a temp file (never through a shell variable: the document
# is tens of megabytes of UTF-8 and a Windows console codec would corrupt it).
#   bash scripts/export-serviceforge.sh            write site/data/serviceforge.json.gz
#   bash scripts/export-serviceforge.sh --check    print the export date and the stats line only
set -euo pipefail
cd "$(dirname "$0")/.."
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
ssh hetzner "docker exec -i app-db-1 psql -U serviceforge -d serviceforge -At -v ON_ERROR_STOP=1" < scripts/export_serviceforge_kb.sql > "$TMP"
mkdir -p site/data
if [ "${1:-}" = "--check" ]; then
  python -c "import json,sys; d=json.load(open(sys.argv[1],encoding='utf-8')); print(d['exported'], d['stats'])" "$TMP"
  exit 0
fi
python -c "import json,sys,gzip; d=json.load(open(sys.argv[1],encoding='utf-8')); gzip.open('site/data/serviceforge.json.gz','wt',encoding='utf-8').write(json.dumps(d, ensure_ascii=False)); print('wrote site/data/serviceforge.json.gz:', d['stats'])" "$TMP"
```

Make it executable in git: `git update-index --chmod=+x scripts/export-serviceforge.sh`.

- [ ] **Step 3: Dry run of the query shape (no server yet)**

Run: `python -c "import re; s=open('scripts/export_serviceforge_kb.sql').read(); assert 'kb_passwords' not in s and 'kb_parts' not in s and 'procedure' not in s and 'citation' not in s.lower(); print('export excludes the protected tables')"`
Expected: the line prints.

- [ ] **Step 4: Commit**

```bash
git add scripts/export_serviceforge_kb.sql scripts/export-serviceforge.sh
git commit -m "feat(serviceforge): knowledge-base export query and runner (public fields only)"
```

---

### Task 2: The generator, fixture, and tests

**Files:**
- Create: `site/build-serviceforge.js`, `tests/fixtures/serviceforge/sample.json`, `tests/serviceforge.js`
- Modify: `site/build-site.js` (`buildAll`), `package.json` (test script)

**Interfaces:**
- Consumes: `shell`, `crumbs`, `breadcrumbLd`, `org`, `esc`, `slugify`, `shorten`, `BRAND`, `DESC_MAX` from `site/build-site.js` (export the ones not yet exported: `shell`, `crumbs`, `breadcrumbLd`, `org`, `DESC_MAX`).
- Produces: `buildServiceForge({ data, out, origin }) -> { urls: [] }` writing `serviceforge/models/index.html`, `serviceforge/classes/<slug>/index.html`, `serviceforge/models/<mfr>/<model>/index.html`; `classLabel(category_key)`; exported for tests.

- [ ] **Step 1: Fixture**

`tests/fixtures/serviceforge/sample.json`:

```json
{
  "exported": "2026-10-13",
  "stats": { "models_with_knowledge": 1, "symptoms": 2, "causes": 3, "steps": 3, "error_codes": 1 },
  "models": [
    { "id": "11111111-1111-1111-1111-111111111111", "manufacturer": "Acme & Sons", "name": "Pump 100 <X>", "family": "Pump", "category_key": "infusion_pump", "community_fix_count": 2,
      "symptoms": [
        { "id": "s1", "title": "Occlusion alarm with a clear line", "description": "Alarm sounds although the set is open.", "safety_class": "caution", "cause_count": 2, "step_count": 3, "action_count": 2,
          "causes": [ { "rank": 1, "title": "Pressure sensor drift", "likelihood": "likely" }, { "rank": 2, "title": "Door latch not fully closed", "likelihood": "possible" } ],
          "first_step": { "check_text": "Read the occlusion pressure with the set open", "test_point": "Service menu, pressure", "expected": "below 1 psi", "value_unit": "psi", "tolerance": "plus or minus 0.2", "tools": "none" } },
        { "id": "s2", "title": "Will not power on", "description": null, "safety_class": "none", "cause_count": 1, "step_count": 0, "action_count": 0,
          "causes": [ { "rank": 1, "title": "Discharged battery and no mains", "likelihood": null } ], "first_step": null }
      ],
      "error_codes": [ { "code": "E-14", "meaning": "Air in line", "trigger_condition": "Ultrasonic detector sees a bubble", "severity": "warning" } ] },
    { "id": "22222222-2222-2222-2222-222222222222", "manufacturer": "Acme & Sons", "name": "Thin 1", "family": null, "category_key": null, "community_fix_count": 0,
      "symptoms": [ { "id": "s3", "title": "Only one symptom", "description": null, "safety_class": "none", "cause_count": 1, "step_count": 0, "action_count": 0, "causes": [ { "rank": 1, "title": "x", "likelihood": null } ], "first_step": null } ],
      "error_codes": [] }
  ]
}
```

- [ ] **Step 2: Failing tests**

`tests/serviceforge.js`:

```js
// ServiceForge public pages: one page per model with knowledge, class pages, an index; nothing protected leaks.
// Run: node tests/serviceforge.js
'use strict';
const fs = require('fs'); const os = require('os'); const path = require('path');
const sf = require('../site/build-serviceforge');
const fails = []; const check = (n, ok, x) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${x !== undefined ? '  [' + x + ']' : ''}`); if (!ok) fails.push(n); };
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'serviceforge', 'sample.json'), 'utf8'));
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-sf-'));
const res = sf.buildServiceForge({ data, out, origin: 'https://example.test' });
const read = p => fs.readFileSync(path.join(out, p), 'utf8'); const exists = p => fs.existsSync(path.join(out, p));
check('a model with knowledge gets a page at manufacturer/model slugs', exists('serviceforge/models/acme-sons/pump-100-x/index.html'));
check('a thin model (one symptom) gets no page', !exists('serviceforge/models/acme-sons/thin-1/index.html'));
check('the models index and the class page are written', exists('serviceforge/models/index.html') && exists('serviceforge/classes/infusion-pump/index.html'));
check('urls returned match the files written', res.urls.length === 3 && res.urls.includes('/serviceforge/models/acme-sons/pump-100-x/'));
const page = read('serviceforge/models/acme-sons/pump-100-x/index.html');
check('title and H1 carry the troubleshooting phrase, escaped', page.includes('<title>Acme &amp; Sons Pump 100 &lt;X&gt; Troubleshooting and Error Codes | ServiceForge</title>') && page.includes('<h1>Acme &amp; Sons Pump 100 &lt;X&gt;: troubleshooting and error codes</h1>'));
check('every symptom title and every cause is on the page', ['Occlusion alarm with a clear line', 'Will not power on', 'Pressure sensor drift', 'Door latch not fully closed', 'Discharged battery and no mains'].every(t => page.includes(t)));
check('exactly the first step is shown, with test point, expected value, tolerance, and tools', page.includes('Read the occlusion pressure with the set open') && page.includes('below 1 psi') && page.includes('plus or minus 0.2') && (page.match(/class="step"/g) || []).length === 1);
check('the remaining checks line and the connect button appear per symptom', page.includes('2 more checks with pass and fail actions, 2 corrective actions, and part numbers are in ServiceForge') && (page.match(/data-sf="connect"/g) || []).length >= 2);
check('error codes show code, meaning, trigger, severity only', page.includes('E-14') && page.includes('Air in line') && page.includes('Ultrasonic detector sees a bubble') && !/likely_causes|actions":/.test(page));
check('community fixes appear as a count only', page.includes('2 fixes logged by technicians'));
check('the record label and the teaching-summary line are present', page.includes('ServiceForge knowledge base record. Field-unverified unless technicians confirmed it.') && page.includes('A teaching summary of the record, not a service manual.'));
check('nothing protected leaks', !/password|procedure|part_number|citation|quote|org_id/i.test(page));
const ld = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('JSON-LD: TechArticle with dateModified from the export, then BreadcrumbList', ld[0]['@type'] === 'TechArticle' && ld[0].dateModified === '2026-10-13' && ld[1]['@type'] === 'BreadcrumbList');
const idx = read('serviceforge/models/index.html'); const cls = read('serviceforge/classes/infusion-pump/index.html');
check('the index lists the model under its manufacturer and links the class page', idx.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && idx.includes('href="/serviceforge/classes/infusion-pump/"'));
check('the class page names the class, lists the model, and its symptom titles', cls.includes('Infusion pumps') && cls.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && cls.includes('Occlusion alarm with a clear line'));
check('classLabel maps keys to plain labels and falls back to a title-cased key', sf.classLabel('infusion_pump') === 'Infusion pumps' && sf.classLabel('odd_key') === 'Odd key');
fs.rmSync(out, { recursive: true, force: true });
console.log(fails.length ? `\n${fails.length} FAILED` : '\nAll ServiceForge page tests passed.');
process.exit(fails.length ? 1 : 0);
```

Run: `node tests/serviceforge.js` -> fails at `require` (module missing).

- [ ] **Step 3: Implement the generator**

`site/build-serviceforge.js`:

```js
'use strict';
// Public ServiceForge pages from site/data/serviceforge.json: a models index, one page per device class,
// one page per model with knowledge. Middle-path exposure: every symptom and cause, the first check in
// full, everything else behind the connect button. Nothing protected is in the export to begin with.
const fs = require('fs'); const path = require('path');
const site = require('./build-site');
const { esc } = require('./markup');
const { shell, crumbs, breadcrumbLd, org, slugify, shorten, BRAND, DESC_MAX } = site;

// category_key values in the export use underscores (patient_monitor, x_ray_system, infusion_pump, ventilator,
// anesthesia_machine, hospital_bed, test_equipment_power_supply, ultrasound_system, ct_scanner, patient_lift, ...).
const CLASS_LABELS = { infusion_pump: 'Infusion pumps', patient_monitor: 'Patient monitors', defibrillator: 'Defibrillators', ventilator: 'Ventilators', anesthesia_machine: 'Anesthesia machines', x_ray_system: 'X-ray systems', ct_scanner: 'CT scanners', ultrasound_system: 'Ultrasound systems', hospital_bed: 'Hospital beds', patient_lift: 'Patient lifts', test_equipment_power_supply: 'Test equipment and power supplies', electrosurgical_unit: 'Electrosurgical units', suction_pump: 'Suction units', sterilizer: 'Sterilizers and reprocessors', infant_warmer: 'Infant warmers and incubators', procedure_light: 'Procedure lights' };
const classLabel = key => CLASS_LABELS[key] || (key ? key.replace(/[-_]+/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'Other equipment');
const classSlug = key => (key || 'other').replace(/_/g, '-');
const LABEL = 'ServiceForge knowledge base record. Field-unverified unless technicians confirmed it.';
const SUMMARY = 'A teaching summary of the record, not a service manual.';
const connect = text => `<a class="btn primary" href="/serviceforge/#connect" data-sf="connect">${esc(text || 'Connect ServiceForge to your AI')}</a>`;
const CLICK = `<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-sf="connect"]');if(a&&window.gtag)gtag('event','sf_connect_click',{page_path:location.pathname});});</script>`;
const hasKnowledge = m => (m.symptoms || []).filter(s => (s.causes || []).length).length >= 2;
const safety = k => ({ patient_safety: 'patient safety', high_voltage: 'high voltage', radiation: 'radiation', caution: 'caution', none: '' }[k] || esc(k || ''));

function slugModels(models) {
  const seen = {};
  return models.map(m => {
    const base = `${slugify(m.manufacturer)}/${slugify(m.name)}`; let s = base; let n = 2;
    while (seen[s]) s = `${base}-${n++}`; seen[s] = true;
    return Object.assign({}, m, { slugPath: s, url: `/serviceforge/models/${s}/` });
  });
}

function symptomBlock(s) {
  const causes = (s.causes || []).map(c => `<li>${c.rank ? `<span class="rank">${c.rank}.</span> ` : ''}${esc(c.title)}${c.likelihood ? ` <span class="muted">(${esc(c.likelihood)})</span>` : ''}</li>`).join('');
  const f = s.first_step;
  const step = f ? `<div class="step"><div class="eyebrow">First check</div><p>${esc(f.check_text)}</p><dl>${f.test_point ? `<dt>Test point</dt><dd>${esc(f.test_point)}</dd>` : ''}${f.expected ? `<dt>Expected</dt><dd>${esc(f.expected)}${f.value_unit && !String(f.expected).includes(f.value_unit) ? ' ' + esc(f.value_unit) : ''}${f.tolerance ? `, ${esc(f.tolerance)}` : ''}</dd>` : ''}${f.tools ? `<dt>Tools</dt><dd>${esc(f.tools)}</dd>` : ''}</dl></div>` : '';
  const more = Math.max(0, (s.step_count || 0) - (f ? 1 : 0));
  const rest = `<p class="rest">${more} more check${more === 1 ? '' : 's'} with pass and fail actions, ${s.action_count || 0} corrective action${s.action_count === 1 ? '' : 's'}, and part numbers are in ServiceForge. ${connect()}</p>`;
  return `<section class="symptom"><h3>${esc(s.title)}${safety(s.safety_class) ? ` <span class="pill">${safety(s.safety_class)}</span>` : ''}</h3>${s.description ? `<p class="ink2">${esc(s.description)}</p>` : ''}<h4>Ranked causes</h4><ol class="causes">${causes}</ol>${step}${rest}</section>`;
}

function modelPage(m, data, origin) {
  const name = `${m.manufacturer} ${m.name}`; const cls = classLabel(m.category_key);
  const title = `${name} Troubleshooting and Error Codes | ServiceForge`;
  const h1 = `${name}: troubleshooting and error codes`;
  const steps = m.symptoms.reduce((a, s) => a + (s.step_count || 0), 0); const causes = m.symptoms.reduce((a, s) => a + (s.causes || []).length, 0);
  const description = shorten(`${name} troubleshooting from the ServiceForge knowledge base: ${m.symptoms.length} symptoms, ${causes} ranked causes, ${steps} checks with test points, and ${(m.error_codes || []).length} error codes for this ${cls.toLowerCase().replace(/s$/, '')}.`, DESC_MAX);
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: '/serviceforge/models/' }, { name: cls, href: `/serviceforge/classes/${classSlug(m.category_key)}/` }, { name: name, href: m.url }];
  const codes = (m.error_codes || []).length ? `<section><h2>Error codes</h2><div class="table-wrap"><table class="plain"><thead><tr><th>Code</th><th>Meaning</th><th>Trigger</th><th>Severity</th></tr></thead><tbody>${m.error_codes.map(e => `<tr><td><code>${esc(e.code)}</code></td><td>${esc(e.meaning || '')}</td><td>${esc(e.trigger_condition || '')}</td><td>${esc(e.severity || '')}</td></tr>`).join('')}</tbody></table></div><p class="rest">Likely causes and actions for each code are in ServiceForge. ${connect()}</p></section>` : '';
  const body = `${crumbs(crumbList)}
<article class="lesson sf-model">
  <div class="eyebrow">${esc(cls)}${m.family ? ` &middot; ${esc(m.family)} family` : ''}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">The ServiceForge knowledge base holds ${m.symptoms.length} documented symptoms for the ${esc(name)}, with ${causes} ranked causes, ${steps} diagnostic checks with test points and expected values, and ${(m.error_codes || []).length} error codes. Each symptom below shows its causes and the first check; the rest is one connection away. ${connect()}</p>
  <h2>Symptoms</h2>
  ${m.symptoms.map(symptomBlock).join('')}
  ${codes}
  <section><h2>Community</h2><p>${m.community_fix_count || 0} fix${m.community_fix_count === 1 ? '' : 'es'} logged by technicians through their AI, with outcomes, for this model.</p></section>
  <p class="muted">${LABEL} ${SUMMARY} Export ${esc(data.exported)}.</p>
</article>${CLICK}`;
  return shell({ origin, path: m.url, type: 'article', title, ogTitle: h1, description, nav: `<a href="/serviceforge/models/">Models</a><a href="/serviceforge/" class="btn primary small">ServiceForge</a>`, jsonld: [
    { '@context': 'https://schema.org', '@type': 'TechArticle', headline: h1, description, url: origin + m.url, mainEntityOfPage: origin + m.url, dateModified: data.exported, inLanguage: 'en', about: name, author: org(), publisher: org() },
    breadcrumbLd(origin, crumbList)
  ], body });
}

function classPage(key, models, data, origin) {
  const label = classLabel(key); const url = `/serviceforge/classes/${classSlug(key)}/`;
  const titles = {}; models.forEach(m => m.symptoms.forEach(s => { titles[s.title] = (titles[s.title] || []).concat(m); }));
  const common = Object.keys(titles).sort((a, b) => titles[b].length - titles[a].length || a.localeCompare(b)).slice(0, 15);
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: '/serviceforge/models/' }, { name: label, href: url }];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <h1>${esc(label)} troubleshooting: models and common symptoms</h1>
  <p class="lede ink2">${models.length} ${esc(label.toLowerCase())} with troubleshooting records in ServiceForge. Each model page lists every documented symptom with its ranked causes and first check.</p>
  <h2>Models</h2><ul>${models.map(m => `<li><a href="${m.url}">${esc(m.manufacturer)} ${esc(m.name)}</a> <span class="muted">${m.symptoms.length} symptoms</span></li>`).join('')}</ul>
  <h2>Common symptoms</h2><ul>${common.map(t => `<li>${esc(t)} <span class="muted">${titles[t].map(m => `<a href="${m.url}">${esc(m.name)}</a>`).join(', ')}</span></li>`).join('')}</ul>
  <p class="muted">${LABEL} ${SUMMARY}</p>
</article>`;
  return shell({ origin, path: url, type: 'website', title: `${label} Troubleshooting: Models and Common Symptoms | ServiceForge`, ogTitle: `${label} troubleshooting`, description: shorten(`Troubleshooting records for ${models.length} ${label.toLowerCase()} in the ServiceForge knowledge base: symptoms, ranked causes, and first checks per model.`, DESC_MAX), nav: `<a href="/serviceforge/models/">Models</a><a href="/serviceforge/" class="btn primary small">ServiceForge</a>`, jsonld: [breadcrumbLd(origin, crumbList)], body });
}

function indexPage(models, data, origin) {
  const url = '/serviceforge/models/'; const byMfr = {}; models.forEach(m => { (byMfr[m.manufacturer] = byMfr[m.manufacturer] || []).push(m); });
  const classes = {}; models.forEach(m => { (classes[classSlug(m.category_key)] = classes[classSlug(m.category_key)] || { key: m.category_key, n: 0 }).n++; });
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: url }];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <h1>Medical equipment models with troubleshooting records</h1>
  <p class="lede ink2">${models.length} models, ${data.stats.symptoms} symptoms, ${data.stats.causes} ranked causes, ${data.stats.steps} checks, and ${data.stats.error_codes} error codes in the ServiceForge knowledge base, exported ${esc(data.exported)}.</p>
  <h2>By device class</h2><ul>${Object.keys(classes).sort().map(k => `<li><a href="/serviceforge/classes/${k}/">${esc(classLabel(classes[k].key))}</a> <span class="muted">${classes[k].n}</span></li>`).join('')}</ul>
  <h2>By manufacturer</h2>${Object.keys(byMfr).sort().map(mf => `<h3>${esc(mf)}</h3><ul>${byMfr[mf].map(m => `<li><a href="${m.url}">${esc(m.name)}</a> <span class="muted">${m.symptoms.length} symptoms</span></li>`).join('')}</ul>`).join('')}
  <p class="muted">${LABEL} ${SUMMARY}</p>
</article>`;
  return shell({ origin, path: url, type: 'website', title: 'Medical Equipment Models with Troubleshooting Records | ServiceForge', ogTitle: 'ServiceForge models', description: shorten(`${models.length} medical equipment models with documented symptoms, ranked causes, checks, and error codes in the ServiceForge troubleshooting knowledge base.`, DESC_MAX), nav: `<a href="/serviceforge/" class="btn primary small">ServiceForge</a>`, jsonld: [breadcrumbLd(origin, crumbList)], body });
}

function buildServiceForge(opts) {
  const data = opts.data || JSON.parse(/\.gz$/.test(opts.dataFile) ? require('zlib').gunzipSync(fs.readFileSync(opts.dataFile)).toString('utf8') : fs.readFileSync(opts.dataFile, 'utf8'));
  const origin = (opts.origin || site.ORIGIN).replace(/\/$/, '');
  const models = slugModels((data.models || []).filter(hasKnowledge));
  const write = (urlPath, html) => { const dir = path.join(opts.out, ...urlPath.split('/').filter(Boolean)); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8'); };
  const urls = [];
  if (!models.length) return { urls };
  write('/serviceforge/models/', indexPage(models, data, origin)); urls.push('/serviceforge/models/');
  const byClass = {}; models.forEach(m => { (byClass[classSlug(m.category_key)] = byClass[classSlug(m.category_key)] || []).push(m); });
  Object.keys(byClass).forEach(k => { const u = `/serviceforge/classes/${k}/`; write(u, classPage(byClass[k][0].category_key, byClass[k], data, origin)); urls.push(u); });
  models.forEach(m => { write(m.url, modelPage(m, data, origin)); urls.push(m.url); });
  return { urls };
}

module.exports = { buildServiceForge, classLabel, slugModels, hasKnowledge };
```

Symptom cap: in `modelPage`, sort `m.symptoms` by `cause_count` descending then title, render the first 60 through `symptomBlock`, and when more remain add `<section><h2>More symptoms</h2><ul>` with the remaining titles and a connect button; the fixture has two symptoms so the cap is exercised only by a dedicated check (build a model with 61 generated symptoms in the test and assert 60 `class="symptom"` blocks plus a "More symptoms" list of 1).

Note the fixture test expects `res.urls.length === 3`: index, one class page, one model page.

In `site/build-site.js`: export `shell, crumbs, breadcrumbLd, org, DESC_MAX, slugify` (add to `module.exports`), and in `buildAll` after the guides block:

```js
  const sfData = path.join(__dirname, 'data', 'serviceforge.json.gz');
  const sfUrls = (opts.serviceforge === false || !fs.existsSync(sfData)) ? [] : require('./build-serviceforge').buildServiceForge({ dataFile: sfData, out, origin }).urls;
```
and add `sfUrls` to `urls`. (The mini-fixture build in `tests/site.js` passes `serviceforge: false`.) Add `node tests/serviceforge.js` to `package.json`'s test script after `tests/site.js`. Add to `site/site.css`: `.symptom { margin: 18px 0 26px; padding-top: 10px; border-top: 1px solid var(--line, #e3e3e3); } .causes .rank { font-weight: 600; } .step { background: var(--panel, #f6f6f6); border-radius: 10px; padding: 12px 14px; margin: 10px 0; } .step dl { display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; margin: 6px 0 0; } .step dt { font-weight: 600; } .rest { margin-top: 10px; }`.

- [ ] **Step 4: Run**

Run: `node tests/serviceforge.js 2>&1 | tail -3` (all pass), `npm test 2>&1 | tail -2` (green; `tests/site.js` unaffected because the data file does not exist yet).

- [ ] **Step 5: Commit**

```bash
git add site/build-serviceforge.js site/build-site.js site/site.css tests/serviceforge.js tests/fixtures/serviceforge/sample.json package.json
git commit -m "feat(serviceforge): public model, class, and index pages from the knowledge-base export (middle-path exposure) with tests"
```

---

### Task 3: The product page rewrite

**Files:**
- Modify: `serviceforge/index.html`

**Interfaces:**
- Produces: title "ServiceForge: Medical Equipment Troubleshooting Knowledge Base for Biomeds"; H1 "Medical equipment troubleshooting knowledge base for biomeds"; an anchor `id="connect"` on the connect section (the model pages link to `/serviceforge/#connect`); a "Browse the models" link to `/serviceforge/models/`; the numbers paragraph reads `site/data/serviceforge.json` at build time (via a `<!-- SF_STATS -->` marker that `build.py` replaces, or a static sentence updated by hand when the export refreshes; choose the marker).

- [ ] **Step 1: Baseline**

Run: `grep -n "<title>\|<h1\|og:description\|name=\"description\"" serviceforge/index.html` and `node tests/catalog.js 2>&1 | tail -1` (the catalog test checks this page's brand link and back link; keep both).

- [ ] **Step 2: Edit**

In `serviceforge/index.html`: title and `og:title` to "ServiceForge: Medical Equipment Troubleshooting Knowledge Base for Biomeds"; meta and og description: "ServiceForge is a medical equipment troubleshooting knowledge base for biomeds: symptom to ranked causes to checks with test points to actions with parts, plus fixes other technicians logged, delivered through your own AI (Claude, ChatGPT, Gemini, or Copilot)."; H1 "Medical equipment troubleshooting knowledge base for biomeds" with the brand as the eyebrow; a first section "What is in it" (symptom -> ranked causes -> ordered checks with test point and expected value -> corrective actions with part numbers; error codes; PM intervals; community fixes with outcomes; the head terms "biomed troubleshooting database" and "HTM knowledge base" used once each in prose); the existing connect instructions under `<section id="connect">`; a "Browse the models" section linking `/serviceforge/models/` with the sentence "<!-- SF_STATS -->"; an FAQ (five pairs: what it is, how to connect, what it costs now, whether records are verified, who writes the community fixes) with `FAQPage` JSON-LD; keep the brand link and the `a.back[href="../"]` link the catalog test expects. Add `SoftwareApplication` JSON-LD (name, applicationCategory "BusinessApplication", operatingSystem "Web", offers free).

In `build.py`'s `build_serviceforge()` (the function that builds `dist/serviceforge.html`; find it by `serviceforge`), replace the marker: if `site/data/serviceforge.json` exists, with `f"{s['models_with_knowledge']} models, {s['symptoms']} symptoms, {s['causes']} ranked causes, {s['steps']} checks, and {s['error_codes']} error codes, exported {d['exported']}."`, else with "Model pages are published as the knowledge base grows."

- [ ] **Step 3: Verify, build, commit**

Run: `python build.py 2>&1 | tail -2`, `node tests/catalog.js 2>&1 | tail -1`, `npm test 2>&1 | tail -2`.

```bash
git add serviceforge/index.html build.py dist/serviceforge.html
git commit -m "feat(serviceforge): product page around the troubleshooting knowledge-base terms, connect anchor, models link, FAQ and SoftwareApplication data"
```

---

### Task 4: Run the export, build the real pages, stage

**Files:**
- Create: `site/data/serviceforge.json.gz`, `.gitignore` entry `dist/site/serviceforge/`
- Modify: this plan's Status section

- [ ] **Step 1: Export**

Run: `bash scripts/export-serviceforge.sh --check` (prints the date and stats; fix the SQL if Postgres reports a column it does not know, by reading `C:/SERVICEFORGE/api/app/models.py`), then `bash scripts/export-serviceforge.sh` (writes the file). Scan it: `python -c "import json; d=json.load(open('site/data/serviceforge.json',encoding='utf-8')); print(d['stats']); import re; s=open('site/data/serviceforge.json',encoding='utf-8').read(); print('protected words:', len(re.findall(r'password|procedure|part_number|citation', s, re.I)))"` -> protected words 0.

- [ ] **Step 2: Build and inspect**

Run: `node site/build-site.js | tail -3` (sitemap grows by the index, the class pages, and one page per model with knowledge), `npm test 2>&1 | tail -2`, `bash scripts/stage.sh --local 2>&1 | tail -2`, `ls dist/stage/serviceforge/models | head`, and open two model pages through jsdom to confirm the title and the single `class="step"` per symptom.

- [ ] **Step 3: Commit and record**

```bash
git add site/data/serviceforge.json dist/site
git commit -m "feat(serviceforge): first knowledge-base export and the generated model pages"
```
Append a `## Status` section to this plan: the stats line, the page counts, the sitemap total, the test tail, and the deploy note ("deploy with `bash scripts/stage.sh` and the go-live command; refresh the export with `bash scripts/export-serviceforge.sh` whenever the knowledge base grows, then rebuild and redeploy"). Do not push or deploy.

---

## Self-review against the spec

- Section 1 decisions: Tasks 1 to 4 (middle path in `symptomBlock`, exclusions in the SQL, knowledge rule in `hasKnowledge`; the noindex-stub idea is replaced by "no page yet", recorded in Global Constraints).
- Section 2 keywords: product page (Task 3), model and class titles (Task 2).
- Section 3 pages: index, class, model pages (Task 2), product page (Task 3).
- Section 4 export contract: Task 1's SQL emits exactly the spec's fields; `first_step` is the lowest `seq` step; `action_count` and `step_count` are counts only.
- Section 5 generator and tests: Task 2; `tests/serviceforge.js` covers thin models, exposure limits, protected-word absence, one step per symptom, codes, JSON-LD, the index and class pages.
- Section 6 success: the `sf_connect_click` GA4 event is wired inline (Task 2) and only fires when `gtag` exists.
- Section 7 out of scope: unchanged.

## Status

(Filled in by the executing tasks.)
