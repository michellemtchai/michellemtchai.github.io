import './index.css';
import React from 'react';
import { api } from '../../config/api';
import { goToPage } from '../../shared/router';
import Image from '../image/image';
import Demo from './demo';
import TabLink from './tabLink';
import Button from '../form/button';

class ProjectInfo extends React.Component {
    editProject = () => {
        goToPage(`/projects/${this.props.project._id}/edit`);
    };
    deleteProject = () => {
        let text = 'Are you sure you want to delete this project?';
        if (confirm(text)) {
            api.removeProjectById(
                this.props,
                this.props.project._id,
                (err) => {
                    if (!err) {
                        goToPage('/');
                    }
                }
            );
        }
    };
    render() {
        let project = this.props.project;
        return (
            <section className="project-info">
                <Image src={project.image_url} alt={project.name} />
                <h2>
                    {project.name}
                    <Demo url={project.demo_url} />
                </h2>
                <Button
                    text="Edit Project"
                    click={this.editProject}
                />
                <Button
                    text="Delete Project"
                    click={this.deleteProject}
                    type="danger"
                />
                <p>
                    <b>Summary: </b>
                    {project.summary}
                </p>
                <ul>
                    <li>
                        <b>Source: </b>
                        <TabLink link={project.source_url} />
                    </li>
                    {project.demo_url ? (
                        <li>
                            <b>Demo: </b>
                            <TabLink link={project.demo_url} />
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            </section>
        );
    }
}

export default ProjectInfo;
