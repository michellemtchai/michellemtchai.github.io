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
                className="custom-btn"
                style={this.props.style}
            >
                {this.props.text}
            </button>
        ) : (
            <button
                type="button"
                className="custom-btn"
                onClick={this.props.onClick}
                style={this.props.style}
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;
