// NetPlus Academy deeper explanations, units 4 to 6. Original content.
window.NPA = window.NPA || {};
NPA.deep = NPA.deep || {};
Object.assign(NPA.deep, {

u4l1: `## Stop seeing four numbers
The easiest way to understand IPv4 is to stop thinking of it as four numbers and think of it as two parts glued together:

\`\`\`
IP address = NETWORK part + HOST part
\`\`\`

The **subnet mask** is the only thing that tells you where the network part ends and the host part begins.

## 1. A street address
Take {{172.16.40.9}}. Read it like a mailing address: {{172.16.40}} is the neighborhood, {{9}} is the house. That is not always literally how it splits, but it is the right mental picture.

With a mask of /24 it really is that split:

\`\`\`
172 . 16 . 40 . 9
|------------|  |
   NETWORK     HOST
   24 bits     8 bits
\`\`\`

## 2. Why 32 bits and why 0 to 255
An IPv4 address is four **octets**. An octet is 8 bits, so 8 + 8 + 8 + 8 = 32 bits. Each bit in an octet is worth a fixed amount:

\`\`\`
128   64   32   16   8   4   2   1
\`\`\`

Turn every bit on and add them up: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = **255**. Turn them all off: 0. That is where the 0 to 255 range comes from. And 192 is 128 + 64, so 192 in binary is {{11000000}}. You will only ever need this for masks.

## 3. The mask is the important part
Put the address and the mask on top of each other:

\`\`\`
IP:    172 . 16  . 40  . 9
Mask:  255 . 255 . 255 . 0
       -----------------  ---
            NETWORK       HOST
\`\`\`

Read 255 as "this whole octet is network" and 0 as "this whole octet is host." So the network is {{172.16.40}} and the host is {{9}}.

## 4. What /24 means
Writing {{255.255.255.0}} every time is tedious, so we count the network bits instead. Three octets of 255 is three octets of ones: 8 + 8 + 8 = 24 ones. That is **/24**, called CIDR notation.

\`\`\`
CIDR   Mask                  In binary
/8     255.0.0.0             11111111.00000000.00000000.00000000
/16    255.255.0.0           11111111.11111111.00000000.00000000
/24    255.255.255.0         11111111.11111111.11111111.00000000
/32    255.255.255.255       all ones: one single host
\`\`\`

## 5. Where it gets interesting: /27
Now you see {{255.255.255.224}}. The first three octets are 8 + 8 + 8 = 24 bits. The last octet, 224, is not all ones and not all zeros. In binary 224 is {{11100000}}: three ones, five zeros. So 24 + 3 = **/27**.

You do not need to do binary each time. Memorize the eight values a mask octet can be, and how many ones each one holds:

\`\`\`
Mask octet   Binary       Network bits in that octet
128          10000000     1
192          11000000     2
224          11100000     3
240          11110000     4
248          11111000     5
252          11111100     6
254          11111110     7
255          11111111     8
\`\`\`

Try {{255.255.240.0}}: 8 + 8 + 4 + 0 = **/20**. Try /29: 8 + 8 + 8 = 24, three left over, three ones is 224... no, five ones is 248. So /29 is {{255.255.255.248}}.

## 6. The part that usually confuses people: which network is a host on?
Take {{192.168.10.70/27}}. The mask is {{255.255.255.224}}. The **interesting octet** is the one that is not 255 or 0: the last one, 224. The **block size** is 256 minus 224 = **32**. That means networks start every 32 addresses:

\`\`\`
.0   .32   .64   .96   .128   .160   .192   .224
\`\`\`

Where does 70 fall? Between 64 and 96. So the network is {{192.168.10.64}}, the next network starts at .96, and the last address in ours is .95.

\`\`\`
192.168.10.64    network address (first address, never assigned)
192.168.10.65    first usable host
...
192.168.10.94    last usable host
192.168.10.95    broadcast address (last address, never assigned)
\`\`\`

That is 30 usable hosts: 32 addresses in the block minus the two you cannot use.

## 7. Why you cannot use the first and last address
The first address of every subnet, with all host bits zero, is the **network address**. It names the whole subnet in routing tables. The last address, with all host bits one, is the **broadcast address**. Sending to it reaches every host in the subnet. Everything in between is yours to assign.

## 8. The historical classes
Before masks were flexible, the first octet decided the mask. The exam still expects you to recognize the ranges. Look only at the first number:

\`\`\`
Class   First octet   Default mask        Example
A       1 to 126      /8   255.0.0.0      10.50.20.7      (10 = network, 50.20.7 = host)
B       128 to 191    /16  255.255.0.0    172.16.40.9     (172.16 = network, 40.9 = host)
C       192 to 223    /24  255.255.255.0  192.168.1.50    (192.168.1 = network, 50 = host)
D       224 to 239    multicast, never assigned to a host
E       240 to 255    experimental
\`\`\`

Why is 127 missing? Because {{127.0.0.0/8}} is reserved for **loopback**. {{127.0.0.1}} always means "this computer." Pinging it tests your own TCP/IP stack and nothing else.

## 9. Class versus CIDR: the thing to get straight
Classful addressing is obsolete. Modern networks use CIDR, which means any prefix length is allowed on any address. So {{192.168.1.50/26}} is perfectly valid even though 192 is "Class C." The class tells you the historical default. The CIDR prefix tells you what the network actually uses. When a question gives you a prefix or mask, use it. When it only gives you an address and asks for the class or the default mask, use the first octet.

## 10. The big picture, in order
1. Every IPv4 address is 32 bits: four octets of 8 bits, each 0 to 255.
2. The mask splits those bits into network and host. 1 means network, 0 means host.
3. CIDR counts the network bits: /24 is 24 ones.
4. A partial mask octet is one of 128, 192, 224, 240, 248, 252, 254, 255, holding 1 to 8 ones.
5. Block size is 256 minus the interesting mask octet; networks start at multiples of it.
6. First address is the network, last is the broadcast, everything between is usable.
7. Class A 1 to 126, B 128 to 191, C 192 to 223, D multicast, E experimental, 127 loopback.

> The lesson after next teaches the block-size method in full. Once you can look at 192.168.50.137/26 and say the network, broadcast, and usable range in ten seconds, IPv4 stops being confusing.`,

u4l2: `## Two kinds of addresses, one analogy
Every apartment building in a city can have an apartment 4B. That does not cause confusion, because 4B only has to be unique inside its building. The building's street address is what has to be unique in the whole city.

**Private addresses** are apartment numbers: every company can use the same ones inside, because they never appear on the public internet. **Public addresses** are street addresses: globally unique, handed out by registries to providers and organizations. **NAT** (a later lesson) is the front desk that translates between the two when a private host wants to reach the internet.

## The three private ranges (RFC 1918)
\`\`\`
10.0.0.0/8         10.0.0.0     to 10.255.255.255     about 16 million addresses
172.16.0.0/12      172.16.0.0   to 172.31.255.255     about 1 million
192.168.0.0/16     192.168.0.0  to 192.168.255.255    65,536
\`\`\`

The middle one is the trap. A /12 covers 12 network bits: the first octet plus the top four bits of the second octet. Four bits give 16 values, so the second octet runs from 16 through 31. That means **172.16 through 172.31 are private, and 172.32.0.1 is a public address.** Questions love this.

## Special addresses you must recognize on sight
- **169.254.x.x (APIPA).** When a host asks for a DHCP lease and nobody answers, it gives itself an address in this range so it can at least talk to neighbors doing the same. If you see 169.254 on a client, its network card works and its cable is probably fine; what failed is **DHCP**. Look at the DHCP server, the scope, or the path between them. IPv4 calls this "link-local," and IPv6 has its own version (fe80::).
- **127.0.0.0/8 (loopback).** The host itself. {{127.0.0.1}} is the usual one.
- **224.0.0.0 to 239.255.255.255 (multicast).** Group addresses, never assigned to a host.
- **255.255.255.255 (limited broadcast).** Everyone on the local segment. DHCP Discover goes here because the client does not yet know any address.
- **0.0.0.0/0 (default route).** Not a host address at all. In a routing table it means "anything not matched by a more specific route goes this way." The route of last resort.

## Why this arrangement exists
There are only about 4.3 billion IPv4 addresses, and they ran out years ago. Giving every company private addresses inside and one or a few public addresses outside, translated by NAT, stretched the supply. IPv6 is the permanent fix.

## How the exam asks it
- "A workstation shows 169.254.23.7 and cannot reach anything": DHCP failure, not a bad cable.
- "Which of these is a private address?" 172.20.5.5 yes; 172.32.5.5 no; 192.168.200.1 yes; 11.0.0.1 no.
- "Which address does a DHCP Discover use as its destination?" 255.255.255.255.
- "Which route matches any destination?" 0.0.0.0/0.

## What to memorize
- 10/8, 172.16/12 (16 through 31), 192.168/16 are private.
- 169.254 means DHCP failed. 127 is me. 0.0.0.0/0 is the way out.`,

u4l3: `## One trick for every subnetting question
You never need to convert a whole address to binary. You need one number: the **block size**. Everything else follows from it.

## The method
1. Find the **interesting octet**: the first mask octet that is not 255 and not 0.
2. **Block size = 256 minus that mask octet.**
3. Subnets start at multiples of the block size in that octet: 0, then the block size, then double it, and so on.
4. The **network address** is the multiple at or below your host's value. The **broadcast** is one less than the next multiple. **Usable hosts** are everything between.

Keep this table beside you until it is automatic:

\`\`\`
Prefix   Last octet mask   Block size   Usable hosts
/25      128               128          126
/26      192               64           62
/27      224               32           30
/28      240               16           14
/29      248               8            6
/30      252               4            2
\`\`\`

## Worked example 1: {{192.168.1.100/27}}
Mask is {{255.255.255.224}}. Interesting octet: the fourth, 224. Block size: 256 minus 224 = 32. Multiples of 32: 0, 32, 64, 96, 128, 160, 192, 224. The host value 100 sits between 96 and 128.

\`\`\`
Network:     192.168.1.96
First host:  192.168.1.97
Last host:   192.168.1.126
Broadcast:   192.168.1.127     (one less than the next multiple, 128)
Usable:      30
\`\`\`

## Worked example 2: {{10.20.30.200/28}}
Mask {{255.255.255.240}}. Block size 256 minus 240 = 16. Multiples: 0, 16, 32, ..., 192, 208, 224. The value 200 is between 192 and 208.

\`\`\`
Network 10.20.30.192, hosts .193 to .206, broadcast 10.20.30.207, 14 usable.
\`\`\`

## Worked example 3: the interesting octet is the third
{{10.5.37.200/20}}. Mask {{255.255.240.0}}. The interesting octet is now the **third** (240). Block size 16 in the third octet. Multiples: 0, 16, 32, 48. The third octet value 37 is between 32 and 48.

\`\`\`
Network:    10.5.32.0        (third octet 32, fourth octet all zeros)
Broadcast:  10.5.47.255      (third octet one less than 48, fourth octet all ones)
Hosts:      10.5.32.1 to 10.5.47.254
\`\`\`

The fourth octet does not matter for finding the network when the third octet is interesting; it just runs from 0 to 255 inside the block.

## Counting hosts and subnets
- **Usable hosts** = 2 to the power of host bits, minus 2 (network and broadcast). A /27 leaves 5 host bits: 32 minus 2 = 30. A /26 leaves 6: 64 minus 2 = 62.
- **Subnets created** = 2 to the power of borrowed bits. Cut a /24 into /27s: you borrowed 3 bits, so 8 subnets, each with 30 hosts.
- **/30** has 2 usable hosts: perfect for the two ends of a router link. **/31** is allowed on point-to-point links with no broadcast, so both addresses are usable. **/32** is a single host.

## The question behind many troubleshooting questions
Two hosts can talk directly only if they are in the **same block**. A host's default gateway must be in its block too. Example: host {{192.168.1.100/27}} with gateway {{192.168.1.129}}. The host's block is 96 to 127. The gateway is in the next block. The host will never reach it, even though everything else looks fine. Most "cannot reach the gateway" puzzles are a host or gateway outside the block.

## What to memorize
- 256 minus the mask octet is the block. Networks at multiples of the block.
- Network is the multiple below you, broadcast is one before the next multiple.
- Hosts: 2 to the host bits, minus 2. Subnets: 2 to the borrowed bits.`,

u4l4: `## Working backward from a host count
Real design starts with "I need room for 50 hosts," not with a mask. The recipe:

1. Add 2 to the host count (for the network and broadcast addresses).
2. Round up to the next power of two.
3. The exponent is the number of host bits. Subtract it from 32 for the prefix.

\`\`\`
Hosts needed   +2    Next power of two   Host bits   Prefix   Usable
2              4     4                   2           /30      2
12             14    16                  4           /28      14
30             32    32                  5           /27      30
31             33    64                  6           /26      62
50             52    64                  6           /26      62
100            102   128                 7           /25      126
200            202   256                 8           /24      254
\`\`\`

Look at 30 versus 31. Thirty hosts fit a /27 exactly. Thirty-one hosts need 33 addresses, which does not fit in 32, so you must go up to a /26. Questions are built around this off-by-one.

## VLSM: different masks in the same network
Old-style subnetting cut a network into equal pieces. **Variable length subnet masking** cuts pieces of different sizes so nothing is wasted. Given {{192.168.10.0/24}} and these needs: a 100-host LAN, a 50-host LAN, a 20-host LAN, and two router links.

Allocate the **largest first**, so each block starts on a clean boundary:

\`\`\`
Need        Prefix   Assignment              Usable
100 hosts   /25      192.168.10.0/25         126   (.0 to .127)
50 hosts    /26      192.168.10.128/26       62    (.128 to .191)
20 hosts    /27      192.168.10.192/27       30    (.192 to .223)
link 1      /30      192.168.10.224/30       2     (.224 to .227)
link 2      /30      192.168.10.228/30       2     (.228 to .231)
left over            192.168.10.232 to .255
\`\`\`

## The alignment rule
A subnet must start on a multiple of its own block size. A /26 has block size 64, so it may start at .0, .64, .128, or .192. {{192.168.10.96/26}} is invalid: 96 is not a multiple of 64. Allocating largest first is what keeps everything aligned automatically.

## CIDR and supernetting
CIDR simply means the prefix can be any length; the old classes are ignored. Going the other way, combining several networks into one bigger advertised route is **supernetting** or **route summarization**. The four networks {{10.1.0.0/24}}, {{10.1.1.0/24}}, {{10.1.2.0/24}}, and {{10.1.3.0/24}} share their first 22 bits, so one route, {{10.1.0.0/22}}, covers all four. Fewer routes means smaller routing tables and faster routers.

## Sanity checks for any design
- Apply the mask to a host and to its gateway: they must produce the same network address.
- No two subnets may overlap.
- Leave room to grow. A 50-host LAN that will be 70 next year should get a /25 now.

## How the exam asks it
- "Most efficient mask for 30 hosts": /27. For 31 hosts: /26.
- "Which of these subnets is invalid": the one that does not start on its block boundary.
- "Summarize 172.16.4.0/24 through 172.16.7.0/24": 172.16.4.0/22.

## What to memorize
- Hosts plus 2, round up to a power of two, that is the host bits.
- Largest subnets first. Blocks start on their own multiples.`,

u4l5: `## Why IPv6 looks the way it does
IPv4 has about 4.3 billion addresses and the world has many more devices than that. IPv6 uses **128 bits**, enough to give every grain of sand its own network. Because 128 bits is far too long to write in decimal, it is written in **hexadecimal**: eight groups of four hex digits, separated by colons.

\`\`\`
2001:0db8:0000:0000:0000:ff00:0042:8329
\`\`\`

## Shortening: two rules
1. Drop leading zeros inside each group. {{0db8}} becomes {{db8}}, {{0000}} becomes {{0}}, {{0042}} becomes {{42}}.
2. Replace **one** run of consecutive all-zero groups with {{::}}. Only once per address, or nobody could tell how many groups were removed.

\`\`\`
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329          after rule 1
2001:db8::ff00:42:8329               after rule 2
\`\`\`

## Network and host, IPv6 style
The prefix works like CIDR: {{2001:db8:1:2::/64}} means the first 64 bits are the network. A normal LAN is always a **/64**: 64 bits of network, 64 bits of **interface identifier** (the host part). Nobody counts hosts in IPv6 subnets; every /64 has more addresses than the entire IPv4 internet.

## Address types by prefix
\`\`\`
Starts with        Type              Meaning
2 or 3 (2000::/3)  global unicast    routable on the internet
fe80::/10          link-local        automatic on every interface, never routed
fc00::/7 (fd..)    unique local      private, like RFC 1918
ff00::/8           multicast         ff02::1 all nodes, ff02::2 all routers
::1                loopback          this host
\`\`\`

The one that surprises people: **every IPv6 interface always has a link-local fe80 address**, whether or not it has anything else. It is used to talk to the router and neighbors on the local link only. Seeing fe80 tells you nothing about internet connectivity. IPv4's APIPA appears only when DHCP fails; IPv6's link-local is always there.

There is no broadcast. Multicast does the job: {{ff02::1}} reaches all nodes on the link.

## How a host gets its address
- **SLAAC** (stateless address autoconfiguration). The router periodically sends a **router advertisement** containing the /64 prefix. The host takes the prefix and builds its own interface ID. No server needed.
- **EUI-64** is one way to build that ID from the MAC address: split the 48-bit MAC in half, insert {{ff:fe}} in the middle, and flip the seventh bit of the first byte.

\`\`\`
MAC:       00:1A:2B:3C:4D:5E
split:     00:1A:2B  |  3C:4D:5E
insert:    00:1A:2B:FF:FE:3C:4D:5E
flip bit:  02:1A:2B:FF:FE:3C:4D:5E     (00 becomes 02)
result:    021a:2bff:fe3c:4d5e
\`\`\`

Modern systems usually generate a random interface ID instead, for privacy, but the exam still expects you to recognize EUI-64.
- **DHCPv6** works like IPv4 DHCP. **Stateful** DHCPv6 hands out addresses. **Stateless** DHCPv6 hands out only extras, such as DNS servers, while SLAAC provides the address.

## NDP replaces ARP
IPv4 uses ARP broadcasts to find a neighbor's MAC address. IPv6 uses the **Neighbor Discovery Protocol** over ICMPv6 multicast: a **neighbor solicitation** asks, a **neighbor advertisement** answers. NDP also delivers router advertisements and detects duplicate addresses.

## How the exam asks it
- "Hosts build their own address from information the router sends": SLAAC.
- "An address starting fe80": link-local, local link only.
- "Which replaces ARP in IPv6": NDP.
- "Shorten 2001:0db8:0000:0000:0001:0000:0000:0001": 2001:db8::1:0:0:1 or 2001:db8:0:0:1::1 (only one :: allowed).

## What to memorize
- 128 bits, hex, /64 LANs. 2000::/3 global, fe80 link-local, fd unique local, ff multicast, ::1 loopback.
- SLAAC builds from the router advertisement. EUI-64: insert ff:fe, flip the seventh bit.`,

u4l6: `## The problem
IPv4 and IPv6 do not understand each other. A packet is one or the other. Since the whole internet cannot switch on the same day, three strategies let the two live together.

## Strategy 1: dual stack
Every host and router runs both protocols at once and uses whichever the destination supports. This is the simplest and most common. The price is doing everything twice: two address plans, two sets of firewall rules, two routing tables.

\`\`\`
[Host]  IPv4 --------\\            /-------- IPv4 [Server]
        IPv6 ---------[ network ]----------- IPv6
\`\`\`

## Strategy 2: tunneling
Two IPv6 islands are separated by a network that only speaks IPv4. Wrap each IPv6 packet inside an IPv4 packet, carry it across, unwrap it on the far side. The IPv4 network never knows there was IPv6 inside.

\`\`\`
[IPv6 site A] --[tunnel endpoint]== IPv4 only ==[tunnel endpoint]-- [IPv6 site B]
                 v6 packet inside a v4 packet
\`\`\`

Names you may see: **6to4**, **ISATAP**, **Teredo**, and plain **GRE** tunnels. Tunneling adds a header, which lowers the usable MTU. Important: a tunnel **connects** IPv6 to IPv6 across IPv4. It does not translate anything.

## Strategy 3: translation with NAT64
A mobile carrier gives phones IPv6 only. The phone wants a website that only has an IPv4 address. Nothing can connect them directly, so a **NAT64** gateway rewrites the packets from one protocol to the other. It pairs with **DNS64**: when the phone looks up the site and finds only an IPv4 record, DNS64 invents an IPv6 record that points at the NAT64 gateway, so the phone knows where to send its IPv6 traffic.

\`\`\`
[IPv6-only phone] --v6--> [NAT64] --v4--> [IPv4-only website]
DNS64 makes up the AAAA record that points at the NAT64
\`\`\`

## Choosing between them
\`\`\`
Situation                                          Answer
Both sides can run both protocols                  dual stack
Two IPv6 sites, IPv4-only transit between them     tunneling
IPv6-only clients need IPv4-only services          NAT64 with DNS64
\`\`\`

The words in the question give it away: "run both" is dual stack, "encapsulate" or "across an IPv4 network" is a tunnel, "translate" is NAT64.

## Why any of this exists
IPv4 ran out. Providers stretched it with **carrier-grade NAT**, sharing one public IPv4 address among many customers, which breaks anything that needs an inbound connection. Native IPv6 removes the need for NAT entirely, which is the long-term destination.

## What to memorize
- Dual stack runs both. Tunnels carry v6 inside v4 (6to4, ISATAP, Teredo, GRE). NAT64 and DNS64 translate for v6-only hosts.`,

u5l1: `## Reliable or fast: pick one
Layer 4 offers two ways to move data, and every application picks the one that matches what it can tolerate.

## TCP: the phone call
Before any data moves, the two sides set up the connection with the **three-way handshake**:

\`\`\`
Client                          Server
  | ---- SYN  (can we talk?) ---> |
  | <--- SYN-ACK (yes, you?) ---- |
  | ---- ACK  (yes) ------------> |
  |   data flows, every segment numbered and acknowledged
  | ---- FIN ... ACK ----------->  |   polite close
  | ---- RST ------------------->  |   abrupt abort
\`\`\`

Every segment carries a sequence number. The receiver acknowledges what it got. Anything not acknowledged in time is sent again, so nothing is lost and everything arrives in order. The receiver also advertises a **window**: how much it can accept right now. That is **flow control**, which stops a fast sender from drowning a slow receiver.

Web pages, email, file transfers, and remote shells all use TCP because a single missing byte would corrupt the result.

## UDP: the postcard
No handshake, no acknowledgments, no ordering, no retransmission. Each **datagram** is sent and forgotten. That makes UDP fast and light. Voice and video use it because a packet that arrives late is useless anyway; better to skip it and keep going. DNS, DHCP, SNMP, TFTP, and syslog use it because their messages are tiny and the application can simply ask again.

\`\`\`
                  TCP                     UDP
setup             three-way handshake     none
reliability       acknowledged, resent    none
ordering          yes                     no
overhead          higher                  minimal
used by           HTTP, SMTP, FTP, SSH    voice, video, DNS, DHCP, SNMP
unit              segment                 datagram
\`\`\`

## The rest of the IP family
Some protocols ride directly on IP with no TCP or UDP at all.
- **ICMP** carries control and error messages. Ping is an ICMP **echo request** and **echo reply**. Traceroute works because routers send back **time exceeded** when the TTL hits zero. **Destination unreachable** tells you a route or port does not exist.
- **GRE** is a generic tunnel: it wraps one packet inside another so it can cross a network that would not otherwise carry it. No encryption.
- **IPsec** builds encrypted tunnels. It has two pieces: **AH** (authentication header) proves who sent the packet and that it was not altered, but hides nothing. **ESP** (encapsulating security payload) does that and also encrypts the contents. **IKE** (internet key exchange) negotiates the keys first, over UDP port 500.
- IPsec runs in **transport mode**, encrypting just the payload between two hosts, or **tunnel mode**, wrapping the whole original packet, which is what site-to-site VPNs use.

## How the exam asks it
- "Reliable, ordered, acknowledged delivery": TCP.
- "Low overhead, real time, tolerates loss": UDP.
- "Which IPsec component provides confidentiality": ESP. AH alone gives none.
- "Tunnel protocol with no encryption": GRE.
- "Ping uses": ICMP echo request and reply.

## What to memorize
- SYN, SYN-ACK, ACK. TCP reliable, UDP fast.
- ICMP for ping and traceroute. GRE tunnels without encryption. ESP encrypts, AH only authenticates. IKE on UDP 500.`,

u5l2: `## Why ports matter
A server runs many services on one IP address. The port number says which one you want. The exam expects the common ports from memory, and the fastest way to learn them is in groups with a story, not as a flat list.

## Group 1: remote access and file transfer
\`\`\`
20, 21   FTP        20 carries data, 21 carries commands. Plaintext.
22       SSH        encrypted shell. SFTP and SCP ride on it too.
23       Telnet     plaintext shell. Replace with SSH (23 to 22, one step down).
69       TFTP       UDP, no login. Firmware and config files. "Trivial."
3389     RDP        Remote Desktop.
445      SMB        Windows file and printer sharing.
\`\`\`

## Group 2: email
\`\`\`
25       SMTP       mail server to mail server
587      SMTPS      mail client to server with TLS (submission)
110      POP3       download mail;    995 POP3S
143      IMAP       sync mail;        993 IMAPS
\`\`\`

Memory hook: the secure versions of POP3 and IMAP are both in the 990s, and IMAP's is the one that is not 995.

## Group 3: web and directory
\`\`\`
80       HTTP       443 HTTPS
389      LDAP       636 LDAPS
\`\`\`

## Group 4: infrastructure
\`\`\`
53       DNS        UDP for queries, TCP for zone transfers and big answers
67, 68   DHCP       UDP. 67 is the server, 68 is the client.
123      NTP        UDP. Time.
161, 162 SNMP       UDP. 161 the manager polls the agent; 162 the agent sends traps to the manager.
514      Syslog     UDP. Logs to a collector.
500      IKE        UDP. IPsec key exchange.
1433     SQL Server 3306 MySQL
5060     SIP        5061 with TLS. Voice and video call setup.
\`\`\`

## The encrypted pairs
Questions often ask for "the secure alternative." Learn these as pairs:

\`\`\`
HTTP 80      ->  HTTPS 443
Telnet 23    ->  SSH 22
FTP 21       ->  SFTP 22
LDAP 389     ->  LDAPS 636
IMAP 143     ->  IMAPS 993
POP3 110     ->  POP3S 995
SMTP 25      ->  SMTPS 587
\`\`\`

## The two-number traps
Several services use two ports, and the exam tests which is which:
- **DHCP 67 and 68**: the server listens on 67, the client on 68.
- **SNMP 161 and 162**: 161 is where the device answers polls; 162 is where the monitoring server receives traps. "Allow the monitoring server to receive alerts" means 162.
- **FTP 20 and 21**: 21 is the control connection you log in on; 20 carries the data.
- **DNS 53 UDP and TCP**: everyday lookups are UDP; zone transfers between servers are TCP.

## Port ranges
Ports 0 to 1023 are **well-known** (the services above). 1024 to 49151 are **registered** for specific applications. 49152 to 65535 are **dynamic** or ephemeral: the random source ports your computer picks for each outgoing connection.

## A self-test
Cover the right column and say the port: SSH, RDP, DNS, NTP, LDAPS, SMB, syslog, SNMP traps, SMTP submission, HTTPS. Then cover the left column and go the other way. Do it until it takes ten seconds.

## What to memorize
- 22 SSH, 23 Telnet, 25/587 mail out, 53 DNS, 67/68 DHCP, 80/443 web, 110/995 and 143/993 mail in, 123 NTP, 161/162 SNMP, 389/636 LDAP, 445 SMB, 514 syslog, 1433 SQL, 3389 RDP, 5060/5061 SIP.`,

u5l3: `## What DHCP is for
Every device needs an IP address, a mask, a gateway, and DNS servers. Typing those into a thousand laptops is impossible, so a DHCP server hands them out automatically for a limited time.

## The conversation: DORA
A new laptop knows nothing, not even its own address. So it shouts.

\`\`\`
Client (0.0.0.0)                           DHCP server
  | -- DISCOVER: any DHCP servers out there? -->  broadcast to 255.255.255.255, UDP 67
  | <-- OFFER: you can have 192.168.1.50 ----------
  | -- REQUEST: I'll take 192.168.1.50 ---------->  broadcast, so other servers withdraw their offers
  | <-- ACK: it's yours for 8 hours, here are gateway and DNS
\`\`\`

Discover, Offer, Request, Acknowledge. The client sends from port 68, the server listens on 67.

## What the administrator configures
Think of a **scope** as the pool of addresses for one subnet.

\`\`\`
Subnet 192.168.1.0/24
  scope:        192.168.1.100 to 192.168.1.200     what the server may hand out
  exclusion:    192.168.1.150                       never lease this (a printer set by hand)
  reservation:  MAC 00:1A:2B:3C:4D:5E always gets 192.168.1.120
  lease:        8 hours
  options:      3 = gateway 192.168.1.1, 6 = DNS 192.168.1.10
\`\`\`

- **Exclusion**: a hole in the scope for addresses that are already used statically.
- **Reservation**: a specific MAC always receives a specific address. The device still uses DHCP, so it is managed centrally, but its address never changes. This is the right answer for "a server or printer needs the same address every time."
- **Lease time**: how long the client keeps the address. The client tries to **renew at 50 percent** of the lease. Short leases suit guest networks with churn; long leases suit stable offices.
- **Options**: extra settings sent with the lease. Option 3 is the default gateway, 6 is DNS servers, 15 the domain name, 42 NTP, and 66 or 150 point IP phones at their provisioning server.

## Crossing a router: relay and IP helper
Discover is a broadcast, and routers do not forward broadcasts. So a DHCP server on one subnet cannot hear clients on another. The fix is a **DHCP relay** (Cisco calls it an **IP helper address**) on the router interface facing the clients:

\`\`\`
[Client] --broadcast--> [Router with ip helper 10.0.0.5] --unicast--> [DHCP server 10.0.0.5]
\`\`\`

The router converts the broadcast to a unicast aimed at the server and stamps in the address of the interface it arrived on, so the server knows which scope to answer from. One central server can then serve every subnet.

## When it breaks
- **Scope exhaustion**: every address is leased. New clients get no offer and fall back to **169.254.x.x**. Widen the scope or shorten the lease.
- **Rogue DHCP server**: someone plugs in a home router. It answers Discover faster than the real server and hands out its own gateway and DNS. Clients get "wrong" settings from an unknown server address. Defense: **DHCP snooping** on the switches, which only allows offers from trusted ports.
- **Missing relay**: clients on a remote subnet never get an answer while local clients are fine.

## How the exam asks it
- "Same address every time, managed centrally": reservation.
- "Clients on the second floor get APIPA, first floor is fine": missing relay on that floor's router interface.
- "Clients receive a gateway address nobody configured": rogue DHCP.
- "Which option delivers the default gateway": 3. DNS servers: 6.

## What to memorize
- Discover, Offer, Request, Acknowledge. UDP 67 server, 68 client.
- Scope is the pool, exclusion removes, reservation pins to a MAC, relay crosses routers.
- Renew at 50 percent. Option 3 gateway, 6 DNS.`,

u5l4: `## What DNS is for
People use names. Networks use numbers. DNS turns {{www.example.com}} into an address. When it breaks, users say "the internet is down," because nothing they type resolves.

## How a lookup actually happens
Think of a phone tree where nobody knows every number, but everyone knows who to ask next.

\`\`\`
1. Your PC asks its resolver: "www.example.com?"
2. Resolver has no cached answer, so it asks a ROOT server.
   Root: "I don't know, but the .com servers do."
3. Resolver asks a .com (TLD) server.
   TLD: "Ask example.com's own name servers."
4. Resolver asks example.com's AUTHORITATIVE server.
   Authoritative: "www is 93.184.216.34."
5. Resolver caches it for the record's TTL and answers your PC.
\`\`\`

The **recursive resolver** does all the legwork on your behalf (your router, your ISP, or a public resolver). The **authoritative** server is the one that actually holds the records. An answer served from cache is **non-authoritative**, and it expires after the record's **TTL**.

## Record types, with the sentence each one answers
\`\`\`
A       "What is the IPv4 address for this name?"
AAAA    "What is the IPv6 address for this name?"
CNAME   "This name is an alias; go look up that other name."
MX      "Where should email for this domain be delivered?"  (with a priority)
NS      "Which servers are authoritative for this zone?"
SOA     "Who owns this zone, and what are its serial number and timers?"
PTR     "What name belongs to this IP address?"  (reverse lookup)
TXT     "Here is some text": SPF, DKIM, DMARC, domain ownership proof
SRV     "Where is the server for this service?"  (name, port, priority: SIP, Active Directory)
\`\`\`

## Zones and servers
A **forward zone** holds name-to-address records. A **reverse zone** holds address-to-name PTR records, under the special domain {{in-addr.arpa}}. The **primary** server holds the writable copy; **secondary** servers pull copies with a **zone transfer**, which is one of the times DNS uses TCP 53 instead of UDP.

## Securing DNS: two different problems
- Is the answer genuine? **DNSSEC** signs records so a resolver can verify nobody forged them. It provides integrity. Anyone can still read the query.
- Can someone watch or change my query in transit? **DNS over TLS** (TCP 853) and **DNS over HTTPS** (443) encrypt the conversation between your device and the resolver. They provide privacy.

## The hosts file
Every computer checks a local text file before asking DNS. Handy for testing. Also a favorite target for malware: one poisoned line silently sends "yourbank.com" somewhere else.

## Troubleshooting pattern
- Can you ping the address but not the name? DNS.
- Check the client's DNS server setting first, then query the server directly with nslookup or dig, then check the record itself on the authoritative server.

## How the exam asks it
- "Email for the domain": MX. "Reverse lookup": PTR. "One name points to another": CNAME. "IPv6 address": AAAA. "SPF record": TXT.
- "Verify records were not forged": DNSSEC. "Hide queries from an on-path observer": DoH or DoT.
- "Ping by IP works, by name fails": DNS.

## What to memorize
- A and AAAA addresses, CNAME alias, MX mail, NS servers, PTR reverse, TXT text, SRV service.
- DNSSEC integrity, DoT 853 and DoH 443 privacy. Zone transfers on TCP 53.`,

u5l5: `## Why clocks matter more than they seem
Every log line has a timestamp. Every certificate has an expiry. Every Kerberos ticket has a lifetime. Every one-time MFA code depends on the minute. If two devices disagree about the time, logs cannot be lined up, logins fail, and certificates look expired. Time is infrastructure.

## NTP: good enough for almost everything
**Network Time Protocol** runs on UDP 123 and keeps clocks within milliseconds. Accuracy is described by **stratum**, which is just how many hops you are from a real clock:

\`\`\`
stratum 0   a reference clock: GPS receiver, atomic clock  (not on the network)
stratum 1   a server wired directly to a stratum 0 clock
stratum 2   a server that syncs from stratum 1
stratum 3   syncs from stratum 2 ... and so on
\`\`\`

Lower is closer to truth. Best practice: point every device at the same internal NTP source so they all agree with each other, even if they are all slightly off from the world.

## PTP: when milliseconds are not enough
**Precision Time Protocol** (IEEE 1588) gets to sub-microsecond accuracy by timestamping in hardware at the network card, not in software. Financial trading, industrial control, and broadcast video need it. If the question says "microseconds," the answer is PTP.

## NTS: securing time
NTP was designed with no security, so an attacker who feeds false time can expire certificates or replay tickets. **Network Time Security** adds authentication and encryption to NTP so clients only accept time from a verified server.

## SLAAC as a service
On IPv6 networks, the router's advertisements are themselves a network service: they hand out the prefix, the gateway, and optionally DNS servers, which is much of what DHCP does for IPv4.

## The rule that comes up constantly
**Kerberos rejects authentication when the client and server clocks differ by more than five minutes.** So "users suddenly cannot log in to the domain" after a device's clock drifted is an NTP problem, not a password problem.

## How the exam asks it
- "Logs from several devices cannot be correlated": NTP.
- "Authentication fails after a clock drift": NTP, the five-minute rule.
- "Sub-microsecond synchronization": PTP.
- "Time synchronization must be authenticated": NTS.

## What to memorize
- NTP UDP 123, stratum counts hops from a reference clock, lower is better.
- PTP for microseconds, NTS to secure NTP. Kerberos breaks past five minutes of skew.`,

u6l1: `## A switch has three jobs
Learn addresses, forward frames, and avoid loops. Watch the first two in slow motion with four PCs and a brand-new switch whose MAC table is empty.

\`\`\`
         port 1   port 2   port 3   port 4
           |        |        |        |
          PC A     PC B     PC C     PC D
\`\`\`

## Job 1: learning
PC A sends a frame to PC C. The switch looks at the **source** MAC (A) and the port it came in on (1), and writes that down: "A lives on port 1." It learns from every frame it sees. Entries age out after a few minutes of silence.

## Job 2: forward or flood
Now the switch looks at the **destination** MAC (C). Is C in the table? Not yet, the table only knows A. So the switch **floods**: it sends the frame out every port except the one it came in on (ports 2, 3, 4). PC C answers, and now the switch learns "C lives on port 3." From then on, frames for C go out port 3 only. Frames for B and D never reach the wrong PC.

Three cases always flood: an unknown destination MAC, a **broadcast** (all ones), and a multicast the switch has not been told about.

## Job 3: loop avoidance
Frames have no time-to-live counter. If two switches are connected by two cables, a broadcast circles forever and multiplies. Spanning Tree Protocol blocks the extra path. It has its own lesson.

## Collision domains and broadcast domains
- A **collision domain** is the set of devices that could talk over each other. Each switch port is its own collision domain, and with full duplex there are no collisions at all. A hub is one big collision domain because it repeats everything to everyone.
- A **broadcast domain** is how far a broadcast reaches. All ports in one VLAN are one broadcast domain. Only a router (or a Layer 3 switch routing between VLANs) stops a broadcast.

\`\`\`
Count them: 2 hubs and 1 switch with 12 ports, all in one VLAN, behind 1 router
  collision domains: 12 (one per switch port; each hub is one domain hanging off a port)
  broadcast domains: 1  (one VLAN, one router interface)
\`\`\`

## Kinds of switches
- **Unmanaged**: plug it in, it works, no settings, no VLANs. Home and small office.
- **Managed**: VLANs, spanning tree, port security, monitoring, PoE control.
- **Layer 3 switch**: a managed switch that also routes between VLANs in hardware, so traffic between VLANs never has to leave the box.

## Reaching the switch to manage it
- **In-band**: over the network itself, through a **management IP** on a VLAN interface, using SSH or a web page. Convenient, but if the network is down you cannot reach it.
- **Out-of-band**: through the **console port** with a cable, or a separate management network. Works when everything else is broken.

## How the exam asks it
- "The switch sent the frame out every port": unknown destination or broadcast.
- "How many collision domains": one per switch port.
- "Route between VLANs without a separate router": Layer 3 switch.
- "Manage the switch when the network is down": console port, out-of-band.

## What to memorize
- Learn source MACs, forward known destinations, flood unknowns and broadcasts, block loops with STP.
- Switch port = collision domain. VLAN = broadcast domain. Router separates broadcast domains.`,

u6l2: `## One switch, several invisible switches
A **VLAN** slices one physical switch into separate logical switches. Ports in VLAN 10 can talk to each other; ports in VLAN 20 can talk to each other; VLAN 10 and VLAN 20 cannot talk without a router. Each VLAN is its own broadcast domain and normally its own IP subnet.

\`\`\`
One 8-port switch:
ports 1-4  VLAN 10 (Sales)        192.168.10.0/24
ports 5-8  VLAN 20 (Engineering)  192.168.20.0/24
It behaves like two separate switches in one box.
\`\`\`

Why bother? Group people by role instead of by which floor they sit on. Contain broadcast traffic. Keep guests, phones, cameras, and servers apart for security.

## Access ports and trunk ports
- An **access port** belongs to one VLAN. The device plugged in has no idea VLANs exist; frames arrive and leave **untagged**. If someone puts a port in the wrong VLAN, the PC lands on the wrong subnet: it gets a DHCP address from the wrong scope and cannot reach its servers.
- A **trunk port** carries **many** VLANs over one cable, between switches or up to a router. So the far end knows which VLAN each frame belongs to, the switch inserts an **802.1Q tag**, a 4-byte field in the Ethernet header holding the VLAN ID (1 to 4094).

\`\`\`
[Switch A] ==== trunk (802.1Q tagged, VLANs 10, 20, 30) ==== [Switch B]
   |  |  |                                                     |  |  |
 access ports (untagged, one VLAN each)                    access ports
\`\`\`

## The native VLAN
One VLAN on a trunk is allowed to cross **untagged**: the **native VLAN**, VLAN 1 by default. Both ends must agree on which VLAN that is. If switch A thinks untagged frames are VLAN 1 and switch B thinks they are VLAN 99, untagged traffic silently lands in the wrong VLAN. Switches log a "native VLAN mismatch" error. Best practice is to set the native VLAN to an unused number on both ends.

## Special-purpose VLANs
- **Voice VLAN**: an access port can carry a second VLAN just for an IP phone. The phone tags its own traffic into the voice VLAN; the PC plugged into the back of the phone stays untagged in the data VLAN. QoS can then prioritize voice.
- **Management VLAN**: where the switches' own management addresses live, kept away from user traffic.
- **VLAN 1** exists by default and cannot be deleted, which is exactly why you should not use it for anything important.

## Getting between VLANs
Hosts in different VLANs need a router. Two designs:
- A **Layer 3 switch** with an **SVI** (switch virtual interface) per VLAN. {{interface vlan 10}} gets the address 192.168.10.1 and becomes the gateway for VLAN 10. Routing happens inside the switch.
- **Router on a stick**: one trunk cable to a router, and on the router one **subinterface** per VLAN, each tagged and addressed. Traffic goes up the stick, gets routed, comes back down.

\`\`\`
[Switch] ==== trunk ==== [Router]
                           g0/0.10  VLAN 10  192.168.10.1
                           g0/0.20  VLAN 20  192.168.20.1
\`\`\`

## When trunks misbehave
- **Native VLAN mismatch**: log errors, untagged traffic in the wrong VLAN.
- **Allowed VLAN list** missing a VLAN: hosts in that VLAN cannot reach the other switch, everyone else is fine.
- One end **access**, the other **trunk**: only the access port's VLAN passes.

## How the exam asks it
- "One link carries several VLANs": 802.1Q trunk.
- "Phone and PC share one port": voice VLAN.
- "Moved desks, now on the wrong subnet": access port in the wrong VLAN.
- "Untagged frames end up in the wrong VLAN": native VLAN mismatch.
- "Route between VLANs on the switch itself": SVI on a Layer 3 switch.

## What to memorize
- Access port: one VLAN, untagged. Trunk: many VLANs, 802.1Q tags. Native VLAN rides untagged and must match.
- SVI or router on a stick with subinterfaces routes between VLANs.`,

u6l3: `## What happens without spanning tree
Two switches, two cables between them for redundancy. A PC sends a broadcast. Switch A floods it out both cables to switch B. Switch B receives it twice, and floods each copy out every port, including the two cables back to A. A gets four copies and floods them... Within seconds the network is nothing but copies of that one broadcast. Frames have no TTL, so this never stops on its own.

The symptoms are unmistakable: a **broadcast storm**, switch CPU at 100 percent, MAC addresses **flapping** between ports (the same PC seems to be on both cables), and every user complaining at once, usually right after someone plugged in "a backup cable."

## How STP fixes it
**Spanning Tree Protocol** (802.1D) lets the redundant cable exist but refuses to use it until it is needed.

1. Switches exchange **BPDUs** (bridge protocol data units), small hello messages.
2. The switch with the lowest **bridge ID** becomes the **root bridge**. Bridge ID is priority first, then MAC address. Set a low priority on your core switch so the root is not a random closet switch with a low MAC.
3. Every other switch works out its cheapest path to the root. The port on that path is its **root port**.
4. On each link, one end becomes the **designated port**, the one that forwards toward the rest of the tree.
5. Any port left over that would create a loop is **blocked**: it still listens for BPDUs, but forwards nothing.

\`\`\`
              [Root: core, priority 4096]
              RP: none (it is the root)
             /                     \\
     designated                  designated
           /                         \\
   [Switch B]  ----- link ----- [Switch C]
     RP up            ^            RP up
                blocked on one end
\`\`\`

If a link fails, the blocked port wakes up and the tree **reconverges**.

## Port states and why the old version was slow
Classic STP walks a port through **blocking, listening, learning, forwarding**, and the walk takes 30 to 50 seconds. That is why a PC used to wait a long time for link after plugging in.

**Rapid Spanning Tree** (RSTP, 802.1w) simplifies the states to **discarding, learning, forwarding**, adds **alternate** and **backup** port roles that are pre-computed, and converges in a few seconds. **MSTP** (802.1s) runs separate trees for groups of VLANs.

## Protecting the tree
- **PortFast**: skip listening and learning on ports that face PCs, so they forward immediately. Never on a switch-to-switch link.
- **BPDU guard**: if a BPDU shows up on a PortFast port, something that talks spanning tree (a rogue switch) was plugged in. Shut the port.
- **Root guard**: stop a switch downstream from ever claiming to be root.
- **Loop guard**: protect against a link that works in one direction only.

## How the exam asks it
- "Everything slowed to a crawl after a second cable was added between two switches": a loop; STP disabled or misconfigured.
- "Which switch becomes root": the one with the lowest bridge ID, meaning the lowest priority.
- "PCs take 45 seconds to get link": enable PortFast on access ports.
- "Prevent a user from plugging in their own switch": BPDU guard.
- "Faster convergence": RSTP.

## What to memorize
- Lowest bridge ID (priority, then MAC) is root. Root port toward root, designated per link, the rest blocked.
- STP 30 to 50 seconds; RSTP seconds. PortFast on host ports, BPDU guard with it.`,

u6l4: `## Speed and duplex, one more time
Auto-negotiation lets both ends agree on speed and full duplex. The failure everyone hits: one side is set by hand, the other is on auto. Auto-negotiation needs both sides to talk; with one side silent, the auto side gives up and drops to **half duplex**. Now one end sends whenever it likes and the other thinks they are taking turns. Result: **late collisions**, **CRC errors**, and a link that is up but crawls. Fix: same setting on both ends.

## Link aggregation: several cables, one logical link
Bundle two or four physical links between two switches and treat them as one. More bandwidth, and if one cable dies the bundle keeps working. **LACP** (802.3ad, now 802.1AX) negotiates the bundle so both ends agree; static mode skips negotiation. Every member link must match: speed, duplex, VLAN settings. One subtlety: traffic is split per **flow**, so a single large file copy still rides one cable; the gain is across many conversations.

## MTU and jumbo frames
Default Ethernet payload is 1500 bytes. **Jumbo frames** raise it to about 9000, so backups and storage traffic need fewer frames and less overhead. The rule: **every device in the path must agree**. If a switch in the middle is still at 1500, large frames are fragmented or silently dropped while small pings sail through. "Small pings work, large transfers fail" is the fingerprint.

## Power over Ethernet
The switch sends power down the same cable as data, so phones, access points, and cameras need no outlet.

\`\`\`
Standard         Name     At the switch port   Delivered to the device
802.3af          PoE      15.4 W               about 13 W
802.3at          PoE+     30 W                 about 25.5 W
802.3bt Type 3   PoE++    60 W                 about 51 W
802.3bt Type 4   PoE++    90 W                 about 71 W
\`\`\`

Two numbers because the cable loses some power along the way. Questions usually give the device's draw and ask for the minimum standard: 20 W needs at least 802.3at.

The other trap is the **power budget**. A 24-port switch might supply 30 W on any port but only 180 W in total. Plug in the seventh 30 W access point and the switch has nothing left. The last devices plugged in fail to boot, or reboot under load, even though "the port supports PoE+."

## Port mirroring
Switches only send frames to the port where the destination lives, so an analyzer plugged into a spare port sees nothing. A **SPAN** or mirror port copies traffic from chosen ports to the analyzer's port. That is how you capture on a switched network without a hardware tap. The mirror destination only receives; it does not forward normal traffic.

## Port security
Limit how many MAC addresses a port may learn, or pin one specific MAC to it. Plug in a hub or an unauthorized device and the port goes **error-disabled**: shut down until an administrator clears it. That is also the defense against MAC flooding.

## How the exam asks it
- "Access point draws 25 W": 802.3at at minimum.
- "Devices at the far end of the switch will not power on": budget exceeded.
- "Large transfers fail, small pings succeed": MTU mismatch.
- "Combine two links for bandwidth and redundancy": LACP.
- "Capture traffic from another port": SPAN or mirror.
- "Port shut down after an unknown device connected": port security, error-disabled.

## What to memorize
- af 15.4 W, at 30 W, bt 60 or 90 W. Budget is the total for the whole switch.
- Duplex mismatch gives late collisions. LACP bundles. Jumbo is 9000. Mirror to capture.`,

u6l5: `## Wi-Fi is Ethernet with radio problems
Everything about Wi-Fi comes down to shared airwaves: only one device can transmit on a channel at a time, other radios interfere, and walls absorb signal. Every design decision manages those three facts.

## The bands: a trade-off table
\`\`\`
Band      Range          Interference     Channels                    Speed
2.4 GHz   longest        heavy            3 clean ones: 1, 6, 11     lowest
5 GHz     shorter        light            many; 40/80/160 MHz bonding higher
6 GHz     shortest       almost none      huge, Wi-Fi 6E only        highest
\`\`\`

Why only 1, 6, and 11 at 2.4 GHz? The channels are spaced 5 MHz apart but each one is 20 MHz wide, so neighboring channels overlap. Channels 1, 6, and 11 are the only set far enough apart not to step on each other. Three access points near each other should use exactly those three. Put two on channel 6 and they take turns, halving throughput even with full signal bars.

**Channel width**: wider channels (40, 80, 160 MHz) carry more data but overlap more neighbors and pick up more noise. Use 20 MHz where it is crowded, wider where it is quiet. Some 5 GHz channels are **DFS** channels that must yield if radar is detected.

## The standards, in order
\`\`\`
Standard    Name         Band          Top rate        New idea
802.11a                  5 GHz         54 Mbps
802.11b                  2.4 GHz       11 Mbps
802.11g                  2.4 GHz       54 Mbps
802.11n     Wi-Fi 4      2.4 and 5     600 Mbps        MIMO (several antennas)
802.11ac    Wi-Fi 5      5 only        gigabit class   MU-MIMO, wide channels
802.11ax    Wi-Fi 6/6E   2.4, 5, 6     about 9.6 Gbps  OFDMA (efficient in crowds)
802.11be    Wi-Fi 7      2.4, 5, 6     tens of Gbps    320 MHz channels, multi-link
\`\`\`

## Names: SSID, BSSID, ESSID
- **SSID**: the network name a user picks from the list.
- **BSSID**: the MAC address of one radio on one access point. Two APs with the same SSID have different BSSIDs.
- **ESSID**: the same SSID shared across several APs so a client can **roam** from one to the next without reconnecting.

\`\`\`
SSID "Office"
  AP 1 radio  BSSID aa:bb:cc:00:00:01   \\
  AP 2 radio  BSSID aa:bb:cc:00:00:02    > one ESSID, clients roam between them
  AP 3 radio  BSSID aa:bb:cc:00:00:03   /
\`\`\`

## Network shapes
- **Infrastructure**: clients talk through an access point. Normal.
- **Ad hoc** (IBSS): devices talk directly, no AP.
- **Mesh**: APs link to each other wirelessly to cover places where running cable is impractical.
- **Point-to-point**: two directional antennas linking two buildings.

## Antennas and how APs are managed
**Omnidirectional** antennas radiate in every direction: general coverage. **Directional** antennas (Yagi, patch, parabolic dish) focus the energy: long links, or covering a long hallway without spilling into the parking lot. **Autonomous** APs are configured one by one. **Lightweight** APs get their configuration from a **wireless LAN controller**, which also coordinates channels, power, and roaming across the whole building.

## How the exam asks it
- "Three APs on channel 6, throughput poor, signal strong": co-channel interference; use 1, 6, 11.
- "Link two buildings a mile apart": directional antennas, point-to-point.
- "Clients drop when walking between APs": roaming; same SSID and security on every AP, enough overlap.
- "Manage 200 APs from one place": wireless LAN controller.
- "Only standard that runs on 6 GHz": Wi-Fi 6E (802.11ax) and later.

## What to memorize
- 2.4 GHz: 1, 6, 11, long range, crowded. 5 GHz: more channels, bonding, DFS. 6 GHz: Wi-Fi 6E.
- SSID name, BSSID radio MAC, ESSID for roaming.`,

u6l6: `## The security story in four generations
\`\`\`
WEP     broken in minutes            never use
WPA     a patch using TKIP           deprecated
WPA2    AES with CCMP                still common, acceptable
WPA3    SAE, stronger everything     current standard
\`\`\`

The WPA3 detail that matters: **SAE** (simultaneous authentication of equals) replaces the old pre-shared key handshake. With WPA2, an attacker could record the handshake and crack the password offline at leisure. SAE makes each attempt require a live exchange, so offline cracking does not work. WPA3-Enterprise adds an optional 192-bit mode.

## Personal versus Enterprise: the real decision
- **Personal (PSK)**: one passphrase for everyone. Fine at home. In a company, when one person leaves, you must change the passphrase on every device.
- **Enterprise**: **802.1X**. Each user or device authenticates with its own credentials or certificate against a **RADIUS** server.

\`\`\`
[Laptop] --802.1X--> [Access point] --RADIUS--> [RADIUS server, checks the directory]
                       (the gatekeeper)          (the decision maker)
\`\`\`

Revoke one account and only that person loses access. The RADIUS server can even tell the AP which VLAN to place each user in. Whenever a question wants per-user authentication, individual revocation, or "the strongest option available," the answer is Enterprise with RADIUS.

## Guests and captive portals
Give visitors their own **SSID** mapped to an isolated VLAN with internet access only. A **captive portal** grabs the first web request and shows a page: accept the terms, enter a code, or log in, before traffic is allowed through. Coffee shops and hotels.

## Design: coverage and capacity
- A **site survey** measures signal, noise, and interference across the floor plan, before and after installation. Its output is a **heat map**.
- Neighboring cells should overlap by about **15 to 20 percent** so a walking client can hand off to the next AP before losing the old one.
- **Band steering** nudges clients that support 5 GHz off the crowded 2.4 GHz band.
- Mount APs centrally, away from metal and microwaves, on non-overlapping channels.
- Clients that **disassociate** or **roam** badly usually point to too little overlap, mismatched security between APs, or transmit power set so high that clients cling to a distant AP.

## Things that are not security
Hiding the SSID and filtering by MAC address stop only the casual. A free tool shows hidden networks in seconds, and MAC addresses are trivially cloned. Call them hardening at most; never accept them as a substitute for WPA2 or WPA3.

## How the exam asks it
- "Each employee logs in with their own credentials": WPA2 or WPA3 Enterprise, 802.1X, RADIUS.
- "Strongest security for a home network": WPA3 Personal with SAE.
- "Visitors must accept terms before browsing": captive portal.
- "Measure coverage before deploying APs": site survey, heat map.
- "Prevent offline password cracking": WPA3 SAE.

## What to memorize
- WEP dead, WPA deprecated, WPA2 AES, WPA3 SAE. Enterprise means 802.1X plus RADIUS.
- Survey makes a heat map. Overlap 15 to 20 percent. Hidden SSID and MAC filtering are not security.`

});
