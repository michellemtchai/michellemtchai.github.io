import './index.css';
import React from 'react';
import PageButtons from './pageButton/PageButtons';
import SearchBar from '../searchbar/SearchBar';
import Modal from '../modal/Modal';
import FilterDialog from './filterDialog/FilterDialog';

class List extends React.Component {
    state = {
        show: false,
    };
    updateShow = (value) => {
        this.setState({
            show: value,
        });
    };
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
                <SearchBar
                    {...this.props}
                    value={this.props.searchterm}
                />
                <li>
                    <Modal
                        show={this.state.show}
                        updateShow={this.updateShow}
                    >
                        <FilterDialog
                            {...this.props}
                            closeModal={() =>
                                this.updateShow(false)
                            }
                        />
                    </Modal>
                    <button
                        className="filter-btn"
                        onClick={() => this.updateShow(true)}
                    >
                        <i className="fas fa-sliders-h" />
                    </button>
                    <p>
                        Showing {items.length} of{' '}
                        {this.props.total}{' '}
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
