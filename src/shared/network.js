export const fetchAPIData = (
    props,
    url,
    { method, params, setState, setError, formatData, next } = {}
) => {
    fetchData(
        baseUrl + url,
        fetchConfig(props, {
            method: method,
            params: params,
            setState: setState,
            setError: setError,
            formatData: formatData,
            next: next,
        })
    );
};

const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.REACT_APP_PORT}`
        : process.env.REACT_APP_DATA_LOCATION;

const fetchConfig = (
    props,
    {
        method = 'GET',
        params = {},
        setState = setState,
        setError,
        formatData = (data) => data,
        next = null,
    } = {}
) => {
    return {
        setState: setState,
        setError: setError ? setError : props.setError,
        fetching: props.startFetching,
        formatData: formatData,
        method: method,
        params: params,
        next: next ? next : (data) => {},
    };
};

export const fetchData = (url, config) => {
    url = setUpURL(url, config);
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
                twoStep(
                    (resolve) => config.setState(data, resolve),
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
