const Controller = require('../classes/Controller');
const cache = require('../helpers/cache');
const db = require('../helpers/db');

module.exports = class ApplicationController extends Controller {
    Category = this.models['Category'];

    index = (req, res) => {
        let cacheData = cache.getCache('home');
        if (cacheData) {
            res.json(cacheData);
        } else {
            let next = (data) => {
                cache.setCache('home', data);
                res.json(data);
            };
            let categorySelect = ['icon_class', 'description'];
            let projectSelect = [
                'summary',
                'description',
                'source_url',
                'technologies',
                'tags',
                'gallery',
            ];
            this.Category.aggregate(res, next, [
                db.lookupModelById(
                    'projects',
                    projectSelect,
                    { name: 1 },
                    4
                ),
                db.project(categorySelect),
            ]);
        }
    };

    notFound = (req, res) => {
        this.renderError(res, {
            message: `No such route: ${req.path}`,
        });
    };
};
