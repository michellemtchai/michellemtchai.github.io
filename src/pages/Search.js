import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { formatPages, getStacks } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';
import { searchResults } from '../shared/search';

class Search extends React.Component {
    state = initialState(this.props);
    render() {
        let pages = this.state.filtered.results;
        let total = this.state.filtered.total;
        return (
            <Items
                {...this.props}
                name="Project"
                searchterm={this.state.term}
                list={ProjectList}
                pages={pages}
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
    let search = props.search;
    let term = decodeURIComponent(props.match.params.term);
    let results = searchResults(props, term);
    let [stacks, selectedStacks] = getStacks(props, results);
    let defaultState = {
        term: term,
        sortBy: 'relevance',
        sortDir: 'ascending',
        results: results,
        stacks: stacks,
        filtered: {
            total: results.length,
            results: formatPages(results),
            stacks: selectedStacks,
            defStacks: selectedStacks,
        },
    };
    return search ? search : defaultState;
};

const baseUrl = (props, state) =>
    `${props.range}/search/${state.term}/page`;
