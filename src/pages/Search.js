import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { formatPages } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';

class Search extends React.Component {
    state = initialState(this.props);
    render() {
        let pages = this.state.filtered.results;
        let total = this.state.results.length;
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
    let defaultState = {
        term: term,
        sortBy: 'relevance',
        sortDir: 'ascending',
        results: results,
        filtered: {
            results: formatPages(results),
        },
    };
    return search ? search : defaultState;
};

const baseUrl = (props, state) =>
    `${props.range}/search/${state.term}/page`;

const searchResults = (props, term) => {
    let projects = props.projects[props.keyName].data;
    let data = [];
    if (term) {
        let terms = term.split(/\s+/g);
        let regex = new RegExp(term.replace(/\s+/g, '|'), 'gi');
        projects.forEach((project) => {
            let match = project.name.match(regex);
            if (containAllTerms(match, terms)) {
                data.push(project);
            }
        });
    }
    return data;
};

const containAllTerms = (match, terms) => {
    let mapping = {};
    if (match) {
        match.forEach((entry) => {
            if (!mapping[entry]) {
                mapping[entry] = 1;
            } else {
                mapping[entry]++;
            }
        });
        return Object.keys(mapping).length === terms.length;
    }
    return false;
};
