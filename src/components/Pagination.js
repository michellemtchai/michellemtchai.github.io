import React from 'react';
import { navigate } from 'gatsby';
import * as styles from './Pagination.module.scss';

const Pagination = ({ page, totalPages, baseUrl }) => {
	const goToPage = (increment) => () => {
		const newPage = page + increment;
		if (newPage > 0 && newPage <= totalPages) {
			navigate(`${baseUrl}/page/${newPage}`);
		}
	};
	return (
		<div className={styles.pagination}>
			<button
				className={styles.left}
				disabled={page - 1 <= 0}
				onClick={goToPage(-1)}
			>
				Prev
			</button>
			<p>Page {page}</p>
			<button
				className={styles.right}
				disabled={page + 1 > totalPages}
				onClick={goToPage(+1)}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
