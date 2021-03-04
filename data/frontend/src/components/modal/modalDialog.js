import './index.css';
import React from 'react';
import ModalHeader from './modalHeader';
import ModalBody from './modalBody';
import ModalFooter from './modalFooter';

class ModalDialog extends React.Component {
	render() {
		return (
            <div className='modal-content'>
                <ModalHeader {...this.props}/>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter {...this.props}/>
            </div>
        );
  	}
}

export default ModalDialog;
