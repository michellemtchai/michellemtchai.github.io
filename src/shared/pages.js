Number.isInteger =
    Number.isInteger ||
    function (value) {
        return (
            typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value
        );
    };
export const getPages = (props, key) => {
    let projects = props.state.projects;
    let list = props.state.categories[key].projects;
    let pages = [],
        index = -1;
    list.forEach((key, i) => {
        if (i % 10 === 0) {
            index++;
            pages[index] = [];
        }
        pages[index].push(projects[key]);
    });
    if (pages.length === 0) {
        pages = [[]];
    }
    return [list.length, pages];
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
