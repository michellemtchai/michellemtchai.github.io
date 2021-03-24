import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllProjects = (props, next = null) => {
    db.getAll(props, '/projects', 'projects', next);
};

export const createProject = (props, params, next = null) => {
    db.create(props, params, '/projects', getAllProjects, next);
};

export const updateProject = (
    props,
    id,
    params,
    next = null
) => {
    db.update(
        props,
        id,
        params,
        '/projects',
        getAllProjects,
        next
    );
};

export const removeProjectById = (props, id, next = null) => {
    db.remove(props, id, '/projects', getAllProjects, next);
};
