'use strict';
// The ServiceForge credential screen: the one barrier between a service access code, password,
// passcode, PIN, username or login value that sits in the knowledge base as free text and a public
// page. Required by site/build-serviceforge.js, which re-exports it; it requires nothing itself, so
// it can be imported from a test or a script with no risk of a circular require.
//
// hasCredential(text)   -> is there a credential value in this string?
// findCredentials(text) -> every {start, end, text} span, in order, overlaps merged
// findCredential(text)  -> the first span or null
// redact(text)          -> each span (noun through value) replaced with [withheld], every other
//                          byte left alone
//
// The export query excludes the password table, but a service access code or a username/password
// pair can still show up as free text inside a diagnostic step, a symptom description, a cause
// title, or an error code, and this is what stops it from being published anyway.
//
// Never published: a service access code, password, passcode, PIN, username, or login value.
// Always published: the technician text that uses the same words without giving a value --
// "Pin 1: +15.0 V; Pin 2: ground", "Verify correct password is available", "password prompt
// appears", "BOOT CODE IS NOT COMPATIBLE", "error code 412 means the door is open".
//
// The test is a credential NOUN paired with a credential-shaped VALUE in the same clause. A value
// contains a digit (2580, 1-2-9, 101867), or is a long alphabetic token that is not ordinary prose
// (ulsadm, mlcltechuser), or is mixed case (MLCLTechUser), or is one of a closed list of ordinary
// access words at the end of its clause (password service, password biomed), or is spelled out one
// character at a time (A-B-C-D), or carries a password symbol (P@ss1, Serv!ce1). A token followed by
// a unit is a measurement and never a credential, and lower-case "pin" is a connector pin, so only
// upper-case PIN counts as a noun (and only with four or more digits in an access context).
//
// Four forms do not have the noun in front of the value, and each is its own rule below: the verb
// side with no noun at all ("factory-secured with code HP003633", "812 unlocks the service menu"),
// the value in front of its noun ("2580 is the biomed passcode"), an account name in front of the
// word it belongs to ("cxdi user session established"), and a value named rather than spelled
// ("default is model number", "default model number").
//
// A separator class instead of a bare space, so "pass.code 2580", "user-name cxdi" and "user_name
// cxdi" read as the same noun as "pass code" does.
const SEP = '[ ._-]?';
// Bare "code" is not a noun (the corpus is full of "error code 412"), so it needs a qualifier -- but
// the qualifier is not always the word right before it: a menu path writes it as "Service > code
// 2213". Hence a separator run rather than a space. Never "." or ",": those end a sentence.
const QSEP = ' *(?:[>:/|-] *)?';
const CODE_QUALIFIER = '(?:access|service|unlock|security|secure|protection|lock|calibration|engineer(?:ing)?|tech(?:nician)?|maintenance|supervisor|biomed|factory)';
const CRED_NOUNS = ['pass' + SEP + 'words?', 'passwds?', 'pwds?', 'pswds?', 'pass' + SEP + 'codes?', 'pass' + SEP + 'phrases?', 'pin' + SEP + 'codes?', CODE_QUALIFIER + QSEP + 'codes?', 'user' + SEP + 'names?', 'user' + SEP + 'ids?', 'logins?', 'log-ins?', 'log' + SEP + 'ons?', 'accounts?', 'credentials?'];
// A trailing "(?![A-Za-z0-9])" rather than "\b", so that "password_2580" is still the noun
// "password" followed by a separator and a value.
const CRED_NOUN = new RegExp('\\b(?:' + CRED_NOUNS.join('|') + ')(?![A-Za-z0-9])', 'gi');
// The account family: for these the ordinary-access-word rule is off, because "log on as
// Administrator", "login user" and "Hospital User" name a role, not a secret.
const ACCOUNT_NOUN = /^(?:user|usr|log|account|credential)/i;
// Two-letter abbreviations are nouns too, but only with an explicit ":"/"=" or a digit-bearing value
// behind them: the corpus is full of "PW Doppler", "PW board" and "/usr/local" paths.
const ABBREV_NOUN = /\b(?:pw|usr)\b/gi;
const PIN_NOUN = /\bPIN\b/g;                       // upper case only: lower-case "pin" is a connector pin
// "log on as <name>", "logged in as <name>": the token after "as" is the account, whatever its shape.
const AS_ACCOUNT = /\b(?:log ?ons?|log ?ins?|logg?ed (?:in|on)|sign(?:ed)? ?in|authenticated?)\s+as\b/gi;
// The verb side: "Power supply is factory-secured with code HP003633". No credential noun appears at
// all here -- bare "code" cannot be one, because the corpus is full of "error code 412" -- so the
// verb plus "with|by|using" plus a MECHANISM word plus a code-shaped token is its own form. The
// mechanism word is what separates a code from hardware: this corpus secures things with square
// nuts, brackets, clamps, screw kits and pins, and every one of those carries a published part
// number ("secured with square nut part 453561182601", "locked with pin 10383 installed"), which
// stays. "secured with retaining straps" and "secured with 2.5 mm hex key screw" stay too.
const SECURED_WITH = /\b(?:[A-Za-z]+-)?(?:secured?|locked?|protected?)\s+(?:with|by|using)\s+(?:[A-Za-z0-9'()]+\s+){0,2}(?:codes?|keys?|passwords?|passcodes?|passphrases?|combinations?)\s+((?:[A-Za-z]{2,}\d{3,}|\d{4,})[A-Za-z0-9*#.-]*)/gi;
// The same verb side with the value first: "812 unlocks the service menu". Only "unlock", because
// "CB 304 open or faulty" is a circuit breaker and "enables" is what a setting does -- and only when
// the clause is about access at all, because a mechanical latch unlocks as well ("Solenoid 1200
// unlocked during the test", "Latch 2213 unlocks after the handle is released").
const UNLOCKS_VALUE = /\b((?:[A-Za-z]{2,})?\d{3,}(?:[ .-]?\d+)*)\s+unlock(?:s|ed)?\b/gi;
const UNLOCKS_CONTEXT = /\b(?:service|menu|mode|codes?|passwords?|passcodes?|diagnostics)\b/i;
// Once a "secured with code X" clause is known to carry a code, a further token of the SAME family
// in that clause is part of the same disclosure: "code HP003633 (E3633A) or HP003634 (E3634A)" gives
// two HP codes. Sharing the matched value's letter prefix is what makes it the same family, so a
// board designator that merely shares the sentence is not collateral ("replace board AB1234").
const REPEAT_VALUE = /\b[A-Za-z]{2,}\d{3,}[A-Za-z0-9]*\b/g;
// An account name in front of its word: "cxdi user session established". Four guards, because
// "<short token> user" is otherwise a common way to name a part or a role. The token is three or
// four characters, all lower case, not an English word, and starts its clause; the word it precedes
// is not the head of a compound noun ("ppp user name", "som user id"); and the clause says
// somewhere that authentication is what is going on ("session", "logged", "login", "account",
// "credential", "authenticated"), which "som user EEPROM device failure", "crt user color
// adjustment required", "cine user interface board replaced" and "adm user menu opens" do not.
const PRE_ACCOUNT = /\b([a-z][a-z0-9]{2,3})\s+(?:users?|accounts?|log ?ins?|log ?ons?)\b(?!\s+(?:names?|ids?)\b)/g;
// Read on the clause with the match itself cut out, so the word that triggered the rule cannot be
// the word that corroborates it: "isp account not set up properly" is a thing's name either way.
const AUTH_CONTEXT = /\b(?:sessions?|logged|log ?ons?|log ?ins?|accounts?|credentials?|authenticat\w*)\b/i;
// A digit value in front of its noun: "1234 password", "code 812 service code", "2580 is the biomed
// passcode". At most 24 characters back, never across a sentence end, and only across the connectors
// and access qualifiers that sit between a value and its noun.
const BEFORE_VALUE = /(?:^|[^A-Za-z0-9])((?:[A-Za-z]{2,})?\d{3,}(?:[ .-]?\d+)*)[\s:=,("'\/|-]*(?:\b(?:is|was|the|a|an|of|for|to|in|at|on|as|and|service|biomed|factory|default|maintenance|supervisor|access|admin|technician|tech|engineering|security|master|unlock|calibration|cal)\b[\s:,-]*){0,3}$/i;
// "Correct password (default is model number, e.g., 6681)": the value is named indirectly and then
// given as an example. Only counts with a credential noun earlier in the same sentence.
const DEFAULT_VALUE = /\b(?:default|factory)\s+(?:is|=|:)\s*(?:[^.;\n]|\.(?=\S)){0,30}?\b\d{3,}\b/gi;
// "Correct password ... or default model number", "Passcode does not match value at model number
// location in EEPROM": the value is named, or the place it is stored is named, rather than spelled
// out -- but the model number is the page's own H1, so naming it is giving it. Same credential-noun
// guard as DEFAULT_VALUE.
const MODEL_NUMBER = /\b(?:(?:default|factory)\s+(?:is\s+)?(?:the\s+)?|(?:value|values|stored|set|held|written)\s+(?:in|at)\s+(?:the\s+)?)(?:model|serial)\s+(?:numbers?|nos?\b)/gi;
// Account-name shaped tokens, which turn up before the noun as often as after it ("MLCLSQLUSER
// account credentials", "mlclsqluser logged in"). Hardware words with the same ending are listed out.
const ACCOUNT_TOKEN = /\b[A-Za-z][A-Za-z0-9]{2,}(?:user|usr|adm|admin|svc)\b/gi;
const ACCOUNT_NOT = new Set(['infuser', 'infusers', 'diffuser', 'diffusers', 'ugsuser', 'multiuser', 'enduser', 'superuser', 'poweruser']);
// A number followed by one of these is a measurement, not a credential.
const UNIT_AFTER = /^\s*(?:V|mV|kV|VDC|VAC|A|mA|uA|Hz|kHz|MHz|k?ohms?|psi|mmHg|cmH2O|kPa|bar|%|s|sec|ms|min|h|L|mL|lpm|deg|C|F|W|mW|dB|rpm|bpm)(?![A-Za-z0-9])/;
// A number with its unit stuck to the token is a measurement too. This matters because the value
// token now carries symbols, so the unit is no longer always in the text that follows: "100%",
// "15.0V", "5mA", and the degree mark the export carries either as U+00B0 or, through a console
// that cannot render it, as "?": "-34.1?C".
const MEASURE = /^[+-]?[\d.,]+\s*[\u00b0?]?\s*(?:V|mV|kV|VDC|VAC|A|mA|uA|Hz|kHz|MHz|k?ohms?|psi|mmHg|cmH2O|kPa|bar|%|s|sec|ms|min|h|L|mL|lpm|deg|C|F|W|mW|dB|rpm|bpm)$/i;
// A value spelled out one character at a time ("A-B-C-D", "1-2-9") and a value carrying a password
// symbol ("P@ss1", "Serv!ce1"): two shapes technician prose never takes, so they read as a value
// even though neither is a plain digit run or a long non-dictionary word.
const SPELLED = /^[A-Za-z0-9](?:[._-][A-Za-z0-9]){2,}$/;
const SYMBOL_VALUE = /[@!$]/;
// What the clause may say after an ordinary-word or spelled value and still be giving that value:
// the clause closes on it ("password service accepted") or hands over to another one ("Service
// password is biomed and must be changed"). Prose continues the noun phrase instead ("password
// prompt appears", "passcode entry exceeds 15 second window"), which this does not admit.
const CLAUSE_CLOSES = /^[)\]"',.\s]*(?:accepted|ok|okay|valid|invalid|required|successful|and|or|but|then)\b/i;
const PIN_CONTEXT = /\b(?:enter|entry|entered|entering|access|security|unlock|login|logon|program|master|supervisor|prompt|keypad|menu|code)\b/i;
// Tokens a credential value may hide behind: "password is 1234", "username: cxdi", "passcode of 2580".
const CONNECTORS = new Set(['is', 'was', 'as', 'to', 'of', 'the', 'a', 'an', 'with', 'using', 'be', 'default', 'e', 'g', 'eg', 'ie', 'such', 'example']);
const PUNCT_SKIP = new Set([':', '=', '-', ',', '(', ')', '"', "'", '/', '>', '[', ']', '.', '_']);
// The commonest real service password in this field is an ordinary word, which no shape rule can
// tell from prose; this closed list is what makes "password service", "password biomed" and
// "the supervisor code is service" credentials while "Verify correct password is available" stays.
// Only accepted at the end of its clause, so "Password/user name incorrect" and "login user
// credentials invalid" are untouched.
const ACCESS_VALUES = new Set('service biomed admin administrator supervisor tech technician engineer engineering maintenance factory default master super root guest operator'.split(' '));
// Ordinary words, so that "password prompt", "passcode entry", "password of fewer than six
// characters" and "credentials invalid" are prose rather than a value. Not meant to be exhaustive:
// the point is that the obvious prose that follows these nouns is never mistaken for a value.
const COMMON_WORDS = new Set(('a an and the of to in on at by for from into onto under over with without within as is are was were be been being do does did done has have had will would should could must might can cannot not no none nothing ' +
  'this that these those there their they them it its you your our we us ' +
  'available prompt prompts prompted protected protection required requires require entry entries field fields screen screens dialog dialogue reset change changed changes recovery incorrect correct wrong invalid valid expired menu menus setting settings set option options window needed accepted rejected mismatch mismatched match matches matched error errors message messages lockout locked lock unlocked policy attempts attempt length complexity default defaults enter entered entering input request requested verify verified check checked checks confirm confirmed supplied provided obtained known unknown missing blank empty again before after first second third twice once fewer than exceeds exceeded level levels code codes rights right present absent update updates already ' +
  'access service system device unit units manual documentation administrator admin supervisor user users username usernames password passwords passcode passcodes passphrase pin login logins logon credential credentials account accounts technician biomed vendor manufacturer support help keypad keyboard button buttons press pressed hold release sequence ' +
  'then when where which while because however therefore about above below between during through until per time times minute minutes second seconds character characters ' +
  'data model number numbers serial version versions software firmware display displayed displays shown shows show appears appear appeared failed failure fails successful successfully success compatible supported unsupported ' +
  'operator operators windows platform console hospital domain network remote local standard custom shell web browser interface mode modes new old current same other another each every both only still also').split(/\s+/));
// Inflected English: a word, never a value. "password forgotten", "login location", "passcode
// authentication", "service code written" are all prose; a credential (ulsadm, 2580) is not inflected.
const PROSE_SUFFIX = /(?:ed|en|ing|tion|sion|ment|ness|ity|ies|ous|ive|able|ible|ance|ence|ful|less|ure|age|ism|ist|ary|ory|ly)$/i;
// After an explicit ":" or "=" any token is the value ("Username: cxdi", "Password: service"),
// except the handful of words that continue the sentence instead.
const NONVALUE = new Set(['not', 'none', 'no', 'na', 'unknown', 'required', 'incorrect', 'invalid', 'blank', 'empty', 'missing', 'see', 'the', 'and', 'or', 'is', 'was', 'enter', 'entered', 'entry', 'error', 'field', 'screen', 'prompt', 'dialog', 'mismatch', 'expired', 'locked', 'correct', 'wrong', 'yes', 'verify', 'check', 'change', 'changed', 'reset', 'default', 'unavailable', 'protected', 'needed', 'set']);
// Acronyms that are never an account name, so "username LDAP" style adjacency does not fire on them.
const ACRONYM_OK = new Set(['SSID', 'LDAP', 'GPIB', 'DICOM', 'LAN', 'WLAN', 'USB', 'IP', 'OS', 'PC', 'CPU', 'RAM', 'ROM', 'LED', 'LCD', 'AC', 'DC', 'OK', 'NG', 'ID', 'PIN', 'EEPROM', 'SQL', 'HL7', 'DHCP', 'TCP', 'UDP', 'VPN', 'NTP', 'SMTP', 'FTP', 'CRC', 'RTC', 'OU', 'MUSE', 'CCS', 'IX', 'QA', 'PPP', 'CRT']);

const isSentenceEnd = (s, i) => s[i] === ';' || s[i] === '\n' || (s[i] === '.' && /\s|^$/.test(s[i + 1] || ''));
function clauseBounds(s, i) {
  let a = 0, b = s.length;
  for (let j = i - 1; j >= 0; j--) if (isSentenceEnd(s, j)) { a = j + 1; break; }
  for (let j = i; j < s.length; j++) if (isSentenceEnd(s, j)) { b = j; break; }
  return [a, b];
}
function sentenceAround(s, i) { const [a, b] = clauseBounds(s, i); return s.slice(a, b); }
// Is tok the credential value? assigned = a ":" or "=" was crossed; far = an ordinary word was
// crossed first, after which only a digit-bearing or mixed-case token that ends the clause still
// reads as a value; last = nothing but punctuation follows the token in this clause, which is where
// a quoted value sits ("password ulsadm") and where prose does not ("password prompt appears");
// closing = last, or the only thing after the value is the clause closing on it ("password service
// accepted", "Service password is biomed and must be changed"), which prose does not do either.
function isValue(tok, rest, noun, assigned, far, last, closing) {
  if (noun.mode === 'pin') return /^\d{4,}$/.test(tok) && !UNIT_AFTER.test(rest) && (assigned || PIN_CONTEXT.test(noun.sentence));
  if (UNIT_AFTER.test(rest) || MEASURE.test(tok)) return false;
  const low = tok.toLowerCase();
  // An ordinary access word at the end of its clause, which no shape rule reaches.
  if (ACCESS_VALUES.has(low) && closing && !far && tok.length >= 2 && noun.mode === 'word' && noun.passOk && (!noun.strict || assigned)) return true;
  if (tok.length < ((assigned || noun.mode === 'as') ? 2 : 3)) return false;
  const mixed = tok.length >= 8 && /[a-z]/.test(tok) && /[A-Z]/.test(tok.slice(1));
  if (noun.strict && !assigned && !/\d/.test(tok) && !mixed) return false;
  if (closing && (SPELLED.test(tok) || SYMBOL_VALUE.test(tok))) return true;
  if (assigned && !far) return !NONVALUE.has(low);
  if (noun.mode === 'as') return !COMMON_WORDS.has(low);
  if (far) return (/\d/.test(tok) || mixed) && last;
  if (/\d/.test(tok) || mixed) return true;
  if (/^[A-Za-z]+$/.test(tok) && tok.length >= 5 && last && !COMMON_WORDS.has(low) && !PROSE_SUFFIX.test(tok)) return true;
  // A short account token after "user name", "login", "log on" or "account": "login cxdi".
  if (noun.acctOk && /^[A-Za-z][A-Za-z0-9]{2,}$/.test(tok) && last && !COMMON_WORDS.has(low) && !PROSE_SUFFIX.test(tok) && !ACRONYM_OK.has(tok.toUpperCase())) return true;
  return !!noun.upperOk && /^[A-Z][A-Z0-9]{2,}$/.test(tok) && !ACRONYM_OK.has(tok);
}
// Walk the clause after a noun (at most 40 characters, never past a ".", ";" or newline) looking for
// the value: punctuation and connectors are stepped over, ordinary words are stepped over but
// narrow what still counts, and anything else ends the clause.
function valueAfter(s, noun) {
  const limit = Math.min(s.length, noun.end + 40);
  let i = noun.end, assigned = false, far = false, unknown = 0;
  while (i < limit) {
    const ch = s[i];
    if (isSentenceEnd(s, i)) return null;
    if (/\s/.test(ch)) { i++; continue; }
    if (PUNCT_SKIP.has(ch)) { if (ch === ':' || ch === '=') assigned = true; i++; continue; }
    // A value may start with a symbol ("*#06#", "#1234"); any other symbol is stepped over rather
    // than ending the clause, so one "@" or "!" no longer hides the value behind it.
    if (!/[A-Za-z0-9*#]/.test(ch)) { i++; continue; }
    const raw = /^[A-Za-z0-9*#][A-Za-z0-9*#_.\-@!$+%&^~?]*/.exec(s.slice(i))[0];
    const tok = raw.replace(/[.\-_?!]+$/, '');
    if (!tok) { i += raw.length; continue; }
    // "admin1,3,5,7": a comma-separated run of further digit groups belongs to the value.
    let end = i + tok.length;
    const tail = /\d/.test(tok) && /^(?:\s?,\s?[A-Za-z0-9*#_.\-]*\d[A-Za-z0-9*#_.\-]*)+/.exec(s.slice(end));
    if (tail) end += tail[0].length;
    // "password 1 2 9": three or more single digits separated by single spaces are one value.
    const run = /^\d$/.test(tok) && noun.mode === 'word' && (!noun.strict || assigned) && /^(?: \d){2,}(?![\dA-Za-z])/.exec(s.slice(i + tok.length));
    if (run && !UNIT_AFTER.test(s.slice(i + tok.length + run[0].length))) return { start: noun.start, end: i + tok.length + run[0].length };
    let j = end; while (j < s.length && !isSentenceEnd(s, j)) j++;
    const rest = s.slice(end, j);
    const last = /^[)\]"',.\s!?;]*$/.test(rest);
    const closing = last || CLAUSE_CLOSES.test(rest);
    // A bracket or quote opened inside the span closes inside it too, so the redaction does not
    // leave a stray ")" or '"' behind ('Service password is "biomed"').
    if (isValue(tok, s.slice(i + tok.length), noun, assigned, far, last, closing)) {
      const open = { '"': '"', "'": "'", ')': '(', ']': '[' }[s[end]];
      if (open && s.slice(noun.start, end).indexOf(open) >= 0) end++;
      return { start: noun.start, end };
    }
    const low = tok.toLowerCase();
    if (CONNECTORS.has(low)) { i += raw.length; continue; }
    // Any word that is not the value narrows what still counts to a digit-bearing or mixed-case
    // token that ends the clause ("The password for the maintenance menu is 1-2-9"), and so does a
    // code-like token mid-clause ("F06 = 384"), which keeps the assignment behind it reachable. Two
    // words the prose guards do not know is as far as a value can sit from its noun: past that the
    // clause has moved on to another subject ("/usr/gehc/csg/resources/ugsUser.properties").
    // A token that starts or ends with "*" or "#" is a reference mark, not a value ("*see note*",
    // "#ref"): step over it like any other word, because a symbol must never end the search.
    if (COMMON_WORDS.has(low) || /\d/.test(tok) || (/^[*#]*[A-Za-z]+[*#]*$/.test(tok) && ++unknown <= 2)) { far = true; i += raw.length; continue; }
    return null;
  }
  return null;
}
// The value sits in front of the noun: "1234 password", "code 812 service code". Only a digit value,
// and only across the few words that can stand between a value and its noun.
function valueBefore(s, noun) {
  if (noun.mode !== 'word') return null;
  const from = Math.max(0, noun.start - 24);
  let head = s.slice(from, noun.start), hstart = from;
  for (let j = head.length - 1; j >= 0; j--) if (isSentenceEnd(s, from + j)) { hstart = from + j + 1; head = s.slice(hstart, noun.start); break; }
  const m = BEFORE_VALUE.exec(head);
  if (!m) return null;
  const start = hstart + m.index + m[0].indexOf(m[1]);
  if (UNIT_AFTER.test(s.slice(start + m[1].length)) || MEASURE.test(m[1])) return null;
  return { start, end: noun.end };
}
function nouns(s) {
  const out = [];
  let m;
  CRED_NOUN.lastIndex = 0;
  while ((m = CRED_NOUN.exec(s))) out.push({ start: m.index, end: m.index + m[0].length, mode: 'word', upperOk: /^user/i.test(m[0]), acctOk: /^(?:user|log|account)/i.test(m[0]), passOk: !ACCOUNT_NOUN.test(m[0]) });
  ABBREV_NOUN.lastIndex = 0;
  while ((m = ABBREV_NOUN.exec(s))) out.push({ start: m.index, end: m.index + m[0].length, mode: 'word', strict: true, upperOk: /^u/i.test(m[0]), acctOk: /^u/i.test(m[0]), passOk: !ACCOUNT_NOUN.test(m[0]) });
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
  nouns(s).forEach(n => { const v = valueAfter(s, n) || valueBefore(s, n); if (v) spans.push(v); });
  let m;
  DEFAULT_VALUE.lastIndex = 0;
  while ((m = DEFAULT_VALUE.exec(s))) { CRED_NOUN.lastIndex = 0; if (CRED_NOUN.test(sentenceAround(s, m.index))) spans.push({ start: m.index, end: m.index + m[0].length }); }
  ACCOUNT_TOKEN.lastIndex = 0;
  while ((m = ACCOUNT_TOKEN.exec(s))) if (!ACCOUNT_NOT.has(m[0].toLowerCase())) spans.push({ start: m.index, end: m.index + m[0].length });
  MODEL_NUMBER.lastIndex = 0;
  while ((m = MODEL_NUMBER.exec(s))) { CRED_NOUN.lastIndex = 0; if (CRED_NOUN.test(sentenceAround(s, m.index))) spans.push({ start: m.index, end: m.index + m[0].length }); }
  UNLOCKS_VALUE.lastIndex = 0;
  while ((m = UNLOCKS_VALUE.exec(s))) {
    const start = m.index + m[0].indexOf(m[1]);
    if (MEASURE.test(m[1])) continue;
    const [a, b] = clauseBounds(s, start);
    if (!UNLOCKS_CONTEXT.test(s.slice(a, start) + s.slice(start + m[1].length, b))) continue;
    spans.push({ start, end: start + m[1].length });
  }
  // An account name in front of "user"/"account"/"login": only the name goes, so the sentence keeps
  // the word that explains what was withheld ("[withheld] user session established").
  PRE_ACCOUNT.lastIndex = 0;
  while ((m = PRE_ACCOUNT.exec(s))) {
    if (COMMON_WORDS.has(m[1]) || ACCESS_VALUES.has(m[1]) || PROSE_SUFFIX.test(m[1])) continue;
    const start = m.index + m[0].indexOf(m[1]);
    const [a, b] = clauseBounds(s, start);
    if (s.slice(a, start).trim()) continue;                           // not the first word of its clause
    if (!AUTH_CONTEXT.test(s.slice(m.index + m[0].length, b))) continue;
    spans.push({ start, end: start + m[1].length });
  }
  // The verb-side form, and with it the rest of the clause: a clause that gives one code gives the
  // next in the same breath ("code HP003633 (E3633A) or HP003634 (E3634A)").
  SECURED_WITH.lastIndex = 0;
  while ((m = SECURED_WITH.exec(s))) {
    const end = m.index + m[0].length;
    if (UNIT_AFTER.test(s.slice(end)) || MEASURE.test(m[1])) continue;
    spans.push({ start: m.index, end });
    const [a, b] = clauseBounds(s, m.index);
    const family = (/^[A-Za-z]+/.exec(m[1]) || [''])[0].toUpperCase();
    REPEAT_VALUE.lastIndex = 0;
    let r;
    while (family && (r = REPEAT_VALUE.exec(s.slice(a, b)))) {
      const rs = a + r.index, re = rs + r[0].length;
      if (rs >= m.index && re <= end) continue;
      if (!r[0].toUpperCase().startsWith(family)) continue;           // a different family: not this code
      if (UNIT_AFTER.test(s.slice(re)) || MEASURE.test(r[0])) continue;
      spans.push({ start: rs, end: re });
    }
  }
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
module.exports = { findCredential, findCredentials, hasCredential, redact };
