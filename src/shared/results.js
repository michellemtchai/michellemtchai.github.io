import { goToPage } from './router';

export const updateFilter = (component, value) => {
    let range = component.props.range;
    component.props.setResults(value);
    let url = !value.term
        ? range
        : `${range}/search/${value.term}`;
    goToPage(url);
};

export const resetResults = (props) => {
    props.setResults(null);
};
