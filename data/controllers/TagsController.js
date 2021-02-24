const Controller = require('../classes/Controller');
const common = require('../helpers/common');

module.exports = class TagsController extends Controller {
    Tag = this.models['Tag'];
    createRequired = [
        'name',
    ];

    index = (req, res) => {
        this.Tag.renderAll(res, {
            select: {
                __v: 0
            }
        });
     }

    create = (req, res) => {
        let createTag = ()=>{
            this.Tag.createOne(
                res, i=>res.json(i), createPermitted(req)
            );
        };
        common.requiredParams(req.body, res, this.createRequired, createTag);
    }

    destroy = (req, res) => {
        this.Tag.removeById(res, i=>res.json(i), req.params.id);
    }
};
