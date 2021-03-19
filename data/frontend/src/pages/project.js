import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import Image from '../components/image/image';
import NotFound from './notFound';

class Project extends React.Component {
    project = this.props.state.data.projects[
        this.props.match.params.project
    ];
    editProject = () => {
        goToPage(`/projects/${this.project._id}/edit`);
    };
    deleteProject = () => {
        let text = 'Are you sure you want to delete this project?';
        if (confirm(text)) {
            api.removeProjectById(
                this.props,
                this.project._id,
                (err) => {
                    if (!err) {
                        goToPage('/');
                    }
                }
            );
        }
    };
    render() {
        let project = this.project;
        return project ? (
            <article>
                <section>
                    <Image
                        src={project.image_url}
                        alt={project.name}
                    />
                    <h2>{project.name}</h2>
                    <button onClick={this.editProject}>
                        Edit Project
                    </button>
                    <button onClick={this.deleteProject}>
                        Delete Project
                    </button>
                    <p>{project.summary}</p>
                </section>
                <section>{project.description}</section>
            </article>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Project;
