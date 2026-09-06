// NetPlus Academy curriculum, units 7 to 9.
window.NPA = window.NPA || {};
NPA.units = NPA.units || [];

NPA.units.push({
  id: "u7", n: 7, title: "Routing, Cloud, and Infrastructure", domain: 2,
  blurb: "How routers choose paths, NAT and gateway redundancy, the appliances on a network, cloud and modern networking, and the physical room it all lives in.",
  assumes: "You have configured switches or Wi-Fi and understand VLANs.",
  lessons: [
    {
      id: "u7l1", title: "Routing Fundamentals", domain: 2, obj: "2.1", minutes: 7,
      body: `A router connects networks and forwards packets toward their destination one hop at a time.

## The forwarding decision
A host compares the destination IP with its own subnet. Local destinations get a frame addressed to the destination's MAC (learned by ARP). Remote destinations get a frame addressed to the **default gateway's** MAC. The router strips the frame, reads the destination IP, looks up the **routing table**, rewraps the packet in a new frame for the next hop, decrements the TTL, and sends it on. The IP addresses never change on the way (unless NAT is involved); the MAC addresses change at every hop.

## The routing table
Each entry has a destination prefix, a next hop or exit interface, and how the route was learned. Three sources:
- **Directly connected**: networks on the router's own interfaces.
- **Static**: typed in by an administrator. Predictable, no overhead, but does not adapt when a link fails. Good for stub networks and small sites.
- **Dynamic**: learned from neighboring routers by a routing protocol, which adapts automatically to failures.

## The default route
{{0.0.0.0/0}} matches any destination not covered by a more specific route. Every branch router points a default route at the internet or headquarters. Without one, unknown destinations are dropped.

## What a wrong gateway looks like
If a host's default gateway is wrong or outside its subnet, the host can reach neighbors on its own subnet but nothing beyond. If the gateway is right but the router lacks a return route, replies never come back.

> Exam tip: "can reach local devices but no remote networks" is the default gateway. "Frame changes, packet does not" is the routing process.`,
      hook: "Local: ARP the host. Remote: send to the gateway. Routers rewrap frames, keep the packet, drop TTL by one. 0.0.0.0/0 is the way out."
    },
    {
      id: "u7l2", title: "Routing Protocols and Route Selection", domain: 2, obj: "2.1", minutes: 10,
      body: `Dynamic routing protocols let routers tell each other about networks and pick the best path.

## Interior gateway protocols
- **OSPF** (Open Shortest Path First): link-state, open standard. Every router learns the full topology of its **area** and runs Dijkstra's shortest path algorithm. Metric is **cost**, derived from bandwidth. Fast convergence, scales with areas. The default choice inside an organization.
- **EIGRP**: advanced distance-vector, originally Cisco only. Uses bandwidth and delay in its metric, converges fast, easy to configure. Common in Cisco shops.
- **RIP**: classic distance-vector, metric is **hop count**, maximum 15 hops, updates every 30 seconds. Simple, slow, small networks only. RIPv2 supports CIDR; RIPng handles IPv6.

## Exterior gateway protocol
- **BGP** (Border Gateway Protocol): the routing protocol of the internet, run between **autonomous systems**. Path-vector: it chooses routes by policy and AS path length rather than by speed. Used by providers and by organizations with multiple internet connections. Slow to converge by design.

## Distance vector versus link state
Distance-vector routers know what their neighbors tell them (direction and distance). Link-state routers know the whole map. Link-state converges faster and avoids loops better but uses more CPU and memory.

## How a router picks among routes
1. **Longest prefix match** wins first. A route to {{10.1.1.0/24}} beats {{10.1.0.0/16}} for a packet to 10.1.1.50, and both beat the default route.
2. If the prefixes are identical, the lowest **administrative distance** wins: it is a trust ranking of the source. Connected 0, static 1, external BGP 20, EIGRP 90, OSPF 110, RIP 120.
3. If the source is the same, the lowest **metric** wins: hop count for RIP, cost for OSPF, composite for EIGRP.

## Convergence
The time for all routers to agree after a change. Until convergence finishes, some traffic is black-holed or looped. Fast protocols plus summarization keep it short.

> Exam tip: prefix length beats administrative distance beats metric, in that order. "Learned from OSPF and from a static route to the same prefix" means the static route (AD 1) wins.`,
      hook: "Most specific prefix first, then lowest AD (connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120), then lowest metric. BGP between autonomous systems."
    },
    {
      id: "u7l3", title: "NAT, PAT, and Gateway Redundancy", domain: 2, obj: "2.1", minutes: 8,
      body: `Two router features appear in nearly every network: translation to reach the internet from private addresses, and redundancy so the default gateway never disappears.

## Network address translation
NAT rewrites addresses as packets cross the router.
- **Static NAT**: one private address permanently mapped to one public address. Used to publish a server. One-to-one.
- **Dynamic NAT**: private hosts borrow public addresses from a pool as needed. Many-to-many, limited by pool size.
- **PAT** (port address translation, also called NAT overload): many private hosts share **one** public address; the router tracks each conversation by source port. This is what every home router and most offices do. Many-to-one.
- **Port forwarding**: a static rule sending inbound traffic on a specific public port to an inside host, for example public port 443 to the web server.
NAT terms: **inside local** is the private address, **inside global** is its public translation.

## First-hop redundancy protocols
If the default gateway router dies, every host on the subnet loses the outside world. FHRPs let two or more routers share a **virtual IP** and virtual MAC that hosts use as their gateway.
- **HSRP**: Cisco proprietary, active and standby routers.
- **VRRP**: the open standard equivalent, master and backup routers.
- **GLBP**: Cisco, adds load balancing across the gateways.
Failover is automatic and invisible to hosts; they keep using the same gateway address.

## Subinterfaces
One physical router interface split into logical interfaces, each tagged with a VLAN and given its own IP. This is how a router on a stick routes between VLANs, and how a single WAN port carries several provider circuits.

> Exam tip: "50 hosts share one public IP" is PAT. "Two routers share one gateway address so hosts survive a failure" is an FHRP; the open-standard one is VRRP. "Expose an internal web server" is static NAT or port forwarding.`,
      hook: "Static one-to-one, dynamic pool, PAT many-to-one by port. HSRP is Cisco, VRRP is open standard; both give one virtual gateway IP."
    },
    {
      id: "u7l4", title: "Network Appliances and Functions", domain: 1, obj: "1.2", minutes: 10,
      body: `The exam expects you to pick the right device for a job and to know what each one does at which layer.

## Forwarding devices
- **Router**: Layer 3, connects networks, chooses paths, separates broadcast domains.
- **Switch**: Layer 2, forwards frames by MAC, one collision domain per port.
- **Layer 3 switch**: a switch that also routes between VLANs in hardware; the usual distribution or core device.
- **Wireless access point**: bridges Wi-Fi clients onto the wired LAN at Layer 2. A **wireless LAN controller** manages many APs centrally.

## Security devices
- **Firewall**: filters traffic between zones. Stateful firewalls track connections; next-generation firewalls inspect applications and users at Layer 7.
- **IDS** (intrusion detection system): watches a copy of traffic and **alerts** on attacks. Passive, out of band, cannot stop anything.
- **IPS** (intrusion prevention system): sits **inline** in the traffic path and **blocks** attacks in real time. Can also become a bottleneck or block legitimate traffic on a false positive.
- **VPN concentrator**: terminates many encrypted tunnels from remote users or sites.
- **Proxy server**: makes requests on behalf of clients. Forward proxies filter and cache user web traffic and hide client addresses; **reverse proxies** sit in front of servers to terminate TLS, cache, and protect them.

## Performance and delivery devices
- **Load balancer**: spreads client connections across a pool of servers for scale and fault tolerance, using round robin, least connections, or health-based methods.
- **Content delivery network (CDN)**: caches content on servers around the world so users fetch it from a nearby node. Reduces latency and absorbs traffic spikes.
- **QoS** (quality of service): not a device but a function that classifies and prioritizes traffic, so voice and video get through when links are congested. Implemented on switches and routers.

## Storage
- **NAS**: network-attached storage shares files over the LAN using SMB or NFS. File-level.
- **SAN**: storage area network gives servers block-level access over a dedicated network using iSCSI or Fibre Channel. Looks like a local disk to the server.

## TTL
Time to live is a field in the IP header decremented by each router. When it hits zero the packet is discarded, which prevents packets from circling forever. Traceroute exploits it by sending packets with increasing TTLs.

> Exam tip: "alert only" is IDS, "block inline" is IPS. "File shares over the network" is NAS; "block storage that looks like a local disk" is SAN. "Serve users from the closest cache" is a CDN.`,
      hook: "IDS watches, IPS blocks inline. Load balancer spreads servers, proxy brokers clients, CDN caches nearby. NAS files, SAN blocks."
    },
    {
      id: "u7l5", title: "Cloud Concepts", domain: 1, obj: "1.3", minutes: 9,
      body: `Cloud networking uses the same concepts as the office network, delivered as software on a provider's infrastructure.

## Service models
- **SaaS**: the provider runs the whole application; you use it. Email and office suites.
- **PaaS**: the provider runs the operating system and runtime; you deploy code. Developers.
- **IaaS**: the provider runs the hardware and hypervisor; you install and manage operating systems on rented virtual machines, plus storage and networking.
Rule: the more the provider manages, the further right on SaaS, PaaS, IaaS you are not.

## Deployment models
- **Public**: shared provider infrastructure, pay as you go.
- **Private**: infrastructure dedicated to one organization, on premises or hosted.
- **Hybrid**: a mix, often on-premises systems connected to public cloud resources.

## Cloud networking pieces
- **VPC** (virtual private cloud): your isolated virtual network inside the provider, with its own address space and subnets.
- **Network security group**: a stateful firewall applied to individual virtual machine interfaces.
- **Network security list** or network ACL: stateless rules applied to a whole subnet.
- **Internet gateway**: lets resources with public addresses reach the internet.
- **NAT gateway**: lets private-subnet resources reach out to the internet without being reachable from it.
- **NFV** (network functions virtualization): routers, firewalls, and load balancers run as software instances instead of dedicated hardware.

## Connecting to the cloud
- A **site-to-site VPN** over the internet is fast to set up and encrypted but shares internet performance.
- A **direct connect** (private dedicated circuit) offers predictable bandwidth and latency at higher cost.

## Cloud properties
- **Scalability**: capacity can grow to meet demand.
- **Elasticity**: capacity grows and shrinks automatically with demand, so you pay for what you use.
- **Multitenancy**: many customers share the same physical infrastructure, isolated logically.

> Exam tip: "you manage the OS, they manage the hardware" is IaaS. "Rules on a single VM's interface" is a security group; "rules on the subnet" is a network security list. "Private subnet needs outbound internet only" is a NAT gateway.`,
      hook: "SaaS use it, PaaS deploy on it, IaaS build on it. VPC is your cloud network; security group per VM, security list per subnet; NAT gateway outbound only."
    },
    {
      id: "u7l6", title: "Modern Networking: SDN, SD-WAN, VXLAN, Zero Trust, IaC", domain: 1, obj: "1.8", minutes: 10,
      body: `A cluster of newer technologies shows up together on the exam. Each solves a specific limitation of traditional networking.

## Software-defined networking
SDN separates the **control plane** (decisions) from the **data plane** (forwarding). A central controller programs many devices through APIs instead of an administrator logging into each one. Terms: the **application plane** on top, **northbound APIs** from applications to the controller, **southbound APIs** from the controller to devices, and a **management plane** for monitoring and configuration.

## SD-WAN
Applies SDN to wide-area links. A branch uses several cheap connections (broadband, LTE, MPLS) and the SD-WAN controller steers each application over the best path in real time.
- **Application aware**: recognizes traffic types and applies policy per application.
- **Transport agnostic**: works over any underlying link.
- **Zero-touch provisioning**: a new branch device downloads its configuration automatically when plugged in.
- **Central policy management**: one place to define rules for every site.

## VXLAN
Virtual extensible LAN encapsulates Layer 2 frames inside UDP so a VLAN can stretch across a routed Layer 3 network. It supports 16 million segments (a 24-bit VNI) versus 4094 VLANs and is the standard way data centers do **data center interconnect** and multi-tenant isolation.

## Zero trust architecture
Never trust, always verify. Being inside the network grants nothing. Every access request is authenticated and authorized against **policy**, using identity, device health, and context, with **least privilege** so users get only what their role needs. Contrast with the old perimeter model, where anything inside the firewall was trusted.

## SASE and SSE
**Secure access service edge** delivers networking (SD-WAN) and security (firewall, secure web gateway, zero trust access, CASB) as one cloud service, so remote users and branches get the same protection everywhere. **Security service edge** is the security half without the SD-WAN.

## Infrastructure as code
Network configuration written as files and applied automatically.
- **Playbooks and templates** describe desired configuration; tools push it to devices consistently.
- **Source control** tracks every change, who made it, and lets you roll back.
- **Configuration drift** is when a device's live config no longer matches the template; IaC detects and corrects it.
- **Dynamic inventories** discover devices automatically; automated upgrades roll firmware out safely.

> Exam tip: "one controller programs the whole network" is SDN. "Branch uses broadband and LTE with application-based path selection" is SD-WAN. "Stretch Layer 2 across data centers" is VXLAN. "Verify every request regardless of location" is zero trust.`,
      hook: "SDN splits control from data. SD-WAN is app-aware and transport-agnostic. VXLAN stretches Layer 2 over Layer 3. Zero trust verifies everything. IaC: templates, source control, no drift."
    },
    {
      id: "u7l7", title: "Physical Installations", domain: 2, obj: "2.4", minutes: 7,
      body: `Networks live in rooms, and the exam expects you to know how those rooms are built.

## Distribution frames
- **MDF** (main distribution frame): the building's primary wiring room. Holds the core switches and routers, the **demarcation point** where the provider's circuit ends and your responsibility begins, and the connections to every other closet.
- **IDF** (intermediate distribution frame): a smaller closet on each floor or wing. Access switches here connect to user jacks and uplink to the MDF over fiber or copper backbone runs.

## Racks
Equipment mounts in 19-inch racks measured in **rack units**; 1U is 1.75 inches. A **two-post rack** holds light equipment; a **four-post rack** or **cabinet** supports heavy servers and can be **lockable** for physical security. Airflow matters: servers pull cool air from the front and exhaust hot air at the back, so racks face a cold aisle and a hot aisle. Switches may be **port-side exhaust** or **port-side intake**; choose so the air flows the same direction as everything else in the rack.

## Patch panels and cable management
Horizontal cabling from wall jacks terminates on a **patch panel**; short patch cords connect panel ports to switch ports. This way you never re-terminate the permanent cable. **Fiber distribution panels** do the same for fiber. Label both ends of every cable.

## Power
- **UPS** (uninterruptible power supply): battery that carries the load through outages and conditions the power. Sized in VA or watts against the total load, for enough runtime to shut down cleanly or for a generator to start.
- **PDU** (power distribution unit): the rack's power strip; managed PDUs let you switch and monitor outlets remotely.
- Check **power load** against circuit capacity and **voltage** (120 or 208/240 in North America). Redundant power supplies should plug into separate circuits.

## Environment
Keep temperature around 18 to 27 C (64 to 80 F) and relative humidity about 40 to 60 percent: too dry invites static discharge, too humid invites condensation. **Fire suppression** in equipment rooms uses clean agents or gas rather than water. Monitor with sensors.

> Exam tip: "main building wiring room with the demarc" is the MDF. "Closet on each floor" is an IDF. Airflow questions want intake and exhaust to match the aisle design. The UPS is the immediate battery; the generator is long-term.`,
      hook: "MDF is the main room with the demarc, IDFs on each floor. 1U is 1.75 inches. Front cold, back hot. UPS bridges to the generator. 40 to 60 percent humidity."
    }
  ]
});

NPA.units.push({
  id: "u8", n: 8, title: "Operations and Security", domain: 3,
  blurb: "Documentation, change control, monitoring, disaster recovery, remote access, and the security concepts, attacks, and defenses on the exam.",
  assumes: "You have done routing, NAT, and switching. This unit is about running and protecting the network.",
  lessons: [
    {
      id: "u8l1", title: "Documentation", domain: 3, obj: "3.1", minutes: 7,
      body: `Documentation is what lets the next person, or you at 3 a.m., understand the network.

## Diagrams
- **Physical diagram**: where devices sit and how cables run. Racks, closets, ports.
- **Logical diagram**: how traffic flows: subnets, VLANs, routing, addressing. It does not care which rack a router is in.
- **Layer 1 diagram**: cabling and physical links. **Layer 2 diagram**: switches, VLANs, trunks, spanning tree. **Layer 3 diagram**: routers, subnets, routing protocols.
- **Rack diagram**: front view of each rack showing which device is in which rack unit.
- **Cable map** or wiring diagram: which jack connects to which patch panel port and switch port. The document a toner and probe replaces when it is missing.

## Inventories and records
- **Asset inventory**: every device with model, serial, location, owner, purchase date, **warranty** and support status, and **software licensing**. Drives lifecycle decisions.
- **IPAM** (IP address management): the authoritative record of every subnet, address, and assignment. Prevents duplicate addresses and overlapping subnets.
- **Wireless survey and heat map**: measured signal strength across the floor plan, recorded at deployment and after changes.

## Agreements
- **SLA** (service level agreement): what a provider guarantees, such as 99.9 percent uptime and four-hour repair, and the penalties if they miss.
- **MOU** (memorandum of understanding): a non-binding statement of intent between parties.
- **NDA**: non-disclosure agreement protecting confidential information.

## Keeping it current
Documentation that is not updated after a change is worse than none, because people trust it. Updating diagrams and IPAM is the last step of every change.

> Exam tip: "shows IP addressing, VLANs, and how traffic flows" is a logical diagram. "Which port on the patch panel goes to which jack" is a cable map. "Guaranteed uptime from the ISP" is the SLA.`,
      hook: "Physical is where, logical is how traffic flows. Rack diagram by U, cable map by port. IPAM owns addresses. SLA is the provider's promise."
    },
    {
      id: "u8l2", title: "Life Cycle, Change, and Configuration Management", domain: 3, obj: "3.1", minutes: 7,
      body: `Networks change constantly. These processes keep change from becoming outages.

## Life cycle management
Every product moves through stages. **End of life (EOL)** means the vendor stops selling it. **End of support (EOS)** means no more patches or help, which turns the device into a security risk that should be replaced. Plan refreshes before EOS. **Patching** and **firmware updates** fix bugs and vulnerabilities and should follow a tested schedule. **Decommissioning** removes a device cleanly: wipe configuration and data, update inventory and diagrams, recover licenses.

## Change management
A formal process so no one changes production on a whim:
1. Submit a **change request** describing what, why, when, and the risk.
2. Assess impact and define a **rollback plan** in case it fails.
3. Get **approval** from the change board or owner.
4. Schedule a **maintenance window** and notify affected users.
5. Implement, test, and **document** the result.
Emergency changes follow a shortened path but are still recorded. A **service request** is the lighter-weight ticket for routine, pre-approved work.

## Configuration management
- **Production configuration**: what is running now.
- **Backup configuration**: a saved copy taken before and after changes so you can restore.
- **Baseline** or **golden configuration**: the approved standard build for a device type. Compare running configs against it to catch drift and unauthorized changes.
Automated tools back up configurations nightly and alert on differences.

> Exam tip: "what should happen before the firmware upgrade" is a change request with a rollback plan and approval. "Device no longer receives security updates" is end of support and a replacement priority.`,
      hook: "EOL stops sales, EOS stops patches. Request, assess, rollback plan, approve, window, document. Golden config is the standard; drift is the deviation."
    },
    {
      id: "u8l3", title: "Monitoring Methods", domain: 3, obj: "3.2", minutes: 10,
      body: `You cannot fix what you cannot see. The exam covers several ways to collect what the network is doing.

## SNMP
**Simple Network Management Protocol** lets a manager read and write values on devices.
- The **agent** runs on the device. The **MIB** (management information base) is its database of variables, each addressed by an **OID** (object identifier).
- The manager **polls** with Get requests over UDP 161. The agent sends **traps** on its own initiative over UDP 162 when something happens, such as an interface going down.
- **SNMPv1 and v2c** authenticate with a plaintext **community string**; v2c added bulk retrieval. **SNMPv3** adds real authentication, integrity, and encryption. Use v3.

## Flow data
NetFlow, sFlow, and IPFIX export summaries of conversations: who talked to whom, on which ports, how much, when. No payload. Ideal for finding bandwidth hogs and unusual traffic patterns at scale.

## Packet capture
A **protocol analyzer** such as Wireshark records every byte. Feed it from a **port mirror** (SPAN) on a switch or an inline **tap**. Complete detail, expensive to store, so use it for targeted troubleshooting.

## Logs
Devices send events to a central **syslog** collector (UDP 514). Syslog severity levels run from 0 emergency to 7 debug. **Log aggregation** collects everything in one place; a **SIEM** (security information and event management) correlates logs across sources, alerts on patterns, and keeps them for compliance. Traffic logs show connections; audit logs show who changed what.

## Baselines and anomaly alerting
A **baseline** records normal utilization, latency, and error rates over time. Alerts fire when current values deviate from the baseline, which catches problems that a fixed threshold would miss.

## API integration
Modern platforms expose **APIs** so monitoring tools pull metrics and push configuration programmatically, and so tools can be chained together.

> Exam tip: "encrypted and authenticated SNMP" is v3. "See top talkers without capturing every packet" is flow data. "Alerts pushed from the device" are traps on UDP 162. "Correlate security events from many sources" is a SIEM.`,
      hook: "SNMP polls on 161, traps on 162, v3 encrypts. Flow data for who-talked-to-whom, packet capture for every byte, syslog 514 to a SIEM, baselines for anomalies."
    },
    {
      id: "u8l4", title: "Monitoring Solutions and Performance Metrics", domain: 3, obj: "3.2", minutes: 6,
      body: `Monitoring tools fall into a few categories, and they all report the same handful of metrics.

## Solutions
- **Network discovery**: finds devices and how they connect, often by SNMP, LLDP/CDP, and ping sweeps. Ad hoc for a one-time inventory, or scheduled to catch new devices.
- **Traffic analysis**: uses flow data and captures to show what applications use the bandwidth.
- **Performance monitoring**: tracks utilization, errors, latency, and device health such as CPU, memory, and temperature.
- **Availability monitoring**: is it up? Ping, port checks, and synthetic transactions, with uptime reporting against the SLA.
- **Configuration monitoring**: watches running configurations for changes and compliance against the golden config.

## Metrics you must define
- **Bandwidth**: the capacity of a link. **Throughput**: what you actually get.
- **Utilization**: throughput as a percentage of bandwidth. Sustained utilization above about 70 to 80 percent means congestion is coming.
- **Latency**: one-way or round-trip delay, in milliseconds. Distance, queueing, and satellite hops add to it.
- **Jitter**: variation in latency from packet to packet. Voice and video tolerate steady delay far better than variable delay; jitter causes choppy audio.
- **Packet loss**: percentage of packets that never arrive. Causes retransmissions on TCP and gaps in voice.
- **Interface errors and discards**: CRC errors, runts, giants, and drops on a port.

## Device health
CPU, memory, temperature, and fan status. A switch at 100 percent CPU often means a broadcast storm or an attack.

> Exam tip: "choppy VoIP with packets arriving at irregular intervals" is jitter. "Slow but steady delay" is latency. "Uptime reporting against the contract" is availability monitoring.`,
      hook: "Bandwidth is capacity, throughput is reality, utilization is the ratio. Latency is delay, jitter is variation, loss is missing packets."
    },
    {
      id: "u8l5", title: "Disaster Recovery and High Availability", domain: 3, obj: "3.3", minutes: 8,
      body: `High availability keeps services running through component failures. Disaster recovery brings them back after a site-level loss.

## The four metrics
- **RPO** (recovery point objective): how much data you can afford to lose, measured backward in time. An RPO of one hour means backups or replication at least hourly.
- **RTO** (recovery time objective): how quickly a service must be restored after failure.
- **MTTR** (mean time to repair): average time to fix something once it breaks.
- **MTBF** (mean time between failures): average time a component runs before failing. Higher is better; used to plan spares and replacements.

## Recovery sites
- **Cold site**: space, power, and cooling, but no equipment or data. Cheapest, slowest; days or weeks to bring online.
- **Warm site**: equipment and connectivity in place, but data must be restored and systems started. Hours to a day.
- **Hot site**: a running mirror of production with current data. Minutes to fail over. Most expensive.
- A **cloud site** provides any of these as virtual resources on demand.

## Redundancy designs
- **Active-active**: all nodes handle traffic simultaneously; capacity drops when one fails but service continues. Load balancers and some firewall clusters.
- **Active-passive**: one node works while a standby waits, taking over on failure. Simpler; the standby is idle until needed. FHRPs are active-passive.
- Redundant hardware: dual power supplies on separate circuits, NIC teaming, multipathing to storage, diverse WAN paths from different providers entering the building at different points.

## Testing the plan
- **Tabletop exercise**: the team walks through the DR plan on paper, finding gaps without touching systems.
- **Validation test**: actually fail over to the recovery site or restore from backup to prove it works and measure the real RTO.

> Exam tip: "how much data can we lose" is RPO. "How long until we are back" is RTO. "Servers and network in place but data must be restored" is a warm site. "Discuss the scenario in a conference room" is a tabletop.`,
      hook: "RPO data lost, RTO time down, MTTR fix time, MTBF life span. Cold empty, warm equipped, hot running. Tabletop talks, validation fails over for real."
    },
    {
      id: "u8l6", title: "Remote Access and Management Methods", domain: 3, obj: "3.5", minutes: 7,
      body: `Administrators and users need to reach the network from anywhere, and administrators need to reach devices even when the network is broken.

## VPN types
- **Site-to-site**: two gateways build a permanent encrypted tunnel so two offices act as one network. Users do nothing special.
- **Client-to-site**: a user runs VPN software that tunnels to the corporate gateway. Remote workers.
- **Clientless**: access through a browser over TLS, no software to install, usually limited to web applications.
- **Split tunnel**: only corporate traffic goes through the VPN; internet traffic goes direct. Saves bandwidth but bypasses corporate security for that traffic.
- **Full tunnel**: everything goes through the VPN. Slower, but all traffic is inspected and protected.

## Ways to manage devices
- **SSH**: encrypted command line, TCP 22. Replace Telnet everywhere.
- **GUI**: web interface over HTTPS.
- **API**: programmatic access for automation and monitoring tools.
- **Console**: a direct serial or USB cable into the device. Works with no network configuration at all.
- **Jump box** or **bastion host**: a hardened server you connect to first, and from it you reach internal devices. Management traffic is funneled through one monitored, well-defended point.

## In-band versus out-of-band
- **In-band** management travels over the production network. Convenient, but if the network is down you cannot reach the device to fix it.
- **Out-of-band** management uses a separate path: console servers connected to every device's console port, a dedicated management network, or a cellular modem. It works when production is dead, which is exactly when you need it.

> Exam tip: "reach devices even when the production network is down" is out-of-band. "Only work traffic through the VPN, browsing goes direct" is split tunnel. "Single hardened host used to reach everything else" is a jump box.`,
      hook: "Site-to-site joins offices, client-to-site joins people, clientless is a browser. Split tunnel saves bandwidth, full tunnel protects. Out-of-band works when the network does not."
    },
    {
      id: "u8l7", title: "Security Concepts", domain: 4, obj: "4.1", minutes: 12,
      body: `Security on this exam is vocabulary plus a few mechanisms. Learn the words precisely.

## The CIA triad and risk terms
- **Confidentiality**: only authorized people see the data. Encryption and access controls.
- **Integrity**: data is not altered without detection. Hashing and signatures.
- **Availability**: systems stay reachable. Redundancy and DDoS protection.
- A **vulnerability** is a weakness. A **threat** is anything that could exploit it. An **exploit** is the method or code used. **Risk** is the likelihood and impact of a threat exploiting a vulnerability.

## Encryption
- **In transit**: protecting data moving across the network, with TLS, IPsec, SSH.
- **At rest**: protecting stored data, with disk or database encryption.
- **PKI** (public key infrastructure): certificates issued by a **certificate authority** bind a public key to an identity. Browsers trust CA-signed certificates. A **self-signed certificate** is not signed by a trusted CA, so clients warn unless the certificate is manually installed as trusted; acceptable for internal test systems, not for the public.

## Identity and access management
- **Authentication** proves who you are; **authorization** decides what you may do; **accounting** records what you did. Together, AAA.
- **MFA**: two or more factors: something you know (password), have (token, phone app), are (fingerprint), plus location or time as extra conditions. A password and a **TOTP** code from an app are know plus have.
- **SSO**: log in once, access many systems. **SAML** is a common web SSO standard between an identity provider and applications.
- **RADIUS**: UDP 1812 and 1813, authenticates network access (Wi-Fi, VPN, 802.1X), encrypts only the password. **TACACS+**: TCP 49, encrypts the whole payload, separates authentication from authorization, favored for administering network devices with per-command control.
- **LDAP**: directory lookups, TCP 389; **LDAPS** on 636.
- **Least privilege**: give only the access a role needs. **Role-based access control** assigns permissions to roles, then users to roles.
- **Geofencing**: allow or deny based on physical location.

## Physical and deception
Locks, badge readers, cameras, and mantraps protect the rooms. A **honeypot** is a decoy system that attracts attackers so you can watch them; a **honeynet** is a whole decoy network.

## Compliance and segmentation
**Data locality** laws require certain data to stay in certain countries. **PCI DSS** governs card payment data; **GDPR** governs personal data of EU residents. Segment risky device classes onto their own networks: **IoT**, **IIoT**, **SCADA/ICS/OT** industrial systems that cannot be patched, **guest**, and **BYOD**.

> Exam tip: "password plus a code from a phone app" is two factors, know and have. "Encrypts the entire packet and separates authentication from authorization" is TACACS+. "Decoy server to study attackers" is a honeypot.`,
      hook: "CIA: confidentiality, integrity, availability. Vulnerability is the weakness, threat exploits it, risk is the odds times impact. RADIUS for users, TACACS+ for devices. Least privilege always."
    },
    {
      id: "u8l8", title: "Common Attacks", domain: 4, obj: "4.2", minutes: 10,
      body: `Recognize each attack from a one-sentence description of its symptoms.

## Availability attacks
- **DoS**: one source floods a target so it cannot serve real users. **DDoS**: many sources, usually a botnet, doing the same. Reflection and amplification tricks make small requests produce huge responses aimed at the victim.

## Layer 2 attacks
- **VLAN hopping**: an attacker reaches a VLAN they should not by **switch spoofing** (pretending to be a trunk-capable switch) or **double tagging** (nesting two 802.1Q tags so the second switch forwards into the target VLAN). Defenses: disable trunk negotiation on access ports, use a dedicated unused native VLAN.
- **MAC flooding**: the attacker sends frames from thousands of fake source MACs, overflowing the switch's MAC table. The switch falls back to flooding every frame, so the attacker can sniff all traffic. Defense: port security.
- **ARP poisoning / spoofing**: forged ARP replies tell hosts that the attacker's MAC belongs to the gateway's IP. Traffic flows through the attacker: an **on-path attack** (formerly man-in-the-middle). Defense: dynamic ARP inspection.

## Name and address attacks
- **DNS poisoning / spoofing**: corrupt entries in a resolver's cache or forged answers send users to attacker sites. Defense: DNSSEC.
- **Rogue DHCP**: an unauthorized server answers Discover first and hands out its own gateway and DNS, redirecting traffic. Defense: DHCP snooping.
- **IP spoofing**: forging the source address to hide or to impersonate a trusted host.

## Wireless attacks
- **Rogue access point**: any AP on your network you did not authorize, often an employee's convenience device. It opens a back door.
- **Evil twin**: an attacker's AP broadcasting your SSID so users connect to it and hand over traffic or credentials.
- **Deauthentication**: forged management frames kick clients off, often to capture the reconnect handshake.

## People and software
- **Social engineering**: manipulating people. **Phishing** (email), **vishing** (phone), **smishing** (text), **spear phishing** (targeted), **tailgating** (following someone through a door), **shoulder surfing**, **dumpster diving**.
- **Malware**: **ransomware** encrypts data for payment; **trojans** hide inside legitimate software; **worms** self-propagate; **spyware** watches.
- **Password attacks**: brute force tries everything; dictionary attacks try common words; credential stuffing reuses leaked passwords.

> Exam tip: "same SSID as the corporate network" is an evil twin. "Switch started forwarding all traffic to all ports" is MAC flooding. "Forged ARP replies put the attacker between the user and the gateway" is ARP poisoning enabling on-path. "Wrong gateway from an unknown server" is rogue DHCP.`,
      hook: "Evil twin copies your SSID, rogue AP is unauthorized. MAC flooding overflows the table, ARP poisoning redirects, VLAN hopping double-tags, DNS poisoning lies, rogue DHCP misdirects."
    },
    {
      id: "u8l9", title: "Defense and Hardening", domain: 4, obj: "4.3", minutes: 8,
      body: `Defense means shrinking the attack surface, controlling who gets on, and controlling what moves between zones.

## Device hardening
- **Change default passwords** on every device before deployment. Default credentials are public knowledge.
- **Disable unused ports** physically and logically: shut down unused switch ports or put them in an unused VLAN; turn off services such as Telnet, HTTP management, and unnecessary protocols.
- Patch firmware, use SSH and HTTPS only, and restrict management to the management VLAN or out-of-band network.
- **Key management**: rotate keys and certificates, protect private keys, and revoke compromised ones.

## Network access control
**NAC** checks a device before allowing it on the network, using **802.1X** for authentication and a **posture assessment** for health: is antivirus current, are patches installed, is the disk encrypted. Compliant devices get their VLAN; noncompliant devices land in a **quarantine or remediation VLAN** with just enough access to fix themselves. Agents on the device or agentless scans do the checking.

## Filtering
- **ACLs** (access control lists) on routers and firewalls permit or deny traffic by source, destination, protocol, and port. Processed top down, first match wins, implicit deny at the end.
- **URL filtering** blocks sites by address or category. **Content filtering** inspects what is inside: malware, data leakage, inappropriate material.
- **MAC filtering** and hidden SSIDs are weak controls, easily spoofed.

## Zones and the screened subnet
Firewalls divide the network into **trusted** (internal) and **untrusted** (internet) zones. Public-facing servers such as web and mail belong in a **screened subnet**, historically called a **DMZ**: a middle zone reachable from the internet but separated from the internal LAN by another firewall layer. If a public server is compromised, the attacker is still outside the trusted zone.

## Segmentation as defense
Separate VLANs and firewall rules for guests, IoT, industrial systems, and management traffic limit how far an intruder can move.

> Exam tip: "only laptops with current antivirus may join, others go to a remediation VLAN" is NAC with posture assessment. "Where to put the public web server" is the screened subnet. "First thing to do with a new switch" is change the default password and disable unused ports.`,
      hook: "Harden: change defaults, disable unused, patch, encrypt management. NAC checks posture at the door. ACLs first match wins, implicit deny. Public servers live in the screened subnet."
    }
  ]
});

NPA.units.push({
  id: "u9", n: 9, title: "Troubleshooting", domain: 5,
  blurb: "The seven-step method, the cabling, service, and performance problems the exam describes, and the tools that find them.",
  assumes: "You run networks day to day and want to sharpen diagnosis and tool selection.",
  lessons: [
    {
      id: "u9l1", title: "The Troubleshooting Methodology", domain: 5, obj: "5.1", minutes: 7,
      body: `Troubleshooting is the largest exam domain, and many questions simply ask which step comes next. Learn the order cold.

## The seven steps
1. **Identify the problem.** Gather information, question users, identify symptoms, determine if anything changed, duplicate the problem if possible, and approach multiple problems individually.
2. **Establish a theory of probable cause.** Question the obvious first. Work top-to-bottom or bottom-to-top through the OSI layers, or divide and conquer by starting in the middle.
3. **Test the theory to determine the cause.** If confirmed, move on. If not, form a new theory or escalate.
4. **Establish a plan of action** to resolve the problem and **identify potential effects**. What else could this change break?
5. **Implement the solution or escalate** if it is beyond your authority or ability.
6. **Verify full system functionality** and, if applicable, **implement preventive measures** so it does not recur.
7. **Document findings, actions, outcomes, and lessons learned** throughout the process.

## Habits inside the steps
- Ask what changed. Most outages follow a change.
- Check the simple things: power, cable, link light, the right port.
- Narrow scope: one user or many, one site or all, one application or everything.
- Never skip the plan step to go straight to implementation; the exam punishes it.
- Escalation is a legitimate answer when the fix needs someone else's access or authority.

## Approaches to theory building
- **Top-to-bottom**: start at the application and work down to the cable.
- **Bottom-to-top**: start at the cable and work up. Good when the link light is off.
- **Divide and conquer**: start at Layer 3 (can you ping?) and go up or down based on the result.

> Exam tip: after the theory is confirmed, the next step is the plan of action, not implementing the fix. After implementing, verify before documenting. Documenting comes last.`,
      hook: "Identify, theorize, test, plan, implement or escalate, verify and prevent, document. Plan before you touch anything."
    },
    {
      id: "u9l2", title: "Cabling and Physical Interface Problems", domain: 5, obj: "5.2", minutes: 10,
      body: `Layer 1 and 2 problems have specific fingerprints. Match the symptom to the cause.

## Cable selection errors
- **Wrong fiber type**: single-mode optic on multimode fiber or the reverse. No link, or a link with heavy errors.
- **Wrong category**: Cat 5e on a 10 Gbps link negotiates down or errors out.
- **Shielded versus unshielded**: UTP in a high-EMI environment such as near motors or fluorescent ballasts picks up interference.
- **Wrong cable pinout**: straight-through where crossover is needed on gear without auto-MDIX, or a **transmit and receive (TX/RX) reversal** on fiber, where the two strands are swapped; swap them back at one end.

## Signal problems
- **Attenuation**: signal weakens over distance. Copper past 100 meters and fiber past its rated reach show intermittent link or high error rates. Fix with a repeater, a switch in the middle, or fiber.
- **Crosstalk**: signal bleeding between pairs, caused by poor termination, untwisted pairs at the connector, or damaged jackets.
- **Interference (EMI/RFI)**: noise from power lines, motors, or radios. Reroute, shield, or move to fiber.
- **Improper termination**: pairs in the wrong pins or not seated. A cable tester shows opens, shorts, split pairs, or miswires.

## Interface counters
- **CRC errors**: frames arrived corrupted. Bad cable, interference, or a **duplex mismatch**.
- **Runts**: frames smaller than 64 bytes; collisions or bad NIC. **Giants**: frames larger than the MTU; usually an MTU or jumbo mismatch.
- **Drops or discards**: the interface queue overflowed; congestion.
- **Late collisions**: the classic duplex mismatch signature.

## Port status
- **Administratively down**: someone typed shutdown. Bring it up.
- **Error-disabled**: the switch shut the port for a violation such as port security, BPDU guard, or link flapping. Fix the cause, then clear it.
- **Suspended**: usually a link aggregation member with mismatched settings.
- Link light off with a known-good cable points to the far end or a dead port.

## PoE problems
- **Power budget exceeded**: the switch cannot power one more device; the last device plugged in never boots.
- **Incorrect standard**: an 802.3at device on an 802.3af port powers on then resets under load, or never powers on.

## Transceiver problems
- **Mismatch**: different speeds or wavelengths at each end, or vendor-locked modules refused by the switch.
- **Signal strength**: optical power too low from dirty connectors, bent fiber, or excess distance. Check the receive power reading on the transceiver.

> Exam tip: CRC errors and late collisions say duplex mismatch. "Works at 80 meters, fails at 120" is attenuation. "One end's TX to the other end's TX" is a fiber polarity reversal. "Camera powers on, then reboots" is PoE budget or standard.`,
      hook: "CRC plus late collisions is duplex. Past 100 m is attenuation. Swapped strands is TX/RX. Err-disabled needs a cause fixed and a clear. PoE: budget or wrong standard."
    },
    {
      id: "u9l3", title: "Network Service Problems", domain: 5, obj: "5.3", minutes: 10,
      body: `Layer 2 and Layer 3 service problems each have a telltale story.

## Switching problems
- **Spanning tree loop**: broadcast storm, switch CPU at 100 percent, MAC addresses flapping between ports, everything slow right after a cable was added. STP was disabled or a port had PortFast toward another switch.
- **Root bridge in the wrong place**: an access switch became root because its priority was default and its MAC was lowest, so traffic takes odd paths. Set core priority low.
- **Port roles and states**: a port stuck in blocking or a link that should forward but shows discarding; check BPDUs and priorities.
- **Incorrect VLAN**: host gets an address from the wrong scope or no address, and cannot reach its servers. Check the access port's VLAN. Native VLAN mismatch between trunk ends leaks or drops untagged traffic.

## Addressing problems
- **Incorrect default gateway**: local hosts reachable, remote networks and internet unreachable.
- **Incorrect subnet mask**: some hosts on the same subnet unreachable, or the gateway appears out of range. Mask must match the network's.
- **Duplicate IP address**: intermittent connectivity for two hosts, "address conflict" warnings, ARP table showing one IP with changing MACs. Often a static address inside the DHCP scope without an exclusion.
- **Address pool exhaustion**: new clients get 169.254.x.x while old ones work. Widen the scope, shorten the lease, or find the device hoarding leases.
- **Rogue DHCP**: clients get wrong gateway or DNS from an unexpected server address. Enable DHCP snooping.

## Routing and filtering problems
- **Route selection**: traffic takes the wrong path because a more specific prefix or a lower administrative distance route exists. Check the routing table for the matching entry.
- **Missing return route**: one direction works, replies do not come back.
- **ACL blocking traffic**: a specific application or port fails while others work; ping succeeds but the service does not. Read the ACL top down remembering the implicit deny.
- **Asymmetric routing** through a stateful firewall drops return traffic.

## Name resolution
- **DNS**: ping by IP works, by name fails. Check the client's DNS server setting, then query with nslookup or dig, then check the record itself.

> Exam tip: "IP works, name does not" is DNS. "Local works, remote does not" is the gateway. "Got an address in the wrong range after a desk move" is VLAN. "Intermittent, conflict warning" is duplicate IP. "Only one application blocked" is an ACL.`,
      hook: "Storm after a new cable: STP. Wrong scope: VLAN. Local only: gateway. IP not name: DNS. Conflict: duplicate IP. One app blocked: ACL."
    },
    {
      id: "u9l4", title: "Performance and Wireless Problems", domain: 5, obj: "5.4", minutes: 8,
      body: `When everything works but slowly, you are troubleshooting performance.

## Wired performance
- **Congestion and contention**: too much traffic for the link. Utilization near 100 percent, rising drops and latency. Add bandwidth, apply QoS, or move heavy talkers.
- **Bottleneck**: one slow element limits everything, such as a 100 Mbps uplink feeding a gigabit floor, or an overloaded firewall. Find the weakest link in the path.
- **Latency**: high round-trip time. Distance and satellite hops add fixed latency; queueing adds variable latency. Interactive applications suffer first.
- **Jitter**: variable delay. Voice and video break up while file transfers seem fine. QoS and jitter buffers help.
- **Packet loss**: retransmissions, stalls, and gaps in voice. Look for errors and discards on interfaces along the path.
- **Duplex or speed mismatch**: a single link that is inexplicably slow with errors.

## Wireless performance
- **Interference**: other networks, microwaves, cordless phones, Bluetooth. Symptom: strong signal but poor throughput and retries. Change channel; move to 5 GHz.
- **Channel overlap**: neighboring APs on the same or overlapping 2.4 GHz channels. Use 1, 6, and 11 only.
- **Signal degradation**: walls, metal, distance, and water absorb signal. Move or add APs, adjust antennas.
- **Insufficient coverage**: dead spots the survey missed. Add an AP or a mesh node.
- **Client disassociation**: clients drop unexpectedly. Causes include interference, too many clients per AP, aggressive power saving, or deauthentication attacks.
- **Roaming misconfiguration**: clients cling to a distant AP because cells overlap too little or transmit power is too high, or roaming fails because SSID and security settings differ between APs.
- **Incorrect antenna placement or type**: an omnidirectional antenna where a directional one was needed, or an AP mounted behind metal.

> Exam tip: "full signal bars, slow speed" is interference or co-channel overlap, not coverage. "Choppy voice, varying delay" is jitter. "Works fine except the uplink between buildings is saturated" is a bottleneck.`,
      hook: "Congestion fills the link, a bottleneck is the slowest hop, latency is delay, jitter is jitter. Strong signal but slow is interference; use 1, 6, 11."
    },
    {
      id: "u9l5", title: "Software Tools and Commands", domain: 5, obj: "5.5", minutes: 11,
      body: `Know what each tool shows and which problem it answers.

## Reachability and path
- **ping**: is the host reachable, and what is the round-trip time and loss? Ping the loopback, your own address, the gateway, then a remote host to find where connectivity stops.
- **traceroute / tracert**: every hop to the destination with its latency. Shows **where** along the path packets are lost or delayed. Windows uses tracert; Linux and macOS use traceroute. **mtr** and **pathping** combine ping and traceroute over time.

## Addressing and neighbors
- **ipconfig** (Windows), **ifconfig** and **ip** (Linux): the host's IP address, mask, gateway, and DNS servers. {{ipconfig /all}} shows DHCP lease and MAC; {{ipconfig /release}} and {{/renew}} refresh the lease; {{ipconfig /flushdns}} clears the resolver cache.
- **arp -a**: the IP-to-MAC cache. Spot duplicate addresses and ARP poisoning.
- **LLDP / CDP**: link layer discovery shows what device and port is on the other end of a cable, straight from the switch.

## Names and ports
- **nslookup** and **dig**: query DNS directly, choose a server, ask for specific record types.
- **netstat**: open connections and listening ports; {{netstat -r}} shows the routing table on many systems.
- **nmap**: scans hosts for open ports and services; also discovers live hosts on a subnet. Authorized use only.

## Capturing traffic
- **Protocol analyzer**: Wireshark and similar decode captured packets for deep analysis.
- **tcpdump**: command-line capture on Linux, often piped to a file for later analysis.

## Device commands
On switches and routers:
- {{show mac-address-table}}: which MAC is on which port and VLAN.
- {{show arp}}: the device's ARP cache.
- {{show interface}}: status, speed, duplex, errors, CRCs, drops.
- {{show route}} (or {{show ip route}}): the routing table and how each route was learned.
- {{show vlan}}: VLANs and their port assignments.
- {{show config}} (or {{show running-config}}): the current configuration.
- {{show power}}: PoE budget and per-port power.

## Measuring
- **Speed tester**: throughput to a known server; compare with the contracted bandwidth.
- **Terminal emulator**: SSH or console access to devices.

> Exam tip: "at which hop are packets being lost" is traceroute. "Which switch port is this MAC on" is show mac-address-table. "See the IP-to-MAC cache" is arp -a. "Which ports are listening on this server" is netstat. "Verify a record on a specific DNS server" is nslookup or dig.`,
      hook: "ping reachability, traceroute the hop, ipconfig the config, arp the cache, nslookup the name, netstat the ports, show interface the errors, show mac-address-table the port."
    },
    {
      id: "u9l6", title: "Hardware Tools", domain: 5, obj: "5.5", minutes: 5,
      body: `A few physical tools solve Layer 1 problems that no command can see.

## Tracing and testing copper
- **Toner and probe**: the tone generator clips onto one end of a cable; the probe finds the other end by sound in a bundle or patch panel. Use it to identify which jack maps to which port when the cable map is missing.
- **Cable tester**: checks continuity, pinout, opens, shorts, split pairs, and length. A **cable certifier** also measures performance against a category standard and prints a report.
- **Punch-down tool** and **crimper**: terminate cable on jacks and panels, or onto RJ45 plugs.
- **Loopback plug**: loops transmit to receive on a port to test the interface itself.

## Fiber
- **Visual fault locator**: shines visible red light into a fiber so you can see breaks, tight bends, or which strand is which at the far end.
- **OTDR** (optical time-domain reflectometer): measures the fiber, locating breaks and losses by distance.
- **Optical power meter**: measures received light level to confirm the link has enough signal.
- **Fiber cleaning kit**: dirty connectors are the most common fiber fault.

## Traffic and radio
- **Network tap**: a passive inline device that copies traffic to an analyzer without depending on a switch's mirror port. Use when you need every frame or the switch cannot mirror.
- **Wi-Fi analyzer**: shows access points, channels, signal strength, and interference so you can plan channels and find dead spots.
- **Spectrum analyzer**: shows all radio energy, including non-Wi-Fi interference sources such as microwaves.

## Power
- **Multimeter**: verify voltage on power circuits and continuity on cables.
- **PoE injector**: adds power to a cable run when the switch cannot supply it.

> Exam tip: "find which wall jack matches this patch panel port" is toner and probe. "Verify a new run is wired correctly" is a cable tester. "See a break in a fiber" is a visual fault locator. "Capture without a SPAN port" is a tap.`,
      hook: "Toner finds the far end, tester checks the pins, certifier proves the category, VFL lights the fiber, tap copies traffic, Wi-Fi analyzer maps channels."
    }
  ]
});
