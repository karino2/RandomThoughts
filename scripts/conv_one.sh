#!/usr/bin/env zsh

FNAME=`basename $1`
DST="../wiki/$FNAME"

cat $1 | python expand_wikilink.py > $DST
