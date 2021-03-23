import { fetchAPIData } from '../shared/network';
import { fetchAll, totalFetches } from '../config/api';
let state = {};

export const getExported = (props) => {
    let updateData = (data) => {
        props.setData(data);
        updateDataFile(props, data);
    };
    fetchAPIData(props, '/data', updateData, {
        formatData: (data) => {
            return data.length > 0
                ? {
                      exported: data[0].updated,
                  }
                : { exported: null };
        },
    });
};

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
