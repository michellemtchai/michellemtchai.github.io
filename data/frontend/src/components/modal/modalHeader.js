import './index.css';
import React from 'react';

class ModalHeader extends React.Component {
	render() {
		return (this.props.title?
            <div className='modal-header'
                style={this.props.body? {}: {border: 'none'}}>
                <h5 className='modal-title'>{this.props.title}</h5>
                <span className='close'
                    onClick={this.props.close}
                    title="Close">
                    &times;
                </span>
            </div>:
            ''
        );
  	}
}

export default ModalHeader;
