import React from 'react';

class ProjectEditor extends React.Component {
	render() {
		return (
            <span>
                <input ref={this.props.edit}
                    defaultValue={this.props.name}
                    type='text'/>
                <button onClick={this.props.update}>
                    Save Changes
                </button>
                <button onClick={this.props.cancel}>
                    Cancel
                </button>
            </span>
        );
  	}
}

export default ProjectEditor;
