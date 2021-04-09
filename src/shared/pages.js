export const setupFormattedProjects = (props) => {
    let categories = props.state.categories;
    let projects = props.state.projects;
    let projectsList = Object.keys(projects).map(
        (i) => projects[i]
    );
    let formattedProjects = {
        all: {
            data: projectsList,
            pages: formatPages(projectsList),
        },
    };
    Object.keys(categories).forEach((key) => {
        let category = categories[key];
        let data = category.projects.map((i) => projects[i]);
        formattedProjects[category._id] = {
            data: data,
            pages: formatPages(data),
        };
    });
    props.setProjects(formattedProjects);
};
const formatPages = (data) => {
    let pages = [],
        index = 0;
    while (index < data.length - 1) {
        pages.push(data.slice(index, index + 10));
        index += 10;
    }
    if (pages.length === 0) {
        pages = [[]];
    }
    return pages;
};
export const getPages = (props, key) => {
    let projects = props.projects[key];
    return [projects.data.length, projects.pages];
};
export const validPage = (pages, page) => {
    return (
        Number.isInteger(page) &&
        page >= 0 &&
        page < pages.length
    );
};
export const getPage = (props) => {
    return props.match.params.page
        ? props.match.params.page - 1
        : 0;
};
