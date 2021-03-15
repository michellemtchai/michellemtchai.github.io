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
            type: 'text',
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
