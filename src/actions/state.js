export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';
export const START_FETCHING = 'START_FETCHING';

const setData = (data) => {
    return {
        type: SET_DATA,
        data: data
    };
}
const setError = (data) => {
    return {
        type: SET_ERROR,
        data: data
    }
}
const startFetching = () => {
    return {
        type: START_FETCHING,
    }
}

export const map = (dispatch) => {
  return {
    setData: (data)=>{
        dispatch(setData(data));
    },
    setError: (data)=>{
        dispatch(setError(data));
    },
    startFetching: ()=>{
        dispatch(startFetching());
    },
  };
};
