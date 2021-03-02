export const baseUrl = process.env.DATA_BACKEND_ENV == 'development' ?
	`http://localhost:${process.env.DATA_BACKEND_PORT}`: '';

export const fetchConfig = (props, setStateFn, {
		method = 'GET', params = {},
		formatData = data=>data, minStored = 0,
		next = null,
	}={})=>{
	return {
	    setState: setStateFn,
	    setError: props.setError,
	    fetching: props.startFetching,
	    formatData: formatData,
	    method: method,
	    params: params,
	    minStored: minStored,
	    next: next ? next : (err)=>{},
	};
}

export const fetchAPIData = (props, url, setStateFn, {
        method, params, formatData, minStored, next
    }={})=>{
    fetchData(baseUrl+url, fetchConfig(props, setStateFn, {
    	method: method,
    	params: params,
        formatData: formatData,
        minStored: minStored,
        next: next,
    }));
}

export const fetchData = (url, config)=>{
	url = setUpURL(url, config);
	let storageName = `${config.method} ${url}`;
	const cacheData = localStorage.getItem(storageName);
	if(cacheData){
		let data = JSON.parse(cacheData);
		if(config.minStored == 0||
			timeDiffMinutes(data.date) > config.minStored){
			localStorage.removeItem(storageName);
			fetchData(url, config);
		}
		else{
			config.setState(config.formatData(data.data));
			config.next(false);
		}
	}
	else{
		config.fetching();
		let error = false;
		fetch(url, fetchInterface(config))
		.then(res=>{
			if(res.status != 200){
				if(res.status == 404){
					error = true;
					return res.json();
				}
				throw Error(res.statusText);
			}
			return res.json();
		})
		.then(data=>{
			if(!error){
				localStorage.setItem(storageName, JSON.stringify({
					date: Date.now(),
					data: data,
				}));
				config.setState(config.formatData(data));
				config.next(false);
			}
			else{
				config.setError(data.msg);
				config.next(true);
			}
		})
		.catch(error=>{
			config.setError(error.message);
			config.next(true);
	    });
	}
}

const setUpURL = (url, config)=>{
	if(config.method == 'GET' &&
		Object.keys(config.params).length > 0){
		url +=`?${paramsToQueryString(config.params)}`;
	}
	return url;
}

const fetchInterface = (config)=>{
	let data = {
    	method: config.method,
	    mode: 'cors',
	    cache: 'no-cache',
	    credentials: 'same-origin',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    referrerPolicy: 'no-referrer'
	};
	if(config.method != 'GET'){
		data['body'] = JSON.stringify(config.params);
	}
	return data;
}

export const paramsToQueryString = (params) =>{
	return Object.keys(params)
		.map(key =>
			`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
		)
		.join('&');
}

const oneSecond = 1000;
const oneMinute = 60*oneSecond;
const oneHour = 60*oneMinute;
const oneDay = 24*oneHour;

export const timeDiffMinutes = (date)=>{
	let diffMs = (new Date() - date);
	return Math.round(((diffMs % oneDay) % oneHour) / oneMinute);
}
