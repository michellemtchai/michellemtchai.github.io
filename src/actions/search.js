export const SET_SEARCH = 'SET_SEARCH';

const setSearch = (data) => {
    return {
        type: SET_SEARCH,
        data: data,
    };
};

export const map = (dispatch) => {
    return {
        setSearch: (data) => {
            dispatch(setSearch(data));
        },
    };
};
