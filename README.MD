# README
## Requirement
You will need `Docker` to run this project.

## Running the App
### Development
This is an `React` app that can be accessed via your browser of choice at the following url:
```
localhost:3000
```
To setup the server, simply run `./develop.sh`. This shell script will setup the appropriate `.env` located in the folder `docker` and run `docker-compose up --build` to get the server up and running. This setup supports live reload, so you only have to make the change in your source code to trigger the code compilation and reloading of your browser.

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
