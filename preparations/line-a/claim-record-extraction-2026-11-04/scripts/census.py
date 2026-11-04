"""Before any edit: for each segment carrying a `## Claim Record`, where the section sits, how big it
is, its version now and after removal, the git commit that inserted it and whether removal returns
the text to the version before that commit, and which recorded checks bind which of its versions.
Writes census.json beside the scripts dir. Run from the asf root."""
import json
import os
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(__file__))
import crlib  # noqa: E402
import vnorm  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "census.json")

segs = crlib.segment_paths()
evs = crlib.read_events()
securing = [e for e in evs if e.get("act") in crlib.SECURING]
# who bound which version of which segment
bound = defaultdict(lambda: defaultdict(list))  # seg id -> version -> [event]
for e in securing:
    for rid, v in (e.get("basis") or {}).items():
        bound[rid][v].append(e)
seen_versions = defaultdict(set)
for e in evs:
    for rid, v in (e.get("basis") or {}).items():
        seen_versions[rid].add(v)
    if e.get("about") and (e.get("own-version") or e.get("target-version")):
        seen_versions[e["about"].split("#")[0]].add(e.get("own-version") or e.get("target-version"))

# where each slug sits in 01-aat-core/OUTLINE.md: the last `## *Part*` / `## *Appendices*` heading above it
place = {}
cur = None
for line in open("01-aat-core/OUTLINE.md", encoding="utf-8"):
    if line.startswith("## "):
        cur = line[3:].strip().replace("*", "")
    for tok in line.replace("`", " ").replace("|", " ").replace("[", " ").replace("]", " ").replace("(", " ").replace(")", " ").split():
        t = tok.strip("#,.;:")
        if t in segs and t not in place:
            place[t] = cur

rows = []
for slug, path in sorted(segs.items()):
    content = open(path, encoding="utf-8").read()
    sp = crlib.split_record(content)
    if sp is None:
        continue
    new, sect, start, prev, nxt = sp
    v_cur = vnorm.own_version_of_content(content)[0]
    v_new = vnorm.own_version_of_content(new)[0]
    sid = f"segment:{slug}"
    # git: commits touching the file, oldest first; find the first that carries the heading
    revs = crlib.git("log", "--format=%H", "--reverse", "--", path).split()
    ins = None
    for r in revs:
        c = crlib.file_at(r, path)
        if c and crlib.HEADING + "\n" in c:
            ins = r
            break
    pure = None
    v_before = v_ins_minus = None
    later_touch = 0
    if ins:
        parent_c = crlib.file_at(ins + "^", path)
        ins_c = crlib.file_at(ins, path)
        v_before = vnorm.own_version_of_content(parent_c)[0] if parent_c else None
        v_ins_minus = vnorm.own_version_of_content(crlib.split_record(ins_c)[0])[0]
        pure = v_before == v_ins_minus
        later_touch = len(revs) - revs.index(ins) - 1
    # versions this segment had over its history (by commit), to see if v_new recurs
    hist = []
    for r in revs:
        c = crlib.file_at(r, path)
        if c:
            hist.append((r, vnorm.own_version_of_content(c)[0]))
    hist_versions = [v for _, v in hist]
    nchecks_by_ver = {v: len(es) for v, es in bound[sid].items()}
    entries = sum(1 for l in sect.splitlines() if l.startswith("### "))
    regs = Counter()
    for l in sect.splitlines():
        if l.startswith("**Register:**"):
            regs[l.split("**Register:**", 1)[1].strip().split()[0].strip("—,.;:")] += 1
    rows.append({
        "slug": slug, "path": path,
        "part": place.get(slug),
        "start_line": start + 1, "lines": len(sect.splitlines()), "bytes": len(sect.encode()),
        "entries": entries, "registers": dict(regs), "prev_heading": prev, "next_heading": nxt,
        "v_cur": v_cur, "v_new": v_new,
        "insert_commit": ins, "v_before_insert": v_before, "insert_was_pure": pure,
        "commits_since_insert": later_touch,
        "v_new_equals_pre_insert": v_new == v_before,
        "v_new_seen_in_trail": v_new in seen_versions[sid],
        "v_new_in_git_history": v_new in hist_versions,
        "checks_binding_v_cur": nchecks_by_ver.get(v_cur, 0),
        "checks_binding_v_new": nchecks_by_ver.get(v_new, 0),
        "checks_binding_other": sum(n for v, n in nchecks_by_ver.items() if v not in (v_cur, v_new)),
        "checks_on_self": sum(1 for e in securing if (e.get("about") or "").split("#")[0] == sid),
        "checks_with_it_in_basis": sum(nchecks_by_ver.values()),
    })

json.dump(rows, open(OUT, "w"), indent=1)
hdr = ["slug", "part", "lines", "entries", "insert_was_pure", "commits_since_insert", "v_new_equals_pre_insert",
       "v_new_seen_in_trail", "checks_on_self", "checks_with_it_in_basis", "checks_binding_v_cur", "checks_binding_v_new"]
print("\t".join(hdr))
for r in rows:
    print("\t".join(str(r[h]) for h in hdr))
print("sections:", len(rows), "lines:", sum(r["lines"] for r in rows), "entries:", sum(r["entries"] for r in rows))
print("prev headings:", Counter(r["prev_heading"] for r in rows))
print("next headings:", Counter(r["next_heading"] for r in rows))
