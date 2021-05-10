const NodeCache = require('node-cache');
const cacheData = new NodeCache();
const htmlEntities = require('html-entities');
const oneDay = 86400;

module.exports = cache = {
    getCache: (key) => {
        return cacheData.get(key);
    },
    setCache: (keyName, data) => {
        cacheData.set(keyName, data, oneDay);
    },
    clearAll: () => {
        cacheData.flushAll();
    },
    mapEntries: (data, formatEntry = null) => {
        let mapping = {};
        data.forEach((i) => {
            mapping[i._id] = formatEntry ? formatEntry(i) : i;
        });
        return mapping;
    },
    cacheAction: (
        cacheKey,
        action,
        nextStep,
        errorAction = (i) => i,
        {
            checkError = false,
            isError = false,
            formatData = (i) => i,
            formatError = (i) => i,
        } = {}
    ) => {
        let cacheData = cache.getCache(cacheKey);
        if (cacheData) {
            if (checkError) {
                if (cacheData.error) {
                    errorAction(cacheData.error);
                } else {
                    nextStep(cacheData.data);
                }
            } else {
                nextStep(cacheData);
            }
        } else {
            let next = (data) => {
                if (checkError) {
                    if (isError(data)) {
                        data = {
                            error: formatError(data),
                        };
                        cache.setCache(cacheKey, data);
                        errorAction(data.error);
                    } else {
                        data = {
                            data: formatData(data),
                        };
                        cache.setCache(cacheKey, data);
                        nextStep(data.data);
                    }
                } else {
                    cache.setCache(cacheKey, data);
                    nextStep(data);
                }
            };
            action(next);
        }
    },
    boldText: (text, regex) =>
        htmlEntities.encode(text).replace(regex, '<b>$1</b>'),
};
