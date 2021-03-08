# [michellemtchai.github.io](https://michellemtchai.github.io)
> ### Main repository for Michelle Chai's personal website

## Requirement
You will need `Docker` to run this project.

## Running the App
### Development
To setup the server, you need to create an `.env` file. To do this, run the following:
```
cp ./docker/sample.env .env
```
Then, you need to go into the `.env` to modify the values , `GITHUB_EMAIL`, `GITHUB_USERNAME`, and `GITHUB_TOKEN`. You can create a token on GitHub via its `Settings` > `Developer settings` > `Personal access tokens`.

Then, you just need to run `docker-compose up` to get the server running. This setup supports live reload, so you only have to make the change in your source code to trigger the code compilation and reloading of your browser.

This `React` app that can be accessed via your browser of choice at the following url:
```
localhost:3000
```

### Deploying
You can deploy this app by running `./deploy.sh`, which sets up the appropriate `.env` for the production build and publishes the changes via `gh-pages`.

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
