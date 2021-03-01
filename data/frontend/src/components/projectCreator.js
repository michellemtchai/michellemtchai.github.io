import React, { useState } from 'react';
import { api } from '../config/api';
import Form from './form/Form';
import LongButton from './form/longButton';

class ProjectCreator extends React.Component {
    state = {
        form: {}
    }
    setData = (val)=>{
        this.setState({
            form: val
        })
    }
    createProject = ()=>{
        api.createProject(this.props, this.state.form)
    }
	render() {
		return (
            <div>
                <Form update={this.setData} {...formSchema}/>
                <LongButton {...createButton(this)}/>
            </div>
        );
  	}
}

export default ProjectCreator;

const formSchema = {
    name: 'project',
    data: {
        name: '',
        summary: '',
        description: '',
    },
    properties: [
        {
            type: 'string',
            label: 'Project Name',
            name: 'name',
            placeholder: 'Enter a project name',
        },
        {
            type: 'text',
            label: 'Project Summary',
            name: 'summary',
            placeholder: 'Enter project summary',
        },
        {
            type: 'text',
            label: 'Project Description',
            name: 'description',
            placeholder: 'Enter project description',
        },
    ]
}

const createButton = (self)=>{
    return {
        text: 'Create New Project',
        click: self.createProject
    }
}
