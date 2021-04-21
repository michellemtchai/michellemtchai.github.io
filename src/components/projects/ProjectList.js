import './index.css';
import React, { lazy } from 'react';
const ProjectListItem = lazy(() => import('./ProjectListItem'));
const List = lazy(() => import('../list/List'));

class ProjectList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                keyName="project"
                clickable={true}
                component={ProjectListItem}
            />
        );
    }
}

export default ProjectList;
