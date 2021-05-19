const ObjectId = require('mongodb').ObjectID;

module.exports = (app) => {
    return app.shared.createModel('categories', {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        base_url: {
            type: String,
            required: true,
        },
        icon_class: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        projects: [
            {
                type: ObjectId,
                ref: 'Project',
            },
        ],
    });
};
