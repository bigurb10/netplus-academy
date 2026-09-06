// NetPlus Academy curriculum, units 4 to 6.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "IP Addressing and Subnetting", domain: 1,
  blurb: "IPv4 structure, special ranges, subnetting you can do in your head, and IPv6.",
  assumes: "You know the OSI layers and that routers forward by IP address.",
  lessons: [
    {
      id: "u4l1", title: "IPv4 Basics and Address Classes", domain: 1, obj: "1.7", minutes: 8,
      body: `An IPv4 address is 32 bits, written as four decimal octets from 0 to 255, such as {{172.16.40.9}}. Part of it identifies the **network**, the rest identifies the **host** on that network. The **subnet mask** says where the split is: a 1 bit in the mask means network, a 0 bit means host.

## Reading a mask
{{255.255.255.0}} is 24 ones followed by 8 zeros, written as **/24** in CIDR notation. Octet values you must recognize as masks: 128, 192, 224, 240, 248, 252, 254, 255, which correspond to 1 through 8 network bits in that octet. So {{255.255.255.224}} is /27 and {{255.255.240.0}} is /20.

## Binary in one minute
Each octet's bits are worth 128, 64, 32, 16, 8, 4, 2, 1. Add the bits that are on. {{192}} is 128 plus 64, so its binary is 11000000. You only need this for masks and for spotting which half of a subnet a host falls into.

## The historical classes
Classful addressing is retired in favor of CIDR, but the exam still expects you to recognize the ranges by first octet:
- **Class A**: 1 to 126, default mask /8. Huge networks.
- **Class B**: 128 to 191, default mask /16.
- **Class C**: 192 to 223, default mask /24. Small networks.
- **Class D**: 224 to 239, multicast, not assigned to hosts.
- **Class E**: 240 to 255, experimental.
127 is skipped because {{127.0.0.0/8}} is reserved for **loopback**; {{127.0.0.1}} always means "this host."

## Two addresses you never assign
In every subnet the all-zeros host address is the **network address** and the all-ones host address is the **broadcast address**. Everything between them is usable.

> Exam tip: "how many bits" questions are just mask arithmetic. /27 leaves 5 host bits. A first octet of 172 is Class B; 10 is Class A; 200 is Class C.`,
      hook: "Mask octets: 128 192 224 240 248 252 254 255. Class A 1-126 /8, B 128-191 /16, C 192-223 /24, 127 loopback."
    },
    {
      id: "u4l2", title: "Public, Private, and Special Addresses", domain: 1, obj: "1.7", minutes: 6,
      body: `Not every address can be used on the internet. Some ranges are set aside for inside networks or for special jobs.

## Private ranges (RFC 1918)
These are free for anyone to use internally and are never routed on the public internet. Reaching the internet from them requires NAT.
- {{10.0.0.0/8}}: 10.0.0.0 to 10.255.255.255
- {{172.16.0.0/12}}: 172.16.0.0 to 172.31.255.255
- {{192.168.0.0/16}}: 192.168.0.0 to 192.168.255.255
Remember the middle one carefully: 172.16 through 172.31 only. 172.32.0.1 is public.

## Special ranges
- **APIPA**, {{169.254.0.0/16}}: a host assigns itself one of these when it cannot reach a DHCP server. Seeing 169.254.x.x on a client means DHCP failed. Also called link-local in IPv4.
- **Loopback**, {{127.0.0.0/8}}: the host itself.
- **Multicast**, 224.0.0.0 to 239.255.255.255.
- **Limited broadcast**, {{255.255.255.255}}: everyone on the local segment, used by DHCP Discover.
- **Default route**, {{0.0.0.0/0}}: matches any destination; the route of last resort.

## Public addresses
Everything else is public, assigned through regional registries to providers and organizations. Public space is scarce, which is why private addressing plus NAT became universal and why IPv6 exists.

> Exam tip: a user with an APIPA address has a working network card but no DHCP answer. Check the DHCP server, the scope, and the path between them, not the cable.`,
      hook: "10/8, 172.16/12 (16 to 31), 192.168/16 are private. 169.254 means DHCP failed. 127 is me."
    },
    {
      id: "u4l3", title: "Subnetting with Block Sizes", domain: 1, obj: "1.7", minutes: 12,
      body: `Subnetting splits one network into smaller ones. You can do every exam subnetting problem with one trick: the **block size**.

## The method
1. Find the **interesting octet**: the first mask octet that is not 255 or 0.
2. **Block size = 256 minus that mask octet.** A mask of {{.224}} gives 256 - 224 = 32. A mask of {{.240}} gives 16.
3. Subnets start at multiples of the block size in that octet: 0, 32, 64, 96, 128, 160, 192, 224 for a block of 32.
4. The **network address** is the multiple at or below your host's value. The **broadcast** is one less than the next multiple. **Usable hosts** are everything in between.

## Worked example
Host {{192.168.1.100}} with mask {{255.255.255.224}} (/27). Interesting octet is the fourth. Block size 32. Multiples: 0, 32, 64, 96, 128. The host sits between 96 and 128, so the network is {{192.168.1.96}}, the broadcast is {{192.168.1.127}}, and usable hosts run from .97 to .126.

## Counting hosts
Usable hosts = 2 to the power of host bits, minus 2. A /27 has 5 host bits: 32 - 2 = 30 hosts. A /26 has 6: 64 - 2 = 62. A /30 has 2: 4 - 2 = 2, perfect for a point-to-point link. A /31 is used on point-to-point links with no broadcast, and a /32 identifies a single host.

## Counting subnets
Subnets created = 2 to the power of borrowed bits. Splitting a /24 into /27 borrows 3 bits and gives 8 subnets of 30 hosts each.

## When the interesting octet is the third
Mask {{255.255.240.0}} (/20): block size 16 in the third octet. Host {{10.5.37.200}} falls between 32 and 48, so the network is {{10.5.32.0}}, the broadcast is {{10.5.47.255}}, and hosts run from 10.5.32.1 to 10.5.47.254.

## The CIDR to mask table
/25 .128 (block 128), /26 .192 (64), /27 .224 (32), /28 .240 (16), /29 .248 (8), /30 .252 (4). For the third octet, /17 through /23 use the same values in that octet.

> Exam tip: two hosts can talk directly only if they are in the same block. A gateway must be inside the host's block too. Most "cannot reach the gateway" problems are a host or gateway outside the subnet range.`,
      hook: "256 minus the mask octet is the block. Network is the multiple below you, broadcast is one before the next multiple, hosts are 2^bits minus 2."
    },
    {
      id: "u4l4", title: "Subnet Design and VLSM", domain: 1, obj: "1.7", minutes: 9,
      body: `Real designs work backward: you know how many hosts you need and must pick a mask.

## Choosing a mask for a host count
Find the smallest power of two that is at least the host count plus 2. 50 hosts need 52 addresses; 64 is the next power of two, so 6 host bits, mask /26. 200 hosts need 202, next power is 256, 8 host bits, /24. 12 hosts need 14, next power 16, /28. 2 hosts on a router link: /30.

## VLSM
**Variable length subnet masking** means using different mask lengths in the same network so each subnet fits its purpose. Take {{192.168.10.0/24}}: a 100-host LAN gets {{192.168.10.0/25}} (126 hosts), a 50-host LAN gets {{192.168.10.128/26}} (62), a 20-host LAN gets {{192.168.10.192/27}} (30), and router links get /30s starting at {{192.168.10.224/30}}. Allocate largest first so blocks line up on their boundaries.

## CIDR and supernetting
**Classless inter-domain routing** ignores the old classes entirely; any prefix length is valid. Going the other direction, combining several networks into one bigger advertised route is **supernetting** or **route summarization**. {{10.1.0.0/24}} through {{10.1.3.0/24}} summarize to {{10.1.0.0/22}}. Summaries keep routing tables small.

## Alignment rule
A subnet must start on a multiple of its own block size. {{192.168.10.64/26}} is valid; {{192.168.10.96/26}} is not, because 96 is not a multiple of 64.

## Design sanity checks
- Every host and its gateway share the same network address when you apply the mask.
- No two subnets overlap.
- Leave room to grow; do not size a 50-host LAN as a /26 if it will hit 70 next year.

> Exam tip: "the most efficient mask for 30 hosts" is /27 (30 usable). For 31 hosts you need /26. Read the count carefully; off-by-one is how these questions catch people.`,
      hook: "Hosts plus 2, round up to a power of two, that is your host bits. Largest subnets first. Start blocks on their own multiples."
    },
    {
      id: "u4l5", title: "IPv6 Addressing", domain: 1, obj: "1.8", minutes: 10,
      body: `IPv6 exists because the 4.3 billion IPv4 addresses ran out. An IPv6 address is **128 bits**, written as eight groups of four hex digits separated by colons.

## Writing addresses
{{2001:0db8:0000:0000:0000:ff00:0042:8329}} shortens by two rules: drop leading zeros in each group, and replace one run of consecutive all-zero groups with {{::}} (only once). Result: {{2001:db8::ff00:42:8329}}. The network prefix is written CIDR style, and a standard LAN is a **/64**: 64 bits of network, 64 bits of interface identifier.

## Address types
- **Global unicast**: routable on the internet, currently allocated from {{2000::/3}} (addresses starting 2 or 3).
- **Link-local**: {{fe80::/10}}. Every IPv6 interface has one automatically. Used for neighbor discovery and routing protocol traffic on the local link only; never routed. The IPv6 cousin of APIPA, but present on every host all the time.
- **Unique local**: {{fc00::/7}}, in practice starting {{fd}}. Private addressing, routable inside the organization but not on the internet.
- **Multicast**: {{ff00::/8}}. Replaces broadcast entirely. {{ff02::1}} is all nodes on the link, {{ff02::2}} is all routers.
- **Anycast**: any unicast address assigned to more than one interface; the nearest one answers.
- **Loopback**: {{::1}}.

## How hosts get addresses
- **SLAAC** (stateless address autoconfiguration): the router sends a **router advertisement** with the /64 prefix; the host builds its own interface ID. With **EUI-64** the host takes its 48-bit MAC, inserts {{ff:fe}} in the middle, and flips the seventh bit. Modern systems usually use a random interface ID instead for privacy.
- **DHCPv6**: stateful, like IPv4 DHCP, or stateless to hand out DNS servers while SLAAC provides the address.
- **Neighbor Discovery Protocol (NDP)** replaces ARP. Neighbor solicitation and advertisement resolve MAC addresses over ICMPv6 multicast.

> Exam tip: an address starting {{fe80}} is link-local and tells you nothing about internet connectivity. "Hosts build their own address from a router advertisement" is SLAAC.`,
      hook: "128 bits, /64 LANs. 2000::/3 global, fe80 link-local, fd unique local, ff multicast, ::1 loopback. SLAAC builds from the RA."
    },
    {
      id: "u4l6", title: "IPv4 to IPv6 Coexistence", domain: 1, obj: "1.8", minutes: 6,
      body: `Networks will run both protocols for years. Three strategies make that work.

## Dual stack
Every host and router runs IPv4 and IPv6 at the same time and uses whichever the destination supports. Simplest and most common. The cost is managing two address plans, two sets of firewall rules, and two routing tables.

## Tunneling
Wrap IPv6 packets inside IPv4 packets to cross a part of the network that only speaks IPv4 (or the reverse). Mechanisms you may see named: **6to4**, **ISATAP**, **Teredo**, and **GRE** tunnels. Tunneling adds overhead and lowers the effective MTU. It connects IPv6 islands; it does not translate.

## Translation with NAT64
When an IPv6-only network must reach IPv4-only servers, a **NAT64** gateway rewrites the packets between the two protocols. It usually pairs with **DNS64**, which synthesizes AAAA records for hosts that only have A records so IPv6 clients know where to send traffic. Mobile carriers run IPv6-only phones this way.

## Choosing
- Both sides speak both protocols: dual stack.
- Two IPv6 sites separated by IPv4-only transit: tunnel.
- IPv6-only clients need IPv4-only services: NAT64.

## Why it matters
IPv4 exhaustion drove all of this. Carrier-grade NAT lets providers share one public IPv4 address across many customers, but breaks things that need inbound connections. Native IPv6 removes the need for NAT entirely.

> Exam tip: the word "translate" points to NAT64. "Encapsulate" or "across an IPv4 network" points to tunneling. "Run both" is dual stack.`,
      hook: "Dual stack runs both. Tunnels carry v6 inside v4. NAT64 translates for v6-only hosts."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Protocols, Ports, and Network Services", domain: 1,
  blurb: "TCP and UDP, the port numbers the exam expects cold, and how DHCP, DNS, and time services work.",
  assumes: "You can subnet and know the difference between an IP address and a MAC address.",
  lessons: [
    {
      id: "u5l1", title: "TCP, UDP, and the IP Protocol Family", domain: 1, obj: "1.4", minutes: 8,
      body: `The transport layer decides whether a conversation is reliable or fast.

## TCP
**Transmission Control Protocol** is connection-oriented. Before data flows, the two sides complete the **three-way handshake**: the client sends **SYN**, the server replies **SYN-ACK**, the client sends **ACK**. Every segment is numbered and acknowledged; lost segments are retransmitted; a receive window provides **flow control** so a fast sender does not swamp a slow receiver. Sessions close with FIN and ACK exchanges or abort with RST. Web, email, file transfer, and remote shells use TCP because they cannot tolerate missing bytes.

## UDP
**User Datagram Protocol** is connectionless. No handshake, no acknowledgments, no ordering. Each datagram is fire and forget, which makes it fast and light. Voice, video, DNS queries, DHCP, SNMP, TFTP, and syslog use UDP because speed matters more than perfection or because the application handles reliability itself.

## Other IP protocol types
These ride directly inside IP rather than on TCP or UDP:
- **ICMP**: control and error messages. Ping uses echo request and echo reply; traceroute relies on time exceeded; destination unreachable tells you a route or port is missing.
- **GRE**: generic routing encapsulation, a simple tunnel that wraps one packet inside another with no encryption.
- **IPsec**: encrypted tunnels. **AH** (authentication header) provides integrity and authentication only. **ESP** (encapsulating security payload) adds encryption. **IKE** (internet key exchange) negotiates the keys, over UDP 500.
- Transport mode encrypts only the payload between two hosts; tunnel mode wraps the whole packet, used for site-to-site VPNs.

> Exam tip: "reliable, ordered, acknowledged" is TCP. "Low overhead, tolerates loss, real-time" is UDP. "Confidentiality" in IPsec means ESP; AH alone gives no encryption.`,
      hook: "SYN, SYN-ACK, ACK. TCP reliable, UDP fast. ICMP for ping. GRE tunnels without encryption, IPsec ESP encrypts, AH only authenticates."
    },
    {
      id: "u5l2", title: "Well-Known Ports", domain: 1, obj: "1.4", minutes: 10,
      body: `Ports identify the application inside a host. Ports 0 to 1023 are **well-known**, 1024 to 49151 are registered, and 49152 to 65535 are dynamic client ports. The exam expects these from memory, including which are encrypted alternatives.

## File transfer and remote access
- **FTP**: TCP 20 (data) and 21 (control). Plaintext.
- **SSH**: TCP 22. Encrypted remote shell. **SFTP** and **SCP** also use 22.
- **Telnet**: TCP 23. Plaintext remote shell; replace with SSH.
- **TFTP**: UDP 69. Trivial, no authentication, used for firmware and config transfers.
- **RDP**: TCP 3389. Remote Desktop.
- **SMB**: TCP 445. Windows file and printer sharing.

## Email
- **SMTP**: TCP 25 between mail servers. **SMTPS** or submission with TLS: TCP 587.
- **POP3**: TCP 110, **POP3S** 995. **IMAP**: TCP 143, **IMAPS** 993.

## Web and directory
- **HTTP**: TCP 80. **HTTPS**: TCP 443.
- **LDAP**: TCP 389. **LDAPS**: TCP 636.

## Infrastructure services
- **DNS**: UDP 53 for queries, TCP 53 for zone transfers and large responses.
- **DHCP**: UDP 67 (server) and 68 (client).
- **NTP**: UDP 123.
- **SNMP**: UDP 161 for polling the agent, UDP 162 for traps sent to the manager.
- **Syslog**: UDP 514.
- **SQL Server**: TCP 1433. **MySQL**: TCP 3306.
- **SIP**: TCP or UDP 5060, and 5061 over TLS. Sets up voice and video calls.
- **IKE**: UDP 500 for IPsec key exchange.

## Encrypted pairs to memorize
HTTP 80 to HTTPS 443. LDAP 389 to LDAPS 636. IMAP 143 to IMAPS 993. POP3 110 to POP3S 995. SMTP 25 to SMTPS 587. Telnet 23 to SSH 22. FTP 21 to SFTP 22.

> Exam tip: a firewall question that says "allow the monitoring server to receive alerts" wants UDP 162, not 161. "Secure directory queries" is 636. "Time sync is failing" is UDP 123.`,
      hook: "22 SSH, 23 Telnet, 25/587 mail, 53 DNS, 67/68 DHCP, 80/443 web, 123 NTP, 161/162 SNMP, 389/636 LDAP, 445 SMB, 514 syslog, 3389 RDP."
    },
    {
      id: "u5l3", title: "DHCP", domain: 3, obj: "3.4", minutes: 8,
      body: `**Dynamic Host Configuration Protocol** hands out IP configuration so nobody types addresses by hand.

## The four-step exchange (DORA)
1. **Discover**: the client broadcasts "is there a DHCP server?" from 0.0.0.0 to 255.255.255.255 on UDP 67.
2. **Offer**: a server proposes an address.
3. **Request**: the client asks for that offer (broadcast, so other servers know to withdraw theirs).
4. **Acknowledge**: the server confirms and sends the lease details.

## What the server manages
- **Scope**: the range of addresses a server may hand out on one subnet, for example 192.168.1.100 to 192.168.1.200.
- **Exclusions**: addresses inside the scope that must never be leased, such as a printer that was given a static address.
- **Reservations**: a specific address always given to a specific MAC address. The device still uses DHCP, but always gets the same address. The right way to give a server or printer a fixed address while keeping central control.
- **Lease time**: how long the client may keep the address. Clients try to renew at 50 percent of the lease. Short leases suit guest networks; long leases suit stable offices.
- **Options**: extra settings delivered with the lease: default gateway (option 3), DNS servers (option 6), domain name, NTP server, and option 150 or 66 for VoIP phone provisioning.

## Crossing routers: relay and IP helper
Discover is a broadcast, and routers do not forward broadcasts. To serve many subnets from one central DHCP server, configure a **DHCP relay** (Cisco calls it an **IP helper address**) on each router interface. The router converts the broadcast into a unicast to the server and inserts the interface address so the server knows which scope to use.

## Common failures
- **Scope exhaustion**: no free addresses, new clients get APIPA. Shorten the lease or widen the scope.
- **Rogue DHCP server**: an unauthorized device answers first and hands out bad gateways. Enable DHCP snooping on switches.
- Missing relay: clients on a remote subnet never get an answer.

> Exam tip: "same address every time for this device, but managed centrally" is a reservation. "Clients on a remote subnet cannot get addresses" is a missing relay.`,
      hook: "Discover, Offer, Request, Acknowledge. Scope is the pool, exclusion removes, reservation pins to a MAC, relay crosses routers."
    },
    {
      id: "u5l4", title: "DNS", domain: 3, obj: "3.4", minutes: 10,
      body: `**Domain Name System** turns names into addresses. It is the service users blame first and the one most often actually broken.

## How a lookup works
Your device asks its configured **recursive resolver** (often the router or a provider or public resolver). If the resolver does not have the answer cached, it walks the hierarchy: a **root server** points to the **top-level domain** servers (.com), which point to the domain's **authoritative** servers, which hold the actual records. The resolver caches the answer for the record's **TTL**. An answer from cache is **non-authoritative**.

## Record types
- **A**: name to IPv4 address. **AAAA**: name to IPv6 address.
- **CNAME**: alias, one name points to another name.
- **MX**: mail exchanger, where to deliver email for the domain, with a priority number.
- **NS**: the authoritative name servers for a zone.
- **SOA**: start of authority, zone serial number and timers.
- **PTR**: pointer, IP address back to a name. Lives in the **reverse zone** ({{in-addr.arpa}}). Used by mail servers and logs.
- **TXT**: free text, used for SPF, DKIM, DMARC, and domain verification.
- **SRV**: locates services such as SIP or Active Directory by name, port, and priority.

## Zones and servers
A **forward zone** maps names to addresses; a **reverse zone** maps addresses to names. A **primary** server holds the writable copy; **secondary** servers pull copies by zone transfer over TCP 53. Authoritative servers answer for zones they hold; recursive servers answer on behalf of clients by asking others.

## Securing DNS
- **DNSSEC** signs records so a resolver can verify they were not forged. It provides integrity, not privacy.
- **DNS over HTTPS (DoH)** and **DNS over TLS (DoT)** encrypt the query between the client and the resolver so on-path observers cannot read or alter it. DoT uses TCP 853; DoH rides on 443.

## The hosts file
A local text file checked before DNS. Useful for testing; a poisoned hosts file redirects traffic silently.

> Exam tip: "can ping by IP but not by name" is a DNS problem. "Reverse lookup" is PTR. "Email to the domain" is MX. "One name to another name" is CNAME.`,
      hook: "A and AAAA for addresses, CNAME alias, MX mail, PTR reverse, TXT for SPF and verification. DNSSEC integrity, DoH and DoT privacy."
    },
    {
      id: "u5l5", title: "Time Services and Other Network Services", domain: 3, obj: "3.4", minutes: 5,
      body: `Small services keep everything else honest.

## NTP
**Network Time Protocol**, UDP 123, keeps clocks synchronized. Accuracy is described in **stratum** levels: stratum 0 is a reference clock such as GPS or an atomic clock, stratum 1 servers connect directly to one, stratum 2 sync from stratum 1, and so on. Wrong time breaks Kerberos and certificate validation, scrambles log correlation, and can fail multifactor codes. Point every device at the same internal NTP source.

## PTP
**Precision Time Protocol** (IEEE 1588) reaches sub-microsecond accuracy for trading systems, industrial control, and broadcast networks, using hardware timestamping. NTP is millisecond accuracy; PTP is when milliseconds are not good enough.

## NTS
**Network Time Security** adds authentication and encryption to NTP so an attacker cannot feed clients false time.

## SLAAC as a service
On IPv6 networks the router's advertisements are themselves a network service: they deliver the prefix, the default gateway, and optionally DNS servers, replacing much of what DHCP does in IPv4.

## Service-related troubleshooting habits
- Time skew of more than five minutes fails Kerberos authentication.
- A log with the wrong timestamps is a monitoring problem before it is a security problem.

> Exam tip: "logs from different devices cannot be correlated" or "authentication fails after a clock drift" points to NTP. "Sub-microsecond" points to PTP. "Authenticated time" points to NTS.`,
      hook: "NTP 123 for milliseconds, PTP for microseconds, NTS to secure it. Bad time breaks Kerberos, certificates, and logs."
    }
  ]
});

FRA.units.push({
  id: "u6", n: 6, title: "Switching and Wireless", domain: 2,
  blurb: "How switches learn, VLANs and trunks, spanning tree, switch features, and Wi-Fi design and security.",
  assumes: "You know ports, protocols, and how DHCP and DNS work.",
  lessons: [
    {
      id: "u6l1", title: "How Switches Work", domain: 2, obj: "2.2", minutes: 7,
      body: `A switch is a Layer 2 device that forwards frames based on MAC addresses. Understanding its three jobs explains most switch behavior on the exam.

## Address learning
When a frame arrives, the switch records the **source MAC** and the port it came in on in its **MAC address table** (also called the CAM table). Entries age out after a few minutes of silence.

## Forward or filter
The switch looks up the **destination MAC**. If it is in the table, the frame goes out only that port. If it is unknown, or if it is a broadcast or multicast, the switch **floods** the frame out every port in the same VLAN except the one it arrived on.

## Loop avoidance
Redundant links between switches would loop frames forever, because Layer 2 frames have no TTL. Spanning Tree Protocol blocks redundant paths; it gets its own lesson.

## Domains
Each switch port is its own **collision domain**, so full-duplex switched links never collide. All ports in one VLAN form one **broadcast domain**. A hub is one big collision domain; a router separates broadcast domains.

## Switch types
- **Unmanaged**: plug and play, no configuration, no VLANs.
- **Managed**: VLANs, STP, port security, monitoring, PoE control.
- **Layer 3 switch**: a managed switch that also routes between VLANs in hardware.

## Managing a switch
A **management IP** on a VLAN interface allows SSH or web access **in-band** over the network. The **console port** provides **out-of-band** access with a cable, which still works when the network is down.

> Exam tip: "the switch sends the frame out every port" means the destination MAC was unknown or the frame was a broadcast. Frames never cross a router; packets do.`,
      hook: "Learn source MACs, forward known destinations, flood unknowns and broadcasts, block loops with STP."
    },
    {
      id: "u6l2", title: "VLANs and Trunking", domain: 2, obj: "2.2", minutes: 10,
      body: `A **VLAN** (virtual LAN) splits one physical switch into several logical switches. Each VLAN is its own broadcast domain and normally its own IP subnet. VLANs group users by role instead of by location, contain broadcast traffic, and enforce security boundaries.

## Access ports and trunk ports
- An **access port** belongs to one VLAN. The host plugged in never sees VLAN tags. A port assigned to the wrong VLAN puts the host on the wrong subnet: it gets a DHCP address from the wrong scope and cannot reach its servers.
- A **trunk port** carries many VLANs between switches or to a router. Each frame is tagged with its VLAN ID using **802.1Q**, a 4-byte field inserted in the Ethernet header. The **native VLAN** is the one VLAN that crosses the trunk **untagged**; it is VLAN 1 by default and must match on both ends or traffic leaks between VLANs.

## Special VLANs
- **Voice VLAN**: a second VLAN on an access port so an IP phone tags its traffic while the PC behind it stays untagged. Lets QoS prioritize voice.
- **Management VLAN**: where switch management interfaces live, kept away from user traffic.
- **VLAN database**: the list of VLAN IDs and names on the switch; VLAN 1 exists by default and cannot be deleted, which is why best practice moves users off it.

## Routing between VLANs
Hosts in different VLANs need a router. Options:
- A **Layer 3 switch** with an **SVI** (switch virtual interface) per VLAN: {{interface vlan 10}} with the VLAN's gateway address.
- **Router on a stick**: one trunk to a router with a **subinterface** per VLAN, each tagged and addressed.

## Trunk troubleshooting
- Native VLAN mismatch: switches log an error and untagged traffic lands in the wrong VLAN.
- Allowed VLAN list missing a VLAN: hosts in that VLAN cannot reach the other switch.
- One end configured as access and the other as trunk: only the access VLAN passes.

> Exam tip: "one link carries multiple VLANs" is an 802.1Q trunk. "Phone and PC on one port" is a voice VLAN. "Wrong subnet after moving desks" is an access port in the wrong VLAN.`,
      hook: "Access port one VLAN untagged; trunk many VLANs tagged with 802.1Q; native VLAN rides untagged and must match. SVI or subinterface routes between them."
    },
    {
      id: "u6l3", title: "Spanning Tree Protocol", domain: 2, obj: "2.2", minutes: 9,
      body: `Redundant switch links are good for uptime and fatal for Layer 2 unless something blocks the loop. That something is **Spanning Tree Protocol** (STP, IEEE 802.1D).

## What a loop does
A broadcast frame circles forever, multiplying at every switch. Result: a **broadcast storm**, CPU pegged, MAC tables flapping as the same address appears on different ports, and the network becomes unusable within seconds. Symptom on the exam: "after adding a second cable between two switches, everything slowed to a crawl."

## How STP builds a tree
1. Switches exchange **BPDUs** (bridge protocol data units).
2. The switch with the lowest **bridge ID** (priority plus MAC) becomes the **root bridge**. Set the priority on your core switch so the root is not a random access switch.
3. Every other switch picks its cheapest path to the root; that port is its **root port**.
4. On each link one side is the **designated port**. Any remaining redundant port is **blocked**: it listens for BPDUs but forwards nothing.
5. If a link fails, blocked ports transition to forwarding and the tree reconverges.

## Port states
Classic STP moves a port through **blocking**, **listening**, **learning**, and **forwarding**, taking 30 to 50 seconds. **Rapid Spanning Tree** (RSTP, 802.1w) collapses this to a few seconds with states discarding, learning, forwarding, and adds **alternate** and **backup** port roles. Multiple Spanning Tree (MSTP) runs instances per VLAN group.

## Protecting the tree
- **PortFast**: skips listening and learning on host ports so PCs get link immediately. Never on switch-to-switch links.
- **BPDU guard**: shuts a PortFast port if a BPDU arrives, stopping a rogue switch from joining.
- **Root guard**: prevents a downstream switch from claiming the root role.
- **Loop guard**: protects against unidirectional link failures.

> Exam tip: broadcast storm plus a recently added redundant link means STP was disabled or misconfigured. "Which switch becomes root" is always the lowest bridge ID; lower priority wins.`,
      hook: "Lowest bridge ID is root. Root port toward root, designated per link, the rest blocked. RSTP converges in seconds. BPDU guard on host ports."
    },
    {
      id: "u6l4", title: "Switch Interface Features", domain: 2, obj: "2.2", minutes: 9,
      body: `Beyond VLANs and STP, several per-port features show up constantly in scenarios.

## Speed and duplex
Auto-negotiation should agree on speed and full duplex. If one end is hard-coded and the other is auto, the auto side falls back to half duplex: a **duplex mismatch**, showing up as late collisions, CRC errors, and terrible throughput on an otherwise working link. Fix by configuring both ends the same way.

## Link aggregation
Bundling several physical links into one logical link adds bandwidth and redundancy. **LACP** (802.3ad or 802.1AX) negotiates the bundle between devices; static mode skips negotiation. Both ends need matching speed, duplex, and VLAN settings on every member. Traffic is hashed per flow, so a single flow still uses one link.

## MTU and jumbo frames
Default Ethernet MTU is 1500 bytes. **Jumbo frames** raise it to about 9000 bytes, cutting overhead for storage and backup traffic. Every device in the path must support the same MTU; an MTU mismatch causes fragmentation or silently dropped large packets while small pings succeed.

## Power over Ethernet
Switches power access points, phones, and cameras over the data cable.
- **802.3af (PoE)**: 15.4 watts at the port, about 13 watts delivered.
- **802.3at (PoE+)**: 30 watts at the port, about 25.5 watts delivered.
- **802.3bt (PoE++)**: Type 3 gives 60 watts, Type 4 gives 90 watts, for pan-tilt cameras and Wi-Fi 6E access points.
Every switch has a total **power budget**. Devices that draw more than the port's standard or push the switch past its budget reboot or never power on.

## Port mirroring
A **SPAN** or mirror port copies traffic from one or more ports to a port where a protocol analyzer listens. It is how you capture traffic on a switched network without a tap. The mirror destination port only receives; it does not forward normal traffic.

## Port security
Limit how many MAC addresses a port may learn, or pin a specific MAC. Violations shut the port into the **error-disabled** state, which needs an administrator to clear.

> Exam tip: "AP needs 25 watts" means at least 802.3at. "Some devices at the far end of the switch will not power on" is a power budget problem. "Large transfers fail, small pings work" is an MTU mismatch.`,
      hook: "af 15.4, at 30, bt 60 or 90 watts. Duplex mismatch gives late collisions. LACP bundles, jumbo is 9000, mirror to capture."
    },
    {
      id: "u6l5", title: "Wireless Fundamentals", domain: 2, obj: "2.3", minutes: 11,
      body: `Wi-Fi is Ethernet over radio with all of radio's problems: shared airtime, interference, and range limits.

## Bands
- **2.4 GHz**: longest range, best wall penetration, most crowded. Only three non-overlapping 20 MHz channels: **1, 6, and 11**. Microwaves, Bluetooth, and neighbors all live here.
- **5 GHz**: many more channels, less interference, shorter range. Supports 40, 80, and 160 MHz channel bonding for speed. Some channels require DFS to avoid radar.
- **6 GHz**: added by Wi-Fi 6E, huge clean spectrum, shortest range, only newer clients.

## Channel width
Wider channels move more data but overlap more neighbors and pick up more noise. Use 20 MHz in dense 2.4 GHz deployments and 40 or 80 MHz on 5 GHz where the environment is quiet.

## The standards
- **802.11a**: 5 GHz, 54 Mbps. **802.11b**: 2.4 GHz, 11 Mbps. **802.11g**: 2.4 GHz, 54 Mbps.
- **802.11n (Wi-Fi 4)**: both bands, MIMO, up to 600 Mbps.
- **802.11ac (Wi-Fi 5)**: 5 GHz only, wider channels, MU-MIMO, gigabit-class.
- **802.11ax (Wi-Fi 6 and 6E)**: 2.4, 5, and 6 GHz, OFDMA for efficiency in crowded spaces.
- **802.11be (Wi-Fi 7)**: 320 MHz channels, multi-link operation.

## Identifiers
- **SSID**: the network name users see.
- **BSSID**: the MAC address of one radio on one access point.
- **ESSID**: the same SSID shared across many APs so clients can **roam** between them.

## Network types
- **Infrastructure**: clients connect through an access point. Normal Wi-Fi.
- **Ad hoc** (IBSS): devices connect directly with no AP.
- **Mesh**: APs connect to each other wirelessly to extend coverage where cabling is impractical.
- **Point-to-point**: two directional antennas link two buildings.

## Antennas and access points
**Omnidirectional** antennas radiate in all directions for general coverage. **Directional** antennas (Yagi, patch, parabolic) focus energy for long links or to cover a hallway without bleeding into the parking lot. **Autonomous** APs are configured one by one; **lightweight** APs are managed by a **wireless LAN controller**, which pushes configuration and coordinates channels and roaming.

> Exam tip: "three access points all on channel 6 and throughput is poor despite strong signal" is co-channel interference; spread them across 1, 6, and 11. "Link two buildings" is directional antennas.`,
      hook: "2.4 GHz: 1, 6, 11, long range, crowded. 5 GHz: more channels, bonding. 6 GHz: Wi-Fi 6E. SSID name, BSSID radio MAC, ESSID roaming."
    },
    {
      id: "u6l6", title: "Wireless Security and Design", domain: 2, obj: "2.3", minutes: 9,
      body: `Radio goes through walls, so wireless security is about encryption and authentication, and wireless design is about coverage and capacity.

## Encryption generations
- **WEP**: broken in minutes. Never use.
- **WPA**: interim fix using TKIP. Deprecated.
- **WPA2**: AES with CCMP. Still common and acceptable.
- **WPA3**: the current standard. Personal mode uses **SAE** (simultaneous authentication of equals) instead of a pre-shared key handshake, which stops offline password cracking. Enterprise mode offers 192-bit security.

## Personal versus Enterprise
- **Personal (PSK)**: one shared passphrase for everyone. Fine for homes; in a business one leaver means changing every device.
- **Enterprise**: **802.1X** authentication against a **RADIUS** server. Each user or device has its own credentials or certificate, access can be revoked individually, and the network can assign a VLAN per user. This is the answer whenever a question wants per-user authentication or "the strongest available."

## Guests and captive portals
A **guest network** is a separate SSID mapped to an isolated VLAN with internet-only access. A **captive portal** intercepts the first web request to show terms of use or collect a login before granting access. Often paired with an open or simple PSK network.

## Design choices
- **Site survey**: measure signal, noise, and interference before and after deployment; the output is a **heat map** showing coverage.
- Overlap adjacent AP cells by roughly 15 to 20 percent so clients roam without dropping.
- **Band steering** nudges capable clients from 2.4 GHz to 5 GHz to relieve the crowded band.
- Place APs centrally, away from metal and microwaves, and use channel planning so neighbors are on different channels.
- Client **disassociation** and poor **roaming** usually trace to weak overlap, mismatched security between APs, or too-high transmit power that makes clients cling to a distant AP.

## Things that are not security
Hiding the SSID and MAC filtering stop only casual users; both are trivially bypassed. They are hardening at best, never a substitute for WPA2 or WPA3.

> Exam tip: "each employee authenticates with their own credentials" is WPA3-Enterprise or WPA2-Enterprise with RADIUS. "Strongest personal" is WPA3 with SAE. "Visitors accept terms before browsing" is a captive portal.`,
      hook: "WPA3 with SAE for personal, Enterprise means 802.1X plus RADIUS. Survey makes a heat map. Band steering moves clients to 5 GHz. Hidden SSIDs are not security."
    }
  ]
});
