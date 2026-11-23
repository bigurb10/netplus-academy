// CIIP Academy curriculum, units 1 to 3. Original teaching content for the ABII CIIP exam.
window.FRA = window.FRA || {};
FRA.units = FRA.units || [];

FRA.units.push({
  id: "u1", n: 1, title: "Imaging Informatics Foundations", domain: 10,
  blurb: "The order-to-report workflow and the standards every imaging system speaks: DICOM, HL7, the coding systems, and IHE.",
  assumes: "Nothing. Start here.",
  lessons: [
    {
      id: "u1l1", title: "The Imaging Workflow From Order to Report, and Who Owns Each Step", domain: 10, obj: "J1", minutes: 10,
      body: `A radiologist tells you a chest study is on the modality but missing from the reading worklist. Before you touch a server you need one thing: the map of every step between the clinician's order and the finished report, and which system owns each step. The exam thinks in workflows, not in boxes.

## The steps, in order
\`\`\`
Step                          Owner system            What can go wrong
1 Order entry                 EMR                     wrong procedure code, missing reason
2 Scheduling                  RIS or scheduling       appointment not sent to the RIS
3 Registration and ADT        registration system     demographics differ between systems
4 Modality worklist           RIS or broker           technologist types data by hand
5 Acquisition                 modality                wrong patient or laterality
6 Technologist QC             modality, PACS          image count short, study not sent
7 Storage                     PACS, archive           study not committed
8 Reading worklist            PACS or RIS             study never becomes read-ready
9 Reporting                   reporting system        report not matched to the order
10 Results distribution       interface engine, EMR   result lost in a queue
11 Billing                    billing system          charge not created
\`\`\`

## Who owns what
The **EMR** owns the order and the patient chart. The **RIS** owns scheduling and the radiology order status. **PACS** owns images and the reading worklist. The **reporting** system owns the report text and its status. The **interface engine** owns the movement of messages between them. When a step fails, you find the owner and the last system that saw the study.

## Defining, implementing, and evaluating a solution
A workflow solution starts with a written description of the current steps and the problem, then a design that names the owner of each change, then a test with real studies, then go-live support, then measurement against the problem you started with.

> Exam tip: trace the study step by step and ask which system last handled it. The FIRST action is almost always to identify the owner of the broken step, not to restart a server.`,
      hook: "Eleven steps carry a study from order to bill, each owned by one system, and troubleshooting means finding the last system that saw the study."
    },
    {
      id: "u1l2", title: "DICOM: the Information Model, Objects, Services, and the Conformance Statement", domain: 10, obj: "J3", minutes: 11,
      body: `A vendor promises their new ultrasound scanner "speaks DICOM." Your job is to find out exactly what that means before the purchase order is signed, because DICOM is a family of choices, not a single switch.

## The information model
DICOM organizes data as patient, then study, then series, then instance. One patient has many studies, a study has many series, and a series has many instances such as images. Each level carries a **UID**, a globally unique dotted number of up to 64 characters built on a root the organization owns. Two different objects must never share a UID.

## Objects, services, and roles
A **SOP class** pairs a service with an object type, such as CT image storage. A **SOP instance** is one object of that class. In every exchange one side is the **service class user** (it asks) and the other the **service class provider** (it answers). A modality storing to PACS is the user; PACS is the provider.

## The association
Two devices open an **association**: the requester proposes **presentation contexts** (a SOP class plus the transfer syntaxes it can use), the other side accepts or rejects each one, data flows, then the association is released.

## The core services
{{C-ECHO}} tests the connection, {{C-STORE}} sends an object, {{C-FIND}} queries, {{C-MOVE}} asks a provider to send matches to a named destination, and {{C-GET}} retrieves over the same association. DICOMweb offers store, query, and retrieve over HTTP.

## The header and tags
Every DICOM object carries a header of data elements, each addressed by a tag written as (group,element). A few matter every day: (0010,0010) is the patient name, (0010,0020) is the patient ID, (0008,0050) is the accession number that ties the images to the order, and (0020,000D) is the study instance UID. When a study will not match, read these four first.

## Reading the conformance statement
Every product ships one. It lists the SOP classes, user and provider roles, transfer syntaxes, and options. Read it before buying.

> Exam tip: when two devices cannot exchange something, compare their conformance statements for the SOP class, the role, and a shared transfer syntax. Unique UIDs are the rule that keeps studies from colliding.`,
      hook: "DICOM is patient, study, series, and instance with a unique UID at each level, services negotiated in an association, and a conformance statement that tells you what a product really supports."
    },
    {
      id: "u1l3", title: "HL7 v2 and FHIR: Orders, Results, ADT, and the Messages Imaging Runs On", domain: 10, obj: "J3", minutes: 11,
      body: `Orders from the EMR stop appearing in the RIS at 06:40. Nothing is down. This is the kind of problem that HL7 knowledge solves in minutes.

## What an HL7 v2 message is
A message is a set of segments, one per line. Each segment is a row of fields separated by pipe characters. The first segment, {{MSH}}, names the sender, the receiver, the message type, and a control ID. {{PID}} identifies the patient, {{PV1}} describes the visit, {{ORC}} is the common order, {{OBR}} is the observation request (the ordered procedure), and {{OBX}} carries a line of result.

## The messages imaging uses
- **ADT** carries registration, updates, and merges to the RIS and PACS.
- **ORM** or **OMI** carries new, changed, or cancelled orders.
- **ORU** carries the report text and status back to the EMR.
- **SIU** carries scheduling.
- **MDM** carries documents and their status.

## Delivery and acknowledgment
Messages travel over TCP wrapped by **MLLP**. The receiver answers with an **ACK**. An interface engine receives, routes, maps, and queues messages. A stalled queue is the first place to look when orders stop.

## FHIR
FHIR models health data as small resources reached by plain web calls: Patient, ServiceRequest (the order), ImagingStudy, and DiagnosticReport. Many sites run HL7 v2 inside and FHIR at the edges, such as for portals and apps.

## Where HL7 meets DICOM
The two worlds meet in the **accession number** (the ordered exam) and the patient ID with its issuer. If they differ, the study cannot match its order.

> Exam tip: orders are ORM or OMI, results are ORU, patient events and merges are ADT. An order that never arrives means check the interface engine queue first.`,
      hook: "HL7 v2 messages are pipe-delimited segments sent through an interface engine, and the accession number and patient ID are the keys that tie them to the DICOM images."
    },
    {
      id: "u1l4", title: "The Coding Systems: ICD, CPT, SNOMED CT, LOINC, and RadLex", domain: 10, obj: "J3", minutes: 9,
      body: `A hanging protocol loads the wrong layout for knee studies. The cause is not the viewer: the same exam has three different local names across three hospitals, and the rule only recognizes one. Code sets fix this, and the exam wants you to know which one does what.

## Five code sets, five jobs
\`\`\`
Code set      Used for                            Where it appears in imaging
ICD           diagnoses and reasons for exam      order, claim
CPT           procedures and billing              order, charge, claim
SNOMED CT     clinical terms in one hierarchy     structured reports, problem lists
LOINC         observations and orderable names    orders, results, document types
RadLex        imaging terms and procedure names   reports, protocoling, indexing
\`\`\`

## RadLex Playbook
The **RadLex Playbook** gives standard names and codes for imaging procedures. A site maps each of its local procedure names to one Playbook entry. After that, a hanging protocol, a dose registry, a billing check, and an outside exchange can all key on the same code instead of on local spelling.

## Why mapping matters
A lexicon is a list of approved terms, a coding system gives each term a code, and an ontology adds the relationships between terms, so a system can know that one finding is a kind of another.
- Hanging protocols select layouts from the procedure code.
- Analytics count volumes and turnaround by procedure, which only works when similar exams share a code.
- Exchange with other organizations is clean only when both sides agree on terms.
- Billing denials appear when the order code and the charge code disagree.

## Maintenance is an operations duty
Codes change every year, and local procedure lists grow. Someone must own updates, mapping review, and retiring duplicates. That owner is named in the operations plan, not left to chance.

> Exam tip: ICD says why, CPT says what was done and billed, SNOMED CT says clinical meaning, LOINC names orders and observations, RadLex names imaging terms. Mapping local names to one set is the fix for inconsistent protocols and analytics.`,
      hook: "Each code set has one job, and mapping every local procedure name to a single standard set is what makes hanging protocols, analytics, billing, and exchange work."
    },
    {
      id: "u1l5", title: "IHE Integration Profiles and How to Require Them in a Purchase", domain: 10, obj: "J5", minutes: 10,
      body: `Your hospital is buying a new PACS. The vendor says it is "standards based." Your RFP needs wording that turns that claim into something you can test and hold them to.

## What IHE is
IHE does not write new standards. It publishes **integration profiles** that say how existing standards (DICOM, HL7, web services) are combined to solve a named workflow problem. A profile defines **actors** (roles such as the image manager) and **transactions** (the messages between actors). Vendors prove it at the **Connectathon**, and publish an **integration statement** that lists which actors they support.

## The profiles that matter most
\`\`\`
Profile                       Problem it solves
Scheduled Workflow            order to report with consistent data
Patient Information Reconciliation   demographics fixed after an unidentified exam
Consistent Presentation of Images    same grayscale look on every display
Key Image Note                flag significant images with a comment
Portable Data for Imaging     studies on CD, DVD, or USB with an index
XDS-I.b                       cross-enterprise sharing of imaging
Invoke Image Display          open the viewer on the right study
Radiation Exposure Monitoring dose records to a registry
Audit Trail and Node Authentication   central audit and encrypted links
Consistent Time               every clock set from one source
\`\`\`

## Requiring profiles in an RFP
Name the profile, the actor, and the role you need: for example "image manager and image archive actors for Scheduled Workflow." Ask for the integration statement, and ask that each claimed actor be demonstrated in your test environment before acceptance.

> Exam tip: IHE profiles are how you turn "supports standards" into a requirement. Name the profile and the actor, request the integration statement, and verify in testing.`,
      hook: "IHE profiles combine existing standards into named workflows with actors and transactions, and a good RFP names the profile and actor and then tests the vendor's integration statement."
    },
    {
      id: "u1l6", title: "Systems Integration: EMR and Portals, RIS, PACS, the Enterprise Viewer, Reporting, APIs and Web Services, Scanned Documents", domain: 10, obj: "J2", minutes: 10,
      body: `A cardiologist clicks a result in the EMR and expects the images to open. Instead a blank viewer appears. The work of integration is making each connection explicit, owned, and tested.

## The connections
The client-server architecture underneath is simple: workstations and viewers are clients that ask, and the PACS, RIS, and interface servers answer.
- **EMR to RIS** over HL7 for orders, ADT, and results.
- **RIS to PACS** for the worklist and status updates.
- **PACS to modalities** over DICOM for worklist, store, and storage commitment.
- **Reporting to RIS, PACS, and EMR** for report text and status.
- **EMR to the viewer** by context launch: a web address that carries the patient and accession to open the right study, without a second login.
- **APIs and web services** such as DICOMweb and FHIR let apps and portals fetch data without a point-to-point interface.

## The patient portal and the enterprise viewer
Web portals, such as the patient portal, show reports and often images through a secure link. An **enterprise image viewer** (also called an enterprise viewer or universal viewer) serves clinicians outside radiology, so they are not forced to learn the diagnostic workstation.

## Reporting, speech recognition, and scanned documents
Reporting systems use speech recognition for dictation and send finished reports by ORU. Scanned requisitions and outside documents arrive as documents and are attached to the order or the study. Enterprise image devices, such as dermatology cameras, wound care photos, and surgical video, need orders or an encounter link or they arrive unidentified.

## Who owns the interface
Every interface has a named owner, a test plan with real messages, and a downtime procedure.

> Exam tip: for a broken click from the EMR to the image, check the launch URL parameters (patient ID, accession) before you suspect the archive.`,
      hook: "Integration is a set of explicit, owned connections from the EMR to RIS, PACS, viewer, reporting, and portal, tested with real data and carrying the same patient and accession everywhere."
    },
    {
      id: "u1l7", title: "CAD, Postprocessing, Decision Support, Dose and Contrast Management, and Modality Structured Reports", domain: 10, obj: "J2", minutes: 10,
      body: `The breast imaging group wants computer-aided detection results to appear next to the mammogram. Other groups ask for 3D reformats, dose tracking, and a clinical decision support prompt at order entry. Each is an add-on system, and each is only as good as how its output travels.

## How the add-ons connect
\`\`\`
Add-on                      Input                 Output travels as
CAD (breast, lung, prostate) images from PACS     DICOM SR or secondary capture
Postprocessing server       image series          new series, key images
Decision support            order or protocol     alert in EMR or RIS
Dose management             dose SR from modality dose registry record
Contrast management         injector data         record in the study or EMR
Ultrasound and DXA reports  modality structured   values flow into the report
                            reports
Artificial intelligence     images from PACS      result object, worklist flag
\`\`\`

## Computer-aided detection and postprocessing
**CAD** marks areas for the radiologist to consider; it is a second look, not a diagnosis. Its marks come back as a structured report or a secondary capture image. Postprocessing software and servers build multiplanar and 3D views from the stored slices and save the results as new series.

## Decision support
Decision support works at order entry (is the exam appropriate?), at protocoling, and during interpretation (a case comparison with similar studies).

## Dose and contrast
A **dose structured report** from the modality feeds a dose registry so exams can be compared with reference levels. Contrast dose data should land in the record too.

## Artificial intelligence
At recognition level: an AI tool is another consumer of images and producer of results, so it needs a route in, a route out, and a place in the worklist.

> Exam tip: ask where the output goes. A result with no storage object and no worklist flag will never be seen by the reader.`,
      hook: "CAD, postprocessing, decision support, dose and contrast tracking, and AI tools are add-on systems whose value depends on how their results are stored and surfaced in the reading workflow."
    },
    {
      id: "u1l8", title: "Critical Results, Discordant Findings, Peer Review, Clinical Analytics, the Professional Bodies, and Imaging Strategy", domain: 10, obj: "J2", minutes: 10,
      body: `A radiologist finds an urgent finding at 02:10. The question is not only what the finding is. It is whether the right clinician was told, who said so, and where it is written down. Informatics builds that safety net.

## Critical and urgent results
A **critical result** workflow is closed-loop: the radiologist reports, the system or a person communicates to the responsible clinician, the clinician confirms, and the confirmation is recorded with a time and a name. Systems can prompt for communication, keep a log, and escalate if nobody acknowledges. The urgency of a result sets how fast the loop must close, and an actionable finding is one the clinician must act on, not just file.

## Discordant findings
When a preliminary read (often by a resident or an overnight reader) differs from the final, the ordering clinician must be told. Informatics supports it with a status flow (preliminary, then final) and an alert when the final changes the meaning.

## Peer review
Peer review samples reads and scores agreement. The workflow tool selects cases, hides or shows the original read, collects the score, and reports the results to the quality committee.

## Clinical analytics
RIS and PACS data feed counts and times: volumes, turnaround, utilization, and repeat rates. Analytics only works when procedure codes, statuses, and time stamps are consistent.

## The professional bodies
**ACR** publishes practice parameters and runs accreditation, **AAPM** writes physics and display quality reports, **SIIM** is the informatics society, and **The Joint Commission** accredits healthcare organizations and sets expectations such as timely critical results communication.

## Strategy
The image management plan should follow the organization's strategic plan: growth, new sites, and priorities decide what to build next.

> Exam tip: critical results need documentation of who was told, when, and by whom. The system supports the loop; it does not replace the person.`,
      hook: "Critical results, discordant findings, and peer review are closed-loop safety workflows that informatics builds and documents, and the strategy follows the organization's plan."
    }
  ]
});

FRA.units.push({
  id: "u2", n: 2, title: "Clinical Engineering", domain: 9,
  blurb: "What each modality produces, how a modality is connected to PACS, how displays are kept accurate, and how to stay safe around imaging equipment.",
  assumes: "Unit 1.",
  lessons: [
    {
      id: "u2l1", title: "Modality Workflow and Data: Radiography, Fluoroscopy, Tomography, Breast Imaging, CT, MRI, Ultrasound", domain: 9, obj: "I1", minutes: 11,
      body: `A hospital adds a multi-slice scanner and storage growth doubles in a quarter. To plan for that, you need to know what each modality produces, how big it is, and how its workflow differs.

## Size by modality
\`\`\`
Modality            Typical study                                          Quirk
Computed radiography about 20 to 50 MB, average 30                     cassette plate, ID step
Digital radiography about 36 to 90 MB, average 54                      direct capture
Fluoroscopy         about 20 MB average (10 to 50)                     subset archived
Mammography         4 images about 197 MB, 6 images about 296 MB       specialty display, MQSA
Tomosynthesis       roughly 450 MB to 3 GB                             very large objects
CT                  512 x 512 at 2 bytes = 524,288 bytes per slice     thin and thick series
MRI                 256 x 256 at 2 bytes; 200 images about 26 MB       many series per study
Ultrasound          640 x 480, 1 byte grayscale (3 for color); 30 images about 9.2 MB   cine and structured reports
\`\`\`

## The arithmetic
A CT image is built from voxels, small volume elements, and each pixel holds a Hounsfield unit, a number for tissue density. When the voxels are isotropic, equal in all three directions, the stack can be reformatted into any plane without blurring.
Study size is matrix x bytes per pixel x number of images. A CT slice of 512 x 512 pixels at 2 bytes is 524,288 bytes, and 500 slices is about 262 million bytes, which matches the 262 MB average for a multi-slice study.

## Workflow quirks
- **Computed versus digital radiography:** a cassette must be matched to the patient at an identification step; digital panels capture directly.
- **Mammography:** relies on its own hanging rules, comparison with priors, and MQSA record rules; lossy copies cannot be the legal record.
- **CT:** thin and thick reconstructions of the same scan multiply storage; check whether both go to PACS.
- **MRI:** many series, and sequence names vary by vendor.
- **Ultrasound:** often typed by hand, so worklist use protects the patient link.

> Exam tip: if storage or router load jumps after a new scanner, look at slice count and thin-slice reconstructions first, then at what is sent.`,
      hook: "Study size is matrix times bytes per pixel times image count, and each modality's workflow quirks, from computed radiography identification to thin-slice CT, change storage and display needs."
    },
    {
      id: "u2l2", title: "Nuclear Medicine, Cardiology, Radiation Therapy, IR, Visible Light, and the Ancillary Services", domain: 9, obj: "I1", minutes: 10,
      body: `Your PACS holds radiology well. Now cardiology wants echo loops, nuclear medicine wants fused PET and CT, oncology wants radiation therapy plans, and a surgeon wants photos from the operating room. Each is a different kind of object.

## Departments and their data
\`\`\`
Service              Objects and quirks
Nuclear medicine     256 x 256 matrix at 2 bytes, many frames, small studies
PET                  fused with the CT; both parts must stay matched
Cardiology           echo cine loops, cath angiography, ECG waveforms
Radiation therapy    RT plan, structure set, and dose objects
IR                   fluoroscopy and angiography runs, plus dose report
Visible light        photos and video, often encapsulated or multi-frame
\`\`\`

## What to remember about each
- **Nuclear medicine, PET, and SPECT:** together called molecular imaging, because they show how a tracer behaves in the body rather than only its shape. The patient is radioactive after the dose, so timing and handling matter. PET and CT belong to one logical exam, and SPECT is often paired with CT the same way.
- **Cardiology:** often a separate department system. The cardiology PACS must connect to the enterprise so priors and reports are shared.
- **Radiation therapy:** plan, structure set, and dose are special DICOM objects. The oncology system, not only PACS, consumes them. Know the objects at recognition level.
- **IR:** procedure room images and dose reports must reach the record.
- **Visible light:** captured outside radiology workflows, so the order or patient link is often missing.

## Ancillary services
Oncology and tumor tracking across serial exams, surgical planning and orthopedic templating from 3D reconstructions, 3D printing of anatomical models, stereotactic and intraoperative imaging, point-of-care ultrasound (POCUS) and medical image capture, wound care, and digital pathology. Whole-slide pathology images are very large objects, so plan storage and viewing for them separately.

> Exam tip: for any non-radiology source, ask three things: how does it get the patient and order link, what object type does it produce, and which system consumes it.`,
      hook: "Nuclear medicine, cardiology, radiation therapy, IR, and visible light each produce their own objects and workflows, and each needs a patient link and a consumer."
    },
    {
      id: "u2l3", title: "Configuring a Modality: AE Title, Port, Modality Worklist, Performed Procedure Step, Storage Commitment", domain: 9, obj: "I3", minutes: 11,
      body: `A new ultrasound scanner arrives Monday and the department wants to scan Tuesday. You own the connection to PACS. Do it in a fixed order and test at each step.

## The triplet on both ends
Each device has an **AE title** (up to 16 characters, case-sensitive), an IP address, and a port. The sender needs the receiver's full triplet. The receiver needs the sender's AE title on its allowed list, and often its address as well. The registered DICOM ports are 104 and 11112.

## Step by step
1. Record the new device's AE title, address, and port.
2. Add it to PACS, the RIS or broker, and any router, and add the PACS triplet to the scanner.
3. Open the firewall paths needed between them.
4. Run {{C-ECHO}} in both directions.
5. Test the modality worklist query and check the fields it fills.
6. Send a test study and check the image count in PACS.
7. Confirm MPPS and storage commitment.

## The worklist
The worklist query returns scheduled procedures so the technician selects the patient instead of typing. It fills patient name, ID, accession number, and requested procedure.

## MPPS
MPPS sends an in-progress message when the exam starts and a completed message with the images made. RIS and PACS use these to update status and to spot missing images.

## Storage commitment
The modality asks PACS to take responsibility for the stored objects. Only when the commitment arrives may the modality delete its local copy.

## What {{C-ECHO}} proves
A successful {{C-ECHO}} proves titles, address, and port match. It does not prove images will store.

> Exam tip: rejected means a wrong AE title, refused means a wrong port or a stopped service, and a timeout points at a firewall. Never let the modality purge before storage commitment.`,
      hook: "Configure AE title, address, and port on both ends, prove it with {{C-ECHO}}, then test the worklist, a store, MPPS, and storage commitment before the modality goes live."
    },
    {
      id: "u2l4", title: "DICOM Services, Objects, Transfer Syntaxes, Validation, Tools, and Other Integration", domain: 9, obj: "I3", minutes: 10,
      body: `A modality sends a study and PACS rejects every image. The network is fine. The association opened, but the presentation context was refused. This is a transfer syntax problem, and it shows up often.

## Services and objects the pair negotiates
A modality and PACS must agree on the SOP classes (the object types) and on a transfer syntax for each. A device may support the class but offer only a syntax the PACS cannot read.

## Transfer syntaxes
\`\`\`
Syntax                     Meaning
Implicit VR little endian  the default every device must support; uncompressed
Explicit VR little endian  uncompressed; each element states its type
JPEG lossless              compressed, every pixel recovered
JPEG 2000                  wavelet; lossless-only and lossy variants exist
\`\`\`
If no proposed syntax is acceptable, that context is rejected and the objects are not sent. The fix is to enable a common syntax on one side, not to resend.

## Validation
Validation checks an object against the standard: required elements present, valid values, correct UIDs. Run it before accepting a new device and when imported studies behave oddly.

## Tools at recognition level
The DICOM tools you meet in daily work are a set of small utilities: an echo and send utility, a query tool, a header dump viewer, a simulator that acts as a modality or PACS, a validator, and network capture that shows the association messages. On a switched network the capture needs a mirrored port or a tap, and the capture card runs in promiscuous mode so it records traffic not addressed to it.

## Other integration types
Secondary capture wraps a screenshot as an image object. An encapsulated PDF stores a document in a DICOM study. Non-DICOM converters turn photos or video into DICOM objects so they can be filed with a patient.

> Exam tip: association rejected points to the AE title; association opened but images refused points to the SOP class or transfer syntax.`,
      hook: "Modality and PACS must agree on SOP classes and a transfer syntax, and when no syntax matches the context is rejected, so check the negotiated list before blaming the network."
    },
    {
      id: "u2l5", title: "Display Quality Control: the Grayscale Standard Display Function, AAPM TG18, and QA Programs", domain: 9, obj: "I4", minutes: 10,
      body: `A radiologist says a diagnostic monitor "looks washed out" on the second screen. The images are fine. Displays drift, and only measurement tells you by how much.

## Why calibrate
The **grayscale standard display function** (DICOM part 14) maps each pixel value to a luminance so equal steps look equally different. That is perceptual linearization, and human perception is the reason for it: the eye judges small brightness steps along a curve, so the display must follow that curve. A calibrated display shows the same contrast wherever it is used.

## What gets tested
AAPM test patterns (TG18, replaced by TG270) support these checks:
\`\`\`
Check                 Tolerance
Ambient light         20 to 40 lux
Maximum luminance     at least 250 cd/m2 (350 or more common for primary reads)
Contrast ratio        above 250 diagnostic, above 100 clinical
Contrast response     within 10 percent of the GSDF
Uniformity            corners and center within 30 percent
Matched displays      centers within 10 percent of each other
\`\`\`
Also resolution, noise, and geometric patterns, and pixel dropouts.

## Acceptance versus routine
An **acceptance test** is done once at installation with the full set. **Routine QC** follows on a schedule with simpler checks and a visual pattern.

## Automation and records
Calibration software with a built-in photometer can adjust displays and report remotely. A QA program names who performs each test, how often, and where records are kept. A medical physicist or trained team signs off. A qualified medical physicist (QMP) usually runs acceptance testing, often with a test pattern or a phantom, an object built to image in a known way, and mammography displays need a QMP before clinical use.

> Exam tip: a clean-looking image proves nothing about a display. Test pattern plus meter is the evidence, and each test result is documented.`,
      hook: "Diagnostic displays are calibrated to the grayscale standard display function and checked with test patterns and a meter, with acceptance testing once and routine QC on a schedule."
    },
    {
      id: "u2l6", title: "Clinical Awareness: Electrical Hazards, Radiation and Radiopharmaceuticals, Magnetic Fields, Infection, the Sterile Field", domain: 9, obj: "I5", minutes: 9,
      body: `You are asked to move a workstation in a fluoroscopy room, replace a keyboard near an MRI scanner, and install a tablet in the operating room, all in one day. Informatics staff are not clinicians, but they work in clinical spaces, and the exam expects safe habits.

## Hazards and the right response
\`\`\`
Hazard                    Habit
Electrical                do not open powered equipment; report damaged cords
Ionizing radiation        know where x-ray, CT, fluoroscopy, nuclear medicine run;
                          time, distance, shielding
Radiopharmaceuticals      patients are a source of radiation after injection
Magnetic field (MRI)      always on; no ferromagnetic items beyond the screening point
Infection                 hand hygiene; clean shared keyboards and carts
Biohazards                blood and body fluid precautions in procedure rooms
Sterile field             stay out unless gowned and invited
\`\`\`

## Radiation basics
Keep the time in the room short, stay as far from the source as the task allows, and use the shielding provided. Ask the technologist when it is safe to enter an exposure room and wear the monitor the department requires.

## MRI zones
The magnet never turns off. Screening happens before you pass the restricted zone. A single steel tool or cart becomes a projectile. Use only equipment labeled for the area, and go in with an MRI staff escort.

## Infection control and sterile areas
Clean devices before and after you bring them into a patient area. In the operating room, the sterile field belongs to the surgical team.

## When unsure
Ask the department safety officer or the lead technologist before entering an unfamiliar room.

> Exam tip: when a scenario sends you into a restricted area, the answer is to ask and get screened, not to proceed quietly because the task is urgent.`,
      hook: "Informatics staff working near imaging equipment respect electrical, radiation, magnetic, infection, and sterile-field rules, and they ask the department before entering."
    }
  ]
});

FRA.units.push({
  id: "u3", n: 3, title: "Image Management", domain: 6,
  blurb: "The reading room, the workflow that gets images in front of a radiologist, the checks that keep data correct, and how images are exchanged and kept.",
  assumes: "Units 1 and 2.",
  lessons: [
    {
      id: "u3l1", title: "The Reading Room: Ergonomics, Lighting and Environment, Room Layout", domain: 6, obj: "F1", minutes: 10,
      body: `A new reading room opens and within a month three radiologists report neck strain and a glare problem on the end workstation. The design was approved on a floor plan. The exam wants you to design for the person who sits there for hours.

## Ergonomics
Choose adjustable chairs with lumbar support and desks that change height. Place monitors at a comfortable height and angle, matched side by side, at a distance that does not force the neck or eyes to strain. Put the keyboard, mouse, and microphone where the arms rest naturally. Repetitive strain comes from long hours with fixed postures, so adjustability is the control. The same care prevents computer vision syndrome, meaning eye strain, dry eyes, and headaches from long screen work. One cause is a screen placed nearer than the eyes' resting point of vergence (RPV), the distance at which the eyes relax.

## Light and the screen
Veiling glare is stray light that washes over the screen and lowers contrast, so control it first.
Ambient light should be dim, even, and controllable at each workstation, at 20 to 40 lux for reading. Light that is too bright washes out dark parts of the image and lowers perceived contrast. Avoid glare and reflections: no window or lamp should reflect in a screen. Indirect lighting with dimmers works better than overhead fluorescent light.

## Noise, temperature, and air
Absorb noise with panels and carpeting, and separate speech recognition users from each other. Computers warm a room, so plan cooling and airflow for every workstation.

## Layout
\`\`\`
Need                    Design response
Single reader           desk away from windows, controllable lamp
Shared reading          room for two chairs, matched displays
Consult space           a separate area so talk does not disturb readers
Traffic                 paths that do not cross behind a reader
Power and network       extra outlets, cable management, a network drop per desk
\`\`\`

> Exam tip: when a reader complains of glare or low contrast, check ambient light and screen reflections before recalibrating the display.`,
      hook: "A reading room is designed for hours of seated work with adjustable furniture, controlled 20 to 40 lux lighting without glare, managed noise and heat, and a layout with space for consults."
    },
    {
      id: "u3l2", title: "The Human-Computer Interface: Displays, Input Devices, and EMR/RIS/PACS/Reporting Integration", domain: 6, obj: "F2", minutes: 10,
      body: `A radiologist logs into four applications to read one study and tells you the day has become a typing exercise. The human-computer interface is how many steps, clicks, and logins stand between the reader and the image.

## Displays
Resolution is counted in megapixels, and a diagnostic display carries far more of them than an office monitor.
A **diagnostic display** is calibrated, has a high luminance and contrast ratio, and a large matrix suited to the images read on it. Mammography needs specialty displays. A **clinical review display** is for referring clinicians, with lower requirements (a contrast ratio above 100 instead of above 250). Grayscale suits most radiography reads; color is used for postprocessed and ultrasound images. Calibration and acceptance testing follow the unit 2 rules.

## Input devices
Mouse, programmable keypads that map hanging protocol and window and level actions to buttons, speech microphones, and keyboards. A device that saves a click saves time across hundreds of studies.

## One desktop
Integration means the EMR, RIS, PACS, and reporting tool behave as one workspace:
- **Context synchronization:** open a study in PACS and the reporting tool and EMR move to the same patient.
- **Single sign-on:** one login for all.
- **Reading worklist:** one list, unified or linked, so the reader does not switch lists.

## Measuring complaints
Do not guess. Time the steps for a standard study, count clicks and logins, and compare before and after a change.

> Exam tip: the best fix for a complaint about many windows is context synchronization and single sign-on, not a bigger monitor.`,
      hook: "A good interface pairs calibrated displays and efficient input devices with integrated EMR, RIS, PACS, and reporting that share one patient context and one login."
    },
    {
      id: "u3l3", title: "Image Workflow: Hanging and Display Protocols, Read-Ready, Postprocessing, Key Images and Annotation", domain: 6, obj: "F3", minutes: 11,
      body: `Every Monday the radiologists rearrange their knee studies by hand. The hanging protocol is not recognizing the exam. Fixing that is where image workflow starts.

## Hanging and display protocols
A **hanging protocol** (or display protocol) decides how the images are arranged for an exam type: which series, which side, which order, and with which window and level. Rules are triggered by data in the study: the procedure code, the modality, the body part, and the series description. If those values are inconsistent, the protocol misfires. Priors are also placed by the protocol.

## Read-ready
A study is **read-ready** when it is complete (all images arrived), correct (patient and order matched), and prefetched with its priors, so the radiologist can open it and start.

## Relevant priors
Rules fetch earlier exams of the same patient and body part. A rule can ask for the same modality, the same region, or a time window. Prefetch brings them from the archive before the reader opens the study.

## Postprocessing
Image filtering, such as sharpening or smoothing, is one kind of postprocessing. It changes how the image looks, never the stored original.
Reformats, multiplanar views, and 3D rendering are built from the stored slices, usually on an advanced visualization server, and results are stored as new series.

## Key images and annotation
A reader marks key images and annotations. They are stored as their own objects, such as a presentation state or a key image note, so the original pixels are untouched.

## Terms
**Window and level** change the contrast and brightness of display. **Slice thickness** is the span each slice covers. **Matrix** is the number of rows and columns.

> Exam tip: wrong layout points to inconsistent procedure codes or series descriptions. Missing priors point to the prior rule or prefetch.`,
      hook: "Hanging protocols, relevant-prior rules, and prefetch put a complete, correct study in front of the reader, and key images and annotations are saved as separate objects."
    },
    {
      id: "u3l4", title: "Image Compression: Lossless, Lossy, Ratios, and Where Each Belongs", domain: 6, obj: "F3", minutes: 9,
      body: `Storage is growing faster than the budget, and someone suggests compressing everything. The first question is what kind of compression, and who decides.

## Two kinds
**Lossless** compression recovers every pixel exactly. Typical reduction is about 1.8 to 2.8 times, and storage planners often use 2.5 to 1. **Lossy**, also called irreversible, discards data for good. Ratios used when interpreting are about 20 to 1 for radiography, 10 to 1 for CT, and 5 to 1 for MRI. A codec is the program that compresses and decompresses an image, and both ends must support the same one.

## Who decides
The radiology department and its policies decide what may be lossy-compressed for interpretation. It is not a decision for IT alone. A lossy ratio must be stated on each image of the study.

## Where each belongs
\`\`\`
Use                          Choice
Primary archive              lossless
Interpretation               lossy only if radiology policy allows
Mobile or web review         lossy is a good fit
Teleradiology preview        lossy acceptable for a quick look
Mammography legal record     never lossy
\`\`\`
Lossy compressed mammograms cannot serve as the legal record.

## The size formula
Compressed size equals original size divided by the ratio. A 262 MB CT study at 10 to 1 is 26.2 MB. At a lossless 2.5 to 1, a 262 MB study is about 104.8 MB, so 157.2 MB is saved.

## Transfer syntaxes
Compression is carried by the transfer syntax: JPEG lossless and JPEG 2000 lossless only are lossless, JPEG baseline is lossy, and JPEG 2000 may be either.

> Exam tip: a request to save space with lossy compression goes to radiology leadership, and the ratio must be recorded on each image.`,
      hook: "Lossless compression gives about 1.8 to 2.8 to 1 with every pixel intact, lossy gives more but discards data, and radiology policy, not IT alone, decides where lossy may be used."
    },
    {
      id: "u3l5", title: "Technologist QC and Exam Data Integrity: Image Counts, Order Reconciliation, Storage Commitment, the Worklist", domain: 6, obj: "F3", minutes: 11,
      body: `A chest study from Tuesday sits in the archive under the wrong patient, and a different patient is missing theirs. Every check in this lesson exists to stop that.

## Technologist QC
After acquisition the technologist confirms:
1. The image count in PACS matches what was acquired.
2. Demographics are right, and the patient was chosen from the worklist.
3. Laterality, markers, and the procedure are correct.
4. The study is sent and complete.

## Data integrity controls
\`\`\`
Control                What it catches
Worklist use           typing errors in demographics
Order reconciliation   studies that do not match an order, using the accession number
Storage commitment     images lost before PACS took responsibility
Accession matching     study linked to the wrong order
\`\`\`

## The exception queue
Studies that cannot match an order or patient go to the unverified, unmatched, or duplicate queue. Someone owns it and empties it daily, and the age of the oldest item is watched.

## Merge, split, and move
A **merge** combines two records for one patient, a **split** separates one record that holds two patients, and a **move** relocates a series or study to the correct patient. These actions change the record, so only trained, authorized staff may do them, and every one is written to the audit trail with who and why.

## The safety reason
A wrong-patient image can lead to a wrong diagnosis or treatment. Every check shortens the time a mistake can live.

> Exam tip: the FIRST step on a wrong-patient study is to flag it and stop its distribution; then correct it by a move or merge using policy and document it.`,
      hook: "Technologist QC, worklist use, order reconciliation, storage commitment, and a daily-owned exception queue stop wrong-patient errors, and every merge, split, and move is audited."
    },
    {
      id: "u3l6", title: "Reports and Results: Preliminary, Final, Addended; Structured Versus Narrative", domain: 6, obj: "F3", minutes: 9,
      body: `An emergency physician acted on a preliminary report and the final report said something different. Who saw which version, and when? Report status is a data field with consequences.

## Report statuses
\`\`\`
Status       Meaning
Preliminary  early read, not signed as final
Final        the signed report of record
Addended     final report with an added note; original text stays
Corrected    final report replaced because of an error, flagged for readers
\`\`\`
An addendum (plural addenda) is added to a signed report instead of rewriting it, so the original text stays visible.

## How they flow
The reporting system sends each version to the EMR as an ORU message, and the RIS status changes with it. The EMR must display the status clearly, and a change from preliminary to final should be visible to the ordering clinician. Who sees which status is a design decision: some roles may see preliminary reports and others only final.

## Structured versus narrative
A scheme such as BI-RADS gives breast reports a fixed set of categories, so results can be counted and followed up.
A **structured** report uses standard fields, templates, and terms, so it is easier to search, count, and feed to decision support. A **narrative** report is free text, flexible but harder to analyze.

## Speech recognition
Speech recognition speeds reporting but adds its own errors: a wrong word that sounds alike, a missing negative, or a wrong side. Reading the draft is the control.

## Audit trail
Every status change and result view should be logged with the user and time, so you can reconstruct who knew what.

> Exam tip: a preliminary report is not the report of record. A change after final is an addendum or a correction, never a silent edit.`,
      hook: "Reports move from preliminary to final, addended, or corrected, each version sent to the EMR with its status, and structured reports are easier to search than narrative text."
    },
    {
      id: "u3l7", title: "Teaching Files, Research, Clinical Trials, and De-identification", domain: 6, obj: "F3", minutes: 10,
      body: `A radiologist wants to save an interesting case to a teaching file, and a research group wants 400 head CT studies for a trial. Both requests must pass through de-identification.

## Workflows
Research may draw on an imaging biobank, a managed collection of de-identified studies kept for later projects.
A **teaching file** keeps selected cases for education, de-identified before saving or sharing. **Research** and **clinical trial** flows send images to a sponsor or an analysis group. An **IRB** reviews research and says what may leave the organization.

## What to remove
The HIPAA Safe Harbor method lists 18 identifier types: names, locations smaller than a state, dates, and ID numbers, among others. In DICOM files, identifiers live in:
\`\`\`
Location                  Examples
Standard header fields    patient name, ID, birth date, accession number, institution, physician names
Private tags              vendor-specific fields that may hold identifiers
Pixel data                text burned into the image
Reconstructions           a head volume can be rendered into a recognizable face
UIDs                      may reveal the source if not replaced
\`\`\`

## Pseudonymization
Pseudonymization, sometimes written pseudoanonymization, replaces identifiers with a code and keeps a separate key, so those authorized can restore the link. Replace UIDs consistently so a study keeps its internal structure without exposing the original.

## Burned-in annotations
Text drawn into the pixels survives header cleaning, so it needs pixel-level removal or masking.

## Verify before export
Run the cleaned output through a header dump, check private tags, and look at a sample image in a viewer before anything leaves.

> Exam tip: header cleaning alone is not de-identification. Check private tags, burned-in text, and facial reconstructions, and verify the output.`,
      hook: "De-identification removes the 18 identifier types from headers, private tags, and burned-in pixels, replaces UIDs consistently, and is verified before any teaching or research export."
    },
    {
      id: "u3l8", title: "Workflow Optimization and Remote Interpretation: Telehealth and Teleradiology", domain: 6, obj: "F3", minutes: 10,
      body: `The overnight list grows to hundreds of studies while one reader sits idle with an empty worklist. Optimization is about measurement, then rules, not about adding screens.

## Measure first
Turnaround time is measured from stage to stage: order to exam, exam to read-ready, read-ready to preliminary, preliminary to final, final to delivered. Plot each stage and the stage with the longest wait is the bottleneck.

## Optimize
- **Worklist balancing:** route studies by subspecialty, priority, and reader workload.
- **Priority rules:** stat studies jump the queue.
- **Bottleneck analysis:** remove the slowest step first, such as an unmatched-study queue.

## Remote interpretation
Consultation tools, such as secure messaging and shared viewing, let a remote reader talk with the local team. A nighthawk service is a remote group that covers overnight reads.
\`\`\`
Model                     Needs
Home reading              secure connection, calibrated display, fast study retrieval
Teleradiology group       contract, access to priors, shared worklist
Night coverage            reliable connection and escalation path
\`\`\`
A remote reader needs bandwidth and low latency, a display that meets the same quality rules as the reading room, and access to the same priors and reports.

## Credentialing and security
Remote readers must be credentialed and licensed for the site and the state where the patient is; at recognition level, know it is a medical staff process, not an IT decision. Remote access should use a VPN or secure web service with strong authentication, logging, and no images saved on personal devices.

> Exam tip: when remote reading is slow, measure retrieval time and bandwidth before changing the worklist. A slow study opening is a network or prefetch problem.`,
      hook: "Optimization starts with stage-by-stage turnaround measurement, then worklist balancing and priority rules, and remote reading adds bandwidth, display quality, credentialing, and secure access."
    },
    {
      id: "u3l9", title: "Image Exchange: Policies, Import and Reconciliation, Export, Portable Media, Cloud, Standards, Cross-Enterprise Sharing", domain: 6, obj: "F4", minutes: 11,
      body: `A patient arrives with a CD from another hospital and the referring physician wants it in your PACS today. Every imported study is a risk until it is reconciled.

## Policies first
An exchange policy says who may import and export, what consent is needed, how requests are logged, and how long outside studies are kept. Policy owners come from compliance and radiology, not IT alone.

## Import
1. Load the disc or the files.
2. Read the index and check demographics.
3. Reconcile: match the patient to the local record and the study to a local order and MRN.
4. Fix mismatches before the study joins the archive.
5. Store it as an outside study so it is labeled as such.

Imported study risks: wrong demographics, duplicate UIDs, unknown transfer syntaxes, and corrupt files.

## Export and media
**PDI** is the standard layout for portable media: a DICOMDIR index and often a viewer. Export rules decide who may export, what, and how it is tracked.

## Cloud and standards
Cross-enterprise sharing in a region often runs through a regional health information organization (RHIO) and an XDS affinity domain, the group of sites that agree to publish and query documents the same way.
\`\`\`
Method                Notes
DICOM media (PDI)     disc or USB with DICOMDIR
DICOMweb              query, retrieve, and store over HTTP
Cloud exchange        sender pushes or receiver pulls by link or query
XDS-I.b               registry, repository, and manifest across enterprises
\`\`\`
Health information exchanges and image sharing networks use these standards between organizations.

## Data integrity
Verify counts and demographics on both ends, and log each transfer.

> Exam tip: never push an unreconciled outside study straight into the patient's record. Reconcile to the right patient and order first.`,
      hook: "Exchange starts with a policy, imports are reconciled to the right patient and order before filing as outside studies, and standards such as PDI, DICOMweb, and XDS-I.b carry the data."
    },
    {
      id: "u3l10", title: "Archiving: Retention and Deletion Policies", domain: 6, obj: "F5", minutes: 9,
      body: `The archive holds studies from 20 years ago and storage costs rise every quarter. The administrator asks what can be deleted. The answer is not an IT decision.

## What sets retention
Retention requirements vary by state, by country, and by record type. Minors are often kept longer, until a set age past the age of majority. Mammography has its own rule: images are kept at least 5 years, or 10 years if the patient has no later mammogram at the facility, and longer where a state requires it. A **legal hold** suspends deletion of any record involved in a case.

## Who owns the policy
A named policy owner, working with compliance, legal, and radiology leadership, sets the schedule. IT carries it out.

## The original record
The record that must be kept is the original from which the diagnosis was made. For mammography, a digitized film copy is not the original for legal retention; it can still be used for comparison.

## Lifecycle and deletion
Destruction of images and electronic protected health information (ePHI) follows the written policy and is documented.
\`\`\`
Step                  Control
Classify              by modality, patient age, and legal hold flag
Schedule              deletion date from the written policy
Approve               policy owner signs the list before purge
Delete                in archive and vendor neutral archive, all copies
Document              what, when, and under which policy
\`\`\`

## The cost argument
Storage, backup, and migration costs grow with every retained study. Deleting studies that may legally be deleted lowers cost and risk, but only under written policy.

> Exam tip: IT never decides what to delete. A legal hold overrides the schedule, and every deletion is documented.`,
      hook: "Retention varies by state, age, and record type, with a policy owner and legal holds setting the schedule, and deletion is documented and carried out by IT only under written policy."
    },
    {
      id: "u3l11", title: "Enterprise Imaging: Visible Light, Radiology, Cardiology", domain: 6, obj: "F6", minutes: 10,
      body: `The dermatology clinic keeps photos on a shared drive, the wound care team uses a phone, and pathology has its own archive. Enterprise imaging brings all images under one strategy.

## What it means
One patient identity, one set of governance rules, and one viewer and archive approach across departments. A **vendor neutral archive** stores images from many systems, and a universal or enterprise viewer displays them.

## The departments
\`\`\`
Source               Notes
Radiology            established workflow, orders-based
Cardiology           established, with waveforms and echo loops
Visible light        pathology, dermatology, wound care, endoscopy
\`\`\`

## Capture workflows
**Orders-based** imaging follows a scheduled order and the modality worklist, as in radiology. **Encounter-based** imaging is tied to a visit rather than an order: a clinician captures a photo and links it to the patient encounter. Encounter-based capture needs a simple, fast way to select the right patient, such as a barcode or a worklist of the day's encounters.

## Governance and metadata
Someone must decide who owns each image type, who may view and capture, what metadata is required (patient, encounter, body site), and how long images are kept. Without metadata an image is unfindable.

## The VNA and the viewer
The VNA keeps images from all departments in standard form, so a change of one department's system does not strand its images. The enterprise viewer lets a clinician see all of a patient's images in one place.

> Exam tip: the problem in visible light imaging is almost always patient identity and metadata, not storage. Solve identity capture first.`,
      hook: "Enterprise imaging gives all departments one identity, governance, archive, and viewer approach, with orders-based and encounter-based capture and the VNA holding images in standard form."
    }
  ]
});
