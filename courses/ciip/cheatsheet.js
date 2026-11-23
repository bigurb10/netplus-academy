// CIIP Academy memorization sheet for the ABII CIIP exam. Standards, configurations, formulas, storage and network
// terms, resilience and security rules, and the operations, procurement, and project vocabulary an imaging informatics
// professional must recall cold. Original content.
window.FRA = window.FRA || {};
FRA.cheatsheet = {
  title: "CIIP Memorization Sheet",
  intro: "Print this and keep it beside you. The CIIP exam rewards recall of the DICOM and HL7 essentials, the IHE profiles and coding systems, the data-integrity checks that keep the right images with the right patient, the storage, network, and capacity arithmetic, the resilience and security rules, and the documents that run an imaging operation. Every name and number on this sheet is fair game.",
  sections: [
    {
      id: "exam", title: "The exam itself",
      blocks: [
        { type: "table", cols: ["Fact", "Value"], rows: [
          ["Certifying body", "The American Board of Imaging Informatics (ABII)"],
          ["Credential", "Certified Imaging Informatics Professional (CIIP), for the people who run imaging systems"],
          ["Questions", "170 in all: 130 scored and 40 unscored pilot items. You cannot tell which are which"],
          ["Time", "170 minutes (2 hours 50 minutes), plus 20 more for the tutorial, the non-disclosure agreement, and the survey"],
          ["Question types", "Mostly single-best-answer multiple choice; some select-multiple (4 to 8 options), exhibit or video, and hot-area items"],
          ["Order", "Questions appear in random order, not grouped by domain"],
          ["Answer rule", "You must answer each question before the next one appears; you may flag it and come back"],
          ["Tools", "An on-screen calculator is available"],
          ["Delivery", "A Pearson VUE test center or online with a remote proctor; any day, no testing windows"],
          ["Attempts", "Three attempts within 12 months of being found eligible; postponing does not move the 12 months"],
          ["Score", "Scaled 1 to 99; 75 passes. ABII states the scaled score is not a percentage. A preliminary result shows on screen"],
          ["Fees", "$500 test; $250 retake; $250 re-application after a late cancel; $10 Pearson VUE reschedule fee"],
          ["Cancel or reschedule", "Up to one business day (24 hours) before a test-center appointment, or 30 minutes before an online one; later means reapplying"],
          ["A missed appointment", "Forfeits the fee but does not count as one of the three attempts"],
          ["Renewal", "24 continuing education credits every two years plus an annual renewal fee, with ten-year requirements on top"],
          ["How the questions read", "Informatics scenarios that ask for the FIRST step, the MOST likely cause, or the BEST configuration, document, or recommendation"]
        ] },
        { type: "table", cols: ["Domain", "Scored questions (of 130)", "Questions in this course's 50-question tests"], rows: [
          ["A. Procurement", "5", "2"],
          ["B. Project Management", "7", "3"],
          ["C. Operations", "16", "6"],
          ["D. Communications", "7", "3"],
          ["E. Training and Education", "5", "2"],
          ["F. Image Management", "23", "9"],
          ["G. Information Technology", "16", "6"],
          ["H. Systems Management", "20", "8"],
          ["I. Clinical Engineering", "13", "5"],
          ["J. Medical Imaging Informatics", "18", "6"]
        ] },
        { type: "table", cols: ["Eligibility category (seven points in all)", "Points and rules"], rows: [
          ["Total", "At least 7 points, and every category minimum met"],
          ["Experience (minimum 1, maximum 5)", "1 point per 12 months as a credentialed imaging professional, a healthcare IT professional, a healthcare informatics professional, or a non-certified radiologic technologist in the military"],
          ["Academic education (minimum 0, maximum 5)", "Highest degree only, not cumulative: 1 for no degree but 30 semester credits (45 quarter); 2 for an associate degree of 60 semester credits; 3 for an associate degree of 90 semester credits; 4 for a bachelor's degree of 120 semester credits; 5 for a master's or doctorate"],
          ["Imaging informatics degree", "1 extra point when the degree itself is in imaging informatics"],
          ["Continuing education (minimum 1, maximum 4)", "1 point per 10 hours of imaging informatics continuing education taken within 18 months of applying"],
          ["Accreditation", "The school must be accredited by a mechanism the United States Department of Education or the Council for Higher Education Accreditation recognizes, or an equivalent authority abroad"]
        ] },
        { type: "note", text: "This course's official-format test uses 75 percent. ABII's 75 is a scaled score, not a percentage, so treat 75 percent as a target, not a prediction." }
      ]
    },
    {
      id: "standards", title: "DICOM, HL7, IHE, and the codes",
      blocks: [
        { type: "table", cols: ["DICOM term", "What to remember"], rows: [
          ["Information model", "Patient, then study, then series, then instance. One patient has many studies, a study has many series, a series has many images or other objects"],
          ["UID", "A globally unique identifier made of numbers and dots, up to 64 characters, built on a root the organization owns. Study, series, and SOP instance UIDs each name one thing and must never repeat for different objects"],
          ["SOP class", "Pairs a service with an object type, such as CT Image Storage. It is the abstract syntax a presentation context proposes"],
          ["SOP instance", "One object of that class, such as a single CT slice, named by its SOP instance UID"],
          ["SCU and SCP", "The service class user asks and the service class provider answers. On a store, the modality is the SCU and PACS is the SCP"],
          ["{{C-ECHO}}", "The DICOM ping: proves the AE titles, address, and port match and an association opens. It does not prove images will flow"],
          ["{{C-STORE}}", "Pushes one object to a provider. Modalities and routers use it to send images to PACS"],
          ["{{C-FIND}}", "Queries a provider at the patient, study, series, or image level and returns matching identifiers"],
          ["{{C-MOVE}}", "Asks a provider to send matching objects to a named destination AE title, which the provider must have configured with an address and port"],
          ["{{C-GET}}", "Retrieves objects back over the same association, so no destination entry is needed"],
          ["Modality worklist (MWL)", "The modality queries the RIS or a broker for scheduled procedures, so demographics are not typed by hand"],
          ["MPPS", "Modality performed procedure step: the modality reports that an exam started, ended, or was discontinued, and which images it made"],
          ["Storage commitment", "The modality asks PACS to take responsibility for stored objects; only after the commitment does the modality delete its local copy"],
          ["Association", "The opening handshake between two AEs: one proposes presentation contexts, the other accepts or rejects each one, data flows, then a release ends it"],
          ["Presentation context", "One abstract syntax (a SOP class) plus the transfer syntaxes the requester can use for it"],
          ["Transfer syntax negotiation", "The two sides agree how the bytes are encoded and compressed. If no proposed syntax is acceptable, that context is rejected and the objects are not sent"],
          ["Conformance statement", "The vendor document listing the SOP classes, SCU and SCP roles, transfer syntaxes, and options a product supports. Read it before buying or connecting a device"],
          ["DICOMDIR", "The index file on portable media that lists the studies on the disc or drive"]
        ] },
        { type: "table", cols: ["Transfer syntax", "UID and behavior"], rows: [
          ["Implicit VR little endian", "1.2.840.10008.1.2: the default every device must support; uncompressed"],
          ["Explicit VR little endian", "1.2.840.10008.1.2.1: uncompressed, each element states its value representation"],
          ["JPEG lossless", "1.2.840.10008.1.2.4.70: compressed with every pixel recoverable"],
          ["JPEG 2000 lossless only", "1.2.840.10008.1.2.4.90: lossless wavelet compression"],
          ["JPEG 2000", "1.2.840.10008.1.2.4.91: may be lossy"],
          ["JPEG baseline", "1.2.840.10008.1.2.4.50: lossy, for review copies"],
          ["RLE lossless", "1.2.840.10008.1.2.5: run-length encoding, lossless"],
          ["Verification SOP class", "1.2.840.10008.1.1: the class {{C-ECHO}} uses"]
        ] },
        { type: "table", cols: ["DICOM tag", "Attribute"], rows: [
          ["(0010,0010)", "Patient's name"],
          ["(0010,0020)", "Patient ID"],
          ["(0008,0050)", "Accession number: ties the images to the order"],
          ["(0008,0060)", "Modality"],
          ["(0020,000D)", "Study instance UID"],
          ["(0028,0010) and (0028,0011)", "Rows and columns, the image matrix"],
          ["(0028,0100)", "Bits allocated per pixel"]
        ] },
        { type: "table", cols: ["DICOM standard part", "What it covers"], rows: [
          ["Part 3", "Information object definitions: what each object contains"],
          ["Part 4", "Service class specifications: store, query, retrieve, worklist"],
          ["Part 5", "Data structures and encoding"],
          ["Part 6", "The data dictionary and the UID registry"],
          ["Part 7", "Message exchange"],
          ["Part 8", "Network communication support"],
          ["Part 14", "The grayscale standard display function"],
          ["Part 15", "Security and system management profiles, including de-identification"],
          ["Part 18", "Web services: {{QIDO-RS}}, {{WADO-RS}}, {{STOW-RS}}"]
        ] },
        { type: "table", cols: ["DICOMweb service", "What it does"], rows: [
          ["{{QIDO-RS}}", "Query (QIDO): find studies, series, or instances over HTTP"],
          ["{{WADO-RS}}", "Retrieve (WADO): fetch objects or rendered images over HTTP"],
          ["{{STOW-RS}}", "Store (STOW): send objects to a server over HTTP"]
        ] },
        { type: "table", cols: ["The configuration triplet", "Rule"], rows: [
          ["AE title", "The name of the application, up to 16 characters and case-sensitive. Each side must list the other's exact AE title"],
          ["IP address or host name", "Where the other device answers. A host name needs working DNS"],
          ["Port", "The listening port. The registered DICOM ports are 104 and 11112; DICOM over TLS is registered on 2762"],
          ["Unknown AE title", "The association is rejected: fix the title on the receiver's allowed list"],
          ["Wrong port or service down", "The connection is refused"],
          ["A firewall dropping the traffic", "The connection times out with no answer"],
          ["Both directions", "Most routes need entries on both devices: the sender needs the receiver's triplet and the receiver needs the sender's title"]
        ] },
        { type: "table", cols: ["HL7 v2 term", "What to remember"], rows: [
          ["Message structure", "A message is a set of segments, one per line, each ending in a carriage return; segments hold fields separated by a pipe, with components, repeats, and subcomponents set by the delimiters in the first segment"],
          ["Delimiters", "Pipe for fields, caret for components, tilde for repeats, backslash for escapes, ampersand for subcomponents"],
          ["{{MSH}}", "Message header: sending and receiving application and facility, date and time, message type, control ID, version"],
          ["{{PID}}", "Patient identification: the identifier list in PID-3, the name in PID-5, birth date, sex"],
          ["{{PV1}}", "Patient visit: location, class, attending provider"],
          ["{{ORC}}", "Common order: order control and the placer and filler order numbers"],
          ["{{OBR}}", "Observation request: the procedure ordered; the filler order number commonly carries the accession number"],
          ["{{OBX}}", "Observation result: one line of result, such as a line of report text, in OBX-5"],
          ["ADT", "Admit, discharge, transfer: carries patient registration, updates, and merges from the registration system to RIS and PACS"],
          ["ORM or OMI", "Orders: a new, changed, or cancelled imaging order from the order entry system to the RIS"],
          ["ORU", "Unsolicited result: the report text and status from the reporting system to the EMR"],
          ["SIU", "Scheduling: appointments booked or changed"],
          ["MDM", "Medical document management: transcribed or scanned documents and their status"],
          ["ACK", "The acknowledgment. {{AA}} means accepted, {{AE}} means application error, {{AR}} means rejected"],
          ["MLLP", "The framing that carries HL7 over TCP: a start byte (0x0B), the message, then 0x1C and a carriage return. There is no universal port; the registered hl7 port is 2575 and sites often choose their own"],
          ["Interface engine", "Receives, routes, queues, and maps messages between systems. A stalled queue is the first place to look when orders or reports stop arriving"]
        ] },
        { type: "table", cols: ["FHIR term", "What to remember"], rows: [
          ["Resources", "Small named building blocks of health data, each with its own address and a defined set of fields"],
          ["REST", "Plain HTTPS calls (get, post, put, delete) carrying JSON or XML"],
          ["Patient", "The person"],
          ["ServiceRequest", "The order, such as an imaging request"],
          ["ImagingStudy", "Describes a study, its series, and its instances, and points at the DICOM objects"],
          ["DiagnosticReport", "The report and its status"]
        ] },
        { type: "table", cols: ["IHE profile", "What it fixes"], rows: [
          ["SWF and SWF.b", "Scheduled workflow: order, schedule, acquire, store, commit, and report with consistent data across systems"],
          ["PIR", "Patient information reconciliation: fixes demographics when a patient is imaged before registration is complete, such as a trauma"],
          ["CPI", "Consistent presentation of images: the same grayscale appearance on every display"],
          ["KIN", "Key image note: flags significant images with a comment"],
          ["PDI", "Portable data for imaging: the format for studies on CD, DVD, or USB, with a DICOMDIR"],
          ["XDS-I.b", "Cross-enterprise document sharing for imaging: a registry lists documents, a repository holds them, and a manifest points to the images"],
          ["IID", "Invoke image display: opens the viewer on the right study from another application"],
          ["REM", "Radiation exposure monitoring: sends dose records to a registry for tracking"],
          ["ATNA", "Audit trail and node authentication: central audit logging and encrypted connections between trusted nodes"],
          ["Consistent Time", "Every system synchronizes its clock to one source so audit trails line up"],
          ["Integration statement", "The vendor's declaration of which IHE profiles and actors a product supports"]
        ] },
        { type: "table", cols: ["Coding system", "Used for"], rows: [
          ["ICD", "Diagnoses and reasons for the exam"],
          ["CPT", "Procedures and billing"],
          ["SNOMED CT", "Clinical terms: findings, body structures, and procedures in a single hierarchy"],
          ["LOINC", "Observations and orders, including many laboratory and imaging order names"],
          ["RadLex", "The radiology lexicon: imaging terms"],
          ["RadLex Playbook", "Standard names and codes for imaging procedures, used to map local procedure names to one set"]
        ] }
      ]
    },
    {
      id: "modalities", title: "Modalities, ancillary services, and display QC",
      blocks: [
        { type: "table", cols: ["Modality", "What it produces and typical object size", "Workflow quirk"], rows: [
          ["Radiography", "Projection images. A computed radiography study is about 20 to 50 MB (average 30); a digital radiography study about 36 to 90 MB (average 54)", "Technologist checks the image, demographics, and laterality before sending; wrong-side or wrong-patient errors start here"],
          ["Fluoroscopy", "Real-time x-ray: often a few key images or a cine run. A digital fluoroscopy study averages about 20 MB (10 to 50)", "Typically only a subset of images is archived; check what was sent"],
          ["Mammography and tomosynthesis", "A screening study of 4 images is about 197 MB uncompressed at 50 micron pixels; a diagnostic study of 6 images about 296 MB. A tomosynthesis exam runs roughly 450 MB to 3 GB", "Heavily regulated; needs specialty display; lossy copies cannot serve as the legal record"],
          ["CT", "Axial slices of 512 x 512 pixels at 2 bytes each, 524,288 bytes per slice. About 60 slices (32 MB) for a single-detector study; a multi-slice study of about 500 images averages 262 MB (range 131 MB to 2.1 GB)", "Thin-slice reconstructions multiply storage and can overwhelm a router or a worklist"],
          ["MRI", "Matrix often 256 x 256 at 2 bytes. A study of about 200 images averages 26 MB (11 to 131 MB)", "Many series per study; sequences vary by vendor, so sizes vary too"],
          ["Ultrasound", "640 x 480 images, 3 bytes for color. About 30 images averages 9.2 MB (6.1 to 18.4); cine loops are multi-frame objects", "Scanner is often unscheduled and typed by hand; worklist use and correct patient entry matter"],
          ["Nuclear medicine and PET", "Nuclear medicine images are 256 x 256 at 2 bytes; about 10 images averages 1.3 MB (0.3 to 3.8). PET studies are fused with their CT", "The patient is radioactive after the dose; PET and CT parts must stay matched"],
          ["Cardiology", "Echo cine loops, cath lab angiography of about 15 MB a study, and waveform objects such as ECG", "Often a separate department system or archive that must be connected to the enterprise"],
          ["Radiation therapy", "Planning images plus plan, structure set, and dose objects", "Objects are special DICOM types; the oncology system, not PACS alone, consumes them"],
          ["Interventional radiology (IR)", "Fluoroscopy and angiography images, about 15 MB for an angiography study", "Procedure room images and dose reports must reach the record"],
          ["Visible light", "Photos and video from cameras, endoscopes, or microscopes, often as encapsulated or multi-frame objects", "Captured outside radiology workflows, so the order or patient link is often missing"]
        ] },
        { type: "list", title: "Ancillary and specialty services", cols: 2, items: [
          "Oncology and tumor tracking across serial exams",
          "Surgical planning from 3D reconstructions",
          "3D printing of anatomical models",
          "Stereotactic and navigation systems",
          "Intraoperative imaging",
          "Point-of-care ultrasound",
          "Wound and medical photography",
          "Digital pathology and whole-slide images, which are very large objects"
        ] },
        { type: "table", cols: ["Display QC item", "What to remember"], rows: [
          ["GSDF", "The DICOM grayscale standard display function (Part 14). It maps each pixel value to a luminance so equal steps look equally different on every calibrated display"],
          ["Just noticeable difference", "The smallest luminance change the eye can see; the GSDF spaces its steps by this"],
          ["AAPM TG18 and TG270", "AAPM task group reports on display quality. TG270 replaced TG18 and its test patterns can be used for the same checks"],
          ["Acceptance test", "Done once when the display is installed, with the full set of patterns and measurements"],
          ["Routine test", "Done on a schedule afterward, with simpler checks and a visual pattern"],
          ["Who performs it", "A medical physicist or a trained, supported team. For mammography displays, a qualified medical physicist is required before clinical use"],
          ["Ambient light", "20 to 40 lux recommended for image interpretation"],
          ["Maximum luminance", "At least 250 cd/m2 for general grayscale displays, with 350 or more common for primary reads; mammography displays need more, about 420 to 450"],
          ["Contrast ratio", "Maximum luminance divided by minimum: above 250 for a diagnostic display and above 100 for a clinical one"],
          ["Contrast response", "Within 10 percent of the GSDF"],
          ["Luminance uniformity", "Measure the four corners and the center; they should not differ by more than 30 percent"],
          ["Matching displays", "The centers of the monitors at one workstation should not differ by more than 10 percent"],
          ["Pixel dropout", "Dark specks in a white field that stay put; compare with the manufacturer's allowed amount"],
          ["Noise check", "A low-contrast dot pattern viewed at 30 cm: on a primary diagnosis display all dots are found in three of four quadrants, on others in two of four"],
          ["Internal photometer check", "Compare the internal sensor to an external meter at acceptance and every 10,000 backlight hours"],
          ["Bit depth", "At least 8 bits of luminance resolution"],
          ["Do not guess from a clean image", "A display can drift out of calibration with no visible fault; the test pattern and meter are the evidence"]
        ] },
        { type: "list", title: "Clinical awareness the exam assumes", cols: 2, items: [
          "Electrical hazards: do not open powered equipment, and report damaged cords",
          "Ionizing radiation: x-ray, CT, fluoroscopy, and nuclear medicine need shielding and dose awareness",
          "Radiopharmaceuticals: nuclear medicine patients are a source of radiation after injection",
          "MRI zones: a strong magnetic field that never turns off, so no ferromagnetic items beyond the screening point",
          "Infection control: hand hygiene and cleaning of shared keyboards and equipment",
          "Biohazards: blood and body fluid precautions in procedure rooms",
          "The sterile field: stay out of it unless gowned and invited",
          "Ask the department safety officer before entering an unfamiliar room"
        ] }
      ]
    },
    {
      id: "imagemgmt", title: "Image management",
      blocks: [
        { type: "table", cols: ["Reading room topic", "What to remember"], rows: [
          ["Ergonomics", "Adjustable chairs with lumbar support, desks with adjustable height, comfortable keyboards and mice, and monitors set at a comfortable height and angle to cut neck and eye strain"],
          ["Ambient light", "Dim, even, and controllable at each work area; 20 to 40 lux for reading; avoid glare and reflections on screens"],
          ["Room layout", "Workstations placed so no window or lamp reflects in a screen, with room to move and to consult"],
          ["Noise", "Absorb it with panels and carpeting, and isolate dictation users from each other"],
          ["Temperature and air", "Many computers warm a room, so plan airflow and cooling for each workstation"],
          ["Monitor positioning", "Matched displays side by side with the same luminance and calibration"],
          ["Human-computer interface", "The integration of the EMR (also called the EHR), RIS, PACS, and the reporting tool; input devices such as mice, keyboards, and dictation microphones; display devices"]
        ] },
        { type: "table", cols: ["Workflow term", "What to remember"], rows: [
          ["Hanging protocol or display protocol", "The rules that decide how images are arranged on the screen for a given exam type, so the radiologist does not rearrange each study"],
          ["Read-ready", "The state when all images and priors have arrived and the study is complete enough to be read"],
          ["Postprocessing and 3D", "Reformats, multiplanar views, and rendering built from the stored slices"],
          ["Key images and annotations", "Selected images and marks that point out what matters, stored as their own objects"],
          ["Priors and relevant-prior rules", "The rules that fetch earlier exams of the same patient and body part for comparison"],
          ["Teaching files", "Cases kept for education, which must be de-identified"],
          ["Remote interpretation", "Teleradiology and telehealth reads from another site, which depend on bandwidth and a secure connection"],
          ["Workflow optimization", "Routing, worklists, and protocol rules that put the right study in front of the right reader"]
        ] },
        { type: "table", cols: ["Compression topic", "What to remember"], rows: [
          ["Lossless", "Every pixel is recovered exactly. Typical reduction is about 1.8 to 2.8 times, and storage planners often use 2.5 to 1"],
          ["Lossy", "Some data is permanently discarded. Typical ratios used when interpreting are about 20 to 1 for radiography, 10 to 1 for CT, and 5 to 1 for MRI"],
          ["Who decides", "The radiology department and its policies choose what may be lossy-compressed for interpretation; it is not a decision for IT alone"],
          ["The ratio on the image", "A lossy ratio must be stated on each image of the study"],
          ["Lossy for review", "Fits web distribution and review copies better than primary interpretation"],
          ["Never lossy under local policy", "Mammography images kept as the legal record; lossy compressed mammograms cannot serve as the legal record"],
          ["The size formula", "Compressed size equals original size divided by the ratio"]
        ] },
        { type: "table", cols: ["Data integrity check", "What it catches"], rows: [
          ["Technologist exam QC", "Image count in PACS matches what was acquired; demographics, laterality, and procedure are right"],
          ["Order reconciliation", "Matches each study to its order using the accession number"],
          ["Storage commitment", "Confirms PACS accepted responsibility before the modality deletes its copy"],
          ["Modality worklist", "Prevents typing errors by pulling demographics from the RIS"],
          ["Merge", "Combines two records created for one patient, usually by correcting the ID"],
          ["Split", "Separates one record that holds two patients"],
          ["Move", "Relocates a series or study to the correct patient"],
          ["The unverified or broken study queue", "Holds studies that cannot match an order or patient; someone must own and empty it daily"],
          ["Audit of every correction", "Every merge, split, and move is logged with who and why"]
        ] },
        { type: "table", cols: ["Report status", "Meaning"], rows: [
          ["Preliminary", "An early read, not yet signed as final"],
          ["Final", "The signed report of record"],
          ["Addended", "A final report with an added note; the original text stays"],
          ["Corrected", "A final report replaced because of an error, flagged so readers know"],
          ["Structured report", "Standard fields and terms, easier to search and count"],
          ["Narrative report", "Free text, flexible but harder to analyze"]
        ] },
        { type: "table", cols: ["Research and sharing", "What to remember"], rows: [
          ["De-identification", "Remove the 18 identifier types the HIPAA Safe Harbor method lists: names, locations smaller than a state, dates, and ID numbers, among others"],
          ["Identifiers in an image file", "Patient name, ID, birth date, accession number, institution, physician names, and private tags"],
          ["Burned-in annotations", "Text drawn into the pixels survives header cleaning and needs pixel-level removal"],
          ["Face reconstructions", "Head CT and MRI volumes can be rendered into a recognizable face"],
          ["Pseudonymization", "Replaces identifiers with a code and keeps a separate key, so the link can be restored by those allowed"],
          ["UIDs", "Replace them consistently so a study keeps its own structure without exposing the original"],
          ["Teaching files", "De-identify before saving or sharing"]
        ] },
        { type: "table", cols: ["Image exchange", "What to remember"], rows: [
          ["CD import", "Load the disc, reconcile demographics to the right patient and order, and fix mismatches before the study joins the archive"],
          ["PDI media", "Standard layout with a DICOMDIR; a viewer is often included"],
          ["Cloud image exchange", "Sharing through a network service, usually with the sender pushing or the receiver pulling a study by link or query"],
          ["XDS-I.b", "A standard way for enterprises to publish and fetch imaging documents"],
          ["Export rules", "Policy decides who may export, what is exported, and how it is logged and tracked"],
          ["Imported study risk", "Wrong demographics, duplicate UIDs, unknown transfer syntaxes, and corrupt files"]
        ] },
        { type: "list", title: "Archive retention", cols: 2, items: [
          "Retention varies by state, country, and type of record",
          "Minors are often kept longer, until a set age past majority",
          "Mammography: kept at least 5 years, or 10 years when the patient has no later mammogram at the facility, and longer if a state requires it",
          "A policy owner, not IT alone, sets the schedule",
          "Deletion happens only under written policy and is documented",
          "A legal hold suspends deletion of any record involved in a case",
          "The original from which the diagnosis was made is the record that must be kept",
          "For mammography, a digitized film copy is not the original for legal retention; it can still be used for comparison"
        ] },
        { type: "list", title: "Enterprise imaging", cols: 2, items: [
          "Visible light images from clinics, wards, and operating rooms",
          "Cardiology images and waveforms in the same archive",
          "Encounter-based imaging tied to a visit rather than a radiology order",
          "One viewer and one archive across departments",
          "A vendor neutral archive and a universal viewer",
          "Consistent patient identity across every department"
        ] }
      ]
    },
    {
      id: "it", title: "Storage, networks, hardware, identity, data",
      blocks: [
        { type: "table", cols: ["Storage term", "What to remember"], rows: [
          ["DAS", "Direct-attached storage: drives attached to one server; simple, not shared"],
          ["NAS", "Network-attached storage: shared files over the network using SMB, CIFS, or NFS"],
          ["SAN", "Storage area network: shared block storage over a dedicated fabric using Fibre Channel or iSCSI"],
          ["SSD", "Solid-state drive: flash, no moving parts, very fast reads and low latency; used for the active tier and databases"],
          ["Object storage", "Data stored as objects with IDs and metadata, reached by an interface like S3; scales widely and fits long-term archives"],
          ["Block, file, and object", "Block is raw volumes for databases and servers; file is folders and shares; object is flat keyed storage"],
          ["iSCSI", "Block storage over ordinary TCP and Ethernet"],
          ["Fibre Channel", "Block storage over its own fast fabric"],
          ["SATA and SCSI", "Drive interfaces; SATA for lower-cost drives, SCSI for enterprise storage"],
          ["SMB and CIFS", "The Windows file-sharing protocol"],
          ["NFS", "The Unix and Linux file-sharing protocol"],
          ["S3", "The common object storage interface; cloud archives use it"]
        ] },
        { type: "table", cols: ["Archive term", "What to remember"], rows: [
          ["Online", "Fast storage holding current and recent studies"],
          ["Nearline", "Slower storage for older studies, still retrievable on demand"],
          ["Offline", "Media taken out of the system, retrieved by hand"],
          ["Tiering", "Moves studies between tiers by age and use"],
          ["IOPS", "Input and output operations per second: the number of reads and writes a storage system sustains; a database needs high IOPS"],
          ["Replication", "Copying data to another system or site as it changes"],
          ["Mirroring", "Writing the same data to two drives or arrays at once"],
          ["Snapshot", "A point-in-time view of a volume used to roll back quickly; it is not a backup on its own"],
          ["Cloud storage", "Rented capacity; check egress costs, retrieval time, and who holds the encryption keys"],
          ["VNA", "A vendor neutral archive stores images in standard formats behind open interfaces so one archive serves many systems and a change of PACS does not mean a data migration"]
        ] },
        { type: "table", cols: ["RAID level", "Usable capacity and failure tolerance"], rows: [
          ["RAID 0", "Striping: all n drives are usable and a single failure loses everything"],
          ["RAID 1", "Mirroring: usable capacity is n divided by 2; survives one failure per mirror pair"],
          ["RAID 5", "Striping with single parity: usable is (n minus 1) drives; at least 3 drives; survives one failure"],
          ["RAID 6", "Striping with double parity: usable is (n minus 2) drives; at least 4 drives; survives two failures"],
          ["RAID 10", "Mirrored pairs then striped: usable is n divided by 2; at least 4 drives; survives one failure per pair"],
          ["Worked example", "Eight 4 TB drives give 32 TB for RAID 0, 28 TB for RAID 5, 24 TB for RAID 6, and 16 TB for RAID 1 or RAID 10"],
          ["RAID is not a backup", "It survives a failed drive, not deleted files, corruption, a fire, or ransomware"]
        ] },
        { type: "table", cols: ["Network term", "What to remember"], rows: [
          ["OSI layer 7, application", "HTTP, DICOM, and HL7 messages; DICOM association negotiation and AE titles live here"],
          ["OSI layer 6, presentation", "Encoding and encryption, such as TLS"],
          ["OSI layer 5, session", "Starts, keeps, and ends a conversation, such as a remote desktop session"],
          ["OSI layer 4, transport", "TCP and UDP, with port numbers"],
          ["OSI layer 3, network", "IP addresses and routers"],
          ["OSI layer 2, data link", "Ethernet frames, MAC addresses, switches, and VLANs"],
          ["OSI layer 1, physical", "Cables, fiber, and radio"],
          ["TCP", "Connection-oriented and reliable, with acknowledgment and retransmission; DICOM, HL7, and HTTP use it"],
          ["UDP", "Connectionless and fast with no delivery guarantee; used by DNS lookups, time, and logging"],
          ["Hub, switch, router, gateway", "A hub repeats everything; a switch forwards by MAC address; a router moves traffic between networks by IP address; a gateway translates between different protocols or networks"],
          ["Trunk", "A link that carries several VLANs between switches"],
          ["Cat 5e and Cat 6", "Copper cable: gigabit Ethernet to 100 meters; Cat 6 also does 10 gigabit over shorter runs"],
          ["Fiber", "Light through glass: longer distance, no electrical noise; multimode for short runs, single-mode for long"],
          ["LAN and WAN", "A local network in one site versus a network linking sites"],
          ["VLAN", "A logical network on shared switches, used to separate devices such as modalities from office computers"],
          ["VPN", "An encrypted tunnel across an untrusted network"],
          ["DNS", "Resolves names to IP addresses; many AE title and viewer problems are really DNS problems"],
          ["ARP", "Resolves an IP address to a MAC address on the local network"],
          ["NAT", "Translates private addresses to a public one; a modality behind NAT may not be reachable for a {{C-MOVE}}"],
          ["DHCP", "Hands out addresses automatically; give modalities and servers fixed or reserved addresses"],
          ["Firewall and TLS", "A firewall allows or blocks by rule; TLS encrypts a connection and proves the server's identity with a certificate"]
        ] },
        { type: "table", cols: ["Service", "Common port"], rows: [
          ["DICOM", "104 or 11112 (registered); 2762 for DICOM over TLS"],
          ["HL7 over MLLP", "Site-chosen; 2575 is the registered hl7 port"],
          ["HTTP", "80"],
          ["HTTPS", "443"],
          ["SSH", "22"],
          ["RDP", "3389"],
          ["LDAP", "389"],
          ["LDAPS", "636"],
          ["DNS", "53"],
          ["SNMP", "161 for polling, 162 for traps"]
        ] },
        { type: "table", cols: ["Bits, bytes, and transfer time", "Rule"], rows: [
          ["Bits and bytes", "1 byte is 8 bits. File sizes use bytes; link speeds use bits per second"],
          ["Transfer time", "Time in seconds equals size in bits divided by link speed in bits per second"],
          ["Worked example", "A 262 MB multi-slice CT is about 262 x 8 = 2,096 megabits. On a 1 Gbps link (1,000 megabits per second) that is about 2.1 seconds at best; on a 100 Mbps link it is about 21 seconds"],
          ["Real throughput", "Always lower than the link speed because of protocol overhead, shared links, and slow disks; a plan should leave headroom"],
          ["Prefixes", "Kilo, mega, giga, and tera step by 1,000 for speeds; storage sellers use 1,000 and operating systems often report 1,024"]
        ] },
        { type: "table", cols: ["Hardware term", "What to remember"], rows: [
          ["CPU", "Runs instructions; matters for servers, compression, and database queries"],
          ["GPU", "Graphics processor; matters for 3D rendering and for the displays at a reading workstation"],
          ["RAM", "Working memory; a workstation viewing large studies needs plenty"],
          ["Drives", "SSD for speed and hard disks for capacity"],
          ["NIC", "Network interface card; a slow or duplex-mismatched one slows image loading"],
          ["Buses", "PCI Express for cards, USB for peripherals, SCSI for drives"],
          ["Server roles", "Database, image archive, web viewer, interface engine, and application servers"],
          ["Workstation roles", "Diagnostic reading, clinical review, technologist QC, and administration"]
        ] },
        { type: "table", cols: ["Software term", "What to remember"], rows: [
          ["OS", "Windows, Linux, and mobile systems; versions must match what the vendor supports"],
          ["Runtimes", "Applications often need a particular {{.NET}} or Java version"],
          ["Browser", "Web viewers need a supported browser version"],
          ["RDP and VNC", "Remote desktop tools; use them over a VPN and with access controls"],
          ["VM", "A virtual machine: one physical server running several isolated servers"],
          ["VDI", "Virtual desktop infrastructure: desktops hosted in the data center and shown remotely"],
          ["Mobile devices", "Phones and tablets need device management, encryption, and a lockable app"]
        ] },
        { type: "table", cols: ["Identity term", "What to remember"], rows: [
          ["Active Directory", "The Microsoft directory holding users, groups, and computers"],
          ["LDAP and LDAPS", "Protocol to query a directory; LDAPS is the encrypted version"],
          ["Group policy", "Pushes settings to computers and users from the directory"],
          ["SSO", "Sign in once to reach many applications; Kerberos does it inside a Windows domain"],
          ["SAML", "XML tokens that let an identity provider vouch for you to another application"],
          ["OAuth 2.0", "Delegated authorization: an app gets a token to act for you without your password"],
          ["Two-factor authentication", "Something you know plus something you have, such as a code on a phone"],
          ["RBAC", "Role-based access control: permissions attach to roles, and people hold roles"]
        ] },
        { type: "table", cols: ["Data term", "What to remember"], rows: [
          ["{{SELECT}}", "Chooses the columns to return"],
          ["{{WHERE}}", "Filters rows by a condition"],
          ["{{JOIN}}", "Combines rows from two tables on a matching key"],
          ["{{GROUP BY}}", "Groups rows so a count or sum is computed per group"],
          ["Primary key", "A column that uniquely identifies a row, such as an accession number in an exam table"],
          ["Foreign key", "A column that points to another table's primary key"],
          ["Normalization", "Splitting data into related tables so each fact is stored once"],
          ["Index", "A structure that speeds up searches on a column; too many slow writes"],
          ["SQL", "The language used to query and change a relational database"],
          ["CSV", "Plain text with comma-separated values; easy to export and open"],
          ["XML and JSON", "Structured text formats for exchange; JSON is lighter"],
          ["RTF and PDF", "Formatted document formats; RTF is editable, PDF is fixed for viewing"]
        ] }
      ]
    },
    {
      id: "systems", title: "Systems management",
      blocks: [
        { type: "table", cols: ["Formula", "How to use it"], rows: [
          ["Study size", "Images x rows x columns x bytes per pixel. A 512 x 512 CT slice at 2 bytes is 524,288 bytes; 60 slices come to about 31.5 million bytes"],
          ["Annual storage", "Exams per year x average study size. Add imports, growth, and a second copy"],
          ["Worked annual example", "100,000 general radiology studies a year need about 4.1 TB uncompressed: radiography 64 percent at 42 MB, CT 20 percent at 52 MB, MRI 5 percent at 39 MB, ultrasound 5 percent at 18 MB, nuclear medicine 3 percent at 1.3 MB, angiography 3 percent at 15 MB"],
          ["Compressed size", "Original size divided by the ratio. A 4.1 TB year at 2.5 to 1 lossless is about 1.6 TB"],
          ["Transfer time", "Size in bits divided by link speed in bits per second"],
          ["Downtime per year", "(1 minus availability) x 525,600 minutes"],
          ["Availability", "Uptime divided by total time"]
        ] },
        { type: "table", cols: ["Availability", "Downtime allowed per year"], rows: [
          ["99 percent", "5,256 minutes, about 87.6 hours"],
          ["99.9 percent", "525.6 minutes, about 8.8 hours"],
          ["99.99 percent", "52.56 minutes"],
          ["99.999 percent", "5.256 minutes"],
          ["Reading the number", "Each extra nine cuts allowed downtime to a tenth and costs much more. Check whether planned maintenance counts"]
        ] },
        { type: "table", cols: ["Licensing model", "What it means"], rows: [
          ["Subscription", "Pay on a recurring basis; stops working or loses support if you stop paying"],
          ["Perpetual", "Pay once and own the license; support and upgrades are bought separately"],
          ["Enterprise", "One license covers the whole organization"],
          ["Concurrent", "Counts how many people use it at the same time"],
          ["Named user", "Counts specific people no matter when they log in"],
          ["Per study", "Cost rises with exam volume"]
        ] },
        { type: "table", cols: ["Testing term", "What to remember"], rows: [
          ["Test strategy", "What will be tested, by whom, in what order, and what counts as a pass"],
          ["Environment", "A test system separate from production, with the same interfaces"],
          ["Test data", "Fake or de-identified patients; never real data in a test system without the same protections"],
          ["Testers", "A mix of administrators, technologists, and radiologists who do the real work"],
          ["Unit test", "One component works alone"],
          ["Functional test", "A feature does what the specification says"],
          ["Integration test", "Two or more systems exchange data correctly"],
          ["Workflow test", "A real scenario runs from order to report"],
          ["Regression test", "Old features still work after a change"],
          ["User acceptance test", "Users confirm the system does their job; sign-off follows"],
          ["Stress and scalability test", "Behavior under heavy load or growth"],
          ["Security test", "Weak passwords, open ports, and access control checks"],
          ["Test cases, scripts, suites, results", "A case is one check; a script is the steps; a suite is a group; the results are recorded for the sign-off"]
        ] },
        { type: "table", cols: ["Resilience term", "What to remember"], rows: [
          ["Redundant components", "Duplicates of parts such as power supplies, drives, and network cards"],
          ["HA", "High availability: a design that keeps service running through a failure"],
          ["Clustering", "Several servers acting as one so another takes over"],
          ["Load balancing", "Spreads requests across servers"],
          ["Failover and failback", "Failover moves service to the backup; failback returns it to the primary after repair"],
          ["Synchronous replication", "A write is not finished until both copies have it: no data loss, but it needs a fast link"],
          ["Asynchronous replication", "The primary does not wait; the copy lags and a failure can lose the most recent data"],
          ["RPO", "Recovery point objective: how much data you can afford to lose, measured as time"],
          ["RTO", "Recovery time objective: how long you can be down before service must be back"],
          ["BC and DR", "Business continuity keeps the work going while systems are down; disaster recovery restores the systems"],
          ["Downtime procedures", "Written steps for paper, local copies, and re-entry"],
          ["Downtime viewer", "A read-only copy of recent images and reports available when the main system is down"]
        ] },
        { type: "table", cols: ["Monitoring term", "What to remember"], rows: [
          ["Incident reporting", "A ticket system with a priority, owner, and a record of what was done"],
          ["Dashboards", "A live view of the interface queues, storage, and server health"],
          ["Alerts", "Notices on a threshold, such as storage at 80 percent or a stalled queue"],
          ["SNMP", "A protocol for polling devices and receiving traps"],
          ["Log aggregation", "Collecting logs in one place to search across systems"],
          ["Protocol analysis", "Capturing network traffic to see exactly what was sent"],
          ["DICOM simulators and validators", "Tools that mimic a modality or PACS and check files and messages against the standard"]
        ] },
        { type: "list", title: "Root cause analysis steps", cols: 2, items: [
          "1. Define the problem",
          "2. Collect data",
          "3. Identify causal factors",
          "4. Find the root cause or causes",
          "5. Develop and implement the solution",
          "6. Write a status report and confirm the fix held"
        ] },
        { type: "table", cols: ["Migration term", "What to remember"], rows: [
          ["Scope", "Which systems, years, and data types move"],
          ["Push and pull", "Push: the old system sends; pull: the new one asks"],
          ["Big-bang versus phased", "Everything at one cutover, or in stages with parallel running"],
          ["Prefetch", "Loading likely-needed priors onto the new system before cutover"],
          ["Physical transfer", "Shipping drives when the network is too slow"],
          ["Data cleanup and standardization", "Fixing patient IDs, names, and procedure names before or during the move"],
          ["Proprietary data and conversion", "Annotations, key images, and reports in a vendor format may need conversion or may not move"],
          ["Validation and reconciliation", "Compare counts by patient, study, series, and image between old and new, and sample images"],
          ["Cost and user impact", "Plan for temporary slowdowns, extra storage, and training"],
          ["Progress reports", "Studies moved, studies failed, and estimated completion"]
        ] },
        { type: "table", cols: ["Security and privacy", "What to remember"], rows: [
          ["HIPAA privacy rule", "Governs use and disclosure of protected health information"],
          ["HIPAA security rule", "Requires administrative, physical, and technical safeguards for electronic information"],
          ["HITECH", "Extends HIPAA and sets breach notification duties; affected individuals must be told without unreasonable delay and no later than 60 days after discovery"],
          ["GDPR", "European privacy regulation with strict consent and data-subject rights"],
          ["PIPEDA", "Canadian federal privacy law for private-sector organizations"],
          ["Practice parameter", "The joint ACR, AAPM, and SIIM document on electronic practice of medical imaging"],
          ["NIST", "The United States standards body whose frameworks guide security controls"],
          ["Physical security", "Locked server rooms, badge access, and screen privacy"],
          ["System and network security", "Patching, hardening, segmentation, and firewalls"],
          ["Endpoint and application security", "Antimalware, least privilege, and secure application settings"],
          ["Encryption", "At rest on disks and backups, and in transit with TLS"],
          ["Audit trails", "Record who opened which record and when; review them for snooping"]
        ] }
      ]
    },
    {
      id: "operations", title: "Operations",
      blocks: [
        { type: "table", cols: ["Quality improvement term", "What to remember"], rows: [
          ["Philosophy", "Improve the process, not blame the person; measure, change, and measure again"],
          ["PDSA", "Plan, do, study, act: a small test of change repeated in cycles"],
          ["Six Sigma DMAIC", "Define, measure, analyze, improve, control: a data-driven method to cut defects"],
          ["Lean", "Remove waste such as waiting, extra steps, rework, and unused talent"],
          ["SBAR", "Situation, background, assessment, recommendation: a clear way to communicate a problem"],
          ["Fishbone chart", "Cause-and-effect diagram that groups possible causes"],
          ["Pareto chart", "Bars ranked by size; a few causes make most of the problem"],
          ["Run chart and control chart", "A run chart shows a measure over time; a control chart adds limits to tell normal variation from a real change"]
        ] },
        { type: "list", title: "Policies and procedures", cols: 2, items: [
          "Downtime policy",
          "Incident management policy",
          "Backup and recovery policy",
          "Privacy and security policy",
          "Access and role policy",
          "Periodic account review and removal of leavers",
          "User management: who gets which role, and how access is granted and removed",
          "Written, approved, and reviewed on a schedule"
        ] },
        { type: "table", cols: ["Compliance topic", "What to remember"], rows: [
          ["HIPAA", "Privacy and security of protected health information"],
          ["HITECH", "Breach notification and stronger enforcement"],
          ["MQSA", "The federal mammography law: facility accreditation, qualified reading physicians, and record keeping"],
          ["Radiation dose tracking", "Collect dose data from each exam and compare it to reference levels"]
        ] },
        { type: "list", title: "Change control", cols: 2, items: [
          "Request: who wants what and why",
          "Impact review: systems, users, interfaces, and risk",
          "Approval by a change board",
          "Schedule in an agreed window",
          "Back-out plan written before the change",
          "Communication to affected users",
          "Test and implement",
          "Post-change review"
        ] },
        { type: "table", cols: ["KPI", "What it tells you"], rows: [
          ["Uptime", "Percent of time the system was available"],
          ["Capacity used and remaining", "Storage and growth rate, giving months until full"],
          ["Exceptions and broken studies", "Studies stuck in verification, unmatched, or failed"],
          ["Unread exams", "Exams waiting past the target time"],
          ["Lost studies", "Studies sent but never found"],
          ["Report turnaround", "Time from exam complete to final report"],
          ["Interface queue depth", "Messages waiting to be delivered; a growing queue means a stalled interface"]
        ] },
        { type: "table", cols: ["Chart", "Use it for"], rows: [
          ["Pivot table", "Summarizing a long list by categories, such as exams by modality and month"],
          ["Bar chart", "Comparing amounts across categories"],
          ["Line chart", "A trend over time"],
          ["Scatter plot", "The relationship between two measures"],
          ["Dashboard", "Many live measures on one screen for monitoring"]
        ] },
        { type: "table", cols: ["Vendor document", "What it states"], rows: [
          ["SOW", "Statement of work: exactly what the vendor will deliver, when, and who does what"],
          ["SMA", "Support and maintenance agreement: what is covered after go-live and what it costs"],
          ["SLA", "Service level agreement: response times, resolution times, and uptime guarantees, and what happens if missed"],
          ["Response versus resolution", "Response is when they begin; resolution is when it is fixed"],
          ["Contract renewal", "Review terms, price increases, and need before the date; auto-renewal can lock you in"],
          ["EOSL", "End of service life: the date the vendor stops supporting the product, which forces an upgrade or replacement"],
          ["Operational budget", "The recurring cost to run a system: support, licenses, storage growth, and staff"]
        ] }
      ]
    },
    {
      id: "projects", title: "Procurement and project management",
      blocks: [
        { type: "table", cols: ["Procurement step", "What to remember"], rows: [
          ["Justification", "Why the organization needs it, supported by total cost of ownership and return on investment"],
          ["TCO", "Everything the system costs over its life: purchase, installation, licenses, hardware, storage, support, staff, training, and migration"],
          ["ROI", "Return on investment: (gain minus cost) divided by cost, as a percent. Spending 200,000 to gain 250,000 over five years is 25 percent"],
          ["Payback period", "Initial cost divided by annual net benefit. 200,000 divided by 50,000 a year is 4 years"],
          ["Goals, scope, and budget", "Written down and agreed first; a preliminary budget comes before bids"],
          ["Procurement policy and governance", "The organization's rules for buying and who decides"],
          ["The plan", "Milestones and dates for the whole selection"],
          ["Needs assessment", "Collect, document, analyze, prioritize, and validate requirements with the users"],
          ["RFI", "Request for information: learn who the vendors are and what they offer"],
          ["RFP", "Request for proposal: detailed requirements and a request for a full answer and price"],
          ["RFQ", "Request for quotation: a price for a clearly defined item"],
          ["Scripted demonstration", "Every vendor performs the same scenarios so they can be compared fairly"],
          ["Reference calls and site visits", "Talk to current customers of the same size and type"],
          ["Scoring matrix", "Weighted criteria with scores for each vendor, filled in by all evaluators"],
          ["Selection", "Pick on the scored evaluation and the references"],
          ["Contract development and negotiation", "Define deliverables, acceptance, support terms, price, and exit rights before signing"]
        ] },
        { type: "table", cols: ["Project management term", "What to remember"], rows: [
          ["Goals and scope", "What the project will and will not do"],
          ["Scope change control", "Every added request is reviewed for cost, time, and risk and approved or declined"],
          ["Risks", "Internal ones come from within the project; external ones come from outside it"],
          ["Risk register", "A list of each risk, its likelihood, its impact, its owner, and its mitigation"],
          ["Dependencies", "A task that cannot start until another finishes"],
          ["WBS", "Work breakdown structure: the project split into smaller pieces of work"],
          ["Resources and effort estimates", "Who is needed and how many hours each task will take"],
          ["Milestones", "Points that mark a major result"],
          ["Critical path", "The longest chain of dependent tasks; a delay there delays the whole project"],
          ["Gantt chart", "A timeline bar chart of tasks and dependencies"],
          ["Time-and-task tracking", "Recording the real hours against the estimates"],
          ["Status report", "Reports budget, schedule, resources, and quality on a regular basis"],
          ["Go-live", "The cutover to production use"],
          ["Retrospective", "A review of what went well and what did not"],
          ["Lessons learned", "Written after go-live so the next project benefits"]
        ] }
      ]
    },
    {
      id: "people", title: "Communications and training",
      blocks: [
        { type: "table", cols: ["Role", "What they do"], rows: [
          ["CMIO", "Chief medical informatics officer: a physician who leads clinical systems use"],
          ["CIO", "Chief information officer: leads IT for the organization"],
          ["Department chair", "Leads a clinical department"],
          ["Section chief", "Leads a subspecialty section within a department"],
          ["Attending", "The senior physician responsible for the patient and the report"],
          ["Resident and fellow", "Physicians in training; residents are earlier in training than fellows"],
          ["Technologist", "Performs the exam and checks its quality"],
          ["PACS administrator", "Runs the imaging systems day to day"],
          ["Informaticist", "Designs workflows and connects clinical and technical staff"]
        ] },
        { type: "list", title: "Settings and specialties", cols: 2, items: [
          "Ambulatory and outpatient clinics",
          "Academic medical centers",
          "Private practice groups",
          "Pediatrics, with special sizes and protocols",
          "Research sites and trials",
          "Radiology, orthopedics, neurology, oncology, and cardiology"
        ] },
        { type: "table", cols: ["Terminology", "What to remember"], rows: [
          ["Anatomical planes", "Axial divides top from bottom, coronal divides front from back, sagittal divides left from right"],
          ["Directional terms", "Anterior is front, posterior is back, superior is up, inferior is down, medial is toward the midline, lateral is away from it"],
          ["Projections", "AP: front to back; PA: back to front; lateral: side; oblique: at an angle"],
          ["Body positions", "Supine on the back, prone on the stomach, upright, decubitus lying on a side"],
          ["Laterality", "Right or left side; getting it wrong is a serious data error"],
          ["Modality-specific terms", "Slice, series, sequence, view, and phase mean different things in different modalities"]
        ] },
        { type: "table", cols: ["Communicating a change", "What to remember"], rows: [
          ["Who", "The affected users and owners"],
          ["What", "What is changing, and the effect on workflow"],
          ["When", "The start, the length, and the end"],
          ["Why", "The reason, in the user's terms"],
          ["How", "What users must do differently, and who to call"],
          ["By role", "Radiologists, technologists, clerks, and clinicians need different messages"],
          ["Notification channels", "Email, banner on the login screen, huddles, intranet, and phone for urgent cases"],
          ["Timing", "Give notice early enough to plan, and send reminders before and after"],
          ["Downtime and upgrade notices", "State the duration, what to use meanwhile, and what to do when it ends"]
        ] },
        { type: "list", title: "Strategic planning and feedback", cols: 2, items: [
          "Tie department goals to the organization's strategic plan",
          "Use reporting tools to show progress against those goals",
          "Collect feedback with surveys",
          "Measure results and report them to leaders",
          "Adjust the plan with what users say"
        ] },
        { type: "table", cols: ["Training term", "What to remember"], rows: [
          ["Needs assessment triggers", "A new system, a workflow change, or a system upgrade"],
          ["Audience", "Size, location, and role decide the method"],
          ["Instructional objectives", "What the learner can do afterward, stated so it can be checked"],
          ["Delivery settings", "In person or virtual"],
          ["Presentation", "Written guides, graphics, and video"],
          ["E-learning", "Self-paced modules that scale to a large audience"],
          ["Super-users", "Trained staff in each area who coach colleagues and report issues"],
          ["Assessment", "A quiz tests knowledge, observation checks the task, a survey gathers opinion"],
          ["Task analysis", "Break a job into steps to see where people fail"]
        ] }
      ]
    }
  ]
};
