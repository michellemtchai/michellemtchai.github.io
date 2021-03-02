import React from 'react';
import { Link } from 'react-router-dom';
import { routes, navlinks } from '../../config/routes';

class NavBar extends React.Component {
    currentPage=(link)=>{
        let curr = this.props.router.location.pathname;
        let children = routes[link]? routes[link].children: [];
        children = children? children : [];
        let current =  link==curr || children.includes(curr);
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
