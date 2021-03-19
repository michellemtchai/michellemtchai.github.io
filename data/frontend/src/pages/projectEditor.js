import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import Editor from '../components/editor';

class ProjectEditor extends React.Component {
    render() {
        let id = this.props.match.params.project;
        let readonly = ['name'];
        return (
            <Editor
                {...this.props}
                id={id}
                item={this.props.state.data.projects}
                readonly={readonly}
                schema={projectSchema}
                update={api.updateProject}
                page={'/projects/' + id}
            />
        );
    }
}

export default ProjectEditor;
