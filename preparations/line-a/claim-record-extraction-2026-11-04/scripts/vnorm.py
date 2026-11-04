"""A Python transcription of vsect's own version for a record (vsect 0.1.0, normalizer vsect-norm/0).

Source transcribed: ~/src/arch/firmatum/utils/vsect/src/record.rs (split_frontmatter, statement_text)
and src/norm.rs (strip_tool_markers, normalize, canonical_object, own_version). It exists so the
pilot can compute versions at past git revisions, which vsect itself only does for the working tree.
It is checked against vsect's own output by validate.py before any number here is trusted.
"""
import hashlib
import re
import sys
import unicodedata

import yaml

NORMALIZER = "vsect-norm/0"


def rust_lines(s):
    """str::lines: split on \\n, drop one trailing empty piece, strip a trailing \\r per line."""
    parts = s.split("\n")
    if parts and parts[-1] == "":
        parts.pop()
    return [p[:-1] if p.endswith("\r") else p for p in parts]


def split_frontmatter(content):
    c = content[1:] if content.startswith("﻿") else content
    if c.startswith("---\n"):
        rest = c[4:]
        end = rest.find("\n---\n")
        if end != -1:
            return rest[:end], rest[end + 5:]
        if rest.endswith("\n---"):
            return rest[:-4], ""
    return None, c


def statement_text(body):
    out = []
    in_wn = False
    in_mark = False
    for line in rust_lines(body):
        trimmed = line.rstrip()
        if trimmed.startswith("## "):
            title = trimmed[3:].strip().lower()
            in_wn = title == "working notes"
            if in_wn:
                continue
        elif in_wn and trimmed.startswith("# "):
            in_wn = False
        if in_wn:
            continue
        if trimmed.startswith("> [!vsect "):
            in_mark = True
            continue
        if in_mark:
            if trimmed.startswith(">"):
                continue
            in_mark = False
        out.append(line + "\n")
    return "".join(out)


def strip_tool_markers(text):
    out = []
    rest = text
    while True:
        i = rest.find("<!--md-press:")
        if i == -1:
            break
        out.append(rest[:i])
        j = rest[i:].find("-->")
        if j == -1:
            out.append(rest[i:])
            rest = ""
            break
        rest = rest[i + j + 3:]
    out.append(rest)
    return "".join(out)


_DIGITS = re.compile(r"^[0-9]+")


def opens_block(line):
    t = line.lstrip()
    if (t.startswith("#") or t.startswith("- ") or t.startswith("* ") or t.startswith("+ ")
            or t.startswith(">") or t.startswith("|") or t == "---" or t == "***"):
        return True
    m = _DIGITS.match(t)
    return bool(m) and t[m.end():].startswith(". ")


def collapse(line):
    return " ".join(line.split())


def normalize(text):
    text = strip_tool_markers(text)
    text = unicodedata.normalize("NFC", text)
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    blocks, para, verbatim = [], [], []
    fence = None
    in_math = False

    def flush():
        if para:
            blocks.append("\n".join(para))
            para.clear()

    for line in rust_lines(text):
        if fence is not None:
            verbatim.append(line)
            if line.lstrip().startswith(fence):
                blocks.append("\n".join(verbatim))
                verbatim.clear()
                fence = None
            continue
        if in_math:
            verbatim.append(line)
            if line.strip() == "$$" or line.strip().endswith("$$"):
                blocks.append("\n".join(verbatim))
                verbatim.clear()
                in_math = False
            continue
        t = line.lstrip()
        if t.startswith("```") or t.startswith("~~~"):
            flush()
            tok = ""
            for ch in t:
                if ch in "`~":
                    tok += ch
                else:
                    break
            fence = tok
            verbatim.append(line)
            continue
        if t.rstrip() == "$$" or (t.startswith("$$") and "$$" not in t[2:]):
            flush()
            in_math = True
            verbatim.append(line)
            continue
        if line.strip() == "":
            flush()
            continue
        if opens_block(line):
            flush()
            para.append(collapse(line))
            flush()
            continue
        if para and para[-1] != "":
            para[-1] = para[-1] + " " + collapse(line)
        else:
            para.append(collapse(line))
    if fence is not None or in_math:
        blocks.append("\n".join(verbatim))
    flush()
    return "\n\n".join(blocks) + "\n"


def canonical_object(kind, form, text):
    return f"kind: {kind}\nform: {form}\nnormalizer: {NORMALIZER}\n---\n{normalize(text)}"


def own_version_of_content(content, kind="segment"):
    """(version, statement text, body) for a record file's full content."""
    fm, body = split_frontmatter(content)
    form = ""
    if fm is not None:
        try:
            d = yaml.safe_load(fm) or {}
            if isinstance(d, dict) and isinstance(d.get("form"), str):
                form = d["form"]
        except yaml.YAMLError:
            pass
    text = statement_text(body)
    v = hashlib.sha256(canonical_object(kind, form, text).encode("utf-8")).hexdigest()
    return v, text, body


if __name__ == "__main__":
    for p in sys.argv[1:]:
        with open(p, encoding="utf-8") as f:
            print(own_version_of_content(f.read())[0], p)
