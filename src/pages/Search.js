import React, { lazy } from 'react';
import { filterData, updateFilter } from '../shared/results';
import { searchResults } from '../shared/search';
const Items = lazy(() => import('../components/items/Items'));
const ProjectList = lazy(() =>
    import('../components/projects/ProjectList')
);

class Search extends React.Component {
    state = initialState(this.props);
    render() {
        let results = this.state.filtered.results;
        let total = this.state.filtered.total;
        return (
            <Items
                {...this.props}
                name="Project"
                searchterm={this.state.term}
                list={ProjectList}
                pages={this.state.pages}
                results={results}
                total={total}
                baseUrl={baseUrl(this.props, this.state)}
                filter={this.state}
                updateFilter={(value) =>
                    updateFilter(this, value)
                }
            />
        );
    }
}

export default Search;

const initialState = (props) => {
    let search = props.results;
    let term = decodeURIComponent(props.match.params.term);
    let results = props.data.projects;
    let stacks = [];
    let defaultState = {
        term: term,
        sortBy: 'relevance',
        sortDir: 'ascending',
        results: results,
        stacks: stacks,
        total: results.length,
        filtered: {
            total: results.length,
            results: results,
            stacks: stacks,
            defStacks: stacks,
        },
    };
    return search ? search : defaultState;
};

const baseUrl = (props, state) =>
    `${props.range}/search/${state.term}/page`;
