import React from 'react';
import Header from './Header';
import NavContent from './NavContent';
import Home from '../../pages/Home';

import { withRouter } from "react-router";
import { routes, routeKey } from '../../config';

class Template extends React.Component {
	render() {
        let location = routeKey(this.props.location.pathname);
        let route = routes[location];
		return (
            <>
                <Header/>
                <NavContent {...this.props}
                    title={route.title}
                    route={location} />
            </>
        );
  	}
}

export default withRouter(Template);
