import { fetchAPIData } from '../shared/network';
import { updateDataFile, formatData } from './data';

export const getAllTechnologies = (props, next = null) => {
    let updateData = (data) => {
        props.setData(data);
        updateDataFile(props, data);
    };
    fetchAPIData(props, '/technologies', updateData, {
        formatData: (data) => {
            return {
                technologies: formatData(data),
            };
        },
        next: next,
    });
};

export const createTechnology = (props, params, next = null) => {
    let updateData = (data) => {
        console.log('new', data);
        props.endFetching();
        getAllTechnologies(props, next);
    };
    fetchAPIData(props, '/technologies/', updateData, {
        method: 'POST',
        params: params,
    });
};

export const updateTechnology = (props, id, params, next = null) => {
    let updateData = (data) => {
        console.log('updated', data);
        props.endFetching();
        getAllTechnologies(props, next);
    };
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
};

export const removeTechnologyById = (props, id, next = null) => {
    let updateData = (data) => {
        console.log('deleted', data);
        props.endFetching();
        getAllTechnologies(props, next);
    };
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'DELETE',
    });
};
