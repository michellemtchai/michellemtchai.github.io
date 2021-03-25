const fs = require('fs');
const Model = require('../classes/Model');
const winston = require('winston');

const logger = (type, who, messages) => {
    let typeName = type === 'Info' ? 'info' : 'error';
    let consoleLogger =
        type === 'Info' ? console.info : console.error;
    messages.forEach((message) => {
        if (message !== undefined) {
            message =
                typeof message == 'object'
                    ? JSON.stringify(message, null, 2)
                    : message;
            if (process.env.DATA_BACKEND_CONSOLE_LOG === '1') {
                consoleLogger(`[${type}]`, who, '--', message);
            }
            winston.log(typeName, `${who} -- ${message}`);
        }
    });
};
const log = (name) => {
    return (...message) => logger(message[0], name, message);
};
let models = {};
let controllers = {};

module.exports = self = {
    models: models,
    controllers: controllers,
    importLogger: () => require('./logger')(),
    createModel: (name, schema) => {
        return new Model(name, schema, log(`App:Model:${name}`));
    },
    fileAction: (dir, action) => {
        fs.readdirSync(dir).forEach((file) =>
            action(file.substring(0, file.length - 3))
        );
    },
    importModels: (app) => {
        self.fileAction('models', (file) => {
            models[file] = require('../models/' + file)(app);
        });
    },
    importControllers: (app) => {
        self.fileAction('controllers', (file) => {
            let controller = require('../controllers/' + file);
            controllers[file] = new controller(
                app,
                file,
                log(`App:Controller:${file}`)
            );
        });
    },
};
