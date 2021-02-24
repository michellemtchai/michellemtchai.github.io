module.exports = (app) =>{
    return app.shared.createModel('Technology', {
        name: {
            type: String,
            required: true
        },
        source_url: {
            type: String,
            required: true
        },
        icon_url: {
            type: String,
            required: true
        },
    })
};
