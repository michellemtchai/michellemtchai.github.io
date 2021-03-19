import React from 'react';
import Items from '../components/items';
import ProjectList from '../components/projects/projectList';

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
