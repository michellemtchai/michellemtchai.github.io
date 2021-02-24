const ObjectId = require('mongodb').ObjectID;

module.exports = (app) =>{
    return app.shared.createModel('Category', {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true
        },
        projects: [{
            type : ObjectId,
            ref: 'Technology'
        }],
    })
};
