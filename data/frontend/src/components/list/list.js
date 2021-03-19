import './index.css';
import React from 'react';
import PageButtons from './pageButtons';

class List extends React.Component {
    render() {
        let page = this.props.page;
        let pages = this.props.pages;
        let items = pages[page];
        let className = this.props.clickable
            ? 'items clickable'
            : 'items';
        let pagination = (
            <PageButtons
                {...this.props}
                index={page + 1}
                pages={pages.length}
                baseUrl={this.props.baseUrl + '/'}
            />
        );
        return (
            <ul className={className}>
                <li>
                    <p>
                        Showing {items.length} of {this.props.total}{' '}
                        items
                    </p>
                    {pagination}
                </li>
                {items.map((item, i) => (
                    <this.props.component
                        key={`${this.props.keyName}-${i}`}
                        {...{
                            ...this.props,
                            [this.props.keyName]: item,
                        }}
                    />
                ))}
                <li>
                    {items.length > 0 ? (
                        pagination
                    ) : (
                        <p>There's no {this.props.keyName}.</p>
                    )}
                </li>
            </ul>
        );
    }
}

export default List;
