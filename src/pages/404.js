import React from 'react';
import Layout from '../components/Layout';
import NotFoundMessage from '../components/NotFoundMessage';

const NotFound = ({ data }) => {
	return (
		<Layout>
			<NotFoundMessage />
		</Layout>
	);
};

export default NotFound;
