module.exports = class Controller {
    constructor(app){
        this.models = app.shared.models;
        this.assets = app.shared.assets;
    }
    createPermitted = (req)=>common.permit(req.body, this.createRequired);
};