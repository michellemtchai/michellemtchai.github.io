import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import Image from '../components/image/Image';
import ProjectInfo from '../components/project/info/ProjectInfo';
import Tabs from '../components/tabs/Tabs';
import Gallery from '../components/project/gallery/Gallery';
import Markdown from '../components/markdown/Markdown';
import NotFound from './NotFound';

class Project extends React.Component {
    render() {
        let project = this.props.state.data.projects[
            this.props.match.params.project
        ];
        return project ? (
            <article>
                <ProjectInfo project={project} {...this.props} />
                <Tabs tabs={tabData(project)} />
            </article>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Project;

const tabData = (project) => [
    {
        name: 'Description',
        component: (
            <Markdown
                value={project.description}
                style={{
                    padding: '20px',
                }}
            />
        ),
    },
    {
        name: `Gallery (${project.gallery.length})`,
        component: <Gallery {...project} />,
    },
];
