export const setupFormattedProjects = (props) => {
    let categories = props.state.categories;
    let projects = props.state.projects;
    let projectsList = Object.keys(projects).map((i) =>
        formatProject(props, projects[i])
    );
    let [stacks, selectedStacks] = getStacks(
        props,
        projectsList
    );
    let formattedProjects = {
        all: {
            data: projectsList,
            pages: formatPages(projectsList),
            stacks: stacks,
            selectedStacks: selectedStacks,
        },
    };
    Object.keys(categories).forEach((key) => {
        let category = categories[key];
        let data = category.projects.map((i) =>
            formatProject(props, projects[i])
        );
        [stacks, selectedStacks] = getStacks(props, data);
        formattedProjects[category._id] = {
            data: data,
            pages: formatPages(data),
            stacks: stacks,
            selectedStacks: selectedStacks,
        };
    });
    props.setProjects(formattedProjects);
};
const formatProject = (props, project) => {
    let technologies = props.state.technologies;
    let tags = props.state.tags;
    return {
        ...project,
        technologies: project.technologies.map(
            (i) => technologies[i]
        ),
        tags: project.tags.map((i) => tags[i]),
    };
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
export const getStacks = (props, data) => {
    let technologies = props.state.technologies;
    let mapping = {};
    let stacks = [];
    let selectedStacks = [];
    data.forEach((entry) => {
        entry.technologies.forEach((stack) => {
            if (!mapping[stack._id]) {
                mapping[stack._id] = 1;
            } else {
                mapping[stack._id] += 1;
            }
        });
    });
    Object.keys(mapping).forEach((key) => {
        stacks.push({
            value: key,
            label: `${technologies[key].name} (${mapping[key]})`,
        });
        selectedStacks.push(key);
    });
    return [stacks, selectedStacks];
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
