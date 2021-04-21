import './index.css';
import React, { lazy } from 'react';
const Footer = lazy(() => import('../footer/Footer'));
const Sidebar = lazy(() => import('./sidebar/Sidebar'));
import { MINIMIZED_NAV_WIDTH } from '../navbar/constants';

class NavContent extends React.Component {
    state = {
        width: widths(this.props),
    };
    componentDidUpdate(prevProps) {
        if (
            prevProps.navWidth !== this.props.navWidth ||
            prevProps.navExpanded !== this.props.navExpanded
        ) {
            this.setState({
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
