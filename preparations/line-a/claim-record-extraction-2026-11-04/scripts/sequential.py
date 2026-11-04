"""The same move as 24 separate edits, on a throwaway copy of the store (no git), measured after
each one exactly as the one-changeset run was measured.

  sequential.py <copy dir> <out.json>

Per step: extract one segment's record (extract.py apply <slug>), run `vsect revise segment:<slug>`
(it writes an event only when a recorded check rests on the old text), then measure. Records per
step: pairs pending, checks waiting, events, and which checks started or stopped waiting at that step.
No confirmations are made: a confirm must come from a mind other than the reviser, and simulating
one would mean forging an identity.
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import measure  # noqa: E402

d, out = sys.argv[1], sys.argv[2]
segs = [s.split(":", 1)[1] for s in open(os.path.join(HERE, "segs24.txt")).read().split()]
steps = []
prev = measure.measure(d)
prev_checks = set(c for v in prev["_pair_checks"].values() for c in v)
steps.append({"step": 0, "slug": None, **{k: v for k, v in prev.items() if not k.startswith("_")}})
for i, slug in enumerate(segs, 1):
    subprocess.run([sys.executable, os.path.join(HERE, "extract.py"), "apply", slug], cwd=d, check=True, capture_output=True)
    r = subprocess.run(["vsect", "revise", f"segment:{slug}", "--answer", "change=reworded", "--role", "integrator"],
                       cwd=d, capture_output=True, text=True)
    m = measure.measure(d)
    cur_checks = set(c for v in m["_pair_checks"].values() for c in v)
    pairs_prev, pairs_cur = set(prev["_pair_checks"]), set(m["_pair_checks"])
    row = {"step": i, "slug": slug, "revise_wrote_event": "Wrote" in r.stdout,
           **{k: v for k, v in m.items() if not k.startswith("_")},
           "pairs_arrived": len(pairs_cur - pairs_prev), "pairs_left": len(pairs_prev - pairs_cur),
           "checks_started_waiting": sorted(cur_checks - prev_checks),
           "checks_stopped_waiting": sorted(prev_checks - cur_checks)}
    steps.append(row)
    print(i, slug, "pairs", m["pairs"], "+", row["pairs_arrived"], "-", row["pairs_left"], "waiting", len(cur_checks),
          "started", len(row["checks_started_waiting"]), "stopped", len(row["checks_stopped_waiting"]), "events", m["events"], flush=True)
    prev, prev_checks = m, cur_checks
json.dump({"steps": steps, "final_pair_checks": prev["_pair_checks"]}, open(out, "w"), indent=1)
