#! /bin/sh
temp=$(git remote get-url origin)
docker-compose run app sh -c '''
    git remote set-url origin $GITHUB_REPO
    git config --global url."https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/".insteadOf "https://github.com/"
    git config --global user.email "$GITHUB_EMAIL"
    git config --global user.name "$GITHUB_USERNAME"
    yarn install
    yarn deploy
    exit
'''
git remote set-url origin $temp
echo 'Changes deployed!'
