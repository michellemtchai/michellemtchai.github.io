import './index.css';
import React from 'react';
import ProjectListItem from './projectListItem';
import PageButtons from './pageButtons';

class ProjectList extends React.Component {
    render() {
        let page = this.props.page;
        let pages = this.props.pages;
        let projects = pages[page];
        let pagination = (
            <PageButtons
                index={page + 1}
                pages={pages.length}
                baseUrl="/projects/page/"
                {...this.props}
            />
        );
        return (
            <ul className="projects">
                <li>
                    <p>
                        Showing {projects.length} of{' '}
                        {this.props.total} items
                    </p>
                    {pagination}
                </li>
                {projects.map((project, i) => (
                    <ProjectListItem
                        key={'project-' + i}
                        {...this.props}
                        project={project}
                    />
                ))}
                <li>{pagination}</li>
            </ul>
        );
    }
}

export default ProjectList;
