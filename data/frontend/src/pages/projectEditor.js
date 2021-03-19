import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import { routes } from '../config/routes';
import { goToPage, urlParams } from '../shared/router';
import { formData, clone } from '../shared/form';
import Form from '../components/form/form';
import ActionButtons from '../components/form/actionButtons';
import NotFound from './notFound';

class ProjectEditor extends React.Component {
    schema = this.props.state.data.form
        ? schemaForm(this.props)
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
                goToPage('/projects/' + id, this.props);
            }
        });
    };
    render() {
        return this.schema.data ? (
            <div>
                <Form ref={this.form} {...this.schema} />
                <ActionButtons
                    cancel={() => goToPage('/', this.props)}
                    save={this.updateProject}
                />
            </div>
        ) : (
            <NotFound {...this.props} />
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

const schemaForm = (props) => {
    let id = props.match.params.project;
    let schema = {
        ...clone(projectSchema),
        id: id,
        data: props.state.data.form,
    };
    schema.properties.name.readonly = true;
    return schema;
};
