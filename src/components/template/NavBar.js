import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes, navlinks, routeKey } from '../../config';

class NavBar extends React.Component {
    currentPage=(link)=>{
        let route = this.props.route;
        let children = routes[route].children ?
            routes[route].children : [];
        let current = routeKey(link) == route || children.includes(route);
        return current ? 'curr-page': '';
    }
    title = (link)=>{
        return routes[routeKey(link)].title;
    }
    render() {
        return (
            <nav className='navbar'>
                <ul>
                {navlinks.map((link, i)=>
                    <li key={'link-'+i}>
                        <Link to={link}
                            className={this.currentPage(link)}>
                            {this.title(link)}
                        </Link>
                    </li>
                )}
                </ul>
            </nav>
        );
    }
}

export default NavBar;
