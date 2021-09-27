#!/usr/bin/env zsh

ls ../wiki_src/*.md | xargs -L 1 ./conv_one.sh
cp ../wiki/Home.md ../README.md
