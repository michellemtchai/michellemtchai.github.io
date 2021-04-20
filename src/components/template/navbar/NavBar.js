import './index.css';
import React from 'react';
import { navlinks, routeKey } from '../../../config';
import { goToPage } from '../../../shared/router';
import {
    EXPANDED_NAV_WIDTH,
    MINIMIZED_NAV_WIDTH,
} from './constants';

class NavBar extends React.Component {
    state = {
        minimized: this.props.minimized,
        width: this.props.minimized
            ? MINIMIZED_NAV_WIDTH
            : EXPANDED_NAV_WIDTH,
    };
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
        this.props.setSearch({
            sortBy: null,
            sortDir: null,
            stacks: [],
        });
        goToPage(link);
    };
    componentDidUpdate(prevProps) {
        if (
            prevProps.minimized !== this.props.minimized ||
            prevProps.navWidth !== this.props.navWidth
        ) {
            this.setState({
                minimized: this.props.minimized,
                width: this.props.minimized
                    ? MINIMIZED_NAV_WIDTH
                    : EXPANDED_NAV_WIDTH,
            });
        }
    }
    render() {
        let minimized = this.state.minimized ? ' minimized' : '';
        let ulStyle = { width: this.state.width + 17 + 'px' };
        let liStyle = { width: this.state.width + 'px' };
        return (
            <nav className="navbar">
                <ul style={ulStyle}>
                    {navlinks(this.props).map((link, i) => (
                        <li
                            key={'link-' + i}
                            className={minimized}
                            style={liStyle}
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
    let route = props.routes[routeKey(props, link)];
    return (
        <>
            <i className={'icon ' + route.icon}></i>
            <small>{route.title}</small>
        </>
    );
};
