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
check('a safety class of none shows no badge; a known class shows its label', !page.includes('<span class="pill">none</span>') && page.includes('<span class="pill">caution</span>') && (page.match(/class="pill"/g) || []).length === 1);
check('the record label and the teaching-summary line are present', page.includes('ServiceForge knowledge base record. Field-unverified unless technicians confirmed it.') && page.includes('A teaching summary of the record, not a service manual.'));
check('nothing protected leaks', !/password|procedure|part_number|citation|quote|org_id/i.test(page));
const ld = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
check('JSON-LD: TechArticle with dateModified from the export, then BreadcrumbList', ld[0]['@type'] === 'TechArticle' && ld[0].dateModified === '2026-10-13' && ld[1]['@type'] === 'BreadcrumbList');
const idx = read('serviceforge/models/index.html'); const cls = read('serviceforge/classes/infusion-pump/index.html');
check('the index lists the model under its manufacturer and links the class page', idx.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && idx.includes('href="/serviceforge/classes/infusion-pump/"'));
check('the class page names the class, lists the model, and its symptom titles', cls.includes('Infusion pumps') && cls.includes('href="/serviceforge/models/acme-sons/pump-100-x/"') && cls.includes('Occlusion alarm with a clear line'));
check('classLabel maps keys to plain labels and falls back to a title-cased key', sf.classLabel('infusion_pump') === 'Infusion pumps' && sf.classLabel('odd_key') === 'Odd key');

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

fs.rmSync(out, { recursive: true, force: true });
console.log(fails.length ? `\n${fails.length} FAILED` : '\nAll ServiceForge page tests passed.');
process.exit(fails.length ? 1 : 0);
