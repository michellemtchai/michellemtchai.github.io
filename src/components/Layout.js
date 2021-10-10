import React, { useState } from 'react';
import Seo from './Seo';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Modal from './Modal';
import { useViewPort } from '../hooks/viewPort';
import '../styles/index.scss';
import * as styles from './Layout.module.scss';

const Layout = ({ children }) => {
	const [minimized, updateMinimized] = useState(false);
	const [title, updateTitle] = useState(null);
	const [description, updateDescription] = useState(null);
	const [category, updateCategory] = useState(null);
	const { width } = useViewPort();

	return (
		<div className={styles.layout}>
			<Seo pageTitle={title} pageDescription={description} lang="en" />
			<Header minimized={minimized} updateMinimized={updateMinimized} />
			<div className={styles.nonHeader}>
				{width <= 1200 && (
					<Modal
						className={styles.navModal}
						show={minimized}
						updateShow={updateMinimized}
					>
						<Header
							minimized={minimized}
							updateMinimized={updateMinimized}
						/>
						<NavBar
							selected={category}
							minimized={false}
							update={updateCategory}
						/>
					</Modal>
				)}
				{width > 800 && (
					<NavBar
						selected={category}
						minimized={width > 1200 ? minimized : true}
						update={updateCategory}
					/>
				)}
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
