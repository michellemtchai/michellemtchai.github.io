import React from 'react';

class Error extends React.Component {
    closeError=()=>{
        this.props.setError('');
    }
	render() {
		return (this.props.state.error?
			<table className='error'>
                <tbody>
                    <tr>
                        <td>
                            {this.props.state.error}
                        </td>
                        <td onClick={this.closeError}>
                            X
                        </td>
                    </tr>
                </tbody>
			</table>:
            ''
        );
  	}
}

export default Error;
