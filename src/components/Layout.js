import React from 'react';
import Seo from './Seo';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/index.scss';
import * as styles from './Layout.module.scss';

const Layout = ({ children, title, description, category }) => {
	return (
		<div className={styles.layout}>
			<Seo pageTitle={title} pageDescription={description} lang="en" />
			<Header />
			<div className={styles.nonHeader}>
				<NavBar selected={category} />
				<main>
					<article>{children}</article>
					<Footer />
				</main>
			</div>
		</div>
	);
};

export default Layout;
