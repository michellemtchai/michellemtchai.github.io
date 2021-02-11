export const SET_DATA = 'SET_DATA';
export const SET_SELECTED = 'SET_SELECTED';

const setData = (data) => {
    return {
        type: SET_DATA,
        data: data
    };
}
const setSelected = (data) => {
    return {
        type: SET_SELECTED,
        data: data
    };
}

export const map = (dispatch) => {
  return {
    setData: (data)=>{
        dispatch(setData(data));
    },
    setSelected: (data)=>{
        dispatch(setSelected(data));
    },
  };
};
