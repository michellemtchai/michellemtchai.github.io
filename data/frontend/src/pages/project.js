import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import Image from '../components/image/image';
import ProjectInfo from '../components/project/projectInfo';
import Markdown from '../components/markdown';
import NotFound from './notFound';

class Project extends React.Component {
    render() {
        let project = this.props.state.data.projects[
            this.props.match.params.project
        ];
        return project ? (
            <article>
                <ProjectInfo project={project} />
                <Markdown text={project.description} />
            </article>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Project;
