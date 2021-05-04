import React, { lazy } from 'react';
import { fetchAPIData } from '../../../shared/network';
import NotFound from '../../../pages/NotFound';
import Spinner from '../../../pages/Spinner';
import Error from '../error/Error';

class Page extends React.Component {
    state = {
        data: null,
    };
    _isMounted = false;
    updateState = (data, resolve) => {
        if (this._isMounted) {
            this.setState(data, () => {
                resolve(data);
            });
        }
    };
    componentDidMount() {
        this._isMounted = true;
        if (
            this.props.route.apiRoute !== undefined &&
            this.props.state.error === ''
        ) {
            let [route, params] = this.props.route.apiRoute(
                this.props
            );
            fetchAPIData(this.props, route, {
                method: 'GET',
                params: params,
                setState: this.updateState,
                formatData: (data) => ({
                    data: data,
                }),
                // minStored: 10,
            });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let data = this.state.data;
        let error = this.props.state.error;
        let fetchDone =
            this.props.route.apiRoute === undefined ||
            data !== null;
        return error === '' ? (
            fetchDone ? (
                <this.props.component
                    {...this.props}
                    data={data}
                />
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
