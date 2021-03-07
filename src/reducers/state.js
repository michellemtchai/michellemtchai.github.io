import * as data from '../config/data.json';
import * as actions from '../actions/state';

export const initialState = {
	data: data.default,
	error: '',
}

export const state = (state = initialState, action)=>{
	switch (action.type) {
		case actions.SET_DATA:
			return {...state,
				data: action.data,
				error: '',
			};
		case actions.SET_ERROR:
			return {...state,
				error: action.data,
			};
		default:
		  	return state;
	}
}
