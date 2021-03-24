const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');

module.exports = class CategoriesController extends Controller {
    Category = this.models['Category'];
    createRequired = [
        'name',
        'base_url',
        'icon_class',
        'description',
    ];
    updateForbidden = ['name'];
    containsObjectId = ['projects'];

    index = (req, res) => {
        dataProc.renderDbModel(this, res, this.Category);
    };

    create = (req, res) => {
        this.createModel(
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Category
        );
    };

    update = (req, res) => {
        this.updateModel(
            req.params.id,
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Category
        );
    };

    destroy = (req, res) => {
        this.Category.removeById(
            res,
            (i) => this.renderSuccess(res, i),
            req.params.id
        );
    };
};
