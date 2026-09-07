// SecPlus Academy curriculum, units 11 to 15. Original teaching content for CompTIA Security+ SY0-701.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u11", n: 11, title: "Enterprise Security Capabilities", domain: 4,
  blurb: "The controls an enterprise turns on: firewall rules, intrusion detection, filtering, secure protocols, email security, and the endpoint and identity tools that watch everything.",
  assumes: "You know the appliances from Unit 7 and the monitoring tools from Unit 10.",
  lessons: [
    {
      id: "u11l1", title: "Firewalls, IDS/IPS, Web and DNS Filtering", domain: 4, obj: "4.5", minutes: 9,
      body: `Buying a firewall is not security; configuring it is. This lesson covers the settings and filters that enterprises actually manage day to day.

## Firewall configuration
- **Rules**: each rule permits or denies traffic by source, destination, protocol, and port. Rules are processed top to bottom, the first match wins, and an implicit deny at the end blocks anything not explicitly allowed.
- **Access lists**: the same idea on routers and switches, filtering between internal segments.
- **Ports and protocols**: allow only what a service needs. A web server needs 443; it does not need 3389 from the internet.
- **Screened subnets**: the rules that let the internet reach the public servers, let those servers reach exactly the internal systems they need, and nothing more.

## IDS and IPS
- **Signatures**: patterns of known attacks. Fast and precise, but blind to anything new. Keep them updated.
- **Trends**: behavior-based detection that notices unusual patterns, such as a workstation suddenly scanning the network. Catches new attacks at the cost of more false positives.
An IDS alerts; an IPS blocks. Both need tuning so real alerts are not buried.

## Web filtering
Controls what users can reach on the web.
- **Agent-based**: software on each device enforces policy wherever the device goes, including off the network.
- **Centralized proxy**: all web traffic passes through a proxy that filters, caches, and logs. Simple to manage; only covers traffic that goes through it.
- **URL scanning**: checks each requested address against known-bad lists and categories.
- **Content categorization**: sites grouped into categories such as gambling, malware, social media, so policy can allow or block whole categories.
- **Block rules**: explicit allow and deny lists for specific sites.
- **Reputation**: a score for each site based on its history; low-reputation sites are blocked or warned about.

## DNS filtering
Every connection starts with a name lookup. A filtering DNS resolver refuses to resolve known-malicious domains, so malware cannot reach its command server and users cannot reach phishing sites, regardless of the application. It is cheap, fast, and covers everything that uses DNS.

## Reading the scenario
- "Traffic was allowed even though no rule permitted it": a rule above it matched first, or the deny was missing; review rule order.
- "Block a category of websites for all users, including laptops at home": agent-based web filtering.
- "Stop infected hosts from contacting their command-and-control domains": DNS filtering.
- "Detect a new attack the vendor has not written a signature for": trend or behavior-based detection.

> Exam tip: firewall rules are first-match, top-down, implicit deny. Agent-based filtering follows the device; a proxy only sees what passes through it. DNS filtering protects every application at once.`,
      hook: "Rules top-down, first match, implicit deny; allow only needed ports. Signatures catch known, trends catch new. Web filter by agent or proxy, using URL scanning, categories, block rules, reputation. DNS filtering stops bad names for everything."
    },
    {
      id: "u11l2", title: "OS Security, Secure Protocols, Email, FIM, DLP, NAC, EDR/XDR, and UBA", domain: 4, obj: "4.5", minutes: 11,
      body: `The rest of the enterprise toolkit, each one a short definition and the situation it answers.

## Operating system security
- **Group Policy**: on Windows domains, centrally pushes settings to every machine: password rules, disabled services, restricted software, screen locks. The enforcement engine for the workstation baseline.
- **SELinux**: on Linux, mandatory access control that confines each process to exactly the files and ports its policy allows, so a compromised service cannot roam.

## Secure protocols
Replace every plaintext protocol with its encrypted version and pick the right transport.
- **Protocol selection**: SSH not Telnet, HTTPS not HTTP, SFTP not FTP, SNMPv3 not v1 or v2c, LDAPS not LDAP, DNS over TLS or HTTPS.
- **Port selection**: the encrypted service usually has its own port: 443, 22, 636, 993, 995, 853.
- **Transport method**: TLS for application traffic, IPsec for network tunnels, SSH for administration.

## Email security
Email is forged easily, so three records let receivers verify senders.
- **SPF**: a DNS record listing which servers may send mail for the domain.
- **DKIM**: outgoing mail is signed; the public key is in DNS, so receivers can verify the message was not altered and came from the domain.
- **DMARC**: a policy telling receivers what to do when SPF or DKIM fails (monitor, quarantine, reject) and where to send reports.
- **Email gateway**: the server that scans inbound and outbound mail for spam, malware, phishing, and data leakage.

## File integrity monitoring
Records hashes of critical files and alerts when one changes. A modified system binary, a changed configuration file, or a new web shell in the web root triggers it. The answer to "detect unauthorized changes to system files."

## Data loss prevention
Inspects content leaving by email, web upload, cloud storage, or removable media, recognizes sensitive patterns such as card numbers and classification labels, and blocks or alerts. The answer to "prevent sensitive data from leaving."

## Network access control
Checks a device before it joins the network: authentication through 802.1X and a posture check for antivirus, patches, and encryption. Compliant devices get their normal network; others land in a quarantine network with just enough access to fix themselves.

## EDR and XDR
- **Endpoint detection and response**: an agent that records process, file, and network activity on each endpoint, detects malicious behavior rather than just known files, and lets analysts isolate hosts and investigate.
- **Extended detection and response**: the same idea extended across endpoints, network, email, cloud, and identity, correlated in one place.

## User behavior analytics
Builds a baseline of what each user and account normally does, then alerts on deviation: a finance clerk downloading the engineering repository, a service account logging in interactively, activity at 3 a.m. from someone who works days. The answer to "detect a compromised account or a malicious insider using valid credentials."

> Exam tip: SPF is who may send, DKIM is a signature, DMARC is the policy. FIM catches changed files; DLP catches leaving data; NAC checks devices at the door; EDR watches endpoint behavior; UBA watches user behavior.`,
      hook: "Group Policy pushes Windows settings; SELinux confines Linux processes. Encrypt every protocol. SPF sender list, DKIM signature, DMARC policy. FIM changed files, DLP leaving data, NAC device health, EDR/XDR behavior on endpoints and beyond, UBA abnormal users."
    }
  ]
});

FRA.units.push({
  id: "u12", n: 12, title: "Identity and Access", domain: 4,
  blurb: "Creating and removing identities, proving them, federating them, controlling what they can do, and automating all of it.",
  assumes: "You know AAA and the authentication factors.",
  lessons: [
    {
      id: "u12l1", title: "Provisioning, Identity Proofing, Federation, and SSO", domain: 4, obj: "4.6", minutes: 9,
      body: `Identity is the new perimeter. This lesson covers the lifecycle of an identity and the protocols that let one identity work across many systems.

## Provisioning and deprovisioning
- **Provisioning**: creating the account and granting the access a role needs when someone joins or changes jobs.
- **Deprovisioning**: removing access when they leave or change jobs. The classic failure is the account that stays active after the person is gone. Automated deprovisioning tied to the HR system closes that gap.
- **Permission assignments**: grant by role, not by individual request, and review periodically so permissions do not accumulate.

## Identity proofing
Before issuing credentials, verify that the person is who they claim: government ID, knowledge checks, in-person verification, or trusted referrals. Weak proofing means strong authentication protects an impostor's account.

## Federation
One organization trusts identities managed by another. Your employees use your company login to reach a partner's application; the partner never stores your passwords. The identity provider authenticates; the service provider trusts the result.

## Single sign-on protocols
- **SAML**: XML-based standard for web single sign-on between an identity provider and applications. Common in enterprise SaaS.
- **OAuth**: authorization delegation: an application gets limited access to your data on another service without your password (for example, letting a scheduling app read your calendar).
- **OpenID Connect**: authentication built on OAuth; the "sign in with" buttons.
- **LDAP**: the directory protocol applications use to look up users and groups; LDAPS encrypts it.
- **Kerberos**: ticket-based authentication used inside Windows domains; depends on synchronized time.

## Interoperability and attestation
- **Interoperability**: identity systems must speak common protocols so federation and SSO work across vendors.
- **Attestation**: a periodic confirmation, usually by a manager or system owner, that each person's access is still appropriate. Access reviews are attestation.

## Reading the scenario
- "Former employees can still log in": deprovisioning failure.
- "Users of a partner company access our portal with their own company credentials": federation.
- "Let a third-party app post to a user's account without sharing the password": OAuth.
- "Managers confirm quarterly that their reports' access is still needed": attestation.

> Exam tip: SAML for enterprise web SSO, OAuth for delegated authorization, OpenID Connect for consumer sign-in, LDAP for directory lookups, Kerberos inside Windows domains. Deprovisioning is the step organizations forget.`,
      hook: "Provision on join, deprovision on exit, assign by role, attest periodically. Proof identity before issuing credentials. Federation trusts another's identities. SAML enterprise SSO, OAuth delegation, OpenID Connect sign-in, LDAP lookups, Kerberos tickets."
    },
    {
      id: "u12l2", title: "Access Control Models and MFA", domain: 4, obj: "4.6", minutes: 10,
      body: `Once an identity is proven, something decides what it may do. The exam names six access control approaches and expects you to recognize each from a description, then tests the factors that make authentication strong.

## Access control models
- **Mandatory access control (MAC)**: the system assigns labels (secret, top secret) to data and clearances to users; access is allowed only when the clearance meets the label, and users cannot change it. Military and government.
- **Discretionary access control (DAC)**: the owner of a resource decides who may access it. File permissions on most operating systems.
- **Role-based access control (RBAC)**: permissions attach to roles (accountant, nurse), users are assigned roles. The enterprise default because it scales and audits well.
- **Rule-based access control**: fixed rules applied to everyone, such as firewall access lists or "no access after 6 p.m."
- **Attribute-based access control (ABAC)**: decisions from attributes of the user, resource, and context: department, location, device type, data classification, time. The most flexible, and the model behind zero trust policies.
- **Time-of-day restrictions**: access allowed only within defined hours.
- **Least privilege**: whatever the model, grant only what the job requires.

## Multifactor authentication
A factor is a category of proof. MFA means two or more **different** categories.
- **Something you know**: password, PIN, security question.
- **Something you have**: hardware token, software token app, smart card, security key.
- **Something you are**: fingerprint, face, iris, voice (biometrics).
- **Somewhere you are**: location, from GPS or network.
A password plus a PIN is one factor twice. A password plus a code from an app is two factors.

## Implementations
- **Biometrics**: measured by false acceptance rate (impostor admitted) and false rejection rate (legitimate user denied). Tightening one loosens the other.
- **Hard tokens**: a physical device that generates or holds a credential. **Soft tokens**: an app that generates time-based codes.
- **Security keys**: hardware devices using public key cryptography that resist phishing because they only respond to the real site.

## Reading the scenario
- "The system enforces labels and users cannot override them": MAC.
- "The file's owner grants a colleague read access": DAC.
- "New hires in accounting automatically get the accounting permissions": RBAC.
- "Access depends on department, device compliance, and location together": ABAC.
- "Password and fingerprint": two factors. "Password and security question": one factor.

> Exam tip: MAC is labels the user cannot change, DAC is owner's choice, RBAC is job roles, rule-based is fixed rules for all, ABAC is attributes in combination. Count factors by category, not by number of prompts.`,
      hook: "MAC labels, DAC owner decides, RBAC roles, rule-based fixed rules, ABAC attributes, time-of-day, least privilege. Factors: know, have, are, somewhere. Two prompts of the same category is one factor."
    },
    {
      id: "u12l3", title: "Passwords and Privileged Access", domain: 4, obj: "4.6", minutes: 8,
      body: `Passwords are not dead, but the rules for them have changed, and the accounts that matter most get special handling.

## Password concepts
- **Length**: the strongest single setting. A long passphrase beats a short complex password because guessing cost grows exponentially with length.
- **Complexity**: character variety helps, but forced complexity produces predictable substitutions. Modern guidance favors length and banning known-breached passwords over complexity rules.
- **Reuse**: prevent the same password across systems and prevent cycling back to old passwords.
- **Expiration**: forced periodic changes are now discouraged unless there is evidence of compromise, because they push users toward weak patterns.
- **Age**: minimum age prevents rapid cycling to defeat reuse rules.

## Password managers
Store unique, random passwords for every site behind one strong master credential and MFA. They solve reuse and length at once, and they resist phishing because they fill only on the real domain.

## Passwordless
Authentication with no password at all: a security key, a platform biometric, or a certificate. Nothing to phish, nothing to reuse, nothing to spray. Where it is available, it is the strongest choice.

## Privileged access management
Administrator accounts are the crown jewels, so they get their own controls.
- **Just-in-time permissions**: administrative rights are granted only when needed, for a limited time, then removed automatically. No standing admin access to steal.
- **Password vaulting**: privileged credentials live in a vault; administrators check them out for a session and the vault rotates them afterward. Nobody knows the root password.
- **Ephemeral credentials**: short-lived credentials generated for a single task or session that expire on their own.

## Reading the scenario
- "Users write down passwords because they must change them monthly": remove forced expiration, add length and breached-password checks.
- "Administrators have permanent domain admin rights": just-in-time permissions.
- "Shared root password known to a dozen people": password vaulting with rotation.
- "Eliminate password phishing entirely": passwordless with security keys.

> Exam tip: length over complexity; expiration only on compromise; managers for uniqueness; passwordless for the strongest. Privileged access: just-in-time, vaulted, ephemeral.`,
      hook: "Length beats complexity; ban reuse and breached passwords; do not force expiration without cause. Managers for unique passwords; passwordless removes the target. Privileged: just-in-time, vaulted and rotated, ephemeral."
    },
    {
      id: "u12l4", title: "Automation and Orchestration", domain: 4, obj: "4.7", minutes: 7,
      body: `Security teams are outnumbered. Automation does the repeatable work consistently; orchestration connects tools into workflows so a detection triggers a response without a person retyping data between consoles.

## Use cases
- **User provisioning**: create accounts and permissions from the HR record; remove them the day someone leaves.
- **Resource provisioning**: build servers, networks, and cloud resources from templates with security settings included.
- **Guard rails**: automated checks that stop a deployment or configuration that violates policy, such as a public storage bucket.
- **Security groups**: cloud firewall rules applied automatically by role or tag.
- **Ticket creation** and **escalation**: alerts become tickets with the right details and reach the right person automatically.
- **Enabling and disabling services and access**: turn a compromised account off the moment the alert fires.
- **Continuous integration and testing**: every code change is built and tested, including security scans, before it can be deployed.
- **Integrations and APIs**: the connections between tools that make all of this possible.

## Benefits
- **Efficiency and time saving**: routine work happens without people.
- **Enforcing baselines**: automation applies the same configuration every time.
- **Standard infrastructure configurations**: fewer one-off systems.
- **Scaling in a secure manner**: growth does not require proportional staff.
- **Employee retention**: analysts do interesting work instead of repetitive tasks.
- **Reaction time**: containment in seconds instead of hours.
- **Workforce multiplier**: a small team does the work of a larger one.

## Other considerations
- **Complexity**: automated systems are harder to understand and debug.
- **Cost**: tools, integration, and the skills to build them.
- **Single point of failure**: if the automation platform fails, many processes stop at once.
- **Technical debt**: scripts written quickly and never revisited become fragile.
- **Ongoing supportability**: someone must maintain the automation as tools and APIs change.

> Exam tip: "the same misconfiguration keeps appearing on new servers" is fixed by automated provisioning from a baseline. "Analysts spend hours copying alert data into tickets" is fixed by orchestration. The risks the exam wants named are complexity, cost, single point of failure, technical debt, and supportability.`,
      hook: "Automate provisioning, guard rails, security groups, tickets, escalation, enable and disable, CI and testing, through APIs. Benefits: speed, consistent baselines, secure scaling, retention, reaction time, multiplier. Risks: complexity, cost, single point of failure, technical debt, supportability."
    }
  ]
});

FRA.units.push({
  id: "u13", n: 13, title: "Incident Response", domain: 4,
  blurb: "What to do when something goes wrong: the process, the investigation, and the evidence.",
  assumes: "You know the monitoring tools and the indicators of compromise.",
  lessons: [
    {
      id: "u13l1", title: "The Incident Response Process", domain: 4, obj: "4.8", minutes: 9,
      body: `An incident is an event that harms, or threatens to harm, confidentiality, integrity, or availability. Incident response is the planned sequence for handling one. The exam tests the order of the steps and what belongs in each.

## The seven steps
1. **Preparation**: before anything happens. The plan, the team and contacts, the tools, the communication templates, training, and the logging that will make investigation possible.
2. **Detection**: noticing that something happened, from an alert, a user report, or a third party.
3. **Analysis**: confirming it is real, determining scope, severity, and what is affected. Declaring the incident.
4. **Containment**: stopping the damage from spreading: isolating systems, disabling accounts, blocking addresses. Short-term containment first, then a stable state.
5. **Eradication**: removing the cause: malware, malicious accounts, the exploited vulnerability, the attacker's persistence.
6. **Recovery**: restoring systems to normal operation from clean sources, monitoring closely for the attacker's return.
7. **Lessons learned**: a review of what happened, what worked, what did not, and which controls and plans to change. Documented and fed back into preparation.

## Practicing
- **Training**: everyone on the team knows their role before the incident.
- **Tabletop exercises**: walk through a scenario in a meeting, finding gaps in the plan.
- **Simulations**: realistic drills that exercise tools and communication under time pressure.

## Root cause analysis
After containment, determine why the incident was possible, not just what happened. A phishing email is the cause of the click; the lack of MFA is the root cause of the account takeover. Fixing root causes prevents the next incident.

## Threat hunting
Proactively searching for signs of compromise that no alert caught, driven by threat intelligence and hypotheses ("if an attacker used this technique, what traces would exist?"). Hunting assumes the attacker is already inside.

## Reading the scenario
- "Malware confirmed on three servers; what is next?" Containment.
- "Systems are clean and restored; what is next?" Recovery, then lessons learned.
- "The team meets to discuss how the response could improve": lessons learned.
- "Analysts search logs for a technique reported in the news, without any alert": threat hunting.

> Exam tip: the order is preparation, detection, analysis, containment, eradication, recovery, lessons learned. After confirming an incident the next step is always containment. Lessons learned is last and feeds preparation.`,
      hook: "Prepare, detect, analyze, contain, eradicate, recover, learn. Contain before you clean. Root cause is why it was possible. Threat hunting looks without an alert."
    },
    {
      id: "u13l2", title: "Digital Forensics", domain: 4, obj: "4.8", minutes: 8,
      body: `Sometimes an incident becomes a legal matter, an insurance claim, or a disciplinary case. Then how you handled the evidence matters as much as what it shows.

## Legal hold
When litigation or an investigation is reasonably anticipated, relevant data must be preserved: no deletion, no routine purging, no reimaging the laptop. A legal hold notice suspends normal retention and disposal for the affected data until released.

## Chain of custody
A record of every person who handled each piece of evidence, when, why, and what they did with it, from collection to courtroom. Any gap lets an opposing party argue the evidence was altered. Label, log, sign, and store securely at every step.

## Acquisition
Collecting evidence without changing it. Make a bit-for-bit image of storage and work from the copy, never the original. Hash the original and the image to prove they match. Collect in **order of volatility**: what disappears fastest first.
1. CPU registers and cache
2. Memory (RAM)
3. Swap and temporary files
4. Disk
5. Remote logs and monitoring data
6. Archives and backups

## Preservation
Keep evidence unchanged and secure: write blockers when imaging, tamper-evident storage, verified hashes, controlled access.

## Reporting
A clear account of what was collected, how, what was found, and what it means, written so that non-technical readers, including lawyers and executives, can follow it.

## E-discovery
The process of identifying, preserving, collecting, and producing electronically stored information for legal proceedings. Legal hold and chain of custody make e-discovery possible.

## Reading the scenario
- "Preserve all email related to the project pending a lawsuit": legal hold.
- "Prove the evidence was not altered between seizure and trial": chain of custody and hashes.
- "Which to capture first from a running system": memory, before powering off.
- "Working directly on the suspect's drive": a mistake; image it and work on the copy.

> Exam tip: collect volatile evidence (memory) before pulling the plug. Image, hash, and work from the copy. Document every handoff. Legal hold stops deletion the moment litigation is anticipated.`,
      hook: "Legal hold preserves; chain of custody proves handling; acquire by imaging and hashing; order of volatility: registers, memory, swap, disk, remote logs, backups. Report for non-technical readers. E-discovery produces it for court."
    },
    {
      id: "u13l3", title: "Log Data and Data Sources", domain: 4, obj: "4.9", minutes: 8,
      body: `An investigation is only as good as the data available. The exam names the log types and other sources, and asks which one answers a particular question.

## Log data
- **Firewall logs**: connections allowed and denied, with addresses, ports, and times. Answer: "did the workstation talk to that external address?"
- **Application logs**: logins, errors, transactions, and unusual requests within an application. Answer: "which user account performed the transfer?"
- **Endpoint logs**: process starts, file changes, and detections from the endpoint agent. Answer: "what ran on the laptop after the attachment was opened?"
- **OS-specific security logs**: Windows Event logs (logon events, privilege use, policy changes), Linux authentication and system logs. Answer: "when was the administrator account used, and from where?"
- **IPS/IDS logs**: which signatures matched, from where, to where. Answer: "was an exploit attempted against the web server?"
- **Network logs**: switch, router, DNS, DHCP, and proxy logs. Answer: "which internal device held that address at that time, and what names did it look up?"
- **Metadata**: data about data: email headers, file properties, timestamps, authorship. Answer: "where did this email really come from, and when was this document created?"

## Other data sources
- **Vulnerability scans**: what weaknesses existed on the affected system, which suggests how it was compromised.
- **Automated reports**: scheduled summaries from security tools that show trends and anomalies.
- **Dashboards**: real-time views of security posture and activity for quick situational awareness.
- **Packet captures**: the complete contents of network traffic, the most detailed source and the most expensive to store. Used to reconstruct exactly what was sent.

## Using them together
An investigation moves across sources. A DLP alert points to a user; the application log shows what they accessed; the endpoint log shows the file being compressed; the firewall log shows the upload; the packet capture shows the contents. Time synchronization across sources is what makes the chain readable.

> Exam tip: "which internal machine had this IP address at 2 p.m." is DHCP or network logs. "What process executed on the endpoint" is endpoint logs. "Exact content of the transmitted data" is a packet capture. Email origin is in the header metadata.`,
      hook: "Firewall for connections, application for actions, endpoint for processes, OS logs for logons, IDS/IPS for signatures, network logs for addresses and names, metadata for origin. Scans, reports, dashboards, and packet captures fill the rest."
    }
  ]
});

FRA.units.push({
  id: "u14", n: 14, title: "Governance and Risk", domain: 5,
  blurb: "The documents that direct security, the structures that oversee it, and the arithmetic of risk.",
  assumes: "You know the control categories and the CIA goals.",
  lessons: [
    {
      id: "u14l1", title: "Policies, Standards, Procedures, and Guidelines", domain: 5, obj: "5.1", minutes: 8,
      body: `Governance is how an organization decides what security should do and makes sure it does it. It starts with four kinds of documents that the exam expects you to tell apart.

## The four document types
- **Policy**: a high-level statement of what must be done and who is responsible. Approved by management. "All remote access must use multifactor authentication."
- **Standard**: specific, mandatory requirements that implement a policy. "Passwords are at least 14 characters; TLS 1.2 or higher is required."
- **Procedure**: step-by-step instructions for performing a task. "How to onboard a new employee's accounts."
- **Guideline**: recommended practices that are not mandatory. "Consider using a password manager."

## Policies the exam names
- **Acceptable use policy**: what users may and may not do with company systems.
- **Information security policy**: the overarching commitment and responsibilities.
- **Business continuity** and **disaster recovery** policies: keep operating and restore after disruption.
- **Incident response policy**: authority, roles, and the requirement to follow the plan.
- **Software development lifecycle policy**: security built into each phase of development.
- **Change management policy**: no change without the process.

## Standards the exam names
Password standards, access control standards, physical security standards, and encryption standards: each turns a policy into measurable settings.

## Procedures the exam names
Change management procedures, onboarding and offboarding procedures, and **playbooks**: predefined step-by-step responses to specific incident types, such as "ransomware on a workstation."

## Reading the scenario
- "Employees must not use company email for personal business": acceptable use policy.
- "Encryption must use AES-256": encryption standard.
- "Steps for disabling a departing employee's accounts": offboarding procedure.
- "Suggested approaches for securing home offices": guideline.
- "The checklist analysts follow for a phishing report": playbook.

> Exam tip: policy says what and why, standard says exactly how much, procedure says how step by step, guideline recommends. Playbooks are procedures for incidents.`,
      hook: "Policy: what and why. Standard: the exact requirement. Procedure: the steps. Guideline: the recommendation. Playbooks are incident procedures. Acceptable use, change management, incident response, SDLC, continuity, recovery."
    },
    {
      id: "u14l2", title: "External Considerations, Governance Structures, and Data Roles", domain: 5, obj: "5.1", minutes: 7,
      body: `Security governance does not happen in a vacuum. Outside rules shape it, a structure oversees it, and specific roles own the data.

## External considerations
- **Regulatory**: rules from government agencies that apply to the industry: financial, healthcare, privacy regulators.
- **Legal**: laws on data protection, breach notification, and liability.
- **Industry**: standards required by the industry itself, such as payment card rules imposed by card brands.
- **Local, regional, national, global**: requirements vary by jurisdiction, and a global company must satisfy all of them. Data collected in one country may be regulated by that country's law wherever it is processed.

## Monitoring and revision
Governance documents are reviewed on a schedule and whenever laws, threats, or the business change. A policy last reviewed five years ago is a finding.

## Governance structures
- **Boards**: the board of directors carries ultimate accountability for risk, including cyber risk.
- **Committees**: a security or risk committee of executives that sets priorities and reviews status.
- **Government entities**: regulators and agencies that impose and enforce requirements.
- **Centralized versus decentralized**: one security function governing everything, or each business unit governing its own with central coordination. Centralized is consistent; decentralized is responsive.

## Roles and responsibilities for data
- **Owner**: the executive or manager accountable for a set of data: its classification, who may access it, and how it is protected.
- **Controller**: in privacy law, the party that decides why and how personal data is processed.
- **Processor**: the party that processes personal data on the controller's behalf, such as a payroll provider, and must follow the controller's instructions.
- **Custodian or steward**: the people who handle the data day to day, implementing the owner's decisions: backups, access changes, quality.

## Reading the scenario
- "A cloud payroll service processing employee data under the company's instructions": the company is the controller, the service is the processor.
- "The finance director decides who may access the ledger": data owner.
- "The database team performs backups and grants approved access": custodian.
- "The board asks for a quarterly cyber risk report": board-level governance.

> Exam tip: controller decides, processor acts on instructions, owner is accountable, custodian does the daily work. Regulatory comes from agencies, industry from the sector itself.`,
      hook: "External: regulatory, legal, industry, and the jurisdiction ladder from local to global. Review and revise on schedule. Boards, committees, government entities; centralized or decentralized. Owner accountable, controller decides, processor acts, custodian handles."
    },
    {
      id: "u14l3", title: "Risk Identification, Assessment, and Analysis", domain: 5, obj: "5.2", minutes: 9,
      body: `Risk management is how an organization decides which threats deserve money and attention. The exam wants the vocabulary, the assessment types, and the arithmetic.

## Risk identification
List the assets, the threats to them, and the vulnerabilities those threats could exploit. A risk is the combination: a threat exploiting a vulnerability to harm an asset.

## Risk assessment types
- **Ad hoc**: performed when a specific need arises, such as a new project.
- **Recurring**: performed on a schedule, such as annually.
- **One-time**: performed once for a specific event, such as an acquisition.
- **Continuous**: ongoing, fed by monitoring and automated tools.

## Qualitative analysis
Rate likelihood and impact on scales such as low, medium, high, and place risks on a matrix. Fast, uses judgment, good for prioritizing many risks.

## Quantitative analysis
Put numbers on it.
- **Asset value (AV)**: what the asset is worth.
- **Exposure factor (EF)**: the fraction of the asset's value lost in one incident.
- **Single loss expectancy**: **SLE = AV × EF**. The cost of one occurrence.
- **Annualized rate of occurrence (ARO)**: how many times per year the incident is expected.
- **Annualized loss expectancy**: **ALE = SLE × ARO**. The expected cost per year.
- **Probability** and **likelihood**: how probable an event is, feeding ARO.
- **Impact**: the consequence, feeding EF and AV.

## Worked example
A server worth 40,000 would lose 25 percent of its value in a fire. SLE = 40,000 × 0.25 = 10,000. A fire is expected once every 10 years, so ARO = 0.1. ALE = 10,000 × 0.1 = 1,000 per year. A fire suppression system costing 800 per year is worth it; one costing 5,000 per year is not.

## Using the numbers
ALE tells you the most a control is worth per year. Compare the ALE before and after the control, subtract the control's annual cost, and you have the return on the security investment.

> Exam tip: SLE = AV × EF; ALE = SLE × ARO. An event expected every 5 years has ARO 0.2. Qualitative uses ratings, quantitative uses money.`,
      hook: "Identify assets, threats, vulnerabilities. Assess ad hoc, recurring, one-time, or continuous. Qualitative rates; quantitative computes: SLE = AV x EF, ALE = SLE x ARO."
    },
    {
      id: "u14l4", title: "Risk Register, Tolerance, Strategies, and Business Impact", domain: 5, obj: "5.2", minutes: 9,
      body: `After risks are analyzed, they are recorded, compared to what the organization will accept, and handled by one of four strategies. Business impact analysis supplies the numbers that recovery planning needs.

## The risk register
The organization's list of identified risks, each with:
- **Key risk indicators**: measurable signals that a risk is increasing, such as the number of unpatched critical systems.
- **Risk owner**: the person accountable for managing that risk.
- **Risk threshold**: the level at which action is required.

## Tolerance and appetite
- **Risk appetite**: how much risk the organization is willing to pursue in general. **Expansionary** appetite accepts more risk for growth; **conservative** accepts little; **neutral** sits between.
- **Risk tolerance**: the acceptable variation around the appetite for a specific risk; the practical limit.

## The four strategies
- **Transfer**: shift the financial impact to another party through insurance or contracts. Accountability stays.
- **Accept**: acknowledge the risk and do nothing more, because the cost of treatment exceeds the loss. Two special forms: an **exemption** (the risk is excluded from a requirement) and an **exception** (a documented, approved deviation for a period).
- **Avoid**: eliminate the risk by not doing the activity: do not launch the feature, do not store the data.
- **Mitigate**: reduce likelihood or impact with controls. The most common strategy.

## Risk reporting
Regular reports to management and the board: top risks, trends, key risk indicators, and the status of treatment. Governance cannot decide without them.

## Business impact analysis
Determines which functions matter most and how quickly they must be restored.
- **Recovery time objective (RTO)**: the maximum acceptable time to restore a function.
- **Recovery point objective (RPO)**: the maximum acceptable data loss, measured as time since the last good copy.
- **Mean time to repair (MTTR)**: average time to fix a failure.
- **Mean time between failures (MTBF)**: average operating time between failures; higher is more reliable.

## Reading the scenario
- "Buy cyber insurance": transfer.
- "Stop offering the feature that collects biometric data": avoid.
- "Add MFA to reduce account takeover": mitigate.
- "Document that the risk is below the threshold and take no action": accept.
- "Backups must lose no more than one hour of data": RPO of one hour.
- "Service must be back within four hours": RTO of four hours.

> Exam tip: transfer, accept, avoid, mitigate. RTO is time to restore, RPO is data you can lose. MTBF measures reliability, MTTR measures repair speed.`,
      hook: "Register: indicators, owners, thresholds. Appetite expansionary, conservative, neutral; tolerance is the practical limit. Transfer, accept (exemption, exception), avoid, mitigate. BIA: RTO time down, RPO data lost, MTTR repair, MTBF reliability."
    }
  ]
});

FRA.units.push({
  id: "u15", n: 15, title: "Third Parties, Compliance, and Awareness", domain: 5,
  blurb: "Managing the risk that vendors bring, meeting the rules that apply, proving it through audits and testing, and training people.",
  assumes: "You know the risk strategies and the governance documents.",
  lessons: [
    {
      id: "u15l1", title: "Third-Party Risk and Agreements", domain: 5, obj: "5.3", minutes: 9,
      body: `Every vendor with access to your systems or data extends your attack surface. Third-party risk management is how you assess them before, bind them by contract, and watch them during the relationship.

## Vendor assessment
- **Penetration testing**: test the vendor's product or environment, or require evidence that they test it.
- **Right-to-audit clause**: a contract term that lets you inspect the vendor's controls yourself.
- **Evidence of internal audits**: the vendor's own audit results.
- **Independent assessments**: third-party audit reports and certifications against recognized standards.
- **Supply chain analysis**: understanding the vendor's own suppliers and dependencies, because their risk becomes yours.

## Vendor selection
- **Due diligence**: investigating a vendor's security, financial stability, reputation, and compliance before signing.
- **Conflict of interest**: ensuring the people choosing the vendor have no personal stake in the choice.

## Agreement types
- **Service level agreement (SLA)**: measurable performance commitments, such as uptime and response times, with remedies for missing them.
- **Memorandum of agreement (MOA)** and **memorandum of understanding (MOU)**: statements of intent and roles between parties; an MOU is generally less formal and less binding.
- **Master service agreement (MSA)**: the umbrella contract covering the whole relationship; individual jobs hang off it.
- **Work order (WO)** and **statement of work (SOW)**: define one specific piece of work: deliverables, timeline, price, under the MSA.
- **Non-disclosure agreement (NDA)**: confidentiality obligations.
- **Business partnership agreement (BPA)**: how partners share responsibilities, profits, and decisions.

## During the relationship
- **Vendor monitoring**: ongoing review of performance, security incidents, and compliance, not a one-time check.
- **Questionnaires**: standardized security questionnaires the vendor completes, at onboarding and periodically.
- **Rules of engagement**: for any testing of the vendor, or by the vendor, the agreed scope, methods, timing, and limits.

## Reading the scenario
- "The provider must guarantee 99.9 percent uptime with penalties": SLA.
- "Define the deliverables and price for this specific project": SOW under an MSA.
- "Allow us to inspect the vendor's security controls": right-to-audit clause.
- "Two organizations agree to cooperate without binding commitments": MOU.

> Exam tip: SLA is measurable performance, MSA is the umbrella, SOW is one job, NDA is secrecy, BPA is partnership terms, MOU is intent. Right-to-audit is the clause that lets you verify.`,
      hook: "Assess with pen tests, audits, independent assessments, supply chain analysis; select with due diligence and no conflicts. SLA performance, MSA umbrella, SOW one job, NDA secrecy, BPA partnership, MOU intent. Monitor, question, set rules of engagement."
    },
    {
      id: "u15l2", title: "Compliance and Privacy", domain: 5, obj: "5.4", minutes: 8,
      body: `Compliance is meeting the requirements that apply to you and being able to prove it. Privacy is the part of compliance about personal data, with its own vocabulary.

## Compliance reporting
- **Internal**: reports to management and the board on compliance status, gaps, and remediation.
- **External**: reports to regulators, auditors, customers, and partners, often on a required schedule and format.

## Consequences of non-compliance
- **Fines** and **sanctions** from regulators.
- **Reputational damage** that costs customers.
- **Loss of license** or certification to operate in a regulated business.
- **Contractual impacts**: breach of agreements with customers and partners, lost contracts, penalties.

## Compliance monitoring
- **Due diligence**: investigating and understanding the requirements and risks. **Due care**: taking the reasonable actions that follow. Together they show the organization acted responsibly.
- **Attestation and acknowledgement**: individuals formally confirm that they have read policies, completed training, or that controls are in place.
- **Internal and external monitoring**: self-checks plus outside audits.
- **Automation**: tools that continuously check configurations and controls against requirements and produce evidence.

## Privacy
- **Legal implications**: privacy laws exist at local, regional, national, and global levels, and they conflict; a global organization must map which apply to which data.
- **Data subject**: the person the personal data is about, who has rights over it.
- **Controller versus processor**: the controller decides why and how personal data is processed; the processor does it on the controller's behalf.
- **Ownership**: who is responsible for the data within the organization.
- **Data inventory and retention**: knowing what personal data you hold, where, why, and for how long, and deleting it when the purpose ends.
- **Right to be forgotten**: a data subject's right, under some laws, to have their personal data erased on request.

## Reading the scenario
- "A customer requests deletion of all their personal information": right to be forgotten.
- "Employees sign that they have read the acceptable use policy": acknowledgement.
- "The company understood the regulation and implemented the required controls": due diligence and due care.
- "Fined for failing to report a breach within the required time": a consequence of non-compliance.

> Exam tip: due diligence is knowing, due care is doing. Controller decides, processor executes, data subject is the person. Consequences: fines, sanctions, reputation, license, contracts.`,
      hook: "Report internally and externally. Non-compliance: fines, sanctions, reputation, license, contracts. Due diligence knows, due care does; attest and acknowledge; automate monitoring. Privacy: data subject, controller versus processor, inventory and retention, right to be forgotten."
    },
    {
      id: "u15l3", title: "Audits, Assessments, and Penetration Testing", domain: 5, obj: "5.5", minutes: 9,
      body: `Audits verify that controls exist and work. Penetration tests verify that they stop attackers. The exam distinguishes who performs each and the vocabulary of testing.

## Attestation
A formal statement, by management or an auditor, that controls are in place and effective. Attestation reports are what customers and regulators ask for.

## Internal audits and assessments
- **Compliance**: checking the organization's own adherence to policies and regulations.
- **Audit committee**: a board-level committee that oversees the audit function and receives its results.
- **Self-assessments**: teams evaluate their own controls against a checklist, cheap and frequent but less objective.

## External audits and assessments
- **Regulatory**: performed or required by a regulator.
- **Examinations**: formal reviews by authorities, common in finance.
- **Assessment**: an evaluation of controls or risk by an outside party.
- **Independent third-party audit**: an outside auditor with no stake in the result, producing a report others can rely on.

## Penetration testing
- **Physical**: attempt to enter facilities and reach equipment.
- **Offensive**: the red team attacks. **Defensive**: the blue team detects and responds. **Integrated**: purple teaming, where both work together and share findings in real time.
- **Known environment**: testers receive full information (architecture, source code, credentials). Deepest coverage.
- **Partially known environment**: testers receive some information, such as a user account.
- **Unknown environment**: testers receive nothing, simulating an outside attacker. Most realistic, least coverage.
- **Reconnaissance**: **passive** gathers information without touching the target (public records, DNS, social media); **active** interacts with the target (scanning, probing) and can be detected.

## Reading the scenario
- "Testers were given network diagrams and administrator credentials": known environment.
- "Testers were given only the company name": unknown environment.
- "Red and blue teams collaborate throughout the exercise": integrated (purple).
- "Testers searched job postings and DNS records before touching anything": passive reconnaissance.
- "An outside firm audits controls and issues a report for customers": independent third-party audit.

> Exam tip: known, partially known, unknown describes how much the testers are told. Passive reconnaissance does not touch the target; active does. Self-assessments are cheap but not independent.`,
      hook: "Attestation states controls work. Internal: compliance, audit committee, self-assessment. External: regulatory, examination, assessment, independent audit. Pen tests: physical, offensive, defensive, integrated; known, partially known, unknown; passive versus active recon."
    },
    {
      id: "u15l4", title: "Security Awareness", domain: 5, obj: "5.6", minutes: 7,
      body: `Every technical control can be undone by one person who does not know better. A security awareness program is the control that addresses people, and the exam treats it as a program with parts, not a single annual video.

## Phishing
- **Campaigns**: simulated phishing emails sent to employees to measure and improve recognition. Those who click get immediate education, not punishment.
- **Recognizing and reporting**: training focuses on the signs (urgency, mismatched addresses, unexpected attachments) and on the one behavior that matters most: reporting suspected phishing quickly, so the security team can act.

## Anomalous behavior recognition
Teaching people to notice and report behavior that is out of place.
- **Risky**: actions that violate policy, such as disabling antivirus or sharing credentials.
- **Unexpected**: activity that does not fit a person's role, such as a receptionist accessing engineering files.
- **Unintentional**: mistakes with security consequences, such as emailing a spreadsheet to the wrong recipient. Reporting these quickly limits harm.

## User guidance and training topics
- **Policy and handbooks**: where the rules live and how to find them.
- **Situational awareness**: paying attention to surroundings, screens, conversations, and strangers.
- **Insider threat**: what it looks like and how to report concerns.
- **Password management**: length, uniqueness, managers, never sharing.
- **Removable media and cables**: unknown USB devices and charging cables can carry malware.
- **Social engineering**: the techniques and the verification habits that defeat them.
- **Operational security**: not revealing sensitive details in public, on social media, or to callers.
- **Hybrid and remote work**: securing home networks, locking screens, avoiding public Wi-Fi without a VPN, protecting devices at home.

## Reporting and monitoring
- **Initial**: baseline measurements when the program starts: phishing click rates, training completion.
- **Recurring**: ongoing metrics to show improvement and find groups that need more attention.

## Development and execution
Designing the program (audiences, topics, frequency, delivery methods) and running it consistently, with management support and updates as threats change.

## Reading the scenario
- "Measure how many employees click a simulated malicious link": phishing campaign.
- "An employee reports that a colleague is copying files before resigning": insider threat awareness working.
- "Staff working from home must be trained on securing home routers": hybrid and remote work guidance.

> Exam tip: the goal of phishing simulations is reporting behavior and education, not punishment. Awareness is measured at the start and continuously afterward.`,
      hook: "Phishing campaigns teach recognition and reporting. Notice risky, unexpected, and unintentional behavior. Train on policy, awareness, insider threat, passwords, removable media, social engineering, operational security, remote work. Measure initially and continuously."
    }
  ]
});
