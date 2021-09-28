import React from 'react';
import { navigate } from 'gatsby';

const Pagination = ({ page, totalPages, baseUrl }) => {
	const goToPage = (increment) => () => {
		const newPage = page + increment;
		if (newPage > 0 && newPage <= totalPages) {
			navigate(`${baseUrl}/page/${newPage}`);
		}
	};
	return (
		<div>
			<button disabled={page - 1 <= 0} onClick={goToPage(-1)}>
				Previous
			</button>
			<p>Page {page}</p>
			<button disabled={page + 1 > totalPages} onClick={goToPage(+1)}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
