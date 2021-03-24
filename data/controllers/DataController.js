const Controller = require('../classes/Controller');
const dataProc = require('../helpers/data');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

module.exports = class DataController extends Controller {
    Data = this.models['Data'];

    update = (req, res) => {
        this.Data.find(res, (data) => {
            if (data[0] !== undefined) {
                this.log('Pre-existing data in DB.');
                dataProc.processExistingRecords(
                    this,
                    data,
                    req,
                    res
                );
            } else {
                this.log('No pre-existing data in DB.');
                dataProc.readJsonToDb(this, res);
            }
        });
    };
};
