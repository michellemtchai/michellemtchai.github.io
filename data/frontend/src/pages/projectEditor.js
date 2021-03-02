import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import { routes } from '../config/routes';
import { goToPage, urlParams } from '../shared/router';
import { formData } from '../shared/form';
import Form from '../components/form/Form';
import ActionButtons from '../components/form/actionButtons';

class ProjectEditor extends React.Component {
    schema = schema(this.props);
    form = React.createRef();
    updateProject = ()=>{
        let id = this.props.match.params.project;
        let data = formData(this.form);
        api.updateProject(this.props, id, data, (err)=>{
            if(!err){
                goToPage('/');
            }
        })
    }
    render() {
        return (
            this.schema.data ?
            <div>
                <Form ref={this.form} {...this.schema}/>
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
