import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import LongButton from '../components/form/longButton';
import ProjectList from '../components/projects/projectList';

class Projects extends React.Component {
    render() {
        return (
            <div>
                <LongButton
                    text="+ Project"
                    click={() => goToPage(this.props, '/projects/new')}
                />
                <ProjectList {...this.props} />
            </div>
        );
    }
}

export default Projects;
