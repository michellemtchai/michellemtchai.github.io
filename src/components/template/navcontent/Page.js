import React, { lazy } from 'react';
import { fetchAPIData } from '../../../shared/network';
import Spinner from '../../../pages/Spinner';

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
        if (this.props.route.apiRoute !== undefined) {
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
        if (
            this.props.route.apiRoute === undefined ||
            data !== null
        ) {
            return !this.props.error ? (
                <this.props.component
                    {...this.props}
                    data={data}
                />
            ) : (
                <Error {...this.props} />
            );
        } else {
            return <Spinner />;
        }
    }
}

export default Page;
