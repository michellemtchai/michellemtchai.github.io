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
                type="projects"
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
    let results = props.results;
    if (results) {
        return results;
    } else {
        let pages = Math.ceil(
            props.data.total / props.data.limit
        );
        let stacks = props.data.stacks;
        let selected = stacks.map((i) => i.value);
        return {
            sortBy: 'name',
            sortDir: 'ascending',
            pages: pages,
            total: props.data.total,
            stacks: stacks,
            filtered: {
                stacks: selected,
                defStacks: selected,
            },
        };
    }
};
