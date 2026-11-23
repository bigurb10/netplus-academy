// CIIP Academy deeper explanations, units 1 to 3. Original content.
window.FRA = window.FRA || {};
FRA.deep = FRA.deep || {};

Object.assign(FRA.deep, {

u1l1: `## Following one study through the building
Take one real request: a clinician orders a two-view chest exam at 08:14 for an outpatient. The study will touch six systems before the bill is sent. If any step drops it, the symptom appears somewhere else, so the skill is tracing in order.

\`\`\`
Time   Event                              System that holds the truth      Message or object
08:14  order placed                       EMR                              order message
08:15  order arrives, exam scheduled      RIS                              scheduling message
08:40  patient arrives, registered        registration                     patient message
08:52  technologist queries the worklist  RIS or broker                    worklist query
09:05  two images acquired                modality                         images, performed step
09:08  technologist checks count          PACS                             image count
09:10  study stored and committed         PACS                             storage commitment
09:12  study appears on reading list      PACS or RIS                      worklist entry
10:30  report signed                      reporting system                 result message
10:31  result shown in the chart          EMR                              result message
\`\`\`

## The trace method
When the radiologist says the study is missing, ask where it was last seen. If the images are on the modality but not in PACS, the break is between steps 5 and 7. If the images are in PACS but not on the list, the break is the study match to its order. If the report is signed but the clinician cannot see it, the break is the result message. Each case has a different owner and a different fix.

## Worked example
The reading list is missing a chest study from 09:05. The technologist reports sending two images. PACS shows one image under the right patient. The count check from step 6 now tells you what happened: one image never arrived, so the study is incomplete and cannot become read-ready. The correct action is to have the technologist resend the missing image from the modality (which still holds it because storage commitment has not arrived), not to hold the radiologist waiting.

## Defining, implementing, evaluating
Write the current workflow and its pain point first. Design the change by naming who owns each step. Test with real studies, including an unusual one such as a stat case. After go-live, measure the same time points you measured before and compare. If you cannot show the before and after, the change is not evaluated.`,

u1l2: `## Reading a DICOM header
Every DICOM file is a set of data elements, each addressed by a tag written as (group,element). Knowing a handful of tags lets you read a header dump and find why a study will not match.

\`\`\`
Tag             Attribute                 Used for
(0010,0010)     Patient's name            display, matching
(0010,0020)     Patient ID                matching to the master patient record
(0008,0050)     Accession number          ties images to the order
(0008,0060)     Modality                  protocol selection, routing
(0020,000D)     Study instance UID        names the study, never reused
(0020,000E)     Series instance UID       names the series
(0008,0018)     SOP instance UID          names one image
(0028,0010)     Rows                      matrix height
(0028,0011)     Columns                   matrix width
(0028,0100)     Bits allocated            storage per pixel
\`\`\`

## An association, step by step
A CT scanner stores a slice to PACS.
1. The scanner (the user) opens a connection to the PACS address and port and proposes an association, naming its own AE title and the PACS AE title.
2. In the request it lists presentation contexts: CT image storage, offered with explicit little endian and JPEG lossless.
3. PACS (the provider) checks the calling AE title against its allowed list. If the title is unknown it rejects the association here.
4. PACS accepts the context and picks one transfer syntax, say explicit little endian.
5. The scanner sends the slice. PACS answers with a status: success, or a warning or failure code.
6. The scanner releases the association.

## What the walk-through diagnoses
Rejected at step 3 means an AE title problem. Accepted but a context refused at step 4 means no shared SOP class or syntax. Failure status at step 5 means PACS could not store, for example because the disk is full or because a UID clashed with another object.

## Worked UID example
A hospital owns the root 1.2.3.4. It builds each study UID from the root plus a device number, a date, and a counter, for example 1.2.3.4.5.20261123.17. The UID may be at most 64 characters, so a long root leaves little room, which is why roots are kept short.`,

u1l3: `## An order and its result, line by line
Below are an order from the EMR to the RIS and the result coming back. Read them segment by segment.

\`\`\`
MSH|^~\\&|EMR|MAINHOSP|RIS|MAINHOSP|20261123081500||ORM^O01|MSG00045|P|2.3
PID|1||MR123456^^^MAINHOSP^MR||DOE^JANE||19700412|F
PV1|1|O|XRAY^^^MAINHOSP
ORC|NW|ORD7781
OBR|1|ORD7781|ACC20261123001|CXR2^Chest 2 views

MSH|^~\\&|RPT|MAINHOSP|EMR|MAINHOSP|20261123103000||ORU^R01|MSG00112|P|2.3
PID|1||MR123456^^^MAINHOSP^MR||DOE^JANE||19700412|F
ORC|RE|ORD7781
OBR|1|ORD7781|ACC20261123001|CXR2^Chest 2 views
OBX|1|TX|RPT^Report||No acute findings||||||F
\`\`\`

## What each part means
- The {{MSH}} segment gives sender, receiver, time, message type (an order, then a result), and a control ID the ACK will quote.
- {{PID}} field 3 holds the identifier list: here {{MR123456}} issued by {{MAINHOSP}}. Field 5 holds the name, family name first, with a caret between components.
- {{ORC}} says what to do with the order: {{NW}} is a new order, {{RE}} is an observation or result.
- {{OBR}} names the placer order number ({{ORD7781}}, assigned by the EMR) and the filler order number (the accession, assigned by the RIS), and the procedure.
- {{OBX}} carries one line of result in field 5. The last populated field, F, is the result status: final.

## Worked diagnosis
Radiology says the result never appears in the chart. You find the result message in the engine log with a negative acknowledgment and the error that the order {{ORD7781}} is unknown. The cause: the order was changed, which created a new placer number, but the reporting system still used the old one. The fix is in the order message handling, not in the chart.

## Acknowledgment values
An accepted message is answered with an acknowledgment code {{AA}}, an application error with {{AE}}, a rejection with {{AR}}. An interface engine resends or holds a message that gets an error and raises an alert for anything it cannot deliver. Leaving the queue to grow silently is the failure to avoid. Ask for the queue depth and the oldest message age every morning, because those two numbers show a stall long before a clinician calls.`,

u1l4: `## Mapping local names to one set
Three hospitals in one system name the same knee exam three ways. The hanging protocol only works for one name, the dose registry cannot compare exams, and billing finds mismatches. A mapping table solves all three.

\`\`\`
Local name (hospital)         Standard Playbook name              Used by
KNEE 3V (north)               knee, three views                   protocol, charge
XR KNEE LT 3 VW (east)        knee, three views                   protocol, charge
Knee series (west)            knee, three views                   protocol, charge
\`\`\`
All three map to the single standard name, and the protocol, the dose registry, and the charge rule all key on that name.

## Which code does which job
\`\`\`
Question                                   Code set
Why was this exam ordered?                 ICD
What procedure was done, and billed?       CPT
What does this finding mean clinically?    SNOMED CT
What is the order or observation called?   LOINC
What is this imaging term or procedure?    RadLex and its Playbook
\`\`\`

## Maintenance routine
1. Quarterly, export the list of local procedure names in use.
2. Compare it with the map and list unmapped names.
3. Map each new name to one standard entry and record who approved it.
4. Retire duplicates so two local names do not point at one protocol by accident.
5. After each yearly code update, check that retired codes were replaced in orders and charges.

## Worked example
Analytics shows knee exams at the north site take longer than at the east site. Before acting, check how many exams each site counts under its knee names. If the east site counts only one of its two knee names, its volume is understated and the comparison is wrong. The fault is mapping, not performance.

## Why it is an operations duty
Mapping drifts every time someone adds a procedure. If nobody owns it, the drift is found only when a hanging protocol fails or a claim is denied. Naming an owner and a schedule keeps the codes alive and keeps the other systems honest.`,

u1l5: `## From problem to profile
Profiles are most useful when you start from a problem and ask which profile fixes it. This table is the map the exam wants you to carry.

\`\`\`
Problem you have                                   Profile to require
Orders, images, and reports disagree on data       Scheduled Workflow
Trauma patient scanned before registration         Patient Information Reconciliation
Same image looks different on two displays         Consistent Presentation of Images
Radiologist needs to flag images for clinician     Key Image Note
Patient leaves with images on a disc               Portable Data for Imaging
Outside hospital needs your studies                XDS-I.b cross-enterprise sharing
EMR link opens the viewer on the wrong study       Invoke Image Display
Need to track dose across scanners                 Radiation Exposure Monitoring
Auditor asks who viewed a study                    Audit Trail and Node Authentication
Audit time stamps disagree between systems         Consistent Time
\`\`\`

## Actors and transactions
Each profile defines actors such as an order placer, an order filler, an image manager, and an image archive. The actors exchange defined transactions. A product that claims a profile must claim specific actors, and the integration statement lists them.

## Writing it into an RFP
Poor wording: "The system shall support IHE." Good wording: "The system shall support the Scheduled Workflow profile as image manager and image archive, the Patient Information Reconciliation profile as image manager, and the Audit Trail and Node Authentication profile as secure node, as shown in the vendor's integration statement. Each claimed actor shall be demonstrated in the buyer's test environment before acceptance."

## Worked example
A vendor's integration statement lists Scheduled Workflow as an image display actor only. The RFP required the image manager and archive actors. The gap is found before contract signing, which is the point of requesting the statement. The buyer asks the vendor to commit in writing to the missing actors with a date, or scores the bid lower.

## The Connectathon
Vendors test against one another at an IHE Connectathon. A product that has passed is more likely to interoperate, but your acceptance test on your own network still decides.`,

u1l6: `## Mapping the connections
An integration diagram is the most useful document in this domain. Draw each system and label every line with its type, direction, and owner.

\`\`\`
From          To            Type                    Carries                    Owner
EMR           RIS           HL7 v2                  orders, patient events     interface team
RIS           PACS          HL7 v2                  orders, status             interface team
modality      PACS          DICOM                   images, commitment         PACS team
modality      RIS or broker DICOM worklist          scheduled procedures       PACS team
reporting     RIS, EMR      HL7 v2                  report and status          interface team
EMR           viewer        context launch (URL)    patient and accession      EMR team
portal        PACS          web services            images and reports         portal team
\`\`\`

## Testing an interface
Test with real-looking messages, not only with a clean test. Include a patient merge, a cancelled order, a result correction, and a very long report. Confirm that each system displays the change. Record who signed the test.

## Worked example
A click from the EMR opens the viewer on a blank page. The context launch address looks like this in plain terms: the viewer address, then the patient ID, then the accession number. The test shows the EMR is sending the patient ID from the registration system, while the PACS stores the same patient under a different identifier issued by the radiology system. The viewer finds nothing. The fix is to send the identifier and issuer that PACS holds, or to map the identifiers in the interface engine. The viewer, the network, and the archive were all fine.

## Documents and devices
Scanned requisitions and outside documents are attached to the order or the study so the radiologist sees them. Enterprise image devices, such as dermatology cameras and surgical video, should use a worklist or an encounter link so the patient is selected, not typed.

## Downtime
Every interface needs a downtime plan: how orders are carried by paper, how results are viewed, and how the missed messages are replayed from the engine queue when service returns. Ownership is not complete until the plan exists and has been tried once.`,

u1l7: `## Following the output of an add-on
Every add-on starts well and fails in the same place: the result has nowhere to go. Trace output for each tool you deploy.

\`\`\`
Tool                 Result object            Stored where            Shown to the reader by
CAD for mammography  structured report        PACS, with the study    overlay marks on the image
Lung nodule CAD      secondary capture        PACS                    extra series in the study
3D server            new series               PACS                    hanging protocol rule
Dose management      dose report              dose registry           dashboard, not the reader
AI triage            result object, flag      PACS and worklist       priority marker on worklist
\`\`\`

## The path in a deployment
1. Images go from PACS or a router to the tool by DICOM store.
2. The tool processes and creates a result.
3. The result returns to PACS as a new object or series with the same study UID.
4. A hanging protocol rule or a worklist rule makes the result visible.

## Worked example
A lung CAD tool is installed. Radiologists say it does nothing. In the logs, the server receives the studies and runs. The results are sent back as a new series, but PACS places them in a separate study because the tool created a new study UID. The hanging protocol never finds them. The fix is to have the tool reuse the original study UID, and then add a protocol rule that displays the extra series. The algorithm was never the problem.

## Decision support
At order entry it asks whether an exam is appropriate and can suggest an alternative. At protocoling it helps choose the right protocol and contrast. During interpretation, case comparison finds similar cases. Each is measured by whether the clinician sees it at the right moment.

## Dose and contrast
The modality sends a dose report to a registry. The registry compares an exam to a reference and flags outliers. Contrast dose and injector data should be recorded in the study or in the chart, so a later reader knows what was given.

## Modality structured reports
Ultrasound and DXA modalities can send measurements as structured reports. Reporting software pulls the values into the report so they are not retyped.`,

u1l8: `## Closing the loop
A critical result is closed only when three facts are recorded: who was told, who told them, and when. The system supports the person, but the facts are the evidence.

\`\`\`
Step                        System support                          Record kept
Reader marks critical       flag on the report                      time of mark
Notify responsible clinician  call, page, or secure message         name, time
Clinician confirms          acknowledgment in the system or note    name, time
No confirmation in time     escalation to a backup contact          escalation time
Result delivered            final report to the EMR                 status and time
\`\`\`

## Reading a critical result audit
You are asked to prove a critical finding was handled. Pull the report, and then check the communication log: was the person notified named, and was the time within the policy limit? If the log shows only "message sent," the loop is open, because sending is not confirming. The fix is to require acknowledgment in the workflow.

## Discordant findings
A resident reads overnight and the attending finalizes in the morning. If the final differs in a way that matters, the ordering clinician needs to know. The status flow (preliminary then final) with a prompt for the radiologist to indicate a significant change, and an alert to the ordering clinician, makes this reliable.

## Worked example of analytics
The quality committee asks for average time from exam complete to final report by modality. The query returns odd numbers: some cases are negative. The cause is the time stamps: two systems use different clocks, so the report time appears before the exam time. Consistent Time, one clock source for every system, fixes it. Analytics rests on clean time, consistent procedure codes, and clear statuses.

## Peer review workflow
A tool picks a random sample of finalized studies, presents them to a second reader without the first report (or with it, by policy), collects a score, and sends the data to the committee. Informatics builds the sampling rule and the reporting, not the scores.

## Strategy
When the organization plans a new outpatient site, the imaging plan follows: network, storage, licenses, and staffing are aligned with that plan, with dates, rather than built as an afterthought.`,

u2l1: `## Study size, worked for three modalities
Size is matrix times bytes per pixel times number of images. Do the arithmetic once and the sheet's averages stop being numbers to memorize.

\`\`\`
Modality        Matrix        Bytes per pixel   Images   Size per image     Study size
CT              512 x 512     2                 500      524,288 bytes      about 262 MB
MRI             256 x 256     2                 200      131,072 bytes      about 26 MB
Ultrasound      640 x 480     3 (color)         30       921,600 bytes      about 27.6 MB uncompressed
\`\`\`

## Checking each row
CT: 512 x 512 is 262,144 pixels, times 2 bytes is 524,288 bytes. Times 500 images is 262,144,000 bytes, about 262 MB, which matches the sheet's average for a multi-slice study.
MRI: 256 x 256 is 65,536 pixels, times 2 bytes is 131,072 bytes. Times 200 images is 26,214,400 bytes, about 26 MB, which matches the sheet.
Ultrasound: 640 x 480 is 307,200 pixels, times 3 bytes is 921,600 bytes. Times 30 images is 27,648,000 bytes, about 27.6 MB uncompressed. The sheet's average for ultrasound is 9.2 MB, because the images are usually stored compressed or in fewer color bytes, so use the sheet for planning and the arithmetic to understand the pattern.

## Using it to plan
A scanner that moves from 500 to 1,000 thin slices per study doubles its CT study size to about 524 MB. If the site does 40 such studies a day, the daily growth is about 21 GB (40 x 524 MB = 20,960 MB). Over a year of 250 working days that is about 5.2 TB before compression. Lossless compression at about 2.5 to 1 would reduce that to roughly 2.1 TB.

## Quirks that change the plan
\`\`\`
Quirk                                   Effect
Thin and thick CT series both sent      storage and router load multiply
Tomosynthesis (450 MB to 3 GB)          network time, specialty display
Mammography lossy copy                  cannot serve as the legal record
Computed radiography plate              identification step, matched to the patient
Fluoroscopy                             only a subset of images is archived
\`\`\`

## Display
Bigger matrices and more images mean longer retrieval and a heavier workstation. A reader of 1,000-slice studies needs fast prefetch and enough memory, not just a bigger screen.`,

u2l2: `## Non-radiology sources and their connections
Each department outside radiology comes with a different object, a different system, and a different gap in the patient link. This table is the map for planning an enterprise connection.

\`\`\`
Source               Object type                   Usual system             Usual gap
Nuclear medicine     small multi-frame images      nuclear workstation      PET and CT mismatched
Echo                 cine loops                    cardiology PACS          separate archive and viewer
Cath lab             angiography runs, dose        cardiology PACS          dose report not sent
ECG                  waveform objects              cardiology system        read in separate viewer
Radiation therapy    plan, structure set, dose     oncology system          PACS cannot display them
Endoscopy            video, stills                 visible light capture    no order or patient link
Operating room       photo, video                  capture device           typed patient name
Digital pathology    whole-slide images            pathology system         very large objects
\`\`\`

## Questions to ask for every source
1. How does the device learn the patient and the procedure: a worklist, a barcode, or typing?
2. What object type does it produce, and does the archive accept it?
3. Which system consumes it, and does the reader need the same patient identity there?
4. Where does the dose or study record go?

## Worked example
A PET and CT exam arrives in PACS as two studies under slightly different patient names. The fusion workstation cannot pair them. The scanner operator typed the name for the PET and used the worklist for the CT. The fix is to correct the PET record with a move or merge under policy and require worklist use for both parts. The prevention is that both parts come from one order.

## Radiation therapy at recognition level
A radiation therapy plan holds the beam arrangement. A structure set holds the outlines of the target and organs. A dose object holds the calculated dose distribution. They link to the planning CT by UID. If PACS stores the planning CT but the oncology system holds the plan, the two must reference the same study UID.

## Ancillary services
Oncology tumor tracking compares serial exams. Surgical planning and orthopedic templating use 3D reconstructions. 3D printing starts from a segmented volume. Stereotactic and intraoperative systems need fast access to the planning images. Point-of-care ultrasound and medical image capture need a worklist or encounter link. Wound care and digital pathology need storage sized for very large objects.`,

u2l3: `## A new modality checklist
Use the same checklist for every device. Skipping a step is how scanners go live unable to receive a worklist.

\`\`\`
Step   Action                                        Evidence
1      Record AE title, IP address, port             written on the form
2      Add the device to PACS and any router         entry saved, firewall rule open
3      Add the PACS triplet to the device            entry saved
4      Run C-ECHO from the device, then from PACS    both answered
5      Query the modality worklist                   test patient appears with accession
6      Acquire a test exam from the worklist         images sent
7      Check the image count and demographics        match in PACS
8      Confirm the MPPS messages                     in progress and completed seen
9      Confirm storage commitment                    device shows committed, then purges
10     Sign the form                                 name and date
\`\`\`

## Diagnosing a failed echo
The scanner sends a {{C-ECHO}} to PACS and fails. What the failure looks like tells you where to look.

\`\`\`
What the device reports          Most likely cause                         First action
Association rejected             PACS does not list the scanner's title    add the exact title, case matched
Connection refused               wrong port or the service is stopped      check the port and the listener
Timeout, no answer               firewall dropping traffic or wrong IP     check the firewall rule and address
Echo works one way only          the reverse entry is missing              add the entry on the other device
Echo works, store fails          SOP class or transfer syntax mismatch     compare the conformance statements
\`\`\`

## Worked example
A new scanner's echo to PACS is rejected. The installer typed the scanner title as {{ULTRA1}}. PACS lists {{ultra1}}. AE titles are case-sensitive, so the association is rejected. Correct the entry on PACS to {{ULTRA1}} and repeat the echo. Do not open the firewall further, because the connection itself reached PACS.

## Worklist fields
The query fills patient name, patient ID, accession number, and the requested procedure. If the technician still types names, the query is returning nothing or the scanner is not set to use it.

## MPPS and commitment
In-progress tells RIS the exam has started. Completed lists the images made, so a missing image can be noticed. Commitment is the last step: only when PACS confirms it has the objects does the scanner purge.`,

u2l4: `## Matching what two devices can speak
Two devices can open an association and still fail to move an object. The fault is in what was negotiated for that SOP class.

\`\`\`
Transfer syntax          Compression     Reversible?     Typical use
Implicit VR little end.  none            n/a             default every device supports
Explicit VR little end.  none            n/a             most uncompressed exchange
JPEG lossless            yes             yes             archive and exchange
JPEG 2000 lossless only  yes             yes             archive
JPEG 2000                yes             lossless or lossy   review or archive
JPEG baseline            yes             no (lossy)      review copies
RLE lossless             yes             yes             some ultrasound and secondary capture
\`\`\`

## A worked negotiation
A scanner offers CT image storage with JPEG 2000 only. The PACS accepts CT image storage with implicit and explicit little endian only. No syntax matches, so the context is rejected and the scanner reports that the store failed with no image sent. Two fixes: enable explicit little endian on the scanner so the pair has one syntax in common, or enable JPEG 2000 on PACS if the vendor supports it. The network, the title, and the port are not the cause.

## Validation
Validating an object means checking it against the standard. A validator will tell you that a required element is missing, a value does not fit its type, or a UID is malformed. Validate a sample from each new device before you accept it, and validate an imported study that behaves oddly.

## Tools
\`\`\`
Tool                 Use
Echo and send        test a connection, push a file
Query tool           test a find and retrieve
Header dump          read tags and spot wrong values
Simulator            stand in for a modality or PACS before the real one arrives
Validator            check conformance
Network capture      see the association and rejection reasons
\`\`\`

## Other integration types
A secondary capture stores a screen image as a DICOM image, which has no original pixel data to remeasure. An encapsulated PDF stores a document inside a DICOM study. A non-DICOM converter wraps a photo or video, takes the patient from a worklist or typed entry, and files it as DICOM, so the weak link is how the patient is chosen.`,

u2l5: `## An acceptance test and a routine test
The same device is tested differently over its life. Keep the tests separate in the plan.

\`\`\`
Check                   Acceptance (once)           Routine (scheduled)
Pattern set             full set                    simpler checks, visual pattern
Luminance               measured with a meter       measured or from the built-in sensor
Contrast response       compared to the GSDF        compared to the GSDF
Uniformity              four corners and center     usual check
Noise pattern           low-contrast dots           check
Internal sensor         compared with external      compared every 10,000 backlight hours
Sign-off                physicist                   physicist or trained team
\`\`\`

## Worked example of a luminance check
A diagnostic display must reach at least 250 cd/m2 maximum luminance, and the contrast ratio is maximum divided by minimum luminance. The meter reads a maximum of 380 and a minimum of 1.2. The ratio is 380 / 1.2, about 317, which is above the 250 needed for a diagnostic display. A clinical review display only needs above 100.

Now check uniformity: the four corners read 360, 375, 355, and 380, and the center reads 380. The largest difference is 380 minus 355, which is 25. As a percent of 380 that is 6.6 percent, within the 30 percent tolerance.

Check two displays at one workstation: centers read 380 and 335. The difference is 45, and 45 / 380 is 11.8 percent, which exceeds the 10 percent allowance for matching displays. Recalibrate one of them.

## Remote monitoring
Calibration software reads the built-in photometer, adjusts each display, and reports results to a central console. That lets the PACS team see which displays are out of tolerance without visiting each room. A report is a record, so keep it.

## Who signs
For most diagnostic displays a medical physicist or a trained and supported team signs the acceptance. For mammography, a qualified medical physicist is required before clinical use. The PACS team keeps the records, the schedule, and the failed-display list.

## Do not trust the eye
A display can drift for months with no visible fault. A clean image is not a test, and a complaint from a reader is a reason to measure, not a reason to adjust by eye.`,

u2l6: `## Rules by area
A single table of areas and rules is the best way to keep these straight. Informatics staff are guests in each of these areas.

\`\`\`
Area                         Main risk                     What you do
Patient bedside or room      electrical, infection         clean device, keep cords clear, never open powered gear
Radiography, CT, fluoro      ionizing radiation            ask the technologist, keep time short, keep distance
Nuclear medicine             radioactive patients          follow the department's access rules
MRI zones                    magnetic field, always on     screening first, no steel, escort inside
Procedure rooms              blood and body fluids         precautions, clean after
Operating room               sterile field                 stay out of it, do not reach over it
\`\`\`

## Worked scenario
You must replace a keyboard at a workstation inside the MRI suite control area. The wrong plan is to walk in with your tool bag because the ticket is urgent. The right plan: call MRI staff, complete the screening form, leave the steel tools outside the zone, bring only equipment labeled for the area, and be escorted. If an MRI scanner is mid-exam, you wait. The magnet never turns off, so a steel screwdriver in your pocket can become a projectile with no warning.

## Radiation habits
Time, distance, shielding. Spend only the time the task needs, stand as far from the source as you can while still doing the work, and use lead aprons, barriers, and doors the department provides. Wear a monitoring badge if the department requires one. Ask before entering any room where an exam is under way.

## Infection control
Clean shared keyboards, carts, and tablets, before and after you bring them in. Use hand hygiene on entry and exit. Do not place a bag or tool on a patient bed.

## Sterile field
In an operating room, the sterile field is the area the surgical team keeps free of contamination. Do not enter it, lean over it, or touch the items on it. Install or fix equipment only when the room is not in use or when the nurse in charge directs.

## When unsure
You do not need to know every hazard. You need the habit of asking the department safety officer or the lead technologist before you enter, and the humility to wait for an answer.`,

u3l1: `## Designing a reading room from the reader outward
A good room is designed by asking what each person at each desk will be doing for six hours. Walk the room with a checklist rather than a floor plan alone.

\`\`\`
Item                   Check                                          Fix if it fails
Chair                  adjustable height, lumbar support              replace or add adjustment
Desk                   height adjustable, room for two displays       sit-stand desk
Display height         top of the screen near eye level, no neck tilt  stand or arm
Display distance       readable without leaning                       move, adjust zoom
Input devices          mouse, keypad, microphone within easy reach    rearrange, add a tray
Window or lamp         no reflection in any screen                    blinds, move the desk
Ambient light          20 to 40 lux, even, controllable               dimmers, indirect lighting
Noise                  readers do not hear each other's dictation     panels, carpet, spacing
Heat                   room stays comfortable with all machines on   extra cooling
\`\`\`

## Worked example of a glare complaint
A reader on the end workstation says dark images look flat in the afternoon. The calibration report for that display is in tolerance. A light meter at the screen reads far above 40 lux because afternoon sun reaches the room through a window behind the reader and reflects on the glass. The cause is ambient light, not the display. The fix is a blind and a lamp that can be dimmed, then a second reading, which should fall between 20 and 40 lux. Do not recalibrate the display to compensate: that shifts the grayscale for every other hour of the day.

## Layout for different uses
Single reading needs privacy and a desk away from traffic. Shared reading needs room for a second chair and a matching pair of displays. A consult space keeps talking away from the readers. Traffic paths should not cross behind a seated reader, because movement behind the screen draws the eye.

## Power and network
Count the outlets and network drops per desk before the furniture arrives, plan cable management so cords do not trail across the floor, and place the equipment closet away from the readers if its fans are loud. Heat from many computers is a real cooling load, so involve facilities early.

## Repetitive strain
Long hours in a fixed posture cause strain. The controls are adjustability, breaks, and equipment that reduces motion, such as keypads that map frequent actions. A small survey of the readers before and after a change shows whether the change helped.`,

u3l2: `## The cost of a login
A reading room is a stack of small costs that add up. Measure them before you propose a fix.

\`\`\`
Step in one study                        Time (example)
Log into PACS                            already open
Log into the reporting tool              a few seconds
Search for the patient in the reporting tool   a few seconds
Open the EMR and search again            more seconds
Return to PACS                           lost focus
\`\`\`

With context synchronization, opening the study in PACS moves the reporting tool and EMR to the same patient automatically, and with single sign-on there is one login. The saved steps repeat for every study of the day.

## Worked example of measuring
Choose twenty typical studies. Time a reader from opening the study to starting the report. Count clicks, keystrokes, and logins. Record the median. After you enable context synchronization, repeat with twenty similar studies. If the median falls from, say, 50 seconds to 20 seconds, the saving is 30 seconds a study. At 60 studies a reader a day that is 30 minutes a day, which is a measurable result you can show leadership.

## Display choices
\`\`\`
Type                    Typical use                Notes
Diagnostic display      primary interpretation     calibrated, high luminance, contrast above 250
Clinical review display referring clinicians       contrast above 100, lower cost
Grayscale               radiography reads          fewer color artifacts
Color                   postprocessing, ultrasound needed for color images
Mammography display     breast reads               specialty, about 420 to 450 cd/m2
\`\`\`

## Input devices
Programmable keypads map window and level, next series, and hanging protocol actions to single buttons. A speech microphone lets the reader keep eyes on the images. A mouse with extra buttons can scroll stacks. The best device is the one the reader actually uses, so offer choices and watch.

## Collecting complaints
A complaint such as "it is slow" needs a measurement: which step, how long, how often. A log kept for a week shows whether the delay is the study opening (network or prefetch), the reporting tool (its server), or the login (identity service). Matching the fix to the measured step prevents buying equipment that does not help.`,

u3l3: `## Why a protocol misfires
A hanging protocol is a set of rules. Each rule looks at a value in the study and picks a layout. A wrong layout always means the value did not match the rule.

\`\`\`
Rule input               Where the value comes from        Common failure
Procedure code           the order                         local names not mapped
Modality                 acquisition                       wrong modality label
Body part                the procedure or the header       missing or free text
Series description       the technologist or the scanner   inconsistent names
Prior exam               the archive                       prior not prefetched
\`\`\`

## Worked example
Radiologists keep rearranging knee studies. A header check shows that three scanners label the same series {{SAG PD}}, {{Sag Proton}}, and {{PD sag}}. The protocol rule matches only the first. The fix is to either standardize the series descriptions at the scanners or add all three names to the rule, and to map the procedure code so the right protocol loads. Test with one study from each scanner.

## Read-ready
\`\`\`
Condition              Why it matters
All images arrived     the image count matches what was acquired
Patient and order matched   so the report goes to the right chart
Priors prefetched      so comparison is instant
Prior rule satisfied   same body part, usual comparison window
\`\`\`
A study that appears on the list before it is read-ready wastes the reader's time and creates a call to the technologist.

## Relevant prior rules
A rule can say: same patient, same modality, same body part, any date, newest first, up to a count. Too narrow and no priors are found. Too wide and the reader waits for irrelevant studies. Review the rule against complaints from readers.

## Postprocessing and key images
Advanced visualization servers build multiplanar and 3D views, and the results return as new series. Key images and annotations are stored as presentation states or key image notes that point at the original images, so the original pixels never change. A reader who marks a lesion creates a small new object, not a changed image.

## Terms to hold
Window and level adjust contrast and brightness. Slice thickness is the span each slice covers, so thin slices give more images. Matrix is rows times columns.`,

u3l4: `## A compression worked example
A department stores 40 CT studies a day, each about 262 MB. The storage manager must plan one year of 250 working days.

\`\`\`
Case                                   Daily size       Yearly size (250 days)
Uncompressed                           40 x 262 = 10,480 MB   2,620,000 MB (about 2.6 TB)
Lossless at 2.5 to 1                   4,192 MB               1,048,000 MB (about 1.0 TB)
Lossless at 1.8 to 1                   5,822 MB               1,455,556 MB (about 1.5 TB)
Lossless at 2.8 to 1                   3,743 MB               935,714 MB (about 0.94 TB)
Lossy at 10 to 1 (review copy only)    1,048 MB               262,000 MB (about 0.26 TB)
\`\`\`

## Checking the arithmetic
Uncompressed: 40 x 262 is 10,480 MB a day, times 250 days is 2,620,000 MB. Lossless at 2.5 to 1: 10,480 / 2.5 is 4,192 MB a day, times 250 is 1,048,000 MB. The saving is 2,620,000 minus 1,048,000, which is 1,572,000 MB, about 1.6 TB. Lossy at 10 to 1: 10,480 / 10 is 1,048 MB a day.

## Reading the table
Lossless at the planning figure of 2.5 to 1 cuts the archive to about 40 percent of its size, with no loss of any pixel. The lossy line looks far better, but it cannot be used as the primary record without radiology approval, and the ratio must be recorded on each image. The decision on the lossy line belongs to radiology leadership, with IT presenting the savings.

## Where lossy is a good fit
\`\`\`
Use                    Reason
Web or mobile review   small files load fast
Teleradiology preview  quick look before the full study arrives
Review copy for referring clinicians   adequate for their purpose
Not mammography as the legal record    lossy copy cannot serve as the legal record
\`\`\`

## The transfer syntax carries it
Lossless: JPEG lossless, JPEG 2000 lossless only, RLE lossless. Lossy: JPEG baseline, and JPEG 2000 when set to lossy. If a viewer shows the wrong quality, check which syntax delivered the images.

## The question pattern
The exam gives an original size and a ratio and asks for the compressed size, or asks for the storage saved. Divide the original by the ratio, and subtract for the saving. Then ask who has to approve it.`,

u3l5: `## An exception queue walk-through
It is Wednesday morning. The unverified study queue holds three items. One is a chest study under a patient named Smith, but the technologist reports that the patient scanned was Jones. This is a wrong-patient study, the most serious item in the queue.

\`\`\`
Step   Action                                             Why
1      Flag the study and stop it from distributing       prevent anyone reading it as Smith
2      Check whether it has been viewed or reported        scope the harm
3      Confirm the true patient with the technologist      from the worklist and the order
4      Find Jones's order and the accession number         the match key
5      Move the study to Jones (authorized staff)          a move relocates the study
6      Check that Smith has no leftover images or report   split or move if needed
7      Verify both charts show correct images and counts    confirm the repair
8      Write the audit entry: who, what, why               audit trail of corrections
9      File an event report per policy                     quality learning
\`\`\`

## The other two items
One is a study with no matching order: the technologist typed the patient instead of using the worklist, so no accession matched. Reconcile to the correct order, correct the demographics, and release it. The other is a duplicate: the modality sent the same study twice with the same UIDs. Remove the duplicate under policy after confirming the counts match.

## Worked check of counts
The technologist acquired 3 images. PACS shows 2. The commitment never arrived, so the modality still holds the third. Resend it. Do not delete the study and re-acquire, because that exposes the patient to more radiation.

## Merge versus move versus split
\`\`\`
Situation                                   Action
Two records for one patient                 merge, usually by correcting the ID
One record holds two patients               split
One study is under the wrong patient        move
\`\`\`

## Ownership
Someone owns the queue every day, and the age of the oldest item is visible. A queue nobody watches becomes a pile of unread studies, each one a clinical risk.`,

u3l6: `## The life of a report
A report is a series of versions, and each version is a message to the EMR. Draw the sequence so every status has an event and a viewer.

\`\`\`
Event                           Report status    Message to EMR     Who sees it
Resident dictates overnight     preliminary      result message     ordering clinician, marked preliminary
Attending signs in the morning  final            result message     everyone, replaces the preliminary view
Attending adds a note           addended         result message     everyone, original text kept
Error found in the text         corrected        result message     everyone, flagged as a correction
\`\`\`

## Worked example of a wrong status
An emergency physician reports that a patient's chest report says "final" but the text differs from the preliminary one she read last night. The reporting system sent the final message, but the EMR displays the first received version because it only stores the first result for an order. The fix is in the EMR interface: the later message must replace or add a version of the result, with its status shown. Until then, the staff must be told to check the status and the time.

## Who sees which status
A policy decides this. Some sites show preliminary reports to the ordering clinician only, and others to anyone with chart access. Patients may see final reports only. Whatever the rule, the screen must show the status in words.

## Structured and narrative
\`\`\`
Style        Strength                         Weakness
Structured   searchable, countable, feeds decision support   less flexible
Narrative    flexible, natural                hard to analyze
\`\`\`
A template can blend the two: fixed headings and fields, with free text inside.

## Speech recognition errors
\`\`\`
Error                 Example
Sound-alike word      a word that sounds the same but means something else
Missing negative      "no" dropped from "no acute findings"
Wrong side            left for right
\`\`\`
The control is a read-through before signing, and sometimes a second review for high-risk reports.

## Audit
Every view and status change is logged with the user and time. When someone asks who knew what and when, the audit trail answers.`,

u3l7: `## De-identifying a study, step by step
A research group asks for 400 head CT studies. You build a repeatable job. Treat the output as untrusted until you have checked it.

\`\`\`
Step   Action                                                  Check
1      List the studies and the approval from the IRB           approval on file
2      Remove header identifiers (name, ID, birth date, accession,
       institution, physician names, other dates)               header dump
3      Remove or blank private tags                             header dump shows none
4      Replace UIDs with new ones, consistently                 same new UID on every image of a series
5      Replace patient identity with a code (pseudonym)         key kept separate
6      Scan the pixels for burned-in text and mask it           view a sample
7      Handle facial features in head volumes                   remove or limit the face region
8      Verify the output, then export                           second person checks a sample
\`\`\`

## Worked example of a miss
After step 2 the header looks clean. A sample image from a CT localizer shows the patient's name and birth date drawn into the corner of the image. This text is part of the pixel data, so header cleaning did not touch it. The fix is a pixel-level mask for that region on all localizer images. Another study in the set has a private tag from the scanner that holds the technologist's name. The fix is to remove private tags in the job. Both would have gone out with the studies if the output had not been checked.

## Pseudonymization
Instead of deleting identity entirely, you replace it with a code and keep a table that maps the code back to the person. Only a small group may hold that table, and it is stored apart from the research data. This lets the team add a follow-up scan to the same research subject.

## UIDs
Study, series, and instance UIDs must be replaced, but consistently: every image in a series gets the same new series UID, so the structure survives. Never replace each image's UID with the same value, because UIDs must stay unique.

## Teaching files
A teaching file workflow should de-identify at the moment of saving, with the same checks, so identified studies never sit in the teaching folder.`,

u3l8: `## A bottleneck analysis
You are asked to reduce the time from exam to final report. Measure each stage for a week and let the numbers decide.

\`\`\`
Stage                          Median time (example)
Order to exam start            45 minutes
Exam start to read-ready       12 minutes
Read-ready to preliminary      70 minutes
Preliminary to final           35 minutes
Final to delivered to EMR      2 minutes
\`\`\`
The total is 164 minutes. The longest stage, 70 minutes from read-ready to preliminary, is the bottleneck, so effort there pays most.

## Worked example
Looking inside the 70 minutes, you find studies wait in a common list while three readers each take only their subspecialty. A pile of musculoskeletal studies builds up while the chest readers have idle time. The fix is worklist balancing: allow chest readers to pick up a defined share of general studies when their list is empty, with priority rules so stat studies still go first. After a month, measure again. If the median falls from 70 to 50 minutes, the total falls from 164 to 144 minutes, a saving of 20 minutes.

## Remote reading requirements
\`\`\`
Requirement             Why                                      Check
Bandwidth               study opens in an acceptable time        test a large study from the home
Latency                 scrolling stays smooth                   measure round-trip time
Display                 same quality rules as the reading room   calibrated, acceptance tested
Priors and reports      same context as on site                  access to the same archive
Secure access           protect patient data                     VPN or secure web, strong login, logging
No local copies         data stays in the system                 no saved files on personal devices
\`\`\`

## Models
Home reading serves daytime and night coverage. A teleradiology group contracts to read for a site that lacks coverage. Night coverage often uses an overseas or off-site group. For each, informatics provides the access, the worklist rules, and the reporting path back to the local EMR.

## Credentialing and licensing
Readers must be credentialed at each hospital and licensed in the state where the patient is, at recognition level. That is a medical staff and compliance process. Informatics checks that access is granted only after approval and removed when privileges end.

## Security
Use encrypted connections, multi-factor sign-in, logged access, and a short timeout on idle sessions.`,

u3l9: `## Importing an outside disc, step by step
The referring surgeon's patient hands over a disc. The study must be visible in PACS and must not corrupt the patient's record.

\`\`\`
Step   Action                                                        Check
1      Confirm the request is allowed under the exchange policy       consent, authorization
2      Load the disc and open the index                               study list shown
3      Compare demographics with the local record                     name, birth date, identifiers
4      Reconcile to the local patient and MRN                         one patient, no duplicate
5      Match to a local order, or create one per policy               accession assigned
6      Check transfer syntaxes and image counts                       all images readable
7      Store as an outside study                                      labeled as outside
8      Log the import                                                 who, when, what
\`\`\`

## Worked example of a mismatch
The disc carries the patient as "Robert Lee" with a different birth date from your record for "Bob Lee." Do not import under either guess. Verify with the patient or the registration system, correct the identity, and then import. If you load first and fix later, the outside study sits in the wrong chart and may be read as a prior.

## Export rules
\`\`\`
Question                  Policy answers it
Who may export            named roles
What may be exported      the study, a report, a viewer
How it is logged          who, to whom, when
How long it stays         retention of the copy
How it is protected       encryption, password, secure link
\`\`\`

## Methods compared
\`\`\`
Method                  Strength                      Weakness
Disc or USB (PDI)       works without a network       slow, easily lost, needs import
DICOMweb                query and retrieve online      needs a secure endpoint
Cloud exchange          easy for the recipient         vendor, security, and consent
XDS-I.b                 standard across enterprises    needs a registry and repository
\`\`\`

## Data integrity during exchange
Count images before and after, confirm that UIDs are not duplicates of your own, and keep a log. A study that arrives with the same UID as an existing one but different pixels is a serious problem, so quarantine it.`,

u3l10: `## From policy to purge
A written retention policy turns a vague idea into a list. This walk-through shows how a deletion run is built and where it stops.

\`\`\`
Record type                      Rule (example of a policy form)
Adult general radiology          kept for the period the state requires, then eligible
Minor patient                    kept until a set age past majority
Mammography                      at least 5 years, or 10 years if no later mammogram at the facility
Study on legal hold              kept regardless of age
Original diagnostic images       kept; a digitized film copy is not the original
\`\`\`
The periods differ by state, so the policy cites the state rule and the policy owner approves it.

## Worked example of a purge run
A query finds 90,000 studies older than the general period. Before deleting, filters remove those on a legal hold, those for minors not yet past the set age, and mammography studies with no later mammogram at the facility within 10 years. The remaining list goes to the policy owner, who reviews a sample and signs. The deletion runs on the archive and the vendor neutral archive, then on each backup copy according to its schedule. A report records the count deleted, the date, the policy, and the approver. If the count in the signed list differs from the count deleted, stop and investigate before any further run.

## Mammography calculation
A mammogram is taken on 2026-03-01 and the patient has no later mammogram at the facility. The minimum is 10 years, so the study may not be deleted before 2036-03-01, and longer if a state requires it. If the patient has a later mammogram at the facility, the 5 year minimum applies to the earlier study, so it could become eligible 2031-03-01, subject to any state or other rule.

## The cost argument
\`\`\`
Cost that grows with each retained study
Primary storage
Backup copies
Migration to each new archive
Search time and legal discovery
\`\`\`
Deleting what may be deleted lowers every line, and it reduces what a records request must search.

## Roles
The policy owner decides. Legal sets holds. IT builds the query and the report. Auditors may ask for the documentation years later.`,

u3l11: `## Orders-based and encounter-based capture
Radiology runs on orders. Much visible light imaging happens with no order at all. Enterprise imaging has to handle both.

\`\`\`
Feature                  Orders-based                    Encounter-based
Trigger                  a scheduled order               a clinic or bedside visit
Patient selection        modality worklist               worklist of encounters, barcode, or search
Typical sources          radiology, cardiology           dermatology, wound care, endoscopy, pathology
Link to billing          the order                       the encounter
Main risk                wrong patient on the scanner    photo filed under the wrong patient or none
\`\`\`

## Worked example
A wound care nurse photographs a dressing with a hospital phone app. The photo uploads to the enterprise archive, but the app asks her to type the patient's name, and three photos land under a misspelled name. The fix is to have the app show the nurse's list of the day's encounters, or scan the patient's wristband barcode, so the patient and the encounter attach to the photo with no typing. Metadata such as body site and date are chosen from short lists.

## Governance decisions
\`\`\`
Decision                         Owner
Which image types are in scope   enterprise imaging committee
Who may capture                  department leads
Who may view                     privacy and compliance
Required metadata                informatics
Retention                        policy owner
Archive and viewer standard      informatics and IT
\`\`\`

## The VNA
A vendor neutral archive keeps images from every source in standard form, with a consistent patient identity across all of them. When a department replaces its system, its images stay in the VNA, so there is no stranded data. The enterprise viewer reads from it and shows every image for a patient in one place.

## Established departments
Radiology and cardiology already have mature workflows, so enterprise imaging starts by connecting their archives and viewers to the shared identity and then adds the visible light sources one by one, beginning with the department that has the clearest need and an engaged champion.`,

});
