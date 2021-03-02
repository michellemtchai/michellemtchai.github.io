import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import { routes } from '../config/routes';
import { goToPage, urlParams } from '../shared/router';
import Form from '../components/form/Form';
import ActionButtons from '../components/form/actionButtons';

class ProjectEditor extends React.Component {
    schema = schema(this.props);
    state = {
        form: this.schema.data
    }
    setData = (val)=>{
        this.setState({
            form: val
        })
    }
    updateProject = ()=>{
        let id = this.props.match.params.project;
        api.updateProject(this.props, id, this.state.form);
        goToPage('/');
    }
    render() {
        return (
            this.schema.data ?
            <div>
                <Form update={this.setData} {...this.schema}/>
                <ActionButtons
                    cancel={()=>goToPage('/')}
                    save={this.updateProject}/>
            </div>:
            <p>
                No Project with id '{this.schema.id}'.
            </p>
        );
    }
}

export default ProjectEditor;

const schema = (props)=>{
    let schema = projectSchema;
    schema.properties.name.readonly = true;
    let id = props.match.params.project;
    let project = props.state.data.projects[id];
    return {
        ...schema,
        id: id,
        data: project? project: null
    }
}
