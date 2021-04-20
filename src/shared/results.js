import { initialState } from '../reducers/search';
import { formatPages } from './pages';

export const filterData = (data, state) => {
    let sortKey = state.sortBy;
    if (state.sortDir === 'ascending') {
        return data.sort((a, b) => {
            if (sortKey === 'name') {
                return a[sortKey].localeCompare(b[sortKey]);
            } else {
                return a[sortKey] - b[sortKey];
            }
        });
    } else {
        return data.sort((a, b) => {
            if (sortKey === 'name') {
                return b[sortKey].localeCompare(a[sortKey]);
            } else {
                return b[sortKey] - a[sortKey];
            }
        });
    }
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
