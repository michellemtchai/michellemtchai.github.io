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
};
