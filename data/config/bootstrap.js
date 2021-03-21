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
    require('./database')(() => {
        // create schema
        app.shared.importModels(app);

        // loads controllers
        app.shared.importControllers(app);

        // loads routes
        require('./routes')(app);
    });
};
