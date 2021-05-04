import React, { lazy } from 'react';
import Spinner from '../pages/Spinner';
import { filterData, updateFilter } from '../shared/results';
import { searchResults } from '../shared/search';
const Items = lazy(() => import('../components/items/Items'));
const ProjectList = lazy(() =>
    import('../components/projects/ProjectList')
);

class Search extends React.Component {
    componentDidMount() {
        if (!this.props.results) {
            this.props.setResults(initialState(this.props));
        }
    }
    render() {
        let results = this.props.results;
        return results ? (
            <Items
                {...this.props}
                name="Project"
                searchterm={results.term}
                list={ProjectList}
                baseUrl={baseUrl(this.props, results)}
                updateFilter={(value) =>
                    updateFilter(this, value)
                }
            />
        ) : (
            <Spinner />
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
        data: results,
        stacks: stacks,
        pages: 1,
        filtered: {
            stacks: stacks,
            defStacks: stacks,
        },
    };
    return search ? search : defaultState;
};

const baseUrl = (props, state) =>
    `${props.range}/search/${state.term}/page`;
