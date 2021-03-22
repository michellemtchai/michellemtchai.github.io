import React from 'react';
import Items from '../components/Items';
import ProjectList from '../components/projects/ProjectList';

class Projects extends React.Component {
    render() {
        return (
            <Items
                {...this.props}
                name="Project"
                keyName="projects"
                list={ProjectList}
            />
        );
    }
}

export default Projects;
