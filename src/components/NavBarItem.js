import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './NavBarItem.module.scss';
library.add(fas);

const NavBarItem = ({ icon, to, name, selected }) => {
	return (
		<li className={styles.link}>
			<Link to={to} className={selected ? styles.selected : ''}>
				<FontAwesomeIcon icon={icon} />
				{name}
			</Link>
		</li>
	);
};

export default NavBarItem;
