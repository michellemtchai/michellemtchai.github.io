const db = require('./db');
const cache = require('./cache');

module.exports = projects = {
    search: (
        res,
        models,
        search,
        {
            category = 'all',
            page = 1,
            sortDir = 'ascending',
            stacks = null,
        } = {}
    ) => {
        let terms = search.toLowerCase().split(/\s+/g);
        let regex = `(${terms.join('|')})`;
        let step1 = (categories) => {
            cache.searchAction(models, 'Tag', res, regex, (i) =>
                step2(i, categories)
            );
        };
        let step2 = (tags, categories) => {
            cache.searchAction(
                models,
                'Technology',
                res,
                regex,
                (i) => step3(i, tags, categories)
            );
        };
        let step3 = (technologies, tags, categories) => {
            let query = searchQuery(
                regex,
                category,
                stacks,
                technologies.selected,
                tags.selected
            );
            models.Project.find(
                res,
                (i) => step4(i, technologies, tags),
                findParams(query, sortDir, page, true)
            );
        };
        let step4 = (projects, technologies, tags) => {
            let regExp = new RegExp(regex, 'gi');
            res.json(
                projects.map((project) => ({
                    ...project._doc,
                    name: cache.boldText(project.name, regExp),
                    summary: cache.boldText(
                        project.summary,
                        regExp
                    ),
                    technologies: project.technologies.map(
                        (i) => technologies.mapping[i]
                    ),
                    tags: project.tags.map(
                        (i) => tags.mapping[i]
                    ),
                }))
            );
        };
        categorize(models, res, step1);
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
            let query = queryStacks(category, stacks);
            models.Project.find(
                res,
                step2,
                findParams(query, sortDir, page)
            );
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
        categorize(models, res, step1);
    },
};

const queryStacks = (category, stacks) => {
    let query = {};
    if (category !== 'all') {
        query = {
            ...query,
            ...db.isIn('_id', category),
        };
    }
    if (stacks !== null) {
        query = {
            ...query,
            ...db.isIn('technologies', stacks),
        };
    }
    return query;
};
const searchQuery = (term, category, stacks, tech, tags) => {
    let terms = term.split(/\s+/g);
    let regex = `(${terms.join('|')})`;
    let query = db.or([
        db.regex('name', regex, 'ig'),
        db.regex('summary', regex, 'ig'),
        db.isIn('technologies', tech),
        db.isIn('tags', tags),
    ]);
    if (category !== 'all') {
        query = {
            ...query,
            ...db.isIn('_id', category),
        };
    }
    if (stacks !== null) {
        query = {
            ...query,
            ...db.isIn('technologies', stacks),
        };
    }
    return query;
};
const categorize = (models, res, action) => {
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
};
const findParams = (query, sortDir, page, isSearch = false) => {
    let params = {
        query: query,
        sort: {
            name: sortDir === 'ascending' ? 1 : -1,
        },
        skip: (page - 1) * 10,
        limit: 10,
        select: {
            gallery: 0,
            description: 0,
            updated: 0,
            created: 0,
            __v: 0,
        },
    };
    if (!isSearch) {
        params.select.tags = 0;
    }
    return params;
};
