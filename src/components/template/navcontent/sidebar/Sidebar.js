import React from 'react';
import NavBar from '../../navbar/NavBar';
import NavModal from './NavModal';
import { MINIMIZED_NAV_WIDTH } from '../../navbar/constants';

class Sidebar extends React.Component {
    state = {
        expanded: this.props.navExpanded,
        width: this.props.width,
    };
    componentDidUpdate(prevProps) {
        if (
            prevProps.width !== this.props.width ||
            prevProps.navExpanded !== this.props.navExpanded
        ) {
            this.setState({
                expanded: this.props.navExpanded,
                width: this.props.width,
            });
        }
    }
    render() {
        let width = this.props.navWidth;
        let expanded =
            width <= MINIMIZED_NAV_WIDTH
                ? this.state.expanded
                : false;
        return (
            <li style={this.state.width}>
                <NavModal {...this.props} show={expanded} />
                {NavSidebar(
                    this.props,
                    width,
                    this.state.expanded
                )}
            </li>
        );
    }
}

export default Sidebar;

const NavSidebar = (props, width, expanded) => {
    switch (width) {
        case 0:
            return '';
        case MINIMIZED_NAV_WIDTH:
            return <NavBar {...props} minimized={true} />;
        default:
            return <NavBar {...props} minimized={!expanded} />;
    }
};
