const Controller = require('../classes/Controller');

module.exports = class ApplicationController extends Controller {
    Category = this.models['Category'];
    Project = this.models['Project'];

    index = (req, res) => {
        let step1 = (categories) => {
            this.Project.find(res, (i) => step2(categories, i), {
                select: {
                    __v: 0,
                    summary: 0,
                    description: 0,
                    source_url: 0,
                    technologies: 0,
                    tags: 0,
                    gallery: 0,
                    created: 0,
                    updated: 0,
                },
            });
        };
        let step2 = (categories, projects) => {
            let mapping = {};
            projects.forEach((i) => (mapping[i._id] = i));
            categories = categories.map((entry) => {
                entry.projects = entry.projects
                    .map((i) => mapping[i])
                    .sort((a, b) => a.name - b.name)
                    .slice(0, 4);
                return entry;
            });
            res.json(categories);
        };
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
    };
};
