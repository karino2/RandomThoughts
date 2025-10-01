#!/usr/bin/env zsh

SCRIPTS_DIR=$(dirname $0)
WIKI2_DIR="${SCRIPTS_DIR}/../wiki2"

rm -r $WIKI2_DIR/imgs
rm $WIKI2_DIR/*.md
