import { goToPage } from './router';

export const filterData = (data, state) => {
    let sortKey = state.sortBy;
    let modData = [];
    data.forEach((entry) => {
        if (containsStacks(entry, state)) {
            modData.push(entry);
        }
    });
    if (state.sortDir === 'ascending') {
        return modData.sort((a, b) => {
            if (sortKey === 'name') {
                return a[sortKey].localeCompare(b[sortKey]);
            } else {
                return a[sortKey] - b[sortKey];
            }
        });
    } else {
        return modData.sort((a, b) => {
            if (sortKey === 'name') {
                return b[sortKey].localeCompare(a[sortKey]);
            } else {
                return b[sortKey] - a[sortKey];
            }
        });
    }
};
const containsStacks = (entry, state) => {
    let required = state.filtered.stacks;
    let stacks = entry.technologies.map((i) => i._id);
    for (let i = 0; i < required.length; i++) {
        if (stacks.includes(required[i])) {
            return true;
        }
    }
    return false;
};
export const updateFilter = (component, value) => {
    // let results = filterData(value.results, value);
    let state = value;
    let range = component.props.range;
    let term = state.term;
    let url =
        term === undefined ? range : `${range}/search/${term}`;
    component.props.setResults(state);
    goToPage(url);
};

export const resetResults = (props) => {
    props.setResults(null);
};
