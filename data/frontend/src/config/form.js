export const projectSchema = {
    name: 'project',
    data: {
        name: '',
        source_url: '',
        image_url: '',
        summary: '',
        description: '',
        demo_url: '',
    },
    properties: [
        {
            type: 'string',
            label: 'Project Name',
            name: 'name',
            placeholder: 'Enter a project name',
        },
        {
            type: 'string',
            label: 'Project Source URL',
            name: 'source_url',
            placeholder: 'Enter project source URL',
        },
        {
            type: 'image',
            label: 'Project Image URL',
            name: 'image_url',
        },
        {
            type: 'text',
            label: 'Project Summary',
            name: 'summary',
            placeholder: 'Enter project summary',
        },
        {
            type: 'text',
            label: 'Project Description',
            name: 'description',
            placeholder: 'Enter project description',
        },
        {
            type: 'string',
            label: 'Project Demo URL',
            name: 'demo_url',
            placeholder: 'Enter project demo URL',
        },
    ]
}
