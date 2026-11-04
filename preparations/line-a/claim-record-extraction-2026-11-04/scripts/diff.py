"""Compare two measure.py saves: which pending pairs left and arrived, which checks stopped waiting
(hold again) and which started. `diff.py before.json after.json`"""
import json
import sys
from collections import Counter

a, b = (json.load(open(p)) for p in sys.argv[1:3])
pa, pb = a["_pair_checks"], b["_pair_checks"]
ca = set(c for v in pa.values() for c in v)
cb = set(c for v in pb.values() for c in v)
gone = sorted(set(pa) - set(pb))
new = sorted(set(pb) - set(pa))
print(f"pairs: {len(pa)} -> {len(pb)}; left {len(gone)}, arrived {len(new)}")
print("pairs that left (record from>to: checks):")
for k in gone:
    print("  -", k, len(pa[k]))
print("pairs that arrived:")
for k in new:
    print("  +", k, len(pb[k]))
print(f"checks waiting: {len(ca)} -> {len(cb)}; hold again {len(ca - cb)}, newly waiting {len(cb - ca)}")
print("reviews of checks that hold again:", Counter(c.split('#')[0] for c in ca - cb).most_common())
print("reviews of checks newly waiting:", Counter(c.split('#')[0] for c in cb - ca).most_common())
json.dump({"hold_again": sorted(ca - cb), "newly_waiting": sorted(cb - ca), "pairs_left": gone, "pairs_arrived": new},
          open(sys.argv[3], "w"), indent=1) if len(sys.argv) > 3 else None
