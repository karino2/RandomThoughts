#!/usr/bin/env bash

ls ../wiki_src/*.md | xargs -P 20 -L 1 ./add_title.sh
cp -r ../wiki_src/imgs ../wiki2/
