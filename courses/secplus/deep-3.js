// SecPlus Academy deeper explanations, units 11 to 15. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u11l1: `## The controls you actually configure
A firewall out of the box protects nothing. What protects the network is the rule set someone wrote, the signatures someone updated, and the filters someone tuned. This lesson is those settings.

## Firewall rules: how a packet is judged
\`\`\`
Rule 1   allow  any      -> web server   TCP 443
Rule 2   allow  internal -> web server   TCP 22
Rule 3   deny   any      -> web server   TCP 22
Rule 4   allow  internal -> any          any
(implicit)  deny everything else
\`\`\`

A packet is compared to the rules from the top. The first rule that matches decides; nothing below it is consulted. Anything that matches no rule hits the implicit deny at the end. Consequences:
- Order matters. If rule 3 were above rule 2, internal administrators could never SSH to the web server.
- An overly broad allow high in the list silently defeats every deny below it. "Traffic was permitted though no rule seemed to allow it" almost always means a broad rule matched first.
- The implicit deny is why "we never wrote a rule for that" still blocks it.

**Access lists** on routers and switches work the same way between internal segments. **Ports and protocols**: every allowed port is a door, so allow only what the service needs. **Screened subnet** rules are the classic three: internet to public servers on their service ports only; public servers to specific internal systems on specific ports only; nothing from the public servers to the internal network otherwise.

## IDS and IPS: two ways to recognize an attack
\`\`\`
Signatures   patterns of known attacks         precise, fast, blind to new attacks, must be updated
Trends       deviations from normal behavior   catches new attacks, more false positives, needs a baseline
\`\`\`

A signature is a fingerprint: this byte sequence, this request pattern, this exploit string. Trend or anomaly detection instead learns that this workstation normally talks to five servers, and alerts when it starts scanning two hundred. Mature deployments use both, and both need tuning.

## Web filtering: two architectures, four methods
\`\`\`
Agent-based        software on each device enforces policy anywhere, including home and hotels
Centralized proxy  all web traffic passes through one proxy on the network; simple; covers only what passes through
\`\`\`

The exam's tell: if the requirement includes laptops off the corporate network, the answer is agent-based. Inside either architecture, the filtering itself uses:
\`\`\`
URL scanning             the requested address is checked against known-bad lists
Content categorization   sites are grouped (gambling, malware, social media) so policy applies to whole groups
Block rules              explicit allow and deny lists for specific sites
Reputation               a score from the site's history; low reputation is blocked or warned
\`\`\`

## DNS filtering: the cheapest broad control
Every connection begins with a name lookup. Point all devices at a filtering resolver that refuses to answer for known-malicious domains, and:
- Malware cannot find its command-and-control server.
- Users cannot reach the phishing site even if they click.
- It works for every application, not just browsers, with no agent and no proxy.
It does not inspect content and cannot stop connections made directly to an IP address, so it complements rather than replaces web filtering.

## Worked scenarios
\`\`\`
"An internal host reached a blocked external service"            a broader allow rule sits above the deny; fix rule order
"Block social media on company laptops used from home"            agent-based web filtering with content categorization
"Prevent infected hosts from beaconing to their C2 domain"        DNS filtering
"Detect a brand-new attack with no published signature"           trend / behavior-based detection
"Alert on a known exploit string in web requests"                 signature-based IDS/IPS
\`\`\`

## How the exam asks it
- "Which firewall rule is applied when no explicit rule matches?" The implicit deny.
- "Which web filtering approach protects devices off the corporate network?" Agent-based.
- "Which control blocks access to malicious domains for all applications?" DNS filtering.

## What to memorize
- Rules: top-down, first match, implicit deny; order matters; allow only needed ports.
- Signatures for known attacks, trends for new ones.
- Agent-based follows the device; proxy sees only what passes through; URL scanning, categories, block rules, reputation. DNS filtering protects everything cheaply.`,

u11l2: `## The rest of the toolkit
Nine capabilities, each a short definition and one situation it answers. The exam tests them as recognition: describe the need, name the tool.

## Operating system security
\`\`\`
Group Policy   Windows domains; pushes settings to every machine centrally   password rules, disabled services,
                                                                             software restrictions, screen locks
SELinux        Linux; mandatory access control that confines each process     a compromised web server process cannot
               to the files and ports its policy allows                       read the password file or open new ports
\`\`\`

Group Policy is how the workstation baseline gets enforced at scale. SELinux is how a Linux server survives a compromised service: the process is boxed in regardless of what the attacker wants.

## Secure protocols: three decisions
\`\`\`
Protocol selection   SSH not Telnet; HTTPS not HTTP; SFTP not FTP; SNMPv3 not v1/v2c; LDAPS not LDAP; DoT/DoH not plain DNS
Port selection       the encrypted service has its own port: 22, 443, 636, 993, 995, 853 (SNMPv3 keeps 161/162)
Transport method     TLS for application traffic; IPsec for network tunnels; SSH for administration
\`\`\`

## Email security: three DNS records and a gateway
Email was designed with no way to verify the sender, so three records were bolted on.
\`\`\`
SPF     a DNS record listing the servers allowed to send mail for the domain
        receiver checks: did this message arrive from an allowed server?
DKIM    the sending server signs each message; the public key is published in DNS
        receiver checks: is the signature valid, so the message is unaltered and from the domain?
DMARC   a DNS policy that tells receivers what to do when SPF or DKIM fails
        (none = monitor, quarantine = spam folder, reject = refuse) and where to send reports
Gateway the mail server or service that scans inbound and outbound mail for spam, malware,
        phishing, and data leakage
\`\`\`

Memory hook: SPF is the guest list, DKIM is the signature on the letter, DMARC is the instruction for what to do with letters that fail either check.

## File integrity monitoring
FIM stores a hash of every critical file (system binaries, configuration files, the web root) and periodically rehashes them. A change to a file that should never change raises an alert. It is how you notice a replaced system binary, an edited configuration, or a web shell dropped into the web directory. "Detect unauthorized modification of system files" is FIM.

## Data loss prevention
DLP watches data on its way out: email attachments, web uploads, cloud sync, removable media, even printing. It recognizes sensitive content by patterns (card numbers, national ID formats), keywords, fingerprints of known documents, and classification labels, then blocks, quarantines, or alerts. "Prevent sensitive data from leaving the organization" is DLP.

## Network access control
NAC is the bouncer at the door of the network. A device connecting through 802.1X is authenticated, then checked for posture: antivirus running and current, patches applied, disk encrypted, no jailbreak. Compliant devices get their normal VLAN. Noncompliant ones go to a quarantine or remediation network with access only to the update servers they need to become compliant.

## EDR and XDR
\`\`\`
EDR   an agent on every endpoint records processes, files, registry, and network activity;
      detects malicious BEHAVIOR (not just known files); lets analysts isolate a host and investigate remotely
XDR   the same detection and response extended across endpoints, network, email, cloud, and identity,
      correlated in one platform
\`\`\`

EDR is what catches fileless malware, living-off-the-land techniques, and ransomware behavior that antivirus signatures miss.

## User behavior analytics
UBA learns what normal looks like for each user and account: hours, locations, systems accessed, volumes of data. Then it alerts on deviation: the finance clerk pulling the engineering repository, a service account logging in interactively, ten times the usual download volume. It is the tool for compromised credentials and malicious insiders, because their credentials are valid and nothing else looks wrong.

## Worked scenarios
\`\`\`
"Enforce screen lock timeouts on every Windows workstation"            Group Policy
"Confine a Linux web server so a compromise cannot spread"              SELinux
"Receivers should reject mail claiming to be from us that fails checks" DMARC with a reject policy
"Detect that a system binary was replaced"                              FIM
"Stop a spreadsheet of card numbers from being uploaded"                DLP
"Only patched, encrypted laptops may join the network"                  NAC with posture assessment
"Detect ransomware by its behavior and isolate the host remotely"       EDR
"Detect a valid account behaving unlike its owner"                      UBA
\`\`\`

## What to memorize
- Group Policy pushes Windows settings; SELinux confines Linux processes.
- SPF sender list, DKIM signature, DMARC policy, gateway scans.
- FIM changed files, DLP leaving data, NAC device posture at the door, EDR endpoint behavior, XDR across everything, UBA abnormal user behavior.`,

u12l1: `## An identity's life
Every account is born, works, changes jobs, and eventually must die. Most identity failures happen at the transitions, especially the last one. This lesson follows the lifecycle and then the protocols that let one identity work everywhere.

## The lifecycle
\`\`\`
Identity proofing    verify the person is who they claim BEFORE issuing anything
Provisioning         create the account, grant the role's access
Permission changes   adjust when the job changes; remove what is no longer needed
Attestation          periodically confirm the access is still appropriate
Deprovisioning       remove all access when the person leaves
\`\`\`

The classic failure is deprovisioning. Someone leaves, HR knows, IT never hears, and the account stays active for months; attackers and former employees both know this. The fix is automation: the HR system's termination record triggers account disablement the same hour. The second failure is accumulation: a person changes roles three times and keeps every permission from every role. Attestation, where managers review and confirm their reports' access on a schedule, catches it.

**Permission assignments** should be by role, not by individual favor. "Give Maria what Tom has" is how accumulation starts.

## Identity proofing
Strong authentication on a weak identity is pointless. Before a credential is issued, prove the person: government ID checked in person or through a verified remote process, knowledge that only they would have, or vouching by a trusted party. This also applies to password resets; the help desk that resets a password for anyone who calls has an identity proofing problem.

## Federation
Two organizations trust each other's identities. A partner's employees log in with their own company credentials and reach your application; you never see their passwords and never manage their accounts. Their organization is the **identity provider**; your application is the **service provider** that trusts a signed assertion from it.

## The single sign-on protocols
\`\`\`
SAML             XML-based; identity provider issues a signed assertion the application trusts
                 enterprise web SSO to SaaS applications
OAuth            delegated AUTHORIZATION: lets an application access your data on another service
                 with limited scope, without your password ("allow this app to read your calendar")
OpenID Connect   AUTHENTICATION built on top of OAuth; the "sign in with" buttons
LDAP             the directory protocol: applications look up users, groups, and attributes; LDAPS encrypts it
Kerberos         ticket-based authentication inside Windows domains; a ticket-granting server issues tickets;
                 depends on clocks being within five minutes
\`\`\`

The pair that gets confused: OAuth is about permission to act on someone's behalf; OpenID Connect is about proving who someone is. OAuth alone does not authenticate.

## Interoperability and attestation
**Interoperability** is why these standards exist: an identity provider and a service provider from different vendors can work together only if both speak SAML or OpenID Connect. **Attestation** is the periodic confirmation that access is still right, usually a manager approving or revoking each of their reports' entitlements every quarter.

## Worked scenarios
\`\`\`
"Contractors from a partner reach our portal with their own credentials"     federation
"A scheduling app can add events to a user's calendar without the password"  OAuth
"Users sign in to the SaaS tool with the corporate directory account"        SAML SSO
"The application needs to look up group membership"                          LDAP (LDAPS)
"Managers review their team's access every quarter"                          attestation
"A terminated employee's VPN account still works"                             deprovisioning failure
\`\`\`

## What to memorize
- Proof, provision, adjust, attest, deprovision. Automate deprovisioning from HR.
- Federation: identity provider issues, service provider trusts.
- SAML enterprise web SSO, OAuth delegated authorization, OpenID Connect authentication, LDAP directory, Kerberos tickets.`,

u12l2: `## Deciding what an identity may do
Authentication proves who you are. Authorization decides what you can touch. The exam describes a decision-making style and wants its name, then tests whether you can count authentication factors correctly.

## The access control models
\`\`\`
Model                    Who decides                      Recognize it by
Mandatory (MAC)          the system, by labels            "clearance," "classification labels," "users cannot change"
Discretionary (DAC)      the resource's owner             "the owner grants access," file and folder permissions
Role-based (RBAC)        roles assigned to users          "everyone in the role gets the same access," job titles
Rule-based               fixed rules for everyone         firewall access lists, "no access after hours"
Attribute-based (ABAC)   attributes in combination        "department AND device compliance AND location"
Time-of-day              the clock                        access only during set hours
Least privilege          the principle under all of them  only what the job requires
\`\`\`

Two distinctions that decide questions:
- **MAC versus DAC**: under MAC, a user with secret clearance cannot share a secret document with an unclassified colleague, even though they created it; the system forbids it. Under DAC, the creator can share with anyone. MAC is military; DAC is every desktop operating system.
- **RBAC versus ABAC**: RBAC asks one question: what is your role? ABAC asks several: what is your role, where are you, what device is this, what time is it, how sensitive is the data? ABAC is how zero trust policies are written, because context is exactly what zero trust cares about.

Rule-based is the odd one: the rules are the same for everyone regardless of identity. A firewall does not care who you are, only where the packet is from and going.

## Counting factors
\`\`\`
Something you know    password, PIN, security question
Something you have    hardware token, authenticator app, smart card, security key, phone receiving a code
Something you are     fingerprint, face, iris, voice
Somewhere you are     GPS location, network location
\`\`\`

Multifactor means at least two **different categories**. The trap questions:
- Password + PIN: both "know." One factor, twice.
- Password + security question: one factor.
- Password + code from an app: know + have. Two factors.
- Fingerprint + smart card: are + have. Two factors.
- Password + fingerprint + location: three factors.

## Implementations and their trade-offs
\`\`\`
Biometrics      measured by false acceptance rate (impostor let in) and false rejection rate (real user denied);
                tightening one loosens the other; cannot be changed if compromised
Hard token      a physical device generating or holding the credential; can be lost, cannot be phished remotely
Soft token      an app generating time-based codes; convenient; a compromised phone is a risk
Security key    hardware using public key cryptography that answers only the genuine site;
                the strongest defense against phishing because a fake site gets no valid response
\`\`\`

## Worked scenarios
\`\`\`
"Documents carry labels and users cannot grant access below their level"     MAC
"The project lead shares the folder with two colleagues"                     DAC
"New nurses automatically receive the nurse permission set"                  RBAC
"Access requires a managed device, in-country location, and the right role"  ABAC
"Contractors can log in only 8 a.m. to 6 p.m."                               time-of-day (rule-based)
"Password plus a six-digit code from an app"                                 two factors
"Password plus mother's maiden name"                                         one factor
\`\`\`

## What to memorize
- MAC labels, DAC owner, RBAC roles, rule-based fixed rules, ABAC attributes, time-of-day, least privilege underneath.
- Factors by category: know, have, are, somewhere. Same category twice is one factor.
- Biometrics trade false acceptance against false rejection; security keys resist phishing.`,

u12l3: `## Passwords that survive, and admins that do not linger
Two subjects: what a modern password policy looks like (it is not what most people think), and how privileged accounts are handled so their theft is not catastrophic.

## What actually makes a password strong
An attacker cracking stolen hashes can try billions of guesses per second. What defeats that is not a symbol and a capital letter; it is length.
\`\`\`
8 characters, complex     cracked in hours to days
16-character passphrase   effectively uncrackable by brute force
\`\`\`

The modern policy, in order of importance:
\`\`\`
Length          the dominant setting; long passphrases beat short complex strings
Complexity      helpful, but forced rules produce predictable patterns (P@ssw0rd1!)
Reuse           block the same password across systems and block returning to old ones
Expiration      forced periodic changes are now discouraged; change on evidence of compromise
Age             a minimum age prevents cycling through changes to get back to a favorite
Breached lists  reject any password that appears in known breach dumps
\`\`\`

Why expiration fell out of favor: when forced to change monthly, people increment a digit. The new password is predictable from the old one, and the policy trained them to write it down. Change passwords when there is reason to believe they are compromised, not on a calendar.

## Password managers
A manager generates a unique random password for every site and stores them encrypted behind one strong master credential plus MFA. It solves reuse and length at once, and it has a hidden benefit against phishing: it fills credentials only on the domain they were saved for, so a look-alike site gets nothing.

## Passwordless
Remove the password entirely: authenticate with a security key, a platform biometric that unlocks a device-bound key, or a certificate. Nothing to guess, spray, phish, or reuse. When the question asks for the strongest option and passwordless is offered, it wins.

## Privileged access management
Administrator accounts get their own discipline, because one stolen admin credential is the whole network.
\`\`\`
Just-in-time permissions   admin rights granted only when requested, for a limited window, then removed
                           automatically; no standing admin access exists to steal
Password vaulting          privileged credentials live in a vault; an admin checks one out for a session;
                           the vault rotates it afterward; nobody knows the root password
Ephemeral credentials      short-lived credentials created for one task or session that expire on their own
\`\`\`

The theme: privilege should exist only while it is being used. An attacker who lands on an administrator's workstation at 2 a.m. finds no admin rights and no stored admin password.

## Worked scenarios
\`\`\`
"Users write passwords on sticky notes because of monthly changes"   drop forced expiration; require length; check breached lists
"Fifty employees share the root password for the database"           vault it, check out per session, rotate
"Administrators have permanent domain admin rights"                  just-in-time elevation
"Eliminate credential phishing for executives"                       passwordless with security keys
"Users reuse one password everywhere"                                password manager, reuse blocking
\`\`\`

## How the exam asks it
- "Which password attribute most increases resistance to brute force?" Length.
- "Which practice reduces the risk of a stolen administrative credential?" Just-in-time permissions or vaulting.
- "Which credential type expires automatically after a task?" Ephemeral.

## What to memorize
- Length over complexity; block reuse and breached passwords; expire on compromise, not on a schedule.
- Managers give uniqueness; passwordless removes the target.
- Privileged: just-in-time, vaulted and rotated, ephemeral.`,

u12l4: `## Doing security at machine speed
A security team of five cannot manually create accounts for two hundred hires, check every deployment for public storage, copy every alert into a ticket, and disable a compromised account within a minute of the alert. Automation performs repeatable tasks without a person. Orchestration chains tools together so one event drives a whole workflow. The exam tests the use cases, the benefits, and the risks by name.

## Use cases, with what "manual" looks like
\`\`\`
User provisioning          HR record created -> account, mailbox, and role permissions appear; termination -> all removed
Resource provisioning      a server or cloud environment built from a template with security settings included
Guard rails                a deployment that violates policy (public bucket, open port) is blocked automatically
Security groups            cloud firewall rules applied by tag or role rather than by hand
Ticket creation            an alert becomes a ticket with the evidence attached, no copy-paste
Escalation                 unacknowledged tickets move up the chain on a timer
Enabling / disabling       a compromised account is disabled the moment the alert fires; access is granted for a window
services and access
Continuous integration     every code change is built and tested, including security scans, before it can ship
and testing
Integrations and APIs      the plumbing between tools that makes all of the above possible
\`\`\`

## A workflow, end to end
\`\`\`
SIEM detects impossible travel on an account
  -> orchestration platform receives the alert through an API
  -> queries the identity system: is the account privileged? (yes)
  -> disables the account and revokes sessions
  -> isolates the user's endpoint through EDR
  -> creates a ticket with all the evidence, assigns it to the on-call analyst
  -> if not acknowledged in 15 minutes, escalates to the team lead
Total elapsed time: seconds. Manual version: an hour, if someone is watching.
\`\`\`

## Benefits, as the exam lists them
\`\`\`
Efficiency and time saving             routine work happens without people
Enforcing baselines                    the same configuration every time, no forgotten steps
Standard infrastructure configurations fewer unique systems to secure
Scaling in a secure manner             growth does not need proportional headcount
Employee retention                     analysts do investigation instead of copy-paste
Reaction time                          containment in seconds instead of hours
Workforce multiplier                   a small team accomplishes what a larger one would
\`\`\`

## The other side
\`\`\`
Complexity              automated systems are harder to understand, test, and debug; a wrong rule acts at scale
Cost                    platforms, integration work, and people with the skills to build and maintain it
Single point of failure if the orchestration platform is down, every process that depends on it stops
Technical debt          scripts written quickly and never revisited become fragile and undocumented
Ongoing supportability  APIs change, tools are replaced, and someone must keep the automation working
\`\`\`

The exam expects you to name these five when asked about the drawbacks or considerations of automation. The single point of failure one is the favorite: centralizing response in one platform means that platform must itself be resilient and protected.

## Worked scenarios
\`\`\`
"New servers keep missing the logging agent"                       automated resource provisioning from a baseline
"Analysts spend two hours a day copying alerts into tickets"       orchestration: automatic ticket creation
"Departed employees keep accounts for weeks"                       automated deprovisioning from HR
"A developer accidentally deployed a public storage bucket"        guard rails that block the deployment
"When the automation server crashed, no alerts were processed"     single point of failure; make it redundant
"Nobody understands the script that rotates the keys"              technical debt and supportability
\`\`\`

## What to memorize
- Use cases: provisioning (users and resources), guard rails, security groups, tickets, escalation, enable/disable, CI and testing, integrations and APIs.
- Benefits: efficiency, baselines, standard configs, secure scaling, retention, reaction time, workforce multiplier.
- Considerations: complexity, cost, single point of failure, technical debt, ongoing supportability.`,

u13l1: `## When it goes wrong, in order
An incident is any event that harms or threatens confidentiality, integrity, or availability: a breach, an outage caused by malware, a lost laptop with unencrypted data. Incident response is the rehearsed sequence for dealing with it. The exam tests the order relentlessly and asks "what is the next step" from any point.

## The seven steps
\`\`\`
1. Preparation      the plan, the team, contacts, tools, communication templates, training, and the logging
                    that will make everything else possible. Happens BEFORE any incident.
2. Detection        something is noticed: an alert, a user report, a call from a partner or law enforcement.
3. Analysis         is it real? what is affected? how bad? The incident is declared and classified.
4. Containment      stop the spread: isolate hosts, disable accounts, block addresses, pull the network cable.
                    Short-term containment first, then a stable state.
5. Eradication      remove the cause: malware, attacker accounts, persistence mechanisms, the exploited flaw.
6. Recovery         restore systems from clean sources, return to normal operation, watch closely for return.
7. Lessons learned  the post-incident review: what happened, what worked, what did not, what to change.
                    Documented, and fed back into preparation.
\`\`\`

## A worked incident
A user reports that files on the shared drive have strange extensions.
1. Preparation already exists: there is a ransomware playbook, an on-call rotation, and offline backups.
2. Detection: the report, and an EDR alert on the user's workstation confirming encryption behavior.
3. Analysis: the workstation is the source; three file shares are affected; no evidence of exfiltration yet; severity high.
4. Containment: the workstation is isolated through EDR; the affected shares are taken offline; the user's account is disabled.
5. Eradication: the workstation is wiped; the phishing email that delivered the payload is purged from every mailbox; the credentials are reset.
6. Recovery: the shares are restored from last night's offline backup; the user gets a rebuilt machine; monitoring watches for re-encryption.
7. Lessons learned: the attachment type should have been blocked at the gateway; MFA would have limited the account; the backup restore took longer than the RTO, so the process is revised.

## The "what is next" traps
\`\`\`
Incident confirmed and scoped           -> containment (never eradication first)
Malware removed, flaw patched           -> recovery
Systems restored and stable             -> lessons learned
Alert received                          -> analysis (confirm before containing)
\`\`\`
The most tested transition is analysis to containment: once you know it is real, stop the bleeding before you clean up.

## Practicing
- **Training**: everyone knows their role before the day comes.
- **Tabletop exercise**: a scenario discussed around a table; cheap; finds gaps in the plan.
- **Simulation**: a realistic drill with tools and time pressure; tests execution and communication.

## Root cause analysis
Ask "why" until you reach the condition that made the incident possible. The user clicked a link (why?) because the email looked legitimate (why did that lead to a breach?) because the account had no MFA and could reach every share (root cause). Fixing the click is training; fixing the root cause is MFA and least privilege, and it prevents the next hundred clicks from mattering.

## Threat hunting
Instead of waiting for alerts, analysts form a hypothesis ("if an attacker used this technique reported in the news, we would see these process names and these connections") and search the data for it. Hunting assumes the attacker is already inside and finds what detection missed.

## What to memorize
- Preparation, detection, analysis, containment, eradication, recovery, lessons learned.
- After analysis confirms an incident, contain. After recovery, learn.
- Tabletop talks, simulation drills. Root cause is why it was possible. Hunting searches without an alert.`,

u13l2: `## Evidence that holds up
An incident that ends in court, an insurance claim, or a termination is judged on the evidence and on how it was handled. Mishandled evidence is worthless no matter what it shows. Digital forensics is the discipline of collecting and preserving it correctly.

## Legal hold
The moment litigation or an investigation is reasonably anticipated, the organization must preserve everything relevant. A legal hold notice goes to the people and systems involved: stop deleting, stop the retention purges, do not reimage that laptop, do not "clean up" the mailbox. The hold stays until counsel releases it. Destroying data under a hold, even by routine policy, can be treated as destroying evidence.

## Chain of custody
A continuous record of the evidence's life:
\`\`\`
Item: laptop, serial 7F2K, seized from desk 4B
2026-03-04 09:12  collected by A. Reyes, bagged and sealed, seal 00417
2026-03-04 09:40  transferred to evidence locker by A. Reyes, received by M. Chen
2026-03-05 13:05  checked out by M. Chen for imaging, returned 15:30, seal intact
\`\`\`
Every handoff, every person, every time, every action. A gap of an hour with no record is an hour in which the other side will argue the evidence was altered.

## Acquisition
Collect without changing.
\`\`\`
Image        make a bit-for-bit copy of the storage using a write blocker so the original cannot be modified
Hash         compute a hash of the original and of the image; matching hashes prove the copy is exact
Work on the copy   analysis happens on the image; the original goes back into the locker
\`\`\`

And collect in **order of volatility**, most fleeting first, because turning off the machine destroys the top of the list:
\`\`\`
1. CPU registers and cache      gone in nanoseconds
2. Memory (RAM)                 gone at power off; holds running malware, keys, open connections
3. Swap and temporary files     overwritten quickly
4. Disk                         persistent, but changes as the system runs
5. Remote logs and monitoring   on other systems, subject to their retention
6. Archives and backups         stable
\`\`\`
The exam scenario: a compromised server is still running. Capture memory before anything else; pulling the plug loses it.

## Preservation
Keep evidence unaltered and demonstrably so: write blockers during imaging, sealed and tamper-evident storage, restricted access, hashes verified at every checkpoint.

## Reporting
The forensic report explains what was collected, how, what was found, and what it means, in language a lawyer, an executive, or a jury can follow, with the technical detail in appendices. Conclusions must be supported by the evidence and the methods must be repeatable.

## E-discovery
The legal process of identifying, preserving, collecting, reviewing, and producing electronically stored information for a case. Legal hold is its first step; chain of custody and sound acquisition are what make the produced evidence admissible.

## Worked scenarios
\`\`\`
"HR anticipates a lawsuit over a termination"                          issue a legal hold on the relevant mailboxes and files
"Prove the drive image is identical to the original"                    matching hashes
"A server suspected of compromise is still powered on"                  capture memory first
"An analyst examined the suspect's laptop directly"                     error; should have imaged it and worked on the copy
"Evidence was left unattended on a desk for an afternoon"               chain of custody broken
\`\`\`

## What to memorize
- Legal hold preserves; chain of custody proves handling; acquire by imaging and hashing; work on the copy.
- Order of volatility: registers, memory, swap, disk, remote logs, backups.
- Report for non-technical readers; e-discovery produces it for legal proceedings.`,

u13l3: `## Where the answers are
Every investigation is a series of questions, and each question has a data source that answers it. The exam names the sources and asks which one answers a given question. Learn each source by the question it answers.

## Log sources
\`\`\`
Source              Answers                                                    Example
Firewall logs       which connections were allowed or denied, when, to where   "did the workstation reach 203.0.113.9 on port 443?"
Application logs    who did what inside the application                        "which account approved the transfer?"
Endpoint logs       what processes ran, files changed, detections fired         "what executed after the attachment was opened?"
OS security logs    logons, privilege use, policy changes                       "when was the admin account used, from which host?"
IPS/IDS logs        which attack signatures matched                             "was an exploit attempted against the web server?"
Network logs        DHCP leases, DNS queries, proxy requests, switch events     "which device had that IP at 2 p.m.; what names did it resolve?"
Metadata            data about data: email headers, file authorship, timestamps "where did this email really originate; when was the document created?"
\`\`\`

Metadata deserves attention. An email's displayed sender is easily forged, but the headers record every server the message passed through. A document's properties record the author and the software that created it. Metadata is often the evidence that unmasks impersonation.

## Other sources
\`\`\`
Vulnerability scans   what weaknesses existed on the affected system, suggesting how it was compromised
Automated reports     scheduled summaries showing trends and anomalies over time
Dashboards            real-time views of posture and activity for immediate situational awareness
Packet captures       every byte of the traffic; reconstruct exactly what was sent; expensive to store,
                      so captured selectively or on demand
\`\`\`

## Following an incident across sources
\`\`\`
1. DLP alert: a user uploaded a large archive to a personal cloud account          (DLP / application)
2. Application log: the user exported the entire customer table an hour earlier    (application log)
3. Endpoint log: a compression tool ran, creating the archive                     (endpoint log)
4. OS security log: the user's account logged in from a workstation they never use (OS log)
5. Firewall log: the upload connection, its size and time                          (firewall log)
6. Packet capture: the archive's contents, confirming customer data                (packet capture)
7. Vulnerability scan: that workstation was missing a patch used to steal tokens   (scan)
\`\`\`

Two things make this chain readable. **Time synchronization**: every source must agree on the time, or events cannot be ordered. **Central collection**: the logs must be somewhere the analyst can query them together, which is the SIEM.

## Worked scenarios
\`\`\`
"Which internal host held 10.4.7.21 at 14:00?"                   DHCP or network logs
"Did malware execute on the finance laptop?"                     endpoint logs
"Was the login to the domain controller interactive or remote?"  OS security logs
"What exactly was in the data sent to the external address?"     packet capture
"Did the email really come from the CEO's mail server?"          email header metadata
"Show current security posture at a glance for the executives"   dashboard
\`\`\`

## What to memorize
- Firewall connections, application actions, endpoint processes, OS logons, IDS/IPS signatures, network addresses and names, metadata for origin and history.
- Scans show what was exploitable; reports and dashboards show trends and status; packet captures show the exact content.
- Synchronized time and central collection make correlation possible.`,

u14l1: `## Four kinds of paper
Governance runs on documents, and the exam insists you know which kind is which. The distinction is about how binding each one is and how specific.

\`\`\`
              Binding?      Specificity      Answers the question       Example
Policy        mandatory     high level       what must be done, why    "remote access requires MFA"
Standard      mandatory     exact            how much, which setting   "passwords: 14 characters minimum; TLS 1.2+"
Procedure     mandatory     step by step     how, in order             "steps to onboard a new employee"
Guideline     recommended   flexible         what is advised           "consider a password manager"
\`\`\`

A picture: the policy is the law, the standard is the building code with the numbers in it, the procedure is the contractor's checklist, and the guideline is the advice column. Only the guideline is optional.

## Policies the exam names
\`\`\`
Acceptable use            what users may and may not do with company systems and data
Information security      the overall commitment, scope, and responsibilities for security
Business continuity       keeping essential operations running through disruption
Disaster recovery         restoring systems and data after a disaster
Incident response         authority, roles, and the requirement to follow the response plan
Software development      security built into requirements, design, coding, testing, and release
lifecycle
Change management         no change to production without the process
\`\`\`

## Standards the exam names
Password standards (length, reuse, lockout), access control standards (approval, review cadence, least privilege), physical security standards (badges, visitor handling, camera retention), encryption standards (approved algorithms, key lengths, where encryption is required). Each takes a policy sentence and makes it measurable.

## Procedures the exam names
- Change management procedures: the request form, the review, the window, the rollback.
- Onboarding and offboarding procedures: accounts created and removed, equipment issued and recovered, training completed.
- **Playbooks**: step-by-step responses to specific incident types: phishing report, ransomware, lost device. A playbook is a procedure written for a bad day, so nobody has to think from scratch under pressure.

## Telling them apart in a question
\`\`\`
"Users must not connect personal devices to the corporate network"      policy (acceptable use)
"All laptops must use AES-256 full-disk encryption"                     standard (encryption)
"1. Disable the account. 2. Forward the mailbox. 3. Collect the badge"  procedure (offboarding)
"Employees are encouraged to lock screens when stepping away"           guideline (encouraged, not required)
"The checklist analysts follow when a user reports phishing"            playbook
\`\`\`

The tells: "must" with no numbers is policy; "must" with numbers or named settings is standard; numbered steps is procedure; "should," "recommended," or "encouraged" is guideline.

## Why the distinction matters
Auditors check policies for existence and approval, standards for measurability, procedures for whether people actually follow them, and guidelines hardly at all. Writing a standard where a policy belongs (numbers that change every year in a document the board must approve) or a guideline where a standard belongs (an optional encryption suggestion) is a governance failure the exam can describe.

## What to memorize
- Policy: what and why, mandatory. Standard: exact requirement, mandatory. Procedure: the steps, mandatory. Guideline: recommended.
- Named policies: acceptable use, information security, continuity, disaster recovery, incident response, SDLC, change management.
- Playbooks are incident procedures.`,

u14l2: `## Governance in context
No organization writes its security rules in isolation. Outside authorities impose requirements, an internal structure decides and oversees, and specific people are accountable for specific data. The exam tests the vocabulary of each.

## External considerations
\`\`\`
Regulatory   rules from government agencies that oversee an industry    financial, healthcare, energy regulators
Legal        laws on data protection, breach notification, liability    privacy laws, breach notice deadlines
Industry     standards the industry imposes on itself                   payment card rules from the card brands
Local        city or county requirements
Regional     state or province requirements
National     country-wide laws
Global       requirements that follow data or business across borders   a privacy law that applies to any company
                                                                        handling its residents' data, anywhere
\`\`\`

The layering is the point. A hospital chain operating in three countries answers to national health regulators in each, to privacy laws that follow their patients' data, to payment card rules for its billing, and to local fire codes for its data centers. Governance maps all of them to controls.

**Monitoring and revision**: laws change, threats change, the business changes. Documents carry a review date and an owner; an unreviewed five-year-old policy is an audit finding in itself.

## Governance structures
\`\`\`
Boards               the board of directors holds ultimate accountability for risk, including cyber risk;
                     receives regular risk reports
Committees           a security or risk committee of executives sets priorities, approves policy, reviews status
Government entities  regulators and agencies that impose and enforce requirements from outside
Centralized          one security function sets and enforces policy everywhere: consistent, auditable,
                     slower to adapt to local needs
Decentralized        each business unit governs its own with central coordination: responsive to local needs,
                     harder to keep consistent
\`\`\`

## Data roles
Four roles, two from general security practice and two from privacy law, that the exam mixes together.
\`\`\`
Owner        accountable for a set of data: its classification, who may access it, how it is protected
             usually a senior manager in the business, not IT
Custodian    handles the data day to day on the owner's behalf: backups, access changes, storage, quality
(steward)    usually IT or a data team
Controller   privacy law: the party that decides WHY and HOW personal data is processed
Processor    privacy law: the party that processes personal data ON BEHALF OF the controller,
             following its instructions; a payroll provider, a cloud email service
\`\`\`

The pairs: owner decides and custodian does, within one organization. Controller decides and processor does, between organizations. A company that collects customer data is the controller; the analytics firm it hires to process it is the processor; inside the company, the marketing director is the owner of the customer list and the database team is its custodian.

## Worked scenarios
\`\`\`
"Card brand requirements for merchants"                                 industry
"A law requiring breach notification within 72 hours"                   legal / regulatory
"The finance director decides who may access the ledger"                data owner
"The database administrators run the backups and grant approved access" custodian
"A cloud HR service processes employee data under the company's terms"  company is controller, service is processor
"Each division runs its own security program with central guidelines"   decentralized governance
\`\`\`

## What to memorize
- External: regulatory (agencies), legal (laws), industry (self-imposed), and the ladder local, regional, national, global.
- Boards accountable, committees direct, government entities enforce; centralized consistent, decentralized responsive.
- Owner accountable, custodian handles, controller decides, processor acts on instructions.`,

u14l3: `## Putting numbers on danger
Risk management decides where the security budget goes. Some of that is judgment, some is arithmetic, and the exam tests both: the vocabulary of assessment and the formulas of quantitative analysis.

## Risk, defined
A risk is a threat exploiting a vulnerability to harm an asset. Risk identification is the inventory of all three: what we have, what could happen to it, and what weakness would let it. Without the inventory, assessment has nothing to assess.

## Assessment types
\`\`\`
Ad hoc       when a specific need arises: a new project, a new vendor, a new law
Recurring    on a schedule, such as annually or quarterly
One-time     once, for a specific event: an acquisition, a migration
Continuous   ongoing, fed by monitoring and automated tooling; risk posture updated as things change
\`\`\`

## Qualitative analysis
Rate likelihood and impact on a scale (low, medium, high, or 1 to 5) and plot them.
\`\`\`
                 Impact: low     medium    high
Likelihood high  medium          high      critical
Likelihood med   low             medium    high
Likelihood low   low             low       medium
\`\`\`
Fast, needs no financial data, good for ranking dozens of risks. Its weakness is that "high" means different things to different people.

## Quantitative analysis: the five terms and two formulas
\`\`\`
AV    asset value                       what the asset is worth
EF    exposure factor                   the fraction of value lost in ONE incident (0 to 1)
SLE   single loss expectancy            the cost of ONE incident          SLE = AV x EF
ARO   annualized rate of occurrence     how many times per YEAR           (once in 4 years = 0.25)
ALE   annualized loss expectancy        the expected cost per YEAR        ALE = SLE x ARO
\`\`\`

**Probability** and **likelihood** feed the ARO; **impact** feeds the EF and AV.

## Worked examples
\`\`\`
A data center server room worth 200,000 would lose 40% of its value in a flood.
SLE = 200,000 x 0.40 = 80,000
Floods happen about once every 20 years: ARO = 1/20 = 0.05
ALE = 80,000 x 0.05 = 4,000 per year
A flood barrier costing 3,000 per year is justified; one costing 10,000 per year is not.
\`\`\`
\`\`\`
A laptop fleet worth 500,000; a single theft incident loses 2% of the fleet's value (EF 0.02).
SLE = 500,000 x 0.02 = 10,000
Thefts occur 3 times a year: ARO = 3
ALE = 10,000 x 3 = 30,000 per year
Full-disk encryption reduces the EF to nearly zero for data; the ALE for data loss drops toward zero,
which is the value of the control.
\`\`\`

The exam also runs the formulas backward: given ALE and ARO, find SLE (ALE / ARO). Given SLE and AV, find EF (SLE / AV).

## Using the result
ALE is the ceiling on what a control is worth per year. Compute ALE before the control, ALE after, and subtract the control's annual cost. Positive means the control pays for itself. This is how a security team justifies spending in the language of finance.

## Common traps
- ARO is per year. "Once every five years" is 0.2, not 5.
- EF is a fraction of the asset's value, not a dollar amount.
- SLE is one incident; ALE is a year's worth.

## What to memorize
- Identify assets, threats, vulnerabilities. Assess ad hoc, recurring, one-time, continuous.
- Qualitative rates; quantitative computes.
- SLE = AV x EF. ALE = SLE x ARO. ARO is per year.`,

u14l4: `## Deciding what to do about it
Analysis produces a ranked list of risks with numbers or ratings. This lesson is what happens next: recording them, comparing them to what the organization will tolerate, choosing a strategy, and using business impact analysis to set recovery targets.

## The risk register
The register is the organization's single list of risks, each with:
\`\`\`
Description            the threat, vulnerability, and asset
Key risk indicators    measurable early warnings: number of unpatched critical systems, days since last backup test,
                       phishing click rate
Risk owner             the person accountable for managing the risk (not the security team by default)
Risk threshold         the level at which action is mandatory
Current treatment      what is being done, and status
\`\`\`
A key risk indicator is the difference between a register that is reviewed and one that is filed. If the indicator crosses the threshold, the owner must act.

## Appetite and tolerance
\`\`\`
Risk appetite    the amount of risk the organization is willing to take in pursuit of its goals
                 expansionary: takes on more risk for growth (a startup)
                 conservative: takes on little (a bank, a hospital)
                 neutral: balanced
Risk tolerance   the acceptable variation around the appetite for a specific risk; the practical limit
                 "we accept up to four hours of downtime a year for this service"
\`\`\`
Appetite is the philosophy; tolerance is the number. A conservative appetite produces low tolerances.

## The four strategies
\`\`\`
Transfer   shift the financial impact to another party: insurance, contract terms, outsourcing
           accountability stays with you
Accept     acknowledge the risk and take no further action because treatment costs more than the loss
           exemption: the risk is formally excluded from a requirement
           exception: a documented, approved deviation for a stated period, with an owner and a review date
Avoid      eliminate the risk by not doing the activity: do not launch the feature, do not collect the data
Mitigate   reduce likelihood or impact with controls; the most common strategy
\`\`\`

Deciding among them: compare the ALE to the cost of treatment. If a control costs less than the ALE it removes, mitigate. If insurance is cheaper than the control, transfer. If nothing is cheaper than the loss, accept and document. If the activity is not worth its risk at all, avoid.

## Risk reporting
Management and the board cannot govern what they do not see. Regular risk reports show the top risks, trends in the key indicators, the status of treatments, and exceptions in force. The board's accountability for cyber risk depends on these reports.

## Business impact analysis
The BIA asks the business, not IT, which functions matter most and how long they can be down. Its outputs are the numbers every recovery plan is built on.
\`\`\`
RTO    recovery time objective       maximum acceptable time to restore the function after disruption
RPO    recovery point objective      maximum acceptable data loss, measured as time since the last good copy
MTTR   mean time to repair           average time to fix a failed component; measures repair capability
MTBF   mean time between failures    average operating time between failures; measures reliability
\`\`\`

\`\`\`
"Order processing must be back within 4 hours"         RTO = 4 hours -> hot or warm site, not cold
"We can lose at most 15 minutes of transactions"       RPO = 15 minutes -> replication, not nightly backups
"The storage array averages 50,000 hours between failures"   MTBF, used to plan spares and replacement
"Disk failures take 6 hours on average to resolve"     MTTR, compared against the RTO
\`\`\`

The BIA also identifies dependencies: order processing needs the database, the network, and the payment gateway, so each of those inherits the four-hour RTO.

## Worked scenarios
\`\`\`
"Purchase cyber insurance for breach costs"                         transfer
"Discontinue the feature that stored biometric data"                avoid
"Deploy MFA to cut account takeover"                                mitigate
"The risk falls below the threshold; document and move on"          accept
"The vulnerable system stays for six months with added monitoring"  accept via a documented exception
"A startup takes more security risk to ship faster"                 expansionary appetite
\`\`\`

## What to memorize
- Register: indicators, owners, thresholds. Appetite: expansionary, conservative, neutral. Tolerance: the practical limit.
- Transfer, accept (exemption, exception), avoid, mitigate. Transfer keeps accountability.
- RTO time to restore, RPO data you can lose, MTTR repair speed, MTBF reliability.`,

u15l1: `## Someone else's security is your security
A vendor with a login to your systems, a supplier whose code runs in your product, a provider that hosts your data: each one's weaknesses are yours. Third-party risk management is how you check them before, bind them by contract, and keep watching.

## Assessing a vendor
\`\`\`
Penetration testing         test their product or environment, or require evidence of their own tests
Right-to-audit clause       a contract term allowing you to inspect their controls yourself
Evidence of internal audits their own audit results, showing they check themselves
Independent assessments     reports from outside auditors against recognized standards; the most objective evidence
Supply chain analysis       who are THEIR suppliers? their risk flows to them, then to you
\`\`\`

The gradient of trust: a vendor's own claims are weakest, their internal audit results are better, an independent third-party assessment is strong, and your own audit under a right-to-audit clause is strongest. Questions that ask for the most reliable evidence want independent assessment or your own audit.

## Selecting a vendor
- **Due diligence**: investigating before signing: security posture, financial stability, reputation, incident history, regulatory standing. Skipping it is how organizations discover after the breach that the vendor had no security program.
- **Conflict of interest**: the people choosing must have no personal stake: no ownership in the vendor, no gifts, no family ties. A conflicted selection is a governance failure even if the vendor is fine.

## The agreements
\`\`\`
SLA    service level agreement          measurable commitments (uptime, response time) and remedies for missing them
MOA    memorandum of agreement          a formal agreement of roles and intent between parties
MOU    memorandum of understanding      a statement of intent; generally less formal and less binding than an MOA
MSA    master service agreement         the umbrella contract for the whole relationship: terms, liability, security
WO/SOW work order / statement of work   one specific job under the MSA: deliverables, timeline, price
NDA    non-disclosure agreement         confidentiality obligations, one-way or mutual
BPA    business partnership agreement   how partners share responsibilities, profits, decisions, and exit terms
\`\`\`

The structure: sign one MSA, then a SOW for each project. The SLA can be part of the MSA or separate. The NDA often comes first, before anything sensitive is discussed. The MOU is what you sign when you are not yet ready to sign anything binding.

## During the relationship
\`\`\`
Vendor monitoring      ongoing review: performance against the SLA, security incidents, compliance changes, financial health
Questionnaires         standardized security questionnaires at onboarding and periodically; answers are claims, verify the important ones
Rules of engagement    for any testing involving the vendor: scope, methods, timing, contacts, limits; agreed in writing beforehand
\`\`\`

## Worked scenarios
\`\`\`
"Guarantee 99.95% uptime with credits for missing it"                     SLA
"Define the deliverables and cost of this quarter's development work"     SOW under the MSA
"Allow us to examine the provider's controls on site"                     right-to-audit clause
"Two agencies agree to share threat information, non-binding"             MOU
"The vendor's own hosting provider was breached"                          supply chain analysis should have covered it
"The procurement lead's spouse works for the winning vendor"              conflict of interest
"Define what the penetration testers may and may not do to the vendor"    rules of engagement
\`\`\`

## What to memorize
- Assess: pen testing, right-to-audit, internal audit evidence, independent assessments, supply chain analysis. Select: due diligence, no conflicts of interest.
- SLA performance, MSA umbrella, SOW one job, NDA secrecy, BPA partnership, MOU intent, MOA formal agreement.
- Monitor continuously, question periodically, set rules of engagement for tests.`,

u15l2: `## Proving you follow the rules
Compliance is meeting the requirements that apply to you and being able to demonstrate it. Privacy is the compliance domain about personal data, and it comes with its own roles and rights. The exam tests both as vocabulary and consequences.

## Reporting
\`\`\`
Internal   to management and the board: where we stand, what is missing, what is being fixed
External   to regulators, auditors, customers, and partners: on their schedule, in their format,
           often with attestation by an officer
\`\`\`

## What non-compliance costs
\`\`\`
Fines                 monetary penalties from regulators, sometimes a percentage of revenue
Sanctions             restrictions imposed by regulators: no new customers, mandated oversight
Reputational damage   customers leave; partners hesitate; the breach becomes the brand
Loss of license       in regulated industries, the right to operate can be withdrawn
Contractual impacts   breached agreements, lost contracts, penalties owed to customers and partners
\`\`\`

## Monitoring compliance
\`\`\`
Due diligence      KNOWING: researching and understanding the requirements and the risks
Due care           DOING: taking the reasonable actions a prudent organization would take in response
Attestation        a formal statement that controls are in place, by management or an auditor
Acknowledgement    individuals confirm they have read a policy or completed training; signed and recorded
Internal / external   self-checks plus outside verification
Automation         tools that continuously compare configurations and controls to requirements and produce evidence
\`\`\`

Due diligence and due care together are the legal standard of acting responsibly. An organization that knew about a requirement (diligence) and did nothing (no care) is in a worse position than one that made a reasonable effort and still fell short.

## Privacy
\`\`\`
Legal implications   privacy laws exist at local, regional, national, and global levels and often conflict;
                     a global organization must map which laws govern which data
Data subject         the person the personal data is about; the holder of privacy rights
Controller           decides why and how personal data is processed; carries primary accountability
Processor            processes on the controller's behalf under its instructions; a payroll or cloud provider
Ownership            who inside the organization is responsible for the data
Data inventory       what personal data you hold, where, why, and under what legal basis
Data retention       keep it only as long as the purpose requires, then delete it
Right to be forgotten   a data subject's right, under some laws, to have their personal data erased on request
\`\`\`

The right to be forgotten is only possible with a data inventory. If you do not know everywhere the person's data is, you cannot delete it, and "we could not find all of it" is not a defense.

## Worked scenarios
\`\`\`
"A customer asks that all their personal data be erased"                    right to be forgotten
"Employees sign annually that they have read the acceptable use policy"     acknowledgement
"The company studied the new regulation and implemented the controls"       due diligence and due care
"A regulator fines the company for late breach notification"                consequence: fines
"The payroll provider processes employee data on the company's instructions" company is controller, provider is processor
"An officer signs a statement that controls operated effectively"           attestation
\`\`\`

## What to memorize
- Internal and external reporting. Consequences: fines, sanctions, reputation, license, contracts.
- Due diligence knows, due care does; attestation and acknowledgement; automate monitoring.
- Data subject, controller versus processor, inventory and retention, right to be forgotten.`,

u15l3: `## Checking the checkers
An audit asks "do the controls exist and operate as documented?" A penetration test asks "can an attacker get past them?" Both produce evidence, and the exam distinguishes who performs each and how much the testers are told.

## Attestation
A formal statement that controls are in place and effective, made by management (a self-attestation) or by an auditor after examination. Customers and regulators ask for attestation reports because they cannot audit every supplier themselves; the auditor's independence is what gives the report value.

## Internal audits and assessments
\`\`\`
Compliance        checking the organization's own adherence to its policies and applicable regulations
Audit committee   a board-level committee that oversees the audit function, receives results, and ensures findings are addressed
Self-assessments  a team evaluates its own controls against a checklist; cheap, frequent, useful for preparation,
                  but not objective and not accepted as independent evidence
\`\`\`

## External audits and assessments
\`\`\`
Regulatory                     performed or required by a regulator; findings can carry penalties
Examinations                   formal reviews by an authority; common in banking and finance
Assessment                     an outside party evaluates controls or risk and reports; may or may not be formal
Independent third-party audit  an auditor with no stake in the outcome, following a recognized standard;
                               produces the report others can rely on
\`\`\`

The gradient again: self-assessment is the weakest evidence, an independent third-party audit is the strongest. When a question asks what a customer or regulator will accept, the answer is independent.

## Penetration testing
\`\`\`
Physical      attempt to enter facilities, bypass locks and guards, reach equipment
Offensive     the red team attacks
Defensive     the blue team detects and responds
Integrated    purple teaming: red and blue work together, sharing findings in real time to improve detection
\`\`\`

How much the testers know:
\`\`\`
Known environment            full information: architecture, source code, credentials      deepest coverage, least realistic
Partially known environment  some information, such as a standard user account            balance
Unknown environment          nothing but the name                                          most realistic, least coverage
\`\`\`
Known finds the most flaws for the money because no time is spent discovering what you could have told them. Unknown shows what a real outsider could do. Partially known simulates an insider or a compromised user.

Reconnaissance:
\`\`\`
Passive   gathering without touching the target: public records, DNS, job postings, social media, leaked data
          undetectable by the target
Active    interacting with the target: port scans, probing services, banner grabbing
          detectable; appears in the target's logs
\`\`\`

## Worked scenarios
\`\`\`
"Testers were given diagrams, source code, and admin credentials"       known environment
"Testers received only the company's name and domain"                   unknown environment
"Testers were given one standard user account"                          partially known environment
"Red and blue teams shared results during the exercise"                 integrated (purple)
"Testers reviewed DNS records and employee LinkedIn profiles first"     passive reconnaissance
"Testers scanned the external address range"                            active reconnaissance
"A customer requires an outside auditor's report before signing"        independent third-party audit
"Teams complete a quarterly control checklist for their own systems"    self-assessment
\`\`\`

## What to memorize
- Attestation states controls work. Internal: compliance, audit committee, self-assessment. External: regulatory, examinations, assessment, independent audit.
- Pen tests: physical, offensive (red), defensive (blue), integrated (purple).
- Known, partially known, unknown environment. Passive reconnaissance does not touch the target; active does.`,

u15l4: `## The control that runs on people
Every technical control in this course can be undone by one person who clicks, holds a door, or reads a password over the phone. Security awareness is the program that turns people from the weakest link into a sensor network. The exam treats it as a structured program with named parts.

## Phishing: the centerpiece
\`\`\`
Campaigns       simulated phishing emails sent to staff; measures who clicks, who reports, who enters credentials
                clickers get immediate, short education; the goal is learning, not punishment
Recognizing     the signs: urgency, threats, mismatched sender addresses, unexpected attachments,
                links whose real destination differs from the text, requests to bypass process
Reporting       the single most valuable behavior: a reported phish lets the security team block it for everyone;
                a one-click report button raises reporting rates dramatically
\`\`\`

Why reporting beats not clicking: some people will always click. If the first person who receives the email reports it, the team can purge it from every other mailbox before most people see it. Metrics should track reporting rate, not just click rate.

## Anomalous behavior recognition
Teach people to notice, and report, three kinds of out-of-place behavior:
\`\`\`
Risky           actions that violate policy or common sense: disabling security software, sharing credentials,
                plugging in unknown devices
Unexpected      activity that does not fit a role or pattern: a receptionist in the engineering repository,
                a colleague copying large amounts of data before resigning
Unintentional   honest mistakes with security consequences: the email to the wrong recipient, the document
                left on the printer; fast reporting limits the damage
\`\`\`

## User guidance and training topics
\`\`\`
Policy and handbooks        where the rules are and how to find them
Situational awareness       notice surroundings: screens visible to strangers, conversations in public, unfamiliar people
Insider threat              what it looks like and how to report a concern without accusation
Password management         length, uniqueness, managers, never sharing, never reusing
Removable media and cables  unknown USB devices and even charging cables can carry malware
Social engineering          the techniques and the verification habits that defeat them
Operational security        not revealing sensitive details in public, on social media, or to unverified callers
Hybrid and remote work      home router security, screen locking, VPN on public Wi-Fi, protecting devices from
                            family members and visitors
\`\`\`

## Measuring the program
\`\`\`
Initial     a baseline when the program starts: phishing click and report rates, training completion,
            policy acknowledgement
Recurring   the same metrics on a schedule, showing improvement and revealing groups or topics that need more
\`\`\`

## Development and execution
Designing the program: who the audiences are (executives, developers, front desk, everyone), which topics each needs, how often, and by what methods (short modules, simulations, posters, briefings). Executing it consistently, with visible management support, and updating it as threats change. A once-a-year video is a checkbox; a program is continuous.

## Worked scenarios
\`\`\`
"Measure how many staff enter credentials on a simulated phishing page"   phishing campaign
"A user forwards a suspicious email to security within a minute"          reporting behavior; the program is working
"An employee notices a coworker photographing screens and reports it"     anomalous behavior recognition
"Remote staff are taught to change default router passwords"              hybrid and remote work guidance
"Click rate fell from 30% to 6% over a year"                              recurring measurement showing improvement
\`\`\`

## What to memorize
- Phishing campaigns teach recognition and, above all, reporting; educate, do not punish.
- Anomalous behavior: risky, unexpected, unintentional.
- Guidance topics: policy, situational awareness, insider threat, passwords, removable media, social engineering, operational security, remote work.
- Measure initially and recurrently; develop and execute as a continuous program.`

});
