export const SET_RESULTS = 'SET_RESULTS';

const setResults = (data) => {
    return {
        type: SET_RESULTS,
        data: data,
    };
};

export const map = (dispatch) => {
    return {
        setResults: (data) => {
            dispatch(setResults(data));
        },
    };
};
