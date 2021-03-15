import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import { routes } from '../config/routes';
import { goToPage, urlParams } from '../shared/router';
import { formData, clone } from '../shared/form';
import Form from '../components/form/form';
import ActionButtons from '../components/form/actionButtons';

class ProjectEditor extends React.Component {
    schema = this.props.state.data.form
        ? this.props.state.data.form
        : schema(this.props);
    form = React.createRef();
    updateProject = () => {
        let id = this.props.match.params.project;
        let data = formData(this.form);
        this.props.setData({
            form: data,
        });
        api.updateProject(this.props, id, data, (err) => {
            if (!err) {
                goToPage(this.props, '/');
            }
        });
    };
    render() {
        return this.schema.data ? (
            <div>
                <Form ref={this.form} {...this.schema} />
                <ActionButtons
                    cancel={() => goToPage(this.props, '/')}
                    save={this.updateProject}
                />
            </div>
        ) : (
            <p>No Project with id '{this.schema.id}'.</p>
        );
    }
}

export default ProjectEditor;

const schema = (props) => {
    let id = props.match.params.project;
    let schema = {
        ...clone(projectSchema),
        id: id,
        data: props.state.data.projects[id],
    };
    schema.properties.name.readonly = true;
    return schema;
};
