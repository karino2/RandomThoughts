#!/bin/sh

./copy.sh

pushd ../; git add --all; git commit -m "update"; git push; popd;

