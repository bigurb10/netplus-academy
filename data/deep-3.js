// NetPlus Academy deeper explanations, units 7 to 9. Original content.
window.NPA = window.NPA || {};
NPA.deep = NPA.deep || {};
Object.assign(NPA.deep, {

u7l1: `## The decision every host makes before sending
Before a PC sends anything, it asks one question: **is the destination on my own subnet?** It answers by applying its mask to both addresses.

\`\`\`
My address 192.168.1.10/24, my network 192.168.1.0
Destination 192.168.1.20  -> same network  -> ARP for its MAC, send directly
Destination 10.0.0.5      -> different     -> send to my default gateway's MAC
\`\`\`

For a remote destination the packet still carries the real destination IP (10.0.0.5), but the **frame** is addressed to the gateway's MAC. The gateway is a router, and routers know what to do next.

## What the router does with it
1. Strips the frame and reads the destination IP in the packet.
2. Looks up that destination in its **routing table** and finds the next hop or exit interface.
3. Decrements the **TTL** by one. If it hits zero, drops the packet and sends back an ICMP "time exceeded."
4. Builds a **new frame** addressed to the next hop's MAC and sends it out.

The IP addresses inside never change (unless NAT is involved). The MAC addresses change at every hop.

## Reading a routing table
\`\`\`
Destination        Next hop / interface    Learned from
192.168.1.0/24     directly connected      the router's own interface
10.0.0.0/8         192.168.2.1             static, typed by an admin
172.16.0.0/16      192.168.2.5             OSPF, learned from a neighbor
0.0.0.0/0          203.0.113.1             default route: everything else
\`\`\`

Three ways a route gets there:
- **Directly connected**: networks on the router's own interfaces. Free.
- **Static**: an administrator typed it. Predictable, zero overhead, but it never notices when a link dies. Good for small sites and stub networks with one way out.
- **Dynamic**: learned from other routers by a routing protocol, which adapts automatically when something fails. Next lesson.

## The default route
{{0.0.0.0/0}} matches every destination not covered by something more specific. A branch office router does not need routes to the whole internet; it needs one default route pointing at the provider. Without a default route, packets for unknown destinations are simply dropped.

## What a wrong gateway looks like
- Gateway address wrong, or outside the host's subnet: the host reaches neighbors on its own subnet and nothing beyond. The most common "local works, remote does not" cause.
- Gateway right, but the far router has no **return route**: packets go out, replies never come back.

## How the exam asks it
- "Can reach local devices but not the internet": default gateway.
- "Frame changes at every hop, packet does not": normal routing.
- "Which route is used when no other matches": 0.0.0.0/0.
- "Field that stops a packet looping forever": TTL.

## What to memorize
- Local destination: ARP the host. Remote: send to the gateway.
- Routers rewrap frames, keep the packet, drop TTL by one. 0.0.0.0/0 is the way out.`,

u7l2: `## Two families of routing protocols
Inside one organization, routers run an **interior gateway protocol** (IGP). Between organizations on the internet, they run the one **exterior gateway protocol**, BGP.

## Distance-vector versus link-state: gossip versus a map
- **Distance-vector** routers only know what their neighbors tell them: "network X is 3 hops that way." Like asking directions from whoever is standing next to you. Simple, but slow to notice changes and prone to loops. RIP is the classic example.
- **Link-state** routers share a full description of every link, so each one builds the whole map and computes its own shortest paths. More CPU and memory, but fast convergence and no loops. OSPF is the classic example.

## The protocols you must know
\`\`\`
Protocol   Type                       Metric               Notes
RIP        distance-vector, IGP       hop count, max 15    updates every 30 s; tiny networks only;
                                                           RIPv2 supports CIDR; RIPng for IPv6
OSPF       link-state, IGP            cost (from bandwidth) open standard; areas; Dijkstra shortest path;
                                                           the default inside organizations
EIGRP      advanced distance-vector   bandwidth and delay  Cisco origin; fast; easy to configure
           (hybrid), IGP
BGP        path-vector, EGP           AS path and policy   between autonomous systems; the internet's protocol;
                                                           chooses by policy, not speed; slow to converge on purpose
\`\`\`

An **autonomous system** is one organization's network under one administration. BGP is how ISPs and large companies with two internet providers exchange routes.

## How a router chooses when routes conflict
Three tie-breakers, always in this order:

1. **Longest prefix match.** The most specific route wins. For a packet to 10.1.1.50, a route to {{10.1.1.0/24}} beats {{10.1.0.0/16}}, and both beat the default route.
2. **Administrative distance.** If two routes have the same prefix but came from different sources, the router trusts the source with the lower number.
3. **Metric.** Same prefix, same source: the lower metric wins (fewer hops for RIP, lower cost for OSPF).

\`\`\`
Route source          Administrative distance
directly connected    0
static                1
external BGP          20
EIGRP                 90
OSPF                  110
IS-IS                 115
RIP                   120
internal BGP          200
\`\`\`

Worked example. The table holds 10.1.0.0/16 via OSPF, 10.1.1.0/24 via RIP, and 0.0.0.0/0 static. A packet for 10.1.1.50 arrives. Step 1: the /24 is the longest match that contains the address, so RIP's route wins, even though RIP has the worst administrative distance. Prefix length is decided first and the other rules never get a vote.

Second example. The router learns 10.1.1.0/24 from OSPF and also has a static route to 10.1.1.0/24. Same prefix, so step 2: static (1) beats OSPF (110). The static route is installed.

## Convergence
When a link fails, every router has to learn about it and recompute. Until they all agree, some traffic is dropped or loops. That settling time is **convergence**. Link-state protocols and route summarization keep it short.

## How the exam asks it
- "Routing protocol used between ISPs": BGP.
- "Metric is hop count, limited to 15": RIP.
- "Open standard, link-state, uses areas": OSPF.
- "Same prefix from OSPF and a static route": the static route wins (lower AD).
- "Most specific route wins regardless of protocol": longest prefix match.

## What to memorize
- Prefix length, then administrative distance, then metric.
- Connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120.
- RIP hops, OSPF cost, BGP between autonomous systems.`,

u7l3: `## NAT: the front desk
Private addresses cannot appear on the internet, so the router at the edge rewrites them. Think of a company where every employee has an internal extension but the outside world sees one phone number. The receptionist (NAT) connects calls in both directions.

\`\`\`
Inside                          Router (NAT)                       Internet
192.168.1.10:51000  --->  203.0.113.5:40001  --->  web server
192.168.1.11:51000  --->  203.0.113.5:40002  --->  web server
(the router keeps a table so replies find the right inside host)
\`\`\`

- **Static NAT**: one private address permanently mapped to one public address. One to one. Used to publish a server so the outside can reach it.
- **Dynamic NAT**: a pool of public addresses that inside hosts borrow as needed. Many to many, limited by pool size.
- **PAT** (port address translation, also called NAT overload): every inside host shares **one** public address, and the router tells the conversations apart by the source port it assigns. Many to one. Every home router does this; so do most offices.
- **Port forwarding**: a fixed rule sending traffic that arrives on a public port to a chosen inside host, for example public port 443 to the internal web server.

Two terms that appear in questions: the **inside local** address is the private one; the **inside global** address is its public translation.

## Gateway redundancy: two routers, one address
Every host on a subnet points at one default gateway address. If that router dies, everyone loses the outside world. **First-hop redundancy protocols** let two or more routers share a **virtual IP** and virtual MAC that hosts use as their gateway. If the active router fails, the other one takes over the virtual address. Hosts notice nothing.

\`\`\`
Hosts use gateway 192.168.1.1 (virtual)
[Router A, real 192.168.1.2]  active   \\
                                        > virtual IP 192.168.1.1
[Router B, real 192.168.1.3]  standby  /
\`\`\`

- **HSRP**: Cisco proprietary. Roles are active and standby.
- **VRRP**: the open standard version. Roles are master and backup. If the question says "open standard" or "multi-vendor," this is it.
- **GLBP**: Cisco, and it also load-balances across the gateways instead of leaving one idle.

## Subinterfaces
One physical router port can be split into logical interfaces, each tagged with a VLAN and given its own address. That is how router on a stick routes between VLANs, and how one WAN port can carry several provider circuits.

## How the exam asks it
- "Fifty hosts share one public address": PAT.
- "Make an internal web server reachable from the internet": static NAT or port forwarding.
- "Two routers share one gateway address so hosts survive a failure": FHRP. Open standard: VRRP. Cisco: HSRP.
- "Private address of the inside host": inside local.

## What to memorize
- Static one to one, dynamic pool, PAT many to one by port.
- HSRP Cisco, VRRP open standard, GLBP load balances. All give one virtual gateway IP.`,

u7l4: `## Pick the device for the job
Most questions here describe a job and want the device. Learn each device as a one-line job description first, then the details.

\`\`\`
Job                                              Device
connect networks, choose paths                   router (Layer 3)
forward frames by MAC inside a LAN               switch (Layer 2)
switch that also routes between VLANs            Layer 3 switch
bridge Wi-Fi clients onto the LAN                access point; a controller manages many
filter traffic between zones                     firewall
watch traffic and alert                          IDS
sit inline and block                             IPS
terminate many VPN tunnels                       VPN concentrator
fetch web pages on behalf of users               forward proxy
stand in front of servers                        reverse proxy
spread connections across servers                load balancer
serve content from a nearby cache                CDN
share files over the network                     NAS (file level)
present disks over a dedicated network           SAN (block level)
prioritize voice and video                       QoS (a function, not a box)
\`\`\`

## IDS versus IPS: the picture
\`\`\`
IDS (out of band)                     IPS (inline)
traffic ----> [switch] ----> users    traffic ----> [IPS] ----> users
                 |                                    ^
              copy via SPAN                    every packet passes through it
                 v
               [IDS]  alerts only               blocks in real time
\`\`\`

An IDS sees a copy. It can shout but it cannot stop anything. An IPS is in the path, so it can drop the attack, and also drop good traffic on a false positive, or become a bottleneck.

## Firewalls
A **stateful** firewall remembers connections, so a reply to a request you sent is allowed in without a special rule. A **next-generation** firewall also understands applications and users at Layer 7: "allow this web app, block that one, for this group."

## Proxies, both directions
- A **forward proxy** sits between users and the internet. Users' requests go to it; it fetches the page, filters or caches it, and hides the users' addresses from the outside.
- A **reverse proxy** sits between the internet and your servers. Outside requests hit it first; it terminates TLS, caches, and protects the servers behind it.

## Load balancers and CDNs
A **load balancer** takes incoming connections and shares them across a pool of identical servers, using **round robin**, **least connections**, or health checks that skip dead servers. Scale and fault tolerance. A **content delivery network** copies your content to servers around the world so a user in Tokyo fetches it from Tokyo, not from your data center in Ohio. Lower latency, and traffic spikes are absorbed at the edge.

## NAS versus SAN, one more time
NAS shares **folders** over the regular network using SMB or NFS. A SAN gives servers **raw disk** over its own network using iSCSI or Fibre Channel; the server formats it like a local drive.

## TTL
Every router subtracts one from the packet's time to live. At zero the packet is discarded, which prevents endless loops. Traceroute sends packets with TTL 1, 2, 3... and each router that discards one sends back a message, revealing the path.

## How the exam asks it
- "Alert but do not block": IDS. "Block inline": IPS.
- "Cache web content close to users worldwide": CDN.
- "Distribute sessions across web servers": load balancer.
- "Block-level storage that appears as a local disk": SAN.
- "Hide users' addresses and filter their browsing": forward proxy.

## What to memorize
- IDS watches, IPS blocks inline. Forward proxy for clients, reverse proxy for servers.
- Load balancer spreads servers, CDN caches nearby. NAS files, SAN blocks.`,

u7l5: `## Who manages what: the responsibility ladder
Cloud service models differ only in how much the provider runs for you. Picture dinner:

\`\`\`
On premises   cook at home: you own the kitchen, the stove, the ingredients, the cooking
IaaS          rent a kitchen: provider owns the building, hardware, hypervisor;
              you install and run the operating systems and everything above
PaaS          meal kit: provider runs the OS and runtime; you bring the code
SaaS          restaurant: provider runs the whole application; you just use it
\`\`\`

- **IaaS**: virtual machines, storage, and virtual networks. You patch the OS.
- **PaaS**: a platform for developers. Push code, the provider handles the servers.
- **SaaS**: email, office suites, CRM. Log in and work.

The more the provider manages, the less you control and the less you maintain.

## Deployment models
- **Public**: shared provider infrastructure, pay as you go.
- **Private**: dedicated to one organization, in your own data center or hosted for you.
- **Hybrid**: some on premises, some in a public cloud, connected together. Most real companies.

## The cloud network, piece by piece
\`\`\`
[VPC: your private slice of the provider's network, your own address space]
   subnet A (public)   ---- [internet gateway] ---- internet
      VM, with a security group (stateful firewall on its interface)
   subnet B (private)  ---- [NAT gateway] --------> outbound only
      database VM
   network security list / network ACL: stateless rules on the whole subnet
\`\`\`

- **VPC** (virtual private cloud): an isolated virtual network inside the provider with your own subnets.
- **Network security group**: a **stateful** firewall attached to a single VM's interface. Replies to allowed requests come back automatically.
- **Network security list** (network ACL): **stateless** rules applied to a whole subnet; you must allow both directions explicitly.
- **Internet gateway**: lets resources with public addresses reach and be reached from the internet.
- **NAT gateway**: lets private-subnet resources reach out (for updates, for example) without being reachable from outside.
- **NFV** (network functions virtualization): routers, firewalls, and load balancers running as software instances instead of hardware boxes.

## Connecting your office to the cloud
- A **site-to-site VPN** over the internet: quick to set up, encrypted, but shares the internet's variable performance.
- A **direct connect** (dedicated private circuit): predictable bandwidth and latency, higher cost, weeks to provision.

## Three properties
- **Scalability**: the capacity can grow to meet demand.
- **Elasticity**: capacity grows **and shrinks automatically** with demand, so you pay only for what you use.
- **Multitenancy**: many customers share the same physical hardware, kept apart logically.

## How the exam asks it
- "You manage the operating system, the provider manages the hardware": IaaS.
- "Rules on one VM's interface": security group. "Rules on the subnet": network security list.
- "Private servers need outbound internet only": NAT gateway.
- "Capacity automatically shrinks at night": elasticity.
- "Predictable latency to the cloud": direct connect.

## What to memorize
- SaaS use it, PaaS deploy on it, IaaS build on it.
- VPC is your network. Security group per VM (stateful), security list per subnet (stateless). NAT gateway outbound only.`,

u7l6: `## Five ideas that solve five old limits
Each of these exists because traditional networking hit a wall. Learn the wall and the fix together.

## SDN: one brain for many boxes
Traditional: every switch and router makes its own decisions, and an administrator logs into each one to change anything. **Software-defined networking** splits the job. The **control plane** (deciding where traffic goes) moves to a central controller. The **data plane** (actually forwarding packets) stays on the devices. The controller programs every device through APIs.

\`\`\`
[Application plane]  the apps that ask for things
        |  northbound APIs
[Controller]         the control plane, one place to decide
        |  southbound APIs
[Switches, routers]  the data plane, forwarding
[Management plane]   monitoring and configuration alongside
\`\`\`

"Northbound" goes up from the controller to applications; "southbound" goes down to devices.

## SD-WAN: cheap links, smart steering
Traditional: a branch office needs an expensive MPLS circuit for reliable performance. **SD-WAN** lets the branch use several cheap connections (broadband, LTE, maybe MPLS) and a controller steers each application over the best path right now. Four properties questions test:
- **Application aware**: knows the difference between a video call and a backup and treats them differently.
- **Transport agnostic**: works over any kind of link.
- **Zero-touch provisioning**: plug in a new branch device and it downloads its own configuration.
- **Central policy management**: define rules once for every site.

## VXLAN: stretch Layer 2 across Layer 3
Traditional: VLANs stop at a router, and there are only 4094 of them, too few for a big multi-tenant data center. **VXLAN** wraps Layer 2 frames inside UDP packets so a "VLAN" can cross a routed network, even between data centers. Its identifier, the **VNI**, is 24 bits: about **16 million** segments instead of 4094. This is the standard for **data center interconnect** and tenant isolation.

## Zero trust: nothing inside is trusted
Traditional: a castle with a moat. Get past the firewall and you can roam. **Zero trust** says being inside the network earns nothing. Every request is authenticated and authorized against **policy**, using identity, device health, and context, and gets only **least privilege**: the minimum a role needs. "Never trust, always verify."

## SASE and SSE: security delivered from the cloud
Remote workers and branches used to backhaul traffic to headquarters to pass through the firewall. **Secure access service edge** bundles SD-WAN networking with cloud-delivered security (firewall, secure web gateway, zero trust access, CASB) so users get the same protection anywhere. **Security service edge** is the same security bundle without the SD-WAN part.

## Infrastructure as code: configuration as files
Traditional: hand-typed configs that drift apart over time. **IaC** writes the desired configuration in files and applies it automatically.
- **Playbooks and templates** describe the desired state; tools push it consistently.
- **Source control** records every change, who made it, and lets you roll back.
- **Configuration drift** is when a device's live config no longer matches the template. IaC detects and corrects it.
- **Dynamic inventories** discover devices automatically; automated upgrades roll firmware out safely.

## How the exam asks it
- "One controller programs the whole network": SDN.
- "Branch uses broadband and LTE with application-based path selection": SD-WAN.
- "Stretch a Layer 2 segment across two data centers": VXLAN.
- "Verify every request no matter where it originates": zero trust.
- "Device configuration no longer matches the approved template": configuration drift.

## What to memorize
- SDN splits control from data; northbound to apps, southbound to devices.
- SD-WAN: application aware, transport agnostic, zero-touch, central policy.
- VXLAN 24-bit VNI, 16 million segments. Zero trust verifies everything. SASE = SD-WAN + security; SSE = security only.`,

u7l7: `## The rooms
Every network lives somewhere physical, and the exam expects you to know the vocabulary of those rooms.

\`\`\`
[Provider circuit] ---> demarcation point ---> [MDF: main room, core switches, routers]
                                                  |            |
                                     backbone fiber/copper     |
                                                  |            |
                                            [IDF floor 2]  [IDF floor 3]  access switches
                                                  |            |
                                              wall jacks    wall jacks
\`\`\`

- **MDF** (main distribution frame): the building's primary wiring room. Core equipment, the **demarcation point** where the carrier's responsibility ends and yours begins, and the links to every other closet.
- **IDF** (intermediate distribution frame): a smaller closet per floor or wing. Access switches here serve the nearby wall jacks and uplink to the MDF.

## Racks
Equipment mounts in 19-inch-wide racks, measured vertically in **rack units**: **1U is 1.75 inches**. A 42U rack is a common full-height cabinet. A **two-post rack** holds light gear such as switches and patch panels. A **four-post rack** or enclosed **cabinet** supports heavy servers, and a cabinet can be **locked** for physical security.

## Airflow
Servers pull cool air in the front and blow hot air out the back. Line the racks up so all fronts face one aisle (the **cold aisle**) and all backs face another (the **hot aisle**); then cooling feeds the cold aisle and exhaust is pulled from the hot aisle.

\`\`\`
cold aisle -> [front  rack  back] -> hot aisle <- [back  rack  front] <- cold aisle
\`\`\`

Switches complicate this because their ports may be on the "back." Choose **port-side intake** or **port-side exhaust** models so the air moves the same direction as everything else in the rack.

## Patch panels and cable management
The permanent cable from each wall jack ends on a **patch panel** in the closet. Short **patch cords** connect panel ports to switch ports. You never re-terminate the permanent run; you just move a patch cord. **Fiber distribution panels** do the same for fiber. Label both ends of every cable.

## Power
- **UPS** (uninterruptible power supply): a battery that carries the load through short outages and cleans up dirty power. Size it in VA or watts against the total load, for enough runtime to shut down cleanly or for a generator to start. The UPS is the bridge; the **generator** is the long-term supply.
- **PDU** (power distribution unit): the rack's power strip. Managed PDUs let you switch and monitor outlets remotely.
- Check the **load** against the circuit capacity and the **voltage** (120 V or 208/240 V in North America). Redundant power supplies should plug into different circuits.

## Environment
\`\`\`
Temperature   18 to 27 C   (64 to 80 F)
Humidity      40 to 60 percent    too dry: static discharge; too humid: condensation
Fire          clean agent or gas suppression, never water on electronics
\`\`\`

Monitor all of it with sensors.

## How the exam asks it
- "Main wiring room containing the demarc": MDF. "Closet on each floor": IDF.
- "How tall is a 2U device": 3.5 inches.
- "Rack airflow": intake faces the cold aisle, exhaust faces the hot aisle.
- "Keeps servers running until the generator starts": UPS.
- "Humidity too low": static electricity risk.

## What to memorize
- MDF main room with the demarc, IDFs per floor. 1U is 1.75 inches.
- Front cold, back hot. UPS bridges to the generator. 18 to 27 C, 40 to 60 percent humidity.`,

u8l1: `## Why this is on the exam
At 3 a.m. with the network down, documentation is the difference between a ten-minute fix and a night of guessing. The exam tests whether you know which document answers which question.

## Diagrams: which one answers what
\`\`\`
Question you are asking                                Diagram
Where is this device, and how do the cables run?       physical diagram
How does traffic flow: subnets, VLANs, routing?         logical diagram
What are the physical links and cabling?                Layer 1 diagram
Which switches, VLANs, trunks, spanning tree?           Layer 2 diagram
Which routers, subnets, routing protocols?              Layer 3 diagram
What is in slot 12 of rack 3?                           rack diagram
Which wall jack goes to which panel port and switch?    cable map (wiring diagram)
\`\`\`

A **logical diagram** does not care which rack a router sits in; it cares about addresses and paths. A **physical diagram** does not care about subnets; it cares about closets and ports. When a question asks about IP addressing or VLAN layout, the answer is logical.

The **cable map** is the document a toner and probe replaces when the map is missing or wrong.

## Inventories and records
- **Asset inventory**: every device with model, serial number, location, owner, purchase date, **warranty** and support status, and **software licensing**. This is what tells you which switches are about to go out of support.
- **IPAM** (IP address management): the single authoritative record of every subnet, address, and assignment. It prevents duplicate addresses and overlapping subnets.
- **Wireless survey and heat map**: the measured signal strength over the floor plan, recorded at deployment and after every change.

## Agreements
- **SLA** (service level agreement): what a provider promises, in numbers: 99.9 percent uptime, four-hour repair, and what they pay if they miss.
- **MOU** (memorandum of understanding): a non-binding statement that two parties intend to work together.
- **NDA** (non-disclosure agreement): keeps confidential information confidential.

## Keeping it true
Documentation that was not updated after a change is worse than none, because people trust it. Updating diagrams and IPAM is the **last step of every change**.

## How the exam asks it
- "Shows subnets, VLANs, and traffic flow": logical diagram.
- "Which patch panel port connects to jack 3B": cable map.
- "Guaranteed uptime from the ISP": SLA.
- "Prevent two teams from assigning the same subnet": IPAM.
- "When should documentation be updated": as the last step of the change.

## What to memorize
- Physical is where, logical is how traffic flows. Rack diagram by U, cable map by port.
- IPAM owns addresses. SLA is the provider's promise, MOU is intent, NDA is secrecy.`,

u8l2: `## Three processes that keep change from causing outages
Networks change every day. These processes are how professionals change them without surprises.

## Life cycle management
Every product has a life. **End of life (EOL)** means the vendor stops selling it. **End of support (EOS)** means no more patches, no more help. After EOS a device is a security risk that cannot be fixed, so plan the replacement before that date. Along the way, **patching** and **firmware updates** fix bugs and vulnerabilities on a tested schedule. **Decommissioning** means retiring a device cleanly: wipe its configuration and data, pull it from inventory and diagrams, recover the licenses.

## Change management: the order matters
\`\`\`
1. Change request      what, why, when, and the risk
2. Impact assessment   what else could this affect? write the ROLLBACK PLAN
3. Approval            change board or the owner signs off
4. Maintenance window  schedule it, notify affected users
5. Implement and test  make the change, verify it worked
6. Document            update diagrams, configs, IPAM, the ticket
\`\`\`

Questions usually ask what comes **before** the change: a request with a rollback plan and approval. Or what comes **after**: testing and documentation. **Emergency changes** take a shorter path when something is on fire, but they are still recorded afterward. A **service request** is the lighter ticket for routine, pre-approved work such as adding a user.

## Configuration management
Three copies of a device's configuration matter:
- **Production configuration**: what is running right now.
- **Backup configuration**: a saved copy, taken before and after every change, so you can restore.
- **Baseline** or **golden configuration**: the approved standard build for that type of device. Compare running configs against it to catch **drift** and unauthorized changes.

Tools back up configs nightly and alert when something differs from yesterday or from the golden copy.

## How the exam asks it
- "What should happen before upgrading the core switch firmware": change request, rollback plan, approval, maintenance window.
- "A switch no longer receives security updates": end of support; replace it.
- "Ensure all branch routers have the same approved settings": golden configuration.
- "Retire a firewall": wipe it, update inventory and diagrams.

## What to memorize
- EOL stops sales, EOS stops patches.
- Request, assess and plan rollback, approve, window, implement and test, document.
- Golden config is the standard; drift is the deviation.`,

u8l3: `## You cannot fix what you cannot see
Monitoring is several different tools, each trading detail for volume. Learn what each one gives you and what it costs.

## SNMP: asking devices questions
\`\`\`
[Manager / monitoring server]                    [Device with an SNMP agent]
      | -- Get: "interface 3 utilization?" -->  UDP 161      MIB: the device's database of values
      | <-- "42 percent" -----------------------              OID: the address of one value in the MIB
      | <-- Trap: "interface 3 went DOWN" ------  UDP 162     sent by the device on its own
\`\`\`

- The **agent** runs on the device. The **MIB** (management information base) is its catalog of variables. Each variable has an **OID** (object identifier), a dotted number like a file path.
- The manager **polls** on a schedule with Get requests to port 161.
- The device sends **traps** to port 162 when something happens, without being asked.
- **SNMPv1 and v2c** authenticate with a plaintext **community string**; v2c added bulk retrieval. **SNMPv3** adds real authentication, integrity, and encryption. Use v3.

## Three views of traffic, from summary to every byte
\`\`\`
Method            What you get                                     Volume
flow data         who talked to whom, ports, bytes, when; no payload   small
(NetFlow, sFlow, IPFIX)   find top talkers and odd patterns at scale
packet capture    every byte of every frame                          huge
(Wireshark via SPAN or tap)   targeted troubleshooting only
logs (syslog)     events the devices chose to report                 medium
\`\`\`

## Logs and syslog
Devices send events to a central **syslog** collector on UDP 514. Every message has a severity from 0 to 7:

\`\`\`
0 Emergency   1 Alert   2 Critical   3 Error   4 Warning   5 Notice   6 Informational   7 Debug
\`\`\`

Lower is worse. Memory hook: **E**very **A**wesome **C**isco **E**ngineer **W**ill **N**eed **I**ce cream **D**aily. **Log aggregation** collects everything in one place. A **SIEM** (security information and event management) goes further: it correlates events across many sources, alerts on patterns, and keeps logs for compliance. Traffic logs show connections; **audit logs** show who changed what.

## Baselines
A **baseline** records what normal looks like: utilization, latency, and error rates over days and weeks. Alerts then fire on deviation from normal, which catches a problem that a fixed threshold would miss, such as a link that is usually at 10 percent suddenly sitting at 40.

## APIs
Modern devices and platforms expose **APIs**, so monitoring tools pull metrics and push configuration programmatically, and tools can be chained together.

## How the exam asks it
- "Encrypted and authenticated SNMP": v3.
- "See who is using the bandwidth without capturing every packet": flow data.
- "Device pushes an alert when an interface fails": trap, UDP 162.
- "Correlate security events from firewalls, servers, and switches": SIEM.
- "Which syslog severity is most serious": 0, Emergency.

## What to memorize
- SNMP polls on 161, traps on 162, v3 encrypts. MIB is the database, OID the address.
- Flow for who-talked-to-whom, capture for every byte, syslog 514 to a SIEM. Severity 0 worst, 7 debug.`,

u8l4: `## Six words, one water pipe
Every performance metric makes sense as a pipe carrying water.

\`\`\`
bandwidth     how wide the pipe is: the capacity of the link
throughput    how much water actually flows: what you really get
utilization   throughput divided by bandwidth, as a percentage
latency       how long a drop takes to travel end to end (milliseconds)
jitter        how much that travel time varies from drop to drop
packet loss   drops that never arrive
\`\`\`

- **Bandwidth** is the rating on the box. **Throughput** is what a real transfer achieves after overhead, errors, and congestion. They are never equal.
- **Utilization** above roughly **70 to 80 percent** sustained means congestion is coming: queues fill, latency climbs, drops begin.
- **Latency** comes from distance (light is not instant), queueing in busy devices, and slow hops such as satellite. Interactive applications feel it first.
- **Jitter** is the killer for voice and video. A steady 100 ms delay is fine; a delay that swings between 20 and 200 ms makes audio choppy, because packets arrive out of rhythm.
- **Packet loss** makes TCP retransmit and stall, and punches gaps in voice.
- **Interface errors and discards**: CRC errors, runts, giants, and drops on a port. Errors point at cabling or duplex; discards point at congestion.

## Device health
CPU, memory, temperature, and fan status. A switch pinned at 100 percent CPU is usually suffering a broadcast storm or an attack, not doing useful work.

## The kinds of monitoring tools
- **Network discovery**: find devices and how they connect, using SNMP, LLDP or CDP, and ping sweeps. Run once for an inventory, or on a schedule to catch new devices.
- **Traffic analysis**: flow data and captures to show which applications use the bandwidth.
- **Performance monitoring**: utilization, errors, latency, and device health over time.
- **Availability monitoring**: is it up? Ping, port checks, and synthetic transactions, reported as uptime against the SLA.
- **Configuration monitoring**: watch running configurations for changes and compliance with the golden config.

## Matching symptom to metric
\`\`\`
Symptom                                          Metric
voice is choppy, packets arrive irregularly      jitter
everything feels slow but steady                 latency
transfers stall and restart                      packet loss
link shows 95 percent for hours                  utilization (congestion)
a port counts CRC errors                         interface errors (cable or duplex)
\`\`\`

## How the exam asks it
- "Choppy VoIP with variable delay": jitter.
- "Report uptime against the contract": availability monitoring.
- "Which applications consume the WAN link": traffic analysis.
- "Difference between bandwidth and throughput": capacity versus actual.

## What to memorize
- Bandwidth capacity, throughput reality, utilization the ratio.
- Latency delay, jitter variation, loss missing packets. Above 70 to 80 percent utilization is congestion.`,

u8l5: `## Two different goals
**High availability** keeps a service running when a component fails: a power supply, a switch, a link. **Disaster recovery** brings a service back after something big: the whole site floods or burns. Different tools, and the exam keeps them apart with four numbers and three kinds of sites.

## The four numbers
\`\`\`
      last backup            disaster              service restored
----------|----------------------|--------------------------|----------> time
          <------ RPO ---------->
          how much data you lose (everything since the last copy)
                                 <---------- RTO ----------->
                                 how long you are down
\`\`\`

- **RPO** (recovery point objective): how much data you can afford to lose, measured backward in time. An RPO of one hour means you must copy data at least hourly.
- **RTO** (recovery time objective): how fast the service must be back.
- **MTTR** (mean time to repair): the average time to fix something once it breaks.
- **MTBF** (mean time between failures): how long a component typically runs before failing. Higher is better; it drives spare parts and replacement planning.

## Recovery sites
\`\`\`
Site    What is there                              Time to run      Cost
cold    space, power, cooling; no gear, no data    days to weeks    lowest
warm    equipment and connectivity; restore data   hours to a day   middle
hot     a running mirror with current data         minutes          highest
cloud   any of the above as on-demand virtual resources
\`\`\`

## Redundancy designs
- **Active-active**: every node carries traffic at once. Lose one, and capacity drops but service continues. Load balancer pools, some firewall clusters.
- **Active-passive**: one node works, a standby waits and takes over on failure. Simpler, and the standby sits idle until needed. First-hop redundancy protocols are active-passive.
- Hardware redundancy: dual power supplies on separate circuits, NIC teaming, multiple paths to storage, and **diverse** WAN circuits from different providers that enter the building at different points so one backhoe cannot cut both.

## Testing the plan
- **Tabletop exercise**: the team sits in a room and walks through the plan step by step. Finds gaps without touching a system.
- **Validation test**: actually fail over to the recovery site, or actually restore from backup, to prove it works and to measure the real RTO.

## How the exam asks it
- "How much data can we lose": RPO. "How long until we are back": RTO.
- "Servers and network in place, but data must be restored first": warm site.
- "Both firewalls pass traffic simultaneously": active-active.
- "Discuss the response in a conference room": tabletop.
- "Which metric helps plan how many spares to keep": MTBF.

## What to memorize
- RPO data lost, RTO time down, MTTR fix time, MTBF life span.
- Cold empty, warm equipped, hot running. Tabletop talks, validation fails over for real.`,

u8l6: `## Two audiences, two problems
Users need to reach the network from anywhere. Administrators need to reach the devices even when the network is broken. The lesson covers both.

## VPN types
\`\`\`
site-to-site     [Office A gateway] ===== encrypted tunnel ===== [Office B gateway]
                 users do nothing special; two offices act as one network
client-to-site   [Laptop with VPN software] ===== tunnel ===== [Corporate gateway]
                 remote workers
clientless       [Browser] ---- TLS ---- [Portal]   no software; usually web apps only
\`\`\`

## Split tunnel versus full tunnel
With a client VPN, where does the user's internet browsing go?
- **Split tunnel**: only traffic for the corporate network goes through the tunnel; everything else goes straight to the internet. Saves VPN bandwidth, and the user's video calls are faster. The cost: that direct traffic bypasses the company's security filtering.
- **Full tunnel**: everything goes through the tunnel and out the corporate firewall. Slower, but every packet is inspected and protected.

## Ways to reach a device
- **SSH**: encrypted command line, TCP 22. Telnet should be gone everywhere.
- **GUI**: a web page over HTTPS.
- **API**: programmatic access for automation and monitoring.
- **Console**: a serial or USB cable straight into the device. Needs no network configuration at all, which is why it always works.
- **Jump box** or **bastion host**: one hardened server you connect to first; from it you reach everything else. All management traffic funnels through a single monitored, well-defended point instead of every admin laptop touching every device.

## In-band versus out-of-band
- **In-band** management rides on the production network. Convenient, but when the network is down, so is your way in.
- **Out-of-band** management uses a separate path: a console server wired to every device's console port, a dedicated management network, or a cellular modem. It works precisely when production does not, which is when you need it.

## How the exam asks it
- "Join two branch offices permanently": site-to-site VPN.
- "Only work traffic through the VPN, web browsing goes direct": split tunnel.
- "Reach the core switch during a total outage": out-of-band, console.
- "All admins connect through one hardened host": jump box.
- "Access without installing software": clientless VPN.

## What to memorize
- Site-to-site joins offices, client-to-site joins people, clientless is a browser.
- Split tunnel saves bandwidth, full tunnel protects everything. Out-of-band works when the network does not.`,

u8l7: `## Vocabulary first
Security questions on this exam are mostly vocabulary used precisely. Learn the words as pairs and contrasts.

## CIA and the risk words
\`\`\`
Confidentiality   only the right people see it       encryption, access control
Integrity         it was not altered undetected      hashes, signatures
Availability      it stays reachable                 redundancy, DDoS protection
\`\`\`

Think of a house. A **vulnerability** is the unlocked window. A **threat** is the burglar who might use it. An **exploit** is the technique of climbing through. **Risk** is how likely the burglary is multiplied by how much you would lose.

## Encryption: two places
Data **in transit** moves across a network: protect it with TLS, IPsec, SSH. Data **at rest** sits on a disk or in a database: protect it with disk or database encryption. Behind both is **PKI**: a **certificate authority** signs certificates that tie a public key to a name. Browsers trust CA-signed certificates. A **self-signed certificate** has no CA behind it, so clients warn unless someone installs it as trusted. Fine for an internal test box, never for the public.

## Identity and access
- **AAA**: **authentication** proves who you are, **authorization** decides what you may do, **accounting** records what you did.
- **MFA** means two or more different kinds of proof:

\`\`\`
something you know     password, PIN
something you have     phone app code (TOTP), hardware token, smart card
something you are      fingerprint, face
extra conditions       somewhere you are (location), when (time)
\`\`\`

A password plus a code from an app is know plus have: two factors. A password plus a PIN is know plus know: one factor, twice.
- **SSO**: log in once, reach many systems. **SAML** is the common web standard between an identity provider and applications.
- **RADIUS** versus **TACACS+**, a favorite:

\`\`\`
                 RADIUS                              TACACS+
port             UDP 1812 auth, 1813 accounting      TCP 49
encrypts         only the password                   the whole payload
used for         network access: Wi-Fi, VPN, 802.1X  administering network devices
extra            combines auth and authorization     separates them; per-command control
\`\`\`
- **LDAP** queries a directory on TCP 389; **LDAPS** on 636.
- **Least privilege**: only the access a role needs. **Role-based access control**: permissions go to roles, users go to roles.
- **Geofencing**: allow or deny by physical location.

## Deception and physical
A **honeypot** is a decoy system built to attract attackers so you can watch their methods; a **honeynet** is a decoy network. Locks, badge readers, cameras, and mantraps protect the rooms.

## Compliance and segmentation
**Data locality** laws keep certain data inside certain countries. **PCI DSS** governs payment card data. **GDPR** governs personal data of EU residents. Risky device classes get their own segments: **IoT** gadgets, **IIoT** and **SCADA/ICS/OT** industrial systems that cannot be patched, **guests**, and **BYOD** personal devices.

## How the exam asks it
- "Password and a phone app code": two factors, know and have.
- "Encrypts the entire packet and separates authentication from authorization": TACACS+.
- "Decoy server that logs attacker behavior": honeypot.
- "Certificate that browsers warn about": self-signed.
- "Give users only what their job requires": least privilege.

## What to memorize
- CIA. Vulnerability is the weakness, threat exploits it, risk is odds times impact.
- RADIUS for network access (UDP 1812/1813, password only), TACACS+ for device admin (TCP 49, everything encrypted).`,

u8l8: `## Recognize the attack from its symptom
Every attack here comes as a one-sentence scene. Learn three things per attack: what the attacker does, what you observe, and the defense.

## Availability
- **DoS / DDoS.** One source (or a botnet of many) floods a target until real users cannot get through. **Reflection and amplification** send small forged requests to third-party servers that reply with huge responses aimed at the victim. Defense: upstream filtering and DDoS protection services.

## Layer 2 attacks
\`\`\`
Attack           What the attacker does                       What you see                        Defense
VLAN hopping     pretends to be a trunk (switch spoofing),    traffic from a VLAN the port         disable trunk negotiation on
                 or nests two 802.1Q tags (double tagging)    should never reach                   access ports, unused native VLAN
MAC flooding     sends frames from thousands of fake MACs     MAC table full; switch floods        port security
                 until the MAC table overflows                everything, attacker sniffs it all
ARP poisoning    sends forged ARP replies: "the gateway's     traffic passes through the           dynamic ARP inspection
                 IP is at MY MAC"                             attacker: an on-path attack
\`\`\`

**On-path attack** is the current name for man-in-the-middle: the attacker sits between two parties and reads or alters traffic. ARP poisoning is the usual way to get there on a LAN.

## Name and address attacks
- **DNS poisoning / spoofing**: forged DNS answers or corrupted cache entries send users to the attacker's site. Defense: DNSSEC.
- **Rogue DHCP**: an unauthorized server answers Discover first and hands out its own gateway and DNS, so it can redirect traffic. Symptom: clients show settings nobody configured, from an unknown server. Defense: DHCP snooping.
- **IP spoofing**: forging the source address to hide or to impersonate a trusted host.

## Wireless
- **Rogue access point**: any AP on your network you did not authorize, often an employee's convenience device. It is an open back door.
- **Evil twin**: the attacker's AP broadcasts **your** SSID. Users connect to it and hand over their traffic and credentials. Symptom: "the same SSID as ours, but not one of ours."
- **Deauthentication**: forged management frames kick clients off, often to capture the reconnection handshake or push them to the evil twin. Defense: protected management frames (802.11w).

## People
- **Social engineering** manipulates people rather than machines. **Phishing** by email, **vishing** by phone, **smishing** by text, **spear phishing** aimed at a specific person. **Tailgating** follows someone through a secured door. **Shoulder surfing** watches a screen or keypad. **Dumpster diving** reads the trash.

## Software and passwords
- **Ransomware** encrypts data and demands payment. **Trojans** hide inside legitimate-looking software. **Worms** spread by themselves. **Spyware** watches and reports.
- **Brute force** tries every password. **Dictionary** attacks try common words. **Credential stuffing** reuses passwords leaked from another site.

## How the exam asks it
- "Same SSID as the corporate network, not owned by the company": evil twin.
- "Switch began forwarding all traffic out all ports": MAC flooding.
- "Forged ARP replies put the attacker between users and the gateway": ARP poisoning, on-path.
- "Clients receive an unexpected gateway from an unknown server": rogue DHCP.
- "Attacker reaches another VLAN by nesting tags": VLAN hopping, double tagging.

## What to memorize
- Evil twin copies your SSID; rogue AP is any unauthorized AP.
- MAC flooding overflows the table, ARP poisoning redirects, VLAN hopping double-tags, DNS poisoning lies, rogue DHCP misdirects.`,

u8l9: `## Three layers of defense
Shrink the attack surface (hardening), control who gets on (access control), and control what moves between zones (filtering and segmentation).

## Hardening: the checklist for any new device
1. **Change the default password.** Defaults are published on the internet.
2. **Disable unused ports.** Shut down unused switch ports or park them in an unused VLAN. Turn off unneeded services: Telnet, HTTP management, anything not required.
3. **Patch** the firmware.
4. Manage only over **SSH and HTTPS**, and only from the **management VLAN** or the out-of-band network.
5. **Key management**: rotate keys and certificates, guard private keys, revoke anything compromised.

"What is the first thing to do with a new switch" is always change the default credentials and disable what is unused.

## Network access control: the bouncer
**NAC** checks a device before it gets on the network.

\`\`\`
[Device] --802.1X credentials--> [Switch or AP] --> [NAC / RADIUS]
                                                        |
                          posture check: antivirus current? patched? disk encrypted?
                                    /                          \\
                       compliant: normal VLAN        noncompliant: quarantine / remediation VLAN
                                                     (just enough access to fix itself)
\`\`\`

The **posture assessment** is the health check. Agents on the device or agentless scans do the checking.

## ACLs: how a packet is judged
An **access control list** is a numbered list of permit and deny rules matching source, destination, protocol, and port. Three rules of ACL behavior:
- Processed **top down**.
- **First match wins**; later rules are never consulted.
- An invisible **implicit deny** sits at the end: anything not matched is dropped.

\`\`\`
10  permit tcp any host 10.0.0.5 eq 443
20  deny   tcp any host 10.0.0.5
30  permit ip any any
A packet to 10.0.0.5 port 22: skips 10, matches 20, DENIED, rule 30 never seen.
A packet to 10.0.0.9 port 22: no match at 10 or 20, matches 30, permitted.
\`\`\`

"Only one application fails while others work" is the ACL fingerprint.

**URL filtering** blocks sites by address or category. **Content filtering** looks inside for malware, data leakage, or inappropriate material. **MAC filtering** and hidden SSIDs remain weak.

## Zones and the screened subnet
\`\`\`
internet (untrusted) --[firewall]-- screened subnet (DMZ): web, mail servers --[firewall]-- internal LAN (trusted)
\`\`\`

Public-facing servers must be reachable from the internet, so they go in the **screened subnet**, historically called the **DMZ**: a middle zone that outsiders can reach but that is walled off from the internal network. If the web server is compromised, the attacker is still outside the trusted zone.

## Segmentation
Separate VLANs and firewall rules for guests, IoT, industrial systems, and management traffic. An intruder who lands in one segment cannot roam the rest.

## How the exam asks it
- "Only laptops with current antivirus may join; others get limited access to fix themselves": NAC with posture assessment and a remediation VLAN.
- "Where does the public web server belong": screened subnet.
- "Why does the ACL block traffic nobody wrote a deny for": implicit deny at the end.
- "First step on a newly installed router": change default credentials, disable unused services.

## What to memorize
- Harden: change defaults, disable unused, patch, encrypt management, rotate keys.
- NAC checks posture at the door. ACLs top down, first match, implicit deny. Public servers in the screened subnet.`,

u9l1: `## Why this lesson is worth the most points
Troubleshooting is the biggest exam domain, and a large share of its questions do not ask you to fix anything. They describe where a technician is in the process and ask **what comes next**. If you know the order cold, those are free points.

## The seven steps
1. **Identify the problem.** Gather information, question users, identify symptoms, find out what changed, duplicate the problem if you can, and approach multiple problems one at a time.
2. **Establish a theory of probable cause.** Question the obvious first. Work top to bottom or bottom to top through the OSI layers, or divide and conquer by starting in the middle.
3. **Test the theory to determine the cause.** Confirmed: move on. Not confirmed: form a new theory or escalate.
4. **Establish a plan of action** to resolve the problem, and **identify potential effects**. What else could this change break?
5. **Implement the solution**, or **escalate** if it is beyond your authority or ability.
6. **Verify full system functionality** and, if applicable, **implement preventive measures**.
7. **Document** findings, actions, outcomes, and lessons learned.

## A scenario walked through
The third-floor printer is offline.
1. Identify: three users cannot print; it started this morning; the facilities team moved the printer to a new outlet last night. What changed: it was moved.
2. Theory: it was plugged into a different wall jack that is in the wrong VLAN or not patched.
3. Test: check the switch port for the new jack. It is in the guest VLAN. Theory confirmed.
4. Plan: move that port to the printer VLAN. Effect: nothing else uses the port.
5. Implement: change the VLAN. (If you lacked switch access, you would escalate here.)
6. Verify: all three users print. Prevent: label the jack, document the port assignments.
7. Document: ticket updated with cause, fix, and the labeling change.

## The "what comes next" traps
- Theory confirmed. Next: **plan of action**, not implementing the fix.
- Fix implemented. Next: **verify**, not documenting.
- Verified. Next: **document**. Documentation is always last.
- Theory not confirmed. Next: new theory, or escalate.
- The fix needs access or authority you do not have: **escalate** is the correct answer, not "try anyway."

## Three ways to build a theory
- **Top to bottom**: start at the application and work down toward the cable. Good when the user reports an application error.
- **Bottom to top**: start at the cable. Good when the link light is off.
- **Divide and conquer**: start in the middle, usually Layer 3. Can you ping? If yes, look up; if no, look down.

## What to memorize
- Identify, theorize, test, plan, implement or escalate, verify and prevent, document.
- Plan before you touch anything. Verify before you document.`,

u9l2: `## Layer 1 problems have fingerprints
Physical problems each produce a recognizable pattern. Learn the pattern, and the question answers itself.

## Wrong cable for the job
- **Wrong fiber type**: a single-mode optic on multimode fiber, or the reverse. No link, or a link full of errors.
- **Wrong category**: Cat 5e on a 10 Gbps run negotiates down or throws errors.
- **Unshielded near interference**: UTP beside motors or fluorescent ballasts picks up noise. Use STP or fiber.
- **Wrong pinout**: a straight-through where crossover was needed on gear without auto-MDIX, or fiber strands swapped. On fiber the two strands carry opposite directions; if one end's transmit lands on the far end's transmit, nothing links. That is a **TX/RX reversal**: swap the two strands at one end.

## Signal problems and why they happen
\`\`\`
Problem        Cause                                                 Symptom
attenuation    signal weakens with distance; copper past 100 m,      intermittent link, high error rate,
               fiber past its rated reach                            works short, fails long
crosstalk      signal bleeds between pairs: poor termination,        errors, slow link
               pairs untwisted too far at the connector
EMI / RFI      noise from power, motors, radios                      errors that come and go with the noise source
bad termination pairs on wrong pins or not seated                     tester shows opens, shorts, split pairs
\`\`\`

## Reading interface counters
\`\`\`
Counter           Meaning                                   Points at
CRC errors        frames arrived corrupted                  bad cable, interference, duplex mismatch
runts             frames under 64 bytes                     collisions, bad NIC
giants            frames over the MTU                       MTU or jumbo mismatch
drops / discards  the queue overflowed                      congestion
late collisions   collision after the first 64 bytes        duplex mismatch, almost always
\`\`\`

CRC errors together with late collisions is the duplex mismatch signature. Say it out loud until it is reflex.

## Port status words
- **Administratively down**: someone typed shutdown. Bring it up.
- **Error-disabled**: the switch shut the port for a violation: port security, BPDU guard, or link flapping. Fix the cause, then clear the port.
- **Suspended**: usually a link aggregation member whose settings do not match the bundle.
- Link light off with a cable you know is good: look at the far end or suspect a dead port.

## PoE problems
- **Budget exceeded**: the switch is out of power. The last device plugged in never boots, or a device reboots when its load rises.
- **Wrong standard**: an 802.3at device on an 802.3af port may power on and then reset under load, or never power at all.

## Transceiver problems
- **Mismatch**: different speeds or wavelengths at the two ends, or a vendor-locked switch refusing a third-party module.
- **Low signal**: dirty connectors, a fiber bent too tightly, or too much distance. Read the receive power on the transceiver; clean the connector first.

## How the exam asks it
- "CRC errors and late collisions": duplex mismatch.
- "Works at 80 meters, fails at 120": attenuation.
- "New fiber run, no link, strands look reversed": TX/RX polarity; swap at one end.
- "Camera powers on, then reboots repeatedly": PoE budget or standard.
- "Port shows err-disabled after a user plugged in a hub": port security; fix, then clear.

## What to memorize
- CRC plus late collisions is duplex. Past 100 m is attenuation. Swapped strands is TX/RX.
- Err-disabled needs a cause fixed and a clear. PoE: budget or wrong standard.`,

u9l3: `## Each problem tells a story
Service problems at Layers 2 and 3 have telltale stories. Match the story, then confirm with one command.

## Switching stories
- **Spanning tree loop**: a cable was added between two switches, and within seconds everything is slow, switch CPU is at 100 percent, and the MAC table shows the same address flapping between two ports. STP was disabled or a PortFast port faced another switch.
- **Root bridge in the wrong place**: traffic takes strange paths because an access switch with a low MAC became root by default. Fix: set a low priority on the core.
- **Wrong VLAN**: a user moved desks and now gets an address from the wrong scope, or no address, and cannot reach the servers. Check the access port's VLAN. On trunks, a native VLAN mismatch drops or leaks untagged traffic.

## Addressing stories
- **Wrong default gateway**: local hosts reachable, nothing beyond the subnet.
- **Wrong subnet mask**: some hosts on the "same" subnet are unreachable. Example: host A is 192.168.1.10/24 and host B is 192.168.1.200/25. B thinks .10 is on another network and sends to its gateway; A thinks B is local and ARPs for it. They disagree about the boundary, so it half works.
- **Duplicate IP**: two hosts intermittently lose connectivity, one shows an address conflict warning, and the ARP table shows one IP with a changing MAC. Usual cause: a static address assigned inside the DHCP scope without an exclusion.
- **Scope exhaustion**: new clients get 169.254.x.x while existing ones keep working. Widen the scope, shorten the lease, or find whatever is eating leases.
- **Rogue DHCP**: clients receive a gateway or DNS server nobody configured, from an unfamiliar server address. Enable DHCP snooping.

## Routing and filtering stories
- **Route selection**: traffic takes an unexpected path because a more specific prefix or a lower administrative distance route exists. Read the routing table for the entry that actually matches.
- **Missing return route**: packets reach the destination, but replies have no route back. One direction works.
- **ACL**: one application or port fails while everything else works. Ping succeeds, the service does not. Read the ACL top down and remember the implicit deny.
- **Asymmetric routing**: outbound and return traffic use different paths, and a stateful firewall on one path drops the replies it never saw requests for.

## Name resolution
- **DNS**: ping by IP works, ping by name fails. Check the client's DNS server setting, query the server with nslookup or dig, then check the record on the authoritative server.

## A diagnosis order that works
1. Got an address? None or 169.254 means DHCP, VLAN, or the relay.
2. Right subnet? Wrong scope means VLAN.
3. Can you reach the gateway? No means the gateway address, the mask, or the cable.
4. Can you ping a remote address? No means routing.
5. Can you ping a remote name? No means DNS.
6. Does one specific service fail? ACL or firewall.

## How the exam asks it
- "Storm after a second uplink was added": STP loop.
- "New address is in the wrong range after a desk move": VLAN.
- "Local works, remote does not": default gateway.
- "IP works, name does not": DNS.
- "Intermittent connectivity with a conflict warning": duplicate IP.
- "Only one application is blocked": ACL.

## What to memorize
- Storm after a new cable: STP. Wrong scope: VLAN. Local only: gateway. Some neighbors unreachable: mask. IP not name: DNS. Conflict: duplicate IP. One app blocked: ACL.`,

u9l4: `## When it works, but slowly
Performance problems are the ones where every ping succeeds and users are still unhappy. Each has a fingerprint.

## Wired
- **Congestion**: more traffic than the link can carry. Utilization near 100 percent, rising drops and latency. Add bandwidth, apply QoS so important traffic goes first, or move the heavy talkers.
- **Bottleneck**: one slow element caps everything behind it. A 100 Mbps uplink feeding a gigabit floor. An overloaded firewall. Find the weakest link in the path; the fix is there, not everywhere.
- **Latency**: high round-trip time. Distance and satellite hops add fixed delay; queueing in busy devices adds variable delay. Interactive applications suffer first.
- **Jitter**: delay that varies from packet to packet. Voice and video break up while file downloads seem fine. QoS and jitter buffers help.
- **Packet loss**: retransmissions, stalls, gaps in audio. Look for errors and discards on every interface along the path.
- **Speed or duplex mismatch**: one link inexplicably slow with errors. Set both ends the same.

## Wireless
- **Interference**: other networks, microwaves, cordless phones, Bluetooth. Fingerprint: **strong signal but poor throughput** and many retries. Change channel; move clients to 5 GHz.
- **Channel overlap**: neighboring APs on the same or overlapping 2.4 GHz channels take turns. Use only 1, 6, and 11.

\`\`\`
Bad:   AP1 ch 6    AP2 ch 6    AP3 ch 8    (6 and 8 overlap, and two on 6 share airtime)
Good:  AP1 ch 1    AP2 ch 6    AP3 ch 11
\`\`\`

- **Signal degradation**: walls, metal, distance, and water absorb signal. Move or add APs, adjust antennas.
- **Insufficient coverage**: dead spots the survey missed. Add an AP or a mesh node.
- **Client disassociation**: clients drop unexpectedly. Interference, too many clients on one AP, aggressive power saving, or a deauthentication attack.
- **Roaming trouble**: clients cling to a distant AP because cells overlap too little or transmit power is too high; or roaming fails because SSID or security settings differ between APs.
- **Wrong antenna**: an omnidirectional antenna where a directional one was needed, or an AP mounted behind metal.

## Telling them apart
\`\`\`
Symptom                                              Problem
full bars, slow                                      interference or co-channel overlap
slow everywhere, one link at 100 percent             bottleneck / congestion
steady delay, everything sluggish                    latency
voice choppy, delay varies                           jitter
works near the AP, dies down the hall                coverage or signal degradation
drops when walking between APs                       roaming configuration
\`\`\`

## How the exam asks it
- "Signal strength is excellent but throughput is poor": interference, not coverage.
- "Choppy VoIP with irregular packet arrival": jitter.
- "Everything is fine except the saturated link between buildings": bottleneck.
- "Three APs, all on channel 6": co-channel interference.

## What to memorize
- Congestion fills the link, a bottleneck is the slowest hop, latency is delay, jitter is variation.
- Strong signal but slow is interference; use 1, 6, 11 or go to 5 GHz.`,

u9l5: `## Each tool answers one question
Do not memorize tools as a list. Memorize the question each one answers, and the tool follows.

## Is it reachable, and where does the path break?
- **ping**: is the host reachable, and what is the round-trip time and loss? Use the ladder: ping 127.0.0.1 (my TCP/IP stack), my own address (my NIC), the gateway (my LAN), then a remote host (routing beyond). Wherever it first fails is where the problem lives.
- **traceroute** (Linux and macOS) / **tracert** (Windows): every hop to the destination with its latency. It shows **where** along the path packets are lost or delayed. **mtr** and **pathping** repeat it over time to catch intermittent hops.

\`\`\`
 1  192.168.1.1     1 ms      my gateway
 2  10.20.0.1       4 ms      provider edge
 3  * * *           timeout   this hop drops probes or is down
 4  203.0.113.9   120 ms      big jump in latency here
\`\`\`

## What is my configuration, and who is my neighbor?
- **ipconfig** (Windows), **ifconfig** and **ip** (Linux): address, mask, gateway, DNS. Flags you must know: {{ipconfig /all}} adds DHCP lease details and the MAC; {{ipconfig /release}} then {{/renew}} gets a fresh lease; {{ipconfig /flushdns}} clears the local resolver cache.
- **arp -a**: the IP-to-MAC cache. Spot a duplicate IP (one address, changing MAC) or ARP poisoning.
- **LLDP / CDP**: from the switch, see what device and port is on the other end of each cable.

## What about names and ports?
- **nslookup** and **dig**: ask a DNS server directly, choose which server, request a specific record type. If the default server fails and a public one works, the problem is your server.
- **netstat**: open connections and listening ports on this host. {{netstat -r}} prints the routing table on many systems.
- **nmap**: scan a host for open ports and services, or find live hosts on a subnet. Authorized use only.

## What is actually on the wire?
- **Wireshark** (a protocol analyzer): decodes captured packets in full. Feed it from a SPAN port or a tap.
- **tcpdump**: command-line capture on Linux, usually saved to a file for Wireshark later.

## Questions you ask a switch or router
\`\`\`
Question                                     Command
which port is this MAC address on?           show mac-address-table
what is in the device's ARP cache?           show arp
is the port up? speed, duplex, errors, CRCs? show interface
how does the router reach this network?      show ip route (show route)
which VLAN is each port in?                  show vlan
what is the current configuration?           show running-config (show config)
how much PoE is left, and per port?          show power
\`\`\`

## Measuring
- **Speed tester**: throughput to a known server, compared with the bandwidth you pay for.
- **Terminal emulator**: the program you use for SSH or console access.

## How the exam asks it
- "At which hop are packets being lost": traceroute.
- "Which switch port is this MAC connected to": show mac-address-table.
- "See the IP-to-MAC cache on a PC": arp -a.
- "Which ports are listening on this server": netstat.
- "Check a record on a specific DNS server": nslookup or dig.
- "Refresh a DHCP lease on Windows": ipconfig /release then /renew.

## What to memorize
- ping reachability, traceroute the hop, ipconfig the config, arp the cache, nslookup the name, netstat the ports.
- show interface for errors, show mac-address-table for the port, show ip route for the path.`,

u9l6: `## Problems no command can see
Some faults live in the copper, the glass, or the air. These tools find them. Learn each as the scenario it solves.

## Copper: finding and testing cables
\`\`\`
Tool               Scenario it solves
toner and probe    "Which patch panel port is this wall jack?" Clip the tone generator on one end,
                   sweep the probe across the panel until it sings.
cable tester       "Is this new run wired correctly?" Checks continuity, pinout, opens, shorts,
                   split pairs, and length.
cable certifier    "Does this run meet Cat 6A?" Measures performance against the standard and prints a report
                   the customer can keep.
punch-down tool    terminates wires on jacks and patch panels
crimper            attaches RJ45 plugs to cable ends
loopback plug      "Is this port itself dead?" Loops transmit back to receive so the port tests itself.
\`\`\`

## Fiber: three tools that sound alike
- **Visual fault locator**: shines visible red light into the fiber. You can see a break or a tight bend glowing through the jacket, and see which strand is which at the far end. Cheap, quick.
- **OTDR** (optical time-domain reflectometer): sends a pulse and times the reflections, so it reports the distance to every break, splice, and loss. "Where along 3 km of fiber is the fault?"
- **Optical power meter**: measures how much light arrives. Answers "is there enough signal for this link?"
- **Fiber cleaning kit**: a speck of dust blocks a surprising amount of light. Dirty connectors are the most common fiber fault, so clean before you diagnose.

## Traffic and radio
- **Network tap**: a passive device inline on a link that copies traffic to an analyzer. Use it when the switch cannot mirror, or when you need every frame without depending on a SPAN port.
- **Wi-Fi analyzer**: shows access points, channels, signal strength, and dead spots. Plan channels and find coverage gaps.
- **Spectrum analyzer**: shows **all** radio energy, not just Wi-Fi, so it reveals interference from microwaves, cordless phones, and other non-Wi-Fi sources that a Wi-Fi analyzer cannot name.

## Power
- **Multimeter**: verify voltage on a circuit, check continuity on a cable.
- **PoE injector**: adds power to a cable run when the switch cannot supply it.

## How the exam asks it
- "Find which wall jack matches a patch panel port": toner and probe.
- "Verify a new cable run is wired correctly": cable tester.
- "Prove the installation meets Cat 6A": certifier.
- "Locate the break along a long fiber run": OTDR. "See a break in a short patch cord": visual fault locator.
- "Capture without a SPAN port": tap.
- "Find non-Wi-Fi interference": spectrum analyzer.

## What to memorize
- Toner finds the far end, tester checks the pins, certifier proves the category.
- VFL lights the fiber, OTDR measures distance to a fault, power meter measures light. Tap copies traffic, Wi-Fi analyzer maps channels, spectrum analyzer sees everything.`

});
