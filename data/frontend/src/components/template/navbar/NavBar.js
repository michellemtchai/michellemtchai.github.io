import './index.css';
import React from 'react';
import { navlinks } from '../../../config/routes';
import { goToPage } from '../../../shared/router';

class NavBar extends React.Component {
    currentPage = (link) => {
        let currentPath = this.props.location.pathname;
        let route = this.props.match.path;
        let children = this.props.routes[link].children
            ? this.props.routes[link].children
            : [];
        let current =
            link == route ||
            link == currentPath ||
            children.includes(route) ||
            children.includes(currentPath);
        return current ? 'curr-page' : '';
    };
    clickLink = (event, link) => {
        event.preventDefault();
        goToPage(link, this.props);
    };
    title = (link) => {
        return this.props.routes[link].pageData(this.props)
            .title;
    };
    render() {
        return (
            <nav className="nav-bar">
                <ul>
                    {navlinks.map((link, i) => (
                        <li key={'link-' + i}>
                            <a
                                href={link}
                                onClick={(e) =>
                                    this.clickLink(e, link)
                                }
                                className={this.currentPage(
                                    link
                                )}
                            >
                                {this.title(link)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default NavBar;
