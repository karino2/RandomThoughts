#!/bin/sh

echo `git log --pretty=format:%cd -n 1 --date=short $1` $1
