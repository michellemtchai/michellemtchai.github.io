const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const projects = require('../helpers/projects');
const db = require('../helpers/db');

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
        projects.page(res, this.models, req.query);
    };

    search = (req, res) => {
        projects.search(
            res,
            this.models,
            req.params.search,
            req.query
        );
    };

    show = (req, res) => {
        let [err, id] = db.toObjectId(req.params.id);
        let next = (data) => {
            if (data.length > 0) {
                res.json(data[0]);
            } else {
                this.renderError(
                    res,
                    db.invalidObjectId(req.params.id)
                );
            }
        };
        if (err) {
            this.renderError(res, err);
        } else {
            this.Project.aggregate(res, next, [
                db.lookupModelById('technologies'),
                db.lookupModelById('tags'),
                db.match({
                    _id: id,
                }),
                db.project(),
            ]);
        }
    };

    create = (req, res) => {
        dataProc.createDbModel(this, req, res, this.Project);
    };

    update = (req, res) => {
        dataProc.updateDbModel(this, req, res, this.Project);
    };

    destroy = (req, res) => {
        dataProc.removeDbModel(this, req, res, this.Project);
    };
};
