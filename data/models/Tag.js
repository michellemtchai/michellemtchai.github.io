module.exports = (app) =>{
    return app.shared.createModel('Tag', {
        name: {
            type: String,
            required: true
        },
    })
};
