// SecPlus Academy deeper explanations, units 1 to 5. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u1l1: `## Two questions about every control
Picture a bank. It has a vault door, a guard, a sign that says "cameras in use," an alarm, an insurance policy, and a rule that two people must open the vault. Every one of those is a security control. The exam sorts them on two axes, and the trick is that the axes are independent: you answer "who applies it" and "what it does" separately.

## Axis 1: category (who applies it)
\`\`\`
Technical     a machine enforces it        firewall, encryption, MFA, IDS, ACL
Managerial    a plan or policy defines it   risk assessment, security policy, vendor review
Operational   a person performs it          guard patrol, running backups, training delivery
Physical      the building enforces it      lock, fence, badge reader, bollard, camera
\`\`\`

The bank: vault door and bollards are physical; the guard is operational; the two-person rule is managerial; the alarm system is technical.

## Axis 2: type (what it does)
\`\`\`
Preventive     stops it            vault door, firewall rule, least privilege
Deterrent      discourages it      "cameras in use" sign, login banner, visible guard
Detective      notices it          alarm, IDS, log review, audit
Corrective     repairs it          restore from backup, incident response, patching after the fact
Compensating   substitutes         extra monitoring where the real fix is impossible
Directive      instructs people    policy, procedure, "badge in" sign
\`\`\`

## The part that trips people up: one control, many cells
The same camera is:
- **Physical** by category, always.
- **Deterrent** if the question says thieves can see it and stay away.
- **Detective** if the question says footage was reviewed after the theft.

A backup is **operational** when a technician runs it and **corrective** when it is used to recover. A policy is **managerial** by category and **directive** by type. So never memorize "camera = detective." Memorize the verbs and read the purpose the question describes.

## Compensating controls, the exam favorite
A compensating control is what you add because the ideal control cannot be used. The classic: a medical device runs an old operating system that cannot be patched. You cannot fix the vulnerability, so you put the device on its own network segment, block everything except the one server it talks to, and watch its traffic. Those controls compensate for the missing patch. Whenever a question says "cannot be patched," "legacy," or "the vendor does not support," expect compensating.

## Worked examples
\`\`\`
Scenario                                                    Category      Type
A login banner warns that activity is monitored             technical     deterrent
The company adopts a policy requiring quarterly reviews     managerial    directive
Guards check badges at the lobby                            operational   preventive
A file integrity monitor alerts on a changed system file    technical     detective
A server is restored from last night's backup               operational   corrective
Extra logging is added to a system that cannot be patched   technical     compensating
\`\`\`

## How the exam asks it
- "Which type of control is a warning sign?" Deterrent.
- "Which category is a risk assessment?" Managerial.
- "The organization cannot patch; what kind of control is the added segmentation?" Compensating.
- "Which control corrects a problem after it occurs?" Corrective.

## What to memorize
- Categories: technical, managerial, operational, physical.
- Types: preventive, deterrent, detective, corrective, compensating, directive.
- Read the purpose in the question; the purpose picks the type.`,

u1l2: `## Three goals, three A's, one comparison
Everything in security serves confidentiality, integrity, or availability. Everything about identity is authentication, authorization, or accounting. And every security program begins by comparing where you are to where you should be. This lesson is vocabulary, but the exam uses it in every domain, so get it exact.

## CIA with the control that proves it
\`\`\`
Goal              Threat it defeats             Controls that deliver it
Confidentiality   disclosure, snooping          encryption, access control, classification, masking
Integrity         tampering, corruption         hashing, digital signatures, change management, file integrity monitoring
Availability      outage, destruction           redundancy, backups, load balancing, DDoS protection, UPS
\`\`\`

Reading a question: the word "disclosed" or "read by" points to confidentiality; "altered," "modified," or "tampered" points to integrity; "unavailable," "down," or "destroyed" points to availability. Ransomware is interesting: it attacks availability (you cannot reach your files) and, if data is also stolen, confidentiality.

## Non-repudiation
Repudiation is denial: "I never sent that order." Non-repudiation makes the denial impossible to sustain. A digital signature does it: the signature could only have been created with the sender's private key, so the sender cannot claim someone else sent it. Audit logs give a weaker form for actions inside systems. Note what a signature does not do: it does not hide the message. Confidentiality needs encryption on top.

## AAA, in order
\`\`\`
Authentication   WHO are you?          password, token, biometric; a device's certificate
Authorization    WHAT may you do?      permissions, roles, policies
Accounting       WHAT did you do?      logs, audit trails, session records
\`\`\`

Authentication always comes first; you cannot authorize an identity you have not verified. And it applies to systems, not just people. A laptop proves itself to the network switch with a certificate through 802.1X. A website proves itself to your browser with a TLS certificate. When a question says "authenticating devices," think certificates.

## Gap analysis
A gap analysis is a structured comparison:
1. Pick the target: a framework, a regulation, a contract, or your own policy.
2. Document the current state, control by control.
3. Record each place where the current state falls short.
4. Assign an owner and a plan to each gap, prioritized by risk.

It comes first, before spending, because it tells you where the spending matters. Questions describe "comparing current controls to a required standard" or "identifying what is missing before an audit."

## How the exam asks it
- "Which principle ensures data has not been altered?" Integrity.
- "Which control provides non-repudiation?" Digital signatures.
- "Which AAA element records user actions?" Accounting.
- "What is performed to determine which requirements are not yet met?" Gap analysis.

## What to memorize
- Confidentiality hides, integrity detects change, availability keeps it reachable.
- Signature gives integrity plus non-repudiation, never confidentiality.
- Authenticate, then authorize, then account.`,

u1l3: `## The castle and the airport
The old model was a castle: a moat and a wall, and once you were inside you could walk anywhere. Attackers learned to get one foothold inside, then roam. Zero trust is an airport instead: your ticket is checked at the door, again at security, again at the gate, and you can only enter the one gate on your boarding pass. Being inside the terminal earns you nothing.

## Two planes
Zero trust separates deciding from doing.
- The **control plane** makes the decisions. It never touches the traffic.
- The **data plane** carries the traffic and enforces the decisions.

\`\`\`
CONTROL PLANE (decides)
   Policy engine ............ evaluates the request against policy: allow or deny
   Policy administrator ..... sends the decision down to the enforcement point
   Adaptive identity ........ how much proof is required depends on context
   Threat scope reduction ... each identity can reach as little as possible
   Policy-driven access ..... rules about identity and device, not network location
            |
            v decision
DATA PLANE (enforces)
   Policy enforcement point . the gate: opens or stays closed
   Implicit trust zone ...... the small area you may move in once admitted
   Subject / system ......... the requester, and the resource it asked for
\`\`\`

## A request, step by step
1. A **subject** (Maria on her laptop) asks for a **system** (the payroll app).
2. The **policy enforcement point** in front of payroll holds the request and asks the control plane.
3. The **policy administrator** passes it to the **policy engine**.
4. The engine checks: is Maria authenticated? Is the laptop managed and patched? Is she in an allowed location? Does her role include payroll? **Adaptive identity** may demand a second factor because she is on a new network.
5. The engine says allow, for payroll only, for this session. The administrator tells the enforcement point to open.
6. Maria reaches payroll and nothing else. That is her **implicit trust zone**. If her device health changes mid-session, the decision can be re-evaluated and access revoked.

## The part that trips people up: engine versus administrator versus enforcement point
Three components, three verbs. The **engine decides**. The **administrator communicates** the decision. The **enforcement point applies** it to traffic. Questions test exactly this separation.

## Why the pieces matter
- **Threat scope reduction** is why a stolen account in a zero trust network is a small problem instead of a catastrophe.
- **Policy-driven access control** is why "I am on the office network" is no longer a credential.
- **Adaptive identity** is why a login from a strange place asks for more.

## How the exam asks it
- "Which component makes the access decision?" Policy engine.
- "Which component is in the data plane and enforces access?" Policy enforcement point.
- "Authentication requirements change based on user behavior and location." Adaptive identity.
- "Limiting the resources any single compromised identity can reach." Threat scope reduction.

## What to memorize
- Never trust, always verify; location is not a credential.
- Control plane: engine decides, administrator communicates, adaptive identity, threat scope reduction, policy-driven access control.
- Data plane: enforcement point, implicit trust zones, subject and system.`,

u1l4: `## The layer software cannot fix
If someone can walk into the server room, encryption on the wire does not matter. Physical security is the first layer, and the exam covers it as a short list of devices and a set of sensors. Deception technology is bundled here because, like a tripwire, it is a control that waits.

## Perimeter to door to room
\`\`\`
Perimeter    fencing, bollards, lighting, cameras
Entrance     guard, badge reader, access control vestibule
Inside       locked rooms, cabinets, sensors, cameras
\`\`\`

- **Bollards** are the short concrete or steel posts in front of buildings. Their only job is to stop a vehicle, whether a ram raid or an accident.
- **Fencing** marks the boundary and buys time. A low decorative fence deters casual entry; a tall fence with a top guard deters serious entry.
- **Lighting** takes away hiding places and gives cameras something to see.
- **Video surveillance** works three ways: visible cameras deter, live monitoring detects, and recordings support investigations.
- **Access badge**: proves identity to a reader and creates a log. Combine it with a PIN or fingerprint for sensitive rooms so a stolen badge alone is useless.
- **Security guard**: the only control that can think. Guards verify identities, notice odd behavior, and respond.
- **Access control vestibule**: two interlocking doors. The outer door must close before the inner door opens, and one badge admits one person, so nobody can slip in behind an employee. This is the specific answer to tailgating.

## Sensors: how each one notices you
\`\`\`
Infrared     detects body heat crossing the field of view
Pressure     detects weight on a floor plate, mat, or step
Microwave    emits waves and detects the change in reflection when something moves
Ultrasonic   the same principle with sound above human hearing
\`\`\`

Microwave and ultrasonic both watch for movement through reflected energy; infrared watches for heat; pressure watches for weight. A question that says "triggered when someone steps on it" is pressure; "detects heat signatures" is infrared.

## Deception: controls that are never touched legitimately
The idea is a tripwire nobody has a reason to cross. Because no legitimate process ever touches a decoy, any touch is a true positive.
- **Honeypot**: a system that looks like a real server, records everything an attacker does, and holds nothing of value. You learn their tools and targets.
- **Honeynet**: several honeypots arranged as a fake network, so the attacker's lateral movement can be watched.
- **Honeyfile**: a document with an irresistible name such as "executive_salaries.xlsx" that alerts when opened, copied, or emailed.
- **Honeytoken**: a fake credential, API key, or database row planted where an attacker would find it. If it is ever used, someone stole it.

## How the exam asks it
- "Prevent an unauthorized person from following an employee through the door." Access control vestibule.
- "Stop a vehicle from driving into the lobby." Bollards.
- "Detect an attacker browsing a file server without alerting on normal use." Honeyfile.
- "Identify that a database was breached when a fake account is used." Honeytoken.

## What to memorize
- Bollards stop cars, vestibules stop tailgating, guards make judgment calls.
- Infrared heat, pressure weight, microwave and ultrasonic motion.
- Honeypot, honeynet, honeyfile, honeytoken: any use means breach.`,

u2l1: `## Why a process for changing things
Ask any experienced administrator what caused the last big outage and the answer is usually "a change." A firewall rule, a patch, a new server, a tweak nobody wrote down. Change management is the discipline that turns "just do it" into "request it, review it, test it, schedule it, do it with a way back, write it down." The exam tests both the process pieces and the technical consequences a change can carry.

## The process, as a story
The web team wants to move the customer portal to a new database version.
1. **Change request**: they write what, why, and when.
2. **Ownership**: one engineer is named as owner and stays accountable through the end.
3. **Stakeholders**: sales, support, and the database team are identified and told.
4. **Impact analysis**: what breaks if it fails? Customers cannot log in. How long? An hour of downtime. What else depends on it? The reporting system.
5. **Test results**: they run the upgrade in a staging environment and attach the results.
6. **Backout plan**: exact steps to return to the old version if the new one fails, with the time it takes.
7. **Approval**: the change advisory board reviews all of the above and approves.
8. **Maintenance window**: Saturday 2 a.m. to 4 a.m., communicated in advance.
9. Implement, test, and **document**: diagrams, procedures, and the configuration record are updated.

For routine, low-risk changes, a **standard operating procedure** replaces the full review: the change is pre-approved as long as the procedure is followed.

## Technical implications: what a change can break
\`\`\`
Allow lists / deny lists      adding or blocking software, sites, or traffic changes what works
Restricted activities         some actions are prohibited during the window or without separate approval
Downtime                      planned unavailability; announce it
Service / application restart most changes only take effect after a restart, which is itself downtime
Legacy applications           old software may not run on the new platform
Dependencies                  changing one system breaks the systems that rely on it
\`\`\`

The dependency trap is the exam's favorite: the database upgrade succeeds, but the reporting system that connects to it was never tested against the new version and fails Monday morning. Impact analysis exists to find that before the change.

## Documentation and version control
Every change ends with documentation: what changed, why, who approved it, and updated diagrams and procedures. **Version control** keeps every previous version of configuration files and code, with who changed what and when. Rolling back becomes "restore the previous version" instead of trying to remember the old settings. It is also evidence for audits.

## How the exam asks it
- "What must be in place before a change is implemented?" Backout plan, impact analysis, test results, approval.
- "Which element identifies systems that could be affected?" Impact analysis, and the dependency list.
- "How can the team quickly revert to the previous configuration?" Version control.
- "An emergency patch was applied at 3 a.m. What is required afterward?" Documentation through the change process.

## What to memorize
- Request, impact analysis, test, backout plan, approve, maintenance window, implement, document.
- Watch dependencies, legacy applications, restarts, downtime, allow and deny lists.
- Version control makes rollback cheap and proves what changed.`,

u2l2: `## Locks with one key, and mailboxes with a slot
There are two kinds of encryption, and the best way to keep them straight is two physical objects.

A **padlock with one key** is symmetric encryption. Whoever has the key can lock and unlock. It is fast and simple, but you have to get the key to the other person somehow, and if you mail it, anyone who intercepts the envelope has it.

A **mailbox with a slot** is asymmetric encryption. Anyone can drop a letter in the slot (the public key), but only the owner has the key to the door (the private key). Nobody needs to exchange a secret in advance.

## Symmetric: fast, for bulk data
\`\`\`
AES         the standard; 128, 192, or 256-bit keys; use AES-256 when in doubt
ChaCha20    fast stream cipher, common on mobile and in TLS
3DES        legacy, slow; replace it
Blowfish, Twofish   older block ciphers you may see named
\`\`\`

Symmetric encryption protects disks, files, databases, and the actual data inside a TLS session. It is thousands of times faster than asymmetric. Its one weakness is key distribution: both sides must share the key without anyone else seeing it.

## Asymmetric: slow, for identity and key delivery
Each party has a **key pair**. The rule that answers every exam question:

\`\`\`
To keep it secret       encrypt with the RECIPIENT'S PUBLIC key   only their private key opens it
To prove who sent it    sign with your OWN PRIVATE key            anyone checks with your public key
\`\`\`

- **RSA**: the classic; needs 2048-bit or longer keys today.
- **ECC** (elliptic curve): the same strength with far shorter keys, so it is faster and suits phones and IoT devices. A 256-bit ECC key is roughly as strong as a 3072-bit RSA key.
- **DSA** and **ECDSA**: signature-only algorithms.

## Key exchange: agreeing on a secret in public
**Diffie-Hellman** is a piece of math that lets two parties each contribute a value, exchange results openly, and both arrive at the same shared secret that an eavesdropper cannot compute. That shared secret becomes the symmetric session key. **ECDHE** is the elliptic-curve version with **ephemeral** keys: a brand new key for every session.

Ephemeral keys give **perfect forward secrecy**. If someone records your traffic today and steals the server's long-term private key next year, they still cannot decrypt today's sessions, because the session key was never derived from that long-term key.

## How TLS puts it together
1. The browser connects. The server sends its certificate, which contains its public key, signed by a CA (asymmetric proves identity).
2. Browser and server run ECDHE to agree on a session key (key exchange).
3. Everything after that is AES or ChaCha20 with the session key (symmetric, fast).

So "which is used to encrypt the web page content" is symmetric, and "which is used to authenticate the server" is asymmetric. Use TLS 1.2 or 1.3; 1.3 removed the weak options entirely.

## Key length and algorithm choice
Longer keys resist brute force longer. Modern guidance: AES-128 is fine, AES-256 for high value; RSA 2048 minimum; ECC 256. Deprecated: DES, 3DES, RC4, MD5, SHA-1, SSL, TLS 1.0 and 1.1.

## How the exam asks it
- "Encrypt a message so only Alice can read it." Alice's public key.
- "Bob wants to prove he wrote the document." Bob's private key.
- "Which is fastest for encrypting a large file?" Symmetric, AES.
- "Compromise of the server key must not expose past sessions." Perfect forward secrecy, ephemeral Diffie-Hellman.
- "Best algorithm for a low-power device." ECC.

## What to memorize
- Symmetric: one key, fast, AES. Asymmetric: key pair, slow, RSA and ECC.
- Recipient's public key to encrypt; your private key to sign.
- Diffie-Hellman agrees on a key; ephemeral keys give forward secrecy.`,

u2l3: `## A fingerprint for data
A hash function takes any input, a word or a ten-gigabyte file, and produces a fixed-length string of bits. Three properties make it useful:
1. The same input always gives the same hash.
2. Any change to the input, even one bit, gives a completely different hash.
3. You cannot work backward from the hash to the input.

That is a fingerprint. You can compare fingerprints to prove two things are identical without comparing the things, and you cannot rebuild a person from a fingerprint.

\`\`\`
Algorithm   Output     Status
MD5         128 bits   broken: collisions can be created on demand
SHA-1       160 bits   deprecated: collisions demonstrated
SHA-256     256 bits   current standard (SHA-2 family, also SHA-512)
SHA-3       256+ bits  newer design, also acceptable
\`\`\`

A **collision** is two different inputs with the same hash. If an attacker can make one, they can substitute a malicious file for a legitimate one and the hashes will still match. That is why MD5 and SHA-1 are out.

## Where hashes show up
- **Integrity checks**: a download page lists the file's SHA-256; you hash your copy and compare.
- **Password storage**: the system stores the hash, never the password. At login it hashes what you typed and compares.
- **Digital signatures**: you sign the hash, not the whole document.
- **HMAC**: a hash computed with a secret key mixed in. Only someone with the key can produce the right value, so it proves integrity and origin at once. APIs and TLS use it.

## Passwords: the two attacks and the two fixes
Attackers who steal a password database attack the hashes offline.

Attack 1: precomputed tables. They hash millions of common passwords in advance and look up matches. Also, everyone who chose "Summer2024" has the same hash, so one crack reveals them all.
Fix: **salting**. Add a random value to each password before hashing and store the salt beside the hash. Now "Summer2024" produces a different hash for every user, and precomputed tables are useless.

\`\`\`
without salt:  hash("Summer2024")            = a1b2...   same for every user
with salt:     hash("x7Qp" + "Summer2024")   = 9f3e...   user 1
               hash("Lm2v" + "Summer2024")   = 04cc...   user 2
\`\`\`

Attack 2: fast guessing. Modern hardware computes billions of SHA-256 hashes per second.
Fix: **key stretching**. Use a function designed to be slow, or iterate the hash thousands of times, so each guess costs the attacker milliseconds instead of nanoseconds. **PBKDF2**, **bcrypt**, **scrypt**, and **Argon2** do this. Users never notice a 100 ms login; attackers trying a billion guesses do.

## Digital signatures, step by step
\`\`\`
SENDER                                     RECEIVER
1. hash the message                        4. decrypt the signature with the sender's PUBLIC key -> original hash
2. encrypt that hash with PRIVATE key      5. hash the received message
3. send message + signature                6. compare: match = intact and authentic
\`\`\`

Why sign the hash and not the message? Asymmetric encryption is slow and the hash is small. What a signature provides: integrity (any change breaks the match), authenticity (only the private key holder could sign), non-repudiation (they cannot deny it). What it does not provide: confidentiality. The message travels in the clear unless separately encrypted.

## Blockchain
A chain of blocks where each block stores the hash of the block before it. Change anything in block 50 and its hash changes, which breaks block 51's stored hash, and so on to the end. Copies of the chain sit with many participants, so a tamperer would have to rewrite every copy. The exam calls this an **open public ledger**: a record anyone can read and nobody can quietly edit.

## How the exam asks it
- "Ensure a downloaded file has not been modified." Compare hashes.
- "Two users with the same password have different stored values." Salting.
- "Make offline password cracking impractically slow." Key stretching.
- "Verify the sender and that the message is unaltered." Digital signature.
- "Which hash algorithm should be replaced?" MD5 or SHA-1.

## What to memorize
- MD5 128 broken, SHA-1 160 deprecated, SHA-256 fine.
- Salt defeats precomputed tables; stretching defeats fast guessing.
- Signature = hash encrypted with the sender's private key.`,

u2l4: `## The problem PKI solves
Asymmetric encryption says "encrypt with the recipient's public key." Fine, but when a website hands your browser a public key, how do you know it belongs to your bank and not to an attacker sitting in the middle? You need someone you already trust to vouch for it. That is a certificate: the public key, the identity, and a signature from a trusted authority, all in one document.

## The trust chain
\`\`\`
Root CA (offline, in every browser's trust store)
   |  signs
Intermediate CA (online, does the daily work)
   |  signs
Leaf certificate (www.bank.example, public key, validity dates, purpose)
\`\`\`

Your browser trusts the root because it shipped with it. The root signed the intermediate, the intermediate signed the bank's certificate, so the browser trusts the bank's public key. That is the **root of trust** and the **chain**. Keeping the root offline protects the whole system: if an intermediate is compromised, it can be revoked without replacing every browser's trust store.

The **registration authority** is the part of the CA's operation that checks identity before issuance: proving you control the domain, or for higher assurance, that the company exists.

## Getting a certificate, in order
1. On the server, generate a key pair. The **private key never leaves the server**.
2. Build a **certificate signing request (CSR)**: the public key plus the identity details, signed with the private key to prove you hold it.
3. Send the CSR to the CA. The RA validates. The CA signs and returns the certificate.
4. Install the certificate and the intermediate chain on the server.

If a question asks what is sent to the CA, the answer is the CSR containing the public key. Never the private key.

## Revocation: CRL versus OCSP
Certificates expire, but sometimes they must die early: the private key leaked, or the server was retired.
\`\`\`
CRL     the CA publishes a list of revoked serial numbers; clients download it on a schedule
        simple; can be hours or days stale; large lists
OCSP    the client asks the CA "is this one certificate still good?" in real time
        current; adds a round trip; reveals what sites you visit to the CA
OCSP stapling   the server fetches a fresh signed OCSP answer and attaches it to the handshake
        current and fast, no client round trip, no privacy leak
\`\`\`

## Kinds of certificates
- **Self-signed**: signed by its own private key. Nobody vouches for it, so browsers warn. Fine for an internal test box or a lab, never for users on the internet.
- **Third-party**: issued by a public CA; trusted automatically.
- **Wildcard**: {{*.example.com}} covers mail.example.com, www.example.com, any single label. Convenient; one compromised key affects every subdomain.
- **Subject alternative name (SAN)**: a list of specific hostnames on one certificate.
- Purpose-specific: code signing (proves software came from the publisher), email (S/MIME), user and device certificates for 802.1X.

## Formats
\`\`\`
PEM      Base64 text between BEGIN and END lines; .pem, .crt, .cer     certificate or key
DER      the same data in binary; .der, sometimes .cer                 certificate
PFX/P12  a password-protected bundle WITH the private key; .pfx, .p12  moving a cert plus key
P7B      a chain of certificates, NO private key; .p7b                 distributing a chain
\`\`\`

## Key escrow
A trusted third party, often the organization itself, keeps a copy of private keys. If an employee leaves or loses a key, encrypted data can still be recovered. The trade-off is that the escrow becomes a high-value target and must be protected.

## How the exam asks it
- "Users receive a certificate warning on the internal portal." Self-signed, or the intermediate chain is missing.
- "Check revocation status without downloading a large list." OCSP.
- "Improve performance of revocation checking on the server." OCSP stapling.
- "One certificate for all subdomains." Wildcard.
- "Export the certificate together with its private key." PFX or P12.
- "Recover files encrypted by a former employee." Key escrow.

## What to memorize
- Chain: leaf, intermediate, root. Root is the trust anchor and stays offline.
- CSR carries the public key; the private key never leaves the server.
- CRL is a list, OCSP is a question, stapling is the answer attached in advance.`,

u2l5: `## Where to put the lock decides what the thief gets
Encryption can be applied at different levels, and each level answers a different threat. Picture a filing cabinet.

\`\`\`
Full-disk        the whole cabinet is welded shut       lost or stolen laptop
Partition/volume one drawer is locked                   separate sensitive from ordinary data
File             one folder is locked                   protection follows the file when copied
Database         the whole database store is locked     stolen database files are unreadable
Record           one line on one page is locked         the DBA can run queries but never sees card numbers
Transport        the courier's van is armored           data on the network between systems
\`\`\`

The exam gives a threat and wants the level.
- "Laptops are being stolen from cars": full-disk encryption. Even the operating system files are unreadable without the key.
- "Database administrators must not be able to read customer card numbers": record-level, encrypting that column with a key the DBA does not hold.
- "Files copied to USB drives must stay protected": file-level, because the protection travels with the file.
- "Data between the web server and the database must be protected": transport encryption, TLS.

## Where to keep the keys
Encryption is only as strong as the place the key lives. If the key sits in a file next to the data, the thief gets both. The exam names four hardware or service answers.

- **TPM (Trusted Platform Module)**: a chip on the motherboard. It stores keys so they never appear in software, and it measures the boot process so tampering with the bootloader is detected. Full-disk encryption ties the disk key to the TPM: the drive only unlocks in its own computer, and only if the boot chain is unmodified.
- **HSM (Hardware Security Module)**: a dedicated tamper-resistant device, an appliance in a rack or a card in a server. It generates and stores keys and performs signing and encryption inside itself, so the key is never exposed. Certificate authorities, payment processors, and code-signing systems use them.
- **KMS (Key Management Service)**: a service, usually in the cloud, that creates keys, controls who may use them, rotates them, and logs every use. Applications ask the KMS to encrypt or decrypt instead of holding keys themselves.
- **Secure enclave**: an isolated region inside a processor with its own memory that the main operating system cannot read. Phones keep fingerprint and face templates and payment keys there.

Quick distinction: TPM is per machine and built in; HSM is a separate high-assurance device; KMS is a managed service; the enclave is inside the CPU.

## Obfuscation: making data less useful without full encryption
- **Steganography** hides the existence of data by embedding it in something innocent: a message in the low bits of an image, or in the silence of an audio file. The observer does not know there is anything to look for.
- **Tokenization** replaces a sensitive value with a random token. The real value is stored in a separate, tightly protected vault, and only the vault can map the token back. A store that keeps tokens instead of card numbers has nothing worth stealing.
- **Data masking** shows only the part of a value that a person needs: the last four digits of a card, the first letter of a surname. The full value still exists, but the display is limited.

\`\`\`
Original card number   4111 1111 1111 1234
Tokenized              tok_8f3a9c2e (vault maps it back)
Masked                 xxxx xxxx xxxx 1234
Encrypted              3kd9$Lp0... (key maps it back)
\`\`\`

## How the exam asks it
- "Ensure a stolen laptop's data cannot be read." Full-disk encryption with a TPM.
- "Store keys so they cannot be extracted even by administrators." HSM.
- "A cloud application needs centralized key creation and rotation." KMS.
- "Hide a message inside an image file." Steganography.
- "Retailer stores a substitute value instead of the card number." Tokenization.
- "Customer service sees only the last four digits." Data masking.

## What to memorize
- Match the encryption level to the threat: full-disk for lost devices, record for one column, file for portability, transport for the wire.
- TPM on the board, HSM in the rack, KMS in the cloud, enclave in the chip.
- Steganography hides, tokenization substitutes, masking partially reveals.`,

u3l1: `## Profile the attacker before you defend
A bank guards against robbers differently than against embezzlers. Security is the same: the right defenses depend on who is likely to attack and why. The exam gives you a scenario and asks for the actor, or gives the actor and asks for the motive. Learn each one as a profile with three attributes and a motive.

## The profiles
\`\`\`
Actor               Internal/external   Resources     Sophistication   Typical motive
Nation-state        external            vast          highest          espionage, war, disruption
Organized crime     external            high          high             financial gain
Hacktivist          external            low-moderate  varies           political or philosophical, disruption
Insider threat      internal            has access    varies           revenge, financial gain, or accidental
Unskilled attacker  external            low           low              chaos, notoriety, curiosity
Shadow IT           internal            n/a           n/a              convenience; not malicious
\`\`\`

## Each one in a sentence
- **Nation-state**: a government team with a budget measured in years. They write custom malware, exploit zero-days, and stay hidden in a target for months. This is the **advanced persistent threat**. Targets: other governments, defense contractors, infrastructure, companies with valuable intellectual property.
- **Organized crime**: professional criminals running a business. Ransomware with help desks, stolen data sold in bulk, fraud at scale. If the scenario ends with a demand for money, this is the actor.
- **Hacktivist**: attacks to make a statement. Website defacement, leaking documents, denial of service against an organization they oppose. Skill varies from amateur to expert; the motive is the tell.
- **Insider threat**: an employee, contractor, or partner. They do not need to break in; they are already in. Malicious insiders steal data for a competitor, sabotage systems out of revenge, or sell access. Unintentional insiders click the phishing link or misconfigure the storage bucket. Both count.
- **Unskilled attacker**: runs tools and scripts written by others without understanding them. Low capability but numerous, and an unpatched system falls to them just the same.
- **Shadow IT**: the marketing team that set up its own cloud file share because the approved one was slow. Nobody is attacking, but the data is now outside every control: unpatched, unmonitored, unbackedup, and unknown to security.

## The three attributes
Questions often describe attributes instead of naming the actor.
- **Internal versus external**: does the actor already have legitimate access? Only the insider and shadow IT are internal.
- **Resources and funding**: nation-states and organized crime can sustain long campaigns; hacktivists and unskilled attackers cannot.
- **Level of sophistication**: custom tooling and zero-days at the top, downloaded scripts at the bottom.

"Well funded and highly sophisticated" narrows to two: nation-state or organized crime. The motive breaks the tie. Espionage or war: nation-state. Money: organized crime.

## Motivations
Data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical or political beliefs, ethical (authorized testers), revenge, disruption or chaos, war. Several actors share motives; that is why the attributes matter too.

## Worked scenarios
- Malware found on a power utility's control network, dormant for eight months, unique code never seen before: nation-state.
- Files encrypted, a portal offers a discount for paying within 72 hours: organized crime.
- The company home page now displays a manifesto about its environmental record: hacktivist.
- A departing engineer emailed the source code repository to a personal account: insider threat.
- A scan finds an unregistered server running an unpatched database that a department set up: shadow IT.
- Attack traffic matches a freely downloadable tool, unmodified, run against every public address: unskilled attacker.

## What to memorize
- Nation-state: funded, patient, espionage. Organized crime: money. Hacktivist: a cause.
- Insider: already inside, malicious or accidental. Unskilled: borrowed tools. Shadow IT: unapproved, not malicious.
- Internal versus external, resources, sophistication.`,

u3l2: `## Doors, and the number of doors
A threat vector is a door an attack comes through. The attack surface is the count of every door, window, and vent that exists. Two ideas the exam tests: recognizing the vector from a scenario, and knowing that shrinking the surface is a control in itself.

## The vectors, grouped
\`\`\`
Messages         email, SMS, instant messaging            links, attachments, fake requests
Content          image-based, file-based                  malicious images, macros, disguised executables
Voice            phone calls (vishing)                    talk a person into acting
Removable media  USB drives                               dropped in the lot, carried between networks
Software         vulnerable, unsupported                  unpatched apps, end-of-life systems
Exposure         open service ports, default credentials  a door with no lock
Networks         unsecure wireless, wired, Bluetooth      open Wi-Fi, live jacks, discoverable devices
Supply chain     MSPs, vendors, suppliers                 trusted parties as the path in
\`\`\`

## The ones with a twist
- **Client-based versus agentless**: this is about how you check for vulnerable software. Client-based means an agent installed on each machine reports what is there. Agentless means a scanner examines machines from the network. Same goal, different method; a question may ask which requires software on the endpoint (client-based).
- **Unsupported systems**: an operating system past end-of-life will never get another patch. Every flaw found from now on is permanent. The vector stays open until the system is replaced or isolated.
- **Open service ports**: each listening service is reachable code. A port that serves nothing you need is pure risk.
- **Default credentials**: the manufacturer's admin password is printed in the manual and indexed on the internet. Devices installed and never changed are the easiest entry there is.
- **Supply chain**: you did not open this door; someone you trust did. A managed service provider's stolen credentials reach every customer. A vendor's poisoned update installs itself on every system that trusts the vendor. A supplier's hardware arrives already compromised.

## Reading scenarios
- "Employees received a text with a link to update their payroll details": message-based, SMS (smishing).
- "A user opened a spreadsheet and enabled macros": file-based.
- "A visitor plugged a laptop into a conference room jack and reached the server network": unsecure wired network; the fix is port security or 802.1X.
- "Attackers logged into the camera system with admin/admin": default credentials.
- "The breach originated from the company that manages our backups": supply chain, managed service provider.

## Shrinking the attack surface
Every vector has a matching closing move.
\`\`\`
open ports              close what is unused; firewall the rest
default credentials     change on install; enforce with a baseline
unsupported systems     replace, or isolate and monitor
vulnerable software     patch; scan with agents or agentless tools
unsecure wireless       WPA3, enterprise authentication
live wired jacks        port security, 802.1X, disable unused ports
removable media         device control policies, training
supply chain            vendor assessment, signed updates, monitor third-party access
\`\`\`

## How the exam asks it
- "Which vector is exploited when a user inserts a found USB drive?" Removable device.
- "A vendor's software update contained a backdoor." Supply chain.
- "Which requires installing software on each host?" Client-based vulnerability scanning.
- "Reduce the attack surface of a new server." Disable unnecessary services and close unused ports.

## What to memorize
- Vectors: message, image, file, voice, removable media, vulnerable and unsupported software, open ports, defaults, unsecure networks, supply chain.
- Attack surface: count the doors; every unnecessary door is closed.`,

u3l3: `## Hacking the human
A firewall enforces its rules every time. A person can be talked out of theirs. Social engineering is the collection of techniques for doing that, and the exam expects you to name the technique from a two-sentence story. Every technique presses one of a few buttons: **authority** (the boss said so), **urgency** (right now or else), **fear** (your account will be closed), **familiarity** (we met last week), or **trust** (this looks exactly like the real thing).

## The message family
\`\`\`
Phishing          email pretending to be legitimate; steals credentials or delivers malware
Spear phishing    phishing aimed at a specific person, using details about them
Whaling           spear phishing aimed at an executive
Smishing          phishing by SMS text message
Vishing           phishing by voice call, often with a spoofed caller ID
Business email    a real or convincing business account asks for a payment or bank-detail change
compromise (BEC)  the request looks routine, so it is approved
\`\`\`

BEC deserves attention because it causes the largest losses. No malware, no link, just an email that appears to come from the CFO: "Please update the vendor's bank account to this new number before the payment run." The defense is not a filter. It is a procedure: any change to payment details is verified by a phone call to a known number, never by replying to the email.

## The pretending family
- **Pretexting**: the attacker invents a plausible story that makes the request reasonable. "This is the help desk; we are migrating mailboxes tonight and need your password to move yours."
- **Impersonation**: acting as a specific person, in person, by phone, or by email. The fake technician in a branded shirt. The "CEO" on a text message.
- **Brand impersonation**: acting as a known company. Fake login pages, fake support numbers, fake invoices with the right logo.
- **Typosquatting**: registering domains one keystroke from the real one: rnicrosoft.com, examp1e.com. Used for fake sites and for email that survives a glance.
- **Watering hole**: instead of attacking the target directly, compromise a website the target's staff already visit, such as an industry news site, and wait for them to arrive.

## The influence family
- **Misinformation**: false content spread by people who believe it is true.
- **Disinformation**: false content created and spread deliberately.
Both appear in campaigns that shape opinion, damage a company's reputation, or create confusion during an actual attack.

## The in-person family
- **Tailgating**: following someone through a secured door. Also called piggybacking when the employee knowingly holds the door.
- **Shoulder surfing**: reading a screen, keypad, or badge over someone's shoulder, in the office or on a train.
- **Dumpster diving**: pulling org charts, invoices, and sticky notes with passwords out of the trash.

## Defenses are procedures, not products
\`\`\`
Attack            Defense that works
BEC               out-of-band verification for payment changes; separation of duties
Phishing          training, reporting button, email authentication (SPF, DKIM, DMARC), MFA
Pretexting        never give credentials to a caller; help desks never ask for passwords
Tailgating        access control vestibule, badge for every person, challenge strangers
Shoulder surfing  privacy screens, awareness
Dumpster diving   shredding, secure disposal
Typosquatting     register look-alike domains, browser warnings, training
\`\`\`

## How the exam asks it
- "An email from the CEO asks accounting to wire funds urgently to a new account." BEC; verify by phone.
- "A caller claims to be from IT and asks for the user's password to fix an issue." Pretexting.
- "Employees visiting an industry forum were infected." Watering hole.
- "A domain similar to the company's is hosting a fake login page." Typosquatting.
- "Someone in a delivery uniform walked in behind an employee." Tailgating.

## What to memorize
- Phishing email, smishing text, vishing voice, spear phishing targeted, whaling executives, BEC payments.
- Pretexting is the story, impersonation is the role, brand impersonation is the company, typosquatting is the domain, watering hole is the poisoned site.
- Misinformation believed, disinformation deliberate.`,

u4l1: `## Bugs with a shape
A vulnerability is a flaw an attacker can use. Application and operating system flaws are the most common class, and the ones on the exam each have a recognizable shape. Learn the shape and the scenario names itself.

## Buffer overflow
A program sets aside a fixed-size area of memory (a buffer) for input, say 64 characters for a name. It copies the input in without checking the length. Send 500 characters and the extra 436 spill over into neighboring memory.

\`\`\`
memory:  [ name buffer: 64 bytes ][ other variables ][ return address ]
input:   AAAAAAAAAAAAAAAAAAAAAAAA...AAAAAAAAAAAAAAAAAAAA[ attacker's address ]
result:  the return address now points at the attacker's code
\`\`\`

When the function finishes, the processor jumps to the overwritten return address, which the attacker set to point at code they included in the input. The program is now running attacker code with the program's privileges. Defenses: patch the software, check input lengths, write in memory-safe languages, and enable operating system protections such as address space layout randomization and non-executable stacks that make the jump unreliable.

## Memory injection
Instead of overflowing, the attacker writes code directly into the memory of a running process and makes the process execute it. Because nothing is written to disk, file-scanning antivirus sees nothing. The code runs with the injected process's privileges, so injecting into a system service is a full compromise. Defense: endpoint detection tools that watch process behavior and memory, not just files; patching the injection vector.

## Race conditions and TOC/TOU
A race condition happens when two operations run at the same time and the result depends on which finishes first. The security version is **time-of-check to time-of-use**:

\`\`\`
1. Program checks: "is /tmp/report.txt a normal file the user may read?"  -> yes
2. Attacker, in the microseconds after the check, replaces /tmp/report.txt with a link to /etc/shadow
3. Program uses the file, reading the password hashes it never would have approved
\`\`\`

The check was correct at the time; the world changed before the use. Defenses: make check and use a single atomic operation, lock the resource between them, or avoid re-opening by name. This is a logic bug that only the developer can fix; no firewall or patch from elsewhere helps.

## Malicious update
The update mechanism is trusted by design: it runs with high privileges and installs on every machine automatically. If an attacker compromises the vendor's build system or signing key, the poisoned update installs everywhere at once. Defenses: verify update signatures, watch vendor security notices, stage updates on a test group before wide rollout, and monitor for unexpected behavior after updates.

## Operating system vulnerabilities
Kernels, drivers, and system services have flaws like any software. Unpatched systems, insecure defaults, unnecessary services, and weak permissions on system files are the everyday operating system vulnerabilities. The fix is the routine: patch on a schedule, apply a hardened baseline, remove what is not needed, and detect drift.

## Reading the scenario
\`\`\`
"Sent a very long string, the service crashed, then a shell opened"     buffer overflow
"The malware runs entirely in memory; the disk is clean"                memory injection
"The file passed validation but was swapped before it was used"         race condition (TOC/TOU)
"The compromise arrived through the vendor's official update"           malicious update
"The server has not been patched in two years"                          OS vulnerability
\`\`\`

## How the exam asks it
- "Which vulnerability allows attacker code to run by exceeding a memory boundary?" Buffer overflow.
- "Which attack exploits the gap between validating a resource and using it?" TOC/TOU race condition.
- "Malware was distributed through a trusted software update." Malicious update, a supply chain vector.

## What to memorize
- Buffer overflow: too much input, overwritten return address.
- Memory injection: code planted in a running process, nothing on disk.
- Race condition, TOC/TOU: checked, swapped, used.
- Malicious update: poison through a trusted channel; verify signatures and stage rollouts.`,

u4l2: `## Four more families
Web, hardware, virtualization, and cloud vulnerabilities each have one or two members the exam wants you to spot instantly.

## Web applications
**SQL injection.** A web form takes what you type and pastes it into a database query.

\`\`\`
The code builds:   SELECT * FROM users WHERE user='[input]' AND pass='[input]'
Attacker types:    ' OR 1=1 --
The query becomes: SELECT * FROM users WHERE user='' OR 1=1 --' AND pass=''
\`\`\`

"1=1" is always true and "--" comments out the rest, so the query returns every user and the attacker is logged in as the first one, often the administrator. Variations dump whole tables or delete them. The tell in a question: a single quote in a form field produces a database error, or unexpected data appears. Defense: **parameterized queries** (the input is passed as data, never as part of the command) and input validation.

**Cross-site scripting (XSS).** The attacker gets script into a page that other users load: a comment field, a profile name, a search result. When the victim's browser renders the page, the script runs as if the site wrote it, and it can read the victim's session cookie, change the page, or send requests as the victim. Stored XSS lives in the database; reflected XSS is in a crafted link. Defense: encode output so script is displayed as text, validate input, and set a content security policy.

The distinction: SQL injection runs on the server against the database. XSS runs in other users' browsers.

## Hardware
- **Firmware**: the software inside a device, from a laptop's UEFI to a router's operating system. Flaws here survive reinstalling the OS, and firmware is patched far less often than software. Include it in the patch cycle and verify firmware signatures.
- **End-of-life**: the vendor has stopped support; no more patches ever. **Legacy**: old technology still in use because something depends on it. Both mean every new flaw is permanent. The answer is replace, and until then isolate and monitor as a compensating control.

## Virtualization
- **VM escape**: code inside a guest breaks out of the virtual machine and runs on the hypervisor or host. From there it can reach every other guest on that host. This is the most serious virtualization flaw; hosting providers treat it as an emergency. Defense: patch the hypervisor promptly, minimize guest-to-host integrations, and keep sensitive workloads on dedicated hosts.
- **Resource reuse**: when a VM is deleted, its memory and storage are handed to the next tenant. If they are not wiped first, the new tenant can read fragments of the old tenant's data. Defense: providers must zero memory and storage before reallocation; customers should encrypt their own data so leftovers are unreadable.

## Cloud-specific
Most cloud breaches are not clever. A storage bucket left publicly readable. An identity policy that grants far more than needed. A management API reachable from the internet with a weak key. Underneath these is a misunderstanding of the **shared responsibility model**: the provider secures the physical infrastructure and the platform; the customer secures data, identities, configuration, and access. Defense: configuration scanning, least-privilege identities, private endpoints, and knowing which side of the line each control is on.

## Reading the scenario
\`\`\`
"A single quote in the login field returned a database error"          SQL injection
"Users report a pop-up on the forum that sends their cookie elsewhere"  XSS
"The router's flaw persists after the OS is reinstalled"                firmware
"The imaging system runs an OS the vendor stopped supporting"            end-of-life / legacy
"A guest VM gained access to other customers' VMs on the host"           VM escape
"Newly provisioned storage contained another company's data"             resource reuse
"Backups were accessible to anyone with the URL"                         cloud misconfiguration
\`\`\`

## What to memorize
- SQL injection: ' OR 1=1, server side, parameterized queries.
- XSS: script in a page, runs in other browsers, output encoding.
- VM escape reaches the host; resource reuse leaks between tenants.
- Cloud: customer misconfiguration is the usual cause; shared responsibility.`,

u4l3: `## Vulnerabilities of trust
The last five classes are about things you trusted without checking: your providers, your algorithms, your default settings, your app store, and the assumption that someone has already fixed the bug.

## Supply chain
Every organization runs on components made by others. Compromise the component and you compromise everyone who uses it.
\`\`\`
Service provider   an MSP, cloud provider, or contractor with access to your systems
Hardware provider  devices arriving with compromised firmware or counterfeit parts
Software provider  libraries, packages, and applications poisoned upstream
\`\`\`

A developer adds an open-source library; months later an attacker takes over the library's maintainer account and pushes a version with a backdoor; every build that pulls the update ships the backdoor. Defenses: assess vendors before and during the relationship, require security terms in contracts, verify signatures on software and firmware, keep an inventory of components (a software bill of materials), and monitor what third parties do with their access.

## Cryptographic
The algorithm can be perfect and the system still broken.
- **Weak or deprecated algorithms**: MD5, SHA-1, DES, 3DES, RC4, SSL, TLS 1.0 and 1.1.
- **Short keys**: RSA 1024, anything that brute force can reach.
- **Homemade cryptography**: "we wrote our own" almost always means broken.
- **Poor randomness**: predictable keys from a weak random number generator.
- **Downgrade**: the protocol allows a fallback to a weak option and an attacker forces it.
Defenses: current algorithms, adequate key lengths, well-tested libraries, disable legacy protocol versions and ciphers.

## Misconfiguration
By volume, the most common vulnerability in the world. Nothing is broken; something was set wrong or left at default.
- Open ports and unnecessary services.
- Default accounts and passwords.
- Verbose error messages that reveal versions and paths.
- Directory listing enabled, permissive file shares, world-readable storage.
- Logging disabled, so nothing is noticed.
Defenses: secure baselines applied at build time, configuration management that detects drift, regular scanning, and change control so settings do not quietly change.

## Mobile devices
- **Side loading**: installing an app from outside the official store. The store's review and signature checks are bypassed, so the app can be anything.
- **Jailbreaking** (iOS) and **rooting** (Android): removing the operating system's built-in restrictions to gain full control. The user gets freedom; so does every piece of malware, which now runs with the same full control.
Defense: mobile device management that detects jailbroken or rooted devices and blocks them from corporate resources, and policies against side loading.

## Zero-day
A zero-day is a vulnerability attackers are exploiting before the vendor has released a patch, sometimes before the vendor knows it exists. The name means the defenders have had zero days to prepare. There is nothing to install.

What you do instead, until the patch arrives:
1. Learn about it: threat intelligence feeds, vendor advisories.
2. Reduce exposure: disable the vulnerable feature, block the port, segment the affected systems.
3. Watch harder: add detection rules for the exploit's behavior.
4. Patch the moment it is available.
Those interim measures are compensating controls.

## Reading the scenario
\`\`\`
"A dependency in the build was replaced by a malicious version"    software supply chain
"The app uses RC4 and 1024-bit RSA"                                 cryptographic
"The camera still uses admin/admin and has directory listing on"    misconfiguration
"Employees installed an app from a link, not the store"             side loading
"The phone's OS restrictions were removed by the user"              jailbreaking / rooting
"Exploit is active and the vendor has no fix yet"                   zero-day
\`\`\`

## What to memorize
- Supply chain: service, hardware, software providers; verify and inventory.
- Cryptographic: weak algorithms, short keys, downgrade.
- Misconfiguration: the most common; baselines and drift detection.
- Side loading bypasses the store; jailbreaking removes protections.
- Zero-day: no patch; compensating controls until there is one.`,

u5l1: `## Malware by its tell
Malware questions almost never say "which malware encrypts files." They describe what a user saw or what an analyst found, and you name the type. So learn each type as a symptom.

\`\`\`
Type          Tell
Ransomware    files unreadable with new extensions, a note demanding payment
Trojan        trouble began right after installing a "free" program
Worm          many machines infected within minutes, no one clicked anything
Virus         infection spread when a file was opened or shared
Spyware       activity reported to a third party; browser and settings changed
Keylogger     credentials stolen although no phishing occurred
Bloatware     factory-installed software nobody asked for, using resources and collecting data
Logic bomb    damage on a specific date or when a specific event happens
Rootkit       antivirus is clean but symptoms continue; malware returns after removal
\`\`\`

## The ones people confuse
**Virus versus worm.** A virus attaches itself to a file or program and spreads when a person runs or shares it. A worm needs no person; it scans for vulnerable machines and copies itself over the network. "Spread across the entire network overnight with no user action" is a worm.

**Trojan versus virus.** A trojan is disguised as something wanted: a game, a utility, a document. The user installs it deliberately, believing it is legitimate. It does not self-replicate. A **remote access trojan (RAT)** opens a back door so the attacker can control the machine.

**Spyware versus keylogger.** A keylogger is a kind of spyware that specifically records keystrokes. If the question is about stolen passwords with no other explanation, keylogger. If it is about tracking behavior or changed browser settings, spyware.

**Logic bomb.** Planted code that waits. The classic story: a system administrator is fired, and two weeks later, on the date their access would have been reviewed, the scripts delete the backups. The trigger is the tell, and the actor is usually an insider.

**Rootkit.** The rootkit's whole purpose is to hide, at the kernel or firmware level, below where antivirus looks. It hides files, processes, and network connections, including other malware. Symptoms without findings is the signature. Because you cannot trust anything the compromised operating system reports, the reliable fix is to wipe the system and reinstall from trusted media, and check firmware.

## Ransomware, the exam's favorite
Modern ransomware also steals data before encrypting, then threatens to publish it (double extortion). The response order matters:
1. **Isolate** the infected systems immediately to stop the spread.
2. Identify the strain and the entry point.
3. **Restore from backups** that were offline or immutable, so they were not encrypted too.
4. Close the entry point before reconnecting.
Paying is unreliable and funds the next attack; tested offline backups are the control that makes payment unnecessary.

## How it gets in, and what stops it
\`\`\`
Entry                            Control
phishing attachment              email filtering, training, macro blocking
malicious download               web filtering, application allow list
drive-by from a compromised site web filtering, patched browsers
removable media                  device control policy
unpatched service                patching, segmentation
poisoned update                  signature verification, staged rollout
\`\`\`

Across all of them: endpoint protection and EDR to detect behavior, least privilege so malware runs with fewer rights, and an application allow list so unknown code does not run at all.

## How the exam asks it
- "Spread to every workstation with no user interaction." Worm.
- "The sabotage occurred on the anniversary of the layoffs." Logic bomb.
- "Antivirus reports nothing, yet outbound connections continue." Rootkit.
- "What is the first response when ransomware is detected on a workstation?" Isolate it from the network.
- "Which control lets the organization recover without paying?" Offline, tested backups.

## What to memorize
- Ransomware encrypts, trojan disguises, worm self-spreads, virus needs a user, spyware and keyloggers watch, bloatware is factory junk, logic bomb waits, rootkit hides.
- Ransomware: isolate, then restore from offline backups.`,

u5l2: `## Attacks you can see in the traffic
Network attacks leave patterns: a flood, a wrong answer, a fake access point, a connection that should not exist. Learn each pattern and the single control that breaks it.

## Denial of service
The goal is to make a service unavailable by exhausting it. **DoS** comes from one source; **DDoS** from thousands, usually a botnet of compromised devices. Two tricks make small attackers into large ones:

\`\`\`
Reflected    the attacker sends requests with the VICTIM'S address as the source;
             the servers reply to the victim, who never asked
Amplified    the attacker picks a service whose reply is far larger than the request
             (a 60-byte DNS query can return a 3,000-byte answer); 50x the traffic for free
\`\`\`

Put together: the attacker sends small spoofed queries to thousands of open DNS or NTP servers, and each one sends a large reply to the victim. Defense: upstream scrubbing services that absorb the flood, rate limiting, and making sure your own servers are not open reflectors.

## DNS attacks
DNS turns names into addresses, so lying to DNS redirects users while the address bar looks correct.
- **Cache poisoning**: a forged answer is planted in a resolver's cache, and every client of that resolver gets the wrong address until it expires.
- **Spoofing**: answering a query faster than the real server.
- **Domain hijacking**: taking over the registrar account and pointing the domain elsewhere.
Defense: DNSSEC signs answers so forgeries are rejected; DNS filtering blocks known-bad names; registrar locks and MFA protect the account.

## Wireless
- **Evil twin**: the attacker's access point broadcasts your SSID with a stronger signal. Devices connect to it, and everything they send passes through the attacker.
- **Deauthentication**: management frames that tell a client to disconnect are unauthenticated in older Wi-Fi, so an attacker can forge them, kick clients off, and capture the reconnection handshake or push them onto the evil twin.
- **Rogue access point**: any AP on your network that you did not authorize, including the one an employee plugged in for convenience. It is an unmonitored door.
Defense: WPA3 and protected management frames (which stop forged deauth), enterprise authentication with 802.1X so an evil twin cannot impersonate the RADIUS server, and wireless intrusion detection to spot rogue APs.

## On-path
The attacker positions between two parties and relays traffic, reading or altering it. On a LAN this is done with ARP poisoning: the attacker's MAC is advertised as the gateway's. On Wi-Fi, the evil twin is the on-path position. Defense: encryption end to end (TLS, VPN) so what the attacker relays is unreadable, dynamic ARP inspection on switches, and certificate validation so a fake server is rejected.

## Credential replay
The attacker captured something used to log in, a password hash, a Kerberos ticket, a session cookie, and simply sends it again. No cracking needed. Defense: MFA (the replayed credential is not enough), short-lived tokens that expire, nonces and timestamps that make each authentication unique, and encrypted channels so nothing is captured.

## Malicious code in transit
Exploit traffic aimed at a listening service, drive-by downloads, and command-and-control beacons from already-infected hosts calling home on a schedule. Defense: intrusion prevention signatures, egress filtering so infected hosts cannot reach out freely, and DNS monitoring for the regular beacon pattern.

## Reading the scenario
\`\`\`
"Huge inbound DNS responses from servers we never queried"      reflected, amplified DDoS
"Users are sent to a fake bank site though they typed it right"  DNS poisoning
"A network with our SSID appears in the parking lot"              evil twin
"Clients keep disconnecting, then reconnect to a new AP"          deauthentication into an evil twin
"The attacker logged in with a captured session token"            credential replay
"A host contacts the same external address every 60 seconds"     command-and-control beaconing
\`\`\`

## What to memorize
- Reflected spoofs the source; amplified multiplies the size. Open resolvers are the amplifiers.
- DNSSEC for poisoning. WPA3 and 802.1X for evil twins and deauth.
- On-path is defeated by end-to-end encryption. Replay is defeated by MFA and expiring tokens.`,

u5l3: `## Attacks on code and on math
Application attacks abuse the way software handles input, sessions, and privilege. Cryptographic attacks abuse weak algorithms or weak negotiation. Each has a one-line signature.

## Application attacks
\`\`\`
Injection             untrusted input executed as a command or query (SQL, OS command, LDAP)
Buffer overflow       oversized input overwrites memory and runs attacker code
Replay                a captured legitimate request is sent again
Privilege escalation  a low-privilege user gains higher rights
Forgery (CSRF)        the victim's browser is tricked into sending a request the attacker wrote
Forgery (SSRF)        the server is tricked into making a request the attacker chose
Directory traversal   ../ sequences in a path reach files outside the intended folder
\`\`\`

**Injection.** The same flaw in three costumes. SQL injection puts database commands in a form field. Command injection puts shell commands in a field the server passes to the operating system ({{; rm -rf /}} appended to a filename). LDAP injection puts directory filters in a login field. All three share a fix: treat input as data, never as code; validate it; use parameterized interfaces.

**Replay.** The attacker does not need to understand a request, only to record and resend it. A recorded "transfer 500 dollars" request sent ten times is ten transfers. Defenses make each request unique: a one-time token, a timestamp with a short window, a sequence number.

**Privilege escalation.** **Vertical**: a user becomes an administrator, usually by exploiting a flaw in a privileged service. **Horizontal**: a user accesses another user's data at the same level, usually by changing an ID in a URL. Defenses: patching, least privilege, and authorization checks on every request, not just at login.

**Forgery.** Two directions of the same trick.
- **Cross-site request forgery (CSRF)**: you are logged into your bank in one tab. You visit a malicious page in another. That page contains a hidden request to the bank ("change email to attacker@evil"). Your browser sends it with your bank cookie attached, and the bank trusts it because the cookie is valid. Defense: anti-forgery tokens the malicious page cannot know, and SameSite cookies.
- **Server-side request forgery (SSRF)**: a web feature fetches a URL you supply (a preview, an import). The attacker supplies an internal address, such as the cloud metadata service or an internal admin panel, and the server fetches it on their behalf from inside the network. Defense: validate and allow-list the destinations the server may fetch.

**Directory traversal.** A request for {{/download?file=../../../../etc/passwd}} walks up out of the download folder. Defense: normalize and validate paths, and run the web server with minimal file permissions.

## Cryptographic attacks
- **Downgrade.** Two parties support strong and weak options. The attacker interferes with the negotiation so both settle on the weak one, then breaks it. Defense: remove the weak options entirely. TLS 1.3 has no weak ciphers to downgrade to.
- **Collision.** Two inputs that hash to the same value. If an attacker can craft a malicious document with the same hash as a signed legitimate one, the signature validates the forgery. Defense: modern hashes with long outputs.
- **Birthday.** Why collisions are easier than they look. You need only 23 people in a room for a 50% chance that two share a birthday, because any pair counts. Likewise, finding any two inputs that collide takes roughly the square root of the number of possible hashes: about 2 to the 64 attempts for a 128-bit hash, not 2 to the 128. That is why hash outputs must be 256 bits or more.

## Reading the scenario
\`\`\`
"A filename parameter ending in ; cat /etc/passwd returned file contents"      command injection
"The same purchase request was submitted repeatedly from a capture"           replay
"Changing the account ID in the URL showed another customer's data"           horizontal privilege escalation
"A user's settings changed after visiting an unrelated website"               CSRF
"The server fetched an internal metadata URL supplied by the attacker"        SSRF
"Both ends support TLS 1.3 but connected with TLS 1.0"                        downgrade
\`\`\`

## What to memorize
- Injection runs input as code; validation and parameterized queries fix it.
- CSRF abuses the user's browser; SSRF abuses the server's network position.
- Directory traversal is ../ ; replay is resend; escalation is vertical (up) or horizontal (sideways).
- Downgrade weakens the protocol; collisions and the birthday bound attack the hash.`,

u5l4: `## Guessing, and the traces attackers leave
Password attacks come in two main shapes, and the difference between them decides which control works. Indicators of compromise are the fingerprints any attack leaves in logs and behavior; the exam gives you the fingerprint and wants the conclusion.

## Brute force versus spraying
\`\`\`
                  Brute force                       Password spraying
targets           ONE account                       MANY accounts
attempts          thousands of guesses              one or two guesses each
trips lockout?    yes, quickly                      no, stays under the threshold
log signature     one account, hundreds of failures hundreds of accounts, one failure each
best control      lockout, long passwords, MFA      MFA, ban common passwords, cross-account alerting
\`\`\`

Brute force is the obvious attack: try everything against one login. Account lockout after a few failures stops it cold online. Offline, against a stolen hash database, lockout does not exist; there, salting and key stretching (slow hashing) are the defense, together with long passwords that make the search space enormous.

Password spraying is the patient version. The attacker takes one very common password, "Winter2025!", and tries it once against every account in the company. Each account sees a single failure, far below any lockout threshold. With thousands of accounts, someone always used that password. The log signature is the tell: many accounts, one failure each, in a short window, often from one source. Defense: MFA (a correct password is not enough), banning known-common passwords, and alerting on failures across accounts rather than per account.

Two relatives: a **dictionary attack** guesses from a list of likely passwords instead of every combination. **Credential stuffing** replays username and password pairs leaked from other sites, exploiting reuse. MFA and unique passwords beat both.

## Physical attacks in this objective
- **Brute force** on a door or lock: forcing it.
- **RFID cloning**: copying a badge's signal with a cheap reader and replaying it. Defense: encrypted badge protocols and combining the badge with a PIN.
- **Environmental**: attacking power, cooling, or water to take a facility down. Defense: monitoring, redundancy, physical access control to utility rooms.

## Indicators of malicious activity
\`\`\`
Indicator                    What it suggests
account lockout              brute force against that account
concurrent session usage     one account active from two places: stolen credentials
impossible travel            logins from two distant places closer in time than travel allows
blocked content              tools are blocking attempted deliveries: something is trying
resource consumption         CPU, disk, or bandwidth spikes: mining, exfiltration, DDoS participation
resource inaccessibility     files or systems suddenly unavailable: ransomware or DoS
out-of-cycle logging         entries at odd hours or in odd volume: activity outside normal patterns
published / documented       an exploit for your exact version is public: assume attempts
missing logs                 gaps where logs should be: someone cleared their tracks
\`\`\`

Impossible travel is the exam's favorite. A login from Chicago at 9:00 and from Singapore at 9:20 cannot be the same person; one of them is an attacker with the credentials. Concurrent sessions is the same idea without the geography.

Missing logs deserve special weight. Attackers clear logs to hide. A gap is not "nothing happened"; it is evidence that something happened and someone did not want it seen. Treat the system as compromised.

## Reading the scenario
- "Three hundred accounts each show one failed login from the same address at 3 a.m.": password spraying.
- "One account shows 4,000 failed logins and is now locked": brute force.
- "A user is logged in from the office and from another continent at the same time": concurrent sessions, impossible travel.
- "The web server's CPU is at 100 percent with no increase in visitors": resource consumption, likely crypto mining.
- "The security log on the domain controller is empty for two hours": missing logs, tampering.

## What to memorize
- Brute force: many guesses, one account, lockout stops it.
- Spraying: one guess, many accounts, slips under lockout; MFA and cross-account alerting stop it.
- Indicators: lockouts, concurrent sessions, impossible travel, resource spikes, inaccessibility, odd logging, public exploits, missing logs.`,

u5l5: `## The moves that reduce risk
Every attack in this unit has a mitigation. This lesson is the toolbox, and the exam asks which tool is the most effective for a described situation. Learn what each one does and, just as important, what it does not do.

\`\`\`
Technique                  What it does                                       Best against
Segmentation               splits the network into zones                      lateral movement, worms, blast radius
Access control (ACLs)      filters traffic by address, port, protocol         unwanted connections between zones
Access control (perms)     limits what identities can read, write, run        insiders, malware running as a user
Application allow list     only approved software runs; all else blocked      unknown malware, unapproved tools
Isolation                  cuts a system off from everything                  active infection, unpatchable system
Patching                   removes the vulnerability                          every known exploit
Encryption                 makes stolen data unreadable                       theft, disclosure
Monitoring                 detects what prevention missed                     everything, after the fact
Least privilege            only the access a role needs                       escalation, insider damage
Configuration enforcement  keeps the baseline applied, corrects drift         misconfiguration
Decommissioning            retires systems cleanly, wipes data, removes accounts   forgotten servers, leftover access
\`\`\`

## Allow list versus deny list
A deny list blocks known-bad things and lets everything else run. It is always behind: new malware is not on the list yet. An allow list permits only known-good things and blocks everything else by default. Unknown malware simply does not run. It is more work to maintain, and it is the strongest answer to "prevent unauthorized software from executing."

## Isolation versus segmentation
Both separate. **Isolation** is total and usually temporary: the infected workstation is pulled off the network while it is investigated, or the unpatchable device lives alone with no connectivity except what it strictly needs. **Segmentation** is structural and permanent: the network is designed in zones so that a compromise in the guest zone cannot reach the server zone. In a question, "contain the current infection" is isolation; "limit how far a future compromise can spread" is segmentation.

## Least privilege in practice
Users are not administrators on their own machines. Service accounts have exactly the rights their service needs. Administrators use separate admin accounts only when doing admin work. The payoff: malware that runs as a normal user cannot install a rootkit, and a compromised service account cannot read the payroll database. Most "how could the damage have been limited" questions want least privilege or segmentation.

## Hardening, in order
Hardening is applying a set of protections to a system so it presents the smallest possible target.
1. **Encryption**: disks and communications.
2. **Endpoint protection**: antivirus and EDR that watch behavior.
3. **Host-based firewall** and **host-based IPS**: the system defends itself even inside the network.
4. **Disable unused ports and protocols**: every listening service you do not need is gone.
5. **Change default passwords**: on every account, service, and device.
6. **Remove unnecessary software**: fewer programs, fewer flaws.
7. Then patch, apply the secure baseline, and enforce it against drift.

## Choosing under pressure
\`\`\`
Situation                                                Most effective technique
malware is spreading between workstations right now      isolation of infected hosts
a critical system cannot be patched                      isolation or segmentation plus monitoring (compensating)
users keep installing unapproved tools                   application allow list
an attacker moved from a desktop to a database server    least privilege and segmentation would have limited it
the same misconfiguration keeps reappearing              configuration enforcement
an old server nobody owns was found breached             decommissioning process
\`\`\`

## How the exam asks it
- "Prevent unknown malware from executing on endpoints." Application allow list.
- "Contain a ransomware outbreak." Isolate affected systems.
- "Limit lateral movement in the network." Segmentation.
- "First step when deploying a new network device." Change default credentials, disable unnecessary services.

## What to memorize
- Segment, control access, allow-list, isolate, patch, encrypt, monitor, least privilege, enforce configuration, decommission.
- Allow list beats deny list. Isolation contains now; segmentation limits later.
- Hardening: encrypt, endpoint protection, host firewall and IPS, close ports, change defaults, remove extras.`

});
