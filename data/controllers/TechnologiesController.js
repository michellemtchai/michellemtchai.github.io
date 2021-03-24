const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');

module.exports = class TechnologiesController extends (
    Controller
) {
    Technology = this.models['Technology'];
    createRequired = ['name', 'source_url', 'icon_url'];
    updateForbidden = ['name'];

    index = (req, res) => {
        dataProc.renderDbModel(this, res, this.Technology);
    };

    create = (req, res) => {
        this.createModel(
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Technology
        );
    };

    update = (req, res) => {
        this.updateModel(
            req.params.id,
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Technology
        );
    };

    destroy = (req, res) => {
        this.Technology.removeById(
            res,
            (i) => this.renderSuccess(res, i),
            req.params.id
        );
    };
};
