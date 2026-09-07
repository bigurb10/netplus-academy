// APlus Academy Core 1 dynamic question generators. Each returns a fresh, computed question so port numbers,
// wireless standards, IP addressing, DNS records, cable categories, interface speeds, RAID math, and printer
// symptoms never repeat exactly.
window.FRA = window.FRA || {};
(function () {
  const R = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[R(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = (p) => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  const others = (rows, idx, correct) => shuffle(rows.map(r => r[idx]).filter(v => v && v !== correct)).filter((v, i, a) => a.indexOf(v) === i);

  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- Ports and protocols (u2l2) ----------
  const PORTS = [
    ["20 and 21", "FTP", "TCP", "file transfer in clear text"],
    ["22", "SSH", "TCP", "an encrypted remote shell, also carrying SFTP and SCP"],
    ["23", "Telnet", "TCP", "a clear-text remote terminal"],
    ["25", "SMTP", "TCP", "sending mail between servers"],
    ["53", "DNS", "UDP, with TCP for large answers", "name-to-address lookups"],
    ["67 and 68", "DHCP", "UDP", "automatic IP addressing"],
    ["80", "HTTP", "TCP", "unencrypted web traffic"],
    ["110", "POP3", "TCP", "downloading mail to one device"],
    ["137 to 139", "NetBIOS", "UDP and TCP", "legacy Windows naming and file sharing"],
    ["143", "IMAP", "TCP", "mail kept on the server and synced across devices"],
    ["161 and 162", "SNMP", "UDP", "device monitoring and traps"],
    ["389", "LDAP", "TCP", "directory queries"],
    ["443", "HTTPS", "TCP", "web traffic over TLS"],
    ["445", "SMB", "TCP", "Windows file and printer sharing"],
    ["3389", "RDP", "TCP", "Remote Desktop"],
    ["123", "NTP", "UDP", "time synchronization"],
    ["514", "syslog", "UDP", "log collection"],
    ["5900", "VNC", "TCP", "cross-platform screen sharing"]
  ];
  const SECURE = [["Telnet on 23", "SSH on 22"], ["HTTP on 80", "HTTPS on 443"], ["POP3 on 110", "POP3 over TLS on 995"], ["IMAP on 143", "IMAP over TLS on 993"], ["LDAP on 389", "LDAPS on 636"], ["FTP on 21", "SFTP over SSH on 22"]];
  function ports() {
    const kind = R(4);
    if (kind === 0) {
      const [port, proto, , use] = pick(PORTS);
      return build("u2l2", `A firewall rule must allow ${use}. Which port number does that service use?`, port, others(PORTS, 0, port),
        `${proto} uses port ${port}. Learn the well-known ports as pairs: 20/21 FTP, 67/68 DHCP, 110 and 143 for mail in, 25 for mail out, 80 and 443 for web, 22 and 23 for shells, 3389 RDP, 445 SMB.`, "port");
    }
    if (kind === 1) {
      const [port, proto, , use] = pick(PORTS);
      return build("u2l2", `A packet capture shows traffic on port ${port}. Which protocol is this?`, proto, others(PORTS, 1, proto),
        `Port ${port} is ${proto}, used for ${use}.`, "port");
    }
    if (kind === 2) {
      const rows = PORTS.filter(r => r[2] === "TCP" || r[2] === "UDP");
      const [port, proto, tp, use] = pick(rows);
      return build("u2l2", `Which transport protocol does ${proto} (port ${port}) use?`, tp, ["TCP", "UDP", "ICMP", "Both TCP and UDP equally"].filter(v => v !== tp),
        `${proto} uses ${tp}. ${tp === "TCP" ? "TCP is connection-oriented and reliable, which suits web, mail, file transfer, and remote desktop." : "UDP is connectionless and fast, which suits DNS, DHCP, NTP, SNMP, syslog, streaming, and voice."}`, "port");
    }
    const [insecure, secure] = pick(SECURE);
    return build("u2l2", `A security audit flags ${insecure} as clear text. Which protocol and port should replace it?`, secure, shuffle(SECURE.map(s => s[1]).filter(v => v !== secure)),
      `${insecure} sends data unencrypted. Its encrypted replacement is ${secure}. Secure pairs: 22 for 23, 443 for 80, 993 for 143, 995 for 110, 636 for 389.`, "port");
  }

  // ---------- Wireless standards (u2l3) ----------
  const WIFI = [
    ["802.11a", "", "5 GHz only", "54 Mb/s"],
    ["802.11b", "", "2.4 GHz only", "11 Mb/s"],
    ["802.11g", "", "2.4 GHz only", "54 Mb/s"],
    ["802.11n", "Wi-Fi 4", "2.4 and 5 GHz", "600 Mb/s"],
    ["802.11ac", "Wi-Fi 5", "5 GHz only", "about 6.9 Gb/s"],
    ["802.11ax", "Wi-Fi 6", "2.4 and 5 GHz (6 GHz with Wi-Fi 6E)", "about 9.6 Gb/s"],
    ["802.11be", "Wi-Fi 7", "2.4, 5, and 6 GHz", "about 46 Gb/s"]
  ];
  const BANDS = [
    ["2.4 GHz", "the longest range and best penetration through walls, but only channels 1, 6, and 11 do not overlap and it is crowded"],
    ["5 GHz", "shorter range with many non-overlapping channels, less interference, and wider channel widths"],
    ["6 GHz", "the newest and cleanest spectrum with the shortest range, available only to Wi-Fi 6E and Wi-Fi 7 devices"]
  ];
  function wireless() {
    const kind = R(5);
    if (kind === 0) {
      const [std, , band] = pick(WIFI);
      return build("u2l3", `On which frequency band or bands does ${std} operate?`, band, others(WIFI, 2, band),
        `${std} operates on ${band}. Remember that 802.11ac (Wi-Fi 5) is 5 GHz only, and 6 GHz arrived with Wi-Fi 6E.`, "wifi");
    }
    if (kind === 1) {
      const [std, , , speed] = pick(WIFI);
      return build("u2l3", `What is the maximum theoretical data rate of ${std}?`, speed, others(WIFI, 3, speed),
        `${std} tops out at ${speed}. Real throughput is a fraction of the headline rate.`, "wifi");
    }
    if (kind === 2) {
      const named = WIFI.filter(r => r[1]);
      const [std, name] = pick(named);
      return build("u2l3", `Which IEEE standard is marketed as ${name}?`, std, others(named, 0, std),
        `${name} is the marketing name for ${std}. Wi-Fi 4 is n, Wi-Fi 5 is ac, Wi-Fi 6 is ax, Wi-Fi 7 is be.`, "wifi");
    }
    if (kind === 3) {
      const [band, trait] = pick(BANDS);
      return build("u2l3", `Which band offers ${trait}?`, band, [...others(BANDS, 0, band), "900 MHz"],
        `That describes ${band}. Lower frequencies travel farther and through walls; higher frequencies carry more data with less crowding.`, "wifi");
    }
    return build("u2l3", `An office has three 2.4 GHz access points. Which channel set avoids overlap between them?`, "1, 6, and 11", ["1, 5, and 9", "1, 2, and 3", "36, 40, and 44"],
      `In the 2.4 GHz band only channels 1, 6, and 11 do not overlap at 20 MHz width. Channels 36 and above belong to the 5 GHz band.`, "wifi");
  }

  // ---------- IP addressing (u3l1) ----------
  const privateIp = () => pick([`10.${R(256)}.${R(256)}.${1 + R(254)}`, `172.${16 + R(16)}.${R(256)}.${1 + R(254)}`, `192.168.${R(256)}.${1 + R(254)}`]);
  const publicIp = () => pick([`172.${32 + R(30)}.${R(256)}.${1 + R(254)}`, `192.169.${R(256)}.${1 + R(254)}`, `11.${R(256)}.${R(256)}.${1 + R(254)}`, `172.${1 + R(15)}.${R(256)}.${1 + R(254)}`, `203.0.113.${1 + R(254)}`, `8.8.${R(256)}.${1 + R(254)}`, `198.51.100.${1 + R(254)}`]);
  function addressing() {
    const kind = R(4);
    if (kind === 0) {
      const wantPrivate = R(2) === 0;
      const correct = wantPrivate ? privateIp() : publicIp();
      const ds = []; while (ds.length < 3) { const d = wantPrivate ? publicIp() : privateIp(); if (!ds.includes(d) && d !== correct) ds.push(d); }
      return build("u3l1", `Which of these IPv4 addresses is ${wantPrivate ? "a private address that will not be routed on the internet" : "a public, internet-routable address"}?`, correct, ds,
        `The private ranges are 10.0.0.0/8, 172.16.0.0 to 172.31.255.255, and 192.168.0.0/16. ${correct} is ${wantPrivate ? "inside one of them" : "outside all of them"}; watch the lookalikes 172.32 and 192.169, which are public, and 172.15, which is also public.`, "ip");
    }
    if (kind === 1) {
      const a = pick([10, 172, 192]); const b = a === 10 ? R(256) : a === 172 ? 16 + R(16) : 168; const c1 = R(254); const h1 = 2 + R(200);
      const mask24 = R(3) !== 0; const mask = mask24 ? "255.255.255.0" : "255.255.0.0";
      const ip1 = `${a}.${b}.${c1}.${h1}`;
      const same = R(2) === 0;
      let ip2;
      if (same) ip2 = mask24 ? `${a}.${b}.${c1}.${(h1 + 60) % 250 + 1}` : `${a}.${b}.${(c1 + 9) % 250 + 1}.${h1}`;
      else ip2 = mask24 ? `${a}.${b}.${(c1 + 9) % 250 + 1}.${h1}` : `${a}.${(b + 13) % 250 + 1}.${c1}.${h1}`;
      const correct = same ? "The same subnet; they communicate directly through the switch" : "Different subnets; traffic between them must pass through the default gateway";
      return build("u3l1", `A PC at ${ip1} and a printer at ${ip2} both use subnet mask ${mask}. How do they communicate?`, correct,
        [same ? "Different subnets; traffic between them must pass through the default gateway" : "The same subnet; they communicate directly through the switch", "The same subnet, but only through the router", "They cannot communicate at all"],
        `With mask ${mask} the ${mask24 ? "first three octets" : "first two octets"} are the network portion. ${ip1} and ${ip2} ${same ? "share" : "differ in"} that portion, so they are on ${same ? "the same subnet" : "different subnets"}.`, "ip");
    }
    if (kind === 2) {
      const ip = `169.254.${R(256)}.${1 + R(254)}`;
      return build("u3l1", `A laptop reports the address ${ip} and cannot reach the internet. What does this address indicate?`, "No DHCP server answered, so the client assigned itself an APIPA address",
        ["The router assigned a valid lease from its DHCP scope", "The laptop is using the loopback address to test its own stack", "The laptop has a public address and a firewall is blocking it"],
        `169.254.x.x is the Automatic Private IP Addressing range. The client asked DHCP, received no reply, and gave itself an address that only works with other APIPA devices on the same segment. Check the link, the switch port, and the DHCP server.`, "ip");
    }
    const a = pick([10, 172, 192]); const b = a === 10 ? R(256) : a === 172 ? 16 + R(16) : 168; const c = R(254); const h = 10 + R(200);
    const host = `${a}.${b}.${c}.${h}`; const good = `${a}.${b}.${c}.1`;
    const bad = [`${a}.${b}.${(c + 5) % 254 + 1}.1`, `${a === 10 ? 192 : 10}.${a === 10 ? 168 : b}.${c}.1`, `${a}.${(b + 7) % 250 + 1}.${c}.1`];
    return build("u3l1", `A workstation is configured with ${host} and mask 255.255.255.0. Which address could be its default gateway?`, good, bad,
      `The gateway must be inside the host's own subnet, ${a}.${b}.${c}.0/24, so ${good} qualifies. The other addresses differ in the network portion and would be unreachable.`, "ip");
  }

  // ---------- DNS records and email authentication (u3l3) ----------
  const RECORDS = [
    ["A", "maps a hostname to an IPv4 address", "point www.example.com at the web server's IPv4 address"],
    ["AAAA", "maps a hostname to an IPv6 address", "point a hostname at a server's IPv6 address"],
    ["CNAME", "makes one hostname an alias of another", "make shop.example.com follow the hosting provider's own hostname automatically"],
    ["MX", "names the mail servers for a domain, with a priority", "tell other mail servers where to deliver mail addressed to the domain"],
    ["TXT", "stores free-form text used for ownership verification and email authentication", "prove ownership of the domain to a cloud service that supplied a verification string"],
    ["NS", "names the domain's authoritative name servers", "delegate the domain to a new DNS hosting provider"],
    ["PTR", "maps an IP address back to a hostname for reverse lookups", "let receiving mail servers confirm that the sending address maps back to the mail server's name"]
  ];
  const EMAIL = [
    ["SPF", "lists which servers are allowed to send mail for the domain"],
    ["DKIM", "adds a cryptographic signature that proves the message came from the domain and was not altered"],
    ["DMARC", "tells receiving servers what to do when SPF or DKIM fails (none, quarantine, or reject) and where to send reports"]
  ];
  function dns() {
    const kind = R(4);
    if (kind === 0) {
      const [rec, , need] = pick(RECORDS);
      return build("u3l3", `A technician needs to ${need}. Which DNS record type should be created?`, rec, others(RECORDS, 0, rec),
        `A${/^[AEIOU]/.test(rec) ? "n" : ""} ${rec} record ${RECORDS.find(r => r[0] === rec)[1]}.`, "dns");
    }
    if (kind === 1) {
      const [rec, fn] = pick(RECORDS);
      return build("u3l3", `What does a DNS ${rec} record do?`, fn.charAt(0).toUpperCase() + fn.slice(1), others(RECORDS, 1, fn).map(v => v.charAt(0).toUpperCase() + v.slice(1)),
        `The ${rec} record ${fn}. A is IPv4, AAAA is IPv6, CNAME is an alias, MX is mail, TXT is text, NS is name servers, PTR is reverse.`, "dns");
    }
    if (kind === 2) {
      const [mech, role] = pick(EMAIL);
      return build("u3l3", `Which email authentication mechanism ${role}?`, mech, [...EMAIL.map(e => e[0]).filter(v => v !== mech), "MX"],
        `${mech} ${role}. All three (SPF, DKIM, DMARC) are published as TXT records in the sending domain's DNS.`, "dns");
    }
    const [mech, role] = pick(EMAIL);
    return build("u3l3", `What is the role of ${mech} in protecting a domain's email?`, `It ${role}`, EMAIL.filter(e => e[0] !== mech).map(e => `It ${e[1]}`).concat(["It encrypts the message body end to end"]),
      `${mech} ${role}. SPF says who may send, DKIM signs, DMARC sets the policy on failure.`, "dns");
  }

  // ---------- Cables (u4l1) ----------
  const CATS = [["Cat 5e", "1 Gb/s", "100 MHz", 100], ["Cat 6", "10 Gb/s to 55 m (1 Gb/s to 100 m)", "250 MHz", 100], ["Cat 6a", "10 Gb/s", "500 MHz", 100], ["Cat 7", "10 Gb/s, shielded", "600 MHz", 100], ["Cat 8", "25 or 40 Gb/s", "2,000 MHz", 30]];
  const T568B = ["white-orange", "orange", "white-green", "blue", "white-blue", "green", "white-brown", "brown"];
  const T568A = ["white-green", "green", "white-orange", "blue", "white-blue", "orange", "white-brown", "brown"];
  const FIBERCON = [["ST", "a bayonet twist-lock connector"], ["SC", "a square push-pull connector"], ["LC", "a small clip-in connector, the most common on modern transceivers"]];
  function cables() {
    const kind = R(5);
    if (kind === 0) {
      const cases = [["10 Gb/s", 70 + R(30), "Cat 6a", "Cat 6 handles 10 Gb/s only to about 55 m, so a longer run needs Cat 6a; Cat 5e tops out at 1 Gb/s."], ["10 Gb/s", 20 + R(30), "Cat 6", "Cat 6 supports 10 Gb/s for runs up to 55 m, so it is the lowest category that works; Cat 5e cannot do 10 Gb/s."], ["1 Gb/s", 30 + R(70), "Cat 5e", "Cat 5e is the minimum category for gigabit Ethernet up to 100 m."], ["40 Gb/s", 10 + R(20), "Cat 8", "Only Cat 8 reaches 25 or 40 Gb/s, and only to 30 m, which suits data center racks."]];
      const [speed, len, cat, why] = pick(cases);
      return build("u4l1", `A run of ${len} meters must carry ${speed} Ethernet. Which is the lowest cable category that meets the requirement?`, cat, others(CATS, 0, cat),
        `${why}`, "cable");
    }
    if (kind === 1) {
      const [cat, , bw] = pick(CATS);
      return build("u4l1", `What bandwidth rating does ${cat} cable carry?`, bw, others(CATS, 2, bw),
        `${cat} is rated to ${bw}. Category bandwidth: 5e 100 MHz, 6 250 MHz, 6a 500 MHz, 7 600 MHz, 8 2,000 MHz.`, "cable");
    }
    if (kind === 2) {
      const useB = R(2) === 0; const order = useB ? T568B : T568A; const pin = 1 + R(8);
      return build("u4l1", `In the ${useB ? "T568B" : "T568A"} wiring standard, which wire color is on pin ${pin}?`, order[pin - 1], shuffle(order.filter((c, i) => i !== pin - 1)).slice(0, 3),
        `${useB ? "T568B" : "T568A"} order is ${order.join(", ")}. Only the orange and green pairs swap between the two standards; A on one end and B on the other makes a crossover cable.`, "cable");
    }
    if (kind === 3) {
      const far = R(2) === 0; const dist = far ? `${2 + R(8)} kilometers` : `${100 + R(200)} meters inside a building`;
      const correct = far ? "Single-mode fiber with a laser source" : "Multimode fiber with an LED or VCSEL source";
      return build("u4l1", `A link must span ${dist}. Which fiber type and light source suit it?`, correct,
        [far ? "Multimode fiber with an LED or VCSEL source" : "Single-mode fiber with a laser source", "Cat 6a copper with RJ45 plugs", "RG-6 coaxial with F-type connectors"],
        `${far ? "Single-mode fiber has a 9 micron core and a laser, reaching kilometers." : "Multimode fiber has a 50 or 62.5 micron core with an LED or VCSEL and reaches hundreds of meters, which is enough inside a building and cheaper."} Copper Ethernet stops at 100 m.`, "cable");
    }
    const [con, desc] = pick(FIBERCON);
    return build("u4l1", `Which fiber connector is ${desc}?`, con, [...FIBERCON.map(f => f[0]).filter(v => v !== con), "F-type"],
      `${con} is ${desc}. ST twists, SC pushes, LC clips; F-type is the coax connector.`, "cable");
  }

  // ---------- Interfaces (u4l2) ----------
  const USB = [["USB 2.0", "480 Mb/s"], ["USB 3.0 (3.2 Gen 1)", "5 Gb/s"], ["USB 3.1 Gen 2", "10 Gb/s"], ["USB 3.2 Gen 2x2", "20 Gb/s"], ["USB4", "40 Gb/s"], ["Thunderbolt 3 or 4", "40 Gb/s"], ["Thunderbolt 5", "80 Gb/s"]];
  const VIDEO = [["VGA", "the only common analog video connector, a 15-pin plug with no audio"], ["DVI", "a digital or analog connector with single-link and dual-link versions and no audio"], ["HDMI", "a 19-pin digital connector carrying video and audio, with CEC remote control"], ["DisplayPort", "a 20-pin latching digital connector with audio that can daisy chain monitors"], ["USB-C with DisplayPort alternate mode", "one reversible cable carrying video, data, and power"]];
  const SATA = [["SATA I", "1.5 Gb/s"], ["SATA II", "3 Gb/s"], ["SATA III", "6 Gb/s"]];
  function interfaces() {
    const kind = R(5);
    if (kind === 0) {
      const [name, speed] = pick(USB);
      return build("u4l2", `What is the maximum data rate of ${name}?`, speed, others(USB, 1, speed),
        `${name} runs at ${speed}. USB 2.0 480 Mb/s, USB 3.0 5 Gb/s, USB 3.1 Gen 2 10 Gb/s, USB 3.2 Gen 2x2 20 Gb/s, USB4 and Thunderbolt 3 and 4 at 40 Gb/s, Thunderbolt 5 at 80 Gb/s.`, "iface");
    }
    if (kind === 1) {
      const rows = USB.filter(r => r[1] !== "40 Gb/s");
      const [name, speed] = pick(rows);
      return build("u4l2", `Which interface has a maximum rate of ${speed}?`, name, others(rows, 0, name),
        `${speed} is the maximum rate of ${name}. USB 2.0 480 Mb/s, USB 3.0 5 Gb/s, USB 3.1 Gen 2 10 Gb/s, USB 3.2 Gen 2x2 20 Gb/s, Thunderbolt 5 80 Gb/s.`, "iface");
    }
    if (kind === 2) {
      const [con, desc] = pick(VIDEO);
      return build("u4l2", `Which video interface is ${desc}?`, con, others(VIDEO, 0, con),
        `${con} is ${desc}. VGA is the analog one; DVI carries no audio; HDMI and DisplayPort carry audio; DisplayPort daisy chains.`, "iface");
    }
    if (kind === 3) {
      const [gen, speed] = pick(SATA);
      return build("u4l2", `What is the interface speed of ${gen}?`, speed, [...others(SATA, 1, speed), "12 Gb/s"],
        `${gen} runs at ${speed}. SATA I 1.5, II 3, III 6 Gb/s; a SATA SSD is capped near 550 MB/s by SATA III. 12 Gb/s is SAS.`, "iface");
    }
    const q = pick([["How many pins does a SATA data cable have?", "7", ["15", "4", "24"], "SATA data cables have 7 pins; the SATA power connector has 15; Molex has 4; the ATX main power connector has 24."], ["How many pins does a SATA power connector have?", "15", ["7", "4", "8"], "SATA power connectors have 15 pins; the data cable has 7; Molex has 4."], ["What is the maximum length of an internal SATA data cable?", "1 meter", ["2 meters", "5 meters", "3 meters"], "Internal SATA data cables run up to 1 m; eSATA cables reach 2 m; USB 2.0 cables 5 m; USB 3.0 3 m."], ["Which connector is used for a serial console connection to a network switch?", "DB9 (RS-232)", ["RJ11", "Molex", "DVI-D"], "Console ports use RS-232 serial over a DB9 connector, usually through a USB-to-serial adapter today."]]);
    return build("u4l2", q[0], q[1], q[2], q[3], "iface");
  }

  // ---------- RAID (u5l3) ----------
  const LEVELS = [["RAID 0", 2, 0, (n, s) => n * s], ["RAID 1", 2, 1, (n, s) => s], ["RAID 5", 3, 1, (n, s) => (n - 1) * s], ["RAID 6", 4, 2, (n, s) => (n - 2) * s], ["RAID 10", 4, 1, (n, s) => (n / 2) * s]];
  function raid() {
    const kind = R(3);
    if (kind === 0) {
      const lv = pick(LEVELS); const [name, min, , cap] = lv;
      let n = name === "RAID 1" ? 2 : name === "RAID 10" ? pick([4, 6, 8]) : min + R(4); const s = pick([1, 2, 4, 8]);
      const correct = `${cap(n, s)} TB`;
      const ds = LEVELS.filter(l => l[0] !== name).map(l => `${l[3](n, s)} TB`).concat([`${n * s * 2} TB`, `${Math.max(1, n * s - s)} TB`]);
      return build("u5l3", `A server has ${n} drives of ${s} TB each configured as ${name}. What is the usable capacity?`, correct, wrong(correct, ds),
        `${name}: ${name === "RAID 0" ? "striping uses every drive, n x s" : name === "RAID 1" ? "mirroring keeps one copy, so half the total" : name === "RAID 5" ? "one drive's worth goes to parity, (n minus 1) x s" : name === "RAID 6" ? "two drives' worth go to parity, (n minus 2) x s" : "mirrored pairs are striped, so half the total"}: ${correct} from ${n} x ${s} TB.`, "raid");
    }
    if (kind === 1) {
      const lv = pick(LEVELS); const [name, , tol] = lv;
      const correct = name === "RAID 10" ? "One drive per mirrored pair" : tol === 0 ? "None; any drive failure loses the array" : tol === 1 ? "One drive" : "Two drives";
      return build("u5l3", `How many drive failures can ${name} survive without data loss?`, correct, ["None; any drive failure loses the array", "One drive", "Two drives", "One drive per mirrored pair"].filter(v => v !== correct),
        `${name} survives: ${correct.toLowerCase()}. RAID 0 has no redundancy; RAID 1 and 5 lose one; RAID 6 loses two; RAID 10 loses one per mirror.`, "raid");
    }
    const lv = pick(LEVELS); const [name, min] = lv;
    return build("u5l3", `What is the minimum number of drives required for ${name}?`, `${min}`, ["2", "3", "4", "5", "6"].filter(v => v !== `${min}`),
      `${name} needs at least ${min} drives. RAID 0 and 1 need 2, RAID 5 needs 3, RAID 6 and RAID 10 need 4.`, "raid");
  }

  // ---------- Printer symptoms (u9l2) ----------
  const PRINT = [
    ["toner that smears off the page when touched", "The fuser is not reaching temperature or the paper type setting is wrong", "Check the paper type setting, then replace the fuser or maintenance kit"],
    ["a faint duplicate of the previous page lower on each sheet (ghosting)", "The drum is not being cleaned or discharged: a worn cleaning blade, dead erase lamp, or worn drum", "Replace the drum unit or cartridge"],
    ["a thin vertical line down every page", "A scratched or dirty imaging drum, or a dirty laser scanner window", "Clean the scanner window; replace the drum or cartridge"],
    ["random specks of toner across the pages", "Loose toner inside the printer or a leaking cartridge", "Clean the paper path with a toner vacuum and replace the leaking cartridge"],
    ["uniformly faded output across the whole page", "Low toner, economy or draft mode, or a worn transfer roller", "Check the toner level and the quality setting, then the transfer roller"],
    ["pages of random characters and symbols", "The wrong driver or printer language, or a corrupted print job", "Cancel the job, clear the queue, and install the correct driver"],
    ["pages printing in landscape when portrait was expected", "An orientation setting in the driver or application, or a tray paper size mismatch", "Correct the driver and application orientation settings"],
    ["missing horizontal lines through inkjet text", "Clogged print head nozzles", "Run the print head cleaning routine"],
    ["colors misregistered on an inkjet print", "Print heads out of alignment", "Run the alignment routine"],
    ["a gray background over the entire laser page", "A worn drum or charge roller, or high humidity", "Replace the drum or charge roller"]
  ];
  function printer() {
    const [sym, cause, act] = pick(PRINT);
    if (R(2) === 0) return build("u9l2", `Users report a printer producing ${sym}. What is the MOST likely cause?`, cause, shuffle(PRINT.filter(p => p[1] !== cause).map(p => p[1])).slice(0, 3),
      `${sym.charAt(0).toUpperCase() + sym.slice(1)} points to this: ${cause.toLowerCase()}. First action: ${act.toLowerCase()}.`, "print");
    return build("u9l2", `A printer is producing ${sym}. What should the technician do FIRST?`, act, shuffle(PRINT.filter(p => p[2] !== act).map(p => p[2])).slice(0, 3),
      `The cause of ${sym} is usually this: ${cause.toLowerCase()}. So the first action is: ${act.toLowerCase()}.`, "print");
  }

  FRA.generators = { u2l2: ports, u2l3: wireless, u3l1: addressing, u3l3: dns, u4l1: cables, u4l2: interfaces, u5l3: raid, u9l2: printer };
  FRA.generate = function (lessonId) { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
