import './navcontent.css';
import React from 'react';
import Modal from '../modal/Modal';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

class NavContent extends React.Component {
    state = {
        width: navWidth(this.props),
        showModal: false,
    };
    navStyle = {
        width: this.state.width,
    };
    contentStyle = {
        width: `calc(100% - ${this.state.width}px)`,
    };
    updateShow = (value) => {
        this.setState({
            ...this.state,
            showModal: value,
        });
    };
    render() {
        return (
            <ul className="main">
                <li style={this.navStyle}>
                    {this.state.width > 0 ? (
                        <NavBar
                            {...this.props}
                            minimized={this.state.width < 250}
                        />
                    ) : (
                        <Modal
                            show={this.state.showModal}
                            updateShow={this.updateShow}
                        >
                            <Header />
                            <NavBar {...this.props} minimized={false} />
                        </Modal>
                    )}
                </li>
                <li style={this.contentStyle}>
                    <div className="content">
                        <h2>{this.props.title}</h2>
                        {this.props.children}
                    </div>
                    <Footer />
                </li>
            </ul>
        );
    }
}

export default NavContent;

const navWidth = (props) => {
    let screenWidth = props.width;
    if (screenWidth > 1320) {
        return 250;
    } else if (screenWidth > 800) {
        return 70;
    } else {
        return 0;
    }
};
