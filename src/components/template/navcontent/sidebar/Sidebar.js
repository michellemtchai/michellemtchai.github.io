import React from 'react';
import Modal from '../../../modal/Modal';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import NavBar from '../../navbar/NavBar';
import {
    EXPANDED_NAV_WIDTH,
    MINIMIZED_NAV_WIDTH,
} from '../../navbar/constants';

class Sidebar extends React.Component {
    state = {
        expanded: this.props.expanded,
        width: this.props.width,
    };
    componentDidUpdate(prevProps) {
        if (prevProps.expanded !== this.props.expanded) {
            this.setState({
                expanded: this.props.expanded,
                width: this.props.width,
            });
        }
    }
    render() {
        return (
            <li style={this.state.width}>
                {NavModal(this.props, this.state.expanded)}
            </li>
        );
    }
}

export default Sidebar;

const NavModal = (props, expanded) => {
    switch (props.navWidth) {
        case 0:
            return (
                <Modal
                    show={expanded}
                    updateShow={props.updateNav}
                >
                    <Header {...props} />
                    <NavBar {...props} minimized={false} />
                </Modal>
            );
        case MINIMIZED_NAV_WIDTH:
            return (
                <>
                    <NavBar {...props} minimized={true} />
                    <Modal
                        show={expanded}
                        updateShow={props.updateNav}
                    >
                        <Header {...props} />
                        <NavBar {...props} minimized={false} />
                    </Modal>
                </>
            );
        default:
            return <NavBar {...props} minimized={!expanded} />;
    }
};
