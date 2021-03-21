import './index.css';
import React from 'react';

class TabLink extends React.Component {
    render() {
        return (
            <a
                href={this.props.link}
                target="_blank"
                rel="noopener"
                className="tab-link"
                title={this.props.link}
            >
                {this.props.link}
                <i className="fas fa-external-link-alt"></i>
            </a>
        );
    }
}

export default TabLink;
