// APlus Academy Core 2 deeper explanations, units 4 and 5. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u4l1: `## Layers of physical security
Physical security works in rings. The outer ring is the property line, the next is the building shell, then the floor or suite, then the room, then the rack or cabinet, then the device itself. A good design puts at least one control in every ring so a failure in one is caught by the next. The exam rarely says "ring," but its scenarios always describe which ring was breached, and the right answer is the control that belongs to that ring.

\`\`\`
ring          controls
property      fences, bollards, lighting, cameras, guards at the gate
building      badge readers, access control vestibule, magnetometer, alarm, guards at the desk
floor/suite   badge readers, door locks, cameras in corridors
room          keypad or biometric lock, motion sensor, camera, no windows
rack/cabinet  locking racks and cabinets, keyed drawers
device        cable locks, chassis locks, port blockers
\`\`\`

## The access control vestibule, step by step
1. A person badges through the first door into a small enclosed space.
2. The first door closes and locks behind them.
3. Only now can the second door be opened, by a second badge read, a PIN, a biometric, or a guard who verifies the person.
4. One person at a time, because the space is sized for one; a second person cannot slip in.
The vestibule defeats tailgating (following someone through) and piggybacking (the person ahead holding the door on purpose). Employees must also be trained to challenge or report strangers, since a vestibule guards only the doors it is installed on.

## Choosing biometrics
\`\`\`
method       accuracy   cost    user acceptance   notes
fingerprint  good       low     high              cuts and dry skin cause misreads; can be lifted
palm print   good       medium  high              vein patterns are hard to fake
facial       good       low     high              lighting and masks affect it; liveness checks stop photos
retina       excellent  high    low               shines light into the eye; slow; very accurate
voice        fair       low     high              background noise and recordings are problems
\`\`\`
Biometrics have a false acceptance rate (letting the wrong person in) and a false rejection rate (locking the right person out). Tightening one loosens the other; the crossover point is how systems are compared. High-security rooms pair a biometric with a badge or PIN so both must fail.

## Worked scenarios
- A visitor followed an employee into the data center through a badged door. The control that would have stopped it is an access control vestibule; the training gap is "do not hold doors."
- A laptop left on a desk overnight is gone in the morning, and the office door was locked. The next ring inward is the device: a cable lock or a locked cabinet.
- Someone rammed a truck into the loading dock door. Bollards.
- A former employee's badge still opens the door. Physical access control also needs a revocation process: badges are disabled at termination.

## How the exam asks it
"Which of the following would BEST prevent unauthorized people from entering behind employees?" (vestibule). "Which control prevents vehicles from approaching the entrance?" (bollards). "A technician wants to know who entered the server room and when" (badge reader logs, video). "Which is an example of something you are?" (fingerprint, retina, face, palm, voice).

## What to memorize
Bollards for vehicles; vestibule for tailgating; badge readers log entry; equipment locks protect devices; magnetometers detect metal; motion sensors and alarms for after-hours; guards provide judgment. Biometric methods: retina, fingerprint, palm print, face, voice. Key fobs, smart cards, mobile digital keys, and metal keys are something you have.`,

u4l2: `## Why least privilege matters more than any product
Every piece of malware runs with the rights of the account that launched it. If that account is a standard user, the malware can encrypt the user's documents but cannot install a rootkit, disable the antivirus, or spread to system files. If the account is a local administrator, everything is possible. Least privilege is therefore the cheapest and most effective security control on a workstation: make everyone standard, give administrators a separate admin account they use only when needed, and give service accounts exactly the rights their task requires.

## Zero Trust in one picture
\`\`\`
old model                          Zero Trust
firewall = the wall                every resource has its own gate
inside = trusted                   nothing is trusted by location
VPN = full access                  each app checks identity, device health, context
one login per day                  continuous verification, least privilege per request
\`\`\`
Zero Trust is a design philosophy rather than a product: identity-based access, device compliance checks, micro-segmentation so a compromised PC cannot roam, MFA everywhere, and logging of every access decision.

## Factors and methods, sorted
\`\`\`
factor            examples
something you know   password, PIN, security question
something you have   hardware token, phone with authenticator app, smart card, SMS code (the phone)
something you are    fingerprint, face, retina, voice
\`\`\`
Two methods from the same factor (password plus PIN) are not multifactor. MFA method strength, strongest first: hardware security key, authenticator app push or TOTP, voice or SMS code, email code. SMS and voice fall to SIM swapping, where an attacker convinces the carrier to move the victim's number to a new SIM. TOTP works offline because both sides compute the code from a shared secret and the current 30-second window; a wrong clock breaks it.

## The identity alphabet in a scenario
A company adopts a cloud HR application. IAM decides that HR staff get access and defines the role. The directory (Active Directory) holds the accounts, and an identity provider synchronizes with it. SAML lets the HR application trust the identity provider's assertion, so users get SSO: they sign in once and reach HR, mail, and the file service. MFA protects that one sign-in. Administrators of the HR system get no standing rights; when they need them they request just-in-time access through PAM, which checks out a privileged credential for two hours and records the session. MDM makes sure phones reaching HR data are encrypted and can be wiped. DLP stops an HR export of salaries from being emailed to a personal address. Each acronym did one job.

## ACLs, practical
An ACL is read top to bottom on firewalls and routers: the first matching rule wins, and an implicit deny sits at the end. On NTFS, permissions are cumulative across groups, with an explicit Deny beating any Allow. When a scenario says "the user is in two groups and cannot access the folder," look for a Deny on one of them.

## How the exam asks it
"Which principle states that users should have only the access needed for their job?" (least privilege). "Which model assumes no implicit trust based on network location?" (Zero Trust). "Which MFA method is MOST vulnerable to SIM swapping?" (SMS). "Which standard enables SSO between an identity provider and a web application?" (SAML). "Which practice grants administrator rights only when needed for a limited time?" (just-in-time access). "Which solution prevents sensitive data from being emailed outside?" (DLP).

## What to memorize
Least privilege, Zero Trust, ACL. Factors: know, have, are. Methods: email, hardware token, authenticator app, SMS, voice, TOTP, OTP. SAML for web SSO; SSO one login; JIT temporary rights; PAM privileged credential control; MDM devices; DLP data leaving; IAM the umbrella; directory services such as Active Directory over LDAP.`,

u4l3: `## What each protocol actually changed
WEP used a small static key and a flawed cipher setup; a few minutes of captured traffic reveal the key. WPA kept WEP hardware alive by wrapping the same cipher in TKIP, which rotates keys per packet; it was always meant to be temporary and is now breakable. WPA2 moved to AES with CCMP, a modern block cipher with integrity checking; its weakness is the pre-shared key handshake, which an attacker can capture and brute-force offline if the passphrase is weak. WPA3 replaced that handshake with SAE (also called Dragonfly), where each side proves knowledge of the password without ever sending material that can be brute-forced offline, and each session gets a fresh key (forward secrecy).

\`\`\`
protocol   cipher       key handling         status
WEP        RC4 (broken) static key           never use
WPA        RC4 + TKIP   per-packet rotation  deprecated
WPA2       AES-CCMP     PSK or 802.1X        acceptable with a strong passphrase
WPA3       AES-GCMP     SAE or 802.1X        current standard
\`\`\`

## Personal versus Enterprise
Personal (PSK) means one passphrase shared by every device; anyone who leaves the company still knows it, and one leaked passphrase exposes everyone. Enterprise uses 802.1X: the client presents its own credentials (username and password or a certificate) through EAP, the access point forwards them to a RADIUS server, and each client receives a unique session key. Revoking one user is a directory change, not a passphrase change on every device.

## RADIUS, TACACS+, Kerberos side by side
\`\`\`
protocol   typical use                        transport      encryption                          AAA handling
RADIUS     Wi-Fi, VPN, network access users   UDP 1812/1813  password field only                 authentication and authorization combined
TACACS+    admin login to routers, switches   TCP 49         entire packet                       separate, per-command authorization
Kerberos   Windows domain sign-on             TCP/UDP 88     tickets, no password on the wire    authentication with tickets
\`\`\`

## Kerberos walkthrough
1. The user signs in; the client sends a request to the Key Distribution Center on the domain controller.
2. The KDC returns a ticket-granting ticket, encrypted so only a client holding the user's password hash can open it.
3. To reach a file server the client presents the TGT and asks for a service ticket for that server.
4. The client gives the service ticket to the file server, which trusts it because the KDC signed it.
5. Tickets carry timestamps; a clock more than five minutes off the domain controller causes authentication failures, which is why "time drift" is a troubleshooting symptom in the next unit.

## Worked scenarios
- A small office router offers WPA2-TKIP, WPA2-AES, and WPA2/WPA3 mixed. Choose mixed if any device lacks WPA3, otherwise WPA3; never TKIP.
- Nobody can join the corporate SSID, but the guest network works. The RADIUS server (or its certificate) is the common element; check it before touching access points.
- Administrators want to log which commands each engineer runs on the switches. TACACS+.
- Domain users cannot log in after a PC sat unplugged for months. Its clock drifted past the Kerberos tolerance; sync time.

## How the exam asks it
"Which wireless protocol uses SAE?" (WPA3). "Which encryption should be avoided?" (TKIP or WEP). "Which server authenticates users connecting to enterprise Wi-Fi?" (RADIUS). "Which protocol encrypts the entire authentication packet and is used for device administration?" (TACACS+). "Which authentication protocol uses tickets and requires time synchronization?" (Kerberos).

## What to memorize
WPA3 with SAE best; WPA2 with AES acceptable; TKIP and WEP wrong. RADIUS UDP 1812 and 1813, password-only encryption, users. TACACS+ TCP 49, full encryption, device admins. Kerberos tickets from the KDC, five-minute clock tolerance. Multifactor adds a token or certificate on top.`,

u4l4: `## Sorting malware by how it arrives and what it wants
\`\`\`
type           arrives by                           wants                          tell-tale sign
trojan         user runs a disguised program        a foothold, a backdoor         new program, then odd behavior
virus          infected file copied and opened      to spread, to damage           many files altered
rootkit        dropped by a trojan or exploit       to hide and persist            tools show nothing, machine still wrong
spyware        bundled software, drive-by download  information                    slow browser, data leaks, new toolbars
ransomware     phishing, exploit, RDP break-in      money                          encrypted files, ransom note
keylogger      software drop or hardware plug       credentials                    accounts compromised despite strong passwords
boot sector    infected media, old exploits         to run before the OS           boot problems, survives OS cleaning
cryptominer    web scripts, trojans                 CPU and GPU time               heat, fans, 100 percent CPU
stalkerware    installed by someone with access     to monitor a person            battery drain, location known to another
fileless       macro, script, exploit in memory     stealth                        PowerShell or WMI activity, no new files
adware         bundled free software                ad revenue                     pop-ups, redirects, changed home page
PUP            bundled installers                   revenue, data                  toolbars, "optimizers," slowness
\`\`\`

## Why some infections need a reinstall
A rootkit modifies the parts of the system that every tool relies on to see what is running. When the operating system itself lies about the process list and file listing, an antivirus running on that OS is asking the liar for the truth. The way around it is to examine the disk from outside (boot media, a preinstallation environment) or to stop trusting the installation and reimage it. Firmware rootkits go further and survive even a reinstall; those need a firmware reflash or a replaced board.

## The detection stack
\`\`\`
layer                    what it catches                        what it misses
email security gateway   phishing, malicious attachments        anything that arrives another way
antivirus (signatures)   known malware                          new and fileless malware
antimalware (heuristics) suspicious patterns, PUPs, spyware     clever novel attacks
software firewall        unsolicited inbound, some outbound     attacks over allowed channels
EDR                      suspicious behavior, memory attacks    needs tuning; alerts need people
MDR                      EDR plus a staffed team                cost
XDR                      correlated view across everything      cost, complexity
user education           the click that starts it               the day someone is rushed
\`\`\`
EDR is the answer when a question describes "detecting and responding to threats on endpoints based on behavior," MDR when "a third party monitors the alerts," and XDR when "correlating across endpoints, network, email, and cloud."

## Worked scenarios
- A user installed a free video converter; now the browser has a new search engine and pop-ups. Adware and a PUP; uninstall, remove the extension, reset the browser, scan.
- Servers show a process using 100 percent CPU at night with outbound connections to a mining pool. Cryptominer; the entry was probably an unpatched web application.
- A finance clerk's files carry a new extension and a text file demands payment. Ransomware; isolate, restore from offline backup, do not pay, investigate the entry point.
- A parent's phone shows location to an ex-partner. Stalkerware; check installed apps and profiles, factory reset if needed, and treat it as a safety issue.
- Antivirus is clean but the machine hides processes and the firewall was changed. Rootkit; boot clean media, or reimage.

## How the exam asks it
"Which type of malware disguises itself as legitimate software?" (trojan). "Which malware hides its presence by modifying the OS?" (rootkit). "Which runs entirely in memory using legitimate tools?" (fileless). "Which tool would BEST detect a fileless attack?" (EDR). "Which solution filters malicious email before delivery?" (email security gateway). "What is the MOST reliable way to remove a rootkit?" (OS reinstallation).

## What to memorize
The twelve types and their tell-tale signs; the tools: recovery console, EDR, MDR, XDR, antivirus, antimalware, email gateway, software firewall, user education and antiphishing training, OS reinstallation.`,

u4l5: `## The social engineering family tree
\`\`\`
channel          mass                       targeted
email            phishing                   spear phishing; whaling (executives); BEC (fake executive requests)
voice            vishing                    vishing with researched details, impersonation of IT or a vendor
SMS              smishing                   smishing with the victim's name and bank
QR code          QR code phishing           posted in a specific lobby or sent to a specific group
in person        tailgating, dumpster diving  impersonation, shoulder surfing of a specific target
\`\`\`
Every social engineering attack leans on the same levers: authority (the CEO, the bank), urgency (today, or else), fear (your account is locked), trust (a familiar logo), and helpfulness (the technician needs a hand). Training teaches people to notice the lever and slow down.

## Threats, with the defense next to each
\`\`\`
threat            what it does                                     defense
DoS / DDoS        floods a service so it fails                     upstream filtering, scrubbing services, capacity
evil twin         fake AP with the real SSID                       WPA3, certificates for enterprise Wi-Fi, VPN, user awareness
zero-day          exploits an unpatched, unknown flaw              EDR behavior detection, least privilege, segmentation
spoofing          forges an address or identity                    email authentication (SPF, DKIM, DMARC), port security
on-path           intercepts traffic between two parties           HTTPS, VPN, certificate checking, no public Wi-Fi for sensitive work
brute force       tries every password                             long passwords, lockout, MFA
dictionary        tries likely passwords                           unique complex passwords, MFA
insider threat    abuses legitimate access                         least privilege, logging, DLP, separation of duties
SQL injection     database commands through input fields           input validation, parameterized queries
XSS               scripts injected into pages others load          output encoding, content security policy
BEC               fake executive email to move money               out-of-band verification of payment changes, MFA on mail
supply chain      compromises a vendor or update                   vendor vetting, signed updates, monitoring
\`\`\`

## Vulnerability versus threat versus attack
A vulnerability is a weakness (an unpatched server). A threat is something that could exploit it (a worm in the wild). An attack is the exploitation happening (the worm infecting the server). The exam's vulnerability list is short: non-compliant systems, unpatched systems, unprotected systems (no antivirus or firewall), end-of-life software, and BYOD. When a scenario asks "what made this possible," the answer is one of those five.

## Worked scenarios
- Accounts payable received an email from the CEO's real address asking to change a supplier's bank details. The mailbox was compromised: business email compromise. Verify by phone using a known number.
- At a conference, a laptop auto-joined the venue SSID and a certificate warning appeared for the mail server. Evil twin and on-path; disconnect, use cellular or a VPN.
- A web form lets a user type a quote and the site returns a database error. SQL injection was attempted; the site lacks input validation.
- Patches went out Tuesday; the attack landed Monday. Zero-day.
- A shipping label printer's vendor pushed an update that opened a backdoor. Supply chain.

## How the exam asks it
"A user receives a text message claiming to be from the bank" (smishing). "An attacker targets the CFO" (whaling). "Two access points with the same SSID" (evil twin). "An exploit is used before the vendor releases a patch" (zero-day). "An attacker intercepts and modifies traffic" (on-path). "Which vulnerability is created by employees using personal laptops?" (BYOD).

## What to memorize
Phishing, vishing, smishing, QR code phishing, spear phishing, whaling, shoulder surfing, tailgating, impersonation, dumpster diving. DoS, DDoS, evil twin, zero-day, spoofing, on-path, brute force, dictionary, insider, SQL injection, XSS, BEC, supply chain. Non-compliant, unpatched, unprotected, EOL, BYOD.`,

u5l1: `## Permissions, the whole model
\`\`\`
level    NTFS permission        what it allows
5        Full Control           everything, including changing permissions and taking ownership
4        Modify                 read, write, execute, delete
3        Read & Execute         open and run
2        List Folder Contents   see names (folders only)
2        Read                   open, view attributes
1        Write                  create files, write data, change attributes
\`\`\`
\`\`\`
share permission   what it allows over the network
Full Control       everything the NTFS layer permits
Change             read, write, delete
Read               open and view
\`\`\`
The effective permission for a network user is the lower of the two layers. Locally, only NTFS applies.

## Worked calculations
\`\`\`
share       NTFS            effective over network   effective locally
Full        Read            Read                     Read
Read        Modify          Read                     Modify
Change      Full Control    Change                   Full Control
Full        Deny Write      no write                 no write
\`\`\`
Group combination: a user in Sales (Read) and Managers (Modify) has Modify, because Allow entries add up. Add Interns (Deny Write) and the user cannot write, because Deny wins.

## Copy versus move
\`\`\`
action                              resulting permissions
copy anywhere                       inherits from the destination folder
move within the same NTFS volume    keeps its own explicit permissions and inheritance from the old parent
move to a different volume          inherits from the destination (it is a copy plus a delete)
\`\`\`
Attributes travel with the file in all cases except encryption when the destination is FAT, which cannot store it.

## Inheritance, in practice
By default a folder passes its permissions to everything created inside. Right-click, Properties, Security, Advanced shows whether an entry is inherited. "Disable inheritance" offers two choices: convert the inherited entries into explicit ones (keep them, then edit) or remove them all (start clean). A subfolder with disabled inheritance is where "why does this folder have different permissions" scenarios come from. "Replace all child object permission entries" forces the parent's permissions back down.

## Accounts and UAC
\`\`\`
account type      can install software   can change system settings   should be used for
standard          no (prompted)          no (prompted)                everyone, every day
administrator     yes                    yes                          administration only
guest             no                     no                           disabled
power user        legacy                 legacy                       nothing
\`\`\`
UAC lets even administrators run with standard rights until a task needs more; the consent prompt (or credential prompt for standard users) is the moment of elevation. Run as administrator triggers it deliberately. Turning UAC off removes that checkpoint and lets malware elevate silently.

## Defender and the firewall, quick facts
Defender Antivirus turns itself off when a third-party product registers with Windows Security; two real-time scanners fight each other. Definitions update through Windows Update. The firewall has three profiles (Domain, Private, Public) with separate rules; the Public profile is strictest. Inbound is blocked by default except for rules; "Allow an app through the firewall" adds a program rule; Advanced settings adds port rules.

## How the exam asks it
"A user has Full Control share permission and Read NTFS permission. What can they do over the network?" (Read). "A file moved to another folder on the same drive keeps its old permissions. Why?" (moves within a volume retain permissions). "A user in two groups cannot open a file even though one group has Allow" (the other group has Deny). "Which account type should regular employees use?" (standard). "What prompts when a program needs elevation?" (UAC).

## What to memorize
Most restrictive wins over the network; Deny beats Allow; Allows accumulate across groups; copy inherits the destination, move within a volume keeps; inheritance flows down unless disabled; NTFS applies locally and remotely, share only remotely. Standard accounts; guest disabled; UAC on; PIN is device-local.`,

u5l2: `## BitLocker under the hood
BitLocker encrypts every sector of the volume with a key that is itself sealed inside the TPM. At boot, the TPM measures the firmware, bootloader, and boot configuration; if the measurements match what was sealed, it releases the key and Windows starts normally. If anything in that chain changes (a firmware update, a new motherboard, Secure Boot toggled, the drive moved to another machine), the TPM refuses and BitLocker asks for the 48-digit recovery key. That is why the recovery key must be saved before enabling, and why domain machines escrow it to Active Directory automatically.

\`\`\`
protector          what unlocks the drive                      use
TPM only           the intact boot chain                       default on laptops
TPM + PIN          boot chain and a PIN typed at power-on      higher security
TPM + USB key      boot chain and a key file on a USB drive    rare
password           a password at boot (no TPM)                 machines without a TPM
recovery key       48-digit key                                emergencies
\`\`\`
Editions: Pro, Enterprise, and Education. Home offers a limited "device encryption" on supported hardware but not full BitLocker management.

## BitLocker To Go versus EFS
\`\`\`
feature            BitLocker To Go                      EFS
protects           removable drives (USB, external)     individual files and folders on NTFS
unlocked by        password or smart card               the user's certificate, transparently
portable to        any Windows PC with the password     only where the certificate exists
other users        anyone with the password             locked out, including administrators
risk               forgetting the password              losing the certificate; copying to FAT decrypts
\`\`\`
EFS and BitLocker stack: BitLocker protects the device when it is off; EFS protects a file from other users when it is on.

## Active Directory, the moving parts
\`\`\`
object / setting     lives in                        does
domain               the forest                      security boundary with its own accounts and policies
OU                   inside a domain                 container for organizing users and computers; GPO link point
user object          an OU                           account; Profile tab holds login script and home folder
computer object      an OU                           machine account created when the PC joins
security group       an OU                           permissions target; nest by role
GPO                  linked to site, domain, or OU   settings pushed to users and computers under the link
\`\`\`
Policy order is local, site, domain, OU, and nested OUs from the top down; a later setting overrides an earlier one, and the closest OU wins unless an enforced link higher up says otherwise. gpupdate /force pulls policy now; gpresult /r shows what applied.

## Each task, and the question it answers
- Joining a domain: "Users cannot sign in with domain accounts on the new PC." Join it, then move its computer object to the correct OU.
- Login script: "Every user in Accounting needs the Q: drive mapped at sign-in." Script on the Profile tab, or a Group Policy drive map (the modern way).
- Moving objects between OUs: "A transferred user still receives the old department's desktop lockdown." Move the user object.
- Home folder: "Each user needs a personal network folder." Profile tab, Home folder, connect to a letter.
- Group Policy: "Enforce a 14-character password on all domain computers." A GPO linked at the domain.
- Security groups: "Give the Marketing team access to the campaign share." Create or use the Marketing group, assign NTFS permissions to it, add users.
- Folder redirection: "Users lose their Documents when their PC is reimaged." Redirect Documents to a server share by GPO.

## How the exam asks it
"A laptop's drive must be unreadable if the laptop is stolen" (BitLocker). "Which requires the TPM?" (BitLocker default protector). "Which encrypts a single folder for one user?" (EFS). "Which AD action changes which Group Policy applies to a user?" (moving the object to another OU). "Which AD feature stores users' documents on the server transparently?" (folder redirection).

## What to memorize
BitLocker: whole volume, TPM, recovery key, Pro and above. BitLocker To Go: removable. EFS: per file, per user certificate. AD tasks: join, login script, move between OUs, home folder, Group Policy (local, site, domain, OU), security groups, folder redirection.`,

u5l3: `## Hardening as a baseline
A baseline is the written list of settings every workstation must have before it goes to a user. The hardening items in this objective are that list. Organizations enforce it through images, Group Policy, and MDM, then audit for drift ("non-compliant systems" in the vulnerability list). When a scenario mentions a control that "should have been in place," the answer is the baseline item that was missing.

\`\`\`
category             baseline items
data                 full-disk encryption on; recovery keys escrowed
passwords            length 12+, complexity, uniqueness, expiration per policy; BIOS/UEFI supervisor password
accounts             standard users; renamed and locked-down built-in Administrator; guest disabled; lockout after failed attempts; login hours for shift roles; expiration dates for temporary staff
sessions             screen lock after idle; log off on shared machines
software             AutoRun and AutoPlay off; unused services and features off; unused software removed; patches current
physical             cable locks, locked rooms, no PII on desks or screens
users                password manager; awareness training
\`\`\`

## Password policy numbers, and the reasoning
Length is the dominant factor because every added character multiplies the search space. A 12-character passphrase of common words beats an 8-character jumble of symbols. Complexity requirements exist to stop the obvious choices, and uniqueness stops one breach from opening every account (credential stuffing). Expiration used to be 90 days everywhere; current guidance is to change passwords when there is reason to think they leaked, and to rely on length, uniqueness, MFA, and breach monitoring instead. Lockout thresholds around 5 to 10 attempts with a 15-minute lockout stop online brute force without locking users out constantly.

## Firmware passwords
\`\`\`
password type                   stops
supervisor / administrator      changing firmware settings, boot order, Secure Boot, TPM
user / boot / power-on          the machine booting at all without it
drive password (ATA)            the drive spinning up in any machine
\`\`\`
A supervisor password keeps a thief from booting a USB stick to bypass Windows; combined with BitLocker, the disk is useless elsewhere.

## AutoRun and services
AutoRun executed an autorun.inf from inserted media automatically; Windows disabled it for removable drives years ago, but AutoPlay still pops up actions, and policy should disable both. Each running service is listening code that may have a vulnerability; disabling what is unused (print spooler on a server that never prints, remote registry, Telnet) shrinks the attack surface.

## Worked scenarios
- An auditor finds a shared account used by three receptionists. Individual accounts, least privilege, and login hours.
- A departing contractor's account was used a month after departure. Expiration dates on temporary accounts and a termination checklist.
- A laptop stolen from a car had customer data. Encryption at rest, and the policy about leaving hardware unattended.
- Helpdesk finds passwords on sticky notes. Password manager rollout and training.
- A workstation boots to a Linux USB and the thief copies files. BIOS supervisor password with boot order locked, plus BitLocker.

## How the exam asks it
"Which is the MOST important factor in password strength?" (length). "Which setting prevents a program from launching automatically when a USB drive is inserted?" (disable AutoRun). "Which protects a machine's data if it is stolen?" (data-at-rest encryption). "A user's account should stop working at the end of the internship" (account expiration). "Which mitigates brute-force attacks against logins?" (lockout).

## What to memorize
Encrypt at rest; long unique complex passwords; BIOS/UEFI passwords; screensaver lock, log off, secure hardware, protect PII, password manager; restrict permissions and login times, disable guest, lockout, timeout, expiration; change default admin; disable AutoRun; disable unused services.`,

u5l4: `## The mobile security stack
\`\`\`
layer            controls
device           encryption, screen lock (PIN, biometric), failed-attempt wipe, OS and app patches
apps             store-only installs, antivirus and antimalware, content filtering, no sideloading
data             work profile or container, remote backup, DLP inside the container
loss             locator app, remote lock, remote wipe
management       MDM enrollment, configuration profiles, compliance rules (profile security requirements)
policy           BYOD versus corporate-owned, acceptable use, what the company may see
\`\`\`

## Screen locks ranked
\`\`\`
method             strength   note
swipe              none       no authentication at all
pattern            weak       smudges and shoulder surfing reveal it; few patterns are common
4-digit PIN        low        10,000 combinations; only the lockout makes it workable
6+ digit PIN       fair       the practical minimum for company data
fingerprint        good       fast; falls back to the PIN; can be spoofed with effort
facial             good       liveness detection matters; falls back to the PIN
\`\`\`
Biometrics on phones always sit on top of a PIN or passcode, which is required after restarts and after several failed biometric attempts. Policy should set the passcode minimum, since the biometric is only as strong as its fallback.

## Configuration profiles
A profile is a signed settings bundle. It can install Wi-Fi and VPN settings with certificates so users never type the passphrase, add the mail account, restrict features (camera, app store, screenshots, AirDrop), require a passcode, and mark the device as supervised or managed. Profiles are how MDM does its work; on a personal phone, a profile is also how stalkerware and rogue configurations get installed, so "unknown profile installed" is a symptom in Unit 6.

## BYOD versus corporate-owned, the trade
\`\`\`
aspect                 corporate-owned              BYOD
who owns it            company                      employee
management             full: any setting, any wipe  work profile only; selective wipe
privacy                company sees everything      company sees only the work container
cost                   company buys and replaces    employee buys; company may stipend
compliance             easier                       needs a clear policy and profile security requirements
\`\`\`
Profile security requirements are the entry bar for either: minimum OS version, encryption on, passcode set, no jailbreak or root, antivirus present, and, for corporate devices, supervision. A device that fails is blocked from mail and apps until it complies.

## Lost device drill
1. Use the locator app to find and, if it is nearby, sound it.
2. Remote lock with a message and contact number.
3. If it is not recovered quickly or holds sensitive data, remote wipe (selective for BYOD, full for corporate).
4. Report per the incident policy; rotate any credentials that were on it.
5. Restore the replacement from the remote backup.
Failed-attempt restrictions give this drill time: the thief cannot guess the passcode before the device locks or erases.

## How the exam asks it
"Which screen lock provides NO security?" (swipe). "A user lost a corporate phone; what should be done to protect the data?" (remote wipe after locate and lock). "Which allows a company to wipe only its data from an employee's personal phone?" (BYOD work profile with selective wipe through MDM). "Which ensures a device meets minimum standards before receiving company email?" (profile security requirements). "Which pushes Wi-Fi, VPN, and restrictions to enrolled devices?" (configuration profiles).

## What to memorize
Encryption; locks: facial, PIN, fingerprint, pattern, swipe; profiles; OS and app patches; antivirus, antimalware, content filtering; locator, remote wipe, remote backup, failed-login restrictions; MDM; BYOD versus corporate; profile security requirements.`,

u5l5: `## The router as the perimeter
A SOHO router is four devices in one: a NAT firewall between the internet and the LAN, a switch, an access point, and a DHCP and DNS server. Each role has settings to secure. The exam's performance-based version shows a router page and asks you to fix the insecure settings; the multiple-choice version describes one symptom and asks which setting to change.

\`\`\`
role           insecure default                secure setting
management     admin/admin, HTTP, WAN access   unique password, HTTPS, LAN-only, remote management off
firmware       shipped version                 updated, automatic updates on
wireless       default SSID, WPA2 mixed TKIP   custom SSID, WPA3 or WPA2-AES, long passphrase
guests         on the main LAN                 isolated guest SSID
services       UPnP on                         UPnP off
exposure       DMZ host pointed at a PC        port forwarding for one service, or a screened subnet
filtering      none                            content filtering, optional IP and MAC filtering
placement      on a shelf by the front door    locked closet, central for coverage, minimal spill
\`\`\`

## UPnP, DMZ, and port forwarding, the differences
UPnP lets any program on any LAN device ask the router to open an inbound port; malware uses it to expose infected machines. Port forwarding is the same opening made by the administrator, deliberately, for one port to one device. A consumer "DMZ host" forwards every port to one device, which is nearly as exposed as being on the public internet; a true screened subnet is a separate network segment with its own firewall rules, where exposed servers live so a compromise cannot reach the LAN. Order of preference: nothing exposed; then port forwarding for exactly the needed port; then a screened subnet for devices that must be widely reachable; never DMZ host.

## Wireless settings, honestly rated
\`\`\`
setting                   real security value   why
WPA3 / WPA2-AES           high                  encryption is the only thing that protects the air
long passphrase           high                  defeats offline brute force of the WPA2 handshake
guest isolation           high                  visitors and IoT cannot reach company devices
changing the SSID         low                   hides the router model; cosmetic otherwise
disabling SSID broadcast  low                   the name is still in every probe and beacon
MAC filtering             low                   addresses are visible and trivially cloned
reducing transmit power   low to medium         limits spill outside the building
\`\`\`

## Worked configuration
A dental office router: change the admin password, update firmware, HTTPS management from the LAN only, remote management off. Main SSID "FrontDesk-5G" with WPA3, a 20-character passphrase; guest SSID for patients, isolated, bandwidth-limited. UPnP off. Content filtering through a filtering DNS service. The practice-management server needs remote access from the billing company: a VPN instead of port forwarding, or if forwarding is unavoidable, one port to that server only, with the vendor's IP filtered. The router lives in the locked utility closet.

## How the exam asks it
"Which setting should be disabled to prevent devices from opening ports automatically?" (UPnP). "Which provides internet access to visitors without access to the LAN?" (guest network). "Which allows an external game server to reach a console on a specific port?" (port forwarding). "Which is the FIRST thing to change on a new router?" (default password). "Which places publicly reachable devices on a separate segment?" (screened subnet). "Which is the LEAST effective wireless security measure?" (SSID hiding or MAC filtering).

## What to memorize
Change defaults, firmware updates, IP and MAC filtering, content filtering, placement, UPnP off, screened subnet, secure management access, SSID change, SSID broadcast off (weak), WPA3 or WPA2-AES, guest access, disable unused ports, port forwarding and mapping.`,

u5l6: `## Trust begins with the download
\`\`\`
step                      trusted practice                        untrusted practice
get the browser           vendor site, platform store, IT package  ad link, download portal, bundled installer
verify                    compare SHA-256 hash with the published  run whatever downloaded
extensions                official store, reviewed permissions     "free VPN" from a forum, sideloaded
updates                   automatic, restart when prompted          ignore the update banner for months
\`\`\`
Hashing: the vendor publishes the hash of the installer; you compute the hash of your copy (certutil -hashfile on Windows, shasum on Mac) and compare. A match proves the bytes are identical; a mismatch means a corrupted or tampered download, or a site serving a different file.

## Certificates and the padlock
When a browser connects over HTTPS it checks that the site's certificate was issued by a trusted authority, matches the site name, is within its dates, and is not revoked. The padlock means all four passed. Warnings mean one failed: expired (dates), mismatch (name), untrusted issuer (self-signed or unknown authority), or revoked. On a company network a content-filtering proxy may intercept HTTPS and re-sign it with the company's certificate; managed PCs trust that certificate, personal devices show warnings. Clicking through a warning on a banking site is how on-path attacks succeed.

## The settings, sorted by what they protect
\`\`\`
setting                       protects against                                   trade-off
pop-up blocker                fake alerts, scam windows                          some sites need pop-ups; allow per site
ad blocker                    malvertising, tracking                             breaks some sites; blocks legitimate ads
password manager              reuse, weak passwords, phishing (no autofill on wrong domain)  master password is critical
private browsing              local traces on a shared PC                        no protection from the network or site
clearing data and cache       stale pages, tracking cookies, leftover sessions   logs you out; re-downloads pages
sync                          losing bookmarks and passwords                     copies work data wherever you sign in
secure DNS (DoH)              DNS snooping and tampering on the local network    bypasses company DNS filtering
proxy                         (company) filtering and logging                    (attacker) redirection if set by malware
\`\`\`

## Managing browsers at scale
Administrators push browser policy through Group Policy templates or MDM: force updates, block or allow specific extensions, disable sync into personal accounts, disable password saving in favor of the corporate manager, set the home page and proxy, control whether developer tools or private mode are available, and require the company's root certificate. "Enable or disable" questions about plug-ins, extensions, and features are about this policy layer.

## Worked scenarios
- A user's browser opens to a search page nobody chose, and every search redirects. Check extensions (remove unknown ones), check the proxy setting (clear a rogue proxy), reset the browser, scan for PUPs.
- A site shows a certificate warning on all PCs after a change to the filtering appliance. The appliance's re-signing certificate is not trusted; deploy it.
- A user wants to check their bank on a shared kiosk. Private browsing prevents saved passwords and history on that machine; it does not make the kiosk trustworthy.
- Downloaded installer hash differs from the vendor page. Delete it; get it again from the vendor.

## How the exam asks it
"Which verifies that a downloaded file has not been altered?" (hashing). "Which mode does NOT save history or cookies after the session?" (private browsing). "Which setting stops unwanted windows from opening?" (pop-up blocker). "A browser warns that a site's certificate is invalid; what should the user do?" (do not proceed; investigate). "Which encrypts DNS lookups?" (secure DNS). "From where should extensions be installed?" (trusted sources, the official store).

## What to memorize
Trusted sources, hashing, patching, trusted extensions; password managers, valid certificates, pop-up blocker, clear data and cache, private browsing, sign-in and sync, ad blockers, proxy, secure DNS; feature management by policy.`,

u5l7: `## The two questions
Every disposal decision answers two questions: will this media ever be used again, and what data did it hold? Reuse means sanitize (wipe, secure erase, cryptographic erase). No reuse means destroy (shred, drill, degauss, incinerate). Regulated or highly sensitive data pushes toward destruction with a certificate; ordinary data on a drive going to a charity is fine with a verified wipe.

\`\`\`
method            works on                         reusable after   assurance   notes
quick format      any                              yes              none        only the file table is rewritten
full format       any                              yes              low         zeros on modern Windows; not certified
overwrite wipe    HDD, and SSD with caveats        yes              good        one pass suffices on modern HDDs
secure erase      SSD and HDD firmware command     yes              good        resets all cells including spare areas
crypto erase      self-encrypting drives, phones   yes              good        destroys the key; instant
low-level format  manufacturer tool                yes              good        modern meaning: full firmware reset
degaussing        magnetic media only              no               high        useless on SSD and flash
drilling          any                              no               medium      platters holed; fragments remain
shredding         any                              no               high        industrial shredder, vendor
incineration      any                              no               high        licensed facility
\`\`\`

## Why SSDs are different
An SSD spreads writes across cells and keeps spare capacity the operating system cannot address, so an overwrite tool may miss blocks that still hold data. The drive's own secure erase command clears every cell, spare areas included. Degaussing does nothing because flash stores charge, not magnetism. When a drive was encrypted from the start (BitLocker, FileVault, phone encryption), destroying the key is equivalent to erasing it, which is why turning on encryption on day one is a disposal strategy.

## Paper trail
A certificate of destruction or recycling from the vendor lists each serial number, the method, the date, and the vendor's signature. Internally, the asset record shows the device retired and links to the certificate. Auditors for healthcare, financial, or privacy regulations ask for exactly this chain. Regulations also govern the environmental side: e-waste contains lead, mercury, and cadmium; batteries contain lithium; local rules require recycling through approved channels rather than landfill.

## Worked scenarios
- Fifty laptops are being donated. Verify encryption was on, run secure erase or a verified wipe, record serials, and issue an internal certificate.
- A failed server drive held payroll. It cannot be wiped, so it is shredded by the contracted vendor; keep the certificate.
- Old LTO backup tapes. Degauss or shred; tapes are magnetic, so degaussing works.
- A user "deleted everything" from a USB stick before handing it to a customer. Deletion and quick formats leave data; wipe it.
- Phones being traded in. Sign out of accounts, remove activation locks, factory reset (which performs a cryptographic erase on modern phones).

## How the exam asks it
"Which destruction method is ineffective on SSDs?" (degaussing). "Which allows a drive to be reused safely?" (wiping or secure erase). "Which document proves a vendor destroyed the drives?" (certificate of destruction). "Which formatting type leaves data recoverable?" (quick or standard format). "Which is a valid method of physical destruction?" (drilling, shredding, incineration, degaussing for magnetic media).

## What to memorize
Drilling, shredding, degaussing (magnetic only), incineration. Erase or wipe, low-level format, standard format (quick leaves data). Third-party vendor, certificate of destruction or recycling. Regulatory and environmental requirements.`,

u5l8: `## The procedure with the reasoning attached
\`\`\`
step  action                                         why here
1     investigate and verify malware symptoms        do not treat a hardware fault as malware; gather facts
2     quarantine the infected system                 stop spread and command traffic before touching anything
3     disable System Restore (Windows Home)          restore points can hold malware; deleting them prevents reinfection
4     remediate: update tools, scan, remove          current definitions; safe mode or preinstallation environment; reimage if needed
5     schedule scans and run updates                 close the hole it came through; keep watching
6     enable System Restore, create a restore point  a clean snapshot now that the machine is clean
7     educate the end user                           the human patch
\`\`\`
"Windows Home" appears on steps 3 and 6 because the objective assumes managed editions handle restore points through central tools; on any edition the principle is the same.

## Step 1 in detail
Symptoms to verify: pop-ups and fake alerts, browser redirection, disabled antivirus or firewall, new toolbars, unknown processes and startup items, high CPU with nothing open, files renamed or encrypted, outbound traffic, unusual account lockouts, email sent from the user's account. Also ask what changed: a download, an attachment, a USB stick, a "support" call. Verify with a second tool (Task Manager, Autoruns-style startup review, an offline scan) before declaring malware.

## Step 2, quarantine choices
Unplug the network cable and disable Wi-Fi; on a domain, disable the switch port or move it to a quarantine VLAN; in a VM, disconnect the virtual NIC. Preserve evidence if the incident may become legal or HR: photograph the screen, note the time, and image the disk before cleaning. Do not power off if memory evidence matters, since fileless malware lives only there.

## Step 4, the toolbox
\`\`\`
technique                     when
update antimalware first      always; use another machine to download if needed
scan in safe mode             malware set to start normally will not load
preinstallation environment   boot WinRE or clean media; the infected OS is not running at all
offline or bootable scanner   rootkits and boot-sector infections
second-opinion scanner        the primary product found nothing but symptoms persist
manual removal                startup entries, scheduled tasks, browser extensions, rogue profiles
reimage / reinstall           rootkits, repeated reinfection, any doubt about the machine's integrity
\`\`\`
After removal, confirm the antivirus is enabled and updating, the firewall is on, the proxy and DNS settings are normal, and the hosts file is clean.

## Steps 5 through 7
Patch the operating system and applications; malware usually arrives through a known, fixable hole. Schedule daily quick scans and weekly full scans. Turn System Restore back on and take a restore point named for the date. Then talk to the user: what the symptom looked like, what they clicked, what to do next time (hover links, verify senders, no unknown USB sticks, report early). Change passwords used on the machine from a clean device.

## Order questions, worked
- "Symptoms confirmed. NEXT?" Quarantine.
- "The machine is isolated. NEXT?" Disable System Restore.
- "The scan found and removed a trojan. NEXT?" Schedule scans and run updates.
- "Updates are done. NEXT?" Enable System Restore and create a restore point.
- "What is the LAST step?" Educate the end user.
- "What is the FIRST step?" Investigate and verify symptoms.

## What to memorize
The seven steps in order and one reason each. Quarantine equals disconnect from the network. Update definitions before scanning; safe mode or a preinstallation environment for stubborn malware; reimage for rootkits. Restore point only after cleaning. Education is the final step.`

});
