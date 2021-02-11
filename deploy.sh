#! /bin/sh
docker-compose build
docker-compose run app sh -c '''
    git config --global url."https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/".insteadOf "https://github.com/"
    yarn deploy
    exit
'''
cp ./public/index.html ./build/index.html

echo 'Changes deployed!'
