const stringCompare = (key) => {
    return (a, b) => {
        if (a[key] === b[key]) {
            return 0;
        } else if (a[key] < b[key]) {
            return -1;
        } else {
            return 1;
        }
    };
};

export const projectSchema = (props) => {
    let technologies = props.state.data.technologies;
    let keys = Object.keys(technologies);
    let options = keys
        .map((key) => {
            let technology = technologies[key];
            return {
                label: technology.name,
                value: technology._id,
            };
        })
        .sort(stringCompare('label'));
    let tags = props.state.data.tags;
    let mapping = {};
    Object.keys(tags).forEach((tag) => {
        mapping[tag] = tags[tag].name;
    });
    return {
        name: 'project',
        properties: {
            name: {
                type: 'string',
                label: 'Project Name',
                placeholder: 'Enter a project name',
            },
            source_url: {
                type: 'string',
                label: 'Project Source URL',
                placeholder: 'Enter project source URL',
            },
            demo_url: {
                type: 'string',
                label: 'Project Demo URL',
                placeholder: 'Enter project demo URL',
            },
            image_url: {
                type: 'image',
                label: 'Project Image URL',
                scale: false,
                width: 550,
                height: 300,
                resolution: 1,
            },
            summary: {
                type: 'text',
                label: 'Project Summary',
                placeholder: 'Enter project summary',
            },
            technologies: {
                type: 'checkbox',
                label: 'Project Stack',
                options: options,
                columns: 5,
            },
            tags: {
                type: 'tags',
                label: 'Project Tags',
                placeholder:
                    'Enter project tags (press Enter to add)',
                mapping: mapping,
            },
            description: {
                type: 'markdown',
                label: 'Project Description',
                placeholder: 'Enter project description',
            },
        },
    };
};
export const technologySchema = {
    name: 'technology',
    properties: {
        name: {
            type: 'string',
            label: 'Technology Name',
            placeholder: 'Enter a technology name',
        },
        source_url: {
            type: 'string',
            label: 'Technology Source URL',
            placeholder: 'Enter technology source URL',
        },
        icon_url: {
            type: 'image',
            label: 'Technology Icon URL',
            scale: false,
            width: 192,
            height: 192,
            resolution: 1,
            transparent: true,
        },
    },
};
export const categorySchema = (props) => {
    let projects = props.state.data.projects;
    let keys = Object.keys(projects);
    let options = keys
        .map((key) => {
            let project = projects[key];
            return {
                label: project.name,
                value: project._id,
            };
        })
        .sort(stringCompare('label'));
    return {
        name: 'category',
        properties: {
            name: {
                type: 'string',
                label: 'Category Name',
                placeholder: 'Enter a category name',
            },
            base_url: {
                type: 'string',
                label: 'Category Base URL',
                placeholder: 'Enter a category base URL',
            },
            icon_class: {
                type: 'font-awesome',
                label: 'Category Icon Class',
                placeholder:
                    'Enter a category icon class name (FontAwesome)',
            },
            description: {
                type: 'text',
                label: 'Category Description',
                placeholder: 'Enter category description',
            },
            projects: {
                type: 'checkbox',
                label: 'Category Projects',
                options: options,
            },
        },
    };
};
