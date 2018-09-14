#!/bin/sh

setup_git() {
  git config --global user.email "markus.guenther@noerdisch.de"
  git config --global user.name "Markus Günther"
}

commit_public_resources() {
  git add ./Resources/Public
  git commit --message "Build: Adding public resources for BUILD $TRAVIS_BUILD_NUMBER"
  git push origin HEAD:master
}

copy_node_modules_files() {
  yarn copy
}

setup_git
copy_node_modules_files
commit_public_resources
