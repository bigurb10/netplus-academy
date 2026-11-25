# Coverage checker for the INST1 pack: independent checks that the pack's text covers the terms the reference
# sources say it should, while the pack stays original.
#   CHECK 1a - the ITSIMM 6th edition's chapter and section titles (table of contents, level 2).
#   CHECK 1b - the ITSIMM 6th edition's glossary terms (bold run at the start of each entry, Terms pages only).
#   CHECK 2  - every task and named example in the BICSI Installer 1 handbook outline (must be zero misses).
# Usage: python scripts/termcheck_inst1.py (run from the repo root).
import re, pathlib, sys, fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PACK = pathlib.Path(__file__).resolve().parent.parent / "courses" / "inst1"
BOOK_PDF = "E:/CERT GUIDES/BICSI-INST1/ITSIMM-6.pdf"

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
OUTLINE = """copper cable; fiber; blueprints; inventory; supplies; materials; site safety plan; labeling; labeling scheme;
telecommunications room; equipment room; entrance facility; telecommunications enclosure; bonding; bonding infrastructure;
cable support systems; telecommunication outlet; wall; cut-in ring; cavity box; floor; utility column; modular furniture;
ceiling; hazardous; exterior; sleeves; cores; slots; poke through; cable tray; ladder rack; continuous cable support;
noncontinuous; J-hook; raceway; under the floor; access floor; innerduct; ENT; firestop; smoke barrier;
cable pulling setup; pull string; rope; conduit; open ceiling; backbone; riser; top down; bottom up; horizontal backbone;
pre-termination; connecting hardware; IDC; multipair; four-pair; coaxial termination; fiber termination;
copper cable testing; troubleshooting; abandoned cable; paging; sound masking; clock; nurse call; BAS; life safety;
elevator; fire code; building code; standards"""
terms2 = [t.strip() for t in OUTLINE.replace("\n", " ").split(";") if t.strip()]
miss2 = [t for t in terms2 if not has(t)]
print("CHECK 2 INST1 outline terms %d, misses %d:" % (len(terms2), len(miss2)))
print("  " + (", ".join(miss2) if miss2 else "none"))
print()

# ---------------------------------------------------------------- CHECK 1a
book = fitz.open(BOOK_PDF)
DROP = re.compile(r"(introduction|conclusion|summary|references|further reading|self-assessment|questions|answer key|index|glossary|contents|contributors|preface|^part |^chapter \d+$|who should read|organization of this book|table of contents|figures|tables|examples|acknowledgments|bibliography|appendix:)", re.I)
titles = set()
gloss_start = gloss_end = None
for level, title, page in book.get_toc():
    t = re.sub(r"\s+", " ", title.replace("\u00a0", " ")).strip()
    if t.lower() == "terms":
        gloss_start = page
    elif gloss_start and gloss_end is None and t.lower().startswith("abbreviations, acronyms"):
        gloss_end = page
    t = re.sub(r"^(chapter \d+:\s*|\d+(\.\d+)*\s+)", "", t, flags=re.I)
    if level == 2 and 3 < len(t) <= 90 and not DROP.search(t):
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
    print("CHECK 1b: no Terms entry in the textbook's table of contents (record this in Status)")
