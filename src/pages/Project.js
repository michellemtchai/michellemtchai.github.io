import React, { lazy } from 'react';
import Gallery from '../components/project/gallery/Gallery';
import { goToPage } from '../shared/router';
const Image = lazy(() => import('../components/image/Image'));
const Tabs = lazy(() => import('../components/tabs/Tabs'));
const SearchBar = lazy(() =>
    import('../components/searchbar/SearchBar')
);
const ProjectInfo = lazy(() =>
    import('../components/project/projectInfo/ProjectInfo')
);
const Markdown = lazy(() =>
    import('../components/project/markdown/Markdown')
);

class Project extends React.Component {
    render() {
        let project = this.props.data;
        return (
            <article className="page-body">
                <SearchBar
                    {...this.props}
                    keyName="all"
                    range="/all"
                />
                <ProjectInfo project={project} {...this.props} />
                <Tabs tabs={tabData(project)} />
            </article>
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
