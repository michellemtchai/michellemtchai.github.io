import React, { lazy } from 'react';
import { fetchAPIData } from '../shared/network';
import Spinner from './Spinner';
const Error = lazy(() =>
    import('../components/template/error/Error')
);
const ThumbList = lazy(() =>
    import('../components/thumbList/ThumbList')
);
const SearchBar = lazy(() =>
    import('../components/searchbar/SearchBar')
);

class Home extends React.Component {
    state = {
        categories: [],
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
        fetchAPIData(this.props, '/', {
            method: 'GET',
            setState: this.updateState,
            formatData: (data) => {
                return {
                    categories: data,
                };
            },
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let categories = this.state.categories;
        if (categories) {
            return !this.props.error ? (
                <div className="page-body">
                    <SearchBar {...this.props} range="/all" />
                    {categories.map((category, i) => (
                        <ThumbList
                            key={'thumblist-' + i}
                            {...this.props}
                            title={category.name}
                            page={category.base_url}
                            list={category.projects}
                        />
                    ))}
                </div>
            ) : (
                <Error {...this.props} />
            );
        } else {
            return <Spinner />;
        }
    }
}

export default Home;
