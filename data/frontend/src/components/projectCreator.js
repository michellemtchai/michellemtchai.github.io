import React from 'react';
import { api } from '../config/api';
import { formData } from '../shared/form';
import TextField from './form/textField';
import TextBox from './form/textBox';
import LongButton from './form/longButton';

class ProjectCreator extends React.Component {
    form = React.createRef();
    createProject = ()=>{
        api.createProject(this.props, formData(this.form))
    }
	render() {
		return (
            <div>
                <form ref={this.form}>
                    <TextField {...nameField}/>
                    <TextBox {...summaryBox}/>
                    <TextBox {...descriptionBox}/>
                </form>
                <LongButton {...createButton(this)}/>
            </div>
        );
  	}
}

export default ProjectCreator;

const nameField = {
    label: 'Project Name',
    id: 'project-name',
    name: 'name',
    placeholder: 'Enter a project name',
}

const summaryBox = {
    label: 'Project Summary',
    id: 'project-summary',
    name: 'summary',
    placeholder: 'Enter project summary',
}

const descriptionBox = {
    label: 'Project Description',
    id: 'project-description',
    name: 'description',
    placeholder: 'Enter project description',
}

const createButton = (self)=>{
    return {
        text: 'Create New Project',
        click: self.createProject
    }
}
