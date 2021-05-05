import React from 'react';
import { withRouter } from 'react-router';
import Spinner from '../pages/Spinner';
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/';
import { fetchAPIData } from '../shared/network';
import { goToPage } from '../shared/router';
import { redirectParam } from '../shared/pages';

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
            <Template {...props} component={Component} />
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
        let next = (data) => {
            this.props.setRoutes(routes(this.props));
            let mapping = {};
            data.categories.forEach(
                (i) => (mapping[i._id] = i.projects)
            );
            this.props.setProjects(mapping);
            let redirect = redirectParam(this.props);
            if (redirect) {
                goToPage(decodeURIComponent(redirect));
            }
        };
        let setError = (data) => {
            this.props.setRoutes(routes(this.props));
            this.props.setError(data);
        };
        if (!this.props.state.categories) {
            fetchAPIData(this.props, '/categories', {
                method: 'GET',
                setState: this.props.setData,
                setError: setError,
                next: next,
                formatData: (data) => {
                    return {
                        categories: data,
                    };
                },
            });
        }
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
                    ''
                )}
            </>
        );
    }
}

export default withRouter(App);
