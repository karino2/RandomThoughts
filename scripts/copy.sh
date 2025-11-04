#!/usr/bin/env zsh

SUBWIKI_NAME="RandomThoughts"

SCRIPTS_DIR=$(dirname $0)
TEFWIKI_DIR=$1/TeFWiki
DEST_SRC="${SCRIPTS_DIR}/../wiki_src"

rm -r $DEST_SRC/imgs
rm $DEST_SRC/*
cp  ${TEFWIKI_DIR}/${SUBWIKI_NAME}/*.md $DEST_SRC/
cp  -r ${TEFWIKI_DIR}/${SUBWIKI_NAME}/imgs $DEST_SRC/
