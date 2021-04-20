import * as actions from '../actions/projects';

export const initialState = null;

export const projects = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PROJECTS:
            return action.data;
        default:
            return state;
    }
};
