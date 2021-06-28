import React from 'react';
import { withRouter } from 'react-router';
import Spinner from '../pages/Spinner';
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/routes';
import { fetchAll } from './api';

class App extends React.Component {
    route = (key, i) => {
        let Component = withRouter(
            this.props.routes[key].component
        );
        let pageTemplate = () => (
            <Template {...this.props} component={Component} />
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
        this.props.setRoutes(routes(this.props));
    }

    render() {
        let routes = this.props.routes;
        return (
            <>
                {Object.keys(routes).length > 0 ? (
                    <Switch>
                        {Object.keys(routes).map((key, i) =>
                            this.route(key, i)
                        )}
                    </Switch>
                ) : (
                    <Spinner />
                )}
            </>
        );
    }
}

export default withRouter(App);
