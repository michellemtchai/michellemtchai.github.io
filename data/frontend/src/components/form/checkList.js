import React from 'react';

class CheckList extends React.Component {
    list = React.createRef();
    state = {
        value: this.props.value,
    };
    valueToLabelMap = () => {
        let mapping = {};
        this.props.options.map(
            (option) => (mapping[option.value] = option.label)
        );
        return mapping;
    };
    handleChange = (event) => {
        let value = event.target.value;
        let values = [...this.state.value];
        let mapping = this.valueToLabelMap();
        if (this.state.value.includes(value)) {
            let index = values.indexOf(value);
            if (index !== -1) {
                values.splice(index, 1);
            }
        } else {
            values.push(value);
        }
        values = values.sort((a, b) => {
            if (mapping[a] == mapping[b]) {
                return 0;
            } else if (mapping[a] < mapping[b]) {
                return -1;
            } else {
                return 1;
            }
        });
        this.setState(
            {
                value: values,
            },
            () => this.props.update(this.state.value)
        );
    };
    render() {
        let options = this.props.options;
        let id = (i) => `checkbox-${this.props.name}-${i}`;
        return (
            <fieldset
                ref={this.list}
                className="form-group"
                onChange={this.handleChange}
                style={{
                    columnCount: this.props.columns
                        ? this.props.columns
                        : 3,
                }}
            >
                <label>{this.props.label}:</label>
                {options.map((option, i) => (
                    <label
                        key={id(i)}
                        htmlFor={id(i)}
                        className="form-check form-check-label"
                    >
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={id(i)}
                            value={option.value}
                            name={`${this.props.name}[]`}
                            onChange={this.handleChange}
                            checked={this.state.value.includes(
                                option.value
                            )}
                        />
                        {option.label}
                    </label>
                ))}
            </fieldset>
        );
    }
}

export default CheckList;
