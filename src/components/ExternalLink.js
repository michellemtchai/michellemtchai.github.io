import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './ExternalLink.module.scss';
library.add(fas);

const ExternalLink = ({ to, title, children, showExternalIcon = false }) => {
	return (
		<a
			className={styles.link}
			href={to}
			target="_blank"
			rel="noopener noreferrer"
			title={title}
		>
			{children}
			{showExternalIcon && (
				<FontAwesomeIcon
					className={styles.externalIcon}
					icon={['fas', 'external-link-alt']}
				/>
			)}
		</a>
	);
};

export default ExternalLink;
