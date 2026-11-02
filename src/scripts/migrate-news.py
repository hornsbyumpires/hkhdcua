"""One-off: convert hand-written news .astro pages into Markdown entries.
Run from the repo root: python3 scripts/migrate-news.py
Reads src/data/news-page.json for title/date/summary/cover, and the .astro page for body + photos."""
import json, re, html
from datetime import datetime
from pathlib import Path

LEGACY = {"umpires-appointed", "umpires-appointed-24-25"}  # table-heavy pages kept as .astro
cards = json.loads(Path("src/data/news-page.json").read_text())
out = Path("src/content/news"); out.mkdir(parents=True, exist_ok=True)

def parse_date(s):
    for fmt in ("%b %d, %Y", "%B %d, %Y"):
        try: return datetime.strptime(s.title(), fmt).date().isoformat()
        except ValueError: pass
    raise ValueError(s)

def q(s):  # YAML-safe double-quoted string
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

for c in cards:
    slug = c["cta"]["link"].rsplit("/", 1)[-1]
    fm = {"title": c["title"], "date": parse_date(c["date"]), "description": c["description"],
          "image": c["image"]["src"], "alt": c["image"]["alt"]}
    body, gallery = "", []
    if slug in LEGACY:
        fm["link"] = c["cta"]["link"]
    else:
        src = Path(f"src/pages/news/{slug}.astro").read_text()
        paras = re.findall(r"<p(?:\s[^>]*)?>(.*?)</p>", src, re.S)  # not <polyline>
        body = "\n\n".join(html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", p)).strip()) for p in paras)
        gallery = [g for g in re.findall(r'src=\{"(\./src/asset/images/[^"]+)"\}', src) if g != fm["image"]]
    lines = ["---"] + [f"{k}: {q(v) if k != 'date' else v}" for k, v in fm.items()]
    if gallery:
        lines += ["gallery:"] + [f"  - {q(g)}" for g in gallery]
    lines += ["---", "", body, ""]
    (out / f"{slug}.md").write_text("\n".join(lines))
    print("wrote", slug, "(legacy)" if slug in LEGACY else f"{len(body)} chars, {len(gallery)} photos")