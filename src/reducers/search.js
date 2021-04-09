import * as actions from '../actions/search';

export const initialState = {
    term: null,
    sort: 0,
    sortAscending: true,
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
