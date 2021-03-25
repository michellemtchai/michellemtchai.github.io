import { goToPage } from './router';

export const getPages = (props, key) => {
    let list = props.state.data[key];
    let keys = Object.keys(list);
    let pages = [],
        index = -1;
    keys.forEach((key, i) => {
        if (i % 10 === 0) {
            index++;
            pages[index] = [];
        }
        pages[index].push(list[key]);
    });
    if (pages.length === 0) {
        pages = [[]];
    }
    return [keys.length, pages];
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
export const editItem = (props, urlBase, type) => {
    goToPage(`${urlBase}/${props[type]._id}/edit`);
};
export const deleteItem = (props, type, removeFn, page) => {
    let text = `Are you sure you want to delete this ${type}?`;
    if (confirm(text)) {
        removeFn(props, props[type]._id, (err) => {
            if (!err) {
                goToPage(page);
            }
        });
    }
};
