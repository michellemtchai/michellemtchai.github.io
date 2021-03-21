import './index.css';
import React from 'react';
import IconLink from '../iconLink/IconLink';
import { title, socialLinks } from '../../../config';
import { goToPage } from '../../../shared/router';

class Header extends React.Component {
    render() {
        return (
            <ul className="header">
                <li onClick={this.props.updateNav}>
                    <i className="fas fa-bars"></i>
                </li>
                <li>
                    <h1 onClick={() => goToPage('/')}>
                        {title}
                    </h1>
                </li>
                <li>
                    Find me
                    {socialLinks.map((item, i) => (
                        <IconLink
                            key={'social-link-' + i}
                            {...item}
                        />
                    ))}
                </li>
            </ul>
        );
    }
}

export default Header;
