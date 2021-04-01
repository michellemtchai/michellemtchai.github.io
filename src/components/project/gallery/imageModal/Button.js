import React from 'react';

class Button extends React.Component {
    render() {
        let disabled =
            this.props.disabled !== undefined
                ? this.props.disabled
                : false;
        return disabled ? (
            <button
                disabled
                type="button"
                style={this.props.style}
            >
                {this.props.text}
            </button>
        ) : (
            <button
                type="button"
                onClick={this.props.click}
                style={this.props.style}
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;
