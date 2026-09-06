// SecPlus Academy curriculum, units 1 to 5. Original teaching content for CompTIA Security+ SY0-701.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Security Foundations", domain: 1,
  blurb: "How the exam classifies every control, the three goals of security, zero trust, and the physical layer.",
  assumes: "Nothing. Start here if you are new to security.",
  lessons: [
    {
      id: "u1l1", title: "Security Controls: Categories and Types", domain: 1, obj: "1.1", minutes: 9,
      body: `A security control is anything that reduces risk: a firewall rule, a policy, a guard, a lock. The exam sorts every control two ways at once. The **category** says who or what applies it. The **type** says what it is meant to achieve. One control can sit in several cells depending on how it is used, so always answer from the purpose the question describes.

## The four categories
- **Technical**: applied by systems and software. Firewalls, encryption, intrusion detection, access control lists, multifactor authentication.
- **Managerial**: applied through planning and oversight. Risk assessments, security policies, vendor reviews, audit programs.
- **Operational**: carried out by people in day-to-day procedures. Security guards, delivering awareness training, running backups, following the incident response steps.
- **Physical**: protect the building and the hardware. Locks, fences, badges, cameras, lighting, bollards.

## The six types
- **Preventive**: stops the event from happening. A firewall rule, a door lock, least privilege.
- **Deterrent**: discourages the attempt without physically stopping it. Warning signs, visible cameras, login banners.
- **Detective**: notices the event during or after. IDS alerts, log review, audits, motion sensors.
- **Corrective**: repairs the damage. Restoring from backup, patching after a compromise, the recovery steps of incident response.
- **Compensating**: an alternative that fills in when the ideal control cannot be used. Extra monitoring and isolation for a system that cannot be patched.
- **Directive**: tells people what they must do. Policies, procedures, an acceptable use agreement, a sign that says "badge in."

## One control, several cells
A camera is physical by category. When it is mounted where thieves can see it, it deters. When its footage is reviewed after a theft, it detects. A backup is operational when someone runs it and corrective when it is used to recover. The question tells you the purpose; the purpose picks the type.

## How to read the question
- "Which category" wants technical, managerial, operational, or physical.
- "Which type" wants preventive, deterrent, detective, corrective, compensating, or directive.
- "The system cannot be patched, so the team adds..." is compensating.
- "A policy instructs users to..." is directive.

> Exam tip: say the verb first. Prevent, deter, detect, correct, compensate, direct. Then match the verb to the scenario before looking at the options.`,
      hook: "Category is who applies it: technical, managerial, operational, physical. Type is what it does: prevent, deter, detect, correct, compensate, direct."
    },
    {
      id: "u1l2", title: "CIA, Non-repudiation, AAA, and Gap Analysis", domain: 1, obj: "1.2", minutes: 8,
      body: `Every security control serves one of three goals, and every identity question comes back to three A's. Learn the words precisely; the exam uses them precisely.

## The CIA triad
- **Confidentiality**: only authorized people see the data. Controls: encryption, access controls, data classification.
- **Integrity**: data is not changed without detection. Controls: hashing, digital signatures, change management, file integrity monitoring.
- **Availability**: systems stay reachable when needed. Controls: redundancy, backups, load balancing, DDoS protection.
A question that mentions "unauthorized disclosure" is about confidentiality; "tampered" or "altered" is integrity; "down" or "unreachable" is availability.

## Non-repudiation
The sender cannot later deny sending. Achieved with **digital signatures**: only the holder of the private key could have signed, so the signature ties the message to that identity. Logs and audit trails support it for actions inside systems.

## AAA
- **Authentication** proves an identity. People authenticate with passwords, tokens, and biometrics. Systems authenticate too: a device presents a certificate for 802.1X, a server presents a TLS certificate.
- **Authorization** decides what an authenticated identity may do. The models (mandatory, discretionary, role-based, attribute-based) have their own lesson.
- **Accounting** records what was done: logs, session records, audit trails.

## Gap analysis
Compare where security is now against where it should be, usually against a framework, regulation, or the organization's own policy. The output is a list of gaps, each with an owner and a plan. It is the first step before a security program, an audit, or a compliance effort.

> Exam tip: "prove the message came from the sender and was not altered" is a digital signature, which delivers integrity and non-repudiation at once. "Compare current controls to a required standard" is gap analysis.`,
      hook: "Confidentiality hides, integrity detects change, availability keeps it up. Signatures give non-repudiation. Authenticate, authorize, account. Gap analysis is now versus should-be."
    },
    {
      id: "u1l3", title: "Zero Trust", domain: 1, obj: "1.2", minutes: 9,
      body: `Traditional security was a castle: a hard perimeter, and anything inside was trusted. Zero trust throws that out. Location grants nothing. Every request, from anyone, from anywhere, is verified against policy before it is allowed. The exam expects the vocabulary of how that verification is organized.

## Two planes
Zero trust splits the work into a **control plane** that decides and a **data plane** that carries traffic and enforces the decision.

## Control plane components
- **Adaptive identity**: authentication strength changes with context. A login from a managed laptop in the office needs less than the same account from a new phone in another country.
- **Threat scope reduction**: limit what any single identity can reach, so a compromised account can do little.
- **Policy-driven access control**: rules based on identity, device, and context decide access, never the network location.
- **Policy engine**: the component that evaluates each request against policy and returns allow or deny.
- **Policy administrator**: takes the engine's decision and instructs the enforcement point to open or close the path.

## Data plane components
- **Subject and system**: the user or process asking, and the resource being asked for.
- **Policy enforcement point**: where the decision is applied. It sits in the path of the traffic and only passes what the control plane approved.
- **Implicit trust zones**: small zones where, after verification, traffic is allowed to flow. They replace the one big trusted inside.

## How a request flows
1. The subject asks the enforcement point for a resource.
2. The enforcement point hands the request to the policy administrator.
3. The policy engine evaluates identity, device health, location, and the requested action against policy.
4. The administrator tells the enforcement point to allow or deny.
5. Access is granted only to that resource, for that session, and can be re-evaluated.

> Exam tip: "decides" is the policy engine, "communicates the decision" is the policy administrator, "applies it to traffic" is the policy enforcement point. "Authentication requirements change with context" is adaptive identity.`,
      hook: "Never trust, always verify. Control plane decides (engine, administrator, adaptive identity, scope reduction, policy-driven). Data plane enforces (enforcement point, implicit trust zones, subject and system)."
    },
    {
      id: "u1l4", title: "Physical Security and Deception", domain: 1, obj: "1.2", minutes: 7,
      body: `Software cannot protect a server someone can carry away. Physical controls guard the building, and deception controls turn the attacker's curiosity against them.

## Perimeter and entry
- **Bollards**: short posts that stop vehicles from ramming an entrance.
- **Fencing**: defines the boundary and slows intruders; height and design set how serious it is.
- **Lighting**: removes hiding places and makes cameras useful at night.
- **Access control vestibule**: two doors where only one opens at a time, so one badge admits one person and nobody can tailgate. Older name: mantrap.
- **Access badge**: proves identity at doors and logs entry. Combine with a PIN or biometric for high-security rooms.
- **Security guard**: the only control that can make judgment calls and respond in the moment.
- **Video surveillance**: deters when visible, detects when reviewed, supports investigations.

## Sensors
- **Infrared**: detects body heat moving through a space.
- **Pressure**: detects weight on a floor plate or mat.
- **Microwave**: sends out waves and detects changes in the reflection when something moves.
- **Ultrasonic**: the same idea with sound waves.

## Deception technology
Decoys that look valuable, do nothing real, and alert the moment they are touched.
- **Honeypot**: a decoy system that attracts attackers so their tools and methods can be studied.
- **Honeynet**: a whole decoy network of honeypots.
- **Honeyfile**: a bait document, such as "passwords.xlsx," that alerts when opened or copied.
- **Honeytoken**: a fake credential, API key, or database record that should never be used; any use proves a breach.

> Exam tip: "prevent tailgating" is an access control vestibule. "Stop a vehicle" is bollards. "Detect that someone is browsing the file share they should not be in" is a honeyfile. Nothing legitimate ever touches a honeytoken, so any hit is a true positive.`,
      hook: "Bollards stop cars, vestibules stop tailgating, guards make decisions. Sensors: infrared heat, pressure weight, microwave and ultrasonic motion. Honeypot, honeynet, honeyfile, honeytoken: touched means breached."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Change Management and Cryptography", domain: 1,
  blurb: "How changes are made safely, and the encryption, hashing, and certificate machinery behind nearly every other control.",
  assumes: "You know the CIA triad and the control categories.",
  lessons: [
    {
      id: "u2l1", title: "Change Management", domain: 1, obj: "1.3", minutes: 8,
      body: `Most outages and many breaches follow an unplanned change. Change management is the process that makes changes deliberate, reviewed, and reversible. The exam tests the pieces of the process and the technical side effects a change can have.

## The business process
- **Approval process**: a change request is submitted, reviewed, and approved by a change advisory board or an owner before anything happens.
- **Ownership**: one named person is responsible for the change end to end.
- **Stakeholders**: everyone affected is identified and informed.
- **Impact analysis**: what could break, who is affected, how long, and what the risk is.
- **Test results**: the change is tried in a test environment first and the results are attached.
- **Backout plan**: the exact steps to undo the change if it fails.
- **Maintenance window**: the scheduled time when the change may run, chosen for least impact.
- **Standard operating procedure**: routine, low-risk changes follow a pre-approved procedure instead of a full review.

## Technical implications
- **Allow lists and deny lists**: adding software or traffic to an allow list, or blocking it, changes what works.
- **Restricted activities**: some actions are forbidden during a change, or forbidden entirely without a separate review.
- **Downtime**: planned unavailability, communicated in advance.
- **Service and application restarts**: many changes take effect only after a restart, which itself is downtime.
- **Legacy applications**: old software may break when its platform changes.
- **Dependencies**: a change to one system can break others that rely on it.

## Documentation and version control
After the change, update diagrams, procedures, and configuration records. **Version control** keeps every version of configurations and code, records who changed what, and makes rollback a checkout instead of a memory test.

> Exam tip: "what must exist before the change can be approved" is the backout plan plus impact analysis and test results. "Roll back to the previous configuration quickly" is version control. Emergency changes still get documented afterward.`,
      hook: "Request, impact analysis, test, approve, window, backout plan ready, implement, document. Watch dependencies, legacy apps, restarts, and downtime. Version control makes rollback cheap."
    },
    {
      id: "u2l2", title: "Symmetric, Asymmetric, and Key Exchange", domain: 1, obj: "1.4", minutes: 10,
      body: `Encryption turns readable data into unreadable data with a key, and back again with the right key. There are two families, and real systems use both together.

## Symmetric encryption
One secret key both encrypts and decrypts. It is fast, so it protects bulk data: files, disks, database contents, the body of a TLS session.
- **AES** is the standard, with 128, 192, or 256-bit keys. Longer keys are stronger and slightly slower.
- **3DES** is legacy and slow. **ChaCha20** is a fast modern stream cipher. **Blowfish** and **Twofish** are older block ciphers.
The problem: both sides need the same key, and sending it in the clear defeats the purpose.

## Asymmetric encryption
A **key pair**: a public key anyone may have and a private key only the owner holds. What one encrypts, only the other decrypts.
- Encrypt with the recipient's **public** key; only their **private** key can decrypt. Confidentiality.
- Sign with your **private** key; anyone verifies with your **public** key. Authenticity and non-repudiation.
- **RSA** is the classic; **ECC** (elliptic curve) gives the same strength with much shorter keys, so it suits phones and IoT. **DSA** and **ECDSA** are signature algorithms.
Asymmetric math is slow, so it is used for small things: exchanging keys and signing hashes.

## Key exchange and forward secrecy
**Diffie-Hellman** lets two parties agree on a shared secret over an open channel without ever sending the secret. **ECDHE** is the elliptic-curve, ephemeral version: a fresh key for every session. Ephemeral keys give **perfect forward secrecy**: stealing the server's long-term private key later does not decrypt past sessions.

## How TLS combines them
1. The server proves its identity with a certificate (asymmetric).
2. Client and server agree on a session key (key exchange).
3. All the data is encrypted with that session key (symmetric, fast).
Use **TLS 1.2 or 1.3**. SSL and TLS 1.0 and 1.1 are deprecated.

## Choosing
- Bulk data at rest or in a session: symmetric, AES-256.
- Prove identity, sign, or move a key safely: asymmetric.
- Constrained devices: ECC.
- Longer key length and a modern algorithm beat a longer password every time.

> Exam tip: "encrypt so only the recipient can read it" uses the recipient's public key. "Prove who sent it" uses the sender's private key. "Compromise of the private key does not expose old sessions" is perfect forward secrecy from ephemeral keys.`,
      hook: "Symmetric: one shared key, fast, AES for bulk data. Asymmetric: public encrypts or verifies, private decrypts or signs, RSA and ECC. Diffie-Hellman agrees on a key; ephemeral keys give forward secrecy."
    },
    {
      id: "u2l3", title: "Hashing, Salting, Signatures, and Key Stretching", domain: 1, obj: "1.4", minutes: 9,
      body: `A hash is a fixed-length fingerprint of data. Change one bit of the input and the fingerprint changes completely. Hashes are one-way: you cannot get the data back from the hash. That makes them the tool for integrity, passwords, and signatures.

## Algorithms and lengths
- **MD5**: 128-bit output, broken; collisions can be manufactured. Recognize, never recommend.
- **SHA-1**: 160-bit, deprecated for the same reason.
- **SHA-256** (and the SHA-2 family): the current standard. **SHA-3**: a newer alternative design.
A **collision** is two different inputs with the same hash. Strong hashes make collisions computationally impractical.

## HMAC
A hash mixed with a secret key. Only someone with the key can produce the right value, so HMAC proves both integrity and that the sender knew the key. Used in API authentication and in TLS.

## Passwords: salting and key stretching
Systems store password hashes, not passwords. Two problems remain. Identical passwords produce identical hashes, and attackers precompute tables of hashes for common passwords.
- **Salting** adds random data to each password before hashing. Same password, different salt, different hash. Precomputed tables become useless.
- **Key stretching** runs the hash thousands of times, or uses a deliberately slow function, so each guess costs the attacker real time. **PBKDF2**, **bcrypt**, **scrypt**, and **Argon2** are key-stretching functions.

## Digital signatures, step by step
1. Hash the message.
2. Encrypt the hash with the sender's private key. That encrypted hash is the signature.
3. The receiver decrypts the signature with the sender's public key to get the original hash.
4. The receiver hashes the received message and compares. Match means the message is intact and came from the private key holder.
Signatures deliver integrity, authenticity, and non-repudiation. They do not provide confidentiality.

## Blockchain and the open public ledger
A chain of blocks where each block contains the hash of the previous one. Altering an old block changes its hash and breaks every block after it, and the ledger is copied across many participants, so tampering is evident. Exam questions frame it as an **open public ledger** with integrity built in.

> Exam tip: "two files produce the same hash" is a collision, and the fix is a stronger algorithm. "Identical passwords stored with different hashes" is salting. "Make brute force slow" is key stretching. Signatures never encrypt the message itself.`,
      hook: "Hash: one-way fingerprint, MD5 and SHA-1 broken, SHA-256 fine. Salt makes duplicates differ; stretching makes guesses slow. Signature = hash encrypted with the private key. HMAC = hash plus a key."
    },
    {
      id: "u2l4", title: "PKI and Certificates", domain: 1, obj: "1.4", minutes: 10,
      body: `Asymmetric encryption only works if you can trust that a public key really belongs to who it claims. Public key infrastructure solves that with certificates: documents that bind a public key to an identity, signed by an authority everyone trusts.

## The players
- **Certificate authority (CA)**: issues and signs certificates. The CA's own certificate is the **root of trust**; operating systems and browsers ship with a list of trusted roots.
- **Registration authority**: verifies the identity of the requester before the CA issues anything.
- **Intermediate CAs**: sign day-to-day certificates so the root key can stay offline. A certificate chain runs leaf to intermediate to root.

## Getting a certificate
1. Generate a key pair on the server. The private key never leaves it.
2. Create a **certificate signing request (CSR)** containing the public key and the identity details.
3. The CA validates the request and returns a signed certificate.
4. Install the certificate and the chain.

## Revocation
A compromised or retired certificate must be revoked before it expires.
- **CRL**: a list of revoked serial numbers that clients download periodically. Simple, but can be hours stale.
- **OCSP**: the client asks the CA in real time about one certificate. **OCSP stapling** has the server fetch a signed OCSP response and include it in the TLS handshake, which is faster and more private.

## Kinds of certificates
- **Self-signed**: signed by its own key, no CA. Browsers warn. Acceptable for internal test systems only.
- **Third-party**: issued by a public CA and trusted everywhere.
- **Wildcard**: {{*.example.com}} covers every host at one level of the domain.
- **Subject alternative name**: several hostnames on one certificate.
- Code-signing, email, user, and device certificates use the same structure for different purposes.

## Formats and escrow
- **PEM**: Base64 text, usually {{.pem}} or {{.crt}}. **DER**: the same content in binary.
- **PFX or P12**: a bundle that includes the private key, password protected. **P7B**: a chain of certificates with no private key.
- **Key escrow**: a trusted party keeps a copy of a private key so encrypted data can be recovered if the key is lost or an employee leaves.

> Exam tip: "the browser warns about the certificate" is self-signed or expired or untrusted chain. "Check revocation without a stale list" is OCSP. "One certificate for many subdomains" is wildcard. "Recover encrypted files after the user left" is key escrow.`,
      hook: "CA signs, RA verifies, CSR requests, chain leads to the root of trust. CRL is a stale list, OCSP is real time, stapling makes it fast. Wildcard covers subdomains. PFX carries the private key; escrow keeps a spare."
    },
    {
      id: "u2l5", title: "Encryption Levels, Hardware Tools, and Obfuscation", domain: 1, obj: "1.4", minutes: 8,
      body: `Where you encrypt decides what a thief actually gets. And the safest place to keep a key is somewhere software cannot read it.

## Levels of encryption
- **Full-disk**: the entire drive. A stolen laptop yields nothing without the passphrase or TPM.
- **Partition** and **volume**: one partition or logical volume, leaving others readable.
- **File**: individual files, protected even when copied elsewhere.
- **Database**: the whole database store. **Record**: individual fields or rows, so a card number is encrypted while the rest of the row is searchable.
- **Transport and communication**: data moving between systems, using TLS, IPsec, or SSH.
Pick the level that matches the threat: a lost device needs full-disk; a database administrator who should not see card numbers needs record-level.

## Hardware for keys
- **TPM**: a chip on the motherboard that stores keys and measures the boot process. Full-disk encryption ties the key to the TPM so the disk only unlocks in its own machine.
- **HSM**: a dedicated tamper-resistant appliance or card that generates, stores, and uses keys at scale. Certificate authorities and payment systems use them.
- **KMS**: a key management service, usually cloud-hosted, that creates, rotates, and controls access to keys for applications.
- **Secure enclave**: an isolated area of a processor that handles secrets such as biometric templates, separate from the main operating system.

## Obfuscation
Making data less useful to whoever sees it, without full encryption.
- **Steganography**: hiding data inside another file, such as an image or audio, so its existence is concealed.
- **Tokenization**: replace sensitive data with a random token and keep the real value in a separate vault. Payment systems store tokens, not card numbers.
- **Data masking**: show only part of a value, such as the last four digits, to people who do not need the whole thing.

> Exam tip: "a stolen laptop's data must be unreadable" is full-disk encryption, often with a TPM. "The card number is replaced by a stand-in value" is tokenization. "Hidden inside an image" is steganography. "Show xxxx-xxxx-xxxx-1234" is masking.`,
      hook: "Full-disk for lost devices, record-level for one field. TPM on the board, HSM in the rack, KMS in the cloud, enclave in the chip. Steganography hides, tokenization substitutes, masking partially reveals."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Threat Actors and Vectors", domain: 2,
  blurb: "Who attacks, why, through which doors, and how they manipulate people.",
  assumes: "You know the basic control types and the CIA goals.",
  lessons: [
    {
      id: "u3l1", title: "Threat Actors and Motivations", domain: 2, obj: "2.1", minutes: 8,
      body: `Knowing who is likely to attack you shapes every defense. The exam describes an actor's resources, skill, and goal and asks you to name the type, or names the type and asks for its likely motive.

## The actors
- **Nation-state**: a government's cyber operation. External, extremely well funded, highly sophisticated, patient. Runs advanced persistent threats that stay hidden for months. Motivations: espionage, war, disruption of infrastructure.
- **Organized crime**: professional criminal groups. External, well funded, sophisticated. Motivation: money, through ransomware, fraud, and data theft for resale.
- **Hacktivist**: attacks to make a point. External, modest resources, variable skill. Motivations: philosophical or political beliefs, service disruption, embarrassment.
- **Insider threat**: an employee, contractor, or partner who already has access. Internal. Can be malicious (revenge, financial gain, espionage) or accidental (a mistake with real consequences).
- **Unskilled attacker**: uses tools written by others without understanding them. External, low resources and sophistication. Motivations: chaos, notoriety, curiosity.
- **Shadow IT**: staff who deploy unapproved systems and services. Internal, not malicious, but creates unmanaged and unpatched risk.

## Attributes to compare
- **Internal versus external**: does the actor already have legitimate access?
- **Resources and funding**: a nation-state can spend years; an unskilled attacker cannot.
- **Sophistication and capability**: custom zero-day exploits versus downloaded scripts.

## Motivations to recognize
Data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical or political beliefs, ethical (authorized testing), revenge, disruption or chaos, and war.

## Matching scenarios
- Custom malware, months of stealthy access, government targets: nation-state.
- Ransomware with a payment portal: organized crime.
- Defaced website with a political message: hacktivist.
- Database copied by a departing salesperson: insider threat.
- Marketing team runs its own unapproved cloud file share: shadow IT.

> Exam tip: "well funded and highly sophisticated" narrows to nation-state or organized crime; the motive decides which. "Already has access" is always an insider.`,
      hook: "Nation-state: funded, patient, espionage. Organized crime: money. Hacktivist: a cause. Insider: already has access. Unskilled: borrowed tools. Shadow IT: unapproved, not malicious."
    },
    {
      id: "u3l2", title: "Threat Vectors and Attack Surfaces", domain: 2, obj: "2.2", minutes: 8,
      body: `A threat vector is the path an attack takes in. The attack surface is the sum of every path available. Shrink the surface and you close vectors.

## Message-based and content-based
- **Email**, **SMS**, and **instant messaging** carry phishing links, malicious attachments, and fraudulent requests.
- **Image-based**: malicious code hidden in image files or images that trigger vulnerable viewers.
- **File-based**: documents with macros, executables disguised as documents, archives that hide payloads.
- **Voice call**: vishing, where the attacker talks a person into acting.
- **Removable device**: a USB drive left in a parking lot, or an infected drive carried between networks.

## Software and systems
- **Vulnerable software**: unpatched applications. **Client-based** scanning uses an installed agent; **agentless** scanning checks from outside. Both find the same gaps in different ways.
- **Unsupported systems**: end-of-life operating systems and applications that no longer receive patches. Every new flaw stays open forever.
- **Open service ports**: every listening service is a door; unused ones should be closed.
- **Default credentials**: admin and password, still set on far too many devices.

## Networks
- **Unsecure wireless**: open or weakly encrypted Wi-Fi, evil twins.
- **Unsecure wired**: live network jacks in public areas, no port security.
- **Bluetooth**: pairing attacks and data theft from discoverable devices.

## Supply chain
Attackers compromise something you trust and receive from others: a **managed service provider** with access to many customers, a **vendor** whose software update is poisoned, a **supplier** whose hardware arrives with malicious firmware. Defense: vendor assessment, verified updates, and monitoring what trusted parties do.

## Shrinking the surface
Close unused ports, remove unneeded software, retire unsupported systems, change every default password, encrypt wireless, secure physical jacks, and treat every vendor connection as a vector to monitor.

> Exam tip: "the update from the vendor contained malware" is a supply chain vector. "An old server that cannot be patched" is an unsupported system; isolate it or replace it. "Found a USB drive and plugged it in" is a removable device vector, and the fix is training plus device control.`,
      hook: "Vectors: message, image, file, voice, removable media, vulnerable and unsupported software, open ports, defaults, unsecure networks, supply chain. Close the door you do not need."
    },
    {
      id: "u3l3", title: "Social Engineering", domain: 2, obj: "2.2", minutes: 9,
      body: `The easiest way through a firewall is to ask an employee to open it. Social engineering attacks people rather than systems, using authority, urgency, fear, familiarity, and trust. The exam names each technique and expects you to recognize it from a short story.

## Message attacks
- **Phishing**: a fraudulent email that looks legitimate, aiming to steal credentials or deliver malware.
- **Spear phishing**: phishing aimed at a specific person, using details about them. **Whaling**: aimed at an executive.
- **Smishing**: phishing by text message. **Vishing**: by voice call, often with a spoofed caller ID.
- **Business email compromise**: the attacker uses a real or convincingly faked business account to redirect a payment or change bank details. Losses are large because the request looks routine.

## Pretending
- **Pretexting**: an invented story that justifies the request: "I am from IT and need your password to fix your account."
- **Impersonation**: posing as a specific person, such as the CEO or a technician.
- **Brand impersonation**: posing as a known company, in email, on fake websites, or in ads.
- **Typosquatting**: registering look-alike domains such as examp1e.com to catch typos and host fakes.
- **Watering hole**: compromise a website the targets already visit, and wait.

## Influence campaigns
- **Misinformation**: false information spread by people who believe it.
- **Disinformation**: false information spread deliberately to deceive.
Both are used to shape opinion, damage reputations, or distract during an attack.

## In person
- **Tailgating**: following an authorized person through a secured door.
- **Shoulder surfing**: watching a screen or keypad.
- **Dumpster diving**: retrieving information from trash.

## Why they work, and the defenses
Attackers press **urgency** ("today or the account closes"), **authority** ("this is the director"), **familiarity** ("we met at the conference"), and **fear**. Defenses are procedural: verify requests through a second channel, require callbacks for payment changes, train people to slow down, report attempts, and never bypass a process because someone sounds important.

> Exam tip: "email from the CFO asking to wire funds to a new account" is business email compromise; the control is out-of-band verification. "A text with a link to reset your bank password" is smishing. "Someone held the door for a stranger" is tailgating; the control is an access control vestibule and training.`,
      hook: "Phishing by email, smishing by text, vishing by voice, whaling at executives, BEC for payments. Pretexting is the story, impersonation is the role, typosquatting is the fake domain, watering hole is the poisoned site."
    }
  ]
});

FRA.units.push({
  id: "u4", n: 4, title: "Vulnerabilities", domain: 2,
  blurb: "The weaknesses attackers exploit, grouped the way the exam groups them.",
  assumes: "You can name the threat actors and vectors.",
  lessons: [
    {
      id: "u4l1", title: "Application and Operating System Vulnerabilities", domain: 2, obj: "2.3", minutes: 8,
      body: `A vulnerability is a weakness that a threat can exploit. Application and operating system flaws are the largest class, and most have a recognizable shape.

## Memory problems
- **Buffer overflow**: a program copies more data into a memory buffer than it holds. The extra data overwrites neighboring memory, and a crafted input can overwrite the return address so the attacker's code runs. Defense: patched software, input length checks, memory-safe languages, and operating system protections such as address space layout randomization.
- **Memory injection**: attacker code is written into a running process's memory and executed under that process's privileges, hiding from file-based antivirus.

## Timing problems
- **Race condition**: two operations run at once and the outcome depends on which finishes first. The classic form is **time-of-check to time-of-use (TOC/TOU)**: a program checks that a file is safe, then uses it a moment later, and the attacker swaps it in between. Defense: check and use in one atomic step, lock the resource.

## Update problems
- **Malicious update**: a legitimate update channel delivers a poisoned package. Because the update is signed or comes from a trusted source, it installs everywhere. Defense: verify signatures, monitor the vendor, stage updates before wide rollout.

## Operating system vulnerabilities
Unpatched kernels and services, insecure default settings, unnecessary services running, weak permissions on system files. The fix is boring and decisive: patch on a schedule, apply a secure baseline, remove what is not needed, and monitor for drift.

## Reading the scenario
- "Input longer than expected crashed the service, then arbitrary code ran": buffer overflow.
- "The file was verified and then replaced before it was used": TOC/TOU race condition.
- "Malware appeared through the vendor's normal update": malicious update.
- "The exploit runs in memory and leaves nothing on disk": memory injection.

> Exam tip: buffer overflow and memory injection are fixed by patching and memory protections, not by firewalls. A race condition is a logic flaw in the code itself; only the developer can fix it.`,
      hook: "Buffer overflow: too much input overwrites memory. Memory injection: code planted in a running process. Race condition, TOC/TOU: checked, then swapped, then used. Malicious update: poison through a trusted channel."
    },
    {
      id: "u4l2", title: "Web, Hardware, Virtualization, and Cloud Vulnerabilities", domain: 2, obj: "2.3", minutes: 9,
      body: `Four more families, each with a signature the exam expects you to spot in a sentence.

## Web application vulnerabilities
- **SQL injection**: user input is pasted into a database query. Entering {{' OR 1=1 --}} in a login field turns the query into "where the password is anything." Attackers read, change, or delete data. Defense: parameterized queries and input validation.
- **Cross-site scripting (XSS)**: an attacker stores or reflects script in a web page, and other users' browsers run it, stealing session cookies or defacing content. Defense: output encoding, input validation, content security policy.

## Hardware vulnerabilities
- **Firmware**: the code inside devices can carry flaws that survive reinstalling the operating system. Patch firmware too.
- **End-of-life**: the vendor no longer supports the product. **Legacy**: old technology still in use because something depends on it. Both keep known flaws open forever; isolate, monitor, and plan replacement.

## Virtualization vulnerabilities
- **VM escape**: code inside a guest virtual machine breaks out and runs on the hypervisor or host, reaching every other VM. The most serious virtualization flaw. Defense: patch the hypervisor, limit guest tools.
- **Resource reuse**: memory or storage freed by one VM is handed to another without being wiped, leaking data between tenants. Defense: providers must zero resources before reuse.

## Cloud-specific vulnerabilities
Misconfigured storage buckets left public, overly permissive identity policies, exposed management APIs, and misunderstandings of the shared responsibility model: the provider secures the cloud, the customer secures what they put in it. Most cloud breaches are customer misconfiguration.

## Reading the scenario
- "A single quote in the search box produced a database error": SQL injection.
- "Users see a pop-up that steals their session cookie": XSS.
- "Attack from one tenant's VM affected other tenants on the host": VM escape.
- "Data from a previous customer appeared in newly allocated storage": resource reuse.
- "Backups were readable by anyone on the internet": cloud misconfiguration.

> Exam tip: injection and XSS are both input-handling failures; the difference is where the payload runs. SQL runs on the server's database. XSS runs in other users' browsers.`,
      hook: "SQL injection hits the database, XSS hits other users' browsers. Firmware and end-of-life hardware stay vulnerable. VM escape reaches the host; resource reuse leaks between tenants. Cloud breaches are usually misconfiguration."
    },
    {
      id: "u4l3", title: "Supply Chain, Cryptographic, Misconfiguration, Mobile, and Zero-Day", domain: 2, obj: "2.3", minutes: 7,
      body: `The last group of vulnerability classes is about trust: in providers, in algorithms, in defaults, in app stores, and in the assumption that a patch exists.

## Supply chain
You inherit the security of everyone you depend on.
- **Service provider**: a managed service provider or cloud vendor with access to your environment.
- **Hardware provider**: devices that arrive with compromised firmware or counterfeit parts.
- **Software provider**: libraries, packages, and applications that ship with backdoors or get poisoned upstream.
Defense: vendor assessment, contractual security requirements, verified and signed software, inventory of components, and monitoring of third-party access.

## Cryptographic vulnerabilities
Weak or deprecated algorithms (MD5, SHA-1, DES, RC4), short keys, self-made cryptography, poor random number generation, and protocols that allow **downgrade** to weaker options. The algorithm may be fine while the implementation or the key handling is broken. Defense: current algorithms, adequate key length, tested libraries, disable legacy protocol versions.

## Misconfiguration
The most common vulnerability of all: open ports, default accounts, verbose error messages, permissive file shares, disabled logging, unnecessary services. Defense: secure baselines, configuration management, regular scanning, and change control.

## Mobile device vulnerabilities
- **Side loading**: installing apps from outside the official store bypasses the store's screening.
- **Jailbreaking** (iOS) and **rooting** (Android): removing the operating system's protections gives the user, and any malware, full control. Mobile device management can detect and block these devices.

## Zero-day
A vulnerability that is being exploited before the vendor has a patch, or before the vendor even knows. There is nothing to install. Defense while waiting: compensating controls such as segmentation, disabling the vulnerable feature, tighter monitoring, and threat intelligence to know it exists.

> Exam tip: "no patch is available yet" is a zero-day, and the answer is a compensating control, not "apply the patch." "The library the developers imported was compromised upstream" is a software supply chain vulnerability. "Apps installed from an unofficial source" is side loading.`,
      hook: "Supply chain: service, hardware, software providers. Crypto: weak algorithms, short keys, downgrade. Misconfiguration is the most common. Side loading and jailbreaking break mobile protections. Zero-day means no patch yet: compensate."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Attacks, Indicators, and Mitigation", domain: 2,
  blurb: "Malware, network, application, cryptographic, and password attacks; what each looks like in the logs; and the mitigations that stop them.",
  assumes: "You know the vulnerability classes.",
  lessons: [
    {
      id: "u5l1", title: "Malware", domain: 2, obj: "2.4", minutes: 8,
      body: `Malware is software written to do harm. The exam gives you a symptom or a behavior and asks for the type, so learn each one by its tell.

## The types
- **Ransomware**: encrypts files and demands payment for the key. Tell: files renamed with strange extensions, a ransom note, systems unusable. Response: isolate, do not pay if backups exist, restore, find the entry point.
- **Trojan**: harmful code hidden inside a program the user wanted. Tell: "installed a free utility, then odd behavior began." A **remote access trojan** gives the attacker control.
- **Worm**: spreads by itself across the network using vulnerabilities, no user action needed. Tell: many hosts infected within minutes, network traffic spikes.
- **Virus**: attaches to files or programs and spreads when they are run or shared. Needs a user action.
- **Spyware**: watches activity and reports it. **Keylogger**: records keystrokes to capture passwords. Tell: credentials stolen with no phishing involved.
- **Bloatware**: unwanted software preinstalled by a manufacturer. Not always malicious, but it expands the attack surface and may collect data.
- **Logic bomb**: code that waits for a trigger, such as a date or an employee's termination, then acts. Tell: damage on a specific date or event, often planted by an insider.
- **Rootkit**: hides deep in the operating system or firmware, conceals itself and other malware, survives reboots and often reinstalls. Tell: antivirus finds nothing while symptoms continue; the fix is to wipe and reinstall from trusted media.

## How malware gets in
Phishing attachments, malicious downloads, drive-by downloads from compromised sites, removable media, exploitation of unpatched services, and poisoned updates. The vector determines the first control to fix.

## Controls
Endpoint protection and EDR, application allow lists, patching, least privilege so malware runs with fewer rights, email filtering, user training, and tested offline backups for ransomware.

> Exam tip: "spreads on its own with no user interaction" is a worm. "Triggered on a specific date" is a logic bomb. "Antivirus is clean but the system is still compromised" points to a rootkit. "Recover without paying" is restore from backup.`,
      hook: "Ransomware encrypts, trojan hides in wanted software, worm spreads itself, virus needs a click, spyware and keyloggers watch, logic bomb waits for a trigger, rootkit hides from everything."
    },
    {
      id: "u5l2", title: "Network and Wireless Attacks", domain: 2, obj: "2.4", minutes: 9,
      body: `Attacks on the wire and in the air are recognized by traffic patterns. Learn the pattern and the control that breaks it.

## Denial of service
- **DoS**: one source floods a target. **DDoS**: many sources, usually a botnet.
- **Amplified**: the attacker sends small requests to a third-party service that answers with large responses. **Reflected**: the requests carry the victim's spoofed address, so the responses hit the victim. Open DNS and NTP servers are common amplifiers. Defense: upstream scrubbing services, rate limiting, disabling open resolvers.

## DNS attacks
Poisoning a resolver's cache, spoofing answers, or hijacking the domain registration sends users to attacker sites while the address bar looks right. Defense: DNSSEC, DNS filtering, registrar locks.

## Wireless attacks
- **Evil twin**: an attacker's access point broadcasts your SSID; users connect and hand over traffic.
- **Deauthentication**: forged management frames disconnect clients, often to capture the reconnection handshake or push them to the evil twin.
- **Rogue access point**: any unauthorized AP on the network, a back door.
Defense: WPA3, enterprise authentication with 802.1X, protected management frames, wireless intrusion detection.

## On-path
The attacker sits between two parties, reading or altering traffic, through ARP poisoning on a LAN, a rogue AP, or a compromised router. Defense: TLS everywhere, VPNs on untrusted networks, dynamic ARP inspection, certificate validation.

## Credential replay
Captured authentication data, such as a password hash or a session token, is reused to log in without knowing the password. Defense: MFA, short-lived session tokens, nonces and timestamps in authentication, encrypted channels so nothing is captured.

## Malicious code in transit
Payloads delivered over the network: exploit traffic against a listening service, drive-by downloads, command-and-control beacons from infected hosts. Defense: IPS signatures, egress filtering, DNS monitoring for beaconing.

> Exam tip: "small queries, huge responses, victim's address spoofed" is amplified and reflected DDoS. "Same SSID as ours, not our hardware" is an evil twin. "Attacker reused a captured token" is credential replay; MFA and token expiry stop it.`,
      hook: "DDoS amplified and reflected through open servers. DNS poisoning sends users astray. Evil twin, deauth, rogue AP in the air. On-path reads the middle. Replay reuses captured credentials."
    },
    {
      id: "u5l3", title: "Application and Cryptographic Attacks", domain: 2, obj: "2.4", minutes: 9,
      body: `Application attacks abuse how software handles input and identity. Cryptographic attacks abuse weak algorithms or weak negotiation.

## Application attacks
- **Injection**: untrusted input is executed as code or query. SQL injection against databases, command injection against the shell, LDAP injection against directories. Defense: input validation and parameterized queries.
- **Buffer overflow**: oversized input overwrites memory to run attacker code. Defense: patching, bounds checking, memory protections.
- **Replay**: a captured legitimate request is sent again, for example a payment or a login. Defense: one-time tokens, timestamps, sequence numbers.
- **Privilege escalation**: a normal user becomes an administrator, through a flaw (vertical) or by accessing another user's data (horizontal). Defense: patching, least privilege, monitoring for unusual privilege use.
- **Forgery**: **cross-site request forgery** tricks a logged-in user's browser into sending a request the attacker wrote, such as changing an email address. **Server-side request forgery** tricks the server into making requests on the attacker's behalf, reaching internal systems. Defense: anti-forgery tokens, validating and restricting server-side requests.
- **Directory traversal**: {{../../}} sequences in a path reach files outside the web root, such as password files. Defense: input validation, least privilege for the web server.

## Cryptographic attacks
- **Downgrade**: the attacker forces the two sides to negotiate a weaker protocol or cipher, then breaks that. Defense: disable legacy versions and ciphers; TLS 1.3 removes them.
- **Collision**: finding two inputs with the same hash, which lets a forged document carry a legitimate signature. Defense: SHA-256 or better.
- **Birthday**: the statistical shortcut to collisions. With a 128-bit hash you need far fewer than 2 to the 128 tries, only about 2 to the 64, because any pair matching counts. It is why hash outputs must be long.

## Reading the scenario
- "A form field with a single quote returned database rows": injection.
- "A user's browser silently changed their settings after visiting another site": CSRF.
- "The web server fetched an internal URL the attacker supplied": SSRF.
- "The connection negotiated TLS 1.0 even though both support 1.3": downgrade.

> Exam tip: forgery attacks abuse trust. CSRF abuses the site's trust in the user's browser; SSRF abuses the internal network's trust in the server. Directory traversal is the {{../}} attack.`,
      hook: "Injection runs input as code, overflow runs input as memory, replay resends, escalation climbs, CSRF and SSRF forge requests, traversal walks ../. Downgrade weakens the protocol; collision and birthday attack the hash."
    },
    {
      id: "u5l4", title: "Password Attacks and Indicators of Compromise", domain: 2, obj: "2.4", minutes: 8,
      body: `Password attacks are about volume and stealth, and the exam wants you to tell the two main forms apart. Indicators of compromise are the fingerprints attacks leave in logs and behavior.

## Password attacks
- **Brute force**: every possible combination against one account until it works. Defeated by account lockout, long passwords, and MFA. Offline brute force against stolen hashes is defeated by salting and key stretching.
- **Password spraying**: one or a few common passwords tried against many accounts. It stays under lockout thresholds because each account sees only one or two attempts. Tell: many accounts with a single failed login in the same window. Defeated by MFA, banning common passwords, and alerting on the pattern across accounts.
- **Dictionary**: a list of likely passwords. **Credential stuffing**: reusing username and password pairs leaked from another site. Defeated by MFA and no password reuse.

## Physical attacks that appear in this objective
- **Brute force** on a lock or door, **RFID cloning** of a badge, and **environmental** attacks such as cutting power or cooling. Defenses are physical controls, badge encryption, and monitoring.

## Indicators of malicious activity
- **Account lockout**: many failed attempts, brute force in progress.
- **Concurrent session usage**: one account logged in from two places at once.
- **Impossible travel**: logins from two distant locations too close in time to be the same person.
- **Blocked content**: security tools reporting blocked downloads or sites, a sign of attempted delivery.
- **Resource consumption**: CPU, disk, or bandwidth spikes: crypto mining, exfiltration, DDoS participation.
- **Resource inaccessibility**: systems or files suddenly unavailable: ransomware or DoS.
- **Out-of-cycle logging**: log entries at unusual times or in unusual volume.
- **Published or documented**: an exploit for your exact version is public.
- **Missing logs**: gaps where logs should be; attackers clear their tracks.

## Reading the scenario
- "Hundreds of accounts each had one failed login at 2 a.m.": password spraying.
- "The same account is active in the office and overseas simultaneously": concurrent sessions and impossible travel.
- "Two hours of logs are missing from the server": tampering, treat as compromised.

> Exam tip: brute force is many guesses on one account and trips lockout; spraying is one guess on many accounts and does not. Impossible travel is the indicator the exam loves most.`,
      hook: "Brute force: many guesses, one account, lockout catches it. Spraying: one guess, many accounts, slips under lockout. Indicators: lockouts, concurrent sessions, impossible travel, resource spikes, missing logs."
    },
    {
      id: "u5l5", title: "Mitigation Techniques and Hardening", domain: 2, obj: "2.5", minutes: 8,
      body: `Mitigation is the set of moves that reduce the impact or likelihood of the attacks you just learned. Most questions in this objective describe a situation and ask for the single most effective technique.

## The techniques
- **Segmentation**: split the network so a compromise stays in its zone. Separate guest, user, server, and industrial networks.
- **Access control**: **ACLs** on firewalls and routers filter traffic; **permissions** on files and systems limit what identities can do.
- **Application allow list**: only approved software runs; everything else is blocked by default. Stronger than a deny list.
- **Isolation**: cut an infected or suspicious system off from everything while it is investigated. Also the answer for systems that cannot be patched.
- **Patching**: remove the vulnerability itself.
- **Encryption**: protect data so theft yields nothing.
- **Monitoring**: detect what prevention missed.
- **Least privilege**: give only the access a role needs, so malware and insiders can do less.
- **Configuration enforcement**: push and verify the secure baseline; correct drift automatically.
- **Decommissioning**: retire old systems properly, wiping data and removing accounts, so they stop being targets.

## Hardening a system
1. **Encrypt** storage and communications.
2. Install **endpoint protection** (antivirus, EDR).
3. Enable the **host-based firewall** and a **host-based intrusion prevention system**.
4. **Disable unused ports and protocols**.
5. **Change default passwords** on every account and device.
6. **Remove unnecessary software** and services.
7. Patch, then apply the baseline and keep it enforced.

## Choosing under pressure
- Malware spreading between hosts: isolation first, then segmentation to stop the next one.
- A system that cannot be patched: isolation or segmentation plus monitoring, a compensating control.
- Users installing unapproved tools: application allow list.
- Attacker moved from a workstation to a server: least privilege and segmentation would have limited it.

> Exam tip: when the question says "most effective" for stopping unknown malware from running, the answer is an application allow list. When it says "contain" an active infection, the answer is isolation.`,
      hook: "Segment, control access, allow-list, isolate, patch, encrypt, monitor, least privilege, enforce configuration, decommission. Harden: encrypt, endpoint protection, host firewall, close ports, change defaults, remove extras."
    }
  ]
});
