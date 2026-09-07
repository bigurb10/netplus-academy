// NetPlus Academy dynamic question generators. Each generator returns a fresh, computed question
// so subnetting, ports, OSI layers, and route selection never repeat exactly.
window.FRA = window.FRA || {};
(function () {
  const R = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[R(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = (p) => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;

  // Build a question object with the correct answer placed among distinct distractors.
  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    // Fallback filler if distractor generation collided
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- IPv4 helpers ----------
  const maskOctets = { 25: 128, 26: 192, 27: 224, 28: 240, 29: 248, 30: 252 };
  const maskOctets3 = { 17: 128, 18: 192, 19: 224, 20: 240, 21: 248, 22: 252, 23: 254 };
  function maskFor(prefix) {
    const m = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) { const bits = Math.max(0, Math.min(8, prefix - i * 8)); m[i] = bits === 0 ? 0 : (256 - Math.pow(2, 8 - bits)); }
    return m.join(".");
  }
  function randomClassCHost() {
    const bases = [[192, 168, R(255)], [10, R(255), R(255)], [172, 16 + R(16), R(255)]];
    const b = pick(bases);
    return { b, host: 1 + R(253) };
  }

  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  function subnetting() {
    const kind = R(6);
    if (kind <= 3) {
      // Fourth-octet problems
      const prefix = pick([25, 26, 27, 28, 29, 30]);
      const block = 256 - maskOctets[prefix];
      const { b, host } = randomClassCHost();
      const net = Math.floor(host / block) * block;
      const bcast = net + block - 1;
      const base = `${b[0]}.${b[1]}.${b[2]}`;
      const addr = `${base}.${host}/${prefix}`;
      const usable = block - 2;
      const netStr = `${base}.${net}`, bcastStr = `${base}.${bcast}`;
      const nextNet = Math.min(255, net + block), prevNet = Math.max(0, net - block);
      if (kind === 0) {
        return build("u4l3", `What is the network address for the host ${addr}?`, netStr,
          wrong(netStr, [`${base}.${nextNet}`, `${base}.${prevNet}`, `${base}.${Math.max(0, net - 1)}`, `${base}.${bcast}`, `${base}.${net + 1}`, `${base}.${host}`, `${base}.${net + block / 2}`, `${base}.0`, `${base}.255`]),
          `Mask ${maskFor(prefix)} gives a block size of ${block}. Multiples of ${block} are the subnet starts; ${host} falls in the block starting at ${net}.`, "sub");
      }
      if (kind === 1) {
        return build("u4l3", `What is the broadcast address of the subnet containing ${addr}?`, bcastStr,
          wrong(bcastStr, [`${base}.${Math.min(255, bcast + 1)}`, `${base}.${net}`, `${base}.${Math.min(255, bcast + block)}`, `${base}.255`, `${base}.${bcast - 1}`, `${base}.${Math.max(0, net - 1)}`, `${base}.${host}`, `${base}.${nextNet}`, `${base}.0`]),
          `Block size is 256 minus ${maskOctets[prefix]}, which is ${block}. The subnet runs ${net} to ${bcast}; the broadcast is one less than the next subnet.`, "sub");
      }
      if (kind === 2) {
        return build("u4l3", `How many usable host addresses are in a /${prefix} subnet?`, String(usable),
          [String(block), String(usable * 2 + 2), String(Math.max(2, usable / 2 - 1 | 0)), String(usable + 1)],
          `A /${prefix} leaves ${32 - prefix} host bits. 2 to the ${32 - prefix} is ${block}, minus the network and broadcast addresses, leaves ${usable}.`, "sub");
      }
      return build("u4l3", `What is the range of usable host addresses in the subnet containing ${addr}?`, `${base}.${net + 1} to ${base}.${bcast - 1}`,
        [`${base}.${net} to ${base}.${bcast}`, `${base}.${net + 1} to ${base}.${bcast}`, `${base}.${net} to ${base}.${bcast - 1}`, `${base}.${net + 2} to ${base}.${bcast - 1}`],
        `Block size ${block}: the network is ${netStr}, the broadcast is ${bcastStr}, and every address between them is usable.`, "sub");
    }
    if (kind === 4) {
      // Hosts needed -> mask
      const hostBits = pick([3, 4, 5, 6, 7, 8]);
      const usable = Math.pow(2, hostBits) - 2;
      const need = usable - R(Math.max(1, Math.floor(usable / 3)));
      const prefix = 32 - hostBits;
      return build("u4l4", `A subnet must support ${need} hosts. Which prefix length is the MOST efficient choice?`, `/${prefix}`,
        [`/${prefix + 1}`, `/${prefix - 1}`, `/${prefix + 2}`, `/${prefix - 2}`],
        `${need} hosts plus network and broadcast needs ${need + 2} addresses. The next power of two is ${Math.pow(2, hostBits)}, so ${hostBits} host bits and a /${prefix} with ${usable} usable hosts. A /${prefix + 1} gives only ${Math.pow(2, hostBits - 1) - 2}.`, "sub");
    }
    // Third-octet problem
    const prefix = pick([18, 19, 20, 21, 22, 23]);
    const block = 256 - maskOctets3[prefix];
    const third = R(255), fourth = 1 + R(253);
    const b1 = pick([10, 172]), b2 = b1 === 10 ? R(255) : 16 + R(16);
    const net = Math.floor(third / block) * block;
    const bcast3 = net + block - 1;
    return build("u4l3", `What is the network address for the host ${b1}.${b2}.${third}.${fourth}/${prefix}?`, `${b1}.${b2}.${net}.0`,
      wrong(`${b1}.${b2}.${net}.0`, [`${b1}.${b2}.${third}.0`, `${b1}.${b2}.${Math.min(255, net + block)}.0`, `${b1}.${b2}.${bcast3}.0`, `${b1}.${b2}.0.0`, `${b1}.${b2}.${third}.${fourth}`, `${b1}.${b2}.${net + block / 2}.0`, `${b1}.0.0.0`]),
      `Mask ${maskFor(prefix)}: the interesting octet is the third, block size ${block}. ${third} falls in the block from ${net} to ${bcast3}, so the network is ${b1}.${b2}.${net}.0 and the broadcast is ${b1}.${b2}.${bcast3}.255.`, "sub");
  }

  function maskConversion() {
    const prefix = 17 + R(14); // 17..30
    const mask = maskFor(prefix);
    if (R(2) === 0) {
      return build("u4l1", `Which subnet mask corresponds to /${prefix}?`, mask,
        [maskFor(prefix + 1), maskFor(prefix - 1), maskFor(prefix + 2), maskFor(Math.max(8, prefix - 3))],
        `/${prefix} means ${prefix} network bits. Fill whole octets with 255, then the remaining bits map to 128, 192, 224, 240, 248, 252, 254 for 1 to 7 bits.`, "mask");
    }
    return build("u4l1", `What is the CIDR prefix length for the mask ${mask}?`, `/${prefix}`,
      [`/${prefix + 1}`, `/${prefix - 1}`, `/${prefix + 3}`, `/${prefix - 2}`],
      `Count the one bits: each 255 is 8, and the partial octet value maps 128=1, 192=2, 224=3, 240=4, 248=5, 252=6, 254=7. That totals ${prefix}.`, "mask");
  }

  // ---------- Ports ----------
  const PORTS = [
    ["FTP control", "TCP 21"], ["SSH", "TCP 22"], ["Telnet", "TCP 23"], ["SMTP", "TCP 25"], ["DNS", "UDP 53"],
    ["DHCP server", "UDP 67"], ["TFTP", "UDP 69"], ["HTTP", "TCP 80"], ["POP3", "TCP 110"], ["NTP", "UDP 123"],
    ["IMAP", "TCP 143"], ["SNMP agent polling", "UDP 161"], ["SNMP traps", "UDP 162"], ["LDAP", "TCP 389"],
    ["HTTPS", "TCP 443"], ["SMB", "TCP 445"], ["Syslog", "UDP 514"], ["SMTPS submission", "TCP 587"],
    ["LDAPS", "TCP 636"], ["IMAPS", "TCP 993"], ["POP3S", "TCP 995"], ["SQL Server", "TCP 1433"],
    ["RDP", "TCP 3389"], ["SIP", "TCP or UDP 5060"], ["IKE", "UDP 500"], ["MySQL", "TCP 3306"]
  ];
  function ports() {
    const [name, port] = pick(PORTS);
    const others = shuffle(PORTS.filter(p => p[1] !== port));
    if (R(2) === 0) {
      return build("u5l2", `Which port and protocol does ${name} use by default?`, port, others.map(o => o[1]),
        `${name} uses ${port}. Distractors: ${others.slice(0, 3).map(o => `${o[0]} is ${o[1]}`).join(", ")}.`, "port");
    }
    return build("u5l2", `A firewall log shows traffic to ${port}. Which service is MOST likely in use?`, name, others.map(o => o[0]),
      `${port} is ${name}. ${others.slice(0, 3).map(o => `${o[0]} uses ${o[1]}`).join("; ")}.`, "port");
  }

  // ---------- OSI ----------
  const OSI = [
    ["a hub repeating electrical signals", 1], ["a fiber transceiver", 1], ["cable connectors and pinouts", 1], ["bits on the wire", 1],
    ["a switch forwarding by MAC address", 2], ["Ethernet frames", 2], ["a duplex mismatch", 2], ["a VLAN tag", 2], ["the frame check sequence", 2],
    ["a router choosing a path by IP address", 3], ["ICMP echo requests", 3], ["the TTL field", 3], ["IP packets", 3], ["a default gateway setting", 3],
    ["TCP port numbers", 4], ["the three-way handshake", 4], ["UDP datagrams", 4], ["flow control with a receive window", 4],
    ["managing the dialog between two applications", 5],
    ["TLS encryption of application data", 6], ["JPEG and ASCII formatting", 6], ["data compression", 6],
    ["HTTP", 7], ["SMTP", 7], ["DNS queries", 7], ["a proxy inspecting URLs", 7], ["SNMP", 7]
  ];
  const LAYERNAMES = { 1: "Layer 1, Physical", 2: "Layer 2, Data Link", 3: "Layer 3, Network", 4: "Layer 4, Transport", 5: "Layer 5, Session", 6: "Layer 6, Presentation", 7: "Layer 7, Application" };
  function osi() {
    const [item, layer] = pick(OSI);
    const t = layer <= 3 ? "u2l1" : "u2l2";
    const others = shuffle([1, 2, 3, 4, 5, 6, 7].filter(l => l !== layer)).slice(0, 3).map(l => LAYERNAMES[l]);
    return build(t, `At which OSI layer would you place ${item}?`, LAYERNAMES[layer], others,
      `${item.charAt(0).toUpperCase() + item.slice(1)} belongs to ${LAYERNAMES[layer]}. Remember: 1 bits and cables, 2 frames and MACs, 3 packets and IPs, 4 ports and segments, 5 sessions, 6 formatting and encryption, 7 the protocols users touch.`, "osi");
  }

  // ---------- Route selection ----------
  const AD = [["a directly connected interface", 0], ["a static route", 1], ["external BGP", 20], ["EIGRP", 90], ["OSPF", 110], ["RIP", 120]];
  function routeSelect() {
    if (R(3) === 0) {
      // longest prefix
      const b = `10.${R(200)}`;
      const third = R(255);
      const host = `${b}.${third}.${1 + R(250)}`;
      const routes = [`${b}.0.0/16`, `${b}.${third}.0/24`, `0.0.0.0/0`];
      return build("u7l2", `A routing table contains ${routes[0]}, ${routes[1]}, and a default route ${routes[2]}. A packet arrives for ${host}. Which route is used?`, routes[1],
        [routes[0], routes[2], "The route with the lowest metric"],
        `Longest prefix match is decided first. ${routes[1]} is the most specific route that contains ${host}, so it wins before administrative distance or metric are considered.`, "route");
    }
    const two = shuffle(AD).slice(0, 2);
    const winner = two[0][1] < two[1][1] ? two[0] : two[1];
    const loser = winner === two[0] ? two[1] : two[0];
    return build("u7l2", `A router learns the same prefix from ${two[0][0]} and from ${two[1][0]}. Which route is installed in the routing table?`, `The route from ${winner[0]}, because its administrative distance of ${winner[1]} is lower`,
      [`The route from ${loser[0]}, because its administrative distance of ${loser[1]} is lower`, `Both routes are installed and load-balanced`, `The route with the higher metric`, `Neither; the router drops the prefix`],
      `Administrative distance ranks the trustworthiness of route sources: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120. Lower wins, so ${winner[0]} (${winner[1]}) beats ${loser[0]} (${loser[1]}).`, "route");
  }

  // ---------- PoE ----------
  function poe() {
    const cases = [[8, "802.3af (PoE)", "up to about 13 watts"], [12, "802.3af (PoE)", "up to about 13 watts"], [20, "802.3at (PoE+)", "up to about 25.5 watts"], [25, "802.3at (PoE+)", "up to about 25.5 watts"], [40, "802.3bt Type 3 (PoE++)", "up to 60 watts"], [55, "802.3bt Type 3 (PoE++)", "up to 60 watts"], [75, "802.3bt Type 4 (PoE++)", "up to 90 watts"]];
    const [w, std, cap] = pick(cases);
    return build("u6l4", `A powered device draws ${w} watts. Which PoE standard is the MINIMUM required on the switch port?`, std,
      ["802.3af (PoE)", "802.3at (PoE+)", "802.3bt Type 3 (PoE++)", "802.3bt Type 4 (PoE++)", "802.1X"].filter(s => s !== std),
      `802.3af delivers about 13 watts to the device, 802.3at about 25.5, 802.3bt Type 3 up to 60, and Type 4 up to 90. ${w} watts needs ${std}, which supplies ${cap}.`, "poe");
  }

  // Map lesson -> generator. Diagnostic and practice exams also sample these.
  FRA.generators = {
    u4l1: maskConversion,
    u4l3: subnetting,
    u4l4: () => (R(2) === 0 ? subnetting() : maskConversion()),
    u5l2: ports,
    u2l1: osi,
    u2l2: osi,
    u7l2: routeSelect,
    u6l4: poe
  };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
