const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

module.exports = class DataController extends Controller {
    update = (req, res) => {
        if (req.body.exported) {
            this.log('Pre-existing data in DB.');
            dataProc.processExistingRecords(this, req, res);
        } else {
            this.log('No pre-existing data in DB.');
            dataProc.readJsonToDb(this, res);
        }
    };
};
