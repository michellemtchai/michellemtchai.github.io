import React, { useState } from 'react';
import Seo from './Seo';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Modal from './Modal';
import { useViewPort } from '../hooks/viewPort';
import GlobalContextProvider from '../../GlobalContext.js';
import '../styles/index.scss';
import * as styles from './Layout.module.scss';

const Layout = ({ children }) => {
	const [minimized, updateMinimized] = useState(false);
	const { width } = useViewPort();

	return (
		<GlobalContextProvider>
			<div className={styles.layout}>
				<Seo lang="en" />
				<Header
					minimized={minimized}
					updateMinimized={updateMinimized}
				/>
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
							<NavBar minimized={false} />
						</Modal>
					)}
					{width > 800 && (
						<NavBar minimized={width > 1200 ? minimized : true} />
					)}
					<main>
						<div className={styles.pageBody}>
							<article>{children}</article>
						</div>
						<Footer />
					</main>
				</div>
			</div>
		</GlobalContextProvider>
	);
};

export default Layout;
