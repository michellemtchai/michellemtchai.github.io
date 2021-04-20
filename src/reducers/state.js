import * as actions from '../actions/state';

export const initialState = {
    error: '',
    fetching: 0,
};

export const state = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_DATA:
            let newState = {
                ...state,
                ...action.data,
                fetching: state.fetching - 1,
                error: '',
            };
            action.resolve(newState);
            return newState;
        case actions.SET_ERROR:
            return {
                ...state,
                error: action.data,
                fetching: state.fetching - 1,
            };
        case actions.START_FETCHING:
            return { ...state, fetching: state.fetching + 1 };
        case actions.END_FETCHING:
            return { ...state, fetching: state.fetching - 1 };
        default:
            return state;
    }
};
