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
                return b[sortBy] - a[sortBy];
            case 'DESC':
            default:
                return a[sortBy] - b[sortBy];
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
