import React from 'react';
import { goToPage } from '../shared/router';
import Image from '../components/image/Image';
import Tabs from '../components/tabs/Tabs';
import ProjectInfo from '../components/project/projectInfo/ProjectInfo';
import Gallery from '../components/project/gallery/Gallery';
import Markdown from '../components/project/markdown/Markdown';
import NotFound from './NotFound';

class Project extends React.Component {
    render() {
        let project = this.props.state.projects[
            this.props.match.params.project
        ];
        return project ? (
            <article className="page-body">
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
                text={project.description}
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
