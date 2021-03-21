import './index.css';
import React from 'react';
import Modal from '../../modal/Modal';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NavBar from '../navbar/NavBar';
import {
    EXPANDED_NAV_WIDTH,
    MINIMIZED_NAV_WIDTH,
} from '../navbar/constants';

class NavContent extends React.Component {
    state = {
        expanded: this.props.navExpanded,
        width: widths(this.props),
    };
    componentDidUpdate(prevProps) {
        if (prevProps.navExpanded !== this.props.navExpanded) {
            this.setState({
                expanded: this.props.navExpanded,
                width: widths(this.props),
            });
        }
    }
    render() {
        return (
            <ul className="main">
                <li style={this.state.width.nav}>
                    {NavModal(this.props, this.state.expanded)}
                </li>
                <li style={this.state.width.content}>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Footer />
                </li>
            </ul>
        );
    }
}

export default NavContent;

const widths = (props) => {
    let width = props.navWidth;
    if (props.navWidth > MINIMIZED_NAV_WIDTH) {
        width = props.navExpanded
            ? props.navWidth
            : MINIMIZED_NAV_WIDTH;
    }
    return {
        nav: {
            width: `${width}px`,
        },
        content: {
            width: `calc(100% - ${width}px)`,
        },
    };
};

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
