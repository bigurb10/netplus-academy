"""Bundle NetPlus Academy into single-file builds.

dist/netplus-academy.html  - complete standalone page (open locally or host anywhere)
dist/artifact.html         - body-only fragment for publishing as a Claude artifact
"""
import os, re, json

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = ["curriculum-1.js", "curriculum-2.js", "curriculum-3.js", "questions-1.js", "questions-2.js", "questions-3.js",
        "questions-4.js", "questions-5.js", "questions-6.js", "questions-7.js", "cheatsheet.js", "deep-1.js", "deep-2.js", "deep-3.js", "generators.js"]
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">'

def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()

css = read("styles.css")
scripts = "\n".join(read(os.path.join("data", d)) for d in DATA) + "\n" + read("app.js")
# Guard against accidental script-closing sequences inside inline code
scripts = scripts.replace("</script", "<\\/script")

body = f"""<title>NetPlus Academy</title>
{FONTS}
<style>
{css}
</style>
<div id="app"></div>
<script>
{scripts}
</script>
"""

standalone = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Self-paced CompTIA Network+ N10-009 course with adaptive training and practice exams.">
{body}
</head>
<body></body>
</html>
"""
# The standalone keeps <div id="app"> and script in head order; move them into body for correctness
standalone = standalone.replace('<div id="app"></div>\n<script>', '</head>\n<body>\n<div id="app"></div>\n<script>', 1)
standalone = standalone.replace('</script>\n\n</head>\n<body></body>\n</html>', '</script>\n</body>\n</html>')

os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
with open(os.path.join(ROOT, "dist", "netplus-academy.html"), "w", encoding="utf-8", newline="\n") as f:
    f.write(standalone)
with open(os.path.join(ROOT, "dist", "artifact.html"), "w", encoding="utf-8", newline="\n") as f:
    f.write(body)

# Report question counts per lesson so gaps are visible
ids = re.findall(r'\{id:"(u\d+l\d+)-\d+",t:"(u\d+l\d+)"', scripts)
counts = {}
for _, t in ids:
    counts[t] = counts.get(t, 0) + 1
lessons = re.findall(r'id: "(u\d+l\d+)", title: "([^"]+)"', scripts)
print(f"questions: {len(ids)} across {len(counts)} lessons; lessons defined: {len(lessons)}")
missing = [l for l, _ in lessons if l not in counts]
low = [(l, counts.get(l, 0)) for l, _ in lessons if 0 < counts.get(l, 0) < 5]
if missing: print("lessons with NO questions:", missing)
if low: print("lessons with fewer than 5 questions:", low)
print("wrote dist/netplus-academy.html", len(standalone), "bytes; dist/artifact.html", len(body), "bytes")
