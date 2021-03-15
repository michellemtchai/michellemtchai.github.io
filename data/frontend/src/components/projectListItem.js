import React from 'react';
import Image from './image/image';
import { goToPage } from '../shared/router';

class ProjectListItem extends React.Component {
    editProject = () => {
        let project = this.props.project;
        goToPage(this.props, `/projects/${project._id}/edit`);
    };
    deleteProject = () => {
        let project = this.props.project;
        api.removeProjectById(this.props, project._id);
    };
    render() {
        let project = this.props.project;
        let alt = `Icon for project -- ${project.name}`;
        return (
            <li onClick={this.editProject}>
                <Image src={project.image_url} alt={alt} />
                <h2>{project.name}</h2>
                <p>{project.summary}</p>
            </li>
        );
    }
}

export default ProjectListItem;
