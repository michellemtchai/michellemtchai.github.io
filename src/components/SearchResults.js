import React from 'react';
import Layout from './Layout';
import SearchBar from './SearchBar';

const SearchResults = ({ category, query, page }) => {
	return (
		<Layout>
			<SearchBar range={category} />
			<h1>Search Page</h1>
			<p>category: {category}</p>
			<p>query: {query}</p>
			<p>page: {page}</p>
		</Layout>
	);
};

export default SearchResults;
