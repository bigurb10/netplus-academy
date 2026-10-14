'use strict';
// Public ServiceForge pages from site/data/serviceforge.json: a models index, one page per device class,
// one page per model with knowledge. Middle-path exposure: every symptom and cause, the first check in
// full, everything else behind the connect button. Nothing protected is in the export to begin with, and
// a value-shaped credential screen below drops or redacts anything that still reads like an access code,
// password, PIN, or username before it reaches a page.
const fs = require('fs'); const path = require('path');
const site = require('./build-site');
const { esc } = require('./markup');
const { shell, crumbs, breadcrumbLd, org, slugify, shorten, BRAND, DESC_MAX } = site;

// ---------------------------------------------------------------------------
// Credential screen. This is the enforcement point: the export query excludes the password table,
// but a service access code or a username/password pair can still show up as free text inside a
// diagnostic step, a symptom description, a cause title, or an error code, and this is what stops
// it from being published anyway.
//
// Never published: a service access code, password, passcode, PIN, username, or login value.
// Always published: the technician text that uses the same words without giving a value --
// "Pin 1: +15.0 V; Pin 2: ground", "Verify correct password is available", "password prompt
// appears", "BOOT CODE IS NOT COMPATIBLE", "error code 412 means the door is open".
//
// The test is a credential NOUN paired with a credential-shaped VALUE in the same clause. A value
// contains a digit (2580, 1-2-9, 101867), or is a long alphabetic token that is not ordinary prose
// (ulsadm, mlcltechuser), or is mixed case (MLCLTechUser). A token followed by a unit is a
// measurement and never a credential, and lower-case "pin" is a connector pin, so only upper-case
// PIN counts as a noun (and only with four or more digits in an access context).
//
// hasCredential() gates whether a first step is published at all; redact() replaces each matched
// span (noun through value) with [withheld] and leaves the rest of the string byte-for-byte.
const CRED_NOUNS = ['pass ?words?', 'pass ?codes?', 'pass ?phrases?', 'pin ?codes?', 'access codes?', 'service codes?', 'unlock codes?', 'security codes?', 'engineer(?:ing)? codes?', 'tech(?:nician)? codes?', 'maintenance codes?', 'supervisor codes?', 'biomed codes?', 'factory codes?', 'user ?names?', 'user ?ids?', 'logins?', 'log-ins?', 'log ?ons?', 'credentials?'];
const CRED_NOUN = new RegExp('\\b(?:' + CRED_NOUNS.join('|') + ')\\b', 'gi');
const PIN_NOUN = /\bPIN\b/g;                       // upper case only: lower-case "pin" is a connector pin
// "log on as <name>", "logged in as <name>": the token after "as" is the account, whatever its shape.
const AS_ACCOUNT = /\b(?:log ?ons?|log ?ins?|logg?ed (?:in|on)|sign(?:ed)? ?in|authenticated?)\s+as\b/gi;
// "Correct password (default is model number, e.g., 6681)": the value is named indirectly and then
// given as an example. Only counts with a credential noun earlier in the same sentence.
const DEFAULT_VALUE = /\b(?:default|factory)\s+(?:is|=|:)\s*(?:[^.;\n]|\.(?=\S)){0,30}?\b\d{3,}\b/gi;
// Account-name shaped tokens, which turn up before the noun as often as after it ("MLCLSQLUSER
// account credentials", "mlclsqluser logged in"). Hardware words with the same ending are listed out.
const ACCOUNT_TOKEN = /\b[A-Za-z][A-Za-z0-9]{2,}(?:user|usr|adm|admin|svc)\b/gi;
const ACCOUNT_NOT = new Set(['infuser', 'infusers', 'diffuser', 'diffusers', 'ugsuser', 'multiuser', 'enduser', 'superuser', 'poweruser']);
// A number followed by one of these is a measurement, not a credential.
const UNIT_AFTER = /^\s*(?:V|mV|kV|VDC|VAC|A|mA|uA|Hz|kHz|MHz|k?ohms?|psi|mmHg|cmH2O|kPa|bar|%|s|sec|ms|min|h|L|mL|lpm|deg|C|F|W|mW|dB|rpm|bpm)(?![A-Za-z0-9])/;
const PIN_CONTEXT = /\b(?:enter|entry|entered|entering|access|security|unlock|login|logon|program|master|supervisor|prompt|keypad|menu|code)\b/i;
// Tokens a credential value may hide behind: "password is 1234", "username: cxdi", "passcode of 2580".
const CONNECTORS = new Set(['is', 'was', 'as', 'to', 'of', 'the', 'a', 'an', 'with', 'using', 'be', 'default', 'e', 'g', 'eg', 'ie', 'such', 'example']);
const PUNCT_SKIP = new Set([':', '=', '-', ',', '(', ')', '"', "'", '/', '>', '[', ']']);
// Ordinary words, so that "password prompt", "passcode entry", "password of fewer than six
// characters" and "credentials invalid" are prose rather than a value. Not meant to be exhaustive:
// the point is that the obvious prose that follows these nouns is never mistaken for a value.
const COMMON_WORDS = new Set(('a an and the of to in on at by for from into onto under over with without within as is are was were be been being do does did done has have had will would should could must might can cannot not no none nothing ' +
  'this that these those there their they them it its you your our we us ' +
  'available prompt prompts prompted protected protection required requires require entry entries field fields screen screens dialog dialogue reset change changed changes recovery incorrect correct wrong invalid valid expired menu menus setting settings set option options window needed accepted rejected mismatch mismatched match matches matched error errors message messages lockout locked lock unlocked policy attempts attempt length complexity default defaults enter entered entering input request requested verify verified check checked checks confirm confirmed supplied provided obtained known unknown missing blank empty again before after first second third twice once fewer than exceeds exceeded level levels code codes rights right present absent update updates already ' +
  'access service system device unit units manual documentation administrator admin supervisor user users username usernames password passwords passcode passcodes passphrase pin login logins logon credential credentials account accounts technician biomed vendor manufacturer support help keypad keyboard button buttons press pressed hold release sequence ' +
  'then when where which while because however therefore about above below between during through until per time times minute minutes second seconds character characters ' +
  'model number numbers serial version versions software firmware display displayed displays shown shows show appears appear appeared failed failure fails successful successfully success compatible supported unsupported ' +
  'operator operators windows platform console hospital domain network remote local standard custom shell web browser interface mode modes new old current same other another each every both only still also').split(/\s+/));
// Inflected English: a word, never a value. "password forgotten", "login location", "passcode
// authentication", "service code written" are all prose; a credential (ulsadm, 2580) is not inflected.
const PROSE_SUFFIX = /(?:ed|en|ing|tion|sion|ment|ness|ity|ies|ous|ive|able|ible|ance|ence|ful|less|ure|age|ism|ist|ary|ory|ly)$/i;
// After an explicit ":" or "=" any token is the value ("Username: cxdi", "Password: service"),
// except the handful of words that continue the sentence instead.
const NONVALUE = new Set(['not', 'none', 'no', 'na', 'unknown', 'required', 'incorrect', 'invalid', 'blank', 'empty', 'missing', 'see', 'the', 'and', 'or', 'is', 'was', 'enter', 'entered', 'entry', 'error', 'field', 'screen', 'prompt', 'dialog', 'mismatch', 'expired', 'locked', 'correct', 'wrong', 'yes', 'verify', 'check', 'change', 'changed', 'reset', 'default', 'unavailable', 'protected', 'needed', 'set']);
// Acronyms that are never an account name, so "username LDAP" style adjacency does not fire on them.
const ACRONYM_OK = new Set(['SSID', 'LDAP', 'GPIB', 'DICOM', 'LAN', 'WLAN', 'USB', 'IP', 'OS', 'PC', 'CPU', 'RAM', 'ROM', 'LED', 'LCD', 'AC', 'DC', 'OK', 'NG', 'ID', 'PIN', 'EEPROM', 'SQL', 'HL7', 'DHCP', 'TCP', 'UDP', 'VPN', 'NTP', 'SMTP', 'FTP', 'CRC', 'RTC', 'OU', 'MUSE', 'CCS', 'IX', 'QA']);

const isSentenceEnd = (s, i) => s[i] === ';' || s[i] === '\n' || (s[i] === '.' && /\s|^$/.test(s[i + 1] || ''));
function sentenceAround(s, i) {
  let a = 0, b = s.length;
  for (let j = i - 1; j >= 0; j--) if (isSentenceEnd(s, j)) { a = j + 1; break; }
  for (let j = i; j < s.length; j++) if (isSentenceEnd(s, j)) { b = j; break; }
  return s.slice(a, b);
}
// Is tok the credential value? assigned = a ":" or "=" was crossed; far = an ordinary word was
// crossed first, after which only a digit-bearing or mixed-case token that ends the clause still
// reads as a value; last = nothing but punctuation follows the token in this clause, which is where
// a quoted value sits ("password ulsadm") and where prose does not ("password prompt appears").
function isValue(tok, rest, noun, assigned, far, last) {
  if (noun.mode === 'pin') return /^\d{4,}$/.test(tok) && !UNIT_AFTER.test(rest) && (assigned || PIN_CONTEXT.test(noun.sentence));
  if (tok.length < ((assigned || noun.mode === 'as') ? 2 : 3)) return false;
  if (UNIT_AFTER.test(rest)) return false;
  const low = tok.toLowerCase();
  const mixed = tok.length >= 8 && /[a-z]/.test(tok) && /[A-Z]/.test(tok.slice(1));
  if (assigned && !far) return !NONVALUE.has(low);
  if (noun.mode === 'as') return !COMMON_WORDS.has(low);
  if (far) return (/\d/.test(tok) || mixed) && last;
  if (/\d/.test(tok) || mixed) return true;
  if (/^[A-Za-z]+$/.test(tok) && tok.length >= 5 && last && !COMMON_WORDS.has(low) && !PROSE_SUFFIX.test(tok)) return true;
  return !!noun.upperOk && /^[A-Z][A-Z0-9]{2,}$/.test(tok) && !ACRONYM_OK.has(tok);
}
// Walk the clause after a noun (at most 40 characters, never past a ".", ";" or newline) looking for
// the value: punctuation and connectors are stepped over, ordinary words are stepped over but
// narrow what still counts, and anything else ends the clause.
function valueAfter(s, noun) {
  const limit = Math.min(s.length, noun.end + 40);
  let i = noun.end, assigned = false, far = false;
  while (i < limit) {
    const ch = s[i];
    if (isSentenceEnd(s, i)) return null;
    if (/\s/.test(ch)) { i++; continue; }
    if (PUNCT_SKIP.has(ch)) { if (ch === ':' || ch === '=') assigned = true; i++; continue; }
    if (!/[A-Za-z0-9]/.test(ch)) return null;
    const raw = /^[A-Za-z0-9][A-Za-z0-9*#_.\-]*/.exec(s.slice(i))[0];
    const tok = raw.replace(/[.\-_]+$/, '');
    // "admin1,3,5,7": a comma-separated run of further digit groups belongs to the value.
    let end = i + tok.length;
    const tail = /\d/.test(tok) && /^(?:\s?,\s?[A-Za-z0-9*#_.\-]*\d[A-Za-z0-9*#_.\-]*)+/.exec(s.slice(end));
    if (tail) end += tail[0].length;
    let j = end; while (j < s.length && !isSentenceEnd(s, j)) j++;
    const last = /^[)\]"',.\s]*$/.test(s.slice(end, j));
    if (isValue(tok, s.slice(i + tok.length), noun, assigned, far, last)) return { start: noun.start, end };
    const low = tok.toLowerCase();
    if (CONNECTORS.has(low)) { i += raw.length; continue; }
    // An ordinary word narrows what still counts; a code-like token mid-clause ("F06 = 384") is
    // stepped over so the assignment behind it is still reached; anything else ends the clause.
    if (COMMON_WORDS.has(low) || /\d/.test(tok)) { far = true; i += raw.length; continue; }
    return null;
  }
  return null;
}
function nouns(s) {
  const out = [];
  let m;
  CRED_NOUN.lastIndex = 0;
  while ((m = CRED_NOUN.exec(s))) out.push({ start: m.index, end: m.index + m[0].length, mode: 'word', upperOk: /^user/i.test(m[0]) });
  PIN_NOUN.lastIndex = 0;
  while ((m = PIN_NOUN.exec(s))) out.push({ start: m.index, end: m.index + m[0].length, mode: 'pin', sentence: sentenceAround(s, m.index) });
  AS_ACCOUNT.lastIndex = 0;
  while ((m = AS_ACCOUNT.exec(s))) out.push({ start: m.index, end: m.index + m[0].length, mode: 'as' });
  return out;
}
// Every credential span in the text, in order, overlapping spans merged.
function findCredentials(text) {
  const s = String(text === null || text === undefined ? '' : text);
  if (!s) return [];
  const spans = [];
  nouns(s).forEach(n => { const v = valueAfter(s, n); if (v) spans.push(v); });
  let m;
  DEFAULT_VALUE.lastIndex = 0;
  while ((m = DEFAULT_VALUE.exec(s))) { CRED_NOUN.lastIndex = 0; if (CRED_NOUN.test(sentenceAround(s, m.index))) spans.push({ start: m.index, end: m.index + m[0].length }); }
  ACCOUNT_TOKEN.lastIndex = 0;
  while ((m = ACCOUNT_TOKEN.exec(s))) if (!ACCOUNT_NOT.has(m[0].toLowerCase())) spans.push({ start: m.index, end: m.index + m[0].length });
  spans.sort((a, b) => a.start - b.start || b.end - a.end);
  const merged = [];
  spans.forEach(sp => {
    const last = merged[merged.length - 1];
    if (last && sp.start <= last.end) last.end = Math.max(last.end, sp.end);
    else merged.push({ start: sp.start, end: sp.end });
  });
  return merged.map(sp => ({ start: sp.start, end: sp.end, text: s.slice(sp.start, sp.end) }));
}
const findCredential = text => { const f = findCredentials(text); return f.length ? f[0] : null; };
const hasCredential = text => findCredential(text) !== null;
const redact = text => {
  const s = String(text === null || text === undefined ? '' : text);
  const spans = findCredentials(s);
  if (!spans.length) return s;
  let out = '', i = 0;
  spans.forEach(sp => { out += s.slice(i, sp.start) + '[withheld]'; i = sp.end; });
  return out + s.slice(i);
};

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

const FIRST_STEP_FIELDS = ['check_text', 'test_point', 'expected', 'tools', 'tolerance'];
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

module.exports = { buildServiceForge, classLabel, slugModels, hasKnowledge, findCredential, hasCredential, redact };
