#!/bin/sh

pushd $(dirname $0);
./copy.sh;
pushd ../; git add --all; git commit -m "update"; git push; popd;
popd;
