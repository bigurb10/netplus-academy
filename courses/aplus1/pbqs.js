// APlus Academy Core 1 performance-based questions. Original scenarios in the shape of the exam's PBQs:
// drag into order, match, pick every line that applies, fill a configuration, type a command.
// Graded task by task by engine/pbq.js; three carry seo: true for the public PBQ page.
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};

FRA.pbqs["ap1-cables-match"] = {
  id: "ap1-cables-match", title: "Match the connector to the job", domain: 3, lesson: "u4l2", seo: true,
  scenario: {
    text: "A help desk keeps a bin of cables and adapters for walk-up requests. Six requests come in on the same morning, and the technician must hand over the right connector for each one."
  },
  tasks: [
    { id: "jobs", kind: "match", prompt: "Match each request to the connector that does the job.", left: [
      "Send video and audio to a TV over one cable",
      "Carry data, power, and video over one small reversible connector",
      "Connect a SATA drive's data cable to the motherboard",
      "Charge an older iPhone",
      "Plug in an external drive at 10 Gb/s through a flat rectangular port on the PC",
      "Connect a monitor over a 20-pin video connector with a locking latch"
    ], right: [
      "HDMI",
      "USB-C",
      "SATA (7-pin data)",
      "Lightning",
      "USB-A (USB 3.1 Gen 2)",
      "DisplayPort",
      "VGA",
      "Molex"
    ], expect: [0, 1, 2, 3, 4, 5] },
    { id: "tb", kind: "choice", prompt: "A docking station needs a Thunderbolt 3 or 4 port on the laptop. Which connector does that port use?", options: ["USB-C", "Lightning", "USB-A", "HDMI"], expect: 0 },
    { id: "power", kind: "multiselect", prompt: "Pick every connector that can charge the phone or laptop plugged into it.", options: ["USB-C", "Lightning", "HDMI", "DisplayPort", "VGA"], expect: [0, 1] }
  ],
  why: {
    jobs: "HDMI is the 19-pin connector that carries digital video and audio to a TV, and DisplayPort is the 20-pin connector with the locking latch. USB-C is the reversible connector that can carry data, power, and video at once; Lightning is the 8-pin reversible connector on older iPhones; SATA data is the 7-pin cable; and the flat rectangle on the PC is Type A, which reaches 10 Gb/s at USB 3.1 Gen 2. VGA is analog video with no audio, and Molex is a 4-pin power connector, so neither fits any request.",
    tb: "Thunderbolt 3 and 4 run at 40 Gb/s over the USB-C connector, carrying PCIe, DisplayPort, and power. Lightning is a phone connector at USB 2.0 speed, USB-A is the older flat rectangle, and HDMI is a video connector.",
    power: "USB-C carries power along with data and video, which is why one cable can charge a laptop, and Lightning is the charging port on older iPhones. HDMI, DisplayPort, and VGA are video connectors; they carry a picture to a display, not charging power to a device."
  }
};

FRA.pbqs["ap1-build-form"] = {
  id: "ap1-build-form", title: "Spec the memory and storage", domain: 3, lesson: "u5l2", seo: false,
  scenario: {
    text: "A video editor's new desktop is being built on a board whose manual lists four memory slots for 288-pin modules at 1.1 V, keyed differently from the previous generation, and one slot for a card 22 mm wide, M-keyed and wired to PCIe x4 lanes, that accepts 2280 cards (80 mm long). The editor needs the fastest storage the board supports and 32 GB of memory in total."
  },
  tasks: [
    { id: "spec", kind: "form", prompt: "Fill in the parts order.", fields: [
      { id: "ramtype", label: "Memory generation", expect: ["DDR5"], normalize: "text" },
      { id: "ramform", label: "Memory module form factor", expect: ["DIMM"], normalize: "text" },
      { id: "iface", label: "Storage interface for the fastest drive", expect: ["NVMe", "PCIe", "PCIe NVMe", "NVMe over PCIe"], normalize: "text" },
      { id: "slot", label: "Slot (form factor) the drive goes in", expect: ["M.2"], normalize: "text" },
      { id: "total", label: "Total memory in GB", expect: ["32", "32 GB", "32GB"], normalize: "number" }
    ] },
    { id: "pair", kind: "choice", prompt: "Why order two 16 GB modules rather than one 32 GB module?", options: [
      "Two matched modules in the paired slots run in dual channel, doubling memory bandwidth",
      "A single 32 GB module cannot be addressed by a 64-bit operating system",
      "Two modules use less power than one",
      "The board will not boot with only one module installed"
    ], expect: 0 },
    { id: "nofit", kind: "multiselect", prompt: "Pick every part that will not work on this board.", options: ["A DDR4 DIMM", "A DDR5 SODIMM", "A DDR5 DIMM", "An M.2 2280 NVMe SSD"], expect: [0, 1] }
  ],
  why: {
    spec: "A 288-pin module at 1.1 V with its own key is DDR5, and a desktop board takes the long DIMM. A 22 mm card in an M-keyed slot wired to PCIe x4 is an M.2 drive using NVMe, which talks to the CPU over PCIe at thousands of MB/s, many times the roughly 550 MB/s a SATA SSD tops out at. M.2 is the slot and form factor; NVMe is the interface, so the two fields are not interchangeable. Either NVMe or PCIe is accepted for the interface: NVMe is the protocol and PCIe is the lanes it rides.",
    pair: "Two matched modules in the correct paired slots enable dual channel, which doubles bandwidth compared with a single module; a single module always runs single channel. A 64-bit OS addresses far more than 32 GB, the power difference is not the reason, and a board boots with one module.",
    nofit: "DDR4 and DDR5 are both 288-pin DIMMs but keyed differently, so a DDR4 module cannot be seated in a DDR5 slot. A SODIMM is the short laptop module and does not fit a desktop DIMM slot. A DDR5 DIMM and an M.2 2280 NVMe SSD are exactly what this board takes."
  }
};

FRA.pbqs["ap1-laser-order"] = {
  id: "ap1-laser-order", title: "Walk the laser printer's imaging process", domain: 3, lesson: "u6l2", seo: false,
  scenario: {
    text: "A clinic's monochrome laser printer is producing poor pages. Before swapping any parts, the technician walks the imaging process step by step to match each symptom to the step and the component behind it."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the seven imaging steps in order.", items: [
      "Processing: the controller rasterizes the page into a bitmap in memory",
      "Charging: the primary charge roller puts a uniform negative charge on the drum",
      "Exposing: the laser writes the image onto the drum, draining the charge where it strikes",
      "Developing: toner is attracted to the exposed areas of the drum",
      "Transferring: a positive charge on the paper pulls the toner off the drum",
      "Fusing: heat and pressure melt the toner into the paper",
      "Cleaning: a blade scrapes leftover toner off the drum and a lamp erases the charge"
    ], expect: [0, 1, 2, 3, 4, 5, 6] },
    { id: "smear", kind: "choice", prompt: "Pages come out with toner that smears off when touched. Which step, and which component, is failing?", options: [
      "Fusing: the fuser assembly",
      "Charging: the primary charge roller",
      "Cleaning: the cleaning blade",
      "Processing: the printer's memory"
    ], expect: 0 },
    { id: "faded", kind: "choice", prompt: "Print is faded evenly across the whole page. What is the likely cause?", options: [
      "Low toner, or a worn transfer roller",
      "A failing fuser",
      "A scratched imaging drum",
      "Worn pickup rollers"
    ], expect: 0 }
  ],
  why: {
    steps: "The order is processing, charging, exposing, developing, transferring, fusing, cleaning (Please Charge Every Dog Treats For Cleaning). The drum is charged before the laser can expose it, the toner develops onto the drum before it transfers to the paper, and fusing comes after transfer because only toner on the page can be melted into it.",
    smear: "Toner that wipes off was never melted into the paper, so the fusing step failed and the fuser assembly is the part to replace. A fault in charging or transferring changes what lands on the page, not whether fused toner stays put, a cleaning fault or worn drum shows as ghosting, and a memory problem fails or truncates a complex page.",
    faded: "Faded print points to the toner running low (replace it when shaking the cartridge no longer helps) or a worn transfer roller or belt that no longer pulls the full image onto the paper. A failing fuser leaves smearing toner, a scratched drum leaves repeating marks or lines, and worn pickup rollers cause feed problems, not faded print."
  }
};

FRA.pbqs["ap1-mobile-form"] = {
  id: "ap1-mobile-form", title: "Set up the manager's phone", domain: 1, lesson: "u1l4", seo: true,
  scenario: {
    text: "A clinic manager is getting a corporate-owned phone. Her mail must stay on the server so her phone, laptop, and tablet all show the same folders, and every connection to the mail server must be encrypted. The mail server accepts outgoing mail from clients only over TLS-encrypted submission. The company's MDM policy says a lost phone must not expose company data and must be erasable from the office."
  },
  tasks: [
    { id: "mail", kind: "form", prompt: "Fill in the mail account settings.", fields: [
      { id: "proto", label: "Incoming mail protocol", expect: ["IMAP", "IMAP4", "IMAPS"], normalize: "text" },
      { id: "inport", label: "Incoming port", expect: ["993"], normalize: "number" },
      { id: "outport", label: "Outgoing (SMTP) port", expect: ["587", "465"], normalize: "number" },
      { id: "enc", label: "Encryption", expect: ["TLS", "SSL/TLS", "TLS/SSL", "SSL", "STARTTLS"], normalize: "text" }
    ] },
    { id: "mdm", kind: "multiselect", prompt: "Pick every MDM setting that meets the policy.", options: [
      "Require a screen lock with a passcode or biometric",
      "Allow remote wipe",
      "Require device encryption",
      "Share the phone's location with every installed app"
    ], expect: [0, 1, 2] },
    { id: "byod", kind: "choice", prompt: "Next month a nurse joins the program with her personal phone under BYOD. If she leaves the company, what does the MDM wipe remove?", options: [
      "Only the managed work profile or container and its data",
      "The whole phone, including her photos and personal apps",
      "Nothing; MDM cannot wipe a personal phone",
      "Only the phone's SIM card"
    ], expect: 0 }
  ],
  why: {
    mail: "IMAP keeps mail on the server and syncs it to every device, which is what one set of folders on three devices needs; POP3 downloads mail to one device. The secure IMAP port is 993. Clients submit outgoing mail on 587 with TLS, and some servers instead take submission over implicit TLS on 465, so either is accepted; port 25 is for mail moving between servers and 143 is unencrypted IMAP. The encryption is TLS, which mail clients label SSL/TLS, or STARTTLS on port 587, where the session opens plain and upgrades to TLS before any mail moves.",
    mdm: "MDM policies enforce a passcode or biometric lock, device encryption, and remote lock and wipe, which together keep a lost phone's data unreadable and erasable. Sharing location with every app protects nothing and leaks more data; MDM locates the device itself without opening location to all apps.",
    byod: "On a BYOD phone MDM creates a separate managed work profile, and a selective wipe removes only that work container, leaving her photos and personal apps alone. A full wipe is for corporate-owned devices; MDM can wipe the work data, and the SIM holds the carrier identity, not company data."
  }
};

FRA.pbqs["ap1-cloud-match"] = {
  id: "ap1-cloud-match", title: "Pick the cloud model", domain: 4, lesson: "u7l3", seo: false,
  scenario: {
    text: "A regional clinic group is moving systems to the cloud. The IT lead has six descriptions from the planning meeting and needs each one labeled with its service model or deployment model."
  },
  tasks: [
    { id: "models", kind: "match", prompt: "Match each description to its model.", left: [
      "Rent virtual machines and install and patch the operating system yourself",
      "Use a hosted database and runtime platform and write only the application",
      "Use a subscription web application with nothing to install or patch",
      "Run on servers a provider shares among many customers",
      "Run on servers owned and operated by the clinic alone",
      "Keep sensitive systems in-house and send demand spikes to a provider"
    ], right: [
      "IaaS",
      "PaaS",
      "SaaS",
      "Public cloud",
      "Private cloud",
      "Hybrid cloud",
      "Community cloud"
    ], expect: [0, 1, 2, 3, 4, 5] },
    { id: "patch", kind: "choice", prompt: "In which service models does the provider patch the operating system?", options: [
      "PaaS and SaaS, but not IaaS",
      "IaaS only",
      "IaaS, PaaS, and SaaS",
      "SaaS only"
    ], expect: 0 },
    { id: "community", kind: "choice", prompt: "Several hospitals under the same regulations want to share one compliant platform. Which deployment model fits?", options: ["Community cloud", "Public cloud", "Private cloud", "Hybrid cloud"], expect: 0 }
  ],
  why: {
    models: "IaaS gives you virtual machines, storage, and networks and you manage the OS up; PaaS runs the OS and runtime so you bring only the code and data; SaaS is a finished application where you manage only data and users. Shared provider infrastructure is public, infrastructure dedicated to one organization is private, and the two connected so workloads can burst out is hybrid. Community cloud is shared by organizations with common requirements, which none of these six describes.",
    patch: "In PaaS the provider manages the hardware, OS, and runtime, and in SaaS it runs everything up to the application, so in both it patches the OS. IaaS hands you the virtual machine and you install and patch its operating system yourself.",
    community: "A community cloud is infrastructure shared by several organizations with common requirements, such as hospitals under the same regulations. Public cloud is shared with anyone, private is dedicated to one organization, and hybrid is private and public connected."
  }
};

FRA.pbqs["ap1-display-ms"] = {
  id: "ap1-display-ms", title: "The laptop screen is very dim", domain: 5, lesson: "u8l4", seo: false,
  scenario: {
    text: "A user reports that a laptop screen has gone almost black. The laptop boots, the fans run, and when the technician holds a flashlight to the screen at an angle, the desktop is faintly visible."
  },
  tasks: [
    { id: "causes", kind: "multiselect", prompt: "Pick every likely cause.", options: [
      "A failed backlight",
      "A failed inverter, on an older CCFL-lit panel",
      "A damaged display cable through the hinge",
      "A failed graphics processor",
      "A wrong resolution setting",
      "Dead pixels"
    ], expect: [0, 1, 2] },
    { id: "first", kind: "choice", prompt: "The flashlight test is done. What is the first, cheapest thing to check now?", options: [
      "The brightness keys and the power-saving settings",
      "Order a replacement panel",
      "Reinstall the graphics driver",
      "Replace the motherboard"
    ], expect: 0 },
    { id: "repair", kind: "order", prompt: "Put the repair steps in the order the technician works them, starting from the flashlight test already done.", items: [
      "Confirm with the flashlight that the image is there but unlit",
      "Check the brightness keys and power-saving settings",
      "Connect an external monitor to prove the graphics output works",
      "Reseat or replace the display cable",
      "Replace the backlight, inverter, or panel"
    ], expect: [0, 1, 2, 3, 4] }
  ],
  why: {
    causes: "Dim but visible under a flashlight means the panel is forming the image and only the light behind it is missing: the backlight, the inverter that powers a CCFL backlight on older panels, or the display cable in the hinge that feeds them. A failed GPU produces no image at all, a wrong resolution makes the picture fuzzy rather than dark, and dead pixels are individual dots that never change.",
    first: "Check the cheap things first: brightness turned down or a power-saving mode gives exactly this symptom and costs nothing to rule out. A new panel is the wrong part when the flashlight shows the panel works, and a driver or motherboard is not what darkens a visible image.",
    repair: "The flashlight test confirms the backlight path, the settings check rules out the free fix, and an external monitor proves the graphics output so the fault is the internal display path. Only then work on hardware, starting with the cable (especially if flexing the lid changes the picture) before the costlier backlight, inverter, or panel."
  }
};

FRA.pbqs["ap1-bios-form"] = {
  id: "ap1-bios-form", title: "Set the firmware for the new build", domain: 3, lesson: "u5l5", seo: false,
  scenario: {
    text: "A new UEFI workstation is ready for its operating system. The OS will be installed from a USB flash drive, it allows only signed boot loaders, it requires TPM 2.0, and its drive will be encrypted. The user will also run virtual machines on it."
  },
  tasks: [
    { id: "fw", kind: "form", prompt: "Fill in the firmware settings before the install.", fields: [
      { id: "secureboot", label: "Secure Boot", expect: ["Enabled", "Enable", "On"], normalize: "text" },
      { id: "tpm", label: "TPM", expect: ["Enabled", "Enable", "On"], normalize: "text" },
      { id: "bootdev", label: "First boot device for the install", expect: ["USB", "USB drive", "USB flash drive", "USB stick"], normalize: "text" },
      { id: "vt", label: "CPU virtualization (VT-x or AMD-V)", expect: ["Enabled", "Enable", "On"], normalize: "text" }
    ] },
    { id: "superpw", kind: "choice", prompt: "The technician sets a supervisor password in the firmware. What does it protect?", options: [
      "The firmware settings",
      "The user's sign-in to the operating system",
      "The encrypted drive's contents",
      "The boot of the machine, before any OS loads"
    ], expect: 0 },
    { id: "setup", kind: "multiselect", prompt: "Pick every task you do in firmware setup.", options: [
      "Change the boot order",
      "Enable CPU virtualization support",
      "Set a fan curve",
      "Install a printer driver",
      "Map a network drive"
    ], expect: [0, 1, 2] }
  ],
  why: {
    fw: "Secure Boot lets only signed boot loaders run, the TPM stores the encryption keys and is required as TPM 2.0, and VT-x or AMD-V must be enabled before a hypervisor will start; each is On or Enabled. The install media is the USB flash drive, so USB goes first in the boot order (or use the one-time boot menu), then back to the internal drive afterward.",
    superpw: "The supervisor (setup or BIOS) password locks the firmware settings. The user (boot) password is the one required before the machine boots at all, the OS sign-in is an operating system account, and drive contents are protected by encryption keyed through the TPM.",
    setup: "Firmware setup holds the boot order, virtualization support (VT-x or AMD-V), and fan curves and temperature thresholds. Printer drivers and mapped network drives are operating system tasks that firmware knows nothing about."
  }
};

FRA.pbqs["ap1-laptop-diagram"] = {
  id: "ap1-laptop-diagram", title: "Name the laptop's parts", domain: 1, lesson: "u1l1", seo: false,
  scenario: {
    text: "A technician removes the bottom cover of a laptop to upgrade its memory and drive. The drawing shows the underside with the cover off; the top edge is the hinge, where cables run up into the lid. Five parts are numbered.",
    svg: "<svg viewBox=\"0 0 420 220\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11\" fill=\"currentColor\">\n"
      + "<text x=\"166\" y=\"14\">Hinge (lid side)</text>\n"
      + "<rect x=\"20\" y=\"24\" width=\"380\" height=\"184\" rx=\"10\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<rect x=\"50\" y=\"48\" width=\"120\" height=\"24\" rx=\"2\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<circle cx=\"164\" cy=\"60\" r=\"3\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"110\" y1=\"72\" x2=\"110\" y2=\"79\" stroke=\"currentColor\"/>\n"
      + "<circle cx=\"110\" cy=\"88\" r=\"9\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"110\" y=\"92\" text-anchor=\"middle\">3</text>\n"
      + "<rect x=\"202\" y=\"46\" width=\"28\" height=\"30\" rx=\"2\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"210\" y1=\"46\" x2=\"210\" y2=\"24\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"222\" y1=\"46\" x2=\"222\" y2=\"24\" stroke=\"currentColor\" stroke-dasharray=\"3 2\"/>\n"
      + "<line x1=\"216\" y1=\"76\" x2=\"216\" y2=\"83\" stroke=\"currentColor\"/>\n"
      + "<circle cx=\"216\" cy=\"92\" r=\"9\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"216\" y=\"96\" text-anchor=\"middle\">4</text>\n"
      + "<rect x=\"270\" y=\"44\" width=\"110\" height=\"12\" rx=\"2\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<rect x=\"270\" y=\"62\" width=\"110\" height=\"12\" rx=\"2\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"325\" y1=\"74\" x2=\"325\" y2=\"83\" stroke=\"currentColor\"/>\n"
      + "<circle cx=\"325\" cy=\"92\" r=\"9\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"325\" y=\"96\" text-anchor=\"middle\">2</text>\n"
      + "<rect x=\"50\" y=\"120\" width=\"200\" height=\"70\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"100\" y1=\"120\" x2=\"100\" y2=\"190\" stroke=\"currentColor\" stroke-dasharray=\"3 3\"/>\n"
      + "<line x1=\"200\" y1=\"120\" x2=\"200\" y2=\"190\" stroke=\"currentColor\" stroke-dasharray=\"3 3\"/>\n"
      + "<circle cx=\"150\" cy=\"155\" r=\"9\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"150\" y=\"159\" text-anchor=\"middle\">1</text>\n"
      + "<circle cx=\"300\" cy=\"140\" r=\"12\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<line x1=\"312\" y1=\"140\" x2=\"331\" y2=\"140\" stroke=\"currentColor\"/>\n"
      + "<circle cx=\"340\" cy=\"140\" r=\"9\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"340\" y=\"144\" text-anchor=\"middle\">5</text>\n"
      + "</svg>"
  },
  tasks: [
    { id: "parts", kind: "match", prompt: "Match each numbered callout to the part.", left: [
      "Callout 1",
      "Callout 2",
      "Callout 3",
      "Callout 4",
      "Callout 5"
    ], right: [
      "Battery",
      "SODIMM memory",
      "M.2 SSD",
      "Wireless card",
      "CMOS battery",
      "Optical drive"
    ], expect: [0, 1, 2, 3, 4] },
    { id: "first", kind: "choice", prompt: "The laptop is shut down and the power adapter is unplugged. What do you disconnect before touching any of the numbered parts?", options: [
      "The battery",
      "The memory modules",
      "The wireless antenna leads",
      "The CMOS battery"
    ], expect: 0 },
    { id: "antenna", kind: "choice", prompt: "Two thin leads run from the hinge to one of the parts. Which part do the antenna leads snap onto?", options: ["The wireless card", "The M.2 SSD", "The SODIMM memory", "The CMOS battery"], expect: 0 }
  ],
  why: {
    parts: "The large pack is the lithium-ion battery (1), the two angled slots are SODIMM memory (2), the long 22 mm card at a standoff is the M.2 SSD, commonly 2280 (3), the small M.2 2230 card with two antenna leads is the wireless card (4), and the coin cell is the CMOS battery that keeps firmware settings (5). There is no optical drive in this drawing; thin laptops have dropped it.",
    first: "After shutting down and unplugging the adapter, remove the battery or disconnect its internal connector from the board, then hold the power button to drain any charge. The memory, antenna leads, and CMOS cell all come later, and touching them with the main battery connected risks shorting the board.",
    antenna: "The wireless card carries two tiny antenna leads, marked main and aux, that run through the hinge into the lid around the display, where the signal is best. The SSD, memory, and CMOS battery have no antenna connections; a lead left off the wireless card gives weak or no signal."
  }
};

FRA.pbqs["ap1-net-commands"] = {
  id: "ap1-net-commands", title: "Work the connectivity complaint", domain: 5, lesson: "u9l1", seo: true,
  scenario: {
    text: "A user on a Windows PC can open the file server by its address, {{10.0.1.20}}, but not by its name, {{fileserver}}, and no websites load. The technician works up the isolation ladder from the command prompt, using the public test addresses {{8.8.8.8}} and {{1.1.1.1}} to check the path to the internet."
  },
  tasks: [
    { id: "cfg", kind: "command", prompt: "Type the command that shows the adapter's full configuration, including its DNS servers and physical address.", expect: ["ipconfig /all"], alt: ["ipconfig -all"] },
    { id: "ping", kind: "command", prompt: "Type the command that tests whether the PC can reach one of the two public test addresses.", expect: ["ping 8.8.8.8"], alt: ["ping 1.1.1.1"] },
    { id: "trace", kind: "command", prompt: "Type the command that lists each router hop on the way to 8.8.8.8, so you can see where the path stops.", expect: ["tracert 8.8.8.8"], alt: ["traceroute 8.8.8.8"] },
    { id: "dns", kind: "command", prompt: "Type the command that queries the configured DNS server directly. Look up either the file server's name, fileserver, or the public name www.example.com.", expect: ["nslookup fileserver"], alt: ["nslookup www.example.com"] },
    { id: "cause", kind: "choice", prompt: "Pings by address succeed, but every lookup by name fails. Where is the fault?", options: ["DNS", "DHCP", "The default gateway", "The network cable"], expect: 0 }
  ],
  why: {
    cfg: "Ipconfig /all shows the full configuration: address, mask, gateway, DNS servers, DHCP status, and the physical (MAC) address; Windows accepts the switch as /all or -all. Plain ipconfig shows only the address, mask, and gateway, so it would hide the DNS server setting you need to check here.",
    ping: "Ping tests reachability; after the gateway, the next rung of the isolation ladder is a public IP address, and either test address serves. A reply proves the path to the internet works by address, so the problem is higher up; no reply puts it at the gateway or beyond.",
    trace: "Tracert lists each router hop with its round-trip time, so the last hop that answers shows where the path stops. Windows calls it tracert; Linux and macOS call the same tool traceroute, and either form is accepted here.",
    dns: "Nslookup asks the configured DNS server to resolve a name, testing name resolution apart from the browser and the network path; the file server's name and a public name are both fair tests. If it returns an address, DNS works; if it times out or fails, the DNS server setting or the server itself is the fault.",
    cause: "When addresses work and names fail, the path is fine and name resolution is broken: DNS. A DHCP failure would leave an APIPA address and nothing would work, a bad gateway would stop pings to public addresses, and a bad cable would stop everything."
  }
};

FRA.pbqs["ap1-virt-ms"] = {
  id: "ap1-virt-ms", title: "Get the workstation ready for virtual machines", domain: 4, lesson: "u7l2", seo: false,
  scenario: {
    text: "A developer's desktop workstation will run two virtual machines alongside its normal desktop operating system: a test server that coworkers must reach over the office network, and a client used for trying out risky updates."
  },
  tasks: [
    { id: "req", kind: "multiselect", prompt: "Pick every requirement for running the virtual machines.", options: [
      "A CPU with VT-x or AMD-V",
      "Virtualization support enabled in the firmware",
      "Enough RAM for the host plus every running guest",
      "Enough disk space for the virtual disk files",
      "A discrete graphics card",
      "A second network card",
      "A server edition of the host operating system"
    ], expect: [0, 1, 2, 3] },
    { id: "mode", kind: "choice", prompt: "Which network mode gives the test server its own address on the office LAN so coworkers can reach it?", options: ["Bridged", "NAT", "Host-only", "No network adapter"], expect: 0 },
    { id: "snap", kind: "choice", prompt: "What do you take in the client VM before installing a risky update, so you can go back if it breaks?", options: ["A snapshot", "A template", "A second virtual disk", "A guest tools update"], expect: 0 }
  ],
  why: {
    req: "The host's CPU needs VT-x or AMD-V and the extensions must be enabled in firmware; each guest needs as much RAM as that OS would need on real hardware with enough left for the host; and each VM's disk is a file on the host's storage. A discrete GPU, a second NIC, and a server OS are not required; every VM attaches its virtual NIC to a virtual switch on the host's one adapter.",
    mode: "Bridged networking puts the VM on the physical network like another computer on the switch, with its own address from the real DHCP server, so others can reach it. NAT hides the VM behind the host's address so others cannot start connections to it, and host-only allows no route outside at all.",
    snap: "A snapshot records the VM's disk and memory state at a moment, so you take one before patching and revert if the update breaks it. A template is for creating new VMs, and a snapshot is not a backup: it lives on the same storage and slows the VM as more accumulate."
  }
};
