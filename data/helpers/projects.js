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
        let terms = search.toLowerCase().split(/\s+/g).sort();
        let regex = `(${terms.join('|')})`;
        res.json({
            projects: [],
            technologies: {},
            tags: {},
            stacks: [],
            limit: PAGE_LIMIT,
            total: 0,
            terms: terms,
        });
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
            renderError(res, err2);
        } else {
            let step1 = (projects) => {
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
                    category,
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
                    sortDir: sortDir,
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
    let queryProject = (next) => {
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
                [sortBy]: sortDir === 'ascending' ? 1 : -1,
            })
        );
        model.aggregate(res, next, query);
    };
    cache.cacheAction(cacheKey, queryProject, action);
};

const getStacks = (res, model, projectIds, category, action) => {
    let cacheKey = `stack:${category}`;
    let queryStacks = (next) => {
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
    };
    cache.cacheAction(cacheKey, queryStacks, action);
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
const getQuery = (stacks, term) => {
    let query = [];
    if (term) {
        let terms = term.split(/\s+/g);
        let regex = `(${terms.join('|')})`;
        query.push(
            db.or([
                db.regex('$name', regex, 'ig'),
                db.regex('$summary', regex, 'ig'),
                db.regex('$technologies.name', regex, 'ig'),
                db.regex('$tags.name', regex, 'ig'),
            ])
        );
    }
    if (stacks) {
        query.push(db.isIn('technologies', stacks, false));
    }
    return db.and(query);
};
