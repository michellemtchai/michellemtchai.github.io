import './index.css';
import React from 'react';
import Head from './helmet/Head';
import Header from './header/Header';
import NavContent from './navcontent/NavContent';

import { withRouter } from 'react-router';
import { routes, routeKey } from '../../config';
import {
    EXPANDED_NAV_WIDTH,
    MINIMIZED_NAV_WIDTH,
} from './navbar/constants';

class Template extends React.Component {
    state = {
        navWidth: navWidth(this.props),
        navExpanded: navWidth(this.props) === EXPANDED_NAV_WIDTH,
    };
    updateNav = () => {
        this.setState({
            ...this.state,
            navExpanded: !this.state.navExpanded,
        });
    };
    render() {
        let location = routeKey(
            this.props,
            this.props.location.pathname
        );
        let route = routes(this.props)[location];
        return route ? (
            <>
                <Head {...route} />
                <Header updateNav={this.updateNav} />
                <NavContent
                    {...this.props}
                    title={route.title}
                    route={location}
                    navWidth={this.state.navWidth}
                    navExpanded={this.state.navExpanded}
                    updateNav={this.updateNav}
                />
            </>
        ) : (
            ''
        );
    }
}

export default withRouter(Template);

const navWidth = (props) => {
    let screenWidth = props.width;
    if (screenWidth > 1320) {
        return EXPANDED_NAV_WIDTH;
    } else if (screenWidth > 800) {
        return MINIMIZED_NAV_WIDTH;
    } else {
        return 0;
    }
};
