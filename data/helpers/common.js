module.exports = common = {
    hasKey: (obj, key)=>{
        return Object.hasOwnProperty.call(obj, key);
    },
    isArray: (obj)=>{
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    emptyString: (str)=>{
        return typeof str == 'string'?
            str.trim().length == 0 : false;
    },
    renderError: (res, message)=>{
        res.status(404).json({ msg: message });
    },
    errorResponse: (res)=>{
        return (err)=>common.renderError(res, err.message);
    },
    requiredParams: (params, res, required, action)=>{
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
    },
    permit: (params, permitted)=>{
        let result = {};
        permitted.forEach(i=>{
            if(common.hasKey(params, i)){
                result[i] = params[i];
            }
        })
        return result;
    },
};
