import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllProjects = (
    props,
    next = null,
    updateData = true
) => {
    db.getAll(props, '/projects', 'projects', next, updateData);
};

export const createProject = (
    props,
    params,
    next = null,
    updateData = true
) => {
    db.create(
        props,
        params,
        '/projects',
        getAllProjects,
        next,
        updateData
    );
};

export const updateProject = (
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
        '/projects',
        getAllProjects,
        next,
        updateData
    );
};

export const removeProjectById = (
    props,
    id,
    next = null,
    updateData = true
) => {
    db.remove(
        props,
        id,
        '/projects',
        getAllProjects,
        next,
        updateData
    );
};
