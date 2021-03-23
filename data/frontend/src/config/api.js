import * as data from '../api/data';
import * as categories from '../api/categories';
import * as projects from '../api/projects';
import * as tags from '../api/tags';
import * as technologies from '../api/technologies';

export const api = {
    ...data,
    ...categories,
    ...projects,
    ...tags,
    ...technologies,
};

let fetchList = [
    api.getExported,
    api.getAllCategories,
    api.getAllProjects,
    api.getAllTags,
    api.getAllTechnologies,
];

export const fetchAll = (props) => {
    fetchList.forEach((getData) => getData(props));
};

export const totalFetches = fetchList.length;
