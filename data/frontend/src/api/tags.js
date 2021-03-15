import { fetchAPIData } from '../shared/network';
import { updateDataFile, formatData } from './data';

export const getAllTags = (props, next = null) => {
    let updateData = (data) => {
        props.setData(data);
        updateDataFile(props, data);
    };
    fetchAPIData(props, '/tags', updateData, {
        formatData: (data) => {
            return {
                tags: formatData(data),
            };
        },
        next: next,
    });
};

export const createTag = (props, params, next = null) => {
    let updateData = (data) => {
        console.log('new', data);
        props.endFetching();
        getAllTags(props, next);
    };
    fetchAPIData(props, '/tags/', updateData, {
        method: 'POST',
        params: params,
    });
};

export const removeTagById = (props, id, next = null) => {
    let updateData = (data) => {
        console.log('deleted', data);
        props.endFetching();
        getAllTags(props, next);
    };
    fetchAPIData(props, `/tags/${id}`, updateData, {
        method: 'DELETE',
    });
};
