import './index.css';
import React from 'react';
import ProjectListItem from './projectListItem';

class ProjectList extends React.Component {
    render() {
        let projects = this.props.state.data.projects;
        let keys = Object.keys(projects);
        return (
            <ul className="projects">
                <li>
                    <b>Total:</b> {keys.length} items
                </li>
                {keys.map((key, i) => (
                    <ProjectListItem
                        key={'project-' + i}
                        {...this.props}
                        project={projects[key]}
                    />
                ))}
            </ul>
        );
    }
}

export default ProjectList;
