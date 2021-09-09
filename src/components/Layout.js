import React, { useState } from 'react';
import Seo from './Seo';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/index.scss';
import * as styles from './Layout.module.scss';

const Layout = ({ children, title, description, category }) => {
	const [navBarState, updateNavBar] = useState('');
	return (
		<div className={styles.layout}>
			<Seo pageTitle={title} pageDescription={description} lang="en" />
			<Header navBarState={navBarState} updateNavBar={updateNavBar} />
			<div className={styles.nonHeader}>
				<NavBar selected={category} />
				<main>
					<div className={styles.pageBody}>
						<article>{children}</article>
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
};

export default Layout;
