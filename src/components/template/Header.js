import './header.css';
import React from 'react';
import IconLink from './IconLink';
import { title, socialLinks } from '../../config';

class Header extends React.Component {
    render() {
        return (
            <ul className="header">
                <li>
                    <h1>{title}</h1>
                </li>
                <li>
                    Find me
                    {socialLinks.map((item, i) => (
                        <IconLink key={'social-link-' + i} {...item} />
                    ))}
                </li>
            </ul>
        );
    }
}

export default Header;
