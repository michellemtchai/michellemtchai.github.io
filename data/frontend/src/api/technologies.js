import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllTechnologies = (props, next = null) => {
    db.getAll(props, '/technologies', 'technologies', next);
};

export const createTechnology = (props, params, next = null) => {
    db.create(
        props,
        params,
        '/technologies',
        getAllTechnologies,
        next
    );
};

export const updateTechnology = (
    props,
    id,
    params,
    next = null
) => {
    db.update(
        props,
        id,
        params,
        '/technologies',
        getAllTechnologies,
        next
    );
};

export const removeTechnologyById = (props, id, next = null) => {
    db.remove(
        props,
        id,
        '/technologies',
        getAllTechnologies,
        next
    );
};
