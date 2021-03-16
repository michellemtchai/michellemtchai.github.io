import React from 'react';
import { routes, navlinks } from '../../config/routes';
import { goToPage } from '../../shared/router';

class NavBar extends React.Component {
    currentPage = (link) => {
        let route = this.props.route;
        let children = routes[link].children
            ? routes[link].children
            : [];
        let current = link == route || children.includes(route);
        return current ? 'curr-page' : '';
    };
    clickLink = (event, link) => {
        event.preventDefault();
        goToPage(link, this.props);
    };
    render() {
        return (
            <nav>
                <ul>
                    {navlinks.map((link, i) => (
                        <li key={'link-' + i}>
                            <a
                                href={link}
                                onClick={(e) =>
                                    this.clickLink(e, link)
                                }
                                className={this.currentPage(link)}
                            >
                                {routes[link].title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default NavBar;
