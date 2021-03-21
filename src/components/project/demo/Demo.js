import './index.css';
import React from 'react';

class Demo extends React.Component {
    render() {
        return this.props.url ? (
            <span className="demo">Demo</span>
        ) : (
            ''
        );
    }
}

export default Demo;
