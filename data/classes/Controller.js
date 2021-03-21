const common = require('../helpers/common');
const ObjectId = require('mongodb').ObjectID;

module.exports = class Controller {
    constructor(app, name, logger) {
        this.log = logger;
        this.models = app.shared.models;
        this.assets = app.shared.assets;
        this.createRequired = [];
        this.updateRequired = [];
        this.updateForbidden = [];
        this.containsObjectId = [];
    }

    renderError = (res, err) => {
        this.log('Error', err.message);
        res.status(404).json({
            message: err.message,
        });
    };

    renderAll = (model, res, options = {}) => {
        this.log(
            'Info',
            `Get ${model.model.modelName} data success`
        );
        model.find(res, (i) => res.json(i), options);
    };

    renderOneWithId = (model, res, id, select = null) => {
        let handleData = (data) => {
            if (data) {
                this.log(
                    'Info',
                    `Get ${model.model.modelName} data by ID Success`
                );
                res.json(data);
            } else {
                invalidId(this, res, id);
            }
        };
        model.findById(res, handleData, id, select);
    };

    createPermitted = (data, model) =>
        this.permit(data, model.attributes);

    createModel = (data, res, next, model) => {
        let [
            validParams,
            requiredError,
        ] = this.hasRequiredParams(data, this.createRequired);
        if (validParams) {
            let [err, permittedData] = this.createPermitted(
                data,
                model
            );
            if (err) {
                this.renderError(res, err);
            } else {
                model.createOne(res, next, permittedData);
            }
        } else {
            this.renderError(res, requiredError);
        }
    };

    createManyModels = (data, res, next, model) => {
        let permittedData = [],
            err = null;
        for (let i = 0; i < data.length; i++) {
            let [
                validParams,
                requiredError,
            ] = this.hasRequiredParams(
                data[i],
                this.createRequired
            );

            if (validParams) {
                let [
                    entryErr,
                    permittedEntry,
                ] = this.createPermitted(data[i], model);
                if (entryErr) {
                    err = entryErr;
                    break;
                } else {
                    permittedData.push(permittedEntry);
                }
            } else {
                err = requiredError;
                break;
            }
        }
        if (err) {
            this.renderError(res, err);
        } else {
            model.createMany(res, next, permittedData);
        }
    };

    hasRequiredParams = (params, required) => {
        let lacking = [];
        required.forEach((i) => {
            if (!common.hasKey(params, i)) {
                lacking.push(i);
            } else if (common.emptyString(params[i])) {
                lacking.push(i);
            }
        });
        if (lacking.length == 0) {
            return [true, null];
        } else {
            lacking = lacking.map((i) => `'${i}'`);
            let error = `${lacking[0]} is a required parameter.`;
            if (lacking.length > 1) {
                let last = lacking.pop();
                error = `${lacking.join(
                    ', '
                )} and ${last} are all required parameters.`;
            }
            return [
                false,
                {
                    message: error,
                },
            ];
        }
    };

    permit = (params, permitted) => {
        let result = {};
        let error = false;
        for (let i = 0; i < permitted.length; i++) {
            let key = permitted[i];
            if (common.hasKey(params, key)) {
                let value = params[key];
                if (typeof params === 'string') {
                    value = value.trim();
                }
                if (this.containsObjectId.includes(key)) {
                    if (
                        common.isArray(value) &&
                        value.length === 1 &&
                        value[0] === ''
                    ) {
                        value = [];
                    } else {
                        let [err, result] = convertToObjectId(
                            value
                        );
                        if (!err) {
                            value = result;
                        } else {
                            error = err;
                            break;
                        }
                    }
                }
                result[key] = value;
            }
        }
        return [error, result];
    };

    updatePermitted = (data, model) => {
        let permissible = [...model.attributes];
        this.updateForbidden.forEach((attr) => {
            let index = permissible.indexOf(attr);
            if (index !== -1) {
                permissible.slice(index, 1);
            }
        });
        return this.permit(data, permissible);
    };

    updateModel = (id, data, res, next, model) => {
        let [
            validParams,
            requiredError,
        ] = this.hasRequiredParams(data, this.updateRequired);
        if (validParams) {
            let [err, permittedData] = this.updatePermitted(
                data,
                model
            );
            if (err) {
                this.renderError(res, err);
            } else {
                let modifyModel = (model) => {
                    Object.keys(permittedData).forEach((key) => {
                        model[key] = permittedData[key];
                    });
                    return model;
                };
                model.update(res, next, id, modifyModel);
            }
        } else {
            this.renderError(res, err);
        }
    };
};

const convertToObjectId = (value) => {
    if (typeof value === 'string') {
        return strToObjectId(value);
    } else if (common.isArray(value)) {
        return strArrayToObjectId(value);
    } else {
        return [null, value];
    }
};

const strToObjectId = (id) => {
    try {
        return [null, ObjectId(id)];
    } catch (err) {
        return [err, null];
    }
};

const strArrayToObjectId = (ids) => {
    try {
        let converted = ids.map((id) => ObjectId(id));
        return [null, converted];
    } catch (err) {
        return [err, null];
    }
};
