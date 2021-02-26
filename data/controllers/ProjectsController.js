const Controller = require('../classes/Controller');

module.exports = class ProjectsController extends Controller {
    Project = this.models['Project'];
    createRequired = [
        'name',
        'summary',
        'description',
        'source_url',
        'image_url',
    ];
    updatePermitted = [
        ...this.createRequired,
        'demo_url',
        'technologies',
        'tags',
    ];

    index = (req, res) => {
        this.Project.renderAll(res, {
            select: {
                __v: 0
            }
        });
    }

    create = (req, res) => {
        let createProject = ()=>{
            this.Project.createOne(
                res, i=>res.json(i), this.createPermitted(req)
            );
        };
        this.requiredParams(req.body, res, this.createRequired, createProject);
    }

    update = (req, res) => {
        let next = i=>res.json(i);
        let updateProject = ()=>{
            this.Project.update(
                res, next, req.params.id,
                this.updateModel(req.body, this.updatePermitted)
            );
        };
        this.requiredParams(req.body, res, this.updateRequired, updateProject);
    }

    destroy = (req, res) => {
        this.Project.removeById(res, i=>res.json(i), req.params.id);
    }
};
