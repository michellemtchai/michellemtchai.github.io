const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const common = require('../helpers/common');
const db = require('../helpers/db');

module.exports = class Model {
    constructor(name, schema){
        this.model = mongoose.model(name,
            new mongoose.Schema({
                ...schema,
                created: {
                    type: Date,
                    default: Date.now
                },
                updated: {
                    type: Date,
                    default: Date.now
                }
            })
        );
    }

    find = (res, next, {
        query = [], sort = null, limit = null, select = null
    }= {})=>{

        let model = this.model.find(...query);
        if(sort){
            model = model.sort(sort);
        }
        if(limit){
            model = model.limit(limit);
        }
        if(select){
            model = model.select(select);
        }
        handleDbAction(res, next, model, 'exec');
    }

    findById = (res, next, id, select=null) =>{
        let [err, params] = idParam(res, id);
        let nextAction = data=>next(data[0]);
        if(!err){
            this.find(res, nextAction, {
                select: select,
                query: [params]
            });
        }
        else{
            next(null);
        }
    }

    createOne = (res, next, params)=>{
        let model = new this.model(params);
        handleDbAction(res, next, model, 'save');
    }

    createMany = (res, next, entries)=>{
        handleDbAction(res, next, this.model, 'create', [entries]);
    }

    update = (res, next, id, change)=>{
        let changeAction = (data)=>{
            data = change(data);
            data.updated = new Date();
            return data;
        };
        let handleData = (data)=>{
            if(data){
                handleDbAction(res, next,
                    changeAction(data), 'save');
            } else{
                invalidId(res, id);
            }
        }
        this.findById(res, handleData, id);
    }

    remove = (res, next, params)=>{
        let handleData = (data)=>{
            handleDbAction(res, i=>next(data), this.model,
                'deleteMany', params);
        }
        this.find(res, handleData, {
            query: params
        })
    }

    removeById = (res, next, id)=>{
        let handleData = (data)=>{
            if(data){
                handleDbAction(res, next, data, 'remove');
            } else{
                invalidId(res, id);
            }
        }
        this.findById(res, handleData, id);
    }

    renderAll = (res, options = {})=>{
        this.find(res, i=>res.json(i), options);
    }

    renderOneWithId = (res, id, select = null)=>{
        let handleData = (data)=>{
            if(data){
                res.json(data);
            } else {
                invalidId(res, id);
            }
        }
        this.findById(res, handleData, id, select);
    }

};

// private functions
const handleDbAction = (res, next, model, fnName, params = [])=>{
    let t = timeOut(res);
    try {
        model[fnName](...params, (err, data)=>{
            clearTimeout(t);
            if(!err){
                next(data);
            }
            else{
                common.renderError(res, err.message);
            }
        })
    } catch (err){
        clearTimeout(t);
        common.renderError(res, err.message);
    }
}

const timeOut = (res)=>{
    let timeout = 10000;
    return setTimeout(()=>{
        common.renderError(res, 'Database Timeout');
    }, timeout);
}

const idParam = (res, id)=>{
    try{
        return [false, {
            _id: ObjectId(id)
        }];
    }
    catch(err){
        return [true, {}];
    }
}

const invalidId = (res, id)=>{
    common.renderError(res, `'${id}' is not a valid id.`);
}
