import './index.css';
import React from 'react';

class ModalBody extends React.Component {
	render() {
		return (this.props.body?
            <div className='modal-body'>
                {this.props.body}
            </div>:
            ''
        );
  	}
}

export default ModalBody;
