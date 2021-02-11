#! /bin/sh
cp ./docker/prod.env .env
docker-compose build
docker-compose run app yarn deploy
cp ./public/index.html ./build/index.html
