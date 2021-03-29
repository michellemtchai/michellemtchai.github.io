import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllTags = (
    props,
    next = null,
    updateData = true
) => {
    db.getAll(props, '/tags', 'tags', next, updateData);
};

export const createTag = (
    props,
    params,
    next = null,
    updateData = true
) => {
    db.create(
        props,
        params,
        '/tags',
        getAllTags,
        next,
        updateData
    );
};

export const removeTagById = (
    props,
    id,
    next = null,
    updateData = true
) => {
    db.remove(props, id, '/tags', getAllTags, next, updateData);
};
