import './pagination.css';
import React from 'react';
import { goToPage } from '../../shared/router';

class PageButtons extends React.Component {
    prevPage = () => {
        let page = this.props.index - 1;
        goToPage(this.props.baseUrl + page);
    };
    nextPage = () => {
        let page = this.props.index + 1;
        goToPage(this.props.baseUrl + page);
    };
    render() {
        let page = this.props.index;
        let pages = this.props.pages;
        return (
            <div className="pagination">
                {prev(page, this.prevPage)}
                <span>
                    {page} of {pages}
                </span>
                {next(page, pages, this.nextPage)}
            </div>
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
