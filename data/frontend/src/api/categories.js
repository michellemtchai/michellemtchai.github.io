import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllCategories = (props, next = null) => {
    db.getAll(props, '/categories', 'categories', next);
};

export const createCategory = (props, params, next = null) => {
    db.create(
        props,
        params,
        '/categories',
        getAllCategories,
        next
    );
};

export const updateCategory = (
    props,
    id,
    params,
    next = null
) => {
    db.update(
        props,
        id,
        params,
        '/categories',
        getAllCategories,
        next
    );
};

export const removeCategoryById = (props, id, next = null) => {
    db.remove(props, id, '/categories', getAllCategories, next);
};
