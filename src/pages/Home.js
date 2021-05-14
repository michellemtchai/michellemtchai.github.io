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
    render() {
        let categories = this.props.state[this.props.state.data];
        return (
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
        );
    }
}

export default Home;
