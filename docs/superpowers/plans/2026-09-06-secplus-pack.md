# Security+ (SY0-701) Course Pack Plan

**Goal:** A complete `courses/secplus/` pack in the FieldReady Academy format: manifest, cheat sheet (done), 54 original lessons across 15 units with a deeper explanation each, five or more original questions per lesson (about 280), generators for computable topics, and its course page and catalog card.

**Status:** COMPLETE on 2026-09-06. All 54 lessons, deep dives, 270 questions, 7 generators, manifest, course page, and catalog card are in place; `npm test` passes for the pack.

## Content rules (from Blake)

Original prose and original questions. No reference to any book, author, or page. The Sec+ study guide and practice tests in `E:\CERT GUIDES\COMPTIA SEC+` are for ideas only. Every lesson gets a "Need a deeper explanation?" walkthrough with an analogy, a diagram or table, worked examples, "how the exam asks it", and "what to memorize".

## Manifest (to create as `courses/secplus/course.js` in the last task)

```js
window.FRA = window.FRA || {};
FRA.course = {
  id: "secplus", name: "SecPlus Academy", short: "S+", brand: "FieldReady Academy", catalogUrl: "../",
  exam: { vendor: "CompTIA", title: "CompTIA Security+", code: "SY0-701" },
  description: "Self-paced CompTIA Security+ SY0-701 course with adaptive training and practice exams.",
  domains: [
    { id: 1, name: "General Security Concepts", short: "Concepts", pct: 12, quota: 6 },
    { id: 2, name: "Threats, Vulnerabilities, and Mitigations", short: "Threats", pct: 22, quota: 11 },
    { id: 3, name: "Security Architecture", short: "Architecture", pct: 18, quota: 9 },
    { id: 4, name: "Security Operations", short: "Operations", pct: 28, quota: 14 },
    { id: 5, name: "Security Program Management and Oversight", short: "Governance", pct: 20, quota: 10 }
  ],
  test: { questions: 50, minutes: 50, passPct: 90, streakNeeded: 3, starterPerDomain: 2, checkpointN: 4, checkpointPass: 3 },
  starterPool: { 1: ["u1l1","u1l3","u2l2","u2l4","u1l2","u2l3"], 2: ["u3l1","u3l3","u5l1","u5l2","u4l2","u5l5"], 3: ["u7l1","u7l2","u8l3","u6l2","u8l1","u8l4"], 4: ["u12l2","u13l1","u10l2","u11l2","u9l2","u12l3"], 5: ["u14l3","u14l1","u15l1","u15l3","u14l4","u15l2"] },
  core: { 1: ["u1l1","u1l2","u1l3","u2l2","u2l4"], 2: ["u3l1","u3l3","u5l1","u5l2","u5l5"], 3: ["u7l1","u7l2","u8l1","u8l3"], 4: ["u9l1","u10l2","u11l2","u12l2","u13l1"], 5: ["u14l1","u14l3","u15l1","u15l3"] },
  freeCourse: true, free: { lessons: 10 }, upgradeUrl: "",
  realExamNote: "The real exam passes at 750 of 900, about 83%.",
  examDay: [
    "Up to 90 questions in 90 minutes, including performance-based items. Do the multiple choice first if a simulation stalls you; flag and return.",
    "Read for the qualifier: BEST, MOST likely, FIRST, NEXT, LEAST. The answer is usually the least disruptive control that fixes the stated problem.",
    "Sort every control into its category (technical, managerial, operational, physical) and type (preventive, deterrent, detective, corrective, compensating, directive) before you answer.",
    "Incident response order and the risk formulas (SLE = AV x EF, ALE = SLE x ARO) are free points; know them cold.",
    "Two forms of ID, arrive early, sleep the night before."
  ],
  generatedNote: "Port pairs, hash lengths, risk math, CVSS bands, and control classification items are generated fresh every time.",
  legacyStoreKeys: []
};
```

Note: the pass bar is 90% because the real exam's bar (about 83%) is higher than Network+'s; the course must hold learners above it.

## Units and lessons (54)

Domain in brackets. Each lesson lists what it must cover; the wording is the plan's, not the lesson's.

### Unit 1: Security Foundations [1]
- u1l1 Security Controls: Categories and Types (1.1). The four categories, the six types, the same control appearing in several cells, "which category and type" questions.
- u1l2 CIA, Non-repudiation, AAA, and Gap Analysis (1.2). Each pillar with two controls; authenticating people and systems; authorization models preview; gap analysis as current versus target state.
- u1l3 Zero Trust (1.2). Control plane versus data plane components, adaptive identity, policy engine and administrator, enforcement point, implicit trust zones, contrast with perimeter security.
- u1l4 Physical Security and Deception (1.2). Bollards, vestibules, fencing, surveillance, guards, badges, lighting, the four sensor types; honeypot, honeynet, honeyfile, honeytoken.

### Unit 2: Change Management and Cryptography [1]
- u2l1 Change Management (1.3). Business process elements, technical implications, documentation and version control, the order of a change.
- u2l2 Symmetric, Asymmetric, and Key Exchange (1.4). Shared key versus key pair, which is used for what, Diffie-Hellman, ephemeral keys and forward secrecy, algorithm names and key lengths, TLS versions.
- u2l3 Hashing, Salting, Signatures, and Key Stretching (1.4). Hash properties and lengths, collisions, salting, HMAC, how a digital signature is built, PBKDF2 and bcrypt, blockchain as a chained hash ledger.
- u2l4 PKI and Certificates (1.4). CA, RA, CSR, chain and root of trust, CRL versus OCSP and stapling, self-signed versus third-party, wildcard and SAN, formats, key escrow.
- u2l5 Encryption Levels, Hardware Tools, and Obfuscation (1.4). Full-disk to record-level, transport encryption, TPM, HSM, KMS, secure enclave, steganography, tokenization, masking.

### Unit 3: Threat Actors and Vectors [2]
- u3l1 Threat Actors and Motivations (2.1). The six actors, internal versus external, resources and sophistication, the ten motivations, matching a scenario to an actor.
- u3l2 Threat Vectors and Attack Surfaces (2.2). Message, image, file, voice, removable device, vulnerable and unsupported software, unsecure networks, open ports, default credentials, supply chain.
- u3l3 Social Engineering (2.2). Every human vector with a one-sentence scenario, why each works, the defense (training, verification, process).

### Unit 4: Vulnerabilities [2]
- u4l1 Application and Operating System Vulnerabilities (2.3). Memory injection, buffer overflow, race conditions and TOC/TOU, malicious updates, unpatched OS.
- u4l2 Web, Hardware, Virtualization, and Cloud Vulnerabilities (2.3). SQL injection and XSS with recognizable payloads, firmware and end-of-life hardware, VM escape and resource reuse, cloud misconfiguration.
- u4l3 Supply Chain, Cryptographic, Misconfiguration, Mobile, and Zero-Day (2.3). Provider types, weak crypto, defaults and open ports, side loading and jailbreaking, what zero-day means for defenders.

### Unit 5: Attacks, Indicators, and Mitigation [2]
- u5l1 Malware (2.4). Each type with its tell; rootkit persistence; ransomware response.
- u5l2 Network and Wireless Attacks (2.4). DDoS amplified and reflected, DNS attacks, evil twin and deauth, on-path, credential replay, malicious code on the wire.
- u5l3 Application and Cryptographic Attacks (2.4). Injection, buffer overflow, replay, privilege escalation, CSRF and SSRF, directory traversal, downgrade, collision, birthday.
- u5l4 Password Attacks and Indicators of Compromise (2.4). Spraying versus brute force, lockout tuning; every indicator on the objectives with what it suggests.
- u5l5 Mitigation Techniques and Hardening (2.5). Segmentation, access control, allow lists, isolation, patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning; the hardening checklist.

### Unit 6: Architecture Models [3]
- u6l1 Cloud, Infrastructure as Code, Serverless, and Microservices (3.1). Responsibility matrix, hybrid, third-party vendors, IaC benefits and risks, serverless, microservices.
- u6l2 Networks, Virtualization, Containers, and Special Systems (3.1). Air gap, logical segmentation, SDN, on-prem versus cloud, centralized versus decentralized, containers versus VMs, IoT, ICS/SCADA, RTOS, embedded, high availability.
- u6l3 Architecture Considerations (3.1). The twelve considerations as trade-offs with an example each.

### Unit 7: Enterprise Infrastructure [3]
- u7l1 Device Placement, Zones, Failure Modes, and Appliances (3.2). Zones and screened subnet, attack surface, fail-open versus fail-closed, active versus passive, inline versus tap, jump server, proxies, IDS/IPS, load balancer, sensors.
- u7l2 Port Security and Firewalls (3.2). 802.1X and EAP variants, WAF, UTM, NGFW, Layer 4 versus Layer 7, choosing the effective control.
- u7l3 Secure Communication and Access (3.2). VPN types, remote access, TLS versus IPsec tunneling, SD-WAN, SASE.

### Unit 8: Data Protection and Resilience [3]
- u8l1 Data Types, Classifications, States, and Sovereignty (3.3). Types, classification ladder, at rest/in transit/in use, sovereignty and geolocation.
- u8l2 Data Protection Methods (3.3). Geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions, picking the method for a scenario.
- u8l3 High Availability, Sites, Continuity, and Capacity (3.4). Load balancing versus clustering, hot/warm/cold, dispersion, diversity, multi-cloud, continuity of operations, capacity planning.
- u8l4 Backups, Testing, and Power (3.4). Full/incremental/differential, onsite/offsite, frequency, encryption, snapshots, replication, journaling, tabletop/failover/simulation/parallel, UPS and generators, RAID levels.

### Unit 9: Securing Resources [4]
- u9l1 Secure Baselines and Hardening Targets (4.1). Establish, deploy, maintain; each hardening target and its specific concern.
- u9l2 Wireless and Mobile Security (4.1). Site survey and heat map, WPA3, AAA and RADIUS, EAP choices; MDM, BYOD/COPE/CYOD, cellular/Wi-Fi/Bluetooth risks.
- u9l3 Application Security and Sandboxing (4.1). Input validation, secure cookies, static analysis, code signing, sandboxing, monitoring.
- u9l4 Asset Management (4.2). Acquisition through disposal, inventory and enumeration, sanitization versus destruction, certification, retention.

### Unit 10: Vulnerability Management and Monitoring [4]
- u10l1 Finding Vulnerabilities (4.3). Scans (credentialed versus not), static and dynamic analysis, package monitoring, threat feeds and ISACs, pen testing, responsible disclosure and bug bounty, audits.
- u10l2 Analyzing, Responding, Validating, and Reporting (4.3). False positives and negatives, CVSS and CVE, prioritization factors, response options, rescans, reports.
- u10l3 Monitoring Activities and Tools (4.4). Aggregation, alerting, scanning, reporting, archiving, quarantine, tuning; SCAP, benchmarks, agents, SIEM, antivirus, DLP, SNMP traps, NetFlow, scanners.

### Unit 11: Enterprise Security Capabilities [4]
- u11l1 Firewalls, IDS/IPS, Web and DNS Filtering (4.5). Rules and access lists, ports and protocols, screened subnets, signatures and trends, web filter methods, DNS filtering.
- u11l2 OS Security, Secure Protocols, Email, FIM, DLP, NAC, EDR/XDR, and UBA (4.5). Group Policy and SELinux, protocol and port selection, SPF/DKIM/DMARC and gateways, file integrity monitoring, DLP, NAC, EDR versus XDR, user behavior analytics.

### Unit 12: Identity and Access [4]
- u12l1 Provisioning, Identity Proofing, Federation, and SSO (4.6). Lifecycle, proofing, federation, SAML, OAuth, OpenID Connect, LDAP, Kerberos, interoperability, attestation.
- u12l2 Access Control Models and MFA (4.6). MAC, DAC, RBAC, rule-based, ABAC, time-of-day, least privilege; factors, tokens, biometrics, security keys.
- u12l3 Passwords and Privileged Access (4.6). Length, complexity, reuse, expiration, age, managers, passwordless; PAM with just-in-time, vaulting, ephemeral credentials.
- u12l4 Automation and Orchestration (4.7). Use cases, benefits, considerations, scripting risks.

### Unit 13: Incident Response [4]
- u13l1 The Incident Response Process (4.8). The seven steps in order with a worked scenario; training and testing; root cause analysis; threat hunting.
- u13l2 Digital Forensics (4.8). Legal hold, chain of custody, acquisition, preservation, reporting, e-discovery, order of volatility.
- u13l3 Log Data and Data Sources (4.9). Each log type and what it answers; vulnerability scans, automated reports, dashboards, packet captures.

### Unit 14: Governance and Risk [5]
- u14l1 Policies, Standards, Procedures, and Guidelines (5.1). The four document types with examples, which one a scenario needs.
- u14l2 External Considerations, Governance Structures, and Data Roles (5.1). Regulatory to global, boards and committees, centralized versus decentralized, owner, controller, processor, custodian.
- u14l3 Risk Identification, Assessment, and Analysis (5.2). Cadences, qualitative versus quantitative, AV, EF, SLE, ARO, ALE with worked math.
- u14l4 Risk Register, Tolerance, Strategies, and Business Impact (5.2). Register fields, tolerance and appetite, transfer/accept/avoid/mitigate, RTO, RPO, MTTR, MTBF.

### Unit 15: Third Parties, Compliance, and Awareness [5]
- u15l1 Third-Party Risk and Agreements (5.3). Vendor assessment methods, selection, the agreement types, monitoring, questionnaires, rules of engagement.
- u15l2 Compliance and Privacy (5.4). Reporting, consequences, monitoring, due diligence and care, attestation, privacy roles and rights.
- u15l3 Audits, Assessments, and Penetration Testing (5.5). Attestation, internal and external audits, pen test types, known/partially known/unknown, passive versus active reconnaissance.
- u15l4 Security Awareness (5.6). Phishing campaigns, anomalous behavior, user guidance topics, reporting, program development and execution.

Free set: the first 10 lessons in course order are u1l1 through u2l5 plus u3l1.

## Generators (`courses/secplus/generators.js`)

- `u2l3` hash lengths and algorithm status (MD5 128, SHA-1 160, SHA-256 256; which is deprecated).
- `u11l2` secure protocol pairs and ports (from the cheat sheet table).
- `u14l3` risk math: random AV, EF, ARO; ask SLE or ALE; distractors from swapped operands.
- `u10l2` CVSS score to rating band.
- `u1l1` control classification: a described control, ask category or type.
- `u15l1` agreement type for a scenario.
- `u12l2` access control model for a scenario.

## Tasks (each is its own commit, verified with `npm test` where the pack is loadable)

1. Units 1 and 2 lessons and deep dives (9 lessons).
2. Units 3, 4, 5 lessons and deep dives (11).
3. Units 6, 7, 8 (10).
4. Units 9, 10, 11 (9).
5. Units 12, 13 (7).
6. Units 14, 15 (8).
7. Questions: five or more per lesson, in `questions-1.js` (units 1 to 5), `questions-2.js` (6 to 10), `questions-3.js` (11 to 15). Every question original; stems are scenarios, not definitions, wherever possible.
8. Generators, then `course.js`, `secplus/index.html`, catalog card, `npm test`, `python build.py secplus`, print the cheat sheet to `dist/secplus-cheatsheet.pdf`.

Lesson writing template (matches Net+): 5 to 12 minutes of reading, `## ` sections, bullets for lists, one `> Exam tip` line, a one-line `hook`. Deep dives: 450 to 700 words with at least one fenced diagram or table.
