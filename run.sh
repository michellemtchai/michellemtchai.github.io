#!/bin/sh
echo "start installing npm packages"
npm --no-bin-links install
echo "end installing npm packages"
npm run develop
