import React from 'react';
import { goToPage } from '../../shared/router';
import { validPage, getPage } from '../../shared/pages';
import NotFound from '../../pages/NotFound';

class Items extends React.Component {
    render() {
        let page = getPage(this.props);
        return validPage(this.props.pages, page) ? (
            <div className="page-body">
                <this.props.list {...this.props} page={page} />
            </div>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Items;
