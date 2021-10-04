#!/bin/sh

./copy_and_conv.command
pushd ../; git add --all; git commit -m "update"; git push; popd;

