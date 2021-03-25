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

    show = (req, res) => {
        this.renderOneWithId(this.Category, res, req.params.id, {
            __v: 0,
            created: 0,
            updated: 0,
        });
    };

    create = (req, res) => {
        dataProc.createDbModel(this, req, res, this.Category);
    };

    update = (req, res) => {
        dataProc.updateDbModel(this, req, res, this.Category);
    };

    destroy = (req, res) => {
        dataProc.removeDbModel(this, req, res, this.Category);
    };
};
