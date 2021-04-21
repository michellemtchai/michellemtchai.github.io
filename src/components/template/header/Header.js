import './index.css';
import React, { lazy } from 'react';
const IconLink = lazy(() => import('../iconLink/IconLink'));
import { socialLinks } from '../../../config';
import { goToPage } from '../../../shared/router';
import { resetResults } from '../../../shared/results';

class Header extends React.Component {
    goToHome = (event) => {
        event.preventDefault();
        resetResults(this.props);
        goToPage('/');
    };
    render() {
        return (
            <ul className="header">
                <li onClick={this.props.updateNav}>
                    <i className="fas fa-bars"></i>
                </li>
                <li>
                    <h1 onClick={this.goToHome}>
                        <a href="/">
                            {process.env.REACT_APP_TITLE}
                        </a>
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
