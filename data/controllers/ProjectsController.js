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
        let reqId = req.params.id;
        let cacheData = cache.getCache(reqId);
        if (cacheData) {
            if (cacheData.error) {
                this.renderError(res, cacheData.error);
            } else {
                res.json(cacheData.data);
            }
        } else {
            let [err, id] = db.toObjectId(reqId);
            let next = (data) => {
                if (data.length > 0) {
                    cache.setCache(reqId, {
                        data: data[0],
                    });
                    res.json(data[0]);
                } else {
                    err = db.invalidObjectId(reqId);
                    cache.setCache(reqId, {
                        error: err,
                    });
                    this.renderError(res, err);
                }
            };
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
                    db.project(),
                ]);
            }
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
