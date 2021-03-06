const htmlEntities = require('html-entities');
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
        controller,
        res,
        search,
        {
            category = 'all',
            page = 1,
            sortDir = 'ascending',
            sortBy = 'relevance',
            stacks = null,
        } = {}
    ) => {
        let terms = search.toLowerCase().split(/\s+/g).sort();
        let regex = `(${terms.join('|')})`;
        let step1 = (categoryId, stackIds) => {
            processResults(controller, res, {
                projects: projects,
                page: page,
                category: category,
                search: regex,
                options: {
                    category: categoryId,
                    stacks: stackIds,
                    sortDir: sortDir,
                    sortBy: 'name',
                    sortBy:
                        sortBy === 'name' ? 'name' : 'relevance',
                    search: regex,
                },
            });
        };
        paramsCheckAction(
            controller,
            res,
            step1,
            category,
            stacks
        );
    },
    page: (
        controller,
        res,
        {
            category = 'all',
            page = 1,
            sortDir = 'ascending',
            stacks = null,
        } = {}
    ) => {
        let step1 = (categoryId, stackIds) => {
            processResults(controller, res, {
                projects: projects,
                page: page,
                category: category,
                options: {
                    category: categoryId,
                    stacks: stackIds,
                    sortDir: sortDir,
                    sortBy: 'name',
                },
            });
        };
        paramsCheckAction(
            controller,
            res,
            step1,
            category,
            stacks
        );
    },
};
const boldText = (text, regex) => {
    let modifiedText = htmlEntities.encode(text);
    if (regex) {
        modifiedText = modifiedText.replace(regex, '<b>$1</b>');
    }
    return modifiedText;
};

const processResults = (
    controller,
    res,
    { page, category, options, search } = {}
) => {
    let step1 = (projects) => {
        let total = projects.length;
        let [_, projectIds] = db.toObjectId(projects, '_id');
        projects = projects.slice(...getPageIdx(page));
        getStacks(
            res,
            controller.models.Project,
            projectIds,
            category,
            (stacks) => step2(stacks, projects, total),
            search
        );
    };
    let step2 = (stacks, projects, total) => {
        getTechs(
            res,
            controller.models.Technology,
            projects,
            (tech) =>
                renderResult(controller, res, {
                    tech: tech,
                    stacks: stacks,
                    projects: projects,
                    total: total,
                }),
            search
        );
    };
    getCategorizedProjects(
        res,
        controller.models.Project,
        (projects) => step1(projects),
        options
    );
};

const renderResult = (
    controller,
    res,
    { tech = {}, stacks = {}, projects = [], total = 0 } = {}
) => {
    controller.renderSuccess(res, {
        projects: projects,
        technologies: tech,
        stacks: stacks,
        limit: PAGE_LIMIT,
        total: total,
    });
};

const getPageIdx = (page) => {
    let startIdx = (page - 1) * PAGE_LIMIT;
    let endIdx = startIdx + PAGE_LIMIT;
    return [startIdx, endIdx];
};

const paramsCheckAction = (
    controller,
    res,
    action,
    category = 'all',
    stacks = null
) => {
    let [err1, categoryId] =
        category === 'all' ? [] : db.toObjectId(category);
    let [err2, stackIds] = stacks
        ? db.toObjectId(stacks.split(','))
        : [];
    if (err1) {
        controller.renderError(res, err1);
    } else if (err2) {
        controller.renderError(res, err2);
    } else {
        action(categoryId, stackIds);
    }
};

const getCategorizedProjects = (
    res,
    model,
    action,
    { category, stacks, sortDir, sortBy, search } = {}
) => {
    let cacheKey = `projects:${category},sortBy:${sortBy},sortDir:${sortDir},stacks:${stacks}`;
    cacheKey += search ? `,search:${search}` : '';
    let next = (data) => {
        let regex = search ? new RegExp(search, 'ig') : null;
        data = data.map((entry) => ({
            ...entry,
            name: boldText(entry.name, regex),
            summary: boldText(entry.summary, regex),
        }));
        action(data);
    };
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
        if (search) {
            query = [...query, ...getSearchQuery(search)];
        } else {
            query.push(db.project(db.showAttr(projectShowList)));
        }
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
    cache.cacheAction(cacheKey, queryProject, next);
};

const getStacks = (
    res,
    model,
    projectIds,
    category,
    action,
    search
) => {
    let cacheKey = `stack:${category}`;
    cacheKey += search ? `,search${search}` : '';
    let queryStacks = (next) => {
        let query = [
            db.unwind('$technologies'),
            db.group('$technologies', db.count('count')),
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

const getTechs = (res, model, projects, action, search) => {
    let projectIds = [];
    projects.forEach(
        (i) => (projectIds = [...projectIds, ...i.technologies])
    );
    let cacheKey = `tech:${projectIds.join(',')}`;
    let queryTechs = (next) => {
        let processData = (data) => {
            let regex = search ? new RegExp(search, 'ig') : null;
            next(mapEntries(data, regex));
        };
        model.find(res, processData, {
            query: db.isIn('_id', projectIds, false),
            select: db.defSelect,
        });
    };
    cache.cacheAction(cacheKey, queryTechs, action);
};
const mapEntries = (data, search) => {
    let mapping = {};
    data.forEach((entry) => {
        mapping[entry._id] = {
            ...entry._doc,
            name: boldText(entry.name, search),
        };
    });
    return mapping;
};
const getSearchQuery = (regex) => {
    let showList = db.showAttr([...projectShowList, 'tags']);
    let query = [
        db.project(showList),
        db.lookupModelById('tags'),
        db.lookupModelById('technologies'),
        db.addFields({
            nameCount: db.regexFindAll('$name', regex, 'i'),
            summaryCount: db.regexFindAll(
                '$summary',
                regex,
                'i'
            ),
            techCount: regexArray('technologies', 'name', regex),
            tagCount: regexArray('tags', 'name', regex),
        }),
        db.project({
            ...showList,
            technologies: '$technologies._id',
            tags: '$tags._id',
            relevance: db.multiply([
                db.sum([
                    db.size('$nameCount'),
                    db.size('$summaryCount'),
                    db.size('$techCount'),
                    db.size('$tagCount'),
                ]),
                -1,
            ]),
        }),
        db.matchExpr(db.lessThan('$relevance', 0)),
    ];
    return query;
};

const regexArray = (keyName, key, regex) => {
    return db.reduce(
        `$${keyName}`,
        [],
        db.concatArrays(
            '$$value',
            db.regexFindAll(`$$this.${key}`, regex, 'i')
        )
    );
};
