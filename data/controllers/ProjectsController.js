const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const cache = require('../helpers/cache');

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
        let page = req.query.page ? req.query.page : 1;
        let step1 = (projects) => {
            cache.mapAction(
                this.models,
                'Technology',
                res,
                (data) => step2(data, projects)
            );
        };
        let step2 = (technologies, projects) => {
            let result = [];
            projects.forEach((project) => {
                result.push({
                    ...project._doc,
                    technologies: project.technologies.map(
                        (i) => technologies[i]
                    ),
                });
            });
            res.json(result);
        };
        this.Project.find(res, step1, {
            sort: {
                name: 1,
            },
            skip: (page - 1) * 10,
            limit: 10,
            select: {
                gallery: 0,
                tags: 0,
                description: 0,
                updated: 0,
                created: 0,
                __v: 0,
            },
        });
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
