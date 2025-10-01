#!/usr/bin/env zsh

SUBWIKI_NAME="RandomThoughts"

SCRIPTS_DIR=$(dirname $0)
DEST_SRC="${SCRIPTS_DIR}/../wiki_src"

rm -r $DEST_SRC/imgs
rm $DEST_SRC/*
cp  ~/work/syncthing_dirs/TeFWiki/${SUBWIKI_NAME}/*.md $DEST_SRC/
cp  -r ~/work/syncthing_dirs/TeFWiki/${SUBWIKI_NAME}/imgs $DEST_SRC/
