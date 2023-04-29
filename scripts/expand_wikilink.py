import sys
import re
import urllib.parse

pat = re.compile(r'\[\[([^]]*)\]\]')

def replace(m):
    original = m.group(1)
    encoded = urllib.parse.quote(original, safe='')
    return f"[{original}]({encoded})"

for line in sys.stdin:
    line = re.sub(pat, replace, line)
    print(line, end="")

