const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = (app) => {
    // use gzip compression
    app.router.use(compression());

    if (process.env.DATA_BACKEND_ENV == 'development') {
        // allow cross-origin requests
        app.router.use(cors());
    }
    // parse request body
    app.router.use(bodyParser.urlencoded({ extended: false }));
    app.router.use(bodyParser.json());

    // make static files in /public availiable
    app.router.use('/assets', app.express.static('public'));

    // set view engine as ejs
    app.router.set('view engine', 'ejs');
};
