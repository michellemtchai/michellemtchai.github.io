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
                type="projects"
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
    let results = props.results;
    if (results) {
        return results;
    } else {
        let pages = Math.ceil(
            props.data.total / props.data.limit
        );
        let stacks = props.data.stacks || [];
        let selected = stacks.map((i) => i.value);
        return {
            sortBy: 'relevance',
            sortDir: 'ascending',
            stacks: stacks,
            total: props.data.total,
            pages: pages,
            filtered: {
                stacks: selected,
                defStacks: selected,
            },
        };
    }
};

const baseUrl = (props, state) =>
    `${props.range}/search/${state.term}/page`;
