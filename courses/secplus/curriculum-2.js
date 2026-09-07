// SecPlus Academy curriculum, units 6 to 10. Original teaching content for CompTIA Security+ SY0-701.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u6", n: 6, title: "Architecture Models", domain: 3,
  blurb: "Cloud, code-defined infrastructure, networks, virtualization, special-purpose systems, and how to weigh one design against another.",
  assumes: "You know the CIA goals and the main attack types.",
  lessons: [
    {
      id: "u6l1", title: "Cloud, Infrastructure as Code, Serverless, and Microservices", domain: 3, obj: "3.1", minutes: 9,
      body: `Security architecture is the shape of the systems you are protecting. The exam expects you to know the modern building blocks and the security question each one raises.

## Cloud and the responsibility matrix
In the cloud, security is shared. The **responsibility matrix** spells out who secures what: the provider secures the physical data centers, the hardware, and the virtualization layer; the customer secures its data, its identities, its configuration, and, depending on the service model, its operating systems and applications. The higher the service level, the more the provider handles.
- **Hybrid** environments mix on-premises and cloud, so responsibilities and controls must be mapped across both.
- **Third-party vendors** add another layer: a software-as-a-service provider running on a cloud provider means two sets of responsibilities to understand.
Most cloud incidents come from the customer's side of the line: exposed storage, over-privileged identities, unpatched customer-managed systems.
Hybrid considerations (which workloads live where, and how identity and data move between private and public) and third-party vendors are the other two cloud sub-items; infrastructure as code is abbreviated IaC.
## Infrastructure as code
Servers, networks, and policies are defined in files and created by automation. Benefits: consistency (every environment matches the file), speed, and reviewable change history. Risks: a mistake in the file is deployed everywhere at once, and secrets committed to code repositories leak. Treat the code like production: review it, test it, scan it, and keep secrets out of it.

## Serverless
The provider runs your function when triggered and you never manage a server. The attack surface shifts from operating systems to the function's code, its permissions, and its inputs. Give each function the minimum permissions and validate every input.

## Microservices
An application built from many small services communicating over APIs. Each can be scaled, updated, and secured separately, and a compromise is contained to one service. The cost is many more network connections to authenticate and encrypt, and an API gateway becomes a critical control point.

## Where the exam goes
- "Who is responsible for patching the operating system on IaaS virtual machines?" The customer.
- "A misconfigured template deployed the same flaw to fifty servers." Infrastructure as code risk; fix the template and redeploy.
- "Application runs as event-triggered functions with no servers to manage." Serverless.
- "Independent services communicate through APIs." Microservices; secure the APIs.

> Exam tip: in any shared-responsibility question, data, identities, and configuration are always the customer's. Physical hardware is always the provider's. The middle depends on the service model.`,
      hook: "Responsibility matrix: provider owns the hardware, customer owns data, identities, configuration. Infrastructure as code deploys consistency and mistakes alike. Serverless shifts risk to code and permissions. Microservices need secured APIs."
    },
    {
      id: "u6l2", title: "Networks, Virtualization, Containers, and Special Systems", domain: 3, obj: "3.1", minutes: 10,
      body: `The rest of the architecture vocabulary: how networks are divided, how compute is packaged, and the special-purpose systems that cannot be treated like laptops.

## Network infrastructure
- **Physical isolation (air gap)**: no connection at all between the protected network and anything else. The strongest separation, used for classified systems and some industrial control. Data moves by hand, which is also how malware gets in on a USB drive.
- **Logical segmentation**: VLANs, subnets, and firewall zones divide one physical network into separate security zones.
- **Software-defined networking**: a controller programs the network through software, so segmentation and policy can be changed centrally and quickly.

## Placement and control
- **On-premises**: you own everything and control everything, including the cost and the patching.
- **Centralized**: one authority manages systems and policy; consistent, but a single point of failure and a single target.
- **Decentralized**: control is distributed; resilient, but harder to keep consistent and to monitor.

## Virtualization and containers
- **Virtualization**: a hypervisor runs several virtual machines, each with its own operating system, on one physical host. Strong isolation between VMs; the hypervisor is the critical component to patch.
- **Containerization**: containers share the host's operating system kernel and package only the application and its dependencies. Lighter and faster than VMs, with weaker isolation: a kernel flaw affects every container. Scan images, run containers with minimal privileges, and never run them as root.

## Special-purpose systems
- **Internet of Things (IoT)**: cameras, sensors, thermostats, smart devices. Weak defaults, rare patches, and long life. Segment them away from everything else.
- **ICS and SCADA**: industrial control systems that run factories, utilities, and pipelines. Availability and safety come first; a patch that causes a reboot can stop a production line, so changes are slow and controlled. Isolate from business networks, monitor passively.
- **Real-time operating systems (RTOS)**: systems that must respond within strict time limits, such as medical devices and vehicle controllers. Security features that add latency are often unacceptable.
- **Embedded systems**: computers built into other products, with fixed firmware and no room for agents.

## High availability
Designing so that a component failure does not stop the service: redundant components, clustering, load balancing, and failover. Availability is a security goal, so this belongs in architecture.

> Exam tip: "shares the host kernel" is containers; "each has its own operating system" is virtual machines. "Cannot be patched without stopping production" is ICS/SCADA, and the answer is segmentation and compensating controls, not aggressive patching.`,
      hook: "Air gap isolates physically, VLANs logically, SDN programmatically. VMs have their own OS; containers share the kernel. IoT, ICS/SCADA, RTOS, and embedded systems: segment them, patch carefully, prioritize availability."
    },
    {
      id: "u6l3", title: "Architecture Considerations", domain: 3, obj: "3.1", minutes: 7,
      body: `Every architecture is a set of trade-offs. The exam lists twelve considerations and expects you to recognize which one a scenario is really about.

## The twelve considerations
- **Availability**: will the design keep the service up? Redundancy, failover, and cloud regions raise it; cost rises with it.
- **Resilience**: can the system absorb a failure or attack and keep operating? Related to availability but about recovering under stress.
- **Cost**: capital for hardware versus operating expense for cloud; the cost of downtime versus the cost of redundancy.
- **Responsiveness**: how fast the system reacts. Latency-sensitive workloads may need on-premises or edge placement.
- **Scalability**: can capacity grow with demand? Cloud scales on demand; on-premises scales by purchase order.
- **Ease of deployment**: how quickly new capacity or new versions can be rolled out. Infrastructure as code and containers score high.
- **Risk transference**: moving risk to another party through cloud services, managed providers, or insurance. Responsibility for outcomes stays with you.
- **Ease of recovery**: how quickly the system can be rebuilt after failure. Automated rebuilds and tested backups score high.
- **Patch availability**: does the vendor still release fixes? Legacy and end-of-life systems score zero.
- **Inability to patch**: some systems cannot be patched at all because of certification, downtime, or vendor restrictions. Plan compensating controls from the start.
- **Power**: does the design need reliable power, UPS, and generators? Edge and remote sites often lack them.
- **Compute**: does the workload need processing capacity that constrains where it can run?

## Matching scenario to consideration
- A trading platform where milliseconds matter: responsiveness.
- A retailer whose traffic triples every holiday: scalability.
- A medical device certified in a fixed configuration: inability to patch.
- A remote site with unreliable electricity: power.
- Moving email to a cloud provider to reduce in-house risk: risk transference.
- A design where any single server can fail without users noticing: availability and resilience.

## The pattern behind the questions
The exam gives a business requirement and asks which consideration is most important, or gives two designs and asks which consideration favors one. Read for the noun the requirement is about: speed, growth, money, uptime, power, patches.

> Exam tip: risk transference moves the financial or operational burden, never the accountability. If a cloud provider loses your customers' data, your organization still answers for it.`,
      hook: "Availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, compute. Find the noun the requirement is about."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Enterprise Infrastructure", domain: 3,
  blurb: "Where devices go, how they fail, the appliances that protect the network, port security, firewalls, and secure remote connections.",
  assumes: "You know the architecture models and basic network zones.",
  lessons: [
    {
      id: "u7l1", title: "Device Placement, Zones, Failure Modes, and Appliances", domain: 3, obj: "3.2", minutes: 10,
      body: `Applying security to a real network means deciding where each control sits, what happens when it breaks, and which appliance does which job.

## Zones and placement
- **Security zones** group systems by trust: the internal network, the internet, and the **screened subnet** between them for public-facing servers such as web and mail. Firewalls sit at every boundary.
- **Attack surface**: everything reachable from a less trusted zone. Every design decision either shrinks or grows it.
- **Connectivity**: how zones connect, through which devices, over which links.

## Failure modes
- **Fail-open**: when the control fails, traffic keeps flowing. Preserves availability at the cost of security. Right for a content filter in a hospital where blocked traffic could harm patients.
- **Fail-closed**: when the control fails, traffic stops. Preserves security at the cost of availability. Right for a firewall protecting a payment system.
The question always describes what matters more; answer with the mode that protects it.

## Active versus passive, inline versus tap
- **Inline** (active) devices sit in the traffic path. They can block, and they can bottleneck or fail in a way that stops traffic. An IPS is inline.
- A **tap** or **monitor** (passive) device receives a copy of the traffic. It can only alert, and it can never slow or stop production traffic. An IDS is passive.

## Appliances and their jobs
- **Jump server**: a hardened host in a protected zone that administrators connect to first, then from it to internal systems. All administrative access funnels through one monitored point.
- **Proxy server**: a forward proxy fetches web content for internal users, filtering and caching and hiding their addresses. A reverse proxy sits in front of servers, terminating TLS and shielding them.
- **IPS versus IDS**: intrusion prevention is inline and blocks; intrusion detection is out of band and alerts.
- **Load balancer**: distributes connections across a pool of servers for capacity and fault tolerance.
- **Sensors**: collect traffic or logs from points in the network and feed monitoring systems.

## Reading the scenario
- "The device must never interrupt production traffic even if it crashes": passive tap or fail-open.
- "Administrators should reach internal servers only through a single audited host": jump server.
- "Block attacks in real time": IPS, inline.
- "Public web servers must be reachable but separated from the internal network": screened subnet.

> Exam tip: inline can block and can break; passive can only watch and can never break the network. Fail-open favors availability, fail-closed favors security.`,
      hook: "Screened subnet for public servers. Fail-open keeps traffic flowing, fail-closed stops it. Inline blocks and can bottleneck; a tap only watches. Jump server for admin access, IPS blocks, IDS alerts, load balancer spreads."
    },
    {
      id: "u7l2", title: "Port Security and Firewalls", domain: 3, obj: "3.2", minutes: 9,
      body: `Two of the most tested infrastructure controls: authenticating what plugs into the network, and choosing the right kind of firewall.

## Port security and 802.1X
A live network jack that accepts any device is an open door. **802.1X** closes it: a device must authenticate before the switch port or wireless association carries traffic.
- The device (supplicant) presents credentials or a certificate to the switch or access point (authenticator), which forwards them to a **RADIUS** server (authentication server). Only after approval does the port open, often into a VLAN chosen by the server.
- **EAP** (Extensible Authentication Protocol) is the framework that carries the authentication. Variants: **EAP-TLS** uses certificates on both sides and is the strongest; **PEAP** and **EAP-TTLS** protect a simpler inner authentication inside a TLS tunnel; **EAP-FAST** is a lighter option.
Simpler port security limits which or how many MAC addresses a port accepts, but MAC addresses can be spoofed; 802.1X is the real control.

## Firewall types
- **Layer 4 firewall**: filters by addresses, ports, and protocols, and tracks connection state. Fast, but blind to what is inside the packets.
- **Layer 7 firewall**: understands applications and content, so it can allow a web application while blocking an attack inside the same port 443.
- **Next-generation firewall (NGFW)**: a Layer 7 firewall with application awareness, user identity, intrusion prevention, and threat intelligence in one device. The usual perimeter firewall today.
- **Unified threat management (UTM)**: an all-in-one appliance bundling firewall, antivirus, content filtering, spam filtering, and VPN. Convenient for small organizations; can become a bottleneck.
- **Web application firewall (WAF)**: sits in front of web applications and inspects HTTP traffic for injection, cross-site scripting, and other application attacks. It protects the application, not the network.

## Choosing the effective control
- Attacks inside legitimate web traffic to your own application: WAF.
- Small office wanting one box for everything: UTM.
- Enterprise perimeter with application and user awareness: NGFW.
- Simple, fast filtering of ports between internal segments: Layer 4 rules.
- Unauthorized devices on wired or wireless networks: 802.1X with RADIUS.

> Exam tip: "protect the web application from SQL injection" is a WAF, not an NGFW. "Users must authenticate before their laptop gets network access" is 802.1X. The strongest EAP method is EAP-TLS because both sides present certificates.`,
      hook: "802.1X: supplicant, authenticator, RADIUS; EAP-TLS strongest. Layer 4 filters ports, Layer 7 understands applications, NGFW adds identity and IPS, UTM bundles everything, WAF guards the web app."
    },
    {
      id: "u7l3", title: "Secure Communication and Access", domain: 3, obj: "3.2", minutes: 8,
      body: `People and sites need to reach the network from outside. These are the ways to do it safely.

## VPNs
A virtual private network builds an encrypted tunnel across an untrusted network.
- **Site-to-site**: two gateways maintain a permanent tunnel so two offices act as one network. Users do nothing.
- **Remote access** (client-to-site): a user's device tunnels to the corporate gateway. Full tunnel sends all traffic through it; split tunnel sends only corporate traffic and lets internet traffic go direct, which saves bandwidth but bypasses corporate inspection.

## Tunneling protocols
- **TLS**: the same protocol as HTTPS, used for VPNs that work through almost any firewall and for clientless browser-based access.
- **IPsec**: the standard for site-to-site tunnels. **AH** authenticates, **ESP** encrypts and authenticates, **IKE** negotiates keys. Tunnel mode wraps the whole packet; transport mode protects only the payload.

## Remote access to systems
Administrators reach devices through SSH, HTTPS management pages, or remote desktop, ideally only through a jump server and only from the management network. Never expose management interfaces to the internet directly.

## SD-WAN
Software-defined wide area networking connects branches over several cheap links (broadband, LTE, MPLS) and steers each application over the best path. It is application-aware and centrally managed. Security must be added: SD-WAN moves traffic, it does not inspect it.

## SASE
Secure access service edge combines SD-WAN networking with cloud-delivered security: firewall as a service, secure web gateway, zero trust network access, and cloud access security broker. Remote users and branches connect to the nearest SASE point and get the same inspection and policy no matter where they are, instead of backhauling everything to headquarters.

## Selecting controls
The exam frames these as choices: a remote workforce that needs consistent security everywhere points to SASE; two offices that need a permanent link point to a site-to-site IPsec VPN; a contractor who needs one web application points to clientless TLS access.

> Exam tip: "branches use multiple internet links with application-based routing" is SD-WAN. "Security policy is enforced in the cloud for users wherever they are" is SASE. IPsec ESP encrypts; AH alone does not.`,
      hook: "Site-to-site joins offices, remote access joins people; split tunnel skips inspection. TLS works anywhere, IPsec is the site-to-site standard. SD-WAN steers traffic; SASE adds cloud security to it."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Data Protection and Resilience", domain: 3,
  blurb: "What kinds of data exist, how to classify and protect them, and how to keep services running and recoverable.",
  assumes: "You know encryption levels and the basic architecture models.",
  lessons: [
    {
      id: "u8l1", title: "Data Types, Classifications, States, and Sovereignty", domain: 3, obj: "3.3", minutes: 8,
      body: `You cannot protect data correctly until you know what kind it is, how sensitive it is, where it is, and which laws apply to it.

## Data types
- **Regulated**: governed by law or regulation: health records, payment card data, personal data of residents of jurisdictions with privacy laws. Handling rules are imposed from outside.
- **Trade secret**: information whose value comes from being secret: formulas, processes, customer lists.
- **Intellectual property**: source code, designs, patents, and creative works.
- **Legal information**: contracts, litigation records, privileged communications.
- **Financial information**: ledgers, forecasts, filings, account details.
- **Human-readable versus non-human-readable**: a document versus a binary or encrypted blob. Both need protection, but they are found and handled differently by tools such as DLP.

## Classification levels
Labels that drive handling rules. Typical scale from least to most sensitive:
- **Public**: anyone may see it.
- **Private** and **sensitive**: internal, would cause harm if leaked.
- **Confidential**: restricted to people with a need to know.
- **Restricted**: tightly controlled, often regulated, with logging and approval for access.
- **Critical**: the organization cannot function without it; availability and integrity are as important as confidentiality.
The higher the label, the stronger the controls: encryption, access approval, monitoring, retention limits.

## Data states
- **At rest**: stored on disk, in a database, in a backup. Protect with encryption and access control.
- **In transit**: moving across a network. Protect with TLS, IPsec, SSH.
- **In use**: in memory, being processed. The hardest to protect; secure enclaves and strict access to the processing systems.

## Sovereignty and location
- **Data sovereignty**: data is subject to the laws of the country where it is physically stored. Storing European residents' data in a data center abroad may violate their protections.
- **Geolocation**: knowing where data and users physically are, which sovereignty rules and geographic restrictions depend on.

> Exam tip: "must not leave the country" is data sovereignty. "Being processed in memory" is data in use. Regulated data is defined by law, trade secrets by the value of secrecy.`,
      hook: "Types: regulated, trade secret, intellectual property, legal, financial. Classify public to critical. States: at rest, in transit, in use. Sovereignty: the storage country's law applies."
    },
    {
      id: "u8l2", title: "Data Protection Methods", domain: 3, obj: "3.3", minutes: 7,
      body: `Once data is classified, pick the protection that fits its state and its threat. The exam names eight methods and asks which one a scenario calls for.

## The methods
- **Geographic restrictions**: keep data in permitted locations and block access from prohibited ones, satisfying sovereignty rules. Geofencing enforces it.
- **Encryption**: unreadable without the key. At rest, in transit, and at the right level (disk, file, database, record).
- **Hashing**: a one-way fingerprint. Verifies integrity and stores passwords without storing passwords.
- **Masking**: show only part of a value, such as the last four digits, to people who do not need all of it.
- **Tokenization**: replace the value with a random token; the real value lives in a separate vault.
- **Obfuscation**: make data harder to understand or find, including steganography and masking; a family name that covers several techniques.
- **Segmentation**: put sensitive data on its own network or system so fewer things can reach it.
- **Permission restrictions**: least privilege on files, databases, and shares, so only the identities that need the data can touch it.

## Matching method to need
- Prove a file was not altered: hashing.
- Store card numbers so a breach yields nothing usable: tokenization or encryption.
- Let support staff confirm identity without seeing full numbers: masking.
- Keep customer data inside one country: geographic restrictions.
- Limit who can open the payroll share: permission restrictions.
- Keep the research database off the general network: segmentation.

## Layering
Real designs stack methods. Payment data is tokenized in the application, encrypted in the database, masked in the support console, restricted by permissions, and stored only in permitted regions. Each layer answers a different threat.

> Exam tip: hashing is integrity and cannot be reversed; encryption is confidentiality and can. Tokenization substitutes; masking partially hides. When the requirement is "cannot be recovered even by us," the answer is hashing, not encryption.`,
      hook: "Geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions. Hash for integrity, encrypt for secrecy, tokenize to substitute, mask to partially hide."
    },
    {
      id: "u8l3", title: "High Availability, Sites, Continuity, and Capacity", domain: 3, obj: "3.4", minutes: 9,
      body: `Availability is a security goal, and this objective is about designs that keep services running through failures and disasters.

## High availability
- **Load balancing**: several servers share the work; if one fails, the others carry on. Best for stateless services such as web front ends.
- **Clustering**: servers act as one system with shared state and automatic failover. Best for databases and services that must keep state.
Both remove single points of failure. Load balancing scales capacity; clustering protects state.

## Site considerations
- **Hot site**: a duplicate environment running with current data. Failover in minutes. Most expensive.
- **Warm site**: hardware and connectivity in place; data must be restored and systems started. Hours to a day.
- **Cold site**: space, power, and cooling, nothing else. Days or weeks. Cheapest.
- **Geographic dispersion**: recovery sites far enough away that one regional disaster cannot hit both.

## Diversity
- **Platform diversity**: different operating systems or vendors, so one vulnerability does not affect everything.
- **Multi-cloud**: workloads spread across providers so one provider's outage or breach is survivable.
Diversity costs more to manage; the exam expects you to know it is a deliberate resilience choice.

## Continuity of operations
The plan and the capability to keep essential functions running during and after a disruption: alternate procedures, alternate locations, communication plans, and the people who know them.

## Capacity planning
Resilience needs spare capacity in three areas:
- **People**: cross-training and enough staff that one absence does not stop a function.
- **Technology**: systems sized for peak load plus failover, not just average load.
- **Infrastructure**: power, cooling, bandwidth, and space with headroom.

## Reading the scenario
- "Failover must complete within minutes with no data loss": hot site.
- "Equipment is ready but last night's backups must be restored first": warm site.
- "Two data centers 300 miles apart": geographic dispersion.
- "Only one administrator knows the backup system": a people capacity gap.

> Exam tip: hot, warm, cold is a cost-versus-time ladder. The question tells you either the time allowed or the budget, and that picks the site.`,
      hook: "Load balancing shares work; clustering shares state. Hot site minutes, warm hours, cold days, dispersed geographically. Diversity of platforms and clouds. Capacity: people, technology, infrastructure."
    },
    {
      id: "u8l4", title: "Backups, Testing, and Power", domain: 3, obj: "3.4", minutes: 9,
      body: `A backup you have never restored is a hope, not a plan. This lesson covers how backups are designed, how resilience plans are tested, and the power that keeps it all on.

## Backup design
- **Onsite** backups restore fast; **offsite** backups survive a site disaster. Keep both.
- **Frequency** is set by how much data you can afford to lose. Hourly, daily, continuous.
- **Encryption**: backups hold everything, so they must be encrypted at rest and in transit.
- **Snapshots**: point-in-time copies of a disk or VM, fast to take and restore, but usually stored with the original and so not a substitute for a separate backup.
- **Replication**: continuous copying to another system or site; near-zero data loss, but replicates corruption and ransomware too.
- **Journaling**: recording every change so a system can be rolled to any point in time.
- **Recovery**: the restore process itself, documented and practiced.

## Backup types
- **Full**: everything. Simplest restore, longest to take.
- **Incremental**: only what changed since the last backup of any type. Fast to take; restoring needs the full plus every incremental since.
- **Differential**: everything changed since the last full. Grows each day; restoring needs only the full plus the latest differential.
Keep at least one copy offline or immutable so ransomware cannot encrypt the backups along with the data.

## RAID
Disk redundancy inside a server: RAID 1 mirrors two disks; RAID 5 stripes with parity and survives one disk failure; RAID 6 survives two; RAID 10 mirrors and stripes. RAID 0 has no redundancy. RAID protects against disk failure, not against deletion, corruption, or ransomware; it is not a backup.

## Testing the plan
- **Tabletop exercise**: the team walks through a scenario on paper, finding gaps in the plan.
- **Failover test**: actually switch to the backup system or site and confirm it works.
- **Simulation**: a realistic drill of an incident, exercising people and procedures.
- **Parallel processing**: run the recovery system alongside production and compare results without cutting over.
The four named tests are tabletop exercises, fail over (deliberately switching to the backup), simulation, and parallel processing.
## Power
- **UPS**: batteries that carry the load through short outages and give time to shut down or to start a generator. Also conditions dirty power.
- **Generators**: long-term power for extended outages; need fuel, testing, and a UPS to bridge the start-up gap.

> Exam tip: fastest restore with the fewest backup sets is differential (full plus latest differential). Smallest daily backup is incremental. "Ransomware encrypted the backups too" means there was no offline copy. Snapshots and RAID are not backups.`,
      hook: "Full, incremental (small, slow restore), differential (bigger, fast restore). Offsite and offline copies. Snapshots and RAID are not backups. Test with tabletop, failover, simulation, parallel. UPS bridges to the generator."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Securing Resources", domain: 4,
  blurb: "Baselines and hardening for every kind of device, wireless and mobile security, application security, and the asset lifecycle.",
  assumes: "You know the mitigation techniques from Unit 5.",
  lessons: [
    {
      id: "u9l1", title: "Secure Baselines and Hardening Targets", domain: 4, obj: "4.1", minutes: 8,
      body: `A secure baseline is the approved starting configuration for a type of system. Hardening is applying it and removing what the baseline does not allow. The exam wants the three lifecycle steps and the specific concern of each target type.

## Baselines: establish, deploy, maintain
1. **Establish**: define the settings for each system type: services allowed, ports open, password rules, logging, encryption, patch level. Industry benchmarks are a common starting point.
2. **Deploy**: apply the baseline to every system of that type, ideally through automation so nothing is missed and every system matches.
3. **Maintain**: monitor for drift, re-apply when settings change, and update the baseline itself as threats and software change.

## Hardening targets and what matters for each
- **Mobile devices**: management enrollment, encryption, screen lock, remote wipe, app restrictions.
- **Workstations**: least privilege for users, endpoint protection, host firewall, disk encryption, patching, removal of unneeded software.
- **Switches and routers**: change default credentials, disable unused ports and services, SSH not Telnet, SNMPv3, management only from the management network, current firmware.
- **Cloud infrastructure**: least-privilege identities, private endpoints, logging enabled, storage not public, configuration scanning.
- **Servers**: role-specific baselines, unnecessary services removed, patching, host-based firewall and IPS, logging to a central collector.
- **ICS/SCADA**: isolation from business networks, vendor-approved patches only, monitoring without disruption, physical access control.
- **Embedded systems and RTOS**: fixed firmware, limited patching, so network isolation and physical security carry the load.
- **IoT devices**: change defaults, separate network segment, firmware updates where possible, disable unneeded features such as remote management.

## Common thread
Every target gets the same moves: remove what is not needed, change what is default, encrypt what matters, limit who can manage it, log what it does, and keep it patched where patching is possible. Where patching is not possible, segmentation and monitoring compensate.

> Exam tip: a question that names a device type and asks for the "first" hardening step almost always wants change default credentials or disable unnecessary services. For ICS/SCADA and embedded systems, the answer leans to isolation because patching is constrained.`,
      hook: "Establish, deploy, maintain the baseline. Every target: remove extras, change defaults, encrypt, restrict management, log, patch. Constrained systems (ICS, embedded, IoT): isolate and monitor."
    },
    {
      id: "u9l2", title: "Wireless and Mobile Security", domain: 4, obj: "4.1", minutes: 9,
      body: `Radio goes through walls and phones leave the building. Both need controls that assume the network is hostile.

## Wireless installation
- **Site survey**: measure signal, interference, and coverage before and after deployment. The output is a **heat map** showing where signal is strong and where it leaks outside the building.
- Place access points to cover the inside and minimize spill into parking lots, and choose channels to avoid interference.

## Wireless security settings
- **WPA3**: the current standard. Personal mode uses SAE, which prevents offline password cracking; Enterprise mode uses 802.1X. WPA2 with AES is acceptable; WEP and WPA are not.
- **AAA and RADIUS**: enterprise networks authenticate each user or device individually against a RADIUS server, so one departing employee does not force a password change for everyone, and the network can place each client in the right VLAN.
- **Cryptographic protocols**: AES-CCMP under WPA2, GCMP under WPA3; TKIP is deprecated.
- **Authentication protocols**: EAP-TLS with certificates is strongest; PEAP and EAP-TTLS protect password-based methods inside a TLS tunnel.

## Mobile device management
An **MDM** platform enrolls devices and enforces policy: encryption, passcodes, remote lock and wipe, app allow lists, jailbreak detection, and separation of work data from personal data. Without MDM, none of the mobile policies are enforceable.

## Deployment models
- **BYOD**: employees use their own devices. Cheapest, least control, privacy concerns about managing a personal device.
- **COPE**: the company owns the device and permits personal use. Full control, some personal use allowed.
- **CYOD**: employees choose from a company-approved list; the company owns and manages it. A middle ground.

## Connection methods and their risks
- **Cellular**: carrier network, generally trustworthy, but data leaves the corporate perimeter; use a VPN for corporate access.
- **Wi-Fi**: public networks are hostile; evil twins and on-path attacks. VPN or per-app TLS.
- **Bluetooth**: keep non-discoverable, reject unknown pairings, disable when not needed.

> Exam tip: "individual credentials for each wireless user" is WPA Enterprise with 802.1X and RADIUS. "Employees choose from approved devices the company owns" is CYOD. "Remotely wipe a lost phone" requires MDM enrollment.`,
      hook: "Site survey makes a heat map. WPA3 with SAE or 802.1X and RADIUS; EAP-TLS strongest. MDM enforces mobile policy. BYOD personal, COPE company-owned with personal use, CYOD choose from a list."
    },
    {
      id: "u9l3", title: "Application Security and Sandboxing", domain: 4, obj: "4.1", minutes: 7,
      body: `Applications are where most attacks land, so security has to be built into them and around them.

## Input validation
Every piece of input is hostile until proven otherwise. Validate type, length, format, and range on the server side; reject or sanitize anything unexpected. This one practice defeats injection, cross-site scripting, buffer overflows, and directory traversal. Client-side validation improves the user experience but attackers bypass it, so the server must validate too.

## Secure cookies
Session cookies are keys to the user's session. Set them **Secure** (sent only over HTTPS), **HttpOnly** (not readable by scripts, which blunts cross-site scripting), and **SameSite** (not sent with cross-site requests, which blunts cross-site request forgery). Short lifetimes limit replay.

## Static code analysis
Tools that read the source code without running it and flag dangerous patterns: unvalidated input reaching a query, hard-coded credentials, weak cryptography. Run it in the build pipeline so problems are found before deployment. Dynamic analysis, by contrast, tests the running application.

## Code signing
Developers sign releases with a private key; systems verify the signature with the public key before installing or running the code. It proves the code came from the publisher and was not altered in transit, which is the defense against malicious updates and tampered downloads.

## Sandboxing
Run untrusted or suspicious code in an isolated environment where it can do no harm: a virtual machine, a container, or a browser sandbox. Used to analyze suspected malware safely, to test software, and to contain applications such as browsers so an exploit cannot reach the operating system.

## Monitoring
Applications should log authentication events, errors, and unusual patterns, and those logs should reach the central monitoring system. An application that does not log is invisible when it is attacked.

> Exam tip: "verify that software came from the vendor and was not modified" is code signing. "Find vulnerabilities in the source before the build" is static analysis. "Analyze a suspicious file without risking the network" is sandboxing. The HttpOnly cookie flag is the answer to session theft through cross-site scripting.`,
      hook: "Validate every input on the server. Cookies: Secure, HttpOnly, SameSite. Static analysis reads code; code signing proves origin; sandboxing isolates the untrusted; monitoring makes the app visible."
    },
    {
      id: "u9l4", title: "Asset Management", domain: 4, obj: "4.2", minutes: 7,
      body: `You cannot secure what you do not know you have, and the asset you forgot is the one that gets breached. Asset management follows every device, system, and dataset from purchase to disposal.

## Acquisition and procurement
Security starts before purchase: evaluate the vendor, require security features, and standardize on approved products so baselines apply. Unapproved purchases become shadow IT.

## Assignment and ownership
Every asset has an owner responsible for it: patching, access decisions, and eventual disposal. Unowned assets decay.

## Classification
Assets are classified by the sensitivity of what they hold and how critical they are, which sets the protection level and the handling rules.

## Monitoring and asset tracking
- **Inventory**: the authoritative list of every asset, with owner, location, configuration, and classification. Kept current through the change process.
- **Enumeration**: actively discovering what is actually on the network and comparing it to the inventory. The difference is your unknown assets.

## Disposal and decommissioning
When an asset leaves service, its data must not leave with it.
- **Sanitization**: removing data so it cannot be recovered. Cryptographic erase (destroy the key), secure overwriting, or degaussing for magnetic media.
- **Destruction**: physically destroying the media by shredding, pulverizing, or incineration when sanitization is insufficient or the media will not be reused.
- **Certification**: documented proof, often from a third party, that sanitization or destruction was completed. Required for regulated data.
- **Data retention**: before destroying anything, confirm that retention rules do not require it to be kept; legal holds and regulations may forbid deletion.

## Reading the scenario
- "Prove to auditors that the old drives were destroyed": certification.
- "Discover devices on the network that are not in the inventory": enumeration.
- "Reuse the laptops after the project": sanitization, not destruction.
- "Solid-state drives from the finance system are being retired": destruction, or cryptographic erase if the drives were encrypted.

> Exam tip: sanitize when the media will be reused, destroy when it will not, certify either way for regulated data, and check retention requirements first.`,
      hook: "Procure approved, assign an owner, classify, inventory and enumerate to find the unknown. Dispose: sanitize to reuse, destroy otherwise, certify it, and check retention first."
    }
  ]
});

FRA.units.push({
  id: "u10", n: 10, title: "Vulnerability Management and Monitoring", domain: 4,
  blurb: "Finding weaknesses, deciding what to fix first, proving it was fixed, and watching the environment continuously.",
  assumes: "You know the vulnerability classes and the hardening baseline.",
  lessons: [
    {
      id: "u10l1", title: "Finding Vulnerabilities", domain: 4, obj: "4.3", minutes: 9,
      body: `Vulnerability management is a cycle: identify, analyze, respond, validate, report. This lesson is the first step, and the exam covers many ways to find weaknesses.

## Vulnerability scanning
Automated tools compare systems against a database of known flaws. A **credentialed** scan logs into the system and sees installed software and configurations in detail; a **non-credentialed** scan sees only what is exposed to the network. Credentialed scans find more and produce fewer false positives.

## Application security testing
- **Static analysis**: examines source code without running it. Finds coding flaws early.
- **Dynamic analysis**: tests the running application by sending inputs and watching behavior. Finds flaws that only appear at run time.
- **Package monitoring**: tracks the third-party libraries an application uses and alerts when one has a known vulnerability. The defense against inheriting flaws through dependencies.

## Threat intelligence
Knowing what attackers are doing right now.
- **Open-source intelligence (OSINT)**: freely available information: public advisories, research blogs, social media, and what attackers can learn about you from public sources.
- **Proprietary and third-party feeds**: paid intelligence from security vendors.
- **Information sharing organizations**: industry groups (ISACs) where members share threats affecting their sector.
- **Dark web monitoring**: watching criminal marketplaces for your data, credentials, or plans against you.
OSINT stands for open source intelligence; information-sharing organizations are the ISACs.
## Penetration testing
Authorized attackers try to break in the way real attackers would, proving which vulnerabilities are actually exploitable and how far an intruder could get. Scanning finds possibilities; penetration testing finds consequences.

## Responsible disclosure and bug bounties
Outside researchers who find your flaws need a safe way to tell you. A **responsible disclosure** policy defines how to report and what the researcher may expect. A **bug bounty** program pays for valid reports. Both turn potential attackers into allies.

## System and process audits
Reviewing configurations, procedures, and compliance against standards finds weaknesses that no scanner sees: a missing approval step, an unmonitored account, an unreviewed firewall rule.
The objective calls this a system/process audit.
> Exam tip: "see installed software and missing patches in detail" is a credentialed scan. "Find flaws in a running application" is dynamic analysis. "Alert when a library we use has a new CVE" is package monitoring. "Confirm the vulnerability can actually be exploited" is a penetration test.`,
      hook: "Credentialed scans see more. Static reads code, dynamic tests it running, package monitoring watches dependencies. Threat feeds: OSINT, paid, ISACs, dark web. Pen tests prove exploitability. Disclosure and bounties invite reports."
    },
    {
      id: "u10l2", title: "Analyzing, Responding, Validating, and Reporting", domain: 4, obj: "4.3", minutes: 9,
      body: `A scan produces hundreds of findings. The rest of the cycle turns that list into fixed systems and proof.

## Analysis: is it real, and how bad is it?
- **Confirmation**: a **false positive** is a reported flaw that is not really there; a **false negative** is a real flaw the scanner missed. Confirm findings before spending effort.
- **Prioritize** using several inputs:
  - **CVSS** (Common Vulnerability Scoring System): a 0 to 10 severity score. None 0, Low 0.1 to 3.9, Medium 4.0 to 6.9, High 7.0 to 8.9, Critical 9.0 to 10.0.
  - **CVE** (Common Vulnerabilities and Exposures): the unique identifier for each publicly known flaw, so everyone is talking about the same one.
  - **Vulnerability classification**: the type of flaw and what it allows.
  - **Exposure factor**: how much of the asset's value would be lost if exploited.
  - **Environmental variables**: is the system internet-facing, does it hold sensitive data, are compensating controls in place?
  - **Industry and organizational impact**: what a compromise would mean for operations, customers, and regulators.
  - **Risk tolerance**: how much risk the organization has decided to accept.
A critical CVSS score on an isolated test system may rank below a medium score on the internet-facing payment server.
Two more prioritization inputs the objective names: industry/organizational impact and risk tolerance.
## Response and remediation
- **Patching**: the normal fix.
- **Insurance**: transfers financial impact; does not fix anything.
- **Segmentation**: reduces exposure when a fix is not yet possible.
- **Compensating controls**: alternative protections that reduce the risk.
- **Exceptions and exemptions**: a documented, approved decision to leave a vulnerability unfixed for a stated reason and period, with an owner.

## Validation
Prove the fix worked. **Rescan** the system, **audit** the configuration, and **verify** that the vulnerable behavior is gone. A ticket marked closed is not validation.

## Reporting
Summarize open vulnerabilities by severity, time to remediate, trends over time, and exceptions, for both technical teams and management.

> Exam tip: after a patch is applied, the next step is rescanning to validate. A finding that turns out to be untrue is a false positive. Prioritization is never CVSS alone; exposure and environment change the order.`,
      hook: "Confirm (false positives and negatives), prioritize by CVSS, CVE, exposure, environment, impact, and tolerance. Respond: patch, segment, compensate, insure, or document an exception. Validate by rescanning. Report trends."
    },
    {
      id: "u10l3", title: "Monitoring Activities and Tools", domain: 4, obj: "4.4", minutes: 9,
      body: `Monitoring is how you learn that prevention failed. The exam lists the activities that make up monitoring and the tools that perform them.

## Activities
- **Log aggregation**: collect logs from every system into one place so events can be correlated.
- **Alerting**: rules that fire when something significant happens.
- **Scanning**: regularly checking systems for vulnerabilities and configuration drift.
- **Reporting**: summaries for operations, management, and compliance.
- **Archiving**: retaining logs for the required period, for investigations and regulators.
- **Alert response and remediation**: what happens when an alert fires, including **quarantine** of an affected system.
- **Alert tuning**: adjusting rules to reduce false positives so real alerts are not lost in noise. Untuned alerting leads to alert fatigue and missed incidents.

## Tools
- **SCAP** (Security Content Automation Protocol): a standard format for expressing configuration checks and vulnerability data, so tools can automatically compare systems against **benchmarks** such as published hardening guides.
- **Agents versus agentless**: an agent installed on the system reports continuously and in depth; agentless tools query systems over the network without installing anything.
- **SIEM** (security information and event management): aggregates logs from everywhere, correlates events across sources, alerts on patterns, and retains data. The center of security monitoring.
- **Antivirus and endpoint protection**: detects and blocks malware on hosts and reports to the center.
- **Data loss prevention**: watches for sensitive data leaving by email, upload, or removable media, and blocks it.
- **SNMP traps**: devices push alerts to the monitoring system the moment something happens, such as an interface failing.
- **NetFlow**: summaries of network conversations: who talked to whom, how much, when. Reveals exfiltration and unusual patterns without capturing every packet.
- **Vulnerability scanners**: the identification tools from the vulnerability management cycle, run on a schedule.

## Putting it together
Systems send logs and flows to the SIEM; scanners and SCAP checks feed compliance status; endpoint agents and DLP report from hosts; SNMP traps report from devices. Analysts tune alerts, respond, quarantine when needed, and report.

> Exam tip: "correlate events from firewalls, servers, and endpoints" is a SIEM. "Automated comparison against a hardening benchmark" is SCAP. "Detect large data transfers to an unusual destination" is NetFlow. "Too many false positives" is fixed by alert tuning.`,
      hook: "Aggregate, alert, scan, report, archive, respond and quarantine, tune. SIEM correlates, SCAP checks benchmarks, DLP stops leaks, SNMP traps push device alerts, NetFlow shows conversations, scanners find flaws."
    }
  ]
});
