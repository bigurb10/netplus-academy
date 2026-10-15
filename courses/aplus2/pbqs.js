// APlus Academy Core 2 performance-based questions. Original scenarios in the shape of the exam's PBQs:
// drag into order, match, pick every line that applies, fill a configuration, type a command.
// Graded task by task by engine/pbq.js; three carry seo: true for the public PBQ page.
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};

FRA.pbqs["ap2-win-commands"] = {
  id: "ap2-win-commands", title: "Fix the workstation from the command line", domain: 1, lesson: "u2l3", seo: true,
  scenario: {
    text: "A Windows workstation at a branch office has four problems at once: some protected system files are reported as corrupted, the system drive {{C:}} logged filesystem errors, the PC still reaches the old address of a web server whose DNS record changed this morning, and a new group policy pushed an hour ago has not taken effect. The technician works the fixes from a Command Prompt, then restarts the PC."
  },
  tasks: [
    { id: "files", kind: "command", prompt: "Type the command that verifies the protected system files and replaces any corrupted ones.", expect: ["sfc /scannow"] },
    { id: "disk", kind: "command", prompt: "Type the command that checks the C: drive's filesystem and fixes the errors it finds (no bad-sector scan needed).", expect: ["chkdsk C: /f"], alt: ["chkdsk /f C:"], flagOrder: false },
    { id: "dns", kind: "command", prompt: "Type the command that clears the PC's DNS resolver cache so it looks the web server up again.", expect: ["ipconfig /flushdns"], alt: ["ipconfig -flushdns"] },
    { id: "policy", kind: "command", prompt: "Type the command that applies Group Policy now, reapplying every setting even if it looks unchanged.", expect: ["gpupdate /force"] },
    { id: "restart", kind: "command", prompt: "Type the command that restarts the PC immediately, with no countdown.", expect: ["shutdown /r /t 0"], alt: ["shutdown /t 0 /r", "shutdown -r -t 0", "shutdown -t 0 -r", "shutdown /r /t 00", "shutdown -r -t 00"] },
    { id: "elevate", kind: "choice", prompt: "One of the repair commands refuses to run and says you must be an administrator running a console session. What do you do?", options: [
      "Close the window and open Command Prompt with Run as administrator, then run the command again",
      "Run the same command again until it succeeds",
      "Restart the PC in Safe Mode and run it from there as the same standard user",
      "Sign in with the Guest account and run it there"
    ], expect: 0 }
  ],
  why: {
    files: "Sfc /scannow is the System File Checker: it verifies the protected system files and replaces corrupted ones from the component store, and it must run as administrator. If it cannot repair them, DISM /online /cleanup-image /restorehealth repairs the store first and sfc runs again; chkdsk checks the filesystem, not the system files.",
    disk: "Chkdsk checks a volume's filesystem and /f fixes the errors it finds; on the system drive it schedules the check for the next boot. Chkdsk accepts the drive and the switch in either order. The /r switch also hunts for bad sectors and implies /f, but it is slow and this job did not call for it.",
    dns: "Ipconfig /flushdns clears the resolver cache after a DNS change, so the next lookup asks the server and gets the new address; /displaydns shows what is cached. Ipconfig /release and /renew redo the DHCP lease, which does not touch cached names, and Windows accepts the switch as /flushdns or -flushdns.",
    policy: "Gpupdate applies Group Policy changes now instead of waiting for the refresh interval, and /force reapplies every setting even if it is unchanged. Gpresult /r only reports which policies applied; it changes nothing.",
    restart: "Shutdown /r restarts, and /t 0 sets the countdown to zero so the restart is immediate; plain shutdown /r waits out a default delay, /s shuts down instead of restarting, and /a aborts a scheduled shutdown. The tool also accepts its switches with a dash, and /t 0 can come before /r, but the 0 must follow /t because it is the value of that switch.",
    elevate: "Commands that repair the system, such as sfc /scannow, need an elevated prompt: right-click Command Prompt and choose Run as administrator, and User Account Control asks for consent or an administrator's credentials. Repeating the command changes nothing, Safe Mode does not raise a standard user's rights, and the Guest account has the fewest rights of all."
  }
};

FRA.pbqs["ap2-permissions-form"] = {
  id: "ap2-permissions-form", title: "Give Accounting the right access", domain: 2, lesson: "u5l1", seo: false,
  scenario: {
    text: "A file server shares the folder {{Ledgers}} to two groups. Accounting must open, edit, create, and delete files in it but must not be able to change anyone's permissions. Interns must be able to open and read the files but never change them. On this server, share permissions follow least privilege: each group gets the lowest share level that still lets it do its job, and NTFS permissions do the detailed control."
  },
  tasks: [
    { id: "perms", kind: "form", prompt: "Fill in the permission each group gets on each gate.", fields: [
      { id: "acctshare", label: "Accounting: share permission", expect: ["Change"], normalize: "text" },
      { id: "acctntfs", label: "Accounting: NTFS permission", expect: ["Modify"], normalize: "text" },
      { id: "intshare", label: "Interns: share permission", expect: ["Read"], normalize: "text" },
      { id: "intntfs", label: "Interns: NTFS permission", expect: ["Read", "Read & execute", "Read and execute"], normalize: "text" }
    ] },
    { id: "effective", kind: "choice", prompt: "On another share, a user's share permission is Full Control and the folder's NTFS permission for her is Read. She opens the folder over the network. What is her effective access?", options: [
      "Read",
      "Full Control",
      "Modify",
      "No access"
    ], expect: 0 },
    { id: "both", kind: "choice", prompt: "With the permissions set as the scenario requires, a user who belongs to both Accounting and Interns opens Ledgers over the network. What can she do?", options: [
      "Open, edit, create, and delete files, but not change permissions",
      "Only read the files",
      "Everything, including changing permissions",
      "Nothing; belonging to two groups with different rights blocks access"
    ], expect: 0 }
  ],
  why: {
    perms: "Share permissions offer only Full Control, Change, and Read, so the lowest share level that allows editing is Change, and Read is the lowest for Interns. On NTFS, Modify lets Accounting read, write, create, and delete without the right to change permissions that Full Control adds, and Write alone would not let them open files. For Interns either Read or Read & execute keeps them read-only, since neither lets a user change a file, so both are accepted.",
    effective: "Over the network the effective permission is the most restrictive combination of the share and NTFS permissions, so share Full Control plus NTFS Read equals Read. Full Control and Modify ignore the NTFS gate, and nothing here denies access outright.",
    both: "Permissions from several groups combine as a union within each gate, so her share permission is Change (Change plus Read) and her NTFS permission is Modify (Modify plus Read). Then the more restrictive of the two gates applies over the network, which still lets her edit, create, and delete but not change permissions. Only an explicit Deny would cut her back, and two groups never block access by themselves."
  }
};

FRA.pbqs["ap2-malware-order"] = {
  id: "ap2-malware-order", title: "Remove the malware the right way", domain: 2, lesson: "u5l8", seo: true,
  scenario: {
    text: "A receptionist at a small office calls the help desk: her Windows Home PC has been showing pop-ups all morning and the browser keeps landing on a shopping site she never typed. The technician follows the malware removal procedure from the first call to the hand-back."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the malware removal steps in order.", items: [
      "Investigate and verify malware symptoms",
      "Quarantine the infected system: disconnect it from the network",
      "Disable System Restore in Windows Home",
      "Remediate: update the antimalware software, then scan and remove in safe mode or a preinstallation environment",
      "Schedule scans and run updates",
      "Enable System Restore and create a restore point in Windows Home",
      "Educate the end user"
    ], expect: [0, 1, 2, 3, 4, 5, 6] },
    { id: "restore", kind: "choice", prompt: "Why does System Restore get turned off before the cleaning?", options: [
      "Restore points can hold infected files, so a later restore would reinfect the PC, and the scanner cannot clean inside them",
      "System Restore slows the scan down too much to finish",
      "System Restore keeps the PC connected to the network",
      "Turning it off frees disk space for the new definitions"
    ], expect: 0 },
    { id: "symptoms", kind: "multiselect", prompt: "Pick every symptom that points to malware.", options: [
      "New toolbars appeared in the browser that nobody installed",
      "Searches and typed addresses redirect to an unfamiliar site",
      "The antivirus has been turned off and will not stay on",
      "One pixel on the display stays lit in every picture",
      "The printer reports that its toner is low"
    ], expect: [0, 1, 2] }
  ],
  why: {
    steps: "The order is investigate and verify, quarantine, disable System Restore, remediate, schedule scans and run updates, enable System Restore and create a restore point, then educate. Quarantine first stops the spread, the antimalware is updated before the scan so it catches current malware, and System Restore comes back only once the PC is clean so the new restore point is clean. Education comes last, because by then you know what to teach.",
    restore: "Restore points can contain infected files: left on, a later restore reinfects the machine, and the antimalware tool cannot clean inside them, so turning System Restore off deletes them. It has nothing to do with scan speed, the network connection, or disk space for definitions.",
    symptoms: "Toolbars nobody installed are the mark of a potentially unwanted program, redirection points to a hijacking extension, rogue proxy, or altered DNS or hosts file, and malware often turns off the antivirus to protect itself. A stuck pixel is a display hardware fault and low toner is a supply level; neither is a security symptom."
  }
};

FRA.pbqs["ap2-os-install-order"] = {
  id: "ap2-os-install-order", title: "Install Windows on the new laptop", domain: 1, lesson: "u1l3", seo: false,
  scenario: {
    text: "A user is moving from an old desktop to a new laptop that needs a clean Windows installation from a USB flash drive. The user's files and preferences are still only on the old desktop, which IT collects for recycling this afternoon, so getting them off it comes before anything else. The laptop's firmware runs in UEFI mode, and the office uses a Windows domain."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the installation steps in order.", items: [
      "Back up the user's files and preferences from the old desktop",
      "Check the laptop's hardware, applications, and drivers against Windows' requirements",
      "Create the bootable USB installer and set the boot order (or use the one-time boot menu)",
      "Boot the installer and choose the edition",
      "Partition and format the drive",
      "Install drivers and updates",
      "Create the user's account and join the domain",
      "Restore the user's files and verify that they open"
    ], expect: [0, 1, 2, 3, 4, 5, 6, 7] },
    { id: "style", kind: "choice", prompt: "Which partition style does setup use on this laptop's drive?", options: ["GPT", "MBR", "An extended partition with logical drives", "exFAT"], expect: 0 },
    { id: "inplace", kind: "choice", prompt: "Another user's PC gets an in-place upgrade instead of a clean install. What does the upgrade keep?", options: [
      "Files, applications, and settings",
      "Files only; applications must be reinstalled",
      "Settings only; files must be restored from backup",
      "Nothing; it erases the drive like a clean install"
    ], expect: 0 }
  ],
  why: {
    steps: "Back up first, since the files exist only on a machine leaving today, then check hardware, application, and driver compatibility before spending time on media. Make the boot media and set the boot order so the firmware boots it, then setup asks for the edition before it asks where to install, so partitioning and formatting follow. Drivers and updates come once Windows runs, the account and domain join next, and restoring and verifying the user's data finishes the job.",
    style: "GPT is the partition style for UEFI systems: it allows up to 128 partitions and disks over 2 TB, and UEFI boot requires it. MBR is the legacy BIOS scheme with four primaries and a 2 TB limit, and pairing UEFI with MBR gives no bootable device; an extended partition is part of MBR, and exFAT is a filesystem, not a partition style.",
    inplace: "An in-place upgrade installs the new version over the old and keeps files, applications, and settings. A clean install is the one that erases the target, which is why data must be backed up and applications reinstalled after it."
  }
};

FRA.pbqs["ap2-harden-ms"] = {
  id: "ap2-harden-ms", title: "Harden the front-desk PC", domain: 2, lesson: "u5l3", seo: false,
  scenario: {
    text: "A clinic's front-desk Windows PC sits in the lobby. Several receptionists share it, patients walk past it all day, and now and then someone plugs in a USB stick to print a form. After an audit, the IT lead asks the technician to harden it."
  },
  tasks: [
    { id: "steps", kind: "multiselect", prompt: "Pick every step that hardens this PC.", options: [
      "Keep the Windows Defender Firewall turned on",
      "Disable AutoRun and AutoPlay",
      "Require a screen lock after a short idle timeout",
      "Disable the guest account",
      "Keep the operating system patched",
      "Have everyone use the built-in Administrator account so nothing is blocked",
      "Set User Account Control to never notify",
      "Share the root of C: so staff can save files from any PC"
    ], expect: [0, 1, 2, 3, 4] },
    { id: "account", kind: "choice", prompt: "Which account type should the receptionists use for their daily work?", options: ["Standard user", "Administrator", "Guest", "Power user"], expect: 0 },
    { id: "uac", kind: "choice", prompt: "What does User Account Control do?", options: [
      "Prompts for consent or an administrator's credentials before a task runs with elevated rights",
      "Encrypts the drive so a stolen PC is unreadable",
      "Blocks every inbound connection that has no firewall rule",
      "Locks the screen after a set idle time"
    ], expect: 0 }
  ],
  why: {
    steps: "The firewall stays on, AutoRun and AutoPlay are disabled so an inserted stick cannot launch a program, the screen locks on a timeout, the guest account stays disabled, and patches close the holes malware usually comes in through. Running everyone as Administrator breaks least privilege, UAC set to never notify is a vulnerability, and sharing the root of C: hands the whole drive to the network.",
    account: "Everyone should run as a standard user, which cannot install most software or change system settings without an administrator's credentials. Administrator is for administration only, Guest stays disabled, and Power user is a legacy group with no special rights on modern Windows.",
    uac: "User Account Control prompts for consent or an administrator's credentials before a task runs with elevated rights, which stops malware running as the user from silently changing the system. Drive encryption is BitLocker, blocking unruled inbound traffic is the firewall, and the idle lock is the screen lock timeout."
  }
};

FRA.pbqs["ap2-script-match"] = {
  id: "ap2-script-match", title: "Match the script to its extension", domain: 4, lesson: "u9l1", seo: false,
  scenario: {
    text: "A technician is cleaning up a shared folder of scripts that different admins have written over the years. Before deciding what to keep, she sorts each file by the language it is written in."
  },
  tasks: [
    { id: "ext", kind: "match", prompt: "Match each script language to its file extension.", left: [
      "PowerShell",
      "Bash shell script",
      "Python",
      "Windows batch file",
      "VBScript",
      "JavaScript"
    ], right: [
      ".ps1",
      ".sh",
      ".py",
      ".bat",
      ".vbs",
      ".js",
      ".exe"
    ], expect: [0, 1, 2, 3, 4, 5] },
    { id: "logon", kind: "choice", prompt: "Everyone in Accounting needs the P: drive mapped each time they sign in. What do technicians usually use?", options: [
      "A login script, in batch or PowerShell, that runs at sign-in",
      "A Python script that an admin runs by hand once on the file server",
      "A JavaScript file each user opens in the browser",
      "A shell script stored on the file server"
    ], expect: 0 },
    { id: "risk", kind: "multiselect", prompt: "A coworker found a script online and wants to run it on every PC. Pick every real risk.", options: [
      "It could be malware, or carry it in",
      "It could change or delete system settings or files it was not meant to",
      "A loop that never ends could crash the browser or the system by exhausting memory and CPU",
      "It uses a little CPU time while it runs",
      "It is a text file rather than a compiled program"
    ], expect: [0, 1, 2] }
  ],
  why: {
    ext: "PowerShell scripts end in .ps1, shell scripts for Linux and macOS in .sh, Python in .py, Windows batch files in .bat, VBScript in .vbs, and JavaScript in .js. An .exe is a compiled program, not a script, so it matches none of them.",
    logon: "Remapping network drives is the classic job of a login script, which maps drives and printers by group each time a user signs in; batch and PowerShell are the usual Windows choices, and a Group Policy drive map does the same job. A script run once by hand does not repeat at each sign-in, a browser cannot map a Windows drive, and a shell script on the server does not run on the users' PCs.",
    risk: "The three risks are unintentionally introducing malware, inadvertently changing system settings (a script runs with the rights of whoever launches it, at scale), and crashing the browser or system by mishandling resources. Using some CPU while running is normal, and being plain text is what lets you read a script before running it; read it, test it on one machine in a sandbox, and run only trusted, signed scripts."
  }
};

FRA.pbqs["ap2-backup-form"] = {
  id: "ap2-backup-form", title: "Design the clinic's backups", domain: 4, lesson: "u7l3", seo: false,
  scenario: {
    text: "A small clinic is designing backups for its file server. The owner wants the plan to follow the standard rule for how many copies of the data to keep, on how many kinds of media, and how many away from the building. The clinic is closed only on Sundays, the one window long enough for a full backup, and the owner wants no restore to need more than one week of nightly sets. On the other nights a short job runs after closing."
  },
  tasks: [
    { id: "plan", kind: "form", prompt: "Fill in the backup plan.", fields: [
      { id: "rule", label: "The rule for copies, media, and off-site (three numbers)", expect: ["3-2-1", "3 2 1", "321", "3-2-1 rule", "3/2/1", "3-2-1 backup rule"], normalize: "text" },
      { id: "full", label: "How often the full backup runs", expect: ["weekly", "once a week", "every week", "once weekly", "every Sunday", "Sundays", "Sunday", "once a week on Sunday"], normalize: "text" },
      { id: "inc", label: "Nightly backup type that copies only what changed since the last backup of any type", expect: ["incremental", "incremental backup", "incrementals"], normalize: "text" },
      { id: "diff", label: "Backup type that copies what changed since the last full backup", expect: ["differential", "differential backup", "differentials"], normalize: "text" }
    ] },
    { id: "restore", kind: "choice", prompt: "The server fails on a Friday after the Sunday full and four nightly sets. Which kind of nightly set gives the faster restore?", options: [
      "The type that copies what changed since the last full backup",
      "The type that copies what changed since the last backup of any type",
      "Both restore equally fast",
      "Neither; only a full backup can be restored"
    ], expect: 0 },
    { id: "test", kind: "choice", prompt: "How does the clinic know the backups actually work?", options: [
      "Restore a sample to an alternative location on a schedule and check that the data opens",
      "Check that the backup job's log says it completed",
      "Check that the backup files are about the expected size",
      "Ask the staff whether they have lost any files lately"
    ], expect: 0 }
  ],
  why: {
    plan: "The 3-2-1 rule is at least 3 copies of the data, on 2 different media or systems, with 1 copy off-site. The only window long enough for a full is Sunday and no restore may need more than a week of nightly sets, so the full runs weekly. An incremental copies only what changed since the last backup of any type, the fastest nightly job, and a differential copies everything changed since the last full and grows through the week.",
    restore: "A differential restore needs the last full plus only the latest differential, two sets; an incremental restore needs the last full plus every incremental since, in order, five sets here, and one missing set breaks the chain. Incremental wins on backup speed and space, differential on restore simplicity, and both are restorable.",
    test: "A backup that has never been restored is a hope: a scheduled test restore to an alternative location proves the data comes back, opens, and arrives within the recovery time. A completed job log and a plausible file size do not prove the data can be restored, and waiting for users to notice loss is not testing."
  }
};

FRA.pbqs["ap2-slow-pc-order"] = {
  id: "ap2-slow-pc-order", title: "The PC has been slow for a week", domain: 3, lesson: "u6l1", seo: true,
  scenario: {
    text: "A user reports that her Windows desktop has been slow for about a week: it takes minutes to become usable after sign-in, and programs lag all day. The technician works the case through the troubleshooting method from the first question to the closed ticket."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the technician's actions in the order of the troubleshooting method.", items: [
      "Identify the problem: ask the user what changed a week ago and open Task Manager",
      "Establish a theory: a new startup program or malware is eating resources",
      "Test the theory: do a clean boot and run a full malware scan",
      "Establish a plan of action: remove the startup item",
      "Implement the plan",
      "Verify full functionality: time the boot, have the user confirm the PC is fast again, and schedule regular scans as a preventive measure",
      "Document the findings, actions, and outcome in the ticket"
    ], expect: [0, 1, 2, 3, 4, 5, 6] },
    { id: "rows", kind: "multiselect", shuffle: false, prompt: "These rows are from the PC's Task Manager. Pick every row that points to the cause.", options: [
      "Processes  syncagent.exe            CPU 95%   Memory 210 MB",
      "Processes  Desktop Window Manager   CPU 1%    Memory 60 MB",
      "Startup    SyncAgent                Enabled   Startup impact: High",
      "Startup    Touchpad helper          Disabled  Startup impact: Low",
      "Processes  Settings                 CPU 0%    Memory 12 MB"
    ], expect: [0, 2] },
    { id: "disk", kind: "choice", prompt: "On another slow PC, Task Manager shows the disk at 100 percent nearly all the time. The PC has an old hard disk drive and no single process stands out. What is the best next step?", options: [
      "Check the drive's health for signs of failure, and consider replacing it with an SSD",
      "Turn off Windows Update permanently",
      "Lower the screen resolution",
      "Add a second monitor"
    ], expect: 0 }
  ],
  why: {
    steps: "The method is identify the problem, establish a theory (obvious causes first), test it, establish a plan of action, implement it, verify full functionality with preventive measures, and document. Questioning the user and looking at Task Manager come before any change, the clean boot and scan test the theory before anything is removed, and timing the boot proves the fix before the ticket is closed.",
    rows: "Degraded performance starts in Task Manager with the process using the CPU, memory, or disk, and with the startup programs: a process holding 95 percent of the CPU and an enabled startup item with high impact both point at the new sync tool. A system process at 1 percent, a disabled startup item, and a process at 0 percent are normal and explain nothing.",
    disk: "A disk pinned at 100 percent with no single process to blame points at the drive itself: a failing drive is a cause of degraded performance, so check its health first, and an old hard disk is often simply too slow, which an SSD fixes. Turning off updates leaves security holes open, and the screen resolution and a second monitor have nothing to do with disk load."
  }
};

FRA.pbqs["ap2-linux-commands"] = {
  id: "ap2-linux-commands", title: "Handle the file task on the Linux box", domain: 1, lesson: "u3l2", seo: false,
  scenario: {
    text: "A technician is signed in to a Linux server in her own home directory, which holds the script {{deploy.sh}}, the application log {{app.log}}, the file {{report.txt}}, and a directory named {{backup}}. The script's permissions are currently {{rw-r--r--}}: the owner can read and write, and the group and others can only read. The application writes the word error in lowercase."
  },
  tasks: [
    { id: "chmod", kind: "command", prompt: "Type the command that gives the owner read, write, and execute on deploy.sh, and the group and others read and execute.", expect: ["chmod 755 deploy.sh"], alt: ["chmod u+rwx,go+rx deploy.sh", "chmod u=rwx,go=rx deploy.sh", "chmod +x deploy.sh", "chmod a+x deploy.sh", "chmod ugo+x deploy.sh", "chmod u+x,go+x deploy.sh", "chmod 0755 deploy.sh"] },
    { id: "list", kind: "command", prompt: "Type the command that lists the files in long form, showing each one's permissions, owner, size, and date.", expect: ["ls -l"], alt: ["ls -la", "ls -al"] },
    { id: "grep", kind: "command", prompt: "Type the command that prints every line of app.log that contains error.", expect: ["grep error app.log"], alt: ["grep -i error app.log", "grep 'error' app.log", "grep -i 'error' app.log", "grep \"error\" app.log", "grep -i \"error\" app.log"] },
    { id: "copy", kind: "command", prompt: "Type the command that copies report.txt into the backup directory.", expect: ["cp report.txt backup/"], alt: ["cp report.txt backup", "cp report.txt ./backup/", "cp report.txt ./backup", "cp report.txt backup/report.txt"] },
    { id: "root", kind: "choice", prompt: "Installing a package needs root rights. Which command runs one command as the superuser, using her own password, and logs it?", options: ["sudo", "su", "chown", "man"], expect: 0 }
  ],
  why: {
    chmod: "Read is 4, write 2, and execute 1, so 7 is rwx for the owner and 5 is r-x for the group and others: chmod 755 deploy.sh. The symbolic forms reach the same result from rw-r--r--, but the file name must follow the mode, because chmod reads the mode first and the files after it. From rw-r--r--, adding execute for everyone with chmod +x lands on the same 755.",
    list: "Ls -l is the long listing with permissions, owner, size, and date, and adding -a also shows hidden files whose names start with a dot, so ls -la and ls -al are accepted too. Plain ls shows only the names.",
    grep: "Grep searches text and prints the matching lines, with the pattern before the file name; since the application writes error in lowercase, plain grep finds every line, and -i (case-insensitive) finds them as well. Find locates files by name rather than searching inside them.",
    copy: "Cp copies a file, source first and destination second; naming the directory, with or without the trailing slash, puts the copy inside it under the same name. Mv would move the file rather than copy it, and cp -r is needed only for copying whole directories.",
    root: "Sudo runs one command as root with the user's own password and logs it, which is why it is preferred: sudo apt install package. Su switches the whole shell to another user, by default root, with that account's password, chown changes a file's owner, and man opens a manual page."
  }
};

FRA.pbqs["ap2-safety-match"] = {
  id: "ap2-safety-match", title: "Stay safe on the job", domain: 4, lesson: "u8l1", seo: false,
  scenario: {
    text: "A new bench technician at a regional office is shadowing a senior colleague for a week. Each day brings a different job, and the senior colleague asks which safety practice fits each one before any work starts."
  },
  tasks: [
    { id: "jobs", kind: "match", prompt: "Match each situation to the safety practice it needs.", left: [
      "Opening a PC case to add memory",
      "A small electrical fire in a power strip",
      "Lifting a heavy UPS onto a rack shelf",
      "A toner spill inside a laser printer",
      "A failed power supply that a coworker wants to repair",
      "A cleaning chemical you have not used before"
    ], right: [
      "An ESD wrist strap and a grounded mat",
      "A Class C extinguisher",
      "Bend the knees, keep the back straight, lift with the legs, and get help if it is heavy",
      "A toner-rated vacuum and an air filter mask",
      "Do not open it; its capacitors hold a dangerous charge, so replace the unit",
      "Read the safety data sheet (SDS)",
      "A dust mask alone"
    ], expect: [0, 1, 2, 3, 4, 5] },
    { id: "esd", kind: "choice", prompt: "What does electrostatic discharge do to a component?", options: [
      "It can destroy the part at once or weaken it so it fails weeks later, often with no visible sign",
      "It only harms parts that are powered on",
      "It causes cosmetic marks but no electrical damage",
      "Nothing, unless the discharge is strong enough to feel"
    ], expect: 0 },
    { id: "static", kind: "multiselect", prompt: "Pick every condition that makes static build up.", options: [
      "Dry air, with humidity below about 40 percent",
      "Carpet underfoot",
      "Synthetic clothing",
      "Working on a grounded ESD mat",
      "Humidity around 50 percent"
    ], expect: [0, 1, 2] }
  ],
  why: {
    jobs: "Inside a PC, a wrist strap and a grounded mat keep you at the equipment's potential; an electrical fire takes a Class C extinguisher (CO2 or dry chemical), never water; a heavy load is lifted with the knees bent and the back straight, with help or a cart for anything heavy. Toner dust is an irritant, so a spill gets a toner-rated vacuum and an air filter mask, a power supply holds dangerous voltages and is never opened, and an unfamiliar chemical's hazards and handling are on its SDS. A dust mask alone fits none of these, since it does nothing about the toner itself.",
    esd: "Static you cannot feel, under about 3,000 volts, can still destroy a chip, and the damage may be immediate or latent, where the part fails weeks later with nothing to see. A part need not be powered to be damaged, and the harm is electrical, not cosmetic.",
    static: "Dry air below about 40 percent humidity, carpet, and synthetic clothing all build static, which is why the lesson says to avoid carpet and synthetic clothing while working. A grounded ESD mat drains static away, and moderate humidity around 40 to 60 percent keeps it down."
  }
};
