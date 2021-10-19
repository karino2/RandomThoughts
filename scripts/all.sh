#!/bin/sh

./copy_and_conv.command


pushd ../; git add --all; git commit -m "update"; pushd scrips/; ./gen_recents.sh; popd; git add --all; git commit -m "update recents";  git push; popd;

