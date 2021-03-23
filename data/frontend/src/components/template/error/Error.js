import './index.css';
import React from 'react';

class Error extends React.Component {
    closeError = () => {
        this.props.setError('');
    };
    render() {
        return this.props.state.error ? (
            <ul className="error">
                <li>{this.props.state.error}</li>
                <li onClick={this.closeError}>&times;</li>
            </ul>
        ) : (
            ''
        );
    }
}

export default Error;
