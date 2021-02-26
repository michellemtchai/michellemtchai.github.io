import React from 'react';
import { api } from '../config/api';

class Projects extends React.Component {
    input = React.createRef();
    edit = React.createRef();
    state = {
        index: -1
    }

    editProject = (index)=>{
        this.setState({
            index: index,
        })
    }
    cancelEdit = ()=>{
        this.setState({
            index: -1,
        })
    }
    createProject = ()=>{
        api.createProject(this.props, {
            name: this.input.current.value,
        })
    }
    updateProject = (item)=>{
        api.updateProject(this.props, item._id, {
            name: this.edit.current.value,
        });
        this.setState({
            index: -1
        });
    }
    deleteProject = (item)=>{
        api.removeProjectById(this.props, item._id);
    }
	render() {
        let projects = this.props.state.data.projects;
		return (projects ?
			<div>
                <h1>Projects</h1>
                {projects.map((project, i)=>
                    this.state.index != i?
                    Project(this, project, i):
                    ProjectEditor(this, project)
                )}
                {ProjectCreator(this)}
			</div> :
            ''
        );
  	}
}

const Project = (self, project, i)=>(
    <div>
        <p>Name: {project.name}</p>
        <button onClick={()=>self.editProject(i)}>
            Edit Item
        </button>
        {DeleteButton(self, project)}
    </div>
);

const ProjectCreator = (self)=>(
    <div>
        <input ref={self.input} type='text'/>
        <button onClick={self.createProject}>
            Create New Project
        </button>
    </div>
);

const ProjectEditor = (self, project)=>(
    <span>
        <input ref={self.edit}
            defaultValue={project.name}
            type='text'/>
        <button onClick={()=>self.updateProject(project)}>
            Save Changes
        </button>
        <button onClick={self.cancelEdit}>
            Cancel
        </button>
    </span>
);

const DeleteButton = (self, item)=>(
    <button onClick={()=>self.deleteProject(item)}>
        Delete
    </button>
);

export default Projects;
