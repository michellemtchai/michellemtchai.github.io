import React, { lazy } from 'react';
import Spinner from '../pages/Spinner';
import { filterData } from '../shared/results';
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
                type="projects"
                list={ProjectList}
                baseUrl={baseUrl(this.props)}
            />
        ) : (
            <Spinner />
        );
    }
}

export default Search;

const initialState = (props) => {
    let results = props.results;
    if (results) {
        return results;
    } else {
        let data = props.state[props.state.data];
        let limit = data.limit || 1;
        let total = data.total || 0;
        let pages = Math.ceil(total / limit);
        let stacks = data.stacks || [];
        let selected = stacks.map((i) => i.value);
        return {
            sortBy: 'relevance',
            sortDir: 'ascending',
            stacks: stacks,
            total: total,
            pages: pages,
            filtered: {
                stacks: selected,
                defStacks: selected,
            },
        };
    }
};

const baseUrl = (props) => {
    let searchTerm = props.match.params.term
        ? decodeURIComponent(props.match.params.term)
        : '';
    return `${props.range}/search/${searchTerm}/page`;
};
