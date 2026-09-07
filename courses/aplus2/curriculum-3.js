// APlus Academy Core 2 curriculum, units 6 to 9. Original teaching content for CompTIA A+ 220-1202.
// Lesson body mini-markup: "## " heading, "- " bullet, "1. " step, "> " exam tip, {{text}} inline code, **text** bold.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u6", n: 6, title: "Software Troubleshooting", domain: 3,
  blurb: "Windows symptoms and the repair toolbox, PC security and browser symptoms, mobile OS, application, and security problems, and worked cases that follow the troubleshooting method from symptom to documented fix.",
  assumes: "The Windows tools from Unit 2 and the security vocabulary from Units 4 and 5.",
  lessons: [
    {
      id: "u6l1", title: "Windows Symptoms: From Blue Screens to Time Drift", domain: 3, obj: "3.1", minutes: 12,
      body: `Domain 3 questions describe a symptom and ask for the most likely cause or the first sensible action. The objective lists twelve Windows symptoms. Learn each one with its usual cause and the action that fits.

## Crashes and instability
- **Blue screen of death (BSOD)**: Windows stops with a stop code. Usual causes are a bad driver, faulty RAM, failing storage, or overheating. Note the stop code, undo the last change (new driver, new hardware, new update), boot to safe mode, roll back the driver, run the memory diagnostic, check disk health. Repeated identical stop codes point at one driver or device.
- **System instability**: random freezes, crashes, and errors across programs. Suspect overheating, memory, a failing drive, corrupted system files, or malware. Check temperatures and Event Viewer, run the memory diagnostic and {{sfc /scannow}}, test with a clean boot.
- **Frequent shutdowns**: thermal protection (clogged fans, dried paste), a failing power supply, a loose power connector, or a scheduled task or policy that shuts the machine down. Check temperatures and the System log for the shutdown reason (unexpected versus requested).
- **Applications crashing**: one application crashing points at that application: update or reinstall it, check its requirements, look at the Application log and Reliability Monitor. Many applications crashing points at the system: memory, drivers, disk, or malware.

## Slowness
- **Degraded performance**: check Task Manager for the process using CPU, memory, or disk; too many startup programs; a nearly full drive; a failing drive; malware; a cryptominer; pending updates; too little RAM. Fix the specific hog, disable startup items, free space, add resources.
- **Low memory warnings**: the machine is out of physical memory and page file. Close or fix the leaking program, add RAM, let Windows manage the page file, check for malware.
- **Slow profile load**: a large or corrupted user profile, many startup items, slow scripts or drive mappings at sign-in, roaming profiles over a slow link, or a domain controller that cannot be reached. Trim the profile, fix the login script, or rebuild the profile if it is corrupted.

## Boot problems
- **Boot issues**: Windows starts to load and fails or loops. Use Startup Repair from the recovery environment, boot to safe mode, undo the last update or driver, rebuild the boot configuration.
- **No OS found**: the firmware found no bootable device. Check the boot order (a USB stick left in the port), the drive connection, whether the drive appears in firmware, and the boot record; a missing drive is a hardware failure, a present drive with a broken boot record is fixed from the recovery environment.
- **Services not starting**: a dependency failed, a bad account or password on the service, a corrupted file, or a disabled startup type. Look at the System log, check the service's dependencies and Log On tab, start it manually, set it to Automatic (Delayed Start).

## Odd but common
- **USB controller resource warnings**: "the controller does not have enough resources" appears when too many devices share a USB controller's endpoints. Move devices to another port or controller, use a powered hub, update chipset drivers.
- **Time drift**: the clock is wrong or keeps drifting. A dead CMOS battery, a wrong time zone, or a failing time sync. Replace the battery, set the zone, and resync with the time server; in a domain the PC must follow the domain controller or Kerberos logins fail.

## Reading the scenario
- Stop code after installing a new graphics driver: roll back the driver in safe mode.
- Machine restarts under load and the case is hot: thermal; clean and repaste.
- Sign-in takes six minutes and the profile is 40 GB: slow profile load; trim or rebuild.
- Certificate and domain login errors and the clock is two years behind: CMOS battery and time sync.
- "Not enough USB controller resources": redistribute devices across controllers.

> Exam tip: BSOD means driver, memory, storage, or heat; no OS found means boot order or drive; slow profile load means profile or login scripts; time drift means CMOS battery and time sync; low memory means add RAM or fix the leak; USB resource warnings mean too many devices on one controller.`,
      hook: "BSOD: driver, RAM, storage, heat; roll back, safe mode. Degraded performance: Task Manager, startup items, disk space, malware. Boot issues: Startup Repair, safe mode, undo the last change. Frequent shutdowns: heat or PSU. Services not starting: dependencies, Log On account, System log. Applications crashing: update or reinstall. Low memory: add RAM, fix leaks. USB controller resource warnings: spread devices, powered hub. No OS found: boot order, drive, boot record. Slow profile load: trim or rebuild the profile, login scripts. Time drift: CMOS battery, time zone, time sync."
    },
    {
      id: "u6l2", title: "The Windows Repair Toolbox: Safe Mode, WinRE, sfc, DISM, chkdsk, Restore, Reset, Profiles", domain: 3, obj: "3.1", minutes: 11,
      body: `Symptoms are half of domain 3; the other half is knowing which repair fits and in what order. Cheapest and least destructive first.

## The ladder, least to most destructive
1. **Reboot**: clears memory leaks, stuck services, and half-applied updates. Always first.
2. **Restart services**: services.msc, or {{net stop}} and {{net start}}; check dependencies and the Log On account.
3. **Uninstall, reinstall, or update the application**: for a single misbehaving program; also check its requirements against the machine.
4. **Roll back an update or driver**: Device Manager, driver Properties, Roll Back Driver; Settings, Update history, Uninstall updates. For problems that began right after a change.
5. **Add resources**: RAM, disk space, a faster drive, when the symptom is slowness and the cause is genuine shortage.
6. **Repair system files**: {{sfc /scannow}} checks and repairs protected Windows files; if sfc cannot repair, {{DISM /Online /Cleanup-Image /RestoreHealth}} repairs the component store sfc draws from, then run sfc again.
7. **Check the disk**: {{chkdsk /f}} fixes filesystem errors, {{chkdsk /r}} also scans for bad sectors; a drive that keeps producing errors is failing.
8. **System Restore**: return system files, registry, and drivers to an earlier restore point without touching user files.
9. **Rebuild the user profile**: when only one user has the problem: create a new profile, copy the data, remove the old one.
10. **Repair Windows**: an in-place upgrade over itself (run setup from the ISO, keep files and apps) rewrites the OS without losing data.
11. **Reset this PC**: reinstall Windows, keeping or removing personal files; removes applications.
12. **Reimage or clean install**: the sure cure and the last resort; back up first.

## Getting to the tools when Windows will not start
- **Safe mode**: Windows with minimal drivers and services; if the problem disappears, a driver, service, or startup program is the cause. Reach it from Settings, Recovery, Advanced startup; from the sign-in screen with Shift and Restart; or after three failed boots, which opens the recovery environment automatically.
- **Windows Recovery Environment (WinRE)**: Startup Repair, System Restore, Uninstall Updates, Command Prompt, System Image Recovery, Reset this PC, and firmware settings. Boot from installation media and choose Repair your computer when the local WinRE is gone.
- **Command Prompt in WinRE**: {{bootrec /fixmbr}}, {{bootrec /fixboot}}, {{bootrec /rebuildbcd}} for boot record problems; {{sfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows}} offline; {{chkdsk}}; {{diskpart}} to inspect partitions.
- **msconfig**: choose a diagnostic or selective startup, and boot to safe mode on the next restart.
- **Event Viewer and Reliability Monitor**: the System and Application logs and the crash timeline tell you what happened and when; read them before guessing.

## Which tool for which symptom
- Corrupted system files or odd errors in built-in apps: sfc, then DISM, then sfc.
- Filesystem errors, files that will not open, a drive reporting problems: chkdsk, then back up and check the drive's health.
- Problem began after an update: uninstall the update, then pause updates until the fix.
- Problem began after a driver: roll back the driver.
- One user's desktop is broken and others are fine: rebuild the profile.
- Everything is wrong and nothing above helped: repair install, then reset, then clean install.

> Exam tip: reboot first; sfc then DISM then sfc; chkdsk for the filesystem; roll back drivers and updates for problems that follow a change; System Restore keeps user files; rebuild a profile for one-user problems; safe mode isolates drivers and startup items; WinRE opens after three failed boots or from installation media.`,
      hook: "Ladder: reboot, restart services, reinstall or update the app, roll back update or driver, add resources, sfc then DISM then sfc, chkdsk, System Restore, rebuild profile, repair install, Reset this PC, reimage. Safe mode isolates drivers and startup items. WinRE: Startup Repair, restore, uninstall updates, Command Prompt (bootrec), reset; opens after three failed boots or from media. Event Viewer and Reliability Monitor first."
    },
    {
      id: "u6l3", title: "PC Security Symptoms and Browser Symptoms", domain: 3, obj: "3.4", minutes: 10,
      body: `Objective 3.4 lists what an infected or attacked PC looks like. The exam describes the symptom and asks what it indicates or what to do first; the answer usually leads into the malware removal procedure.

## Common symptoms
- **Unable to access the network**: malware changed the proxy, DNS, or hosts file, or a security tool isolated the machine, or the machine was quarantined after detection. Check proxy settings, DNS servers, and the hosts file; check whether the endpoint protection isolated it.
- **Desktop alerts**: pop-up warnings on the desktop that are not from installed software, often demanding a call to "support." Do not call; treat as malware.
- **False alerts regarding antivirus protection**: a window claiming the PC is infected and offering a scan or a purchase, from a product that was never installed. Rogue antivirus; close it, run the real scanner from a clean boot.
- **Altered system or personal files**: files changed, timestamps wrong, executables replaced. **Missing or renamed files**: ransomware renames while encrypting; other malware deletes or hides. **Inability to access files**: encrypted or permission-stripped files; check for a ransom note before doing anything else.
- **Unwanted notifications within the OS**: browser notification spam that looks like system alerts, or toast notifications from a PUP. Remove the site's notification permission and the program.
- **OS update failures**: malware often blocks Windows Update so the hole stays open; a machine that cannot update or reach update servers after other symptoms began is a security symptom, not just an update problem.

## Browser-related symptoms
- **Random or frequent pop-ups**: adware or a malicious extension; check extensions and installed programs, reset the browser.
- **Certificate warnings**: on one site, that site's certificate is expired or mismatched; on many sites, the PC's clock is wrong, a root certificate is missing, or something is intercepting HTTPS (a proxy, an on-path attacker, or malware that installed its own root certificate).
- **Redirection**: searches or typed addresses land somewhere else; caused by a changed search engine, a hijacking extension, a rogue proxy, altered DNS, or a poisoned hosts file.
- **Degraded browser performance**: too many extensions, a cryptomining script in a tab, a bloated cache, or malware; check the browser's task manager for the tab or extension eating CPU.

## The response
Recognize the symptom, then follow the seven steps: investigate and verify, quarantine (disconnect), disable System Restore, remediate (update the scanner, scan from safe mode or a preinstallation environment, remove, reset the browser, fix proxy, DNS, and hosts), schedule scans and update, re-enable System Restore, educate the user. Change passwords from a clean machine. If files were encrypted, restore from backup rather than paying.

## Reading the scenario
- "A window says the PC has 37 infections and offers a phone number." False antivirus alert; do not call; scan from clean media.
- "Every HTTPS site shows a certificate warning since yesterday." Check the clock first, then look for an intercepting proxy or a rogue root certificate.
- "The user's documents now end in .locked and there is a text file in each folder." Ransomware; disconnect, do not pay, restore from backup after cleaning.
- "Searches go to a shopping site." Redirection; remove the extension, reset the search engine, check proxy and hosts.
- "Windows Update fails every time and the antivirus is off." Malware is blocking updates; malware removal procedure.

> Exam tip: rogue alerts and false antivirus warnings are malware; renamed or inaccessible files mean ransomware; certificate warnings everywhere mean clock, root certificate, or interception; redirection means extension, proxy, DNS, or hosts; update failures with other symptoms are a security symptom. Respond with the seven-step procedure.`,
      hook: "Symptoms: unable to access the network (proxy, DNS, hosts, isolation), desktop alerts, false antivirus alerts (rogue), altered or missing or renamed or inaccessible files (ransomware), unwanted OS notifications, OS update failures. Browser: random pop-ups (adware, extensions), certificate warnings (one site versus all: clock, root certificate, interception), redirection (extension, proxy, DNS, hosts), degraded browser performance (extensions, mining tabs). Respond with the seven-step malware removal procedure."
    },
    {
      id: "u6l4", title: "Mobile OS and Application Issues", domain: 3, obj: "3.2", minutes: 10,
      body: `Phones and tablets have their own symptom list. The fixes are simpler than on a PC and the exam expects the least-destructive order: close and reopen, restart, update, clear, reinstall, reset.

## Application problems
- **Application fails to launch**: force-close it and reopen, restart the device, check for an app update and an OS update, clear the app's cache (Android), reinstall. If it needs a newer OS than the device can run, the device is the limit.
- **Application fails to close or crashes**: force-stop from the app switcher or settings, update the app, free storage and memory, reinstall; frequent crashes across many apps point at the OS or low storage.
- **Application fails to update**: not enough storage, no network or metered connection blocking large downloads, a store account problem, or an OS version below the app's minimum. Free space, connect to Wi-Fi, sign into the store, update the OS.
- **Application fails to install**: same causes plus regional or device compatibility restrictions and, on managed devices, MDM policy blocking the app or the store.

## Device problems
- **Slow to respond**: too many apps in the background, low storage (under about 10 percent free), an old OS, a failing battery throttling the CPU, or malware. Close apps, free storage, update, restart, check battery health, then scan or reset.
- **OS fails to update**: insufficient storage, low battery (most require 50 percent or a charger), no Wi-Fi, a device past its update life, or a jailbroken or rooted state that blocks updates. Charge, connect, free space; if the model is no longer supported, it is end-of-life.
- **Battery life issues**: screen brightness and timeout, apps refreshing in the background, location services, poor signal forcing the radio to work, an old battery, or malware. Check the battery usage screen for the top consumer; replace a battery below about 80 percent health.
- **Random reboots**: a failing battery, overheating, a corrupted OS update, or a bad app; update everything, remove recent apps, check battery health, factory reset as a last step, then hardware service.
- **Screen does not autorotate**: rotation lock is on (the quick-settings control), the app does not support rotation, or the accelerometer and gyroscope have failed. Check the lock first, then test in another app, then calibrate or service.

## Connectivity problems
- **Bluetooth**: turn it off and on, forget and re-pair the device, check the device is in pairing mode and within range, update the OS; audio profiles and multi-device accessories cause most confusion.
- **Wi-Fi**: toggle airplane mode, forget and rejoin the network, check the passphrase and whether the network requires a captive portal login, reset network settings, and confirm the router band and security are supported.
- **NFC**: enabled in settings, tap with the correct part of the phone (usually the back near the top), remove a thick case, check that the payment app is set as default and the card is provisioned.

## The general order
1. Close and reopen the app.
2. Restart the device.
3. Update the app and the OS.
4. Clear the app's cache and data, or reinstall the app.
5. Reset network settings, or all settings.
6. Back up and factory reset.
7. Hardware service.

> Exam tip: force-close, restart, update, reinstall, reset, in that order. Update failures are usually storage, battery, or network; battery drain has a top consumer in battery settings; no autorotate means rotation lock first; Bluetooth means forget and re-pair; Wi-Fi means forget and rejoin or reset network settings; NFC needs the right spot and no thick case.`,
      hook: "App fails to launch or crashes: force-close, restart, update, clear cache, reinstall. Fails to update or install: storage, network, store account, OS minimum, MDM policy. Slow: background apps, storage, old OS, battery. OS fails to update: storage, battery over 50 percent, Wi-Fi, end-of-life, rooted. Battery: brightness, background refresh, location, signal, battery health. Random reboots: battery, heat, bad app or update. No autorotate: rotation lock, app, sensor. Bluetooth: forget and re-pair. Wi-Fi: forget, rejoin, reset network settings. NFC: enabled, right spot, no thick case."
    },
    {
      id: "u6l5", title: "Mobile Security Concerns and Symptoms", domain: 3, obj: "3.3", minutes: 9,
      body: `A phone's security problems come from where its apps came from and what they were allowed to do. The exam lists the concerns and the symptoms; match each symptom to its likely cause and the response.

## Security concerns
- **Application source and unofficial application stores**: apps from outside the platform store (sideloaded Android packages, third-party stores) skip the store's review; they are the main route for mobile malware. Policy: official store only, and no unknown sources.
- **Developer mode**: unlocks debugging over USB and installation of test builds; useful for developers, an open door on a user's phone. It should be off unless needed, and MDM can block enrollment when it is on.
- **Root access and jailbreak**: removing the OS's restrictions to gain full control. It breaks the security model, disables updates, exposes the device to malware that can do anything, and voids most corporate compliance. Managed devices detect and block rooted or jailbroken phones.
- **Unauthorized or malicious application**: an app the user did not knowingly install, or one that does more than it claims: reads messages, records, sends premium texts, mines, or exfiltrates.
- **Application spoofing**: a fake app that imitates a real one (a bank, a game) to steal credentials or push malware; typos in the name, a different publisher, few reviews, and requests for odd permissions give it away.

## Common symptoms
- **High network traffic** and **data-usage limit notification**: something is sending or receiving constantly: malware exfiltrating, a cryptominer, a spoofed app streaming ads. Check per-app data usage.
- **Degraded response time**: malware, a miner, or too many background apps; check battery and CPU consumers.
- **Limited or no internet connectivity**: a malicious profile or VPN app redirecting traffic, a changed DNS, an MDM block after the device fell out of compliance, or simple network trouble. Check for unknown VPN configurations and profiles.
- **High number of ads**: adware, usually from a sideloaded app; pop-ups outside the browser mean an app has overlay permission.
- **Fake security warnings**: "your phone is infected, install this cleaner"; it is the malware advertising itself. Close, do not install, and check for what produced it.
- **Unexpected application behavior**: apps opening on their own, settings changing, new icons, permission prompts from apps that should not need them.
- **Leaked personal files or data**: photos, contacts, or messages appearing elsewhere; an app with excessive permissions, stalkerware, or a compromised cloud account.

## The response
1. Identify the recent change: a new app, a sideload, a profile, a link the user tapped.
2. Check installed apps and profiles; remove anything unknown, any unknown VPN or configuration profile, and any app with permissions it should not have (accessibility, device admin, overlay, SMS).
3. Run the platform's protection and a reputable antimalware app; update the OS.
4. If the device is rooted or jailbroken, or the malware persists, back up data and factory reset; re-enroll in MDM.
5. Change passwords for accounts used on the device, from another device; revoke sessions.
6. Educate: official store only, review permissions, no links from texts.

## Reading the scenario
- A user's data plan hit its limit in a week after installing a game from a website: sideloaded malware; remove, scan, reset if needed.
- The phone shows ads on the home screen: adware with overlay permission; find the app in recent installs.
- A "security alert" says to install a cleaner app: fake warning; do not install.
- The device is flagged non-compliant and cannot get mail: it is rooted, in developer mode, or missing updates.
- The banking app looks slightly different and asks for the PIN twice: application spoofing; uninstall, contact the bank, change credentials.

> Exam tip: unofficial sources, developer mode, root or jailbreak, malicious apps, and spoofed apps are the concerns. High data use, slowness, connectivity loss, ads, fake warnings, odd behavior, and leaked data are the symptoms. Remove unknown apps and profiles, check permissions, scan, update, reset if needed, change passwords, and re-enroll.`,
      hook: "Concerns: unofficial application sources and stores, developer mode, root or jailbreak (blocks updates, fails compliance), unauthorized or malicious apps, application spoofing. Symptoms: high network traffic, data-usage limit notices, degraded response, limited or no connectivity (rogue VPN or profile, MDM block), many ads (overlay permission), fake security warnings, unexpected app behavior, leaked personal data. Response: remove unknown apps and profiles, check permissions, scan, update, factory reset if rooted or persistent, change passwords, re-enroll."
    },
    {
      id: "u6l6", title: "Worked Software Cases: Five Complete Walkthroughs", domain: 3, obj: "3.1", minutes: 12,
      body: `Domain 3 questions are scenarios. This lesson runs five of them through the troubleshooting method so the pattern becomes automatic: identify the problem (question the user, note changes, back up), establish a theory (obvious first), test it, plan and implement the fix, verify full function and prevent recurrence, document.

## Case 1: the machine that blue-screens every afternoon
A workstation shows a stop code most afternoons. The user says nothing changed. Event Viewer shows the crash follows a spike in CPU temperature logged by the vendor's utility; the case is on carpet with the intake blocked. Theory: thermal. Test: run a stress test with the side panel off and a fan blowing; no crash. Fix: clean the heatsink, replace the thermal paste, raise the case off the carpet. Verify: a week without crashes. Document: the cause, the fix, and a note to check dust on the annual visit. Lesson: "nothing changed" includes the environment; the log tells you the time pattern.

## Case 2: the profile that takes ten minutes to load
One user's sign-in takes ten minutes; other users on the same PC sign in quickly. That rules out the machine and the network and points at the profile. The profile folder is 60 GB, mostly a synced cloud folder that was set to keep everything offline plus a browser cache in the roaming portion. Theory: an oversized profile with roaming data. Fix: move the cloud folder to files-on-demand, exclude the browser cache from roaming, and clean the temp folders; if the profile is also corrupted, create a fresh profile and migrate the data. Verify: sign-in under a minute. Document and add a knowledge base article, because this will happen again.

## Case 3: the laptop with certificate warnings everywhere
Every HTTPS site warns of an invalid certificate on one laptop only. Establish the obvious theory first: the clock. It reads a date three years ago; the CMOS battery is dead and the laptop was unplugged for weeks. Set the time, sync with the time server, and the warnings vanish. Plan the battery replacement. Had the clock been right, the next theories are a missing root certificate update and an intercepting proxy or malware root certificate; check the certificate issuer shown in the warning. Document the fix; the user learns that the clock matters.

## Case 4: the phone whose battery dies by noon
An Android phone's battery lasts until noon after the user "installed a wallpaper app from a link." Battery settings show an unknown app at the top of usage; data usage shows the same app sending gigabytes. Theory: sideloaded malware. Fix: uninstall the app (revoking its device admin permission first if it resists), remove unknown sources, run the platform protection scan, update the OS; if it persists or the phone is rooted, back up and factory reset. Change the passwords for the accounts on the phone from another device. Verify: battery lasts the day, data usage normal. Educate: official store only.

## Case 5: the shared folder nobody can open since Tuesday
Users report files in the finance share renamed with a strange extension and a text file in every folder. This is ransomware, and the first move is containment, not repair: disconnect the machine that owns the file locks (find it from the file server's open files) and any machine showing the same note, disable the affected user's account, and alert management and the security lead per the incident response policy. Preserve evidence: do not wipe the source machine yet. Recover: restore the share from the last clean backup after confirming it is clean; rebuild the source machine from an image. Verify: files open, monitoring shows no further encryption. Document as an incident report, and the follow-up is the missing patch or the phishing email that started it.

## The pattern
1. Ask what changed and when; read the logs; back up before changing anything.
2. Start with the obvious theory (clock, cable, recent install, storage space).
3. Test the theory in a way that proves or disproves it.
4. Fix the cause, not the symptom; escalate when it is beyond your scope.
5. Verify with the user; prevent recurrence.
6. Write it down: ticket, knowledge base, incident report when it was security.

> Exam tip: questions ask for the FIRST or NEXT step. Identify the problem comes before any change; obvious theories before exotic ones; containment before repair in a security incident; verification and documentation always finish the job.`,
      hook: "Method: identify (question the user, note changes, back up), theory (obvious first), test, plan and implement, verify and prevent, document. Cases: afternoon BSOD was thermal; ten-minute sign-in was an oversized roaming profile; certificate warnings everywhere was a dead CMOS battery clock; noon battery death was sideloaded malware; renamed files in the share was ransomware, contain first, restore from backup, incident report."
    }
  ]
});

FRA.units.push({
  id: "u7", n: 7, title: "Documentation, Change, and Backups", domain: 4,
  blurb: "The paperwork that keeps IT running: tickets, asset records, the documents every shop needs, change management from request to acceptance, and backup types, recovery, testing, and rotation.",
  assumes: "Nothing beyond the earlier units.",
  lessons: [
    {
      id: "u7l1", title: "Ticketing, Asset Management, and Documentation", domain: 4, obj: "4.1", minutes: 10,
      body: `Documentation questions look easy and are missed on details: what goes in a ticket, what an asset record holds, and which document does which job. Learn the lists.

## Ticketing systems
A ticket is the record of one issue from report to resolution. Fields the exam names:
- **User information**: who, contact details, location, department.
- **Device information**: asset tag, model, OS, serial number.
- **Description of issues**: what happened, when, what changed, error text, how many people are affected.
- **Categories**: hardware, software, network, access, and so on; drives routing and reporting.
- **Severity**: how bad and how wide (one user versus a whole site; inconvenience versus work stopped); sets response time under the SLA.
- **Escalation levels**: tier 1 (helpdesk), tier 2 (desktop or systems), tier 3 (engineers and vendors); a ticket moves up when the current tier cannot resolve it or the SLA clock demands.
- **Clear, concise written communication** in three places: the **issue description** (facts, not guesses), **progress notes** (what was tried, results, time stamps, so the next person does not repeat it), and the **issue resolution** (the cause and the fix, written so it can become a knowledge base article).

## Asset management
- **Inventory lists**: every device, its location, and its state.
- **Configuration management database (CMDB)**: the database of assets and how they relate: this laptop belongs to this user, runs this OS, connects to this switch, is covered by this contract. Tickets and changes link to CMDB items.
- **Asset tags and IDs**: the label and number that tie the physical object to its record; barcodes and RFID make audits fast.
- **Procurement life cycle**: request, approval, purchase, receipt, deployment, maintenance, retirement, disposal; the asset record follows every stage.
- **Warranty and licensing**: expiration dates, support contracts, and which license is assigned to which device, so renewals happen and audits pass.
- **Assigned users**: who has it; the field that answers "where is the laptop?" and "what did the departing employee have?"

## Types of documents
- **Incident reports**: what happened in a security or safety event, when, who was involved, what was done; feeds the incident response process.
- **Standard operating procedures (SOPs)**: step-by-step instructions for routine tasks so results are consistent. Example the objective names: a **software package custom installation procedure**, the exact settings and steps to install a package the organization's way.
- **New user or onboarding setup checklist**: accounts, groups, mail, device, licenses, badge, training; nothing forgotten.
- **User off-boarding checklist**: disable accounts, revoke access and tokens, collect devices and badges, forward mail, transfer files, remove from licenses; the security checklist for departures.
- **Service-level agreements (SLAs)**: the promised response and resolution times and availability. **Internal** SLAs between IT and the business; **external or third-party** SLAs with vendors and providers (the ISP promises 99.9 percent uptime and four-hour response).
- **Knowledge base and articles**: the searchable library of resolutions and how-tos; every solved ticket with a reusable fix should become an article, and the knowledge base is the first place to look.

## Reading the scenario
- A ticket says "computer broken" and nothing else: the issue description needs facts (what, when, error, changes).
- Two technicians tried the same fix an hour apart: missing progress notes.
- Nobody knows which laptops are out of warranty: asset management with warranty dates.
- A departed employee's VPN still works: no off-boarding checklist.
- The vendor took two days to respond to a critical outage: check the external SLA.

> Exam tip: tickets hold user, device, description, category, severity, escalation, and clear notes; the CMDB relates assets; asset tags tie objects to records; SOPs make tasks repeatable; onboarding and off-boarding checklists cover accounts and equipment; SLAs set response and resolution times; the knowledge base stores reusable fixes.`,
      hook: "Ticket: user info, device info, issue description, category, severity, escalation level, clear written issue description, progress notes, resolution. Asset management: inventory lists, CMDB, asset tags and IDs, procurement life cycle, warranty and licensing, assigned users. Documents: incident reports, SOPs (software package custom installation procedure), onboarding checklist, off-boarding checklist, SLAs (internal, external), knowledge base articles."
    },
    {
      id: "u7l2", title: "Change Management", domain: 4, obj: "4.2", minutes: 10,
      body: `Change management is how organizations make changes without surprises. The exam asks what belongs in a change request, what the types of change are, and what to do before, during, and after.

## Documented business processes
Before a change is proposed, the organization already has:
- **Rollback plan**: exactly how to undo the change if it fails, tested in advance, with the point at which rollback is triggered.
- **Backup plan**: a backup taken before the change so rollback has something to return to, and a verified way to restore it.
- **Sandbox testing**: the change is tried in an isolated test environment (a VM, a lab, a pilot group) before production.
- **Responsible staff members**: who implements, who approves, who verifies, who is on call; names, not departments.

## The change request
- **Request forms**: the standard form every change starts with.
- **Purpose of the change**: why; the business reason.
- **Scope of the change**: what is included and what is not; which systems, sites, and users.
- **Change type**:
  - **Standard change**: routine, low risk, pre-approved, follows an SOP (a password reset, a standard software install); logged but not individually reviewed.
  - **Normal change**: anything else; goes through assessment and change board approval on a schedule.
  - **Emergency change**: must happen now to restore service or close a security hole; approved by an emergency process and documented afterward.
- **Date and time of change**: scheduled inside a **maintenance window** (the agreed time when disruption is acceptable), and never during a **change freeze** (a period, such as year-end or a product launch, when no non-emergency changes are allowed).
- **Affected systems and impact**: what will be down or different, for whom, for how long.
- **Risk analysis** and **risk level**: what could go wrong and how likely and severe; low, medium, high; the level sets the approval path and the rollback readiness.
- **Change board approvals**: the change advisory board reviews normal changes, checks conflicts with other changes, and approves, rejects, or reschedules.
- **Implementation**: the technical steps, the order, who does each, and the checkpoints where rollback is decided.
- **Peer review**: another qualified person reviews the plan (and configuration or code) before implementation.
- **End-user acceptance**: after the change, the people who use the system confirm it works for them; the change closes only then.

## The order
1. Request with purpose, scope, type, schedule, impact, and risk.
2. Backup and rollback plans written; sandbox test done.
3. Peer review; change board approval (or standard pre-approval, or the emergency path).
4. Implement in the maintenance window with the responsible staff.
5. Verify; end-user acceptance.
6. Document the result; update the CMDB and the knowledge base.

## Reading the scenario
- A firewall rule change on Friday at noon took the sales site down: no maintenance window, probably no impact analysis.
- A patch failed and nobody could undo it: no rollback plan or backup.
- A routine printer install needs a form and board review every time: make it a standard change.
- A zero-day patch cannot wait for next week's board: emergency change, documented after.
- The board asks what happens if the change fails: risk analysis and rollback plan.

> Exam tip: rollback plan, backup plan, sandbox testing, responsible staff. Request form with purpose, scope, type (standard, normal, emergency), date and time (maintenance window, not a freeze), affected systems, risk analysis and level, board approval, implementation, peer review, end-user acceptance.`,
      hook: "Processes: rollback plan, backup plan, sandbox testing, responsible staff members. Request: purpose, scope, change type (standard pre-approved, normal reviewed, emergency now and documented after), date and time (maintenance window, change freeze), affected systems and impact, risk analysis and risk level, change board approval, implementation, peer review, end-user acceptance."
    },
    {
      id: "u7l3", title: "Backup and Recovery", domain: 4, obj: "4.3", minutes: 11,
      body: `Backups are the answer to ransomware, failed drives, bad changes, and deleted files. The exam tests the backup types, what it takes to restore from each, testing, and rotation schemes.

## Backup types
The archive bit (or a change log) marks a file as changed since its last backup; the types differ in what they copy and whether they clear that mark.
- **Full**: copies everything and clears the marks. Simplest restore (one set), longest to run, most storage.
- **Incremental**: copies only what changed since the last backup of any type, and clears the marks. Fastest and smallest each night. Restore needs the last full plus every incremental since, in order; one missing set breaks the chain.
- **Differential**: copies what changed since the last **full**, and does not clear the marks, so each differential grows through the week. Restore needs the last full plus only the latest differential.
- **Synthetic full**: the backup software builds a new full backup on the backup server by combining the last full with the incrementals since, without reading the whole source again. Gives the easy restore of a full without the load of taking one.

## Restore math
- Full Sunday, incrementals Monday to Thursday, failure Friday: restore Sunday plus Monday, Tuesday, Wednesday, Thursday (five sets).
- Full Sunday, differentials Monday to Thursday, failure Friday: restore Sunday plus Thursday (two sets).
- Incremental wins on backup speed and space; differential wins on restore simplicity and resilience.

## Recovery
- **In-place or overwrite**: restore to the original location, replacing what is there; right when the original is lost or corrupted, dangerous when the current version has changes you want.
- **Alternative location**: restore to a different folder, drive, or machine, then compare and copy what is needed; the safe default for "I need last week's version of this file" and for testing.

## Backup testing
A backup that has never been restored is a hope. Test **frequency** is set by policy: a sample file restore weekly or monthly, a full restore of a system quarterly, and a full disaster recovery exercise annually. Test after any change to the backup software, targets, or media. Verify that the backup completed, that the restored data opens, and that the time to restore fits the recovery objectives.

## Rotation schemes
- **On-site versus off-site**: on-site copies are fast to restore; off-site copies (another building, a vault, the cloud) survive fire, theft, flood, and ransomware that reaches everything on the LAN. Off-site should be offline or immutable so ransomware cannot encrypt it.
- **Grandfather-father-son (GFS)**: daily backups (sons) rotate weekly; weekly backups (fathers) rotate monthly; monthly backups (grandfathers) are kept for a year or longer. It gives recent granularity and long retention with a bounded number of media.
- **3-2-1 backup rule**: at least **3** copies of the data (production plus two backups), on **2** different media or systems, with **1** copy off-site. Many add a second 1: one copy offline or immutable.

## Reading the scenario
- "Nightly backups must finish in the shortest window." Incremental.
- "Restores must need the fewest sets." Differential (or full).
- "Provide a full backup each week without the weekend load." Synthetic full.
- "Ransomware encrypted the on-site backup drive too." Off-site and offline copy; 3-2-1.
- "Keep a year of monthly backups on limited tape." GFS.
- "The user wants last Tuesday's version without losing today's edits." Restore to an alternative location.

> Exam tip: incremental copies changes since the last backup and needs the whole chain; differential copies changes since the last full and needs full plus latest; synthetic full assembles a full from incrementals; restore in place to replace, to an alternative location to compare; test restores on a schedule; on-site for speed, off-site for disasters; GFS for daily, weekly, monthly retention; 3-2-1 is three copies, two media, one off-site.`,
      hook: "Full: everything, clears marks. Incremental: since last backup, clears marks; restore needs full plus every incremental. Differential: since last full, keeps marks, grows; restore needs full plus latest differential. Synthetic full: built on the server from full plus incrementals. Recovery: in-place overwrite versus alternative location. Test restores on a schedule. Rotation: on-site fast, off-site survives disasters (offline or immutable); GFS daily, weekly, monthly; 3-2-1 three copies, two media, one off-site."
    }
  ]
});

FRA.units.push({
  id: "u8", n: 8, title: "Safety, Environment, Policy, and Professionalism", domain: 4,
  blurb: "Working safely with electricity and static, handling the environment and disposal, responding to incidents and respecting licenses, regulated data, and policies, and communicating like a professional.",
  assumes: "Nothing beyond the earlier units.",
  lessons: [
    {
      id: "u8l1", title: "Safety Procedures", domain: 4, obj: "4.4", minutes: 9,
      body: `Safety questions have exact answers: the strap, the mat, the bag, unplug first, lift with the legs, the right extinguisher. Learn the practices and the reasoning.

## Electrostatic discharge
Static that you cannot feel (under about 3,000 volts) can still destroy a chip. Damage may be immediate or latent, where the part fails weeks later.
- **ESD straps**: a wrist strap connected to a grounded point (the chassis of an unplugged PC, or a grounded mat) keeps you at the same potential as the equipment. Never wear one when working on high-voltage parts such as a CRT or a power supply's interior, where being grounded makes a shock worse.
- **ESD mats**: a grounded mat under the work and, ideally, under your feet; parts and tools rest on it.
- **Antistatic bags**: components travel and are stored in them; set a part on top of its bag only if the bag is on a grounded mat, and never leave a part loose on a desk or carpet.
- **Proper component handling and storage**: hold cards by the edges, never touch contacts or pins, keep parts in bags until needed, store in a dry area away from heat and magnets, avoid carpet and synthetic clothing while working; touch the chassis before reaching inside if no strap is available. Humidity below about 40 percent makes static worse.
- **Equipment grounding**: the PC's third prong ties the chassis to earth so faults trip the breaker instead of electrifying the case; never defeat it with a two-prong adapter; racks and equipment in the data center are bonded to ground.

## Electrical safety
- **Disconnect power before repairing a PC**: unplug the cord; the power switch and standby leave the board live. Hold the power button afterward to drain the capacitors. Laptops: remove the battery if it is removable, or disconnect it internally per the vendor's guide.
- Power supplies, CRT monitors, and laser printer fusers hold dangerous voltages or heat; do not open a power supply; wait for a fuser to cool.
- **Cable management**: no cables across walkways; use ties, raceways, and covers; strain relief on racks; tripping and pulled connectors are the common injuries and outages.
- **Compliance with government regulations**: workplace safety rules (OSHA in the United States), electrical codes, and hazardous-materials rules apply; the organization's safety officer and SDS documentation tell you what they require.

## Personal safety
- **Lifting techniques**: bend the knees, keep the back straight, hold the load close, and get help or a cart for anything heavy (the usual guideline is around 50 pounds or 23 kilograms for one person); servers, UPS units, and CRT monitors are heavier than they look.
- **Fire safety**: an electrical fire needs a Class C extinguisher (CO2 or dry chemical) in the United States; never water on electrical equipment. Know the exits and the alarm; unplug if it is safe.
- **Safety goggles**: when using compressed air, cutting, or working with chemicals or batteries.
- **Air filter mask**: when blowing dust out of equipment, handling toner, or working in dusty ceilings and floors.

## Reading the scenario
- Installing RAM at a carpeted desk in winter: wrist strap, mat, hold by the edges.
- A technician is about to open a power supply to replace a fan: do not; replace the unit.
- A smoking UPS: Class C extinguisher, unplug if safe, evacuate and alarm.
- Moving a 40-kilogram server alone: get help or a lift.
- Cleaning a dusty PC with compressed air: goggles and mask, outside or in ventilated space.

> Exam tip: ESD strap and mat and antistatic bags; hold parts by the edges; unplug before repair and drain the capacitors; never open a power supply; third prong stays; lift with the legs and get help; Class C for electrical fires; goggles and mask for dust and chemicals; manage cables; follow regulations.`,
      hook: "ESD: wrist strap grounded, ESD mat, antistatic bags, handle by the edges, low humidity worsens static, never strap on high-voltage work. Electrical: unplug before repair, drain capacitors, never open a power supply, equipment grounding (third prong), cable management, government regulations. Personal: lifting with the legs and help for heavy loads, Class C extinguisher for electrical fires, safety goggles, air filter mask."
    },
    {
      id: "u8l2", title: "Environmental Impacts and Controls", domain: 4, obj: "4.5", minutes: 8,
      body: `This objective covers what equipment does to the environment and what the environment does to equipment. Short, factual, and tested with direct questions.

## Documentation for handling and disposal
- **Material safety data sheet (MSDS)**, now called a safety data sheet (SDS): the manufacturer's document for any chemical or hazardous product (toner, cleaning solvents, batteries, thermal paste) listing hazards, handling, first aid, spill response, and disposal. Consult it before handling and keep it accessible.
- **Proper battery disposal**: lithium-ion, lithium, nickel-cadmium, and lead-acid batteries never go in the trash; they go to battery recycling or hazardous waste collection, with terminals taped to prevent shorts and fires.
- **Proper toner disposal**: cartridges go back to the manufacturer's recycling program or an e-waste recycler; toner dust is an irritant, so avoid breathing it and clean spills with a toner-rated vacuum.
- **Proper disposal of other devices and assets**: monitors (mercury in older backlights, lead in CRTs), PCs, UPS units (lead-acid), and phones are e-waste; recycle through certified vendors, after data destruction, with records. Local regulations govern; landfill is not an option.

## Temperature, humidity, and ventilation
- Equipment rooms aim for roughly 18 to 27 degrees Celsius (64 to 80 Fahrenheit) and 40 to 60 percent relative humidity. Too hot shortens component life; too humid corrodes and condenses; too dry raises static.
- **Location and equipment placement**: away from windows, heaters, water pipes, and dust; airflow front to back in racks with hot and cold aisles; do not stack devices that block each other's vents; keep floor units off carpet.
- **Dust cleanup**: dust insulates and clogs fans; clean on a schedule with **compressed air** (outdoors or with ventilation, holding fans still so they do not overspin) or a **vacuum** rated for electronics (ordinary vacuums generate static); wear a mask and goggles.

## Power problems
- **Power surges**: brief voltage spikes from lightning, grid switching, or large motors; they destroy power supplies and boards.
- **Brownouts** (under-voltage events): sags in voltage that make equipment reboot, corrupt data, and stress power supplies.
- **Blackouts**: complete loss of power; unsaved work is lost and unclean shutdowns corrupt files.
- **Surge suppressor**: clamps spikes; rated in joules; protects against surges only, not sags or outages; replace after a major surge and every few years, since the protective components wear out. A power strip without a joule rating is not a suppressor.
- **Uninterruptible power supply (UPS)**: a battery that carries the load through brownouts and short blackouts and lets systems shut down cleanly during long ones; also conditions power and includes surge protection; sized by the load in volt-amps and the runtime needed; batteries are replaced every three to five years. Servers, network gear, and any workstation that must not lose work get a UPS.

## Reading the scenario
- A technician does not know whether a cleaning spray is safe near a live server: read the SDS.
- Old UPS batteries in the dumpster: lead-acid must be recycled.
- PCs in a dusty workshop overheat: scheduled dust cleanup and better placement.
- Lights dim and the server reboots when the compressor starts: brownouts; a UPS with power conditioning.
- A storm fried three power supplies: surge suppressors, and a UPS for the important machines.

> Exam tip: SDS for chemicals; batteries and toner and e-waste are recycled, never trashed; keep rooms cool, moderately humid, dust-free, and ventilated; compressed air and electronics-rated vacuums; surge suppressor for spikes only, UPS for brownouts and blackouts plus clean shutdown.`,
      hook: "SDS (MSDS) for handling and disposal; recycle batteries (tape terminals), toner, and other e-waste through certified programs. Temperature 18 to 27 C, humidity 40 to 60 percent, ventilation, placement away from heat, water, dust; dust cleanup with compressed air or an electronics vacuum, mask and goggles. Surges (spikes), brownouts (sags), blackouts (loss). Surge suppressor clamps spikes only; UPS bridges sags and outages and allows clean shutdown."
    },
    {
      id: "u8l3", title: "Incident Response, Licensing, Regulated Data, and Policies", domain: 4, obj: "4.6", minutes: 11,
      body: `When a technician finds prohibited content or activity, or handles licensed software and regulated data, the right move is procedural. The exam tests the procedures and the definitions.

## Incident response
When you find evidence of a crime, prohibited content, or a policy violation on a system:
1. Stop and do not alter the system; do not browse further, delete, or "clean up."
2. **Inform management or law enforcement as necessary**, following the incident response policy; the technician reports, and management decides on law enforcement.
3. Preserve evidence. Take a **copy of the drive**: a forensic image made with a write blocker, with hashes recorded before and after so **data integrity and preservation** can be proven. Work from the copy, never the original.
4. Respect the **order of volatility**: capture the most perishable evidence first: CPU registers and cache, memory (running processes, network connections), then temporary files and swap, then disk, then remote logs and backups, then archival media. Pulling the plug destroys the memory evidence.
5. Maintain the **chain of custody**: a log of who collected, handled, transported, and stored each piece of evidence, when, and why, with signatures; any gap makes the evidence unusable.
6. **Incident documentation**: what was found, when, by whom, what was done, who was notified; the incident report.

## Licensing, DRM, and EULAs
- **Valid licenses**: every installed copy must have a license the organization can show; unlicensed software is a legal and security risk.
- **Perpetual license agreement**: a one-time purchase that does not expire, as opposed to a subscription that must be renewed.
- **Personal-use versus corporate-use license**: "free for personal use" software is not licensed for business; corporate licensing is priced per seat, per device, or per site (a volume license).
- **Open-source license**: source code available and free to use and modify under the license's terms; some (copyleft) require sharing changes; check the terms before embedding it in products.
- **Digital rights management (DRM)** enforces license terms technically; the **end-user license agreement (EULA)** is the contract the user accepts at install.
- **Non-disclosure agreement (NDA)** and **mutual NDA (MNDA)**: contracts that bind one party, or both, to keep the other's confidential information private; technicians often sign one before seeing a client's systems.

## Regulated data
- **Credit card payment information**: governed by the payment card industry's standard (PCI DSS): no storing the security code, encrypt card numbers, restrict access.
- **Personal government-issued information**: Social Security and national identification numbers, passport and driver's license numbers; the highest identity-theft value.
- **PII** (personally identifiable information): anything that identifies a person, alone or combined: name with address, date of birth, email, biometric data; protected by privacy laws that vary by jurisdiction.
- **Healthcare data**: protected health information under healthcare privacy law (HIPAA in the United States); access on a need-to-know basis, breaches reported.
- **Data retention requirements**: laws and policies say how long data must be kept and when it must be destroyed; keeping too long and deleting too early are both violations.

## Policies
- **Acceptable use policy (AUP)**: what users may and may not do with company systems: personal use, prohibited content, monitoring, consequences; users sign it.
- **Regulatory and business compliance requirements**: the external laws and standards and the internal rules the organization must follow, with audits to prove it.
- **Splash screens**: the login banner stating that the system is for authorized use, that activity is monitored, and that use implies consent; it supports prosecution and policy enforcement.

## Reading the scenario
- A technician finds illegal images on a user's PC during a repair: stop, do not touch, report to management per policy, preserve the system.
- Which to collect first from a running suspect machine: memory (order of volatility).
- Evidence was handed around without records: chain of custody broken.
- A free home antivirus installed on office PCs: personal-use license violation.
- A spreadsheet of customer card numbers with security codes: PCI violation; stop storing the codes.
- Users claim they did not know monitoring was allowed: AUP and splash screen.

> Exam tip: report, do not alter, image the drive with hashes, capture volatile evidence first, keep the chain of custody, document. Perpetual versus subscription, personal versus corporate, open-source, NDA. Card data, government IDs, PII, healthcare data, retention rules. AUP, compliance, splash screens.`,
      hook: "Incident response: do not alter, inform management or law enforcement per policy, copy the drive with hashes (integrity and preservation), order of volatility (memory first, then disk, then backups), chain of custody, incident documentation. Licensing: valid licenses, perpetual versus subscription, personal-use versus corporate-use, open-source, DRM and EULA, NDA and MNDA. Regulated data: credit card (PCI DSS), government-issued IDs, PII, healthcare (HIPAA), retention requirements. AUP, compliance requirements, splash screens."
    },
    {
      id: "u8l4", title: "Communication and Professionalism", domain: 4, obj: "4.7", minutes: 9,
      body: `Professionalism questions describe a situation with a customer and ask for the best response. The answers follow a consistent set of rules; the trick is choosing the answer that is both courteous and effective.

## Appearance and language
- **Present a professional appearance and wear appropriate attire**, matching the environment: **formal** in a law office or executive suite, **business casual** in most offices, and whatever the site's safety rules require in a plant.
- **Use proper language and avoid jargon, acronyms, and slang** when it does not help the listener. "The DNS resolver is timing out" becomes "the computer cannot look up website addresses right now."
- **Maintain a positive attitude and project confidence**, even when the problem is hard: "I have seen this before; let me work through it" rather than sighing.

## Listening and respect
- **Actively listen and avoid interrupting the customer**; take notes; restate what you heard.
- **Be culturally sensitive**; **use appropriate professional titles and designations** (Doctor, Professor, Officer) when applicable; respect customs about personal space, eye contact, and forms of address.
- **Be on time**, and **if late, contact the customer** before the appointment time, with a new estimate.
- **Avoid distractions**: no **personal calls**, no **texting or social media**, no **personal interruptions** from coworkers while with the customer; silence the phone.

## Difficult customers and situations
- **Do not argue with the customer or be defensive**; the goal is the fix, not winning.
- **Avoid dismissing customer issues**; what seems minor to you stopped their work.
- **Avoid being judgmental** about what they did ("everyone clicks a link sometimes").
- **Clarify customer statements**: ask **open-ended questions** to narrow the scope ("what were you doing when it stopped?"), **restate the issue** ("so the printer works from your laptop but not the desktop?"), and verify understanding before acting.
- **Use discretion and professionalism when discussing experiences and encounters**: no stories about customers on social media or with other customers; no naming names.

## Expectations and follow-through
- **Set and meet expectations and timelines, and communicate status**: say how long, what happens next, and update when it changes.
- **Offer repair or replacement options** when there is a choice, with costs and trade-offs, and let the customer decide.
- **Provide proper documentation** of the services performed: what was done, what was replaced, what to watch for.
- **Follow up with the customer at a later date** to verify the fix held and they are satisfied.

## Confidential and private materials
**Appropriately handle customers' confidential and private materials**, wherever they are: on the computer (do not open files that are not part of the repair, look away from open documents), on the desk (do not read papers), on the printer (do not read or take output). If you must see private data to do the job, say so and minimize it. Report anything illegal per policy; otherwise, it is none of your business.

## Reading the scenario
- The customer is angry and blames you for a slow network: listen without interrupting, do not argue, restate the issue, explain the next steps.
- You will be 20 minutes late: call before the appointment time.
- A user asks what an "SSID" is: explain in plain words.
- The repair will take two days rather than the promised one: update the customer now with the new timeline and options.
- Payroll spreadsheets are open on the screen you need: minimize them and mention it; do not read.
- A coworker asks about the celebrity whose laptop you fixed: nothing to share.

> Exam tip: dress for the environment, plain language, positive attitude, listen without interrupting, cultural sensitivity and titles, be on time or call ahead, no distractions, no arguing, no dismissing, no judging, open-ended questions and restating, discretion, set expectations and communicate status, offer options, document, follow up, and never touch private materials.`,
      hook: "Appearance: match the environment (formal, business casual). Plain language, no jargon; positive attitude and confidence. Actively listen, do not interrupt; culturally sensitive, proper titles; on time or call ahead; no personal calls, texting, social media, interruptions. Difficult customers: do not argue or be defensive, do not dismiss or judge, clarify with open-ended questions and restating, discretion about encounters. Set expectations and timelines, communicate status, offer repair or replacement options, document services, follow up. Handle confidential materials on computers, desks, and printers appropriately."
    }
  ]
});

FRA.units.push({
  id: "u9", n: 9, title: "Scripting, Remote Access, and AI", domain: 4,
  blurb: "Script file types and what scripts are used for, the remote access tools and the security each one needs, and the basics of using AI responsibly at work.",
  assumes: "The command-line lessons from Units 2 and 3.",
  lessons: [
    {
      id: "u9l1", title: "Scripting Basics", domain: 4, obj: "4.8", minutes: 9,
      body: `The scripting objective is about recognizing script types, knowing what technicians automate with them, and understanding how a script can do harm. It is not a programming test.

## Script file types
- **.bat**: a Windows batch file, run by the Command Prompt interpreter; the oldest Windows scripting; commands as you would type them, with variables like {{%USERNAME%}}, {{if}}, {{for}}, and {{goto}}.
- **.ps1**: a PowerShell script; the modern Windows automation language with cmdlets ({{Get-Service}}, {{Set-ItemProperty}}), objects, and access to everything in Windows and Microsoft cloud services. Execution policy blocks unsigned scripts by default.
- **.vbs**: VBScript, run by the Windows Script Host; legacy, common in old login scripts; being retired from Windows, and a frequent malware carrier.
- **.sh**: a shell script for Linux and macOS (bash, zsh, sh); commands plus variables, loops, and conditionals; needs the execute bit ({{chmod +x}}) and starts with a shebang line such as {{#!/bin/bash}}.
- **.js**: JavaScript; runs in browsers and, with Node.js, on servers and desktops; used for web automation and by some management tools; also a malware vector when run through the Windows Script Host.
- **.py**: Python; cross-platform, readable, huge library support; the general-purpose choice for automation, data gathering, and tooling.

## A little syntax to recognize
- Comments: {{REM}} or {{::}} in batch, {{#}} in PowerShell, shell, and Python, {{'}} in VBScript, {{//}} in JavaScript.
- Variables: {{set name=value}} and {{%name%}} in batch; {{$name}} in PowerShell and shell; plain {{name = value}} in Python.
- Loops and conditionals exist in all of them; a script that repeats an action over a list of computers is the classic use.
- Environment variables ({{PATH}}, {{USERPROFILE}}, {{HOME}}) are read by scripts to find things without hard-coding paths.

## Use cases for scripting
- **Basic automation**: any repeated task, done the same way every time.
- **Restarting machines**: a scheduled or on-demand reboot of many PCs after patches.
- **Remapping network drives**: login scripts that map drives and printers by group.
- **Installation of applications**: silent installs with the right options on many machines.
- **Automated backups**: copy or sync jobs on a schedule with logging.
- **Gathering of information and data**: inventory (serials, installed software, disk space) collected from every machine into a report.
- **Initiating updates**: triggering OS or application updates and reporting results.

## Other considerations
- **Unintentionally introducing malware**: a script copied from the internet, or an attachment named "invoice.vbs," can be malware; read scripts before running them, run only from trusted sources, and sign them.
- **Inadvertently changing system settings**: a script runs with the rights of the person launching it; a typo in a path or a registry key, or a script written for a different OS version, can change or delete the wrong thing at scale. Test in a sandbox and on one machine first.
- **Browser or system crashes due to mishandling of resources**: a loop that never ends, a script that opens thousands of files or windows, or one that spawns processes without closing them exhausts memory and CPU. Add limits, close what you open, and log.

## Reading the scenario
- "A file ending in .ps1 was emailed to users." PowerShell script; a likely phishing payload.
- "Map the P: drive for everyone in Accounting at sign-in." A login script or Group Policy drive map.
- "Collect the serial number and free disk space from 300 PCs." A gathering script in PowerShell or Python.
- "A script meant to clean temp folders deleted user documents." Inadvertent settings change from a wrong path; test first.
- "The browser froze after a script opened tabs in a loop." Resource mishandling.

> Exam tip: .bat batch, .ps1 PowerShell, .vbs VBScript, .sh shell, .js JavaScript, .py Python. Use cases: automation, restarts, drive mapping, installs, backups, information gathering, updates. Risks: malware, unintended settings changes, crashes from resource mishandling; read, test, and limit scripts.`,
      hook: ".bat batch (Command Prompt), .ps1 PowerShell, .vbs VBScript (legacy, malware vector), .sh shell (needs execute bit and shebang), .js JavaScript, .py Python. Uses: basic automation, restarting machines, remapping network drives, application installation, automated backups, gathering information, initiating updates. Considerations: unintentionally introducing malware, inadvertently changing system settings, crashes from mishandled resources; read, test in a sandbox, sign, and limit."
    },
    {
      id: "u9l2", title: "Remote Access Technologies", domain: 4, obj: "4.9", minutes: 10,
      body: `Remote access lets a technician fix a machine without traveling and lets users work from anywhere. The exam asks which tool fits a scenario and what security each one needs.

## Methods and tools
- **RDP** (Remote Desktop Protocol): a full Windows desktop session over TCP port 3389. The host must be Windows Pro or higher with Remote Desktop enabled and the user in the Remote Desktop Users group. The interactive user is locked out while the remote session runs. Security: never expose 3389 to the internet; reach it through a VPN or a gateway, use network level authentication, strong passwords, and MFA.
- **VPN** (virtual private network): an encrypted tunnel from the client to the company network so the remote machine behaves as if it were in the office; then RDP, file shares, and internal applications work. Client-to-site for users; site-to-site between offices. Security: MFA, current client software, split-tunneling decisions, and least-privilege access on the far side.
- **VNC** (virtual network computing): cross-platform screen sharing on TCP port 5900, sharing the actual console rather than a separate session, so the user sees what the technician does. Many implementations lack strong encryption; tunnel it through SSH or a VPN and set a strong password.
- **SSH** (Secure Shell): encrypted command-line access on TCP port 22, standard for Linux, macOS, and network devices; also tunnels other protocols and transfers files (SCP, SFTP). Security: key-based authentication, disable root login, restrict source addresses.
- **RMM** (remote monitoring and management): the agent-based platform managed service providers and IT departments use to monitor health, push patches and scripts, and open remote control sessions to many machines from one console. Security: the RMM has administrator rights on every endpoint, so its console needs MFA, least privilege, and patching; compromised RMMs have been used to push ransomware.
- **SPICE** (Simple Protocol for Independent Computing Environments): the remote display protocol for virtual machines on KVM and other Linux hypervisors, giving console access with audio and USB redirection; used by administrators of virtualization hosts.
- **WinRM** (Windows Remote Management): Microsoft's implementation of the WS-Management standard, used by PowerShell remoting ({{Enter-PSSession}}, {{Invoke-Command}}) over HTTP 5985 or HTTPS 5986 to run commands on remote Windows machines; the scripting counterpart of SSH. Security: HTTPS, Kerberos in a domain, constrained endpoints.
- **Microsoft Remote Assistance and Quick Assist**: the user invites the technician and watches; consent-based, for helpdesk support of an active user.

## Third-party tools
- **Screen-sharing software**: cloud-brokered remote control (the typical helpdesk tool) that works through NAT without opening ports; usually attended (the user approves) or unattended with an installed agent.
- **Videoconferencing software**: meetings with screen sharing; fine for showing, not for controlling, and not for handling private data.
- **File transfer software**: SFTP clients, managed file transfer, and cloud sync for moving files securely; avoid plain FTP.
- **Desktop management software**: MDM and endpoint management platforms that configure, patch, and remote-control managed devices.

## Security considerations of each access method
- Encrypt everything in transit: RDP with NLA and TLS, SSH, VPN, VNC only inside a tunnel, WinRM over HTTPS.
- Authenticate strongly: MFA on VPN, gateways, and RMM consoles; keys for SSH; no shared accounts.
- Expose nothing directly: no RDP, VNC, or SSH open to the internet; use a VPN, a gateway, or a cloud broker.
- Least privilege and logging: separate admin accounts, session recording where possible, and review of who connected when.
- Consent and privacy: attended tools ask the user; unattended agents must be inventoried and removed when no longer needed.
- Patch the tools; remote access software is a favorite target.

## Reading the scenario
- Support a home user who has a problem right now on their own PC: Quick Assist or attended screen-sharing.
- Administer a Linux server: SSH with keys.
- Run a command on 50 domain PCs from PowerShell: WinRM.
- A remote worker needs the file server and intranet: VPN.
- Manage patching and remote control for 400 customer endpoints: RMM.
- Access a VM's console on a KVM host: SPICE.
- A firewall shows 3389 open to the world: close it and use a VPN or gateway.

> Exam tip: RDP 3389 Windows desktop; VPN encrypted tunnel to the network; VNC 5900 cross-platform screen sharing, needs a tunnel; SSH 22 secure command line; RMM agent-based management at scale; SPICE for VM consoles; WinRM 5985 and 5986 PowerShell remoting; screen-sharing, videoconferencing, file transfer, and desktop management tools. Encrypt, use MFA, expose nothing directly, least privilege, log, patch.`,
      hook: "RDP: TCP 3389, Windows Pro host, NLA, never exposed. VPN: encrypted tunnel to the network, MFA. VNC: TCP 5900, cross-platform console sharing, tunnel it. SSH: TCP 22, secure command line and file transfer, keys. RMM: agent-based monitoring, patching, remote control at scale; protect the console. SPICE: VM console protocol on KVM. WinRM: 5985 HTTP, 5986 HTTPS, PowerShell remoting. Third-party: screen-sharing, videoconferencing, file transfer (SFTP), desktop management. Security: encrypt, MFA, no direct exposure, least privilege, logging, patching, consent."
    },
    {
      id: "u9l3", title: "Artificial Intelligence Basics", domain: 4, obj: "4.10", minutes: 8,
      body: `The newest objective asks what a technician should understand about AI tools at work: how they are integrated, what policy should say, where they fail, and what happens to data typed into them.

## Application integration
AI features now live inside familiar tools: assistants in office suites and email, chatbots on helpdesk portals, code and script assistants, ticket summarization in service desks, and copilots inside operating systems. Integration means the AI can read the data in those applications, which is why the policy questions below matter. A technician may configure, enable, or disable these features by policy and should know which data they can reach.

## Policy and appropriate use
- **Policy**: the organization states which AI tools are approved, what data may be entered, who may use them for what, and how output must be checked. Using an unapproved public tool with company data violates it.
- **Appropriate use**: AI is a drafting and research aid, not an authority. Fine for summarizing a long log, drafting a knowledge base article, suggesting a script to review, or explaining an error. Not fine for making decisions that need human judgment, or for producing work presented as your own when the policy or an instructor forbids it.
- **Plagiarism**: presenting AI-generated text or code as original work where originality is required, or reproducing copyrighted material the model learned from; cite, disclose, and review per the organization's rules.

## Limitations
- **Bias**: models learn from data with human biases and reproduce them in rankings, recommendations, and language; outputs about people need human review.
- **Hallucinations**: the model states things that are false with full confidence: invented commands, nonexistent settings, fake citations, wrong port numbers. Every fact and every command must be verified before use, especially anything run on a production system.
- **Accuracy**: outputs can be outdated (training cutoffs), imprecise, or subtly wrong in ways that read well; treat them as a draft from a fast but unreliable colleague.

## Private versus public
- **Data security**: anything typed into a public AI service leaves the organization; passwords, keys, customer records, source code, and internal documents must never be entered into a public tool. Private or enterprise deployments keep data inside the organization's boundary and contractually exclude it from training.
- **Data source**: know where the model's information comes from (its training data, the documents it was given, live web results) so you can judge reliability and licensing; an answer grounded in the company's own documentation is more trustworthy than one from unknown web sources.
- **Data privacy**: regulated data (PII, healthcare, card data) entered into an AI tool is a disclosure; privacy law applies; prompts and outputs may be retained and reviewed by the provider. Use only tools approved for that data class, and minimize what you enter.

## Reading the scenario
- A technician pastes a customer's error log containing account numbers into a public chatbot: data security and privacy violation; use the approved private tool and redact.
- An AI suggested a command to fix a server and it deleted a directory: hallucination and accuracy; verify before running, test in a sandbox.
- A knowledge base article was generated entirely by AI and published without review: policy and accuracy; review and edit first.
- A student submits AI-written work as their own: plagiarism.
- The screening tool ranks candidates from one school higher: bias.

> Exam tip: AI is integrated into everyday applications; policy defines approved tools and data; appropriate use means draft and verify, not decide and publish; plagiarism is presenting AI output as your own; limitations are bias, hallucinations, and accuracy; keep data secure and private by using private or approved tools, knowing the data source, and never entering regulated or secret data into public services.`,
      hook: "Application integration: AI inside office, email, helpdesk, code tools, and the OS, with access to that data. Policy: approved tools, allowed data, review rules. Appropriate use: draft and verify, not decide; plagiarism when presented as original. Limitations: bias, hallucinations (confident falsehoods), accuracy (outdated, subtly wrong); verify every command. Private versus public: data security (nothing secret into public tools), data source (know where answers come from), data privacy (regulated data is a disclosure; providers retain prompts)."
    }
  ]
});
