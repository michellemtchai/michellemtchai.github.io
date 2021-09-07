import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as styles from './NotFoundMessage.module.scss';
library.add(far);

const NotFoundMessage = ({ data }) => {
	return (
		<p className={styles.message}>
			<FontAwesomeIcon icon={['far', 'dizzy']} />
			<br />
			Sorry, page not found
		</p>
	);
};

export default NotFoundMessage;
