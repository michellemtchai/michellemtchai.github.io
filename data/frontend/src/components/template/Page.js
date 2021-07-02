import React, { lazy } from 'react';
import {
    fetchAPIData,
    paramsToQueryString,
} from '../../shared/network';
import NotFound from '../../pages/NotFound';
import Spinner from '../../pages/Spinner';
import Error from './error/Error';
import Head from './helmet/Head';

class Page extends React.Component {
    constructRoute = (route, params) => {
        if (Object.keys(params).length > 0) {
            route += `?${paramsToQueryString(params)}`;
        }
        return route;
    };
    fetchDone = () => {
        let dataKey = this.props.state.data;
        let data = this.props.state[dataKey];
        let fetchDone = dataKey !== null;
        if (this.props.route.apiRoute === undefined) {
            return true;
        } else {
            let apiRoute = this.constructRoute(
                ...this.props.route.apiRoute(this.props)
            );
            return (
                fetchDone &&
                apiRoute.localeCompare(dataKey) === 0
            );
        }
    };
    componentDidMount() {
        if (
            this.props.route.apiRoute !== undefined &&
            this.props.state.error === '' &&
            !this.props.state.data
        ) {
            let [route, params] = this.props.route.apiRoute(
                this.props
            );
            let apiRoute = this.constructRoute(route, params);
            if (this.props.state[apiRoute]) {
                this.props.setData({
                    data: apiRoute,
                });
            } else {
                fetchAPIData(this.props, route, {
                    method: 'GET',
                    params: params,
                    setState: this.props.setData,
                    formatData: (data) => ({
                        data: apiRoute,
                        [apiRoute]: data,
                    }),
                });
            }
        }
    }
    render() {
        let error = this.props.state.error;
        return error === '' ? (
            this.fetchDone() ? (
                <>
                    <Head {...pageData(this.props)} />
                    <this.props.component {...this.props} />
                </>
            ) : (
                <>
                    <Head {...loadingPage} />
                    <Spinner />
                </>
            )
        ) : (
            <Error text={error}>
                <Head {...errorPage} />
                <NotFound {...this.props} />
            </Error>
        );
    }
}

export default Page;

const pageData = (props) => {
    let route = props.routes[props.match.path];
    return route.pageData(props);
};

const loadingPage = {
    title: 'Loading...',
    description: 'This page is loading.',
};

const errorPage = {
    title: 'Error',
    description: 'This page has an error.',
};
