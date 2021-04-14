import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { getPages } from '../shared/pages';

class Projects extends React.Component {
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
            />
        );
    }
}

export default Projects;
