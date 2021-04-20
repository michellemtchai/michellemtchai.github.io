import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { formatPages } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';

class Projects extends React.Component {
    state = initialState(this.props);
    render() {
        let pages = formatPages(this.state.filtered.results);
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                pages={pages}
                total={this.state.results.length}
                filter={this.state}
                updateFilter={(value) =>
                    updateFilter(this, value)
                }
            />
        );
    }
}

export default Projects;

const initialState = (props) => {
    let search = props.search;
    let data = props.projects[props.keyName].data;
    let defaultState = {
        sortBy: 'name',
        sortDir: 'ascending',
        results: data,
        filtered: {
            results: data,
        },
    };
    return search ? search : defaultState;
};
