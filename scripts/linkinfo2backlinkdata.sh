#!/bin/bash

awk -F: '
{
    # child -> parent
    parent[$1] = parent[$1] " " $2
}

END {
    print "export const backlinkData = {"
    for(key in parent) {
        print "\"" key "\": ["
        
        n = split(parent[key], mids, " ")
        for (i = 1; i <= n; i++) {
            mid = mids[i]
            if (mid == "") continue

            print "\"" mid "\","
        }

        print "],"
    }
    print "}"
}
'