#! /bin/sh
docker-compose build
    # git config --global user.email $GITHUB_EMAIL
    # git config --global user.name
    # git config --global user.password $GITHUB_PASSWORD
docker-compose run app sh -c '''
    git config --global url."https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/".insteadOf "https://github.com/"
    yarn deploy
    exit
'''
cp ./public/index.html ./build/index.html

echo 'Changes deployed!'
