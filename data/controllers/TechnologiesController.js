const Controller = require('../classes/Controller');
const common = require('../helpers/common');

module.exports = class TechnologiesController extends Controller {
    Technology = this.models['Technology'];
    createRequired = [
        'name',
        'source_url',
        'icon_url',
    ];
    updateRequired = [];
    updatePermitted = [
        'source_url',
        'icon_url',
    ];

    index = (req, res) => {
        this.Technology.renderAll(res, {
            select: {
                __v: 0
            }
        });
     }

    create = (req, res) => {
        let createTechnology = ()=>{
            this.Technology.createOne(
                res, i=>res.json(i), createPermitted(req)
            );
        };
        common.requiredParams(req.body, res, this.createRequired, createTechnology);
    }

    update = (req, res) => {
        let next = i=>res.json(i);
        let updateTechnology = ()=>{
            this.Technology.update(
                res, next, req.params.id,
                common.updateModel(req.body, this.updatePermitted)
            );
        };
        common.requiredParams(req.body, res, this.updateRequired, updateTechnology);
    }

    destroy = (req, res) => {
        this.Technology.removeById(res, i=>res.json(i), req.params.id);
    }
};
