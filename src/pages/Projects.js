import React, { lazy } from 'react';
import { formatPages } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';
const Items = lazy(() => import('../components/items/Items'));
const ProjectList = lazy(() =>
    import('../components/projects/ProjectList')
);

class Projects extends React.Component {
    state = initialState(this.props);
    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data) {
            this.setState(initialState(this.props));
        }
    }
    render() {
        let results = this.state.filtered.results;
        let total = this.state.filtered.total;
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                pages={this.state.pages}
                results={results}
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
    let search = props.results;
    let projects = props.projects[props.keyName];
    let data = props.data.projects;
    let pages = Math.ceil(props.data.length / 10);
    let stacks = [];
    let defaultState = {
        sortBy: 'name',
        sortDir: 'ascending',
        results: data,
        pages: pages,
        stacks: stacks,
        filtered: {
            total: projects.length,
            results: data,
            stacks: stacks,
            defStacks: stacks,
        },
    };
    return search ? search : defaultState;
};
