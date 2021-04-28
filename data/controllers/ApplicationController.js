const Controller = require('../classes/Controller');
const cache = require('../helpers/cache');

module.exports = class ApplicationController extends Controller {
    Category = this.models['Category'];

    index = (req, res) => {
        let step1 = (categories) => {
            cache.mapAction(
                this.models,
                'Project',
                res,
                (data) => step2(categories, data),
                {
                    summary: 0,
                    description: 0,
                    source_url: 0,
                    technologies: 0,
                    tags: 0,
                    gallery: 0,
                }
            );
        };
        let step2 = (categories, projects) => {
            categories = categories.map((entry) => {
                entry.projects = entry.projects
                    .map((i) => projects[i])
                    .sort((a, b) => a.name - b.name)
                    .slice(0, 4);
                return entry;
            });
            cache.setCache('home', categories);
            res.json(categories);
        };
        let categories = cache.getCache('home');
        if (categories) {
            res.json(categories);
        } else {
            this.Category.find(res, step1, {
                select: {
                    _id: 0,
                    __v: 0,
                    icon_class: 0,
                    description: 0,
                    created: 0,
                    updated: 0,
                },
            });
        }
    };

    notFound = (req, res) => {
        this.renderError(res, {
            message: `No such route: ${req.path}`,
        });
    };
};
