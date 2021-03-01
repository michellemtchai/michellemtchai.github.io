import React from 'react';

class Project extends React.Component {
	render() {
		return (
            <div>
                <p>Name: {this.props.name}</p>
                <button onClick={this.props.edit}>
                    Edit Item
                </button>
                <button onClick={this.props.delete}>
                    Delete
                </button>
            </div>
        );
  	}
}

export default Project;
