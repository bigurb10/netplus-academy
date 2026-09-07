// APlus Academy Core 2 curriculum, units 4 and 5. Original teaching content for CompTIA A+ 220-1202.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Security Concepts", domain: 2,
  blurb: "The vocabulary of security: physical controls, logical controls, wireless protocols and authentication, the malware families and the tools against them, and the social engineering and technical threats a technician must recognize.",
  assumes: "Nothing beyond everyday computer use.",
  lessons: [
    {
      id: "u4l1", title: "Physical Security and Physical Access Controls", domain: 2, obj: "2.1", minutes: 9,
      body: `Security starts at the door. If an attacker can touch the server, the software controls do not matter. The exam names the physical measures and expects you to match each to the threat it stops.

## Perimeter and building
- **Bollards**: short posts that stop vehicles from ramming an entrance or driving onto a walkway.
- **Fences**: define the perimeter and slow intruders; height and topping set the level.
- **Lighting**: well-lit grounds deter and let cameras see.
- **Video surveillance**: cameras that deter, record evidence, and, with monitoring, alert; placement covers entrances, parking, and server rooms.
- **Alarm systems**: sound and notify on a breach; tied to door contacts and motion sensors.
- **Motion sensors**: detect movement after hours; infrared, microwave, ultrasonic.
- **Security guards**: judgment that no device has; check IDs, escort visitors, respond.
- **Magnetometers**: metal detectors at entrances to catch weapons and stolen hardware.

## Doors and rooms
- **Access control vestibule**: two doors with a space between; the second opens only after the first closes and the person is verified. It stops **tailgating** (someone slipping in behind an authorized person). The old name is mantrap.
- **Badge reader**: reads a card, fob, or phone and unlocks the door for authorized people, logging who entered when.
- **Door locks**: keyed, electronic keypad, badge, or biometric; the server room door is locked, always.
- **Equipment locks**: cable locks for laptops, locking cabinets and racks, chassis locks so a drive cannot be pulled.

## Physical access methods
- **Key fobs**: small tokens read by the door; cheap and revocable.
- **Smart cards**: cards with a chip that proves identity, often the same card that logs into the PC; may need a PIN (two factors).
- **Mobile digital keys**: the phone as the badge, through NFC or Bluetooth.
- **Keys**: metal keys still exist and are the hardest to revoke; a lost master key means rekeying.
- **Biometrics**: something you are. **Retina scanner** (blood vessels in the eye), **fingerprint scanner**, **palm print scanner**, **facial recognition**, **voice recognition**. Biometrics cannot be forgotten or lent, but they can be spoofed and cannot be changed if copied, so they pair with a badge or PIN for high security.

## Matching control to threat
- A car aimed at the lobby: bollards.
- An intruder following an employee through the door: access control vestibule (and training against tailgating).
- Laptops disappearing from desks: cable locks and locked cabinets.
- Night-time break-in: alarm system with motion sensors, lighting, cameras.
- Who entered the server room at 2 a.m.: badge reader logs and video.
- Weapons or stolen drives leaving the building: magnetometer and guard.

> Exam tip: bollards stop vehicles; an access control vestibule stops tailgating; badge readers log entry; equipment locks stop theft of the device itself; magnetometers find metal. Biometrics are something you are: retina, fingerprint, palm, face, voice.`,
      hook: "Bollards (vehicles), fences, lighting, video surveillance, alarms, motion sensors, guards, magnetometers. Access control vestibule (two doors, stops tailgating), badge reader (logs), door locks, equipment locks (cable locks, cabinets). Access: key fobs, smart cards, mobile digital keys, keys; biometrics: retina, fingerprint, palm print, facial, voice."
    },
    {
      id: "u4l2", title: "Logical Security: Least Privilege, Zero Trust, ACLs, MFA, SAML, SSO, JIT, PAM, MDM, DLP, IAM, and Directory Services", domain: 2, obj: "2.1", minutes: 11,
      body: `Logical security is the set of rules and systems that decide who may do what on the network. The exam tests these as definitions and as "which measure fixes this scenario."

## The principles
- **Principle of least privilege**: every account, service, and program gets only the rights its job requires, and no more. A receptionist is not a local administrator; a backup service cannot browse the web. Least privilege limits what malware can do when it runs as that user.
- **Zero Trust model**: never trust a connection because of where it comes from; being inside the building or on the VPN proves nothing. Every request is authenticated and authorized, every device is checked, and access is granted per resource. The opposite of the old "hard shell, soft inside" network.
- **Access control lists**: the list attached to a resource that says which identities may do which actions: NTFS permissions on a folder, firewall rules on a router, rules on a switch port. Reading an ACL is reading who is allowed and who is denied.

## Multifactor authentication
Authentication factors are something you **know** (password, PIN), something you **have** (phone, token, card), and something you **are** (biometric). **MFA** requires two different factors, so a stolen password alone fails. Methods the exam names:
- **Email**: a code sent to the mailbox; weak if the mailbox uses the same password.
- **Hardware token**: a key fob showing a rotating code or a USB security key; strongest common option.
- **Authenticator application**: generates codes on the phone or pushes an approve prompt.
- **SMS** and **voice call**: a code by text or spoken; usable but vulnerable to SIM swapping.
- **TOTP** (time-based one-time password): the six-digit code that changes every 30 seconds, generated from a shared secret and the clock; what authenticator apps and many tokens produce.
- **OTP** (one-time password or passcode): any code good for one use, delivered by any of the above.

## Identity and access systems
- **SAML** (Security Assertion Markup Language): the standard that lets an identity provider tell a web application "this user is authenticated and here are their attributes." It is how web single sign-on works between a company's login and cloud services.
- **SSO** (single sign-on): one login gives access to many systems; convenient, and one compromised password reaches everything, so pair it with MFA.
- **Just-in-time access**: administrative rights are granted only when requested, for the task, for a limited time, then removed automatically. No standing admin accounts waiting to be stolen.
- **PAM** (privileged access management): the system that vaults administrator credentials, checks them out for a session, rotates them, records what was done, and enforces just-in-time access.
- **MDM** (mobile device management): enrolls phones, tablets, and laptops; enforces encryption, passcodes, app policies; wipes lost devices.
- **DLP** (data loss prevention): watches data leaving by email, upload, USB, or print, recognizes sensitive content (card numbers, health records, classified labels), and blocks or logs it.
- **IAM** (identity and access management): the umbrella: creating and removing accounts, assigning roles, authenticating, and auditing who has access to what.
- **Directory services**: the database behind IAM: **Active Directory** in Windows domains, queried with **LDAP**; holds users, groups, computers, and policies.

## Scenarios
- A user's password was phished, but the attacker could not log in: MFA.
- An intern can delete files in the finance share: violates least privilege; fix the ACL.
- Admin accounts sit unused most of the week but are always active: just-in-time access through PAM.
- Employees log into ten cloud apps with one corporate login: SSO with SAML.
- A spreadsheet of customer card numbers was emailed outside: DLP would have blocked it.
- A lost phone holds company mail: MDM remote wipe.
- Nobody trusts the office network anymore; every access is verified: Zero Trust.

> Exam tip: least privilege is minimum rights; Zero Trust verifies everything; ACLs list permissions. MFA needs two different factors; TOTP is the 30-second code; SMS is the weak method. SAML enables web SSO; JIT and PAM control admin rights; MDM manages devices; DLP stops data leaving; IAM is the whole identity system on a directory such as Active Directory.`,
      hook: "Least privilege: only needed rights. Zero Trust: verify every request, no trust by location. ACL: who may do what. MFA: know, have, are; email, hardware token, authenticator app, SMS, voice, TOTP (30-second code), OTP. SAML makes web SSO; JIT grants admin rights only when needed; PAM vaults and logs privileged credentials; MDM manages devices; DLP stops data leaving; IAM is the umbrella; directory services (Active Directory, LDAP) store identities."
    },
    {
      id: "u4l3", title: "Wireless Security Protocols and Authentication Methods", domain: 2, obj: "2.3", minutes: 9,
      body: `Wireless security has two halves: the encryption that scrambles the air, and the authentication that decides who may join. The exam asks which protocol to choose and which authentication server does what.

## Protocols and encryption
- **WEP**: the original, broken in minutes; never use it (it appears only as a wrong answer).
- **WPA** with **TKIP**: an emergency fix for WEP hardware; TKIP (Temporal Key Integrity Protocol) is now deprecated and weak. If a router offers TKIP, choose AES instead.
- **WPA2** with **AES**: the standard since 2004. AES (Advanced Encryption Standard) in CCMP mode; strong encryption. Two modes: **Personal** (a pre-shared key everyone types) and **Enterprise** (802.1X with per-user credentials against a RADIUS server).
- **WPA3**: the current best. **SAE** (Simultaneous Authentication of Equals) replaces the pre-shared key handshake so captured traffic cannot be brute-forced offline; **forward secrecy** protects past sessions if the password leaks later; protected management frames stop deauthentication attacks; Enterprise adds a 192-bit mode; Enhanced Open encrypts guest networks without a password.
Choose WPA3 when every device supports it, WPA2-AES otherwise, and a mixed WPA2/WPA3 transition mode while migrating. TKIP and WEP are never correct.

## Authentication methods
Personal networks authenticate with a shared passphrase, which is the same for everyone and impossible to revoke for one person. Enterprise networks authenticate each user or device.
- **RADIUS** (Remote Authentication Dial-In User Service): the central authentication server for Wi-Fi (802.1X), VPNs, and network devices. The access point forwards the user's credentials to RADIUS, which checks them against the directory and answers accept or reject. Uses UDP ports 1812 (authentication) and 1813 (accounting); encrypts only the password field of its messages.
- **TACACS+** (Terminal Access Controller Access-Control System Plus): Cisco's protocol for authenticating administrators to network devices (switches, routers, firewalls). TCP port 49; encrypts the entire packet; separates authentication, authorization, and accounting so it can control which commands an admin may run.
- **Kerberos**: the ticket-based authentication inside Active Directory domains. The client proves itself once to the **Key Distribution Center** on the domain controller, receives a ticket-granting ticket, and uses service tickets to reach servers without resending the password. Depends on synchronized clocks (a skew over about five minutes breaks it) and on DNS.
- **Multifactor**: adding a second factor (token, app, certificate) to any of the above; enterprise Wi-Fi often uses a device certificate plus the user's login.

## How enterprise Wi-Fi joins
1. The laptop associates with the SSID and is asked for credentials (802.1X, EAP).
2. The access point relays them to the RADIUS server.
3. RADIUS checks Active Directory (or its own database) and returns accept, often with a VLAN assignment.
4. The AP opens the port; encryption keys are unique to that session.
A user who cannot join enterprise Wi-Fi while others can has a credential, certificate, or account problem; when nobody can join, the RADIUS server or its certificate is down.

> Exam tip: WPA3 best, WPA2 with AES acceptable, TKIP and WEP wrong. RADIUS authenticates Wi-Fi and VPN users on UDP 1812 and 1813; TACACS+ authenticates admins to network gear on TCP 49 and encrypts everything; Kerberos is Active Directory's ticket system and needs accurate clocks. Enterprise mode means per-user credentials through RADIUS; Personal means one shared passphrase.`,
      hook: "WEP broken; WPA with TKIP deprecated; WPA2 with AES-CCMP standard (Personal pre-shared key, Enterprise 802.1X plus RADIUS); WPA3 with SAE, forward secrecy, protected management frames, 192-bit enterprise. RADIUS: central user authentication, UDP 1812 and 1813, password-only encryption. TACACS+: Cisco device admin, TCP 49, full encryption, per-command authorization. Kerberos: AD tickets from the KDC, clocks within five minutes. Multifactor adds a token or certificate."
    },
    {
      id: "u4l4", title: "Malware Types and the Tools That Fight Them", domain: 2, obj: "2.4", minutes: 10,
      body: `Malware questions come in two shapes: identify the type from its behavior, and pick the tool or method for a situation. Learn each type by what it does and how it is noticed.

## The malware families
- **Trojan**: disguised as something useful (a game, a "codec," a cracked program); once run it installs a backdoor or drops other malware. It does not spread by itself; the user installs it.
- **Rootkit**: buries itself in the operating system, kernel, or firmware and hides its files and processes from normal tools. Often survives everything but a reinstall or firmware reflash.
- **Virus**: attaches to files or programs and spreads when they are copied and run; needs a host file.
- **Spyware**: secretly collects activity, browsing, and credentials and reports them.
- **Ransomware**: encrypts the user's files (and any reachable shares) and demands payment for the key; the defense is offline backups and not paying.
- **Keylogger**: records keystrokes to capture passwords and card numbers; software or a hardware plug.
- **Boot sector virus**: infects the master boot record or boot partition so it runs before the operating system; Secure Boot and UEFI blunt it.
- **Cryptominer**: hijacks CPU and GPU to mine cryptocurrency; the symptom is a hot, slow machine with fans roaring and a process consuming everything.
- **Stalkerware**: monitoring software installed on a victim's phone or PC, usually by someone with physical access, to track location, messages, and calls.
- **Fileless malware**: runs from memory using legitimate tools (PowerShell, WMI, macros) and writes no executable to disk, so file-scanning antivirus misses it; detected by behavior.
- **Adware**: floods the user with ads, changes the home page, redirects searches.
- **PUP** (potentially unwanted program): toolbars, "optimizers," and bundled extras installed alongside free software; not always malicious, always unwanted.

## Tools and methods
- **Recovery console** (the Windows Recovery Environment and its Command Prompt): boot outside the infected OS to remove files, fix the boot record, or restore.
- **EDR** (endpoint detection and response): agents that watch behavior on each machine, detect fileless and novel attacks, isolate the machine, and let responders investigate.
- **MDR** (managed detection and response): EDR run by an outside security provider that watches the alerts around the clock.
- **XDR** (extended detection and response): detection correlated across endpoints, email, network, cloud, and servers, not just the PC.
- **Antivirus**: signature and heuristic scanning for known malware; keep definitions current.
- **Antimalware**: broader tools that also target spyware, adware, and PUPs; often a second-opinion scanner.
- **Email security gateway**: filters mail before delivery for spam, phishing, malicious attachments, and links; where most malware arrives.
- **Software firewalls**: the host firewall blocking unsolicited inbound connections and, with rules, outbound calls home.
- **User education**: the control that stops what the tools miss. **Antiphishing training** with simulated phishing campaigns teaches people to recognize and report.
- **OS reinstallation**: the last resort and the only sure cure for rootkits and deep infections; back up data first, and scan the backup.

## Matching
- Fans roaring, CPU at 100 percent, nothing visible: cryptominer.
- Files renamed with a strange extension and a note demanding payment: ransomware.
- Antivirus finds nothing but the machine misbehaves and hides processes: rootkit; reinstall.
- A partner's phone knows where the victim is: stalkerware.
- PowerShell running from a Word macro, no file on disk: fileless; EDR catches the behavior.
- Constant ads and a changed search engine after installing a free tool: adware and PUPs.

> Exam tip: trojan is disguised, virus needs a host file, rootkit hides deep, ransomware encrypts, keylogger records keys, cryptominer steals CPU, stalkerware tracks a person, fileless lives in memory, adware and PUPs annoy. EDR watches behavior, MDR is managed EDR, XDR spans more than endpoints; the email gateway filters mail; education is the human control; reinstall for rootkits.`,
      hook: "Trojan disguised; rootkit hidden deep (reinstall); virus needs a host file; spyware watches; ransomware encrypts for payment; keylogger records keys; boot sector virus in the MBR; cryptominer eats CPU; stalkerware tracks a person; fileless runs in memory with legitimate tools; adware and PUPs. Tools: recovery console, EDR, MDR (managed), XDR (extended), antivirus, antimalware, email security gateway, software firewall, user education and antiphishing training, OS reinstallation."
    },
    {
      id: "u4l5", title: "Social Engineering, Threats, and Vulnerabilities", domain: 2, obj: "2.5", minutes: 11,
      body: `The exam describes an attack and asks its name, or describes a weakness and asks what kind of vulnerability it is. Learn the names by their distinguishing detail.

## Social engineering
Attacks on people rather than systems.
- **Phishing**: a fraudulent email that looks legitimate, asking for credentials, payment, or a click. Mass-mailed.
- **Vishing**: the same by voice call ("this is the bank's fraud department").
- **Smishing**: by SMS text message with a link.
- **QR code phishing**: a poster or email QR code that leads to a fake site; the URL is hidden inside the code.
- **Spear phishing**: phishing aimed at a specific person with details that make it believable.
- **Whaling**: spear phishing aimed at executives (the big fish), often about wire transfers or legal matters.
- **Shoulder surfing**: watching someone type a password or read a screen; privacy screens and awareness defend.
- **Tailgating**: following an authorized person through a secured door; the vestibule and a "no holding the door" rule defend.
- **Impersonation**: pretending to be someone (IT support, a delivery driver, a vendor) to gain access or information.
- **Dumpster diving**: retrieving documents, drives, and sticky notes from the trash; shredding defends.

## Threats
- **DoS** (denial of service): flooding a service so it cannot serve real users; **DDoS** does it from thousands of compromised machines (a botnet) so it cannot be blocked by one address.
- **Evil twin**: a rogue access point broadcasting the same SSID as a legitimate network so victims connect through the attacker.
- **Zero-day attack**: exploits a vulnerability the vendor has not patched (and may not know about); no signature exists yet.
- **Spoofing**: forging an address or identity: a MAC address, an IP address, an email From line, a caller ID.
- **On-path attack** (formerly man-in-the-middle): the attacker sits between two parties and reads or alters traffic; evil twins and ARP poisoning are ways in; HTTPS and VPNs defend.
- **Brute-force attack**: trying every possible password; defeated by length and lockout.
- **Dictionary attack**: trying likely passwords from a word list; defeated by complexity and uniqueness.
- **Insider threat**: an employee or contractor abusing legitimate access, intentionally or by carelessness.
- **SQL injection**: typing database commands into a web form so the server executes them; input validation defends.
- **Cross-site scripting** (XSS): injecting script into a web page that other users' browsers run; steals sessions.
- **Business email compromise** (BEC): a real or spoofed executive mailbox instructs finance to pay a fake invoice or change a vendor's bank details.
- **Supply chain or pipeline attack**: compromising a vendor, an update mechanism, or a software build so every customer receives the malware.

## Vulnerabilities
Weaknesses that make the threats work.
- **Non-compliant systems**: machines that do not meet the security baseline (missing configurations, disabled controls).
- **Unpatched systems**: known holes with patches available but not applied; the most common way in.
- **Unprotected systems**: no antivirus, no firewall.
- **EOL** (end-of-life) operating systems and software: no patches will ever come.
- **BYOD**: personal devices with unknown software and no management touching company data.

## Reading the scenario
- An email to the CFO from "the CEO" asking for an urgent wire transfer: whaling, and BEC if the account is real.
- A text about a package with a link: smishing.
- Two networks named the coffee shop's SSID, one much stronger: evil twin.
- An attack the day a flaw is announced, before a patch: zero-day.
- A login page accepts ' OR 1=1: SQL injection.
- A vendor's signed update installs a backdoor at every customer: supply chain.

> Exam tip: vishing is voice, smishing is SMS, spear phishing is targeted, whaling targets executives. Tailgating is the door, shoulder surfing is the screen, dumpster diving is the trash. DDoS is distributed. Evil twin is a fake AP. Zero-day has no patch. On-path intercepts. Brute force tries everything; dictionary tries likely words. BEC is fake executive email; supply chain attacks the vendor. Vulnerabilities: non-compliant, unpatched, unprotected, EOL, BYOD.`,
      hook: "Phishing email, vishing voice, smishing SMS, QR code phishing, spear phishing targeted, whaling executives; shoulder surfing, tailgating, impersonation, dumpster diving. DoS and DDoS (botnet), evil twin (rogue AP, same SSID), zero-day (no patch), spoofing, on-path (intercept), brute force (all), dictionary (likely words), insider, SQL injection (forms), XSS (scripts in pages), BEC (fake executive mail), supply chain. Vulnerabilities: non-compliant, unpatched, unprotected, EOL, BYOD."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Securing Windows, Devices, Networks, and Data", domain: 2,
  blurb: "Putting security into practice: Windows security settings and permissions, BitLocker, EFS, and Active Directory tasks, workstation hardening, mobile devices, SOHO routers, browsers, disposal, and the malware removal procedure in order.",
  assumes: "You know the security vocabulary from Unit 4 and the Windows tools from Unit 2.",
  lessons: [
    {
      id: "u5l1", title: "Windows Security Settings: Defender, Firewall, Accounts, Sign-In, NTFS and Share Permissions, and UAC", domain: 2, obj: "2.2", minutes: 12,
      body: `Most Windows security questions are about the built-in settings: the antivirus, the firewall, the account types, and, above all, permissions. Permissions questions are the ones people get wrong, so learn the rules exactly.

## Defender Antivirus
Built into Windows and on by default. **Activate or deactivate** in Windows Security, Virus and threat protection (a third-party antivirus turns it off automatically; there should be one active product, not two). **Update definitions** through Windows Update or the Check for updates button; stale definitions are a common finding on an infected machine. Real-time protection, periodic scans, and ransomware protection (controlled folder access) live here.

## Firewall
Windows Defender Firewall is **activated** per profile (Domain, Private, Public) and should stay on. **Port security**: inbound rules by port number and protocol in Advanced settings; nothing inbound is allowed unless a rule permits it. **Application security**: Allow an app through the firewall creates rules per program per profile. Turn it off only briefly for a test.

## Users and groups
- **Local versus Microsoft account**: a local account exists only on that PC; a Microsoft account signs in with an online identity, syncs settings, and enables OneDrive, Find My Device, and store purchases. Domain accounts are a third kind, from Active Directory.
- **Standard account**: everyday use; cannot install most software or change system settings without an administrator's credentials. Everyone should run as standard.
- **Administrator**: full control; use only when needed. The built-in Administrator account is disabled by default.
- **Guest user**: a limited account for temporary use; disabled by default and should stay disabled.
- **Power user**: a legacy group kept for compatibility; on modern Windows it has no special rights beyond standard.

## Log-in options
Username and **password**; **PIN** (local to the device, tied to the TPM, cannot be used from elsewhere); **fingerprint** and **facial recognition** (Windows Hello biometrics); **SSO** in a domain or cloud environment; **passwordless** sign-in with Windows Hello or a security key so no password is typed at all.

## NTFS versus share permissions
Two independent gates protect a shared folder.
- **NTFS permissions** (Security tab) apply to everyone, locally and over the network: Full Control, Modify, Read and Execute, List Folder Contents, Read, Write, with Allow and Deny.
- **Share permissions** (Sharing tab, Advanced Sharing) apply only when the folder is reached over the network: Full Control, Change, Read.
- The **effective permission** over the network is the **most restrictive** combination of the two. Share Full Control plus NTFS Read equals Read; share Read plus NTFS Modify equals Read.
- An explicit **Deny** overrides Allow. Permissions from several groups combine (the union) except for Deny.
- **File and folder attributes** (General tab, Attributes and Advanced): read-only, hidden, system, archive, compress, encrypt, and index. Attributes are not permissions; a read-only attribute is a hint, not a control.
- **Inheritance**: a new file or subfolder inherits the parent's NTFS permissions. Disabling inheritance lets you set different permissions below. **Copying** a file to another volume gives it the destination folder's permissions; **moving** within the same volume keeps the original permissions; moving to a different volume behaves like a copy.
Common practice: share permissions Full Control for Authenticated Users, and control everything with NTFS.

## Run as administrator and UAC
Standard users run programs with standard rights; **Run as administrator** (right-click) launches one with elevated rights after **User Account Control** prompts for consent or an administrator's credentials. Administrators also work at standard rights until UAC elevates a task. UAC levels range from always notify to never (never is a vulnerability). UAC is what stops malware that runs as the user from silently changing the system.

## Reading a permissions scenario
- "Users can read files in the share but not save changes, though NTFS grants Modify." The share permission is Read; raise it to Change.
- "A user in two groups, one with Read allowed and one with Write denied." Deny wins; the user cannot write.
- "A file moved from Finance to Public on the same drive still has Finance permissions." Moving within a volume keeps permissions; copy it instead, or reset inheritance.
- "A new subfolder inherited permissions the manager did not want." Disable inheritance on that subfolder and set explicit permissions.

> Exam tip: effective permission over the network is the most restrictive of share and NTFS; Deny overrides Allow; copy takes the destination's permissions, move within a volume keeps them; inheritance flows down unless disabled. Standard accounts for everyone; Guest stays disabled; UAC prompts before elevation. A PIN is local to the device.`,
      hook: "Defender on with fresh definitions; firewall on per profile with port and app rules. Local versus Microsoft account; standard, administrator, guest (disabled), power user (legacy). Sign-in: password, PIN, fingerprint, face, SSO, passwordless Hello. NTFS applies everywhere, share only over the network; effective = most restrictive; Deny overrides; copy takes destination permissions, move within a volume keeps them; inheritance flows down. Attributes: read-only, hidden, system, archive. Run as administrator triggers UAC."
    },
    {
      id: "u5l2", title: "BitLocker, EFS, and Active Directory Tasks", domain: 2, obj: "2.2", minutes: 10,
      body: `Two encryption tools and the routine domain administration tasks a Core 2 technician performs. The exam asks which tool for which need and what each Active Directory action accomplishes.

## BitLocker
Full-volume encryption for Windows Pro and above. It encrypts the entire drive so a stolen laptop's disk is unreadable in another machine.
- Normally keyed to the **TPM**, which releases the key only if the boot chain is unchanged; optionally a PIN or USB key at startup adds a factor.
- Save the **recovery key** (to Active Directory, the Microsoft account, a file, or print) before enabling; a firmware change, a motherboard swap, or a moved drive triggers the recovery prompt, and without the key the data is gone.
- Managed centrally through Group Policy or MDM in a domain; the recovery keys are escrowed in AD.

## BitLocker To Go
The same encryption for **removable drives** (USB sticks, external disks), unlocked with a password or smart card; Group Policy can require it before a removable drive can be written. Readable on other Windows machines with the password.

## EFS
The **Encrypting File System** encrypts individual files or folders on NTFS (Properties, Advanced, Encrypt contents), transparently for the user who encrypted them and unreadable to others, including administrators, because the key is bound to the user's certificate. Available on Pro and above. Risks: a reinstalled profile or lost certificate means lost files unless the certificate was exported; copying an EFS file to FAT or emailing it decrypts it. BitLocker protects a lost device; EFS protects a file from other users on a shared machine.

## Active Directory tasks
Active Directory Users and Computers is the console; these are the actions the objective names.
- **Joining a domain**: from the PC (System, or Settings, Access work or school), with a domain account that has join rights; the computer object appears, often in the Computers container, and users can then sign in with domain accounts.
- **Assigning a login script**: a batch or PowerShell script set on the user's Profile tab (or through Group Policy) that runs at sign-in to map drives, connect printers, and set defaults.
- **Moving objects within organizational units**: OUs are folders in AD used to organize users and computers by department or location; move an object to the OU whose Group Policy and delegated administration should apply.
- **Assigning home folders**: a per-user network folder (Profile tab, Home folder, Connect to a drive letter) that the user's documents and settings can live in, backed up on the server.
- **Applying Group Policy**: Group Policy Objects linked to the domain, a site, or an OU push settings (password policy, drive maps, software restrictions, desktop lockdown) to every user and computer under them; the order is local, site, domain, OU, with the last applied winning; gpupdate and gpresult on the client.
- **Selecting security groups**: put users in groups (Finance, Helpdesk) and assign permissions to groups, never to individuals; group membership changes take effect at the next sign-in.
- **Configuring folder redirection**: a Group Policy setting that points a user's Documents, Desktop, and other folders to a server share so their files follow them to any PC and are backed up centrally, while still appearing local.

## Reading the scenario
- A laptop was stolen; HR data on it must be unreadable: BitLocker (should have been on).
- Two managers share a PC and each must keep private files: EFS on their folders.
- A new user should see the department's drives when they log in: a login script or Group Policy drive mapping, and membership in the department's security group.
- A user moved from Sales to Marketing and still gets Sales policies: move the user object to the Marketing OU and change group memberships.
- Users lose files when their PC is replaced: folder redirection or home folders.

> Exam tip: BitLocker encrypts the whole drive with the TPM and needs its recovery key saved; BitLocker To Go is for removable drives; EFS encrypts files per user by certificate. Join the domain, assign login scripts, move objects between OUs, assign home folders, apply Group Policy, use security groups, redirect folders. Permissions go to groups.`,
      hook: "BitLocker: full-volume encryption, TPM-keyed, recovery key escrowed, Pro and above; To Go for removable drives. EFS: per-file encryption tied to the user's certificate; export the certificate. AD tasks: join the domain, login script on the Profile tab, move objects between OUs to change policy, home folders on the server, Group Policy (local, site, domain, OU), security groups for permissions, folder redirection to the server."
    },
    {
      id: "u5l3", title: "Workstation Hardening", domain: 2, obj: "2.7", minutes: 9,
      body: `Hardening is the checklist that turns a default installation into a secure workstation. The exam presents a weakness and asks which hardening step fixes it.

## Encrypt what is at rest
**Data-at-rest encryption** (BitLocker on Windows, FileVault on Mac, device encryption on phones) makes a stolen or discarded drive worthless. It is the single most important control for laptops.

## Passwords, in order of importance
- **Length**: the strongest lever; twelve or more characters, longer for administrators.
- **Character types**: upper and lower case, numbers, symbols; **complexity** rules require a mix.
- **Uniqueness**: never reuse a password across sites or accounts; one breach becomes many.
- **Expiration**: periodic change is required by some policies, though modern guidance prefers long unique passwords changed only when compromised.
- **BIOS and UEFI passwords**: a supervisor password stops boot-order changes and firmware tampering; a boot password stops the machine starting at all.

## End-user best practices
- Use **screensaver locks**: the screen locks after a short idle time and requires the password.
- **Log off when not in use**, especially on shared machines.
- **Secure and protect critical hardware**: cable locks for laptops, locked rooms, no unattended equipment in cars.
- **Secure personally identifiable information and passwords**: no sticky notes, no PII on shared screens, shred paper.
- **Use password managers** so every password can be long and unique without memorizing them.

## Account management
- **Restrict user permissions**: standard accounts; administrators only for administration.
- **Restrict log-in times**: allow logins only during working hours (a user account setting in AD).
- **Disable the guest account**.
- **Use failed-attempts lockout**: lock after a few wrong passwords for a period; stops brute force.
- **Use timeout and screen lock** enforced by policy.
- **Apply account expiration dates** for contractors and temporary staff so accounts die on schedule.
- **Change the default administrator's user account and password**: rename or disable the built-in Administrator, set a strong password, and change every default password on new devices.
- **Disable AutoRun** (and AutoPlay) so inserted media cannot launch programs; a classic malware entry.
- **Disable unused services** so there is less running to attack; also remove unused software and close unneeded ports.

## Reading the scenario
- A contractor's account is still active a year after they left: account expiration dates.
- An attacker tried thousands of passwords against a user: lockout after failed attempts.
- Employees leave PCs unlocked at lunch: screen lock timeout and log off.
- A USB stick infected a PC on insertion: disable AutoRun.
- The new router still uses admin/admin: change default credentials.
- Users reuse one password everywhere: uniqueness and a password manager.

> Exam tip: encrypt data at rest; length beats complexity; unique passwords in a manager; BIOS password for firmware; screen locks and log off; lock hardware; restrict permissions and login times; disable guest; lockout; expiration dates; change default admin; disable AutoRun and unused services.`,
      hook: "Data-at-rest encryption. Passwords: length, character types, uniqueness, complexity, expiration; BIOS/UEFI passwords. Users: screensaver locks, log off, secure hardware, protect PII and passwords, password managers. Accounts: restrict permissions, restrict login times, disable guest, failed-attempt lockout, timeout and screen lock, expiration dates. Change default admin credentials; disable AutoRun; disable unused services."
    },
    {
      id: "u5l4", title: "Securing Mobile Devices", domain: 2, obj: "2.8", minutes: 8,
      body: `Phones and tablets carry mail, files, and authentication apps, and they get lost. The exam asks which mobile control addresses which risk.

## Hardening techniques
- **Device encryption**: on by default on modern phones once a screen lock is set; a lost device's storage is unreadable.
- **Screen locks**: **facial recognition**, **PIN codes**, **fingerprint**, **pattern**, and **swipe**. Swipe is not security at all; a pattern is weak (smudges reveal it); a PIN of six or more digits, a fingerprint, or a face with a PIN fallback are the reasonable choices.
- **Configuration profiles**: settings pushed to the device (Wi-Fi, VPN, mail, certificates, restrictions) by MDM or installed manually; a profile can lock down features and require passcodes.

## Patch management
**OS updates** close vulnerabilities and must be installed promptly; a device that can no longer update is end-of-life and should be retired from company use. **Application updates** matter just as much, since apps hold the data.

## Endpoint security software
**Antivirus** and **antimalware** for mobile platforms, especially Android; **content filtering** to block malicious and inappropriate sites, often through MDM or a DNS filter.

## Lost or stolen
- **Locator applications**: Find My (Apple) and Find My Device (Android) show the device on a map, play a sound, and lock it.
- **Remote wipes**: erase the device (or, for BYOD, only the work container) from the MDM console or the locator service.
- **Remote backup applications**: cloud backups so a wiped or replaced device is restored; a wipe is painless when backups exist.
- **Failed log-in attempts restrictions**: after a set number of wrong passcodes the device locks for increasing periods or erases itself.

## Policies and procedures
- **MDM** enrolls devices and enforces all of the above.
- **BYOD versus corporate-owned devices**: corporate devices are fully managed and can be fully wiped; personal devices under BYOD carry a managed work profile and a selective wipe, and the policy spells out what the company may see and do.
- **Profile security requirements**: the minimum a device must meet to receive the work profile: passcode length, encryption, OS version, no jailbreak or root, antivirus present.

## Reading the scenario
- A phone with company mail was left in a taxi: locator app, remote lock, then remote wipe.
- Users set swipe unlock: policy requires a PIN or biometric.
- A phone is running an OS version that no longer gets updates: retire it from company access.
- An employee's personal phone must hold work mail without exposing personal photos: BYOD with a work profile and selective wipe.

> Exam tip: encryption plus a real screen lock (PIN, fingerprint, face; not swipe). Patch the OS and apps. Locator, remote wipe, remote backup, and failed-attempt lockout for lost devices. MDM enforces; BYOD gets a work profile and selective wipe; profile security requirements are the entry bar.`,
      hook: "Device encryption; screen locks: facial, PIN, fingerprint, pattern, swipe (swipe is no security); configuration profiles. Patch OS and apps. Endpoint antivirus, antimalware, content filtering. Locator apps, remote wipe, remote backup, failed-login restrictions. MDM; BYOD (work profile, selective wipe) versus corporate-owned (full wipe); profile security requirements."
    },
    {
      id: "u5l5", title: "SOHO Wireless and Wired Network Security", domain: 2, obj: "2.10", minutes: 9,
      body: `A home or small office router is the whole security perimeter. The exam walks through its settings, often as a performance-based item. Know each setting and why it matters.

## Router settings
- **Change default passwords**: the administrator login and the Wi-Fi passphrase; default credentials are printed on the box and listed online.
- **IP filtering**: allow or block specific addresses or ranges; **MAC filtering** allows only listed devices to join (easily spoofed, but a layer).
- **Firmware updates**: fix router vulnerabilities; check on a schedule, or enable automatic updates.
- **Content filtering**: block categories of sites (malware, adult, gambling) for everyone behind the router; often through a filtering DNS service.
- **Physical placement and secure locations**: put the router where it cannot be reset with a paperclip by a visitor and where its signal does not spill outside more than necessary; lock the closet.
- **UPnP** (Universal Plug and Play): lets devices open ports on the router automatically; convenient for games and cameras, dangerous because malware can do the same. Disable it.
- **Screened subnet** (DMZ): a separate network segment for anything that must be reachable from the internet (a game server, a camera recorder), so a compromise there does not reach the LAN. On consumer routers the "DMZ host" setting exposes one device entirely; use port forwarding instead where possible.
- **Configure secure management access**: manage the router over HTTPS only, from the LAN only; disable remote (WAN) management, or restrict it to a VPN; change the management port if the router allows.

## Wireless specific
- **Changing the SSID**: replace the default name that reveals the router model; do not include the family or business name.
- **Disabling SSID broadcast**: hides the network name from casual browsing; not real security, since the name is visible in traffic, and it complicates connecting.
- **Encryption settings**: WPA3, or WPA2 with AES; never WEP or TKIP; a long passphrase.
- **Configuring guest access**: a separate guest SSID isolated from the LAN so visitors and smart devices cannot reach the file server or printers; its own password; optionally a bandwidth limit.

## Firewall settings
- **Disabling unused ports**: close every inbound port that is not needed; consumer routers block inbound by default (NAT), and any opened port should have a reason.
- **Port forwarding and port mapping**: send traffic arriving on a public port to one inside device and port (public 443 to the camera recorder's 443); the exception you make deliberately, documented, and reviewed.

## The order for a new router
1. Connect, log in, change the admin password.
2. Update the firmware.
3. Set the SSID, WPA3 or WPA2-AES, a long passphrase; guest network on.
4. Disable UPnP and remote management; management over HTTPS.
5. Content filtering and IP or MAC filtering if wanted.
6. Only then, port forwarding for the one service that needs it, or a screened subnet.
7. Place it securely and write the settings down.

> Exam tip: change defaults, update firmware, WPA3 or WPA2-AES, guest network, disable UPnP, disable remote management, HTTPS management. SSID hiding and MAC filtering are weak layers. Port forwarding exposes one service; a screened subnet isolates exposed devices. Placement is physical security.`,
      hook: "Router: change default passwords, IP and MAC filtering, firmware updates, content filtering, secure placement, disable UPnP, screened subnet for exposed devices, secure management (HTTPS, no WAN management). Wireless: change SSID, hiding SSID is weak, WPA3 or WPA2-AES, isolated guest network. Firewall: disable unused ports, port forwarding only for needed services."
    },
    {
      id: "u5l6", title: "Browser Security Settings", domain: 2, obj: "2.11", minutes: 8,
      body: `The browser is where users meet the internet, and its settings decide how much of the internet meets them. The exam lists the settings and asks what each protects.

## Getting the browser and its add-ons safely
- **Browser download and installation**: from the **trusted source** (the vendor's site or the platform store), never from an ad or a bundled installer. **Hashing**: compare the download's published hash (SHA-256) with the file's computed hash to prove it was not altered. **Untrusted sources** deliver browsers with adware and PUPs baked in.
- **Browser patching**: keep the browser updated; it patches itself, but only if it is restarted; enterprise browsers update by policy.
- **Extensions and plug-ins**: install only from **trusted sources** (the official extension store, vetted by the organization); review the permissions an extension asks for (reading all sites is a red flag); remove what is not used. **Untrusted** extensions are spyware with a nice icon.

## Everyday settings
- **Password managers**: the browser's built-in manager or a dedicated one; generates and stores unique passwords; protect it with the device lock and MFA.
- **Secure connections and valid certificates**: HTTPS with a padlock means the site's certificate is valid and traffic is encrypted; a certificate warning means an expired, mismatched, or untrusted certificate, possibly an on-path attack; do not click through on sites that take passwords or payments.
- **Pop-up blocker**: stops windows that open on their own; the vehicle for fake alerts and scams.
- **Clearing browsing data and clearing the cache**: removes history, cookies, saved forms, and cached pages; fixes stale content and removes tracking; a support step for a site that misbehaves.
- **Private browsing mode**: no history, cookies, or cache kept after the window closes; hides activity from the next user of the PC, not from the network or the website.
- **Sign-in and browser data synchronization**: signing into the browser syncs bookmarks, passwords, and open tabs across devices; convenient, and it copies work data to personal devices if the policy allows it.
- **Ad blockers**: block advertisements and the malicious ads (malvertising) that carry exploits; some sites break.
- **Proxy**: the browser may follow the system proxy or its own; a surprise proxy setting is a sign of malware redirecting traffic.
- **Secure DNS** (DNS over HTTPS): encrypts DNS lookups so they cannot be read or altered on the local network; may bypass the company's DNS filtering, which is why some organizations disable it.

## Browser feature management
Administrators **enable or disable** features by policy: which **plug-ins** and **extensions** may run, whether developer tools, incognito mode, password saving, sync, or specific **features** are allowed. Group Policy and MDM templates exist for the major browsers.

## Reading the scenario
- The browser's home page changed and searches redirect: an unwanted extension or PUP; remove it, reset the browser.
- Users must not save work passwords in a personal browser profile: disable sync and password saving by policy.
- A site shows a certificate warning on one PC only: the clock, a missing root certificate, or interception on that PC.
- Downloaded installer's hash does not match: do not run it.

> Exam tip: download from trusted sources and verify the hash; patch; trusted extensions only. Valid certificate means HTTPS padlock; warnings mean stop. Pop-up blocker, clear data and cache, private mode (local privacy only), sync (convenience and risk), ad blockers, proxy (check for hijack), secure DNS (encrypted lookups). Manage features by policy.`,
      hook: "Install from trusted sources, verify the hash, avoid untrusted sources; patch the browser; extensions and plug-ins only from trusted sources. Password managers; valid certificates (padlock, stop on warnings); pop-up blocker; clear browsing data and cache; private browsing (no local traces); sign-in and sync; ad blockers; proxy; secure DNS (DoH). Feature management: enable or disable plug-ins, extensions, features by policy."
    },
    {
      id: "u5l7", title: "Data Destruction and Disposal", domain: 2, obj: "2.9", minutes: 8,
      body: `A drive leaving the building carries everything that was ever on it. The exam asks which destruction method fits the situation and what paperwork proves it happened.

## Physical destruction of hard drives
When the drive will never be used again.
- **Drilling**: holes through the platters; fast, cheap, and the drive is scrap. Not certain against a determined lab, but adequate for most.
- **Shredding**: an industrial shredder reduces the drive to fragments; certain; usually by a vendor.
- **Degaussing**: a powerful magnetic field scrambles magnetic media (hard disks, tapes); the drive is destroyed and unusable afterward. It does **nothing** to SSDs and flash, which are not magnetic.
- **Incineration**: burning; certain; specialized facilities.

## Recycling or repurposing best practices
When the drive will be reused or donated.
- **Erasing and wiping**: overwrite every sector with patterns (multiple passes on old standards, one pass is enough on modern drives), or use the drive's built-in **secure erase** or cryptographic erase (destroy the encryption key). A wiped drive is safe to reuse; a formatted drive is not.
- **Low-level formatting**: originally the factory process that lays down sector markers; on modern drives the term means the manufacturer's tool that resets the drive, effectively a full overwrite.
- **Standard formatting**: creates a new filesystem. A **quick format** only rewrites the file table and leaves the data recoverable with free tools; a full format overwrites with zeros on modern Windows, which is better but not certified. Never treat formatting as destruction.
- Full-disk encryption from day one makes disposal easy: destroy the key and the data is unreadable.

## Outsourcing concepts
- **Third-party vendor**: a certified destruction or recycling company collects drives, shreds or wipes them, and recycles the metal.
- **Certification of destruction or recycling**: the vendor's document listing serial numbers and the method and date; the proof an auditor asks for. Keep it with the asset records.

## Regulatory and environmental requirements
Electronics are hazardous waste in most jurisdictions: lead, mercury, and lithium must not go in the trash; e-waste rules require recycling. Data laws (healthcare, financial, privacy) require documented destruction of media holding regulated data. The technician's job is to follow the policy, use the approved vendor, and keep the certificate.

## Choosing the method
- Drive with patient records, will not be reused: shred through a vendor with a certificate.
- SSDs from retired laptops going to a charity: secure erase or cryptographic erase, then verify.
- Old backup tapes: degaussing or shredding.
- A drive that failed and cannot be wiped: physical destruction.
- Quick format before selling a PC: wrong; wipe it.

> Exam tip: degaussing works on magnetic media only, not SSDs; drilling, shredding, and incineration destroy; wiping and secure erase allow reuse; a standard or quick format leaves data recoverable; a low-level format is the manufacturer's reset. Use a certified vendor and keep the certificate of destruction; follow e-waste and data regulations.`,
      hook: "Physical: drilling, shredding, degaussing (magnetic only, not SSD), incineration. Reuse: erase or wipe (overwrite or secure erase), low-level format (factory reset), standard format (quick format leaves data). Outsourcing: third-party vendor, certificate of destruction or recycling. Regulations: e-waste and data laws."
    },
    {
      id: "u5l8", title: "The Malware Removal Procedure", domain: 2, obj: "2.6", minutes: 9,
      body: `CompTIA's malware removal procedure is a seven-step sequence, and the exam asks which step comes next or which step is being described. Learn the order and the reason for each step.

## The seven steps
1. **Investigate and verify malware symptoms.** Talk to the user, look at the machine: pop-ups, slowness, disabled antivirus, strange processes, browser redirection, files renamed, network traffic. Confirm it is malware and not a hardware or configuration problem before treating it.
2. **Quarantine the infected system.** Disconnect it from the network (unplug the cable, turn off Wi-Fi) so it cannot spread, cannot reach its command server, and cannot encrypt the shares. Do not shut it down if evidence in memory matters; do stop it talking.
3. **Disable System Restore in Windows Home.** Restore points can contain infected files; if left on, a later restore reinfects the machine, and the antimalware tool cannot clean inside them. Turning it off deletes the existing restore points.
4. **Remediate infected systems.** Update the antimalware software (definitions first, on another machine if needed), then scan and remove. Techniques: **safe mode** so the malware's normal startup does not run, a **preinstallation environment** (boot from clean media or WinRE) so the infected OS is not running at all, an offline scanner, a second-opinion scanner. If the infection is a rootkit or removal keeps failing, **reimage or reinstall** the OS from a known-good image.
5. **Schedule scans and run updates.** Turn on scheduled scans, apply all OS and application updates, and update the antimalware definitions again; the vulnerability that let the malware in is usually a missing patch.
6. **Enable System Restore and create a restore point in Windows Home.** Now that the machine is clean, turn protection back on and take a clean snapshot.
7. **Educate the end user.** Explain what happened and how to avoid it: attachments, links, downloads, pop-ups, USB sticks, and how to report the next one. Without this step the machine comes back next month.

## Why the order matters
Quarantine before anything else stops the spread. Disabling System Restore before scanning prevents reinfection from a restore point. Updating tools before scanning catches current malware. Re-enabling System Restore only after the machine is clean produces a clean restore point. Education last, because now you know what to teach.

## Practical notes
- Preserve evidence first if the incident may involve law enforcement or HR (unit 8): image the drive before cleaning.
- Change passwords the user typed on that machine, from a clean machine.
- Check that the antivirus is enabled and updated afterward; malware often disables it.
- A machine that was reimaged still needs steps 5 through 7.

## How the exam frames it
- "A user reports pop-ups and the antivirus is disabled. What should the technician do FIRST?" Investigate and verify the symptoms (step 1).
- "After confirming the infection, what is the NEXT step?" Quarantine: disconnect from the network.
- "The technician has disabled System Restore. What is next?" Remediate: update the antimalware, scan, and remove.
- "After removal and updates, what should be done before returning the PC?" Enable System Restore and create a restore point, then educate the user.
- "Why disable System Restore?" So infected restore points are deleted and cannot reinfect.

> Exam tip: verify, quarantine, disable System Restore (Home), remediate (update tools, scan in safe mode or a preinstallation environment, reimage if needed), schedule scans and update, enable System Restore and create a restore point (Home), educate. Quarantine means disconnect from the network.`,
      hook: "1 Investigate and verify symptoms. 2 Quarantine: disconnect from the network. 3 Disable System Restore (Windows Home). 4 Remediate: update antimalware, scan and remove in safe mode or a preinstallation environment, reimage or reinstall if needed. 5 Schedule scans and run updates. 6 Enable System Restore and create a restore point. 7 Educate the end user."
    }
  ]
});
