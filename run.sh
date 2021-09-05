#!/bin/sh

echo "start installing npm packages"
SHARP_IGNORE_GLOBAL_LIBVIPS=1 \
	npm_config_arch=x64 \
	npm_config_platform=linux \
	yarn --no-bin-links > /dev/null
echo "end installing npm packages"
yarn develop
