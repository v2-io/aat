"""What vsect itself says about a store, reduced to the numbers the pilot compares.

  measure.py <store dir> <label> [--save <json>]

Everything is read from `vsect` (the dashboard) and `vsect confirm` (the pending pairs), run in the
store dir: no number here is computed by this script's own model of vsect, only counted from its output.
"""
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(__file__))
import crlib  # noqa: E402

SEGS24 = set(open(os.path.join(os.path.dirname(__file__), "segs24.txt")).read().split())


def vsect(d, *args):
    return subprocess.run(["vsect", *args], cwd=d, capture_output=True, text=True).stdout


def measure(d):
    dash = vsect(d)
    conf = vsect(d, "confirm")
    pairs = crlib.parse_confirm(conf)
    m = {}
    g = re.search(r"(\d+) rewordings awaiting a second mind\s+\((\d+) checks lapsed\)", dash)
    m["dash_rewordings_awaiting"] = int(g.group(1)) if g else 0
    m["dash_checks_lapsed"] = int(g.group(2)) if g else 0
    g = re.search(r"(\d+) upstream changes no check read", dash)
    m["dash_unread_upstream"] = int(g.group(1)) if g else 0
    g = re.search(r"(\d+) edits a check rests on, unclassified", dash)
    m["dash_unclassified_edits"] = int(g.group(1)) if g else 0
    g = re.search(r"records with a check recorded (\d+) · holding now (\d+)", dash)
    m["records_checked"], m["records_holding"] = (int(g.group(1)), int(g.group(2))) if g else (0, 0)
    g = re.search(r"· (\d+) records · (\d+) events", dash)
    m["records"], m["events"] = (int(g.group(1)), int(g.group(2))) if g else (0, 0)
    m["pairs"] = len(pairs)
    allchecks = set(c for p in pairs for c in p["checks"])
    m["checks_in_pairs"] = len(allchecks)
    on24 = [p for p in pairs if p["record"] in SEGS24]
    m["pairs_on_24"] = len(on24)
    m["records_of_24_with_pairs"] = len(set(p["record"] for p in on24))
    c24 = set(c for p in on24 for c in p["checks"])
    m["checks_waiting_on_a_24_pair"] = len(c24)
    # checks whose every pending pair is on one of the 24: they hold again if those pairs alone are confirmed
    blocking = {}
    for p in pairs:
        for c in p["checks"]:
            blocking.setdefault(c, set()).add(p["record"] in SEGS24)
    m["checks_freed_by_confirming_only_24_pairs"] = sum(1 for c, s in blocking.items() if s == {True})
    m["_pairs"] = [{k: p[k] for k in ("record", "from", "to")} | {"n_checks": len(p["checks"])} for p in pairs]
    m["_pair_checks"] = {f'{p["record"]} {p["from"]}>{p["to"]}': p["checks"] for p in pairs}
    return m


if __name__ == "__main__":
    d, label = sys.argv[1], sys.argv[2]
    m = measure(d)
    print(label, json.dumps({k: v for k, v in m.items() if not k.startswith("_")}, indent=1))
    if "--save" in sys.argv:
        json.dump(m, open(sys.argv[sys.argv.index("--save") + 1], "w"), indent=1)
