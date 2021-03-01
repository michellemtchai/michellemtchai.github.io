import React from 'react';

class Project extends React.Component {
	render() {
		return (
            <table>
                <tbody>
                    <td>
                        <img src={this.props.image_url}/>
                    </td>
                    <td>
                        <p>Name: {this.props.name}</p>
                        <p>Summary: {this.props.summary}</p>
                    </td>
                    <td>
                        <button onClick={this.props.edit}>
                            Edit Item
                        </button>
                        <button onClick={this.props.delete}>
                            Delete
                        </button>
                    </td>
                </tbody>
            </table>
        );
  	}
}

export default Project;
