const Controller = require('../classes/Controller');

module.exports = class TechnologiesController extends Controller {
    Technology = this.models['Technology'];
    createRequired = ['name', 'source_url', 'icon_url'];
    updatePermitted = ['source_url', 'icon_url'];

    index = (req, res) => {
        this.Technology.renderAll(res, {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        });
    };

    create = (req, res) => {
        let createTechnology = () => {
            this.Technology.createOne(
                res,
                (i) => res.json(i),
                this.createPermitted(req)
            );
        };
        this.requiredParams(
            req.body,
            res,
            this.createRequired,
            createTechnology
        );
    };

    update = (req, res) => {
        let next = (i) => res.json(i);
        let updateTechnology = () => {
            this.Technology.update(
                res,
                next,
                req.params.id,
                this.updateModel(req.body, this.updatePermitted)
            );
        };
        this.requiredParams(
            req.body,
            res,
            this.updateRequired,
            updateTechnology
        );
    };

    destroy = (req, res) => {
        this.Technology.removeById(res, (i) => res.json(i), req.params.id);
    };
};
