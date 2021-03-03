import './index.css';
import React from 'react';
import ModalHeader from './modalHeader';
import ModalBody from './modalBody';
import ModalFooter from './modalFooter';

class Modal extends React.Component {
    state={
        open: this.props.open,
    }
    openModal=()=>{
        this.setState({
            open: true,
        })
    }
    closeModal=()=>{
        this.setState({
            open: false,
        })
    }
	render() {
		return (this.state.open?
			<div className='modal-mask'>
                <div className='modal-background'
                    onClick={this.closeModal}>
                </div>
                <div className='modal-content'>
                    <ModalHeader {...this.props}
                        close={this.closeModal}/>
                    <ModalBody {...this.props}/>
                    <ModalFooter {...this.props}/>
                </div>
            </div>:
            ''
        );
  	}
}

export default Modal;
