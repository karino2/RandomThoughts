import sys
import unicodedata
import urllib.parse


for line in sys.stdin:
    line = unicodedata.normalize('NFC', line)
    wikiname = line[:-4]
    encoded = urllib.parse.quote(wikiname, safe='')
    print("        <li class=\"page-list-item\">")
    print("            <a href=\"%s\">{{\"%s\" | escape}}</a>" % (encoded, wikiname))
    print("        </li>")

