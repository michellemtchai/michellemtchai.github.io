import './index.css';
import React from 'react';
import { goToPage } from '../../../shared/router';

class PageButtons extends React.Component {
    changePage = (increment) => {
        let page = this.props.index + increment;
        goToPage(this.props.baseUrl + page);
        this.props.setData({
            data: null,
        });
        window.scrollTo(0, 0);
    };
    render() {
        let page = this.props.index;
        let pages = this.props.pages;
        return pages > 1 ? (
            <div className="pagination">
                {prev(page, () => this.changePage(-1))}
                <span>
                    {page} of {pages}
                </span>
                {next(page, pages, () => this.changePage(1))}
            </div>
        ) : (
            ''
        );
    }
}

export default PageButtons;

const prev = (page, action) =>
    page === 1 ? (
        <button disabled>Previous</button>
    ) : (
        <button onClick={action}>Previous</button>
    );
const next = (page, pages, action) =>
    page + 1 > pages ? (
        <button disabled>Next</button>
    ) : (
        <button onClick={action}>Next</button>
    );
