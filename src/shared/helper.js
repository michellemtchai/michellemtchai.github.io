export const fetchData = (url, stateFn, errorFn)=>{
	url = encodeURI(url);
	const cacheData = localStorage.getItem(url);
	if(cacheData){
		let data = JSON.parse(cacheData);
		if(timeDiffMinutes(data.date) > 5){
			localStorage.removeItem(url);
			fetchData(url, stateFn, errorFn);
		}
		else{
			stateFn(data.data);
		}
	}
	else{
		fetch(url,{
	    	method: 'GET',
		    mode: 'cors',
		    cache: 'no-cache',
		    credentials: 'same-origin',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    referrerPolicy: 'no-referrer'
		})
		.then(res=>{
			if(res.status != 200){
				throw Error(res.statusText);
			}
			return res.json();
		})
		.then(data=>{
			localStorage.setItem(url, JSON.stringify({
				date: Date.now(),
				data: data,
			}));
			stateFn(data);
			errorFn('');
		})
		.catch(error=>{
	        errorFn(error.toString());
	    });
	}
}
export const timeDiffMinutes = (date)=>{
	let diffMs = (new Date() - date);
	return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}
