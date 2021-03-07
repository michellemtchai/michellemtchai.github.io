import React from 'react';

class IconLink extends React.Component {
	render() {
		return (
            <a className='icon-link'
                href={this.props.link}
                alt={this.props.description}>
                <i className={this.props.icon}></i>
            </a>
        );
    }
}

export default IconLink;
