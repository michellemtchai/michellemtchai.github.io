import React from 'react';
import ProjectListItem from './ProjectListItem';
import List from '../list/List';

class ProjectList extends React.Component {
    render() {
        let pages = this.props.state.projects;
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
