export const SET_PROJECTS = 'SET_PROJECTS';

const setProjects = (data) => {
    return {
        type: SET_PROJECTS,
        data: data,
    };
};

export const map = (dispatch) => {
    return {
        setProjects: (data) => {
            dispatch(setProjects(data));
        },
    };
};
