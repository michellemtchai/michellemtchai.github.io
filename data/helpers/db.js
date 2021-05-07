const ObjectId = require('mongodb').ObjectID;

module.exports = db = {
    defSelect: {
        __v: 0,
        created: 0,
        updated: 0,
    },
    hideAttr: (hideList, useDefSelect = true) => {
        let select = useDefSelect ? { ...db.defSelect } : {};
        hideList.forEach((entry) => {
            select[entry] = 0;
        });
        return select;
    },
    invalidObjectId: (id) => {
        return {
            message: `Invalid ObjectId: ${id}`,
        };
    },
    toObjectId: (id) => {
        try {
            return [null, ObjectId(id)];
        } catch (err) {
            return [db.invalidObjectId(id), null];
        }
    },
    equals: (key, value) => {
        return { [key]: value };
    },
    notEquals: (key, value) => {
        return { [key]: { $ne: value } };
    },
    lessThan: (key, value) => {
        return { [key]: { $lt: value } };
    },
    lessThanEquals: (key, value) => {
        return { [key]: { $lte: value } };
    },
    greaterThan: (key, value) => {
        return { [key]: { $gt: value } };
    },
    greaterThanEquals: (key, value) => {
        return { [key]: { $gte: value } };
    },
    isIn: (key, arrayValue) => {
        return { [key]: { $in: arrayValue } };
    },
    isNotIn: (key, arrayValue) => {
        return { [key]: { $nin: arrayValue } };
    },
    or: (arrayConditions) => {
        return { $or: arrayConditions };
    },
    and: (arrayConditions) => {
        return { $and: arrayConditions };
    },
    not: (arrayConditions) => {
        return { $not: arrayConditions };
    },
    regex: (key, regex, options) => {
        return { [key]: { $regex: regex, $options: options } };
    },
    match: (expression) => {
        return {
            $match: expression,
        };
    },
    matchExpr: (expression) => {
        return {
            $match: {
                $expr: expression,
            },
        };
    },
    project: (hideList = [], useDefSelect = true) => {
        return {
            $project: db.hideAttr(hideList, useDefSelect),
        };
    },
    lookupModelById: (
        modelName,
        select = [],
        sort = null,
        limit = null
    ) => {
        let result = {
            $lookup: {
                from: modelName,
                let: {
                    attr: `$${modelName}`,
                },
                pipeline: [
                    db.matchExpr({
                        $in: ['$_id', '$$attr'],
                    }),
                    db.project(select),
                ],
                as: modelName,
            },
        };
        if (sort) {
            result.$lookup.pipeline.push(db.sort(sort));
        }
        if (limit) {
            result.$lookup.pipeline.push(db.limit(limit));
        }
        return result;
    },
    lookupId: (modelName, attrName) => {
        return {
            $lookup: {
                from: modelName,
                localField: '_id',
                foreignField: '_id',
                as: attrName,
            },
        };
    },
    sort: (expression) => {
        return {
            $sort: expression,
        };
    },
    limit: (expression) => {
        return {
            $limit: expression,
        };
    },
    unwind: (key) => {
        return {
            $unwind: key,
        };
    },
    group: (key, expression) => {
        return {
            $group: {
                _id: key,
                ...expression,
            },
        };
    },
    sum: (key) => {
        return {
            [key]: {
                $sum: 1,
            },
        };
    },
    toString: (key) => {
        return {
            $toString: key,
        };
    },
    concat: (parts) => {
        return {
            $concat: parts,
        };
    },
};
