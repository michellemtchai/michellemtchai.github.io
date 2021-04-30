const Controller = require('../classes/Controller');
const db = require('../helpers/db');

module.exports = class ApplicationController extends Controller {
    Category = this.models['Category'];

    index = (req, res) => {
        let categorySelect = ['icon_class', 'description'];
        let projectSelect = [
            'summary',
            'description',
            'source_url',
            'technologies',
            'tags',
            'gallery',
        ];
        let next = (data) => res.json(data);
        this.Category.aggregate(res, next, [
            db.lookupModelById(
                'projects',
                projectSelect,
                { name: 1 },
                4
            ),
            db.project(categorySelect),
        ]);
    };

    notFound = (req, res) => {
        this.renderError(res, {
            message: `No such route: ${req.path}`,
        });
    };
};
