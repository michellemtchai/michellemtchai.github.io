import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const NavBarItem = ({ icon, to, name }) => {
    return (
        <li>
            <FontAwesomeIcon icon={icon} />
            <Link to={to}>{name}</Link>
        </li>
    );
};

export default NavBarItem;
