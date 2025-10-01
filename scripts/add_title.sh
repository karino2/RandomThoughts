#!/usr/bin/env bash

FNAME=`basename $1`
DST="../wiki2/$FNAME"
TITLE=`basename $1 | sed 's/\.md$//'`

# cat $1 | python expand_wikilink.py > $DST
echo "# $TITLE" > $DST
echo "" >> $DST
cat $1 >> $DST
