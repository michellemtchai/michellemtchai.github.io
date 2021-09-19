import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import NotFoundMessage from '../components/NotFoundMessage';

const NotFound = ({ data }) => {
	return (
		<Layout>
			<SearchBar />
			<NotFoundMessage />
		</Layout>
	);
};

export default NotFound;
