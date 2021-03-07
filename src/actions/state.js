export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';

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

export const map = (dispatch) => {
  return {
    setData: (data)=>{
        dispatch(setData(data));
    },
    setError: (data)=>{
        dispatch(setError(data));
    },
  };
};
