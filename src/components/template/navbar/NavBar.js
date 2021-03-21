import './index.css';
import React from 'react';
import { routes, navlinks, routeKey } from '../../../config';
import { goToPage } from '../../../shared/router';

class NavBar extends React.Component {
    state = {
        minimized: this.props.minimized,
    };
    currentPage = (link) => {
        let route = this.props.route;
        let children = routes(this.props)[route].children
            ? routes(this.props)[route].children
            : [];
        let current =
            routeKey(this.props, link) == route ||
            children.includes(route);
        return current ? 'curr-page' : '';
    };
    clickLink = (event, link) => {
        event.preventDefault();
        goToPage(link);
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
                    {navlinks(this.props).map((link, i) => (
                        <li
                            key={'link-' + i}
                            className={minimized}
                        >
                            <a
                                href={link}
                                onClick={(e) =>
                                    this.clickLink(e, link)
                                }
                                className={this.currentPage(
                                    link
                                )}
                            >
                                {title(this.props, link)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default NavBar;

const title = (props, link) => {
    let route = routes(props)[routeKey(props, link)];
    return (
        <>
            <i className={'icon ' + route.icon}></i>
            <small>{route.title}</small>
        </>
    );
};
