import { fetchAPIData } from '../shared/network';
import { updateDataFile, db } from './data';

export const getAllCategories = (
    props,
    next = null,
    updateData = true
) => {
    db.getAll(
        props,
        '/categories',
        'categories',
        next,
        updateData
    );
};

export const createCategory = (
    props,
    params,
    next = null,
    updateData = true
) => {
    db.create(
        props,
        params,
        '/categories',
        getAllCategories,
        next,
        updateData
    );
};

export const updateCategory = (
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
        '/categories',
        getAllCategories,
        next,
        updateData
    );
};

export const removeCategoryById = (
    props,
    id,
    next = null,
    updateData = true
) => {
    db.remove(
        props,
        id,
        '/categories',
        getAllCategories,
        next,
        updateData
    );
};
