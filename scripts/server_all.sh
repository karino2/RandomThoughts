#!/usr/bin/env bash

SCRIPTS_DIR=$(dirname $0)
pushd ${SCRIPTS_DIR};
./clean_wiki2.sh;
./conv.sh;
cp ../wiki2/Home.md ../wiki2/README.md
./gen_recents.sh;
popd;
