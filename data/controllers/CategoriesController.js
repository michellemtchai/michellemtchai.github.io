const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const db = require('../helpers/db');

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
        let next = (i) => res.json(i);
        this.Category.find(res, next, {
            select: db.defSelect,
            sort: {
                _id: 1,
            },
        });
    };

    show = (req, res) => {
        this.renderOneWithId(
            this.Category,
            res,
            req.params.id,
            db.defSelect
        );
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
