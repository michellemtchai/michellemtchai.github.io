module.exports = (app) => {
    return app.shared.createModel('tags', {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    });
};
