// NetPlus Academy memorization sheet. Everything on the N10-009 exam that must be recalled cold:
// numbers, tables, orders of steps, and one-line distinctions. Rendered by the Cheat sheet tab and printable.
// Block types: table {cols, rows}, list {items, cols}, note {text}. Inline markup: **bold**, {{code}}.
window.NPA = window.NPA || {};
NPA.cheatsheet = {
  title: "Network+ N10-009 Memorization Sheet",
  intro: "Print this and keep it beside you while you study. Every number, order, and pairing on this sheet is fair game on the exam. Nothing here needs understanding to score; it needs recall.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Exam code", "N10-009 (Network+)"],
          ["Questions", "Up to 90, multiple choice plus performance-based"],
          ["Time", "90 minutes"],
          ["Passing score", "720 on a scale of 100 to 900 (about 72%)"],
          ["1.0 Networking Concepts", "23%"],
          ["2.0 Network Implementation", "20%"],
          ["3.0 Network Operations", "19%"],
          ["4.0 Network Security", "14%"],
          ["5.0 Network Troubleshooting", "24%"]
        ] },
        { type: "note", text: "Read for the qualifier: MOST likely, BEST, FIRST, NEXT. Eliminate two options, then choose. Never leave a question blank." }
      ]
    },
    {
      id: "ports", title: "Ports and protocols",
      blocks: [
        { type: "table", cols: ["Service", "Port", "Transport", "Notes and secure form"], rows: [
          ["FTP", "20 data, 21 control", "TCP", "Plaintext. Secure: SFTP on 22, or FTPS on 989/990"],
          ["SSH, SFTP, SCP", "22", "TCP", "Encrypted shell and file copy. Replaces Telnet and FTP"],
          ["Telnet", "23", "TCP", "Plaintext. Replace with SSH"],
          ["SMTP", "25", "TCP", "Server to server mail. Secure submission: 587"],
          ["TACACS+", "49", "TCP", "Device administration AAA, encrypts the whole payload"],
          ["DNS", "53", "UDP queries, TCP zone transfers", "Secure: DoT 853, DoH 443"],
          ["DHCP", "67 server, 68 client", "UDP", "DORA. DHCPv6 uses 546 client, 547 server"],
          ["TFTP", "69", "UDP", "No authentication. Firmware and config transfers"],
          ["HTTP", "80", "TCP", "Secure: HTTPS 443"],
          ["Kerberos", "88", "TCP or UDP", "Windows domain authentication. Breaks if clocks differ by more than 5 minutes"],
          ["POP3", "110", "TCP", "Secure: POP3S 995"],
          ["NTP", "123", "UDP", "Time sync. Secured with NTS"],
          ["IMAP", "143", "TCP", "Secure: IMAPS 993"],
          ["SNMP", "161 agent (polls), 162 manager (traps)", "UDP", "v1 and v2c use a community string; v3 adds authentication and encryption"],
          ["LDAP", "389", "TCP", "Secure: LDAPS 636"],
          ["HTTPS", "443", "TCP", "TLS web traffic; also carries DoH"],
          ["SMB", "445", "TCP", "Windows file and printer sharing"],
          ["IKE (IPsec)", "500, NAT-T 4500", "UDP", "Key exchange. ESP is IP protocol 50, AH is 51"],
          ["Syslog", "514", "UDP", "Central logging. Severity 0 to 7"],
          ["SMTPS, submission", "587", "TCP", "Mail client to server with TLS"],
          ["LDAPS", "636", "TCP", "LDAP over TLS"],
          ["DNS over TLS", "853", "TCP", "Encrypted resolver queries"],
          ["IMAPS", "993", "TCP", "IMAP over TLS"],
          ["POP3S", "995", "TCP", "POP3 over TLS"],
          ["SQL Server", "1433", "TCP", "Microsoft SQL"],
          ["RADIUS", "1812 auth, 1813 accounting", "UDP", "Network access AAA (Wi-Fi, VPN, 802.1X). Legacy 1645/1646"],
          ["MySQL", "3306", "TCP", "MySQL and MariaDB"],
          ["RDP", "3389", "TCP", "Remote Desktop"],
          ["SIP", "5060 plain, 5061 TLS", "TCP or UDP", "Sets up voice and video calls"]
        ] },
        { type: "list", title: "Encrypted pairs", cols: 2, items: [
          "HTTP 80 to HTTPS 443", "Telnet 23 to SSH 22", "FTP 21 to SFTP 22", "LDAP 389 to LDAPS 636",
          "IMAP 143 to IMAPS 993", "POP3 110 to POP3S 995", "SMTP 25 to SMTPS 587", "DNS 53 to DoT 853 or DoH 443",
          "SNMP v1/v2c to SNMPv3 (same ports)", "SIP 5060 to SIP over TLS 5061"
        ] },
        { type: "list", title: "Port ranges and IP protocol numbers", cols: 2, items: [
          "0 to 1023: well-known", "1024 to 49151: registered", "49152 to 65535: dynamic (client) ports",
          "ICMP 1, TCP 6, UDP 17", "GRE 47, ESP 50, AH 51", "OSPF 89, EIGRP 88 (ride directly on IP)"
        ] }
      ]
    },
    {
      id: "osi", title: "OSI and TCP/IP models",
      blocks: [
        { type: "table", cols: ["Layer", "PDU", "Key idea", "Devices and protocols"], rows: [
          ["7 Application", "Data", "Protocols users touch", "HTTP, HTTPS, SMTP, DNS, DHCP, FTP, SSH, SNMP, Telnet; proxies, web application firewalls"],
          ["6 Presentation", "Data", "Formatting, encryption, compression", "TLS, JPEG, MPEG, ASCII, Unicode"],
          ["5 Session", "Data", "Start, maintain, end dialogs", "NetBIOS, RPC, session control"],
          ["4 Transport", "Segment (TCP), datagram (UDP)", "Port numbers; reliable vs fast", "TCP, UDP; port-filtering firewalls, load balancers"],
          ["3 Network", "Packet", "IP addresses, TTL, routing", "Routers, Layer 3 switches; IP, ICMP, IPsec, OSPF, RIP"],
          ["2 Data Link", "Frame", "MAC addresses, MAC and LLC sublayers, frame check sequence", "Switches, NICs, access points, bridges; Ethernet, 802.11, ARP, STP, 802.1Q"],
          ["1 Physical", "Bit", "Signals, cables, connectors, radio", "Hubs, repeaters, transceivers, media converters, cables"]
        ] },
        { type: "list", cols: 2, items: [
          "Bottom up: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way",
          "Top down: **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing",
          "TCP/IP model: Application (OSI 5 to 7), Transport (4), Internet (3), Network Access or Link (1 and 2)",
          "Encapsulation: data, segment, packet, frame, bits. Capture order: Ethernet header (MACs), IP header (addresses, TTL), TCP or UDP header (ports), payload",
          "MAC address: 48 bits, 12 hex digits, first 24 bits are the OUI. Rewritten at every router hop; the IP address stays the same end to end",
          "MTU 1500 bytes standard; jumbo frames about 9000",
          "TCP handshake: SYN, SYN-ACK, ACK. Close: FIN and ACK. Abort: RST",
          "Traffic types: unicast one to one; broadcast one to all on the segment (routers stop it; IPv6 has none); multicast one to a group (224.0.0.0 to 239.255.255.255); anycast one address on many servers, nearest answers"
        ] }
      ]
    },
    {
      id: "ipv4", title: "IPv4 addressing and subnetting",
      blocks: [
        { type: "table", cols: ["Class", "First octet", "Default mask", "Use"], rows: [
          ["A", "1 to 126", "/8, 255.0.0.0", "Huge networks"],
          ["B", "128 to 191", "/16, 255.255.0.0", "Medium networks"],
          ["C", "192 to 223", "/24, 255.255.255.0", "Small networks"],
          ["D", "224 to 239", "none", "Multicast (OSPF uses 224.0.0.5 and 224.0.0.6)"],
          ["E", "240 to 255", "none", "Experimental"],
          ["127", "127.0.0.0/8", "loopback", "127.0.0.1 is this host"]
        ] },
        { type: "table", cols: ["Range", "Meaning"], rows: [
          ["10.0.0.0/8 (10.0.0.0 to 10.255.255.255)", "Private, RFC 1918"],
          ["172.16.0.0/12 (172.16.0.0 to 172.31.255.255)", "Private, RFC 1918. 172.32.x.x is public"],
          ["192.168.0.0/16 (192.168.0.0 to 192.168.255.255)", "Private, RFC 1918"],
          ["169.254.0.0/16", "APIPA, link-local. Means DHCP failed"],
          ["255.255.255.255", "Limited broadcast (DHCP Discover)"],
          ["0.0.0.0/0", "Default route, route of last resort"],
          ["100.64.0.0/10", "Carrier-grade NAT shared space"]
        ] },
        { type: "table", cols: ["Prefix", "Mask", "Block size", "Usable hosts"], rows: [
          ["/8", "255.0.0.0", "1 in octet 1", "16,777,214"],
          ["/16", "255.255.0.0", "1 in octet 2", "65,534"],
          ["/17", "255.255.128.0", "128 in octet 3", "32,766"],
          ["/18", "255.255.192.0", "64 in octet 3", "16,382"],
          ["/19", "255.255.224.0", "32 in octet 3", "8,190"],
          ["/20", "255.255.240.0", "16 in octet 3", "4,094"],
          ["/21", "255.255.248.0", "8 in octet 3", "2,046"],
          ["/22", "255.255.252.0", "4 in octet 3", "1,022"],
          ["/23", "255.255.254.0", "2 in octet 3", "510"],
          ["/24", "255.255.255.0", "1 in octet 3", "254"],
          ["/25", "255.255.255.128", "128", "126"],
          ["/26", "255.255.255.192", "64", "62"],
          ["/27", "255.255.255.224", "32", "30"],
          ["/28", "255.255.255.240", "16", "14"],
          ["/29", "255.255.255.248", "8", "6"],
          ["/30", "255.255.255.252", "4", "2 (point-to-point links)"],
          ["/31", "255.255.255.254", "2", "2, no broadcast (point-to-point only)"],
          ["/32", "255.255.255.255", "1", "A single host"]
        ] },
        { type: "list", cols: 2, items: [
          "Mask octet values: 128, 192, 224, 240, 248, 252, 254, 255 = 1 to 8 network bits",
          "Binary place values: 128, 64, 32, 16, 8, 4, 2, 1",
          "Powers of two: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096",
          "Usable hosts = 2 to the host bits, minus 2. Subnets created = 2 to the borrowed bits",
          "Hosts needed: add 2, round up to the next power of two, that many host bits",
          "A subnet must start on a multiple of its own block size (192.168.10.96/26 is invalid; 64 and 128 are valid starts)",
          "Summarization: 10.1.0.0/24 through 10.1.3.0/24 = 10.1.0.0/22"
        ] },
        { type: "list", title: "Block size method", items: [
          "1. Find the interesting octet: the first mask octet that is not 255 or 0.",
          "2. Block size = 256 minus that mask octet (.224 gives 32, .240 gives 16, .192 gives 64).",
          "3. Subnets start at multiples of the block size: 0, 32, 64, 96, 128, 160, 192, 224 for a block of 32.",
          "4. Network = the multiple at or below the host. Broadcast = one less than the next multiple. Usable = everything between.",
          "Example: 192.168.1.100/27. Block 32. Network 192.168.1.96, broadcast .127, hosts .97 to .126."
        ] }
      ]
    },
    {
      id: "ipv6", title: "IPv6",
      blocks: [
        { type: "table", cols: ["Prefix", "Type", "Notes"], rows: [
          ["2000::/3", "Global unicast", "Routable on the internet (addresses starting 2 or 3)"],
          ["fe80::/10", "Link-local", "Automatic on every interface, never routed. Used by NDP and routing protocols"],
          ["fc00::/7 (in practice fd..)", "Unique local", "Private addressing, routable inside the organization only"],
          ["ff00::/8", "Multicast", "ff02::1 all nodes, ff02::2 all routers. No broadcast in IPv6"],
          ["::1", "Loopback", "This host"],
          ["::", "Unspecified", "No address yet"],
          ["2001:db8::/32", "Documentation", "Used in examples only"]
        ] },
        { type: "list", cols: 2, items: [
          "128 bits, eight groups of four hex digits. A standard LAN is a /64: 64 bits network, 64 bits interface ID",
          "Shortening: drop leading zeros in each group; replace one run of all-zero groups with :: (only once)",
          "SLAAC: the router advertisement supplies the /64 prefix and the host builds its own interface ID",
          "EUI-64: split the 48-bit MAC, insert ff:fe in the middle, flip the seventh bit",
          "DHCPv6: stateful hands out addresses; stateless hands out only options such as DNS",
          "NDP replaces ARP: neighbor solicitation and neighbor advertisement over ICMPv6 multicast",
          "Dual stack runs both. Tunneling (6to4, ISATAP, Teredo, GRE) carries v6 inside v4. NAT64 with DNS64 translates for v6-only clients"
        ] }
      ]
    },
    {
      id: "media", title: "Cabling, connectors, and Ethernet standards",
      blocks: [
        { type: "table", cols: ["Copper", "Speed", "Distance", "Notes"], rows: [
          ["Cat 5e", "1 Gbps", "100 m", "Minimum for gigabit"],
          ["Cat 6", "1 Gbps; 10 Gbps", "100 m; 55 m at 10 Gbps", ""],
          ["Cat 6A", "10 Gbps", "100 m", "The answer for 10 Gbps at full distance"],
          ["Cat 7", "10 Gbps", "100 m", "Shielded, non-RJ45 connectors (GG45, TERA), rare"],
          ["Cat 8", "25 or 40 Gbps", "30 m", "Short data center runs"],
          ["Coax RG-6", "Cable modem, video", "", "F-type connector; BNC on legacy LANs"],
          ["Twinax (DAC)", "10 to 100 Gbps", "A few meters", "Transceivers permanently attached; cheaper than optics"]
        ] },
        { type: "list", cols: 2, items: [
          "All twisted pair Ethernet: 100 meters (328 feet) including patch cords",
          "RJ45 is 8P8C for Ethernet; RJ11 for telephone",
          "UTP default; STP for high-EMI areas (motors, fluorescent ballasts)",
          "T568B pins: 1 white-orange, 2 orange, 3 white-green, 4 blue, 5 white-blue, 6 green, 7 white-brown, 8 brown. T568A swaps the orange and green pairs",
          "Same standard both ends = straight-through (host to switch). Different = crossover (switch to switch without auto-MDIX)",
          "Plenum-rated for air-handling spaces above drop ceilings; riser-rated for vertical runs between floors",
          "CSMA/CD: listen, send, back off on collision. Full duplex has no collisions. Duplex mismatch = late collisions and CRC errors"
        ] },
        { type: "table", cols: ["Fiber", "Core", "Source", "Reach", "Jacket"], rows: [
          ["Single-mode (SMF)", "about 9 microns", "Laser", "10 km and beyond", "Yellow"],
          ["Multimode (MMF)", "50 or 62.5 microns", "LED or VCSEL", "About 300 to 550 m at 10 Gbps", "Orange (OM1, OM2), aqua (OM3, OM4)"]
        ] },
        { type: "list", cols: 2, items: [
          "LC: small square snap-in, most common on transceivers. SC: larger square push-pull. ST: round bayonet twist, legacy. MPO/MTP: 12 or 24 fibers in one plug for 40 and 100 Gbps",
          "UPC blue flat polish; APC green angled polish (less reflection, long haul and PON). Never mate UPC to APC",
          "Media converter changes medium without changing data (fiber to copper, SMF to MMF)",
          "Transceivers: SFP 1 Gbps, SFP+ 10 Gbps, QSFP/QSFP+ 40 Gbps, QSFP28 100 Gbps, QSFP-DD and OSFP 400 Gbps. Both ends must match speed, wavelength, and fiber type"
        ] },
        { type: "table", cols: ["Standard", "Speed", "Medium", "Distance"], rows: [
          ["10BASE-T", "10 Mbps", "Cat 3 or better", "100 m"],
          ["100BASE-TX", "100 Mbps", "Cat 5 or better", "100 m"],
          ["1000BASE-T", "1 Gbps", "Cat 5e or better", "100 m"],
          ["10GBASE-T", "10 Gbps", "Cat 6A (Cat 6 to 55 m)", "100 m"],
          ["40GBASE-T", "40 Gbps", "Cat 8", "30 m"],
          ["1000BASE-SX", "1 Gbps", "Multimode", "About 550 m"],
          ["1000BASE-LX", "1 Gbps", "Single-mode (or MMF with mode conditioning)", "10 km"],
          ["10GBASE-SR", "10 Gbps", "Multimode", "About 300 m (400 m on OM4)"],
          ["10GBASE-LR", "10 Gbps", "Single-mode", "10 km"],
          ["10GBASE-ER", "10 Gbps", "Single-mode", "40 km"]
        ] },
        { type: "note", text: "Naming: S = short reach, multimode. L = long reach, single-mode. E = extended reach. T = twisted pair. SR on single-mode fiber, or SR at 2 km, is a mismatch." }
      ]
    },
    {
      id: "wireless", title: "Wireless",
      blocks: [
        { type: "table", cols: ["Standard", "Name", "Band", "Max rate", "Key feature"], rows: [
          ["802.11a", "", "5 GHz", "54 Mbps", "OFDM, short range"],
          ["802.11b", "", "2.4 GHz", "11 Mbps", "Long range, slow"],
          ["802.11g", "", "2.4 GHz", "54 Mbps", "Backward compatible with b"],
          ["802.11n", "Wi-Fi 4", "2.4 and 5 GHz", "600 Mbps", "MIMO, 40 MHz channels"],
          ["802.11ac", "Wi-Fi 5", "5 GHz only", "Gigabit class (up to 6.9 Gbps)", "MU-MIMO, 80 and 160 MHz channels"],
          ["802.11ax", "Wi-Fi 6 / 6E", "2.4, 5, and 6 GHz (6E)", "About 9.6 Gbps", "OFDMA for crowded spaces"],
          ["802.11be", "Wi-Fi 7", "2.4, 5, and 6 GHz", "Tens of Gbps", "320 MHz channels, multi-link operation"]
        ] },
        { type: "list", cols: 2, items: [
          "2.4 GHz: non-overlapping channels 1, 6, 11 (20 MHz). Longest range, most interference (microwaves, Bluetooth, neighbors)",
          "5 GHz: many channels, 40/80/160 MHz bonding, DFS channels must yield to radar. 6 GHz: Wi-Fi 6E only, shortest range",
          "Wider channels = more speed, more overlap and noise. Use 20 MHz in dense 2.4 GHz deployments",
          "SSID = network name. BSSID = MAC of one radio on one AP. ESSID = same SSID across many APs for roaming",
          "Infrastructure (through an AP), ad hoc (IBSS, no AP), mesh (APs link wirelessly), point-to-point (directional antennas between buildings)",
          "Omnidirectional for general coverage; directional (Yagi, patch, parabolic) for long links and hallways",
          "Autonomous APs configured individually; lightweight APs managed by a wireless LAN controller",
          "Site survey produces a heat map. Overlap cells 15 to 20 percent for roaming. Band steering pushes clients to 5 GHz"
        ] },
        { type: "table", cols: ["Security", "Status", "Detail"], rows: [
          ["WEP", "Broken", "Never use"],
          ["WPA", "Deprecated", "TKIP"],
          ["WPA2", "Acceptable", "AES with CCMP. Personal (PSK) or Enterprise (802.1X with RADIUS)"],
          ["WPA3", "Current", "Personal uses SAE (no offline cracking). Enterprise offers 192-bit mode"],
          ["Enterprise", "", "802.1X authentication against RADIUS, per-user credentials or certificates, per-user VLAN"],
          ["Captive portal", "", "Intercepts first web request for terms or login; guest SSID on an isolated VLAN"],
          ["Hidden SSID, MAC filtering", "Not security", "Trivially bypassed; hardening at best"]
        ] }
      ]
    },
    {
      id: "switching", title: "Switching",
      blocks: [
        { type: "list", cols: 2, items: [
          "Switch jobs: learn source MACs into the MAC (CAM) table, forward known destinations, flood unknowns and broadcasts, block loops with STP",
          "Each switch port is one collision domain. Each VLAN is one broadcast domain. A hub is one collision domain. A router separates broadcast domains",
          "Unmanaged: no config. Managed: VLANs, STP, port security. Layer 3 switch: also routes between VLANs in hardware",
          "In-band management over the network (SSH, web). Out-of-band via console port or dedicated management network",
          "Access port: one VLAN, untagged. Trunk port: many VLANs tagged with 802.1Q (4-byte tag, IDs 1 to 4094)",
          "Native VLAN crosses the trunk untagged (default VLAN 1) and must match on both ends",
          "Voice VLAN lets a phone tag while the PC behind it stays untagged. Management VLAN holds switch interfaces",
          "Routing between VLANs: SVI on a Layer 3 switch, or router on a stick with one subinterface per VLAN",
          "LACP (802.3ad, 802.1AX) bundles links; every member needs matching speed, duplex, and VLANs. One flow still uses one link",
          "MTU 1500; jumbo about 9000; every device in the path must match. Symptom of mismatch: small pings work, large transfers fail",
          "Port mirroring (SPAN) copies traffic to an analyzer port. Port security limits MACs; violation puts the port in error-disabled",
          "Duplex mismatch: one side hard-coded, the other auto falls to half duplex. Late collisions, CRC errors, slow link"
        ] },
        { type: "table", cols: ["Spanning tree", "Detail"], rows: [
          ["Standard", "STP 802.1D; RSTP 802.1w; MSTP 802.1s"],
          ["Root bridge", "Lowest bridge ID (priority then MAC). Set core priority low"],
          ["Port roles", "Root port (toward root), designated port (one per link), blocked (redundant). RSTP adds alternate and backup"],
          ["STP states", "Blocking, listening, learning, forwarding: 30 to 50 seconds"],
          ["RSTP states", "Discarding, learning, forwarding: converges in seconds"],
          ["PortFast", "Skips listening and learning on host ports. Never on switch-to-switch links"],
          ["BPDU guard", "Shuts a PortFast port that receives a BPDU (rogue switch)"],
          ["Root guard", "Stops a downstream switch from becoming root"],
          ["Loop guard", "Protects against unidirectional link failures"],
          ["Loop symptoms", "Broadcast storm, CPU at 100 percent, MAC addresses flapping, everything slow after adding a redundant cable"]
        ] },
        { type: "table", cols: ["PoE standard", "Name", "At the port", "Delivered to device"], rows: [
          ["802.3af", "PoE", "15.4 W", "About 13 W"],
          ["802.3at", "PoE+", "30 W", "About 25.5 W"],
          ["802.3bt Type 3", "PoE++", "60 W", "About 51 W"],
          ["802.3bt Type 4", "PoE++", "90 W", "About 71 W"]
        ] }
      ]
    },
    {
      id: "routing", title: "Routing, NAT, and gateway redundancy",
      blocks: [
        { type: "list", title: "Route selection order", items: [
          "1. Longest prefix match wins (a /24 beats a /16 beats 0.0.0.0/0).",
          "2. Same prefix: lowest administrative distance wins.",
          "3. Same source: lowest metric wins."
        ] },
        { type: "table", cols: ["Route source", "Administrative distance"], rows: [
          ["Directly connected", "0"], ["Static", "1"], ["External BGP", "20"], ["EIGRP", "90"], ["OSPF", "110"], ["IS-IS", "115"], ["RIP", "120"], ["Internal BGP", "200"]
        ] },
        { type: "table", cols: ["Protocol", "Type", "Metric", "Notes"], rows: [
          ["RIP", "Distance-vector, IGP", "Hop count, max 15", "Updates every 30 s; RIPv2 supports CIDR; RIPng for IPv6; small networks"],
          ["OSPF", "Link-state, IGP", "Cost from bandwidth", "Open standard, areas, Dijkstra SPF, fast convergence, multicast 224.0.0.5 and .6"],
          ["EIGRP", "Advanced distance-vector (hybrid), IGP", "Bandwidth and delay", "Cisco origin, fast convergence"],
          ["BGP", "Path-vector, EGP", "AS path and policy", "Between autonomous systems, runs on TCP 179, the internet's protocol, slow by design"]
        ] },
        { type: "list", cols: 2, items: [
          "Distance-vector knows what neighbors say; link-state knows the whole map (more CPU, faster, fewer loops)",
          "Static: predictable, no overhead, no adaptation. Dynamic: adapts to failures. Default route 0.0.0.0/0 is the way out",
          "Routers rewrap the frame (new MACs), keep the packet (same IPs), decrement TTL by one. TTL 0 = discard",
          "Static NAT: one to one, publish a server. Dynamic NAT: pool, many to many. PAT (overload): many to one by source port, every home router",
          "Port forwarding: public port to an inside host. Inside local = private address; inside global = its public translation",
          "FHRP: routers share a virtual IP and virtual MAC. HSRP Cisco (active/standby). VRRP open standard (master/backup). GLBP Cisco with load balancing",
          "Subinterfaces: one physical interface split per VLAN (router on a stick)",
          "Convergence: time for all routers to agree after a change"
        ] }
      ]
    },
    {
      id: "services", title: "DHCP, DNS, and time",
      blocks: [
        { type: "list", title: "DHCP", cols: 2, items: [
          "DORA: Discover (broadcast from 0.0.0.0 to 255.255.255.255), Offer, Request, Acknowledge. UDP 67 server, 68 client",
          "Scope = the pool. Exclusion = addresses never leased. Reservation = fixed address pinned to a MAC. Lease = how long",
          "Clients renew at 50 percent of the lease (T1) and rebind at 87.5 percent (T2)",
          "Options: 3 default gateway, 6 DNS servers, 15 domain name, 42 NTP, 66 TFTP server name, 150 Cisco phone TFTP",
          "Relay agent or IP helper address turns the broadcast into a unicast so one server can serve many subnets",
          "Scope exhaustion or unreachable server = client self-assigns 169.254.x.x (APIPA). Rogue DHCP = DHCP snooping"
        ] },
        { type: "table", cols: ["DNS record", "Maps"], rows: [
          ["A", "Name to IPv4 address"], ["AAAA", "Name to IPv6 address"], ["CNAME", "Alias: one name to another name"],
          ["MX", "Mail exchanger for the domain, with priority"], ["NS", "Authoritative name servers for a zone"],
          ["SOA", "Start of authority: zone serial and timers"], ["PTR", "IP address back to a name (reverse zone, in-addr.arpa)"],
          ["TXT", "Free text: SPF, DKIM, DMARC, domain verification"], ["SRV", "Locates a service by name, port, and priority (SIP, Active Directory)"]
        ] },
        { type: "list", cols: 2, items: [
          "Lookup path: recursive resolver, root, top-level domain, authoritative. Cached answers are non-authoritative and expire at the TTL",
          "Forward zone: names to addresses. Reverse zone: addresses to names. Primary holds the writable copy; secondaries pull by zone transfer on TCP 53",
          "DNSSEC signs records: integrity, not privacy. DoT (TCP 853) and DoH (443) encrypt queries: privacy",
          "The hosts file is checked before DNS",
          "NTP UDP 123, millisecond accuracy. Stratum 0 = reference clock (GPS, atomic); stratum 1 connects to it; stratum 2 syncs from 1",
          "PTP (IEEE 1588) = sub-microsecond with hardware timestamps. NTS = authenticated, encrypted NTP",
          "Clock skew over 5 minutes breaks Kerberos; wrong time breaks certificates, MFA codes, and log correlation"
        ] }
      ]
    },
    {
      id: "appliances", title: "Appliances, cloud, and modern networking",
      blocks: [
        { type: "table", cols: ["Device or function", "Layer", "One-line job"], rows: [
          ["Router", "3", "Connects networks, chooses paths, separates broadcast domains"],
          ["Switch", "2", "Forwards frames by MAC; one collision domain per port"],
          ["Layer 3 switch", "2 and 3", "Switch that routes between VLANs in hardware"],
          ["Access point, WLC", "2", "Bridges Wi-Fi to the LAN; the controller manages many APs"],
          ["Firewall", "3 to 7", "Stateful tracks connections; next-generation inspects applications and users"],
          ["IDS", "", "Watches a copy of traffic, alerts only. Passive, out of band"],
          ["IPS", "", "Inline in the path, blocks in real time. Can bottleneck or false-positive"],
          ["VPN concentrator", "", "Terminates many encrypted tunnels"],
          ["Forward proxy", "7", "Requests on behalf of clients; filters, caches, hides client addresses"],
          ["Reverse proxy", "7", "Sits in front of servers; terminates TLS, caches, protects"],
          ["Load balancer", "4 to 7", "Spreads connections across servers: round robin, least connections, health checks"],
          ["CDN", "", "Caches content near users; cuts latency, absorbs spikes"],
          ["NAS", "", "File-level storage over SMB or NFS"],
          ["SAN", "", "Block-level storage over iSCSI or Fibre Channel; looks like a local disk"],
          ["QoS", "", "Classifies and prioritizes traffic so voice and video survive congestion"]
        ] },
        { type: "list", title: "Cloud", cols: 2, items: [
          "SaaS: use the application. PaaS: deploy your code, provider runs the OS and runtime. IaaS: rent VMs, you manage the OS",
          "Public (shared, pay as you go), private (dedicated), hybrid (mix)",
          "VPC: your isolated virtual network with its own subnets",
          "Network security group: stateful firewall per VM interface. Network security list or NACL: stateless rules per subnet",
          "Internet gateway: public addresses reach the internet. NAT gateway: private subnets reach out only",
          "NFV: routers, firewalls, load balancers as software instances",
          "Site-to-site VPN over the internet (cheap, variable) versus direct connect (private circuit, predictable, costly)",
          "Scalability grows capacity; elasticity grows and shrinks automatically; multitenancy shares hardware with logical isolation"
        ] },
        { type: "list", title: "SDN, SD-WAN, VXLAN, zero trust, IaC", cols: 2, items: [
          "SDN separates the control plane (decisions) from the data plane (forwarding). Application plane on top, management plane for monitoring",
          "Northbound APIs: applications to controller. Southbound APIs: controller to devices",
          "SD-WAN: application aware, transport agnostic, zero-touch provisioning, central policy management",
          "VXLAN: Layer 2 frames inside UDP across Layer 3. 24-bit VNI = 16 million segments versus 4094 VLANs. Data center interconnect",
          "Zero trust: never trust, always verify. Every request authenticated and authorized by policy with least privilege",
          "SASE = SD-WAN plus cloud security (firewall, secure web gateway, ZTNA, CASB). SSE = the security half only",
          "IaC: playbooks and templates, source control, drift detection, dynamic inventories, automated upgrades"
        ] },
        { type: "list", title: "Physical installation", cols: 2, items: [
          "MDF: main wiring room, core devices, demarcation point where the provider's responsibility ends",
          "IDF: closet per floor or wing with access switches, uplinked to the MDF",
          "19-inch racks; 1U = 1.75 inches. Two-post for light gear, four-post or lockable cabinet for servers",
          "Front intake cold aisle, rear exhaust hot aisle. Match port-side intake or exhaust to the rack's airflow",
          "Patch panel terminates horizontal cabling; patch cords connect panel to switch. Label both ends",
          "UPS carries load through outages and conditions power; generator is long term. PDU is the rack power strip",
          "Temperature 18 to 27 C (64 to 80 F). Humidity 40 to 60 percent: too dry = static, too humid = condensation",
          "Clean-agent or gas fire suppression, not water. 120 V or 208/240 V; redundant supplies on separate circuits"
        ] }
      ]
    },
    {
      id: "operations", title: "Network operations",
      blocks: [
        { type: "list", title: "Documentation and agreements", cols: 2, items: [
          "Physical diagram: where devices sit and cables run. Logical diagram: subnets, VLANs, routing, traffic flow",
          "Layer 1 diagram cabling; Layer 2 switches, VLANs, trunks, STP; Layer 3 routers, subnets, routing protocols",
          "Rack diagram: front view by rack unit. Cable map: jack to patch panel port to switch port",
          "Asset inventory: model, serial, location, owner, warranty, licensing. IPAM: every subnet and address",
          "SLA: what the provider guarantees (uptime, repair time) and penalties. MOU: non-binding intent. NDA: confidentiality",
          "Update documentation as the last step of every change"
        ] },
        { type: "list", title: "Life cycle, change, and configuration", cols: 2, items: [
          "EOL: vendor stops selling. EOS: no more patches or support; replace it",
          "Change process in order: request, assess impact and write a rollback plan, approve, schedule a maintenance window and notify, implement and test, document",
          "Emergency changes take a shorter path but are still recorded. Service request = routine pre-approved work",
          "Production config (running now), backup config (saved before and after changes), baseline or golden config (approved standard). Drift = deviation from golden"
        ] },
        { type: "table", cols: ["Monitoring", "Detail"], rows: [
          ["SNMP", "Agent on the device, MIB database, OID per variable. Manager polls with Get on UDP 161; device sends traps on UDP 162"],
          ["SNMP versions", "v1 and v2c: plaintext community string (v2c adds bulk). v3: authentication, integrity, encryption"],
          ["Flow data", "NetFlow, sFlow, IPFIX: who talked to whom, ports, volume. No payload. Finds top talkers"],
          ["Packet capture", "Protocol analyzer (Wireshark) fed by a SPAN port or an inline tap. Every byte"],
          ["Syslog severity", "0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug"],
          ["SIEM", "Correlates logs from many sources, alerts on patterns, retains for compliance"],
          ["Baseline", "Normal utilization, latency, errors over time. Anomaly alerts fire on deviation"],
          ["Solutions", "Discovery (ad hoc or scheduled), traffic analysis, performance, availability (uptime versus SLA), configuration monitoring"]
        ] },
        { type: "list", title: "Metrics", cols: 2, items: [
          "Bandwidth = capacity. Throughput = what you get. Utilization = the ratio; sustained above 70 to 80 percent means congestion",
          "Latency = delay in ms (distance, queueing, satellite adds 500 to 600 ms). Jitter = variation in delay; choppy voice",
          "Packet loss = missing packets: TCP retransmits, voice gaps. Interface errors: CRC, runts, giants, discards",
          "Device health: CPU, memory, temperature, fans. CPU pegged often means a broadcast storm or attack"
        ] },
        { type: "table", cols: ["Disaster recovery", "Detail"], rows: [
          ["RPO", "Recovery point objective: how much data you can lose, measured backward in time"],
          ["RTO", "Recovery time objective: how fast service must be restored"],
          ["MTTR", "Mean time to repair: average fix time"],
          ["MTBF", "Mean time between failures: average life before failing"],
          ["Cold site", "Space, power, cooling only. Days or weeks. Cheapest"],
          ["Warm site", "Equipment and connectivity in place; restore data. Hours to a day"],
          ["Hot site", "Running mirror with current data. Minutes. Most expensive"],
          ["Active-active", "All nodes serve; capacity drops on failure"],
          ["Active-passive", "Standby takes over on failure (FHRPs)"],
          ["Tabletop", "Walk through the plan on paper. Validation test: actually fail over or restore"]
        ] },
        { type: "list", title: "Remote access and management", cols: 2, items: [
          "Site-to-site VPN joins offices. Client-to-site joins remote users. Clientless = browser over TLS",
          "Split tunnel: only corporate traffic through the VPN. Full tunnel: everything, inspected and protected",
          "Manage by SSH (22), HTTPS GUI, API, or console cable. Jump box or bastion: one hardened host you reach everything through",
          "In-band uses the production network. Out-of-band (console server, management network, cellular) works when production is down"
        ] }
      ]
    },
    {
      id: "security", title: "Security",
      blocks: [
        { type: "list", title: "Concepts", cols: 2, items: [
          "CIA: confidentiality (encryption, access control), integrity (hashing, signatures), availability (redundancy, DDoS protection)",
          "Vulnerability = weakness. Threat = what could exploit it. Exploit = the method. Risk = likelihood times impact",
          "Encryption in transit (TLS, IPsec, SSH) versus at rest (disk, database). PKI: a certificate authority binds a public key to an identity. Self-signed = browser warning",
          "AAA: authentication (who), authorization (what), accounting (record)",
          "MFA factors: something you know, have, are; plus location and time. Password plus phone app code = know plus have",
          "SSO: one login for many systems. SAML: web SSO between identity provider and applications",
          "RADIUS: UDP 1812/1813, network access (Wi-Fi, VPN, 802.1X), encrypts only the password",
          "TACACS+: TCP 49, device administration, encrypts the whole payload, separates authentication from authorization, per-command control",
          "Least privilege; role-based access control; geofencing",
          "Honeypot = decoy system; honeynet = decoy network. Physical: locks, badges, cameras, mantraps",
          "Data locality laws; PCI DSS for card data; GDPR for EU personal data. Segment IoT, IIoT, SCADA/ICS/OT, guest, and BYOD",
          "IPsec: AH = integrity and authentication only; ESP = encryption too. Transport mode encrypts the payload; tunnel mode wraps the packet (site-to-site). IKE on UDP 500"
        ] },
        { type: "table", cols: ["Symptom", "Attack", "Defense"], rows: [
          ["Service flooded from one source, or from many (botnet)", "DoS, DDoS (reflection and amplification)", "Upstream filtering, DDoS protection"],
          ["Attacker reaches a VLAN they should not; switch spoofing or double 802.1Q tags", "VLAN hopping", "Disable trunk negotiation on access ports, unused native VLAN"],
          ["Switch forwards all traffic to all ports; MAC table full of fakes", "MAC flooding", "Port security"],
          ["Forged ARP replies map the gateway IP to the attacker's MAC; traffic flows through them", "ARP poisoning enabling an on-path attack", "Dynamic ARP inspection"],
          ["Users sent to attacker sites by forged answers or corrupted cache", "DNS poisoning or spoofing", "DNSSEC"],
          ["Clients get a wrong gateway or DNS from an unknown server", "Rogue DHCP", "DHCP snooping"],
          ["Forged source address", "IP spoofing", "Ingress filtering"],
          ["Unauthorized AP on the network", "Rogue access point", "Wireless IDS, NAC, port security"],
          ["Attacker AP broadcasting your SSID", "Evil twin", "Enterprise authentication, user awareness"],
          ["Clients kicked off with forged management frames", "Deauthentication", "802.11w protected management frames"],
          ["Email, phone, text, targeted, following through a door, watching a screen, trash", "Phishing, vishing, smishing, spear phishing, tailgating, shoulder surfing, dumpster diving", "Training, mantraps, shredding"],
          ["Encrypts data for payment; hides in software; self-propagates; watches", "Ransomware, trojan, worm, spyware", "Backups, patching, endpoint protection"],
          ["Every password tried; common words; leaked credentials reused", "Brute force, dictionary, credential stuffing", "MFA, lockout, unique passwords"]
        ] },
        { type: "list", title: "Hardening and defense", cols: 2, items: [
          "First steps on any device: change default passwords, disable unused ports and services, patch firmware, SSH and HTTPS only, management on its own VLAN or out of band",
          "Rotate keys and certificates; revoke compromised ones",
          "NAC: 802.1X authentication plus posture assessment (antivirus, patches, disk encryption). Noncompliant devices go to a quarantine or remediation VLAN",
          "ACLs: processed top down, first match wins, implicit deny at the end",
          "URL filtering by address or category; content filtering inspects what is inside",
          "Firewall zones: trusted (inside), untrusted (internet), screened subnet (DMZ) for public-facing servers",
          "Segmentation with VLANs and firewall rules limits lateral movement"
        ] }
      ]
    },
    {
      id: "troubleshooting", title: "Troubleshooting",
      blocks: [
        { type: "list", title: "The seven steps, in order", items: [
          "1. Identify the problem: gather information, question users, identify symptoms, determine what changed, duplicate it, approach multiple problems individually.",
          "2. Establish a theory of probable cause: question the obvious; top-to-bottom, bottom-to-top, or divide and conquer through the OSI layers.",
          "3. Test the theory to determine the cause. Not confirmed: new theory or escalate.",
          "4. Establish a plan of action to resolve the problem and identify potential effects.",
          "5. Implement the solution or escalate as necessary.",
          "6. Verify full system functionality and, if applicable, implement preventive measures.",
          "7. Document findings, actions, outcomes, and lessons learned."
        ] },
        { type: "note", text: "After the theory is confirmed, the next step is the plan, not the fix. After implementing, verify before documenting. Documenting is always last." },
        { type: "table", cols: ["Symptom", "Cause"], rows: [
          ["CRC errors and late collisions on one link", "Duplex mismatch"],
          ["Works at 80 m, fails or flaps at 120 m", "Attenuation (copper limit 100 m)"],
          ["Fiber link dead, strands crossed at one end", "TX/RX polarity reversal"],
          ["Runts (under 64 bytes)", "Collisions or bad NIC"],
          ["Giants (over MTU)", "MTU or jumbo frame mismatch"],
          ["Discards or drops rising", "Congestion"],
          ["Port error-disabled", "Port security, BPDU guard, or flapping violation; fix cause then clear"],
          ["Port administratively down", "Someone typed shutdown"],
          ["Camera or AP powers on then reboots, or never powers", "PoE budget exceeded or wrong PoE standard"],
          ["No link with SR optic on single-mode fiber", "Transceiver or fiber mismatch"],
          ["Interference in a factory over UTP", "EMI; use STP or fiber"],
          ["Broadcast storm, CPU 100 percent, MACs flapping right after a new cable", "Spanning tree loop"],
          ["Odd traffic paths, access switch is root", "Root bridge in the wrong place; lower core priority"],
          ["Host gets an address from the wrong scope after a desk move", "Access port in the wrong VLAN"],
          ["Untagged traffic lands in the wrong VLAN on a trunk", "Native VLAN mismatch"],
          ["Local devices reachable, nothing remote", "Wrong or missing default gateway"],
          ["Some hosts on the same subnet unreachable", "Incorrect subnet mask"],
          ["Intermittent connectivity, address conflict warning", "Duplicate IP (static inside a scope without exclusion)"],
          ["New clients get 169.254.x.x, old ones work", "DHCP scope exhaustion or unreachable server"],
          ["Ping by IP works, by name fails", "DNS"],
          ["One application or port fails, others work", "ACL blocking it"],
          ["Traffic goes out, replies never come back", "Missing return route or asymmetric routing through a stateful firewall"],
          ["Full signal bars, poor throughput", "Interference or co-channel overlap; use 1, 6, 11 or move to 5 GHz"],
          ["Choppy voice, delay varies", "Jitter"],
          ["Everything slow through one link at 100 percent", "Bottleneck or congestion"],
          ["Clients cling to a distant AP", "Too little cell overlap or transmit power too high"]
        ] },
        { type: "table", cols: ["Command or tool", "Shows"], rows: [
          ["ping", "Reachability, round-trip time, loss. Loopback, self, gateway, remote in that order"],
          ["traceroute / tracert", "Every hop and its latency; where the path breaks. mtr and pathping repeat over time"],
          ["ipconfig /all, /release, /renew, /flushdns", "Windows address, mask, gateway, DNS, lease, MAC; refresh lease; clear resolver cache"],
          ["ifconfig, ip addr", "Linux and macOS addressing"],
          ["arp -a", "IP-to-MAC cache; duplicates and poisoning"],
          ["nslookup, dig", "Query DNS directly, pick a server, ask for a record type"],
          ["netstat", "Open connections and listening ports; netstat -r shows the routing table"],
          ["nmap", "Open ports and services; live hosts on a subnet (authorized use only)"],
          ["tcpdump, Wireshark", "Command-line capture; graphical protocol analyzer"],
          ["LLDP / CDP", "What device and port is on the other end of a cable"],
          ["show mac-address-table", "Which MAC is on which port and VLAN"],
          ["show arp", "The device's ARP cache"],
          ["show interface", "Status, speed, duplex, errors, CRCs, drops"],
          ["show ip route", "Routing table and how each route was learned"],
          ["show vlan", "VLANs and port assignments"],
          ["show running-config", "Current configuration"],
          ["show power", "PoE budget and per-port power"]
        ] },
        { type: "table", cols: ["Hardware tool", "Use"], rows: [
          ["Toner and probe", "Find the far end of a cable in a bundle or patch panel"],
          ["Cable tester", "Continuity, pinout, opens, shorts, split pairs, length"],
          ["Cable certifier", "Proves a run meets its category with a report"],
          ["Punch-down tool, crimper", "Terminate on jacks and panels; attach RJ45 plugs"],
          ["Loopback plug", "Tests a port's own transmit and receive"],
          ["Visual fault locator", "Red light shows fiber breaks and bends"],
          ["OTDR", "Locates fiber breaks and losses by distance"],
          ["Optical power meter", "Received light level"],
          ["Fiber cleaning kit", "Dirty connectors are the most common fiber fault"],
          ["Network tap", "Passive inline copy of traffic when there is no SPAN port"],
          ["Wi-Fi analyzer", "APs, channels, signal, dead spots"],
          ["Spectrum analyzer", "All radio energy including non-Wi-Fi interference"],
          ["Multimeter", "Voltage and continuity"],
          ["PoE injector", "Adds power where the switch cannot"]
        ] }
      ]
    }
  ]
};
