import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import Creator from '../components/creator';

class ProjectCreator extends React.Component {
    render() {
        return (
            <Creator
                {...this.props}
                type="Project"
                schema={projectSchema(this.props)}
                page="/"
                create={api.createProject}
            />
        );
    }
}

export default ProjectCreator;
