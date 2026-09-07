// APlus Academy Core 2 curriculum, units 1 to 3. Original teaching content for CompTIA A+ 220-1202.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Operating Systems and Installation", domain: 1,
  blurb: "The operating systems and filesystems a technician meets, the Windows editions and what each allows, how Windows is installed and upgraded, and how applications and cloud tools are chosen and deployed.",
  assumes: "Nothing beyond Core 1 hardware vocabulary. Start here.",
  lessons: [
    {
      id: "u1l1", title: "Operating System Types, Filesystems, Life Cycles, and Compatibility", domain: 1, obj: "1.1", minutes: 10,
      body: `Core 2 opens with the map: which operating systems exist, which filesystems they use, and why a file or program from one may not work on another. These are recall questions with a few rules behind them.

## Workstation operating systems
- **Windows**: the business desktop standard. Editions from Home to Enterprise, NTFS drives, domain or workgroup membership, and the tools this course spends four units on.
- **Linux**: an open-source kernel packaged into **distributions**. Ubuntu and Debian install software with **apt**; Fedora and Red Hat use **dnf**. Case-sensitive filesystems, a **root** superuser, and administration from the command line.
- **macOS**: Apple's desktop OS, only on Apple hardware, built on a Unix core with the APFS filesystem, the App Store, Time Machine backups, and FileVault encryption.
- **Chrome OS**: Google's browser-centered system on Chromebooks; apps are web apps and Android apps, data lives in the cloud, and management is through the Google Admin console. Cheap to buy and to manage, poor for heavy local software.

## Mobile operating systems
- **iOS** on iPhones and **iPadOS** on iPads: closed platform, one app store, updates pushed to every supported device at once; sideloading needs enterprise profiles.
- **Android**: Google's open platform used by many manufacturers; alternative app sources are possible, which raises the malware risk, and updates arrive at different times per vendor.

## Filesystems
A filesystem is how an OS organizes a disk. Choose one by what has to read the disk.
- **NTFS**: Windows system and data drives. Permissions per file and folder, encryption (EFS), compression, journaling (survives crashes), volumes and files far beyond terabytes.
- **ReFS** (Resilient File System): Windows Server and Pro for Workstations. Integrity checking and self-repair for huge data volumes; not a boot filesystem for ordinary editions.
- **FAT32**: the old universal format. Any device reads it, but a single file cannot exceed **4 GB**, and Windows formats it only up to 32 GB.
- **exFAT**: FAT without the 4 GB limit; the right choice for a large flash drive or SD card that must move between Windows, macOS, and Linux. No permissions, no journaling.
- **ext4**: the default on most Linux distributions; journaling, large files; Windows cannot read it natively.
- **XFS**: a Linux filesystem for very large files and volumes; the default on Red Hat.
- **APFS** (Apple File System): macOS and iOS; snapshots, built-in encryption, instant cloning, tuned for SSDs; replaced HFS+.

## Vendor life cycles
Every OS version has a **product life cycle** ending at **end-of-life (EOL)**, after which no security updates ship. Running an EOL system is a vulnerability the security domain names by that word. **Update limitations** also exist inside the life cycle: an old CPU or a missing TPM blocks an upgrade, a Home edition lacks features an update needs, and vendors stop supporting older phones long before they stop working. Windows 10 reached end of support in October 2025.

## Compatibility concerns
- Programs and drivers are built for a specific OS and **architecture**; 64-bit Windows runs 32-bit programs, but a 32-bit OS cannot run 64-bit programs, and no Windows program runs on macOS without a compatibility layer or a virtual machine.
- Files cross between systems only on a filesystem both can read: exFAT or FAT32 for a shared drive, or a network share, or the cloud.
- Document formats, line endings, and case sensitivity (Linux treats File.txt and file.txt as different) trip up mixed environments.
- Hardware needs a driver for the OS in use; an old printer may have a Windows driver and no macOS driver.

> Exam tip: NTFS for permissions and encryption, exFAT for big files on removable media that everyone must read, FAT32 for old compatibility with the 4 GB limit, ext4 and XFS for Linux, APFS for Apple, ReFS for resilience on servers and workstations. EOL means no more patches. Chrome OS is the browser-based one.`,
      hook: "Windows, Linux (apt or dnf, root), macOS (APFS, App Store), Chrome OS (browser, cloud, Admin console); iOS, iPadOS, Android. NTFS permissions and EFS; ReFS resilience; FAT32 4 GB limit; exFAT big files everywhere; ext4 and XFS Linux; APFS Apple. EOL = no patches; update limitations from hardware or edition; 64-bit runs 32-bit, not the reverse; shared drives need a shared filesystem."
    },
    {
      id: "u1l2", title: "Windows Editions, Feature Differences, Upgrade Paths, and Hardware Requirements", domain: 1, obj: "1.3", minutes: 10,
      body: `A user cannot join the domain, cannot turn on BitLocker, cannot be reached by Remote Desktop. The reason is usually the edition. Know what each edition allows.

## Windows 10 editions
- **Home**: consumers. Workgroup only, no domain join, no BitLocker, cannot host Remote Desktop, no Group Policy Editor. RAM limit 128 GB.
- **Pro**: business. Domain join, BitLocker, Remote Desktop host, Group Policy Editor (gpedit.msc), Hyper-V, Windows Update for Business. RAM limit 2 TB.
- **Pro for Workstations**: Pro plus ReFS, persistent memory support, up to four CPUs, and a 6 TB RAM limit; for engineering and data workstations.
- **Enterprise**: volume licensing for large organizations. Everything in Pro plus AppLocker, DirectAccess, advanced deployment and security management. 6 TB RAM.

## Windows 11 editions
Home, Pro, and Enterprise with the same divisions (Pro for Workstations exists as an option on Pro). Home again lacks domain join, BitLocker, RDP host, and gpedit. The RAM limits are 128 GB for Home and 2 TB for Pro; Enterprise 6 TB.

## N versions
Editions sold in Europe without Windows Media Player and related media technologies, after a European Union ruling. Media features can be added back. Everything else is identical.

## Feature differences to recognize in a scenario
- **Domain versus workgroup**: only Pro and above join an Active Directory domain; Home stays in a workgroup with local accounts.
- **Desktop styles and user interface**: Windows 11 centers the taskbar, redesigned Start and Settings, and requires a Microsoft account for Home setup; Windows 10 has the left-aligned taskbar and live tiles.
- **Remote Desktop Protocol**: every edition can connect out as a client; only Pro and above can be the host that others connect to.
- **RAM support limitations**: Home 128 GB, Pro 2 TB, Pro for Workstations and Enterprise 6 TB; 32-bit versions of Windows 10 stop at 4 GB.
- **BitLocker**: Pro and above. Home has "device encryption" on some hardware but not the full BitLocker tools.
- **gpedit.msc**: Pro and above; Home users get the same settings only through the registry.

## Upgrade paths
- **In-place upgrade**: install the new version over the old, keeping files, applications, and settings. Windows 10 to Windows 11 in place if the hardware qualifies; Home to Pro in place by entering a Pro product key (an edition upgrade); a lower edition to a higher one, never the reverse.
- **Clean install**: wipe and start fresh, then restore data. Required when moving from 32-bit to 64-bit, when changing the language family in some cases, and whenever a machine has accumulated problems worth erasing.
- Version and edition are different axes: version is 10 or 11 (and its feature release), edition is Home, Pro, Enterprise.

## Windows 11 hardware requirements
- **TPM 2.0** (or firmware TPM enabled in UEFI).
- **UEFI** firmware, Secure Boot capable.
- A supported 64-bit dual-core processor at 1 GHz or faster (the supported CPU list excludes many chips from before about 2018).
- 4 GB of RAM and 64 GB of storage.
- A 720p display and, for Home setup, an internet connection and Microsoft account.
A machine that fails the check cannot take the in-place upgrade; the fix is enabling the TPM and Secure Boot in firmware when the hardware has them, or replacing the machine.

> Exam tip: cannot join a domain, cannot enable BitLocker, cannot be an RDP host, no gpedit: it is Home. Pro for Workstations adds ReFS and 6 TB. N versions lack media features. In-place keeps files and apps; 32-bit to 64-bit needs a clean install. Windows 11 needs TPM 2.0 and UEFI.`,
      hook: "Home: no domain, BitLocker, RDP host, or gpedit; 128 GB. Pro: adds all four plus Hyper-V; 2 TB. Pro for Workstations: ReFS, 4 CPUs, 6 TB. Enterprise: volume license, AppLocker, DirectAccess, 6 TB. N: no media features. RDP client everywhere, host on Pro and up. In-place keeps everything; Home to Pro by key; 32 to 64-bit is a clean install. Windows 11: TPM 2.0, UEFI Secure Boot, 64-bit dual core, 4 GB, 64 GB."
    },
    {
      id: "u1l3", title: "Installing and Upgrading Windows: Boot Methods, Installation Types, Partitioning, and Upgrade Considerations", domain: 1, obj: "1.2", minutes: 11,
      body: `Installing an operating system is a chain of choices: where to boot from, what kind of installation, how to partition and format, and what to check before upgrading. The exam tests each link.

## Boot methods
The installer has to come from somewhere the firmware can boot.
- **USB**: a bootable flash drive made with the vendor's media tool; the everyday method.
- **Network**: PXE (Preboot Execution Environment) boot from the NIC, pulling the installer from a deployment server; used in offices to install dozens of machines.
- **Solid-state or flash drive**: an installer or image on an SSD or memory card.
- **Internet-based**: cloud recovery built into modern firmware or the OS (macOS Internet Recovery, Windows cloud download in Reset this PC).
- **External or hot-swappable drive**: an external SSD or a drive in a dock.
- **Internal hard drive partition**: a recovery or setup partition on the same disk.
- **Multiboot**: two or more operating systems on one machine with a boot menu choosing between them.
Set the boot order in firmware or use the one-time boot menu.

## Types of installations
- **Clean install**: erase the target and install fresh. The best cure for a corrupted or malware-ridden system; data must be backed up first and applications reinstalled.
- **Upgrade** (in-place): the new version installs over the old and keeps files, applications, and settings.
- **Image deployment**: a reference machine is prepared and captured as an image, then copied to many machines (cloning tools, Microsoft Deployment Toolkit, Configuration Manager). Every machine comes out identical.
- **Remote network installation**: boot from PXE and install from a server, no local media.
- **Zero-touch deployment**: the device ships straight to the user; on first boot it contacts the vendor's service (Windows Autopilot), enrolls in management, and configures itself. Nobody in IT touches it.
- **Recovery partition**: the manufacturer's hidden partition restores the factory image; it also restores the bloatware.
- **Repair installation**: reinstalling Windows over itself from the same version's media to repair system files while keeping data and apps.
- **Third-party drivers**: when setup cannot see the disk (RAID or unusual NVMe controllers), load the storage driver from a USB drive during setup.

## Partitioning and formatting
A disk is divided into partitions, each formatted with a filesystem.
- **GPT** (GUID partition table): the modern scheme for UEFI systems, up to 128 partitions, disks over 2 TB, protective backup of the partition table. Required for UEFI boot.
- **MBR** (master boot record): the legacy scheme for BIOS systems, at most four primary partitions (or three plus an extended partition holding logical drives), a 2 TB limit.
- Windows setup creates a small system partition and the main NTFS partition automatically; the **drive format** is NTFS for Windows, and the installer can convert between MBR and GPT during setup.
- Mismatching firmware mode and partition style (legacy BIOS with GPT, or UEFI with MBR) produces "no bootable device."

## Upgrade considerations
Before an in-place upgrade or version change:
1. **Back up files and user preferences**; an upgrade that fails halfway can leave a machine unbootable.
2. Check **application and driver support and backward compatibility**: the vendor's list of supported versions, especially for security software and old line-of-business apps.
3. Check **hardware compatibility**: the upgrade advisor or the vendor's requirements (Windows 11's TPM and CPU list).
4. Understand **feature updates**: Windows ships a yearly feature update that changes behavior, separate from monthly quality updates; test before deploying.
5. Know the **product life cycle**: upgrading to a version near its own EOL only postpones the problem.
Free space, a charged battery or AC power, and time are the practical requirements.

> Exam tip: PXE is network boot; Autopilot-style zero-touch means nobody touches the device; image deployment makes clones. GPT needs UEFI and allows disks over 2 TB and 128 partitions; MBR is four primaries and 2 TB. Load third-party storage drivers when setup cannot see the disk. Back up before any upgrade.`,
      hook: "Boot: USB, PXE network, SSD or flash, internet recovery, external drive, internal partition, multiboot. Types: clean, upgrade (keeps everything), image deployment (clones), remote network install, zero-touch (self-enrolls), recovery partition (factory), repair install (over itself), third-party storage drivers. GPT: UEFI, 128 partitions, over 2 TB; MBR: BIOS, 4 primaries, 2 TB. Upgrade: back up, app and driver support, hardware compatibility, feature updates, life cycle."
    },
    {
      id: "u1l4", title: "Installing Applications and Cloud Productivity Tools: Requirements, Distribution, Impact, and Cloud Services", domain: 1, obj: "1.10", minutes: 10,
      body: `Two objectives about software rather than the OS: whether a program will run on a machine and how it arrives, and how the cloud versions of everyday tools are set up.

## System requirements for applications
Read the box (or the download page) against the machine:
- **32-bit versus 64-bit**: a 64-bit application needs a 64-bit OS; a 32-bit application runs on either but is limited to about 4 GB of memory. A driver or plug-in must match the host application's architecture.
- **Dedicated versus integrated graphics**: gaming, CAD, and video software want a dedicated card with its own **VRAM** (video memory); integrated graphics borrow system RAM and may not meet the minimum.
- **RAM** and **CPU** minimums and recommendations; the recommendation is what makes it usable.
- **External hardware tokens**: some professional software runs only with a USB license key present.
- **Storage** for the installation and for its working files, on the type of drive it expects (some insist on an SSD).

## Application-to-OS compatibility
The vendor lists the supported operating systems and versions. An app written for Windows 7 may fail on Windows 11 without **compatibility mode**; a macOS app compiled for Intel needs a translation layer on Apple silicon; a phone app needs a minimum iOS or Android version. Check before buying, and test on one machine before rolling out.

## Distribution methods
- **Physical media** (a DVD or USB stick from the vendor) versus a **mountable ISO file**: an ISO is a disk image; double-click to mount it as a virtual drive and run setup.
- **Downloadable package**: an installer from the vendor's site or a store; verify the download's hash or signature.
- **Image deployment**: the application is baked into the OS image so every new machine has it.
Store-based installs (Microsoft Store, App Store) handle updates automatically; classic installers need their own update mechanism.

## Impact considerations for new applications
Before installing across a company, think through four kinds of impact:
- **Device**: does the machine have the resources; will it slow down; does it conflict with existing software.
- **Network**: bandwidth for downloads and updates, ports it needs opened, a license server it must reach, cloud dependencies.
- **Operation**: workflow changes, training, downtime for installation, support load, backups of its data.
- **Business**: licensing cost, compliance with regulations, vendor viability, data ownership.
This is the same thinking change management formalizes in unit 7.

## Cloud-based productivity tools
Most offices now run on hosted suites. The technician's tasks:
- **Email systems**: configure the client or the browser sign-in; mail lives on the provider's servers; migration from on-premises servers moves mailboxes.
- **Storage**: cloud drives with **sync and folder settings** on each device: which folders sync, whether files stay in the cloud until opened (files on demand), and where the local copy lives; watch disk space and data caps.
- **Collaboration tools**: spreadsheets, videoconferencing, presentation and word processing tools, instant messaging; sharing permissions and external access are the security points.
- **Identity synchronization**: user accounts from the on-premises directory are synced to the cloud tenant so one login works everywhere; account problems trace back to the sync.
- **Licensing assignment**: each user gets a license from the pool; a user who cannot open the desktop apps or mailbox usually has no license assigned or an expired one.

> Exam tip: 64-bit apps need a 64-bit OS; VRAM is on a dedicated card; a hardware token is a USB license key. An ISO is mounted, not burned. Impact: device, network, operation, business. In the cloud suite, no mailbox or apps usually means no license assigned; one password everywhere is identity synchronization.`,
      hook: "Requirements: 32 versus 64-bit, dedicated graphics and VRAM, RAM, CPU, hardware token, storage; check OS compatibility and test first. Distribution: physical media or mounted ISO, downloadable package (verify the hash), image deployment. Impact: device, network, operation, business. Cloud suite: email, storage sync and folder settings, collaboration tools, identity synchronization, license assignment per user."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Windows Tools, Commands, Settings, and Networking", domain: 1,
  blurb: "Every Windows tool by its file name, every command by its job, where each setting lives in Control Panel and Settings, and how a Windows client is put on a network.",
  assumes: "You know what a process, a driver, a disk partition, and an IP address are.",
  lessons: [
    {
      id: "u2l1", title: "Task Manager and the MMC Snap-Ins", domain: 1, obj: "1.4", minutes: 11,
      body: `Core 2 asks for tools by name, including the .msc file that opens them. Learn each tool as "the place you go to do X."

## Task Manager
Open with **Ctrl+Shift+Esc**, right-click the taskbar, or run {{taskmgr}}. Its tabs:
- **Processes**: every running app and background process with CPU, memory, disk, and network use; right-click to end a hung task. Sort by a column to find the hog.
- **Performance**: live graphs of CPU, memory, disk, Ethernet and Wi-Fi, and GPU; opens Resource Monitor for detail.
- **App history**: resource use over time for store apps.
- **Startup** (Startup apps): programs that launch at sign-in with their startup impact; disable the ones slowing the boot. (This moved here from msconfig.)
- **Users**: who is signed in and what each session uses; sign a user off.
- **Details**: every process by executable name with PID, priority, and the option to set affinity.
- **Services**: running and stopped services; start, stop, or open the Services console.

## The Microsoft Management Console
The MMC ({{mmc.exe}}) is a shell that hosts **snap-ins**; each .msc file is a saved console with one snap-in. Computer Management ({{compmgmt.msc}}) bundles many of them.
- **Event Viewer** ({{eventvwr.msc}}): the Windows logs. **Application** (program errors), **Security** (audits, logons), **System** (drivers, services, hardware, shutdowns), plus Setup and application-specific logs. Levels: Critical, Error, Warning, Information. The first place to look for why a service failed or a machine crashed; filter by time and level.
- **Disk Management** ({{diskmgmt.msc}}): initialize new disks (MBR or GPT), create, shrink, extend, and delete partitions, format, assign drive letters, mark active, convert basic to dynamic, mount a volume in a folder. A disk that shows as "Not initialized" is new; "Unallocated" space is not yet a partition.
- **Task Scheduler** ({{taskschd.msc}}): run a script or program on a schedule or when an event occurs, with a chosen account and conditions (only on AC power, wake the machine).
- **Device Manager** ({{devmgmt.msc}}): every hardware device and its driver. A **yellow triangle** means a problem (missing driver, conflict); a down arrow means disabled. Update, roll back (after a bad update), disable, or uninstall a driver; view resources; show hidden devices.
- **Certificate Manager** ({{certmgr.msc}}): the current user's certificates: personal, trusted root authorities, intermediate; import and export; a missing root certificate causes trust errors.
- **Local Users and Groups** ({{lusrmgr.msc}}): create and disable local accounts, reset passwords, set account options, manage group membership (Administrators, Users, Remote Desktop Users). Pro and above; Home uses the Settings app.
- **Performance Monitor** ({{perfmon.msc}}): counters (processor time, available memory, disk queue, network bytes) graphed over time, data collector sets, and reports; the tool for baselining and for catching a slow leak.
- **Group Policy Editor** ({{gpedit.msc}}): Local Computer Policy with Computer Configuration and User Configuration: password policy, lockout, software restrictions, desktop settings, Windows Update behavior; Pro and above. In a domain, the same settings come from Group Policy Objects on the domain controller.

## Choosing the tool from the scenario
- Why did the service fail at 3 a.m.? Event Viewer, System log.
- A new drive shows nothing in File Explorer. Disk Management: initialize and format.
- Run a backup script nightly. Task Scheduler.
- A device stopped working after a driver update. Device Manager, roll back.
- Enforce a password length on a standalone PC. Group Policy Editor.
- Find what is eating memory right now. Task Manager, Processes, sort by memory.
- Track disk activity over a week. Performance Monitor.

> Exam tip: eventvwr for logs, diskmgmt for partitions, taskschd for scheduled jobs, devmgmt for drivers (yellow triangle), certmgr for certificates, lusrmgr for local accounts, perfmon for counters over time, gpedit for local policy. Task Manager's Startup tab replaced msconfig's.`,
      hook: "Task Manager (Ctrl+Shift+Esc): Processes, Performance, App history, Startup, Users, Details, Services. eventvwr.msc logs (Application, Security, System); diskmgmt.msc partitions and formats; taskschd.msc scheduled jobs; devmgmt.msc drivers and yellow triangles, roll back; certmgr.msc certificates; lusrmgr.msc local accounts and groups; perfmon.msc counters and baselines; gpedit.msc local policy (Pro and up); compmgmt.msc bundles them."
    },
    {
      id: "u2l2", title: "The Other Windows Utilities: msinfo32, resmon, msconfig, cleanmgr, dfrgui, and regedit", domain: 1, obj: "1.4", minutes: 8,
      body: `Six more tools the objective names by their executable. Each answers one kind of question.

## System Information (msinfo32.exe)
A read-only inventory of the machine: OS version and build, system model, BIOS or UEFI mode and version, Secure Boot state, processor, installed RAM, page file, hardware resources (IRQs, memory ranges, conflicts), components (display, storage, network with driver details), and the software environment (drivers, services, startup programs, environment variables). Export it to a file when a vendor asks for a system report, and use it to answer "is this machine in UEFI mode?" without rebooting.

## Resource Monitor (resmon.exe)
Task Manager's Performance tab in detail, live: CPU by process and by service, memory (hard faults, working sets, the standby list), disk (which process is reading and writing which file, response time, queue length), and network (connections per process, listening ports, TCP throughput). Two things it does that nothing else does easily: show **which process has a file open** (search handles), and show which process is hammering the disk when the whole machine crawls.

## System Configuration (msconfig.exe)
The boot and startup control panel.
- **General**: normal, diagnostic, or selective startup.
- **Boot**: choose the default OS on a multiboot system, timeout, and **Safe boot** (minimal, network, or alternate shell) so the next reboot enters safe mode without pressing keys; boot logging; no GUI boot.
- **Services**: enable or disable services, with "Hide all Microsoft services" so you can turn off everything third party in one step to find a conflict.
- **Startup**: now just a link to Task Manager's Startup tab.
- **Tools**: shortcuts to the other utilities.
Selective startup with all services disabled is the classic "clean boot" for isolating a crash.

## Disk Cleanup (cleanmgr.exe)
Frees space by deleting temporary files, downloaded program files, the Recycle Bin, thumbnails, delivery optimization files, and, with **Clean up system files**, old Windows Update files and the **previous Windows installation** (Windows.old, which can be tens of gigabytes after an upgrade). Storage Sense in Settings automates the same cleanup on a schedule.

## Disk Defragmenter (dfrgui.exe, Optimize Drives)
On a hard disk, files fragment into pieces scattered across the platters and reads slow down; defragmenting reassembles them. On an SSD, defragmenting is unnecessary and adds wear; instead Windows runs **TRIM** to tell the SSD which blocks are free. Optimize Drives knows the difference, shows the media type, and runs weekly on a schedule. Defragment an HDD that reports high fragmentation; never force-defragment an SSD.

## Registry Editor (regedit.exe)
The registry is the database of Windows and application settings, organized in hives:
- **HKEY_LOCAL_MACHINE** (HKLM): settings for the machine, hardware, installed software, services.
- **HKEY_CURRENT_USER** (HKCU): the signed-in user's settings.
- **HKEY_USERS**, **HKEY_CLASSES_ROOT** (file associations), **HKEY_CURRENT_CONFIG**.
Keys hold values of types such as string (REG_SZ) and DWORD. Edit only with a vendor's instructions, and **export the key first** (File, Export) so it can be restored; System Restore also captures the registry. A wrong edit can prevent Windows from booting. Group Policy is the safer way to make the same change on many machines.

## Which tool
- Is this machine UEFI with Secure Boot on? msinfo32.
- What is using the disk right now, and which process holds this file? resmon.
- Boot into safe mode next time, or clean boot to find a conflicting service. msconfig.
- Reclaim 30 GB after an upgrade. cleanmgr, system files, previous installation.
- A hard drive is slow after years of use. dfrgui, if it is an HDD.
- A vendor's fix says to change a value under HKLM. regedit, after exporting the key.

> Exam tip: msinfo32 inventory and firmware mode; resmon live per-process disk and file handles; msconfig safe boot and clean boot; cleanmgr temporary files and Windows.old; dfrgui defragments HDDs and TRIMs SSDs; regedit hives HKLM and HKCU, back up before editing.`,
      hook: "msinfo32: read-only inventory, BIOS versus UEFI, Secure Boot, resources, export. resmon: live CPU, memory, disk (who is writing what), network, file handles. msconfig: safe boot, selective startup, hide Microsoft services (clean boot). cleanmgr: temp files, update leftovers, Windows.old. dfrgui: defragment HDD, TRIM SSD, weekly. regedit: HKLM machine, HKCU user; export before editing."
    },
    {
      id: "u2l3", title: "Windows Command-Line Tools", domain: 1, obj: "1.5", minutes: 12,
      body: `The command prompt is faster than clicking and is the only option when the desktop will not load. Know each command, its job, and the one or two switches the exam likes.

## Navigation
- {{cd}} changes directory: {{cd \\Users}}, {{cd ..}} goes up, {{cd \\}} goes to the root. Just {{cd}} shows where you are. {{D:}} switches drives.
- {{dir}} lists files and folders. {{dir /a}} includes hidden and system files; {{dir /s}} recurses into subfolders; {{dir /p}} pauses per page; {{dir *.log}} filters.

## File management
- {{md}} (or mkdir) makes a directory; {{rmdir}} (rd) removes one, and {{rmdir /s}} removes it with everything inside ({{/q}} skips the prompt).
- {{robocopy}} copies folder trees robustly: retries on errors, resumes, preserves timestamps and, with {{/copyall}}, permissions; {{/mir}} mirrors a tree (deleting extras at the destination, so be careful); {{/e}} copies subfolders including empty ones; {{/log}} writes a log. It replaced {{xcopy}}; {{copy}} handles single files.

## Network
- {{ipconfig}} shows the adapter's IP, mask, and gateway; {{/all}} adds MAC address, DHCP server, lease, and DNS servers; {{/release}} and {{/renew}} redo the DHCP lease; {{/flushdns}} clears the resolver cache after a DNS change; {{/displaydns}} shows it.
- {{ping}} tests reachability with echo requests and shows round-trip time; {{-t}} runs until stopped; {{-a}} resolves the name; pinging 127.0.0.1 tests the local stack.
- {{tracert}} lists every router hop to the destination with timing; the hop that stops replying is where the path breaks.
- {{pathping}} runs a tracert, then measures packet loss to each hop over several minutes: the tool for a flaky link.
- {{netstat}} lists connections and listening ports; {{-a}} all, {{-n}} numeric, {{-o}} the owning process ID, {{-b}} the program name (needs admin). Spot malware calling out or a port already in use.
- {{nslookup}} queries DNS: {{nslookup www.example.com}} returns the address and which server answered; test a specific server with {{nslookup name 8.8.8.8}}.
- {{net use}} maps and lists drives: {{net use X: \\\\server\\share}} maps, {{net use X: /delete}} removes, {{net use}} alone lists mappings; {{/persistent:yes}} survives reboots.

## Disk management
- {{chkdsk}} checks a volume's filesystem; {{/f}} fixes errors; {{/r}} locates bad sectors and recovers readable data (implies /f, slow). On the system drive it schedules at the next boot.
- {{format}} writes a new filesystem on a volume, destroying its contents: {{format E: /fs:exfat /q}} for a quick exFAT format.
- {{diskpart}} is the command-line Disk Management: {{list disk}}, {{select disk 1}}, {{clean}} (wipes the partition table), {{convert gpt}}, {{create partition primary}}, {{format fs=ntfs quick}}, {{assign}}. Useful from recovery media when the GUI is gone; dangerous if you select the wrong disk.

## Informational
- {{hostname}} prints the computer name.
- {{net user}} lists local accounts; {{net user name}} shows one; {{net user name password /add}} creates one; {{net user name /active:no}} disables.
- {{winver}} opens the About Windows dialog with version and build.
- {{whoami}} shows the current account; {{whoami /groups}} its group memberships.
- {{command /?}} prints help for any command (for example {{robocopy /?}}).

## OS management
- {{gpupdate}} applies Group Policy changes now instead of waiting for the refresh interval; {{/force}} reapplies all settings even if unchanged.
- {{gpresult}} reports which policies applied to the computer and user; {{/r}} for a summary, {{/h report.html}} for a full report. The tool when "the policy is not taking effect."
- {{sfc}} is the System File Checker: {{sfc /scannow}} verifies protected system files and replaces corrupted ones from the component store; run as administrator. If it cannot repair, {{DISM /online /cleanup-image /restorehealth}} repairs the store first, then run sfc again.
- {{shutdown /r /t 0}} restarts now; {{/s}} shuts down; {{/a}} aborts a scheduled shutdown.

> Exam tip: ipconfig /all for the MAC and DNS, /release and /renew for DHCP, /flushdns after DNS changes. pathping adds loss statistics to tracert. netstat -b shows the program on a port. chkdsk /r for bad sectors. diskpart clean erases a disk. gpupdate /force applies policy now; gpresult /r shows what applied. sfc /scannow repairs system files.`,
      hook: "cd, dir /a. md, rmdir /s, robocopy /mir. ipconfig /all, /release, /renew, /flushdns; ping -t; tracert; pathping (loss per hop); netstat -a -n -o -b; nslookup; net use X: \\\\server\\share. chkdsk /f /r; format; diskpart (list, select, clean, convert gpt). hostname, net user, winver, whoami, /?. gpupdate /force, gpresult /r, sfc /scannow (then DISM restorehealth)."
    },
    {
      id: "u2l4", title: "Control Panel Applets, File Explorer Options, and Power Options", domain: 1, obj: "1.6", minutes: 10,
      body: `The Control Panel still holds settings the newer Settings app does not. The exam names the applets and asks where a given setting lives.

## The applets, one line each
- **Internet Options**: legacy browser settings that still matter system-wide: security zones, the **Connections** tab with LAN and proxy settings, certificates, and content controls. The proxy set here applies to many applications.
- **Devices and Printers**: every printer and peripheral; add a printer, set the default, open printer properties and the print queue, troubleshoot.
- **Programs and Features**: uninstall or change installed programs, view installed updates (and uninstall a bad one), and **Turn Windows features on or off** (Hyper-V, .NET, Telnet client, SMB 1.0).
- **Network and Sharing Center**: active networks and their profile, **Change adapter settings** (IP configuration lives on the adapter's properties), sharing options, and the troubleshooter.
- **System**: computer name, domain or workgroup join, remote settings (Remote Desktop, Remote Assistance), **System Protection** (restore points), and **Advanced** settings: performance and visual effects, **virtual memory** (paging file), environment variables, startup and recovery.
- **Windows Defender Firewall**: turn the firewall on or off per network profile, **Allow an app through**, and **Advanced settings** for inbound and outbound rules by port and program.
- **Mail**: Outlook profiles, email accounts, and data files.
- **Sound**: playback and recording devices, the default device, levels, and communications behavior.
- **User Accounts**: change an account's type (standard or administrator), passwords, **User Account Control** level, and the Credential Manager for saved passwords.
- **Device Manager**: the same devmgmt.msc.
- **Indexing Options**: which locations and file types Windows Search indexes; rebuild the index when search misses files.
- **Administrative Tools** (Windows Tools in Windows 11): shortcuts to the consoles and utilities.

## File Explorer Options
Formerly Folder Options.
- **General**: open File Explorer to This PC or Quick access, single- or double-click, privacy (recent files).
- **View**: **show hidden files, folders, and drives**; **hide extensions for known file types** (turn this off so "invoice.pdf.exe" is visible); **hide protected operating system files**; show full path in the title bar; launch folder windows in a separate process.
- **Search**: how searches treat indexed and non-indexed locations.
A support call that says "I cannot see the AppData folder" or "the file has no extension" is this dialog.

## Power Options
- **Power plans**: Balanced (default), Power saver, High performance, and, on some machines, Ultimate performance; each plan sets display-off and sleep timers, and **Change advanced power settings** exposes everything else.
- **Sleep (suspend, standby)**: the machine keeps RAM powered and resumes in seconds; a laptop in sleep for days drains its battery.
- **Hibernate**: RAM is written to hiberfil.sys on disk and the machine powers off completely; slower to resume, but nothing is lost when the battery dies. Hybrid sleep does both.
- **Choose what closing the lid does** and what the power buttons do: sleep, hibernate, shut down, or nothing (a laptop used with the lid closed on a dock).
- **Turn on fast startup**: at shutdown, the kernel session is hibernated so the next boot is quicker; it can interfere with dual boot, disk access from other systems, and some updates; a restart bypasses it.
- **USB selective suspend**: lets Windows power down idle USB devices to save energy; disable it when a USB device keeps disconnecting.
Power settings are also where "the PC never sleeps" and "the screen turns off too fast" are fixed.

> Exam tip: proxy settings live in Internet Options; the paging file, computer name, and restore points live in System; uninstall updates and Windows features in Programs and Features; show hidden files and file extensions in File Explorer Options, View. Sleep keeps RAM powered; hibernate writes it to disk. Fast startup speeds boot but confuses dual boot. USB selective suspend causes dropped USB devices.`,
      hook: "Internet Options: zones, proxy, certificates. Devices and Printers. Programs and Features: uninstall, updates, Windows features. Network and Sharing Center: adapters, profile. System: name, domain, remote, System Protection, virtual memory, environment variables. Defender Firewall: profiles, allow an app, advanced rules. Mail, Sound, User Accounts (type, UAC), Device Manager, Indexing Options, Administrative Tools. File Explorer Options View: hidden files, extensions, protected OS files. Power: plans, sleep versus hibernate, lid action, fast startup, USB selective suspend."
    },
    {
      id: "u2l5", title: "The Settings App", domain: 1, obj: "1.6", minutes: 8,
      body: `The Settings app is where Windows 10 and 11 put most day-to-day configuration, organized into categories. The exam asks which category holds a given setting.

## System
Display (resolution, scaling, multiple displays, night light), Sound, Notifications, Focus, Power and battery (sleep and screen timers, battery saver, the same plans as Control Panel in simpler form), Storage (usage by category, Storage Sense cleanup), Nearby sharing, Multitasking, Remote Desktop (enable the host on Pro), Clipboard, and **About** (edition, version, device name, rename the PC, advanced system settings).

## Devices (Bluetooth and devices in Windows 11)
Bluetooth pairing, printers and scanners, mouse and touchpad, typing and pen, **AutoPlay** (what happens when media is inserted; turn it off for security), USB notifications, cameras.

## Network and Internet
Status, **Wi-Fi** (join, forget, manage known networks, random hardware addresses), **Ethernet**, **VPN** (add a connection with server, type, and credentials), Airplane mode, Mobile hotspot, **Proxy** (automatic detection, setup script, manual), **Data usage** and **metered connection** (limits background downloads and updates on cellular or capped links), Advanced network settings (adapters, network reset).

## Personalization
Background, colors, lock screen, themes, fonts, Start menu, taskbar. Cosmetic, but the lock screen and taskbar settings appear in support calls.

## Apps
**Apps and features** (uninstall, modify, move, and see install dates and sizes), **Default apps** (which program opens which file type or protocol), Optional features, **Startup** (the same list as Task Manager), Apps for websites, Video playback.

## Accounts
Your info (local versus Microsoft account, switch between them), Email and accounts, **Sign-in options** (password, PIN, Windows Hello face and fingerprint, security key, dynamic lock, require sign-in on wake), **Access work or school** (join Azure AD or enroll in MDM), Family and other users (add local accounts, change type), Sync your settings.

## Time and Language
Date and time (automatic time, time zone, sync now with the time server), Region (formats), Language (display and input languages), Speech. Time drift and certificate errors are fixed here or in the domain.

## Gaming
Game bar, captures, Game Mode. The exam includes it only because it is a category.

## Ease of Access (Accessibility)
Vision (magnifier, narrator, high contrast, text size, color filters), hearing (captions, mono audio), interaction (speech, keyboard settings such as sticky keys, mouse settings, eye control).

## Privacy
Windows permissions (diagnostics and feedback, activity history, advertising ID) and **app permissions** (location, camera, microphone, contacts, calendar, background apps). A camera that "does not work in one app" is often denied here.

## Update and Security (Windows Update, Privacy and security in Windows 11)
**Windows Update** (check, pause, active hours, update history, uninstall updates, advanced options), Delivery Optimization, **Windows Security** (Defender antivirus, firewall, app and browser control, device security), **Backup** (file history, sync), Troubleshoot, **Recovery** (Reset this PC, advanced startup into WinRE, go back to the previous version), Activation, Find My Device, For developers.

## Control Panel or Settings?
Newer and simpler items live in Settings; deeper and older ones stay in Control Panel: the paging file, environment variables, Internet Options, Mail, advanced firewall rules, and Device Manager. Both routes reach adapters, printers, and accounts. When a question names a specific dialog with tabs, it is Control Panel; when it names a category, it is Settings.

> Exam tip: AutoPlay is under Devices; VPN, proxy, and metered connections under Network and Internet; sign-in options and work-or-school join under Accounts; default apps and uninstall under Apps; camera and microphone permissions under Privacy; Windows Update, Windows Security, Backup, and Recovery under Update and Security; time zone and sync under Time and Language.`,
      hook: "System: display, sound, power, storage, remote desktop, about. Devices: Bluetooth, printers, mouse, AutoPlay, USB. Network and Internet: Wi-Fi, Ethernet, VPN, proxy, data usage, metered. Personalization: background, lock screen, taskbar. Apps: uninstall, default apps, startup. Accounts: local versus Microsoft, sign-in options, access work or school, other users. Time and Language: time, zone, sync, region. Gaming. Ease of Access: magnifier, narrator, captions, sticky keys. Privacy: camera, microphone, location per app. Update and Security: Windows Update, Windows Security, Backup, Recovery, Activation."
    },
    {
      id: "u2l6", title: "Windows Networking on the Client", domain: 1, obj: "1.7", minutes: 11,
      body: `Putting a Windows machine on a network means choosing how it authenticates, what it shares, what its firewall allows, and how it gets its addresses. Every item here appears in performance-based questions.

## Domain joined versus workgroup
- In a **workgroup**, each PC keeps its own local accounts; sharing between machines needs matching accounts and passwords on both. Right for homes and tiny offices.
- **Domain joined**: the PC becomes a member of an Active Directory domain (System, Rename this PC or join a domain, or Settings, Accounts, Access work or school). Users log in with domain accounts, Group Policy applies, and administrators manage the machine centrally. Requires Pro or above and reachability to a domain controller (DNS must point at it).

## Shared resources
- **Printers**: shared from a PC (Devices and Printers, Sharing tab) or by a print server; clients add them by browsing or by UNC path.
- **File servers**: shared folders on a server or another PC; permissions are the share permissions plus NTFS permissions.
- **Mapped drives**: a share given a drive letter for convenience: File Explorer, This PC, Map network drive, choose a letter and {{\\\\server\\share}}, tick **Reconnect at sign-in** and, if needed, **Connect using different credentials**; or {{net use X: \\\\server\\share /persistent:yes}}. A mapped drive that shows a red X at login means the server or the credentials were not reachable when the drive was reconnected.
- **File Explorer navigation and network paths**: type {{\\\\server}} in the address bar to browse its shares; the **Network** node lists discovered machines when network discovery is on; the **UNC** path form is {{\\\\server\\share\\folder}}.

## Local OS firewall settings
Windows Defender Firewall is on by default and blocks unsolicited inbound connections.
- **Application restrictions and exceptions**: **Allow an app through the firewall** creates a rule for a program per profile (private, public); a program that cannot receive connections (a game server, remote support, a scanner sending to the PC) needs an exception.
- **Configuration**: Advanced settings holds inbound and outbound rules by port, program, or service, per profile; the firewall can be turned off per profile (a troubleshooting step, not a fix). Group Policy pushes firewall rules in a domain.

## Client network configuration
On the adapter's properties (Internet Protocol Version 4) or in Settings, Network and Internet, edit IP assignment:
- **IP addressing scheme**: the address and its **subnet mask** (which decide the local network), the **gateway** (the router's address, on the same subnet), and **DNS settings** (usually the domain controller inside a domain, or the router or a public resolver at home).
- **Static versus dynamic**: dynamic (obtain automatically) uses DHCP and suits laptops and most desktops; static addresses are typed in for servers, printers, and devices others must find, and must be excluded from the DHCP scope. An alternate configuration can provide a fallback static address when DHCP fails.
A wrong mask or gateway isolates the machine; a wrong DNS server breaks names while addresses still work.

## Establishing connections
- **VPN**: Settings, Network and Internet, VPN, Add a VPN connection: provider, server address, type (IKEv2, L2TP/IPsec, SSTP, or a vendor client), sign-in method; connect from the taskbar network icon. Split tunneling is a setting on the connection's advanced properties.
- **Wireless**: pick the SSID, enter the passphrase, or for enterprise networks the username and password and certificate; manage known networks to forget a stale profile.
- **Wired**: plug in; the adapter negotiates speed and duplex and asks DHCP.
- **WWAN (cellular)**: a laptop with a cellular modem needs a SIM or eSIM, the carrier's **APN** settings, and a data plan; treat it as a metered connection.

## Proxy settings
A proxy fetches web content for clients. Configure it under Settings, Network and Internet, Proxy: **automatic** detection (WPAD), a **setup script** (PAC file URL), or **manual** address and port with exceptions for local addresses. The same setting sits in Internet Options, Connections, LAN settings. A machine that browses at home but not at work usually needs the work proxy; one that fails at home may have a leftover manual proxy.

## Public versus private network
When Windows joins a new network it asks whether it is public or private. **Public** (default): network discovery and file sharing off, the firewall at its strictest; for coffee shops and airports. **Private**: discovery and sharing on, for home and office. A PC that cannot be seen or reached by other machines on the LAN is often sitting on the public profile. Domain networks use a third, domain profile automatically.

## Metered connections and limitations
Marking a connection metered (Wi-Fi or cellular) tells Windows to limit background data: updates download only the critical ones, apps pause syncing, and tiles and mail refresh less. Use it on a hotspot or a capped plan; forget to unmark it and the machine stops updating.

> Exam tip: domain join needs Pro; workgroup means local accounts. Map a drive with net use X: \\\\server\\share and reconnect at sign-in. A program others cannot connect to needs a firewall exception. Static for servers and printers, DHCP for the rest; gateway on the same subnet; DNS wrong means names fail. Public profile hides the PC; private allows sharing. Metered limits updates.`,
      hook: "Workgroup: local accounts; domain join: Pro and above, central accounts and Group Policy, DNS at the domain controller. Shares: printers, file servers, mapped drives (net use X: \\\\server\\share /persistent:yes), UNC paths in File Explorer. Firewall: allow an app, inbound rules per profile. Client config: IP, mask, gateway, DNS; static for servers and printers, dynamic elsewhere. Connections: VPN (add connection, type, credentials), wireless, wired, WWAN with SIM and APN. Proxy: automatic, script, manual. Public hides, private shares. Metered limits background data and updates."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "macOS and Linux", domain: 1,
  blurb: "The Apple desktop's features and utilities, and the Linux commands, configuration files, and components a technician must recognize.",
  assumes: "You are comfortable with the idea of a command line from Unit 2.",
  lessons: [
    {
      id: "u3l1", title: "macOS Features and Tools", domain: 1, obj: "1.8", minutes: 11,
      body: `A technician supporting a Mac needs the vocabulary: how applications install, where files live, which utilities do what, and the Apple-specific features users depend on. The exam asks for the names.

## Installing and removing applications
- **.dmg**: a disk image. Double-click to mount it as a volume, then drag the application into **/Applications** (or run the installer inside); eject the image afterward. Nothing is installed until you drag.
- **.pkg**: an installer package that runs a wizard and can place files anywhere, with a password prompt; used by drivers, printers, and enterprise software.
- **.app**: the application itself, a bundle folder that looks like one file; it can run from anywhere.
- **App Store**: Apple's curated store tied to the Apple ID; automatic updates; corporate Macs can be restricted to it.
- **Uninstallation**: drag the .app to the Trash and empty it, or run the vendor's uninstaller for packaged software that scattered files; some leftovers stay in the Library folders.

## System folders
- **/Applications**: installed applications for all users.
- **/Users**: each user's home folder (Desktop, Documents, Downloads, and so on).
- **/Library**: system-wide support files, preferences, fonts, and launch agents shared by all users.
- **/System**: the operating system itself, protected by System Integrity Protection; do not modify.
- **/Users/name/Library** (the user Library, hidden by default; hold Option in the Finder Go menu): that user's preferences, caches, and application support. Deleting a stubborn preference file lives here.

## Apple ID and corporate restrictions
The **Apple ID** signs a user into iCloud, the App Store, iMessage, and FaceTime and syncs Keychain and files. Companies use **managed Apple IDs** and **MDM** (through Apple Business Manager) to restrict App Store use, enforce passcodes and FileVault, push profiles, and wipe lost machines. A user who cannot install an app on a work Mac is usually blocked by the corporate restriction, not by macOS.

## Best practices
- **Backups**: **Time Machine** to an external drive or a network share, hourly, with versioned history.
- **Antivirus**: Macs get malware too; run an endpoint product in a business.
- **Updates and patches**: System Settings, Software Update; **Rapid Security Response** delivers small urgent security fixes between full macOS updates and applies them without waiting for a version release.

## System Preferences (System Settings in recent versions)
- **Displays**: resolution, scaling, arrangement of multiple monitors, night shift.
- **Network**: interfaces, Wi-Fi, TCP/IP addressing (DHCP or manual), DNS, proxies, VPN configurations.
- **Printers and Scanners**: add and manage printers (AirPrint finds most automatically) and scanners.
- **Privacy and Security**: which apps may use the camera, microphone, location, disk access; FileVault; firewall; Gatekeeper (allow apps from the App Store or identified developers).
- **Accessibility**: zoom, VoiceOver, display contrast, keyboard and pointer aids.
- **Time Machine**: choose the backup disk and options.

## Features users ask about
- **Multiple desktops** (Spaces) and **Mission Control**: swipe up with three or four fingers to see every window and desktop; create desktops for different tasks.
- **Keychain**: the built-in password and certificate store, synced through iCloud Keychain.
- **Spotlight**: Command-Space search for files, apps, and definitions.
- **iCloud**: Apple's cloud for photos, files (**iCloud Drive**), backups of iOS devices, and settings sync.
- **iMessage** and **FaceTime**: Apple's messaging and video calling, tied to the Apple ID.
- **Gestures**: trackpad swipes, pinches, and taps configured in Trackpad settings.
- **Finder**: the file manager; the Dock's leftmost icon; the Go menu reaches folders and servers.
- **Dock**: the launcher and running-app bar at the bottom or side.
- **Continuity**: Handoff between Mac and iPhone, Universal Clipboard, AirDrop, Sidecar, phone calls on the Mac.

## Utilities
- **Disk Utility**: view, partition, erase and format (APFS or exFAT for sharing), and **First Aid** to repair a volume.
- **FileVault**: full-disk encryption; keep the recovery key.
- **Terminal**: the Unix shell; most Linux commands from the next lesson work here.
- **Force Quit** (Command-Option-Esc, or the Apple menu): end a frozen application.

> Exam tip: .dmg is mounted and dragged, .pkg runs an installer, .app is the program. User settings hide in ~/Library. Time Machine backs up; FileVault encrypts; Disk Utility repairs and formats; Force Quit is Command-Option-Esc. Rapid Security Response is the small urgent patch. Keychain holds passwords; Spotlight searches; Mission Control shows every window; Continuity links Mac and iPhone.`,
      hook: ".dmg mount and drag; .pkg installer; .app bundle; App Store; uninstall by Trash or uninstaller. /Applications, /Users, /Library, /System (protected), ~/Library (hidden user settings). Apple ID; managed IDs and MDM restrict. Time Machine, antivirus, updates, Rapid Security Response. Settings: Displays, Network, Printers and Scanners, Privacy and Security, Accessibility, Time Machine. Spaces and Mission Control, Keychain, Spotlight, iCloud and iCloud Drive, iMessage, FaceTime, gestures, Finder, Dock, Continuity. Disk Utility (First Aid), FileVault, Terminal, Force Quit (Command-Option-Esc)."
    },
    {
      id: "u3l2", title: "Linux Commands, Configuration Files, and Components", domain: 1, obj: "1.9", minutes: 12,
      body: `Linux support on the exam is a list of commands and files. Learn each by its job, and the handful of switches and rules that come with it.

## The shell and the rules
Commands are case-sensitive, and so are file names. {{~}} is your home directory, {{/}} the root of the filesystem, {{.}} the current directory, {{..}} the parent. Options start with a dash: {{ls -la}}. Anything that changes the system needs root rights through {{sudo}}.

## File management
- {{ls}} lists files; {{ls -l}} long form with permissions, owner, size, date; {{-a}} includes hidden files (names starting with a dot).
- {{pwd}} prints the working directory. {{cd}} changes it.
- {{mv}} moves or renames; {{cp}} copies ({{cp -r}} for directories); {{rm}} removes ({{rm -r}} recursive, {{-f}} without asking; there is no recycle bin).
- {{chmod}} changes permissions. Each file has read, write, and execute for **owner, group, and others**. Numerically r is 4, w is 2, x is 1, so {{chmod 755 script.sh}} gives the owner everything and others read and execute, {{chmod 644 file}} gives the owner read and write and others read only; symbolically {{chmod +x script.sh}} adds execute.
- {{chown}} changes the owner and group: {{chown user:group file}}, with {{-R}} for a tree.
- {{grep}} searches text: {{grep -i error /var/log/syslog}} (case-insensitive), {{-r}} recursive through directories.
- {{find}} locates files: {{find / -name "*.conf"}}, by size, age, or owner.

## Filesystem management
- {{fsck}} checks and repairs a filesystem, run on an **unmounted** volume (from recovery or on a data disk), like chkdsk.
- {{mount}} attaches a filesystem to a directory: {{mount /dev/sdb1 /mnt/usb}}; {{umount}} detaches it; {{mount}} alone lists what is mounted.

## Administrative
- {{su}} switches to another user, by default **root**, with that account's password; the whole shell becomes root, which is risky.
- {{sudo}} runs one command as root using your own password, logs it, and is the preferred method: {{sudo apt update}}. Users must be in the sudo (or wheel) group.
- The **root** account has unlimited power (user ID 0); many distributions disable its direct login and expect sudo.

## Package management
- {{apt}} on Debian, Ubuntu, and their relatives: {{sudo apt update}} refreshes the package lists, {{sudo apt upgrade}} installs updates, {{sudo apt install package}}, {{sudo apt remove package}}.
- {{dnf}} on Fedora, Red Hat, and relatives (successor to yum): {{sudo dnf install package}}, {{sudo dnf update}}.
Packages come from the distribution's repositories, signed and dependency-resolved; that is Linux's app store.

## Network
- {{ip}} replaced ifconfig: {{ip addr}} (or {{ip a}}) shows addresses, {{ip route}} the routes and gateway, {{ip link}} the interfaces.
- {{ping}} as in Windows, but continuous by default (Ctrl+C stops; {{-c 4}} sends four).
- {{curl}} fetches a URL from the command line; tests web services and downloads files.
- {{dig}} queries DNS in detail (answer, server, timing); nslookup exists too.
- {{traceroute}} lists the hops (tracert's cousin).

## Informational
- {{man command}} opens the manual page; {{q}} quits.
- {{cat file}} prints a file; {{less}} pages through it.
- {{top}} shows live processes with CPU and memory (htop is friendlier); {{ps}} lists processes, {{ps aux}} for everything; {{kill PID}} ends one.
- {{du -sh folder}} shows how much space a directory uses; {{df -h}} shows free space per mounted filesystem. "Disk full" starts with df, then du to find the culprit.

## Text editors
{{nano}} is the beginner-friendly editor: Ctrl+O saves, Ctrl+X exits, the shortcuts are on screen. {{vi}} and {{vim}} are everywhere but modal (press i to insert, Esc then :wq to save and quit).

## Common configuration files
- {{/etc/passwd}}: one line per user account: name, user ID, group ID, home directory, shell. World-readable.
- {{/etc/shadow}}: the hashed passwords and aging rules; readable only by root.
- {{/etc/hosts}}: static name-to-address mappings checked before DNS; the place a manual override or a malware redirect hides.
- {{/etc/fstab}}: filesystems to mount at boot, with mount points and options; a typo here can stop the boot.
- {{/etc/resolv.conf}}: the DNS servers and search domain (often managed by a service such as systemd-resolved or NetworkManager).

## OS components
- The **kernel** is the core that manages hardware, memory, and processes; its version shows with {{uname -r}}.
- The **bootloader** (GRUB on most distributions) loads the kernel; its menu lets you pick a kernel or recovery mode.
- **systemd** is the init system and service manager: {{systemctl status service}}, {{systemctl start}}, {{stop}}, {{restart}}, {{enable}} (start at boot), {{disable}}; {{journalctl}} reads its logs.

> Exam tip: chmod 755 and 644; sudo runs one command as root and is preferred to su; apt for Debian and Ubuntu, dnf for Fedora and Red Hat; ip addr for addresses; df for free space, du for usage; fsck on an unmounted filesystem; /etc/passwd users, /etc/shadow password hashes, /etc/hosts name overrides, /etc/fstab mounts at boot, /etc/resolv.conf DNS; systemd manages services, GRUB is the bootloader, the kernel is the core.`,
      hook: "ls -la, pwd, cd, mv, cp -r, rm -rf. chmod (r4 w2 x1; 755, 644), chown user:group. grep -i, find -name. fsck (unmounted), mount and umount. su (become root) versus sudo (one command, logged, preferred); root is UID 0. apt (Debian, Ubuntu), dnf (Fedora, RHEL). ip addr, ip route, ping -c, curl, dig, traceroute. man, cat, top, ps aux, du -sh, df -h. nano (Ctrl+O, Ctrl+X). /etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf. kernel, GRUB bootloader, systemd (systemctl)."
    }
  ]
});
