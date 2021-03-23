const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

module.exports = {
    processExistingRecords: (controller, data, req, res) => {
        let dbExported = data[0].exported.getTime();
        let clientExported = new Date(
            req.body.exported
        ).getTime();
        let nullDateTime = new Date(null).getTime();
        let processDbData = (json) => {
            writeDbToJson(controller, req, res, data);
        };
        if (
            clientExported === nullDateTime ||
            clientExported >= dbExported
        ) {
            controller.log('Client data is up-to-date.');
            readFile(
                controller,
                process.env.REACT_APP_DATA_LOCATION,
                res,
                processDbData,
                data[0]
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
        let createData = () => {
            controller.log(
                'Finished inserting JSON data into DB.'
            );
            controller.Data.createOne(res, renderResponse, {
                exported: new Date(),
            });
        };
        let updateDb = (data) => {
            controller.log(`Finished reading file.`);
            chainInsert(
                res,
                controller.models,
                insertData(formatDbData(data)),
                createData
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
    req.body.exported = newExported.toISOString();
    writeToFile(
        controller,
        process.env.REACT_APP_DATA_LOCATION,
        formatJsonData(req.body),
        res,
        updateExportedInDb
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
        let content = JSON.stringify({
            exported: data.exported.toISOString(),
        });
        writeToFile(controller, file, content, res, next);
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
        controller.Data.createOne(res, writeDataContent, {
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
