#!/usr/bin/env zsh

ls ../wiki_src/*.md | xargs -P 20 -L 1 ./conv_one.sh
cp -r ../wiki_src/imgs ../wiki/
