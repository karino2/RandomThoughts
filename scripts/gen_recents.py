import sys
import unicodedata


for line in sys.stdin:
    line = unicodedata.normalize('NFC', line)
    wikiname = line[:-4]
    print("        <li class=\"page-list-item\">")
    print("            <a href=\"{{ \"/%s\" | relative_url }}\">{{\"%s\" | escape}}</a>" % (wikiname, wikiname))
    print("        </li>")

