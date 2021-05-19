module.exports = (app) => {
    return app.shared.createModel('technologies', {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        source_url: {
            type: String,
            required: true,
        },
        icon_url: {
            type: String,
            required: true,
        },
    });
};
