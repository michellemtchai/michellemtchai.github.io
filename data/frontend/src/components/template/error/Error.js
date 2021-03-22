import React from 'react';

class Error extends React.Component {
    closeError = () => {
        this.props.setError('');
    };
    render() {
        return this.props.state.error ? (
            <dl className="error">
                <dd>{this.props.state.error}</dd>
                <dd onClick={this.closeError}>&times;</dd>
            </dl>
        ) : (
            ''
        );
    }
}

export default Error;
