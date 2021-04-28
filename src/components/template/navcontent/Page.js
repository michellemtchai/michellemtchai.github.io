import React, { lazy } from 'react';
import { fetchAPIData } from '../../../shared/network';
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
            fetchAPIData(
                this.props,
                this.props.route.apiRoute(this.props),
                {
                    method: 'GET',
                    setState: this.updateState,
                    formatData: (data) => ({
                        data: data,
                    }),
                }
            );
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
        console.log(this.props.route.apiRoute, data);
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
            <Error text={error} />
        );
    }
}

export default Page;
