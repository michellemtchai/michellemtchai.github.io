const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

module.exports = dataProc = {
    renderDbModel: (controller, res, model) => {
        let options = {
            select: selectOptions,
        };
        let renderData = (data1, data2) => {
            controller.renderSuccess(res, [data1, data2]);
        };
        let getDataExported = (data) => {
            controller.models['Data'].find(
                res,
                (i) => renderData(data, i),
                options
            );
        };
        model.find(res, getDataExported, options);
    },
    createDbModel: (controller, req, res, model) => {
        let processDataResponse = (data) => {
            renderModifyRecordResponse(
                controller,
                req,
                res,
                data
            );
        };
        controller.createModel(
            res,
            model,
            req.body.data,
            processDataResponse
        );
    },
    createManyDbModels: (controller, req, res, model) => {
        let processDataResponse = (data) => {
            renderModifyRecordResponse(
                controller,
                req,
                res,
                data
            );
        };
        controller.createManyModels(
            res,
            model,
            req.body.data,
            processDataResponse
        );
    },
    updateDbModel: (controller, req, res, model) => {
        let processDataResponse = (data) => {
            renderModifyRecordResponse(
                controller,
                req,
                res,
                data
            );
        };
        controller.updateModelById(
            res,
            model,
            req.params.id,
            req.body.data,
            processDataResponse
        );
    },
    removeDbModel: (controller, req, res, model) => {
        let processDataResponse = (data) => {
            renderModifyRecordResponse(
                controller,
                req,
                res,
                data
            );
        };
        model.removeById(
            res,
            req.params.id,
            processDataResponse
        );
    },
    processExistingRecords: (controller, req, res) => {
        let getDates = (data) => {
            manageDBClientDates(controller, req, res, data);
        };
        controller.models['Data'].findById(
            res,
            req.body.exported._id,
            getDates
        );
    },
    readJsonToDb: (controller, res) => {
        let renderResponse = (_) => {
            controller.log('Updated data exported date.');
            controller.renderSuccess(res, {
                reload: true,
            });
        };
        let createData = (data) => {
            controller.log(
                'Finished inserting JSON data into DB.'
            );
            controller.log('exported date', data.exported);
            controller.models['Data'].createOne(
                res,
                data,
                renderResponse
            );
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

const selectOptions = {
    __v: 0,
    created: 0,
    updated: 0,
};

const renderModifyRecordResponse = (
    controller,
    req,
    res,
    data
) => {
    let updateExportedInDb = (exportedData) => {
        controller.renderSuccess(res, {
            data: data,
            exported: exportedData,
        });
    };
    if (req.body.exported) {
        controller.models['Data'].updateById(
            res,
            req.body.exported._id,
            {
                exported: new Date(),
            },
            updateExportedInDb,
            selectOptions
        );
    } else {
        updateExportedInDb(null);
    }
};

const manageDBClientDates = (controller, req, res, data) => {
    let dbExported = data.exported.getTime();
    let clientExported = new Date(
        req.body.exported.exported
    ).getTime();
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
    if (clientExported >= dbExported) {
        controller.log('Client data is up-to-date.');
        readFile(
            controller,
            process.env.REACT_APP_DATA_LOCATION,
            res,
            processJsonData,
            req.body.data
        );
    } else {
        controller.log('Client data is outdated.');
        controller.renderSuccess(res, {
            reload: true,
        });
    }
};

const processDbData = (
    controller,
    req,
    res,
    data,
    dbExported,
    json
) => {
    let jsonExported = new Date(
        json.exported.exported
    ).getTime();
    controller.log(
        'JSON exported',
        json.exported.exported,
        'DB exported',
        new Date(dbExported).toISOString()
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
        controller.log('Finished writing to file.');
        controller.models['Data'].updateById(
            res,
            data._id,
            {
                exported: newExported,
            },
            next
        );
    };
    let writeJsonData = (json) => {
        req.body.exported = {
            _id: data.id,
            exported: newExported.toISOString(),
        };
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
            exported: data,
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
        controller.models['Data'].createOne(
            res,
            {
                exported: new Date(),
            },
            processDataContent,
            selectOptions
        );
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
            controller.log(`Error reading from "${file}".`);
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

const insertData = (data) => {
    let mapping = {
        categories: 'Category',
        projects: 'Project',
        tags: 'Tag',
        technologies: 'Technology',
    };
    let result = [];
    Object.keys(mapping).forEach((key) => {
        if (data[key]) {
            result.push({
                model: mapping[key],
                data: data[key],
            });
        }
    });
    return result;
};
const chainInsert = (res, models, data, next) => {
    if (data.length > 0) {
        let model = models[data[0].model];
        let copy = [...data];
        copy.shift();
        if (data[0].data.length > 0) {
            model.createMany(res, data[0].data, (_) =>
                chainInsert(res, models, copy, next)
            );
        } else {
            chainInsert(res, models, copy, next);
        }
    } else {
        next();
    }
};
