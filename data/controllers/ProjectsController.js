const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const projects = require('../helpers/projects');
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
        let step1 = (project) => {
            cache.mapAction(
                this.models,
                'Technology',
                res,
                (data) => step2(data, project)
            );
        };
        let step2 = (technologies, project) => {
            cache.mapAction(this.models, 'Tag', res, (data) =>
                step3(data, technologies, project)
            );
        };
        let step3 = (tags, technologies, project) => {
            res.json({
                ...project._doc,
                tags: project.tags.map((i) => tags[i]),
                technologies: project.technologies.map(
                    (i) => technologies[i]
                ),
            });
        };
        this.Project.findById(res, req.params.id, step1, {
            __v: 0,
            created: 0,
            updated: 0,
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
