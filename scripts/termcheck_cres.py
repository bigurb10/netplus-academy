# Coverage checker for the CRES pack: three independent checks that the pack's text covers the terms
# the reference sources say it should, while the pack stays original.
#   CHECK 1 - the Mometrix CRES guide (OCR text): section headings and the bold "Term:" definitions.
#   CHECK 2a - the Bushong textbook (10th edition): table-of-contents entries for the chapters the exam outline covers.
#   CHECK 2b - the Bushong workbook: the same, with its worksheet titles.
#   CHECK 3 - every named example in the AAMI/ACI CRES content outline.
# Usage: python scripts/termcheck_cres.py (run from the repo root).
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path("E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/courses/cres")
GUIDE_TXT = "E:/CERT GUIDES/CRES/CRES-study-guide-OCR.txt"
TEXTBOOK_PDF = "E:/CERT GUIDES/CRES/Bushong - Radiologic Science for Technologists 10e.pdf"
WORKBOOK_PDF = "E:/CERT GUIDES/CRES/Bushong - Workbook and Laboratory Manual.pdf"

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"\blitre", "liter"),
      (r"analys", "analyz"), (r"maximis", "maximiz"), (r"minimis", "minimiz"),
      (r"organis", "organiz"), (r"standardis", "standardiz"), (r"polaris", "polariz"),
      (r"magnetis", "magnetiz"), (r"recognis", "recogniz"), (r"utilis", "utiliz"),
      (r"\bionis", "ioniz"), (r"visualis", "visualiz"), (r"aluminium", "aluminum"),
      (r"\bearthing\b", "grounding"), (r"\bsulphur", "sulfur"), (r"\bx ray", "x-ray")]

def stem(w):
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w[-3:] in ("ses", "xes", "zes") or len(w) > 5 and w[-4:] in ("ches", "shes"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w

def norm(s):
    s = s.lower().replace("\u2019", "'")
    for a, b in UK:
        s = re.sub(a, b, s)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return " ".join(stem(w) for w in s.split())

NTEXT = " " + norm(raw) + " "

def has(term):
    t = norm(term)
    return (" " + t + " ") in NTEXT if len(t) >= 3 else True

STOP = set("and the of in for a an to with as vs on or by at from".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

# ---------------------------------------------------------------- CHECK 3
# Every named example in the CRES content outline (2026 handbook, pages 18 and 19).
OUTLINE = """heart; lungs; liver; brain; gastrointestinal; circulatory; musculoskeletal; endocrine;
anatomy; technique; positioning; medical terminology;
electrical safety; mechanical safety; magnetic; MRI; electromagnetic interference; radiation;
TJC; Joint Commission; CMS; OSHA; FDA; BRH; MQSA; ACR; ANSI; AAMI; CMMS; recall; compliance report; performance report;
voltage; resistance; current; power; electronic components; circuit; 3-phase; 480 VAC; power distribution;
battery; ultrasound; portable x-ray; UPS; line conditioning; internal system distribution;
x-ray tube; generator; digital detector; ultrasound probe; gamma camera; subsystem;
preventive maintenance; corrective maintenance; positional terminology;
digital voltmeter; electrical safety analyzer; dosimeter;
risk; schematic; manual; diagnostic software; test equipment;
radiological; fluoroscopy; mammography; diagnostic ultrasound; device error; use error; user training; applications;
clinicians; manufacturer; system security; network security; regulatory compliance;
hardware configuration; software configuration; networking; communications; health information system;
PACS; DICOM; worklist; computer hardware; wired; wireless; cable tracer; PING; DICOM echo; interrelated"""
terms3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss3 = [t for t in terms3 if not has(t)]
print("CHECK 3 CRES outline terms %d, misses %d:" % (len(terms3), len(miss3)))
print("  " + (", ".join(miss3) if miss3 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1
# The Mometrix CRES guide: ALL-CAPS section headings and "Term: definition" lines.
guide = pathlib.Path(GUIDE_TXT).read_text(encoding="utf-8")
DROP1 = re.compile(r"(review video|mometrix|important terms|practice|answer|secret key|test taking|anxiety)", re.I)
heads, keyterms = set(), set()
for line in guide.splitlines():
    s = line.strip()
    if re.match(r"^==== page", s):
        continue
    if re.match(r"^[A-Z][A-Z0-9 ,&/()'-]{3,60}$", s) and 2 <= len(s.split()) <= 8 and not DROP1.search(s):
        heads.add(s.title())
    m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{2,50}):\s+[A-Za-z]", s)
    if m and not DROP1.search(m.group(1)) and len(m.group(1).split()) <= 5:
        keyterms.add(m.group(1).strip())
miss1a = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(heads) if (g := words_missing(t))]
print("CHECK 1a CRES guide section headings %d, headings with an absent content word %d:" % (len(heads), len(miss1a)))
print("\n".join("  " + t for t in miss1a))
print()
miss1b = sorted(t for t in keyterms if not has(t))
print("CHECK 1b CRES guide defined terms %d, misses %d:" % (len(keyterms), len(miss1b)))
print("\n".join("  " + t for t in miss1b))
print()

# ---------------------------------------------------------------- CHECK 2
# Bushong: table-of-contents entries for the chapters in scope. Chapters in FULL contribute their title
# and every section under them; chapters in HEADING_ONLY contribute the title alone. Level 2 entries are
# chapters ("1 Title" in the textbook, "1. Title" in the workbook); deeper levels are their sections.
DROP2 = re.compile(r"(answer key|front cover|back cover|inside front cover|preface|contents|copyright|reviewers|dedication|acknowledg|^\d+\s*-\s*\d+$|^[A-Z]$|summary|challenge questions|review questions|objectives|outline|^-\s*\d+$|crossword)", re.I)
def toc_terms(doc, FULL, HEADING_ONLY):
    terms, chapter = set(), None
    for level, title, page in doc.get_toc():
        t = re.sub(r"\s+", " ", title).strip()
        m = re.match(r"^(\d+)[.:]?\s+(.+)$", t)
        if m and level <= 2:
            chapter = int(m.group(1))
            if chapter in FULL or chapter in HEADING_ONLY:
                terms.add(m.group(2).strip())
            continue
        if level <= 2:
            chapter = None
            continue
        if chapter in FULL and not DROP2.search(t):
            terms.add(re.sub(r"^Experiment \d+\s*-\s*", "", t).strip())
    return terms
def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries in scope %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()
# Textbook, 10th edition numbering: 1-11 physics through scatter, 14-18 computers through viewing, 21-28 digital
# artifacts and QC through CT, 35-38 health physics through occupational dose; 12-13 and 19-20 screen-film and
# 29-34 radiobiology at heading level, because the exam treats film as history and radiobiology as dose limits.
report("CHECK 2a Bushong textbook TOC", toc_terms(fitz.open(TEXTBOOK_PDF),
       set(list(range(1, 12)) + list(range(14, 19)) + list(range(21, 29)) + list(range(35, 39))),
       set([12, 13, 19, 20] + list(range(29, 35)))))
# Workbook numbering: 1-12, 16-20, 22-32, 38-40 in full; 13-15 and 33-37 at heading level.
report("CHECK 2b Bushong workbook TOC", toc_terms(fitz.open(WORKBOOK_PDF),
       set(list(range(1, 13)) + list(range(16, 21)) + list(range(22, 33)) + list(range(38, 41))),
       set(list(range(13, 16)) + list(range(33, 38)))))
