import React from 'react';
import * as styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>Michelle Chai &#169; 2021-{new Date().getFullYear()}</p>
		</footer>
	);
};

export default Footer;
