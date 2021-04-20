import * as actions from '../actions/search';

export const initialState = null;

export const search = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SEARCH:
            return action.data;
        default:
            return state;
    }
};
