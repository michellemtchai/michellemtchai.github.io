const Controller = require('../classes/Controller');
const cache = require('../helpers/cache');
const db = require('../helpers/db');

const categorySelect = ['icon_class', 'description'];
const projectSelect = [
    'summary',
    'description',
    'source_url',
    'technologies',
    'tags',
    'gallery',
];

module.exports = class ApplicationController extends Controller {
    index = (req, res) => {
        let cacheKey = 'home';
        let action = (data) => this.renderSuccess(res, data);
        let queryCategory = (next) => {
            this.models.Category.aggregate(res, next, [
                db.lookupModelById('projects', {
                    select: projectSelect,
                    sort: { name: 1 },
                    limit: 4,
                }),
                db.project(db.hideAttr(categorySelect)),
                db.sort({
                    _id: 1,
                }),
            ]);
        };
        cache.cacheAction(cacheKey, queryCategory, action);
    };

    notFound = (req, res) => {
        this.renderError(res, {
            message: `No such route: ${req.path}`,
        });
    };
};
