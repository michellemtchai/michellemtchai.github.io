export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';

const setData = (data, resolve = () => {}) => {
    return {
        type: SET_DATA,
        data: data,
        resolve: resolve,
    };
};
const setError = (data) => {
    return {
        type: SET_ERROR,
        data: data,
    };
};

export const map = (dispatch) => {
    return {
        setData: (data, resolve) => {
            dispatch(setData(data, resolve));
        },
        setError: (data) => {
            dispatch(setError(data));
        },
    };
};
