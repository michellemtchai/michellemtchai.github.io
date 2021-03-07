import './index.css';
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';

import { withRouter } from "react-router";
import { routes } from '../../config/routes';

class Template extends React.Component {
	render() {
        let route = routes[this.props.match.path];
        let title = route ? route.title: 'No Title';
        let data = this.props.state.data;
		return (
            <div>
                <Header />
                <div className='content'>
                    <NavBar route={this.props.match.path}
                        {...this.props}/>
                    <h2>{title}</h2>
                    {this.props.children}
                </div>
            </div>
        );
  	}
}

export default withRouter(Template);
