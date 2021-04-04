import './index.css';
import React from 'react';
import Footer from '../footer/Footer';
import Sidebar from './sidebar/Sidebar';
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
                <Sidebar
                    {...this.props}
                    width={this.state.width.nav}
                    expanded={this.state.expanded}
                />
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
