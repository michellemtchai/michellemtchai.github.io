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
        } else {
            // let data = this.props.results.data;
            // let projects = this.props.data.projects;
            // if (
            //     JSON.stringify(data) !== JSON.stringify(projects)
            // ) {
            //     this.props.setResults({
            //         ...this.props.results,
            //         data: data,
            //     });
            // }
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
        let projects = props.projects[props.keyName];
        let pages = Math.ceil(projects.length / 10);
        let stacks = [];
        return {
            sortBy: 'name',
            sortDir: 'ascending',
            pages: pages,
            total: projects.length,
            stacks: stacks,
            filtered: {
                stacks: stacks,
                defStacks: stacks,
            },
        };
    }
};
