import React, { lazy } from 'react';
import Spinner from '../pages/Spinner';
import { formatPages } from '../shared/pages';
import { filterData, updateFilter } from '../shared/results';
const Items = lazy(() => import('../components/items/Items'));
const ProjectList = lazy(() =>
    import('../components/projects/ProjectList')
);

class Projects extends React.Component {
    componentDidMount() {
        if (!this.props.results) {
            this.props.setResults(initialState(this.props));
        }
    }
    render() {
        return this.props.results ? (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                updateFilter={(value) =>
                    updateFilter(this, value)
                }
            />
        ) : (
            <Spinner />
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
        data: data,
        pages: pages,
        stacks: stacks,
        filtered: {
            stacks: stacks,
            defStacks: stacks,
        },
    };
    return search ? search : defaultState;
};
