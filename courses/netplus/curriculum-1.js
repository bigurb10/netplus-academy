// NetPlus Academy curriculum, units 1 to 3. Original teaching content for CompTIA Network+ N10-009.
// Lesson body mini-markup: "## " heading, "- " bullet, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Networking Foundations", domain: 1,
  blurb: "What a network is, the shapes networks take, and how large networks are organized.",
  assumes: "Nothing. Start here if you are new to networking.",
  lessons: [
    {
      id: "u1l1", title: "Networks and Their Types", domain: 1, obj: "1.6", minutes: 6,
      body: `A network is two or more devices that can exchange data. Everything on the exam builds on a few ways of describing networks: by how far they reach and by who is in charge.

## Networks by reach
- **LAN** (local area network): one building or campus, high speed, owned by one organization.
- **WLAN**: a LAN delivered over Wi-Fi.
- **WAN** (wide area network): connects LANs across cities or countries, usually over links leased from a provider. The internet is the largest WAN.
- **MAN**: a metro-sized network, bigger than a LAN, smaller than a WAN.
- **PAN**: a personal-scale network such as Bluetooth between a phone and headphones.
- **SAN**: a storage area network that gives servers block-level access to disk arrays, separate from the user network.

## Networks by control
- **Client-server**: dedicated servers hold resources and enforce access. Scales well and is what you will see in business.
- **Peer-to-peer**: every host shares and consumes directly. Cheap, but every device manages its own security, so it does not scale.

> Exam tip: when a question describes centralized authentication, file storage, or "one place to manage users," the answer involves a client-server design.`,
      hook: "Reach: PAN < LAN < MAN < WAN. Control: client-server centralizes, peer-to-peer distributes."
    },
    {
      id: "u1l2", title: "Physical and Logical Topologies", domain: 1, obj: "1.6", minutes: 8,
      body: `A topology is the shape of a network. The **physical** topology is how cables actually run. The **logical** topology is how data flows. They can differ: a modern office is a physical star wired to a switch, and it behaves logically like a star too, but old Token Ring was a physical star with a logical ring.

## The shapes you must recognize
- **Star** (also called **hub and spoke**): every device connects to one central device. Easy to add or remove hosts and one cable fault affects one host, but the center is a single point of failure. This is the standard LAN design.
- **Mesh**: devices interconnect with each other. **Full mesh** links every pair, which gives maximum redundancy but the link count explodes: n(n-1)/2 links for n devices, so 6 devices need 15 links. **Partial mesh** links only the important pairs. WAN cores and wireless mesh systems use partial mesh.
- **Point-to-point**: one direct link between two endpoints, such as a leased line between two offices or a wireless bridge between buildings.
- **Point-to-multipoint**: one central endpoint talks to many, such as a wireless access point serving clients.
- **Ring**: each device connects to two neighbors. A single break can stop the ring unless a second counter-rotating ring exists.
- **Bus**: one shared cable with terminators at each end. A single break kills everyone. Legacy only.
- **Hybrid**: any combination, which describes almost every real network.

> Exam tip: "the most fault tolerant" means full mesh. "The easiest to troubleshoot and expand" means star. "A single cable break brings down the whole segment" means bus or a single ring.`,
      hook: "Star = one center; mesh = redundancy with n(n-1)/2 links; bus and ring die from one break."
    },
    {
      id: "u1l3", title: "Enterprise Architectures and Traffic Flow", domain: 1, obj: "1.6", minutes: 8,
      body: `Large networks are organized in layers so that each layer has one job.

## The three-tier hierarchy
- **Access layer**: where end devices plug in. Access switches provide ports, PoE, and VLAN assignment.
- **Distribution layer**: aggregates access switches, applies policy such as ACLs and QoS, and routes between VLANs.
- **Core layer**: a fast, simple backbone that moves traffic between distribution blocks. No policy, just speed.

## Collapsed core
Small and medium networks merge the core and distribution layers into one pair of devices. Cheaper and simpler, at the cost of scalability.

## Spine and leaf
Data centers use a two-tier fabric. Every **leaf** switch (where servers connect) links to every **spine** switch, and leaves never connect to leaves. Any server can reach any other in exactly two hops, so bandwidth is predictable and the fabric grows by adding spines or leaves. It is built for traffic that moves sideways between servers.

## Traffic flows
- **North-south**: traffic entering or leaving the data center, for example a user reaching a web server. It crosses the perimeter and the firewall.
- **East-west**: traffic between servers inside the data center, for example a web server querying a database. In modern applications most traffic is east-west, which is why spine and leaf exists.

> Exam tip: "every access switch connects to every upper switch and same-tier switches never connect" is the textbook description of spine and leaf.`,
      hook: "Access plugs in, distribution decides, core moves. Spine-leaf: two hops, built for east-west."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "The OSI Model", domain: 1,
  blurb: "The seven-layer map the exam uses to describe every protocol, device, and problem.",
  assumes: "You know what a LAN, a WAN, and a switch are.",
  lessons: [
    {
      id: "u2l1", title: "Layers 1 to 3: Physical, Data Link, Network", domain: 1, obj: "1.1", minutes: 8,
      body: `The OSI model is a seven-layer description of how data moves from an application on one host to an application on another. The exam uses it as a common language: a "Layer 2 problem" is a switching or MAC address problem, a "Layer 3 device" is a router. Learn the lower three layers first because most hands-on troubleshooting lives there.

## Layer 1, Physical
Bits on a wire, fiber, or radio. Cables, connectors, hubs, repeaters, transceivers, voltage levels, and radio frequencies. The unit of data is the **bit**. Problems here: bad cable, wrong connector, no link light, interference.

## Layer 2, Data Link
Moves **frames** between devices on the same network segment using **MAC addresses**. Switches and network cards live here, as do Ethernet and Wi-Fi (802.11) framing. It has two sublayers: **MAC** (addressing and media access, such as CSMA/CD) and **LLC** (identifies which upper protocol is inside). Error detection with the frame check sequence happens here. Problems: MAC table issues, VLAN mismatches, spanning tree loops, duplex mismatches.

## Layer 3, Network
Moves **packets** between different networks using logical addresses, meaning **IP addresses**. Routers and Layer 3 switches operate here. IP, ICMP (used by ping), and routing protocols are Layer 3. Problems: wrong default gateway, wrong subnet mask, missing route.

> Exam tip: a MAC address is rewritten at every router hop; an IP address stays the same end to end. If a question says "hardware address" or "frame," think Layer 2. If it says "logical address," "packet," or "routing," think Layer 3.`,
      hook: "1 bits and cables, 2 frames and MACs (switch), 3 packets and IPs (router)."
    },
    {
      id: "u2l2", title: "Layers 4 to 7: Transport to Application", domain: 1, obj: "1.1", minutes: 8,
      body: `The upper layers turn a stream of packets into something an application can use.

## Layer 4, Transport
End-to-end delivery between processes, identified by **port numbers**. **TCP** provides reliable, ordered delivery with acknowledgments, the three-way handshake (SYN, SYN-ACK, ACK), flow control, and retransmission. **UDP** is connectionless and fast with no delivery guarantee. The unit is the **segment** (TCP) or **datagram** (UDP). Firewalls that filter by port are working at Layer 4.

## Layer 5, Session
Sets up, maintains, and tears down conversations between applications. Think of the "dialog control" between two hosts, such as keeping several streams of a video call in step. Exam questions rarely go deep here.

## Layer 6, Presentation
Formats data so both sides understand it: character encoding, compression, and **encryption**. When a question mentions TLS encryption, JPEG or MPEG formats, or ASCII versus Unicode, the answer is Presentation.

## Layer 7, Application
The interface between the network and the software people use. HTTP, HTTPS, SMTP, DNS, DHCP, FTP, SSH, SNMP, and Telnet are all Application layer protocols. A **proxy** or a **web application firewall** inspects traffic at this layer.

## Mnemonics
Bottom up: Please Do Not Throw Sausage Pizza Away. Top down: All People Seem To Need Data Processing.

> Exam tip: "port number" always points to Layer 4. "Encryption, compression, or formatting" points to Layer 6. A named protocol a user runs, such as HTTP or SMTP, is Layer 7.`,
      hook: "4 ports and segments, 5 sessions, 6 formatting and encryption, 7 the protocols users touch."
    },
    {
      id: "u2l3", title: "Encapsulation, PDUs, and the TCP/IP Model", domain: 1, obj: "1.1", minutes: 7,
      body: `Data does not travel as one blob. Each layer wraps the data from the layer above in its own header. That wrapping is **encapsulation**; unwrapping at the receiver is **decapsulation**.

## Protocol data units, top to bottom
- Layers 7 to 5: **data**
- Layer 4: **segment** (TCP) or **datagram** (UDP), header adds source and destination **ports**
- Layer 3: **packet**, header adds source and destination **IP addresses** and a **TTL** (time to live) that drops by one at each router
- Layer 2: **frame**, header adds source and destination **MAC addresses**, trailer adds the frame check sequence
- Layer 1: **bits**

## Sizes that matter
The **MTU** (maximum transmission unit) is the largest payload a frame can carry, 1500 bytes on standard Ethernet. Packets bigger than the MTU are fragmented or dropped. **Jumbo frames** raise the MTU to about 9000 bytes on links that support it, which helps storage and backup traffic.

## The TCP/IP model
The four-layer TCP/IP model is what the protocols were actually built on: **Application** (OSI 5 to 7), **Transport** (OSI 4), **Internet** (OSI 3), and **Network Access** or Link (OSI 1 and 2). Questions may use either model, so be able to translate.

> Exam tip: when reading a packet capture, the outermost header is the frame (MACs), then the IP header (addresses, TTL), then the TCP or UDP header (ports), then the application payload. That order is encapsulation in reverse.`,
      hook: "Data, segment, packet, frame, bits. Ports at 4, IPs at 3, MACs at 2. MTU 1500, jumbo 9000."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Media, Connectors, and Ethernet", domain: 1,
  blurb: "Copper, fiber, transceivers, Ethernet standards, and the four ways traffic is addressed.",
  assumes: "You can name the OSI layers and know that switches use MAC addresses.",
  lessons: [
    {
      id: "u3l1", title: "Copper Cabling and Connectors", domain: 1, obj: "1.5", minutes: 9,
      body: `Most LAN connections still run over copper. Know the cable types, their limits, and the connector on each.

## Twisted pair
Four pairs of wires twisted to cancel interference. **UTP** (unshielded) is the default. **STP** (shielded) adds foil or braid for noisy environments such as factory floors. The connector is the **RJ45** (8P8C). Telephone lines use the smaller **RJ11**.
- **Cat 5e**: 1 Gbps to 100 meters.
- **Cat 6**: 1 Gbps to 100 meters, 10 Gbps only to 55 meters.
- **Cat 6A**: 10 Gbps to the full 100 meters.
- **Cat 7**: shielded, 10 Gbps, uses non-RJ45 connectors, rare in the US.
- **Cat 8**: 25 or 40 Gbps to 30 meters, meant for short data center runs.
All twisted-pair Ethernet is limited to **100 meters** (328 feet) per run including patch cords.

## Wiring standards
**T568A** and **T568B** define which pair goes to which pin. Same standard on both ends is a **straight-through** cable (host to switch). Different standards on each end is a **crossover** cable (switch to switch or host to host on older gear without auto-MDIX). In T568B the orange pair is on pins 1 and 2 and the green pair on pins 3 and 6.

## Coaxial and twinaxial
**Coax** carries cable modem and video signals over an **F-type** screw connector; older LANs used **BNC**. RG-6 is the modern coax grade. **Twinaxial**, sold as a **direct attach cable (DAC)**, has transceivers permanently attached at both ends and links switches to servers over a few meters at 10 to 100 Gbps. It is cheaper than optics for short distances.

## Ratings
**Plenum-rated** cable has a fire-resistant, low-smoke jacket and is required in air-handling spaces such as above drop ceilings. **Riser-rated** is for vertical runs between floors. Non-plenum PVC is fine inside walls of a single floor.

> Exam tip: a run longer than 100 meters that flaps or fails to link is attenuation; the fix is a switch or repeater in the middle, or fiber. "Above the ceiling tiles" means plenum.`,
      hook: "Copper stops at 100 m. Cat 6A for 10 Gbps at 100 m. Same pinout both ends = straight-through. Plenum above the ceiling."
    },
    {
      id: "u3l2", title: "Fiber Optics", domain: 1, obj: "1.5", minutes: 8,
      body: `Fiber carries light instead of electricity, so it ignores electromagnetic interference and reaches much farther than copper.

## Two kinds of glass
- **Single-mode fiber (SMF)**: a tiny core (about 9 microns) that carries one light path from a laser. Reaches 10 kilometers or more. Yellow jacket by convention. Used between buildings and across cities.
- **Multimode fiber (MMF)**: a wider core (50 or 62.5 microns) that carries many light paths from an LED or cheaper laser. Reaches roughly 300 to 550 meters at 10 Gbps. Orange or aqua jacket. Used inside buildings and data centers.
You cannot mix them on one link without a media converter; the core sizes do not match.

## Connectors
- **LC**: small, square, snap-in. The most common connector on modern transceivers.
- **SC**: larger square push-pull connector. Common on older gear and patch panels.
- **ST**: round bayonet twist-lock. Legacy.
- **MPO/MTP**: a multi-fiber ribbon connector, 12 or 24 fibers in one plug, used for 40 and 100 gigabit links.
Fiber connectors also come in polish types. **UPC** (blue) is flat; **APC** (green) is angled to reduce reflection and is used in long-haul and passive optical networks. Do not mate UPC to APC.

## Media converters
A media converter changes one medium to another without changing the data: single-mode to Ethernet copper, multimode to copper, or single-mode to multimode. Use one when you must extend a copper link with fiber.

> Exam tip: distance decides fiber type. Under a few hundred meters inside a building, multimode is cheaper. Kilometers between sites means single-mode. "Two buildings 2 km apart" is always single-mode.`,
      hook: "Single-mode: small core, laser, kilometers, yellow. Multimode: big core, hundreds of meters, orange or aqua. LC is the little one."
    },
    {
      id: "u3l3", title: "Transceivers and Ethernet Standards", domain: 1, obj: "1.5", minutes: 9,
      body: `Switches and routers use pluggable transceivers so one port can be copper or fiber, short or long reach, depending on the module you insert.

## Form factors
- **SFP**: small form-factor pluggable, 1 Gbps.
- **SFP+**: same size, 10 Gbps.
- **QSFP** and **QSFP+**: quad, four lanes, 40 Gbps.
- **QSFP28**: 100 Gbps. QSFP-DD and OSFP push to 400 Gbps.
Both ends of a link need matching wavelength, fiber type, and speed. A single-mode module on multimode fiber, or an SR module at one end and an LR module at the other, will not link.

## Naming the standards
Ethernet names read speed, signaling, medium: **1000BASE-T** is 1 Gbps over twisted pair. Common ones:
- **1000BASE-T**: 1 Gbps, Cat 5e or better, 100 m.
- **10GBASE-T**: 10 Gbps, Cat 6A, 100 m.
- **1000BASE-SX**: 1 Gbps, multimode, up to about 550 m.
- **1000BASE-LX**: 1 Gbps, single-mode, up to 10 km.
- **10GBASE-SR**: short reach, multimode, about 300 m (400 m on OM4).
- **10GBASE-LR**: long reach, single-mode, 10 km.
- **10GBASE-ER**: extended reach, single-mode, 40 km.
Pattern: **S** means short and multimode, **L** means long and single-mode, **T** means twisted pair.

## How Ethernet shares the wire
Classic Ethernet used **CSMA/CD**: listen before sending, and back off if a collision is detected. Full-duplex switched links have no collisions, so CSMA/CD is effectively retired. A **duplex mismatch** (one side full, one side half) causes late collisions and CRC errors. Auto-negotiation should agree on speed and duplex; hard-coding one side and leaving the other on auto is a classic cause of mismatch.

## MAC addresses
48 bits written as 12 hex digits, such as {{3C:52:82:1A:9F:07}}. The first 24 bits are the **OUI**, the manufacturer code. The address is burned into the network card and is used only on the local segment.

> Exam tip: "SR" plus "single-mode" in the same sentence is a mismatch. So is 10GBASE-SR at 2 km; it runs out at a few hundred meters.`,
      hook: "SFP 1G, SFP+ 10G, QSFP 40G, QSFP28 100G. SR short multimode, LR long single-mode. Duplex mismatch = late collisions."
    },
    {
      id: "u3l4", title: "Traffic Types and Wireless Media", domain: 1, obj: "1.5", minutes: 7,
      body: `Every packet is addressed to one, some, or all hosts. The exam names four traffic types.

## The four traffic types
- **Unicast**: one sender to one receiver. Normal web browsing, email, file transfer.
- **Broadcast**: one sender to every host on the local segment. ARP requests and DHCP Discover are broadcasts. Routers do not forward them, which is why a subnet is also a **broadcast domain**. IPv6 has no broadcast at all.
- **Multicast**: one sender to a group of subscribers who asked for the stream. Efficient for video, routing protocol updates (OSPF uses 224.0.0.5 and 224.0.0.6), and IPv6 neighbor discovery. IPv4 multicast addresses are the Class D range, 224.0.0.0 to 239.255.255.255.
- **Anycast**: the same address assigned to many servers, and the network delivers each request to the **nearest** one. DNS root servers and content delivery networks use anycast so users everywhere get a close, fast answer.

## Wireless media
- **802.11 Wi-Fi**: unlicensed 2.4, 5, and 6 GHz bands. Covered in depth in the wireless unit.
- **Cellular**: 4G LTE and 5G from carriers. Used for mobile devices, backup WAN links, and remote sites where wired service is unavailable.
- **Satellite**: reaches anywhere with a view of the sky. Geostationary satellites add roughly 500 to 600 ms of latency, which hurts voice and interactive apps; newer low-earth-orbit constellations cut that dramatically. Weather can degrade the signal.

> Exam tip: "delivered to the closest of many servers sharing one address" is anycast. "Sent to everyone on the segment" is broadcast. "Only to hosts that joined a group" is multicast.`,
      hook: "Unicast one, broadcast all (local only), multicast the group, anycast the nearest."
    }
  ]
});
