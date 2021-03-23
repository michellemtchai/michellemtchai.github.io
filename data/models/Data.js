module.exports = (app) => {
    return app.shared.createModel('Data', {
        exported: {
            type: Date,
        },
    });
};
