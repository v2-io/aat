"""Check vnorm.py against vsect itself: for every segment in the working tree, the short version
`vsect read` prints must equal the one vnorm computes. Run from the asf root."""
import glob
import re
import subprocess
import sys
import time

sys.path.insert(0, __file__.rsplit("/", 1)[0])
import vnorm  # noqa: E402

paths = sorted(p for g in ["01-aat-core/src/*.md", "02-tst-core/src/*.md", "03-llm-core/src/*.md", "04-eli-core/src/*.md"]
               for p in glob.glob(g) if not p.split("/")[-1].startswith("old-"))
limit = int(sys.argv[1]) if len(sys.argv) > 1 else len(paths)
ok = bad = 0
t0 = time.time()
for p in paths[:limit]:
    slug = p.split("/")[-1][:-3]
    mine = vnorm.own_version_of_content(open(p, encoding="utf-8").read())[0][:8]
    out = subprocess.run(["vsect", "read", f"segment:{slug}"], capture_output=True, text=True).stdout
    m = re.search(r" v:([0-9a-f]{8}) ", out.splitlines()[0] if out else "")
    theirs = m.group(1) if m else None
    if theirs == mine:
        ok += 1
    else:
        bad += 1
        print("MISMATCH", slug, "vsect", theirs, "vnorm", mine)
print(f"{ok} agree, {bad} differ, of {min(limit, len(paths))} segments, {time.time() - t0:.1f}s")
