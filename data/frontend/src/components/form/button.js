import React from 'react';

class Button extends React.Component {
    render() {
        return (
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
