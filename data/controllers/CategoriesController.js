const Controller = require('../classes/Controller');

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
        this.renderAll(this.Category, res, {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        });
    };

    create = (req, res) => {
        this.createModel(
            req.body,
            res,
            (i) => res.json(i),
            this.Category
        );
    };

    update = (req, res) => {
        let next = (i) => res.json(i);
        this.updateModel(
            req.params.id,
            req.body,
            res,
            next,
            this.Category
        );
    };

    destroy = (req, res) => {
        this.Category.removeById(
            res,
            (i) => res.json(i),
            req.params.id
        );
    };
};
