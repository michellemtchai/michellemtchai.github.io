import { fetchAPIData } from '../shared/network';
import { fetchAll, totalFetches } from '../config/api';
let state = {};

export const updateDataFile = (props, data) => {
    state = { ...state, ...data };
    if (Object.keys(state).length == totalFetches) {
        let next = (data) => {
            props.endFetching();
            if (data.reload) {
                fetchAll(props);
            }
        };
        fetchAPIData(props, '/update-data', next, {
            method: 'PUT',
            params: state,
        });
    }
};

export const formatData = (data) => {
    let mapping = {};
    data.forEach((_, i) => {
        mapping[data[i]._id] = data[i];
    });
    return mapping;
};
