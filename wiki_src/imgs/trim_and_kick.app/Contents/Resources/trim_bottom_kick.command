#!/bin/bash

TARGET_DIR=$1
IMG_DIR=$(dirname "$1")
DIR_NAME=$(basename "$1")
TEMPLATE="![imgs/${DIR_NAME}/\$1](imgs/${DIR_NAME}/\$1)"

pushd $IMG_DIR
scripts/trim_bottom.sh $DIR_NAME
open --new /Applications/MdImgr.app --args "$TARGET_DIR" "$TEMPLATE"
popd

