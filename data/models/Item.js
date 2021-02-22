module.exports = (app) =>{
    return app.shared.createModel('item', {
        name: {
            type: String,
            required: true
        }
    })
};
