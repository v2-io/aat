"""What a confirmer of this changeset would be asked to judge. For each pair the extraction created
(the version that carried the record -> the version without it), the checks it would re-bind, and
whether each check's criterion is about the record or about the body. Also: every check recorded
on the 24 segments themselves, classified the same way.

The classifier is a reading aid, not a judgment: a criterion is "about the record" when it names the
Claim Record, a record by number, or a record field (Register, Population, True of, False of,
Falsifier, Instantiated). Every check it places there is printed so a reader can overrule it.

  subjects.py <one-changeset measure json> <out json>
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
import crlib  # noqa: E402

REC = re.compile(r"Claim Record|\bRecords? \d|\brecords?\b.*\b(field|entry|entries)\b|\*\*(Register|Population|True of|False of|Falsifier|Instantiated)|\b(Population|Falsifier|False of|True of|Instantiated)\b\s*[:(\"]|register", re.I)

m = json.load(open(sys.argv[1]))
census = {r["slug"]: r for r in json.load(open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "census.json")))}
evs = crlib.read_events()
by_ref = {}
for e in evs:
    if e.get("act") in crlib.SECURING:
        if e.get("from"):
            by_ref[e["from"]] = e
        by_ref[e["id"][:8]] = e

new_pairs = {}
for k, checks in m["_pair_checks"].items():
    rec, fv = k.split(" ")
    f, t = fv.split(">")
    slug = rec.split(":", 1)[1]
    if slug in census and census[slug]["v_cur"].startswith(f) and census[slug]["v_new"].startswith(t):
        new_pairs[k] = checks

out = {"new_pairs": {}, "on_self": {}}
tot = rec_n = 0
for k, checks in sorted(new_pairs.items()):
    rows = []
    for c in checks:
        e = by_ref.get(c)
        crit = (e or {}).get("criterion", "")
        about_rec = bool(REC.search(crit))
        rows.append({"check": c, "about": (e or {}).get("about"), "record": about_rec, "criterion": crit[:300]})
    out["new_pairs"][k] = rows
    n_rec = sum(r["record"] for r in rows)
    tot += len(rows)
    rec_n += n_rec
    print(f"{k}: {len(rows)} checks, {n_rec} about the record")
print(f"new pairs: {len(new_pairs)}; checks: {tot}; about the record: {rec_n}")

self_tot = self_rec = 0
for slug in census:
    sid = f"segment:{slug}"
    rows = []
    for e in evs:
        if e.get("act") in crlib.SECURING and (e.get("about") or "").split("#")[0] == sid:
            crit = e.get("criterion", "")
            rows.append({"check": e.get("from") or e["id"][:8], "outcome": e.get("outcome"), "role": (e.get("actor") or {}).get("role"),
                         "record": bool(REC.search(crit)), "criterion": crit[:300]})
    out["on_self"][sid] = rows
    self_tot += len(rows)
    self_rec += sum(r["record"] for r in rows)
print(f"checks recorded on the 24 themselves: {self_tot}; about the record by criterion: {self_rec}")
json.dump(out, open(sys.argv[2], "w"), indent=1)
