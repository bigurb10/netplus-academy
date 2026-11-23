// CIIP Academy deeper explanations, units 4 and 5. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u4l1: `## Matching storage to three real jobs
A hospital buys storage for three jobs, and a different answer is right for each. The database that tracks every study makes thousands of small reads and writes a minute. The image cache serves whole studies to viewers, one large file at a time. The archive holds a decade of studies that are rarely opened. The three jobs differ in speed, sharing, and cost, and the storage type follows.

\`\`\`
Job                  Access type   Likely transport        Likely media
PACS database        block         Fibre Channel or iSCSI  SSD
Image cache          file          SMB, CIFS, or NFS       fast disk or SSD
Long-term archive    object        S3                      high-capacity disk, cloud
\`\`\`

## Why the protocol matters
A block volume appears to the server as a raw disk, and the database writes to it directly, so latency is what counts. A file share is a folder structure with permissions; the storage system, not the server, manages the files, so many viewers can read the same folder. Object storage has no folders and no random in-place writes: you store a whole object, get it back by its key, and the system adds metadata. That fits write-once images, which is why archives and clouds use it.

## A worked comparison
A vendor quotes a NAS with four 8 TB drives for the image cache. With a RAID 5 layout the usable capacity is (4 minus 1) x 8 = 24 TB. A second vendor quotes a SAN with a Fibre Channel fabric for the same job. The SAN is faster and costs more, and it brings block volumes the server must format and share. For a cache of large files that many clients read, the NAS meets the need at lower cost. For the database, the vendor's own requirement settles it: if the vendor lists block storage and a minimum number of IOPS, a file share is not an option however cheap.

## Reading the answer choices
- If the stem says "shared folders for Windows clients," the answer is NAS with SMB.
- If it says "raw volume for a database or hypervisor," the answer is SAN, using iSCSI or Fibre Channel.
- If it says "ordinary Ethernet network, no dedicated fabric," the block option is iSCSI.
- If it says "cloud archive," think object storage and S3.
- If it says "drives inside one server," it is DAS.

A drive interface appears in the stem to distract you: SATA and SCSI describe how a drive connects to its controller, not how a server reaches shared storage.`,

u4l2: `## Usable capacity under each RAID level
RAID questions mix a drive count with a size. The rule is the same each time: find the number of drives that hold data, then multiply by the size of one drive. Take eight drives of 4 TB each, which is 32 TB of raw space.

\`\`\`
Level     Drives that hold data   Usable of 8 x 4 TB   Survives
RAID 0    n                       32 TB                no failure
RAID 1    n / 2                   16 TB                one failure per mirror pair
RAID 5    n - 1                   28 TB                one failure
RAID 6    n - 2                   24 TB                two failures
RAID 10   n / 2                   16 TB                one failure per mirror pair
\`\`\`
RAID 5 needs at least 3 drives, and RAID 6 and RAID 10 at least 4. More protection costs capacity, and RAID 5 on very large drives is risky, because a second failure during the long rebuild loses the array. RAID protects against a failed drive and nothing else. A deleted study, a corrupt database, a fire, and ransomware all hit a RAID array exactly as hard as a single disk.

## Months remaining
Storage metrics turn into a purchase date. Months remaining equals free space divided by monthly growth.

An online archive has 60 TB usable. Consumption is 42 TB. New studies add 1.5 TB a month.
- Free space: 60 minus 42 is 18 TB.
- Months remaining: 18 divided by 1.5 is 12 months.
- An alert at 80 percent full fires at 0.8 x 60 = 48 TB, which is 6 TB more than today, so in 4 months.

If the purchase process, approval, delivery, and install takes 6 months, the order must go in before the alert fires. When growth changes, for example a new CT adds another 0.5 TB a month, repeat the calculation: 18 divided by 2.0 is 9 months.

## Tiering and the cloud
A tiering rule moves studies older than a set age from the online tier to the nearline tier. If 40 percent of the 42 TB is older than the cutoff, moving it frees 16.8 TB of fast storage and stretches the months remaining of the fast tier. Cloud storage looks cheaper per terabyte, but the cost of getting data out (egress) and the time to retrieve it must be weighed, and the keys should stay with the hospital.

## The vendor neutral archive in practice
A hospital with three PACS products from three acquisitions sends all of them to one VNA. Each sends studies in the standard format; the VNA morphs tags so patient IDs and procedure names agree, and applies one lifecycle policy. When one PACS is replaced, the new PACS queries the VNA. The studies do not move.`,

u4l3: `## Localizing a failed DICOM transfer
A study is stuck on the modality. The fastest way to find the failure is to test one layer at a time. You can start at the bottom and work up when nothing connects at all.

\`\`\`
Layer   What to test                          Tool or sign
1       cable, port light, fiber link         link light, swap the cable
2       VLAN, switch port, duplex             switch port status, MAC address table
3       IP, mask, gateway, route              ping, trace route
4       port open, firewall rule              connect to the port from the modality's side
5-6     association, TLS certificate          the modality's log, certificate dates
7       AE title, SOP class, transfer syntax  DICOM echo, then the PACS rejection reason
\`\`\`

## Worked example
A new ultrasound scanner has a green link light. You can ping the PACS server. The modality's DICOM echo fails with a timeout, not a rejection. A ping that works means layers 1 to 3 are fine. A timeout rather than a rejection means no process answered, which points to layer 4: the DICOM port is blocked by a firewall or the PACS is listening on a different port. You test the port from the modality's network and find it closed. The firewall rule allows 104 but the PACS listens on 11112. The fix is a rule for the right port, and the echo then returns a success. Had the echo returned a rejection with a reason, the failure would be at layer 7, an unknown AE title or an unsupported SOP class.

## Choosing the medium
The cabling decision follows the distance and the noise. Cat 5e or Cat 6 copper runs to 100 meters. A link between buildings, or through a room with heavy electrical equipment, should be fiber: light does not pick up electrical noise, and it goes farther. Multimode fiber fits runs inside a campus and single-mode fiber the long ones.

## Devices in one sentence each
- A hub repeats every frame to every port, so it wastes bandwidth and exposes traffic; you will not see one in a new design.
- A switch learns which MAC address is on which port and sends frames only there.
- A router sends packets between networks using IP addresses and a route table.
- A gateway translates between protocols or networks, for example between a local network and an outside service.
- A trunk carries several VLANs between two switches, so a modality VLAN can reach a switch in another closet.

Wireless and Bluetooth are shared media. A wireless cart is fine for review and for a portable machine's local use, but a fixed diagnostic reader belongs on a wire.`,

u4l4: `## Transfer time with bits and bytes
File sizes are in bytes and link speeds are in bits per second. Multiply the size in bytes by 8 to get bits, then divide by the link speed. Use 1 MB as 1,000,000 bytes and 1 gigabit per second as 1,000 megabits per second.

\`\`\`
Step                      Calculation                         Result
Study size                500 MB                              500 MB
Convert to megabits       500 x 8                             4,000 megabits
On a 1 Gbps link          4,000 / 1,000                       4 seconds at best
On a 100 Mbps link        4,000 / 100                         40 seconds at best
On a 50 Mbps WAN link     4,000 / 50                          80 seconds at best
\`\`\`
These are best-case times. Protocol overhead, a shared link, and a slow disk push the real time up, so plan with headroom: a link used at 60 percent efficiency needs about 1.7 times as long. For a large move, 1 TB is 1,000,000 MB, which is 8,000,000 megabits. At 100 Mbps that is 80,000 seconds, about 22 hours, and a migration window of 8 hours is not enough.

## The configuration checklist for a new modality
\`\`\`
Setting           Check
IP address        fixed or reserved, in the modality VLAN
Subnet mask       matches the network
Gateway           reachable router for the PACS network
DNS               names resolve, or use addresses
AE title          unique, matches the PACS entry
Port              104 or 11112 on both sides
Firewall          rule allows that port in the right direction
NAT               none between modality and PACS, or a mapped port
TLS               certificate valid, if encryption is on
\`\`\`

## Why each one fails
A duplicate IP address makes the connection work for a moment and drop, as the ARP table flips between two hardware addresses. A wrong gateway lets the modality reach its own network but not PACS. A DHCP lease that changed overnight breaks a send that worked yesterday. A VPN can reach the PACS while the DICOM port is not allowed through the tunnel.

## Load balancing, fault tolerance, redundancy
Two web viewer servers behind a load balancer share the work. If one fails, the other carries on: that is fault tolerance. The redundancy is the second server and the second network path. A virtual IP lets clients keep one address while the active node changes.

## Metrics
Track capacity (how much the link carries), bandwidth in use, latency (the delay, which hurts interactive viewing), and cost. A wide area link with enough bandwidth and high latency can still make a remote viewer feel slow.`,

u4l5: `## Writing a specification for a reading workstation
The radiologist's complaint, a tomosynthesis study that opens in a minute, becomes a hardware specification when you break it down by component. Each part is sized from the work it does.

\`\`\`
Component    Sizing question                           Example decision
CPU          does it decompress and render quickly?    a modern multi-core processor
RAM          can it hold the biggest open study?       large memory, not the minimum
GPU          does it drive the displays and 3D?        a professional graphics card
Drive        how fast is the first open?               SSD for the local cache
NIC          is the link fast and set correctly?       wired gigabit or faster, auto-negotiate
Displays     calibrated and cleared for diagnosis?     diagnostic-grade, matched pair
\`\`\`

## Worked example: how much memory?
A tomosynthesis study is 600 MB. The viewer decompresses it, and a radiologist opens the current study and one prior at once. The raw memory for two studies is 2 x 600 = 1,200 MB, before the viewer, the operating system, and other programs. A workstation with 4 GB of RAM (4,000 MB) leaves 2,800 MB for everything else and starts to use the disk as memory, which is why the study takes a minute. A machine with several times that amount keeps both studies in memory and opens in seconds. You choose by adding the largest expected study set, the application's own requirement, and the operating system, then leaving headroom.

## Buses and connectors
- PCI Express is the slot for graphics and network cards.
- USB connects the dictation microphone, a barcode scanner, and a security key.
- SCSI connects drives in older and enterprise storage.
- AGP is an old graphics slot you recognize on legacy machines and do not specify new.

## Servers
A server is chosen by its role. The database server needs fast disk and memory. The archive server needs capacity. The web viewer server needs CPU and network. The interface engine needs reliability. For all of them specify redundant power supplies, each plugged into a separate power circuit, mirrored boot drives, and two network cards on different switches. A rack server is mounted in a cabinet with other servers, with cooling and power planned for the whole rack.

## Removable media
A disc import workstation is a controlled, isolated machine with a CD and DVD drive and a USB port. It checks each disc or drive for malware, reads the index, compares the demographics to the local patient record, and only then sends the images to PACS. An import done straight from a clinician's desk skips those checks and brings mismatched patients into the archive.`,

u4l6: `## A version conflict worked through
The vendor's viewer needs Java release X and Windows version Y. The security team has retired release X and Windows version Y reaches end of support in 8 months. You have three conflicting rules and you must resolve them in an order.

\`\`\`
Constraint                     Who owns it         What you do
Vendor certifies release X     vendor              ask for a certified newer release and a date
Security retires release X     security team       request a time-limited, documented exception
OS reaches end of support      IT and vendor       plan the upgrade now, test in a lab first
\`\`\`

The answer is an exception with conditions: isolate the viewer server on its own network segment, limit who can reach it, remove internet access from it, and set a date for the upgrade. The wrong answers are to run the old release forever, to break the policy silently, or to upgrade the runtime and hope. Testing the new runtime in a test environment first is a regression test, and a failed test is the evidence you bring to the vendor.

## Virtual machines and VDI
A host runs several virtual machines, each an isolated server. The gain is that a failed host's machines restart on another host, you can take a snapshot before an upgrade, and you use fewer physical servers. The cost is that the host is now a single point of failure, so the hosts are clustered, and the imaging servers that need heavy disk or GPU may stay physical.

VDI shows a desktop that lives in the data center. A reader on VDI sees pixels, not the image files, so a slow link affects how responsive scrolling feels rather than how long the study takes to load.

\`\`\`
Use                         Good fit               Watch out for
Clinical review at a bedside  VDI or browser viewer  link speed, session limits
Diagnostic reading            wired workstation      calibrated displays, local GPU
Remote administrator          RDP over a VPN         named accounts, logging
On-call triage                tablet or phone        encryption, lock, cleared software
\`\`\`

## Remote tools safely
RDP and VNC are open doors. Allow them only from the VPN, require individual accounts rather than a shared login, require two-factor authentication for administrators, and log every session. A vendor's remote support should be enabled for a case and disabled afterward.

## Mobile devices
A phone cannot show a diagnostic image the way a calibrated display does. Its screen is small, its brightness varies, and its software may not be cleared for reading. It is fine for looking at a report or a preliminary image. Treat a lost phone as a possible breach unless it was encrypted and remotely wiped.`,

u4l7: `## An RBAC matrix for a radiology department
A role matrix is the working document behind access control. List the roles across the top and the actions down the side, and mark what each role may do.

\`\`\`
Action                  Technologist  Radiologist  Resident  Clerk  PACS admin
View images             yes           yes          yes       no     yes
Send and receive        yes           no           no        no     yes
Edit patient data       limited       no           no        yes    yes
Sign a final report     no            yes          no        no     no
Draft a report          no            yes          yes       no     no
View reports            yes           yes          yes       yes    no
Change system settings  no            no           no        no     yes
Run audit reports       no            no           no        no     yes
\`\`\`

The administrator manages the system but does not read reports, and the radiologist reads and signs but cannot change the system. That is least privilege made visible: each role has what the work needs and nothing else. A role change, for example a resident becoming an attending, is a role change in the directory, not a new account with hand-added permissions.

## The account lifecycle with a worked case
An audit finds a radiologist's account active three weeks after she left. Walk back through the lifecycle to find the gap.

1. Provision: the account was created on day one with the radiologist role. This worked.
2. Change: she moved to a second site, and a second role was added by hand. This is where permissions drift.
3. Deprovision: the leaver notice went to the help desk but not to the imaging team, who manage the local PACS accounts. The directory account was disabled but a local account remained.
4. Review: no periodic account review ran.

The fix has two parts. Make the PACS authenticate against the directory so one disabled account closes all access. Then add a quarterly review of every account against the human resources list. The exam answer is the directory-based fix with a review as a backstop.

## Single sign-on in plain words
A person types credentials once. Inside the Windows domain, Kerberos gives a ticket that applications accept. When the viewer is a web application, SAML lets the identity provider vouch for the person. When one application needs to act on a user's behalf, for example a mobile app reading a worklist, OAuth 2.0 gives it a token with limited rights, so it never holds the password.

## Break-the-glass and audit
In an emergency a clinician may need a record outside normal rights. The system allows it after a warning and a reason, then flags the access. Someone reviews every flag, and misuse is handled by policy.`,

u4l8: `## A query that counts unread exams by modality
The department head wants the unread exams grouped by modality. The data sits in two tables: an exam table with one row per exam, and a modality table that names each modality code.

\`\`\`
exams:       accession (key), patient_id, modality_code, status, site
modalities:  modality_code (key), modality_name

SELECT m.modality_name, COUNT(*) AS unread
FROM exams e
JOIN modalities m ON e.modality_code = m.modality_code
WHERE e.status = 'unread'
GROUP BY m.modality_name
\`\`\`
Read it from the bottom: the rows are filtered by the {{WHERE}} condition, matched across the tables by the {{JOIN}}, collected by the {{GROUP BY}}, counted, and the {{SELECT}} shows the name and the count. If the exam table holds 6 unread CT rows and 4 unread MRI rows, the result has two rows, CT with 6 and MRI with 4.

## What makes the design work
- **Primary key**: accession in the exam table; no two rows share it.
- **Foreign key**: modality_code in the exam table points to the modality table's key. The database refuses an exam with a code that does not exist.
- **Normalization**: the modality name is stored once, in the modality table. Renaming a modality is one change, not ten thousand.
- **Index**: an index on status and on modality_code lets the query find its rows without reading the whole table.

## Why a report is slow
A report that took seconds when the table had 100,000 rows takes minutes at 10 million. The usual causes are a missing index on the filtered or joined column, a join across tables with no matching key, selecting every column when two are needed, and running the report on the production database at peak time. Start by looking at the query and its indexes. Too many indexes help reads and slow writes, because each new row updates every index. Routine maintenance means backups, index rebuilds, and checking free space.

## Formats you meet
CSV is the plain export that a spreadsheet opens. XML wraps each value in named tags, and JSON uses names and values in braces; both carry structure between systems, with JSON lighter. RTF is editable formatted text, and PDF is fixed for viewing, so a signed report is archived as PDF.

## Lifecycle
Draw the lifecycle for a system: adopt, grow, mature, reach end of support. Replacement planning starts a year or more before the end-of-support date, because the budget, the migration, and the testing take that long.`,

u5l1: `## A full annual storage estimate
A general radiology service performs 100,000 studies a year. The mix and the average size per modality come from the department's own statistics, and here we use round figures. Compute each line as exams x size, then add.

\`\`\`
Modality          Share   Exams    Avg size   Storage
Radiography       64%     64,000   42 MB      2,688,000 MB
CT                20%     20,000   52 MB      1,040,000 MB
MRI                5%      5,000   39 MB        195,000 MB
Ultrasound         5%      5,000   18 MB         90,000 MB
Nuclear medicine   3%      3,000   1.3 MB         3,900 MB
Angiography        3%      3,000   15 MB         45,000 MB
Total                      100,000              4,061,900 MB
\`\`\`
The total is 4,061,900 MB. Dividing by 1,000,000 gives about 4.06 TB, which rounds to 4.1 TB for the year, uncompressed. Radiography is 64 percent of the exams and 66 percent of the storage: it has the most weight, so a change in radiography size matters most.

## Adding what the total leaves out
\`\`\`
Step                         Calculation              Result
Base year, uncompressed      from the table           4.1 TB
Lossless compression 2.5:1   4.1 / 2.5                about 1.6 TB
Growth 10% a year, 5 years   1.6 x 1.1 each year      yr1 1.6, yr2 1.8, yr3 1.9, yr4 2.1, yr5 2.3 TB
Second copy for DR           x 2                      doubles the stored total
\`\`\`
Five years of data at the growth rate sum to about 9.7 TB of single copy and about 19.4 TB with a second copy. Say the growth rate and the ratio out loud in the plan, because they are assumptions and the plan should be revisited each year against actual consumption.

## Study size from the matrix
The sheet's example: a 512 x 512 CT slice at 2 bytes per pixel is 512 x 512 x 2 = 524,288 bytes. Sixty slices are 31,457,280 bytes. For a modality, the study size is images x rows x columns x bytes per pixel, and your own scanners report the real counts. A chest radiograph of 2,000 x 2,500 pixels at 2 bytes is 10,000,000 bytes per image, and a two-view study is 20,000,000 bytes, which is 20 MB.

## A change that moves the total
The second CT will add 6,000 exams a year, and the new protocol produces studies 20 percent larger than the old average of 52 MB.
- New size: 52 x 1.2 = 62.4 MB.
- New CT storage: (20,000 + 6,000) x 62.4 = 1,622,400 MB, about 1.62 TB.
- Old CT storage was 1.04 TB, so CT alone grows by about 0.58 TB a year, which is 14 percent of the old total.

## Common mistakes
Mixing bits and bytes, forgetting the second copy, applying compression to a modality that is already compressed, planning from the exam count alone and ignoring that studies are getting larger, and using 1,024 in one place and 1,000 in another.`,

u5l2: `## Comparing deployment models with a decision table
A hospital considers three ways to run a new PACS. The right answer depends on what the hospital wants to keep and what risk it will take.

\`\`\`
Question                       On site            Hosted             SaaS
Who runs the hardware          the hospital       the vendor         the vendor
Who runs the application       the hospital       shared             the vendor
Capital cost                   high               low                low
Recurring cost                 staff and support  fee                fee per study or user
Control of upgrades            full               negotiated         vendor schedule
Exit cost                      move the data      move the data      get the data out
\`\`\`
A hybrid design keeps a local cache for fast access to recent studies and uses cloud capacity for the archive. The decision then rests on the contract: uptime guarantee, where the data sits, egress charges, the format of an export, and who holds the keys.

## Scaling the weakest link
Scalability asks four questions about four parts. A growth of 30 percent in studies does not raise every part equally.

\`\`\`
Part       Test                                     Typical limit
Database   rows and simultaneous users              query time rises
Storage    free capacity, IOPS                      write queues
Servers    CPU and memory under peak load           slow viewers
Network    link use at the busiest hour             slow image delivery
\`\`\`
Measure at the busiest hour, not on average. If the network is at 85 percent at peak and the study volume will rise 30 percent, the link is the bottleneck, and buying more storage will not help.

## A worked effect of a new modality
A hospital adds a tomosynthesis unit doing 20 breast exams a day, 250 days a year, 5,000 exams. Suppose the vendor quotes 500 MB per study. The unit adds 5,000 x 500 = 2,500,000 MB, which is 2.5 TB a year, from one room. A transfer of one study to the archive over 1 Gbps takes 500 x 8 / 1,000 = 4 seconds at best. The new storage needs and the added load on the network must both go into the plan before the purchase.

## Matching license to usage
\`\`\`
Usage pattern                          Model that fits
Many users, rarely on at once           concurrent
A fixed small team, daily use           named user
Whole organization, many sites          enterprise
Volume that varies a lot                per study
Wants low upfront cost                  subscription
Wants to own it and budget support      perpetual
\`\`\`
Always ask what happens when the contract ends. A subscription can lock you out of your own data, and a perpetual license can lose support.`,

u5l3: `## A test plan for a version upgrade
The vendor's upgrade changes the worklist service and the viewer. Here is how the plan breaks down, and what each part contains.

\`\`\`
Plan part      Content for this upgrade
Strategy       worklist, patient matching, report delivery, downtime viewer
Environment    a test PACS at the new version with the test interface engine
Data           fake patients and de-identified studies, covering each modality
Testers        two technologists, two radiologists, one administrator, one billing analyst
Entry rule     build installed and smoke suite passes
Exit rule      no open critical defects; sign-off recorded
\`\`\`

## Matching tests to risk
Each type of test finds a different kind of failure, and you choose the order by risk.

\`\`\`
Risk                              Test type
New viewer button does not work   functional
Study not on the worklist         integration, then workflow
Old report template now broken    regression
Fifty users at once is too slow   stress and scalability
Admin account with default login  security
Radiologist cannot do the job     user acceptance
\`\`\`
A unit test checks one component alone, and is usually run by the vendor. Your tests start at functional and integration.

## A worked example of isolating the environment
The test PACS is built from a copy of production. The copy includes the interface settings, which point at the live interface engine. If the test system is switched on as it stands, it sends test results to real charts. The fix is part of the plan: change every interface in the copy to point at the test engine before the first message, check the list, and have a second person confirm. The same care applies to email alerts and any outbound connections.

## Test data rules
- Use fake names that cannot match a real person.
- Use studies with the identifying data removed, or approved for the use.
- Never copy production data to a lower-security system.
- Keep a record of where test data came from.

## Who tests
The people who know the work find the problems: a technologist notices a missing procedure, and a radiologist notices a hanging protocol. An administrator alone cannot judge whether the workflow is usable. Book their time in advance and record who ran what.`,

u5l4: `## A test case written well
A good case has a fixed shape, so any tester gets the same result.

\`\`\`
Field              Content
Case ID            INT-014
Purpose            a CT study from the test modality reaches the reading worklist
Starting state     test patient exists in the RIS with an order and accession number
Steps              1. receive the worklist on the test modality
                   2. select the test patient and acquire a three-image study
                   3. send the study to PACS
                   4. open the reading worklist as a radiologist
Expected result    the study appears within 2 minutes with the correct accession number
Actual result      (recorded at execution)
Result             pass, fail, or blocked
\`\`\`

## Suites and their purpose
\`\`\`
Suite        Size        Run when
Smoke        10 cases    every build, to decide whether to test at all
Regression   150 cases   every upgrade and every interface change
Interface    60 cases    each message type and each direction
Acceptance   25 cases    users, before sign-off
\`\`\`

## A worked defect and retest
The case above fails at step 4: the study appears with an accession number that has an extra leading character. The tester logs the defect with the case ID, the build number, the steps, the expected and actual accession values, a severity of critical because it breaks matching, and the interface log excerpt. The vendor fixes it. The tester then retests the failed case and, because a fix can break something else, reruns the regression suite and the interface suite. Only then is the defect closed.

## Results and sign-off
The result record states what ran: 214 planned, 205 passed, 6 failed and fixed, 3 waived, with each waiver recorded with the reason and the person who accepted the risk. The sign-off is the written approval from the business owner and the clinical lead. A sign-off that lists open critical defects without a named risk acceptance is not a real sign-off.

## Maintaining the suite
After every change, ask what was added, changed, or removed. A new modality adds worklist and storage cases. A changed accession format changes the expected results in many cases. A retired feature removes its cases. The owner of the suite reviews it after each release and on a schedule. A suite that nobody maintains still shows green, and that is the most dangerous kind of report: it says nothing is wrong when the cases no longer describe the system.

## Documentation habits
Keep the cases in a shared, versioned place, name them with a pattern, and keep the executed results with the build number. When an auditor, a vendor, or a successor asks what was tested before the last upgrade, the record answers.`,

u5l5: `## The availability ladder in minutes
The sheet gives the ladder, and each row comes from the same rule: downtime per year equals (1 minus availability) x 525,600 minutes, the number of minutes in a 365-day year.

\`\`\`
Availability    1 minus availability   x 525,600       Downtime per year
99%             0.01                   5,256           5,256 minutes (about 87.6 hours)
99.9%           0.001                  525.6           525.6 minutes (about 8.8 hours)
99.99%          0.0001                 52.56           52.56 minutes
99.999%         0.00001                5.256           5.256 minutes
\`\`\`

## Working it both ways
Percent to minutes: a system promised at 99.9 percent can be down 0.001 x 525,600 = 525.6 minutes in a year, about 44 minutes in an average month (525.6 divided by 12).

Minutes to percent: a system was down for 263 minutes last year. Availability is 1 minus 263 / 525,600 = 1 minus 0.0005 = 0.9995, which is 99.95 percent.

Does it meet 99.99 percent? The allowance at 99.99 percent is 52.56 minutes. 263 minutes is five times that, so no.

## What a nine costs
Moving from 99.9 to 99.99 percent cuts the allowance from 525.6 to 52.56 minutes, a tenth. Hitting it means duplicating every single point of failure: two servers in a cluster, two power feeds, two network paths, a second site, and a tested failover. The vendor's availability promise often excludes planned maintenance. If your clinical workflow cannot tolerate maintenance windows, ask for the number with maintenance included.

## Synchronous or asynchronous?
\`\`\`
                     Synchronous                 Asynchronous
A write completes    when both copies have it    when the primary has it
Data loss on failure none (in step)              the most recent changes
Link need            fast and short              any speed
Typical use          nearby second room          distant disaster site
\`\`\`
An example: a primary and a standby 5 kilometers apart on a fast dedicated link can run synchronously. A disaster site in another state runs asynchronously, and its recovery point is the lag, for example 5 minutes of studies.

## Failover and failback
Failover is the switch to the standby, manual when an administrator decides or automatic when the cluster detects a fault. Automatic failover is faster but can trigger by mistake on a brief network glitch, so it needs sensible detection times. Failback returns the service after the repair and re-synchronizes the primary; do it in a planned window, not in the middle of a busy morning. Test both on a schedule, and write down how long each took.

## Risk analysis in one table
\`\`\`
Failure           Likelihood   Impact   Answer
Power supply      medium       high     second supply on a separate circuit
Disk              high         medium   RAID, plus backups
Server            medium       high     cluster or standby
Site              low          severe   replication to a second site
\`\`\``,

u5l6: `## Setting recovery objectives with a worked case
The emergency department says it can read from the downtime viewer for 2 hours and from paper for 8 more before care is at risk. The imaging team turns that into objectives.

\`\`\`
Measure   Setting       What it means                                What it drives
RTO       4 hours       service back before the paper plan strains   standby systems, tested restore
RPO       15 minutes    at most 15 minutes of new studies lost        replication every 15 minutes or less
\`\`\`
The numbers are not set by the IT team alone. The clinical owner states how long and how much loss is tolerable, and IT states the cost to meet it. If 15 minutes costs too much, the owner chooses a longer RPO knowingly, for example 1 hour, and the downtime procedure includes re-sending the last hour from the modalities.

## The backup rule in practice
\`\`\`
Copy                       Where                   Protects against
Primary data               production storage      nothing by itself
Replica or snapshot        second array or site    hardware failure, quick rollback
Backup                     separate media          deletion, corruption
Offsite copy               another building        fire, flood, theft
Immutable copy             locked for a set time   ransomware, a rogue administrator
\`\`\`
Ransomware encrypts the primary data, and replication copies the damage. Only a copy that cannot be changed or reached from the infected network is clean. A restore test proves that the backup works: restore a sample study and a whole server into a test area and time it against the RTO.

## What the downtime procedure contains
\`\`\`
Piece                Content
Trigger              who declares downtime and how the staff are told
Downtime viewer      read-only recent images and reports, where to log in
Modality storage     each modality holds studies locally until PACS returns
Paper workflow       order forms, a manual log, labels, a runner for urgent images
Reconciliation       re-enter orders, match studies, resend, check for duplicates
Return to service    who declares the end and what is verified first
\`\`\`

## Reconciliation after the outage
After a 3-hour outage, the modalities held 140 studies. Resend them, then reconcile: compare the modality's count of studies sent with the PACS count of studies received, and check the unmatched queue for studies whose paper orders were not entered. The reconciliation is done when every acquired study is matched to an order and every order has a study or a reason.

## Business continuity versus disaster recovery
Business continuity is how people keep working: the forms, the roles, the viewer. Disaster recovery is how the systems come back: the restore, the failover, the rebuild. Each has its own plan, owner, and test.`,

u5l7: `## Reading the monitoring picture
A dashboard turns many measures into one glance. A good one shows only what a decision depends on.

\`\`\`
Measure                  Normal              Alert threshold            First action
Interface queue          under 20 messages   stuck for 10 minutes       check the receiving system
Storage used             under 70%           80%                        plan expansion or tiering
Studies received today   follows the hours   30% below the usual count  check modality sends
Server CPU               under 60%           over 90% for 15 minutes    find the heavy process
Failed backups           none                any failure                rerun and check the log
\`\`\`
Thresholds are set from the system's own normal range and reviewed after each false alarm or miss. Each alert goes to a named person, with a way to escalate if nobody acknowledges it.

## SNMP in practice
A monitoring server polls each switch, server, and storage array over SNMP for values such as port status, memory, and temperature (the polling port is 161). A device sends a trap to the monitoring server when something happens, such as a failed power supply (the trap port is 162). A firewall that blocks 161 or 162 makes a device look silent, so open them from the monitoring server only.

## The study that never arrived: a worked trace
The scanner shows the study as sent, but PACS has nothing.

1. The modality log shows the send ended with a failure status, not a success. The problem is not an unseen send.
2. A DICOM echo from the modality to PACS succeeds. The path and the AE title are good.
3. The PACS log shows the association was rejected with a reason: the modality's AE title is not registered. Yesterday's configuration change on PACS dropped it.
4. You restore the entry, have the technologist resend, and confirm the study on the worklist.
5. You record the cause in the ticket and add an alert for rejected associations, so the next one is seen in minutes.

## Tools and when to reach for them
- Log aggregation: search many systems for one accession number to find where the study stopped.
- Protocol analysis: capture traffic when the log is silent, then read the association.
- DICOM simulator or validator: send a known good study to prove the receiver works, or validate a file from a modality against the standard to prove the sender is wrong.

The order matters: read the logs before you capture traffic, and capture traffic before you change configurations.

## Incident records
Record the time reported, time started, time restored, priority, impact, steps taken, and cause. These records feed the root cause review and the monthly report.`,

u5l8: `## From incident to problem: a worked example
The worklist stopped three times in two months. Each time the help desk restarted the worklist service, it came back, and the ticket closed. Management asks for a root cause analysis.

\`\`\`
Step                   Work done
1 Problem definition   The reading worklist stopped updating for 20 to 40 minutes, three times in 8 weeks
2 Data collection      Tickets, service logs, change records, disk and queue graphs
3 Causal factors       Disk filling on the database server; log files not rotated; no alert on disk;
                       restarts clearing temporary files and hiding the cause
4 Root causes          No log retention rule on the server; no storage alert for that volume
5 Solution             Set log rotation, add an 80 percent disk alert, review the other servers
\`\`\`
The cause is not the service and not the help desk technician. The restart worked because it freed temporary space for a while, which is also why the fix was missed. A fishbone chart groups the factors under people, process, equipment, and environment; a few why questions take you from "the service stopped" to "nothing watched the disk."

## Checking that it worked
A solution is not finished at implementation. Set a check date, say 6 weeks, and a measure: zero worklist stoppages from a full disk, and the new alert tested by filling a test volume. If the problem recurs, the root cause was incomplete.

## Incident versus problem
\`\`\`
              Incident                          Problem
Goal          restore service now               remove the cause
Measure       minutes to restore                recurrences removed
Example       restart the service               add log rotation and an alert
Owner         help desk, on call                the system owner
\`\`\`

## The status report
Write for a manager who reads for two minutes.

\`\`\`
What        The worklist stopped three times in 8 weeks, up to 40 minutes each.
Impact      About 120 studies delayed per event; no patient harm reported.
Cause       The database server's disk filled because log files were not rotated.
Fix         Services restarted each time; log rotation and a disk alert added on the 14th.
Prevention  Same checks on the other six servers by the end of the month; review in 6 weeks.
\`\`\`
Keep it factual, give dates and owners, and avoid blame. When the review date comes, send a short follow-up saying whether the fix held. That closes the loop and builds the trust that gets the next project approved.`,

u5l9: `## A migration plan with reconciliation counts
A hospital moves 400,000 studies from an old PACS to a new one. The plan has phases, and each phase ends with a count check.

\`\`\`
Phase  Scope                          Method                 Studies   Done when
1      Last 2 years, active patients  prefetch plus archive  120,000   counts match, sample opens
2      Years 3 to 6                   archive to archive     160,000   counts match, sample opens
3      Years 7 to 12                  background copy        120,000   counts match, sample opens
\`\`\`

## Reconciliation at four levels
A study count alone can hide a problem, so compare at each level of the model, for example for phase 1:

\`\`\`
Level      Old system   New system   Difference   Action
Patients   41,200       41,200       0            none
Studies    120,000      119,940      60           list the 60, resend or explain
Series     612,300      611,980      320          trace to the 60 studies
Images     14,880,000   14,871,500   8,500        trace to the same studies
\`\`\`
The 60 missing studies explain the missing series and images, so the plan goes after them. A sample check then opens a set of images, such as 1 in every 500, in the new viewer and compares them with the old to confirm the pixels, the orientation, and the tags. Counts agree and samples fail: the data landed but is damaged. Samples pass and counts disagree: some studies were skipped.

## Time and throughput
Phase 2 is 160,000 studies at an average of 50 MB, which is 8,000,000 MB, or 8 TB. The bits are 8,000,000 x 8 = 64,000,000 megabits. A usable throughput of 400 Mbps gives 64,000,000 / 400 = 160,000 seconds, about 44 hours of continuous transfer. If the old system can send only in an 8 hour night window, that is about 6 nights, so the plan allows 8 to cover failed batches. Quote usable throughput, not the link speed.

## Cleaning on the way
Tag morphing fixes known errors during the copy: a patient ID with a prefix the old system added, an old procedure name mapped to the new name, and a site code. A written mapping table is the source of truth, and the list of changed studies is kept. Records that cannot be corrected by rule, for example two patients with the same ID, go to a review list for a person to decide.

## Proprietary data
Annotations, key images, and presentation states may be stored in the old vendor's form. The options: convert to a standard representation, keep the old viewer for those items for a defined period, or leave them behind with the clinical owner's approval. Tell the radiologists before cutover which items will not appear.

## User impact and progress
A copy slows the old system, so run heavy phases off hours and give users the dates. Weekly progress reports state studies moved, studies failed and why, the estimate to finish, and any change to cost or schedule.`,

u5l10: `## Matching the rule to the case
Exam questions about privacy often name a region or a document. The task is to match, and to remember what each one is for.

\`\`\`
Name              Region or kind        What it covers
HIPAA             United States         privacy rule and security rule for protected health information
HITECH            United States         extends HIPAA, breach notification duties
GDPR              European Union        consent, data-subject rights, strict handling
PIPEDA            Canada                private-sector privacy
Practice parameter  imaging profession  electronic practice of medical imaging, written by ACR, AAPM, SIIM
NIST              United States         frameworks for selecting security controls
\`\`\`
Retention periods and breach notice deadlines vary by state and country. Do not recall a number; check the local law and the hospital's policy.

## A worked risk assessment
The assessment asks the same questions for each asset. Take a PACS server and a vendor's request for permanent remote access.

\`\`\`
Step                  Entry
Asset                 PACS database server holding patient images and demographics
Threat                remote access misused or stolen credentials
Weakness              shared vendor login, no logging, always on
Likelihood and impact medium and high
Controls              VPN only, individual named accounts, two-factor authentication,
                      enabled per support case and closed afterward, session logged
Residual risk         low, accepted by the system owner, reviewed yearly
\`\`\`
The decision is recorded and reviewed after a major change.

## Layers and what each one stops
\`\`\`
Layer          Control                     Stops
Physical       locked room, badge          theft and tampering
System         patching, hardening         known software flaws
Network        segmentation, firewall      lateral movement, outside scans
Endpoint       antimalware, disk encrypt   malware, lost laptop
Application    roles, timeout              misuse by a signed-in user
Data           encryption at rest/transit  readable data if stolen or intercepted
\`\`\`
No single layer is enough. A stolen laptop is stopped by disk encryption, not by the firewall; a phished password is slowed by two-factor authentication, not by a locked room.

## Privacy practice
Minimum necessary: a billing clerk sees demographics and codes, not images. Access audits: review the log for staff opening records of colleagues, neighbors, or celebrities, and act on policy. Breach response: contain the problem, find what data and whose, notify those required by the local law and the hospital, fix the cause, and record the steps. A lost unencrypted drive is a reportable event, while a lost encrypted drive with the keys safe is usually treated differently under the rules, which is one reason to encrypt.

## Encryption in two places
Encryption at rest protects the disk, the backup tape, and the offsite copy. Encryption in transit, with TLS, protects data between viewer and server and between hospitals. Keep the keys apart from the data, and control who can reach them.`

});
