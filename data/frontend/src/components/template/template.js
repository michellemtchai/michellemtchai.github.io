import './index.css';
import React from 'react';
import NavBar from './navBar';
import Error from './error';
import FetchIndicator from './fetchIndicator';

import { withRouter } from "react-router";
import { routes } from '../../config/routes';
import { totalFetches } from '../../config/api';

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
                <FetchIndicator {...this.props}/>
                <h1>{title}</h1>
                {Object.keys(data).length >= totalFetches ?
                    this.props.content():
                    ''
                }
            </div>
        );
  	}
}

export default withRouter(Template);
