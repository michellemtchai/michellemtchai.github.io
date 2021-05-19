const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const db = require('./db');
const cache = require('./cache');

module.exports = dataProc = {
    renderDbModel: (controller, res, model) => {
        let options = {
            select: db.defSelect,
        };
        let next = (data) => {
            controller.renderSuccess(res, data);
        };
        model.find(res, next, options);
    },
    createDbModel: (controller, req, res, model) => {
        let next = (data) => {
            cache.clearAll();
            controller.renderSuccess(res, data);
        };
        controller.createModel(res, model, req.body.data, next);
    },
    createManyDbModels: (controller, req, res, model) => {
        let next = (data) => {
            cache.clearAll();
            controller.renderSuccess(res, data);
        };
        controller.createManyModels(
            res,
            model,
            req.body.data,
            next
        );
    },
    updateDbModel: (controller, req, res, model) => {
        let next = (data) => {
            cache.clearAll();
            controller.renderSuccess(res, data);
        };
        controller.updateModelById(
            res,
            model,
            req.params.id,
            req.body.data,
            next
        );
    },
    removeDbModel: (controller, req, res, model) => {
        let next = (data) => {
            cache.clearAll();
            controller.renderSuccess(res, data);
        };
        model.removeById(res, req.params.id, next);
    },
};
