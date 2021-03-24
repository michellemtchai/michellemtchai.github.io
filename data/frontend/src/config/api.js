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
    api.getAllCategories,
    api.getAllProjects,
    api.getAllTags,
    api.getAllTechnologies,
];

export const fetchAll = (props) => {
    fetchList.forEach((getData) => getData(props));
};

export const fetchComplete = (state) => {
    let totalFetches = fetchList.length + 1;
    if (Object.keys(state).length === totalFetches) {
        let keys = Object.keys(state.categories);
        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let category = state.categories[keys[i]];
                if (category.projects.length > 0) {
                    return (
                        Object.keys(state.projects).length > 0
                    );
                }
            }
            return true;
        } else {
            return true;
        }
    } else {
        return false;
    }
};
