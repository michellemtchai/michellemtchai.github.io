const Controller = require('../classes/Controller');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const file = '/app/src/config/data.json';

module.exports = class DataController extends Controller {
    Data = this.models['Data'];

    update = (req, res) => {
        this.Data.find(res, (data) => {
            if (data[0] !== undefined) {
                let next = (i) => {
                    res.status(200).json({
                        reload: false,
                    });
                };
                readFile(this, file, res, (json) => {
                    writeToFile(
                        this,
                        file,
                        formatJsonData(req.body),
                        res,
                        () => {
                            this.Data.update(
                                res,
                                next,
                                data[0]._id,
                                updateExported
                            );
                        }
                    );
                });
            } else {
                let readData = (data) =>
                    readFile(file, res, updateDb);
                let updateDb = (data) => {
                    chainInsert(
                        res,
                        this.models,
                        insertData(formatDbData(data))
                    );
                };
                this.Data.createOne(res, readData, {
                    exported: new Date(),
                });
            }
        });
    };
};

const writeToFile = (self, file, content, res, next) => {
    fs.writeFile(file, content, function (err, file) {
        if (err) {
            self.renderError(res, err);
        } else {
            next();
        }
    });
};

const readFile = (self, file, res, next) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            self.renderError(res, err);
        } else {
            next(JSON.parse(data));
        }
    });
};

const updateExported = (res) => res;

const formatJsonData = (json) => {
    return JSON.stringify(sortObject(json)) + '\n';
};

const sortObject = (data) => {
    if (typeof data === 'object' && !(data instanceof Array)) {
        let sorted = {};
        let keys = Object.keys(data).sort();
        keys.forEach((key) => {
            sorted[key] = sortObject(data[key]);
        });
        return sorted;
    } else {
        return data;
    }
};

const formatDbData = (data) => {
    let result = {};
    let keys = Object.keys(data);
    keys.forEach((key) => {
        let items = [];
        Object.keys(data[key]).forEach((i_key) => {
            let entry = data[key][i_key];
            items.push({
                ...entry,
                _id: ObjectId(entry._id),
            });
        });
        result[key] = items;
    });
    return result;
};

const insertData = (data) => [
    {
        model: 'Category',
        data: data.categories,
    },
    {
        model: 'Project',
        data: data.projects,
    },
    {
        model: 'Tag',
        data: data.tags,
    },
    {
        model: 'Technology',
        data: data.technologies,
    },
];

const chainInsert = (res, models, data) => {
    if (data.length > 0) {
        let model = models[data[0].model];
        let copy = [...data];
        copy.shift();
        if (data[0].data.length > 0) {
            model.createMany(
                res,
                (_) => chainInsert(res, models, copy),
                data[0].data
            );
        } else {
            chainInsert(res, models, copy);
        }
    } else {
        res.status(200).json({
            reload: true,
        });
    }
};
