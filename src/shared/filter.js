export const getStacks = (projects) => {
    let stackList = {};
    let stacks = [];
    projects.forEach((project) => {
        project.technologies.forEach((tech) => {
            if (!stackList[tech.name]) {
                stackList[tech.name] = {
                    id: tech.contentful_id,
                    count: 1,
                };
            } else {
                stackList[tech.name].count++;
            }
        });
    });
    Object.keys(stackList)
        .sort()
        .forEach((key) => {
            stacks.push({
                label: `${key} (${stackList[key].count})`,
                value: stackList[key].id,
            });
        });
    return stacks;
};
export const sortDirOptions = [
    {
        label: 'Ascending',
        value: 'ASC',
    },
    {
        label: 'Descending',
        value: 'DESC',
    },
];
export const sortProjects = (projects, sortDir, sortBy) => {
    return projects.sort((a, b) => {
        switch (sortDir) {
            case 'ASC':
                return typeof a[sortBy] === 'string'
                    ? b[sortBy].localeCompare(a[sortBy])
                    : b[sortBy] - a[sortBy];
            case 'DESC':
            default:
                return typeof a[sortBy] === 'string'
                    ? a[sortBy].localeCompare(b[sortBy])
                    : a[sortBy] - b[sortBy];
        }
    });
};

export const filterByStacks = (projects, stacks, initialized) => {
    if (initialized) {
        return projects.filter((project) => {
            const projectStacks = project.technologies.map(
                (i) => i.contentful_id
            );
            return containStack(projectStacks, stacks);
        });
    } else {
        return projects;
    }
};
const containStack = (projectStacks, stacks) => {
    for (let i = 0; i < stacks.length; i++) {
        if (projectStacks.includes(stacks[i])) {
            return true;
        }
    }
    return false;
};
