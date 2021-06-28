import React from 'react';
import Page from './Page';
import Head from './helmet/Head';
import NavBar from './navbar/NavBar';
import Error from './error/Error';
import FetchIndicator from './fetch/FetchIndicator';

import { withRouter } from 'react-router';
import { fetchComplete } from '../../config/api';

class Template extends React.Component {
    render() {
        let route = this.props.routes[this.props.match.path];
        let title = route ? route.title : 'No Title';
        let data = this.props.state.data;
        return (
            <div className="content">
                <NavBar
                    route={this.props.match.path}
                    {...this.props}
                />
                <Error {...this.props} />
                <FetchIndicator {...this.props} />
                <h1>{title}</h1>
                <Page {...this.props} route={route} />
            </div>
        );
    }
}

export default withRouter(Template);
