import qs from 'qs';

export const redirectParam = (props) => {
    return qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    }).redirect;
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
