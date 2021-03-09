import './navcontent.css';
import React from 'react';
import Modal from '../modal/Modal';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

class NavContent extends React.Component {
    navStyle = {
        width: this.props.navWidth,
    };
    contentStyle = {
        width: `calc(100% - ${this.props.navWidth}px)`,
    };
    render() {
        return (
            <ul className="main">
                <li style={this.navStyle}>
                    {this.props.navWidth > 0 ? (
                        <NavBar
                            {...this.props}
                            minimized={this.props.navWidth < 250}
                        />
                    ) : (
                        <Modal
                            show={this.props.navExpanded}
                            updateShow={this.props.updateNav}
                        >
                            <Header {...this.props} />
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
