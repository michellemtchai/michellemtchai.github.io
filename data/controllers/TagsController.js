const Controller = require('../classes/Controller');

module.exports = class TagsController extends Controller {
    Tag = this.models['Tag'];
    createRequired = ['name'];

    index = (req, res) => {
        this.renderAll(this.Tag, res, {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        });
    };

    create = (req, res) => {
        this.createManyModels(
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Tag
        );
    };

    destroy = (req, res) => {
        this.Tag.removeById(
            res,
            (i) => this.renderSuccess(res, i),
            req.params.id
        );
    };
};
