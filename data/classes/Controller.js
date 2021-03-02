const common = require('../helpers/common');

module.exports = class Controller {
    constructor(app){
        this.models = app.shared.models;
        this.assets = app.shared.assets;
        this.createRequired = [];
        this.updateRequired = [];
        this.updatePermitted = [];
    }

    createPermitted = (req)=>this.permit(req.body,
        this.createRequired);

    requiredParams = (params, res, required, action)=>{
        let lacking = [];
        required.forEach(i=>{
            if(!common.hasKey(params, i)){
                lacking.push(i);
            }
            else if(common.emptyString(params[i])){
                lacking.push(i);
            }
        })
        if(lacking.length == 0){
            action();
        }
        else{
            lacking = lacking.map(i=>`'${i}'`);
            let error = `${lacking[0]} is a required parameter.`;
            if (lacking.length > 1){
                let last = lacking.pop();
                error = `${lacking.join(', ')} and ${last} are all required parameters.`;
            }
            common.renderError(res, error);
        }
    }

    permit = (params, permitted)=>{
        let result = {};
        permitted.forEach(i=>{
            if(common.hasKey(params, i)){
                result[i] = params[i];
            }
        })
        return result;
    }

    updateModel = (data, permitted)=>{
        let permittedData = this.permit(data, permitted);
        return (model)=>{
            Object.keys(permittedData).forEach(key=>{
                model[key]=permittedData[key];
            })
            return model;
        }
    }
};