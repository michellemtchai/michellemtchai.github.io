import './index.css';
import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div className="error-body">
                <ul className="error">
                    <li>{this.props.text}</li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Error;
