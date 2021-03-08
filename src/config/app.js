import React from 'react';
import { withRouter } from 'react-router';
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/';

class App extends React.Component {
    state = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    route = (key, i) => {
        let Component = withRouter(routes[key].component);
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
                exact={routes[key].exact ? true : false}
                path={key}
                component={pageTemplate}
            />
        );
    };

    updateDimensions = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <>
                <Switch>
                    {Object.keys(routes).map((key, i) => this.route(key, i))}
                </Switch>
            </>
        );
    }
}

export default withRouter(App);
