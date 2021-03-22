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
                className={`btn btn-${
                    this.props.type ? this.props.type : 'primary'
                }`}
            >
                {this.props.text}
            </button>
        ) : (
            <button
                type="button"
                className={`btn btn-${
                    this.props.type ? this.props.type : 'primary'
                }`}
                onClick={this.props.click}
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;
