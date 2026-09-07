// APlus Academy Core 1 deeper explanations, units 4 to 6. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u4l1: `## Cable as plumbing
Think of a network cable as a pipe. The category is the pipe's diameter: it sets how much can flow. The 100 meter limit is how far water can be pushed before pressure drops. Shielding is insulation against outside noise. Plenum rating is the fire code for what may run inside the ceiling. Fiber is a different material entirely: glass carrying light, no electrical noise, far longer runs.

## Copper categories side by side
\`\`\`
category   top speed              bandwidth   distance          where you meet it
Cat 5      100 Mb/s               100 MHz     100 m             old buildings; replace
Cat 5e     1 Gb/s                 100 MHz     100 m             the gigabit workhorse in older installs
Cat 6      1 Gb/s; 10 Gb/s short  250 MHz     100 m; 55 m at 10 Gb/s   most current office runs
Cat 6a     10 Gb/s                500 MHz     100 m             new 10 gigabit runs; thicker cable
Cat 7      10 Gb/s                600 MHz     100 m             fully shielded; GG45 or RJ45; rare
Cat 8      25 or 40 Gb/s          2,000 MHz   30 m              server to top-of-rack switch
\`\`\`
Two traps: Cat 6 does 10 gigabit only to 55 meters, and Cat 8 is a 30 meter cable, not a 100 meter one. A question about a 90 meter 10 gigabit run wants Cat 6a.

## The pin orders
\`\`\`
pin   T568A          T568B
1     white-green    white-orange
2     green          orange
3     white-orange   white-green
4     blue           blue
5     white-blue     white-blue
6     orange         green
7     white-brown    white-brown
8     brown          brown
\`\`\`
Only the orange and green pairs swap between the two. Pins 1 and 2 transmit and 3 and 6 receive on old 10 and 100 Mb/s links, so A on one end and B on the other crosses transmit into receive: a crossover cable. Gigabit uses all four pairs and auto-MDIX ports fix the crossing automatically, so today the crossover is mostly an exam question. The practical rule is one standard per building; B is the more common in the US.

## Reading the jacket
\`\`\`
marking            meaning                                  use it when
UTP                unshielded twisted pair                  normal offices
STP, F/UTP, S/FTP  shielded (foil or braid)                 factories, near motors, medical imaging, elevators
CMP (plenum)       low-smoke, fire-resistant jacket         inside air-handling ceilings and raised floors
CMR (riser)        vertical runs between floors             shafts; not enough for plenum spaces
direct burial      gel-filled, UV and water resistant       outdoor trenches between buildings
\`\`\`
An inspector who finds ordinary PVC cable in a plenum space will make you pull it out, because burning PVC fills the air system with toxic smoke.

## Coax in one line each
RG-6 is the thick cable from the street to the cable modem and the TV, with a threaded F-type connector. RG-59 is thinner, loses more signal, and lives on short security camera runs, usually with a bayonet BNC connector.

## Fiber, mode by mode
\`\`\`
                single-mode                     multimode
core            about 9 microns                 50 or 62.5 microns
light source    laser                           LED or VCSEL
reach           kilometers (tens with the right optics)   hundreds of meters (OM3 about 300 m at 10 Gb/s, OM4 about 400 m)
cost            pricier optics, cheaper cable   cheaper optics
jacket color    yellow                          orange (OM1, OM2), aqua (OM3, OM4)
typical use     between buildings, to the ISP, campus backbones   inside a building, within a data center
\`\`\`
The connectors are the same across both: ST twists on like a bayonet, SC pushes in with a square body, and LC is the small clip-in connector on nearly every modern transceiver. A dirty fiber end is the most common fiber fault; clean with a one-click cleaner before blaming the optics.

## Worked example
A school wants 10 gigabit from its core switch to a new building 350 meters away, and 10 gigabit to each classroom switch within 80 meters of the closets. Copper cannot reach 350 meters at all, so the building link is fiber; at 350 meters multimode is at its edge, so single-mode is the safe choice. The classroom runs are under 100 meters at 10 Gb/s, which is Cat 6a; Cat 6 would work only to 55 meters. Ceiling runs are plenum-rated.

## How the exam asks it
- "Which cable supports 10 Gb/s over a 100 m run?" Cat 6a.
- "Which cable must be used in the space above a drop ceiling used for air return?" Plenum-rated.
- "A cable is terminated T568A on one end and T568B on the other. What is it?" A crossover cable.
- "Which fiber type uses a laser and spans several kilometers?" Single-mode.
- "Which connector is used on RG-6 cable television cable?" F-type.
- "What is the maximum length of a copper Ethernet run?" 100 meters (328 feet).

## What to memorize
- The category table, especially Cat 5e 1 Gb/s, Cat 6a 10 Gb/s at 100 m, Cat 8 at 30 m. 100 m limit.
- T568B starts white-orange; T568A starts white-green; only orange and green swap.
- UTP versus STP; plenum for air spaces; direct burial outdoors; RJ45 eight pins, RJ11 phone.
- RG-6 with F-type; RG-59 with BNC. Single-mode 9 microns laser far; multimode 50/62.5 LED near; ST, SC, LC.`,

u4l2: `## The rear panel as a set of roads
Every connector is a road with a speed limit and a kind of traffic it allows. USB roads carry almost anything but at set speeds per generation. Thunderbolt is a motorway that carries several kinds of traffic at once. Video roads carry pictures, some with sound. Drive roads run inside the case. Adapters are on-ramps between roads, and some of them need a toll booth (power) to convert the traffic.

## USB generations, with the renames untangled
\`\`\`
original name   later names                       speed      port color   cable length   connectors
USB 1.1         -                                 12 Mb/s    white        3 m            A, B
USB 2.0         -                                 480 Mb/s   black        5 m            A, B, mini, micro, C
USB 3.0         3.1 Gen 1, 3.2 Gen 1, "5Gbps"     5 Gb/s     blue         3 m            A, B, micro-B (wide), C
USB 3.1 Gen 2   3.2 Gen 2, "10Gbps"               10 Gb/s    teal or red  1 m            A, C
USB 3.2 Gen 2x2 "20Gbps"                          20 Gb/s    -            1 m            C only
USB4            USB4 Gen 3x2; version 2 at 80     40 Gb/s    -            0.8 m          C only
\`\`\`
The port color is a convention, not a rule, but the exam uses it: blue means USB 3. A device negotiates down to the slowest link in the chain, so a USB 3 drive on a USB 2 hub runs at 480 Mb/s. Type A is the host end; Type B the device end (printers); mini and micro were the phone and camera ends; C replaces all of them.

## Thunderbolt versus USB-C
Thunderbolt 3 and 4 use the USB-C connector but are a different protocol: 40 Gb/s, PCIe tunneling for external graphics and fast storage, two 4K displays, 100 W of charging, and daisy chaining up to six devices. A Thunderbolt port is marked with a lightning bolt icon and accepts ordinary USB-C devices. A plain USB-C port cannot run Thunderbolt devices at Thunderbolt speed, and some cannot run them at all. Thunderbolt 5 raises the rate to 80 Gb/s.

## Video connectors compared
\`\`\`
connector    signal      pins   audio   max (typical)                      notes
VGA          analog      15     no      1920 x 1080 at best; soft at length   blue DE-15; thumbscrews; projectors
DVI-D/I/A    digital, both, analog  24+1 or 24+5   no   single link 1920 x 1200; dual link 2560 x 1600   DVI-I carries analog so a passive VGA adapter works
HDMI         digital     19     yes     2.1: 48 Gb/s, 8K, 4K at 120 Hz     Type A full, C mini, D micro; CEC; ARC for sound bars
DisplayPort  digital     20     yes     2.0: 80 Gb/s; multi-stream daisy chain   latch; mini DP on older laptops
USB-C alt mode  digital  24     yes     depends on the port                 one cable: video, data, power
\`\`\`
The recurring exam facts: VGA is the only analog one, DVI carries no audio, HDMI and DisplayPort carry audio, DisplayPort has a latch and can daisy chain.

## Drive interfaces
\`\`\`
interface   data connector      power connector   speed                length    notes
SATA        7-pin L-shaped      15-pin            1.5, 3, 6 Gb/s        1 m       hot-plug capable; AHCI mode
eSATA       shielded 7-pin      separate or eSATAp   6 Gb/s             2 m       external drives; replaced by USB 3
Molex       -                   4-pin (5 V, 12 V) -                     -         old drives, fans, adapters
M.2 SATA    M.2 slot            from the slot     6 Gb/s                -         same speed as a 2.5-inch SATA SSD
M.2 NVMe    M.2 slot (PCIe)     from the slot     up to 8 GB/s (Gen 4 x4)  -      covered with storage
\`\`\`

## Adapters, passive and active
\`\`\`
adapter                 works?    why
DVI-D to HDMI           passive   same digital signal; no audio arrives on the HDMI side
DisplayPort to HDMI     passive at low resolutions, active for 4K at 60 Hz or above   different signaling
DVI-I to VGA            passive   DVI-I has analog pins
DVI-D to VGA            active    no analog on DVI-D; needs a converter
HDMI to VGA             active    digital to analog; often needs USB power
VGA to HDMI             active    analog to digital
USB-C to DisplayPort    passive   if the port supports alt mode; otherwise nothing
USB to Ethernet         active (a NIC on a stick)   adds a wired port; needs a driver
USB to serial (DB9)     active    console cables for network gear
\`\`\`
When a cheap adapter "does not work," the reason is almost always analog versus digital, or a USB-C port without alternate mode.

## Worked example
A user has a laptop with one USB-C port (alt mode capable) and one HDMI 1.4 port, and wants two 4K monitors at 60 Hz. HDMI 1.4 tops out at 4K 30 Hz, so that monitor would be limited unless the second uses USB-C to DisplayPort, which can do 4K 60. The best answer is a Thunderbolt dock with two DisplayPort outputs if the port is Thunderbolt; if it is plain USB-C, a USB-C to DisplayPort cable for one monitor and accept 30 Hz on the HDMI 1.4 monitor, or a DisplayLink dock.

## How the exam asks it
- "Which USB version has a maximum speed of 5 Gb/s?" USB 3.0 (3.2 Gen 1).
- "Which connector carries an analog video signal?" VGA.
- "Which video interface can daisy chain multiple monitors from one port?" DisplayPort.
- "Which cable connects a SATA drive's data port?" The 7-pin SATA data cable (15-pin for power).
- "A technician needs to connect a DVI-D output to a VGA monitor." An active converter.
- "Which connector is used for a console connection to a switch?" DB9 serial (through a USB-to-serial adapter).

## What to memorize
- USB 2.0 480 Mb/s black 5 m; 3.0 5 Gb/s blue 3 m; 3.1 Gen 2 10 Gb/s; 3.2 Gen 2x2 20 Gb/s; USB4 40 Gb/s. Thunderbolt 3 and 4 at 40 Gb/s on USB-C, daisy chain; Lightning USB 2.0.
- VGA analog, 15-pin. DVI no audio, single and dual link. HDMI 19-pin with audio; DisplayPort 20-pin, latch, daisy chain.
- SATA 7-pin data, 15-pin power, 6 Gb/s, 1 m; eSATA 2 m; Molex 4-pin. Analog to digital needs an active converter.`,

u4l3: `## The panel as a window
An LCD is a window with a light behind it and millions of tiny shutters in front. The shutters (liquid crystals) twist to block or pass light. How they twist decides the panel family, and the light behind decides brightness and blacks. OLED throws away the window and the light: each pixel is its own tiny lamp. That single difference explains everything about OLED's perfect blacks and its burn-in.

## The families compared
\`\`\`
type      response   viewing angles   color accuracy   contrast and blacks   cost     best for
TN        fastest    narrow           poor             average               lowest   competitive gaming, budget
IPS       good       widest           best             good                  higher   design, photo work, laptops, general
VA        moderate   moderate         good             highest of LCDs       middle   movies, curved monitors
OLED      instant    wide             excellent        perfect blacks        highest  phones, premium laptops, TVs; burn-in risk
Mini-LED  as LCD     as the LCD type  as the LCD type  near-OLED via zones   high     bright HDR without burn-in
\`\`\`
Mini-LED is not a panel family; it is a backlight with thousands of independently dimmed zones behind an IPS or VA panel. It gets close to OLED contrast with no burn-in and much higher peak brightness.

## Why "dim but visible" means backlight
The image on an LCD is made by the shutters; the light comes from behind. If the backlight dies, the shutters still form the image, but there is no light to see it by. Hold a flashlight to the screen at an angle and the faint picture appears. On old CCFL screens the inverter that makes high-voltage AC for the tube fails more often than the tube; on LED screens the LED driver or the LED strip fails. Either way the panel is fine, and the exam answer is backlight or inverter, not "replace the LCD."

## The touch sandwich
\`\`\`
cover glass       what your finger touches; cracks cosmetically or badly
digitizer         a transparent grid that senses touch (capacitive) or an active pen; may be bonded to the glass
display panel     LCD or OLED, makes the picture
backlight         behind an LCD only
\`\`\`
A screen with a clear picture but no touch has a digitizer or its cable at fault. A screen with touch but no picture has a panel or backlight fault. Many modern devices bond all three layers, so a cracked glass means replacing the assembly. Touch that drifts, registers in the wrong spot, or fires by itself is a digitizer problem, moisture, a bad screen protector, or a calibration issue on resistive screens.

## The four numbers, with examples
\`\`\`
attribute       what it means                         examples and rules
resolution      pixels wide x pixels high             1920 x 1080 FHD, 2560 x 1440 QHD, 3840 x 2160 4K; run at native
pixel density   pixels per inch                       phone 450 PPI, 27-inch 4K 163 PPI, 24-inch FHD 92 PPI; higher = sharper; use OS scaling
refresh rate    image updates per second in Hz        60 standard; 120 to 240 for gaming; needs cable bandwidth
color gamut     range of reproducible colors           sRGB (web), Adobe RGB (print), DCI-P3 (film); wider needs calibration
\`\`\`
Bandwidth check: 4K at 60 Hz needs HDMI 2.0 or DisplayPort 1.2; 4K at 120 or 144 Hz needs HDMI 2.1 or DisplayPort 1.4 with compression. A "144 Hz monitor stuck at 60" question is answered by the cable, the port version, or the refresh setting in the OS display properties.

## Worked example
A designer says colors on the new monitor look different from print. The monitor is a TN panel covering only sRGB, viewed at an angle in a bright room. The fix is an IPS panel with Adobe RGB coverage, calibrated with a colorimeter, viewed straight on. A gamer complaining about smearing in fast motion wants a TN or a fast IPS at 144 Hz; a movie watcher in a dark room wants VA or OLED for blacks.

## How the exam asks it
- "Which LCD panel type offers the widest viewing angles and best color?" IPS.
- "Which display technology produces perfect blacks but is prone to burn-in?" OLED.
- "A laptop screen is very dim but an image is faintly visible with a flashlight." Failed backlight or inverter.
- "Which layer of a touch screen registers the position of a finger?" The digitizer.
- "A monitor supports 144 Hz but runs at 60 Hz." Check the cable and port version, and the refresh rate setting.
- "Text on a new monitor looks blurry at the chosen resolution." Set the native resolution.

## What to memorize
- TN fast and cheap; IPS color and angles; VA contrast; OLED self-emitting with burn-in; Mini-LED zoned backlight.
- Backlight or inverter for dim-but-visible. Digitizer for touch. Native resolution for sharpness.
- Resolution names, PPI as density, refresh in Hz limited by cable bandwidth, gamut sRGB, Adobe RGB, DCI-P3.`,

u5l1: `## Memory as a workbench
The drive is the warehouse where everything is stored; RAM is the workbench where the CPU actually works. A bigger bench holds more projects at once. When the bench is full, the OS starts moving things back to the warehouse (paging), and every trip is slow. That is the whole story of "why is my computer slow with lots of tabs open."

## Generations side by side
\`\`\`
generation   DIMM pins   SODIMM pins   voltage         speeds (MT/s)      notch and notes
DDR3         240         204           1.5 (1.35 L)    800 to 2133        older desktops and laptops
DDR4         288         260           1.2             2133 to 3200+      the most common in service
DDR5         288         262           1.1             4800 and up        different notch from DDR4; on-module power management; two 32-bit channels per module
\`\`\`
DDR4 and DDR5 DIMMs both have 288 pins but the notch is in a different place, so they do not interchange. A board takes exactly one generation. Every generation runs at a lower voltage than the last, which is why laptops gained battery life across them.

## Reading a memory label
"DDR4-3200 CL16 16 GB (2 x 8 GB) SODIMM" means: generation DDR4, 3200 megatransfers per second, CAS latency 16 cycles, a kit of two 8 GB laptop modules. The equivalent bandwidth label is PC4-25600 (3200 x 8 bytes). A board rated to 2666 will run this kit at 2666. A kit is sold as a matched pair for a reason: dual channel wants twins.

## Channels, drawn
\`\`\`
single channel:   CPU <== 64-bit path ==> [module A]                    bandwidth x1
dual channel:     CPU <== 64-bit path ==> [module A]                    bandwidth x2
                      <== 64-bit path ==> [module B]   (paired slots, usually the same color: A2 and B2)
quad channel:     four paths on workstation and server boards            bandwidth x4
\`\`\`
Put the two modules in the slots the manual pairs (often the second and fourth). Put them side by side in slots 1 and 2 and many boards run single channel. Different sizes usually work but may run partly in single channel (flex mode).

## ECC and registered, who needs them
\`\`\`
type              what it does                                  who uses it
non-ECC unbuffered  plain memory                                  desktops, laptops
ECC unbuffered      detects and corrects single-bit errors         workstations, small servers
ECC registered      ECC plus a buffer chip for many modules        large servers
\`\`\`
Cosmic rays and electrical noise flip bits. On a laptop that shows up as a rare crash; on a database server it silently corrupts records, which is why servers pay for ECC. The CPU and board must both support it, and registered modules only work in boards designed for them.

## Worked example: an upgrade
A user's desktop has one 8 GB DDR4-2666 module in slot A1 of four slots and constantly pages to disk with a browser and a spreadsheet open. Add a second identical 8 GB module in the paired slot (B1 per the manual) for 16 GB in dual channel. If the manual says the paired slots are A2 and B2, move the original module too. Do not buy DDR5; it will not fit. After boot, confirm 16 GB in firmware and check that the OS is 64-bit, because 32-bit Windows would see only about 4 GB.

## Worked example: the beep
After installing memory, the machine beeps repeatedly and shows nothing. The module is not seated: the clips are not locked or the notch was misaligned. Power off, unplug, press the module firmly until both clips click, and try again. If it persists with one module at a time in slot 1, a module or slot is bad.

## Virtual memory, briefly
The paging file is a reserved area on the drive that the OS uses as overflow. It keeps the machine running when RAM is full, at the cost of drive-speed access. Constant drive activity with slow response and high memory use in Task Manager means the bench is too small. Add RAM; enlarging the paging file only enlarges the overflow.

## How the exam asks it
- "Which memory module has 288 pins and runs at 1.2 V?" DDR4 DIMM.
- "A technician installs two modules and wants dual-channel operation." Matched modules in the paired slots per the manual.
- "Which memory type detects and corrects single-bit errors?" ECC.
- "Which module type is used in laptops?" SODIMM.
- "A PC with 4 GB of RAM is constantly accessing the drive and running slowly." Add RAM (the paging file is being used heavily).

## What to memorize
- DDR3 240/204 pins 1.5 V; DDR4 288/260 1.2 V; DDR5 288/262 1.1 V, different key. Not interchangeable.
- SODIMM laptops, DIMM desktops. Speed runs at the slowest module and the board's limit.
- ECC for servers; board and CPU must support it. Dual channel needs matched modules in the paired slots.
- Paging file is slow overflow; thrashing means add RAM. 32-bit OS sees about 4 GB.`,

u5l2: `## Three questions for any drive
Storage confuses people because three different things get mixed up: how the drive stores bits (spinning platters or flash), how it talks to the computer (SATA, PCIe with NVMe, SAS, USB), and what shape it is (3.5-inch, 2.5-inch, M.2, mSATA, add-in card). Ask the three questions separately and every product name makes sense.

## The matrix
\`\`\`
drive                  stores with    talks over         shape                   typical speed
desktop HDD            platters       SATA               3.5-inch                150 to 250 MB/s
laptop HDD             platters       SATA               2.5-inch                100 to 150 MB/s
enterprise HDD         platters       SAS                3.5- or 2.5-inch        similar; dual ports
SATA SSD               flash          SATA III           2.5-inch, mSATA, M.2 (B or B+M key)   about 550 MB/s
NVMe SSD               flash          PCIe x4            M.2 (M key), add-in card   3,500 MB/s (Gen 3), 7,000 MB/s (Gen 4), more on Gen 5
external SSD or HDD    either         USB or Thunderbolt enclosure               limited by the port
\`\`\`
The headline lesson: an M.2 SATA SSD is no faster than a 2.5-inch SATA SSD. The shape changed; the road did not. Only NVMe over PCIe changes the road.

## Spinning drives, the numbers
\`\`\`
rpm        where                     note
5,400      laptops, external drives  quiet, cool, slow
7,200      desktops, NAS             the standard
10,000     older enterprise          Raptor-class; replaced by SSDs
15,000     older enterprise SAS      loud and hot; replaced by SSDs
\`\`\`
Faster rotation means shorter waits for the sector to come around. HDDs remain the cheapest capacity for backups, media libraries, and NAS boxes. Their failure sounds are mechanical: clicking (the head cannot find its track), grinding (bearing or head crash). Any of those means back up immediately.

## M.2, decoded
\`\`\`
label   meaning
2280    22 mm wide, 80 mm long (the common desktop and laptop size)
2242    22 x 42 mm (small laptops, mini PCs)
2260    22 x 60 mm
2230    22 x 30 mm (wireless cards, some handheld PCs)
B key   notch near one edge; SATA or PCIe x2
M key   notch near the other edge; PCIe x4 NVMe (most NVMe drives)
B+M key both notches; fits either slot; almost always SATA
\`\`\`
The slot's key tells you what fits physically; the board manual tells you what the slot actually supports. Some boards share bandwidth: populating a certain M.2 slot disables two SATA ports. That is another manual check.

## Worked example: the upgrade that will not boot
A user installs a new NVMe drive in a laptop's M.2 slot and the drive does not appear in firmware. The slot is B-keyed and SATA-only; the M-keyed NVMe drive does not even fit properly, or the user forced it. The correct part was an M.2 SATA drive with a B+M key. Always read the slot before buying.

## Worked example: cloning versus fresh install
Replacing a laptop's 500 GB HDD with a 1 TB SSD: clone the HDD to the SSD with an enclosure and cloning software, swap the drives, boot, then extend the partition to use the full space. A fresh install is cleaner but means reinstalling everything. Either way, back up first.

## SAS in one paragraph
Serial Attached SCSI is the server drive interface: 12 Gb/s, dual ports so two controllers can reach the drive, deep command queues, and controllers built for RAID. A SAS backplane accepts SATA drives (handy for cheap capacity), but a SATA controller cannot drive a SAS disk. The exam asks that compatibility direction.

## Removable and optical
Flash drives, SD and microSD cards (with speed classes printed on the label), and CompactFlash for old pro cameras. Optical is fading but still tested: CD 700 MB, DVD 4.7 GB or 8.5 GB dual layer, Blu-ray 25 GB or 50 GB dual layer. Recordable (-R) writes once; rewritable (-RW, -RE) writes many times.

## How the exam asks it
- "Which drive interface offers the highest throughput for an SSD?" NVMe over PCIe.
- "Which M.2 key is typically used by NVMe drives?" M key.
- "A drive makes a clicking sound and files are slow to open." Failing HDD; back up and replace.
- "Which controller can use both SAS and SATA drives?" A SAS controller.
- "What is the capacity of a single-layer Blu-ray disc?" 25 GB.
- "Which spindle speed is typical of a desktop hard drive?" 7,200 rpm.

## What to memorize
- Three questions: storage medium, interface, form factor. M.2 is a shape; SATA or NVMe is the road.
- HDD rpm list and failure sounds. SATA SSD about 550 MB/s; NVMe thousands.
- M.2 keys (B, M, B+M) and lengths (2242, 2260, 2280). SAS 12 Gb/s accepts SATA. CD 700 MB, DVD 4.7 GB, Blu-ray 25 GB.`,

u5l3: `## RAID as ways of keeping notes
Imagine keeping important notes on several notebooks. RAID 0 splits each page across two notebooks so you can write twice as fast, but lose either notebook and every page is unreadable. RAID 1 writes the same page in both notebooks; lose one and you still have everything, but you paid for two to keep one. RAID 5 writes pages across three or more notebooks and adds a checksum line so any one lost notebook can be reconstructed. RAID 6 adds a second checksum so two can be lost. RAID 10 pairs notebooks as mirrors and then splits pages across the pairs.

## The reference table
\`\`\`
level   method                        min drives   survives                      usable capacity   speed
0       striping                      2            nothing                       n x s (100%)      fastest read and write
1       mirroring                     2            1 drive                       s (50%)           reads good, writes normal
5       striping + single parity      3            1 drive                       (n - 1) x s       reads fast, writes slower (parity)
6       striping + double parity      4            2 drives                      (n - 2) x s       reads fast, writes slowest
10      mirrors, then striped         4 (even)     1 per mirrored pair           (n / 2) x s       fast; best for databases
\`\`\`

## Capacity worked examples
\`\`\`
drives                RAID 0   RAID 1      RAID 5   RAID 6   RAID 10
2 x 1 TB              2 TB     1 TB        -        -        -
3 x 2 TB              6 TB     -           4 TB     -        -
4 x 4 TB              16 TB    -           12 TB    8 TB     8 TB
6 x 8 TB              48 TB    -           40 TB    32 TB    24 TB
8 x 10 TB             80 TB    -           70 TB    60 TB    40 TB
\`\`\`
Formula reminders: RAID 5 loses one drive's worth to parity, RAID 6 loses two, RAID 1 and 10 lose half. The exam gives you drive count and size and asks for usable space, or gives a capacity target and asks how many drives.

## Choosing, by requirement
\`\`\`
requirement                                             pick
maximum speed, data is disposable (scratch, cache)      RAID 0
simple protection for a boot drive or a small server    RAID 1
capacity with one-drive protection on a budget          RAID 5
large drives where a second failure during rebuild is a real risk   RAID 6
database or VM host that needs speed and protection     RAID 10
\`\`\`
Why RAID 6 exists: rebuilding a RAID 5 of 10 TB drives can take a day, during which the array has no protection and every drive is working hard; a second failure loses everything. RAID 6 survives that second failure.

## Hardware or software, and the extras
A hardware controller card has its own processor and cache (with a battery or capacitor so cached writes survive a power cut), presents the array as one disk, and offloads parity math. Software RAID uses the CPU and is configured in the OS or the board firmware; fine for RAID 1, slower for 5 and 6. A hot spare is a spare drive already installed and idle; when a member fails the controller starts rebuilding onto it immediately, without waiting for a technician. Most controllers sound an audible alarm and light an amber LED on the failed bay.

## Worked example: the degraded array
A server's RAID 5 of four drives shows one amber bay light and an alarm. The array is degraded but running; performance drops because every read of the missing drive's data is reconstructed from parity. The right action is to replace the failed drive with the same size or larger and let the rebuild run, then confirm the array is optimal. If a second drive fails before the rebuild finishes, the data is gone, so this is urgent and it is also the moment to verify that last night's backup completed.

## RAID is not backup
Mirroring copies a mistake as faithfully as a file. Ransomware encrypts the array. A controller failure can take the whole set with it. RAID keeps a server running through a drive failure; backups protect the data from everything else. The exam likes to test that distinction.

## How the exam asks it
- "Which RAID level provides no fault tolerance?" RAID 0.
- "Four 2 TB drives in RAID 10 provide how much usable space?" 4 TB.
- "Which RAID level survives two simultaneous drive failures?" RAID 6.
- "What is the minimum number of drives for RAID 5?" Three.
- "Five 4 TB drives in RAID 5 provide how much usable space?" 16 TB.
- "Which feature allows an array to begin rebuilding automatically after a failure?" A hot spare.

## What to memorize
- The reference table: method, minimum drives, failures survived, capacity formula, for 0, 1, 5, 6, and 10.
- Capacity math: 0 all, 1 and 10 half, 5 minus one, 6 minus two.
- Hardware controller with battery-backed cache; hot spare; degraded means replace now. RAID is not backup.`,

u5l4: `## The board as a city map
The CPU socket is downtown; the chipset is the transit authority that decides which roads exist; PCIe slots are highways of different widths; memory slots are the fast lane next to downtown; SATA and M.2 are the freight terminals; headers are the side streets to the case; power connectors are the substations. A form factor is the size of the map, and a case is the frame it must fit.

## Form factors compared
\`\`\`
form factor   size                        expansion slots   memory slots   typical use
ATX           12 x 9.6 in (305 x 244 mm)  up to 7           4 (or 8)       full desktops, workstations
microATX      9.6 x 9.6 in                up to 4           2 to 4         budget and office desktops
Mini-ITX      6.7 x 6.7 in (170 mm)       1                 2              small form factor, HTPC
E-ATX         12 x 13 in                  7 plus            8              high-end workstations, servers
\`\`\`
Mounting holes are standardized so a microATX or Mini-ITX board bolts into an ATX case. The reverse fails. Standoffs must match the board's holes exactly: a stray standoff under a board shorts it and the machine will not POST.

## Slots and lanes
\`\`\`
slot        lanes   per-direction bandwidth (Gen 3 / Gen 4 / Gen 5)   typical card
PCIe x1     1       about 1 / 2 / 4 GB/s                              sound, capture, 1 Gb NIC
PCIe x4     4       about 4 / 8 / 16 GB/s                             10 Gb NIC, NVMe adapter
PCIe x8     8       about 8 / 16 / 32 GB/s                            RAID controller, second GPU
PCIe x16    16      about 16 / 32 / 64 GB/s                           graphics card
PCI         32-bit parallel, 133 MB/s shared                          legacy cards only
\`\`\`
An x1 card fits and runs in an x16 slot; an x16 card does not fit an x1 slot (unless the slot is open-ended, and then it runs at x1). The slot's generation and the card's generation negotiate down to the lower one. The CPU provides the x16 and one M.2's lanes; the chipset provides the rest, which is why the manual says which slots share bandwidth.

## Power connectors on the board and cards
\`\`\`
connector          pins        feeds
main ATX           24 (20+4)   the board: 3.3, 5, 12 V
EPS                4 or 8 (4+4), sometimes two   CPU voltage regulators
PCIe               6 (75 W) or 8 (150 W)   graphics cards; some need two or three
12VHPWR / 12V-2x6  16          new graphics cards, up to 600 W
SATA power         15          drives
Molex              4           older drives, fans, LED controllers
\`\`\`
The x16 slot itself supplies 75 W; anything beyond comes from the PCIe cables. A GPU without its power connector shows a warning LED or blank screen and the machine may refuse to POST.

## Headers, the side streets
\`\`\`
header            connects                     notes
front panel       power, reset, power LED, HDD LED   polarity matters for LEDs; layout printed on the board
USB 2.0 (9-pin)   case front USB 2.0 ports
USB 3.0 (19-pin)  case front USB 3.0 ports     the stiff blue cable
USB-C (key A)     case front USB-C
HD audio          front headphone and mic jacks
fan (3-pin)       voltage-controlled fans
fan (4-pin PWM)   speed-controlled fans; CPU_FAN, SYS_FAN
RGB / ARGB        lighting; 12 V RGB and 5 V ARGB are not interchangeable
TPM               a discrete TPM module (most boards use firmware TPM now)
\`\`\`
A machine that will not turn on from the button but starts when the power pins are shorted with a screwdriver has a front panel header or switch problem.

## Sockets and chipsets
\`\`\`
maker   socket type   pins where       examples
Intel   LGA           in the socket    LGA 1200, LGA 1700, LGA 1851
AMD     PGA (AM4)     on the CPU       AM4 (Ryzen 1000 to 5000)
AMD     LGA (AM5)     in the socket    AM5 (Ryzen 7000 and later)
\`\`\`
The chipset (Intel Z, B, H series; AMD X, B, A series) sets what the board can do: overclocking, lane counts, USB and SATA port counts, and which CPU generations are supported. A CPU that fits the socket may still need a firmware update before the board recognizes it. Servers use multisocket boards with memory attached to each CPU.

## Worked example: a build check
A customer chose a Mini-ITX board, a full-size ATX case, a DDR5 kit, an LGA 1700 CPU, and a graphics card with two 8-pin connectors. The board fits the case. Check that the board's memory generation is DDR5 (some LGA 1700 boards are DDR4), that the chipset supports the CPU generation, that the one x16 slot is free of case obstructions, and that the power supply has two PCIe 8-pin cables and enough wattage.

## How the exam asks it
- "Which motherboard form factor is 6.7 x 6.7 inches?" Mini-ITX.
- "Which slot is used for a modern graphics card?" PCIe x16.
- "Which connector supplies power to the CPU voltage regulators?" The 4- or 8-pin EPS connector.
- "Which CPU socket type has the pins in the socket?" LGA.
- "A newly built PC will not POST; the technician finds an extra standoff under the board." Remove it; it is shorting the board.
- "Which component determines which CPU generations a board supports?" The chipset (and its firmware).

## What to memorize
- ATX 12 x 9.6, microATX 9.6 x 9.6, Mini-ITX 6.7 x 6.7; small fits big; standoffs.
- PCIe x1 to x16, lane bandwidth roughly 1, 2, 4 GB/s per lane by generation; short cards in long slots; PCI legacy.
- 24-pin main, EPS CPU, PCIe 6- and 8-pin, 12VHPWR; SATA and Molex power. Headers: front panel, USB, audio, fans, RGB.
- Intel LGA; AMD AM4 PGA, AM5 LGA; chipset decides support. CR2032 keeps firmware settings.`,

u5l5: `## Firmware as the building superintendent
Before the tenant (the operating system) moves in, the superintendent checks the building: counts the memory, finds the drives, tests the keyboard, decides which door to open first (boot order), and locks certain doors (Secure Boot, USB restrictions, passwords). UEFI is the modern superintendent with a proper office; the old BIOS was a caretaker with a clipboard.

## BIOS versus UEFI
\`\`\`
                     legacy BIOS                        UEFI
interface            16-bit text menus                  graphical, mouse, sometimes network
disk partitioning    MBR: 2 TB limit, 4 primary partitions   GPT: huge disks, 128 partitions
boot security        none                               Secure Boot (signed boot loaders only)
boot speed           slower                             faster; fast boot options
drivers              none                               firmware drivers for NICs, storage, video
compatibility        -                                  CSM / legacy mode for old operating systems
\`\`\`
Installing an operating system on a disk over 2 TB, or enabling Secure Boot, requires UEFI mode with a GPT disk. Switching a working system between legacy and UEFI mode makes it unbootable until the disk is converted; that is a common self-inflicted "no boot device" ticket.

## Settings, what they solve
\`\`\`
setting                    what it does                                          the ticket it answers
boot order / boot menu     which device is tried first; F12-style one-time menu   install from USB; "no bootable device" with a stick plugged in
USB permissions            disable ports or USB storage                          data theft from a kiosk or lab PC
TPM                        stores keys, measures boot; TPM 2.0 for Windows 11    BitLocker asks for the recovery key; Windows 11 install refuses
Secure Boot                only signed boot loaders run                          blocks rootkits; may block old Linux or tools until disabled
supervisor password        protects firmware settings                            users changing boot order to bypass controls
user (boot) password       required before the machine boots                     stolen laptop cannot be booted
fan and thermal            fan curves, temperature readouts, shutdown limits     overheating; noisy fans; random shutdowns under load
virtualization (VT-x, AMD-V)   lets hypervisors run                              "VT-x is disabled" error in VirtualBox or Hyper-V
fast boot                  skips some checks for speed                            keyboard not working at the setup prompt
\`\`\`

## TPM versus HSM
The TPM is a small secure chip on the board or inside the CPU (fTPM). It holds keys that never leave it, records measurements of the firmware and boot loader, and releases the disk encryption key only if the boot chain matches. Change the firmware or move the drive to another machine and BitLocker asks for the 48-digit recovery key. An HSM is a much bigger device: a tamper-resistant appliance or card in a data center that generates, stores, and uses keys for certificate authorities, payment systems, and cloud providers. The exam wants you to know the TPM is on the board, the HSM is a separate enterprise device.

## Passwords and how they are cleared
\`\`\`
password type   protects              cleared by
supervisor      setup screens         desktop: CMOS clear jumper or remove the battery; laptop: vendor procedure
user / boot     powering on           same
drive (ATA)     the disk itself       cannot be cleared; data is inaccessible without it
\`\`\`
Removing the CMOS battery also clears every setting and the clock. On many laptops the passwords are stored in a chip that survives battery removal, and only the manufacturer can reset them with proof of ownership.

## Worked example: the wrong clock
A desktop asks the user to set the date and time every morning, and websites throw certificate errors until it is set. The CR2032 cell is dead; replace it, then set the clock and re-enter any custom firmware settings. A wrong clock breaks certificates, authentication, and license checks, so this small battery causes big symptoms.

## Worked example: the failing hypervisor
A developer installs a virtualization product and gets an error that hardware virtualization is not available. The CPU supports it; the setting is off in firmware. Reboot into setup, enable Intel VT-x or AMD-V (sometimes under CPU or Advanced), save, and retry. The same setting is needed for Windows features built on virtualization.

## Firmware updates
Update from the vendor's file, on AC power, with the machine idle. An interrupted update can brick the board, though many now have dual images or a recovery mode. Update when the vendor lists a fix you need, such as support for a new CPU, a security patch, or a memory compatibility fix; not on a whim.

## How the exam asks it
- "Which firmware feature prevents unsigned boot loaders from running?" Secure Boot.
- "Which component stores BitLocker keys and is required by Windows 11?" The TPM.
- "A PC loses its date and time settings every time it is powered off." Replace the CMOS battery.
- "A hypervisor reports that virtualization is not supported, though the CPU supports it." Enable VT-x or AMD-V in firmware.
- "Which partition style is required to boot a 4 TB disk?" GPT under UEFI.
- "How can a technician prevent users from booting from USB devices?" Change the boot order and set a supervisor password.

## What to memorize
- UEFI: GPT, over 2 TB, Secure Boot, graphical; BIOS: MBR, legacy.
- Boot order and one-time menu; USB permissions; TPM 2.0 on the board; HSM separate.
- Supervisor versus user password; CMOS jumper or battery clears both on desktops.
- Fan curves and temperatures; VT-x or AMD-V for virtualization; CR2032 and the wrong-clock symptom.`,

u5l6: `## CPU, cards, and cooling as an engine bay
The CPU is the engine. Cores are cylinders; threads are the trick of firing each cylinder twice per cycle; cache is the fuel line right at the engine; the clock is the RPM. Expansion cards are the bolt-on parts that add abilities: a better sound system, a bigger camera, a faster network. Cooling is the radiator and fans, and an engine without them cooks in minutes.

## Architectures
\`\`\`
architecture   bits   memory reach       where              software note
x86            32     about 4 GB         old PCs, some embedded   32-bit software only
x64 (x86-64)   64     terabytes          all modern PCs and servers   runs 64- and 32-bit apps; needs 64-bit drivers
ARM            64 (or 32)  large         phones, tablets, Apple silicon, some Windows laptops, single-board computers   needs ARM builds or emulation; low power
\`\`\`
The exam questions: a 32-bit OS cannot use more than about 4 GB; an ARM laptop cannot install an x64 driver or run some x64 software; ARM's strength is battery life and heat.

## Cores, threads, cache, clock
\`\`\`
term                     meaning                                      what it buys
core                     an independent execution unit                parallel work: more programs, more threads
SMT / Hyper-Threading    two logical threads per core                 better utilization; not a second core
L1, L2, L3 cache         on-chip memory, small to large, fast to slower   fewer trips to RAM
base and boost clock     GHz at idle and under load                   single-thread speed; limited by heat
performance and efficiency cores   big cores plus small cores          speed when needed, battery when not
\`\`\`
Eight cores with SMT show as sixteen logical processors. A virtualization host or a video encoder loves cores; an old game loves clock.

## Installing a CPU
1. Match the socket and confirm the chipset supports the generation; update firmware first if needed.
2. Open the retention lever, align the gold triangle on the CPU with the mark on the socket, and lower it straight in. Never push; LGA pins in the socket and PGA pins on the chip both bend.
3. Close the lever. Apply a pea-sized dot of thermal paste (or use the cooler's pre-applied pad).
4. Mount the cooler evenly, tightening in a cross pattern, and connect its fan to CPU_FAN.
A board that refuses to POST with a fan warning has the cooler's fan plugged into the wrong header.

## Expansion cards
\`\`\`
card       slot         extra needs                     when
video      PCIe x16     PCIe power cables, PSU wattage, case length   more monitors, gaming, GPU compute, a dead onboard port
sound      PCIe x1      -                               surround, studio inputs, better audio than onboard
capture    PCIe x1/x4   -                               recording HDMI or camera input for streaming
NIC        PCIe x1/x4   driver; antennas for Wi-Fi     faster or second port, fiber, Wi-Fi on a desktop
\`\`\`
Installation is the same for all: power off and unplug, ground yourself, remove the slot cover, seat the card straight down until the slot latch clicks, screw the bracket, attach any power cables, boot, install the driver. Not detected means not seated or no power; detected with a warning means the driver.

## Cooling, drawn
\`\`\`
   front intake fans -->  [ drives ] [ GPU ]  [ CPU cooler ]  --> rear and top exhaust fans
   cool air in                                                   warm air out
\`\`\`
Keep intakes filtered and exhausts unobstructed. Positive pressure (more intake than exhaust) keeps dust out through gaps. The CPU cooler is a heat sink and fan or a tower with heat pipes; liquid all-in-one coolers move the heat to a radiator with more surface area. Thermal paste fills the microscopic gaps between the CPU lid and the cooler base; it dries out over years and must be replaced whenever the cooler comes off. Too little leaves air gaps; too much oozes and insulates.

## Symptoms of heat
\`\`\`
symptom                                 likely cause
fans loud, performance drops (throttling)   dust, dried paste, blocked vents, failed fan
random shutdowns under load             thermal protection tripping; check firmware temperatures
burning smell                           dust cooking on a heat sink, or a failing component
laptop hot with a whining fan           clogged vents; clean with compressed air from the exhaust side
liquid cooler: sudden temperature climb  pump failure or air lock
\`\`\`

## Worked example
A three-year-old gaming PC that used to be quiet now roars and stutters in games. Temperatures in firmware are high at idle. The case filters are clogged, the heat sink is packed with dust, and the paste is dry. Clean the filters and the heat sink with compressed air (holding the fans still), remove the cooler, clean both surfaces with isopropyl alcohol, apply fresh paste, reseat, and check the fan curve. Temperatures return to normal.

## How the exam asks it
- "Which architecture is used in most smartphones and tablets?" ARM.
- "A 32-bit operating system can address roughly how much RAM?" About 4 GB.
- "A new graphics card is not detected." Check seating and the PCIe power connectors.
- "What must be done when removing and reinstalling a CPU cooler?" Clean and reapply thermal paste.
- "Which card would a streamer install to record an HDMI source?" A capture card.
- "A PC shuts down during heavy use." Overheating; check fans, dust, paste, and temperatures.

## What to memorize
- x86 32-bit 4 GB; x64 64-bit; ARM low-power, needs ARM software.
- Cores real, threads logical; cache L1 to L3; clock GHz. LGA pins in socket; align the triangle; never force.
- Card install: seat until the latch clicks, power cables, driver. Video x16, others x1 or x4.
- Intake front, exhaust rear; heat sink and fan; thin thermal paste on every reseat; liquid AIO; dust is the enemy.`,

u5l7: `## The power supply as a substation
The wall delivers high-voltage AC; the components need low-voltage DC. The power supply is the substation that steps it down, splits it into three output lines, and signals the board when the lines are stable. Undersize it and the lights flicker under load; wire it for the wrong grid voltage and it explodes.

## Input, and the selector switch
\`\`\`
region                       mains            frequency
North America, Japan (100 V)  110 to 120 V    60 Hz
Europe, Asia, most others     220 to 240 V    50 Hz
\`\`\`
Auto-switching supplies accept 100 to 240 V. Older supplies have a red slide switch. Set to 115 and fed 230, the input stage takes double its rated voltage and fails with a bang and a smell; set to 230 and fed 115, it just sits there. Imported equipment is the classic scenario.

## The rails
\`\`\`
rail     wire color   feeds
+3.3 V   orange       chipset, memory, logic
+5 V     red          USB, older drives' logic, some fans
+12 V    yellow       CPU (through the EPS connector), graphics card, drive motors, fans
ground   black        return for all
power-good (PS_ON / PWR_OK)  green / gray   the board waits for PWR_OK before starting
\`\`\`
The 12 V rail is where the watts go: a CPU and GPU together can draw 500 W from it. A failing supply sags under load: the machine boots and idles, then reboots or black-screens when a game starts. A PSU tester or a multimeter on the 12 V pin shows the sag.

## Connectors in one table
\`\`\`
connector        pins         goes to                    watts
main ATX         24 (20+4)    motherboard                -
EPS              4 or 8 (4+4) CPU power on the board     -
PCIe             6 / 8 (6+2)  graphics card              75 / 150 W each
12VHPWR (12V-2x6) 16          new graphics cards         up to 600 W
SATA power       15           SATA drives                -
Molex            4            older drives, fans, adapters  -
\`\`\`
The 20+4 split lets one supply fit old 20-pin boards. The 6+2 split lets one cable serve 6- or 8-pin cards. Adapters exist (Molex to SATA, two 8-pin to 12VHPWR), but cheap adapters are a fire risk under high load.

## Sizing, a worked example
\`\`\`
component                     draw
CPU, 8 cores                  125 W
graphics card, mid-high       320 W
motherboard and RAM            50 W
two NVMe drives, one HDD       20 W
fans and lighting              20 W
total                         535 W
plus 25 to 30 percent headroom  about 700 W
\`\`\`
A 700 or 750 W supply runs near its efficient midpoint and handles the GPU's momentary spikes. The exam usually gives a GPU that demands a stated minimum and asks you to notice the old 450 W unit cannot feed it. Symptoms of an undersized supply: crashes and restarts under gaming or rendering load, the GPU's power LED, fans spinning up then stopping.

## Efficiency tiers
\`\`\`
80 Plus tier   efficiency at 50% load (115 V)
white          80%
Bronze         85%
Silver         88%
Gold           90%
Platinum       92%
Titanium       94%
\`\`\`
Efficiency is output divided by input; the rest becomes heat inside the supply. A Gold unit delivering 500 W draws about 555 W from the wall; a white-label unit draws 625 W and runs hotter and louder.

## Modular, redundant, form factor
Modular supplies have sockets for every cable so only the needed ones are installed; semi-modular hardwires the main and CPU cables. Redundant supplies in servers are two (or more) hot-swappable modules in one cage sharing the load; if one dies the other carries the server and the management console raises an alert; replace the dead module without shutting down. ATX is the desktop form factor; SFX is the small one for compact cases; TFX and Flex ATX are the slim ones in small office PCs, which are also the ones most likely to be undersized when a card is added.

## Safety
The capacitors inside hold a lethal charge for a long time after unplugging. Never open a supply; replace it. A supply that smells burnt, clicks repeatedly, or shows bulging capacitors through the grille is done. Also check the outlet and the cord before condemning the supply: a dead outlet, a tripped surge protector, or a cord not fully seated are the top causes of "no power."

## How the exam asks it
- "A PC imported from Europe fails with a pop and a burning smell when plugged in." The voltage selector was set to 230 V and the outlet is 115 V (or vice versa).
- "Which rail supplies most of the power to the CPU and graphics card?" 12 V.
- "Which connector provides power to a graphics card?" The PCIe 6-pin or 8-pin connector (or 12VHPWR).
- "A user added a high-end graphics card and the PC now restarts during games." The power supply is undersized.
- "What does an 80 Plus Gold rating indicate?" About 90 percent efficiency.
- "Which power supply feature lets a server keep running when one supply fails?" Redundant power supplies.

## What to memorize
- 110 to 120 V 60 Hz versus 220 to 240 V 50 Hz; auto-switching or selector; wrong setting destroys it.
- 3.3 V orange, 5 V red, 12 V yellow, ground black; 12 V carries the load; power-good signal.
- 24-pin main, EPS 4/8, PCIe 6-pin 75 W and 8-pin 150 W, 12VHPWR 600 W, SATA 15-pin, Molex.
- Wattage by summing plus headroom; 80 Plus tiers; modular; redundant in servers; ATX and SFX; PSU tester; never open.`,

u6l1: `## A printer is a small computer with a wet end
Every networked printer has a CPU, memory, firmware, a network stack, and a web page for administration, plus the mechanical part that puts marks on paper. Most deployment questions are about the computer half: drivers, addresses, sharing, security, and scan destinations. Treat it like a small server and the answers come naturally.

## Deployment checklist
\`\`\`
step                              detail
unbox                             remove tape, cartridge locks, orange clips, protective film; keep the box for returns
place                             level surface; near power and network; away from sun, heat, humidity, and dust; room for trays and doors
consumables                       install toner or ink; load paper matching the tray settings
power and setup                   language, date and time, network (Ethernet or Wi-Fi), static IP or DHCP reservation
firmware                          update before deployment; fixes bugs and security holes
driver                            exact model, correct OS and architecture; PCL or PostScript as needed
test page                         confirm output, alignment, and color
sharing                           direct IP for each client, or a print server
settings                          defaults: duplex, grayscale, tray, paper size, quality
security                          admin password, authentication, secured print, disable unused protocols
scan destinations                 email (SMTP), folder (SMB share and account), cloud
document                          IP, location, model, serial, support contact
\`\`\`

## PCL versus PostScript
\`\`\`
                PCL                                    PostScript
made by         a printer company                      a software company
nature          printer commands                       a full page description language
speed           faster, lighter on the printer         slower; renders the page mathematically
output          may differ slightly between printers   identical on every PostScript device
used for        office documents, everyday printing    graphic design, publishing, prepress, complex vector art
\`\`\`
Many drivers offer both. When a job prints as pages of random characters, the printer received a language it does not understand: the wrong driver or the wrong emulation setting. When a design file prints with fonts substituted or shapes wrong on a PCL driver, switch to PostScript.

## Connection choices
\`\`\`
method          reach                   pros                     cons
USB             one computer            simple, no network needed  only that computer; shared only when it is on
Ethernet        the whole network       reliable, fast, fixed IP   needs a cable run
Wi-Fi           the whole network       no cable                  interference; IP changes without a reservation
Wi-Fi Direct    a phone or laptop nearby  no network needed       one device at a time
Bluetooth       a phone nearby          label and photo printers  short range, slow
cloud print     anywhere                 print from home to the office   depends on the vendor's service
\`\`\`
Give every network printer a static IP or a DHCP reservation; the "printer offline" ticket after a weekend is usually a changed DHCP address.

## Sharing, two models
\`\`\`
model                where the queue lives    driver management      works when
shared from a PC     that PC                  manual on each client   the PC is on
print server         the server               pushed automatically    always; central logs and defaults
direct IP            each client              manual                  always; no central control
\`\`\`
Small office with three users: direct IP is fine. Fifty users and six printers: a print server, so a driver update happens once and usage is logged.

## Security features
\`\`\`
feature              what it does
user authentication  sign in at the panel or through the server before printing or scanning
badging              tap an ID card to release held jobs
audit logs           who printed or scanned what, when, how many pages
secured (held) print the job waits until the user enters a PIN or badges at the printer
hardening            change the admin password, update firmware, disable Telnet and FTP, restrict the web interface
\`\`\`
The question "HR documents are found in the output tray by other employees" is answered by secured print with PIN or badge release.

## Scanning destinations, what each needs
\`\`\`
destination      needs
scan to email    SMTP server address and port, sender address, often credentials; size limits
scan to folder   the SMB share path, a service account with write permission, port 445 open
scan to cloud    an account linked on the device
\`\`\`
The ADF takes a stack of loose sheets; the flatbed takes books, IDs, and anything that cannot feed. A scan-to-folder that stops working after an IT password rotation is the stale service account password saved on the printer; a scan-to-email that fails after a mail migration is old SMTP settings.

## Worked example
A law office of twelve users gets a new color multifunction printer. Set a DHCP reservation, update the firmware, deploy the driver through a print server with duplex and grayscale defaults, enable secured print with badge release for confidential documents, configure scan to folder with a dedicated account on the file server, set scan to email with the mail provider's SMTP settings, change the admin password, and disable the printer's FTP and Telnet services.

## How the exam asks it
- "Which page description language gives identical output on any printer and suits graphic design?" PostScript.
- "A printer's jobs print as pages of garbage characters after a driver change." Wrong driver or language.
- "A network printer goes offline after a weekend and works again with a new address." Set a static IP or DHCP reservation.
- "Confidential printouts are being seen by other employees." Enable secured print with a PIN or badge release.
- "Scan to folder fails after the domain password policy forced a change." Update the credentials stored on the printer.
- "Which sharing approach centralizes drivers and logging for many users?" A print server.

## What to memorize
- Unbox, place, firmware, driver, test, share, secure, scan destinations, document.
- PCL fast and everyday; PostScript exact and device-independent; garbage output means the wrong language.
- Static IP or reservation; PC share versus print server versus direct IP.
- Authentication, badging, audit logs, secured print. Scan to email (SMTP), folder (SMB share and account), cloud; ADF versus flatbed.`,

u6l2: `## The drum as a chalkboard
Picture a rotating chalkboard that is first painted evenly with a static charge, then has the image drawn on it with a laser that erases charge, then dusted with charged powder that sticks only where the laser drew, then pressed against paper that pulls the powder off, then the paper is baked so the powder becomes permanent, and finally the board is wiped clean for the next page. That is the laser process, and each stage is a component with its own failure.

## The seven steps as a table
\`\`\`
step             component                          what happens                                        failure looks like
1 processing     formatter, memory                  page rasterized into a bitmap                       partial or missing pages on complex jobs (memory)
2 charging       primary charge roller or corona    uniform negative charge (about minus 600 V) on the drum   overall gray background, uneven density
3 exposing       laser and scanner mirror           laser removes charge where toner should go           blank pages (no exposure), streaks from a dirty mirror
4 developing     developer roller, toner            negatively charged toner clings to exposed areas     faded print (low toner), speckling (loose toner)
5 transferring   transfer roller or corona; belt in color   positive charge on paper pulls toner off the drum   faded or patchy print, blank areas
6 fusing         fuser (heated roller + pressure roller)   toner melted into the paper at about 180 C    toner smears off, wrinkled pages, fuser error
7 cleaning       cleaning blade, erase lamp         leftover toner scraped off, charge erased            ghost images repeating down the page
\`\`\`
Mnemonic: Please Charge Every Dog Treats For Cleaning. The exam may present the list out of order and ask which comes first, or ask which step a symptom belongs to.

## Color lasers
A color laser has four toner cartridges and drums (cyan, magenta, yellow, black). Each drum develops its color and transfers it to an intermediate transfer belt; the belt carries the full image to the paper in one transfer, and the fuser fixes all four at once. Color registration (calibration) aligns the four images; misaligned color fringes mean run the calibration.

## Components and what they do
\`\`\`
part                         job                                      replace when
imaging drum                 holds the charged image                   repeating marks every rotation, lines, faded areas; often inside the cartridge on small printers
toner cartridge              powder supply (plus developer roller)     print fades; shaking gives a few more pages
fuser assembly               melts toner into paper                    smearing, fuser errors, wrinkles; part of the maintenance kit
transfer roller or belt      moves toner to paper                      faded, patchy transfer; part of the kit
pickup rollers               grab a sheet from the tray                no feed; part of the kit
separation pad               lets only one sheet through               multiple sheets at once; part of the kit
duplexing assembly           flips the sheet                           jams on two-sided jobs only
laser scanner assembly       writes the image                          blank pages, vertical white lines
high-voltage power supply    charges rollers and corona                gray background, light print
\`\`\`

## Maintenance, done right
\`\`\`
task                when                                  how
replace toner       print fades; low toner warning        shake gently, remove tape, insert; recycle the old one
maintenance kit     at the page count (often 100k to 200k)  fuser, transfer roller, pickup rollers, pads; reset the counter afterward
calibrate           after consumables; color shift; misregistration   from the printer's menu
clean               regularly and after a toner spill     toner vacuum with a HEPA filter, lint-free cloths, isopropyl on rollers
\`\`\`
Two rules the exam insists on: never blow toner around with compressed air (it goes airborne and into the mechanism), and never use a household vacuum (the particles pass through the bag and the motor can ignite them). Let the fuser cool before touching it. Keep the drum out of bright light.

## Worked example: the smearing printer
Pages come out with the text intact but it smudges off with a finger. The toner reached the paper but was not fused. The fuser is not heating: it may be failing, the printer may be in an economy mode with reduced fuser temperature for the wrong paper type, or heavy paper is set as plain. Check the paper type setting first, then replace the fuser (or the maintenance kit if the count is due).

## Worked example: the repeating ghost
Every page shows a faint copy of the previous page's image lower down. The cleaning step is failing: the blade is worn or the erase lamp is dead, or the drum surface is worn so it does not discharge. Replace the drum (or the cartridge that contains it).

## How the exam asks it
- "Which laser printing step applies a uniform negative charge to the drum?" Charging.
- "Which step immediately follows exposing?" Developing.
- "Print smears when touched." The fuser.
- "Ghost images repeat down the page." Cleaning failure or a worn drum.
- "The printer pulls several sheets at once." Worn separation pad (and rollers): maintenance kit.
- "How should loose toner inside a printer be cleaned?" With a toner-rated vacuum, never compressed air.

## What to memorize
- Processing, charging, exposing, developing, transferring, fusing, cleaning; minus 600 V; about 180 C.
- Component to symptom: drum lines and ghosts, toner fade, fuser smear, transfer faded, rollers and pad feed problems.
- Toner, maintenance kit at the page count (reset the counter), calibrate, toner vacuum only.`,

u6l3: `## Three ways to mark paper without a laser
An inkjet paints with liquid. A thermal printer burns the image into paper that darkens with heat. An impact printer hammers an inked ribbon. Each has a distinct set of parts, a distinct set of consumables, and a distinct set of complaints, and the exam asks you to match all three.

## Side by side
\`\`\`
                inkjet                              thermal                              impact (dot matrix)
marks paper by  spraying droplets of ink            heating special paper                 pins striking an inked ribbon
consumables     ink cartridges or bottles; heads    heat-sensitive paper only             ribbon; print head; continuous paper
key parts       print head, carriage belt, cartridges, feed rollers, duplexer   heating element, feed assembly, platen   print head with pins, ribbon, tractor feed
strengths       cheap to buy; photo quality; color   fast, silent, no ink, reliable        multipart forms; cheap; rugged
weaknesses      slow; costly per page; ink dries; smears when wet   fades with heat and light; special paper   loud; slow; low quality
typical use     home, photos, small office color     receipts, labels, tickets, shipping   invoices, manifests, warehouse and shop floors
\`\`\`

## Inkjet, in depth
\`\`\`
part            role                                          failure and fix
print head      nozzles that fire droplets                    missing lines, streaks: run head cleaning; dried head: soak or replace
carriage belt   moves the head across the page                grinding or head stuck: belt worn or debris; replace
cartridges      ink supply; some include the head             faded or missing color: replace; check that tape was removed
feed rollers    pull paper in                                 no feed or skew: clean with isopropyl, replace if glazed
duplexer        flips paper for two-sided output              jams on duplex only: clear and check the path
\`\`\`
Maintenance is about keeping ink flowing: run cleaning when lines drop out, align after cartridge changes so colors and text register, print regularly so nozzles do not clog, and clear jams by pulling in the paper's travel direction. Inkjet pages need a moment to dry; smearing on fresh pages is normal, but persistent smearing means the wrong paper or too much ink for it.

## Thermal, in depth
\`\`\`
part               role                                       failure and fix
heating element    a line of tiny heaters in the head         faint or streaked print: clean with isopropyl; dead segments: replace the head
feed assembly      rollers and motor pulling paper past        no feed or slipping: clean rollers, remove label adhesive
platen roller      backs the paper against the element        worn platen: uneven print; replace
paper              heat-sensitive, one coated side            blank output: roll loaded backward; fading: heat or sun exposure
\`\`\`
There is no ink, so the only "consumable" is paper, which must be the right thermal stock loaded with the coated side to the element. Label printers accumulate adhesive on the path; clean it or feeds fail. Receipts fade in a hot car or a sunny window, which is why archives are photocopied.

## Impact, in depth
\`\`\`
part            role                                          failure and fix
print head      9 or 24 pins that strike the ribbon           a missing dot on every character: a broken pin; replace the head
ribbon          inked fabric loop                              even fading: replace the ribbon
tractor feed    sprockets in the paper's edge holes           tearing or skewing: realign the paper and tension
platen          the surface the pins strike against           uneven print: adjust the gap for form thickness
\`\`\`
Impact printers survive because carbonless multipart forms need pressure to print through the copies; no other printer type can make a three-part invoice in one pass. Adjust the head gap for the thickness of the form set.

## 3D printers, the essentials
FDM printers push plastic filament through a heated nozzle onto a bed, layer by layer; resin printers cure liquid resin with light. Bed leveling, nozzle clogs, and damp filament are the usual problems; store filament in a dry box and level the bed before a long print.

## Worked example: the shipping desk
A shipping label printer starts printing labels that are faint on one side and blank on the other. The heating element has adhesive and dust on part of its length, and the roll may have been loaded with the coating away from the element. Clean the element with isopropyl on a swab, confirm the paper orientation, and check the platen roller for wear.

## Worked example: the invoice printer
The warehouse's dot matrix printer prints every character with a horizontal gap through the middle. That is a single broken pin in the print head; replace the head. If instead the whole page were evenly light, the answer would be the ribbon.

## How the exam asks it
- "Which printer type requires no ink or toner?" Thermal.
- "Which printer can print multipart carbonless forms?" Impact (dot matrix).
- "An inkjet prints with horizontal gaps in the text." Run the print head cleaning routine.
- "A thermal printer produces blank receipts." The paper is loaded with the wrong side facing the element.
- "A dot matrix printer prints characters with the same dot missing every time." Replace the print head.
- "Which part should be cleaned with isopropyl alcohol on a thermal printer?" The heating element.

## What to memorize
- Inkjet: head, carriage belt, cartridges, feed rollers, duplexer; clean heads, align, replace cartridges, clear jams, keep in use.
- Thermal: heating element, feed assembly, special paper; clean with isopropyl; paper side; fades with heat.
- Impact: pins, ribbon, tractor feed; multipart forms; ribbon for fade, head for missing dots.
- 3D: filament or resin, bed, nozzle; level, unclog, dry storage.`

});
