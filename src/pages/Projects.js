import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { formatPages } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';

class Projects extends React.Component {
    state = initialState(this.props);
    render() {
        let pages = this.state.filtered.results;
        let total = this.state.filtered.total;
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                pages={pages}
                total={total}
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
    let projects = props.projects[props.keyName];
    let data = projects.data;
    let defaultState = {
        sortBy: 'name',
        sortDir: 'ascending',
        results: data,
        stacks: projects.stacks,
        filtered: {
            total: data.length,
            results: formatPages(data),
            stacks: projects.selectedStacks,
            defStacks: projects.selectedStacks,
        },
    };
    return search ? search : defaultState;
};
