import './index.css';
import React from 'react';

class ModalFooter extends React.Component {
	render() {
		return (this.props.footer?
            <div className='modal-footer'
                style={this.props.body? {}: {border: 'none'}}>
                {this.props.footer}
            </div>:
            ''
        );
  	}
}

export default ModalFooter;
