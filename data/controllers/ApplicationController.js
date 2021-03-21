const Controller = require('../classes/Controller');

module.exports = class ApplicationController extends Controller {
    /**
     * @api {get} / Get index page
     * @apiSampleRequest off
     * @apiVersion 1.0.0
     * @apiGroup Application
     */
    index = (req, res) => {
        res.render('pages/index');
    };
};
