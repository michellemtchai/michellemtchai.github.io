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
    hideAttr: (hideList = [], useDefSelect = true) => {
        let select = useDefSelect ? { ...db.defSelect } : {};
        hideList.forEach((entry) => (select[entry] = 0));
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
    arrayFormatQuery: (
        action,
        key,
        value,
        isArrayFormat = true
    ) => {
        if (isArrayFormat) {
            return { [`$${action}`]: [key, value] };
        } else {
            return {
                [key]: {
                    [`$${action}`]: value,
                },
            };
        }
    },
    equals: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'eq',
            key,
            value,
            isArrayFormat
        );
    },
    notEquals: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'ne',
            key,
            value,
            isArrayFormat
        );
    },
    lessThan: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'lt',
            key,
            value,
            isArrayFormat
        );
    },
    lessThanEquals: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'lte',
            key,
            value,
            isArrayFormat
        );
    },
    greaterThan: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'gt',
            key,
            value,
            isArrayFormat
        );
    },
    greaterThanEquals: (key, value, isArrayFormat) => {
        return db.arrayFormatQuery(
            'gte',
            key,
            value,
            isArrayFormat
        );
    },
    isIn: (key, arrayValue, isArrayFormat) => {
        return db.arrayFormatQuery(
            'in',
            key,
            arrayValue,
            isArrayFormat
        );
    },
    isNotIn: (key, arrayValue, isArrayFormat) => {
        return db.arrayFormatQuery(
            'nin',
            key,
            arrayValue,
            isArrayFormat
        );
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
        if (options) {
            return {
                [key]: { $regex: regex, $options: options },
            };
        } else {
            return { [key]: { $regex: regex } };
        }
    },
    regexFindAll: (key, regex, options) => {
        if (options) {
            return {
                $regexFindAll: {
                    input: key,
                    regex: regex,
                    options: options,
                },
            };
        } else {
            return {
                $regexFindAll: {
                    input: key,
                    regex: regex,
                },
            };
        }
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
    count: (key) => {
        return {
            [key]: {
                $sum: 1,
            },
        };
    },
    sum: (value) => {
        return {
            $sum: value,
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
    addFields: (fields) => {
        return {
            $addFields: fields,
        };
    },
    reduce: (input, initialValue, inExpr) => {
        return {
            $reduce: {
                input: input,
                initialValue: initialValue,
                in: inExpr,
            },
        };
    },
    concatArrays: (array, value) => {
        return { $concatArrays: [array, value] };
    },
    size: (key) => {
        return { $size: key };
    },
    multiply: (values) => {
        return {
            $multiply: values,
        };
    },
};
