import sys
import unicodedata
import urllib.parse
import json

header = """export const recents = [
 {text: "Recents:",
   children: ["""

footer = """   ]
}
]"""


print(header)

for line in sys.stdin:
    line = unicodedata.normalize('NFC', line)
    wikiname = line[:-4]
    encoded = urllib.parse.quote(wikiname, safe='')
    data = {"link": encoded + ".html", "text": wikiname}
    print("    %s," % json.dumps(data, ensure_ascii=False))


print(footer)