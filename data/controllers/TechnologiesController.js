const Controller = require('../classes/Controller');

module.exports = class TechnologiesController extends Controller {
    Technology = this.models['Technology'];
    createRequired = ['name', 'source_url', 'icon_url'];
    updateable = ['source_url', 'icon_url'];

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
            this.createModel(
                req.body,
                res,
                (i) => res.json(i),
                this.Technology
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
            this.updateModel(
                req.params.id,
                req.body,
                res,
                next,
                this.Technology
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
        this.Technology.removeById(
            res,
            (i) => res.json(i),
            req.params.id
        );
    };
};
