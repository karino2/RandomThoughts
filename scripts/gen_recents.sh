#!/bin/sh

ls ../wiki_src/*.md | xargs -L 1 ./gen_pair.sh | sort -r | head -n 15 | cut -b 24- | awk -f gen_recents.awk > ../_includes/git-wiki/components/lists/gened_recents.html
