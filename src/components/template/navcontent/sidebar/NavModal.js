import React from 'react';
import Modal from '../../../modal/Modal';
import Header from '../../header/Header';
import NavBar from '../../navbar/NavBar';

class NavModal extends React.Component {
    state = {
        show: this.props.showNavModal,
    };
    componentDidUpdate(prevProps) {
        if (prevProps.showNavModal !== this.props.showNavModal) {
            this.setState({
                show: this.props.showNavModal,
            });
        }
    }
    render() {
        return (
            <Modal
                show={this.state.show}
                updateShow={this.props.updateNav}
            >
                <Header {...this.props} />
                <NavBar {...this.props} minimized={false} />
            </Modal>
        );
    }
}

export default NavModal;
