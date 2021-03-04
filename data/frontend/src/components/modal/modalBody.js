import './index.css';
import React from 'react';

class ModalBody extends React.Component {
	render() {
		return (this.props.children?
            <div className='modal-body'>
                {this.props.children}
            </div>:
            ''
        );
  	}
}

export default ModalBody;
