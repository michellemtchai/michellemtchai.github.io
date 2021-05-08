const db = require('./db');
const cache = require('./cache');
const PAGE_LIMIT = 10;
const projectShowList = [
    'name',
    'summary',
    'source_url',
    'demo_url',
    'image_url',
    'technologies',
];

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
        renderError,
        {
            category = 'all',
            page = 1,
            sortDir = 'ascending',
            stacks = null,
        } = {}
    ) => {
        let [err1, categoryId] =
            category === 'all' ? [] : db.toObjectId(category);
        let [err2, stackIds] = stacks
            ? db.toObjectId(stacks.split(','))
            : [];
        if (err1) {
            renderError(res, err1);
        } else if (err2) {
            renderError(res, err1);
        } else {
            let step1 = (projects) => {
                let cacheKey = `stack:${category}`;
                let total = projects.length;
                let startIdx = (page - 1) * PAGE_LIMIT;
                let endIdx = startIdx + PAGE_LIMIT;
                let [_, projectIds] = db.toObjectId(
                    projects,
                    '_id'
                );
                projects = projects.slice(startIdx, endIdx);
                getStacks(
                    res,
                    models.Project,
                    projectIds,
                    cacheKey,
                    (stacks) => step2(stacks, projects, total)
                );
            };
            let step2 = (stacks, projects, total) => {
                getTechs(
                    res,
                    models.Technology,
                    projects,
                    (tech) =>
                        step3(tech, stacks, projects, total)
                );
            };
            let step3 = (tech, stacks, projects, total) => {
                res.json({
                    projects: projects,
                    technologies: tech,
                    stacks: stacks,
                    limit: PAGE_LIMIT,
                    total: total,
                });
            };
            getCategorizedProjects(
                res,
                models.Project,
                (projects) => step1(projects),
                {
                    category: categoryId,
                    stacks: stackIds,
                    sortDir: sortDir === 'ascending' ? 1 : -1,
                    sortBy: 'name',
                }
            );
        }
    },
};

const getCategorizedProjects = (
    res,
    model,
    action,
    { category, stacks, sortDir, sortBy } = {}
) => {
    let cacheKey = `projects:${category},sortBy:${sortBy},sortDir:${sortDir},stacks:${stacks}`;
    let cacheData = cache.getCache(cacheKey);
    if (cacheData) {
        action(cacheData);
    } else {
        let next = (data) => {
            cache.setCache(cacheKey, data);
            action(data);
        };
        let query = [
            db.lookupModelById('categories', {
                keyName: '_id',
                attrName: 'category',
                isIn: ['$$attr', '$projects'],
            }),
        ];
        if (category) {
            query.push(
                db.matchExpr(db.isIn(category, '$category._id'))
            );
        }
        query.push(db.project(db.showAttr(projectShowList)));
        if (stacks) {
            query.push(
                db.match(db.isIn('technologies', stacks, false))
            );
        }
        query.push(
            db.sort({
                [sortBy]: sortDir,
            })
        );
        model.aggregate(res, next, query);
    }
};

const getStacks = (res, model, projectIds, cacheKey, action) => {
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
            db.project({
                _id: 0,
                value: '$_id',
                label: db.concat([
                    '$temp.name',
                    ' (',
                    db.toString('$count'),
                    ')',
                ]),
            }),
            db.sort({ label: 1 }),
        ];
        if (projectIds) {
            query.unshift(
                db.matchExpr(db.isIn('$_id', projectIds))
            );
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
        query: db.isIn('_id', projectIds, false),
        select: db.defSelect,
    });
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
