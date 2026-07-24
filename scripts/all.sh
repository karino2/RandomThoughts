#!/bin/sh

pushd $(dirname $0);
./copy.sh $1;
pushd ../; git add --all; git commit -m "update"; popd; ./gen_recents.sh; ./gen_backlinkdata.sh; pushd ../; git add --all; git commit -m "update recents, backlink";  git push; popd;
popd;


