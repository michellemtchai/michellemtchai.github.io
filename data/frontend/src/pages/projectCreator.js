import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/form';
import { goToPage } from '../shared/router';
import Form from '../components/form/Form';
import ActionButtons from '../components/form/actionButtons';

class ProjectCreator extends React.Component {
    state = {
        form: projectSchema.data
    }
    setData = (val)=>{
        this.setState({
            form: val
        })
    }
    createProject = ()=>{
        api.createProject(this.props, this.state.form)
        goToPage('/');
    }
	render() {
		return (
            <div>
                <Form update={this.setData} {...projectSchema}/>
                <ActionButtons
                    text='Create New Project'
                    cancel={()=>goToPage('/')}
                    save={this.createProject}/>
            </div>
        );
  	}
}

export default ProjectCreator;
