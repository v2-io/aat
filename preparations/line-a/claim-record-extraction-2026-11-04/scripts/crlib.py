"""Shared pieces for the Claim Record extraction pilot: finding the section, removing it, parsing
`vsect confirm` output, reading the event trail. Run everything from the asf root."""
import glob
import os
import re
import subprocess

import yaml

import vnorm

HEADING = "## Claim Record"


def section_bounds(lines):
    """(start, end) line indices of the `## Claim Record` section: from its heading up to, not
    including, the next level-2 heading (or end of file). None if absent. Raises if it occurs twice."""
    starts = [i for i, l in enumerate(lines) if l.rstrip() == HEADING]
    if not starts:
        return None
    if len(starts) > 1:
        raise ValueError("two Claim Record headings")
    s = starts[0]
    e = len(lines)
    for j in range(s + 1, len(lines)):
        if lines[j].startswith("## "):
            e = j
            break
    return s, e


def split_record(content):
    """(new_content, section_text, start_line, prev_heading, next_heading). Lines keep their
    newlines, so new_content[:pos] + section_text + new_content[pos:] == content exactly."""
    lines = content.splitlines(keepends=True)
    b = section_bounds(lines)
    if b is None:
        return None
    s, e = b
    prev = next((lines[i].rstrip() for i in range(s - 1, -1, -1) if lines[i].startswith("## ")), None)
    nxt = lines[e].rstrip() if e < len(lines) else None
    return "".join(lines[:s] + lines[e:]), "".join(lines[s:e]), s, prev, nxt


def segment_paths():
    out = {}
    for g in ["01-aat-core/src/*.md", "02-tst-core/src/*.md", "03-llm-core/src/*.md", "04-eli-core/src/*.md"]:
        for p in glob.glob(g):
            n = os.path.basename(p)[:-3]
            if not n.startswith("old-"):
                out[n] = p
    return out


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True, check=True).stdout


def file_at(rev, path):
    r = subprocess.run(["git", "show", f"{rev}:{path}"], capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def read_events(root=".vsect/events"):
    evs = []
    for p in glob.glob(f"{root}/**/*.yaml", recursive=True):
        with open(p, encoding="utf-8") as f:
            d = yaml.safe_load(f)
        d["_path"] = p
        evs.append(d)
    return evs


SECURING = {"rederive", "instantiate", "run", "read-check", "assert", "decline", "read"}

PAIR = re.compile(r"^  (\S+)  v:([0-9a-f]{8}) → v:([0-9a-f]{8})")


def parse_confirm(text):
    """`vsect confirm` listing -> list of dicts {record, from, to, checks:[ref], on:[record], unread:int}."""
    out = []
    cur = None
    for line in text.splitlines():
        m = PAIR.match(line)
        if m:
            cur = {"record": m.group(1), "from": m.group(2), "to": m.group(3), "checks": [], "on": [], "unread": 0}
            out.append(cur)
            continue
        if cur is None:
            continue
        s = line.strip()
        if s.startswith("re-binds"):
            cur["on"] = [x.strip() for x in s.split(" on: ", 1)[1].split(",")] if " on: " in s else []
        elif s.startswith("checks:"):
            body = s[len("checks:"):]
            m2 = re.search(r"\((\d+) of them declared", body)
            if m2:
                cur["unread"] = int(m2.group(1))
                body = body[: body.index("(")]
            cur["checks"] = body.split()
    return out


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)
