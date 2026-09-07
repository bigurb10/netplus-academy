// APlus Academy Core 1 curriculum, units 1 to 3. Original teaching content for CompTIA A+ 220-1201.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Mobile Devices", domain: 1,
  blurb: "Laptops, phones, and tablets: the parts you replace, the ports and accessories you connect, the radios that get them online, and the management that keeps company data safe on them.",
  assumes: "Nothing. Start here if you are new to hardware.",
  lessons: [
    {
      id: "u1l1", title: "Laptop Hardware: Replacing Batteries, Keyboards, RAM, Storage, Wireless Cards, Cameras, and Biometrics", domain: 1, obj: "1.1", minutes: 10,
      body: `A laptop packs desktop parts into a case that was never designed to be opened every week. Core 1 expects you to know which parts a technician replaces, how to reach them without breaking anything, and the details that catch people the first time.

## Before you open anything
1. Back up the user's data if the drive is involved in any way.
2. Shut down fully (not sleep or hibernate), unplug the power adapter, and remove the battery or disconnect the internal battery connector from the board.
3. Hold the power button for about ten seconds to drain any remaining charge.
4. Put on an ESD strap and work on an ESD mat. Lay screws out in a labeled map; laptops mix several screw lengths, and a long screw in a short hole cracks the board or the palm rest.
5. Photograph the cable routing before you lift a single connector.

## Battery
Modern laptops use a lithium-ion pack. Most are internal, held by a few screws and a connector under the bottom cover; older machines have a latch-release pack on the underside. A battery that will not hold a charge, reports poor health, or has **swollen** gets replaced, never opened or punctured. Swelling shows up as a trackpad or keyboard pushed upward. Stop using the machine and replace the pack.

## Keyboard and keys
A single keycap snaps onto a scissor mechanism and can be replaced alone. The whole keyboard connects to the board by a flat ribbon cable in a ZIF (zero insertion force) connector: flip the latch, slide the cable out, reverse to install. A liquid spill usually kills the keyboard first and the board second.

## Memory
Laptop RAM is a **SODIMM**, seated in an angled slot under a cover or under the keyboard. Push the side clips outward, the module tilts up, pull it out. Match the generation exactly (DDR4 into DDR4) and check the maximum the board supports. Many thin laptops solder the memory to the board; then the upgrade is a new laptop.

## Storage
Either a 2.5-inch SATA drive in a caddy or an **M.2** card. M.2 comes in SATA and NVMe versions with different keys and lengths (2280 is the most common), so check the slot before ordering. Clone the old drive first if the operating system must survive the swap.

## Wireless card
A small M.2 2230 card with two tiny antenna leads snapped onto it. The antenna wires run through the hinge into the lid and around the display, where they get the best signal. The leads are marked main and aux (often one black, one white or gray); put each on its labeled terminal. A lead left off gives weak or no signal.

## Camera, microphone, and biometrics
The webcam and microphone sit in the lid bezel with a cable through the hinge, sometimes behind a physical privacy shutter. Fingerprint readers live in the power button or the palm rest; smart card readers are in the side; NFC badge readers (the near-field scanner feature) hide under the palm rest. Each is a module with a connector: replace the module, then reinstall its driver.

> Exam tip: the first step in nearly every laptop hardware question is disconnect the power and the battery. The antenna question is about placement: the wireless antennas are in the lid around the screen, not in the base.`,
      hook: "Shut down, unplug, disconnect the battery, ESD strap, screw map. Swollen battery means replace now. SODIMM tilts in at an angle; match the generation; it may be soldered. Check the M.2 key and length. Wireless antenna leads run through the hinge into the lid."
    },
    {
      id: "u1l2", title: "Mobile Connections and Accessories: USB-C, Lightning, NFC, Bluetooth, Tethering, Docks, and Styluses", domain: 1, obj: "1.2", minutes: 9,
      body: `Every mobile device connects to the world through a handful of ports and radios, and users buy a pile of accessories for them. Core 1 asks you to name the connector by its shape and capabilities and to pick the right accessory for a need.

## The physical connectors
- **USB-C**: a reversible oval 24-pin connector. It is only a connector shape; what it carries depends on the device. It can do USB data at USB 2.0 through USB4 speeds, video through DisplayPort alternate mode, Thunderbolt, and up to 240 W of power delivery. It is the port on modern phones, tablets, and laptops.
- **microUSB**: the small trapezoid on older Android phones and many accessories; one way in; USB 2.0 speeds.
- **miniUSB**: slightly larger and older; cameras, GPS units, and game controllers from the 2000s.
- **Lightning**: Apple's 8-pin reversible connector on older iPhones and accessories; USB 2.0 speeds; newer Apple devices moved to USB-C.
- **3.5 mm audio**: still on some laptops and tablets; many phones dropped it in favor of USB-C or Bluetooth audio.

## The short-range radios
- **NFC** (near-field communication) works at 13.56 MHz over about 4 cm. It is behind tap to pay, badge readers, and the tap-to-pair shortcut that hands a Bluetooth pairing off with a touch.
- **Bluetooth** builds a personal area network for headsets, keyboards, mice, speakers, and watches. Devices pair once and reconnect automatically afterward.

## Sharing a phone's internet
- **Hotspot**: the phone acts as a Wi-Fi access point and shares its cellular data with laptops and tablets.
- **Tethering**: the same idea over a USB cable (which also charges the phone) or over Bluetooth. USB tethering is the most reliable and least battery hungry; Bluetooth tethering is the slowest.

## Docking stations versus port replicators
A **docking station** turns a laptop into a desktop with one connection. Over USB-C or Thunderbolt (or a proprietary connector on business laptops) it supplies power to charge the laptop, drives one or more monitors, and adds wired Ethernet, USB ports, and audio. A **port replicator** simply adds ports, usually over a USB connection, and typically does not charge the laptop or drive high-resolution displays. If the question says "charge the laptop and run two monitors with one cable," the answer is a docking station.

## Accessories
- **Stylus**: a passive stylus behaves like a finger on any capacitive screen. An active stylus has a battery or charges from the device, senses pressure and tilt, may need pairing, and is often specific to a device family.
- **Headsets**: wired through 3.5 mm or USB-C, or Bluetooth; a boom microphone helps in noisy places.
- **Speakers, webcams, and microphones**: USB or Bluetooth; a USB webcam is the fix for a dead built-in camera.
- **Trackpad, track point, and drawing pad**: a drawing tablet (graphics pad) gives artists pen input; an external trackpad adds gestures to a desktop.

> Exam tip: reversible connectors are USB-C and Lightning. NFC is centimeters; Bluetooth is meters. One cable that charges, drives displays, and adds ports is a docking station.`,
      hook: "USB-C reversible, carries data, video, and power. microUSB and miniUSB one way, USB 2.0. Lightning is Apple's 8-pin. NFC 13.56 MHz, about 4 cm. Hotspot over Wi-Fi; tethering over USB or Bluetooth. Docking station charges and drives monitors; port replicator only adds ports. Active stylus needs power or pairing."
    },
    {
      id: "u1l3", title: "Mobile Network Connectivity: Cellular, SIM and eSIM, Wi-Fi, Hotspots, Bluetooth Pairing, and Location", domain: 1, obj: "1.3", minutes: 9,
      body: `A phone or tablet has four radios that matter on the exam: cellular, Wi-Fi, Bluetooth, and GPS. Know what each one does, how it is configured, and which switch to flip when it stops working.

## Cellular generations
- **3G**: voice plus slow data; being switched off by carriers.
- **4G LTE**: all-IP broadband data; still the workhorse.
- **5G**: faster with lower latency; low-band 5G reaches far, high-band (millimeter wave) is very fast but covers a few blocks and does not go through walls.
The phone's radio firmware (the baseband) and the carrier settings occasionally update over the air; an outdated update file is a real cause of connection trouble.

## SIM and eSIM
The **SIM** card identifies the subscriber to the carrier: it holds the subscriber identity and the keys that let the phone onto the network. Move the SIM and the phone number and plan move with it. Sizes shrank from mini to micro to nano. An **eSIM** is a chip soldered inside the device; the carrier profile is downloaded, often by scanning a QR code, so no card is needed and several profiles can live on one phone (a work line and a personal line). A SIM PIN locks the card itself; a carrier lock ties the phone to one carrier.

## Wi-Fi on a mobile device
Joining works like a laptop: choose the SSID, enter the passphrase (personal) or credentials and certificate (enterprise). Phones prefer Wi-Fi over cellular for data, which matters for data caps. **Airplane mode** switches every radio off at once; Wi-Fi and Bluetooth can then be turned back on individually. Forgetting and rejoining a network clears a stale saved profile.

## Hotspot and tethering
A hotspot shares cellular data by acting as a small Wi-Fi access point; tethering shares it over USB or Bluetooth. Both count against the cellular plan.

## Bluetooth pairing, in order
1. Turn Bluetooth on in the phone or laptop settings.
2. Put the accessory into pairing mode so it is discoverable (usually hold its button until a light flashes).
3. Select the accessory from the list of found devices.
4. Enter or confirm the PIN or passkey (often 0000 or 1234 on simple accessories, or a matching six-digit code).
5. Test connectivity: play audio or type a character.
Once paired, the pair reconnects automatically whenever both are in range.

## Location services
**GPS** listens to satellites; it is accurate to a few meters but needs a view of the sky and uses battery. **Cellular location services** (tower and Wi-Fi positioning) estimate location from nearby towers and access points; less precise but works indoors. Phones blend the two. Apps must be granted location permission, and a device with location off cannot be found by a locate-my-device service.

> Exam tip: a device that will not connect to anything is in airplane mode or has a bad SIM. A phone that finds its position outdoors but not inside is relying on GPS. eSIM equals downloaded profile, no card.`,
      hook: "3G slow, 4G LTE broadband, 5G fast and low latency (mmWave short range). SIM identifies the subscriber; eSIM is a downloaded profile. Airplane mode kills all radios. Pairing: Bluetooth on, accessory discoverable, select, PIN, test. GPS needs sky; cell and Wi-Fi positioning work indoors."
    },
    {
      id: "u1l4", title: "MDM, BYOD, and Synchronization: Device Configurations, Policy Enforcement, Corporate Apps, Sync, and Data Caps", domain: 1, obj: "1.3", minutes: 9,
      body: `Company data ends up on phones. Mobile device management (MDM) is how an organization controls that, and synchronization is how the data gets there and stays consistent across a user's devices.

## Corporate-owned versus BYOD
- **Corporate-owned** devices are enrolled fully in MDM. The company sets the passcode rules, installs and removes apps, restricts features such as the camera or app stores, and can wipe the whole device.
- **BYOD** (bring your own device) means an employee's personal phone carries work mail and apps. MDM creates a separate managed work profile or container, so company data sits in its own encrypted space. A **selective wipe** removes only the work container and leaves photos and personal apps alone, which is what a departing employee expects.
Enrollment happens through an MDM app or a profile the user installs, or automatically for devices bought through a corporate program.

## What policies enforce
- A passcode or biometric lock with a minimum length and an automatic lock timer.
- Device encryption on.
- Operating system minimum versions and jailbreak or root detection.
- App allow lists and deny lists; a managed app store.
- Remote lock, locate, and wipe.
- Preloaded Wi-Fi profiles, VPN settings, and certificates.
A device that falls out of compliance (an old OS, encryption turned off) is blocked from corporate email and resources until it is fixed.

## Corporate applications
MDM pushes the company's apps and their settings: the mail client pointed at the right server, the authenticator app for two-step sign-in, a managed browser, and business applications (line-of-business apps). It can also stop data leaving those apps, for example blocking copy and paste from the work mail client into a personal note.

## Synchronization
Sync keeps the same information on the phone, the laptop, and the cloud:
- **Mail, contacts, and calendar** from the corporate mail server or a cloud suite; the account type (corporate mail, IMAP, POP3) decides what syncs and in which direction.
- **Cloud storage** for documents and photos; changes upload and download automatically.
- **Bookmarks, passwords, and app data** through the platform account.
Sync can run to the cloud or to a desktop over a cable or Wi-Fi. Two things go wrong: **conflicts**, when the same item is edited in two places, and **data caps**, when large photo or video sync runs over cellular. Set sync to Wi-Fi only for big libraries and check whether roaming is off.

> Exam tip: personal phone with company mail is BYOD, and the answer to "remove company data without touching personal photos" is a selective wipe. A user who blew through a cellular plan needs sync restricted to Wi-Fi.`,
      hook: "Corporate-owned: full control and full wipe. BYOD: work profile and selective wipe. Policies enforce passcode, encryption, OS version, app lists, remote wipe. Sync covers mail, contacts, calendar, cloud storage; conflicts and data caps are the traps; sync large data over Wi-Fi."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Networking Fundamentals", domain: 2,
  blurb: "How data actually moves, the port numbers and protocols every technician memorizes, the wireless standards, and the boxes and servers that make a network work.",
  assumes: "You can plug in a cable. Everything else is explained here.",
  lessons: [
    {
      id: "u2l1", title: "How Data Moves: MAC and IP, Frames and Packets, Switches and Routers, and the Layers in Plain Terms", domain: 2, obj: "2.1", minutes: 9,
      body: `Before memorizing ports and cables, get the mental picture right. Every network question on Core 1 is easier once you can trace a piece of data from one computer to another.

## Two addresses on every device
- The **MAC address** is burned into the network interface: 48 bits written as six pairs of hex digits, such as 3C-52-82-1A-9F-04. The first three pairs identify the manufacturer. It only matters on the local network.
- The **IP address** is assigned by you or by DHCP: 192.168.1.20 with a subnet mask. It is logical, can change, and is what routers use to move data between networks.
A device that knows a neighbor's IP address but needs its MAC asks with **ARP** (address resolution protocol): "who has 192.168.1.1?" and the owner answers with its MAC.

## Frames and packets
Data is wrapped in layers like an envelope inside an envelope. The application writes a message; TCP or UDP adds port numbers; IP adds the source and destination IP addresses to make a **packet**; Ethernet or Wi-Fi adds the source and destination MAC addresses to make a **frame** and puts it on the wire. Each device along the way opens only the layer it cares about.

## Switches and routers
- A **switch** connects devices on one network. It learns which MAC address is on which port by watching traffic and forwards each frame only to the right port. It does not look at IP addresses.
- A **router** connects different networks. It reads the destination IP address and picks the next hop. Your computer sends anything not on its own network to the **default gateway**, which is the router's address on your network.
- A **hub** was a dumb repeater that sent every frame everywhere; switches replaced it.

## The layers in plain terms
Textbooks describe seven OSI layers; a technician needs five ideas:
1. **Physical**: cables, connectors, radio signals, link lights.
2. **Data link**: MAC addresses, frames, switches, Wi-Fi association.
3. **Network**: IP addresses, packets, routers, the gateway.
4. **Transport**: TCP and UDP, port numbers.
5. **Application**: HTTP, DNS, SMB, and the rest.
Troubleshooting runs bottom up: link light, then IP address, then can you reach the gateway, then can you resolve names, then does the application work.

## One web request, start to finish
The laptop asks DNS for the address of the site. It sees the answer is not on its own subnet, ARPs for the gateway's MAC, and hands the switch a frame addressed to the router's MAC carrying a packet addressed to the web server's IP. The router translates the private address to its public one (NAT) and forwards it toward the internet. The reply retraces the path.

> Exam tip: MAC is physical and local; IP is logical and routed. Switches forward by MAC inside a network; routers forward by IP between networks. Anything off your subnet goes to the default gateway.`,
      hook: "MAC: 48 bits, six hex pairs, burned in, local. IP: logical, routed, from DHCP or static. ARP maps IP to MAC. Frame carries a packet. Switch forwards by MAC; router forwards by IP; default gateway is the router. Troubleshoot bottom up: link, IP, gateway, DNS, application."
    },
    {
      id: "u2l2", title: "TCP Versus UDP and the Port List", domain: 2, obj: "2.1", minutes: 11,
      body: `Port numbers are the most reliable points on the exam. A port identifies which service on a computer should receive a packet, and the well-known ones never change.

## TCP versus UDP
- **TCP** (transmission control protocol) opens a connection with a three-way handshake (SYN, SYN-ACK, ACK), numbers every segment, acknowledges receipt, and resends anything lost. It is reliable and ordered, at the cost of overhead. Web pages, email, file transfers, and remote desktop use it.
- **UDP** (user datagram protocol) just sends. No handshake, no acknowledgments, no retransmission. It is fast and light, which suits DNS lookups, DHCP, streaming video, voice calls, SNMP, syslog, and TFTP, where a late packet is worth less than a fast one.
Well-known ports run from 0 to 1023, registered ports from 1024 to 49151, and the rest are dynamic ports a client picks for its side of a connection.

## The ports to know cold
- **20 and 21 FTP** (TCP): file transfer in clear text; 21 carries commands, 20 carries data.
- **22 SSH** (TCP): encrypted remote shell; SFTP and SCP ride on it.
- **23 Telnet** (TCP): clear-text remote terminal; replaced by SSH.
- **25 SMTP** (TCP): mail moving between servers; clients submit on 587 with TLS.
- **53 DNS** (UDP, with TCP for large answers and zone transfers): names to addresses.
- **67 and 68 DHCP** (UDP): the server listens on 67, the client on 68.
- **80 HTTP** (TCP): web, unencrypted.
- **110 POP3** (TCP): download mail to one device; 995 is the secure version.
- **137 to 139 NetBIOS** (UDP 137 and 138, TCP 139): legacy Windows naming and file sharing.
- **143 IMAP** (TCP): mail stays on the server and syncs to every device; 993 is the secure version.
- **161 and 162 SNMP** (UDP): device monitoring; 162 receives traps.
- **389 LDAP** (TCP): directory lookups; 636 is LDAPS.
- **443 HTTPS** (TCP): web over TLS.
- **445 SMB** (TCP): Windows file and printer sharing.
- **3389 RDP** (TCP): Remote Desktop.
- Also worth knowing: **123 NTP** (UDP) time, **514 syslog** (UDP) logs, **5900 VNC** (TCP) screen sharing.

## Secure replacements
Every clear-text protocol has an encrypted partner: 23 Telnet gives way to 22 SSH, 80 HTTP to 443 HTTPS, 110 POP3 to 995, 143 IMAP to 993, 389 LDAP to 636, and 21 FTP to SFTP on 22 (or FTPS on 990). When a question asks for the secure way to do something, pick the encrypted port.

## Where ports show up in real work
A firewall rule that blocks port 445 stops file sharing. A mail client that cannot send but can receive has the wrong SMTP port. A web server reachable on 80 but not 443 has a certificate or listener problem. A printer that scans to a share needs 445 open to the file server.

> Exam tip: memorize the list as pairs: 20/21 FTP, 67/68 DHCP, 110/143 mail in, 25 mail out, 80/443 web, 22/23 shell, 389 LDAP, 445 SMB, 3389 RDP, 53 DNS. TCP is reliable and connection-oriented; UDP is fast and connectionless.`,
      hook: "TCP: handshake, reliable, ordered. UDP: connectionless, fast (DNS, DHCP, streaming, VoIP, SNMP, syslog). 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 137 to 139 NetBIOS, 143 IMAP, 161/162 SNMP, 389 LDAP, 443 HTTPS, 445 SMB, 3389 RDP. Secure: 22, 443, 993, 995, 636."
    },
    {
      id: "u2l3", title: "Wireless Technologies: Bands, Channels, Widths, 802.11 Standards, Bluetooth, NFC, and RFID", domain: 2, obj: "2.2", minutes: 10,
      body: `Wireless questions come in two flavors: which standard or band has which property, and why a wireless network is slow or unreliable. Both depend on the same small set of facts.

## Three bands
- **2.4 GHz**: the longest range and the best penetration through walls, but only three non-overlapping 20 MHz channels in the US (1, 6, and 11) and shared with microwave ovens, Bluetooth, cordless phones, and every neighbor.
- **5 GHz**: shorter range, many non-overlapping channels, far less crowding, and room for 40, 80, and 160 MHz channel widths. Some channels are DFS channels that must yield to radar.
- **6 GHz**: the cleanest spectrum, opened by Wi-Fi 6E and used by Wi-Fi 7; the shortest range and only the newest devices.
Each country's regulator decides which channels and power levels are legal; an access point set to the wrong country code may use channels its clients cannot hear.

## Channel selection and width
A wider channel carries more data per second but occupies more spectrum and overlaps more neighbors. On 2.4 GHz stay at 20 MHz; on 5 GHz 80 MHz is common; 160 and 320 MHz appear with Wi-Fi 6 and 7. Two access points on overlapping channels interfere with each other; put neighboring APs on 1, 6, and 11 in the 2.4 GHz band.

## The 802.11 family
- **802.11a**: 5 GHz, 54 Mb/s, early and rare.
- **802.11b**: 2.4 GHz, 11 Mb/s, the oldest common standard.
- **802.11g**: 2.4 GHz, 54 Mb/s, backward compatible with b.
- **802.11n (Wi-Fi 4)**: 2.4 and 5 GHz, up to 600 Mb/s, introduced MIMO (multiple antennas) and 40 MHz channels.
- **802.11ac (Wi-Fi 5)**: 5 GHz only, about 6.9 Gb/s, MU-MIMO, 80 and 160 MHz channels.
- **802.11ax (Wi-Fi 6 and 6E)**: 2.4 and 5 GHz, 6E adds 6 GHz, about 9.6 Gb/s, OFDMA for crowded rooms.
- **802.11be (Wi-Fi 7)**: all three bands, about 46 Gb/s, 320 MHz channels, multi-link operation.
A network runs at the speed of its slowest member; one 802.11g laptop drags an n network down.

## Bluetooth
A 2.4 GHz personal area network for headsets, keyboards, mice, and wearables. Class 2 devices reach about 10 meters; class 1 reaches about 100. Bluetooth Low Energy runs fitness trackers for months on a coin cell. Because it shares 2.4 GHz with Wi-Fi, heavy Bluetooth use can slow a 2.4 GHz Wi-Fi link and vice versa.

## NFC and RFID
**NFC** operates at 13.56 MHz over about 4 cm: tap to pay, badge tap, and quick pairing. **RFID** reads tags by radio at a distance: passive tags have no battery and are powered by the reader's field (inventory labels, access cards), active tags carry a battery and broadcast farther (vehicle tolls, asset tracking).

## Long-range wireless
Fixed wireless from a tower to a rooftop antenna and cellular data (4G LTE and 5G) serve as internet connections where cable and fiber are absent.

> Exam tip: 2.4 GHz goes farther and through walls; 5 GHz is faster and less crowded. Non-overlapping 2.4 GHz channels are 1, 6, and 11. Wi-Fi 5 is 5 GHz only; Wi-Fi 6E adds 6 GHz. NFC is centimeters; RFID reads at a distance.`,
      hook: "2.4 GHz: range and walls, channels 1, 6, 11. 5 GHz: speed, many channels, DFS. 6 GHz: Wi-Fi 6E and 7. a 5 GHz 54; b 2.4 11; g 2.4 54; n both 600; ac 5 only 6.9 Gb/s; ax 9.6 Gb/s; be 46 Gb/s. Bluetooth 2.4 GHz, about 10 m. NFC 13.56 MHz, 4 cm. RFID passive (no battery) or active."
    },
    {
      id: "u2l4", title: "Network Hardware: Routers, Switches, Access Points, Patch Panels, Firewalls, PoE, Modems, ONTs, and NICs", domain: 2, obj: "2.5", minutes: 10,
      body: `Walk into a wiring closet and you should be able to name every box and say what it does. Core 1 asks exactly that, plus which device to add for a given need.

## Routers
A router connects networks and forwards packets by IP address. In a home or small office the "router" is really several devices in one box: a router, a switch with four ports, a wireless access point, a DHCP server, a NAT gateway that shares one public address, and a basic firewall. In an enterprise these are separate.

## Switches
A switch connects the devices of one network and forwards frames by MAC address, port by port. An **unmanaged switch** has no configuration: plug in and it works. A **managed switch** has an administrative interface for VLANs, port speed and duplex settings, PoE control, port mirroring, link aggregation, and monitoring through SNMP. If the question mentions VLANs or configuring a port, it needs a managed switch.

## Access points
An access point (AP) bridges Wi-Fi clients onto the wired network. It has an SSID, a channel, a security mode, and, in a business, a controller that manages dozens of APs together. A standalone AP is not a router; it does not hand out addresses or do NAT.

## Patch panels
Building cable runs from wall jacks end in a **patch panel** in the closet, punched down onto a 110 block on the back. Short patch cables then connect each panel port to a switch port. The panel protects the permanent cable from wear and makes moves a matter of swapping a patch cable. Labeling is everything.

## Firewalls
A firewall allows or blocks traffic by address, port, and rule. A network firewall sits between the internet and the LAN, is usually stateful (it tracks connections so replies are allowed automatically), and may add content filtering and intrusion prevention. A software firewall runs on each host.

## Power over Ethernet
PoE sends DC power over the data cable so access points, IP phones, and cameras need no outlet. A **PoE switch** supplies it from its ports; a **PoE injector** adds it to a single run from a non-PoE switch. PoE standards: **802.3af** delivers 15.4 W per port, **802.3at (PoE+)** 30 W, and **802.3bt (PoE++)** 60 W (Type 3) or 100 W (Type 4). A device that reboots or will not power up on a long run may be exceeding the budget.

## Modems and terminals
- **Cable modem**: internet over the cable TV coax using DOCSIS; F-type connector; bandwidth shared with the neighborhood.
- **DSL modem**: internet over the phone line through an RJ11 jack; speed falls with distance from the exchange.
- **ONT** (optical network terminal): converts the fiber coming into the building to an Ethernet port for the router.

## Network interface cards
Every device has a NIC, wired or wireless, with its own MAC address. Desktops can add a PCIe NIC for a faster port or a wireless card; a USB NIC rescues a laptop with a dead port.

## Hubs
A hub repeated every frame to every port, causing collisions. It is obsolete; if you find one, replace it with a switch.

> Exam tip: forwards by MAC is a switch; forwards by IP is a router; VLANs need a managed switch; power over the data cable is PoE (af 15.4 W, at 30 W, bt 60 or 100 W); fiber to Ethernet at the premises is an ONT.`,
      hook: "Router: between networks, by IP; SOHO router also switch, AP, DHCP, NAT, firewall. Switch: by MAC; managed for VLANs and port settings. AP bridges Wi-Fi to wired. Patch panel: punched down, patch cables to the switch. PoE af 15.4 W, at 30 W, bt 60/100 W; injector for one run. Cable modem DOCSIS, DSL over phone line, ONT fiber to Ethernet."
    },
    {
      id: "u2l5", title: "Services of Networked Hosts: Server Roles, Internet Appliances, SCADA, and IoT", domain: 2, obj: "2.3", minutes: 9,
      body: `Servers are named for the service they provide. The exam describes a need and asks which server or appliance fulfills it, or names a server and asks what it does.

## Core server roles
- **DNS server**: turns names into addresses. Every client needs one; a wrong DNS setting breaks "the internet" while pings to addresses still work.
- **DHCP server**: hands out IP addresses, masks, gateways, and DNS servers for a lease period. Usually the router at home, a Windows or Linux server at work.
- **File server (fileshare)**: shared folders over SMB (Windows) or NFS (Unix), with permissions.
- **Print server**: manages shared printers, their queues, and drivers so clients do not each hold a direct connection.
- **Mail server**: sends with SMTP and lets clients read with IMAP or POP3; often hosted in the cloud now.
- **Web server**: serves pages over HTTP and HTTPS; internal web apps run on one too.
- **Syslog server**: collects log messages from switches, routers, firewalls, and servers in one place, so a problem can be traced across devices.
- **AAA server** (authentication, authorization, and accounting): authentication is who are you, authorization is what may you do, and accounting is what did you do. RADIUS and TACACS+ are the protocols; enterprise Wi-Fi and VPNs check credentials against one.
- **Database server**: stores structured data for applications (SQL).
- **NTP server**: time. Authentication and certificates fail when clocks drift, so every device syncs to one.

## Internet appliances
- **Spam gateway**: filters inbound mail for spam, phishing, and malware before it reaches the mail server.
- **UTM** (unified threat management): a firewall, intrusion detection and prevention, antivirus, content filtering, and VPN in one appliance; common in small and mid-size businesses.
- **Load balancer**: spreads client requests across several identical servers so one failure or one busy server does not take the service down.
- **Proxy server**: fetches web content on behalf of clients. It caches popular pages, enforces content filtering, logs who went where, and hides internal addresses. Browsers may need the proxy address configured.

## Legacy and embedded systems
**SCADA** and other industrial control systems run factories, water plants, and building controls. They are often old, cannot be patched, and were never meant to be on the internet. Keep them on their own isolated network segment and never plug a random laptop into one.

## Internet of Things
Smart thermostats, cameras, door locks, speakers, light bulbs, and appliances are all small computers with radios. They ship with default passwords, rarely get updates, and are a favorite entry point for attackers. Put them on a separate VLAN or guest network, change the passwords, and update the firmware.

> Exam tip: names to addresses is DNS; addresses by lease is DHCP; one place for logs is syslog; RADIUS is AAA; all-in-one security is a UTM; spreading traffic over several servers is a load balancer; fetches and caches web content for clients is a proxy; old industrial gear is SCADA, isolate it.`,
      hook: "DNS names, DHCP leases, file (SMB), print, mail (SMTP out, IMAP/POP3 in), web, syslog logs, AAA (RADIUS, TACACS+), database, NTP time. Spam gateway, UTM all-in-one, load balancer spreads requests, proxy fetches and caches. SCADA: legacy, isolate. IoT: change defaults, segregate, patch."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Network Configuration", domain: 2,
  blurb: "IPv4 and IPv6 addressing, DNS and email authentication records, DHCP, VLANs, and VPNs, setting up a small office network, and the tools that test cables and connections.",
  assumes: "You know what a switch, a router, and an IP address are (Unit 2).",
  lessons: [
    {
      id: "u3l1", title: "IPv4 Addressing: Private and Public Ranges, Masks, Gateways, APIPA, and Static Versus Dynamic", domain: 2, obj: "2.6", minutes: 11,
      body: `Most network troubleshooting on Core 1 comes down to reading an IP configuration and spotting what is wrong. Learn to read one like a technician.

## The address and the mask
An IPv4 address is 32 bits written as four decimal octets from 0 to 255: 192.168.1.20. The **subnet mask** says which part is the network and which part is the host. With mask 255.255.255.0 (written /24), the first three octets are the network and the last is the host: 192.168.1.20 is host 20 on network 192.168.1.0. 255.255.0.0 is /16 and 255.0.0.0 is /8. Two devices whose network portions match are on the same subnet and talk directly through the switch; if they differ, traffic goes through the router.

## The default gateway
The gateway is the router's address on the local network, such as 192.168.1.1. It must be inside the same subnet as the host. A device with the wrong gateway can reach its neighbors but nothing beyond them; a device with no gateway is the same.

## Private and public addresses
Three ranges are reserved for private networks and never routed on the internet:
- **10.0.0.0 to 10.255.255.255** (10.0.0.0/8), large organizations.
- **172.16.0.0 to 172.31.255.255** (172.16.0.0/12), the one people forget; 172.32.x.x is public.
- **192.168.0.0 to 192.168.255.255** (192.168.0.0/16), home and small office routers.
Everything else is **public** and routable. A router translates private addresses to its single public address with **NAT** so a whole office can share one internet address.

## Two special addresses
- **APIPA**, 169.254.x.x: the address a client gives itself when it asks DHCP and nobody answers. It can talk to other APIPA devices on the same segment and nothing else. Seeing 169.254 means "the DHCP server did not reach this device": check the cable, the link light, the VLAN, or the DHCP server.
- **Loopback**, 127.0.0.1: always the local machine. Pinging it tests the TCP/IP software, not the network card or the cable.

## Static versus dynamic
**Dynamic** addresses come from DHCP and suit workstations, phones, and anything that moves. **Static** addresses are typed in and belong on things other devices must find at a fixed address: servers, printers, access points, the router itself. The middle path is a **DHCP reservation**: the server always gives the same address to a given MAC, so the printer keeps its address without anyone touching the printer.

## Reading a configuration
A working client shows an address in the expected range, the right mask, a gateway in the same subnet, and one or two DNS servers. Common faults: an APIPA address (no DHCP), a duplicate address warning (two statics collide), a gateway outside the subnet (typo), and DNS pointing at a dead server (addresses work, names do not).

> Exam tip: 169.254 means no DHCP. 127.0.0.1 is the machine itself. 172.16 through 172.31 is private; 172.32 is not. Printers and servers get static addresses or reservations; the gateway must share the subnet.`,
      hook: "Four octets 0 to 255; mask splits network from host; /24 = 255.255.255.0. Same network portion talks directly, else through the gateway, which must be in the subnet. Private: 10/8, 172.16 to 172.31, 192.168/16; NAT shares one public address. 169.254 APIPA = no DHCP. 127.0.0.1 loopback. Static or reservation for servers and printers."
    },
    {
      id: "u3l2", title: "IPv6 Essentials: Address Format, Link-Local, Global, Loopback, and Dual Stack", domain: 2, obj: "2.6", minutes: 8,
      body: `IPv4 ran out of addresses years ago. IPv6 has so many that every device on Earth can have a public address without NAT. Core 1 wants you to recognize the addresses and know the basic rules.

## The format
An IPv6 address is 128 bits written as eight groups of four hexadecimal digits separated by colons:
2001:0db8:0000:0000:0000:ff00:0042:8329
Two rules shorten it. Leading zeros in a group can be dropped (0db8 becomes db8, 0000 becomes 0). One run of consecutive all-zero groups can be replaced by a double colon, once per address:
2001:db8::ff00:42:8329
The **prefix** works like a subnet mask: /64 means the first 64 bits identify the network and the last 64 bits identify the interface. Almost every LAN is a /64.

## Kinds of addresses
- **Link-local**, starting with **fe80::**: every IPv6 interface makes one for itself automatically, with no server, and uses it to talk to neighbors on the same link. Seeing only an fe80 address means the device has not received a routable address.
- **Global unicast**, starting with **2000::/3** (in practice 2 or 3 as the first hex digit): the public, internet-routable addresses.
- **Unique local**, starting with **fc00::/7** (usually fd): the IPv6 equivalent of private addresses.
- **Loopback**, **::1**: the machine itself, like 127.0.0.1.
- **Multicast**, starting with ff: replaces broadcasts.

## How devices get an address
A router announces the network prefix, and each host builds its own address by adding an interface identifier: **stateless autoconfiguration** (SLAAC). A **DHCPv6** server can also hand out addresses and options. Either way, one interface routinely has several IPv6 addresses at once, which surprises people used to IPv4.

## Dual stack and tunneling
Most networks run **dual stack**: IPv4 and IPv6 on every device at the same time, and the operating system prefers IPv6 when the destination has one. Where an IPv6 island must cross an IPv4-only network, **tunneling** wraps IPv6 packets inside IPv4.

## What changes for a technician
- No NAT is needed; every device can be globally addressed, so the firewall carries the security job.
- No broadcasts, no ARP; neighbor discovery does the same work with multicast.
- Addresses are long, so DNS matters even more. AAAA records hold IPv6 addresses.
- A misconfigured IPv6 setup can slow a machine that keeps trying IPv6 first and timing out, which is why "disable IPv6 on the adapter" appears as a troubleshooting step.

> Exam tip: colons and hex mean IPv6. fe80 is link-local and automatic; 2000 range is global; ::1 is loopback; :: compresses one run of zeros. Dual stack runs both protocols together.`,
      hook: "128 bits, eight hex groups, colons; drop leading zeros; :: once for a zero run; /64 networks. fe80:: link-local automatic, 2000::/3 global, fc00::/7 unique local, ::1 loopback, ff multicast. SLAAC or DHCPv6. Dual stack runs both; no NAT, no broadcast; AAAA records."
    },
    {
      id: "u3l3", title: "DNS Records and Email Authentication: A, AAAA, CNAME, MX, TXT, SPF, DKIM, and DMARC", domain: 2, obj: "2.4", minutes: 10,
      body: `DNS is the internet's phone book, and its records are the entries. Core 1 asks which record does which job and how three of them keep a company's email from being forged.

## How a lookup works
The browser asks the operating system for www.example.com. The OS checks its cache and the hosts file, then asks the configured DNS server. That server asks the root servers, then the .com servers, then example.com's own name servers, caches the answer for its time-to-live (TTL), and returns the address. A wrong DNS server address means every name fails while pings to IP addresses still work; the tool that shows what a lookup returns is {{nslookup}}.

## The records
- **A**: a name to an IPv4 address. www.example.com to 203.0.113.10.
- **AAAA**: a name to an IPv6 address.
- **CNAME** (canonical name): an alias pointing at another name. shop.example.com is really store.hostingprovider.com; change the target and the alias follows.
- **MX**: the mail server for a domain, with a priority number where lower is tried first. Without an MX record, nobody can send mail to the domain.
- **TXT**: free-form text attached to a name. Used to prove domain ownership to services and, most importantly, to carry SPF, DKIM, and DMARC.
- Also seen: **NS** (the domain's name servers) and **PTR** (reverse lookup, address to name).

## Email authentication and spam management, the three TXT records
Anyone can put any address in the From line of an email, so receiving servers check three records published by the sender's domain:
- **SPF** (sender policy framework) lists which servers are allowed to send mail for the domain. A message from a server not on the list fails SPF.
- **DKIM** (DomainKeys identified mail) is a cryptographic signature the sending server adds to each message; the public key lives in DNS. A receiver that verifies the signature knows the message came from the domain and was not altered in transit.
- **DMARC** (domain-based message authentication, reporting, and conformance) is the policy that tells receivers what to do when SPF or DKIM fails: **none** (just report), **quarantine** (spam folder), or **reject**, and where to send reports.
A company whose messages land in spam or whose domain is being spoofed needs these three records set up correctly.

## Common tasks
- A new website: create an A record (and AAAA) for the domain and often a CNAME for www.
- Moving mail to a cloud provider: change the MX records to the provider's servers and add the provider's SPF and DKIM records.
- Verifying ownership of the domain with a service: add the TXT record it gives you.
- A change "not working yet": the old record is still cached somewhere until the TTL expires.

> Exam tip: name to IPv4 is A, to IPv6 is AAAA, alias is CNAME, mail server is MX, text is TXT. SPF says who may send, DKIM signs, DMARC says what to do on failure. All three live in TXT records.`,
      hook: "Lookup: cache, hosts file, DNS server, root, TLD, authoritative; TTL caches. A IPv4, AAAA IPv6, CNAME alias, MX mail server (lowest priority first), TXT text. SPF allowed senders, DKIM signature, DMARC policy (none, quarantine, reject) and reports; all in TXT. nslookup tests it."
    },
    {
      id: "u3l4", title: "DHCP, VLANs, and VPNs", domain: 2, obj: "2.4", minutes: 10,
      body: `Three configuration concepts appear in nearly every office network. DHCP gives devices their addresses, VLANs split one switch into several networks, and VPNs stretch the office network across the internet.

## DHCP
Dynamic host configuration protocol hands a device everything it needs to talk: an IP address, subnet mask, default gateway, DNS servers, and sometimes more (time server, boot file). The exchange is four UDP messages, remembered as **DORA**:
1. **Discover**: the client broadcasts "any DHCP servers?"
2. **Offer**: a server proposes an address.
3. **Request**: the client asks for that address.
4. **Acknowledge**: the server confirms and starts the lease.
Vocabulary you will be tested on:
- **Scope**: the range of addresses a server may hand out on a subnet, such as 192.168.1.100 to 192.168.1.199.
- **Lease**: how long the client may keep the address before renewing; short leases for guest networks, long for offices.
- **Reservation**: a fixed address tied to a specific MAC address, so a printer or access point always gets the same one without being configured statically.
- **Exclusion**: addresses inside the range that the server must never assign, usually because a static device already uses them.
Because Discover is a broadcast, it does not cross routers; a **DHCP relay** on the router forwards it to a server on another subnet. Ports 67 (server) and 68 (client).

## VLANs
A virtual LAN is a logical network created on a managed switch. Ports assigned to VLAN 10 cannot talk to ports on VLAN 20 through the switch, even though they share the hardware. Uses:
- Separating **voice** phones from data so calls get priority.
- A **guest** network kept away from servers.
- Isolating cameras, IoT devices, or a lab.
- Reducing broadcast traffic on a big network.
Traffic between VLANs must go through a router or a layer 3 switch, where a firewall rule can control it. A **trunk** port carries several VLANs between switches with tags on each frame. A device on the wrong VLAN gets no DHCP address or reaches the wrong resources; that is a switch port setting, not a cable problem.

## VPNs
A virtual private network makes an encrypted tunnel across a public network.
- A **client-to-site** (remote access) VPN lets a laptop at home appear to be inside the office network; the VPN client app connects to a VPN concentrator, firewall, or router.
- A **site-to-site** VPN links two office routers permanently so the branch and headquarters are one network.
With **full tunnel** every packet goes through the office; with **split tunnel** only office traffic does and web browsing goes direct. A user who can reach the internet but not internal resources needs the VPN up; a user whose VPN drops every few minutes may have an idle timeout or a flaky connection.

> Exam tip: DORA in order. Reservation is the same address every time by MAC; exclusion is never handed out. VLANs need a managed switch and a router to cross between them. A remote worker reaching office shares uses a client VPN; two offices joined permanently is site-to-site.`,
      hook: "DHCP DORA: Discover, Offer, Request, Acknowledge; scope, lease, reservation (by MAC), exclusion; relay across routers; ports 67 and 68. VLAN: logical network on a managed switch; router to cross; trunk carries tags. VPN: encrypted tunnel; client-to-site or site-to-site; full versus split tunnel."
    },
    {
      id: "u3l5", title: "SOHO Network Setup, Internet Connection Types, and Network Types", domain: 2, obj: "2.7", minutes: 11,
      body: `Setting up a small office or home office network is a performance-based item waiting to happen. Know the steps, the choices, and the vocabulary for what comes in from the outside.

## Setting up the SOHO router
1. Connect the internet side: the coax to the cable modem, the phone line to the DSL modem, or the fiber to the ONT, then Ethernet from that device to the router's **WAN** port.
2. Connect computers to the **LAN** ports or, later, to the wireless network.
3. Sign in to the router's web interface (often 192.168.1.1 or 192.168.0.1) and **change the default administrator password** before anything else.
4. Update the firmware.
5. Set the wireless network: an **SSID** that does not identify the family or business, **WPA3** security (or WPA2 with AES if devices are older), a strong passphrase, and a **channel** that avoids the neighbors (1, 6, or 11 on 2.4 GHz, or let the router choose on 5 GHz). Turn off WPS.
6. Check the DHCP scope, add reservations for printers and a NAS, and set a static address on anything that needs one.
7. Create a **guest network** so visitors and IoT devices never touch the main LAN.
8. Only if needed: **port forwarding** to expose a specific service on an inside device, and disable UPnP unless something requires it. Content filtering and parental controls live here too.
9. Test from a wired and a wireless client: address, gateway, DNS, internet.

## Internet connection types
- **Fiber**: light through glass to an ONT at the premises; the fastest, symmetric upload and download, immune to electrical interference.
- **Cable**: coax to a DOCSIS modem; fast but shared with the neighborhood, so evenings slow down; upload much slower than download.
- **DSL**: the copper phone line to a DSL modem; always on, but speed drops with distance from the telephone exchange.
- **Satellite**: a dish to a satellite; available anywhere with sky, but high latency (bad for gaming and voice), weather sensitive, and capped. Low-orbit constellations cut the latency.
- **Cellular**: 4G LTE or 5G through a phone hotspot or a cellular router; mobile and quick to deploy; data caps.
- **WISP** (wireless internet service provider): fixed wireless from a tower to an antenna on the roof; rural areas; needs line of sight.

## Network types by size
- **PAN**: personal area network, a few meters, Bluetooth between your phone and headset.
- **LAN**: one building or site.
- **WLAN**: a LAN over Wi-Fi.
- **MAN**: a metropolitan network across a city or campus.
- **WAN**: connects sites across regions; the internet is the biggest WAN.
- **SAN**: a storage area network, a dedicated high-speed network (Fibre Channel or iSCSI) that gives servers block-level access to shared storage.

> Exam tip: first step after connecting a new router is change the default admin password. Highest latency is satellite; distance-limited is DSL; shared with neighbors is cable; symmetric and fastest is fiber; line of sight from a tower is WISP. Bluetooth is a PAN; block storage over its own network is a SAN.`,
      hook: "Modem or ONT to the WAN port; change the admin password first; firmware; SSID, WPA3 or WPA2 AES, channel 1, 6, or 11; DHCP reservations; guest network; port forwarding only if needed. Fiber fastest and symmetric; cable shared; DSL distance-limited; satellite high latency; cellular mobile; WISP line of sight. PAN, LAN, WLAN, MAN, WAN, SAN."
    },
    {
      id: "u3l6", title: "Networking Tools: Crimper, Stripper, Punchdown, Tester, Toner Probe, Loopback Plug, Wi-Fi Analyzer, and Tap", domain: 2, obj: "2.8", minutes: 8,
      body: `A technician's network bag holds a small set of tools, and the exam asks which one fits a job. Learn each tool by the problem it solves.

## Making cables
- **Cable stripper**: removes the outer jacket without nicking the wires inside. A nicked conductor is a future intermittent fault.
- **Crimper**: presses an RJ45 (or RJ11) plug onto the wire ends. Arrange the eight wires in T568A or T568B order, push them fully into the plug, crimp, and check that the jacket is inside the strain relief.
- **Punchdown tool**: seats each wire into a 110 punchdown block on a patch panel or the back of a keystone jack and trims the excess in one push. The color codes on the jack tell you where each wire goes. A 66 block is the older telephone version.

## Testing cables
- **Cable tester**: plug both ends in and it lights each of the eight wires in turn. It finds opens (a wire not connected), shorts, crossed pairs, and split pairs, and tells you whether the cable is straight-through or crossover. It does not measure quality.
- **Cable certifier**: a more expensive tester that measures the cable against its category (Cat 6a and so on); required for new installations that must be warranted.
- **Loopback plug**: a plug wired to send the port's transmit pins back into its receive pins. Plug it into a NIC or a switch port and the port should show link and pass a self-test. It isolates a suspected bad port without any other equipment.

## Finding cables
- **Toner probe** (tone generator and probe): clip the generator onto one end of a cable and wave the probe along the bundle or the patch panel; it squeals when it touches the right cable. This is how you find which of forty unlabeled cables in the closet goes to a jack.

## Wireless and traffic
- **Wi-Fi analyzer**: an app or handheld that shows every network in range, its channel, its signal strength, and interference. Use it to pick a clear channel, find dead spots, place access points, and see a rogue access point.
- **Network tap**: a hardware device inserted into a link that copies all traffic to a monitoring port without disrupting the link, so a protocol analyzer can capture it. A managed switch's port mirroring does the same job in software.

## Matching the tool to the complaint
- "Which cable in the closet goes to room 214?" Toner probe.
- "Is this port on the switch dead?" Loopback plug.
- "The new run to the conference room does not link." Cable tester (look for an open or a miswire).
- "Wireless is slow in the east wing." Wi-Fi analyzer.
- "Terminate the new runs on the patch panel." Punchdown tool.
- "Put an end on this cable." Stripper, then crimper.

> Exam tip: locate a cable is a toner probe; test a port with nothing else is a loopback plug; wire map and opens is a cable tester; seat wires in a panel is a punchdown tool; channels and signal is a Wi-Fi analyzer; copy traffic for capture is a tap.`,
      hook: "Stripper removes the jacket; crimper attaches RJ45 plugs; punchdown seats wires in a 110 block or keystone. Cable tester finds opens, shorts, miswires; certifier proves the category. Loopback plug tests a port alone. Toner probe finds a cable in a bundle. Wi-Fi analyzer shows channels and signal. Tap copies traffic."
    }
  ]
});
