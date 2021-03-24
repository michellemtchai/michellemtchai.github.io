const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

module.exports = dataProc = {
    renderDbModel: (controller, res, model) => {
        let options = {
            select: {
                __v: 0,
                created: 0,
                updated: 0,
            },
        };
        let renderData = (data1, data2) => {
            controller.renderSuccess(res, [data1, data2]);
        };
        let getDataExported = (data) => {
            options.select._id = 0;
            controller.models['Data'].find(
                res,
                (i) => renderData(data, i),
                options
            );
        };
        model.find(res, getDataExported, options);
    },
    processExistingRecords: (controller, data, req, res) => {
        let dbExported = data[0].exported.getTime();
        let clientExported = new Date(
            req.body.exported
        ).getTime();
        let nullDateTime = new Date(null).getTime();
        let processJsonData = (json) => {
            processDbData(
                controller,
                req,
                res,
                data,
                dbExported,
                json
            );
        };
        controller.log(
            'Client exported date',
            clientExported,
            'DB exported date',
            dbExported
        );
        if (
            clientExported === nullDateTime ||
            clientExported >= dbExported
        ) {
            controller.log('Client data is up-to-date.');
            readFile(
                controller,
                process.env.REACT_APP_DATA_LOCATION,
                res,
                processJsonData,
                req.body
            );
        } else {
            controller.log('Client data is outdated.');
            controller.renderSuccess(res, {
                reload: true,
            });
        }
    },
    readJsonToDb: (controller, res) => {
        let renderResponse = (_) => {
            controller.log('Updated data exported date.');
            controller.renderSuccess(res, {
                reload: true,
            });
        };
        let createData = (exported) => {
            controller.log(
                'Finished inserting JSON data into DB.'
            );
            controller.log('exported date', exported);
            controller.Data.createOne(res, renderResponse, {
                exported: exported,
            });
        };
        let updateDb = (data) => {
            controller.log(`Finished reading file.`);
            chainInsert(
                res,
                controller.models,
                insertData(formatDbData(data)),
                () => createData(data.exported)
            );
        };
        readFile(
            controller,
            process.env.REACT_APP_DATA_LOCATION,
            res,
            updateDb
        );
    },
};

const processDbData = (
    controller,
    req,
    res,
    data,
    dbExported,
    json
) => {
    let jsonExported = new Date(json.exported).getTime();
    controller.log(
        'JSON exported',
        jsonExported,
        'DB exported',
        dbExported
    );
    if (jsonExported === dbExported) {
        controller.log(
            'Data file up-to-date. Not writing to file.'
        );
        controller.renderSuccess(res, {
            reload: false,
        });
    } else if (jsonExported < dbExported) {
        controller.log('Data file outdated. Writing to it.');
        writeDbToJson(controller, req, res, data);
    } else {
        controller.log(
            'Data file is more advanced than DB. Overwriting.'
        );
        controller.db.dropDatabase(() => {
            controller.log('Database dropped.');
            dataProc.readJsonToDb(controller, res);
        });
    }
};

const writeDbToJson = (controller, req, res, data) => {
    let newExported = new Date();
    let next = (i) => {
        controller.log('Updated data exported date.');
        controller.renderSuccess(res, {
            reload: false,
        });
    };
    let updateExportedInDb = () => {
        controller.log(`Finished writing to file.`);
        controller.Data.update(res, next, data[0]._id, (res) => {
            res.exported = newExported;
            return res;
        });
    };
    let writeJsonData = (json) => {
        req.body.exported = newExported.toISOString();
        json = { ...json, ...req.body };
        writeToFile(
            controller,
            process.env.REACT_APP_DATA_LOCATION,
            formatJsonData(json),
            res,
            updateExportedInDb
        );
    };
    readFile(
        controller,
        process.env.REACT_APP_DATA_LOCATION,
        res,
        writeJsonData
    );
};

const initJsonFile = (err, controller, file, res, dbData) => {
    let next = (i) => {
        controller.log(`Created initial "${file}".`);
        controller.renderSuccess(res, {
            reload: false,
        });
    };
    let writeDataContent = (data) => {
        controller.log('Got data exported entry.');
        let content = JSON.stringify(data);
        writeToFile(controller, file, content, res, next);
    };
    let processDataContent = (data) => {
        writeDataContent({
            exported: data.exported.toISOString(),
        });
    };
    controller.error(err.message);
    if (dbData) {
        controller.log(
            'Write to file with existing exported date.'
        );
        writeDataContent(dbData);
    } else {
        controller.log(
            'Create data exported date then use it in file.'
        );
        controller.Data.createOne(res, processDataContent, {
            exported: new Date(),
        });
    }
};

const writeToFile = (controller, file, content, res, next) => {
    fs.writeFile(file, content, (err) => {
        if (err) {
            controller.renderError(res, err);
        } else {
            controller.log(`Wrote to the file "${file}".`);
            next();
        }
    });
};

const readFile = (
    controller,
    file,
    res,
    next,
    dbData = null
) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            initJsonFile(err, controller, file, res, dbData);
        } else {
            controller.log(`Read JSON from "${file}".`);
            try {
                let jsonData = JSON.parse(data);
                controller.log('Finished parsing JSON.');
                next(jsonData);
            } catch (parseError) {
                controller.renderError(res, parseError);
            }
        }
    });
};

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

const chainInsert = (res, models, data, next) => {
    if (data.length > 0) {
        let model = models[data[0].model];
        let copy = [...data];
        copy.shift();
        if (data[0].data.length > 0) {
            model.createMany(
                res,
                (_) => chainInsert(res, models, copy, next),
                data[0].data
            );
        } else {
            chainInsert(res, models, copy, next);
        }
    } else {
        next();
    }
};
