"""Open findings placed on the 24 segments, and how many concern the moved records (by source review,
or because the finding's text names a record). Run from the asf root."""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
import crlib  # noqa: E402

segs = set(open(os.path.join(os.path.dirname(__file__), "segs24.txt")).read().split())
evs = crlib.read_events()
placed = {e["finding"]: e for e in evs if e.get("act") == "place-finding"}
closed = {e["finding"] for e in evs if e.get("act") == "dispose-finding"
          or (e.get("act") == "review-finding" and e.get("outcome") == "answered")}
open_on = [(f, e) for f, e in placed.items() if f not in closed and (e.get("target") or "").split("#")[0] in segs]
all_on = [(f, e) for f, e in placed.items() if (e.get("target") or "").split("#")[0] in segs]
src = {f for f, _ in open_on if f.startswith(("review:b1-part-ii-check-1", "review:part-ii-check-1-b1-records"))}
txt = {f for f, e in open_on if re.search(r"Claim Record|Record \d|\brecord\b", e.get("text", ""))}
print("findings ever placed on the 24:", len(all_on))
print("open now:", len(open_on), "| from the two record reviews:", len(src), "| from those or naming a record:", len(src | txt))
