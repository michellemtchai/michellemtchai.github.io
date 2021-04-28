const NodeCache = require('node-cache');
const cacheData = new NodeCache();

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
};
