#!/bin/sh

pushd $(dirname $0);
./copy.sh $1;
pushd ../; git add --all; git commit -m "update"; popd; ./gen_recents.sh; pushd ../; git add --all; git commit -m "update recents";  git push; popd;
popd;


