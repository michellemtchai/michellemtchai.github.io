import React, { lazy } from 'react';
import { goToPage } from '../shared/router';
const Image = lazy(() => import('../components/image/Image'));
const Tabs = lazy(() => import('../components/tabs/Tabs'));
const SearchBar = lazy(() =>
    import('../components/searchbar/SearchBar')
);
const ProjectInfo = lazy(() =>
    import('../components/project/projectInfo/ProjectInfo')
);
const Gallery = lazy(() =>
    import('../components/project/gallery/Gallery')
);
const Markdown = lazy(() =>
    import('../components/project/markdown/Markdown')
);
const NotFound = lazy(() => import('./NotFound'));

class Project extends React.Component {
    render() {
        let project = this.props.data;
        return project ? (
            <article className="page-body">
                <SearchBar
                    {...this.props}
                    keyName="all"
                    range="/all"
                />
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
