import './index.css';
import React from 'react';

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
    useFilter = () => {
        console.log('this.state', this.state);
        this.props.updateFilter(this.state);
        this.props.closeModal();
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
                    name="Sort by:"
                    selected={this.state.sortBy}
                    update={this.updateSortBy}
                    options={sortByOptions(
                        this.props.search.term
                    )}
                />
                <Select
                    name="Sort direction:"
                    selected={this.state.sortDir}
                    update={this.updateSortDir}
                    options={sortDirOptions}
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

const sortByOptions = (search) => {
    let options = [
        {
            value: 'name',
            label: 'Project Name',
        },
    ];
    if (search) {
        options = [
            {
                value: 'relevance',
                label: 'Relevance',
            },
            ...options,
        ];
    }
    return options;
};

const sortDirOptions = [
    {
        value: 'ascending',
        label: 'Ascending',
    },
    {
        value: 'descending',
        label: 'Descending',
    },
];

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const Select = (props) => {
    return (
        <section className="dialog-entry">
            <label>{props.name}</label>
            <select onChange={props.update}>
                {props.options.map((option, i) => (
                    <option
                        key={'select-option-' + i}
                        selected={
                            props.selected === option.value
                        }
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </section>
    );
};
