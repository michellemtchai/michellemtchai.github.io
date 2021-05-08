const ObjectId = require('mongodb').ObjectID;
const common = require('./common');

module.exports = db = {
    defSelect: {
        __v: 0,
        created: 0,
        updated: 0,
    },
    showAttr: (showList) => {
        let select = {};
        showList.forEach((i) => (select[i] = 1));
        return select;
    },
    hideAttr: (hideList, useDefSelect = true) => {
        let select = useDefSelect ? { ...db.defSelect } : {};
        hideList.forEach((entry) => {
            select[entry] = 0;
        });
        return select;
    },
    invalidObjectId: (id) => {
        id = typeof value === 'string' ? id : id.join(', ');
        return {
            message: `Invalid ObjectId: ${id}`,
        };
    },
    toObjectId: (id, keyName = null) => {
        if (typeof id === 'string') {
            try {
                return [null, ObjectId(id)];
            } catch (err) {
                return [db.invalidObjectId(id), null];
            }
        } else if (common.isArray(id)) {
            let converted = [],
                errIds = [];
            id.forEach((entry) => {
                let value = keyName ? entry[keyName] : entry;
                try {
                    converted.push(ObjectId(value));
                } catch (err) {
                    errIds.push(value);
                }
            });
            if (errIds.length > 0) {
                return [db.invalidObjectId(id), null];
            } else {
                return [null, converted];
            }
        } else {
            return [db.invalidObjectId(id), null];
        }
    },
    equals: (key, value, isArrayFormat = true) => {
        if (isArrayFormat) {
            return { $eq: [key, value] };
        } else {
            return {
                [key]: {
                    $eq: value,
                },
            };
        }
    },
    notEquals: (key, value, isArrayFormat = true) => {
        if (isArrayFormat) {
            return { $ne: [key, value] };
        } else {
            return {
                [key]: {
                    $ne: value,
                },
            };
        }
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
    isIn: (key, arrayValue, isArrayFormat = true) => {
        if (isArrayFormat) {
            return { $in: [key, arrayValue] };
        } else {
            return {
                [key]: {
                    $in: arrayValue,
                },
            };
        }
    },
    isNotIn: (key, arrayValue, isArrayFormat = true) => {
        if (isArrayFormat) {
            return { $nin: [key, arrayValue] };
        } else {
            return {
                [key]: {
                    $nin: arrayValue,
                },
            };
        }
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
    project: (expression) => {
        return {
            $project: expression,
        };
    },
    lookupModelById: (
        modelName,
        {
            keyName = null,
            attrName = null,
            isIn = ['$_id', '$$attr'],
            select = null,
            sort = null,
            limit = null,
        } = {}
    ) => {
        keyName = keyName || modelName;
        attrName = attrName || modelName;
        let pipeline = [db.matchExpr(db.isIn(...isIn))];
        if (select) {
            pipeline.push(db.project(db.hideAttr(select)));
        }
        if (sort) {
            pipeline.push(db.sort(sort));
        }
        if (limit) {
            pipeline.push(db.limit(limit));
        }
        return {
            $lookup: {
                from: modelName,
                let: {
                    attr: `$${keyName}`,
                },
                pipeline: pipeline,
                as: attrName,
            },
        };
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
