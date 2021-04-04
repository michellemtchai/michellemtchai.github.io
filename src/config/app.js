import React from 'react';
import { withRouter } from 'react-router';
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/';

class App extends React.Component {
    route = (key, i) => {
        let Component = withRouter(
            routes(this.props)[key].component
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
                    routes(this.props)[key].exact ? true : false
                }
                path={key}
                component={pageTemplate}
            />
        );
    };

    render() {
        return (
            <>
                <Switch>
                    {Object.keys(
                        routes(this.props)
                    ).map((key, i) => this.route(key, i))}
                </Switch>
            </>
        );
    }
}

export default withRouter(App);
