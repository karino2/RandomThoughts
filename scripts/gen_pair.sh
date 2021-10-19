#!/bin/sh

echo `git log --pretty=format:%cd -n 1 --date=unix $1` $1
