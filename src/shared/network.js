export const fetchAPIData = (
    props,
    url,
    {
        method,
        params,
        setState,
        setError,
        minStored,
        formatData,
        next,
    } = {}
) => {
    fetchData(
        baseUrl + url,
        fetchConfig(props, {
            method: method,
            params: params,
            setState: setState,
            setError: setError,
            minStored: minStored,
            formatData: formatData,
            next: next,
        })
    );
};

const baseUrl =
    process.env.NODE_ENV == 'development'
        ? `http://localhost:${process.env.REACT_APP_PORT}`
        : '';

const fetchConfig = (
    props,
    {
        method = 'GET',
        params = {},
        setState = setState,
        setError,
        minStored = 0,
        formatData = (data) => data,
        next = null,
    } = {}
) => {
    return {
        setState: setState,
        setError: setError ? setError : props.setError,
        fetching: props.startFetching,
        formatData: formatData,
        minStored: minStored,
        method: method,
        params: params,
        next: next ? next : (data) => {},
    };
};

export const fetchData = (url, config) => {
    url = setUpURL(url, config);
    let cacheData = localStorage.getItem(url);
    if (
        cacheData &&
        config.method === 'GET' &&
        config.minStored > 0
    ) {
        let data = JSON.parse(cacheData);
        if (timeDiffMinutes(data.date) > config.minStored) {
            localStorage.removeItem(url);
            fetchData(url, config);
        } else {
            let formattedData = data.data;
            twoStep(
                (resolve) =>
                    config.setState(formattedData, resolve),
                () => config.next(formattedData),
                config.setError
            );
        }
    } else {
        let error = false;
        fetch(url, fetchInterface(config))
            .then((res) => {
                if (res.status != 200) {
                    if (res.status == 404) {
                        error = true;
                        return res.json();
                    }
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                if (!error) {
                    data = config.formatData(data);
                    if (
                        config.method === 'GET' &&
                        config.minStored > 0
                    ) {
                        localStorage.setItem(
                            url,
                            JSON.stringify({
                                date: Date.now(),
                                data: data,
                            })
                        );
                    }
                    twoStep(
                        (resolve) =>
                            config.setState(data, resolve),
                        () => config.next(data),
                        config.setError
                    );
                } else {
                    config.setError(data.message);
                }
            })
            .catch((error) => {
                config.setError(error.message);
            });
    }
};

const twoStep = (action1, action2, setError) => {
    new Promise((resolve, reject) => {
        try {
            action1(resolve);
        } catch (e) {
            reject(e);
        }
    })
        .then(() => action2())
        .catch((error) => setError(error.message));
};

const setUpURL = (url, config) => {
    if (
        config.method == 'GET' &&
        Object.keys(config.params).length > 0
    ) {
        url += `?${paramsToQueryString(config.params)}`;
    }
    return url;
};

const fetchInterface = (config) => {
    let data = {
        method: config.method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
    };
    if (config.method != 'GET') {
        data['body'] = JSON.stringify(config.params);
    }
    return data;
};

export const paramsToQueryString = (params) => {
    return Object.keys(params)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    params[key]
                )}`
        )
        .join('&');
};

const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
export const timeDiffMinutes = (date) => {
    let diffMs = new Date() - date;
    return Math.round(((diffMs % oneDay) % oneHour) / oneMinute);
};
