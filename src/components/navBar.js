import React from 'react';
import { Link } from 'react-router-dom';
import { routes, navlinks } from '../config/routes';

class NavBar extends React.Component {
	render() {
        let curr = this.props.router.location.pathname;
		return (
            <nav>
                {navlinks.map((link, i)=>
                    <Link className={curr==link ? 'curr-page': ''}
                        key={'link-'+i}
                        to={link}>
                        {routes[link].title}
                    </Link>
                )}
            </nav>
        );
  	}
}

export default NavBar;
