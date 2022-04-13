# [michellemtchai.github.io](https://michellemtchai.github.io)

> ### Main repository for Michelle Chai's personal website

## Requirement

You will need `Docker` to run this project.

## Running the App

### Development

First, you need to setup the environmental variables by running the following command:

```
cp ./docker/dev.env .env
```

Then, you can run `docker-compose up` to boot up the project. This will take a while because it involves installing the npm packages. You can access the app via the following url in your browser:

```
http://localhost:3000
```

### Deploying

It's handled by GitHub Actions. To set this up, the following secrets need to be added to the repo.

```
APP_TITLE # header title
APP_DESC # page description
ACTIONS_DEPLOY_KEY # github token
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_SPACE_ID
GATSBY_WEBPACK_PUBLICPATH # usually "/"
SITE_DOMAIN # domain of site (i.e. michellemtchai.github.io)
```
