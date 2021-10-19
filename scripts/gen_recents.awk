{
wikiname = substr($0, 0, length($0)-3)

print "        <li class=\"page-list-item\">"
printf "            <a href=\"{{ \"/%s\" | relative_url }}\">{{\"%s\" | escape}}</a>\n", wikiname, wikiname
print "        </li>"
}