// SecPlus Academy deeper explanations, units 6 to 10. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u6l1: `## Renting instead of owning
Think of the cloud as renting. Rent an empty warehouse and you must supply shelves, locks, and staff; that is infrastructure as a service. Rent a furnished office and the landlord handles the building and the furniture while you handle your files; that is platform as a service. Rent a hotel room and everything is provided; you just use it: software as a service. The security question in every case is the same: who is responsible for which lock?

## The responsibility matrix
\`\`\`
Layer                      IaaS         PaaS         SaaS
Data, identities, access   customer     customer     customer
Application code           customer     customer     provider
Operating system, patches  customer     provider     provider
Virtualization, hardware   provider     provider     provider
Physical data center       provider     provider     provider
\`\`\`

Two rows never move. Data, identities, and access are always the customer's; the physical facility and hardware are always the provider's. The middle shifts with the service model. Questions almost always test one of the fixed rows or the operating system row: "who patches the OS on an IaaS virtual machine?" The customer.

**Hybrid** means some systems on premises and some in the cloud, so you maintain two sets of controls and a mapping between them. **Third-party vendors** stack: a SaaS product that runs on a public cloud has its own responsibilities to you and inherits the cloud provider's responsibilities to it. Your contract with the SaaS vendor is where your protection lives.

## Infrastructure as code
Instead of clicking through consoles, engineers write files that describe servers, networks, and permissions, and automation builds them. The security consequences cut both ways.

\`\`\`
Benefit                                   Risk
every environment matches the file        one wrong line deploys everywhere at once
changes are reviewed like code            secrets pasted into files end up in repositories
environments rebuild in minutes           the file becomes the crown jewel to protect
\`\`\`

Treat the code as production: peer review, automated scanning of templates for insecure settings, secrets kept in a vault and referenced rather than embedded, and version control so a bad deployment can be rolled back by redeploying the previous file.

## Serverless
You upload a function; the provider runs it when an event triggers it and scales it automatically. There is no operating system for you to patch, which removes a whole class of work. What remains is yours: the code, the permissions the function holds, and the inputs it accepts. A function with broad permissions that trusts its input is a remote code execution waiting to happen. Give each function the narrowest role and validate every input.

## Microservices
A large application is split into many small services, each doing one job, talking to the others through APIs. If the payment service is compromised, the attacker does not automatically own the user service. Each piece can be updated and scaled alone. The cost is that internal traffic multiplies: dozens of services authenticating to each other, each API a potential entry point. Mutual TLS between services and an API gateway that authenticates and rate-limits every call are the standard controls.

## How the exam asks it
- "Who is responsible for encrypting customer data stored in a SaaS application?" The customer.
- "Who maintains the hypervisor in IaaS?" The provider.
- "A template error created fifty misconfigured servers." Infrastructure as code; fix the template, redeploy, add template scanning.
- "Which architecture eliminates operating system patching for the customer?" Serverless.
- "Which architecture limits the blast radius of a compromised component?" Microservices.

## What to memorize
- Data, identities, access: always the customer. Hardware and facility: always the provider. OS patching: customer for IaaS, provider above that.
- Infrastructure as code: consistency and reviewability, but mistakes and secrets scale too.
- Serverless: no OS to patch; secure the code, permissions, inputs. Microservices: contained compromise; secure the APIs.`,

u6l2: `## Dividing networks, packaging compute, and the odd machines
Three vocabulary groups in one lesson: how a network is divided, how software is packaged to run, and the special systems that break every normal assumption.

## Dividing the network
\`\`\`
Physical isolation (air gap)   no cable, no wireless, nothing connects     strongest; data moves by hand
Logical segmentation           VLANs, subnets, firewall zones on shared gear  practical everyday separation
Software-defined networking    a controller programs the whole network       segmentation changes in minutes
\`\`\`

The air gap sounds perfect until you remember the USB drive. Air-gapped networks still get malware; it walks in on removable media. Their real value is that nothing can reach them from the internet.

**Centralized versus decentralized** is about control. A centralized model has one directory, one policy engine, one management console: consistent and easy to audit, but a single point of failure and the attacker's favorite target. Decentralized spreads control across sites or teams: resilient, harder to keep consistent. Most enterprises centralize policy and decentralize enforcement.

## Packaging compute: VMs versus containers
\`\`\`
                 Virtual machines                  Containers
what is shared   only the hardware                 the host operating system kernel
what is inside   a full OS plus the application     the application and its libraries
isolation        strong (hypervisor between them)  weaker (a kernel flaw hits every container)
size, start time large, minutes                    small, seconds
critical patch   the hypervisor                    the host kernel and the container images
\`\`\`

A picture: virtual machines are separate houses on a street; containers are apartments in one building. Apartments are cheaper and faster to move into, but a fire in the building's wiring affects every apartment. Security for containers means scanning the images you build from, running containers as non-root users, and patching the host kernel promptly.

## The special systems
These share one property: you cannot treat them like a laptop.
- **IoT**: cameras, badge readers, smart TVs, sensors. Cheap, shipped with default passwords, rarely patched, and they live for a decade. Put them on their own segment with no path to anything valuable.
- **ICS/SCADA**: the systems that run turbines, pumps, assembly lines, and water treatment. The priority order is safety, then availability, then everything else. A patch that reboots a controller can stop a plant or cause a physical accident, so patching is planned months ahead with the vendor. Isolate from the business network, monitor passively so nothing you do can interfere, and control physical access.
- **RTOS**: operating systems that guarantee a response within microseconds, in medical devices, vehicles, and industrial controllers. Adding a security agent that occasionally delays a response is not acceptable, so security is designed in and around them.
- **Embedded systems**: computers inside products, from printers to pacemakers, running fixed firmware with no room for extra software. Network isolation and physical protection do the work.

## High availability as architecture
Availability is one of the three security goals, so designs that eliminate single points of failure belong here: redundant power and network paths, clustered servers, load balancers, and failover to a second site.

## How the exam asks it
- "Which provides the strongest separation between a classified network and the internet?" Air gap.
- "Which virtualization approach shares the host kernel?" Containers.
- "A production line controller cannot be patched without a scheduled shutdown; what is the best protection?" Segmentation and monitoring, a compensating control.
- "Which system type requires responses within strict timing constraints?" RTOS.

## What to memorize
- Air gap physical, VLAN logical, SDN programmable. Centralized consistent, decentralized resilient.
- VMs have their own OS and strong isolation; containers share the kernel and are lighter.
- IoT, ICS/SCADA, RTOS, embedded: isolate, patch carefully, availability first.`,

u6l3: `## Every design is a trade
There is no design that is cheapest, fastest, most available, and easiest to patch all at once. Security architecture is choosing which properties matter most for this system, and the exam tests whether you can name the property a requirement is really about.

## The twelve, with the question each one answers
\`\`\`
Availability          Will it stay up?
Resilience            Will it keep working under failure or attack, and bounce back?
Cost                  What does it cost to build, run, and to lose?
Responsiveness        How fast does it react to users or events?
Scalability           Can it grow when demand grows?
Ease of deployment    How quickly can we roll out capacity or changes?
Risk transference     Can someone else carry part of the risk?
Ease of recovery      How fast can we rebuild after failure?
Patch availability    Does the vendor still release fixes?
Inability to patch    Is patching impossible or forbidden?
Power                 Does the site have reliable, sufficient electricity?
Compute               Is there enough processing capacity where it is needed?
\`\`\`

## Pairs that get confused
**Availability versus resilience.** Availability is the outcome: the service is reachable. Resilience is the property that produces it under stress: the ability to absorb a failed disk, a lost site, or an attack and keep going or recover quickly. A design with a hot standby site is resilient; the result is availability.

**Scalability versus responsiveness.** Scalability is about volume: ten times the users. Responsiveness is about speed for each user: milliseconds. A cloud auto-scaling group is scalable; a trading engine on dedicated hardware next to the exchange is responsive.

**Patch availability versus inability to patch.** Patch availability asks whether fixes exist: an end-of-life product has none. Inability to patch asks whether you may apply them: a certified medical device may have patches available that you are contractually forbidden to install. Both lead to compensating controls, but the reason differs.

**Risk transference.** Moving email to a cloud provider transfers the operational risk of running mail servers, and cyber insurance transfers financial impact. Neither transfers accountability. If the provider loses your customers' data, the customers, the regulators, and the press come to you.

## Worked scenarios
\`\`\`
Requirement                                                     Consideration
"Checkout latency must stay under 200 ms during flash sales"    responsiveness (and scalability)
"Traffic triples every December"                                scalability
"We can tolerate no more than 15 minutes of downtime a year"    availability
"Rebuild the environment in under an hour after a disaster"     ease of recovery
"The imaging device is certified in a fixed configuration"      inability to patch
"The remote mine site loses grid power weekly"                  power
"Machine learning training needs 200 GPUs"                      compute
"We would rather pay a provider than run this ourselves"        risk transference (and cost)
"New branches must be online the day they open"                 ease of deployment
"One failed server must not affect users"                       resilience, availability
\`\`\`

## How the exam asks it
Usually one of two shapes. Either a requirement is stated and you name the consideration, or two designs are compared and you say which consideration favors one over the other. Find the noun: speed, growth, money, uptime, rebuild time, patches, electricity, processing.

## What to memorize
- The twelve considerations and the question each answers.
- Availability is the outcome, resilience the property. Scalability is volume, responsiveness is speed.
- Risk transference moves burden, never accountability.`,

u7l1: `## Placing the furniture
An architecture diagram is a floor plan. Enterprise infrastructure security is deciding where each control sits, how it fails, and which appliance does which job. Three ideas carry most questions: zones, failure modes, and inline versus passive.

## Zones
\`\`\`
Internet (untrusted)
    |  firewall
Screened subnet: web servers, mail relay, VPN gateway   reachable from outside, walled from inside
    |  firewall
Internal network (trusted): users, file servers, databases
    |  firewall or ACLs
Restricted segments: payment systems, industrial control, management network
\`\`\`

Public-facing servers must accept connections from the internet, so they cannot sit inside the trusted zone; if one is compromised, the attacker would be inside. They go in the screened subnet, with a firewall on each side. The **attack surface** is everything reachable from a less trusted zone, and every rule and placement decision either grows or shrinks it. **Connectivity** is the map of how zones connect and through what.

## Failure modes
Every control will fail eventually. The design decision is what happens to traffic when it does.
\`\`\`
Fail-open    control fails -> traffic flows     availability wins    web content filter in a hospital
Fail-closed  control fails -> traffic stops     security wins        firewall in front of a payment system
\`\`\`

The question always tells you which matters more. "Patient care must not be interrupted" is fail-open. "No unfiltered traffic may ever reach the cardholder environment" is fail-closed.

## Active versus passive, inline versus tap
\`\`\`
Inline (active)     traffic passes THROUGH the device    can block; can bottleneck; if it dies, traffic may stop
Tap / monitor       device receives a COPY of traffic    can only alert; never slows or stops production
(passive)
\`\`\`

An intrusion prevention system is inline: it must be in the path to drop packets. An intrusion detection system watches a copy from a tap or a mirror port and raises alerts. The trade-off is the whole story: inline gives you the power to stop attacks and the risk of stopping everything; passive gives you safety and only a warning.

## The appliances
\`\`\`
Jump server      hardened host in a protected zone; admins connect to it, then from it to internal systems
                 one audited chokepoint for all administration
Forward proxy    fetches web content for internal users; filters, caches, hides internal addresses
Reverse proxy    sits in front of servers; terminates TLS, caches, shields the servers
IPS              inline, blocks known attacks in real time
IDS              passive, alerts on known attacks
Load balancer    spreads connections across a server pool; capacity and fault tolerance
Sensors          collection points that feed traffic or logs to monitoring
\`\`\`

## Worked scenarios
- "Administrators must not connect directly to database servers from their workstations": jump server.
- "The monitoring device must never become a point of failure for production traffic": passive tap.
- "Block exploit attempts before they reach the servers": inline IPS.
- "Public web servers were compromised but the attacker could not reach internal systems": screened subnet worked.
- "Internal users' web requests must be filtered and their addresses hidden": forward proxy.

## How the exam asks it
- "Which failure mode should a firewall protecting sensitive data use?" Fail-closed.
- "Which device placement allows blocking but risks a bottleneck?" Inline.
- "Where should the company's public web server be placed?" Screened subnet.

## What to memorize
- Screened subnet between two firewalls for anything the internet must reach.
- Fail-open favors availability; fail-closed favors security.
- Inline blocks and can break; passive watches and never breaks. Jump server for admin access.`,

u7l2: `## Locking the door and choosing the guard
Two controls that appear in almost every infrastructure question: making devices prove themselves before the network carries their traffic, and picking the right firewall for the job.

## 802.1X: nothing talks until it authenticates
Without it, any device plugged into a jack or associated with an access point can send traffic. With 802.1X, the port stays closed to everything except authentication until the device proves who it is.

\`\`\`
[Supplicant]  ----EAP over the wire/air---->  [Authenticator]  ----RADIUS---->  [Authentication server]
 the laptop or phone                           the switch or AP                   the RADIUS server
 presents a certificate or credentials         relays; opens the port on approval  checks the directory, replies
                                                                                   allow or deny, and which VLAN
\`\`\`

Three roles, three names the exam tests. The **supplicant** is the device asking. The **authenticator** is the switch or access point that relays and enforces. The **authentication server** is RADIUS, which decides. On approval, RADIUS can also tell the switch which VLAN to place the device in, so contractors land in a restricted network automatically.

**EAP** is the framework that carries the proof. The variants differ in what they use to prove identity:
\`\`\`
EAP-TLS     certificates on both client and server     strongest; needs a PKI to issue client certificates
PEAP        server certificate; user password inside a TLS tunnel    common in Windows environments
EAP-TTLS    similar to PEAP; supports more inner methods
EAP-FAST    lighter tunnel without a server certificate requirement  less secure setup
\`\`\`

Basic port security, limiting a port to specific or a maximum number of MAC addresses, is the older approach. It stops the accidental hub and the casual intruder, but a MAC address is easily spoofed. When the question wants real authentication of devices, it wants 802.1X.

## Firewall types: how deep they look
\`\`\`
Layer 4 firewall   addresses, ports, protocol, connection state      fast; cannot see inside the traffic
Layer 7 firewall   understands the application inside the packets    can allow web browsing but block an attack on port 443
NGFW               Layer 7 plus user identity, intrusion prevention,  the modern perimeter firewall
                   threat intelligence, application control
UTM                firewall + antivirus + content filter + spam       one box for a small organization;
                   filter + VPN in one appliance                       convenient, can bottleneck
WAF                inspects HTTP to protect a web application from   protects the application, not the network
                   injection, XSS, and other application attacks
\`\`\`

The distinction that costs the most points: a next-generation firewall inspects applications in general, but a **web application firewall** is the specialist for attacks against your own web application's logic. "Protect the customer portal from SQL injection" is a WAF. "Control which cloud applications employees may use" is an NGFW.

## Choosing under pressure
\`\`\`
Situation                                                        Control
laptops must authenticate before receiving network access        802.1X with RADIUS
strongest authentication method for corporate wireless           EAP-TLS
small office wants one appliance for firewall, AV, and VPN       UTM
enterprise edge needs application and user awareness             NGFW
stop injection attacks against the e-commerce site               WAF
fast filtering between two internal segments by port             Layer 4 rules
\`\`\`

## How the exam asks it
- "Which component of 802.1X is the switch?" The authenticator.
- "Which EAP method requires client certificates?" EAP-TLS.
- "Which firewall type protects against cross-site scripting?" WAF.
- "Which device combines multiple security functions for a small business?" UTM.

## What to memorize
- 802.1X: supplicant asks, authenticator relays, RADIUS decides. EAP-TLS is strongest.
- Layer 4 sees ports, Layer 7 sees applications, NGFW adds identity and IPS, UTM bundles, WAF guards the web app.`,

u7l3: `## Reaching in from outside
Everyone connects from somewhere untrusted now: home, hotels, branch offices on cheap broadband. This lesson is the set of ways to do that safely, and how to tell which one a scenario needs.

## VPNs: two shapes
\`\`\`
Site-to-site      [Office A gateway] ===== permanent encrypted tunnel ===== [Office B gateway]
                  two networks act as one; users do nothing special
Remote access     [Laptop with VPN client] ===== tunnel on demand ===== [Corporate gateway]
                  one user reaches the corporate network from anywhere
\`\`\`

Remote access has a sub-decision. **Full tunnel** sends every packet from the laptop through the corporate gateway: slower, but all traffic is inspected by corporate controls. **Split tunnel** sends only corporate destinations through the tunnel and lets internet traffic go direct: faster, saves gateway bandwidth, but that direct traffic bypasses corporate filtering. Questions that mention "bandwidth" or "performance" lean split; questions that mention "inspect all traffic" or "policy on all traffic" lean full.

## The two tunneling protocols
\`\`\`
TLS      the protocol behind HTTPS; works through nearly any firewall on port 443;
         used for remote-access VPNs and for clientless browser-based access
IPsec    the standard for site-to-site tunnels; also used by remote-access clients
         AH   authentication header: proves integrity and origin, no encryption
         ESP  encapsulating security payload: encryption plus integrity
         IKE  negotiates the keys (UDP 500; NAT traversal on UDP 4500)
         transport mode protects the payload; tunnel mode wraps the whole packet (site-to-site)
\`\`\`

"Confidentiality" in an IPsec question means ESP. AH alone hides nothing.

## Remote access to systems, not networks
Administrators managing devices use SSH, HTTPS management consoles, and remote desktop. The rules: management interfaces are never exposed directly to the internet; they are reached through the VPN and then a jump server, from the management network, with MFA.

## SD-WAN
A branch office used to need an expensive dedicated circuit for reliable performance. SD-WAN lets it use two or three cheap links (broadband, LTE, maybe one MPLS circuit) and a controller steers each application over the best path at that moment: video calls over the link with the least jitter, backups over the cheapest. It is **application-aware**, centrally managed, and quick to provision. What it is not: a security control. SD-WAN moves traffic well; something else must inspect it.

## SASE
Secure access service edge is that something else, delivered from the cloud. Instead of hauling every remote user's traffic back to headquarters to pass through the firewall, users and branches connect to the nearest point of a global cloud service that provides:
\`\`\`
firewall as a service         perimeter rules in the cloud
secure web gateway            web filtering and malware scanning
zero trust network access     per-application access instead of network access
cloud access security broker  visibility and control over SaaS usage
plus SD-WAN                   the networking half
\`\`\`

The result is the same policy and the same inspection whether the user is at headquarters, at home, or in an airport. "Consistent security for a distributed workforce without backhauling" is the SASE sentence.

## Choosing
\`\`\`
Need                                                       Answer
join two offices permanently                               site-to-site IPsec VPN
a remote employee reaches the whole corporate network      remote-access VPN (TLS or IPsec)
a contractor needs one internal web app, no software       clientless TLS access
branches with several cheap links, app-aware routing       SD-WAN
uniform cloud-delivered security for remote users          SASE
\`\`\`

## How the exam asks it
- "Which IPsec protocol provides encryption?" ESP.
- "Users complain the VPN slows their video calls; corporate data must still be protected." Split tunnel.
- "Provide firewall, web filtering, and zero trust access from the cloud for all users." SASE.

## What to memorize
- Site-to-site joins networks; remote access joins people. Full tunnel inspects everything; split tunnel saves bandwidth.
- TLS goes anywhere; IPsec is the site-to-site standard; ESP encrypts, AH does not.
- SD-WAN steers; SASE inspects, from the cloud.`,

u8l1: `## Know the data before you protect it
Every data protection question starts with four things about the data: what kind it is, how sensitive it is, what state it is in, and where it lives. Get those four and the control follows.

## What kind: data types
\`\`\`
Regulated               rules imposed by law: health records, payment cards, personal data
Trade secret            valuable because it is secret: recipes, processes, pricing models
Intellectual property   source code, designs, patents, brand assets
Legal information       contracts, litigation, privileged communication
Financial information   ledgers, forecasts, filings, account numbers
Human-readable          documents, spreadsheets, emails
Non-human-readable      binaries, encrypted files, machine data
\`\`\`

Regulated data is special because you do not decide how to protect it; the regulation does, and it sets penalties. Trade secrets are special because their entire value evaporates on disclosure; a leaked formula is not a breach, it is a loss of the asset. The readable distinction matters for tools: data loss prevention can pattern-match a card number in a spreadsheet but not inside an encrypted archive, so non-human-readable data needs other controls.

## How sensitive: classification
\`\`\`
Public         anyone may see it                         press releases, the website
Private        internal, some harm if leaked             internal memos
Sensitive      harm if leaked                            employee records
Confidential   need-to-know only                         contracts, roadmaps
Restricted     tightly controlled, usually regulated     card data, health data
Critical       the organization stops without it         the core database, encryption keys
\`\`\`

Vendors and organizations name levels differently, and the exam accepts the general idea: a ladder where each rung adds controls. Public gets none. Confidential gets access approval. Restricted gets encryption, logging, and audit. Critical adds availability and integrity protection because losing or corrupting it is as bad as leaking it.

## What state: rest, transit, use
\`\`\`
At rest      on a disk, in a database, on a backup tape     encrypt it; control access to it
In transit   crossing a network                              TLS, IPsec, SSH
In use       in memory, on screen, being processed           the hardest: secure enclaves, strict access
                                                             to the systems that process it, screen locks
\`\`\`

Data in use is the gap attackers love. Disk encryption and TLS are common now, but the moment data is decrypted to be processed it sits in memory in the clear. Memory-scraping malware on point-of-sale terminals is the classic in-use attack.

## Where: sovereignty and geolocation
**Data sovereignty** means data is governed by the laws of the country where it physically sits. A German customer's records stored on a server in another country may be subject to that country's laws and beyond the protection of German ones, which may itself be a violation. **Geolocation** is knowing where data and users actually are, which is required to enforce any of this. Cloud regions exist largely because of sovereignty.

## Putting it together
A hospital's patient records: regulated (health law), restricted classification, at rest in the database, in transit to the clinic, in use on the doctor's screen, and sovereign to the country of the patients. Each of those facts adds a control: legal handling rules, need-to-know access, database encryption, TLS, screen privacy and session timeouts, and storage inside the country.

## How the exam asks it
- "Data that must not leave the country in which it was collected." Sovereignty.
- "Data being processed in memory." In use.
- "Information whose value depends on remaining secret." Trade secret.
- "Which classification would apply to publicly posted marketing materials?" Public.

## What to memorize
- Types: regulated, trade secret, intellectual property, legal, financial; readable versus not.
- Classification ladder from public to critical; higher rungs add controls.
- States: at rest, in transit, in use. Sovereignty: the storage country's law applies.`,

u8l2: `## Eight tools, one job each
The objective lists eight ways to protect data. They are not interchangeable; each answers a particular threat. The exam gives a threat or a requirement and wants the matching tool.

\`\`\`
Method                    What it does                                  When it is the answer
Geographic restrictions   keeps data in permitted places, blocks others   sovereignty rules, "must stay in-country"
Encryption                unreadable without the key                     secrecy at rest or in transit
Hashing                   one-way fingerprint                            integrity checks, password storage
Masking                   shows only part of a value                     support staff see last four digits
Tokenization              substitutes a random token, real value in a vault   card data, a breach yields nothing
Obfuscation               makes data hard to read or find                the general family; includes steganography
Segmentation              isolates data on its own network or system     fewer things can reach it
Permission restrictions   least privilege on files, shares, databases    only the right identities can touch it
\`\`\`

## The two that people confuse
**Hashing versus encryption.** Encryption is reversible: the right key recovers the data. Hashing is not: nothing recovers the input. So if a requirement says the organization itself must be unable to recover the original, such as passwords, the answer is hashing. If the organization must read the data later, the answer is encryption. Hashing also answers "prove it was not altered."

**Tokenization versus masking.** Tokenization replaces the whole value with a substitute and keeps the real value elsewhere; the stored token is useless to a thief. Masking hides part of a value for display while the full value still exists in the system. A support console showing xxxx-xxxx-xxxx-4321 is masking. A merchant database that holds tok_93ab instead of the card number is tokenization.

## Geographic restrictions in practice
Cloud storage configured to replicate only within a region; access policies that deny logins from outside permitted countries; **geofencing** that ties access to physical location. This is how data sovereignty is enforced rather than merely promised.

## Segmentation and permissions: the boring winners
Most data breaches involve data that too many things could reach. Putting the research database on its own segment so only the research application server can connect, and setting permissions so only the research group can read the share, prevents the compromised marketing workstation from ever seeing it. Encryption would not have helped there, because the marketing user's access, if allowed, would decrypt it. Access control comes before cryptography.

## Layering, worked example
A payment flow:
1. The card number is **tokenized** at the point of entry; the application never stores it.
2. The token vault is **encrypted** and **segmented** on its own network.
3. **Permission restrictions** limit vault access to the payment service account.
4. Customer service sees a **masked** value.
5. All of it stays in the permitted **geographic** region.
6. Transaction logs are **hashed** to detect tampering.
Each layer answers a different question: what if the database is stolen, what if a workstation is compromised, what if an insider looks, what if the auditor asks.

## How the exam asks it
- "Ensure customer data is never stored outside the European Union." Geographic restrictions.
- "Store passwords so they cannot be recovered even by administrators." Hashing.
- "Allow agents to verify the last four digits without exposing the full number." Masking.
- "Replace card numbers so a database breach yields nothing usable." Tokenization.
- "Limit which systems can reach the HR database." Segmentation.

## What to memorize
- Hash for integrity and passwords (irreversible); encrypt for secrecy (reversible).
- Tokenize to substitute; mask to partially hide.
- Geographic restrictions enforce sovereignty. Segmentation and permissions limit reach.`,

u8l3: `## Staying up, and where you go when you cannot
Availability is a security goal, so keeping services running is security architecture. This lesson has two halves: high availability, which handles component failures without anyone noticing, and recovery sites, which handle losing a whole location.

## High availability: two techniques
\`\`\`
Load balancing   several servers share the requests; a failed one is skipped
                 scales capacity; best for stateless services (web front ends)
Clustering       servers act as one system with shared state and automatic failover
                 protects state; best for databases and stateful services
\`\`\`

Both remove single points of failure, and they are often combined: load-balanced web servers in front of a clustered database. When a question mentions "sessions must not be lost" or "database," think clustering; when it mentions "handle more users" or "web tier," think load balancing.

## Recovery sites: the cost-versus-time ladder
\`\`\`
Site    What is there                                   Time to operate   Cost
Hot     duplicate systems running, data current         minutes           highest
Warm    hardware and connectivity ready, data restored  hours to a day    middle
        on failover
Cold    space, power, cooling only                      days to weeks     lowest
Cloud   any of the above as on-demand virtual resources; pay when used
\`\`\`

The question gives one of two numbers. If it gives the allowed recovery time, pick the cheapest site that meets it. If it gives the budget, pick the fastest site the budget allows. "Failover within minutes with no data loss" is hot. "Restore from last night's backup onto the standby hardware" is warm. "Lease empty space to rebuild in" is cold.

**Geographic dispersion** answers a different question: how far apart should the sites be? Far enough that one hurricane, earthquake, or power grid failure cannot take both. Two data centers on the same campus are not dispersed.

## Diversity: not all eggs in one basket
- **Platform diversity**: mixing operating systems or vendors so one vulnerability or one vendor's bad update does not stop everything. The cost is managing two of everything.
- **Multi-cloud**: workloads across providers so a provider outage, price change, or breach is survivable. Same cost profile: complexity.
The exam treats diversity as a deliberate resilience investment, not an accident.

## Continuity of operations
The organization's plan and capability to keep essential functions going during a disruption, even if degraded: paper procedures when the system is down, an alternate site, a call tree, and staff who have practiced it. Disaster recovery restores systems; continuity keeps the business running while that happens.

## Capacity planning: three kinds of headroom
\`\`\`
People           cross-training, documented procedures, enough staff that one absence is not an outage
Technology       systems sized for peak plus failover, not for average load
Infrastructure   power, cooling, bandwidth, rack space with room to grow
\`\`\`

The people row is the one candidates forget. "Only one engineer knows how to restore the backups" is a capacity gap as real as a full disk.

## How the exam asks it
- "Which site allows failover in minutes?" Hot.
- "Which technique keeps database state available through a server failure?" Clustering.
- "Why place the recovery site in another region?" Geographic dispersion.
- "Which capacity area does cross-training address?" People.

## What to memorize
- Load balancing shares work; clustering shares state.
- Hot minutes, warm hours, cold days; disperse them geographically.
- Platform and cloud diversity buy resilience with complexity. Capacity: people, technology, infrastructure.`,

u8l4: `## The backup you have restored is the only one you have
Backups are simple to describe and easy to get wrong. This lesson covers the design decisions, the three backup types and their restore math, why snapshots and RAID are not backups, how plans are tested, and the power that keeps everything running.

## Design decisions
\`\`\`
Onsite vs offsite   onsite restores fast; offsite survives fire, flood, and ransomware on the LAN; keep both
Frequency           set by acceptable data loss: hourly, daily, continuous
Encryption          backups contain everything; encrypt at rest and in transit
Snapshots           point-in-time image of a disk or VM; fast, but usually stored WITH the source
Replication         continuous copy to another system; near-zero loss, but copies corruption instantly
Journaling          log of every change; roll to any moment in time
Recovery            the documented, practiced restore procedure
\`\`\`

The ransomware lesson: modern ransomware looks for backups and encrypts them first. Any backup the compromised system can write to is not safe. At least one copy must be **offline** (disconnected) or **immutable** (cannot be altered for a set period). "The backups were encrypted too" is the sentence that means there was no offline copy.

## Full, incremental, differential
\`\`\`
Type          Backs up                                   Daily size   Restore needs
Full          everything                                  largest      the full only
Incremental   changes since the LAST BACKUP OF ANY TYPE   smallest     the full + EVERY incremental since
Differential  changes since the LAST FULL                 grows daily  the full + the LATEST differential
\`\`\`

Worked week, full on Sunday:
\`\`\`
              Mon   Tue   Wed   Thu
Incremental   Mon's changes | Tue's | Wed's | Thu's         restore Thursday: full + Mon + Tue + Wed + Thu
Differential  Mon's | Mon+Tue | Mon+Tue+Wed | Mon..Thu     restore Thursday: full + Thu's differential
\`\`\`

Incremental is fastest to take and slowest to restore; differential is the reverse. If a question asks for the fewest backup sets at restore time, differential. Smallest nightly window, incremental.

## RAID is not a backup
RAID keeps a server running when a disk fails. RAID 1 mirrors; RAID 5 stripes with parity and survives one disk; RAID 6 survives two; RAID 10 mirrors and stripes; RAID 0 survives nothing. But a deleted file is deleted on every disk, corruption is mirrored, and ransomware encrypts the whole array. RAID protects availability against hardware failure; backups protect against everything else. Snapshots have the same limit: they usually live on the same storage as the original.

## Testing the plan
\`\`\`
Tabletop             the team talks through a scenario step by step; finds plan gaps; no systems touched
Failover test        actually switch to the standby system or site; proves it works; measures real time
Simulation           a realistic drill with people acting out the incident; tests procedures and communication
Parallel processing  run the recovery environment alongside production and compare; proves it without risk
\`\`\`

Tabletop is cheapest and first. Failover is the only one that proves the technology. A question that says "without disrupting production" wants tabletop or parallel processing.

## Power
\`\`\`
UPS         batteries; carries the load for minutes; conditions dirty power; time to shut down or start the generator
Generator   fuel-powered; runs for as long as fuel lasts; needs regular testing; the UPS covers its start-up seconds
\`\`\`

## How the exam asks it
- "Which backup type restores fastest with the fewest media?" Differential.
- "Which backup type is smallest each night?" Incremental.
- "Ransomware encrypted the backups as well; what was missing?" An offline or immutable copy.
- "Which test proves the standby site works without affecting production?" Parallel processing (or a tabletop for the plan).
- "What supplies power in the seconds before the generator starts?" UPS.

## What to memorize
- Incremental small and slow to restore; differential larger and fast to restore.
- Offsite and offline copies. Snapshots and RAID are not backups.
- Tabletop talks, failover switches, simulation drills, parallel compares. UPS bridges to the generator.`,

u9l1: `## The approved starting point
A secure baseline is the answer to "what should this kind of system look like when it is done?" It lists the settings, the services, the accounts, the logging, and the patch level a workstation, a server, or a switch must have. Hardening is the act of bringing a system to that baseline and stripping away everything the baseline does not allow.

## Three steps, in order
\`\`\`
1. Establish   write the baseline: which services, ports, protocols, password rules, logging, encryption
               start from a published benchmark; adjust for your environment
2. Deploy      apply it to every system of that type, by automation, so all of them match
3. Maintain    watch for drift, re-apply when settings change, revise the baseline as threats and software change
\`\`\`

Establishing without deploying is a document. Deploying without maintaining is a snapshot that rots. The exam frames questions around which step is missing: "servers were configured correctly at install but now differ from each other" is a maintain failure; "each administrator configures servers differently" is a deploy failure.

## Each target, and the concern that defines it
\`\`\`
Mobile devices     enrollment in management, encryption, screen lock, remote wipe, app restrictions
Workstations       users are not administrators, endpoint protection, host firewall, disk encryption, patching
Switches, routers  change defaults, disable unused ports and services, SSH not Telnet, SNMPv3,
                   management only from the management network, current firmware
Cloud              least-privilege identities, storage not public, private endpoints, logging on, config scanning
Servers            role-specific baseline, remove unneeded services, host firewall and IPS, central logging
ICS/SCADA          isolate from business networks, vendor-approved patches only, passive monitoring,
                   physical access control
Embedded, RTOS     fixed firmware, little or no patching; isolation and physical security carry the load
IoT                change defaults, separate segment, update firmware where possible, disable remote management
\`\`\`

## The pattern that runs through all of them
1. Remove what is not needed (services, software, ports, accounts).
2. Change what is default (passwords, community strings, SSIDs).
3. Encrypt what matters (disks, management sessions).
4. Limit who can manage it (management network, MFA, jump server).
5. Log what it does (to a central collector).
6. Patch where you can; where you cannot, isolate and monitor.

## The constrained systems
ICS, embedded, RTOS, and IoT share a problem: the normal hardening tools do not fit. No agent can run on a pump controller. A camera's firmware may never get an update. A medical device's certification forbids changes. For these, the baseline is mostly about the environment around the device: its own network segment, firewall rules allowing only the one conversation it needs, physical protection, and monitoring that watches without touching. Those are compensating controls, and the exam rewards recognizing when they are the right answer.

## Worked scenarios
- "First step after unboxing a new switch": change the default credentials, then disable unused services and ports.
- "Servers drift from the approved configuration within weeks": configuration enforcement, the maintain step.
- "A programmable logic controller cannot run endpoint protection": segment it and monitor its traffic passively.
- "Cloud storage buckets keep being created as public": a cloud baseline with configuration scanning and enforcement.

## How the exam asks it
- "Which step of secure baseline management detects drift?" Maintain.
- "Which hardening step applies to a newly installed router?" Change default credentials and disable unnecessary services.
- "How should an unpatchable industrial controller be protected?" Isolation and monitoring.

## What to memorize
- Establish, deploy, maintain.
- Remove extras, change defaults, encrypt, restrict management, log, patch or isolate.
- Constrained systems (ICS, embedded, RTOS, IoT): protect the environment around them.`,

u9l2: `## The network that leaves the building
Wireless signals do not stop at the wall, and phones go home at night. Both need controls that assume the network around them is hostile.

## Installing wireless properly
A **site survey** measures signal strength, interference, and coverage across the floor plan, before deployment to plan access point placement and after to verify it. Its output is a **heat map**: a floor plan colored by signal strength. A good heat map shows strong signal where people work and weak signal in the parking lot, because signal that reaches the parking lot is signal an attacker can use from a car.

## Wireless security settings
\`\`\`
WEP        broken in minutes; never
WPA        interim fix with TKIP; deprecated
WPA2       AES-CCMP; acceptable
WPA3       current; SAE in Personal mode stops offline cracking; 192-bit option in Enterprise
\`\`\`

The bigger decision is Personal versus Enterprise.
\`\`\`
Personal (PSK)    one passphrase for everyone     home; when one person leaves, everyone's password changes
Enterprise        802.1X with a RADIUS server      each user or device authenticates individually;
                                                   revoke one without touching the rest; VLAN per user
\`\`\`

Under Enterprise, the **authentication protocol** is an EAP method. **EAP-TLS** with certificates on both sides is strongest. **PEAP** and **EAP-TTLS** protect a username and password inside a TLS tunnel. The **cryptographic protocol** underneath is AES-CCMP for WPA2 and GCMP for WPA3; TKIP is out.

## Mobile device management
An MDM platform is the control that makes every other mobile policy real. Enrolled devices can be forced to encrypt, to require a passcode, to install only approved apps, to report jailbreaking, and to be locked or wiped remotely when lost. Unenrolled devices can be asked politely. Corporate data on an enrolled device typically lives in a separate managed container so a wipe removes company data and leaves family photos alone.

## Deployment models
\`\`\`
BYOD   bring your own device         employee owns it     cheapest; least control; privacy questions about managing a personal phone
COPE   corporate owned, personally   company owns it      full control; some personal use allowed
       enabled
CYOD   choose your own device        company owns it      employee picks from an approved list; a middle path
\`\`\`

The exam tells you who owns the device and who chose it. Company-owned and company-chosen is COPE. Company-owned and employee-chosen from a list is CYOD. Employee-owned is BYOD.

## Connection methods
\`\`\`
Cellular    carrier network; reasonably trusted; traffic still leaves the perimeter, so use a VPN for corporate access
Wi-Fi       public networks are hostile: evil twins, on-path; VPN or per-application TLS
Bluetooth   pairing attacks and data theft; keep non-discoverable, reject unknown pairings, disable when idle
\`\`\`

## Worked scenarios
- "Departing employees keep knowing the Wi-Fi password": move from PSK to Enterprise with RADIUS.
- "Signal is measurable from the street": adjust placement and power based on a new site survey.
- "A lost phone contained customer data": MDM remote wipe; if not enrolled, that is the finding.
- "Employees select from three approved company-purchased phones": CYOD.

## How the exam asks it
- "Which wireless authentication method uses certificates on client and server?" EAP-TLS.
- "Which WPA3 feature prevents offline dictionary attacks against the passphrase?" SAE.
- "What is produced by a wireless site survey?" A heat map.
- "Which deployment model gives the company ownership while allowing personal use?" COPE.

## What to memorize
- Site survey makes a heat map; keep signal inside.
- WPA3 with SAE for Personal; Enterprise means 802.1X plus RADIUS; EAP-TLS strongest.
- MDM enforces. BYOD employee-owned, COPE company-owned with personal use, CYOD choose from a list.`,

u9l3: `## Building it in
Most attacks land on applications, and a firewall cannot fix a flaw in your own code. Application security is a short list of practices that stop whole families of attacks, plus sandboxing for code you do not trust.

## Input validation: the one practice that stops the most
Every value from outside, whether a form field, a URL parameter, a header, a file upload, or an API call, is hostile until checked. Validate on the server: type (is it a number?), length (is it under the limit?), format (does it match the expected pattern?), range (is it a plausible value?). Reject what fails; sanitize what can be cleaned.

\`\`\`
Attack                 Defeated by validating...
SQL injection          that input is data, never part of a query (plus parameterized queries)
Cross-site scripting   that input contains no script, and encoding output
Buffer overflow        length
Directory traversal    that paths contain no ../ and resolve inside the allowed folder
Command injection      that input contains no shell characters
\`\`\`

Client-side validation in the browser is for user convenience only. An attacker sends requests directly, skipping the browser entirely, so the server must validate everything itself.

## Secure cookies
A session cookie is the key to a logged-in session; stealing it is as good as stealing the password. Three flags protect it:
\`\`\`
Secure     sent only over HTTPS; never exposed on a plain connection
HttpOnly   not readable by JavaScript; a cross-site scripting payload cannot steal it
SameSite   not sent with requests that originate from other sites; blunts cross-site request forgery
\`\`\`
Short session lifetimes limit how long a stolen cookie is useful.

## Static code analysis
Tools read the source code without running it and flag dangerous patterns: input flowing into a database query without validation, hard-coded passwords, use of a broken hash, missing error handling. Run it automatically in the build pipeline so a flaw is caught at commit time, when it costs minutes to fix, instead of in production. Its counterpart, dynamic analysis, tests the running application; both belong in the process.

## Code signing
The developer signs each release with a private key. When a system installs or runs the code, it verifies the signature with the public key. A valid signature proves two things: the code came from that publisher, and it was not altered afterward. Operating systems, app stores, and update mechanisms rely on it, and it is the direct defense against tampered downloads and malicious updates.

## Sandboxing
A sandbox is a sealed room. Code runs inside it with no access to the real file system, network, or other processes unless explicitly allowed. Uses:
- **Malware analysis**: detonate a suspicious file and watch what it does, safely.
- **Testing**: run new code where a bug cannot damage production.
- **Containment**: browsers and document viewers sandbox their own rendering so an exploit cannot reach the operating system.

## Monitoring
An application that does not log its logins, failures, and unusual behavior cannot be defended; the attack is invisible. Applications must log to the central monitoring system like every other component.

## How the exam asks it
- "Prevent injection and cross-site scripting at the source." Input validation.
- "Ensure session cookies cannot be read by scripts." HttpOnly flag.
- "Find security flaws before the code is compiled." Static code analysis.
- "Verify an update came from the vendor unmodified." Code signing.
- "Examine a suspicious attachment without risk." Sandboxing.

## What to memorize
- Validate every input on the server; it defeats injection, XSS, overflow, traversal.
- Cookies: Secure, HttpOnly, SameSite.
- Static analysis reads code; code signing proves origin and integrity; sandbox isolates.`,

u9l4: `## The asset you forgot
Breach reports have a recurring character: the server nobody remembered, the old laptop still on the network, the drive that went to a recycler with the database still on it. Asset management is the discipline that makes "we did not know we had that" impossible. The exam follows an asset from purchase to disposal.

## The lifecycle
\`\`\`
Acquisition / procurement   evaluate vendor security, require security features, buy approved products
Assignment / ownership      one named owner accountable for patching, access, and eventual disposal
Classification              label by sensitivity and criticality; sets the protection level
Monitoring / tracking       inventory (the list) and enumeration (discovering what is really there)
Disposal / decommissioning  sanitize or destroy, certify it, after checking retention rules
\`\`\`

## Procurement is a security step
Buying a product that cannot be hardened, cannot be patched, or comes from a vendor with no security process creates years of risk. Standardizing on approved products means the baselines already exist for them. And purchases outside the process are how shadow IT starts.

## Ownership
Every asset needs a person, not a department, who answers for it. Owners approve access, ensure patching, and sign off on retirement. Ownerless assets are the ones that stay unpatched for years because nobody is responsible.

## Inventory versus enumeration
\`\`\`
Inventory     what we BELIEVE we have: the authoritative record, updated by the change process
Enumeration   what is ACTUALLY there: active discovery on the network, compared to the inventory
\`\`\`
The difference between the two lists is your unknown assets: forgotten servers, personal devices, shadow IT. Run enumeration regularly and reconcile.

## Disposal done right
\`\`\`
Sanitization   remove the data so it cannot be recovered; the media can be reused
               cryptographic erase (destroy the key of an encrypted drive), secure overwrite, degaussing (magnetic only)
Destruction    physically destroy the media; shredding, pulverizing, incineration; nothing is reused
Certification  documented proof, often from a third party, that sanitization or destruction happened
Data retention check FIRST: laws, regulations, and legal holds may require the data to be kept
\`\`\`

Decision rule: reusing the media? Sanitize. Not reusing it, or the data is too sensitive to risk? Destroy. Regulated data either way? Certify. And before any of it, confirm nothing requires the data to be retained; destroying evidence under a legal hold is a serious problem.

Solid-state drives complicate overwriting because of how they manage storage internally; cryptographic erase (the drive was encrypted, so destroying the key makes all the data unreadable instantly) or physical destruction is preferred.

## Worked scenarios
- "A scan found six devices not in the inventory": enumeration did its job; investigate and reconcile.
- "The company wants to donate old laptops": sanitize, and certify if any held regulated data.
- "Retiring the drives from the cardholder database": destroy, or cryptographic erase; certify.
- "Nobody knows who is responsible for the old file server": an ownership failure.

## How the exam asks it
- "Which process discovers devices missing from the asset inventory?" Enumeration.
- "Which disposal method allows the drive to be reused?" Sanitization.
- "What must be verified before destroying old records?" Data retention requirements.
- "What provides proof to auditors that media was destroyed?" A certificate of destruction.

## What to memorize
- Procure approved, assign an owner, classify, inventory and enumerate.
- Sanitize to reuse, destroy otherwise, certify for regulated data, check retention first.`,

u10l1: `## Looking for weaknesses on purpose
Attackers look for your vulnerabilities constantly. Vulnerability management is looking first. The cycle is identify, analyze, respond, validate, report; this lesson is the identify step, which has more tools than the rest combined.

## Scanning
A vulnerability scanner checks systems against a database of known flaws and misconfigurations.
\`\`\`
Non-credentialed   scans from the network as an outsider would   sees exposed services and versions; more false positives
Credentialed       logs in with an account                       sees installed software, patches, configuration; accurate
\`\`\`
Credentialed scans find more and guess less. Both have a place: the non-credentialed scan shows what an attacker on the network sees, the credentialed scan shows what is actually there.

## Testing applications
\`\`\`
Static analysis     reads source code without running it          finds coding flaws early, in the build
Dynamic analysis    exercises the running application with inputs  finds what only appears at run time
Package monitoring  tracks third-party libraries and their CVEs    finds inherited flaws in dependencies
\`\`\`
Package monitoring matters because modern applications are mostly other people's code. A flaw in a widely used library is your flaw in every application that includes it; monitoring tells you the day it is announced.

## Threat intelligence: knowing what is coming
\`\`\`
OSINT                        open sources: advisories, research, social media; also what attackers learn about you publicly
Proprietary / third-party    paid feeds from security vendors with curated indicators
Information sharing (ISACs)  sector groups where members share threats hitting their industry
Dark web                     monitoring criminal markets for your credentials, data, or planned attacks
\`\`\`
Intelligence answers "which of my thousand vulnerabilities is being exploited right now," which is the single most useful input to prioritization.

## Penetration testing
A scanner reports that a flaw might be exploitable. A penetration tester tries. Authorized testers use attacker techniques to break in, chain weaknesses together, and show how far an intruder could get. The output is not a list of possibilities but a demonstrated path: "from the guest Wi-Fi to the domain controller in four hours." Rules of engagement define scope and limits beforehand.

## Inviting outsiders to help
\`\`\`
Responsible disclosure   a published policy: how to report a flaw, what the reporter can expect, no legal threats
Bug bounty               pay researchers for valid reports; turns strangers who find flaws into allies
\`\`\`
Without a disclosure path, a researcher who finds your flaw has two choices: keep quiet or go public. Both are worse than telling you.

## Audits
System and process audits review configurations, procedures, and compliance against a standard. They catch what scanners cannot: an approval step nobody follows, an administrator account with no owner, a firewall rule added in an emergency and never removed.

## Worked scenarios
- "Report missing patches on each server accurately": credentialed scan.
- "Alert when a library in our application gets a new CVE": package monitoring.
- "Prove whether the flaw in the portal actually leads to data access": penetration test.
- "Learn which vulnerabilities are being exploited in our industry": an ISAC or threat feed.
- "Give researchers a safe way to report flaws": responsible disclosure program.

## How the exam asks it
- "Which scan type provides the most accurate view of installed software?" Credentialed.
- "Which analysis method tests the application while it runs?" Dynamic.
- "Which source provides freely available threat information?" OSINT.

## What to memorize
- Credentialed scans see more. Static reads code, dynamic runs it, package monitoring watches dependencies.
- Intelligence: OSINT, paid feeds, ISACs, dark web. Pen tests prove exploitability. Disclosure and bounties invite reports.`,

u10l2: `## From a long list to a short one
A scan of a mid-sized network returns thousands of findings. The rest of the vulnerability management cycle is how a team turns that into "fix these twelve this week," proves the fixes worked, and shows management the trend.

## Analysis step 1: is it real?
\`\`\`
False positive   the scanner reports a flaw that is not there (wrong version detection, a patched backport)
False negative   the scanner misses a flaw that is there (the dangerous one)
\`\`\`
Confirm before acting. Chasing false positives wastes the team; false negatives are why scanning is never the only control.

## Analysis step 2: how bad, here?
\`\`\`
CVSS               a 0 to 10 severity score for the flaw in general
                   None 0 | Low 0.1-3.9 | Medium 4.0-6.9 | High 7.0-8.9 | Critical 9.0-10.0
CVE                the unique ID (CVE-year-number) so everyone means the same flaw
Classification     what kind of flaw and what it allows (remote code execution, information disclosure)
Exposure factor    how much of the asset's value is lost if exploited
Environmental      internet-facing? holds sensitive data? compensating controls already in place?
variables
Industry and       what compromise would mean for operations, customers, regulators
organizational
impact
Risk tolerance     how much risk the organization has decided it will accept
\`\`\`

CVSS is where prioritization starts, never where it ends. A critical flaw on an isolated lab machine with no sensitive data may rank below a medium flaw on the internet-facing payment gateway. The environmental variables and the impact do the ranking.

\`\`\`
Finding                                   CVSS    Exposure                Priority
remote code execution, lab server          9.8    isolated, no data        low
authentication bypass, payment gateway     6.5    internet-facing, cards   high
\`\`\`

## Response: five options
\`\`\`
Patch                  remove the flaw; the default answer
Segmentation           reduce who can reach it while a fix is pending or impossible
Compensating controls  extra protections that reduce the risk without removing the flaw
Insurance              transfer the financial impact; fixes nothing
Exception / exemption  a documented, approved decision to leave it, with a reason, an owner, and an expiry
\`\`\`
An exception is not ignoring the finding. It is a record that someone with authority accepted the risk for a stated period, which is reviewed when it expires.

## Validation: prove it
A ticket marked "done" is a claim. Validation is evidence.
\`\`\`
Rescan          run the scanner again; the finding should be gone
Audit           check the configuration or patch level directly
Verification    test that the vulnerable behavior no longer works
\`\`\`
Patches fail silently more often than people expect: the wrong package, a reboot never done, a second instance nobody knew about. Rescanning catches all of it.

## Reporting
For engineers: what is open, by severity and age. For management: trends over time, mean time to remediate, exceptions in force. Reporting is also how the program proves it is working.

## Worked scenarios
- "A patch was deployed last week; what is the next step?" Rescan to validate.
- "The scanner flagged a flaw in a version we do not run": false positive; confirm and tune.
- "Two critical findings, one on an isolated test system and one on the public web server": fix the web server first.
- "The vendor has no patch and the system is essential": compensating controls and a documented exception with an expiry.

## How the exam asks it
- "Which CVSS range is critical?" 9.0 to 10.0.
- "Which term identifies a specific publicly known vulnerability?" CVE.
- "What confirms that remediation was successful?" Rescanning.
- "Which response transfers financial risk without fixing the vulnerability?" Cyber insurance.

## What to memorize
- False positive: reported, not real. False negative: real, not reported.
- Prioritize by CVSS plus exposure, environment, impact, and tolerance.
- Respond: patch, segment, compensate, insure, or document an exception. Validate by rescanning.`,

u10l3: `## Watching, so you know when prevention failed
Every preventive control eventually misses something. Monitoring is how you find out, ideally within minutes. The exam breaks it into the activities a security team performs and the tools that perform them.

## The activities
\`\`\`
Log aggregation     pull logs from every system into one place so events can be correlated
Alerting            rules that fire on significant events or patterns
Scanning            regular checks for vulnerabilities and configuration drift
Reporting           summaries for operations, management, auditors
Archiving           retaining logs for the required period, for investigations and compliance
Alert response      what happens when an alert fires; may include QUARANTINE of the affected system
and remediation
Alert tuning        adjusting rules to cut false positives so the real alerts are seen
\`\`\`

Alert tuning is the one that decides whether monitoring works. A team receiving five thousand alerts a day stops reading them, and the one real intrusion scrolls past. Tuning means suppressing known-benign patterns, raising thresholds where they are too sensitive, and enriching alerts with context so triage is fast. "Analysts are missing real incidents because of alert volume" is a tuning problem.

## The tools, and the question each answers
\`\`\`
SIEM                  "what happened across all my systems?"   aggregates, correlates, alerts, retains
SCAP                  "does this system match the benchmark?"  a standard format for automated compliance checks
Benchmarks            "what should the configuration be?"      published hardening standards SCAP checks against
Agents                "what is happening on this host, now?"    installed software reporting continuously and in depth
Agentless             "what can I learn without installing?"    queries over the network; less depth, no footprint
Antivirus / endpoint  "is there malware on this host?"           detects and blocks, reports to the SIEM
DLP                   "is sensitive data leaving?"               watches email, uploads, removable media; blocks
SNMP traps            "did a device just have a problem?"        the device pushes an alert immediately (interface down)
NetFlow               "who talked to whom, how much?"            conversation summaries without full packets
Vulnerability         "what flaws exist on my systems?"          scheduled identification
scanners
\`\`\`

## How they fit together
\`\`\`
  servers, firewalls, endpoints  --logs-->  [SIEM]  <--flows--  routers (NetFlow)
  devices                        --traps-->   |     <--alerts-- endpoint agents, DLP
  scanners, SCAP checks          --status-->  |
                                              v
                                  correlation rules -> alerts -> analysts -> respond, quarantine, tune
\`\`\`

The SIEM is the hub. A single failed login is noise. A failed login on the VPN, then a successful login from a new country, then a large NetFlow transfer to an unknown address, then a DLP alert, is an incident, and only correlation across sources sees it.

## SCAP and benchmarks
Hardening guides (benchmarks) describe hundreds of settings. Checking them by hand is impossible at scale. SCAP is a standard way to express those checks so tools can run them automatically and report which systems comply. "Automatically verify that all servers match the hardening standard" is SCAP against a benchmark.

## Worked scenarios
- "Detect that credentials were used from two countries within an hour": SIEM correlation.
- "Stop a spreadsheet of customer records from being emailed out": DLP.
- "Know immediately when a core switch interface fails": SNMP trap.
- "Spot an unusually large transfer to an external address": NetFlow.
- "Verify every workstation matches the security baseline automatically": SCAP.
- "Reduce the flood of alerts about a known-benign backup job": alert tuning.

## How the exam asks it
- "Which tool aggregates and correlates logs from multiple sources?" SIEM.
- "Which protocol allows devices to push alerts to a monitoring system?" SNMP traps.
- "Which data source shows network conversations without capturing packets?" NetFlow.
- "Which activity reduces false positives?" Alert tuning.

## What to memorize
- Activities: aggregate, alert, scan, report, archive, respond and quarantine, tune.
- SIEM correlates, SCAP checks benchmarks, DLP stops leaks, SNMP traps push, NetFlow summarizes, scanners find flaws.`

});
