#!/bin/bash

find . -name "*.md" | while read -r file; do
    src=$(basename "$file")

    awk -v src="$src" '
        BEGIN { in_code = 0 }
        /^```/ {
            in_code = !in_code
            next
        }
        in_code { next }
        {
            while (match($0, /\[\[[^]]+\]\]/)) {
                dst = substr($0, RSTART + 2, RLENGTH - 4)
                sub(/^"/, "", dst)
                sub(/"$/, "", dst)
                sub(/\|.*/, "", dst)
                print dst ".md:" src
                $0 = substr($0, RSTART + RLENGTH)
            }
        }
    ' "$file"
done | sort -u | uniq