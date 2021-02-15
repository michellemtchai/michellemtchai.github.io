import * as actions from '../actions/state';

export const initialState = {
	data: {},
	error: '',
	fetching: 0
}

export const state = (state = initialState, action)=>{
	switch (action.type) {
		case actions.SET_DATA:
			return {...state,
				fetching: state.fetching-1,
				data: action.data,
				error: '',
			};
		case actions.SET_ERROR:
			return {...state,
				error: action.data,
				fetching: state.fetching-1,
			};
		case actions.START_FETCHING:
			return {...state,
				fetching: state.fetching+1,
			};
		default:
		  	return state;
	}
}
