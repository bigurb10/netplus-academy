// SecPlus Academy performance-based questions. Original scenarios in the shape of the exam's PBQs:
// drag into order, match, pick every line that applies, fill a configuration, type a command.
// Graded task by task by engine/pbq.js; three carry seo: true for the public PBQ page.
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};

FRA.pbqs["sec-log-attack"] = {
  id: "sec-log-attack", title: "Find the attack in the log", domain: 4, lesson: "u13l3", seo: true,
  scenario: {
    text: "A clinic's Linux file server, {{files01}}, accepts SSH logins from staff and from a backup host. The security analyst pulls the authentication log for the early hours of the morning after an alert. A copy of the attacker's script, found later, held one common password and a list of staff usernames.",
    log: "Oct 14 02:12:55 files01 sshd[3102]: Accepted publickey for backup from 10.0.4.15 port 40112 ssh2\nOct 14 02:13:07 files01 sshd[3120]: Failed password for adavis from 203.0.113.9 port 51022 ssh2\nOct 14 02:13:07 files01 sshd[3121]: Failed password for bchen from 203.0.113.9 port 51024 ssh2\nOct 14 02:13:07 files01 sshd[3122]: Failed password for cortiz from 203.0.113.9 port 51026 ssh2\nOct 14 02:13:07 files01 sshd[3123]: Failed password for dpatel from 203.0.113.9 port 51028 ssh2\nOct 14 02:13:08 files01 sshd[3124]: Failed password for ewong from 203.0.113.9 port 51030 ssh2\nOct 14 02:13:08 files01 sshd[3125]: Failed password for fmoore from 203.0.113.9 port 51032 ssh2\nOct 14 02:13:08 files01 sshd[3126]: Failed password for gsingh from 203.0.113.9 port 51034 ssh2\nOct 14 02:13:08 files01 sshd[3127]: Failed password for hnguyen from 203.0.113.9 port 51036 ssh2\nOct 14 02:13:09 files01 sshd[3128]: Accepted password for jlopez from 203.0.113.9 port 51040 ssh2\nOct 14 02:15:01 files01 CRON[3140]: pam_unix(cron:session): session opened for user root by (uid=0)\nOct 14 02:21:40 files01 sshd[3155]: Accepted password for mlee from 10.0.4.22 port 40230 ssh2"
  },
  tasks: [
    { id: "lines", kind: "multiselect", shuffle: false, prompt: "Pick every log line that is part of the attack.", options: [
      "Oct 14 02:12:55 files01 sshd[3102]: Accepted publickey for backup from 10.0.4.15 port 40112 ssh2",
      "Oct 14 02:13:07 files01 sshd[3120]: Failed password for adavis from 203.0.113.9 port 51022 ssh2",
      "Oct 14 02:13:07 files01 sshd[3121]: Failed password for bchen from 203.0.113.9 port 51024 ssh2",
      "Oct 14 02:13:07 files01 sshd[3122]: Failed password for cortiz from 203.0.113.9 port 51026 ssh2",
      "Oct 14 02:13:07 files01 sshd[3123]: Failed password for dpatel from 203.0.113.9 port 51028 ssh2",
      "Oct 14 02:13:08 files01 sshd[3124]: Failed password for ewong from 203.0.113.9 port 51030 ssh2",
      "Oct 14 02:13:08 files01 sshd[3125]: Failed password for fmoore from 203.0.113.9 port 51032 ssh2",
      "Oct 14 02:13:08 files01 sshd[3126]: Failed password for gsingh from 203.0.113.9 port 51034 ssh2",
      "Oct 14 02:13:08 files01 sshd[3127]: Failed password for hnguyen from 203.0.113.9 port 51036 ssh2",
      "Oct 14 02:13:09 files01 sshd[3128]: Accepted password for jlopez from 203.0.113.9 port 51040 ssh2",
      "Oct 14 02:15:01 files01 CRON[3140]: pam_unix(cron:session): session opened for user root by (uid=0)",
      "Oct 14 02:21:40 files01 sshd[3155]: Accepted password for mlee from 10.0.4.22 port 40230 ssh2"
    ], expect: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { id: "name", kind: "choice", prompt: "Which attack does the log show?", options: [
      "Password spraying",
      "Brute force against one account",
      "Credential stuffing with pairs leaked from another site",
      "Credential replay of a captured session token"
    ], expect: 0 },
    { id: "block", kind: "command", prompt: "The server's host firewall is ufw, and its rule 1 already allows SSH from anywhere. Type the command that blocks every connection from the attacking address and takes effect ahead of that allow rule.", expect: ["sudo ufw insert 1 deny from 203.0.113.9"], alt: [
      "ufw insert 1 deny from 203.0.113.9",
      "sudo ufw insert 1 deny from 203.0.113.9 to any",
      "ufw insert 1 deny from 203.0.113.9 to any",
      "sudo iptables -I INPUT -s 203.0.113.9 -j DROP",
      "iptables -I INPUT -s 203.0.113.9 -j DROP",
      "sudo iptables -I INPUT 1 -s 203.0.113.9 -j DROP",
      "iptables -I INPUT 1 -s 203.0.113.9 -j DROP",
      "sudo ufw prepend deny from 203.0.113.9",
      "ufw prepend deny from 203.0.113.9",
      "sudo ufw prepend deny from 203.0.113.9 to any",
      "ufw prepend deny from 203.0.113.9 to any"
    ] },
    { id: "control", kind: "choice", prompt: "Which control would have stopped this attack from getting in?", options: [
      "Multifactor authentication on every account",
      "Account lockout after five failed attempts",
      "A longer password expiry period",
      "Encrypting the authentication log"
    ], expect: 0 }
  ],
  why: {
    lines: "The attack is the eight failed logins for eight different usernames from 203.0.113.9 inside two seconds, plus the accepted login for jlopez from the same address a second later, which is the attacker getting in. The publickey login from the backup host, the scheduled cron session, and mlee's login from an internal address are normal activity, so they are not part of it.",
    name: "Password spraying tries one common password against many accounts, and its tell is many accounts with a single failed login in the same window, exactly what this log shows. Brute force hammers one account with many guesses, credential stuffing replays username and password pairs leaked from another site rather than one password, and credential replay reuses a captured hash or token instead of guessing.",
    block: "ufw and iptables check rules in order and the first match wins, so a deny appended below the SSH allow rule would never be reached for SSH, the very traffic the attacker uses; ufw insert 1 deny from 203.0.113.9 puts the block at the top. The same rule written directly in iptables, iptables -I INPUT -s 203.0.113.9 -j DROP, inserts at the top too and is accepted; blocking addresses is part of containment. ufw prepend deny from 203.0.113.9 also inserts at the top and is accepted.",
    control: "MFA stops spraying, because a guessed password alone no longer opens the account. Account lockout does not, because spraying makes only one attempt per account and stays under the threshold; password expiry and encrypting the log do nothing to stop the guess."
  }
};

FRA.pbqs["sec-ir-order"] = {
  id: "sec-ir-order", title: "A ransomware note appears on a workstation", domain: 4, lesson: "u13l1", seo: true,
  scenario: {
    text: "A front-desk workstation at a clinic shows a ransom note, and the endpoint agent raises an alert at the same moment. The response team works the incident from its playbook. Months earlier the team wrote that playbook, listed its contacts, and set up offline backups."
  },
  tasks: [
    { id: "steps", kind: "order", prompt: "Put the team's actions in the order of the incident response process.", items: [
      "Write the playbook, list the team's contacts, and set up offline backups",
      "Notice the ransom note and the endpoint agent's alert",
      "Confirm the incident, identify the ransomware strain, and find every affected system",
      "Isolate the workstation and segment the network so the malware cannot spread",
      "Remove the malware and close the hole it came in through",
      "Restore from clean backups and monitor closely for the attacker's return",
      "Write the report and change the controls and plans that fell short"
    ], expect: [0, 1, 2, 3, 4, 5, 6] },
    { id: "first", kind: "choice", prompt: "The incident is confirmed. What do you do first with the infected workstation?", options: [
      "Isolate it from the network and leave it powered on",
      "Power it off immediately",
      "Restore it from last night's backup",
      "Reimage it and return it to the front desk"
    ], expect: 0 },
    { id: "report", kind: "multiselect", prompt: "Pick every item that belongs in the lessons-learned report.", options: [
      "What happened, in order, with times",
      "What worked in the response",
      "What did not work or was slow",
      "The controls and plans to change",
      "The administrator passwords used during recovery"
    ], expect: [0, 1, 2, 3] }
  ],
  why: {
    steps: "The order is preparation, detection, analysis, containment, eradication, recovery, and lessons learned. The playbook and backups are preparation, the note and alert are detection, confirming and scoping is analysis, isolating is containment, removing the malware is eradication, restoring from clean sources is recovery, and the report closes the case and feeds preparation.",
    first: "After an incident is confirmed the next step is always containment, so the host comes off the network to stop the spread. Powering it off destroys the contents of memory, volatile evidence that is captured before a system is shut down; restoring or reimaging now skips analysis and eradication and would put the host back before the cause is removed.",
    report: "Lessons learned reviews what happened, what worked, what did not, and which controls and plans to change, then feeds that back into preparation. Passwords are credentials, not findings, and never belong in a report."
  }
};

FRA.pbqs["sec-attack-match"] = {
  id: "sec-attack-match", title: "Name the attack", domain: 2, lesson: "u5l2", seo: false,
  scenario: {
    text: "A security analyst at a small chain of shops is sorting this month's incident summaries by attack type before the monthly report."
  },
  tasks: [
    { id: "attacks", kind: "match", prompt: "Match each incident to the attack it describes.", left: [
      "An access point in the coffee shop next door broadcasts the shop's own Wi-Fi name, and staff laptops connect to it",
      "Staff get a text message with a link to reset their bank password",
      "Thousands of infected hosts flood the online store with requests until it stops answering",
      "An attacker silently relays and reads the traffic between a register and the payment server",
      "A forged DNS answer sends staff to a fake sign-in site while the address bar looks right"
    ], right: [
      "Evil twin",
      "Smishing",
      "DDoS",
      "On-path",
      "DNS poisoning",
      "SQL injection",
      "Vishing"
    ], expect: [0, 1, 2, 3, 4] },
    { id: "waf", kind: "choice", prompt: "The online store's web application also needs protection. Which attack does a web application firewall (WAF) defend against?", options: [
      "Injection attacks such as SQL injection against the web application",
      "An evil twin access point near the shop",
      "A text message phishing campaign against staff",
      "Deauthentication frames sent to wireless clients"
    ], expect: 0 },
    { id: "dns", kind: "choice", prompt: "Which control stops the forged DNS answer from being trusted?", options: [
      "DNSSEC",
      "WPA3",
      "Rate limiting at the web server",
      "Parameterized queries"
    ], expect: 0 }
  ],
  why: {
    attacks: "An attacker's access point broadcasting your network name is an evil twin, a text with a link to reset a bank password is smishing, many sources flooding one target is DDoS, an attacker sitting between two parties reading or altering traffic is on-path, and a forged DNS answer that sends users to an attacker site is DNS poisoning. SQL injection attacks a database through application input and vishing is phishing by voice call, so neither fits any of these incidents.",
    waf: "A WAF sits in front of a web application and inspects HTTP traffic for injection, cross-site scripting, and other application attacks; it protects the application, not the network. Evil twins and deauthentication are wireless attacks, stopped by WPA3, 802.1X, and protected management frames, and smishing is stopped by training people to verify requests through a second channel.",
    dns: "DNSSEC signs DNS answers so a resolver can reject a forged one; DNS filtering and registrar locks are the other DNS defenses. WPA3 protects wireless links, rate limiting blunts floods, and parameterized queries stop SQL injection, so none of them helps against a poisoned answer."
  }
};

FRA.pbqs["sec-firewall-acl"] = {
  id: "sec-firewall-acl", title: "Write the ACL for the web server's zone", domain: 3, lesson: "u7l2", seo: false,
  scenario: {
    text: "A clinic's public web server, {{172.16.50.10}}, sits in its own zone between the internet and the internal network. Administrators work from a jump host on the admin subnet {{10.0.9.0/24}} and manage the servers in that zone over SSH. Policy: replies to established sessions are allowed; anyone may reach the web server on HTTPS; the admin subnet may reach the zone's servers over SSH; everything else is denied and logged. The team orders allow rules by traffic: established replies are most of it, public HTTPS is next, and admin SSH is occasional.",
    svg: "<svg viewBox=\"0 0 420 220\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11\" fill=\"currentColor\">\n"
      + "<rect x=\"10\" y=\"92\" width=\"90\" height=\"36\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"32\" y=\"114\">Internet</text>\n"
      + "<line x1=\"100\" y1=\"110\" x2=\"160\" y2=\"110\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<rect x=\"160\" y=\"92\" width=\"90\" height=\"36\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"180\" y=\"114\">Firewall</text>\n"
      + "<line x1=\"250\" y1=\"100\" x2=\"290\" y2=\"50\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<line x1=\"250\" y1=\"120\" x2=\"290\" y2=\"170\" stroke=\"currentColor\" stroke-width=\"2\"/>\n"
      + "<rect x=\"290\" y=\"20\" width=\"120\" height=\"50\" rx=\"4\" fill=\"none\" stroke=\"currentColor\" stroke-dasharray=\"4 3\"/>\n"
      + "<text x=\"302\" y=\"40\">Web server</text>\n"
      + "<text x=\"302\" y=\"58\">172.16.50.10</text>\n"
      + "<rect x=\"290\" y=\"150\" width=\"120\" height=\"50\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/>\n"
      + "<text x=\"302\" y=\"170\">Admin subnet</text>\n"
      + "<text x=\"302\" y=\"188\">10.0.9.0/24, jump host</text>\n"
      + "</svg>"
  },
  tasks: [
    { id: "rules", kind: "order", prompt: "Put the rules in the order the firewall should process them, top to bottom.", items: [
      "Permit replies to established sessions",
      "Permit any source to 172.16.50.10 on HTTPS",
      "Permit 10.0.9.0/24 to the web server's zone on SSH",
      "Deny any source to any destination, and log it"
    ], expect: [0, 1, 2, 3] },
    { id: "fill", kind: "form", prompt: "Fill in the two service ports and the name of the web server's zone.", fields: [
      { id: "https", label: "HTTPS port", expect: ["443"], normalize: "number" },
      { id: "ssh", label: "SSH port", expect: ["22"], normalize: "number" },
      { id: "zone", label: "The zone between the internet and the internal network that holds the web server", expect: ["screened subnet", "DMZ", "demilitarized zone"], normalize: "text" }
    ] },
    { id: "deny", kind: "choice", prompt: "Where in the rule list does the explicit deny rule belong?", options: [
      "Last, below every permit rule",
      "First, above every permit rule",
      "Directly below the established-sessions rule",
      "Anywhere, because the firewall reads every rule before deciding"
    ], expect: 0 }
  ],
  why: {
    rules: "Firewall rules are processed top to bottom and the first match wins, so the permits go in the order the policy sets, busiest first, and the deny goes last. A deny any any above a permit would block that permit's traffic, because the firewall would never reach it.",
    fill: "HTTPS uses port 443 and SSH uses port 22, the encrypted replacements for HTTP and Telnet. The zone that holds public-facing servers between the internet and the internal network is the screened subnet, still widely called the DMZ (demilitarized zone); all three names are accepted.",
    deny: "The first match wins, so a deny placed above the permits would block them, and one placed between permits would block every permit below it. The list ends with an implicit deny anyway; the explicit deny any any sits last so the dropped traffic is logged."
  }
};

FRA.pbqs["sec-wifi-config"] = {
  id: "sec-wifi-config", title: "Secure the clinic's wireless", domain: 4, lesson: "u9l2", seo: false,
  scenario: {
    text: "A clinic's staff Wi-Fi uses one shared passphrase that every employee knows, and a nurse who left last month still has it. The clinic is moving staff to individual sign-in checked against an authentication server. Every staff laptop now carries a device certificate from the clinic's own certificate authority, and policy asks for the strongest authentication method."
  },
  tasks: [
    { id: "cfg", kind: "form", prompt: "Fill in the new staff network settings.", fields: [
      { id: "mode", label: "Security mode (the full variant name)", expect: ["WPA3-Enterprise", "WPA3 Enterprise", "WPA2-Enterprise", "WPA2 Enterprise"], normalize: "text" },
      { id: "std", label: "Standard that keeps the connection closed until the user is approved", expect: ["802.1X", "IEEE 802.1X"], normalize: "text" },
      { id: "server", label: "Type of authentication server", expect: ["RADIUS"], normalize: "text" },
      { id: "eap", label: "EAP method", expect: ["EAP-TLS", "EAP TLS"], normalize: "text" }
    ] },
    { id: "change", kind: "multiselect", prompt: "The access points currently run these settings. Pick every one you change.", options: [
      "Staff network secured with one shared passphrase",
      "WPA with TKIP allowed for an old label printer",
      "5 GHz band enabled",
      "Protected management frames required"
    ], expect: [0, 1] },
    { id: "reason", kind: "choice", prompt: "Why does the clinic choose enterprise mode over a pre-shared key?", options: [
      "Each user has their own credentials, so one person's access can be revoked without changing it for everyone",
      "Enterprise mode needs no authentication server",
      "A pre-shared key cannot use AES encryption",
      "Enterprise mode turns off the 2.4 GHz band"
    ], expect: 0 }
  ],
  why: {
    cfg: "Individual credentials for each wireless user is WPA Enterprise with 802.1X and RADIUS. WPA3-Enterprise is the current standard and WPA2-Enterprise with AES is still acceptable, so both are accepted. EAP-TLS, with certificates on both sides, is the strongest method, and the laptops already carry certificates; PEAP and EAP-TTLS protect password-based sign-in and are not the strongest.",
    change: "The shared passphrase is the problem being solved, and WPA with TKIP is deprecated, so both change. The 5 GHz band is not a weakness, and protected management frames are a defense against wireless attacks such as deauthentication, so both stay.",
    reason: "Enterprise mode authenticates each user or device individually against RADIUS, so one departing employee does not force a password change for everyone. It does need an authentication server, a pre-shared key network still uses AES under WPA2 or WPA3, and the security mode has nothing to do with which band is on."
  }
};

FRA.pbqs["sec-harden-server"] = {
  id: "sec-harden-server", title: "Harden the new file server", domain: 4, lesson: "u9l1", seo: false,
  scenario: {
    text: "A shop is putting a new file server into service. It arrived from the vendor with factory settings and a default admin account, and the team wants it hardened to the company's server baseline before it holds any data."
  },
  tasks: [
    { id: "checklist", kind: "multiselect", prompt: "Pick every item that belongs on the hardening checklist.", options: [
      "Apply the latest patches",
      "Change the default credentials",
      "Disable unused services and close unused ports",
      "Enable the host-based firewall",
      "Remove software the server's role does not need",
      "Enable Telnet for remote administration",
      "Allow anonymous FTP so staff can drop files without signing in",
      "Keep the vendor's default admin account for support calls"
    ], expect: [0, 1, 2, 3, 4] },
    { id: "lifecycle", kind: "order", prompt: "Put the baseline work for this server in order.", items: [
      "Define the server baseline: allowed services, open ports, password rules, logging, and patch level",
      "Apply the baseline to the new server through automation",
      "Monitor the server for drift from the baseline",
      "Re-apply the baseline where the server's settings have drifted"
    ], expect: [0, 1, 2, 3] },
    { id: "remote", kind: "choice", prompt: "What should administrators use for remote command-line administration instead of Telnet?", options: ["SSH", "FTP", "SNMPv1", "HTTP"], expect: 0 }
  ],
  why: {
    checklist: "Every target gets the same moves: remove what is not needed, change what is default, keep it patched, and turn on the host firewall, so the first five items belong. Telnet and anonymous FTP send data in the clear or let anyone in, and a vendor default account is public knowledge, so each of those leaves a hole the baseline exists to close.",
    lifecycle: "A secure baseline is established, deployed, then maintained. You define the settings first, apply them to the system, ideally through automation so nothing is missed, then monitor for drift and re-apply when settings change.",
    remote: "SSH, not Telnet, is the hardening rule for remote administration, because SSH encrypts the session and Telnet sends everything, passwords included, in plain text. FTP and HTTP are plaintext too, and SNMPv1 is a monitoring protocol replaced by SNMPv3."
  }
};

FRA.pbqs["sec-pki-match"] = {
  id: "sec-pki-match", title: "Who does what in PKI", domain: 1, lesson: "u2l4", seo: true,
  scenario: {
    text: "A clinic is putting a certificate on its patient portal for the first time. The new administrator has a list of the PKI pieces involved and needs to know what each one does."
  },
  tasks: [
    { id: "roles", kind: "match", prompt: "Match each job to the PKI piece that does it.", left: [
      "Issues and signs certificates",
      "Verifies the applicant's identity before anything is issued",
      "A list of revoked certificate serial numbers that clients download",
      "Answers a real-time question about whether one certificate is revoked",
      "The file the server sends to request a certificate",
      "The key that must never leave the server"
    ], right: [
      "Certificate authority (CA)",
      "Registration authority (RA)",
      "Certificate revocation list (CRL)",
      "OCSP",
      "Certificate signing request (CSR)",
      "Private key",
      "Public key"
    ], expect: [0, 1, 2, 3, 4, 5] },
    { id: "encrypt", kind: "choice", prompt: "A patient's browser must send a secret that only the portal server can read. Which key encrypts it?", options: [
      "The server's public key",
      "The server's private key",
      "The browser's private key",
      "The certificate authority's private key"
    ], expect: 0 },
    { id: "checks", kind: "multiselect", prompt: "Pick every check a browser makes on the portal's certificate before it trusts it.", options: [
      "The certificate has not expired",
      "The certificate chains to a trusted root",
      "The name on the certificate matches the site's hostname",
      "The certificate has not been revoked",
      "The certificate file is under a certain size"
    ], expect: [0, 1, 2, 3] }
  ],
  why: {
    roles: "The CA issues and signs certificates, the RA verifies the requester before the CA issues anything, the CRL is a periodically downloaded list of revoked serial numbers, OCSP answers one certificate's status in real time, and the CSR carries the public key and identity details to the CA. The private key is generated on the server and never leaves it; the public key is the half that goes into the CSR and the certificate, so it is the slot left over.",
    encrypt: "To encrypt something only the recipient can read, use the recipient's public key; only the matching private key, which stays on the server, can decrypt. Encrypting with a private key is how a signature proves who sent something, not how a secret is kept.",
    checks: "A browser warns when a certificate is expired, does not chain to a trusted root, has been revoked (checked through a CRL or OCSP), or names a different host; that is why wildcard and subject alternative name certificates exist, to cover more names. File size plays no part in trust."
  }
};

FRA.pbqs["sec-access-matrix"] = {
  id: "sec-access-matrix", title: "Fill the access control matrix", domain: 4, lesson: "u12l2", seo: false,
  scenario: {
    text: "A clinic grants access by job role. Policy: the HR manager maintains the personnel records, reading and changing them. The payroll clerk prepares the payroll export each pay period, reading and correcting it. The intern files paper forms at the front desk and needs neither system. Write each cell as read/write or none."
  },
  tasks: [
    { id: "matrix", kind: "form", prompt: "Fill in the four cells of the access control matrix.", fields: [
      { id: "hr_records", label: "HR manager on personnel records", expect: ["read/write", "read and write", "rw"], normalize: "text" },
      { id: "clerk_payroll", label: "Payroll clerk on payroll export", expect: ["read/write", "read and write", "rw"], normalize: "text" },
      { id: "intern_records", label: "Intern on personnel records", expect: ["none", "no access"], normalize: "text" },
      { id: "intern_payroll", label: "Intern on payroll export", expect: ["none", "no access"], normalize: "text" }
    ] },
    { id: "model", kind: "choice", prompt: "Permissions attach to the HR manager, payroll clerk, and intern jobs, and each person gets the rights of their job. Which access control model is this?", options: [
      "Role-based access control (RBAC)",
      "Mandatory access control (MAC)",
      "Discretionary access control (DAC)",
      "Attribute-based access control (ABAC)"
    ], expect: 0 },
    { id: "principle", kind: "choice", prompt: "The intern's row is empty because the intern's job needs neither system. Which principle does that row show?", options: [
      "Least privilege",
      "Separation of duties",
      "Non-repudiation",
      "Time-of-day restrictions"
    ], expect: 0 }
  ],
  why: {
    matrix: "The policy says the HR manager reads and changes the personnel records and the payroll clerk reads and corrects the payroll export, so both cells are read/write (read and write, or rw). The intern's job touches neither system, so both of the intern's cells are none (no access).",
    model: "Role-based access control attaches permissions to roles and assigns users to roles, which is the enterprise default because it scales and audits well. MAC uses labels users cannot change, DAC lets each resource's owner decide, and ABAC decides from combined attributes such as department, device, and location.",
    principle: "Least privilege grants only what the job requires, whatever the model, and a job that needs no access gets none. Separation of duties splits one task between people, non-repudiation proves who acted, and time-of-day restrictions limit when access is allowed, not what."
  }
};

FRA.pbqs["sec-commands"] = {
  id: "sec-commands", title: "Verify the download and scan the host", domain: 4, lesson: "u10l1", seo: false,
  scenario: {
    text: "An administrator downloads {{tools.iso}} from a vendor's site. The vendor publishes the file's SHA-256 hash next to the download. After installing the tools on a new server at {{10.0.0.5}}, the administrator wants to see which services and versions it exposes to the network."
  },
  tasks: [
    { id: "linux", kind: "command", prompt: "On a Linux workstation, type the command that prints the SHA-256 hash of tools.iso.", expect: ["sha256sum tools.iso"], alt: ["shasum -a 256 tools.iso"] },
    { id: "windows", kind: "command", prompt: "On a Windows workstation, type the certutil command that prints the SHA-256 hash of tools.iso.", expect: ["certutil -hashfile tools.iso SHA256"] },
    { id: "scan", kind: "command", prompt: "Type the nmap command that scans 10.0.0.5 and identifies the version of each service it finds.", expect: ["nmap -sV 10.0.0.5"], alt: ["nmap -sV -p- 10.0.0.5", "sudo nmap -sV 10.0.0.5", "sudo nmap -sV -p- 10.0.0.5"], flagOrder: false },
    { id: "mismatch", kind: "choice", prompt: "The hash you computed does not match the one the vendor published. What does that mean?", options: [
      "Do not install it: the file is corrupt or was altered",
      "Install it: hashes often differ between operating systems",
      "Install it, but only on a test system",
      "Hash it again with MD5 and install it if that matches"
    ], expect: 0 }
  ],
  why: {
    linux: "sha256sum tools.iso prints the file's SHA-256 hash to compare with the vendor's; shasum -a 256 tools.iso is the same hash from the shasum tool. SHA-256 is the current standard hash, while MD5 and SHA-1 are broken and only recognized, never recommended.",
    windows: "certutil -hashfile tools.iso SHA256 prints the SHA-256 hash on Windows. The command is positional: the file name comes first, then the algorithm name. Compare the printed value with the vendor's published SHA-256 hash; any difference at all is a mismatch.",
    scan: "nmap -sV probes each open port and reports the service and its version, which is what a vulnerability check needs; adding -p- scans all 65,535 TCP ports instead of the common ones and is accepted too. A plain nmap 10.0.0.5 lists open ports without versions.",
    mismatch: "A hash is a fingerprint: change one bit of the file and the hash changes completely, so a mismatch means the file is not the one the vendor published, whether corrupted in transit or tampered with. Hashes of the same file match on every operating system, and MD5 is broken, so falling back to it proves nothing."
  }
};

FRA.pbqs["sec-risk-register"] = {
  id: "sec-risk-register", title: "Complete the risk register", domain: 5, lesson: "u14l4", seo: false,
  scenario: {
    text: "A shop's security lead is filling in the risk register before the quarterly report to leadership. Each identified risk needs a strategy and the register's entries."
  },
  tasks: [
    { id: "strategies", kind: "match", prompt: "Match each risk to the strategy the shop chooses.", left: [
      "A legacy inventory device cannot be patched, so the team segments it and adds compensating controls",
      "The backup server sits in a building in a flood zone, so the shop stops using that building and moves the server",
      "A payment vendor takes over card processing under a contract that carries the financial impact of a breach",
      "A low-likelihood, low-impact nuisance alert costs more to fix than it could ever lose, so the team documents it and takes no action"
    ], right: [
      "Mitigate",
      "Avoid",
      "Transfer",
      "Accept",
      "Ignore"
    ], expect: [0, 1, 2, 3] },
    { id: "entries", kind: "form", prompt: "Name each risk register entry, in the lesson's terms.", fields: [
      { id: "owner", label: "The person accountable for managing the risk", expect: ["risk owner", "owner"], normalize: "text" },
      { id: "threshold", label: "The level at which action is required", expect: ["risk threshold", "threshold"], normalize: "text" },
      { id: "kri", label: "A measurable signal that the risk is growing, such as the count of devices that cannot be patched", expect: ["key risk indicator", "key risk indicators", "KRI", "KRIs"], normalize: "text" }
    ] },
    { id: "appetite", kind: "choice", prompt: "Leadership states how much risk the shop is willing to pursue in general as it grows. What is that called?", options: [
      "Risk appetite",
      "Risk tolerance",
      "Risk threshold",
      "Key risk indicator"
    ], expect: 0 }
  ],
  why: {
    strategies: "Reducing likelihood or impact with controls is mitigate, stopping the activity that creates the risk is avoid, shifting the financial impact to another party through insurance or contracts is transfer, and acknowledging a risk whose treatment costs more than the loss is accept. Ignore is not a strategy: accepting a risk is a documented decision, and ignoring it is no decision at all.",
    entries: "Each register entry carries a risk owner, the person accountable for the risk; a risk threshold, the level at which action is required; and key risk indicators, the measurable signals that the risk is increasing. The threshold triggers action when a risk crosses it, the key risk indicators feed the report to leadership, and the owner is held accountable for the response.",
    appetite: "Risk appetite is how much risk the organization is willing to pursue in general, expansionary, neutral, or conservative. Risk tolerance is the acceptable variation around that appetite for one specific risk, the threshold is where action starts, and a key risk indicator is a signal, not a limit."
  }
};
