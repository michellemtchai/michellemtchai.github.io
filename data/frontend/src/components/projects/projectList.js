import React from 'react';
import ProjectListItem from './ProjectListItem';
import List from '../list/List';

class ProjectList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                baseUrl="/projects/page"
                keyName="project"
                clickable={true}
                component={ProjectListItem}
            />
        );
    }
}

export default ProjectList;
