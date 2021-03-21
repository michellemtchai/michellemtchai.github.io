import './index.css';
import React from 'react';
import Header from './header/Header';
import NavContent from './navcontent/NavContent';

import { withRouter } from 'react-router';
import { routes, routeKey } from '../../config';

class Template extends React.Component {
    state = {
        navWidth: navWidth(this.props),
        navExpanded: navWidth(this.props) === 250,
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
        return 250;
    } else if (screenWidth > 800) {
        return 70;
    } else {
        return 0;
    }
};
