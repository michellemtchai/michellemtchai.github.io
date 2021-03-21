const Controller = require('../classes/Controller');

module.exports = class ProjectsController extends Controller {
    Project = this.models['Project'];
    createRequired = [
        'name',
        'summary',
        'description',
        'source_url',
    ];
    updateForbidden = ['name'];
    containsObjectId = ['technologies', 'tags'];

    index = (req, res) => {
        this.renderAll(this.Project, res, {
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
            this.Project
        );
    };

    update = (req, res) => {
        let next = (i) => res.json(i);
        this.updateModel(
            req.params.id,
            req.body,
            res,
            next,
            this.Project
        );
    };

    destroy = (req, res) => {
        this.Project.removeById(
            res,
            (i) => res.json(i),
            req.params.id
        );
    };
};
