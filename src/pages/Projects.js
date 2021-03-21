import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';

class Projects extends React.Component {
    render() {
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
            />
        );
    }
}

export default Projects;
