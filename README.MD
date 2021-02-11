# [michellemtchai.github.io](https://michellemtchai.github.io)
> ### Main repository for Michelle Chai's personal website

## Requirement
You will need `Docker` to run this project.

## Running the App
### Development
To setup the server, you need to create an `.env` file. To do this, run the following:
```
cp ./docker/dev.env .env
```
Then, you just need to run `docker-compose up` to get the server running. This setup supports live reload, so you only have to make the change in your source code to trigger the code compilation and reloading of your browser.

This `React` app that can be accessed via your browser of choice at the following url:
```
localhost:3000
```

### Deploying
Similar to working in development, you need to create an `.env`. You can do this by running the following command:
```
cp ./docker/prod.env .env
```
Then, you need to go into the `.env` to modify the values `GITHUB_USERNAME` and `GITHUB_TOKEN`. You can create a token on GitHub via its `Settings` > `Developer settings` > `Personal access tokens`.

**Note:** It's very important that you do this so that the next step will work.

Then, you can deploy this app by running `./deploy.sh`, which sets up the appropriate `.env` for the production build and publishes the changes via `gh-pages`.

## Additional
### Managing Packages
You can add packages via the following command:
```
docker-compose run app yarn add {package-name}
```
Likewise, you remove a package in a similar fashion like so:
```
docker-compose run app yarn remove {package-name}
```
### Switching between Development and Deploying
If you've already entered your `GITHUB_USERNAME` and `GITHUB_TOKEN` in the `.env` and don't want to risk overwriting those values by calling `cp`, then you can modify the line with `MODE` in the `.env` file instead. `dev` represents development mode, whereas `prod` represents the mode for deploying.
