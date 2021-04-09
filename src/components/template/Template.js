import './index.css';
import React from 'react';
import Head from './helmet/Head';
import Header from './header/Header';
import NavContent from './navcontent/NavContent';

import { withRouter } from 'react-router';
import { routeKey } from '../../config';
import {
    EXPANDED_NAV_WIDTH,
    MINIMIZED_NAV_WIDTH,
} from './navbar/constants';

class Template extends React.Component {
    state = {
        navWidth: navWidth(window.innerWidth),
        navExpanded:
            navWidth(window.innerWidth) === EXPANDED_NAV_WIDTH,
        showNavModal: false,
    };
    updateNav = () => {
        let width = this.state.navWidth;
        this.setState({
            ...this.state,
            navExpanded: !this.state.navExpanded,
            showNavModal:
                width <= MINIMIZED_NAV_WIDTH
                    ? !this.state.showNavModal
                    : false,
        });
    };
    updateDimensions = () => {
        let width = navWidth(window.innerWidth);
        this.setState({
            navWidth: width,
            navExpanded: width === EXPANDED_NAV_WIDTH,
            showNavModal:
                width <= MINIMIZED_NAV_WIDTH
                    ? this.state.showNavModal
                    : false,
        });
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener(
            'resize',
            this.updateDimensions
        );
    }
    render() {
        let location = this.props.match.path;
        let route = this.props.routes[location];
        return route ? (
            <>
                <Head {...route} />
                <Header updateNav={this.updateNav} />
                <NavContent
                    {...this.props}
                    title={route.title}
                    navWidth={this.state.navWidth}
                    navExpanded={this.state.navExpanded}
                    showNavModal={this.state.showNavModal}
                    updateNav={this.updateNav}
                />
            </>
        ) : (
            ''
        );
    }
}

export default withRouter(Template);

const navWidth = (screenWidth) => {
    if (screenWidth > 1320) {
        return EXPANDED_NAV_WIDTH;
    } else if (screenWidth > 800) {
        return MINIMIZED_NAV_WIDTH;
    } else {
        return 0;
    }
};
