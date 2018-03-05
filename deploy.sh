#!/bin/sh
set -euo pipefail

# Make sure npm and git are installed
$(hash npm >/dev/null && hash git >/dev/null) || echo 'Make sure npm and git are in your $PATH'

# Get our current branch so we can come back to it
INITIAL_BRANCH="$(git branch | grep \* | cut -d ' ' -f2)"

# Checkout to master and build
git checkout master
MASTER_COMMIT_SHA="$(git rev-parse --short HEAD)"
npm run build

# Checkout to gh-pages for adding newly built files
git checkout gh-pages || git checkout -b gh-pages
rm -rf static index.html
mv dist/* .
sed -i '' 's/\/static/static/g' index.html

if [ "$(git diff static/ index.html)" == "" ]; then
    echo "The deployed page is the same as the page from ${MASTER_COMMIT_SHA}"
    git checkout ${INITIAL_BRANCH}
    exit 1
fi

git add index.html static/
git commit -m "Deploy page from ${MASTER_COMMIT_SHA}"
git push origin gh-pages

git checkout ${INITIAL_BRANCH}
