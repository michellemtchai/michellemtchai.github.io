import * as actions from '../actions/search';

export const initialState = {
    term: null,
    sortBy: null,
    sortDir: null,
    stacks: [],
};

export const search = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SEARCH:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};
