import * as actions from '../actions/projects';

export const initialState = {
	data: {},
	selected: null,
}

export const projects = (state = initialState, action)=>{
	switch (action.type) {
		case actions.SET_DATA:
			return {...state,
				data: action.data
			};
		case actions.SET_SELECTED:
			return {...state,
				selected: action.data
			};
		default:
		  	return state;
	}
}
