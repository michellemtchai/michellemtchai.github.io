import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import LongButton from '../components/form/longButton';
import Project from '../components/project';
import ProjectEditor from '../components/projectEditor';

class Projects extends React.Component {
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
    updateProject = (project)=>{
        api.updateProject(this.props, project._id, {
            name: this.edit.current.value,
        });
        this.setState({
            index: -1
        });
    }
    deleteProject = (project)=>{
        api.removeProjectById(this.props, project._id);
    }
	render() {
        let projects = this.props.state.data.projects;
		return (projects ?
			<div>
                <LongButton text='+ Project'
                    click={()=>goToPage('/projects/new')}/>
                {projects.map((project, i)=>
                    this.state.index != i?
                    <Project {...project}
                        index={i}
                        edit={()=>this.editProject(i)}
                        delete={()=>this.deleteProject(project)} />:
                    <ProjectEditor {...project}
                        edit={this.edit}
                        update={()=>this.updateProject(project)}
                        cancel={this.cancelEdit} />
                )}
			</div> :
            ''
        );
  	}
}

export default Projects;
