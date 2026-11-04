"""Move each segment's `## Claim Record` section, byte for byte, into claim-records/<slug>.md, and
check the invariant. Run from the asf root (or a copy of it).

  extract.py apply [slug …]          edit the working tree (all segments that carry one, or the named ones)
  extract.py verify <before> <after>  re-check, from git alone, that a commit did exactly this and nothing else

The invariant, per segment, checked in both modes:
  1. splice: the new segment with the moved bytes put back at the same line is the old file, byte for byte;
  2. sidecar: the claim-record file is its frontmatter plus exactly those bytes;
  3. hashed text: vsect's statement text of the new segment equals the old one's with those lines
     removed, so the version changes by the removal and by nothing else;
  4. scope (verify only): no other file under the four src/ dirs changed.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import crlib  # noqa: E402
import vnorm  # noqa: E402

DIR = "claim-records"


def sidecar(slug, section):
    return f"---\ndescribes: segment:{slug}\n---\n{section}"


def check_one(slug, old, new, side):
    errs = []
    sp = crlib.split_record(old)
    if sp is None:
        return [f"{slug}: old text has no Claim Record"]
    want_new, section, start, _, _ = sp
    lines = new.splitlines(keepends=True)
    if "".join(lines[:start]) + section + "".join(lines[start:]) != old:
        errs.append(f"{slug}: splice-back does not reproduce the old file")
    if new != want_new:
        errs.append(f"{slug}: new segment differs from old minus the section")
    if side != sidecar(slug, section):
        errs.append(f"{slug}: sidecar is not frontmatter + the section's exact bytes")
    old_text = vnorm.statement_text(vnorm.split_frontmatter(old)[1])
    new_text = vnorm.statement_text(vnorm.split_frontmatter(new)[1])
    sec_text = vnorm.statement_text(section)
    if old_text.replace(sec_text, "", 1) != new_text or sec_text not in old_text:
        errs.append(f"{slug}: hashed text changed by more than the section")
    if vnorm.split_frontmatter(old)[0] != vnorm.split_frontmatter(new)[0]:
        errs.append(f"{slug}: frontmatter changed")
    return errs


def apply(only):
    segs = crlib.segment_paths()
    os.makedirs(DIR, exist_ok=True)
    done = []
    for slug, path in sorted(segs.items()):
        if only and slug not in only:
            continue
        old = open(path, encoding="utf-8").read()
        sp = crlib.split_record(old)
        if sp is None:
            continue
        new, section, *_ = sp
        side = sidecar(slug, section)
        errs = check_one(slug, old, new, side)
        if errs:
            sys.exit("\n".join(errs))
        open(path, "w", encoding="utf-8").write(new)
        open(f"{DIR}/{slug}.md", "w", encoding="utf-8").write(side)
        done.append((slug, vnorm.own_version_of_content(old)[0][:8], vnorm.own_version_of_content(new)[0][:8]))
    for d in done:
        print("moved", *d)
    print(len(done), "segments")


def verify(before, after):
    changed = crlib.git("diff", "--name-only", before, after).split()
    srcs = [p for p in changed if p.split("/")[0] in ("01-aat-core", "02-tst-core", "03-llm-core", "04-eli-core")]
    errs, n = [], 0
    for p in srcs:
        slug = os.path.basename(p)[:-3]
        old, new = crlib.file_at(before, p), crlib.file_at(after, p)
        side = crlib.file_at(after, f"{DIR}/{slug}.md")
        if old is None or new is None or side is None:
            errs.append(f"{p}: added, deleted, or no sidecar — outside the invariant")
            continue
        errs += check_one(slug, old, new, side)
        n += 1
    sides = [p for p in changed if p.startswith(DIR + "/")]
    if len(sides) != n:
        errs.append(f"{len(sides)} sidecars for {n} segments")
    print(f"{n} segments checked; {len(errs)} violation(s)")
    for e in errs:
        print(" ", e)
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    if sys.argv[1] == "apply":
        apply(set(sys.argv[2:]))
    elif sys.argv[1] == "verify":
        verify(sys.argv[2], sys.argv[3])
