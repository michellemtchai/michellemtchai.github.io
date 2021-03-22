import React from 'react';

class LongButton extends React.Component {
    clickButton = (event) => {
        event.preventDefault();
        this.props.click();
    };
    render() {
        return (
            <button
                className="btn btn-primary btn-lg btn-block"
                onClick={(e) => this.clickButton(e)}
            >
                {this.props.text}
            </button>
        );
    }
}

export default LongButton;
