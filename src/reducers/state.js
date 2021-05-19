import * as actions from '../actions/state';

export const initialState = {
    data: null,
    error: '',
};

export const state = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_DATA:
            let newState = {
                ...state,
                ...action.data,
                error: '',
            };
            action.resolve(newState);
            return newState;
        case actions.SET_ERROR:
            return {
                ...state,
                error: action.data,
            };
        default:
            return state;
    }
};
