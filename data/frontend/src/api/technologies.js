import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllTechnologies = (
    props,
    next = null,
    updateData = true
) => {
    db.getAll(
        props,
        '/technologies',
        'technologies',
        next,
        updateData
    );
};

export const createTechnology = (
    props,
    params,
    next = null,
    updateData = true
) => {
    db.create(
        props,
        params,
        '/technologies',
        getAllTechnologies,
        next,
        updateData
    );
};

export const updateTechnology = (
    props,
    id,
    params,
    next = null,
    updateData = true
) => {
    db.update(
        props,
        id,
        params,
        '/technologies',
        getAllTechnologies,
        next,
        updateData
    );
};

export const removeTechnologyById = (
    props,
    id,
    next = null,
    updateData = true
) => {
    db.remove(
        props,
        id,
        '/technologies',
        getAllTechnologies,
        next,
        updateData
    );
};
