const ObjectId = require('mongodb').ObjectID;

module.exports = (app) => {
    return app.shared.createModel('Project', {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        summary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        source_url: {
            type: String,
            required: true,
        },
        demo_url: {
            type: String,
        },
        image_url: {
            type: String,
            default: '',
        },
        technologies: [
            {
                type: ObjectId,
                ref: 'Technology',
            },
        ],
        tags: [
            {
                type: ObjectId,
                ref: 'Tag',
            },
        ],
        gallery: [
            {
                url: {
                    type: String,
                    required: true,
                },
                caption: {
                    type: String,
                    required: true,
                },
            },
        ],
    });
};
