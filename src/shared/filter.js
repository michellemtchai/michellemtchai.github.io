export const getStacks = (projects) => {
    let stackList = {};
    let stacks = [];
    projects.forEach((project) => {
        project.technologies.forEach((tech) => {
            if (!stackList[tech.name]) {
                stackList[tech.name] = tech.contentful_id;
            }
        });
    });
    Object.keys(stackList)
        .sort()
        .forEach((key) => {
            stacks.push({
                label: key,
                value: stackList[key],
            });
        });
    return stacks;
};
export const sortDir = (search = false) => ({
    value: search ? 'DESC' : 'ASC',
    options: [
        {
            label: 'Ascending',
            value: 'ASC',
        },
        {
            label: 'Descending',
            value: 'DESC',
        },
    ],
});
