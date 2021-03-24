export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';
export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

const setData = (data, fetching = false) => {
    return {
        type: SET_DATA,
        data: data,
        fetching: fetching,
    };
};
const setError = (data, fetching = false) => {
    return {
        type: SET_ERROR,
        data: data,
        fetching: fetching,
    };
};
const startFetching = () => {
    return {
        type: START_FETCHING,
    };
};
const endFetching = () => {
    return {
        type: END_FETCHING,
    };
};

export const map = (dispatch) => {
    return {
        setData: (data, fetching = false) => {
            dispatch(setData(data, fetching));
        },
        setError: (data, fetching = false) => {
            dispatch(setError(data, fetching));
        },
        startFetching: () => {
            dispatch(startFetching());
        },
        endFetching: () => {
            dispatch(endFetching());
        },
    };
};
