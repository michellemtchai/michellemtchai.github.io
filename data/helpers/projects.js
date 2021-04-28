const db = require('./db');
const cache = require('./cache');

module.exports = projects = {
    query: (stacks) => {
        return stacks === null
            ? {}
            : db.isIn('technologies', stacks);
    },
    page: (
        res,
        models,
        {
            category = 'all',
            page = 1,
            sortDir = 'ascending',
            stacks = null,
        } = {}
    ) => {
        let step1 = (categories) => {
            let query = projects.query(stacks);
            if (category !== 'all') {
                query = {
                    ...query,
                    ...db.isIn('_id', categories[category]),
                };
            }
            models.Project.find(res, step2, {
                query: query,
                sort: {
                    name: sortDir === 'ascending' ? 1 : -1,
                },
                skip: (page - 1) * 10,
                limit: 10,
                select: {
                    gallery: 0,
                    tags: 0,
                    description: 0,
                    updated: 0,
                    created: 0,
                    __v: 0,
                },
            });
        };
        let step2 = (projects) => {
            cache.mapAction(models, 'Technology', res, (data) =>
                step3(data, projects)
            );
        };
        let step3 = (technologies, projects) => {
            let result = [];
            projects.forEach((project) => {
                result.push({
                    ...project._doc,
                    technologies: project.technologies.map(
                        (i) => technologies[i]
                    ),
                });
            });
            res.json(result);
        };
        projects.categorize(models, res, step1);
    },
    categorize: (models, res, action) => {
        let next = (data) => {
            action(data);
        };
        cache.mapAction(
            models,
            'Category',
            res,
            next,
            {
                name: 0,
                description: 0,
                base_url: 0,
                icon_class: 0,
            },
            (entry) => entry.projects
        );
    },
};
