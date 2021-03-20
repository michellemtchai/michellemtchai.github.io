import React from 'react';

class TagsField extends React.Component {
    state = {
        value: this.props.value ? this.props.value : [],
    };
    handleChange = (event) => {
        let value = event.target.value;
        let values = [...this.state.value];
        if (!values.includes(value)) {
            values.push(value);
        }
        this.setState(
            {
                value: values,
            },
            () => this.props.update(this.state.value)
        );
    };
    readonly = () => {
        let result = this.props.readonly
            ? this.props.readonly
            : false;
        return result;
    };
    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    render() {
        return (
            <fieldset className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <ul>
                    {this.state.value.map((name, i) => (
                        <li key={'tag-' + i}>
                            {this.props.map[name]}
                        </li>
                    ))}
                </ul>
                <input
                    className="form-control"
                    key={this.props.id}
                    id={this.props.id}
                    type="text"
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.state.value}
                    readOnly={this.readonly()}
                    placeholder={this.props.placeholder}
                    onKeyPress={this.onKeyPress}
                />
            </fieldset>
        );
    }
}

export default TagsField;

const focusStyle = {
    border: '1px solid #ccc',
    boxShadow: 'none',
};
