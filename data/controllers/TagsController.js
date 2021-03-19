const Controller = require('../classes/Controller');

module.exports = class TagsController extends Controller {
    Tag = this.models['Tag'];
    createRequired = ['name'];

    index = (req, res) => {
        this.Tag.renderAll(res, {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        });
    };

    create = (req, res) => {
        let createTag = () => {
            this.createModel(
                req.body,
                res,
                (i) => res.json(i),
                this.Tag
            );
        };
        this.requiredParams(
            req.body,
            res,
            this.createRequired,
            createTag
        );
    };

    destroy = (req, res) => {
        this.Tag.removeById(res, (i) => res.json(i), req.params.id);
    };
};
