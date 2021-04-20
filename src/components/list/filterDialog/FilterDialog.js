import './index.css';
import React from 'react';
import Select from './Select';
import CheckBox from './CheckBox';
import { sortByOptions, sortDirOptions } from './constants';

class FilterDialog extends React.Component {
    state = this.props.filter;
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
    useFilter = () => {
        this.props.updateFilter(this.state);
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
                <Select
                    name="sort-by"
                    label="Sort by:"
                    selected={this.state.sortBy}
                    update={this.updateSortBy}
                    options={sortByOptions(
                        this.props.searchterm
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

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};
