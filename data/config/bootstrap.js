module.exports = (router, express) => {
    let app = {
        router: router,
        express: express,
        shared: require('./shared'),
    };

    // loads logger
    require('./logger')();

    // initialize app
    require('./initialize')(app);

    // connect to mongodb
    require('./database')(app, (appData) => {
        // create schema
        app.shared.importModels(appData);

        // loads controllers
        app.shared.importControllers(appData);

        // loads routes
        require('./routes')(appData);
    });
};
