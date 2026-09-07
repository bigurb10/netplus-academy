// APlus Academy Core 1 deeper explanations, units 7 to 9. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u7l1: `## One building, many tenants
A physical server is an apartment building. Without virtualization, one tenant (one operating system) occupies the whole building and most rooms sit empty. A hypervisor is the landlord who divides the building into apartments: each VM gets its own rooms (CPU time, memory, disk, network) and its own front door, and the tenants never see each other. Containers are roommates sharing one apartment's kitchen (the kernel) with separate bedrooms; cheaper, denser, and less private.

## The two hypervisor types
\`\`\`
                 type 1 (bare metal)                        type 2 (hosted)
runs on          the hardware directly                      a normal desktop OS
examples of use  server consolidation, data centers, cloud  developer laptops, labs, running another OS on a PC
performance      best; no host OS overhead                  good; the host OS takes its share
management       remote console or web interface            a window on the desktop
setup            install from media on a bare server        install like an application
\`\`\`
Both need the CPU's virtualization extensions enabled in firmware (VT-x, AMD-V) and RAM for every guest plus the host.

## Why people virtualize, with the exam's names
\`\`\`
purpose                          what it looks like
sandbox                          a throwaway VM to open a suspicious file or test a patch; revert or delete afterward
test development                 several OS versions on one machine; snapshot, break it, roll back
application virtualization       an old OS in a VM to run a legacy program that will not run on the current OS
cross-platform virtualization    Windows programs on a Mac, Linux tools on Windows, an ARM OS on x64 (through emulation)
consolidation                    ten idle servers become ten VMs on one host
labs and training                a whole network of machines on one laptop
\`\`\`
The security angle appears in every purpose: a VM isolates the guest from the host, so what happens in the sandbox stays in the sandbox unless the hypervisor itself is compromised.

## VDI drawn
\`\`\`
data center:   [ VDI servers ] each running dozens of desktop VMs
                      |
network:              | display and keyboard traffic only; files stay in the data center
                      |
users:      thin client   old PC   tablet   browser at home
\`\`\`
The desktop the user sees runs on the server; the endpoint only draws pixels and sends keystrokes. Lose the tablet and nothing is lost. Lose the network and the user has nothing. VDI suits call centers, hospitals, and contractors who need controlled access from anywhere.

## Containers versus VMs
\`\`\`
                     virtual machine                     container
carries              a whole OS plus the application     the application and its libraries only
kernel               its own                             shared with the host
start time           a minute or more                    seconds
memory per instance  gigabytes                           megabytes
isolation            strong (separate OS)                process-level (weaker)
OS mix on one host   any mix                             same OS family as the host
best for             different operating systems, strong isolation, legacy apps   microservices, packaging apps, dense deployments
\`\`\`
A developer who says "it works on my machine" ships a container so it works everywhere. A security team that needs hard isolation for a hostile workload picks a VM.

## Worked example
A help desk needs to reproduce a customer's problem on Windows 10, test a Linux tool, and open a suspicious email attachment, all on one technician workstation. Install a type 2 hypervisor on the workstation, create a Windows 10 VM and a Linux VM, take snapshots of both, and open the attachment in a third VM on host-only networking; revert the snapshots after each test. The company's production servers, meanwhile, run on type 1 hypervisors in the data center.

## How the exam asks it
- "Which hypervisor type runs directly on the hardware without a host operating system?" Type 1.
- "A technician wants to test software in an isolated environment on a laptop." A sandbox VM under a type 2 hypervisor.
- "Which technology runs applications sharing the host's kernel with less overhead than a VM?" Containers.
- "Which solution runs users' desktops on servers and delivers them to thin clients?" VDI.
- "A legacy application requires an unsupported OS. What allows it to run on modern hardware?" Application (legacy) virtualization in a VM.

## What to memorize
- Host, guest, hypervisor; virtual CPU, RAM, disk file, NIC.
- Type 1 bare metal for servers; type 2 hosted for desktops. VT-x or AMD-V required.
- Purposes: sandbox, test and development, legacy and cross-platform applications, consolidation.
- VDI: desktops on servers, thin clients, network-dependent. Containers: shared kernel, lightweight, application isolation.`,

u7l2: `## Building a VM is a budget
Every VM is paid for out of the host's pocket: CPU cycles, memory, disk space, and network bandwidth. The most common mistake is generosity, giving each guest more memory than the host can spare. The second is the wrong network mode. The third is treating a snapshot as a backup.

## Resource planning, worked
\`\`\`
host: 8 cores, 32 GB RAM, 1 TB SSD
reserve for host OS and hypervisor:  2 cores, 6 GB
guest A (Windows server):            2 vCPU, 8 GB, 120 GB
guest B (Windows client):            2 vCPU, 6 GB, 80 GB
guest C (Linux tools):               2 vCPU, 4 GB, 40 GB
guest D (malware lab, host-only):    1 vCPU, 4 GB, 60 GB
total guests:                        7 vCPU (oversubscribed but fine), 22 GB (fits in 26 GB), 300 GB
\`\`\`
vCPUs can be oversubscribed because guests rarely peak together; memory cannot be, because a guest that is promised RAM expects to use it. If the host runs out of memory it swaps, and every VM stalls at once.

## Disk choices
\`\`\`
disk type               behavior                                   use
dynamically expanding   file grows as the guest writes              labs, many VMs, saving space
fixed size              full size allocated up front                production, best performance
differencing / linked   a small child disk on a shared parent       classrooms: many identical VMs from one base
pass-through            a real disk given to one VM                 special cases (storage appliances)
\`\`\`
Put VM files on an SSD. The single biggest performance lever for a VM host is storage latency, because ten guests hitting one spinning disk make a queue.

## Network modes drawn
\`\`\`
bridged:    [VM] --virtual switch-- [host NIC] --- physical switch --- rest of the LAN
            VM gets its own IP from the real DHCP; everyone can reach it

NAT:        [VM] --virtual switch-- [host does NAT] --- LAN
            VM shares the host's IP; outbound only; nothing can initiate a connection to it

host-only:  [VM] --virtual switch-- [host only]
            no path to the LAN or the internet; VMs on this switch see each other and the host
\`\`\`
Rules: a server that others must reach is bridged; a test client that needs updates but should stay hidden is NAT; a malware lab or an isolated practice network is host-only. Switching a malware VM from host-only to bridged is how a lab infects an office.

## Snapshots, properly
A snapshot freezes the VM's disk (and optionally memory) at a moment and starts recording changes to a new file. Reverting discards the changes. They are perfect before a patch, a config change, or a test. They are not backups: they sit on the same disk as the VM, they grow, they slow the VM as they chain, and a corrupted parent takes every child with it. Delete (merge) them when the test is over, and back up VMs with the backup tool, which copies the whole VM to other storage.

## Security checklist for VMs
\`\`\`
threat                              control
unpatched guest                     patch guests like physical machines; antivirus in each
compromised host = all guests       lock down the host: strong admin credentials, MFA, limited access, encrypted VM files
VM escape (guest breaks out)        keep the hypervisor patched; avoid untrusted VM images
lab VM reaching the office          host-only or internal networking for risky work
VM sprawl (forgotten VMs)           inventory, naming, decommission unused VMs; they are unpatched machines
stolen VM file                      encryption of VM storage; access control on the datastore
licensing                           every guest OS and application needs a license
\`\`\`

## Worked example: the slow VM
A user reports that a VM used for testing is unbearably slow since two more VMs were added to the same laptop. The laptop has 16 GB; the three VMs are assigned 8, 4, and 4 GB, leaving nothing for the host. Reduce the allocations (4, 3, 3), move the VM files to the SSD if they are on an external hard drive, and shut down VMs that are not in use. Performance returns.

## How the exam asks it
- "A VM must be reachable by other computers on the LAN with its own address." Bridged networking.
- "A VM must reach the internet but must not accept inbound connections." NAT.
- "A malware analysis VM must be completely isolated from the network." Host-only.
- "What should be done before applying an untested update to a VM?" Take a snapshot.
- "A guest escapes its VM and accesses the host." VM escape; patch the hypervisor.
- "Three VMs on a 16 GB laptop are slow." Memory oversubscription; reduce allocations.

## What to memorize
- Enable VT-x or AMD-V; RAM per guest plus the host; VM disks are files, dynamic or fixed, on fast storage; a virtual NIC.
- Bridged (own address, reachable), NAT (behind the host, outbound only), host-only (isolated).
- Snapshot before changes; not a backup; merge afterward. Guest tools. Licenses.
- Patch guests and hypervisor; protect the host; VM escape; host-only for labs; avoid sprawl.`,

u7l3: `## Two axes
The cloud is sorted on two axes that the exam keeps separate. Who owns and shares the hardware is the deployment model: public, private, hybrid, community. How much of the stack you manage is the service model: IaaS, PaaS, SaaS. Any deployment model can offer any service model; a private cloud can run SaaS for its own employees.

## Deployment models compared
\`\`\`
model        owned by                shared with             cost model            when
public       a provider              many customers          pay per use           most workloads; fast start; no hardware
private      one organization (or hosted for it)   nobody else   capital or a dedicated contract   compliance, control, steady heavy loads
hybrid       both, connected         private part is yours   mixed                 keep sensitive data private, burst to public
community    a group with shared needs   members of the group   shared among members   regulated sectors: health, government, education
\`\`\`
Hybrid is the practical reality for most companies: identity and sensitive databases on premises, email and collaboration in a public SaaS, development in a public IaaS.

## The stack and who manages it
\`\`\`
layer                 on premises   IaaS        PaaS        SaaS
data                  you           you         you         you (and your users)
application           you           you         you         provider
runtime, middleware   you           you         provider    provider
operating system      you           you         provider    provider
virtualization        you           provider    provider    provider
servers, storage      you           provider    provider    provider
networking, building  you           provider    provider    provider
\`\`\`
Read the table from the bottom: each model hands one more slab to the provider. The exam's favorite phrasing is "which model gives the customer the most control" (IaaS) or "the least management burden" (SaaS).

## Recognizing each service model
\`\`\`
model   you get                                       you do                            examples of use
IaaS    virtual machines, storage volumes, virtual networks, load balancers   install and patch the OS, configure everything above it   lift-and-shift of existing servers, disaster recovery, big compute jobs
PaaS    a platform: managed OS and runtime, databases, queues, build pipelines   write and deploy code, manage data   web apps, APIs, mobile back ends
SaaS    a finished application through a browser or client   manage users, settings, and data   email, office suites, CRM, HR systems, video meetings, file sync
\`\`\`
Also on the periphery: DaaS (desktop as a service, VDI hosted by a provider), and "as a service" for almost anything else; the pattern is the same.

## Worked example: choosing
\`\`\`
need                                                                     answer
a five-person firm wants email and shared documents with no IT staff     SaaS, public
developers want to deploy a web app without managing servers             PaaS, public
a company with 40 aging servers wants out of the hardware business quickly   IaaS (lift and shift), public or hybrid
a hospital must keep patient data in its own facility but wants elastic capacity for research   private for records, public for research: hybrid
six county governments want a shared, compliant records platform         community cloud
\`\`\`

## What changes for the technician
Provisioning moves from purchase orders to a web console: a server exists two minutes after you click. Costs are operational and recurring rather than capital. The internet link and DNS become the critical infrastructure. Identity becomes the perimeter: a leaked password to the cloud console is worse than a stolen server, so multifactor authentication and least privilege are not optional. Backups still matter; providers protect their platform, not your mistakes.

## How the exam asks it
- "Which cloud model dedicates infrastructure to a single organization?" Private.
- "Which model lets an organization keep sensitive workloads internal while using a provider for others?" Hybrid.
- "Which service model provides virtual machines that the customer must configure and patch?" IaaS.
- "A developer deploys code to a provider-managed runtime without administering servers." PaaS.
- "Users access an email application through a web browser with no local installation." SaaS.
- "Several universities share cloud infrastructure built for their common requirements." Community.

## What to memorize
- Public, private, hybrid, community: who owns it and who shares it.
- IaaS (VMs and networks, you manage the OS up), PaaS (platform for your code and data), SaaS (finished application). Most control IaaS; least burden SaaS.
- Hybrid for mixed sensitivity; community for shared regulated needs.`,

u7l4: `## Cloud as a utility
Electricity is the model. You do not own a power plant; you plug in, use what you need, and pay by the kilowatt-hour. The utility runs enormous plants shared by everyone (multitenancy), can supply your busiest day (elasticity), promises to stay on (availability), and bills by the meter (metered utilization). Cloud computing borrows every one of those ideas and adds a few of its own.

## The characteristics, defined
\`\`\`
term                     definition                                                    the exam's cue words
shared resources         many customers on the same physical hardware, separated by the hypervisor   "lower cost," "noisy neighbor"
dedicated resources      hardware reserved for one customer                             "compliance," "predictable performance," "isolation"
multitenancy             one system or application serving many customers with separated data   "single instance," "many customers," "logically separated"
metered utilization      billing by measured use: compute hours, storage GB, requests, data transfer   "pay only for what you use," "monthly bill increased"
ingress and egress       data into the cloud (usually free) and out of it (billed)      "transfer charges," "moving data out"
rapid elasticity         automatic growth and shrinkage of capacity with demand         "traffic spike," "scale," "holiday sale"
high availability        redundancy across zones and regions with an uptime commitment  "SLA," "99.9 percent," "failover"
file synchronization     the same files on every device and in the cloud                "appears on all devices," "conflict," "deleted everywhere"
\`\`\`

## Shared versus dedicated, a worked choice
A trading firm runs latency-sensitive software and must prove to auditors that no other company's code shares its servers. Shared hosts are cheaper and fine for most workloads, but the firm's two requirements (predictable performance, isolation for compliance) both point to dedicated hosts. A marketing agency hosting brochure websites would waste money on dedicated hardware.

## Metering, with numbers
\`\`\`
item                                       typical billing
a VM                                       per hour or per second while running
block storage                              per GB per month
object storage                             per GB per month plus per request
data ingress                               free
data egress to the internet                per GB, after a small free allowance
a managed database                         per hour plus storage plus I/O
\`\`\`
The classic surprise bill: a test VM left running for a month, a backup restore that pulled 20 TB out of the cloud (egress), or a script that made millions of storage requests. The fix is monitoring, budgets and alerts, and shutting down what is not in use.

## Elasticity drawn
\`\`\`
demand:   ___/‾‾‾‾\___/‾‾‾‾‾‾‾‾\______
servers:  2   6     2   8         2      (auto-scaling adds and removes instances)
bill:     follows the servers, not the peak
\`\`\`
Scaling out adds instances behind a load balancer; scaling in removes them when demand drops. Scaling up gives one instance more CPU and memory. Elasticity depends on applications that can run on many instances at once; a single database server does not scale out by itself.

## Availability, engineered
A region contains several availability zones, each a separate data center with its own power and cooling. A highly available design runs in at least two zones behind a load balancer with replicated storage, so a zone failure moves traffic automatically. The provider's SLA promises a percentage of uptime and credits if it is missed. A technician's mistake is to place a single VM in one zone and call it highly available; the platform offers redundancy, the design has to use it.

## File synchronization traps
\`\`\`
trap                                       what happens                              response
conflict                                   two edits to the same file offline        the service keeps both as "conflicted copy"; merge by hand
deletion propagates                        a file deleted on one device vanishes everywhere   restore from the service's trash or version history
ransomware                                 encrypted files sync to every device      version history and a separate backup
quota                                      the sync stops when the account is full   clean up or upgrade
metered links                              large libraries sync over cellular        sync over Wi-Fi only; selective sync
\`\`\`

## How the exam asks it
- "A company is billed for the exact compute hours and storage it consumed." Metered utilization.
- "An online store's capacity automatically increases during a sale and decreases afterward." Rapid elasticity.
- "A customer needs assurance that no other tenant's workloads run on the same hardware." Dedicated resources.
- "One instance of an application serves many customers, each seeing only their own data." Multitenancy.
- "Moving a large backup out of the cloud incurs a significant charge." Egress fees.
- "A file deleted on a laptop disappears from the user's phone too." File synchronization; restore from version history.

## What to memorize
- Shared (cheaper, multitenant) versus dedicated (isolation, predictable performance, compliance).
- Metered utilization: pay per use; ingress free, egress billed.
- Elasticity: automatic scale out and in. High availability: zones, regions, redundancy, SLA.
- File sync: same files everywhere; conflicts, deletions propagate, version history, not a backup.`,

u8l1: `## The method is a habit
Good technicians do not memorize the six steps; they do them without thinking. The exam asks about them explicitly, so for now be deliberate: name the step you are on, and notice when a question is trying to make you skip one (jumping to a fix without a theory, or replacing a part without a test).

## The six steps, expanded
\`\`\`
step                              do this                                                   do not do this
1 identify the problem            ask what, when, what changed; reproduce it; check logs; back up   assume; blame the user; skip the backup
2 establish a theory              start simple and obvious; list several; research            fixate on one exotic cause
3 test the theory                 cheapest test first; swap known-good parts; if wrong, next theory; escalate if stuck   test three things at once
4 plan and implement              consider side effects; get approval; follow vendor procedures   change it and see
5 verify and prevent              confirm the original symptom is gone and nothing else broke; add prevention   declare victory on the first good boot
6 document                        symptoms, cause, fix, parts, time                          leave it in your head
\`\`\`
The backup in step 1 is the detail most people forget and the exam most likes: before changing anything, protect the data.

## Reading qualifiers
\`\`\`
qualifier    it wants                                        example
FIRST        the quickest, cheapest, least destructive check   check the cable before the NIC; check the input source before the card
NEXT         the step after the one described                 theory tested and failed: form a new theory
MOST likely  the common cause, not the possible one           clicking drive: failing HDD, not a driver
BEST         the fix that fully solves it with least side effect   reservation for a printer, not a shorter lease
\`\`\`
Distractors on troubleshooting items are usually one drastic action (reinstall the OS, replace the board), one unrelated action, and one plausible but later step.

## The toolkit, by question
\`\`\`
question                                          tool
Is the outlet live? Is the 12 V rail at 12 V? Is this cable continuous?   multimeter
Are all PSU rails present and is power-good asserted?   power supply tester
The board is dead and shows nothing; where did POST stop?   POST card (reads firmware codes)
Is this network or serial port working by itself?   loopback plug
Is it the part or everything else?               known-good part swap
Will I destroy the RAM by touching it?           ESD strap and mat (yes, without them)
Is the RAM bad?                                  bootable memory tester
Is the drive dying?                              S.M.A.R.T. reader, vendor diagnostic
Is it overheating?                               firmware temperature readout, monitoring software
What happened before the crash?                  the OS event log
\`\`\`

## Using a multimeter safely
Set the mode before touching probes to anything: DC volts for PSU rails and batteries, AC volts for the wall, continuity (the beep) for cables and fuses with the circuit unpowered, resistance for components out of circuit. Black probe to ground (a black wire on the PSU connector or the outlet's ground), red to the point under test. A 12 V rail reading 11.4 V or less under load points to a failing supply.

## ESD, the rule set
Static you cannot feel can kill a chip. Wear the strap clipped to the chassis, work on a mat, keep parts in their antistatic bags until needed, touch the bare metal of the case before reaching in, avoid carpet and synthetic clothing, and keep humidity up in dry seasons. Never wear the strap while working inside a power supply or a CRT; those hold voltages that a strap would conduct through you.

## Worked example
A user reports "my computer is broken." Step 1: it powers on, the fans spin, but the screen shows nothing; it started after the office moved desks yesterday; nothing was installed. The user has a backup because files are on the server. Step 2: theories in order: monitor input or cable disturbed in the move, video cable loose at the PC, card unseated by the move, dead monitor. Step 3: press the input button (nothing), swap the monitor cable (image appears). Step 4: replace the damaged cable. Step 5: image at boot and after sleep; tidy the cables so the chair cannot pinch them. Step 6: ticket notes "video cable damaged during move; replaced; cables secured."

## How the exam asks it
- "After gathering information from the user, what should the technician do before making changes?" Back up the data.
- "A technician's theory is tested and proves wrong. What is the NEXT step?" Establish a new theory (or escalate).
- "After implementing a fix, what should be done before closing the ticket?" Verify full functionality and implement preventive measures, then document.
- "Which tool reads diagnostic codes from a motherboard that will not display anything?" A POST card.
- "Which tool verifies each output voltage of a power supply?" A PSU tester (or a multimeter).

## What to memorize
- Identify (gather, question, changes, back up), theory (obvious first), test (simplest; escalate), plan and implement, verify and prevent, document.
- FIRST = cheapest; MOST likely = common; BEST = complete with least side effect.
- Multimeter, PSU tester, POST card, loopback plug, known-good parts, ESD strap, memory tester, S.M.A.R.T., temperatures, event log.`,

u8l2: `## Four suspects and their tells
When a machine will not start or will not stay running, the suspects are the power supply, the memory, the board, and the processor, in roughly that order of likelihood. Each leaves a signature: the power supply fails silently or under load, memory fails with beeps and blue screens, the board fails with swollen capacitors and dead ports, and the CPU almost never fails unless it was overheated or mishandled.

## Symptom to cause, the master table
\`\`\`
symptom                                   most likely                               first check
no power, no fans, no lights              outlet, cord, PSU switch or selector, dead PSU, front panel switch   lamp in the outlet; PSU tester; short the power pins
fans spin, no POST, no display            RAM not seated or bad; video card; board   reseat RAM, one module in slot 1; POST card; minimal config
POST beep codes                           repeating = memory; long-short = video; continuous = power or board   look up the pattern for the firmware maker
proprietary crash screen (BSOD, pinwheel) driver or update; RAM; storage; heat        recent changes; memory test; S.M.A.R.T.; temperatures
black screen after POST, OS never loads    boot device or boot record; video after driver load   boot order; safe mode; another monitor
no power to a device inside               connector; PSU rail; the device              swap connectors; test the rail
sluggish performance                      low RAM (paging); throttling; failing drive; malware; background processes   Task Manager; temperatures; drive health
overheating, random shutdown              dust; failed fan; dried paste; blocked vents; PSU under load   temperatures in firmware; fans spinning; clean
burning smell                             dust cooking on a heat sink; failing PSU; scorched component   power off; look and smell for the source
application crashes                       one app: that app or its files; many apps: RAM, disk, heat, malware   event log; memory test
unusual noise                             whine = fan bearing; click or grind = HDD; buzz with load = coil whine   locate with the case open
capacitor swelling or leaking             failing board or PSU                       inspect capacitor tops; replace the unit
inaccurate date and time                  CMOS battery                               replace CR2032; reset settings
intermittent, touch-sensitive faults      loose connector; cracked solder; failing capacitor   reseat everything; wiggle test
\`\`\`

## Beep codes, in practice
Firmware vendors differ, but a few patterns are near-universal: one short beep is a successful POST; repeating short beeps or a continuous tone with no display is memory; one long and two or three short is video; no beep and no display with fans running is often the board or CPU, or a speaker that is not connected. Many modern boards use LEDs or a two-digit display instead; the code is in the manual.

## The minimal configuration, step by step
1. Power off, unplug, remove the battery on a laptop.
2. Disconnect every drive, every add-in card except one video source, every USB device, and all but one RAM module (in the slot the manual names first).
3. Power on. If it POSTs, the fault is in something removed; add parts back one at a time.
4. If it does not POST, swap the RAM module for another; then try a known-good PSU; then a known-good video card; then suspect the board, and last the CPU.
5. Check the obvious on the way: the 24-pin and EPS connectors fully seated, the front panel header correct, no stray standoffs, no bent socket pins.

## The power supply as the hidden cause
A supply that is failing rarely dies outright. It boots the machine fine at idle and then drops the 12 V rail when the graphics card and CPU load it, which looks like a game crash, a reboot, or a black screen. It can also fail to assert power-good, so the board never starts even though the fan spins. A PSU tester shows rails at idle; a multimeter on the 12 V pin during load shows the sag. Known-good swap settles it.

## Worked example: the beeping tower
A tower emits repeating short beeps and shows nothing after a technician added a second RAM module. The new module is not seated or is incompatible. Remove it: the machine POSTs. Reseat it firmly until both clips click: POSTs and shows the new total. If it still beeps with only the new module in slot 1, the module is bad or unsupported.

## Worked example: the smell
A user reports a burning smell from a two-year-old desktop and turns it off. Inside, a thick blanket of dust covers the CPU heat sink and the PSU intake. No scorch marks. Clean thoroughly with compressed air outdoors, holding fans still, and check the paste. Temperatures return to normal. Had the smell come with a swollen capacitor or a discolored board area, the answer would have been replacement.

## How the exam asks it
- "A desktop shows no lights and no fans. What should be checked FIRST?" The power source: outlet, cord, PSU switch.
- "A PC beeps repeatedly at power-on and shows nothing." Reseat or replace the RAM.
- "A PC restarts under heavy load but idles fine." Overheating or a failing power supply.
- "A PC's clock is wrong after every power-off." Replace the CMOS battery.
- "Bulging capacitors are visible on a motherboard." Replace the motherboard.
- "A blue screen appears at random with different error codes." Test the memory.

## What to memorize
- The master table, especially: no power (outlet, cord, PSU); beeps (RAM, video); random shutdowns (heat, PSU); crash screens (drivers, RAM test); wrong clock (CMOS); swollen capacitors (replace).
- Minimal configuration and one-module-at-a-time. PSU failures show under load.`,

u8l3: `## Drives fail in two ways
Mechanical drives die loudly and slowly: clicking, grinding, growing numbers of bad sectors, longer and longer reads. Solid-state drives die quietly and suddenly: they vanish from the firmware, go read-only, or refuse writes. In both cases the first action is the same, and it is not a repair: copy the data off while it can still be read.

## Symptom to cause
\`\`\`
symptom                                    likely cause                                   first action
clicking, grinding, repeated spin-up       HDD mechanical failure                          back up now; replace
LED indicators: amber or red bay light     degraded or failed drive in an array or NAS     identify the bay in the controller utility
S.M.A.R.T. warning or failure              the drive predicts its own death                back up; replace
bootable device not found                  boot order; USB stick left in; loose cable; dead drive; corrupt boot record; firmware mode changed   boot order and firmware drive list
extended read/write times, low IOPS        failing drive; fragmented HDD; nearly full SSD; wrong controller mode; bad cable   health report; free space; cable
missing drives in the OS                   not initialized or partitioned; driver; disabled port; failed drive   Disk Management; firmware
data loss or corruption                    failing drive; bad cable; power loss during writes; malware   back up what reads; file system check after; replace
RAID failure with audible alarm            a member failed                                 replace the member; rebuild
array missing                              controller lost its configuration or failed; driver removed; cache battery dead   restore config or replace the controller; never initialize the disks
missing drives in the array                cable, backplane, or failing member             reseat; controller log
rebuild never completes                    a second member failing; bad replacement drive  check each member's health
\`\`\`

## The boot failure decision tree
\`\`\`
"No bootable device" or "Operating system not found"
  |- is a USB stick or disc inserted?  -> remove it; fix the boot order
  |- does firmware list the drive?
  |     |- no  -> check the data and power cables; try another port; the drive may be dead
  |     |- yes -> is the boot order right? is the mode (UEFI/legacy) unchanged?
  |               |- fixed -> done
  |               |- still fails -> the boot record or the OS installation is damaged; repair from installation media
\`\`\`
A firmware change is the sneaky one: switching from UEFI to legacy (or the reverse) makes a working disk unbootable because the partition style no longer matches.

## S.M.A.R.T. explained
Self-Monitoring, Analysis, and Reporting Technology runs inside the drive and tracks reallocated sectors, pending sectors, spin retries, temperature, and hours. Firmware and utilities read it; a "failure predicted" status means the drive has crossed a threshold. Treat it as a countdown: back up today, replace this week. SSDs report wear and remaining life the same way.

## RAID recovery, in order
1. Identify the failed member from the controller utility or the amber LED; note the array level.
2. Confirm the most recent backup completed; a degraded array has less or no protection.
3. Replace the failed drive with the same capacity or larger and the same interface; hot-swap if supported.
4. Start the rebuild (or let the hot spare do it). Expect slow performance during the rebuild.
5. Verify the array shows optimal. Replace the hot spare if it was consumed.
If the whole array disappears at once, stop. Drives do not all die together; the controller, its configuration, its driver, or its cache battery is the cause. Reseat the controller, restore its configuration, or replace it with the same model, and the array returns intact. Initializing the drives in a panic wipes the data.

## SSD specifics
No moving parts means no clicking and no fragmentation concerns. SSDs slow down when nearly full because the controller has fewer free blocks to write into; keep 10 to 20 percent free and make sure the OS's TRIM function is enabled. A firmware bug can cause an SSD to drop offline; check for a firmware update from the vendor. When an SSD fails, data recovery is far harder than from an HDD, which is one more reason to back up.

## Worked example: the slow laptop
A laptop with an HDD takes minutes to boot and programs stall for seconds. S.M.A.R.T. shows hundreds of reallocated sectors and rising pending sectors. The drive is failing, retrying reads. Clone what can be read to a new SSD (a sector-skipping cloner), replace the drive, and restore anything missing from backup. Defragmenting would only stress the dying drive.

## Worked example: the vanished array
After a power outage, a workstation's RAID 1 volume is gone and the OS sees two separate raw disks. The controller's configuration was lost. Do not initialize. Reboot into the controller's utility, import the foreign configuration from the disks, and the mirror returns. Replace the controller's battery or capacitor module if the utility reports it failed.

## How the exam asks it
- "A hard drive makes clicking noises. What should the technician do FIRST?" Back up the data.
- "A PC displays 'bootable device not found' after a USB drive was used." Remove the drive and correct the boot order.
- "A S.M.A.R.T. error appears during POST." Back up and replace the drive.
- "A RAID 5 server beeps and one drive LED is amber." Replace the failed drive and rebuild.
- "A RAID volume disappeared and the OS shows separate disks." Controller problem; restore the configuration; do not initialize.
- "An SSD has become very slow and is 97 percent full." Free space; ensure TRIM is enabled.

## What to memorize
- Back up first. Clicking, grinding, S.M.A.R.T. warnings: replace. Amber bay LED: degraded.
- Boot failure tree: USB stick, boot order, firmware drive list, cables, boot record, UEFI versus legacy.
- Slow: failing drive, full SSD, fragmentation, cable, mode. RAID alarm: replace and rebuild; array missing: controller, never initialize.`,

u8l4: `## Cheap things first
Display faults cost nothing to check and a lot to misdiagnose. A monitor on the wrong input, a loose cable, or a refresh rate the cable cannot carry accounts for most tickets. Only after those come the backlight, the panel, the projector lamp, and the graphics card.

## Symptom to cause
\`\`\`
symptom                             likely cause                                     first check
no image at all                     wrong input source; cable; monitor off or asleep; card unseated or unpowered; laptop set to external   input button; swap cable; power LED; display toggle key
incorrect data source               monitor on HDMI 2, cable on HDMI 1               select the input
physical cabling issues             loose, pinched, or damaged cable; bent VGA pins; dangling adapters   inspect; swap a known-good cable
dim image                           brightness; power saving; failing backlight or inverter   flashlight test
flashing or flickering screen       loose cable; unsupported refresh; driver; failing panel or inverter; laptop hinge cable   reseat cable; set a supported refresh; update driver
fuzzy image                         non-native resolution; VGA over a long cable; scaling; projector focus   set native resolution; shorter digital cable
incorrect color display             cable or bent pins (a missing color); color profile or night mode; driver; failing panel   swap cable; reset color settings
distorted image or geometry         aspect ratio; unsupported resolution; damaged cable; projector keystone   settings; cable; keystone correction
sizing issues                       overscan on a TV; aspect ratio; OS scaling      TV's picture settings ("just scan"); OS scaling
dead pixels                         panel defect                                    vendor policy; pixel-cycling tool for stuck pixels
display burn-in                     static image on OLED or plasma                   permanent; prevent with pixel shift and screen savers
burnt-out bulb                      projector lamp at end of life                    lamp indicator and hour counter; replace and reset
intermittent projector shutdown     overheating: clogged filter, blocked vents, hot room; lamp failing   clean filter; airflow; lamp hours
audio issues                        wrong playback device; cable or adapter without audio (DVI, VGA); monitor speakers muted   select the display as output; HDMI or DisplayPort cable
\`\`\`

## The flashlight test
Turn the display on, dim the room, and shine a flashlight at an angle onto the screen. If the desktop is faintly visible, the panel and the graphics path are working and only the backlight is missing: on a laptop that is the LED strip or its driver (or the inverter and CCFL tube on old models); on a monitor it is the backlight or the monitor's power board. If nothing is visible even with the flashlight, the panel, the cable, or the graphics output is the problem, and an external monitor test tells you which side of the connector it is.

## Refresh rate and bandwidth
\`\`\`
resolution and rate      needs at least
1080p at 60 Hz           any HDMI or DisplayPort; DVI; VGA (soft)
1080p at 144 Hz          HDMI 1.4 (barely) or DisplayPort 1.2; dual-link DVI
1440p at 144 Hz          HDMI 2.0 or DisplayPort 1.2
4K at 60 Hz              HDMI 2.0 or DisplayPort 1.2
4K at 120 or 144 Hz      HDMI 2.1 or DisplayPort 1.4 with compression
\`\`\`
A monitor "stuck at 60 Hz" has a cable, port, or adapter below the line it needs, or the OS display setting has not been changed. A screen that flickers or blanks every few seconds at a high rate is a cable at the edge of its bandwidth; a shorter, certified cable fixes it.

## Projectors
A projector is a lamp, an imaging chip, a lens, and a fan in a hot box. The lamp has a rated life (a few thousand hours); the projector counts hours and warns, then refuses to light. Replace the lamp module and reset the counter. The fan pulls air through a filter; a clogged filter means the projector overheats and shuts down partway through a meeting, sometimes with a temperature warning light. Clean the filter, give it space, and lower the room temperature. Keystone correction squares an image projected at an angle; focus and zoom are on the lens ring. A projector that shows the wrong source needs the input button, exactly like a monitor.

## Worked example: the conference room
The conference room projector displays the laptop for ten minutes and then shuts off. The room is warm and the projector is recessed in a cabinet with no airflow; its filter is gray with dust. Clean the filter, open the cabinet or add a vent, and check the lamp hours (well within life). It runs through a two-hour meeting. If the lamp indicator had been flashing, the answer would have been the lamp.

## Worked example: the pink monitor
A desktop's monitor shows everything with a pink tint. The VGA cable has a bent pin, so one color signal is missing. Swap the cable (or replace the bent-pin cable) and the color returns. On a digital connection, a missing color is a driver or profile setting, not a pin.

## How the exam asks it
- "A monitor shows 'no signal' though the PC is running. What should be checked FIRST?" The input source and the cable.
- "A laptop display is dark but readable with a flashlight." Backlight or inverter.
- "A projector shuts off after a period of use." Overheating; clean the filter and check ventilation.
- "A projector's lamp indicator is lit and no image appears." Replace the lamp.
- "An OLED shows a permanent ghost of a taskbar." Burn-in.
- "No sound from a TV connected by HDMI." Select the TV as the playback device.

## What to memorize
- Input source, cable, power, card seating, laptop toggle: the first checks.
- Flashlight test for backlight or inverter. Native resolution for fuzzy. Refresh needs bandwidth.
- Projector: filter and heat for shutdowns; lamp hours for the bulb; keystone for geometry. Burn-in permanent; dead pixels are defects. Audio: choose the output device.`,

u8l5: `## Phones fail like laptops, only smaller
The same four systems fail: power, screen, input, and radios. The difference is that the parts are glued, the batteries are inside, the ports are tiny, and the user carries the device through rain and pockets full of lint. Start with what the user can see (a bulge, a crack, a wet indicator) and work toward what they cannot (a battery health number, a stale network profile).

## Symptom to cause
\`\`\`
symptom                              likely cause                                          first action
poor battery health                  aged battery; check the health percentage             replace the battery
short battery life, health fine      brightness, background apps, location, radios, poor signal (radio works harder)   adjust settings; check for a misbehaving app
improper charging                    cable, adapter wattage, dirty or bent port, wrong charging standard   known-good cable and adapter; clean the port
swollen battery                      degraded cell producing gas                           stop using; do not charge or press; replace; recycle
overheating                          heavy apps while charging; sun; a thick case; malware; failing battery   cool it; close apps; remove case; scan
broken screen                        glass, digitizer, or panel                            replace the assembly
damaged ports                        lint, corrosion, bent contacts                        clean with a wooden pick; assembly repair if bent
liquid damage                        water, coffee, sweat                                  power off; do not charge; remove SIM and case; dry days; check indicators
digitizer issues                     cracked digitizer; moisture; screen protector          remove protector; dry; replace
cursor drift / touch calibration     phantom touches; wrong registration; noisy charger    try another charger; calibrate if available; digitizer
stylus does not work                 battery or charge; pairing; wrong model; digitizer     charge or battery; pair; confirm compatibility
poor or no connectivity              airplane mode; radios off; range; stale profile; SIM; carrier settings; VPN   toggle airplane mode; forget and rejoin; reseat SIM
malware                              unofficial apps; pop-ups; drain; unknown apps         remove unknown apps; revoke permissions; update; factory reset last
cannot install apps                  storage full; OS too old; account or payment; MDM restriction   free space; update; check MDM policy
degraded performance                 storage full; background apps; old OS; failing battery throttling; malware   free space; restart; update; battery health
\`\`\`

## Batteries, in detail
Lithium-ion cells lose capacity with every cycle and with heat. Phones expose a health percentage; below about 80 percent, the battery is worn and the OS may throttle performance to prevent shutdowns, which the user experiences as a slow phone. A swollen battery is a safety issue: the electrolyte has broken down into gas, the pouch inflates, and it pushes the screen or back cover off. Never puncture it, never charge it, keep it away from heat, and hand it to a proper repair or recycling channel. Fast charging needs the right cable and adapter; a 5 W adapter charges a modern phone at a crawl, which users report as "not charging."

## Liquid, in detail
Water conducts and corrodes. Power off immediately (a running phone shorts as water spreads). Do not charge, because current plus water equals corrosion at speed. Remove the SIM tray and case, blot, and let it dry with airflow for days; rice does nothing useful. Liquid contact indicators in the SIM tray or ports turn red when wet, and manufacturers use them to deny warranty claims. A phone that "survived" may fail weeks later as corrosion spreads.

## Touch, in detail
Capacitive digitizers sense the change in capacitance from a finger. Moisture, a poor screen protector, a cracked digitizer, and electrically noisy chargers all confuse them, producing phantom touches (ghost touch) or drift. The charger cause is diagnostic: if the phone misbehaves only while charging on a cheap charger, the charger is the fault. Active styluses add a battery and pairing to the list.

## Connectivity, in detail
\`\`\`
check                     why
airplane mode             kills every radio; users toggle it by accident
Wi-Fi and cellular toggles   quick settings are easy to mis-tap
saved network profile     a changed password leaves a stale profile; forget and rejoin
SIM                       reseat; look for "no SIM" or "SIM not provisioned"
carrier settings / updates   needed after moves and OS updates
VPN or proxy              left on, blocks or slows everything
range and interference    move; check the analyzer
\`\`\`

## Worked example: the slow phone
A user's three-year-old phone is slow and shuts down at 30 percent battery. Battery health reads 71 percent, storage is 98 percent full, and the OS is two versions behind. Replace the battery (fixes the shutdowns and the throttling), free storage (fixes the slowness), and update. If unknown apps or pop-ups had been present, malware removal would come first.

## Worked example: the ghost touches
A tablet types by itself while charging in a car. The car charger is a cheap, noisy one. With the original adapter the tablet behaves. Replace the charger. Had the behavior continued unplugged, the digitizer or a wet screen would be the suspects.

## How the exam asks it
- "A phone's back cover is separating from the case." Swollen battery; stop use and replace it.
- "A phone was dropped in water. What should be done FIRST?" Power it off and do not charge it.
- "A phone registers touches the user did not make while charging." A noisy charger or a digitizer fault; try a known-good charger.
- "A user cannot install apps on a corporate phone." Storage, OS version, or MDM restrictions.
- "A phone has no cellular, Wi-Fi, or Bluetooth." Airplane mode.
- "A phone shuts down at 30 percent charge." Poor battery health; replace the battery.

## What to memorize
- The symptom table. Swollen: stop, replace, recycle. Liquid: off, no charging, dry, indicators.
- Battery health under 80 percent: replace; throttling follows. Charging: cable, adapter, port.
- Ghost touches: protector, moisture, charger, digitizer. Stylus: battery, pairing, model.
- Connectivity: airplane mode, toggles, forget and rejoin, SIM, carrier settings, VPN. Apps: storage, OS, MDM. Malware: unknown apps, reset last.`,

u8l6: `## Why worked cases matter
Facts answer the recall questions; reasoning answers the scenario questions. A scenario gives a symptom, a change, and a context, and the correct option is the one that a careful technician would reach by the method. These five additional cases sharpen the pattern, each in the six-step shape, each with the wrong answers explained.

## Case A: the office of frozen PCs
Three PCs in the same office started freezing for a few seconds every hour after new LED lighting was installed. Other offices are fine.
- Identify: the common factor is location and the timing of the change. The PCs share nothing else.
- Theory: electrical interference or a power quality problem from the new lighting circuit. Freezes in several machines at once are rarely software.
- Test: plug one PC into a UPS with power conditioning; it stops freezing. Check the shared power strip and whether the lighting shares the circuit.
- Fix: put the office on a conditioned circuit or add UPS units; have an electrician check the lighting ballast wiring.
- Wrong answers: reinstalling the OS on three machines; replacing the RAM in all three.

## Case B: the laptop that will not charge
A laptop's battery icon shows "plugged in, not charging." The laptop runs on the adapter.
- Identify: power reaches the laptop (it runs), but the battery does not accept charge. The user bought a cheap replacement adapter last month.
- Theory: an underpowered or non-genuine adapter that the laptop will run on but will not charge from; a worn battery; a charging circuit fault.
- Test: try the original-wattage adapter; check battery health in the OS; try a known-good battery if available.
- Fix: the 45 W generic adapter is replaced with the 90 W original; charging resumes. If the correct adapter had not fixed it, the battery (health check) and then the charging circuit would follow.
- Wrong answers: replacing the laptop; a firmware reset before checking the adapter.

## Case C: the PC that boots to a black screen with a cursor
A desktop POSTs, shows the manufacturer logo, then a black screen with a mouse cursor and nothing else. It started after a graphics driver update.
- Identify: firmware and boot work; the OS starts; the display fails after the driver loads. The change is the driver.
- Theory: the new driver is broken or incompatible.
- Test: boot into safe mode (which uses a basic display driver); the desktop appears.
- Fix: roll back the driver or install the vendor's previous stable version; verify a normal boot; document the driver version to avoid.
- Wrong answers: replacing the graphics card; replacing the monitor. The hardware displayed the logo, so it works.

## Case D: the NAS with the flashing light
A small office NAS flashes an amber LED and its web page shows the volume as degraded; users can still read and write files.
- Identify: one drive in a mirrored volume has failed; the other is carrying the load.
- Theory: a drive failure, as reported.
- Test: the NAS log names the drive and its S.M.A.R.T. errors. Confirm the cloud backup ran last night.
- Fix: replace the failed drive with the same or larger capacity; the NAS rebuilds the mirror over several hours; verify the volume reports healthy; enable email alerts so the next failure is noticed on day one, not week three.
- Wrong answers: powering the NAS off and reinitializing; ignoring it because files still open.

## Case E: the tablet with the dead spot
A tablet's touch screen ignores a strip along one edge; the display image is perfect. The device was dropped last week and has a case that covers that edge.
- Identify: image good, touch bad in one region, a drop, a case.
- Theory: a cracked digitizer along the edge (most likely after a drop), or the case pressing on the edge.
- Test: remove the case: no change. Run the built-in touch diagnostic or draw across the screen in a drawing app: the strip registers nothing.
- Fix: replace the screen assembly (the digitizer is bonded to the panel on this model). Verify touch across the whole screen. Recommend a case that does not overhang the glass.
- Wrong answers: recalibrating a capacitive screen (no effect); a factory reset (software cannot fix a cracked sensor).

## The recurring pattern
\`\`\`
signal                                                  points to
several machines in one place fail together             environment: power, network, heat
"since I bought / installed / updated X"                X, or its interaction with what was there
works in safe mode or on an external monitor            software or the internal display path, not the core hardware
degraded but working                                    redundancy is carrying it; fix before it fails fully
physical damage plus a localized symptom                the part at that location
\`\`\`

## How the exam asks it
- "Multiple PCs in one room freeze after new lighting was installed." Electrical interference; power conditioning.
- "A laptop runs on AC but the battery will not charge after a new adapter was purchased." The adapter is underpowered or incompatible.
- "A PC displays a black screen with a cursor after a driver update." Boot to safe mode and roll back the driver.
- "A NAS volume is degraded." Replace the failed drive and rebuild after confirming backups.
- "A dropped tablet ignores touch on one edge." A cracked digitizer; replace the screen assembly.

## What to memorize
- The reasoning shape: what changed, the simplest theory, the cheapest test, the fix, the verification, the prevention, the note.
- Environment for clusters of failures; the change for single failures; safe mode and external monitor as isolation tests; degraded means act now; damage location points to the part.`,

u9l1: `## Sort the complaint first
"The network is slow" can mean the Wi-Fi drops, a file copy crawls, a video call stutters, or a website will not load. Each is a different symptom with a different cause list. Get the user to describe what exactly happens, when, and whether it is one device or many, and the diagnosis is half done.

## Symptom to cause, wired and wireless
\`\`\`
symptom                            likely causes                                              first check
no connectivity, link light off    cable, port, NIC, adapter disabled                          known-good cable and port
limited connectivity, APIPA        no DHCP reply: cable, VLAN, DHCP server or scope exhausted, captive portal   ipconfig; link; VLAN; server
address fine, nothing loads        gateway, DNS, proxy                                          ping gateway, then 8.8.8.8, then a name
slow network speeds (wired)        congestion; duplex or speed mismatch; wrong cable category; failing NIC; hub; ISP saturation   NIC's negotiated speed; cable; who is hogging bandwidth
slow network speeds (wireless)     distance; congested channel; old client slowing the AP; 2.4 GHz; interference   analyzer; move to 5 GHz; separate legacy clients
intermittent wireless connectivity weak signal; interference; channel overlap; roaming; power saving on the adapter; overloaded AP   signal level; channel plan; driver power settings
intermittent internet              ISP; modem; router overheating or failing; DNS               modem lights and logs; test directly at the modem
port flapping                      bad cable or connector; failing NIC or SFP; speed/duplex mismatch; bad port; loop   replace cable; move port; check switch log
high latency                       congestion; distant or slow link; satellite; saturated uplink   ping and traceroute
jitter                             variable latency: congestion, Wi-Fi                        ping variance; move voice to wired
poor VoIP quality                  jitter, latency, packet loss, Wi-Fi phones, no QoS          voice VLAN with QoS; wired phones; uplink capacity
external interference (2.4 GHz)    microwaves, cordless phones, Bluetooth, neighbors' Wi-Fi     move to 5 GHz; change channel; relocate AP
external interference (wired)      motors, fluorescent ballasts, cable next to power lines      shielded cable; reroute
authentication failures            wrong key; expired certificate; RADIUS down; MAC filter; account locked; time skew   credentials; clock; server status
\`\`\`

## Duplex mismatch explained
A link has two settings: speed (100 Mb/s or 1 Gb/s) and duplex (half: one direction at a time; full: both). Both ends should auto-negotiate. If one side is forced to full duplex and the other is left on auto, the auto side falls back to half duplex, and the link "works" but drops frames constantly: late collisions, a crawl on large transfers, error counters climbing on the switch port. Set both ends to auto or both to the same fixed values.

## Port flapping, step by step
A flapping port logs "link up, link down" every few seconds. The switch may put it in an error-disabled state. Replace the patch cable (the cause in most cases), then reseat or replace the SFP on fiber, then move the device to another port, then swap the NIC. A flap that appears when someone plugs a second cable between two switches, or between two wall jacks, is a loop; spanning tree should block it, and the fix is to remove the cable.

## Voice, and why it is special
Voice packets are small, frequent, and time-sensitive. A file transfer can wait for a retransmission; a voice packet that arrives 200 ms late is useless. Latency above about 150 ms one way makes talking awkward, jitter makes speech robotic, and packet loss makes words drop. QoS marks voice traffic and lets switches and routers send it first; a voice VLAN separates phones from data and applies QoS automatically. Phones on Wi-Fi inherit every wireless problem, so wired phones with PoE are the standard.

## Interference, the usual suspects
\`\`\`
source                         affects                fix
microwave oven                 2.4 GHz, when running  5 GHz; move the AP away from the kitchen
cordless phones, baby monitors 2.4 GHz                5 GHz; replace the devices
Bluetooth                      2.4 GHz, lightly       5 GHz
neighboring Wi-Fi              same or overlapping channel   channel plan 1, 6, 11; 5 GHz
motors, elevators, ballasts    unshielded copper nearby   STP; reroute; fiber
power cables in the same tray  copper runs            separate trays; cross at right angles
\`\`\`

## Authentication, sorted by scope
One user cannot authenticate: their password, their account (locked or expired), their certificate, or their device's MAC (filtering). Everyone cannot authenticate: the RADIUS server, the certificate on the server (expired), or the time. Kerberos and certificates tolerate only a few minutes of clock difference; a PC with a dead CMOS battery cannot log in to the domain, and a RADIUS server with a wrong clock rejects everyone.

## Worked example: the slow wired desktop
A desktop copies files at a fraction of the speed of the PC beside it. Its NIC reports 100 Mb/s half duplex. The switch port was hard-set to 100 full by a previous technician; the PC auto-negotiated to half. Set the port back to auto; the link comes up at 1 Gb/s full duplex; the copy runs twenty times faster.

## Worked example: the flaky conference room
Wi-Fi in the conference room drops during meetings. The analyzer shows the room's AP on channel 6 with a neighbor's AP on channel 8 at similar strength, and 30 clients on one AP. Move the AP to channel 1 (or to 5 GHz), and add a second AP for the room's load. Drops stop.

## How the exam asks it
- "A workstation shows an address of 169.254.10.20." No DHCP server reachable.
- "A wired PC is far slower than its neighbors and the NIC shows 100 Mb/s half duplex." Duplex or speed mismatch on the switch port.
- "A switch log shows a port going up and down repeatedly." Port flapping; replace the cable first.
- "VoIP calls are choppy while file downloads are fine." Jitter; implement QoS and a voice VLAN.
- "Wi-Fi drops whenever the break room microwave runs." 2.4 GHz interference; move to 5 GHz.
- "No user can join the enterprise Wi-Fi this morning." The RADIUS server or its certificate, or time skew.

## What to memorize
- The symptom table. APIPA = no DHCP. Slow wired = negotiated speed and duplex, cable category. Flapping = cable, then port, then NIC; loops.
- Latency, jitter, loss: voice needs QoS, a voice VLAN, wired phones.
- Interference sources on 2.4 GHz and on copper. Authentication: one user (credentials) versus everyone (server, certificate, clock).`,

u9l2: `## The page is the evidence
A printed page records exactly what the engine did to it. A vertical line means something on a rotating part; a repeating mark at a fixed interval means a roller of that circumference; a smear means the toner never bonded; a ghost means the drum remembered. Read the page, then check the part.

## Defect to part, laser
\`\`\`
defect                              part or setting                                fix
vertical line, thin and sharp       scratched drum; dirty laser scanner window     replace the drum or cartridge; clean the window
vertical band, wide                 low or clumped toner; dirty transfer roller    shake or replace toner; clean or replace the roller
horizontal lines or bands           worn drum; fuser; a damaged gear               drum; fuser; service
repeating marks at a fixed interval the roller with that circumference (drum, fuser, transfer)   match the spacing to the part; replace it
speckling                           loose toner; leaking cartridge; dirty path     toner vacuum; replace the cartridge
double or echo images (ghosting)    worn cleaning blade; dead erase lamp; worn drum; contaminated fuser   replace the drum unit; fuser
toner not fusing (smears, flakes)   fuser failed or cold; wrong paper type setting; wrong paper   paper setting; fuser or maintenance kit
faded prints                        low toner; draft or economy mode; worn transfer roller; low humidity; damp paper   toner; quality setting; maintenance kit
gray background                     worn drum; charge roller; high humidity       drum; charge roller
blank pages                         toner seal tape not removed; empty cartridge; failed laser or transfer   remove the tape; replace; service
garbled print                       wrong driver or language; corrupted job; bad cable; printer NIC; low memory   correct driver; cancel the job; cable; memory
incorrect color settings            empty color cartridge; grayscale in the driver; calibration needed; profile   cartridge; driver; calibrate
incorrect chroma display            color space mismatch between screen and printer   calibrate both; use the paper profile
incorrect page orientation          driver or application setting; tray paper size; duplex binding edge   settings
\`\`\`

## Defect to part, inkjet
\`\`\`
defect                          cause                                    fix
missing lines, gaps in text     clogged nozzles                          head cleaning cycle (repeat once or twice)
streaks or smears               dirty head; too much ink for the paper   clean; correct paper setting
misregistered colors, jagged text   heads out of alignment               alignment routine
wrong or missing color          empty cartridge; clogged color nozzles   replace; clean
faded                           low ink; draft mode                      replace; quality setting
smears when fresh               normal until dry; wrong paper            let dry; use the right paper
\`\`\`

## The repeating-mark trick
A mark that repeats down the page at the same spacing comes from a roller whose circumference equals that spacing. Drums, fuser rollers, and transfer rollers each have known circumferences listed in the service manual (often roughly 75 to 95 mm for a drum, 50 to 80 mm for a fuser). Measure the interval with a ruler and the manual names the part. The exam does not ask for the numbers, but it does ask "a mark repeats every few inches" and expects "a roller or the drum."

## Fusing, in more depth
The fuser must reach about 180 C and apply pressure. Heavy stock, glossy paper, and envelopes need more heat; if the driver or the panel says "plain" while heavy paper is loaded, the toner will not bond and smears. Correct the paper type first. A fuser that never heats gives smears on every page and eventually an error code; a fuser with a torn film or roller gives smears plus wrinkles or a repeating mark. Fusers wear; they are the centerpiece of the maintenance kit.

## Garbled output, diagnosed
Pages of symbols, a single line like "%!PS-Adobe" or "@PJL," or hundreds of pages of one character each mean the printer received data it could not interpret. Causes in order of likelihood: the driver (a PostScript driver for a PCL printer or the reverse, or a corrupted driver), a corrupted spool file (cancel the job and clear the queue), a bad or overlong USB cable, a failing network interface on the printer, or a page too complex for the printer's memory. Print the printer's internal test page: if it is clean, the engine is fine and the problem is upstream.

## Worked example: the fading copier
A busy copier's prints are faded on one side of the page. Toner is at 60 percent. The transfer roller is worn unevenly, and the page count is past the maintenance interval. Apply the maintenance kit (transfer roller, fuser, rollers, pads), reset the counter, calibrate. Prints are even. Had the fade been uniform and the toner low, a new cartridge would have been the answer; had draft mode been on, a setting.

## Worked example: the mystery ghost
Every page shows a faint copy of the previous page's header. Ghosting: the drum is not being cleaned or discharged. The drum unit is at the end of its life. Replace it. If the ghost had been of the same page's own content, offset by a few centimeters, the fuser would be the suspect.

## How the exam asks it
- "Print smears when rubbed." Fuser.
- "A faint duplicate image appears lower on the page." Ghosting: drum, cleaning blade, or erase lamp.
- "A thin vertical line appears on every page." Scratched drum (or a dirty scanner window).
- "Random specks of toner cover pages." Loose toner; clean and check for a leaking cartridge.
- "Prints have become uniformly light." Low toner or economy mode; then the transfer roller.
- "Jobs print as pages of random characters." Wrong driver or language; corrupted job.
- "Inkjet text has horizontal gaps." Clean the print head.
- "Pages print in landscape when portrait was expected." Driver or application orientation setting.

## What to memorize
- Lines: drum or scanner window; wide bands: toner or transfer roller; repeating marks: a roller.
- Speckling: loose toner. Ghosting: drum and cleaning. Smearing: fuser or paper type. Faded: toner, draft mode, transfer roller.
- Garbled: driver or language, job, cable, memory. Color: cartridge, grayscale setting, calibration. Orientation: settings.
- Inkjet: clean for gaps, align for misregistration. The internal test page separates engine from driver.`,

u9l3: `## Paper path, queue, wire
The three remaining printer problem families follow the three things a job passes through: the paper path inside the printer, the queue on the computer or server, and the connection between them. Each family has a first move that solves most cases.

## Paper path faults
\`\`\`
symptom                          causes                                                       first move
paper jams                       worn pickup rollers or separation pad; damp, curled, or wrong paper; overfilled tray; guides wrong; debris; duplexer   clear in the direction of travel; check for scraps; fan and reload; inspect rollers
repeated jams in one spot        a worn or damaged part at that spot; a scrap; a sensor        replace the part there; clean sensors
multipage misfeed                worn separation pad; humid or static-stuck paper; overfilled tray   replace the pad (kit); fan the paper; store dry
paper not feeding                glazed or dirty pickup rollers; tray misseated; wrong size setting; sensor flag stuck   clean or replace rollers; reseat tray; set size
paper tray not recognized        tray not fully seated; size dial or sensor unset; loose connector on an optional tray; firmware or driver unaware of the tray   reseat; set size; update firmware; add the tray in driver options
grinding noise                   worn gears or rollers; drum drive; a foreign object; end of maintenance interval   locate with doors open; remove object; maintenance kit
\`\`\`
Rollers are rubber and wear smooth (glazed); a glazed roller slips instead of gripping. Cleaning with isopropyl restores grip for a while; replacement is the real fix. The separation pad is the small rubber pad under the pickup roller that holds back the second sheet; when it wears, two or three sheets go at once.

## Clearing a jam properly
1. Open every door the panel indicates; note where the printer says the jam is.
2. Pull the sheet slowly in the direction the paper normally travels; pulling backward against rollers tears it and leaves scraps.
3. Look for torn pieces; a scrap left inside causes the next jam.
4. Fan the stack, square it, set the guides snugly, do not overfill past the mark, and use paper that is dry and the right weight.
5. Close the doors; the printer resumes or reprints the jammed page.
Laser fusers are hot; wait or use the handles. Toner on an unfused jammed sheet is loose; do not shake it around.

## Queue faults
\`\`\`
symptom                                   causes                                       first move
multiple prints pending, nothing printing  a stuck job; spooler hung; printer offline or paused; driver fault   cancel the head job; check the printer's panel and online state
frozen queue (cannot cancel)              spooler service hung                          restart the print spooler; clear the spool folder
works for some users, not others          queue permissions; driver mismatch            permissions; reinstall the driver on the client
job prints later or twice                 a stuck job finally cleared; user resent      clear the queue; educate
\`\`\`
The spooler is the OS service that accepts jobs, stores them as files, and feeds the printer. When a job's file is corrupted, the spooler can hang trying to send it; nothing behind it moves. Stop the service, delete the files in the spool folder, start the service. On a print server, do it on the server; on a directly connected printer, on the client.

## Connectivity faults
\`\`\`
symptom                                    causes                                                     first move
printer offline (network)                  IP changed (DHCP, no reservation); printer asleep; Wi-Fi password changed; cable or port; firewall blocking; wrong port on the client   print the configuration page; compare the IP with the client's port
printer disappears (USB)                   cable, port, driver                                        another cable and port
wireless printer drops                     weak signal; router reboot changed addresses; band steering   reservation; stronger signal; fixed band
cannot scan to folder or email             credentials; share path; SMTP settings; firewall            update credentials or settings
\`\`\`
The configuration page is the printer's own statement of its address, its gateway, and its firmware version; it takes one button press and settles "what IP does it think it has." The permanent fix for wandering addresses is a DHCP reservation or a static address.

## Finishing faults
\`\`\`
symptom                     causes                                    first move
staple jam                  bent staple; empty cartridge; wrong stack thickness   clear the stapler head; replace the cartridge
hole punch jam              full chip box; misfeed into the punch     empty the box; clear the punch
booklet misfold             wrong paper size or setting; worn folder  settings; service
finisher not detected       loose connector; firmware; driver options  reseat; update; enable the finisher in the driver
wrong staple position       orientation and binding edge in the driver   change the finishing options
\`\`\`

## Worked example: the Monday queue
Monday morning, nobody can print to the department printer; the queue on the server shows forty jobs pending and the first one at "printing" for two hours. The printer's panel shows "ready." Cancel the first job: it will not cancel. Restart the spooler on the server and clear the spool folder; the remaining jobs print. The stuck job was a corrupted PDF from Friday evening. Prevent: update the driver, which had a known issue with that file type.

## Worked example: the double feeder
A laser printer pulls two or three sheets on every job from tray 2, and the pages jam at the fuser. The separation pad in tray 2 is worn smooth and the page count is past the maintenance interval. Install the maintenance kit (rollers, pads, fuser, transfer roller), reset the counter, and use fresh, dry paper. Single sheets feed normally.

## How the exam asks it
- "A printer pulls multiple sheets at once." Replace the separation pad and rollers (maintenance kit).
- "A printer's queue shows several jobs pending and none printing." Cancel the stuck job; restart the print spooler.
- "A network printer goes offline every few days and returns with a different address." Set a reservation or static IP.
- "A newly installed second tray is not recognized." Reseat it, set the paper size, and enable it in the driver or firmware.
- "A laser printer grinds during printing." Worn gear or roller, or a foreign object; maintenance.
- "Stapled sets come out with the staple in the wrong corner." Orientation and finishing settings in the driver.

## What to memorize
- Jams: direction of travel, scraps, fan, guides, rollers and pad. Multipage: separation pad. Not feeding: pickup rollers. Tray: reseat, size, options. Grinding: gear, roller, object.
- Queue: cancel, restart the spooler, clear the spool folder, printer status. Offline: configuration page, reservation, sleep, cable, firewall.
- Finishing: clear staples and punch, refill, finisher options in the driver.`

});
