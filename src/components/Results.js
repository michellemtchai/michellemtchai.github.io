import React, { useEffect, useContext } from 'react';
import NotFound from '../pages/404';

const Results = ({ params, Component }) => {
	if (params) {
		const result = params.match(/^page\/(\d+)$/);
		if (result && result.length === 2) {
			const page = parseInt(result[1]);
			return <Component page={page} />;
		} else {
			return <NotFound />;
		}
	} else {
		return <Component page={1} />;
	}
};

export default Results;
