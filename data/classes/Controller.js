module.exports = class Controller {
    constructor(app){
        this.models = app.shared.models;
        this.assets = app.shared.assets;
    }
};