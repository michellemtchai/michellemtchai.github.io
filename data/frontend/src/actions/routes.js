export const SET_ROUTES = 'SET_ROUTES';

const setRoutes = (data) => {
    return {
        type: SET_ROUTES,
        data: data,
    };
};

export const map = (dispatch) => {
    return {
        setRoutes: (data) => {
            dispatch(setRoutes(data));
        },
    };
};
