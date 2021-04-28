import React, { lazy } from 'react';
const NotFound = lazy(() => import('../../pages/NotFound'));
const SearchBar = lazy(() => import('../searchbar/SearchBar'));
import { goToPage } from '../../shared/router';
import { validPage, getPage } from '../../shared/pages';

class Items extends React.Component {
    render() {
        let page = getPage(this.props);
        return validPage(this.props.results, page) ? (
            <div className="page-body">
                <SearchBar
                    {...this.props}
                    value={this.props.searchterm}
                />
                <this.props.list {...this.props} page={page} />
            </div>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Items;
