import { fetchAPIData } from '../shared/network';
import { fetchAll, fetchComplete } from '../config/api';

let state = {};

export const updateDataFile = (props, data) => {
    state = { ...state, ...data };
    if (fetchComplete(state)) {
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

const formatData = (res, entryName) => {
    let [main, data] = res;
    let formatted = {
        [entryName]: {},
        exported: data[0] ? data[0] : null,
    };
    main.forEach((entry) => {
        formatted[entryName][entry._id] = entry;
    });
    return formatted;
};

export const db = {
    getAll: (props, route, key, next = null) => {
        let updateData = (data) => {
            props.setData(data, true);
            updateDataFile(props, data);
        };
        fetchAPIData(props, route, updateData, {
            formatData: (res) => formatData(res, key),
            next: next,
        });
    },
    create: (props, params, route, getAllData, next = null) => {
        let updateData = (data) => {
            props.endFetching();
            getAllData(props, next);
        };
        fetchAPIData(props, route, updateData, {
            method: 'POST',
            params: {
                data: params,
                exported: props.state.data.exported,
            },
        });
    },
    update: (
        props,
        id,
        params,
        route,
        getAllData,
        next = null
    ) => {
        let updateData = (data) => {
            props.endFetching();
            getAllData(props, next);
        };
        fetchAPIData(props, `${route}/${id}`, updateData, {
            method: 'PUT',
            params: {
                data: params,
                exported: props.state.data.exported,
            },
        });
    },
    remove: (props, id, route, getAllData, next = null) => {
        let updateData = (data) => {
            props.endFetching();
            getAllData(props, next);
        };
        fetchAPIData(props, `${route}/${id}`, updateData, {
            method: 'DELETE',
            params: {
                exported: props.state.data.exported,
            },
        });
    },
};
