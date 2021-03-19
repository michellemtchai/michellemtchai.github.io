import React from 'react';

class TabLink extends React.Component {
    render() {
        return (
            <a href={this.props.link} target="_blank">
                {this.props.link}
            </a>
        );
    }
}

export default TabLink;
