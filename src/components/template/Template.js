import './index.css';
import React from 'react';
import NavBar from './NavBar';
import Error from './Error';

import { withRouter } from "react-router";
import { routes } from '../../config/routes';

class Template extends React.Component {
	render() {
        let route = routes[this.props.match.path];
        let title = route ? route.title: 'No Title';
        let data = this.props.state.data;
		return (
            <div>
                <NavBar route={this.props.match.path}
                    {...this.props}/>
                <Error {...this.props}/>
                <h1>{title}</h1>
                {this.props.children}
            </div>
        );
  	}
}

export default withRouter(Template);
