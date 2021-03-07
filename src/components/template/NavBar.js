import React from 'react';
import { Link } from 'react-router-dom';
import { routes, navlinks } from '../../config/routes';

class NavBar extends React.Component {
    currentPage=(link)=>{
        let route = this.props.route;
        let children = routes[link].children
            ? routes[link].children: [];
        let current = link==route || children.includes(route);
        return current ? 'curr-page': '';
    }
    render() {
        return (
            <nav>
                <ul>
                {navlinks.map((link, i)=>
                    <li key={'link-'+i}>
                        <Link to={link}
                            className={this.currentPage(link)}>
                            {routes[link].title}
                        </Link>
                    </li>
                )}
                </ul>
            </nav>
        );
    }
}

export default NavBar;
