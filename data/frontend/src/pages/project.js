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
                </section>
                <section>
                    <h2>
                        {project.name}
                        <Demo url={project.demo_url} />
                    </h2>
                    <button onClick={this.editProject}>
                        Edit Project
                    </button>
                    <button onClick={this.deleteProject}>
                        Delete Project
                    </button>
                    <h3>Summary: </h3>
                    <p>{project.summary}</p>
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
                <section>{project.description}</section>
            </article>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Project;

const TabLink = (props) => {
    return (
        <a href={props.link} target="_blank">
            {props.link}
        </a>
    );
};

const Demo = (props) => {
    return props.url ? <span>Demo</span> : '';
};
