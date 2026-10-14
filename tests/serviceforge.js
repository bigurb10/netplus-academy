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
check('a class with one model gets no class page; its model page still exists', !exists('serviceforge/classes/dry-imager/index.html') && exists('serviceforge/models/acme-sons/imager-5/index.html'));
check('urls returned match the files written: index, the two-model class, three models', res.urls.length === 5 && res.urls.includes('/serviceforge/models/acme-sons/pump-100-x/') && res.urls.includes('/serviceforge/classes/infusion-pump/') && !res.urls.includes('/serviceforge/classes/dry-imager/'), res.urls.join(' '));
const page = read('serviceforge/models/acme-sons/pump-100-x/index.html');
check('title and H1 carry the troubleshooting phrase, escaped', page.includes('<title>Acme &amp; Sons Pump 100 &lt;X&gt; Troubleshooting and Error Codes | ServiceForge</title>') && page.includes('<h1>Acme &amp; Sons Pump 100 &lt;X&gt;: troubleshooting and error codes</h1>'));
check('every symptom title and every cause is on the page', ['Occlusion alarm with a clear line', 'Will not power on', 'Pressure sensor drift', 'Door latch not fully closed', 'Discharged battery and no mains'].every(t => page.includes(t)));
check('exactly the first step is shown, with test point, expected value, tolerance, and tools', page.includes('Read the occlusion pressure with the set open') && page.includes('below 1 psi') && page.includes('plus or minus 0.2') && (page.match(/class="step"/g) || []).length === 1);
check('the remaining checks line and the connect button appear per symptom', page.includes('2 more checks with pass and fail actions, 2 corrective actions, and part numbers are in ServiceForge') && (page.match(/data-sf="connect"/g) || []).length >= 2);
check('error codes show code, meaning, trigger, severity only', page.includes('E-14') && page.includes('Air in line') && page.includes('Ultrasonic detector sees a bubble') && !/likely_causes|actions":/.test(page));
check('community fixes appear as a count only', page.includes('2 fixes logged by technicians'));
check('a safety class of none shows no badge; a known class shows its label', !page.includes('<span class="pill">none</span>') && page.includes('<span class="pill">caution</span>') && (page.match(/class="pill"/g) || []).length === 1);
check('the record label and the teaching-summary line are present', page.includes('ServiceForge knowledge base record. Field-unverified unless technicians confirmed it.') && page.includes('A teaching summary of the record, not a service manual.'));
// A credential-shaped value in a first step drops the whole step; s8's "Service code 812" first step
// must not render, and s1's real step is still the only one on the page.
check('a service access code in a first step is withheld: the step is dropped entirely, not redacted in place', !page.includes('812') && (page.match(/class="step"/g) || []).length === 1);
// s2 has nothing behind the button (0 steps, 0 actions): no promise with an empty button. s1 keeps
// its full sentence (more checks and corrective actions both > 0), and the page still carries at
// least two connect buttons (the lede and s1's rest line).
check('a symptom with nothing left to show omits the more-checks line and its button', !page.includes('0 more checks'));
check('a symptom with both more checks and actions keeps the full sentence', page.includes('2 more checks with pass and fail actions, 2 corrective actions, and part numbers are in ServiceForge'));
check('the per-page connect button count stays at least two', (page.match(/data-sf="connect"/g) || []).length >= 2);
check('no export key name outside the documented shape appears', !/likely_causes|"actions"|procedure_text|part_number|org_id/.test(page));
{
  const descMatch = page.match(/<meta name="description" content="([^"]*)">/);
  check('the model description fits DESC_MAX with no truncation ellipsis', !!descMatch && !descMatch[1].includes('...') && descMatch[1].length <= 155, descMatch && descMatch[1].length);
}
const ld = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('JSON-LD: TechArticle with dateModified from the export, then BreadcrumbList', ld[0]['@type'] === 'TechArticle' && ld[0].dateModified === '2026-10-13' && ld[1]['@type'] === 'BreadcrumbList');
const idx = read('serviceforge/models/index.html'); const cls = read('serviceforge/classes/infusion-pump/index.html');
check('the index lists every model under its manufacturer, links the two-model class, and does not link the single-model class', idx.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && idx.includes('href="/serviceforge/models/acme-sons/imager-5/"') && idx.includes('href="/serviceforge/classes/infusion-pump/"') && !idx.includes('href="/serviceforge/classes/dry-imager/"'));
// The fixture's own data.stats says 1 model; the lede must count the 3 models this page actually
// lists, not repeat that stale top-level figure.
check('the index lede totals come from the models it lists, not data.stats', idx.includes('3 models,'));
check('the class page names the class, lists both models, and their shared symptom title', cls.includes('Infusion pumps') && cls.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && cls.includes('href="/serviceforge/models/acme-sons/pump-200/"') && cls.includes('Occlusion alarm with a clear line'));
check('common symptoms require two or more models; a title only one model carries is omitted', !cls.includes('Battery runs down early'));
const single = read('serviceforge/models/acme-sons/imager-5/index.html');
check('a model alone in its class has no class crumb but keeps the class as its eyebrow; a model in a two-model class links its class', !single.includes('href="/serviceforge/classes/dry-imager/"') && single.includes('Dry imagers') && page.includes('href="/serviceforge/classes/infusion-pump/"'));
// The second cause on s6 carries a value-shaped default password; it is redacted in place (the cause
// list still needs to show there is a second cause) while a plain, valueless mention of "password"
// in s6's own description survives unchanged.
check('a cause with a credential value is redacted and the raw value never renders', !single.includes('1234') && single.includes('[withheld]'));
check('a legitimate mention of "password" with no value attached is not redacted', single.includes('Ask the department for the service password before you start.'));
check('classLabel maps keys to plain labels, falls back to a pluralized acronym-aware label, and fuses x-ray/c-arm compounds', sf.classLabel('infusion_pump') === 'Infusion pumps' && sf.classLabel('odd_key') === 'Odd keys' && sf.classLabel('dental_x_ray_system') === 'Dental X-ray systems' && sf.classLabel('c_arm') === 'C-arms');

// Symptom cap: a model with 61 generated symptoms renders exactly 60 symptom blocks, with the
// remaining 1 listed under "More symptoms" instead.
{
  const capModel = { id: '33333333-3333-3333-3333-333333333333', manufacturer: 'Cap Co', name: 'Model Z', family: null, category_key: 'infusion_pump', community_fix_count: 0, error_codes: [], symptoms: [] };
  for (let i = 0; i < 61; i++) {
    capModel.symptoms.push({ id: 'cap' + i, title: 'Symptom ' + i, description: null, safety_class: 'none', cause_count: 1, step_count: 0, action_count: 0, causes: [{ rank: 1, title: 'Cause ' + i, likelihood: null }], first_step: null });
  }
  const capData = { exported: '2026-10-13', stats: { models_with_knowledge: 1, symptoms: 61, causes: 61, steps: 0, error_codes: 0 }, models: [capModel] };
  const capOut = fs.mkdtempSync(path.join(os.tmpdir(), 'fra-sf-cap-'));
  sf.buildServiceForge({ data: capData, out: capOut, origin: 'https://example.test' });
  const capPage = fs.readFileSync(path.join(capOut, 'serviceforge', 'models', 'cap-co', 'model-z', 'index.html'), 'utf8');
  check('a model with 61 symptoms caps the full rendering at exactly 60 symptom blocks', (capPage.match(/class="symptom"/g) || []).length === 60);
  check('the remaining symptom is listed under More symptoms', capPage.includes('More symptoms'));
  const moreSection = capPage.slice(capPage.indexOf('More symptoms'));
  const moreLis = (moreSection.match(/<li>/g) || []).length;
  check('the More symptoms list holds exactly the one remaining title', moreLis === 1, moreLis);
  fs.rmSync(capOut, { recursive: true, force: true });
}

{
  const stale = path.join(out, 'serviceforge', 'classes', 'stale-class', 'index.html');
  fs.mkdirSync(path.dirname(stale), { recursive: true }); fs.writeFileSync(stale, 'stale', 'utf8');
  sf.buildServiceForge({ data, out, origin: 'https://example.test' });
  check('a rebuild removes pages that are no longer generated and rewrites the live ones', !fs.existsSync(stale) && exists('serviceforge/models/acme-sons/pump-100-x/index.html') && exists('serviceforge/classes/infusion-pump/index.html'));
}
fs.rmSync(out, { recursive: true, force: true });
console.log(fails.length ? `\n${fails.length} FAILED` : '\nAll ServiceForge page tests passed.');
process.exit(fails.length ? 1 : 0);
