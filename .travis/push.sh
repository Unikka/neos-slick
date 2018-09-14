#!/bin/sh

setup_git() {
  git config --global user.email "markus.guenther@noerdisch.de"
  git config --global user.name "Markus Günther"
}

commit_public_resources() {
  git remote add origin-travis https://${GH_TOKEN:-git}@github.com/markusguenther/neos-slick.git
  git checkout -b origin-travis/master
  git add ./Resources/Public
  git commit --message "Build: Adding public resources for BUILD $TRAVIS_BUILD_NUMBER"
  git push origin-travis HEAD:master
}

copy_node_modules_files() {
  yarn copy
}

setup_git
copy_node_modules_files
commit_public_resources
