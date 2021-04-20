import { initialState } from '../reducers/search';
import { formatPages } from './pages';

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
    let stacks = entry.technologies;
    for (let i = 0; i < required.length; i++) {
        if (stacks.includes(required[i])) {
            return true;
        }
    }
    return false;
};
export const updateFilter = (component, value) => {
    component.setState(
        {
            ...value,
        },
        () => {
            component.setState({
                ...component.state,
                filtered: {
                    ...component.state.filtered,
                    results: formatPages(
                        filterData(
                            component.state.results,
                            component.state
                        )
                    ),
                },
            });
        }
    );
};
export const resetResults = (props) => {
    props.setSearch(initialState);
};
