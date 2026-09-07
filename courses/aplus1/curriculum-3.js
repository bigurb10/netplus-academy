// APlus Academy Core 1 curriculum, units 7 to 9. Original teaching content for CompTIA A+ 220-1201.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u7", n: 7, title: "Virtualization and Cloud", domain: 4,
  blurb: "Running many computers on one, and renting computers from someone else: hypervisors, virtual machines, containers, VDI, and the cloud models and characteristics the exam names.",
  assumes: "You know what a CPU, RAM, storage, and a network are.",
  lessons: [
    {
      id: "u7l1", title: "Virtualization: Purposes, Hypervisor Types, VDI, and Containers", domain: 4, obj: "4.1", minutes: 9,
      body: `Virtualization lets one physical computer run several independent operating systems at the same time. Core 1 asks why people do it, what the two kinds of hypervisor are, and how containers and virtual desktops differ from plain virtual machines.

## The vocabulary
- The **host** is the physical machine. A **guest** is a virtual machine (VM) running on it.
- The **hypervisor** is the software that creates and runs VMs, dividing the host's CPU, memory, storage, and network among them.
- Each VM has its own virtual hardware: virtual CPUs, a memory allocation, a virtual disk file, and a virtual NIC. To the guest OS it looks like a real computer.

## Why virtualize
- **Sandbox**: open a suspicious attachment or test a risky change inside a VM; if it goes wrong, delete the VM. The host is untouched.
- **Test development**: run Windows 10, Windows 11, three Linux versions, and a server on one workstation to test software; take a **snapshot** before a change and roll back in seconds.
- **Application virtualization**: run a **legacy** application that only works on an old OS inside a VM of that OS, or run another platform's software (**cross-platform** virtualization) such as a Windows program on a Mac.
- **Consolidation**: replace ten underused servers with one host running ten VMs; less power, space, and hardware, with easier backups and migration.
- **Training and labs**: a whole network of machines on one laptop.

## Type 1 and type 2 hypervisors
- A **type 1** (bare-metal) hypervisor installs directly on the hardware with no host operating system beneath it; the hypervisor is the OS. Used for servers and data centers; best performance and isolation; managed remotely from a console.
- A **type 2** (hosted) hypervisor is an application installed on a normal desktop OS. Used on workstations for testing and labs; easier to set up, with a performance cost because the host OS sits underneath.
Both require a CPU with virtualization extensions (Intel VT-x, AMD-V) turned on in firmware, and plenty of RAM.

## Virtual desktop infrastructure
**VDI** runs users' desktops as VMs on servers in the data center. Users connect from a thin client, an old PC, a tablet, or a browser, and see a full desktop that actually runs on the server. Benefits: central management, data never leaves the data center, any device works, quick provisioning. Costs: servers, storage, licensing, and dependence on the network; if the connection drops, the desktop is gone.

## Containers
A **container** packages an application with its libraries and settings but shares the host's operating system kernel instead of carrying a whole OS. Containers start in seconds, use a fraction of a VM's memory, and dozens can run where a few VMs would fit. They isolate applications, not entire operating systems, so every container on a host runs the same OS family. VMs isolate more strongly; containers pack more densely. Developers use containers to ship an application that runs identically on a laptop, a server, and the cloud.

> Exam tip: hypervisor on bare metal is type 1 (servers); hypervisor as an application on a desktop OS is type 2. A dangerous file goes in a sandbox VM. Desktops running on servers for thin clients is VDI. Shares the host kernel and starts fast is a container.`,
      hook: "Host, guest, hypervisor, virtual hardware. Purposes: sandbox, test and development with snapshots, legacy and cross-platform applications, consolidation. Type 1 bare metal (servers, best performance); type 2 on a host OS (desktops). Needs VT-x or AMD-V. VDI: desktops on servers, thin clients. Containers share the kernel, lightweight, application isolation."
    },
    {
      id: "u7l2", title: "Building a Virtual Machine: Requirements, Network Modes, Storage, Snapshots, and Security", domain: 4, obj: "4.1", minutes: 9,
      body: `Creating a VM is a checklist of resources and choices. The exam turns each choice into a question: how much RAM, which network mode, what about security.

## Resource requirements
Every guest takes a slice of the host, and the host needs some left for itself.
- **CPU**: assign virtual CPUs; the host's virtualization extensions must be enabled in firmware. Do not give every VM all the cores; they will fight.
- **Memory**: each VM needs as much RAM as that OS would need on real hardware, and the host needs its own. A host with 16 GB cannot comfortably run three 8 GB guests. Running out of host memory makes every VM crawl.
- **Storage**: each VM's disk is a file on the host. A dynamically expanding disk grows as the guest fills it; a fixed disk claims its full size up front and is faster. Fast host storage (an SSD) matters more than anything else for VM responsiveness.
- **Network**: at least one virtual NIC per VM, attached to a virtual switch.

## Network modes
- **Bridged**: the VM connects to the physical network as if it were another computer plugged into the switch; it gets its own address from the real DHCP server and is reachable by other machines. Use it for servers and anything others must reach.
- **NAT**: the VM sits behind the host, sharing the host's address; it can reach the internet but other machines cannot start connections to it. Safe default for test VMs.
- **Host-only** (internal): the VM can talk only to the host and to other VMs on the same internal network, with no route outside. Ideal for malware analysis and isolated labs.

## Installing the guest
Create the VM with the resources above, attach an installation ISO to the virtual optical drive, boot it, and install the OS exactly as on hardware. Then install the hypervisor's **guest tools** (integration additions) for better display, mouse, shared folders, and time sync. Assign a license: virtual machines need operating system licenses just like physical ones.

## Snapshots and templates
A **snapshot** records the VM's disk and memory state at a moment; you can return to it later. Take one before patching or testing; revert if it breaks. Snapshots are not backups: they live on the same storage and slow the VM as they accumulate, so delete or merge old ones. A **template** or clone is a prepared VM copied to create new ones quickly.

## Security
VMs need the same care as physical machines, plus a few of their own.
- Patch the guest OS and applications; an unpatched VM is an unpatched computer.
- Run antivirus in the guests; the host's protection does not see inside them.
- Guard the **host**: anyone who controls the hypervisor controls every VM and can copy their disk files. Restrict host access and encrypt VM files.
- **VM escape** is an attack where code in a guest breaks out to the host or other guests through a hypervisor flaw; keep the hypervisor patched.
- Isolate risky VMs with host-only networking; do not bridge a malware lab to the office network.
- Delete unused VMs; **VM sprawl** leaves forgotten, unpatched machines running.

> Exam tip: a VM that must be reachable by other computers uses bridged networking; internet only and hidden behind the host is NAT; completely isolated is host-only. Host RAM is the first thing that runs out. Snapshot before a change, and remember it is not a backup. VM escape is guest to host.`,
      hook: "Requirements: VT-x or AMD-V, RAM for each guest plus the host, disk files (dynamic or fixed) on fast storage, a virtual NIC. Bridged: own address on the real network; NAT: behind the host, internet only; host-only: isolated. Install from ISO, add guest tools, license it. Snapshot before changes, not a backup. Patch guests, protect the host, VM escape, host-only for malware labs, avoid sprawl."
    },
    {
      id: "u7l3", title: "Cloud Models: Public, Private, Hybrid, Community; IaaS, PaaS, SaaS", domain: 4, obj: "4.2", minutes: 9,
      body: `Cloud computing is renting computing over the network instead of buying it. The exam sorts it two ways: who owns and shares the cloud (deployment model), and how much of the stack the provider manages (service model).

## Deployment models: who owns it
- **Public cloud**: a provider owns huge data centers and rents slices to anyone; you pay for what you use and share the infrastructure with other customers. Fast to start, no hardware to buy, scales without limit.
- **Private cloud**: infrastructure dedicated to one organization, run in its own data center or hosted by a provider for it alone. Control, compliance, and predictable performance, at the cost of buying and running it.
- **Hybrid cloud**: private plus public, connected so workloads and data can move between them. Keep sensitive systems private and burst to the public cloud when demand spikes.
- **Community cloud**: infrastructure shared by several organizations with common requirements, such as hospitals under the same regulations or agencies of one government; cheaper than each building a private cloud, more controlled than public.

## Service models: how much you manage
Think of the stack from the bottom: hardware, virtualization, operating system, runtime and middleware, application, data.
- **IaaS** (infrastructure as a service): the provider gives you virtual machines, storage, and networks. You install and manage the operating system and everything above it. It is the cloud equivalent of renting servers. Example uses: hosting your own servers without owning hardware, disaster recovery sites.
- **PaaS** (platform as a service): the provider manages the hardware, OS, and runtime; you deploy your application code and data. Developers build and run apps without patching servers. Example uses: web application hosting, managed databases.
- **SaaS** (software as a service): the provider runs a finished application you use in a browser or a client; you manage only your data and user accounts. Examples: web email, office suites, CRM, video conferencing, file sync services.
The rule of thumb: IaaS you manage the OS up, PaaS you manage the app and data, SaaS you manage nothing but your data and users.

## Choosing a model
- A startup with no IT staff that needs email and documents: SaaS on a public cloud.
- A developer team that wants to deploy code without running servers: PaaS.
- A company moving its existing servers off aging hardware with minimal changes: IaaS.
- A bank that must keep data in its own facility but wants cloud flexibility: private, or hybrid for non-sensitive workloads.
- A regional group of clinics sharing a compliant platform: community cloud.

## What changes for the technician
Cloud resources are created and destroyed from a web console or an API in minutes, billing is by the hour or by use, and the network link to the provider becomes the most important cable in the building. Access is by account, so identity, passwords, and multifactor authentication become the front door.

> Exam tip: shared provider infrastructure is public; dedicated to one organization is private; both connected is hybrid; shared by organizations with common needs is community. VMs and storage you configure is IaaS; a platform to run your code is PaaS; a finished application is SaaS.`,
      hook: "Public: provider-owned, shared, pay as you go. Private: one organization, on premises or hosted. Hybrid: both linked, workloads move. Community: shared by similar organizations. IaaS: VMs, storage, networks; you manage the OS up. PaaS: platform and runtime; you manage code and data. SaaS: finished app; you manage data and users."
    },
    {
      id: "u7l4", title: "Cloud Characteristics: Shared Versus Dedicated, Metering, Elasticity, Availability, File Sync, and Multitenancy", domain: 4, obj: "4.2", minutes: 8,
      body: `Beyond the models, the exam names a set of characteristics that describe how cloud services behave and are billed. Each is a word to define and a scenario to recognize.

## Shared versus dedicated resources
In a **shared** (multitenant) arrangement, your VMs run on the same physical servers as other customers', separated by the hypervisor. It is cheaper and is the normal public cloud. **Dedicated** resources mean a physical host, or a whole rack, reserved for you alone: predictable performance, no noisy neighbors, and sometimes a compliance requirement, at a higher price.

## Multitenancy
**Multitenancy** is the design that lets one system serve many customers (tenants) while keeping their data separate. A SaaS email service runs one application for thousands of companies; each sees only its own mailboxes. The provider gains efficiency; the customer trusts the isolation.

## Metered utilization
Cloud is billed like a utility: you pay for what you consume, by the hour of compute, the gigabyte of storage, the number of requests, and the data transferred. **Ingress** (data coming into the cloud) is usually free; **egress** (data leaving to the internet or to another region) is billed per gigabyte. A backup restore or a data migration out of a cloud can cost more than the storage did. Watch the bill when a service is left running.

## Rapid elasticity
**Elasticity** means capacity grows and shrinks automatically with demand. A store's website adds servers for a holiday sale and drops them afterward, paying only for the hours used. Scaling **out** adds instances; scaling **up** makes one instance bigger. Elasticity is why a business can handle a spike without owning hardware for its busiest day.

## High availability
Providers spread services across multiple data centers (availability zones and regions) so a failure in one does not take the service down, and they publish uptime commitments in a service level agreement, such as 99.9 percent. Availability is engineered by redundancy: multiple servers behind load balancers, replicated storage, and automatic failover. Your own design still matters; a single VM in one zone is not highly available just because it is in the cloud.

## File synchronization
Cloud file services keep a folder identical on every device and in the cloud: change a file on the laptop and it appears on the phone. Traps: a **conflict** when two people edit the same file offline (the service keeps both copies), a deleted file disappearing everywhere (recover from the service's trash or version history), storage quotas, and large libraries syncing over metered connections. Sync is not a backup unless version history is kept; a ransomware-encrypted file syncs just as faithfully.

## Putting it together
A small firm moves to a cloud office suite: SaaS, public, multitenant, metered per user per month, highly available across the provider's regions, with file sync to every laptop. Its accounting system stays on a dedicated host in a private cloud for compliance, linked in a hybrid arrangement.

> Exam tip: pay for what you use is metered utilization, and egress costs money. Automatic growth and shrinkage is elasticity. Same files everywhere is file synchronization. One system serving many separated customers is multitenancy. Dedicated hosts cost more and buy isolation and predictable performance.`,
      hook: "Shared (multitenant) cheaper; dedicated for isolation and predictable performance. Multitenancy: one system, many separated customers. Metered: pay per hour, GB, request; ingress free, egress billed. Elasticity: automatic scale out and in. High availability: zones, regions, redundancy, SLA uptime. File sync: same files everywhere; conflicts, deletions propagate, not a backup without versions."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Troubleshooting Hardware", domain: 5,
  blurb: "The method the exam expects, the tools on the bench, and the symptom-to-cause pairs for motherboards, RAM, CPUs, power, drives, RAID, displays, projectors, and mobile devices, finished with complete worked cases.",
  assumes: "You know the parts of a PC, a laptop, and a phone (Units 1, 4, and 5).",
  lessons: [
    {
      id: "u8l1", title: "The Troubleshooting Method and the Technician's Toolkit", domain: 5, obj: "5.1", minutes: 9,
      body: `Troubleshooting is more than a quarter of the exam. Every troubleshooting question is framed by one method, and the right tool often decides the answer. Learn both cold.

## The six steps
1. **Identify the problem.** Gather information from the user and the device: what exactly happens, when it started, what changed (updates, new hardware, moved desks). Question the user without blaming. Check logs and error messages. **Back up** before you change anything, because the fix can make things worse.
2. **Establish a theory of probable cause.** Start with the obvious and simple: is it plugged in, is the monitor on the right input, is caps lock on. Consider several theories; research symptoms if needed. If the problem could be one of many things, order them by likelihood and ease of testing.
3. **Test the theory.** Try the simplest test that confirms or rules out the theory: swap a cable, try a known-good monitor, boot from another drive. If the theory fails, return to step 2 and pick the next one; if nothing works, escalate to someone with more knowledge.
4. **Establish a plan of action and implement the solution.** Decide the fix and its side effects (downtime, data risk, cost), get approval if needed, and apply it. Refer to vendor instructions for the specific change.
5. **Verify full system functionality and implement preventive measures.** Confirm the original problem is gone and that nothing else broke. Then prevent the recurrence: clean the vents, add a surge protector, schedule the maintenance kit, train the user.
6. **Document findings, actions, and outcomes.** Write the ticket so the next technician, or you in six months, can solve the same problem in five minutes.
The exam asks which step comes next, and always rewards the simplest test first.

## Reading a symptom question
The stems use qualifiers: **FIRST**, **NEXT**, **MOST likely**, **BEST**. FIRST wants the cheapest, quickest, least destructive check. MOST likely wants the common cause, not the exotic one. Never pick reinstalling the operating system or replacing the motherboard when a cable, a setting, or a driver could be the cause.

## The bench toolkit
- **Multimeter**: measures voltage, continuity, and resistance. Test a wall outlet, a PSU rail against ground, a fuse, or whether a cable is broken.
- **Power supply tester**: plugs into the 24-pin and other connectors and shows each rail and the power-good signal in seconds.
- **POST card**: a small card in a PCIe or USB slot that displays the firmware's progress codes when a board will not boot and shows nothing; the code says where it stopped (memory, video, keyboard).
- **Loopback plugs**: test NIC and serial ports without other equipment.
- **Known-good parts**: a spare PSU, RAM module, video card, cable, and monitor; swapping in a known-good part is the fastest way to confirm a theory.
- **ESD strap and mat**: prevent static damage while handling boards, RAM, and cards; ground yourself before touching components.
- **Screwdrivers and spudgers**, a flashlight, compressed air (for fans and vents, not toner), isopropyl alcohol and thermal paste, cable ties, and a label maker.
- **Software tools**: firmware diagnostics, a memory tester on a USB stick, drive health (S.M.A.R.T.) readers, temperature monitors, and the OS's own event logs.

> Exam tip: identify, theory, test, plan and implement, verify and prevent, document. Back up before changes; question the obvious; escalate when the theory fails. A dead board that shows nothing is what a POST card reads; PSU rails are what a PSU tester or multimeter reads.`,
      hook: "1 identify (gather, question, changes, back up); 2 theory (question the obvious); 3 test (simplest first; escalate); 4 plan and implement; 5 verify and prevent; 6 document. FIRST means cheapest check; MOST likely means common cause. Multimeter, PSU tester, POST card, loopback plugs, known-good parts, ESD strap."
    },
    {
      id: "u8l2", title: "Motherboard, RAM, CPU, and Power Symptoms", domain: 5, obj: "5.1", minutes: 11,
      body: `A machine that will not start, will not POST, or crashes at random points at one of four suspects: the board, the memory, the processor, or the power. Learn which symptom accuses which.

## No power at all
Nothing happens when the button is pressed: no fans, no lights.
- Check the outlet with a lamp or a multimeter, the power strip's switch, the cord at both ends, and the PSU's own rocker switch and voltage selector.
- Test the supply with a PSU tester or the paperclip test (short the green PS_ON pin to a black ground pin with the supply unplugged from the board; the fan should spin).
- Check the front panel power switch header; short the two power pins with a screwdriver to bypass a bad case button.
- A dead board is the last theory, after power and the switch are proven.

## Power but no POST
Fans spin, lights come on, but the screen stays blank or the machine beeps.
- **POST beeps**: patterns differ by firmware, but repeating beeps almost always mean memory, and a long-short pattern often means video. One short beep is usually success.
- Reseat the RAM; try one module at a time in the first slot. Reseat the video card and check its power connector. Remove everything not needed to boot (minimal configuration) and add parts back one at a time.
- A **POST card** shows where the firmware stopped.
- **Blank screen** with the machine apparently running: the monitor's input source, the cable, the card's seating and power, and, on a laptop, the display cable or a closed-lid setting.

## Random shutdowns, overheating, burning smell
- Random shutdowns or reboots under load point to **overheating** (check temperatures in firmware; look at fans, dust, thermal paste) or a **failing power supply** (rails sag under load). A burning smell is dust on a heat sink, a failing PSU, or a scorched component; power off and look.
- **Thermal throttling** shows as sluggish performance in a hot machine.
- **Capacitor swelling** or leaking on the board or in the PSU (domed tops, brown residue) means the component is failing; replace the board or supply.

## Crashes and instability
- **Proprietary crash screens** (the Windows blue screen, the macOS pinwheel or kernel panic) name a stop code or a driver. Recent driver or update changes come first, then run a memory test (bad RAM is a top cause of random blue screens), check drive health, and check temperatures.
- **Application crashes** in one program are that program or its dependencies; crashes across many programs are RAM, storage, overheating, or malware.
- **Sluggish performance**: not enough RAM (constant paging), thermal throttling, a failing or full drive, background processes, or malware. Check Task Manager for what is busy.

## Noises and small clues
- **Unusual noise**: a high whine is a fan bearing; clicking or grinding is a hard drive; a buzz that changes with load is coil whine, harmless but annoying.
- **Inaccurate date and time** on every boot: the CMOS battery.
- **Intermittent problems** that come and go with touch or temperature: a loose connector, a cracked solder joint, or a failing capacitor.

## A minimal configuration test
Board, CPU with its cooler, one RAM module, video (onboard or one card), and the power supply, outside the case on a non-conductive surface if needed. If it POSTs, add parts back one at a time until it fails; the last part added is the suspect. If it still fails, swap in known-good RAM, then a known-good PSU, then suspect the board or CPU.

> Exam tip: no power at all is outlet, cord, switch, PSU. Fans but no POST with beeps is RAM (reseat, one at a time). Random shutdowns are heat or the PSU. Blue screens with no recent changes get a memory test. Wrong date and time is the CMOS battery. Swollen capacitors mean replace the board or supply.`,
      hook: "No power: outlet, cord, PSU switch and selector, PSU test, front panel header. No POST: beeps mean RAM or video; reseat; one module; POST card; minimal configuration. Random shutdowns and burning smell: heat (fans, dust, paste) or PSU. Crash screens: drivers, memory test, drive, heat. Sluggish: RAM, throttling, drive, malware. Whine fan, click HDD. Wrong clock: CMOS battery. Swollen capacitors: replace."
    },
    {
      id: "u8l3", title: "Drive and RAID Symptoms", domain: 5, obj: "5.2", minutes: 10,
      body: `Storage failures are the ones that lose data, so the first move in nearly every drive question is the same: back up while you still can. Then match the symptom to the cause.

## Sounds and lights
- **Clicking, grinding, or repeated spin-up sounds** from a hard drive mean mechanical failure in progress. Back up immediately, then replace.
- **LED status indicators**: the drive activity light on the case blinks with normal access and stays solid during heavy use or a hang. On servers and NAS units, a bay light that turns amber or red means a degraded or failed member; a blinking pattern is documented by the vendor.

## Will not boot
- **Bootable device not found** (or "no operating system"): the boot order is pointing at the wrong device, a non-bootable USB stick was left in, a cable came loose, the drive died, the firmware mode changed (UEFI versus legacy), or the boot sector is corrupted. Check the boot order and the firmware's drive list first: if the drive is listed, the drive is alive and the boot record or mode is the problem; if it is missing, check cables and power, then the drive.
- **Missing drives in the OS** while the firmware sees them: the disk is not initialized or partitioned, a driver is missing (RAID or NVMe drivers during installation), or the port is disabled in firmware.

## Slow and failing
- **S.M.A.R.T. failure warning**: the drive's self-monitoring predicts failure. It is right often enough that the answer is always back up and replace.
- **Extended read and write times, low IOPS**: a failing drive retrying bad sectors, a fragmented hard drive, a nearly full SSD, a drive running in the wrong mode (IDE instead of AHCI), a bad cable, or a controller problem. Check the health report and the connection before blaming the OS.
- **Data loss or corruption**: a failing drive, a loose or damaged cable, sudden power loss during writes, or malware. Back up what can be read, run the file system check after the backup, and replace a drive that shows bad sectors.

## RAID symptoms
- **RAID failure** (a member failed) with an **audible alarm** and an amber LED: replace the failed drive and let the array rebuild. A degraded array is slow and unprotected; act promptly.
- **Array missing** (the OS suddenly sees separate disks or nothing): the controller lost its configuration, the controller failed, the controller driver was removed, or the card's battery died and the cache was lost. Do not initialize the disks; that destroys the data. Restore the controller configuration or replace the controller with the same model.
- **Missing drives** in a RAID: a drive dropped out from a cable, a backplane problem, or a failing drive; reseat and check the controller log.
- A rebuild that never finishes points to a second failing member or a bad replacement drive.

## SSD specifics
SSDs do not click; they fail by disappearing, by dropping to read-only, or by S.M.A.R.T. warnings on wear. They slow down when nearly full and when TRIM is not enabled. Keep 10 to 20 percent free.

## The order of operations
1. Back up any data that can still be read.
2. Check the simplest physical items: cables, power, boot order, a forgotten USB stick.
3. Read the drive's health (S.M.A.R.T.) and the firmware's drive list.
4. Test the drive on another cable, port, or machine.
5. Replace the drive, restore the data, and, on RAID, rebuild and confirm the array is optimal.

> Exam tip: clicking and S.M.A.R.T. warnings mean back up and replace. Bootable device not found starts with the boot order and any USB stick left in. An amber bay light and alarm is a failed RAID member: replace and rebuild. An array that vanishes is the controller, not the disks; never initialize them.`,
      hook: "Clicking or grinding: back up now, replace. Amber or red bay LED: degraded or failed. Bootable device not found: boot order, USB stick, cable, dead drive, boot record, firmware mode. S.M.A.R.T. warning: replace. Slow, low IOPS: failing drive, full SSD, fragmentation, wrong mode, cable. Data loss: drive, cable, power loss. RAID alarm: replace and rebuild. Array missing: controller; never initialize."
    },
    {
      id: "u8l4", title: "Video, Projector, and Display Symptoms", domain: 5, obj: "5.3", minutes: 10,
      body: `Display problems are the most common tickets and the easiest to solve if you check the cheap things first: the input, the cable, and the settings. Then the panel, the backlight, and the card.

## No image
- **Incorrect data source**: the monitor is on HDMI 2 while the cable is in HDMI 1, or the projector is on VGA. Press the input button. This is the first check on every "no image" call.
- **Cabling**: loose or damaged cables, bent VGA pins, a cable that does not support the resolution or refresh, an adapter that cannot convert analog to digital. Swap in a known-good cable.
- The computer side: the graphics card seated and powered, the laptop set to an external display mode (the function key that toggles displays), the monitor's power and standby state.

## Dim, dark, or flickering
- **Dim image**: brightness turned down, power-saving mode, or a failing backlight or inverter. Shine a flashlight on the screen; a faintly visible image confirms the backlight.
- **Flashing or flickering screen**: a loose or damaged cable, an unsupported refresh rate, a driver problem, or a failing panel or inverter. On laptops, flicker that changes when the lid moves is the display cable in the hinge.
- **Intermittent projector shutdown**: overheating from a clogged air filter or blocked vents, or a lamp nearing the end of its life. Clean the filter, give it airflow, check the lamp hour counter.
- **Burnt-out bulb**: a projector that powers on but shows no image and flashes a lamp warning has reached the end of the lamp's rated hours. Replace the lamp and reset the counter.

## Wrong-looking image
- **Fuzzy image**: a non-native resolution on an LCD, VGA over a long cable, wrong scaling, or a projector out of focus or too far for its zoom. Set the native resolution first.
- **Display burn-in**: a ghost of a static image on an OLED or plasma screen; permanent. Prevent with pixel shift, screen savers, and hiding static bars.
- **Dead pixels**: black or stuck-color dots that never change. A manufacturing defect; check the vendor's dead pixel policy. Stuck pixels sometimes recover with a pixel-cycling tool; dead ones do not.
- **Incorrect color display**: a damaged cable or bent VGA pins (one color missing), a wrong color profile or night mode, a driver, or a failing panel. Swap the cable, then check settings.
- **Distorted image or geometry**: wrong aspect ratio setting, an unsupported resolution, a damaged cable, or, on projectors, keystone correction needed because the projector is not square to the screen.
- **Sizing issues**: overscan on a TV used as a monitor, wrong aspect ratio, or the OS scaling setting.
- **Physical cabling issues**: strain on the connector, a cable pinched by the desk, an adapter dangling from a port.

## Audio
- **Audio issues over HDMI or DisplayPort**: the OS is sending sound to the wrong output. Select the monitor or TV as the playback device; check that the cable and adapter carry audio (DVI and VGA do not) and that the monitor's speakers are on.

## Multiple monitors
A second monitor that is not detected: check the cable and input, then the OS display settings (detect, extend versus duplicate), then whether the card or dock supports that many outputs at that resolution.

> Exam tip: the first check for no image is the input source, then the cable. Dim but visible with a flashlight is the backlight or inverter. Fuzzy is non-native resolution. A projector that shuts off after a while is overheating; a lamp warning is the bulb. Sound through HDMI needs the display selected as the output device. Burn-in is OLED and permanent.`,
      hook: "No image: input source, cable, card seating and power, laptop display toggle. Dim: brightness, power saving, backlight or inverter (flashlight test). Flicker: cable, refresh, driver, panel, hinge cable. Projector shutdown: filter and heat; lamp warning: replace the bulb. Fuzzy: native resolution, VGA length, focus. Burn-in permanent; dead pixels are defects. Color: cable, pins, profile. Audio over HDMI: select the output device."
    },
    {
      id: "u8l5", title: "Mobile Device Symptoms", domain: 5, obj: "5.4", minutes: 10,
      body: `Phones, tablets, and laptops fail in their own ways: batteries age, screens crack, ports fill with lint, and radios get switched off. Match each symptom to its first check and its fix.

## Power and battery
- **Poor battery health**: the battery's capacity has dropped (check the health percentage in settings); the fix is a replacement. Short battery life on a healthy battery is screen brightness, background apps, location, and radios; adjust them.
- **Improper charging**: a frayed cable, an underpowered adapter, a dirty or damaged port, or a charger that does not support the device's fast-charge standard. Try a known-good cable and adapter, clean the port with a wooden pick, and check for a bent port. A phone that charges only at certain angles has a damaged port.
- **Swollen battery**: the case bulges, the screen lifts, or the back cover separates. Stop using the device, do not press or puncture, do not charge, and replace the battery through a proper repair channel; recycle the old one.
- **Overheating**: charging while running demanding apps, direct sun, a case that traps heat, malware or a runaway app, or a failing battery. Cool it, close apps, remove the case, update, and check for malware.

## Physical damage
- **Broken screen**: a cracked cover glass may still work; a cracked digitizer misses touches; a cracked panel shows lines or black areas. Replace the assembly.
- **Damaged ports**: charging and headphone ports collect lint and corrode. Clean carefully; a bent or corroded port is a board-level or assembly repair.
- **Liquid damage**: power off immediately, do not charge, remove the SIM and case, dry thoroughly for days (rice does not help; airflow does). Liquid contact indicators inside show exposure and void warranties. Corrosion may cause failures weeks later.

## Touch, pen, and input
- **Digitizer issues** and **cursor drift** (touches registered in the wrong place, phantom touches): a cracked digitizer, moisture, a poor screen protector, a charger with noisy power (phantom touches while charging), or a stuck calibration. Remove the protector, dry the device, try another charger, and calibrate if the device offers it.
- **Touch calibration**: available on resistive screens and some laptops; capacitive phones rarely need it.
- **Stylus does not work**: an active pen needs a battery or charge and may need pairing; it must be the right model for the device; the digitizer may be damaged.

## Connectivity and performance
- **Poor or no connectivity**: airplane mode, Wi-Fi or cellular toggled off, out of range, a stale saved network (forget and rejoin), an unseated SIM, expired carrier settings, or a VPN or proxy left on. Toggle airplane mode on and off as a first reset.
- **Cannot install apps**: storage full, OS version too old for the app, account or payment problems, or MDM restrictions blocking the store.
- **Malware**: pop-ups, unexpected charges, apps the user did not install, and battery and data drain. Remove unknown apps, revoke unusual permissions, update, and as a last resort back up and factory reset. Apps from unofficial sources are the usual entry point.
- **Degraded performance**: storage nearly full, too many background apps, an old OS, a failing battery that throttles the CPU, or malware. Free space, update, restart, and check battery health.

## Laptop-specific
A laptop with a black screen but running fans: the display toggle, the lid switch, an external monitor test to prove the GPU works, then the display cable and panel. Keys that stop working after a spill: the keyboard. A trackpad that jumps: moisture, a palm-rejection setting, or the swollen battery beneath it.

> Exam tip: a bulging phone or lifting screen is a swollen battery; stop, do not charge, replace. Liquid damage: power off, do not charge, dry. Phantom touches while charging point to the charger. Nothing connects means airplane mode first. Cannot install apps is usually storage, OS version, or MDM. Poor battery health means replace the battery.`,
      hook: "Battery health low: replace. Improper charging: cable, adapter, dirty or bent port. Swollen: stop, do not charge or puncture, replace. Overheating: apps, sun, charging, malware, battery. Broken screen: glass, digitizer, or panel. Liquid: off, no charging, dry, indicators. Drift and phantom touches: digitizer, moisture, protector, noisy charger. Stylus: battery, pairing, model. No connectivity: airplane mode, toggles, SIM, forget and rejoin. Cannot install apps: storage, OS, MDM. Malware: unknown apps, reset last."
    },
    {
      id: "u8l6", title: "Worked Hardware Cases: From Symptom to Fix, Five Complete Walkthroughs", domain: 5, obj: "5.1", minutes: 11,
      body: `The exam's troubleshooting items describe a situation and ask for the most likely cause, the first step, or the best fix. These five cases show the reasoning end to end, using the six-step method.

## Case 1: the PC that restarts during games
A user's desktop works fine for email but restarts a few minutes into any game. They recently installed a new graphics card.
- Identify: the change is the card; the trigger is heavy load. Ask whether the card's power connectors were attached and what supply is installed.
- Theory: the power supply cannot sustain the load (most likely, given the change), or the card overheats.
- Test: check temperatures during a game; check the supply's wattage against the card's requirement; watch the 12 V rail with a tester under load.
- Fix: replace the 450 W supply with one sized for the new card plus headroom. Verify with an hour of gaming. Document.
A wrong answer here would be reinstalling the OS; the symptom is tied to load and a hardware change.

## Case 2: the laptop that shows nothing
A laptop powers on, the fan spins, the keyboard lights up, but the screen stays black.
- Identify: no image, but the machine is alive. Ask whether it was dropped or the lid is often opened by one corner.
- Theory: display or display cable, backlight, or the GPU.
- Test: shine a flashlight at the screen; a faint desktop means the backlight. Connect an external monitor; an image there means the GPU works and the fault is the internal display path. Press the display toggle key in case it is set to external only.
- Fix: replace the display cable if flexing the lid changes the picture, the panel or backlight otherwise. Verify at several lid angles. Document.

## Case 3: the workstation with random blue screens
A workstation crashes to a blue screen once or twice a day with different stop codes each time. No recent changes.
- Identify: random, varied codes, no trigger. Note the codes; check the event log for the hours before each crash.
- Theory: varied codes with no change points to hardware: memory first, then storage, then overheating.
- Test: run a memory test from a bootable stick overnight; check S.M.A.R.T.; check temperatures.
- Fix: the memory test reports errors on one module; remove it, run the machine for two days, then install a replacement. Verify: no crashes. Document the module and the test result.

## Case 4: the server with a beeping RAID
A small server sounds a steady alarm; one drive bay light is amber; users say the file server is slow but working.
- Identify: the array is degraded; a member failed. Confirm in the controller's management utility which drive and which array level (RAID 5).
- Theory: one failed drive; the array is running on parity.
- Test: the utility confirms it. Also confirm last night's backup succeeded, because the array has no protection until the rebuild finishes.
- Fix: replace the failed drive with a same-size or larger drive of the same type; the rebuild starts (or assign the hot spare). Monitor until the array reports optimal. Prevent: order a spare to keep on the shelf and enable alert emails from the controller. Document.

## Case 5: the phone that will not charge
A user's phone charges only when the cable is held at an angle, and sometimes not at all.
- Identify: the symptom tracks the cable's position, which is a physical port or cable problem, not software.
- Theory: a damaged cable, a lint-packed port, or a bent port.
- Test: try a known-good cable and adapter; look in the port with a light.
- Fix: the port is packed with lint. Power off and clean it with a wooden or plastic pick, never metal. Charging returns to normal. Prevent: advise a case with a port cover. Document.
If the port had been bent or corroded, the fix would be a port or assembly replacement, and if the battery health had been poor, a battery.

## The pattern
In every case the sequence is: what changed, what is the simplest theory, what is the cheapest test, then the fix, the verification, and a preventive step. On the exam, the answer that follows this sequence is the right one, and the answer that jumps to a drastic action is the wrong one.

> Exam tip: restarts under load after a hardware change is the power supply. Black screen but alive: flashlight and external monitor. Random varied blue screens with no changes: memory test. Alarm and amber light: replace the member and rebuild after checking the backup. Charging at an angle: the port or the cable.`,
      hook: "Restart under load after a new GPU: undersized PSU. Laptop black screen, fans on: flashlight (backlight), external monitor (GPU works), display cable or panel. Random varied blue screens, no changes: memory test. RAID alarm, amber bay: confirm backup, replace drive, rebuild, add hot spare and alerts. Charges at an angle: clean the port, then cable, then port repair. Change, simplest theory, cheapest test, fix, verify, prevent, document."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Troubleshooting Networks and Printers", domain: 5,
  blurb: "Wired and wireless network symptoms from slow speeds to port flapping, and printer symptoms from streaks and ghosting to jams, stuck queues, and finisher faults.",
  assumes: "You know the network fundamentals (Units 2 and 3) and the printer types (Unit 6).",
  lessons: [
    {
      id: "u9l1", title: "Network Symptoms: Wireless, Speed, Limited Connectivity, Latency and Jitter, Port Flapping, Interference, and Authentication", domain: 5, obj: "5.5", minutes: 11,
      body: `Network complaints are vague ("the internet is slow") until you sort them into symptoms. Each symptom has a short list of causes and a first check.

## Nothing or limited
- **Limited connectivity** or **no connectivity** with an **APIPA address** (169.254.x.x): the device asked DHCP and got nothing. Check the link light and cable, the switch port and its VLAN, and the DHCP server or its scope (a scope with no free addresses hands out nothing). On Wi-Fi, the client may be associated but blocked by a captive portal or a MAC filter.
- Link light off: the cable, the port, the NIC, or a disabled adapter. Try a known-good cable and port.
- Address is fine but nothing loads: the default gateway, DNS, or a proxy setting. Ping the gateway, then a public address, then a name, to find the layer that fails.

## Slow
- **Slow network speeds**: congestion (a backup or a video stream hogging the link), a **duplex or speed mismatch** on a port (one side full duplex, the other half, which shows as collisions and slowness), a bad or wrong-category cable (Cat 5 on a gigabit link falls back to 100 Mb/s), a failing NIC, a hub in the path, or a saturated ISP connection. Check the negotiated speed on the NIC first.
- On wireless: distance, a congested channel, an old client dragging the network to a slower standard, or 2.4 GHz where 5 GHz is available.

## Intermittent
- **Intermittent wireless connectivity**: weak signal at the edge of range, interference, channel overlap with neighbors, roaming between access points with different settings, a driver that sleeps the adapter to save power, or an overloaded access point. A Wi-Fi analyzer shows signal and channel conditions; move closer, change the channel, or add an access point.
- **Intermittent internet** while the LAN works: the ISP, the modem (check its lights and logs), a router overheating or crashing under load, or DNS. Connect a laptop directly to the modem to isolate the ISP from the router.
- **Port flapping**: a switch port's link goes up and down repeatedly. Causes are a damaged cable or connector, a failing NIC or SFP, a speed or duplex mismatch, a bad switch port, or a loop. Replace the cable first, then move to another port, then suspect the NIC.

## Latency, jitter, and voice quality
- **High latency**: long round-trip times; congestion, a slow or distant link, satellite connections, or a saturated uplink. Ping shows it.
- **Jitter**: variation in latency between packets; it ruins voice and video, which need steady arrival. Congestion and Wi-Fi are the usual sources.
- **Poor VoIP quality** (choppy, robotic, dropped calls): jitter, latency above roughly 150 ms, packet loss, phones on Wi-Fi or on a congested link, or no **QoS**. Put phones on a wired voice VLAN with QoS prioritizing voice, and check the internet uplink.

## Interference
- **External interference** on 2.4 GHz: microwave ovens, cordless phones, Bluetooth, baby monitors, and neighbors' networks. On wired links: motors, fluorescent ballasts, and power cables running alongside unshielded cable. Fixes: move to 5 GHz, change channels, relocate the access point, use shielded cable, reroute cables away from power.

## Authentication failures
- Wrong password or pre-shared key, an expired or untrusted certificate on an enterprise network, the RADIUS server down, a MAC filter blocking the device, an account locked or expired, or **time skew** between the client and the authentication server (certificates and Kerberos tickets fail when clocks differ by more than a few minutes). Check the credentials and the clock first, then the server.

## The isolation ladder
1. Physical: link light, cable, port.
2. Address: is it APIPA, static, or DHCP; is the mask and gateway right.
3. Local: ping the gateway.
4. Beyond: ping a public IP, then resolve a name.
5. Application: the specific service and its port.
Each rung that passes moves the fault higher.

> Exam tip: APIPA means no DHCP. Slow on a wired port means check the negotiated speed and duplex and the cable category. Up-and-down link is port flapping: replace the cable first. Choppy voice is jitter and needs QoS and a wired voice VLAN. Authentication that fails for everyone is the server or the clock; for one person, credentials.`,
      hook: "APIPA: no DHCP (cable, VLAN, server, scope). Slow: congestion, duplex or speed mismatch, cable category, hub; wireless distance and channel. Intermittent wireless: signal, interference, channel overlap, roaming, power saving. Intermittent internet: ISP, modem, router heat, DNS; test at the modem. Port flapping: cable first, then port, then NIC. Latency, jitter, VoIP: congestion, Wi-Fi, no QoS. Interference: 2.4 GHz sources, motors, ballasts. Authentication: key, certificate, RADIUS, MAC filter, time skew."
    },
    {
      id: "u9l2", title: "Printer Output Problems: Lines, Faded, Speckling, Ghosting, Garbled, Fusing, Color, and Orientation", domain: 5, obj: "5.6", minutes: 10,
      body: `A printed page is a diagnostic report. Each defect points to a part or a setting. Learn the pairs and the exam's printer questions become quick.

## Marks in the wrong places
- **Lines down the page**: on a laser, a scratched or dirty drum (a thin vertical line), a dirty laser scanner window or a low toner cartridge with a clumped section, or a scratch on the fuser roller (a line that also smears). On an inkjet, a clogged nozzle gives a missing line; a dirty head gives an extra streak. Run the cleaning cycle on inkjets; replace the drum or cartridge on lasers.
- **Speckling on printed pages**: loose toner inside the printer or a leaking cartridge dusting each page; clean the paper path with a toner vacuum and replace a leaking cartridge. On inkjets, ink splatter from a dirty head or wrong paper.
- **Double or echo images (ghosting)**: a faint copy of a previous image lower on the page. The drum is not being cleaned or discharged: a worn cleaning blade, a dead erase lamp, or a worn drum; replace the drum unit. A fuser can also ghost when its roller is contaminated.
- **Toner not fusing to the paper** (smears when touched, flakes off): the fuser is not reaching temperature or has failed, the paper type setting is wrong for heavy or glossy stock, or the wrong paper is loaded. Check the paper setting, then replace the fuser or the maintenance kit.

## Too light or wrong color
- **Faded prints**: low toner or ink (shake the cartridge for a few more pages, then replace), economy or draft mode enabled, a worn transfer roller, low humidity affecting toner transfer, or damp paper. Check the toner level and the driver's quality setting first.
- **Incorrect color settings**: colors wrong or absent: a depleted color cartridge, a driver set to grayscale, a color profile or calibration issue, or a clogged head on an inkjet. Run calibration after replacing color consumables.
- **Incorrect chroma display** (colors dull or shifted from what the screen shows): the printer and the monitor use different color spaces; calibrate both and use the right paper profile.

## Unreadable output
- **Garbled print** (pages of random characters, symbols, or a single line of code): the wrong driver or language (PostScript data sent to a PCL printer or vice versa), a corrupted print job, a bad or too-long cable, a faulty NIC on the printer, or insufficient printer memory for a complex page. Cancel the job, reinstall the correct driver, and try a simpler page.
- **Blank pages**: a sealed new toner cartridge with the tape still on, an empty cartridge, a failed laser or transfer, or a print head that is fully dried.

## Layout wrong
- **Incorrect page orientation** or size: the application or driver setting (portrait versus landscape), the paper size in the driver not matching the tray, or the tray's guides and size setting wrong. Check the driver defaults pushed by the server.
- Print on the wrong side or upside down on duplex jobs: the duplex setting (long-edge versus short-edge binding).

## The systematic check
1. Print the printer's internal test page from its panel. If the test page is clean, the fault is the driver, the job, or the connection, not the engine. If the test page shows the defect, the fault is inside the printer.
2. For engine faults, match the defect to the part in the tables above and check the consumable levels and the maintenance counter.
3. For driver faults, reinstall the correct driver and check the defaults.

> Exam tip: smears when touched is the fuser. Repeating ghost is the drum or cleaning. Vertical line is the drum. Speckling is loose toner. Faded is low toner, draft mode, or the transfer roller. Garbage characters is the wrong driver or language. Wrong orientation is a driver or application setting. An internal test page separates the engine from the driver.`,
      hook: "Lines: drum scratch, dirty scanner window, fuser scratch; inkjet clogged nozzle. Speckling: loose toner, leaking cartridge. Ghosting: cleaning blade, erase lamp, worn drum. Not fused: fuser or paper type setting. Faded: toner, draft mode, transfer roller, humidity. Color wrong: cartridge, grayscale setting, calibration. Garbled: wrong driver or language, cable, memory. Orientation: driver or app setting; tray size. Test page isolates engine from driver."
    },
    {
      id: "u9l3", title: "Printer Feed, Queue, Connectivity, and Finishing Problems", domain: 5, obj: "5.6", minutes: 10,
      body: `The other half of printer trouble is mechanical and logistical: paper that will not move, jobs that will not leave the computer, printers that vanish from the network, and finishers that jam. Each has a standard first move.

## Paper handling
- **Paper jams**: the most common call. Causes are worn pickup rollers, a worn separation pad, damp or curled paper, the wrong paper weight, an overfilled tray, guides set wrong, debris or a torn scrap in the path, or a failing duplexer. Clear the jam by opening the doors and pulling the sheet slowly in the direction of travel, check for torn pieces, fan and reload the paper, and inspect the rollers. Repeated jams in the same spot point to a worn part there.
- **Multipage misfeed** (several sheets at once): the separation pad is worn, the paper is stuck together from humidity or static, or the tray is overfilled. Replace the pad and rollers (the maintenance kit), fan the paper, and store it dry.
- **Paper not feeding**: glazed or dirty pickup rollers (clean with isopropyl or replace), an empty or misseated tray, the wrong paper size setting, or a sensor flag stuck. A printer that grabs nothing while the motor runs is rollers.
- **Paper tray not recognized**: the tray is not fully seated, its size dial or sensor is not set, a connector to the optional tray is loose, or the firmware does not know about the new tray; reseat, set the size, and update the firmware or the driver's installed-options setting.
- **Grinding noise**: a gear, a roller, the drum drive, or a foreign object; a laser at the end of its maintenance interval grinds as rollers wear. Locate the source with the doors open, remove any object, and replace the worn assembly.

## The queue
- **Multiple prints pending in the queue** and nothing printing, or a **frozen queue**: a stuck job at the head of the line, the spooler service hung, the printer offline or paused, or a driver fault. On the client or the print server: cancel the stuck job; if it will not clear, restart the print spooler service (stop it, delete the files in the spool folder, start it). Check the printer's panel for an error or a paused state, and confirm it is online and reachable.
- Jobs print for some users and not others: permissions on the shared queue, or a driver mismatch between server and client.
- A job that prints hours later or twice: a job stuck in the queue that finally cleared, or the user resending; clear the queue and educate.

## Connectivity
- **Connectivity issues** ("printer offline," "cannot find printer"): the printer's IP address changed because it uses DHCP without a reservation (the fix is a reservation or a static address), the printer is asleep and not responding to discovery, the Wi-Fi password changed, the cable or switch port failed, or a firewall blocks the printing ports. Print the printer's configuration page to see its current address and compare it with the port configured on the clients.
- A USB printer that disappears: the cable, the port, or a driver; try another port and cable.
- Wireless printers that drop off: weak signal, a router reboot handing out new addresses, or band steering moving the printer; give it a reservation and a strong signal.

## Finishing
- **Finishing issues**: staple jams (clear the stapler cartridge, refill staples, remove bent staples), hole punch jams (empty the chip box, clear the punch), booklet maker misfolds, and the finisher not being detected (cable, firmware, driver options). Sensors in the finisher stop the job; clear the path and reset.
- **Incorrect page orientation** and collation on finished sets: the driver's finishing options (staple position depends on orientation and long-edge versus short-edge).

## The first-move summary
- Jams: clear, fan, check rollers and pad.
- Nothing feeds: rollers.
- Several sheets: separation pad.
- Queue stuck: cancel, restart the spooler, check the printer's status.
- Offline: check the IP, set a reservation.
- Staples: clear and refill.

> Exam tip: repeated jams and multipage feeds mean the maintenance kit (rollers and separation pad). A frozen queue means restart the print spooler after clearing the job. A printer that goes offline after a lease change needs a static IP or reservation. Tray not recognized: reseat and set the size. Grinding is a worn gear or roller or an object.`,
      hook: "Jams: rollers, separation pad, damp or wrong paper, overfilled tray, debris; pull in the direction of travel. Multipage feed: separation pad. Not feeding: pickup rollers. Tray not recognized: reseat, size setting, firmware or driver options. Grinding: gear, roller, object. Queue frozen or pending: cancel job, restart the spooler, printer status. Offline: IP changed, reservation, sleep, cable, firewall; print the configuration page. Finishing: clear staple and punch jams, refill, finisher options."
    }
  ]
});
