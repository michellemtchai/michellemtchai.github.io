const Controller = require('../classes/Controller');

module.exports = class CategoriesController extends Controller {
    Category = this.models['Category'];
    createRequired = [
        'name',
        'base_url',
        'icon_class',
        'description',
    ];
    updateable = [...this.createRequired, 'projects'];
    containsObjectId = ['projects'];

    index = (req, res) => {
        this.Category.renderAll(res, {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        });
    };

    create = (req, res) => {
        let createCategory = () => {
            this.createModel(
                req.body,
                res,
                (i) => res.json(i),
                this.Category
            );
        };
        this.requiredParams(
            req.body,
            res,
            this.createRequired,
            createCategory
        );
    };

    update = (req, res) => {
        let next = (i) => res.json(i);
        let updateCategory = () => {
            this.updateModel(
                req.params.id,
                req.body,
                res,
                next,
                this.Category
            );
        };
        this.requiredParams(
            req.body,
            res,
            this.updateRequired,
            updateCategory
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
