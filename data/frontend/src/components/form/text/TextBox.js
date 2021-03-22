import React from 'react';

class TextBox extends React.Component {
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
    style = () => {
        let resizeable = this.props.resize
            ? this.props.resize
            : false;
        return resizeable ? {} : { resize: 'none' };
    };
    readonly = () => {
        let result = this.props.readonly
            ? this.props.readonly
            : false;
        return result;
    };
    render() {
        return (
            <fieldset className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <textarea
                    className="form-control"
                    key={this.props.id}
                    id={this.props.id}
                    type="text"
                    style={this.style()}
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.state.value}
                    readOnly={this.readonly()}
                    rows={this.props.rows ? this.props.rows : 3}
                    placeholder={this.props.placeholder}
                />
            </fieldset>
        );
    }
}

export default TextBox;
