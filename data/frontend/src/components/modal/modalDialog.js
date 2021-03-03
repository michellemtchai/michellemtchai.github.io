import './index.css';
import React from 'react';

class ModalDialog extends React.Component {
	render() {
		return (
            <div className='modal-content'>
                <ModalHeader {...this.props}
                    close={this.closeModal}/>
                <ModalBody {...this.props}/>
                <ModalFooter {...this.props}/>
            </div>
        );
  	}
}

export default ModalDialog;
