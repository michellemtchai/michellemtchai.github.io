import React from 'react';

class FontAwesomeField extends React.Component {
    state = {
        value: this.props.value,
    };
    handleChange = (event) => {
        this.setState(
            {
                value: event.target.value,
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
            <fieldset className="form-group font-awesome">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <br />
                <i className={`preview ${this.state.value}`}></i>
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

export default FontAwesomeField;

const focusStyle = {
    border: '1px solid #ccc',
    boxShadow: 'none',
};
