#!/bin/sh

./copy_and_conv.command


pushd ../; git add --all; git commit -m "update"; popd; ./gen_recents.sh; pushd ../; git add --all; git commit -m "update recents";  git push; popd;

