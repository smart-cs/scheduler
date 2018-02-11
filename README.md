# schedulecreator

> A website that offers UBC students all the possible schedules that can be made, given the courses they wish to take.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment Steps
```bash
npm run build
git checkout gh-pages
rm -rf static index.html
mv dist/* .
sed -i '' 's/\/static/static/g' index.html # BSD sed
```

## Implementation
Backend source code can be found [here](https://github.com/nickwu241/schedulecreator-backend).

