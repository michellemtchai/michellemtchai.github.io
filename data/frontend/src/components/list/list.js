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
                index={page + 1}
                pages={pages.length}
                baseUrl={this.props.baseUrl}
                {...this.props}
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
                <li>{pagination}</li>
            </ul>
        );
    }
}

export default List;
