#!/bin/sh
git checkout gh-pages
git merge master
git checkout master
git push origin