import React from 'react';
import { withRouter } from 'react-router';
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/';
import { fetchAPIData } from '../shared/network';
import { goToPage } from '../shared/router';
import {
    redirectParam,
    setupFormattedProjects,
} from '../shared/pages';

class App extends React.Component {
    route = (key, i) => {
        let Component = withRouter(
            this.props.routes[key].component
        );
        let props = {
            ...this.props,
            ...this.state,
        };
        let pageTemplate = () => (
            <Template {...props}>
                <Component {...props} />
            </Template>
        );
        return (
            <Route
                key={'route-' + i}
                exact={
                    this.props.routes[key].exact ? true : false
                }
                path={key}
                component={pageTemplate}
            />
        );
    };

    componentDidMount() {
        let next = () => {
            this.props.setRoutes(routes(this.props));
            setupFormattedProjects(this.props);

            let redirect = redirectParam(this.props);
            if (redirect) {
                goToPage(decodeURIComponent(redirect));
            }
        };
        fetchAPIData(this.props, '/data.json', {
            method: 'GET',
            next: next,
        });
    }

    render() {
        let routes = this.props.routes;
        let setupDone =
            this.props.state.fetching === 0 &&
            this.props.projects != null;
        return setupDone ? (
            <>
                {Object.keys(routes).length > 0 ? (
                    <Switch>
                        {Object.keys(routes).map((key, i) =>
                            this.route(key, i)
                        )}
                    </Switch>
                ) : (
                    ''
                )}
            </>
        ) : (
            <img
                id="spinner"
                src={process.env.PUBLIC_URL + '/spinner.gif'}
            />
        );
    }
}

export default withRouter(App);
