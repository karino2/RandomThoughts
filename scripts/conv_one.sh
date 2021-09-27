#!/usr/bin/env zsh

FNAME=`basename $1`
DST="../wiki/$FNAME"

sed 's/\[\[\([^]]*\)\]\]/\[\1\](\1.md)/g' $1 > $DST
