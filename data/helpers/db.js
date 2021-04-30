const ObjectId = require('mongodb').ObjectID;

module.exports = db = {
    defSelect: {
        __v: 0,
        created: 0,
        updated: 0,
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
    project: (select) => {
        return {
            $project: select,
        };
    },
};
