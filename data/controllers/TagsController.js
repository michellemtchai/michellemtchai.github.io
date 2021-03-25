const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');

module.exports = class TagsController extends Controller {
    Tag = this.models['Tag'];
    createRequired = ['name'];

    index = (req, res) => {
        dataProc.renderDbModel(this, res, this.Tag);
    };

    create = (req, res) => {
        dataProc.createManyDbModels(this, req, res, this.Tag);
    };

    destroy = (req, res) => {
        dataProc.removeDbModel(this, req, res, this.Tag);
    };
};
