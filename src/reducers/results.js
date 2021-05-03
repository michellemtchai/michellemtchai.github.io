import * as actions from '../actions/results';

export const initialState = null;

export const results = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_RESULTS:
            return action.data;
        default:
            return state;
    }
};
