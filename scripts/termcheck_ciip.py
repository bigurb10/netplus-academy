# Coverage checker for the CIIP pack: independent checks that the pack's text covers the terms the reference
# sources say it should, while the pack stays original.
#   CHECK 1a - the SIIM textbook's chapter and section titles (table of contents, levels 2 and 3).
#   CHECK 1b - the SIIM textbook's glossary terms (bold run at the start of each glossary entry).
#   CHECK 2  - every named example in the ABII CIIP Test Content Outline (must be zero misses).
# Usage: python scripts/termcheck_ciip.py (run from the repo root).
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path(__file__).resolve().parent.parent / "courses" / "ciip"
BOOK_PDF = "E:/CERT GUIDES/CIIP/Practical-Imaging-Informatics-2e.pdf"

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"analys", "analyz"),
      (r"organis", "organiz"), (r"standardis", "standardiz"), (r"utilis", "utiliz"),
      (r"prioritis", "prioritiz"), (r"\bprogramme", "program"), (r"anonymis", "anonymiz")]

def stem(w):
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w[-3:] in ("ses", "xes", "zes") or len(w) > 5 and w[-4:] in ("ches", "shes"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w

def norm(s):
    s = s.lower().replace("\u2019", "'").replace("\u00a0", " ")
    for a, b in UK:
        s = re.sub(a, b, s)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return " ".join(stem(w) for w in s.split())

NTEXT = " " + norm(raw) + " "

def has(term):
    t = norm(term)
    return (" " + t + " ") in NTEXT if len(t) >= 2 else True

STOP = set("and the of in for a an to with as vs on or by at from how what is its their this that are be".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()

# ---------------------------------------------------------------- CHECK 2
OUTLINE = """total cost of ownership; return on investment; procurement; scope; budget; governance; milestones; needs assessment;
RFP; demonstrations; reference checks; vendor selection; contract negotiation;
scope change control; risks; mitigation; dependencies; work breakdown structure; effort estimates; Gantt; status reporting;
retrospective; lessons learned;
quality improvement; Six Sigma; Lean; SBAR; fishbone; downtime; incidents; backup; recovery; privacy; security; access; roles;
HIPAA; MQSA; HITECH; radiation dose tracking; operational budget; change control; data mining; statistical analysis;
KPI; uptime; capacity; exceptions; unread exams; lost studies; pivot table; bar chart; scatter plot;
statement of work; support and maintenance agreement; service level agreement; contract renewal; end of service life;
CMIO; department chair; section chief; resident; ambulatory; academic; private practice; pediatrics; research;
radiology; orthopedics; neurology; oncology; anatomy; physiology; pathology; imaging positions; imaging planes;
ICD; CPT; SNOMED; RadLex; LOINC; change management; notifications; upgrades; strategic plan; surveys;
training need; audience; instructional objectives; task analysis; in-person; virtual; video; training assessment;
ergonomics; room layout; input devices; display devices; postprocessing; compression; display protocols; read-ready;
key image; annotation; teaching files; clinical trials; de-identification; technologist; image count; preliminary; final;
addended; structured; narrative; storage commitment; order reconciliation; modality worklist; workflow optimization;
telehealth; teleradiology; import; reconciliation; export; portable media; cloud; cross enterprise; retention; deletion;
visible light; dermatology; wound care; endoscopy; cardiology;
NAS; SAN; SSD; iSCSI; fiber channel; SATA; S3; CIFS; SMB; NFS; online; nearline; IOPS; virtualization; replication;
mirroring; vendor neutral archive; ethernet; wireless; Bluetooth; OSI; TCP/IP; DICOM; FTP; HTTP; SSH; load balancing;
fault tolerance; redundancy; hubs; switches; routers; gateways; trunks; CAT 6; fiber; IP address; virtual IP; LAN; WAN;
VLAN; VPN; DNS; ARP; NAT; firewall; TLS; ports; bandwidth; latency; GPU; CPU; RAM; hard drive; network interface card;
PCI; USB; SCSI; AGP; CD; DVD; operating system; .NET; Java; browser; RDP; VNC; Active Directory; LDAP; LDAPS;
group policy; single sign on; Kerberos; SAML; OAuth; two-factor authentication; role based access control;
server; Citrix; VMware; virtual desktop infrastructure; mobile devices; SQL; normalization; keys; join; CSV; XML; JSON;
RTF; PDF; lifecycle;
exam counts; scalability; database; storage; tomosynthesis; 256 slice; subscription; enterprise; concurrent; named user;
test strategy; test environment; test data; functional; integration; user acceptance; stress; test cases; suites;
failover; failback; high availability; business continuity; disaster recovery; data replication; incident reporting;
dashboard; alerts; SNMP; protocol analysis; DICOM simulation; log aggregation; root cause; problem definition;
data collection; causal factor; status reports; migration; physical data transfer; data integrity; proprietary;
cost; user impact; progress monitoring; GDPR; PIPEDA; ACR-AAPM-SIIM; NIST; physical; network; endpoint; application;
encryption;
radiography; fluoroscopy; tomography; breast imaging; magnetic resonance imaging; computed tomography; ultrasound;
nuclear medicine; molecular imaging; radiation therapy; interventional radiology; tumor tracking; surgical planning;
3D printing; stereotactic; intraoperative; point of care; medical image capture; digital pathology; AE title; port;
performed procedure step; DICOM services; DICOM objects; validation; transfer syntax; DICOM tools;
grayscale standard display function; part 14; TG18; quality assurance; electrical hazards; ionizing radiation;
radiopharmaceuticals; magnetic fields; infection; biohazards; sterile field;
EMR; web portals; RIS; PACS; enterprise image viewer; CAD; breast; lung; prostate; reporting systems; contrast;
structured reporting; DXA; decision support; order entry; exam protocols; case comparisons; critical results;
discordant findings; peer review; clinical analytics; API; web services; scanned documents; surgical video;
HL7; FHIR; SNOMED CT; ACR; AAPM; SIIM; The Joint Commission; IHE; integration profiles"""
terms2 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss2 = [t for t in terms2 if not has(t)]
print("CHECK 2 CIIP outline terms %d, misses %d:" % (len(terms2), len(miss2)))
print("  " + (", ".join(miss2) if miss2 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1a
book = fitz.open(BOOK_PDF)
DROP = re.compile(r"(introduction|conclusion|summary|references|further reading|self-assessment|questions|answer key|index|glossary|contents|contributors|preface|^part |^chapter \d+$|who should read|organization of this book)", re.I)
titles = set()
gloss_start = gloss_end = None
for level, title, page in book.get_toc():
    t = re.sub(r"\s+", " ", title.replace("\u00a0", " ")).strip()
    if t.lower() == "glossary":
        gloss_start = page
    elif gloss_start and gloss_end is None and page > gloss_start:
        gloss_end = page
    t = re.sub(r"^(chapter \d+:\s*|\d+(\.\d+)*\s+)", "", t, flags=re.I)
    if level in (2, 3) and 3 < len(t) <= 90 and not DROP.search(t):
        titles.add(t)
report("CHECK 1a textbook chapter and section titles", titles)

# ---------------------------------------------------------------- CHECK 1b
terms = set()
if gloss_start:
    last = (gloss_end or len(book)) - 1
    for i in range(gloss_start - 1, last):
        for b in book[i].get_text("dict")["blocks"]:
            if b.get("type"):
                continue
            for l in b["lines"]:
                spans = l["spans"]
                if not spans or "Bold" not in spans[0]["font"]:
                    continue
                run = "".join(s["text"] for s in spans if "Bold" in s["font"]).strip()
                run = re.sub(r"\s+", " ", run.replace("\u00a0", " ")).strip(" .:\u2014\u2013-")
                if 2 < len(run) <= 60 and re.match(r"^[A-Za-z0-9]", run):
                    terms.add(run)
    report("CHECK 1b textbook glossary terms (PDF pages %d to %d)" % (gloss_start, last), terms)
else:
    print("CHECK 1b: no Glossary entry in the textbook's table of contents (record this in Status)")
