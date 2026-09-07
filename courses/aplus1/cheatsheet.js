// APlus Academy Core 1 memorization sheet for CompTIA A+ 220-1201. Ports, standards, speeds, pinouts, part facts,
// print processes, cloud terms, and symptom-to-cause pairs that must be recalled cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "A+ Core 1 Memorization Sheet",
  intro: "Print this and keep it beside you. Core 1 is a recall exam: port numbers, wireless standards, cable categories, connector names, RAM and drive facts, the laser printing steps, cloud vocabulary, and which symptom points to which part. Every line here is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Exam", "CompTIA A+ Core 1, 220-1201 (A+ needs Core 1 and Core 2, 220-1202)"],
          ["Questions and time", "Up to 90 questions in 90 minutes; multiple choice plus performance-based items"],
          ["Passing", "675 on a scale of 100 to 900 (Core 2 needs 700)"],
          ["Hardware and Network Troubleshooting", "28%"],
          ["Hardware", "25%"],
          ["Networking", "23%"],
          ["Mobile Devices", "13%"],
          ["Virtualization and Cloud Computing", "11%"]
        ] },
        { type: "note", text: "Troubleshooting and hardware are more than half the exam. For every part: what it is called, its number (speed, pins, volts, distance), how it fails, and what you check first." }
      ]
    },
    {
      id: "ports", title: "Ports and protocols",
      blocks: [
        { type: "table", cols: ["Port", "Protocol", "Transport", "Purpose"], rows: [
          ["20, 21", "FTP", "TCP", "File transfer; 21 commands, 20 data; clear text"],
          ["22", "SSH", "TCP", "Secure remote shell; also SFTP and SCP"],
          ["23", "Telnet", "TCP", "Clear-text remote terminal; replaced by SSH"],
          ["25", "SMTP", "TCP", "Sending mail between servers (587 for client submission with TLS)"],
          ["53", "DNS", "UDP and TCP", "Name to address lookups (TCP for large answers and zone transfers)"],
          ["67, 68", "DHCP", "UDP", "Automatic addressing; server listens on 67, client on 68"],
          ["80", "HTTP", "TCP", "Web, unencrypted"],
          ["110", "POP3", "TCP", "Download mail to one device (995 secure)"],
          ["137 to 139", "NetBIOS / NetBT", "UDP 137, 138; TCP 139", "Legacy Windows name service and file sharing"],
          ["143", "IMAP", "TCP", "Mail kept on the server, synced across devices (993 secure)"],
          ["161, 162", "SNMP", "UDP", "Device monitoring; 162 traps"],
          ["389", "LDAP", "TCP", "Directory queries (636 LDAPS)"],
          ["443", "HTTPS", "TCP", "Web over TLS"],
          ["445", "SMB / CIFS", "TCP", "Windows file and printer sharing"],
          ["3389", "RDP", "TCP", "Remote Desktop"],
          ["123", "NTP", "UDP", "Time synchronization"],
          ["514", "Syslog", "UDP", "Log collection"],
          ["5900", "VNC", "TCP", "Cross-platform screen sharing"]
        ] },
        { type: "list", title: "TCP versus UDP", cols: 2, items: [
          "TCP: connection-oriented (three-way handshake), reliable, ordered, acknowledged, retransmits; web, mail, file transfer, remote desktop",
          "UDP: connectionless, no acknowledgment, low overhead; DNS lookups, DHCP, streaming, VoIP, SNMP, syslog, TFTP",
          "A port identifies the service at an address; well-known ports are 0 to 1023; a firewall filters by address and port"
        ] }
      ]
    },
    {
      id: "wireless", title: "Wireless",
      blocks: [
        { type: "table", cols: ["Standard", "Wi-Fi name", "Band", "Top speed", "Notes"], rows: [
          ["802.11a", "", "5 GHz", "54 Mb/s", "Old; short range"],
          ["802.11b", "", "2.4 GHz", "11 Mb/s", "Oldest common; DSSS"],
          ["802.11g", "", "2.4 GHz", "54 Mb/s", "Backward compatible with b"],
          ["802.11n", "Wi-Fi 4", "2.4 and 5 GHz", "600 Mb/s", "MIMO, 40 MHz channels"],
          ["802.11ac", "Wi-Fi 5", "5 GHz only", "About 6.9 Gb/s", "MU-MIMO, 80 and 160 MHz channels"],
          ["802.11ax", "Wi-Fi 6 and 6E", "2.4 and 5 GHz; 6E adds 6 GHz", "About 9.6 Gb/s", "OFDMA, better in crowds"],
          ["802.11be", "Wi-Fi 7", "2.4, 5, and 6 GHz", "About 46 Gb/s", "320 MHz channels, multi-link"]
        ] },
        { type: "table", cols: ["Band", "Range and penetration", "Channels", "Crowding"], rows: [
          ["2.4 GHz", "Longest range, best through walls", "1 to 11 in the US; only 1, 6, and 11 do not overlap at 20 MHz", "Microwaves, Bluetooth, cordless phones, neighbors"],
          ["5 GHz", "Shorter range", "Many non-overlapping channels; some require DFS (radar avoidance)", "Less crowded; 20, 40, 80, 160 MHz widths"],
          ["6 GHz", "Shortest range", "Widest clean spectrum; Wi-Fi 6E and 7 only", "Newest devices only"]
        ] },
        { type: "list", title: "Other radios", cols: 2, items: [
          "Channel width: wider channels carry more data but overlap more; regulations set which channels and power levels a country allows",
          "Bluetooth: 2.4 GHz personal area network; pairing with a PIN; class 2 about 10 m; low energy for wearables",
          "NFC: 13.56 MHz, about 4 cm, tap to pay and pair; RFID: tags read by radio at a distance, passive (no battery) or active",
          "Long-range fixed wireless and cellular (3G, 4G LTE, 5G) serve as internet connections where cable and fiber are absent"
        ] }
      ]
    },
    {
      id: "hardware-net", title: "Network hardware and services",
      blocks: [
        { type: "table", cols: ["Device", "What it does", "Remember"], rows: [
          ["Router", "Connects networks; forwards by IP address; the default gateway", "Layer 3; NAT and DHCP in SOHO routers"],
          ["Switch", "Connects devices in one network; forwards by MAC address per port", "Layer 2; managed (VLANs, PoE settings, monitoring) versus unmanaged (plug and play)"],
          ["Access point", "Bridges wireless clients to the wired network", "Not a router by itself; SSID, channel, security"],
          ["Patch panel", "Terminates building cable runs at the closet; patch cables to switch ports", "Punched down with a 110 tool; labeling"],
          ["Firewall", "Allows or blocks traffic by address, port, and rule", "Stateful; hardware or software"],
          ["PoE injector / PoE switch", "Sends power over the data cable to APs, phones, cameras", "802.3af 15.4 W; 802.3at PoE+ 30 W; 802.3bt PoE++ 60 W (Type 3) and 100 W (Type 4)"],
          ["Cable modem", "Internet over the cable TV coax (DOCSIS)", "F-type connector; shared neighborhood bandwidth"],
          ["DSL modem", "Internet over the phone line", "RJ11; distance to the exchange limits speed"],
          ["ONT", "Optical network terminal; converts fiber to Ethernet at the premises", "Fiber to the home"],
          ["NIC", "Network interface card; wired or wireless", "Burned-in 48-bit MAC address, six hex pairs, first half is the manufacturer"],
          ["Hub", "Obsolete repeater that sends every frame to every port", "Collisions; replaced by switches"]
        ] },
        { type: "table", cols: ["Server role or appliance", "Provides"], rows: [
          ["DNS", "Names to addresses"],
          ["DHCP", "Addresses, masks, gateways, DNS servers by lease"],
          ["File share and print server", "Shared folders (SMB) and shared printers with queues"],
          ["Mail server", "SMTP out, IMAP or POP3 in"],
          ["Syslog", "Collects logs from devices"],
          ["Web server", "HTTP and HTTPS"],
          ["AAA", "Authentication, authorization, accounting (RADIUS, TACACS+)"],
          ["Database server", "SQL data for applications"],
          ["NTP", "Time"],
          ["Spam gateway", "Filters inbound mail before the mail server"],
          ["UTM", "Unified threat management: firewall, IDS/IPS, antivirus, content filter in one box"],
          ["Load balancer", "Spreads requests across several servers; high availability"],
          ["Proxy server", "Fetches web content on behalf of clients; caching, filtering, logging"],
          ["SCADA and legacy embedded", "Industrial control; old, fragile, isolate on their own network"],
          ["IoT", "Smart devices: thermostats, cameras, speakers, locks; segregate and patch"]
        ] }
      ]
    },
    {
      id: "ip", title: "IP addressing and configuration",
      blocks: [
        { type: "table", cols: ["Item", "Value"], rows: [
          ["IPv4 address", "32 bits, four octets 0 to 255, such as 192.168.1.20"],
          ["Private ranges", "10.0.0.0 to 10.255.255.255 (/8); 172.16.0.0 to 172.31.255.255 (/12); 192.168.0.0 to 192.168.255.255 (/16)"],
          ["Public addresses", "Everything else; routable on the internet; shared through NAT at the router"],
          ["APIPA", "169.254.x.x: the client got no DHCP answer; link or DHCP server problem"],
          ["Loopback", "127.0.0.1 (IPv6 ::1): tests the local TCP/IP stack"],
          ["Subnet mask", "255.255.255.0 = /24 (254 hosts); 255.255.0.0 = /16; 255.0.0.0 = /8; same network portion means direct delivery, otherwise via the gateway"],
          ["Default gateway", "The router's address on the local network; must be in the same subnet as the host"],
          ["Static versus dynamic", "Static typed in (servers, printers); dynamic from DHCP (workstations, phones); reservations give a fixed address by MAC"],
          ["IPv6 address", "128 bits, eight hex groups; :: compresses zeros; fe80:: link-local on every interface; 2000::/3 global; no NAT needed"]
        ] },
        { type: "table", cols: ["DNS record", "Purpose"], rows: [
          ["A", "Name to IPv4 address"],
          ["AAAA", "Name to IPv6 address"],
          ["CNAME", "Alias of another name"],
          ["MX", "Mail server for a domain"],
          ["TXT", "Free text; carries SPF, DKIM, and DMARC"],
          ["SPF (TXT)", "Which servers may send mail for the domain"],
          ["DKIM (TXT)", "Cryptographic signature proving the message was not altered and came from the domain"],
          ["DMARC (TXT)", "Policy telling receivers what to do when SPF or DKIM fails (none, quarantine, reject) and where to send reports"]
        ] },
        { type: "list", title: "DHCP, VLAN, VPN", cols: 2, items: [
          "DHCP scope: the pool of addresses; lease: how long a client keeps one; reservation: a fixed address tied to a MAC; exclusion: addresses in the range never handed out",
          "DORA: Discover, Offer, Request, Acknowledge",
          "VLAN: a logical network on a managed switch; separates traffic (voice, guest, devices) without separate hardware; a router connects VLANs",
          "VPN: an encrypted tunnel across a public network; site-to-site or client; the client appears to be on the office network"
        ] }
      ]
    },
    {
      id: "connections", title: "Internet connection and network types",
      blocks: [
        { type: "table", cols: ["Connection", "Medium", "Traits"], rows: [
          ["Fiber", "Glass, ONT at the premises", "Fastest, symmetric, immune to interference"],
          ["Cable", "Coax, DOCSIS modem", "Fast, shared with neighbors, asymmetric"],
          ["DSL", "Copper phone line", "Distance-limited, slower; always-on"],
          ["Satellite", "Dish to orbit", "Available anywhere; high latency; weather affects it; data caps"],
          ["Cellular", "4G LTE, 5G", "Mobile; hotspot and tethering; caps"],
          ["WISP", "Fixed wireless from a tower to an antenna", "Rural; line of sight"]
        ] },
        { type: "table", cols: ["Network type", "Scope"], rows: [
          ["PAN", "Personal: Bluetooth, a few meters"],
          ["LAN", "One building or site"],
          ["WLAN", "A LAN over Wi-Fi"],
          ["MAN", "A city or campus"],
          ["WAN", "Between sites, across regions; the internet"],
          ["SAN", "Storage area network: block storage over a dedicated network (Fibre Channel, iSCSI)"]
        ] }
      ]
    },
    {
      id: "cables", title: "Cables and connectors",
      blocks: [
        { type: "table", cols: ["Copper category", "Speed", "Bandwidth", "Notes"], rows: [
          ["Cat 5", "100 Mb/s", "100 MHz", "Obsolete"],
          ["Cat 5e", "1 Gb/s", "100 MHz", "Minimum for gigabit"],
          ["Cat 6", "1 Gb/s (10 Gb/s to 55 m)", "250 MHz", "Tighter twists, spline"],
          ["Cat 6a", "10 Gb/s to 100 m", "500 MHz", "Common for 10 gigabit"],
          ["Cat 7", "10 Gb/s", "600 MHz", "Shielded; GG45 or RJ45"],
          ["Cat 8", "25 or 40 Gb/s to 30 m", "2,000 MHz", "Data center runs"]
        ] },
        { type: "list", title: "Copper rules", cols: 2, items: [
          "Maximum run 100 m (328 ft) including patch cables; RJ45 eight-pin plug; RJ11 four or six-pin phone plug",
          "T568A order: white-green, green, white-orange, blue, white-blue, orange, white-brown, brown. T568B: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown",
          "Same standard both ends = straight-through (device to switch); A on one end and B on the other = crossover (like devices; rarely needed with auto-MDIX)",
          "UTP unshielded (normal); STP shielded for high-interference areas; plenum-rated jackets for air-handling spaces (low smoke); direct burial for outdoors",
          "Coax: RG-6 for cable TV and modems, F-type screw connector; RG-59 for short CCTV runs; BNC bayonet connector"
        ] },
        { type: "table", cols: ["Fiber", "Core", "Source", "Distance", "Connectors"], rows: [
          ["Single-mode", "About 9 microns", "Laser", "Kilometers", "ST (bayonet twist), SC (square push-pull), LC (small clip, most common)"],
          ["Multimode", "50 or 62.5 microns", "LED or VCSEL", "Hundreds of meters (OM3 about 300 m at 10 Gb/s)", "Same connectors; orange or aqua jackets"]
        ] },
        { type: "table", cols: ["Interface", "Speed", "Notes"], rows: [
          ["USB 2.0", "480 Mb/s", "5 m cable; black port; Type A, B, mini, micro"],
          ["USB 3.0 (3.2 Gen 1)", "5 Gb/s", "3 m; blue port; SuperSpeed"],
          ["USB 3.1 Gen 2", "10 Gb/s", "Teal or red port"],
          ["USB 3.2 Gen 2x2", "20 Gb/s", "USB-C only"],
          ["USB4", "40 Gb/s (80 in version 2)", "USB-C; tunnels Thunderbolt, DisplayPort, PCIe"],
          ["Thunderbolt 3 and 4", "40 Gb/s", "USB-C connector; daisy chain; power delivery; Thunderbolt 5 is 80 Gb/s"],
          ["USB-C", "Connector, not a speed", "Reversible 24-pin; can carry USB, DisplayPort alt mode, Thunderbolt, and up to 240 W power delivery"],
          ["Lightning", "USB 2.0 speeds", "Apple 8-pin reversible; replaced by USB-C on newer devices"],
          ["Serial RS-232", "Kilobits", "DB9 connector; console ports on network gear"],
          ["SATA", "1.5, 3, 6 Gb/s (SATA I, II, III)", "7-pin data, 15-pin power; 1 m cable; eSATA external to 2 m"],
          ["Molex", "Power only", "4-pin 5 V and 12 V for older drives and fans"]
        ] },
        { type: "table", cols: ["Video", "Signal", "Notes"], rows: [
          ["VGA", "Analog", "15-pin DE-15, blue; degrades with length; no audio"],
          ["DVI", "Digital (DVI-D), analog (DVI-A), both (DVI-I)", "Single link 1920 x 1200; dual link 2560 x 1600; no audio"],
          ["HDMI", "Digital video and audio", "19-pin; Type A full, C mini, D micro; HDMI 2.1 up to 48 Gb/s, 8K; CEC control"],
          ["DisplayPort", "Digital video and audio", "20-pin with a latch; multi-stream daisy chaining; DP 2.0 up to 80 Gb/s; mini DisplayPort"],
          ["USB-C DisplayPort alt mode", "Digital", "One cable for video, data, and power"]
        ] }
      ]
    },
    {
      id: "displays", title: "Displays",
      blocks: [
        { type: "table", cols: ["Type", "Traits"], rows: [
          ["LCD TN (twisted nematic)", "Cheapest, fastest response, poor viewing angles and color"],
          ["LCD IPS (in-plane switching)", "Best color and viewing angles; slower and pricier; professional and most laptops"],
          ["LCD VA (vertical alignment)", "High contrast, deep blacks; middle on angles and speed"],
          ["OLED", "Each pixel emits its own light; perfect blacks, thin, flexible; risk of burn-in; used in phones and premium laptops"],
          ["Mini-LED", "An LCD with thousands of tiny backlight zones; high brightness and contrast without burn-in"],
          ["Inverter", "Converts DC to AC for CCFL backlights in old LCDs; a dim screen visible with a flashlight means backlight or inverter"],
          ["Touch screen and digitizer", "The digitizer layer senses touch or pen; a cracked digitizer works badly even if the image is fine"]
        ] },
        { type: "list", title: "Attributes", cols: 2, items: [
          "Resolution: 1920 x 1080 Full HD; 2560 x 1440 QHD; 3840 x 2160 4K UHD; the native resolution is the only one that looks sharp",
          "Pixel density in pixels per inch: the same resolution on a smaller panel is sharper",
          "Refresh rate in hertz: 60 standard, 120 to 240 for gaming; the cable and port must support the rate at the resolution",
          "Color gamut: sRGB (web), Adobe RGB and DCI-P3 (print and video); a wider gamut shows more colors"
        ] }
      ]
    },
    {
      id: "memory", title: "Memory, storage, and RAID",
      blocks: [
        { type: "table", cols: ["RAM", "Pins (DIMM / SODIMM)", "Voltage", "Typical speeds", "Notes"], rows: [
          ["DDR3", "240 / 204", "1.5 V (1.35 V low voltage)", "800 to 2133 MT/s", "Keyed differently from DDR4"],
          ["DDR4", "288 / 260", "1.2 V", "2133 to 3200 MT/s", "Most common in service now"],
          ["DDR5", "288 / 262", "1.1 V", "4800 MT/s and up", "Different key from DDR4; on-module power management; two channels per module"]
        ] },
        { type: "list", title: "Memory rules", cols: 2, items: [
          "Generations are not interchangeable; the notch position enforces it. SODIMM for laptops and small form factors; DIMM for desktops",
          "ECC RAM detects and corrects single-bit errors; servers and workstations; the board and CPU must support it. Non-ECC for consumer systems",
          "Channels: install matched modules in the color-coded paired slots for dual (or quad) channel bandwidth; a single module runs single channel",
          "Virtual memory (paging file) uses disk when RAM is full; constant paging means add RAM"
        ] },
        { type: "table", cols: ["Storage", "Facts"], rows: [
          ["HDD", "Spinning platters; 5,400, 7,200, 10,000, 15,000 rpm; 2.5-inch (laptop) and 3.5-inch (desktop); slow, cheap per TB; fails with clicking and grinding"],
          ["SSD SATA", "No moving parts; about 550 MB/s limited by SATA III; 2.5-inch or mSATA or M.2 SATA"],
          ["SSD NVMe", "Talks PCIe directly; M.2 or add-in card; thousands of MB/s (Gen 3 about 3.5 GB/s, Gen 4 about 7 GB/s)"],
          ["M.2", "A slot and form factor, not an interface: keys B, M, or B+M; sizes 2242, 2260, 2280 (22 mm wide, length in mm); can be SATA or NVMe"],
          ["SAS", "Serial Attached SCSI; enterprise drives, 12 Gb/s, dual ports; SAS controllers accept SATA drives, not the reverse"],
          ["Removable", "USB flash drives; SD, microSD, CompactFlash memory cards; speed classes on the card"],
          ["Optical", "CD 700 MB; DVD 4.7 GB (8.5 dual layer); Blu-ray 25 GB (50 dual layer)"]
        ] },
        { type: "table", cols: ["RAID", "How", "Minimum drives", "Survives", "Usable capacity"], rows: [
          ["0", "Striping", "2", "No drive failure", "100% (sum of drives)"],
          ["1", "Mirroring", "2", "One drive", "50%"],
          ["5", "Striping with distributed parity", "3", "One drive", "All but one drive"],
          ["6", "Striping with double parity", "4", "Two drives", "All but two drives"],
          ["10 (1+0)", "Stripe of mirrors", "4", "One drive per mirrored pair", "50%"]
        ] }
      ]
    },
    {
      id: "boards", title: "Motherboards, CPUs, firmware, and power",
      blocks: [
        { type: "table", cols: ["Form factor", "Size", "Notes"], rows: [
          ["ATX", "12 x 9.6 in (305 x 244 mm)", "Full size; most expansion slots"],
          ["microATX", "9.6 x 9.6 in", "Fits ATX cases; fewer slots"],
          ["Mini-ITX", "6.7 x 6.7 in (170 mm)", "Small builds; one expansion slot"]
        ] },
        { type: "table", cols: ["Connector", "Facts"], rows: [
          ["PCIe", "Lanes x1, x4, x8, x16; a card fits in a longer slot; per lane about 1 GB/s (Gen 3), 2 GB/s (Gen 4), 4 GB/s (Gen 5) each direction; graphics cards use x16"],
          ["PCI", "Legacy 32-bit parallel slot; 133 MB/s shared"],
          ["Main power", "24-pin (20+4) ATX; 4- or 8-pin EPS for the CPU; 6-pin (75 W) and 8-pin (150 W) PCIe for graphics; 12VHPWR 16-pin up to 600 W"],
          ["Drive power", "SATA 15-pin; Molex 4-pin"],
          ["SATA and eSATA", "7-pin data ports on the board; eSATA on the rear panel"],
          ["Headers", "Front panel (power, reset, LEDs), USB 2.0 and 3.0, audio, fan (3-pin voltage, 4-pin PWM), RGB"],
          ["M.2", "Key and length printed by the slot; some slots are SATA only, some NVMe only, some both"],
          ["CPU sockets", "Intel LGA (pins in the socket, such as LGA 1700 and 1851); AMD AM4 PGA (pins on the chip) and AM5 LGA; board chipset must match the CPU generation; servers may be multisocket"]
        ] },
        { type: "table", cols: ["BIOS / UEFI setting", "Why it matters"], rows: [
          ["UEFI versus legacy BIOS", "UEFI: GPT disks over 2 TB, Secure Boot, graphical setup, network boot; legacy uses MBR"],
          ["Boot options", "Order of devices; USB or network boot for installs; disable unused to harden"],
          ["USB permissions", "Disable ports or block storage devices to prevent data theft"],
          ["TPM", "Trusted Platform Module: stores keys for BitLocker and Windows Hello; TPM 2.0 required by Windows 11; can be firmware (fTPM) or a chip"],
          ["Secure Boot", "Only signed boot loaders run; blocks boot-sector malware; may need disabling for some Linux or older media"],
          ["Passwords", "Supervisor (setup) versus user (boot) password; cleared by the CMOS jumper or battery removal"],
          ["Fans and temperature", "Fan curves, temperature monitoring, thermal shutdown thresholds"],
          ["Virtualization support", "Intel VT-x or AMD-V must be enabled for hypervisors"],
          ["HSM", "Hardware security module: a dedicated external device for key storage and crypto in servers and enterprises"],
          ["CMOS battery", "CR2032 coin cell; a dead one resets time, date, and settings at every boot"]
        ] },
        { type: "list", title: "CPUs and cooling", cols: 2, items: [
          "x86 is 32-bit, x64 is 64-bit (more than 4 GB of RAM); ARM is a low-power RISC design in phones, tablets, Apple silicon, and some laptops; software must be built for the architecture",
          "Cores run separate work at once; simultaneous multithreading (Hyper-Threading) shows two threads per core; cache L1, L2, L3 speeds up access; clock in GHz",
          "Expansion cards: video (GPU, VRAM), sound, capture (recording HDMI input), NIC (wired or wireless); need a free slot, power, and a driver",
          "Cooling: case fans (intake front, exhaust rear), CPU heat sink and fan, thermal paste or pad between CPU and sink (replace when reseating), liquid all-in-one coolers; dust is the enemy"
        ] },
        { type: "table", cols: ["Power supply", "Facts"], rows: [
          ["Input", "110 to 120 VAC (North America, 60 Hz) or 220 to 240 VAC (much of the world, 50 Hz); auto-switching or a red voltage selector; wrong setting destroys the supply"],
          ["Output rails", "3.3 V (orange), 5 V (red), 12 V (yellow), ground (black); 12 V feeds CPU, GPU, and drives"],
          ["Connectors", "24-pin (20+4) main, EPS CPU, PCIe, SATA power, Molex"],
          ["Wattage", "Add the components' draw and leave headroom; a GPU may need 300 W or more by itself"],
          ["Efficiency", "80 Plus Bronze, Silver, Gold, Platinum, Titanium; higher wastes less as heat"],
          ["Modular", "Only the cables you need; better airflow"],
          ["Redundant", "Two supplies in servers; one fails, the other carries the load; hot swappable"]
        ] }
      ]
    },
    {
      id: "printers", title: "Printers",
      blocks: [
        { type: "table", cols: ["Laser step", "What happens"], rows: [
          ["1 Processing", "The page is rasterized into a bitmap in the printer's memory"],
          ["2 Charging", "The primary charge roller (or corona wire) puts a uniform negative charge (about minus 600 V) on the drum"],
          ["3 Exposing", "The laser writes the image, removing charge where toner should stick"],
          ["4 Developing", "Negatively charged toner from the developer roller clings to the exposed areas"],
          ["5 Transferring", "The transfer roller (or corona) gives the paper a positive charge that pulls toner off the drum"],
          ["6 Fusing", "Heat (about 180 C) and pressure melt the toner into the paper; the fuser is hot"],
          ["7 Cleaning", "A blade scrapes leftover toner off the drum; a lamp erases the charge"]
        ] },
        { type: "table", cols: ["Printer", "Key parts", "Maintenance"], rows: [
          ["Laser", "Imaging drum, toner cartridge, fuser, transfer belt or roller, pickup rollers, separation pad, duplexing assembly", "Replace toner; apply the maintenance kit (fuser, rollers, pads) at the page count; calibrate; clean with a toner vacuum, never compressed air"],
          ["Inkjet", "Ink cartridges, print head, carriage belt, feed rollers, duplexer", "Clean and align print heads; replace cartridges; calibrate; clear jams; keep heads from drying"],
          ["Thermal", "Heating element, feed assembly, special heat-sensitive paper, no ink", "Replace paper; clean the heating element with isopropyl alcohol; remove debris; keep paper away from heat"],
          ["Impact (dot matrix)", "Print head with pins, ribbon, tractor feed, multipart carbonless paper", "Replace ribbon, print head, and paper; the only type that prints multipart forms"],
          ["3D", "Filament (FDM) or resin, print bed, nozzle", "Level the bed; clear the nozzle; store filament dry"]
        ] },
        { type: "list", title: "Deployment and settings", cols: 2, items: [
          "Unbox, remove shipping tape and locks, place near power and network away from heat and dust; update firmware; install the right driver for the OS",
          "PCL: fast, printer-dependent, everyday output. PostScript: device-independent page description, exact and consistent, used in graphics and publishing",
          "Connectivity: USB (one PC), Ethernet, wireless; sharing: a printer shared from a PC versus a print server that manages queues and drivers centrally",
          "Settings: duplex (both sides), orientation (portrait, landscape), tray selection and paper size, quality and draft mode",
          "Security: user authentication, badge release, audit logs, secured (held) prints released with a PIN at the device",
          "Scan services: scan to email (SMTP settings), scan to folder (SMB share and credentials), scan to cloud; ADF for stacks, flatbed for books and cards"
        ] }
      ]
    },
    {
      id: "mobile", title: "Mobile devices",
      blocks: [
        { type: "table", cols: ["Laptop part", "Replacement notes"], rows: [
          ["Battery", "Lithium-ion; internal on most modern laptops; discharge and disconnect before other work; swollen means replace now"],
          ["Keyboard and keys", "Ribbon cable under the palm rest; individual keycaps on scissor or butterfly mechanisms"],
          ["RAM", "SODIMM; many thin laptops solder it (not upgradable)"],
          ["Storage", "2.5-inch SATA or M.2 (SATA or NVMe); check the key and length"],
          ["Wireless card", "M.2 (2230) card; the two antenna leads (main and aux) route through the hinge to the lid; black and white or gray leads must go to their marked terminals"],
          ["Camera and microphone", "In the lid bezel; cable through the hinge; a physical privacy shutter on some"],
          ["Biometrics and NFC", "Fingerprint reader in the power button or palm rest; smart card or NFC reader for badges"]
        ] },
        { type: "list", title: "Connections and accessories", cols: 2, items: [
          "USB-C (reversible, data, video, power), microUSB and miniUSB (older), Lightning (Apple, older); NFC tap; Bluetooth pairing; tethering and hotspot share a phone's cellular data",
          "Docking station: a full set of ports and power with one connection (Thunderbolt or USB-C, or proprietary). Port replicator: adds ports only, usually USB",
          "Accessories: stylus (active pens need pairing or a battery), headsets, speakers, webcams; trackpad, drawing pad, track point",
          "Cellular: 3G, 4G LTE, 5G; SIM card or eSIM profile identifies the subscriber; airplane mode; data roaming",
          "Bluetooth pairing: enable Bluetooth, enable pairing (discoverable), find the device, enter the PIN, test the connection",
          "Location: GPS satellites (needs sky) and cellular or Wi-Fi positioning (works indoors, less precise)",
          "MDM: corporate versus BYOD device configurations, policy enforcement (passcodes, encryption, remote wipe), corporate application deployment",
          "Synchronization: mail, calendar, contacts, cloud storage, business apps; watch data caps on cellular; sync over Wi-Fi when possible"
        ] }
      ]
    },
    {
      id: "virt", title: "Virtualization and cloud",
      blocks: [
        { type: "table", cols: ["Term", "Meaning"], rows: [
          ["Type 1 hypervisor", "Bare metal, runs directly on hardware (server virtualization); best performance"],
          ["Type 2 hypervisor", "Runs as an application on a host OS (desktop virtualization, testing)"],
          ["Sandbox", "An isolated VM to open suspicious files or test changes safely"],
          ["Test and development", "Many OS versions on one machine; snapshots to roll back"],
          ["Application virtualization", "Run legacy software or another OS's programs; cross-platform virtualization"],
          ["VDI", "Virtual desktop infrastructure: desktops run on servers, users connect with thin clients"],
          ["Containers", "Share the host kernel; lighter than VMs; package an application with its dependencies"],
          ["VM requirements", "CPU virtualization enabled, enough RAM and storage for each guest, network mode (bridged, NAT, host-only), and security (patch guests, isolate, guard against VM escape)"]
        ] },
        { type: "table", cols: ["Cloud model", "Meaning"], rows: [
          ["Public", "Provider's shared infrastructure, pay as you go"],
          ["Private", "Dedicated to one organization, on premises or hosted"],
          ["Hybrid", "Private plus public, workloads move between them"],
          ["Community", "Shared by organizations with common needs (government, healthcare)"],
          ["IaaS", "Rent virtual machines, storage, and networks; you manage the OS up"],
          ["PaaS", "A platform to build and run applications; the provider manages OS and runtime"],
          ["SaaS", "A finished application over the web; email, office suites, CRM"]
        ] },
        { type: "list", title: "Cloud characteristics", cols: 2, items: [
          "Shared resources (multitenancy, cheaper) versus dedicated resources (isolation, predictable performance)",
          "Metered utilization: pay for what you use; ingress (data in) is usually free, egress (data out) is billed",
          "Elasticity: capacity grows and shrinks with demand automatically; availability: uptime commitments through redundancy",
          "File synchronization: the same files on every device and in the cloud; conflicts and deleted-file propagation are the traps"
        ] }
      ]
    },
    {
      id: "troubleshoot", title: "Troubleshooting",
      blocks: [
        { type: "list", title: "The method (CompTIA's best practice)", cols: 1, items: [
          "1 Identify the problem: gather information, question the user, identify changes, back up before making changes. 2 Establish a theory of probable cause; question the obvious; research. 3 Test the theory. 4 Establish a plan of action and implement it. 5 Verify full functionality and implement preventive measures. 6 Document findings, actions, and outcomes."
        ] },
        { type: "table", cols: ["Board, RAM, CPU, power symptom", "Likely cause and first check"], rows: [
          ["No power, no fans", "Outlet, cord, PSU switch and voltage selector, PSU (test with a tester or paperclip), front panel header"],
          ["Fans spin, no POST, beeps", "Beep codes point to RAM or video; reseat RAM and card; one module at a time"],
          ["Blank screen after POST", "Monitor input, cable, GPU seating and power; onboard video"],
          ["Random shutdown, overheating, burning smell", "Dust, failed fan, dried thermal paste, failing PSU; check temperatures in firmware"],
          ["Proprietary crash screen (BSOD, pinwheel)", "Driver, RAM (run a memory test), storage, overheating; note the stop code"],
          ["Sluggish performance, application crashes", "RAM shortage, thermal throttling, failing drive, malware"],
          ["Unusual noise", "Fan bearing (whine), HDD (clicking, grinding), coil whine under load"],
          ["Capacitor swelling or leaking", "Board or PSU failure; replace"],
          ["Inaccurate date and time", "CMOS battery (CR2032)"]
        ] },
        { type: "table", cols: ["Drive and RAID symptom", "Likely cause and first check"], rows: [
          ["Clicking, grinding", "HDD mechanical failure; back up immediately, replace"],
          ["Bootable device not found", "Boot order, loose cable, dead drive, corrupted boot record, USB stick left in"],
          ["S.M.A.R.T. failure warning", "Drive predicts its own failure; back up and replace"],
          ["Extended read and write times, low IOPS", "Failing drive, fragmentation on HDD, nearly full SSD, wrong SATA mode"],
          ["Data loss or corruption", "Failing drive, bad cable, power loss during writes; run chkdsk after a backup"],
          ["RAID failure, array missing, audible alarm", "A failed member; replace the drive and rebuild; check the controller and its battery; a missing array may be a controller or driver"],
          ["Missing drives in the OS", "Not initialized or partitioned, driver, cable, power, disabled port in firmware"],
          ["LED status indicators", "Amber or red on a drive bay means degraded or failed"]
        ] },
        { type: "table", cols: ["Video and display symptom", "Likely cause and first check"], rows: [
          ["No image, incorrect input source", "Select the right input; check the cable and adapter; try another cable"],
          ["Dim image", "Brightness, power saving, failing backlight or inverter; shine a flashlight at the screen"],
          ["Fuzzy image, sizing issues", "Non-native resolution, scaling, VGA over a long cable, projector focus"],
          ["Flashing or flickering screen", "Loose cable, refresh rate, driver, failing panel or inverter"],
          ["Incorrect color, distorted image", "Bent VGA pins, cable, driver, color profile, degaussing on CRTs"],
          ["Dead pixels", "Panel defect; warranty policy; stuck pixels may recover"],
          ["Burn-in", "Static image on OLED or plasma; pixel shift and screensavers prevent it"],
          ["Burnt-out bulb, intermittent projector shutdown", "Replace the lamp (hours counter); overheating from a clogged filter"],
          ["Audio issues over HDMI or DisplayPort", "Select the display as the output device; cable supports audio"]
        ] },
        { type: "table", cols: ["Mobile symptom", "Likely cause and first check"], rows: [
          ["Poor battery health, short life", "Aged battery (check health percentage), background apps, brightness, radios; replace"],
          ["Swollen battery", "Stop using it; do not puncture; replace and dispose properly"],
          ["Improper charging", "Cable, adapter wattage, dirty or damaged port, wrong charger"],
          ["Overheating", "Charging while gaming, direct sun, malware, a failing battery"],
          ["Liquid damage", "Power off, do not charge, dry thoroughly; indicators inside show exposure"],
          ["Digitizer issues, cursor drift, touch calibration", "Cracked digitizer, screen protector, calibration utility, moisture"],
          ["Poor or no connectivity", "Airplane mode, Wi-Fi or cellular toggles, SIM seating, forget and rejoin the network, carrier settings"],
          ["Malware, cannot install apps, degraded performance", "Unofficial app sources, full storage, OS out of date, factory reset as last resort"],
          ["Stylus does not work", "Battery or pairing on active pens, wrong pen model, digitizer"],
          ["Broken screen, damaged port", "Replace the assembly; ports are soldered on many devices"]
        ] },
        { type: "table", cols: ["Network symptom", "Likely cause and first check"], rows: [
          ["Intermittent wireless", "Weak signal, interference, channel overlap, roaming between APs, driver"],
          ["Slow speeds", "Congestion, wrong cable category, duplex mismatch, bandwidth hogs, a hub"],
          ["Limited connectivity, APIPA address", "No DHCP: link, cable, VLAN, DHCP server"],
          ["Intermittent internet", "ISP, modem, router overheating, DNS; test the modem directly"],
          ["Jitter, high latency, poor VoIP", "Congestion; no QoS; wireless for voice; satellite links"],
          ["Port flapping", "Link going up and down: bad cable or connector, failing NIC, switch port, duplex or speed mismatch"],
          ["External interference", "Microwaves, motors, fluorescent ballasts, neighbors' Wi-Fi; move to 5 GHz or shielded cable"],
          ["Authentication failures", "Wrong password or key, expired certificate, RADIUS server, MAC filtering, time skew"]
        ] },
        { type: "table", cols: ["Printer symptom", "Likely cause and first check"], rows: [
          ["Lines or streaks down the page", "Dirty or scratched drum, low toner, dirty print head (inkjet), a scratch on the fuser"],
          ["Faded prints", "Low toner or ink, economy mode, transfer roller worn, humidity"],
          ["Speckling", "Loose toner in the printer; leaking cartridge; clean"],
          ["Double or echo images (ghosting)", "Drum not cleaned, worn drum, fuser problem"],
          ["Toner not fused, smears when touched", "Fuser failed or not reaching temperature; wrong paper"],
          ["Garbled print", "Wrong driver or language (PCL versus PostScript), bad cable, corrupted job, low printer memory"],
          ["Paper jams, multipage misfeed", "Worn pickup rollers or separation pad, damp or wrong paper, overfilled tray, debris"],
          ["Paper not feeding, tray not recognized", "Rollers, tray seating, paper guides, tray sensor, firmware"],
          ["Multiple prints pending, frozen queue", "Restart the print spooler service, clear the queue, check the printer status and connectivity"],
          ["Incorrect page orientation or size", "Driver settings, application settings, tray paper size mismatch"],
          ["Grinding noise", "Gears, rollers, drum drive, foreign object; maintenance kit"],
          ["Finishing issues (staple jams, hole punch)", "Clear the finisher, refill staples, check the finisher tray sensors"],
          ["Connectivity issues", "IP change on DHCP (use a reservation), Wi-Fi, cable, sleep mode, firewall"]
        ] }
      ]
    },
    {
      id: "tools", title: "Networking and hardware tools",
      blocks: [
        { type: "table", cols: ["Tool", "Use"], rows: [
          ["Crimper", "Attaches RJ45 or RJ11 plugs to cable ends"],
          ["Cable stripper", "Removes the jacket without nicking conductors"],
          ["Punchdown tool", "Seats wires into a 110 or 66 block or a keystone jack and trims them"],
          ["Cable tester", "Checks wire map, opens, shorts, split pairs; certifiers measure to category"],
          ["Toner probe (tone generator and probe)", "Finds the far end of a cable in a bundle or closet"],
          ["Loopback plug", "Tests a NIC or switch port by looping transmit to receive"],
          ["Wi-Fi analyzer", "Shows signal strength, channels, and interference; site surveys"],
          ["Network tap", "Copies traffic on a link for a protocol analyzer without disrupting it"],
          ["Multimeter", "Voltage, continuity, resistance; PSU rails and cables"],
          ["Power supply tester", "Checks each PSU rail and the power-good signal"],
          ["POST card", "Reads the firmware's progress codes when a board will not boot"],
          ["ESD strap and mat", "Prevents static damage while handling boards, RAM, and cards"]
        ] }
      ]
    }
  ]
};
