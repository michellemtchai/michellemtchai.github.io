import './index.css';
import React, { lazy } from 'react';
const Select = lazy(() => import('./Select'));
const CheckBox = lazy(() => import('./CheckBox'));
const Button = lazy(() =>
    import('../../project/gallery/imageModal/Button')
);
import { sortByOptions, sortDirOptions } from './constants';
import { goToPage } from '../../../shared/router';

class FilterDialog extends React.Component {
    state = this.props.results;
    updateSortBy = (event) => {
        this.setState({
            ...this.state,
            sortBy: event.target.value,
        });
    };
    updateSortDir = (event) => {
        this.setState({
            ...this.state,
            sortDir: event.target.value,
        });
    };
    updateSelectedStacks = (state) => {
        this.setState({
            ...this.state,
            filtered: {
                ...this.state.filtered,
                stacks: state.selected,
                defStacks: state.defStacks,
            },
        });
    };
    searchTerm = () => {
        return this.props.match.params.term
            ? encodeURIComponent(this.props.match.params.term)
            : null;
    };
    useFilter = () => {
        let range = this.props.range;
        let term = this.searchTerm();
        let url = !term ? range : `${range}/search/${term}`;
        this.props.setResults(this.state);
        this.props.setData({
            data: null,
        });
        goToPage(url);
    };
    render() {
        return (
            <article className="filter-dialog">
                <section>
                    <h2>
                        <i className="fas fa-sliders-h" />
                        Filter Configurations
                    </h2>
                    <Button
                        text="×"
                        onClick={this.props.closeModal}
                    />
                </section>
                <section className="dialog-body">
                    <Select
                        name="sort-by"
                        label="Sort by:"
                        selected={this.state.sortBy}
                        update={this.updateSortBy}
                        options={sortByOptions(
                            this.searchTerm()
                        )}
                    />
                    <Select
                        name="sort-direction"
                        label="Sort direction:"
                        selected={this.state.sortDir}
                        update={this.updateSortDir}
                        options={sortDirOptions}
                    />
                    <CheckBox
                        name="stacks"
                        label="Stacks:"
                        options={this.state.stacks}
                        selected={this.state.filtered.stacks}
                        defStacks={this.state.filtered.defStacks}
                        update={this.updateSelectedStacks}
                    />
                </section>
                <section>
                    <Button
                        text="Cancel"
                        onClick={this.props.closeModal}
                    />
                    <Button
                        text="Use Settings"
                        onClick={this.useFilter}
                    />
                </section>
            </article>
        );
    }
}

export default FilterDialog;
