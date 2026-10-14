'use strict';
// Public ServiceForge pages from site/data/serviceforge.json: a models index, one page per device class,
// one page per model with knowledge. Middle-path exposure: every symptom and cause, the first check in
// full, everything else behind the connect button. Nothing protected is in the export to begin with, and
// the value-shaped credential screen in site/credential-screen.js drops or redacts anything that still
// reads like an access code, password, PIN, or username before it reaches a page.
const fs = require('fs'); const path = require('path');
const site = require('./build-site');
const { esc } = require('./markup');
const { shell, crumbs, breadcrumbLd, org, slugify, shorten, BRAND, DESC_MAX } = site;

// The credential screen lives in site/credential-screen.js and is re-exported below, so the tests
// and the export runner keep one import path. Policy here: hasCredential() gates whether a first
// step is published at all (FIRST_STEP_FIELDS, below), redact() cleans every other printed string.
const { findCredential, findCredentials, hasCredential, redact } = require('./credential-screen');

// category_key values in the export use underscores (patient_monitor, x_ray_system, infusion_pump, ventilator,
// anesthesia_machine, hospital_bed, test_equipment_power_supply, ultrasound_system, ct_scanner, patient_lift, ...).
// Override here only where the computed fallback below (acronym-aware, pluralized) reads wrong.
const CLASS_LABELS = { infusion_pump: 'Infusion pumps', patient_monitor: 'Patient monitors', defibrillator: 'Defibrillators', ventilator: 'Ventilators', anesthesia_machine: 'Anesthesia machines', x_ray_system: 'X-ray systems', ct_scanner: 'CT scanners', ultrasound_system: 'Ultrasound systems', hospital_bed: 'Hospital beds', patient_lift: 'Patient lifts', test_equipment_power_supply: 'Test equipment and power supplies', electrosurgical_unit: 'Electrosurgical units', suction_pump: 'Suction units', sterilizer: 'Sterilizers and reprocessors', infant_warmer: 'Infant warmers and incubators', procedure_light: 'Procedure lights' };
// Acronyms that stay upper-case as a whole token (checked case-insensitively against each "_"-split token).
const UPPER_TOKENS = new Set(['ct', 'mri', 'pet', 'spect', 'ecg', 'ekg', 'eeg', 'emg', 'iv', 'ac', 'dc', 'uv', 'led', 'aed', 'esu', 'cpap', 'bipap', 'icu', 'nicu', 'or', 'er', 'hd', 'hf', 'rf', 'ir', 'tee', 'ivus', 'abp', 'nibp', 'spo2', 'etco2']);
function pluralizeWord(word) {
  if (/s$/i.test(word) || /^equipment$/i.test(word)) return word;
  if (/[^aeiouAEIOU]y$/.test(word)) return word.slice(0, -1) + 'ies';
  if (/(x|z|ch|sh)$/i.test(word)) return word + 'es';
  return word + 's';
}
// Fallback for a category_key with no CLASS_LABELS entry: split on "_", fuse the two-token compounds
// "x_ray" and "c_arm" into one hyphenated word, upper-case known acronym tokens, lowercase the rest,
// pluralise the last word, and capitalise the label's first character.
function classLabelFallback(key) {
  const raw = key.split(/_+/).filter(Boolean);
  const tokens = [];
  for (let i = 0; i < raw.length; i++) {
    const pair = `${raw[i].toLowerCase()}_${(raw[i + 1] || '').toLowerCase()}`;
    if (pair === 'x_ray') { tokens.push('X-ray'); i++; continue; }
    if (pair === 'c_arm') { tokens.push('C-arm'); i++; continue; }
    tokens.push(UPPER_TOKENS.has(raw[i].toLowerCase()) ? raw[i].toUpperCase() : raw[i].toLowerCase());
  }
  if (!tokens.length) return 'Other equipment';
  tokens[tokens.length - 1] = pluralizeWord(tokens[tokens.length - 1]);
  const label = tokens.join(' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}
const classLabel = key => CLASS_LABELS[key] || (key ? classLabelFallback(key) : 'Other equipment');
// Mid-sentence use of a label: lowercase only the first character, and only when the first word is not
// an all-caps acronym or an acronym-hyphen compound (so "CT scanners" and "X-ray equipment" keep their
// capital, which is the form search engines index, but "Infusion pumps" becomes "infusion pumps").
function lowerLabel(label) {
  const first = label.split(' ')[0];
  if (first.length > 1 && first === first.toUpperCase() && /[A-Z]/.test(first)) return label;
  if (/^[A-Z]+-/.test(first)) return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}
// "2 medical imaging equipment" is ungrammatical; a mass-noun label counts models, not itself.
const countLabel = (n, label) => (/equipment$/i.test(label) ? `${n} models in ${lowerLabel(label)}` : `${n} ${lowerLabel(label)}`);
const classSlug = key => (key || 'other').replace(/_/g, '-');
// A class page needs at least this many models; a one-model class page would only repeat that model's page
// (the live export has 247 single-model classes out of 346).
const MIN_CLASS_MODELS = 2;
const LABEL = 'ServiceForge knowledge base record. Field-unverified unless technicians confirmed it.';
const SUMMARY = 'A teaching summary of the record, not a service manual.';
const connect = text => `<a class="btn primary" href="/serviceforge/#connect" data-sf="connect">${esc(text || 'Connect ServiceForge to your AI')}</a>`;
const CLICK = `<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-sf="connect"]');if(a&&window.gtag)gtag('event','sf_connect_click',{page_path:location.pathname});});</script>`;
const hasKnowledge = m => (m.symptoms || []).filter(s => (s.causes || []).length).length >= 2;
// Known safety classes map to a label ('none' to no badge at all); anything new shows as written.
const SAFETY = { patient_safety: 'patient safety', high_voltage: 'high voltage', radiation: 'radiation', mri: 'MRI environment', caution: 'caution', none: '' };
const safety = k => (SAFETY[k] !== undefined ? SAFETY[k] : esc(k || ''));
const SYMPTOM_CAP = 60;

function slugModels(models) {
  const seen = {};
  return models.map(m => {
    const base = `${slugify(m.manufacturer)}/${slugify(m.name)}`; let s = base; let n = 2;
    while (seen[s]) s = `${base}-${n++}`; seen[s] = true;
    return Object.assign({}, m, { slugPath: s, url: `/serviceforge/models/${s}/` });
  });
}

const FIRST_STEP_FIELDS = ['check_text', 'test_point', 'expected', 'value_unit', 'tools', 'tolerance'];
// A first step with a credential-shaped value in any of its fields is dropped entirely rather than
// redacted in place: a dropped step still has a free-text check_text and test_point, and redacting one
// field while keeping the rest would still read like instructions for getting past the credential.
const stepCredential = s => s.first_step && FIRST_STEP_FIELDS.some(k => hasCredential(s.first_step[k]));

function symptomBlock(s) {
  const causes = (s.causes || []).map(c => `<li>${c.rank ? `<span class="rank">${c.rank}.</span> ` : ''}${esc(redact(c.title))}${c.likelihood ? ` <span class="muted">(${esc(c.likelihood)})</span>` : ''}</li>`).join('');
  const f = stepCredential(s) ? null : s.first_step;
  const step = f ? `<div class="step"><div class="eyebrow">First check</div><p>${esc(f.check_text)}</p><dl>${f.test_point ? `<dt>Test point</dt><dd>${esc(f.test_point)}</dd>` : ''}${f.expected ? `<dt>Expected</dt><dd>${esc(f.expected)}${f.value_unit && !String(f.expected).includes(f.value_unit) ? ' ' + esc(f.value_unit) : ''}${f.tolerance ? `, ${esc(f.tolerance)}` : ''}</dd>` : ''}${f.tools ? `<dt>Tools</dt><dd>${esc(f.tools)}</dd>` : ''}</dl></div>` : '';
  // more = everything not shown as the first step; a dropped step counts as nothing shown, so more
  // then equals the full step_count. The line (and its connect button) renders only when there is
  // something behind it: a check still to come, a corrective action, or both.
  const more = Math.max(0, (s.step_count || 0) - (f ? 1 : 0));
  const actions = s.action_count || 0;
  let rest = '';
  if (more > 0 && actions > 0) rest = `<p class="rest">${more} more check${more === 1 ? '' : 's'} with pass and fail actions, ${actions} corrective action${actions === 1 ? '' : 's'}, and part numbers are in ServiceForge. ${connect()}</p>`;
  else if (more > 0) rest = `<p class="rest">${more} more check${more === 1 ? '' : 's'} with pass and fail actions are in ServiceForge. ${connect()}</p>`;
  else if (actions > 0) rest = `<p class="rest">${actions} corrective action${actions === 1 ? '' : 's'} and part numbers are in ServiceForge. ${connect()}</p>`;
  return `<section class="symptom"><h3>${esc(redact(s.title))}${safety(s.safety_class) ? ` <span class="pill">${safety(s.safety_class)}</span>` : ''}</h3>${s.description ? `<p class="ink2">${esc(redact(s.description))}</p>` : ''}<h4>Ranked causes</h4><ol class="causes">${causes}</ol>${step}${rest}</section>`;
}

function modelPage(m, data, origin, classPages) {
  const name = `${m.manufacturer} ${m.name}`; const cls = classLabel(m.category_key);
  const title = `${name} Troubleshooting and Error Codes | ServiceForge`;
  const h1 = `${name}: troubleshooting and error codes`;
  const steps = m.symptoms.reduce((a, s) => a + (s.step_count || 0), 0); const causes = m.symptoms.reduce((a, s) => a + (s.causes || []).length, 0);
  const codeCount = (m.error_codes || []).length;
  const description = shorten(`${name} troubleshooting: ${m.symptoms.length} symptoms with ranked causes and first checks${codeCount ? `, ${codeCount} error codes` : ''}. From the ServiceForge knowledge base.`, DESC_MAX);
  // The class crumb only when the class has its own page; a single-model class stays as the eyebrow text.
  const classCrumb = classPages && classPages.has(classSlug(m.category_key)) ? [{ name: cls, href: `/serviceforge/classes/${classSlug(m.category_key)}/` }] : [];
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: '/serviceforge/models/' }].concat(classCrumb, [{ name: name, href: m.url }]);
  // Middle-path symptom cap: the first 60 (by cause count, then title) render in full; the rest
  // are named so the page stays truthful about total scope, with one connect button.
  const sorted = m.symptoms.slice().sort((a, b) => (b.cause_count || 0) - (a.cause_count || 0) || String(a.title).localeCompare(String(b.title)));
  const shown = sorted.slice(0, SYMPTOM_CAP); const hidden = sorted.slice(SYMPTOM_CAP);
  const moreSymptoms = hidden.length ? `<section><h2>More symptoms</h2><ul>${hidden.map(s => `<li>${esc(redact(s.title))}</li>`).join('')}</ul><p class="rest">${hidden.length} more symptom${hidden.length === 1 ? '' : 's'} with ranked causes and checks are in ServiceForge. ${connect()}</p></section>` : '';
  const codes = codeCount ? `<section><h2>Error codes</h2><div class="table-wrap"><table class="plain"><thead><tr><th>Code</th><th>Meaning</th><th>Trigger</th><th>Severity</th></tr></thead><tbody>${m.error_codes.map(e => `<tr><td><code>${esc(e.code)}</code></td><td>${esc(redact(e.meaning || ''))}</td><td>${esc(redact(e.trigger_condition || ''))}</td><td>${esc(e.severity || '')}</td></tr>`).join('')}</tbody></table></div><p class="rest">Likely causes and actions for each code are in ServiceForge. ${connect()}</p></section>` : '';
  const body = `${crumbs(crumbList)}
<article class="lesson sf-model">
  <div class="eyebrow">${esc(cls)}${m.family ? ` &middot; ${esc(m.family)} family` : ''}</div>
  <h1>${esc(h1)}</h1>
  <p class="lede ink2">The ServiceForge knowledge base holds ${m.symptoms.length} documented symptoms for the ${esc(name)}, with ${causes} ranked causes, ${steps} diagnostic checks with test points and expected values, and ${codeCount} error codes. Each symptom below shows its causes and the first check; the rest is one connection away. ${connect()}</p>
  <h2>Symptoms</h2>
  ${shown.map(symptomBlock).join('')}
  ${moreSymptoms}
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
  // "Common" means shared by at least two models in the class; a title only one model carries is not
  // common, it is just that model's own symptom list repeated.
  const common = Object.keys(titles).filter(t => titles[t].length >= 2).sort((a, b) => titles[b].length - titles[a].length || a.localeCompare(b)).slice(0, 15);
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: '/serviceforge/models/' }, { name: label, href: url }];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <h1>${esc(label)} troubleshooting: models and common symptoms</h1>
  <p class="lede ink2">${esc(countLabel(models.length, label))} with troubleshooting records in ServiceForge. Each model page lists every documented symptom with its ranked causes and first check.</p>
  <h2>Models</h2><ul>${models.map(m => `<li><a href="${m.url}">${esc(m.manufacturer)} ${esc(m.name)}</a> <span class="muted">${m.symptoms.length} symptoms</span></li>`).join('')}</ul>
  ${common.length ? `<h2>Common symptoms</h2><ul>${common.map(t => `<li>${esc(redact(t))} <span class="muted">${titles[t].map(m => `<a href="${m.url}">${esc(m.name)}</a>`).join(', ')}</span></li>`).join('')}</ul>` : ''}
  <p class="muted">${LABEL} ${SUMMARY}</p>
</article>`;
  return shell({ origin, path: url, type: 'website', title: `${label} Troubleshooting: Models and Common Symptoms | ServiceForge`, ogTitle: `${label} troubleshooting`, description: shorten(`Troubleshooting records for ${countLabel(models.length, label)} in the ServiceForge knowledge base: symptoms, ranked causes, and first checks per model.`, DESC_MAX), nav: `<a href="/serviceforge/models/">Models</a><a href="/serviceforge/" class="btn primary small">ServiceForge</a>`, jsonld: [breadcrumbLd(origin, crumbList)], body });
}

function indexPage(models, data, origin, classPages) {
  const url = '/serviceforge/models/'; const byMfr = {}; models.forEach(m => { (byMfr[m.manufacturer] = byMfr[m.manufacturer] || []).push(m); });
  const classes = {}; models.forEach(m => { const k = classSlug(m.category_key); if (classPages.has(k)) (classes[k] = classes[k] || { key: m.category_key, n: 0 }).n++; });
  // The lede's totals come from the models this page actually lists, not from data.stats: the stats
  // block describes the whole export (including symptoms the model pages never render), and a sentence
  // next to a list of models should add up to that list.
  const symptoms = models.reduce((a, m) => a + m.symptoms.length, 0);
  const sCauses = models.reduce((a, m) => a + m.symptoms.reduce((b, s) => b + (s.causes || []).length, 0), 0);
  const sSteps = models.reduce((a, m) => a + m.symptoms.reduce((b, s) => b + (s.step_count || 0), 0), 0);
  const sCodes = models.reduce((a, m) => a + (m.error_codes || []).length, 0);
  const crumbList = [{ name: 'ServiceForge', href: '/serviceforge/' }, { name: 'Models', href: url }];
  const body = `${crumbs(crumbList)}
<article class="lesson">
  <h1>Medical equipment models with troubleshooting records</h1>
  <p class="lede ink2">${models.length} models, ${symptoms.toLocaleString('en-US')} symptoms, ${sCauses.toLocaleString('en-US')} ranked causes, ${sSteps.toLocaleString('en-US')} checks, and ${sCodes.toLocaleString('en-US')} error codes in the ServiceForge knowledge base, exported ${esc(data.exported)}.</p>
  ${Object.keys(classes).length ? `<h2>By device class</h2><p class="ink2">Classes with two or more documented models. A model that is alone in its class is listed under its manufacturer below.</p><ul>${Object.keys(classes).sort().map(k => `<li><a href="/serviceforge/classes/${k}/">${esc(classLabel(classes[k].key))}</a> <span class="muted">${classes[k].n}</span></li>`).join('')}</ul>` : ''}
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
  // Start clean: a model or class that left the export must not survive as a stale page.
  fs.rmSync(path.join(opts.out, 'serviceforge'), { recursive: true, force: true });
  const urls = [];
  if (!models.length) return { urls };
  const byClass = {}; models.forEach(m => { (byClass[classSlug(m.category_key)] = byClass[classSlug(m.category_key)] || []).push(m); });
  const classPages = new Set(Object.keys(byClass).filter(k => byClass[k].length >= MIN_CLASS_MODELS));
  write('/serviceforge/models/', indexPage(models, data, origin, classPages)); urls.push('/serviceforge/models/');
  [...classPages].sort().forEach(k => { const u = `/serviceforge/classes/${k}/`; write(u, classPage(byClass[k][0].category_key, byClass[k], data, origin)); urls.push(u); });
  models.forEach(m => { write(m.url, modelPage(m, data, origin, classPages)); urls.push(m.url); });
  return { urls };
}

// The credential screen is re-exported so tests and scripts have one import path, and
// FIRST_STEP_FIELDS with it so the export runner's scan cannot drift from what is screened.
module.exports = { buildServiceForge, classLabel, slugModels, hasKnowledge, SYMPTOM_CAP, FIRST_STEP_FIELDS, findCredential, findCredentials, hasCredential, redact };
