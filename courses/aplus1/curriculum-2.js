// APlus Academy Core 1 curriculum, units 4 to 6. Original teaching content for CompTIA A+ 220-1201.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Cables, Connectors, and Displays", domain: 3,
  blurb: "Every cable and connector a technician must recognize by name and number, from copper categories and fiber to USB, Thunderbolt, video, and drive interfaces, plus the display panels they feed.",
  assumes: "You know what a switch and a NIC are (Unit 2).",
  lessons: [
    {
      id: "u4l1", title: "Network Cables: Copper Categories, T568A and T568B, Shielding, Plenum, Direct Burial, Coax, and Fiber", domain: 3, obj: "3.2", minutes: 11,
      body: `Network cable questions are pure recall with a few rules attached. Learn the categories by speed, the pin orders, the jacket types, and the two fiber families.

## Twisted-pair copper
Ethernet over copper uses four twisted pairs, eight wires, terminated in an **RJ45** plug. The twists cancel interference; tighter twists and better insulation raise the category.
- **Cat 5**: 100 Mb/s at 100 MHz; obsolete, replace it when found.
- **Cat 5e**: 1 Gb/s at 100 MHz; the minimum for gigabit.
- **Cat 6**: 1 Gb/s at 250 MHz, and 10 Gb/s for runs up to 55 m; has a spline separating the pairs.
- **Cat 6a**: 10 Gb/s to the full 100 m at 500 MHz; the standard choice for new 10 gigabit runs.
- **Cat 7**: 10 Gb/s at 600 MHz; fully shielded; uses GG45 or RJ45 connectors.
- **Cat 8**: 25 or 40 Gb/s at 2,000 MHz, but only to 30 m; data center racks.
Every copper run is limited to **100 meters (328 feet)** from switch to device including patch cables. Beyond that the signal fades and errors climb; fiber or a repeater is the answer.

## Pin order: T568A and T568B
Both standards wire all eight pins; they differ only in which pair sits on pins 1 and 2 versus 3 and 6.
- **T568B**: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown.
- **T568A**: white-green, green, white-orange, blue, white-blue, orange, white-brown, brown.
The same standard on both ends makes a **straight-through** cable (device to switch). A on one end and B on the other makes a **crossover** cable (pins 1 and 3 and pins 2 and 6 are swapped at one end), once needed to join two like devices such as switch to switch or host to host; modern ports auto-sense (auto-MDIX), so crossovers are rare. Pick one standard and use it everywhere in a building.

## Jackets and shielding
- **UTP** (unshielded twisted pair) is the normal cable.
- **STP** (shielded) wraps the pairs in foil or braid for factories, hospitals, and runs near motors or fluorescent ballasts; the shield must be grounded.
- **Plenum-rated** cable has a low-smoke, fire-resistant jacket required in air-handling spaces above drop ceilings and under raised floors, because ordinary PVC gives off toxic smoke.
- **Direct burial** cable is gel-filled and armored for outdoor trenches.
- **RJ11** is the smaller telephone plug (four or six positions) on DSL and phone lines.

## Coaxial
A single center conductor inside a dielectric and a braided shield. **RG-6** carries cable TV and cable modem signals with an **F-type** screw-on connector. **RG-59** is thinner, for short CCTV runs, often with a bayonet **BNC** connector.

## Fiber optic
Fiber carries light, so it is immune to electrical interference, runs far, and is safe to route near power.
- **Single-mode**: a tiny core of about 9 microns, a laser source, kilometers of reach; long links between buildings and to the ISP; yellow jacket.
- **Multimode**: a 50 or 62.5 micron core, an LED or VCSEL source, hundreds of meters (OM3 reaches about 300 m at 10 Gb/s); inside buildings and data centers; orange or aqua jacket.
Connectors: **ST** (bayonet twist), **SC** (square push-pull), and **LC** (small clip, the most common today). Fiber ends must be kept clean; a fingerprint is enough to kill a link.

> Exam tip: Cat 5e for gigabit, Cat 6a for 10 gigabit at 100 m, Cat 8 for 30 m in racks. Plenum for ceiling spaces. T568B starts white-orange; A starts white-green. Single-mode for distance with a laser; multimode for inside with an LED. RG-6 with F-type for cable TV.`,
      hook: "Cat 5e 1 Gb/s; Cat 6 1 Gb/s (10 to 55 m); Cat 6a 10 Gb/s 100 m; Cat 7 shielded 600 MHz; Cat 8 25/40 Gb/s 30 m. 100 m limit. T568B white-orange first; T568A white-green first; mixed = crossover. STP for noise; plenum for air spaces; direct burial outdoors. RG-6 F-type; RG-59 BNC. Single-mode 9 microns laser km; multimode 50/62.5 LED hundreds of m; ST, SC, LC."
    },
    {
      id: "u4l2", title: "Peripheral, Video, and Drive Interfaces: USB, Thunderbolt, Lightning, Serial, HDMI, DisplayPort, DVI, VGA, SATA, and Adapters", domain: 3, obj: "3.2", minutes: 12,
      body: `The back of a PC is a row of connectors, and each one has a name, a speed, and a job. Core 1 asks you to identify them, match a cable to a need, and know which adapters exist.

## USB, by generation
The names have been renamed twice, so learn the speeds and the ports.
- **USB 2.0**: 480 Mb/s; black port; up to 5 m of cable.
- **USB 3.0** (also called 3.1 Gen 1 and 3.2 Gen 1): 5 Gb/s; blue port; up to 3 m.
- **USB 3.1 Gen 2** (3.2 Gen 2): 10 Gb/s; teal or red port.
- **USB 3.2 Gen 2x2**: 20 Gb/s; USB-C only.
- **USB4**: 40 Gb/s (80 Gb/s in version 2); USB-C only; can tunnel Thunderbolt, DisplayPort, and PCIe.
Connectors: **Type A** (the flat rectangle on hosts), **Type B** (the squarish plug on printers and scanners), **mini** and **micro** (older cameras and phones), and **USB-C** (reversible, on everything new). A USB 3 device in a USB 2 port works at USB 2 speed.

## Thunderbolt and Lightning
- **Thunderbolt 3 and 4**: 40 Gb/s over the USB-C connector; daisy chain up to six devices; carries PCIe, DisplayPort, and power; Thunderbolt 5 doubles to 80 Gb/s. A Thunderbolt port accepts USB-C devices, but a plain USB-C port does not run Thunderbolt devices at full capability.
- **Lightning**: Apple's 8-pin reversible connector on older iPhones; USB 2.0 speed.

## Serial
**RS-232** over a **DB9** connector at kilobits per second. It survives as the console port on switches, routers, and firewalls, usually through a USB-to-serial adapter today.

## Video connectors
- **VGA**: 15-pin blue DE-15; analog; no audio; fuzzy over long cables and at high resolutions; still on projectors.
- **DVI**: digital (DVI-D), analog (DVI-A), or both (DVI-I); single link to 1920 x 1200, dual link to 2560 x 1600; no audio.
- **HDMI**: 19-pin; digital video and audio; Type A full size, C mini, D micro; HDMI 2.1 reaches 48 Gb/s for 8K; CEC lets one remote control several devices.
- **DisplayPort**: 20-pin with a locking latch; digital video and audio; daisy chains monitors with multi-stream; DP 2.0 reaches 80 Gb/s; mini DisplayPort on older laptops.
- **USB-C with DisplayPort alternate mode**: one cable for video, data, and power, if the port supports it.

## Drive interfaces
- **SATA**: 7-pin data cable, 15-pin power connector; SATA I 1.5 Gb/s, II 3 Gb/s, III 6 Gb/s; cable up to 1 m; hot-pluggable if enabled.
- **eSATA**: an external shielded SATA port, cable up to 2 m; largely replaced by USB 3.
- **Molex**: the 4-pin white power connector supplying 5 V and 12 V to old drives and fans.
- **M.2** and **NVMe** connect through PCIe and are covered with storage.

## Adapters and converters
Passive adapters join compatible digital signals: DVI-D to HDMI, DisplayPort to HDMI (often active for high refresh), USB-C to DisplayPort. Converting analog to digital (VGA to HDMI) needs an active converter with electronics. Other common adapters: USB to Ethernet, USB-C to USB-A, USB to serial, HDMI to VGA (active, sometimes powered), and DVI to VGA (only works from DVI-I or DVI-A because it needs the analog pins).

> Exam tip: USB 2.0 480 Mb/s black, 3.0 5 Gb/s blue, 3.1 Gen 2 10 Gb/s, USB4 and Thunderbolt 40 Gb/s over USB-C. VGA is the only analog video connector; HDMI and DisplayPort carry audio; DVI does not. SATA III is 6 Gb/s with a 7-pin data and 15-pin power connector. DB9 is serial.`,
      hook: "USB 2.0 480 Mb/s black 5 m; 3.0 5 Gb/s blue 3 m; 3.1 Gen 2 10 Gb/s; 3.2 Gen 2x2 20 Gb/s; USB4 40 Gb/s. Thunderbolt 3/4 40 Gb/s USB-C daisy chain; Lightning USB 2.0. DB9 serial console. VGA analog 15-pin; DVI digital no audio; HDMI 19-pin audio; DisplayPort latch, daisy chain. SATA 1.5/3/6 Gb/s, 7-pin data, 15-pin power, 1 m; eSATA 2 m; Molex 4-pin. Analog to digital needs an active converter."
    },
    {
      id: "u4l3", title: "Displays: LCD Types, OLED, Mini-LED, Digitizers, Inverters, Resolution, Density, Refresh, and Gamut", domain: 3, obj: "3.1", minutes: 9,
      body: `A display is chosen by panel type and by four numbers. Core 1 asks you to compare panel technologies, name the layers of a touch screen, and match cable and settings to what a monitor can do.

## LCD panels
Every LCD is a grid of liquid crystal shutters lit from behind. The crystal arrangement decides the trade-offs.
- **TN** (twisted nematic): the cheapest and the fastest response; poor color and narrow viewing angles, so the picture shifts when you move. Budget and competitive gaming monitors.
- **IPS** (in-plane switching): the best color accuracy and wide viewing angles; slightly slower and more expensive. Design work, most laptops, and most good monitors.
- **VA** (vertical alignment): the highest contrast and deepest blacks of the LCD family; middle of the road on angles and response. Curved and TV-style monitors.

## Backlights and inverters
Modern LCDs are lit by LEDs. Older ones used CCFL tubes that need high-voltage AC, produced by an **inverter** board from the laptop's DC. A dim screen whose image is still faintly visible under a flashlight is a failed backlight or inverter, not a failed panel. **Mini-LED** backlights use thousands of tiny LEDs in local dimming zones for high brightness and contrast without the burn-in risk of OLED.

## OLED
Each pixel makes its own light, so blacks are perfect (the pixel is simply off), the panel is thin and can bend, and contrast is unmatched. The cost is **burn-in**: a static image such as a taskbar left for months leaves a ghost. Phones, premium laptops, and TVs use it; pixel shifting and screen savers reduce the risk.

## Touch screens and digitizers
A touch display is a sandwich: the LCD or OLED panel, a **digitizer** layer that senses fingers or a pen, and a glass cover. Capacitive digitizers sense the body's charge (fingers and passive styluses); active pen digitizers sense the pen's signal. A cracked glass with a working image is a cover glass or digitizer replacement; touch that drifts or ignores a region is a digitizer fault or a calibration issue.

## The four numbers
- **Resolution**: pixels across by pixels down. 1920 x 1080 is Full HD, 2560 x 1440 is QHD, 3840 x 2160 is 4K UHD. An LCD is sharp only at its **native** resolution; anything else is scaled and looks soft.
- **Pixel density** in pixels per inch: the same resolution on a smaller panel is sharper. Phones exceed 400 PPI; a 27-inch 4K monitor is about 163 PPI; scaling settings keep text readable.
- **Refresh rate** in hertz: how many times per second the image updates. 60 Hz is standard; 120, 144, and 240 Hz are for gaming and smooth motion. The cable and port must have the bandwidth for the resolution at that rate: 4K at 144 Hz needs HDMI 2.1 or DisplayPort 1.4 or newer.
- **Color gamut**: the range of colors a panel can show. sRGB covers the web; Adobe RGB and DCI-P3 are wider for print and video work. A wider gamut with calibration matters to designers, not to spreadsheets.

## Matching monitor, cable, and settings
A new 144 Hz monitor running at 60 Hz has the wrong refresh selected in the OS, or a cable or port that cannot carry more. A blurry image on a new monitor is a non-native resolution. A monitor that shows no image on one input but works on another has the wrong input source selected.

> Exam tip: TN fast and cheap, IPS color and angles, VA contrast. OLED perfect blacks but burn-in. Dim image visible with a flashlight is backlight or inverter. Digitizer senses touch. Native resolution for sharpness; refresh rate needs cable bandwidth.`,
      hook: "TN cheap and fast, poor angles; IPS best color and angles; VA best contrast. OLED self-lit, perfect blacks, burn-in. Mini-LED zoned backlight. Inverter powers CCFL backlights; dim but visible = backlight. Digitizer layer senses touch or pen. Native resolution; PPI density; refresh Hz needs bandwidth; gamut sRGB, Adobe RGB, DCI-P3."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Memory, Storage, Motherboards, and Power", domain: 3,
  blurb: "The inside of the box: RAM generations, hard drives and SSDs, RAID levels with the math, motherboard form factors and slots, firmware settings, CPUs and cooling, and power supplies.",
  assumes: "You can identify the main cables and connectors (Unit 4).",
  lessons: [
    {
      id: "u5l1", title: "RAM: DIMM and SODIMM, DDR3 to DDR5, ECC, Channels, and Virtual Memory", domain: 3, obj: "3.3", minutes: 9,
      body: `Memory questions come down to matching the right module to the slot and understanding a handful of features. The generations do not mix, and the numbers are worth memorizing.

## Kinds of memory
**DRAM** (dynamic RAM) is the working memory on DIMMs and SODIMMs and must be refreshed constantly; **SRAM** (static RAM) is the faster memory used for the CPU's cache; **ROM** and flash hold firmware; a small **CMOS** memory keeps firmware settings alive on the coin cell.

## Form factors
- **DIMM**: the long module for desktops and servers.
- **SODIMM**: the short module for laptops, all-in-ones, and small form factor PCs.
The two are not interchangeable, and each generation has its notch in a different place so the wrong module cannot be seated.

## The generations
- **DDR3**: 240-pin DIMM, 204-pin SODIMM, 1.5 V (1.35 V low-voltage), 800 to 2133 MT/s.
- **DDR4**: 288-pin DIMM, 260-pin SODIMM, 1.2 V, 2133 to 3200 MT/s and beyond; the most common in service.
- **DDR5**: 288-pin DIMM (keyed differently from DDR4), 262-pin SODIMM, 1.1 V, 4800 MT/s and up; power management moved onto the module, and each module has two independent channels.
Speed is quoted in megatransfers per second (DDR4-3200) or as a bandwidth label (PC4-25600). A board runs all modules at the speed of the slowest one. Consult the board's supported memory list; faster than supported simply runs at the supported speed.

## ECC and non-ECC
**ECC** (error-correcting code) memory carries extra bits that detect and correct single-bit errors, which matters in servers and workstations that run for months. The CPU and board must support it. Consumer boards use **non-ECC**. Registered (buffered) modules add a buffer chip for large server configurations and are not interchangeable with unbuffered ones.

## Channels
Memory controllers read several modules at once. Installing two matched modules in the correct paired slots (usually the same color, often slots 2 and 4) enables **dual channel**, doubling bandwidth compared with a single module; workstations and servers offer quad or eight-channel configurations. Mismatched modules still work but may fall back to single channel, and a single module always runs single channel. Read the board manual for which slots to populate first.

## Installing a module
1. Power off, unplug, press the power button to drain, ground yourself.
2. Open the slot's clips, line up the notch, and press straight down on both ends until the clips snap closed (desktop), or insert at an angle and press down (laptop).
3. Boot and confirm the total in firmware. A module not fully seated is the usual reason the count is short or the system beeps.

## Virtual memory
When physical RAM is full, the operating system moves idle pages to a **paging file** (swap) on the drive. That keeps programs running but the drive is thousands of times slower than RAM. A machine that thrashes its drive and crawls when many programs are open needs more RAM, not a bigger paging file.

## Sizing
32-bit (x86) operating systems address about 4 GB; 64-bit systems address far more. Office machines are comfortable at 16 GB; content creation and virtualization want 32 GB or more.

> Exam tip: DDR4 288-pin DIMM at 1.2 V; DDR5 288-pin with a different key at 1.1 V; DDR3 240-pin at 1.5 V. SODIMM for laptops. ECC for servers and needs board support. Matched pairs in the right slots for dual channel. Constant paging means add RAM.`,
      hook: "DIMM desktop, SODIMM laptop; notches prevent mixing. DDR3 240/204 pins 1.5 V; DDR4 288/260 1.2 V; DDR5 288/262 1.1 V, different key, two channels per module. Runs at the slowest module's speed. ECC detects and corrects single-bit errors; servers. Matched pairs in paired slots for dual channel. Paging file is slow; thrashing means add RAM."
    },
    {
      id: "u5l2", title: "Storage Devices: HDDs, SATA and NVMe SSDs, M.2, mSATA, SAS, Removable Media, and Optical", domain: 3, obj: "3.4", minutes: 10,
      body: `Storage is where the numbers and the form factors pile up. Sort them into three questions: how does it store data, how does it connect, and what shape is it?

## Hard disk drives
Spinning magnetic platters with a moving read head. Speed follows rotation: **5,400 rpm** (quiet laptop drives), **7,200 rpm** (desktops), **10,000 and 15,000 rpm** (older enterprise drives). Two sizes: **2.5-inch** for laptops and **3.5-inch** for desktops. They are the cheapest per terabyte, slow to seek, and fail mechanically, with clicking and grinding as the warning signs. They connect over SATA (or SAS in servers).

## Solid-state drives
No moving parts, silent, fast, shock resistant. The connection decides the speed.
- **SATA SSD**: about 550 MB/s, capped by SATA III at 6 Gb/s. Sold as 2.5-inch drives that drop into an HDD bay, as **mSATA** cards in older laptops, and as M.2 SATA cards.
- **NVMe SSD**: talks to the CPU over PCIe lanes with the NVMe protocol; thousands of megabytes per second (about 3.5 GB/s on PCIe Gen 3 x4, about 7 GB/s on Gen 4). Sold as M.2 cards or PCIe add-in cards.

## M.2, a slot rather than an interface
M.2 is a form factor: a small card 22 mm wide, with the length in the name (**2242, 2260, 2280**, the last being the common one). The edge connector is **keyed**: B key, M key, or B+M. M-keyed slots usually carry PCIe x4 for NVMe; B-keyed and B+M cards are often SATA. A slot may support SATA only, NVMe only, or both; the board manual and the printing beside the slot say which. Buying an NVMe drive for a SATA-only slot is the classic mistake.

## SAS
**Serial Attached SCSI** drives are enterprise drives at 12 Gb/s with dual ports for redundancy. A SAS controller accepts SATA drives, but a SATA controller cannot use SAS drives.

## Removable media
- **USB flash drives**: the everyday transfer tool; speed depends on the USB generation and the drive.
- **Memory cards**: **SD**, **miniSD**, and **microSD** (cameras, phones, single-board computers; a smaller card fits a larger slot with an adapter), with speed classes printed on the card; **CompactFlash** in older professional cameras.
- External drives over USB or Thunderbolt.

## Optical
Read by laser, slow, but archival and still asked about: **CD** 700 MB, **DVD** 4.7 GB (8.5 GB dual layer), **Blu-ray** 25 GB (50 GB dual layer). Drives are read-only, writable (-R), or rewritable (-RW, -RE).

## Choosing a drive
- Boot drive and applications: an NVMe SSD if the board has an M.2 NVMe slot, otherwise a SATA SSD.
- Bulk storage and backups: a large HDD, or a NAS.
- Laptop upgrade: check the slot type, key, and length, or the 2.5-inch bay, before ordering.
- Server: SAS with hardware RAID.

## Installing and preparing
Mount the drive, connect data and power (SATA) or screw the M.2 card down at the standoff, confirm it appears in firmware, then initialize, partition, and format it in the operating system before it appears as a drive letter.

> Exam tip: rpm figures 5,400, 7,200, 10,000, 15,000. SATA III 6 Gb/s caps a SATA SSD near 550 MB/s; NVMe over PCIe is many times faster. M.2 is a form factor with keys and lengths, and can be SATA or NVMe. SAS controllers accept SATA drives, not the reverse. CD 700 MB, DVD 4.7 GB, Blu-ray 25 GB.`,
      hook: "HDD 5,400/7,200/10,000/15,000 rpm; 2.5-inch laptop, 3.5-inch desktop; clicking means failing. SATA SSD about 550 MB/s; NVMe over PCIe thousands of MB/s. M.2 keys B, M, B+M; lengths 2242, 2260, 2280; SATA or NVMe per slot. mSATA older. SAS 12 Gb/s enterprise; accepts SATA. SD, microSD, CF. CD 700 MB, DVD 4.7 GB, Blu-ray 25 GB."
    },
    {
      id: "u5l3", title: "RAID 0, 1, 5, 6, and 10 With Capacity Math", domain: 3, obj: "3.4", minutes: 9,
      body: `RAID combines several drives into one logical volume for speed, fault tolerance, or both. Core 1 asks which level fits a need, how many drives it takes, how many can fail, and how much space is left.

## The five levels
- **RAID 0 (striping)**: data is split across two or more drives. Fast reads and writes, full capacity, and no protection at all: lose one drive and the whole array is gone. Scratch space and video editing only.
- **RAID 1 (mirroring)**: two drives hold identical copies. One drive can fail. Capacity is half the total. Simple and common for boot drives and small servers.
- **RAID 5 (striping with distributed parity)**: three or more drives; parity information spread across all of them. One drive can fail and the array rebuilds from parity. Capacity is the total minus one drive. Good read performance, slower writes; a long rebuild on big drives.
- **RAID 6 (double parity)**: four or more drives; two sets of parity. Two drives can fail. Capacity is the total minus two drives. Safer than RAID 5 for large arrays where a second failure during a rebuild is a real risk.
- **RAID 10 (1+0, a stripe of mirrors)**: four or more drives in an even count; pairs are mirrored and the pairs are striped. Fast, survives one drive failure per mirrored pair, and keeps half the capacity. The choice for databases.

## Capacity math
Let n be the number of drives and s the size of each.
- RAID 0: n x s.
- RAID 1: s (half of 2 x s).
- RAID 5: (n minus 1) x s.
- RAID 6: (n minus 2) x s.
- RAID 10: (n / 2) x s.
Worked examples with four 2 TB drives: RAID 0 gives 8 TB, RAID 5 gives 6 TB, RAID 6 gives 4 TB, RAID 10 gives 4 TB. Six 4 TB drives in RAID 5 give 20 TB and tolerate one failure; in RAID 6 they give 16 TB and tolerate two.

## Minimum drives and survival
RAID 0 needs 2 and survives 0 failures; RAID 1 needs 2 and survives 1; RAID 5 needs 3 and survives 1; RAID 6 needs 4 and survives 2; RAID 10 needs 4 and survives 1 per mirror (up to half the drives if they are in different pairs, but never both drives of one pair).

## Hardware, software, and the extras
A **hardware RAID** controller does the work with its own processor and often a battery-backed cache; it presents one volume to the OS and needs a driver. **Software RAID** is done by the operating system, cheaper and slower. A **hot spare** is an idle drive the controller uses automatically to start a rebuild the moment a member fails. **Hot-swappable** bays let a failed drive be pulled and replaced while the array keeps running. During a rebuild the array is slow and unprotected (RAID 5) or half protected (RAID 6), which is why replacing a failed drive is urgent.

## RAID is not backup
A mirror faithfully copies a deleted file, ransomware, and a corrupted database. RAID protects against drive failure and keeps the system running; backups protect the data.

> Exam tip: speed with no protection is 0; two drives mirrored is 1; parity with one-drive tolerance and n minus 1 capacity is 5; double parity, two drives, four minimum is 6; stripe of mirrors, four drives, half capacity is 10. Do the capacity math on paper.`,
      hook: "RAID 0 stripe: fast, full capacity, no tolerance, 2 drives. RAID 1 mirror: 50%, one fails, 2 drives. RAID 5 parity: n minus 1, one fails, 3 minimum. RAID 6 double parity: n minus 2, two fail, 4 minimum. RAID 10 stripe of mirrors: 50%, one per pair, 4 minimum. Hot spare rebuilds automatically. RAID is not backup."
    },
    {
      id: "u5l4", title: "Motherboards: Form Factors, Slots, Power Connectors, Headers, Sockets, and Chipsets", domain: 3, obj: "3.5", minutes: 11,
      body: `The motherboard is the map of the computer. Core 1 expects you to name its parts on sight, know what plugs into each connector, and match a board to a case, a CPU, and a power supply.

## Form factors
- **ATX**: 12 x 9.6 inches (305 x 244 mm); the full-size board with the most expansion slots and memory slots.
- **microATX**: 9.6 x 9.6 inches; fits ATX cases using the same mounting holes, with fewer slots.
- **Mini-ITX**: 6.7 x 6.7 inches (170 mm square); one expansion slot, for compact builds and media centers.
A smaller board fits a larger case; the reverse does not. Standoffs between the board and the case tray prevent shorts; a missing or extra standoff is a classic "dead board" cause.

## Expansion slots
- **PCIe** (PCI Express): the modern slot in lengths of x1, x4, x8, and x16 lanes. A shorter card fits in a longer slot and uses only its lanes. Each lane carries about 1 GB/s per direction on Gen 3, 2 GB/s on Gen 4, 4 GB/s on Gen 5. Graphics cards use x16; NICs, sound, and capture cards use x1 or x4; some NVMe drives ride an x4 adapter.
- **PCI**: the old 32-bit parallel slot at 133 MB/s shared; only on legacy boards for legacy cards.
- **M.2**: the small slot for NVMe or SATA SSDs and for wireless cards; the key and supported lengths are printed beside it.

## Power connectors
- **24-pin main** (20+4 on older supplies) from the PSU to the board.
- **EPS 4-pin or 8-pin** CPU power near the socket; some boards want two.
- **PCIe 6-pin (75 W) and 8-pin (150 W)** for graphics cards; the newest cards use a **12VHPWR 16-pin** connector rated to 600 W.
- **SATA power** (15-pin) and **Molex** (4-pin) from the PSU to drives and accessories; fan headers on the board.

## Drive ports and headers
- **SATA** 7-pin data ports on the board, numbered; **eSATA** on the rear panel of some boards.
- **Front panel header**: power switch, reset switch, power LED, drive LED; the pin layout is in the manual and on the board's silkscreen.
- **USB 2.0 and 3.0 headers** for the case's front ports; **front panel audio** header; **fan headers** (3-pin voltage control, 4-pin PWM); **RGB** headers; sometimes a **TPM** header or a serial header.

## CPU sockets and chipsets
- **Intel** uses **LGA** (land grid array): the pins are in the socket and the CPU has flat pads. Sockets are named by pin count, such as LGA 1700 and LGA 1851.
- **AMD** used **PGA** (pin grid array) with pins on the chip for AM4, and moved to LGA for AM5. Bent pins on a PGA chip and bent pins in an LGA socket are both fatal mistakes to avoid by aligning the corner marker and never forcing.
- The **chipset** decides which CPU generations, memory speeds, PCIe lanes, and ports the board supports. A CPU physically fits only its socket, and even then the board may need a firmware update to recognize a newer generation.
- **Multisocket** boards in servers hold two or more CPUs with their own memory banks.

## Firmware and the CMOS battery
The board's UEFI firmware lives on a flash chip and its settings are kept alive by a **CR2032** coin cell. A dead cell resets the clock and settings at every boot.

> Exam tip: ATX, microATX, and Mini-ITX by size; a small board fits a big case. PCIe x16 for graphics; a shorter card works in a longer slot. 24-pin main, 8-pin EPS for the CPU, 6- and 8-pin PCIe for the GPU. Intel LGA, AMD AM4 PGA and AM5 LGA. The chipset sets compatibility. CR2032 keeps settings.`,
      hook: "ATX 12 x 9.6; microATX 9.6 x 9.6; Mini-ITX 6.7 x 6.7; small fits big. PCIe x1/x4/x8/x16; about 1, 2, 4 GB/s per lane Gen 3, 4, 5; short card in long slot. PCI legacy. 24-pin main, EPS 4/8 CPU, PCIe 6-pin 75 W, 8-pin 150 W, 12VHPWR 600 W. Headers: front panel, USB, audio, fan 3/4-pin, RGB. Intel LGA; AMD AM4 PGA, AM5 LGA; chipset decides support. CR2032."
    },
    {
      id: "u5l5", title: "BIOS and UEFI: Boot Options, Secure Boot, TPM, Passwords, Fans, Virtualization Support, HSM, and CMOS", domain: 3, obj: "3.5", minutes: 10,
      body: `Firmware is the software that wakes the hardware before any operating system loads. The exam asks what each setting does and which one solves a given problem.

## BIOS versus UEFI
The legacy **BIOS** is 16-bit, text-only, boots from MBR disks limited to 2 TB and four primary partitions, and has no security features. **UEFI** is its replacement: a graphical setup with mouse support, boots from **GPT** disks of any size, supports **Secure Boot**, network boot, and firmware-level drivers, and starts faster. Nearly every board sold in the last decade is UEFI, often with a compatibility (CSM or legacy) mode for old operating systems. Enter setup with a key at power-on (Del, F2, F10, or Esc, depending on the maker) or from the OS's advanced startup.

## Boot options
The **boot order** lists which devices the firmware tries first: the internal drive, a USB stick, an optical drive, or the network (PXE). To install an operating system, put the USB drive first or use the one-time boot menu (often F12). A machine that says "no bootable device" after a technician left a non-bootable USB stick plugged in is trying the stick first. Disabling unused boot devices and USB boot hardens a machine against someone booting their own OS on it.

## USB permissions
Firmware can disable specific USB ports or all USB storage so data cannot be copied off a kiosk or a secure workstation while keyboards and mice keep working.

## TPM and HSM
The **Trusted Platform Module** is a secure chip (or a firmware implementation, fTPM, inside the CPU) that stores encryption keys and measures the boot process. BitLocker drive encryption and Windows Hello depend on it, and Windows 11 requires TPM 2.0. Clearing the TPM destroys the keys; back up the recovery key first. A **hardware security module** is a separate, tamper-resistant device or card used by servers and enterprises to store and use keys at scale; it is not in a laptop.

## Secure Boot
Secure Boot allows only boot loaders signed by trusted keys to run, which blocks boot-sector malware and rootkits that load before the OS. It requires UEFI mode and GPT. Some Linux distributions, older installation media, and certain hardware need it disabled or need their keys enrolled.

## Passwords
A **supervisor** (setup, administrator, or BIOS) password locks the firmware settings; a **user** (boot) password is required before the machine boots at all. The exam calls these the BIOS password and the boot password. Both are cleared on a desktop by the CMOS jumper or removing the battery; laptops often store them in a chip that needs the vendor's help.

## Fans, temperatures, and monitoring
Firmware shows CPU and system temperatures, fan speeds, and voltages, and lets you set fan curves and thermal shutdown thresholds. Checking temperatures here is the first step when a machine shuts down under load.

## Virtualization support
**Intel VT-x** and **AMD-V** must be enabled for hypervisors and for Windows features built on virtualization; the setting is sometimes off by default and the hypervisor reports an error until it is turned on.

## CMOS and firmware updates
Settings live in memory kept by the **CR2032** battery; a dead battery means a wrong date and time and lost settings at every boot. **Flashing** the firmware adds CPU support and fixes bugs; do it on AC power, from the vendor's file, and never interrupt it. Most boards have a reset to defaults that fixes a bad settings change.

> Exam tip: UEFI for GPT, Secure Boot, and drives over 2 TB. Wrong date and time is the CMOS battery. A hypervisor that will not start needs VT-x or AMD-V enabled. BitLocker and Windows 11 need the TPM. Secure Boot blocks unsigned boot loaders. Supervisor password protects settings; user password protects boot.`,
      hook: "BIOS: legacy, MBR, 2 TB limit. UEFI: GPT, Secure Boot, network boot, graphical. Boot order and one-time boot menu; disable USB boot to harden. USB permissions block storage. TPM 2.0 stores keys (BitLocker, Windows 11); HSM is an external enterprise device. Secure Boot needs signed loaders. Supervisor versus user password; CMOS jumper clears. Fan curves and temperatures. VT-x or AMD-V for hypervisors. CR2032; flash carefully."
    },
    {
      id: "u5l6", title: "CPUs, Expansion Cards, and Cooling", domain: 3, obj: "3.5", minutes: 10,
      body: `The processor does the work, expansion cards add abilities the board lacks, and cooling keeps both alive. Core 1 tests the vocabulary and the installation rules.

## Architectures
- **x86** is the 32-bit Intel-compatible design; it addresses about 4 GB of memory.
- **x64** (x86-64) is the 64-bit extension that runs on every modern Intel and AMD desktop and server CPU; it runs 32-bit software too, but 64-bit operating systems need 64-bit drivers.
- **ARM** is a low-power RISC design in phones, tablets, Apple silicon Macs, some Windows laptops, and single-board computers. Software must be built for ARM or run through an emulation layer; you cannot install an x64 driver on an ARM device.

## Cores, threads, cache, and clock
A **core** is an independent processing unit; a quad-core runs four things at once. **Simultaneous multithreading** (Hyper-Threading on Intel) lets each core present two threads, so an eight-core chip shows sixteen logical processors. **Cache** (L1, L2, L3) is small, fast memory on the chip; more cache means fewer slow trips to RAM. The **clock** in gigahertz is how many cycles per second; boost clocks rise under load until heat limits them. Modern chips mix performance and efficiency cores.

## Sockets, a reminder
Intel uses LGA sockets (pins in the socket); AMD used PGA on AM4 and LGA on AM5. Match the CPU to the socket and to the chipset's supported list; align the corner triangle; drop, never press; close the retention lever.

## Expansion cards
- **Video card (GPU)**: its own processor and VRAM; x16 slot; may need one or two PCIe power connectors and a supply with enough wattage; drives multiple monitors and does compute work.
- **Sound card**: better audio than onboard, surround outputs, studio inputs.
- **Capture card**: records an HDMI or camera input for streaming and video work.
- **NIC**: a faster wired port (2.5 or 10 gigabit), a second port, fiber, or a Wi-Fi card with external antennas.
Installing a card: power off and unplug, ground yourself, remove the slot cover, seat the card straight down until the latch clicks, secure the bracket screw, attach any power cables, then install the driver. A card that is not detected is usually not fully seated or lacks its power connector.

## Cooling
Heat is the enemy of every component.
- **Case fans** pull cool air in at the front or bottom and push it out at the rear or top; keep the airflow direction consistent and the filters clean.
- The **CPU cooler** is a heat sink with a fan, or a tower with heat pipes, sitting on the CPU.
- **Thermal paste** (or a thermal pad) fills the microscopic gap between the CPU and the heat sink. Apply a small amount, spread thin; too much insulates. Replace it any time the cooler is removed or the paste has dried, which is a common cause of a formerly quiet PC now running hot.
- **Liquid cooling**: an all-in-one loop moves heat to a radiator with fans; better for high-power chips; pump failure shows as a sudden temperature climb.
- Laptops use thin heat pipes and small blowers; dust in the vents is the number one cause of laptop throttling.
Symptoms of poor cooling: fans roaring, throttled performance, random shutdowns, a hot case, and a burning smell from dust on a heat sink.

> Exam tip: x64 for more than 4 GB and 64-bit software; ARM needs ARM-built software. Cores are real, threads are logical. Reapply thermal paste when reseating a cooler. Intake front, exhaust rear. A GPU needs its PCIe power connector and enough PSU wattage.`,
      hook: "x86 32-bit (4 GB), x64 64-bit, ARM low-power RISC needs ARM software. Cores physical, threads logical (SMT); cache L1 to L3; clock GHz. LGA Intel; AMD AM4 PGA, AM5 LGA. Cards: video x16 with power, sound, capture, NIC; seat until the latch clicks, then driver. Intake front, exhaust rear; heat sink and fan; thin thermal paste, replace on reseat; liquid AIO; dust throttles."
    },
    {
      id: "u5l7", title: "Power Supplies: Input Voltage, Rails, Connectors, Wattage, Efficiency, Modular, and Redundant", domain: 3, obj: "3.6", minutes: 9,
      body: `The power supply turns wall AC into the DC voltages the board and drives use. Get the input right, size the output right, and know the connectors.

## Input
North America and Japan supply **110 to 120 V at 60 Hz**; most of the rest of the world supplies **220 to 240 V at 50 Hz**. Modern supplies are **auto-switching** across 100 to 240 V. Older supplies have a red **voltage selector** switch on the back; set to 115 V and plugged into 230 V, the supply is destroyed with a bang; set to 230 V on a 115 V outlet, the machine simply will not start. Check the selector before plugging in imported equipment.

## Output rails
The supply produces **3.3 V** (orange wires), **5 V** (red), and **12 V** (yellow), with black ground wires. The 12 V rail carries most of the load: CPU, graphics card, fans, and drive motors. 3.3 and 5 V feed logic and USB. A **power-good** signal tells the board the voltages are stable before it starts; a supply that is failing may drop rails under load and cause random reboots even though the machine boots fine at idle.

## Connectors
- **24-pin main** (a 20+4 split on older units) to the motherboard.
- **EPS 4-pin or 8-pin** (often 4+4) for the CPU.
- **PCIe 6-pin (75 W) and 8-pin (6+2, 150 W)** for graphics cards; **12VHPWR 16-pin** up to 600 W on the newest cards.
- **SATA power** 15-pin for drives, **Molex** 4-pin for older drives and fans, and sometimes a small floppy-style 4-pin connector.

## Wattage
Add up the components: a mid-range CPU 65 to 125 W, a graphics card 150 to 450 W, drives and fans a few watts each, and leave 20 to 30 percent headroom so the supply runs in its efficient range and can handle spikes. A high-end graphics card can demand more than the rest of the system combined; a supply that is too small produces crashes under gaming load, black screens, and restarts.

## Efficiency
The **80 Plus** ratings (Bronze, Silver, Gold, Platinum, Titanium) certify how much of the input becomes useful output; the rest is heat. A Gold unit is about 90 percent efficient at typical load. Higher efficiency means lower bills, less heat, and quieter fans.

## Modular and redundant
A **modular** supply lets you plug in only the cables you need, which improves airflow and tidiness; semi-modular keeps the main and CPU cables attached. **Redundant** supplies in servers are two hot-swappable units sharing the load; if one fails the other carries everything and an alarm sounds. Form factors: **ATX** for desktops and **SFX** for small cases; laptops use an external adapter with a specific voltage and wattage, and a weak adapter charges slowly or not at all.

## Testing and safety
A **PSU tester** plugs into the 24-pin and reports each rail and power-good; a **multimeter** checks a rail against ground. Never open a power supply; the capacitors hold a charge long after unplugging. A supply that clicks, smells burnt, or has bulging capacitors is replaced, not repaired.

> Exam tip: 115 versus 230 V and the selector switch. Rails 3.3, 5, and 12 V; 12 V does the heavy lifting. 24-pin main, 8-pin EPS, 6- and 8-pin PCIe. Size wattage for the GPU plus headroom. 80 Plus tiers for efficiency. Redundant supplies in servers; modular for cable management.`,
      hook: "110 to 120 V 60 Hz or 220 to 240 V 50 Hz; auto-switching or red selector. 3.3 V orange, 5 V red, 12 V yellow, ground black; 12 V feeds CPU, GPU, drives; power-good. 24-pin main, EPS 4/8, PCIe 6-pin 75 W and 8-pin 150 W, 12VHPWR 600 W, SATA 15-pin, Molex. Wattage: sum plus headroom. 80 Plus Bronze to Titanium. Modular cables; redundant in servers; ATX and SFX. PSU tester; never open."
    }
  ]
});

FRA.units.push({
  id: "u6", n: 6, title: "Printers", domain: 3,
  blurb: "Deploying and securing printers, the laser imaging process step by step, and the parts and maintenance of laser, inkjet, thermal, and impact printers.",
  assumes: "You know the port numbers for SMB and email (Unit 2).",
  lessons: [
    {
      id: "u6l1", title: "Printer Deployment and Configuration: Drivers, PCL Versus PostScript, Connectivity, Sharing, Settings, Security, and Scanning", domain: 3, obj: "3.7", minutes: 10,
      body: `Setting up a printer is a checklist the exam turns into scenario questions: which driver, which connection, which sharing method, which security feature. Know each choice and why.

## Unboxing and placement
Remove every piece of shipping tape, the orange locks on the cartridges and scanner, and the plastic strips on the toner. Place the printer on a level surface near power and the network, away from direct sunlight, heaters, and dusty or humid spots, with room to open the trays and doors. Load paper, install cartridges, power on, run the setup and alignment, print a test page, and **update the firmware** before anything else. Confirm the driver works with the operating system and the applications people use, then show users the basics. Use the consumables the manufacturer recommends; off-brand toner, ink, and paper can damage the printer and void its warranty.

## Drivers and page description languages
The driver translates the document into a language the printer understands.
- **PCL** (printer command language) is fast and efficient, and the output depends slightly on the printer; the everyday choice for offices.
- **PostScript** is a device-independent page description language that renders exactly the same on any PostScript printer; slower, but the standard for graphic design, publishing, and anything sent to a print shop.
A driver mismatch, such as a PostScript job sent through a PCL-only driver, prints pages of garbage characters. Install the driver for the exact model and the operating system's architecture (a 64-bit OS needs a 64-bit driver).

## Connectivity
- **USB**: one computer, a Type B or USB-C port on the printer; the simplest setup.
- **Ethernet**: the printer gets an IP address (give it a static one or a DHCP reservation) and everyone prints to it directly.
- **Wireless**: joins the Wi-Fi like any device; **Wi-Fi Direct** or ad hoc lets a phone print without a network; **Bluetooth** for small label and photo printers.
- Cloud printing sends jobs through a vendor's service from anywhere.

## Sharing
A printer plugged into one PC can be **shared** from that PC; it works only while the PC is on, and that PC handles the queue. A **print server** (a dedicated server role or a small appliance) hosts the queues and drivers centrally, pushes the right driver to each client, and logs usage; the professional choice for more than a few users. Network printers with their own IP can also be reached directly by each client with no server at all.

## Settings users ask about
- **Duplex**: printing on both sides, automatic with a duplexing unit.
- **Orientation**: portrait or landscape.
- **Tray selection** and paper size: the driver must match the paper loaded, or the printer waits or prints on the wrong stock.
- **Quality**: draft mode saves toner and time; best mode for photos.
- Collation, color versus grayscale, and default settings pushed by the server.

## Security
- **User authentication**: sign in at the panel or authenticate through the print server, so jobs are tied to people.
- **Badging**: tap a card to release jobs.
- **Audit logs**: who printed what, when, and how many pages.
- **Secured prints**: the job is held on the printer until the user enters a PIN or badges at the device, so confidential pages never sit in the output tray.
- Also: change the admin password, disable unused protocols, keep firmware current, and secure scan destinations.

## Scanning
Multifunction devices scan to **email** (needs SMTP server settings and often an account), to a **folder** on a file server over SMB (needs the share path and credentials), and to **cloud** storage. The **automatic document feeder** handles stacks of loose pages; the **flatbed** handles books, cards, and fragile originals. A scan-to-folder that suddenly fails after a password change is a stale credential on the printer.

> Exam tip: PCL fast and everyday, PostScript exact and device-independent. A printer that must always be found needs a static IP or reservation. Many users means a print server. Confidential output means secured prints with a PIN or badge. Scan to folder is SMB with credentials; scan to email needs SMTP settings.`,
      hook: "Unbox, remove tape and locks, place well, firmware first. PCL fast and everyday; PostScript device-independent and exact; wrong language prints garbage. USB one PC; Ethernet with static or reservation; wireless, Wi-Fi Direct, Bluetooth. Shared from a PC versus a print server with central queues and drivers. Duplex, orientation, tray, quality. Authentication, badging, audit logs, secured prints. Scan to email (SMTP), folder (SMB), cloud; ADF versus flatbed."
    },
    {
      id: "u6l2", title: "Laser Printers: The Seven-Step Imaging Process, Components, and Maintenance", domain: 3, obj: "3.8", minutes: 10,
      body: `The laser imaging process is a guaranteed question. Learn the seven steps in order, what each component does, and which symptom points to which part.

## The seven steps, in order
1. **Processing**: the printer's controller rasterizes the page into a bitmap in its memory. A complex page that fails or prints partially may exceed the printer's memory.
2. **Charging**: the primary charge roller (or a corona wire on older printers) applies a uniform negative charge of about minus 600 V across the surface of the photosensitive drum.
3. **Exposing**: the laser, steered by a rotating mirror, writes the image onto the drum, draining the charge wherever it strikes. The exposed areas now carry a weaker charge than the rest.
4. **Developing**: the developer roller carries negatively charged toner past the drum; toner is attracted to the exposed (less negative) areas and repelled by the unexposed background, forming the image in toner on the drum.
5. **Transferring**: the transfer roller (or corona) puts a positive charge on the paper as it passes under the drum, pulling the toner off the drum and onto the page. In a color printer, four drums lay their colors onto a transfer belt first, and the belt transfers the whole image to the paper.
6. **Fusing**: the fuser's heated roller (about 180 C) and pressure roller melt the toner into the paper fibers. Pages come out warm; the fuser is the hottest part of the printer and burns fingers.
7. **Cleaning**: a blade scrapes leftover toner off the drum into a waste reservoir, and an erase lamp removes any remaining charge, ready for the next page.
Memory hook: Please Charge Every Dog Treats For Cleaning.

## The components
- **Imaging drum**: light-sensitive cylinder; scratched or worn drums leave repeating marks or lines on every page.
- **Toner cartridge**: plastic powder with pigment; often includes the drum in one unit on small printers.
- **Fuser assembly**: heat and pressure rollers; a failed fuser leaves toner that smears off the page.
- **Transfer belt or roller**: moves the image to the paper; a worn one causes faded or uneven print.
- **Pickup rollers** and the **separation pad**: pull one sheet from the tray; when worn, the printer grabs nothing or grabs several sheets.
- **Duplexing assembly**: flips the page for two-sided printing.
- The **laser scanner**, the **high-voltage power supply**, and the **formatter** board complete the set.

## Maintenance
- Replace the **toner** when print fades and shaking the cartridge no longer helps.
- Apply the **maintenance kit** (fuser, transfer roller, pickup rollers, separation pads) at the page count in the printer's menu; the printer usually announces it.
- **Calibrate** after replacing consumables or when colors shift.
- **Clean** with a toner-rated vacuum and lint-free cloths. Never use compressed air, which blows toner into the room and the mechanism, and never a household vacuum, which lets the fine toner pass through and may ignite it from static.
- Handle the drum away from bright light and the fuser only when cool.

> Exam tip: processing, charging, exposing, developing, transferring, fusing, cleaning. Smearing toner is the fuser; repeating marks or lines are the drum; multiple sheets or no feed are the rollers and separation pad; ghosting is the cleaning step or a worn drum. Maintenance kit at the page count; toner vacuum only.`,
      hook: "Processing (bitmap), charging (minus 600 V on the drum), exposing (laser writes), developing (toner to exposed areas), transferring (positive charge pulls toner to paper; belt in color), fusing (heat about 180 C and pressure), cleaning (blade and lamp). Drum, toner, fuser, transfer belt or roller, pickup rollers, separation pad, duplexer. Toner, maintenance kit at page count, calibrate, clean with a toner vacuum."
    },
    {
      id: "u6l3", title: "Inkjet, Thermal, and Impact Printers: Components and Maintenance", domain: 3, obj: "3.8", minutes: 9,
      body: `Three other printer families show up in offices, shops, and warehouses. Each has a few parts and a few maintenance habits the exam checks.

## Inkjet
An inkjet sprays microscopic drops of liquid ink onto the paper from a **print head** (printhead) that sweeps across the page on a **carriage belt**. Ink comes in **cartridges**, either combined with the head (replaced together) or separate tanks feeding a fixed head; refillable tank models hold bottles of ink. Feed rollers move the paper; a duplexer flips it.
Traits: inexpensive to buy, excellent photo quality on the right paper, slow, and costly per page. Ink dries out if the printer sits unused, and a wet page smears until it dries.
Maintenance:
- Run the **head cleaning** cycle when lines are missing or colors streak; it purges dried ink through the nozzles. Repeated cycles use a lot of ink.
- **Align** or **calibrate** the heads after replacing cartridges or when text looks jagged and colors misregister.
- Replace **cartridges**; use the printer's sensor, but know that "low" often still prints.
- Clear **jams** by pulling paper in the direction of travel; check the **rollers** for wear and dust.
- Keep it in use: a page a week keeps the nozzles open.

## Thermal
A thermal printer has no ink or toner. A **heating element** (a row of tiny heaters in the print head) darkens special **heat-sensitive paper** as the **feed assembly** pulls it past. Receipts, shipping labels, and ticket printers use it. Traits: fast, quiet, cheap to run, no consumables except paper; the print fades with heat, sunlight, and time, and the paper must be the right kind.
Maintenance:
- Load the correct **paper** with the heat-sensitive side facing the element; loaded backward it prints nothing.
- Clean the **heating element** with isopropyl alcohol on a lint-free swab when print is faint or streaked.
- Remove **debris** (label adhesive, paper dust) from the feed path and platen roller.
- Keep spare paper away from heat; a roll left on a dashboard turns black.

## Impact
An impact (dot matrix) printer strikes an inked **ribbon** against the paper with pins in a **print head**, forming characters from dots. It is loud and slow, but it is the only printer that can print **multipart carbonless forms** (invoices, shipping manifests) in one pass because the impact goes through the copies. Paper is continuous-feed with sprocket holes on a **tractor feed**.
Maintenance:
- Replace the **ribbon** when print fades evenly.
- Replace the **print head** when specific dots are missing on every character (a broken pin).
- Load and align the **paper** on the tractor feed so it does not tear or skew.

## 3D printers
Not a paper printer, but on the objectives' periphery: **FDM** printers melt plastic **filament** through a nozzle onto a heated **print bed**, layer by layer; **resin** printers cure liquid resin with light. Care: level the bed, keep the nozzle clear, store filament dry.

> Exam tip: missing lines on an inkjet means clean the heads; misregistered color means align them. Thermal printers use heat on special paper and no ink; clean the element with alcohol; blank output means paper loaded backward. Impact printers use a ribbon and are the only choice for multipart forms; missing dots means the print head.`,
      hook: "Inkjet: print head on a carriage belt, cartridges, feed rollers, duplexer; clean heads (missing lines), align (misregistration), replace cartridges, clear jams, keep in use. Thermal: heating element, feed assembly, heat-sensitive paper, no ink; clean the element with isopropyl; paper side matters; fades with heat. Impact: pins, ribbon, tractor feed, multipart forms; ribbon for fade, head for missing dots. 3D: filament, bed, nozzle."
    }
  ]
});
