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

It's handled by GitHub Actions.
