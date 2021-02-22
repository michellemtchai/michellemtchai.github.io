let common = require('./common');

module.exports = db = {
    equals: (key, value)=>{
        return {[key]: value};
    },
    notEquals: (key, value)=>{
        return {[key]: {$ne: value}};
    },
    lessThan: (key, value)=>{
        return {[key]: {$lt: value}};
    },
    lessThanEquals: (key, value)=>{
        return {[key]: {$lte: value}};
    },
    greaterThan: (key, value)=>{
        return {[key]: {$gt: value}};
    },
    greaterThanEquals: (key, value)=>{
        return {[key]: {$gte: value}};
    },
    isIn: (key, arrayValue)=>{
        return {[key]: {$in: arrayValue}};
    },
    isNotIn: (key, arrayValue)=>{
        return {[key]: {$nin: arrayValue}};
    },
    or: (arrayConditions)=>{
        return {$or: arrayConditions};
    },
    not: (arrayConditions)=>{
        return {$not: arrayConditions};
    },
};
