import React from 'react';
import { api } from '../config/api';

class ProjectCreator extends React.Component {
    input = React.createRef();
    createProject = ()=>{
        api.createProject(this.props, {
            name: this.input.current.value,
        })
    }
	render() {
		return (
            <div>
                <input ref={this.input} type='text'/>
                <button onClick={this.createProject}>
                    Create New Project
                </button>
            </div>
        );
  	}
}

export default ProjectCreator;
