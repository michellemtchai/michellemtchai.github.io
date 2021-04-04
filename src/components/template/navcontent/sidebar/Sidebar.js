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
        let minimized =
            width > MINIMIZED_NAV_WIDTH
                ? !this.state.expanded
                : true;
        return (
            <li style={this.state.width}>
                <NavModal {...this.props} show={expanded} />
                {width > 0 ? (
                    <NavBar
                        {...this.props}
                        minimized={minimized}
                    />
                ) : (
                    ''
                )}
            </li>
        );
    }
}

export default Sidebar;
