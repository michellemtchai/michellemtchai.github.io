import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllTags = (props, next = null) => {
    db.getAll(props, '/tags', 'tags', next);
};

export const createTag = (props, params, next = null) => {
    db.create(props, params, '/tags', getAllTags, next);
};

export const removeTagById = (props, id, next = null) => {
    db.remove(props, id, '/tags', getAllTags, next);
};
