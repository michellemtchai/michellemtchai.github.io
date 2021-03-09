import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes, navlinks, routeKey } from '../../config';

class NavBar extends React.Component {
    state = {
        minimized: this.props.minimized,
    };
    currentPage = (link) => {
        let route = this.props.route;
        let children = routes[route].children ? routes[route].children : [];
        let current = routeKey(link) == route || children.includes(route);
        return current ? 'curr-page' : '';
    };
    componentDidUpdate(prevProps) {
        if (prevProps.minimized !== this.props.minimized) {
            this.setState({
                minimized: this.props.minimized,
            });
        }
    }
    render() {
        let minimized = this.state.minimized ? ' minimized' : '';
        return (
            <nav className="navbar">
                <ul>
                    {navlinks.map((link, i) => (
                        <li key={'link-' + i} className={minimized}>
                            <Link to={link} className={this.currentPage(link)}>
                                {title(link)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default NavBar;

const title = (link) => {
    let route = routes[routeKey(link)];
    return (
        <>
            <i className={route.icon}></i>
            <small>{route.title}</small>
        </>
    );
};
