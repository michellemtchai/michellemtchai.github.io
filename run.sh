#!/bin/sh

echo "start installing npm packages"
yarn --no-bin-links > /dev/null
echo "end installing npm packages"
yarn develop
