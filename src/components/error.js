import React from 'react';

class Error extends React.Component {
	render() {
		return this.props.state.error?
			<p className='error'>
                {this.props.state.error}
			</p>:
            '';
  	}
}

export default Error;
