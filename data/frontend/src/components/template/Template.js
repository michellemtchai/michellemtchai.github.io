import React from 'react';
import Head from './helmet/Head';
import NavBar from './navbar/NavBar';
import Error from './error/Error';
import FetchIndicator from './fetch/FetchIndicator';

import { withRouter } from 'react-router';
import { routes } from '../../config/routes';
import { fetchComplete } from '../../config/api';

class Template extends React.Component {
    render() {
        let route = routes[this.props.match.path];
        let title = route ? route.title : 'No Title';
        let data = this.props.state.data;
        return (
            <div>
                <Head {...route} />
                <NavBar
                    route={this.props.match.path}
                    {...this.props}
                />
                <Error {...this.props} />
                <FetchIndicator {...this.props} />
                <h1>{title}</h1>
                {fetchComplete(data) ? this.props.children : ''}
            </div>
        );
    }
}

export default withRouter(Template);
