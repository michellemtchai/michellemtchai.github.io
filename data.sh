#! /bin/sh
function yarn_install(){
    echo "yarn install at /app$1"
    yarn > /dev/null
}
function yarn_start(){
    cd "/app$1"
    yarn start
}
yarn_install /
yarn_install /data
yarn_install /data/frontend
yarn_start / & yarn_start /data & yarn_start /data/frontend
