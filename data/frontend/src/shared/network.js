export const baseUrl =
	process.env.REACT_APP_ENV == 'development'
		? `http://localhost:${process.env.REACT_APP_PORT}`
		: '';

export const fetchConfig = (
	props,
	setStateFn,
	{
		method = 'GET',
		params = {},
		formatData = (data) => data,
		next = null,
	} = {}
) => {
	return {
		setState: setStateFn,
		setError: (error) => props.setError(error, true),
		fetching: props.startFetching,
		formatData: formatData,
		method: method,
		params: params,
		next: next ? next : (err) => {},
	};
};

export const fetchAPIData = (
	props,
	url,
	setStateFn,
	{ method, params, formatData, next } = {}
) => {
	fetchData(
		baseUrl + url,
		fetchConfig(props, setStateFn, {
			method: method,
			params: params,
			formatData: formatData,
			next: next,
		})
	);
};

export const fetchData = (url, config) => {
	url = setUpURL(url, config);
	config.fetching();
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
					() => config.next(data),
					() => config.setState(data),
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
			action1();
			resolve(null);
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
