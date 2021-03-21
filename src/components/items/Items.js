import React from 'react';
import { goToPage } from '../../shared/router';
import {
    getPages,
    validPage,
    getPage,
} from '../../shared/pages';
import NotFound from '../../pages/NotFound';

class Items extends React.Component {
    render() {
        let page = getPage(this.props);
        let [total, pages] = getPages(
            this.props,
            this.props.keyName
        );
        return validPage(pages, page) ? (
            <div className="page-body">
                <this.props.list
                    {...this.props}
                    total={total}
                    pages={pages}
                    page={page}
                />
            </div>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Items;
