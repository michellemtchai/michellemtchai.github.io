import './index.css';
import React, { lazy } from 'react';
import FilterDialog from './filterDialog/FilterDialog';
const PageButtons = lazy(() =>
    import('./pageButton/PageButtons')
);
const SearchBar = lazy(() => import('../searchbar/SearchBar'));
const Modal = lazy(() => import('../modal/Modal'));

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
        let pages = this.props.results.pages;
        let data = this.props.state[this.props.state.data];
        let items = data[this.props.type];
        let className = this.props.clickable
            ? 'items clickable'
            : 'items';
        let pagination = (
            <PageButtons
                {...this.props}
                index={page + 1}
                pages={pages}
                baseUrl={this.props.baseUrl + '/'}
            />
        );
        return (
            <ul className={className}>
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
                        aria-label="filter-data-button"
                    >
                        <i className="fas fa-sliders-h" />
                    </button>
                    <p>
                        Showing {items.length} of {data.total}
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
