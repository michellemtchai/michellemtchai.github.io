const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const db = require('../helpers/db');

module.exports = class Model {
    constructor(name, schema, logger) {
        this.log = logger;
        this.attributes = Object.keys(schema);
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
        this.log('Error', message);
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

    findById = (res, next, id, select = null) => {
        let [err, params] = idParam(res, id);
        let nextAction = (data) => next(data[0]);
        if (!err) {
            this.find(res, nextAction, {
                select: select,
                query: [params],
            });
        } else {
            next(null);
        }
    };

    createOne = (res, next, params) => {
        let model = new this.model(params);
        handleDbAction(this, res, next, model, 'save');
    };

    createMany = (res, next, entries) => {
        handleDbAction(this, res, next, this.model, 'create', [
            entries,
        ]);
    };

    update = (res, next, id, change) => {
        let changeAction = (data) => {
            data = change(data);
            data.updated = new Date();
            return data;
        };
        let handleData = (data) => {
            if (data) {
                handleDbAction(
                    this,
                    res,
                    next,
                    changeAction(data),
                    'save'
                );
            } else {
                invalidId(this, res, id);
            }
        };
        this.findById(res, handleData, id);
    };

    remove = (res, next, params) => {
        let handleData = (data) => {
            handleDbAction(
                this,
                res,
                (i) => next(data),
                this.model,
                'deleteMany',
                params
            );
        };
        this.find(res, handleData, {
            query: params,
        });
    };

    removeById = (res, next, id) => {
        let handleData = (data) => {
            if (data) {
                handleDbAction(this, res, next, data, 'remove');
            } else {
                invalidId(this, res, id);
            }
        };
        this.findById(res, handleData, id);
    };
};

// private functions
const handleDbAction = (
    self,
    res,
    next,
    model,
    fnName,
    params = []
) => {
    let t = timeOut(self, res);
    try {
        model[fnName](...params, (err, data) => {
            clearTimeout(t);
            if (!err) {
                self.log(
                    'Info',
                    `Database Action "${fnName}" Success`
                );
                next(data);
            } else {
                self.renderError(res, err.message);
            }
        });
    } catch (err) {
        clearTimeout(t);
        self.renderError(res, err.message);
    }
};

const timeOut = (self, res) => {
    let timeout = 10000;
    return setTimeout(() => {
        self.renderError(res, 'Database Timeout');
    }, timeout);
};

const idParam = (res, id) => {
    try {
        return [
            false,
            {
                _id: ObjectId(id),
            },
        ];
    } catch (err) {
        return [true, {}];
    }
};

const invalidId = (self, res, id) => {
    self.renderError(res, `'${id}' is not a valid id.`);
};
