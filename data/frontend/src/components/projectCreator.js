import React from 'react';

class ProjectCreator extends React.Component {
	render() {
		return (
            <div>
                <input ref={this.props.input} type='text'/>
                <button onClick={this.props.create}>
                    Create New Project
                </button>
            </div>
        );
  	}
}

export default ProjectCreator;
