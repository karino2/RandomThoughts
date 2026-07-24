#!/usr/bin/env zsh

pushd ../wiki_src
../scripts/linkinfo.sh | ../scripts/linkinfo2backlinkdata.sh > ../wiki2/.vuepress/components/backlinkData.js
popd