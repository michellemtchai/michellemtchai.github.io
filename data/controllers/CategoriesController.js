const Controller = require('../classes/Controller');

module.exports = class CategoriesController extends Controller {
    Category = this.models['Category'];
    createRequired = [
        'name',
        'description',
    ];
    updatePermitted = [
        ...this.createRequired,
        'projects',
    ];

    index = (req, res) => {
        this.Category.renderAll(res, {
            select: {
                __v: 0
            }
        });
     }

    create = (req, res) => {
        let createCategory = ()=>{
            this.Category.createOne(
                res, i=>res.json(i), this.createPermitted(req)
            );
        };
        this.requiredParams(req.body, res, this.createRequired, createCategory);
    }

    update = (req, res) => {
        let next = i=>res.json(i);
        let updateCategory = ()=>{
            this.Category.update(
                res, next, req.params.id,
                this.updateModel(req.body, this.updatePermitted)
            );
        };
        this.requiredParams(req.body, res, this.updateRequired, updateCategory);
    }

    destroy = (req, res) => {
        this.Category.removeById(res, i=>res.json(i), req.params.id);
    }
};
