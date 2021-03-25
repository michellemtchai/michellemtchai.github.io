const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const db = require('../helpers/db');

module.exports = class Model {
    constructor(name, schema, logger) {
        this.log = (...i) => logger('Info', ...i);
        this.error = (...i) => logger('Error', ...i);
        this.attributes = [...Object.keys(schema), '_id'];
        this.model = mongoose.model(
            name,
            new mongoose.Schema({
                ...schema,
                created: {
                    type: Date,
                    default: Date.now,
                },
                updated: {
                    type: Date,
                    default: Date.now,
                },
            })
        );
    }

    renderError = (res, message) => {
        this.error('Error', message);
        res.status(404).json({
            message: message,
        });
    };

    find = (
        res,
        next,
        {
            query = [],
            sort = null,
            limit = null,
            select = null,
        } = {}
    ) => {
        let model = this.model.find(...query);
        if (sort) {
            model = model.sort(sort);
        }
        if (limit) {
            model = model.limit(limit);
        }
        if (select) {
            model = model.select(select);
        }
        handleDbAction(this, res, next, model, 'exec');
    };

    findById = (res, id, next, select = null) => {
        let handleResult = (data) => {
            handleOneRecordResult(this, res, data, id, next);
        };
        let model = this.model.findById(id);
        if (select) {
            model = model.select(select);
        }
        handleDbAction(this, res, handleResult, model, 'exec');
    };

    createOne = (res, params, next, select = null) => {
        let model = new this.model(params);
        let processData = next;
        if (select) {
            processData = (data) => {
                this.findById(res, data._id, next, {
                    select: select,
                });
            };
        }
        handleDbAction(this, res, processData, model, 'save');
    };

    createMany = (
        res,
        entries,
        next,
        { sort = null, select = null } = {}
    ) => {
        let processData = next;
        if (sort || select) {
            processData = (data) => {
                let ids = data.map((entry) =>
                    ObjectId(entry._id)
                );
                this.find(res, next, {
                    query: [db.isIn('_id', ids)],
                    select: select,
                    sort: sort,
                });
            };
        }
        handleDbAction(
            this,
            res,
            processData,
            this.model,
            'create',
            [entries]
        );
    };

    update = (res, next, change, select = null) => {
        let changeAction = (data) => {
            return data.map((entry) => {
                entry = change(entry);
                entry.updated = new Date();
                return entry;
            });
        };
        let handleData = (data) => {
            handleDbAction(
                this,
                res,
                next,
                changeAction(data),
                'save'
            );
        };
        this.find(res, handleData, {
            query: params,
        });
    };

    updateById = (res, id, params, next, select = null) => {
        let handleResult = (data) => {
            handleOneRecordResult(this, res, data, id, next);
        };
        let processData = handleResult;
        if (select) {
            processData = (data) => {
                this.findById(res, data._id, handleResult, {
                    select: select,
                });
            };
        }
        handleDbAction(
            this,
            res,
            handleResult,
            this.model,
            'findByIdAndUpdate',
            [{ _id: id }, params]
        );
    };

    remove = (
        res,
        next,
        query,
        { sort = null, select = null } = {}
    ) => {
        let model = this.model.deleteMany(query);
        if (sort) {
            model = model.sort(sort);
        }
        if (select) {
            model = model.select(select);
        }
        handleDbAction(this, res, next, model, 'exec');
    };

    removeById = (res, id, next, select = null) => {
        let handleResult = (data) => {
            handleOneRecordResult(this, res, data, id, next);
        };
        let model = this.model.findByIdAndRemove(id);
        if (select) {
            model = model.select(select);
        }
        handleDbAction(this, res, handleResult, model, 'exec');
    };
};

// private functions
const handleDbAction = (
    modelClass,
    res,
    next,
    model,
    fnName,
    params = []
) => {
    let t = timeOut(modelClass, res);
    try {
        model[fnName](...params, (err, data) => {
            clearTimeout(t);
            if (!err) {
                modelClass.log(
                    `Database Action "${fnName}" Success`
                );
                next(data);
            } else {
                modelClass.renderError(res, err.message);
            }
        });
    } catch (err) {
        clearTimeout(t);
        modelClass.renderError(res, err.message);
    }
};

const timeOut = (modelClass, res) => {
    let timeout = 10000;
    return setTimeout(() => {
        modelClass.renderError(res, 'Database Timeout');
    }, timeout);
};

const handleOneRecordResult = (
    modelClass,
    res,
    data,
    id,
    next
) => {
    if (data) {
        next(data);
    } else {
        modelClass.renderError(
            res,
            `No record with the id "${id}"`
        );
    }
};
