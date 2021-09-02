#!/bin/sh

echo "start installing npm packages"
yarn --no-bin-links install
echo "end installing npm packages"
yarn develop
