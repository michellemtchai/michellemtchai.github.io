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
        dataProc.createDbModel(this, req, res, this.Technology);
    };

    update = (req, res) => {
        dataProc.updateDbModel(this, req, res, this.Technology);
    };

    destroy = (req, res) => {
        dataProc.removeDbModel(this, req, res, this.Technology);
    };
};
