# Coverage checker for a course pack: three independent checks that the pack's text
# covers the terms a reference source says it should.
#   CHECK 3 - every named example in the AAMI/ACI CABT content outline term list.
#   CHECK 1 - the electronics reference book's index, restricted to chapters 1-8, 10, 12, 13.
#   CHECK 2 - the CBET study guide's table of contents and bold key terms (2a and 2b).
# Usage: python scripts/termcheck.py (run from the repo root). The pack path and the
# reference PDF paths are constants below; edit them there to check a different pack
# or a different set of reference books. Reads the PDFs on disk under
# E:\CERT GUIDES\BMET\ and E:\CERT GUIDES\CBET\.
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path("E:/CERT GUIDES/COMPTIA NET+/NetPlus Academy/courses/bmet")
ELECTRONICS_PDF = "E:/CERT GUIDES/BMET/Electronics For Dummies, 2010.pdf"
CBET_STUDY_GUIDE_PDF = "E:/CERT GUIDES/CBET/CBET Exam Secrets Study Guide (Mometrix).pdf"

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"\blitre", "liter"),
      (r"analys", "analyz"), (r"maximis", "maximiz"), (r"minimis", "minimiz"),
      (r"organis", "organiz"), (r"standardis", "standardiz"), (r"polaris", "polariz"),
      (r"magnetis", "magnetiz"), (r"recognis", "recogniz"), (r"utilis", "utiliz"),
      (r"\bionis", "ioniz"), (r"visualis", "visualiz"), (r"aluminium", "aluminum"),
      (r"\bearthing\b", "grounding"), (r"\bsulphur", "sulfur")]

def stem(w):
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w[-3:] in ("ses", "xes", "zes") or len(w) > 5 and w[-4:] in ("ches", "shes"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w

def norm(s, ligature=False):
    s = s.lower().replace("\u2019", "'")
    if ligature:                                  # PDF splits the fi/fl ligatures
        s = re.sub(r"(fi|fl)\s+(?=[a-z])", r"\1", s)
    for a, b in UK:
        s = re.sub(a, b, s)
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return " ".join(stem(w) for w in s.split())

NTEXT = " " + norm(raw) + " "

def has(term, ligature=False):
    t = norm(term, ligature)
    return (" " + t + " ") in NTEXT if len(t) >= 3 else True

# ---------------------------------------------------------------- CHECK 3
# Every named example in the CABT content outline (2026 handbook, pages 9 and 10).
OUTLINE = """respiratory; nervous; circulatory; heart; lungs; kidneys; brain; skin; blood;
otoscope; ophthalmoscope; thermometer; scale; centrifuge; bladder scanner; EKG cart; microscope;
non-invasive blood pressure; pulse oximetry; telemetry; EtCO2; ECG;
infusion pump; suction pump; syringe pump; PCA pump; physical therapy equipment; defibrillator; patient warming; cooling;
graduated cylinder; stopwatch; Allen wrench; torque wrench; channel locks; needle-nose pliers; diagonal cutters; wire stripper; vice grips;
multimeter; electrical safety analyzer; patient simulator; tachometer;
lock out tag out; LOTO; safety data sheet; SDS; color coding; signage; environmental; electrical; microshock; macroshock; chemical;
universal precautions; infection control; imaging; defibrillators; lab equipment; PPE;
Ohm's law; fuse; circuit breaker; capacitor; battery; transformer; direct current; alternating current;
electrostatic discharge; ESD; wiring; color-code; ground; voltage; current; resistance; LED; power supply; switch; load; open circuit; short circuit;
unit conversion; metric; visual measurement; waveform; tolerance; graph; table; flowchart; process of elimination; service manual;
smartphone; application; RAM; hard drive; solid-state drive; CPU; GPU; power supply; printer; local; network;
video output; USB; network cable; LAN; WAN; Bluetooth; RFID; Radio Frequency Identification; data closet; server rack; VPN; VLAN;
HIPAA; device integration; electronic medical record; EMR; firewall; phishing; patch; password"""
terms3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss3 = [t for t in terms3 if not has(t)]
print("CHECK 3 CABT outline terms %d, misses %d:" % (len(terms3), len(miss3)))
print("  " + (", ".join(miss3) if miss3 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1
# Electronics book: top-level index entries whose pages fall in chapters 1-8, 10, 12, 13.
efd = fitz.open(ELECTRONICS_PDF)
RANGES = [(9, 186), (213, 232), (255, 278), (281, 304)]
IDX_START = 368                      # first index page (page index), runs to the end
SKIP = re.compile(r"(for dummies|isbn|website|web site|dummies\.com|\bwww\b|project|\bcatalog)", re.I)
NAME = re.compile(r"^[A-Z][a-z]+,\s*[A-Z][a-z]+$")   # "Ohm, George"

def toplevel_lines(page):
    d = page.get_text("dict")
    rows = []
    for b in d["blocks"]:
        if b.get("type"):
            continue
        for l in b["lines"]:
            txt = "".join(s["text"] for s in l["spans"]).strip()
            if txt:
                rows.append((round(l["bbox"][0], 1), txt))
    if not rows:
        return []
    lefts = sorted({x for x, _ in rows})
    cols = []                        # cluster the x starts into columns
    for x in lefts:
        if cols and x - cols[-1][-1] < 14:
            cols[-1].append(x)
        else:
            cols.append([x])
    margins = {c[0] for c in cols}
    return [(x in margins, t) for x, t in rows]

terms1, pending = {}, None
for i in range(IDX_START, len(efd)):
    for top, txt in toplevel_lines(efd[i]):
        pages = [int(p) for p in re.findall(r"\b(\d{1,3})\b", txt)]
        if top:
            m = re.match(r"^([A-Za-z\u00b5][A-Za-z0-9 ,'()/+.-]{1,45}?)[,.]?\s*((?:\d{1,3}[–-]?\d{0,3}[,;]?\s*)*)$", txt)
            pending = None
            if not m:
                continue
            term = m.group(1).strip(" ,.")
            if SKIP.search(term) or NAME.match(term):
                continue
            term = re.sub(r"\s*\(.*", "", term)          # drop parenthetical gloss
            term = re.split(r"\s+See\b|,", term)[0].strip(" ,.")   # drop cross-refs
            if len(term) < 3 or len(term.split()) > 4 or not re.match(r"^[A-Za-zµ]", term):
                continue
            got = [int(p) for p in re.findall(r"\d{1,3}", m.group(2))]
            if got:
                terms1.setdefault(term, set()).update(got)
            else:
                pending = term            # heading line; pages come from its sub-entries
                terms1.setdefault(term, set())
        elif pending and pages:
            terms1[pending].update(pages)

inrange = {t for t, ps in terms1.items() if any(a <= p <= b for a, b in RANGES for p in ps)}
miss1 = sorted(t for t in inrange if not has(t, ligature=True))
print("CHECK 1 electronics index top-level terms in scope %d (of %d indexed), misses %d:"
      % (len(inrange), len(terms1), len(miss1)))
print("\n".join("  " + t for t in miss1))
print()

# ---------------------------------------------------------------- CHECK 2
# CBET study guide: table of contents, plus the bold key terms in the units this course shares.
mom = fitz.open(CBET_STUDY_GUIDE_PDF)
toc = "\n".join(mom[i].get_text() for i in (7, 8))
DROP = re.compile(r"(secret key|test.taking|practice test|answer key|image credits|anxiety|online resources|introduction|table of contents)", re.I)
terms2 = set()
for line in toc.splitlines():
    line = line.strip()
    m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{3,70}?)\s*[_.]{2,}\s*\d+\s*$", line)
    if m and not DROP.search(m.group(1)):
        terms2.add(m.group(1).strip(" _.-").title())
STOP = set("and the of in for a an to with as vs on".split())
miss2 = []
for t in sorted(terms2):
    gone = [w for w in norm(t).split() if w not in STOP and len(w) > 2 and not has(w)]
    if gone:
        miss2.append("%s  [absent: %s]" % (t, ", ".join(gone)))
print("CHECK 2a CBET guide TOC headings %d, headings with an absent content word %d:"
      % (len(terms2), len(miss2)))
print("\n".join("  " + t for t in miss2))
print()

# bold key terms, printed pages 15 to 85 (page index = printed + 8)
key = set()
for i in range(23, 94):
    d = mom[i].get_text("dict")
    for b in d["blocks"]:
        if b.get("type"):
            continue
        for l in b["lines"]:
            run = ""
            for s in l["spans"]:
                f, t = s["font"], s["text"]
                if "Bold" in f and s["size"] >= 9.5:
                    run += t
                else:
                    if run.strip():
                        key.add(run.strip())
                    run = ""
            if run.strip():
                key.add(run.strip())
terms2b = set()
for t in key:
    t = re.sub(r"\s+", " ", t).strip()
    t = re.split(r"\(|–", t)[0].strip(" .,:;-()")     # drop acronym gloss
    if t.lower().startswith("review video") or t.lower().startswith("sample problem"):
        continue
    if not re.match(r"^[A-Za-z]", t) or len(t) < 4 or len(t.split()) > 4:
        continue
    if DROP.search(t):
        continue
    terms2b.add(t)
miss2b = sorted(t for t in terms2b if not has(t))
print("CHECK 2b CBET guide bold key terms (shared units) %d, misses %d:" % (len(terms2b), len(miss2b)))
print("\n".join("  " + t for t in miss2b))
