import * as actions from '../actions/projects';

export const initialState = {};

export const projects = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PROJECTS:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};
