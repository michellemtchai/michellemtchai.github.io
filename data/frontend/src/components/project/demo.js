import React from 'react';

class Demo extends React.Component {
    render() {
        return this.props.url ? <span>Demo</span> : '';
    }
}

export default Demo;
