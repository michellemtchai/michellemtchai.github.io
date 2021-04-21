import React, { lazy } from 'react';
const Modal = lazy(() => import('../../../modal/Modal'));
const Header = lazy(() => import('../../header/Header'));
const NavBar = lazy(() => import('../../navbar/NavBar'));

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
