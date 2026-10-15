# CompTIA PBQs Plan B: forty PBQs across the four CompTIA courses

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `courses/<id>/pbqs.js` for NetPlus (N10-009), SecPlus (SY0-701), APlus Core 1 (220-1201), and APlus Core 2 (220-1202): ten interactive PBQs each, three marked for the static page, the manifest additions, the shell loaders, the catalog links, the build, and a local stage.

**Architecture:** Pure content on the engine Plan A shipped (`docs/superpowers/plans/2026-10-14-comptia-pbqs-engine.md`): `FRA.pbqs` entries with the six task kinds, graded by `FRAPbq`, rendered by the PBQs tab and the static `/<id>/pbq/` page. Each course's `pbqs.js` is one file; the manifest gains `test.pbqInTest` and `seo.pbqPhrases`; each shell loads the new file.

**Tech Stack:** Vanilla JS data files, `npm test` (the self-test validates PBQs), `python build.py`, `node site/build-site.js`, `scripts/stage.sh`.

Spec: `docs/superpowers/specs/2026-10-14-comptia-pbqs-design.md` (section 4 lists the forty).

## Global Constraints

- A `multiselect` task whose options are log lines, configuration lines, or command output carries `shuffle: false` (the engine then keeps the options in pack order); every other task leaves `shuffle` unset (added 2026-10-14 after the engine's Task 4 review).

- Data shape (verbatim from the engine plan): `FRA.pbqs["<id>"] = { id, title, domain, lesson, seo, scenario: { text, svg?, log? }, tasks: [...], why: { taskId: "..." } }`; three to six tasks per PBQ; every task id has a `why`; `expect` indexes refer to the arrays as written. Kinds and answer shapes: `order` (`items`, `expect` = correct index sequence), `match` (`left`, `right`, `expect[i]` = right index for left i; `right` may carry distractor slots), `multiselect` (`options`, `expect` = correct indexes), `form` (`fields: [{ id, label, expect: [accepted...], normalize: "ip" | "cidr" | "text" | "number" }]`), `command` (`expect: [...]`, optional `alt: [...]`, optional `flagOrder: false`), `choice` (`options`, `expect` index).
- Exactly three PBQs per course carry `seo: true` (the self-test enforces it). The three are the broadest and least spoilable; the plan marks them.
- Every PBQ names its `domain` (the course's domain id) and its `lesson` (an existing lesson id from the lists below); the self-test rejects unknown ids.
- Facts are exam facts: the CompTIA troubleshooting methodology, the Security+ incident response steps, the A+ malware removal steps, the laser imaging steps, port numbers, address math, and command syntax must match the course's own lessons (read the named lesson before writing the PBQ; the lesson is the reference, the PBQ never contradicts it). A fact that is not in the lesson and not certain is left out.
- Original content, plain words, plain ASCII; no reference to any book or source; no real company, person, or product name beyond generic ones (a clinic, a branch office, a web server). SVG diagrams are small inline drawings (a few boxes and lines with labels, `viewBox="0 0 420 220"`, `currentColor` strokes, no external assets) written by hand.
- Commands use the form the lesson teaches; `alt` lists common equivalents (`ipconfig -all`, `traceroute` for `tracert`); `flagOrder: false` whenever flags can be reordered.
- Manifests: `test.pbqInTest` is 3 for `netplus` and `secplus`, 2 for `aplus1` and `aplus2`; `seo.pbqPhrases` as given per task.
- Commit after every task; never push. Branch `pbq-content` off `main` after Plan A merges.

## Conventions

**File header** (`courses/<id>/pbqs.js`):

```js
// NetPlus Academy performance-based questions. Original scenarios in the shape of the exam's PBQs:
// drag into order, match, pick every line that applies, fill a configuration, type a command.
// Graded task by task by engine/pbq.js; three carry seo: true for the public PBQ page.
window.FRA = window.FRA || {};
FRA.pbqs = FRA.pbqs || {};
FRA.pbqs["net-subnet-plan"] = { ... };
```

**Scenario text** uses the lesson mini-markup (`inline` renders it): plain sentences, `{{code}}` for addresses and commands, no headings. The `log` block is verbatim text. `svg` is a string.

**Why** per task: two or three sentences that teach the rule, name the lesson's term, and say why the distractors are wrong.

**Validation after each file:** `node tests/selftest.js 2>&1 | grep -i "<id>.*pbq\|FAIL"` (prints `pbqs 10 validated` for the pack) and `npm test`.

## File structure

Create: `courses/netplus/pbqs.js` (Task 1), `courses/secplus/pbqs.js` (Task 2), `courses/aplus1/pbqs.js` (Task 3), `courses/aplus2/pbqs.js` (Task 4).
Modify: each course's `course.js` and `<id>/index.html` (Tasks 1 to 4); `index.html`, `tests/catalog.js`, `README.md` (Task 5).

---

### Task 1: NetPlus Academy PBQs (N10-009)

**Files:**
- Create: `courses/netplus/pbqs.js`
- Modify: `courses/netplus/course.js` (`test.pbqInTest: 3`; `seo.pbqPhrases: ["Network+ PBQs", "N10-009 performance-based questions", "Network+ PBQ practice"]`), `netplus/index.html` (add `<script src="../courses/netplus/pbqs.js"></script>` after the last `questions-*.js` line)

Domains: 1 Networking Concepts, 2 Network Implementation, 3 Network Operations, 4 Network Security, 5 Network Troubleshooting. Lessons named below exist in `courses/netplus/curriculum-*.js`.

- [ ] **Step 1: Write the ten PBQs**

1. `net-subnet-plan` "Subnet the clinic's new floor" (domain 1, lesson `u4l3`, **seo**). Scenario: `{{192.168.10.0/24}}` must become four equal subnets, each with at least 50 hosts, one per department. Tasks: form (prefix length `/26` with alt `255.255.255.192`, normalize cidr; hosts per subnet `62`, number; second subnet's network address `192.168.10.64`, ip; its broadcast `192.168.10.127`, ip; its first usable host `192.168.10.65`, ip); choice (which department fits in the fourth subnet `192.168.10.192/26`: the one with 60 hosts, not 70). Why: block size 64, four blocks, usable = block minus 2.
2. `net-cables-ports` "Pick the cable for each run" (domain 1, lesson `u3l1`). Tasks: match left runs (10 GbE between racks 80 m; 10 GbE between buildings 2 km; a desk drop 40 m at 1 GbE; a cable modem feed; a 10 GbE run inside one rack) to right slots (Cat 6a twisted pair; single-mode fiber; Cat 5e or Cat 6; coaxial with F-type; direct-attach copper or OM3 multimode; a distractor: Cat 3); choice (the connector on multimode fiber patch cords in the rack: LC); multiselect (which runs exceed 100 m and so cannot be copper: the 2 km run only).
3. `net-troubleshoot-order` "A user cannot reach the file server" (domain 5, lesson `u9l1`, **seo**). Tasks: order the seven methodology steps written as the case (identify the problem by questioning the user and checking the ticket; establish a theory of probable cause; test the theory; establish a plan of action and note its effects; implement the solution or escalate; verify full functionality and add preventive measures; document findings, actions, outcomes, and lessons learned); choice (the user says it worked yesterday: what do you ask first: what changed); multiselect (which facts belong in the documentation: the cause, the fix, the time to resolve; not the user's password).
4. `net-wap-config` "Configure the new access point" (domain 2, lesson `u6l6`). Scenario: a staff network on 5 GHz, enterprise authentication through the RADIUS server at `{{10.0.5.20}}`. Tasks: form (band `5 GHz` text with alt `5`; channel, one non-overlapping 5 GHz channel from the lesson's list, expect `36` with alts `40`, `44`, `48`; security mode `WPA3-Enterprise` with alt `WPA2-Enterprise`; authentication server `10.0.5.20` ip); multiselect (settings to turn off: WPS; the open guest SSID on the same radio; not: band steering); choice (channel width for a dense office on 5 GHz: 20 or 40 MHz, not 160).
5. `net-switch-lines` "Find the faults in the switch config" (domain 2, lesson `u6l2`). Scenario log: a short interface config for an access port that should be in VLAN 10 and up, and an uplink that should be a trunk, with four wrong lines planted (access port set to `switchport mode trunk`; `switchport access vlan 99`; `shutdown` under the access port; the trunk missing `switchport trunk allowed vlan 10,20` and carrying `switchport mode access`). Tasks: multiselect (the faulty lines); form (the native VLAN that must match on both ends of the trunk, number, `1` with the scenario stating it); choice (what a mismatched native VLAN produces: CDP or STP native-VLAN mismatch messages and leaked frames).
6. `net-diagram-ips` "Address the branch office" (domain 2, lesson `u7l1`, **seo**). Scenario svg: a router with LAN interface `{{10.0.1.1/24}}`, a switch, two PCs, and a printer; the WAN side `{{203.0.113.2/30}}`. Tasks: form (PC-A address `10.0.1.10` with alts any `10.0.1.x` the why accepts: list `10.0.1.10`, `10.0.1.11`, `10.0.1.20`, `10.0.1.100` as accepted; subnet mask `255.255.255.0` cidr; default gateway `10.0.1.1` ip; the router's WAN peer `203.0.113.1` ip); choice (why the printer should get a static address or a DHCP reservation); multiselect (addresses that cannot be assigned to a PC: `10.0.1.0`, `10.0.1.255`, `10.0.1.1`).
7. `net-osi-match` "Place each item on the OSI model" (domain 1, lesson `u2l1`). Tasks: match left (switch; router; TCP; HTTP; a twisted-pair cable; TLS) to right slots (layer 1 Physical; layer 2 Data link; layer 3 Network; layer 4 Transport; layer 6 Presentation; layer 7 Application; a distractor layer 5 Session); choice (the PDU at layer 2: frame); multiselect (which items work with IP addresses: router only among the list).
8. `net-firewall-order` "Order the firewall rules" (domain 4, lesson `u8l9`). Scenario: policy text (allow the public to reach the web server on HTTPS; allow the admin subnet to SSH to servers; allow replies to established sessions; deny everything else and log it). Tasks: order (established first, then HTTPS to the web server, then SSH from the admin subnet, then deny any any with logging last); form (HTTPS port `443` number; SSH port `22` number); choice (the implicit rule at the end of every ACL: deny).
9. `net-ipconfig-ping` "Read the workstation's output" (domain 5, lesson `u9l5`). Scenario log: an `ipconfig` output showing an IPv4 address `169.254.23.7`, subnet mask `255.255.0.0`, no default gateway, and a `ping 10.0.1.1` that fails with "Destination host unreachable". Tasks: multiselect (the lines that show the fault: the 169.254 address and the empty gateway); choice (what a 169.254 address means: APIPA, no DHCP lease); command (renew the lease: `ipconfig /renew`, alt `ipconfig /release && ipconfig /renew`, `ipconfig -renew`); command (check name resolution after the fix: `nslookup fileserver`, alt `nslookup fileserver.clinic.local`).
10. `net-dhcp-dns-form` "Stand up DHCP for the new segment" (domain 3, lesson `u5l3`). Scenario: segment `{{10.0.20.0/24}}`, router at `.1`, servers at `.2` to `.20`, DNS at `{{10.0.20.5}}`. Tasks: form (scope start `10.0.20.21` with alt `10.0.20.50`; scope end `10.0.20.254` with alt `10.0.20.200`; router option `10.0.20.1` ip; DNS option `10.0.20.5` ip; lease time in hours `8` with alts `24`, `12`); choice (how the file server keeps the same address: a reservation by MAC); multiselect (what a client needs from DHCP to reach the internet: address, mask, gateway, DNS; not NTP).

- [ ] **Step 2: Manifest, shell, validation**

Add `pbqInTest: 3` to `test` and `pbqPhrases` to `seo` in `courses/netplus/course.js`; add the script tag to `netplus/index.html`.

```bash
node tests/selftest.js 2>&1 | grep -i "netplus.*pbq\|FAIL" | head -5 && node tests/loaders.js 2>&1 | tail -1 && npm test 2>&1 | tail -3
```
Expected: `netplus ... pbqs 10 validated`; suite green.

- [ ] **Step 3: Commit**

```bash
git add courses/netplus/pbqs.js courses/netplus/course.js netplus/index.html
git commit -m "feat(netplus): ten performance-based questions, three on the public PBQ page"
```

---

### Task 2: SecPlus Academy PBQs (SY0-701)

**Files:**
- Create: `courses/secplus/pbqs.js`
- Modify: `courses/secplus/course.js` (`test.pbqInTest: 3`; `seo.pbqPhrases: ["Security+ PBQs", "SY0-701 performance-based questions", "Security+ PBQ practice"]`), `secplus/index.html`

Domains: 1 General Security Concepts, 2 Threats, Vulnerabilities, and Mitigations, 3 Security Architecture, 4 Security Operations, 5 Security Program Management and Oversight.

- [ ] **Step 1: Write the ten PBQs**

1. `sec-log-attack` "Find the attack in the log" (domain 4, lesson `u13l3`, **seo**). Scenario log: twelve authentication lines; eight failed logins for eight different usernames from one source address within two seconds, then one success. Tasks: multiselect (the lines that show the attack: the eight failures and the success from that address; not the two normal logins from other addresses); choice (the attack: password spraying, not brute force against one account); command (block the source on a Linux host firewall as the lesson shows, expect the lesson's form, for example `sudo ufw deny from 203.0.113.9`, alt the `iptables` form); choice (the control that would have stopped it: MFA and lockout policy).
2. `sec-ir-order` "A ransomware note appears on a workstation" (domain 4, lesson `u13l1`, **seo**). Tasks: order the incident response process written as the case (preparation already done: the playbook and contacts; detection: the note and the alert; analysis: scope and strain; containment: isolate the host and segment; eradication: remove the malware and close the vector; recovery: restore from clean backups and monitor; lessons learned: the report and the changes); choice (the first action on the infected host: isolate it from the network, not power it off); multiselect (what belongs in the lessons-learned report).
3. `sec-attack-match` "Name the attack" (domain 2, lesson `u5l2`). Tasks: match left descriptions (a fake Wi-Fi access point with the coffee shop's name; a text message with a link to reset a bank password; thousands of hosts flood a web server; an attacker relays traffic between a client and a server unnoticed; a forged DNS answer sends users to a fake site) to right slots (evil twin; smishing; DDoS; on-path; DNS poisoning; distractors: SQL injection; vishing); choice (the attack a WAF defends against: injection against a web application).
4. `sec-firewall-acl` "Write the ACL for the DMZ" (domain 3, lesson `u7l2`). Scenario: a web server in the DMZ, an admin jump host, a policy. Tasks: order (permit established; permit any to the web server on 443; permit the admin subnet to the DMZ on 22; deny any any log); form (the HTTPS port `443`; the SSH port `22`; the web server's zone `DMZ` text with alt `screened subnet`); choice (where the explicit deny sits: last).
5. `sec-wifi-config` "Secure the clinic's wireless" (domain 4, lesson `u9l2`). Tasks: form (security mode `WPA3-Enterprise` alt `WPA2-Enterprise`; authentication framework `802.1X` alt `IEEE 802.1X`; authentication server type `RADIUS`; EAP method `EAP-TLS` alt `PEAP`); multiselect (turn off WPS; remove the shared passphrase network; not: the 5 GHz band); choice (why enterprise mode over a pre-shared key: per-user credentials and revocation).
6. `sec-harden-server` "Harden the new file server" (domain 4, lesson `u9l1`). Tasks: multiselect from a checklist (apply the latest patches; change default credentials; disable unused services and ports; enable the host firewall; remove unnecessary software; not: enable Telnet for remote admin; allow anonymous FTP; keep the vendor default admin account); order (the baseline process: inventory, apply the baseline, verify with a scan, document, monitor for drift); choice (what to use for remote administration instead of Telnet: SSH).
7. `sec-pki-match` "Who does what in PKI" (domain 1, lesson `u2l4`, **seo**). Tasks: match left (issues and signs certificates; verifies an applicant's identity before issuance; lists revoked certificates; answers real-time revocation queries; the file an applicant sends to request a certificate; the key that must never leave the server) to right slots (certificate authority; registration authority; CRL; OCSP; CSR; private key; distractor: public key); choice (which key encrypts a message only the server can read: the server's public key); multiselect (what a browser checks on a certificate: expiry, chain to a trusted root, the name matches, revocation; not the file size).
8. `sec-access-matrix` "Fill the access control matrix" (domain 4, lesson `u12l2`). Scenario: three roles (HR manager, payroll clerk, intern) and two resources (personnel records, payroll export), the policy in prose. Tasks: form (HR manager on personnel records `read/write` with alts `read and write`, `rw`; payroll clerk on payroll export `read/write`; intern on personnel records `none` with alt `no access`; intern on payroll export `none`); choice (the model that assigns rights by job function: role-based access control); choice (the principle the intern's row shows: least privilege).
9. `sec-commands` "Verify the download and scan the host" (domain 4, lesson `u10l1`). Tasks: command (hash the ISO on Linux: `sha256sum tools.iso`, alt `shasum -a 256 tools.iso`); command (the Windows equivalent: `certutil -hashfile tools.iso SHA256`, flagOrder false); command (service-version scan of one host: `nmap -sV 10.0.0.5`, alt `nmap -sV -p- 10.0.0.5`, flagOrder false); choice (a hash that does not match the vendor's means: do not install; the file is corrupt or tampered).
10. `sec-risk-register` "Complete the risk register" (domain 5, lesson `u14l4`). Tasks: match left risks (a legacy device cannot be patched; a data center in a flood zone; a vendor handles card payments for the shop; a low-likelihood, low-impact nuisance alert) to right strategies (mitigate with segmentation and compensating controls; avoid or relocate; transfer through the vendor and insurance; accept and document; distractor: ignore); form (the register columns in the lesson: likelihood, impact, owner, response; one field `owner` expects `risk owner` with alt `owner`); choice (the number that sets how much risk leadership will carry: risk appetite or tolerance).

- [ ] **Step 2: Manifest, shell, validation** (as Task 1, for `secplus`)

- [ ] **Step 3: Commit**

```bash
git add courses/secplus/pbqs.js courses/secplus/course.js secplus/index.html
git commit -m "feat(secplus): ten performance-based questions, three on the public PBQ page"
```

---

### Task 3: APlus Academy Core 1 PBQs (220-1201)

**Files:**
- Create: `courses/aplus1/pbqs.js`
- Modify: `courses/aplus1/course.js` (`test.pbqInTest: 2`; `seo.pbqPhrases: ["A+ Core 1 PBQs", "220-1201 performance-based questions", "A+ PBQ practice"]`), `aplus1/index.html`

Domains: 1 Mobile Devices, 2 Networking, 3 Hardware, 4 Virtualization and Cloud Computing, 5 Hardware and Network Troubleshooting.

- [ ] **Step 1: Write the ten PBQs**

1. `ap1-cables-match` "Match the connector to the job" (domain 3, lesson `u4l2`, **seo**). Tasks: match left jobs (video and audio to a TV in one cable; data, power, and video over one reversible connector; a SATA drive's data cable; charging an older iPhone; an external drive at 10 Gbps over a rectangular port; a monitor over a locking 20-pin video connector) to right slots (HDMI; USB-C; SATA; Lightning; USB-A 3.x; DisplayPort; distractors: VGA; Molex); choice (the connector that carries Thunderbolt: USB-C); multiselect (connectors that carry power to a device: USB-C, Lightning; not HDMI, DisplayPort).
2. `ap1-build-form` "Spec the memory and storage" (domain 3, lesson `u5l2`). Scenario: a desktop board with DDR5 DIMM slots and one M.2 slot keyed for NVMe; a video editor needs fast storage and 32 GB. Tasks: form (RAM type `DDR5`; RAM module form factor `DIMM`; storage interface `NVMe` alt `PCIe NVMe`; slot `M.2`; total RAM in GB `32` number); choice (two 16 GB modules rather than one 32 GB: dual channel); multiselect (what would not fit this board: DDR4, SODIMM).
3. `ap1-laser-order` "Walk the laser printer's imaging process" (domain 3, lesson `u6l2`). Tasks: order the seven steps (processing, charging, exposing, developing, transferring, fusing, cleaning); choice (a page that smears when touched: the fusing step; the fuser); choice (faded print across the page: low toner or the transfer step).
4. `ap1-mobile-form` "Set up the manager's phone" (domain 1, lesson `u1l4`, **seo**). Scenario: corporate email over IMAP with TLS, an MDM policy that requires a lock and remote wipe. Tasks: form (incoming protocol `IMAP`; incoming port `993` number; outgoing port `587` alt `465` number; encryption `TLS` alt `SSL/TLS`); multiselect (MDM settings the policy requires: screen lock, remote wipe, encryption; not: location sharing to all apps); choice (BYOD versus corporate-owned: what the MDM can wipe on a BYOD phone: the work container only).
5. `ap1-cloud-match` "Pick the cloud model" (domain 4, lesson `u7l3`). Tasks: match left scenarios (rent virtual machines and manage the OS yourself; use a hosted database platform and write only the app; use a subscription web app with nothing to manage; servers shared by many customers at a provider; servers owned and run by the clinic alone; a mix where bursts go to a provider) to right slots (IaaS; PaaS; SaaS; public; private; hybrid; distractor: community); choice (the model where the provider patches the OS: PaaS or SaaS, not IaaS).
6. `ap1-display-ms` "The laptop screen is very dim" (domain 5, lesson `u8l4`). Scenario: the image is visible with a flashlight held to the screen. Tasks: multiselect (likely causes: the backlight; the inverter on an older CCFL panel; the display cable's backlight line; not: the GPU, the resolution setting, dead pixels); choice (the first cheap check: the brightness keys and power plan); order (the repair steps: confirm with the flashlight, check brightness and power settings, test an external monitor, reseat or replace the cable, replace the panel or inverter).
7. `ap1-bios-form` "Set the firmware for the new build" (domain 3, lesson `u5l5`). Tasks: form (Secure Boot `Enabled` alt `On`; TPM `Enabled`; first boot device for the install `USB` alt `USB drive`; CPU virtualization (VT-x or AMD-V) `Enabled`); choice (what a supervisor password protects: the firmware settings, not the OS); multiselect (reasons to enter firmware setup: change boot order, enable virtualization, set a fan curve; not: install a printer driver).
8. `ap1-laptop-diagram` "Name the laptop's parts" (domain 1, lesson `u1l1`). Scenario svg: a laptop underside with five numbered callouts (battery, SODIMM slots, M.2 SSD, wireless card, CMOS battery). Tasks: match left callout numbers (1 to 5) to right slots (battery; SODIMM memory; M.2 SSD; wireless card; CMOS battery; distractor: optical drive); choice (the first thing to disconnect before touching any of them: the battery); choice (the antenna leads connect to: the wireless card).
9. `ap1-net-commands` "Work the connectivity complaint" (domain 5, lesson `u9l1`, **seo**). Scenario: a user can reach the file server by address but not by name, and cannot reach the internet. Tasks: command (show the adapter's full configuration: `ipconfig /all`, alt `ipconfig -all`); command (test reachability of a public address: `ping 8.8.8.8`, alt `ping 1.1.1.1`); command (see where the path stops: `tracert 8.8.8.8`, alt `traceroute 8.8.8.8`); command (test name resolution: `nslookup fileserver`, alt `nslookup www.example.com`); choice (ping by address works but by name fails: DNS).
10. `ap1-virt-ms` "Get the workstation ready for virtual machines" (domain 4, lesson `u7l2`). Tasks: multiselect (requirements: a CPU with VT-x or AMD-V, virtualization enabled in firmware, enough RAM for host plus guests, enough disk for the virtual disks; not: a discrete GPU, a second NIC, a server OS); choice (network mode for a VM that needs its own address on the LAN: bridged); choice (what to take before a risky change in a VM: a snapshot).

- [ ] **Step 2: Manifest, shell, validation** (as Task 1, for `aplus1`)

- [ ] **Step 3: Commit**

```bash
git add courses/aplus1/pbqs.js courses/aplus1/course.js aplus1/index.html
git commit -m "feat(aplus1): ten performance-based questions, three on the public PBQ page"
```

---

### Task 4: APlus Academy Core 2 PBQs (220-1202)

**Files:**
- Create: `courses/aplus2/pbqs.js`
- Modify: `courses/aplus2/course.js` (`test.pbqInTest: 2`; `seo.pbqPhrases: ["A+ Core 2 PBQs", "220-1202 performance-based questions", "A+ PBQ practice"]`), `aplus2/index.html`

Domains: 1 Operating Systems, 2 Security, 3 Software Troubleshooting, 4 Operational Procedures.

- [ ] **Step 1: Write the ten PBQs**

1. `ap2-win-commands` "Fix the workstation from the command line" (domain 1, lesson `u2l3`, **seo**). Tasks: command (repair protected system files: `sfc /scannow`); command (check and fix the system drive: `chkdsk C: /f`, alt `chkdsk /f C:`, flagOrder false); command (clear the DNS cache: `ipconfig /flushdns`); command (apply group policy now: `gpupdate /force`); command (restart immediately: `shutdown /r /t 0`, flagOrder false); choice (which of these needs an elevated prompt: all but ipconfig).
2. `ap2-permissions-form` "Give Accounting the right access" (domain 2, lesson `u5l1`). Scenario: a shared folder; Accounting must edit files but not change permissions; Interns read only. Tasks: form (Accounting share permission `Change`; Accounting NTFS permission `Modify`; Interns share permission `Read`; Interns NTFS permission `Read` alt `Read & execute`); choice (effective access when share says Full Control and NTFS says Read: Read, the more restrictive wins); choice (a user in both groups: the least restrictive within each type, then the more restrictive between share and NTFS).
3. `ap2-malware-order` "Remove the malware the right way" (domain 2, lesson `u5l8`, **seo**). Tasks: order the lesson's malware removal steps (investigate and verify symptoms; quarantine the system; disable System Restore in Windows; remediate: update anti-malware and scan with removal techniques; schedule scans and run updates; enable System Restore and create a restore point; educate the end user); choice (why System Restore is disabled before cleaning: restore points can hold the malware); multiselect (symptoms that point to malware: new toolbars, redirects, disabled antivirus; not: a dead pixel).
4. `ap2-os-install-order` "Install Windows on the new laptop" (domain 1, lesson `u1l3`). Tasks: order (check hardware requirements and compatibility; back up the user's data; create the boot media and set the boot order; boot the installer and choose the edition; partition and format the drive; install drivers and updates; create accounts and join the domain; restore the data and verify); choice (the partition style for UEFI: GPT); choice (an in-place upgrade keeps: apps, settings, and files).
5. `ap2-harden-ms` "Harden the front-desk PC" (domain 2, lesson `u5l3`). Tasks: multiselect (enable the host firewall; disable AutoRun and AutoPlay; require a screen lock timeout; disable the guest account; keep the OS patched; not: use the Administrator account for daily work; turn off UAC; share the root of C:); choice (the account type for daily work: standard user); choice (what UAC does: prompts before elevation).
6. `ap2-script-match` "Match the script to its extension" (domain 4, lesson `u9l1`). Tasks: match left (PowerShell; Bash; Python; Windows batch; VBScript; JavaScript) to right slots (`.ps1`; `.sh`; `.py`; `.bat`; `.vbs`; `.js`; distractor: `.exe`); choice (a script that maps network drives at logon is usually: a logon script, batch or PowerShell); multiselect (risks of running an unknown script: malware, unintended system changes; not: it uses CPU).
7. `ap2-backup-form` "Design the clinic's backups" (domain 4, lesson `u7l3`). Tasks: form (the rule the lesson names for copies, media, and off-site: `3-2-1`; full backup frequency `weekly` alt `monthly`; the daily backup type that copies only changes since the last backup of any kind `incremental`; the type that copies changes since the last full `differential`); choice (the fastest restore between incremental and differential: differential); choice (how you know a backup works: a test restore).
8. `ap2-slow-pc-order` "The PC has been slow for a week" (domain 3, lesson `u6l1`, **seo**). Tasks: order the methodology written as the case (identify: question the user and open Task Manager; theory: a startup program or malware; test: boot clean and scan; plan: remove the startup item and schedule scans; implement; verify by timing the boot; document); multiselect (what Task Manager shows that points to the cause: a process at 95 percent CPU, a startup item with high impact; not: the wallpaper); choice (if the disk is at 100 percent constantly on an old HDD: check disk health and consider an SSD).
9. `ap2-linux-commands` "Handle the file task on the Linux box" (domain 1, lesson `u3l2`). Tasks: command (make a script executable for the owner and readable and executable for others: `chmod 755 deploy.sh`, alt `chmod u+rwx,go+rx deploy.sh`); command (list files with permissions: `ls -l`, alt `ls -la`); command (find lines with error in a log: `grep error app.log`, alt `grep -i error app.log`); command (copy a file: `cp report.txt backup/`); choice (run a command as the superuser: sudo).
10. `ap2-safety-match` "Stay safe on the job" (domain 4, lesson `u8l1`). Tasks: match left situations (opening a PC case to add RAM; a small electrical fire in a power strip; lifting a heavy UPS; a toner spill inside a printer; a power supply or CRT needs repair; a chemical you have not used before) to right slots (ESD strap and mat; a Class C extinguisher; bend the knees and lift with the legs; a toner-rated vacuum and a mask; do not open it, the capacitors hold a charge; read the SDS; distractor: wear a dust mask only); choice (what ESD damages: components, often invisibly); multiselect (where static builds up: dry air, carpet, synthetic clothing; not: a grounded mat).

- [ ] **Step 2: Manifest, shell, validation** (as Task 1, for `aplus2`)

- [ ] **Step 3: Commit**

```bash
git add courses/aplus2/pbqs.js courses/aplus2/course.js aplus2/index.html
git commit -m "feat(aplus2): ten performance-based questions, three on the public PBQ page"
```

---

### Task 5: Catalog links, README, build, and local stage

**Files:**
- Modify: `index.html` (the four CompTIA cards' `.links` spans), `tests/catalog.js`, `README.md`, this plan's Status section

- [ ] **Step 1: Test first**

Append to `tests/catalog.js` inside the catalog block:

```js
    const pbqCards = ['netplus/', 'secplus/', 'aplus1/', 'aplus2/'];
    check('every CompTIA card links its PBQ page', pbqCards.every(id => !!d.querySelector(`.card .links a[href="${id}pbq/"]`)), pbqCards.filter(id => !d.querySelector(`.card .links a[href="${id}pbq/"]`)).join(','));
    check('no non-CompTIA card links a PBQ page', !d.querySelector('.card .links a[href="bmet/pbq/"], .card .links a[href="cbet/pbq/"], .card .links a[href="cres/pbq/"], .card .links a[href="chtm/pbq/"]'));
```
Run: `node tests/catalog.js 2>&1 | grep FAIL`
Expected: the first check FAILs.

- [ ] **Step 2: Links and README**

In `index.html`, in each of the four CompTIA cards' `<span class="links">`, add ` &middot; <a href="<id>/pbq/">PBQ practice</a>` after the practice-test link (`netplus/`, `secplus/`, `aplus1/`, `aplus2/`).

In `README.md`'s live-courses sentence, note that the four CompTIA courses carry ten PBQs each; in the Search Console section, list the four `/<id>/pbq/` pages for indexing requests.

- [ ] **Step 3: Build, stage, verify**

```bash
npm test 2>&1 | tail -3 && python build.py && node site/build-site.js && bash scripts/stage.sh --local 2>&1 | tail -2
ls dist/stage/netplus/pbq dist/stage/secplus/pbq dist/stage/aplus1/pbq dist/stage/aplus2/pbq && grep -c "/pbq/" dist/stage/sitemap.xml
```
Expected: suite green; four `pbq/index.html` pages staged; the sitemap gained four URLs; `dist/<id>.html` bundles carry the PBQs.

- [ ] **Step 4: Record and commit**

Add a `## Status` section: the forty ids, the twelve `seo: true` ids, the bundle sizes, the sitemap count.

```bash
git add index.html tests/catalog.js README.md dist docs/superpowers/plans/2026-10-14-comptia-pbqs-content.md
git commit -m "feat(pbq): catalog PBQ links for the four CompTIA courses; rebuilt bundles and static PBQ pages; plan status"
```

The merge to `main`, the branch deletion, and the hand-off (Blake pushes, stages, and runs the go-live command; Search Console: resubmit the sitemap and request indexing on the four PBQ pages) are the controller's steps after the final review.

---

## Self-review against the spec (done while writing)

- Spec 4 content: forty PBQs, ten per course, each with domain and lesson from the real curricula, three to six tasks mixing the kinds, three `seo: true` per course (netplus 1, 3, 6; secplus 1, 2, 7; aplus1 1, 4, 9; aplus2 1, 3, 8). One deviation: the spec's Core 1 "printer troubleshooting steps (order)" became the laser imaging process in order with two troubleshooting choices, because the imaging steps are the exam's canonical sequence and a troubleshooting sequence is not.
- Spec 1 phone-first and spec 2 grading: inherited from Plan A; nothing here changes the engine.
- Spec 3 SEO: the `seo` picks are the broadest and least spoilable; `seo.pbqPhrases` per course; the catalog links land here (Task 5) rather than in Plan A so the catalog never links a page that does not exist.
- Manifests: `pbqInTest` 3 / 3 / 2 / 2 as the spec sets.
- Facts: every ordered sequence above is the lesson's sequence; the implementer reads the named lesson before writing each PBQ and the reviewer checks each against it.

## Status

(filled in by Task 5)
