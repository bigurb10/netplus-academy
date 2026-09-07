// APlus Academy Core 2 deeper explanations, units 1 to 3. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u1l1: `## Operating systems as languages
Think of each operating system as a language and each filesystem as an alphabet. A program is written in one language; a disk is written in one alphabet. Windows speaks Windows and reads NTFS, FAT32, and exFAT. Linux speaks Linux and reads ext4, XFS, and the FAT family, and can be taught NTFS. macOS speaks macOS and reads APFS, HFS+, FAT32, and exFAT, and can read NTFS but not write it without help. Compatibility questions are always "does this side speak that language or read that alphabet?"

## Where each OS lives
\`\`\`
OS          hardware                      strengths                              management
Windows     any PC                        business software, games, domains       Active Directory, Group Policy, Intune
Linux       any PC, servers, embedded     free, servers, developers, appliances   command line, configuration management
macOS       Apple Macs only               design, media, Apple ecosystem          Apple Business Manager, MDM
Chrome OS   Chromebooks                   cheap, simple, cloud-first, schools     Google Admin console
iOS/iPadOS  iPhone, iPad                  closed, consistent updates              MDM, Apple Business Manager
Android     many phone and tablet makers  open, flexible, sideloading possible    MDM; updates vary by maker
\`\`\`

## Filesystems, what to pick
\`\`\`
filesystem   made for            file size limit   permissions   journaling   read by
NTFS         Windows             huge              yes           yes          Windows; macOS read-only; Linux with drivers
ReFS         Windows Server, Pro for Workstations   huge   yes     integrity streams   Windows only
FAT32        universal, old      4 GB              no            no           everything
exFAT        big removable media huge              no            no           Windows, macOS, Linux, cameras, consoles
ext4         Linux               huge              yes           yes          Linux
XFS          Linux, big data     huge              yes           yes          Linux
APFS         Apple               huge              yes           copy-on-write   macOS, iOS
\`\`\`
Decision rules: formatting a USB stick that will move between a Mac and a PC with video files over 4 GB means exFAT; a Windows system drive means NTFS; a camera card usually wants FAT32 or exFAT per the camera; a Linux root means ext4 (or XFS on Red Hat).

## Life cycles, drawn
\`\`\`
release --- mainstream support (features and fixes) --- extended support (security only) --- end of life (nothing)
Windows 10: released 2015, ended October 2025. Phones: typically 3 to 7 years of updates depending on the maker.
\`\`\`
"Update limitations" are the reasons a device stops getting the next version before EOL: the CPU is not on the list, there is no TPM, the storage is too small, the edition does not qualify, or the vendor decided the model is done. The security domain calls an EOL system a vulnerability and the answer is replacement or isolation.

## Compatibility, worked
- A user brings a Linux-formatted external drive to a Windows PC: nothing appears in File Explorer, and Disk Management shows a healthy partition with no letter and an unknown filesystem. Windows cannot read ext4. Reformat to exFAT (after copying the data on a Linux machine), or install a third-party ext4 driver.
- A company buys 64-bit-only accounting software, and three old machines run 32-bit Windows 10. The software will not install. Those machines need a clean install of 64-bit Windows (if the CPU supports it) or replacement; a 32-bit OS cannot run 64-bit programs.
- A designer's macOS application has no Windows version. Options: a virtual machine running macOS is not licensed on non-Apple hardware, so the answer is a Mac, a web version, or an equivalent Windows application.
- A file named Report.TXT and report.txt coexist on a Linux server; a Windows client sees one overwrite the other. Case sensitivity differs; rename.

## How the exam asks it
- "Which filesystem should a technician use for a 64 GB flash drive that must hold 8 GB files and work on Windows and macOS?" exFAT.
- "Which filesystem supports file permissions and encryption on Windows?" NTFS.
- "Which OS is designed around a browser and cloud storage?" Chrome OS.
- "A system that no longer receives security patches is described as?" End-of-life.
- "Which Linux filesystem is the default on most distributions?" ext4.
- "Which Apple filesystem replaced HFS+?" APFS.

## What to memorize
- The OS table: who makes it, where it runs, apt versus dnf, App Store, Admin console.
- The filesystem table, especially FAT32's 4 GB limit, exFAT for cross-platform media, NTFS features, ReFS resilience, APFS for Apple.
- EOL and update limitations. 64-bit runs 32-bit, not the reverse. Shared media needs a shared filesystem.`,

u1l2: `## Editions are feature keys
Every Windows installation is the same code; the product key unlocks an edition. Home unlocks the consumer set, Pro adds the business set, Enterprise and Pro for Workstations add the large-organization and high-end sets. When a feature is missing, the first question is "which edition is this?" (Settings, System, About, or winver).

## The feature matrix
\`\`\`
feature                    Home     Pro      Pro for Workstations   Enterprise
join a domain              no       yes      yes                    yes
BitLocker                  no       yes      yes                    yes
Remote Desktop host        no       yes      yes                    yes
Group Policy Editor        no       yes      yes                    yes
Hyper-V                    no       yes      yes                    yes
ReFS                       no       no       yes                    yes
AppLocker, DirectAccess    no       no       no                     yes
RAM limit (64-bit)         128 GB   2 TB     6 TB                   6 TB
CPU sockets                1        2        4                      2 (4 on some)
licensing                  retail/OEM   retail/OEM/volume   retail/OEM   volume
\`\`\`
Every edition can run the Remote Desktop client; every edition receives the same security updates; every edition runs the same applications. The differences are management, security, and scale.

## N editions and desktop styles
N editions exist because of a European competition ruling: Windows without Media Player and related codecs, sold in Europe. The Media Feature Pack restores them. Desktop style differences between Windows 10 and 11 are cosmetic (centered taskbar, redesigned Start, Settings replacing more of Control Panel, widgets, snap layouts) but appear in questions as "identify the version from the screenshot."

## Upgrade paths, drawn
\`\`\`
Windows 10 Home  --edition upgrade (Pro key)-->  Windows 10 Pro
Windows 10 (any) --in-place upgrade, hardware permitting-->  Windows 11 same edition
Windows 10 Pro   --in-place-->  Windows 11 Pro (not Windows 11 Home: no downgrades)
32-bit Windows   --clean install only-->  64-bit Windows
Windows 7 or 8.1 --in-place to 10 was possible; to 11 requires 10 first or a clean install
\`\`\`
An in-place upgrade keeps files, applications, and settings and offers rollback for about ten days. A clean install wipes; back up first. The choice is a clean install when the machine is troubled, when changing architecture, or when you want a fresh baseline.

## Windows 11 requirements, and what they mean in a shop
\`\`\`
requirement                  why                                   what to do when it fails
TPM 2.0                      key storage, BitLocker, attestation   enable fTPM or PTT in UEFI; add a TPM module; or the board lacks it
UEFI, Secure Boot capable    modern boot chain                      switch firmware from legacy to UEFI (needs GPT); convert with MBR2GPT
64-bit dual-core 1 GHz CPU on the supported list   security features in newer CPUs   nothing; the machine is not eligible
4 GB RAM, 64 GB storage      minimums                               add RAM; larger drive
720p display, internet and Microsoft account for Home setup   setup design   use Pro for local accounts, or a workaround
\`\`\`
The PC Health Check tool reports which requirement fails. Most "not eligible" machines from 2017 or later just need the TPM and Secure Boot switched on in firmware.

## Worked examples
- A small business bought laptops with Windows 11 Home and wants them on the domain. Home cannot join. Buy Pro upgrade keys and apply them in Settings, Activation; the upgrade is in place and keeps everything.
- A user wants to reach their desktop from home with Remote Desktop. The desktop runs Home, so it cannot host RDP. Options: upgrade to Pro, or use a third-party remote access tool.
- A data analyst's workstation has 256 GB of RAM and Windows 10 Pro. Pro's 2 TB limit is fine; Pro for Workstations would matter only for ReFS, persistent memory, or a fourth CPU.
- An old PC with a 32-bit installation must move to 64-bit for new software. Clean install; there is no in-place path.

## How the exam asks it
- "A user cannot enable BitLocker. Most likely reason?" Windows Home.
- "Which edition supports ReFS and four processors?" Pro for Workstations.
- "Which upgrade keeps files, applications, and settings?" In-place upgrade.
- "What is required to upgrade a PC to Windows 11?" TPM 2.0 and UEFI with Secure Boot, a supported 64-bit CPU, 4 GB RAM, 64 GB storage.
- "What distinguishes an N edition?" No media features.
- "Which edition cannot join a domain?" Home.

## What to memorize
- The matrix: Home lacks domain, BitLocker, RDP host, gpedit, Hyper-V; Pro has them; Pro for Workstations adds ReFS, 4 CPUs, 6 TB; Enterprise adds AppLocker, DirectAccess, volume licensing.
- RAM limits 128 GB, 2 TB, 6 TB. RDP client everywhere, host on Pro and up.
- In-place versus clean; 32 to 64 is clean; edition upgrade by key.
- Windows 11: TPM 2.0, UEFI Secure Boot, supported 64-bit CPU, 4 GB, 64 GB.`,

u1l3: `## Installation as a supply chain
An installation starts with media, chooses a method, lays down partitions, and then hands over to the operating system. Each stage has a menu of options, and the exam wants you to pick the right item for the scenario: a hundred identical machines, one corrupted laptop, a disk the installer cannot see, a machine shipped straight to a remote employee.

## Boot methods compared
\`\`\`
method                    when                                                 note
USB                       one machine, on site                                  media creation tool; boot order or one-time boot menu
network (PXE)             many machines in an office                            NIC boots, DHCP points to the deployment server
solid-state or flash      installer or image on an SSD or card                  fast; same as USB in practice
internet-based            no media at hand; cloud recovery                      Reset this PC with cloud download; macOS Internet Recovery
external or hot-swappable drive   an OS on an external SSD, or install from one   USB or Thunderbolt enclosure; dock bays
internal partition        recovery or setup files on the same disk              vendor recovery partitions
multiboot                 two operating systems on one machine                  boot menu (GRUB or the Windows boot manager) picks one
\`\`\`

## Installation types compared
\`\`\`
type                       keeps data?   keeps apps?   scale         typical use
clean install              no            no            one           fresh start, malware cleanup, new disk
upgrade (in-place)         yes           yes           one           new version, same machine
image deployment           n/a (replaces)   baked in   many          identical office PCs
remote network installation   no         no            many          PXE plus a server share
zero-touch deployment      new device    pushed later  many, remote  Autopilot-style self-enrollment
recovery partition         no            factory set   one           restore to factory condition
repair installation        yes           yes           one           fix system files without losing anything
\`\`\`
Third-party drivers are a step inside any of these when the installer cannot see the storage controller: click Load driver and point at a USB stick with the vendor's storage driver.

## Partition styles side by side
\`\`\`
                MBR                                  GPT
firmware        legacy BIOS (or UEFI in CSM mode)    UEFI
partitions      4 primary, or 3 plus extended        128
maximum disk    2 TB                                 effectively unlimited
table backup    none                                 copy at the end of the disk, CRC checked
Windows boot    active primary partition             EFI System Partition (FAT32) plus MSR
convert         MBR2GPT tool without data loss (Windows 10 and later), or diskpart convert (destroys data)
\`\`\`
Formatting is separate from partitioning: after the partition exists, format gives it a filesystem (NTFS for Windows). The Windows installer does both when you choose an unallocated space.

## The upgrade checklist, expanded
1. Back up files and preferences (File History, cloud sync, an image of the disk for the cautious).
2. Application and driver support: check each critical application's vendor for the new version; antivirus, VPN clients, and old printers are the usual casualties; back-compat is not guaranteed.
3. Hardware compatibility: the vendor's checker (Windows 11's PC Health Check); firmware updates from the PC maker first.
4. Feature updates: read what changes in the yearly feature release; pilot on a few machines; defer if a line-of-business app breaks.
5. Product life cycle: install a version with years of support left; do not upgrade into a version near its own EOL.
6. Practical: enough free space (tens of GB), AC power, time, and the product key or a digital license.

## Worked examples
- A school receives 200 identical laptops. Image deployment: prepare one, capture, deploy by PXE or USB; or zero-touch enrollment if the laptops were ordered with Autopilot registration so students unbox them and they configure themselves.
- A remote employee's new laptop arrives at their house. Zero-touch: they sign in, the device enrolls in management, and policies and apps arrive.
- A laptop with a new NVMe controller shows no drives during setup. Load the storage driver from USB.
- A PC upgraded from Windows 10 to 11 crashes constantly; the vendor's utility is not supported yet. Roll back within ten days, or clean install after the vendor ships support.
- A 4 TB disk shows only 2 TB. It was initialized as MBR; reinitialize as GPT (data loss) or convert.

## How the exam asks it
- "Which boot method installs Windows from a deployment server without local media?" Network (PXE).
- "A technician must set up 50 identical PCs. Most efficient method?" Image deployment.
- "A new device configures itself on first boot after the user signs in." Zero-touch deployment.
- "Which partition style is required for a UEFI system to boot?" GPT.
- "How many primary partitions can an MBR disk hold?" Four.
- "Setup cannot see the SSD." Load third-party storage drivers.
- "What should be done before an in-place upgrade?" Back up files and settings and verify application and hardware compatibility.

## What to memorize
- Boot methods and installation types by scenario.
- GPT: UEFI, 128 partitions, over 2 TB. MBR: BIOS, four primaries, 2 TB. Format after partition.
- Upgrade considerations: backup, application and driver support, hardware compatibility, feature updates, product life cycle.`,

u1l4: `## Two checklists
Installing an application is a checklist of requirements and impacts; setting up cloud productivity tools is a checklist of accounts, sync, and licenses. Both objectives produce "what should the technician check first" questions.

## Requirements versus the machine
\`\`\`
requirement                   check on the machine                       consequence of ignoring
32-bit versus 64-bit          Settings, System, About: OS type           64-bit app will not install on 32-bit OS
dedicated graphics and VRAM   Device Manager, Display adapters; dxdiag   crashes, unplayable frame rates, unsupported
RAM                           About; Task Manager Performance            swapping, slowness, out-of-memory errors
CPU                           About; the vendor's list of supported chips slowness or refusal to run (instruction sets)
external hardware token       the USB key present and its driver         software will not start
storage                       free space on the target drive; SSD or HDD  install fails or the app crawls
\`\`\`
Minimum requirements let it run; recommended requirements let people work. Quote the recommended line when buying.

## Compatibility and distribution
\`\`\`
distribution           how it arrives                          technician's step
physical media         DVD or USB from the vendor              insert, run setup; keep the media and key
mountable ISO file     a disk image download                   right-click, Mount; a virtual drive appears; run setup; eject
downloadable package   .exe or .msi from the vendor or a store  verify the hash or signature; run as needed
image deployment       already inside the OS image             nothing per machine; update the image for new versions
\`\`\`
Compatibility mode (right-click the program, Properties, Compatibility) makes Windows imitate an older version for a stubborn program; it is a workaround, not a fix. Apple silicon Macs run Intel apps through a translation layer with a performance cost.

## The four impacts, with questions to ask
\`\`\`
device       Will it run well here? Does it conflict with what is installed? Does it need a driver or a reboot?
network      How much bandwidth for installs and updates? Which ports and servers must be reachable? Does it need a license server?
operation    Who needs training? What downtime? How does support change? What happens to its data in backups?
business     What does licensing cost per seat or per year? Any regulatory or data-residency issue? Is the vendor stable? Who owns the data?
\`\`\`
An application that passes the device check and fails the network check (a license server blocked by the firewall) is a common trouble ticket after rollout.

## Cloud productivity, the technician's tasks
\`\`\`
component                 what to configure                                           common ticket
email systems             sign-in in the client or browser; migration of mailboxes     "my mail stopped syncing": password, license, or the client profile
storage                   sync client; which folders sync; files on demand; local path "my disk is full": everything set to keep local; "file missing": deleted on another device
collaboration tools       spreadsheets, videoconferencing, presentations, word processing, instant messaging; sharing and external access   "cannot share with a customer": external sharing disabled by policy
identity synchronization  directory sync to the cloud tenant; same username everywhere   "cloud password differs from PC password": sync broken or not yet run
licensing assignment      assign each user a license from the pool; groups can auto-assign   "apps say unlicensed": no license or expired subscription
\`\`\`

## Worked examples
- A CAD package requires a dedicated GPU with 4 GB VRAM; the office PCs have integrated graphics. The device impact fails; the fix is a graphics card or a workstation, not a driver update.
- A vendor sends an ISO for a licensing server. Mount the ISO, run the installer, then open the license server's port on the firewall so clients can check out licenses (network impact).
- New hires cannot open cloud email though their accounts exist. Their licenses were never assigned; assign from the admin portal.
- A user's cloud drive fills the laptop. Turn on files on demand and stop syncing the archive folders.

## How the exam asks it
- "A 64-bit application fails to install on a workstation. Most likely cause?" The OS is 32-bit.
- "Which requirement is checked for a video editing application?" Dedicated graphics card and VRAM.
- "A downloaded ISO must be installed. What is the first step?" Mount the ISO.
- "Which impact category covers user training and downtime?" Operation.
- "A new employee cannot use the cloud office apps. First check?" License assignment.
- "Users want one password for the PC and the cloud suite." Identity synchronization.

## What to memorize
- Requirements: 32 versus 64-bit, dedicated graphics and VRAM, RAM, CPU, hardware token, storage.
- Distribution: media, mounted ISO, downloadable package (verify), image deployment.
- Impacts: device, network, operation, business.
- Cloud: email, storage sync and folder settings, collaboration tools, identity synchronization, licensing assignment.`,

u2l1: `## A tool for every question
Windows administration is a set of consoles, each answering one question. The exam gives the question and expects the console, often by its .msc name. Memorize the pairs and the one distinguishing detail for each.

## Task Manager, tab by tab
\`\`\`
tab           question it answers                                    action
Processes     what is running and what is it consuming right now     end task; sort by CPU, memory, disk, network
Performance   how busy is each resource, graphed                     open Resource Monitor
App history   which store apps used the most over weeks
Startup       what launches at sign-in and how much it slows boot     disable
Users         who is signed in and what their sessions use            sign off, disconnect
Details       every process by executable, PID, priority              set priority or affinity, end process tree
Services      which services run and under what PID                   start, stop, open Services console
\`\`\`
Open it with Ctrl+Shift+Esc; it works even when the desktop is unresponsive.

## The snap-ins, by scenario
\`\`\`
scenario                                                   console                       what you would see or do
a service failed overnight; why?                           eventvwr.msc, System log       Error events with the service name and reason
a program crashes on launch                                eventvwr.msc, Application log  faulting module name
who logged on or failed to                                 eventvwr.msc, Security log     audit events 4624 and 4625
a new disk does not appear in File Explorer                diskmgmt.msc                   Not initialized: initialize as GPT, New Simple Volume, format
extend C: into unallocated space                           diskmgmt.msc                   Extend Volume (space must be adjacent)
a hardware device stopped working after an update          devmgmt.msc                    yellow triangle; Roll Back Driver
a device is present but should not be used                 devmgmt.msc                    Disable device (down arrow)
run a cleanup script every Sunday at 2 a.m.                taskschd.msc                   Create Basic Task, weekly trigger, run whether logged on or not
an HTTPS site is not trusted only on this PC               certmgr.msc                    missing or expired root certificate
add a local admin on a standalone Pro machine              lusrmgr.msc                    New User, add to Administrators
find a slow memory leak over a week                        perfmon.msc                    data collector set logging Available MBytes
require 12-character passwords on a standalone PC          gpedit.msc                     Computer Configuration, Windows Settings, Security Settings, Account Policies
\`\`\`

## Event Viewer levels and habits
Levels: Critical (the system could not recover, such as an unexpected shutdown), Error (a problem that did not stop the system), Warning (something to watch), Information (normal events). Filter the log by level and time window around the incident. Custom views collect what you care about. The Source column names the component; the Event ID is what you search for.

## Disk Management vocabulary
\`\`\`
state or action        meaning
Not initialized        brand new disk; choose MBR or GPT
Unallocated            no partition yet; New Simple Volume creates and formats one
Healthy (Primary)      a normal partition
Healthy (Boot, System) the Windows partition and the EFI or system partition
Extend Volume          grow into adjacent unallocated space
Shrink Volume          free space at the end for a new partition
Change Drive Letter    reassign; also mount into an empty NTFS folder
Dynamic disk           software spanning, striping, or mirroring; rarely used now (Storage Spaces instead)
\`\`\`

## Device Manager icons
A yellow triangle with an exclamation mark: the device has a problem (no driver, driver failed, resource conflict). A gray down arrow: disabled by an administrator. A device in "Other devices" with a question mark: unknown, no driver at all. "View, Show hidden devices" reveals ghosts from unplugged hardware. Roll Back Driver is only available if a previous driver exists.

## Worked example
A user reports the PC "freezes for a second every few minutes." Task Manager shows disk at 100 percent in bursts; Resource Monitor names a backup agent scanning files; Event Viewer's Application log shows the agent logging errors about a locked file; Task Scheduler shows the agent's task running every five minutes; the fix is the task's schedule, and Performance Monitor logging disk queue length over the next day proves it.

## How the exam asks it
- "Which tool shows why a service failed to start?" Event Viewer.
- "Which snap-in initializes a new disk?" Disk Management.
- "A technician needs to roll back a driver." Device Manager.
- "Automate a script to run nightly." Task Scheduler.
- "Log processor use over several days." Performance Monitor.
- "Set a local password policy on a Pro workstation." Group Policy Editor.
- "Which Task Manager tab disables programs that launch at login?" Startup.

## What to memorize
- Task Manager tabs and Ctrl+Shift+Esc.
- eventvwr (Application, Security, System; levels), diskmgmt (initialize, unallocated, extend), taskschd, devmgmt (yellow triangle, roll back), certmgr, lusrmgr, perfmon, gpedit; compmgmt bundles them.`,

u2l2: `## Six specialists
These utilities each do one job that the consoles do not. Learn the executable name, because the exam gives the name and asks the job, or gives the job and asks the name.

## The table
\`\`\`
executable      name                    job                                                    the detail to remember
msinfo32.exe    System Information      read-only inventory of hardware, firmware, drivers, software   shows BIOS mode (legacy or UEFI) and Secure Boot state; export to a file
resmon.exe      Resource Monitor        live per-process CPU, memory, disk, network            which process has a file open; which process is hammering the disk
msconfig.exe    System Configuration    boot options, safe boot, selective startup, services   clean boot: hide all Microsoft services, disable the rest
cleanmgr.exe    Disk Cleanup            delete temporary and leftover files                    Clean up system files removes the previous Windows installation
dfrgui.exe      Optimize Drives         defragment HDDs, TRIM SSDs, on a weekly schedule       never force-defragment an SSD
regedit.exe     Registry Editor         edit the settings database                             HKLM machine, HKCU user; export the key before changing
\`\`\`

## msinfo32 in practice
The System Summary answers the questions that otherwise need a reboot into firmware: BIOS Mode (Legacy or UEFI), Secure Boot State (On, Off, Unsupported), BaseBoard model, installed physical memory, virtualization enabled in firmware, Kernel DMA protection. Components lists every device with its driver version and problem codes. Software Environment lists drivers, services, startup programs, and environment variables. Vendors ask for an NFO export.

## resmon in practice
The Disk tab shows every process with read and write bytes per second and the files involved; the Response Time column exposes a dying disk. The CPU tab's Associated Handles search finds which process is locking a file you cannot delete. The Network tab's Listening Ports lists what is waiting for connections and which process owns it, the graphical netstat. The Memory tab's Hard Faults per second climbing means the machine is paging.

## msconfig in practice
\`\`\`
tab        use
General    Normal, Diagnostic, or Selective startup
Boot       default OS, timeout, Safe boot (Minimal, Alternate shell, Network), No GUI boot, Boot log
Services   check Hide all Microsoft services, then Disable all: the clean boot; re-enable in halves to find the culprit
Startup    a link to Task Manager
Tools      shortcuts to the other utilities
\`\`\`
Safe boot from here is how you get into safe mode on a machine that boots too fast to interrupt; remember to uncheck it afterward or the machine keeps booting to safe mode.

## cleanmgr, dfrgui, and Storage Sense
Disk Cleanup's ordinary list frees a few gigabytes; Clean up system files adds Windows Update Cleanup and Previous Windows installation(s), which can free 20 to 40 GB after a feature update (and removes the ability to roll back). Storage Sense in Settings runs similar cleanup automatically. Optimize Drives shows each volume's media type; Analyze on an HDD reports fragmentation; Optimize defragments an HDD or sends TRIM to an SSD. A weekly schedule is on by default.

## regedit, safely
\`\`\`
hive                    holds
HKEY_LOCAL_MACHINE      machine-wide: SOFTWARE, SYSTEM (services, drivers), HARDWARE, SECURITY
HKEY_CURRENT_USER       the signed-in user's settings; a view into HKEY_USERS
HKEY_USERS              every loaded user profile
HKEY_CLASSES_ROOT       file associations and COM classes (merged view)
HKEY_CURRENT_CONFIG     the current hardware profile
\`\`\`
Values: REG_SZ (text), REG_DWORD (32-bit number), REG_QWORD, REG_BINARY, REG_MULTI_SZ, REG_EXPAND_SZ. Before any change: File, Export the key (a .reg file), or create a restore point. A .reg file double-clicked merges its contents into the registry, which is how vendors distribute fixes and how malware distributes persistence. Group Policy sets registry values under the hood, so prefer it for many machines.

## Worked examples
- A vendor says "your system must be in UEFI mode with Secure Boot on." msinfo32 shows Legacy and Unsupported: the disk is MBR; convert with MBR2GPT and switch the firmware.
- A file cannot be deleted because it is in use. resmon, CPU tab, Associated Handles, search the file name, end the process.
- An application crashes only on one PC. msconfig clean boot; it works; re-enable services in halves; the culprit is a third-party audio service.
- A laptop's 128 GB SSD is full after the Windows 11 upgrade. cleanmgr, system files, previous installation: 25 GB back.
- A five-year-old desktop with an HDD is slow to open files. dfrgui shows 30 percent fragmented; optimize.
- A support article says set a DWORD under HKLM\\SOFTWARE\\Vendor. regedit, export the key first, add the value, restart the service.

## How the exam asks it
- "Which utility shows whether Windows is booting in UEFI mode?" System Information (msinfo32).
- "Which tool identifies which process is using a file?" Resource Monitor (resmon).
- "Which tool configures the PC to boot into safe mode on the next restart?" System Configuration (msconfig).
- "Which tool removes the previous Windows installation to free space?" Disk Cleanup (cleanmgr).
- "Which tool should not be used to defragment an SSD?" Disk Defragmenter (dfrgui optimizes with TRIM instead).
- "What should be done before editing the registry?" Export the key or create a restore point.

## What to memorize
- The six pairs: msinfo32 inventory and firmware mode; resmon live per-process and handles; msconfig safe boot and clean boot; cleanmgr temporary files and Windows.old; dfrgui HDD defrag and SSD TRIM; regedit hives, export first.`,

u2l3: `## Commands as verbs
Each command is a verb with a few adverbs (switches). The exam tests the verb ("which command shows the MAC address") and a handful of adverbs ("which switch renews the DHCP lease"). Group them by what they act on.

## Navigation and files
\`\`\`
command      does                                        adverbs
cd           change directory                            cd .. up; cd \\ root; cd alone shows the path; D: changes drive
dir          list                                        /a all including hidden; /s recursive; /p page; /w wide; /o sort
md, mkdir    make directory
rmdir, rd    remove directory                            /s with contents; /q quiet
copy, xcopy  copy files, copy trees (legacy)
robocopy     robust copy of trees                        /e all subfolders; /mir mirror (deletes extras at the destination); /copyall include permissions; /r:n retries; /log:file
\`\`\`

## Network
\`\`\`
command      does                                        adverbs and reading the output
ipconfig     adapter addresses                           /all shows MAC, DHCP server, lease times, DNS; /release and /renew redo the lease; /flushdns clears cached names; /displaydns shows them
ping         echo request and reply                      -t until stopped; -n count; -a resolve; -l size; 127.0.0.1 tests the stack; "request timed out" means no reply; "destination host unreachable" means no route
tracert      hops to a destination                       -d no name resolution; the first hop is your gateway; stars mean no reply from that hop
pathping     tracert plus loss statistics per hop        takes minutes; shows where packets die on an intermittent link
netstat      connections and listening ports             -a all; -n numeric; -o process ID; -b program name (admin); -r routing table
nslookup     DNS query                                   nslookup name; nslookup name server; set type=mx for mail records
net use      map drives and connect to shares            net use X: \\\\server\\share; /user:domain\\name; /persistent:yes; net use X: /delete; net use * /delete
\`\`\`

## Disk
\`\`\`
command      does                                        notes
chkdsk       check and repair a filesystem               /f fix errors; /r find bad sectors and recover data (slow); /x dismount first; system drive schedules at next boot
format       write a filesystem                          format E: /fs:ntfs /q; destroys data; asks for confirmation
diskpart     command-line disk management                list disk; select disk n; list partition; clean; convert gpt; create partition primary; format fs=ntfs quick; assign letter=E; active
\`\`\`
Diskpart's clean is the fastest way to erase a stubborn USB stick and the fastest way to destroy the wrong disk; read the list disk output twice.

## Informational
\`\`\`
command          shows
hostname         the computer name
whoami           domain\\user; /groups the memberships; /priv the privileges
winver           the About dialog with version and build
net user         local accounts; net user name (details); net user name pass /add; /delete; /active:no; net user name * prompts for a password
systeminfo       OS, boot time, hotfixes, domain, memory (not on the list but common)
command /?       help for any command
\`\`\`

## OS management
\`\`\`
command      does                                        notes
gpupdate     refresh Group Policy now                    /force reapplies every setting; /target:computer or user; may prompt to log off or reboot
gpresult     report applied policies                     /r summary for the user and computer; /h file.html full report; /scope user
sfc          System File Checker                         /scannow verifies and repairs protected files; /verifyonly reports; run elevated; log in CBS.log
DISM         Deployment Image Servicing and Management   /online /cleanup-image /checkhealth, /scanhealth, /restorehealth repairs the component store sfc draws from
shutdown     power control                               /r restart; /s shut down; /t seconds; /f force apps closed; /a abort; /m \\\\pc remote
\`\`\`
The sfc and DISM pairing: if sfc reports files it could not repair, run DISM restorehealth (needs internet or a source), then sfc again.

## Worked examples
- "The internet stopped after the network team changed DNS." ipconfig /flushdns, then nslookup a name to confirm the new server answers; if the adapter still shows old servers, ipconfig /release and /renew.
- "Copy a 200 GB user profile to a new PC, keeping permissions, resuming if the network drops." robocopy \\\\old\\c$\\Users\\jane D:\\jane /e /copyall /r:3 /w:5 /log:jane.txt.
- "Port 8080 is already in use and the app will not start." netstat -ano | findstr 8080, then Task Manager Details to find the PID's process.
- "A new policy is not applying to a user." gpupdate /force, then gpresult /r to see whether the GPO is listed and whether it was filtered out.
- "Windows reports corrupted system files." sfc /scannow; if it fails, DISM /online /cleanup-image /restorehealth, then sfc again.
- "A USB stick shows two partitions and will not format." diskpart, list disk, select disk n, clean, create partition primary, format fs=exfat quick, assign.

## How the exam asks it
- "Which command displays the MAC address?" ipconfig /all.
- "Which command shows packet loss at each hop?" pathping.
- "Which command maps a network drive?" net use.
- "Which command repairs bad sectors?" chkdsk /r.
- "Which command forces Group Policy to reapply?" gpupdate /force.
- "Which command repairs protected system files?" sfc /scannow.
- "Which command shows the processes owning network connections?" netstat -b (or -o).
- "Which command creates a folder?" md.

## What to memorize
- Every row of the tables, especially ipconfig switches, pathping, netstat -b and -o, net use syntax, chkdsk /r, diskpart clean, gpupdate /force, gpresult /r, sfc /scannow with DISM.`,

u2l4: `## Two generations of settings
Control Panel is the older layer with tabbed dialogs; Settings is the newer layer with categories. Windows still needs both, and the exam names Control Panel applets by their exact titles. Learn what each applet uniquely owns.

## What each applet uniquely owns
\`\`\`
applet                        unique contents
Internet Options              security zones, proxy under Connections, certificates, trusted sites; affects apps that use the system proxy
Devices and Printers          printer properties, default printer, print queue, add device
Programs and Features         uninstall, installed updates (uninstall a bad KB), Turn Windows features on or off
Network and Sharing Center    Change adapter settings, network profile, advanced sharing settings, diagnose
System                        computer name and domain, remote settings, System Protection (restore points), Advanced: performance, virtual memory, environment variables, startup and recovery
Windows Defender Firewall     on or off per profile, allow an app, advanced inbound and outbound rules
Mail                          Outlook profiles and data files
Sound                         default playback and recording devices, levels, enhancements
User Accounts                 account type, UAC settings, Credential Manager, manage another account
Device Manager                drivers (the same console)
Indexing Options              indexed locations, rebuild
Administrative Tools          the consoles and utilities in one folder
File Explorer Options         hidden files, extensions, protected OS files, open-in behavior
Power Options                 plans, sleep and hibernate timers, lid and button actions, fast startup, USB selective suspend
\`\`\`

## File Explorer Options, View tab, the settings that generate tickets
\`\`\`
setting                                       default   when to change
Show hidden files, folders, and drives        off       to reach AppData, ProgramData, or a hidden config
Hide extensions for known file types          on        turn OFF so the real extension is visible; a security habit
Hide protected operating system files         on        rarely; only for specific repairs
Launch folder windows in a separate process   off       stability when Explorer crashes
Show full path in the title bar              off        convenience
\`\`\`
The classic phishing trick, "invoice.pdf.exe," shows as "invoice.pdf" when extensions are hidden.

## Power states, drawn
\`\`\`
state                   RAM         disk          resume time   power use   risk
sleep (standby, suspend)   powered   nothing saved  seconds       low         battery drains over days; lost work on power failure
hybrid sleep            powered     copy saved    seconds       low         desktop default; safe on power loss
hibernate               off         hiberfil.sys  tens of seconds   none    needs disk space equal to RAM
shut down (fast startup)   off      kernel hibernated   quick boot   none    dual boot and disk access from other OS confused; use Restart to fully reset
shut down (no fast startup)   off   nothing       full boot     none        the true cold boot
\`\`\`
Power plans (Balanced, Power saver, High performance, Ultimate performance) bundle timers and processor settings; Advanced settings expose everything: hard disk turn-off, sleep after, hibernate after, USB selective suspend, lid close action, power button action, processor minimum and maximum, display brightness.

## Worked examples
- "Only one application cannot reach the internet, and it uses the system proxy." Internet Options, Connections, LAN settings: a stale manual proxy.
- "After Tuesday's update the scanner software crashes." Programs and Features, View installed updates, uninstall the KB, then pause updates.
- "The user cannot find the AppData folder." File Explorer Options, View, show hidden files.
- "A USB headset keeps disconnecting after idle." Power Options, advanced, USB selective suspend: disable.
- "A laptop closed and put in a bag was hot and dead the next morning." The lid action was Sleep; set it to Hibernate.
- "A dual-boot machine's Linux side cannot mount the Windows partition." Fast startup left the NTFS volume hibernated; turn fast startup off.
- "Restore the PC to yesterday's state." System, System Protection, System Restore.

## How the exam asks it
- "Where are proxy settings configured in Control Panel?" Internet Options.
- "Where is the paging file size changed?" System, Advanced, Performance settings, Virtual memory.
- "Where can a technician uninstall a recent Windows update?" Programs and Features.
- "Which setting makes file extensions visible?" File Explorer Options, View, uncheck Hide extensions for known file types.
- "Which power state writes memory to disk and powers off?" Hibernate.
- "Which feature speeds boot by hibernating the kernel session?" Fast startup.
- "A USB device disconnects when idle." Disable USB selective suspend.

## What to memorize
- The applet table, especially Internet Options for proxy, System for virtual memory and restore points, Programs and Features for updates and Windows features.
- File Explorer Options View: hidden files, extensions, protected files.
- Sleep versus hibernate versus fast startup; USB selective suspend; lid action; power plans.`,

u2l5: `## Categories as a filing cabinet
The Settings app is a filing cabinet with eleven drawers. The exam opens a drawer by name and asks what is inside, or names a setting and asks which drawer. Learn the drawers and their most-asked contents.

## The drawers
\`\`\`
category                    most-asked contents
System                      Display (resolution, scale, multiple displays), Sound, Notifications, Power and battery, Storage (Storage Sense), Remote Desktop, About (rename, edition, version)
Devices                     Bluetooth pairing, Printers and scanners, Mouse, Touchpad, Typing, Pen, AutoPlay, USB
Network and Internet        Status, Wi-Fi (known networks), Ethernet, VPN, Airplane mode, Mobile hotspot, Proxy, Data usage, Metered connection, Advanced (adapters, reset)
Personalization             Background, Colors, Lock screen, Themes, Fonts, Start, Taskbar
Apps                        Apps and features (uninstall, move), Default apps, Optional features, Startup, Apps for websites
Accounts                    Your info (local or Microsoft), Email and accounts, Sign-in options (PIN, Hello, security key), Access work or school, Family and other users, Sync
Time and Language           Date and time (automatic, time zone, sync now), Region, Language, Speech
Gaming                      Game bar, Captures, Game Mode
Ease of Access              Magnifier, Narrator, High contrast, Text size, Color filters, Captions, Sticky keys, Mouse keys, Eye control
Privacy                     Diagnostics, Activity history, Location, Camera, Microphone, Contacts, Background apps
Update and Security         Windows Update (history, uninstall updates, pause, active hours), Delivery Optimization, Windows Security, Backup, Troubleshoot, Recovery, Activation, Find My Device
\`\`\`
Windows 11 renames some: Bluetooth and devices, Privacy and security (which absorbs Windows Security), and Windows Update becomes its own category; the contents are the same.

## Scenario to drawer
\`\`\`
scenario                                                    drawer
the second monitor shows the wrong resolution               System, Display
a USB stick opens a program automatically                   Devices, AutoPlay (turn off)
a laptop must use the company VPN                           Network and Internet, VPN
a phone hotspot should not download updates                 Network and Internet, Wi-Fi, metered connection
a PDF opens in the wrong program                            Apps, Default apps
a program launches at every login                           Apps, Startup (or Task Manager)
switch a local account to a Microsoft account               Accounts, Your info
add a PIN or fingerprint                                    Accounts, Sign-in options
enroll the PC in the company's device management            Accounts, Access work or school
the clock is an hour wrong                                  Time and Language, time zone or sync now
a user with low vision needs bigger text                    Ease of Access, Text size and Magnifier
the camera works in one app and not another                 Privacy, Camera, allow that app
roll back last week's update                                Update and Security, Windows Update, View update history, Uninstall updates
reset the PC keeping files                                  Update and Security, Recovery
Defender reports it is off                                  Update and Security, Windows Security
\`\`\`

## Control Panel or Settings, decided
\`\`\`
need                                    where
paging file, environment variables      Control Panel, System, Advanced
proxy for legacy apps                    Control Panel, Internet Options (Settings' Proxy sets the same thing)
advanced firewall rules by port          Control Panel, Windows Defender Firewall, Advanced settings
Outlook profiles                         Control Panel, Mail
Bluetooth pairing, AutoPlay              Settings, Devices
sign-in options, work account            Settings, Accounts
Windows Update, Recovery, Activation     Settings, Update and Security
app permissions (camera, microphone)     Settings, Privacy
\`\`\`
Both reach printers (Devices and Printers versus Printers and scanners), network adapters, accounts, and power.

## Worked examples
- A remote worker's laptop syncs gigabytes over a phone hotspot. Settings, Network and Internet, Wi-Fi, the hotspot's properties, Set as metered connection; background sync and non-critical updates pause.
- A teleconference app cannot see the webcam while the browser can. Settings, Privacy, Camera: the app's toggle is off.
- A user must sign in to a company portal that requires the device to be registered. Settings, Accounts, Access work or school, Connect; the device registers or enrolls in MDM.
- After an update, a printer driver misbehaves. Settings, Update and Security, Windows Update, View update history, Uninstall updates, then pause updates for a week.

## How the exam asks it
- "Where is AutoPlay disabled?" Settings, Devices.
- "Where is a VPN connection added?" Settings, Network and Internet.
- "Where does a user add a PIN?" Settings, Accounts, Sign-in options.
- "Where is the default program for a file type changed?" Settings, Apps, Default apps.
- "Where is a microphone permission granted to an app?" Settings, Privacy.
- "Where is Reset this PC?" Settings, Update and Security, Recovery.
- "Where is the time zone set?" Settings, Time and Language.

## What to memorize
- Eleven categories and their headline contents; the scenario-to-drawer table.
- What stays in Control Panel: virtual memory, environment variables, Internet Options, Mail, advanced firewall rules.`,

u2l6: `## A client on a network, step by step
Joining a Windows PC to a network has an order: identity (domain or workgroup), addressing (static or DHCP), firewall profile, then the resources it uses (shares, printers, mapped drives) and the paths it takes (VPN, proxy, cellular). Performance-based questions walk through exactly these screens.

## Identity: domain or workgroup
\`\`\`
                    workgroup                                  domain joined
accounts            local on each PC                           Active Directory, central
policy              local Group Policy per machine             GPOs from domain controllers
sharing             matching local accounts or a shared password   permissions by domain groups
edition             any                                        Pro or above
requirement         none                                       DNS pointing at a domain controller, an account allowed to join
how                 System, Rename this PC (advanced), Change, Member of: Workgroup   Member of: Domain, credentials; or Settings, Accounts, Access work or school, Join this device to a local Active Directory domain
\`\`\`
After joining, users log in as DOMAIN\\user or user@domain; the machine gets a computer account and policies at the next restart.

## Addressing: the four fields
\`\`\`
field          purpose                                         wrong value symptom
IP address     the host's identity on the subnet                duplicate warning; wrong subnet isolates it
subnet mask    which addresses are local                        cannot reach some neighbors or the gateway
gateway        the router for everything not local              LAN works, internet and other subnets do not
DNS server     names to addresses                               ping an address works, ping a name fails
\`\`\`
Set them on the adapter (Network and Sharing Center, Change adapter settings, Properties, Internet Protocol Version 4) or in Settings, Network and Internet, the adapter, IP assignment, Edit. Dynamic (DHCP) for clients; static for servers, printers, and network devices, with the addresses excluded from the DHCP scope. The Alternate Configuration tab supplies a static fallback when DHCP is unavailable.

## Shared resources and paths
\`\`\`
task                                    how
browse a server's shares                File Explorer address bar: \\\\server
open a share                            \\\\server\\share (UNC path)
map a drive with the GUI                This PC, Map network drive, letter, path, Reconnect at sign-in, Connect using different credentials
map a drive at the command line         net use X: \\\\server\\share /user:domain\\name /persistent:yes
remove a mapping                        net use X: /delete
add a shared printer                    Devices and Printers, Add a printer, or open \\\\server and double-click the printer
share a folder from a PC                Properties, Sharing, Advanced Sharing; then NTFS Security permissions
\`\`\`
Network discovery must be on (private profile) for machines to appear under Network; typing the UNC path works even when discovery is off.

## Firewall
\`\`\`
need                                                  action
let an application receive connections               Allow an app through Windows Defender Firewall; tick Private and, if needed, Public
open a port for a service with no app entry          Advanced settings, Inbound Rules, New Rule, Port, TCP or UDP, number, Allow, profiles
block an application from calling out                Advanced settings, Outbound Rules, New Rule, Program, Block
troubleshoot "is the firewall the problem?"          turn it off for one profile briefly, test, turn it back on, then write the correct rule
\`\`\`
Profiles: Domain (automatic when joined), Private, Public. Rules apply per profile, which is why a program works at the office and not at the coffee shop.

## Connections
\`\`\`
type        setup                                                                 typical problem
VPN         Settings, Network and Internet, VPN, Add: provider, server, type (IKEv2, L2TP/IPsec with a pre-shared key, SSTP, PPTP legacy), sign-in; connect from the network flyout   cannot reach internal servers: not connected, split tunnel, or DNS; drops: idle timeout
wireless    pick the SSID; personal passphrase, or enterprise username, password, certificate; Manage known networks to forget   wrong password saved: forget and rejoin; hidden SSID: connect manually
wired       plug in; check the link light; DHCP                                   no link: cable or port; APIPA: DHCP
WWAN        Settings, Network and Internet, Cellular; SIM or eSIM, carrier APN, data plan; mark as metered   no service: SIM, APN, plan, airplane mode
\`\`\`

## Proxy, profile, metered
Proxy: Settings, Network and Internet, Proxy: Automatically detect (WPAD), Use setup script (a PAC URL), or Manual (address, port, exceptions, bypass for local). Network profile: Public (discovery and sharing off, strict firewall) for untrusted networks; Private (discovery and sharing on) for home and office; change it in the network's properties. Metered: on Wi-Fi or cellular properties; limits background data and updates; used for hotspots and capped plans.

## Worked examples
- A new PC on the office network cannot see the file server under Network but can open \\\\server. Discovery is off because the profile is Public; switch to Private.
- A laptop browses at the office and fails at home with "proxy server refusing connections." A manual proxy is set; switch to automatic detection at home or use the company's PAC script that handles both.
- A mapped drive shows a red X every morning until the user double-clicks it. The drive reconnects before the VPN or network is ready; add a logon script that maps it after a delay, or the domain's Group Policy drive mapping with reconnect.
- A remote user connected to the VPN cannot open the intranet by name but can by IP. The VPN connection's DNS is not set to the internal server; fix the VPN adapter's DNS or the split-tunnel DNS settings.
- A user on a cellular laptop burns through the plan. Mark the cellular connection metered; pause sync.

## How the exam asks it
- "Which edition is required to join a domain?" Pro or higher.
- "A PC can reach local devices but not the internet. Which setting is most likely wrong?" Default gateway.
- "Which command maps drive X to a share and reconnects at login?" net use X: \\\\server\\share /persistent:yes.
- "Users cannot connect to a service on a workstation. What should be configured?" A firewall exception for the application or port.
- "Which network profile disables discovery and sharing?" Public.
- "A user on a hotspot wants to limit updates." Metered connection.
- "Which connection type uses a SIM in a laptop?" WWAN (cellular).

## What to memorize
- Domain (Pro, central accounts, DNS at the DC) versus workgroup (local accounts).
- The four address fields and the symptom of each being wrong; static for servers and printers.
- UNC paths, Map network drive, net use syntax; sharing plus NTFS permissions.
- Firewall exceptions per profile; VPN setup fields; wireless, wired, WWAN; proxy modes; public versus private; metered connections.`,

u3l1: `## The Mac, translated
Most Windows concepts have a Mac equivalent, and the exam asks for the Mac name. Learn the translation table, then the Apple-only features.

## Translation table
\`\`\`
Windows                          macOS
Control Panel and Settings       System Preferences (System Settings in recent versions)
File Explorer                    Finder
taskbar                          Dock
Start menu search                Spotlight (Command-Space)
Task Manager end task            Force Quit (Command-Option-Esc) and Activity Monitor
Disk Management                  Disk Utility
BitLocker                        FileVault
Credential Manager               Keychain
File History / Backup            Time Machine
command prompt / PowerShell      Terminal (a Unix shell)
Windows Update                   Software Update; Rapid Security Response for urgent patches
Microsoft account                Apple ID
.exe or .msi installer           .pkg installer; .dmg image with a drag-to-Applications; .app bundle
Program Files                    /Applications
C:\\Users                         /Users
AppData                          ~/Library (hidden)
\`\`\`

## Installing, drawn
\`\`\`
.dmg:  download -> double-click mounts a virtual disk on the desktop -> drag the .app into /Applications -> eject the disk image
.pkg:  download -> double-click runs the Installer wizard -> administrator password -> files placed as the package dictates
.app:  the program is a folder disguised as a file; it runs from wherever it sits; /Applications is the convention
App Store: sign in with an Apple ID -> Get or Buy -> updates automatically
uninstall: drag the .app to the Trash (and empty it) or run the vendor's uninstaller; leftovers may remain in /Library and ~/Library
\`\`\`
Gatekeeper (Privacy and Security) decides whether apps from outside the App Store may run: App Store only, or App Store and identified developers.

## Folders, and who may touch them
\`\`\`
folder             contents                                              writable by
/Applications      apps for everyone                                      administrators
/Users             home folders, one per user                             each user in their own
/Library           system-wide support, preferences, fonts, launch agents administrators
/System            macOS itself                                           nobody (System Integrity Protection)
~/Library          the user's preferences, caches, mail, application support   the user; hidden (Finder, Go, hold Option)
\`\`\`
"Reset an application's settings" means deleting its .plist in ~/Library/Preferences.

## Apple ID, MDM, and best practices
A personal Apple ID unlocks iCloud, the App Store, iMessage, and FaceTime, and syncs Keychain and files. Businesses enroll Macs in MDM through Apple Business Manager, assign managed Apple IDs, and push configuration profiles that restrict the App Store, require FileVault and passcodes, configure Wi-Fi and VPN, and allow remote lock and wipe. Best practices: Time Machine backups (hourly, versioned, to an external disk or a network share), antivirus, prompt updates, and Rapid Security Response patches applied as soon as they appear.

## System Preferences panes and features
\`\`\`
pane                    what you do there
Displays                resolution and scaling, arrangement, brightness, Night Shift
Network                 Wi-Fi, Ethernet, TCP/IP (DHCP or manual), DNS, proxies, VPN
Printers and Scanners   add printers (AirPrint), default printer, scanner setup
Privacy and Security    app permissions, FileVault, firewall, Gatekeeper
Accessibility           VoiceOver, zoom, contrast, keyboard and pointer aids
Time Machine            backup disk and options
\`\`\`
Features: multiple desktops (Spaces) and Mission Control for an overview; Keychain for passwords; Spotlight for search; iCloud with iCloud Drive; iMessage and FaceTime; trackpad gestures; Finder and Dock; Continuity (Handoff, Universal Clipboard, AirDrop, Sidecar) across Apple devices. Utilities: Disk Utility (partition, erase, First Aid), FileVault, Terminal, Force Quit.

## Worked examples
- A user downloaded an app and says "it opens a window with the app and a folder, then nothing installs." That is a .dmg; drag the app into the Applications folder shown, then eject.
- A corporate Mac refuses to open a downloaded tool. Gatekeeper or an MDM restriction; the technician either approves it in Privacy and Security or the policy forbids it.
- A user's Mac was stolen. FileVault protected the data; MDM or Find My can lock and wipe it; Time Machine restores their files to a new Mac.
- An application is frozen. Force Quit with Command-Option-Esc.
- A Mac's disk shows errors. Disk Utility, select the volume, First Aid.

## How the exam asks it
- "Which macOS file type is a disk image?" .dmg.
- "Where do user-specific settings live on a Mac?" /Users/name/Library.
- "Which utility provides full-disk encryption on macOS?" FileVault.
- "Which feature backs up a Mac?" Time Machine.
- "How does a user end a frozen application?" Force Quit (Command-Option-Esc).
- "Which feature stores passwords on a Mac?" Keychain.
- "Which Apple mechanism delivers urgent security fixes between OS updates?" Rapid Security Response.

## What to memorize
- The translation table and the three file types.
- The five folders and ~/Library.
- Apple ID, managed IDs and MDM; Time Machine, antivirus, updates, Rapid Security Response.
- Preferences panes; the feature list; Disk Utility, FileVault, Terminal, Force Quit.`,

u3l2: `## Linux as a toolbox
A Linux session is a set of small tools chained together. The exam lists the tools and asks what each does, plus the files and components that hold the system together. Organize them by category and keep the quirks (case sensitivity, no recycle bin, numeric permissions) next to them.

## Files and directories
\`\`\`
command   does                             example
ls        list                             ls -la  (long, all)
pwd       print working directory
cd        change directory                 cd ~  home;  cd ..  up
mv        move or rename                   mv old.txt new.txt
cp        copy                             cp -r dir backup  (recursive)
rm        remove                           rm -rf dir  (recursive, forced; no undo)
chmod     change permissions               chmod 755 run.sh;  chmod +x run.sh
chown     change owner and group           chown -R alice:staff project
grep      search text                      grep -ri "error" /var/log
find      find files                       find / -name "*.conf" 2>/dev/null
cat       print a file                     cat /etc/hosts
\`\`\`

## Permissions decoded
\`\`\`
-rwxr-xr--  1 alice staff  1234 Sep  7 file.sh
 ^^^^^^^^^
 owner rwx = 7;  group r-x = 5;  others r-- = 4   ->  chmod 754
r = 4, w = 2, x = 1; add them per class; owner, group, others in that order
755: owner everything, everyone else read and execute (scripts, programs)
644: owner read and write, everyone else read (documents)
700: owner only (private keys)
\`\`\`
A directory needs x to be entered. chown user:group changes ownership; only root (via sudo) can give files away.

## Disks and mounts
fsck checks and repairs a filesystem and must run on an unmounted volume (boot to recovery for the root filesystem). mount attaches a device to a directory (mount /dev/sdb1 /mnt/usb); umount detaches; mount with no arguments lists everything mounted. df -h shows free space per mounted filesystem; du -sh path shows what a directory consumes. /etc/fstab lists what mounts at boot.

## Root, su, sudo
\`\`\`
tool     what happens                                         when
root     the superuser, UID 0, can do anything                never log in as root for daily work
su       switch user; su alone becomes root with root's password; the whole shell is root   rare; many distributions lock root's password
sudo     run one command as root with your own password; logged; membership in sudo or wheel group   the normal way: sudo apt update
\`\`\`

## Packages
apt (Debian, Ubuntu, Mint): sudo apt update refreshes the index, sudo apt upgrade applies updates, sudo apt install name, sudo apt remove name. dnf (Fedora, RHEL, Rocky; yum's successor): sudo dnf install name, sudo dnf update. Packages are signed and dependencies resolved from repositories; snap and flatpak are cross-distribution alternatives.

## Network
\`\`\`
command      does
ip addr      addresses (ip a);  ip route  gateway and routes;  ip link  interfaces up or down
ping         reachability; continuous by default; -c 4 for four packets
curl         fetch a URL: curl https://example.com; test an API; download with -O
dig          DNS query with full detail: dig example.com;  dig @8.8.8.8 example.com MX
traceroute   hops to a destination
\`\`\`

## Processes and space
top shows live processes sorted by CPU (q quits); ps aux lists all; kill PID ends one (kill -9 forces). du and df as above; a full disk stops logins and services, so df -h is the first command on a sick server.

## Editors and files
nano: arrow keys, Ctrl+O write out, Ctrl+X exit, Ctrl+W search; the shortcuts are printed at the bottom. vi/vim: i to insert, Esc, :wq to save and quit, :q! to abandon.
\`\`\`
file                 holds                                                     note
/etc/passwd          users: name:x:uid:gid:comment:home:shell                  readable by all; the x means the hash is in shadow
/etc/shadow          hashed passwords and aging                                root only
/etc/hosts           static name-to-IP mappings                                checked before DNS; malware and overrides live here
/etc/fstab           filesystems to mount at boot                              a bad line can stop the boot
/etc/resolv.conf     DNS servers (nameserver lines) and search domain           may be generated by a resolver service
\`\`\`

## Components
The kernel manages hardware, memory, and processes (uname -r shows the version). The bootloader, GRUB on most systems, loads the kernel and offers a menu (older kernels, recovery mode). systemd starts and supervises services: systemctl status sshd, systemctl restart sshd, systemctl enable sshd (start at boot), systemctl disable; journalctl -u sshd reads its log.

## Worked examples
- "A script will not run: Permission denied." chmod +x script.sh, then ./script.sh.
- "A web server on Ubuntu needs a package." sudo apt update && sudo apt install nginx; sudo systemctl enable --now nginx.
- "The server is out of space." df -h to find the full filesystem, du -sh /var/log/* to find the culprit, then rotate or delete.
- "A hostname resolves to the wrong address only on this machine." cat /etc/hosts; remove the stale line; cat /etc/resolv.conf to confirm the DNS server.
- "A service is down after reboot." systemctl status name; journalctl -u name; systemctl enable name if it was never enabled.

## How the exam asks it
- "Which command changes file permissions?" chmod. "Which changes the owner?" chown.
- "Which command lets a user run one command as root?" sudo.
- "Which package manager is used on Ubuntu?" apt. "On Fedora?" dnf.
- "Which command shows IP addresses on a Linux system?" ip (ip addr).
- "Which command shows free disk space?" df. "Disk usage of a folder?" du.
- "Which file contains hashed passwords?" /etc/shadow.
- "Which file defines filesystems mounted at boot?" /etc/fstab.
- "Which component manages services on modern Linux?" systemd.

## What to memorize
- The command tables and the chmod numbers.
- su versus sudo versus root; apt versus dnf.
- The five /etc files; kernel, bootloader (GRUB), systemd and systemctl.`

});
