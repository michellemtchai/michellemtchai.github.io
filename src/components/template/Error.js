import React from 'react';

class Error extends React.Component {
    closeError=()=>{
        this.props.setError('');
    }
	render() {
		return (this.props.state.error?
			<tr className='error'>
                <td>
                    {this.props.state.error}
                </td>
                <td onClick={this.closeError}>
                    &times;
                </td>
            </tr>:
            ''
        );
    }
}

export default Error;
