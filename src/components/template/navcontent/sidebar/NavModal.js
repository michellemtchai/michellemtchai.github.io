import React from 'react';
import Modal from '../../../modal/Modal';
import Header from '../../header/Header';
import NavBar from '../../navbar/NavBar';

class NavModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                updateShow={this.props.updateNav}
            >
                <Header {...this.props} />
                <NavBar {...this.props} minimized={false} />
            </Modal>
        );
    }
}

export default NavModal;
