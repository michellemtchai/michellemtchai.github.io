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
        }
    };

    notFound = (req, res) => {
        this.renderError(res, {
            message: `No such route: ${req.path}`,
        });
    };
};
