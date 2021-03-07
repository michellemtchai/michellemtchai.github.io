import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../../pages/Home';

import { withRouter } from "react-router";
import { routes, routeKey } from '../../config';

class Template extends React.Component {
	render() {
        let location = routeKey(this.props.location.pathname);
        let route = routes[location];
		return (
            <div>
                <Header/>
                <NavBar route={location}
                    {...this.props}/>
                <div className='content'>
                    <h2>{route.title}</h2>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
  	}
}

export default withRouter(Template);
