"""Bundle FieldReady Academy courses into single-file builds.

python build.py            builds every course under courses/
python build.py netplus    builds one course

dist/<course>.html           - complete standalone page (open locally or host anywhere)
dist/<course>-artifact.html  - body-only fragment for publishing as a Claude artifact
"""
import gzip, os, re, sys, json

ROOT = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.join(ROOT, "engine")
COURSES = os.path.join(ROOT, "courses")
DIST = os.path.join(ROOT, "dist")
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">'
# The site favicon set lives at the web root next to the catalog; bundles are served
# from /<id>/ so the paths are absolute. favicon.svg is the crisp one for Chrome and
# Firefox, favicon.ico (16/32/48) covers everything else, the PNG is for iOS.
ICONS = ('<link rel="icon" href="/favicon.ico" sizes="32x32">\n'
         '<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n'
         '<link rel="apple-touch-icon" href="/apple-touch-icon.png">')


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def course_files(course_dir):
    names = sorted(n for n in os.listdir(course_dir) if n.endswith(".js"))
    return [os.path.join(course_dir, n) for n in ["course.js"] + [n for n in names if n != "course.js"]]


def manifest(course_dir):
    """Pull id, name, and description out of course.js without a JS engine."""
    src = read(os.path.join(course_dir, "course.js"))

    def get(key):
        m = re.search(rf'^\s*{key}:\s*"((?:[^"\\]|\\.)*)"', src, re.M)
        return m.group(1) if m else ""

    return {"id": get("id"), "name": get("name"), "description": get("description")}


CATALOG_ORDER = ["bmet", "cbet", "cres", "chtm", "netplus", "secplus", "aplus1", "aplus2"]


def course_meta(course_id):
    """The account page's row for one course: what engine/summary.js needs, plus names."""
    course_dir = os.path.join(COURSES, course_id)
    src = read(os.path.join(course_dir, "course.js"))
    m = manifest(course_dir)
    exam = re.search(r'exam:\s*\{[^}]*?title:\s*"([^"]+)"[^}]*?code:\s*"([^"]+)"[^}]*?questions:\s*(\d+)', src)
    test = re.search(r'test:\s*\{[^}]*?questions:\s*(\d+)[^}]*?passPct:\s*(\d+)[^}]*?passesNeeded:\s*(\d+)[^}]*?passWindow:\s*(\d+)', src)
    if not exam or not test:
        raise SystemExit(f"{course_id}/course.js: could not read the exam/test fields for the account page")
    scripts = "\n".join(read(p) for p in course_files(course_dir))
    lessons = re.findall(r'id: "(u\d+l\d+)", title: "', scripts)
    labs = sorted(set(re.findall(r'\blab: "([a-z0-9-]+)"', scripts)))
    # The strength chart (engine/strength.js) needs every lesson's domain and the domain list.
    lesson_rows = re.findall(r'id: "(u\d+l\d+)", title: "((?:[^"\\]|\\.)*)", domain: (\d+)', scripts)
    domains = re.findall(r'\{ id: (\d+), name: "((?:[^"\\]|\\.)*)", short: "((?:[^"\\]|\\.)*)", pct: (\d+)', src)
    cp = re.search(r'checkpointN:\s*(\d+)', src)
    if len(lesson_rows) != len(lessons) or not domains:
        raise SystemExit(f"{course_id}: could not read every lesson's domain or the domain list for the account page")
    return {
        "id": m["id"], "name": m["name"],
        "exam": f"{exam.group(1)} {exam.group(2)}",
        "lessons": len(lessons), "labs": len(labs), "examQuestions": int(test.group(1)),
        "passPct": int(test.group(2)), "passesNeeded": int(test.group(3)), "passWindow": int(test.group(4)),
        "checkpointN": int(cp.group(1)) if cp else 4,
        "domains": [{"id": int(i), "name": n.replace('\\"', '"'), "short": s.replace('\\"', '"'), "pct": int(p)} for i, n, s, p in domains if int(p) > 0],
        "lessonList": [{"id": i, "title": t.replace('\\"', '"'), "domain": int(d)} for i, t, d in lesson_rows],
    }


def inline_engine(html, rel_src, engine_file):
    """Replace one <script src=...> with the engine file's text, so the page is self-contained."""
    tag = f'<script src="{rel_src}"></script>'
    assert tag in html, f"expected {tag!r} in the page"
    js = read(os.path.join(ENGINE, engine_file)).replace("</script", "<\\/script")
    return html.replace(tag, "<script>\n" + js + "\n</script>")


# ---------- Google Analytics 4 ----------
# analytics.json is the one place the Measurement ID lives (site/build-site.js reads the
# same file). A GA4 ID is public in every page's source, so it is committed. Empty means
# no snippet anywhere: local builds and tests carry no tracking.
ANALYTICS = os.path.join(ROOT, "analytics.json")


def ga_id():
    """The GA4 Measurement ID from analytics.json, or '' for no tracking."""
    with open(ANALYTICS, encoding="utf-8") as f:
        mid = (json.load(f).get("ga4MeasurementId") or "").strip()
    assert mid == "" or re.fullmatch(r"G-[A-Z0-9]{4,}", mid), \
        f"analytics.json: ga4MeasurementId must look like G-XXXXXXXXXX, got {mid!r}"
    return mid


def ga_snippet(mid=None):
    """Google's gtag snippet for the ID, or '' when there is none."""
    mid = ga_id() if mid is None else mid
    if not mid:
        return ""
    return ('<script async src="https://www.googletagmanager.com/gtag/js?id=' + mid + '"></script>\n'
            '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}'
            "gtag('js',new Date());gtag('config','" + mid + "');</script>\n")


def with_analytics(html):
    """Insert the analytics snippet before the page's one </head>."""
    assert html.count("</head>") == 1, "expected exactly one </head>"
    return html.replace("</head>", ga_snippet() + "</head>")


def serviceforge_stats_sentence():
    """The SF_STATS sentence: real export numbers when the export exists, else a fallback."""
    gz_path = os.path.join(ROOT, "site", "data", "serviceforge.json.gz")
    if not os.path.exists(gz_path):
        return "Model pages are published as the knowledge base grows."
    with gzip.open(gz_path, "rt", encoding="utf-8") as f:
        d = json.load(f)
    s = d["stats"]
    return (f"{s['models_with_knowledge']:,} models, {s['symptoms']:,} symptoms, "
            f"{s['causes']:,} ranked causes, {s['steps']:,} checks, and "
            f"{s['error_codes']:,} error codes, exported {d['exported']}.")


def build_serviceforge():
    """dist/serviceforge.html - the ServiceForge connector page, with analytics."""
    html = read(os.path.join(ROOT, "serviceforge", "index.html"))
    assert "<!-- SF_STATS -->" in html, "expected the SF_STATS marker in serviceforge/index.html"
    html = html.replace("<!-- SF_STATS -->", serviceforge_stats_sentence())
    html = with_analytics(html)
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "serviceforge.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print(f"  wrote dist/serviceforge.html {len(html)} bytes")


def build_catalog():
    """dist/index.html - the catalog with engine/auth.js inlined for its header control."""
    html = with_analytics(inline_engine(read(os.path.join(ROOT, "index.html")), "engine/auth.js", "auth.js"))
    assert "engine/auth.js" not in html
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "index.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/index.html {len(html)} bytes")


def build_account():
    """dist/account.html - progress on every course, fully self-contained."""
    import json
    html = read(os.path.join(ROOT, "account", "index.html"))
    html = html.replace('<link rel="stylesheet" href="../catalog.css">',
                        "<style>\n" + read(os.path.join(ROOT, "catalog.css")) + "\n</style>")
    html = inline_engine(html, "../engine/auth.js", "auth.js")
    ids = [c for c in CATALOG_ORDER if os.path.exists(os.path.join(COURSES, c, "course.js"))]
    table = json.dumps([course_meta(c) for c in ids], ensure_ascii=True).replace("</", "<\\/")
    marker = "<script>\n(function () {\n  // FRA account page"
    html = inline_engine(html, "../engine/summary.js", "summary.js")
    html = inline_engine(html, "../engine/strength.js", "strength.js")
    assert marker in html, "account/index.html no longer matches the strings build_account() inlines"
    html = html.replace(marker, "<script>window.FRA_COURSES = " + table + ";</script>\n" + marker)
    assert "window.FRA_COURSES = [" in html and "<style>" in html and 'src="../engine/' not in html
    html = with_analytics(html)
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, "account.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/account.html {len(html)} bytes ({len(ids)} courses)")


def build(course_id):
    course_dir = os.path.join(COURSES, course_id)
    m = manifest(course_dir)
    css = read(os.path.join(ENGINE, "styles.css"))
    scripts = ("\n".join(read(p) for p in course_files(course_dir)) + "\n"
               + read(os.path.join(ENGINE, "merge.js")) + "\n"
               + read(os.path.join(ENGINE, "strength.js")) + "\n"
               + read(os.path.join(ENGINE, "auth.js")) + "\n"
               + read(os.path.join(ENGINE, "sync.js")) + "\n"
               + read(os.path.join(ENGINE, "instruments.js")) + "\n"
               + read(os.path.join(ENGINE, "app.js")))
    # Guard against accidental script-closing sequences inside inline code
    scripts = scripts.replace("</script", "<\\/script")
    body = f"""<title>{m['name']}</title>
{ICONS}
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
<meta name="description" content="{m['description']}">
<title>{m['name']}</title>
<link rel="canonical" href="https://fieldreadyacademy.com/{course_id}/">
<meta name="robots" content="noindex">
<meta property="og:image" content="https://fieldreadyacademy.com/og-image.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FieldReady Academy">
<meta property="og:title" content="{m['name']}">
<meta property="og:description" content="{m['description']}">
<meta property="og:url" content="https://fieldreadyacademy.com/{course_id}/">
{ICONS}
{FONTS}
<style>
{css}
</style>
{ga_snippet()}</head>
<body>
<div id="app"></div>
<script>
{scripts}
</script>
</body>
</html>
"""
    os.makedirs(DIST, exist_ok=True)
    with open(os.path.join(DIST, f"{course_id}.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(standalone)
    with open(os.path.join(DIST, f"{course_id}-artifact.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(body)

    # Report question counts per lesson so gaps are visible
    ids = re.findall(r'\{id:"(u\d+l\d+)-\d+",t:"(u\d+l\d+)"', scripts)
    counts = {}
    for _, t in ids:
        counts[t] = counts.get(t, 0) + 1
    lessons = re.findall(r'id: "(u\d+l\d+)", title: "([^"]+)"', scripts)
    print(f"[{course_id}] questions: {len(ids)} across {len(counts)} lessons; lessons defined: {len(lessons)}")
    missing = [l for l, _ in lessons if l not in counts]
    low = [(l, counts.get(l, 0)) for l, _ in lessons if 0 < counts.get(l, 0) < 5]
    if missing:
        print("  lessons with NO questions:", missing)
    if low:
        print("  lessons with fewer than 5 questions:", low)
    print(f"  wrote dist/{course_id}.html {len(standalone)} bytes; dist/{course_id}-artifact.html {len(body)} bytes")


def build_callback():
    """dist/callback.html - the shared PKCE completion page, fully self-contained."""
    html = read(os.path.join(ROOT, "callback", "index.html"))
    html = html.replace(
        '<link rel="stylesheet" href="../catalog.css">',
        "<style>\n" + read(os.path.join(ROOT, "catalog.css")) + "\n</style>")
    html = html.replace(
        '<script src="../engine/auth.js"></script>',
        "<script>\n" + read(os.path.join(ENGINE, "auth.js")) + "\n</script>")
    assert "<style>" in html and "engine/auth.js" not in html, \
        "callback/index.html no longer matches the strings build_callback() inlines"
    html = with_analytics(html)
    os.makedirs(DIST, exist_ok=True)
    out = os.path.join(ROOT, "dist", "callback.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  wrote dist/callback.html {len(html)} bytes")


if __name__ == "__main__":
    wanted = sys.argv[1:] or sorted(d for d in os.listdir(COURSES) if os.path.exists(os.path.join(COURSES, d, "course.js")))
    for cid in wanted:
        build(cid)
    build_callback()
    build_serviceforge()
    build_catalog()
    build_account()
