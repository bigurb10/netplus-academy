// NetPlus Academy performance-based questions. Original scenarios in the shape of the exam's PBQs:
// drag into order, match, pick every line that applies, fill a configuration, type a command.
// Graded task by task by engine/pbq.js; three carry seo: true for the public PBQ page.
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};

FRA.pbqs["net-subnet-plan"] = {
  id: "net-subnet-plan", title: "Subnet the clinic's new floor", domain: 1, lesson: "u4l3", seo: true,
  scenario: {
    text: "A clinic is opening a new floor with four departments. The network team has the block {{192.168.10.0/24}} and must split it into four equal subnets, one per department. Every department needs at least 50 host addresses."
  },
  tasks: [
    { id: "plan", kind: "form", prompt: "Fill in the subnet plan. The second subnet is the one that starts right after the first.", fields: [
      { id: "prefix", label: "Prefix length (or mask) for each subnet", expect: ["/26", "255.255.255.192"], normalize: "cidr" },
      { id: "hosts", label: "Usable hosts per subnet", expect: ["62"], normalize: "number" },
      { id: "net2", label: "Network address of the second subnet", expect: ["192.168.10.64"], normalize: "ip" },
      { id: "bcast2", label: "Broadcast address of the second subnet", expect: ["192.168.10.127"], normalize: "ip" },
      { id: "first2", label: "First usable host in the second subnet", expect: ["192.168.10.65"], normalize: "ip" }
    ] },
    { id: "usable", kind: "multiselect", prompt: "Pick every address a host in the second subnet can use.", options: ["192.168.10.64", "192.168.10.65", "192.168.10.100", "192.168.10.126", "192.168.10.127", "192.168.10.128"], expect: [1, 2, 3] },
    { id: "fit", kind: "choice", prompt: "A department is assigned the fourth subnet, {{192.168.10.192/26}}. Which headcount fits in it?", options: ["A department with 60 hosts", "A department with 70 hosts", "A department with 64 hosts", "A department with 126 hosts"], expect: 0 }
  ],
  why: {
    plan: "Four equal subnets borrow 2 bits from the /24, giving /26, mask 255.255.255.192. The block size is 256 minus 192, which is 64, so the subnets start at .0, .64, .128, and .192. The second runs from network .64 to broadcast .127 (one less than the next multiple), its first usable host is .65, and each holds 64 minus 2, which is 62 usable hosts.",
    usable: "The second subnet's usable hosts run from .65 to .126, everything between its network address and its broadcast. The network .64 and the broadcast .127 can never be given to a host, and .128 is the network address of the third subnet.",
    fit: "A /26 has 6 host bits: 2 to the 6th is 64, minus 2 for the network and broadcast addresses, leaves 62 usable hosts. Sixty hosts fit; 64, 70, and 126 do not, because the network and broadcast addresses can never be given to a host."
  }
};

FRA.pbqs["net-cables-ports"] = {
  id: "net-cables-ports", title: "Pick the cable for each run", domain: 1, lesson: "u3l1", also: "u3l2", seo: false,
  scenario: {
    text: "A branch office is being cabled. The installer has a list of five runs and must choose the medium for each one, plus the patch cords for the server rack."
  },
  tasks: [
    { id: "runs", kind: "match", prompt: "Match each run to the cable it needs.", left: [
      "10 GbE between two racks, 80 m",
      "10 GbE between two buildings, 2 km",
      "A desk drop at 1 GbE, 40 m",
      "The feed into the cable modem",
      "10 GbE from a server to the switch in the same rack, 3 m"
    ], right: [
      "Cat 6A twisted pair",
      "Single-mode fiber",
      "Cat 5e or Cat 6 twisted pair",
      "RG-6 coaxial with an F-type connector",
      "Direct attach cable (twinaxial)",
      "Cat 3 twisted pair"
    ], expect: [0, 1, 2, 3, 4] },
    { id: "lc", kind: "choice", prompt: "The multimode fiber patch cords in the rack plug into modern transceivers. Which connector do they most likely use?", options: ["LC", "ST", "RJ45", "F-type"], expect: 0 },
    { id: "far", kind: "multiselect", prompt: "Pick every run that is too long for twisted-pair copper.", options: [
      "10 GbE between two racks, 80 m",
      "10 GbE between two buildings, 2 km",
      "A desk drop at 1 GbE, 40 m",
      "10 GbE from a server to the switch in the same rack, 3 m"
    ], expect: [1] }
  ],
  why: {
    runs: "Cat 6A carries 10 Gbps the full 100 meters, while Cat 6 manages 10 Gbps only to 55 meters, so the 80 m rack-to-rack run needs Cat 6A. Two buildings 2 km apart is always single-mode fiber; a 1 GbE desk drop is fine on Cat 5e or Cat 6; the cable modem takes RG-6 coax on an F-type connector; and a few meters inside one rack is the job of a direct attach cable. Cat 3 is older and slower than Cat 5e and fits none of these runs.",
    lc: "LC is the small, square, snap-in connector and the most common one on modern transceivers. ST is a legacy round bayonet connector, RJ45 is for twisted-pair copper, and F-type is the coax connector.",
    far: "All twisted-pair Ethernet stops at 100 meters (328 feet) per run, patch cords included. Only the 2 km run is past that limit, and distance that long calls for single-mode fiber; 80 m, 40 m, and 3 m are all within copper's reach."
  }
};

FRA.pbqs["net-troubleshoot-order"] = {
  id: "net-troubleshoot-order", title: "A user cannot reach the file server", domain: 5, lesson: "u9l1", seo: true,
  scenario: {
    text: "A ticket comes in: a user in accounting cannot open the shared drive on the file server. You are the technician assigned. Work the case the way the troubleshooting methodology lays it out."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the steps you take on this case in the order of the methodology.", items: [
      "Identify the problem: question the user, read the ticket, and find out what changed",
      "Establish a theory of probable cause",
      "Test the theory to determine the cause",
      "Establish a plan of action and identify its potential effects",
      "Implement the solution or escalate",
      "Verify full system functionality and implement preventive measures",
      "Document findings, actions, outcomes, and lessons learned"
    ], expect: [0, 1, 2, 3, 4, 5, 6] },
    { id: "ask", kind: "choice", prompt: "The user says the drive worked fine yesterday. What do you ask first?", options: ["What changed since yesterday?", "Can I restart the file server now?", "Can I replace your network cable?", "Should I escalate this to the server team?"], expect: 0 },
    { id: "doc", kind: "multiselect", prompt: "Pick every item that belongs in the ticket's documentation when you close it.", options: [
      "The cause you confirmed",
      "The fix you applied",
      "The time it took to resolve",
      "The user's password, so the next technician can sign in as them",
      "Lessons learned for the next similar case"
    ], expect: [0, 1, 2, 4] }
  ],
  why: {
    steps: "The seven steps run identify, theorize, test, plan, implement or escalate, verify and prevent, then document. After a theory is confirmed the next step is the plan of action, never straight to the fix, and you verify before you document.",
    ask: "Identifying the problem includes determining whether anything changed, because most outages follow a change. Restarting a server, swapping a cable, or escalating all jump ahead before you know the cause.",
    doc: "Documentation records findings, actions, outcomes, and lessons learned: the cause, the fix, how long it took, and what to do next time. A user's password never goes in a ticket; it is a credential, not a finding."
  }
};

FRA.pbqs["net-wap-config"] = {
  id: "net-wap-config", title: "Configure the new access point", domain: 2, lesson: "u6l6", seo: false,
  scenario: {
    text: "A new access point is going up in a busy open-plan office. It will carry the staff network on the 5 GHz band, and every employee must sign in with their own credentials, checked by the RADIUS server at {{10.0.5.20}}."
  },
  tasks: [
    { id: "cfg", kind: "form", prompt: "Fill in the staff network settings.", fields: [
      { id: "band", label: "Band", expect: ["5 GHz", "5GHz", "5.0 GHz", "5"], normalize: "text" },
      { id: "mode", label: "Security mode", expect: ["WPA3-Enterprise", "WPA3 Enterprise", "WPA2-Enterprise", "WPA2 Enterprise"], normalize: "text" },
      { id: "auth", label: "Authentication standard the AP uses with the server", expect: ["802.1X"], normalize: "text" },
      { id: "radius", label: "Authentication server address", expect: ["10.0.5.20"], normalize: "ip" }
    ] },
    { id: "harden", kind: "multiselect", prompt: "The access point arrives with these settings. Pick every one you change before it goes live.", options: [
      "Administrator password left at the factory default",
      "Management over HTTP and Telnet turned on",
      "WPA with TKIP allowed for older clients",
      "Band steering turned on"
    ], expect: [0, 1, 2] },
    { id: "width", kind: "choice", prompt: "Several neighboring access points share this crowded floor. Which channel width do you set on 5 GHz?", options: ["20 or 40 MHz", "160 MHz", "The same width and channel as the neighboring access points"], expect: 0 }
  ],
  why: {
    cfg: "Per-user sign-in means Enterprise mode: 802.1X authentication against a RADIUS server, here 10.0.5.20. WPA3-Enterprise is the current standard and WPA2-Enterprise is still acceptable; Personal mode with one shared passphrase cannot revoke one user.",
    harden: "Default passwords are public knowledge, management should use SSH and HTTPS only, and WPA with TKIP is deprecated, so all three change before deployment. Band steering stays on: it nudges capable clients from 2.4 GHz to 5 GHz.",
    width: "Wider channels move more data but overlap more neighbors and pick up more noise, so a crowded floor gets narrow channels. 160 MHz would collide with every neighbor, and putting neighbors on the same channel is the opposite of channel planning."
  }
};

FRA.pbqs["net-switch-lines"] = {
  id: "net-switch-lines", title: "Find the faults in the switch config", domain: 2, lesson: "u6l2", seo: false,
  scenario: {
    text: "A new desk port should put the staff PC on VLAN 10 and be up. The uplink to the core switch should be a trunk carrying VLANs 10 and 20. The core switch's end of the uplink uses the default native VLAN. Read the configuration and find what is wrong.",
    log: "interface Gi1/0/5\n description Staff desk, VLAN 10\n switchport mode trunk\n switchport access vlan 99\n shutdown\n!\ninterface Gi1/0/48\n description Uplink to core, VLANs 10 and 20\n switchport mode access\n switchport trunk native vlan 1"
  },
  tasks: [
    { id: "lines", kind: "multiselect", shuffle: false, prompt: "Pick every configuration line that is wrong.", options: [
      "interface Gi1/0/5",
      "description Staff desk, VLAN 10",
      "switchport mode trunk",
      "switchport access vlan 99",
      "shutdown",
      "interface Gi1/0/48",
      "description Uplink to core, VLANs 10 and 20",
      "switchport mode access",
      "switchport trunk native vlan 1"
    ], expect: [2, 3, 4, 7] },
    { id: "native", kind: "form", prompt: "The native VLAN must be the same on both ends of the trunk. Which VLAN is it?", fields: [
      { id: "vlan", label: "Native VLAN", expect: ["1"], normalize: "number" }
    ] },
    { id: "mismatch", kind: "choice", prompt: "If the two ends of a trunk used different native VLANs, what would happen?", options: [
      "The switches log a mismatch error and untagged traffic lands in the wrong VLAN",
      "The trunk carries tagged and untagged traffic normally with no error",
      "The switch port shuts itself down and stays down until it is reset",
      "Every VLAN on the trunk is dropped, tagged and untagged alike"
    ], expect: 0 }
  ],
  why: {
    lines: "The desk port is an access port for one VLAN, so it needs access mode, VLAN 10 rather than 99, and no shutdown. The uplink carries many VLANs, so it must be a trunk; with one end access and the other trunk, only the access VLAN passes. The interface, description, and native VLAN lines are fine.",
    native: "The native VLAN is the one VLAN that crosses an 802.1Q trunk untagged. It is VLAN 1 by default, and the core switch uses the default, so this end must be VLAN 1 too.",
    mismatch: "A native VLAN mismatch makes the switches log an error, and untagged traffic from one side lands in a different VLAN on the other, leaking traffic between VLANs. Tagged VLANs still cross, which is why the fault is easy to miss."
  }
};

FRA.pbqs["net-diagram-ips"] = {
  id: "net-diagram-ips", title: "Address the branch office", domain: 2, lesson: "u7l1", seo: true,
  scenario: {
    text: "A branch office has one router, one switch, two PCs, and a printer. The router's LAN interface is {{10.0.1.1/24}} and its WAN interface is {{203.0.113.2/30}}, a point-to-point link to the provider. The office address plan sets aside {{10.0.1.10}}, {{10.0.1.11}}, {{10.0.1.20}}, and {{10.0.1.100}} for PCs; the printer is at {{10.0.1.30}}.",
    svg: "<svg viewBox=\"0 0 420 220\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11\" fill=\"currentColor\">\n"
      + "<rect x=\"10\" y=\"20\" width=\"90\" height=\"36\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"34\" y=\"42\">Provider</text>\n"
      + "<line x1=\"100\" y1=\"38\" x2=\"170\" y2=\"38\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<text x=\"104\" y=\"54\">WAN .2/30</text>\n"
      + "<rect x=\"170\" y=\"20\" width=\"80\" height=\"36\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"190\" y=\"42\">Router</text>\n"
      + "<line x1=\"210\" y1=\"56\" x2=\"210\" y2=\"100\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<text x=\"216\" y=\"82\">LAN 10.0.1.1/24</text>\n"
      + "<rect x=\"170\" y=\"100\" width=\"80\" height=\"30\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"190\" y=\"119\">Switch</text>\n"
      + "<line x1=\"190\" y1=\"130\" x2=\"70\" y2=\"170\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"210\" y1=\"130\" x2=\"210\" y2=\"170\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"230\" y1=\"130\" x2=\"350\" y2=\"170\" stroke=\"currentColor\"/>\n"
      + "<rect x=\"30\" y=\"170\" width=\"80\" height=\"30\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"52\" y=\"189\">PC-A</text>\n"
      + "<rect x=\"170\" y=\"170\" width=\"80\" height=\"30\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"192\" y=\"189\">PC-B</text>\n"
      + "<rect x=\"310\" y=\"170\" width=\"80\" height=\"30\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"328\" y=\"189\">Printer</text>\n"
      + "</svg>"
  },
  tasks: [
    { id: "pca", kind: "form", prompt: "Configure PC-A with a static address from the office plan, then name the router's peer on the WAN link.", fields: [
      { id: "ip", label: "PC-A IP address", expect: ["10.0.1.10", "10.0.1.11", "10.0.1.20", "10.0.1.100"], normalize: "ip" },
      { id: "mask", label: "PC-A subnet mask", expect: ["255.255.255.0", "/24"], normalize: "cidr" },
      { id: "gw", label: "PC-A default gateway", expect: ["10.0.1.1"], normalize: "ip" },
      { id: "peer", label: "Provider's address on the WAN link", expect: ["203.0.113.1"], normalize: "ip" }
    ] },
    { id: "printer", kind: "choice", prompt: "Why should the printer have a static address or a DHCP reservation?", options: [
      "Every PC finds it by its address, so the address must never change",
      "Printers cannot request an address from a DHCP server",
      "A fixed address makes the printer print faster",
      "Only devices with static addresses can be reached across the switch"
    ], expect: 0 },
    { id: "bad", kind: "multiselect", prompt: "Pick every address that cannot be assigned to a PC on this LAN.", options: ["10.0.1.0", "10.0.1.25", "10.0.1.255", "10.0.1.1", "10.0.1.200"], expect: [0, 2, 3] }
  ],
  why: {
    pca: "PC-A must sit in the router's LAN block, 10.0.1.0/24, so it takes a plan address with mask 255.255.255.0 and the router's LAN interface, 10.0.1.1, as its default gateway; a host with a gateway outside its subnet reaches its neighbors and nothing beyond. The WAN is a /30: block size 4, network .0, broadcast .3, and only .1 and .2 usable, so with the router on .2 the provider is .1.",
    printer: "Clients reach a shared printer at a known address, so it must not change; a DHCP reservation pins one address to the printer's MAC while keeping it centrally managed. Printers can use DHCP perfectly well, and a fixed address changes neither speed nor reachability across the switch.",
    bad: "In 10.0.1.0/24 the network address .0 and the broadcast address .255 can never be given to a host, and .1 is already the router's gateway address, so a PC there would conflict. The .25 and .200 addresses are ordinary usable hosts."
  }
};

FRA.pbqs["net-osi-match"] = {
  id: "net-osi-match", title: "Place each item on the OSI model", domain: 1, lesson: "u2l1", seo: false,
  scenario: {
    text: "A new hire is sorting the parts of a web request by OSI layer: the cable from the PC, the switch and router it crosses, the transport protocol, the encryption, and the web protocol itself."
  },
  tasks: [
    { id: "layers", kind: "match", prompt: "Match each item to its OSI layer.", left: ["Switch", "Router", "TCP", "HTTP", "Twisted-pair cable", "TLS encryption"], right: [
      "Layer 1, Physical",
      "Layer 2, Data link",
      "Layer 3, Network",
      "Layer 4, Transport",
      "Layer 5, Session",
      "Layer 6, Presentation",
      "Layer 7, Application"
    ], expect: [1, 2, 3, 6, 0, 5] },
    { id: "pdu", kind: "choice", prompt: "What is the unit of data at layer 2?", options: ["Frame", "Packet", "Segment", "Bit"], expect: 0 },
    { id: "ip", kind: "multiselect", prompt: "Pick every item that makes its forwarding decisions on IP addresses.", options: ["Switch", "Router", "TCP", "HTTP", "Twisted-pair cable", "TLS encryption"], expect: [1] }
  ],
  why: {
    layers: "Cables are layer 1, switches move frames by MAC address at layer 2, routers move packets by IP address at layer 3, TCP delivers by port number at layer 4, encryption such as TLS is layer 6, and HTTP is a layer 7 protocol users touch. Layer 5, Session, has no item here.",
    pdu: "Layer 2 moves frames between devices on the same segment. Packets belong to layer 3, segments to layer 4, and bits to layer 1.",
    ip: "IP addresses are layer 3 logical addresses, and the router is the only layer 3 device in the list. A switch forwards on MAC addresses, TCP on port numbers, and the cable carries bits without reading any address."
  }
};

FRA.pbqs["net-firewall-order"] = {
  id: "net-firewall-order", title: "Order the firewall rules", domain: 4, lesson: "u8l9", seo: false,
  scenario: {
    text: "The edge firewall needs a new rule set. Policy: replies to established sessions are allowed; the public may reach the web server in the screened subnet on HTTPS; the admin subnet may reach the servers over SSH; everything else is denied and logged. Order the allow rules so the busiest traffic matches first: established replies are most of the traffic, public HTTPS is next, and admin SSH is occasional."
  },
  tasks: [
    { id: "rules", kind: "order", prompt: "Put the rules in the order the firewall should process them, top to bottom.", items: [
      "Allow replies to established sessions",
      "Allow any source to the web server on HTTPS",
      "Allow the admin subnet to the servers on SSH",
      "Deny any source to any destination, and log it"
    ], expect: [0, 1, 2, 3] },
    { id: "ports", kind: "form", prompt: "Fill in the destination ports for the two service rules.", fields: [
      { id: "https", label: "HTTPS port", expect: ["443"], normalize: "number" },
      { id: "ssh", label: "SSH port", expect: ["22"], normalize: "number" }
    ] },
    { id: "implicit", kind: "choice", prompt: "If the explicit deny rule were left off, what would happen to traffic that matches none of the allow rules?", options: [
      "It is denied by the implicit deny at the end of the list",
      "It is allowed, because nothing denies it",
      "It is sent to the screened subnet for inspection",
      "It is allowed but logged"
    ], expect: 0 }
  ],
  why: {
    rules: "ACLs are processed top down and the first match wins, so the allow rules go in order of how much traffic they match and the deny goes last. A deny any any placed above an allow would block that allow's traffic, because the firewall would never reach it.",
    ports: "HTTPS uses TCP 443 and SSH uses TCP 22. They are the secure replacements for HTTP on 80 and Telnet on 23.",
    implicit: "Every ACL ends with an implicit deny: traffic that matches no rule is dropped. The explicit deny rule exists so the dropped traffic is logged, not to make the denial happen."
  }
};

FRA.pbqs["net-ipconfig-ping"] = {
  id: "net-ipconfig-ping", title: "Read the workstation's output", domain: 5, lesson: "u9l5", seo: false,
  scenario: {
    text: "A clinic workstation cannot reach anything on the network. The DHCP server was down this morning and is back up now. The file server is named {{fileserver}} in the {{clinic.local}} domain. Here is what the workstation shows.",
    log: "C:\\> ipconfig\n\nEthernet adapter Ethernet:\n\n   Link-local IPv6 Address . . . . . : fe80::4c1a:2b7f:9e3d:12a8%7\n   Autoconfiguration IPv4 Address. . : 169.254.23.7\n   Subnet Mask . . . . . . . . . . . : 255.255.0.0\n   Default Gateway . . . . . . . . . :\n\nC:\\> ping 10.0.1.1\n\nPinging 10.0.1.1 with 32 bytes of data:\nReply from 169.254.23.7: Destination host unreachable."
  },
  tasks: [
    { id: "lines", kind: "multiselect", shuffle: false, prompt: "Pick every ipconfig line that shows why the workstation cannot reach the network.", options: [
      "Ethernet adapter Ethernet:",
      "Link-local IPv6 Address . . . . . : fe80::4c1a:2b7f:9e3d:12a8%7",
      "Autoconfiguration IPv4 Address. . : 169.254.23.7",
      "Default Gateway . . . . . . . . . :"
    ], expect: [2, 3] },
    { id: "apipa", kind: "choice", prompt: "What does the 169.254.23.7 address tell you?", options: [
      "The workstation assigned itself an APIPA address because it got no DHCP answer",
      "The network card has failed and needs replacing",
      "The workstation has a valid lease from the DHCP server",
      "Someone typed a static address on the wrong subnet"
    ], expect: 0 },
    { id: "renew", kind: "command", prompt: "The DHCP server is back. Type the Windows command that asks it for a new lease.", expect: ["ipconfig /renew"], alt: ["ipconfig -renew", "ipconfig /release && ipconfig /renew", "ipconfig /release & ipconfig /renew", "ipconfig /renew *"] },
    { id: "dns", kind: "command", prompt: "The workstation has a lease again. Type the command that checks DNS resolves the file server's name.", expect: ["nslookup fileserver"], alt: ["nslookup fileserver.clinic.local"] }
  ],
  why: {
    lines: "A 169.254 address and an empty default gateway are the two lines that show the workstation never got a lease, so it has no way off its own link. The adapter name is just a heading, and a fe80 link-local IPv6 address is present on every IPv6 interface all the time.",
    apipa: "A host assigns itself an APIPA address in 169.254.0.0/16 when it cannot reach a DHCP server. It means the network card works but DHCP did not answer, so check the DHCP server, the scope, and the path, not the hardware.",
    renew: "ipconfig /renew asks the DHCP server for a lease; ipconfig /release first is fine too. ipconfig /all would only show the problem again, not fix it.",
    dns: "nslookup queries DNS directly and shows which server answered and what address it returned. Ping tests reachability and traceroute the path, but neither is the tool for checking a name record."
  }
};

FRA.pbqs["net-dhcp-dns-form"] = {
  id: "net-dhcp-dns-form", title: "Stand up DHCP for the new segment", domain: 3, lesson: "u5l3", seo: false,
  scenario: {
    text: "A new staff segment, {{10.0.20.0/24}}, needs a DHCP scope. The router is at {{10.0.20.1}}, the servers hold {{10.0.20.2}} through {{10.0.20.20}}, and the DNS server is {{10.0.20.5}}. The client pool takes every usable address above the server block, with nothing held back. Leases cover a working day, so one shift (8 hours), a long shift (12 hours), or a full day (24 hours) all fit."
  },
  tasks: [
    { id: "scope", kind: "form", prompt: "Fill in the scope and its options.", fields: [
      { id: "start", label: "Scope start address", expect: ["10.0.20.21"], normalize: "ip" },
      { id: "end", label: "Scope end address", expect: ["10.0.20.254"], normalize: "ip" },
      { id: "router", label: "Default gateway (router) option", expect: ["10.0.20.1"], normalize: "ip" },
      { id: "dns", label: "DNS server option", expect: ["10.0.20.5"], normalize: "ip" },
      { id: "lease", label: "Lease time in hours", expect: ["8", "12", "24", "8 hours", "12 hours", "24 hours", "8h", "12h", "24h"], normalize: "number" }
    ] },
    { id: "fixed", kind: "choice", prompt: "A new file server on this segment will take its address from DHCP but must keep the same address every time. What do you configure?", options: [
      "A reservation that ties one address to the server's MAC address",
      "An exclusion for the server's address",
      "A shorter lease time",
      "A DHCP relay on the router"
    ], expect: 0 },
    { id: "needs", kind: "multiselect", prompt: "Pick every setting a client must get from DHCP to browse the internet by name.", options: [
      "An IP address",
      "A subnet mask",
      "A default gateway",
      "A DNS server",
      "An NTP server",
      "A VoIP phone provisioning option"
    ], expect: [0, 1, 2, 3] }
  ],
  why: {
    scope: "The scope must stay clear of the router at .1 and the servers at .2 to .20, so it starts right after the server block at .21. It ends at .254, the last usable address, because the pool takes everything above the servers. Address .0 is the network address, .1 to .20 belong to the router and servers, and .255 is the broadcast, so none of those can be handed to clients. The gateway is option 3 and DNS is option 6; a lease of 8, 12, or 24 hours covers a shift or a working day for a stable staff office, where short leases are for guest networks.",
    fixed: "A reservation gives a specific address to a specific MAC every time while the device still uses DHCP. An exclusion only keeps an address out of the pool, a shorter lease changes nothing about which address is given, and a relay is for clients on a remote subnet.",
    needs: "To reach the internet by name a client needs an address, a mask to know what is local, a gateway to leave the subnet, and a DNS server to turn names into addresses. NTP and phone provisioning are useful options, but browsing works without them."
  }
};
