const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const projects = require('../helpers/projects');
const cache = require('../helpers/cache');
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
        projects.page(
            res,
            this.models,
            this.renderError,
            req.query
        );
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
        let reqId = req.params.id;
        let successAction = (data) =>
            this.renderSuccess(res, data);
        let errorAction = (data) => this.renderError(res, data);
        let queryProject = (next) => {
            let [err, id] = db.toObjectId(reqId);
            if (err) {
                cache.setCache(reqId, {
                    error: err,
                });
                this.renderError(res, err);
            } else {
                this.Project.aggregate(res, next, [
                    db.lookupModelById('technologies'),
                    db.lookupModelById('tags'),
                    db.match({
                        _id: id,
                    }),
                    db.project(db.hideAttr([])),
                ]);
            }
        };
        let cacheActionConfig = {
            checkError: true,
            isError: (data) => data.length < 1,
            formatError: (data) => db.invalidObjectId(reqId),
            formatData: (data) => data[0],
        };
        cache.cacheAction(
            reqId,
            queryProject,
            successAction,
            errorAction,
            cacheActionConfig
        );
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
