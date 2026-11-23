// CIIP Academy curriculum, units 4 and 5. Original teaching content for the ABII CIIP exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u4", n: 4, title: "Information Technology", domain: 7,
  blurb: "The storage, network, hardware, software, identity, and data foundations under every imaging system.",
  assumes: "Unit 1.",
  lessons: [
    {
      id: "u4l1", title: "Storage Types and Protocols: NAS, SAN, SSD, iSCSI, Fibre Channel, SATA, S3, SMB and CIFS, NFS", domain: 7, obj: "G1", minutes: 11,
      body: `The department wants a new archive, and three vendors quote three different kinds of storage. Before you compare prices you need to know what each kind is, how a server talks to it, and which job it suits. The exam asks you to match the storage to the job.

## Four ways to attach storage
- **DAS**, direct-attached storage, is a set of drives wired to one server. It is simple and fast, and nobody else can use it.
- **NAS**, network-attached storage, shares folders over the network. Windows clients use SMB (the older name is CIFS); Unix and Linux clients use NFS. The server sees a file share.
- **SAN**, a storage area network, gives servers raw block volumes over a dedicated fabric. The two transports are Fibre Channel (its own fast fabric) and iSCSI (block storage over ordinary TCP and Ethernet). The server sees a disk it formats itself.
- **Object storage** keeps data as objects, each with an ID and metadata, in one flat space. It is reached through an interface such as S3, scales very wide, and is how most cloud archives work.

## Block, file, and object
\`\`\`
Access     You get              Typical protocol        Fits
Block      a raw volume         iSCSI, Fibre Channel    databases, virtual machines
File       folders and shares   SMB, CIFS, NFS          image cache, shared reports
Object     keyed objects        S3                      long-term archive, cloud tier
\`\`\`

## The drive underneath
**SATA** is the drive interface for lower-cost disks and **SCSI** for enterprise storage. An **SSD** is flash with no moving parts, so reads are very fast and latency is low. Spinning disks cost less per terabyte. A common design puts the database and the active image cache on SSD and the bulk of older studies on cheaper disk or object storage.

## Choosing for the job
Ask what the workload does. A PACS database makes many small reads and writes, so it needs block storage with high IOPS. An image cache serves large files to viewers, so a file share on fast disk works. A ten-year archive needs capacity and low cost, so object storage or nearline disk fits.

> Exam tip: database means block storage on fast disk, shared folders mean NAS with SMB or NFS, and a huge cheap archive means object storage. Fibre Channel and iSCSI are both SAN, and iSCSI is the one that rides on the ordinary network.`,
      hook: "Block storage serves databases, file shares serve folders, and object storage serves the long-term archive; match the access type to the job."
    },
    {
      id: "u4l2", title: "Archive Strategy: Online, Nearline, IOPS, Replication, Mirroring, Storage Metrics, Cloud, the Vendor Neutral Archive", domain: 7, obj: "G1", minutes: 11,
      body: `Your PACS vendor announces the end of life of its product, and the hospital asks whether the images can simply move to the next system. The answer depends on one decision made years earlier: where the images live and in what form. This lesson is about that decision.

## Tiers and tiering rules
**Online** storage is fast and holds current and recent studies. **Nearline** is slower and holds older studies that can still be retrieved on demand. **Offline** media is out of the system and fetched by hand. A tiering rule moves a study down a tier by age, last access, or study type, for example after 12 months without a read. The rule must name who approves it, because a study that is moved too soon makes a radiologist wait on a comparison.

## Speed and protection terms
**Throughput** is how many bytes per second move; **IOPS** is how many reads and writes per second a system sustains, and a database needs high IOPS. **Replication** copies data to another system or site as it changes. **Mirroring** writes the same data to two drives at once. A **snapshot** is a point-in-time view for fast rollback and is not a backup. **Storage virtualization** pools many physical drives or arrays into one logical volume, so capacity can grow or move without the servers noticing. **RAID** spreads data over several drives. With n drives, usable capacity is n for RAID 0 (no protection), n divided by 2 for RAID 1 and RAID 10, n minus 1 for RAID 5 (survives one failure), and n minus 2 for RAID 6 (survives two). RAID is not a backup.

## Storage metrics
Track capacity, consumption, growth rate, and months remaining. Months remaining is free space divided by monthly growth. Alert at a threshold, such as 80 percent full, long before the purchase process needs to start.

## Cloud and the VNA
Cloud storage is rented capacity. Check egress cost (you pay to pull data out), retrieval time, and who holds the encryption keys. A **vendor neutral archive** stores images in standard formats behind open interfaces. Several PACS can feed one VNA, **tag morphing** fixes differing tags on the way in or out, and **lifecycle management** deletes or moves studies by policy. Changing the PACS then means pointing a new viewer at the same archive, not migrating the data.

> Exam tip: when a question is about surviving a PACS replacement without a data migration, the answer is a VNA. RAID, mirroring, and snapshots protect against hardware failure, never against deletion or ransomware.`,
      hook: "Tier by age, watch months remaining, and keep images in an open archive so that replacing the PACS does not mean moving the data."
    },
    {
      id: "u4l3", title: "Network Fundamentals: the OSI Model, TCP/IP, Ethernet, Wireless, Bluetooth, Hubs, Switches, Routers, Cabling", domain: 7, obj: "G2", minutes: 10,
      body: `A CT scanner sends a study and the PACS never receives it. The network team says the link is up. You need a way to ask the next question, and the OSI model is that way: seven layers, each with its own failures. The exam expects you to place a symptom at a layer.

## The seven layers with an imaging example
\`\`\`
Layer            Imaging example                         Failure looks like
7 application    DICOM (association, AE titles), HL7, HTTP  association rejected
6 presentation   TLS encryption, encoding                certificate error
5 session        remote desktop session, connection setup  session drops mid-transfer
4 transport      TCP and UDP ports                       port blocked
3 network        IP addresses, routers                   no route, wrong gateway
2 data link      Ethernet frames, MAC addresses, VLANs   wrong VLAN, flapping port
1 physical       cable, fiber, radio                     dead link light
\`\`\`
DICOM is an application-layer protocol: association negotiation and AE titles belong to layer 7, and the data rides on TCP at layer 4. Work from the bottom up when nothing connects, and from the top down when the connection works but the exchange fails.

## TCP and UDP
**TCP** is connection-oriented: it acknowledges data and retransmits what is lost. DICOM, HL7, and HTTP use it because a study must arrive whole. **UDP** has no delivery guarantee and is fast, which suits DNS lookups, time, and logging.

## Devices
A **hub** repeats every frame to every port. A **switch** forwards by MAC address. A **router** moves traffic between networks by IP address. A **gateway** translates between different protocols or networks. A **trunk** carries several VLANs between switches.

## Media
Wired **ethernet** over Cat 5e or Cat 6 copper reaches 100 meters at gigabit speed. **Fiber** carries light, so it goes farther and ignores electrical noise; multimode is for short runs and single-mode for long ones. **Wireless** is convenient for carts and handhelds but shares the air and has more variable speed, so a diagnostic workstation stays wired. **Bluetooth** is a short-range link for peripherals such as headsets and scanners, not for images.

> Exam tip: a switch works at layer 2 by MAC address and a router at layer 3 by IP address. A blocked port is layer 4, a certificate error is layer 6, and a rejected DICOM association is layer 7.`,
      hook: "Place the symptom at an OSI layer, work bottom-up when nothing connects, and remember a switch uses MAC addresses while a router uses IP addresses."
    },
    {
      id: "u4l4", title: "Network Configuration: Addressing, VLAN, VPN, DNS, ARP, NAT, Firewalls, TLS, Ports, Transmission Protocols, Load Balancing, Metrics", domain: 7, obj: "G2", minutes: 11,
      body: `A new MRI scanner is installed and cannot send to PACS, although it can reach the internet. You will open the configuration of both ends, and every setting you check is on this page.

## Addressing
An IP address names a host, the **subnet mask** says which part is the network, and the **default gateway** is the router used to leave the network. A **virtual IP** is an address shared by a pair of servers so clients keep one name when the active server changes. **DHCP** hands out addresses automatically; give modalities and servers fixed or reserved addresses so their DICOM settings stay valid. **DNS** turns names into addresses and **ARP** turns an address into a MAC address on the local network. **NAT** translates private addresses to a public one, and a modality behind NAT may not be reachable for a {{C-MOVE}}.

## Network types
A **LAN** is one site and a **WAN** links sites. A **VLAN** separates devices on shared switches, for example modalities apart from office computers. A **VPN** is an encrypted tunnel across an untrusted network.

## Firewalls and ports
A firewall allows or blocks traffic by rule. For imaging the rules name ports:
\`\`\`
Service          Port
DICOM            104 or 11112 (2762 over TLS)
HL7 over MLLP    site-chosen
HTTP / HTTPS     80 / 443
SSH / RDP        22 / 3389
LDAP / LDAPS     389 / 636
\`\`\`
**TLS** encrypts the connection and proves the server's identity with a certificate. Transmission protocols you will meet are DICOM, FTP, HTTP, and SSH; use the encrypted forms.

## Resilience and metrics
**Load balancing** spreads requests across servers, **fault tolerance** lets a service survive a failure, and **redundancy** is the duplicate path or part that makes it possible. Measure **capacity**, **bandwidth**, **latency** (delay), performance, and cost. Transfer time is size in bits divided by link speed in bits per second, and a byte is 8 bits.

> Exam tip: a DICOM send fails for a matching reason: wrong AE title, address, port, a firewall rule, or a missing route. Check the settings on both ends before blaming the cable.`,
      hook: "Address, mask, gateway, port, and firewall rule: check those on both ends first, and use bits divided by bits per second for transfer time."
    },
    {
      id: "u4l5", title: "Hardware: CPU, GPU, Memory, Drives, NIC, Buses, Removable Media, Servers", domain: 7, obj: "G3", minutes: 9,
      body: `A radiologist complains that a large breast tomosynthesis study takes a full minute to open on one workstation and seconds on the next one. You are asked to find out why and to write the specification for the replacement. Start with what each component does.

## Components and the job each does
\`\`\`
Component   What it does for imaging                 Symptom when short
CPU         runs software, compression, queries      slow loading, queued work
GPU         3D rendering, display output             slow scrolling and reconstruction
RAM         holds the open study                     paging to disk, freezes on big studies
Drives      SSD for speed, hard disk for capacity    slow first open, full cache
NIC         the network connection                   slow transfer, duplex mismatch
\`\`\`
A **NIC** set to the wrong speed or duplex slows image loading even on a good network, so check it before blaming the server. A large study needs a lot of **RAM**, because the viewer holds the whole thing in memory.

## Motherboard connectivity
**PCI** Express slots take cards such as graphics and network adapters. **USB** connects peripherals such as a dictation microphone, a scanner, or a security key. **SCSI** is a drive connection used in older and enterprise storage. **AGP** was an older graphics slot; you only need to recognize it on legacy hardware.

## Removable media hardware
CD and DVD drives still hand patients their images and import outside studies. USB drives are common and risky: an unknown drive can carry malware, so imports go through a controlled workstation and the demographics are reconciled before the images join the archive.

## Servers
Servers play roles: database, image archive, web viewer, interface engine, and application. A rack server uses redundant power supplies, mirrored boot drives, and often two NICs, so one failed part does not stop the service. Workstations play roles too: diagnostic reading, clinical review, technologist QC, and administration. Size each for its role; a diagnostic reader needs the most RAM, the best GPU and displays, and a fast wired connection.

> Exam tip: the FIRST check on a slow workstation is the cheap and local one: memory use, the NIC link speed and duplex, and the drive, before replacing the server or the network.`,
      hook: "Match the part to the symptom: RAM and drives for big studies, GPU for 3D, NIC for slow transfer, and redundant parts in the server."
    },
    {
      id: "u4l6", title: "Software: Operating Systems, Runtimes, Browsers, Remote Tools, Virtual Machines, VDI, Mobile Devices", domain: 7, obj: "G3", minutes: 10,
      body: `The vendor's viewer will only run on a particular Windows version with a particular Java release, and the hospital's security team has just retired that Java release. You sit between the two. Knowing how the software layers depend on each other is how you settle it.

## Operating systems and their lifecycle
An **operating system** such as Windows or Linux has a support lifecycle: after the vendor stops issuing patches, the system is a security risk. Imaging applications are certified by their vendor for specific OS versions, so you upgrade the OS only when the application vendor supports it. Plan the OS upgrade and the application upgrade together, ahead of the end-of-support date.

## Runtimes and why vendors pin versions
Many applications need a **runtime**, such as {{.NET}} or Java, to run. Vendors pin an exact version because they tested against it and a newer one can change behavior. A pinned old runtime is a risk to manage, with an isolated network and a plan to upgrade, rather than a reason to delay the plan.

## Browsers
Browser-based viewers need no install on the workstation, but they need a supported browser version. A browser update that breaks the viewer is a regression test failure in your test plan.

## Remote tools
**RDP** and **VNC** let an administrator or a vendor control a computer from elsewhere. Use them only over a VPN, with named accounts and logging, and close vendor access when the support case ends.

## Virtual machines and VDI
A **virtual machine** is a server running in software; one physical host runs many, on a platform such as VMware. **VDI** hosts desktops in the data center and shows them on a thin client, using a product such as Citrix. It helps with central patching and with reading from many places, but a diagnostic session needs enough GPU and bandwidth behind it.

## Mobile devices
Phones and tablets suit review, on-call triage, and viewing reports. They are not for primary diagnostic reading unless the display and the software are cleared and calibrated for it. Mobile devices need device management, encryption, and a lockable application.

> Exam tip: when a vendor pins an old runtime, the BEST answer isolates and plans an upgrade; it never disables the security team's policy or lets the application run unsupported without a documented exception.`,
      hook: "Pinned versions are a managed risk: match OS and runtime to what the vendor supports, isolate what is old, and never read diagnostically on an uncalibrated phone."
    },
    {
      id: "u4l7", title: "Identity and Access: Active Directory, LDAP, Group Policy, SSO, Two-Factor Authentication, RBAC", domain: 7, obj: "G3", minutes: 10,
      body: `A radiologist leaves the group and, three weeks later, an audit shows her PACS account still active. The fix is not a one-time cleanup but an identity process. Here is how the pieces fit.

## The directory
**Active Directory** is the Microsoft directory that holds users, groups, and computers. **LDAP** is the protocol used to query a directory, and **LDAPS** is the encrypted version, on port 636 instead of 389. A PACS that checks logins against the directory means one account and one password to manage, and removing the account from the directory removes the access. **Group policy** pushes settings to computers and users from the directory: screen lock time, password rules, and blocked USB storage.

## Signing in once
**Single sign-on** lets a person sign in once and reach many applications. Inside a Windows domain, **Kerberos** does this with tickets. **SAML** lets an identity provider vouch for you to another application, in XML tokens; browser-based viewers use it. **OAuth 2.0** is delegated authorization: an application receives a token to act for you without ever seeing your password.

## Two-factor authentication
**Two-factor authentication** combines something you know with something you have, such as a password and a code on a phone. It protects remote access and administrator accounts first.

## RBAC and least privilege
In **role-based access control** permissions attach to roles and people hold roles. **Least privilege** means each role gets only what the work needs. A technologist can send and view; a radiologist can also sign reports; an administrator manages the system but does not read reports.

## The account lifecycle
Provision on the first day by role, change roles when the job changes, and deprovision on the last day, with a periodic account review to catch leavers. **Break-the-glass** access lets a user override a restriction in an emergency; it is allowed, but it is logged and every use is reviewed afterward.

> Exam tip: a leaver who still has an active account is an account lifecycle failure, and the BEST fix is an automated deprovisioning step tied to the human resources record, with periodic review as a backstop.`,
      hook: "One directory, single sign-on, roles with least privilege, deprovisioning tied to human resources, and a logged break-the-glass path."
    },
    {
      id: "u4l8", title: "Data: SQL, Database Design, CSV, XML, JSON, RTF, PDF, and System Lifecycle Planning", domain: 7, obj: "G4", minutes: 10,
      body: `The department head asks how many chest studies are still unread, by site, and no report in the system answers it. A short database query will. You do not need to be a programmer for the exam, but you must read a simple query and know how a database is built.

## SQL in five words
{{SELECT}} chooses the columns to return, {{WHERE}} filters rows by a condition, {{JOIN}} combines rows from two tables on a matching key, {{GROUP BY}} groups rows so a count is computed per group, and {{COUNT}} counts the rows. A query for unread exams by site reads:
\`\`\`
SELECT site, COUNT(*) FROM exams WHERE status = 'unread' GROUP BY site
\`\`\`
Always test a query that changes data on a copy, and run reports against a reporting copy so they do not slow the production system.

## Database design
- A **primary key** uniquely identifies a row, such as an accession number in an exam table.
- A **foreign key** points to another table's primary key, such as the patient ID in the exam table.
- **Normalization** splits data into related tables so each fact is stored once, so a patient's name is changed in one place.
- An **index** speeds searches on a column; too many indexes slow writes.
- Table joining brings the pieces back together. A missing index on a joined column is the classic cause of a slow report, so performance work starts there, and maintenance means rebuilding indexes and backing up the database on a schedule.

## Exchange and document formats
**CSV** is plain text, one record per row, easy to export and open. **XML** and **JSON** are structured text for exchange between systems, and JSON is lighter. **RTF** is an editable formatted document and **PDF** is fixed for viewing and archiving.

## System lifecycle planning
Every system has a technology lifecycle: adoption, growth, maturity, and end of support. Plan the replacement before the vendor's end-of-support date, with budget, a migration plan, and a date for the old system's retirement. A system that runs past end of support is a growing security and compliance risk.

> Exam tip: a slow report on a large table is usually a missing index or an unfiltered join, and the BEST first step is to look at the query and its indexes, not to buy a bigger server.`,
      hook: "Read {{SELECT}}, {{WHERE}}, {{JOIN}}, and {{GROUP BY}}, know primary and foreign keys and indexes, and plan the replacement before end of support."
    }
  ]
});

FRA.units.push({
  id: "u5", n: 5, title: "Systems Management", domain: 8,
  blurb: "Sizing, testing, protecting, monitoring, migrating, and securing imaging systems.",
  assumes: "Unit 4.",
  lessons: [
    {
      id: "u5l1", title: "Capacity Planning: Study Size and Annual Storage From Exam Counts", domain: 8, obj: "H1", minutes: 11,
      body: `Radiology plans to add a second CT scanner and asks how much storage to buy for the next five years. You cannot answer from a feeling. You answer from exam counts and study sizes, and the arithmetic is short.

## Study size
Study size equals images x rows x columns x bytes per pixel. A CT slice of 512 x 512 pixels at 2 bytes per pixel is 524,288 bytes. A study of 60 slices is 60 x 524,288 = 31,457,280 bytes, about 31.5 million bytes. Here are four more worked sizes, using round example matrices (check the real matrix on your own scanners). The mammography row is a round example: real screening studies at 50 micron pixels run about 197 MB uncompressed:
\`\`\`
Modality        Images  Rows x columns   Bytes/pixel   Size
MR (one series)    200  256 x 256        2             26,214,400 bytes (about 26 MB)
CR chest             2  2,000 x 2,500    2             20,000,000 bytes (20 MB)
Mammography          4  4,000 x 5,000    2             160,000,000 bytes (160 MB)
CT, 60 slices       60  512 x 512        2             31,457,280 bytes (about 31.5 MB)
\`\`\`

## Annual storage
Annual storage equals exams per year x average study size. When you have a mix, compute each modality separately and add: exam counts by modality or procedure, times the average size of that modality. Then add what the plain total leaves out: outside studies that are imported, a second copy for the disaster recovery site, and growth.

## Growth and compression
Growth is not just more patients. A new scanner with thinner slices or a longer protocol raises the size of every study. Estimate growth as a percentage per year and compound it. **Lossless compression** reduces the size without changing a pixel: a ratio of 2.5 to 1 turns 4.1 TB into about 1.6 TB. Lossy compression discards data and is a clinical decision, not a storage tweak. Raw sizes are what you plan on when compression is not yet decided.

## Units
Use 1 MB as 1,000,000 bytes and 1 TB as 1,000,000 MB, as storage vendors do. Operating systems often report in multiples of 1,024 and show a smaller figure, so a purchase quote and a server report will not match exactly.

> Exam tip: write the formula, do the multiplication per modality, add the totals, and then apply compression, growth, and the second copy. Mixing bytes and bits, or forgetting the second copy, is how the wrong option looks right.`,
      hook: "Size equals images x rows x columns x bytes, annual storage equals exams x size per modality, then add growth, copies, and compression."
    },
    {
      id: "u5l2", title: "Scalability, Cloud Deployment, New Modalities, and Software Licensing Models", domain: 8, obj: "H1", minutes: 10,
      body: `A vendor offers your hospital a cloud-hosted PACS on a per-study price, while the imaging committee wants to buy a 256-slice CT and a tomosynthesis unit next year. Each decision pushes on capacity in a different way. You advise on all of them.

## Scalability
A system scales when it can grow without being redesigned. Ask the question for each part: can the **database** handle more rows and more simultaneous users, can **storage** be extended without downtime, can the **servers** add capacity or nodes, and does the **network** have headroom on the links the images use. The weakest part sets the limit, so find the bottleneck before spending on the rest.

## Deployment models
\`\`\`
Model     Where it runs                            You keep
On site   your data center                         everything
Hosted    a vendor's data center, dedicated        configuration, some operation
Hybrid    local cache plus cloud archive           fast access, cloud capacity
SaaS      vendor-run application, shared platform  nothing but your users and data
\`\`\`
Cloud models trade capital cost for recurring cost, and they move the risk to the contract. Ask about egress cost, uptime guarantee, data location, how you leave, and who holds the encryption keys.

## New modalities
A 256-slice CT acquires far more images per rotation, and tomosynthesis builds a stack of thin slices of the breast. Both make each study much larger than the one it replaces, so storage and network demand rise faster than the exam count. Plan new modalities by asking the vendor for the real study size, then re-run the annual storage estimate and check the transfer time to the archive and the viewers.

## Software licensing models
- **Subscription**: recurring payment; access or support stops if you stop paying.
- **Perpetual**: pay once and own the license, with support bought separately.
- **Enterprise**: one license for the whole organization.
- **Concurrent**: counts people using it at the same time, good when many users work in shifts.
- **Named user**: counts specific people regardless of when they log in.
- **Per study**: cost rises with volume, which suits a small or uncertain workload.

> Exam tip: choose the licensing model from the usage pattern. Many occasional users favor concurrent, a small steady group favors named user, and unpredictable volume favors per study.`,
      hook: "Find the weakest part when scaling, compare cloud models on exit and egress, size new modalities from real study sizes, and fit the license to the usage."
    },
    {
      id: "u5l3", title: "Test Planning: Strategy, Environment, Test Data, Testers, Test Types", domain: 8, obj: "H2", minutes: 10,
      body: `The PACS vendor ships an upgrade next month. The last upgrade broke the worklist for a morning, and nobody wants a repeat. A test plan is how you find the break in a room where only the test staff are affected.

## The test strategy
A strategy says what will be tested, by whom, in what order, and what counts as a pass. It names the risks that matter most (patient identification, report delivery, downtime behavior) and puts the heaviest testing there. It also sets entry and exit rules: do not start until the build is installed, and do not finish until every critical defect is closed.

## The environment
Build a test system **separate from production** and as close to it as you can: same version, same interfaces, same kinds of modalities or simulators. A test that runs on a different configuration proves little. Never point a test system at the live interface engine without isolating it, or test messages reach real charts.

## Test data
Use test patients with obvious names and fabricated identifiers. If you need realistic images, use de-identified studies or studies approved for the purpose. **Real patient data is not allowed in a test system unless it has the same protections as production and the use is approved.**

## Testers
Include the people who do the real work: administrators, technologists, radiologists, and a representative of billing or the EMR where interfaces are involved. Name them and their hours before the test starts.

## Test types
\`\`\`
Type                      Question it answers
Unit                      does one component work alone
Functional                does the feature match the specification
Integration               do systems exchange data correctly
Workflow                  does a real scenario run from order to report
Regression                do old features still work after the change
User acceptance           do users confirm it does their job
Scalability and stress    what happens under heavy load or growth
Security                  weak passwords, open ports, access control
\`\`\`

> Exam tip: after an upgrade the test that finds an old feature broken by a new one is regression, and the test that ends with users agreeing it does their job is user acceptance.`,
      hook: "Strategy first, a separate environment with fake patients, real testers, and the right test type for each risk."
    },
    {
      id: "u5l4", title: "Test Cases and Suites: Writing, Executing, Documenting, Maintaining", domain: 8, obj: "H2", minutes: 9,
      body: `Your test plan is approved, and now someone must turn it into steps that two different testers will run the same way. That is the work of test cases, and it is the part that decides whether a sign-off means anything.

## Writing test cases and scripts
A **test case** is one check with a purpose, a starting state, the steps, and an **expected result** that can be judged pass or fail. A **test script** is the written steps. Be specific: "Send a CT study from the test modality for the fake test patient named Test, Alpha; confirm it appears on the reading worklist within two minutes with the correct accession number" is a case. "Check that CT works" is not.

## Grouping into suites
A **suite** is a group of cases run together. Common suites are a smoke suite (a short check that the system is up and the main path works), a regression suite (the cases that protect old features), and an interface suite (every message type and direction). Keep suites small enough to run before every release.

## Executing and logging defects
Run each case as written, record the result (pass, fail, blocked), the tester, and the date. For a failure record the steps, the actual result, the build, the severity, and a screenshot or log excerpt, so a developer can repeat it. Retest after the fix and rerun the regression suite, because a fix can break something else.

## Documenting and sign-off
Test results are kept as a record: what was run, what passed, what failed, what was waived and by whom. The **sign-off** is the written approval by the business owner (and the clinical lead where the workflow is clinical) that the system may go live. A sign-off with open critical defects needs a named risk acceptance.

## Maintaining the suites
Every upgrade, new modality, interface change, or workflow change means updating the cases: add cases for new features, change the expected results that moved, and retire the cases for features that are gone. A suite that is not maintained passes tests that no longer describe the system.

> Exam tip: if a question asks what makes a test case usable, the answer is an expected result that can be judged pass or fail. If it asks what to do after every upgrade, the answer is run the regression suite and update the cases.`,
      hook: "Write cases with a pass-or-fail expected result, group them into suites, log every defect, get a written sign-off, and update the suites after every change."
    },
    {
      id: "u5l5", title: "Resilience: Redundant Components, High Availability, Failover and Failback, Replication", domain: 8, obj: "H3", minutes: 10,
      body: `The emergency department tells you that PACS must be available all the time, and the hospital asks for "five nines." You must turn that wish into a design and a number, and say what each extra nine costs.

## Failure and risk analysis
Start by listing what can fail (a power supply, a drive, a switch, a server, the site) and rate each by how likely it is and how much damage it does. Design redundancy for the failures that are both likely and damaging, and accept the rest in writing.

## Redundant components and high availability
**Redundant components** are duplicates of parts: two power supplies, mirrored drives, two network cards on separate switches. **High availability** is a design that keeps service running through a failure. **Clustering** makes several servers act as one so another takes over, and **load balancing** spreads requests so one server is not the single point of failure.

## Failover and failback
**Failover** moves the service to the backup, **manually** by an administrator or **automatically** by the cluster when it detects a fault. **Failback** returns the service to the primary after it is repaired. Both must be tested on a schedule; a failover that was never tried often fails when needed.

## Replication
**Synchronous replication** finishes a write only when both copies have it: no data loss, but it needs a fast, short link. **Asynchronous replication** does not wait, so the copy lags and a failure can lose the most recent data. Choose by how much loss the business tolerates.

## Availability and downtime
Availability is uptime divided by total time, and downtime per year is (1 minus availability) x 525,600 minutes.
\`\`\`
Availability     Downtime allowed per year
99%              5,256 minutes (about 87.6 hours)
99.9%            525.6 minutes (about 8.8 hours)
99.99%           52.56 minutes
99.999%          5.256 minutes
\`\`\`
Each extra nine cuts allowed downtime to a tenth and costs much more. Ask whether planned maintenance counts.

> Exam tip: a question that gives you a downtime allowance wants a percentage, and one that gives a percentage wants minutes. Do the multiplication, and do not mix a monthly number with a yearly one.`,
      hook: "Find the likely and damaging failures, add redundancy and tested failover, pick synchronous or asynchronous replication by tolerable loss, and convert nines to minutes."
    },
    {
      id: "u5l6", title: "Disaster Recovery and Business Continuity: Data Protection, Downtime Policy, Recovery Objectives", domain: 8, obj: "H3", minutes: 11,
      body: `A ransomware message appears on a file server at two in the morning. The next hour decides whether radiology is reading on paper for a day or for a week. What you did years ago, in plans and backups, is what you now have.

## Two plans, two jobs
**Disaster recovery** restores the systems: servers, storage, the network, and the data. **Business continuity** keeps the clinical work going while the systems are down: who does what, on which forms, and with which local tools. A hospital needs both, and each has an owner and a written plan.

## Data protection
Backups are copies on separate media made on a schedule, with a restore that has been tested. Keep **offsite copies** away from the building and, against ransomware, an **immutable copy** that cannot be changed or deleted for a set period, even by an administrator. RAID, replication, and snapshots do not replace backups: deleted or encrypted data is replicated faithfully.

## Recovery objectives
\`\`\`
Objective   Question it answers                       Drives the choice of
RPO         how much data can we afford to lose        backup or replication frequency
RTO         how long can we be down before it hurts    standby systems, restore method
\`\`\`
An RPO of 15 minutes means data must be copied at least every 15 minutes. An RTO of 4 hours means the restore must be proven to finish in under 4 hours. Tighter objectives cost more, so the clinical owners set them, not the IT team alone.

## Downtime policy and procedures
A **downtime policy** states when downtime procedures start and who decides. The procedures name: a **downtime viewer** with recent images and reports; the **local storage** on each modality, which holds studies until PACS returns; **paper workflows** with prepared forms for orders and requisitions; and a **reconciliation** step afterward, when paper orders are re-entered, studies are matched, and the queues are checked for lost or duplicated work.

## Testing
A plan that is never exercised fails. Test restores of real backups, a failover to the standby, and a downtime drill with real staff on paper, and record the time each step took against the RTO.

> Exam tip: for a ransomware question, the FIRST concern is a clean copy to restore from. The immutable offsite copy is the protection that still works when production and replicas are both encrypted.`,
      hook: "Disaster recovery restores the systems, business continuity keeps work going; set RPO and RTO with the clinicians, keep an immutable offsite copy, and drill the downtime plan."
    },
    {
      id: "u5l7", title: "Monitoring and Incidents: Reporting, Dashboards, Alerts, SNMP, Troubleshooting Tools", domain: 8, obj: "H4", minutes: 10,
      body: `Users call the help desk at 14:10: studies from the new scanner are not appearing. Good monitoring would have told you at 13:50. This lesson is about the systems that find problems before the phone does, and the method you use when they do not.

## Incident reporting
Every problem enters one ticket system with a time, a reporter, a **priority** by clinical impact, an owner, and a record of what was done. A stat study blocked outranks a printer. The ticket is the history that the root cause review and the status report read later.

## Monitoring, dashboards, and alerts
**Automated monitoring** checks systems continuously and **dashboards** show the live state: interface queues, storage, server health, and study counts. An **alert** fires when a measure crosses a threshold, such as storage at 80 percent or a message queue that has not moved for 10 minutes. Set thresholds from what is normal, send alerts to a named person or team, and review them, because alerts nobody reads are as bad as none.

## SNMP
**SNMP** lets a monitoring tool poll devices for status (port 161) and receive traps, the unsolicited alerts a device sends when something happens (port 162). Switches, servers, and storage arrays commonly support it.

## Troubleshooting tools
- **Network protocol analysis** captures traffic to show exactly what was sent and what answered.
- **DICOM simulation and validation tools** act like a modality or a PACS and check files and messages against the standard.
- **Log aggregation** collects logs from many systems in one place, so you can search all of them for one accession number.

## A study that never arrived
1. Confirm what the sender thinks: does the modality show it sent the study, and did it get an acknowledgment?
2. Verify the path: DICOM echo from the modality to PACS, then the address, port, and AE title on both ends.
3. Check the receiver: PACS logs, the unmatched or error queue, and the disk space.
4. If still unclear, capture the traffic and read the association.
5. Fix, resend, and confirm the study is on the worklist.

> Exam tip: after incident triage, the BEST next step is the logs on the system that last handled the study, not a restart. Gather evidence before you change anything.`,
      hook: "One ticket system, dashboards and thresholds, SNMP for polling and traps, and logs and captures before any restart."
    },
    {
      id: "u5l8", title: "Root Cause Analysis and Status Reports to Management", domain: 8, obj: "H4", minutes: 9,
      body: `The same worklist outage has now happened three times in two months, and each time the help desk restarted a service and closed the ticket. Management asks why it keeps happening. That question is not an incident question; it is a problem question.

## Incident versus problem management
**Incident management** restores service quickly: restart, workaround, resend. **Problem management** finds and removes the cause so the incident does not return. Several similar incidents become one problem record. The first is measured in minutes to restore, the second in recurrences removed.

## Root cause analysis, step by step
1. **Problem definition.** State what happened, when, where, and the effect, in a sentence with no cause in it.
2. **Data collection.** Gather logs, tickets, configuration changes, timelines, and what people saw.
3. **Possible causal factors.** List every contributing factor: a change, a full disk, a missed alert, a procedure gap. A fishbone chart helps to group them.
4. **Root causes.** Ask why until you reach a cause that, if removed, would stop the event, and which you can act on. Stop at a process or a design, not at a person.
5. **Solution recommendations and implementation.** Propose actions with owners and dates, then make the changes and check that the problem does not return.

## The status report to management
Management does not need the packet capture. It needs a short, plain report in a fixed order:
\`\`\`
Part         Content
What         what happened, when, and for how long
Impact       who and what was affected: studies delayed, readers, patients
Cause        the root cause in plain words
Fix          what restored service and what permanently removes the cause
Prevention   actions, owners, and dates; how you will confirm they worked
\`\`\`
Send the report on time, state facts rather than blame, and update it when the preventive actions are done. A fix that is not confirmed after a few weeks is not a closed problem.

> Exam tip: a repeat outage means problem management and root cause analysis, not another restart. The BEST root cause names a process or design change that can be verified, not a person to retrain.`,
      hook: "Restoring service is incident work; stopping the repeat is problem work, five steps from definition to a verified fix, reported as what, impact, cause, fix, and prevention."
    },
    {
      id: "u5l9", title: "Data Migration: Scope, Strategy, Transfer, Integrity, Correction, Proprietary Data, Cost, User Impact, Progress", domain: 8, obj: "H5", minutes: 11,
      body: `The hospital is replacing its PACS and wants twelve years of studies to be available on day one. Migration is where projects slip, because the data is bigger, dirtier, and more tied to the old system than anyone remembered. You own the plan.

## Scope
Define what moves: which systems, how many years, which data types (images, reports, presentation states, annotations), and what is left behind. Count it in studies and in terabytes, and agree the scope in writing with the owners.

## Strategy
- **Phased**: move in stages, newest first, running in parallel until old data is in.
- **Big bang**: everything at one cutover; short, risky, and rarely right for a large archive.
- **Prefetch-driven**: move the studies likely to be needed (priors for scheduled patients) ahead of time, and the rest in the background or on request.
- **Archive to archive**: copy from the old archive into the new one directly, without the viewer in the path.

## Physical transfer
Compute the transfer time: size in bits divided by the usable throughput, not the link speed. If the window is too short, add parallel streams or ship drives. A migration also loads the old system, so schedule heavy transfer in off hours.

## Standardization and integrity
Migration is the chance to fix tags: **tag morphing** corrects patient IDs, procedure names, and other fields on the way. **Reconcile counts** by patient, study, series, and image between source and target, and sample images to confirm they open and look the same.

## Record quality
Find problems by queries: duplicate patients, missing accession numbers, studies with the wrong ID. Evaluate each by clinical risk, correct in the new system by a written rule, and keep a list of what was changed.

## System-proprietary data
Presentation states, annotations, and key images are often stored in a vendor-specific form. Plan a custom migration method, convert to a standard representation where possible, and tell the radiologists what will not move.

## Cost, impact, and progress
Plan the cost of transfer effort, extra storage, and the vendor's migration fees, and a performance model of the load. Warn users of slower response in the windows. Report progress weekly: studies moved, studies failed, and estimated completion.

> Exam tip: the BEST proof of a good migration is a reconciliation of counts at every level plus a sample of images, signed off before the old system is retired.`,
      hook: "Scope it, pick the strategy, compute the transfer time, fix tags in flight, reconcile counts, plan for proprietary data, and report progress."
    },
    {
      id: "u5l10", title: "Security and Privacy: HIPAA, GDPR, PIPEDA, the ACR-AAPM-SIIM Practice Parameter, NIST, Layered Security, Encryption", domain: 8, obj: "H6", minutes: 11,
      body: `A vendor technician asks for a permanent remote login to the PACS server, and the hospital's compliance officer asks you for the last risk assessment. Security and privacy are your job in imaging, and the exam expects you to know what the rules require and which control answers which risk.

## The rules and guidance
- **HIPAA** is the United States law. Its privacy rule governs the use and disclosure of protected health information, and its security rule requires administrative, physical, and technical safeguards for electronic information. **HITECH** extends it and sets breach notification duties.
- **GDPR** is the European Union regulation with consent and data-subject rights, and **PIPEDA** is the Canadian federal privacy law for private-sector organizations.
- The **practice parameter** from the ACR, AAPM, and SIIM covers the electronic practice of medical imaging, including privacy and security.
- **NIST** frameworks guide the selection of security controls.
Retention periods and breach deadlines vary by state and country, so check the local rule rather than recall a number.

## Layered security
\`\`\`
Layer           Examples
Physical        locked server rooms, badge access, screen privacy
System          patching, hardening, removing unused services
Network         segmentation with VLANs, firewalls, VPN for remote access
Endpoint        antimalware, device encryption, least privilege
Application     role-based access, secure settings, session timeout
Data            encryption at rest and in transit
\`\`\`
**Encryption at rest** protects disks and backups if media is stolen, and **encryption in transit** with TLS protects data on the wire. Manage the keys separately from the data.

## Privacy practice
**Minimum necessary** means users see only the data the job needs. **Access audits** review who opened which record and when, to find snooping. **Breach response** is a written plan: contain, assess, notify the people and the regulators required by local law, and fix the cause.

## The security risk assessment
List assets and where patient data lives, identify threats and weaknesses, rate the risk, choose controls, and record the decision. Repeat after a major change or on a schedule. Remote vendor access in the opening case should be time-limited, logged, over a VPN, and tied to a named person.

> Exam tip: a vendor wanting always-on remote access is answered with the least privilege and logged option, not with a flat refusal and not with a shared password. When the question names a regulation, match the region: HIPAA with the United States, GDPR with Europe, PIPEDA with Canada.`,
      hook: "Match the law to the region, layer physical to data controls, give users the minimum necessary, audit access, and run a written risk assessment."
    }
  ]
});
