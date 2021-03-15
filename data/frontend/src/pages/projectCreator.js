import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import { goToPage } from '../shared/router';
import { formData } from '../shared/form';
import Form from '../components/form/form';
import ActionButtons from '../components/form/actionButtons';

class ProjectCreator extends React.Component {
    form = React.createRef();
    createProject = () => {
        let data = formData(this.form);
        this.props.setData({
            form: data,
        });
        api.createProject(this.props, data, (err) => {
            if (!err) {
                goToPage(this.props, '/');
            }
        });
    };
    render() {
        let schema = this.props.state.data.form
            ? { ...projectSchema, data: this.props.state.data.form }
            : projectSchema;
        return (
            <div>
                <Form ref={this.form} {...schema} />
                <ActionButtons
                    text="Create New Project"
                    cancel={() => goToPage(this.props, '/')}
                    save={this.createProject}
                />
            </div>
        );
    }
}

export default ProjectCreator;
