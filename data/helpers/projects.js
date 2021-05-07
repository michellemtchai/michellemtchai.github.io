const db = require('./db');
const cache = require('./cache');
const PAGE_LIMIT = 10;

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
                categories[category],
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
            let result = projects.map((project) => ({
                ...project._doc,
                name: cache.boldText(project.name, regExp),
                summary: cache.boldText(project.summary, regExp),
            }));
            res.json({
                projects: result,
                technologies: technologies.mapping,
                tags: tags.mapping,
            });
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
            let query = queryStacks(
                categories[category],
                stacks
            );
            models.Project.find(
                res,
                (projects) => step2(categories, projects),
                findParams(query, sortDir, page)
            );
        };
        let step2 = (categories, projects) => {
            let cacheKey = `stack:${category}`;
            getStacks(
                res,
                models.Project,
                categories[category],
                cacheKey,
                (stacks) => step3(stacks, projects)
            );
        };
        let step3 = (stacks, projects) => {
            getTechs(res, models.Technology, projects, (tech) =>
                step4(tech, stacks, projects)
            );
        };
        let step4 = (tech, stacks, projects) => {
            res.json({
                projects: projects,
                technologies: tech,
                stacks: stacks,
                limit: PAGE_LIMIT,
            });
        };
        categorize(models, res, step1);
    },
};

const getStacks = (res, model, projects, cacheKey, action) => {
    let cacheData = cache.getCache(cacheKey);
    if (cacheData) {
        action(cacheData);
    } else {
        let next = (data) => {
            cache.setCache(cacheKey, data);
            action(data);
        };
        let query = [
            db.unwind('$technologies'),
            db.group('$technologies', db.sum('count')),
            db.lookupId('technologies', 'temp'),
            db.unwind('$temp'),
            {
                $project: {
                    _id: 0,
                    value: '$_id',
                    label: db.concat([
                        '$temp.name',
                        ' (',
                        db.toString('$count'),
                        ')',
                    ]),
                },
            },
        ];
        if (projects) {
            query = [
                db.match(db.isIn('_id', projects)),
                ...query,
            ];
        }
        model.aggregate(res, next, query);
    }
};

const getTechs = (res, model, projects, action) => {
    let projectIds = [];
    projects.forEach(
        (i) => (projectIds = [...projectIds, ...i.technologies])
    );
    let next = (data) => {
        action(cache.mapEntries(data));
    };
    model.find(res, next, {
        query: db.isIn('_id', projectIds),
        select: db.defSelect,
    });
};
const queryStacks = (category, stacks) => {
    let query = {};
    if (category) {
        query = {
            ...query,
            ...db.isIn('_id', category),
        };
    }
    if (stacks !== null) {
        stacks = stacks.split(',');
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
    if (category) {
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
        skip: (page - 1) * PAGE_LIMIT,
        limit: PAGE_LIMIT,
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
