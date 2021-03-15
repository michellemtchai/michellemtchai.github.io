import { fetchAPIData } from '../shared/network';
import { updateDataFile, formatData } from './data';

export const getAllProjects = (props, next = null) => {
    let updateData = (data) => {
        props.setData(data);
        updateDataFile(props, data);
    };
    fetchAPIData(props, '/projects', updateData, {
        formatData: (data) => {
            return {
                projects: formatData(data),
            };
        },
        next: next,
    });
};

export const createProject = (props, params, next = null) => {
    let updateData = (data) => {
        console.log('new', data);
        props.endFetching();
        getAllProjects(props, next);
    };
    fetchAPIData(props, '/projects/', updateData, {
        method: 'POST',
        params: params,
    });
};

export const updateProject = (props, id, params, next = null) => {
    let updateData = (data) => {
        console.log('updated', data);
        props.endFetching();
        getAllProjects(props, next);
    };
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
};

export const removeProjectById = (props, id, next = null) => {
    let updateData = (data) => {
        console.log('deleted', data);
        props.endFetching();
        getAllProjects(props, next);
    };
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'DELETE',
    });
};
