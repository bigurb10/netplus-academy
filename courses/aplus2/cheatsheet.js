// APlus Academy Core 2 memorization sheet for CompTIA A+ 220-1202. Editions, filesystems, tools by name, commands, security
// terms, symptom-to-cause pairs, procedures in order, and the vocabulary of operational procedures. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "A+ Core 2 Memorization Sheet",
  intro: "Print this and keep it beside you. Core 2 is about names: which Windows tool, which command, which edition, which security term, which step comes next, which symptom points where. Every line here is fair game on the exam.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Exam", "CompTIA A+ Core 2, 220-1202 (A+ needs Core 1 220-1201 and Core 2)"],
          ["Questions and time", "Up to 90 questions in 90 minutes; multiple choice plus performance-based items"],
          ["Passing", "700 on a scale of 100 to 900 (Core 1 needs 675)"],
          ["Operating Systems", "28%"],
          ["Security", "28%"],
          ["Software Troubleshooting", "23%"],
          ["Operational Procedures", "21%"]
        ] },
        { type: "note", text: "Operating systems and security are more than half the exam. Know every tool by its file name, every command by its job, and every procedure in its exact order." }
      ]
    },
    {
      id: "os", title: "Operating systems, filesystems, and Windows editions",
      blocks: [
        { type: "table", cols: ["Operating system", "Facts"], rows: [
          ["Windows", "Workstation OS; Home, Pro, Pro for Workstations, Enterprise; NTFS; domain or workgroup; the only one with Group Policy and BitLocker"],
          ["Linux", "Open-source kernel with distributions (Ubuntu and Debian use apt, Fedora and RHEL use dnf); ext4 or XFS; case-sensitive; root account; systemd"],
          ["macOS", "Apple desktops and laptops only; APFS; App Store; Time Machine; FileVault; Keychain; Spotlight"],
          ["Chrome OS", "Google's browser-centered OS on Chromebooks; cloud storage, Android apps, managed from the Google Admin console"],
          ["iOS and iPadOS", "Apple phones and tablets; closed app store; no sideloading without enterprise profiles"],
          ["Android", "Google's open mobile OS; many vendors; sideloading possible; more fragmentation of updates"],
          ["Vendor life cycle", "End-of-life (EOL): no more security updates; update limitations: hardware or edition blocks a version; Windows 10 support ended October 2025"],
          ["Compatibility", "Applications and drivers are built per OS and per architecture; 32-bit apps run on 64-bit Windows, not the reverse; files move between OSes only on filesystems both can read (exFAT, FAT32)"]
        ] },
        { type: "table", cols: ["Filesystem", "Where", "Remember"], rows: [
          ["NTFS", "Windows system and data drives", "Permissions, encryption (EFS), compression, journaling, huge volumes and files"],
          ["ReFS", "Windows Server and Pro for Workstations", "Resilient: integrity streams, self-healing, very large volumes; not bootable in most editions"],
          ["FAT32", "Old drives, small flash, firmware", "Universal compatibility; 4 GB maximum file size; Windows formats only up to 32 GB"],
          ["exFAT", "Large flash drives and SD cards", "Big files, no 4 GB limit, readable by Windows, macOS, and Linux; no permissions or journaling"],
          ["ext4", "Linux default", "Journaling, large files; Windows cannot read it without extra software"],
          ["XFS", "Linux (RHEL default), servers", "High performance with very large files and volumes"],
          ["APFS", "macOS and iOS", "Snapshots, encryption, cloning, SSD optimized; replaced HFS+"]
        ] },
        { type: "table", cols: ["Windows edition", "What it adds"], rows: [
          ["Home (10 and 11)", "Consumer; workgroup only, no domain join; no BitLocker, no Remote Desktop host, no Group Policy Editor (gpedit.msc); 128 GB RAM limit"],
          ["Pro (10 and 11)", "Domain join, BitLocker, Remote Desktop host, gpedit.msc, Hyper-V; 2 TB RAM"],
          ["Pro for Workstations (10)", "ReFS, persistent memory, up to four CPUs, 6 TB RAM; for high-end workstations"],
          ["Enterprise (10 and 11)", "Volume licensing; adds AppLocker, DirectAccess, advanced management; 6 TB RAM"],
          ["N versions", "European editions without Media Player and media features"],
          ["Desktop and RDP", "Windows 11 has the centered taskbar and new Settings; every edition can be an RDP client, only Pro and above can be an RDP host"],
          ["Upgrade paths", "In-place upgrade keeps files, apps, and settings (Windows 10 to 11 if the hardware qualifies; Home to Pro with a key); clean install wipes; 32-bit to 64-bit requires a clean install"],
          ["Windows 11 hardware", "TPM 2.0, UEFI with Secure Boot capable, 64-bit dual-core 1 GHz CPU, 4 GB RAM, 64 GB storage"]
        ] }
      ]
    },
    {
      id: "install", title: "Installation, upgrades, and application requirements",
      blocks: [
        { type: "table", cols: ["Boot or install item", "Facts"], rows: [
          ["Boot methods", "USB, network (PXE, Preboot Execution Environment), solid-state or flash drive, internet-based (cloud recovery), external or hot-swappable drive, internal drive partition, multiboot (boot menu chooses the OS)"],
          ["Clean install", "Wipes the drive; new OS; restore files afterward"],
          ["Upgrade (in-place)", "Keeps files, apps, and settings; needs a supported path and compatible hardware and drivers"],
          ["Image deployment", "A prepared disk image copied to many machines (cloning, MDT, Configuration Manager)"],
          ["Remote network installation", "Boot from PXE, install from a server share"],
          ["Zero-touch deployment", "Device ships to the user and enrolls itself through the vendor's service (Windows Autopilot); no technician touches it"],
          ["Recovery partition", "Vendor partition that restores the factory image"],
          ["Repair installation", "Reinstalls Windows over itself, keeping data and apps, to fix system files"],
          ["Third-party drivers", "Load storage or RAID drivers during setup when the installer cannot see the disk"],
          ["GPT", "GUID partition table: UEFI, up to 128 partitions, disks over 2 TB"],
          ["MBR", "Master boot record: legacy BIOS, four primary partitions (or three plus an extended), 2 TB limit"],
          ["Upgrade considerations", "Back up files and user preferences; check application and driver support and backward compatibility; hardware compatibility; feature updates twice a year become once a year; product life cycle (EOL date)"]
        ] },
        { type: "list", title: "Application requirements and impact", cols: 2, items: [
          "32-bit versus 64-bit: a 64-bit app needs a 64-bit OS; a 32-bit app runs on either; 32-bit is limited to about 4 GB of addressable memory",
          "Dedicated graphics card with its own VRAM for gaming, CAD, and video; integrated graphics shares system RAM; check VRAM, RAM, CPU, and storage minimums against the machine, not just the OS",
          "External hardware tokens: some software licenses require a USB dongle or key present to run",
          "Distribution: physical media, a mountable ISO file, a downloadable package, or image deployment; verify the download's hash",
          "Impact considerations: device (resources, compatibility), network (bandwidth, ports, licensing servers), operation (training, downtime, workflows), business (cost, compliance, support)",
          "Cloud productivity: email systems, storage with sync and folder settings, collaboration tools (spreadsheets, videoconferencing, presentations, word processing, instant messaging), identity synchronization with the directory, licensing assignment per user"
        ] }
      ]
    },
    {
      id: "tools", title: "Windows tools by file name",
      blocks: [
        { type: "table", cols: ["Tool", "Open with", "Use it for"], rows: [
          ["Task Manager", "Ctrl+Shift+Esc; taskmgr", "Processes (end a hung app, see CPU, memory, disk, network), Performance graphs, Startup apps, Users, Services"],
          ["Event Viewer", "eventvwr.msc", "Application, Security, System logs; errors and warnings behind crashes and failed services"],
          ["Disk Management", "diskmgmt.msc", "Initialize, partition, format, extend, shrink, assign letters, convert MBR and GPT, dynamic disks"],
          ["Task Scheduler", "taskschd.msc", "Run scripts and programs at a time or on an event"],
          ["Device Manager", "devmgmt.msc", "Drivers: update, roll back, disable; yellow triangle means a problem; resource conflicts"],
          ["Certificate Manager", "certmgr.msc", "View, import, and remove user certificates; trusted roots"],
          ["Local Users and Groups", "lusrmgr.msc", "Create accounts, reset passwords, group membership (Pro and above)"],
          ["Performance Monitor", "perfmon.msc", "Counters over time; data collector sets; baselines"],
          ["Group Policy Editor", "gpedit.msc", "Local policies for the computer and users (Pro and above)"],
          ["System Information", "msinfo32.exe", "Hardware, drivers, software inventory; BIOS mode; export a report"],
          ["Resource Monitor", "resmon.exe", "Live CPU, memory, disk, network per process; find what holds a file"],
          ["System Configuration", "msconfig.exe", "Boot options (safe boot), services, startup (now in Task Manager), tools"],
          ["Disk Cleanup", "cleanmgr.exe", "Remove temporary files, old updates, previous installations"],
          ["Disk Defragmenter", "dfrgui.exe", "Optimize drives: defragment HDDs, TRIM SSDs; scheduled weekly"],
          ["Registry Editor", "regedit.exe", "Edit the registry hives (HKLM, HKCU); export a backup before changing anything"],
          ["Microsoft Management Console", "mmc.exe", "Host for snap-ins; build a custom console"]
        ] }
      ]
    },
    {
      id: "commands", title: "Command-line tools",
      blocks: [
        { type: "table", cols: ["Windows command", "Job"], rows: [
          ["cd, dir", "Change directory; list files (dir /a shows hidden)"],
          ["md, rmdir", "Make a directory; remove a directory (rmdir /s removes contents)"],
          ["robocopy", "Robust copy of folder trees with retries, mirroring (/mir), and permissions; xcopy is the old one"],
          ["ipconfig", "Address, mask, gateway; /all adds MAC and DNS; /release and /renew for DHCP; /flushdns clears the resolver cache"],
          ["ping", "Reachability and round trip; -t continuous; ping 127.0.0.1 tests the stack"],
          ["tracert", "Every hop to a destination"],
          ["pathping", "Tracert plus per-hop packet loss statistics over time"],
          ["netstat", "Open connections and listening ports; -a all, -n numeric, -b program names"],
          ["nslookup", "Query DNS for a name or address"],
          ["net use", "Map a drive: net use X: \\\\server\\share; net use * /delete removes mappings"],
          ["net user", "List or manage local accounts; net user name password /add"],
          ["chkdsk", "Check the disk; /f fixes errors; /r locates bad sectors and recovers data"],
          ["format", "Format a volume with a filesystem; destroys data"],
          ["diskpart", "Command-line partitioning: list disk, select disk, clean, create partition, convert gpt"],
          ["hostname, whoami, winver", "Computer name; current user and groups; Windows version dialog"],
          ["[command] /?", "Help for any command"],
          ["gpupdate", "Apply Group Policy now; /force reapplies everything"],
          ["gpresult", "Show applied policies; /r summary"],
          ["sfc", "System File Checker; sfc /scannow repairs protected system files (DISM /online /cleanup-image /restorehealth repairs the source)"],
          ["shutdown", "shutdown /r /t 0 restarts now; /s shuts down"]
        ] },
        { type: "table", cols: ["Linux command", "Job"], rows: [
          ["ls, pwd", "List files (ls -la shows all with permissions); print the working directory"],
          ["cd, mv, cp, rm", "Change directory; move or rename; copy (cp -r for folders); remove (rm -rf removes a tree; no undo)"],
          ["chmod, chown", "Change permissions (r 4, w 2, x 1; owner group other, so 755 and 644); change owner and group"],
          ["grep, find", "Search text inside files; find files by name, size, or age"],
          ["cat, man", "Print a file; read the manual page for a command"],
          ["top, ps", "Live process view; list processes (ps aux)"],
          ["df, du", "Free space per filesystem; space used by a directory (du -sh)"],
          ["fsck, mount", "Check a filesystem (unmounted); attach a filesystem to a directory (umount detaches)"],
          ["su, sudo", "Switch user (to root with a password); run one command as root (sudo, logged, preferred)"],
          ["apt, dnf", "Package managers: apt on Debian and Ubuntu (apt update, apt install); dnf on Fedora and RHEL"],
          ["ip, ping, curl, dig, traceroute", "ip addr and ip route for addressing; ping; curl fetches URLs; dig queries DNS; traceroute lists hops"],
          ["nano", "Simple terminal text editor (vi and vim are the others)"],
          ["/etc/passwd, /etc/shadow", "User accounts; hashed passwords (root only)"],
          ["/etc/hosts, /etc/fstab, /etc/resolv.conf", "Static name mappings; filesystems to mount at boot; DNS servers"],
          ["systemd, kernel, bootloader", "Service manager (systemctl start, enable, status); the kernel is the core; GRUB is the bootloader"],
          ["root", "The all-powerful account (UID 0); log in as a normal user and use sudo"]
        ] }
      ]
    },
    {
      id: "settings", title: "Control Panel, Settings, and Windows networking",
      blocks: [
        { type: "table", cols: ["Control Panel applet", "What lives there"], rows: [
          ["Internet Options", "Browser security zones, proxy (Connections tab, LAN settings), certificates, home page for legacy Internet Explorer settings"],
          ["Devices and Printers", "Add, remove, set default, printer properties and queues"],
          ["Programs and Features", "Uninstall or change programs; turn Windows features on or off; view installed updates"],
          ["Network and Sharing Center", "Adapter settings, network profile, sharing options, troubleshooting"],
          ["System", "Computer name, domain or workgroup, remote settings, System Protection (restore points), advanced (performance, virtual memory, environment variables)"],
          ["Windows Defender Firewall", "Turn on or off per profile; allow an app; advanced inbound and outbound rules by port"],
          ["Mail", "Outlook profiles and data files"],
          ["Sound", "Playback and recording devices, default device, levels"],
          ["User Accounts", "Change account type, passwords, UAC level, credential manager"],
          ["Device Manager", "The same devmgmt.msc"],
          ["Indexing Options", "What Windows Search indexes and where"],
          ["Administrative Tools", "Shortcuts to the MMC consoles"],
          ["File Explorer Options", "General (open in This PC), View (show hidden files, show file extensions, protected OS files), Search"],
          ["Power Options", "Power plans (Balanced, Power saver, High performance); sleep and hibernate timers; what closing the lid does; fast startup; USB selective suspend; standby; hibernate writes RAM to disk, sleep keeps RAM powered"]
        ] },
        { type: "table", cols: ["Settings category", "What lives there"], rows: [
          ["System", "Display, sound, notifications, power and sleep, storage, about"],
          ["Devices", "Bluetooth, printers, mouse, typing, pen, AutoPlay, USB"],
          ["Network and Internet", "Status, Wi-Fi, Ethernet, VPN, proxy, data usage, metered connections"],
          ["Personalization", "Background, colors, lock screen, themes, start, taskbar"],
          ["Apps", "Apps and features (uninstall), default apps, optional features, startup"],
          ["Accounts", "Your info, email accounts, sign-in options (PIN, Windows Hello), access work or school, family"],
          ["Time and Language", "Date and time, region, language, speech"],
          ["Gaming", "Game bar, captures, game mode"],
          ["Ease of Access", "Accessibility: narrator, magnifier, high contrast, captions"],
          ["Privacy", "Location, camera, microphone, diagnostics, app permissions"],
          ["Update and Security", "Windows Update, delivery optimization, Windows Security, backup, troubleshoot, recovery, activation, Find My Device"]
        ] },
        { type: "list", title: "Windows networking", cols: 2, items: [
          "Domain joined: central accounts and Group Policy from Active Directory; workgroup: local accounts on each PC, small networks",
          "Shared resources: printers, file servers, mapped drives (net use or Map network drive); UNC paths \\\\server\\share in File Explorer",
          "Local firewall: allow an application through, add port exceptions, separate rules per profile; public network profile blocks discovery and sharing, private allows it",
          "Client configuration: IP address, subnet mask, gateway, DNS servers; static (typed) or dynamic (DHCP); alternate configuration",
          "Connections: VPN (built-in client, add a VPN connection), wireless (SSID and security type), wired, WWAN cellular (SIM, APN, data plan)",
          "Proxy settings: automatic detection, setup script, or manual address and port; metered connections limit updates and background data"
        ] }
      ]
    },
    {
      id: "mac", title: "macOS and Linux features",
      blocks: [
        { type: "table", cols: ["macOS item", "Facts"], rows: [
          ["File types", ".dmg is a disk image you mount and drag the app from; .pkg is an installer package; .app is the application bundle itself; App Store installs and updates; uninstall by dragging to Trash or running the vendor uninstaller"],
          ["System folders", "/Applications (apps), /Users (home folders), /Library (system-wide support files), /System (the OS, protected), /Users/name/Library (per-user settings, hidden)"],
          ["Apple ID and corporate restrictions", "Personal Apple ID for iCloud and the App Store; managed Apple IDs and MDM restrict what corporate Macs can do"],
          ["Best practices", "Backups with Time Machine, antivirus, updates and patches, Rapid Security Response (small security patches between full updates)"],
          ["System Preferences / Settings", "Displays, Network, Printers and Scanners, Privacy and Security, Accessibility, Time Machine"],
          ["Features", "Multiple desktops (Spaces) and Mission Control, Keychain (passwords), Spotlight (search), iCloud, iMessage, FaceTime, iCloud Drive, trackpad gestures, Finder (file manager), Dock, Continuity and Handoff between Apple devices"],
          ["Utilities", "Disk Utility (partition, format, First Aid), FileVault (full-disk encryption), Terminal (shell), Force Quit (Command-Option-Esc)"]
        ] }
      ]
    },
    {
      id: "security", title: "Security concepts",
      blocks: [
        { type: "list", title: "Physical security and physical access", cols: 2, items: [
          "Bollards stop vehicles; access control vestibule (mantrap) admits one person at a time; badge reader; video surveillance; alarm systems; motion sensors; door locks; equipment locks (cable locks); security guards; fences; lighting; magnetometers (metal detectors)",
          "Physical access: key fobs, smart cards, mobile digital keys, metal keys; biometrics: retina, fingerprint, palm print, facial recognition, voice recognition"
        ] },
        { type: "table", cols: ["Logical security term", "Meaning"], rows: [
          ["Principle of least privilege", "Every account gets only the rights its job needs"],
          ["Zero Trust", "Never trust by location; verify every user and device for every request"],
          ["Access control list", "The list of who may do what to a resource (files, firewalls, routers)"],
          ["MFA methods", "Email code, hardware token, authenticator application, SMS, voice call, TOTP (time-based one-time password), OTP; SMS and voice are the weakest"],
          ["SAML", "Security Assertion Markup Language: passes authentication between an identity provider and a web application; the basis of web SSO"],
          ["SSO", "One login for many systems"],
          ["Just-in-time access", "Elevated rights granted only for the task and the time needed"],
          ["PAM", "Privileged access management: vaulted admin credentials, checked out, logged"],
          ["MDM", "Mobile device management: enroll, configure, enforce, wipe"],
          ["DLP", "Data loss prevention: stops sensitive data leaving by email, upload, or USB"],
          ["IAM", "Identity and access management: the whole system of accounts, roles, and authentication"],
          ["Directory services", "Active Directory and LDAP: the database of users, computers, and groups"]
        ] },
        { type: "table", cols: ["Wireless security", "Facts"], rows: [
          ["WPA2", "AES-CCMP encryption; personal (pre-shared key) or enterprise (802.1X with RADIUS); the minimum acceptable today"],
          ["WPA3", "Stronger: SAE handshake resists offline password guessing, forward secrecy, protected management frames; enterprise 192-bit mode"],
          ["TKIP", "The old WPA encryption; deprecated, weak; never choose it"],
          ["AES", "Advanced Encryption Standard: the strong cipher in WPA2 and WPA3"],
          ["RADIUS", "Central authentication for Wi-Fi and VPN; UDP 1812 and 1813; encrypts only the password"],
          ["TACACS+", "Cisco device administration authentication; TCP 49; encrypts the whole session; separates authentication, authorization, accounting"],
          ["Kerberos", "Active Directory's ticket-based authentication; the KDC issues tickets; clocks must agree within about five minutes"],
          ["Multifactor", "Something you know, have, or are; two of them"]
        ] },
        { type: "table", cols: ["Malware", "Signature"], rows: [
          ["Trojan", "Pretends to be useful software; installs a backdoor"],
          ["Rootkit", "Hides deep in the OS or firmware; invisible to normal tools; often needs a reinstall"],
          ["Virus", "Attaches to files; spreads when they run"],
          ["Spyware", "Watches and reports activity"],
          ["Ransomware", "Encrypts files and demands payment"],
          ["Keylogger", "Records keystrokes for passwords"],
          ["Boot sector virus", "Infects the boot record; loads before the OS"],
          ["Cryptominer", "Steals CPU and GPU to mine currency; slow and hot machine"],
          ["Stalkerware", "Secretly tracks a person's location and messages"],
          ["Fileless", "Lives in memory and legitimate tools (PowerShell); no file for antivirus to scan"],
          ["Adware and PUP", "Ads and unwanted bundled programs; nuisance more than threat"],
          ["Tools", "Recovery console (WinRE), EDR, MDR (managed by a provider), XDR (across endpoints and network), antivirus, antimalware, email security gateway, software firewalls, user education and antiphishing training, OS reinstallation as the last resort"]
        ] },
        { type: "table", cols: ["Social engineering and threats", "Signature"], rows: [
          ["Phishing, vishing, smishing", "Fake email, voice call, SMS; QR code phishing hides the link in a code"],
          ["Spear phishing and whaling", "Targeted at a person; targeted at an executive"],
          ["Shoulder surfing, tailgating", "Watching a screen or keyboard; following someone through a door"],
          ["Impersonation, dumpster diving", "Pretending to be someone; digging paper out of the trash"],
          ["DoS and DDoS", "Flooding a service; distributed from many bots"],
          ["Evil twin", "A rogue access point with the real network's name"],
          ["Zero-day", "Exploits a flaw with no patch yet"],
          ["Spoofing, on-path", "Faking an address or identity; intercepting between two parties"],
          ["Brute force, dictionary", "Trying every password; trying likely words"],
          ["Insider threat", "An authorized person misusing access"],
          ["SQL injection, XSS", "Database commands through a form; scripts injected into a web page"],
          ["BEC, supply chain", "Business email compromise (fake invoice from the boss); attack through a vendor or software pipeline"],
          ["Vulnerabilities", "Non-compliant, unpatched, unprotected (no antivirus or firewall), EOL systems, BYOD devices"]
        ] }
      ]
    },
    {
      id: "winsec", title: "Windows security, Active Directory, hardening, and mobile security",
      blocks: [
        { type: "table", cols: ["Windows security setting", "Facts"], rows: [
          ["Defender Antivirus", "Built in; turn on, keep definitions updated; real-time protection"],
          ["Firewall", "On per profile; port rules and application rules; block inbound by default"],
          ["Accounts", "Local versus Microsoft account; Standard user; Administrator; Guest (disabled); Power Users (legacy group)"],
          ["Sign-in options", "Username and password, PIN, fingerprint, facial recognition, SSO, passwordless Windows Hello"],
          ["NTFS versus share permissions", "Share permissions apply only over the network; NTFS applies locally and remotely; the effective permission is the most restrictive of the two; an explicit deny wins"],
          ["NTFS rules", "Copying to another volume takes the destination's permissions; moving within a volume keeps the original; inheritance flows from the parent unless blocked; attributes: read-only, hidden, system, archive"],
          ["UAC", "User Account Control prompts before elevation; run as administrator only when needed; standard users enter admin credentials"],
          ["BitLocker and To Go", "Full-volume encryption keyed to the TPM (Pro and above); BitLocker To Go for removable drives; save the recovery key"],
          ["EFS", "Encrypting File System: per-file or per-folder encryption tied to the user's certificate; lose the key, lose the files"]
        ] },
        { type: "list", title: "Active Directory tasks", cols: 2, items: [
          "Join the domain from System settings; the computer object appears in AD; users then log in with domain accounts",
          "Login scripts run at sign-in to map drives and printers; home folders give each user a server folder; folder redirection points Documents and Desktop to the server for backup",
          "Organizational units group users and computers so Group Policy can be applied per OU; move objects between OUs to change what applies",
          "Security groups hold users for permissions; assign permissions to groups, never to individuals; Group Policy enforces settings across the domain"
        ] },
        { type: "list", title: "Workstation hardening", cols: 2, items: [
          "Data-at-rest encryption (BitLocker, FileVault); BIOS and UEFI passwords",
          "Passwords: length first, then character types, uniqueness, complexity, expiration; password managers instead of reuse",
          "Users: screensaver locks, log off when away, secure laptops with cable locks, protect PII and passwords",
          "Accounts: restrict permissions, restrict login times, disable the guest account, failed-attempt lockout, timeout and screen lock, account expiration dates",
          "Change the default administrator account and password; disable AutoRun and AutoPlay; disable unused services"
        ] },
        { type: "list", title: "Mobile device security", cols: 2, items: [
          "Device encryption; screen locks (facial recognition, PIN, fingerprint, pattern, swipe; swipe is not security); configuration profiles pushed by MDM",
          "Patch management for the OS and apps; endpoint security (antivirus, antimalware, content filtering)",
          "Locator applications, remote wipe, remote backup, failed-login restrictions (wipe after N attempts)",
          "Policies: MDM enrollment, BYOD versus corporate-owned, profile security requirements"
        ] }
      ]
    },
    {
      id: "network-sec", title: "SOHO, browser, disposal, and the malware removal procedure",
      blocks: [
        { type: "list", title: "SOHO router security", cols: 2, items: [
          "Change default passwords; update firmware; secure management access (HTTPS, disable remote or WAN management); physical placement in a secure spot",
          "IP filtering and MAC filtering; content filtering; disable UPnP; screened subnet (DMZ) for exposed servers",
          "Wireless: change the SSID, disabling SSID broadcast hides but does not secure, WPA3 or WPA2-AES, guest network isolated from the LAN",
          "Firewall: disable unused ports, port forwarding or mapping only for needed services"
        ] },
        { type: "list", title: "Browser security", cols: 2, items: [
          "Download from trusted sources; verify hashes; avoid untrusted sources; keep the browser patched",
          "Extensions and plug-ins only from trusted stores; review permissions; remove unknown ones",
          "Password managers; valid certificates (padlock, no warnings); pop-up blocker; clear browsing data and cache; private browsing mode; sign-in and sync across devices; ad blockers; proxy; secure DNS (DNS over HTTPS)",
          "Browser feature management: enable or disable plug-ins, extensions, and features by policy"
        ] },
        { type: "table", cols: ["Disposal method", "Facts"], rows: [
          ["Drilling, shredding, incineration", "Physical destruction; certain; nothing recoverable"],
          ["Degaussing", "A strong magnet erases magnetic drives and tape; useless on SSDs"],
          ["Erasing and wiping", "Overwriting or secure erase; keeps the drive usable for reuse"],
          ["Low-level format", "Factory-level reset of the drive surface; modern drives do it in firmware"],
          ["Standard format", "Rebuilds the filesystem; a quick format leaves data recoverable"],
          ["Outsourcing", "Third-party vendor with a certificate of destruction or recycling"],
          ["Regulations", "E-waste rules and data laws decide what must be destroyed and how"]
        ] },
        { type: "list", title: "Malware removal, in order", items: [
          "1 Investigate and verify malware symptoms. 2 Quarantine the infected system (disconnect it from the network). 3 Disable System Restore in Windows Home. 4 Remediate: update the antimalware software, scan and remove (safe mode, preinstallation environment), reimage or reinstall if needed. 5 Schedule scans and run updates. 6 Enable System Restore and create a restore point in Windows Home. 7 Educate the end user."
        ] }
      ]
    },
    {
      id: "troubleshoot", title: "Software troubleshooting",
      blocks: [
        { type: "table", cols: ["Windows symptom", "Likely cause and first check"], rows: [
          ["Blue screen of death", "Driver, hardware, or memory fault; note the stop code; recent changes; safe mode; roll back the driver; memory test"],
          ["Degraded performance", "Too many startup items, low RAM, full or failing disk, malware, background updates; Task Manager and Resource Monitor"],
          ["Boot issues", "Corrupted boot files or wrong boot order; Startup Repair in WinRE; bootrec; check the drive"],
          ["Frequent shutdowns", "Overheating, failing power supply, driver; check temperatures and Event Viewer"],
          ["Services not starting", "Dependency or account problem; Services console, Event Viewer, sfc"],
          ["Applications crashing", "Update or reinstall the app; check Event Viewer; compatibility mode; sfc"],
          ["Low memory warnings", "Not enough RAM or paging file; close apps; add RAM; check for leaks"],
          ["USB controller resource warnings", "Too many devices on one controller; move devices to another port or a powered hub"],
          ["System instability", "Bad drivers, failing hardware, corrupt system files; sfc, DISM, memory test, roll back updates"],
          ["No OS found", "Boot order, unplugged drive, corrupted boot sector, USB stick left in; firmware settings; Startup Repair"],
          ["Slow profile load", "Large profile, roaming profile, login scripts, mapped drives timing out, corrupt profile (rebuild it)"],
          ["Time drift", "CMOS battery or a time source failure; sync with the domain or NTP; certificates and Kerberos fail when time is off"]
        ] },
        { type: "list", title: "Windows repair toolbox", cols: 2, items: [
          "Safe mode (minimal drivers), WinRE (Startup Repair, System Restore, Command Prompt, Reset this PC), bootrec /fixmbr /fixboot /rebuildbcd, sfc /scannow, DISM, chkdsk /r, memory diagnostic, driver rollback, uninstall updates, rebuild the user profile, reinstall or repair install"
        ] },
        { type: "table", cols: ["Mobile symptom", "Likely cause and first check"], rows: [
          ["App fails to launch, close, or crashes", "Force stop, clear cache, update, reinstall, restart the device"],
          ["App fails to update or install", "Storage full, OS version too old, no network, store account problem, MDM restriction"],
          ["Slow to respond", "Storage full, too many background apps, old OS, overheating, malware; restart"],
          ["OS fails to update", "Storage, battery level, network, unsupported (EOL) device"],
          ["Battery life issues", "Screen brightness, background apps, radios, poor signal, aged battery, malware"],
          ["Random reboots", "Bad app, OS bug, overheating, failing battery; update, remove recent apps, factory reset last"],
          ["Connectivity issues", "Bluetooth: pair again; Wi-Fi: forget and rejoin, airplane mode; NFC: enable it, remove the case"],
          ["Screen does not autorotate", "Rotation lock is on; then the sensor or a calibration"]
        ] },
        { type: "table", cols: ["Security symptom", "Meaning"], rows: [
          ["Mobile: unofficial app stores, developer mode, root or jailbreak", "Bypass the platform's protections; malware and unsupported by MDM"],
          ["Mobile: unauthorized or malicious app, application spoofing", "A fake copy of a real app; remove it, change passwords"],
          ["Mobile: high network traffic, degraded response, data-usage warnings, ads, fake security warnings, unexpected behavior, leaked files", "Malware or a malicious app; remove, scan, reset if needed"],
          ["PC: cannot access the network, desktop alerts, false antivirus alerts, altered or missing or renamed files, cannot access files, unwanted notifications, update failures", "Infection or a rogue security program; run the malware removal procedure"],
          ["Browser: random pop-ups, certificate warnings, redirection, degraded performance", "Adware, a hijacked browser, a bad extension, or an on-path attack; reset the browser, remove extensions, check DNS and hosts file"]
        ] }
      ]
    },
    {
      id: "ops", title: "Documentation, change management, and backups",
      blocks: [
        { type: "list", title: "Documentation and support", cols: 2, items: [
          "Ticket fields: user information, device information, description of the issue, category, severity, escalation level; write clearly: issue description, progress notes, resolution",
          "Asset management: inventory lists, configuration management database (CMDB), asset tags and IDs, procurement life cycle, warranty and licensing, assigned users",
          "Documents: incident reports, standard operating procedures (SOPs), custom software installation procedures, new-user onboarding checklist, user off-boarding checklist, service-level agreements (internal and external or third-party), knowledge base articles"
        ] },
        { type: "list", title: "Change management", cols: 2, items: [
          "Documented business processes: rollback plan, backup plan, sandbox testing, responsible staff members",
          "Request form: purpose, scope, change type (standard is pre-approved and routine, normal goes to the board, emergency is fixed first and reviewed after), date and time, change freeze periods, maintenance windows",
          "Affected systems and impact, risk analysis and risk level, change board approvals, implementation, peer review, end-user acceptance"
        ] },
        { type: "table", cols: ["Backup term", "Meaning"], rows: [
          ["Full", "Everything; slowest to make, fastest to restore"],
          ["Incremental", "Only what changed since the last backup of any kind; small and fast; restore needs the full plus every incremental in order"],
          ["Differential", "Everything changed since the last full; grows daily; restore needs the full plus the latest differential"],
          ["Synthetic full", "A full backup assembled on the backup server from the last full and later incrementals, without touching the client"],
          ["Recovery", "In-place or overwrite restores over the original; alternative location restores to a new folder or machine to compare"],
          ["Testing", "Restore regularly; a backup never tested is not a backup; set a frequency"],
          ["Rotation", "On-site (fast) versus off-site (disaster); grandfather-father-son: daily, weekly, monthly sets; 3-2-1 rule: three copies, two media types, one off-site"]
        ] }
      ]
    },
    {
      id: "safety", title: "Safety, environment, policy, and professionalism",
      blocks: [
        { type: "list", title: "Safety", cols: 2, items: [
          "ESD: wrist strap clipped to the chassis, ESD mat, antistatic bags, touch bare metal first; humidity around 40 to 60 percent reduces static; never wear a strap inside a power supply or CRT",
          "Electrical: equipment grounding; disconnect power before repairing a PC; do not open power supplies or CRTs (capacitors)",
          "Handling and storage: cable management, antistatic bags, hold boards by the edges; comply with government regulations",
          "Personal: lifting with the legs and asking for help on heavy items; fire safety (class C extinguisher for electrical; pull the plug first); safety goggles; air filter mask for dust and toner"
        ] },
        { type: "list", title: "Environment", cols: 2, items: [
          "Safety data sheet (MSDS or SDS) for handling and disposal of chemicals, toner, batteries",
          "Disposal: batteries to a recycler (lithium is a fire hazard), toner cartridges returned or recycled, monitors and devices to e-waste; never the trash",
          "Temperature and humidity within the vendor's range; ventilation; placement away from heat, dust, and moisture; dust cleanup with compressed air outdoors or a vacuum rated for electronics or toner",
          "Power: surges, brownouts (sags), blackouts; a UPS bridges outages and conditions power; a surge suppressor clamps spikes (joule rating)"
        ] },
        { type: "list", title: "Prohibited content, incident response, licensing, and privacy", cols: 2, items: [
          "Incident response: preserve the scene, document, chain of custody (who held the evidence, when), inform management and law enforcement as required, make a forensic copy of the drive (hash it for integrity), collect in order of volatility (CPU registers and cache, memory, swap and temporary files, disk, remote logs, archives)",
          "Licensing: valid licenses only; DRM enforces them; EULA is the contract; perpetual (buy once) versus subscription; personal-use versus corporate-use; open-source licenses allow use and modification under their terms",
          "NDA and mutual NDA protect confidential information both ways",
          "Regulated data: credit card payment information (PCI DSS), personal government-issued information, PII, healthcare data (HIPAA); data retention requirements set how long records are kept",
          "Acceptable use policy; regulatory and business compliance; splash screens (login banners) state the rules before access"
        ] },
        { type: "list", title: "Communication and professionalism", cols: 2, items: [
          "Professional appearance matching the environment (formal or business casual); proper language without jargon, acronyms, or slang; positive attitude and confidence",
          "Actively listen, do not interrupt; be culturally sensitive; use professional titles; be on time, or call if late; avoid distractions (personal calls, texting, social media, interruptions)",
          "Difficult situations: do not argue or be defensive, do not dismiss or judge, clarify with open-ended questions and restate the issue, use discretion about what you discuss",
          "Set and meet expectations, communicate status, offer repair or replacement options, document the service, follow up later; handle confidential material on screens, desks, and printers with discretion"
        ] }
      ]
    },
    {
      id: "scripting", title: "Scripting, remote access, and AI",
      blocks: [
        { type: "table", cols: ["Script type", "Runs in"], rows: [
          [".bat", "Windows batch, cmd.exe; oldest and simplest"],
          [".ps1", "PowerShell; object-based, the Windows administrator's tool; execution policy may block scripts"],
          [".vbs", "VBScript; legacy Windows scripting (deprecated)"],
          [".sh", "Shell (bash) on Linux and macOS"],
          [".js", "JavaScript; browsers and Node"],
          [".py", "Python; cross-platform automation"],
          ["Use cases", "Basic automation, restarting machines, remapping network drives, installing applications, automated backups, gathering information, initiating updates"],
          ["Considerations", "Scripts can unintentionally introduce malware, inadvertently change system settings, or crash a browser or system by mishandling resources; test in a sandbox, read before running"]
        ] },
        { type: "table", cols: ["Remote access", "Facts"], rows: [
          ["RDP", "Remote Desktop Protocol, TCP 3389; full Windows desktop; host needs Pro or above; use with a VPN or gateway, never open to the internet"],
          ["VPN", "Encrypted tunnel to the office network; then use any tool inside"],
          ["VNC", "Cross-platform screen sharing, port 5900; weak security unless tunneled"],
          ["SSH", "Secure shell, TCP 22; encrypted command line for Linux, macOS, network gear"],
          ["RMM", "Remote monitoring and management agents used by service providers; patching, alerts, remote control"],
          ["SPICE", "Simple Protocol for Independent Computing Environments: remote display for virtual machines (KVM and QEMU)"],
          ["WinRM", "Windows Remote Management: PowerShell remoting over HTTP 5985 and HTTPS 5986"],
          ["Third-party tools", "Screen-sharing, videoconferencing, file transfer, desktop management software; check their security and who can connect"],
          ["Security", "Encryption, MFA, least privilege, logging, closing ports when done, verifying the person on the other end"]
        ] },
        { type: "list", title: "Artificial intelligence basics", cols: 2, items: [
          "Application integration: AI assistants inside office, help desk, and code tools; policy sets appropriate use and forbids plagiarism (passing AI output off as one's own)",
          "Limitations: bias from training data, hallucinations (confident fabrications), accuracy that must be verified",
          "Private versus public AI: public services may store and learn from what you type; never paste confidential data; data security, data source, and data privacy decide which tool is allowed"
        ] }
      ]
    }
  ]
};
