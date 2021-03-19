export const projectSchema = {
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
        description: {
            type: 'markdown',
            label: 'Project Description',
            placeholder: 'Enter project description',
        },
        demo_url: {
            type: 'string',
            label: 'Project Demo URL',
            placeholder: 'Enter project demo URL',
        },
    },
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
export const categorySchema = {
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
    },
};
