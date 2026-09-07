// APlus Academy Core 1 deeper explanations, units 1 to 3. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u1l1: `## Why laptops are a separate skill
A desktop is a box with room to move. A laptop is a sandwich: the bottom cover, the board, the battery, the keyboard, and the display are stacked and screwed together, with ribbon cables threaded between them. Every replacement means undoing part of the stack in the right order and putting it back without pinching a cable or stripping a screw. The exam tests the order and the gotchas, not brand-specific steps.

## The sandwich, layer by layer
\`\`\`
lid        display panel, webcam and microphone, wireless antennas around the panel
hinge      display cable, camera cable, and the two antenna leads pass through here
top cover  keyboard (ribbon to the board), trackpad, fingerprint reader, NFC reader
board      CPU (soldered), RAM (SODIMM slots or soldered), M.2 storage, M.2 wireless card
battery    flat lithium-ion pack under the palm rest, connector to the board
bottom     cover with screws of several lengths; vents; sometimes an access door
\`\`\`
Most modern service starts by removing the bottom cover, which exposes the battery connector, RAM, storage, and wireless card. Keyboards and trackpads usually need the board or the top cover out.

## A worked replacement: the wireless card
A user's laptop shows one bar of Wi-Fi at their desk while a phone next to it shows full signal. The card is suspect.
1. Shut down, unplug, remove the bottom cover, disconnect the battery.
2. The card is an M.2 2230 module held by one screw, with two hair-thin coaxial leads clipped to it. Note which lead is on which terminal (main and aux; usually one black, one white or gray) before touching them.
3. Remove the screw; the card tilts up; slide it out. Seat the new card, screw it down, press each antenna lead straight down onto its terminal until it clicks.
4. Reconnect the battery, replace the cover, boot, and install the driver.
If the signal is still one bar, the fault is an antenna lead broken where it passes through the hinge, and the fix is a new antenna assembly in the lid. That is the exam's favorite detail: the antennas are in the lid, around the display, because the base is full of metal and sits low.

## A worked replacement: RAM
A laptop with 4 GB is sluggish with a browser open. The board has two SODIMM slots, one empty.
- Check the maximum the board supports and the generation in the slot (DDR4 will not fit a DDR5 slot; the notch differs).
- Insert the new module at about a 30-degree angle until the contacts disappear, then press down until the side clips snap.
- Boot and confirm the total in firmware or the OS. If only the old amount shows, reseat; a module not pressed fully home is the usual cause.
If there is no slot at all, the memory is soldered and the honest answer is "this laptop cannot be upgraded."

## Batteries deserve respect
\`\`\`
symptom                            action
holds 30 minutes, health under 60% replace the pack
laptop only runs on the adapter    replace the pack (or the charging circuit if a new pack does not help)
trackpad or keyboard bulging up    swollen cell: stop use, do not press, replace, recycle properly
\`\`\`
Never puncture or bend a swollen pack, never toss one in the trash, and never leave a removed pack shorted in a bag of screws.

## How the exam asks it
- "Before replacing a laptop keyboard, what should the technician do FIRST?" Disconnect the AC adapter and the battery.
- "A user replaced a laptop's wireless card and now has weak signal. Most likely cause?" An antenna lead is not connected.
- "Where are a laptop's wireless antennas located?" In the lid, around the display.
- "Which memory module type fits a laptop?" SODIMM.
- "The trackpad on a laptop has started to bulge. What should be done?" Replace the battery; it is swollen.

## What to memorize
- Power off, unplug, disconnect the battery, ESD strap, screw map, photos.
- SODIMM at an angle, then press down; match the generation; soldered means not upgradable.
- M.2 for storage (check key and length) and for wireless (2230 with two antenna leads).
- Antennas in the lid, through the hinge. Camera and microphone in the lid bezel.
- Fingerprint in the power button or palm rest; smart card in the side; NFC under the palm rest.`,

u1l2: `## Connectors are shapes; capabilities are negotiated
The trap in this topic is assuming the shape tells you the speed. USB-C is a shape. A USB-C port on a cheap phone runs at USB 2.0 speed; the same shape on a laptop may carry Thunderbolt at 40 Gb/s, drive two 4K monitors, and charge the laptop. The cable and the ports on both ends negotiate what the link will do. When a "USB-C to HDMI" adapter fails, the usual reason is that the port does not support DisplayPort alternate mode, not that the adapter is broken.

## The connectors at a glance
\`\`\`
connector   shape                     reversible   speed class          where you see it
USB-C       small rounded oval        yes          USB 2.0 up to USB4   modern phones, tablets, laptops, docks
microUSB    small trapezoid           no           USB 2.0              older Android phones, accessories
miniUSB     wider trapezoid           no           USB 2.0              old cameras, GPS units, controllers
Lightning   flat 8-pin tab            yes          USB 2.0              older iPhones and iPads, accessories
USB-A       flat rectangle            no           USB 2.0 or 3.x       the host side on PCs and chargers
\`\`\`
Think of USB-C as a highway with several lanes that can be assigned to different traffic: USB data, DisplayPort video, Thunderbolt, and power. Lightning and micro/mini USB are single-lane roads.

## Radios that touch, and radios that hover
NFC works over roughly 4 cm; the two devices practically have to touch. That short range is a feature: it is why a payment terminal cannot be triggered from across the room. Bluetooth reaches across a room. The two work together: tapping a speaker to a phone uses NFC to exchange the Bluetooth pairing information so the user never opens a settings menu.

## Sharing a connection, three ways
\`\`\`
method               link                speed        battery cost   notes
Wi-Fi hotspot        phone becomes an AP fastest      high           several devices at once
USB tethering        cable to a laptop   fast         charges phone  most reliable; one device
Bluetooth tethering  PAN                 slowest      low            emergencies, light use
\`\`\`
All three draw on the cellular plan. A user asking why the laptop "used up the phone's data" has been on a hotspot.

## Dock or replicator: a worked choice
A finance user has a thin laptop with two USB-C ports and wants to sit down at a desk, plug in one cable, and have two monitors, a wired network, a keyboard, a mouse, and charging. That list is a docking station: one Thunderbolt or USB-C connection carrying power delivery inbound, video outbound, and a USB hub and Ethernet chipset inside the dock. A port replicator would add USB ports and maybe one display over a USB connection, but usually would not charge the laptop or drive two high-resolution screens. The exam's cue words are "single connection," "charge," and "multiple monitors."

## Styluses and the rest
A passive stylus is a rubber-tipped stick; it works on any capacitive screen and cannot sense pressure. An active stylus has electronics: it may have a replaceable battery or charge magnetically from the tablet, it reports pressure and tilt, it may need Bluetooth pairing for its buttons, and it is usually matched to a device family. A user whose new pen "does nothing" most often bought one for a different platform, or its battery is dead, or it is not paired.
Headsets come wired (3.5 mm or USB-C) or Bluetooth; a wired headset is the fix when a call center cannot tolerate pairing drops. A drawing pad (graphics tablet) is a flat slab that maps the pen to the screen; a trackpad reads finger gestures.

## How the exam asks it
- "Which connector is reversible and can carry video, data, and power?" USB-C.
- "A user wants one cable to charge a laptop and connect two monitors and Ethernet." Docking station.
- "Which technology allows a payment by touching a phone to a terminal?" NFC.
- "Which tethering method also charges the phone?" USB tethering.
- "An active stylus stops working. First check?" Its battery or charge, then pairing.

## What to memorize
- USB-C: reversible, 24 pins, data plus DisplayPort alt mode plus Thunderbolt plus up to 240 W power delivery.
- microUSB and miniUSB: older, one way, USB 2.0. Lightning: Apple 8-pin, reversible, USB 2.0.
- NFC 13.56 MHz, about 4 cm. Bluetooth, meters, a PAN.
- Hotspot is Wi-Fi; tethering is USB or Bluetooth.
- Docking station charges and drives monitors over one connection; port replicator adds ports.`,

u1l3: `## Four radios, four jobs
A phone carries a cellular radio for the carrier network, a Wi-Fi radio for local networks, a Bluetooth radio for accessories, and a GPS receiver that only listens. When "the phone will not connect," the first question is which radio the user means, and the second is whether airplane mode or a toggle has switched it off.

## The cellular side
\`\`\`
generation   what it added                          status
3G           voice plus usable data                 being shut down by carriers
4G LTE       all-IP broadband, tens of Mb/s         the everyday network
5G           faster, lower latency, more devices    low band = range; mmWave = speed but short reach
\`\`\`
The radio has its own firmware, the baseband, and the carrier pushes small "carrier settings" or PRL (preferred roaming list) updates. When a phone shows signal but cannot make data connections after a move to a new region, a carrier settings update is one of the standard fixes.

## SIM versus eSIM
Think of the SIM as the key to the carrier's door. It stores the subscriber identity number and secret keys; the carrier's network challenges the phone and the SIM answers. Because the identity lives on the card, moving the card moves the phone number. An eSIM is the same key baked into a chip inside the phone; the carrier sends a profile (typically by QR code) that programs it. Advantages: no tray, no lost cards, several profiles at once, remote provisioning. Disadvantage: moving to a new phone means re-provisioning rather than swapping a card.
\`\`\`
problem                                     check
"No SIM" or "SIM not provisioned"           reseat the card; is it activated; is the tray damaged
works on Wi-Fi only, no cellular data       airplane mode; cellular data toggle; APN or carrier settings; plan
works at home, not abroad                   roaming disabled; carrier lock; no roaming agreement
second line does not appear                 eSIM profile not installed or not enabled
\`\`\`

## Wi-Fi and hotspots
Phones behave like laptops on Wi-Fi with one extra behavior: they prefer Wi-Fi for data to protect the cellular plan, and some silently fall back to cellular when Wi-Fi is weak. A hotspot turns the phone into an access point; it has its own SSID and password and drains the battery fast.

## Bluetooth pairing, and why the order matters
1. Turn on Bluetooth on the phone.
2. Put the accessory into pairing mode so it advertises itself (a held button, a blinking light).
3. Choose it from the phone's list.
4. Confirm the passkey (a six-digit match on modern devices, or a fixed PIN such as 0000 on simple ones).
5. Test.
Most pairing failures happen at step 2: the accessory was never made discoverable, or it is already connected to another phone in the room and will not advertise. The fix is to disconnect it from the other device or to forget and re-pair.

## Location, precisely
GPS receivers compute position from satellite timing; they need a view of several satellites, so they struggle indoors and in city canyons, and they consume power. Cellular positioning triangulates from tower signals and Wi-Fi positioning matches nearby access points against a database; both work indoors but only to tens of meters. Phones combine all of them and add assistance data over the network to speed up a GPS fix. The exam angle: a device that locates well outdoors but not inside is depending on GPS; an app that cannot get location has been denied the permission or location services are off.

## How the exam asks it
- "Which component identifies the subscriber to the carrier and can be moved between phones?" The SIM.
- "A phone shows no cellular, no Wi-Fi, and no Bluetooth. First check?" Airplane mode.
- "Which step comes first when pairing a headset?" Enable Bluetooth, then make the headset discoverable.
- "Which technology provides location indoors when GPS cannot?" Cellular and Wi-Fi positioning.
- "Which lets a carrier provision a line without a physical card?" eSIM.

## What to memorize
- 3G, 4G LTE, 5G (low band range, mmWave speed).
- SIM holds the subscriber identity; eSIM is a downloaded profile; multiple profiles possible.
- Airplane mode kills all radios; toggles restore Wi-Fi and Bluetooth individually.
- Pairing: on, discoverable, select, PIN, test.
- GPS: satellites, outdoors, accurate. Cell and Wi-Fi: indoors, approximate.`,

u1l4: `## The problem MDM solves
The company owns its data but often does not own the phone it sits on. Mobile device management is the set of tools that let an IT department enforce rules, deliver apps, and remove company data from a device it may never physically touch. Synchronization is the plumbing that carries the data onto the device in the first place.

## Ownership decides the shape of management
\`\`\`
model                who owns it   what IT controls                         wipe on departure
corporate-owned      company       the whole device: settings, apps, camera  full wipe
BYOD                 employee      a work profile or container only         selective wipe of the work data
\`\`\`
On a BYOD device the work profile is a walled garden: work mail, work contacts, work apps, work files, all encrypted with their own key. Personal photos and messages sit outside and IT cannot see them. On a corporate device there is no wall; IT can restrict the camera, block app stores, force a VPN, and locate the phone.

## Enrollment and policy
Enrollment ties the device to the MDM server: the user installs the MDM app or profile, signs in, and accepts the management. Devices bought through a corporate program can enroll automatically the first time they are turned on. Once enrolled, policies flow down:
- Passcode length, complexity, and lock timeout; biometrics allowed or not.
- Encryption required; OS minimum version; jailbreak and root detection.
- App allow and deny lists; a managed app catalog; app configuration pushed with the app.
- Wi-Fi, VPN, and certificate profiles preloaded so the user never types a Wi-Fi password.
- Remote lock, locate, and wipe.
Compliance is checked continuously. A device that drifts out of compliance (encryption off, an outdated OS) is quarantined: its access to mail and internal apps is blocked until the user fixes the problem. A technician's first check on a "my work email stopped" ticket is often the compliance status in the MDM console.

## Corporate applications
The MDM pushes the company's apps, preconfigured: the mail client already pointed at the server, the authenticator app enrolled, a managed browser with the intranet bookmarks. Application management adds data controls: no copy from the work mail into a personal note, no saving a work attachment to a personal cloud, no screenshots of a work app.

## Synchronization, what and where
\`\`\`
data                      typical source                    direction
mail, contacts, calendar  corporate mail or a cloud suite   two-way; changes on any device propagate
photos and documents      cloud storage                     upload from the phone, download elsewhere
bookmarks, passwords      the platform account              two-way
app data and settings     the app's own cloud               varies
\`\`\`
Sync runs to the cloud (most common) or to a desktop over USB or Wi-Fi. Two failure modes recur. A **conflict** is the same contact edited on two devices before they sync; most systems keep the latest edit or produce a duplicate. A **data cap** overrun is a photo library or a video app syncing over cellular; the fix is "sync over Wi-Fi only" and "background data off for that app." Roaming multiplies the cost; disable data roaming before travel unless the plan covers it.

## A worked case
An employee leaves. Their personal phone is enrolled as BYOD. The right action is a selective wipe from the MDM console: the work profile, its mail, files, and apps are removed; the employee's photos and messages remain. A full wipe would be wrong on a personal device. Had the phone been corporate-owned, a full wipe and a factory reset before reassignment would be correct.

## How the exam asks it
- "Which allows an employee's personal phone to hold company data in a separate, removable space?" BYOD with a work profile (containerization).
- "An employee leaves. Which MDM action removes company data only?" Selective wipe.
- "A user exceeds their cellular data plan every month. Most likely cause?" Photo or file sync over cellular; set it to Wi-Fi only.
- "A phone is blocked from corporate email after an OS update was skipped." Out of compliance; update the OS.

## What to memorize
- Corporate-owned: full control, full wipe. BYOD: work profile, selective wipe.
- Policies: passcode, encryption, OS version, app lists, remote lock and wipe, profiles for Wi-Fi, VPN, certificates.
- Sync covers mail, contacts, calendar, cloud files, bookmarks, passwords; conflicts and data caps are the traps.`,

u2l1: `## Why an analogy helps here
A network is a postal system with two kinds of addresses. The MAC address is the name printed on the mailbox at the end of your driveway: fixed, physical, only useful on your street. The IP address is the postal address: it says which city and street you are on, so the post office can route a letter across the country. The switch is the mail carrier who walks your street and knows which mailbox belongs to whom. The router is the sorting office that reads the city and forwards the letter toward it.

## The two addresses
\`\`\`
                MAC address                       IP address
size            48 bits                           32 bits (IPv4) or 128 bits (IPv6)
written as      6 hex pairs: 3C-52-82-1A-9F-04    4 decimal octets: 192.168.1.20
assigned by     the manufacturer (first 3 pairs   you or DHCP
                identify the maker)
changes         no (can be spoofed)               yes, when the device moves networks
used by         switches, within one network      routers, between networks
found with      ipconfig /all (physical address)  ipconfig (IPv4 address)
\`\`\`
ARP is the lookup between them. A device that wants to send to 192.168.1.1 broadcasts "who has 192.168.1.1?" and the owner replies with its MAC. The answer is cached for a few minutes.

## Envelopes inside envelopes
\`\`\`
[ Ethernet frame: src MAC, dst MAC
   [ IP packet: src IP, dst IP
      [ TCP or UDP segment: src port, dst port
         [ application data: an HTTP request, a DNS query ] ] ] ]
\`\`\`
Each device opens only its own envelope. A switch reads the frame's MAC addresses and forwards; it never opens the packet. A router strips the frame, reads the packet's IP addresses, decides where to send it, and wraps it in a new frame addressed to the next hop's MAC. The destination computer opens all of them and hands the data to the right program by port number.

## A walk across the network
Your laptop (192.168.1.20, gateway 192.168.1.1) loads a website whose address is 203.0.113.10.
1. The laptop compares 203.0.113.10 with its own network using the mask. Different network, so the packet must go to the gateway.
2. It ARPs for 192.168.1.1 and learns the router's MAC.
3. It builds a frame: destination MAC = router, containing a packet: destination IP = 203.0.113.10.
4. The switch sees the router's MAC and forwards the frame out the router's port only.
5. The router opens the frame, reads the packet, replaces the private source address with its public one (NAT), and sends it to the ISP.
6. The web server's reply comes back to the router's public address; NAT maps it back to 192.168.1.20 and the router builds a frame for the laptop's MAC.
Every troubleshooting question about "can reach local devices but not the internet" is a break at step 1, 2, or 5: a wrong mask, a wrong or missing gateway, or a router problem.

## Layers as a checklist
\`\`\`
layer (plain name)   things to check                          typical symptom
physical             cable, connector, link light, radio      no link light, "cable unplugged"
data link            MAC, switch port, VLAN, Wi-Fi association  link but no address, wrong VLAN
network              IP, mask, gateway, router                 APIPA address, cannot reach gateway
transport            TCP/UDP, port, firewall                    service blocked, connection refused
application          DNS, HTTP, the program itself             addresses work, names do not
\`\`\`
Work up from the bottom. A link light saves ten minutes of DNS speculation.

## How the exam asks it
- "Which address does a switch use to forward a frame?" The MAC address.
- "A PC can ping neighbors but nothing on the internet. Most likely?" Wrong or missing default gateway.
- "Which device separates two networks and forwards by IP address?" A router.
- "What identifies the manufacturer of a network card?" The first three octets of the MAC address.

## What to memorize
- MAC 48 bits, hex, burned in, local. IP logical, routed, from DHCP or typed in.
- ARP: IP to MAC. Frame carries packet carries segment carries data.
- Switch by MAC within a network; router by IP between networks; gateway is the router.
- Troubleshoot physical, data link, network, transport, application, in that order.`,

u2l2: `## Ports as doors on a building
An IP address is a building's street address; a port is the door inside it that leads to one service. Mail goes to door 25, web to door 80, file sharing to door 445. A firewall is a guard who checks which door you are asking for. Memorizing the doors is unavoidable; the trick is to memorize them in groups that tell a story.

## TCP and UDP, the two delivery services
\`\`\`
                TCP                                   UDP
setup           three-way handshake (SYN, SYN-ACK, ACK) none
reliability     acknowledged, retransmitted, ordered  best effort
overhead        higher                                minimal
suits           web, mail, file transfer, remote desktop  DNS, DHCP, VoIP, streaming, SNMP, syslog, TFTP
analogy         certified mail with a signature       a postcard
\`\`\`
Voice and video prefer UDP because a packet that arrives late is useless; resending it would only add delay. File transfer prefers TCP because one missing byte corrupts the file.

## The port list, told as stories
\`\`\`
group           port(s)        protocol    story
file transfer   20, 21         FTP         21 talks, 20 carries the data
                22             SSH/SFTP    the secure everything: shell, file copy
                445            SMB         Windows shares
                137 to 139     NetBIOS     the ancestors of SMB
remote access   23             Telnet      clear text, one less than 22, replaced by 22
                3389           RDP         Remote Desktop
                5900           VNC         cross-platform screen sharing
mail            25             SMTP        mail out between servers (587 for clients with TLS)
                110            POP3        mail in, download and delete (995 secure)
                143            IMAP        mail in, keep on server, sync everywhere (993 secure)
web             80             HTTP        the web
                443            HTTPS       the web with TLS
plumbing        53             DNS         names (UDP; TCP for big answers)
                67, 68         DHCP        server 67, client 68 (UDP)
                123            NTP         time (UDP)
                161, 162       SNMP        monitoring; 162 traps (UDP)
                389            LDAP        directory (636 LDAPS)
                514            syslog      logs (UDP)
\`\`\`

## Worked examples
- A branch office cannot send email but receives fine. Receiving uses IMAP or POP3; sending uses SMTP. Check that the client is set to the right SMTP port (587 or 25) and that the firewall allows it.
- A new firewall rule blocks "all TCP except 80 and 443." Users can browse, but Remote Desktop to the office (3389) stops, file shares (445) stop, and mail clients (143, 993, 587) stop. DNS still works because it is UDP 53.
- A security audit says "Telnet is in use on the switches." The fix is to enable SSH (22) and disable Telnet (23), because Telnet sends passwords in clear text.
- A scanner set to "scan to folder" cannot save to the file server. That is SMB, port 445, likely blocked between the printer VLAN and the server.

## Secure partners
\`\`\`
clear text   port    secure version   port
Telnet       23      SSH              22
HTTP         80      HTTPS            443
FTP          21      SFTP (over SSH)  22   (or FTPS 990)
POP3         110     POP3S            995
IMAP         143     IMAPS            993
LDAP         389     LDAPS            636
SMTP         25      SMTP with TLS    587
\`\`\`

## How the exam asks it
- "Which port does RDP use?" 3389.
- "Which protocol uses port 445?" SMB.
- "Which two ports does DHCP use?" 67 and 68.
- "A technician needs an encrypted alternative to Telnet." SSH, port 22.
- "Which transport protocol does streaming video typically use, and why?" UDP, because speed matters more than retransmission.
- "Which protocol keeps mail on the server so it appears on every device?" IMAP, port 143 (993 secure).

## What to memorize
- The whole table. Say it out loud daily until 3389 and 445 come without thinking.
- TCP reliable and connection-oriented; UDP fast and connectionless. DNS, DHCP, NTP, SNMP, syslog, TFTP, voice, and video are UDP.
- Secure pairs: 22 for 23, 443 for 80, 993 for 143, 995 for 110, 636 for 389.`,

u2l3: `## Radio is a shared room
Wi-Fi is people talking in a room. The band is which room you are in, the channel is which table, and the channel width is how loud you talk. In the 2.4 GHz room there are only three tables (1, 6, 11) far enough apart that conversations do not overlap, and the room is full of microwave ovens and Bluetooth speakers shouting. The 5 GHz room has many tables and thicker walls (so the signal does not reach as far, but also does not hear the neighbors). The 6 GHz room is new and nearly empty, but only new devices have the key.

## The bands compared
\`\`\`
band     range       through walls   non-overlapping channels          interference          who uses it
2.4 GHz  longest     best            3 (1, 6, 11 at 20 MHz)            microwaves, Bluetooth, everyone   b, g, n, ax, be
5 GHz    medium      moderate        many (some DFS, shared with radar)  little                  a, n, ac, ax, be
6 GHz    shortest    poorest         many wide channels                 almost none              6E, be (Wi-Fi 7)
\`\`\`
Channel width trades range and neighborliness for speed. 20 MHz is polite; 40 MHz doubles throughput and doubles the overlap; 80 and 160 MHz are for 5 and 6 GHz only. Regulatory domains matter: an access point imported from another country may use a channel local laptops are forbidden to hear, and it will look like "the laptop cannot see the network."

## The standards, with the story behind the numbers
\`\`\`
standard   name       band(s)            max rate      the thing it introduced
802.11a    -          5 GHz              54 Mb/s       OFDM at 5 GHz; short range, rare
802.11b    -          2.4 GHz            11 Mb/s       the first popular Wi-Fi
802.11g    -          2.4 GHz            54 Mb/s       a's speed in b's band; backward compatible
802.11n    Wi-Fi 4    2.4 and 5 GHz      600 Mb/s      MIMO (several antennas), 40 MHz channels
802.11ac   Wi-Fi 5    5 GHz only         about 6.9 Gb/s MU-MIMO, 80 and 160 MHz channels
802.11ax   Wi-Fi 6/6E 2.4, 5; 6E adds 6  about 9.6 Gb/s OFDMA: efficient with many clients
802.11be   Wi-Fi 7    2.4, 5, and 6 GHz  about 46 Gb/s 320 MHz channels, multi-link operation
\`\`\`
Two exam traps: 802.11ac is 5 GHz only (its 2.4 GHz side, if any, is really 802.11n), and the "max rate" is a laboratory number; real throughput is a fraction of it.

## Worked example: the slow office
An office has three access points on 2.4 GHz set to channels 1, 3, and 5. Users on the middle AP complain of slowness. Channels 1, 3, and 5 overlap each other, so all three APs are shouting over one another. Set them to 1, 6, and 11, or move clients to 5 GHz, and the problem disappears. A Wi-Fi analyzer would have shown the overlap in one screen.

## Worked example: the old laptop
A conference room on Wi-Fi 6 is fast until one visitor's 802.11g laptop joins, and then everyone slows. Old standards need the AP to slow down and protect their transmissions. The fix is a separate legacy SSID on 2.4 GHz or a policy that excludes b/g.

## Bluetooth, NFC, RFID
\`\`\`
tech       frequency    range           power           examples
Bluetooth  2.4 GHz      ~10 m (class 2) low; BLE tiny   headsets, keyboards, watches, tethering
NFC        13.56 MHz    ~4 cm           passive side needs none  tap to pay, badges, quick pairing
RFID       varies (LF, HF, UHF)  cm to many meters  passive (no battery) or active (battery)  inventory tags, access cards, tolls
\`\`\`
NFC is a special case of RFID built for two-way, very short range exchanges. Passive RFID tags are powered by the reader's field, which is why a stack of warehouse labels can be read by waving a gun at them. Active tags broadcast on their own and are used where range matters, such as vehicles at a toll gate.

## How the exam asks it
- "Which band offers the best range through walls?" 2.4 GHz.
- "Which three 2.4 GHz channels do not overlap?" 1, 6, and 11.
- "Which standard is 5 GHz only?" 802.11ac (Wi-Fi 5).
- "Which standard added 6 GHz?" Wi-Fi 6E (802.11ax extended), and Wi-Fi 7 uses it too.
- "A phone pays at a terminal by tapping it." NFC.
- "Which RFID tag has no battery?" Passive.

## What to memorize
- Bands: 2.4 range, 5 speed, 6 newest. 2.4 GHz channels 1, 6, 11.
- The standards table, especially band and top speed. n = MIMO, ac = 5 GHz only, ax = Wi-Fi 6, 6E = 6 GHz, be = Wi-Fi 7.
- Bluetooth 2.4 GHz about 10 m. NFC 13.56 MHz about 4 cm. RFID passive versus active.`,

u2l4: `## The closet as a city
Think of a building network as a city. The router is the highway on-ramp: the only way in and out. The switches are the city streets connecting every house. The access points are bus stops where wireless riders get on. The patch panel is the street directory that maps every house to its cable. The firewall is the checkpoint at the on-ramp. PoE is the power line strung along the streets so the bus stops and cameras need no separate outlet. The modem or ONT is the bridge from the city to the outside world.

## Devices compared
\`\`\`
device            forwards by      connects                 configure?             one-line memory hook
router            IP address       networks to networks     yes                    the gateway; NAT; between networks
switch, unmanaged MAC address      devices on one network   no                     plug and play
switch, managed   MAC address      same, plus VLANs         yes (web, CLI, SNMP)   VLANs, port settings, PoE control, mirroring
access point      -                Wi-Fi clients to wired   SSID, channel, security  a bridge, not a router
patch panel       -                wall runs to the closet  punch down and label   permanent cable stays put
firewall          rules            inside to outside        yes                    allows or blocks by address and port
PoE injector      -                one run                  no                     power for a single AP or camera
PoE switch        MAC address      many runs with power     yes                    power budget per port and total
cable modem       -                coax to Ethernet         provider                DOCSIS, F-type connector
DSL modem         -                phone line to Ethernet   provider                RJ11, distance-limited
ONT               -                fiber to Ethernet        provider                the fiber box on the wall
NIC               -                a device to the network  driver                  MAC address lives here
hub               nothing (repeats) -                       -                       obsolete; collisions
\`\`\`

## The SOHO router is five devices
The box the ISP hands out contains a router (WAN to LAN), a four-port switch, a wireless access point, a DHCP server, a NAT gateway, and a basic firewall. When a question says "the router" in a home context, any of those functions may be the subject. In a business the pieces are separate boxes: a firewall at the edge, a router (or the firewall routing), core and access switches, a wireless controller, and many access points.

## Managed versus unmanaged, a worked choice
A dental office needs phones on their own voice VLAN, a guest network for the waiting room, PoE for the phones and two cameras, and the ability to see which port is flapping. Every item on that list is a managed switch feature: VLANs, PoE, and per-port monitoring. An unmanaged switch does none of it. Conversely, a home user adding three ports behind a TV needs an unmanaged switch; there is nothing to configure and nothing to break.

## PoE budget math
\`\`\`
standard    name     power at the port   typical loads
802.3af     PoE      15.4 W              phones, small APs, basic cameras
802.3at     PoE+     30 W                Wi-Fi 6 APs, PTZ cameras
802.3bt     PoE++    60 W (Type 3), 100 W (Type 4)   video phones, large APs, small switches, displays
\`\`\`
A 24-port PoE switch might have a 190 W total budget. Twelve PoE+ access points at 30 W would want 360 W, so half of them will not power up, or the switch will drop ports as the budget runs out. A camera that reboots at night when its heater turns on is a budget problem. A PoE injector solves the one-run case: the AP in the far corner where the closet switch has no PoE.

## Modems and the ONT
The modem or ONT belongs to the connection type. Coax comes from the street into a cable modem; the phone line goes into a DSL modem; fiber ends at an ONT, a small box that turns light into an Ethernet port. In every case the next device is the router's WAN port. When the internet is down, the modem's lights are the first thing to read: power, downstream, upstream, online.

## How the exam asks it
- "Which device connects a fiber line to a customer's Ethernet router?" ONT.
- "A technician needs VLANs and per-port configuration." A managed switch.
- "An access point at the end of a long run needs power but the switch has no PoE." A PoE injector.
- "Which standard provides up to 30 W over Ethernet?" 802.3at, PoE+.
- "Which device terminates the building's cable runs in the closet?" A patch panel.
- "Which device forwards packets between networks?" A router.

## What to memorize
- Router by IP between networks; switch by MAC within a network; managed = VLANs and settings.
- Access point bridges Wi-Fi to wired; not a router. Patch panel: punch down, patch cables, labels.
- PoE af 15.4 W, at 30 W, bt 60 or 100 W; injector for one run; switch for many; watch the budget.
- Cable modem DOCSIS and F-type; DSL RJ11; ONT for fiber. Hub is obsolete.`,

u2l5: `## Servers are named after the favor they do
A server is any computer that answers requests, and its role is simply the request it answers. Rather than memorize a list, connect each role to the moment a user would notice it missing. That is how the exam frames it: "users report X; which server is down?"

## What breaks when each server fails
\`\`\`
server          what it provides                            what users see when it fails
DNS             names to addresses                          "the internet is down" but IP pings work
DHCP            addresses by lease                          169.254 addresses; new devices cannot connect
file            shared folders (SMB, NFS)                   mapped drives disappear; "network path not found"
print           shared queues and drivers                   jobs stuck; printers vanish from the list
mail            SMTP out; IMAP or POP3 in                   no send or receive
web             HTTP and HTTPS pages                        site unreachable; internal apps down
syslog          central log collection                      nothing visible to users; blind admins
AAA             RADIUS or TACACS+ authentication             Wi-Fi and VPN logins fail for everyone
database        SQL data for applications                   apps open but show errors or no data
NTP             time                                        logins and certificates fail as clocks drift
\`\`\`
Notice that DNS and DHCP failures look like network failures, and AAA and NTP failures look like password failures. Reading the symptom correctly is the skill.

## Appliances at the edge
\`\`\`
appliance       job                                                    where
spam gateway    filters inbound mail before the mail server              in front of the mail server
UTM             firewall + IDS/IPS + antivirus + content filter + VPN   at the internet edge, small and mid-size offices
load balancer   spreads requests across several identical servers       in front of web or application servers
proxy           fetches web content for clients; caches, filters, logs  between users and the internet
\`\`\`
A load balancer gives availability and scale: three web servers behind one address, and one can fail unnoticed. A proxy gives control: the school blocks gaming sites, the company logs browsing, and popular pages load from the cache. A UTM gives a small business enterprise-style security in one box that one person can manage.

## Worked example: the Monday morning outage
On Monday, Wi-Fi users cannot sign in, but wired PCs work. Wireless uses enterprise authentication against a RADIUS server (AAA). The wired PCs signed in with cached credentials. The AAA server is the suspect, or its clock is wrong (NTP), since certificate checks are time-sensitive. Pull the logs from syslog to confirm.

## Worked example: which appliance
A company's public website slows to a crawl during promotions and goes down when a server reboots. The answer is a load balancer with two or more web servers behind it. If instead the complaint were "employees waste bandwidth on video sites," the answer would be a proxy with content filtering. If it were "we get phishing mail every day," a spam gateway.

## The fragile ones
SCADA (supervisory control and data acquisition) and other industrial control systems drive pumps, conveyors, HVAC, and power equipment. They often run operating systems that stopped receiving updates a decade ago, and a reboot can halt a production line. The rules: keep them on an isolated network segment, allow only the specific connections they need, never let them see the internet, and never run a scan or plug in an unknown laptop without the operators' agreement.
IoT devices are the opposite problem: cheap, numerous, and internet-facing by design. Smart TVs, thermostats, cameras, doorbells, and speakers ship with default passwords and weak firmware. Change the passwords, update the firmware, and put them on a separate VLAN or the guest network so a compromised camera cannot see the file server.

## How the exam asks it
- "Which server translates hostnames to IP addresses?" DNS.
- "Which protocol family does an AAA server use?" RADIUS or TACACS+.
- "Which appliance distributes client requests among multiple servers?" A load balancer.
- "Which device caches web pages and filters content for a network's users?" A proxy server.
- "Which appliance combines firewall, IPS, antivirus, and content filtering?" A UTM.
- "How should a legacy SCADA system be connected?" On an isolated network segment.
- "What is the first security step for a new smart thermostat?" Change the default credentials and update the firmware; place it on a separate network.

## What to memorize
- The server table: DNS, DHCP, file, print, mail, web, syslog, AAA, database, NTP, and each failure symptom.
- Spam gateway, UTM, load balancer, proxy: what each does and where it sits.
- SCADA and legacy: isolate. IoT: change defaults, patch, segregate.`,

u3l1: `## The address as a street address
An IPv4 address is a street address with the street name and the house number squeezed into one line of four numbers. The subnet mask is a ruler that says how many of the numbers are the street and how many are the house. 192.168.1.20 with 255.255.255.0 means street 192.168.1, house 20. Houses on the same street hand things to each other directly; anything for another street goes to the post office on the corner, the default gateway.

## Reading the mask
\`\`\`
mask              prefix   network portion        hosts per subnet
255.0.0.0         /8       first octet            16,777,214
255.255.0.0       /16      first two octets       65,534
255.255.255.0     /24      first three octets     254
255.255.255.128   /25      three octets + 1 bit   126
255.255.255.192   /26      three octets + 2 bits  62
\`\`\`
Core 1 keeps to the easy masks. The test is: do the network portions match? 10.1.5.20/16 and 10.1.200.7/16 share 10.1, so they are on the same subnet. 10.1.5.20/24 and 10.1.200.7/24 differ in the third octet, so they need a router between them.

## The gateway rule
The default gateway must be in the host's own subnet, because the host must be able to reach it directly. A host 192.168.1.20/24 with gateway 192.168.2.1 can talk to its neighbors and nothing else; the gateway is unreachable. This exact mistake, a typo in the third octet, is a standard exam item: "can ping local devices, cannot reach the internet, what is wrong with the configuration?"

## Private, public, and NAT
\`\`\`
range                                 prefix           used by
10.0.0.0 to 10.255.255.255            10.0.0.0/8       enterprises (lots of room)
172.16.0.0 to 172.31.255.255          172.16.0.0/12    mid-size networks; the one people forget
192.168.0.0 to 192.168.255.255        192.168.0.0/16   homes and small offices
\`\`\`
Private addresses are free to reuse and are never routed across the internet; a router translates them to its one public address with NAT, tracking each conversation by port so the replies get back to the right inside host. Everything not in those three ranges (and not 127 or 169.254) is public. Watch 172.32.0.1 and 192.169.0.1: both look private and both are public.

## The two addresses that diagnose themselves
\`\`\`
address         meaning                              what to do
169.254.x.x     APIPA: asked DHCP, got no answer      check link light, cable, switch port VLAN, DHCP server
127.0.0.1       loopback: this machine's own stack    ping it to test TCP/IP is installed and working
\`\`\`
An APIPA address is not a random failure; it is a specific message that the DHCP Discover went unanswered. Two APIPA devices on the same switch can still see each other, which is why "two new laptops can share files but neither reaches the internet" points to a dead DHCP server rather than a dead switch.

## Static, dynamic, and the reservation compromise
\`\`\`
method            who sets it        good for                          risk
static            typed by a person  servers, printers, APs, the router  typos, duplicates, forgotten changes
dynamic (DHCP)    the DHCP server    workstations, phones, laptops       address may change; nothing to find it by
reservation       DHCP server by MAC printers, NAS, cameras               none of the above; one entry to maintain
\`\`\`
A reservation is the professional answer to "the printer's address keeps changing." Set it on the DHCP server and the printer keeps its address forever without touching the printer.

## Worked example: read this configuration
\`\`\`
IPv4 address     192.168.10.57
subnet mask      255.255.255.0
default gateway  192.168.1.1
DNS server       192.168.10.5
\`\`\`
The host is on 192.168.10.0/24; the gateway is on 192.168.1.0/24. They do not match, so the gateway is unreachable and the internet is unreachable. Local devices and the DNS server (same subnet) still work. Fix the gateway to 192.168.10.1 (or whatever the router's local address is).

## How the exam asks it
- "A workstation has 169.254.34.12. What does this indicate?" It could not reach a DHCP server.
- "Which address range is private?" 172.16.0.0 to 172.31.255.255 (pick the one in the three ranges).
- "Which address tests the local TCP/IP stack?" 127.0.0.1.
- "A printer's IP changes and users lose it. Best fix?" A DHCP reservation (or a static address).
- "Two PCs on the same switch: 192.168.1.10/24 and 192.168.2.10/24. Why can they not communicate?" Different subnets; no router between them.

## What to memorize
- Mask splits network from host; /24 = 255.255.255.0; same network portion = same subnet.
- Gateway inside the subnet. Private ranges 10/8, 172.16/12, 192.168/16; NAT shares one public address.
- 169.254 = APIPA = no DHCP. 127.0.0.1 = loopback.
- Static for servers, printers, network gear; dynamic for clients; reservation by MAC.`,

u3l2: `## Why a second addressing system exists
IPv4 has about four billion addresses, which sounded infinite in 1981 and ran out around 2011. NAT stretched it by hiding whole networks behind one public address. IPv6 fixes the problem properly with 128-bit addresses: 340 undecillion of them, enough that every device can have a public address forever. Because both systems will coexist for years, a technician must recognize both on sight.

## Reading an IPv6 address
\`\`\`
full form     2001:0db8:0000:0000:0000:ff00:0042:8329
drop zeros    2001:db8:0:0:0:ff00:42:8329        (leading zeros in each group)
compress      2001:db8::ff00:42:8329             (one run of zero groups becomes ::)
prefix        2001:db8::/64                      (first 64 bits are the network)
\`\`\`
The double colon may appear only once, because otherwise the reader cannot tell how many zero groups each one stands for. Given 2001:db8::1, the machine expands it by filling the gap with zeros until eight groups exist. Practically every LAN uses a /64: 64 bits of network, 64 bits of interface identifier.

## Recognizing the kind of address by its first digits
\`\`\`
starts with     kind             meaning                                   IPv4 cousin
fe80::          link-local       self-assigned; works only on the local link  169.254 (but here it is normal, not a fault)
2xxx or 3xxx    global unicast   public, internet-routable                  public addresses
fc00::/7 (fd)   unique local     private to the organization                10/8, 172.16/12, 192.168/16
::1             loopback         this host                                  127.0.0.1
ff00::/8        multicast        one to many                                broadcast (IPv6 has no broadcast)
\`\`\`
The important nuance: every IPv6 interface always has a link-local address, and that is healthy. A device that has only a link-local address and no global or unique local address has not received a routable one; that is the IPv6 equivalent of an APIPA-only configuration.

## Getting an address without asking
IPv4 devices must ask DHCP or be configured by hand. IPv6 routers periodically announce the network prefix, and each device can build its own address by appending an interface identifier: stateless address autoconfiguration, SLAAC. DHCPv6 still exists for organizations that want central control and for handing out options such as DNS servers. Because addresses can come from several sources and privacy features rotate them, one laptop commonly shows three or four IPv6 addresses at once. That is normal; do not "fix" it.

## Dual stack in practice
\`\`\`
situation                                      behavior
site has IPv4 and IPv6, destination has both   OS prefers IPv6, falls back to IPv4
site has IPv6 only, destination IPv4 only      needs a translation gateway (NAT64)
IPv6 island across an IPv4 network             tunneling: IPv6 packets wrapped in IPv4
IPv6 half-configured (router announces, ISP does not deliver)   slow connections while IPv6 times out first
\`\`\`
The last row explains a common help desk fix: "disable IPv6 on the adapter and the website loads instantly." The real repair is to make IPv6 work or to stop the router advertising it, but the diagnostic is worth knowing.

## What changes for the technician
- No NAT. Every device is reachable by its global address unless the firewall says otherwise, so the firewall is doing the security job NAT used to do accidentally.
- No broadcast and no ARP. Neighbor discovery uses multicast to do the same work.
- DNS becomes essential; AAAA records map names to IPv6 addresses.
- Ping and traceroute have IPv6 forms (ping -6, tracert -6); the loopback is ::1.

## Worked example
A user's adapter shows:
\`\`\`
IPv6 address        2001:db8:1a2b:3c4d::1f/64
link-local address  fe80::9c1e:4b2a:77d0:e3a1%12
IPv4 address        192.168.4.31 /24
\`\`\`
This is a healthy dual-stack host: one global IPv6 address, the automatic link-local, and an IPv4 address. The %12 after the link-local is the interface index Windows needs because every interface has an fe80 address.

## How the exam asks it
- "Which address is a link-local IPv6 address?" The one starting fe80.
- "How many bits are in an IPv6 address?" 128.
- "What does :: represent?" One or more consecutive groups of zeros, used once.
- "Which IPv6 address is the loopback?" ::1.
- "A device has an IPv4 and an IPv6 address at the same time. What is this called?" Dual stack.

## What to memorize
- 128 bits, eight hex groups, colons; leading zeros dropped; :: once; /64 networks.
- fe80 link-local (always present), 2000::/3 global, fc00::/7 unique local, ::1 loopback, ff multicast.
- SLAAC from router advertisements, DHCPv6 optional. Dual stack prefers IPv6. AAAA records.`,

u3l3: `## The phone book and the three seals
DNS is the phone book: look up a name, get a number. Its records are the entry types: a home number (A), a mobile number (AAAA), a "see also" entry (CNAME), a mail room address (MX), and a notes field (TXT). The email authentication records are three seals a company puts on its outgoing mail: SPF says which post offices may send on its behalf, DKIM is a tamper-evident wax seal, and DMARC is the instruction card telling the receiving mail room what to do with letters whose seals are wrong.

## The record types
\`\`\`
record   maps                                example                                        note
A        name to IPv4                        www.example.com  ->  203.0.113.10
AAAA     name to IPv6                        www.example.com  ->  2001:db8::10
CNAME    name to another name (alias)        shop.example.com ->  store.provider.net          the alias follows the target
MX       domain to its mail servers          example.com      ->  10 mail1.example.com, 20 mail2  lower priority number first
TXT      name to free text                   example.com      ->  "v=spf1 include:mailer.net -all"  carries SPF, DKIM, DMARC, verifications
NS       domain to its name servers          example.com      ->  ns1.dnshost.com
PTR      address to name (reverse)           10.113.0.203.in-addr.arpa -> www.example.com   used by mail servers to check senders
\`\`\`
Every record has a TTL, the number of seconds a resolver may cache it. Changing a record does not take effect until the old cached copies expire, which is the answer to "I changed the record and nothing happened."

## How a lookup travels
1. The application asks the OS for www.example.com.
2. The OS checks its cache and the hosts file.
3. It asks the configured DNS server (from DHCP or typed in).
4. That server, if it does not have the answer cached, asks a root server ("who handles .com?"), then a .com server ("who handles example.com?"), then example.com's authoritative server ("what is www?").
5. The answer comes back, is cached for its TTL, and is returned to the application.
The command-line check is {{nslookup www.example.com}}. If it returns an address but the browser still fails, DNS is not the problem. If the client cannot reach its DNS server, ping to an IP works but every name fails.

## The three email seals
\`\`\`
record   full name                                     what it proves                          how it fails
SPF      sender policy framework                       this server is allowed to send for us    mail from an unlisted server
DKIM     DomainKeys identified mail                    the message is signed and unaltered      signature missing or does not verify
DMARC    domain-based message authentication, reporting, and conformance   what to do on failure (none, quarantine, reject) and where to report   the receiver ignores it or the policy is none
\`\`\`
All three are published as TXT records. SPF sits on the domain itself. DKIM's public key sits under a selector name, such as selector1._domainkey.example.com. DMARC sits at _dmarc.example.com.

## Worked example: mail lands in spam
A company moves mail to a cloud provider. Suddenly customers find its messages in their junk folders. The MX records were changed, so inbound mail works, but the SPF record still lists only the old mail server; the provider's servers are not authorized, and DKIM was never set up. Fix: update the SPF TXT record to include the provider, publish the provider's DKIM key, and add a DMARC record starting at p=none to gather reports before tightening to quarantine.

## Worked example: a new website
The marketing team buys example.com and hosts the site with a provider whose server is 203.0.113.10. Create an A record for example.com pointing to 203.0.113.10, a CNAME for www pointing to example.com (or an A record), and, if the provider supports IPv6, an AAAA record. Verification of ownership for the analytics service is a TXT record with the string they supply.

## How the exam asks it
- "Which DNS record type resolves a hostname to an IPv6 address?" AAAA.
- "Which record directs mail for a domain to its mail server?" MX.
- "Which record creates an alias for another hostname?" CNAME.
- "Which record type carries SPF and DKIM information?" TXT.
- "Which mechanism lets a domain owner specify what receivers should do with messages that fail authentication?" DMARC.
- "A technician updated a DNS record but users still reach the old server." Cached records; wait for the TTL or flush the cache.

## What to memorize
- A IPv4, AAAA IPv6, CNAME alias, MX mail (lowest number first), TXT text, NS name servers, PTR reverse.
- TTL caching; nslookup to test; DNS failure = names fail, addresses work.
- SPF who may send, DKIM signature, DMARC policy and reports; all TXT records.`,

u3l4: `## Three tools, three questions
DHCP answers "what address do I use?" VLANs answer "who am I allowed to share a wire with?" VPNs answer "how do I get onto the office network from somewhere else?" The exam treats them as vocabulary plus a scenario each.

## DHCP, the four-step handshake
\`\`\`
step   message      direction         content
1      Discover     client broadcast  "any DHCP server? here is my MAC"
2      Offer        server to client  "you may have 192.168.1.101, mask, gateway, DNS, lease 8 hours"
3      Request      client broadcast  "I accept the offer from server X"
4      Acknowledge  server to client  "confirmed; lease starts now"
\`\`\`
Discover is a broadcast because the client has no address and knows no servers. The Request is also broadcast so any other servers that made offers learn they were declined. Halfway through the lease the client renews quietly with a unicast Request; if the server has vanished, the client keeps trying and, at expiry, drops to APIPA.

## DHCP vocabulary as a picture
\`\`\`
subnet 192.168.1.0/24
  .1            router (static)
  .2 to .49     static devices: servers, printers, APs        (exclusion: DHCP never assigns these)
  .50 to .199   scope: the DHCP pool
       .60      reservation: printer MAC AA-BB-CC-11-22-33 always gets .60
  .200 to .254  unused, or a second exclusion
lease: 8 hours (office), 1 hour (guest Wi-Fi), 7 days (stable desktops)
options: gateway, DNS servers, domain name, NTP, TFTP boot server for phones
\`\`\`
A scope is the pool. A reservation lives inside the pool and pins one address to one MAC. An exclusion is carved out so the server never touches addresses that static devices already use; without it, a laptop can be handed the file server's address and both go silent (a duplicate address).

## DHCP across routers
Because Discover is a broadcast, it stops at the router. A DHCP relay (also called an IP helper) on the router picks up broadcasts and forwards them as unicast to the DHCP server's address, then relays the reply. One server can then serve every subnet. When a new VLAN "cannot get addresses," the relay was not configured for it.

## VLANs, one switch as many
\`\`\`
switch ports 1 to 8    VLAN 10  staff data
switch ports 9 to 16   VLAN 20  voice (phones)
switch ports 17 to 20  VLAN 30  guest Wi-Fi APs
switch ports 21 to 22  VLAN 40  cameras
port 24                trunk    carries VLANs 10, 20, 30, 40 to the router (tagged frames)
\`\`\`
Devices in VLAN 10 never see VLAN 40's traffic through the switch. To cross, packets go up the trunk to the router (or a layer 3 switch), which can apply firewall rules: cameras may reach the recorder and nothing else; guests may reach the internet and nothing inside. VLANs need managed switches and each VLAN is its own IP subnet with its own DHCP scope. A PC on the wrong VLAN gets an address from the wrong scope or none at all; a phone plugged into a data port cannot reach the call server.

## VPNs
\`\`\`
type              who                         endpoint               feels like
client-to-site    a laptop at home or a hotel  VPN concentrator, firewall, or router   the laptop is in the office
site-to-site      two office routers           each other             one network across two buildings
\`\`\`
The tunnel encrypts everything inside it, so coffee shop Wi-Fi cannot read the office traffic. Full tunnel sends all the laptop's traffic through the office (safer, slower, uses office bandwidth); split tunnel sends only office-bound traffic through the VPN and browses the internet directly (faster, less control). A remote user who can open web pages but not the file server or the intranet has no VPN connection, or the VPN client is not started.

## Worked example
A new branch opens with ten PCs and five IP phones on one managed switch. Design: VLAN 10 for data, VLAN 20 for voice, a trunk to the branch router, a DHCP scope per VLAN on the router with the phone VLAN's option pointing at the call server, a reservation for the branch printer, and a site-to-site VPN from the branch router to headquarters so the branch uses the central file server. A traveling salesperson uses a client VPN to the headquarters firewall.

## How the exam asks it
- "Put the DHCP process in order." Discover, Offer, Request, Acknowledge.
- "A printer must always receive the same address without static configuration." DHCP reservation.
- "Which addresses will the DHCP server never assign?" The exclusion range.
- "Which technology separates voice and data traffic on the same switch?" VLANs.
- "A remote employee needs secure access to internal file shares." A client-to-site VPN.
- "Two offices need a permanent secure link." A site-to-site VPN.

## What to memorize
- DORA. Scope, lease, reservation (by MAC), exclusion, relay, ports 67 and 68.
- VLAN: logical network on a managed switch; router or layer 3 switch between VLANs; trunk carries tags.
- VPN: encrypted tunnel; client-to-site versus site-to-site; full versus split tunnel.`,

u3l5: `## A SOHO setup, the way an exam simulation shows it
The performance-based version of this topic drops you at a router's web interface and asks you to make a small office work securely. The order below is the order that avoids locking yourself out and avoids leaving the network open while you work.

## The checklist, with reasons
\`\`\`
step   action                                             why
1      modem, DSL modem, or ONT to the router's WAN port  the router needs its upstream link first
2      PCs to LAN ports; sign in to the router (192.168.1.1 or 192.168.0.1)   wired first, so Wi-Fi changes cannot drop you
3      change the default admin password                  every default is public knowledge
4      update the firmware                                closes known holes; may reset settings, so do it early
5      set the WAN type (DHCP from the ISP, PPPoE for some DSL, static for business fiber)   the internet link
6      SSID: not the family or business name; hide is optional and not real security
7      security: WPA3, or WPA2 with AES; a long passphrase; WPS off   WEP and WPA are broken; WPS is guessable
8      channel: 1, 6, or 11 on 2.4 GHz; auto or a clear one on 5 GHz; sensible width   avoid the neighbors
9      DHCP scope; reservations for printers and NAS; statics for gear   predictable addresses
10     guest network (isolated from the LAN)              visitors and IoT never touch the file server
11     port forwarding only for a needed service; UPnP off; remote management off   smallest attack surface
12     test from wired and wireless: address, gateway, DNS, a website   verify before leaving
\`\`\`
A user who never changed the admin password has a router anyone on the Wi-Fi can reconfigure. A user who enabled remote management "so the vendor could help" has a router anyone on the internet can try to log in to.

## Connection types compared
\`\`\`
type        medium and device                speed         latency     traits
fiber       glass to an ONT                  highest       lowest      symmetric; immune to electrical noise; not everywhere
cable       coax to a DOCSIS modem           high          low         shared with neighbors; asymmetric; evening slowdowns
DSL         phone line to a DSL modem        moderate      low         speed falls with distance from the exchange
satellite   dish to orbit                    moderate      highest     anywhere with sky; weather; caps; low-orbit improves latency
cellular    4G LTE or 5G modem or hotspot    varies        moderate    mobile; instant setup; data caps
WISP        tower to a rooftop antenna       moderate      low         rural; needs line of sight; weather and trees
\`\`\`
The exam's decision questions are about constraints: a rural cabin with no lines (satellite or WISP), a mobile sales team (cellular), a business needing symmetric upload for backups (fiber), a home whose speed drops at 8 pm (cable), a home ten kilometers from town on old copper (DSL, slow).

## Network types by reach
\`\`\`
type   reach                     example
PAN    a few meters               phone to earbuds over Bluetooth
LAN    one building or site       the office network
WLAN   a LAN over Wi-Fi           the office Wi-Fi
MAN    a city or campus           a university's buildings linked by fiber
WAN    across cities and countries   branch offices over leased lines or VPNs; the internet
SAN    dedicated storage network  servers reaching disk arrays over Fibre Channel or iSCSI
\`\`\`
The SAN confuses people: it is not a place for user files (that is a file server, NAS, on the LAN). A SAN gives servers block-level disks over a separate high-speed network, so the storage looks like a local drive to each server.

## Worked example
A three-person accounting office moves into a strip mall with cable internet. The technician connects the coax to the modem and the modem to the router's WAN port, logs in wired, changes the admin password, updates firmware, sets the SSID to something bland with WPA3 and a passphrase, picks channel 6 because the analyzer shows neighbors on 1 and 11, reserves .50 for the printer, creates a guest network for clients in the waiting area, leaves UPnP and remote management off, and confirms a laptop gets an address, reaches the gateway, resolves names, and loads a page.

## How the exam asks it
- "What should be done FIRST after connecting a new SOHO router?" Change the default administrator password.
- "Which wireless security setting should be selected?" WPA3 (or WPA2 with AES if WPA3 is unavailable).
- "Which internet connection has the highest latency?" Satellite.
- "Which connection is limited by distance from the provider's equipment?" DSL.
- "Which network type connects a phone to a Bluetooth headset?" PAN.
- "Which network provides servers with block-level storage over a dedicated network?" SAN.

## What to memorize
- Modem or ONT to WAN; admin password first; firmware; SSID; WPA3 or WPA2 AES; channel 1, 6, 11; reservations; guest network; port forwarding only if needed; UPnP and remote management off; test.
- Fiber fastest and symmetric; cable shared; DSL distance; satellite latency; cellular mobile and capped; WISP line of sight.
- PAN, LAN, WLAN, MAN, WAN, SAN.`,

u3l6: `## Tools by the job they do
Every tool in the bag answers a specific question. Put the questions in a table and the tool follows.

\`\`\`
question                                                  tool                  how it answers
Is this cable wired correctly, and are all 8 wires intact?  cable tester          lights each wire in sequence; shows opens, shorts, miswires
Does this cable meet its category rating?                 cable certifier       measures attenuation, crosstalk, length; prints a report
Which cable in this bundle goes to that jack?             toner probe           tone on one end, probe squeals on the other
Is this NIC or switch port dead?                          loopback plug         loops TX to RX; the port should show link and pass a test
How do I put a plug on this cable?                        stripper, then crimper  jacket off, wires in T568 order, crimp
How do I terminate a run on the panel or a jack?          punchdown tool        seats and trims each wire into the 110 block
Which channel is clear; where is the dead spot?           Wi-Fi analyzer        shows SSIDs, channels, signal strength, interference
How do I capture traffic on this link without disrupting it?  network tap        copies traffic to a monitoring port
\`\`\`

## Making a cable end, step by step
1. Strip about 2 to 3 cm of jacket with the stripper; check that no conductor is nicked.
2. Untwist the pairs only as far as needed and arrange the eight wires in T568B order: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown (T568A swaps the orange and green pairs).
3. Trim them straight and push them fully into the RJ45 plug so the copper reaches the front and the jacket sits under the strain relief.
4. Crimp firmly.
5. Test with a cable tester: all eight lights in order means straight-through; a pattern swap means crossover; a missing light means an open; two lights together means a short.
Excess untwisting is the hidden cause of a cable that "tests fine but drops at gigabit"; that is what a certifier catches and a basic tester does not.

## Punching down
A patch panel port or a keystone jack has eight slots with color codes printed beside them for both A and B. Lay each wire in its slot, set the punchdown tool with the cutting edge facing the waste end, and push until it clicks; the blade seats the wire and trims the tail in one motion. A 110 block is the modern data block; 66 blocks are older telephone blocks. Use the same standard (A or B) at every point in a run.

## The loopback trick
A loopback plug is a plug whose transmit pins are wired back to its receive pins (1 to 3 and 2 to 6 on an Ethernet plug). Insert it into a NIC and the link light comes on and the NIC's diagnostics pass if the port is good; the same on a switch port. It answers "is it the port or is it everything else?" without a second computer or a known-good cable. Fiber loopbacks do the same with a short fiber jumper.

## Tone and probe in the closet
A closet has forty unlabeled cables. Clip the tone generator to the wall jack in the office (or a patch cable plugged into it), go to the closet, and sweep the probe over the punched-down cables; the loudest squeal is the one. Label it, then move on. The generator can also find a break: tone stops where the cable is cut.

## Wi-Fi analyzer, what to look at
The screen shows every SSID, its channel, and its strength in dBm (closer to zero is stronger; -50 is excellent, -70 is fair, -80 is poor). Use it to choose a channel nobody else is on, to walk a floor and mark where the signal fades, to place a new access point, and to spot a rogue access point using the company SSID. It cannot see non-Wi-Fi interference such as a microwave oven; a spectrum analyzer does that.

## Tap versus port mirror
A network tap is a passive hardware device spliced into a link; it sends a copy of every frame to a monitoring port and keeps working even if unpowered. It never drops packets and never changes the link. A managed switch can mirror a port in software instead (SPAN), which is free but can drop frames under load. Both feed a protocol analyzer such as a packet capture tool.

## How the exam asks it
- "Which tool identifies which cable in a bundle connects to a specific office?" A toner probe.
- "Which tool tests whether a switch port is functional without another device?" A loopback plug.
- "Which tool attaches an RJ45 connector to a cable?" A crimper.
- "Which tool terminates cable onto a patch panel?" A punchdown tool.
- "Which tool shows nearby wireless networks and their channels?" A Wi-Fi analyzer.
- "Which tool verifies that all eight wires are connected correctly?" A cable tester.
- "Which device copies traffic for analysis without interrupting the link?" A network tap.

## What to memorize
- Stripper, crimper, punchdown for making; tester, certifier, loopback for testing; toner probe for finding; Wi-Fi analyzer for radio; tap for capture.
- T568B order and that A swaps the orange and green pairs. Loopback: TX to RX. 110 block for data, 66 for old phones.`

});
