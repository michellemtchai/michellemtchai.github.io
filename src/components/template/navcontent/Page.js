import React, { lazy } from 'react';
import {
    fetchAPIData,
    paramsToQueryString,
} from '../../../shared/network';
import NotFound from '../../../pages/NotFound';
import Spinner from '../../../pages/Spinner';
import Error from '../error/Error';

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
        let fetchDone =
            dataKey !== null &&
            (this.props.route.apiRoute === undefined ||
                data !== null);
        return fetchDone;
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
                <this.props.component {...this.props} />
            ) : (
                <div className="page-body">
                    <Spinner />
                </div>
            )
        ) : (
            <Error text={error}>
                <NotFound {...this.props} />
            </Error>
        );
    }
}

export default Page;
