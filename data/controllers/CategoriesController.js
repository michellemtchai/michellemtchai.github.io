const Controller = require('../classes/Controller');
const common = require('../helpers/common');

module.exports = class CategoriesController extends Controller {
    Category = this.models['Category'];
    createRequired = [
        'name',
        'description',
    ];
    updateRequired = [];
    updatePermitted = [
        'name',
        'description',
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
                res, i=>res.json(i), createPermitted(req)
            );
        };
        common.requiredParams(req.body, res, this.createRequired, createCategory);
    }

    update = (req, res) => {
        let next = i=>res.json(i);
        let updateCategory = ()=>{
            this.Category.update(
                res, next, req.params.id,
                common.updateModel(req.body, this.updatePermitted)
            );
        };
        common.requiredParams(req.body, res, this.updateRequired, updateCategory);
    }

    destroy = (req, res) => {
        this.Category.removeById(res, i=>res.json(i), req.params.id);
    }
};
