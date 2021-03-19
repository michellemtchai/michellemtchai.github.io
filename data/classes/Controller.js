const common = require('../helpers/common');
const ObjectId = require('mongodb').ObjectID;

module.exports = class Controller {
    constructor(app) {
        this.models = app.shared.models;
        this.assets = app.shared.assets;
        this.createRequired = [];
        this.updateRequired = [];
        this.updateable = [];
        this.containsObjectId = [];
    }

    createPermitted = (data, model) =>
        this.permit(data, model.attributes);

    createModel = (data, res, next, model) => {
        let [err, permittedData] = this.createPermitted(data, model);
        if (err) {
            res.status(404).json(err.message);
        } else {
            model.createOne(res, next, permittedData);
        }
    };

    requiredParams = (params, res, required, action) => {
        let lacking = [];
        required.forEach((i) => {
            if (!common.hasKey(params, i)) {
                lacking.push(i);
            } else if (common.emptyString(params[i])) {
                lacking.push(i);
            }
        });
        if (lacking.length == 0) {
            action();
        } else {
            lacking = lacking.map((i) => `'${i}'`);
            let error = `${lacking[0]} is a required parameter.`;
            if (lacking.length > 1) {
                let last = lacking.pop();
                error = `${lacking.join(
                    ', '
                )} and ${last} are all required parameters.`;
            }
            common.renderError(res, error);
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
                    let [err, result] = convertToObjectId(value);
                    if (!err) {
                        value = result;
                    } else {
                        error = err;
                        break;
                    }
                }
                result[key] = value;
            }
        }
        return [error, result];
    };

    updatePermitted = (data) => this.permit(data, this.updateable);

    updateModel = (id, data, res, next, model) => {
        let [err, permittedData] = this.updatePermitted(data);
        if (err) {
            res.status(404).json(err.message);
        } else {
            let modifyModel = (model) => {
                Object.keys(permittedData).forEach((key) => {
                    model[key] = permittedData[key];
                });
                return model;
            };
            model.update(res, next, id, modifyModel);
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
