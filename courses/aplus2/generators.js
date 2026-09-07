// APlus Academy Core 2 dynamic question generators. Each returns a fresh, computed question so tool names,
// commands, Linux permissions, malware types, effective permissions, the removal procedure, Windows symptoms,
// and backup math never repeat exactly.
window.FRA = window.FRA || {};
(function () {
  const R = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[R(arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let counter = 0;
  const gid = (p) => `gen-${p}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
  // Distinct wrong answers: drop anything equal to the correct value, dedupe, keep three.
  const wrong = (correct, cands) => { const out = []; for (const c of cands) { if (c !== correct && !out.includes(c)) out.push(c); if (out.length === 3) break; } return out; };
  const others = (rows, idx, correct) => shuffle(rows.map(r => r[idx]).filter(v => v && v !== correct)).filter((v, i, a) => a.indexOf(v) === i);

  function build(t, q, correct, distractors, e, prefix) {
    const opts = [correct];
    for (const d of distractors) { if (opts.length >= 4) break; if (!opts.includes(d)) opts.push(d); }
    let k = 1; while (opts.length < 4) { const f = `${correct} (${k++})`; if (!opts.includes(f)) opts.push(f); }
    const a = shuffle(opts);
    return { id: gid(prefix), t, q, a, c: a.indexOf(correct), e, gen: true };
  }

  // ---------- Windows tools (u2l1) ----------
  const TOOLS = [
    ["Task Manager", "taskmgr.exe", "see running processes, performance graphs, startup programs, signed-in users, and services"],
    ["Device Manager", "devmgmt.msc", "view hardware, update or roll back drivers, and see devices with problems"],
    ["Disk Management", "diskmgmt.msc", "create, format, shrink, or extend partitions and assign drive letters"],
    ["Event Viewer", "eventvwr.msc", "read the Application, Security, and System logs"],
    ["Local Users and Groups", "lusrmgr.msc", "manage local accounts and group membership"],
    ["Performance Monitor", "perfmon.msc", "graph performance counters over time and build data collector sets"],
    ["Services", "services.msc", "start, stop, and set the startup type and log-on account of services"],
    ["Task Scheduler", "taskschd.msc", "run programs or scripts on a schedule or on an event trigger"],
    ["Certificate Manager", "certmgr.msc", "view, import, and remove certificates for the user"],
    ["Group Policy Editor", "gpedit.msc", "edit local computer and user policies on Pro and higher editions"],
    ["System Information", "msinfo32.exe", "see a summary of hardware, components, drivers, and the software environment"],
    ["Resource Monitor", "resmon.exe", "watch live CPU, memory, disk, and network use per process"],
    ["System Configuration", "msconfig.exe", "select safe boot, diagnostic startup, and hide or disable services"],
    ["Disk Cleanup", "cleanmgr.exe", "remove temporary files, old updates, and other unneeded files"],
    ["Defragment and Optimize Drives", "dfrgui.exe", "defragment hard disks or trim solid-state drives"],
    ["Registry Editor", "regedit.exe", "view and edit registry keys and values directly"]
  ];
  function tools() {
    const row = pick(TOOLS); const kind = R(3);
    if (kind === 0) return build("u2l1", `Which Windows tool would a technician open to ${row[2]}?`, row[0], others(TOOLS, 0, row[0]), `${row[0]} (${row[1]}) is the tool that lets a technician ${row[2]}.`, "tools");
    if (kind === 1) return build("u2l1", `Which file or console name launches ${row[0]} from the Run box?`, row[1], others(TOOLS, 1, row[1]), `${row[1]} opens ${row[0]}, used to ${row[2]}. Consoles end in .msc and standalone utilities in .exe.`, "tools");
    return build("u2l1", `A technician types ${row[1]} in the Run box. Which tool opens?`, row[0], others(TOOLS, 0, row[0]), `${row[1]} is ${row[0]}, which is used to ${row[2]}.`, "tools");
  }

  // ---------- Windows commands (u2l3) ----------
  const WINCMDS = [
    ["ipconfig", "display the IP address, subnet mask, and gateway of each adapter", "/all", "show full details including the MAC address, DHCP server, and DNS servers"],
    ["ipconfig", "display the IP address, subnet mask, and gateway of each adapter", "/flushdns", "clear the local DNS resolver cache"],
    ["ping", "test whether a host is reachable and measure round-trip time", "-t", "keep sending echo requests until stopped"],
    ["tracert", "show every router hop on the path to a destination", "-d", "skip resolving hop addresses to names so the trace runs faster"],
    ["pathping", "trace the route and then report packet loss at each hop", "", ""],
    ["nslookup", "query a DNS server for a name or address", "", ""],
    ["netstat", "list active connections and listening ports", "-an", "show all connections with numeric addresses and ports"],
    ["hostname", "display the computer's name", "", ""],
    ["net use", "map, list, or disconnect network drives", "", ""],
    ["net user", "create, delete, or modify local user accounts", "", ""],
    ["chkdsk", "check the filesystem for errors", "/f", "fix filesystem errors found on the volume"],
    ["chkdsk", "check the filesystem for errors", "/r", "locate bad sectors and recover readable data, which includes /f"],
    ["diskpart", "manage disks, partitions, and volumes from the command line", "", ""],
    ["format", "create a filesystem on a partition, erasing its contents", "", ""],
    ["sfc", "scan protected system files and replace corrupted ones", "/scannow", "scan every protected file immediately and repair what it can"],
    ["robocopy", "copy directory trees with retries, mirroring, and logging", "/MIR", "mirror a directory tree, deleting destination files that no longer exist in the source"],
    ["xcopy", "copy files and directory trees, older than robocopy", "/E", "copy all subdirectories including empty ones"],
    ["gpupdate", "refresh Group Policy settings on the machine", "/force", "reapply every policy setting, not only changed ones"],
    ["gpresult", "display the Group Policy settings applied to the user and computer", "/r", "show a summary of the applied policy objects"],
    ["shutdown", "shut down, restart, or log off the computer", "/r /t 0", "restart the computer immediately"],
    ["winver", "display the Windows version and build", "", ""],
    ["dir", "list the files and folders in a directory", "", ""],
    ["cd", "change the current directory", "", ""],
    ["md", "create a new directory", "", ""],
    ["rmdir", "remove a directory", "/s", "remove the directory and everything inside it"]
  ];
  const cmdNames = () => WINCMDS.map(r => r[0]).filter((v, i, a) => a.indexOf(v) === i);
  function wincmds() {
    const kind = R(3);
    if (kind === 1) {
      const rows = WINCMDS.filter(r => r[2]); const row = pick(rows);
      return build("u2l3", `What does the ${row[2]} switch do when used with ${row[0]}?`, row[3], shuffle(rows.filter(r => r[3] !== row[3]).map(r => r[3])), `${row[0]} ${row[2]} is used to ${row[3]}. Without the switch, ${row[0]} is used to ${row[1]}.`, "wincmd");
    }
    const row = pick(WINCMDS);
    if (kind === 0) return build("u2l3", `Which Windows command is used to ${row[1]}?`, row[0], shuffle(cmdNames().filter(c => c !== row[0])), `${row[0]} is the command used to ${row[1]}.`, "wincmd");
    return build("u2l3", `A technician needs to ${row[1]}. Which command-line tool does this?`, row[0], shuffle(cmdNames().filter(c => c !== row[0])), `${row[0]} is the tool that will ${row[1]}.`, "wincmd");
  }

  // ---------- Linux commands, permissions, and configuration files (u3l2) ----------
  const LINUX = [
    ["ls", "list the contents of a directory"], ["pwd", "print the current working directory"], ["cd", "change directory"],
    ["mv", "move or rename a file"], ["cp", "copy a file"], ["rm", "delete a file"], ["mkdir", "create a directory"],
    ["df", "show free space on mounted filesystems"], ["du", "show how much space a directory uses"],
    ["cat", "print a file's contents to the screen"], ["grep", "search text for lines matching a pattern"], ["find", "search the filesystem for files by name or attribute"],
    ["chmod", "change a file's permissions"], ["chown", "change a file's owner and group"],
    ["ps", "list running processes"], ["top", "show a live view of processes and resource use"], ["kill", "stop a process by its ID"],
    ["man", "read the manual page for a command"], ["nano", "edit a text file in a simple editor"],
    ["su", "switch to another user account, root by default"], ["sudo", "run one command with root privileges"],
    ["apt-get", "install, update, or remove packages on Debian-based distributions"], ["yum", "install, update, or remove packages on older Red Hat-based distributions"], ["dnf", "install, update, or remove packages on current Red Hat-based distributions"],
    ["ip", "show or configure network interfaces and addresses"], ["dig", "query DNS records in detail"], ["ssh", "open an encrypted remote shell"], ["shutdown", "power off or reboot the system at a given time"]
  ];
  const CONFIGS = [
    ["/etc/passwd", "user accounts with their IDs, home directories, and shells"], ["/etc/shadow", "hashed passwords and password aging"],
    ["/etc/group", "group names and their members"], ["/etc/hosts", "static host name to address mappings checked before DNS"],
    ["/etc/resolv.conf", "the DNS servers the system queries"], ["/etc/fstab", "filesystems to mount at boot"],
    ["/etc/sudoers", "who may run commands with sudo"], ["/etc/ssh/sshd_config", "the SSH server's settings"], ["/var/log", "system and application log files"]
  ];
  const PERMBITS = [["r", 4], ["w", 2], ["x", 1]];
  const permWords = (n) => { const w = []; if (n & 4) w.push("read"); if (n & 2) w.push("write"); if (n & 1) w.push("execute"); return w.length ? w.join(", ") : "no access"; };
  function linux() {
    const kind = R(4);
    if (kind === 0) { const row = pick(LINUX); return build("u3l2", `Which Linux command is used to ${row[1]}?`, row[0], others(LINUX, 0, row[0]), `${row[0]} is the command used to ${row[1]}. Linux commands are case-sensitive and take their options after a dash.`, "linux"); }
    if (kind === 1) { const row = pick(LINUX); return build("u3l2", `What does the Linux command ${row[0]} do?`, row[1], others(LINUX, 1, row[1]), `${row[0]} is used to ${row[1]}. The manual page (man ${row[0]}) lists its options.`, "linux"); }
    if (kind === 2) { const row = pick(CONFIGS); return build("u3l2", `Which file or directory holds ${row[1]}?`, row[0], others(CONFIGS, 0, row[0]), `${row[0]} contains ${row[1]}. Linux keeps configuration in plain text files under /etc and logs under /var/log.`, "linux"); }
    const o = 1 + R(7), g = R(8), t = R(8); const val = `${o}${g}${t}`;
    const cands = []; while (cands.length < 6) { const v = `${1 + R(7)}${R(8)}${R(8)}`; if (v !== val && !cands.includes(v)) cands.push(v); }
    return build("u3l2", `A technician wants the owner to have ${permWords(o)}, the group to have ${permWords(g)}, and others to have ${permWords(t)}. Which chmod value sets this?`, val, cands, `Read is 4, write is 2, and execute is 1; each digit is the sum for owner, group, and others: ${o} for the owner, ${g} for the group, ${t} for others, giving ${val}.`, "linux");
  }

  // ---------- Malware types and tools (u4l4) ----------
  const MALWARE = [
    ["trojan", "software disguised as something useful that installs a backdoor or other malware when the user runs it"],
    ["rootkit", "malware that hides deep in the operating system or firmware and conceals its files and processes from normal tools"],
    ["virus", "malicious code that attaches to files or programs and spreads when they are copied and run"],
    ["spyware", "software that secretly records activity, browsing, and credentials and reports them to an attacker"],
    ["ransomware", "malware that encrypts files and demands payment for the decryption key"],
    ["keylogger", "software or hardware that records every keystroke to capture passwords and card numbers"],
    ["boot sector virus", "malware that infects the master boot record so it runs before the operating system loads"],
    ["cryptominer", "malware that hijacks CPU and GPU cycles to mine cryptocurrency, making the machine hot and slow"],
    ["stalkerware", "monitoring software installed on a victim's device by someone with access, to track location and messages"],
    ["fileless malware", "an attack that runs in memory using legitimate tools such as PowerShell and writes no executable to disk"],
    ["adware", "software that floods the user with advertisements and changes the home page and search engine"],
    ["potentially unwanted program (PUP)", "bundled toolbars and optimizers installed alongside free software, unwanted though not always malicious"]
  ];
  const MTOOLS = [
    ["recovery console", "boot outside the infected operating system to remove files, fix the boot record, or restore"],
    ["endpoint detection and response (EDR)", "watch behavior on each endpoint, detect fileless and novel attacks, and isolate the machine"],
    ["managed detection and response (MDR)", "have an outside security provider run and monitor endpoint detection around the clock"],
    ["extended detection and response (XDR)", "correlate detection across endpoints, email, network, cloud, and servers"],
    ["antivirus", "scan for known malware using signatures and heuristics"],
    ["email security gateway", "filter mail for spam, phishing, malicious attachments, and links before delivery"],
    ["software firewall", "block unsolicited inbound connections on the host and, with rules, outbound calls home"],
    ["user education and antiphishing training", "teach people to recognize and report phishing with simulated campaigns"],
    ["OS reinstallation", "wipe and rebuild the system as the sure cure for rootkits and deep infections"]
  ];
  function malware() {
    const kind = R(3);
    if (kind === 0) { const row = pick(MALWARE); return build("u4l4", `Which type of malware is ${row[1]}?`, row[0], others(MALWARE, 0, row[0]), `A ${row[0]} is ${row[1]}.`, "malware"); }
    if (kind === 1) { const row = pick(MALWARE); return build("u4l4", `What best describes a ${row[0]}?`, row[1], others(MALWARE, 1, row[1]), `A ${row[0]} is ${row[1]}.`, "malware"); }
    const row = pick(MTOOLS); return build("u4l4", `Which tool or method is used to ${row[1]}?`, row[0], others(MTOOLS, 0, row[0]), `${row[0]} is used to ${row[1]}.`, "malware");
  }

  // ---------- Effective permissions (u5l1) ----------
  const SHARE = [["Full Control", 5], ["Change", 4], ["Read", 2]];
  const NTFS = [["Full Control", 5], ["Modify", 4], ["Read & Execute", 3], ["Read", 2]];
  const LEVEL = { 5: "Full Control", 4: "Modify (change contents)", 3: "Read and execute", 2: "Read only" };
  const MOVES = [
    ["copies a file to a folder on the same volume", "the file inherits the destination folder's permissions"],
    ["moves a file to a folder on the same volume", "the file keeps its existing permissions"],
    ["moves a file to a folder on a different volume", "the file inherits the destination folder's permissions"],
    ["copies a file to a folder on a different volume", "the file inherits the destination folder's permissions"]
  ];
  const MOVE_OPTS = ["the file inherits the destination folder's permissions", "the file keeps its existing permissions", "the file loses all permissions and only administrators can open it", "the file's permissions are merged with the destination's"];
  function perms() {
    const kind = R(4);
    if (kind === 3) { const row = pick(MOVES); return build("u5l1", `A user ${row[0]} on an NTFS drive. What happens to the file's permissions?`, row[1], shuffle(MOVE_OPTS.filter(o => o !== row[1])), `When a user ${row[0]}, ${row[1]}. Only a move within the same volume retains permissions; every copy, and every move to another volume, inherits from the destination.`, "perm"); }
    const s = pick(SHARE), n = pick(NTFS); const eff = Math.min(s[1], n[1]);
    if (kind === 2) return build("u5l1", `A user has the ${s[0]} share permission and the ${n[0]} NTFS permission on a folder. What is the user's effective permission when signed in locally at that computer?`, LEVEL[n[1]], shuffle(Object.values(LEVEL).filter(v => v !== LEVEL[n[1]])), `Share permissions apply only over the network. Locally, only NTFS applies, so the ${n[0]} NTFS permission gives ${LEVEL[n[1]]}.`, "perm");
    const group = pick(["Sales", "Marketing", "Engineering", "Finance", "Helpdesk"]);
    return build("u5l1", `The ${group} group has the ${s[0]} share permission and the ${n[0]} NTFS permission on a shared folder. What can a ${group} user do when connecting over the network?`, LEVEL[eff], shuffle(Object.values(LEVEL).filter(v => v !== LEVEL[eff])), `Over the network the effective permission is the most restrictive of share and NTFS. ${s[0]} at the share layer and ${n[0]} at the NTFS layer result in ${LEVEL[eff]}.`, "perm");
  }

  // ---------- Malware removal procedure (u5l8) ----------
  const STEPS = [
    "Investigate and verify malware symptoms", "Quarantine the infected system", "Disable System Restore in Windows Home",
    "Remediate the infected system by updating antimalware and scanning in safe mode or a preinstallation environment",
    "Schedule scans and run updates", "Enable System Restore and create a restore point in Windows Home", "Educate the end user"
  ];
  const DONE = ["confirmed the symptoms are malware", "disconnected the machine from the network", "turned off System Restore", "updated the antimalware tools and removed the infection", "scheduled scans and applied all updates", "re-enabled System Restore and created a restore point"];
  function removal() {
    const kind = R(3);
    if (kind === 0) { const i = R(6); return build("u5l8", `A technician has ${DONE[i]}. According to the malware removal procedure, what is the NEXT step?`, STEPS[i + 1], shuffle(STEPS.filter(s => s !== STEPS[i + 1])), `After step ${i + 1} (${STEPS[i].toLowerCase()}), step ${i + 2} is: ${STEPS[i + 1].toLowerCase()}.`, "removal"); }
    if (kind === 1) { const i = R(7); return build("u5l8", `What is step ${i + 1} of the seven-step malware removal procedure?`, STEPS[i], shuffle(STEPS.filter(s => s !== STEPS[i])), `Step ${i + 1} is: ${STEPS[i].toLowerCase()}. The order is verify, quarantine, disable System Restore, remediate, schedule scans and update, enable System Restore, educate.`, "removal"); }
    const i = 1 + R(6); return build("u5l8", `Which step comes immediately BEFORE "${STEPS[i]}" in the malware removal procedure?`, STEPS[i - 1], shuffle(STEPS.filter(s => s !== STEPS[i - 1] && s !== STEPS[i])), `Step ${i} (${STEPS[i - 1].toLowerCase()}) comes right before step ${i + 1} (${STEPS[i].toLowerCase()}).`, "removal");
  }

  // ---------- Windows symptoms (u6l1) ----------
  const SYMPTOMS = [
    ["a stop error screen appears repeatedly, each time with the same stop code, since a new driver was installed", "a faulty or incompatible driver", "boot to safe mode and roll back the driver"],
    ["the machine has become sluggish and Task Manager shows one unfamiliar process using most of the CPU", "a runaway or malicious process", "identify the process in Task Manager, end it, and scan for malware"],
    ["the computer shuts itself down under heavy load and the case is hot", "overheating from dust or a failed fan", "check temperatures, clean the heatsink and fans, and replace the thermal paste"],
    ["a needed service shows as stopped every morning and the event log names a dependency", "a dependency service failing to start", "check the service's dependencies and log-on account in services.msc and set delayed start"],
    ["Windows warns that the computer is low on memory whenever a large application runs", "insufficient RAM or a leaking application", "close the leaking program, add RAM, and let Windows manage the page file"],
    ["Windows reports that the USB controller does not have enough resources after a docking station was connected", "too many devices sharing one USB controller", "move devices to another controller or use a powered hub"],
    ["the firmware reports that no operating system was found", "a wrong boot order, an unplugged or failed drive, or a damaged boot record", "check the boot order and drive detection in firmware, then repair the boot record from WinRE"],
    ["one user's sign-in takes several minutes while other users sign in quickly", "an oversized or corrupted user profile", "trim the profile and login scripts, or rebuild the profile"],
    ["the clock is years behind, HTTPS sites warn about certificates, and domain logins fail", "a dead CMOS battery causing time drift", "replace the CMOS battery, set the time zone, and resynchronize time"],
    ["Windows starts to load and then restarts in a loop after a monthly update", "a failed or incompatible update", "boot to WinRE and uninstall the latest update, then pause updates"],
    ["several unrelated applications crash at random and files occasionally become corrupted", "failing memory or storage", "run the memory diagnostic and check the drive's health"]
  ];
  function symptoms() {
    const row = pick(SYMPTOMS);
    if (R(2) === 0) return build("u6l1", `A user reports that ${row[0]}. What is the MOST likely cause?`, row[1], others(SYMPTOMS, 1, row[1]), `When ${row[0]}, the likely cause is ${row[1]}. The first action is to ${row[2]}.`, "symptom");
    return build("u6l1", `A technician finds that ${row[0]}. What should the technician do FIRST?`, row[2], others(SYMPTOMS, 2, row[2]), `The likely cause is ${row[1]}, so the first action is to ${row[2]}.`, "symptom");
  }

  // ---------- Backups (u7l3) ----------
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const FACTS = [
    ["In a grandfather-father-son rotation, which backups are the grandfathers?", "the monthly backups kept for a year or longer", ["the daily backups reused each week", "the weekly backups reused each month", "the off-site copies only"]],
    ["In a grandfather-father-son rotation, which backups are the sons?", "the daily backups reused each week", ["the monthly backups kept for a year or longer", "the weekly backups reused each month", "the synthetic full backups"]],
    ["What does the 3-2-1 backup rule call for?", "three copies of the data, on two different media or systems, with one copy off-site", ["three full backups per week, two differentials, one incremental", "three technicians, two vendors, one contract", "three restore tests per year, two on-site, one off-site"]],
    ["Which backup type contains every change since the last full backup and does not clear the archive marks?", "differential", ["incremental", "synthetic full", "full"]],
    ["Which backup type contains only the changes since the most recent backup of any type?", "incremental", ["differential", "full", "mirror"]],
    ["Which backup is assembled on the backup server from an earlier full and later incrementals?", "synthetic full", ["differential", "incremental", "snapshot"]],
    ["Which recovery option should be used to retrieve last week's version of a file without overwriting today's version?", "restore to an alternative location", ["in-place overwrite restore", "reimage the workstation", "restore the whole volume"]],
    ["Why should one backup copy be kept off-site and offline or immutable?", "so fire, theft, flood, or ransomware that reaches the network cannot destroy it", ["so restores are faster", "so the archive bit is preserved", "so incremental chains are shorter"]]
  ];
  function backups() {
    const kind = R(4);
    if (kind === 0) { const f = pick(FACTS); return build("u7l3", f[0], f[1], f[2], `${f[1].charAt(0).toUpperCase() + f[1].slice(1)}. Full, incremental, differential, and synthetic full backups differ in what they copy and how many sets a restore needs; rotation schemes decide what is kept and where.`, "backup"); }
    const d = 1 + R(5); const failDay = DAYS[d]; const type = R(2) === 0 ? "incremental" : "differential";
    if (kind === 1) {
      const sets = type === "incremental" ? d + 1 : 2;
      const cands = shuffle([sets - 1, sets + 1, sets + 2, 1, 2, 3, 4, 5, 6, 7].filter(v => v >= 1 && v !== sets)).map(String).filter((v, i, a) => a.indexOf(v) === i);
      return build("u7l3", `A full backup runs on Sunday and ${type} backups run each night from Monday. The system fails on ${failDay} morning. How many backup sets are needed to restore?`, String(sets), cands, type === "incremental" ? `Each incremental holds only the changes since the previous backup, so the restore needs the Sunday full plus all ${d} incrementals from Monday through ${DAYS[d - 1]}: ${sets} sets.` : `A differential holds every change since the last full, so the restore needs only the Sunday full plus ${DAYS[d - 1]}'s differential: 2 sets.`, "backup");
    }
    if (kind === 2) {
      const change = pick([5, 10, 20, 25]); const n = 2 + R(4); const inc = n * change; const diff = change * n * (n + 1) / 2;
      const ans = type === "incremental" ? inc : diff;
      const cands = shuffle([inc, diff, change, change * n * 2, change * (n + 1), change * (n + 2), change * n * n, diff + change].filter(v => v !== ans)).filter((v, i, a) => a.indexOf(v) === i).map(v => `${v} GB`);
      return build("u7l3", `About ${change} GB of data changes each day. After a Sunday full backup, ${type} backups run Monday through ${DAYS[n - 1]}. How much space do the ${n} ${type} backups use in total?`, `${ans} GB`, cands, type === "incremental" ? `Each incremental holds one day of changes (${change} GB), so ${n} of them use ${n} x ${change} = ${inc} GB.` : `Each differential holds all changes since the full, growing by ${change} GB a day: ${Array.from({ length: n }, (_, i) => change * (i + 1)).join(" + ")} = ${diff} GB.`, "backup");
    }
    const which = type === "incremental" ? `the Sunday full plus every incremental from Monday through ${DAYS[d - 1]}` : `the Sunday full plus only ${DAYS[d - 1]}'s differential`;
    const alt = [`the Sunday full plus only ${DAYS[d - 1]}'s ${type === "incremental" ? "incremental" : "differential"}`, `the Sunday full plus every ${type === "incremental" ? "differential" : "incremental"} from Monday through ${DAYS[d - 1]}`, `only ${DAYS[d - 1]}'s ${type} backup`, `the Sunday full only`];
    return build("u7l3", `A full backup runs on Sunday and ${type} backups run nightly. Which sets must be restored after a failure on ${failDay}?`, which, shuffle(alt.filter(a => a !== which)), type === "incremental" ? `Incrementals each hold only the changes since the previous backup, so the whole chain since the full is needed, in order.` : `A differential holds everything since the last full, so the full plus the latest differential is a complete restore.`, "backup");
  }

  FRA.generators = { u2l1: tools, u2l3: wincmds, u3l2: linux, u4l4: malware, u5l1: perms, u5l8: removal, u6l1: symptoms, u7l3: backups };
  FRA.generate = (lessonId) => { const g = FRA.generators[lessonId]; return g ? g() : null; };
})();
