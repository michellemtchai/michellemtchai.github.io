export const sortByOptions = (search) => {
    let options = [
        {
            value: 'name',
            label: 'Project Name',
        },
    ];
    if (search) {
        options = [
            {
                value: 'relevance',
                label: 'Relevance',
            },
            ...options,
        ];
    }
    return options;
};

export const sortDirOptions = [
    {
        value: 'ascending',
        label: 'Ascending',
    },
    {
        value: 'descending',
        label: 'Descending',
    },
];
