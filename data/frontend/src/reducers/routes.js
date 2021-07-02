import * as actions from '../actions/routes';

export const initialState = {};

export const routes = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_ROUTES:
            return action.data;
        default:
            return state;
    }
};
