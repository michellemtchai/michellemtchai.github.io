const NodeCache = require('node-cache');
const cacheData = new NodeCache();
const htmlEntities = require('html-entities');

module.exports = cache = {
    getCache: (key) => {
        return cacheData.get(key);
    },
    setCache: (keyName, data) => {
        cacheData.set(keyName, data);
    },
    mapEntries: (data, formatEntry = null) => {
        let mapping = {};
        data.forEach((i) => {
            mapping[i._id] = formatEntry ? formatEntry(i) : i;
        });
        return mapping;
    },
    mapAction: (
        models,
        keyName,
        res,
        action,
        select = {},
        formatEntry
    ) => {
        let mapData = cacheData.get(keyName);
        if (mapData) {
            action(mapData);
        } else {
            let next = (data) => {
                let mapping = cache.mapEntries(
                    data,
                    formatEntry
                );
                cacheData.set(keyName, mapping);
                action(mapping);
            };
            models[keyName].find(res, next, {
                select: {
                    ...select,
                    updated: 0,
                    created: 0,
                    __v: 0,
                },
            });
        }
    },
    searchAction: (
        models,
        keyName,
        res,
        regex,
        action,
        select = {}
    ) => {
        let regExp = new RegExp(regex, 'gi');
        let next = (data) => {
            let mapping = {};
            data.forEach(
                (i) =>
                    (mapping[i._id] = {
                        ...i._doc,
                        name: cache.boldText(i.name, regExp),
                    })
            );
            cache.mapAction(
                models,
                keyName,
                res,
                (i) => step2(i, mapping),
                select
            );
        };
        let step2 = (data, selected) => {
            action({
                mapping: {
                    ...data,
                    ...selected,
                },
                selected: Object.keys(selected),
            });
        };
        models[keyName].find(res, next, {
            query: db.regex('name', regex, 'ig'),
            select: {
                ...select,
                updated: 0,
                created: 0,
                __v: 0,
            },
        });
    },
    boldText: (text, regex) =>
        htmlEntities.encode(text).replace(regex, '<b>$1</b>'),
};
