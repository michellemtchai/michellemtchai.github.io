import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import LongButton from '../components/form/longButton';
import Project from '../components/project';

class Projects extends React.Component {
    edit = React.createRef();

    editProject = (project) => {
        goToPage(this.props, `/projects/${project._id}/edit`);
    };
    deleteProject = (project) => {
        api.removeProjectById(this.props, project._id);
    };
    render() {
        let projects = this.props.state.data.projects;
        return projects ? (
            <div>
                <LongButton
                    text="+ Project"
                    click={() => goToPage(this.props, '/projects/new')}
                />
                {Object.keys(projects).map((key, i) => (
                    <Project
                        {...projects[key]}
                        key={'project' + i}
                        edit={() => this.editProject(projects[key])}
                        delete={() => this.deleteProject(projects[key])}
                    />
                ))}
            </div>
        ) : (
            ''
        );
    }
}

export default Projects;
