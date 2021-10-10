import React from 'react';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './NavBarItem.module.scss';
library.add(fas);

const NavBarItem = ({ icon, to, name, selected, update }) => {
    const handleClick = (event) => {
        event.preventDefault();
        update();
        navigate(to);
    };
    return (
        <li className={styles.link}>
            <a
                href={to}
                onClick={handleClick}
                className={selected ? styles.selected : ''}
            >
                <FontAwesomeIcon icon={icon} />
                {name}
            </a>
        </li>
    );
};

export default NavBarItem;
