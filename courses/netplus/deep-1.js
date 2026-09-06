// NetPlus Academy deeper explanations, units 1 to 3. Opened from the "Need a deeper explanation?" button on a lesson.
// Same mini-markup as lessons, plus ``` fenced blocks for diagrams and tables and "1. " numbered steps. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u1l1: `## Start with one idea
A network is nothing more than devices that can pass data to each other. Two laptops and a cable is a network. So is the internet. Every term in this lesson is just a way of describing one of two things: **how far the network reaches**, or **who is in charge of it**.

## Reach: how far does it go?
Think of it as distances you would travel.

\`\`\`
PAN        LAN         MAN          WAN
arm's      one         one          between cities,
reach      building    city         countries, the world
\`\`\`

- **PAN**: your phone talking to your earbuds over Bluetooth. Personal space.
- **LAN**: one office, one building, one campus. Fast, and you own all the equipment. A **WLAN** is the same thing delivered by Wi-Fi instead of cables.
- **MAN**: a city. Picture a hospital with three buildings across town joined by fiber the city runs under the streets. Too big to be one LAN, too small to be a WAN.
- **WAN**: offices in Denver and Atlanta joined by circuits you rent from a carrier. The internet is the biggest WAN there is.
- **SAN**: the odd one out. A storage area network is not about distance at all. It is a separate network that connects servers to big disk arrays. "Block-level" means the server sees the storage as if it were its own hard drive, not as a shared folder.

## Control: who is in charge?
Picture a library. In a **client-server** network there is a librarian: a dedicated server that holds the files, the user accounts, and the printers. Want to change someone's password? One place. Want to back up everything? One place. That is why every business runs this way.

In a **peer-to-peer** network there is no librarian. Everyone lends books directly. Each PC shares its own folders and keeps its own list of who is allowed in. With five PCs that is fine. With fifty, every new employee needs an account on every machine, and nobody knows where the important files live. It does not scale.

## The part that trips people up
- **SAN versus NAS.** Both are storage on a network. A NAS shares folders (file-level, using SMB or NFS). A SAN presents raw disks (block-level, using iSCSI or Fibre Channel). If the question says "block-level" or "appears as a local disk," it is a SAN.
- **MAN versus WAN.** Both leave the building. If it stays inside one city, MAN. If it spans cities or countries over carrier links, WAN.
- **WAN does not mean internet.** A private WAN can be leased lines that never touch the internet.

## How the exam asks it
- "Offices in three states connected by carrier circuits" means WAN.
- "Bluetooth between a watch and a phone" means PAN.
- "Manage accounts and backups from one place" means client-server.
- "Each user shares from their own PC, security is inconsistent" means peer-to-peer.
- "Servers access disk arrays as if local, over iSCSI" means SAN.

## What to memorize
- Reach, smallest to largest: PAN, LAN, MAN, WAN.
- SAN is storage, not distance.
- Client-server centralizes. Peer-to-peer does not scale.`,

u1l2: `## Two questions about any network
A topology answers "what shape is it?" But there are two shapes to ask about. The **physical** topology is where the cables actually run. The **logical** topology is the path the data takes. Usually they match. Sometimes they do not: old Token Ring networks were wired as a star (every cable went to a central box) but the data went around in a circle from one PC to the next, so the logical topology was a ring.

## The shapes, one at a time
**Star** (also called hub and spoke). Every device gets its own cable to one central device, which today is a switch.

\`\`\`
        [PC]
          |
[PC] --[Switch]-- [PC]
          |
        [PC]
\`\`\`

Add a PC: plug in one cable. One cable breaks: one PC is down, everyone else keeps working. That is why every office LAN is a star. The weakness is the middle. If the switch dies, everyone is down. That is the single point of failure.

**Mesh.** Devices connect to each other, not through a middle. **Full mesh** links every pair. Maximum redundancy: any link can fail and there is still a path. The cost is the number of links. Each of n devices needs a link to the other n minus 1 devices. That counts every link twice (A to B and B to A), so divide by two.

\`\`\`
Devices   Links needed (n x (n-1) / 2)
   3         3
   4         6
   5        10
   6        15
   8        28
  10        45
\`\`\`

Nobody builds a full mesh of 50 offices; 1,225 links. So real WANs use **partial mesh**: the important sites get redundant links, the small ones get one.

**Point-to-point.** One link, two ends. A wireless bridge from one roof to another. A leased line between two offices.

**Point-to-multipoint.** One center talks to many, but those many do not talk to each other directly. A Wi-Fi access point and its clients.

**Ring.** Each device connects to its two neighbors and data circles around. One break stops the ring unless there is a second ring going the other way.

**Bus.** One long cable everyone taps into, with a terminator at each end that soaks up the signal. Remove a terminator or cut the cable anywhere and the whole segment dies. Legacy.

**Hybrid.** Any combination. A star in each building with a partial mesh between buildings is a hybrid, and that describes almost every real network.

## The part that trips people up
Questions usually describe a property and want the shape.
- "Most fault tolerant" or "no single link failure can isolate a site": full mesh.
- "Easiest to add devices and troubleshoot": star.
- "One cable break brings down the whole segment": bus (or a single ring).
- "A single point of failure at the center": star. The star is easy to manage and also has a single point of failure. Both are true.
- "Two buildings connected by a directional wireless link": point-to-point.

## What to memorize
- Star: one center, one cable per device, the center is the weak point.
- Full mesh links: n(n-1)/2.
- Bus and single ring: one break, everyone down.
- Physical is the wiring, logical is the data path.`,

u1l3: `## Why layers of switches?
A network with 40 people can be one switch. A network with 4,000 people cannot, so designers split it into tiers where each tier has one job. Think of roads: neighborhood streets, main roads, and the highway.

## The three-tier design
\`\`\`
              [ Core ]            highway: fast, no stoplights
             /        \\
   [ Distribution ] [ Distribution ]   main roads: rules, routing between VLANs
    /    |    \\        /    |    \\
 [Acc] [Acc] [Acc]  [Acc] [Acc] [Acc]  neighborhood streets: where devices plug in
\`\`\`

- **Access layer**: the switches your PC, phone, and access point plug into. They give you a port, power over Ethernet, and a VLAN assignment.
- **Distribution layer**: gathers up the access switches and applies policy. Access control lists, quality of service, and routing between VLANs live here.
- **Core layer**: moves traffic between distribution blocks as fast as possible. No policy, no filtering, just speed. Anything that slows the core slows everyone.

## Collapsed core
A medium-sized company does not need three tiers. It merges the core and distribution into one pair of big switches. Cheaper and simpler. The trade-off is that it will not grow as far.

## Spine and leaf
Data centers have a different problem: servers talk to other servers constantly. The three-tier design sends that traffic up and down, which adds hops and unpredictability. Spine and leaf fixes it with a rule: **every leaf connects to every spine, and leaves never connect to leaves.**

\`\`\`
     [Spine 1]      [Spine 2]
       / | \\          / | \\
      /  |  \\        /  |  \\
 [Leaf A][Leaf B][Leaf C]   (each leaf has a link to EVERY spine)
   |        |       |
 servers  servers  servers
\`\`\`

Any server to any other server is exactly two hops: up to a spine, down to a leaf. Need more capacity? Add a spine. Need more ports? Add a leaf. Bandwidth stays predictable because every path is the same length.

## North-south and east-west
Picture the data center as a box.
- **North-south** traffic enters or leaves the box: a user on the internet loading a web page. It crosses the perimeter firewall.
- **East-west** traffic moves sideways inside the box: the web server asking the database server for data. In modern applications most traffic is east-west, which is exactly why spine and leaf exists.

## How the exam asks it
- "Where do ACLs and inter-VLAN routing belong" means distribution.
- "Every access switch connects to every upper switch, and switches in the same tier never connect": spine and leaf.
- "Small business wants fewer devices": collapsed core.
- "Traffic between servers in the same data center": east-west.

## What to memorize
- Access plugs in, distribution decides, core moves.
- Spine and leaf: two hops, every leaf to every spine, built for east-west.`,

u2l1: `## Why the OSI model exists
Seven layers sounds abstract, but the point is simple: it gives everyone the same vocabulary. When a colleague says "it is a Layer 2 problem," they mean switching and MAC addresses. "Layer 3 device" means a router. The exam uses that vocabulary constantly, so learn to translate.

## An analogy: mailing a letter
- The **letter** is your data.
- The **apartment number** on the envelope says which person in the building gets it. That is a port number (Layer 4, next lesson).
- The **street address** says which building. That is the IP address (Layer 3). It never changes on the trip.
- The **truck** that carries it from one post office to the next is different on every leg of the journey. That is the frame and its MAC addresses (Layer 2). They change at every hop.
- The **road** the truck drives on is Layer 1.

## Layer 1, Physical: bits on a wire
Cables, connectors, fiber, radio, voltage levels, hubs, and repeaters. The unit of data is a **bit**. Nothing here understands addresses. A hub is a Layer 1 device because it just repeats electrical signals out every port. Symptoms of a Layer 1 problem: no link light, a cable that is too long, interference, the wrong connector.

## Layer 2, Data Link: frames and MAC addresses
A **frame** is the package that travels on one local segment. It is addressed with **MAC addresses**, the 48-bit hardware addresses burned into every network card. **Switches** live here: they read the destination MAC and send the frame out the right port. Ethernet and Wi-Fi are Layer 2 technologies.

Two sub-parts you may be asked about: the **MAC sublayer** handles addressing and who may talk when (that is where CSMA/CD lived), and the **LLC sublayer** labels which upper protocol is inside so the receiver knows what to hand it to. The frame ends with a **frame check sequence** that lets the receiver detect corruption.

Symptoms of Layer 2 problems: MAC table trouble, VLAN mismatches, spanning tree loops, duplex mismatches.

## Layer 3, Network: packets and IP addresses
A **packet** carries data between different networks. It is addressed with **IP addresses**, which are logical: assigned by configuration, not burned in. **Routers** live here. They read the destination IP and choose the next hop. IP, ICMP (what ping uses), and routing protocols are Layer 3.

Symptoms: wrong default gateway, wrong subnet mask, a missing route.

## The part that trips people up: what changes on the trip
\`\`\`
[PC A] ---- [Router 1] ---- [Router 2] ---- [Server B]

Hop 1 frame:  src MAC = A,   dst MAC = R1  | packet: src IP A, dst IP B
Hop 2 frame:  src MAC = R1,  dst MAC = R2  | packet: src IP A, dst IP B   (unchanged)
Hop 3 frame:  src MAC = R2,  dst MAC = B   | packet: src IP A, dst IP B   (unchanged)
\`\`\`

Every router throws away the old frame and builds a new one with new MAC addresses. The packet inside, with its IP addresses, rides through untouched (unless NAT is involved, which is a later lesson). So: MAC addresses are local and temporary, IP addresses are end to end.

## Keyword translation for questions
\`\`\`
If the question says...            think layer
hub, repeater, cable, connector,      1
bits, signal, link light
switch, frame, MAC, VLAN, FCS,        2
hardware address, duplex
router, packet, IP, ICMP, ping,       3
default gateway, subnet, routing,
logical address, TTL
\`\`\`

## What to memorize
- 1 bits and cables (hub). 2 frames and MACs (switch). 3 packets and IPs (router).
- MAC changes every hop. IP stays the same.`,

u2l2: `## The upper layers in one sentence each
- Layer 4 delivers data to the right **program** on a host.
- Layer 5 keeps a **conversation** organized.
- Layer 6 makes sure both sides **read the data the same way**, and encrypts it.
- Layer 7 is the **protocol the application actually speaks**.

## Layer 4, Transport: ports, and reliable versus fast
A host runs many programs at once. When a packet arrives, something has to say which program gets it. That is the **port number**. A web server listens on port 80, a mail server on 25. In the mailing analogy, the port is the apartment number inside the building.

Layer 4 also decides how careful to be:
- **TCP** is a phone call. Before talking, the two sides set up the call with the **three-way handshake**: SYN ("can we talk?"), SYN-ACK ("yes, can you hear me?"), ACK ("yes"). Every piece of data is numbered and acknowledged. Anything lost is resent. A receive window slows a fast sender so it does not flood a slow receiver. Web, email, and file transfers use TCP because a missing byte would corrupt the file.
- **UDP** is a postcard. No setup, no acknowledgment, no ordering. Fast and light. Voice, video, DNS lookups, and DHCP use UDP because a late packet is worse than a lost one, or because the application checks for itself.

The unit of data is a **segment** for TCP and a **datagram** for UDP.

## Layer 5, Session: the conversation
Sets up, maintains, and tears down a dialog between two applications. Keeping the audio and video streams of a call in step is session work. The exam rarely goes deeper than recognizing the name.

## Layer 6, Presentation: format and encryption
Both sides must agree on what the bytes mean: character encoding (ASCII, Unicode), image and video formats (JPEG, MPEG), compression, and **encryption**. When a question mentions TLS encrypting data, JPEG formatting, or ASCII versus Unicode, the answer is Presentation.

## Layer 7, Application: what programs speak
Not the program itself, but the protocol it uses: HTTP, HTTPS, SMTP, DNS, DHCP, FTP, SSH, SNMP, Telnet. Devices that inspect this content, such as a **proxy** or a **web application firewall**, work at Layer 7.

## The part that trips people up
- "HTTPS is Layer 7, so why is TLS Layer 6?" Answer by what the question is really about. If it is about the encryption or the formatting of the data itself: Layer 6. If it is about the service or protocol being used: Layer 7.
- **Firewalls appear at more than one layer.** A firewall that filters by port number works at Layer 4. A next-generation firewall or proxy that reads URLs works at Layer 7.
- **Ports always point to Layer 4.** If the question mentions a port number, the layer is 4.

## Mnemonics
Bottom up: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way. Top down: **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.

## Keyword translation
\`\`\`
port number, TCP, UDP, segment,          4
handshake, flow control
session, dialog, keep streams in step    5
encryption, TLS, compression,            6
JPEG, ASCII, formatting
HTTP, SMTP, DNS, FTP, SSH, proxy, WAF    7
\`\`\`

## What to memorize
- SYN, SYN-ACK, ACK. TCP reliable, UDP fast.
- Ports at 4, encryption and formatting at 6, named protocols at 7.`,

u2l3: `## The one picture to hold in your head
Data does not travel naked. Each layer wraps it in its own envelope, and the receiver opens the envelopes in reverse order. Wrapping is **encapsulation**. Unwrapping is **decapsulation**.

\`\`\`
Sending (top down)                          Receiving (bottom up)
[ data ]                                     [ data ]
[ TCP/UDP header | data ]        segment     open the port envelope
[ IP header | segment ]          packet      open the address envelope
[ Ethernet | packet | FCS ]      frame       open the MAC envelope
0101101001...                    bits
\`\`\`

## What each envelope adds
\`\`\`
Layer   Name of the unit       What the header adds
7-5     data                   nothing you need to name
4       segment (TCP)          source port, destination port
        datagram (UDP)
3       packet                 source IP, destination IP, TTL
2       frame                  source MAC, destination MAC; trailer has the FCS
1       bits                   voltages, light, or radio
\`\`\`

The **TTL** (time to live) is a counter in the IP header. Every router subtracts one. When it reaches zero the packet is thrown away. That stops a packet from circling forever if there is a routing loop, and traceroute uses it on purpose to find each hop.

## Reading a packet capture
Wireshark shows the envelopes from the outside in, because that is the order they arrive:
1. Ethernet header: source and destination MAC.
2. IP header: source and destination IP, TTL.
3. TCP or UDP header: source and destination port.
4. The application payload, such as the HTTP request.

If a question asks which header holds a MAC address, IP address, or port, you now know which envelope to point at.

## Sizes: MTU and jumbo frames
The **MTU** (maximum transmission unit) is the biggest payload one frame can carry. Standard Ethernet: **1500 bytes**. A packet bigger than that must be chopped into pieces (fragmentation) or dropped. **Jumbo frames** raise the limit to about **9000 bytes** so big transfers, such as backups and storage traffic, need fewer envelopes. Every device on the path must agree on the size. The classic symptom of a mismatch: small pings work, large transfers hang.

## The TCP/IP model
The protocols were actually built on a four-layer model, and questions may use either. Translate:

\`\`\`
TCP/IP model        OSI layers
Application         7, 6, 5
Transport           4
Internet            3
Network Access      2, 1   (also called Link)
\`\`\`

## How the exam asks it
- "At which layer is the data called a segment?" Layer 4.
- "Which field prevents a packet from looping forever?" TTL.
- "Ping works but file copies stall": MTU mismatch.
- "In the TCP/IP model, which layer maps to OSI Layers 1 and 2?" Network Access.

## What to memorize
- Data, segment, packet, frame, bits.
- Ports at 4, IPs and TTL at 3, MACs at 2.
- MTU 1500, jumbo about 9000.`,

u3l1: `## Why the wires are twisted
Electric signals pick up noise from anything nearby: power lines, motors, fluorescent lights. Twisting each pair of wires makes the noise hit both wires equally, and the receiver cancels it out. That is the whole idea behind twisted pair. **UTP** (unshielded) relies on the twist alone and is the default everywhere. **STP** (shielded) adds foil or braid for noisy places such as factory floors.

The plug on the end is the **RJ45** (technically 8P8C: eight positions, eight contacts). The smaller phone plug with fewer contacts is **RJ11**.

## The categories: what changes between them
Each category is rated for a higher frequency, which is what lets it carry more data. Higher categories have tighter twists and better insulation.

\`\`\`
Category   Speed            Distance         Note
Cat 5e     1 Gbps           100 m            the minimum for gigabit
Cat 6      1 Gbps           100 m
           10 Gbps          55 m only        runs out of steam for 10G
Cat 6A     10 Gbps          100 m            the 10G answer
Cat 7      10 Gbps          100 m            shielded, odd connectors, rare in the US
Cat 8      25 or 40 Gbps    30 m             short data center hops
\`\`\`

Every twisted-pair Ethernet run is limited to **100 meters** (328 feet), and that includes the patch cords at both ends. The usual split is 90 m in the wall plus 5 m of patch cord at each end.

## T568A and T568B: which wire goes to which pin
Both standards put the same eight wires on the same eight pins, with one difference: **the orange and green pairs are swapped**.

\`\`\`
Pin   T568B            T568A
1     white/orange     white/green
2     orange           green
3     white/green      white/orange
4     blue             blue
5     white/blue       white/blue
6     green            orange
7     white/brown      white/brown
8     brown            brown
\`\`\`

- Same standard on both ends: a **straight-through** cable. PC to switch. This is almost every cable you will ever touch.
- Different standard on each end: a **crossover** cable. It swaps the transmit and receive pairs, for connecting two of the same kind of device, such as switch to switch, on old equipment. Modern ports have **auto-MDIX**, which detects the situation and swaps internally, so crossover cables have mostly disappeared.

## Coax and twinax
- **Coax** carries cable modem and TV signals. The screw-on **F-type** connector is what you see today; **BNC** is the bayonet twist connector from old LANs. **RG-6** is the modern grade.
- **Twinaxial**, sold as a **direct attach cable (DAC)**, is a short thick cable with transceivers permanently attached at both ends. It links a switch to a server a few meters away at 10 to 100 Gbps for less money than fiber optics.

## Plenum and riser
The **plenum** is the air space above a drop ceiling or under a raised floor that the building's ventilation uses. Burning PVC cable there would pump toxic smoke through the whole building, so code requires **plenum-rated** cable with a low-smoke jacket. **Riser-rated** cable is for vertical runs between floors, where the concern is fire climbing the shaft.

## How the exam asks it
- "10 Gbps at the full 100 meters": Cat 6A.
- "Cable runs above the ceiling tiles": plenum.
- "A 120-meter run links intermittently": attenuation; add a switch or repeater in the middle, or use fiber.
- "Which pins does the orange pair use in T568B": 1 and 2.
- "Connect two switches without auto-MDIX": crossover.

## What to memorize
- Copper stops at 100 m. Cat 6A for 10 Gbps at 100 m.
- T568B: orange on 1 and 2, green on 3 and 6. A and B differ only by swapping those pairs.
- Plenum above the ceiling, riser between floors.`,

u3l2: `## Light instead of electricity
Fiber carries pulses of light down a glass core. Light does not care about electrical noise, so fiber works next to motors and power lines, and it goes much farther than copper before the signal fades. The trade-offs are cost and fragility: glass does not like tight bends or dirt.

## Two kinds of glass, and why distance differs
\`\`\`
Single-mode (SMF)                   Multimode (MMF)
core about 9 microns                core 50 or 62.5 microns
laser, one straight path            LED or cheap laser, many bouncing paths
10 km and beyond                    about 300 to 550 m at 10 Gbps
yellow jacket                       orange (OM1, OM2) or aqua (OM3, OM4)
between buildings, across cities    inside a building or data center
\`\`\`

Why does multimode run out sooner? Its wide core lets light take many paths, some straight, some bouncing off the walls. The bouncing paths are longer, so parts of the same pulse arrive at slightly different times. Over distance the pulses smear into each other and the receiver cannot tell them apart. Single-mode's tiny core allows only one path, so the pulse stays sharp for kilometers.

You cannot patch single-mode to multimode directly; the core sizes do not line up. Use a **media converter**.

## Connectors, with memory hooks
- **LC**: the small square one, two of them side by side on a transceiver. "Little connector." The modern default.
- **SC**: bigger square push-pull. "Square" or "stick and click." Older gear and patch panels.
- **ST**: round with a bayonet twist. "Stick and twist." Legacy.
- **MPO/MTP**: one plug carrying 12 or 24 fibers. Used for 40 and 100 gigabit links that need several strands at once.

Polish matters too. **UPC** connectors are flat and blue. **APC** connectors are cut at an angle and green; the angle bounces reflections away from the source, which long-haul and passive optical networks need. Never mate a UPC to an APC: the faces do not touch properly and the link fails.

## Media converters
A media converter changes the medium without touching the data: copper to fiber, or multimode to single-mode. Use one when a copper link needs to cover more than 100 meters, or to join two fiber types.

## How the exam asks it
- "Two buildings 2 km apart": single-mode.
- "Within the data center, 200 meters": multimode is cheaper.
- "Small connector on an SFP+ module": LC.
- "Green connector will not link to a blue one": APC to UPC mismatch.
- "Extend a copper run 400 meters": media converter to fiber.

## What to memorize
- Single-mode: small core, laser, kilometers, yellow. Multimode: big core, hundreds of meters, orange or aqua.
- LC small, SC square, ST twist, MPO many fibers. UPC blue flat, APC green angled.`,

u3l3: `## The plug that decides what the port is
Modern switches have empty cages instead of fixed ports. You slide in a **transceiver** that decides whether the port is copper or fiber, short reach or long reach. Swap the module, change the port.

\`\`\`
Form factor     Speed        Lanes
SFP             1 Gbps       1
SFP+            10 Gbps      1     (same size as SFP)
QSFP / QSFP+    40 Gbps      4     (Q = quad)
QSFP28          100 Gbps     4 x 25
QSFP-DD, OSFP   400 Gbps
\`\`\`

Both ends of a link must match: same speed, same wavelength, same fiber type. A short-reach module on one end and a long-reach module on the other will not link. Neither will a single-mode module plugged into multimode fiber.

## Decoding an Ethernet standard name
The names look cryptic until you know the pattern: **speed, BASE, medium code**.

\`\`\`
10GBASE-SR
 |    |   |
 10G  |   S = short reach, multimode
      BASE = baseband (always)
\`\`\`

The letter after the dash tells you the medium:
- **T**: twisted pair copper.
- **S**: short reach over multimode fiber.
- **L**: long reach over single-mode fiber.
- **E**: extended reach over single-mode.

\`\`\`
Standard        Speed     Medium        Reach
1000BASE-T      1 Gbps    Cat 5e+       100 m
10GBASE-T       10 Gbps   Cat 6A        100 m (Cat 6: 55 m)
1000BASE-SX     1 Gbps    multimode     about 550 m
1000BASE-LX     1 Gbps    single-mode   10 km
10GBASE-SR      10 Gbps   multimode     about 300 m (400 m on OM4)
10GBASE-LR      10 Gbps   single-mode   10 km
10GBASE-ER      10 Gbps   single-mode   40 km
\`\`\`

## How Ethernet shares a wire: CSMA/CD
On old shared Ethernet, everyone was on one cable, so two devices could talk at once and garble each other: a **collision**. The rule was **CSMA/CD**: listen before sending (carrier sense), anyone may send (multiple access), and if you detect a collision, stop, wait a random moment, and try again (collision detection). Switched full-duplex links give every device its own private lane, so collisions cannot happen and CSMA/CD is effectively retired.

## Duplex, and the mismatch that will not go away
Think of a walkie-talkie versus a phone. **Half duplex** is the walkie-talkie: one side talks at a time. **Full duplex** is the phone: both talk at once.

Both ends of a link should agree, and normally **auto-negotiation** sorts it out. The classic mistake: one side is hard-coded to full duplex and the other is left on auto. Auto-negotiation needs both sides to participate; when one side is silent, the auto side falls back to half duplex. Now one end thinks it is a phone call and the other thinks it is a walkie-talkie. The result is **late collisions** and **CRC errors**, and a link that works but crawls. Fix: configure both ends the same way.

## MAC addresses
A MAC address is 48 bits, written as 12 hex digits such as {{3C:52:82:1A:9F:07}}. The first 24 bits (first six hex digits) are the **OUI**, which identifies the manufacturer. The rest is unique to the card. It is burned in at the factory and only matters on the local segment.

## How the exam asks it
- "10 Gbps to a server 250 m away over existing multimode": 10GBASE-SR.
- "Link is up but shows late collisions and CRC errors": duplex mismatch.
- "Which module for 100 Gbps": QSFP28.
- "SR module, single-mode fiber, no link": mismatch.
- "First six hex digits of a MAC": the manufacturer's OUI.

## What to memorize
- SFP 1G, SFP+ 10G, QSFP 40G, QSFP28 100G.
- S short and multimode, L long and single-mode, T twisted pair.
- Duplex mismatch = late collisions and CRC errors.`,

u3l4: `## Four ways to address a message
Every packet is meant for one host, some hosts, or all hosts. Real-life versions:

- **Unicast**: a letter to one person. Web browsing, email, file transfers. Almost all traffic.
- **Broadcast**: the fire alarm in a building. Everyone in the building hears it, and it stops at the walls. On a network the "walls" are routers: they never forward a broadcast. ARP ("who has this IP?") and DHCP Discover ("is there a DHCP server?") are broadcasts, because the sender does not yet know who to ask. A subnet is therefore also a **broadcast domain**.
- **Multicast**: a radio station. The sender transmits once, and only receivers that tuned in get it. Efficient for video streams and for routing protocols talking to each other (OSPF uses 224.0.0.5 and 224.0.0.6). IPv4 multicast addresses are the Class D range, 224.0.0.0 through 239.255.255.255.
- **Anycast**: one phone number for a pizza chain that always rings the nearest store. Many servers share one address and the network delivers each request to the closest one. DNS root servers and content delivery networks use it so everyone gets a nearby, fast answer.

\`\`\`
Unicast     one   -> one
Broadcast   one   -> everyone on the segment (routers stop it)
Multicast   one   -> the group that subscribed
Anycast     one   -> the nearest of several sharing an address
\`\`\`

One more fact that surprises people: **IPv6 has no broadcast at all**. It uses multicast for everything broadcast used to do.

## Wireless media, briefly
- **802.11 Wi-Fi** uses unlicensed spectrum at 2.4, 5, and 6 GHz. There is a whole unit on it later.
- **Cellular** (4G LTE, 5G) is the carrier's network. Used for phones, as a backup WAN link, and for sites where no wire is available.
- **Satellite** reaches anywhere with a view of the sky. Traditional geostationary satellites sit about 36,000 km up, so a signal goes up and back down twice (you to satellite to ground station and back), which adds roughly 500 to 600 ms of delay. That is why voice calls over satellite feel awkward. Low-earth-orbit constellations fly much lower and cut the delay dramatically. Rain and snow can degrade either.

## How the exam asks it
- "Delivered to the closest of many servers sharing one address": anycast.
- "Sent to every host on the local segment, not forwarded by routers": broadcast.
- "Only hosts that joined the group receive it": multicast.
- "Remote site with high latency on voice calls": satellite.
- "Which protocol has no broadcast": IPv6.

## What to memorize
- Unicast one, broadcast all (local only), multicast the group, anycast the nearest.
- Multicast range 224 to 239. Satellite adds about half a second.`

});
