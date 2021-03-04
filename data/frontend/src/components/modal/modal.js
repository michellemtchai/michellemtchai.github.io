import './index.css';
import React from 'react';

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
    background = ()=>{
        return {
            background: this.props.background ?
                this.props.background:'rgba(0,0,0,0.5)'
        }
    }
	render() {
		return (this.state.show?
			<div className='modal-mask'>
                <div className='modal-background'
                    style={this.background()}
                    onClick={this.closeModal}>
                </div>
                <div className='modal-body-content'>
                    {this.props.children}
                </div>
            </div>:
            ''
        );
  	}
}

export default Modal;
