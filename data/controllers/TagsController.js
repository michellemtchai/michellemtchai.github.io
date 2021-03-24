const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');

module.exports = class TagsController extends Controller {
    Tag = this.models['Tag'];
    createRequired = ['name'];

    index = (req, res) => {
        dataProc.renderDbModel(this, res, this.Tag);
    };

    create = (req, res) => {
        this.createManyModels(
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Tag
        );
    };

    destroy = (req, res) => {
        this.Tag.removeById(
            res,
            (i) => this.renderSuccess(res, i),
            req.params.id
        );
    };
};
