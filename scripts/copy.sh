#!/usr/bin/env zsh

SUBWIKI_NAME="RandomThoughts"

SCRIPTS_DIR=$(dirname $0)
DEST_SRC="${SCRIPTS_DIR}/../wiki_src"
DEST_RES="${SCRIPTS_DIR}/../wiki"

rm $DEST_SRC/*
rm $DEST_RES/*
cp  ~/work/syncthing_dirs/TeFWiki/${SUBWIKI_NAME}/*.md $DEST_SRC/
