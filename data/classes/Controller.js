const common = require('../helpers/common');
const ObjectId = require('mongodb').ObjectID;

module.exports = class Controller {
    constructor(app, name, logger) {
        this.db = app.db;
        this.log = (...i) => logger('Info', ...i);
        this.error = (...i) => logger('Error', ...i);
        this.models = app.shared.models;
        this.assets = app.shared.assets;
        this.createRequired = [];
        this.updateRequired = [];
        this.updateForbidden = [];
        this.containsObjectId = [];
    }

    renderError = (res, err) => {
        this.error(err.message);
        res.status(404).json({
            message: err.message,
        });
    };

    renderSuccess = (res, json) => {
        this.log('Renders JSON with status 200');
        res.status(200).json(json);
    };

    renderAll = (model, res, options = {}) => {
        model.find(
            res,
            (i) => this.renderSuccess(res, i),
            options
        );
    };

    renderOneWithId = (model, res, id, select = null) => {
        model.findById(
            res,
            (i) => this.renderSuccess(res, i),
            id,
            select
        );
    };

    hasRequiredParams = (params, required) => {
        let lacking = lackingParams(params, required);
        if (lacking.length == 0) {
            return [true, null];
        } else {
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
                if (typeof value === 'string') {
                    value = value.trim();
                }
                if (this.containsObjectId.includes(key)) {
                    let [
                        convertError,
                        result,
                    ] = convertToObjectId(value);
                    if (!convertError) {
                        value = result;
                    } else {
                        error = convertError;
                        break;
                    }
                }
                result[key] = value;
            }
        }
        return [error, result];
    };

    createPermitted = (data, model) =>
        this.permit(data, model.attributes);

    updatePermitted = (data, model) => {
        let permissible = [...model.attributes];
        let forbiddenParams = ['_id', ...this.updateForbidden];
        forbiddenParams.forEach((attr) => {
            let index = permissible.indexOf(attr);
            if (index !== -1) {
                permissible.splice(index, 1);
            }
        });
        return this.permit(data, permissible);
    };

    createModel = (res, model, data, next, select = null) => {
        checkModelData(
            this,
            data,
            model,
            this.createRequired,
            this.createPermitted,
            (permittedData) => {
                model.createOne(
                    res,
                    permittedData,
                    next,
                    select
                );
            },
            (error) => this.renderError(res, error)
        );
    };

    createManyModels = (
        res,
        model,
        data,
        next,
        options = {}
    ) => {
        checkModelBatchData(
            this,
            data,
            model,
            this.createRequired,
            this.createPermitted,
            (permittedData) => {
                model.createMany(
                    res,
                    permittedData,
                    next,
                    options
                );
            },
            (error) => this.renderError(res, error)
        );
    };

    updateModelById = (
        res,
        model,
        id,
        data,
        next,
        select = null
    ) => {
        checkModelData(
            this,
            data,
            model,
            this.updateRequired,
            this.updatePermitted,
            (permittedData) => {
                model.updateById(
                    res,
                    id,
                    permittedData,
                    next,
                    select
                );
            },
            (error) => this.renderError(res, error)
        );
    };
};

const modifyModel = (permittedData, model) => {
    Object.keys(permittedData).forEach((key) => {
        model[key] = permittedData[key];
    });
    return model;
};

const lackingParams = (params, required) => {
    let lacking = [];
    required.forEach((i) => {
        if (!common.hasKey(params, i)) {
            lacking.push(i);
        } else if (common.emptyString(params[i])) {
            lacking.push(`'${i}'`);
        }
    });
    return lacking;
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

const checkModelData = (
    self,
    data,
    model,
    required,
    permit,
    action,
    errorAction
) => {
    let [validParams, requiredError] = self.hasRequiredParams(
        data,
        required
    );
    if (validParams) {
        let [err, permittedData] = permit(data, model);
        if (err) {
            errorAction(err);
        } else {
            action(permittedData);
        }
    } else {
        errorAction(requiredError);
    }
};

const checkModelBatchData = (
    self,
    data,
    model,
    required,
    permit,
    action,
    errorAction
) => {
    let permittedData = [],
        err = null;
    for (let i = 0; i < data.length; i++) {
        checkModelData(
            self,
            data[i],
            model,
            required,
            permit,
            (permittedEntry) =>
                permittedData.push(permittedEntry),
            (entryError) => (err = entryError)
        );
        if (err) break;
    }
    if (err) {
        errorAction(err);
    } else {
        action(permittedData);
    }
};
