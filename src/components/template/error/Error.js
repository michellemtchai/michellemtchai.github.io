import './index.css';
import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <ul className="error">
                <li>{this.props.error}</li>
            </ul>
        );
    }
}

export default Error;
