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
            stacks: getStacks(projectsList),
        },
    };
    Object.keys(categories).forEach((key) => {
        let category = categories[key];
        let data = category.projects.map((i) => projects[i]);
        formattedProjects[category._id] = {
            data: data,
            pages: formatPages(data),
            stacks: getStacks(data),
        };
    });
    props.setProjects(formattedProjects);
};
export const formatPages = (data) => {
    let pages = [],
        index = 0;
    while (index < data.length) {
        pages.push(data.slice(index, index + 10));
        index += 10;
    }
    if (pages.length === 0) {
        pages = [[]];
    }
    return pages;
};
const getStacks = (data) => {
    let stacks = {};
    data.forEach((entry) => {
        entry.technologies.forEach((stack) => {
            if (!stacks[stack]) {
                stacks[stack] = 1;
            } else {
                stacks[stack] += 1;
            }
        });
    });
    return stacks;
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
