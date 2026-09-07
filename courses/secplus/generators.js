// SecPlus Academy dynamic question generators. Each returns a fresh, computed question so hash lengths, protocol ports,
// risk math, CVSS bands, control classification, agreement types, and access control models never repeat exactly.
window.FRA = window.FRA || {};
(function () {
  const R = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[R(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = (p) => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  const money = (n) => n.toLocaleString('en-US');

  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- Hash algorithms ----------
  const HASHES = [["MD5", "128 bits", "broken: collisions can be produced on demand"], ["SHA-1", "160 bits", "deprecated: practical collisions have been demonstrated"], ["SHA-256", "256 bits", "the current standard"], ["SHA-512", "512 bits", "a current standard with a longer digest"]];
  function hashes() {
    const [name, len, status] = pick(HASHES);
    const kind = R(3);
    if (kind === 0) return build("u2l3", `What is the digest length produced by ${name}?`, len, shuffle(HASHES.filter(h => h[1] !== len).map(h => h[1])), `${name} produces a ${len} digest. ${HASHES.map(h => `${h[0]} is ${h[1]}`).join(", ")}.`, "hash");
    if (kind === 1) return build("u2l3", `Which hash algorithm produces a ${len} digest?`, name, shuffle(HASHES.filter(h => h[0] !== name).map(h => h[0])), `${name} outputs ${len}. ${status.charAt(0).toUpperCase() + status.slice(1)}.`, "hash");
    const weak = pick(HASHES.slice(0, 2)); const strong = HASHES.slice(2);
    return build("u2l3", `An application signs software releases using ${weak[0]}. Which action should the security team recommend?`, `Migrate to ${pick(strong)[0]} or stronger`, [`Increase the ${weak[0]} key length`, `Add a second ${weak[0]} pass`, `Switch to ${HASHES.find(h => h !== weak && h[1] < "200")?.[0] || "SHA-1"}`, "Continue; hashing algorithms cannot be attacked"], `${weak[0]} is ${weak[2]}, so a collision could let a forged file carry a valid signature. Hashes have no key length to increase; the remedy is a modern algorithm such as SHA-256.`, "hash");
  }

  // ---------- Secure protocol pairs ----------
  const PROTOS = [["Telnet", "TCP 23", "SSH", "TCP 22"], ["HTTP", "TCP 80", "HTTPS", "TCP 443"], ["FTP", "TCP 21", "SFTP", "TCP 22"], ["LDAP", "TCP 389", "LDAPS", "TCP 636"], ["IMAP", "TCP 143", "IMAPS", "TCP 993"], ["POP3", "TCP 110", "POP3S", "TCP 995"], ["SMTP", "TCP 25", "SMTP submission with TLS", "TCP 587"], ["plain DNS", "UDP 53", "DNS over TLS", "TCP 853"]];
  function protocols() {
    const [insecure, iport, secure, sport] = pick(PROTOS);
    const others = shuffle(PROTOS.filter(p => p[2] !== secure));
    if (R(2) === 0) return build("u11l2", `A security audit finds administrators using ${insecure} on ${iport}. Which secure replacement and port should be required?`, `${secure} on ${sport}`, others.map(o => `${o[2]} on ${o[3]}`), `${insecure} sends data in the clear. Its encrypted replacement is ${secure} on ${sport}.`, "proto");
    return build("u11l2", `A firewall must permit only the encrypted alternative to ${insecure}. Which port should be opened?`, sport, shuffle([iport, ...others.map(o => o[3])]), `${insecure} uses ${iport}; the encrypted alternative ${secure} uses ${sport}, which is the port to allow.`, "proto");
  }

  // ---------- Risk math ----------
  function risk() {
    const av = (1 + R(49)) * 10000;                       // 10,000 to 490,000
    const ef = pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.75]);
    const aro = pick([0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 4]);
    const sle = av * ef; const ale = sle * aro;
    const aroText = aro >= 1 ? `${aro} time${aro === 1 ? "" : "s"} per year` : `once every ${Math.round(1 / aro)} years`;
    const r2 = (x) => Math.round(x * 100) / 100;
    // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
    const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
    const kind = R(4);
    if (kind === 0) return build("u14l3", `An asset is valued at ${money(av)}. A single incident would destroy ${Math.round(ef * 100)}% of its value. What is the single loss expectancy?`, money(sle),
      wrong(money(sle), [money(av * (1 - ef)), money(av), money(sle * 2), money(sle / 2), money(sle * 10), money(av * 2)]),
      `SLE = AV x EF = ${money(av)} x ${ef} = ${money(sle)}. Single loss expectancy is the asset value times the fraction lost in one incident.`, "risk");
    if (kind === 1) return build("u14l3", `An asset is valued at ${money(av)} with an exposure factor of ${ef}, and the threat is expected ${aroText}. What is the annualized loss expectancy?`, money(ale),
      wrong(money(ale), [money(sle), money(av * aro), money(sle / aro), money(av), money(ale * 2), money(ale / 2), money(av * 2)]),
      `SLE = ${money(av)} x ${ef} = ${money(sle)}. ARO = ${aro}. ALE = SLE x ARO = ${money(sle)} x ${aro} = ${money(ale)}.`, "risk");
    if (kind === 2) return build("u14l3", `A threat has a single loss expectancy of ${money(sle)} and an annualized loss expectancy of ${money(ale)}. What is the annualized rate of occurrence?`, String(aro),
      wrong(String(aro), [String(r2(1 / aro)), String(r2(aro * 2)), String(r2(aro / 2)), String(r2(aro + 1)), String(r2(aro * 4)), String(r2(aro / 4))]),
      `ALE = SLE x ARO, so ARO = ALE / SLE = ${money(ale)} / ${money(sle)} = ${aro}.`, "risk");
    const cost = Math.round(ale * pick([0.3, 0.5, 0.8, 1.5, 2]));
    const worth = cost < ale;
    return build("u14l4", `A control costing ${money(cost)} per year would eliminate a risk with an annualized loss expectancy of ${money(ale)}. Is the control financially justified?`,
      worth ? `Yes, because ${money(cost)} is less than the ${money(ale)} of expected annual loss it removes` : `No, because ${money(cost)} exceeds the ${money(ale)} of expected annual loss it removes`,
      [worth ? `No, because ${money(cost)} exceeds the ${money(ale)} of expected annual loss it removes` : `Yes, because ${money(cost)} is less than the ${money(ale)} of expected annual loss it removes`, "Yes, because any control that removes a risk is justified", "It cannot be determined without the exposure factor"],
      `Compare the control's annual cost to the ALE it removes. ${money(cost)} versus ${money(ale)}: ${worth ? "the control costs less than the loss it prevents, so it pays for itself" : "the control costs more than the expected loss, so accepting or transferring the risk is more economical"}.`, "risk");
  }

  // ---------- CVSS bands ----------
  const BANDS = [["Low", 0.1, 3.9], ["Medium", 4.0, 6.9], ["High", 7.0, 8.9], ["Critical", 9.0, 10.0]];
  function cvss() {
    const band = pick(BANDS);
    if (R(2) === 0) {
      const score = (Math.round((band[1] + Math.random() * (band[2] - band[1])) * 10) / 10).toFixed(1);
      return build("u10l2", `A vulnerability scanner reports a CVSS base score of ${score}. What is its severity rating?`, band[0], BANDS.filter(b => b !== band).map(b => b[0]), `CVSS ratings: Low 0.1 to 3.9, Medium 4.0 to 6.9, High 7.0 to 8.9, Critical 9.0 to 10.0. A score of ${score} is ${band[0]}.`, "cvss");
    }
    return build("u10l2", `Which CVSS score range is rated ${band[0]}?`, `${band[1].toFixed(1)} to ${band[2].toFixed(1)}`, BANDS.filter(b => b !== band).map(b => `${b[1].toFixed(1)} to ${b[2].toFixed(1)}`), `${band[0]} covers ${band[1].toFixed(1)} to ${band[2].toFixed(1)}. Low 0.1 to 3.9, Medium 4.0 to 6.9, High 7.0 to 8.9, Critical 9.0 to 10.0.`, "cvss");
  }

  // ---------- Control classification ----------
  const CATS = ["Technical", "Managerial", "Operational", "Physical"];
  const TYPES = ["Preventive", "Deterrent", "Detective", "Corrective", "Compensating", "Directive"];
  const CONTROLS = [
    ["a login banner warning that activity is monitored", "Technical", "Deterrent"],
    ["a security guard verifying badges at the entrance", "Operational", "Preventive"],
    ["an acceptable use policy that employees must sign", "Managerial", "Directive"],
    ["a fence around the facility perimeter", "Physical", "Preventive"],
    ["restoring data from backup after a breach", "Operational", "Corrective"],
    ["an intrusion detection system alerting on attacks", "Technical", "Detective"],
    ["extra network monitoring added to a system that cannot be patched", "Technical", "Compensating"],
    ["a door lock on the server room", "Physical", "Preventive"],
    ["reviewing camera footage after a theft", "Physical", "Detective"],
    ["visible security cameras in the parking lot", "Physical", "Deterrent"],
    ["a firewall rule blocking inbound Telnet", "Technical", "Preventive"],
    ["a sign at the door stating that badges must be worn", "Physical", "Directive"],
    ["patching servers after an exploit was used against them", "Technical", "Corrective"],
    ["weekly review of audit logs by the security team", "Operational", "Detective"],
    ["full-disk encryption on laptops", "Technical", "Preventive"],
    ["an annual third-party risk assessment program", "Managerial", null]
  ];
  function controlClass() {
    const [desc, cat, type] = pick(CONTROLS);
    if (type && R(2) === 0) return build("u1l1", `Which control type BEST describes ${desc}?`, type, shuffle(TYPES.filter(t => t !== type)), `${desc.charAt(0).toUpperCase() + desc.slice(1)} is ${type.toLowerCase()}: ${{ Preventive: "it stops the event", Deterrent: "it discourages the attempt without physically stopping it", Detective: "it notices the event", Corrective: "it repairs the damage", Compensating: "it substitutes for a control that cannot be applied", Directive: "it instructs people what to do" }[type]}.`, "ctrl");
    return build("u1l1", `Which control category does ${desc} belong to?`, cat, shuffle(CATS.filter(c => c !== cat)), `${desc.charAt(0).toUpperCase() + desc.slice(1)} is a ${cat.toLowerCase()} control: ${{ Technical: "it is enforced by a system", Managerial: "it is a matter of policy and oversight", Operational: "it is carried out by people as a procedure", Physical: "it protects the facility or hardware" }[cat]}.`, "ctrl");
  }

  // ---------- Agreement types ----------
  const AGREEMENTS = [["SLA", "measurable service levels such as uptime and response time, with remedies for missing them"], ["MSA", "the umbrella contract governing the entire vendor relationship"], ["SOW", "the deliverables, timeline, and price of one specific project"], ["NDA", "confidentiality obligations between the parties"], ["BPA", "how business partners share responsibilities, profits, and decisions"], ["MOU", "a non-binding statement of intent between organizations"]];
  function agreements() {
    const [name, def] = pick(AGREEMENTS);
    if (R(2) === 0) return build("u15l1", `Which agreement defines ${def}?`, name, shuffle(AGREEMENTS.filter(a => a[0] !== name).map(a => a[0])), `The ${name} defines ${def}.`, "agree");
    return build("u15l1", `What does a ${name} define?`, def.charAt(0).toUpperCase() + def.slice(1), shuffle(AGREEMENTS.filter(a => a[0] !== name).map(a => a[1].charAt(0).toUpperCase() + a[1].slice(1))), `A ${name} defines ${def}.`, "agree");
  }

  // ---------- Access control models ----------
  const MODELS = [["labels and clearances enforced by the system that users cannot change", "Mandatory access control"], ["the owner of a resource decides who may access it", "Discretionary access control"], ["permissions attach to job roles and users are assigned to roles", "Role-based access control"], ["access is decided by combining attributes such as department, device, and location", "Attribute-based access control"], ["the same fixed rules apply to everyone, such as firewall access lists", "Rule-based access control"], ["access is permitted only during defined hours", "Time-of-day restrictions"]];
  function accessModel() {
    const [desc, model] = pick(MODELS);
    return build("u12l2", `In which access control model does the following apply: ${desc}?`, model, shuffle(MODELS.filter(m => m[1] !== model).map(m => m[1])), `${model} is the model in which ${desc}.`, "acm");
  }

  FRA.generators = { u2l3: hashes, u11l2: protocols, u14l3: risk, u10l2: cvss, u1l1: controlClass, u15l1: agreements, u12l2: accessModel };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
