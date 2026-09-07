// APlus Academy Core 2 deeper explanations, units 6 to 9. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};
Object.assign(FRA.deep, {

u6l1: `## Symptom to cause to action, in one table
\`\`\`
symptom                          most likely causes                                   first actions
BSOD                             driver, RAM, storage, heat, bad update               note stop code; undo last change; safe mode; roll back; memory test
degraded performance             hog process, startup bloat, full disk, malware, RAM  Task Manager; startup tab; free space; scan; add RAM
boot issues                      bad update or driver, corrupted boot files           Startup Repair; safe mode; uninstall update; bootrec
frequent shutdowns               overheating, PSU, loose power, scheduled task        temperatures; System log shutdown reason; PSU test
services not starting            dependency, Log On account, corruption, disabled     System log; dependencies tab; start manually; Automatic (Delayed)
applications crashing            app bug or requirements; system-wide: RAM, disk     update or reinstall; Application log; Reliability Monitor
low memory warnings              leak, too little RAM, page file limits, malware      close the leaker; add RAM; system-managed page file
USB controller resource warnings too many devices on one controller                  spread devices; powered hub; chipset drivers
system instability               heat, RAM, drive, corrupted files, malware          temperatures; memory test; sfc; clean boot; scan
no OS found                      boot order, unplugged or dead drive, boot record     boot order; check firmware sees the drive; bootrec
slow profile load                huge or corrupt profile, login scripts, roaming     trim; fix scripts; rebuild profile
time drift                       CMOS battery, time zone, sync failure               replace battery; set zone; resync; domain time source
\`\`\`

## How to read a stop code
The stop code names the category: memory management, page fault in nonpaged area, IRQL not less or equal, and driver-named codes point at drivers and memory; critical process died and inaccessible boot device point at storage and boot files; whea uncorrectable error points at hardware. A crash dump names the faulting module. The single most useful question is "what changed right before this started," because most blue screens follow a driver, an update, or new hardware. Reliability Monitor shows the timeline of installs and crashes on one screen.

## Isolating with safe mode and clean boot
Safe mode loads only core drivers and services. If the machine is stable in safe mode, the cause is a third-party driver, service, or startup program. A clean boot (msconfig, hide Microsoft services, disable all, then disable startup items in Task Manager) lets you re-enable half at a time to find the culprit. If the machine is unstable even in safe mode, suspect hardware: memory, storage, power, heat.

## Time drift, deeper
A PC keeps time with the real-time clock on the board, powered by the coin cell when the machine is off, and corrects it periodically from a time server (time.windows.com by default, the domain controller in a domain). A dead coin cell resets the clock at each power-off, so the machine boots into the past: HTTPS fails (certificates are "not yet valid"), Kerberos logins fail (five-minute tolerance), scheduled tasks misfire, and logs are misdated. Fix the cell, set the zone, run the time sync ({{w32tm /resync}} in a domain), and the symptoms clear together.

## Worked scenarios
- Two blue screens a week, all memory management: run the Windows Memory Diagnostic overnight and test the RAM sticks one at a time.
- Boot loops after a monthly update: WinRE, Uninstall Updates, then pause updates and check the vendor's known issues.
- "No bootable device" on a laptop after it was dropped: the drive; check firmware, then data recovery.
- Print Spooler stops daily: a dependency or a corrupted job; clear the spool folder, restart, check the event.
- Warning about USB resources when a docking station is attached: too many endpoints; move webcams and audio to another controller or a powered hub.

## What to memorize
The twelve symptoms with their causes and first actions. Stop codes point at drivers, memory, storage, or hardware; the last change is the prime suspect; safe mode isolates software from hardware; time drift is the CMOS battery plus time sync.`,

u6l2: `## The tools and what each one touches
\`\`\`
tool                    touches                                  keeps user files   when
reboot                  memory, stuck services                   yes                first, always
restart service         one service                              yes                service-specific symptom
reinstall or update app one application                          yes                one app misbehaves
roll back driver        one driver                               yes                problem followed a driver
uninstall update        one update                               yes                problem followed an update
sfc /scannow            protected system files                   yes                corrupted files, odd built-in app errors
DISM /RestoreHealth     the component store sfc draws from       yes                sfc cannot repair
chkdsk /f, /r           filesystem, bad sectors                  yes                disk errors, files that will not open
System Restore          system files, registry, drivers          yes                return to a known-good point
rebuild profile         one user's profile                       copy them over     one-user problems
repair install          the whole OS, in place                   yes, and apps      deep OS corruption
Reset this PC           the OS, removes apps                     optional           when repair fails
reimage / clean install everything                               no (back up)       last resort, rootkits
\`\`\`

## Why sfc, then DISM, then sfc
System File Checker compares protected files against a local store of known-good copies. If that store is itself corrupted, sfc reports that it found errors it could not fix. DISM with RestoreHealth repairs the store from Windows Update (or a mounted image with the Source option), after which sfc has good copies to work from and succeeds. Running sfc a second time confirms the fix. The exam phrases this as "sfc reports it could not repair some files; what next?" and the answer is DISM.

## chkdsk, carefully
{{chkdsk C: /f}} fixes filesystem structure errors and needs the volume dismounted, so on the system drive it schedules itself for the next boot. {{/r}} adds a surface scan for bad sectors and can take hours on a large drive. Repeated chkdsk repairs on the same drive mean the drive is failing; back it up now and replace it. Storage health (S.M.A.R.T.) from the vendor tool or a third-party utility confirms.

## Reaching WinRE
1. Settings, System, Recovery, Advanced startup, Restart now.
2. Hold Shift while clicking Restart on the sign-in screen or Start menu.
3. Interrupt boot three times (hold the power button as Windows starts loading); the third boot opens Automatic Repair and the Advanced options.
4. Boot installation media and choose Repair your computer.
From WinRE: Startup Repair first (it fixes most boot problems by itself), then Uninstall Updates, then System Restore, then Command Prompt for bootrec and offline sfc, then Reset.

## Rebuilding a profile, the steps
1. Sign in as another administrator.
2. Rename the old profile folder (C:\\Users\\name to name.old) and delete the user's ProfileList entry in the registry (or use the System Properties, User Profiles dialog to delete the profile).
3. Sign in as the user; Windows creates a fresh profile.
4. Copy documents, desktop, favorites, and mail data from the old folder; do not copy the hidden AppData wholesale, since that carries the corruption.
5. Reconfigure applications, then remove the old folder after a grace period.

## Worked scenarios
- Settings app crashes on open and Start menu search is dead: sfc, then DISM if needed.
- A machine boots to a black screen after a graphics driver update: safe mode, roll back the driver.
- Files on D: show as corrupted and unreadable: chkdsk /f D:, back up, check drive health.
- One user's Start menu and taskbar are broken; a test account works: rebuild the profile.
- Everything is slow and flaky after malware removal, sfc and DISM found nothing: repair install, then reset.

## What to memorize
The ladder from reboot to reimage, sfc then DISM then sfc, chkdsk switches, the four ways into WinRE and what it offers, roll back versus uninstall, System Restore keeps user files, profile rebuild for one-user problems.`,

u6l3: `## Symptom table with the mechanism behind each
\`\`\`
symptom                                mechanism                                             check
unable to access the network           proxy set, DNS changed, hosts poisoned, isolated      proxy settings; ipconfig /all DNS; hosts file; EDR status
desktop alerts                         scareware or PUP notifications                         installed programs; notification permissions
false antivirus alerts                 rogue antivirus posing as protection                   is that product installed? real scanner from clean boot
altered system or personal files       malware modifying, replacing, timestamping            file dates; sfc; hashes
missing or renamed files               ransomware encrypting, malware deleting or hiding      ransom note; hidden attribute; backups
inability to access files              encryption or stripped permissions                     extension; note; permissions
unwanted notifications within the OS   browser notification spam; PUP toasts                  site permissions; installed apps
OS update failures                     malware blocking updates; corrupted components         Windows Update log; services; DISM
random or frequent pop-ups             adware; malicious extension                            extensions; programs; reset browser
certificate warnings                   one site: their cert; all sites: clock, roots, MITM    clock; issuer on the warning; proxy
redirection                            search hijack; extension; proxy; DNS; hosts            search settings; extension list; proxy; DNS; hosts
degraded browser performance           extensions; mining script; cache; malware              browser task manager; extensions
\`\`\`

## Certificate warnings, decided by scope
One site only: that site's certificate is expired, is for a different name, or is self-signed; the user's PC is fine. Every site: something on the PC or path is wrong. The clock is the most common (certificates have validity dates). A missing root certificate update on an old or offline machine is next. Then interception: a corporate filtering proxy whose root certificate is not installed on this machine, or malware that inserted its own root to read HTTPS traffic. The warning's details show the issuer; an unfamiliar issuer on a well-known site is the red flag.

## Redirection, where to look
1. The browser's default search engine and home page settings.
2. Extensions (remove anything unknown).
3. The system proxy (Settings, Network, Proxy; and the browser's own proxy setting).
4. The DNS servers in the adapter configuration and the router.
5. The hosts file (C:\\Windows\\System32\\drivers\\etc\\hosts) for entries pointing real names at fake addresses.
6. Scheduled tasks and startup items that reapply the hijack after you fix it.

## The rogue antivirus pattern
A pop-up announces dozens of infections, animates a scan, and offers a purchase or a phone number. It arrived through malvertising or a bundled installer. Its "scan" is theater; its purpose is payment or remote access. Response: do not pay or call; close the browser from Task Manager if needed; run the real, updated antimalware from safe mode; remove the program and extensions; reset the browser; educate the user about the pattern.

## Worked scenarios
- The helpdesk gets ten calls that Windows Update fails; each machine also has a disabled Defender: malware campaign; isolate and remediate, not just fix updates.
- A user cannot reach the intranet but can reach the internet, and the proxy field contains an unknown address: rogue proxy; clear it, then scan.
- Files in a shared drive renamed overnight from one workstation: ransomware from that workstation; disconnect it, disable the account, restore the share from backup after cleaning.

## What to memorize
The symptom list for 3.4, the scope rule for certificate warnings, the six places redirection hides, the rogue antivirus pattern, and that the response is the seven-step malware removal procedure.`,

u6l4: `## Fix ladder for mobile, with what each step clears
\`\`\`
step                          clears
force-close and reopen        a hung app instance
restart the device            memory, stuck services, radio state
update the app and the OS     known bugs, compatibility
clear the app cache or data   corrupted cached files (Android per app; iOS by reinstall)
reinstall the app             corrupted install
reset network settings        saved Wi-Fi, Bluetooth pairings, VPN, cellular settings
reset all settings            preferences without erasing data
factory reset                 everything; restore from backup
service                       hardware: battery, sensors, radios
\`\`\`

## Symptom to cause
\`\`\`
symptom                      likely causes                                              first checks
app fails to launch          hung instance, outdated app or OS, low storage             force-close; update; storage
app crashes                  bug, memory, storage, OS mismatch                           update; free storage; reinstall
app fails to update          storage, network (metered), store account, OS too old      storage; Wi-Fi; store sign-in; OS version
app fails to install         same, plus device or region incompatibility, MDM policy    compatibility note; MDM restrictions
slow to respond              background apps, low storage, old OS, weak battery, malware close apps; storage; battery health; scan
OS fails to update           storage, battery under 50 percent, no Wi-Fi, EOL, rooted   charge; Wi-Fi; storage; support status
battery life issues          brightness, background refresh, location, poor signal, aging  battery usage screen; health
random reboots               battery, heat, bad update or app                            battery health; temperature; recent installs
Bluetooth                    pairing state, range, profile mismatch                      forget and re-pair; toggle
Wi-Fi                        wrong passphrase, captive portal, saved bad profile         forget and rejoin; reset network settings
NFC                          disabled, wrong spot, thick case, no default payment app    settings; position; case; default app
no autorotate                rotation lock, app does not support it, sensor failure       quick settings lock; try another app
\`\`\`

## Battery diagnosis in order
1. Battery settings show usage per app since the last full charge: the top consumer is the suspect.
2. Screen at high brightness is the usual leader; set auto-brightness and a short timeout.
3. Background app refresh and location for apps that do not need them: turn off.
4. Poor cellular signal makes the radio work at maximum power; Wi-Fi calling and airplane mode in dead zones help.
5. Battery health under 80 percent means replacement.
6. An unknown app at the top of the list with heavy data use is a security symptom (next lesson).

## Storage thresholds
Updates and installs need free space for the download and the unpacked files; a phone under about 10 percent free fails updates and gets slow. Offload photos to cloud, clear app caches, delete unused apps. iOS offers offloading unused apps; Android shows per-app storage with a clear-cache button.

## Worked scenarios
- A user's phone will not install the OS update at 30 percent battery over cellular: plug in, join Wi-Fi, check storage.
- A car's Bluetooth calls drop while music works: profile mismatch; forget and re-pair from both sides, update the phone.
- The screen stays sideways: rotation lock icon in quick settings.
- A camera app crashes when opened: force-close, update, clear cache, reinstall; if every camera app fails, the sensor or OS.

## What to memorize
The fix ladder and the symptom table; the update prerequisites (storage, battery, Wi-Fi, supported model); the battery diagnosis order; forget and re-pair for Bluetooth, forget and rejoin or reset network settings for Wi-Fi, position and case for NFC, rotation lock first for autorotate.`,

u6l5: `## Concerns, what they enable, and the control
\`\`\`
concern                          what it enables                                    control
unofficial app sources           malware skipping store review                       official store only; block unknown sources by policy
developer mode                   USB debugging, test installs, bypasses              off by default; MDM compliance check
root or jailbreak                full control for malware, no updates, no sandbox    MDM detection and block; factory reset to clear
unauthorized or malicious app    surveillance, fraud, exfiltration                   app inventory; permission review; removal
application spoofing             credential theft through a look-alike               verify publisher, reviews, permissions; official store
\`\`\`

## Symptoms and what produces them
\`\`\`
symptom                             produced by
high network traffic                exfiltration, mining, ad fraud, spoofed app streaming
data-usage limit notification       the same, over cellular
degraded response time              background malware, mining, too many apps
limited or no internet              rogue VPN or profile, changed DNS, MDM block for non-compliance, or ordinary network trouble
high number of ads                  adware with overlay permission, sideloaded apps
fake security warnings              scareware advertising itself
unexpected application behavior     apps launched by malware, settings changed, permissions abused
leaked personal files or data       over-permissioned app, stalkerware, compromised cloud account
\`\`\`

## Permissions that matter
- Accessibility service (Android): can read the screen and act as the user; the favorite of banking malware.
- Device administrator or device owner: can resist uninstall and wipe the device; revoke before uninstalling.
- Draw over other apps (overlay): the source of ads and fake login screens on top of real apps.
- SMS: reads one-time codes and sends premium texts.
- Notification access: reads every notification, including codes.
- Location, microphone, camera in the background: stalkerware.
On iOS, look at configuration profiles and VPN configurations, which are the equivalent doors.

## The cleanup, in order
1. Airplane mode if exfiltration is suspected, so the data stops leaving while you work.
2. Settings, Apps: sort by recent install; uninstall unknown apps, revoking device admin first.
3. Review permissions for the six categories above; revoke.
4. Remove unknown VPN configurations and configuration profiles; reset the DNS setting.
5. Run the platform protection scan and a reputable antimalware app; update the OS.
6. If rooted, jailbroken, or still symptomatic: back up personal data (not apps), factory reset, restore data only, reinstall apps from the store.
7. Change passwords and revoke sessions from a clean device; enable MFA.
8. Re-enroll in MDM; confirm compliance.

## Worked scenarios
- A user's phone shows a full-screen "virus detected" page that opens when they unlock: an app with overlay permission; find it and remove it.
- Corporate mail stopped syncing and the MDM console shows "non-compliant: developer options enabled": turn developer mode off, re-check compliance.
- A user downloaded "the bank's app" from a text link and their account was emptied: application spoofing plus smishing; uninstall, contact the bank, change credentials, report.
- A phone uses 20 GB in three days with no video streaming: check per-app data usage; the top unknown app is the leak.

## What to memorize
The five concerns, the eight symptoms, the dangerous permissions, and the cleanup order ending in factory reset and password changes.`,

u6l6: `## The method, with what each step produces
\`\`\`
step                          you produce
identify the problem          facts: symptoms, timeline, what changed, who is affected, a backup
establish a theory            a ranked list of causes, obvious first
test the theory               a result that confirms or eliminates; if eliminated, next theory or escalate
plan of action                the fix, its risks, the rollback, the maintenance window if needed
implement                     the fix, or escalation to the right tier
verify full functionality     the user confirms; preventive measures added
document                      the ticket resolution, a knowledge base article, an incident report when security was involved
\`\`\`

## Case 1 revisited: thermal blue screens
What made this case solvable was the timeline. Crashes clustered in the afternoon, when the room was warmest and the workload highest. Event Viewer's System log showed the bugcheck event each time, and the vendor's hardware log showed temperature climbing beforehand. The lesson for exam questions: when a scenario gives you a time pattern or a load pattern, the cause is environmental or resource-related, not random. The test of the theory (side panel off, extra fan, stress test) was cheap and decisive.

## Case 2 revisited: the slow profile
The decisive fact was that other users on the same PC signed in quickly, which eliminated the machine, the network, and the domain controller in one stroke. Exam questions often include a detail like "other users are unaffected" precisely to let you eliminate shared components. The fix order matters: trim the profile before rebuilding it, because rebuilding is more disruptive; rebuild only if the profile is corrupted rather than merely large.

## Case 3 revisited: certificate warnings
The scope rule (one PC, all sites) pointed at the PC rather than the sites, and "obvious first" pointed at the clock before proxies and malware. Had the issuer on the warning been an unknown authority with a correct clock, the next theory would have been interception, and the right action would have shifted from a battery to the malware procedure. The same symptom, two different causes, separated by one detail.

## Case 4 revisited: the phone
The chain was sideload, unknown app at the top of battery and data usage, exfiltration. Each screen on the phone gave a fact that supported the theory. The order of the cleanup (revoke admin, uninstall, scan, update, reset if needed, change passwords elsewhere) is the order the exam expects, and changing passwords from another device is the detail that separates a good answer from a complete one.

## Case 5 revisited: ransomware
The instinct to start restoring files is wrong while the encrypting machine is still connected. Containment, evidence preservation, notification, then recovery, then the incident report. The question "what should the technician do FIRST" on a ransomware scenario is answered by disconnecting the affected system and following the incident response policy, never by paying, and never by wiping the source before it has been examined.

## How the exam asks method questions
"A user reports X. What should the technician do FIRST?" (gather information, ask what changed, back up). "The technician has confirmed the theory. What is NEXT?" (establish a plan of action and implement). "After applying the fix, what should the technician do?" (verify full functionality and implement preventive measures, then document). "The technician cannot resolve the issue. What should be done?" (escalate).

## What to memorize
The seven steps in order; obvious theories first; eliminate shared components with details like "other users are fine"; time and load patterns mean heat or resources; contain before repair in security incidents; verify and document to finish.`,

u7l1: `## A ticket, filled in
\`\`\`
field                 example
user information      J. Rivera, Accounting, ext. 4410, Building B room 210
device information    asset A-10422, laptop model X, Windows 11 Pro 23H2, serial 7F3...
issue description     Excel closes without error when opening files from the finance share since Monday's update; local files open fine; two other users in Accounting report the same
category              Software / Office
severity              High: three users, month-end close blocked
escalation            Tier 1 collected facts; escalated to Tier 2 desktop at 09:40 per SLA
progress notes        09:45 reproduced; 10:05 rolled back update KB... on one machine, issue resolved; 10:20 applied to all three
issue resolution      Cause: update KB... conflicts with the add-in version 4.2; rollback applied; add-in update scheduled; KB article 1187 written
\`\`\`
Everything a colleague needs to pick up the ticket, and everything an auditor needs to see what was done, is present.

## Severity and priority
Severity describes impact (how many, how badly); priority describes order of work. A one-user issue that stops the CEO's board presentation may get high priority at moderate severity. The SLA ties severity to response and resolution targets: for example, critical responded to in 15 minutes and resolved in 4 hours; low responded to in a day and resolved in five.

## Escalation done right
Escalate when the fix is beyond your access or skill, when the SLA clock is at risk, or when the issue affects many users and needs a coordinated response. Escalate with the ticket complete: what was tried, what was ruled out, what the user needs and when. A ticket that says "please fix" with no notes bounces back.

## Asset records
\`\`\`
field                    why it matters
inventory list           what exists and where; audits; insurance
CMDB                     relationships: user, device, software, network, contracts; impact analysis for changes and incidents
asset tag and ID         the physical label that ties the object to its record; scanned during audits
procurement life cycle   request, approve, purchase, receive, deploy, maintain, retire, dispose; the record moves with it
warranty and licensing   expiration dates for renewals; proof for audits; which license is on which device
assigned user            accountability; off-boarding collection; theft reports
\`\`\`

## The documents, sorted by when you reach for them
- Someone starts: onboarding checklist.
- Someone leaves: off-boarding checklist (accounts disabled the same day, devices returned, access revoked, data transferred).
- A routine task: the SOP, including the custom installation procedure for a package that must be installed a specific way.
- Something bad happened: incident report.
- Who owes what response time: SLA, internal (IT to the business) or external (vendor to the organization).
- Has this been solved before: knowledge base.

## Worked scenarios
- The board wants to know how many laptops are under warranty next quarter: asset management with warranty dates.
- An engineer wants to know which servers depend on the switch being replaced: the CMDB.
- Three technicians install the finance package three different ways: a software package custom installation procedure SOP.
- A departed contractor's badge still opens the door: off-boarding checklist.
- The ISP promised four-hour response and took two days: external SLA breach; escalate through the vendor's process.

## What to memorize
Ticket fields and the three writing points; asset management fields including the CMDB and procurement life cycle; the document types with their moments; SLAs internal versus external; knowledge base first and last.`,

u7l2: `## A change request, filled in
\`\`\`
field                       example
purpose                     replace the aging core switch to remove a single point of failure
scope                       Building A core switch and its uplinks; no changes to access switches or VLANs
change type                 normal
date and time               Saturday 02:00 to 06:00, inside the monthly maintenance window; no freeze in effect
affected systems / impact   all Building A users offline for up to 30 minutes; phones down during cutover
risk analysis / level       medium: tested config in the lab; rollback is re-cabling the old switch (20 minutes)
backup plan                 running config of old and new switches exported and stored
rollback plan               if uplinks are not up by 04:00, move cables back to the old switch and restore its config
sandbox testing             new switch configured and tested with a spare access switch in the lab on Tuesday
responsible staff           network engineer implements; desktop lead verifies; manager approves rollback
peer review                 senior engineer reviewed the configuration Wednesday
approval                    change board Thursday
implementation              cable map, step order, checkpoints at 02:30, 03:30, 04:00
end-user acceptance         Monday 08:30: reception, accounting, and phones confirm; ticket closed
\`\`\`

## The three change types
\`\`\`
type        risk      approval                       examples
standard    low       pre-approved, follows an SOP    password reset, standard software install, adding a user to a group
normal      varies    assessed and board-approved     switch replacement, application upgrade, firewall rule change
emergency   high      emergency approver, documented after   patching an exploited zero-day, restoring a failed service
\`\`\`
Turning a frequent normal change into a standard change (by writing the SOP and getting it pre-approved once) is how organizations keep the change board from drowning.

## Windows and freezes
A maintenance window is the recurring agreed time when disruption is acceptable (Saturday early morning, Wednesday night). A change freeze is the opposite: a period when only emergency changes are allowed, around financial close, holidays, product launches, or audits. A question describing a change "during the end-of-quarter freeze" is testing that you know it must wait or be justified as an emergency.

## Risk and rollback, connected
The risk level decides how much rollback readiness is required. Low: undo is trivial. Medium: a tested rollback and a backup. High: a full rehearsal, a second person, a go/no-go checkpoint, and possibly a phased rollout to a pilot group before everyone. The backup plan exists so the rollback plan has something to restore.

## What goes wrong without it
- No scope: the change spreads ("while I am in there").
- No impact analysis: the wrong people are surprised.
- No rollback: a failed change becomes an outage.
- No sandbox: the first test is production.
- No peer review: one person's typo reaches every switch.
- No end-user acceptance: IT thinks it worked; users know it did not.

## Worked scenarios
- A technician wants to push a driver update to 200 laptops next Tuesday at 10 a.m.: normal change, needs impact analysis and a maintenance window, and a pilot group first.
- A critical vulnerability is being exploited and the patch is available now: emergency change; implement with the emergency approver, document after.
- Adding a printer for a new hire: standard change; follow the SOP and log it.
- The board asks "how do we undo this?": rollback plan.

## What to memorize
The request fields, the three types, windows versus freezes, risk level to rollback readiness, peer review before and end-user acceptance after, and the documented processes (rollback, backup, sandbox, responsible staff).`,

u7l3: `## The four types, drawn over a week
\`\`\`
day        full-plus-incremental                full-plus-differential               synthetic full
Sunday     FULL (all)                           FULL (all)                           FULL (from Sunday full + last week's incrementals)
Monday     inc: changed since Sun               diff: changed since Sun              inc
Tuesday    inc: changed since Mon               diff: changed since Sun (bigger)     inc
Wednesday  inc: changed since Tue               diff: changed since Sun (bigger)     inc
Thursday   inc: changed since Wed               diff: changed since Sun (biggest)    inc
restore Fri  Sun + Mon + Tue + Wed + Thu (5)    Sun + Thu (2)                        Sun synthetic + Mon..Thu (5), or next synthetic
\`\`\`
Incremental: smallest nightly, longest restore chain, most fragile. Differential: growing nightly, two-set restore. Synthetic full: the backup server does the work of building a full from the chain, so restores get a recent full without a weekend of reading the source.

## Archive bit, the mechanism
Windows sets the archive attribute when a file changes. Full and incremental backups clear it after copying; differential copies files that have it but leaves it set, which is why each differential includes everything since the last full. Modern software tracks changes with block-level change journals, but the logic the exam tests is the same.

## Storage and time trade-offs
\`\`\`
scheme              nightly size   nightly time   restore sets   restore time   risk
full nightly        largest        longest        1              shortest       storage cost
full + incremental  smallest       shortest       full + n       longest        one broken link breaks the chain
full + differential growing        growing        2              short          diffs get large by week's end
synthetic full      small          short          1 or few       short          needs capable backup software
\`\`\`

## Recovery choices
In-place or overwrite restores the backup over the current data; use it when the current data is gone or wrong (a failed drive, ransomware, a bad migration). Alternative-location restore puts the backup beside the current data (a different folder, a restore VM, a sandbox) so you can compare, pick the file you need, and avoid clobbering newer work; use it for "I need last Tuesday's version" and for backup testing.

## Testing and rotation
Backup testing verifies that restores work, on a schedule (weekly sample files, quarterly full system, annual disaster rehearsal) and after every change to the backup system. Rotation schemes decide which media are reused and which are kept:
- On-site copies restore fast; off-site copies survive the building; the off-site copy should be offline or immutable so ransomware and a rogue admin cannot reach it.
- GFS: sons (daily) reused each week; fathers (weekly) reused each month; grandfathers (monthly) kept for a year or more; some are sent off-site.
- 3-2-1: three copies, two media types or systems, one off-site. A common extension adds one offline or immutable copy and zero errors on restore tests.

## Worked scenarios
- The backup window shrank and nightly fulls no longer finish: switch to full plus incremental or synthetic full.
- The helpdesk restores single files daily and hates the incremental chain: differential, or a synthetic full with fast file-level restore.
- A ransomware attack encrypted the NAS that held the backups: the backups were on-site and online; add off-site and offline copies; 3-2-1.
- An auditor asks for proof the backups work: the restore test log.
- "We need to keep month-end backups for seven years": GFS with long grandfather retention.

## What to memorize
Full, incremental, differential, synthetic full and the restore sets each needs; in-place versus alternative location; testing frequency; on-site versus off-site (offline or immutable); GFS; 3-2-1.`,

u8l1: `## Static, in numbers
\`\`\`
event                                    volts (typical)
walking across carpet, dry air           up to 35,000
walking on vinyl                         up to 12,000
sliding off a chair                      up to 18,000
felt by a person                         about 3,000 and above
damages sensitive chips                  under 100
\`\`\`
You will never feel most of the discharges that can damage a component. That is why the strap and mat are used every time, not only when you feel a spark. Low humidity multiplies the charge, so winter and air-conditioned rooms are the worst.

## The ESD kit and how to use it
1. Unplug the PC; leave the chassis on the mat.
2. Clip the mat's ground cord to a known ground (the outlet's ground through a proper cord, or the chassis).
3. Put on the wrist strap, snug to skin, and clip its cord to the mat or the chassis.
4. Keep components in antistatic bags until the moment of installation; set bags on the mat.
5. Handle boards by the edges; never touch gold contacts or pins.
6. Return removed parts to bags immediately.
No strap available: touch the unpainted chassis before and during work, avoid moving around, and stay off carpet.

## When not to ground yourself
A wrist strap makes you the easiest path to ground. Inside a power supply, a CRT, or near a charged capacitor bank, that path runs through you. Those devices are not user-serviceable; replace the power supply as a unit and leave CRTs to specialists.

## Electrical safety, the rules
- Unplug before opening; hold the power button to drain residual charge.
- Laser printer fusers are hot enough to burn for minutes after use; wait.
- Never bypass the ground prong; never use damaged cords; use a rated power strip, not a daisy chain.
- Racks and equipment are bonded to a common ground; do not remove ground straps.
- Liquid near equipment: power off at the breaker before touching anything wet.
- Cable management prevents trips, pulled connectors, and crushed cables: raceways, ties (not too tight), labels, and strain relief.
- Government regulations: workplace safety rules, electrical code, and hazardous-materials rules; the organization's safety officer and training tell you which apply.

## Lifting and moving
\`\`\`
rule                         reason
plan the route               nothing to trip on, doors propped
bend the knees, back straight  legs lift; the back does not
hold it close                 leverage on the spine
no twisting                   turn with the feet
over about 50 lb (23 kg)      two people or a cart
\`\`\`
Rack servers, UPS units (lead-acid batteries), large monitors, and printers all exceed the one-person limit.

## Fire
Electrical fires are Class C in the United States (Class E in some countries): use CO2 or a dry chemical ABC extinguisher; never water, which conducts. Pull, aim, squeeze, sweep; only fight a small fire with an exit at your back; otherwise alarm and evacuate. De-energize if it is safe. Server rooms often have clean-agent suppression; know what triggers it and how to leave the room.

## Protective equipment
Goggles for compressed air, cutting, and chemicals; an air filter mask for dust, toner, and ceiling work; gloves for sharp edges and chemicals. Compressed air outdoors or with ventilation, holding fans so they do not overspin and generate current.

## What to memorize
Strap, mat, bags, edges, humidity; no strap on high-voltage work; unplug and drain; never open a power supply; keep the ground prong; lift with the legs and get help; Class C for electrical fires; goggles and mask; cable management; regulations.`,

u8l2: `## The SDS, what it tells you
\`\`\`
section                    use
identification             what the product is and who makes it
hazards                    flammable, corrosive, toxic, irritant
composition                the chemicals inside
first aid                  eyes, skin, inhalation, ingestion responses
fire-fighting              which extinguisher, what fumes
accidental release         spill cleanup
handling and storage       ventilation, temperature, incompatibilities
exposure controls / PPE    gloves, goggles, mask
disposal                   how and where it may be discarded
\`\`\`
Every chemical product in the shop (cleaners, solvents, thermal paste, toner, batteries) has one; they are kept where technicians can read them, and the exam's answer to "how should this be handled or disposed of" is "consult the SDS."

## Disposal by item
\`\`\`
item                     hazard                              route
lithium-ion batteries    fire if punctured or shorted        battery recycling; tape terminals; never trash
lead-acid (UPS)          lead, sulfuric acid                 recycler or the UPS vendor's return program
alkaline batteries       low; some regions still restrict    local rules; recycling preferred
toner cartridges         fine dust, plastics                 manufacturer take-back or e-waste recycler
CRT monitors             lead in glass                       e-waste recycler; never trash
LCD monitors             mercury in older backlights         e-waste recycler
PCs, phones, drives      metals, data                        data destruction first, then certified e-waste recycler with a certificate
\`\`\`

## Environment targets and why
\`\`\`
factor            target                          too low                          too high
temperature       18 to 27 C (64 to 80 F)         condensation risk near cooling   shortened component life, throttling
humidity          40 to 60 percent                static discharge                 corrosion, condensation
airflow           front-to-back, unobstructed     hot spots, fan failure           dust intake
\`\`\`
Placement follows from the table: away from heat sources, windows, and water lines; racks arranged so cold air enters the front and hot air leaves the back; nothing stacked on vents; floor units off carpet and off the floor in flood-prone rooms; a thermometer and hygrometer in the room, with alerts.

## Dust
Dust blankets heatsinks and clogs fans, so temperatures rise until the machine throttles or shuts down. Clean on a schedule proportional to the environment (offices yearly, shops quarterly). Compressed air blows dust out; do it outside or with ventilation, hold fans still, keep the can upright to avoid spraying propellant. Vacuums for electronics are antistatic and low-suction; a household vacuum generates static and can pull components loose.

## Power events and the right device
\`\`\`
event            what it is                         damage                       device
surge / spike    brief over-voltage                 fried supplies and boards    surge suppressor (joule-rated)
brownout / sag   under-voltage for seconds or more  reboots, data corruption      UPS (line-interactive or online)
blackout         complete loss                      lost work, unclean shutdown  UPS with runtime for a clean shutdown
\`\`\`
A UPS also includes surge protection and, in line-interactive and online types, voltage regulation that corrects sags without draining the battery. Size it by the load's volt-amps and the minutes of runtime needed; the management cable or network card lets it shut servers down cleanly before the battery empties. Replace batteries every three to five years and test on a schedule; a UPS with a dead battery is a surge strip.

## Worked scenarios
- Lights flicker and the file server reboots when the elevator runs: brownouts; a line-interactive UPS.
- Fifty phones and laptops retired this year: data wiped, then a certified e-waste vendor with a certificate.
- A closet server room reaches 35 C every afternoon: ventilation and placement; a dedicated cooling unit; move the equipment.
- A technician swallowed a mouthful of toner dust cleaning a printer: SDS first aid; mask next time.

## What to memorize
SDS sections and purpose; disposal routes for batteries, toner, monitors, and devices; temperature 18 to 27 C, humidity 40 to 60 percent; airflow and placement; compressed air and electronics vacuums; surge suppressor for spikes, UPS for sags and outages.`,

u8l3: `## The first hour of an incident
\`\`\`
minute   action
0        stop; do not open, delete, copy, or "check" anything further
1        note the time, what you saw, and how you found it
2        secure the device physically; do not power it off if it is on (memory evidence); disconnect from the network only if the policy says so
5        report to your manager or the security lead per the incident response policy; they decide on law enforcement and legal
15       hand over to the responder; sign the chain of custody form; write your incident documentation
\`\`\`
The technician's role is to recognize, preserve, and report. Investigating on your own contaminates evidence and can expose you legally.

## Evidence handling, the vocabulary
- **Copy of the drive**: a bit-for-bit forensic image taken with a write blocker; hashes (SHA-256) computed on the original and the image and recorded, so anyone can later prove the image is exact and the original untouched. All analysis happens on a copy of the image.
- **Order of volatility**: collect what disappears fastest first: registers and cache; memory (running processes, logged-in users, network connections, decryption keys); swap and temporary files; disk; logs held on other systems; backups and archives. Powering off a suspect machine destroys the top of the list.
- **Chain of custody**: the unbroken record of every hand the evidence passed through: who, what, when, where, why, with signatures and tamper-evident seals. A gap means the evidence can be challenged.
- **Incident documentation**: the report: discovery, timeline, actions, people notified, evidence list, outcome.

## Licensing, sorted
\`\`\`
term                    meaning                                                    exam angle
valid license           entitlement matching each installation                     unlicensed copies are a violation
perpetual               paid once, use forever (updates may be limited)            versus subscription that lapses
personal-use            free or cheap for individuals only                         cannot be used in a business
corporate-use           volume, per seat, per device, or site                      the business version
open-source             source available under license terms                       still has terms; copyleft may require sharing changes
EULA                    the contract accepted at install                           defines allowed use
DRM                     technical enforcement of terms                             activation, keys, copy limits
NDA / MNDA              confidentiality contract, one-way or mutual                sign before seeing a client's systems
\`\`\`

## Regulated data, sorted
\`\`\`
data                                  examples                                        rules
credit card payment information       card numbers, expiry, security code            PCI DSS: encrypt, never store the code, restrict access
personal government-issued            SSN, passport, driver's license, tax ID         identity theft; strict handling
PII                                   name plus address, DOB, email, biometrics       privacy laws; minimize, protect, disclose breaches
healthcare data                       diagnoses, records, insurance                   HIPAA-type laws; need to know; breach reporting
data retention                        how long to keep, when to destroy               laws and policy; both early deletion and over-retention violate
\`\`\`

## Policies and their purpose
The AUP defines acceptable use, personal use, prohibited content, monitoring, and consequences; users sign it at onboarding, which is what makes enforcement possible. Regulatory and business compliance requirements are the external and internal rules the organization proves it follows (audits, evidence). Splash screens (login banners) state that the system is for authorized use only, that use is monitored, and that continuing implies consent; without the banner, monitoring evidence and prosecution are harder.

## Worked scenarios
- During a hard drive replacement a technician sees a folder of material that looks illegal: stop, do not explore, report to management per policy, preserve.
- An investigator wants memory captured before the machine is imaged: order of volatility.
- Evidence sat in an unlocked drawer for a day with no log: chain of custody failure.
- "Free for home use" utilities on 200 office PCs: personal-use license violation; buy corporate licenses or remove.
- A form asks new hires to acknowledge monitoring and acceptable use: AUP.

## What to memorize
Stop, preserve, report; image with hashes; volatility order; chain of custody; documentation. Perpetual, personal versus corporate, open-source, EULA, DRM, NDA. PCI, government IDs, PII, healthcare, retention. AUP, compliance, splash screens.`,

u8l4: `## Scenario patterns and the professional response
\`\`\`
situation                                             right response
customer is angry and blaming you                     listen fully, do not argue or get defensive, restate the issue, explain next steps
customer describes the problem vaguely                open-ended questions, then restate to confirm
customer uses the wrong technical terms               do not correct them condescendingly; translate and confirm
customer's personal documents are open                minimize, look away, mention it, do not read
you will be late                                      call before the appointment with a new time
the fix will take longer than promised                tell the customer now, give options and a new timeline
customer asks you to do something against policy      decline politely, explain, offer the sanctioned path, escalate if needed
a coworker asks about a famous customer               nothing to share; discretion
customer wants a repair you think is a waste          present repair and replacement options with costs and let them choose
your phone rings during the visit                     silence it; no personal calls, texts, or social media
\`\`\`

## Attire by environment
Formal (suit or equivalent) for executive offices, legal, finance, and client presentations. Business casual (collared shirt, slacks, closed shoes) for most offices. Site-appropriate (safety shoes, no loose clothing, high-visibility vest) for plants, warehouses, and construction. The rule is to match the environment; over- or under-dressing both cost credibility.

## Language
Jargon is fine among technicians and wrong with customers unless they use it themselves. Explain in terms of what the customer experiences and what will happen next. Avoid slang, avoid acronyms, and avoid the words that make people feel blamed ("you should have"). Confidence is calm and specific: "here is what I am going to check first."

## Clarifying, the three moves
1. Open-ended question: "What were you doing when it stopped working?" (not "Did you click something?").
2. Restate: "So the printer works from your laptop but not from the desktop, since Tuesday."
3. Verify: "Is that right? Anything else that changed around then?"
These narrow the scope, show respect, and produce the facts the troubleshooting method needs.

## Expectations and follow-through
Tell the customer what you will do, how long it will take, and when they will hear from you. If anything changes, they hear it from you before they notice. Offer options with trade-offs when a decision is theirs (repair the old machine, replace it, or wait for the next refresh). Give written documentation of the services performed. Follow up after a day or a week to confirm the fix held and they are satisfied; the follow-up is what turns a fix into trust.

## Privacy
Private material on a screen, a desk, or a printer is not yours to read, photograph, or discuss. If the repair requires seeing it (a document that will not open), say so and keep it to the minimum. If you see something that violates policy or law, the incident response lesson applies; otherwise, silence.

## Worked scenarios
- A user apologizes for "being stupid" after clicking a phishing link: reassure without judgment, then focus on the fix and the lesson.
- A customer insists the problem is the "modem" when it is the switch: do not argue the label; confirm what they observe and fix it.
- A manager asks you to reveal what a colleague's ticket said: confidentiality; refer them to the proper channel.
- The customer asks for a timeline and you do not know yet: say when you will know and what you are doing meanwhile.

## What to memorize
Attire to environment; plain language; positive and confident; listen and do not interrupt; cultural sensitivity and titles; on time or call; no distractions; never argue, dismiss, or judge; clarify with open questions and restating; discretion; set expectations, communicate status, offer options, document, follow up; private materials stay private.`,

u9l1: `## Reading a script by its extension
\`\`\`
ext    language     runs on                    interpreter                 comment   variable
.bat   batch        Windows                    cmd.exe                     REM or :: %name%
.ps1   PowerShell   Windows, also Linux/macOS  powershell / pwsh           #         $name
.vbs   VBScript     Windows (legacy)           Windows Script Host         '         name
.sh    shell        Linux, macOS               bash, zsh, sh               #         $name
.js    JavaScript   browsers, Node.js, WSH     node, browser, wscript      //        let name
.py    Python       everywhere                 python                      #         name
\`\`\`
Recognize the extension, the comment marker, and the variable style, and you can identify any snippet the exam shows.

## Three tiny scripts, the same job
Map a drive and report free space.
\`\`\`
batch (.bat):
  @echo off
  net use P: \\\\fileserver\\projects /persistent:yes
  dir P:\\ | find "bytes free"

PowerShell (.ps1):
  New-PSDrive -Name P -PSProvider FileSystem -Root \\\\fileserver\\projects -Persist
  Get-PSDrive P | Select-Object Used, Free

shell (.sh):
  #!/bin/bash
  sudo mount -t cifs //fileserver/projects /mnt/projects -o credentials=/etc/cifs.creds
  df -h /mnt/projects
\`\`\`
The exam does not ask you to write these; it asks which type they are and what they do.

## Use cases, with what the script typically does
\`\`\`
use case                        typical action
basic automation                any repeated task, scheduled with Task Scheduler or cron
restarting machines             shutdown /r /t 0 on a list of computers after patching
remapping network drives        net use or New-PSDrive at sign-in, by group
installation of applications    silent install switches (msiexec /i package.msi /qn) across machines
automated backups               robocopy or rsync on a schedule with logs
gathering information           serial numbers, installed software, free space, exported to a CSV
initiating updates              triggering Windows Update or a package manager and reporting
\`\`\`

## Where scripts go wrong
- Malware: a script is code; a .vbs or .js attachment double-clicked runs with the user's rights. "Invoice.pdf.js" is the classic. Scripts found online can carry hidden payloads. Read before running; run only from trusted sources; enable PowerShell's execution policy and sign scripts in production.
- Unintended settings changes: a registry or path typo at scale changes hundreds of machines; a script written for one Windows version behaves differently on another; running as administrator turns a mistake into damage. Test on one machine, then a pilot group; keep a rollback.
- Resource mishandling: infinite loops, unbounded recursion, opening files or browser tabs in a loop, spawning processes without waiting: memory and CPU exhaustion, browser or system crashes. Add exit conditions, limits, and logging.

## Execution policy and signing
PowerShell refuses to run scripts by default (Restricted) or requires downloaded scripts to be signed (RemoteSigned). This blocks casual malware and forces organizations to sign approved scripts. A question about "a PowerShell script will not run" often has the execution policy as the answer, and the right fix is to sign the script or set RemoteSigned by policy, not to disable the protection.

## Worked scenarios
- "A file named report.js arrived by email and the user opened it." JavaScript through the Windows Script Host: malware; incident response.
- "Two hundred machines need the same registry fix." A PowerShell script, tested on a pilot group, deployed by Group Policy or RMM.
- "The inventory script ran on a server and filled the disk with logs." Resource mishandling; add rotation and limits.

## What to memorize
The six extensions with interpreters, comments, and variables; the seven use cases; the three risks and their mitigations; execution policy and signing.`,

u9l2: `## The tools in one table
\`\`\`
tool     port(s)          what you get                          platform            notes
RDP      TCP 3389         full Windows desktop session          Windows Pro+ host   locks the console; NLA; never internet-exposed
VPN      varies           network membership through a tunnel  any                 then use RDP, shares, apps inside
VNC      TCP 5900+        shared console screen                 any                 weak native encryption; tunnel it
SSH      TCP 22           encrypted shell, tunnels, SCP/SFTP    Linux, macOS, network gear, Windows optional   keys, no root login
RMM      agent, outbound  monitoring, patching, scripts, remote control at scale   any   console is a crown jewel
SPICE    5900 range on host   VM console with audio and USB   KVM and similar hypervisors   admin use
WinRM    TCP 5985, 5986   PowerShell remoting, WS-Management    Windows             HTTPS; Kerberos in a domain
Quick Assist / MSRA   brokered   attended help with consent    Windows             user watches and approves
\`\`\`

## Attended versus unattended
Attended access means a person at the far end starts or approves the session (Quick Assist, most screen-sharing invitations); right for helpdesk support of an active user, and self-limiting because the user is present. Unattended access means an installed agent lets the technician connect any time (RMM, unattended screen-sharing agents, RDP, SSH); right for servers and managed fleets, and dangerous when the agent, its credentials, or its console are weakly protected.

## RDP hardening checklist
1. Never open 3389 to the internet; the constant scanning and brute-forcing of exposed RDP is the leading way ransomware gets into small businesses.
2. Reach RDP through a VPN or a Remote Desktop Gateway with MFA.
3. Network Level Authentication on; TLS certificate valid.
4. Strong passwords, lockout, and a restricted Remote Desktop Users group.
5. Log and review connections; disable RDP where it is not needed.

## Third-party tool categories
\`\`\`
category                    examples of use                           security notes
screen-sharing software     helpdesk remote control through a cloud broker   MFA on accounts; attended by default; inventory unattended agents
videoconferencing software  meetings, showing a screen                 no private data on shared screens; waiting rooms; not for control
file transfer software      SFTP clients, managed file transfer, sync  no plain FTP; encryption in transit and at rest; audit logs
desktop management software MDM and endpoint management platforms      admin console MFA; least privilege; patching
\`\`\`

## Security considerations, per method
- RDP: exposure, brute force, NLA, gateway, MFA.
- VPN: MFA, client patching, split tunneling policy, least-privilege network access, logging.
- VNC: weak or no encryption natively; SSH or VPN tunnel; strong password; view-only where possible.
- SSH: keys over passwords, disable root login, restrict sources, keep the server patched.
- RMM: the console can push anything to every endpoint; MFA, IP restrictions, least privilege, alerting on new scripts or mass actions, prompt patching.
- SPICE and WinRM: admin-only; HTTPS or TLS; restricted to management networks.
- Third-party: verify the vendor, control which tools are allowed, remove unused agents, and require user consent for attended sessions.

## Worked scenarios
- A user at home cannot reach the intranet; the technician must fix it while the user watches: VPN for the user, Quick Assist or attended screen-sharing for the fix.
- A managed service provider must patch 400 endpoints monthly and see their health: RMM.
- An engineer needs to reconfigure a Linux appliance: SSH with a key.
- A firewall report shows brute-force attempts on 3389 from the internet: close it, put RDP behind a VPN or gateway with MFA.
- Move a 20 GB dataset to a partner securely: SFTP or managed file transfer, not email or plain FTP.

## What to memorize
The tool table with ports; attended versus unattended; the RDP checklist; the four third-party categories; the security considerations per method.`,

u9l3: `## The objective, as a checklist
\`\`\`
topic                      the question it answers
application integration    where AI already lives in the tools we use, and what data it can reach
policy                     which tools are approved, for what, with what data, and how output is checked
appropriate use            drafting, summarizing, explaining, suggesting: yes; deciding, publishing unreviewed: no
plagiarism                 presenting AI output as original work, or reproducing others' work through it
limitations: bias          skewed outputs about people and groups, inherited from training data
limitations: hallucinations confident, fluent, false statements: commands, settings, citations
limitations: accuracy      outdated, imprecise, or subtly wrong; verify before acting
private vs public          where the data goes; enterprise or private deployments versus consumer services
data security              secrets and internal data never into public tools
data source                training data, provided documents, web results; reliability and licensing
data privacy               regulated data in prompts is a disclosure; providers may retain and review
\`\`\`

## A technician's safe workflow
1. Check the policy: is this tool approved for this task and this data class?
2. Redact: remove names, account numbers, addresses, credentials, and internal hostnames from anything pasted in.
3. Ask for a draft, a summary, an explanation, or options; not a decision.
4. Verify every fact, command, and setting against documentation or a test system before using it on production.
5. Edit and own the result; disclose AI assistance where the policy or the audience requires.
6. Log or note when AI was used for anything customer-facing or audited.

## Hallucination examples to recognize
- A PowerShell cmdlet that does not exist, with plausible parameters.
- A registry key path that looks right and is not.
- A port number stated confidently and wrongly.
- A citation to a knowledge base article or standard that was never published.
- A summary that attributes a statement to a log line that is not in the log.
The tell is fluency without evidence. The response is to verify, and to prefer tools that show their sources.

## Bias, briefly
Models learn patterns from data that reflects past decisions, including unfair ones. Outputs that rank, screen, recommend, or describe people can reproduce that unfairness quietly. Anything affecting people (hiring, access, discipline, customer treatment) requires human review and is usually restricted by policy.

## Private versus public, concretely
\`\`\`
deployment              data path                                 suitable for
public consumer service prompts leave the org; may be retained and used for training   public information only
enterprise service      contractual no-training, retention controls, logging    internal data per policy
private or on-premises  data stays inside the organization         regulated or sensitive data, if approved
\`\`\`
"Data source" matters in the other direction: a tool grounded in the organization's own documentation answers from known material; a tool drawing on the open web mixes in unknown, possibly wrong, possibly copyrighted content.

## Worked scenarios
- A technician wants help writing a knowledge base article from ticket notes that contain a customer's name and card number: redact first, use the approved tool, review before publishing.
- The AI-suggested command to "clean the temp folder" contains a wildcard that would delete a user's profile: hallucination or accuracy failure; test in a sandbox.
- A candidate-screening assistant favors one demographic: bias; stop using it for that decision; policy review.
- A colleague pastes the company's VPN configuration into a public chatbot to debug it: data security violation; report per policy, rotate any secrets included.

## What to memorize
Integration, policy, appropriate use, plagiarism; bias, hallucinations, accuracy; private versus public; data security, data source, data privacy; redact, verify, disclose.`

});
