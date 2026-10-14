# Coverage checker for the CHTM pack: three independent checks that the pack's text covers the terms
# the reference sources say it should, while the pack stays original.
#   CHECK 1 - the AAMI CHTM study guide: table-of-contents entries (pages 3 and 4) and bold headings (pages 5 to 52).
#   CHECK 2 - the supplementary public documents beside the guide (the CMS equipment maintenance memo,
#             21 CFR Part 803, and any other PDF added later): bookmarks, section titles, and bold headings.
#   CHECK 3 - every named example in the AAMI/ACI CHTM content outline.
# Usage: python scripts/termcheck_chtm.py (run from the repo root).
import re, glob, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# The pack lives in whichever checkout this script sits in, so resolve it from the script's own
# location (scripts/termcheck_chtm.py -> ../courses/chtm) instead of a hard-coded checkout path.
PACK = pathlib.Path(__file__).resolve().parent.parent / "courses" / "chtm"
GUIDE_PDF = "E:/CERT GUIDES/CHTM/AAMI CHTM Study Guide (Lynch, 2016).pdf"
SUPP_PDFS = sorted(p for p in glob.glob("E:/CERT GUIDES/CHTM/*.pdf") if "CHTM Study Guide" not in p)

raw = " ".join(p.read_text(encoding="utf-8") for p in PACK.glob("*.js"))

UK = [(r"\banalogue", "analog"), (r"\bcatalogue", "catalog"), (r"colour", "color"),
      (r"behaviour", "behavior"), (r"\bmetre", "meter"), (r"analys", "analyz"),
      (r"maximis", "maximiz"), (r"minimis", "minimiz"), (r"organis", "organiz"),
      (r"standardis", "standardiz"), (r"recognis", "recogniz"), (r"utilis", "utiliz"),
      (r"prioritis", "prioritiz"), (r"\bprogramme", "program")]

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
    return (" " + t + " ") in NTEXT if len(t) >= 3 else True

STOP = set("and the of in for a an to with as vs on or by at from how what is".split())
def words_missing(term):
    return [w for w in norm(term).split() if w not in STOP and len(w) > 2 and not has(w)]

def report(label, terms):
    miss = ["%s  [absent: %s]" % (t, ", ".join(g)) for t in sorted(terms) if (g := words_missing(t))]
    print("%s entries %d, entries with an absent content word %d:" % (label, len(terms), len(miss)))
    print("\n".join("  " + t for t in miss))
    print()

# ---------------------------------------------------------------- CHECK 3
# Every named example in the CHTM content outline (2026 handbook, pages 22 to 24).
OUTLINE = """business justification; return on investment; general ledger; supplies; payroll; parts; consumables; contracts; training;
financial statements; business activity reports; forecasts; life expectancy; capital planning; GAAP; accounts payable;
accounts receivable; service contracts; terms and conditions; sourcing; fair market value;
patient safety; emergency preparedness; root cause analysis; incident investigation; Failure Modes and Effects Analysis;
Safe Medical Devices Act; sentinel event; PACS; EMR; networked devices; cybersecurity; physical security; patching;
system hardening; Wireless Medical Telemetry Service; network segmentation; recalls; hazards; safety advisories;
work orders; project management; customer satisfaction; CMMS; asset inventory; service history; end of life; installation;
sustainment; lifecycle management; KPIs; staffing; competencies; cost reduction; MEMP; SOPs; EOC manual; committees;
CMS; FDA; FCC; HIPAA; NRC; deemed status; PPE; tools; test equipment; technical information; site preparation; power; network;
service manuals; MAUDE; standardization; operating system life expectancy; antivirus; construction planning; rounding;
huddles; interoperability; change management; downtime procedures; backups;
training needs; failure rates; total time to repair; user satisfaction; soft skills; orientation; mentor; use error;
infection prevention; facilities management; materials management; training manuals; operations manuals;
job descriptions; retention; termination; compensation; engagement; performance development plans; coaching; mentoring;
recognition; conflict; hearings; investigations; ADA; EEOC; FMLA; NLRA; OSHA"""
terms3 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss3 = [t for t in terms3 if not has(t)]
print("CHECK 3 CHTM outline terms %d, misses %d:" % (len(terms3), len(miss3)))
print("  " + (", ".join(miss3) if miss3 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1
# The AAMI guide: table-of-contents entries on pages 3 and 4, then the bold headings on pages 5 to 52.
g = fitz.open(GUIDE_PDF)
DROP1 = re.compile(r"(introduction|table of contents|appendices|additional resources|about the author|acknowledg|index|^[A-C]$|^page$)", re.I)
toc = set()
for i in (2, 3):
    for line in g[i].get_text().splitlines():
        m = re.match(r"^([A-Z][A-Za-z0-9 ,'()/&-]{3,70}?)\s*[. ]{3,}\s*\d+\s*$", line.strip())
        if m and not DROP1.search(m.group(1)):
            toc.add(m.group(1).strip(" ."))
report("CHECK 1a AAMI guide TOC", toc)
heads = set()
for i in range(4, min(52, len(g))):
    for b in g[i].get_text("dict")["blocks"]:
        if b.get("type"):
            continue
        for l in b["lines"]:
            run = "".join(s["text"] for s in l["spans"] if "Bold" in s["font"] and s["size"] >= 10.5).strip()
            run = re.sub(r"\s+", " ", run).strip(" .:\u201c\u201d\"")
            if 3 < len(run) <= 70 and re.match(r"^[A-Za-z]", run) and not DROP1.search(run) and len(run.split()) <= 8:
                heads.add(run)
report("CHECK 1b AAMI guide bold headings (pages 5 to 52)", heads)

# ---------------------------------------------------------------- CHECK 2
# Supplementary public documents beside the guide: their bookmarks when they have them, otherwise their
# CFR section titles ("Sec. 803.xx Title") and bold headings. One report per file.
DROP2 = re.compile(r"(preface|acknowledg|references|index|about the author|bibliograph|front matter|copyright|^page \d|memorandum summary|^subject$|^from$|^to$|^ref:|^date:|^authority|^source)", re.I)

# The GPO print layout of the CFR puts the section number on its own line and wraps the title over
# the next lines, hyphenated at the column break ("803.10" / "Generally, what are the reporting re-" /
# "quirements that apply to me?"), so a one-line "Sec. 803.10 Title" regex finds almost nothing.
# Walk the lines instead: a bare section number (or "SS 803.10" in the body) starts a title that runs
# until a line ending in "." or "?"; rejoin a hyphenated break without a space.
NUMLINE = re.compile(r"^(?:\u00a7\s*)?\d+\.\d+[a-z]?$")
def cfr_sections(doc):
    found = set()
    for i in range(len(doc)):
        lines = [re.sub(r"\s+", " ", x).strip() for x in doc[i].get_text().splitlines()]
        j = 0
        while j < len(lines):
            if not NUMLINE.match(lines[j]):
                j += 1
                continue
            parts, k = [], j + 1
            while k < len(lines) and len(parts) < 6:
                parts.append(lines[k])
                if lines[k].endswith(".") or lines[k].endswith("?"):
                    break
                k += 1
            title = ""
            for p in parts:
                if title.endswith("-"):
                    title = title[:-1] + p
                elif title:
                    title = title + " " + p
                else:
                    title = p
            title = title.strip(" .?")
            if 3 < len(title) <= 120 and re.match(r"^[A-Za-z]", title) and not DROP2.search(title):
                found.add(title)
            j = k + 1
    return found

for path in SUPP_PDFS:
    d = fitz.open(path)
    terms = set()
    for level, title, page in d.get_toc():
        t = re.sub(r"\s+", " ", title).strip()
        t = re.sub(r"^\d+(\.\d+)*\s+", "", t)
        if 3 < len(t) <= 80 and not DROP2.search(t):
            terms.add(t)
    if not terms:
        terms |= cfr_sections(d)
        for i in range(len(d)):
            for b in d[i].get_text("dict")["blocks"]:
                if b.get("type"):
                    continue
                for l in b["lines"]:
                    run = "".join(s["text"] for s in l["spans"] if "Bold" in s["font"] and s["size"] >= 10).strip()
                    run = re.sub(r"\s+", " ", run).strip(" .:")
                    if 3 < len(run) <= 80 and re.match(r"^[A-Za-z]", run) and not DROP2.search(run) and len(run.split()) <= 10:
                        terms.add(run)
    report("CHECK 2 %s" % pathlib.Path(path).name, terms)
if not SUPP_PDFS:
    print("CHECK 2: no supplementary PDF under E:/CERT GUIDES/CHTM/ (record this in Status)")
