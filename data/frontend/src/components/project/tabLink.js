import React from 'react';

class TabLink extends React.Component {
    render() {
        return (
            <a
                href={this.props.link}
                target="_blank"
                className="tab-link"
                title={this.props.link}
            >
                {this.props.link}
            </a>
        );
    }
}

export default TabLink;
