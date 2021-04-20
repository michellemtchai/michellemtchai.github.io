import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { getPages } from '../shared/pages';

class Projects extends React.Component {
    state = {
        sortBy: this.props.search.sortBy
            ? this.props.search.sortBy
            : 'name',
        sortDir: this.props.search.sortDir
            ? this.props.search.sortDir
            : 'ascending',
    };
    updateFilter = (value) => {
        this.setState(value);
    };
    componentDidMount() {
        if (this.props.search.term) {
            this.props.setSearch({
                term: '',
            });
        }
    }
    render() {
        let [total, pages] = getPages(
            this.props,
            this.props.keyName
        );
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                pages={pages}
                total={total}
                filter={this.state}
                updateFilter={this.updateFilter}
            />
        );
    }
}

export default Projects;
