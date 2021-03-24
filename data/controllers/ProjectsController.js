const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');

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
        dataProc.renderDbModel(this, res, this.Project);
    };

    create = (req, res) => {
        this.createModel(
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Project
        );
    };

    update = (req, res) => {
        this.updateModel(
            req.params.id,
            req.body,
            res,
            (i) => this.renderSuccess(res, i),
            this.Project
        );
    };

    destroy = (req, res) => {
        this.Project.removeById(
            res,
            (i) => this.renderSuccess(res, i),
            req.params.id
        );
    };
};
